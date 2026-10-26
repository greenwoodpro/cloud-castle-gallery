(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const ta="180",Ri={ROTATE:0,DOLLY:1,PAN:2},Ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ah=0,Ba=1,lh=2,rc=1,oc=2,xn=3,In=0,Oe=1,De=2,Ln=0,Ci=1,za=2,Ha=3,ka=4,ch=5,qn=100,hh=101,uh=102,fh=103,dh=104,ph=200,mh=201,gh=202,_h=203,ro=204,oo=205,vh=206,xh=207,Mh=208,yh=209,Sh=210,Eh=211,bh=212,Th=213,wh=214,ao=0,lo=1,co=2,Li=3,ho=4,uo=5,fo=6,po=7,ac=0,Ah=1,Rh=2,Dn=0,Ch=1,Ph=2,Lh=3,lc=4,Dh=5,Ih=6,Uh=7,cc=300,Di=301,Ii=302,mo=303,go=304,_r=306,_o=1e3,jn=1001,vo=1002,We=1003,Nh=1004,Rs=1005,an=1006,Er=1007,Zn=1008,hn=1009,hc=1010,uc=1011,cs=1012,ea=1013,Jn=1014,ln=1015,Ss=1016,na=1017,ia=1018,hs=1020,fc=35902,dc=35899,pc=1021,mc=1022,nn=1023,us=1026,fs=1027,sa=1028,ra=1029,gc=1030,oa=1031,aa=1033,nr=33776,ir=33777,sr=33778,rr=33779,xo=35840,Mo=35841,yo=35842,So=35843,Eo=36196,bo=37492,To=37496,wo=37808,Ao=37809,Ro=37810,Co=37811,Po=37812,Lo=37813,Do=37814,Io=37815,Uo=37816,No=37817,Fo=37818,Oo=37819,Bo=37820,zo=37821,Ho=36492,ko=36494,Vo=36495,Go=36283,Wo=36284,Xo=36285,qo=36286,Fh=3200,Oh=3201,_c=0,Bh=1,Pn="",Ve="srgb",Ui="srgb-linear",hr="linear",se="srgb",ai=7680,Va=519,zh=512,Hh=513,kh=514,vc=515,Vh=516,Gh=517,Wh=518,Xh=519,Ga=35044,Wa="300 es",cn=2e3,ur=2001;class ii{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Te=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xa=1234567;const ss=Math.PI/180,ds=180/Math.PI;function si(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Te[i&255]+Te[i>>8&255]+Te[i>>16&255]+Te[i>>24&255]+"-"+Te[t&255]+Te[t>>8&255]+"-"+Te[t>>16&15|64]+Te[t>>24&255]+"-"+Te[e&63|128]+Te[e>>8&255]+"-"+Te[e>>16&255]+Te[e>>24&255]+Te[n&255]+Te[n>>8&255]+Te[n>>16&255]+Te[n>>24&255]).toLowerCase()}function qt(i,t,e){return Math.max(t,Math.min(e,i))}function la(i,t){return(i%t+t)%t}function qh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Yh(i,t,e){return i!==t?(e-i)/(t-i):0}function rs(i,t,e){return(1-e)*i+e*t}function jh(i,t,e,n){return rs(i,t,1-Math.exp(-e*n))}function Zh(i,t=1){return t-Math.abs(la(i,t*2)-t)}function Kh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function $h(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Jh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Qh(i,t){return i+Math.random()*(t-i)}function tu(i){return i*(.5-Math.random())}function eu(i){i!==void 0&&(Xa=i);let t=Xa+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function nu(i){return i*ss}function iu(i){return i*ds}function su(i){return(i&i-1)===0&&i!==0}function ru(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ou(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function au(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Si(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ei={DEG2RAD:ss,RAD2DEG:ds,generateUUID:si,clamp:qt,euclideanModulo:la,mapLinear:qh,inverseLerp:Yh,lerp:rs,damp:jh,pingpong:Zh,smoothstep:Kh,smootherstep:$h,randInt:Jh,randFloat:Qh,randFloatSpread:tu,seededRandom:eu,degToRad:nu,radToDeg:iu,isPowerOfTwo:su,ceilPowerOfTwo:ru,floorPowerOfTwo:ou,setQuaternionFromProperEuler:au,normalize:Re,denormalize:Si};class gt{constructor(t=0,e=0){gt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],M=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=M;return}if(u!==M||l!==f||c!==d||h!==g){let m=1-a;const p=l*f+c*d+h*g+u*M,T=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const C=Math.sqrt(S),R=Math.atan2(C,p*T);m=Math.sin(m*R)/C,a=Math.sin(a*R)/C}const x=a*T;if(l=l*m+f*x,c=c*m+d*x,h=h*m+g*x,u=u*m+M*x,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-a*d,t[e+2]=c*g+h*d+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return br.copy(this).projectOnVector(t),this.sub(br)}reflect(t){return this.sub(br.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const br=new F,qa=new Qn;class Gt{constructor(t,e,n,s,r,o,a,l,c){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],M=s[0],m=s[3],p=s[6],T=s[1],S=s[4],x=s[7],C=s[2],R=s[5],P=s[8];return r[0]=o*M+a*T+l*C,r[3]=o*m+a*S+l*R,r[6]=o*p+a*x+l*P,r[1]=c*M+h*T+u*C,r[4]=c*m+h*S+u*R,r[7]=c*p+h*x+u*P,r[2]=f*M+d*T+g*C,r[5]=f*m+d*S+g*R,r[8]=f*p+d*x+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return t[0]=u*M,t[1]=(s*c-h*n)*M,t[2]=(a*n-s*o)*M,t[3]=f*M,t[4]=(h*e-s*l)*M,t[5]=(s*r-a*e)*M,t[6]=d*M,t[7]=(n*l-c*e)*M,t[8]=(o*e-n*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Tr.makeScale(t,e)),this}rotate(t){return this.premultiply(Tr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Tr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Tr=new Gt;function xc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lu(){const i=fr("canvas");return i.style.display="block",i}const Ya={};function ps(i){i in Ya||(Ya[i]=!0,console.warn(i))}function cu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const ja=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Za=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hu(){const i={enabled:!0,workingColorSpace:Ui,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===se&&(s.r=yn(s.r),s.g=yn(s.g),s.b=yn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===se&&(s.r=Pi(s.r),s.g=Pi(s.g),s.b=Pi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Pn?hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ps("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ps("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ui]:{primaries:t,whitePoint:n,transfer:hr,toXYZ:ja,fromXYZ:Za,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:t,whitePoint:n,transfer:se,toXYZ:ja,fromXYZ:Za,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}}),i}const Qt=hu();function yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Pi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let li;class uu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{li===void 0&&(li=fr("canvas")),li.width=t.width,li.height=t.height;const s=li.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=li}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=fr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=yn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yn(e[n]/255)*255):e[n]=yn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let fu=0;class ca{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=si(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(wr(s[o].image)):r.push(wr(s[o]))}else r=wr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function wr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?uu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let du=0;const Ar=new F;class Ie extends ii{constructor(t=Ie.DEFAULT_IMAGE,e=Ie.DEFAULT_MAPPING,n=jn,s=jn,r=an,o=Zn,a=nn,l=hn,c=Ie.DEFAULT_ANISOTROPY,h=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=si(),this.name="",this.source=new ca(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ar).x}get height(){return this.source.getSize(Ar).y}get depth(){return this.source.getSize(Ar).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==cc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _o:t.x=t.x-Math.floor(t.x);break;case jn:t.x=t.x<0?0:1;break;case vo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _o:t.y=t.y-Math.floor(t.y);break;case jn:t.y=t.y<0?0:1;break;case vo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ie.DEFAULT_IMAGE=null;Ie.DEFAULT_MAPPING=cc;Ie.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,n=0,s=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],M=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,x=(d+1)/2,C=(p+1)/2,R=(h+f)/4,P=(u+M)/4,N=(g+m)/4;return S>x&&S>C?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=R/n,r=P/n):x>C?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=R/s,r=N/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=P/r,s=N/r),this.set(n,s,r,e),this}let T=Math.sqrt((m-g)*(m-g)+(u-M)*(u-M)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-M)/T,this.z=(f-h)/T,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pu extends ii{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Ie(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ca(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ti extends pu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Mc extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class mu extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ri{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint($e.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint($e.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=$e.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,$e):$e.fromBufferAttribute(r,o),$e.applyMatrix4(t.matrixWorld),this.expandByPoint($e);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cs.copy(n.boundingBox)),Cs.applyMatrix4(t.matrixWorld),this.union(Cs)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,$e),$e.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Yi),Ps.subVectors(this.max,Yi),ci.subVectors(t.a,Yi),hi.subVectors(t.b,Yi),ui.subVectors(t.c,Yi),En.subVectors(hi,ci),bn.subVectors(ui,hi),zn.subVectors(ci,ui);let e=[0,-En.z,En.y,0,-bn.z,bn.y,0,-zn.z,zn.y,En.z,0,-En.x,bn.z,0,-bn.x,zn.z,0,-zn.x,-En.y,En.x,0,-bn.y,bn.x,0,-zn.y,zn.x,0];return!Rr(e,ci,hi,ui,Ps)||(e=[1,0,0,0,1,0,0,0,1],!Rr(e,ci,hi,ui,Ps))?!1:(Ls.crossVectors(En,bn),e=[Ls.x,Ls.y,Ls.z],Rr(e,ci,hi,ui,Ps))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,$e).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize($e).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const pn=[new F,new F,new F,new F,new F,new F,new F,new F],$e=new F,Cs=new ri,ci=new F,hi=new F,ui=new F,En=new F,bn=new F,zn=new F,Yi=new F,Ps=new F,Ls=new F,Hn=new F;function Rr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Hn.fromArray(i,r);const a=s.x*Math.abs(Hn.x)+s.y*Math.abs(Hn.y)+s.z*Math.abs(Hn.z),l=t.dot(Hn),c=e.dot(Hn),h=n.dot(Hn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const gu=new ri,ji=new F,Cr=new F;class Hi{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):gu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ji.subVectors(t,this.center);const e=ji.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ji,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Cr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ji.copy(t.center).add(Cr)),this.expandByPoint(ji.copy(t.center).sub(Cr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const mn=new F,Pr=new F,Ds=new F,Tn=new F,Lr=new F,Is=new F,Dr=new F;class vr{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=mn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mn.copy(this.origin).addScaledVector(this.direction,e),mn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Pr.copy(t).add(e).multiplyScalar(.5),Ds.copy(e).sub(t).normalize(),Tn.copy(this.origin).sub(Pr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Ds),a=Tn.dot(this.direction),l=-Tn.dot(Ds),c=Tn.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const M=1/h;u*=M,f*=M,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Pr).addScaledVector(Ds,f),d}intersectSphere(t,e){mn.subVectors(t.center,this.origin);const n=mn.dot(this.direction),s=mn.dot(mn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,mn)!==null}intersectTriangle(t,e,n,s,r){Lr.subVectors(e,t),Is.subVectors(n,t),Dr.crossVectors(Lr,Is);let o=this.direction.dot(Dr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Tn.subVectors(this.origin,t);const l=a*this.direction.dot(Is.crossVectors(Tn,Is));if(l<0)return null;const c=a*this.direction.dot(Lr.cross(Tn));if(c<0||l+c>o)return null;const h=-a*Tn.dot(Dr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,s,r,o,a,l,c,h,u,f,d,g,M,m){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,f,d,g,M,m)}set(t,e,n,s,r,o,a,l,c,h,u,f,d,g,M,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/fi.setFromMatrixColumn(t,0).length(),r=1/fi.setFromMatrixColumn(t,1).length(),o=1/fi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,M=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-M*c,e[9]=-a*l,e[2]=M-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,M=c*u;e[0]=f+M*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=M+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,M=c*u;e[0]=f-M*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=M-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,M=a*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+M,e[1]=l*u,e[5]=M*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,M=a*c;e[0]=l*h,e[4]=M-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-M*u}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,M=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+M,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=M*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_u,t,vu)}lookAt(t,e,n){const s=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),wn.crossVectors(n,He),wn.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),wn.crossVectors(n,He)),wn.normalize(),Us.crossVectors(He,wn),s[0]=wn.x,s[4]=Us.x,s[8]=He.x,s[1]=wn.y,s[5]=Us.y,s[9]=He.y,s[2]=wn.z,s[6]=Us.z,s[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],M=n[6],m=n[10],p=n[14],T=n[3],S=n[7],x=n[11],C=n[15],R=s[0],P=s[4],N=s[8],y=s[12],_=s[1],w=s[5],O=s[9],X=s[13],G=s[2],Y=s[6],b=s[10],U=s[14],I=s[3],j=s[7],K=s[11],et=s[15];return r[0]=o*R+a*_+l*G+c*I,r[4]=o*P+a*w+l*Y+c*j,r[8]=o*N+a*O+l*b+c*K,r[12]=o*y+a*X+l*U+c*et,r[1]=h*R+u*_+f*G+d*I,r[5]=h*P+u*w+f*Y+d*j,r[9]=h*N+u*O+f*b+d*K,r[13]=h*y+u*X+f*U+d*et,r[2]=g*R+M*_+m*G+p*I,r[6]=g*P+M*w+m*Y+p*j,r[10]=g*N+M*O+m*b+p*K,r[14]=g*y+M*X+m*U+p*et,r[3]=T*R+S*_+x*G+C*I,r[7]=T*P+S*w+x*Y+C*j,r[11]=T*N+S*O+x*b+C*K,r[15]=T*y+S*X+x*U+C*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],M=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*d-n*l*d)+M*(+e*l*d-e*c*f+r*o*f-s*o*d+s*c*h-r*l*h)+m*(+e*c*u-e*a*d-r*o*u+n*o*d+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*f+s*o*u-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],M=t[13],m=t[14],p=t[15],T=u*m*c-M*f*c+M*l*d-a*m*d-u*l*p+a*f*p,S=g*f*c-h*m*c-g*l*d+o*m*d+h*l*p-o*f*p,x=h*M*c-g*u*c+g*a*d-o*M*d-h*a*p+o*u*p,C=g*u*l-h*M*l-g*a*f+o*M*f+h*a*m-o*u*m,R=e*T+n*S+s*x+r*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return t[0]=T*P,t[1]=(M*f*r-u*m*r-M*s*d+n*m*d+u*s*p-n*f*p)*P,t[2]=(a*m*r-M*l*r+M*s*c-n*m*c-a*s*p+n*l*p)*P,t[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*d-n*l*d)*P,t[4]=S*P,t[5]=(h*m*r-g*f*r+g*s*d-e*m*d-h*s*p+e*f*p)*P,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*P,t[7]=(o*f*r-h*l*r+h*s*c-e*f*c-o*s*d+e*l*d)*P,t[8]=x*P,t[9]=(g*u*r-h*M*r-g*n*d+e*M*d+h*n*p-e*u*p)*P,t[10]=(o*M*r-g*a*r+g*n*c-e*M*c-o*n*p+e*a*p)*P,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*d-e*a*d)*P,t[12]=C*P,t[13]=(h*M*s-g*u*s+g*n*f-e*M*f-h*n*m+e*u*m)*P,t[14]=(g*a*s-o*M*s-g*n*l+e*M*l+o*n*m-e*a*m)*P,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*f+e*a*f)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,g=r*u,M=o*h,m=o*u,p=a*u,T=l*c,S=l*h,x=l*u,C=n.x,R=n.y,P=n.z;return s[0]=(1-(M+p))*C,s[1]=(d+x)*C,s[2]=(g-S)*C,s[3]=0,s[4]=(d-x)*R,s[5]=(1-(f+p))*R,s[6]=(m+T)*R,s[7]=0,s[8]=(g+S)*P,s[9]=(m-T)*P,s[10]=(1-(f+M))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=fi.set(s[0],s[1],s[2]).length();const o=fi.set(s[4],s[5],s[6]).length(),a=fi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Je.copy(this);const c=1/r,h=1/o,u=1/a;return Je.elements[0]*=c,Je.elements[1]*=c,Je.elements[2]*=c,Je.elements[4]*=h,Je.elements[5]*=h,Je.elements[6]*=h,Je.elements[8]*=u,Je.elements[9]*=u,Je.elements[10]*=u,e.setFromRotationMatrix(Je),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=cn,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,M;if(l)g=r/(o-r),M=o*r/(o-r);else if(a===cn)g=-(o+r)/(o-r),M=-2*o*r/(o-r);else if(a===ur)g=-o/(o-r),M=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=cn,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,M;if(l)g=1/(o-r),M=o/(o-r);else if(a===cn)g=-2/(o-r),M=-(o+r)/(o-r);else if(a===ur)g=-1/(o-r),M=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const fi=new F,Je=new oe,_u=new F(0,0,0),vu=new F(1,1,1),wn=new F,Us=new F,He=new F,Ka=new oe,$a=new Qn;class un{constructor(t=0,e=0,n=0,s=un.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ka.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ka,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $a.setFromEuler(this),this.setFromQuaternion($a,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}un.DEFAULT_ORDER="XYZ";class ha{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xu=0;const Ja=new F,di=new Qn,gn=new oe,Ns=new F,Zi=new F,Mu=new F,yu=new Qn,Qa=new F(1,0,0),tl=new F(0,1,0),el=new F(0,0,1),nl={type:"added"},Su={type:"removed"},pi={type:"childadded",child:null},Ir={type:"childremoved",child:null};class Me extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Me.DEFAULT_UP.clone();const t=new F,e=new un,n=new Qn,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new oe},normalMatrix:{value:new Gt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=Me.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ha,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return di.setFromAxisAngle(t,e),this.quaternion.multiply(di),this}rotateOnWorldAxis(t,e){return di.setFromAxisAngle(t,e),this.quaternion.premultiply(di),this}rotateX(t){return this.rotateOnAxis(Qa,t)}rotateY(t){return this.rotateOnAxis(tl,t)}rotateZ(t){return this.rotateOnAxis(el,t)}translateOnAxis(t,e){return Ja.copy(t).applyQuaternion(this.quaternion),this.position.add(Ja.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Qa,t)}translateY(t){return this.translateOnAxis(tl,t)}translateZ(t){return this.translateOnAxis(el,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ns.copy(t):Ns.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(Zi,Ns,this.up):gn.lookAt(Ns,Zi,this.up),this.quaternion.setFromRotationMatrix(gn),s&&(gn.extractRotation(s.matrixWorld),di.setFromRotationMatrix(gn),this.quaternion.premultiply(di.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nl),pi.child=t,this.dispatchEvent(pi),pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Su),Ir.child=t,this.dispatchEvent(Ir),Ir.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nl),pi.child=t,this.dispatchEvent(pi),pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,t,Mu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,yu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Me.DEFAULT_UP=new F(0,1,0);Me.DEFAULT_MATRIX_AUTO_UPDATE=!0;Me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qe=new F,_n=new F,Ur=new F,vn=new F,mi=new F,gi=new F,il=new F,Nr=new F,Fr=new F,Or=new F,Br=new ge,zr=new ge,Hr=new ge;class en{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Qe.subVectors(t,e),s.cross(Qe);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Qe.subVectors(s,e),_n.subVectors(n,e),Ur.subVectors(t,e);const o=Qe.dot(Qe),a=Qe.dot(_n),l=Qe.dot(Ur),c=_n.dot(_n),h=_n.dot(Ur),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vn.x),l.addScaledVector(o,vn.y),l.addScaledVector(a,vn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Br.setScalar(0),zr.setScalar(0),Hr.setScalar(0),Br.fromBufferAttribute(t,e),zr.fromBufferAttribute(t,n),Hr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Br,r.x),o.addScaledVector(zr,r.y),o.addScaledVector(Hr,r.z),o}static isFrontFacing(t,e,n,s){return Qe.subVectors(n,e),_n.subVectors(t,e),Qe.cross(_n).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qe.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),Qe.cross(_n).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return en.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;mi.subVectors(s,n),gi.subVectors(r,n),Nr.subVectors(t,n);const l=mi.dot(Nr),c=gi.dot(Nr);if(l<=0&&c<=0)return e.copy(n);Fr.subVectors(t,s);const h=mi.dot(Fr),u=gi.dot(Fr);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(mi,o);Or.subVectors(t,r);const d=mi.dot(Or),g=gi.dot(Or);if(g>=0&&d<=g)return e.copy(r);const M=d*c-l*g;if(M<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(gi,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return il.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(il,a);const p=1/(m+M+f);return o=M*p,a=f*p,e.copy(n).addScaledVector(mi,o).addScaledVector(gi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const yc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},Fs={h:0,s:0,l:0};function kr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Qt.workingColorSpace){if(t=la(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=kr(o,r,t+1/3),this.g=kr(o,r,t),this.b=kr(o,r,t-1/3)}return Qt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ve){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){const n=yc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yn(t.r),this.g=yn(t.g),this.b=yn(t.b),this}copyLinearToSRGB(t){return this.r=Pi(t.r),this.g=Pi(t.g),this.b=Pi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return Qt.workingToColorSpace(we.copy(this),t),Math.round(qt(we.r*255,0,255))*65536+Math.round(qt(we.g*255,0,255))*256+Math.round(qt(we.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.workingToColorSpace(we.copy(this),e);const n=we.r,s=we.g,r=we.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.workingToColorSpace(we.copy(this),e),t.r=we.r,t.g=we.g,t.b=we.b,t}getStyle(t=Ve){Qt.workingToColorSpace(we.copy(this),t);const e=we.r,n=we.g,s=we.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(An),this.setHSL(An.h+t,An.s+e,An.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(An),t.getHSL(Fs);const n=rs(An.h,Fs.h,e),s=rs(An.s,Fs.s,e),r=rs(An.l,Fs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const we=new Wt;Wt.NAMES=yc;let Eu=0;class ki extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=si(),this.name="",this.type="Material",this.blending=Ci,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ro,this.blendDst=oo,this.blendEquation=qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Li,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Va,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ai,this.stencilZFail=ai,this.stencilZPass=ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ci&&(n.blending=this.blending),this.side!==In&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ro&&(n.blendSrc=this.blendSrc),this.blendDst!==oo&&(n.blendDst=this.blendDst),this.blendEquation!==qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Li&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Va&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ua extends ki{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new F,Os=new gt;let bu=0;class Ze{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ga,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Os.fromBufferAttribute(this,e),Os.applyMatrix3(t),this.setXY(e,Os.x,Os.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Si(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Si(e,this.array)),e}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Si(e,this.array)),e}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Si(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Si(e,this.array)),e}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),s=Re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),s=Re(s,this.array),r=Re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ga&&(t.usage=this.usage),t}}class Sc extends Ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ec extends Ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Yt extends Ze{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Tu=0;const Ye=new oe,Vr=new Me,_i=new F,ke=new ri,Ki=new ri,Ee=new F;class pe extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xc(t)?Ec:Sc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return Vr.lookAt(t),Vr.updateMatrix(),this.applyMatrix4(Vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Yt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ki.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors(ke.min,Ki.min),ke.expandByPoint(Ee),Ee.addVectors(ke.max,Ki.max),ke.expandByPoint(Ee)):(ke.expandByPoint(Ki.min),ke.expandByPoint(Ki.max))}ke.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ee));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ee.fromBufferAttribute(a,c),l&&(_i.fromBufferAttribute(t,c),Ee.add(_i)),s=Math.max(s,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ze(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<n.count;N++)a[N]=new F,l[N]=new F;const c=new F,h=new F,u=new F,f=new gt,d=new gt,g=new gt,M=new F,m=new F;function p(N,y,_){c.fromBufferAttribute(n,N),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,_),f.fromBufferAttribute(r,N),d.fromBufferAttribute(r,y),g.fromBufferAttribute(r,_),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const w=1/(d.x*g.y-g.x*d.y);isFinite(w)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(w),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(w),a[N].add(M),a[y].add(M),a[_].add(M),l[N].add(m),l[y].add(m),l[_].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let N=0,y=T.length;N<y;++N){const _=T[N],w=_.start,O=_.count;for(let X=w,G=w+O;X<G;X+=3)p(t.getX(X+0),t.getX(X+1),t.getX(X+2))}const S=new F,x=new F,C=new F,R=new F;function P(N){C.fromBufferAttribute(s,N),R.copy(C);const y=a[N];S.copy(y),S.sub(C.multiplyScalar(C.dot(y))).normalize(),x.crossVectors(R,y);const w=x.dot(l[N])<0?-1:1;o.setXYZW(N,S.x,S.y,S.z,w)}for(let N=0,y=T.length;N<y;++N){const _=T[N],w=_.start,O=_.count;for(let X=w,G=w+O;X<G;X+=3)P(t.getX(X+0)),P(t.getX(X+1)),P(t.getX(X+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new F,r=new F,o=new F,a=new F,l=new F,c=new F,h=new F,u=new F;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),M=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,M),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let M=0,m=l.length;M<m;M++){a.isInterleavedBufferAttribute?d=l[M]*a.data.stride+a.offset:d=l[M]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new Ze(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new pe,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const sl=new oe,kn=new vr,Bs=new Hi,rl=new F,zs=new F,Hs=new F,ks=new F,Gr=new F,Vs=new F,ol=new F,Gs=new F;class ce extends Me{constructor(t=new pe,e=new ua){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Vs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Gr.fromBufferAttribute(u,t),o?Vs.addScaledVector(Gr,h):Vs.addScaledVector(Gr.sub(e),h))}e.add(Vs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Bs.copy(n.boundingSphere),Bs.applyMatrix4(r),kn.copy(t.ray).recast(t.near),!(Bs.containsPoint(kn.origin)===!1&&(kn.intersectSphere(Bs,rl)===null||kn.origin.distanceToSquared(rl)>(t.far-t.near)**2))&&(sl.copy(r).invert(),kn.copy(t.ray).applyMatrix4(sl),!(n.boundingBox!==null&&kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,kn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,M=f.length;g<M;g++){const m=f[g],p=o[m.materialIndex],T=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=T,C=S;x<C;x+=3){const R=a.getX(x),P=a.getX(x+1),N=a.getX(x+2);s=Ws(this,p,t,n,c,h,u,R,P,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),M=Math.min(a.count,d.start+d.count);for(let m=g,p=M;m<p;m+=3){const T=a.getX(m),S=a.getX(m+1),x=a.getX(m+2);s=Ws(this,o,t,n,c,h,u,T,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,M=f.length;g<M;g++){const m=f[g],p=o[m.materialIndex],T=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=T,C=S;x<C;x+=3){const R=x,P=x+1,N=x+2;s=Ws(this,p,t,n,c,h,u,R,P,N),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),M=Math.min(l.count,d.start+d.count);for(let m=g,p=M;m<p;m+=3){const T=m,S=m+1,x=m+2;s=Ws(this,o,t,n,c,h,u,T,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function wu(i,t,e,n,s,r,o,a){let l;if(t.side===Oe?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===In,a),l===null)return null;Gs.copy(a),Gs.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Gs);return c<e.near||c>e.far?null:{distance:c,point:Gs.clone(),object:i}}function Ws(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,zs),i.getVertexPosition(l,Hs),i.getVertexPosition(c,ks);const h=wu(i,t,e,n,zs,Hs,ks,ol);if(h){const u=new F;en.getBarycoord(ol,zs,Hs,ks,u),s&&(h.uv=en.getInterpolatedAttribute(s,a,l,c,u,new gt)),r&&(h.uv1=en.getInterpolatedAttribute(r,a,l,c,u,new gt)),o&&(h.normal=en.getInterpolatedAttribute(o,a,l,c,u,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new F,materialIndex:0};en.getNormal(zs,Hs,ks,f.normal),h.face=f,h.barycoord=u}return h}class Nn extends pe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(u,2));function g(M,m,p,T,S,x,C,R,P,N,y){const _=x/P,w=C/N,O=x/2,X=C/2,G=R/2,Y=P+1,b=N+1;let U=0,I=0;const j=new F;for(let K=0;K<b;K++){const et=K*w-X;for(let vt=0;vt<Y;vt++){const yt=vt*_-O;j[M]=yt*T,j[m]=et*S,j[p]=G,c.push(j.x,j.y,j.z),j[M]=0,j[m]=0,j[p]=R>0?1:-1,h.push(j.x,j.y,j.z),u.push(vt/P),u.push(1-K/N),U+=1}}for(let K=0;K<N;K++)for(let et=0;et<P;et++){const vt=f+et+Y*K,yt=f+et+Y*(K+1),Nt=f+(et+1)+Y*(K+1),jt=f+(et+1)+Y*K;l.push(vt,yt,jt),l.push(yt,Nt,jt),I+=6}a.addGroup(d,I,y),d+=I,f+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ni(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ce(i){const t={};for(let e=0;e<i.length;e++){const n=Ni(i[e]);for(const s in n)t[s]=n[s]}return t}function Au(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function bc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Ru={clone:Ni,merge:Ce};var Cu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends ki{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cu,this.fragmentShader=Pu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ni(t.uniforms),this.uniformsGroups=Au(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Tc extends Me{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Rn=new F,al=new gt,ll=new gt;class je extends Tc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ds*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ds*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z)}getViewSize(t,e){return this.getViewBounds(t,al,ll),e.subVectors(ll,al)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ss*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const vi=-90,xi=1;class Lu extends Me{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new je(vi,xi,t,e);s.layers=this.layers,this.add(s);const r=new je(vi,xi,t,e);r.layers=this.layers,this.add(r);const o=new je(vi,xi,t,e);o.layers=this.layers,this.add(o);const a=new je(vi,xi,t,e);a.layers=this.layers,this.add(a);const l=new je(vi,xi,t,e);l.layers=this.layers,this.add(l);const c=new je(vi,xi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ur)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=M,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class wc extends Ie{constructor(t=[],e=Di,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Du extends ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new wc(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Nn(5,5,5),r=new Un({name:"CubemapFromEquirect",uniforms:Ni(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:Ln});r.uniforms.tEquirect.value=e;const o=new ce(s,r),a=e.minFilter;return e.minFilter===Zn&&(e.minFilter=an),new Lu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class $t extends Me{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Iu={type:"move"};class Wr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const M of t.hand.values()){const m=e.getJointPose(M,n),p=this._getHandJoint(c,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Iu)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new $t;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class fa{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Wt(t),this.near=e,this.far=n}clone(){return new fa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Uu extends Me{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Nu extends Ie{constructor(t=null,e=1,n=1,s,r,o,a,l,c=We,h=We,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cl extends Ze{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Mi=new oe,hl=new oe,Xs=[],ul=new ri,Fu=new oe,$i=new ce,Ji=new Hi;class Ou extends ce{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new cl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Fu)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ri),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Mi),ul.copy(t.boundingBox).applyMatrix4(Mi),this.boundingBox.union(ul)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Mi),Ji.copy(t.boundingSphere).applyMatrix4(Mi),this.boundingSphere.union(Ji)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if($i.geometry=this.geometry,$i.material=this.material,$i.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ji.copy(this.boundingSphere),Ji.applyMatrix4(n),t.ray.intersectsSphere(Ji)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Mi),hl.multiplyMatrices(n,Mi),$i.matrixWorld=hl,$i.raycast(t,Xs);for(let o=0,a=Xs.length;o<a;o++){const l=Xs[o];l.instanceId=r,l.object=this,e.push(l)}Xs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new cl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Nu(new Float32Array(s*this.count),s,this.count,sa,ln));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Xr=new F,Bu=new F,zu=new Gt;class Cn{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Xr.subVectors(n,e).cross(Bu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Xr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||zu.getNormalMatrix(t),s=this.coplanarPoint(Xr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new Hi,Hu=new gt(.5,.5),qs=new F;class da{constructor(t=new Cn,e=new Cn,n=new Cn,s=new Cn,r=new Cn,o=new Cn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=cn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],M=r[9],m=r[10],p=r[11],T=r[12],S=r[13],x=r[14],C=r[15];if(s[0].setComponents(c-o,d-h,p-g,C-T).normalize(),s[1].setComponents(c+o,d+h,p+g,C+T).normalize(),s[2].setComponents(c+a,d+u,p+M,C+S).normalize(),s[3].setComponents(c-a,d-u,p-M,C-S).normalize(),n)s[4].setComponents(l,f,m,x).normalize(),s[5].setComponents(c-l,d-f,p-m,C-x).normalize();else if(s[4].setComponents(c-l,d-f,p-m,C-x).normalize(),e===cn)s[5].setComponents(c+l,d+f,p+m,C+x).normalize();else if(e===ur)s[5].setComponents(l,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(t){Vn.center.set(0,0,0);const e=Hu.distanceTo(t.center);return Vn.radius=.7071067811865476+e,Vn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(qs.x=s.normal.x>0?t.max.x:t.min.x,qs.y=s.normal.y>0?t.max.y:t.min.y,qs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(qs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ac extends ki{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const fl=new oe,Yo=new vr,Ys=new Hi,js=new F;class ku extends Me{constructor(t=new pe,e=new Ac){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(s),Ys.radius+=r,t.ray.intersectsSphere(Ys)===!1)return;fl.copy(s).invert(),Yo.copy(t.ray).applyMatrix4(fl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,M=d;g<M;g++){const m=c.getX(g);js.fromBufferAttribute(u,m),dl(js,m,l,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,M=d;g<M;g++)js.fromBufferAttribute(u,g),dl(js,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function dl(i,t,e,n,s,r,o){const a=Yo.distanceSqToPoint(i);if(a<e){const l=new F;Yo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Rc extends Ie{constructor(t,e,n=Jn,s,r,o,a=We,l=We,c,h=us,u=1){if(h!==us&&h!==fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ca(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Cc extends Ie{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class pa extends pe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new F,h=new gt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Yt(o,3)),this.setAttribute("normal",new Yt(a,3)),this.setAttribute("uv",new Yt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pa(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ge extends pe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const M=[],m=n/2;let p=0;T(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Yt(u,3)),this.setAttribute("normal",new Yt(f,3)),this.setAttribute("uv",new Yt(d,2));function T(){const x=new F,C=new F;let R=0;const P=(e-t)/n;for(let N=0;N<=r;N++){const y=[],_=N/r,w=_*(e-t)+t;for(let O=0;O<=s;O++){const X=O/s,G=X*l+a,Y=Math.sin(G),b=Math.cos(G);C.x=w*Y,C.y=-_*n+m,C.z=w*b,u.push(C.x,C.y,C.z),x.set(Y,P,b).normalize(),f.push(x.x,x.y,x.z),d.push(X,1-_),y.push(g++)}M.push(y)}for(let N=0;N<s;N++)for(let y=0;y<r;y++){const _=M[y][N],w=M[y+1][N],O=M[y+1][N+1],X=M[y][N+1];(t>0||y!==0)&&(h.push(_,w,X),R+=3),(e>0||y!==r-1)&&(h.push(w,O,X),R+=3)}c.addGroup(p,R,0),p+=R}function S(x){const C=g,R=new gt,P=new F;let N=0;const y=x===!0?t:e,_=x===!0?1:-1;for(let O=1;O<=s;O++)u.push(0,m*_,0),f.push(0,_,0),d.push(.5,.5),g++;const w=g;for(let O=0;O<=s;O++){const G=O/s*l+a,Y=Math.cos(G),b=Math.sin(G);P.x=y*b,P.y=m*_,P.z=y*Y,u.push(P.x,P.y,P.z),f.push(0,_,0),R.x=Y*.5+.5,R.y=b*.5*_+.5,d.push(R.x,R.y),g++}for(let O=0;O<s;O++){const X=C+O,G=w+O;x===!0?h.push(G,G+1,X):h.push(G+1,G,X),N+=3}c.addGroup(p,N,x===!0?1:2),p+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ge(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Kn extends Ge{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Kn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ma extends pe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Yt(r,3)),this.setAttribute("normal",new Yt(r.slice(),3)),this.setAttribute("uv",new Yt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(T){const S=new F,x=new F,C=new F;for(let R=0;R<e.length;R+=3)d(e[R+0],S),d(e[R+1],x),d(e[R+2],C),l(S,x,C,T)}function l(T,S,x,C){const R=C+1,P=[];for(let N=0;N<=R;N++){P[N]=[];const y=T.clone().lerp(x,N/R),_=S.clone().lerp(x,N/R),w=R-N;for(let O=0;O<=w;O++)O===0&&N===R?P[N][O]=y:P[N][O]=y.clone().lerp(_,O/w)}for(let N=0;N<R;N++)for(let y=0;y<2*(R-N)-1;y++){const _=Math.floor(y/2);y%2===0?(f(P[N][_+1]),f(P[N+1][_]),f(P[N][_])):(f(P[N][_+1]),f(P[N+1][_+1]),f(P[N+1][_]))}}function c(T){const S=new F;for(let x=0;x<r.length;x+=3)S.x=r[x+0],S.y=r[x+1],S.z=r[x+2],S.normalize().multiplyScalar(T),r[x+0]=S.x,r[x+1]=S.y,r[x+2]=S.z}function h(){const T=new F;for(let S=0;S<r.length;S+=3){T.x=r[S+0],T.y=r[S+1],T.z=r[S+2];const x=m(T)/2/Math.PI+.5,C=p(T)/Math.PI+.5;o.push(x,1-C)}g(),u()}function u(){for(let T=0;T<o.length;T+=6){const S=o[T+0],x=o[T+2],C=o[T+4],R=Math.max(S,x,C),P=Math.min(S,x,C);R>.9&&P<.1&&(S<.2&&(o[T+0]+=1),x<.2&&(o[T+2]+=1),C<.2&&(o[T+4]+=1))}}function f(T){r.push(T.x,T.y,T.z)}function d(T,S){const x=T*3;S.x=t[x+0],S.y=t[x+1],S.z=t[x+2]}function g(){const T=new F,S=new F,x=new F,C=new F,R=new gt,P=new gt,N=new gt;for(let y=0,_=0;y<r.length;y+=9,_+=6){T.set(r[y+0],r[y+1],r[y+2]),S.set(r[y+3],r[y+4],r[y+5]),x.set(r[y+6],r[y+7],r[y+8]),R.set(o[_+0],o[_+1]),P.set(o[_+2],o[_+3]),N.set(o[_+4],o[_+5]),C.copy(T).add(S).add(x).divideScalar(3);const w=m(C);M(R,_+0,T,w),M(P,_+2,S,w),M(N,_+4,x,w)}}function M(T,S,x,C){C<0&&T.x===1&&(o[S]=T.x-1),x.x===0&&x.z===0&&(o[S]=C/2/Math.PI+.5)}function m(T){return Math.atan2(T.z,-T.x)}function p(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ma(t.vertices,t.indices,t.radius,t.details)}}class fn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new gt:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new F,s=[],r=[],o=[],a=new F,l=new oe;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new F)}r[0]=new F,o[0]=new F;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(qt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(qt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ga extends fn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new gt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Vu extends ga{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function _a(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Zs=new F,qr=new _a,Yr=new _a,jr=new _a;class jo extends fn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new F){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Zs.subVectors(s[0],s[1]).add(s[0]),c=Zs);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Zs.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Zs),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),M=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);M<1e-4&&(M=1),g<1e-4&&(g=M),m<1e-4&&(m=M),qr.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,M,m),Yr.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,M,m),jr.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,M,m)}else this.curveType==="catmullrom"&&(qr.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Yr.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),jr.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(qr.calc(l),Yr.calc(l),jr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new F().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function pl(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Gu(i,t){const e=1-i;return e*e*t}function Wu(i,t){return 2*(1-i)*i*t}function Xu(i,t){return i*i*t}function os(i,t,e,n){return Gu(i,t)+Wu(i,e)+Xu(i,n)}function qu(i,t){const e=1-i;return e*e*e*t}function Yu(i,t){const e=1-i;return 3*e*e*i*t}function ju(i,t){return 3*(1-i)*i*i*t}function Zu(i,t){return i*i*i*t}function as(i,t,e,n,s){return qu(i,t)+Yu(i,e)+ju(i,n)+Zu(i,s)}class Pc extends fn{constructor(t=new gt,e=new gt,n=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new gt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(as(t,s.x,r.x,o.x,a.x),as(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ku extends fn{constructor(t=new F,e=new F,n=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new F){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(as(t,s.x,r.x,o.x,a.x),as(t,s.y,r.y,o.y,a.y),as(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lc extends fn{constructor(t=new gt,e=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new gt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $u extends fn{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dc extends fn{constructor(t=new gt,e=new gt,n=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new gt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(os(t,s.x,r.x,o.x),os(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ic extends fn{constructor(t=new F,e=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new F){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(os(t,s.x,r.x,o.x),os(t,s.y,r.y,o.y),os(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uc extends fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new gt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(pl(a,l.x,c.x,h.x,u.x),pl(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new gt().fromArray(s))}return this}}var dr=Object.freeze({__proto__:null,ArcCurve:Vu,CatmullRomCurve3:jo,CubicBezierCurve:Pc,CubicBezierCurve3:Ku,EllipseCurve:ga,LineCurve:Lc,LineCurve3:$u,QuadraticBezierCurve:Dc,QuadraticBezierCurve3:Ic,SplineCurve:Uc});class Ju extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new dr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new dr[s.type]().fromJSON(s))}return this}}class ml extends Ju{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Lc(this.currentPoint.clone(),new gt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Dc(this.currentPoint.clone(),new gt(t,e),new gt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Pc(this.currentPoint.clone(),new gt(t,e),new gt(n,s),new gt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Uc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new ga(t,e,n,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Fi extends ml{constructor(t){super(t),this.uuid=si(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ml().fromJSON(s))}return this}}function Qu(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Nc(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=rf(i,t,r,e)),i.length>80*e){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){const d=i[f],g=i[f+1];d<a&&(a=d),g<l&&(l=g),d>h&&(h=d),g>u&&(u=g)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return ms(r,o,e,a,l,c,0),o}function Nc(i,t,e,n,s){let r;if(s===gf(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=gl(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=gl(o/n|0,i[o],i[o+1],r);return r&&Oi(r,r.next)&&(_s(r),r=r.next),r}function ei(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Oi(e,e.next)||de(e.prev,e,e.next)===0)){if(_s(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ms(i,t,e,n,s,r,o){if(!i)return;!o&&r&&hf(i,n,s,r);let a=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?ef(i,n,s,r):tf(i)){t.push(l.i,i.i,c.i),_s(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=nf(ei(i),t),ms(i,t,e,n,s,r,2)):o===2&&sf(i,t,e,n,s,r):ms(ei(i),t,e,n,s,r,1);break}}}function tf(i){const t=i.prev,e=i,n=i.next;if(de(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),f=Math.max(s,r,o),d=Math.max(a,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Qi(s,a,r,l,o,c,g.x,g.y)&&de(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function ef(i,t,e,n){const s=i.prev,r=i,o=i.next;if(de(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,l,c),g=Math.min(h,u,f),M=Math.max(a,l,c),m=Math.max(h,u,f),p=Zo(d,g,t,e,n),T=Zo(M,m,t,e,n);let S=i.prevZ,x=i.nextZ;for(;S&&S.z>=p&&x&&x.z<=T;){if(S.x>=d&&S.x<=M&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Qi(a,h,l,u,c,f,S.x,S.y)&&de(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=d&&x.x<=M&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Qi(a,h,l,u,c,f,x.x,x.y)&&de(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=M&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Qi(a,h,l,u,c,f,S.x,S.y)&&de(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=T;){if(x.x>=d&&x.x<=M&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Qi(a,h,l,u,c,f,x.x,x.y)&&de(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function nf(i,t){let e=i;do{const n=e.prev,s=e.next.next;!Oi(n,s)&&Oc(n,e,e.next,s)&&gs(n,s)&&gs(s,n)&&(t.push(n.i,e.i,s.i),_s(e),_s(e.next),e=i=s),e=e.next}while(e!==i);return ei(e)}function sf(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&df(o,a)){let l=Bc(o,a);o=ei(o,o.next),l=ei(l,l.next),ms(o,t,e,n,s,r,0),ms(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function rf(i,t,e,n){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Nc(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(ff(c))}s.sort(of);for(let r=0;r<s.length;r++)e=af(s[r],e);return e}function of(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function af(i,t){const e=lf(i,t);if(!e)return t;const n=Bc(e,i);return ei(n,n.next),ei(e,e.next)}function lf(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,o;if(Oi(i,e))return e;do{if(Oi(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,l=o.x,c=o.y;let h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Fc(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);gs(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&cf(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function cf(i,t){return de(i.prev,i,t.prev)<0&&de(t.next,i,i.next)<0}function hf(i,t,e,n){let s=i;do s.z===0&&(s.z=Zo(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,uf(s)}function uf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Zo(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function ff(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Fc(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Qi(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Fc(i,t,e,n,s,r,o,a)}function df(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!pf(i,t)&&(gs(i,t)&&gs(t,i)&&mf(i,t)&&(de(i.prev,i,t.prev)||de(i,t.prev,t))||Oi(i,t)&&de(i.prev,i,i.next)>0&&de(t.prev,t,t.next)>0)}function de(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Oi(i,t){return i.x===t.x&&i.y===t.y}function Oc(i,t,e,n){const s=$s(de(i,t,e)),r=$s(de(i,t,n)),o=$s(de(e,n,i)),a=$s(de(e,n,t));return!!(s!==r&&o!==a||s===0&&Ks(i,e,t)||r===0&&Ks(i,n,t)||o===0&&Ks(e,i,n)||a===0&&Ks(e,t,n))}function Ks(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function $s(i){return i>0?1:i<0?-1:0}function pf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Oc(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function gs(i,t){return de(i.prev,i,i.next)<0?de(i,t,i.next)>=0&&de(i,i.prev,t)>=0:de(i,t,i.prev)<0||de(i,i.next,t)<0}function mf(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Bc(i,t){const e=Ko(i.i,i.x,i.y),n=Ko(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function gl(i,t,e,n){const s=Ko(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function _s(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ko(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function gf(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class _f{static triangulate(t,e,n=2){return Qu(t,e,n)}}class Mn{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Mn.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];_l(t),vl(n,t);let o=t.length;e.forEach(_l);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,vl(n,e[l]);const a=_f.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function _l(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function vl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class vs extends pe{constructor(t=new Fi([new gt(.5,.5),new gt(-.5,.5),new gt(-.5,-.5),new gt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Yt(s,3)),this.setAttribute("uv",new Yt(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,M=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:vf;let S,x=!1,C,R,P,N;p&&(S=p.getSpacedPoints(h),x=!0,f=!1,C=p.computeFrenetFrames(h,!1),R=new F,P=new F,N=new F),f||(m=0,d=0,g=0,M=0);const y=a.extractPoints(c);let _=y.shape;const w=y.holes;if(!Mn.isClockWise(_)){_=_.reverse();for(let lt=0,rt=w.length;lt<rt;lt++){const st=w[lt];Mn.isClockWise(st)&&(w[lt]=st.reverse())}}function X(lt){const st=10000000000000001e-36;let it=lt[0];for(let St=1;St<=lt.length;St++){const pt=St%lt.length,xt=lt[pt],Ht=xt.x-it.x,Bt=xt.y-it.y,A=Ht*Ht+Bt*Bt,v=Math.max(Math.abs(xt.x),Math.abs(xt.y),Math.abs(it.x),Math.abs(it.y)),W=st*v*v;if(A<=W){lt.splice(pt,1),St--;continue}it=xt}}X(_),w.forEach(X);const G=w.length,Y=_;for(let lt=0;lt<G;lt++){const rt=w[lt];_=_.concat(rt)}function b(lt,rt,st){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),lt.clone().addScaledVector(rt,st)}const U=_.length;function I(lt,rt,st){let it,St,pt;const xt=lt.x-rt.x,Ht=lt.y-rt.y,Bt=st.x-lt.x,A=st.y-lt.y,v=xt*xt+Ht*Ht,W=xt*A-Ht*Bt;if(Math.abs(W)>Number.EPSILON){const Q=Math.sqrt(v),ut=Math.sqrt(Bt*Bt+A*A),tt=rt.x-Ht/Q,Dt=rt.y+xt/Q,D=st.x-A/ut,z=st.y+Bt/ut,k=((D-tt)*A-(z-Dt)*Bt)/(xt*A-Ht*Bt);it=tt+xt*k-lt.x,St=Dt+Ht*k-lt.y;const q=it*it+St*St;if(q<=2)return new gt(it,St);pt=Math.sqrt(q/2)}else{let Q=!1;xt>Number.EPSILON?Bt>Number.EPSILON&&(Q=!0):xt<-Number.EPSILON?Bt<-Number.EPSILON&&(Q=!0):Math.sign(Ht)===Math.sign(A)&&(Q=!0),Q?(it=-Ht,St=xt,pt=Math.sqrt(v)):(it=xt,St=Ht,pt=Math.sqrt(v/2))}return new gt(it/pt,St/pt)}const j=[];for(let lt=0,rt=Y.length,st=rt-1,it=lt+1;lt<rt;lt++,st++,it++)st===rt&&(st=0),it===rt&&(it=0),j[lt]=I(Y[lt],Y[st],Y[it]);const K=[];let et,vt=j.concat();for(let lt=0,rt=G;lt<rt;lt++){const st=w[lt];et=[];for(let it=0,St=st.length,pt=St-1,xt=it+1;it<St;it++,pt++,xt++)pt===St&&(pt=0),xt===St&&(xt=0),et[it]=I(st[it],st[pt],st[xt]);K.push(et),vt=vt.concat(et)}let yt;if(m===0)yt=Mn.triangulateShape(Y,w);else{const lt=[],rt=[];for(let st=0;st<m;st++){const it=st/m,St=d*Math.cos(it*Math.PI/2),pt=g*Math.sin(it*Math.PI/2)+M;for(let xt=0,Ht=Y.length;xt<Ht;xt++){const Bt=b(Y[xt],j[xt],pt);Pt(Bt.x,Bt.y,-St),it===0&&lt.push(Bt)}for(let xt=0,Ht=G;xt<Ht;xt++){const Bt=w[xt];et=K[xt];const A=[];for(let v=0,W=Bt.length;v<W;v++){const Q=b(Bt[v],et[v],pt);Pt(Q.x,Q.y,-St),it===0&&A.push(Q)}it===0&&rt.push(A)}}yt=Mn.triangulateShape(lt,rt)}const Nt=yt.length,jt=g+M;for(let lt=0;lt<U;lt++){const rt=f?b(_[lt],vt[lt],jt):_[lt];x?(P.copy(C.normals[0]).multiplyScalar(rt.x),R.copy(C.binormals[0]).multiplyScalar(rt.y),N.copy(S[0]).add(P).add(R),Pt(N.x,N.y,N.z)):Pt(rt.x,rt.y,0)}for(let lt=1;lt<=h;lt++)for(let rt=0;rt<U;rt++){const st=f?b(_[rt],vt[rt],jt):_[rt];x?(P.copy(C.normals[lt]).multiplyScalar(st.x),R.copy(C.binormals[lt]).multiplyScalar(st.y),N.copy(S[lt]).add(P).add(R),Pt(N.x,N.y,N.z)):Pt(st.x,st.y,u/h*lt)}for(let lt=m-1;lt>=0;lt--){const rt=lt/m,st=d*Math.cos(rt*Math.PI/2),it=g*Math.sin(rt*Math.PI/2)+M;for(let St=0,pt=Y.length;St<pt;St++){const xt=b(Y[St],j[St],it);Pt(xt.x,xt.y,u+st)}for(let St=0,pt=w.length;St<pt;St++){const xt=w[St];et=K[St];for(let Ht=0,Bt=xt.length;Ht<Bt;Ht++){const A=b(xt[Ht],et[Ht],it);x?Pt(A.x,A.y+S[h-1].y,S[h-1].x+st):Pt(A.x,A.y,u+st)}}}nt(),ht();function nt(){const lt=s.length/3;if(f){let rt=0,st=U*rt;for(let it=0;it<Nt;it++){const St=yt[it];Lt(St[2]+st,St[1]+st,St[0]+st)}rt=h+m*2,st=U*rt;for(let it=0;it<Nt;it++){const St=yt[it];Lt(St[0]+st,St[1]+st,St[2]+st)}}else{for(let rt=0;rt<Nt;rt++){const st=yt[rt];Lt(st[2],st[1],st[0])}for(let rt=0;rt<Nt;rt++){const st=yt[rt];Lt(st[0]+U*h,st[1]+U*h,st[2]+U*h)}}n.addGroup(lt,s.length/3-lt,0)}function ht(){const lt=s.length/3;let rt=0;bt(Y,rt),rt+=Y.length;for(let st=0,it=w.length;st<it;st++){const St=w[st];bt(St,rt),rt+=St.length}n.addGroup(lt,s.length/3-lt,1)}function bt(lt,rt){let st=lt.length;for(;--st>=0;){const it=st;let St=st-1;St<0&&(St=lt.length-1);for(let pt=0,xt=h+m*2;pt<xt;pt++){const Ht=U*pt,Bt=U*(pt+1),A=rt+it+Ht,v=rt+St+Ht,W=rt+St+Bt,Q=rt+it+Bt;Zt(A,v,W,Q)}}}function Pt(lt,rt,st){l.push(lt),l.push(rt),l.push(st)}function Lt(lt,rt,st){ee(lt),ee(rt),ee(st);const it=s.length/3,St=T.generateTopUV(n,s,it-3,it-2,it-1);L(St[0]),L(St[1]),L(St[2])}function Zt(lt,rt,st,it){ee(lt),ee(rt),ee(it),ee(rt),ee(st),ee(it);const St=s.length/3,pt=T.generateSideWallUV(n,s,St-6,St-3,St-2,St-1);L(pt[0]),L(pt[1]),L(pt[3]),L(pt[1]),L(pt[2]),L(pt[3])}function ee(lt){s.push(l[lt*3+0]),s.push(l[lt*3+1]),s.push(l[lt*3+2])}function L(lt){r.push(lt.x),r.push(lt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return xf(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new dr[s.type]().fromJSON(s)),new vs(n,t.options)}}const vf={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new gt(r,o),new gt(a,l),new gt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],M=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new gt(o,1-l),new gt(c,1-u),new gt(f,1-g),new gt(M,1-p)]:[new gt(a,1-l),new gt(h,1-u),new gt(d,1-g),new gt(m,1-p)]}};function xf(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Bi extends ma{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Bi(t.radius,t.detail)}}class ni extends pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,d=[],g=[],M=[],m=[];for(let p=0;p<h;p++){const T=p*f-o;for(let S=0;S<c;S++){const x=S*u-r;g.push(x,-T,0),M.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<a;T++){const S=T+c*p,x=T+c*(p+1),C=T+1+c*(p+1),R=T+1+c*p;d.push(S,x,R),d.push(x,C,R)}this.setIndex(d),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(M,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ni(t.width,t.height,t.widthSegments,t.heightSegments)}}class va extends pe{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const f=(e-t)/s,d=new F,g=new gt;for(let M=0;M<=s;M++){for(let m=0;m<=n;m++){const p=r+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let M=0;M<s;M++){const m=M*(n+1);for(let p=0;p<n;p++){const T=p+m,S=T,x=T+n+1,C=T+n+2,R=T+1;a.push(S,x,R),a.push(x,C,R)}}this.setIndex(a),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(c,3)),this.setAttribute("uv",new Yt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new va(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class xa extends pe{constructor(t=new Fi([new gt(0,.5),new gt(-.5,-.5),new gt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Yt(s,3)),this.setAttribute("normal",new Yt(r,3)),this.setAttribute("uv",new Yt(o,2));function c(h){const u=s.length/3,f=h.extractPoints(e);let d=f.shape;const g=f.holes;Mn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const T=g[m];Mn.isClockWise(T)===!0&&(g[m]=T.reverse())}const M=Mn.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const T=g[m];d=d.concat(T)}for(let m=0,p=d.length;m<p;m++){const T=d[m];s.push(T.x,T.y,0),r.push(0,0,1),o.push(T.x,T.y)}for(let m=0,p=M.length;m<p;m++){const T=M[m],S=T[0]+u,x=T[1]+u,C=T[2]+u;n.push(S,x,C),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Mf(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new xa(n,t.curveSegments)}}function Mf(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Vi extends pe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new F,f=new F,d=[],g=[],M=[],m=[];for(let p=0;p<=n;p++){const T=[],S=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const R=C/e;u.x=-t*Math.cos(s+R*r)*Math.sin(o+S*a),u.y=t*Math.cos(o+S*a),u.z=t*Math.sin(s+R*r)*Math.sin(o+S*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),M.push(f.x,f.y,f.z),m.push(R+x,1-S),T.push(c++)}h.push(T)}for(let p=0;p<n;p++)for(let T=0;T<e;T++){const S=h[p][T+1],x=h[p][T],C=h[p+1][T],R=h[p+1][T+1];(p!==0||o>0)&&d.push(S,x,R),(p!==n-1||l<Math.PI)&&d.push(x,C,R)}this.setIndex(d),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(M,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ma extends pe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new F,u=new F,f=new F;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const M=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(M),u.y=(t+e*Math.cos(m))*Math.sin(M),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const M=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,T=(s+1)*d+g;o.push(M,m,T),o.push(m,p,T)}this.setIndex(o),this.setAttribute("position",new Yt(a,3)),this.setAttribute("normal",new Yt(l,3)),this.setAttribute("uv",new Yt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ma(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ya extends pe{constructor(t=new Ic(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new F,l=new F,c=new gt;let h=new F;const u=[],f=[],d=[],g=[];M(),this.setIndex(g),this.setAttribute("position",new Yt(u,3)),this.setAttribute("normal",new Yt(f,3)),this.setAttribute("uv",new Yt(d,2));function M(){for(let S=0;S<e;S++)m(S);m(r===!1?e:0),T(),p()}function m(S){h=t.getPointAt(S/e,h);const x=o.normals[S],C=o.binormals[S];for(let R=0;R<=s;R++){const P=R/s*Math.PI*2,N=Math.sin(P),y=-Math.cos(P);l.x=y*x.x+N*C.x,l.y=y*x.y+N*C.y,l.z=y*x.z+N*C.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let S=1;S<=e;S++)for(let x=1;x<=s;x++){const C=(s+1)*(S-1)+(x-1),R=(s+1)*S+(x-1),P=(s+1)*S+x,N=(s+1)*(S-1)+x;g.push(C,R,N),g.push(R,P,N)}}function T(){for(let S=0;S<=e;S++)for(let x=0;x<=s;x++)c.x=S/e,c.y=x/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new ya(new dr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class be extends ki{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_c,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yf extends ki{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Sf extends ki{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class zc extends Me{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ef extends zc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Zr=new oe,xl=new F,Ml=new F;class bf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new da,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;xl.setFromMatrixPosition(t.matrixWorld),e.position.copy(xl),Ml.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ml),e.updateMatrixWorld(),Zr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zr,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Zr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Hc extends Tc{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Tf extends bf{constructor(){super(new Hc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kc extends zc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Me.DEFAULT_UP),this.updateMatrix(),this.target=new Me,this.shadow=new Tf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class wf extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const yl=new oe;class Af{constructor(t,e,n=0,s=1/0){this.ray=new vr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ha,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return yl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yl),this}intersectObject(t,e=!0,n=[]){return $o(t,this,n,e),n.sort(Sl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)$o(t[s],this,n,e);return n.sort(Sl),n}}function Sl(i,t){return i.distance-t.distance}function $o(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)$o(r[o],t,e,!0)}}class El{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Rf extends ii{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function bl(i,t,e,n){const s=Cf(n);switch(e){case pc:return i*t;case sa:return i*t/s.components*s.byteLength;case ra:return i*t/s.components*s.byteLength;case gc:return i*t*2/s.components*s.byteLength;case oa:return i*t*2/s.components*s.byteLength;case mc:return i*t*3/s.components*s.byteLength;case nn:return i*t*4/s.components*s.byteLength;case aa:return i*t*4/s.components*s.byteLength;case nr:case ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case sr:case rr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Mo:case So:return Math.max(i,16)*Math.max(t,8)/4;case xo:case yo:return Math.max(i,8)*Math.max(t,8)/2;case Eo:case bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case To:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Co:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Po:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Lo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Do:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Io:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Uo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case No:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Fo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Oo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Bo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case zo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ho:case ko:case Vo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Go:case Wo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Xo:case qo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Cf(i){switch(i){case hn:case hc:return{byteLength:1,components:1};case cs:case uc:case Ss:return{byteLength:2,components:1};case na:case ia:return{byteLength:2,components:4};case Jn:case ea:case ln:return{byteLength:4,components:1};case fc:case dc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ta}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ta);function Vc(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Pf(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],M=u[d];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++f,u[f]=M)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const M=u[d];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Lf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Df=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,If=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Of=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Hf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Wf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Xf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,qf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$f=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,td=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ed=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,nd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,id=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,od=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ad="gl_FragColor = linearToOutputTexel( gl_FragColor );",ld=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,hd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ud=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,fd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,pd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,md=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_d=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Md=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ed=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Td=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ad=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Cd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Pd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ld=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Id=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ud=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Od=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Hd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Yd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Kd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$d=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,tp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ep=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,np=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ip=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,sp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,op=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ap=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,up=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,dp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,pp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,mp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,gp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_p=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,vp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ep=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Tp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Cp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Pp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Lp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ip=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Np=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Op=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Bp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,zp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Xp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$p=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Jp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,em=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,im=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,om=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,am=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,lm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xt={alphahash_fragment:Lf,alphahash_pars_fragment:Df,alphamap_fragment:If,alphamap_pars_fragment:Uf,alphatest_fragment:Nf,alphatest_pars_fragment:Ff,aomap_fragment:Of,aomap_pars_fragment:Bf,batching_pars_vertex:zf,batching_vertex:Hf,begin_vertex:kf,beginnormal_vertex:Vf,bsdfs:Gf,iridescence_fragment:Wf,bumpmap_pars_fragment:Xf,clipping_planes_fragment:qf,clipping_planes_pars_fragment:Yf,clipping_planes_pars_vertex:jf,clipping_planes_vertex:Zf,color_fragment:Kf,color_pars_fragment:$f,color_pars_vertex:Jf,color_vertex:Qf,common:td,cube_uv_reflection_fragment:ed,defaultnormal_vertex:nd,displacementmap_pars_vertex:id,displacementmap_vertex:sd,emissivemap_fragment:rd,emissivemap_pars_fragment:od,colorspace_fragment:ad,colorspace_pars_fragment:ld,envmap_fragment:cd,envmap_common_pars_fragment:hd,envmap_pars_fragment:ud,envmap_pars_vertex:fd,envmap_physical_pars_fragment:Ed,envmap_vertex:dd,fog_vertex:pd,fog_pars_vertex:md,fog_fragment:gd,fog_pars_fragment:_d,gradientmap_pars_fragment:vd,lightmap_pars_fragment:xd,lights_lambert_fragment:Md,lights_lambert_pars_fragment:yd,lights_pars_begin:Sd,lights_toon_fragment:bd,lights_toon_pars_fragment:Td,lights_phong_fragment:wd,lights_phong_pars_fragment:Ad,lights_physical_fragment:Rd,lights_physical_pars_fragment:Cd,lights_fragment_begin:Pd,lights_fragment_maps:Ld,lights_fragment_end:Dd,logdepthbuf_fragment:Id,logdepthbuf_pars_fragment:Ud,logdepthbuf_pars_vertex:Nd,logdepthbuf_vertex:Fd,map_fragment:Od,map_pars_fragment:Bd,map_particle_fragment:zd,map_particle_pars_fragment:Hd,metalnessmap_fragment:kd,metalnessmap_pars_fragment:Vd,morphinstance_vertex:Gd,morphcolor_vertex:Wd,morphnormal_vertex:Xd,morphtarget_pars_vertex:qd,morphtarget_vertex:Yd,normal_fragment_begin:jd,normal_fragment_maps:Zd,normal_pars_fragment:Kd,normal_pars_vertex:$d,normal_vertex:Jd,normalmap_pars_fragment:Qd,clearcoat_normal_fragment_begin:tp,clearcoat_normal_fragment_maps:ep,clearcoat_pars_fragment:np,iridescence_pars_fragment:ip,opaque_fragment:sp,packing:rp,premultiplied_alpha_fragment:op,project_vertex:ap,dithering_fragment:lp,dithering_pars_fragment:cp,roughnessmap_fragment:hp,roughnessmap_pars_fragment:up,shadowmap_pars_fragment:fp,shadowmap_pars_vertex:dp,shadowmap_vertex:pp,shadowmask_pars_fragment:mp,skinbase_vertex:gp,skinning_pars_vertex:_p,skinning_vertex:vp,skinnormal_vertex:xp,specularmap_fragment:Mp,specularmap_pars_fragment:yp,tonemapping_fragment:Sp,tonemapping_pars_fragment:Ep,transmission_fragment:bp,transmission_pars_fragment:Tp,uv_pars_fragment:wp,uv_pars_vertex:Ap,uv_vertex:Rp,worldpos_vertex:Cp,background_vert:Pp,background_frag:Lp,backgroundCube_vert:Dp,backgroundCube_frag:Ip,cube_vert:Up,cube_frag:Np,depth_vert:Fp,depth_frag:Op,distanceRGBA_vert:Bp,distanceRGBA_frag:zp,equirect_vert:Hp,equirect_frag:kp,linedashed_vert:Vp,linedashed_frag:Gp,meshbasic_vert:Wp,meshbasic_frag:Xp,meshlambert_vert:qp,meshlambert_frag:Yp,meshmatcap_vert:jp,meshmatcap_frag:Zp,meshnormal_vert:Kp,meshnormal_frag:$p,meshphong_vert:Jp,meshphong_frag:Qp,meshphysical_vert:tm,meshphysical_frag:em,meshtoon_vert:nm,meshtoon_frag:im,points_vert:sm,points_frag:rm,shadow_vert:om,shadow_frag:am,sprite_vert:lm,sprite_frag:cm},Et={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},on={basic:{uniforms:Ce([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Ce([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Ce([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Ce([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Ce([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Ce([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Ce([Et.points,Et.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Ce([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Ce([Et.common,Et.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Ce([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Ce([Et.sprite,Et.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:Ce([Et.common,Et.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:Ce([Et.lights,Et.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};on.physical={uniforms:Ce([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const Js={r:0,b:0,g:0},Gn=new un,hm=new oe;function um(i,t,e,n,s,r,o){const a=new Wt(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function g(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function M(S){let x=!1;const C=g(S);C===null?p(a,l):C&&C.isColor&&(p(C,1),x=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,x){const C=g(x);C&&(C.isCubeTexture||C.mapping===_r)?(h===void 0&&(h=new ce(new Nn(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Ni(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,P,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Gn.copy(x.backgroundRotation),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(hm.makeRotationFromEuler(Gn)),h.material.toneMapped=Qt.getTransfer(C.colorSpace)!==se,(u!==C||f!==C.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=C,f=C.version,d=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new ce(new ni(2,2),new Un({name:"BackgroundMaterial",uniforms:Ni(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(C.colorSpace)!==se,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||f!==C.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=C,f=C.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,x){S.getRGB(Js,bc(i)),n.buffers.color.setClear(Js.r,Js.g,Js.b,x,o)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:M,addToRenderList:m,dispose:T}}function fm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(_,w,O,X,G){let Y=!1;const b=u(X,O,w);r!==b&&(r=b,c(r.object)),Y=d(_,X,O,G),Y&&g(_,X,O,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,x(_,w,O,X),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function u(_,w,O){const X=O.wireframe===!0;let G=n[_.id];G===void 0&&(G={},n[_.id]=G);let Y=G[w.id];Y===void 0&&(Y={},G[w.id]=Y);let b=Y[X];return b===void 0&&(b=f(l()),Y[X]=b),b}function f(_){const w=[],O=[],X=[];for(let G=0;G<e;G++)w[G]=0,O[G]=0,X[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:O,attributeDivisors:X,object:_,attributes:{},index:null}}function d(_,w,O,X){const G=r.attributes,Y=w.attributes;let b=0;const U=O.getAttributes();for(const I in U)if(U[I].location>=0){const K=G[I];let et=Y[I];if(et===void 0&&(I==="instanceMatrix"&&_.instanceMatrix&&(et=_.instanceMatrix),I==="instanceColor"&&_.instanceColor&&(et=_.instanceColor)),K===void 0||K.attribute!==et||et&&K.data!==et.data)return!0;b++}return r.attributesNum!==b||r.index!==X}function g(_,w,O,X){const G={},Y=w.attributes;let b=0;const U=O.getAttributes();for(const I in U)if(U[I].location>=0){let K=Y[I];K===void 0&&(I==="instanceMatrix"&&_.instanceMatrix&&(K=_.instanceMatrix),I==="instanceColor"&&_.instanceColor&&(K=_.instanceColor));const et={};et.attribute=K,K&&K.data&&(et.data=K.data),G[I]=et,b++}r.attributes=G,r.attributesNum=b,r.index=X}function M(){const _=r.newAttributes;for(let w=0,O=_.length;w<O;w++)_[w]=0}function m(_){p(_,0)}function p(_,w){const O=r.newAttributes,X=r.enabledAttributes,G=r.attributeDivisors;O[_]=1,X[_]===0&&(i.enableVertexAttribArray(_),X[_]=1),G[_]!==w&&(i.vertexAttribDivisor(_,w),G[_]=w)}function T(){const _=r.newAttributes,w=r.enabledAttributes;for(let O=0,X=w.length;O<X;O++)w[O]!==_[O]&&(i.disableVertexAttribArray(O),w[O]=0)}function S(_,w,O,X,G,Y,b){b===!0?i.vertexAttribIPointer(_,w,O,G,Y):i.vertexAttribPointer(_,w,O,X,G,Y)}function x(_,w,O,X){M();const G=X.attributes,Y=O.getAttributes(),b=w.defaultAttributeValues;for(const U in Y){const I=Y[U];if(I.location>=0){let j=G[U];if(j===void 0&&(U==="instanceMatrix"&&_.instanceMatrix&&(j=_.instanceMatrix),U==="instanceColor"&&_.instanceColor&&(j=_.instanceColor)),j!==void 0){const K=j.normalized,et=j.itemSize,vt=t.get(j);if(vt===void 0)continue;const yt=vt.buffer,Nt=vt.type,jt=vt.bytesPerElement,nt=Nt===i.INT||Nt===i.UNSIGNED_INT||j.gpuType===ea;if(j.isInterleavedBufferAttribute){const ht=j.data,bt=ht.stride,Pt=j.offset;if(ht.isInstancedInterleavedBuffer){for(let Lt=0;Lt<I.locationSize;Lt++)p(I.location+Lt,ht.meshPerAttribute);_.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Lt=0;Lt<I.locationSize;Lt++)m(I.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let Lt=0;Lt<I.locationSize;Lt++)S(I.location+Lt,et/I.locationSize,Nt,K,bt*jt,(Pt+et/I.locationSize*Lt)*jt,nt)}else{if(j.isInstancedBufferAttribute){for(let ht=0;ht<I.locationSize;ht++)p(I.location+ht,j.meshPerAttribute);_.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ht=0;ht<I.locationSize;ht++)m(I.location+ht);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let ht=0;ht<I.locationSize;ht++)S(I.location+ht,et/I.locationSize,Nt,K,et*jt,et/I.locationSize*ht*jt,nt)}}else if(b!==void 0){const K=b[U];if(K!==void 0)switch(K.length){case 2:i.vertexAttrib2fv(I.location,K);break;case 3:i.vertexAttrib3fv(I.location,K);break;case 4:i.vertexAttrib4fv(I.location,K);break;default:i.vertexAttrib1fv(I.location,K)}}}}T()}function C(){N();for(const _ in n){const w=n[_];for(const O in w){const X=w[O];for(const G in X)h(X[G].object),delete X[G];delete w[O]}delete n[_]}}function R(_){if(n[_.id]===void 0)return;const w=n[_.id];for(const O in w){const X=w[O];for(const G in X)h(X[G].object),delete X[G];delete w[O]}delete n[_.id]}function P(_){for(const w in n){const O=n[w];if(O[_.id]===void 0)continue;const X=O[_.id];for(const G in X)h(X[G].object),delete X[G];delete O[_.id]}}function N(){y(),o=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:M,enableAttribute:m,disableUnusedAttributes:T}}function dm(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let M=0;M<u;M++)g+=h[M]*f[M];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function pm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==nn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const N=P===Ss&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==hn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ln&&!N)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:C,maxSamples:R}}function mm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Cn,a=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,M=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const T=r?0:n,S=T*4;let x=p.clippingState||null;l.value=x,x=h(g,f,S,d);for(let C=0;C!==S;++C)x[C]=e[C];p.clippingState=x,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const M=u!==null?u.length:0;let m=null;if(M!==0){if(m=l.value,g!==!0||m===null){const p=d+M*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,x=d;S!==M;++S,x+=4)o.copy(u[S]).applyMatrix4(T,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,m}}function gm(i){let t=new WeakMap;function e(o,a){return a===mo?o.mapping=Di:a===go&&(o.mapping=Ii),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===mo||a===go)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Du(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const wi=4,Tl=[.125,.215,.35,.446,.526,.582],Yn=20,Kr=new Hc,wl=new Wt;let $r=null,Jr=0,Qr=0,to=!1;const Xn=(1+Math.sqrt(5))/2,yi=1/Xn,Al=[new F(-Xn,yi,0),new F(Xn,yi,0),new F(-yi,0,Xn),new F(yi,0,Xn),new F(0,Xn,-yi),new F(0,Xn,yi),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],_m=new F;class Rl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=_m}=r;$r=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),Qr=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ll(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($r,Jr,Qr),this._renderer.xr.enabled=to,t.scissorTest=!1,Qs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Di||t.mapping===Ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$r=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),Qr=this._renderer.getActiveMipmapLevel(),to=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:Ss,format:nn,colorSpace:Ui,depthBuffer:!1},s=Cl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vm(r)),this._blurMaterial=xm(r,t,e)}return s}_compileMaterial(t){const e=new ce(this._lodPlanes[0],t);this._renderer.compile(e,Kr)}_sceneToCubeUV(t,e,n,s,r){const l=new je(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(wl),u.toneMapping=Dn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const M=new ua({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),m=new ce(new Nn,M);let p=!1;const T=t.background;T?T.isColor&&(M.color.copy(T),t.background=null,p=!0):(M.color.copy(wl),p=!0);for(let S=0;S<6;S++){const x=S%3;x===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):x===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));const C=this._cubeSize;Qs(s,x*C,S>2?C:0,C,C),u.setRenderTarget(s),p&&u.render(m,l),u.render(t,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=T}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Di||t.mapping===Ii;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ll()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ce(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Qs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Kr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Al[(s-r-1)%Al.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ce(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Yn-1),M=r/g,m=isFinite(r)?1+Math.floor(h*M):Yn;m>Yn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yn}`);const p=[];let T=0;for(let P=0;P<Yn;++P){const N=P/M,y=Math.exp(-N*N/2);p.push(y),P===0?T+=y:P<m&&(T+=2*y)}for(let P=0;P<p.length;P++)p[P]=p[P]/T;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const x=this._sizeLods[s],C=3*x*(s>S-wi?s-S+wi:0),R=4*(this._cubeSize-x);Qs(e,C,R,3*x,2*x),l.setRenderTarget(e),l.render(u,Kr)}}function vm(i){const t=[],e=[],n=[];let s=i;const r=i-wi+1+Tl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-wi?l=Tl[o-i+wi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,M=3,m=2,p=1,T=new Float32Array(M*g*d),S=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let R=0;R<d;R++){const P=R%3*2/3-1,N=R>2?0:-1,y=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];T.set(y,M*g*R),S.set(f,m*g*R);const _=[R,R,R,R,R,R];x.set(_,p*g*R)}const C=new pe;C.setAttribute("position",new Ze(T,M)),C.setAttribute("uv",new Ze(S,m)),C.setAttribute("faceIndex",new Ze(x,p)),t.push(C),s>wi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Cl(i,t,e){const n=new ti(i,t,e);return n.texture.mapping=_r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function xm(i,t,e){const n=new Float32Array(Yn),s=new F(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Pl(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Ll(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Sa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Mm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===mo||l===go,h=l===Di||l===Ii;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Rl(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Rl(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function ym(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ps("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Sm(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,g=u.attributes.position;let M=0;if(d!==null){const T=d.array;M=d.version;for(let S=0,x=T.length;S<x;S+=3){const C=T[S+0],R=T[S+1],P=T[S+2];f.push(C,R,R,P,P,C)}}else if(g!==void 0){const T=g.array;M=g.version;for(let S=0,x=T.length/3-1;S<x;S+=3){const C=S+0,R=S+1,P=S+2;f.push(C,R,R,P,P,C)}}else return;const m=new(xc(f)?Ec:Sc)(f,1);m.version=M;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Em(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,M){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],M[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,M,0,g);let p=0;for(let T=0;T<g;T++)p+=d[T]*M[T];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Tm(i,t,e){const n=new WeakMap,s=new ge;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let _=function(){N.dispose(),n.delete(a),a.removeEventListener("dispose",_)};var d=_;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,M=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),M===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,R=1;C>t.maxTextureSize&&(R=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const P=new Float32Array(C*R*4*u),N=new Mc(P,C,R,u);N.type=ln,N.needsUpdate=!0;const y=x*4;for(let w=0;w<u;w++){const O=p[w],X=T[w],G=S[w],Y=C*R*4*w;for(let b=0;b<O.count;b++){const U=b*y;g===!0&&(s.fromBufferAttribute(O,b),P[Y+U+0]=s.x,P[Y+U+1]=s.y,P[Y+U+2]=s.z,P[Y+U+3]=0),M===!0&&(s.fromBufferAttribute(X,b),P[Y+U+4]=s.x,P[Y+U+5]=s.y,P[Y+U+6]=s.z,P[Y+U+7]=0),m===!0&&(s.fromBufferAttribute(G,b),P[Y+U+8]=s.x,P[Y+U+9]=s.y,P[Y+U+10]=s.z,P[Y+U+11]=G.itemSize===4?s.w:1)}}f={count:u,texture:N,size:new gt(C,R)},n.set(a,f),a.addEventListener("dispose",_)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const M=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",M),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function wm(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Gc=new Ie,Dl=new Rc(1,1),Wc=new Mc,Xc=new mu,qc=new wc,Il=[],Ul=[],Nl=new Float32Array(16),Fl=new Float32Array(9),Ol=new Float32Array(4);function Gi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Il[s];if(r===void 0&&(r=new Float32Array(s),Il[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ye(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Se(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function xr(i,t){let e=Ul[t];e===void 0&&(e=new Int32Array(t),Ul[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Am(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Rm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2fv(this.addr,t),Se(e,t)}}function Cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;i.uniform3fv(this.addr,t),Se(e,t)}}function Pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4fv(this.addr,t),Se(e,t)}}function Lm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;Ol.set(n),i.uniformMatrix2fv(this.addr,!1,Ol),Se(e,n)}}function Dm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;Fl.set(n),i.uniformMatrix3fv(this.addr,!1,Fl),Se(e,n)}}function Im(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;Nl.set(n),i.uniformMatrix4fv(this.addr,!1,Nl),Se(e,n)}}function Um(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2iv(this.addr,t),Se(e,t)}}function Fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3iv(this.addr,t),Se(e,t)}}function Om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4iv(this.addr,t),Se(e,t)}}function Bm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2uiv(this.addr,t),Se(e,t)}}function Hm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3uiv(this.addr,t),Se(e,t)}}function km(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4uiv(this.addr,t),Se(e,t)}}function Vm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Dl.compareFunction=vc,r=Dl):r=Gc,e.setTexture2D(t||r,s)}function Gm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Xc,s)}function Wm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||qc,s)}function Xm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Wc,s)}function qm(i){switch(i){case 5126:return Am;case 35664:return Rm;case 35665:return Cm;case 35666:return Pm;case 35674:return Lm;case 35675:return Dm;case 35676:return Im;case 5124:case 35670:return Um;case 35667:case 35671:return Nm;case 35668:case 35672:return Fm;case 35669:case 35673:return Om;case 5125:return Bm;case 36294:return zm;case 36295:return Hm;case 36296:return km;case 35678:case 36198:case 36298:case 36306:case 35682:return Vm;case 35679:case 36299:case 36307:return Gm;case 35680:case 36300:case 36308:case 36293:return Wm;case 36289:case 36303:case 36311:case 36292:return Xm}}function Ym(i,t){i.uniform1fv(this.addr,t)}function jm(i,t){const e=Gi(t,this.size,2);i.uniform2fv(this.addr,e)}function Zm(i,t){const e=Gi(t,this.size,3);i.uniform3fv(this.addr,e)}function Km(i,t){const e=Gi(t,this.size,4);i.uniform4fv(this.addr,e)}function $m(i,t){const e=Gi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Jm(i,t){const e=Gi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Qm(i,t){const e=Gi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function t0(i,t){i.uniform1iv(this.addr,t)}function e0(i,t){i.uniform2iv(this.addr,t)}function n0(i,t){i.uniform3iv(this.addr,t)}function i0(i,t){i.uniform4iv(this.addr,t)}function s0(i,t){i.uniform1uiv(this.addr,t)}function r0(i,t){i.uniform2uiv(this.addr,t)}function o0(i,t){i.uniform3uiv(this.addr,t)}function a0(i,t){i.uniform4uiv(this.addr,t)}function l0(i,t,e){const n=this.cache,s=t.length,r=xr(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Gc,r[o])}function c0(i,t,e){const n=this.cache,s=t.length,r=xr(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Xc,r[o])}function h0(i,t,e){const n=this.cache,s=t.length,r=xr(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||qc,r[o])}function u0(i,t,e){const n=this.cache,s=t.length,r=xr(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Wc,r[o])}function f0(i){switch(i){case 5126:return Ym;case 35664:return jm;case 35665:return Zm;case 35666:return Km;case 35674:return $m;case 35675:return Jm;case 35676:return Qm;case 5124:case 35670:return t0;case 35667:case 35671:return e0;case 35668:case 35672:return n0;case 35669:case 35673:return i0;case 5125:return s0;case 36294:return r0;case 36295:return o0;case 36296:return a0;case 35678:case 36198:case 36298:case 36306:case 35682:return l0;case 35679:case 36299:case 36307:return c0;case 35680:case 36300:case 36308:case 36293:return h0;case 36289:case 36303:case 36311:case 36292:return u0}}class d0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=qm(e.type)}}class p0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=f0(e.type)}}class m0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const eo=/(\w+)(\])?(\[|\.)?/g;function Bl(i,t){i.seq.push(t),i.map[t.id]=t}function g0(i,t,e){const n=i.name,s=n.length;for(eo.lastIndex=0;;){const r=eo.exec(n),o=eo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Bl(e,c===void 0?new d0(a,i,t):new p0(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new m0(a),Bl(e,u)),e=u}}}class or{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);g0(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function zl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const _0=37297;let v0=0;function x0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Hl=new Gt;function M0(i){Qt._getMatrix(Hl,Qt.workingColorSpace,i);const t=`mat3( ${Hl.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(i)){case hr:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function kl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+x0(i.getShaderSource(t),a)}else return r}function y0(i,t){const e=M0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function S0(i,t){let e;switch(t){case Ch:e="Linear";break;case Ph:e="Reinhard";break;case Lh:e="Cineon";break;case lc:e="ACESFilmic";break;case Ih:e="AgX";break;case Uh:e="Neutral";break;case Dh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const tr=new F;function E0(){Qt.getLuminanceCoefficients(tr);const i=tr.x.toFixed(4),t=tr.y.toFixed(4),e=tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function b0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ts).join(`
`)}function T0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function w0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ts(i){return i!==""}function Vl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const A0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jo(i){return i.replace(A0,C0)}const R0=new Map;function C0(i,t){let e=Xt[t];if(e===void 0){const n=R0.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Jo(e)}const P0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wl(i){return i.replace(P0,L0)}function L0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function D0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===rc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===oc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===xn&&(t="SHADOWMAP_TYPE_VSM"),t}function I0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Di:case Ii:t="ENVMAP_TYPE_CUBE";break;case _r:t="ENVMAP_TYPE_CUBE_UV";break}return t}function U0(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ii&&(t="ENVMAP_MODE_REFRACTION"),t}function N0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ac:t="ENVMAP_BLENDING_MULTIPLY";break;case Ah:t="ENVMAP_BLENDING_MIX";break;case Rh:t="ENVMAP_BLENDING_ADD";break}return t}function F0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function O0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=D0(e),c=I0(e),h=U0(e),u=N0(e),f=F0(e),d=b0(e),g=T0(r),M=s.createProgram();let m,p,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ts).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ts).join(`
`),p.length>0&&(p+=`
`)):(m=[Xl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ts).join(`
`),p=[Xl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Dn?"#define TONE_MAPPING":"",e.toneMapping!==Dn?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Dn?S0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,y0("linearToOutputTexel",e.outputColorSpace),E0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ts).join(`
`)),o=Jo(o),o=Vl(o,e),o=Gl(o,e),a=Jo(a),a=Vl(a,e),a=Gl(a,e),o=Wl(o),a=Wl(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=T+m+o,x=T+p+a,C=zl(s,s.VERTEX_SHADER,S),R=zl(s,s.FRAGMENT_SHADER,x);s.attachShader(M,C),s.attachShader(M,R),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function P(w){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(M)||"",X=s.getShaderInfoLog(C)||"",G=s.getShaderInfoLog(R)||"",Y=O.trim(),b=X.trim(),U=G.trim();let I=!0,j=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(I=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,C,R);else{const K=kl(s,C,"vertex"),et=kl(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+Y+`
`+K+`
`+et)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(b===""||U==="")&&(j=!1);j&&(w.diagnostics={runnable:I,programLog:Y,vertexShader:{log:b,prefix:m},fragmentShader:{log:U,prefix:p}})}s.deleteShader(C),s.deleteShader(R),N=new or(s,M),y=w0(s,M)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(M,_0)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=v0++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=C,this.fragmentShader=R,this}let B0=0;class z0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new H0(t),e.set(t,n)),n}}class H0{constructor(t){this.id=B0++,this.code=t,this.usedTimes=0}}function k0(i,t,e,n,s,r,o){const a=new ha,l=new z0,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,_,w,O,X){const G=O.fog,Y=X.geometry,b=y.isMeshStandardMaterial?O.environment:null,U=(y.isMeshStandardMaterial?e:t).get(y.envMap||b),I=U&&U.mapping===_r?U.image.height:null,j=g[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const K=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,et=K!==void 0?K.length:0;let vt=0;Y.morphAttributes.position!==void 0&&(vt=1),Y.morphAttributes.normal!==void 0&&(vt=2),Y.morphAttributes.color!==void 0&&(vt=3);let yt,Nt,jt,nt;if(j){const te=on[j];yt=te.vertexShader,Nt=te.fragmentShader}else yt=y.vertexShader,Nt=y.fragmentShader,l.update(y),jt=l.getVertexShaderID(y),nt=l.getFragmentShaderID(y);const ht=i.getRenderTarget(),bt=i.state.buffers.depth.getReversed(),Pt=X.isInstancedMesh===!0,Lt=X.isBatchedMesh===!0,Zt=!!y.map,ee=!!y.matcap,L=!!U,lt=!!y.aoMap,rt=!!y.lightMap,st=!!y.bumpMap,it=!!y.normalMap,St=!!y.displacementMap,pt=!!y.emissiveMap,xt=!!y.metalnessMap,Ht=!!y.roughnessMap,Bt=y.anisotropy>0,A=y.clearcoat>0,v=y.dispersion>0,W=y.iridescence>0,Q=y.sheen>0,ut=y.transmission>0,tt=Bt&&!!y.anisotropyMap,Dt=A&&!!y.clearcoatMap,D=A&&!!y.clearcoatNormalMap,z=A&&!!y.clearcoatRoughnessMap,k=W&&!!y.iridescenceMap,q=W&&!!y.iridescenceThicknessMap,Z=Q&&!!y.sheenColorMap,Mt=Q&&!!y.sheenRoughnessMap,at=!!y.specularMap,ct=!!y.specularColorMap,At=!!y.specularIntensityMap,B=ut&&!!y.transmissionMap,dt=ut&&!!y.thicknessMap,mt=!!y.gradientMap,wt=!!y.alphaMap,ft=y.alphaTest>0,ot=!!y.alphaHash,Rt=!!y.extensions;let zt=Dn;y.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(zt=i.toneMapping);const le={shaderID:j,shaderType:y.type,shaderName:y.name,vertexShader:yt,fragmentShader:Nt,defines:y.defines,customVertexShaderID:jt,customFragmentShaderID:nt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Lt,batchingColor:Lt&&X._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&X.instanceColor!==null,instancingMorph:Pt&&X.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ht===null?i.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Ui,alphaToCoverage:!!y.alphaToCoverage,map:Zt,matcap:ee,envMap:L,envMapMode:L&&U.mapping,envMapCubeUVHeight:I,aoMap:lt,lightMap:rt,bumpMap:st,normalMap:it,displacementMap:f&&St,emissiveMap:pt,normalMapObjectSpace:it&&y.normalMapType===Bh,normalMapTangentSpace:it&&y.normalMapType===_c,metalnessMap:xt,roughnessMap:Ht,anisotropy:Bt,anisotropyMap:tt,clearcoat:A,clearcoatMap:Dt,clearcoatNormalMap:D,clearcoatRoughnessMap:z,dispersion:v,iridescence:W,iridescenceMap:k,iridescenceThicknessMap:q,sheen:Q,sheenColorMap:Z,sheenRoughnessMap:Mt,specularMap:at,specularColorMap:ct,specularIntensityMap:At,transmission:ut,transmissionMap:B,thicknessMap:dt,gradientMap:mt,opaque:y.transparent===!1&&y.blending===Ci&&y.alphaToCoverage===!1,alphaMap:wt,alphaTest:ft,alphaHash:ot,combine:y.combine,mapUv:Zt&&M(y.map.channel),aoMapUv:lt&&M(y.aoMap.channel),lightMapUv:rt&&M(y.lightMap.channel),bumpMapUv:st&&M(y.bumpMap.channel),normalMapUv:it&&M(y.normalMap.channel),displacementMapUv:St&&M(y.displacementMap.channel),emissiveMapUv:pt&&M(y.emissiveMap.channel),metalnessMapUv:xt&&M(y.metalnessMap.channel),roughnessMapUv:Ht&&M(y.roughnessMap.channel),anisotropyMapUv:tt&&M(y.anisotropyMap.channel),clearcoatMapUv:Dt&&M(y.clearcoatMap.channel),clearcoatNormalMapUv:D&&M(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&M(y.clearcoatRoughnessMap.channel),iridescenceMapUv:k&&M(y.iridescenceMap.channel),iridescenceThicknessMapUv:q&&M(y.iridescenceThicknessMap.channel),sheenColorMapUv:Z&&M(y.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&M(y.sheenRoughnessMap.channel),specularMapUv:at&&M(y.specularMap.channel),specularColorMapUv:ct&&M(y.specularColorMap.channel),specularIntensityMapUv:At&&M(y.specularIntensityMap.channel),transmissionMapUv:B&&M(y.transmissionMap.channel),thicknessMapUv:dt&&M(y.thicknessMap.channel),alphaMapUv:wt&&M(y.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(it||Bt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!Y.attributes.uv&&(Zt||wt),fog:!!G,useFog:y.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:bt,skinning:X.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:vt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:zt,decodeVideoTexture:Zt&&y.map.isVideoTexture===!0&&Qt.getTransfer(y.map.colorSpace)===se,decodeVideoTextureEmissive:pt&&y.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(y.emissiveMap.colorSpace)===se,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===De,flipSided:y.side===Oe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Rt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Rt&&y.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return le.vertexUv1s=c.has(1),le.vertexUv2s=c.has(2),le.vertexUv3s=c.has(3),c.clear(),le}function p(y){const _=[];if(y.shaderID?_.push(y.shaderID):(_.push(y.customVertexShaderID),_.push(y.customFragmentShaderID)),y.defines!==void 0)for(const w in y.defines)_.push(w),_.push(y.defines[w]);return y.isRawShaderMaterial===!1&&(T(_,y),S(_,y),_.push(i.outputColorSpace)),_.push(y.customProgramCacheKey),_.join()}function T(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)}function S(y,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),_.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const _=g[y.type];let w;if(_){const O=on[_];w=Ru.clone(O.uniforms)}else w=y.uniforms;return w}function C(y,_){let w;for(let O=0,X=h.length;O<X;O++){const G=h[O];if(G.cacheKey===_){w=G,++w.usedTimes;break}}return w===void 0&&(w=new O0(i,_,y,r),h.push(w)),w}function R(y){if(--y.usedTimes===0){const _=h.indexOf(y);h[_]=h[h.length-1],h.pop(),y.destroy()}}function P(y){l.remove(y)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:R,releaseShaderCache:P,programs:h,dispose:N}}function V0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function G0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ql(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Yl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,g,M,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:M,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=M,p.group=m),t++,p}function a(u,f,d,g,M,m){const p=o(u,f,d,g,M,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,g,M,m){const p=o(u,f,d,g,M,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||G0),n.length>1&&n.sort(f||ql),s.length>1&&s.sort(f||ql)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function W0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Yl,i.set(n,[o])):s>=r.length?(o=new Yl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function X0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Wt};break;case"SpotLight":e={position:new F,direction:new F,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function q0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Y0=0;function j0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Z0(i){const t=new X0,e=q0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);const s=new F,r=new oe,o=new oe;function a(c){let h=0,u=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,g=0,M=0,m=0,p=0,T=0,S=0,x=0,C=0,R=0,P=0;c.sort(j0);for(let y=0,_=c.length;y<_;y++){const w=c[y],O=w.color,X=w.intensity,G=w.distance,Y=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=O.r*X,u+=O.g*X,f+=O.b*X;else if(w.isLightProbe){for(let b=0;b<9;b++)n.probe[b].addScaledVector(w.sh.coefficients[b],X);P++}else if(w.isDirectionalLight){const b=t.get(w);if(b.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const U=w.shadow,I=e.get(w);I.shadowIntensity=U.intensity,I.shadowBias=U.bias,I.shadowNormalBias=U.normalBias,I.shadowRadius=U.radius,I.shadowMapSize=U.mapSize,n.directionalShadow[d]=I,n.directionalShadowMap[d]=Y,n.directionalShadowMatrix[d]=w.shadow.matrix,T++}n.directional[d]=b,d++}else if(w.isSpotLight){const b=t.get(w);b.position.setFromMatrixPosition(w.matrixWorld),b.color.copy(O).multiplyScalar(X),b.distance=G,b.coneCos=Math.cos(w.angle),b.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),b.decay=w.decay,n.spot[M]=b;const U=w.shadow;if(w.map&&(n.spotLightMap[C]=w.map,C++,U.updateMatrices(w),w.castShadow&&R++),n.spotLightMatrix[M]=U.matrix,w.castShadow){const I=e.get(w);I.shadowIntensity=U.intensity,I.shadowBias=U.bias,I.shadowNormalBias=U.normalBias,I.shadowRadius=U.radius,I.shadowMapSize=U.mapSize,n.spotShadow[M]=I,n.spotShadowMap[M]=Y,x++}M++}else if(w.isRectAreaLight){const b=t.get(w);b.color.copy(O).multiplyScalar(X),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=b,m++}else if(w.isPointLight){const b=t.get(w);if(b.color.copy(w.color).multiplyScalar(w.intensity),b.distance=w.distance,b.decay=w.decay,w.castShadow){const U=w.shadow,I=e.get(w);I.shadowIntensity=U.intensity,I.shadowBias=U.bias,I.shadowNormalBias=U.normalBias,I.shadowRadius=U.radius,I.shadowMapSize=U.mapSize,I.shadowCameraNear=U.camera.near,I.shadowCameraFar=U.camera.far,n.pointShadow[g]=I,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=w.shadow.matrix,S++}n.point[g]=b,g++}else if(w.isHemisphereLight){const b=t.get(w);b.skyColor.copy(w.color).multiplyScalar(X),b.groundColor.copy(w.groundColor).multiplyScalar(X),n.hemi[p]=b,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Et.LTC_FLOAT_1,n.rectAreaLTC2=Et.LTC_FLOAT_2):(n.rectAreaLTC1=Et.LTC_HALF_1,n.rectAreaLTC2=Et.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const N=n.hash;(N.directionalLength!==d||N.pointLength!==g||N.spotLength!==M||N.rectAreaLength!==m||N.hemiLength!==p||N.numDirectionalShadows!==T||N.numPointShadows!==S||N.numSpotShadows!==x||N.numSpotMaps!==C||N.numLightProbes!==P)&&(n.directional.length=d,n.spot.length=M,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+C-R,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=P,N.directionalLength=d,N.pointLength=g,N.spotLength=M,N.rectAreaLength=m,N.hemiLength=p,N.numDirectionalShadows=T,N.numPointShadows=S,N.numSpotShadows=x,N.numSpotMaps=C,N.numLightProbes=P,n.version=Y0++)}function l(c,h){let u=0,f=0,d=0,g=0,M=0;const m=h.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const S=c[p];if(S.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(S.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const x=n.hemi[M];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),M++}}}return{setup:a,setupView:l,state:n}}function jl(i){const t=new Z0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function K0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new jl(i),t.set(s,[a])):r>=o.length?(a=new jl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const $0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,J0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Q0(i,t,e){let n=new da;const s=new gt,r=new gt,o=new ge,a=new yf({depthPacking:Oh}),l=new Sf,c={},h=e.maxTextureSize,u={[In]:Oe,[Oe]:In,[De]:De},f=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:$0,fragmentShader:J0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new pe;g.setAttribute("position",new Ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new ce(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rc;let p=this.type;this.render=function(R,P,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=i.getRenderTarget(),_=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Ln),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const X=p!==xn&&this.type===xn,G=p===xn&&this.type!==xn;for(let Y=0,b=R.length;Y<b;Y++){const U=R[Y],I=U.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;s.copy(I.mapSize);const j=I.getFrameExtents();if(s.multiply(j),r.copy(I.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,I.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,I.mapSize.y=r.y)),I.map===null||X===!0||G===!0){const et=this.type!==xn?{minFilter:We,magFilter:We}:{};I.map!==null&&I.map.dispose(),I.map=new ti(s.x,s.y,et),I.map.texture.name=U.name+".shadowMap",I.camera.updateProjectionMatrix()}i.setRenderTarget(I.map),i.clear();const K=I.getViewportCount();for(let et=0;et<K;et++){const vt=I.getViewport(et);o.set(r.x*vt.x,r.y*vt.y,r.x*vt.z,r.y*vt.w),O.viewport(o),I.updateMatrices(U,et),n=I.getFrustum(),x(P,N,I.camera,U,this.type)}I.isPointLightShadow!==!0&&this.type===xn&&T(I,N),I.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,_,w)};function T(R,P){const N=t.update(M);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new ti(s.x,s.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(P,null,N,f,M,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(P,null,N,d,M,null)}function S(R,P,N,y){let _=null;const w=N.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(w!==void 0)_=w;else if(_=N.isPointLight===!0?l:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=_.uuid,X=P.uuid;let G=c[O];G===void 0&&(G={},c[O]=G);let Y=G[X];Y===void 0&&(Y=_.clone(),G[X]=Y,P.addEventListener("dispose",C)),_=Y}if(_.visible=P.visible,_.wireframe=P.wireframe,y===xn?_.side=P.shadowSide!==null?P.shadowSide:P.side:_.side=P.shadowSide!==null?P.shadowSide:u[P.side],_.alphaMap=P.alphaMap,_.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,_.map=P.map,_.clipShadows=P.clipShadows,_.clippingPlanes=P.clippingPlanes,_.clipIntersection=P.clipIntersection,_.displacementMap=P.displacementMap,_.displacementScale=P.displacementScale,_.displacementBias=P.displacementBias,_.wireframeLinewidth=P.wireframeLinewidth,_.linewidth=P.linewidth,N.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const O=i.properties.get(_);O.light=N}return _}function x(R,P,N,y,_){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&_===xn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,R.matrixWorld);const X=t.update(R),G=R.material;if(Array.isArray(G)){const Y=X.groups;for(let b=0,U=Y.length;b<U;b++){const I=Y[b],j=G[I.materialIndex];if(j&&j.visible){const K=S(R,j,y,_);R.onBeforeShadow(i,R,P,N,X,K,I),i.renderBufferDirect(N,null,X,K,R,I),R.onAfterShadow(i,R,P,N,X,K,I)}}}else if(G.visible){const Y=S(R,G,y,_);R.onBeforeShadow(i,R,P,N,X,Y,null),i.renderBufferDirect(N,null,X,Y,R,null),R.onAfterShadow(i,R,P,N,X,Y,null)}}const O=R.children;for(let X=0,G=O.length;X<G;X++)x(O[X],P,N,y,_)}function C(R){R.target.removeEventListener("dispose",C);for(const N in c){const y=c[N],_=R.target.uuid;_ in y&&(y[_].dispose(),delete y[_])}}}const tg={[ao]:lo,[co]:fo,[ho]:po,[Li]:uo,[lo]:ao,[fo]:co,[po]:ho,[uo]:Li};function eg(i,t){function e(){let B=!1;const dt=new ge;let mt=null;const wt=new ge(0,0,0,0);return{setMask:function(ft){mt!==ft&&!B&&(i.colorMask(ft,ft,ft,ft),mt=ft)},setLocked:function(ft){B=ft},setClear:function(ft,ot,Rt,zt,le){le===!0&&(ft*=zt,ot*=zt,Rt*=zt),dt.set(ft,ot,Rt,zt),wt.equals(dt)===!1&&(i.clearColor(ft,ot,Rt,zt),wt.copy(dt))},reset:function(){B=!1,mt=null,wt.set(-1,0,0,0)}}}function n(){let B=!1,dt=!1,mt=null,wt=null,ft=null;return{setReversed:function(ot){if(dt!==ot){const Rt=t.get("EXT_clip_control");ot?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),dt=ot;const zt=ft;ft=null,this.setClear(zt)}},getReversed:function(){return dt},setTest:function(ot){ot?ht(i.DEPTH_TEST):bt(i.DEPTH_TEST)},setMask:function(ot){mt!==ot&&!B&&(i.depthMask(ot),mt=ot)},setFunc:function(ot){if(dt&&(ot=tg[ot]),wt!==ot){switch(ot){case ao:i.depthFunc(i.NEVER);break;case lo:i.depthFunc(i.ALWAYS);break;case co:i.depthFunc(i.LESS);break;case Li:i.depthFunc(i.LEQUAL);break;case ho:i.depthFunc(i.EQUAL);break;case uo:i.depthFunc(i.GEQUAL);break;case fo:i.depthFunc(i.GREATER);break;case po:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}wt=ot}},setLocked:function(ot){B=ot},setClear:function(ot){ft!==ot&&(dt&&(ot=1-ot),i.clearDepth(ot),ft=ot)},reset:function(){B=!1,mt=null,wt=null,ft=null,dt=!1}}}function s(){let B=!1,dt=null,mt=null,wt=null,ft=null,ot=null,Rt=null,zt=null,le=null;return{setTest:function(te){B||(te?ht(i.STENCIL_TEST):bt(i.STENCIL_TEST))},setMask:function(te){dt!==te&&!B&&(i.stencilMask(te),dt=te)},setFunc:function(te,dn,sn){(mt!==te||wt!==dn||ft!==sn)&&(i.stencilFunc(te,dn,sn),mt=te,wt=dn,ft=sn)},setOp:function(te,dn,sn){(ot!==te||Rt!==dn||zt!==sn)&&(i.stencilOp(te,dn,sn),ot=te,Rt=dn,zt=sn)},setLocked:function(te){B=te},setClear:function(te){le!==te&&(i.clearStencil(te),le=te)},reset:function(){B=!1,dt=null,mt=null,wt=null,ft=null,ot=null,Rt=null,zt=null,le=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,M=!1,m=null,p=null,T=null,S=null,x=null,C=null,R=null,P=new Wt(0,0,0),N=0,y=!1,_=null,w=null,O=null,X=null,G=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let b=!1,U=0;const I=i.getParameter(i.VERSION);I.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(I)[1]),b=U>=1):I.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),b=U>=2);let j=null,K={};const et=i.getParameter(i.SCISSOR_BOX),vt=i.getParameter(i.VIEWPORT),yt=new ge().fromArray(et),Nt=new ge().fromArray(vt);function jt(B,dt,mt,wt){const ft=new Uint8Array(4),ot=i.createTexture();i.bindTexture(B,ot),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Rt=0;Rt<mt;Rt++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,wt,0,i.RGBA,i.UNSIGNED_BYTE,ft):i.texImage2D(dt+Rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ft);return ot}const nt={};nt[i.TEXTURE_2D]=jt(i.TEXTURE_2D,i.TEXTURE_2D,1),nt[i.TEXTURE_CUBE_MAP]=jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[i.TEXTURE_2D_ARRAY]=jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),nt[i.TEXTURE_3D]=jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(i.DEPTH_TEST),o.setFunc(Li),st(!1),it(Ba),ht(i.CULL_FACE),lt(Ln);function ht(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function bt(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function Pt(B,dt){return u[B]!==dt?(i.bindFramebuffer(B,dt),u[B]=dt,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=dt),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function Lt(B,dt){let mt=d,wt=!1;if(B){mt=f.get(dt),mt===void 0&&(mt=[],f.set(dt,mt));const ft=B.textures;if(mt.length!==ft.length||mt[0]!==i.COLOR_ATTACHMENT0){for(let ot=0,Rt=ft.length;ot<Rt;ot++)mt[ot]=i.COLOR_ATTACHMENT0+ot;mt.length=ft.length,wt=!0}}else mt[0]!==i.BACK&&(mt[0]=i.BACK,wt=!0);wt&&i.drawBuffers(mt)}function Zt(B){return g!==B?(i.useProgram(B),g=B,!0):!1}const ee={[qn]:i.FUNC_ADD,[hh]:i.FUNC_SUBTRACT,[uh]:i.FUNC_REVERSE_SUBTRACT};ee[fh]=i.MIN,ee[dh]=i.MAX;const L={[ph]:i.ZERO,[mh]:i.ONE,[gh]:i.SRC_COLOR,[ro]:i.SRC_ALPHA,[Sh]:i.SRC_ALPHA_SATURATE,[Mh]:i.DST_COLOR,[vh]:i.DST_ALPHA,[_h]:i.ONE_MINUS_SRC_COLOR,[oo]:i.ONE_MINUS_SRC_ALPHA,[yh]:i.ONE_MINUS_DST_COLOR,[xh]:i.ONE_MINUS_DST_ALPHA,[Eh]:i.CONSTANT_COLOR,[bh]:i.ONE_MINUS_CONSTANT_COLOR,[Th]:i.CONSTANT_ALPHA,[wh]:i.ONE_MINUS_CONSTANT_ALPHA};function lt(B,dt,mt,wt,ft,ot,Rt,zt,le,te){if(B===Ln){M===!0&&(bt(i.BLEND),M=!1);return}if(M===!1&&(ht(i.BLEND),M=!0),B!==ch){if(B!==m||te!==y){if((p!==qn||x!==qn)&&(i.blendEquation(i.FUNC_ADD),p=qn,x=qn),te)switch(B){case Ci:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case za:i.blendFunc(i.ONE,i.ONE);break;case Ha:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ka:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Ci:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case za:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ha:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ka:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}T=null,S=null,C=null,R=null,P.set(0,0,0),N=0,m=B,y=te}return}ft=ft||dt,ot=ot||mt,Rt=Rt||wt,(dt!==p||ft!==x)&&(i.blendEquationSeparate(ee[dt],ee[ft]),p=dt,x=ft),(mt!==T||wt!==S||ot!==C||Rt!==R)&&(i.blendFuncSeparate(L[mt],L[wt],L[ot],L[Rt]),T=mt,S=wt,C=ot,R=Rt),(zt.equals(P)===!1||le!==N)&&(i.blendColor(zt.r,zt.g,zt.b,le),P.copy(zt),N=le),m=B,y=!1}function rt(B,dt){B.side===De?bt(i.CULL_FACE):ht(i.CULL_FACE);let mt=B.side===Oe;dt&&(mt=!mt),st(mt),B.blending===Ci&&B.transparent===!1?lt(Ln):lt(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const wt=B.stencilWrite;a.setTest(wt),wt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),pt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(B){_!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),_=B)}function it(B){B!==ah?(ht(i.CULL_FACE),B!==w&&(B===Ba?i.cullFace(i.BACK):B===lh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):bt(i.CULL_FACE),w=B}function St(B){B!==O&&(b&&i.lineWidth(B),O=B)}function pt(B,dt,mt){B?(ht(i.POLYGON_OFFSET_FILL),(X!==dt||G!==mt)&&(i.polygonOffset(dt,mt),X=dt,G=mt)):bt(i.POLYGON_OFFSET_FILL)}function xt(B){B?ht(i.SCISSOR_TEST):bt(i.SCISSOR_TEST)}function Ht(B){B===void 0&&(B=i.TEXTURE0+Y-1),j!==B&&(i.activeTexture(B),j=B)}function Bt(B,dt,mt){mt===void 0&&(j===null?mt=i.TEXTURE0+Y-1:mt=j);let wt=K[mt];wt===void 0&&(wt={type:void 0,texture:void 0},K[mt]=wt),(wt.type!==B||wt.texture!==dt)&&(j!==mt&&(i.activeTexture(mt),j=mt),i.bindTexture(B,dt||nt[B]),wt.type=B,wt.texture=dt)}function A(){const B=K[j];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Q(){try{i.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ut(){try{i.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function tt(){try{i.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Dt(){try{i.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function D(){try{i.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function z(){try{i.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function k(){try{i.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function q(){try{i.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Z(B){yt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),yt.copy(B))}function Mt(B){Nt.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),Nt.copy(B))}function at(B,dt){let mt=c.get(dt);mt===void 0&&(mt=new WeakMap,c.set(dt,mt));let wt=mt.get(B);wt===void 0&&(wt=i.getUniformBlockIndex(dt,B.name),mt.set(B,wt))}function ct(B,dt){const wt=c.get(dt).get(B);l.get(dt)!==wt&&(i.uniformBlockBinding(dt,wt,B.__bindingPointIndex),l.set(dt,wt))}function At(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},j=null,K={},u={},f=new WeakMap,d=[],g=null,M=!1,m=null,p=null,T=null,S=null,x=null,C=null,R=null,P=new Wt(0,0,0),N=0,y=!1,_=null,w=null,O=null,X=null,G=null,yt.set(0,0,i.canvas.width,i.canvas.height),Nt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ht,disable:bt,bindFramebuffer:Pt,drawBuffers:Lt,useProgram:Zt,setBlending:lt,setMaterial:rt,setFlipSided:st,setCullFace:it,setLineWidth:St,setPolygonOffset:pt,setScissorTest:xt,activeTexture:Ht,bindTexture:Bt,unbindTexture:A,compressedTexImage2D:v,compressedTexImage3D:W,texImage2D:k,texImage3D:q,updateUBOMapping:at,uniformBlockBinding:ct,texStorage2D:D,texStorage3D:z,texSubImage2D:Q,texSubImage3D:ut,compressedTexSubImage2D:tt,compressedTexSubImage3D:Dt,scissor:Z,viewport:Mt,reset:At}}function ng(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,v){return d?new OffscreenCanvas(A,v):fr("canvas")}function M(A,v,W){let Q=1;const ut=Bt(A);if((ut.width>W||ut.height>W)&&(Q=W/Math.max(ut.width,ut.height)),Q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const tt=Math.floor(Q*ut.width),Dt=Math.floor(Q*ut.height);u===void 0&&(u=g(tt,Dt));const D=v?g(tt,Dt):u;return D.width=tt,D.height=Dt,D.getContext("2d").drawImage(A,0,0,tt,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ut.width+"x"+ut.height+") to ("+tt+"x"+Dt+")."),D}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ut.width+"x"+ut.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(A,v,W,Q,ut=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let tt=v;if(v===i.RED&&(W===i.FLOAT&&(tt=i.R32F),W===i.HALF_FLOAT&&(tt=i.R16F),W===i.UNSIGNED_BYTE&&(tt=i.R8)),v===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(tt=i.R8UI),W===i.UNSIGNED_SHORT&&(tt=i.R16UI),W===i.UNSIGNED_INT&&(tt=i.R32UI),W===i.BYTE&&(tt=i.R8I),W===i.SHORT&&(tt=i.R16I),W===i.INT&&(tt=i.R32I)),v===i.RG&&(W===i.FLOAT&&(tt=i.RG32F),W===i.HALF_FLOAT&&(tt=i.RG16F),W===i.UNSIGNED_BYTE&&(tt=i.RG8)),v===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(tt=i.RG8UI),W===i.UNSIGNED_SHORT&&(tt=i.RG16UI),W===i.UNSIGNED_INT&&(tt=i.RG32UI),W===i.BYTE&&(tt=i.RG8I),W===i.SHORT&&(tt=i.RG16I),W===i.INT&&(tt=i.RG32I)),v===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(tt=i.RGB8UI),W===i.UNSIGNED_SHORT&&(tt=i.RGB16UI),W===i.UNSIGNED_INT&&(tt=i.RGB32UI),W===i.BYTE&&(tt=i.RGB8I),W===i.SHORT&&(tt=i.RGB16I),W===i.INT&&(tt=i.RGB32I)),v===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(tt=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(tt=i.RGBA16UI),W===i.UNSIGNED_INT&&(tt=i.RGBA32UI),W===i.BYTE&&(tt=i.RGBA8I),W===i.SHORT&&(tt=i.RGBA16I),W===i.INT&&(tt=i.RGBA32I)),v===i.RGB&&(W===i.UNSIGNED_INT_5_9_9_9_REV&&(tt=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(tt=i.R11F_G11F_B10F)),v===i.RGBA){const Dt=ut?hr:Qt.getTransfer(Q);W===i.FLOAT&&(tt=i.RGBA32F),W===i.HALF_FLOAT&&(tt=i.RGBA16F),W===i.UNSIGNED_BYTE&&(tt=Dt===se?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(tt=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(tt=i.RGB5_A1)}return(tt===i.R16F||tt===i.R32F||tt===i.RG16F||tt===i.RG32F||tt===i.RGBA16F||tt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function x(A,v){let W;return A?v===null||v===Jn||v===hs?W=i.DEPTH24_STENCIL8:v===ln?W=i.DEPTH32F_STENCIL8:v===cs&&(W=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Jn||v===hs?W=i.DEPTH_COMPONENT24:v===ln?W=i.DEPTH_COMPONENT32F:v===cs&&(W=i.DEPTH_COMPONENT16),W}function C(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==We&&A.minFilter!==an?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function R(A){const v=A.target;v.removeEventListener("dispose",R),N(v),v.isVideoTexture&&h.delete(v)}function P(A){const v=A.target;v.removeEventListener("dispose",P),_(v)}function N(A){const v=n.get(A);if(v.__webglInit===void 0)return;const W=A.source,Q=f.get(W);if(Q){const ut=Q[v.__cacheKey];ut.usedTimes--,ut.usedTimes===0&&y(A),Object.keys(Q).length===0&&f.delete(W)}n.remove(A)}function y(A){const v=n.get(A);i.deleteTexture(v.__webglTexture);const W=A.source,Q=f.get(W);delete Q[v.__cacheKey],o.memory.textures--}function _(A){const v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(v.__webglFramebuffer[Q]))for(let ut=0;ut<v.__webglFramebuffer[Q].length;ut++)i.deleteFramebuffer(v.__webglFramebuffer[Q][ut]);else i.deleteFramebuffer(v.__webglFramebuffer[Q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Q])}else{if(Array.isArray(v.__webglFramebuffer))for(let Q=0;Q<v.__webglFramebuffer.length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[Q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Q=0;Q<v.__webglColorRenderbuffer.length;Q++)v.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const W=A.textures;for(let Q=0,ut=W.length;Q<ut;Q++){const tt=n.get(W[Q]);tt.__webglTexture&&(i.deleteTexture(tt.__webglTexture),o.memory.textures--),n.remove(W[Q])}n.remove(A)}let w=0;function O(){w=0}function X(){const A=w;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),w+=1,A}function G(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function Y(A,v){const W=n.get(A);if(A.isVideoTexture&&xt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&W.__version!==A.version){const Q=A.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{nt(W,A,v);return}}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+v)}function b(A,v){const W=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){nt(W,A,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+v)}function U(A,v){const W=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){nt(W,A,v);return}e.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+v)}function I(A,v){const W=n.get(A);if(A.version>0&&W.__version!==A.version){ht(W,A,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+v)}const j={[_o]:i.REPEAT,[jn]:i.CLAMP_TO_EDGE,[vo]:i.MIRRORED_REPEAT},K={[We]:i.NEAREST,[Nh]:i.NEAREST_MIPMAP_NEAREST,[Rs]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[Er]:i.LINEAR_MIPMAP_NEAREST,[Zn]:i.LINEAR_MIPMAP_LINEAR},et={[zh]:i.NEVER,[Xh]:i.ALWAYS,[Hh]:i.LESS,[vc]:i.LEQUAL,[kh]:i.EQUAL,[Wh]:i.GEQUAL,[Vh]:i.GREATER,[Gh]:i.NOTEQUAL};function vt(A,v){if(v.type===ln&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===an||v.magFilter===Er||v.magFilter===Rs||v.magFilter===Zn||v.minFilter===an||v.minFilter===Er||v.minFilter===Rs||v.minFilter===Zn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,j[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,j[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,j[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,K[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,K[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,et[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===We||v.minFilter!==Rs&&v.minFilter!==Zn||v.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function yt(A,v){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",R));const Q=v.source;let ut=f.get(Q);ut===void 0&&(ut={},f.set(Q,ut));const tt=G(v);if(tt!==A.__cacheKey){ut[tt]===void 0&&(ut[tt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ut[tt].usedTimes++;const Dt=ut[A.__cacheKey];Dt!==void 0&&(ut[A.__cacheKey].usedTimes--,Dt.usedTimes===0&&y(v)),A.__cacheKey=tt,A.__webglTexture=ut[tt].texture}return W}function Nt(A,v,W){return Math.floor(Math.floor(A/W)/v)}function jt(A,v,W,Q){const tt=A.updateRanges;if(tt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,W,Q,v.data);else{tt.sort((q,Z)=>q.start-Z.start);let Dt=0;for(let q=1;q<tt.length;q++){const Z=tt[Dt],Mt=tt[q],at=Z.start+Z.count,ct=Nt(Mt.start,v.width,4),At=Nt(Z.start,v.width,4);Mt.start<=at+1&&ct===At&&Nt(Mt.start+Mt.count-1,v.width,4)===ct?Z.count=Math.max(Z.count,Mt.start+Mt.count-Z.start):(++Dt,tt[Dt]=Mt)}tt.length=Dt+1;const D=i.getParameter(i.UNPACK_ROW_LENGTH),z=i.getParameter(i.UNPACK_SKIP_PIXELS),k=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let q=0,Z=tt.length;q<Z;q++){const Mt=tt[q],at=Math.floor(Mt.start/4),ct=Math.ceil(Mt.count/4),At=at%v.width,B=Math.floor(at/v.width),dt=ct,mt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,At),i.pixelStorei(i.UNPACK_SKIP_ROWS,B),e.texSubImage2D(i.TEXTURE_2D,0,At,B,dt,mt,W,Q,v.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,D),i.pixelStorei(i.UNPACK_SKIP_PIXELS,z),i.pixelStorei(i.UNPACK_SKIP_ROWS,k)}}function nt(A,v,W){let Q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Q=i.TEXTURE_3D);const ut=yt(A,v),tt=v.source;e.bindTexture(Q,A.__webglTexture,i.TEXTURE0+W);const Dt=n.get(tt);if(tt.version!==Dt.__version||ut===!0){e.activeTexture(i.TEXTURE0+W);const D=Qt.getPrimaries(Qt.workingColorSpace),z=v.colorSpace===Pn?null:Qt.getPrimaries(v.colorSpace),k=v.colorSpace===Pn||D===z?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,k);let q=M(v.image,!1,s.maxTextureSize);q=Ht(v,q);const Z=r.convert(v.format,v.colorSpace),Mt=r.convert(v.type);let at=S(v.internalFormat,Z,Mt,v.colorSpace,v.isVideoTexture);vt(Q,v);let ct;const At=v.mipmaps,B=v.isVideoTexture!==!0,dt=Dt.__version===void 0||ut===!0,mt=tt.dataReady,wt=C(v,q);if(v.isDepthTexture)at=x(v.format===fs,v.type),dt&&(B?e.texStorage2D(i.TEXTURE_2D,1,at,q.width,q.height):e.texImage2D(i.TEXTURE_2D,0,at,q.width,q.height,0,Z,Mt,null));else if(v.isDataTexture)if(At.length>0){B&&dt&&e.texStorage2D(i.TEXTURE_2D,wt,at,At[0].width,At[0].height);for(let ft=0,ot=At.length;ft<ot;ft++)ct=At[ft],B?mt&&e.texSubImage2D(i.TEXTURE_2D,ft,0,0,ct.width,ct.height,Z,Mt,ct.data):e.texImage2D(i.TEXTURE_2D,ft,at,ct.width,ct.height,0,Z,Mt,ct.data);v.generateMipmaps=!1}else B?(dt&&e.texStorage2D(i.TEXTURE_2D,wt,at,q.width,q.height),mt&&jt(v,q,Z,Mt)):e.texImage2D(i.TEXTURE_2D,0,at,q.width,q.height,0,Z,Mt,q.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){B&&dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,at,At[0].width,At[0].height,q.depth);for(let ft=0,ot=At.length;ft<ot;ft++)if(ct=At[ft],v.format!==nn)if(Z!==null)if(B){if(mt)if(v.layerUpdates.size>0){const Rt=bl(ct.width,ct.height,v.format,v.type);for(const zt of v.layerUpdates){const le=ct.data.subarray(zt*Rt/ct.data.BYTES_PER_ELEMENT,(zt+1)*Rt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ft,0,0,zt,ct.width,ct.height,1,Z,le)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ft,0,0,0,ct.width,ct.height,q.depth,Z,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ft,at,ct.width,ct.height,q.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else B?mt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ft,0,0,0,ct.width,ct.height,q.depth,Z,Mt,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ft,at,ct.width,ct.height,q.depth,0,Z,Mt,ct.data)}else{B&&dt&&e.texStorage2D(i.TEXTURE_2D,wt,at,At[0].width,At[0].height);for(let ft=0,ot=At.length;ft<ot;ft++)ct=At[ft],v.format!==nn?Z!==null?B?mt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ft,0,0,ct.width,ct.height,Z,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,ft,at,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?mt&&e.texSubImage2D(i.TEXTURE_2D,ft,0,0,ct.width,ct.height,Z,Mt,ct.data):e.texImage2D(i.TEXTURE_2D,ft,at,ct.width,ct.height,0,Z,Mt,ct.data)}else if(v.isDataArrayTexture)if(B){if(dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,at,q.width,q.height,q.depth),mt)if(v.layerUpdates.size>0){const ft=bl(q.width,q.height,v.format,v.type);for(const ot of v.layerUpdates){const Rt=q.data.subarray(ot*ft/q.data.BYTES_PER_ELEMENT,(ot+1)*ft/q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ot,q.width,q.height,1,Z,Mt,Rt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,Z,Mt,q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,at,q.width,q.height,q.depth,0,Z,Mt,q.data);else if(v.isData3DTexture)B?(dt&&e.texStorage3D(i.TEXTURE_3D,wt,at,q.width,q.height,q.depth),mt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,Z,Mt,q.data)):e.texImage3D(i.TEXTURE_3D,0,at,q.width,q.height,q.depth,0,Z,Mt,q.data);else if(v.isFramebufferTexture){if(dt)if(B)e.texStorage2D(i.TEXTURE_2D,wt,at,q.width,q.height);else{let ft=q.width,ot=q.height;for(let Rt=0;Rt<wt;Rt++)e.texImage2D(i.TEXTURE_2D,Rt,at,ft,ot,0,Z,Mt,null),ft>>=1,ot>>=1}}else if(At.length>0){if(B&&dt){const ft=Bt(At[0]);e.texStorage2D(i.TEXTURE_2D,wt,at,ft.width,ft.height)}for(let ft=0,ot=At.length;ft<ot;ft++)ct=At[ft],B?mt&&e.texSubImage2D(i.TEXTURE_2D,ft,0,0,Z,Mt,ct):e.texImage2D(i.TEXTURE_2D,ft,at,Z,Mt,ct);v.generateMipmaps=!1}else if(B){if(dt){const ft=Bt(q);e.texStorage2D(i.TEXTURE_2D,wt,at,ft.width,ft.height)}mt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Z,Mt,q)}else e.texImage2D(i.TEXTURE_2D,0,at,Z,Mt,q);m(v)&&p(Q),Dt.__version=tt.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function ht(A,v,W){if(v.image.length!==6)return;const Q=yt(A,v),ut=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+W);const tt=n.get(ut);if(ut.version!==tt.__version||Q===!0){e.activeTexture(i.TEXTURE0+W);const Dt=Qt.getPrimaries(Qt.workingColorSpace),D=v.colorSpace===Pn?null:Qt.getPrimaries(v.colorSpace),z=v.colorSpace===Pn||Dt===D?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,z);const k=v.isCompressedTexture||v.image[0].isCompressedTexture,q=v.image[0]&&v.image[0].isDataTexture,Z=[];for(let ot=0;ot<6;ot++)!k&&!q?Z[ot]=M(v.image[ot],!0,s.maxCubemapSize):Z[ot]=q?v.image[ot].image:v.image[ot],Z[ot]=Ht(v,Z[ot]);const Mt=Z[0],at=r.convert(v.format,v.colorSpace),ct=r.convert(v.type),At=S(v.internalFormat,at,ct,v.colorSpace),B=v.isVideoTexture!==!0,dt=tt.__version===void 0||Q===!0,mt=ut.dataReady;let wt=C(v,Mt);vt(i.TEXTURE_CUBE_MAP,v);let ft;if(k){B&&dt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,At,Mt.width,Mt.height);for(let ot=0;ot<6;ot++){ft=Z[ot].mipmaps;for(let Rt=0;Rt<ft.length;Rt++){const zt=ft[Rt];v.format!==nn?at!==null?B?mt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,0,0,zt.width,zt.height,at,zt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,At,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,0,0,zt.width,zt.height,at,ct,zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt,At,zt.width,zt.height,0,at,ct,zt.data)}}}else{if(ft=v.mipmaps,B&&dt){ft.length>0&&wt++;const ot=Bt(Z[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,At,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(q){B?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Z[ot].width,Z[ot].height,at,ct,Z[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,At,Z[ot].width,Z[ot].height,0,at,ct,Z[ot].data);for(let Rt=0;Rt<ft.length;Rt++){const le=ft[Rt].image[ot].image;B?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,0,0,le.width,le.height,at,ct,le.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,At,le.width,le.height,0,at,ct,le.data)}}else{B?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,at,ct,Z[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,At,at,ct,Z[ot]);for(let Rt=0;Rt<ft.length;Rt++){const zt=ft[Rt];B?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,0,0,at,ct,zt.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Rt+1,At,at,ct,zt.image[ot])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),tt.__version=ut.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function bt(A,v,W,Q,ut,tt){const Dt=r.convert(W.format,W.colorSpace),D=r.convert(W.type),z=S(W.internalFormat,Dt,D,W.colorSpace),k=n.get(v),q=n.get(W);if(q.__renderTarget=v,!k.__hasExternalTextures){const Z=Math.max(1,v.width>>tt),Mt=Math.max(1,v.height>>tt);ut===i.TEXTURE_3D||ut===i.TEXTURE_2D_ARRAY?e.texImage3D(ut,tt,z,Z,Mt,v.depth,0,Dt,D,null):e.texImage2D(ut,tt,z,Z,Mt,0,Dt,D,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),pt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,ut,q.__webglTexture,0,St(v)):(ut===i.TEXTURE_2D||ut>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ut<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,ut,q.__webglTexture,tt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(A,v,W){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){const Q=v.depthTexture,ut=Q&&Q.isDepthTexture?Q.type:null,tt=x(v.stencilBuffer,ut),Dt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,D=St(v);pt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,D,tt,v.width,v.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,D,tt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,tt,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Dt,i.RENDERBUFFER,A)}else{const Q=v.textures;for(let ut=0;ut<Q.length;ut++){const tt=Q[ut],Dt=r.convert(tt.format,tt.colorSpace),D=r.convert(tt.type),z=S(tt.internalFormat,Dt,D,tt.colorSpace),k=St(v);W&&pt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,k,z,v.width,v.height):pt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,k,z,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,z,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Lt(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(v.depthTexture);Q.__renderTarget=v,(!Q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Y(v.depthTexture,0);const ut=Q.__webglTexture,tt=St(v);if(v.depthTexture.format===us)pt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ut,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ut,0);else if(v.depthTexture.format===fs)pt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ut,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ut,0);else throw new Error("Unknown depthTexture format")}function Zt(A){const v=n.get(A),W=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const Q=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Q){const ut=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Q.removeEventListener("dispose",ut)};Q.addEventListener("dispose",ut),v.__depthDisposeCallback=ut}v.__boundDepthTexture=Q}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const Q=A.texture.mipmaps;Q&&Q.length>0?Lt(v.__webglFramebuffer[0],A):Lt(v.__webglFramebuffer,A)}else if(W){v.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Q]),v.__webglDepthbuffer[Q]===void 0)v.__webglDepthbuffer[Q]=i.createRenderbuffer(),Pt(v.__webglDepthbuffer[Q],A,!1);else{const ut=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=v.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,tt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,tt)}}else{const Q=A.texture.mipmaps;if(Q&&Q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Pt(v.__webglDepthbuffer,A,!1);else{const ut=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,tt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,tt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(A,v,W){const Q=n.get(A);v!==void 0&&bt(Q.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Zt(A)}function L(A){const v=A.texture,W=n.get(A),Q=n.get(v);A.addEventListener("dispose",P);const ut=A.textures,tt=A.isWebGLCubeRenderTarget===!0,Dt=ut.length>1;if(Dt||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=v.version,o.memory.textures++),tt){W.__webglFramebuffer=[];for(let D=0;D<6;D++)if(v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer[D]=[];for(let z=0;z<v.mipmaps.length;z++)W.__webglFramebuffer[D][z]=i.createFramebuffer()}else W.__webglFramebuffer[D]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer=[];for(let D=0;D<v.mipmaps.length;D++)W.__webglFramebuffer[D]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Dt)for(let D=0,z=ut.length;D<z;D++){const k=n.get(ut[D]);k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&pt(A)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let D=0;D<ut.length;D++){const z=ut[D];W.__webglColorRenderbuffer[D]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[D]);const k=r.convert(z.format,z.colorSpace),q=r.convert(z.type),Z=S(z.internalFormat,k,q,z.colorSpace,A.isXRRenderTarget===!0),Mt=St(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,Z,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+D,i.RENDERBUFFER,W.__webglColorRenderbuffer[D])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),Pt(W.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(tt){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),vt(i.TEXTURE_CUBE_MAP,v);for(let D=0;D<6;D++)if(v.mipmaps&&v.mipmaps.length>0)for(let z=0;z<v.mipmaps.length;z++)bt(W.__webglFramebuffer[D][z],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+D,z);else bt(W.__webglFramebuffer[D],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+D,0);m(v)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let D=0,z=ut.length;D<z;D++){const k=ut[D],q=n.get(k);let Z=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Z=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,q.__webglTexture),vt(Z,k),bt(W.__webglFramebuffer,A,k,i.COLOR_ATTACHMENT0+D,Z,0),m(k)&&p(Z)}e.unbindTexture()}else{let D=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(D=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(D,Q.__webglTexture),vt(D,v),v.mipmaps&&v.mipmaps.length>0)for(let z=0;z<v.mipmaps.length;z++)bt(W.__webglFramebuffer[z],A,v,i.COLOR_ATTACHMENT0,D,z);else bt(W.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,D,0);m(v)&&p(D),e.unbindTexture()}A.depthBuffer&&Zt(A)}function lt(A){const v=A.textures;for(let W=0,Q=v.length;W<Q;W++){const ut=v[W];if(m(ut)){const tt=T(A),Dt=n.get(ut).__webglTexture;e.bindTexture(tt,Dt),p(tt),e.unbindTexture()}}}const rt=[],st=[];function it(A){if(A.samples>0){if(pt(A)===!1){const v=A.textures,W=A.width,Q=A.height;let ut=i.COLOR_BUFFER_BIT;const tt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Dt=n.get(A),D=v.length>1;if(D)for(let k=0;k<v.length;k++)e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer);const z=A.texture.mipmaps;z&&z.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let k=0;k<v.length;k++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ut|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ut|=i.STENCIL_BUFFER_BIT)),D){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Dt.__webglColorRenderbuffer[k]);const q=n.get(v[k]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,q,0)}i.blitFramebuffer(0,0,W,Q,0,0,W,Q,ut,i.NEAREST),l===!0&&(rt.length=0,st.length=0,rt.push(i.COLOR_ATTACHMENT0+k),A.depthBuffer&&A.resolveDepthBuffer===!1&&(rt.push(tt),st.push(tt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,st)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),D)for(let k=0;k<v.length;k++){e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.RENDERBUFFER,Dt.__webglColorRenderbuffer[k]);const q=n.get(v[k]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.TEXTURE_2D,q,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function St(A){return Math.min(s.maxSamples,A.samples)}function pt(A){const v=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function xt(A){const v=o.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function Ht(A,v){const W=A.colorSpace,Q=A.format,ut=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||W!==Ui&&W!==Pn&&(Qt.getTransfer(W)===se?(Q!==nn||ut!==hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),v}function Bt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=b,this.setTexture3D=U,this.setTextureCube=I,this.rebindTextures=ee,this.setupRenderTarget=L,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=pt}function ig(i,t){function e(n,s=Pn){let r;const o=Qt.getTransfer(s);if(n===hn)return i.UNSIGNED_BYTE;if(n===na)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===fc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===dc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===hc)return i.BYTE;if(n===uc)return i.SHORT;if(n===cs)return i.UNSIGNED_SHORT;if(n===ea)return i.INT;if(n===Jn)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===Ss)return i.HALF_FLOAT;if(n===pc)return i.ALPHA;if(n===mc)return i.RGB;if(n===nn)return i.RGBA;if(n===us)return i.DEPTH_COMPONENT;if(n===fs)return i.DEPTH_STENCIL;if(n===sa)return i.RED;if(n===ra)return i.RED_INTEGER;if(n===gc)return i.RG;if(n===oa)return i.RG_INTEGER;if(n===aa)return i.RGBA_INTEGER;if(n===nr||n===ir||n===sr||n===rr)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===nr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===nr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xo||n===Mo||n===yo||n===So)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Mo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Eo||n===bo||n===To)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Eo||n===bo)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===To)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wo||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===zo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ao)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ro)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Co)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Po)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Lo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Do)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Io)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Uo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===No)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Bo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===zo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ho||n===ko||n===Vo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ho)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ko)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Vo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Go||n===Wo||n===Xo||n===qo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Xo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===hs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const sg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class og{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Cc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Un({vertexShader:sg,fragmentShader:rg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ce(new ni(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ag extends ii{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const M=typeof XRWebGLBinding<"u",m=new og,p={},T=e.getContextAttributes();let S=null,x=null;const C=[],R=[],P=new gt;let N=null;const y=new je;y.viewport=new ge;const _=new je;_.viewport=new ge;const w=[y,_],O=new wf;let X=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let ht=C[nt];return ht===void 0&&(ht=new Wr,C[nt]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(nt){let ht=C[nt];return ht===void 0&&(ht=new Wr,C[nt]=ht),ht.getGripSpace()},this.getHand=function(nt){let ht=C[nt];return ht===void 0&&(ht=new Wr,C[nt]=ht),ht.getHandSpace()};function Y(nt){const ht=R.indexOf(nt.inputSource);if(ht===-1)return;const bt=C[ht];bt!==void 0&&(bt.update(nt.inputSource,nt.frame,c||o),bt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function b(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",b),s.removeEventListener("inputsourceschange",U);for(let nt=0;nt<C.length;nt++){const ht=R[nt];ht!==null&&(R[nt]=null,C[nt].disconnect(ht))}X=null,G=null,m.reset();for(const nt in p)delete p[nt];t.setRenderTarget(S),d=null,f=null,u=null,s=null,x=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(N),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){r=nt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){a=nt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(nt){c=nt},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(nt){if(s=nt,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",b),s.addEventListener("inputsourceschange",U),T.xrCompatible!==!0&&await e.makeXRCompatible(),N=t.getPixelRatio(),t.getSize(P),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Pt=null,Lt=null;T.depth&&(Lt=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=T.stencil?fs:us,Pt=T.stencil?hs:Jn);const Zt={colorFormat:e.RGBA8,depthFormat:Lt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Zt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new ti(f.textureWidth,f.textureHeight,{format:nn,type:hn,depthTexture:new Rc(f.textureWidth,f.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const bt={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,bt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new ti(d.framebufferWidth,d.framebufferHeight,{format:nn,type:hn,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),jt.setContext(s),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(nt){for(let ht=0;ht<nt.removed.length;ht++){const bt=nt.removed[ht],Pt=R.indexOf(bt);Pt>=0&&(R[Pt]=null,C[Pt].disconnect(bt))}for(let ht=0;ht<nt.added.length;ht++){const bt=nt.added[ht];let Pt=R.indexOf(bt);if(Pt===-1){for(let Zt=0;Zt<C.length;Zt++)if(Zt>=R.length){R.push(bt),Pt=Zt;break}else if(R[Zt]===null){R[Zt]=bt,Pt=Zt;break}if(Pt===-1)break}const Lt=C[Pt];Lt&&Lt.connect(bt)}}const I=new F,j=new F;function K(nt,ht,bt){I.setFromMatrixPosition(ht.matrixWorld),j.setFromMatrixPosition(bt.matrixWorld);const Pt=I.distanceTo(j),Lt=ht.projectionMatrix.elements,Zt=bt.projectionMatrix.elements,ee=Lt[14]/(Lt[10]-1),L=Lt[14]/(Lt[10]+1),lt=(Lt[9]+1)/Lt[5],rt=(Lt[9]-1)/Lt[5],st=(Lt[8]-1)/Lt[0],it=(Zt[8]+1)/Zt[0],St=ee*st,pt=ee*it,xt=Pt/(-st+it),Ht=xt*-st;if(ht.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(Ht),nt.translateZ(xt),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),Lt[10]===-1)nt.projectionMatrix.copy(ht.projectionMatrix),nt.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const Bt=ee+xt,A=L+xt,v=St-Ht,W=pt+(Pt-Ht),Q=lt*L/A*Bt,ut=rt*L/A*Bt;nt.projectionMatrix.makePerspective(v,W,Q,ut,Bt,A),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function et(nt,ht){ht===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(ht.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(s===null)return;let ht=nt.near,bt=nt.far;m.texture!==null&&(m.depthNear>0&&(ht=m.depthNear),m.depthFar>0&&(bt=m.depthFar)),O.near=_.near=y.near=ht,O.far=_.far=y.far=bt,(X!==O.near||G!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),X=O.near,G=O.far),O.layers.mask=nt.layers.mask|6,y.layers.mask=O.layers.mask&3,_.layers.mask=O.layers.mask&5;const Pt=nt.parent,Lt=O.cameras;et(O,Pt);for(let Zt=0;Zt<Lt.length;Zt++)et(Lt[Zt],Pt);Lt.length===2?K(O,y,_):O.projectionMatrix.copy(y.projectionMatrix),vt(nt,O,Pt)};function vt(nt,ht,bt){bt===null?nt.matrix.copy(ht.matrixWorld):(nt.matrix.copy(bt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(ht.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(ht.projectionMatrix),nt.projectionMatrixInverse.copy(ht.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=ds*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(nt){l=nt,f!==null&&(f.fixedFoveation=nt),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=nt)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(nt){return p[nt]};let yt=null;function Nt(nt,ht){if(h=ht.getViewerPose(c||o),g=ht,h!==null){const bt=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let Pt=!1;bt.length!==O.cameras.length&&(O.cameras.length=0,Pt=!0);for(let L=0;L<bt.length;L++){const lt=bt[L];let rt=null;if(d!==null)rt=d.getViewport(lt);else{const it=u.getViewSubImage(f,lt);rt=it.viewport,L===0&&(t.setRenderTargetTextures(x,it.colorTexture,it.depthStencilTexture),t.setRenderTarget(x))}let st=w[L];st===void 0&&(st=new je,st.layers.enable(L),st.viewport=new ge,w[L]=st),st.matrix.fromArray(lt.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(lt.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(rt.x,rt.y,rt.width,rt.height),L===0&&(O.matrix.copy(st.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Pt===!0&&O.cameras.push(st)}const Lt=s.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const L=u.getDepthInformation(bt[0]);L&&L.isValid&&L.texture&&m.init(L,s.renderState)}if(Lt&&Lt.includes("camera-access")&&M){t.state.unbindTexture(),u=n.getBinding();for(let L=0;L<bt.length;L++){const lt=bt[L].camera;if(lt){let rt=p[lt];rt||(rt=new Cc,p[lt]=rt);const st=u.getCameraImage(lt);rt.sourceTexture=st}}}}for(let bt=0;bt<C.length;bt++){const Pt=R[bt],Lt=C[bt];Pt!==null&&Lt!==void 0&&Lt.update(Pt,ht,c||o)}yt&&yt(nt,ht),ht.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ht}),g=null}const jt=new Vc;jt.setAnimationLoop(Nt),this.setAnimationLoop=function(nt){yt=nt},this.dispose=function(){}}}const Wn=new un,lg=new oe;function cg(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,bc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,S,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),M(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,T,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Oe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Oe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=t.get(p),S=T.envMap,x=T.envMapRotation;S&&(m.envMap.value=S,Wn.copy(x),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),m.envMapRotation.value.setFromMatrix4(lg.makeRotationFromEuler(Wn)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Oe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const T=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function hg(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,S){const x=S.program;n.uniformBlockBinding(T,x)}function c(T,S){let x=s[T.id];x===void 0&&(g(T),x=h(T),s[T.id]=x,T.addEventListener("dispose",m));const C=S.program;n.updateUBOMapping(T,C);const R=t.render.frame;r[T.id]!==R&&(f(T),r[T.id]=R)}function h(T){const S=u();T.__bindingPointIndex=S;const x=i.createBuffer(),C=T.__size,R=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,C,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,x),x}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const S=s[T.id],x=T.uniforms,C=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let R=0,P=x.length;R<P;R++){const N=Array.isArray(x[R])?x[R]:[x[R]];for(let y=0,_=N.length;y<_;y++){const w=N[y];if(d(w,R,y,C)===!0){const O=w.__offset,X=Array.isArray(w.value)?w.value:[w.value];let G=0;for(let Y=0;Y<X.length;Y++){const b=X[Y],U=M(b);typeof b=="number"||typeof b=="boolean"?(w.__data[0]=b,i.bufferSubData(i.UNIFORM_BUFFER,O+G,w.__data)):b.isMatrix3?(w.__data[0]=b.elements[0],w.__data[1]=b.elements[1],w.__data[2]=b.elements[2],w.__data[3]=0,w.__data[4]=b.elements[3],w.__data[5]=b.elements[4],w.__data[6]=b.elements[5],w.__data[7]=0,w.__data[8]=b.elements[6],w.__data[9]=b.elements[7],w.__data[10]=b.elements[8],w.__data[11]=0):(b.toArray(w.__data,G),G+=U.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(T,S,x,C){const R=T.value,P=S+"_"+x;if(C[P]===void 0)return typeof R=="number"||typeof R=="boolean"?C[P]=R:C[P]=R.clone(),!0;{const N=C[P];if(typeof R=="number"||typeof R=="boolean"){if(N!==R)return C[P]=R,!0}else if(N.equals(R)===!1)return N.copy(R),!0}return!1}function g(T){const S=T.uniforms;let x=0;const C=16;for(let P=0,N=S.length;P<N;P++){const y=Array.isArray(S[P])?S[P]:[S[P]];for(let _=0,w=y.length;_<w;_++){const O=y[_],X=Array.isArray(O.value)?O.value:[O.value];for(let G=0,Y=X.length;G<Y;G++){const b=X[G],U=M(b),I=x%C,j=I%U.boundary,K=I+j;x+=j,K!==0&&C-K<U.storage&&(x+=C-K),O.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=U.storage}}}const R=x%C;return R>0&&(x+=C-R),T.__size=x,T.__cache={},this}function M(T){const S={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(S.boundary=4,S.storage=4):T.isVector2?(S.boundary=8,S.storage=8):T.isVector3||T.isColor?(S.boundary=16,S.storage=12):T.isVector4?(S.boundary=16,S.storage=16):T.isMatrix3?(S.boundary=48,S.storage=48):T.isMatrix4?(S.boundary=64,S.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),S}function m(T){const S=T.target;S.removeEventListener("dispose",m);const x=o.indexOf(S.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class ug{constructor(t={}){const{canvas:e=lu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),M=new Int32Array(4);let m=null,p=null;const T=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let C=!1;this._outputColorSpace=Ve;let R=0,P=0,N=null,y=-1,_=null;const w=new ge,O=new ge;let X=null;const G=new Wt(0);let Y=0,b=e.width,U=e.height,I=1,j=null,K=null;const et=new ge(0,0,b,U),vt=new ge(0,0,b,U);let yt=!1;const Nt=new da;let jt=!1,nt=!1;const ht=new oe,bt=new F,Pt=new ge,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Zt=!1;function ee(){return N===null?I:1}let L=n;function lt(E,H){return e.getContext(E,H)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ta}`),e.addEventListener("webglcontextlost",mt,!1),e.addEventListener("webglcontextrestored",wt,!1),e.addEventListener("webglcontextcreationerror",ft,!1),L===null){const H="webgl2";if(L=lt(H,E),L===null)throw lt(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let rt,st,it,St,pt,xt,Ht,Bt,A,v,W,Q,ut,tt,Dt,D,z,k,q,Z,Mt,at,ct,At;function B(){rt=new ym(L),rt.init(),at=new ig(L,rt),st=new pm(L,rt,t,at),it=new eg(L,rt),st.reversedDepthBuffer&&f&&it.buffers.depth.setReversed(!0),St=new bm(L),pt=new V0,xt=new ng(L,rt,it,pt,st,at,St),Ht=new gm(x),Bt=new Mm(x),A=new Pf(L),ct=new fm(L,A),v=new Sm(L,A,St,ct),W=new wm(L,v,A,St),q=new Tm(L,st,xt),D=new mm(pt),Q=new k0(x,Ht,Bt,rt,st,ct,D),ut=new cg(x,pt),tt=new W0,Dt=new K0(rt),k=new um(x,Ht,Bt,it,W,d,l),z=new Q0(x,W,st),At=new hg(L,St,st,it),Z=new dm(L,rt,St),Mt=new Em(L,rt,St),St.programs=Q.programs,x.capabilities=st,x.extensions=rt,x.properties=pt,x.renderLists=tt,x.shadowMap=z,x.state=it,x.info=St}B();const dt=new ag(x,L);this.xr=dt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=rt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=rt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(E){E!==void 0&&(I=E,this.setSize(b,U,!1))},this.getSize=function(E){return E.set(b,U)},this.setSize=function(E,H,$=!0){if(dt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}b=E,U=H,e.width=Math.floor(E*I),e.height=Math.floor(H*I),$===!0&&(e.style.width=E+"px",e.style.height=H+"px"),this.setViewport(0,0,E,H)},this.getDrawingBufferSize=function(E){return E.set(b*I,U*I).floor()},this.setDrawingBufferSize=function(E,H,$){b=E,U=H,I=$,e.width=Math.floor(E*$),e.height=Math.floor(H*$),this.setViewport(0,0,E,H)},this.getCurrentViewport=function(E){return E.copy(w)},this.getViewport=function(E){return E.copy(et)},this.setViewport=function(E,H,$,J){E.isVector4?et.set(E.x,E.y,E.z,E.w):et.set(E,H,$,J),it.viewport(w.copy(et).multiplyScalar(I).round())},this.getScissor=function(E){return E.copy(vt)},this.setScissor=function(E,H,$,J){E.isVector4?vt.set(E.x,E.y,E.z,E.w):vt.set(E,H,$,J),it.scissor(O.copy(vt).multiplyScalar(I).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(E){it.setScissorTest(yt=E)},this.setOpaqueSort=function(E){j=E},this.setTransparentSort=function(E){K=E},this.getClearColor=function(E){return E.copy(k.getClearColor())},this.setClearColor=function(){k.setClearColor(...arguments)},this.getClearAlpha=function(){return k.getClearAlpha()},this.setClearAlpha=function(){k.setClearAlpha(...arguments)},this.clear=function(E=!0,H=!0,$=!0){let J=0;if(E){let V=!1;if(N!==null){const _t=N.texture.format;V=_t===aa||_t===oa||_t===ra}if(V){const _t=N.texture.type,Tt=_t===hn||_t===Jn||_t===cs||_t===hs||_t===na||_t===ia,It=k.getClearColor(),Ct=k.getClearAlpha(),kt=It.r,Vt=It.g,Ft=It.b;Tt?(g[0]=kt,g[1]=Vt,g[2]=Ft,g[3]=Ct,L.clearBufferuiv(L.COLOR,0,g)):(M[0]=kt,M[1]=Vt,M[2]=Ft,M[3]=Ct,L.clearBufferiv(L.COLOR,0,M))}else J|=L.COLOR_BUFFER_BIT}H&&(J|=L.DEPTH_BUFFER_BIT),$&&(J|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",mt,!1),e.removeEventListener("webglcontextrestored",wt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),k.dispose(),tt.dispose(),Dt.dispose(),pt.dispose(),Ht.dispose(),Bt.dispose(),W.dispose(),ct.dispose(),At.dispose(),Q.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",sn),dt.removeEventListener("sessionend",Da),On.stop()};function mt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=St.autoReset,H=z.enabled,$=z.autoUpdate,J=z.needsUpdate,V=z.type;B(),St.autoReset=E,z.enabled=H,z.autoUpdate=$,z.needsUpdate=J,z.type=V}function ft(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ot(E){const H=E.target;H.removeEventListener("dispose",ot),Rt(H)}function Rt(E){zt(E),pt.remove(E)}function zt(E){const H=pt.get(E).programs;H!==void 0&&(H.forEach(function($){Q.releaseProgram($)}),E.isShaderMaterial&&Q.releaseShaderCache(E))}this.renderBufferDirect=function(E,H,$,J,V,_t){H===null&&(H=Lt);const Tt=V.isMesh&&V.matrixWorld.determinant()<0,It=eh(E,H,$,J,V);it.setMaterial(J,Tt);let Ct=$.index,kt=1;if(J.wireframe===!0){if(Ct=v.getWireframeAttribute($),Ct===void 0)return;kt=2}const Vt=$.drawRange,Ft=$.attributes.position;let Kt=Vt.start*kt,ie=(Vt.start+Vt.count)*kt;_t!==null&&(Kt=Math.max(Kt,_t.start*kt),ie=Math.min(ie,(_t.start+_t.count)*kt)),Ct!==null?(Kt=Math.max(Kt,0),ie=Math.min(ie,Ct.count)):Ft!=null&&(Kt=Math.max(Kt,0),ie=Math.min(ie,Ft.count));const me=ie-Kt;if(me<0||me===1/0)return;ct.setup(V,J,It,$,Ct);let he,ae=Z;if(Ct!==null&&(he=A.get(Ct),ae=Mt,ae.setIndex(he)),V.isMesh)J.wireframe===!0?(it.setLineWidth(J.wireframeLinewidth*ee()),ae.setMode(L.LINES)):ae.setMode(L.TRIANGLES);else if(V.isLine){let Ot=J.linewidth;Ot===void 0&&(Ot=1),it.setLineWidth(Ot*ee()),V.isLineSegments?ae.setMode(L.LINES):V.isLineLoop?ae.setMode(L.LINE_LOOP):ae.setMode(L.LINE_STRIP)}else V.isPoints?ae.setMode(L.POINTS):V.isSprite&&ae.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)ps("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ae.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(rt.get("WEBGL_multi_draw"))ae.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Ot=V._multiDrawStarts,ue=V._multiDrawCounts,Jt=V._multiDrawCount,Be=Ct?A.get(Ct).bytesPerElement:1,oi=pt.get(J).currentProgram.getUniforms();for(let ze=0;ze<Jt;ze++)oi.setValue(L,"_gl_DrawID",ze),ae.render(Ot[ze]/Be,ue[ze])}else if(V.isInstancedMesh)ae.renderInstances(Kt,me,V.count);else if($.isInstancedBufferGeometry){const Ot=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,ue=Math.min($.instanceCount,Ot);ae.renderInstances(Kt,me,ue)}else ae.render(Kt,me)};function le(E,H,$){E.transparent===!0&&E.side===De&&E.forceSinglePass===!1?(E.side=Oe,E.needsUpdate=!0,As(E,H,$),E.side=In,E.needsUpdate=!0,As(E,H,$),E.side=De):As(E,H,$)}this.compile=function(E,H,$=null){$===null&&($=E),p=Dt.get($),p.init(H),S.push(p),$.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),E!==$&&E.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const J=new Set;return E.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const _t=V.material;if(_t)if(Array.isArray(_t))for(let Tt=0;Tt<_t.length;Tt++){const It=_t[Tt];le(It,$,V),J.add(It)}else le(_t,$,V),J.add(_t)}),p=S.pop(),J},this.compileAsync=function(E,H,$=null){const J=this.compile(E,H,$);return new Promise(V=>{function _t(){if(J.forEach(function(Tt){pt.get(Tt).currentProgram.isReady()&&J.delete(Tt)}),J.size===0){V(E);return}setTimeout(_t,10)}rt.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let te=null;function dn(E){te&&te(E)}function sn(){On.stop()}function Da(){On.start()}const On=new Vc;On.setAnimationLoop(dn),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(E){te=E,dt.setAnimationLoop(E),E===null?On.stop():On.start()},dt.addEventListener("sessionstart",sn),dt.addEventListener("sessionend",Da),this.render=function(E,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(H),H=dt.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,H,N),p=Dt.get(E,S.length),p.init(H),S.push(p),ht.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Nt.setFromProjectionMatrix(ht,cn,H.reversedDepth),nt=this.localClippingEnabled,jt=D.init(this.clippingPlanes,nt),m=tt.get(E,T.length),m.init(),T.push(m),dt.enabled===!0&&dt.isPresenting===!0){const _t=x.xr.getDepthSensingMesh();_t!==null&&yr(_t,H,-1/0,x.sortObjects)}yr(E,H,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(j,K),Zt=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,Zt&&k.addToRenderList(m,E),this.info.render.frame++,jt===!0&&D.beginShadows();const $=p.state.shadowsArray;z.render($,E,H),jt===!0&&D.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,V=m.transmissive;if(p.setupLights(),H.isArrayCamera){const _t=H.cameras;if(V.length>0)for(let Tt=0,It=_t.length;Tt<It;Tt++){const Ct=_t[Tt];Ua(J,V,E,Ct)}Zt&&k.render(E);for(let Tt=0,It=_t.length;Tt<It;Tt++){const Ct=_t[Tt];Ia(m,E,Ct,Ct.viewport)}}else V.length>0&&Ua(J,V,E,H),Zt&&k.render(E),Ia(m,E,H);N!==null&&P===0&&(xt.updateMultisampleRenderTarget(N),xt.updateRenderTargetMipmap(N)),E.isScene===!0&&E.onAfterRender(x,E,H),ct.resetDefaultState(),y=-1,_=null,S.pop(),S.length>0?(p=S[S.length-1],jt===!0&&D.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function yr(E,H,$,J){if(E.visible===!1)return;if(E.layers.test(H.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(H);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Nt.intersectsSprite(E)){J&&Pt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ht);const Tt=W.update(E),It=E.material;It.visible&&m.push(E,Tt,It,$,Pt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Nt.intersectsObject(E))){const Tt=W.update(E),It=E.material;if(J&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Pt.copy(E.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Pt.copy(Tt.boundingSphere.center)),Pt.applyMatrix4(E.matrixWorld).applyMatrix4(ht)),Array.isArray(It)){const Ct=Tt.groups;for(let kt=0,Vt=Ct.length;kt<Vt;kt++){const Ft=Ct[kt],Kt=It[Ft.materialIndex];Kt&&Kt.visible&&m.push(E,Tt,Kt,$,Pt.z,Ft)}}else It.visible&&m.push(E,Tt,It,$,Pt.z,null)}}const _t=E.children;for(let Tt=0,It=_t.length;Tt<It;Tt++)yr(_t[Tt],H,$,J)}function Ia(E,H,$,J){const V=E.opaque,_t=E.transmissive,Tt=E.transparent;p.setupLightsView($),jt===!0&&D.setGlobalState(x.clippingPlanes,$),J&&it.viewport(w.copy(J)),V.length>0&&ws(V,H,$),_t.length>0&&ws(_t,H,$),Tt.length>0&&ws(Tt,H,$),it.buffers.depth.setTest(!0),it.buffers.depth.setMask(!0),it.buffers.color.setMask(!0),it.setPolygonOffset(!1)}function Ua(E,H,$,J){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new ti(1,1,{generateMipmaps:!0,type:rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float")?Ss:hn,minFilter:Zn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const _t=p.state.transmissionRenderTarget[J.id],Tt=J.viewport||w;_t.setSize(Tt.z*x.transmissionResolutionScale,Tt.w*x.transmissionResolutionScale);const It=x.getRenderTarget(),Ct=x.getActiveCubeFace(),kt=x.getActiveMipmapLevel();x.setRenderTarget(_t),x.getClearColor(G),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),Zt&&k.render($);const Vt=x.toneMapping;x.toneMapping=Dn;const Ft=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),jt===!0&&D.setGlobalState(x.clippingPlanes,J),ws(E,$,J),xt.updateMultisampleRenderTarget(_t),xt.updateRenderTargetMipmap(_t),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let ie=0,me=H.length;ie<me;ie++){const he=H[ie],ae=he.object,Ot=he.geometry,ue=he.material,Jt=he.group;if(ue.side===De&&ae.layers.test(J.layers)){const Be=ue.side;ue.side=Oe,ue.needsUpdate=!0,Na(ae,$,J,Ot,ue,Jt),ue.side=Be,ue.needsUpdate=!0,Kt=!0}}Kt===!0&&(xt.updateMultisampleRenderTarget(_t),xt.updateRenderTargetMipmap(_t))}x.setRenderTarget(It,Ct,kt),x.setClearColor(G,Y),Ft!==void 0&&(J.viewport=Ft),x.toneMapping=Vt}function ws(E,H,$){const J=H.isScene===!0?H.overrideMaterial:null;for(let V=0,_t=E.length;V<_t;V++){const Tt=E[V],It=Tt.object,Ct=Tt.geometry,kt=Tt.group;let Vt=Tt.material;Vt.allowOverride===!0&&J!==null&&(Vt=J),It.layers.test($.layers)&&Na(It,H,$,Ct,Vt,kt)}}function Na(E,H,$,J,V,_t){E.onBeforeRender(x,H,$,J,V,_t),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),V.onBeforeRender(x,H,$,J,E,_t),V.transparent===!0&&V.side===De&&V.forceSinglePass===!1?(V.side=Oe,V.needsUpdate=!0,x.renderBufferDirect($,H,J,V,E,_t),V.side=In,V.needsUpdate=!0,x.renderBufferDirect($,H,J,V,E,_t),V.side=De):x.renderBufferDirect($,H,J,V,E,_t),E.onAfterRender(x,H,$,J,V,_t)}function As(E,H,$){H.isScene!==!0&&(H=Lt);const J=pt.get(E),V=p.state.lights,_t=p.state.shadowsArray,Tt=V.state.version,It=Q.getParameters(E,V.state,_t,H,$),Ct=Q.getProgramCacheKey(It);let kt=J.programs;J.environment=E.isMeshStandardMaterial?H.environment:null,J.fog=H.fog,J.envMap=(E.isMeshStandardMaterial?Bt:Ht).get(E.envMap||J.environment),J.envMapRotation=J.environment!==null&&E.envMap===null?H.environmentRotation:E.envMapRotation,kt===void 0&&(E.addEventListener("dispose",ot),kt=new Map,J.programs=kt);let Vt=kt.get(Ct);if(Vt!==void 0){if(J.currentProgram===Vt&&J.lightsStateVersion===Tt)return Oa(E,It),Vt}else It.uniforms=Q.getUniforms(E),E.onBeforeCompile(It,x),Vt=Q.acquireProgram(It,Ct),kt.set(Ct,Vt),J.uniforms=It.uniforms;const Ft=J.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ft.clippingPlanes=D.uniform),Oa(E,It),J.needsLights=ih(E),J.lightsStateVersion=Tt,J.needsLights&&(Ft.ambientLightColor.value=V.state.ambient,Ft.lightProbe.value=V.state.probe,Ft.directionalLights.value=V.state.directional,Ft.directionalLightShadows.value=V.state.directionalShadow,Ft.spotLights.value=V.state.spot,Ft.spotLightShadows.value=V.state.spotShadow,Ft.rectAreaLights.value=V.state.rectArea,Ft.ltc_1.value=V.state.rectAreaLTC1,Ft.ltc_2.value=V.state.rectAreaLTC2,Ft.pointLights.value=V.state.point,Ft.pointLightShadows.value=V.state.pointShadow,Ft.hemisphereLights.value=V.state.hemi,Ft.directionalShadowMap.value=V.state.directionalShadowMap,Ft.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ft.spotShadowMap.value=V.state.spotShadowMap,Ft.spotLightMatrix.value=V.state.spotLightMatrix,Ft.spotLightMap.value=V.state.spotLightMap,Ft.pointShadowMap.value=V.state.pointShadowMap,Ft.pointShadowMatrix.value=V.state.pointShadowMatrix),J.currentProgram=Vt,J.uniformsList=null,Vt}function Fa(E){if(E.uniformsList===null){const H=E.currentProgram.getUniforms();E.uniformsList=or.seqWithValue(H.seq,E.uniforms)}return E.uniformsList}function Oa(E,H){const $=pt.get(E);$.outputColorSpace=H.outputColorSpace,$.batching=H.batching,$.batchingColor=H.batchingColor,$.instancing=H.instancing,$.instancingColor=H.instancingColor,$.instancingMorph=H.instancingMorph,$.skinning=H.skinning,$.morphTargets=H.morphTargets,$.morphNormals=H.morphNormals,$.morphColors=H.morphColors,$.morphTargetsCount=H.morphTargetsCount,$.numClippingPlanes=H.numClippingPlanes,$.numIntersection=H.numClipIntersection,$.vertexAlphas=H.vertexAlphas,$.vertexTangents=H.vertexTangents,$.toneMapping=H.toneMapping}function eh(E,H,$,J,V){H.isScene!==!0&&(H=Lt),xt.resetTextureUnits();const _t=H.fog,Tt=J.isMeshStandardMaterial?H.environment:null,It=N===null?x.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Ui,Ct=(J.isMeshStandardMaterial?Bt:Ht).get(J.envMap||Tt),kt=J.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Vt=!!$.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ft=!!$.morphAttributes.position,Kt=!!$.morphAttributes.normal,ie=!!$.morphAttributes.color;let me=Dn;J.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(me=x.toneMapping);const he=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ae=he!==void 0?he.length:0,Ot=pt.get(J),ue=p.state.lights;if(jt===!0&&(nt===!0||E!==_)){const Ae=E===_&&J.id===y;D.setState(J,E,Ae)}let Jt=!1;J.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==ue.state.version||Ot.outputColorSpace!==It||V.isBatchedMesh&&Ot.batching===!1||!V.isBatchedMesh&&Ot.batching===!0||V.isBatchedMesh&&Ot.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Ot.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Ot.instancing===!1||!V.isInstancedMesh&&Ot.instancing===!0||V.isSkinnedMesh&&Ot.skinning===!1||!V.isSkinnedMesh&&Ot.skinning===!0||V.isInstancedMesh&&Ot.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ot.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ot.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ot.instancingMorph===!1&&V.morphTexture!==null||Ot.envMap!==Ct||J.fog===!0&&Ot.fog!==_t||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==D.numPlanes||Ot.numIntersection!==D.numIntersection)||Ot.vertexAlphas!==kt||Ot.vertexTangents!==Vt||Ot.morphTargets!==Ft||Ot.morphNormals!==Kt||Ot.morphColors!==ie||Ot.toneMapping!==me||Ot.morphTargetsCount!==ae)&&(Jt=!0):(Jt=!0,Ot.__version=J.version);let Be=Ot.currentProgram;Jt===!0&&(Be=As(J,H,V));let oi=!1,ze=!1,qi=!1;const fe=Be.getUniforms(),Xe=Ot.uniforms;if(it.useProgram(Be.program)&&(oi=!0,ze=!0,qi=!0),J.id!==y&&(y=J.id,ze=!0),oi||_!==E){it.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),fe.setValue(L,"projectionMatrix",E.projectionMatrix),fe.setValue(L,"viewMatrix",E.matrixWorldInverse);const Ne=fe.map.cameraPosition;Ne!==void 0&&Ne.setValue(L,bt.setFromMatrixPosition(E.matrixWorld)),st.logarithmicDepthBuffer&&fe.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&fe.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),_!==E&&(_=E,ze=!0,qi=!0)}if(V.isSkinnedMesh){fe.setOptional(L,V,"bindMatrix"),fe.setOptional(L,V,"bindMatrixInverse");const Ae=V.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),fe.setValue(L,"boneTexture",Ae.boneTexture,xt))}V.isBatchedMesh&&(fe.setOptional(L,V,"batchingTexture"),fe.setValue(L,"batchingTexture",V._matricesTexture,xt),fe.setOptional(L,V,"batchingIdTexture"),fe.setValue(L,"batchingIdTexture",V._indirectTexture,xt),fe.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&fe.setValue(L,"batchingColorTexture",V._colorsTexture,xt));const qe=$.morphAttributes;if((qe.position!==void 0||qe.normal!==void 0||qe.color!==void 0)&&q.update(V,$,Be),(ze||Ot.receiveShadow!==V.receiveShadow)&&(Ot.receiveShadow=V.receiveShadow,fe.setValue(L,"receiveShadow",V.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Xe.envMap.value=Ct,Xe.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&H.environment!==null&&(Xe.envMapIntensity.value=H.environmentIntensity),ze&&(fe.setValue(L,"toneMappingExposure",x.toneMappingExposure),Ot.needsLights&&nh(Xe,qi),_t&&J.fog===!0&&ut.refreshFogUniforms(Xe,_t),ut.refreshMaterialUniforms(Xe,J,I,U,p.state.transmissionRenderTarget[E.id]),or.upload(L,Fa(Ot),Xe,xt)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(or.upload(L,Fa(Ot),Xe,xt),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&fe.setValue(L,"center",V.center),fe.setValue(L,"modelViewMatrix",V.modelViewMatrix),fe.setValue(L,"normalMatrix",V.normalMatrix),fe.setValue(L,"modelMatrix",V.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Ae=J.uniformsGroups;for(let Ne=0,Sr=Ae.length;Ne<Sr;Ne++){const Bn=Ae[Ne];At.update(Bn,Be),At.bind(Bn,Be)}}return Be}function nh(E,H){E.ambientLightColor.needsUpdate=H,E.lightProbe.needsUpdate=H,E.directionalLights.needsUpdate=H,E.directionalLightShadows.needsUpdate=H,E.pointLights.needsUpdate=H,E.pointLightShadows.needsUpdate=H,E.spotLights.needsUpdate=H,E.spotLightShadows.needsUpdate=H,E.rectAreaLights.needsUpdate=H,E.hemisphereLights.needsUpdate=H}function ih(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(E,H,$){const J=pt.get(E);J.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),pt.get(E.texture).__webglTexture=H,pt.get(E.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:$,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,H){const $=pt.get(E);$.__webglFramebuffer=H,$.__useDefaultFramebuffer=H===void 0};const sh=L.createFramebuffer();this.setRenderTarget=function(E,H=0,$=0){N=E,R=H,P=$;let J=!0,V=null,_t=!1,Tt=!1;if(E){const Ct=pt.get(E);if(Ct.__useDefaultFramebuffer!==void 0)it.bindFramebuffer(L.FRAMEBUFFER,null),J=!1;else if(Ct.__webglFramebuffer===void 0)xt.setupRenderTarget(E);else if(Ct.__hasExternalTextures)xt.rebindTextures(E,pt.get(E.texture).__webglTexture,pt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ft=E.depthTexture;if(Ct.__boundDepthTexture!==Ft){if(Ft!==null&&pt.has(Ft)&&(E.width!==Ft.image.width||E.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");xt.setupDepthRenderbuffer(E)}}const kt=E.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(Tt=!0);const Vt=pt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Vt[H])?V=Vt[H][$]:V=Vt[H],_t=!0):E.samples>0&&xt.useMultisampledRTT(E)===!1?V=pt.get(E).__webglMultisampledFramebuffer:Array.isArray(Vt)?V=Vt[$]:V=Vt,w.copy(E.viewport),O.copy(E.scissor),X=E.scissorTest}else w.copy(et).multiplyScalar(I).floor(),O.copy(vt).multiplyScalar(I).floor(),X=yt;if($!==0&&(V=sh),it.bindFramebuffer(L.FRAMEBUFFER,V)&&J&&it.drawBuffers(E,V),it.viewport(w),it.scissor(O),it.setScissorTest(X),_t){const Ct=pt.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ct.__webglTexture,$)}else if(Tt){const Ct=H;for(let kt=0;kt<E.textures.length;kt++){const Vt=pt.get(E.textures[kt]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+kt,Vt.__webglTexture,$,Ct)}}else if(E!==null&&$!==0){const Ct=pt.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ct.__webglTexture,$)}y=-1},this.readRenderTargetPixels=function(E,H,$,J,V,_t,Tt,It=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=pt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Tt!==void 0&&(Ct=Ct[Tt]),Ct){it.bindFramebuffer(L.FRAMEBUFFER,Ct);try{const kt=E.textures[It],Vt=kt.format,Ft=kt.type;if(!st.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!st.textureTypeReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=E.width-J&&$>=0&&$<=E.height-V&&(E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+It),L.readPixels(H,$,J,V,at.convert(Vt),at.convert(Ft),_t))}finally{const kt=N!==null?pt.get(N).__webglFramebuffer:null;it.bindFramebuffer(L.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(E,H,$,J,V,_t,Tt,It=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=pt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Tt!==void 0&&(Ct=Ct[Tt]),Ct)if(H>=0&&H<=E.width-J&&$>=0&&$<=E.height-V){it.bindFramebuffer(L.FRAMEBUFFER,Ct);const kt=E.textures[It],Vt=kt.format,Ft=kt.type;if(!st.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!st.textureTypeReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Kt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Kt),L.bufferData(L.PIXEL_PACK_BUFFER,_t.byteLength,L.STREAM_READ),E.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+It),L.readPixels(H,$,J,V,at.convert(Vt),at.convert(Ft),0);const ie=N!==null?pt.get(N).__webglFramebuffer:null;it.bindFramebuffer(L.FRAMEBUFFER,ie);const me=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await cu(L,me,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Kt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,_t),L.deleteBuffer(Kt),L.deleteSync(me),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,H=null,$=0){const J=Math.pow(2,-$),V=Math.floor(E.image.width*J),_t=Math.floor(E.image.height*J),Tt=H!==null?H.x:0,It=H!==null?H.y:0;xt.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,$,0,0,Tt,It,V,_t),it.unbindTexture()};const rh=L.createFramebuffer(),oh=L.createFramebuffer();this.copyTextureToTexture=function(E,H,$=null,J=null,V=0,_t=null){_t===null&&(V!==0?(ps("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),_t=V,V=0):_t=0);let Tt,It,Ct,kt,Vt,Ft,Kt,ie,me;const he=E.isCompressedTexture?E.mipmaps[_t]:E.image;if($!==null)Tt=$.max.x-$.min.x,It=$.max.y-$.min.y,Ct=$.isBox3?$.max.z-$.min.z:1,kt=$.min.x,Vt=$.min.y,Ft=$.isBox3?$.min.z:0;else{const qe=Math.pow(2,-V);Tt=Math.floor(he.width*qe),It=Math.floor(he.height*qe),E.isDataArrayTexture?Ct=he.depth:E.isData3DTexture?Ct=Math.floor(he.depth*qe):Ct=1,kt=0,Vt=0,Ft=0}J!==null?(Kt=J.x,ie=J.y,me=J.z):(Kt=0,ie=0,me=0);const ae=at.convert(H.format),Ot=at.convert(H.type);let ue;H.isData3DTexture?(xt.setTexture3D(H,0),ue=L.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(xt.setTexture2DArray(H,0),ue=L.TEXTURE_2D_ARRAY):(xt.setTexture2D(H,0),ue=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,H.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,H.unpackAlignment);const Jt=L.getParameter(L.UNPACK_ROW_LENGTH),Be=L.getParameter(L.UNPACK_IMAGE_HEIGHT),oi=L.getParameter(L.UNPACK_SKIP_PIXELS),ze=L.getParameter(L.UNPACK_SKIP_ROWS),qi=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,he.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,he.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,kt),L.pixelStorei(L.UNPACK_SKIP_ROWS,Vt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ft);const fe=E.isDataArrayTexture||E.isData3DTexture,Xe=H.isDataArrayTexture||H.isData3DTexture;if(E.isDepthTexture){const qe=pt.get(E),Ae=pt.get(H),Ne=pt.get(qe.__renderTarget),Sr=pt.get(Ae.__renderTarget);it.bindFramebuffer(L.READ_FRAMEBUFFER,Ne.__webglFramebuffer),it.bindFramebuffer(L.DRAW_FRAMEBUFFER,Sr.__webglFramebuffer);for(let Bn=0;Bn<Ct;Bn++)fe&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,pt.get(E).__webglTexture,V,Ft+Bn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,pt.get(H).__webglTexture,_t,me+Bn)),L.blitFramebuffer(kt,Vt,Tt,It,Kt,ie,Tt,It,L.DEPTH_BUFFER_BIT,L.NEAREST);it.bindFramebuffer(L.READ_FRAMEBUFFER,null),it.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(V!==0||E.isRenderTargetTexture||pt.has(E)){const qe=pt.get(E),Ae=pt.get(H);it.bindFramebuffer(L.READ_FRAMEBUFFER,rh),it.bindFramebuffer(L.DRAW_FRAMEBUFFER,oh);for(let Ne=0;Ne<Ct;Ne++)fe?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,qe.__webglTexture,V,Ft+Ne):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,qe.__webglTexture,V),Xe?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ae.__webglTexture,_t,me+Ne):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ae.__webglTexture,_t),V!==0?L.blitFramebuffer(kt,Vt,Tt,It,Kt,ie,Tt,It,L.COLOR_BUFFER_BIT,L.NEAREST):Xe?L.copyTexSubImage3D(ue,_t,Kt,ie,me+Ne,kt,Vt,Tt,It):L.copyTexSubImage2D(ue,_t,Kt,ie,kt,Vt,Tt,It);it.bindFramebuffer(L.READ_FRAMEBUFFER,null),it.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Xe?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(ue,_t,Kt,ie,me,Tt,It,Ct,ae,Ot,he.data):H.isCompressedArrayTexture?L.compressedTexSubImage3D(ue,_t,Kt,ie,me,Tt,It,Ct,ae,he.data):L.texSubImage3D(ue,_t,Kt,ie,me,Tt,It,Ct,ae,Ot,he):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,_t,Kt,ie,Tt,It,ae,Ot,he.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,_t,Kt,ie,he.width,he.height,ae,he.data):L.texSubImage2D(L.TEXTURE_2D,_t,Kt,ie,Tt,It,ae,Ot,he);L.pixelStorei(L.UNPACK_ROW_LENGTH,Jt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Be),L.pixelStorei(L.UNPACK_SKIP_PIXELS,oi),L.pixelStorei(L.UNPACK_SKIP_ROWS,ze),L.pixelStorei(L.UNPACK_SKIP_IMAGES,qi),_t===0&&H.generateMipmaps&&L.generateMipmap(ue),it.unbindTexture()},this.initRenderTarget=function(E){pt.get(E).__webglFramebuffer===void 0&&xt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?xt.setTextureCube(E,0):E.isData3DTexture?xt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?xt.setTexture2DArray(E,0):xt.setTexture2D(E,0),it.unbindTexture()},this.resetState=function(){R=0,P=0,N=null,it.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}const Zl={type:"change"},Ea={type:"start"},Yc={type:"end"},er=new vr,Kl=new Cn,fg=Math.cos(70*Ei.DEG2RAD),xe=new F,Fe=2*Math.PI,re={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},no=1e-6;class dg extends Rf{constructor(t,e=null){super(t,e),this.state=re.NONE,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ri.ROTATE,MIDDLE:Ri.DOLLY,RIGHT:Ri.PAN},this.touches={ONE:Ti.ROTATE,TWO:Ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new Qn,this._lastTargetPosition=new F,this._quat=new Qn().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new El,this._sphericalDelta=new El,this._scale=1,this._panOffset=new F,this._rotateStart=new gt,this._rotateEnd=new gt,this._rotateDelta=new gt,this._panStart=new gt,this._panEnd=new gt,this._panDelta=new gt,this._dollyStart=new gt,this._dollyEnd=new gt,this._dollyDelta=new gt,this._dollyDirection=new F,this._mouse=new gt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=mg.bind(this),this._onPointerDown=pg.bind(this),this._onPointerUp=gg.bind(this),this._onContextMenu=Eg.bind(this),this._onMouseWheel=xg.bind(this),this._onKeyDown=Mg.bind(this),this._onTouchStart=yg.bind(this),this._onTouchMove=Sg.bind(this),this._onMouseDown=_g.bind(this),this._onMouseMove=vg.bind(this),this._interceptControlDown=bg.bind(this),this._interceptControlUp=Tg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Zl),this.update(),this.state=re.NONE}update(t=null){const e=this.object.position;xe.copy(e).sub(this.target),xe.applyQuaternion(this._quat),this._spherical.setFromVector3(xe),this.autoRotate&&this.state===re.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Fe:n>Math.PI&&(n-=Fe),s<-Math.PI?s+=Fe:s>Math.PI&&(s-=Fe),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(xe.setFromSpherical(this._spherical),xe.applyQuaternion(this._quatInverse),e.copy(this.target).add(xe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=xe.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new F(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=xe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(er.origin.copy(this.object.position),er.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(er.direction))<fg?this.object.lookAt(this.target):(Kl.setFromNormalAndCoplanarPoint(this.object.up,this.target),er.intersectPlane(Kl,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>no||8*(1-this._lastQuaternion.dot(this.object.quaternion))>no||this._lastTargetPosition.distanceToSquared(this.target)>no?(this.dispatchEvent(Zl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Fe/60*this.autoRotateSpeed*t:Fe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){xe.setFromMatrixColumn(e,0),xe.multiplyScalar(-t),this._panOffset.add(xe)}_panUp(t,e){this.screenSpacePanning===!0?xe.setFromMatrixColumn(e,1):(xe.setFromMatrixColumn(e,0),xe.crossVectors(this.object.up,xe)),xe.multiplyScalar(t),this._panOffset.add(xe)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;xe.copy(s).sub(this.target);let r=xe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Fe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Fe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Fe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Fe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Fe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Fe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Fe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Fe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new gt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function pg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function mg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function gg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yc),this.state=re.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function _g(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ri.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=re.DOLLY;break;case Ri.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=re.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=re.ROTATE}break;case Ri.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=re.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=re.PAN}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(Ea)}function vg(i){switch(this.state){case re.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case re.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case re.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function xg(i){this.enabled===!1||this.enableZoom===!1||this.state!==re.NONE||(i.preventDefault(),this.dispatchEvent(Ea),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Yc))}function Mg(i){this.enabled!==!1&&this._handleKeyDown(i)}function yg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ti.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=re.TOUCH_ROTATE;break;case Ti.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=re.TOUCH_PAN;break;default:this.state=re.NONE}break;case 2:switch(this.touches.TWO){case Ti.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=re.TOUCH_DOLLY_PAN;break;case Ti.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=re.TOUCH_DOLLY_ROTATE;break;default:this.state=re.NONE}break;default:this.state=re.NONE}this.state!==re.NONE&&this.dispatchEvent(Ea)}function Sg(i){switch(this._trackPointer(i),this.state){case re.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case re.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case re.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case re.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=re.NONE}}function Eg(i){this.enabled!==!1&&i.preventDefault()}function bg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Tg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function wg(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new pe;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=$l(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let M=0;M<o[h].length;++M)d.push(o[h][M][f]);const g=$l(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function $l(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Ze(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<e;g++){const M=h.getComponent(f,g);a.setComponent(f+u,g,M)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Ag(i){const t=new $t;t.name="玫瑰风城堡",i.add(t);const e=new $t;e.name="可揭开的城墙",t.add(e);const n=new $t;n.name="可揭开的屋顶",t.add(n);const s=new $t;s.name="四季生活室",t.add(s);const r={},o=(b,U,I={})=>r[b]=new be({color:U,roughness:.89,...I});o("stone","#e8d2ae"),o("trim","#f5e7ca"),o("rose","#caa685"),o("roof","#567d84"),o("tile","#ae7060"),o("ridge","#46676f"),o("wood","#8f6848"),o("lightwood","#bc9568"),o("dark","#514b43"),o("glass","#e8bf74",{emissive:"#d6a357",emissiveIntensity:.2}),o("blue","#6a8e98"),o("red","#b9756a"),o("leaf","#7c9870"),o("linen","#e6dec0"),o("gold","#cfb16e",{metalness:.24}),o("water","#79aaa4");const a=new Nn(1,1,1),l=new Bi(1,1),c=(b,U,I,j,K,et=t)=>{const vt=new ce(b,typeof U=="string"?r[U]:U);return vt.position.set(I,j,K),vt.castShadow=!0,vt.receiveShadow=!0,et.add(vt),vt},h=(b,U,I,j,K,et,vt="stone",yt=t)=>{const Nt=c(a,vt,j,K,et,yt);return Nt.scale.set(b,U,I),Nt},u=(b,U,I,j,K,et="stone",vt=t,yt=b,Nt=16)=>c(new Ge(yt,b,U,Nt),et,I,j,K,vt),f=(b,U,I,j,K="leaf",et=t)=>{const vt=c(l,K,U,I,j,et);return vt.scale.setScalar(b),vt},d=(b,U,I,j="wood",K=t)=>{const et=new F(...b),vt=new F(...U),yt=vt.clone().sub(et),Nt=u(I,yt.length(),...et.add(vt).multiplyScalar(.5).toArray(),j,K,I,6);return Nt.quaternion.setFromUnitVectors(new F(0,1,0),yt.normalize()),Nt},g=(b,U)=>{const I=new Fi,j=b/2;return I.moveTo(-j,0),I.lineTo(j,0),I.lineTo(j,U-j),I.absarc(0,U-j,j,0,Math.PI,!1),I.closePath(),I},M=(b,U,I,j,K,et,vt="dark",yt=t)=>c(new vs(g(b,U),{depth:I,bevelEnabled:!1,curveSegments:10}),vt,j,K,et,yt);function m(b,U,I,j=.55,K=1.25,et=t,vt=0){const yt=new $t;return yt.position.set(b,U,I),yt.rotation.y=vt,et.add(yt),M(j+.17,K+.16,.11,0,-.08,0,"rose",yt),M(j,K,.12,0,0,.045,"glass",yt),h(.065,K-.15,.06,0,(K-.15)/2,.185,"wood",yt),h(j,.065,.06,0,K*.46,.19,"wood",yt),h(j+.26,.12,.34,0,-.07,.1,"trim",yt),yt}function p(b,U,I,j,K,et,vt="roof",yt=n){const Nt=new Fi;Nt.moveTo(-b/2,0),Nt.lineTo(b/2,0),Nt.lineTo(0,I),Nt.closePath();const jt=c(new vs(Nt,{depth:U,bevelEnabled:!1}),vt,j,K,et-U/2,yt);d([j,K+I+.035,et-U/2-.12],[j,K+I+.035,et+U/2+.12],.08,"ridge",yt);for(let nt=1;nt<5;nt++){const ht=nt/5,bt=b/2*(1-ht);for(const Pt of[-1,1])d([j+Pt*bt,K+I*ht+.04,et-U/2],[j+Pt*bt,K+I*ht+.04,et+U/2],.024,"ridge",yt)}return jt}function T(b,U,I,j="x",K=t,et=3.2){h(j==="x"?I:.52,et,j==="x"?.52:I,b,et/2+.2,U,"stone",K),h(j==="x"?I+.1:.68,.17,j==="x"?.68:I+.1,b,et+.26,U,"trim",K);const vt=Math.floor(I/.9);for(let yt=0;yt<vt;yt++){const Nt=(yt-(vt-1)/2)*.9;h(.44,.7,.56,b+(j==="x"?Nt:0),et+.68,U+(j==="z"?Nt:0),"stone",K)}for(let yt=0;yt<3;yt++)h(j==="x"?I:.56,.05,j==="x"?.56:I,b,.7+yt*.85,U,"rose",K)}function S(b,U,I,j="red"){d([b,U-1,I],[b,U+1.05,I],.035,"gold");const K=new ni(1.25,.65,8,2),et=c(K,j,b+.61,U+.52,I);return et.material.side=De,et.userData.flag=!0,x.push(et),f(.085,b,U+1.1,I,"gold"),et}const x=[];h(15.4,.36,13.8,0,.1,-1.3,"rose"),h(14.9,.16,13.3,0,.36,-1.3,"trim"),h(12,.08,5,0,.49,2.25,"lightwood");for(let b=-6;b<=6;b++)for(let U=0;U<4;U++)h(.84,.025,.72,b*.89,.54,.85+U*.82,"stone");T(0,-7.6,13,"x"),T(-6.8,-1.6,11.5,"z"),T(6.8,-1.6,11.5,"z",e),T(-4.7,4.8,4.3,"x",e),T(4.7,4.8,4.3,"x",e),h(.75,3.45,.9,-1.55,1.9,4.8,"trim",e),h(.75,3.45,.9,1.55,1.9,4.8,"trim",e);for(let b=0;b<11;b++){const U=b*Math.PI/10,I=h(.46,.46,.95,Math.cos(U)*1.33,2.15+Math.sin(U)*1.33,4.8,"trim",e);I.rotation.z=U}h(4,.42,1,0,3.95,4.8,"stone",e);for(let b=-2;b<=2;b++)h(.45,.7,.7,b*.84,4.48,4.8,"stone",e);h(2.7,.15,2.7,0,.58,5.5,"wood");for(let b=-6;b<=6;b++)h(2.7,.035,.035,0,.68,4.3+b*.19,"dark");for(let b of[-1.42,1.42]){d([b,.65,4.55],[b,.65,6.9],.055,"wood");for(let U of[4.5,5.4,6.3,6.9])d([b,.68,U],[b,1.23,U],.045,"wood");d([b,1.25,4.5],[b,1.25,6.9],.05,"wood")}function C(b,U,I,j="tile",K=3){u(1.46,.42,b,.55,U,"rose"),u(1.23,I,b,I/2+.5,U,"stone"),u(1.34,.25,b,I+.3,U,"trim");for(let et=1.5;et<I;et+=1.25)u(1.245,.045,b,et,U,"rose");for(let et=0;et<12;et++){const vt=et/12*Math.PI*2,yt=h(.35,.65,.35,b+Math.sin(vt)*1.12,I+.66,U+Math.cos(vt)*1.12,"stone");yt.rotation.y=vt}u(1.65,K,b,I+.75+K/2,U,j,n,0,20),u(1.69,.17,b,I+.73,U,j,n);for(let et=1;et<5;et++){const vt=et/5;u(1.65*(1-vt)+.015,.045,b,I+.75+K*vt,U,j,n)}return f(.12,b,I+K+.85,U,"gold",n),m(b,I*.48,U+1.237,.42,1.15),m(b+1.237,I*.55,U,.42,1.15,t,Math.PI/2),I+K+.8}const R=C(-6.55,-6.7,9.5,"roof",4.6);C(6.55,-6.7,7.5,"tile",3.5),C(-6.55,4.3,5.4,"tile",3.4),C(6.55,4.3,6.4,"roof",3.8),S(-6.55,R+.7,-6.7,"red"),S(6.55,11.6,4.3,"blue");const P=-1.2,N=-3.25,y=8.4,_=6.6;h(y,10,.48,P,5.5,N-_/2,"stone"),h(.5,10,_,P-y/2,5.5,N,"stone"),h(y,10,.48,P,5.5,N+_/2,"stone",e),h(.5,10,_,P+y/2,5.5,N,"stone",e);for(let b=0;b<3;b++){const U=.57+b*3.15;h(y-.45,.2,_-.45,P,U,N,"lightwood",s);for(let I=0;I<12;I++)h(y-.45,.025,.025,P,U+.11,N-_/2+.4+I*.51,"wood",s);h(y+.28,.22,_+.25,P,U+.15,N,"trim",b===0?t:e);for(let I of[-3.7,-1.2,1.3])m(I,1.4+b*3.12,.31,.66,1.5,e);for(let I of[-5.2,-2.9,-.8])m(3.04,1.4+b*3.12,I,.66,1.5,e,Math.PI/2);for(let I of[-3.7,-1.2,1.3])m(I,1.4+b*3.12,-6.82,.66,1.5,t,Math.PI);for(let I of[-5.36,2.98])for(let j=0;j<5;j++)h(.6,.32,.62,I,U+.4+j*.48,.04,j%2?"rose":"trim",e)}p(y+.9,_+1,3.25,P,10.52,N,"roof");for(let b of[-3.4,1])h(1.25,1.05,.85,b,11.15,.13,"trim",n),m(b,10.8,.59,.55,.85,n),p(1.6,1,.7,b,11.68,.16,"tile");for(let b of[-4.35,2])h(.58,1.9,.7,b,12.5,-4.8,"rose",n),h(.75,.18,.86,b,13.48,-4.8,"trim",n);u(.95,3.8,-1.35,13.45,-4.45,"trim"),u(1.07,.24,-1.35,15.34,-4.45,"rose"),u(1.47,4,-1.35,17.45,-4.45,"tile",n,0,20),f(.12,-1.35,19.55,-4.45,"gold",n),m(-1.35,13.2,-3.48,.44,1.2),S(-1.35,20,-4.45,"blue");const w=new $t;t.add(w),h(3.05,4,.4,4.7,2.5,-4.9,"stone",w),h(.4,4,6,6.02,2.5,-2.1,"stone",e),h(2.75,4,.4,4.65,2.5,.7,"stone",e),h(2.85,.2,5.8,4.6,.64,-2.1,"lightwood",s),p(3.8,6.5,2,4.65,4.58,-2.1,"tile"),m(4.65,1.75,.95,.8,1.65,e);for(let b of[-3.7,-1.5])m(6.25,1.7,b,.65,1.65,e,Math.PI/2);h(.7,2.1,.75,5.3,6.13,-3.4,"stone",n),h(.9,.15,.95,5.3,7.19,-3.4,"rose",n);function O(b,U,I,j=2,K=1){h(j,.13,K,b,U+.85,I,"wood",s);for(let et of[-1,1])for(let vt of[-1,1])h(.12,.8,.12,b+et*(j/2-.15),U+.4,I+vt*(K/2-.15),"dark",s)}function X(b,U,I){u(.25,.12,b,U+.5,I,"wood",s);for(let j=0;j<3;j++){const K=j/3*Math.PI*2;d([b+Math.cos(K)*.17,U,I+Math.sin(K)*.17],[b+Math.cos(K)*.12,U+.48,I+Math.sin(K)*.12],.035,"wood",s)}}h(3.1,.025,4.45,-1.8,.81,-3,"red",s),O(-1.9,.77,-3.1,2.15,3.3);for(let b of[-4.1,-3,-1.9])for(let U of[-3.35,-.45])X(U,.76,b);for(let b of[-4,-3.1,-2.2])u(.22,.045,-1.9,1.71,b,"linen",s),f(.11,-1.9,1.8,b,"gold",s);h(1.7,2.1,.56,-4.25,1.8,-6.04,"rose",s),M(.95,1.25,.25,-4.25,.78,-5.72,"dark",s);for(let b of[-4.55,-4.23,-3.94])d([b,.85,-5.42],[b+.15,1.05,-5.45],.1,"wood",s),f(.12,b,1.09,-5.44,"gold",s);h(.5,1.1,.16,1.85,2.3,-6.03,"red",s),h(.07,1.1,.05,1.85,2.3,-5.93,"gold",s);for(let b of[-4.15,-1.7,.75]){h(1.8,2.3,.42,b,5.02,-6.05,"wood",s);for(let U=0;U<3;U++){h(1.85,.09,.58,b,4.25+U*.65,-5.99,"lightwood",s);for(let I=0;I<8;I++)h(.13,.36+I%3*.055,.3,b-.73+I*.21,4.46+U*.65,-5.86,["red","blue","gold","linen"][I%4],s)}}O(.2,3.95,-1.7,2.4,1.1),h(1.5,.023,.65,.2,4.88,-1.7,"linen",s),X(.1,3.94,-.65);for(let b=0;b<7;b++)d([-3.25,4+b*.25,-5.05],[-2.67,4+b*.25,-5.05],.025,"lightwood",s);for(let b of[-3.3,-2.62])d([b,3.97,-4.88],[b,5.95,-5.35],.04,"wood",s);u(.25,.09,1,4.97,-1.6,"gold",s),f(.25,1,5.18,-1.6,"blue",s),h(2.15,.5,2.7,-2.75,7.37,-3.9,"wood",s),h(2,.22,2.55,-2.75,7.72,-3.9,"linen",s),h(2,.07,1.7,-2.75,7.89,-3.4,"blue",s);for(let b of[-3.25,-2.25])h(.76,.18,.46,b,7.91,-4.85,"linen",s);for(let b of[-3.8,-1.7])for(let U of[-5.25,-2.55])d([b,7.1,U],[b,9.25,U],.055,"wood",s),f(.09,b,9.3,U,"gold",s);h(2.3,.12,2.9,-2.75,9.29,-3.9,"red",s),O(.5,7.1,-4.8,1.5,.8),X(.5,7.1,-3.8),h(1.3,.65,.7,.65,7.46,-1.65,"wood",s),h(.16,.22,.06,.65,7.52,-1.25,"gold",s);for(let b=0;b<2;b++)for(let U=0;U<13;U++)h(.82,.25,.32,-4.65,.84+b*3.15+U*.24,-.65-U*.29,"wood",s);h(1.4,1.75,.8,5.13,1.6,-4.23,"rose",s),M(.85,1.1,.15,5.13,.77,-3.78,"dark",s),h(1.4,.12,1.02,5.13,1.2,-4.05,"trim",s),O(4.6,.77,-1.75,1.65,.9);for(let b=0;b<3;b++)f(.16,4.14+b*.4,1.77,-1.7,"gold",s).scale.set(.22,.12,.15);u(.42,.92,5.55,1.19,-.4,"wood",s);for(let b of[.8,1.15,1.55])u(.435,.055,5.55,b,-.4,"dark",s);u(.3,.07,5.55,1.68,-.4,"water",s),d([3.55,2.6,-4.13],[5.75,2.6,-4.13],.045,"wood",s);for(let b=0;b<4;b++)u(.17,.1,3.75+b*.5,2.24,-4.05,"dark",s),d([3.75+b*.5,2.3,-4.05],[3.75+b*.5,2.6,-4.05],.025,"dark",s);u(.85,.32,.1,.72,2.45,"rose"),u(.67,.06,.1,.9,2.45,"water"),u(.18,.7,.1,1.17,2.45,"trim"),f(.23,.1,1.58,2.45,"gold");for(let b of[-1,1]){h(1.3,.42,2.4,b*4.8,.76,2.15,"rose");for(let U=0;U<9;U++){const I=b*4.8+Math.sin(U*7)*.42,j=1.3+U%4*.52;f(.28,I,1.1,j,"leaf"),f(.13,I+.06,1.35,j,"red")}}for(let b=0;b<45;b++){const U=.8+b*.11,I=-5.63+Math.sin(b*.75)*.27;f(.12,I,U,-1.35+Math.sin(b*.8)*.17,"leaf")}for(let b of[-6.8,6.8])for(let U of[-6.7,4.3])for(let I=0;I<4;I++)h(.38,.22,.1,b-.5,.9+I*.64,U+1.21,"trim");function G(b){b.updateWorldMatrix(!0,!0);const U=b.matrixWorld.clone().invert(),I=new Map,j=[];b.traverse(K=>{if(!K.isMesh||K.userData.flag)return;let et=!1;for(let Nt=K.parent;Nt&&Nt!==b;Nt=Nt.parent)(Nt===e||Nt===n||Nt===s)&&(et=!0);if(et)return;const vt=K.geometry.clone().applyMatrix4(new oe().multiplyMatrices(U,K.matrixWorld)),yt=vt.index?vt.toNonIndexed():vt;I.has(K.material)||I.set(K.material,[]),I.get(K.material).push(yt),j.push(K)});for(const K of j)K.parent.remove(K);for(const[K,et]of I){const vt=wg(et,!1);if(!vt)continue;const yt=new ce(vt,K);yt.castShadow=!0,yt.receiveShadow=!0,b.add(yt)}}return G(e),G(n),G(s),G(t),{group:t,cutawayObjects:[e],roofs:[n],rooms:[{id:"hall",title:"宴会厅",position:[-1.8,1.7,-2.8]},{id:"library",title:"藏书室",position:[.1,4.85,-1.7]},{id:"bedroom",title:"卧房",position:[-2.5,8.05,-3.2]},{id:"kitchen",title:"厨房",position:[4.7,1.65,-1.6]},{id:"courtyard",title:"玫瑰庭院",position:[0,1.2,2.4]}],update(b){for(const U of x){const I=U.geometry.attributes.position;for(let j=0;j<I.count;j++){const K=I.getX(j);I.setZ(j,Math.sin(b*1.6+K*3)*.1*(K+.65))}I.needsUpdate=!0}}}}function Rg(i){const t=new $t;t.name="风眠岛 · 浮空地貌与田园",i.add(t);let e=12457;const n=()=>(e=e*1664525+1013904223>>>0)/4294967296,s=(D,z=.9)=>new be({color:D,roughness:z}),r={grass:s("#aabf85"),moss:s("#899d73"),paleGrass:s("#bdc795"),stone:s("#c7b6a0"),stoneLight:s("#dfcfb5"),cliff:s("#bdad99"),path:s("#dbcaa6"),wood:s("#94785c"),darkWood:s("#695b4d"),plaster:s("#f2dfbf"),plasterRose:s("#e6cbb4"),roof:s("#ac7566"),roofBlue:s("#7b9696"),trunk:s("#8c795e"),leaf:s("#91ad83"),leafLight:s("#b3c69a"),pine:s("#789989"),gold:s("#d7b66b"),wheat:s("#dcc081"),stems:s("#bcaa70"),water:new be({color:"#86c5c3",roughness:.32,metalness:.05,transparent:!0,opacity:.86,side:De}),waterFoam:new ua({color:"#e4f0db",transparent:!0,opacity:.68,depthWrite:!1}),window:new be({color:"#edcc84",emissive:"#bd7c37",emissiveIntensity:.13,roughness:.6}),pink:s("#d6a8a1"),flower:s("#efe3bf"),violet:s("#a7a0b7"),green:s("#6f8e69")},o={box:new Nn(1,1,1),sphere:new Bi(1,1),rock:new Bi(1,0),cylinder:new Ge(1,1,1,8),cone:new Kn(1,1,9)};function a(D,z,k,q=[1,1,1],Z=t,Mt=""){const at=new ce(D,z);return at.position.set(...k),at.scale.set(...q),at.castShadow=!0,at.receiveShadow=!0,Mt&&(at.name=Mt),Z.add(at),at}const l=(D,z,k,q=t)=>a(o.box,k,D,z,q),c=new Me,h=(D,z,k,q)=>{const Z=new Ou(D,z,k.length);return k.forEach((Mt,at)=>{c.position.set(...Mt.p),c.scale.set(...Mt.s||[1,1,1]),c.rotation.set(...Mt.r||[0,0,0]),c.updateMatrix(),Z.setMatrixAt(at,c.matrix)}),Z.castShadow=!0,Z.receiveShadow=!0,Z.name=q,t.add(Z),Z},u=(D,z)=>.025+.05*Math.sin(D*.41)*Math.cos(z*.36),f=64,d=Array.from({length:f},(D,z)=>{const k=z/f*Math.PI*2,q=1+.035*Math.sin(k*5+.8)+.025*Math.cos(k*9);return new F(Math.cos(k)*23*q,-.05+.12*Math.sin(k*7),Math.sin(k)*19*q)}),g=[],M=[],m=["#aabc86","#b0c18c","#b6c493","#a4b783","#bbc897"].map(D=>new Wt(D));function p(D,z,k,q){[D,z,k].forEach(Z=>{g.push(Z.x,Z.y,Z.z),M.push(q.r,q.g,q.b)})}for(let D=0;D<5;D++){const z=D/5,k=(D+1)/5;for(let q=0;q<f;q++){const Z=(q+1)%f,Mt=(mt,wt)=>{const ft=d[mt].clone().multiplyScalar(wt);return ft.y=u(ft.x,ft.z)+(wt===1?d[mt].y:0),ft},at=Mt(q,z),ct=Mt(Z,z),At=Mt(q,k),B=Mt(Z,k),dt=m[Math.floor(n()*m.length)];p(at,B,At,dt),D&&p(at,ct,B,dt)}}const T=new pe;T.setAttribute("position",new Yt(g,3)),T.setAttribute("color",new Yt(M,3)),T.computeVertexNormals(),a(T,new be({vertexColors:!0,roughness:1}),[0,0,0],[1,1,1],t,"连续的草甸表面");const S=[],x=[],C=[{r:1,y:-.12},{r:.98,y:-2},{r:.79,y:-6.5},{r:.63,y:-11.5},{r:.35,y:-17},{r:.035,y:-21}],R=["#c8b99d","#baa98f","#cabaa3","#b2a48d","#c8b9a1"],P=(D,z)=>{const k=d[D],q=C[z],Z=D/f*Math.PI*2;return new F(k.x*q.r+Math.sin(Z*3+z)*.28,q.y+Math.sin(Z*5+z)*(.08+z*.12),k.z*q.r)};for(let D=0;D<C.length-1;D++)for(let z=0;z<f;z++){const k=(z+1)%f,q=P(z,D),Z=P(k,D),Mt=P(z,D+1),at=P(k,D+1),ct=new Wt(R[D]).multiplyScalar(.94+n()*.12);[q,at,Mt,q,Z,at].forEach(At=>{S.push(At.x,At.y,At.z),x.push(ct.r,ct.g,ct.b)})}const N=new pe;N.setAttribute("position",new Yt(S,3)),N.setAttribute("color",new Yt(x,3)),N.computeVertexNormals(),a(N,new be({vertexColors:!0,roughness:1,flatShading:!0}),[0,0,0],[1,1,1],t,"悬垂的层状岩体");const y=[];for(let D=0;D<34;D++){const z=n()*Math.PI*2,k=.88+n()*.13;y.push({p:[Math.cos(z)*21.5*k,-1.7-n()*1.6,Math.sin(z)*17.8*k],s:[.65+n()*1.1,1.2+n()*2.1,.6+n()],r:[n(),n(),n()]})}h(o.rock,r.stone,y,"崖边的风化石");const _=s("#ad9e8a"),w=new Kn(1,1,6);[[15.5,-8.5,7.8,1.25,6.4],[-16.2,-8,4.5,1.5,6.2],[-12.8,-10.3,10.9,1.3,7.3],[8.5,-12.1,12.6,1.12,6.6],[17,-8.8,-5.2,1.2,6.1],[-10.5,-12.3,-12.8,1.1,6.7]].forEach(([D,z,k,q,Z],Mt)=>{a(w,_,[D,z,k],[q,Z,q*.82],t,"下垂的风化岩锥").rotation.set(.04*(Mt%3-1),Mt*.63,Math.PI+.055*(Mt%2?1:-1))});for(let D=0;D<9;D++){const z=D/9*Math.PI*2+.3,k=new F(Math.cos(z)*15,-4,Math.sin(z)*12),q=new jo([k,k.clone().add(new F(.6,-1.6,.4)),k.clone().add(new F(-.3,-3.8,.7)),k.clone().add(new F(-1,-5,.2))]);a(new ya(q,12,.065,5,!1),r.trunk,[0,0,0],[1,1,1],t,"探出岩壁的古树根")}function O(D,z,k,q,Z=.13){const Mt=new jo(D.map(mt=>new F(mt[0],mt[1]??Z,mt[2]))),at=[],ct=[],At=80;for(let mt=0;mt<=At;mt++){const wt=mt/At,ft=Mt.getPoint(wt),ot=Mt.getTangent(wt),Rt=new F(-ot.z,0,ot.x).normalize().multiplyScalar(z/2);if(at.push(ft.x+Rt.x,ft.y,ft.z+Rt.z,ft.x-Rt.x,ft.y,ft.z-Rt.z),mt<At){const zt=mt*2;ct.push(zt,zt+2,zt+1,zt+1,zt+2,zt+3)}}const B=new pe;return B.setAttribute("position",new Yt(at,3)),B.setIndex(ct),B.computeVertexNormals(),{obj:a(B,k,[0,0,0],[1,1,1],t,q),curve:Mt}}O([[0,.16,6.3],[0,.16,9],[-4,.16,10.5],[-8,.16,10],[-12,.16,8],[-15,.16,4]],1.25,r.path,"城门通向村庄的石灰小路"),O([[0,.15,9],[4,.15,10],[7,.15,8],[10,.15,6],[13,.15,6],[16,.15,7]],.9,r.path,"去风车与溪流的小径"),O([[-13,.14,7],[-15,.14,1],[-13,.14,-5],[-9,.14,-8]],.7,r.path,"林间小径");const X=[];for(let D=0;D<72;D++){const z=D/71,k=6.4+z*3.4;X.push({p:[(D%3-1)*.28,.18,k],s:[.23,.045,.16+n()*.14],r:[0,n()*.2,0]})}h(o.rock,r.stoneLight,X,"城门前的小块铺路石"),a(new Vi(1,24,12),r.paleGrass,[12.2,-.7,-9.4],[6.8,2.4,5.3],t,"针叶林下的小丘");const G=[];for(let D=0;D<44;D++){const z=n()*Math.PI*2,k=.72+n()*.21,q=Math.cos(z)*23*k,Z=Math.sin(z)*19*k;q>10&&Z>8||G.push({p:[q,.25+n()*.3,Z],s:[.28+n()*.7,.3+n()*.6,.35+n()*.8],r:[n(),n()*6,n()]})}h(o.rock,r.stoneLight,G,"草地上的圆润石头");const Y=[],b=[],U=[],I=[],j=[];function K(D,z,k=3.2){const q=u(D,z),Z=k/3.2;Y.push({p:[D,q+k*.34,z],s:[.16*Z,k*.68,.16*Z],r:[0,n()*6,.04]}),b.push({p:[D,q+k*.79,z],s:[1.15*Z,1.14*Z,1.08*Z],r:[n(),n(),n()]}),U.push({p:[D-.6*Z,q+k*.72,z+.15*Z],s:[.85*Z,.82*Z,.84*Z],r:[n(),n(),n()]}),n()>.6&&U.push({p:[D+.58*Z,q+k*.89,z-.2*Z],s:[.76*Z,.83*Z,.76*Z],r:[n(),n(),n()]})}function et(D,z,k=4,q=0){I.push({p:[D,q+k*.35,z],s:[.11,k*.7,.11]});for(let Z=0;Z<3;Z++)j.push({p:[D,q+k*(.38+Z*.21),z],s:[k*(.28-Z*.05),k*.55,k*(.28-Z*.05)],r:[0,n()*6,0]})}[[-18,0],[-18,-4],[-16,-7],[-13,-11],[-10,-12],[-17,10],[-14,13],[-9,14],[-6,15],[5,15],[2,16],[-20,3],[-19,7],[-14,-2]].forEach(([D,z])=>K(D,z,2.7+n()*1.4));for(let D=0;D<28;D++){const z=8+n()*10,k=-13+n()*10;if((z/22)**2+(k/18)**2>.88||z<9&&k>-9||z>15&&k>-10)continue;const q=Math.max(0,1.5*(1-((z-12.2)/6.8)**2-((k+9.4)/5.3)**2));et(z,k,2.5+n()*2,q)}for(let D=0;D<12;D++){const z=-20+n()*8,k=-11+n()*8;(z/23)**2+(k/19)**2<.85&&et(z,k,3+n()*1.6)}h(o.cylinder,r.trunk,Y,"果园和草甸中的树干"),h(o.sphere,r.leaf,b,"鼠尾草绿的圆叶树冠"),h(o.sphere,r.leafLight,U,"柔亮的树叶"),h(o.cylinder,r.trunk,I,"松林树干"),h(o.cone,r.pine,j,"层层叠叠的松树");const vt=[[],[],[]],yt=[];for(let D=0;D<820;D++){const z=(n()-.5)*43,k=(n()-.5)*35;if((z/22)**2+(k/18)**2>.9||Math.abs(z)<8.5&&k<7&&k>-10||z>7&&k>8||z>10&&k<-4||Math.abs(k-10)<1.1&&z>-13&&z<7)continue;const q=u(z,k),Z=.1+n()*.16;vt[D%3].push({p:[z,q+Z,k],s:[.065+n()*.035,.06,.065+n()*.035],r:[0,n()*6,0]}),D%3===0&&yt.push({p:[z,q+.12,k],s:[.035,.26,.04],r:[0,n()*6,.15]})}[r.flower,r.pink,r.violet].forEach((D,z)=>h(o.sphere,D,vt[z],["雏菊","野蔷薇","蓝色小花"][z])),h(o.cone,r.green,yt,"纤细的草叶");function Nt(D,z,k,q){const Z=new Fi;return Z.moveTo(-D/2,k),Z.lineTo(0,q),Z.lineTo(D/2,k),Z.closePath(),new vs(Z,{depth:z,bevelEnabled:!1,steps:1})}function jt(D,z,k,q,Z,Mt=!1){const at=new $t;at.name="半木构的田园小屋",at.position.set(D,.12,z),at.rotation.y=q,at.scale.setScalar(k),t.add(at),l([0,.9,0],[2.5,1.8,2.8],Mt?r.plasterRose:r.plaster,at),a(Nt(3.05,3.4,1.85,3.2),Z,[0,0,-1.7],[1,1,1],at);for(const ct of[-1.2,0,1.2])l([ct,.9,1.414],[.105,1.8,.07],r.darkWood,at);for(const ct of[.12,.85,1.75])l([0,ct,1.43],[2.5,.085,.09],r.darkWood,at);for(const ct of[-.6,.6]){const At=l([ct,1.3,1.45],[.07,1.05,.07],r.wood,at);At.rotation.z=ct>0?-.6:.6}l([0,.63,1.48],[.55,1.12,.1],r.wood,at),l([.12,.63,1.55],[.04,.07,.04],r.gold,at);for(const ct of[-.8,.8]){l([ct,1.19,1.49],[.43,.5,.08],r.darkWood,at),l([ct,1.2,1.54],[.32,.38,.03],r.window,at),l([ct,1.2,1.565],[.035,.4,.025],r.wood,at),l([ct,1.2,1.565],[.35,.035,.025],r.wood,at),l([ct,.89,1.57],[.56,.15,.23],r.wood,at);for(let At=0;At<3;At++)a(o.sphere,At%2?r.pink:r.green,[ct-.16+At*.16,.99,1.59],[.13,.12,.12],at)}l([0,2.32,1.72],[.1,1.03,.08],r.wood,at),l([0,1.91,1.72],[2.75,.1,.09],r.wood,at);for(const ct of[-1,1]){const At=l([ct*.63,2.46,1.72],[.075,1.68,.08],r.wood,at);At.rotation.z=ct*.79}l([.75,2.65,-.55],[.37,1.43,.42],r.stoneLight,at),l([.75,3.37,-.55],[.49,.13,.53],r.stone,at),l([0,.08,1.9],[.9,.15,.65],r.stoneLight,at);for(let ct=0;ct<6;ct++){const At=2+ct*.18,B=2.7*(1-(At-1.85)/1.4),dt=l([0,At+.035,0],[Math.max(.1,B),.035,3.43],Z,at);dt.material=Z}return at}jt(-12.5,5.5,1.05,-.15,r.roof,!1),jt(-10.5,11,.83,-.2,r.roofBlue,!0),jt(-16,4,.8,.55,r.roof,!1);const nt=new $t;nt.position.set(-9.2,.18,7.6),t.add(nt),nt.name="村口的石井",a(new Ge(.6,.66,.64,16,1,!0),r.stoneLight,[0,.32,0],[1,1,1],nt),a(new Ge(.52,.52,.04,16),r.water,[0,.13,0],[1,1,1],nt);for(const D of[-1,1])l([D*.7,1,0],[.1,1.5,.12],r.wood,nt);a(Nt(1.9,1.35,1.7,2.25),r.roof,[0,0,-.675],[1,1,1],nt);const ht=a(o.cylinder,r.wood,[0,1.15,0],[.07,1.6,.07],nt);ht.rotation.z=Math.PI/2,a(o.cylinder,r.wood,[.2,.75,0],[.2,.27,.2],nt),l([.2,1.02,0],[.025,.4,.025],r.darkWood,nt);const bt=new Fi;bt.moveTo(6.7,8.3),bt.quadraticCurveTo(10,7.6,12.9,9),bt.lineTo(12.7,13.1),bt.quadraticCurveTo(10,14,7,12.5),bt.closePath();const Pt=new xa(bt,16);Pt.rotateX(-Math.PI/2),Pt.scale(1,1,-1),Pt.computeVertexNormals(),a(Pt,new be({color:"#b8aa76",roughness:1,side:De}),[0,.14,0],[1,1,1],t,"金黄的麦田");const Lt=[],Zt=[];for(let D=0;D<15;D++)for(let z=0;z<28;z++){const k=7.05+z*.205+(n()-.5)*.11,q=8.65+D*.28+(n()-.5)*.14;if(q<8.7+.09*(k-9)**2||q>13.1-.06*(k-9.5)**2)continue;const Z=.47+n()*.2,Mt=(n()-.5)*.2;Lt.push({p:[k,.18+Z*.5,q],s:[.013,Z,.013],r:[Mt,0,Mt]}),Zt.push({p:[k+Math.sin(Mt)*Z,.18+Z,q],s:[.045,.18,.052],r:[Mt,0,Mt]})}h(o.cylinder,r.stems,Lt,"麦田里细细的麦秆"),h(o.sphere,r.wheat,Zt,"成熟的麦穗");function ee(D){const z=[],k=[];for(let q=0;q<D.length;q++){const[Z,Mt]=D[q];if(k.push({p:[Z,.52,Mt],s:[.09,.94,.09]}),q){const[at,ct]=D[q-1],At=Z-at,B=Mt-ct,dt=Math.hypot(At,B),mt=Math.atan2(-B,At);for(const wt of[.4,.72])z.push({p:[(Z+at)/2,wt,(Mt+ct)/2],s:[dt,.065,.07],r:[0,mt,0]})}}h(o.box,r.wood,k,"围栏立柱"),h(o.box,r.wood,z,"田间木围栏")}ee([[6.5,8.1],[8,7.95],[9.5,8],[11,8.2],[12.7,8.6]]),ee([[6.6,8.2],[6.6,9.7],[6.6,11.2],[6.6,12.6],[8.2,13.1],[9.8,13.4],[11.4,13.2],[12.8,12.9]]);const L=new $t;L.position.set(12.7,.15,3.3),L.rotation.y=-.3,L.name="四叶风车磨坊",t.add(L),a(new Ge(.7,1.1,4.5,14),r.plaster,[0,2.25,0],[1,1,1],L),a(new Kn(1.06,1.6,14),r.roofBlue,[0,5.05,0],[1,1,1],L),l([0,.7,1.03],[.55,1.3,.09],r.wood,L);for(const D of[2.1,3.15])l([.22,D,.91],[.31,.48,.08],r.window,L);const lt=new $t;lt.position.set(0,3.5,1.01),L.add(lt);for(let D=0;D<4;D++){const z=new $t;z.rotation.z=D*Math.PI/2,lt.add(z),l([0,1.24,0],[.075,2.6,.075],r.darkWood,z),l([.19,1.61,-.02],[.49,1.7,.035],r.plaster,z);for(let k=0;k<5;k++)l([.19,.9+k*.34,.015],[.55,.035,.055],r.wood,z);l([.45,1.6,.015],[.045,1.75,.055],r.wood,z)}a(o.sphere,r.gold,[0,0,.07],[.16,.16,.16],lt);const rt=new $t;rt.position.set(6.4,.2,12.9),t.add(rt);for(let D=0;D<3;D++)a(o.sphere,r.wheat,[(D-1)*.47,.35,0],[.48,.42,.42],rt);const st=[[16.4,.18,-12.5],[18.1,.18,-8],[17.8,.18,-3],[16.3,.18,1],[16.9,.18,5.5],[15.2,.18,9.8],[15.1,.18,13.8]],{curve:it}=O(st,1.15,r.water,"青绿色的蜿蜒溪流"),St=[];for(let D=0;D<55;D++){const z=D/54,k=it.getPoint(z),q=it.getTangent(z),Z=D%2?1:-1,Mt=k.x-q.z*.69*Z,at=k.z+q.x*.69*Z;St.push({p:[Mt,.19,at],s:[.2+n()*.2,.12+n()*.12,.23+n()*.23],r:[n(),n()*6,n()]})}h(o.rock,r.stoneLight,St,"溪流岸边的鹅卵石");const pt=[];for(let D=0;D<13;D++){const z=it.getPoint((D+.5)/14),k=a(new va(.12,.135,18),r.waterFoam,[z.x,.203,z.z],[1,1,1],t,"溪水的涟漪");k.rotation.x=-Math.PI/2,k.scale.set(.9,.45,1),k.castShadow=!1,pt.push(k)}const xt=new $t;xt.position.set(16.55,.22,5.4),xt.rotation.y=.13,t.add(xt),xt.name="跨溪的木拱桥";for(let D=0;D<13;D++){const z=-1.8+D*.3,k=.24+Math.sin(D/12*Math.PI)*.4;if(l([z,k,0],[.285,.13,1.1],r.wood,xt),D%3===0){for(const q of[-1,1])if(l([z,k+.43,q*.52],[.07,.8,.075],r.darkWood,xt),D<12){const Z=.24+Math.sin((D+3)/12*Math.PI)*.4,Mt=l([z+.45,(k+Z)/2+.78,q*.52],[.93,.065,.065],r.wood,xt);Mt.rotation.z=Math.atan2(Z-k,.9)}}}const Ht=new $t;Ht.position.set(15.1,0,13.85),t.add(Ht),Ht.name="从岛沿落入云海的瀑布";const Bt=r.water.clone();Bt.opacity=.6,Bt.side=De,Bt.depthWrite=!1;const A=new ni(1.18,24,5,48),v=A.attributes.position;for(let D=0;D<v.count;D++){const z=v.getY(D);v.setZ(D,.1*Math.sin(z*.8+v.getX(D)*2)),v.setX(D,v.getX(D)*(1+(12-z)*.011))}A.computeVertexNormals(),a(A,Bt,[0,-11.85,.26],[1,1,1],Ht).castShadow=!1;const W=[];for(let D=0;D<9;D++){const z=a(new ni(.035+n()*.045,16+n()*6),r.waterFoam,[(D-4)*.13,-11-n()*1.6,.39+n()*.05],[1,1,1],Ht);z.castShadow=!1,W.push(z)}const Q=[];for(let D=0;D<24;D++)Q.push({p:[15.1+(n()-.5)*1.9,-22.4-n()*1.6,14.1+(n()-.5)*1.1],s:[.07+n()*.12,.1+n()*.17,.07+n()*.1]});const ut=h(o.sphere,r.waterFoam,Q,"坠落的瀑布水雾");ut.castShadow=!1;const tt=new $t;tt.position.set(-5.4,.16,14.5),tt.rotation.y=-.15,t.add(tt),tt.name="面向云海的长椅";for(const D of[-.65,.65])l([D,.33,0],[.12,.66,.62],r.darkWood,tt);for(let D=0;D<3;D++)l([0,.64,-.22+D*.23],[1.9,.08,.16],r.wood,tt);for(let D=0;D<2;D++)l([0,.96+D*.18,-.36],[1.9,.12,.07],r.wood,tt);for(const D of[-.65,.65])l([D,.9,-.37],[.08,.82,.08],r.darkWood,tt);const Dt=[];for(let D=0;D<3;D++){l([-13.2,.14,10.2+D*.4],[2.2,.1,.27],r.cliff);for(let z=0;z<8;z++)Dt.push({p:[-14.15+z*.27,.31,10.2+D*.4],s:[.13,.18,.13],r:[n(),n()*6,n()]})}return h(o.sphere,r.green,Dt,"小屋旁的卷心菜"),{group:t,landmarks:[{id:"village",title:"风铃村落",position:[-12.3,1.6,7]},{id:"fields",title:"金色麦田",position:[9.3,.9,10.8]},{id:"forest",title:"低语松林",position:[12.3,2,-9.6]},{id:"waterfall",title:"云端瀑布",position:[15.1,-3,13.9]},{id:"mill",title:"四叶风车",position:[12.7,3.7,3.3]}],update(D){lt.rotation.z=-D*.13,pt.forEach((z,k)=>{const Z=.5+(D*.28+k*.19)%1*.8;z.scale.set(Z,Z*.45,1),z.material.opacity=.48}),W.forEach((z,k)=>{z.position.y=-11.1-Math.sin(D*.8+k)*.42-k*.04}),ut.position.y=-(D*.65%1)}}}function Cg(i){const t=new $t;t.name="岛上的居民与小动物",i.add(t);const e={sphere:new Vi(1,10,8),cylinder:new Ge(1,1,1,10),cone:new Kn(1,1,10),box:new Nn(1,1,1),tunic:new Ge(.19,.26,.53,10),skirt:new Ge(.17,.34,.66,12)},s=Object.fromEntries(Object.entries({skin:"#e8bd98",skinRose:"#d7a58b",hair:"#735b4c",silver:"#d6d0bb",wheat:"#ddbb69",blue:"#547b95",sage:"#7e9b78",cream:"#f0e5c9",rose:"#be8680",plum:"#817891",leather:"#705c47",ink:"#434f54",brass:"#bf9a57",wood:"#957455",white:"#eee8d9",fox:"#c99264"}).map(([_,w])=>[_,new be({color:w,roughness:.9,metalness:_==="brass"?.3:0})])),r=_=>s[_]||s.cream;function o(_,w,O,X,G,Y){const b=new ce(e[w],r(O));return b.position.set(...X),G&&b.scale.set(...G),Y&&b.rotation.set(...Y),b.castShadow=!0,b.receiveShadow=!0,_.add(b),b}function a(_,w,O,X,G){const Y=new F(...w),b=new F(...O),U=o(_,"cylinder",G,Y.clone().add(b).multiplyScalar(.5).toArray(),[X,Y.distanceTo(b),X]);return U.quaternion.setFromUnitVectors(new F(0,1,0),b.sub(Y).normalize()),U}function l(_,w,O="rose",X=0){const G=new $t;return G.position.set(...w),G.rotation.y=X,o(G,"box",O,[0,0,0],[.29,.36,.09]),o(G,"box","cream",[.01,0,.055],[.24,.3,.025]),_.add(G),G}const c=[],h=[];function u({id:_,name:w,role:O,description:X,position:G,color:Y="blue",hair:b="hair",dress:U=!1,rotation:I=0,prop:j}){const K=new $t;K.name=`${w} · ${O}`,K.userData.characterId=_,K.position.set(...G),K.rotation.y=I,t.add(K);const et=new $t;et.name="衣袍与呼吸",K.add(et),o(et,U?"skirt":"tunic",Y,[0,U?.62:.68,0]),o(et,"cylinder","cream",[0,.98,0],[.115,.12,.115]),o(et,"sphere","skin",[0,1.19,.015],[.183,.218,.175]),o(et,"sphere",b,[0,1.31,-.03],[.19,.13,.177]),o(et,"sphere","skin",[0,1.175,.185],[.033,.043,.035]),[-1,1].forEach(yt=>{o(et,"sphere","ink",[yt*.064,1.22,.164],[.013,.016,.009]),U||a(K,[yt*.12,.45,0],[yt*.12,.1,.025],.075,"leather"),o(K,"sphere","leather",[yt*.115,.08,.07],[.093,.08,.16]),a(et,[yt*.2,.89,0],[yt*.29,.6,.08],.076,Y),o(et,"sphere","skin",[yt*.29,.58,.08],[.068,.074,.065])}),o(et,"cylinder","leather",[0,.57,0],[.252,.048,.252]),o(et,"box","brass",[0,.57,.247],[.07,.055,.018]),j&&j(K,et),h.push({torso:et,phase:c.length*1.7});const vt={id:_,name:w,role:O,description:X,position:[...G]};return K.userData.character=vt,c.push(vt),K}const d=u({id:"traveler",name:"里昂",role:"收集故事的旅人",position:[.1,.18,9.2],color:"blue",hair:"wheat",rotation:-.5,description:"蓝色短袍、金色围巾，是里昂所有的行李。他沿着石阶走来，把路上的故事换成面包；黄昏时，喜欢坐在岛边数慢慢飘过的云。",prop(_,w){o(w,"cylinder","wheat",[0,.99,0],[.16,.095,.16]),o(w,"box","wheat",[-.22,.88,-.045],[.4,.085,.035],[.1,0,-.2]),o(w,"sphere","leather",[-.26,.58,-.17],[.12,.16,.09]),a(w,[-.18,.92,.04],[.17,.61,.17],.022,"leather")}}).children[0].children.find(_=>_.geometry===e.box&&_.material===r("wheat"));u({id:"astronomer",name:"阿德里安",role:"庭院里的观星人",position:[-1.15,.56,3.4],color:"plum",hair:"silver",rotation:.65,description:"阿德里安白天记录风向，夜晚在塔顶校准星盘。他说城堡没有锚，星辰就是航标；庭院里的铜望远镜一直朝着最早亮起的那颗星。",prop(_,w){o(w,"cone","plum",[0,1.5,-.015],[.21,.44,.21],[0,0,.06]),o(w,"sphere","silver",[0,1.1,.15],[.11,.17,.07]),o(w,"sphere","brass",[-.08,1.56,.175],[.026,.026,.014]);const O=new $t;O.position.set(-.72,0,.25),a(O,[0,.87,0],[-.29,0,.22],.025,"wood"),a(O,[0,.87,0],[.3,0,.23],.025,"wood"),a(O,[0,.87,0],[0,0,-.29],.025,"wood"),a(O,[0,.89,-.22],[0,1.13,.42],.085,"brass"),_.add(O)}}),u({id:"gardener",name:"艾拉",role:"照看玫瑰的园丁",position:[-9.1,.06,1.3],color:"sage",dress:!0,hair:"hair",rotation:-.3,description:"艾拉照看着城墙边的藤蔓和岛上的小花。她用溪水浇灌玫瑰，把落叶堆成肥料，还给每一株被风吹歪的小树系上柔软的布带。",prop(_,w){o(w,"cylinder","wheat",[0,1.39,0],[.32,.055,.32]),o(w,"cone","wheat",[0,1.47,0],[.2,.18,.2]),o(w,"cylinder","blue",[.39,.48,.1],[.11,.22,.11]),a(w,[.42,.51,.09],[.58,.6,.19],.035,"blue"),a(w,[.33,.6,.1],[.43,.67,.1],.02,"blue")}}),u({id:"baker",name:"玛尔塔",role:"晨光面包师",position:[-11.75,.07,7.2],color:"rose",dress:!0,hair:"hair",rotation:.6,description:"玛尔塔在村舍的石炉里烤黑麦面包。麦田、风车和厨房沿着同一条小路相连；每天第一炉出炉时，她会给守门人和早起的牧羊人留一份。",prop(_,w){o(w,"box","cream",[0,.68,.245],[.31,.43,.025]),o(w,"sphere","cream",[0,1.43,0],[.24,.14,.21]),o(w,"box","wood",[.3,.67,.3],[.45,.03,.33]),[-.08,.08].forEach(O=>o(w,"sphere","wheat",[.3+O,.73,.3],[.075,.06,.13]))}}),u({id:"shepherd",name:"诺埃",role:"草坡上的牧羊人",position:[2.1,.08,12],color:"sage",hair:"wheat",rotation:-.45,description:"诺埃记得每一只羊的铃声。他带着羊群在草坡慢慢走，木杖上刻着一年里的风向；靠近岛缘时，他总会先替最小的那只羊挡住风。",prop(_,w){o(w,"cylinder","leather",[0,1.38,0],[.25,.06,.25]),o(w,"sphere","leather",[0,1.42,0],[.18,.11,.17]),a(_,[.42,.02,.09],[.42,1.45,.09],.025,"wood"),a(_,[.42,1.45,.09],[.51,1.5,.09],.025,"wood")}}),u({id:"librarian",name:"塞西尔",role:"藏书室的守书人",position:[1.9,3.84,-1.1],color:"rose",dress:!0,hair:"silver",rotation:.35,description:"塞西尔把航海图、草药图谱和旅人的书信分类收好。藏书室厚重的石墙能挡住潮气，窗边的小桌则留给每一个想写信的人。",prop(_,w){o(w,"sphere","silver",[.15,1.31,-.12],[.11,.1,.11]),l(w,[.26,.78,.19],"blue",-.3),[-.064,.064].forEach(O=>o(w,"cylinder","brass",[O,1.22,.179],[.039,.012,.039],[Math.PI/2,0,0]))}}),u({id:"guard",name:"奥斯卡",role:"钟楼下的守门人",position:[3,.08,6.5],color:"blue",hair:"hair",rotation:-.2,description:"奥斯卡负责吊桥、城门和傍晚的钟声。他的长矛更多用来挑起飘落的旗绳；熟悉每一位居民的脚步，也给远来的客人指一条去面包房的路。",prop(_,w){o(w,"sphere","silver",[0,1.36,-.015],[.2,.13,.19]),o(w,"box","silver",[0,.8,.2],[.27,.29,.065]),a(_,[.43,.03,.1],[.43,1.7,.1],.023,"wood"),o(_,"cone","silver",[.43,1.8,.1],[.065,.22,.04]),o(w,"sphere","blue",[-.28,.68,.11],[.12,.23,.045]),o(w,"box","brass",[-.28,.68,.16],[.03,.23,.01])}}),u({id:"painter",name:"露西",role:"溪边的小画家",position:[10.4,.1,8.7],color:"plum",hair:"hair",rotation:-.75,description:"露西喜欢把城堡画得比实际更高一点，把瀑布画得比实际更轻一点。她在木桥旁调颜色，画纸上最常出现的，是夕阳里的蓝屋顶。",prop(_,w){o(w,"sphere","plum",[.03,1.39,0],[.23,.075,.2],[0,0,-.2]),o(w,"sphere","wood",[-.3,.64,.15],[.14,.025,.11],[.2,0,.2]),o(w,"sphere","rose",[-.33,.67,.16],[.033,.012,.025]),o(w,"sphere","blue",[-.24,.66,.17],[.027,.012,.025]),a(w,[.28,.57,.08],[.35,.93,.14],.012,"wood")}});const g=[];function M(_,w,O,X){const G=new $t;G.name="戴着铜铃的小绵羊",G.position.set(_,.07,w),G.scale.setScalar(X),G.rotation.y=O,t.add(G),o(G,"sphere","white",[0,.48,0],[.36,.28,.47]),o(G,"sphere","white",[.17,.56,.06],[.23,.2,.25]),o(G,"sphere","white",[-.17,.56,.06],[.23,.2,.25]),o(G,"sphere","leather",[0,.57,.42],[.15,.17,.2]),[-1,1].forEach(Y=>{o(G,"sphere","leather",[Y*.18,.6,.4],[.12,.04,.06],[0,0,Y*.3]);for(const b of[-.23,.25])a(G,[Y*.2,.37,b],[Y*.2,.04,b],.047,"leather")}),o(G,"sphere","brass",[0,.39,.4],[.05,.055,.05]),o(G,"sphere","white",[0,.51,-.45],[.1,.1,.13]),g.push({animal:G,phase:g.length*2.1})}M(3.65,11.1,-.8,1),M(.8,13.2,.5,.85),M(4,13,2,.66);const m=new $t;m.name="松林边的小狐狸";const p=-.7+2.4*Math.sqrt(1-((10.5-12.2)/6.8)**2-((-7+9.4)/5.3)**2);m.position.set(10.5,p+.035,-7),m.rotation.y=-.7,t.add(m),o(m,"sphere","fox",[0,.39,0],[.2,.26,.43]),o(m,"sphere","fox",[0,.68,.27],[.21,.22,.23]),o(m,"cone","cream",[0,.6,.47],[.14,.26,.13],[Math.PI/2,0,0]),[-1,1].forEach(_=>{o(m,"cone","fox",[_*.14,.91,.25],[.1,.29,.09],[0,0,_*-.15]),o(m,"sphere","ink",[_*.09,.71,.46],[.018,.02,.012]),a(m,[_*.13,.35,.18],[_*.13,.04,.23],.045,"leather")}),o(m,"sphere","ink",[0,.6,.61],[.035,.031,.025]);const T=o(m,"sphere","fox",[.25,.24,-.47],[.16,.15,.42],[0,-.7,0]);o(m,"sphere","cream",[.49,.24,-.73],[.11,.12,.19],[0,-.7,0]);const S=[],x=new pe;x.setAttribute("position",new Yt([0,0,0,.64,.05,-.16,.4,0,-.34],3)),x.computeVertexNormals();const C=new be({color:"#ded9c8",roughness:.95,side:De});for(let _=0;_<7;_++){const w=new $t;w.name="掠过塔楼的飞鸟",o(w,"sphere","cream",[0,0,0],[.08,.075,.24]);const O=new ce(x,C),X=new ce(x,C);X.scale.x=-1,w.add(O,X);const G=.75+_%3*.12;w.scale.setScalar(G),t.add(w),S.push({bird:w,left:O,right:X,phase:_*.87,radius:17+_*.65,height:13+_*.8})}const R=[],P=new pa(.09,8),N=["#d9af74","#cca3a9","#c5d1a0"].map(_=>new be({color:_,side:De,roughness:1}));for(let _=0;_<9;_++){const w=new $t,O=new ce(P,N[_%3]),X=new ce(P,N[_%3]);O.position.x=-.065,X.position.x=.065,w.add(O,X),t.add(w),R.push({butterfly:w,wingA:O,wingB:X,phase:_*1.3,x:-8+_%3*7,z:8+Math.floor(_/3)*2.2})}function y(_){for(const{torso:w,phase:O}of h)w.position.y=Math.sin(_*1.35+O)*.012;d&&(d.rotation.z=-.2+Math.sin(_*2)*.08);for(const{animal:w,phase:O}of g)w.rotation.z=Math.sin(_*.8+O)*.025;T.rotation.z=Math.sin(_*1.1)*.1;for(const{bird:w,left:O,right:X,phase:G,radius:Y,height:b}of S){const U=_*.065+G;w.position.set(Math.cos(U)*Y,b+Math.sin(_*.6+G)*.35,Math.sin(U)*Y*.67),w.rotation.y=-U,O.rotation.z=Math.sin(_*3.2+G)*.24,X.rotation.z=-O.rotation.z}for(const{butterfly:w,wingA:O,wingB:X,phase:G,x:Y,z:b}of R)w.position.set(Y+Math.sin(_*.35+G)*.8,1.1+Math.sin(_*.65+G)*.35,b+Math.cos(_*.45+G)*.6),w.rotation.y=_*.3+G,O.rotation.y=Math.sin(_*9+G)*.85,X.rotation.y=-O.rotation.y}return{group:t,update:y,characters:c}}const Ut=i=>document.querySelector(i),Jl={sound:'<path d="m9 5-4 4H2v6h3l4 4Z"/><path d="M13 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',mute:'<path d="m9 5-4 4H2v6h3l4 4Z"/><path d="m14 9 6 6m0-6-6 6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.4 8.5a2.7 2.7 0 0 1 5.2 1c0 1.8-2.6 2.1-2.6 4M12 17h.01"/>',fullscreen:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',sun:'<circle cx="12" cy="12" r="3.7"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',sunset:'<path d="M3 16h18M5 20h14M6 16a6 6 0 0 1 12 0M12 2v3M3 6l2 2m16-2-2 2"/>',moon:'<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/><path d="m18 2 .7 2.3L21 5l-2.3.7L18 8l-.7-2.3L15 5l2.3-.7Z"/>',plus:'<path d="M5 12h14M12 5v14"/>',minus:'<path d="M5 12h14"/>',home:'<path d="m3 11 9-8 9 8M6 9v11h12V9m-9 11v-7h6v7"/>',camera:'<path d="M8 5 6 8H3v12h18V8h-3l-2-3Z"/><circle cx="12" cy="13" r="3.5"/>',orbit:'<ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-35 12 12)"/><circle cx="12" cy="12" r="3"/><path d="m17 3 2 1 1 2"/>',castle:'<path d="M3 21V9h4v3h3V5h4v7h3V9h4v12ZM3 9V5h4v4m10 0V5h4v4m-11-4V2h4v3M10 21v-5h4v5"/>',house:'<path d="m2 11 10-9 10 9M5 9v12h14V9m-9 12v-7h4v7M7 11h1m8 0h1"/>',leaf:'<path d="M20 3C9 2 2 7 4 14c2 8 15 6 16-11ZM5 20 16 8M9 16v-5m0 5h5"/>',layers:'<path d="m12 3 10 6-10 6L2 9Zm-10 11 10 6 10-6M2 19l10 6 10-6" transform="translate(0 -2)"/>',rotate:'<path d="M20 8a8 8 0 1 0 0 8M20 3v5h-5"/>',pause:'<path d="M8 5v14M16 5v14"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>'},Es=i=>`<svg viewBox="0 0 24 24" aria-hidden="true">${Jl[i]||Jl.orbit}</svg>`;for(const[i,t]of Object.entries({sound:"mute","help-button":"help",fullscreen:"fullscreen","day-icon":"sun","zoom-in":"plus","zoom-out":"minus",home:"home",capture:"camera","close-journal":"close","rotate-icon":"rotate"}))Ut(`#${i}`).innerHTML=Es(t);document.querySelectorAll("[data-icon]").forEach(i=>i.innerHTML=Es(i.dataset.icon));const ls=[{id:"castle",title:"云端城堡",number:"01",subtitle:"石头记得风，窗户收集星光。",position:[0,11,-2],camera:[25,19,29],target:[0,5,-2],type:"城堡 · 岛屿中央",text:"奶油色的石灰岩城墙沿着岛屿的高地展开。尖塔、垛口与狭长的拱窗来自中世纪欧洲城堡的建筑语言；蓝灰色和陶红色的高屋顶，则像几顶被风轻轻吹歪的帽子。",details:[["从城门开始","穿过双塔守望的拱形门洞，是一座小庭院。低矮的石栏围住喷泉，旗帜在塔尖迎风；城墙上的女儿墙和垛口，把庭院与外面的云海分开。"],["一座有生活的城堡","城堡的下层安排宴会厅和厨房，中层收纳藏书，上层是安静的寝室。木楼梯连起楼层，壁炉、长桌、书架、床帐与地毯，让坚固的外壳里面有了温度。"],["把城堡轻轻打开","点击下方「打开城堡」，屋顶与朝向庭院的外墙会隐去。再切换到「城堡里面」，就能逐间飞近，观察家具和楼层。"]]},{id:"village",title:"风铃村落",number:"02",subtitle:"面包的香气，比钟声醒得早。",position:[-13,3,7],camera:[-23,12,24],target:[-12,1.5,7],type:"村落 · 岛屿西南",text:"几间半木构小屋挤在石径两边。浅色灰泥填在深色木梁之间，斜屋顶下藏着小阁楼，烟囱把厨房的暖意送到风里。村落虽小，也有水井、柴堆和等人回家的灯。",details:[["沿着石径散步","弯曲的小路把城门、村舍与田野连在一起。井水供给日常生活，门前的盆栽与木栅栏，划出每户人家柔软的边界。"],["住在这里的人","面包师玛尔塔天亮前就开始揉面；园丁艾拉带着水壶照看花圃。他们并不急着抵达什么地方，今天的工作本身，就是好日子的一部分。"]]},{id:"nature",title:"林间与溪流",number:"03",subtitle:"河流在岛的边缘，学会了飞翔。",position:[15,3,11],camera:[29,14,29],target:[13,0,9],type:"水系 · 岛屿东岸",text:"一条蓝绿色的溪流从松林旁流过，绕开草坡和卵石，穿过木桥，在浮空岛的边缘跌落成一束长长的瀑布。水汽散进云海，仿佛下一场雨正在这里开始。",details:[["从高地到云海","地面不是一块平板：草地、微微起伏的丘陵、裸露的岩缘与下方层叠的岩体，构成完整的悬浮地貌。溪岸的石块和花丛，让水流有了可以停留的边缘。"],["一片会呼吸的林地","针叶树留在较高的坡地，阔叶树伸向村落。林间有狐狸和蝴蝶，抬头还能见到盘旋的飞鸟。请把视角转到岛屿下方，看看根须与岩石怎样拥抱。"]]},{id:"fields",title:"金色麦田",number:"04",subtitle:"风翻过麦浪，也翻过日历。",position:[10,1.5,12],camera:[20,9,25],target:[10,1,10],type:"田野 · 岛屿东南",text:"暖金色的麦田沿着缓坡铺开，木栅栏留下整齐而不生硬的边界。田边的风车慢慢转动，远处是草地上的羊群和牧羊人。这里把丰收画得很小，把午后的时间留得很长。",details:[["风车与田埂","高处的风被帆叶接住；木桥和土路连接两岸。金黄的麦穗、淡紫色的野花与蓝绿的溪流，组成岛上最温暖的一页。"],["抬头看天","这座小王国不遵循现实的地图。它是一幅以中世纪乡野为灵感的原创童话，漂浮的岩体、永远流动的水和看得见的星光，都属于它自己的想象。"]]}],xs={hall:{title:"烛光宴会厅",floor:"一层",function:"会客与共同用餐",subtitle:"长桌的尽头，总为晚到的人留着位置。",text:"宴会厅是城堡最公共的房间。厚石墙和木梁支撑起宽阔空间，长桌、座椅、暖色地毯与壁炉安排出清晰的生活中心。白天的光穿过拱窗，夜晚则由烛火接过照明。",detail:"桌边的座位面向彼此，而不是全都面向王座。节庆时，村里的面包师和牧羊人也会来这里吃饭；在这个小王国里，城堡的门一直留着。",camera:[15,10,19],position:[0,2,0]},library:{title:"风的藏书室",floor:"二层",function:"阅读与星图收藏",subtitle:"书页上的海，比云海还要辽阔。",text:"书架贴着房间周边排列，把中央留给阅览桌和走道。木质层板上收着颜色不同的书册；低矮的桌面和窗边的暖光，让这间房间保持安静的尺度。",detail:"守书人塞西尔收藏着从未见过的大陆、鸟类的迁徙和旧星图。通向上层的楼梯靠墙布置，楼板与木梁之间，能看到城堡内部真实的层次。",camera:[13,11,16],position:[2,5,0]},bedroom:{title:"星光寝室",floor:"三层",function:"休憩与远眺",subtitle:"睡着以后，梦还可以再高一点。",text:"寝室位于更安静的上层。床、枕被和床边的小柜子围合出私密的角落；高窗既带来光线，也让人在醒来的第一眼看见云。柔和的织物颜色与厚实石墙形成温暖的搭配。",detail:"这里没有金碧辉煌的装饰，只有刚刚整理好的床铺、安静的家具和一盏留给夜读的灯。塔楼在外侧守望，房间在内侧陪伴。",camera:[13,14,17],position:[0,8,-2]},kitchen:{title:"暖炉厨房",floor:"一层侧翼",function:"烹饪与储存",subtitle:"一个王国的温柔，常常从厨房开始。",text:"厨房靠近宴会厅，把烹饪、储物和上菜的距离缩短。炉灶、工作台、器皿与木桶让这里有了忙碌的秩序，低处的储藏容器也让食材有地方安放。",detail:"面包、浓汤和刚摘下的香草，会经过这张工作台。厚石炉墙保存热度，木梁与石板把空间分成实用而细小的区域。",camera:[15,8,17],position:[4,1.5,-2]}};let Ql;function Sn(i){Ut("#toast").textContent=i,Ut("#toast").classList.add("visible"),clearTimeout(Ql),Ql=setTimeout(()=>Ut("#toast").classList.remove("visible"),3e3)}let ve;try{ve=new ug({antialias:!0,alpha:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"})}catch(i){throw Ut("#loading").innerHTML='<div class="loading-star">✧</div><p>这幅小小世界需要浏览器开启 WebGL 2。</p><span>请使用支持硬件加速的新版 Edge、Chrome 或 Safari。</span>',i}ve.setPixelRatio(Math.min(window.devicePixelRatio,1.8));ve.setSize(innerWidth,innerHeight);ve.shadowMap.enabled=!0;ve.shadowMap.type=oc;ve.outputColorSpace=Ve;ve.toneMapping=lc;ve.toneMappingExposure=1.28;Ut("#scene").appendChild(ve.domElement);const Ue=new Uu;Ue.fog=new fa(15657697,100,200);const Le=new je(38,innerWidth/innerHeight,.15,400),ne=new dg(Le,ve.domElement);ne.enableDamping=!0;ne.dampingFactor=.055;ne.minDistance=4;ne.maxDistance=230;ne.minPolarAngle=.06;ne.maxPolarAngle=Math.PI*.83;ne.autoRotateSpeed=.24;ne.panSpeed=.65;const tc=()=>innerWidth<760,ec={camera:[54,36,58],target:[-3,1.5,0]},pr=()=>({camera:ec.camera.map(i=>i*(tc()?Math.max(1,.98/Le.aspect):1)),target:tc()?[0,2,0]:ec.target});Le.position.fromArray(pr().camera);ne.target.fromArray(pr().target);const $n=new Ef(16184292,9872260,2.65);Ue.add($n);const Ke=new kc(16771267,3.5);Ke.position.set(-24,45,25);Ke.castShadow=!0;Ke.shadow.mapSize.set(2048,2048);Object.assign(Ke.shadow.camera,{left:-36,right:36,top:40,bottom:-30,near:1,far:125});Ke.shadow.normalBias=.055;Ke.shadow.bias=-25e-5;Ke.shadow.radius=4;Ue.add(Ke);const jc=new kc(12899551,.7);jc.position.set(30,18,-25);Ue.add(jc);let ba,zi,Ms;try{ba=Rg(Ue),zi=Ag(Ue),Ms=Cg(Ue)}catch(i){throw Ut("#loading").innerHTML='<div class="loading-star">✧</div><p>小王国暂时没有完成装配。</p><span>请刷新页面重试，或查看开发者控制台。</span>',i}for(const i of zi.rooms||[])xs[i.id]&&(xs[i.id].position=i.position);let io=1893;const rn=()=>(io=io*1664525+1013904223>>>0,io/4294967296),Ta=new $t;Ta.name="会缓缓经过的云";Ue.add(Ta);const Pg=new Vi(1,12,9),Lg=[new be({color:16776433,roughness:1,transparent:!0,opacity:.74,depthWrite:!1}),new be({color:15067359,roughness:1,transparent:!0,opacity:.5,depthWrite:!1})],Zc=[];for(let i=0;i<22;i++){const t=new $t,e=i/22*Math.PI*2,n=31+rn()*26;t.position.set(Math.cos(e)*n,-8+rn()*21,Math.sin(e)*n),t.userData.origin=t.position.clone();const s=1.9+rn()*2.9;for(let r=0;r<5;r++){const o=new ce(Pg,Lg[r%4===0?1:0]);o.scale.set(s*(.8+rn()*.7),s*(.3+rn()*.23),s*(.45+rn()*.4)),o.position.set((r-2)*s*.8,Math.sin(r*1.6)*s*.14,(rn()-.5)*s*.7),t.add(o)}Ta.add(t),Zc.push(t)}const Fn=new $t;Fn.position.set(-39,-2,-25);Fn.rotation.z=-.06;Ue.add(Fn);const wa=new ce(new Kn(4,8,7),new be({color:12630691,roughness:1,flatShading:!0}));wa.rotation.z=Math.PI;wa.position.y=-4;Fn.add(wa);const Dg=new ce(new Ge(4,3.5,.6,14),new be({color:11648660,roughness:1}));Fn.add(Dg);const Kc=new ce(new Ge(.2,.35,2.3,6),new be({color:10654327}));Kc.position.y=1.3;Fn.add(Kc);const Aa=new ce(new Bi(1.7,1),new be({color:10268291,roughness:1}));Aa.scale.set(1,1.35,1);Aa.position.y=3.2;Fn.add(Aa);const bs=new $t;bs.position.set(29,24,-37);Ue.add(bs);const Ig=new ce(new Vi(1.6,24,16),new be({color:14796192,roughness:1}));bs.add(Ig);const $c=new ce(new Ma(2.6,.035,6,64),new be({color:12692092}));$c.rotation.set(1.1,.25,.45);bs.add($c);const Jc=[];for(let i=0;i<170;i++){const t=rn()*Math.PI*2,e=65+rn()*70;Jc.push(Math.cos(t)*e,18+rn()*70,Math.sin(t)*e)}const Ra=new ku(new pe().setAttribute("position",new Yt(Jc,3)),new Ac({color:16772026,size:.22,transparent:!0,opacity:0,depthWrite:!1}));Ue.add(Ra);let tn=null,ys=!1,bi=!0,Qo="places",es="castle",ns="hall",is=0;const nc=new Af,ic=new gt;function Wi(i,t,e=1550){tn={start:performance.now(),duration:e,from:Le.position.clone(),to:new F(...i),fromTarget:ne.target.clone(),toTarget:new F(...t)},ne.autoRotate=!1,Ca()}ne.addEventListener("start",()=>{tn=null,ne.autoRotate=!1,Ca()});function Ca(){Ut("#auto-rotate").setAttribute("aria-pressed",String(ne.autoRotate)),Ut("#rotate-icon").innerHTML=Es(ne.autoRotate?"pause":"rotate"),Ut("#auto-rotate").lastElementChild.textContent=ne.autoRotate?"暂停环游":"缓缓环游"}function Mr(i){document.querySelectorAll("[data-view]").forEach(t=>t.classList.toggle("active",t.dataset.view===i))}function Ts(i){ys=i,[...new Set([...zi.cutawayObjects||[],...zi.roofs||[]])].forEach(t=>t.visible=!ys),Ut("#cutaway").classList.toggle("active",i),Ut("#cutaway").setAttribute("aria-pressed",String(i)),Ut("#cutaway").lastElementChild.textContent=i?"合上城堡":"打开城堡"}function Pa(){Ut("#journal").hidden=!0,document.body.classList.remove("journal-open")}function Xi(i="places"){Qo=i,Ut("#journal").hidden=!1,document.body.classList.add("journal-open"),document.querySelectorAll("[data-tab]").forEach(t=>t.setAttribute("aria-selected",String(t.dataset.tab===i))),ar()}function La(i,t=!0){const e=ls.find(n=>n.id===i);e&&(es=i,Mr(i==="fields"?"nature":i),ys&&Ts(!1),Wi(e.camera,e.target),t&&Xi("places"))}function Ug(i){const t=xs[i];if(!t)return;Ts(!0),ns=i;const e=t.position;Wi([e[0]+12,e[1]+6.5,e[2]+16],[e[0],e[1],e[2]],1750),Xi("rooms"),Mr("castle")}function ar(){const i=Ut("#journal-content");if(Qo==="places"){const t=ls.find(e=>e.id===es)||ls[0];i.innerHTML=`<div class="note-selector">${ls.map(e=>`<button data-place="${e.id}" class="${e.id===es?"selected":""}">${e.title}</button>`).join("")}</div><span class="chapter-number">CHAPTER ${t.number}</span><h2>${t.title}</h2><p class="lead">${t.subtitle}</p><p>${t.text}</p>${t.details.map(([e,n])=>`<h3>${e}</h3><p>${n}</p>`).join("")}<p class="caption">${t.type}</p><button class="visit-button" id="visit-place">向这里飞近 ↗</button>`,i.querySelectorAll("[data-place]").forEach(e=>e.onclick=()=>{es=e.dataset.place,ar()}),Ut("#visit-place").onclick=()=>La(es)}else if(Qo==="rooms"){const t=xs[ns];i.innerHTML=`<div class="note-selector">${Object.entries(xs).map(([e,n])=>`<button data-room="${e}" class="${e===ns?"selected":""}">${n.title}</button>`).join("")}</div><span class="chapter-number">INSIDE THE CASTLE</span><h2>${t.title}</h2><p class="lead">${t.subtitle}</p><div class="room-facts"><div><span>所在楼层</span><strong>${t.floor}</strong></div><div><span>房间用途</span><strong>${t.function}</strong></div></div><p>${t.text}</p><h3>房间里的小日子</h3><p>${t.detail}</p><p class="caption">剖视模式会揭开屋顶与外墙，保留楼板和室内家具。</p><button class="visit-button" id="visit-room">打开城堡，看看这里 ↗</button>`,i.querySelectorAll("[data-room]").forEach(e=>e.onclick=()=>{ns=e.dataset.room,ar()}),Ut("#visit-room").onclick=()=>Ug(ns)}else{const t=Ms.characters||[],e=t[is]||t[0];if(!e){i.innerHTML="<p>居民们正在回家的路上。</p>";return}i.innerHTML=`<div class="note-selector">${t.map((n,s)=>`<button data-person="${s}" class="${s===is?"selected":""}">${n.name}</button>`).join("")}</div><span class="chapter-number">PEOPLE OF THE CLOUDS</span><h2>${e.name}</h2><p class="lead">${e.role}</p><p>${e.description}</p><h3>在小小王国里遇见</h3><p>他们有的留在窗边，有的走在田埂上。转动视角，留意小小的帽子、围巾、工具和脚边的伙伴。点击场景里的居民，也可以翻开他们的这一页。</p><p class="caption">原创童话人物 · ${is+1} / ${t.length}</p><button class="visit-button" id="visit-person">去和 ${e.name} 打个招呼 ↗</button>`,i.querySelectorAll("[data-person]").forEach(n=>n.onclick=()=>{is=Number(n.dataset.person),ar()}),Ut("#visit-person").onclick=()=>{const n=e.position;n[1]>3&&Ts(!0),Wi([n[0]+6,n[1]+4,n[2]+8],[n[0],n[1]+.7,n[2]],1500)}}i.scrollTop=0}document.querySelectorAll("[data-tab]").forEach(i=>i.onclick=()=>Xi(i.dataset.tab));Ut("#close-journal").onclick=Pa;Ut("#explore").onclick=()=>Xi("places");document.querySelectorAll("[data-view]").forEach(i=>i.onclick=()=>{i.dataset.view==="overview"?(Mr("overview"),Pa(),Ts(!1),Wi(pr().camera,pr().target)):La(i.dataset.view)});Ut("#cutaway").onclick=()=>{Ts(!ys),ys?(Mr("castle"),Xi("rooms"),Wi([24,20,29],[0,4,-2]),Sn("屋顶已经打开，选择一个房间走近看看。")):Sn("城堡又披上了它的屋顶。")};Ut("#home").onclick=()=>{Ut('[data-view="overview"]').click(),Sn("回到云端，重新出发。")};for(const[i,t]of[["zoom-in",.8],["zoom-out",1.25]])Ut(`#${i}`).onclick=()=>{const e=Le.position.clone().sub(ne.target).multiplyScalar(t),n=e.length();n<ne.minDistance&&e.setLength(ne.minDistance),n>ne.maxDistance&&e.setLength(ne.maxDistance),Wi(e.add(ne.target).toArray(),ne.target.toArray(),450)};Ut("#auto-rotate").onclick=()=>{tn=null,ne.autoRotate=!ne.autoRotate,Ca()};Ut("#labels").onclick=()=>{bi=!bi,Ut("#labels").setAttribute("aria-pressed",String(bi)),Ut("#labels .toggle").classList.toggle("on",bi),Ut("#landmark-labels").style.display=bi?"":"none"};Ut("#help-button").onclick=()=>Ut("#help").showModal();Ut("#close-help").onclick=()=>Ut("#help").close();Ut("#start-exploring").onclick=()=>Ut("#help").close();Ut("#help").addEventListener("click",i=>{if(i.target===Ut("#help")){const t=Ut("#help").getBoundingClientRect();(i.clientX<t.left||i.clientX>t.right||i.clientY<t.top||i.clientY>t.bottom)&&Ut("#help").close()}});async function Qc(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{Sn("当前预览不支持全屏，可在独立浏览器中打开。")}}Ut("#fullscreen").onclick=Qc;window.addEventListener("keydown",i=>{i.target.matches("button,input,textarea")||Ut("#help").open||(i.key==="Escape"&&Pa(),i.code==="Space"&&(i.preventDefault(),Ut("#auto-rotate").click()),i.key.toLowerCase()==="f"&&Qc())});const Ng=ls.map(i=>{const t=document.createElement("button");return t.className="landmark",t.setAttribute("aria-label",`探索${i.title}`),t.innerHTML=`<span class="label-text">${i.title}</span><span class="stem"></span><span class="dot"></span>`,t.onclick=()=>La(i.id),Ut("#landmark-labels").appendChild(t),{el:t,position:new F(...i.position),projected:new F}});Ut("#landmark-labels").removeAttribute("aria-hidden");let lr=null;ve.domElement.addEventListener("pointerdown",i=>{lr=[i.clientX,i.clientY]});ve.domElement.addEventListener("pointerup",i=>{if(!lr||Math.hypot(i.clientX-lr[0],i.clientY-lr[1])>5)return;ic.set(i.clientX/innerWidth*2-1,-i.clientY/innerHeight*2+1),nc.setFromCamera(ic,Le);const t=nc.intersectObjects([zi.group,ba.group,Ms.group],!0).filter(n=>n.object.visible&&n.object.material?.visible!==!1&&(()=>{let s=n.object.parent;for(;s;){if(!s.visible)return!1;s=s.parent}return!0})());let e;if(t.length){let n=t[0].object;for(;n;){if(n.userData.characterId){e=n.userData.characterId;break}n=n.parent}}if(e){const n=Ms.characters.findIndex(s=>s.id===e);n>=0&&(is=n,Xi("people"))}});const mr=[{label:"暖午",icon:"sun",bg:"#eeeae1",sky:16184292,ground:9872260,sun:16771267,sunPower:3.5,hemiPower:2.65,exposure:1.28,star:0},{label:"黄昏",icon:"sunset",bg:"#e6cfbe",sky:16045244,ground:10260118,sun:16760711,sunPower:2.7,hemiPower:1.9,exposure:1.22,star:.12},{label:"星夜",icon:"moon",bg:"#354956",sky:9545923,ground:5135976,sun:12835566,sunPower:.7,hemiPower:.95,exposure:1.05,star:.95}];let Ai=0,cr=null;const gr=new Wt(mr[0].bg);Ue.background=gr;Ut("#daytime").onclick=()=>{Ai=(Ai+1)%mr.length;const i=mr[Ai];Ut("#day-label").textContent=i.label,Ut("#day-icon").innerHTML=Es(i.icon),document.body.classList.toggle("night",Ai===2),cr={start:performance.now(),fromBg:gr.clone(),fromSky:$n.color.clone(),fromGround:$n.groundColor.clone(),fromSun:Ke.color.clone(),fromSP:Ke.intensity,fromHP:$n.intensity,fromExposure:ve.toneMappingExposure,fromStar:Ra.material.opacity,to:i}};let Pe=null;async function Fg(){if(Pe)Pe.on=!Pe.on,Pe.on?await Pe.ctx.resume():await Pe.ctx.suspend();else{const i=new(window.AudioContext||window.webkitAudioContext),t=i.createGain();t.gain.value=.1,t.connect(i.destination);const e=i.createBuffer(1,i.sampleRate*3,i.sampleRate),n=e.getChannelData(0);let s=0;for(let l=0;l<n.length;l++)s=(s+(Math.random()*2-1)*.025)/1.025,n[l]=s;const r=i.createBufferSource();r.buffer=e,r.loop=!0;const o=i.createBiquadFilter();o.type="lowpass",o.frequency.value=550,r.connect(o),o.connect(t),r.start();const a=()=>{if(i.state!=="running")return;const l=[261.63,293.66,329.63,392,440,523.25],c=i.currentTime,h=i.createOscillator(),u=i.createGain();h.type="sine",h.frequency.value=l[Math.floor(Math.random()*l.length)],u.gain.setValueAtTime(0,c),u.gain.linearRampToValueAtTime(.12,c+.08),u.gain.exponentialRampToValueAtTime(1e-4,c+3.6),h.connect(u),u.connect(t),h.start(c),h.stop(c+4)};Pe={ctx:i,master:t,timer:setInterval(a,3500),on:!0},await i.resume(),a()}Ut("#sound").innerHTML=Es(Pe.on?"sound":"mute"),Ut("#sound").setAttribute("aria-pressed",String(Pe.on)),Ut("#sound").setAttribute("aria-label",Pe.on?"关闭环境音":"开启环境音"),Ut("#sound").title=Pe.on?"关闭环境音":"开启环境音",Sn(Pe.on?"风声和远处的风铃，正在轻轻响。":"让小王国安静一会儿。")}Ut("#sound").onclick=()=>Fg().catch(()=>Sn("当前浏览器暂时无法播放环境音。"));document.addEventListener("visibilitychange",()=>{Pe?.on&&(document.hidden?Pe.ctx.suspend():Pe.ctx.resume())});Ut("#capture").onclick=()=>{try{ve.render(Ue,Le);const i=document.createElement("canvas");i.width=ve.domElement.width,i.height=ve.domElement.height;const t=i.getContext("2d");t.drawImage(ve.domElement,0,0);const e=i.width,n=i.height;t.fillStyle=Ai===2?"#e2e0c9":"#52634b",t.font=`${Math.round(e*.022)}px "Noto Serif SC", "SimSun", serif`,t.fillText("云端城堡 · 风住的地方",e*.045,n*.09),t.font=`${Math.round(e*.008)}px Georgia`,t.fillText("LETTERS FROM ABOVE  /  A LITTLE KINGDOM IN THE SKY",e*.046,n*.12),i.toBlob(s=>{if(!s){Sn("明信片暂时没有保存成功，请再试一次。");return}const r=document.createElement("a");r.href=URL.createObjectURL(s),r.download=`云端城堡-${mr[Ai].label}.png`,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),1e4),Sn("一张来自云端的明信片，已为你保存。")},"image/png")}catch{Sn("明信片暂时没有保存成功，请再试一次。")}};window.addEventListener("resize",()=>{Le.aspect=innerWidth/innerHeight,Le.updateProjectionMatrix(),ve.setSize(innerWidth,innerHeight)});const Og=performance.now();let sc=performance.now(),so=0;function th(i){if(requestAnimationFrame(th),document.hidden)return;const t=(i-Og)/1e3,e=Math.min((i-sc)/1e3,.05);if(sc=i,tn){const n=Math.min(1,(i-tn.start)/tn.duration),s=n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2;Le.position.lerpVectors(tn.from,tn.to,s),ne.target.lerpVectors(tn.fromTarget,tn.toTarget,s),n===1&&(tn=null)}if(ne.update(e),ba.update?.(t),zi.update?.(t),Ms.update?.(t),Zc.forEach((n,s)=>{n.position.x=n.userData.origin.x+Math.sin(t*.025+s)*1.8,n.position.y=n.userData.origin.y+Math.sin(t*.09+s)*.25}),Fn.position.y=-2+Math.sin(t*.16)*.4,bs.rotation.y=t*.03,cr){const n=cr,s=Ei.smoothstep((i-n.start)/1800,0,1);gr.lerpColors(n.fromBg,new Wt(n.to.bg),s),$n.color.lerpColors(n.fromSky,new Wt(n.to.sky),s),$n.groundColor.lerpColors(n.fromGround,new Wt(n.to.ground),s),Ke.color.lerpColors(n.fromSun,new Wt(n.to.sun),s),Ke.intensity=Ei.lerp(n.fromSP,n.to.sunPower,s),$n.intensity=Ei.lerp(n.fromHP,n.to.hemiPower,s),ve.toneMappingExposure=Ei.lerp(n.fromExposure,n.to.exposure,s),Ra.material.opacity=Ei.lerp(n.fromStar,n.to.star,s),Ue.fog.color.copy(gr),s===1&&(cr=null)}if(bi&&so%2===0){const n=[];for(const s of Ng){s.projected.copy(s.position).project(Le);const r=(s.projected.x*.5+.5)*innerWidth,o=(-s.projected.y*.5+.5)*innerHeight,a=s.projected.z>1||s.projected.z<0||r<25||r>innerWidth-85||o<85||o>innerHeight-135||Le.position.distanceTo(s.position)<9||!Ut("#journal").hidden&&r<395||n.some(l=>Math.abs(l.x-r)<110&&Math.abs(l.y-o)<34);a||n.push({x:r,y:o}),s.el.style.opacity=a?"0":"1",s.el.style.pointerEvents=a?"none":"auto",s.el.style.transform=`translate(${r}px,${o}px) translate(-50%,-100%)`}}Ut("#compass-arrow").style.transform=`rotate(${-Math.atan2(Le.position.x-ne.target.x,Le.position.z-ne.target.z)*180/Math.PI}deg)`,ve.render(Ue,Le),so++,so===3&&(Ut("#loading").classList.add("loaded"),setTimeout(()=>Ut("#loading").remove(),1e3),document.documentElement.dataset.sceneReady="true")}requestAnimationFrame(th);
