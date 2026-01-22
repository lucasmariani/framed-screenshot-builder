import AppKit
import Foundation

let framesDir = URL(fileURLWithPath: "/Users/lucas/Developer/Bookabulary/framed-screenshot-builder/assets")
let outputURL = URL(fileURLWithPath: "/Users/lucas/Developer/Bookabulary/framed-screenshot-builder/frame-manifest.json")

let fm = FileManager.default
let files = try fm.contentsOfDirectory(at: framesDir, includingPropertiesForKeys: nil)
    .filter { $0.pathExtension.lowercased() == "png" }
    .filter { !$0.lastPathComponent.contains("@") }
    .filter { !$0.lastPathComponent.hasPrefix(".") }
    .sorted { $0.lastPathComponent < $1.lastPathComponent }

func titleCase(_ input: String) -> String {
    let overrides: [String: String] = [
        "iphone": "iPhone",
        "pro": "Pro",
        "max": "Max",
        "air": "Air"
    ]
    return input.split(separator: " ").map { word in
        let lower = word.lowercased()
        if let override = overrides[lower] { return override }
        return lower.prefix(1).uppercased() + lower.dropFirst()
    }.joined(separator: " ")
}

func labelForFilename(_ filename: String) -> (id: String, label: String) {
    let base = filename.replacingOccurrences(of: ".png", with: "")
    let parts = base.split(separator: "-")
    if parts.count >= 2 {
        let modelRaw = parts[0].replacingOccurrences(of: "_", with: " ")
        let colorRaw = parts[1].replacingOccurrences(of: "_", with: " ")
        let model = titleCase(modelRaw)
        let color = titleCase(colorRaw)
        return (base, "\(model) • \(color)")
    }
    return (base, titleCase(base.replacingOccurrences(of: "_", with: " ")))
}

func median(_ values: [Int]) -> Int {
    let sorted = values.sorted()
    return sorted[sorted.count / 2]
}

func analyzeImage(_ url: URL) -> [String: Any]? {
    guard let nsImage = NSImage(contentsOf: url) else { return nil }
    var rect = NSRect(origin: .zero, size: nsImage.size)
    guard let cgImage = nsImage.cgImage(forProposedRect: &rect, context: nil, hints: nil) else { return nil }

    let width = cgImage.width
    let height = cgImage.height
    let bytesPerPixel = 4
    let bytesPerRow = bytesPerPixel * width
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    var rawData = [UInt8](repeating: 0, count: Int(height * bytesPerRow))

    rawData.withUnsafeMutableBytes { ptr in
        let ctx = CGContext(data: ptr.baseAddress,
                            width: width,
                            height: height,
                            bitsPerComponent: 8,
                            bytesPerRow: bytesPerRow,
                            space: colorSpace,
                            bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        ctx.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))
    }

    func alphaAt(x: Int, y: Int) -> UInt8 {
        let idx = y * bytesPerRow + x * bytesPerPixel + 3
        return rawData[idx]
    }

    func innerLeft(y: Int) -> Int? {
        var sawOpaque = false
        for x in 0..<width {
            let a = alphaAt(x: x, y: y)
            if !sawOpaque {
                if a > 0 { sawOpaque = true }
            } else {
                if a == 0 { return x }
            }
        }
        return nil
    }

    func innerRight(y: Int) -> Int? {
        var sawOpaque = false
        for x in stride(from: width - 1, through: 0, by: -1) {
            let a = alphaAt(x: x, y: y)
            if !sawOpaque {
                if a > 0 { sawOpaque = true }
            } else {
                if a == 0 { return x }
            }
        }
        return nil
    }

    func innerTop(x: Int) -> Int? {
        var sawOpaque = false
        for y in 0..<height {
            let a = alphaAt(x: x, y: y)
            if !sawOpaque {
                if a > 0 { sawOpaque = true }
            } else {
                if a == 0 { return y }
            }
        }
        return nil
    }

    func innerBottom(x: Int) -> Int? {
        var sawOpaque = false
        for y in stride(from: height - 1, through: 0, by: -1) {
            let a = alphaAt(x: x, y: y)
            if !sawOpaque {
                if a > 0 { sawOpaque = true }
            } else {
                if a == 0 { return y }
            }
        }
        return nil
    }

    var lefts: [Int] = []
    var rights: [Int] = []
    var tops: [Int] = []
    var bottoms: [Int] = []

    for y in stride(from: 200, to: height - 200, by: 10) {
        if let l = innerLeft(y: y), let r = innerRight(y: y) {
            lefts.append(l)
            rights.append(r)
        }
    }

    for x in stride(from: 100, to: width - 100, by: 10) {
        if let t = innerTop(x: x), let b = innerBottom(x: x) {
            tops.append(t)
            bottoms.append(b)
        }
    }

    guard !lefts.isEmpty, !rights.isEmpty, !tops.isEmpty, !bottoms.isEmpty else { return nil }

    let left = median(lefts)
    let right = median(rights)
    let top = median(tops)
    let bottom = median(bottoms)

    let screenRect: [String: Int] = [
        "x": left,
        "y": top,
        "width": right - left + 1,
        "height": bottom - top + 1
    ]

    var cornerRadius = 0
    let maxScanY = min(top + 500, height - 1)
    for y in top..<maxScanY {
        if let x = innerLeft(y: y), x <= left + 1 {
            cornerRadius = y - top
            break
        }
    }
    if cornerRadius == 0 {
        cornerRadius = max(16, (screenRect["width"] ?? 0) / 12)
    }

    let result: [String: Any] = [
        "outputSize": ["width": width, "height": height],
        "screenRect": screenRect,
        "cornerRadius": cornerRadius
    ]

    return result
}

var frames: [[String: Any]] = []
for file in files {
    guard let analysis = analyzeImage(file) else { continue }
    let (id, label) = labelForFilename(file.lastPathComponent)
    var entry: [String: Any] = [
        "id": id,
        "label": label,
        "src": "assets/\(file.lastPathComponent)"
    ]
    for (k, v) in analysis { entry[k] = v }

    frames.append(entry)
}

let preferredId = "iPhone_17_pro_max-cosmic_orange-portrait"
let defaultId = frames.first(where: { ($0["id"] as? String) == preferredId })?["id"] as? String
    ?? frames.first?["id"] as? String
    ?? ""
let manifest: [String: Any] = [
    "defaultId": defaultId,
    "frames": frames
]

let data = try JSONSerialization.data(withJSONObject: manifest, options: [.prettyPrinted, .sortedKeys])
try data.write(to: outputURL)

print("Wrote manifest to", outputURL.path)
print("Frames:", frames.count)
