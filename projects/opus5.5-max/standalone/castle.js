"use strict";(()=>{var Ri={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ci={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hu=0,yc=1,uu=2;var ts=1,du=2,Vs=3,$n=0,Ge=1,Fe=2,jn=0,Ws=1,Xr=2,vc=3,bc=4,fu=5;var es=100,pu=101,mu=102,gu=103,_u=104,xu=200,yu=201,vu=202,bu=203,Mc=204,Sc=205,Mu=206,Su=207,Eu=208,Tu=209,wu=210,Au=211,Ru=212,Cu=213,Iu=214,Oo=0,Bo=1,zo=2,Rs=3,ko=4,Ho=5,Go=6,Vo=7,Ec=0,Pu=1,Lu=2,Bn=0,Tc=1,wc=2,Ac=3,Rc=4,Cc=5,Ic=6,Pc=7;var Lc=300,Ii=301,ns=302,va=303,ba=304,qr=306,Wo=1e3,Xn=1001,Xo=1002,Ne=1003,Du=1004;var Yr=1005;var je=1006,Ma=1007;var Pi=1008;var fn=1009,Dc=1010,Nc=1011,Xs=1012,Sa=1013,zn=1014,wn=1015,kn=1016,Ea=1017,Ta=1018,qs=1020,Uc=35902,Fc=35899,Oc=1021,Bc=1022,An=1023,qn=1026,Li=1027,Ys=1028,wa=1029,Di=1030,Aa=1031;var Ra=1033,Zr=33776,Jr=33777,Kr=33778,$r=33779,Ca=35840,Ia=35841,Pa=35842,La=35843,Da=36196,Na=37492,Ua=37496,Fa=37488,Oa=37489,jr=37490,Ba=37491,za=37808,ka=37809,Ha=37810,Ga=37811,Va=37812,Wa=37813,Xa=37814,qa=37815,Ya=37816,Za=37817,Ja=37818,Ka=37819,$a=37820,ja=37821,Qa=36492,tl=36494,el=36495,nl=36283,il=36284,Qr=36285,sl=36286;var pr=2300,qo=2301,Uo=2302,oc=2303,ac=2400,lc=2401,cc=2402;var Nu=3200;var rl=0,Uu=1,di="",xn="srgb",mr="srgb-linear",gr="linear",ge="srgb";var Fo=7680;var Fu=519,Ou=512,Bu=513,zu=514,ol=515,ku=516,Hu=517,al=518,Gu=519,Vu=35044;var zc="300 es",Fn=2e3,Cs=2001;function df(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ff(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function _r(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wu(){let i=_r("canvas");return i.style.display="block",i}var Lh={},Is=null;function kc(...i){let t="THREE."+i.shift();Is?Is("log",t,...i):console.log(t,...i)}function Xu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Wt(...i){i=Xu(i);let t="THREE."+i.shift();if(Is)Is("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function qt(...i){i=Xu(i);let t="THREE."+i.shift();if(Is)Is("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Xi(...i){let t=i.join(" ");t in Lh||(Lh[t]=!0,Wt(...i))}function qu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Yu={[Oo]:Bo,[zo]:Go,[ko]:Vo,[Rs]:Ho,[Bo]:Oo,[Go]:zo,[Vo]:ko,[Ho]:Rs},On=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Dh=1234567,hr=Math.PI/180,Ps=180/Math.PI;function is(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function ee(i,t,e){return Math.max(t,Math.min(e,i))}function Hc(i,t){return(i%t+t)%t}function pf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function mf(i,t,e){return i!==t?(e-i)/(t-i):0}function ur(i,t,e){return(1-e)*i+e*t}function gf(i,t,e,n){return ur(i,t,1-Math.exp(-e*n))}function _f(i,t=1){return t-Math.abs(Hc(i,t*2)-t)}function xf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function yf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function vf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function bf(i,t){return i+Math.random()*(t-i)}function Mf(i){return i*(.5-Math.random())}function Sf(i){i!==void 0&&(Dh=i);let t=Dh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ef(i){return i*hr}function Tf(i){return i*Ps}function wf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Af(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Rf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),p=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*p,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*p,a*c);break;case"ZYZ":i.set(l*p,l*f,a*h,a*c);break;default:Wt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ws(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function an(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Gc={DEG2RAD:hr,RAD2DEG:Ps,generateUUID:is,clamp:ee,euclideanModulo:Hc,mapLinear:pf,inverseLerp:mf,lerp:ur,damp:gf,pingpong:_f,smoothstep:xf,smootherstep:yf,randInt:vf,randFloat:bf,randFloatSpread:Mf,seededRandom:Sf,degToRad:Ef,radToDeg:Tf,isPowerOfTwo:wf,ceilPowerOfTwo:Af,floorPowerOfTwo:Rf,setQuaternionFromProperEuler:Cf,normalize:an,denormalize:ws},Zc=class Zc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Zc.prototype.isVector2=!0;var at=Zc,ln=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],p=r[o+2],v=r[o+3];if(u!==v||l!==d||c!==f||h!==p){let g=l*d+c*f+h*p+u*v;g<0&&(d=-d,f=-f,p=-p,v=-v,g=-g);let m=1-a;if(g<.9995){let M=Math.acos(g),w=Math.sin(M);m=Math.sin(m*M)/w,a=Math.sin(a*M)/w,l=l*m+d*a,c=c*m+f*a,h=h*m+p*a,u=u*m+v*a}else{l=l*m+d*a,c=c*m+f*a,h=h*m+p*a,u=u*m+v*a;let M=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=M,c*=M,h*=M,u*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return t[e]=a*p+h*u+l*f-c*d,t[e+1]=l*p+h*d+c*u-a*f,t[e+2]=c*p+h*f+a*d-l*u,t[e+3]=h*p-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Wt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Jc=class Jc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Nh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fl.copy(this).projectOnVector(t),this.sub(Fl)}reflect(t){return this.sub(Fl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Jc.prototype.isVector3=!0;var I=Jc,Fl=new I,Nh=new ln,Kc=class Kc{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=s[0],g=s[3],m=s[6],M=s[1],w=s[4],y=s[7],T=s[2],E=s[5],P=s[8];return r[0]=o*v+a*M+l*T,r[3]=o*g+a*w+l*E,r[6]=o*m+a*y+l*P,r[1]=c*v+h*M+u*T,r[4]=c*g+h*w+u*E,r[7]=c*m+h*y+u*P,r[2]=d*v+f*M+p*T,r[5]=d*g+f*w+p*E,r[8]=d*m+f*y+p*P,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,p=e*u+n*d+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/p;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=d*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Xi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ol.makeScale(t,e)),this}rotate(t){return Xi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ol.makeRotation(-t)),this}translate(t,e){return Xi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ol.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Kc.prototype.isMatrix3=!0;var $t=Kc,Ol=new $t,Uh=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fh=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function If(){let i={enabled:!0,workingColorSpace:mr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ge&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ge&&(s.r=As(s.r),s.g=As(s.g),s.b=As(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?gr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[mr]:{primaries:t,whitePoint:n,transfer:gr,toXYZ:Uh,fromXYZ:Fh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:t,whitePoint:n,transfer:ge,toXYZ:Uh,fromXYZ:Fh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}}),i}var ae=If();function li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function As(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ds,Yo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ds===void 0&&(ds=_r("canvas")),ds.width=t.width,ds.height=t.height;let s=ds.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ds}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=_r("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=li(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(li(e[n]/255)*255):e[n]=li(e[n]);return{data:e,width:t.width,height:t.height}}else return Wt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Pf=0,Ls=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=is(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Bl(s[o].image)):r.push(Bl(s[o]))}else r=Bl(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Bl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Wt("Texture: Unable to serialize Texture."),{})}var Lf=0,zl=new I,un=class i extends On{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Xn,s=Xn,r=je,o=Pi,a=An,l=fn,c=i.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=is(),this.name="",this.source=new Ls(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(zl).x}get height(){return this.source.getSize(zl).y}get depth(){return this.source.getSize(zl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Wt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Wt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Lc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wo:t.x=t.x-Math.floor(t.x);break;case Xn:t.x=t.x<0?0:1;break;case Xo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wo:t.y=t.y-Math.floor(t.y);break;case Xn:t.y=t.y<0?0:1;break;case Xo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=Lc;un.DEFAULT_ANISOTROPY=1;var $c=class $c{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,y=(f+1)/2,T=(m+1)/2,E=(h+d)/4,P=(u+v)/4,_=(p+g)/4;return w>y&&w>T?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=E/n,r=P/n):y>T?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=E/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=P/r,s=_/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(u-v)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};$c.prototype.isVector4=!0;var Ce=$c,Zo=class extends On{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new un(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:je,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ls(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},dn=class extends Zo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},xr=class extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Jo=class extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ya=class ya{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,p,v,g)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,p,v,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ya().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/fs.setFromMatrixColumn(t,0).length(),r=1/fs.setFromMatrixColumn(t,1).length(),o=1/fs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,p=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+p*c,e[5]=d-v*c,e[9]=-a*l,e[2]=v-d*c,e[6]=p+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,p=c*h,v=c*u;e[0]=d+v*a,e[4]=p*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=v+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,p=c*h,v=c*u;e[0]=d-v*a,e[4]=-o*u,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,p=a*h,v=a*u;e[0]=l*h,e[4]=p*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,p=a*l,v=a*c;e[0]=l*h,e[4]=v-d*u,e[8]=p*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+p,e[10]=d-v*u}else if(t.order==="XZY"){let d=o*l,f=o*c,p=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Df,t,Nf)}lookAt(t,e,n){let s=this.elements;return gn.subVectors(t,e),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),xi.crossVectors(n,gn),xi.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),xi.crossVectors(n,gn)),xi.normalize(),ho.crossVectors(gn,xi),s[0]=xi.x,s[4]=ho.x,s[8]=gn.x,s[1]=xi.y,s[5]=ho.y,s[9]=gn.y,s[2]=xi.z,s[6]=ho.z,s[10]=gn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],M=n[3],w=n[7],y=n[11],T=n[15],E=s[0],P=s[4],_=s[8],b=s[12],A=s[1],L=s[5],B=s[9],k=s[13],N=s[2],H=s[6],J=s[10],Z=s[14],lt=s[3],K=s[7],nt=s[11],rt=s[15];return r[0]=o*E+a*A+l*N+c*lt,r[4]=o*P+a*L+l*H+c*K,r[8]=o*_+a*B+l*J+c*nt,r[12]=o*b+a*k+l*Z+c*rt,r[1]=h*E+u*A+d*N+f*lt,r[5]=h*P+u*L+d*H+f*K,r[9]=h*_+u*B+d*J+f*nt,r[13]=h*b+u*k+d*Z+f*rt,r[2]=p*E+v*A+g*N+m*lt,r[6]=p*P+v*L+g*H+m*K,r[10]=p*_+v*B+g*J+m*nt,r[14]=p*b+v*k+g*Z+m*rt,r[3]=M*E+w*A+y*N+T*lt,r[7]=M*P+w*L+y*H+T*K,r[11]=M*_+w*B+y*J+T*nt,r[15]=M*b+w*k+y*Z+T*rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],v=t[7],g=t[11],m=t[15],M=l*f-c*d,w=a*f-c*u,y=a*d-l*u,T=o*f-c*h,E=o*d-l*h,P=o*u-a*h;return e*(v*M-g*w+m*y)-n*(p*M-g*T+m*E)+s*(p*w-v*T+m*P)-r*(p*y-v*E+g*P)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],v=t[13],g=t[14],m=t[15],M=e*a-n*o,w=e*l-s*o,y=e*c-r*o,T=n*l-s*a,E=n*c-r*a,P=s*c-r*l,_=h*v-u*p,b=h*g-d*p,A=h*m-f*p,L=u*g-d*v,B=u*m-f*v,k=d*m-f*g,N=M*k-w*B+y*L+T*A-E*b+P*_;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/N;return t[0]=(a*k-l*B+c*L)*H,t[1]=(s*B-n*k-r*L)*H,t[2]=(v*P-g*E+m*T)*H,t[3]=(d*E-u*P-f*T)*H,t[4]=(l*A-o*k-c*b)*H,t[5]=(e*k-s*A+r*b)*H,t[6]=(g*y-p*P-m*w)*H,t[7]=(h*P-d*y+f*w)*H,t[8]=(o*B-a*A+c*_)*H,t[9]=(n*A-e*B-r*_)*H,t[10]=(p*E-v*y+m*M)*H,t[11]=(u*y-h*E-f*M)*H,t[12]=(a*b-o*L-l*_)*H,t[13]=(e*L-n*b+s*_)*H,t[14]=(v*w-p*T-g*M)*H,t[15]=(h*T-u*w+d*M)*H,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,p=r*u,v=o*h,g=o*u,m=a*u,M=l*c,w=l*h,y=l*u,T=n.x,E=n.y,P=n.z;return s[0]=(1-(v+m))*T,s[1]=(f+y)*T,s[2]=(p-w)*T,s[3]=0,s[4]=(f-y)*E,s[5]=(1-(d+m))*E,s[6]=(g+M)*E,s[7]=0,s[8]=(p+w)*P,s[9]=(g-M)*P,s[10]=(1-(d+v))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=fs.set(s[0],s[1],s[2]).length(),a=fs.set(s[4],s[5],s[6]).length(),l=fs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Dn.copy(this);let c=1/o,h=1/a,u=1/l;return Dn.elements[0]*=c,Dn.elements[1]*=c,Dn.elements[2]*=c,Dn.elements[4]*=h,Dn.elements[5]*=h,Dn.elements[6]*=h,Dn.elements[8]*=u,Dn.elements[9]*=u,Dn.elements[10]*=u,e.setFromRotationMatrix(Dn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=Fn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),p,v;if(l)p=r/(o-r),v=o*r/(o-r);else if(a===Fn)p=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Cs)p=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Fn,l=!1){let c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s),p,v;if(l)p=1/(o-r),v=o/(o-r);else if(a===Fn)p=-2/(o-r),v=-(o+r)/(o-r);else if(a===Cs)p=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ya.prototype.isMatrix4=!0;var ue=ya,fs=new I,Dn=new ue,Df=new I(0,0,0),Nf=new I(1,1,1),xi=new I,ho=new I,gn=new I,Oh=new ue,Bh=new ln,Yn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ee(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Wt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Oh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Oh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bh.setFromEuler(this),this.setFromQuaternion(Bh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yn.DEFAULT_ORDER="XYZ";var yr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Uf=0,zh=new I,ps=new ln,ii=new ue,uo=new I,ir=new I,Ff=new I,Of=new ln,kh=new I(1,0,0),Hh=new I(0,1,0),Gh=new I(0,0,1),Vh={type:"added"},Bf={type:"removed"},ms={type:"childadded",child:null},kl={type:"childremoved",child:null},Qe=class i extends On{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=is(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new I,e=new Yn,n=new ln,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new $t}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ps.setFromAxisAngle(t,e),this.quaternion.multiply(ps),this}rotateOnWorldAxis(t,e){return ps.setFromAxisAngle(t,e),this.quaternion.premultiply(ps),this}rotateX(t){return this.rotateOnAxis(kh,t)}rotateY(t){return this.rotateOnAxis(Hh,t)}rotateZ(t){return this.rotateOnAxis(Gh,t)}translateOnAxis(t,e){return zh.copy(t).applyQuaternion(this.quaternion),this.position.add(zh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(kh,t)}translateY(t){return this.translateOnAxis(Hh,t)}translateZ(t){return this.translateOnAxis(Gh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?uo.copy(t):uo.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(ir,uo,this.up):ii.lookAt(uo,ir,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),ps.setFromRotationMatrix(ii),this.quaternion.premultiply(ps.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vh),ms.child=t,this.dispatchEvent(ms),ms.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bf),kl.child=t,this.dispatchEvent(kl),kl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ii.multiply(t.parent.matrixWorld)),t.applyMatrix4(ii),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vh),ms.child=t,this.dispatchEvent(ms),ms.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,t,Ff),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,Of,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Qe.DEFAULT_UP=new I(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ft=class extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}},zf={type:"move"},Ds=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ft,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ft,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ft,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let v of t.hand.values()){let g=e.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zf)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ft;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Zu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},fo={h:0,s:0,l:0};function Hl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var mt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=xn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ae.workingColorSpace){if(t=Hc(t,1),e=ee(e,0,1),n=ee(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Hl(o,r,t+1/3),this.g=Hl(o,r,t),this.b=Hl(o,r,t-1/3)}return ae.colorSpaceToWorking(this,s),this}setStyle(t,e=xn){function n(r){r!==void 0&&parseFloat(r)<1&&Wt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Wt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Wt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=xn){let n=Zu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Wt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=li(t.r),this.g=li(t.g),this.b=li(t.b),this}copyLinearToSRGB(t){return this.r=As(t.r),this.g=As(t.g),this.b=As(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xn){return ae.workingToColorSpace(nn.copy(this),t),Math.round(ee(nn.r*255,0,255))*65536+Math.round(ee(nn.g*255,0,255))*256+Math.round(ee(nn.b*255,0,255))}getHexString(t=xn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.workingToColorSpace(nn.copy(this),e);let n=nn.r,s=nn.g,r=nn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.workingToColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=xn){ae.workingToColorSpace(nn.copy(this),t);let e=nn.r,n=nn.g,s=nn.b;return t!==xn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(yi),this.setHSL(yi.h+t,yi.s+e,yi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(yi),t.getHSL(fo);let n=ur(yi.h,fo.h,e),s=ur(yi.s,fo.s,e),r=ur(yi.l,fo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new mt;mt.NAMES=Zu;var vr=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new mt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},br=class extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Nn=new I,si=new I,Gl=new I,ri=new I,gs=new I,_s=new I,Wh=new I,Vl=new I,Wl=new I,Xl=new I,ql=new Ce,Yl=new Ce,Zl=new Ce,Si=class i{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Nn.subVectors(t,e),s.cross(Nn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Nn.subVectors(s,e),si.subVectors(n,e),Gl.subVectors(t,e);let o=Nn.dot(Nn),a=Nn.dot(si),l=Nn.dot(Gl),c=si.dot(si),h=si.dot(Gl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,p=(o*h-a*l)*d;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ri.x),l.addScaledVector(o,ri.y),l.addScaledVector(a,ri.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return ql.setScalar(0),Yl.setScalar(0),Zl.setScalar(0),ql.fromBufferAttribute(t,e),Yl.fromBufferAttribute(t,n),Zl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ql,r.x),o.addScaledVector(Yl,r.y),o.addScaledVector(Zl,r.z),o}static isFrontFacing(t,e,n,s){return Nn.subVectors(n,e),si.subVectors(t,e),Nn.cross(si).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Nn.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Nn.cross(si).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;gs.subVectors(s,n),_s.subVectors(r,n),Vl.subVectors(t,n);let l=gs.dot(Vl),c=_s.dot(Vl);if(l<=0&&c<=0)return e.copy(n);Wl.subVectors(t,s);let h=gs.dot(Wl),u=_s.dot(Wl);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(gs,o);Xl.subVectors(t,r);let f=gs.dot(Xl),p=_s.dot(Xl);if(p>=0&&f<=p)return e.copy(r);let v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(_s,a);let g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Wh.subVectors(r,s),a=(u-h)/(u-h+(f-p)),e.copy(s).addScaledVector(Wh,a);let m=1/(g+v+d);return o=v*m,a=d*m,e.copy(n).addScaledVector(gs,o).addScaledVector(_s,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Zn=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Un):Un.fromBufferAttribute(r,o),Un.applyMatrix4(t.matrixWorld),this.expandByPoint(Un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),po.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),po.copy(n.boundingBox)),po.applyMatrix4(t.matrixWorld),this.union(po)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Un),Un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(sr),mo.subVectors(this.max,sr),xs.subVectors(t.a,sr),ys.subVectors(t.b,sr),vs.subVectors(t.c,sr),vi.subVectors(ys,xs),bi.subVectors(vs,ys),ki.subVectors(xs,vs);let e=[0,-vi.z,vi.y,0,-bi.z,bi.y,0,-ki.z,ki.y,vi.z,0,-vi.x,bi.z,0,-bi.x,ki.z,0,-ki.x,-vi.y,vi.x,0,-bi.y,bi.x,0,-ki.y,ki.x,0];return!Jl(e,xs,ys,vs,mo)||(e=[1,0,0,0,1,0,0,0,1],!Jl(e,xs,ys,vs,mo))?!1:(go.crossVectors(vi,bi),e=[go.x,go.y,go.z],Jl(e,xs,ys,vs,mo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(oi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},oi=[new I,new I,new I,new I,new I,new I,new I,new I],Un=new I,po=new Zn,xs=new I,ys=new I,vs=new I,vi=new I,bi=new I,ki=new I,sr=new I,mo=new I,go=new I,Hi=new I;function Jl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Hi.fromArray(i,r);let a=s.x*Math.abs(Hi.x)+s.y*Math.abs(Hi.y)+s.z*Math.abs(Hi.z),l=t.dot(Hi),c=e.dot(Hi),h=n.dot(Hi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Be=new I,_o=new at,kf=0,De=class extends On{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Vu,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)_o.fromBufferAttribute(this,e),_o.applyMatrix3(t),this.setXY(e,_o.x,_o.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ws(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=an(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ws(e,this.array)),e}setX(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ws(e,this.array)),e}setY(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ws(e,this.array)),e}setZ(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ws(e,this.array)),e}setW(t,e){return this.normalized&&(e=an(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=an(e,this.array),n=an(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=an(e,this.array),n=an(n,this.array),s=an(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=an(e,this.array),n=an(n,this.array),s=an(s,this.array),r=an(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Mr=class extends De{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Sr=class extends De{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Jt=class extends De{constructor(t,e,n){super(new Float32Array(t),e,n)}},Hf=new Zn,rr=new I,Kl=new I,ci=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Hf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rr.subVectors(t,this.center);let e=rr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(rr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Kl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rr.copy(t.center).add(Kl)),this.expandByPoint(rr.copy(t.center).sub(Kl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Gf=0,Tn=new ue,$l=new Qe,bs=new I,_n=new Zn,or=new Zn,Ye=new I,_e=class i extends On{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=is(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(df(t)?Sr:Mr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,n){return Tn.makeTranslation(t,e,n),this.applyMatrix4(Tn),this}scale(t,e,n){return Tn.makeScale(t,e,n),this.applyMatrix4(Tn),this}lookAt(t){return $l.lookAt(t),$l.updateMatrix(),this.applyMatrix4($l.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Jt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Wt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];or.setFromBufferAttribute(a),this.morphTargetsRelative?(Ye.addVectors(_n.min,or.min),_n.expandByPoint(Ye),Ye.addVectors(_n.max,or.max),_n.expandByPoint(Ye)):(_n.expandByPoint(or.min),_n.expandByPoint(or.max))}_n.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ye.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ye));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ye.fromBufferAttribute(a,c),l&&(bs.fromBufferAttribute(t,c),Ye.add(bs)),s=Math.max(s,n.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new De(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let _=0;_<n.count;_++)a[_]=new I,l[_]=new I;let c=new I,h=new I,u=new I,d=new at,f=new at,p=new at,v=new I,g=new I;function m(_,b,A){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,A),d.fromBufferAttribute(r,_),f.fromBufferAttribute(r,b),p.fromBufferAttribute(r,A),h.sub(c),u.sub(c),f.sub(d),p.sub(d);let L=1/(f.x*p.y-p.x*f.y);isFinite(L)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(L),a[_].add(v),a[b].add(v),a[A].add(v),l[_].add(g),l[b].add(g),l[A].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let _=0,b=M.length;_<b;++_){let A=M[_],L=A.start,B=A.count;for(let k=L,N=L+B;k<N;k+=3)m(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let w=new I,y=new I,T=new I,E=new I;function P(_){T.fromBufferAttribute(s,_),E.copy(T);let b=a[_];w.copy(b),w.sub(T.multiplyScalar(T.dot(b))).normalize(),y.crossVectors(E,b);let L=y.dot(l[_])<0?-1:1;o.setXYZW(_,w.x,w.y,w.z,L)}for(let _=0,b=M.length;_<b;++_){let A=M[_],L=A.start,B=A.count;for(let k=L,N=L+B;k<N;k+=3)P(t.getX(k+0)),P(t.getX(k+1)),P(t.getX(k+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new De(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new I,r=new I,o=new I,a=new I,l=new I,c=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){let p=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new De(d,h,u)}if(this.index===null)return Wt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var jl=new I,Vf=new I,Wf=new $t,yn=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=jl.subVectors(n,e).cross(Vf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(jl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Wf.getNormalMatrix(t),s=this.coplanarPoint(jl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Xf=0,hi=class extends On{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xf++}),this.uuid=is(),this.name="",this.type="Material",this.blending=Ws,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mc,this.blendDst=Sc,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mt(0,0,0),this.blendAlpha=0,this.depthFunc=Rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fo,this.stencilZFail=Fo,this.stencilZPass=Fo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Wt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Wt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new mt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new yn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new at().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new at().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ai=new I,Ql=new I,xo=new I,yo=new I,qi=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ai.copy(this.origin).addScaledVector(this.direction,e),ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ql.copy(t).add(e).multiplyScalar(.5),xo.copy(e).sub(t).normalize(),yo.copy(this.origin).sub(Ql);let r=t.distanceTo(e)*.5,o=-this.direction.dot(xo),a=yo.dot(this.direction),l=-yo.dot(xo),c=yo.lengthSq(),h=Math.abs(1-o*o),u,d,f,p;if(h>0)if(u=o*l-a,d=o*a-l,p=r*h,u>=0)if(d>=-p)if(d<=p){let v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ql).addScaledVector(xo,d),f}intersectSphere(t,e){if(t.radius<0)return null;ai.subVectors(t.center,this.origin);let n=ai.dot(this.direction),s=ai.dot(ai)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ai)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=t.x-o.x,d=t.y-o.y,f=t.z-o.z,p=e.x-o.x,v=e.y-o.y,g=e.z-o.z,m=n.x-o.x,M=n.y-o.y,w=n.z-o.z,y=Math.abs(l),T=Math.abs(c),E=Math.abs(h),P,_,b,A,L,B,k,N,H,J,Z,lt;if(y>=T&&y>=E?(b=l,B=u,H=p,lt=m,l>=0?(P=c,_=h,A=d,L=f,k=v,N=g,J=M,Z=w):(P=h,_=c,A=f,L=d,k=g,N=v,J=w,Z=M)):T>=E?(b=c,B=d,H=v,lt=M,c>=0?(P=h,_=l,A=f,L=u,k=g,N=p,J=w,Z=m):(P=l,_=h,A=u,L=f,k=p,N=g,J=m,Z=w)):(b=h,B=f,H=g,lt=w,h>=0?(P=l,_=c,A=u,L=d,k=p,N=v,J=m,Z=M):(P=c,_=l,A=d,L=u,k=v,N=p,J=M,Z=m)),b===0)return null;let K=P/b,nt=_/b,rt=1/b,Ut=A-K*B,It=L-nt*B,de=k-K*H,se=N-nt*H,ce=J-K*lt,Q=Z-nt*lt,it=ce*se-Q*de,St=Ut*Q-It*ce,Xt=de*It-se*Ut;if(s){if(it<0||St<0||Xt<0)return null}else if((it<0||St<0||Xt<0)&&(it>0||St>0||Xt>0))return null;let At=it+St+Xt;if(At===0)return null;let Yt=rt*(it*B+St*H+Xt*lt);return(At>0?Yt<0:Yt>0)?null:this.at(Yt/At,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ze=class extends hi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Xh=new ue,Gi=new qi,vo=new ci,qh=new I,bo=new I,Mo=new I,So=new I,tc=new I,Eo=new I,Yh=new I,To=new I,zt=class extends Qe{constructor(t=new _e,e=new Ze){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Eo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(tc.fromBufferAttribute(u,t),o?Eo.addScaledVector(tc,h):Eo.addScaledVector(tc.sub(e),h))}e.add(Eo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(r),Gi.copy(t.ray).recast(t.near),!(vo.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(vo,qh)===null||Gi.origin.distanceToSquared(qh)>(t.far-t.near)**2))&&(Xh.copy(r).invert(),Gi.copy(t.ray).applyMatrix4(Xh),!(n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Gi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=d.length;p<v;p++){let g=d[p],m=o[g.materialIndex],M=Math.max(g.start,f.start),w=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=M,T=w;y<T;y+=3){let E=a.getX(y),P=a.getX(y+1),_=a.getX(y+2);s=wo(this,m,t,n,c,h,u,E,P,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){let M=a.getX(g),w=a.getX(g+1),y=a.getX(g+2);s=wo(this,o,t,n,c,h,u,M,w,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,v=d.length;p<v;p++){let g=d[p],m=o[g.materialIndex],M=Math.max(g.start,f.start),w=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=M,T=w;y<T;y+=3){let E=y,P=y+1,_=y+2;s=wo(this,m,t,n,c,h,u,E,P,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){let M=g,w=g+1,y=g+2;s=wo(this,o,t,n,c,h,u,M,w,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function qf(i,t,e,n,s,r,o,a){let l;if(t.side===Ge?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===$n,a),l===null)return null;To.copy(a),To.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(To);return c<e.near||c>e.far?null:{distance:c,point:To.clone(),object:i}}function wo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,bo),i.getVertexPosition(l,Mo),i.getVertexPosition(c,So);let h=qf(i,t,e,n,bo,Mo,So,Yh);if(h){let u=new I;Si.getBarycoord(Yh,bo,Mo,So,u),s&&(h.uv=Si.getInterpolatedAttribute(s,a,l,c,u,new at)),r&&(h.uv1=Si.getInterpolatedAttribute(r,a,l,c,u,new at)),o&&(h.normal=Si.getInterpolatedAttribute(o,a,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new I,materialIndex:0};Si.getNormal(bo,Mo,So,d.normal),h.face=d,h.barycoord=u}return h}var Yi=class extends un{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Ne,h=Ne,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ns=class extends De{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ms=new ue,Zh=new ue,Ao=[],Jh=new Zn,Yf=new ue,ar=new zt,lr=new ci,Zi=class extends zt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ns(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Yf)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ms),Jh.copy(t.boundingBox).applyMatrix4(Ms),this.boundingBox.union(Jh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ci),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ms),lr.copy(t.boundingSphere).applyMatrix4(Ms),this.boundingSphere.union(lr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(ar.geometry=this.geometry,ar.material=this.material,ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lr.copy(this.boundingSphere),lr.applyMatrix4(n),t.ray.intersectsSphere(lr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ms),Zh.multiplyMatrices(n,Ms),ar.matrixWorld=Zh,ar.raycast(t,Ao);for(let o=0,a=Ao.length;o<a;o++){let l=Ao[o];l.instanceId=r,l.object=this,e.push(l)}Ao.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Ns(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Yi(new Float32Array(s*this.count),s,this.count,Ys,wn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Vi=new ci,Zf=new at(.5,.5),Ro=new I,Us=class{constructor(t=new yn,e=new yn,n=new yn,s=new yn,r=new yn,o=new yn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Fn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],v=r[9],g=r[10],m=r[11],M=r[12],w=r[13],y=r[14],T=r[15];if(s[0].setComponents(c-o,f-h,m-p,T-M).normalize(),s[1].setComponents(c+o,f+h,m+p,T+M).normalize(),s[2].setComponents(c+a,f+u,m+v,T+w).normalize(),s[3].setComponents(c-a,f-u,m-v,T-w).normalize(),n)s[4].setComponents(l,d,g,y).normalize(),s[5].setComponents(c-l,f-d,m-g,T-y).normalize();else if(s[4].setComponents(c-l,f-d,m-g,T-y).normalize(),e===Fn)s[5].setComponents(c+l,f+d,m+g,T+y).normalize();else if(e===Cs)s[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){Vi.center.set(0,0,0);let e=Zf.distanceTo(t.center);return Vi.radius=.7071067811865476+e,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ro.x=s.normal.x>0?t.max.x:t.min.x,Ro.y=s.normal.y>0?t.max.y:t.min.y,Ro.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ro)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ko=class extends hi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Kh=new ue,hc=new qi,Co=new ci,Io=new I,Fs=class extends Qe{constructor(t=new _e,e=new Ko){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(s),Co.radius+=r,t.ray.intersectsSphere(Co)===!1)return;Kh.copy(s).invert(),hc.copy(t.ray).applyMatrix4(Kh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=d,v=f;p<v;p++){let g=c.getX(p);Io.fromBufferAttribute(u,g),$h(Io,g,l,s,t,e,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,v=f;p<v;p++)Io.fromBufferAttribute(u,p),$h(Io,p,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function $h(i,t,e,n,s,r,o){let a=hc.distanceSqToPoint(i);if(a<e){let l=new I;hc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Er=class extends un{constructor(t=[],e=Ii,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Ei=class extends un{constructor(t,e,n=zn,s,r,o,a=Ne,l=Ne,c,h=qn,u=1){if(h!==qn&&h!==Li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ls(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},$o=class extends Ei{constructor(t,e=zn,n=Ii,s,r,o=Ne,a=Ne,l,c=qn){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Tr=class extends un{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Jn=class i extends _e{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,s,o,2),p("x","z","y",1,-1,t,n,-e,s,o,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(u,2));function p(v,g,m,M,w,y,T,E,P,_,b){let A=y/P,L=T/_,B=y/2,k=T/2,N=E/2,H=P+1,J=_+1,Z=0,lt=0,K=new I;for(let nt=0;nt<J;nt++){let rt=nt*L-k;for(let Ut=0;Ut<H;Ut++){let It=Ut*A-B;K[v]=It*M,K[g]=rt*w,K[m]=N,c.push(K.x,K.y,K.z),K[v]=0,K[g]=0,K[m]=E>0?1:-1,h.push(K.x,K.y,K.z),u.push(Ut/P),u.push(1-nt/_),Z+=1}}for(let nt=0;nt<_;nt++)for(let rt=0;rt<P;rt++){let Ut=d+rt+H*nt,It=d+rt+H*(nt+1),de=d+(rt+1)+H*(nt+1),se=d+(rt+1)+H*nt;l.push(Ut,It,se),l.push(It,de,se),lt+=6}a.addGroup(f,lt,b),f+=lt,d+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ji=class i extends _e{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new I,h=new at;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Jt(o,3)),this.setAttribute("normal",new Jt(a,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ie=class i extends _e{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,v=[],g=n/2,m=0;M(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Jt(u,3)),this.setAttribute("normal",new Jt(d,3)),this.setAttribute("uv",new Jt(f,2));function M(){let y=new I,T=new I,E=0,P=(e-t)/n;for(let _=0;_<=r;_++){let b=[],A=_/r,L=A*(e-t)+t;for(let B=0;B<=s;B++){let k=B/s,N=k*l+a,H=Math.sin(N),J=Math.cos(N);T.x=L*H,T.y=-A*n+g,T.z=L*J,u.push(T.x,T.y,T.z),y.set(H,P,J).normalize(),d.push(y.x,y.y,y.z),f.push(k,1-A),b.push(p++)}v.push(b)}for(let _=0;_<s;_++)for(let b=0;b<r;b++){let A=v[b][_],L=v[b+1][_],B=v[b+1][_+1],k=v[b][_+1];(t>0||b!==0)&&(h.push(A,L,k),E+=3),(e>0||b!==r-1)&&(h.push(L,B,k),E+=3)}c.addGroup(m,E,0),m+=E}function w(y){let T=p,E=new at,P=new I,_=0,b=y===!0?t:e,A=y===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,g*A,0),d.push(0,A,0),f.push(.5,.5),p++;let L=p;for(let B=0;B<=s;B++){let N=B/s*l+a,H=Math.cos(N),J=Math.sin(N);P.x=b*J,P.y=g*A,P.z=b*H,u.push(P.x,P.y,P.z),d.push(0,A,0),E.x=H*.5+.5,E.y=J*.5*A+.5,f.push(E.x,E.y),p++}for(let B=0;B<s;B++){let k=T+B,N=L+B;y===!0?h.push(N,N+1,k):h.push(N+1,N,k),_+=3}c.addGroup(m,_,y===!0?1:2),m+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Kn=class i extends Ie{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wr=class i extends _e{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Jt(r,3)),this.setAttribute("normal",new Jt(r.slice(),3)),this.setAttribute("uv",new Jt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let w=new I,y=new I,T=new I;for(let E=0;E<e.length;E+=3)f(e[E+0],w),f(e[E+1],y),f(e[E+2],T),l(w,y,T,M)}function l(M,w,y,T){let E=T+1,P=[];for(let _=0;_<=E;_++){P[_]=[];let b=M.clone().lerp(y,_/E),A=w.clone().lerp(y,_/E),L=E-_;for(let B=0;B<=L;B++)B===0&&_===E?P[_][B]=b:P[_][B]=b.clone().lerp(A,B/L)}for(let _=0;_<E;_++)for(let b=0;b<2*(E-_)-1;b++){let A=Math.floor(b/2);b%2===0?(d(P[_][A+1]),d(P[_+1][A]),d(P[_][A])):(d(P[_][A+1]),d(P[_+1][A+1]),d(P[_+1][A]))}}function c(M){let w=new I;for(let y=0;y<r.length;y+=3)w.x=r[y+0],w.y=r[y+1],w.z=r[y+2],w.normalize().multiplyScalar(M),r[y+0]=w.x,r[y+1]=w.y,r[y+2]=w.z}function h(){let M=new I;for(let w=0;w<r.length;w+=3){M.x=r[w+0],M.y=r[w+1],M.z=r[w+2];let y=g(M)/2/Math.PI+.5,T=m(M)/Math.PI+.5;o.push(y,1-T)}p(),u()}function u(){for(let M=0;M<o.length;M+=6){let w=o[M+0],y=o[M+2],T=o[M+4],E=Math.max(w,y,T),P=Math.min(w,y,T);E>.9&&P<.1&&(w<.2&&(o[M+0]+=1),y<.2&&(o[M+2]+=1),T<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,w){let y=M*3;w.x=t[y+0],w.y=t[y+1],w.z=t[y+2]}function p(){let M=new I,w=new I,y=new I,T=new I,E=new at,P=new at,_=new at;for(let b=0,A=0;b<r.length;b+=9,A+=6){M.set(r[b+0],r[b+1],r[b+2]),w.set(r[b+3],r[b+4],r[b+5]),y.set(r[b+6],r[b+7],r[b+8]),E.set(o[A+0],o[A+1]),P.set(o[A+2],o[A+3]),_.set(o[A+4],o[A+5]),T.copy(M).add(w).add(y).divideScalar(3);let L=g(T);v(E,A+0,M,L),v(P,A+2,w,L),v(_,A+4,y,L)}}function v(M,w,y,T){T<0&&M.x===1&&(o[w]=M.x-1),y.x===0&&y.z===0&&(o[w]=T/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var vn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Wt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new at:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new I,s=[],r=[],o=[],a=new I,l=new ue;for(let f=0;f<=t;f++){let p=f/t;s[f]=this.getTangentAt(p,new I)}r[0]=new I,o[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(ee(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ee(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],f*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Os=class extends vn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new at){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},jo=class extends Os{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Vc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var jh=new I,Qh=new I,ec=new Vc,nc=new Vc,ic=new Vc,Qo=class extends vn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Qh.subVectors(s[0],s[1]).add(s[0]),c=Qh);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(jh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=jh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),ec.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,v,g),nc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,v,g),ic.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(ec.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),nc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),ic.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ec.calc(l),nc.calc(l),ic.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function tu(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Jf(i,t){let e=1-i;return e*e*t}function Kf(i,t){return 2*(1-i)*i*t}function $f(i,t){return i*i*t}function dr(i,t,e,n){return Jf(i,t)+Kf(i,e)+$f(i,n)}function jf(i,t){let e=1-i;return e*e*e*t}function Qf(i,t){let e=1-i;return 3*e*e*i*t}function tp(i,t){return 3*(1-i)*i*i*t}function ep(i,t){return i*i*i*t}function fr(i,t,e,n,s){return jf(i,t)+Qf(i,e)+tp(i,n)+ep(i,s)}var Ar=class extends vn{constructor(t=new at,e=new at,n=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new at){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(fr(t,s.x,r.x,o.x,a.x),fr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ta=class extends vn{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(fr(t,s.x,r.x,o.x,a.x),fr(t,s.y,r.y,o.y,a.y),fr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Rr=class extends vn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ea=class extends vn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Cr=class extends vn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(dr(t,s.x,r.x,o.x),dr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},na=class extends vn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(dr(t,s.x,r.x,o.x),dr(t,s.y,r.y,o.y),dr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ir=class extends vn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(tu(a,l.x,c.x,h.x,u.x),tu(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new at().fromArray(s))}return this}},uc=Object.freeze({__proto__:null,ArcCurve:jo,CatmullRomCurve3:Qo,CubicBezierCurve:Ar,CubicBezierCurve3:ta,EllipseCurve:Os,LineCurve:Rr,LineCurve3:ea,QuadraticBezierCurve:Cr,QuadraticBezierCurve3:na,SplineCurve:Ir}),ia=class extends vn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new uc[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new uc[s.type]().fromJSON(s))}return this}},Pr=class extends ia{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Rr(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Cr(this.currentPoint.clone(),new at(t,e),new at(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Ar(this.currentPoint.clone(),new at(t,e),new at(n,s),new at(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Ir(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new Os(t,e,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Bs=class extends Pr{constructor(t){super(t),this.uuid=is(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Pr().fromJSON(s))}return this}};function np(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Ju(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=ap(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,u=l;for(let d=e;d<s;d+=e){let f=i[d],p=i[d+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return Lr(r,o,e,a,l,c,0),o}function Ju(i,t,e,n,s){let r;if(s===xp(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=eu(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=eu(o/n|0,i[o],i[o+1],r);return r&&zs(r,r.next)&&(Nr(r),r=r.next),r}function Ki(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(zs(e,e.next)||Pe(e.prev,e,e.next)===0)){if(Nr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Lr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&dp(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?sp(i,n,s,r):ip(i)){t.push(l.i,i.i,c.i),Nr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=rp(Ki(i),t),Lr(i,t,e,n,s,r,2)):o===2&&op(i,t,e,n,s,r):Lr(Ki(i),t,e,n,s,r,1);break}}}function ip(i){let t=i.prev,e=i,n=i.next;if(Pe(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&cr(s,a,r,l,o,c,p.x,p.y)&&Pe(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function sp(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Pe(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,l,c),p=Math.min(h,u,d),v=Math.max(a,l,c),g=Math.max(h,u,d),m=dc(f,p,t,e,n),M=dc(v,g,t,e,n),w=i.prevZ,y=i.nextZ;for(;w&&w.z>=m&&y&&y.z<=M;){if(w.x>=f&&w.x<=v&&w.y>=p&&w.y<=g&&w!==s&&w!==o&&cr(a,h,l,u,c,d,w.x,w.y)&&Pe(w.prev,w,w.next)>=0||(w=w.prevZ,y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==s&&y!==o&&cr(a,h,l,u,c,d,y.x,y.y)&&Pe(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;w&&w.z>=m;){if(w.x>=f&&w.x<=v&&w.y>=p&&w.y<=g&&w!==s&&w!==o&&cr(a,h,l,u,c,d,w.x,w.y)&&Pe(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;y&&y.z<=M;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==s&&y!==o&&cr(a,h,l,u,c,d,y.x,y.y)&&Pe(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function rp(i,t){let e=i;do{let n=e.prev,s=e.next.next;!zs(n,s)&&$u(n,e,e.next,s)&&Dr(n,s)&&Dr(s,n)&&(t.push(n.i,e.i,s.i),Nr(e),Nr(e.next),e=i=s),e=e.next}while(e!==i);return Ki(e)}function op(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&mp(o,a)){let l=ju(o,a);o=Ki(o,o.next),l=Ki(l,l.next),Lr(o,t,e,n,s,r,0),Lr(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function ap(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Ju(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(pp(c))}s.sort(lp);for(let r=0;r<s.length;r++)e=cp(s[r],e);return e}function lp(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function cp(i,t){let e=hp(i,t);if(!e)return t;let n=ju(e,i);return Ki(n,n.next),Ki(e,e.next)}function hp(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(zs(i,e))return e;do{if(zs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&Ku(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);Dr(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&up(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function up(i,t){return Pe(i.prev,i,t.prev)<0&&Pe(t.next,i,i.next)<0}function dp(i,t,e,n){let s=i;do s.z===0&&(s.z=dc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,fp(s)}function fp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function dc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function pp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Ku(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function cr(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Ku(i,t,e,n,s,r,o,a)}function mp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!gp(i,t)&&(Dr(i,t)&&Dr(t,i)&&_p(i,t)&&(Pe(i.prev,i,t.prev)||Pe(i,t.prev,t))||zs(i,t)&&Pe(i.prev,i,i.next)>0&&Pe(t.prev,t,t.next)>0)}function Pe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function zs(i,t){return i.x===t.x&&i.y===t.y}function $u(i,t,e,n){let s=Lo(Pe(i,t,e)),r=Lo(Pe(i,t,n)),o=Lo(Pe(e,n,i)),a=Lo(Pe(e,n,t));return!!(s!==r&&o!==a||s===0&&Po(i,e,t)||r===0&&Po(i,n,t)||o===0&&Po(e,i,n)||a===0&&Po(e,t,n))}function Po(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Lo(i){return i>0?1:i<0?-1:0}function gp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&$u(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Dr(i,t){return Pe(i.prev,i,i.next)<0?Pe(i,t,i.next)>=0&&Pe(i,i.prev,t)>=0:Pe(i,t,i.prev)<0||Pe(i,i.next,t)<0}function _p(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function ju(i,t){let e=fc(i.i,i.x,i.y),n=fc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function eu(i,t,e,n){let s=fc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Nr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function fc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function xp(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var pc=class{static triangulate(t,e,n=2){return np(t,e,n)}},Wi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];nu(t),iu(n,t);let o=t.length;e.forEach(nu);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,iu(n,e[l]);let a=pc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function nu(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function iu(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Ur=class i extends _e{constructor(t=new Bs([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new Jt(s,3)),this.setAttribute("uv",new Jt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:yp,w,y=!1,T,E,P,_;if(m){w=m.getSpacedPoints(h),y=!0,d=!1;let st=m.isCatmullRomCurve3?m.closed:!1;T=m.computeFrenetFrames(h,st),E=new I,P=new I,_=new I}d||(g=0,f=0,p=0,v=0);let b=a.extractPoints(c),A=b.shape,L=b.holes;if(!Wi.isClockWise(A)){A=A.reverse();for(let st=0,ct=L.length;st<ct;st++){let ut=L[st];Wi.isClockWise(ut)&&(L[st]=ut.reverse())}}function k(st){let ut=10000000000000001e-36,dt=st[0];for(let gt=1;gt<=st.length;gt++){let Gt=gt%st.length,Ht=st[Gt],Zt=Ht.x-dt.x,jt=Ht.y-dt.y,D=Zt*Zt+jt*jt,fe=Math.max(Math.abs(Ht.x),Math.abs(Ht.y),Math.abs(dt.x),Math.abs(dt.y)),re=ut*fe*fe;if(D<=re){st.splice(Gt,1),gt--;continue}dt=Ht}}k(A),L.forEach(k);let N=L.length,H=A;for(let st=0;st<N;st++){let ct=L[st];A=A.concat(ct)}function J(st,ct,ut){return ct||qt("ExtrudeGeometry: vec does not exist"),st.clone().addScaledVector(ct,ut)}let Z=A.length;function lt(st,ct,ut){let dt,gt,Gt,Ht=st.x-ct.x,Zt=st.y-ct.y,jt=ut.x-st.x,D=ut.y-st.y,fe=Ht*Ht+Zt*Zt,re=Ht*D-Zt*jt;if(Math.abs(re)>Number.EPSILON){let C=Math.sqrt(fe),x=Math.sqrt(jt*jt+D*D),z=ct.x-Zt/C,W=ct.y+Ht/C,$=ut.x-D/x,ft=ut.y+jt/x,pt=(($-z)*D-(ft-W)*jt)/(Ht*D-Zt*jt);dt=z+Ht*pt-st.x,gt=W+Zt*pt-st.y;let j=dt*dt+gt*gt;if(j<=2)return new at(dt,gt);Gt=Math.sqrt(j/2)}else{let C=!1;Ht>Number.EPSILON?jt>Number.EPSILON&&(C=!0):Ht<-Number.EPSILON?jt<-Number.EPSILON&&(C=!0):Math.sign(Zt)===Math.sign(D)&&(C=!0),C?(dt=-Zt,gt=Ht,Gt=Math.sqrt(fe)):(dt=Ht,gt=Zt,Gt=Math.sqrt(fe/2))}return new at(dt/Gt,gt/Gt)}let K=[];for(let st=0,ct=H.length,ut=ct-1,dt=st+1;st<ct;st++,ut++,dt++)ut===ct&&(ut=0),dt===ct&&(dt=0),K[st]=lt(H[st],H[ut],H[dt]);let nt=[],rt,Ut=K.concat();for(let st=0,ct=N;st<ct;st++){let ut=L[st];rt=[];for(let dt=0,gt=ut.length,Gt=gt-1,Ht=dt+1;dt<gt;dt++,Gt++,Ht++)Gt===gt&&(Gt=0),Ht===gt&&(Ht=0),rt[dt]=lt(ut[dt],ut[Gt],ut[Ht]);nt.push(rt),Ut=Ut.concat(rt)}let It;if(g===0)It=Wi.triangulateShape(H,L);else{let st=[],ct=[];for(let ut=0;ut<g;ut++){let dt=ut/g,gt=f*Math.cos(dt*Math.PI/2),Gt=p*Math.sin(dt*Math.PI/2)+v;for(let Ht=0,Zt=H.length;Ht<Zt;Ht++){let jt=J(H[Ht],K[Ht],Gt);St(jt.x,jt.y,-gt),dt===0&&st.push(jt)}for(let Ht=0,Zt=N;Ht<Zt;Ht++){let jt=L[Ht];rt=nt[Ht];let D=[];for(let fe=0,re=jt.length;fe<re;fe++){let C=J(jt[fe],rt[fe],Gt);St(C.x,C.y,-gt),dt===0&&D.push(C)}dt===0&&ct.push(D)}}It=Wi.triangulateShape(st,ct)}let de=It.length,se=p+v;for(let st=0;st<Z;st++){let ct=d?J(A[st],Ut[st],se):A[st];y?(P.copy(T.normals[0]).multiplyScalar(ct.x),E.copy(T.binormals[0]).multiplyScalar(ct.y),_.copy(w[0]).add(P).add(E),St(_.x,_.y,_.z)):St(ct.x,ct.y,0)}for(let st=1;st<=h;st++)for(let ct=0;ct<Z;ct++){let ut=d?J(A[ct],Ut[ct],se):A[ct];y?(P.copy(T.normals[st]).multiplyScalar(ut.x),E.copy(T.binormals[st]).multiplyScalar(ut.y),_.copy(w[st]).add(P).add(E),St(_.x,_.y,_.z)):St(ut.x,ut.y,u/h*st)}for(let st=g-1;st>=0;st--){let ct=st/g,ut=f*Math.cos(ct*Math.PI/2),dt=p*Math.sin(ct*Math.PI/2)+v;for(let gt=0,Gt=H.length;gt<Gt;gt++){let Ht=J(H[gt],K[gt],dt);St(Ht.x,Ht.y,u+ut)}for(let gt=0,Gt=L.length;gt<Gt;gt++){let Ht=L[gt];rt=nt[gt];for(let Zt=0,jt=Ht.length;Zt<jt;Zt++){let D=J(Ht[Zt],rt[Zt],dt);y?St(D.x,D.y+w[h-1].y,w[h-1].x+ut):St(D.x,D.y,u+ut)}}}ce(),Q();function ce(){let st=s.length/3;if(d){let ct=0,ut=Z*ct;for(let dt=0;dt<de;dt++){let gt=It[dt];Xt(gt[2]+ut,gt[1]+ut,gt[0]+ut)}ct=h+g*2,ut=Z*ct;for(let dt=0;dt<de;dt++){let gt=It[dt];Xt(gt[0]+ut,gt[1]+ut,gt[2]+ut)}}else{for(let ct=0;ct<de;ct++){let ut=It[ct];Xt(ut[2],ut[1],ut[0])}for(let ct=0;ct<de;ct++){let ut=It[ct];Xt(ut[0]+Z*h,ut[1]+Z*h,ut[2]+Z*h)}}n.addGroup(st,s.length/3-st,0)}function Q(){let st=s.length/3,ct=0;it(H,ct),ct+=H.length;for(let ut=0,dt=L.length;ut<dt;ut++){let gt=L[ut];it(gt,ct),ct+=gt.length}n.addGroup(st,s.length/3-st,1)}function it(st,ct){let ut=st.length;for(;--ut>=0;){let dt=ut,gt=ut-1;gt<0&&(gt=st.length-1);for(let Gt=0,Ht=h+g*2;Gt<Ht;Gt++){let Zt=Z*Gt,jt=Z*(Gt+1),D=ct+dt+Zt,fe=ct+gt+Zt,re=ct+gt+jt,C=ct+dt+jt;At(D,fe,re,C)}}}function St(st,ct,ut){l.push(st),l.push(ct),l.push(ut)}function Xt(st,ct,ut){Yt(st),Yt(ct),Yt(ut);let dt=s.length/3,gt=M.generateTopUV(n,s,dt-3,dt-2,dt-1);xe(gt[0]),xe(gt[1]),xe(gt[2])}function At(st,ct,ut,dt){Yt(st),Yt(ct),Yt(dt),Yt(ct),Yt(ut),Yt(dt);let gt=s.length/3,Gt=M.generateSideWallUV(n,s,gt-6,gt-3,gt-2,gt-1);xe(Gt[0]),xe(Gt[1]),xe(Gt[3]),xe(Gt[1]),xe(Gt[2]),xe(Gt[3])}function Yt(st){s.push(l[st*3+0]),s.push(l[st*3+1]),s.push(l[st*3+2])}function xe(st){r.push(st.x),r.push(st.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return vp(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new uc[s.type]().fromJSON(s)),new i(n,t.options)}},yp={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new at(r,o),new at(a,l),new at(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],p=t[s*3+2],v=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new at(o,1-l),new at(c,1-u),new at(d,1-p),new at(v,1-m)]:[new at(a,1-l),new at(h,1-u),new at(f,1-p),new at(g,1-m)]}};function vp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var ui=class i extends wr{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},Fr=class i extends _e{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ee(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/e,u=new I,d=new at,f=new I,p=new I,v=new I,g=0,m=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:g=t[M+1].x-t[M].x,m=t[M+1].y-t[M].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:g=t[M+1].x-t[M].x,m=t[M+1].y-t[M].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(p)}for(let M=0;M<=e;M++){let w=n+M*h*s,y=Math.sin(w),T=Math.cos(w);for(let E=0;E<=t.length-1;E++){u.x=t[E].x*y,u.y=t[E].y,u.z=t[E].x*T,o.push(u.x,u.y,u.z),d.x=M/e,d.y=E/(t.length-1),a.push(d.x,d.y);let P=l[3*E+0]*y,_=l[3*E+1],b=l[3*E+0]*T;c.push(P,_,b)}}for(let M=0;M<e;M++)for(let w=0;w<t.length-1;w++){let y=w+M*t.length,T=y,E=y+t.length,P=y+t.length+1,_=y+1;r.push(T,E,_),r.push(P,_,E)}this.setIndex(r),this.setAttribute("position",new Jt(o,3)),this.setAttribute("uv",new Jt(a,2)),this.setAttribute("normal",new Jt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},Or=class i extends wr{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},$i=class i extends _e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){let M=m*d-o;for(let w=0;w<c;w++){let y=w*u-r;p.push(y,-M,0),v.push(0,0,1),g.push(w/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<a;M++){let w=M+c*m,y=M+c*(m+1),T=M+1+c*(m+1),E=M+1+c*m;f.push(w,y,E),f.push(y,T,E)}this.setIndex(f),this.setAttribute("position",new Jt(p,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Br=class i extends _e{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],l=[],c=[],h=[],u=t,d=(e-t)/s,f=new I,p=new at;for(let v=0;v<=s;v++){for(let g=0;g<=n;g++){let m=r+g/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}u+=d}for(let v=0;v<s;v++){let g=v*(n+1);for(let m=0;m<n;m++){let M=m+g,w=M,y=M+n+1,T=M+n+2,E=M+1;a.push(w,y,E),a.push(y,T,E)}}this.setIndex(a),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(c,3)),this.setAttribute("uv",new Jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var cn=class i extends _e{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new I,d=new I,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){let M=[],w=m/n,y=o+w*a,T=t*Math.cos(y),E=Math.sqrt(t*t-T*T),P=0;m===0&&o===0?P=.5/e:m===n&&l===Math.PI&&(P=-.5/e);for(let _=0;_<=e;_++){let b=_/e,A=s+b*r;u.x=-E*Math.cos(A),u.y=T,u.z=E*Math.sin(A),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(b+P,1-w),M.push(c++)}h.push(M)}for(let m=0;m<n;m++)for(let M=0;M<e;M++){let w=h[m][M+1],y=h[m][M],T=h[m+1][M],E=h[m+1][M+1];(m!==0||o>0)&&f.push(w,y,E),(m!==n-1||l<Math.PI)&&f.push(y,T,E)}this.setIndex(f),this.setAttribute("position",new Jt(p,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ji=class i extends _e{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],u=[],d=new I,f=new I,p=new I;for(let v=0;v<=n;v++){let g=o+v/n*a;for(let m=0;m<=s;m++){let M=m/s*r;f.x=(t+e*Math.cos(g))*Math.cos(M),f.y=(t+e*Math.cos(g))*Math.sin(M),f.z=e*Math.sin(g),c.push(f.x,f.y,f.z),d.x=t*Math.cos(M),d.y=t*Math.sin(M),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(m/s),u.push(v/n)}}for(let v=1;v<=n;v++)for(let g=1;g<=s;g++){let m=(s+1)*v+g-1,M=(s+1)*(v-1)+g-1,w=(s+1)*(v-1)+g,y=(s+1)*v+g;l.push(m,M,y),l.push(M,w,y)}this.setIndex(l),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function ss(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(su(s))s.isRenderTargetTexture?(Wt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(su(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function sn(i){let t={};for(let e=0;e<i.length;e++){let n=ss(i[e]);for(let s in n)t[s]=n[s]}return t}function su(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function bp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Wc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}var ll={clone:ss,merge:sn},Mp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ue=class extends hi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mp,this.fragmentShader=Sp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ss(t.uniforms),this.uniformsGroups=bp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new mt().setHex(s.value);break;case"v2":this.uniforms[n].value=new at().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ce().fromArray(s.value);break;case"m3":this.uniforms[n].value=new $t().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ue().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},sa=class extends Ue{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Je=class extends hi{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new mt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rl,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ra=class extends hi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},oa=class extends hi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ss(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function sc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ti=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},aa=class extends Ti{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ac,endingEnd:ac}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case lc:r=t,a=2*e-n;break;case cc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case lc:o=t,l=2*n-e;break;case cc:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-e)/(s-e),v=p*p,g=v*p,m=-d*g+2*d*v-d*p,M=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*p+1,w=(-1-f)*g+(1.5+f)*v+.5*p,y=f*g-f*v;for(let T=0;T!==a;++T)r[T]=m*o[h+T]+M*o[c+T]+w*o[l+T]+y*o[u+T];return r}},la=class extends Ti{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},ca=class extends Ti{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ha=class extends Ti{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-e)/(s-e),v=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*v+o[l+g]*p;return r}let d=a*2,f=t-1;for(let p=0;p!==a;++p){let v=o[c+p],g=o[l+p],m=f*d+p*2,M=u[m],w=u[m+1],y=t*d+p*2,T=h[y],E=h[y+1],P=Tp(n,e,M,T,s);r[p]=Qu(P,v,w,E,g)}return r}};function Qu(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Ep(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Tp(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Qu(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=Ep(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var bn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ss(e,this.TimeBufferType),this.values=Ss(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ss(t.times,Array),values:Ss(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),sc(t.settings)&&(n.settings={inTangents:Ss(t.settings.inTangents,Array),outTangents:Ss(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ca(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new la(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new aa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ha(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case pr:e=this.InterpolantFactoryMethodDiscrete;break;case qo:e=this.InterpolantFactoryMethodLinear;break;case Uo:e=this.InterpolantFactoryMethodSmooth;break;case oc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Wt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return pr;case this.InterpolantFactoryMethodLinear:return qo;case this.InterpolantFactoryMethodSmooth:return Uo;case this.InterpolantFactoryMethodBezier:return oc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;sc(this.settings)&&(ru(this.settings.inTangents,t),ru(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(qt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(qt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){qt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){qt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&ff(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){qt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Uo,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let v=e[u+p];if(v!==e[d+p]||v!==e[f+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,sc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function ru(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}bn.prototype.ValueTypeName="";bn.prototype.TimeBufferType=Float32Array;bn.prototype.ValueBufferType=Float32Array;bn.prototype.DefaultInterpolation=qo;var wi=class extends bn{constructor(t,e,n){super(t,e,n)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=pr;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var ua=class extends bn{constructor(t,e,n,s){super(t,e,n,s)}};ua.prototype.ValueTypeName="color";var da=class extends bn{constructor(t,e,n,s){super(t,e,n,s)}};da.prototype.ValueTypeName="number";var fa=class extends Ti{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)ln.slerpFlat(r,0,o,c-a,o,c,l);return r}},zr=class extends bn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new fa(this.times,this.values,this.getValueSize(),t)}};zr.prototype.ValueTypeName="quaternion";zr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ai=class extends bn{constructor(t,e,n){super(t,e,n)}};Ai.prototype.ValueTypeName="string";Ai.prototype.ValueBufferType=Array;Ai.prototype.DefaultInterpolation=pr;Ai.prototype.InterpolantFactoryMethodLinear=void 0;Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var pa=class extends bn{constructor(t,e,n,s){super(t,e,n,s)}};pa.prototype.ValueTypeName="vector";var ma=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},td=new ma,ga=class{constructor(t){this.manager=t!==void 0?t:td,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ga.DEFAULT_MATERIAL_NAME="__DEFAULT";var ks=class extends Qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new mt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},kr=class extends ks{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},rc=new ue,ou=new I,au=new I,Hr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Us,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;ou.setFromMatrixPosition(t.matrixWorld),e.position.copy(ou),au.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(au),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){rc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(rc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Cs||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(rc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Do=new I,No=new ln,Wn=new I,Gr=class extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Do,No,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Do,No,Wn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Do,No,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Do,No,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Mi=new I,lu=new at,cu=new at,$e=class extends Gr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ps*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(hr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ps*2*Math.atan(Math.tan(hr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Mi.x,Mi.y).multiplyScalar(-t/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mi.x,Mi.y).multiplyScalar(-t/Mi.z)}getViewSize(t,e){return this.getViewBounds(t,lu,cu),e.subVectors(cu,lu)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(hr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var mc=class extends Hr{constructor(){super(new $e(90,1,.5,500)),this.isPointLightShadow=!0}},Qi=class extends ks{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new mc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Hs=class extends Gr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},gc=class extends Hr{constructor(){super(new Hs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Vr=class extends ks{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.shadow=new gc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Es=-90,Ts=1,_a=class extends Qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new $e(Es,Ts,t,e);s.layers=this.layers,this.add(s);let r=new $e(Es,Ts,t,e);r.layers=this.layers,this.add(r);let o=new $e(Es,Ts,t,e);o.layers=this.layers,this.add(o);let a=new $e(Es,Ts,t,e);a.layers=this.layers,this.add(a);let l=new $e(Es,Ts,t,e);l.layers=this.layers,this.add(l);let c=new $e(Es,Ts,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Cs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},xa=class extends $e{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Xc="\\[\\]\\.:\\/",wp=new RegExp("["+Xc+"]","g"),qc="[^"+Xc+"]",Ap="[^"+Xc.replace("\\.","")+"]",Rp=/((?:WC+[\/:])*)/.source.replace("WC",qc),Cp=/(WCOD+)?/.source.replace("WCOD",Ap),Ip=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qc),Pp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qc),Lp=new RegExp("^"+Rp+Cp+Ip+Pp+"$"),Dp=["material","materials","bones","map"],_c=class{constructor(t,e,n){let s=n||Re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Re=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(wp,"")}static parseTrackName(t){let e=Lp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Dp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Wt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){qt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){qt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){qt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){qt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){qt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;qt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=_c;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _v=new Float32Array(1);var Gs=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ee(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ee(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var jc=class jc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};jc.prototype.isMatrix2=!0;var xc=jc;var Wr=class extends On{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Yc(i,t,e,n){let s=Np(n);switch(e){case Oc:return i*t;case Ys:return i*t/s.components*s.byteLength;case wa:return i*t/s.components*s.byteLength;case Di:return i*t*2/s.components*s.byteLength;case Aa:return i*t*2/s.components*s.byteLength;case Bc:return i*t*3/s.components*s.byteLength;case An:return i*t*4/s.components*s.byteLength;case Ra:return i*t*4/s.components*s.byteLength;case Zr:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Kr:case $r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:case La:return Math.max(i,16)*Math.max(t,8)/4;case Ca:case Pa:return Math.max(i,8)*Math.max(t,8)/2;case Da:case Na:case Fa:case Oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ua:case jr:case Ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case za:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Za:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case $a:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Qa:case tl:case el:return Math.ceil(i/4)*Math.ceil(t/4)*16;case nl:case il:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Qr:case sl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Np(i){switch(i){case fn:case Dc:return{byteLength:1,components:1};case Xs:case Nc:case kn:return{byteLength:2,components:1};case Ea:case Ta:return{byteLength:2,components:4};case zn:case Sa:case wn:return{byteLength:4,components:1};case Uc:case Fc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Wt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Md(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Hp(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],v=u[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let v=u[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Gp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vp=`#ifdef USE_ALPHAHASH
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
#endif`,Wp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zp=`#ifdef USE_AOMAP
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
#endif`,Jp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kp=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,$p=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,em=`#ifdef USE_IRIDESCENCE
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
#endif`,nm=`#ifdef USE_BUMPMAP
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
#endif`,im=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,am=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,lm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,cm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,um=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,dm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fm=`vec3 transformedNormal = objectNormal;
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
#endif`,pm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_m=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xm="gl_FragColor = linearToOutputTexel( gl_FragColor );",ym=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,bm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Mm=`#ifdef USE_ENVMAP
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
#endif`,Sm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Em=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Am=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cm=`#ifdef USE_GRADIENTMAP
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
}`,Im=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dm=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,Nm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Um=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Om=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,km=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Hm=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Gm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Xm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ym=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Km=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$m=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jm=`#if defined( USE_POINTS_UV )
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
#endif`,Qm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,t0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,e0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,n0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,i0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,s0=`#ifdef USE_MORPHTARGETS
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
#endif`,r0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,a0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,l0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,c0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,h0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,u0=`#ifdef USE_NORMALMAP
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
#endif`,d0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,f0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,p0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,m0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,g0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,x0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,y0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,v0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,b0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,M0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,S0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,E0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,T0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,w0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,A0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,R0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,C0=`#ifdef USE_SKINNING
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
#endif`,I0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,P0=`#ifdef USE_SKINNING
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
#endif`,L0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,D0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,N0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,U0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,F0=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,O0=`#ifdef USE_TRANSMISSION
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
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,z0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,G0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,V0=`uniform sampler2D t2D;
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
}`,W0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z0=`#include <common>
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
}`,J0=`#if DEPTH_PACKING == 3200
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
}`,K0=`#define DISTANCE
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
}`,$0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,j0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Q0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`uniform float scale;
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
}`,eg=`uniform vec3 diffuse;
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
}`,ng=`#include <common>
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
}`,ig=`uniform vec3 diffuse;
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
}`,sg=`#define LAMBERT
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
}`,rg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,og=`#define MATCAP
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
}`,ag=`#define MATCAP
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
}`,lg=`#define NORMAL
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
}`,cg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,hg=`#define PHONG
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
}`,ug=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,dg=`#define STANDARD
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
}`,fg=`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,pg=`#define TOON
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
}`,mg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,gg=`uniform float size;
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
}`,_g=`uniform vec3 diffuse;
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
}`,xg=`#include <common>
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
}`,yg=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,vg=`uniform float rotation;
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
}`,bg=`uniform vec3 diffuse;
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
}`,ie={alphahash_fragment:Gp,alphahash_pars_fragment:Vp,alphamap_fragment:Wp,alphamap_pars_fragment:Xp,alphatest_fragment:qp,alphatest_pars_fragment:Yp,aomap_fragment:Zp,aomap_pars_fragment:Jp,batching_pars_vertex:Kp,batching_vertex:$p,begin_vertex:jp,beginnormal_vertex:Qp,bsdfs:tm,iridescence_fragment:em,bumpmap_pars_fragment:nm,clipping_planes_fragment:im,clipping_planes_pars_fragment:sm,clipping_planes_pars_vertex:rm,clipping_planes_vertex:om,color_fragment:am,color_pars_fragment:lm,color_pars_vertex:cm,color_vertex:hm,common:um,cube_uv_reflection_fragment:dm,defaultnormal_vertex:fm,displacementmap_pars_vertex:pm,displacementmap_vertex:mm,emissivemap_fragment:gm,emissivemap_pars_fragment:_m,colorspace_fragment:xm,colorspace_pars_fragment:ym,envmap_fragment:vm,envmap_common_pars_fragment:bm,envmap_pars_fragment:Mm,envmap_pars_vertex:Sm,envmap_physical_pars_fragment:Nm,envmap_vertex:Em,fog_vertex:Tm,fog_pars_vertex:wm,fog_fragment:Am,fog_pars_fragment:Rm,gradientmap_pars_fragment:Cm,lightmap_pars_fragment:Im,lights_lambert_fragment:Pm,lights_lambert_pars_fragment:Lm,lights_pars_begin:Dm,lights_toon_fragment:Um,lights_toon_pars_fragment:Fm,lights_phong_fragment:Om,lights_phong_pars_fragment:Bm,lights_physical_fragment:zm,lights_physical_pars_fragment:km,lights_fragment_begin:Hm,lights_fragment_maps:Gm,lights_fragment_end:Vm,lightprobes_pars_fragment:Wm,logdepthbuf_fragment:Xm,logdepthbuf_pars_fragment:qm,logdepthbuf_pars_vertex:Ym,logdepthbuf_vertex:Zm,map_fragment:Jm,map_pars_fragment:Km,map_particle_fragment:$m,map_particle_pars_fragment:jm,metalnessmap_fragment:Qm,metalnessmap_pars_fragment:t0,morphinstance_vertex:e0,morphcolor_vertex:n0,morphnormal_vertex:i0,morphtarget_pars_vertex:s0,morphtarget_vertex:r0,normal_fragment_begin:o0,normal_fragment_maps:a0,normal_pars_fragment:l0,normal_pars_vertex:c0,normal_vertex:h0,normalmap_pars_fragment:u0,clearcoat_normal_fragment_begin:d0,clearcoat_normal_fragment_maps:f0,clearcoat_pars_fragment:p0,iridescence_pars_fragment:m0,opaque_fragment:g0,packing:_0,premultiplied_alpha_fragment:x0,project_vertex:y0,dithering_fragment:v0,dithering_pars_fragment:b0,roughnessmap_fragment:M0,roughnessmap_pars_fragment:S0,shadowmap_pars_fragment:E0,shadowmap_pars_vertex:T0,shadowmap_vertex:w0,shadowmask_pars_fragment:A0,skinbase_vertex:R0,skinning_pars_vertex:C0,skinning_vertex:I0,skinnormal_vertex:P0,specularmap_fragment:L0,specularmap_pars_fragment:D0,tonemapping_fragment:N0,tonemapping_pars_fragment:U0,transmission_fragment:F0,transmission_pars_fragment:O0,uv_pars_fragment:B0,uv_pars_vertex:z0,uv_vertex:k0,worldpos_vertex:H0,background_vert:G0,background_frag:V0,backgroundCube_vert:W0,backgroundCube_frag:X0,cube_vert:q0,cube_frag:Y0,depth_vert:Z0,depth_frag:J0,distance_vert:K0,distance_frag:$0,equirect_vert:j0,equirect_frag:Q0,linedashed_vert:tg,linedashed_frag:eg,meshbasic_vert:ng,meshbasic_frag:ig,meshlambert_vert:sg,meshlambert_frag:rg,meshmatcap_vert:og,meshmatcap_frag:ag,meshnormal_vert:lg,meshnormal_frag:cg,meshphong_vert:hg,meshphong_frag:ug,meshphysical_vert:dg,meshphysical_frag:fg,meshtoon_vert:pg,meshtoon_frag:mg,points_vert:gg,points_frag:_g,shadow_vert:xg,shadow_frag:yg,sprite_vert:vg,sprite_frag:bg},_t={common:{diffuse:{value:new mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new mt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},ti={basic:{uniforms:sn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:sn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new mt(0)},envMapIntensity:{value:1}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:sn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new mt(0)},specular:{value:new mt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:sn([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:sn([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new mt(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:sn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:sn([_t.points,_t.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:sn([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:sn([_t.common,_t.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:sn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:sn([_t.sprite,_t.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distance:{uniforms:sn([_t.common,_t.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distance_vert,fragmentShader:ie.distance_frag},shadow:{uniforms:sn([_t.lights,_t.fog,{color:{value:new mt(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};ti.physical={uniforms:sn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new mt(0)},specularColor:{value:new mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};var cl={r:0,b:0,g:0},Mg=new ue,Sd=new $t;Sd.set(-1,0,0,0,1,0,0,0,1);function Sg(i,t,e,n,s,r){let o=new mt(0),a=s===!0?0:1,l,c,h=null,u=0,d=null;function f(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){let y=M.backgroundBlurriness>0;w=t.get(w,y)}return w}function p(M){let w=!1,y=f(M);y===null?g(o,a):y&&y.isColor&&(g(y,1),w=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(M,w){let y=f(w);y&&(y.isCubeTexture||y.mapping===qr)?(c===void 0&&(c=new zt(new Jn(1,1,1),new Ue({name:"BackgroundCubeMaterial",uniforms:ss(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(w.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Sd),c.material.toneMapped=ae.getTransfer(y.colorSpace)!==ge,(h!==y||u!==y.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,d=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new zt(new $i(2,2),new Ue({name:"BackgroundMaterial",uniforms:ss(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=ae.getTransfer(y.colorSpace)!==ge,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,d=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,w){M.getRGB(cl,Wc(i)),e.buffers.color.setClear(cl.r,cl.g,cl.b,w,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,w=1){o.set(M),a=w,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,g(o,a)},render:p,addToRenderList:v,dispose:m}}function Eg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(L,B,k,N,H){let J=!1,Z=u(L,N,k,B);r!==Z&&(r=Z,c(r.object)),J=f(L,N,k,H),J&&p(L,N,k,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,y(L,B,k,N),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(L){return i.bindVertexArray(L)}function h(L){return i.deleteVertexArray(L)}function u(L,B,k,N){let H=N.wireframe===!0,J=n[B.id];J===void 0&&(J={},n[B.id]=J);let Z=L.isInstancedMesh===!0?L.id:0,lt=J[Z];lt===void 0&&(lt={},J[Z]=lt);let K=lt[k.id];K===void 0&&(K={},lt[k.id]=K);let nt=K[H];return nt===void 0&&(nt=d(l()),K[H]=nt),nt}function d(L){let B=[],k=[],N=[];for(let H=0;H<e;H++)B[H]=0,k[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:k,attributeDivisors:N,object:L,attributes:{},index:null}}function f(L,B,k,N){let H=r.attributes,J=B.attributes,Z=0,lt=k.getAttributes();for(let K in lt)if(lt[K].location>=0){let rt=H[K],Ut=J[K];if(Ut===void 0&&(K==="instanceMatrix"&&L.instanceMatrix&&(Ut=L.instanceMatrix),K==="instanceColor"&&L.instanceColor&&(Ut=L.instanceColor)),rt===void 0||rt.attribute!==Ut||Ut&&rt.data!==Ut.data)return!0;Z++}return r.attributesNum!==Z||r.index!==N}function p(L,B,k,N){let H={},J=B.attributes,Z=0,lt=k.getAttributes();for(let K in lt)if(lt[K].location>=0){let rt=J[K];rt===void 0&&(K==="instanceMatrix"&&L.instanceMatrix&&(rt=L.instanceMatrix),K==="instanceColor"&&L.instanceColor&&(rt=L.instanceColor));let Ut={};Ut.attribute=rt,rt&&rt.data&&(Ut.data=rt.data),H[K]=Ut,Z++}r.attributes=H,r.attributesNum=Z,r.index=N}function v(){let L=r.newAttributes;for(let B=0,k=L.length;B<k;B++)L[B]=0}function g(L){m(L,0)}function m(L,B){let k=r.newAttributes,N=r.enabledAttributes,H=r.attributeDivisors;k[L]=1,N[L]===0&&(i.enableVertexAttribArray(L),N[L]=1),H[L]!==B&&(i.vertexAttribDivisor(L,B),H[L]=B)}function M(){let L=r.newAttributes,B=r.enabledAttributes;for(let k=0,N=B.length;k<N;k++)B[k]!==L[k]&&(i.disableVertexAttribArray(k),B[k]=0)}function w(L,B,k,N,H,J,Z){Z===!0?i.vertexAttribIPointer(L,B,k,H,J):i.vertexAttribPointer(L,B,k,N,H,J)}function y(L,B,k,N){v();let H=N.attributes,J=k.getAttributes(),Z=B.defaultAttributeValues;for(let lt in J){let K=J[lt];if(K.location>=0){let nt=H[lt];if(nt===void 0&&(lt==="instanceMatrix"&&L.instanceMatrix&&(nt=L.instanceMatrix),lt==="instanceColor"&&L.instanceColor&&(nt=L.instanceColor)),nt!==void 0){let rt=nt.normalized,Ut=nt.itemSize,It=t.get(nt);if(It===void 0)continue;let de=It.buffer,se=It.type,ce=It.bytesPerElement,Q=se===i.INT||se===i.UNSIGNED_INT||nt.gpuType===Sa;if(nt.isInterleavedBufferAttribute){let it=nt.data,St=it.stride,Xt=nt.offset;if(it.isInstancedInterleavedBuffer){for(let At=0;At<K.locationSize;At++)m(K.location+At,it.meshPerAttribute);L.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let At=0;At<K.locationSize;At++)g(K.location+At);i.bindBuffer(i.ARRAY_BUFFER,de);for(let At=0;At<K.locationSize;At++)w(K.location+At,Ut/K.locationSize,se,rt,St*ce,(Xt+Ut/K.locationSize*At)*ce,Q)}else{if(nt.isInstancedBufferAttribute){for(let it=0;it<K.locationSize;it++)m(K.location+it,nt.meshPerAttribute);L.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let it=0;it<K.locationSize;it++)g(K.location+it);i.bindBuffer(i.ARRAY_BUFFER,de);for(let it=0;it<K.locationSize;it++)w(K.location+it,Ut/K.locationSize,se,rt,Ut*ce,Ut/K.locationSize*it*ce,Q)}}else if(Z!==void 0){let rt=Z[lt];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(K.location,rt);break;case 3:i.vertexAttrib3fv(K.location,rt);break;case 4:i.vertexAttrib4fv(K.location,rt);break;default:i.vertexAttrib1fv(K.location,rt)}}}}M()}function T(){b();for(let L in n){let B=n[L];for(let k in B){let N=B[k];for(let H in N){let J=N[H];for(let Z in J)h(J[Z].object),delete J[Z];delete N[H]}}delete n[L]}}function E(L){if(n[L.id]===void 0)return;let B=n[L.id];for(let k in B){let N=B[k];for(let H in N){let J=N[H];for(let Z in J)h(J[Z].object),delete J[Z];delete N[H]}}delete n[L.id]}function P(L){for(let B in n){let k=n[B];for(let N in k){let H=k[N];if(H[L.id]===void 0)continue;let J=H[L.id];for(let Z in J)h(J[Z].object),delete J[Z];delete H[L.id]}}}function _(L){for(let B in n){let k=n[B],N=L.isInstancedMesh===!0?L.id:0,H=k[N];if(H!==void 0){for(let J in H){let Z=H[J];for(let lt in Z)h(Z[lt].object),delete Z[lt];delete H[J]}delete k[N],Object.keys(k).length===0&&delete n[B]}}}function b(){A(),o=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:b,resetDefaultState:A,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function Tg(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function wg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==An&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){let _=P===kn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==fn&&P!==wn&&!_&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Wt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Wt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:y,maxSamples:T,samples:E}}function Ag(i){let t=this,e=null,n=0,s=!1,r=!1,o=new yn,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=i.get(u);if(!s||p===null||p.length===0||r&&!g)r?h(null):c();else{let M=r?0:n,w=M*4,y=m.clippingState||null;l.value=y,y=h(p,d,w,f);for(let T=0;T!==w;++T)y[T]=e[T];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,p){let v=u!==null?u.length:0,g=null;if(v!==0){if(g=l.value,p!==!0||g===null){let m=f+v*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let w=0,y=f;w!==v;++w,y+=4)o.copy(u[w]).applyMatrix4(M,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}var Js=4,Rg=6,Cg=20,Ig=256,to=new Hs,ed=new mt,Qc=null,th=0,eh=0,nh=!1,Pg=new I,rs=new I,ul=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Pg}=r;Qc=this._renderer.getRenderTarget(),th=this._renderer.getActiveCubeFace(),eh=this._renderer.getActiveMipmapLevel(),nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=id(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Qc,th,eh),this._renderer.xr.enabled=nh,t.scissorTest=!1,Zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ii||t.mapping===ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qc=this._renderer.getRenderTarget(),th=this._renderer.getActiveCubeFace(),eh=this._renderer.getActiveMipmapLevel(),nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:je,minFilter:je,generateMipmaps:!1,type:kn,format:An,colorSpace:mr,depthBuffer:!1},s=nd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nd(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Lg(r)),this._blurMaterial=Ng(r,t,e),this._ggxMaterial=Dg(r,t,e)}return s}_compileMaterial(t){let e=new zt(new _e,t);this._renderer.compile(e,to)}_sceneToCubeUV(t,e,n,s,r){let l=new $e(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(ed),u.toneMapping=Bn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new zt(new Jn,new Ze({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,g=v.material,m=!1,M=t.background;M?M.isColor&&(g.color.copy(M),t.background=null,m=!0):(g.color.copy(ed),m=!0);for(let w=0;w<6;w++){let y=w%3;y===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):y===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));let T=this._cubeSize;Zs(s,y*T,w>2?T:0,T,T),u.setRenderTarget(s),m&&u.render(v,l),u.render(t,l)}u.toneMapping=f,u.autoClear=d,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ii||t.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=id());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Zs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,to)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,f=u*d,{_lodMax:p}=this,v=this._sizeLods[n],g=3*v*(n>p-Js?n-p+Js:0),m=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=p-e,Zs(r,g,m,3*v,2*v),s.setRenderTarget(r),s.render(a,to),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Zs(t,g,m,3*v,2*v),s.setRenderTarget(t),s.render(a,to)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],u=3*h*(s>this._lodMax-Js?s-this._lodMax+Js:0),d=4*(this._cubeSize-h);Zs(e,u,d,3*h,2*h),o.setRenderTarget(e),o.render(l,to)}};function Lg(i){let t=[],e=[],n=i,s=i-Js+1+Rg;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,p=new Float32Array(f*d*u),v=new Float32Array(f*d*u);for(let m=0;m<u;m++){let M=m%3*2/3-1,w=m>2?0:-1,y=[M,w,0,M+2/3,w,0,M+2/3,w+1,0,M,w,0,M+2/3,w+1,0,M,w+1,0];p.set(y,f*d*m);for(let T=0;T<d;T++){let E=h[T*2]*2-1,P=h[T*2+1]*2-1;m===0?rs.set(1,P,E):m===1?rs.set(-E,1,-P):m===2?rs.set(-E,P,1):m===3?rs.set(-1,P,-E):m===4?rs.set(-E,-1,P):rs.set(E,P,-1),rs.toArray(v,(m*d+T)*f)}}let g=new _e;g.setAttribute("position",new De(p,f)),g.setAttribute("outputDirection",new De(v,f)),e.push(new zt(g,null)),n>Js&&n--}return{lodMeshes:e,sizeLods:t}}function nd(i,t,e){let n=new dn(i,t,e);return n.texture.mapping=qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Dg(i,t,e){return new Ue({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ig,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Ng(i,t,e){return new Ue({name:"SphericalGaussianBlur",defines:{SAMPLES:Cg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:pl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function id(){return new Ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pl(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function sd(){return new Ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function pl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var dl=class extends dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Er(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Jn(5,5,5),r=new Ue({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:jn});r.uniforms.tEquirect.value=e;let o=new zt(s,r),a=e.minFilter;return e.minFilter===Pi&&(e.minFilter=je),new _a(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function Ug(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===va||f===ba)if(t.has(d)){let p=t.get(d).texture;return a(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let v=new dl(p.height);return v.fromEquirectangularTexture(i,d),t.set(d,v),d.addEventListener("dispose",c),a(v.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,p=f===va||f===ba,v=f===Ii||f===ns;if(p||v){let g=e.get(d),m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new ul(i)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{let M=d.image;return p&&M&&M.height>0||v&&M&&l(M)?(n===null&&(n=new ul(i)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function a(d,f){return f===va?d.mapping=Ii:f===ba&&(d.mapping=ns),d}function l(d){let f=0,p=6;for(let v=0;v<p;v++)d[v]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Fg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Xi("WebGLRenderer: "+n+" extension not supported."),s}}}function Og(i,t,e,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let p in d.attributes)t.remove(d.attributes[p]);d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,p=u.attributes.position,v=0;if(p===void 0)return;if(f!==null){let M=f.array;v=f.version;for(let w=0,y=M.length;w<y;w+=3){let T=M[w+0],E=M[w+1],P=M[w+2];d.push(T,E,E,P,P,T)}}else{let M=p.array;v=p.version;for(let w=0,y=M.length/3-1;w<y;w+=3){let T=w+0,E=w+1,P=w+2;d.push(T,E,E,P,P,T)}}let g=new(p.count>=65535?Sr:Mr)(d,1);g.version=v;let m=r.get(u);m&&t.remove(m),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Bg(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,d){i.drawElements(n,d,r,u*o),e.update(d,n,1)}function c(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*o,f),e.update(d,n,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let v=0;for(let g=0;g<f;g++)v+=d[g];e.update(v,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function zg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:qt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function kg(i,t,e){let n=new WeakMap,s=new Ce;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let b=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],w=0;f===!0&&(w=1),p===!0&&(w=2),v===!0&&(w=3);let y=a.attributes.position.count*w,T=1;y>t.maxTextureSize&&(T=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let E=new Float32Array(y*T*4*u),P=new xr(E,y,T,u);P.type=wn,P.needsUpdate=!0;let _=w*4;for(let A=0;A<u;A++){let L=g[A],B=m[A],k=M[A],N=y*T*4*A;for(let H=0;H<L.count;H++){let J=H*_;f===!0&&(s.fromBufferAttribute(L,H),E[N+J+0]=s.x,E[N+J+1]=s.y,E[N+J+2]=s.z,E[N+J+3]=0),p===!0&&(s.fromBufferAttribute(B,H),E[N+J+4]=s.x,E[N+J+5]=s.y,E[N+J+6]=s.z,E[N+J+7]=0),v===!0&&(s.fromBufferAttribute(k,H),E[N+J+8]=s.x,E[N+J+9]=s.y,E[N+J+10]=s.z,E[N+J+11]=k.itemSize===4?s.w:1)}}d={count:u,texture:P,size:new at(y,T)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Hg(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var Gg={[Tc]:"LINEAR_TONE_MAPPING",[wc]:"REINHARD_TONE_MAPPING",[Ac]:"CINEON_TONE_MAPPING",[Rc]:"ACES_FILMIC_TONE_MAPPING",[Ic]:"AGX_TONE_MAPPING",[Pc]:"NEUTRAL_TONE_MAPPING",[Cc]:"CUSTOM_TONE_MAPPING"};function Vg(i,t,e,n,s,r){let o=new dn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new _e;c.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Jt([0,2,0,0,2,0],2));let h=new sa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new zt(c,h),d=new Hs(-1,1,1,-1,0,1),f=null,p=null,v=!1,g,m=null,M=[],w=!1;this.setSize=function(y,T){o.setSize(y,T),a!==null&&a.setSize(y,T),l!==null&&l.setSize(y,T);for(let E=0;E<M.length;E++){let P=M[E];P.setSize&&P.setSize(y,T)}},this.setEffects=function(y){M=y,w=M.length>0&&M[0].isRenderPass===!0;let T=o.width,E=o.height;M.length>0&&a===null&&(a=new dn(T,E,{type:kn,depthBuffer:!1,stencilBuffer:!1}),l=new dn(T,E,{type:kn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<M.length;P++){let _=M[P];_.setSize&&_.setSize(T,E)}},this.begin=function(y,T){if(v||y.toneMapping===Bn&&M.length===0)return!1;if(m=T,T!==null){let E=T.width,P=T.height;(o.width!==E||o.height!==P)&&this.setSize(E,P)}return w===!1&&y.setRenderTarget(o),g=y.toneMapping,y.toneMapping=Bn,!0},this.hasRenderPass=function(){return w},this.end=function(y,T){y.toneMapping=g,v=!0;let E=o,P=a;for(let _=0;_<M.length;_++){let b=M[_];b.enabled!==!1&&(b.render(y,P,E,T),b.needsSwap!==!1&&(E=P,P=P===a?l:a))}if(f!==y.outputColorSpace||p!==y.toneMapping){f=y.outputColorSpace,p=y.toneMapping,h.defines={},ae.getTransfer(f)===ge&&(h.defines.SRGB_TRANSFER="");let _=Gg[p];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,y.setRenderTarget(m),y.render(u,d),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Ed=new un,rh=new Ei(1,1),Td=new xr,wd=new Jo,Ad=new Er,rd=[],od=[],ad=new Float32Array(16),ld=new Float32Array(9),cd=new Float32Array(4);function $s(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=rd[s];if(r===void 0&&(r=new Float32Array(s),rd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function We(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ml(i,t){let e=od[t];e===void 0&&(e=new Int32Array(t),od[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Wg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Xg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2fv(this.addr,t),We(e,t)}}function qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ve(e,t))return;i.uniform3fv(this.addr,t),We(e,t)}}function Yg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4fv(this.addr,t),We(e,t)}}function Zg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;cd.set(n),i.uniformMatrix2fv(this.addr,!1,cd),We(e,n)}}function Jg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;ld.set(n),i.uniformMatrix3fv(this.addr,!1,ld),We(e,n)}}function Kg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;ad.set(n),i.uniformMatrix4fv(this.addr,!1,ad),We(e,n)}}function $g(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2iv(this.addr,t),We(e,t)}}function Qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3iv(this.addr,t),We(e,t)}}function t_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4iv(this.addr,t),We(e,t)}}function e_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function n_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2uiv(this.addr,t),We(e,t)}}function i_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3uiv(this.addr,t),We(e,t)}}function s_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4uiv(this.addr,t),We(e,t)}}function r_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(rh.compareFunction=e.isReversedDepthBuffer()?al:ol,r=rh):r=Ed,e.setTexture2D(t||r,s)}function o_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||wd,s)}function a_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ad,s)}function l_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Td,s)}function c_(i){switch(i){case 5126:return Wg;case 35664:return Xg;case 35665:return qg;case 35666:return Yg;case 35674:return Zg;case 35675:return Jg;case 35676:return Kg;case 5124:case 35670:return $g;case 35667:case 35671:return jg;case 35668:case 35672:return Qg;case 35669:case 35673:return t_;case 5125:return e_;case 36294:return n_;case 36295:return i_;case 36296:return s_;case 35678:case 36198:case 36298:case 36306:case 35682:return r_;case 35679:case 36299:case 36307:return o_;case 35680:case 36300:case 36308:case 36293:return a_;case 36289:case 36303:case 36311:case 36292:return l_}}function h_(i,t){i.uniform1fv(this.addr,t)}function u_(i,t){let e=$s(t,this.size,2);i.uniform2fv(this.addr,e)}function d_(i,t){let e=$s(t,this.size,3);i.uniform3fv(this.addr,e)}function f_(i,t){let e=$s(t,this.size,4);i.uniform4fv(this.addr,e)}function p_(i,t){let e=$s(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function m_(i,t){let e=$s(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function g_(i,t){let e=$s(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function __(i,t){i.uniform1iv(this.addr,t)}function x_(i,t){i.uniform2iv(this.addr,t)}function y_(i,t){i.uniform3iv(this.addr,t)}function v_(i,t){i.uniform4iv(this.addr,t)}function b_(i,t){i.uniform1uiv(this.addr,t)}function M_(i,t){i.uniform2uiv(this.addr,t)}function S_(i,t){i.uniform3uiv(this.addr,t)}function E_(i,t){i.uniform4uiv(this.addr,t)}function T_(i,t,e){let n=this.cache,s=t.length,r=ml(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=rh:o=Ed;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function w_(i,t,e){let n=this.cache,s=t.length,r=ml(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||wd,r[o])}function A_(i,t,e){let n=this.cache,s=t.length,r=ml(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ad,r[o])}function R_(i,t,e){let n=this.cache,s=t.length,r=ml(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Td,r[o])}function C_(i){switch(i){case 5126:return h_;case 35664:return u_;case 35665:return d_;case 35666:return f_;case 35674:return p_;case 35675:return m_;case 35676:return g_;case 5124:case 35670:return __;case 35667:case 35671:return x_;case 35668:case 35672:return y_;case 35669:case 35673:return v_;case 5125:return b_;case 36294:return M_;case 36295:return S_;case 36296:return E_;case 35678:case 36198:case 36298:case 36306:case 35682:return T_;case 35679:case 36299:case 36307:return w_;case 35680:case 36300:case 36308:case 36293:return A_;case 36289:case 36303:case 36311:case 36292:return R_}}var oh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=c_(e.type)}},ah=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=C_(e.type)}},lh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},ih=/(\w+)(\])?(\[|\.)?/g;function hd(i,t){i.seq.push(t),i.map[t.id]=t}function I_(i,t,e){let n=i.name,s=n.length;for(ih.lastIndex=0;;){let r=ih.exec(n),o=ih.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){hd(e,c===void 0?new oh(a,i,t):new ah(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new lh(a),hd(e,u)),e=u}}}var Ks=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);I_(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function ud(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var P_=37297,L_=0;function D_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var dd=new $t;function N_(i){ae._getMatrix(dd,ae.workingColorSpace,i);let t=`mat3( ${dd.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(i)){case gr:return[t,"LinearTransferOETF"];case ge:return[t,"sRGBTransferOETF"];default:return Wt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function fd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+D_(i.getShaderSource(t),a)}else return r}function U_(i,t){let e=N_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var F_={[Tc]:"Linear",[wc]:"Reinhard",[Ac]:"Cineon",[Rc]:"ACESFilmic",[Ic]:"AgX",[Pc]:"Neutral",[Cc]:"Custom"};function O_(i,t){let e=F_[t];return e===void 0?(Wt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var hl=new I;function B_(){ae.getLuminanceCoefficients(hl);let i=hl.x.toFixed(4),t=hl.y.toFixed(4),e=hl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function z_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(no).join(`
`)}function k_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function H_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function no(i){return i!==""}function pd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function md(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var G_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ch(i){return i.replace(G_,W_)}var V_=new Map;function W_(i,t){let e=ie[t];if(e===void 0){let n=V_.get(t);if(n!==void 0)e=ie[n],Wt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return ch(e)}var X_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gd(i){return i.replace(X_,q_)}function q_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _d(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Y_={[ts]:"SHADOWMAP_TYPE_PCF",[Vs]:"SHADOWMAP_TYPE_VSM"};function Z_(i){return Y_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var J_={[Ii]:"ENVMAP_TYPE_CUBE",[ns]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE_UV"};function K_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":J_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var $_={[ns]:"ENVMAP_MODE_REFRACTION"};function j_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":$_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Q_={[Ec]:"ENVMAP_BLENDING_MULTIPLY",[Pu]:"ENVMAP_BLENDING_MIX",[Lu]:"ENVMAP_BLENDING_ADD"};function tx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Q_[i.combine]||"ENVMAP_BLENDING_NONE"}function ex(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function nx(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Z_(e),c=K_(e),h=j_(e),u=tx(e),d=ex(e),f=z_(e),p=k_(r),v=s.createProgram(),g,m,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(no).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(no).join(`
`),m.length>0&&(m+=`
`)):(g=[_d(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(no).join(`
`),m=[_d(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bn?"#define TONE_MAPPING":"",e.toneMapping!==Bn?ie.tonemapping_pars_fragment:"",e.toneMapping!==Bn?O_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,U_("linearToOutputTexel",e.outputColorSpace),B_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(no).join(`
`)),o=ch(o),o=pd(o,e),o=md(o,e),a=ch(a),a=pd(a,e),a=md(a,e),o=gd(o),a=gd(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===zc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===zc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let w=M+g+o,y=M+m+a,T=ud(s,s.VERTEX_SHADER,w),E=ud(s,s.FRAGMENT_SHADER,y);s.attachShader(v,T),s.attachShader(v,E),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(L){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(v)||"",k=s.getShaderInfoLog(T)||"",N=s.getShaderInfoLog(E)||"",H=B.trim(),J=k.trim(),Z=N.trim(),lt=!0,K=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(lt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,E);else{let nt=fd(s,T,"vertex"),rt=fd(s,E,"fragment");qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+nt+`
`+rt)}else H!==""?Wt("WebGLProgram: Program Info Log:",H):(J===""||Z==="")&&(K=!1);K&&(L.diagnostics={runnable:lt,programLog:H,vertexShader:{log:J,prefix:g},fragmentShader:{log:Z,prefix:m}})}s.deleteShader(T),s.deleteShader(E),_=new Ks(s,v),b=H_(s,v)}let _;this.getUniforms=function(){return _===void 0&&P(this),_};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(v,P_)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=L_++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=E,this}var ix=0,hh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new uh(t),e.set(t,n)),n}},uh=class{constructor(t){this.id=ix++,this.code=t,this.usedTimes=0}};function sx(i){return i===Di||i===jr||i===Qr}function rx(i,t,e,n,s,r){let o=new yr,a=new hh,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function v(_,b,A,L,B,k){let N=L.fog,H=B.geometry,J=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?L.environment:null,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,lt=t.get(_.envMap||J,Z),K=lt&&lt.mapping===qr?lt.image.height:null,nt=f[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Wt("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));let rt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ut=rt!==void 0?rt.length:0,It=0;H.morphAttributes.position!==void 0&&(It=1),H.morphAttributes.normal!==void 0&&(It=2),H.morphAttributes.color!==void 0&&(It=3);let de,se,ce,Q;if(nt){let Ee=ti[nt];de=Ee.vertexShader,se=Ee.fragmentShader}else{de=_.vertexShader,se=_.fragmentShader;let Ee=a.getVertexShaderStage(_),pe=a.getFragmentShaderStage(_);a.update(_,Ee,pe),ce=Ee.id,Q=pe.id}let it=i.getRenderTarget(),St=i.state.buffers.depth.getReversed(),Xt=B.isInstancedMesh===!0,At=B.isBatchedMesh===!0,Yt=!!_.map,xe=!!_.matcap,st=!!lt,ct=!!_.aoMap,ut=!!_.lightMap,dt=!!_.bumpMap&&_.wireframe===!1,gt=!!_.normalMap,Gt=!!_.displacementMap,Ht=!!_.emissiveMap,Zt=!!_.metalnessMap,jt=!!_.roughnessMap,D=_.anisotropy>0,fe=_.clearcoat>0,re=_.dispersion>0,C=_.retroreflectivity>0,x=_.iridescence>0,z=_.sheen>0,W=_.transmission>0,$=D&&!!_.anisotropyMap,ft=fe&&!!_.clearcoatMap,pt=fe&&!!_.clearcoatNormalMap,j=fe&&!!_.clearcoatRoughnessMap,et=x&&!!_.iridescenceMap,xt=x&&!!_.iridescenceThicknessMap,Ot=z&&!!_.sheenColorMap,Mt=z&&!!_.sheenRoughnessMap,yt=!!_.specularMap,Bt=!!_.specularColorMap,Vt=!!_.specularIntensityMap,te=W&&!!_.transmissionMap,O=W&&!!_.thicknessMap,vt=!!_.gradientMap,tt=!!_.alphaMap,bt=_.alphaTest>0,wt=!!_.alphaHash,ot=!!_.extensions,kt=Bn;_.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(kt=i.toneMapping);let Dt={shaderID:nt,shaderType:_.type,shaderName:_.name,vertexShader:de,fragmentShader:se,defines:_.defines,customVertexShaderID:ce,customFragmentShaderID:Q,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:At,batchingColor:At&&B._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&B.instanceColor!==null,instancingMorph:Xt&&B.morphTexture!==null,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:ae.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Yt,matcap:xe,envMap:st,envMapMode:st&&lt.mapping,envMapCubeUVHeight:K,aoMap:ct,lightMap:ut,bumpMap:dt,normalMap:gt,displacementMap:Gt,emissiveMap:Ht,normalMapObjectSpace:gt&&_.normalMapType===Uu,normalMapTangentSpace:gt&&_.normalMapType===rl,packedNormalMap:gt&&_.normalMapType===rl&&sx(_.normalMap.format),metalnessMap:Zt,roughnessMap:jt,anisotropy:D,anisotropyMap:$,clearcoat:fe,clearcoatMap:ft,clearcoatNormalMap:pt,clearcoatRoughnessMap:j,dispersion:re,retroreflection:C,iridescence:x,iridescenceMap:et,iridescenceThicknessMap:xt,sheen:z,sheenColorMap:Ot,sheenRoughnessMap:Mt,specularMap:yt,specularColorMap:Bt,specularIntensityMap:Vt,transmission:W,transmissionMap:te,thicknessMap:O,gradientMap:vt,opaque:_.transparent===!1&&_.blending===Ws&&_.alphaToCoverage===!1,alphaMap:tt,alphaTest:bt,alphaHash:wt,combine:_.combine,mapUv:Yt&&p(_.map.channel),aoMapUv:ct&&p(_.aoMap.channel),lightMapUv:ut&&p(_.lightMap.channel),bumpMapUv:dt&&p(_.bumpMap.channel),normalMapUv:gt&&p(_.normalMap.channel),displacementMapUv:Gt&&p(_.displacementMap.channel),emissiveMapUv:Ht&&p(_.emissiveMap.channel),metalnessMapUv:Zt&&p(_.metalnessMap.channel),roughnessMapUv:jt&&p(_.roughnessMap.channel),anisotropyMapUv:$&&p(_.anisotropyMap.channel),clearcoatMapUv:ft&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:pt&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:xt&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&p(_.sheenRoughnessMap.channel),specularMapUv:yt&&p(_.specularMap.channel),specularColorMapUv:Bt&&p(_.specularColorMap.channel),specularIntensityMapUv:Vt&&p(_.specularIntensityMap.channel),transmissionMapUv:te&&p(_.transmissionMap.channel),thicknessMapUv:O&&p(_.thicknessMap.channel),alphaMapUv:tt&&p(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(gt||D),vertexNormals:!!H.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!H.attributes.uv&&(Yt||tt),fog:!!N,useFog:_.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||H.attributes.normal===void 0&&gt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:St,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Ut,morphTextureStride:It,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:kt,decodeVideoTexture:Yt&&_.map.isVideoTexture===!0&&ae.getTransfer(_.map.colorSpace)===ge,decodeVideoTextureEmissive:Ht&&_.emissiveMap.isVideoTexture===!0&&ae.getTransfer(_.emissiveMap.colorSpace)===ge,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Fe,flipSided:_.side===Ge,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ot&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ot&&_.extensions.multiDraw===!0||At)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Dt.vertexUv1s=l.has(1),Dt.vertexUv2s=l.has(2),Dt.vertexUv3s=l.has(3),l.clear(),Dt}function g(_){let b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(let A in _.defines)b.push(A),b.push(_.defines[A]);return _.isRawShaderMaterial===!1&&(m(b,_),M(b,_),b.push(i.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function m(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapCubeUVHeight),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.morphAttributeCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function M(_,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.retroreflection&&o.enable(24),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function w(_){let b=f[_.type],A;if(b){let L=ti[b];A=ll.clone(L.uniforms)}else A=_.uniforms;return A}function y(_,b){let A=h.get(b);return A!==void 0?++A.usedTimes:(A=new nx(i,b,_,s),c.push(A),h.set(b,A)),A}function T(_){if(--_.usedTimes===0){let b=c.indexOf(_);c[b]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function E(_){a.remove(_)}function P(){a.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:w,acquireProgram:y,releaseProgram:T,releaseShaderCache:E,programs:c,dispose:P}}function ox(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function ax(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function xd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function yd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,p,v,g,m){let M=i[t];return M===void 0?(M={id:d.id,object:d,geometry:f,material:p,materialVariant:o(d),groupOrder:v,renderOrder:d.renderOrder,z:g,group:m},i[t]=M):(M.id=d.id,M.object=d,M.geometry=f,M.material=p,M.materialVariant=o(d),M.groupOrder=v,M.renderOrder=d.renderOrder,M.z=g,M.group=m),t++,M}function l(d,f,p,v,g,m,M){M.reversedDepth===!0&&(g=-g);let w=a(d,f,p,v,g,m);p.transmission>0?n.push(w):p.transparent===!0?s.push(w):e.push(w)}function c(d,f,p,v,g,m){let M=a(d,f,p,v,g,m);p.transmission>0?n.unshift(M):p.transparent===!0?s.unshift(M):e.unshift(M)}function h(d,f){e.length>1&&e.sort(d||ax),n.length>1&&n.sort(f||xd),s.length>1&&s.sort(f||xd)}function u(){for(let d=t,f=i.length;d<f;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function lx(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new yd,i.set(n,[o])):s>=r.length?(o=new yd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function cx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new I,color:new mt};break;case"SpotLight":e={position:new I,direction:new I,color:new mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new mt,groundColor:new mt};break;case"RectAreaLight":e={color:new mt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function hx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var ux=0;function dx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function fx(i){let t=new cx,e=hx(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let s=new I,r=new ue,o=new ue;function a(c){let h=0,u=0,d=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,M=0,w=0,y=0,T=0,E=0,P=0,_=0,b=0,A=0;c.sort(dx);for(let B=0,k=c.length;B<k;B++){let N=c[B],H=N.color,J=N.intensity,Z=N.distance,lt=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Di?lt=N.shadow.map.texture:lt=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=H.r*J,u+=H.g*J,d+=H.b*J;else if(N.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(N.sh.coefficients[K],J);A++}else if(N.isSunLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let nt=N.shadow,rt=e.get(N);rt.shadowIntensity=nt.intensity,rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize.copy(nt.mapSize).multiply(nt.getFrameExtents()),n.sunShadow[p]=rt,n.sunShadowMap[p]=lt;let Ut=nt.getViewportCount();for(let It=0;It<Ut;It++)n.sunShadowMatrix[v+It]=nt.getMatrix(It),n.sunShadowCascade[v+It]=nt._cascadeData[It];v+=Ut,p++}n.sun[f]=K,f++}else if(N.isDirectionalLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let nt=N.shadow,rt=e.get(N);rt.shadowIntensity=nt.intensity,rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize=nt.mapSize,n.directionalShadow[g]=rt,n.directionalShadowMap[g]=lt,n.directionalShadowMatrix[g]=N.shadow.matrix,T++}n.directional[g]=K,g++}else if(N.isSpotLight){let K=t.get(N);K.position.setFromMatrixPosition(N.matrixWorld),K.color.copy(H).multiplyScalar(J),K.distance=Z,K.coneCos=Math.cos(N.angle),K.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),K.decay=N.decay,n.spot[M]=K;let nt=N.shadow;if(N.map&&(n.spotLightMap[_]=N.map,_++,nt.updateMatrices(N),N.castShadow&&b++),n.spotLightMatrix[M]=nt.matrix,N.castShadow){let rt=e.get(N);rt.shadowIntensity=nt.intensity,rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize=nt.mapSize,n.spotShadow[M]=rt,n.spotShadowMap[M]=lt,P++}M++}else if(N.isRectAreaLight){let K=t.get(N);K.color.copy(H).multiplyScalar(J),K.halfWidth.set(N.width*.5,0,0),K.halfHeight.set(0,N.height*.5,0),n.rectArea[w]=K,w++}else if(N.isPointLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),K.distance=N.distance,K.decay=N.decay,N.castShadow){let nt=N.shadow,rt=e.get(N);rt.shadowIntensity=nt.intensity,rt.shadowBias=nt.bias,rt.shadowNormalBias=nt.normalBias,rt.shadowRadius=nt.radius,rt.shadowMapSize=nt.mapSize,rt.shadowCameraNear=nt.camera.near,rt.shadowCameraFar=nt.camera.far,n.pointShadow[m]=rt,n.pointShadowMap[m]=lt,n.pointShadowMatrix[m]=N.shadow.matrix,E++}n.point[m]=K,m++}else if(N.isHemisphereLight){let K=t.get(N);K.skyColor.copy(N.color).multiplyScalar(J),K.groundColor.copy(N.groundColor).multiplyScalar(J),n.hemi[y]=K,y++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let L=n.hash;(L.sunLength!==f||L.directionalLength!==g||L.pointLength!==m||L.spotLength!==M||L.rectAreaLength!==w||L.hemiLength!==y||L.numSunShadows!==p||L.numDirectionalShadows!==T||L.numPointShadows!==E||L.numSpotShadows!==P||L.numSpotMaps!==_||L.numLightProbes!==A)&&(n.sun.length=f,n.directional.length=g,n.spot.length=M,n.rectArea.length=w,n.point.length=m,n.hemi.length=y,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+_-b,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=A,L.sunLength=f,L.directionalLength=g,L.pointLength=m,L.spotLength=M,L.rectAreaLength=w,L.hemiLength=y,L.numSunShadows=p,L.numDirectionalShadows=T,L.numPointShadows=E,L.numSpotShadows=P,L.numSpotMaps=_,L.numLightProbes=A,n.version=ux++)}function l(c,h){let u=0,d=0,f=0,p=0,v=0,g=0,m=h.matrixWorldInverse;for(let M=0,w=c.length;M<w;M++){let y=c[M];if(y.isSunLight){let T=n.sun[u];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(m),u++}else if(y.isDirectionalLight){let T=n.directional[d];T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),d++}else if(y.isSpotLight){let T=n.spot[p];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),p++}else if(y.isRectAreaLight){let T=n.rectArea[v];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),v++}else if(y.isPointLight){let T=n.point[f];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let T=n.hemi[g];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function vd(i){let t=new fx(i),e=[],n=[],s=[];function r(d){u.camera=d,e.length=0,n.length=0,s.length=0}function o(d){e.push(d)}function a(d){n.push(d)}function l(d){s.push(d)}function c(){t.setup(e)}function h(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function px(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new vd(i),t.set(s,[a])):r>=o.length?(a=new vd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var mx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_x=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],xx=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],bd=new ue,eo=new I,sh=new I;function yx(i,t,e){let n=new Us,s=new at,r=new at,o=new Ce,a=new ra,l=new oa,c={},h=e.maxTextureSize,u={[$n]:Ge,[Ge]:$n,[Fe]:Fe},d=new Ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:mx,fragmentShader:gx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new _e;p.setAttribute("position",new De(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new zt(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ts;let m=this.type;this.render=function(E,P,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===du&&(Wt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ts);let b=i.getRenderTarget(),A=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),B=i.state;B.setBlending(jn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let k=m!==this.type;k&&P.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(H=>H.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,H=E.length;N<H;N++){let J=E[N],Z=J.shadow;if(Z===void 0){Wt("WebGLShadowMap:",J,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);let lt=Z.getFrameExtents();s.multiply(lt),r.copy(Z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/lt.x),s.x=r.x*lt.x,Z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/lt.y),s.y=r.y*lt.y,Z.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=K,Z.map===null||k===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===Vs){if(J.isPointLight){Wt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new dn(s.x,s.y,{format:Di,type:kn,minFilter:je,magFilter:je,generateMipmaps:!1}),Z.map.texture.name=J.name+".shadowMap",Z.map.depthTexture=new Ei(s.x,s.y,wn),Z.map.depthTexture.name=J.name+".shadowMapDepth",Z.map.depthTexture.format=qn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ne,Z.map.depthTexture.magFilter=Ne}else J.isPointLight?(Z.map=new dl(s.x),Z.map.depthTexture=new $o(s.x,zn)):(Z.map=new dn(s.x,s.y),Z.map.depthTexture=new Ei(s.x,s.y,zn)),Z.map.depthTexture.name=J.name+".shadowMap",Z.map.depthTexture.format=qn,this.type===ts?(Z.map.depthTexture.compareFunction=K?al:ol,Z.map.depthTexture.minFilter=je,Z.map.depthTexture.magFilter=je):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ne,Z.map.depthTexture.magFilter=Ne);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==s.x||Z.map.height!==s.y)&&Z.map.setSize(s.x,s.y);let nt=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();J.isPointLight!==!0&&Z.updateMatrices(J,_);for(let rt=0;rt<nt;rt++){let Ut=Z.getCamera(rt);if(J.isPointLight){let It=Z.camera,de=Z.matrix,se=J.distance||It.far;se!==It.far&&(It.far=se,It.updateProjectionMatrix()),eo.setFromMatrixPosition(J.matrixWorld),It.position.copy(eo),sh.copy(It.position),sh.add(_x[rt]),It.up.copy(xx[rt]),It.lookAt(sh),It.updateMatrixWorld(),de.makeTranslation(-eo.x,-eo.y,-eo.z),bd.multiplyMatrices(It.projectionMatrix,It.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(bd,It.coordinateSystem,It.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)i.setRenderTarget(Z.map,rt),i.clear();else{rt===0&&(i.setRenderTarget(Z.map),i.clear());let It=Z.getViewport(rt);o.set(r.x*It.x,r.y*It.y,r.x*It.z,r.y*It.w),B.viewport(o)}n=Z.getFrustum(rt),y(P,_,Ut,J,this.type)}Z.isPointLightShadow!==!0&&this.type===Vs&&M(Z,_),Z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(b,A,L)};function M(E,P){let _=t.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new dn(s.x,s.y,{format:Di,type:kn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(P,null,_,d,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(P,null,_,f,v,null)}function w(E,P,_,b){let A=null,L=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)A=L;else if(A=_.isPointLight===!0?l:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let B=A.uuid,k=P.uuid,N=c[B];N===void 0&&(N={},c[B]=N);let H=N[k];H===void 0&&(H=A.clone(),N[k]=H,P.addEventListener("dispose",T)),A=H}if(A.visible=P.visible,A.wireframe=P.wireframe,b===Vs?A.side=P.shadowSide!==null?P.shadowSide:P.side:A.side=P.shadowSide!==null?P.shadowSide:u[P.side],A.alphaMap=P.alphaMap,A.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,A.map=P.map,A.clipShadows=P.clipShadows,A.clippingPlanes=P.clippingPlanes,A.clipIntersection=P.clipIntersection,A.displacementMap=P.displacementMap,A.displacementScale=P.displacementScale,A.displacementBias=P.displacementBias,A.wireframeLinewidth=P.wireframeLinewidth,A.linewidth=P.linewidth,_.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let B=i.properties.get(A);B.light=_}return A}function y(E,P,_,b,A){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&A===Vs)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);let k=t.update(E),N=E.material;if(Array.isArray(N)){let H=k.groups;for(let J=0,Z=H.length;J<Z;J++){let lt=H[J],K=N[lt.materialIndex];if(K&&K.visible){let nt=w(E,K,b,A);E.onBeforeShadow(i,E,P,_,k,nt,lt),i.renderBufferDirect(_,null,k,nt,E,lt),E.onAfterShadow(i,E,P,_,k,nt,lt)}}}else if(N.visible){let H=w(E,N,b,A);E.onBeforeShadow(i,E,P,_,k,H,null),i.renderBufferDirect(_,null,k,H,E,null),E.onAfterShadow(i,E,P,_,k,H,null)}}let B=E.children;for(let k=0,N=B.length;k<N;k++)y(B[k],P,_,b,A)}function T(E){E.target.removeEventListener("dispose",T);for(let _ in c){let b=c[_],A=E.target.uuid;A in b&&(b[A].dispose(),delete b[A])}}}function vx(i,t){function e(){let O=!1,vt=new Ce,tt=null,bt=new Ce(0,0,0,0);return{setMask:function(wt){tt!==wt&&!O&&(i.colorMask(wt,wt,wt,wt),tt=wt)},setLocked:function(wt){O=wt},setClear:function(wt,ot,kt,Dt,Ee){Ee===!0&&(wt*=Dt,ot*=Dt,kt*=Dt),vt.set(wt,ot,kt,Dt),bt.equals(vt)===!1&&(i.clearColor(wt,ot,kt,Dt),bt.copy(vt))},reset:function(){O=!1,tt=null,bt.set(-1,0,0,0)}}}function n(){let O=!1,vt=!1,tt=null,bt=null,wt=null;return{setReversed:function(ot){if(vt!==ot){let kt=t.get("EXT_clip_control");ot?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),vt=ot;let Dt=wt;wt=null,this.setClear(Dt)}},getReversed:function(){return vt},setTest:function(ot){ot?it(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(ot){tt!==ot&&!O&&(i.depthMask(ot),tt=ot)},setFunc:function(ot){if(vt&&(ot=Yu[ot]),bt!==ot){switch(ot){case Oo:i.depthFunc(i.NEVER);break;case Bo:i.depthFunc(i.ALWAYS);break;case zo:i.depthFunc(i.LESS);break;case Rs:i.depthFunc(i.LEQUAL);break;case ko:i.depthFunc(i.EQUAL);break;case Ho:i.depthFunc(i.GEQUAL);break;case Go:i.depthFunc(i.GREATER);break;case Vo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}bt=ot}},setLocked:function(ot){O=ot},setClear:function(ot){wt!==ot&&(wt=ot,vt&&(ot=1-ot),i.clearDepth(ot))},reset:function(){O=!1,tt=null,bt=null,wt=null,vt=!1}}}function s(){let O=!1,vt=null,tt=null,bt=null,wt=null,ot=null,kt=null,Dt=null,Ee=null;return{setTest:function(pe){O||(pe?it(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(pe){vt!==pe&&!O&&(i.stencilMask(pe),vt=pe)},setFunc:function(pe,Ln,Gn){(tt!==pe||bt!==Ln||wt!==Gn)&&(i.stencilFunc(pe,Ln,Gn),tt=pe,bt=Ln,wt=Gn)},setOp:function(pe,Ln,Gn){(ot!==pe||kt!==Ln||Dt!==Gn)&&(i.stencilOp(pe,Ln,Gn),ot=pe,kt=Ln,Dt=Gn)},setLocked:function(pe){O=pe},setClear:function(pe){Ee!==pe&&(i.clearStencil(pe),Ee=pe)},reset:function(){O=!1,vt=null,tt=null,bt=null,wt=null,ot=null,kt=null,Dt=null,Ee=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],v=null,g=!1,m=null,M=null,w=null,y=null,T=null,E=null,P=null,_=new mt(0,0,0),b=0,A=!1,L=null,B=null,k=null,N=null,H=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,lt=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(lt=parseFloat(/^WebGL (\d)/.exec(K)[1]),Z=lt>=1):K.indexOf("OpenGL ES")!==-1&&(lt=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Z=lt>=2);let nt=null,rt={},Ut=i.getParameter(i.SCISSOR_BOX),It=i.getParameter(i.VIEWPORT),de=new Ce().fromArray(Ut),se=new Ce().fromArray(It);function ce(O,vt,tt,bt){let wt=new Uint8Array(4),ot=i.createTexture();i.bindTexture(O,ot),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<tt;kt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(vt,0,i.RGBA,1,1,bt,0,i.RGBA,i.UNSIGNED_BYTE,wt):i.texImage2D(vt+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,wt);return ot}let Q={};Q[i.TEXTURE_2D]=ce(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=ce(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=ce(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=ce(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(i.DEPTH_TEST),o.setFunc(Rs),dt(!1),gt(yc),it(i.CULL_FACE),ct(jn);function it(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function St(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function Xt(O,vt){return d[O]!==vt?(i.bindFramebuffer(O,vt),d[O]=vt,O===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=vt),O===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=vt),!0):!1}function At(O,vt){let tt=p,bt=!1;if(O){tt=f.get(vt),tt===void 0&&(tt=[],f.set(vt,tt));let wt=O.textures;if(tt.length!==wt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let ot=0,kt=wt.length;ot<kt;ot++)tt[ot]=i.COLOR_ATTACHMENT0+ot;tt.length=wt.length,bt=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,bt=!0);bt&&i.drawBuffers(tt)}function Yt(O){return v!==O?(i.useProgram(O),v=O,!0):!1}let xe={[es]:i.FUNC_ADD,[pu]:i.FUNC_SUBTRACT,[mu]:i.FUNC_REVERSE_SUBTRACT};xe[gu]=i.MIN,xe[_u]=i.MAX;let st={[xu]:i.ZERO,[yu]:i.ONE,[vu]:i.SRC_COLOR,[Mc]:i.SRC_ALPHA,[wu]:i.SRC_ALPHA_SATURATE,[Eu]:i.DST_COLOR,[Mu]:i.DST_ALPHA,[bu]:i.ONE_MINUS_SRC_COLOR,[Sc]:i.ONE_MINUS_SRC_ALPHA,[Tu]:i.ONE_MINUS_DST_COLOR,[Su]:i.ONE_MINUS_DST_ALPHA,[Au]:i.CONSTANT_COLOR,[Ru]:i.ONE_MINUS_CONSTANT_COLOR,[Cu]:i.CONSTANT_ALPHA,[Iu]:i.ONE_MINUS_CONSTANT_ALPHA};function ct(O,vt,tt,bt,wt,ot,kt,Dt,Ee,pe){if(O===jn){g===!0&&(St(i.BLEND),g=!1);return}if(g===!1&&(it(i.BLEND),g=!0),O!==fu){if(O!==m||pe!==A){if((M!==es||T!==es)&&(i.blendEquation(i.FUNC_ADD),M=es,T=es),pe)switch(O){case Ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xr:i.blendFunc(i.ONE,i.ONE);break;case vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qt("WebGLState: Invalid blending: ",O);break}else switch(O){case Ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case vc:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bc:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",O);break}w=null,y=null,E=null,P=null,_.set(0,0,0),b=0,m=O,A=pe}return}wt=wt||vt,ot=ot||tt,kt=kt||bt,(vt!==M||wt!==T)&&(i.blendEquationSeparate(xe[vt],xe[wt]),M=vt,T=wt),(tt!==w||bt!==y||ot!==E||kt!==P)&&(i.blendFuncSeparate(st[tt],st[bt],st[ot],st[kt]),w=tt,y=bt,E=ot,P=kt),(Dt.equals(_)===!1||Ee!==b)&&(i.blendColor(Dt.r,Dt.g,Dt.b,Ee),_.copy(Dt),b=Ee),m=O,A=!1}function ut(O,vt){O.side===Fe?St(i.CULL_FACE):it(i.CULL_FACE);let tt=O.side===Ge;vt&&(tt=!tt),dt(tt),O.blending===Ws&&O.transparent===!1?ct(jn):ct(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);let bt=O.stencilWrite;a.setTest(bt),bt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ht(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function dt(O){L!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),L=O)}function gt(O){O!==hu?(it(i.CULL_FACE),O!==B&&(O===yc?i.cullFace(i.BACK):O===uu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),B=O}function Gt(O){O!==k&&(Z&&i.lineWidth(O),k=O)}function Ht(O,vt,tt){O?(it(i.POLYGON_OFFSET_FILL),(N!==vt||H!==tt)&&(N=vt,H=tt,o.getReversed()&&(vt=-vt),i.polygonOffset(vt,tt))):St(i.POLYGON_OFFSET_FILL)}function Zt(O){O?it(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function jt(O){O===void 0&&(O=i.TEXTURE0+J-1),nt!==O&&(i.activeTexture(O),nt=O)}function D(O,vt,tt){tt===void 0&&(nt===null?tt=i.TEXTURE0+J-1:tt=nt);let bt=rt[tt];bt===void 0&&(bt={type:void 0,texture:void 0},rt[tt]=bt),(bt.type!==O||bt.texture!==vt)&&(nt!==tt&&(i.activeTexture(tt),nt=tt),i.bindTexture(O,vt||Q[O]),bt.type=O,bt.texture=vt)}function fe(){let O=rt[nt];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function re(){try{i.compressedTexImage2D(...arguments)}catch(O){qt("WebGLState:",O)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(O){qt("WebGLState:",O)}}function x(){try{i.texSubImage2D(...arguments)}catch(O){qt("WebGLState:",O)}}function z(){try{i.texSubImage3D(...arguments)}catch(O){qt("WebGLState:",O)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(O){qt("WebGLState:",O)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(O){qt("WebGLState:",O)}}function ft(){try{i.texStorage2D(...arguments)}catch(O){qt("WebGLState:",O)}}function pt(){try{i.texStorage3D(...arguments)}catch(O){qt("WebGLState:",O)}}function j(){try{i.texImage2D(...arguments)}catch(O){qt("WebGLState:",O)}}function et(){try{i.texImage3D(...arguments)}catch(O){qt("WebGLState:",O)}}function xt(O){return u[O]!==void 0?u[O]:i.getParameter(O)}function Ot(O,vt){u[O]!==vt&&(i.pixelStorei(O,vt),u[O]=vt)}function Mt(O){de.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),de.copy(O))}function yt(O){se.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),se.copy(O))}function Bt(O,vt){let tt=c.get(vt);tt===void 0&&(tt=new WeakMap,c.set(vt,tt));let bt=tt.get(O);bt===void 0&&(bt=i.getUniformBlockIndex(vt,O.name),tt.set(O,bt))}function Vt(O,vt){let bt=c.get(vt).get(O);l.get(vt)!==bt&&(i.uniformBlockBinding(vt,bt,O.__bindingPointIndex),l.set(vt,bt))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},nt=null,rt={},d={},f=new WeakMap,p=[],v=null,g=!1,m=null,M=null,w=null,y=null,T=null,E=null,P=null,_=new mt(0,0,0),b=0,A=!1,L=null,B=null,k=null,N=null,H=null,de.set(0,0,i.canvas.width,i.canvas.height),se.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:St,bindFramebuffer:Xt,drawBuffers:At,useProgram:Yt,setBlending:ct,setMaterial:ut,setFlipSided:dt,setCullFace:gt,setLineWidth:Gt,setPolygonOffset:Ht,setScissorTest:Zt,activeTexture:jt,bindTexture:D,unbindTexture:fe,compressedTexImage2D:re,compressedTexImage3D:C,texImage2D:j,texImage3D:et,pixelStorei:Ot,getParameter:xt,updateUBOMapping:Bt,uniformBlockBinding:Vt,texStorage2D:ft,texStorage3D:pt,texSubImage2D:x,texSubImage3D:z,compressedTexSubImage2D:W,compressedTexSubImage3D:$,scissor:Mt,viewport:yt,reset:te}}function bx(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new at,h=new WeakMap,u=new Set,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,x){return p?new OffscreenCanvas(C,x):_r("canvas")}function g(C,x,z){let W=1,$=re(C);if(($.width>z||$.height>z)&&(W=z/Math.max($.width,$.height)),W<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ft=Math.floor(W*$.width),pt=Math.floor(W*$.height);d===void 0&&(d=v(ft,pt));let j=x?v(ft,pt):d;return j.width=ft,j.height=pt,j.getContext("2d").drawImage(C,0,0,ft,pt),Wt("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+ft+"x"+pt+")."),j}else return"data"in C&&Wt("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function m(C){return C.generateMipmaps}function M(C){i.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(C,x,z,W,$,ft=!1){if(C!==null){if(i[C]!==void 0)return i[C];Wt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let pt;W&&(pt=t.get("EXT_texture_norm16"),pt||Wt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=x;if(x===i.RED&&(z===i.FLOAT&&(j=i.R32F),z===i.HALF_FLOAT&&(j=i.R16F),z===i.UNSIGNED_BYTE&&(j=i.R8),z===i.UNSIGNED_SHORT&&pt&&(j=pt.R16_EXT),z===i.SHORT&&pt&&(j=pt.R16_SNORM_EXT)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.R8UI),z===i.UNSIGNED_SHORT&&(j=i.R16UI),z===i.UNSIGNED_INT&&(j=i.R32UI),z===i.BYTE&&(j=i.R8I),z===i.SHORT&&(j=i.R16I),z===i.INT&&(j=i.R32I)),x===i.RG&&(z===i.FLOAT&&(j=i.RG32F),z===i.HALF_FLOAT&&(j=i.RG16F),z===i.UNSIGNED_BYTE&&(j=i.RG8),z===i.UNSIGNED_SHORT&&pt&&(j=pt.RG16_EXT),z===i.SHORT&&pt&&(j=pt.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RG8UI),z===i.UNSIGNED_SHORT&&(j=i.RG16UI),z===i.UNSIGNED_INT&&(j=i.RG32UI),z===i.BYTE&&(j=i.RG8I),z===i.SHORT&&(j=i.RG16I),z===i.INT&&(j=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGB8UI),z===i.UNSIGNED_SHORT&&(j=i.RGB16UI),z===i.UNSIGNED_INT&&(j=i.RGB32UI),z===i.BYTE&&(j=i.RGB8I),z===i.SHORT&&(j=i.RGB16I),z===i.INT&&(j=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),z===i.UNSIGNED_INT&&(j=i.RGBA32UI),z===i.BYTE&&(j=i.RGBA8I),z===i.SHORT&&(j=i.RGBA16I),z===i.INT&&(j=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_SHORT&&pt&&(j=pt.RGB16_EXT),z===i.SHORT&&pt&&(j=pt.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),x===i.RGBA){let et=ft?gr:ae.getTransfer($);z===i.FLOAT&&(j=i.RGBA32F),z===i.HALF_FLOAT&&(j=i.RGBA16F),z===i.UNSIGNED_BYTE&&(j=et===ge?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&pt&&(j=pt.RGBA16_EXT),z===i.SHORT&&pt&&(j=pt.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function T(C,x){let z;return C?x===null||x===zn||x===qs?z=i.DEPTH24_STENCIL8:x===wn?z=i.DEPTH32F_STENCIL8:x===Xs&&(z=i.DEPTH24_STENCIL8,Wt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===zn||x===qs?z=i.DEPTH_COMPONENT24:x===wn?z=i.DEPTH_COMPONENT32F:x===Xs&&(z=i.DEPTH_COMPONENT16),z}function E(C,x){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ne&&C.minFilter!==je?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function P(C){let x=C.target;x.removeEventListener("dispose",P),b(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function _(C){let x=C.target;x.removeEventListener("dispose",_),L(x)}function b(C){let x=n.get(C);if(x.__webglInit===void 0)return;let z=C.source,W=f.get(z);if(W){let $=W[x.__cacheKey];$.usedTimes--,$.usedTimes===0&&A(C),Object.keys(W).length===0&&f.delete(z)}n.remove(C)}function A(C){let x=n.get(C);i.deleteTexture(x.__webglTexture);let z=C.source,W=f.get(z);delete W[x.__cacheKey],o.memory.textures--}function L(C){let x=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(x.__webglFramebuffer[W]))for(let $=0;$<x.__webglFramebuffer[W].length;$++)i.deleteFramebuffer(x.__webglFramebuffer[W][$]);else i.deleteFramebuffer(x.__webglFramebuffer[W]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[W])}else{if(Array.isArray(x.__webglFramebuffer))for(let W=0;W<x.__webglFramebuffer.length;W++)i.deleteFramebuffer(x.__webglFramebuffer[W]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let W=0;W<x.__webglColorRenderbuffer.length;W++)x.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[W]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let z=C.textures;for(let W=0,$=z.length;W<$;W++){let ft=n.get(z[W]);ft.__webglTexture&&(i.deleteTexture(ft.__webglTexture),o.memory.textures--),n.remove(z[W])}n.remove(C)}let B=0;function k(){B=0}function N(){return B}function H(C){B=C}function J(){let C=B;return C>=s.maxTextures&&Wt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,C}function Z(C){let x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function lt(C,x){let z=n.get(C);if(C.isVideoTexture&&D(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){let W=C.image;if(W===null)Wt("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Wt("WebGLRenderer: Texture marked for update but image is incomplete");else{St(z,C,x);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function K(C,x){let z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){St(z,C,x);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function nt(C,x){let z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){St(z,C,x);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function rt(C,x){let z=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){Xt(z,C,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}let Ut={[Wo]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[Xo]:i.MIRRORED_REPEAT},It={[Ne]:i.NEAREST,[Du]:i.NEAREST_MIPMAP_NEAREST,[Yr]:i.NEAREST_MIPMAP_LINEAR,[je]:i.LINEAR,[Ma]:i.LINEAR_MIPMAP_NEAREST,[Pi]:i.LINEAR_MIPMAP_LINEAR},de={[Ou]:i.NEVER,[Gu]:i.ALWAYS,[Bu]:i.LESS,[ol]:i.LEQUAL,[zu]:i.EQUAL,[al]:i.GEQUAL,[ku]:i.GREATER,[Hu]:i.NOTEQUAL};function se(C,x){if(x.type===wn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===je||x.magFilter===Ma||x.magFilter===Yr||x.magFilter===Pi||x.minFilter===je||x.minFilter===Ma||x.minFilter===Yr||x.minFilter===Pi)&&Wt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,Ut[x.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,Ut[x.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,Ut[x.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,It[x.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,It[x.minFilter]),x.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,de[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ne||x.minFilter!==Yr&&x.minFilter!==Pi||x.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function ce(C,x){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",P));let W=x.source,$=f.get(W);$===void 0&&($={},f.set(W,$));let ft=Z(x);if(ft!==C.__cacheKey){$[ft]===void 0&&($[ft]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),$[ft].usedTimes++;let pt=$[C.__cacheKey];pt!==void 0&&($[C.__cacheKey].usedTimes--,pt.usedTimes===0&&A(x)),C.__cacheKey=ft,C.__webglTexture=$[ft].texture}return z}function Q(C,x,z){return Math.floor(Math.floor(C/z)/x)}function it(C,x,z,W){let ft=C.updateRanges;if(ft.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,W,x.data);else{ft.sort((Ot,Mt)=>Ot.start-Mt.start);let pt=0;for(let Ot=1;Ot<ft.length;Ot++){let Mt=ft[pt],yt=ft[Ot],Bt=Mt.start+Mt.count,Vt=Q(yt.start,x.width,4),te=Q(Mt.start,x.width,4);yt.start<=Bt+1&&Vt===te&&Q(yt.start+yt.count-1,x.width,4)===Vt?Mt.count=Math.max(Mt.count,yt.start+yt.count-Mt.start):(++pt,ft[pt]=yt)}ft.length=pt+1;let j=e.getParameter(i.UNPACK_ROW_LENGTH),et=e.getParameter(i.UNPACK_SKIP_PIXELS),xt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Ot=0,Mt=ft.length;Ot<Mt;Ot++){let yt=ft[Ot],Bt=Math.floor(yt.start/4),Vt=Math.ceil(yt.count/4),te=Bt%x.width,O=Math.floor(Bt/x.width),vt=Vt,tt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,te),e.pixelStorei(i.UNPACK_SKIP_ROWS,O),e.texSubImage2D(i.TEXTURE_2D,0,te,O,vt,tt,z,W,x.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,j),e.pixelStorei(i.UNPACK_SKIP_PIXELS,et),e.pixelStorei(i.UNPACK_SKIP_ROWS,xt)}}function St(C,x,z){let W=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(W=i.TEXTURE_3D);let $=ce(C,x),ft=x.source;e.bindTexture(W,C.__webglTexture,i.TEXTURE0+z);let pt=n.get(ft);if(ft.version!==pt.__version||$===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let tt=ae.getPrimaries(ae.workingColorSpace),bt=x.colorSpace===di?null:ae.getPrimaries(x.colorSpace),wt=x.colorSpace===di||tt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let et=g(x.image,!1,s.maxTextureSize);et=fe(x,et);let xt=r.convert(x.format,x.colorSpace),Ot=r.convert(x.type),Mt=y(x.internalFormat,xt,Ot,x.normalized,x.colorSpace,x.isVideoTexture);se(W,x);let yt,Bt=x.mipmaps,Vt=x.isVideoTexture!==!0,te=pt.__version===void 0||$===!0,O=ft.dataReady,vt=E(x,et);if(x.isDepthTexture)Mt=T(x.format===Li,x.type),te&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,Mt,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,Mt,et.width,et.height,0,xt,Ot,null));else if(x.isDataTexture)if(Bt.length>0){Vt&&te&&e.texStorage2D(i.TEXTURE_2D,vt,Mt,Bt[0].width,Bt[0].height);for(let tt=0,bt=Bt.length;tt<bt;tt++)yt=Bt[tt],Vt?O&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,yt.width,yt.height,xt,Ot,yt.data):e.texImage2D(i.TEXTURE_2D,tt,Mt,yt.width,yt.height,0,xt,Ot,yt.data);x.generateMipmaps=!1}else Vt?(te&&e.texStorage2D(i.TEXTURE_2D,vt,Mt,et.width,et.height),O&&it(x,et,xt,Ot)):e.texImage2D(i.TEXTURE_2D,0,Mt,et.width,et.height,0,xt,Ot,et.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Vt&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Mt,Bt[0].width,Bt[0].height,et.depth);for(let tt=0,bt=Bt.length;tt<bt;tt++)if(yt=Bt[tt],x.format!==An)if(xt!==null)if(Vt){if(O)if(x.layerUpdates.size>0){let wt=Yc(yt.width,yt.height,x.format,x.type);for(let ot of x.layerUpdates){let kt=yt.data.subarray(ot*wt/yt.data.BYTES_PER_ELEMENT,(ot+1)*wt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,ot,yt.width,yt.height,1,xt,kt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,yt.width,yt.height,et.depth,xt,yt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,Mt,yt.width,yt.height,et.depth,0,yt.data,0,0);else Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?O&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,yt.width,yt.height,et.depth,xt,Ot,yt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,Mt,yt.width,yt.height,et.depth,0,xt,Ot,yt.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Vt&&te&&e.texStorage2D(i.TEXTURE_2D,vt,Mt,Bt[0].width,Bt[0].height);for(let tt=0,bt=Bt.length;tt<bt;tt++)yt=Bt[tt],x.format!==An?xt!==null?Vt?O&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,yt.width,yt.height,xt,yt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,Mt,yt.width,yt.height,0,yt.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?O&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,yt.width,yt.height,xt,Ot,yt.data):e.texImage2D(i.TEXTURE_2D,tt,Mt,yt.width,yt.height,0,xt,Ot,yt.data)}else if(x.isDataArrayTexture)if(Vt){if(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Mt,et.width,et.height,et.depth),O)if(x.layerUpdates.size>0){let tt=Yc(et.width,et.height,x.format,x.type);for(let bt of x.layerUpdates){let wt=et.data.subarray(bt*tt/et.data.BYTES_PER_ELEMENT,(bt+1)*tt/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,bt,et.width,et.height,1,xt,Ot,wt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,xt,Ot,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Mt,et.width,et.height,et.depth,0,xt,Ot,et.data);else if(x.isData3DTexture)Vt?(te&&e.texStorage3D(i.TEXTURE_3D,vt,Mt,et.width,et.height,et.depth),O&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,xt,Ot,et.data)):e.texImage3D(i.TEXTURE_3D,0,Mt,et.width,et.height,et.depth,0,xt,Ot,et.data);else if(x.isFramebufferTexture){if(te)if(Vt)e.texStorage2D(i.TEXTURE_2D,vt,Mt,et.width,et.height);else{let tt=et.width,bt=et.height;for(let wt=0;wt<vt;wt++)e.texImage2D(i.TEXTURE_2D,wt,Mt,tt,bt,0,xt,Ot,null),tt>>=1,bt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let tt=i.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),et.parentNode!==tt){tt.appendChild(et),u.add(x),tt.onpaint=bt=>{let wt=bt.changedElements;for(let ot of u)wt.includes(ot.image)&&(ot.needsUpdate=!0)},tt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,et);else{let wt=i.RGBA,ot=i.RGBA,kt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,wt,ot,kt,et)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Bt.length>0){if(Vt&&te){let tt=re(Bt[0]);e.texStorage2D(i.TEXTURE_2D,vt,Mt,tt.width,tt.height)}for(let tt=0,bt=Bt.length;tt<bt;tt++)yt=Bt[tt],Vt?O&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,xt,Ot,yt):e.texImage2D(i.TEXTURE_2D,tt,Mt,xt,Ot,yt);x.generateMipmaps=!1}else if(Vt){if(te){let tt=re(et);e.texStorage2D(i.TEXTURE_2D,vt,Mt,tt.width,tt.height)}O&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt,Ot,et)}else e.texImage2D(i.TEXTURE_2D,0,Mt,xt,Ot,et);m(x)&&M(W),pt.__version=ft.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function Xt(C,x,z){if(x.image.length!==6)return;let W=ce(C,x),$=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+z);let ft=n.get($);if($.version!==ft.__version||W===!0){e.activeTexture(i.TEXTURE0+z);let pt=ae.getPrimaries(ae.workingColorSpace),j=x.colorSpace===di?null:ae.getPrimaries(x.colorSpace),et=x.colorSpace===di||pt===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let xt=x.isCompressedTexture||x.image[0].isCompressedTexture,Ot=x.image[0]&&x.image[0].isDataTexture,Mt=[];for(let ot=0;ot<6;ot++)!xt&&!Ot?Mt[ot]=g(x.image[ot],!0,s.maxCubemapSize):Mt[ot]=Ot?x.image[ot].image:x.image[ot],Mt[ot]=fe(x,Mt[ot]);let yt=Mt[0],Bt=r.convert(x.format,x.colorSpace),Vt=r.convert(x.type),te=y(x.internalFormat,Bt,Vt,x.normalized,x.colorSpace),O=x.isVideoTexture!==!0,vt=ft.__version===void 0||W===!0,tt=$.dataReady,bt=E(x,yt);se(i.TEXTURE_CUBE_MAP,x);let wt;if(xt){O&&vt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,te,yt.width,yt.height);for(let ot=0;ot<6;ot++){wt=Mt[ot].mipmaps;for(let kt=0;kt<wt.length;kt++){let Dt=wt[kt];x.format!==An?Bt!==null?O?tt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,kt,0,0,Dt.width,Dt.height,Bt,Dt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,kt,te,Dt.width,Dt.height,0,Dt.data):Wt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,kt,0,0,Dt.width,Dt.height,Bt,Vt,Dt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,kt,te,Dt.width,Dt.height,0,Bt,Vt,Dt.data)}}}else{if(wt=x.mipmaps,O&&vt){wt.length>0&&bt++;let ot=re(Mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,te,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(Ot){O?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Mt[ot].width,Mt[ot].height,Bt,Vt,Mt[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,te,Mt[ot].width,Mt[ot].height,0,Bt,Vt,Mt[ot].data);for(let kt=0;kt<wt.length;kt++){let Ee=wt[kt].image[ot].image;O?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,kt+1,0,0,Ee.width,Ee.height,Bt,Vt,Ee.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,kt+1,te,Ee.width,Ee.height,0,Bt,Vt,Ee.data)}}else{O?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Bt,Vt,Mt[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,te,Bt,Vt,Mt[ot]);for(let kt=0;kt<wt.length;kt++){let Dt=wt[kt];O?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,kt+1,0,0,Bt,Vt,Dt.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,kt+1,te,Bt,Vt,Dt.image[ot])}}}m(x)&&M(i.TEXTURE_CUBE_MAP),ft.__version=$.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function At(C,x,z,W,$,ft){let pt=r.convert(z.format,z.colorSpace),j=r.convert(z.type),et=y(z.internalFormat,pt,j,z.normalized,z.colorSpace),xt=n.get(x),Ot=n.get(z);if(Ot.__renderTarget=x,!xt.__hasExternalTextures){let Mt=Math.max(1,x.width>>ft),yt=Math.max(1,x.height>>ft);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,ft,et,Mt,yt,x.depth,0,pt,j,null):e.texImage2D($,ft,et,Mt,yt,0,pt,j,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),jt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,$,Ot.__webglTexture,0,Zt(x)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,$,Ot.__webglTexture,ft),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Yt(C,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,C),x.depthBuffer){let W=x.depthTexture,$=W&&W.isDepthTexture?W.type:null,ft=T(x.stencilBuffer,$),pt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;jt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Zt(x),ft,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt(x),ft,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ft,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pt,i.RENDERBUFFER,C)}else{let W=x.textures;for(let $=0;$<W.length;$++){let ft=W[$],pt=r.convert(ft.format,ft.colorSpace),j=r.convert(ft.type),et=y(ft.internalFormat,pt,j,ft.normalized,ft.colorSpace);jt(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Zt(x),et,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt(x),et,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,et,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xe(C,x,z){let W=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $=n.get(x.depthTexture);if($.__renderTarget=x,(!$.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W){if($.__webglInit===void 0&&($.__webglInit=!0,x.depthTexture.addEventListener("dispose",P)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),se(i.TEXTURE_CUBE_MAP,x.depthTexture);let xt=r.convert(x.depthTexture.format),Ot=r.convert(x.depthTexture.type),Mt;x.depthTexture.format===qn?Mt=i.DEPTH_COMPONENT24:x.depthTexture.format===Li&&(Mt=i.DEPTH24_STENCIL8);for(let yt=0;yt<6;yt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,Mt,x.width,x.height,0,xt,Ot,null)}}else lt(x.depthTexture,0);let ft=$.__webglTexture,pt=Zt(x),j=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,et=x.depthTexture.format===Li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===qn)jt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,j,ft,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,et,j,ft,0);else if(x.depthTexture.format===Li)jt(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,j,ft,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,et,j,ft,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function st(C){let x=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){let W=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),W){let $=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,W.removeEventListener("dispose",$)};W.addEventListener("dispose",$),x.__depthDisposeCallback=$}x.__boundDepthTexture=W}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(z)for(let W=0;W<6;W++)xe(x.__webglFramebuffer[W],C,W);else{let W=C.texture.mipmaps;W&&W.length>0?xe(x.__webglFramebuffer[0],C,0):xe(x.__webglFramebuffer,C,0)}else if(z){x.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[W]),x.__webglDepthbuffer[W]===void 0)x.__webglDepthbuffer[W]=i.createRenderbuffer(),Yt(x.__webglDepthbuffer[W],C,!1);else{let $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=x.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,ft),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,ft)}}else{let W=C.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Yt(x.__webglDepthbuffer,C,!1);else{let $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ft),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,ft)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(C,x,z){let W=n.get(C);x!==void 0&&At(W.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&st(C)}function ut(C){let x=C.texture,z=n.get(C),W=n.get(x);C.addEventListener("dispose",_);let $=C.textures,ft=C.isWebGLCubeRenderTarget===!0,pt=$.length>1;if(pt||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=x.version,o.memory.textures++),ft){z.__webglFramebuffer=[];for(let j=0;j<6;j++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[j]=[];for(let et=0;et<x.mipmaps.length;et++)z.__webglFramebuffer[j][et]=i.createFramebuffer()}else z.__webglFramebuffer[j]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let j=0;j<x.mipmaps.length;j++)z.__webglFramebuffer[j]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(pt)for(let j=0,et=$.length;j<et;j++){let xt=n.get($[j]);xt.__webglTexture===void 0&&(xt.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&jt(C)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let j=0;j<$.length;j++){let et=$[j];z.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[j]);let xt=r.convert(et.format,et.colorSpace),Ot=r.convert(et.type),Mt=y(et.internalFormat,xt,Ot,et.normalized,et.colorSpace,C.isXRRenderTarget===!0),yt=Zt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,Mt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,z.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Yt(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ft){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),se(i.TEXTURE_CUBE_MAP,x);for(let j=0;j<6;j++)if(x.mipmaps&&x.mipmaps.length>0)for(let et=0;et<x.mipmaps.length;et++)At(z.__webglFramebuffer[j][et],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,et);else At(z.__webglFramebuffer[j],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(x)&&M(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let j=0,et=$.length;j<et;j++){let xt=$[j],Ot=n.get(xt),Mt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Mt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Mt,Ot.__webglTexture),se(Mt,xt),At(z.__webglFramebuffer,C,xt,i.COLOR_ATTACHMENT0+j,Mt,0),m(xt)&&M(Mt)}e.unbindTexture()}else{let j=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(j=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(j,W.__webglTexture),se(j,x),x.mipmaps&&x.mipmaps.length>0)for(let et=0;et<x.mipmaps.length;et++)At(z.__webglFramebuffer[et],C,x,i.COLOR_ATTACHMENT0,j,et);else At(z.__webglFramebuffer,C,x,i.COLOR_ATTACHMENT0,j,0);m(x)&&M(j),e.unbindTexture()}C.depthBuffer&&st(C)}function dt(C){let x=C.textures;for(let z=0,W=x.length;z<W;z++){let $=x[z];if(m($)){let ft=w(C),pt=n.get($).__webglTexture;e.bindTexture(ft,pt),M(ft),e.unbindTexture()}}}let gt=[],Gt=[];function Ht(C){if(C.samples>0){if(jt(C)===!1){let x=C.textures,z=C.width,W=C.height,$=i.COLOR_BUFFER_BIT,ft=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=n.get(C),j=x.length>1;if(j)for(let xt=0;xt<x.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);let et=C.texture.mipmaps;et&&et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let xt=0;xt<x.length;xt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pt.__webglColorRenderbuffer[xt]);let Ot=n.get(x[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ot,0)}i.blitFramebuffer(0,0,z,W,0,0,z,W,$,i.NEAREST),l===!0&&(gt.length=0,Gt.length=0,gt.push(i.COLOR_ATTACHMENT0+xt),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(gt.push(ft),Gt.push(ft),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Gt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,gt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let xt=0;xt<x.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,pt.__webglColorRenderbuffer[xt]);let Ot=n.get(x[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,Ot,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let x=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Zt(C){return Math.min(s.maxSamples,C.samples)}function jt(C){let x=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function D(C){let x=o.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function fe(C,x){let z=C.colorSpace,W=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==mr&&z!==di&&(ae.getTransfer(z)===ge?(W!==An||$!==fn)&&Wt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",z)),x}function re(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=k,this.getTextureUnits=N,this.setTextureUnits=H,this.setTexture2D=lt,this.setTexture2DArray=K,this.setTexture3D=nt,this.setTextureCube=rt,this.rebindTextures=ct,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=Ht,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=At,this.useMultisampledRTT=jt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Mx(i,t){function e(n,s=di){let r,o=ae.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===Ea)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ta)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Fc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Dc)return i.BYTE;if(n===Nc)return i.SHORT;if(n===Xs)return i.UNSIGNED_SHORT;if(n===Sa)return i.INT;if(n===zn)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===kn)return i.HALF_FLOAT;if(n===Oc)return i.ALPHA;if(n===Bc)return i.RGB;if(n===An)return i.RGBA;if(n===qn)return i.DEPTH_COMPONENT;if(n===Li)return i.DEPTH_STENCIL;if(n===Ys)return i.RED;if(n===wa)return i.RED_INTEGER;if(n===Di)return i.RG;if(n===Aa)return i.RG_INTEGER;if(n===Ra)return i.RGBA_INTEGER;if(n===Zr||n===Jr||n===Kr||n===$r)if(o===ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ca||n===Ia||n===Pa||n===La)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ca)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Pa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===La)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Da||n===Na||n===Ua||n===Fa||n===Oa||n===jr||n===Ba)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Da||n===Na)return o===ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ua)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Fa)return r.COMPRESSED_R11_EAC;if(n===Oa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===jr)return r.COMPRESSED_RG11_EAC;if(n===Ba)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===za||n===ka||n===Ha||n===Ga||n===Va||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===Ja||n===Ka||n===$a||n===ja)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===za)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ka)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ha)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ga)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Va)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ya)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Za)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ja)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ka)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$a)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ja)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qa||n===tl||n===el)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Qa)return o===ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===tl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===el)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nl||n===il||n===Qr||n===sl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===nl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Sx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ex=`
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

}`,dh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Tr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Ue({vertexShader:Sx,fragmentShader:Ex,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new zt(new $i(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},fh=class extends On{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,v=typeof XRWebGLBinding<"u",g=new dh,m={},M=e.getContextAttributes(),w=null,y=null,T=[],E=[],P=new at,_=null,b=null,A=new $e;A.viewport=new Ce;let L=new $e;L.viewport=new Ce;let B=[A,L],k=new xa,N=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let it=T[Q];return it===void 0&&(it=new Ds,T[Q]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Q){let it=T[Q];return it===void 0&&(it=new Ds,T[Q]=it),it.getGripSpace()},this.getHand=function(Q){let it=T[Q];return it===void 0&&(it=new Ds,T[Q]=it),it.getHandSpace()};function J(Q){let it=E.indexOf(Q.inputSource);if(it===-1)return;let St=T[it];St!==void 0&&(St.update(Q.inputSource,Q.frame,c||o),St.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Z(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",lt);for(let Q=0;Q<T.length;Q++){let it=E[Q];it!==null&&(E[Q]=null,T[Q].disconnect(it))}N=null,H=null,g.reset();for(let Q in m)delete m[Q];if(t.setRenderTarget(w),f=null,d=null,u=null,s=null,y=null,ce.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(P.width,P.height,!1),b!==null){let Q=b.camera;Q.fov=b.fov,Q.zoom=b.zoom,Q.updateProjectionMatrix(),b=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&Wt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&Wt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",lt),M.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let St=null,Xt=null,At=null;M.depth&&(At=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,St=M.stencil?Li:qn,Xt=M.stencil?qs:zn);let Yt={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Yt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new dn(d.textureWidth,d.textureHeight,{format:An,type:fn,depthTexture:new Ei(d.textureWidth,d.textureHeight,Xt,void 0,void 0,void 0,void 0,void 0,void 0,St),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let St={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,St),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new dn(f.framebufferWidth,f.framebufferHeight,{format:An,type:fn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ce.setContext(s),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function lt(Q){for(let it=0;it<Q.removed.length;it++){let St=Q.removed[it],Xt=E.indexOf(St);Xt>=0&&(E[Xt]=null,T[Xt].disconnect(St))}for(let it=0;it<Q.added.length;it++){let St=Q.added[it],Xt=E.indexOf(St);if(Xt===-1){for(let Yt=0;Yt<T.length;Yt++)if(Yt>=E.length){E.push(St),Xt=Yt;break}else if(E[Yt]===null){E[Yt]=St,Xt=Yt;break}if(Xt===-1)break}let At=T[Xt];At&&At.connect(St)}}let K=new I,nt=new I;function rt(Q,it,St){K.setFromMatrixPosition(it.matrixWorld),nt.setFromMatrixPosition(St.matrixWorld);let Xt=K.distanceTo(nt),At=it.projectionMatrix.elements,Yt=St.projectionMatrix.elements,xe=At[14]/(At[10]-1),st=At[14]/(At[10]+1),ct=(At[9]+1)/At[5],ut=(At[9]-1)/At[5],dt=(At[8]-1)/At[0],gt=(Yt[8]+1)/Yt[0],Gt=xe*dt,Ht=xe*gt,Zt=Xt/(-dt+gt),jt=Zt*-dt;if(it.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(jt),Q.translateZ(Zt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),At[10]===-1)Q.projectionMatrix.copy(it.projectionMatrix),Q.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{let D=xe+Zt,fe=st+Zt,re=Gt-jt,C=Ht+(Xt-jt),x=ct*st/fe*D,z=ut*st/fe*D;Q.projectionMatrix.makePerspective(re,C,x,z,D,fe),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Ut(Q,it){it===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(it.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let it=Q.near,St=Q.far;g.texture!==null&&(g.depthNear>0&&(it=g.depthNear),g.depthFar>0&&(St=g.depthFar)),k.near=L.near=A.near=it,k.far=L.far=A.far=St,(N!==k.near||H!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),N=k.near,H=k.far),k.layers.mask=Q.layers.mask|6,A.layers.mask=k.layers.mask&-5,L.layers.mask=k.layers.mask&-3;let Xt=Q.parent,At=k.cameras;Ut(k,Xt);for(let Yt=0;Yt<At.length;Yt++)Ut(At[Yt],Xt);At.length===2?rt(k,A,L):k.projectionMatrix.copy(A.projectionMatrix),b===null&&Q.isPerspectiveCamera&&(b={camera:Q,fov:Q.fov,zoom:Q.zoom}),It(Q,k,Xt)};function It(Q,it,St){St===null?Q.matrix.copy(it.matrixWorld):(Q.matrix.copy(St.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(it.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(it.projectionMatrix),Q.projectionMatrixInverse.copy(it.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ps*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Q){l=Q,d!==null&&(d.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(Q){return m[Q]};let de=null;function se(Q,it){if(h=it.getViewerPose(c||o),p=it,h!==null){let St=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Xt=!1;St.length!==k.cameras.length&&(k.cameras.length=0,Xt=!0);for(let st=0;st<St.length;st++){let ct=St[st],ut=null;if(f!==null)ut=f.getViewport(ct);else{let gt=u.getViewSubImage(d,ct);ut=gt.viewport,st===0&&(t.setRenderTargetTextures(y,gt.colorTexture,gt.depthStencilTexture),t.setRenderTarget(y))}let dt=B[st];dt===void 0&&(dt=new $e,dt.layers.enable(st),dt.viewport=new Ce,B[st]=dt),dt.matrix.fromArray(ct.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(ct.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(ut.x,ut.y,ut.width,ut.height),st===0&&(k.matrix.copy(dt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Xt===!0&&k.cameras.push(dt)}let At=s.enabledFeatures;if(At&&At.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let st=u.getDepthInformation(St[0]);st&&st.isValid&&st.texture&&g.init(st,s.renderState)}if(At&&At.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let st=0;st<St.length;st++){let ct=St[st].camera;if(ct){let ut=m[ct];ut||(ut=new Tr,m[ct]=ut);let dt=u.getCameraImage(ct);ut.sourceTexture=dt}}}}for(let St=0;St<T.length;St++){let Xt=E[St],At=T[St];Xt!==null&&At!==void 0&&At.update(Xt,it,c||o)}de&&de(Q,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),p=null}let ce=new Md;ce.setAnimationLoop(se),this.setAnimationLoop=function(Q){de=Q},this.dispose=function(){}}},Tx=new ue,Rd=new $t;Rd.set(-1,0,0,0,1,0,0,0,1);function wx(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Wc(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,M,w,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,M,w):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ge&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ge&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let M=t.get(m),w=M.envMap,y=M.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(Tx.makeRotationFromEuler(y)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Rd),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,M,w){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=w*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ge&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){let M=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ax(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,T){let E=T.program;n.uniformBlockBinding(y,E)}function c(y,T){let E=s[y.id];E===void 0&&(g(y),E=h(y),s[y.id]=E,y.addEventListener("dispose",M));let P=T.program;n.updateUBOMapping(y,P);let _=t.render.frame;r[y.id]!==_&&(d(y),r[y.id]=_)}function h(y){let T=u();y.__bindingPointIndex=T;let E=i.createBuffer(),P=y.__size,_=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,P,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,E),E}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let T=s[y.id],E=y.uniforms,P=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,b=E.length;_<b;_++){let A=E[_];if(Array.isArray(A))for(let L=0,B=A.length;L<B;L++)f(A[L],_,L,P);else f(A,_,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,T,E,P){if(v(y,T,E,P)===!0){let _=y.__offset,b=y.value;if(Array.isArray(b)){let A=0;for(let L=0;L<b.length;L++){let B=b[L],k=m(B);p(B,y.__data,A),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(A+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(b,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,y.__data)}}function p(y,T,E){typeof y=="number"||typeof y=="boolean"?T[0]=y:y.isMatrix3?(T[0]=y.elements[0],T[1]=y.elements[1],T[2]=y.elements[2],T[3]=0,T[4]=y.elements[3],T[5]=y.elements[4],T[6]=y.elements[5],T[7]=0,T[8]=y.elements[6],T[9]=y.elements[7],T[10]=y.elements[8],T[11]=0):ArrayBuffer.isView(y)?T.set(new y.constructor(y.buffer,y.byteOffset,T.length)):y.toArray(T,E)}function v(y,T,E,P){let _=y.value,b=T+"_"+E;if(P[b]===void 0)return typeof _=="number"||typeof _=="boolean"?P[b]=_:ArrayBuffer.isView(_)?P[b]=_.slice():P[b]=_.clone(),!0;{let A=P[b];if(typeof _=="number"||typeof _=="boolean"){if(A!==_)return P[b]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(A.equals(_)===!1)return A.copy(_),!0}}return!1}function g(y){let T=y.uniforms,E=0,P=16;for(let b=0,A=T.length;b<A;b++){let L=Array.isArray(T[b])?T[b]:[T[b]];for(let B=0,k=L.length;B<k;B++){let N=L[B],H=Array.isArray(N.value)?N.value:[N.value];for(let J=0,Z=H.length;J<Z;J++){let lt=H[J],K=m(lt),nt=E%P,rt=nt%K.boundary,Ut=nt+rt;E+=rt,Ut!==0&&P-Ut<K.storage&&(E+=P-Ut),N.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=E,E+=K.storage}}}let _=E%P;return _>0&&(E+=P-_),y.__size=E,y.__cache={},this}function m(y){let T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Wt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Wt("WebGLRenderer: Unsupported uniform value type.",y),T}function M(y){let T=y.target;T.removeEventListener("dispose",M);let E=o.indexOf(T.__bindingPointIndex);o.splice(E,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function w(){for(let y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:w}}var Rx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Qn=null;function Cx(){return Qn===null&&(Qn=new Yi(Rx,16,16,Di,kn),Qn.name="DFG_LUT",Qn.minFilter=je,Qn.magFilter=je,Qn.wrapS=Xn,Qn.wrapT=Xn,Qn.generateMipmaps=!1,Qn.needsUpdate=!0),Qn}var fl=class{constructor(t={}){let{canvas:e=Wu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=fn}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let v=f,g=new Set([Ra,Aa,wa]),m=new Set([fn,zn,Xs,qs,Ea,Ta]),M=new Uint32Array(4),w=new Int32Array(4),y=new I,T=null,E=null,P=[],_=[],b=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,L=!1,B=null,k=null,N=null,H=null;this._outputColorSpace=xn;let J=0,Z=0,lt=null,K=-1,nt=null,rt=new Ce,Ut=new Ce,It=null,de=new mt(0),se=0,ce=e.width,Q=e.height,it=1,St=null,Xt=null,At=new Ce(0,0,ce,Q),Yt=new Ce(0,0,ce,Q),xe=!1,st=new Us,ct=!1,ut=!1,dt=new ue,gt=new I,Gt=new Ce,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Zt=!1;function jt(){return lt===null?it:1}let D=n;function fe(S,U){return e.getContext(S,U)}let re,C,x,z,W,$,ft,pt,j,et,xt,Ot,Mt,yt,Bt,Vt,te,O,vt,tt,bt,wt,ot;try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Ee,!1),e.addEventListener("webglcontextrestored",pe,!1),e.addEventListener("webglcontextcreationerror",Ln,!1),D===null){let U="webgl2";if(D=fe(U,S),D===null)throw fe(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}kt()}catch(S){throw e.removeEventListener("webglcontextlost",Ee,!1),e.removeEventListener("webglcontextrestored",pe,!1),e.removeEventListener("webglcontextcreationerror",Ln,!1),qt("WebGLRenderer: "+S.message),S}function kt(){re=new Fg(D),re.init(),bt=new Mx(D,re),C=new wg(D,re,t,bt),x=new vx(D,re),C.reversedDepthBuffer&&d&&x.buffers.depth.setReversed(!0),k=D.createFramebuffer(),N=D.createFramebuffer(),H=D.createFramebuffer(),z=new zg(D),W=new ox,$=new bx(D,re,x,W,C,bt,z),ft=new Ug(A),pt=new Hp(D),wt=new Eg(D,pt),j=new Og(D,pt,z,wt),et=new Hg(D,j,pt,wt,z),O=new kg(D,C,$),Bt=new Ag(W),xt=new rx(A,ft,re,C,wt,Bt),Ot=new wx(A,W),Mt=new lx,yt=new px(re),te=new Sg(A,ft,x,et,p,l),Vt=new yx(A,et,C),ot=new Ax(D,z,C,x),vt=new Tg(D,re,z),tt=new Bg(D,re,z),z.programs=xt.programs,A.capabilities=C,A.extensions=re,A.properties=W,A.renderLists=Mt,A.shadowMap=Vt,A.state=x,A.info=z}v!==fn&&(b=new Vg(v,e.width,e.height,a,s,r));let Dt=new fh(A,D);this.xr=Dt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let S=re.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=re.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return it},this.setPixelRatio=function(S){S!==void 0&&(it=S,this.setSize(ce,Q,!1))},this.getSize=function(S){return S.set(ce,Q)},this.setSize=function(S,U,X=!0){if(Dt.isPresenting){Wt("WebGLRenderer: Can't change size while VR device is presenting.");return}ce=S,Q=U,e.width=Math.floor(S*it),e.height=Math.floor(U*it),X===!0&&(e.style.width=S+"px",e.style.height=U+"px"),b!==null&&b.setSize(e.width,e.height),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(ce*it,Q*it).floor()},this.setDrawingBufferSize=function(S,U,X){ce=S,Q=U,it=X,e.width=Math.floor(S*X),e.height=Math.floor(U*X),this.setViewport(0,0,S,U)},this.setEffects=function(S){if(v===fn){qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let U=0;U<S.length;U++)if(S[U].isOutputPass===!0){Wt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(rt)},this.getViewport=function(S){return S.copy(At)},this.setViewport=function(S,U,X,G){S.isVector4?At.set(S.x,S.y,S.z,S.w):At.set(S,U,X,G),x.viewport(rt.copy(At).multiplyScalar(it).round())},this.getScissor=function(S){return S.copy(Yt)},this.setScissor=function(S,U,X,G){S.isVector4?Yt.set(S.x,S.y,S.z,S.w):Yt.set(S,U,X,G),x.scissor(Ut.copy(Yt).multiplyScalar(it).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(S){x.setScissorTest(xe=S)},this.setOpaqueSort=function(S){St=S},this.setTransparentSort=function(S){Xt=S},this.getClearColor=function(S){return S.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor(...arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,X=!0){let G=0;if(S){let V=!1;if(lt!==null){let Tt=lt.texture.format;V=g.has(Tt)}if(V){let Tt=lt.texture.type,Ct=m.has(Tt),Et=te.getClearColor(),Pt=te.getClearAlpha(),Nt=Et.r,ne=Et.g,oe=Et.b;Ct?(M[0]=Nt,M[1]=ne,M[2]=oe,M[3]=Pt,D.clearBufferuiv(D.COLOR,0,M)):(w[0]=Nt,w[1]=ne,w[2]=oe,w[3]=Pt,D.clearBufferiv(D.COLOR,0,w))}else G|=D.COLOR_BUFFER_BIT}U&&(G|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),B=S},this.dispose=function(){e.removeEventListener("webglcontextlost",Ee,!1),e.removeEventListener("webglcontextrestored",pe,!1),e.removeEventListener("webglcontextcreationerror",Ln,!1),te.dispose(),Mt.dispose(),yt.dispose(),W.dispose(),ft.dispose(),et.dispose(),wt.dispose(),ot.dispose(),xt.dispose(),Dt.dispose(),Dt.removeEventListener("sessionstart",Sh),Dt.removeEventListener("sessionend",Eh),zi.stop()};function Ee(S){S.preventDefault(),kc("WebGLRenderer: Context Lost."),L=!0}function pe(){kc("WebGLRenderer: Context Restored."),L=!1;let S=z.autoReset,U=Vt.enabled,X=Vt.autoUpdate,G=Vt.needsUpdate,V=Vt.type;kt(),z.autoReset=S,Vt.enabled=U,Vt.autoUpdate=X,Vt.needsUpdate=G,Vt.type=V}function Ln(S){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Gn(S){let U=S.target;U.removeEventListener("dispose",Gn),rf(U)}function rf(S){of(S),W.remove(S)}function of(S){let U=W.get(S).programs;U!==void 0&&(U.forEach(function(X){xt.releaseProgram(X)}),S.isShaderMaterial&&xt.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,X,G,V,Tt){U===null&&(U=Ht);let Ct=V.isMesh&&V.matrixWorld.determinantAffine()<0,Et=cf(S,U,X,G,V);x.setMaterial(G,Ct);let Pt=X.index,Nt=1;if(G.wireframe===!0){if(Pt=j.getWireframeAttribute(X),Pt===void 0)return;Nt=2}let ne=X.drawRange,oe=X.attributes.position,Lt=ne.start*Nt,me=(ne.start+ne.count)*Nt;Tt!==null&&(Lt=Math.max(Lt,Tt.start*Nt),me=Math.min(me,(Tt.start+Tt.count)*Nt)),Pt!==null?(Lt=Math.max(Lt,0),me=Math.min(me,Pt.count)):oe!=null&&(Lt=Math.max(Lt,0),me=Math.min(me,oe.count));let Oe=me-Lt;if(Oe<0||Oe===1/0)return;wt.setup(V,G,Et,X,Pt);let Ae,Me=vt;if(Pt!==null&&(Ae=pt.get(Pt),Me=tt,Me.setIndex(Ae)),V.isMesh)G.wireframe===!0?(x.setLineWidth(G.wireframeLinewidth*jt()),Me.setMode(D.LINES)):Me.setMode(D.TRIANGLES);else if(V.isLine){let tn=G.linewidth;tn===void 0&&(tn=1),x.setLineWidth(tn*jt()),V.isLineSegments?Me.setMode(D.LINES):V.isLineLoop?Me.setMode(D.LINE_LOOP):Me.setMode(D.LINE_STRIP)}else V.isPoints?Me.setMode(D.POINTS):V.isSprite&&Me.setMode(D.TRIANGLES);if(V.isBatchedMesh)if(re.get("WEBGL_multi_draw"))Me.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let tn=V._multiDrawStarts,Rt=V._multiDrawCounts,on=V._multiDrawCount,he=Pt?pt.get(Pt).bytesPerElement:1,En=W.get(G).currentProgram.getUniforms();for(let Vn=0;Vn<on;Vn++)En.setValue(D,"_gl_DrawID",Vn),Me.render(tn[Vn]/he,Rt[Vn])}else if(V.isInstancedMesh)Me.renderInstances(Lt,Oe,V.count);else if(X.isInstancedBufferGeometry){let tn=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Rt=Math.min(X.instanceCount,tn);Me.renderInstances(Lt,Oe,Rt)}else Me.render(Lt,Oe)};function Mh(S,U,X,G){B!==null&&S.isNodeMaterial&&B.setObject(G,S),ct===!0&&Bt.setState(S,X,!1),S.transparent===!0&&S.side===Fe&&S.forceSinglePass===!1?(S.side=Ge,S.needsUpdate=!0,co(S,U,G),S.side=$n,S.needsUpdate=!0,co(S,U,G),S.side=Fe):co(S,U,G)}this.compile=function(S,U,X=null){X===null&&(X=S),B!==null&&B.renderStart(S,U,X),E=yt.get(X),E.init(U),_.push(E),X.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),S!==X&&S.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights(),B!==null&&B.updateLights(E.state.lightsArray),ut=this.localClippingEnabled,ct=Bt.init(this.clippingPlanes,ut),ct===!0&&Bt.setGlobalState(this.clippingPlanes,U),B!==null&&Vt.render(E.state.shadowsArray,X,U);let G=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let Tt=V.material;if(Tt)if(Array.isArray(Tt))for(let Ct=0;Ct<Tt.length;Ct++){let Et=Tt[Ct];Mh(Et,X,U,V),G.add(Et)}else Mh(Tt,X,U,V),G.add(Tt)}),E=_.pop(),B!==null&&B.renderEnd(),G},this.compileAsync=function(S,U,X=null){let G=this.compile(S,U,X);return new Promise(V=>{function Tt(){if(G.forEach(function(Ct){let Pt=W.get(Ct).currentProgram;(Pt===void 0||Pt.isReady())&&G.delete(Ct)}),G.size===0){V(S);return}setTimeout(Tt,10)}re.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let Nl=null;function af(S){Nl&&Nl(S)}function Sh(){zi.stop()}function Eh(){zi.start()}let zi=new Md;zi.setAnimationLoop(af),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(S){Nl=S,Dt.setAnimationLoop(S),S===null?zi.stop():zi.start()},Dt.addEventListener("sessionstart",Sh),Dt.addEventListener("sessionend",Eh),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;B!==null&&B.renderStart(S,U);let X=Dt.enabled===!0&&Dt.isPresenting===!0,G=b!==null&&(lt===null||X)&&b.begin(A,lt);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Dt.enabled===!0&&Dt.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Dt.cameraAutoUpdate===!0&&Dt.updateCamera(U),U=Dt.getCamera()),S.isScene===!0&&S.onBeforeRender(A,S,U,lt),E=yt.get(S,_.length),E.init(U),E.state.textureUnits=$.getTextureUnits(),_.push(E),dt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),st.setFromProjectionMatrix(dt,Fn,U.reversedDepth),ut=this.localClippingEnabled,ct=Bt.init(this.clippingPlanes,ut),T=Mt.get(S,P.length),T.init(),P.push(T),Dt.enabled===!0&&Dt.isPresenting===!0){let Ct=A.xr.getDepthSensingMesh();Ct!==null&&Ul(Ct,U,-1/0,A.sortObjects)}Ul(S,U,0,A.sortObjects),T.finish(),B!==null&&B.updateLights(E.state.lightsArray),A.sortObjects===!0&&T.sort(St,Xt),Zt=Dt.enabled===!1||Dt.isPresenting===!1||Dt.hasDepthSensing()===!1,Zt&&te.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ct===!0&&Bt.beginShadows();let V=E.state.shadowsArray;if(Vt.render(V,S,U),ct===!0&&Bt.endShadows(),(G&&b.hasRenderPass())===!1){let Ct=T.opaque,Et=T.transmissive;if(E.setupLights(),U.isArrayCamera){let Pt=U.cameras;if(Et.length>0)for(let Nt=0,ne=Pt.length;Nt<ne;Nt++){let oe=Pt[Nt];wh(Ct,Et,S,oe)}Zt&&te.render(S);for(let Nt=0,ne=Pt.length;Nt<ne;Nt++){let oe=Pt[Nt];Th(T,S,oe,oe.viewport)}}else Et.length>0&&wh(Ct,Et,S,U),Zt&&te.render(S),Th(T,S,U)}lt!==null&&Z===0&&($.updateMultisampleRenderTarget(lt),$.updateRenderTargetMipmap(lt)),G&&b.end(A),S.isScene===!0&&S.onAfterRender(A,S,U),wt.resetDefaultState(),K=-1,nt=null,_.pop(),_.length>0?(E=_[_.length-1],$.setTextureUnits(E.state.textureUnits),ct===!0&&Bt.setGlobalState(A.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?T=P[P.length-1]:T=null,B!==null&&B.renderEnd()};function Ul(S,U,X,G){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)X=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLightProbeGrid)E.pushLightProbeGrid(S);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(st)){G&&Gt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(dt);let Ct=et.update(S),Et=S.material;Et.visible&&T.push(S,Ct,Et,X,Gt.z,null,U)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(st))){let Ct=et.update(S),Et=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Gt.copy(S.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),Gt.copy(Ct.boundingSphere.center)),Gt.applyMatrix4(S.matrixWorld).applyMatrix4(dt)),Array.isArray(Et)){let Pt=Ct.groups;for(let Nt=0,ne=Pt.length;Nt<ne;Nt++){let oe=Pt[Nt],Lt=Et[oe.materialIndex];Lt&&Lt.visible&&T.push(S,Ct,Lt,X,Gt.z,oe,U)}}else Et.visible&&T.push(S,Ct,Et,X,Gt.z,null,U)}}let Tt=S.children;for(let Ct=0,Et=Tt.length;Ct<Et;Ct++)Ul(Tt[Ct],U,X,G)}function Th(S,U,X,G){let{opaque:V,transmissive:Tt,transparent:Ct}=S;E.setupLightsView(X),ct===!0&&Bt.setGlobalState(A.clippingPlanes,X),G&&x.viewport(rt.copy(G)),V.length>0&&lo(V,U,X),Tt.length>0&&lo(Tt,U,X),Ct.length>0&&lo(Ct,U,X),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function wh(S,U,X,G){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){let Lt=re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new dn(1,1,{generateMipmaps:!0,type:Lt?kn:fn,minFilter:Pi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ae.workingColorSpace})}let Tt=E.state.transmissionRenderTarget[G.id],Ct=G.viewport||rt;Tt.setSize(Ct.z*A.transmissionResolutionScale,Ct.w*A.transmissionResolutionScale);let Et=A.getRenderTarget(),Pt=A.getActiveCubeFace(),Nt=A.getActiveMipmapLevel();A.setRenderTarget(Tt),A.getClearColor(de),se=A.getClearAlpha(),se<1&&A.setClearColor(16777215,.5),A.clear(),Zt&&te.render(X);let ne=A.toneMapping;A.toneMapping=Bn;let oe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),ct===!0&&Bt.setGlobalState(A.clippingPlanes,G),lo(S,X,G),$.updateMultisampleRenderTarget(Tt),$.updateRenderTargetMipmap(Tt),re.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let me=0,Oe=U.length;me<Oe;me++){let Ae=U[me],{object:Me,geometry:tn,material:Rt,group:on}=Ae;if(Rt.side===Fe&&Me.layers.test(G.layers)){let he=Rt.side;Rt.side=Ge,Rt.needsUpdate=!0,Ah(Me,X,G,tn,Rt,on),Rt.side=he,Rt.needsUpdate=!0,Lt=!0}}Lt===!0&&($.updateMultisampleRenderTarget(Tt),$.updateRenderTargetMipmap(Tt))}A.setRenderTarget(Et,Pt,Nt),A.setClearColor(de,se),oe!==void 0&&(G.viewport=oe),A.toneMapping=ne}function lo(S,U,X){let G=U.isScene===!0?U.overrideMaterial:null;for(let V=0,Tt=S.length;V<Tt;V++){let Ct=S[V],{object:Et,geometry:Pt,group:Nt}=Ct,ne=Ct.material;ne.allowOverride===!0&&G!==null&&(ne=G),Et.layers.test(X.layers)&&Ah(Et,U,X,Pt,ne,Nt)}}function Ah(S,U,X,G,V,Tt){B!==null&&V.isNodeMaterial&&B.setObject(S,V),S.onBeforeRender(A,U,X,G,V,Tt),S.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(A,U,X,G,S,Tt),V.transparent===!0&&V.side===Fe&&V.forceSinglePass===!1?(V.side=Ge,V.needsUpdate=!0,A.renderBufferDirect(X,U,G,V,S,Tt),V.side=$n,V.needsUpdate=!0,A.renderBufferDirect(X,U,G,V,S,Tt),V.side=Fe):A.renderBufferDirect(X,U,G,V,S,Tt),S.onAfterRender(A,U,X,G,V,Tt)}function co(S,U,X){U.isScene!==!0&&(U=Ht);let G=W.get(S),V=E.state.lights,Tt=E.state.shadowsArray,Ct=V.state.version,Et=xt.getParameters(S,V.state,Tt,U,X,E.state.lightProbeGridArray),Pt=xt.getProgramCacheKey(Et),Nt=G.programs;G.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;let ne=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;G.envMap=ft.get(S.envMap||G.environment,ne),G.envMapRotation=G.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Nt===void 0&&(S.addEventListener("dispose",Gn),Nt=new Map,G.programs=Nt);let oe=Nt.get(Pt);if(oe!==void 0){if(G.currentProgram===oe&&G.lightsStateVersion===Ct)return Ch(S,Et),oe}else Et.uniforms=xt.getUniforms(S),B!==null&&S.isNodeMaterial&&B.build(S,X,Et),S.onBeforeCompile(Et,A),oe=xt.acquireProgram(Et,Pt),Nt.set(Pt,oe),G.uniforms=Et.uniforms;let Lt=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Lt.clippingPlanes=Bt.uniform),Ch(S,Et),G.needsLights=uf(S),G.lightsStateVersion=Ct,G.needsLights&&(Lt.ambientLightColor.value=V.state.ambient,Lt.lightProbe.value=V.state.probe,Lt.sunLights.value=V.state.sun,Lt.sunLightShadows.value=V.state.sunShadow,Lt.directionalLights.value=V.state.directional,Lt.directionalLightShadows.value=V.state.directionalShadow,Lt.spotLights.value=V.state.spot,Lt.spotLightShadows.value=V.state.spotShadow,Lt.rectAreaLights.value=V.state.rectArea,Lt.ltc_1.value=V.state.rectAreaLTC1,Lt.ltc_2.value=V.state.rectAreaLTC2,Lt.pointLights.value=V.state.point,Lt.pointLightShadows.value=V.state.pointShadow,Lt.hemisphereLights.value=V.state.hemi,Lt.sunShadowMatrix.value=V.state.sunShadowMatrix,Lt.sunShadowCascade.value=V.state.sunShadowCascade,Lt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Lt.spotLightMatrix.value=V.state.spotLightMatrix,Lt.spotLightMap.value=V.state.spotLightMap,Lt.pointShadowMatrix.value=V.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=oe,G.uniformsList=null,oe}function Rh(S){if(S.uniformsList===null){let U=S.currentProgram.getUniforms();S.uniformsList=Ks.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Ch(S,U){let X=W.get(S);X.outputColorSpace=U.outputColorSpace,X.batching=U.batching,X.batchingColor=U.batchingColor,X.instancing=U.instancing,X.instancingColor=U.instancingColor,X.instancingMorph=U.instancingMorph,X.skinning=U.skinning,X.morphTargets=U.morphTargets,X.morphNormals=U.morphNormals,X.morphColors=U.morphColors,X.morphTargetsCount=U.morphTargetsCount,X.numClippingPlanes=U.numClippingPlanes,X.numIntersection=U.numClipIntersection,X.vertexAlphas=U.vertexAlphas,X.vertexTangents=U.vertexTangents,X.toneMapping=U.toneMapping}function lf(S,U){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(U.matrixWorld);for(let X=0,G=S.length;X<G;X++){let V=S[X];if(V.texture!==null&&V.boundingBox.containsPoint(y))return V}return null}function cf(S,U,X,G,V){U.isScene!==!0&&(U=Ht),$.resetTextureUnits();let Tt=U.fog,Ct=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,Et=lt===null?A.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:ae.workingColorSpace,Pt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Nt=ft.get(G.envMap||Ct,Pt),ne=G.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,oe=!!X.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Lt=!!X.morphAttributes.position,me=!!X.morphAttributes.normal,Oe=!!X.morphAttributes.color,Ae=Bn;G.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(Ae=A.toneMapping);let Me=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,tn=Me!==void 0?Me.length:0,Rt=W.get(G),on=E.state.lights;if(ct===!0&&(ut===!0||S!==nt)){let Te=S===nt&&G.id===K;Bt.setState(G,S,Te)}let he=!1;G.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==on.state.version||Rt.outputColorSpace!==Et||V.isBatchedMesh&&Rt.batching===!1||!V.isBatchedMesh&&Rt.batching===!0||V.isBatchedMesh&&Rt.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Rt.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Rt.instancing===!1||!V.isInstancedMesh&&Rt.instancing===!0||V.isSkinnedMesh&&Rt.skinning===!1||!V.isSkinnedMesh&&Rt.skinning===!0||V.isInstancedMesh&&Rt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Rt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Rt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Rt.instancingMorph===!1&&V.morphTexture!==null||Rt.envMap!==Nt||G.fog===!0&&Rt.fog!==Tt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==Bt.numPlanes||Rt.numIntersection!==Bt.numIntersection)||Rt.vertexAlphas!==ne||Rt.vertexTangents!==oe||Rt.morphTargets!==Lt||Rt.morphNormals!==me||Rt.morphColors!==Oe||Rt.toneMapping!==Ae||Rt.morphTargetsCount!==tn||!!Rt.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(he=!0):(he=!0,Rt.__version=G.version);let En=Rt.currentProgram;he===!0&&(En=co(G,U,V),B&&G.isNodeMaterial&&B.onUpdateProgram(G,En,Rt));let Vn=!1,mi=!1,hs=!1,ve=En.getUniforms(),Le=Rt.uniforms;if(x.useProgram(En.program)&&(Vn=!0,mi=!0,hs=!0),G.id!==K&&(K=G.id,mi=!0),Rt.needsLights){let Te=lf(E.state.lightProbeGridArray,V);Rt.lightProbeGrid!==Te&&(Rt.lightProbeGrid=Te,mi=!0)}if(Vn||nt!==S){x.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ve.setValue(D,"projectionMatrix",S.projectionMatrix),ve.setValue(D,"viewMatrix",S.matrixWorldInverse);let _i=ve.map.cameraPosition;_i!==void 0&&_i.setValue(D,gt.setFromMatrixPosition(S.matrixWorld)),C.logarithmicDepthBuffer&&ve.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ve.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),nt!==S&&(nt=S,mi=!0,hs=!0)}if(Rt.needsLights&&(on.state.sunShadowMap.length>0&&ve.setValue(D,"sunShadowMap",on.state.sunShadowMap,$),on.state.directionalShadowMap.length>0&&ve.setValue(D,"directionalShadowMap",on.state.directionalShadowMap,$),on.state.spotShadowMap.length>0&&ve.setValue(D,"spotShadowMap",on.state.spotShadowMap,$),on.state.pointShadowMap.length>0&&ve.setValue(D,"pointShadowMap",on.state.pointShadowMap,$)),V.isSkinnedMesh){ve.setOptional(D,V,"bindMatrix"),ve.setOptional(D,V,"bindMatrixInverse");let Te=V.skeleton;Te&&(Te.boneTexture===null&&Te.computeBoneTexture(),ve.setValue(D,"boneTexture",Te.boneTexture,$))}V.isBatchedMesh&&(ve.setOptional(D,V,"batchingTexture"),ve.setValue(D,"batchingTexture",V._matricesTexture,$),ve.setOptional(D,V,"batchingIdTexture"),ve.setValue(D,"batchingIdTexture",V._indirectTexture,$),ve.setOptional(D,V,"batchingColorTexture"),V._colorsTexture!==null&&ve.setValue(D,"batchingColorTexture",V._colorsTexture,$));let gi=X.morphAttributes;if((gi.position!==void 0||gi.normal!==void 0||gi.color!==void 0)&&O.update(V,X,En),(mi||Rt.receiveShadow!==V.receiveShadow)&&(Rt.receiveShadow=V.receiveShadow,ve.setValue(D,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(Le.envMapIntensity.value=U.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=Cx()),mi){if(ve.setValue(D,"toneMappingExposure",A.toneMappingExposure),Rt.needsLights&&hf(Le,hs),Tt&&G.fog===!0&&Ot.refreshFogUniforms(Le,Tt),Ot.refreshMaterialUniforms(Le,G,it,Q,E.state.transmissionRenderTarget[S.id]),Rt.needsLights&&Rt.lightProbeGrid){let Te=Rt.lightProbeGrid;Le.probesSH.value=Te.texture,Le.probesMin.value.copy(Te.boundingBox.min),Le.probesMax.value.copy(Te.boundingBox.max),Le.probesResolution.value.copy(Te.resolution)}Ks.upload(D,Rh(Rt),Le,$)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ks.upload(D,Rh(Rt),Le,$),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ve.setValue(D,"center",V.center),ve.setValue(D,"modelViewMatrix",V.modelViewMatrix),ve.setValue(D,"normalMatrix",V.normalMatrix),ve.setValue(D,"modelMatrix",V.matrixWorld),G.uniformsGroups!==void 0){let Te=G.uniformsGroups;for(let _i=0,us=Te.length;_i<us;_i++){let Ph=Te[_i];ot.update(Ph,En),ot.bind(Ph,En)}}return En}function hf(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.sunLights.needsUpdate=U,S.sunLightShadows.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function uf(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return lt},this.setRenderTargetTextures=function(S,U,X){let G=W.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),W.get(S.texture).__webglTexture=U,W.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:X,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){let X=W.get(S);X.__webglFramebuffer=U,X.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,X=0){lt=S,J=U,Z=X;let G=null,V=!1,Tt=!1;if(S){let Et=W.get(S);if(Et.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(D.FRAMEBUFFER,Et.__webglFramebuffer),rt.copy(S.viewport),Ut.copy(S.scissor),It=S.scissorTest,x.viewport(rt),x.scissor(Ut),x.setScissorTest(It),K=-1;return}else if(Et.__webglFramebuffer===void 0)$.setupRenderTarget(S);else if(Et.__hasExternalTextures)$.rebindTextures(S,W.get(S.texture).__webglTexture,W.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let ne=S.depthTexture;if(Et.__boundDepthTexture!==ne){if(ne!==null&&W.has(ne)&&(S.width!==ne.image.width||S.height!==ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(S)}}let Pt=S.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(Tt=!0);let Nt=W.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Nt[U])?G=Nt[U][X]:G=Nt[U],V=!0):S.samples>0&&$.useMultisampledRTT(S)===!1?G=W.get(S).__webglMultisampledFramebuffer:Array.isArray(Nt)?G=Nt[X]:G=Nt,rt.copy(S.viewport),Ut.copy(S.scissor),It=S.scissorTest}else rt.copy(At).multiplyScalar(it).floor(),Ut.copy(Yt).multiplyScalar(it).floor(),It=xe;if(X!==0&&(G=k),x.bindFramebuffer(D.FRAMEBUFFER,G)&&x.drawBuffers(S,G),x.viewport(rt),x.scissor(Ut),x.setScissorTest(It),V){let Et=W.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,Et.__webglTexture,X)}else if(Tt){let Et=U;for(let Pt=0;Pt<S.textures.length;Pt++){let Nt=W.get(S.textures[Pt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Pt,Nt.__webglTexture,X,Et)}}else if(S!==null&&X!==0){let Et=W.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Et.__webglTexture,X)}K=-1};function Ih(S){let U=W.get(S);return(U.__readFormat!==S.format||U.__readType!==S.type)&&(U.__readFormat=S.format,U.__readType=S.type,U.__formatReadable=C.textureFormatReadable(S.format),U.__typeReadable=C.textureTypeReadable(S.type)),U}this.readRenderTargetPixels=function(S,U,X,G,V,Tt,Ct,Et=0){if(!(S&&S.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=W.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ct!==void 0&&(Pt=Pt[Ct]),Pt){x.bindFramebuffer(D.FRAMEBUFFER,Pt);try{let Nt=S.textures[Et],ne=Nt.format,oe=Nt.type;S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Et);let Lt=Ih(Nt);if(Lt.__formatReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Lt.__typeReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-G&&X>=0&&X<=S.height-V&&D.readPixels(U,X,G,V,bt.convert(ne),bt.convert(oe),Tt)}finally{let Nt=lt!==null?W.get(lt).__webglFramebuffer:null;x.bindFramebuffer(D.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(S,U,X,G,V,Tt,Ct,Et=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=W.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ct!==void 0&&(Pt=Pt[Ct]),Pt)if(U>=0&&U<=S.width-G&&X>=0&&X<=S.height-V){x.bindFramebuffer(D.FRAMEBUFFER,Pt);let Nt=S.textures[Et],ne=Nt.format,oe=Nt.type;S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Et);let Lt=Ih(Nt);if(Lt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Lt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let me=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,me),D.bufferData(D.PIXEL_PACK_BUFFER,Tt.byteLength,D.STREAM_READ),D.readPixels(U,X,G,V,bt.convert(ne),bt.convert(oe),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let Oe=lt!==null?W.get(lt).__webglFramebuffer:null;x.bindFramebuffer(D.FRAMEBUFFER,Oe);let Ae=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await qu(D,Ae,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,me),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Tt),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(me),D.deleteSync(Ae),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,X=0){let G=Math.pow(2,-X),V=Math.floor(S.image.width*G),Tt=Math.floor(S.image.height*G),Ct=U!==null?U.x:0,Et=U!==null?U.y:0;$.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,Ct,Et,V,Tt),x.unbindTexture()},this.copyTextureToTexture=function(S,U,X=null,G=null,V=0,Tt=0){let Ct,Et,Pt,Nt,ne,oe,Lt,me,Oe,Ae=S.isCompressedTexture?S.mipmaps[Tt]:S.image;if(X!==null)Ct=X.max.x-X.min.x,Et=X.max.y-X.min.y,Pt=X.isBox3?X.max.z-X.min.z:1,Nt=X.min.x,ne=X.min.y,oe=X.isBox3?X.min.z:0;else{let Le=Math.pow(2,-V);Ct=Math.floor(Ae.width*Le),Et=Math.floor(Ae.height*Le),S.isDataArrayTexture?Pt=Ae.depth:S.isData3DTexture?Pt=Math.floor(Ae.depth*Le):Pt=1,Nt=0,ne=0,oe=0}G!==null?(Lt=G.x,me=G.y,Oe=G.z):(Lt=0,me=0,Oe=0);let Me=bt.convert(U.format),tn=bt.convert(U.type),Rt;U.isData3DTexture?($.setTexture3D(U,0),Rt=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?($.setTexture2DArray(U,0),Rt=D.TEXTURE_2D_ARRAY):($.setTexture2D(U,0),Rt=D.TEXTURE_2D),x.activeTexture(D.TEXTURE0),x.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),x.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),x.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);let on=x.getParameter(D.UNPACK_ROW_LENGTH),he=x.getParameter(D.UNPACK_IMAGE_HEIGHT),En=x.getParameter(D.UNPACK_SKIP_PIXELS),Vn=x.getParameter(D.UNPACK_SKIP_ROWS),mi=x.getParameter(D.UNPACK_SKIP_IMAGES);x.pixelStorei(D.UNPACK_ROW_LENGTH,Ae.width),x.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ae.height),x.pixelStorei(D.UNPACK_SKIP_PIXELS,Nt),x.pixelStorei(D.UNPACK_SKIP_ROWS,ne),x.pixelStorei(D.UNPACK_SKIP_IMAGES,oe);let hs=S.isDataArrayTexture||S.isData3DTexture,ve=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){let Le=W.get(S),gi=W.get(U),Te=W.get(Le.__renderTarget),_i=W.get(gi.__renderTarget);x.bindFramebuffer(D.READ_FRAMEBUFFER,Te.__webglFramebuffer),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let us=0;us<Pt;us++)hs&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,W.get(S).__webglTexture,V,oe+us),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,W.get(U).__webglTexture,Tt,Oe+us)),D.blitFramebuffer(Nt,ne,Ct,Et,Lt,me,Ct,Et,D.DEPTH_BUFFER_BIT,D.NEAREST);x.bindFramebuffer(D.READ_FRAMEBUFFER,null),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||W.has(S)){let Le=W.get(S),gi=W.get(U);x.bindFramebuffer(D.READ_FRAMEBUFFER,N),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,H);for(let Te=0;Te<Pt;Te++)hs?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Le.__webglTexture,V,oe+Te):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Le.__webglTexture,V),ve?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,gi.__webglTexture,Tt,Oe+Te):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,gi.__webglTexture,Tt),V!==0?D.blitFramebuffer(Nt,ne,Ct,Et,Lt,me,Ct,Et,D.COLOR_BUFFER_BIT,D.NEAREST):ve?D.copyTexSubImage3D(Rt,Tt,Lt,me,Oe+Te,Nt,ne,Ct,Et):D.copyTexSubImage2D(Rt,Tt,Lt,me,Nt,ne,Ct,Et);x.bindFramebuffer(D.READ_FRAMEBUFFER,null),x.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ve?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(Rt,Tt,Lt,me,Oe,Ct,Et,Pt,Me,tn,Ae.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(Rt,Tt,Lt,me,Oe,Ct,Et,Pt,Me,Ae.data):D.texSubImage3D(Rt,Tt,Lt,me,Oe,Ct,Et,Pt,Me,tn,Ae):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Tt,Lt,me,Ct,Et,Me,tn,Ae.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Tt,Lt,me,Ae.width,Ae.height,Me,Ae.data):D.texSubImage2D(D.TEXTURE_2D,Tt,Lt,me,Ct,Et,Me,tn,Ae);x.pixelStorei(D.UNPACK_ROW_LENGTH,on),x.pixelStorei(D.UNPACK_IMAGE_HEIGHT,he),x.pixelStorei(D.UNPACK_SKIP_PIXELS,En),x.pixelStorei(D.UNPACK_SKIP_ROWS,Vn),x.pixelStorei(D.UNPACK_SKIP_IMAGES,mi),Tt===0&&U.generateMipmaps&&D.generateMipmap(Rt),x.unbindTexture()},this.initRenderTarget=function(S){W.get(S).__webglFramebuffer===void 0&&$.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?$.setTextureCube(S,0):S.isData3DTexture?$.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?$.setTexture2DArray(S,0):$.setTexture2D(S,0),x.unbindTexture()},this.resetState=function(){J=0,Z=0,lt=null,x.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}};var Cd={type:"change"},mh={type:"start"},Pd={type:"end"},gl=new qi,Id=new yn,Ix=Math.cos(70*Gc.DEG2RAD),Xe=new I,pn=2*Math.PI,ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ph=1e-6,_l=class extends Wr{constructor(t,e=null){super(t,e),this.state=ye.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ri.ROTATE,MIDDLE:Ri.DOLLY,RIGHT:Ri.PAN},this.touches={ONE:Ci.ROTATE,TWO:Ci.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new ln,this._lastTargetPosition=new I,this._quat=new ln().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Gs,this._sphericalDelta=new Gs,this._scale=1,this._panOffset=new I,this._rotateStart=new at,this._rotateEnd=new at,this._rotateDelta=new at,this._panStart=new at,this._panEnd=new at,this._panDelta=new at,this._dollyStart=new at,this._dollyEnd=new at,this._dollyDelta=new at,this._dollyDirection=new I,this._mouse=new at,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Lx.bind(this),this._onPointerDown=Px.bind(this),this._onPointerUp=Dx.bind(this),this._onContextMenu=kx.bind(this),this._onMouseWheel=Fx.bind(this),this._onKeyDown=Ox.bind(this),this._onTouchStart=Bx.bind(this),this._onTouchMove=zx.bind(this),this._onMouseDown=Nx.bind(this),this._onMouseMove=Ux.bind(this),this._interceptControlDown=Hx.bind(this),this._interceptControlUp=Gx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ye.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Cd),this.update(),this.state=ye.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Xe.copy(e).sub(this.target),Xe.applyQuaternion(this._quat),this._spherical.setFromVector3(Xe),this.autoRotate&&this.state===ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=pn:n>Math.PI&&(n-=pn),s<-Math.PI?s+=pn:s>Math.PI&&(s-=pn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Xe.setFromSpherical(this._spherical),Xe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Xe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Xe.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new I(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Xe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(gl.origin.copy(this.object.position),gl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(gl.direction))<Ix?this.object.lookAt(this.target):(Id.setFromNormalAndCoplanarPoint(this.object.up,this.target),gl.intersectPlane(Id,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ph||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ph||this._lastTargetPosition.distanceToSquared(this.target)>ph?(this.dispatchEvent(Cd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?pn/60*this.autoRotateSpeed*t:pn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Xe.setFromMatrixColumn(e,0),Xe.multiplyScalar(-t),this._panOffset.add(Xe)}_panUp(t,e){this.screenSpacePanning===!0?Xe.setFromMatrixColumn(e,1):(Xe.setFromMatrixColumn(e,0),Xe.crossVectors(this.object.up,Xe)),Xe.multiplyScalar(t),this._panOffset.add(Xe)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Xe.copy(s).sub(this.target);let r=Xe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/e.clientHeight),this._rotateUp(pn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-pn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(pn*this._rotateDelta.x/e.clientHeight),this._rotateUp(pn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new at,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Px(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Lx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Dx(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Pd),this.state=ye.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Nx(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ri.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ye.DOLLY;break;case Ri.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}break;case Ri.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(mh)}function Ux(i){switch(this.state){case ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Fx(i){this.enabled===!1||this.enableZoom===!1||this.state!==ye.NONE||(i.preventDefault(),this.dispatchEvent(mh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Pd))}function Ox(i){this.enabled!==!1&&this._handleKeyDown(i)}function Bx(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ci.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ye.TOUCH_ROTATE;break;case Ci.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ye.TOUCH_PAN;break;default:this.state=ye.NONE}break;case 2:switch(this.touches.TWO){case Ci.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ye.TOUCH_DOLLY_PAN;break;case Ci.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ye.TOUCH_DOLLY_ROTATE;break;default:this.state=ye.NONE}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(mh)}function zx(i){switch(this._trackPointer(i),this.state){case ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ye.NONE}}function kx(i){this.enabled!==!1&&i.preventDefault()}function Hx(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Gx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var xl=class{constructor(t,e={}){this.enabled=!0;let n=e.defaultThickness!==void 0?e.defaultThickness:.003,s=new mt().fromArray(e.defaultColor!==void 0?e.defaultColor:[0,0,0]),r=e.defaultAlpha!==void 0?e.defaultAlpha:1,o=e.defaultKeepAlive!==void 0?e.defaultKeepAlive:!1,a={},l=60,c={},h={},u={outlineThickness:{value:n},outlineColor:{value:s},outlineAlpha:{value:r}},d=["#include <common>","#include <uv_pars_vertex>","#include <displacementmap_pars_vertex>","#include <fog_pars_vertex>","#include <morphtarget_pars_vertex>","#include <skinning_pars_vertex>","#include <logdepthbuf_pars_vertex>","#include <clipping_planes_pars_vertex>","uniform float outlineThickness;","vec4 calculateOutline( vec4 pos, vec3 normal, vec4 skinned ) {","	float thickness = outlineThickness;","	const float ratio = 1.0;","	vec4 pos2 = projectionMatrix * modelViewMatrix * vec4( skinned.xyz + normal, 1.0 );","	vec4 norm = normalize( pos - pos2 );","	return pos + norm * thickness * pos.w * ratio;","}","void main() {","	#include <uv_vertex>","	#include <beginnormal_vertex>","	#include <morphnormal_vertex>","	#include <skinbase_vertex>","	#include <skinnormal_vertex>","	#include <begin_vertex>","	#include <morphtarget_vertex>","	#include <skinning_vertex>","	#include <displacementmap_vertex>","	#include <project_vertex>","	vec3 outlineNormal = - objectNormal;","	gl_Position = calculateOutline( gl_Position, outlineNormal, vec4( transformed, 1.0 ) );","	#include <logdepthbuf_vertex>","	#include <clipping_planes_vertex>","	#include <fog_vertex>","}"].join(`
`),f=["#include <common>","#include <fog_pars_fragment>","#include <logdepthbuf_pars_fragment>","#include <clipping_planes_pars_fragment>","uniform vec3 outlineColor;","uniform float outlineAlpha;","void main() {","	#include <clipping_planes_fragment>","	#include <logdepthbuf_fragment>","	gl_FragColor = vec4( outlineColor, outlineAlpha );","	#include <tonemapping_fragment>","	#include <colorspace_fragment>","	#include <fog_fragment>","	#include <premultiplied_alpha_fragment>","}"].join(`
`);function p(){return new Ue({type:"OutlineEffect",uniforms:ll.merge([_t.fog,_t.displacementmap,u]),vertexShader:d,fragmentShader:f,side:Ge})}function v(_){let b=a[_.uuid];return b===void 0&&(b={material:p(),used:!0,keepAlive:o,count:0},a[_.uuid]=b),b.used=!0,b.material}function g(_){let b=v(_);return c[b.uuid]=_,E(b,_),b}function m(_){let b=_.geometry,A=b!==void 0&&b.attributes.normal!==void 0;return _.isMesh===!0&&_.material!==void 0&&A===!0}function M(_){if(m(_)!==!1){if(Array.isArray(_.material))for(let b=0,A=_.material.length;b<A;b++)_.material[b]=g(_.material[b]);else _.material=g(_.material);h[_.uuid]=_.onBeforeRender,_.onBeforeRender=y}}function w(_){if(m(_)!==!1){if(Array.isArray(_.material))for(let b=0,A=_.material.length;b<A;b++)_.material[b]=c[_.material[b].uuid];else _.material=c[_.material.uuid];_.onBeforeRender=h[_.uuid]}}function y(_,b,A,L,B){let k=c[B.uuid];k!==void 0&&T(B,k)}function T(_,b){let A=b.userData.outlineParameters;_.uniforms.outlineAlpha.value=b.opacity,A!==void 0&&(A.thickness!==void 0&&(_.uniforms.outlineThickness.value=A.thickness),A.color!==void 0&&_.uniforms.outlineColor.value.fromArray(A.color),A.alpha!==void 0&&(_.uniforms.outlineAlpha.value=A.alpha)),b.displacementMap&&(_.uniforms.displacementMap.value=b.displacementMap,_.uniforms.displacementScale.value=b.displacementScale,_.uniforms.displacementBias.value=b.displacementBias)}function E(_,b){if(_.name==="invisible")return;let A=b.userData.outlineParameters;_.fog=b.fog,_.toneMapped=b.toneMapped,_.premultipliedAlpha=b.premultipliedAlpha,_.displacementMap=b.displacementMap,A!==void 0?(b.visible===!1?_.visible=!1:_.visible=A.visible!==void 0?A.visible:!0,_.transparent=A.alpha!==void 0&&A.alpha<1?!0:b.transparent,A.keepAlive!==void 0&&(a[b.uuid].keepAlive=A.keepAlive)):(_.transparent=b.transparent,_.visible=b.visible),(b.wireframe===!0||b.depthTest===!1)&&(_.visible=!1),b.clippingPlanes&&(_.clipping=!0,_.clippingPlanes=b.clippingPlanes,_.clipIntersection=b.clipIntersection,_.clipShadows=b.clipShadows),_.version=b.version}function P(){let _;_=Object.keys(c);for(let b=0,A=_.length;b<A;b++)c[_[b]]=void 0;_=Object.keys(h);for(let b=0,A=_.length;b<A;b++)h[_[b]]=void 0;_=Object.keys(a);for(let b=0,A=_.length;b<A;b++){let L=_[b];a[L].used===!1?(a[L].count++,a[L].keepAlive===!1&&a[L].count>l&&delete a[L]):(a[L].used=!1,a[L].count=0)}}this.render=function(_,b){if(this.enabled===!1){t.render(_,b);return}let A=t.autoClear;t.autoClear=this.autoClear,t.render(_,b),t.autoClear=A,this.renderOutline(_,b)},this.renderOutline=function(_,b){let A=t.autoClear,L=_.matrixWorldAutoUpdate,B=_.background,k=t.shadowMap.enabled;_.matrixWorldAutoUpdate=!1,_.background=null,t.autoClear=!1,t.shadowMap.enabled=!1,_.traverse(M),t.render(_,b),_.traverse(w),P(),_.matrixWorldAutoUpdate=L,_.background=B,t.autoClear=A,t.shadowMap.enabled=k},this.setSize=function(_,b){t.setSize(_,b)}}};function Ni(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new _e,c=0;for(let h=0;h<i.length;++h){let u=i[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Ld(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][d]);let p=Ld(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Ld(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new De(o,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<e;p++){let v=h.getComponent(d,p);a.setComponent(d+u,p,v)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var Y={grass:"#a8c47f",grassDeep:"#86a968",meadowLight:"#c4d68f",wheat:"#ecc66b",sand:"#efd5a0",dune:"#e4bf82",rock:"#b39b85",rockDark:"#8c7465",soil:"#9b7a5c",snow:"#f7f3ea",water:"#8fc9cc",waterDeep:"#6aaab5",stone:"#e8dfc9",stoneShade:"#d2c4a6",stoneDark:"#a99b84",roofBlue:"#5d7aa6",roofRose:"#c98272",roofSlate:"#6e7f95",wood:"#9a6f4c",woodDark:"#6f4d36",plank:"#c49a6c",gold:"#f2c14e",princeGreen:"#6f9b6c",crimson:"#b8504a",royal:"#5a5f9e",cream:"#f6efdc",ink:"#4a3a2f",windowNight:"#ffd88a",windowDay:"#5a6e8a",leaf:"#7fae6a",leafDeep:"#5f8f5a",pine:"#5e8c6a",baobab:"#9c8a6a",lava:"#ff9a5a",white:"#fbf8f1",skin:"#f6d9bf"},io=null;function Vx(){if(io)return io;let i=new Uint8Array([120,178,228,255]),t=new Yi(i,i.length,1,Ys);return t.minFilter=Ne,t.magFilter=Ne,t.generateMipmaps=!1,t.needsUpdate=!0,io=t,t}var yl=new Map,Wx=[.27,.2,.16];function F(i,t={}){let e=`${new mt(i).getHexString()}|${JSON.stringify(t)}`,n=yl.get(e);if(n)return n;let s=new Je({color:i,gradientMap:Vx(),emissive:t.emissive??"#000000",emissiveIntensity:t.emissiveIntensity??1,transparent:t.transparent??!1,opacity:t.opacity??1,side:t.side??$n,vertexColors:t.vertexColors??!1});return s.userData.outlineParameters=t.outline===!1?{visible:!1}:{thickness:t.outlineThickness??.0032,color:Wx,alpha:.85},yl.set(e,s),s}function we(i){return i.userData.outlineParameters={visible:!1},i}function Od(){yl.forEach(i=>i.dispose()),yl.clear(),io?.dispose(),io=null}function Mn(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Dd=new Yn,Nd=new ln,Ud=new I,Fd=new I;function Kt(i=0,t=0,e=0,n=0,s=0,r=0,o=1,a=1,l=1){return Dd.set(n,s,r),Nd.setFromEuler(Dd),Ud.set(i,t,e),Fd.set(o,a,l),new ue().compose(Ud,Nd,Fd)}var vl=new Map;function os(i,t){let e=vl.get(i);return e||(e=t(),vl.set(i,e)),e}var q={box:()=>os("box",()=>new Jn(1,1,1).translate(0,.5,0)),cyl:(i=1,t=12)=>os(`cyl${i.toFixed(3)}|${t}`,()=>new Ie(i,1,1,t).translate(0,.5,0)),cone:(i=12)=>os(`cone${i}`,()=>new Kn(1,1,i).translate(0,.5,0)),sphere:(i=12,t=10)=>os(`sph${i}|${t}`,()=>new cn(1,i,t)),halfCyl:(i=10)=>os(`half${i}`,()=>new Ie(1,1,1,i,1,!1,-Math.PI/2,Math.PI).rotateX(-Math.PI/2)),ico:(i=0)=>os(`ico${i}`,()=>new ui(1,i)),torus:(i=.15,t=16)=>os(`tor${i}|${t}`,()=>new ji(1,i,6,t))};function Bd(){vl.forEach(i=>i.dispose()),vl.clear()}function Xx(i,t){let e=i.index?i.toNonIndexed():i.clone();for(let n of Object.keys(e.attributes))n!=="position"&&n!=="normal"&&n!=="uv"&&e.deleteAttribute(n);if(e.attributes.normal||e.computeVertexNormals(),!e.attributes.uv){let n=e.attributes.position.count;e.setAttribute("uv",new De(new Float32Array(n*2),2))}return e.applyMatrix4(t),e}var Rn=class{constructor(){this.buckets=new Map}add(t,e,n,s="core"){let r=`${e.uuid}|${s}`,o=this.buckets.get(r);o||(o={material:e,layer:s,geometries:[]},this.buckets.set(r,o)),o.geometries.push(Xx(t,n))}build(t="batch"){let e=new Ft;e.name=t;let n=new Map;return this.buckets.forEach(s=>{let r=Ni(s.geometries,!1);if(s.geometries.forEach(l=>l.dispose()),!r)return;r.computeBoundingSphere();let o=new zt(r,s.material);o.castShadow=!0,o.receiveShadow=!0;let a=n.get(s.layer);a||(a=new Ft,a.name=s.layer,n.set(s.layer,a),e.add(a)),a.add(o)}),this.buckets.clear(),e.userData.layers=n,e}},ei=class i{constructor(t,e=new ue,n="core"){this.batcher=t;this.base=e;this.layer=n}put(t,e,n){this.batcher.add(t,e,this.base.clone().multiply(n),this.layer)}child(t=0,e=0,n=0,s=0,r){return new i(this.batcher,this.base.clone().multiply(Kt(t,e,n,0,s,0)),r??this.layer)}withLayer(t){return new i(this.batcher,this.base,t)}box(t,e,n,s,r,o,a,l=0,c=0,h=0){this.put(q.box(),t,Kt(r,o,a,c,l,h,e,n,s))}cyl(t,e,n,s,r,o,a,l=12,c=0,h=0){let u=n===0?1:e/n;this.put(q.cyl(u,l),t,Kt(r,o,a,c,0,h,n,s,n))}cone(t,e,n,s,r,o,a=12,l=0){this.put(q.cone(a),t,Kt(s,r,o,0,l,0,e,n,e))}sphere(t,e,n,s,r,o=1,a=1,l=1){this.put(q.sphere(),t,Kt(n,s,r,0,0,0,e*o,e*a,e*l))}rock(t,e,n,s,r,o=0,a=.7){this.put(q.ico(0),t,Kt(n,s,r,.3,o,.2,e,e*a,e))}arch(t,e,n,s,r,o,a,l=0){let c=e/2,h=this.child(r,o,a,l);h.box(t,e,n-c,s,0,0,0),h.put(q.halfCyl(),t,Kt(0,n-c,0,0,0,0,c,c,s))}merlons(t,e,n,s,r,o,a=.5,l=.55,c=.55){let h=s-e,u=r-n,d=Math.hypot(h,u),f=Math.atan2(h,u),p=Math.max(1,Math.floor(d/(l+c))),v=d/p;for(let g=0;g<p;g++){let m=(g+.5)*v;this.box(t,a,l*.9,l,e+h*m/d,o,n+u*m/d,f)}}ringMerlons(t,e,n,s,r=0,o=0,a=.42){for(let l=0;l<s;l++){let c=l/s*Math.PI*2;this.box(t,a,a*.95,.32,r+Math.sin(c)*e,n,o+Math.cos(c)*e,c)}}};var pi={x0:-4,x1:4,z0:-8.5,z1:-3,levels:[1.2,4.1,7],top:9.799999999999999},qe={x0:3.6,x1:8.5,z0:-3,z1:4.5,h:4.4},Cn={x0:-8.5,x1:-4.6,z0:-2.5,z1:4,h:4.2},ze={x0:-8.5,x1:-4.6,z0:5.2,z1:8.5,h:3.2},zd={x0:4.6,x1:8.5,z0:5.6,z1:8.5},hn={x:5.4,z:-7.6,r:1.5,h:14.5},gh=[[-9,-9],[9,-9],[9,9],[-9,9]],bl=1.2+5;function _h(i,t,e,n,s,r=1){["#ffd27a","#ffad5a","#ff8a4c"].forEach((a,l)=>{let c=new zt(q.cone(7),we(new Ze({color:a,transparent:!0,opacity:.92}))),h=(.24-l*.05)*r;c.scale.set(h,h*2.6,h),c.position.set(e+(l-1)*.08*r,n,s+(l%2-.5)*.08*r),c.userData.base=c.scale.y,c.userData.phase=Math.random()*10,t.push(c),i.add(c)})}function as(i,t,e,n,s,r,o="#ffb36b"){let a=new Qi(o,r,7,2);a.position.set(e,n,s),a.userData.base=r,t.push(a),i.add(a)}function Ui(i,t,e,n,s,r=.22){i.cyl(t.cream,.035,.035,r,e,n,s,6),i.cone(t.flame,.03,.08,e,n+r+.01,s,5)}function qx(i,t){i.cyl(t.shade,.13,.13,8.4,-2.8,1.2,-7.3,8);let s=42;for(let r=0;r<s;r++){let o=r*(Math.PI*2/13),a=1.2+r*8.3/s;i.box(t.shade,.72,.1,.34,-2.8+Math.cos(o)*.45,a,-7.3+Math.sin(o)*.45,-o)}}function Yx(i,t){let[e,n,s]=pi.levels;i.box(t.plank,7.2,.06,4.7,0,e,-5.75);for(let c of[n,s]){i.box(t.plank,5.6,.18,4.7,.8,c-.18,-5.75),i.box(t.plank,1.6,.18,3.1,-2.8,c-.18,-4.95);for(let h=0;h<6;h++)i.box(t.woodDark,.12,.16,4.7,-1.6+h*1.05,c-.36,-5.75)}qx(i,t);let r=t.woodDark;i.box(r,.2,1.7,2.2,3.45,e,-5.6),i.box(r,.3,.08,2.2,3.35,e+1.2,-5.6);for(let c=0;c<6;c++){let h=-6.5+c*.36;i.cyl(t.wood,.025,.025,1.9,3.25,e,h,5),i.cone(t.iron,.06,.22,3.25,e+1.9,h,5)}let o=[t.royal,t.crimson,t.gold];for(let c=0;c<3;c++)i.batcher.add(new Ie(.34,.34,.06,14).rotateX(Math.PI/2),o[c],i.base.clone().multiply(Kt(-.6+c*1.1,e+1.55,-8.05))),i.box(t.white,.08,.5,.07,-.6+c*1.1,e+1.3,-8);let a=F("#a77650");for(let c=0;c<3;c++)i.cyl(a,.27,.3,.7,1.4+c*.62,e,-7.75,10),i.cyl(t.iron,.305,.305,.04,1.4+c*.62,e+.18,-7.75,10);i.box(t.wood,.9,.5,.55,-1.2,e,-3.9),i.box(t.gold,.95,.06,.6,-1.2,e+.5,-3.9),i.box(t.wood,.9,.2,.55,-1.2,e+.56,-3.9);for(let c=0;c<4;c++)i.sphere(t.cream,.28,-.2+c*.3,e+.22,-4+c%2*.35,1,.75,1);i.cyl(t.iron,.18,.22,.8,2.3,e,-4.4,10),i.sphere(t.iron,.2,2.3,e+1,-4.4),i.box(t.wood,.06,.25,.06,2.3,e+.8,-4.4);let l=["#c0574f","#5d7aa6","#7fa06a","#e2b45a","#8a6a9a","#d98b5f"];for(let c=0;c<3;c++){let h=-1.4+c*1.65;i.box(t.woodDark,1.55,2.5,.42,h,n,-7.88);for(let u=0;u<4;u++){let d=h-.68,f=0;for(;d<h+.66;){let p=.08+(u*7+f*3+c)%4*.025,v=.38+(f+u)%3*.05;i.box(F(l[(f+u*2+c)%l.length]),p,v,.3,d+p/2,n+.12+u*.6,-7.68),d+=p+.012,f++}}}i.box(t.woodDark,.4,2.2,1.6,3.35,n,-5.2);for(let c=0;c<3;c++)for(let h=0;h<8;h++)i.box(F(l[(h+c)%6]),.28,.36,.13,3.18,n+.15+c*.66,-5.85+h*.18);i.box(t.royal,2.6,.02,1.8,.6,n,-5),i.box(t.wood,1.3,.08,.7,.6,n+.72,-5.4);for(let[c,h]of[[-0,-5.7],[1.2,-5.7],[0,-5.1],[1.2,-5.1]])i.box(t.woodDark,.07,.72,.07,c,n,h);i.box(t.white,.42,.03,.3,.45,n+.8,-5.4,.15),i.box(t.cream,.02,.05,.3,.45,n+.8,-5.4,.15),Ui(i,t,1.05,n+.8,-5.6),i.cyl(t.opening,.04,.05,.08,.9,n+.8,-5.25,6),i.box(t.wood,.5,.06,.48,.6,n+.36,-4.72);for(let[c,h]of[[.39,-4.52],[.81,-4.52],[.39,-4.92],[.81,-4.92]])i.box(t.woodDark,.05,.36,.05,c,n,h);i.box(t.wood,.5,.75,.06,.6,n+.42,-4.47),i.box(t.cream,1.4,.95,.03,-3.58,n+1,-4.6,Math.PI/2),i.box(F("#9cb88a"),.5,.4,.035,-3.56,n+1.2,-4.8,Math.PI/2),i.box(F("#9cb88a"),.35,.3,.035,-3.56,n+1.4,-4.2,Math.PI/2),i.box(t.wood,1.9,.4,2.3,1.1,s,-7),i.box(t.white,1.75,.18,2.1,1.1,s+.4,-7),i.box(t.royal,1.8,.1,1.4,1.1,s+.55,-6.6),i.box(t.cream,.6,.16,.36,.7,s+.58,-7.75),i.box(t.cream,.6,.16,.36,1.5,s+.58,-7.75);for(let[c,h]of[[.2,-8.05],[2,-8.05],[.2,-5.9],[2,-5.9]])i.cyl(t.woodDark,.05,.05,2.3,c,s,h,6);i.box(t.crimson,2,.16,2.3,1.1,s+2.3,-7),i.box(t.gold,2.06,.06,2.36,1.1,s+2.25,-7),i.box(t.crimson,.04,1.6,.5,.2,s+.7,-6.2),i.box(t.crimson,.04,1.6,.5,2,s+.7,-6.2),i.box(t.crimson,1.8,1.7,.04,1.1,s+.6,-8.05),i.box(t.woodDark,.6,1.9,1.1,3.25,s,-4.6),i.box(t.gold,.04,.12,.04,2.93,s+1,-4.5),i.box(t.wood,.9,.75,.45,-1.2,s,-7.85),i.batcher.add(new Ie(.3,.3,.04,16).rotateX(Math.PI/2),F("#cfe3ea"),i.base.clone().multiply(Kt(-1.2,s+1.15,-8.02))),i.cyl(t.crimson,.9,.9,.02,.9,s,-4.6,20),i.cyl(t.wood,.25,.25,.05,-1.6,s+.55,-4.3,10),i.cyl(t.woodDark,.04,.04,.55,-1.6,s,-4.3,5),i.cyl(F("#d8e6ee"),.06,.08,.18,-1.6,s+.6,-4.3,8);for(let c=0;c<3;c++)i.sphere(F(Y.crimson),.05,-1.6+(c-1)*.05,s+.85,-4.3)}function Zx(i,t,e,n,s){let r=(qe.x0+qe.x1)/2;i.box(t.plank,4.2,.05,6.8,r,1.2,.75),i.box(t.shade,4.2,.3,1.4,r,1.2,-1.95),i.box(t.crimson,2.4,.02,1.2,r,1.2+.3,-1.95),i.box(t.crimson,1,.02,4.7,r,1.2+.05,1);let o=1.2+.3;i.box(t.gold,.95,.45,.8,r,o,-2.2),i.box(t.crimson,.8,.1,.7,r,o+.45,-2.17),i.box(t.gold,.95,1.6,.14,r,o+.45,-2.55),i.box(t.crimson,.7,1.2,.04,r,o+.65,-2.47);for(let a of[-.44,.44])i.box(t.gold,.1,.35,.75,r+a,o+.45,-2.2),i.sphere(t.gold,.08,r+a,o+.85,-1.85),i.sphere(t.gold,.1,r+a,o+2.1,-2.55);i.box(t.crimson,1.6,.12,1.1,r,1.2+3.25,-2.15),i.box(t.gold,1.66,.06,1.16,r,1.2+3.2,-2.15),i.box(t.crimson,1.6,2.9,.05,r,1.2+.35,-2.6),i.box(t.gold,.5,.5,.06,r,1.2+2.3,-2.56);for(let a of[4.75,7.35]){i.box(t.wood,.85,.08,3.8,a,1.2+.72,1.2);for(let l of[-.55,2.95])i.box(t.woodDark,.7,.72,.1,a,1.2,l);for(let l of[-.58,.58])i.box(t.woodDark,.3,.06,3.6,a+l,1.2+.42,1.2),i.box(t.woodDark,.24,.42,.08,a+l,1.2,-.4),i.box(t.woodDark,.24,.42,.08,a+l,1.2,2.8);for(let l=0;l<5;l++){let c=-.3+l*.75;i.cyl(t.white,.16,.16,.025,a-.22,1.2+.8,c,12),i.cyl(t.white,.16,.16,.025,a+.22,1.2+.8,c+.3,12),i.cyl(t.gold,.04,.03,.14,a-.05,1.2+.8,c+.15,6)}i.sphere(F("#b36a3e"),.2,a,1.2+.95,.9,1.3,.8,1),i.cyl(t.white,.25,.2,.06,a,1.2+.8,1.9,12);for(let l=0;l<5;l++)i.sphere(F(l%2?"#d9534f":"#e8b84a"),.06,a+Math.cos(l)*.12,1.2+.9,1.9+Math.sin(l)*.12);Ui(i,t,a,1.2+.8,-.1),Ui(i,t,a,1.2+.8,2.6)}for(let a of[-.4,2.6])i.box(t.royal,.04,1.6,.7,qe.x1-.37,1.2+1.8,a),i.box(t.gold,.05,.36,.36,qe.x1-.38,1.2+2.6,a),i.cone(t.royal,.36,.3,qe.x1-.37,1.2+1.5,a,4,Math.PI/4);i.box(t.shade,1.7,1.7,.55,r,1.2,qe.z1-.6),i.arch(t.opening,1,1.05,.06,r,1.2,qe.z1-.89),i.box(t.dark,1.9,.14,.7,r,1.2+1.7,qe.z1-.62),i.cyl(t.woodDark,.07,.07,.7,r,1.2+.08,qe.z1-1,6,0,Math.PI/2),_h(e,n,r,1.2+.08,qe.z1-1,1),as(e,s,r,1.2+.9,qe.z1-1.6,4.5),i.batcher.add(q.torus(.06,18),t.woodDark,i.base.clone().multiply(Kt(r,1.2+3.1,1,Math.PI/2,0,0,.75,.75,.75))),i.cyl(t.iron,.015,.015,3.2,r,1.2+3.1,1,4);for(let a=0;a<8;a++){let l=a/8*Math.PI*2;Ui(i,t,r+Math.cos(l)*.75,1.2+3.12,1+Math.sin(l)*.75,.16)}as(e,s,r,1.2+2.8,1,2.5,"#ffd08a")}function Jx(i,t,e,n){let s=(Cn.x0+Cn.x1)/2;i.box(t.shade,3.3,.05,6,s,1.2,.75),i.box(t.royal,.6,.02,5,s,1.2+.05,1.1),i.box(t.shade,1.6,.18,.9,s,1.2,-1.75),i.box(t.white,1.3,.85,.55,s,1.2+.18,-1.8),i.box(t.gold,1.34,.1,.58,s,1.2+.95,-1.8),i.box(t.gold,.07,.6,.06,s,1.2+1.05,-1.95),i.box(t.gold,.32,.06,.06,s,1.2+1.45,-1.95),Ui(i,t,s-.45,1.2+1.05,-1.8,.3),Ui(i,t,s+.45,1.2+1.05,-1.8,.3),i.arch(t.stained,.6,1.8,.08,s,1.2+1.4,Cn.z0+.37);for(let r=0;r<4;r++){let o=0+r*.9;for(let a of[s-.95,s+.95])i.box(t.wood,1.15,.07,.36,a,1.2+.42,o),i.box(t.wood,1.15,.5,.06,a,1.2+.45,o+.2),i.box(t.woodDark,.06,.45,.36,a-.55,1.2,o),i.box(t.woodDark,.06,.45,.36,a+.55,1.2,o)}i.box(t.woodDark,.08,1,.08,s+1.1,1.2,-1),i.box(t.wood,.4,.05,.3,s+1.1,1.2+1,-1,0,-.4);for(let r of[-1.25,1.25])i.cyl(t.iron,.04,.06,1.3,s+r,1.2,-1.4,6),Ui(i,t,s+r,1.2+1.3,-1.4,.25);as(e,n,s,1.2+1.8,-1.2,1.8,"#ffd9a0")}function Kx(i,t,e,n,s){let r=(ze.z0+ze.z1)/2;i.box(t.shade,3.6,.05,3.2,-6.55,1.2,r),i.arch(t.opening,.8,.95,.06,ze.x0+1.12,1.2,r,Math.PI/2),i.cyl(t.woodDark,.06,.06,.6,ze.x0+1.35,1.2+.06,r,6,Math.PI/2),_h(e,n,ze.x0+1.5,1.2+.05,r,.85);for(let o=0;o<3;o++){let a=o/3*Math.PI*2;i.batcher.add(q.cyl(1,4),t.iron,i.base.clone().multiply(Kt(ze.x0+1.5+Math.cos(a)*.32,1.2,r+Math.sin(a)*.32,Math.sin(a)*.2,0,-Math.cos(a)*.2,.025,1,.025)))}i.sphere(F("#3d3a3f"),.3,ze.x0+1.5,1.2+.72,r,1,.8,1),i.cyl(F("#c9a15a"),.25,.25,.02,ze.x0+1.5,1.2+.86,r,12),as(e,s,ze.x0+1.9,1.2+.8,r,3.5),i.box(t.wood,1.4,.08,.75,-5.75,1.2+.75,7.75);for(let[o,a]of[[-6.35,7.45],[-5.15,7.45],[-6.35,8.05],[-5.15,8.05]])i.box(t.woodDark,.07,.75,.07,o,1.2,a);for(let o=0;o<3;o++)i.sphere(F("#c98a4b"),.12,-6.2+o*.25,1.2+.88,7.6,1.5,.75,1);i.sphere(F("#e3893f"),.15,-5.4,1.2+.95,7.9),i.sphere(F("#8fb36f"),.14,-5.15,1.2+.93,7.6),i.cyl(F("#d9a85a"),.18,.16,.08,-5.6,1.2+.83,7.55,12);for(let o of[1.3,1.9]){i.box(t.woodDark,2.2,.06,.3,-6.3,1.2+o,ze.z0+.45);for(let a=0;a<6;a++)i.cyl(F(["#c98a4b","#7fa0b8","#e2d3b0","#b8504a"][a%4]),.08,.09,.22,-7.2+a*.36,1.2+o+.06,ze.z0+.45,8)}i.box(t.woodDark,3.3,.1,.1,-6.55,1.2+2.6,r);for(let o=0;o<5;o++)i.cyl(F(o%2?"#8fb36f":"#b8604a"),.05,.03,.4,-7.4+o*.4,1.2+2.2,r,6);i.cyl(F("#a77650"),.28,.3,.7,-8,1.2,8.05,10),i.sphere(t.cream,.3,-7.4,1.2+.22,8.1,1,.75,1)}function $x(i,t,e,n,s){i.box(t.shade,1.3,.85,1,7.7,1.2,7.7),i.box(t.coal,.95,.05,.65,7.7,1.2+.85,7.7),i.cone(t.shade,.95,.9,7.7,1.2+1.9,7.8,4,Math.PI/4),i.box(t.shade,.4,1,.4,7.7,1.2+2.6,7.9),_h(e,n,7.7,1.2+.88,7.7,.6),i.box(t.wood,.5,.25,.8,6.85,1.2+.6,7.75,0,0,.2),i.box(F("#5b4030"),.45,.12,.75,6.85,1.2+.45,7.75),i.box(t.iron,.32,.45,.32,6.5,1.2,6.9),i.box(t.iron,.7,.18,.3,6.5,1.2+.45,6.9),i.batcher.add(q.cone(6),t.iron,i.base.clone().multiply(Kt(6.95,1.2+.54,6.9,0,0,-Math.PI/2,.09,.25,.09))),i.cyl(F("#a77650"),.3,.32,.6,5.2,1.2,8,10),i.cyl(F(Y.waterDeep),.27,.27,.02,5.2,1.2+.58,8,10),i.box(t.woodDark,1.6,1,.06,6,1.2+1.3,8.47);for(let r=0;r<4;r++)i.box(t.iron,.06,.5,.05,5.5+r*.33,1.2+1.5,8.43),i.batcher.add(q.torus(.25,10),t.iron,i.base.clone().multiply(Kt(5.5+r*.33,1.2+2.1,8.43,0,0,0,.1,.1,.1)));as(e,s,7.4,1.2+1.4,7.2,3.2,"#ff9a5a")}function jx(i,t,e){let n=1.2+hn.h+.28,{x:s,z:r}=hn;i.box(t.wood,.8,.06,.5,s-.6,n+.65,r-.65,.6),i.box(t.woodDark,.06,.65,.06,s-.85,n,r-.75),i.box(t.woodDark,.06,.65,.06,s-.35,n,r-.5),i.box(t.cream,.5,.02,.36,s-.6,n+.72,r-.65,.8),Ui(i,t,s-.35,n+.71,r-.55,.14);for(let h=0;h<3;h++){let u=h/3*Math.PI*2;i.batcher.add(q.cyl(1,4),t.woodDark,i.base.clone().multiply(Kt(s+.75+Math.cos(u)*.2,n,r+.6+Math.sin(u)*.2,Math.sin(u)*.25,0,-Math.cos(u)*.25,.025,.9,.025)))}i.batcher.add(q.cyl(.7,10),t.gold,i.base.clone().multiply(Kt(s+.75,n+.88,r+.6,.9,.6,0,.09,1.3,.09)));let o=new Ft,a=new zt(q.sphere(18,14),F("#9cc6dc"));a.scale.setScalar(.34),o.add(a);let l=F(Y.leaf);for(let h=0;h<6;h++){let u=new zt(q.sphere(8,6),l),d=h*1.1,f=Math.sin(h*2.3)*.6;u.position.set(Math.cos(d)*Math.cos(f)*.3,Math.sin(f)*.3,Math.sin(d)*Math.cos(f)*.3),u.scale.set(.11,.08,.11),o.add(u)}let c=new zt(q.torus(.04,24),F(Y.gold));return c.scale.setScalar(.4),o.add(c),o.position.set(s-.1,n+1,r+.85),o.rotation.z=.4,i.cyl(t.woodDark,.05,.12,.6,s-.1,n,r+.85,8),e.add(o),o}function kd(i,t){let e=new Ft;e.name="interior-animated";let n=[],s=[];Yx(i,t),Zx(i,t,e,n,s),Jx(i,t,e,s),Kx(i,t,e,n,s),$x(i,t,e,n,s);let r=jx(i,t,e);as(e,s,.8,pi.levels[1]+1.8,-5.6,2.2,"#ffd9a0"),as(e,s,1,pi.levels[2]+1.8,-5.4,2,"#ffd9a0");let o=new Ft,a=new zt(new Ie(.12,.3,.42,14,1,!0),F(Y.gold,{side:Fe}));a.position.y=-.3,o.add(a);let l=new zt(q.sphere(8,6),F(Y.woodDark));l.scale.setScalar(.07),l.position.y=-.5,o.add(l),o.position.set((Cn.x0+Cn.x1)/2,1.2+Cn.h+2.75+1.28,Cn.z1-.3),e.add(o);let c=pi.levels,h={king:{position:new I((qe.x0+qe.x1)/2,1.2+.85,-2.15),rotation:0},princess:{position:new I(.6,c[1]+.42,-4.75),rotation:Math.PI},cat:{position:new I(1.35,c[2]+.65,-6.4),rotation:.6},geographer:{position:new I(hn.x+.15,1.2+hn.h+.28,hn.z+.05),rotation:.9},cook:{position:new I(ze.x0+2.35,1.2,(ze.z0+ze.z1)/2),rotation:-Math.PI/2},smith:{position:new I(5.85,1.2,6.9),rotation:Math.PI/2},monk:{position:new I((Cn.x0+Cn.x1)/2,1.2,-.9),rotation:Math.PI}};return{group:e,anchors:h,update(u,d){n.forEach(f=>{let p=1+Math.sin(u*9+f.userData.phase)*.12+Math.sin(u*23+f.userData.phase)*.06;f.scale.y=f.userData.base*p}),s.forEach((f,p)=>{f.intensity=f.userData.base*(.25+d*.95)*(1+Math.sin(u*11+p)*.06)}),r.rotation.y=u*.35,o.rotation.x=Math.sin(u*1.6)*.35}}}var Qx=new Ie(1,1,1,3).rotateX(-Math.PI/2).translate(0,.5,0),ty=new Kn(1,1,4).rotateY(Math.PI/4).translate(0,.5,0);function ey(){return{stone:F(Y.stone),shade:F(Y.stoneShade),dark:F(Y.stoneDark),roofBlue:F(Y.roofBlue),roofRose:F(Y.roofRose),roofSlate:F(Y.roofSlate),roofDeep:F("#45608f"),wood:F(Y.wood),woodDark:F(Y.woodDark),plank:F(Y.plank),door:F("#6a4b38"),opening:F("#3f3530"),gold:F(Y.gold),crimson:F(Y.crimson),royal:F(Y.royal),cream:F(Y.cream),white:F(Y.white),iron:F("#6d6f78"),leaf:F(Y.leaf),window:new Je({color:Y.windowDay,emissive:Y.windowNight,emissiveIntensity:0}),stained:new Je({color:"#8fb0d8",emissive:"#f0c27a",emissiveIntensity:0}),flame:we(new Ze({color:"#ffc46b"})),coal:we(new Ze({color:"#ff8a4c"}))}}function In(i,t,e,n,s,r,o,a,l=0){i.batcher.add(Qx,t,i.base.clone().multiply(Kt(r,o,a,0,l,0,e/.866,n/1.5,s)))}function ny(i,t,e,n,s,r,o,a){i.batcher.add(ty,t,i.base.clone().multiply(Kt(r,o,a,0,0,0,e/.707,s,n/.707)))}function ke(i,t,e,n,s,r,o=.5,a=.9){i.arch(t.window,o,a,.14,e,n,s,r),i.box(t.shade,o+.18,.08,.22,e,n-.07,s,r)}function xh(i,t,e,n,s,r,o){r.forEach((a,l)=>{o.forEach(c=>{let h=c+l*.35;ke(i,t,e+Math.sin(h)*(s+.01),a,n+Math.cos(h)*(s+.01),h,.42,.8)})})}function iy(i,t,e,n,s){i.cyl(t.dark,2.3,2.45,.9,e,1.2-.3,n,20),i.cyl(t.stone,2,2,8.4,e,1.2,n,20),i.cyl(t.shade,2.08,2.08,.18,e,1.2+4.6,n,20),i.cyl(t.shade,2.32,2.05,.5,e,1.2+8.3,n,20),i.ringMerlons(t.shade,2.18,1.2+8.8,14,e,n,.44),i.cone(s,2.55,5.2,e,1.2+9,n,20),i.sphere(t.gold,.16,e,1.2+14.25,n),i.cyl(t.woodDark,.035,.035,1.3,e,1.2+14.2,n,5);let o=Math.atan2(e,n);xh(i,t,e,n,2,[1.2+2.4,1.2+5.3],[o-.7,o+.7]),xh(i,t,e,n,2,[1.2+7.1],[o])}function sy(i,t){let e=1.2+5;i.box(t.stone,18,5,1,0,1.2,-9),i.box(t.stone,1,5,18,-9,1.2,0),i.box(t.stone,1,5,18,9,1.2,0),i.box(t.stone,6.4,5,1,-5.8,1.2,9),i.box(t.stone,6.4,5,1,5.8,1.2,9),i.box(t.dark,18.6,.6,1.4,0,1.2-.4,-9),i.box(t.dark,1.4,.6,18.6,-9,1.2-.4,0),i.box(t.dark,1.4,.6,18.6,9,1.2-.4,0),i.box(t.dark,6.6,.6,1.4,-5.8,1.2-.4,9),i.box(t.dark,6.6,.6,1.4,5.8,1.2-.4,9),i.box(t.shade,14,.16,1.15,0,e-.1,-9),i.box(t.shade,1.15,.16,14,-9,e-.1,0),i.box(t.shade,1.15,.16,14,9,e-.1,0),i.merlons(t.stone,-6.8,-9.36,6.8,-9.36,e,.32),i.merlons(t.stone,-9.36,-6.8,-9.36,6.8,e,.32),i.merlons(t.stone,9.36,-6.8,9.36,6.8,e,.32),i.merlons(t.stone,-6.8,9.36,-4.2,9.36,e,.32),i.merlons(t.stone,4.2,9.36,6.8,9.36,e,.32),i.box(t.shade,14,.35,.2,0,e,-8.6),i.box(t.shade,.2,.35,14,-8.6,e,0),i.box(t.shade,.2,.35,14,8.6,e,0);for(let n=-3;n<=3;n++)n!==0&&(i.box(t.opening,.14,.9,.06,n*2,1.2+2.6,-9.52),i.box(t.opening,.06,.9,.14,-9.52,1.2+2.6,n*2),i.box(t.opening,.06,.9,.14,9.52,1.2+2.6,n*2));i.arch(t.door,1,1.7,.1,-9.52,1.2,-5.5,-Math.PI/2),i.arch(t.door,1,1.7,.1,5.5,1.2,-9.52,Math.PI);for(let n=0;n<12;n++)i.box(t.shade,1.1,.4166666666666667*(n+1),.36,-7.95,1.2,-3.2-n*.36)}function ry(i,t){i.box(t.stone,3.6,6.4,2.4,0,1.2,9.3),i.box(t.shade,3.9,.4,2.7,0,1.2+6.2,9.3),i.merlons(t.stone,-1.8,10.55,1.8,10.55,1.2+6.6,.3),i.merlons(t.stone,-1.8,8.05,1.8,8.05,1.2+6.6,.3);for(let e of[-1,1]){let n=e*2.6;i.cyl(t.dark,1.75,1.85,.8,n,1.2-.3,9.7,18),i.cyl(t.stone,1.5,1.5,7.4,n,1.2,9.7,18),i.cyl(t.shade,1.75,1.55,.4,n,1.2+7.3,9.7,18),i.cone(t.roofRose,1.95,3.8,n,1.2+7.7,9.7,18),i.sphere(t.gold,.13,n,1.2+11.55,9.7),ke(i,t,n+e*.6,1.2+3.4,11.12,e*.4,.38,.75),ke(i,t,n+e*.6,1.2+5.6,11.12,e*.4,.38,.75)}i.arch(t.opening,2.2,3.3,.1,0,1.2,10.52),i.arch(t.opening,2.2,3.3,.1,0,1.2,8.08),i.box(t.opening,2.1,.02,2.4,0,1.2+.01,9.3);for(let e=-3;e<=3;e++)i.box(t.iron,.06,1.2,.06,e*.3,1.2+2.15,10.62);i.box(t.iron,2.1,.07,.07,0,1.2+2.6,10.62),i.box(t.iron,2.1,.07,.07,0,1.2+3,10.62),i.box(t.plank,2.3,.14,3.2,0,1.2-.08,12.1);for(let e=0;e<8;e++)i.box(t.woodDark,2.3,.02,.04,0,1.2+.06,10.75+e*.4);for(let e of[-1,1])i.batcher.add(new Ie(.03,.03,1,4).translate(0,.5,0),t.iron,i.base.clone().multiply(Kt(e*1.05,1.2+.05,13.6,-.72,0,0,1,4.3,1)));i.box(t.royal,1.1,1.6,.05,0,1.2+4.2,10.56),i.box(t.gold,.5,.5,.06,0,1.2+4.75,10.57)}function oy(i,t,e){let{x0:n,x1:s,z0:r,z1:o,top:a}=pi,l=s-n,c=o-r,h=(n+s)/2,u=(r+o)/2,d=a-1.2;i.box(e.dark,l+.4,.5,c+.4,h,1.2-.3,u),i.box(e.stone,.4,d,c,n+.2,1.2,u),i.box(e.stone,.4,d,c,s-.2,1.2,u),i.box(e.stone,l,d,.4,h,1.2,r+.2),t.box(e.stone,l,d,.4,h,1.2,o-.2);for(let p of[1.2+2.9,1.2+5.8])i.box(e.shade,.5,.14,c+.1,n+.2,p-.1,u),i.box(e.shade,.5,.14,c+.1,s-.2,p-.1,u),t.box(e.shade,l+.1,.14,.5,h,p-.1,o-.2);t.arch(e.door,1.3,2.2,.12,0,1.2,o+.02),t.box(e.shade,1.7,.18,.3,0,1.2+2.25,o+.05);for(let p of[-2.4,2.4])ke(t,e,p,1.2+.9,o+.02,0),ke(t,e,p,1.2+3.7,o+.02,0,.6,1.1),ke(t,e,p,1.2+6.6,o+.02,0,.6,1.1);ke(t,e,0,1.2+3.7,o+.02,0,.7,1.3),ke(t,e,0,1.2+6.6,o+.02,0,.7,1.3),t.box(e.shade,1.6,.12,.6,0,1.2+3.55,o+.28);for(let p=-3;p<=3;p++)t.box(e.shade,.06,.55,.06,p*.24,1.2+3.6,o+.55);t.box(e.shade,1.6,.06,.06,0,1.2+4.15,o+.55);for(let[p,v]of[[n-.01,-Math.PI/2],[s+.01,Math.PI/2]])for(let g of[-7,-4.6])ke(i,e,p,1.2+3.7,g,v),ke(i,e,p,1.2+6.6,g,v);t.box(e.shade,l+.5,.35,c+.5,h,a-.1,u),t.merlons(e.stone,n-.1,o+.15,s+.1,o+.15,a+.25,.3),t.merlons(e.stone,n-.1,r-.15,s+.1,r-.15,a+.25,.3),t.merlons(e.stone,n-.15,r,n-.15,o,a+.25,.3),t.merlons(e.stone,s+.15,r,s+.15,o,a+.25,.3),t.box(e.plank,l-.2,.2,c-.2,h,a-.3,u);let f=t;ny(f,e.roofSlate,l/2-.3,c/2-.3,4.4,h,a+.2,u),f.sphere(e.gold,.18,h,a+4.7,u)}function ay(i,t){let{x:e,z:n,r:s,h:r}=hn,o=1.2+r;i.cyl(t.stone,s,s*1.08,r,e,1.2,n,18),i.cyl(t.shade,s+.08,s+.08,.16,e,1.2+9.2,n,18),xh(i,t,e,n,s,[1.2+9.8,1.2+11.6,1.2+13.2],[Math.PI*.25,Math.PI*.9,-Math.PI*.4]),i.cyl(t.shade,2.15,1.6,.55,e,o-.3,n,20),i.ringMerlons(t.stone,2.05,o+.25,16,e,n,.4),i.cyl(t.plank,1.95,1.95,.06,e,o+.22,n,20);for(let a=0;a<6;a++){let l=a/6*Math.PI*2+.3;i.cyl(t.shade,.09,.09,2.3,e+Math.sin(l)*1.3,o+.25,n+Math.cos(l)*1.3,6)}i.cyl(t.shade,1.55,1.45,.3,e,o+2.5,n,18),i.cone(t.roofDeep,1.95,3.6,e,o+2.8,n,18),i.cyl(t.gold,.04,.04,.6,e,o+6.3,n,5)}function ly(i,t,e){let{x0:n,x1:s,z0:r,z1:o,h:a}=qe,l=s-n,c=o-r,h=(n+s)/2,u=(r+o)/2;i.box(e.stone,.35,a,c,s-.175,1.2,u),i.box(e.stone,l,a,.35,h,1.2,r+.175),i.box(e.stone,l,a,.35,h,1.2,o-.175),t.box(e.stone,.35,a,c,n+.175,1.2,u),t.box(e.dark,.5,.4,c+.2,n+.15,1.2-.2,u),t.arch(e.door,1.2,2.1,.12,n-.02,1.2,2.6,-Math.PI/2);for(let d of[-1.6,.6])ke(t,e,n-.02,1.2+1.4,d,-Math.PI/2,.55,1.6);ke(i,e,n+.9,1.2+1.6,o+.01,0,.5,1.4),ke(i,e,s-.9,1.2+1.6,o+.01,0,.5,1.4);for(let d of[-1.4,1.2,3.4])ke(i,e,9.52,1.2+2.2,d,Math.PI/2,.4,1.1);In(t,e.stone,l/2,2.6,c-.05,h,1.2+a,u),In(t,e.roofRose,l/2+.45,2.85,c+.5,h,1.2+a-.25,u),i.box(e.shade,.9,6.4,.7,h,1.2+1.6,o-.5),i.box(e.dark,1.05,.3,.85,h,1.2+8,o-.5)}function cy(i,t,e){let{x0:n,x1:s,z0:r,z1:o,h:a}=Cn,l=s-n,c=o-r,h=(n+s)/2,u=(r+o)/2;i.box(e.stone,.35,a,c,n+.175,1.2,u),i.box(e.stone,l,a,.35,h,1.2,r+.175),i.box(e.stone,l,a,.35,h,1.2,o-.175),t.box(e.stone,.35,a,c,s-.175,1.2,u),t.arch(e.door,1.1,2.2,.12,s+.02,1.2,1.6,Math.PI/2),t.arch(e.stained,.5,1.6,.12,s+.02,1.2+1.4,-1,Math.PI/2);for(let f of[-1.2,.6,2.4])i.arch(e.stained,.5,1.6,.14,n-.02,1.2+1.4,f,-Math.PI/2);In(i,e.stone,l/2,3,.36,h,1.2+a,o-.18),In(t,e.stone,l/2,3,c-.4,h,1.2+a,u-.2),In(t,e.roofBlue,l/2+.4,3.35,c+.5,h,1.2+a-.3,u),i.batcher.add(new Ie(.62,.62,.1,20).rotateX(Math.PI/2),e.stained,i.base.clone().multiply(Kt(h,1.2+a+.9,o+.02))),i.batcher.add(new ji(.64,.08,6,24),e.shade,i.base.clone().multiply(Kt(h,1.2+a+.9,o+.06)));let d=1.2+a+2.75;i.box(e.stone,.18,1.3,.5,h-.45,d,o-.3),i.box(e.stone,.18,1.3,.5,h+.45,d,o-.3),i.box(e.shade,1.2,.12,.7,h,d+1.3,o-.3),i.cone(e.roofBlue,.75,.9,h,d+1.42,o-.3,4,Math.PI/4),i.box(e.gold,.06,.6,.06,h,d+2.3,o-.3),i.box(e.gold,.36,.06,.06,h,d+2.65,o-.3)}function hy(i,t,e){let{x0:n,x1:s,z0:r,z1:o,h:a}=ze,l=s-n,c=o-r,h=(n+s)/2,u=(r+o)/2;i.box(e.cream,.3,a,c,n+.15,1.2,u),i.box(e.cream,l,a,.3,h,1.2,r+.15),t.box(e.cream,.3,a,c,s-.15,1.2,u);for(let d of[r+.15,o-.3])i.box(e.woodDark,l,.14,.34,h,1.2+a-.14,d);i.box(e.woodDark,.14,a,.34,n+1.6,1.2,r+.15),i.box(e.woodDark,.14,a,.34,n+2.8,1.2,r+.15),ke(i,e,h,1.2+1.3,r-.01,Math.PI,.55,.8),t.arch(e.door,.95,1.9,.1,s+.02,1.2,u,Math.PI/2),t.box(e.woodDark,.34,.14,c,s-.15,1.2+a-.14,u),In(t,e.cream,c/2,1.9,l-.05,h,1.2+a,u,Math.PI/2),In(t,F("#b9785f"),c/2+.4,2.15,l+.45,h,1.2+a-.2,u,Math.PI/2),i.box(e.shade,1,6.6,1.05,n+.6,1.2,u),i.box(e.dark,1.15,.25,1.2,n+.6,1.2+6.6,u)}function uy(i,t,e){let{x0:n,x1:s,z0:r,z1:o}=zd;for(let a of[n+.2,s-.25])i.box(e.woodDark,.2,2.6,.2,a,1.2,r+.15);i.box(e.woodDark,s-n,.2,.22,(n+s)/2,1.2+2.5,r+.15),t.box(F("#a97462"),s-n+.5,.16,o-r+.6,(n+s)/2,1.2+2.95,(r+o)/2-.1,0,-.28)}function dy(i,t){i.cyl(t.dark,.85,.9,.75,-1.8,1.2,3,16),i.cyl(F(Y.waterDeep),.68,.68,.02,-1.8,1.2+.7,3,16),i.box(t.woodDark,.12,1.9,.12,-2.6,1.2+.6,3),i.box(t.woodDark,.12,1.9,.12,-1,1.2+.6,3),i.box(t.woodDark,1.8,.1,.1,-1.8,1.2+2.2,3),In(i,t.roofRose,1.1,.6,1.2,-1.8,1.2+2.3,3,Math.PI/2),i.cyl(t.wood,.14,.12,.26,-1.8,1.2+1.4,3,8),i.box(t.woodDark,.14,1.6,.14,2.6,1.2,6.3),i.box(t.woodDark,1.1,.12,.12,2.6,1.2+1.15,6.3),i.sphere(F("#d9c08f"),.28,2.6,1.2+1.75,6.3),i.cyl(F("#d9c08f"),.25,.22,.7,2.6,1.2+.5,6.3,8),i.box(t.wood,1.2,.5,2,2.9,1.2+.45,3.4,.2);for(let s of[-.7,.7])i.batcher.add(new Ie(.42,.42,.1,12).rotateZ(Math.PI/2),t.woodDark,i.base.clone().multiply(Kt(2.9,1.2+.42,3.4+s,0,.2,0)));i.sphere(F(Y.wheat),.55,2.9,1.2+1.05,3.4,1.1,.6,1.6);let e=F("#a77650");for(let[s,r]of[[-4,5.6],[-3.6,6.3],[-4.1,7]])i.cyl(e,.3,.34,.7,s,1.2,r,10),i.cyl(t.iron,.345,.345,.05,s,1.2+.2,r,10);i.box(t.plank,.6,.5,.6,-3.2,1.2,7.6,.3),i.box(t.plank,.45,.4,.45,-3.25,1.2+.5,7.55,.6);let n=F("#9b7a5c");for(let s=0;s<3;s++){i.box(n,.9,.3,2.4,5.6+s*1.05,1.2,-5.6);for(let r=0;r<4;r++)i.sphere(F(s===1?"#e3836e":Y.leaf),.17,5.6+s*1.05+r%2*.3-.15,1.2+.42,-6.5+r*.6)}i.cyl(t.wood,.14,.18,1.4,7.6,1.2,-3.8,6),i.sphere(F(Y.leafDeep),.95,7.6,1.2+2.1,-3.8);for(let s=0;s<6;s++)i.sphere(F("#e3836e"),.1,7.6+Math.sin(s*2)*.8,1.2+1.9+s%3*.25,-3.8+Math.cos(s*2)*.8);for(let[s,r]of[[-2.6,6.8],[2.4,-1.8],[-3.2,-1.8]])i.cyl(t.iron,.05,.07,2.2,s,1.2,r,6),i.box(t.iron,.34,.06,.34,s,1.2+2.2,r),i.box(t.window,.26,.36,.26,s,1.2+2.26,r),i.cone(t.iron,.26,.24,s,1.2+2.62,r,4,Math.PI/4)}function fy(i,t,e=1.1){let n=new _e,s=10,r=[],o=[];for(let c=0;c<=s;c++){let h=c/s,u=.32*(1-h*.85);r.push(h*e,u,0,h*e,-u,0)}for(let c=0;c<s;c++){let h=c*2;o.push(h,h+1,h+2,h+1,h+3,h+2)}n.setAttribute("position",new Jt(r,3)),n.setIndex(o),n.computeVertexNormals();let a=we(new Je({color:i,side:Fe}));a.onBeforeCompile=c=>{c.uniforms.uTime=t.uTime,c.vertexShader=`uniform float uTime;
`+c.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        transformed.z += sin(position.x * 5.0 - uTime * 4.5) * 0.12 * position.x;`)},a.customProgramCacheKey=()=>"flag-wave";let l=new zt(n,a);return l.castShadow=!0,l}function Hd(){let i=ey(),t=new Rn,e=new ei(t,new ue,"core"),n=e.withLayer("shell");sy(e,i),gh.forEach(([f,p],v)=>iy(e,i,f,p,v%2===0?i.roofBlue:i.roofSlate)),ry(e,i),oy(e,n,i),ay(e,i),ly(e,n,i),cy(e,n,i),hy(e,n,i),uy(e,n,i),dy(e,i);let s=kd(e,i),r=new Ft;r.name="castle";let o=t.build("castle-batch");r.add(o),r.add(s.group);let a=o.userData.layers.get("shell"),l={uTime:{value:0}},c=[...gh.map(([f,p],v)=>[f,1.2+15.25,p,v%2===0?Y.gold:Y.crimson]),[hn.x,1.2+hn.h+6.75,hn.z,Y.royal]];for(let[f,p,v,g]of c){let m=fy(g,l,.9);m.position.set(f+.03,p-.28,v),m.rotation.y=-.6,r.add(m)}let h=new Bs;for(let f=0;f<10;f++){let p=f/10*Math.PI*2+Math.PI/2,v=f%2===0?.55:.24;f===0?h.moveTo(Math.cos(p)*v,Math.sin(p)*v):h.lineTo(Math.cos(p)*v,Math.sin(p)*v)}let u=new Je({color:Y.gold,emissive:"#ffcf5a",emissiveIntensity:.3});u.userData.outlineParameters={thickness:.003,color:[.4,.3,.15],alpha:.8};let d=new zt(new Ur(h,{depth:.12,bevelEnabled:!0,bevelSize:.03,bevelThickness:.03,bevelSegments:1}).center(),u);return d.position.set(hn.x,1.2+hn.h+7.4,hn.z),r.add(d),{group:r,shell:a,materials:i,anchors:s.anchors,smokeSources:[new I(ze.x0+.6,1.2+7.1,(ze.z0+ze.z1)/2),new I((qe.x0+qe.x1)/2,1.2+8.5,qe.z1-.5)],update(f,p){l.uTime.value=f,d.rotation.y=f*.6,d.position.y=1.2+hn.h+7.4+Math.sin(f*1.2)*.08,u.emissiveIntensity=.25+p*1.1,i.window.emissiveIntensity=p*1.15,i.window.color.set(p>.5?Y.windowNight:Y.windowDay),i.stained.emissiveIntensity=p*.9,s.update(f,p)}}}var so={x:0,z:0,r:14,h:1.2},ro={x:17,z:-15,sigma:4.6,h:12.5},le={x:-19,z:9,r:6.2,level:-.28},be={x0:-21,x1:-12.5,z0:-20,z1:-12.5},mn={x:17,z:15,r:7.2},yh={x:-3,z:22},Se={x:-16,z:21,h:1.6},oo={x:-24.5,z:-8.5},Ml=[{x:25,z:-5,h:2.6,r:2.7,active:!0},{x:26.5,z:1.5,h:2,r:2.2,active:!0},{x:24,z:7,h:1.4,r:1.9,active:!1}],py=[[[0,9.5],[.5,14],[-1.5,18.5],[-3,22]],[[-3,22],[-8,22.8],[-13,21.8]],[[-3,22],[4,21.5],[10,18.5],[13.5,16]],[[0,9.5],[-6,12.3],[-11,12],[-13.2,8.5]],[[-9.5,-5.5],[-14,-7.5],[-18.5,-8.2],[-22.6,-8.6]],[[5.5,-9.6],[9,-12.2],[12.5,-13]]],rn={x0:-24.5,z0:10.5,dirX:-.96,dirZ:.28,width:1.5};function Fi(i){return 34+2.2*Math.sin(3*i+.6)+1.4*Math.sin(5*i+2.1)+.8*Math.sin(9*i)}function Sl(i,t){return Math.hypot(i,t)/Fi(Math.atan2(t,i))}function Pn(i,t,e=1){return Math.hypot(i,t)<Fi(Math.atan2(t,i))-e}function js(i,t,e){let n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}function El(i,t){return Math.sin(i*.31+Math.sin(t*.23)*1.7)*.5+Math.sin(t*.27+Math.sin(i*.19)*1.3)*.5}function Gd(i,t,e,n,s,r){let o=s-e,a=r-n,l=Math.max(0,Math.min(1,((i-e)*o+(t-n)*a)/(o*o+a*a)));return Math.hypot(i-(e+o*l),t-(n+a*l))}function Oi(i,t){let e=1/0;for(let n of py)for(let s=0;s<n.length-1;s++){let[r,o]=n[s],[a,l]=n[s+1];e=Math.min(e,Gd(i,t,r,o,a,l))}return e}function ao(i,t){let{x0:e,z0:n,dirX:s,dirZ:r}=rn;return Gd(i,t,e+3,n-1,e+s*14,n+r*14)}function ls(i,t){return i>be.x0&&i<be.x1&&t>be.z0&&t<be.z1}function Qs(i,t){return 1-js(mn.r-1.5,mn.r+1.2,Math.hypot(i-mn.x,t-mn.z)+El(i*2,t*2)*.8)}function cs(i,t){return Math.hypot(i-le.x,t-le.z)}function Bi(i,t){let e=i-ro.x,n=t-ro.z,s=e*e+n*n,r=Math.atan2(n,e),o=.82+.18*Math.sin(r*5+.7)+.06*Math.sin(r*11);return ro.h*Math.exp(-s/(2*ro.sigma*ro.sigma))*o}function Qt(i,t){let e=Sl(i,t),n=.35*El(i*.6,t*.6)+.25*Math.sin(i*.07+t*.11),s=Math.hypot(i-so.x,t-so.z);n+=(so.h-n)*(1-js(so.r-2,so.r+3,s));let r=Math.hypot(i-Se.x,t-Se.z);n+=Se.h*(1-js(1,5,r)),n+=Bi(i,t);let o=Qs(i,t);n+=o*(.45*Math.sin(i*.9+t*.35)+.3);let a=cs(i,t);n-=1.6*(1-js(le.r-2.5,le.r+.8,a));let l=ao(i,t);if(l<rn.width+1){let h=1-js(rn.width*.5,rn.width+1,l);n=n*(1-h)+-.75*h}let c=Oi(i,t);return c<1.2&&(n-=.06*(1-c/1.2)),n-=js(.86,1,e)*.9,n}function Vd(i,t){return{wheat:ls(i,t),desert:Qs(i,t),road:Oi(i,t),lake:cs(i,t),mountain:Bi(i,t),stream:ao(i,t),rim:Sl(i,t)}}function ht(i,t,e,n,s,r=0,o=0,a=0){let l=new zt(i,t);return l.scale.set(e,n,s),l.position.set(r,o,a),l.castShadow=!0,l}var ni=.86;function Hn(i){let t=new Ft,e=F(i.skin??Y.skin),n=F(i.coat),s=null,r=null;if(!i.robe){let f=F(i.legs??Y.woodDark),p=v=>{let g=new Ft;return g.position.set(v,.34,0),g.add(ht(q.cyl(1,8),f,.075,.34,.075,0,-.34,0)),g.add(ht(q.sphere(8,6),f,.085,.06,.12,0,-.32,.03)),t.add(g),g};s=p(-.09),r=p(.09)}let o=i.robe?ht(q.cyl(.42,14),n,i.robeRadius??.36,ni,i.robeRadius??.36):ht(q.cyl(.66,14),n,.26,ni-.3,.26,0,.3,0);t.add(o);let a=f=>{let p=new Ft;return p.position.set(f,ni-.06,0),p.add(ht(q.cyl(.8,8),n,.06,.4,.06,0,-.4,0)),p.add(ht(q.sphere(8,6),e,.06,.06,.06,0,-.43,0)),t.add(p),p},l=a(-.2),c=a(.2),h=new Ft;h.position.set(0,ni+.24,0),h.add(ht(q.sphere(16,12),e,.26,.25,.25));let u=F(Y.ink,{outline:!1});h.add(ht(q.sphere(6,5),u,.025,.035,.02,-.085,.02,.235)),h.add(ht(q.sphere(6,5),u,.025,.035,.02,.085,.02,.235));let d=F("#f2a9a0",{outline:!1});return h.add(ht(q.sphere(6,5),d,.05,.03,.02,-.15,-.06,.2)),h.add(ht(q.sphere(6,5),d,.05,.03,.02,.15,-.06,.2)),h.add(ht(q.sphere(6,5),e,.035,.03,.03,0,-.02,.255)),t.add(h),{group:t,head:h,body:o,armL:l,armR:c,legL:s,legR:r}}function Sn(i,t){i.position.copy(t.position),i.rotation.y=t.rotation}function tr(i,t,e){return{position:new I(i,Qt(i,t)-.02,t),rotation:e}}function my(){let i=Hn({coat:Y.princeGreen,legs:"#5d8a5c"});i.body.scale.set(.28,ni-.12,.28),i.body.position.y=.12;let t=F(Y.gold);i.head.add(ht(q.sphere(14,10),t,.27,.2,.27,0,.08,-.03));for(let a=0;a<9;a++){let l=a/9*Math.PI*2,c=ht(q.cone(6),t,.07,.2,.07,Math.cos(l)*.17,.14,Math.sin(l)*.17-.03);c.rotation.set(Math.sin(l)*.9,0,-Math.cos(l)*.9),i.head.add(c)}let e=F("#f5c94f",{side:Fe}),n=ht(q.torus(.35,16),e,.19,.19,.19,0,ni-.02,0);n.rotation.x=Math.PI/2,i.group.add(n);let s=new Ft;s.position.set(.05,ni-.02,-.15);let r=ht(q.box(),e,.12,.03,.55,0,0,-.27),o=ht(q.box(),e,.1,.03,.45,.12,-.02,-.25);s.add(r,o),i.group.add(s);for(let a of[-.22,.22])i.group.add(ht(q.sphere(8,6),t,.06,.03,.06,a,ni-.02,0));return Sn(i.group,tr(Se.x-.5,Se.z+.4,-Math.PI/2-.4)),{id:"prince",group:i.group,update(a){s.rotation.y=.5+Math.sin(a*2.2)*.35,s.rotation.x=-.25+Math.sin(a*3.1)*.12,o.rotation.y=Math.sin(a*2.7+1)*.3,i.head.rotation.y=Math.sin(a*.4)*.35,i.head.rotation.x=-.12,i.armR.rotation.z=.15+Math.max(0,Math.sin(a*.5))*.5,i.armR.rotation.x=-Math.max(0,Math.sin(a*.5))*1.6,i.armL.rotation.z=-.12}}}function gy(){let i=new Ft,t=F(Y.leafDeep);i.add(ht(q.cyl(1,6),t,.02,.42,.02));let e=ht(q.sphere(8,6),F(Y.leaf),.08,.02,.04,.06,.18,0);e.rotation.z=.5,i.add(e);let n=F("#d9534f"),s=new Ft;s.position.y=.45;for(let a=0;a<5;a++){let l=a/5*Math.PI*2,c=ht(q.sphere(8,6),n,.06,.08,.04,Math.cos(l)*.04,0,Math.sin(l)*.04);c.rotation.y=-l,c.rotation.z=.35,s.add(c)}s.add(ht(q.sphere(8,6),F("#c0413d"),.05,.07,.05,0,.02,0)),i.add(s);let r=we(new Je({color:"#e6f4f8",transparent:!0,opacity:.28,depthWrite:!1})),o=new zt(new cn(.3,20,12,0,Math.PI*2,0,Math.PI/2),r);return o.scale.set(1,2.1,1),i.add(o),i.add(ht(q.cyl(1,16),F(Y.wood),.33,.04,.33)),i.add(ht(q.sphere(8,6),F("#e6f4f8"),.04,.04,.04,0,.64,0)),Sn(i,tr(Se.x+.6,Se.z-.4,0)),{id:"rose",group:i,update(a){s.rotation.z=Math.sin(a*1.3)*.06}}}function _y(){let i=new Ft,t=F("#e08a4a"),e=F(Y.white),n=F("#4a3a2f");i.add(ht(q.sphere(12,10),t,.2,.22,.3,0,.3,0)),i.add(ht(q.sphere(10,8),e,.13,.14,.1,0,.32,.2));for(let[l,c]of[[-.09,.15],[.09,.15],[-.09,-.15],[.09,-.15]])i.add(ht(q.cyl(1,6),n,.035,.2,.035,l,0,c));let s=new Ft;s.position.set(0,.55,.25),s.add(ht(q.sphere(12,10),t,.15,.14,.15));let r=ht(q.cone(8),e,.07,.16,.07,0,-.02,.12);r.rotation.x=Math.PI/2,s.add(r),s.add(ht(q.sphere(6,5),n,.025,.025,.025,0,-.02,.29));for(let l of[-.08,.08]){let c=ht(q.cone(5),t,.05,.14,.04,l,.1,-.02);c.rotation.z=-l*2,s.add(c),s.add(ht(q.sphere(6,5),n,.018,.024,.015,l*.75,.03,.135))}i.add(s);let o=new Ft;o.position.set(0,.3,-.27);let a=ht(q.sphere(10,8),t,.09,.09,.26,0,.08,-.22);return a.rotation.x=-.6,o.add(a),o.add(ht(q.sphere(8,6),e,.065,.065,.08,0,.22,-.42)),i.add(o),Sn(i,tr(-16.4,-11.2,.5)),{id:"fox",group:i,update(l){o.rotation.y=Math.sin(l*2.4)*.45,s.rotation.y=Math.sin(l*.6)*.5,s.rotation.z=Math.sin(l*.9)*.12}}}function xy(i){let t=Hn({coat:Y.crimson,robe:!0,robeRadius:.52}),e=F(Y.white),n=ht(q.torus(.3,18),e,.5,.5,.5,0,.04,0);n.rotation.x=Math.PI/2,t.group.add(n);let s=ht(q.torus(.45,16),e,.2,.2,.2,0,ni-.03,0);s.rotation.x=Math.PI/2,t.group.add(s);for(let l=0;l<10;l++){let c=l/10*Math.PI*2;t.group.add(ht(q.sphere(5,4),F(Y.ink,{outline:!1}),.02,.03,.02,Math.cos(c)*.52,.06,Math.sin(c)*.52))}let r=F(Y.gold);t.head.add(ht(q.cyl(1,12),r,.15,.1,.15,0,.18,-.01));for(let l=0;l<6;l++){let c=l/6*Math.PI*2;t.head.add(ht(q.cone(4),r,.035,.09,.035,Math.cos(c)*.14,.28,Math.sin(c)*.14))}let o=ht(q.cone(10),e,.17,.32,.12,0,-.08,.13);o.rotation.x=Math.PI,t.head.add(o),t.head.add(ht(q.sphere(8,6),e,.12,.035,.05,0,-.07,.24));let a=new Ft;return a.add(ht(q.cyl(1,6),r,.025,.6,.025,0,-.5,0)),a.add(ht(q.sphere(8,6),r,.06,.06,.06,0,.12,0)),a.position.set(0,-.42,.04),t.armR.add(a),Sn(t.group,i),t.group.position.y-=.42,t.group.scale.setScalar(1.05),{id:"king",group:t.group,update(l){t.armR.rotation.x=-.9+Math.sin(l*.8)*.25,t.armL.rotation.x=-.5,t.armL.rotation.z=-.3+Math.sin(l*.7)*.15,t.head.rotation.y=Math.sin(l*.3)*.3,t.head.rotation.x=-.08}}}function yy(i){let t=Hn({coat:"#e7a9a2",robe:!0,robeRadius:.38}),e=F("#8a5a3c");t.head.add(ht(q.sphere(14,10),e,.27,.24,.27,0,.05,-.04)),t.head.add(ht(q.box(),e,.4,.42,.12,0,-.38,-.16));let n=ht(q.torus(.2,14),F(Y.gold),.15,.15,.15,0,.2,0);n.rotation.x=Math.PI/2-.3,t.head.add(n);let s=ht(q.box(),F(Y.royal),.26,.04,.2,0,-.44,.12);return t.armR.add(s),Sn(t.group,i),t.group.scale.setScalar(.92),{id:"princess",group:t.group,update(r){t.armR.rotation.x=-1.1,t.armL.rotation.x=-1+Math.sin(r*.9)*.15,t.head.rotation.x=.35+Math.sin(r*.5)*.05,t.head.rotation.z=Math.sin(r*.4)*.08}}}function vy(i){let t=Hn({coat:"#7b6a8f",robe:!0,robeRadius:.4}),e=F(Y.white),n=ht(q.cone(10),e,.2,.5,.14,0,-.08,.12);n.rotation.x=Math.PI,t.head.add(n);for(let o of[-.2,.2])t.head.add(ht(q.sphere(8,6),e,.09,.12,.12,o,.02,-.04));for(let o of[-.09,.09]){let a=ht(q.torus(.2,12),F(Y.gold),.055,.055,.055,o,.02,.25);t.head.add(a)}let s=ht(q.cone(12),F("#4f5d8a"),.24,.5,.24,0,.12,-.02);t.head.add(s);let r=ht(q.box(),F("#c98a4b"),.3,.06,.22,0,-.44,.1);return t.armL.add(r),Sn(t.group,i),{id:"geographer",group:t.group,update(o){let a=Math.sin(o*.35);t.head.rotation.y=a*.7,t.head.rotation.x=-.15-Math.max(0,a)*.25,t.armL.rotation.x=-1,t.armR.rotation.x=-.6+Math.sin(o*1.4)*.3,t.armR.rotation.z=.2}}}function by(){let i=Hn({coat:"#9aa2b0",legs:"#7d8492"}),t=F("#b9c0cb");i.head.add(ht(q.sphere(14,10),t,.285,.29,.285,0,.03,0)),i.head.add(ht(q.box(),F("#3f3a3a",{outline:!1}),.3,.035,.05,0,.02,.27)),i.head.add(ht(q.sphere(10,8),F(Y.crimson),.07,.16,.2,0,.36,-.04));let e=ht(q.box(),F(Y.royal),.3,.45,.04,0,.36,.2);i.group.add(e),i.group.add(ht(q.box(),F(Y.gold),.1,.1,.045,0,.6,.205));let n=new Ft,s=ht(new Ie(1,1,1,14),F(Y.royal),.22,.04,.22);s.rotation.z=Math.PI/2,n.add(s);let r=ht(q.box(),F(Y.gold),.045,.2,.08);n.add(r),n.position.set(-.06,-.3,.05),i.armL.add(n);let o=new Ft;o.add(ht(q.cyl(1,6),F(Y.wood),.025,2,.025,0,-.8,0)),o.add(ht(q.cone(6),t,.06,.24,.06,0,1.2,0)),o.position.set(0,-.42,.05),i.armR.add(o);let a={x:8.88,zMin:-5.6,zMax:5.6};return i.group.position.set(a.x,bl,0),{id:"knight",group:i.group,update(l){let c=a.zMax-a.zMin,h=l*.55%(c*2),u=h<c,d=u?a.zMin+h:a.zMax-(h-c);i.group.position.z=d,i.group.rotation.y=u?0:Math.PI;let f=Math.sin(l*6);i.legL.rotation.x=f*.5,i.legR.rotation.x=-f*.5,i.armL.rotation.x=-.6,i.armR.rotation.x=-.25-f*.08,i.group.position.y=bl+Math.abs(Math.sin(l*6))*.03}}}function My(i){let t=Hn({coat:"#f3ece0",legs:"#6d6a72"}),e=F(Y.white);t.head.add(ht(q.cyl(1,12),e,.18,.18,.18,0,.15,0)),t.head.add(ht(q.sphere(12,8),e,.25,.14,.25,0,.38,0)),t.group.add(ht(q.box(),F("#e8cfa0"),.34,.4,.05,0,.32,.2));let n=new Ft;return n.add(ht(q.cyl(1,6),F(Y.woodDark),.02,.6,.02,0,-.6,0)),n.position.set(0,-.42,.05),t.armR.add(n),Sn(t.group,i),{id:"cook",group:t.group,update(s){t.armR.rotation.x=-1+Math.sin(s*3)*.2,t.armR.rotation.z=Math.cos(s*3)*.25,t.armL.rotation.x=-.3,t.head.rotation.x=.2,t.head.rotation.y=Math.sin(s*.8)*.2}}}function Sy(i){let t=Hn({coat:"#8a6a5a",legs:"#4a3a33"});t.group.add(ht(q.box(),F("#5b4030"),.36,.55,.05,0,.26,.21));let e=ht(q.sphere(10,8),F("#5b3d2b"),.18,.13,.12,0,-.12,.14);t.head.add(e);let n=new Ft;return n.add(ht(q.cyl(1,6),F(Y.wood),.025,.4,.025,0,-.32,.05)),n.add(ht(q.box(),F("#6d6f78"),.2,.1,.1,0,-.35,.05)),n.rotation.x=Math.PI/2,n.position.set(0,-.42,0),t.armR.add(n),Sn(t.group,i),{id:"smith",group:t.group,update(s){let r=Math.pow(Math.abs(Math.sin(s*2.6)),.6);t.armR.rotation.x=-.6-r*1.6,t.armL.rotation.x=-.8,t.head.rotation.x=.3}}}function Ey(i){let t=Hn({coat:"#8a6e55",robe:!0,robeRadius:.36});t.head.add(ht(q.sphere(14,10),F("#7a604a"),.3,.3,.3,0,.02,-.06));let e=ht(q.torus(.12,14),F(Y.cream),.22,.22,.22,0,.5,0);return e.rotation.x=Math.PI/2,t.group.add(e),Sn(t.group,i),{id:"monk",group:t.group,update(n){let s=(Math.sin(n*.5)+1)/2;t.head.rotation.x=.1+s*.35,t.armL.rotation.x=-1.1,t.armR.rotation.x=-1.1,t.armL.rotation.z=.45,t.armR.rotation.z=-.45}}}function Ty(){let i=Hn({coat:"#4f6a8f",legs:"#3d4a5f"}),t=F("#3d4a5f");i.head.add(ht(q.cyl(1,12),t,.24,.1,.24,0,.13,0)),i.head.add(ht(q.box(),t,.2,.025,.14,0,.13,.22)),i.head.add(ht(q.sphere(8,6),F("#5b3d2b"),.13,.04,.05,0,-.08,.23));let e=new Ft;e.add(ht(q.cyl(1,6),F(Y.wood),.018,1.5,.018,0,-.3,0));let n=ht(q.cone(6),we(new Ze({color:"#ffc46b"})),.03,.08,.03,0,1.2,0);e.add(n),e.position.set(0,-.42,.05),i.armR.add(e);let s=new Ft,r=F("#4a4a52");s.add(ht(q.cyl(.7,6),r,.05,1.9,.05)),s.add(ht(q.box(),r,.4,.04,.04,.18,1.88,0));let o=new Ze({color:"#6c7188"});we(o);let a=ht(q.box(),o,.22,.3,.22,.34,1.5,0);s.add(a),s.add(ht(q.cone(4),r,.2,.18,.2,.34,1.8,0));let l=new Qi("#ffc77a",0,6,2);l.position.set(.34,1.65,0),s.add(l),s.position.set(-.75,0,-.05);let c=new Ft;return c.add(i.group,s),c.position.set(-6.2,bl,8.95),c.rotation.y=Math.PI,{id:"lamplighter",group:c,update(h,u){let f=h%6/6,p=f<.5,v=Math.max(0,1-Math.abs(f-.5)*8)+Math.max(0,1-Math.min(f,1-f)*8);i.armR.rotation.x=-.4-v*1.7,i.armR.rotation.z=v*.6,i.head.rotation.y=-v*.6,i.head.rotation.x=-v*.4,o.color.set(p?"#ffd88a":"#6c7188"),l.intensity=p?2.5+u*4:0}}}function wy(){let i=Hn({coat:"#9a6f4c",legs:"#6b5a48"}),t=F("#7a5236");i.head.add(ht(q.sphere(14,10),t,.27,.22,.27,0,.07,-.02));for(let s of[-.08,.08]){let r=ht(q.cyl(1,10),F("#a6c4cf"),.06,.04,.06,s,.15,.22);r.rotation.x=Math.PI/2-.3,i.head.add(r)}let e=ht(q.box(),F(Y.cream),.12,.03,.6,.1,ni-.05,-.32);e.rotation.x=-.4,i.group.add(e);let n=ht(q.box(),F(Y.white),.26,.02,.2,0,-.44,.1);return i.armL.add(n),Sn(i.group,tr(mn.x-2.2,mn.z-1.4,.9)),{id:"aviator",group:i.group,update(s){i.armL.rotation.x=-1.2,i.armR.rotation.x=-1+Math.sin(s*4)*.12,i.armR.rotation.z=Math.sin(s*2)*.15,i.head.rotation.x=.35,e.rotation.y=Math.sin(s*2.5)*.3}}}function vh(i,t,e,n,s,r,o){let a=Hn({coat:t});return a.head.add(ht(q.cyl(1,12),F(e),.38,.03,.38,0,.12,0)),a.head.add(ht(q.sphere(10,8),F(e),.2,.15,.2,0,.16,0)),Sn(a.group,tr(n,s,r)),{id:i,group:a.group,update(l){let c=Math.sin(l*2+o);a.armR.rotation.x=-.4-Math.max(0,c)*.8,a.armR.rotation.z=Math.max(0,c)*.3,a.head.rotation.z=Math.sin(l*1.2+o)*.12,a.armL.rotation.x=-.15}}}function Tl(i,t,e,n){let s=new Ft,r=F(Y.white),o=F("#5a4a42");for(let l=0;l<7;l++){let c=l/7*Math.PI*2;s.add(ht(q.ico(1),r,.17,.17,.17,Math.cos(c)*.12,.42+Math.sin(l*1.7)*.05,Math.sin(c)*.18))}s.add(ht(q.ico(1),r,.24,.22,.3,0,.42,0));for(let[l,c]of[[-.1,.15],[.1,.15],[-.1,-.15],[.1,-.15]])s.add(ht(q.cyl(1,6),o,.03,.26,.03,l,0,c));let a=new Ft;a.position.set(0,.5,.3),a.add(ht(q.sphere(10,8),o,.1,.12,.13)),a.add(ht(q.ico(1),r,.1,.06,.1,0,.1,-.02));for(let l of[-.1,.1])a.add(ht(q.sphere(6,5),o,.06,.025,.035,l,.03,-.02));return s.add(a),Sn(s,tr(i,t,e)),{id:"sheep",group:s,update(l){let c=(Math.sin(l*.7+n)+1)/2;a.rotation.x=c*.9,a.position.y=.5-c*.12}}}function Ay(i){let t=new Ft,e=F("#f0a65e");t.add(ht(q.sphere(12,8),e,.18,.1,.13,0,.08,0)),t.add(ht(q.sphere(10,8),e,.09,.08,.09,.17,.1,.03));for(let s of[-.02,.07]){let r=ht(q.cone(4),e,.03,.06,.03,.19,.17,s);t.add(r)}let n=ht(q.torus(.2,12),e,.12,.12,.12,-.1,.05,.05);return n.rotation.x=Math.PI/2,t.add(n),Sn(t,i),{id:"cat",group:t,update(s){let r=1+Math.sin(s*2)*.05;t.scale.set(1,r,1)}}}function Wd(i){let t=[my(),gy(),_y(),xy(i.king),yy(i.princess),vy(i.geographer),by(),My(i.cook),Sy(i.smith),Ey(i.monk),Ty(),wy(),vh("villager-a","#c98272","#e8c66a",-2.4,21.2,2.4,0),vh("villager-b","#6f9b6c","#d9c08f",-3.4,20.3,-.6,1.7),vh("merchant","#e8dcc6","#f3ece0",-.25,22.35,-.2,3),Tl(-8.8,16.6,.4,0),Tl(-7.2,17.8,2.2,1.3),Tl(-10.3,18.4,-1.1,2.6),Tl(-9.4,19.9,1.4,3.8),Ay(i.cat)],e=new Ft;return e.name="characters",t.forEach(n=>e.add(n.group)),{group:e,list:t,update(n,s){t.forEach(r=>r.update(n,s))}}}var wl=[{hour:0,top:"#16234a",horizon:"#34497a",bottom:"#1d2846",light:"#a9bde6",lightIntensity:.7,hemiSky:"#5a6ea6",hemiGround:"#343a55",hemiIntensity:1.3,night:1},{hour:5,top:"#25386a",horizon:"#c99ba0",bottom:"#4b5680",light:"#f3b9a0",lightIntensity:.6,hemiSky:"#8d93b8",hemiGround:"#4a4a5a",hemiIntensity:1.15,night:.7},{hour:6.5,top:"#6f97c9",horizon:"#fbd7b4",bottom:"#b7c3d8",light:"#ffd2a8",lightIntensity:1.5,hemiSky:"#cdd8ea",hemiGround:"#b6a084",hemiIntensity:1.45,night:.1},{hour:9,top:"#7fb2e0",horizon:"#f6ead2",bottom:"#cfdce8",light:"#fff2dc",lightIntensity:1.85,hemiSky:"#dbe8f4",hemiGround:"#bfae8c",hemiIntensity:1.55,night:0},{hour:12,top:"#74ace0",horizon:"#eef3f0",bottom:"#d3e2ec",light:"#fffaf0",lightIntensity:2,hemiSky:"#e2eef8",hemiGround:"#c4b494",hemiIntensity:1.6,night:0},{hour:16.5,top:"#7ea8d6",horizon:"#f8e4c6",bottom:"#d6d6dc",light:"#ffe6bf",lightIntensity:1.85,hemiSky:"#dfe6f0",hemiGround:"#c4ab88",hemiIntensity:1.5,night:0},{hour:18.2,top:"#5872a8",horizon:"#f5c29c",bottom:"#c3a2a6",light:"#ffbb88",lightIntensity:1.55,hemiSky:"#cdc0cc",hemiGround:"#a78670",hemiIntensity:1.4,night:.2},{hour:19.6,top:"#2b3c70",horizon:"#c9857c",bottom:"#4d4c74",light:"#d8a8b0",lightIntensity:.7,hemiSky:"#7d7fa8",hemiGround:"#4a4052",hemiIntensity:1.15,night:.7},{hour:24,top:"#16234a",horizon:"#34497a",bottom:"#1d2846",light:"#a9bde6",lightIntensity:.7,hemiSky:"#5a6ea6",hemiGround:"#343a55",hemiIntensity:1.3,night:1}],Xd=new mt,qd=new mt;function er(i,t,e,n){return Xd.set(i),qd.set(t),n.copy(Xd).lerp(qd,e)}function Ry(i,t){let e=(i%24+24)%24,n=0;for(;n<wl.length-2&&wl[n+1].hour<=e;)n++;let s=wl[n],r=wl[n+1],o=(e-s.hour)/(r.hour-s.hour),a=o*o*(3-2*o);return er(s.top,r.top,a,t.top),er(s.horizon,r.horizon,a,t.horizon),er(s.bottom,r.bottom,a,t.bottom),er(s.light,r.light,a,t.light),er(s.hemiSky,r.hemiSky,a,t.hemiSky),er(s.hemiGround,r.hemiGround,a,t.hemiGround),t.lightIntensity=s.lightIntensity+(r.lightIntensity-s.lightIntensity)*a,t.hemiIntensity=s.hemiIntensity+(r.hemiIntensity-s.hemiIntensity)*a,t.night=s.night+(r.night-s.night)*a,t}function Cy(i,t){let e=(i-6)/12*Math.PI,n=Math.sin(e)*1.05;return t.set(Math.cos(e)*Math.cos(n),Math.sin(n),-.38),t.normalize()}var Iy=`
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
  }
`,Py=`
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uBottom;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uMoonDir;
  uniform float uNight;
  varying vec3 vDir;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 col = h > 0.0
      ? mix(uHorizon, uTop, pow(smoothstep(0.0, 0.7, h), 0.75))
      : mix(uHorizon, uBottom, smoothstep(0.0, -0.45, h));
    vec2 uv = vec2(atan(d.z, d.x) * 2.0, h * 6.0);
    float wash = noise(uv * 1.7) * 0.6 + noise(uv * 4.3) * 0.4;
    col *= 0.965 + wash * 0.06;
    float sun = max(dot(d, uSunDir), 0.0);
    float sunUp = smoothstep(-0.12, 0.05, uSunDir.y);
    col += uSunColor * (pow(sun, 6.0) * 0.22 + pow(sun, 48.0) * 0.35) * sunUp;
    col = mix(col, uSunColor * 0.4 + vec3(1.0, 0.96, 0.86) * 0.7, smoothstep(0.9975, 0.9984, sun) * sunUp);
    float moon = dot(d, uMoonDir);
    float shadow = dot(d, normalize(uMoonDir + vec3(0.016, 0.01, 0.0)));
    float disc = smoothstep(0.9989, 0.9992, moon) * (1.0 - smoothstep(0.9989, 0.9992, shadow));
    col += pow(max(moon, 0.0), 300.0) * 0.12 * uNight;
    col = mix(col, vec3(1.0, 0.95, 0.8), disc * uNight);
    gl_FragColor = vec4(col, 1.0);
  }
`;function Ly(){let i={uTop:{value:new mt},uHorizon:{value:new mt},uBottom:{value:new mt},uSunDir:{value:new I(0,1,0)},uSunColor:{value:new mt},uMoonDir:{value:new I(-.4,.55,-.7).normalize()},uNight:{value:0}},t=we(new Ue({uniforms:i,vertexShader:Iy,fragmentShader:Py,side:Ge,depthWrite:!1})),e=new zt(new cn(500,48,24),t);return e.frustumCulled=!1,e.renderOrder=-10,{mesh:e,uniforms:i}}var Dy=`
  attribute float aPhase;
  attribute float aSize;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vAlpha = uOpacity * (0.55 + 0.45 * sin(uTime * 1.8 + aPhase));
    gl_PointSize = aSize * uPixelRatio;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ny=`
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float core = smoothstep(0.5, 0.0, d);
    float rays = max(smoothstep(0.08, 0.0, abs(c.x)), smoothstep(0.08, 0.0, abs(c.y))) * smoothstep(0.5, 0.1, d);
    float a = max(core * core, rays * 0.6) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;function Uy(i){let e=Mn(77),n=new Float32Array(700*3),s=new Float32Array(700),r=new Float32Array(700);for(let h=0;h<700;h++){let u=e()*.95+.02,d=e()*Math.PI*2,f=Math.sqrt(1-u*u),p=e()>.85?-1:1;n.set([Math.cos(d)*f*420,p*u*420,Math.sin(d)*f*420],h*3),s[h]=e()*10,r[h]=e()>.96?9:2+e()*3.5}let o=new _e;o.setAttribute("position",new De(n,3)),o.setAttribute("aPhase",new De(s,1)),o.setAttribute("aSize",new De(r,1));let a={uTime:{value:0},uOpacity:{value:0},uPixelRatio:{value:i},uColor:{value:new mt("#fff4d6")}},l=new Ue({uniforms:a,vertexShader:Dy,fragmentShader:Ny,transparent:!0,depthWrite:!1}),c=new Fs(o,l);return c.frustumCulled=!1,{points:c,uniforms:a}}function Yd(i,t,e,n){let s=[];for(let o=0;o<t;o++){let a=1+i()*1.4,l=new ui(1,2);l.applyMatrix4(Kt((i()-.5)*e,i()*a*.4*n,(i()-.5)*e*.55,0,i()*3,0,a*1.15,a*.8*n,a)),s.push(l)}let r=Ni(s);return s.forEach(o=>o.dispose()),r}function Fy(){let i=Mn(101),t=new Ft,e=we(new Je({color:"#ffffff",transparent:!0,opacity:.96})),n=we(new Je({color:"#f3f1f4",transparent:!0,opacity:.92}));for(let s=0;s<16;s++){let r=i()*Math.PI*2,o=52+i()*45,a=new zt(Yd(i,6+Math.floor(i()*5),7,1),e);a.scale.setScalar(1+i()*1.1),a.position.set(Math.cos(r)*o,-18+i()*16,Math.sin(r)*o),a.rotation.y=i()*Math.PI,t.add(a)}for(let s=0;s<28;s++){let r=i()*Math.PI*2,o=10+i()*95,a=new zt(Yd(i,9,14,.7),n);a.scale.setScalar(2.4+i()*1.6),a.position.set(Math.cos(r)*o,-44-i()*8,Math.sin(r)*o),t.add(a)}return{group:t,materials:[e,n]}}function Oy(){let i=new Ft,t=[],e=F("#f6f1e8"),n=new Jn(.9,.04,.32).translate(.45,0,0);for(let s=0;s<9;s++){let r=Math.ceil(s/2),o=s%2===0?1:-1,a=new Ft;a.position.set(s===0?0:o*r*1.4,Math.sin(s)*.5,-r*1.3);let l=new zt(q.sphere(8,6),e);l.scale.set(.16,.14,.38),a.add(l);let c=new zt(n,e),h=new zt(n,e);h.rotation.y=Math.PI,a.add(c,h),i.add(a),t.push({wingL:c,wingR:h,phase:s*.6})}return{group:i,update(s){let r=s*.06;i.position.set(Math.cos(r)*40,17+Math.sin(s*.3)*2,Math.sin(r)*40),i.rotation.y=-r,t.forEach(o=>{let a=Math.sin(s*6+o.phase)*.6;o.wingL.rotation.z=a,o.wingR.rotation.z=a})}}}var By=`
  attribute float aPhase;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.7 + aPhase) * 0.6;
    p.y += sin(uTime * 1.1 + aPhase * 1.7) * 0.35;
    p.z += cos(uTime * 0.6 + aPhase) * 0.6;
    vAlpha = uOpacity * (0.5 + 0.5 * sin(uTime * 3.0 + aPhase * 3.0));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uPixelRatio * 90.0 / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`,zy=`
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(1.0, 0.86, 0.45, a);
  }
`;function ky(i){let t=Mn(303),e=[],n=[],s=0;for(;e.length<660&&s<5e3;){s++;let l=(t()-.5)*60,c=(t()-.5)*60;!Pn(l,c,2)||Math.hypot(l,c)<12||(e.push(l,Qt(l,c)+.5+t()*2,c),n.push(t()*20))}let r=new _e;r.setAttribute("position",new Jt(e,3)),r.setAttribute("aPhase",new Jt(n,1));let o={uTime:{value:0},uOpacity:{value:0},uPixelRatio:{value:i}};return{points:new Fs(r,new Ue({uniforms:o,vertexShader:By,fragmentShader:zy,transparent:!0,depthWrite:!1,blending:Xr})),uniforms:o}}function Hy(i,t){let e=new Ft,n=q.ico(1),s=[],r=[...i.map(a=>({origin:a,color:"#f4f0ea",life:5,scale:.55,rise:3.2})),...t.map(a=>({origin:a,color:"#cbbfb8",life:6.5,scale:1,rise:4.5}))],o=9;return r.forEach((a,l)=>{for(let c=0;c<o;c++){let h=we(new Je({color:a.color,transparent:!0,opacity:0,depthWrite:!1})),u=new zt(n,h);e.add(u),s.push({mesh:u,material:h,age:c/o*a.life+l*.37,life:a.life,origin:a.origin,scale:a.scale,rise:a.rise})}}),{group:e,update(a){s.forEach(l=>{l.age=(l.age+a)%l.life;let c=l.age/l.life;l.mesh.position.set(l.origin.x+c*1.8,l.origin.y+c*l.rise,l.origin.z-c*1+Math.sin(c*6+l.origin.x)*.2),l.mesh.scale.setScalar(l.scale*(.35+c*1.3)),l.material.opacity=Math.sin(Math.min(1,c*1.2)*Math.PI)*.75})}}}function Gy(){let i=Mn(909),t=[],e=new Ft;return[{a:.6,r:52,y:6,s:1,item:"lamp"},{a:2,r:58,y:-4,s:1.3,item:"house"},{a:3.3,r:50,y:10,s:.9,item:"baobab"},{a:4.4,r:60,y:2,s:1.1,item:"rose"},{a:5.4,r:54,y:-8,s:.8,item:"well"}].forEach((s,r)=>{let o=new Rn,a=new ei(o),l=F(Y.grass),c=F(Y.rockDark);a.cyl(l,2.2,2,.6,0,-.3,0,14),o.add(q.cone(9),c,Kt(0,-.25,0,Math.PI,0,0,2.05,4+i()*2,2.05));for(let u=0;u<4;u++){let d=u/4*Math.PI*2+i();o.add(q.cone(6),c,Kt(Math.cos(d)*1.4,-.4,Math.sin(d)*1.4,Math.PI,0,0,.5,1.5+i()*1.5,.5))}if(s.item==="lamp")a.cyl(F("#4a4a52"),.05,.08,1.8,0,.3,0,6),a.box(F(Y.windowNight,{emissive:"#ffc46b",emissiveIntensity:.6}),.3,.38,.3,0,2.1,0),a.cone(F("#4a4a52"),.28,.25,0,2.48,0,4,Math.PI/4);else if(s.item==="house")a.box(F(Y.cream),1.2,.9,1,0,.3,0),a.cone(F(Y.roofRose),.95,.9,0,1.2,0,4,Math.PI/4),a.box(F("#6a4b38"),.3,.5,.05,0,.3,.51);else if(s.item==="baobab")a.cyl(F(Y.baobab),.35,.55,1.6,0,.3,0,10),a.sphere(F("#7ea56a"),.9,0,2.3,0,1.4,.5,1.4);else if(s.item==="rose"){a.cyl(F(Y.leafDeep),.03,.03,.6,0,.3,0,5),a.sphere(F("#d9534f"),.16,0,1,0);for(let u=0;u<5;u++)a.sphere(F(Y.leaf),.12,Math.cos(u)*.5,.4,Math.sin(u)*.5,1,.5,1)}else a.cyl(F(Y.stoneShade),.4,.45,.5,0,.3,0,12),a.box(F(Y.woodDark),.06,.9,.06,-.35,.6,0),a.box(F(Y.woodDark),.06,.9,.06,.35,.6,0),a.cone(F(Y.roofBlue),.6,.35,0,1.5,0,4,Math.PI/4);let h=o.build(`islet-${r}`);h.scale.setScalar(s.s),h.position.set(Math.cos(s.a)*s.r,s.y,Math.sin(s.a)*s.r),e.add(h),t.push({group:h,base:s.y,phase:r*1.3})}),{group:e,update(s){t.forEach(r=>{r.group.position.y=r.base+Math.sin(s*.5+r.phase)*.6,r.group.rotation.y=s*.03+r.phase})}}}function Zd(i,t,e,n){let s=Ly(),r=Uy(t),o=Fy(),a=Oy(),l=ky(t),c=Hy(e,n),h=Gy(),u=new kr("#ffffff","#888888",1.5),d=new Vr("#ffffff",2);d.castShadow=!0,d.shadow.mapSize.set(2048,2048);let f=d.shadow.camera;f.left=-40,f.right=40,f.top=40,f.bottom=-40,f.near=1,f.far=240,d.shadow.bias=-6e-4,d.shadow.normalBias=.05,d.shadow.intensity=.62,d.target.position.set(0,0,0),i.add(s.mesh,r.points,o.group,a.group,l.points,c.group,h.group,u,d,d.target),i.fog=new vr("#ffffff",110,330);let p={top:new mt,horizon:new mt,bottom:new mt,light:new mt,lightIntensity:1,hemiSky:new mt,hemiGround:new mt,hemiIntensity:1,night:0},v=new I,g=new I,m=new mt,M=new mt("#ffffff");return{state:p,update(w,y,T,E){return Ry(T,p),Cy(T,v),s.mesh.position.copy(E.position),r.points.position.copy(E.position),s.uniforms.uTop.value.copy(p.top),s.uniforms.uHorizon.value.copy(p.horizon),s.uniforms.uBottom.value.copy(p.bottom),s.uniforms.uSunDir.value.copy(v),s.uniforms.uSunColor.value.copy(p.light),s.uniforms.uNight.value=p.night,v.y>-.05?g.copy(v):g.set(-v.x*.6,Math.max(.35,-v.y),-.5).normalize(),g.y=Math.max(g.y,.18),g.normalize(),d.position.copy(g).multiplyScalar(110),d.color.copy(p.light),d.intensity=p.lightIntensity,u.color.copy(p.hemiSky),u.groundColor.copy(p.hemiGround),u.intensity=p.hemiIntensity,i.fog.color.copy(p.horizon),r.uniforms.uTime.value=w,r.uniforms.uOpacity.value=Math.max(0,p.night-.15)*1.15,l.uniforms.uTime.value=w,l.uniforms.uOpacity.value=Math.max(0,p.night-.3)*1.3,m.copy(M).lerp(p.horizon,.35+p.night*.3),o.materials[0].color.copy(m),o.materials[1].color.copy(m).lerp(p.bottom,.25),o.group.rotation.y=w*.004,a.update(w),c.update(y),h.update(w),p.night}}}var Al=60,He=200;function nr(i,t,e){let n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}var Ke={grass:new mt(Y.grass),grassDeep:new mt(Y.grassDeep),meadow:new mt(Y.meadowLight),wheatSoil:new mt("#d9b45e"),sand:new mt(Y.sand),sandWet:new mt("#cdbb8f"),rock:new mt(Y.rock),rockDark:new mt(Y.rockDark),soil:new mt(Y.soil),snow:new mt(Y.snow),road:new mt("#e3cfa4"),paving:new mt("#d8cdb4")};function Jd(i,t,e,n){let s=Vd(i,t),r=El(i*1.3+5,t*1.3);n.copy(Ke.grass),r>.25&&n.lerp(Ke.meadow,Math.min(1,(r-.25)*1.4)),r<-.35&&n.lerp(Ke.grassDeep,Math.min(1,(-.35-r)*1.6)),s.wheat&&n.lerp(Ke.wheatSoil,.85),s.desert>0&&n.lerp(Ke.sand,s.desert),s.mountain>2.2&&n.lerp(Ke.rock,nr(2.2,4.8,s.mountain));let o=8.4+r*.7;return e>o-1&&n.lerp(Ke.snow,nr(o-.6,o+.4,e)),s.lake<le.r+.8&&n.lerp(Ke.sandWet,nr(le.r+.8,le.r-.4,s.lake)),s.stream<rn.width+.4&&n.lerp(Ke.sandWet,nr(rn.width+.4,rn.width*.4,s.stream)),s.road<1.05&&n.lerp(Ke.road,nr(1.05,.55,s.road)),Math.abs(i)<8.9&&Math.abs(t)<8.9&&n.lerp(Ke.paving,.92),s.rim>.9&&n.lerp(Ke.grassDeep,nr(.9,1,s.rim)*.35),n}function Vy(){let i=[],t=[],e=[],n=new mt;i.push(0,Qt(0,0),0),Jd(0,0,Qt(0,0),n),t.push(n.r,n.g,n.b);for(let o=1;o<=Al;o++)for(let a=0;a<He;a++){let l=a/He*Math.PI*2,c=o/Al*Fi(l)*(o===Al?.999:1),h=Math.cos(l)*c,u=Math.sin(l)*c,d=Qt(h,u);i.push(h,d,u),Jd(h,u,d,n),t.push(n.r,n.g,n.b)}for(let o=0;o<He;o++){let a=1+o,l=1+(o+1)%He;e.push(0,l,a)}for(let o=1;o<Al;o++)for(let a=0;a<He;a++){let l=1+(o-1)*He+a,c=1+(o-1)*He+(a+1)%He,h=1+o*He+a,u=1+o*He+(a+1)%He;e.push(l,c,h,c,u,h)}let s=new _e;s.setAttribute("position",new Jt(i,3)),s.setAttribute("color",new Jt(t,3)),s.setIndex(e),s.computeVertexNormals();let r=new zt(s,F("#ffffff",{vertexColors:!0,outlineThickness:.002}));return r.receiveShadow=!0,r.castShadow=!0,r.name="island-top",r}function Wy(){let t=[],e=[],n=[],s=new mt;for(let a=0;a<=16;a++)for(let l=0;l<He;l++){let c=l/He*Math.PI*2,h=Fi(c)*.999,u=Math.cos(c)*h,d=Math.sin(c)*h,f=Qt(u,d),p,v;if(a===0)p=h,v=f;else if(a===1)p=h+.55,v=f-.7;else{let g=(a-1)/15,m=1+.09*Math.sin(c*7+a)+.06*Math.sin(c*13-a*2);p=h*Math.pow(1-g,.8)*m;let M=26+3.5*Math.sin(c*2+1)+2*Math.sin(c*5);v=f-.7-Math.pow(g,1.15)*M}if(t.push(Math.cos(c)*p,v,Math.sin(c)*p),a<=1)s.copy(Ke.grassDeep);else if(a===2)s.copy(Ke.soil);else{let g=Math.sin(v*.9+Math.sin(c*3)*1.2);s.copy(g>.35?Ke.rock:g<-.45?Ke.soil:Ke.rockDark),s.lerp(Ke.rockDark,Math.min(1,-v/40))}e.push(s.r,s.g,s.b)}for(let a=0;a<16;a++)for(let l=0;l<He;l++){let c=a*He+l,h=a*He+(l+1)%He,u=(a+1)*He+l,d=(a+1)*He+(l+1)%He;n.push(c,u,h,h,u,d)}let r=new _e;r.setAttribute("position",new Jt(t,3)),r.setAttribute("color",new Jt(e,3)),r.setIndex(n),r.computeVertexNormals();let o=new zt(r,F("#ffffff",{vertexColors:!0,outlineThickness:.0025}));return o.castShadow=!0,o.receiveShadow=!0,o.name="island-underside",o}function Xy(){let i=new Rn,t=Mn(42),e=F(Y.woodDark),n=F(Y.leafDeep),s=F(Y.rockDark);for(let r=0;r<70;r++){let o=t()*Math.PI*2,a=Fi(o)+.25,l=Math.cos(o)*a,c=Math.sin(o)*a,h=Qt(l*.99,c*.99)-.7,u=1.5+t()*4.5,d=.05+t()*.07,f=(t()-.5)*.25;if(i.add(q.cyl(.4,5),t()>.4?e:n,Kt(l,h-u,c,f,0,f,d,u,d)),t()>.55)for(let p=0;p<3;p++)i.add(q.sphere(6,5),n,Kt(l+(t()-.5)*.3,h-t()*u,c+(t()-.5)*.3,0,0,0,.18,.12,.18))}for(let r=0;r<46;r++){let o=t()*Math.PI*2,a=.25+t()*.6,l=Fi(o)*Math.pow(1-a,.8)*.92,c=26+3.5*Math.sin(o*2+1),h=-.7-Math.pow(a,1.15)*c,u=1.5+t()*4*(1-a*.5),d=.5+t()*1.1;i.add(q.cone(7),s,Kt(Math.cos(o)*l,h+.3,Math.sin(o)*l,Math.PI,t()*3,0,d,u,d))}return i.build("underside-details")}function qy(){let i=new Ft,t=F("#bfe3f0",{emissive:"#8fd0ea",emissiveIntensity:.35,outlineThickness:.002}),e=new Or(1,0),n=Mn(7);for(let s=0;s<18;s++){let r=n()*Math.PI*2,o=.3+n()*.55,a=Fi(r)*Math.pow(1-o,.8)*.9,l=-.7-Math.pow(o,1.15)*26,c=new zt(e,t),h=.35+n()*.6;c.scale.set(h*.6,h*1.6,h*.6),c.position.set(Math.cos(r)*a,l-h,Math.sin(r)*a),c.rotation.set(n()*.4,n()*3,n()*.4),i.add(c)}return{group:i,material:t}}function Yy(){let i=rn.x0,t=rn.z0;for(let e=0;e<200&&!(Sl(i,t)>=.995);e++)i+=rn.dirX*.1,t+=rn.dirZ*.1;return new I(i,Qt(i,t),t)}var Zy=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Jy=`
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uFoam;
  varying vec2 vUv;
  void main() {
    float streak = sin(vUv.x * 21.0 + sin(vUv.x * 7.0) * 2.0) * 0.5 + 0.5;
    float flow = fract(vUv.y * 7.0 - uTime * 1.3 + streak * 0.4);
    float band = smoothstep(0.0, 0.2, flow) * smoothstep(0.75, 0.35, flow);
    vec3 col = mix(uColor, uFoam, band * 0.55 + smoothstep(0.65, 1.0, streak) * 0.3);
    float edge = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
    float fade = 1.0 - smoothstep(0.45, 1.0, vUv.y);
    gl_FragColor = vec4(col, 0.88 * edge * fade);
  }
`;function Ky(){let i=new Ft,t=we(new Je({color:Y.water,transparent:!0,opacity:.86})),e=new zt(new Ji(le.r+.7,64),t);e.rotation.x=-Math.PI/2,e.position.set(le.x,le.level,le.z),e.receiveShadow=!0,i.add(e);let n=Yy(),s=le.x-le.r*.8,r=le.z+.6,o=Math.hypot(n.x-s,n.z-r),a=new zt(new $i(o+.6,rn.width*1.25),t);a.rotation.x=-Math.PI/2,a.rotation.z=-Math.atan2(n.z-r,n.x-s),a.position.set((s+n.x)/2,le.level-.12,(r+n.z)/2),i.add(a);let l=[],c=we(new Ze({color:Y.white,transparent:!0,opacity:.5}));for(let b=0;b<3;b++){let A=new zt(new Br(.92,1,40),c.clone());A.rotation.x=-Math.PI/2,A.position.set(le.x+(b-1)*1.8,le.level+.02,le.z+b%2*1.5-.5),A.userData.phase=b/3,l.push(A),i.add(A)}let h=F(Y.leaf,{outlineThickness:.002}),u=Mn(19);for(let b=0;b<9;b++){let A=u()*Math.PI*2,L=2+u()*(le.r-2.6),B=new zt(new Ie(.42,.42,.05,10,1,!1,.3,Math.PI*1.8),h);if(B.position.set(le.x+Math.cos(A)*L,le.level+.03,le.z+Math.sin(A)*L),B.rotation.y=u()*Math.PI,i.add(B),b%3===0){let k=new zt(new cn(.14,8,6),F("#f6c6cf"));k.position.copy(B.position).add(new I(.1,.1,0)),i.add(k)}}let d=new I(rn.dirX,0,rn.dirZ).normalize(),f=new I(-d.z,0,d.x),p=30,v=48,g=rn.width*1.25,m=[],M=[],w=[];for(let b=0;b<=v;b++){let A=b/v,L=A*p,B=.35+Math.sqrt(L)*.75,k=g/2+L*.05;for(let N=0;N<=1;N++){let H=N===0?-k:k;m.push(n.x+d.x*B+f.x*H,le.level-.15-L,n.z+d.z*B+f.z*H),M.push(N,A)}}for(let b=0;b<v;b++){let A=b*2;w.push(A,A+2,A+1,A+1,A+2,A+3)}let y=new _e;y.setAttribute("position",new Jt(m,3)),y.setAttribute("uv",new Jt(M,2)),y.setIndex(w);let T=we(new Ue({uniforms:{uTime:{value:0},uColor:{value:new mt(Y.water)},uFoam:{value:new mt(Y.white)}},vertexShader:Zy,fragmentShader:Jy,transparent:!0,depthWrite:!1,side:Fe})),E=new zt(y,T);E.name="waterfall",i.add(E);let P=we(new Ze({color:Y.white,transparent:!0,opacity:.55,depthWrite:!1})),_=[];for(let b=0;b<9;b++){let A=new zt(q.sphere(10,8),P),L=12+b*2.2,B=.35+Math.sqrt(L)*.75;A.position.set(n.x+d.x*B+f.x*(Math.random()-.5)*2,le.level-L,n.z+d.z*B+f.z*(Math.random()-.5)*2);let k=.9+b*.25;A.scale.setScalar(k),A.userData.base=A.position.y,A.userData.phase=b*.7,_.push(A),i.add(A)}return{group:i,waterfallEdge:n,update(b){T.uniforms.uTime.value=b,l.forEach(A=>{let L=(b*.25+A.userData.phase)%1;A.scale.setScalar(.3+L*2.2),A.material.opacity=.5*(1-L)}),_.forEach(A=>{A.position.y=A.userData.base+Math.sin(b*.6+A.userData.phase)*.4})}}}function Kd(){let i=new Ft;i.name="island",i.add(Vy()),i.add(Wy()),i.add(Xy());let t=qy();i.add(t.group);let e=Ky();return i.add(e.group),{group:i,waterfallEdge:e.waterfallEdge,update(n,s){e.update(n),t.material.emissiveIntensity=.25+s*.9,t.group.children.forEach((r,o)=>{r.rotation.y+=.002*(o%2===0?1:-1)})}}}var $y=[[-26,-3,1.15],[-24.5,4,.9],[9,-27,1.05],[-12,26.5,.45],[-20.5,18.5,.35]];function $d(i,t,e=2.4){if(!Pn(i,t,e)||Math.hypot(i,t)<15.5||Oi(i,t)<1.7||cs(i,t)<le.r+1.4||ao(i,t)<2.2||ls(i-1,t-1)||ls(i+1,t+1)||Qs(i,t)>.05||Math.hypot(i-yh.x,t-yh.z)<7||Math.hypot(i-Se.x,t-Se.z)<4||Math.hypot(i-oo.x,t-oo.z)<3.5)return!1;for(let n of Ml)if(Math.hypot(i-n.x,t-n.z)<n.r+1.5)return!1;return!0}function jy(i,t,e,n,s){let r=Qt(t,e)-.1,o=F(Y.wood),a=[F(Y.leaf),F(Y.leafDeep),F("#9cbf74")],l=a[Math.floor(s()*a.length)];i.cyl(o,.12*n,.2*n,1.6*n,t,r,e,6);let c=q.ico(1);i.batcher.add(c,l,i.base.clone().multiply(Kt(t,r+2.1*n,e,0,s()*3,0,1.05*n,.95*n,1.05*n))),s()>.4&&i.batcher.add(c,l,i.base.clone().multiply(Kt(t+.55*n,r+1.75*n,e+.2*n,0,0,0,.62*n,.56*n,.62*n)))}function Qy(i,t,e,n){let s=Qt(t,e)-.1;i.cyl(F(Y.wood),.1*n,.15*n,1*n,t,s,e,6),i.batcher.add(q.ico(1),F(Y.leafDeep),i.base.clone().multiply(Kt(t,s+2.4*n,e,0,0,0,.62*n,1.75*n,.62*n)))}function tv(i,t,e,n,s){let r=Qt(t,e)-.15,o=F(Y.pine),a=F(Y.snow);i.cyl(F(Y.woodDark),.1*n,.14*n,.7*n,t,r,e,5),i.cone(o,.95*n,1.5*n,t,r+.5*n,e,8),i.cone(o,.75*n,1.3*n,t,r+1.15*n,e,8),i.cone(s?a:o,.52*n,1.1*n,t,r+1.8*n,e,8)}function ev(i,t,e,n,s){let r=Qt(t,e)-.2,o=F(Y.baobab),a=F("#7ea56a");i.cyl(o,.75*n,1.25*n,3.6*n,t,r,e,10),i.sphere(o,1.05*n,t,r+1.2*n,e,1,.9,1);for(let l=0;l<4;l++){let c=l/4*Math.PI*2+.4,h=Math.cos(c),u=Math.sin(c);i.batcher.add(q.cyl(.6,6),o,i.base.clone().multiply(Kt(t+h*.9*n,r+.2,e+u*.9*n,u*1.3,0,-h*1.3,.35*n,1.2*n,.35*n)))}for(let l=0;l<6;l++){let c=l/6*Math.PI*2+s(),h=1.8*n,u=t+Math.cos(c)*h,d=e+Math.sin(c)*h,f=r+3.4*n+s()*.6*n;i.batcher.add(q.cyl(.55,5),o,i.base.clone().multiply(Kt(t,r+3.2*n,e,Math.sin(c)*.95,0,-Math.cos(c)*.95,.22*n,h*1.15,.22*n))),i.sphere(a,1.05*n,u,f+.5*n,d,1.25,.55,1.25)}i.sphere(a,1.4*n,t,r+4.2*n,e,1.35,.55,1.35)}function bh(i,t,e){i.onBeforeCompile=n=>{n.uniforms.uTime=e,n.vertexShader=`uniform float uTime;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec3 swayOrigin = vec3(instanceMatrix[3][0], 0.0, instanceMatrix[3][2]);
        #else
          vec3 swayOrigin = vec3(0.0);
        #endif
        float sway = sin(uTime * 1.7 + swayOrigin.x * 0.42 + swayOrigin.z * 0.31) * ${t.toFixed(3)} * max(position.y, 0.0);
        transformed.x += sway;
        transformed.z += sway * 0.45;`)},i.customProgramCacheKey=()=>`wind-${t}`}function nv(i){let t=new Kn(.035,1,3).translate(0,.5,0),e=new cn(.07,5,4).scale(1,2.6,1).translate(0,1.02,0),n=Ni([t.toNonIndexed(),e.toNonIndexed()]),s=we(F("#ffffff",{outline:!1}).clone());bh(s,.13,i);let r=Mn(5),o=[];for(let c=be.x0+.3;c<be.x1-.3;c+=.32)for(let h=be.z0+.3;h<be.z1-.3;h+=.36){if(Math.floor((c-be.x0)/2.4)%4===3&&Math.abs((c-be.x0)%2.4-1.2)<.45)continue;let u=c+(r()-.5)*.22,d=h+(r()-.5)*.22;if(!Pn(u,d,1.5))continue;let f=.75+r()*.45;o.push(Kt(u,Qt(u,d)-.05,d,(r()-.5)*.2,r()*3,(r()-.5)*.2,f,f,f))}let a=new Zi(n,s,o.length),l=new mt;return o.forEach((c,h)=>{a.setMatrixAt(h,c),l.set(Y.wheat).offsetHSL((r()-.5)*.03,0,(r()-.5)*.08),a.setColorAt(h,l)}),a.receiveShadow=!0,a.name="wheat",a}function iv(i){let t=Mn(11),e=[0,1,2].map(M=>new Kn(.05,.55-M*.08,3).translate(0,(.55-M*.08)/2,0).rotateZ((M-1)*.35).translate((M-1)*.06,0,0).toNonIndexed()),n=Ni(e),s=we(F("#ffffff",{outline:!1}).clone());bh(s,.22,i);let r=[],o=[],a=0;for(;r.length<1400&&a<9e3;){a++;let M=t()*Math.PI*2,w=Math.sqrt(t())*33,y=Math.cos(M)*w,T=Math.sin(M)*w;if(!Pn(y,T,1)||Math.abs(y)<9.4&&Math.abs(T)<9.4||ls(y,T)||Qs(y,T)>.2||Oi(y,T)<.9||cs(y,T)<le.r+.3||ao(y,T)<1.2||Bi(y,T)>4)continue;let E=.7+t()*.7;r.push(Kt(y,Qt(y,T)-.04,T,0,t()*3,0,E,E,E)),o.push(new mt(t()>.5?Y.grassDeep:"#98b873").offsetHSL(0,0,(t()-.5)*.06))}let l=new Zi(n,s,r.length);r.forEach((M,w)=>{l.setMatrixAt(w,M),l.setColorAt(w,o[w])}),l.receiveShadow=!0,l.name="grass";let c=new Ie(.015,.015,.4,3).translate(0,.2,0).toNonIndexed(),h=new ui(.09,0).translate(0,.43,0),u=Ni([c,h]),d=we(F("#ffffff",{outline:!1}).clone());bh(d,.25,i);let f=["#fbf3df","#f6d77a","#f2b6c1","#a9c4ea","#f7f0f6"],p=[],v=[];for(a=0;p.length<700&&a<8e3;){a++;let M=(t()-.5)*60,w=(t()-.5)*60;if(!Pn(M,w,1.5)||Math.hypot(M,w)<14||ls(M,w)||Qs(M,w)>.1||Oi(M,w)<1||cs(M,w)<le.r+.5||Bi(M,w)>3)continue;let y=f[Math.floor(t()*f.length)];for(let T=0;T<6;T++){let E=M+(t()-.5)*2.2,P=w+(t()-.5)*2.2;if(!Pn(E,P,1.2))continue;let _=.8+t()*.5;p.push(Kt(E,Qt(E,P)-.03,P,0,t()*3,0,_,_,_)),v.push(new mt(y))}}let g=40;for(let M=0;M<g;M++){let w=t()*Math.PI*2,y=1.5+t()*3,T=Se.x+Math.cos(w)*y,E=Se.z+Math.sin(w)*y;p.push(Kt(T,Qt(T,E)-.03,E,0,w,0,1,1,1)),v.push(new mt(M%3===0?"#f6d77a":"#fbf3df"))}let m=new Zi(u,d,p.length);return p.forEach((M,w)=>{m.setMatrixAt(w,M),m.setColorAt(w,v[w])}),m.name="flowers",[l,m]}function sv(){let i=new Rn,t=new ei(i),e=Mn(23),n=0;for(let c=0;c<900&&n<70;c++){let h=(e()-.5)*64,u=(e()-.5)*64;!$d(h,u)||Bi(h,u)>1.5||!(Math.hypot(h-1,u+24)<9||Math.hypot(h+27,u+18)<6)&&e()>.35||(e()>.75?Qy(t,h,u,.9+e()*.5):jy(t,h,u,.85+e()*.6,e),n++)}n=0;for(let c=0;c<1400&&n<60;c++){let h=(e()-.5)*64,u=(e()-.5)*64,d=Bi(h,u);if(!Pn(h,u,2.2)||Oi(h,u)<1.4)continue;let f=Math.hypot(h-1,u+24)<9;!(d>.8&&d<8.2)&&!(f&&e()>.5)||Math.hypot(h,u)<15.5||(tv(t,h,u,.8+e()*.6,d>6.6),n++)}for(let[c,h,u]of $y)ev(t,c,h,u*1.6,e);let s=F(Y.rock),r=F(Y.rockDark);for(let c=0;c<70;c++){let h=(e()-.5)*64,u=(e()-.5)*64;if(!Pn(h,u,1.2)||Math.hypot(h,u)<14||Oi(h,u)<1.2||ls(h,u)||cs(h,u)<le.r-.5)continue;let d=Bi(h,u),f=.25+e()*(d>2?.9:.45);t.rock(e()>.5?s:r,f,h,Qt(h,u)+f*.25,u,e()*3)}for(let c=0;c<40;c++){let h=e()*Math.PI*2,u=e()*mn.r*.85,d=mn.x+Math.cos(h)*u,f=mn.z+Math.sin(h)*u;e()>.6&&t.rock(F("#d8b98a"),.2+e()*.5,d,Qt(d,f)+.1,f,e()*3,.55)}let o=F(Y.plank),a=[[be.x0-.4,be.z0-.4],[be.x1+.4,be.z0-.4],[be.x1+.4,be.z1+.4],[be.x0-.4,be.z1+.4]];for(let c=0;c<4;c++){let[h,u]=a[c],[d,f]=a[(c+1)%4],p=Math.hypot(d-h,f-u),v=Math.floor(p/1.6);for(let g=0;g<=v;g++){let m=g/v,M=h+(d-h)*m,w=u+(f-u)*m;if(!Pn(M,w,.8)||c===2&&Math.abs(M-(be.x0+be.x1)/2)<1.2)continue;let y=Qt(M,w);if(t.box(o,.12,.85,.12,M,y-.1,w),g<v){let T=h+(d-h)*((g+1)/v),E=u+(f-u)*((g+1)/v);if(!Pn(T,E,.8)||c===2&&Math.abs((M+T)/2-(be.x0+be.x1)/2)<1.6)continue;let P=Math.atan2(T-M,E-w),_=Qt(T,E),b=Math.hypot(T-M,E-w);t.box(o,.06,.08,b,(M+T)/2,(y+_)/2+.45,(w+E)/2,P),t.box(o,.06,.08,b,(M+T)/2,(y+_)/2+.2,(w+E)/2,P)}}}let l=F("#8fb36f");for(let c=0;c<60;c++){let h=e()*Math.PI*2,u=15+e()*16,d=Math.cos(h)*u,f=Math.sin(h)*u;if(!$d(d,f,1.8))continue;let p=.4+e()*.4;t.batcher.add(q.ico(1),l,Kt(d,Qt(d,f)+p*.3,f,0,e()*3,0,p*1.2,p*.8,p*1.2))}return i.build("vegetation")}function jd(){let i={value:0},t=new Ft;return t.name="vegetation",t.add(sv()),t.add(nv(i)),iv(i).forEach(e=>t.add(e)),{group:t,update(e){i.value=e}}}var rv=[{x:-6.6,z:19.4,rot:.3,w:2.6,d:2,roof:Y.roofRose,chimney:!0},{x:-7.8,z:25.2,rot:-.4,w:2.4,d:2,roof:Y.roofSlate},{x:1.2,z:19,rot:-.5,w:2.2,d:1.8,roof:Y.roofBlue},{x:2.8,z:25.6,rot:-2.6,w:3,d:2.3,roof:"#b9785f",chimney:!0},{x:-3.4,z:26.6,rot:3,w:2.4,d:1.9,roof:Y.roofRose}];function ov(i,t,e){let n=Math.min(Qt(e.x-e.w/2,e.z-e.d/2),Qt(e.x+e.w/2,e.z+e.d/2),Qt(e.x,e.z)),s=i.child(e.x,n,e.z,e.rot),{w:r,d:o}=e,a=1.8;s.box(t.dark,r+.2,.5,o+.2,0,-.4,0),s.box(t.cream,r,a,o,0,0,0);let l=t.woodDark;for(let c of[-1,1])for(let h of[-1,1])s.box(l,.12,a,.12,c*(r/2-.02),0,h*(o/2-.02));s.box(l,r+.04,.1,.1,0,a*.52,o/2),s.box(l,r+.04,.1,.1,0,a*.52,-o/2),s.box(l,r+.04,.12,o+.04,0,a-.1,0);for(let c of[-1,1])s.box(l,.08,1.05,.08,c*r*.3,a*.52,o/2+.01,0,0,c*.6);s.arch(t.door,.55,1.15,.08,0,0,o/2+.02),ke(s,t,-r*.3,.45,o/2+.03,0,.36,.5),ke(s,t,r*.3,.45,o/2+.03,0,.36,.5),ke(s,t,r/2+.02,.6,0,Math.PI/2,.36,.5),s.box(F("#9a6f4c"),.5,.12,.16,-r*.3,.32,o/2+.1);for(let c=0;c<3;c++)s.sphere(F(c%2?"#f2b6c1":"#f6d77a"),.07,-r*.3-.15+c*.15,.48,o/2+.12);return In(s,t.cream,r/2,1.4,o-.02,0,a,0,Math.PI/2),In(s,F(e.roof),r/2+.3,1.7,o+.5,0,a-.2,0,Math.PI/2),e.chimney&&(s.box(t.shade,.4,1.9,.4,r*.28,a,-o*.15),s.box(t.dark,.5,.12,.5,r*.28,a+1.9,-o*.15)),new I(e.x,n,e.z)}function av(i,t){let e=[];rv.forEach(l=>{let c=ov(i,t,l);if(l.chimney){let h=new I(l.w*.28,0,-l.d*.15).applyAxisAngle(new I(0,1,0),l.rot);e.push(new I(c.x+h.x,c.y+4.1,c.z+h.z))}});let n=Qt(-4.6,23);i.cyl(t.dark,.6,.65,.65,-4.6,n,23,14),i.cyl(F(Y.waterDeep),.48,.48,.02,-4.6,n+.6,23,14),i.box(t.woodDark,.1,1.5,.1,-5.2,n+.5,23),i.box(t.woodDark,.1,1.5,.1,-4,n+.5,23),In(i,t.roofRose,.8,.45,.9,-4.6,n+1.95,23,Math.PI/2);let s=Qt(-.4,23),r=i.child(-.4,s,23.2,-.2);r.box(t.wood,1.6,.8,.7,0,0,0);for(let l of[-.75,.75])r.box(t.woodDark,.08,1.9,.08,l,0,.35),r.box(t.woodDark,.08,1.7,.08,l,0,-.35);for(let l=0;l<6;l++)r.box(F(l%2?Y.cream:Y.crimson),.3,.06,1.1,-.75+l*.3+.15,1.85,.05,0,-.25);let o=["#e3893f","#d9534f","#8fb36f","#f6d77a"];for(let l=0;l<12;l++)r.sphere(F(o[l%4]),.08,-.6+l%6*.24,.88,-.15+Math.floor(l/6)*.25);let a=Qt(-1.4,20.4);return i.box(t.wood,.1,1.6,.1,-1.4,a,20.4),i.box(t.plank,.8,.22,.05,-1.1,a+1.3,20.4,.3),i.box(t.plank,.7,.22,.05,-1.7,a+1,20.4,-.6),e}function lv(i,t,e){let{x:n,z:s}=oo,r=Qt(n,s)-.2;i.cyl(t.cream,1,1.45,4.4,n,r,s,14),i.cyl(t.woodDark,1.12,1.12,.14,n,r+2.2,s,14),i.cone(F("#a46a54"),1.35,1.6,n,r+4.35,s,14);let o=Math.atan2(-n,-s),a=new I(Math.sin(o),0,Math.cos(o));i.arch(t.door,.7,1.3,.1,n+a.x*1.42,r,s+a.z*1.42,o),ke(i,t,n+a.x*1.13,r+2.8,s+a.z*1.13,o,.35,.55);let l=new Ft,c=F(Y.plank),h=F(Y.cream,{side:Fe}),u=new zt(q.sphere(10,8),F(Y.woodDark));u.scale.setScalar(.2),l.add(u);for(let d=0;d<4;d++){let f=new Ft;f.rotation.z=d/4*Math.PI*2;let p=new zt(q.box(),c);p.scale.set(.1,2.8,.08),f.add(p);let v=new zt(q.box(),h);v.scale.set(.55,2.2,.02),v.position.set(.3,.55,0),f.add(v),l.add(f)}return l.position.set(n+a.x*1.35,r+3.9,s+a.z*1.35),l.rotation.y=o,e.add(l),l}function cv(i,t){let e=[];return Ml.forEach(n=>{let s=Qt(n.x,n.z)-.3,r=[new at(n.r,0),new at(n.r*.82,n.h*.35),new at(n.r*.45,n.h*.92),new at(n.r*.36,n.h),new at(n.r*.24,n.h*.88),new at(.01,n.h*.82)],o=new Fr(r,18);i.batcher.add(o,F(n.active?"#9c7a68":"#8f9a78"),Kt(n.x,s,n.z));for(let a=0;a<6;a++){let l=a/6*Math.PI*2+n.x;i.rock(F(Y.rockDark),.25+a%3*.12,n.x+Math.cos(l)*n.r*.95,s+.15,n.z+Math.sin(l)*n.r*.95,l)}if(n.active){let a=new zt(new Ji(n.r*.24,16),we(new Ze({color:Y.lava})));a.rotation.x=-Math.PI/2,a.position.set(n.x,s+n.h*.84,n.z),t.add(a),e.push(new I(n.x,s+n.h+.2,n.z))}else i.sphere(F(Y.leaf),n.r*.22,n.x,s+n.h*.86,n.z,1,.3,1)}),e}function hv(i,t){let e=mn.x+1.2,n=mn.z+.6,s=Qt(e,n),r=i.child(e,s,n,.7),o=F("#f1e6cf"),a=F("#c9564c"),l=F("#4a4a52");r.batcher.add(q.cyl(.55,14),o,r.base.clone().multiply(Kt(0,.75,-1.3,Math.PI/2+.12,0,0,.42,3.2,.42))),r.batcher.add(q.cyl(1,14),a,r.base.clone().multiply(Kt(0,.82,-.2,Math.PI/2+.12,0,0,.43,.25,.43))),r.batcher.add(q.sphere(),a,r.base.clone().multiply(Kt(0,.62,1.9,0,0,0,.34,.34,.3))),r.box(o,4.4,.08,.95,0,.55,.4,0,0,.12),r.box(a,.6,.085,.96,-1.9,.82,.4,0,0,.12),r.box(a,.6,.085,.96,1.9,.28,.4,0,0,.12),r.box(o,1.5,.06,.5,0,1.15,-2.7,0,.12,0),r.box(a,.06,.7,.6,0,1.2,-2.75,0,.12,0),r.box(F("#a6c4cf"),.5,.25,.45,0,1.08,-.2,0,-.2,0);for(let u of[-.6,.6])r.box(l,.06,.45,.06,u,.05,.9),r.batcher.add(new Ie(.16,.16,.08,12).rotateZ(Math.PI/2),l,r.base.clone().multiply(Kt(u,.1,.9)));let c=new Ft;for(let u=0;u<2;u++){let d=new zt(q.box(),F(Y.woodDark));d.scale.set(.12,1.3,.04),d.position.y=-.65,d.rotation.z=u*Math.PI+.2;let f=new Ft;f.rotation.z=u*Math.PI,f.add(d),c.add(f)}let h=new I(0,.62,2.22).applyAxisAngle(new I(0,1,0),.7);return c.position.set(e+h.x,s+h.y,n+h.z),c.rotation.set(.12,.7,.4),t.add(c),r.box(F(Y.crimson),.5,.3,.3,-2.2,0,-.8,.3),r.cyl(F("#7f9a8a"),.12,.12,.35,-2.6,0,-.3,10),c}function uv(i){let t=Se.x-1.3,e=Se.z-.7,n=Qt(t,e);i.box(F(Y.plank),.42,.3,.32,t,n-.02,e,.4);for(let s=0;s<3;s++)i.sphere(F(Y.ink,{outline:!1}),.035,t+(s-1)*.11,n+.18,e+.165,1,1,.3)}function dv(i,t){let e=le.level+.3;i.box(F(Y.plank),2.8,.1,.9,-14.3,e,8.6,.05);for(let a of[-15.5,-14.3,-13.1])for(let l of[8.2,9])i.cyl(F(Y.woodDark),.06,.06,1.1,a,le.level-.7,l,6);let n=new Ft,s=new zt(new cn(1,14,8,0,Math.PI*2,Math.PI/2,Math.PI/2),F(Y.wood,{side:Fe}));s.scale.set(.45,.28,1),n.add(s);let r=new zt(q.box(),F(Y.plank));r.scale.set(.8,.04,.22),r.position.y=-.06,n.add(r);let o=new zt(q.box(),F(Y.woodDark));return o.scale.set(1.4,.03,.06),o.position.set(.2,0,.1),o.rotation.y=.3,n.add(o),n.position.set(-16.6,le.level+.08,7.6),n.rotation.y=.8,t.add(n),n}function fv(i){let t=(be.x0+be.x1)/2,e=(be.z0+be.z1)/2,n=Qt(t,e);i.box(F(Y.woodDark),.1,2,.1,t,n,e),i.box(F(Y.woodDark),1.3,.08,.08,t,n+1.5,e),i.cyl(F("#7f6a9a"),.22,.3,.7,t,n+1,e,8),i.sphere(F("#e8d3a0"),.22,t,n+1.95,e),i.cyl(F(Y.wheat),.42,.42,.04,t,n+2.1,e,12),i.cone(F(Y.wheat),.22,.3,t,n+2.12,e,10)}function Qd(i){let t=new Rn,e=new ei(t),n=new Ft;n.name="world";let s=av(e,i),r=lv(e,i,n),o=cv(e,n),a=hv(e,n);uv(e);let l=dv(e,n);return fv(e),n.add(t.build("world-batch")),{group:n,smokeSources:s,volcanoVents:o,update(c){r.rotateZ(.012),a.rotation.z=.4+Math.sin(c*.3)*.05,l.position.y=le.level+.08+Math.sin(c*1.4)*.03,l.rotation.z=Math.sin(c*1.1)*.04}}}var pv=new I(58,36,66),Rl=new I(0,2,0);function mv(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}var Cl=class{constructor(t){this.container=t;this.scene=new br;this.flight=null;this.markers=[];this.hour=17.4;this.targetHour=17.4;this.outlines=!0;this.elapsed=0;this.last=performance.now();this.projected=new I;this.updaters=[];this.characterGroups=new Map;let e=Math.min(window.devicePixelRatio||1,1.75);this.renderer=new fl({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(e),this.renderer.setSize(t.clientWidth,t.clientHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ts,this.renderer.domElement.style.display="block",this.renderer.domElement.setAttribute("aria-label","\u6D6E\u7A7A\u5C9B\u57CE\u5821\u4E09\u7EF4\u573A\u666F\uFF0C\u53EF\u62D6\u62FD\u65CB\u8F6C\u3001\u6EDA\u8F6E\u7F29\u653E"),this.renderer.domElement.setAttribute("role","img"),t.appendChild(this.renderer.domElement),this.effect=new xl(this.renderer,{defaultThickness:.003,defaultColor:[.27,.2,.16],defaultAlpha:.85}),this.camera=new $e(38,t.clientWidth/t.clientHeight,.1,1400),this.camera.position.copy(this.homePosition()),this.controls=new _l(this.camera,this.renderer.domElement),this.controls.target.copy(Rl),this.controls.enableDamping=!0,this.controls.dampingFactor=.07,this.controls.minDistance=2.5,this.controls.maxDistance=240,this.controls.screenSpacePanning=!0,this.controls.autoRotateSpeed=.45,this.controls.addEventListener("start",()=>{this.flight=null});let n=Kd(),s=jd(),r=Hd(),o=Qd(r.materials),a=Wd(r.anchors);this.environment=Zd(this.scene,e,[...r.smokeSources,...o.smokeSources],o.volcanoVents),this.shell=r.shell,a.list.forEach(l=>this.characterGroups.set(l.id,l.group)),this.scene.add(n.group,s.group,r.group,o.group,a.group),this.updaters.push((l,c,h)=>n.update(l,h),l=>s.update(l),(l,c,h)=>r.update(l,h),l=>o.update(l),(l,c,h)=>a.update(l,h)),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.renderer.setAnimationLoop(()=>this.tick())}resize(){let t=this.container.clientWidth,e=this.container.clientHeight;t===0||e===0||(this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e))}tick(){let t=performance.now(),e=Math.min(.35,(t-this.last)/1e3),n=Math.min(.05,e);this.last=t,this.elapsed+=n;let s=(this.targetHour-this.hour+24)%24;if(s>.001){let o=Math.min(7,Math.max(.5,s*2.4));this.hour=(this.hour+Math.min(s,o*e))%24}if(this.flight){let o=this.flight;o.t=Math.min(1,o.t+e/o.duration);let a=mv(o.t);this.camera.position.lerpVectors(o.fromPos,o.toPos,a),this.camera.position.y+=Math.sin(a*Math.PI)*o.arc,this.controls.target.lerpVectors(o.fromTarget,o.toTarget,a),o.t>=1&&(this.flight=null)}this.controls.update();let r=this.environment.update(this.elapsed,n,this.hour,this.camera);for(let o of this.updaters)o(this.elapsed,n,r);this.outlines?this.effect.render(this.scene,this.camera):this.renderer.render(this.scene,this.camera),this.updateMarkers()}updateMarkers(){if(this.markers.length===0)return;let t=this.container.clientWidth,e=this.container.clientHeight;for(let n of this.markers){if(this.projected.copy(n.position).project(this.camera),!(this.projected.z<1&&Math.abs(this.projected.x)<1.05&&Math.abs(this.projected.y)<1.05)){n.element.style.visibility="hidden";continue}let r=(this.projected.x*.5+.5)*t,o=(-this.projected.y*.5+.5)*e;n.element.style.visibility="visible",n.element.style.transform=`translate3d(${r.toFixed(1)}px, ${o.toFixed(1)}px, 0)`}}setMarkers(t){this.markers=t.map(e=>({id:e.id,position:new I(...e.position),element:e.element})),this.updateMarkers()}setTimeOfDay(t){this.targetHour=t}setCutaway(t){this.shell&&(this.shell.visible=!t)}setAutoRotate(t){this.controls.autoRotate=t}setOutlines(t){this.outlines=t}flyTo(t,e,n=1.8){let s=this.camera.position.distanceTo(t);this.flight={fromPos:this.camera.position.clone(),toPos:t,fromTarget:this.controls.target.clone(),toTarget:e,t:0,duration:n,arc:Math.min(14,s*.22)}}focusLocation(t){if(t.characterId){let s=this.characterGroups.get(t.characterId);if(s){let r=new I;s.getWorldPosition(r);let o=r.clone().add(new I(0,t.lift??.9,0)),a=s.rotation.y+(t.angle??.55),l=t.distance??4,c=o.clone().add(new I(Math.sin(a)*l,t.height??1.4,Math.cos(a)*l));this.flyTo(c,o);return}}let e=new I(...t.target),n=e.clone().add(new I(...t.offset));this.flyTo(n,e)}homePosition(){let t=this.camera.aspect,e=t<1.2?Math.min(1.9,Math.pow(1.2/t,.7)):1;return pv.clone().sub(Rl).multiplyScalar(e).add(Rl)}resetView(){this.flyTo(this.homePosition(),Rl.clone(),2.2)}dispose(){this.renderer.setAnimationLoop(null),this.resizeObserver.disconnect(),this.controls.dispose(),this.scene.traverse(t=>{let e=t;e.geometry&&e.geometry.dispose();let n=e.material;Array.isArray(n)?n.forEach(s=>s.dispose()):n?.dispose()}),Od(),Bd(),this.renderer.dispose(),this.renderer.domElement.remove()}};var nf=[{id:"architecture",label:"\u57CE\u5821\u5EFA\u7B51",hint:"\u57CE\u5899\u3001\u5854\u697C\u4E0E\u4E3B\u5821\u7684\u5916\u89C2"},{id:"interior",label:"\u5185\u90E8\u6784\u9020",hint:"\u6253\u5F00\u5256\u9762\uFF0C\u770B\u89C1\u6BCF\u4E00\u4E2A\u623F\u95F4"},{id:"characters",label:"\u4EBA\u7269",hint:"\u4F4F\u5728\u5C9B\u4E0A\u7684\u6BCF\u4E00\u4F4D\u5C45\u6C11"},{id:"terrain",label:"\u5730\u5F62",hint:"\u9EA6\u7530\u3001\u96EA\u5C71\u3001\u6E56\u6CCA\u4E0E\u6C99\u6F20"},{id:"environment",label:"\u73AF\u5883",hint:"\u5929\u7A7A\u3001\u4E91\u6D77\u4E0E\u663C\u591C"}],[tf,Il,ef]=pi.levels,Pl=Qt(Se.x,Se.z),Ll=[{id:"gatehouse",name:"\u57CE\u95E8\u697C",subtitle:"\u540A\u6865\u3001\u94C1\u95F8\u95E8\u4E0E\u84DD\u8272\u738B\u65D7",category:"architecture",target:[0,1.2+3.5,10.5],offset:[7,4.5,14],marker:[0,1.2+8.6,10.6],paragraphs:["\u57CE\u5821\u552F\u4E00\u7684\u6B63\u95E8\u671D\u5357\u5F00\uFF0C\u4E24\u5EA7\u5706\u5F62\u534A\u5854\u4E00\u5DE6\u4E00\u53F3\u5B88\u7740\u62F1\u5F62\u95E8\u6D1E\uFF0C\u5854\u9876\u6234\u7740\u73AB\u7470\u8272\u7684\u5C16\u5E3D\u5B50\u3002\u95E8\u6D1E\u4E0A\u65B9\u60AC\u6302\u7740\u6DF1\u84DD\u8272\u7684\u738B\u65D7\uFF0C\u4E2D\u592E\u7EE3\u7740\u4E00\u9897\u91D1\u8272\u7684\u661F\u2014\u2014\u8FD9\u662F\u661F\u8FB0\u57CE\u5821\u7684\u7EB9\u7AE0\u3002","\u95E8\u6D1E\u91CC\u85CF\u7740\u4E24\u9053\u9632\u7EBF\uFF1A\u5916\u4FA7\u662F\u534A\u5347\u8D77\u7684\u94C1\u95F8\u95E8\uFF0C\u94C1\u6761\u4EA4\u9519\u6210\u683C\uFF1B\u811A\u4E0B\u662F\u4E00\u5EA7\u653E\u4E0B\u7684\u6728\u540A\u6865\uFF0C\u4E24\u6839\u94C1\u94FE\u4ECE\u95E8\u697C\u659C\u62C9\u4E0B\u6765\u3002\u95E8\u697C\u9876\u90E8\u662F\u4E00\u5708\u96C9\u581E\uFF0C\u5B88\u536B\u53EF\u4EE5\u5728\u579B\u53E3\u540E\u89C2\u5BDF\u901A\u5F80\u6751\u5E84\u7684\u5927\u8DEF\u3002"],facts:[{label:"\u671D\u5411",value:"\u6B63\u5357\uFF0C\u9762\u5411\u5C0F\u6751\u5E84"},{label:"\u9AD8\u5EA6",value:"\u95E8\u697C\u7EA6 6.4 \u7C73\uFF0C\u534A\u5854 7.4 \u7C73"},{label:"\u9632\u5FA1",value:"\u94C1\u95F8\u95E8 \xB7 \u540A\u6865 \xB7 \u96C9\u581E"}]},{id:"walls",name:"\u57CE\u5899\u4E0E\u89D2\u697C",subtitle:"\u56DB\u5EA7\u89D2\u697C\u4E0E\u73AF\u7ED5\u7684\u6B65\u9053",category:"architecture",target:[9,1.2+5,2],offset:[16,8,10],marker:[9,1.2+15.6,9],paragraphs:["\u4E00\u5708\u539A\u7EA6\u4E00\u7C73\u3001\u9AD8\u4E94\u7C73\u7684\u5E55\u5899\u628A\u5EAD\u9662\u56F4\u6210\u6B63\u65B9\u5F62\uFF0C\u56DB\u89D2\u5404\u7ACB\u7740\u4E00\u5EA7\u5706\u5F62\u89D2\u697C\u3002\u89D2\u697C\u7684\u9876\u90E8\u5148\u5411\u5916\u6311\u51FA\u4E00\u5708\u6258\u6A90\uFF0C\u518D\u6234\u4E0A\u5C16\u5C16\u7684\u9525\u5F62\u5C4B\u9876\uFF0C\u84DD\u8272\u4E0E\u77F3\u677F\u7070\u4EA4\u66FF\u51FA\u73B0\uFF0C\u5C4B\u5C16\u4E0A\u63D2\u7740\u91D1\u8272\u548C\u7EEF\u7EA2\u8272\u7684\u5C0F\u65D7\uFF0C\u98CE\u4E00\u5439\u5C31\u8F7B\u8F7B\u98D8\u52A8\u3002","\u5899\u9876\u662F\u53EF\u4EE5\u884C\u8D70\u7684\u57CE\u5899\u6B65\u9053\uFF0C\u5916\u4FA7\u662F\u4E00\u6392\u9F50\u6574\u7684\u96C9\u581E\uFF0C\u5899\u8EAB\u4E0A\u5F00\u7740\u7EC6\u957F\u7684\u5C04\u7BAD\u5B54\u3002\u897F\u5317\u89D2\u7684\u5EAD\u9662\u5185\u4FA7\u6709\u4E00\u6BB5\u77F3\u9636\u76F4\u901A\u6B65\u9053\uFF1B\u897F\u5899\u548C\u5317\u5899\u5404\u5F00\u6709\u4E00\u6247\u5C0F\u4FA7\u95E8\uFF0C\u5206\u522B\u901A\u5411\u98CE\u8F66\u4E0E\u96EA\u5C71\u5C0F\u5F84\u3002"],facts:[{label:"\u5E55\u5899",value:"18 \xD7 18 \u7C73\uFF0C\u9AD8 5 \u7C73"},{label:"\u89D2\u697C",value:"4 \u5EA7\uFF0C\u5C4B\u9876\u9AD8\u7EA6 14 \u7C73"},{label:"\u5DE1\u903B",value:"\u4E1C\u5899\u6B65\u9053\u6709\u9A91\u58EB\u5F80\u8FD4\u503C\u5B88"}]},{id:"keep",name:"\u4E3B\u5821",subtitle:"\u4E09\u5C42\u77F3\u780C\u5854\u697C\uFF0C\u738B\u5BA4\u7684\u5C45\u6240",category:"architecture",target:[0,1.2+6,-5.75],offset:[-6,7,19],marker:[0,1.2+14.4,-5.75],paragraphs:['\u4E3B\u5821\uFF08\u53C8\u79F0"\u5929\u5B88\u5854"\uFF09\u80CC\u9760\u5317\u5899\uFF0C\u662F\u57CE\u5821\u4E2D\u6700\u9AD8\u5927\u7684\u65B9\u5F62\u5EFA\u7B51\u3002\u5B83\u6709\u4E09\u5C42\uFF1A\u4E00\u5C42\u662F\u519B\u68B0\u5E93\u4E0E\u4ED3\u50A8\uFF0C\u4E8C\u5C42\u662F\u85CF\u4E66\u5BA4\uFF0C\u4E09\u5C42\u662F\u738B\u5BA4\u5BDD\u5BAB\u3002\u6B63\u9762\u4E2D\u592E\u6709\u4E00\u5EA7\u5E26\u680F\u6746\u7684\u5C0F\u9633\u53F0\uFF0C\u56FD\u738B\u5076\u5C14\u4F1A\u5728\u8FD9\u91CC\u5411\u5EAD\u9662\u91CC\u7684\u4EBA\u4EEC\u6325\u624B\u3002',"\u5C4B\u9876\u662F\u4E00\u5EA7\u77F3\u677F\u7070\u7684\u56DB\u5761\u5C16\u9876\uFF0C\u9876\u7AEF\u70B9\u7F00\u7740\u91D1\u7403\uFF0C\u5468\u56F4\u73AF\u7ED5\u7740\u96C9\u581E\u3002\u6253\u5F00\u4E0B\u65B9\u7684\u300C\u5256\u9762\u89C6\u56FE\u300D\uFF0C\u4E3B\u5821\u671D\u5357\u7684\u6574\u9762\u5899\u548C\u5C4B\u9876\u90FD\u4F1A\u88AB\u79FB\u5F00\uFF0C\u50CF\u6253\u5F00\u4E00\u53EA\u5A03\u5A03\u5C4B\uFF0C\u80FD\u540C\u65F6\u770B\u5230\u4E09\u5C42\u697C\u7684\u9648\u8BBE\u4EE5\u53CA\u8D2F\u7A7F\u5404\u5C42\u7684\u87BA\u65CB\u697C\u68AF\u3002"],facts:[{label:"\u697C\u5C42",value:"3 \u5C42\uFF0C\u6BCF\u5C42\u7EA6 2.9 \u7C73"},{label:"\u4EA4\u901A",value:"\u897F\u5317\u89D2\u77F3\u780C\u87BA\u65CB\u697C\u68AF"},{label:"\u6280\u5DE7",value:"\u5F00\u542F\u5256\u9762\u89C6\u56FE\u53EF\u770B\u5185\u90E8"}]},{id:"star-tower",name:"\u661F\u8FB0\u5854",subtitle:"\u57CE\u5821\u6700\u9AD8\u5904\u7684\u89C2\u661F\u5854",category:"architecture",target:[5.4,1.2+12,-7.6],offset:[14,3,16],marker:[5.4,1.2+23.2,-7.6],paragraphs:["\u661F\u8FB0\u5854\u7D27\u8D34\u4E3B\u5821\u4E1C\u5317\u89D2\u62D4\u5730\u800C\u8D77\uFF0C\u662F\u5168\u5C9B\u6700\u9AD8\u7684\u5EFA\u7B51\u3002\u7EC6\u957F\u7684\u5854\u8EAB\u4E0A\u76D8\u65CB\u5206\u5E03\u7740\u5C0F\u7A97\uFF0C\u5230\u4E86\u591C\u665A\u4F1A\u4E00\u6247\u4E00\u6247\u4EAE\u8D77\u6696\u9EC4\u8272\u7684\u706F\u5149\u3002","\u5854\u9876\u5916\u6311\u51FA\u4E00\u5708\u5E26\u96C9\u581E\u7684\u89C2\u666F\u53F0\uFF0C\u4E2D\u95F4\u662F\u516D\u6839\u77F3\u67F1\u6491\u8D77\u7684\u5F00\u653E\u5F0F\u661F\u8C61\u53F0\uFF0C\u518D\u5F80\u4E0A\u662F\u6DF1\u84DD\u8272\u7684\u5C16\u9876\u548C\u4E00\u9897\u7F13\u7F13\u65CB\u8F6C\u7684\u91D1\u8272\u661F\u661F\u2014\u2014\u5165\u591C\u540E\u5B83\u4F1A\u53D1\u51FA\u67D4\u548C\u7684\u5149\uFF0C\u50CF\u662F\u4E3A\u8FF7\u8DEF\u7684\u65C5\u4EBA\u70B9\u8D77\u7684\u706F\u3002"],facts:[{label:"\u9AD8\u5EA6",value:"\u5854\u8EAB 14.5 \u7C73\uFF0C\u661F\u5C16\u7EA6 22 \u7C73"},{label:"\u9876\u5C42",value:"\u661F\u8C61\u53F0\uFF08\u5730\u7406\u5B66\u5BB6\u7684\u4E66\u623F\uFF09"},{label:"\u591C\u665A",value:"\u91D1\u661F\u53D1\u5149\u3001\u7A97\u6237\u4EAE\u706F"}]},{id:"hall",name:"\u738B\u5EA7\u5927\u5385",subtitle:"\u5BB4\u4F1A\u3001\u8BAE\u4E8B\u4E0E\u56FD\u738B\u7684\u738B\u5EA7",category:"interior",target:[6.05,1.2+1.2,.8],offset:[-9.5,9.5,4.5],marker:[6.05,1.2+5.2,.8],cutaway:!0,paragraphs:["\u5927\u5385\u6CBF\u4E1C\u5899\u800C\u5EFA\uFF0C\u5C4B\u9876\u662F\u73AB\u7470\u8272\u7684\u53CC\u5761\u9876\u3002\u5317\u7AEF\u662F\u9AD8\u51FA\u5730\u9762\u7684\u77F3\u780C\u53F0\u9636\uFF0C\u4E0A\u9762\u653E\u7740\u9540\u91D1\u7684\u738B\u5EA7\uFF1A\u6DF1\u7EA2\u8272\u7684\u5750\u57AB\u548C\u9760\u80CC\uFF0C\u6276\u624B\u672B\u7AEF\u96D5\u7740\u5C0F\u91D1\u7403\uFF0C\u5934\u9876\u60AC\u7740\u5E26\u91D1\u8FB9\u7684\u7EEF\u7EA2\u8272\u534E\u76D6\uFF0C\u8EAB\u540E\u5782\u7740\u4E00\u5E45\u5DE8\u5927\u7684\u6302\u6BEF\u3002","\u4E00\u6761\u7EA2\u6BEF\u4ECE\u738B\u5EA7\u4E00\u76F4\u94FA\u5230\u5927\u5385\u5357\u7AEF\u3002\u7EA2\u6BEF\u4E24\u4FA7\u5404\u6446\u7740\u4E00\u5F20\u957F\u684C\uFF0C\u684C\u8FB9\u662F\u957F\u51F3\uFF0C\u684C\u4E0A\u6709\u767D\u74F7\u76D8\u3001\u91D1\u9152\u676F\u3001\u70E4\u9E21\u3001\u4E00\u76D8\u6C34\u679C\u548C\u70B9\u71C3\u7684\u8721\u70DB\u3002\u5357\u5899\u662F\u4E00\u5EA7\u77F3\u780C\u58C1\u7089\uFF0C\u7089\u706B\u7EC8\u65E5\u8DF3\u52A8\uFF1B\u5929\u82B1\u677F\u4E2D\u592E\u6302\u7740\u4E00\u5708\u6728\u5236\u540A\u706F\uFF0C\u4E0A\u9762\u63D2\u7740\u516B\u652F\u8721\u70DB\u3002\u4E1C\u5899\u6302\u7740\u4E24\u9762\u7EE3\u6709\u91D1\u8272\u7EB9\u7AE0\u7684\u84DD\u8272\u65D7\u5E1C\u3002"],facts:[{label:"\u5C3A\u5BF8",value:"\u7EA6 4.9 \xD7 7.5 \u7C73"},{label:"\u9648\u8BBE",value:"\u738B\u5EA7 \xB7 \u534E\u76D6 \xB7 \u4E24\u5F20\u957F\u684C \xB7 \u58C1\u7089 \xB7 \u540A\u706F"},{label:"\u4EBA\u7269",value:"\u56FD\u738B\u5750\u5728\u738B\u5EA7\u4E0A"}]},{id:"armory",name:"\u519B\u68B0\u5E93",subtitle:"\u4E3B\u5821\u4E00\u5C42 \xB7 \u5175\u5668\u4E0E\u4ED3\u50A8",category:"interior",target:[.4,tf+1.1,-5.8],offset:[.6,1.4,9.6],marker:[-1.6,tf+1.6,-3],cutaway:!0,paragraphs:["\u4E3B\u5821\u7684\u4E00\u5C42\u539A\u5899\u5C0F\u7A97\uFF0C\u51C9\u723D\u800C\u5B89\u9759\u3002\u4E1C\u5899\u8FB9\u7ACB\u7740\u4E00\u6392\u957F\u77DB\u67B6\uFF0C\u77DB\u5C16\u6574\u9F50\u671D\u4E0A\uFF1B\u5317\u5899\u4E0A\u6302\u7740\u4E09\u9762\u5706\u76FE\uFF0C\u5206\u522B\u6F06\u6210\u6DF1\u84DD\u3001\u7EEF\u7EA2\u548C\u91D1\u8272\uFF0C\u76FE\u9762\u4E2D\u592E\u90FD\u753B\u7740\u767D\u8272\u7684\u7AD6\u7EB9\u3002","\u5899\u89D2\u5806\u7740\u6A61\u6728\u9152\u6876\u548C\u88C5\u6EE1\u9EA6\u5B50\u7684\u5E03\u888B\uFF0C\u95E8\u8FB9\u653E\u7740\u4E00\u53EA\u9576\u91D1\u8FB9\u7684\u5B9D\u7BB1\uFF0C\u65C1\u8FB9\u7AD9\u7740\u4E00\u526F\u7A7A\u8361\u8361\u7684\u94E0\u7532\u3002\u897F\u5317\u89D2\u662F\u4E00\u6839\u77F3\u67F1\uFF0C\u56F4\u7ED5\u5B83\u65CB\u8F6C\u800C\u4E0A\u7684\u77F3\u9636\u901A\u5F80\u4E8C\u5C42\u7684\u85CF\u4E66\u5BA4\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u4E3B\u5821\u7B2C\u4E00\u5C42"},{label:"\u9648\u8BBE",value:"\u77DB\u67B6 \xB7 \u5706\u76FE \xB7 \u9152\u6876 \xB7 \u5B9D\u7BB1 \xB7 \u94E0\u7532"},{label:"\u901A\u9053",value:"\u87BA\u65CB\u697C\u68AF\u8D77\u70B9"}]},{id:"library",name:"\u85CF\u4E66\u5BA4",subtitle:"\u4E3B\u5821\u4E8C\u5C42 \xB7 \u4E66\u67B6\u4E0E\u9605\u8BFB\u684C",category:"interior",target:[.4,Il+1.1,-5.8],offset:[.6,1.8,9.6],marker:[1.6,Il+1.5,-3],cutaway:!0,paragraphs:["\u4E8C\u5C42\u94FA\u7740\u6728\u5730\u677F\u548C\u4E00\u5F20\u6DF1\u84DD\u8272\u5730\u6BEF\u3002\u5317\u5899\u5E76\u6392\u7ACB\u7740\u4E09\u5EA7\u9AD8\u5927\u7684\u4E66\u67B6\uFF0C\u6BCF\u5EA7\u56DB\u5C42\uFF0C\u585E\u6EE1\u4E86\u7EA2\u3001\u84DD\u3001\u7EFF\u3001\u91D1\u3001\u7D2B\u5404\u8272\u4E66\u810A\uFF0C\u9AD8\u4F4E\u9519\u843D\uFF1B\u4E1C\u5899\u8FD8\u6709\u4E00\u5EA7\u7A84\u4E66\u67B6\u3002","\u623F\u95F4\u4E2D\u592E\u662F\u4E00\u5F20\u9605\u8BFB\u684C\uFF0C\u4E0A\u9762\u644A\u5F00\u7740\u4E00\u672C\u4E66\uFF0C\u65C1\u8FB9\u662F\u58A8\u6C34\u74F6\u548C\u4E00\u652F\u70B9\u4EAE\u7684\u8721\u70DB\u3002\u5C0F\u516C\u4E3B\u6B63\u5750\u5728\u684C\u524D\u8BFB\u4E66\u3002\u897F\u5899\u6302\u7740\u4E00\u5E45\u624B\u7ED8\u5730\u56FE\uFF0C\u753B\u7684\u6B63\u662F\u8FD9\u5EA7\u6D6E\u7A7A\u5C9B\u7684\u8F6E\u5ED3\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u4E3B\u5821\u7B2C\u4E8C\u5C42"},{label:"\u85CF\u4E66",value:"\u4E09\u5EA7\u4E3B\u4E66\u67B6 + \u4E00\u5EA7\u4FA7\u4E66\u67B6"},{label:"\u4EBA\u7269",value:"\u5C0F\u516C\u4E3B\u5728\u684C\u524D\u8BFB\u4E66"}]},{id:"bedchamber",name:"\u738B\u5BA4\u5BDD\u5BAB",subtitle:"\u4E3B\u5821\u4E09\u5C42 \xB7 \u56DB\u67F1\u534E\u76D6\u5E8A",category:"interior",target:[.8,ef+1,-6.2],offset:[.4,4.4,8.6],marker:[-1.2,ef+1.5,-3],cutaway:!0,paragraphs:["\u5BDD\u5BAB\u662F\u4E3B\u5821\u6700\u9AD8\u7684\u4E00\u5C42\u3002\u5317\u5899\u6B63\u4E2D\u6446\u7740\u4E00\u5F20\u56DB\u67F1\u5927\u5E8A\uFF1A\u767D\u8272\u5E8A\u8925\u3001\u6DF1\u84DD\u8272\u88AB\u5B50\u3001\u4E24\u53EA\u5976\u6CB9\u8272\u6795\u5934\uFF0C\u56DB\u6839\u6728\u67F1\u6491\u8D77\u4E00\u9876\u7EEF\u7EA2\u8272\u3001\u9576\u91D1\u8FB9\u7684\u534E\u76D6\uFF0C\u5E8A\u5934\u548C\u4E24\u4FA7\u5782\u7740\u540C\u8272\u5E37\u5E54\u3002\u4E00\u53EA\u6A58\u8272\u7684\u5C0F\u732B\u6B63\u8737\u5728\u88AB\u5B50\u4E0A\u7761\u89C9\uFF0C\u809A\u5B50\u968F\u547C\u5438\u4E00\u8D77\u4E00\u4F0F\u3002","\u4E1C\u5899\u8FB9\u662F\u9AD8\u9AD8\u7684\u8863\u67DC\uFF0C\u897F\u5317\u89D2\u662F\u4E00\u5F20\u68B3\u5986\u53F0\u548C\u4E00\u9762\u5706\u955C\uFF0C\u5E8A\u524D\u94FA\u7740\u5706\u5F62\u7EA2\u5730\u6BEF\u3002\u7A97\u8FB9\u7684\u5C0F\u5706\u684C\u4E0A\u653E\u7740\u4E00\u53EA\u73BB\u7483\u82B1\u74F6\uFF0C\u91CC\u9762\u63D2\u7740\u4E09\u6735\u7EA2\u73AB\u7470\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u4E3B\u5821\u7B2C\u4E09\u5C42"},{label:"\u9648\u8BBE",value:"\u534E\u76D6\u5E8A \xB7 \u8863\u67DC \xB7 \u68B3\u5986\u53F0 \xB7 \u82B1\u74F6"},{label:"\u5C0F\u5F69\u86CB",value:"\u5E8A\u4E0A\u7761\u7740\u4E00\u53EA\u5C0F\u732B"}]},{id:"chapel",name:"\u793C\u62DC\u5802",subtitle:"\u5F69\u8272\u73BB\u7483\u7A97\u4E0E\u5C0F\u949F\u697C",category:"interior",target:[-6.55,1.2+1.2,.8],offset:[9,8,3],marker:[-6.55,1.2+9,.8],cutaway:!0,paragraphs:["\u793C\u62DC\u5802\u4F4D\u4E8E\u5EAD\u9662\u897F\u4FA7\uFF0C\u84DD\u8272\u9661\u5761\u5C4B\u9876\uFF0C\u5357\u9762\u5C71\u5899\u4E0A\u5D4C\u7740\u4E00\u6247\u5706\u5F62\u73AB\u7470\u7A97\uFF0C\u5C4B\u810A\u4E0A\u65B9\u662F\u4E00\u5EA7\u5C0F\u5C0F\u7684\u949F\u67B6\uFF0C\u91D1\u8272\u7684\u949F\u4F1A\u8F7B\u8F7B\u6447\u6446\u3002\u897F\u5899\u5F00\u7740\u4E09\u6247\u5C16\u62F1\u5F69\u8272\u73BB\u7483\u7A97\uFF0C\u591C\u665A\u4F1A\u900F\u51FA\u6696\u5149\u3002","\u5BA4\u5185\u662F\u6D45\u8272\u77F3\u7816\u5730\u9762\uFF0C\u4E00\u6761\u6DF1\u84DD\u8272\u7A84\u6BEF\u901A\u5411\u5317\u7AEF\u7684\u796D\u575B\uFF1A\u767D\u8272\u53F0\u5E03\u3001\u91D1\u8272\u5341\u5B57\u548C\u4E24\u652F\u957F\u8721\u70DB\uFF0C\u80CC\u540E\u662F\u4E00\u6247\u9AD8\u9AD8\u7684\u5F69\u7A97\u3002\u4E24\u4FA7\u5404\u6709\u56DB\u6392\u6728\u957F\u6905\uFF0C\u65C1\u8FB9\u7ACB\u7740\u8BFB\u7ECF\u53F0\u548C\u94C1\u70DB\u67B6\u3002\u4FEE\u58EB\u6B63\u7AD9\u5728\u796D\u575B\u524D\u4F4E\u5934\u7948\u7977\u3002"],facts:[{label:"\u5C4B\u9876",value:"\u84DD\u8272\u9661\u5761\u9876 + \u949F\u67B6"},{label:"\u7A97\u6237",value:"\u73AB\u7470\u7A97 1 \u6247 \xB7 \u5F69\u7A97 4 \u6247"},{label:"\u4EBA\u7269",value:"\u4FEE\u58EB"}]},{id:"kitchen",name:"\u53A8\u623F",subtitle:"\u7089\u706B\u3001\u5927\u9505\u4E0E\u65B0\u70E4\u7684\u9762\u5305",category:"interior",target:[-6.55,1.2+1,6.85],offset:[8,7,1.5],marker:[-6.55,1.2+5.8,6.85],cutaway:!0,paragraphs:["\u53A8\u623F\u5728\u5EAD\u9662\u897F\u5357\u89D2\uFF0C\u662F\u4E00\u5EA7\u5976\u6CB9\u8272\u5916\u5899\u3001\u6DF1\u8272\u6728\u6881\u7684\u534A\u6728\u7ED3\u6784\u5C0F\u5C4B\uFF0C\u897F\u4FA7\u7684\u5927\u70DF\u56F1\u603B\u662F\u5192\u7740\u767D\u70DF\u3002\u70DF\u56F1\u5E95\u90E8\u5C31\u662F\u7076\u53F0\uFF1A\u7089\u706B\u4E0A\u67B6\u7740\u4E09\u811A\u94C1\u67B6\uFF0C\u540A\u7740\u4E00\u53E3\u9ED1\u8272\u5927\u9505\uFF0C\u53A8\u5A18\u6B63\u62FF\u7740\u957F\u52FA\u6162\u6162\u6405\u62CC\u3002","\u623F\u95F4\u91CC\u6709\u4E00\u5F20\u6728\u5DE5\u4F5C\u53F0\uFF0C\u6446\u7740\u4E09\u6761\u521A\u51FA\u7089\u7684\u9762\u5305\u3001\u4E00\u53EA\u5357\u74DC\u3001\u4E00\u9897\u5377\u5FC3\u83DC\u548C\u4E00\u4E2A\u6D3E\u3002\u5317\u5899\u4E24\u5C42\u6728\u67B6\u4E0A\u653E\u6EE1\u9676\u7F50\u548C\u74F6\u5B50\uFF0C\u6A2A\u6881\u4E0A\u6302\u7740\u667E\u5E72\u7684\u9999\u8349\u548C\u814A\u80A0\uFF0C\u89D2\u843D\u91CC\u662F\u9152\u6876\u548C\u9762\u7C89\u888B\u3002"],facts:[{label:"\u7ED3\u6784",value:"\u534A\u6728\u7ED3\u6784 + \u77F3\u780C\u70DF\u56F1"},{label:"\u9648\u8BBE",value:"\u7076\u53F0 \xB7 \u5927\u9505 \xB7 \u5DE5\u4F5C\u53F0 \xB7 \u50A8\u7269\u67B6"},{label:"\u4EBA\u7269",value:"\u53A8\u5A18"}]},{id:"smithy",name:"\u94C1\u5320\u94FA",subtitle:"\u953B\u7089\u3001\u94C1\u7827\u4E0E\u9A6C\u8E44\u94C1",category:"interior",target:[6.6,1.2+.9,7.2],offset:[-4.4,4.6,-7.6],marker:[6.5,1.2+4.3,7],paragraphs:["\u94C1\u5320\u94FA\u662F\u9760\u7740\u5357\u5899\u642D\u8D77\u7684\u5355\u5761\u68DA\u5C4B\uFF0C\u6B63\u9762\u655E\u5F00\uFF0C\u6CA1\u6709\u5899\uFF0C\u65B9\u4FBF\u6563\u70ED\u3002\u91CC\u4FA7\u662F\u77F3\u780C\u953B\u7089\uFF0C\u7089\u5E8A\u91CC\u7684\u70AD\u706B\u70E7\u5F97\u901A\u7EA2\uFF0C\u4E0A\u65B9\u7684\u77F3\u7F69\u628A\u70DF\u5F15\u5411\u5C4B\u9876\uFF1B\u953B\u7089\u65C1\u8FB9\u662F\u4E00\u53EA\u6728\u5934\u98CE\u7BB1\u3002","\u94C1\u7827\u7ACB\u5728\u6B63\u4E2D\uFF0C\u5E26\u7740\u5C16\u5C16\u7684\u7827\u89D2\u3002\u65C1\u8FB9\u6709\u4E00\u6876\u6DEC\u706B\u7528\u7684\u6E05\u6C34\uFF0C\u5899\u4E0A\u7684\u6728\u677F\u6302\u7740\u9524\u5B50\u3001\u706B\u94B3\u548C\u56DB\u53EA\u9A6C\u8E44\u94C1\u3002\u94C1\u5320\u62A1\u8D77\u94C1\u9524\uFF0C\u4E00\u4E0B\u4E00\u4E0B\u5730\u6572\u6253\u2014\u2014\u591C\u91CC\u7089\u706B\u7684\u5149\u4F1A\u628A\u6574\u4E2A\u68DA\u5B50\u6620\u6210\u6A58\u8272\u3002"],facts:[{label:"\u7ED3\u6784",value:"\u5355\u5761\u9876\u5F00\u653E\u5F0F\u68DA\u5C4B"},{label:"\u9648\u8BBE",value:"\u953B\u7089 \xB7 \u98CE\u7BB1 \xB7 \u94C1\u7827 \xB7 \u6DEC\u706B\u6876"},{label:"\u4EBA\u7269",value:"\u94C1\u5320"}]},{id:"observatory",name:"\u661F\u8C61\u53F0",subtitle:"\u661F\u8FB0\u5854\u9876 \xB7 \u5730\u7403\u4EEA\u4E0E\u671B\u8FDC\u955C",category:"interior",target:[5.4,1.2+15.6,-7.6],offset:[4.2,2.2,4.6],marker:[7.7,1.2+15.9,-7.6],paragraphs:["\u661F\u8C61\u53F0\u662F\u4E00\u95F4\u56DB\u9762\u901A\u98CE\u7684\u5706\u5F62\u5C0F\u5C4B\uFF1A\u516D\u6839\u77F3\u67F1\u6491\u7740\u6DF1\u84DD\u8272\u5C16\u9876\uFF0C\u5730\u9762\u94FA\u7740\u6728\u677F\uFF0C\u5916\u9762\u4E00\u5708\u96C9\u581E\u56F4\u6210\u89C2\u666F\u53F0\u3002","\u5C4B\u91CC\u6709\u4E00\u5F20\u5C0F\u4E66\u684C\uFF0C\u644A\u7740\u661F\u56FE\uFF0C\u70B9\u7740\u4E00\u652F\u77ED\u8721\u70DB\uFF1B\u4E00\u67B6\u9EC4\u94DC\u671B\u8FDC\u955C\u67B6\u5728\u4E09\u811A\u67B6\u4E0A\uFF0C\u659C\u659C\u6307\u5411\u5929\u7A7A\uFF1B\u6728\u5EA7\u4E0A\u7684\u5730\u7403\u4EEA\u7F13\u7F13\u8F6C\u52A8\uFF0C\u4E0A\u9762\u662F\u84DD\u8272\u7684\u6D77\u6D0B\u3001\u7EFF\u8272\u7684\u9646\u5730\u548C\u4E00\u9053\u91D1\u8272\u7684\u5B50\u5348\u73AF\u3002\u5730\u7406\u5B66\u5BB6\u5E38\u5E38\u5728\u8FD9\u91CC\u4E00\u7AD9\u5C31\u662F\u4E00\u6574\u591C\u3002"],facts:[{label:"\u9AD8\u5EA6",value:"\u79BB\u5730\u7EA6 15.8 \u7C73"},{label:"\u9648\u8BBE",value:"\u671B\u8FDC\u955C \xB7 \u5730\u7403\u4EEA \xB7 \u661F\u56FE\u4E66\u684C"},{label:"\u4EBA\u7269",value:"\u5730\u7406\u5B66\u5BB6"}]},{id:"prince",name:"\u5C0F\u738B\u5B50",subtitle:"\u7AD9\u5728\u5C0F\u5C71\u4E18\u4E0A\u770B\u65E5\u843D\u7684\u4EBA",category:"characters",target:[Se.x,Pl+1,Se.z],offset:[0,0,0],marker:[Se.x-.5,Pl+2.3,Se.z+.4],characterId:"prince",distance:3.6,height:.9,angle:.5,paragraphs:["\u4E00\u5934\u91D1\u8272\u7684\u3001\u4E71\u84EC\u84EC\u7684\u5934\u53D1\uFF0C\u4E00\u4EF6\u957F\u53CA\u811A\u8E1D\u7684\u7EFF\u8272\u5916\u5957\uFF0C\u8116\u5B50\u4E0A\u56F4\u7740\u4E00\u6761\u91D1\u9EC4\u8272\u7684\u957F\u56F4\u5DFE\uFF0C\u56F4\u5DFE\u7684\u4E24\u6761\u5C3E\u5DF4\u603B\u5728\u98CE\u91CC\u98D8\u3002\u4ED6\u7684\u80A9\u4E0A\u7F00\u7740\u4E24\u9897\u5C0F\u91D1\u661F\u3002","\u4ED6\u4F4F\u5728\u5C9B\u7684\u897F\u5357\u8FB9\u90A3\u5EA7\u5F00\u6EE1\u767D\u82B1\u7684\u5C0F\u5C71\u4E18\u4E0A\uFF0C\u6700\u559C\u6B22\u9762\u671D\u897F\u65B9\u770B\u65E5\u843D\u2014\u2014\u6709\u65F6\u4F1A\u62AC\u8D77\u624B\uFF0C\u597D\u50CF\u60F3\u628A\u6700\u540E\u4E00\u7F15\u5149\u7559\u4F4F\u3002\u5207\u6362\u5230\u300C\u9EC4\u660F\u300D\uFF0C\u4F60\u4F1A\u770B\u5230\u4ED6\u773C\u524D\u7684\u5929\u7A7A\u6162\u6162\u53D8\u6210\u6A58\u7C89\u8272\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u897F\u5357\u5C0F\u5C71\u4E18"},{label:"\u7279\u5F81",value:"\u91D1\u53D1 \xB7 \u7EFF\u5916\u5957 \xB7 \u91D1\u8272\u56F4\u5DFE"},{label:"\u4E60\u60EF",value:"\u6BCF\u5929\u90FD\u8981\u770B\u4E00\u6B21\u65E5\u843D"}]},{id:"rose",name:"\u73AB\u7470",subtitle:"\u73BB\u7483\u7F69\u4E0B\u72EC\u4E00\u65E0\u4E8C\u7684\u82B1",category:"characters",target:[Se.x+.6,Pl+.4,Se.z-.4],offset:[0,0,0],marker:[Se.x+.6,Pl+1.4,Se.z-.4],characterId:"rose",distance:1.8,height:.5,lift:.35,paragraphs:["\u5C0F\u738B\u5B50\u8EAB\u8FB9\uFF0C\u6728\u5E95\u5EA7\u4E0A\u6263\u7740\u4E00\u53EA\u900F\u660E\u7684\u73BB\u7483\u7F69\uFF0C\u7F69\u5B50\u91CC\u662F\u4E00\u6735\u7EA2\u73AB\u7470\u3002\u5B83\u6709\u4E94\u7247\u82B1\u74E3\u3001\u4E00\u7247\u53F6\u5B50\u548C\u4E00\u6839\u7EC6\u7EC6\u7684\u830E\uFF0C\u5728\u5FAE\u98CE\u91CC\u8F7B\u8F7B\u6447\u6643\u3002","\u73BB\u7483\u7F69\u662F\u4E3A\u4E86\u66FF\u5979\u6321\u98CE\uFF0C\u4E5F\u6321\u4F4F\u591C\u91CC\u7684\u5BD2\u6C14\u3002\u5728\u8FD9\u5EA7\u5C9B\u4E0A\u5F00\u7740\u6210\u5343\u4E0A\u4E07\u6735\u82B1\uFF0C\u53EF\u53EA\u6709\u8FD9\u4E00\u6735\uFF0C\u662F\u88AB\u4EBA\u6BCF\u5929\u6D47\u6C34\u3001\u6BCF\u5929\u5B88\u62A4\u7684\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u5C0F\u5C71\u4E18\uFF0C\u5C0F\u738B\u5B50\u8EAB\u65C1"},{label:"\u7279\u5F81",value:"\u7EA2\u8272\u4E94\u74E3 \xB7 \u73BB\u7483\u7F69"},{label:"\u65C1\u8FB9",value:"\u4E00\u53EA\u5F00\u4E86\u4E09\u4E2A\u5C0F\u5B54\u7684\u6728\u7BB1\uFF08\u91CC\u9762\u6709\u4E00\u53EA\u7F8A\uFF09"}]},{id:"fox",name:"\u72D0\u72F8",subtitle:"\u9EA6\u7530\u8FB9\u7B49\u5F85\u7684\u670B\u53CB",category:"characters",target:[-16.4,1,-11.2],offset:[0,0,0],marker:[-16.4,Qt(-16.4,-11.2)+1.4,-11.2],characterId:"fox",distance:2.6,height:.8,lift:.4,paragraphs:["\u4E00\u53EA\u6A58\u8272\u7684\u5C0F\u72D0\u72F8\uFF0C\u767D\u8272\u7684\u80F8\u53E3\u548C\u5C3E\u5DF4\u5C16\uFF0C\u7AD6\u7740\u4E24\u53EA\u5C16\u8033\u6735\uFF0C\u8E72\u5728\u9EA6\u7530\u5357\u8FB9\u7684\u7BF1\u7B06\u5916\u3002\u5B83\u7684\u5C3E\u5DF4\u4E0D\u505C\u5730\u5DE6\u53F3\u626B\u52A8\uFF0C\u8111\u888B\u65F6\u4E0D\u65F6\u6B6A\u4E00\u4E0B\uFF0C\u50CF\u5728\u542C\u4EC0\u4E48\u58F0\u97F3\u3002","\u5B83\u603B\u662F\u671B\u7740\u57CE\u5821\u7684\u65B9\u5411\u3002\u9EA6\u7530\u662F\u91D1\u8272\u7684\uFF0C\u548C\u5C0F\u738B\u5B50\u7684\u5934\u53D1\u4E00\u4E2A\u989C\u8272\u2014\u2014\u6240\u4EE5\u6BCF\u5F53\u98CE\u5439\u8FC7\u9EA6\u6D6A\uFF0C\u5B83\u90FD\u4F1A\u89C9\u5F97\u5F88\u5F00\u5FC3\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u897F\u5317\u9EA6\u7530\u5357\u4FA7"},{label:"\u52A8\u4F5C",value:"\u6447\u5C3E\u5DF4\u3001\u6B6A\u5934\u5F20\u671B"},{label:"\u559C\u6B22",value:"\u91D1\u8272\u7684\u9EA6\u6D6A"}]},{id:"king",name:"\u56FD\u738B",subtitle:"\u5750\u5728\u738B\u5EA7\u4E0A\u7684\u8001\u56FD\u738B",category:"characters",target:[6.05,1.2+1.8,-2.15],offset:[0,0,0],marker:[6.05,1.2+3,-2.15],characterId:"king",distance:3.2,height:.8,angle:.4,lift:1,cutaway:!0,paragraphs:["\u56FD\u738B\u7A7F\u7740\u4E00\u4EF6\u94FA\u6EE1\u5730\u9762\u7684\u7EEF\u7EA2\u8272\u957F\u888D\uFF0C\u4E0B\u6446\u548C\u9886\u53E3\u90FD\u9576\u7740\u96EA\u767D\u7684\u8C82\u76AE\uFF0C\u4E0A\u9762\u70B9\u7F00\u7740\u9ED1\u8272\u6591\u70B9\u3002\u4ED6\u5934\u6234\u516D\u5C16\u91D1\u51A0\uFF0C\u7559\u7740\u96EA\u767D\u7684\u957F\u80E1\u5B50\uFF0C\u53F3\u624B\u63E1\u7740\u9876\u7AEF\u6709\u91D1\u7403\u7684\u6743\u6756\u3002","\u4ED6\u5750\u5728\u738B\u5EA7\u5927\u5385\u5317\u7AEF\u7684\u9540\u91D1\u738B\u5EA7\u4E0A\uFF0C\u65F6\u4E0D\u65F6\u62AC\u8D77\u6743\u6756\u505A\u51FA\u53D1\u53F7\u65BD\u4EE4\u7684\u6837\u5B50\uFF0C\u518D\u6162\u6162\u73AF\u987E\u7A7A\u8361\u8361\u7684\u5927\u5385\u3002\u4ED6\u5F88\u8BB2\u9053\u7406\uFF1A\u53EA\u4E0B\u8FBE\u4EBA\u4EEC\u80FD\u505A\u5230\u7684\u547D\u4EE4\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u738B\u5EA7\u5927\u5385 \xB7 \u738B\u5EA7"},{label:"\u670D\u9970",value:"\u8C82\u76AE\u7EA2\u888D \xB7 \u91D1\u51A0 \xB7 \u6743\u6756"},{label:"\u6027\u683C",value:"\u5A01\u4E25\uFF0C\u4F46\u901A\u60C5\u8FBE\u7406"}]},{id:"lamplighter",name:"\u70B9\u706F\u4EBA",subtitle:"\u57CE\u5899\u4E0A\u6C38\u4E0D\u505C\u6B47\u7684\u5DE5\u4F5C",category:"characters",target:[-6.2,1.2+6,8.95],offset:[0,0,0],marker:[-5.6,1.2+8.2,8.95],characterId:"lamplighter",distance:3.4,height:1,angle:.6,paragraphs:["\u5728\u5357\u5899\u7684\u6B65\u9053\u4E0A\uFF0C\u7AD9\u7740\u4E00\u4F4D\u6234\u6DF1\u84DD\u8272\u5E3D\u5B50\u3001\u7559\u7740\u5C0F\u80E1\u5B50\u7684\u70B9\u706F\u4EBA\u3002\u4ED6\u8EAB\u8FB9\u6709\u4E00\u76CF\u94C1\u8DEF\u706F\uFF0C\u624B\u91CC\u63E1\u7740\u4E00\u6839\u9876\u7AEF\u71C3\u7740\u5C0F\u706B\u82D7\u7684\u957F\u6746\u3002","\u6BCF\u9694\u51E0\u79D2\u949F\uFF0C\u4ED6\u5C31\u4E3E\u8D77\u957F\u6746\u70B9\u4EAE\u8DEF\u706F\uFF0C\u518D\u8FC7\u51E0\u79D2\u53C8\u628A\u5B83\u7184\u706D\u2014\u2014\u65E5\u590D\u4E00\u65E5\uFF0C\u4ECE\u4E0D\u5077\u61D2\u3002\u591C\u91CC\uFF0C\u8FD9\u76CF\u706F\u4F1A\u5728\u57CE\u5899\u4E0A\u6295\u4E0B\u4E00\u5C0F\u5708\u6E29\u6696\u7684\u5149\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u5357\u5899\u57CE\u5899\u6B65\u9053"},{label:"\u5DE5\u5177",value:"\u70B9\u706F\u957F\u6746 \xB7 \u94C1\u8DEF\u706F"},{label:"\u8282\u594F",value:"\u7EA6\u6BCF 3 \u79D2\u70B9\u4EAE\u6216\u7184\u706D\u4E00\u6B21"}]},{id:"geographer",name:"\u5730\u7406\u5B66\u5BB6",subtitle:"\u661F\u8C61\u53F0\u4E0A\u7684\u767D\u80E1\u5B50\u8001\u4EBA",category:"characters",target:[5.55,1.2+15.9,-7.55],offset:[0,0,0],marker:[5.6,1.2+17.4,-7.5],characterId:"geographer",distance:3.2,height:.9,angle:.7,paragraphs:["\u4ED6\u5934\u6234\u4E00\u9876\u6DF1\u84DD\u8272\u7684\u5C16\u5E3D\uFF0C\u9F3B\u6881\u4E0A\u67B6\u7740\u4E00\u526F\u5706\u5706\u7684\u91D1\u6846\u773C\u955C\uFF0C\u96EA\u767D\u7684\u5927\u80E1\u5B50\u4E00\u76F4\u5782\u5230\u80F8\u53E3\uFF0C\u8EAB\u7A7F\u7070\u7D2B\u8272\u957F\u888D\uFF0C\u814B\u4E0B\u5939\u7740\u4E00\u672C\u539A\u539A\u7684\u76AE\u9762\u7B14\u8BB0\u3002","\u4ED6\u5728\u661F\u8FB0\u5854\u9876\u8BB0\u5F55\u7740\u5C9B\u4E0A\u6BCF\u4E00\u5EA7\u5C71\u3001\u6BCF\u4E00\u6761\u6CB3\u7684\u4F4D\u7F6E\u3002\u4ED6\u7684\u5934\u4F1A\u5728\u5730\u7403\u4EEA\u548C\u671B\u8FDC\u955C\u4E4B\u95F4\u6765\u56DE\u8F6C\u52A8\uFF0C\u50CF\u5728\u6838\u5BF9\u4EC0\u4E48\u91CD\u8981\u7684\u6570\u636E\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u661F\u8FB0\u5854 \xB7 \u661F\u8C61\u53F0"},{label:"\u7279\u5F81",value:"\u767D\u80E1\u5B50 \xB7 \u5706\u773C\u955C \xB7 \u5C16\u5E3D"},{label:"\u5DE5\u4F5C",value:"\u7ED8\u5236\u6D6E\u7A7A\u5C9B\u7684\u5730\u56FE"}]},{id:"knight",name:"\u5B88\u536B\u9A91\u58EB",subtitle:"\u4E1C\u5899\u4E0A\u5F80\u8FD4\u5DE1\u903B",category:"characters",target:[9,1.2+6,0],offset:[0,0,0],marker:[9,1.2+7.4,0],characterId:"knight",distance:3.6,height:1.2,angle:.9,paragraphs:["\u9A91\u58EB\u8EAB\u7A7F\u94F6\u7070\u8272\u94E0\u7532\uFF0C\u5916\u7F69\u4E00\u4EF6\u7EE3\u7740\u91D1\u8272\u65B9\u5757\u7684\u6DF1\u84DD\u8272\u7F69\u888D\uFF1B\u5934\u76D4\u4E0A\u5F00\u7740\u4E00\u9053\u7A84\u7A84\u7684\u89C6\u7F1D\uFF0C\u9876\u4E0A\u63D2\u7740\u4E00\u7C07\u7EA2\u8272\u7FBD\u9970\u3002\u4ED6\u5DE6\u81C2\u630E\u7740\u84DD\u8272\u5706\u76FE\uFF0C\u53F3\u624B\u63E1\u7740\u957F\u77DB\u3002","\u4ED6\u6CBF\u7740\u4E1C\u5899\u7684\u57CE\u5899\u6B65\u9053\u6765\u56DE\u5DE1\u903B\uFF0C\u8D70\u5230\u5C3D\u5934\u5C31\u8F6C\u8EAB\uFF0C\u6B65\u4F10\u4E00\u677F\u4E00\u773C\uFF0C\u76D4\u7532\u968F\u7740\u811A\u6B65\u8F7B\u8F7B\u8D77\u4F0F\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u4E1C\u4FA7\u57CE\u5899\u6B65\u9053"},{label:"\u88C5\u5907",value:"\u94E0\u7532 \xB7 \u5706\u76FE \xB7 \u957F\u77DB \xB7 \u7EA2\u7FBD\u76D4"},{label:"\u52A8\u4F5C",value:"\u6301\u7EED\u5F80\u8FD4\u5DE1\u903B"}]},{id:"princess",name:"\u5C0F\u516C\u4E3B",subtitle:"\u85CF\u4E66\u5BA4\u91CC\u7684\u8BFB\u4E66\u4EBA",category:"characters",target:[.6,Il+1.1,-4.75],offset:[0,0,0],marker:[.6,Il+1.8,-4.4],characterId:"princess",distance:2.6,height:.9,angle:2.6,lift:.7,cutaway:!0,paragraphs:["\u5979\u7A7F\u7740\u4E00\u6761\u6DE1\u73AB\u7470\u8272\u7684\u957F\u88D9\uFF0C\u6817\u8272\u957F\u53D1\u5782\u5230\u80CC\u540E\uFF0C\u5934\u9876\u6234\u7740\u4E00\u5708\u7EC6\u7EC6\u7684\u91D1\u51A0\u3002","\u5979\u5750\u5728\u85CF\u4E66\u5BA4\u7684\u9605\u8BFB\u684C\u524D\uFF0C\u53CC\u624B\u6367\u7740\u4E00\u672C\u6DF1\u84DD\u8272\u5C01\u9762\u7684\u4E66\uFF0C\u5076\u5C14\u6B6A\u4E00\u4E0B\u5934\uFF0C\u50CF\u662F\u8BFB\u5230\u4E86\u5F88\u6709\u610F\u601D\u7684\u4E00\u6BB5\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u4E3B\u5821\u4E8C\u5C42 \xB7 \u85CF\u4E66\u5BA4"},{label:"\u7279\u5F81",value:"\u73AB\u7470\u8272\u957F\u88D9 \xB7 \u91D1\u51A0"},{label:"\u7231\u597D",value:"\u8BFB\u4E66"}]},{id:"cook",name:"\u53A8\u5A18",subtitle:"\u5B88\u7740\u5927\u9505\u7684\u4EBA",category:"characters",target:[-6.15,1.2+1,6.85],offset:[0,0,0],marker:[-6.15,1.2+2.4,6.85],characterId:"cook",distance:2.8,height:1,angle:.4,cutaway:!0,paragraphs:["\u5979\u6234\u7740\u9AD8\u9AD8\u7684\u767D\u8272\u53A8\u5E08\u5E3D\uFF0C\u7CFB\u7740\u4E00\u6761\u7C73\u9EC4\u8272\u56F4\u88D9\uFF0C\u624B\u91CC\u63E1\u7740\u4E00\u628A\u957F\u67C4\u6728\u52FA\u3002","\u5979\u7AD9\u5728\u7076\u53F0\u524D\uFF0C\u4E00\u5708\u4E00\u5708\u5730\u6405\u7740\u5927\u9505\u91CC\u7684\u6D53\u6C64\uFF0C\u65F6\u4E0D\u65F6\u63A2\u5934\u770B\u770B\u706B\u5019\u3002\u6574\u5EA7\u57CE\u5821\u7684\u9762\u5305\u3001\u6D53\u6C64\u548C\u70E4\u9E21\u90FD\u51FA\u81EA\u5979\u7684\u624B\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u53A8\u623F\u7076\u53F0\u524D"},{label:"\u7279\u5F81",value:"\u767D\u8272\u9AD8\u5E3D \xB7 \u56F4\u88D9 \xB7 \u957F\u52FA"},{label:"\u62FF\u624B\u83DC",value:"\u852C\u83DC\u6D53\u6C64\u4E0E\u70E4\u9762\u5305"}]},{id:"smith",name:"\u94C1\u5320",subtitle:"\u53EE\u5F53\u4F5C\u54CD\u7684\u94C1\u9524",category:"characters",target:[5.85,1.2+1,6.9],offset:[0,0,0],marker:[5.85,1.2+2.4,6.9],characterId:"smith",distance:3,height:1,angle:-.9,paragraphs:["\u4ED6\u7559\u7740\u68D5\u8272\u7684\u7EDC\u816E\u80E1\uFF0C\u7CFB\u7740\u4E00\u6761\u539A\u539A\u7684\u76AE\u56F4\u88D9\uFF0C\u53F3\u624B\u62A1\u7740\u4E00\u628A\u94C1\u9524\u3002","\u4ED6\u7AD9\u5728\u94C1\u7827\u524D\u53CD\u590D\u6572\u6253\u70E7\u7EA2\u7684\u94C1\u5757\uFF0C\u4E3A\u9A91\u58EB\u4FEE\u8865\u76D4\u7532\uFF0C\u4E3A\u6751\u6C11\u6253\u9020\u9A6C\u8E44\u94C1\u548C\u519C\u5177\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u94C1\u5320\u94FA\u94C1\u7827\u65C1"},{label:"\u7279\u5F81",value:"\u7EDC\u816E\u80E1 \xB7 \u76AE\u56F4\u88D9 \xB7 \u94C1\u9524"},{label:"\u4F5C\u54C1",value:"\u9A6C\u8E44\u94C1\u3001\u519C\u5177\u4E0E\u76D4\u7532"}]},{id:"monk",name:"\u4FEE\u58EB",subtitle:"\u793C\u62DC\u5802\u91CC\u7684\u7948\u7977",category:"characters",target:[-6.55,1.2+1,-.9],offset:[0,0,0],marker:[-6.55,1.2+2.4,-.9],characterId:"monk",distance:2.6,height:1.2,angle:2.7,cutaway:!0,paragraphs:["\u4ED6\u62AB\u7740\u68D5\u8272\u7684\u8FDE\u5E3D\u957F\u888D\uFF0C\u8170\u95F4\u7CFB\u7740\u4E00\u6839\u7C73\u767D\u8272\u7684\u7EF3\u5E26\u3002","\u4ED6\u9762\u671D\u796D\u575B\u7AD9\u7740\uFF0C\u53CC\u624B\u5408\u5728\u80F8\u524D\uFF0C\u5934\u4E00\u4F4E\u4E00\u62AC\u5730\u9ED8\u9ED8\u7948\u7977\u3002\u4ED6\u4E5F\u8D1F\u8D23\u6BCF\u5929\u6572\u54CD\u5C4B\u9876\u4E0A\u90A3\u53E3\u91D1\u8272\u7684\u5C0F\u949F\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u793C\u62DC\u5802\u796D\u575B\u524D"},{label:"\u7279\u5F81",value:"\u8FDE\u5E3D\u957F\u888D \xB7 \u7EF3\u5E26"},{label:"\u804C\u8D23",value:"\u7948\u7977\u4E0E\u6572\u949F"}]},{id:"aviator",name:"\u98DE\u884C\u5458",subtitle:"\u6C99\u6F20\u91CC\u8FEB\u964D\u7684\u65C5\u4EBA",category:"characters",target:[14.8,1.5,13.6],offset:[0,0,0],marker:[14.8,Qt(14.8,13.6)+2.2,13.6],characterId:"aviator",distance:3.4,height:1,angle:.6,paragraphs:["\u4ED6\u6234\u7740\u68D5\u8272\u76AE\u98DE\u884C\u5E3D\uFF0C\u989D\u5934\u4E0A\u63A8\u7740\u4E00\u526F\u62A4\u76EE\u955C\uFF0C\u8116\u5B50\u4E0A\u7684\u5976\u6CB9\u8272\u957F\u56F4\u5DFE\u88AB\u98CE\u5439\u5411\u8EAB\u540E\u3002\u4ED6\u7A7F\u7740\u76AE\u5939\u514B\uFF0C\u5DE6\u624B\u62FF\u7740\u4E00\u672C\u901F\u5199\u672C\uFF0C\u53F3\u624B\u6B63\u5728\u753B\u753B\u3002","\u4ED6\u7684\u7EA2\u767D\u8272\u5355\u7FFC\u98DE\u673A\u5C31\u659C\u63D2\u5728\u4E0D\u8FDC\u5904\u7684\u6C99\u4E18\u91CC\uFF0C\u4E00\u8FB9\u673A\u7FFC\u57CB\u8FDB\u6C99\u4E2D\uFF0C\u87BA\u65CB\u6868\u4E5F\u6B6A\u4E86\u3002\u65C1\u8FB9\u653E\u7740\u7EA2\u8272\u5DE5\u5177\u7BB1\u548C\u6C34\u58F6\u2014\u2014\u4FEE\u597D\u98DE\u673A\u4E4B\u524D\uFF0C\u4ED6\u6709\u7684\u662F\u65F6\u95F4\u753B\u753B\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u4E1C\u5357\u6C99\u6F20"},{label:"\u7279\u5F81",value:"\u98DE\u884C\u5E3D \xB7 \u62A4\u76EE\u955C \xB7 \u957F\u56F4\u5DFE"},{label:"\u6B63\u5728\u505A",value:"\u5728\u901F\u5199\u672C\u4E0A\u753B\u753B"}]},{id:"villagers",name:"\u6751\u6C11\u4E0E\u7F8A\u7FA4",subtitle:"\u96C6\u5E02\u3001\u95F2\u804A\u4E0E\u5403\u8349\u7684\u7F8A",category:"characters",target:[-3,2,21],offset:[0,0,0],marker:[-2.9,Qt(-2.9,20.8)+2.2,20.8],characterId:"villager-a",distance:4.5,height:1.8,angle:.9,paragraphs:["\u6751\u53E3\u7684\u5C0F\u5E7F\u573A\u4E0A\uFF0C\u4E24\u4F4D\u6234\u8349\u5E3D\u7684\u6751\u6C11\u6B63\u5728\u804A\u5929\uFF0C\u4E00\u8FB9\u8BF4\u4E00\u8FB9\u6BD4\u5212\uFF1B\u96C6\u5E02\u644A\u4F4D\u540E\u9762\u7AD9\u7740\u4E00\u4F4D\u5356\u6C34\u679C\u7684\u5546\u8D29\uFF0C\u7EA2\u767D\u6761\u7EB9\u7684\u906E\u9633\u7BF7\u4E0B\u6446\u6EE1\u4E86\u6A59\u5B50\u3001\u82F9\u679C\u548C\u68A8\u3002","\u5F80\u897F\u5317\u7684\u8349\u5761\u4E0A\uFF0C\u56DB\u53EA\u6BDB\u8338\u8338\u7684\u767D\u7F8A\u4F4E\u5934\u5403\u8349\uFF0C\u5403\u4E00\u4F1A\u513F\u5C31\u62AC\u8D77\u5934\u5F20\u671B\u3002\u5B83\u4EEC\u4E5F\u8BB8\u548C\u5C0F\u738B\u5B50\u7BB1\u5B50\u91CC\u7684\u90A3\u53EA\u7F8A\u662F\u4EB2\u621A\u3002"],facts:[{label:"\u4F4D\u7F6E",value:"\u5357\u90E8\u5C0F\u6751\u5E84\u4E0E\u8349\u5761"},{label:"\u4EBA\u6570",value:"\u6751\u6C11 2 \u4F4D \xB7 \u5546\u8D29 1 \u4F4D"},{label:"\u52A8\u7269",value:"\u767D\u7F8A 4 \u53EA"}]},{id:"wheat",name:"\u9EA6\u7530\u4E0E\u98CE\u8F66",subtitle:"\u91D1\u8272\u9EA6\u6D6A\u4E0E\u8F6C\u52A8\u7684\u98CE\u8F66",category:"terrain",target:[-18,1.5,-14],offset:[10,9,15],marker:[-17,Qt(-17,-16)+3.4,-16],paragraphs:["\u5C9B\u7684\u897F\u5317\u89D2\u662F\u4E00\u7247\u56DB\u65B9\u5F62\u7684\u91D1\u8272\u9EA6\u7530\uFF0C\u4E0A\u5343\u682A\u9EA6\u7A57\u968F\u98CE\u8D77\u4F0F\uFF0C\u4E2D\u95F4\u51E0\u6761\u7530\u57C2\u628A\u5B83\u5206\u6210\u6574\u9F50\u7684\u957F\u6761\u3002\u9EA6\u7530\u4E2D\u592E\u7AD9\u7740\u4E00\u4E2A\u6234\u8349\u5E3D\u7684\u7A3B\u8349\u4EBA\uFF0C\u56DB\u5468\u56F4\u7740\u6728\u6805\u680F\uFF0C\u5357\u4FA7\u7559\u6709\u5165\u53E3\u3002","\u9EA6\u7530\u897F\u8FB9\u662F\u4E00\u5EA7\u5976\u6CB9\u8272\u7684\u5706\u5F62\u98CE\u8F66\uFF0C\u7EA2\u8910\u8272\u9525\u9876\uFF0C\u56DB\u7247\u5E06\u5E03\u98CE\u53F6\u6162\u6162\u8F6C\u52A8\u3002\u4E00\u6761\u571F\u8DEF\u4ECE\u57CE\u5821\u897F\u4FA7\u5C0F\u95E8\u51FA\u53D1\uFF0C\u7ECF\u8FC7\u9EA6\u7530\u5357\u8FB9\uFF0C\u4E00\u76F4\u901A\u5230\u98CE\u8F66\u95E8\u524D\u3002"],facts:[{label:"\u9762\u79EF",value:"\u7EA6 8.5 \xD7 7.5 \u7C73"},{label:"\u5730\u6807",value:"\u7A3B\u8349\u4EBA \xB7 \u98CE\u8F66 \xB7 \u6728\u6805\u680F"},{label:"\u52A8\u6001",value:"\u9EA6\u7A57\u968F\u98CE\u6447\u6446"}]},{id:"mountain",name:"\u96EA\u5C71",subtitle:"\u4E1C\u5317\u89D2\u7684\u79EF\u96EA\u5C71\u5CF0",category:"terrain",target:[17,6,-15],offset:[18,5,14],marker:[17,15,-15],paragraphs:["\u4E1C\u5317\u65B9\u9686\u8D77\u4E00\u5EA7\u5C0F\u96EA\u5C71\uFF0C\u5C71\u810A\u5448\u653E\u5C04\u72B6\u8D77\u4F0F\u3002\u5C71\u811A\u662F\u8349\u5730\u548C\u96F6\u661F\u7684\u677E\u6811\uFF0C\u5F80\u4E0A\u8FC7\u6E21\u6210\u7070\u8910\u8272\u7684\u5CA9\u5761\uFF0C\u6700\u9AD8\u5904\u8986\u76D6\u7740\u4E00\u9876\u767D\u96EA\uFF0C\u6700\u9760\u8FD1\u5C71\u9876\u7684\u51E0\u68F5\u677E\u6811\u4E5F\u843D\u4E86\u96EA\u3002","\u4E00\u6761\u5C0F\u5F84\u4ECE\u57CE\u5821\u5317\u5899\u7684\u4FA7\u95E8\u51FA\u53D1\uFF0C\u873F\u8712\u901A\u5230\u5C71\u811A\u3002\u5C71\u5761\u4E0A\u6563\u843D\u7740\u5927\u5C0F\u4E0D\u4E00\u7684\u5CA9\u77F3\u3002"],facts:[{label:"\u9AD8\u5EA6",value:"\u7EA6 12.5 \u7C73"},{label:"\u5206\u5C42",value:"\u8349\u5730 \u2192 \u677E\u6797 \u2192 \u5CA9\u5761 \u2192 \u96EA\u9876"},{label:"\u901A\u9053",value:"\u5317\u5899\u4FA7\u95E8\u7684\u5C71\u5F84"}]},{id:"lake",name:"\u6E56\u6CCA\u4E0E\u7011\u5E03",subtitle:"\u4ECE\u5C9B\u8FB9\u843D\u5165\u4E91\u6D77\u7684\u6D41\u6C34",category:"terrain",target:[-26,-2,11],offset:[-10,5,18],marker:[-19,2.4,9],paragraphs:["\u57CE\u5821\u897F\u5357\u662F\u4E00\u6C6A\u78A7\u7EFF\u8272\u7684\u5706\u6E56\uFF0C\u6E56\u9762\u6F02\u7740\u7761\u83B2\u53F6\u548C\u51E0\u6735\u7C89\u8272\u7684\u82B1\uFF0C\u4E00\u5708\u5708\u6D9F\u6F2A\u4E0D\u65AD\u6269\u6563\u3002\u4E1C\u5CB8\u6709\u4E00\u5EA7\u5C0F\u6728\u7801\u5934\uFF0C\u65C1\u8FB9\u7CFB\u7740\u4E00\u6761\u5C0F\u5212\u8247\uFF0C\u968F\u6C34\u6CE2\u8F7B\u8F7B\u6447\u6643\u3002","\u6E56\u6C34\u4ECE\u897F\u5CB8\u6D41\u51FA\uFF0C\u6C47\u6210\u4E00\u6761\u5C0F\u6EAA\uFF0C\u4E00\u76F4\u6D41\u5230\u5C9B\u7684\u8FB9\u7F18\uFF0C\u7136\u540E\u4ECE\u60AC\u5D16\u4E0A\u503E\u6CFB\u800C\u4E0B\uFF0C\u53D8\u6210\u4E00\u9053\u7EC6\u957F\u7684\u7011\u5E03\u3002\u6C34\u6D41\u8D8A\u843D\u8D8A\u6563\uFF0C\u6700\u540E\u5316\u6210\u4E00\u56E2\u56E2\u767D\u96FE\uFF0C\u878D\u8FDB\u4E0B\u65B9\u7684\u4E91\u6D77\u91CC\u3002"],facts:[{label:"\u6E56\u6CCA",value:"\u534A\u5F84\u7EA6 6 \u7C73"},{label:"\u7011\u5E03",value:"\u843D\u5DEE\u7EA6 30 \u7C73\uFF0C\u672B\u7AEF\u5316\u96FE"},{label:"\u8BBE\u65BD",value:"\u6728\u7801\u5934 \xB7 \u5C0F\u5212\u8247"}]},{id:"desert",name:"\u6C99\u6F20",subtitle:"\u8FEB\u964D\u7684\u98DE\u673A\u4E0E\u8D77\u4F0F\u7684\u6C99\u4E18",category:"terrain",target:[17.5,1.2,15],offset:[7,6.5,11],marker:[17,Qt(17,15)+3,15],paragraphs:["\u5C9B\u7684\u4E1C\u5357\u89D2\u662F\u4E00\u7247\u5C0F\u5C0F\u7684\u6C99\u6F20\uFF0C\u6C99\u4E18\u4E00\u9053\u9053\u8D77\u4F0F\uFF0C\u96F6\u661F\u6563\u843D\u7740\u6D45\u9EC4\u8272\u7684\u77F3\u5934\uFF0C\u548C\u5468\u56F4\u7684\u7EFF\u8272\u8349\u5730\u5F62\u6210\u9C9C\u660E\u5BF9\u6BD4\u3002","\u4E00\u67B6\u7EA2\u767D\u76F8\u95F4\u7684\u5355\u7FFC\u98DE\u673A\u659C\u63D2\u5728\u6C99\u4E18\u4E0A\uFF1A\u673A\u5934\u5FAE\u5FAE\u671D\u4E0B\uFF0C\u4E00\u4FA7\u673A\u7FFC\u9677\u8FDB\u6C99\u91CC\uFF0C\u87BA\u65CB\u6868\u4E5F\u6B6A\u4E86\u3002\u98DE\u884C\u5458\u5750\u5728\u65C1\u8FB9\u753B\u753B\uFF0C\u7B49\u7740\u6709\u4E00\u5929\u628A\u5B83\u4FEE\u597D\u3002"],facts:[{label:"\u8303\u56F4",value:"\u534A\u5F84\u7EA6 7 \u7C73"},{label:"\u5730\u6807",value:"\u8FEB\u964D\u7684\u5355\u7FFC\u98DE\u673A"},{label:"\u4EBA\u7269",value:"\u98DE\u884C\u5458"}]},{id:"volcanoes",name:"\u4E09\u5EA7\u5C0F\u706B\u5C71",subtitle:"\u4E24\u5EA7\u6D3B\u706B\u5C71\uFF0C\u4E00\u5EA7\u4F11\u7720",category:"terrain",target:[25,2,1],offset:[13,6,6],marker:[25.2,6.6,1],paragraphs:["\u5C9B\u7684\u4E1C\u7F18\u6392\u7740\u4E09\u5EA7\u53EA\u5230\u819D\u76D6\u9AD8\u7684\u5C0F\u706B\u5C71\u3002\u5317\u8FB9\u4E24\u5EA7\u662F\u6D3B\u706B\u5C71\uFF0C\u706B\u5C71\u53E3\u91CC\u4EAE\u7740\u6A58\u7EA2\u8272\u7684\u7194\u5CA9\uFF0C\u5192\u7740\u4E00\u7F15\u7F15\u7070\u767D\u8272\u7684\u70DF\uFF1B\u5357\u8FB9\u90A3\u5EA7\u5DF2\u7ECF\u4F11\u7720\uFF0C\u706B\u5C71\u53E3\u91CC\u957F\u6EE1\u4E86\u9752\u8349\u3002","\u5B83\u4EEC\u90FD\u5F88\u6E29\u987A\uFF0C\u53EA\u8981\u5B9A\u671F\u6E05\u626B\uFF0C\u5C31\u4F1A\u5E73\u7A33\u5730\u71C3\u70E7\uFF0C\u4E0D\u4F1A\u55B7\u53D1\u2014\u2014\u4F4F\u5728\u5C9B\u4E0A\u7684\u4EBA\u6709\u65F6\u8FD8\u4F1A\u7528\u5B83\u4EEC\u6765\u70ED\u65E9\u9910\u3002"],facts:[{label:"\u6570\u91CF",value:"\u6D3B\u706B\u5C71 2 \u5EA7 \xB7 \u4F11\u7720 1 \u5EA7"},{label:"\u7279\u5F81",value:"\u7194\u5CA9\u5149 \xB7 \u7F13\u7F13\u5192\u70DF"},{label:"\u4F4D\u7F6E",value:"\u4E1C\u90E8\u8FB9\u7F18"}]},{id:"forest",name:"\u68EE\u6797\u4E0E\u7334\u9762\u5305\u6811",subtitle:"\u5317\u8FB9\u7684\u6797\u5730\u4E0E\u5DE8\u5927\u7684\u6811",category:"terrain",target:[-2,2,-22],offset:[8,12,-22],marker:[1,7,-24],paragraphs:["\u5C9B\u7684\u5317\u90E8\u662F\u4E00\u7247\u6DF7\u4EA4\u6797\uFF1A\u5706\u6EDA\u6EDA\u7684\u9614\u53F6\u6811\u3001\u7EC6\u9AD8\u7684\u767D\u6768\u548C\u5C42\u5C42\u53E0\u53E0\u7684\u677E\u6811\u6324\u5728\u4E00\u8D77\uFF0C\u6797\u95F4\u70B9\u7F00\u7740\u77EE\u704C\u6728\u548C\u7070\u8272\u5CA9\u77F3\u3002","\u5728\u5C9B\u7684\u897F\u5317\u548C\u5317\u90E8\u8FB9\u7F18\uFF0C\u957F\u7740\u51E0\u68F5\u5DE8\u5927\u7684\u7334\u9762\u5305\u6811\uFF1A\u7C97\u58EE\u7684\u6811\u5E72\u50CF\u4E00\u53EA\u5927\u9152\u74F6\uFF0C\u6839\u7CFB\u5411\u56DB\u5468\u4F38\u5C55\uFF0C\u6811\u51A0\u6241\u5E73\u5730\u644A\u5F00\u3002\u897F\u5357\u5C0F\u5C71\u4E18\u9644\u8FD1\u8FD8\u5192\u51FA\u4E86\u4E24\u68F5\u5C0F\u6811\u82D7\u2014\u2014\u5F97\u8D81\u5B83\u4EEC\u8FD8\u5C0F\u7684\u65F6\u5019\u53CA\u65F6\u62D4\u6389\u624D\u884C\u3002"],facts:[{label:"\u6811\u79CD",value:"\u9614\u53F6\u6811 \xB7 \u767D\u6768 \xB7 \u677E\u6811 \xB7 \u7334\u9762\u5305\u6811"},{label:"\u7334\u9762\u5305\u6811",value:"\u5927\u6811 3 \u68F5 \xB7 \u6811\u82D7 2 \u68F5"},{label:"\u4F4D\u7F6E",value:"\u5317\u90E8\u4E0E\u897F\u5317\u8FB9\u7F18"}]},{id:"village",name:"\u5C0F\u6751\u5E84",subtitle:"\u534A\u6728\u7ED3\u6784\u7684\u5C0F\u5C4B\u4E0E\u96C6\u5E02",category:"terrain",target:[-2,2,22.5],offset:[6,8,13],marker:[-2,6,22.5],paragraphs:["\u57CE\u95E8\u5916\u7684\u5927\u8DEF\u5411\u5357\u5EF6\u4F38\uFF0C\u901A\u5F80\u4E00\u5EA7\u5C0F\u6751\u5E84\u3002\u4E94\u5EA7\u534A\u6728\u7ED3\u6784\u7684\u5C0F\u5C4B\u56F4\u7740\u4E00\u4E2A\u5C0F\u5E7F\u573A\uFF1A\u5976\u6CB9\u8272\u7684\u5899\uFF0C\u6DF1\u8272\u6728\u6881\u4EA4\u53C9\u6210\u659C\u6491\uFF0C\u5C4B\u9876\u6709\u73AB\u7470\u8272\u3001\u84DD\u8272\u3001\u77F3\u677F\u7070\u548C\u7EA2\u8910\u8272\uFF0C\u7A97\u53F0\u4E0B\u7684\u82B1\u7BB1\u91CC\u5F00\u7740\u9EC4\u8272\u548C\u7C89\u8272\u7684\u5C0F\u82B1\u3002","\u5E7F\u573A\u4E0A\u6709\u4E00\u53E3\u5E26\u5C0F\u5C4B\u9876\u7684\u6C34\u4E95\u3001\u4E00\u5EA7\u7EA2\u767D\u6761\u7EB9\u906E\u9633\u7BF7\u7684\u6C34\u679C\u644A\u548C\u4E00\u5757\u6307\u8DEF\u6728\u724C\u3002\u5176\u4E2D\u4E00\u5EA7\u5C0F\u5C4B\u662F\u9762\u5305\u574A\uFF0C\u70DF\u56F1\u91CC\u98D8\u7740\u767D\u70DF\u3002\u9053\u8DEF\u4ECE\u8FD9\u91CC\u5206\u522B\u901A\u5F80\u897F\u8FB9\u7684\u5C0F\u5C71\u4E18\u548C\u4E1C\u8FB9\u7684\u6C99\u6F20\u3002"],facts:[{label:"\u623F\u5C4B",value:"5 \u5EA7\uFF08\u542B\u9762\u5305\u574A\uFF09"},{label:"\u8BBE\u65BD",value:"\u6C34\u4E95 \xB7 \u96C6\u5E02\u644A\u4F4D \xB7 \u8DEF\u724C"},{label:"\u9053\u8DEF",value:"\u901A\u5F80\u57CE\u5821\u3001\u5C71\u4E18\u4E0E\u6C99\u6F20"}]},{id:"underside",name:"\u6D6E\u5C9B\u6839\u57FA",subtitle:"\u5012\u60AC\u7684\u5CA9\u77F3\u4E0E\u53D1\u5149\u6676\u4F53",category:"terrain",target:[0,-13,0],offset:[34,-10,40],marker:[0,-20,0],paragraphs:["\u6D6E\u7A7A\u5C9B\u7684\u4E0B\u534A\u90E8\u5206\u50CF\u4E00\u5EA7\u5012\u8FC7\u6765\u7684\u5C71\uFF1A\u8349\u76AE\u8FB9\u7F18\u5FAE\u5FAE\u5916\u7FFB\uFF0C\u4E0B\u9762\u662F\u4E00\u5C42\u6DF1\u8910\u8272\u7684\u571F\u58E4\uFF0C\u518D\u5F80\u4E0B\u662F\u4E00\u9053\u9053\u989C\u8272\u6DF1\u6D45\u4EA4\u66FF\u7684\u5CA9\u5C42\uFF0C\u8D8A\u5F80\u4E0B\u8D8A\u7A84\uFF0C\u6700\u540E\u6536\u6210\u4E00\u4E2A\u5C16\u7AEF\u3002","\u8FB9\u7F18\u5782\u4E0B\u8BB8\u591A\u6811\u6839\u548C\u85E4\u8513\uFF0C\u5CA9\u58C1\u4E0A\u5012\u6302\u7740\u5C16\u5C16\u7684\u77F3\u7B0B\uFF0C\u8FD8\u5D4C\u7740\u4E00\u4E9B\u6DE1\u84DD\u8272\u7684\u6676\u4F53\u2014\u2014\u5B83\u4EEC\u4F1A\u5728\u591C\u91CC\u53D1\u51FA\u5FAE\u5149\uFF0C\u4E5F\u8BB8\u6B63\u662F\u8FD9\u4E9B\u6676\u4F53\u8BA9\u6574\u5EA7\u5C9B\u6F02\u6D6E\u5728\u7A7A\u4E2D\u3002"],facts:[{label:"\u6DF1\u5EA6",value:"\u7EA6 26\u201330 \u7C73"},{label:"\u7EC6\u8282",value:"\u6811\u6839 \xB7 \u85E4\u8513 \xB7 \u5012\u6302\u77F3\u7B0B"},{label:"\u6676\u4F53",value:"\u591C\u95F4\u53D1\u51FA\u6DE1\u84DD\u8272\u5FAE\u5149"}]},{id:"sky",name:"\u5929\u7A7A\u4E0E\u663C\u591C",subtitle:"\u6E05\u6668\u3001\u6B63\u5348\u3001\u9EC4\u660F\u4E0E\u661F\u591C",category:"environment",target:[0,4,0],offset:[62,30,70],paragraphs:["\u5929\u7A7A\u7528\u6C34\u5F69\u822C\u67D4\u548C\u7684\u6E10\u53D8\u7ED8\u6210\uFF0C\u53E0\u7740\u4E00\u5C42\u82E5\u6709\u82E5\u65E0\u7684\u7B14\u89E6\u7EB9\u7406\u3002\u6E05\u6668\u662F\u6DE1\u84DD\u4E0E\u871C\u6843\u8272\uFF0C\u6B63\u5348\u662F\u660E\u4EAE\u7684\u6674\u84DD\uFF0C\u9EC4\u660F\u65F6\u5730\u5E73\u7EBF\u88AB\u67D3\u6210\u6A58\u7C89\u8272\uFF0C\u592A\u9633\u5316\u4F5C\u4E00\u4E2A\u6696\u767D\u8272\u7684\u5706\u76D8\u7F13\u7F13\u897F\u6C89\u3002","\u5165\u591C\u540E\u5929\u7A7A\u53D8\u6210\u6DF1\u84DD\uFF0C\u5F2F\u5F2F\u7684\u6708\u7259\u5347\u8D77\uFF0C\u6570\u767E\u9897\u661F\u661F\u4E00\u95EA\u4E00\u95EA\uFF0C\u5176\u4E2D\u51E0\u9897\u7279\u522B\u5927\u7684\u4F1A\u95EA\u51FA\u5341\u5B57\u5149\u8292\u3002\u57CE\u5821\u548C\u6751\u5E84\u7684\u7A97\u6237\u3001\u661F\u8FB0\u5854\u7684\u91D1\u661F\u548C\u5C9B\u5E95\u6676\u4F53\u4F9D\u6B21\u4EAE\u8D77\uFF0C\u8349\u5730\u4E0A\u98DE\u8D77\u70B9\u70B9\u8424\u706B\u866B\u3002\u7528\u4E0B\u65B9\u7684\u65F6\u95F4\u6309\u94AE\u53EF\u4EE5\u5207\u6362\u663C\u591C\u3002"],facts:[{label:"\u65F6\u6BB5",value:"\u6E05\u6668 \xB7 \u6B63\u5348 \xB7 \u9EC4\u660F \xB7 \u661F\u591C"},{label:"\u591C\u666F",value:"\u6708\u7259 \xB7 \u661F\u7A7A \xB7 \u8424\u706B\u866B \xB7 \u7A97\u706F"},{label:"\u5149\u5F71",value:"\u9633\u5149\u6295\u5F71\u968F\u65F6\u95F4\u79FB\u52A8"}]},{id:"clouds",name:"\u4E91\u6D77\u4E0E\u5C0F\u884C\u661F",subtitle:"\u56DB\u5468\u6F02\u6D6E\u7684\u5C0F\u5C9B\u4E0E\u5019\u9E1F",category:"environment",target:[0,-12,0],offset:[80,8,75],marker:[42.9,9,29.4],paragraphs:["\u6D6E\u7A7A\u5C9B\u4E0B\u65B9\u662F\u4E00\u7247\u7EF5\u5EF6\u7684\u4E91\u6D77\uFF0C\u4E91\u6735\u7684\u989C\u8272\u4F1A\u968F\u65F6\u95F4\u53D8\u5316\uFF1A\u767D\u5929\u662F\u5976\u767D\u8272\uFF0C\u9EC4\u660F\u6CDB\u7740\u6A58\u7C89\uFF0C\u591C\u91CC\u67D3\u4E0A\u6DE1\u6DE1\u7684\u84DD\u3002\u66F4\u591A\u7684\u4E91\u56E2\u5728\u5C9B\u7684\u5468\u56F4\u7F13\u7F13\u98D8\u8FC7\u3002","\u8FDC\u5904\u6F02\u6D6E\u7740\u4E94\u9897\u5C0F\u884C\u661F\uFF0C\u6BCF\u4E00\u9897\u4E0A\u90FD\u53EA\u653E\u7740\u4E00\u6837\u4E1C\u897F\uFF1A\u4E00\u76CF\u8DEF\u706F\u3001\u4E00\u5EA7\u5C0F\u623F\u5B50\u3001\u4E00\u68F5\u7334\u9762\u5305\u6811\u3001\u4E00\u6735\u73AB\u7470\u3001\u4E00\u53E3\u5C0F\u4E95\u3002\u5B83\u4EEC\u4E0A\u4E0B\u6D6E\u52A8\u3001\u6162\u6162\u81EA\u8F6C\u3002\u4E00\u7FA4\u767D\u8272\u7684\u5019\u9E1F\u6392\u6210\u4EBA\u5B57\u5F62\uFF0C\u7ED5\u7740\u6D6E\u7A7A\u5C9B\u4E0D\u505C\u76D8\u65CB\u3002"],facts:[{label:"\u4E91\u6D77",value:"\u4F4D\u4E8E\u5C9B\u4E0B\u7EA6 45 \u7C73"},{label:"\u5C0F\u884C\u661F",value:"5 \u9897\uFF0C\u5404\u6709\u4E00\u4EF6\u7269\u54C1"},{label:"\u5019\u9E1F",value:"9 \u53EA\uFF0C\u4EBA\u5B57\u5F62\u7F16\u961F"}]}],hS=new Map(Ll.map(i=>[i.id,i]));var gv=[["\u6E05\u6668",6.9],["\u6B63\u5348",12],["\u9EC4\u660F",17.6],["\u661F\u591C",22.5]];function Dl(i,t){let e=document.createElement("button");return e.type="button",e.textContent=i,e.addEventListener("click",t),e}function sf(){let i=document.getElementById("scene"),t=document.getElementById("bar"),e=document.getElementById("place"),n=document.getElementById("card");if(!i||!t||!e||!n)return;let s;try{s=new Cl(i)}catch{n.hidden=!1,n.textContent="\u4F60\u7684\u6D4F\u89C8\u5668\u4F3C\u4E4E\u65E0\u6CD5\u8FD0\u884C WebGL\uFF0C\u8BF7\u6362\u7528\u6700\u65B0\u7248\u7684 Chrome\u3001Edge \u6216 Safari\u3002";return}s.setTimeOfDay(17.6),s.setAutoRotate(!0);let r=!1,o=!0,a=gv.map(([h,u])=>Dl(h,()=>{s.setTimeOfDay(u),a.forEach(d=>d.classList.toggle("on",d.textContent===h))}));a[2].classList.add("on"),a.forEach(h=>t.appendChild(h));let l=Dl("\u5256\u9762\u89C6\u56FE",()=>{r=!r,s.setCutaway(r),l.classList.toggle("on",r)}),c=Dl("\u81EA\u52A8\u73AF\u6E38",()=>{o=!o,s.setAutoRotate(o),c.classList.toggle("on",o)});c.classList.add("on"),t.append(l,c,Dl("\u590D\u4F4D\u89C6\u89D2",()=>s.resetView()));for(let h of nf){let u=document.createElement("optgroup");u.label=h.label;for(let d of Ll.filter(f=>f.category===h.id)){let f=document.createElement("option");f.value=d.id,f.textContent=`${d.name} \xB7 ${d.subtitle}`,u.appendChild(f)}e.appendChild(u)}e.addEventListener("change",()=>{let h=Ll.find(p=>p.id===e.value);if(!h)return;h.cutaway&&!r&&(r=!0,s.setCutaway(!0),l.classList.add("on")),o=!1,s.setAutoRotate(!1),c.classList.remove("on"),s.focusLocation(h),n.hidden=!1,n.replaceChildren();let u=document.createElement("h2");u.textContent=h.name;let d=document.createElement("p");d.className="sub",d.textContent=h.subtitle,n.append(u,d);for(let p of h.paragraphs){let v=document.createElement("p");v.textContent=p,n.appendChild(v)}let f=document.createElement("dl");for(let p of h.facts){let v=document.createElement("dt");v.textContent=p.label;let g=document.createElement("dd");g.textContent=p.value,f.append(v,g)}n.appendChild(f)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",sf):sf();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
