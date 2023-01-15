var I=Object.defineProperty;var k=(e,t,i)=>t in e?I(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var s=(e,t,i)=>(k(e,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&n(m)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const a=300,h=400,D=60,S=20,u=30;function f(e){const t=document.querySelector(e);if(!t)throw new Error(e+" not found");return t}function p(){return D+Math.random()*50}function A(e){const t=Math.floor(e/6e4),i=Number((e%6e4/1e3).toFixed(0)),n=String(Math.floor(e%1e3)).padStart(3,"0");return t+":"+(i<10?"0":"")+i+":"+n}function b(e){e.fillStyle="white",e.beginPath(),e.moveTo(0,0);for(let t=1;t<=a*2/u;t++)t%2===0?e.lineTo(t*u/2,0):e.lineTo(t*u/2,S);e.closePath(),e.fill()}class w{constructor(t,i){s(this,"width");s(this,"height",10);s(this,"ctx");s(this,"y",h);s(this,"x",0);const n=Math.round(100+Math.random()*50);this.width=n,this.ctx=t,this.x=Math.round(Math.random()*(a-n)),i&&(this.y+=i)}draw(t){this.ctx.strokeStyle="white",this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.fillRect(this.x,this.y,this.width,this.height),this.ctx.stroke(),this.y-=t,this.y+this.height<0&&(this.y=h,this.init())}init(){const t=Math.round(100+Math.random()*50);this.width=t,this.x=Math.round(Math.random()*(a-t)),this.y+=p()}}class R{constructor(t,i){s(this,"floors",[]);s(this,"speed",1);s(this,"state","ready");s(this,"ctx");s(this,"startTime");s(this,"timeDisplay");s(this,"level",0);for(let n=0;n<5;n++)this.floors.push(new w(t,n*p()));this.ctx=t,this.startTime=new Date,this.timeDisplay=i}draw(){switch(this.state){case"playing":this.floors.forEach(n=>n.draw(this.speed));const i=new Date().getTime()-this.startTime.getTime();this.timeDisplay.innerHTML=A(i),Math.floor(i/1e4)>this.level&&(this.speed+=.2,console.log("level:",this.level),console.log("speed:",this.speed)),this.level=Math.floor(i/1e4);break;case"ready":this.ctx.font="18px serif",this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.fillText("Press 'A' or 'D' to start the game",a/2,h/2*.8);break;case"stopped":this.ctx.font="18px serif",this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.fillText("Nice Try :)",a/2,h/2*.8),this.ctx.fillText(`You lasted ${this.timeDisplay.innerText}`,a/2,h/2);break;default:console.log(this.state+" not handled")}}getState(){return this.state}start(){this.state="playing",this.startTime=new Date,console.log("GAME STARTED")}stop(){this.state!=="stopped"&&(this.state="stopped",console.log("GAME STOPPED"))}reset(){console.log("GAME RESET"),this.init()}init(){this.floors=[];for(let t=0;t<5;t++)this.floors.push(new w(this.ctx,t*p()));this.state="ready"}}const _=new Image;_.src="./images/player_sprite.png";const d=16,G=24,x=14;class H{constructor(t,i){s(this,"x",a/2-x/2);s(this,"y",h/2-d/2);s(this,"ctx");s(this,"game");s(this,"state");s(this,"frame",0);s(this,"image",new Image);s(this,"tick",0);s(this,"gravity",.05);s(this,"ySpeed",0);s(this,"frameMax",2);s(this,"spriteHeight",16);s(this,"spriteWidth",14);this.ctx=t,this.game=i,this.state="stand",this.image.src="./images/mario.png"}renderSprite(){this.ctx.drawImage(this.image,0,this.frame*(d+G),this.image.width,d,this.x,this.y,this.image.width,d),this.tick++,this.tick%5===0&&(this.frame++,this.frame===this.frameMax&&(this.frame=0))}draw(){this.renderSprite(),this.y>h&&this.game.stop(),this.y<=S&&this.game.stop(),this.game.getState()==="playing"&&this.handleMovement()}checkForCollision(){const t=this.game.floors;for(let i=0;i<this.game.floors.length;i++)if(this.y+this.spriteHeight>=t[i].y&&this.x<=t[i].x+t[i].width&&this.x+this.spriteWidth>t[i].x&&this.y<t[i].y)return this.y=t[i].y-this.spriteHeight,this.ySpeed=0,!0;return!1}goLeft(){this.state="left"}goRight(){this.state="right"}stop(){this.state="stand"}handleGravity(){this.checkForCollision()||(this.ySpeed+=this.gravity,this.y+=this.ySpeed)}handleMovement(){this.handleGravity(),this.state==="left"?this.x--:this.state==="right"&&this.x++}reset(){this.x=a/2-x/2,this.y=h/2-d/2,this.ySpeed=0}}const y=f("canvas"),g=y.getContext("2d");y.width=a;y.height=h;window.devicePixelRatio=2;const P=f("#time-value"),E=f("#go-left-button"),T=f("#go-right-button"),N=f("#reset-button"),l=new R(g,P),c=new H(g,l);function v(){F(g),b(g),c.draw(),l.draw(),requestAnimationFrame(v)}function F(e){e.clearRect(0,0,a,h)}v();document.addEventListener("keydown",e=>{switch(e.key){case"a":L();break;case"d":M();break}});function L(){c.goLeft(),l.getState()==="ready"&&l.start()}function M(){c.goRight(),l.getState()==="ready"&&l.start()}document.addEventListener("keypress",e=>{e.code==="Space"&&(e.preventDefault(),l.reset(),c.reset())});document.addEventListener("keyup",()=>{c.stop()});E.addEventListener("pointerdown",()=>{L()});T.addEventListener("pointerdown",()=>{M()});E.addEventListener("pointerup",()=>{c.stop()});T.addEventListener("pointerup",()=>{c.stop()});N.addEventListener("click",()=>{l.reset(),c.reset()});window.addEventListener("blur",()=>{l.getState()==="playing"&&l.stop()});window.onscroll=null;
