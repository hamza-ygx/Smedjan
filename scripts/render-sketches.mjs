// Renders scripts/sketches/definitions.mjs into hand-drawn JPEGs in public/sketches.
// Usage: npm run sketches [-- id ...]
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright-core";
import { sketches } from "./sketches/definitions.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "sketches");
mkdirSync(outDir, { recursive: true });

const font = (f) => readFileSync(path.join(root, "scripts/sketches/fonts", f)).toString("base64");
const roughSrc = readFileSync(path.join(root, "node_modules/roughjs/bundled/rough.js"), "utf8");

const W = 1400;
const H = 1000;

const page = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Caveat;src:url(data:font/woff2;base64,${font("caveat.woff2")}) format("woff2");font-weight:400 700}
@font-face{font-family:Hand;src:url(data:font/woff2;base64,${font("patrick-hand.woff2")}) format("woff2")}
html,body{margin:0;background:#fff}
svg{display:block}
</style></head><body>
<svg id="s" xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"></svg>
<script>${roughSrc}</script>
<script>
const W=${W},H=${H};
const INK="#1f2a44",RED="#c8352b",GREY="#868e96";
const NS="http://www.w3.org/2000/svg";
let rnd;
function seed(str){let h=1779033703^str.length;for(let i=0;i<str.length;i++){h=Math.imul(h^str.charCodeAt(i),3432918353);h=h<<13|h>>>19}
  let a=h>>>0;rnd=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const jit=(n)=>(rnd()-0.5)*2*n;

function draw(def){
  const svg=document.getElementById("s");
  svg.innerHTML="";
  seed(def.id);
  const rc=rough.svg(svg);
  const base={roughness:1.3,bowing:1.2,stroke:INK,strokeWidth:2.6,seed:Math.floor(rnd()*1e6)+1};
  const opt=(o={})=>({...base,seed:Math.floor(rnd()*1e6)+1,...o});
  const add=(n)=>{svg.appendChild(n);return n};

  // paper
  const defs=document.createElementNS(NS,"defs");
  defs.innerHTML='<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0.06 0"/></filter>'+
    '<radialGradient id="vig" cx="50%" cy="45%" r="75%"><stop offset="70%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#5c4a2a" stop-opacity="0.12"/></radialGradient>';
  add(defs);
  const bg=document.createElementNS(NS,"rect");bg.setAttribute("width",W);bg.setAttribute("height",H);bg.setAttribute("fill","#f8f5ee");add(bg);
  const dots=document.createElementNS(NS,"g");dots.setAttribute("fill","#c9c2b3");
  for(let x=20;x<W;x+=40)for(let y=20;y<H;y+=40){const c=document.createElementNS(NS,"circle");c.setAttribute("cx",x);c.setAttribute("cy",y);c.setAttribute("r",1.4);dots.appendChild(c)}
  add(dots);
  const gr=document.createElementNS(NS,"rect");gr.setAttribute("width",W);gr.setAttribute("height",H);gr.setAttribute("filter","url(#grain)");add(gr);

  function text(x,y,str,{size=34,font="Hand",color=INK,weight=400,anchor="start",rot=null}={}){
    const t=document.createElementNS(NS,"text");
    t.setAttribute("x",x);t.setAttribute("y",y);t.setAttribute("font-family",font==="emoji"?"Noto Color Emoji":font);
    t.setAttribute("font-size",size);t.setAttribute("fill",color);t.setAttribute("font-weight",weight);t.setAttribute("text-anchor",anchor);
    const r=rot??jit(0.8);t.setAttribute("transform","rotate("+r+" "+x+" "+y+")");
    const lines=String(str).split("\\n");
    lines.forEach((ln,i)=>{const sp=document.createElementNS(NS,"tspan");sp.setAttribute("x",x);if(i)sp.setAttribute("dy",size*1.05);sp.textContent=ln;t.appendChild(sp)});
    return add(t);
  }
  const rect=(x,y,w,h,o)=>add(rc.rectangle(x+jit(2),y+jit(2),w+jit(3),h+jit(3),opt(o)));
  const line=(x1,y1,x2,y2,o)=>add(rc.line(x1,y1,x2,y2,opt(o)));
  function arrow(x1,y1,x2,y2,color){
    const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1;
    const bend=Math.min(60,len*0.18)*(rnd()>0.5?1:-1);
    const cx=mx-dy/len*bend,cy=my+dx/len*bend;
    add(rc.curve([[x1,y1],[cx,cy],[x2,y2]],opt({stroke:color,strokeWidth:2.4,roughness:1})));
    const ang=Math.atan2(y2-cy,x2-cx);
    for(const s of[-1,1]){const a=ang+Math.PI+s*0.45;line(x2,y2,x2+Math.cos(a)*22,y2+Math.sin(a)*22,{stroke:color,strokeWidth:2.4,roughness:0.6})}
  }

  for(const e of def.els){
    switch(e.t){
      case"title":{const t=text(e.x,e.y,e.text,{size:e.size,font:"Caveat",weight:700,rot:jit(1)});
        const b=t.getBBox();add(rc.curve([[b.x,e.y+14],[b.x+b.width*0.5,e.y+20+jit(4)],[b.x+b.width,e.y+12]],opt({strokeWidth:3,stroke:"#e8590c"})));break}
      case"text":text(e.x,e.y,e.text,{size:e.size,color:e.color||INK,weight:e.bold?700:400,font:e.emoji?"emoji":"Hand"});break;
      case"box":rect(e.x,e.y,e.w,e.h,{fill:e.fill,fillStyle:e.fillStyle||"hachure",hachureGap:e.gap||8,fillWeight:1.2,strokeLineDash:e.dashed?[14,10]:undefined,...(e.fill&&e.fillStyle!=="solid"?{}:{})});break;
      case"btn":{if(e.disabled)rect(e.x,e.y,e.w,e.h,{stroke:GREY,fill:"#495057",hachureGap:5,fillWeight:1,strokeLineDash:[10,8]});
        else rect(e.x,e.y,e.w,e.h,{fill:e.fill||"#adb5bd",fillStyle:"hachure",hachureGap:e.fill?9:13,fillWeight:e.fill?1.4:1,hachureAngle:-41+jit(8)});
        text(e.x+e.w/2,e.y+e.h/2+(e.size||36)*0.33,e.text,{size:e.size||36,anchor:"middle",weight:700,color:e.disabled?"#f8f5ee":INK});break}
      case"input":{if(e.label)text(e.x+4,e.y-10,e.label,{size:26,color:GREY});rect(e.x,e.y,e.w,e.h,{strokeWidth:2.2});
        if(e.placeholder)text(e.x+18,e.y+e.h/2+11,e.placeholder,{size:30,color:GREY});break}
      case"line":line(e.x1,e.y1,e.x2,e.y2,e.light?{strokeWidth:1.2,stroke:"#9aa0aa"}:{stroke:e.color||INK,strokeWidth:e.strokeWidth||2.4});break;
      case"scribble":{const pts=[];for(let i=0;i<=e.w;i+=14)pts.push([e.x+i,e.y+Math.sin(i/9)*5+jit(2)]);add(rc.curve(pts,opt({strokeWidth:2,stroke:e.color||"#55607a",roughness:0.8})));break}
      case"img":rect(e.x,e.y,e.w,e.h,{});line(e.x,e.y,e.x+e.w,e.y+e.h,{strokeWidth:1.6,stroke:"#9aa0aa"});line(e.x+e.w,e.y,e.x,e.y+e.h,{strokeWidth:1.6,stroke:"#9aa0aa"});break;
      case"note":{const t=text(e.x,e.y,e.text,{size:e.size||38,font:"Caveat",color:RED,weight:700,rot:jit(2.5)});
        if(!e.noArrow&&e.to){const b=t.getBBox();const [tx,ty]=e.to;
          const sx=Math.max(b.x-8,Math.min(tx,b.x+b.width+8)),sy=Math.max(b.y-8,Math.min(ty,b.y+b.height+8));
          const fx=(tx>b.x&&tx<b.x+b.width)?tx:sx,fy=(ty>b.y&&ty<b.y+b.height)?(ty<b.y+b.height/2?b.y-8:b.y+b.height+8):sy;
          arrow(fx,fy,tx,ty,RED)}break}
      case"bars":{const n=e.values.length,mx=Math.max(...e.values);
        line(e.x,e.y,e.x,e.y+e.h);line(e.x,e.y+e.h,e.x+e.w,e.y+e.h);
        const fills=["#e8590c","#1f2a44","#e8590c","#1f2a44","#e8590c"];
        e.values.forEach((v,i)=>{if(e.horizontal){const bh=e.h/n*0.62,y=e.y+i*e.h/n+e.h/n*0.19;rect(e.x+4,y,(e.w-10)*v/mx,bh,{fill:fills[i%5],hachureGap:7})}
          else{const bw=e.w/n*0.6,x=e.x+i*e.w/n+e.w/n*0.2,bh=(e.h-10)*v/mx;rect(x,e.y+e.h-bh,bw,bh,{fill:fills[i%5],hachureGap:7})}});break}
      case"linechart":{line(e.x,e.y,e.x,e.y+e.h);line(e.x,e.y+e.h,e.x+e.w,e.y+e.h);
        const mx=Math.max(...e.values)*1.1,n=e.values.length;
        const pts=e.values.map((v,i)=>[e.x+20+i*(e.w-40)/(n-1),e.y+e.h-(e.h-10)*v/mx]);
        add(rc.curve(pts,opt({stroke:"#e8590c",strokeWidth:3.4})));
        pts.forEach(([x,y])=>add(rc.circle(x,y,12,opt({fill:INK,fillStyle:"solid",strokeWidth:1.5}))));break}
      case"check":{const s=40;rect(e.x,e.y-s+6,s,s,{strokeWidth:2.4});
        if(e.checked){add(rc.linearPath([[e.x+6,e.y-14],[e.x+17,e.y],[e.x+46,e.y-46]],opt({stroke:"#2b8a3e",strokeWidth:4})))}
        const t=text(e.x+68,e.y,e.text,{size:e.size||40,color:e.checked?GREY:INK});
        if(e.checked){const b=t.getBBox();line(b.x-4,e.y-(e.size||40)*0.3,b.x+b.width+6,e.y-(e.size||40)*0.3,{stroke:GREY,strokeWidth:2.4})}break}
      case"grid":{const{x,y,cols,rows,cw,ch}=e;
        if(e.open){for(let c=1;c<cols;c++)line(x+c*cw,y,x+c*cw,y+rows*ch,{strokeWidth:4});for(let r=1;r<rows;r++)line(x,y+r*ch,x+cols*cw,y+r*ch,{strokeWidth:4});break}
        if(e.days){["M","T","O","T","F","L","S"].forEach((d,i)=>text(x+i*cw+cw/2,y-12,d,{size:28,anchor:"middle",color:GREY}))}
        for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const cx=x+c*cw,cy=y+r*ch;
          if(!e.days){rect(cx,cy,cw,ch,{strokeWidth:2});continue}
          const day=r*cols+c-e.days.offset+1;if(day<1||day>e.days.count)continue;
          const wk=c>=5,busy=e.days.busy.includes(day),sel=day===e.days.selected;
          if(sel)add(rc.circle(cx+cw/2,cy+ch/2-8,70,opt({fill:"#e8590c",fillStyle:"hachure",hachureGap:6,stroke:"#e8590c"})));
          text(cx+cw/2,cy+ch/2+4,String(day),{size:34,anchor:"middle",color:wk||busy?GREY:INK,weight:sel?700:400});
          if(wk||busy)line(cx+cw/2-24,cy+ch/2+14,cx+cw/2+24,cy+ch/2-26,{stroke:GREY,strokeWidth:1.6})}break}
      case"x":{const h=e.s/2;line(e.x-h,e.y-h,e.x+h,e.y+h,{strokeWidth:6,stroke:INK});line(e.x+h,e.y-h,e.x-h,e.y+h,{strokeWidth:6,stroke:INK});break}
      case"o":add(rc.ellipse(e.x,e.y,e.s,e.s*0.95,opt({strokeWidth:6,stroke:"#e8590c"})));break;
      case"pie":{let a=-Math.PI/2;const cols=["#e8590c","#1f2a44","#adb5bd"];
        e.parts.forEach((p,i)=>{const b=a+p*Math.PI*2;add(rc.arc(e.x,e.y,e.d,e.d,a,b,true,opt({fill:cols[i%3],hachureGap:7,hachureAngle:i*50})));a=b});break}
      case"tabs":{const n=e.items.length,w=e.w/n;rect(e.x,e.y,e.w,e.h,{});
        e.items.forEach((it,i)=>{if(i)line(e.x+i*w,e.y,e.x+i*w,e.y+e.h);if(i===e.active)rect(e.x+i*w+5,e.y+5,w-10,e.h-10,{fill:"#e8590c",hachureGap:8,stroke:"none"});
          text(e.x+i*w+w/2,e.y+e.h/2+11,it,{size:32,anchor:"middle",weight:i===e.active?700:400})});break}
      case"wall":line(e.x1,e.y1,e.x2,e.y2,{strokeWidth:e.thin?4:8,roughness:0.9,bowing:0.6});break;
      case"gap":add(rc.line(e.x1,e.y1,e.x2,e.y2,{stroke:"#f8f5ee",strokeWidth:e.w||14,roughness:0}));break;
      case"door":{const r=e.r,a=e.a*Math.PI/180,s=e.s||1,b=a+s*Math.PI/2;
        add(rc.line(e.x,e.y,e.x+Math.cos(a)*r,e.y+Math.sin(a)*r,{stroke:"#f8f5ee",strokeWidth:14,roughness:0}));
        line(e.x,e.y,e.x+Math.cos(b)*r,e.y+Math.sin(b)*r,{strokeWidth:2.6});
        const lo=Math.min(a,b),hi=Math.max(a,b);add(rc.arc(e.x,e.y,r*2,r*2,lo,hi,false,opt({strokeWidth:1.4,stroke:"#55607a",roughness:0.6})));break}
      case"win":{const dx=e.x2-e.x1,dy=e.y2-e.y1,l=Math.hypot(dx,dy)||1,nx=-dy/l*5,ny=dx/l*5;
        add(rc.line(e.x1,e.y1,e.x2,e.y2,{stroke:"#f8f5ee",strokeWidth:12,roughness:0}));
        for(const k of[-1,0,1])line(e.x1+nx*k,e.y1+ny*k,e.x2+nx*k,e.y2+ny*k,{strokeWidth:k?2:1.2,roughness:0.5,stroke:k?INK:"#55607a"});break}
      case"room":{text(e.x,e.y,e.name,{size:e.size||34,anchor:"middle",weight:700});if(e.area)text(e.x,e.y+(e.size||34)*0.95,e.area,{size:(e.size||34)*0.8,anchor:"middle",color:"#55607a"});break}
      case"circle":add(rc.circle(e.x,e.y,e.d,opt({fill:e.fill,fillStyle:e.fillStyle||"hachure",hachureGap:e.gap||7,strokeWidth:e.sw||2.2})));break;
      case"ellipse":add(rc.ellipse(e.x,e.y,e.w,e.h,opt({fill:e.fill,hachureGap:7,strokeWidth:2})));break;
      case"compass":{const r=(e.rot||0)*Math.PI/180,P=(dx,dy)=>[e.x+dx*Math.cos(r)-dy*Math.sin(r),e.y+dx*Math.sin(r)+dy*Math.cos(r)];
        add(rc.circle(e.x,e.y,64,opt({strokeWidth:1.8})));add(rc.polygon([P(0,-28),P(-10,8),P(10,8)],opt({fill:INK,fillStyle:"solid",strokeWidth:1.5})));
        const [nx,ny]=P(0,-46);text(nx,ny+10,"N",{size:30,anchor:"middle",weight:700,rot:0});break}
      case"scale":{const step=e.px;line(e.x,e.y,e.x+step*e.n,e.y,{strokeWidth:2.4});for(let i=0;i<=e.n;i++){line(e.x+i*step,e.y-8,e.x+i*step,e.y+8,{strokeWidth:2});text(e.x+i*step,e.y+34,String(i),{size:24,anchor:"middle",color:"#55607a"})}text(e.x+step*e.n+16,e.y+34,"m",{size:24,color:"#55607a"});break}
      case"progress":rect(e.x,e.y,e.w,e.h,{});rect(e.x+4,e.y+4,(e.w-8)*e.value,e.h-8,{fill:"#e8590c",hachureGap:6,stroke:"none"});break;
    }
  }
  const v=document.createElementNS(NS,"rect");v.setAttribute("width",W);v.setAttribute("height",H);v.setAttribute("fill","url(#vig)");add(v);
}
</script></body></html>`;

const only = process.argv.slice(2);
const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: W, height: H } });
await p.setContent(page);
await p.evaluate(() => document.fonts.ready);
for (const def of sketches) {
  if (only.length && !only.includes(def.id)) continue;
  await p.evaluate((d) => draw(d), def);
  await p.evaluate(() => document.fonts.ready);
  const file = path.join(outDir, `${def.id}.jpg`);
  await p.locator("#s").screenshot({ path: file, type: "jpeg", quality: 82 });
  console.log("rendered", path.relative(root, file));
}
await browser.close();
