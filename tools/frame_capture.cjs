// Deterministic frame-builder export. Original app pixels are never generated or retouched.
// node tools/frame_capture.cjs raw.png output.png [frame-id]
const fs = require('node:fs');
const path = require('node:path');
const {createCanvas, loadImage} = require('@napi-rs/canvas');
async function frameCapture(source, destination, frameId='iPhone_17_pro-silver-portrait') {
  const root=path.resolve(__dirname,'..');
  const manifest=JSON.parse(fs.readFileSync(path.join(root,'frame-manifest.json')));
  const frames=Array.isArray(manifest)?manifest:manifest.frames;
  const frame=frames.find(f=>f.id===frameId);
  if(!frame) throw new Error('Unknown frame '+frameId);
  const [screen,bezel]=await Promise.all([loadImage(source),loadImage(path.join(root,frame.src))]);
  const r=frame.screenRect;
  if(Math.abs(screen.width/screen.height-r.width/r.height)>.002) throw new Error('Capture aspect ratio does not match frame; select a matching simulator or frame.');
  const canvas=createCanvas(frame.outputSize.width,frame.outputSize.height), ctx=canvas.getContext('2d');
  ctx.save(); ctx.beginPath(); ctx.roundRect(r.x,r.y,r.width,r.height,frame.cornerRadius); ctx.clip();
  ctx.drawImage(screen,r.x,r.y,r.width,r.height); ctx.restore();
  const iw=376,ih=110,ix=r.x+(r.width-iw)/2,iy=r.y+(frame.src.includes('iPhone_air-')?60:42);
  const pixels=ctx.getImageData(ix,iy,iw,ih).data;
  const native=[.25,.5,.75].every(y=>[.15,.5,.85].every(x=>{const i=(Math.floor(y*ih)*iw+Math.floor(x*iw))*4;return pixels[i]<16&&pixels[i+1]<16&&pixels[i+2]<16&&pixels[i+3]>240;}));
  ctx.drawImage(bezel,0,0,canvas.width,canvas.height);
  if(!native){ctx.fillStyle='#000';ctx.beginPath();ctx.roundRect(ix,iy,iw,ih,ih/2);ctx.fill();}
  fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,canvas.toBuffer('image/png'));
  return {width:canvas.width,height:canvas.height,frameId};
}
module.exports={frameCapture};
if(require.main===module) frameCapture(process.argv[2],process.argv[3],process.argv[4]).then(console.log).catch(e=>{console.error(e.message);process.exitCode=1;});
