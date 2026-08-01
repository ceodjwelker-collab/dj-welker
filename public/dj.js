/* DJ Welker — shared site behaviour. Loaded deferred on every page. */
(function () {
  'use strict';
  var d = document, b = d.body;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Proof Mode (remembers your choice) ---------- */
  var proofBtn = d.getElementById('proofBtn');
  function setProof(on) {
    b.classList.toggle('proof', on);
    if (proofBtn) proofBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    try { localStorage.setItem('dj-proof', on ? '1' : '0'); } catch (e) {}
  }
  if (proofBtn) {
    var saved = '0';
    try { saved = localStorage.getItem('dj-proof') || '0'; } catch (e) {}
    if (saved === '1') setProof(true);
    proofBtn.addEventListener('click', function () { setProof(!b.classList.contains('proof')); });
    // keyboard shortcut: P (ignored while typing)
    d.addEventListener('keydown', function (e) {
      var t = e.target || {};
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName || '') || t.isContentEditable;
      if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault(); setProof(!b.classList.contains('proof'));
      }
    });
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = d.getElementById('navToggle'), links = d.getElementById('navLinks');
  function closeNav() {
    if (!toggle || !links) return;
    links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); b.classList.remove('nav-open');
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.classList.toggle('nav-open', open);
    });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeNav(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) closeNav(); });
  }

  /* ---------- Back to top ---------- */
  var top = d.getElementById('toTop');
  if (top) {
    var onScroll = function () { top.classList.toggle('show', window.scrollY > 700); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      var brand = d.querySelector('.brand'); if (brand) brand.focus({ preventScroll: true });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealables = d.querySelectorAll('.reveal');
  if (revealables.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Harden external links ---------- */
  d.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname && a.hostname !== location.hostname) {
      a.setAttribute('rel', 'noopener noreferrer');
      if (!a.hasAttribute('target')) a.setAttribute('target', '_blank');
    }
  });

  /* ---------- Copy-to-clipboard buttons ---------- */
  d.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = btn.getAttribute('data-copy'), done = function () {
        var old = btn.textContent; btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1400);
      };
      if (navigator.clipboard) { navigator.clipboard.writeText(val).then(done, done); } else { done(); }
    });
  });

  /* ---------- Current year in footers ---------- */
  d.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

/* ============ DJ Welker — interactive / 3D layer (20 features, site-wide) ============ */
function djConstellation(cv, N){
  if(!window.THREE) return;
  var THREE=window.THREE, reduce=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rn; try{ rn=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true}); }catch(e){ return; }
  rn.setClearColor(0x000000,0); var PR=Math.min(devicePixelRatio||1,2); rn.setPixelRatio(PR);
  var scene=new THREE.Scene(); scene.fog=new THREE.Fog(0xF4F0E6,9,30);
  var cam=new THREE.PerspectiveCamera(60,1,0.1,120); cam.position.z=14;
  var G=new THREE.Group(); scene.add(G);
  var sc=document.createElement('canvas'); sc.width=sc.height=64;
  var sx=sc.getContext('2d'), gr=sx.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(0.4,'rgba(255,255,255,0.72)'); gr.addColorStop(1,'rgba(255,255,255,0)');
  sx.fillStyle=gr; sx.beginPath(); sx.arc(32,32,32,0,7); sx.fill(); var sp=new THREE.CanvasTexture(sc);
  var R=9.5, pts=[], pos=new Float32Array(N*3), sz=new Float32Array(N), geo=new THREE.BufferGeometry();
  for(var i=0;i<N;i++){ var v=new THREE.Vector3((Math.random()*2-1)*R,(Math.random()*2-1)*R*0.6,(Math.random()*2-1)*R*0.65);
    v.vel=new THREE.Vector3((Math.random()-0.5)*0.0055,(Math.random()-0.5)*0.0055,(Math.random()-0.5)*0.0055);
    pts.push(v); pos[i*3]=v.x;pos[i*3+1]=v.y;pos[i*3+2]=v.z; sz[i]=(Math.random()<0.15)?(3.4+Math.random()*2.2):(1.0+Math.random()*1.3); }
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3)); geo.setAttribute('aSize',new THREE.BufferAttribute(sz,1));
  var uni={uTex:{value:sp},uColor:{value:new THREE.Color(0x1E4635)},uFog:{value:new THREE.Color(0xF4F0E6)},uN:{value:9.0},uF:{value:30.0},uPR:{value:PR}};
  var mat=new THREE.ShaderMaterial({uniforms:uni,transparent:true,depthWrite:false,
    vertexShader:'attribute float aSize;uniform float uPR;uniform float uN;uniform float uF;varying float vF;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);float dd=-mv.z;vF=clamp((dd-uN)/(uF-uN),0.0,1.0);gl_PointSize=aSize*uPR*(78.0/dd);gl_Position=projectionMatrix*mv;}',
    fragmentShader:'uniform sampler2D uTex;uniform vec3 uColor;uniform vec3 uFog;varying float vF;void main(){float a=texture2D(uTex,gl_PointCoord).a;gl_FragColor=vec4(mix(uColor,uFog,vF*0.9),a*(1.0-vF*0.82));}'});
  G.add(new THREE.Points(geo,mat));
  var lgeo=new THREE.BufferGeometry(); G.add(new THREE.LineSegments(lgeo,new THREE.LineBasicMaterial({color:0x1E4635,transparent:true,opacity:0.13,fog:true})));
  var tmx=0,tmy=0,mx=0,my=0,kick=0; addEventListener('pointermove',function(e){ tmx=e.clientX/innerWidth-0.5; tmy=e.clientY/innerHeight-0.5; },{passive:true});
  addEventListener('pointerdown',function(){ kick=Math.min(kick+1,1.6); },{passive:true});
  function rs(){ var p=cv.parentNode,w=p.clientWidth,h=p.clientHeight||420; rn.setSize(w,h,false); cam.aspect=w/h; cam.updateProjectionMatrix(); }
  addEventListener('resize',rs); rs();
  var MAXD=3.5, run=true; document.addEventListener('visibilitychange',function(){ run=!document.hidden; if(run&&!reduce) requestAnimationFrame(tk); });
  function bd(){ var s=[],pa=geo.attributes.position.array; for(var i=0;i<N;i++)for(var j=i+1;j<N;j++){var dx=pa[i*3]-pa[j*3],dy=pa[i*3+1]-pa[j*3+1],dz=pa[i*3+2]-pa[j*3+2];if(dx*dx+dy*dy+dz*dz<MAXD*MAXD)s.push(pa[i*3],pa[i*3+1],pa[i*3+2],pa[j*3],pa[j*3+1],pa[j*3+2]);} lgeo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(s),3)); }
  function tk(){ if(!run)return; var pa=geo.attributes.position.array; for(var i=0;i<N;i++){var v=pts[i];v.x+=v.vel.x;v.y+=v.vel.y;v.z+=v.vel.z;if(v.x>R||v.x<-R)v.vel.x*=-1;if(v.y>R*0.6||v.y<-R*0.6)v.vel.y*=-1;if(v.z>R*0.65||v.z<-R*0.65)v.vel.z*=-1;pa[i*3]=v.x;pa[i*3+1]=v.y;pa[i*3+2]=v.z;} geo.attributes.position.needsUpdate=true; bd(); var t=Date.now(); kick*=0.93; G.rotation.y+=0.001+mx*0.012+kick*0.05; G.rotation.x=Math.sin(t*0.00006)*0.08-my*0.16; mx+=(tmx-mx)*0.06; my+=(tmy-my)*0.06; cam.position.x=mx*5.5; cam.position.y=-my*3.6; cam.position.z=14-kick*2.4; cam.lookAt(0,0,0); rn.render(scene,cam); if(!reduce)requestAnimationFrame(tk); }
  bd(); if(reduce){ rn.render(scene,cam); } else { tk(); }
}

(function(){
  'use strict';
  var d=document, root=d.documentElement, B=d.body;
  var reduce=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
  var mpx=innerWidth/2, mpy=innerHeight/2;
  addEventListener('pointermove',function(e){ mpx=e.clientX; mpy=e.clientY; },{passive:true});
  B.classList.add('dj-ready');

  /* F1-3 header constellation on interior pages */
  (function(){ if(d.getElementById('heroCanvas'))return;
    var host=d.querySelector('.case-head, header.pad, main>header, main>section.pad'); if(!host)return;
    if(getComputedStyle(host).position==='static') host.style.position='relative'; host.style.overflow='hidden';
    [].slice.call(host.children).forEach(function(c){ if(c.tagName!=='CANVAS'){ if(getComputedStyle(c).position==='static')c.style.position='relative'; c.style.zIndex='1'; } });
    var cv=d.createElement('canvas'); cv.setAttribute('aria-hidden','true'); cv.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none'; host.insertBefore(cv,host.firstChild);
    var boot=function(){ djConstellation(cv, reduce?40:64); };
    if(window.THREE) boot(); else if(!reduce){ var s=d.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'; s.onload=boot; s.onerror=function(){}; d.head.appendChild(s); }
  })();

  /* F10 scroll progress */
  var prog=d.createElement('div'); prog.id='djProg'; B.appendChild(prog);
  var setP=function(){ var h=root.scrollHeight-innerHeight; prog.style.transform='scaleX('+(h>0?(scrollY/h):0).toFixed(4)+')'; };
  addEventListener('scroll',setP,{passive:true}); addEventListener('resize',setP); setP();

  /* F11 back-to-top ring */
  var top=d.getElementById('toTop');
  if(top){ top.insertAdjacentHTML('afterbegin','<svg class="djring" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20"/></svg>'); var rc=top.querySelector('.djring circle'); if(rc){ var C=2*Math.PI*20; rc.style.strokeDasharray=C; var upd=function(){ var h=root.scrollHeight-innerHeight; rc.style.strokeDashoffset=(C*(1-(h>0?scrollY/h:0))).toFixed(2); }; addEventListener('scroll',upd,{passive:true}); upd(); } }

  /* F12 nav auto-hide */
  var nav=d.querySelector('.nav'), lastY=scrollY;
  if(nav){ addEventListener('scroll',function(){ var y=scrollY; if(y>160&&y>lastY+4)nav.classList.add('nav-hide'); else if(y<lastY-4||y<160)nav.classList.remove('nav-hide'); lastY=y; },{passive:true}); }

  /* F13 active nav link */
  var pg=location.pathname.replace(/\/+$/,'')||'/';
  d.querySelectorAll('.nav-l a').forEach(function(a){ var h=(a.getAttribute('href')||'').replace(/\/+$/,'')||'/'; if(h===pg||(pg==='/'&&h==='/')) a.classList.add('active'); });

  /* F14 smooth anchor */
  d.querySelectorAll('a[href^="#"]').forEach(function(a){ a.addEventListener('click',function(e){ var id=a.getAttribute('href'); if(id.length>1){ var t=d.querySelector(id); if(t){ e.preventDefault(); t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}); } } }); });

  /* F16 number counters */
  (function(){ var els=[].slice.call(d.querySelectorAll('.stats .s .n')); var use=[];
    els.forEach(function(el){ var m=(el.textContent||'').trim().match(/^(\d[\d,]*\.?\d*)(.*)$/); if(!m)return; var num=parseFloat(m[1].replace(/,/g,'')); if(isNaN(num)||num<3)return; el.setAttribute('data-final',num); el.setAttribute('data-suf',(m[2]||'').trim()); el.textContent='0'+(m[2]||'').trim(); use.push(el); });
    function run(el){ var tg=parseFloat(el.getAttribute('data-final')), suf=el.getAttribute('data-suf')||'', t0=performance.now(); (function st(t){ var k=Math.min(1,(t-t0)/1000), e=1-Math.pow(1-k,3), v=tg*e; el.textContent=(tg%1===0?Math.round(v):v.toFixed(1))+suf; if(k<1)requestAnimationFrame(st); })(performance.now()); }
    if(!use.length)return; if(reduce||!('IntersectionObserver'in window)){ use.forEach(run); return; }
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){run(en.target);io.unobserve(en.target);}});},{threshold:0.6}); use.forEach(function(el){io.observe(el);});
  })();

  /* F17 interior reveal + stagger */
  (function(){ var mine=[]; d.querySelectorAll('.csec, .cfig, .factpanel, .chips, .ba, .homeabout').forEach(function(el){ if(!el.classList.contains('reveal')){ el.classList.add('reveal'); mine.push(el); } });
    d.querySelectorAll('.caps,.feat,.cgrid2,.stats,.worklist').forEach(function(p){ [].slice.call(p.children).forEach(function(c,i){ if(c.classList&&c.classList.contains('reveal'))c.style.transitionDelay=(i*65)+'ms'; }); });
    if(!mine.length)return; if(reduce||!('IntersectionObserver'in window)){ mine.forEach(function(el){el.classList.add('in');}); return; }
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:0.08,rootMargin:'0px 0px -30px 0px'}); mine.forEach(function(el){io.observe(el);});
  })();

  if(fine && !reduce){
    var glow=d.createElement('div'); glow.className='dj-cursor'; B.appendChild(glow);
    var ring=d.createElement('div'); ring.className='dj-cursor-ring'; B.appendChild(ring);
    var rx=mpx, ry=mpy;
    (function loop(){ rx+=(mpx-rx)*0.2; ry+=(mpy-ry)*0.2; glow.style.transform='translate('+mpx+'px,'+mpy+'px)'; ring.style.transform='translate('+rx+'px,'+ry+'px)'; requestAnimationFrame(loop); })();
    var HOV='a,button,.btn,.wlink,.witem,.cap,.proofbtn';
    d.addEventListener('pointerover',function(e){ if(e.target.closest&&e.target.closest(HOV))ring.classList.add('big'); });
    d.addEventListener('pointerout',function(e){ if(e.target.closest&&e.target.closest(HOV))ring.classList.remove('big'); });
    d.querySelectorAll('.btn,.proofbtn,#toTop').forEach(function(el){ el.addEventListener('pointermove',function(e){ var r=el.getBoundingClientRect(); el.style.transform='translate('+((e.clientX-r.left-r.width/2)*0.25).toFixed(1)+'px,'+((e.clientY-r.top-r.height/2)*0.35).toFixed(1)+'px)'; }); el.addEventListener('pointerleave',function(){ el.style.transform=''; }); });
    d.querySelectorAll('.witem,.caps .cap,.feat .f,.cfig,.factpanel .fact').forEach(function(el){ el.classList.add('dj-tilt'); el.addEventListener('pointermove',function(e){ var r=el.getBoundingClientRect(); var px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5; el.style.transform='perspective(820px) rotateX('+(-py*4.5).toFixed(2)+'deg) rotateY('+(px*5.5).toFixed(2)+'deg) translateY(-2px)'; }); el.addEventListener('pointerleave',function(){ el.style.transform=''; }); });
    d.querySelectorAll('.emblem img,.casehero img').forEach(function(el){ var h=el.closest('.emblem,.casehero')||el; h.addEventListener('pointermove',function(e){ var r=h.getBoundingClientRect(); var px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5; el.style.transition='transform .05s'; el.style.transform='perspective(900px) rotateX('+(-py*9).toFixed(2)+'deg) rotateY('+(px*11).toFixed(2)+'deg) scale(1.03)'; }); h.addEventListener('pointerleave',function(){ el.style.transition='transform .4s ease'; el.style.transform=''; }); });
    d.querySelectorAll('.wshot,.cfig,.casehero').forEach(function(el){ el.classList.add('dj-spot'); el.addEventListener('pointermove',function(e){ var r=el.getBoundingClientRect(); el.style.setProperty('--sx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%'); el.style.setProperty('--sy',((e.clientY-r.top)/r.height*100).toFixed(1)+'%'); }); });
  }
})();

/* ============ DJ Welker — crazy/unique layer ============ */
(function(){ 'use strict';
  var d=document, B=d.body;
  var reduce=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
  var mpx=innerWidth/2,mpy=innerHeight/2; addEventListener('pointermove',function(e){mpx=e.clientX;mpy=e.clientY;},{passive:true});

  /* A. headline scramble / decode on scroll-in */
  (function(){ if(reduce||!('IntersectionObserver'in window))return;
    var ch='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#%';
    function scr(el){ var f=el.getAttribute('data-txt'),L=f.length,fr=0;
      var iv=setInterval(function(){ var o=''; for(var i=0;i<L;i++){ o+=(f[i]===' ')?' ':(i<fr*1.6? f[i] : ch[Math.floor(Math.random()*ch.length)]); } el.textContent=o; fr++; if(fr>L/1.6+2){clearInterval(iv);el.textContent=f;} },28); }
    var hs=[].slice.call(d.querySelectorAll('.sec-head h2, .case-head h1, .csec h2')).filter(function(el){return el.children.length===0 && el.textContent.trim().length>1 && el.textContent.trim().length<46;});
    hs.forEach(function(el){ el.setAttribute('data-txt', el.textContent); });
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){scr(en.target);io.unobserve(en.target);}});},{threshold:0.55});
    hs.forEach(function(el){io.observe(el);});
  })();

  /* B. cursor particle trail */
  if(fine&&!reduce){ (function(){
    var c=d.createElement('canvas'); c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:118'; B.appendChild(c);
    var x=c.getContext('2d'), DPR=Math.min(devicePixelRatio||1,2), ps=[], lx=mpx, ly=mpy;
    function rz(){ c.width=innerWidth*DPR; c.height=innerHeight*DPR; } rz(); addEventListener('resize',rz);
    addEventListener('pointermove',function(e){ var sp=Math.min(7,Math.hypot(e.clientX-lx,e.clientY-ly)/6); if(sp>0.7)ps.push({x:e.clientX,y:e.clientY,r:1.3+sp,life:1}); lx=e.clientX; ly=e.clientY; },{passive:true});
    (function draw(){ x.clearRect(0,0,c.width,c.height); for(var i=ps.length-1;i>=0;i--){ var p=ps[i]; p.life-=0.05; if(p.life<=0){ps.splice(i,1);continue;} x.globalAlpha=p.life*0.45; x.fillStyle='#1E4635'; x.beginPath(); x.arc(p.x*DPR,p.y*DPR,p.r*DPR*p.life,0,7); x.fill(); } x.globalAlpha=1; requestAnimationFrame(draw); })();
  })(); }

  /* C. Konami / "dj" easter egg -> DJ MODE */
  (function(){ var seq=['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'], buf=[], typed='';
    function toast(t){ var el=d.createElement('div'); el.className='dj-toast'; el.textContent=t; B.appendChild(el); setTimeout(function(){el.classList.add('show');},20); setTimeout(function(){el.classList.remove('show');setTimeout(function(){el.remove();},400);},2600); }
    function burst(){ var c=d.createElement('canvas'); c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:140'; B.appendChild(c); var x=c.getContext('2d'),DPR=Math.min(devicePixelRatio||1,2); c.width=innerWidth*DPR;c.height=innerHeight*DPR; var cx=innerWidth/2*DPR,cy=innerHeight*0.4*DPR,cols=['#1E4635','#3f855f','#c9d94a','#F4F0E6'],ps=[]; for(var i=0;i<150;i++){var a=Math.random()*7,s=(3+Math.random()*10)*DPR;ps.push({x:cx,y:cy,vx:Math.cos(a)*s,vy:Math.sin(a)*s-4*DPR,r:(2+Math.random()*4)*DPR,c:cols[i%4],life:1});}
      (function dd(){ x.clearRect(0,0,c.width,c.height); var al=false; ps.forEach(function(p){ if(p.life<=0)return; al=true; p.vy+=0.35*DPR; p.x+=p.vx; p.y+=p.vy; p.life-=0.012; x.globalAlpha=Math.max(0,p.life); x.fillStyle=p.c; x.beginPath(); x.arc(p.x,p.y,p.r,0,7); x.fill(); }); x.globalAlpha=1; if(al)requestAnimationFrame(dd); else c.remove(); })(); }
    function fire(){ if(B.classList.contains('dj-rave'))return; B.classList.add('dj-rave'); toast('DJ MODE'); burst(); setTimeout(function(){B.classList.remove('dj-rave');},6000); }
    addEventListener('keydown',function(e){ var k=(e.key||'').toLowerCase(); buf.push(k); if(buf.length>seq.length)buf.shift(); if(buf.length===seq.length&&seq.every(function(s,i){return buf[i]===s;}))fire();
      var t=e.target||{}; var typing=/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName||'')||t.isContentEditable; if(!typing&&/^[a-z]$/.test(k)){ typed=(typed+k).slice(-4); if(typed==='rave'||typed.slice(-2)==='dj'&&typed.length>=2&&/dj$/.test(typed)){ if(typed.slice(-2)==='dj')fire(); } if(typed==='rave')fire(); } });
  })();
})();

/* ============ DJ Welker — features batch 2 (palette · scrollspy · clock) ============ */
(function(){ 'use strict';
  var d=document,B=d.body, reduce=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function toast(t){ var el=d.createElement('div'); el.className='dj-toast'; el.textContent=t; B.appendChild(el); setTimeout(function(){el.classList.add('show');},20); setTimeout(function(){el.classList.remove('show');setTimeout(function(){el.remove();},400);},2400); }
  function djBurst(){ var c=d.createElement('canvas'); c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:205'; B.appendChild(c); var x=c.getContext('2d'),DPR=Math.min(devicePixelRatio||1,2); c.width=innerWidth*DPR;c.height=innerHeight*DPR; var cx=innerWidth/2*DPR,cy=innerHeight*0.4*DPR,cols=['#1E4635','#3f855f','#c9d94a','#F4F0E6'],ps=[]; for(var i=0;i<150;i++){var a=Math.random()*7,s=(3+Math.random()*10)*DPR;ps.push({x:cx,y:cy,vx:Math.cos(a)*s,vy:Math.sin(a)*s-4*DPR,r:(2+Math.random()*4)*DPR,c:cols[i%4],life:1});}(function dd(){x.clearRect(0,0,c.width,c.height);var al=false;ps.forEach(function(p){if(p.life<=0)return;al=true;p.vy+=0.35*DPR;p.x+=p.vx;p.y+=p.vy;p.life-=0.012;x.globalAlpha=Math.max(0,p.life);x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();});x.globalAlpha=1;if(al)requestAnimationFrame(dd);else c.remove();})(); }

  /* Command palette */
  var cmds=[
    {t:'Home',s:'index start',h:'/'},{t:'Work',s:'projects portfolio case',h:'/work'},{t:'Logo Design',s:'logos marks brand identity',h:'/logos'},{t:'About',s:'bio dj story',h:'/about'},{t:'Services',s:'offer hire what',h:'/services'},{t:'Lab',s:'experiments',h:'/lab'},{t:'Résumé',s:'cv resume',h:'/resume'},{t:'Contact',s:'email hire reach',h:'/contact'},
    {t:'Email DJ',s:'mail hire contact',a:function(){location.href='mailto:ceodjwelker@gmail.com';}},
    {t:'Copy email address',s:'clipboard',a:function(){ if(navigator.clipboard)navigator.clipboard.writeText('ceodjwelker@gmail.com'); toast('Email copied'); }},
    {t:'Toggle Proof Mode',s:'proof honest status',a:function(){ var p=d.getElementById('proofBtn'); if(p)p.click(); }},
    {t:'Activate DJ MODE',s:'rave party fun easter egg',a:function(){ if(B.classList.contains('dj-rave'))return; B.classList.add('dj-rave'); toast('DJ MODE'); djBurst(); setTimeout(function(){B.classList.remove('dj-rave');},6000); }}
  ];
  var pal=d.createElement('div'); pal.id='djPal'; pal.setAttribute('role','dialog'); pal.setAttribute('aria-modal','true');
  pal.innerHTML='<div class="djPal-bd"></div><div class="djPal-box"><input class="djPal-in" type="text" placeholder="Jump to a page or run a command…" aria-label="Command palette"><ul class="djPal-list"></ul><div class="djPal-hint">&#8593;&#8595; navigate &nbsp;·&nbsp; &#8629; open &nbsp;·&nbsp; esc close &nbsp;·&nbsp; press / or &#8984;K anytime</div></div>';
  B.appendChild(pal);
  var input=pal.querySelector('.djPal-in'), list=pal.querySelector('.djPal-list'), sel=0, filt=cmds.slice();
  function render(){ list.innerHTML=''; filt.forEach(function(c,i){ var li=d.createElement('li'); li.textContent=c.t; li.className=(i===sel?'on':''); li.addEventListener('mousemove',function(){sel=i;paint();}); li.addEventListener('click',function(){run(c);}); list.appendChild(li); }); }
  function paint(){ [].slice.call(list.children).forEach(function(li,i){ li.className=(i===sel?'on':''); }); }
  function filter(q){ q=(q||'').toLowerCase().trim(); filt=cmds.filter(function(c){ return !q || (c.t+' '+(c.s||'')).toLowerCase().indexOf(q)>=0; }); sel=0; render(); }
  function open(){ pal.classList.add('open'); input.value=''; filter(''); setTimeout(function(){input.focus();},30); }
  function close(){ pal.classList.remove('open'); }
  function run(c){ close(); if(c.h){ location.href=c.h; } else if(c.a){ c.a(); } }
  input.addEventListener('input',function(){ filter(input.value); });
  input.addEventListener('keydown',function(e){ if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(filt.length-1,sel+1);paint();} else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);paint();} else if(e.key==='Enter'){e.preventDefault();if(filt[sel])run(filt[sel]);} else if(e.key==='Escape'){close();} });
  pal.querySelector('.djPal-bd').addEventListener('click',close);
  addEventListener('keydown',function(e){ var t=e.target||{}; var typing=/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName||'')||t.isContentEditable;
    if((e.metaKey||e.ctrlKey)&&(e.key==='k'||e.key==='K')){ e.preventDefault(); pal.classList.contains('open')?close():open(); }
    else if(e.key==='/'&&!typing&&!pal.classList.contains('open')){ e.preventDefault(); open(); } });
  render();

  /* Scrollspy dot rail */
  (function(){ if(innerWidth<900)return; var secs=[].slice.call(d.querySelectorAll('main > section, main > header, main .csec')).filter(function(s){return s.offsetHeight>220;}); if(secs.length<3)return;
    var rail=d.createElement('div'); rail.id='djRail'; secs.forEach(function(s,i){ var a=d.createElement('a'); a.href='#'; a.setAttribute('aria-label','Jump to section '+(i+1)); a.addEventListener('click',function(e){e.preventDefault(); s.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});}); rail.appendChild(a); }); B.appendChild(rail);
    function spy(){ var y=scrollY+innerHeight*0.35, cur=0; secs.forEach(function(s,i){ var o=s.getBoundingClientRect().top+scrollY; if(o<=y)cur=i; }); [].slice.call(rail.children).forEach(function(dt,i){ dt.className=(i===cur?'on':''); }); }
    addEventListener('scroll',spy,{passive:true}); addEventListener('resize',spy); spy();
  })();

  /* Live York clock + availability pill */
  (function(){ var pill=d.createElement('div'); pill.id='djClock'; B.appendChild(pill);
    function upd(){ var et=new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'})); var h=et.getHours(); var open=(h>=8&&h<21); var tt=et.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}); pill.innerHTML='<span class="dot '+(open?'on':'off')+'"></span> York, PA · '+tt+' · '+(open?'Available':'Async'); }
    upd(); setInterval(upd,30000);
  })();
})();

/* ============ DJ Welker — features batch 3 (generative sigil · idle tip) ============ */
(function(){ 'use strict';
  var d=document,B=d.body, reduce=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Generative "mark of this visit" — flow-field sigil, unique each load */
  (function(){ var f=d.querySelector('footer .wrap')||d.querySelector('footer'); if(!f)return;
    var wrap=d.createElement('div'); wrap.id='djSigil';
    wrap.innerHTML='<canvas aria-hidden="true"></canvas><div class="cap"><b>Generative mark</b><br>Unique to this visit — reload to regenerate a new one.</div>';
    f.insertBefore(wrap, f.firstChild);
    var cv=wrap.querySelector('canvas'), x=cv.getContext('2d'), S=260; cv.width=S; cv.height=S;
    var seed=Math.random()*1000;
    function fld(px,py){ return (Math.sin(px*0.03+seed)+Math.cos(py*0.028-seed*0.7)+Math.sin((px+py)*0.02+seed*1.3))*0.9; }
    for(var i=0;i<440;i++){ var px=Math.random()*S, py=Math.random()*S, len=6+Math.random()*24; x.beginPath(); x.moveTo(px,py);
      for(var s=0;s<len;s++){ var a=fld(px,py)*Math.PI; px+=Math.cos(a)*1.7; py+=Math.sin(a)*1.7; x.lineTo(px,py); }
      x.lineWidth=0.7; x.strokeStyle='rgba(30,70,53,'+(0.05+Math.random()*0.14).toFixed(3)+')'; x.stroke(); }
    for(var j=0;j<24;j++){ var nx=18+Math.random()*(S-36), ny=18+Math.random()*(S-36), r=1+Math.random()*3.4; x.beginPath(); x.arc(nx,ny,r,0,7); x.fillStyle=(Math.random()<0.28?'rgba(201,217,74,0.9)':'rgba(30,70,53,0.85)'); x.fill(); }
  })();

  /* Idle tip */
  if(!reduce){ (function(){ var shown=false,t;
    function reset(){ clearTimeout(t); if(shown)return; t=setTimeout(function(){ if(shown)return; shown=true; var el=d.createElement('div'); el.className='dj-toast'; el.innerHTML='Tip: press <b>/</b> to jump anywhere'; B.appendChild(el); setTimeout(function(){el.classList.add('show');},20); setTimeout(function(){el.classList.remove('show');setTimeout(function(){el.remove();},400);},4200); }, 15000); }
    ['pointermove','scroll','keydown','click','touchstart'].forEach(function(ev){ addEventListener(ev,reset,{passive:true}); }); reset();
  })(); }
})();
