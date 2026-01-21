import AppKit
import Foundation
import UniformTypeIdentifiers

let framePath = "/Users/lucas/Developer/Bookabulary/framed-screenshot-builder/Model=iPhone 17 Pro Max, Color=Cosmic Orange, Orientation=Portrait@3x.png"
let outputMaskPath = "/Users/lucas/Developer/Bookabulary/framed-screenshot-builder/mask.png"

let frameURL = URL(fileURLWithPath: framePath)
let nsImage = NSImage(contentsOf: frameURL)!
var rect = NSRect(origin: .zero, size: nsImage.size)
let cgImage = nsImage.cgImage(forProposedRect: &rect, context: nil, hints: nil)!

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

func scanBoundingBox(_ predicate: (UInt8, UInt8, UInt8, UInt8) -> Bool) -> (minX: Int, minY: Int, maxX: Int, maxY: Int, count: Int)? {
    var minX = width
    var minY = height
    var maxX = 0
    var maxY = 0
    var count = 0
    for y in 0..<height {
        let rowStart = y * bytesPerRow
        for x in 0..<width {
            let idx = rowStart + x * bytesPerPixel
            let r = rawData[idx]
            let g = rawData[idx + 1]
            let b = rawData[idx + 2]
            let a = rawData[idx + 3]
            if predicate(r, g, b, a) {
                if x < minX { minX = x }
                if y < minY { minY = y }
                if x > maxX { maxX = x }
                if y > maxY { maxY = y }
                count += 1
            }
        }
    }
    return count == 0 ? nil : (minX, minY, maxX, maxY, count)
}

let opaqueBox = scanBoundingBox { _, _, _, a in a > 0 }!
let deviceMinX = opaqueBox.minX
let deviceMaxX = opaqueBox.maxX
let deviceMinY = opaqueBox.minY
let deviceMaxY = opaqueBox.maxY

// Build mask: transparent pixels inside device bounds become white; everything else transparent.
var maskData = [UInt8](repeating: 0, count: Int(height * bytesPerRow))

var screenMinX = width
var screenMinY = height
var screenMaxX = 0
var screenMaxY = 0
var screenCount = 0

for y in 0..<height {
    let rowStart = y * bytesPerRow
    for x in 0..<width {
        let idx = rowStart + x * bytesPerPixel
        let a = rawData[idx + 3]
        let insideDevice = x >= deviceMinX && x <= deviceMaxX && y >= deviceMinY && y <= deviceMaxY
        if insideDevice && a == 0 {
            // Screen area
            maskData[idx] = 255
            maskData[idx + 1] = 255
            maskData[idx + 2] = 255
            maskData[idx + 3] = 255

            if x < screenMinX { screenMinX = x }
            if y < screenMinY { screenMinY = y }
            if x > screenMaxX { screenMaxX = x }
            if y > screenMaxY { screenMaxY = y }
            screenCount += 1
        }
    }
}

print("device rect:", deviceMinX, deviceMinY, deviceMaxX, deviceMaxY)
if screenCount > 0 {
    print("screen rect:", screenMinX, screenMinY, screenMaxX, screenMaxY)
    print("screen size:", screenMaxX - screenMinX + 1, "x", screenMaxY - screenMinY + 1)
}

let outColorSpace = CGColorSpaceCreateDeviceRGB()
let ctx = CGContext(data: &maskData,
                    width: width,
                    height: height,
                    bitsPerComponent: 8,
                    bytesPerRow: bytesPerRow,
                    space: outColorSpace,
                    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
let maskImage = ctx.makeImage()!

let dest = URL(fileURLWithPath: outputMaskPath) as CFURL
let destination = CGImageDestinationCreateWithURL(dest, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(destination, maskImage, nil)
CGImageDestinationFinalize(destination)

print("mask written to", outputMaskPath)
