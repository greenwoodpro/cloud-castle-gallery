"use strict";(()=>{var Ei={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},vu=0,mc=1,bu=2;var Gr=1,va=2,Ds=3,Ti=0,$e=1,yn=2,Zn=0,Ns=1,kr=2,gc=3,_c=4,Mu=5;var qi=100,Su=101,Eu=102,wu=103,Tu=104,Au=200,Ru=201,Cu=202,Pu=203,xc=204,yc=205,Iu=206,Lu=207,Du=208,Nu=209,Uu=210,Fu=211,Ou=212,Bu=213,zu=214,Bo=0,zo=1,Vo=2,_s=3,Ho=4,Go=5,ko=6,Wo=7,vc=0,Vu=1,Hu=2,Un=0,bc=1,Mc=2,Sc=3,Ec=4,wc=5,Tc=6,Ac=7;var Rc=300,Ai=301,Yi=302,ba=303,Ma=304,Wr=306,Xo=1e3,En=1001,qo=1002,Xe=1003,Gu=1004;var Xr=1005;var ze=1006,Sa=1007;var Ri=1008;var dn=1009,Cc=1010,Pc=1011,Us=1012,Ea=1013,Fn=1014,On=1015,Bn=1016,wa=1017,Ta=1018,Fs=1020,Ic=35902,Lc=35899,Dc=1021,Nc=1022,An=1023,Xn=1026,Ci=1027,qr=1028,Aa=1029,Pi=1030,Ra=1031;var Ca=1033,Yr=33776,Zr=33777,Kr=33778,Jr=33779,Pa=35840,Ia=35841,La=35842,Da=35843,Na=36196,Ua=37492,Fa=37496,Oa=37488,Ba=37489,$r=37490,za=37491,Va=37808,Ha=37809,Ga=37810,ka=37811,Wa=37812,Xa=37813,qa=37814,Ya=37815,Za=37816,Ka=37817,Ja=37818,$a=37819,ja=37820,Qa=37821,tl=36492,el=36494,nl=36495,il=36283,sl=36284,jr=36285,rl=36286;var lr=2300,Yo=2301,Fo=2302,ic=2303,sc=2400,rc=2401,oc=2402;var ku=3200;var ol=0,Wu=1,ri="",Ze="srgb",cr="srgb-linear",hr="linear",de="srgb";var Oo=7680;var Xu=519,qu=512,Yu=513,Zu=514,al=515,Ku=516,Ju=517,ll=518,$u=519,ju=35044;var Uc="300 es",Ln=2e3,xs=2001;function qf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Yf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qu(){let i=ur("canvas");return i.style.display="block",i}var Wh={},ys=null;function Fc(...i){let t="THREE."+i.shift();ys?ys("log",t,...i):console.log(t,...i)}function td(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Gt(...i){i=td(i);let t="THREE."+i.shift();if(ys)ys("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function qt(...i){i=td(i);let t="THREE."+i.shift();if(ys)ys("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Gi(...i){let t=i.join(" ");t in Wh||(Wh[t]=!0,Gt(...i))}function ed(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var nd={[Bo]:zo,[Vo]:ko,[Ho]:Wo,[_s]:Go,[zo]:Bo,[ko]:Vo,[Wo]:Ho,[Go]:_s},Dn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xh=1234567,sr=Math.PI/180,vs=180/Math.PI;function Zi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function te(i,t,e){return Math.max(t,Math.min(e,i))}function Oc(i,t){return(i%t+t)%t}function Zf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Kf(i,t,e){return i!==t?(e-i)/(t-i):0}function rr(i,t,e){return(1-e)*i+e*t}function Jf(i,t,e,n){return rr(i,t,1-Math.exp(-e*n))}function $f(i,t=1){return t-Math.abs(Oc(i,t*2)-t)}function jf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Qf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function tp(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ep(i,t){return i+Math.random()*(t-i)}function np(i){return i*(.5-Math.random())}function ip(i){i!==void 0&&(Xh=i);let t=Xh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function sp(i){return i*sr}function rp(i){return i*vs}function op(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function ap(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function lp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cp(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),p=r((t-n)/2),f=o((t-n)/2),u=r((n-t)/2),x=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*p,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*p,a*c);break;case"ZXZ":i.set(l*p,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*x,l*u,a*c);break;case"YXY":i.set(l*u,a*h,l*x,a*c);break;case"ZYZ":i.set(l*x,l*u,a*h,a*c);break;default:Gt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ms(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function on(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Bc={DEG2RAD:sr,RAD2DEG:vs,generateUUID:Zi,clamp:te,euclideanModulo:Oc,mapLinear:Zf,inverseLerp:Kf,lerp:rr,damp:Jf,pingpong:$f,smoothstep:jf,smootherstep:Qf,randInt:tp,randFloat:ep,randFloatSpread:np,seededRandom:ip,degToRad:sp,radToDeg:rp,isPowerOfTwo:op,ceilPowerOfTwo:ap,floorPowerOfTwo:lp,setQuaternionFromProperEuler:cp,normalize:on,denormalize:ms},Wc=class Wc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Wc.prototype.isVector2=!0;var ut=Wc,Oe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],p=n[s+3],f=r[o+0],u=r[o+1],x=r[o+2],b=r[o+3];if(p!==b||l!==f||c!==u||h!==x){let g=l*f+c*u+h*x+p*b;g<0&&(f=-f,u=-u,x=-x,b=-b,g=-g);let m=1-a;if(g<.9995){let w=Math.acos(g),M=Math.sin(w);m=Math.sin(m*w)/M,a=Math.sin(a*w)/M,l=l*m+f*a,c=c*m+u*a,h=h*m+x*a,p=p*m+b*a}else{l=l*m+f*a,c=c*m+u*a,h=h*m+x*a,p=p*m+b*a;let w=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=w,c*=w,h*=w,p*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],p=r[o],f=r[o+1],u=r[o+2],x=r[o+3];return t[e]=a*x+h*p+l*u-c*f,t[e+1]=l*x+h*f+c*p-a*u,t[e+2]=c*x+h*u+a*f-l*p,t[e+3]=h*x-a*p-l*f-c*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),p=a(r/2),f=l(n/2),u=l(s/2),x=l(r/2);switch(o){case"XYZ":this._x=f*h*p+c*u*x,this._y=c*u*p-f*h*x,this._z=c*h*x+f*u*p,this._w=c*h*p-f*u*x;break;case"YXZ":this._x=f*h*p+c*u*x,this._y=c*u*p-f*h*x,this._z=c*h*x-f*u*p,this._w=c*h*p+f*u*x;break;case"ZXY":this._x=f*h*p-c*u*x,this._y=c*u*p+f*h*x,this._z=c*h*x+f*u*p,this._w=c*h*p-f*u*x;break;case"ZYX":this._x=f*h*p-c*u*x,this._y=c*u*p+f*h*x,this._z=c*h*x-f*u*p,this._w=c*h*p+f*u*x;break;case"YZX":this._x=f*h*p+c*u*x,this._y=c*u*p+f*h*x,this._z=c*h*x-f*u*p,this._w=c*h*p-f*u*x;break;case"XZY":this._x=f*h*p-c*u*x,this._y=c*u*p-f*h*x,this._z=c*h*x+f*u*p,this._w=c*h*p+f*u*x;break;default:Gt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],p=e[10],f=n+a+p;if(f>0){let u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(o-s)*u}else if(n>a&&n>p){let u=2*Math.sqrt(1+n-a-p);this._w=(h-l)/u,this._x=.25*u,this._y=(s+o)/u,this._z=(r+c)/u}else if(a>p){let u=2*Math.sqrt(1+a-n-p);this._w=(r-c)/u,this._x=(s+o)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+p-n-a);this._w=(o-s)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Xc=class Xc{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+l*c+o*p-a*h,this.y=n+l*h+a*c-r*p,this.z=s+l*p+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Dl.copy(this).projectOnVector(t),this.sub(Dl)}reflect(t){return this.sub(Dl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Xc.prototype.isVector3=!0;var N=Xc,Dl=new N,qh=new Oe,qc=class qc{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],p=n[7],f=n[2],u=n[5],x=n[8],b=s[0],g=s[3],m=s[6],w=s[1],M=s[4],_=s[7],S=s[2],E=s[5],C=s[8];return r[0]=o*b+a*w+l*S,r[3]=o*g+a*M+l*E,r[6]=o*m+a*_+l*C,r[1]=c*b+h*w+p*S,r[4]=c*g+h*M+p*E,r[7]=c*m+h*_+p*C,r[2]=f*b+u*w+x*S,r[5]=f*g+u*M+x*E,r[8]=f*m+u*_+x*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],p=h*o-a*c,f=a*l-h*r,u=c*r-o*l,x=e*p+n*f+s*u;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/x;return t[0]=p*b,t[1]=(s*c-h*n)*b,t[2]=(a*n-s*o)*b,t[3]=f*b,t[4]=(h*e-s*l)*b,t[5]=(s*r-a*e)*b,t[6]=u*b,t[7]=(n*l-c*e)*b,t[8]=(o*e-n*r)*b,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Gi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Nl.makeScale(t,e)),this}rotate(t){return Gi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Nl.makeRotation(-t)),this}translate(t,e){return Gi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Nl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};qc.prototype.isMatrix3=!0;var Zt=qc,Nl=new Zt,Yh=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zh=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hp(){let i={enabled:!0,workingColorSpace:cr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===de&&(s.r=ii(s.r),s.g=ii(s.g),s.b=ii(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===de&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Gi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Gi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[cr]:{primaries:t,whitePoint:n,transfer:hr,toXYZ:Yh,fromXYZ:Zh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:t,whitePoint:n,transfer:de,toXYZ:Yh,fromXYZ:Zh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}}),i}var re=hp();function ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ns,Zo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ns===void 0&&(ns=ur("canvas")),ns.width=t.width,ns.height=t.height;let s=ns.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ns}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ur("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ii(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ii(e[n]/255)*255):e[n]=ii(e[n]);return{data:e,width:t.width,height:t.height}}else return Gt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},up=0,bs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Zi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ul(s[o].image)):r.push(Ul(s[o]))}else r=Ul(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ul(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Gt("Texture: Unable to serialize Texture."),{})}var dp=0,Fl=new N,an=class i extends Dn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=En,s=En,r=ze,o=Ri,a=An,l=dn,c=i.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Zi(),this.name="",this.source=new bs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fl).x}get height(){return this.source.getSize(Fl).y}get depth(){return this.source.getSize(Fl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Gt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Xo:t.x=t.x-Math.floor(t.x);break;case En:t.x=t.x<0?0:1;break;case qo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Xo:t.y=t.y-Math.floor(t.y);break;case En:t.y=t.y<0?0:1;break;case qo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=Rc;an.DEFAULT_ANISOTROPY=1;var Yc=class Yc{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],p=l[8],f=l[1],u=l[5],x=l[9],b=l[2],g=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(p-b)<.01&&Math.abs(x-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(p+b)<.1&&Math.abs(x+g)<.1&&Math.abs(c+u+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,_=(u+1)/2,S=(m+1)/2,E=(h+f)/4,C=(p+b)/4,y=(x+g)/4;return M>_&&M>S?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=E/n,r=C/n):_>S?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=y/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=C/r,s=y/r),this.set(n,s,r,e),this}let w=Math.sqrt((g-x)*(g-x)+(p-b)*(p-b)+(f-h)*(f-h));return Math.abs(w)<.001&&(w=1),this.x=(g-x)/w,this.y=(p-b)/w,this.z=(f-h)/w,this.w=Math.acos((c+u+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Yc.prototype.isVector4=!0;var Ie=Yc,Ko=class extends Dn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ze,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new an(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new bs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends Ko{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},dr=class extends an{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Jo=class extends an{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ya=class ya{constructor(t,e,n,s,r,o,a,l,c,h,p,f,u,x,b,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,p,f,u,x,b,g)}set(t,e,n,s,r,o,a,l,c,h,p,f,u,x,b,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=p,m[14]=f,m[3]=u,m[7]=x,m[11]=b,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ya().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/is.setFromMatrixColumn(t,0).length(),r=1/is.setFromMatrixColumn(t,1).length(),o=1/is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let f=o*h,u=o*p,x=a*h,b=a*p;e[0]=l*h,e[4]=-l*p,e[8]=c,e[1]=u+x*c,e[5]=f-b*c,e[9]=-a*l,e[2]=b-f*c,e[6]=x+u*c,e[10]=o*l}else if(t.order==="YXZ"){let f=l*h,u=l*p,x=c*h,b=c*p;e[0]=f+b*a,e[4]=x*a-u,e[8]=o*c,e[1]=o*p,e[5]=o*h,e[9]=-a,e[2]=u*a-x,e[6]=b+f*a,e[10]=o*l}else if(t.order==="ZXY"){let f=l*h,u=l*p,x=c*h,b=c*p;e[0]=f-b*a,e[4]=-o*p,e[8]=x+u*a,e[1]=u+x*a,e[5]=o*h,e[9]=b-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let f=o*h,u=o*p,x=a*h,b=a*p;e[0]=l*h,e[4]=x*c-u,e[8]=f*c+b,e[1]=l*p,e[5]=b*c+f,e[9]=u*c-x,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let f=o*l,u=o*c,x=a*l,b=a*c;e[0]=l*h,e[4]=b-f*p,e[8]=x*p+u,e[1]=p,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=u*p+x,e[10]=f-b*p}else if(t.order==="XZY"){let f=o*l,u=o*c,x=a*l,b=a*c;e[0]=l*h,e[4]=-p,e[8]=c*h,e[1]=f*p+b,e[5]=o*h,e[9]=u*p-x,e[2]=x*p-u,e[6]=a*h,e[10]=b*p+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fp,t,pp)}lookAt(t,e,n){let s=this.elements;return pn.subVectors(t,e),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),hi.crossVectors(n,pn),hi.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),hi.crossVectors(n,pn)),hi.normalize(),fo.crossVectors(pn,hi),s[0]=hi.x,s[4]=fo.x,s[8]=pn.x,s[1]=hi.y,s[5]=fo.y,s[9]=pn.y,s[2]=hi.z,s[6]=fo.z,s[10]=pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],p=n[5],f=n[9],u=n[13],x=n[2],b=n[6],g=n[10],m=n[14],w=n[3],M=n[7],_=n[11],S=n[15],E=s[0],C=s[4],y=s[8],A=s[12],R=s[1],I=s[5],L=s[9],U=s[13],D=s[2],B=s[6],k=s[10],W=s[14],Y=s[3],J=s[7],tt=s[11],it=s[15];return r[0]=o*E+a*R+l*D+c*Y,r[4]=o*C+a*I+l*B+c*J,r[8]=o*y+a*L+l*k+c*tt,r[12]=o*A+a*U+l*W+c*it,r[1]=h*E+p*R+f*D+u*Y,r[5]=h*C+p*I+f*B+u*J,r[9]=h*y+p*L+f*k+u*tt,r[13]=h*A+p*U+f*W+u*it,r[2]=x*E+b*R+g*D+m*Y,r[6]=x*C+b*I+g*B+m*J,r[10]=x*y+b*L+g*k+m*tt,r[14]=x*A+b*U+g*W+m*it,r[3]=w*E+M*R+_*D+S*Y,r[7]=w*C+M*I+_*B+S*J,r[11]=w*y+M*L+_*k+S*tt,r[15]=w*A+M*U+_*W+S*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],p=t[6],f=t[10],u=t[14],x=t[3],b=t[7],g=t[11],m=t[15],w=l*u-c*f,M=a*u-c*p,_=a*f-l*p,S=o*u-c*h,E=o*f-l*h,C=o*p-a*h;return e*(b*w-g*M+m*_)-n*(x*w-g*S+m*E)+s*(x*M-b*S+m*C)-r*(x*_-b*E+g*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],p=t[9],f=t[10],u=t[11],x=t[12],b=t[13],g=t[14],m=t[15],w=e*a-n*o,M=e*l-s*o,_=e*c-r*o,S=n*l-s*a,E=n*c-r*a,C=s*c-r*l,y=h*b-p*x,A=h*g-f*x,R=h*m-u*x,I=p*g-f*b,L=p*m-u*b,U=f*m-u*g,D=w*U-M*L+_*I+S*R-E*A+C*y;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/D;return t[0]=(a*U-l*L+c*I)*B,t[1]=(s*L-n*U-r*I)*B,t[2]=(b*C-g*E+m*S)*B,t[3]=(f*E-p*C-u*S)*B,t[4]=(l*R-o*U-c*A)*B,t[5]=(e*U-s*R+r*A)*B,t[6]=(g*_-x*C-m*M)*B,t[7]=(h*C-f*_+u*M)*B,t[8]=(o*L-a*R+c*y)*B,t[9]=(n*R-e*L-r*y)*B,t[10]=(x*E-b*_+m*w)*B,t[11]=(p*_-h*E-u*w)*B,t[12]=(a*A-o*I-l*y)*B,t[13]=(e*I-n*A+s*y)*B,t[14]=(b*M-x*S-g*w)*B,t[15]=(h*S-p*M+f*w)*B,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,p=a+a,f=r*c,u=r*h,x=r*p,b=o*h,g=o*p,m=a*p,w=l*c,M=l*h,_=l*p,S=n.x,E=n.y,C=n.z;return s[0]=(1-(b+m))*S,s[1]=(u+_)*S,s[2]=(x-M)*S,s[3]=0,s[4]=(u-_)*E,s[5]=(1-(f+m))*E,s[6]=(g+w)*E,s[7]=0,s[8]=(x+M)*C,s[9]=(g-w)*C,s[10]=(1-(f+b))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=is.set(s[0],s[1],s[2]).length(),a=is.set(s[4],s[5],s[6]).length(),l=is.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Cn.copy(this);let c=1/o,h=1/a,p=1/l;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=h,Cn.elements[5]*=h,Cn.elements[6]*=h,Cn.elements[8]*=p,Cn.elements[9]*=p,Cn.elements[10]*=p,e.setFromRotationMatrix(Cn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=Ln,l=!1){let c=this.elements,h=2*r/(e-t),p=2*r/(n-s),f=(e+t)/(e-t),u=(n+s)/(n-s),x,b;if(l)x=r/(o-r),b=o*r/(o-r);else if(a===Ln)x=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(a===xs)x=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=p,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Ln,l=!1){let c=this.elements,h=2/(e-t),p=2/(n-s),f=-(e+t)/(e-t),u=-(n+s)/(n-s),x,b;if(l)x=1/(o-r),b=o/(o-r);else if(a===Ln)x=-2/(o-r),b=-(o+r)/(o-r);else if(a===xs)x=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=p,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=x,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ya.prototype.isMatrix4=!0;var fe=ya,is=new N,Cn=new fe,fp=new N(0,0,0),pp=new N(1,1,1),hi=new N,fo=new N,pn=new N,Kh=new fe,Jh=new Oe,wn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],p=s[2],f=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(te(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-p,u),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-te(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Gt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Kh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Kh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jh.setFromEuler(this),this.setFromQuaternion(Jh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};wn.DEFAULT_ORDER="XYZ";var fr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},mp=0,$h=new N,ss=new Oe,jn=new fe,po=new N,Qs=new N,gp=new N,_p=new Oe,jh=new N(1,0,0),Qh=new N(0,1,0),tu=new N(0,0,1),eu={type:"added"},xp={type:"removed"},rs={type:"childadded",child:null},Ol={type:"childremoved",child:null},Je=class i extends Dn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mp++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new N,e=new wn,n=new Oe,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new fe},normalMatrix:{value:new Zt}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.multiply(ss),this}rotateOnWorldAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.premultiply(ss),this}rotateX(t){return this.rotateOnAxis(jh,t)}rotateY(t){return this.rotateOnAxis(Qh,t)}rotateZ(t){return this.rotateOnAxis(tu,t)}translateOnAxis(t,e){return $h.copy(t).applyQuaternion(this.quaternion),this.position.add($h.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(jh,t)}translateY(t){return this.translateOnAxis(Qh,t)}translateZ(t){return this.translateOnAxis(tu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?po.copy(t):po.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(Qs,po,this.up):jn.lookAt(po,Qs,this.up),this.quaternion.setFromRotationMatrix(jn),s&&(jn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(jn),this.quaternion.premultiply(ss.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(eu),rs.child=t,this.dispatchEvent(rs),rs.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xp),Ol.child=t,this.dispatchEvent(Ol),Ol.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(eu),rs.child=t,this.dispatchEvent(rs),rs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,t,gp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,_p,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),p=o(t.shapes),f=o(t.skeletons),u=o(t.animations),x=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),f.length>0&&(n.skeletons=f),u.length>0&&(n.animations=u),x.length>0&&(n.nodes=x)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Je.DEFAULT_UP=new N(0,1,0);Je.DEFAULT_MATRIX_AUTO_UPDATE=!0;Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var se=class extends Je{constructor(){super(),this.isGroup=!0,this.type="Group"}},yp={type:"move"},Ms=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let b of t.hand.values()){let g=e.getJointPose(b,n),m=this._getHandJoint(c,b);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],f=h.position.distanceTo(p.position),u=.02,x=.005;c.inputState.pinching&&f>u+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=u-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},mo={h:0,s:0,l:0};function Bl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ct=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=Oc(t,1),e=te(e,0,1),n=te(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Bl(o,r,t+1/3),this.g=Bl(o,r,t),this.b=Bl(o,r,t-1/3)}return re.colorSpaceToWorking(this,s),this}setStyle(t,e=Ze){function n(r){r!==void 0&&parseFloat(r)<1&&Gt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Gt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Gt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){let n=id[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Gt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ii(t.r),this.g=ii(t.g),this.b=ii(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return re.workingToColorSpace(en.copy(this),t),Math.round(te(en.r*255,0,255))*65536+Math.round(te(en.g*255,0,255))*256+Math.round(te(en.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.workingToColorSpace(en.copy(this),e);let n=en.r,s=en.g,r=en.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let p=o-a;switch(c=h<=.5?p/(o+a):p/(2-o-a),o){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.workingToColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=Ze){re.workingToColorSpace(en.copy(this),t);let e=en.r,n=en.g,s=en.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ui),this.setHSL(ui.h+t,ui.s+e,ui.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ui),t.getHSL(mo);let n=rr(ui.h,mo.h,e),s=rr(ui.s,mo.s,e),r=rr(ui.l,mo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new Ct;Ct.NAMES=id;var pr=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ct(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var mr=class extends Je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Pn=new N,Qn=new N,zl=new N,ti=new N,os=new N,as=new N,nu=new N,Vl=new N,Hl=new N,Gl=new N,kl=new Ie,Wl=new Ie,Xl=new Ie,mi=class i{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Pn.subVectors(t,e),s.cross(Pn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Pn.subVectors(s,e),Qn.subVectors(n,e),zl.subVectors(t,e);let o=Pn.dot(Pn),a=Pn.dot(Qn),l=Pn.dot(zl),c=Qn.dot(Qn),h=Qn.dot(zl),p=o*c-a*a;if(p===0)return r.set(0,0,0),null;let f=1/p,u=(c*l-a*h)*f,x=(o*h-a*l)*f;return r.set(1-u-x,x,u)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ti.x),l.addScaledVector(o,ti.y),l.addScaledVector(a,ti.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return kl.setScalar(0),Wl.setScalar(0),Xl.setScalar(0),kl.fromBufferAttribute(t,e),Wl.fromBufferAttribute(t,n),Xl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(kl,r.x),o.addScaledVector(Wl,r.y),o.addScaledVector(Xl,r.z),o}static isFrontFacing(t,e,n,s){return Pn.subVectors(n,e),Qn.subVectors(t,e),Pn.cross(Qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Pn.cross(Qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;os.subVectors(s,n),as.subVectors(r,n),Vl.subVectors(t,n);let l=os.dot(Vl),c=as.dot(Vl);if(l<=0&&c<=0)return e.copy(n);Hl.subVectors(t,s);let h=os.dot(Hl),p=as.dot(Hl);if(h>=0&&p<=h)return e.copy(s);let f=l*p-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(os,o);Gl.subVectors(t,r);let u=os.dot(Gl),x=as.dot(Gl);if(x>=0&&u<=x)return e.copy(r);let b=u*c-l*x;if(b<=0&&c>=0&&x<=0)return a=c/(c-x),e.copy(n).addScaledVector(as,a);let g=h*x-u*p;if(g<=0&&p-h>=0&&u-x>=0)return nu.subVectors(r,s),a=(p-h)/(p-h+(u-x)),e.copy(s).addScaledVector(nu,a);let m=1/(g+b+f);return o=b*m,a=f*m,e.copy(n).addScaledVector(os,o).addScaledVector(as,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},gi=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(In.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(In.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=In.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,In):In.fromBufferAttribute(r,o),In.applyMatrix4(t.matrixWorld),this.expandByPoint(In);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),go.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),go.copy(n.boundingBox)),go.applyMatrix4(t.matrixWorld),this.union(go)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,In),In.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(tr),_o.subVectors(this.max,tr),ls.subVectors(t.a,tr),cs.subVectors(t.b,tr),hs.subVectors(t.c,tr),di.subVectors(cs,ls),fi.subVectors(hs,cs),Oi.subVectors(ls,hs);let e=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Oi.z,Oi.y,di.z,0,-di.x,fi.z,0,-fi.x,Oi.z,0,-Oi.x,-di.y,di.x,0,-fi.y,fi.x,0,-Oi.y,Oi.x,0];return!ql(e,ls,cs,hs,_o)||(e=[1,0,0,0,1,0,0,0,1],!ql(e,ls,cs,hs,_o))?!1:(xo.crossVectors(di,fi),e=[xo.x,xo.y,xo.z],ql(e,ls,cs,hs,_o))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,In).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(In).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ei=[new N,new N,new N,new N,new N,new N,new N,new N],In=new N,go=new gi,ls=new N,cs=new N,hs=new N,di=new N,fi=new N,Oi=new N,tr=new N,_o=new N,xo=new N,Bi=new N;function ql(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Bi.fromArray(i,r);let a=s.x*Math.abs(Bi.x)+s.y*Math.abs(Bi.y)+s.z*Math.abs(Bi.z),l=t.dot(Bi),c=e.dot(Bi),h=n.dot(Bi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Fe=new N,yo=new ut,vp=0,ve=class extends Dn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ju,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)yo.fromBufferAttribute(this,e),yo.applyMatrix3(t),this.setXY(e,yo.x,yo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ms(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=on(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),n=on(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),n=on(n,this.array),s=on(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),n=on(n,this.array),s=on(s,this.array),r=on(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var gr=class extends ve{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var _r=class extends ve{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var pe=class extends ve{constructor(t,e,n){super(new Float32Array(t),e,n)}},bp=new gi,er=new N,Yl=new N,ki=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):bp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;er.subVectors(t,this.center);let e=er.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(er,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(er.copy(t.center).add(Yl)),this.expandByPoint(er.copy(t.center).sub(Yl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Mp=0,Sn=new fe,Zl=new Je,us=new N,mn=new gi,nr=new gi,We=new N,Ce=class i extends Dn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qf(t)?_r:gr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Sn.makeRotationFromQuaternion(t),this.applyMatrix4(Sn),this}rotateX(t){return Sn.makeRotationX(t),this.applyMatrix4(Sn),this}rotateY(t){return Sn.makeRotationY(t),this.applyMatrix4(Sn),this}rotateZ(t){return Sn.makeRotationZ(t),this.applyMatrix4(Sn),this}translate(t,e,n){return Sn.makeTranslation(t,e,n),this.applyMatrix4(Sn),this}scale(t,e,n){return Sn.makeScale(t,e,n),this.applyMatrix4(Sn),this}lookAt(t){return Zl.lookAt(t),Zl.updateMatrix(),this.applyMatrix4(Zl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pe(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Gt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ki);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(mn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];nr.setFromBufferAttribute(a),this.morphTargetsRelative?(We.addVectors(mn.min,nr.min),mn.expandByPoint(We),We.addVectors(mn.max,nr.max),mn.expandByPoint(We)):(mn.expandByPoint(nr.min),mn.expandByPoint(nr.max))}mn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)We.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(We));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)We.fromBufferAttribute(a,c),l&&(us.fromBufferAttribute(t,c),We.add(us)),s=Math.max(s,n.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new ve(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let y=0;y<n.count;y++)a[y]=new N,l[y]=new N;let c=new N,h=new N,p=new N,f=new ut,u=new ut,x=new ut,b=new N,g=new N;function m(y,A,R){c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,A),p.fromBufferAttribute(n,R),f.fromBufferAttribute(r,y),u.fromBufferAttribute(r,A),x.fromBufferAttribute(r,R),h.sub(c),p.sub(c),u.sub(f),x.sub(f);let I=1/(u.x*x.y-x.x*u.y);isFinite(I)&&(b.copy(h).multiplyScalar(x.y).addScaledVector(p,-u.y).multiplyScalar(I),g.copy(p).multiplyScalar(u.x).addScaledVector(h,-x.x).multiplyScalar(I),a[y].add(b),a[A].add(b),a[R].add(b),l[y].add(g),l[A].add(g),l[R].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let y=0,A=w.length;y<A;++y){let R=w[y],I=R.start,L=R.count;for(let U=I,D=I+L;U<D;U+=3)m(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let M=new N,_=new N,S=new N,E=new N;function C(y){S.fromBufferAttribute(s,y),E.copy(S);let A=a[y];M.copy(A),M.sub(S.multiplyScalar(S.dot(A))).normalize(),_.crossVectors(E,A);let I=_.dot(l[y])<0?-1:1;o.setXYZW(y,M.x,M.y,M.z,I)}for(let y=0,A=w.length;y<A;++y){let R=w[y],I=R.start,L=R.count;for(let U=I,D=I+L;U<D;U+=3)C(t.getX(U+0)),C(t.getX(U+1)),C(t.getX(U+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ve(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,u=n.count;f<u;f++)n.setXYZ(f,0,0,0);let s=new N,r=new N,o=new N,a=new N,l=new N,c=new N,h=new N,p=new N;if(t)for(let f=0,u=t.count;f<u;f+=3){let x=t.getX(f+0),b=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,b),o.fromBufferAttribute(e,g),h.subVectors(o,r),p.subVectors(s,r),h.cross(p),a.fromBufferAttribute(n,x),l.fromBufferAttribute(n,b),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(b,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,u=e.count;f<u;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),p.subVectors(s,r),h.cross(p),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,p=a.normalized,f=new c.constructor(l.length*h),u=0,x=0;for(let b=0,g=l.length;b<g;b++){a.isInterleavedBufferAttribute?u=l[b]*a.data.stride+a.offset:u=l[b]*h;for(let m=0;m<h;m++)f[x++]=c[u++]}return new ve(f,h,p)}if(this.index===null)return Gt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,p=c.length;h<p;h++){let f=c[h],u=t(f,n);l.push(u)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,f=c.length;p<f;p++){let u=c[p];h.push(u.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],p=r[c];for(let f=0,u=p.length;f<u;f++)h.push(p[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Kl=new N,Sp=new N,Ep=new Zt,gn=class{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Kl.subVectors(n,e).cross(Sp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Kl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ep.getNormalMatrix(t),s=this.coplanarPoint(Kl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},wp=0,si=class extends Dn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Ns,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xc,this.blendDst=yc,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ct(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oo,this.stencilZFail=Oo,this.stencilZPass=Oo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Gt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ct().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new gn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ut().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ut().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ni=new N,Jl=new N,vo=new N,bo=new N,Wi=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ni)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ni.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ni.copy(this.origin).addScaledVector(this.direction,e),ni.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Jl.copy(t).add(e).multiplyScalar(.5),vo.copy(e).sub(t).normalize(),bo.copy(this.origin).sub(Jl);let r=t.distanceTo(e)*.5,o=-this.direction.dot(vo),a=bo.dot(this.direction),l=-bo.dot(vo),c=bo.lengthSq(),h=Math.abs(1-o*o),p,f,u,x;if(h>0)if(p=o*l-a,f=o*a-l,x=r*h,p>=0)if(f>=-x)if(f<=x){let b=1/h;p*=b,f*=b,u=p*(p+o*f+2*a)+f*(o*p+f+2*l)+c}else f=r,p=Math.max(0,-(o*f+a)),u=-p*p+f*(f+2*l)+c;else f=-r,p=Math.max(0,-(o*f+a)),u=-p*p+f*(f+2*l)+c;else f<=-x?(p=Math.max(0,-(-o*r+a)),f=p>0?-r:Math.min(Math.max(-r,-l),r),u=-p*p+f*(f+2*l)+c):f<=x?(p=0,f=Math.min(Math.max(-r,-l),r),u=f*(f+2*l)+c):(p=Math.max(0,-(o*r+a)),f=p>0?r:Math.min(Math.max(-r,-l),r),u=-p*p+f*(f+2*l)+c);else f=o>0?-r:r,p=Math.max(0,-(o*f+a)),u=-p*p+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Jl).addScaledVector(vo,f),u}intersectSphere(t,e){if(t.radius<0)return null;ni.subVectors(t.center,this.origin);let n=ni.dot(this.direction),s=ni.dot(ni)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-f.z)*p,l=(t.max.z-f.z)*p):(a=(t.max.z-f.z)*p,l=(t.min.z-f.z)*p),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ni)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,p=t.x-o.x,f=t.y-o.y,u=t.z-o.z,x=e.x-o.x,b=e.y-o.y,g=e.z-o.z,m=n.x-o.x,w=n.y-o.y,M=n.z-o.z,_=Math.abs(l),S=Math.abs(c),E=Math.abs(h),C,y,A,R,I,L,U,D,B,k,W,Y;if(_>=S&&_>=E?(A=l,L=p,B=x,Y=m,l>=0?(C=c,y=h,R=f,I=u,U=b,D=g,k=w,W=M):(C=h,y=c,R=u,I=f,U=g,D=b,k=M,W=w)):S>=E?(A=c,L=f,B=b,Y=w,c>=0?(C=h,y=l,R=u,I=p,U=g,D=x,k=M,W=m):(C=l,y=h,R=p,I=u,U=x,D=g,k=m,W=M)):(A=h,L=u,B=g,Y=M,h>=0?(C=l,y=c,R=p,I=f,U=x,D=b,k=m,W=w):(C=c,y=l,R=f,I=p,U=b,D=x,k=w,W=m)),A===0)return null;let J=C/A,tt=y/A,it=1/A,O=R-J*L,G=I-tt*L,j=U-J*B,at=D-tt*B,mt=k-J*Y,K=W-tt*Y,Q=mt*at-K*j,ft=O*K-G*mt,Dt=j*G-at*O;if(s){if(Q<0||ft<0||Dt<0)return null}else if((Q<0||ft<0||Dt<0)&&(Q>0||ft>0||Dt>0))return null;let Tt=Q+ft+Dt;if(Tt===0)return null;let Ht=it*(Q*L+ft*B+Dt*Y);return(Tt>0?Ht<0:Ht>0)?null:this.at(Ht/Tt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qn=class extends si{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},iu=new fe,zi=new Wi,Mo=new ki,su=new N,So=new N,Eo=new N,wo=new N,$l=new N,To=new N,ru=new N,Ao=new N,le=class extends Je{constructor(t=new Ce,e=new qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){To.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],p=r[l];h!==0&&($l.fromBufferAttribute(p,t),o?To.addScaledVector($l,h):To.addScaledVector($l.sub(e),h))}e.add(To)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Mo.copy(n.boundingSphere),Mo.applyMatrix4(r),zi.copy(t.ray).recast(t.near),!(Mo.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Mo,su)===null||zi.origin.distanceToSquared(su)>(t.far-t.near)**2))&&(iu.copy(r).invert(),zi.copy(t.ray).applyMatrix4(iu),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,zi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,f=r.groups,u=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,b=f.length;x<b;x++){let g=f[x],m=o[g.materialIndex],w=Math.max(g.start,u.start),M=Math.min(a.count,Math.min(g.start+g.count,u.start+u.count));for(let _=w,S=M;_<S;_+=3){let E=a.getX(_),C=a.getX(_+1),y=a.getX(_+2);s=Ro(this,m,t,n,c,h,p,E,C,y),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let x=Math.max(0,u.start),b=Math.min(a.count,u.start+u.count);for(let g=x,m=b;g<m;g+=3){let w=a.getX(g),M=a.getX(g+1),_=a.getX(g+2);s=Ro(this,o,t,n,c,h,p,w,M,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,b=f.length;x<b;x++){let g=f[x],m=o[g.materialIndex],w=Math.max(g.start,u.start),M=Math.min(l.count,Math.min(g.start+g.count,u.start+u.count));for(let _=w,S=M;_<S;_+=3){let E=_,C=_+1,y=_+2;s=Ro(this,m,t,n,c,h,p,E,C,y),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let x=Math.max(0,u.start),b=Math.min(l.count,u.start+u.count);for(let g=x,m=b;g<m;g+=3){let w=g,M=g+1,_=g+2;s=Ro(this,o,t,n,c,h,p,w,M,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Tp(i,t,e,n,s,r,o,a){let l;if(t.side===$e?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Ti,a),l===null)return null;Ao.copy(a),Ao.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Ao);return c<e.near||c>e.far?null:{distance:c,point:Ao.clone(),object:i}}function Ro(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,So),i.getVertexPosition(l,Eo),i.getVertexPosition(c,wo);let h=Tp(i,t,e,n,So,Eo,wo,ru);if(h){let p=new N;mi.getBarycoord(ru,So,Eo,wo,p),s&&(h.uv=mi.getInterpolatedAttribute(s,a,l,c,p,new ut)),r&&(h.uv1=mi.getInterpolatedAttribute(r,a,l,c,p,new ut)),o&&(h.normal=mi.getInterpolatedAttribute(o,a,l,c,p,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new N,materialIndex:0};mi.getNormal(So,Eo,wo,f.normal),h.face=f,h.barycoord=p}return h}var Ss=class extends an{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Xe,h=Xe,p,f){super(null,o,a,l,c,h,s,r,p,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Vi=new ki,Ap=new ut(.5,.5),Co=new N,Es=class{constructor(t=new gn,e=new gn,n=new gn,s=new gn,r=new gn,o=new gn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ln,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],p=r[5],f=r[6],u=r[7],x=r[8],b=r[9],g=r[10],m=r[11],w=r[12],M=r[13],_=r[14],S=r[15];if(s[0].setComponents(c-o,u-h,m-x,S-w).normalize(),s[1].setComponents(c+o,u+h,m+x,S+w).normalize(),s[2].setComponents(c+a,u+p,m+b,S+M).normalize(),s[3].setComponents(c-a,u-p,m-b,S-M).normalize(),n)s[4].setComponents(l,f,g,_).normalize(),s[5].setComponents(c-l,u-f,m-g,S-_).normalize();else if(s[4].setComponents(c-l,u-f,m-g,S-_).normalize(),e===Ln)s[5].setComponents(c+l,u+f,m+g,S+_).normalize();else if(e===xs)s[5].setComponents(l,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){Vi.center.set(0,0,0);let e=Ap.distanceTo(t.center);return Vi.radius=.7071067811865476+e,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Co.x=s.normal.x>0?t.max.x:t.min.x,Co.y=s.normal.y>0?t.max.y:t.min.y,Co.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Co)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var $o=class extends si{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ou=new fe,ac=new Wi,Po=new ki,Io=new N,xr=class extends Je{constructor(t=new Ce,e=new $o){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Po.copy(n.boundingSphere),Po.applyMatrix4(s),Po.radius+=r,t.ray.intersectsSphere(Po)===!1)return;ou.copy(s).invert(),ac.copy(t.ray).applyMatrix4(ou);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,p=n.attributes.position;if(c!==null){let f=Math.max(0,o.start),u=Math.min(c.count,o.start+o.count);for(let x=f,b=u;x<b;x++){let g=c.getX(x);Io.fromBufferAttribute(p,g),au(Io,g,l,s,t,e,this)}}else{let f=Math.max(0,o.start),u=Math.min(p.count,o.start+o.count);for(let x=f,b=u;x<b;x++)Io.fromBufferAttribute(p,x),au(Io,x,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function au(i,t,e,n,s,r,o){let a=ac.distanceSqToPoint(i);if(a<e){let l=new N;ac.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var yr=class extends an{constructor(t=[],e=Ai,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},vr=class extends an{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var _i=class extends an{constructor(t,e,n=Fn,s,r,o,a=Xe,l=Xe,c,h=Xn,p=1){if(h!==Xn&&h!==Ci)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:p};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new bs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},jo=class extends _i{constructor(t,e=Fn,n=Ai,s,r,o=Xe,a=Xe,l,c=Xn){let h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},br=class extends an{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},xi=class i extends Ce{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],p=[],f=0,u=0;x("z","y","x",-1,-1,n,e,t,o,r,0),x("z","y","x",1,-1,n,e,-t,o,r,1),x("x","z","y",1,1,t,n,e,s,o,2),x("x","z","y",1,-1,t,n,-e,s,o,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(p,2));function x(b,g,m,w,M,_,S,E,C,y,A){let R=_/C,I=S/y,L=_/2,U=S/2,D=E/2,B=C+1,k=y+1,W=0,Y=0,J=new N;for(let tt=0;tt<k;tt++){let it=tt*I-U;for(let O=0;O<B;O++){let G=O*R-L;J[b]=G*w,J[g]=it*M,J[m]=D,c.push(J.x,J.y,J.z),J[b]=0,J[g]=0,J[m]=E>0?1:-1,h.push(J.x,J.y,J.z),p.push(O/C),p.push(1-tt/y),W+=1}}for(let tt=0;tt<y;tt++)for(let it=0;it<C;it++){let O=f+it+B*tt,G=f+it+B*(tt+1),j=f+(it+1)+B*(tt+1),at=f+(it+1)+B*tt;l.push(O,G,at),l.push(G,j,at),Y+=6}a.addGroup(u,Y,A),u+=Y,f+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var yi=class i extends Ce{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new N,h=new ut;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let p=0,f=3;p<=e;p++,f+=3){let u=n+p/e*s;c.x=t*Math.cos(u),c.y=t*Math.sin(u),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new pe(o,3)),this.setAttribute("normal",new pe(a,3)),this.setAttribute("uv",new pe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ws=class i extends Ce{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],p=[],f=[],u=[],x=0,b=[],g=n/2,m=0;w(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new pe(p,3)),this.setAttribute("normal",new pe(f,3)),this.setAttribute("uv",new pe(u,2));function w(){let _=new N,S=new N,E=0,C=(e-t)/n;for(let y=0;y<=r;y++){let A=[],R=y/r,I=R*(e-t)+t;for(let L=0;L<=s;L++){let U=L/s,D=U*l+a,B=Math.sin(D),k=Math.cos(D);S.x=I*B,S.y=-R*n+g,S.z=I*k,p.push(S.x,S.y,S.z),_.set(B,C,k).normalize(),f.push(_.x,_.y,_.z),u.push(U,1-R),A.push(x++)}b.push(A)}for(let y=0;y<s;y++)for(let A=0;A<r;A++){let R=b[A][y],I=b[A+1][y],L=b[A+1][y+1],U=b[A][y+1];(t>0||A!==0)&&(h.push(R,I,U),E+=3),(e>0||A!==r-1)&&(h.push(I,L,U),E+=3)}c.addGroup(m,E,0),m+=E}function M(_){let S=x,E=new ut,C=new N,y=0,A=_===!0?t:e,R=_===!0?1:-1;for(let L=1;L<=s;L++)p.push(0,g*R,0),f.push(0,R,0),u.push(.5,.5),x++;let I=x;for(let L=0;L<=s;L++){let D=L/s*l+a,B=Math.cos(D),k=Math.sin(D);C.x=A*k,C.y=g*R,C.z=A*B,p.push(C.x,C.y,C.z),f.push(0,R,0),E.x=B*.5+.5,E.y=k*.5*R+.5,u.push(E.x,E.y),x++}for(let L=0;L<s;L++){let U=S+L,D=I+L;_===!0?h.push(D,D+1,U):h.push(D+1,D,U),y+=3}c.addGroup(m,y,_===!0?1:2),m+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ts=class i extends ws{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var _n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Gt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],f=n[s+1]-h,u=(o-h)/f;return(s+u)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new ut:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new N,s=[],r=[],o=[],a=new N,l=new fe;for(let u=0;u<=t;u++){let x=u/t;s[u]=this.getTangentAt(x,new N)}r[0]=new N,o[0]=new N;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),p=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),p<=c&&(c=p,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),o[u]=o[u-1].clone(),a.crossVectors(s[u-1],s[u]),a.length()>Number.EPSILON){a.normalize();let x=Math.acos(te(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(a,x))}o[u].crossVectors(s[u],r[u])}if(e===!0){let u=Math.acos(te(r[0].dot(r[t]),-1,1));u/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(u=-u);for(let x=1;x<=t;x++)r[x].applyMatrix4(l.makeRotationAxis(s[x],u*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},As=class extends _n{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ut){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),f=l-this.aX,u=c-this.aY;l=f*h-u*p+this.aX,c=f*p+u*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Qo=class extends As{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function zc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,p){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,u=(a-o)/h-(l-o)/(h+p)+(l-a)/p;f*=h,u*=h,s(o,a,f,u)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var lu=new N,cu=new N,jl=new zc,Ql=new zc,tc=new zc,vi=class extends _n{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new N){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(cu.subVectors(s[0],s[1]).add(s[0]),c=cu);let p=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(lu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=lu),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,x=Math.pow(c.distanceToSquared(p),u),b=Math.pow(p.distanceToSquared(f),u),g=Math.pow(f.distanceToSquared(h),u);b<1e-4&&(b=1),x<1e-4&&(x=b),g<1e-4&&(g=b),jl.initNonuniformCatmullRom(c.x,p.x,f.x,h.x,x,b,g),Ql.initNonuniformCatmullRom(c.y,p.y,f.y,h.y,x,b,g),tc.initNonuniformCatmullRom(c.z,p.z,f.z,h.z,x,b,g)}else this.curveType==="catmullrom"&&(jl.initCatmullRom(c.x,p.x,f.x,h.x,this.tension),Ql.initCatmullRom(c.y,p.y,f.y,h.y,this.tension),tc.initCatmullRom(c.z,p.z,f.z,h.z,this.tension));return n.set(jl.calc(l),Ql.calc(l),tc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function hu(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Rp(i,t){let e=1-i;return e*e*t}function Cp(i,t){return 2*(1-i)*i*t}function Pp(i,t){return i*i*t}function or(i,t,e,n){return Rp(i,t)+Cp(i,e)+Pp(i,n)}function Ip(i,t){let e=1-i;return e*e*e*t}function Lp(i,t){let e=1-i;return 3*e*e*i*t}function Dp(i,t){return 3*(1-i)*i*i*t}function Np(i,t){return i*i*i*t}function ar(i,t,e,n,s){return Ip(i,t)+Lp(i,e)+Dp(i,n)+Np(i,s)}var Mr=class extends _n{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ar(t,s.x,r.x,o.x,a.x),ar(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ta=class extends _n{constructor(t=new N,e=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new N){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ar(t,s.x,r.x,o.x,a.x),ar(t,s.y,r.y,o.y,a.y),ar(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Sr=class extends _n{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ea=class extends _n{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Er=class extends _n{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(or(t,s.x,r.x,o.x),or(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},wr=class extends _n{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(or(t,s.x,r.x,o.x),or(t,s.y,r.y,o.y),or(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Tr=class extends _n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],p=s[o>s.length-3?s.length-1:o+2];return n.set(hu(a,l.x,c.x,h.x,p.x),hu(a,l.y,c.y,h.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ut().fromArray(s))}return this}},na=Object.freeze({__proto__:null,ArcCurve:Qo,CatmullRomCurve3:vi,CubicBezierCurve:Mr,CubicBezierCurve3:ta,EllipseCurve:As,LineCurve:Sr,LineCurve3:ea,QuadraticBezierCurve:Er,QuadraticBezierCurve3:wr,SplineCurve:Tr}),ia=class extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new na[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new na[s.type]().fromJSON(s))}return this}},Ar=class extends ia{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Sr(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Er(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Mr(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Tr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new As(t,e,n,s,r,o,a,l);if(this.curves.length>0){let p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Rs=class extends Ar{constructor(t){super(t),this.uuid=Zi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Ar().fromJSON(s))}return this}};function Up(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=sd(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Vp(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,p=l;for(let f=e;f<s;f+=e){let u=i[f],x=i[f+1];u<a&&(a=u),x<l&&(l=x),u>h&&(h=u),x>p&&(p=x)}c=Math.max(h-a,p-l),c=c!==0?32767/c:0}return Rr(r,o,e,a,l,c,0),o}function sd(i,t,e,n,s){let r;if(s===$p(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=uu(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=uu(o/n|0,i[o],i[o+1],r);return r&&Cs(r,r.next)&&(Pr(r),r=r.next),r}function Xi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Cs(e,e.next)||De(e.prev,e,e.next)===0)){if(Pr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Rr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Xp(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Op(i,n,s,r):Fp(i)){t.push(l.i,i.i,c.i),Pr(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Bp(Xi(i),t),Rr(i,t,e,n,s,r,2)):o===2&&zp(i,t,e,n,s,r):Rr(Xi(i),t,e,n,s,r,1);break}}}function Fp(i){let t=i.prev,e=i,n=i.next;if(De(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),p=Math.min(a,l,c),f=Math.max(s,r,o),u=Math.max(a,l,c),x=n.next;for(;x!==t;){if(x.x>=h&&x.x<=f&&x.y>=p&&x.y<=u&&ir(s,a,r,l,o,c,x.x,x.y)&&De(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function Op(i,t,e,n){let s=i.prev,r=i,o=i.next;if(De(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,p=r.y,f=o.y,u=Math.min(a,l,c),x=Math.min(h,p,f),b=Math.max(a,l,c),g=Math.max(h,p,f),m=lc(u,x,t,e,n),w=lc(b,g,t,e,n),M=i.prevZ,_=i.nextZ;for(;M&&M.z>=m&&_&&_.z<=w;){if(M.x>=u&&M.x<=b&&M.y>=x&&M.y<=g&&M!==s&&M!==o&&ir(a,h,l,p,c,f,M.x,M.y)&&De(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=u&&_.x<=b&&_.y>=x&&_.y<=g&&_!==s&&_!==o&&ir(a,h,l,p,c,f,_.x,_.y)&&De(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=m;){if(M.x>=u&&M.x<=b&&M.y>=x&&M.y<=g&&M!==s&&M!==o&&ir(a,h,l,p,c,f,M.x,M.y)&&De(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=w;){if(_.x>=u&&_.x<=b&&_.y>=x&&_.y<=g&&_!==s&&_!==o&&ir(a,h,l,p,c,f,_.x,_.y)&&De(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Bp(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Cs(n,s)&&od(n,e,e.next,s)&&Cr(n,s)&&Cr(s,n)&&(t.push(n.i,e.i,s.i),Pr(e),Pr(e.next),e=i=s),e=e.next}while(e!==i);return Xi(e)}function zp(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Zp(o,a)){let l=ad(o,a);o=Xi(o,o.next),l=Xi(l,l.next),Rr(o,t,e,n,s,r,0),Rr(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Vp(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=sd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Yp(c))}s.sort(Hp);for(let r=0;r<s.length;r++)e=Gp(s[r],e);return e}function Hp(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Gp(i,t){let e=kp(i,t);if(!e)return t;let n=ad(e,i);return Xi(n,n.next),Xi(e,e.next)}function kp(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Cs(i,e))return e;do{if(Cs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let p=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(p<=n&&p>r&&(r=p,o=e.x<e.next.x?e:e.next,p===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&rd(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let p=Math.abs(s-e.y)/(n-e.x);Cr(e,i)&&(p<h||p===h&&(e.x>o.x||e.x===o.x&&Wp(o,e)))&&(o=e,h=p)}e=e.next}while(e!==a);return o}function Wp(i,t){return De(i.prev,i,t.prev)<0&&De(t.next,i,i.next)<0}function Xp(i,t,e,n){let s=i;do s.z===0&&(s.z=lc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,qp(s)}function qp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function lc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Yp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function rd(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function ir(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&rd(i,t,e,n,s,r,o,a)}function Zp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Kp(i,t)&&(Cr(i,t)&&Cr(t,i)&&Jp(i,t)&&(De(i.prev,i,t.prev)||De(i,t.prev,t))||Cs(i,t)&&De(i.prev,i,i.next)>0&&De(t.prev,t,t.next)>0)}function De(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Cs(i,t){return i.x===t.x&&i.y===t.y}function od(i,t,e,n){let s=Do(De(i,t,e)),r=Do(De(i,t,n)),o=Do(De(e,n,i)),a=Do(De(e,n,t));return!!(s!==r&&o!==a||s===0&&Lo(i,e,t)||r===0&&Lo(i,n,t)||o===0&&Lo(e,i,n)||a===0&&Lo(e,t,n))}function Lo(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Do(i){return i>0?1:i<0?-1:0}function Kp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&od(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Cr(i,t){return De(i.prev,i,i.next)<0?De(i,t,i.next)>=0&&De(i,i.prev,t)>=0:De(i,t,i.prev)<0||De(i,i.next,t)<0}function Jp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function ad(i,t){let e=cc(i.i,i.x,i.y),n=cc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function uu(i,t,e,n){let s=cc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Pr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function cc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function $p(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var hc=class{static triangulate(t,e,n=2){return Up(t,e,n)}},Hi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];du(t),fu(n,t);let o=t.length;e.forEach(du);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,fu(n,e[l]);let a=hc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function du(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function fu(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Ir=class i extends Ce{constructor(t=new Rs([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new pe(s,3)),this.setAttribute("uv",new pe(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,u=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:u-.1,b=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:jp,M,_=!1,S,E,C,y;if(m){M=m.getSpacedPoints(h),_=!0,f=!1;let ot=m.isCatmullRomCurve3?m.closed:!1;S=m.computeFrenetFrames(h,ot),E=new N,C=new N,y=new N}f||(g=0,u=0,x=0,b=0);let A=a.extractPoints(c),R=A.shape,I=A.holes;if(!Hi.isClockWise(R)){R=R.reverse();for(let ot=0,ct=I.length;ot<ct;ot++){let ht=I[ot];Hi.isClockWise(ht)&&(I[ot]=ht.reverse())}}function U(ot){let ht=10000000000000001e-36,dt=ot[0];for(let _t=1;_t<=ot.length;_t++){let kt=_t%ot.length,Vt=ot[kt],Yt=Vt.x-dt.x,Kt=Vt.y-dt.y,F=Yt*Yt+Kt*Kt,ce=Math.max(Math.abs(Vt.x),Math.abs(Vt.y),Math.abs(dt.x),Math.abs(dt.y)),ne=ht*ce*ce;if(F<=ne){ot.splice(kt,1),_t--;continue}dt=Vt}}U(R),I.forEach(U);let D=I.length,B=R;for(let ot=0;ot<D;ot++){let ct=I[ot];R=R.concat(ct)}function k(ot,ct,ht){return ct||qt("ExtrudeGeometry: vec does not exist"),ot.clone().addScaledVector(ct,ht)}let W=R.length;function Y(ot,ct,ht){let dt,_t,kt,Vt=ot.x-ct.x,Yt=ot.y-ct.y,Kt=ht.x-ot.x,F=ht.y-ot.y,ce=Vt*Vt+Yt*Yt,ne=Vt*F-Yt*Kt;if(Math.abs(ne)>Number.EPSILON){let P=Math.sqrt(ce),v=Math.sqrt(Kt*Kt+F*F),H=ct.x-Yt/P,Z=ct.y+Vt/P,et=ht.x-F/v,pt=ht.y+Kt/v,gt=((et-H)*F-(pt-Z)*Kt)/(Vt*F-Yt*Kt);dt=H+Vt*gt-ot.x,_t=Z+Yt*gt-ot.y;let nt=dt*dt+_t*_t;if(nt<=2)return new ut(dt,_t);kt=Math.sqrt(nt/2)}else{let P=!1;Vt>Number.EPSILON?Kt>Number.EPSILON&&(P=!0):Vt<-Number.EPSILON?Kt<-Number.EPSILON&&(P=!0):Math.sign(Yt)===Math.sign(F)&&(P=!0),P?(dt=-Yt,_t=Vt,kt=Math.sqrt(ce)):(dt=Vt,_t=Yt,kt=Math.sqrt(ce/2))}return new ut(dt/kt,_t/kt)}let J=[];for(let ot=0,ct=B.length,ht=ct-1,dt=ot+1;ot<ct;ot++,ht++,dt++)ht===ct&&(ht=0),dt===ct&&(dt=0),J[ot]=Y(B[ot],B[ht],B[dt]);let tt=[],it,O=J.concat();for(let ot=0,ct=D;ot<ct;ot++){let ht=I[ot];it=[];for(let dt=0,_t=ht.length,kt=_t-1,Vt=dt+1;dt<_t;dt++,kt++,Vt++)kt===_t&&(kt=0),Vt===_t&&(Vt=0),it[dt]=Y(ht[dt],ht[kt],ht[Vt]);tt.push(it),O=O.concat(it)}let G;if(g===0)G=Hi.triangulateShape(B,I);else{let ot=[],ct=[];for(let ht=0;ht<g;ht++){let dt=ht/g,_t=u*Math.cos(dt*Math.PI/2),kt=x*Math.sin(dt*Math.PI/2)+b;for(let Vt=0,Yt=B.length;Vt<Yt;Vt++){let Kt=k(B[Vt],J[Vt],kt);ft(Kt.x,Kt.y,-_t),dt===0&&ot.push(Kt)}for(let Vt=0,Yt=D;Vt<Yt;Vt++){let Kt=I[Vt];it=tt[Vt];let F=[];for(let ce=0,ne=Kt.length;ce<ne;ce++){let P=k(Kt[ce],it[ce],kt);ft(P.x,P.y,-_t),dt===0&&F.push(P)}dt===0&&ct.push(F)}}G=Hi.triangulateShape(ot,ct)}let j=G.length,at=x+b;for(let ot=0;ot<W;ot++){let ct=f?k(R[ot],O[ot],at):R[ot];_?(C.copy(S.normals[0]).multiplyScalar(ct.x),E.copy(S.binormals[0]).multiplyScalar(ct.y),y.copy(M[0]).add(C).add(E),ft(y.x,y.y,y.z)):ft(ct.x,ct.y,0)}for(let ot=1;ot<=h;ot++)for(let ct=0;ct<W;ct++){let ht=f?k(R[ct],O[ct],at):R[ct];_?(C.copy(S.normals[ot]).multiplyScalar(ht.x),E.copy(S.binormals[ot]).multiplyScalar(ht.y),y.copy(M[ot]).add(C).add(E),ft(y.x,y.y,y.z)):ft(ht.x,ht.y,p/h*ot)}for(let ot=g-1;ot>=0;ot--){let ct=ot/g,ht=u*Math.cos(ct*Math.PI/2),dt=x*Math.sin(ct*Math.PI/2)+b;for(let _t=0,kt=B.length;_t<kt;_t++){let Vt=k(B[_t],J[_t],dt);ft(Vt.x,Vt.y,p+ht)}for(let _t=0,kt=I.length;_t<kt;_t++){let Vt=I[_t];it=tt[_t];for(let Yt=0,Kt=Vt.length;Yt<Kt;Yt++){let F=k(Vt[Yt],it[Yt],dt);_?ft(F.x,F.y+M[h-1].y,M[h-1].x+ht):ft(F.x,F.y,p+ht)}}}mt(),K();function mt(){let ot=s.length/3;if(f){let ct=0,ht=W*ct;for(let dt=0;dt<j;dt++){let _t=G[dt];Dt(_t[2]+ht,_t[1]+ht,_t[0]+ht)}ct=h+g*2,ht=W*ct;for(let dt=0;dt<j;dt++){let _t=G[dt];Dt(_t[0]+ht,_t[1]+ht,_t[2]+ht)}}else{for(let ct=0;ct<j;ct++){let ht=G[ct];Dt(ht[2],ht[1],ht[0])}for(let ct=0;ct<j;ct++){let ht=G[ct];Dt(ht[0]+W*h,ht[1]+W*h,ht[2]+W*h)}}n.addGroup(ot,s.length/3-ot,0)}function K(){let ot=s.length/3,ct=0;Q(B,ct),ct+=B.length;for(let ht=0,dt=I.length;ht<dt;ht++){let _t=I[ht];Q(_t,ct),ct+=_t.length}n.addGroup(ot,s.length/3-ot,1)}function Q(ot,ct){let ht=ot.length;for(;--ht>=0;){let dt=ht,_t=ht-1;_t<0&&(_t=ot.length-1);for(let kt=0,Vt=h+g*2;kt<Vt;kt++){let Yt=W*kt,Kt=W*(kt+1),F=ct+dt+Yt,ce=ct+_t+Yt,ne=ct+_t+Kt,P=ct+dt+Kt;Tt(F,ce,ne,P)}}}function ft(ot,ct,ht){l.push(ot),l.push(ct),l.push(ht)}function Dt(ot,ct,ht){Ht(ot),Ht(ct),Ht(ht);let dt=s.length/3,_t=w.generateTopUV(n,s,dt-3,dt-2,dt-1);_e(_t[0]),_e(_t[1]),_e(_t[2])}function Tt(ot,ct,ht,dt){Ht(ot),Ht(ct),Ht(dt),Ht(ct),Ht(ht),Ht(dt);let _t=s.length/3,kt=w.generateSideWallUV(n,s,_t-6,_t-3,_t-2,_t-1);_e(kt[0]),_e(kt[1]),_e(kt[3]),_e(kt[1]),_e(kt[2]),_e(kt[3])}function Ht(ot){s.push(l[ot*3+0]),s.push(l[ot*3+1]),s.push(l[ot*3+2])}function _e(ot){r.push(ot.x),r.push(ot.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Qp(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new na[s.type]().fromJSON(s)),new i(n,t.options)}},jp={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ut(r,o),new ut(a,l),new ut(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],p=t[n*3+2],f=t[s*3],u=t[s*3+1],x=t[s*3+2],b=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ut(o,1-l),new ut(c,1-p),new ut(f,1-x),new ut(b,1-m)]:[new ut(a,1-l),new ut(h,1-p),new ut(u,1-x),new ut(g,1-m)]}};function Qp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Yn=class i extends Ce{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,p=t/a,f=e/l,u=[],x=[],b=[],g=[];for(let m=0;m<h;m++){let w=m*f-o;for(let M=0;M<c;M++){let _=M*p-r;x.push(_,-w,0),b.push(0,0,1),g.push(M/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let w=0;w<a;w++){let M=w+c*m,_=w+c*(m+1),S=w+1+c*(m+1),E=w+1+c*m;u.push(M,_,E),u.push(_,S,E)}this.setIndex(u),this.setAttribute("position",new pe(x,3)),this.setAttribute("normal",new pe(b,3)),this.setAttribute("uv",new pe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Nn=class i extends Ce{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],p=new N,f=new N,u=[],x=[],b=[],g=[];for(let m=0;m<=n;m++){let w=[],M=m/n,_=o+M*a,S=t*Math.cos(_),E=Math.sqrt(t*t-S*S),C=0;m===0&&o===0?C=.5/e:m===n&&l===Math.PI&&(C=-.5/e);for(let y=0;y<=e;y++){let A=y/e,R=s+A*r;p.x=-E*Math.cos(R),p.y=S,p.z=E*Math.sin(R),x.push(p.x,p.y,p.z),f.copy(p).normalize(),b.push(f.x,f.y,f.z),g.push(A+C,1-M),w.push(c++)}h.push(w)}for(let m=0;m<n;m++)for(let w=0;w<e;w++){let M=h[m][w+1],_=h[m][w],S=h[m+1][w],E=h[m+1][w+1];(m!==0||o>0)&&u.push(M,_,E),(m!==n-1||l<Math.PI)&&u.push(_,S,E)}this.setIndex(u),this.setAttribute("position",new pe(x,3)),this.setAttribute("normal",new pe(b,3)),this.setAttribute("uv",new pe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Lr=class i extends Ce{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],p=[],f=new N,u=new N,x=new N;for(let b=0;b<=n;b++){let g=o+b/n*a;for(let m=0;m<=s;m++){let w=m/s*r;u.x=(t+e*Math.cos(g))*Math.cos(w),u.y=(t+e*Math.cos(g))*Math.sin(w),u.z=e*Math.sin(g),c.push(u.x,u.y,u.z),f.x=t*Math.cos(w),f.y=t*Math.sin(w),x.subVectors(u,f).normalize(),h.push(x.x,x.y,x.z),p.push(m/s),p.push(b/n)}}for(let b=1;b<=n;b++)for(let g=1;g<=s;g++){let m=(s+1)*b+g-1,w=(s+1)*(b-1)+g-1,M=(s+1)*(b-1)+g,_=(s+1)*b+g;l.push(m,w,_),l.push(w,M,_)}this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var Dr=class i extends Ce{constructor(t=new wr(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new N,l=new N,c=new ut,h=new N,p=[],f=[],u=[],x=[];b(),this.setIndex(x),this.setAttribute("position",new pe(p,3)),this.setAttribute("normal",new pe(f,3)),this.setAttribute("uv",new pe(u,2));function b(){for(let M=0;M<e;M++)g(M);g(r===!1?e:0),w(),m()}function g(M){h=t.getPointAt(M/e,h);let _=o.normals[M],S=o.binormals[M];for(let E=0;E<=s;E++){let C=E/s*Math.PI*2,y=Math.sin(C),A=-Math.cos(C);l.x=A*_.x+y*S.x,l.y=A*_.y+y*S.y,l.z=A*_.z+y*S.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,p.push(a.x,a.y,a.z)}}function m(){for(let M=1;M<=e;M++)for(let _=1;_<=s;_++){let S=(s+1)*(M-1)+(_-1),E=(s+1)*M+(_-1),C=(s+1)*M+_,y=(s+1)*(M-1)+_;x.push(S,E,y),x.push(E,C,y)}}function w(){for(let M=0;M<=e;M++)for(let _=0;_<=s;_++)c.x=M/e,c.y=_/s,u.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new na[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Ki(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(pu(s))s.isRenderTargetTexture?(Gt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(pu(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function nn(i){let t={};for(let e=0;e<i.length;e++){let n=Ki(i[e]);for(let s in n)t[s]=n[s]}return t}function pu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function t0(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Vc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}var ld={clone:Ki,merge:nn},e0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qe=class extends si{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=e0,this.fragmentShader=n0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ki(t.uniforms),this.uniformsGroups=t0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ct().setHex(s.value);break;case"v2":this.uniforms[n].value=new ut().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ie().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Zt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new fe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},sa=class extends qe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Tn=class extends si{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ct(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ol,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ra=class extends si{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},oa=class extends si{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ds(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function ec(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var bi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},aa=class extends bi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sc,endingEnd:sc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case rc:r=t,a=2*e-n;break;case oc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case rc:o=t,l=2*n-e;break;case oc:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,p=this._offsetNext,f=this._weightPrev,u=this._weightNext,x=(n-e)/(s-e),b=x*x,g=b*x,m=-f*g+2*f*b-f*x,w=(1+f)*g+(-1.5-2*f)*b+(-.5+f)*x+1,M=(-1-u)*g+(1.5+u)*b+.5*x,_=u*g-u*b;for(let S=0;S!==a;++S)r[S]=m*o[h+S]+w*o[c+S]+M*o[l+S]+_*o[p+S];return r}},la=class extends bi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),p=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*p+o[l+f]*h;return r}},ca=class extends bi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ha=class extends bi{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,p=this.outTangents;if(!h||!p){let x=(n-e)/(s-e),b=1-x;for(let g=0;g!==a;++g)r[g]=o[c+g]*b+o[l+g]*x;return r}let f=a*2,u=t-1;for(let x=0;x!==a;++x){let b=o[c+x],g=o[l+x],m=u*f+x*2,w=p[m],M=p[m+1],_=t*f+x*2,S=h[_],E=h[_+1],C=s0(n,e,w,S,s);r[x]=cd(C,b,M,E,g)}return r}};function cd(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function i0(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function s0(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=cd(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let l=i0(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var xn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ds(e,this.TimeBufferType),this.values=ds(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ds(t.times,Array),values:ds(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),ec(t.settings)&&(n.settings={inTangents:ds(t.settings.inTangents,Array),outTangents:ds(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ca(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new la(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new aa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ha(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case lr:e=this.InterpolantFactoryMethodDiscrete;break;case Yo:e=this.InterpolantFactoryMethodLinear;break;case Fo:e=this.InterpolantFactoryMethodSmooth;break;case ic:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Gt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return lr;case this.InterpolantFactoryMethodLinear:return Yo;case this.InterpolantFactoryMethodSmooth:return Fo;case this.InterpolantFactoryMethodBezier:return ic}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;ec(this.settings)&&(mu(this.settings.inTangents,t),mu(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(qt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(qt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){qt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){qt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Yf(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){qt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Fo,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let p=a*n,f=p-n,u=p+n;for(let x=0;x!==n;++x){let b=e[p+x];if(b!==e[f+x]||b!==e[u+x]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let p=a*n,f=o*n;for(let u=0;u!==n;++u)e[f+u]=e[p+u]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,ec(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function mu(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=Yo;var Mi=class extends xn{constructor(t,e,n){super(t,e,n)}};Mi.prototype.ValueTypeName="bool";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=lr;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var ua=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};ua.prototype.ValueTypeName="color";var da=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};da.prototype.ValueTypeName="number";var fa=class extends bi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Oe.slerpFlat(r,0,o,c-a,o,c,l);return r}},Nr=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new fa(this.times,this.values,this.getValueSize(),t)}};Nr.prototype.ValueTypeName="quaternion";Nr.prototype.InterpolantFactoryMethodSmooth=void 0;var Si=class extends xn{constructor(t,e,n){super(t,e,n)}};Si.prototype.ValueTypeName="string";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=lr;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var pa=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};pa.prototype.ValueTypeName="vector";var ma=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,f=c.length;p<f;p+=2){let u=c[p],x=c[p+1];if(u.global&&(u.lastIndex=0),u.test(h))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},hd=new ma,ga=class{constructor(t){this.manager=t!==void 0?t:hd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ga.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ps=class extends Je{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ct(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Ur=class extends Ps{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},nc=new fe,gu=new N,_u=new N,Fr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=dn,this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Es,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;gu.setFromMatrixPosition(t.matrixWorld),e.position.copy(gu),_u.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(_u),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){nc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(nc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===xs||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(nc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},No=new N,Uo=new Oe,Wn=new N,Or=class extends Je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(No,Uo,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Uo,Wn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(No,Uo,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Uo,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},pi=new N,xu=new ut,yu=new ut,Ke=class extends Or{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(pi.x,pi.y).multiplyScalar(-t/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-t/pi.z)}getViewSize(t,e){return this.getViewBounds(t,xu,yu),e.subVectors(yu,xu)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(sr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var uc=class extends Fr{constructor(){super(new Ke(90,1,.5,500)),this.isPointLightShadow=!0}},Br=class extends Ps{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new uc}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},Is=class extends Or{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},dc=class extends Fr{constructor(){super(new Is(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},zr=class extends Ps{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.target=new Je,this.shadow=new dc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var fs=-90,ps=1,_a=class extends Je{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ke(fs,ps,t,e);s.layers=this.layers,this.add(s);let r=new Ke(fs,ps,t,e);r.layers=this.layers,this.add(r);let o=new Ke(fs,ps,t,e);o.layers=this.layers,this.add(o);let a=new Ke(fs,ps,t,e);a.layers=this.layers,this.add(a);let l=new Ke(fs,ps,t,e);l.layers=this.layers,this.add(l);let c=new Ke(fs,ps,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,p=t.getRenderTarget(),f=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=b,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(p,f,u),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},xa=class extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Hc="\\[\\]\\.:\\/",r0=new RegExp("["+Hc+"]","g"),Gc="[^"+Hc+"]",o0="[^"+Hc.replace("\\.","")+"]",a0=/((?:WC+[\/:])*)/.source.replace("WC",Gc),l0=/(WCOD+)?/.source.replace("WCOD",o0),c0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gc),h0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gc),u0=new RegExp("^"+a0+l0+c0+h0+"$"),d0=["material","materials","bones","map"],fc=class{constructor(t,e,n){let s=n||Re.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Re=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(r0,"")}static parseTrackName(t){let e=u0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);d0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Gt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){qt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){qt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){qt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){qt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){qt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;qt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Re.Composite=fc;Re.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Re.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Re.prototype.GetterByBindingType=[Re.prototype._getValue_direct,Re.prototype._getValue_array,Re.prototype._getValue_arrayElement,Re.prototype._getValue_toArray];Re.prototype.SetterByBindingTypeAndVersioning=[[Re.prototype._setValue_direct,Re.prototype._setValue_direct_setNeedsUpdate,Re.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_array,Re.prototype._setValue_array_setNeedsUpdate,Re.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_arrayElement,Re.prototype._setValue_arrayElement_setNeedsUpdate,Re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Re.prototype._setValue_fromArray,Re.prototype._setValue_fromArray_setNeedsUpdate,Re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var fv=new Float32Array(1);var Vr=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Gt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}},Ls=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=te(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(te(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Zc=class Zc{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Zc.prototype.isMatrix2=!0;var pc=Zc;var Hr=class extends Dn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function kc(i,t,e,n){let s=f0(n);switch(e){case Dc:return i*t;case qr:return i*t/s.components*s.byteLength;case Aa:return i*t/s.components*s.byteLength;case Pi:return i*t*2/s.components*s.byteLength;case Ra:return i*t*2/s.components*s.byteLength;case Nc:return i*t*3/s.components*s.byteLength;case An:return i*t*4/s.components*s.byteLength;case Ca:return i*t*4/s.components*s.byteLength;case Yr:case Zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Kr:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:case Da:return Math.max(i,16)*Math.max(t,8)/4;case Pa:case La:return Math.max(i,8)*Math.max(t,8)/2;case Na:case Ua:case Oa:case Ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Fa:case $r:case za:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ga:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ka:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Xa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case qa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case $a:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Qa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case tl:case el:case nl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case il:case sl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case jr:case rl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function f0(i){switch(i){case dn:case Cc:return{byteLength:1,components:1};case Us:case Pc:case Bn:return{byteLength:2,components:1};case wa:case Ta:return{byteLength:2,components:4};case Fn:case Ea:case On:return{byteLength:4,components:1};case Ic:case Lc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Gt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Ld(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function b0(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,p=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let u;if(c instanceof Float32Array)u=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=i.SHORT;else if(c instanceof Uint32Array)u=i.UNSIGNED_INT;else if(c instanceof Int32Array)u=i.INT;else if(c instanceof Int8Array)u=i.BYTE;else if(c instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,l,c){let h=l.array,p=l.updateRanges;if(i.bindBuffer(c,a),p.length===0)i.bufferSubData(c,0,h);else{p.sort((u,x)=>u.start-x.start);let f=0;for(let u=1;u<p.length;u++){let x=p[f],b=p[u];b.start<=x.start+x.count+1?x.count=Math.max(x.count,b.start+b.count-x.start):(++f,p[f]=b)}p.length=f+1;for(let u=0,x=p.length;u<x;u++){let b=p[u];i.bufferSubData(c,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var M0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,S0=`#ifdef USE_ALPHAHASH
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
#endif`,E0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,w0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,T0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,A0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,R0=`#ifdef USE_AOMAP
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
#endif`,C0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,P0=`#ifdef USE_BATCHING
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
#endif`,I0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,L0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,D0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,N0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,U0=`#ifdef USE_IRIDESCENCE
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
#endif`,F0=`#ifdef USE_BUMPMAP
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
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,B0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,V0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,H0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,G0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,k0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,W0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,X0=`#define PI 3.141592653589793
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
} // validated`,q0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Y0=`vec3 transformedNormal = objectNormal;
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
#endif`,Z0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,K0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,J0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,j0="gl_FragColor = linearToOutputTexel( gl_FragColor );",Q0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tm=`#ifdef USE_ENVMAP
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
#endif`,em=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
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
#endif`,im=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sm=`#ifdef USE_ENVMAP
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
#endif`,rm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,om=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,am=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cm=`#ifdef USE_GRADIENTMAP
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
}`,hm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,um=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,pm=`#ifdef USE_ENVMAP
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
#endif`,mm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_m=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ym=`PhysicalMaterial material;
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
#endif`,vm=`uniform sampler2D dfgLUT;
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
}`,bm=`
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
#endif`,Mm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Em=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,wm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Am=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lm=`#if defined( USE_POINTS_UV )
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
#endif`,Dm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Um=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Om=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bm=`#ifdef USE_MORPHTARGETS
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
#endif`,zm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Hm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Xm=`#ifdef USE_NORMALMAP
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
#endif`,qm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ym=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Km=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$m=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,eg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ng=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ig=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,og=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ag=`float getShadowMask() {
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
}`,lg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cg=`#ifdef USE_SKINNING
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
#endif`,hg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ug=`#ifdef USE_SKINNING
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
#endif`,dg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gg=`#ifdef USE_TRANSMISSION
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
#endif`,_g=`#ifdef USE_TRANSMISSION
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
#endif`,xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Mg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sg=`uniform sampler2D t2D;
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
}`,Eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ag=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`#include <common>
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
}`,Cg=`#if DEPTH_PACKING == 3200
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
}`,Pg=`#define DISTANCE
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
}`,Ig=`#define DISTANCE
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
}`,Lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ng=`uniform float scale;
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
}`,Ug=`uniform vec3 diffuse;
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
}`,Fg=`#include <common>
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
}`,Og=`uniform vec3 diffuse;
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
}`,Bg=`#define LAMBERT
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
}`,zg=`#define LAMBERT
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
}`,Vg=`#define MATCAP
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
}`,Hg=`#define MATCAP
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
}`,Gg=`#define NORMAL
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
}`,kg=`#define NORMAL
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
}`,Wg=`#define PHONG
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
}`,Xg=`#define PHONG
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
}`,qg=`#define STANDARD
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
}`,Yg=`#define STANDARD
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
}`,Zg=`#define TOON
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
}`,Kg=`#define TOON
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
}`,Jg=`uniform float size;
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
}`,$g=`uniform vec3 diffuse;
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
}`,jg=`#include <common>
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
}`,Qg=`uniform vec3 color;
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
}`,t_=`uniform float rotation;
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
}`,e_=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:M0,alphahash_pars_fragment:S0,alphamap_fragment:E0,alphamap_pars_fragment:w0,alphatest_fragment:T0,alphatest_pars_fragment:A0,aomap_fragment:R0,aomap_pars_fragment:C0,batching_pars_vertex:P0,batching_vertex:I0,begin_vertex:L0,beginnormal_vertex:D0,bsdfs:N0,iridescence_fragment:U0,bumpmap_pars_fragment:F0,clipping_planes_fragment:O0,clipping_planes_pars_fragment:B0,clipping_planes_pars_vertex:z0,clipping_planes_vertex:V0,color_fragment:H0,color_pars_fragment:G0,color_pars_vertex:k0,color_vertex:W0,common:X0,cube_uv_reflection_fragment:q0,defaultnormal_vertex:Y0,displacementmap_pars_vertex:Z0,displacementmap_vertex:K0,emissivemap_fragment:J0,emissivemap_pars_fragment:$0,colorspace_fragment:j0,colorspace_pars_fragment:Q0,envmap_fragment:tm,envmap_common_pars_fragment:em,envmap_pars_fragment:nm,envmap_pars_vertex:im,envmap_physical_pars_fragment:pm,envmap_vertex:sm,fog_vertex:rm,fog_pars_vertex:om,fog_fragment:am,fog_pars_fragment:lm,gradientmap_pars_fragment:cm,lightmap_pars_fragment:hm,lights_lambert_fragment:um,lights_lambert_pars_fragment:dm,lights_pars_begin:fm,lights_toon_fragment:mm,lights_toon_pars_fragment:gm,lights_phong_fragment:_m,lights_phong_pars_fragment:xm,lights_physical_fragment:ym,lights_physical_pars_fragment:vm,lights_fragment_begin:bm,lights_fragment_maps:Mm,lights_fragment_end:Sm,lightprobes_pars_fragment:Em,logdepthbuf_fragment:wm,logdepthbuf_pars_fragment:Tm,logdepthbuf_pars_vertex:Am,logdepthbuf_vertex:Rm,map_fragment:Cm,map_pars_fragment:Pm,map_particle_fragment:Im,map_particle_pars_fragment:Lm,metalnessmap_fragment:Dm,metalnessmap_pars_fragment:Nm,morphinstance_vertex:Um,morphcolor_vertex:Fm,morphnormal_vertex:Om,morphtarget_pars_vertex:Bm,morphtarget_vertex:zm,normal_fragment_begin:Vm,normal_fragment_maps:Hm,normal_pars_fragment:Gm,normal_pars_vertex:km,normal_vertex:Wm,normalmap_pars_fragment:Xm,clearcoat_normal_fragment_begin:qm,clearcoat_normal_fragment_maps:Ym,clearcoat_pars_fragment:Zm,iridescence_pars_fragment:Km,opaque_fragment:Jm,packing:$m,premultiplied_alpha_fragment:jm,project_vertex:Qm,dithering_fragment:tg,dithering_pars_fragment:eg,roughnessmap_fragment:ng,roughnessmap_pars_fragment:ig,shadowmap_pars_fragment:sg,shadowmap_pars_vertex:rg,shadowmap_vertex:og,shadowmask_pars_fragment:ag,skinbase_vertex:lg,skinning_pars_vertex:cg,skinning_vertex:hg,skinnormal_vertex:ug,specularmap_fragment:dg,specularmap_pars_fragment:fg,tonemapping_fragment:pg,tonemapping_pars_fragment:mg,transmission_fragment:gg,transmission_pars_fragment:_g,uv_pars_fragment:xg,uv_pars_vertex:yg,uv_vertex:vg,worldpos_vertex:bg,background_vert:Mg,background_frag:Sg,backgroundCube_vert:Eg,backgroundCube_frag:wg,cube_vert:Tg,cube_frag:Ag,depth_vert:Rg,depth_frag:Cg,distance_vert:Pg,distance_frag:Ig,equirect_vert:Lg,equirect_frag:Dg,linedashed_vert:Ng,linedashed_frag:Ug,meshbasic_vert:Fg,meshbasic_frag:Og,meshlambert_vert:Bg,meshlambert_frag:zg,meshmatcap_vert:Vg,meshmatcap_frag:Hg,meshnormal_vert:Gg,meshnormal_frag:kg,meshphong_vert:Wg,meshphong_frag:Xg,meshphysical_vert:qg,meshphysical_frag:Yg,meshtoon_vert:Zg,meshtoon_frag:Kg,points_vert:Jg,points_frag:$g,shadow_vert:jg,shadow_frag:Qg,sprite_vert:t_,sprite_frag:e_},St={common:{diffuse:{value:new Ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new Ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Ct(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Jn={basic:{uniforms:nn([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:nn([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Ct(0)},envMapIntensity:{value:1}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:nn([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Ct(0)},specular:{value:new Ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:nn([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new Ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:nn([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new Ct(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:nn([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:nn([St.points,St.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:nn([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:nn([St.common,St.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:nn([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:nn([St.sprite,St.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distance:{uniforms:nn([St.common,St.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distance_vert,fragmentShader:ee.distance_frag},shadow:{uniforms:nn([St.lights,St.fog,{color:{value:new Ct(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};Jn.physical={uniforms:nn([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Ct(0)},specularColor:{value:new Ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};var cl={r:0,b:0,g:0},n_=new fe,Dd=new Zt;Dd.set(-1,0,0,0,1,0,0,0,1);function i_(i,t,e,n,s,r){let o=new Ct(0),a=s===!0?0:1,l,c,h=null,p=0,f=null;function u(w){let M=w.isScene===!0?w.background:null;if(M&&M.isTexture){let _=w.backgroundBlurriness>0;M=t.get(M,_)}return M}function x(w){let M=!1,_=u(w);_===null?g(o,a):_&&_.isColor&&(g(_,1),M=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(w,M){let _=u(M);_&&(_.isCubeTexture||_.mapping===Wr)?(c===void 0&&(c=new le(new xi(1,1,1),new qe({name:"BackgroundCubeMaterial",uniforms:Ki(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(n_.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Dd),c.material.toneMapped=re.getTransfer(_.colorSpace)!==de,(h!==_||p!==_.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,p=_.version,f=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new le(new Yn(2,2),new qe({name:"BackgroundMaterial",uniforms:Ki(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=re.getTransfer(_.colorSpace)!==de,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||p!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,p=_.version,f=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function g(w,M){w.getRGB(cl,Vc(i)),e.buffers.color.setClear(cl.r,cl.g,cl.b,M,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,M=1){o.set(w),a=M,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(w){a=w,g(o,a)},render:x,addToRenderList:b,dispose:m}}function s_(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(I,L,U,D,B){let k=!1,W=p(I,D,U,L);r!==W&&(r=W,c(r.object)),k=u(I,D,U,B),k&&x(I,D,U,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,_(I,L,U,D),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function h(I){return i.deleteVertexArray(I)}function p(I,L,U,D){let B=D.wireframe===!0,k=n[L.id];k===void 0&&(k={},n[L.id]=k);let W=I.isInstancedMesh===!0?I.id:0,Y=k[W];Y===void 0&&(Y={},k[W]=Y);let J=Y[U.id];J===void 0&&(J={},Y[U.id]=J);let tt=J[B];return tt===void 0&&(tt=f(l()),J[B]=tt),tt}function f(I){let L=[],U=[],D=[];for(let B=0;B<e;B++)L[B]=0,U[B]=0,D[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:D,object:I,attributes:{},index:null}}function u(I,L,U,D){let B=r.attributes,k=L.attributes,W=0,Y=U.getAttributes();for(let J in Y)if(Y[J].location>=0){let it=B[J],O=k[J];if(O===void 0&&(J==="instanceMatrix"&&I.instanceMatrix&&(O=I.instanceMatrix),J==="instanceColor"&&I.instanceColor&&(O=I.instanceColor)),it===void 0||it.attribute!==O||O&&it.data!==O.data)return!0;W++}return r.attributesNum!==W||r.index!==D}function x(I,L,U,D){let B={},k=L.attributes,W=0,Y=U.getAttributes();for(let J in Y)if(Y[J].location>=0){let it=k[J];it===void 0&&(J==="instanceMatrix"&&I.instanceMatrix&&(it=I.instanceMatrix),J==="instanceColor"&&I.instanceColor&&(it=I.instanceColor));let O={};O.attribute=it,it&&it.data&&(O.data=it.data),B[J]=O,W++}r.attributes=B,r.attributesNum=W,r.index=D}function b(){let I=r.newAttributes;for(let L=0,U=I.length;L<U;L++)I[L]=0}function g(I){m(I,0)}function m(I,L){let U=r.newAttributes,D=r.enabledAttributes,B=r.attributeDivisors;U[I]=1,D[I]===0&&(i.enableVertexAttribArray(I),D[I]=1),B[I]!==L&&(i.vertexAttribDivisor(I,L),B[I]=L)}function w(){let I=r.newAttributes,L=r.enabledAttributes;for(let U=0,D=L.length;U<D;U++)L[U]!==I[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function M(I,L,U,D,B,k,W){W===!0?i.vertexAttribIPointer(I,L,U,B,k):i.vertexAttribPointer(I,L,U,D,B,k)}function _(I,L,U,D){b();let B=D.attributes,k=U.getAttributes(),W=L.defaultAttributeValues;for(let Y in k){let J=k[Y];if(J.location>=0){let tt=B[Y];if(tt===void 0&&(Y==="instanceMatrix"&&I.instanceMatrix&&(tt=I.instanceMatrix),Y==="instanceColor"&&I.instanceColor&&(tt=I.instanceColor)),tt!==void 0){let it=tt.normalized,O=tt.itemSize,G=t.get(tt);if(G===void 0)continue;let j=G.buffer,at=G.type,mt=G.bytesPerElement,K=at===i.INT||at===i.UNSIGNED_INT||tt.gpuType===Ea;if(tt.isInterleavedBufferAttribute){let Q=tt.data,ft=Q.stride,Dt=tt.offset;if(Q.isInstancedInterleavedBuffer){for(let Tt=0;Tt<J.locationSize;Tt++)m(J.location+Tt,Q.meshPerAttribute);I.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Tt=0;Tt<J.locationSize;Tt++)g(J.location+Tt);i.bindBuffer(i.ARRAY_BUFFER,j);for(let Tt=0;Tt<J.locationSize;Tt++)M(J.location+Tt,O/J.locationSize,at,it,ft*mt,(Dt+O/J.locationSize*Tt)*mt,K)}else{if(tt.isInstancedBufferAttribute){for(let Q=0;Q<J.locationSize;Q++)m(J.location+Q,tt.meshPerAttribute);I.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Q=0;Q<J.locationSize;Q++)g(J.location+Q);i.bindBuffer(i.ARRAY_BUFFER,j);for(let Q=0;Q<J.locationSize;Q++)M(J.location+Q,O/J.locationSize,at,it,O*mt,O/J.locationSize*Q*mt,K)}}else if(W!==void 0){let it=W[Y];if(it!==void 0)switch(it.length){case 2:i.vertexAttrib2fv(J.location,it);break;case 3:i.vertexAttrib3fv(J.location,it);break;case 4:i.vertexAttrib4fv(J.location,it);break;default:i.vertexAttrib1fv(J.location,it)}}}}w()}function S(){A();for(let I in n){let L=n[I];for(let U in L){let D=L[U];for(let B in D){let k=D[B];for(let W in k)h(k[W].object),delete k[W];delete D[B]}}delete n[I]}}function E(I){if(n[I.id]===void 0)return;let L=n[I.id];for(let U in L){let D=L[U];for(let B in D){let k=D[B];for(let W in k)h(k[W].object),delete k[W];delete D[B]}}delete n[I.id]}function C(I){for(let L in n){let U=n[L];for(let D in U){let B=U[D];if(B[I.id]===void 0)continue;let k=B[I.id];for(let W in k)h(k[W].object),delete k[W];delete B[I.id]}}}function y(I){for(let L in n){let U=n[L],D=I.isInstancedMesh===!0?I.id:0,B=U[D];if(B!==void 0){for(let k in B){let W=B[k];for(let Y in W)h(W[Y].object),delete W[Y];delete B[k]}delete U[D],Object.keys(U).length===0&&delete n[L]}}}function A(){R(),o=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:R,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:b,enableAttribute:g,disableUnusedAttributes:w}}function r_(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let u=0;u<h;u++)f+=c[u];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function o_(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==An&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let y=C===Bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==dn&&C!==On&&!y&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Gt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let p=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Gt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:f,maxTextures:u,maxVertexTextures:x,maxTextureSize:b,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:w,maxVaryings:M,maxFragmentUniforms:_,maxSamples:S,samples:E}}function a_(i){let t=this,e=null,n=0,s=!1,r=!1,o=new gn,a=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,f){let u=p.length!==0||f||n!==0||s;return s=f,n=p.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,f){e=h(p,f,0)},this.setState=function(p,f,u){let x=p.clippingPlanes,b=p.clipIntersection,g=p.clipShadows,m=i.get(p);if(!s||x===null||x.length===0||r&&!g)r?h(null):c();else{let w=r?0:n,M=w*4,_=m.clippingState||null;l.value=_,_=h(x,f,M,u);for(let S=0;S!==M;++S)_[S]=e[S];m.clippingState=_,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(p,f,u,x){let b=p!==null?p.length:0,g=null;if(b!==0){if(g=l.value,x!==!0||g===null){let m=u+b*4,w=f.matrixWorldInverse;a.getNormalMatrix(w),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,_=u;M!==b;++M,_+=4)o.copy(p[M]).applyMatrix4(w,a),o.normal.toArray(g,_),g[_+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,g}}var Bs=4,l_=6,c_=20,h_=256,Qr=new Is,ud=new Ct,Kc=null,Jc=0,$c=0,jc=!1,u_=new N,Ji=new N,ul=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=u_}=r;Kc=this._renderer.getRenderTarget(),Jc=this._renderer.getActiveCubeFace(),$c=this._renderer.getActiveMipmapLevel(),jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Kc,Jc,$c),this._renderer.xr.enabled=jc,t.scissorTest=!1,Os(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ai||t.mapping===Yi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Kc=this._renderer.getRenderTarget(),Jc=this._renderer.getActiveCubeFace(),$c=this._renderer.getActiveMipmapLevel(),jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ze,minFilter:ze,generateMipmaps:!1,type:Bn,format:An,colorSpace:cr,depthBuffer:!1},s=dd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dd(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=d_(r)),this._blurMaterial=p_(r,t,e),this._ggxMaterial=f_(r,t,e)}return s}_compileMaterial(t){let e=new le(new Ce,t);this._renderer.compile(e,Qr)}_sceneToCubeUV(t,e,n,s,r){let l=new Ke(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,f=p.autoClear,u=p.toneMapping;p.getClearColor(ud),p.toneMapping=Un,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new le(new xi,new qn({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,g=b.material,m=!1,w=t.background;w?w.isColor&&(g.color.copy(w),t.background=null,m=!0):(g.color.copy(ud),m=!0);for(let M=0;M<6;M++){let _=M%3;_===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):_===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));let S=this._cubeSize;Os(s,_*S,M>2?S:0,S,S),p.setRenderTarget(s),m&&p.render(b,l),p.render(t,l)}p.toneMapping=u,p.autoClear=f,t.background=w}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ai||t.mapping===Yi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Os(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Qr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h),f=c*1.25,u=p*f,{_lodMax:x}=this,b=this._sizeLods[n],g=3*b*(n>x-Bs?n-x+Bs:0),m=4*(this._cubeSize-b);l.envMap.value=t.texture,l.roughness.value=u,l.mipInt.value=x-e,Os(r,g,m,3*b,2*b),s.setRenderTarget(r),s.render(a,Qr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-n,Os(t,g,m,3*b,2*b),s.setRenderTarget(t),s.render(a,Qr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],p=3*h*(s>this._lodMax-Bs?s-this._lodMax+Bs:0),f=4*(this._cubeSize-h);Os(e,p,f,3*h,2*h),o.setRenderTarget(e),o.render(l,Qr)}};function d_(i){let t=[],e=[],n=i,s=i-Bs+1+l_;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,f=6,u=3,x=new Float32Array(u*f*p),b=new Float32Array(u*f*p);for(let m=0;m<p;m++){let w=m%3*2/3-1,M=m>2?0:-1,_=[w,M,0,w+2/3,M,0,w+2/3,M+1,0,w,M,0,w+2/3,M+1,0,w,M+1,0];x.set(_,u*f*m);for(let S=0;S<f;S++){let E=h[S*2]*2-1,C=h[S*2+1]*2-1;m===0?Ji.set(1,C,E):m===1?Ji.set(-E,1,-C):m===2?Ji.set(-E,C,1):m===3?Ji.set(-1,C,-E):m===4?Ji.set(-E,-1,C):Ji.set(E,C,-1),Ji.toArray(b,(m*f+S)*u)}}let g=new Ce;g.setAttribute("position",new ve(x,u)),g.setAttribute("outputDirection",new ve(b,u)),e.push(new le(g,null)),n>Bs&&n--}return{lodMeshes:e,sizeLods:t}}function dd(i,t,e){let n=new un(i,t,e);return n.texture.mapping=Wr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Os(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function f_(i,t,e){return new qe({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:h_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function p_(i,t,e){return new qe({name:"SphericalGaussianBlur",defines:{SAMPLES:c_,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:pl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function fd(){return new qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function pd(){return new qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function pl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var dl=class extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new yr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new xi(5,5,5),r=new qe({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:Zn});r.uniforms.tEquirect.value=e;let o=new le(s,r),a=e.minFilter;return e.minFilter===Ri&&(e.minFilter=ze),new _a(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function m_(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,u=!1){return f==null?null:u?o(f):r(f)}function r(f){if(f&&f.isTexture){let u=f.mapping;if(u===ba||u===Ma)if(t.has(f)){let x=t.get(f).texture;return a(x,f.mapping)}else{let x=f.image;if(x&&x.height>0){let b=new dl(x.height);return b.fromEquirectangularTexture(i,f),t.set(f,b),f.addEventListener("dispose",c),a(b.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){let u=f.mapping,x=u===ba||u===Ma,b=u===Ai||u===Yi;if(x||b){let g=e.get(f),m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new ul(i)),g=x?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,e.set(f,g),g.texture;if(g!==void 0)return g.texture;{let w=f.image;return x&&w&&w.height>0||b&&w&&l(w)?(n===null&&(n=new ul(i)),g=x?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,e.set(f,g),f.addEventListener("dispose",h),g.texture):null}}}return f}function a(f,u){return u===ba?f.mapping=Ai:u===Ma&&(f.mapping=Yi),f}function l(f){let u=0,x=6;for(let b=0;b<x;b++)f[b]!==void 0&&u++;return u===x}function c(f){let u=f.target;u.removeEventListener("dispose",c);let x=t.get(u);x!==void 0&&(t.delete(u),x.dispose())}function h(f){let u=f.target;u.removeEventListener("dispose",h);let x=e.get(u);x!==void 0&&(e.delete(u),x.dispose())}function p(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function g_(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Gi("WebGLRenderer: "+n+" extension not supported."),s}}}function __(i,t,e,n){let s={},r=new WeakMap;function o(p){let f=p.target;f.index!==null&&t.remove(f.index);for(let x in f.attributes)t.remove(f.attributes[x]);f.removeEventListener("dispose",o),delete s[f.id];let u=r.get(f);u&&(t.remove(u),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(p,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(p){let f=p.attributes;for(let u in f)t.update(f[u],i.ARRAY_BUFFER)}function c(p){let f=[],u=p.index,x=p.attributes.position,b=0;if(x===void 0)return;if(u!==null){let w=u.array;b=u.version;for(let M=0,_=w.length;M<_;M+=3){let S=w[M+0],E=w[M+1],C=w[M+2];f.push(S,E,E,C,C,S)}}else{let w=x.array;b=x.version;for(let M=0,_=w.length/3-1;M<_;M+=3){let S=M+0,E=M+1,C=M+2;f.push(S,E,E,C,C,S)}}let g=new(x.count>=65535?_r:gr)(f,1);g.version=b;let m=r.get(p);m&&t.remove(m),r.set(p,g)}function h(p){let f=r.get(p);if(f){let u=p.index;u!==null&&f.version<u.version&&c(p)}else c(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:h}}function x_(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function l(p,f){i.drawElements(n,f,r,p*o),e.update(f,n,1)}function c(p,f,u){u!==0&&(i.drawElementsInstanced(n,f,r,p*o,u),e.update(f,n,u))}function h(p,f,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,p,0,u);let b=0;for(let g=0;g<u;g++)b+=f[g];e.update(b,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function y_(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:qt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function v_(i,t,e){let n=new WeakMap,s=new Ie;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==p){let A=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",A)};f!==void 0&&f.texture.dispose();let u=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,b=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],M=0;u===!0&&(M=1),x===!0&&(M=2),b===!0&&(M=3);let _=a.attributes.position.count*M,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let E=new Float32Array(_*S*4*p),C=new dr(E,_,S,p);C.type=On,C.needsUpdate=!0;let y=M*4;for(let R=0;R<p;R++){let I=g[R],L=m[R],U=w[R],D=_*S*4*R;for(let B=0;B<I.count;B++){let k=B*y;u===!0&&(s.fromBufferAttribute(I,B),E[D+k+0]=s.x,E[D+k+1]=s.y,E[D+k+2]=s.z,E[D+k+3]=0),x===!0&&(s.fromBufferAttribute(L,B),E[D+k+4]=s.x,E[D+k+5]=s.y,E[D+k+6]=s.z,E[D+k+7]=0),b===!0&&(s.fromBufferAttribute(U,B),E[D+k+8]=s.x,E[D+k+9]=s.y,E[D+k+10]=s.z,E[D+k+11]=U.itemSize===4?s.w:1)}}f={count:p,texture:C,size:new ut(_,S)},n.set(a,f),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let u=0;for(let b=0;b<c.length;b++)u+=c[b];let x=a.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function b_(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,p=c.geometry,f=t.get(c,p);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let u=c.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return f}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var M_={[bc]:"LINEAR_TONE_MAPPING",[Mc]:"REINHARD_TONE_MAPPING",[Sc]:"CINEON_TONE_MAPPING",[Ec]:"ACES_FILMIC_TONE_MAPPING",[Tc]:"AGX_TONE_MAPPING",[Ac]:"NEUTRAL_TONE_MAPPING",[wc]:"CUSTOM_TONE_MAPPING"};function S_(i,t,e,n,s,r){let o=new un(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Ce;c.setAttribute("position",new pe([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new pe([0,2,0,0,2,0],2));let h=new sa({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),p=new le(c,h),f=new Is(-1,1,1,-1,0,1),u=null,x=null,b=!1,g,m=null,w=[],M=!1;this.setSize=function(_,S){o.setSize(_,S),a!==null&&a.setSize(_,S),l!==null&&l.setSize(_,S);for(let E=0;E<w.length;E++){let C=w[E];C.setSize&&C.setSize(_,S)}},this.setEffects=function(_){w=_,M=w.length>0&&w[0].isRenderPass===!0;let S=o.width,E=o.height;w.length>0&&a===null&&(a=new un(S,E,{type:Bn,depthBuffer:!1,stencilBuffer:!1}),l=new un(S,E,{type:Bn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<w.length;C++){let y=w[C];y.setSize&&y.setSize(S,E)}},this.begin=function(_,S){if(b||_.toneMapping===Un&&w.length===0)return!1;if(m=S,S!==null){let E=S.width,C=S.height;(o.width!==E||o.height!==C)&&this.setSize(E,C)}return M===!1&&_.setRenderTarget(o),g=_.toneMapping,_.toneMapping=Un,!0},this.hasRenderPass=function(){return M},this.end=function(_,S){_.toneMapping=g,b=!0;let E=o,C=a;for(let y=0;y<w.length;y++){let A=w[y];A.enabled!==!1&&(A.render(_,C,E,S),A.needsSwap!==!1&&(E=C,C=C===a?l:a))}if(u!==_.outputColorSpace||x!==_.toneMapping){u=_.outputColorSpace,x=_.toneMapping,h.defines={},re.getTransfer(u)===de&&(h.defines.SRGB_TRANSFER="");let y=M_[x];y&&(h.defines[y]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,_.setRenderTarget(m),_.render(p,f),m=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Nd=new an,eh=new _i(1,1),Ud=new dr,Fd=new Jo,Od=new yr,md=[],gd=[],_d=new Float32Array(16),xd=new Float32Array(9),yd=new Float32Array(4);function Vs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=md[s];if(r===void 0&&(r=new Float32Array(s),md[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function He(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ml(i,t){let e=gd[t];e===void 0&&(e=new Int32Array(t),gd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function E_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function w_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2fv(this.addr,t),He(e,t)}}function T_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ve(e,t))return;i.uniform3fv(this.addr,t),He(e,t)}}function A_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4fv(this.addr,t),He(e,t)}}function R_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(Ve(e,n))return;yd.set(n),i.uniformMatrix2fv(this.addr,!1,yd),He(e,n)}}function C_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(Ve(e,n))return;xd.set(n),i.uniformMatrix3fv(this.addr,!1,xd),He(e,n)}}function P_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(Ve(e,n))return;_d.set(n),i.uniformMatrix4fv(this.addr,!1,_d),He(e,n)}}function I_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function L_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2iv(this.addr,t),He(e,t)}}function D_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3iv(this.addr,t),He(e,t)}}function N_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4iv(this.addr,t),He(e,t)}}function U_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function F_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2uiv(this.addr,t),He(e,t)}}function O_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3uiv(this.addr,t),He(e,t)}}function B_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4uiv(this.addr,t),He(e,t)}}function z_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(eh.compareFunction=e.isReversedDepthBuffer()?ll:al,r=eh):r=Nd,e.setTexture2D(t||r,s)}function V_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Fd,s)}function H_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Od,s)}function G_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ud,s)}function k_(i){switch(i){case 5126:return E_;case 35664:return w_;case 35665:return T_;case 35666:return A_;case 35674:return R_;case 35675:return C_;case 35676:return P_;case 5124:case 35670:return I_;case 35667:case 35671:return L_;case 35668:case 35672:return D_;case 35669:case 35673:return N_;case 5125:return U_;case 36294:return F_;case 36295:return O_;case 36296:return B_;case 35678:case 36198:case 36298:case 36306:case 35682:return z_;case 35679:case 36299:case 36307:return V_;case 35680:case 36300:case 36308:case 36293:return H_;case 36289:case 36303:case 36311:case 36292:return G_}}function W_(i,t){i.uniform1fv(this.addr,t)}function X_(i,t){let e=Vs(t,this.size,2);i.uniform2fv(this.addr,e)}function q_(i,t){let e=Vs(t,this.size,3);i.uniform3fv(this.addr,e)}function Y_(i,t){let e=Vs(t,this.size,4);i.uniform4fv(this.addr,e)}function Z_(i,t){let e=Vs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function K_(i,t){let e=Vs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function J_(i,t){let e=Vs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function $_(i,t){i.uniform1iv(this.addr,t)}function j_(i,t){i.uniform2iv(this.addr,t)}function Q_(i,t){i.uniform3iv(this.addr,t)}function tx(i,t){i.uniform4iv(this.addr,t)}function ex(i,t){i.uniform1uiv(this.addr,t)}function nx(i,t){i.uniform2uiv(this.addr,t)}function ix(i,t){i.uniform3uiv(this.addr,t)}function sx(i,t){i.uniform4uiv(this.addr,t)}function rx(i,t,e){let n=this.cache,s=t.length,r=ml(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),He(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=eh:o=Nd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function ox(i,t,e){let n=this.cache,s=t.length,r=ml(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Fd,r[o])}function ax(i,t,e){let n=this.cache,s=t.length,r=ml(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Od,r[o])}function lx(i,t,e){let n=this.cache,s=t.length,r=ml(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),He(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Ud,r[o])}function cx(i){switch(i){case 5126:return W_;case 35664:return X_;case 35665:return q_;case 35666:return Y_;case 35674:return Z_;case 35675:return K_;case 35676:return J_;case 5124:case 35670:return $_;case 35667:case 35671:return j_;case 35668:case 35672:return Q_;case 35669:case 35673:return tx;case 5125:return ex;case 36294:return nx;case 36295:return ix;case 36296:return sx;case 35678:case 36198:case 36298:case 36306:case 35682:return rx;case 35679:case 36299:case 36307:return ox;case 35680:case 36300:case 36308:case 36293:return ax;case 36289:case 36303:case 36311:case 36292:return lx}}var nh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=k_(e.type)}},ih=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=cx(e.type)}},sh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Qc=/(\w+)(\])?(\[|\.)?/g;function vd(i,t){i.seq.push(t),i.map[t.id]=t}function hx(i,t,e){let n=i.name,s=n.length;for(Qc.lastIndex=0;;){let r=Qc.exec(n),o=Qc.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){vd(e,c===void 0?new nh(a,i,t):new ih(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new sh(a),vd(e,p)),e=p}}}var zs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);hx(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function bd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var ux=37297,dx=0;function fx(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Md=new Zt;function px(i){re._getMatrix(Md,re.workingColorSpace,i);let t=`mat3( ${Md.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(i)){case hr:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return Gt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Sd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+fx(i.getShaderSource(t),a)}else return r}function mx(i,t){let e=px(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var gx={[bc]:"Linear",[Mc]:"Reinhard",[Sc]:"Cineon",[Ec]:"ACESFilmic",[Tc]:"AgX",[Ac]:"Neutral",[wc]:"Custom"};function _x(i,t){let e=gx[t];return e===void 0?(Gt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var hl=new N;function xx(){re.getLuminanceCoefficients(hl);let i=hl.x.toFixed(4),t=hl.y.toFixed(4),e=hl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(eo).join(`
`)}function vx(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function bx(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function eo(i){return i!==""}function Ed(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Mx=/^[ \t]*#include +<([\w\d./]+)>/gm;function rh(i){return i.replace(Mx,Ex)}var Sx=new Map;function Ex(i,t){let e=ee[t];if(e===void 0){let n=Sx.get(t);if(n!==void 0)e=ee[n],Gt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return rh(e)}var wx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Td(i){return i.replace(wx,Tx)}function Tx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ad(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var Ax={[Gr]:"SHADOWMAP_TYPE_PCF",[Ds]:"SHADOWMAP_TYPE_VSM"};function Rx(i){return Ax[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Cx={[Ai]:"ENVMAP_TYPE_CUBE",[Yi]:"ENVMAP_TYPE_CUBE",[Wr]:"ENVMAP_TYPE_CUBE_UV"};function Px(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Cx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Ix={[Yi]:"ENVMAP_MODE_REFRACTION"};function Lx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ix[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Dx={[vc]:"ENVMAP_BLENDING_MULTIPLY",[Vu]:"ENVMAP_BLENDING_MIX",[Hu]:"ENVMAP_BLENDING_ADD"};function Nx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Dx[i.combine]||"ENVMAP_BLENDING_NONE"}function Ux(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Fx(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Rx(e),c=Px(e),h=Lx(e),p=Nx(e),f=Ux(e),u=yx(e),x=vx(r),b=s.createProgram(),g,m,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(eo).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(eo).join(`
`),m.length>0&&(m+=`
`)):(g=[Ad(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eo).join(`
`),m=[Ad(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Un?"#define TONE_MAPPING":"",e.toneMapping!==Un?ee.tonemapping_pars_fragment:"",e.toneMapping!==Un?_x("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,mx("linearToOutputTexel",e.outputColorSpace),xx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(eo).join(`
`)),o=rh(o),o=Ed(o,e),o=wd(o,e),a=rh(a),a=Ed(a,e),a=wd(a,e),o=Td(o),a=Td(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Uc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Uc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let M=w+g+o,_=w+m+a,S=bd(s,s.VERTEX_SHADER,M),E=bd(s,s.FRAGMENT_SHADER,_);s.attachShader(b,S),s.attachShader(b,E),e.index0AttributeName!==void 0?s.bindAttribLocation(b,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function C(I){if(i.debug.checkShaderErrors){let L=s.getProgramInfoLog(b)||"",U=s.getShaderInfoLog(S)||"",D=s.getShaderInfoLog(E)||"",B=L.trim(),k=U.trim(),W=D.trim(),Y=!0,J=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,b,S,E);else{let tt=Sd(s,S,"vertex"),it=Sd(s,E,"fragment");qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+tt+`
`+it)}else B!==""?Gt("WebGLProgram: Program Info Log:",B):(k===""||W==="")&&(J=!1);J&&(I.diagnostics={runnable:Y,programLog:B,vertexShader:{log:k,prefix:g},fragmentShader:{log:W,prefix:m}})}s.deleteShader(S),s.deleteShader(E),y=new zs(s,b),A=bx(s,b)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(b,ux)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dx++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=S,this.fragmentShader=E,this}var Ox=0,oh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new ah(t),e.set(t,n)),n}},ah=class{constructor(t){this.id=Ox++,this.code=t,this.usedTimes=0}};function Bx(i){return i===Pi||i===$r||i===jr}function zx(i,t,e,n,s,r){let o=new fr,a=new oh,l=new Set,c=[],h=new Map,p=n.logarithmicDepthBuffer,f=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return l.add(y),y===0?"uv":`uv${y}`}function b(y,A,R,I,L,U){let D=I.fog,B=L.geometry,k=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?I.environment:null,W=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Y=t.get(y.envMap||k,W),J=Y&&Y.mapping===Wr?Y.image.height:null,tt=u[y.type];y.precision!==null&&(f=n.getMaxPrecision(y.precision),f!==y.precision&&Gt("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let it=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,O=it!==void 0?it.length:0,G=0;B.morphAttributes.position!==void 0&&(G=1),B.morphAttributes.normal!==void 0&&(G=2),B.morphAttributes.color!==void 0&&(G=3);let j,at,mt,K;if(tt){let Se=Jn[tt];j=Se.vertexShader,at=Se.fragmentShader}else{j=y.vertexShader,at=y.fragmentShader;let Se=a.getVertexShaderStage(y),he=a.getFragmentShaderStage(y);a.update(y,Se,he),mt=Se.id,K=he.id}let Q=i.getRenderTarget(),ft=i.state.buffers.depth.getReversed(),Dt=L.isInstancedMesh===!0,Tt=L.isBatchedMesh===!0,Ht=!!y.map,_e=!!y.matcap,ot=!!Y,ct=!!y.aoMap,ht=!!y.lightMap,dt=!!y.bumpMap&&y.wireframe===!1,_t=!!y.normalMap,kt=!!y.displacementMap,Vt=!!y.emissiveMap,Yt=!!y.metalnessMap,Kt=!!y.roughnessMap,F=y.anisotropy>0,ce=y.clearcoat>0,ne=y.dispersion>0,P=y.retroreflectivity>0,v=y.iridescence>0,H=y.sheen>0,Z=y.transmission>0,et=F&&!!y.anisotropyMap,pt=ce&&!!y.clearcoatMap,gt=ce&&!!y.clearcoatNormalMap,nt=ce&&!!y.clearcoatRoughnessMap,rt=v&&!!y.iridescenceMap,xt=v&&!!y.iridescenceThicknessMap,Ot=H&&!!y.sheenColorMap,Mt=H&&!!y.sheenRoughnessMap,yt=!!y.specularMap,Bt=!!y.specularColorMap,Wt=!!y.specularIntensityMap,$t=Z&&!!y.transmissionMap,V=Z&&!!y.thicknessMap,vt=!!y.gradientMap,st=!!y.alphaMap,bt=y.alphaTest>0,At=!!y.alphaHash,lt=!!y.extensions,zt=Un;y.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(zt=i.toneMapping);let Nt={shaderID:tt,shaderType:y.type,shaderName:y.name,vertexShader:j,fragmentShader:at,defines:y.defines,customVertexShaderID:mt,customFragmentShaderID:K,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Tt,batchingColor:Tt&&L._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&L.instanceColor!==null,instancingMorph:Dt&&L.morphTexture!==null,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:re.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ht,matcap:_e,envMap:ot,envMapMode:ot&&Y.mapping,envMapCubeUVHeight:J,aoMap:ct,lightMap:ht,bumpMap:dt,normalMap:_t,displacementMap:kt,emissiveMap:Vt,normalMapObjectSpace:_t&&y.normalMapType===Wu,normalMapTangentSpace:_t&&y.normalMapType===ol,packedNormalMap:_t&&y.normalMapType===ol&&Bx(y.normalMap.format),metalnessMap:Yt,roughnessMap:Kt,anisotropy:F,anisotropyMap:et,clearcoat:ce,clearcoatMap:pt,clearcoatNormalMap:gt,clearcoatRoughnessMap:nt,dispersion:ne,retroreflection:P,iridescence:v,iridescenceMap:rt,iridescenceThicknessMap:xt,sheen:H,sheenColorMap:Ot,sheenRoughnessMap:Mt,specularMap:yt,specularColorMap:Bt,specularIntensityMap:Wt,transmission:Z,transmissionMap:$t,thicknessMap:V,gradientMap:vt,opaque:y.transparent===!1&&y.blending===Ns&&y.alphaToCoverage===!1,alphaMap:st,alphaTest:bt,alphaHash:At,combine:y.combine,mapUv:Ht&&x(y.map.channel),aoMapUv:ct&&x(y.aoMap.channel),lightMapUv:ht&&x(y.lightMap.channel),bumpMapUv:dt&&x(y.bumpMap.channel),normalMapUv:_t&&x(y.normalMap.channel),displacementMapUv:kt&&x(y.displacementMap.channel),emissiveMapUv:Vt&&x(y.emissiveMap.channel),metalnessMapUv:Yt&&x(y.metalnessMap.channel),roughnessMapUv:Kt&&x(y.roughnessMap.channel),anisotropyMapUv:et&&x(y.anisotropyMap.channel),clearcoatMapUv:pt&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:gt&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:rt&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:xt&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&x(y.sheenRoughnessMap.channel),specularMapUv:yt&&x(y.specularMap.channel),specularColorMapUv:Bt&&x(y.specularColorMap.channel),specularIntensityMapUv:Wt&&x(y.specularIntensityMap.channel),transmissionMapUv:$t&&x(y.transmissionMap.channel),thicknessMapUv:V&&x(y.thicknessMap.channel),alphaMapUv:st&&x(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(_t||F),vertexNormals:!!B.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!B.attributes.uv&&(Ht||st),fog:!!D,useFog:y.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||B.attributes.normal===void 0&&_t===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:ft,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:G,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:zt,decodeVideoTexture:Ht&&y.map.isVideoTexture===!0&&re.getTransfer(y.map.colorSpace)===de,decodeVideoTextureEmissive:Vt&&y.emissiveMap.isVideoTexture===!0&&re.getTransfer(y.emissiveMap.colorSpace)===de,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===yn,flipSided:y.side===$e,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:lt&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(lt&&y.extensions.multiDraw===!0||Tt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Nt.vertexUv1s=l.has(1),Nt.vertexUv2s=l.has(2),Nt.vertexUv3s=l.has(3),l.clear(),Nt}function g(y){let A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(let R in y.defines)A.push(R),A.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(m(A,y),w(A,y),A.push(i.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function m(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numSunLights),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numSunLightShadows),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function w(y,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.retroreflection&&o.enable(24),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function M(y){let A=u[y.type],R;if(A){let I=Jn[A];R=ld.clone(I.uniforms)}else R=y.uniforms;return R}function _(y,A){let R=h.get(A);return R!==void 0?++R.usedTimes:(R=new Fx(i,A,y,s),c.push(R),h.set(A,R)),R}function S(y){if(--y.usedTimes===0){let A=c.indexOf(y);c[A]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function E(y){a.remove(y)}function C(){a.dispose()}return{getParameters:b,getProgramCacheKey:g,getUniforms:M,acquireProgram:_,releaseProgram:S,releaseShaderCache:E,programs:c,dispose:C}}function Vx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Hx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Rd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Cd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(f){let u=0;return f.isInstancedMesh&&(u+=2),f.isSkinnedMesh&&(u+=1),u}function a(f,u,x,b,g,m){let w=i[t];return w===void 0?(w={id:f.id,object:f,geometry:u,material:x,materialVariant:o(f),groupOrder:b,renderOrder:f.renderOrder,z:g,group:m},i[t]=w):(w.id=f.id,w.object=f,w.geometry=u,w.material=x,w.materialVariant=o(f),w.groupOrder=b,w.renderOrder=f.renderOrder,w.z=g,w.group=m),t++,w}function l(f,u,x,b,g,m,w){w.reversedDepth===!0&&(g=-g);let M=a(f,u,x,b,g,m);x.transmission>0?n.push(M):x.transparent===!0?s.push(M):e.push(M)}function c(f,u,x,b,g,m){let w=a(f,u,x,b,g,m);x.transmission>0?n.unshift(w):x.transparent===!0?s.unshift(w):e.unshift(w)}function h(f,u){e.length>1&&e.sort(f||Hx),n.length>1&&n.sort(u||Rd),s.length>1&&s.sort(u||Rd)}function p(){for(let f=t,u=i.length;f<u;f++){let x=i[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:p,sort:h}}function Gx(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Cd,i.set(n,[o])):s>=r.length?(o=new Cd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function kx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new N,color:new Ct};break;case"SpotLight":e={position:new N,direction:new N,color:new Ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Ct,groundColor:new Ct};break;case"RectAreaLight":e={color:new Ct,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function Wx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Xx=0;function qx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Yx(i){let t=new kx,e=Wx(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);let s=new N,r=new fe,o=new fe;function a(c){let h=0,p=0,f=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let u=0,x=0,b=0,g=0,m=0,w=0,M=0,_=0,S=0,E=0,C=0,y=0,A=0,R=0;c.sort(qx);for(let L=0,U=c.length;L<U;L++){let D=c[L],B=D.color,k=D.intensity,W=D.distance,Y=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Pi?Y=D.shadow.map.texture:Y=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=B.r*k,p+=B.g*k,f+=B.b*k;else if(D.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(D.sh.coefficients[J],k);R++}else if(D.isSunLight){let J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let tt=D.shadow,it=e.get(D);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize.copy(tt.mapSize).multiply(tt.getFrameExtents()),n.sunShadow[x]=it,n.sunShadowMap[x]=Y;let O=tt.getViewportCount();for(let G=0;G<O;G++)n.sunShadowMatrix[b+G]=tt.getMatrix(G),n.sunShadowCascade[b+G]=tt._cascadeData[G];b+=O,x++}n.sun[u]=J,u++}else if(D.isDirectionalLight){let J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let tt=D.shadow,it=e.get(D);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,n.directionalShadow[g]=it,n.directionalShadowMap[g]=Y,n.directionalShadowMatrix[g]=D.shadow.matrix,S++}n.directional[g]=J,g++}else if(D.isSpotLight){let J=t.get(D);J.position.setFromMatrixPosition(D.matrixWorld),J.color.copy(B).multiplyScalar(k),J.distance=W,J.coneCos=Math.cos(D.angle),J.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),J.decay=D.decay,n.spot[w]=J;let tt=D.shadow;if(D.map&&(n.spotLightMap[y]=D.map,y++,tt.updateMatrices(D),D.castShadow&&A++),n.spotLightMatrix[w]=tt.matrix,D.castShadow){let it=e.get(D);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,n.spotShadow[w]=it,n.spotShadowMap[w]=Y,C++}w++}else if(D.isRectAreaLight){let J=t.get(D);J.color.copy(B).multiplyScalar(k),J.halfWidth.set(D.width*.5,0,0),J.halfHeight.set(0,D.height*.5,0),n.rectArea[M]=J,M++}else if(D.isPointLight){let J=t.get(D);if(J.color.copy(D.color).multiplyScalar(D.intensity),J.distance=D.distance,J.decay=D.decay,D.castShadow){let tt=D.shadow,it=e.get(D);it.shadowIntensity=tt.intensity,it.shadowBias=tt.bias,it.shadowNormalBias=tt.normalBias,it.shadowRadius=tt.radius,it.shadowMapSize=tt.mapSize,it.shadowCameraNear=tt.camera.near,it.shadowCameraFar=tt.camera.far,n.pointShadow[m]=it,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=D.shadow.matrix,E++}n.point[m]=J,m++}else if(D.isHemisphereLight){let J=t.get(D);J.skyColor.copy(D.color).multiplyScalar(k),J.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[_]=J,_++}}M>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=St.LTC_FLOAT_1,n.rectAreaLTC2=St.LTC_FLOAT_2):(n.rectAreaLTC1=St.LTC_HALF_1,n.rectAreaLTC2=St.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=f;let I=n.hash;(I.sunLength!==u||I.directionalLength!==g||I.pointLength!==m||I.spotLength!==w||I.rectAreaLength!==M||I.hemiLength!==_||I.numSunShadows!==x||I.numDirectionalShadows!==S||I.numPointShadows!==E||I.numSpotShadows!==C||I.numSpotMaps!==y||I.numLightProbes!==R)&&(n.sun.length=u,n.directional.length=g,n.spot.length=w,n.rectArea.length=M,n.point.length=m,n.hemi.length=_,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=b,n.sunShadowCascade.length=b,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+y-A,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,I.sunLength=u,I.directionalLength=g,I.pointLength=m,I.spotLength=w,I.rectAreaLength=M,I.hemiLength=_,I.numSunShadows=x,I.numDirectionalShadows=S,I.numPointShadows=E,I.numSpotShadows=C,I.numSpotMaps=y,I.numLightProbes=R,n.version=Xx++)}function l(c,h){let p=0,f=0,u=0,x=0,b=0,g=0,m=h.matrixWorldInverse;for(let w=0,M=c.length;w<M;w++){let _=c[w];if(_.isSunLight){let S=n.sun[p];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),p++}else if(_.isDirectionalLight){let S=n.directional[f];S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(_.isSpotLight){let S=n.spot[x];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),x++}else if(_.isRectAreaLight){let S=n.rectArea[b];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),b++}else if(_.isPointLight){let S=n.point[u];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),u++}else if(_.isHemisphereLight){let S=n.hemi[g];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function Pd(i){let t=new Yx(i),e=[],n=[],s=[];function r(f){p.camera=f,e.length=0,n.length=0,s.length=0}function o(f){e.push(f)}function a(f){n.push(f)}function l(f){s.push(f)}function c(){t.setup(e)}function h(f){t.setupView(e,f)}let p={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function Zx(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Pd(i),t.set(s,[a])):r>=o.length?(a=new Pd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Kx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jx=`uniform sampler2D shadow_pass;
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
}`,$x=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],jx=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Id=new fe,to=new N,th=new N;function Qx(i,t,e){let n=new Es,s=new ut,r=new ut,o=new Ie,a=new ra,l=new oa,c={},h=e.maxTextureSize,p={[Ti]:$e,[$e]:Ti,[yn]:yn},f=new qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:Kx,fragmentShader:Jx}),u=f.clone();u.defines.HORIZONTAL_PASS=1;let x=new Ce;x.setAttribute("position",new ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new le(x,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gr;let m=this.type;this.render=function(E,C,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===va&&(Gt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Gr);let A=i.getRenderTarget(),R=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Zn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let U=m!==this.type;U&&C.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(B=>B.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,B=E.length;D<B;D++){let k=E[D],W=k.shadow;if(W===void 0){Gt("WebGLShadowMap:",k,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let Y=W.getFrameExtents();s.multiply(Y),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,W.mapSize.y=r.y));let J=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=J,W.map===null||U===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Ds){if(k.isPointLight){Gt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new un(s.x,s.y,{format:Pi,type:Bn,minFilter:ze,magFilter:ze,generateMipmaps:!1}),W.map.texture.name=k.name+".shadowMap",W.map.depthTexture=new _i(s.x,s.y,On),W.map.depthTexture.name=k.name+".shadowMapDepth",W.map.depthTexture.format=Xn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Xe,W.map.depthTexture.magFilter=Xe}else k.isPointLight?(W.map=new dl(s.x),W.map.depthTexture=new jo(s.x,Fn)):(W.map=new un(s.x,s.y),W.map.depthTexture=new _i(s.x,s.y,Fn)),W.map.depthTexture.name=k.name+".shadowMap",W.map.depthTexture.format=Xn,this.type===Gr?(W.map.depthTexture.compareFunction=J?ll:al,W.map.depthTexture.minFilter=ze,W.map.depthTexture.magFilter=ze):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Xe,W.map.depthTexture.magFilter=Xe);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let tt=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();k.isPointLight!==!0&&W.updateMatrices(k,y);for(let it=0;it<tt;it++){let O=W.getCamera(it);if(k.isPointLight){let G=W.camera,j=W.matrix,at=k.distance||G.far;at!==G.far&&(G.far=at,G.updateProjectionMatrix()),to.setFromMatrixPosition(k.matrixWorld),G.position.copy(to),th.copy(G.position),th.add($x[it]),G.up.copy(jx[it]),G.lookAt(th),G.updateMatrixWorld(),j.makeTranslation(-to.x,-to.y,-to.z),Id.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Id,G.coordinateSystem,G.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,it),i.clear();else{it===0&&(i.setRenderTarget(W.map),i.clear());let G=W.getViewport(it);o.set(r.x*G.x,r.y*G.y,r.x*G.z,r.y*G.w),L.viewport(o)}n=W.getFrustum(it),_(C,y,O,k,this.type)}W.isPointLightShadow!==!0&&this.type===Ds&&w(W,y),W.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(A,R,I)};function w(E,C){let y=t.update(b);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,u.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),E.mapPass===null?E.mapPass=new un(s.x,s.y,{format:Pi,type:Bn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,y,f,b,null),u.uniforms.shadow_pass.value=E.mapPass.texture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,y,u,b,null)}function M(E,C,y,A){let R=null,I=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)R=I;else if(R=y.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let L=R.uuid,U=C.uuid,D=c[L];D===void 0&&(D={},c[L]=D);let B=D[U];B===void 0&&(B=R.clone(),D[U]=B,C.addEventListener("dispose",S)),R=B}if(R.visible=C.visible,R.wireframe=C.wireframe,A===Ds?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:p[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let L=i.properties.get(R);L.light=y}return R}function _(E,C,y,A,R){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&R===Ds)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let U=t.update(E),D=E.material;if(Array.isArray(D)){let B=U.groups;for(let k=0,W=B.length;k<W;k++){let Y=B[k],J=D[Y.materialIndex];if(J&&J.visible){let tt=M(E,J,A,R);E.onBeforeShadow(i,E,C,y,U,tt,Y),i.renderBufferDirect(y,null,U,tt,E,Y),E.onAfterShadow(i,E,C,y,U,tt,Y)}}}else if(D.visible){let B=M(E,D,A,R);E.onBeforeShadow(i,E,C,y,U,B,null),i.renderBufferDirect(y,null,U,B,E,null),E.onAfterShadow(i,E,C,y,U,B,null)}}let L=E.children;for(let U=0,D=L.length;U<D;U++)_(L[U],C,y,A,R)}function S(E){E.target.removeEventListener("dispose",S);for(let y in c){let A=c[y],R=E.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function ty(i,t){function e(){let V=!1,vt=new Ie,st=null,bt=new Ie(0,0,0,0);return{setMask:function(At){st!==At&&!V&&(i.colorMask(At,At,At,At),st=At)},setLocked:function(At){V=At},setClear:function(At,lt,zt,Nt,Se){Se===!0&&(At*=Nt,lt*=Nt,zt*=Nt),vt.set(At,lt,zt,Nt),bt.equals(vt)===!1&&(i.clearColor(At,lt,zt,Nt),bt.copy(vt))},reset:function(){V=!1,st=null,bt.set(-1,0,0,0)}}}function n(){let V=!1,vt=!1,st=null,bt=null,At=null;return{setReversed:function(lt){if(vt!==lt){let zt=t.get("EXT_clip_control");lt?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT),vt=lt;let Nt=At;At=null,this.setClear(Nt)}},getReversed:function(){return vt},setTest:function(lt){lt?Q(i.DEPTH_TEST):ft(i.DEPTH_TEST)},setMask:function(lt){st!==lt&&!V&&(i.depthMask(lt),st=lt)},setFunc:function(lt){if(vt&&(lt=nd[lt]),bt!==lt){switch(lt){case Bo:i.depthFunc(i.NEVER);break;case zo:i.depthFunc(i.ALWAYS);break;case Vo:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case Ho:i.depthFunc(i.EQUAL);break;case Go:i.depthFunc(i.GEQUAL);break;case ko:i.depthFunc(i.GREATER);break;case Wo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}bt=lt}},setLocked:function(lt){V=lt},setClear:function(lt){At!==lt&&(At=lt,vt&&(lt=1-lt),i.clearDepth(lt))},reset:function(){V=!1,st=null,bt=null,At=null,vt=!1}}}function s(){let V=!1,vt=null,st=null,bt=null,At=null,lt=null,zt=null,Nt=null,Se=null;return{setTest:function(he){V||(he?Q(i.STENCIL_TEST):ft(i.STENCIL_TEST))},setMask:function(he){vt!==he&&!V&&(i.stencilMask(he),vt=he)},setFunc:function(he,Rn,Gn){(st!==he||bt!==Rn||At!==Gn)&&(i.stencilFunc(he,Rn,Gn),st=he,bt=Rn,At=Gn)},setOp:function(he,Rn,Gn){(lt!==he||zt!==Rn||Nt!==Gn)&&(i.stencilOp(he,Rn,Gn),lt=he,zt=Rn,Nt=Gn)},setLocked:function(he){V=he},setClear:function(he){Se!==he&&(i.clearStencil(he),Se=he)},reset:function(){V=!1,vt=null,st=null,bt=null,At=null,lt=null,zt=null,Nt=null,Se=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},p={},f={},u=new WeakMap,x=[],b=null,g=!1,m=null,w=null,M=null,_=null,S=null,E=null,C=null,y=new Ct(0,0,0),A=0,R=!1,I=null,L=null,U=null,D=null,B=null,k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,Y=0,J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(J)[1]),W=Y>=1):J.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),W=Y>=2);let tt=null,it={},O=i.getParameter(i.SCISSOR_BOX),G=i.getParameter(i.VIEWPORT),j=new Ie().fromArray(O),at=new Ie().fromArray(G);function mt(V,vt,st,bt){let At=new Uint8Array(4),lt=i.createTexture();i.bindTexture(V,lt),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let zt=0;zt<st;zt++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(vt,0,i.RGBA,1,1,bt,0,i.RGBA,i.UNSIGNED_BYTE,At):i.texImage2D(vt+zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,At);return lt}let K={};K[i.TEXTURE_2D]=mt(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=mt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=mt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=mt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(i.DEPTH_TEST),o.setFunc(_s),dt(!1),_t(mc),Q(i.CULL_FACE),ct(Zn);function Q(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function ft(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function Dt(V,vt){return f[V]!==vt?(i.bindFramebuffer(V,vt),f[V]=vt,V===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=vt),V===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=vt),!0):!1}function Tt(V,vt){let st=x,bt=!1;if(V){st=u.get(vt),st===void 0&&(st=[],u.set(vt,st));let At=V.textures;if(st.length!==At.length||st[0]!==i.COLOR_ATTACHMENT0){for(let lt=0,zt=At.length;lt<zt;lt++)st[lt]=i.COLOR_ATTACHMENT0+lt;st.length=At.length,bt=!0}}else st[0]!==i.BACK&&(st[0]=i.BACK,bt=!0);bt&&i.drawBuffers(st)}function Ht(V){return b!==V?(i.useProgram(V),b=V,!0):!1}let _e={[qi]:i.FUNC_ADD,[Su]:i.FUNC_SUBTRACT,[Eu]:i.FUNC_REVERSE_SUBTRACT};_e[wu]=i.MIN,_e[Tu]=i.MAX;let ot={[Au]:i.ZERO,[Ru]:i.ONE,[Cu]:i.SRC_COLOR,[xc]:i.SRC_ALPHA,[Uu]:i.SRC_ALPHA_SATURATE,[Du]:i.DST_COLOR,[Iu]:i.DST_ALPHA,[Pu]:i.ONE_MINUS_SRC_COLOR,[yc]:i.ONE_MINUS_SRC_ALPHA,[Nu]:i.ONE_MINUS_DST_COLOR,[Lu]:i.ONE_MINUS_DST_ALPHA,[Fu]:i.CONSTANT_COLOR,[Ou]:i.ONE_MINUS_CONSTANT_COLOR,[Bu]:i.CONSTANT_ALPHA,[zu]:i.ONE_MINUS_CONSTANT_ALPHA};function ct(V,vt,st,bt,At,lt,zt,Nt,Se,he){if(V===Zn){g===!0&&(ft(i.BLEND),g=!1);return}if(g===!1&&(Q(i.BLEND),g=!0),V!==Mu){if(V!==m||he!==R){if((w!==qi||S!==qi)&&(i.blendEquation(i.FUNC_ADD),w=qi,S=qi),he)switch(V){case Ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kr:i.blendFunc(i.ONE,i.ONE);break;case gc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _c:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qt("WebGLState: Invalid blending: ",V);break}else switch(V){case Ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case gc:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _c:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",V);break}M=null,_=null,E=null,C=null,y.set(0,0,0),A=0,m=V,R=he}return}At=At||vt,lt=lt||st,zt=zt||bt,(vt!==w||At!==S)&&(i.blendEquationSeparate(_e[vt],_e[At]),w=vt,S=At),(st!==M||bt!==_||lt!==E||zt!==C)&&(i.blendFuncSeparate(ot[st],ot[bt],ot[lt],ot[zt]),M=st,_=bt,E=lt,C=zt),(Nt.equals(y)===!1||Se!==A)&&(i.blendColor(Nt.r,Nt.g,Nt.b,Se),y.copy(Nt),A=Se),m=V,R=!1}function ht(V,vt){V.side===yn?ft(i.CULL_FACE):Q(i.CULL_FACE);let st=V.side===$e;vt&&(st=!st),dt(st),V.blending===Ns&&V.transparent===!1?ct(Zn):ct(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);let bt=V.stencilWrite;a.setTest(bt),bt&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Vt(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):ft(i.SAMPLE_ALPHA_TO_COVERAGE)}function dt(V){I!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),I=V)}function _t(V){V!==vu?(Q(i.CULL_FACE),V!==L&&(V===mc?i.cullFace(i.BACK):V===bu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ft(i.CULL_FACE),L=V}function kt(V){V!==U&&(W&&i.lineWidth(V),U=V)}function Vt(V,vt,st){V?(Q(i.POLYGON_OFFSET_FILL),(D!==vt||B!==st)&&(D=vt,B=st,o.getReversed()&&(vt=-vt),i.polygonOffset(vt,st))):ft(i.POLYGON_OFFSET_FILL)}function Yt(V){V?Q(i.SCISSOR_TEST):ft(i.SCISSOR_TEST)}function Kt(V){V===void 0&&(V=i.TEXTURE0+k-1),tt!==V&&(i.activeTexture(V),tt=V)}function F(V,vt,st){st===void 0&&(tt===null?st=i.TEXTURE0+k-1:st=tt);let bt=it[st];bt===void 0&&(bt={type:void 0,texture:void 0},it[st]=bt),(bt.type!==V||bt.texture!==vt)&&(tt!==st&&(i.activeTexture(st),tt=st),i.bindTexture(V,vt||K[V]),bt.type=V,bt.texture=vt)}function ce(){let V=it[tt];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function ne(){try{i.compressedTexImage2D(...arguments)}catch(V){qt("WebGLState:",V)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(V){qt("WebGLState:",V)}}function v(){try{i.texSubImage2D(...arguments)}catch(V){qt("WebGLState:",V)}}function H(){try{i.texSubImage3D(...arguments)}catch(V){qt("WebGLState:",V)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(V){qt("WebGLState:",V)}}function et(){try{i.compressedTexSubImage3D(...arguments)}catch(V){qt("WebGLState:",V)}}function pt(){try{i.texStorage2D(...arguments)}catch(V){qt("WebGLState:",V)}}function gt(){try{i.texStorage3D(...arguments)}catch(V){qt("WebGLState:",V)}}function nt(){try{i.texImage2D(...arguments)}catch(V){qt("WebGLState:",V)}}function rt(){try{i.texImage3D(...arguments)}catch(V){qt("WebGLState:",V)}}function xt(V){return p[V]!==void 0?p[V]:i.getParameter(V)}function Ot(V,vt){p[V]!==vt&&(i.pixelStorei(V,vt),p[V]=vt)}function Mt(V){j.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),j.copy(V))}function yt(V){at.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),at.copy(V))}function Bt(V,vt){let st=c.get(vt);st===void 0&&(st=new WeakMap,c.set(vt,st));let bt=st.get(V);bt===void 0&&(bt=i.getUniformBlockIndex(vt,V.name),st.set(V,bt))}function Wt(V,vt){let bt=c.get(vt).get(V);l.get(vt)!==bt&&(i.uniformBlockBinding(vt,bt,V.__bindingPointIndex),l.set(vt,bt))}function $t(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},p={},tt=null,it={},f={},u=new WeakMap,x=[],b=null,g=!1,m=null,w=null,M=null,_=null,S=null,E=null,C=null,y=new Ct(0,0,0),A=0,R=!1,I=null,L=null,U=null,D=null,B=null,j.set(0,0,i.canvas.width,i.canvas.height),at.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Q,disable:ft,bindFramebuffer:Dt,drawBuffers:Tt,useProgram:Ht,setBlending:ct,setMaterial:ht,setFlipSided:dt,setCullFace:_t,setLineWidth:kt,setPolygonOffset:Vt,setScissorTest:Yt,activeTexture:Kt,bindTexture:F,unbindTexture:ce,compressedTexImage2D:ne,compressedTexImage3D:P,texImage2D:nt,texImage3D:rt,pixelStorei:Ot,getParameter:xt,updateUBOMapping:Bt,uniformBlockBinding:Wt,texStorage2D:pt,texStorage3D:gt,texSubImage2D:v,texSubImage3D:H,compressedTexSubImage2D:Z,compressedTexSubImage3D:et,scissor:Mt,viewport:yt,reset:$t}}function ey(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,h=new WeakMap,p=new Set,f,u=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(P,v){return x?new OffscreenCanvas(P,v):ur("canvas")}function g(P,v,H){let Z=1,et=ne(P);if((et.width>H||et.height>H)&&(Z=H/Math.max(et.width,et.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let pt=Math.floor(Z*et.width),gt=Math.floor(Z*et.height);f===void 0&&(f=b(pt,gt));let nt=v?b(pt,gt):f;return nt.width=pt,nt.height=gt,nt.getContext("2d").drawImage(P,0,0,pt,gt),Gt("WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+pt+"x"+gt+")."),nt}else return"data"in P&&Gt("WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),P;return P}function m(P){return P.generateMipmaps}function w(P){i.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(P,v,H,Z,et,pt=!1){if(P!==null){if(i[P]!==void 0)return i[P];Gt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let gt;Z&&(gt=t.get("EXT_texture_norm16"),gt||Gt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let nt=v;if(v===i.RED&&(H===i.FLOAT&&(nt=i.R32F),H===i.HALF_FLOAT&&(nt=i.R16F),H===i.UNSIGNED_BYTE&&(nt=i.R8),H===i.UNSIGNED_SHORT&&gt&&(nt=gt.R16_EXT),H===i.SHORT&&gt&&(nt=gt.R16_SNORM_EXT)),v===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(nt=i.R8UI),H===i.UNSIGNED_SHORT&&(nt=i.R16UI),H===i.UNSIGNED_INT&&(nt=i.R32UI),H===i.BYTE&&(nt=i.R8I),H===i.SHORT&&(nt=i.R16I),H===i.INT&&(nt=i.R32I)),v===i.RG&&(H===i.FLOAT&&(nt=i.RG32F),H===i.HALF_FLOAT&&(nt=i.RG16F),H===i.UNSIGNED_BYTE&&(nt=i.RG8),H===i.UNSIGNED_SHORT&&gt&&(nt=gt.RG16_EXT),H===i.SHORT&&gt&&(nt=gt.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(nt=i.RG8UI),H===i.UNSIGNED_SHORT&&(nt=i.RG16UI),H===i.UNSIGNED_INT&&(nt=i.RG32UI),H===i.BYTE&&(nt=i.RG8I),H===i.SHORT&&(nt=i.RG16I),H===i.INT&&(nt=i.RG32I)),v===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(nt=i.RGB8UI),H===i.UNSIGNED_SHORT&&(nt=i.RGB16UI),H===i.UNSIGNED_INT&&(nt=i.RGB32UI),H===i.BYTE&&(nt=i.RGB8I),H===i.SHORT&&(nt=i.RGB16I),H===i.INT&&(nt=i.RGB32I)),v===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(nt=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(nt=i.RGBA16UI),H===i.UNSIGNED_INT&&(nt=i.RGBA32UI),H===i.BYTE&&(nt=i.RGBA8I),H===i.SHORT&&(nt=i.RGBA16I),H===i.INT&&(nt=i.RGBA32I)),v===i.RGB&&(H===i.UNSIGNED_SHORT&&gt&&(nt=gt.RGB16_EXT),H===i.SHORT&&gt&&(nt=gt.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(nt=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(nt=i.R11F_G11F_B10F)),v===i.RGBA){let rt=pt?hr:re.getTransfer(et);H===i.FLOAT&&(nt=i.RGBA32F),H===i.HALF_FLOAT&&(nt=i.RGBA16F),H===i.UNSIGNED_BYTE&&(nt=rt===de?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&gt&&(nt=gt.RGBA16_EXT),H===i.SHORT&&gt&&(nt=gt.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(nt=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(nt=i.RGB5_A1)}return(nt===i.R16F||nt===i.R32F||nt===i.RG16F||nt===i.RG32F||nt===i.RGBA16F||nt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),nt}function S(P,v){let H;return P?v===null||v===Fn||v===Fs?H=i.DEPTH24_STENCIL8:v===On?H=i.DEPTH32F_STENCIL8:v===Us&&(H=i.DEPTH24_STENCIL8,Gt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Fn||v===Fs?H=i.DEPTH_COMPONENT24:v===On?H=i.DEPTH_COMPONENT32F:v===Us&&(H=i.DEPTH_COMPONENT16),H}function E(P,v){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Xe&&P.minFilter!==ze?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function C(P){let v=P.target;v.removeEventListener("dispose",C),A(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&p.delete(v)}function y(P){let v=P.target;v.removeEventListener("dispose",y),I(v)}function A(P){let v=n.get(P);if(v.__webglInit===void 0)return;let H=P.source,Z=u.get(H);if(Z){let et=Z[v.__cacheKey];et.usedTimes--,et.usedTimes===0&&R(P),Object.keys(Z).length===0&&u.delete(H)}n.remove(P)}function R(P){let v=n.get(P);i.deleteTexture(v.__webglTexture);let H=P.source,Z=u.get(H);delete Z[v.__cacheKey],o.memory.textures--}function I(P){let v=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let et=0;et<v.__webglFramebuffer[Z].length;et++)i.deleteFramebuffer(v.__webglFramebuffer[Z][et]);else i.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[Z]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let H=P.textures;for(let Z=0,et=H.length;Z<et;Z++){let pt=n.get(H[Z]);pt.__webglTexture&&(i.deleteTexture(pt.__webglTexture),o.memory.textures--),n.remove(H[Z])}n.remove(P)}let L=0;function U(){L=0}function D(){return L}function B(P){L=P}function k(){let P=L;return P>=s.maxTextures&&Gt("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),L+=1,P}function W(P){let v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function Y(P,v){let H=n.get(P);if(P.isVideoTexture&&F(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){let Z=P.image;if(Z===null)Gt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Gt("WebGLRenderer: Texture marked for update but image is incomplete");else{ft(H,P,v);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+v)}function J(P,v){let H=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ft(H,P,v);return}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+v)}function tt(P,v){let H=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){ft(H,P,v);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+v)}function it(P,v){let H=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&H.__version!==P.version){Dt(H,P,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+v)}let O={[Xo]:i.REPEAT,[En]:i.CLAMP_TO_EDGE,[qo]:i.MIRRORED_REPEAT},G={[Xe]:i.NEAREST,[Gu]:i.NEAREST_MIPMAP_NEAREST,[Xr]:i.NEAREST_MIPMAP_LINEAR,[ze]:i.LINEAR,[Sa]:i.LINEAR_MIPMAP_NEAREST,[Ri]:i.LINEAR_MIPMAP_LINEAR},j={[qu]:i.NEVER,[$u]:i.ALWAYS,[Yu]:i.LESS,[al]:i.LEQUAL,[Zu]:i.EQUAL,[ll]:i.GEQUAL,[Ku]:i.GREATER,[Ju]:i.NOTEQUAL};function at(P,v){if(v.type===On&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===ze||v.magFilter===Sa||v.magFilter===Xr||v.magFilter===Ri||v.minFilter===ze||v.minFilter===Sa||v.minFilter===Xr||v.minFilter===Ri)&&Gt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,O[v.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,O[v.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,O[v.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,G[v.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,G[v.minFilter]),v.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,j[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Xe||v.minFilter!==Xr&&v.minFilter!==Ri||v.type===On&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function mt(P,v){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",C));let Z=v.source,et=u.get(Z);et===void 0&&(et={},u.set(Z,et));let pt=W(v);if(pt!==P.__cacheKey){et[pt]===void 0&&(et[pt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),et[pt].usedTimes++;let gt=et[P.__cacheKey];gt!==void 0&&(et[P.__cacheKey].usedTimes--,gt.usedTimes===0&&R(v)),P.__cacheKey=pt,P.__webglTexture=et[pt].texture}return H}function K(P,v,H){return Math.floor(Math.floor(P/H)/v)}function Q(P,v,H,Z){let pt=P.updateRanges;if(pt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,H,Z,v.data);else{pt.sort((Ot,Mt)=>Ot.start-Mt.start);let gt=0;for(let Ot=1;Ot<pt.length;Ot++){let Mt=pt[gt],yt=pt[Ot],Bt=Mt.start+Mt.count,Wt=K(yt.start,v.width,4),$t=K(Mt.start,v.width,4);yt.start<=Bt+1&&Wt===$t&&K(yt.start+yt.count-1,v.width,4)===Wt?Mt.count=Math.max(Mt.count,yt.start+yt.count-Mt.start):(++gt,pt[gt]=yt)}pt.length=gt+1;let nt=e.getParameter(i.UNPACK_ROW_LENGTH),rt=e.getParameter(i.UNPACK_SKIP_PIXELS),xt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Ot=0,Mt=pt.length;Ot<Mt;Ot++){let yt=pt[Ot],Bt=Math.floor(yt.start/4),Wt=Math.ceil(yt.count/4),$t=Bt%v.width,V=Math.floor(Bt/v.width),vt=Wt,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,$t),e.pixelStorei(i.UNPACK_SKIP_ROWS,V),e.texSubImage2D(i.TEXTURE_2D,0,$t,V,vt,st,H,Z,v.data)}P.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,nt),e.pixelStorei(i.UNPACK_SKIP_PIXELS,rt),e.pixelStorei(i.UNPACK_SKIP_ROWS,xt)}}function ft(P,v,H){let Z=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=i.TEXTURE_3D);let et=mt(P,v),pt=v.source;e.bindTexture(Z,P.__webglTexture,i.TEXTURE0+H);let gt=n.get(pt);if(pt.version!==gt.__version||et===!0){if(e.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let st=re.getPrimaries(re.workingColorSpace),bt=v.colorSpace===ri?null:re.getPrimaries(v.colorSpace),At=v.colorSpace===ri||st===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At)}e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let rt=g(v.image,!1,s.maxTextureSize);rt=ce(v,rt);let xt=r.convert(v.format,v.colorSpace),Ot=r.convert(v.type),Mt=_(v.internalFormat,xt,Ot,v.normalized,v.colorSpace,v.isVideoTexture);at(Z,v);let yt,Bt=v.mipmaps,Wt=v.isVideoTexture!==!0,$t=gt.__version===void 0||et===!0,V=pt.dataReady,vt=E(v,rt);if(v.isDepthTexture)Mt=S(v.format===Ci,v.type),$t&&(Wt?e.texStorage2D(i.TEXTURE_2D,1,Mt,rt.width,rt.height):e.texImage2D(i.TEXTURE_2D,0,Mt,rt.width,rt.height,0,xt,Ot,null));else if(v.isDataTexture)if(Bt.length>0){Wt&&$t&&e.texStorage2D(i.TEXTURE_2D,vt,Mt,Bt[0].width,Bt[0].height);for(let st=0,bt=Bt.length;st<bt;st++)yt=Bt[st],Wt?V&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,yt.width,yt.height,xt,Ot,yt.data):e.texImage2D(i.TEXTURE_2D,st,Mt,yt.width,yt.height,0,xt,Ot,yt.data);v.generateMipmaps=!1}else Wt?($t&&e.texStorage2D(i.TEXTURE_2D,vt,Mt,rt.width,rt.height),V&&Q(v,rt,xt,Ot)):e.texImage2D(i.TEXTURE_2D,0,Mt,rt.width,rt.height,0,xt,Ot,rt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Wt&&$t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Mt,Bt[0].width,Bt[0].height,rt.depth);for(let st=0,bt=Bt.length;st<bt;st++)if(yt=Bt[st],v.format!==An)if(xt!==null)if(Wt){if(V)if(v.layerUpdates.size>0){let At=kc(yt.width,yt.height,v.format,v.type);for(let lt of v.layerUpdates){let zt=yt.data.subarray(lt*At/yt.data.BYTES_PER_ELEMENT,(lt+1)*At/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,lt,yt.width,yt.height,1,xt,zt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,yt.width,yt.height,rt.depth,xt,yt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,Mt,yt.width,yt.height,rt.depth,0,yt.data,0,0);else Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?V&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,yt.width,yt.height,rt.depth,xt,Ot,yt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,Mt,yt.width,yt.height,rt.depth,0,xt,Ot,yt.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Wt&&$t&&e.texStorage2D(i.TEXTURE_2D,vt,Mt,Bt[0].width,Bt[0].height);for(let st=0,bt=Bt.length;st<bt;st++)yt=Bt[st],v.format!==An?xt!==null?Wt?V&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,yt.width,yt.height,xt,yt.data):e.compressedTexImage2D(i.TEXTURE_2D,st,Mt,yt.width,yt.height,0,yt.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?V&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,yt.width,yt.height,xt,Ot,yt.data):e.texImage2D(i.TEXTURE_2D,st,Mt,yt.width,yt.height,0,xt,Ot,yt.data)}else if(v.isDataArrayTexture)if(Wt){if($t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,vt,Mt,rt.width,rt.height,rt.depth),V)if(v.layerUpdates.size>0){let st=kc(rt.width,rt.height,v.format,v.type);for(let bt of v.layerUpdates){let At=rt.data.subarray(bt*st/rt.data.BYTES_PER_ELEMENT,(bt+1)*st/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,bt,rt.width,rt.height,1,xt,Ot,At)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,xt,Ot,rt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Mt,rt.width,rt.height,rt.depth,0,xt,Ot,rt.data);else if(v.isData3DTexture)Wt?($t&&e.texStorage3D(i.TEXTURE_3D,vt,Mt,rt.width,rt.height,rt.depth),V&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,xt,Ot,rt.data)):e.texImage3D(i.TEXTURE_3D,0,Mt,rt.width,rt.height,rt.depth,0,xt,Ot,rt.data);else if(v.isFramebufferTexture){if($t)if(Wt)e.texStorage2D(i.TEXTURE_2D,vt,Mt,rt.width,rt.height);else{let st=rt.width,bt=rt.height;for(let At=0;At<vt;At++)e.texImage2D(i.TEXTURE_2D,At,Mt,st,bt,0,xt,Ot,null),st>>=1,bt>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),rt.parentNode!==st){st.appendChild(rt),p.add(v),st.onpaint=bt=>{let At=bt.changedElements;for(let lt of p)At.includes(lt.image)&&(lt.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,rt);else{let At=i.RGBA,lt=i.RGBA,zt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,At,lt,zt,rt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Bt.length>0){if(Wt&&$t){let st=ne(Bt[0]);e.texStorage2D(i.TEXTURE_2D,vt,Mt,st.width,st.height)}for(let st=0,bt=Bt.length;st<bt;st++)yt=Bt[st],Wt?V&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,xt,Ot,yt):e.texImage2D(i.TEXTURE_2D,st,Mt,xt,Ot,yt);v.generateMipmaps=!1}else if(Wt){if($t){let st=ne(rt);e.texStorage2D(i.TEXTURE_2D,vt,Mt,st.width,st.height)}V&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt,Ot,rt)}else e.texImage2D(i.TEXTURE_2D,0,Mt,xt,Ot,rt);m(v)&&w(Z),gt.__version=pt.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function Dt(P,v,H){if(v.image.length!==6)return;let Z=mt(P,v),et=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+H);let pt=n.get(et);if(et.version!==pt.__version||Z===!0){e.activeTexture(i.TEXTURE0+H);let gt=re.getPrimaries(re.workingColorSpace),nt=v.colorSpace===ri?null:re.getPrimaries(v.colorSpace),rt=v.colorSpace===ri||gt===nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);let xt=v.isCompressedTexture||v.image[0].isCompressedTexture,Ot=v.image[0]&&v.image[0].isDataTexture,Mt=[];for(let lt=0;lt<6;lt++)!xt&&!Ot?Mt[lt]=g(v.image[lt],!0,s.maxCubemapSize):Mt[lt]=Ot?v.image[lt].image:v.image[lt],Mt[lt]=ce(v,Mt[lt]);let yt=Mt[0],Bt=r.convert(v.format,v.colorSpace),Wt=r.convert(v.type),$t=_(v.internalFormat,Bt,Wt,v.normalized,v.colorSpace),V=v.isVideoTexture!==!0,vt=pt.__version===void 0||Z===!0,st=et.dataReady,bt=E(v,yt);at(i.TEXTURE_CUBE_MAP,v);let At;if(xt){V&&vt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,$t,yt.width,yt.height);for(let lt=0;lt<6;lt++){At=Mt[lt].mipmaps;for(let zt=0;zt<At.length;zt++){let Nt=At[zt];v.format!==An?Bt!==null?V?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,zt,0,0,Nt.width,Nt.height,Bt,Nt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,zt,$t,Nt.width,Nt.height,0,Nt.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,zt,0,0,Nt.width,Nt.height,Bt,Wt,Nt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,zt,$t,Nt.width,Nt.height,0,Bt,Wt,Nt.data)}}}else{if(At=v.mipmaps,V&&vt){At.length>0&&bt++;let lt=ne(Mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,$t,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(Ot){V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,Mt[lt].width,Mt[lt].height,Bt,Wt,Mt[lt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,$t,Mt[lt].width,Mt[lt].height,0,Bt,Wt,Mt[lt].data);for(let zt=0;zt<At.length;zt++){let Se=At[zt].image[lt].image;V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,zt+1,0,0,Se.width,Se.height,Bt,Wt,Se.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,zt+1,$t,Se.width,Se.height,0,Bt,Wt,Se.data)}}else{V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,Bt,Wt,Mt[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,$t,Bt,Wt,Mt[lt]);for(let zt=0;zt<At.length;zt++){let Nt=At[zt];V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,zt+1,0,0,Bt,Wt,Nt.image[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,zt+1,$t,Bt,Wt,Nt.image[lt])}}}m(v)&&w(i.TEXTURE_CUBE_MAP),pt.__version=et.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function Tt(P,v,H,Z,et,pt){let gt=r.convert(H.format,H.colorSpace),nt=r.convert(H.type),rt=_(H.internalFormat,gt,nt,H.normalized,H.colorSpace),xt=n.get(v),Ot=n.get(H);if(Ot.__renderTarget=v,!xt.__hasExternalTextures){let Mt=Math.max(1,v.width>>pt),yt=Math.max(1,v.height>>pt);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,pt,rt,Mt,yt,v.depth,0,gt,nt,null):e.texImage2D(et,pt,rt,Mt,yt,0,gt,nt,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),Kt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,et,Ot.__webglTexture,0,Yt(v)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,et,Ot.__webglTexture,pt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(P,v,H){if(i.bindRenderbuffer(i.RENDERBUFFER,P),v.depthBuffer){let Z=v.depthTexture,et=Z&&Z.isDepthTexture?Z.type:null,pt=S(v.stencilBuffer,et),gt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Kt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Yt(v),pt,v.width,v.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Yt(v),pt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,pt,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,P)}else{let Z=v.textures;for(let et=0;et<Z.length;et++){let pt=Z[et],gt=r.convert(pt.format,pt.colorSpace),nt=r.convert(pt.type),rt=_(pt.internalFormat,gt,nt,pt.normalized,pt.colorSpace);Kt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Yt(v),rt,v.width,v.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Yt(v),rt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,rt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function _e(P,v,H){let Z=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let et=n.get(v.depthTexture);if(et.__renderTarget=v,(!et.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z){if(et.__webglInit===void 0&&(et.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),et.__webglTexture===void 0){et.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture),at(i.TEXTURE_CUBE_MAP,v.depthTexture);let xt=r.convert(v.depthTexture.format),Ot=r.convert(v.depthTexture.type),Mt;v.depthTexture.format===Xn?Mt=i.DEPTH_COMPONENT24:v.depthTexture.format===Ci&&(Mt=i.DEPTH24_STENCIL8);for(let yt=0;yt<6;yt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,Mt,v.width,v.height,0,xt,Ot,null)}}else Y(v.depthTexture,0);let pt=et.__webglTexture,gt=Yt(v),nt=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,rt=v.depthTexture.format===Ci?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Xn)Kt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,rt,nt,pt,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,rt,nt,pt,0);else if(v.depthTexture.format===Ci)Kt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,rt,nt,pt,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,rt,nt,pt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ot(P){let v=n.get(P),H=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){let Z=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){let et=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",et)};Z.addEventListener("dispose",et),v.__depthDisposeCallback=et}v.__boundDepthTexture=Z}if(P.depthTexture&&!v.__autoAllocateDepthBuffer)if(H)for(let Z=0;Z<6;Z++)_e(v.__webglFramebuffer[Z],P,Z);else{let Z=P.texture.mipmaps;Z&&Z.length>0?_e(v.__webglFramebuffer[0],P,0):_e(v.__webglFramebuffer,P,0)}else if(H){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=i.createRenderbuffer(),Ht(v.__webglDepthbuffer[Z],P,!1);else{let et=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=v.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,pt),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,pt)}}else{let Z=P.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Ht(v.__webglDepthbuffer,P,!1);else{let et=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pt),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,pt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(P,v,H){let Z=n.get(P);v!==void 0&&Tt(Z.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&ot(P)}function ht(P){let v=P.texture,H=n.get(P),Z=n.get(v);P.addEventListener("dispose",y);let et=P.textures,pt=P.isWebGLCubeRenderTarget===!0,gt=et.length>1;if(gt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=v.version,o.memory.textures++),pt){H.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(v.mipmaps&&v.mipmaps.length>0){H.__webglFramebuffer[nt]=[];for(let rt=0;rt<v.mipmaps.length;rt++)H.__webglFramebuffer[nt][rt]=i.createFramebuffer()}else H.__webglFramebuffer[nt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){H.__webglFramebuffer=[];for(let nt=0;nt<v.mipmaps.length;nt++)H.__webglFramebuffer[nt]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(gt)for(let nt=0,rt=et.length;nt<rt;nt++){let xt=n.get(et[nt]);xt.__webglTexture===void 0&&(xt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&Kt(P)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let nt=0;nt<et.length;nt++){let rt=et[nt];H.__webglColorRenderbuffer[nt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[nt]);let xt=r.convert(rt.format,rt.colorSpace),Ot=r.convert(rt.type),Mt=_(rt.internalFormat,xt,Ot,rt.normalized,rt.colorSpace,P.isXRRenderTarget===!0),yt=Yt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,Mt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.RENDERBUFFER,H.__webglColorRenderbuffer[nt])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Ht(H.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pt){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),at(i.TEXTURE_CUBE_MAP,v);for(let nt=0;nt<6;nt++)if(v.mipmaps&&v.mipmaps.length>0)for(let rt=0;rt<v.mipmaps.length;rt++)Tt(H.__webglFramebuffer[nt][rt],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,rt);else Tt(H.__webglFramebuffer[nt],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);m(v)&&w(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let nt=0,rt=et.length;nt<rt;nt++){let xt=et[nt],Ot=n.get(xt),Mt=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Mt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Mt,Ot.__webglTexture),at(Mt,xt),Tt(H.__webglFramebuffer,P,xt,i.COLOR_ATTACHMENT0+nt,Mt,0),m(xt)&&w(Mt)}e.unbindTexture()}else{let nt=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(nt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(nt,Z.__webglTexture),at(nt,v),v.mipmaps&&v.mipmaps.length>0)for(let rt=0;rt<v.mipmaps.length;rt++)Tt(H.__webglFramebuffer[rt],P,v,i.COLOR_ATTACHMENT0,nt,rt);else Tt(H.__webglFramebuffer,P,v,i.COLOR_ATTACHMENT0,nt,0);m(v)&&w(nt),e.unbindTexture()}P.depthBuffer&&ot(P)}function dt(P){let v=P.textures;for(let H=0,Z=v.length;H<Z;H++){let et=v[H];if(m(et)){let pt=M(P),gt=n.get(et).__webglTexture;e.bindTexture(pt,gt),w(pt),e.unbindTexture()}}}let _t=[],kt=[];function Vt(P){if(P.samples>0){if(Kt(P)===!1){let v=P.textures,H=P.width,Z=P.height,et=i.COLOR_BUFFER_BIT,pt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(P),nt=v.length>1;if(nt)for(let xt=0;xt<v.length;xt++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);let rt=P.texture.mipmaps;rt&&rt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let xt=0;xt<v.length;xt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),nt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[xt]);let Ot=n.get(v[xt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ot,0)}i.blitFramebuffer(0,0,H,Z,0,0,H,Z,et,i.NEAREST),l===!0&&(_t.length=0,kt.length=0,_t.push(i.COLOR_ATTACHMENT0+xt),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(_t.push(pt),kt.push(pt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,kt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),nt)for(let xt=0;xt<v.length;xt++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,gt.__webglColorRenderbuffer[xt]);let Ot=n.get(v[xt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.TEXTURE_2D,Ot,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let v=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Yt(P){return Math.min(s.maxSamples,P.samples)}function Kt(P){let v=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function F(P){let v=o.render.frame;h.get(P)!==v&&(h.set(P,v),P.update())}function ce(P,v){let H=P.colorSpace,Z=P.format,et=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==cr&&H!==ri&&(re.getTransfer(H)===de?(Z!==An||et!==dn)&&Gt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",H)),v}function ne(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=U,this.getTextureUnits=D,this.setTextureUnits=B,this.setTexture2D=Y,this.setTexture2DArray=J,this.setTexture3D=tt,this.setTextureCube=it,this.rebindTextures=ct,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=Vt,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=Kt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function ny(i,t){function e(n,s=ri){let r,o=re.getTransfer(s);if(n===dn)return i.UNSIGNED_BYTE;if(n===wa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ta)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ic)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Lc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Cc)return i.BYTE;if(n===Pc)return i.SHORT;if(n===Us)return i.UNSIGNED_SHORT;if(n===Ea)return i.INT;if(n===Fn)return i.UNSIGNED_INT;if(n===On)return i.FLOAT;if(n===Bn)return i.HALF_FLOAT;if(n===Dc)return i.ALPHA;if(n===Nc)return i.RGB;if(n===An)return i.RGBA;if(n===Xn)return i.DEPTH_COMPONENT;if(n===Ci)return i.DEPTH_STENCIL;if(n===qr)return i.RED;if(n===Aa)return i.RED_INTEGER;if(n===Pi)return i.RG;if(n===Ra)return i.RG_INTEGER;if(n===Ca)return i.RGBA_INTEGER;if(n===Yr||n===Zr||n===Kr||n===Jr)if(o===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Pa||n===Ia||n===La||n===Da)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===La)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Na||n===Ua||n===Fa||n===Oa||n===Ba||n===$r||n===za)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Na||n===Ua)return o===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Fa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Oa)return r.COMPRESSED_R11_EAC;if(n===Ba)return r.COMPRESSED_SIGNED_R11_EAC;if(n===$r)return r.COMPRESSED_RG11_EAC;if(n===za)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Va||n===Ha||n===Ga||n===ka||n===Wa||n===Xa||n===qa||n===Ya||n===Za||n===Ka||n===Ja||n===$a||n===ja||n===Qa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Va)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ha)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ga)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ka)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===qa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ya)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Za)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ka)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ja)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$a)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ja)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qa)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===tl||n===el||n===nl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===tl)return o===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===el)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===il||n===sl||n===jr||n===rl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===il)return r.COMPRESSED_RED_RGTC1_EXT;if(n===sl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===rl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Fs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var iy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sy=`
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

}`,lh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new br(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new qe({vertexShader:iy,fragmentShader:sy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new le(new Yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ch=class extends Dn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,p=null,f=null,u=null,x=null,b=typeof XRWebGLBinding<"u",g=new lh,m={},w=e.getContextAttributes(),M=null,_=null,S=[],E=[],C=new ut,y=null,A=null,R=new Ke;R.viewport=new Ie;let I=new Ke;I.viewport=new Ie;let L=[R,I],U=new xa,D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let Q=S[K];return Q===void 0&&(Q=new Ms,S[K]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(K){let Q=S[K];return Q===void 0&&(Q=new Ms,S[K]=Q),Q.getGripSpace()},this.getHand=function(K){let Q=S[K];return Q===void 0&&(Q=new Ms,S[K]=Q),Q.getHandSpace()};function k(K){let Q=E.indexOf(K.inputSource);if(Q===-1)return;let ft=S[Q];ft!==void 0&&(ft.update(K.inputSource,K.frame,c||o),ft.dispatchEvent({type:K.type,data:K.inputSource}))}function W(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Y);for(let K=0;K<S.length;K++){let Q=E[K];Q!==null&&(E[K]=null,S[K].disconnect(Q))}D=null,B=null,g.reset();for(let K in m)delete m[K];if(t.setRenderTarget(M),u=null,f=null,p=null,s=null,_=null,mt.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(C.width,C.height,!1),A!==null){let K=A.camera;K.fov=A.fov,K.zoom=A.zoom,K.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&Gt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&Gt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Y),w.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(C),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let ft=null,Dt=null,Tt=null;w.depth&&(Tt=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ft=w.stencil?Ci:Xn,Dt=w.stencil?Fs:Fn);let Ht={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:r};p=this.getBinding(),f=p.createProjectionLayer(Ht),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new un(f.textureWidth,f.textureHeight,{format:An,type:dn,depthTexture:new _i(f.textureWidth,f.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ft={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,e,ft),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),_=new un(u.framebufferWidth,u.framebufferHeight,{format:An,type:dn,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),mt.setContext(s),mt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Y(K){for(let Q=0;Q<K.removed.length;Q++){let ft=K.removed[Q],Dt=E.indexOf(ft);Dt>=0&&(E[Dt]=null,S[Dt].disconnect(ft))}for(let Q=0;Q<K.added.length;Q++){let ft=K.added[Q],Dt=E.indexOf(ft);if(Dt===-1){for(let Ht=0;Ht<S.length;Ht++)if(Ht>=E.length){E.push(ft),Dt=Ht;break}else if(E[Ht]===null){E[Ht]=ft,Dt=Ht;break}if(Dt===-1)break}let Tt=S[Dt];Tt&&Tt.connect(ft)}}let J=new N,tt=new N;function it(K,Q,ft){J.setFromMatrixPosition(Q.matrixWorld),tt.setFromMatrixPosition(ft.matrixWorld);let Dt=J.distanceTo(tt),Tt=Q.projectionMatrix.elements,Ht=ft.projectionMatrix.elements,_e=Tt[14]/(Tt[10]-1),ot=Tt[14]/(Tt[10]+1),ct=(Tt[9]+1)/Tt[5],ht=(Tt[9]-1)/Tt[5],dt=(Tt[8]-1)/Tt[0],_t=(Ht[8]+1)/Ht[0],kt=_e*dt,Vt=_e*_t,Yt=Dt/(-dt+_t),Kt=Yt*-dt;if(Q.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Kt),K.translateZ(Yt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Tt[10]===-1)K.projectionMatrix.copy(Q.projectionMatrix),K.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let F=_e+Yt,ce=ot+Yt,ne=kt-Kt,P=Vt+(Dt-Kt),v=ct*ot/ce*F,H=ht*ot/ce*F;K.projectionMatrix.makePerspective(ne,P,v,H,F,ce),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function O(K,Q){Q===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(Q.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let Q=K.near,ft=K.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(ft=g.depthFar)),U.near=I.near=R.near=Q,U.far=I.far=R.far=ft,(D!==U.near||B!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),D=U.near,B=U.far),U.layers.mask=K.layers.mask|6,R.layers.mask=U.layers.mask&-5,I.layers.mask=U.layers.mask&-3;let Dt=K.parent,Tt=U.cameras;O(U,Dt);for(let Ht=0;Ht<Tt.length;Ht++)O(Tt[Ht],Dt);Tt.length===2?it(U,R,I):U.projectionMatrix.copy(R.projectionMatrix),A===null&&K.isPerspectiveCamera&&(A={camera:K,fov:K.fov,zoom:K.zoom}),G(K,U,Dt)};function G(K,Q,ft){ft===null?K.matrix.copy(Q.matrixWorld):(K.matrix.copy(ft.matrixWorld),K.matrix.invert(),K.matrix.multiply(Q.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(Q.projectionMatrix),K.projectionMatrixInverse.copy(Q.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=vs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&u===null))return l},this.setFoveation=function(K){l=K,f!==null&&(f.fixedFoveation=K),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(K){return m[K]};let j=null;function at(K,Q){if(h=Q.getViewerPose(c||o),x=Q,h!==null){let ft=h.views;u!==null&&(t.setRenderTargetFramebuffer(_,u.framebuffer),t.setRenderTarget(_));let Dt=!1;ft.length!==U.cameras.length&&(U.cameras.length=0,Dt=!0);for(let ot=0;ot<ft.length;ot++){let ct=ft[ot],ht=null;if(u!==null)ht=u.getViewport(ct);else{let _t=p.getViewSubImage(f,ct);ht=_t.viewport,ot===0&&(t.setRenderTargetTextures(_,_t.colorTexture,_t.depthStencilTexture),t.setRenderTarget(_))}let dt=L[ot];dt===void 0&&(dt=new Ke,dt.layers.enable(ot),dt.viewport=new Ie,L[ot]=dt),dt.matrix.fromArray(ct.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(ct.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(ht.x,ht.y,ht.width,ht.height),ot===0&&(U.matrix.copy(dt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Dt===!0&&U.cameras.push(dt)}let Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){p=n.getBinding();let ot=p.getDepthInformation(ft[0]);ot&&ot.isValid&&ot.texture&&g.init(ot,s.renderState)}if(Tt&&Tt.includes("camera-access")&&b){t.state.unbindTexture(),p=n.getBinding();for(let ot=0;ot<ft.length;ot++){let ct=ft[ot].camera;if(ct){let ht=m[ct];ht||(ht=new br,m[ct]=ht);let dt=p.getCameraImage(ct);ht.sourceTexture=dt}}}}for(let ft=0;ft<S.length;ft++){let Dt=E[ft],Tt=S[ft];Dt!==null&&Tt!==void 0&&Tt.update(Dt,Q,c||o)}j&&j(K,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),x=null}let mt=new Ld;mt.setAnimationLoop(at),this.setAnimationLoop=function(K){j=K},this.dispose=function(){}}},ry=new fe,Bd=new Zt;Bd.set(-1,0,0,0,1,0,0,0,1);function oy(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Vc(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,w,M,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),p(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&u(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),x(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),b(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,w,M):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===$e&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===$e&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let w=t.get(m),M=w.envMap,_=w.envMapRotation;M&&(g.envMap.value=M,g.envMapRotation.value.setFromMatrix4(ry.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Bd),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,w,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*w,g.scale.value=M*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function p(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function u(g,m,w){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$e&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,m){m.matcap&&(g.matcap.value=m.matcap)}function b(g,m){let w=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ay(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,S){let E=S.program;n.uniformBlockBinding(_,E)}function c(_,S){let E=s[_.id];E===void 0&&(g(_),E=h(_),s[_.id]=E,_.addEventListener("dispose",w));let C=S.program;n.updateUBOMapping(_,C);let y=t.render.frame;r[_.id]!==y&&(f(_),r[_.id]=y)}function h(_){let S=p();_.__bindingPointIndex=S;let E=i.createBuffer(),C=_.__size,y=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,E),E}function p(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let S=s[_.id],E=_.uniforms,C=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let y=0,A=E.length;y<A;y++){let R=E[y];if(Array.isArray(R))for(let I=0,L=R.length;I<L;I++)u(R[I],y,I,C);else u(R,y,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(_,S,E,C){if(b(_,S,E,C)===!0){let y=_.__offset,A=_.value;if(Array.isArray(A)){let R=0;for(let I=0;I<A.length;I++){let L=A[I],U=m(L);x(L,_.__data,R),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(R+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(A,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,_.__data)}}function x(_,S,E){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,E)}function b(_,S,E,C){let y=_.value,A=S+"_"+E;if(C[A]===void 0)return typeof y=="number"||typeof y=="boolean"?C[A]=y:ArrayBuffer.isView(y)?C[A]=y.slice():C[A]=y.clone(),!0;{let R=C[A];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return C[A]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function g(_){let S=_.uniforms,E=0,C=16;for(let A=0,R=S.length;A<R;A++){let I=Array.isArray(S[A])?S[A]:[S[A]];for(let L=0,U=I.length;L<U;L++){let D=I[L],B=Array.isArray(D.value)?D.value:[D.value];for(let k=0,W=B.length;k<W;k++){let Y=B[k],J=m(Y),tt=E%C,it=tt%J.boundary,O=tt+it;E+=it,O!==0&&C-O<J.storage&&(E+=C-O),D.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=J.storage}}}let y=E%C;return y>0&&(E+=C-y),_.__size=E,_.__cache={},this}function m(_){let S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Gt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Gt("WebGLRenderer: Unsupported uniform value type.",_),S}function w(_){let S=_.target;S.removeEventListener("dispose",w);let E=o.indexOf(S.__bindingPointIndex);o.splice(E,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function M(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:l,update:c,dispose:M}}var ly=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Kn=null;function cy(){return Kn===null&&(Kn=new Ss(ly,16,16,Pi,Bn),Kn.name="DFG_LUT",Kn.minFilter=ze,Kn.magFilter=ze,Kn.wrapS=En,Kn.wrapT=En,Kn.generateMipmaps=!1,Kn.needsUpdate=!0),Kn}var fl=class{constructor(t={}){let{canvas:e=Qu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:f=!1,outputBufferType:u=dn}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;let b=u,g=new Set([Ca,Ra,Aa]),m=new Set([dn,Fn,Us,Fs,wa,Ta]),w=new Uint32Array(4),M=new Int32Array(4),_=new N,S=null,E=null,C=[],y=[],A=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,I=!1,L=null,U=null,D=null,B=null;this._outputColorSpace=Ze;let k=0,W=0,Y=null,J=-1,tt=null,it=new Ie,O=new Ie,G=null,j=new Ct(0),at=0,mt=e.width,K=e.height,Q=1,ft=null,Dt=null,Tt=new Ie(0,0,mt,K),Ht=new Ie(0,0,mt,K),_e=!1,ot=new Es,ct=!1,ht=!1,dt=new fe,_t=new N,kt=new Ie,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Yt=!1;function Kt(){return Y===null?Q:1}let F=n;function ce(T,z){return e.getContext(T,z)}let ne,P,v,H,Z,et,pt,gt,nt,rt,xt,Ot,Mt,yt,Bt,Wt,$t,V,vt,st,bt,At,lt;try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Se,!1),e.addEventListener("webglcontextrestored",he,!1),e.addEventListener("webglcontextcreationerror",Rn,!1),F===null){let z="webgl2";if(F=ce(z,T),F===null)throw ce(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}zt()}catch(T){throw e.removeEventListener("webglcontextlost",Se,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",Rn,!1),qt("WebGLRenderer: "+T.message),T}function zt(){ne=new g_(F),ne.init(),bt=new ny(F,ne),P=new o_(F,ne,t,bt),v=new ty(F,ne),P.reversedDepthBuffer&&f&&v.buffers.depth.setReversed(!0),U=F.createFramebuffer(),D=F.createFramebuffer(),B=F.createFramebuffer(),H=new y_(F),Z=new Vx,et=new ey(F,ne,v,Z,P,bt,H),pt=new m_(R),gt=new b0(F),At=new s_(F,gt),nt=new __(F,gt,H,At),rt=new b_(F,nt,gt,At,H),V=new v_(F,P,et),Bt=new a_(Z),xt=new zx(R,pt,ne,P,At,Bt),Ot=new oy(R,Z),Mt=new Gx,yt=new Zx(ne),$t=new i_(R,pt,v,rt,x,l),Wt=new Qx(R,rt,P),lt=new ay(F,H,P,v),vt=new r_(F,ne,H),st=new x_(F,ne,H),H.programs=xt.programs,R.capabilities=P,R.extensions=ne,R.properties=Z,R.renderLists=Mt,R.shadowMap=Wt,R.state=v,R.info=H}b!==dn&&(A=new S_(b,e.width,e.height,a,s,r));let Nt=new ch(R,F);this.xr=Nt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let T=ne.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=ne.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(T){T!==void 0&&(Q=T,this.setSize(mt,K,!1))},this.getSize=function(T){return T.set(mt,K)},this.setSize=function(T,z,$=!0){if(Nt.isPresenting){Gt("WebGLRenderer: Can't change size while VR device is presenting.");return}mt=T,K=z,e.width=Math.floor(T*Q),e.height=Math.floor(z*Q),$===!0&&(e.style.width=T+"px",e.style.height=z+"px"),A!==null&&A.setSize(e.width,e.height),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(mt*Q,K*Q).floor()},this.setDrawingBufferSize=function(T,z,$){mt=T,K=z,Q=$,e.width=Math.floor(T*$),e.height=Math.floor(z*$),this.setViewport(0,0,T,z)},this.setEffects=function(T){if(b===dn){qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let z=0;z<T.length;z++)if(T[z].isOutputPass===!0){Gt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(it)},this.getViewport=function(T){return T.copy(Tt)},this.setViewport=function(T,z,$,X){T.isVector4?Tt.set(T.x,T.y,T.z,T.w):Tt.set(T,z,$,X),v.viewport(it.copy(Tt).multiplyScalar(Q).round())},this.getScissor=function(T){return T.copy(Ht)},this.setScissor=function(T,z,$,X){T.isVector4?Ht.set(T.x,T.y,T.z,T.w):Ht.set(T,z,$,X),v.scissor(O.copy(Ht).multiplyScalar(Q).round())},this.getScissorTest=function(){return _e},this.setScissorTest=function(T){v.setScissorTest(_e=T)},this.setOpaqueSort=function(T){ft=T},this.setTransparentSort=function(T){Dt=T},this.getClearColor=function(T){return T.copy($t.getClearColor())},this.setClearColor=function(){$t.setClearColor(...arguments)},this.getClearAlpha=function(){return $t.getClearAlpha()},this.setClearAlpha=function(){$t.setClearAlpha(...arguments)},this.clear=function(T=!0,z=!0,$=!0){let X=0;if(T){let q=!1;if(Y!==null){let wt=Y.texture.format;q=g.has(wt)}if(q){let wt=Y.texture.type,Pt=m.has(wt),Et=$t.getClearColor(),It=$t.getClearAlpha(),Ft=Et.r,Qt=Et.g,ie=Et.b;Pt?(w[0]=Ft,w[1]=Qt,w[2]=ie,w[3]=It,F.clearBufferuiv(F.COLOR,0,w)):(M[0]=Ft,M[1]=Qt,M[2]=ie,M[3]=It,F.clearBufferiv(F.COLOR,0,M))}else X|=F.COLOR_BUFFER_BIT}z&&(X|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(X|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&F.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),L=T},this.dispose=function(){e.removeEventListener("webglcontextlost",Se,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",Rn,!1),$t.dispose(),Mt.dispose(),yt.dispose(),Z.dispose(),pt.dispose(),rt.dispose(),At.dispose(),lt.dispose(),xt.dispose(),Nt.dispose(),Nt.removeEventListener("sessionstart",Uh),Nt.removeEventListener("sessionend",Fh),Fi.stop()};function Se(T){T.preventDefault(),Fc("WebGLRenderer: Context Lost."),I=!0}function he(){Fc("WebGLRenderer: Context Restored."),I=!1;let T=H.autoReset,z=Wt.enabled,$=Wt.autoUpdate,X=Wt.needsUpdate,q=Wt.type;zt(),H.autoReset=T,Wt.enabled=z,Wt.autoUpdate=$,Wt.needsUpdate=X,Wt.type=q}function Rn(T){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Gn(T){let z=T.target;z.removeEventListener("dispose",Gn),zf(z)}function zf(T){Vf(T),Z.remove(T)}function Vf(T){let z=Z.get(T).programs;z!==void 0&&(z.forEach(function($){xt.releaseProgram($)}),T.isShaderMaterial&&xt.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,$,X,q,wt){z===null&&(z=Vt);let Pt=q.isMesh&&q.matrixWorld.determinantAffine()<0,Et=kf(T,z,$,X,q);v.setMaterial(X,Pt);let It=$.index,Ft=1;if(X.wireframe===!0){if(It=nt.getWireframeAttribute($),It===void 0)return;Ft=2}let Qt=$.drawRange,ie=$.attributes.position,Lt=Qt.start*Ft,ue=(Qt.start+Qt.count)*Ft;wt!==null&&(Lt=Math.max(Lt,wt.start*Ft),ue=Math.min(ue,(wt.start+wt.count)*Ft)),It!==null?(Lt=Math.max(Lt,0),ue=Math.min(ue,It.count)):ie!=null&&(Lt=Math.max(Lt,0),ue=Math.min(ue,ie.count));let Ue=ue-Lt;if(Ue<0||Ue===1/0)return;At.setup(q,X,Et,$,It);let Ae,Me=vt;if(It!==null&&(Ae=gt.get(It),Me=st,Me.setIndex(Ae)),q.isMesh)X.wireframe===!0?(v.setLineWidth(X.wireframeLinewidth*Kt()),Me.setMode(F.LINES)):Me.setMode(F.TRIANGLES);else if(q.isLine){let Qe=X.linewidth;Qe===void 0&&(Qe=1),v.setLineWidth(Qe*Kt()),q.isLineSegments?Me.setMode(F.LINES):q.isLineLoop?Me.setMode(F.LINE_LOOP):Me.setMode(F.LINE_STRIP)}else q.isPoints?Me.setMode(F.POINTS):q.isSprite&&Me.setMode(F.TRIANGLES);if(q.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))Me.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let Qe=q._multiDrawStarts,Rt=q._multiDrawCounts,rn=q._multiDrawCount,oe=It?gt.get(It).bytesPerElement:1,Mn=Z.get(X).currentProgram.getUniforms();for(let kn=0;kn<rn;kn++)Mn.setValue(F,"_gl_DrawID",kn),Me.render(Qe[kn]/oe,Rt[kn])}else if(q.isInstancedMesh)Me.renderInstances(Lt,Ue,q.count);else if($.isInstancedBufferGeometry){let Qe=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Rt=Math.min($.instanceCount,Qe);Me.renderInstances(Lt,Ue,Rt)}else Me.render(Lt,Ue)};function Nh(T,z,$,X){L!==null&&T.isNodeMaterial&&L.setObject(X,T),ct===!0&&Bt.setState(T,$,!1),T.transparent===!0&&T.side===yn&&T.forceSinglePass===!1?(T.side=$e,T.needsUpdate=!0,uo(T,z,X),T.side=Ti,T.needsUpdate=!0,uo(T,z,X),T.side=yn):uo(T,z,X)}this.compile=function(T,z,$=null){$===null&&($=T),L!==null&&L.renderStart(T,z,$),E=yt.get($),E.init(z),y.push(E),$.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(E.pushLight(q),q.castShadow&&E.pushShadow(q))}),T!==$&&T.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(E.pushLight(q),q.castShadow&&E.pushShadow(q))}),E.setupLights(),L!==null&&L.updateLights(E.state.lightsArray),ht=this.localClippingEnabled,ct=Bt.init(this.clippingPlanes,ht),ct===!0&&Bt.setGlobalState(this.clippingPlanes,z),L!==null&&Wt.render(E.state.shadowsArray,$,z);let X=new Set;return T.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let wt=q.material;if(wt)if(Array.isArray(wt))for(let Pt=0;Pt<wt.length;Pt++){let Et=wt[Pt];Nh(Et,$,z,q),X.add(Et)}else Nh(wt,$,z,q),X.add(wt)}),E=y.pop(),L!==null&&L.renderEnd(),X},this.compileAsync=function(T,z,$=null){let X=this.compile(T,z,$);return new Promise(q=>{function wt(){if(X.forEach(function(Pt){let It=Z.get(Pt).currentProgram;(It===void 0||It.isReady())&&X.delete(Pt)}),X.size===0){q(T);return}setTimeout(wt,10)}ne.get("KHR_parallel_shader_compile")!==null?wt():setTimeout(wt,10)})};let Il=null;function Hf(T){Il&&Il(T)}function Uh(){Fi.stop()}function Fh(){Fi.start()}let Fi=new Ld;Fi.setAnimationLoop(Hf),typeof self<"u"&&Fi.setContext(self),this.setAnimationLoop=function(T){Il=T,Nt.setAnimationLoop(T),T===null?Fi.stop():Fi.start()},Nt.addEventListener("sessionstart",Uh),Nt.addEventListener("sessionend",Fh),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L!==null&&L.renderStart(T,z);let $=Nt.enabled===!0&&Nt.isPresenting===!0,X=A!==null&&(Y===null||$)&&A.begin(R,Y);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Nt.enabled===!0&&Nt.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Nt.cameraAutoUpdate===!0&&Nt.updateCamera(z),z=Nt.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,z,Y),E=yt.get(T,y.length),E.init(z),E.state.textureUnits=et.getTextureUnits(),y.push(E),dt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ot.setFromProjectionMatrix(dt,Ln,z.reversedDepth),ht=this.localClippingEnabled,ct=Bt.init(this.clippingPlanes,ht),S=Mt.get(T,C.length),S.init(),C.push(S),Nt.enabled===!0&&Nt.isPresenting===!0){let Pt=R.xr.getDepthSensingMesh();Pt!==null&&Ll(Pt,z,-1/0,R.sortObjects)}Ll(T,z,0,R.sortObjects),S.finish(),L!==null&&L.updateLights(E.state.lightsArray),R.sortObjects===!0&&S.sort(ft,Dt),Yt=Nt.enabled===!1||Nt.isPresenting===!1||Nt.hasDepthSensing()===!1,Yt&&$t.addToRenderList(S,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ct===!0&&Bt.beginShadows();let q=E.state.shadowsArray;if(Wt.render(q,T,z),ct===!0&&Bt.endShadows(),(X&&A.hasRenderPass())===!1){let Pt=S.opaque,Et=S.transmissive;if(E.setupLights(),z.isArrayCamera){let It=z.cameras;if(Et.length>0)for(let Ft=0,Qt=It.length;Ft<Qt;Ft++){let ie=It[Ft];Bh(Pt,Et,T,ie)}Yt&&$t.render(T);for(let Ft=0,Qt=It.length;Ft<Qt;Ft++){let ie=It[Ft];Oh(S,T,ie,ie.viewport)}}else Et.length>0&&Bh(Pt,Et,T,z),Yt&&$t.render(T),Oh(S,T,z)}Y!==null&&W===0&&(et.updateMultisampleRenderTarget(Y),et.updateRenderTargetMipmap(Y)),X&&A.end(R),T.isScene===!0&&T.onAfterRender(R,T,z),At.resetDefaultState(),J=-1,tt=null,y.pop(),y.length>0?(E=y[y.length-1],et.setTextureUnits(E.state.textureUnits),ct===!0&&Bt.setGlobalState(R.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?S=C[C.length-1]:S=null,L!==null&&L.renderEnd()};function Ll(T,z,$,X){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)$=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(ot)){X&&kt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(dt);let Pt=rt.update(T),Et=T.material;Et.visible&&S.push(T,Pt,Et,$,kt.z,null,z)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(ot))){let Pt=rt.update(T),Et=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),kt.copy(T.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),kt.copy(Pt.boundingSphere.center)),kt.applyMatrix4(T.matrixWorld).applyMatrix4(dt)),Array.isArray(Et)){let It=Pt.groups;for(let Ft=0,Qt=It.length;Ft<Qt;Ft++){let ie=It[Ft],Lt=Et[ie.materialIndex];Lt&&Lt.visible&&S.push(T,Pt,Lt,$,kt.z,ie,z)}}else Et.visible&&S.push(T,Pt,Et,$,kt.z,null,z)}}let wt=T.children;for(let Pt=0,Et=wt.length;Pt<Et;Pt++)Ll(wt[Pt],z,$,X)}function Oh(T,z,$,X){let{opaque:q,transmissive:wt,transparent:Pt}=T;E.setupLightsView($),ct===!0&&Bt.setGlobalState(R.clippingPlanes,$),X&&v.viewport(it.copy(X)),q.length>0&&ho(q,z,$),wt.length>0&&ho(wt,z,$),Pt.length>0&&ho(Pt,z,$),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Bh(T,z,$,X){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[X.id]===void 0){let Lt=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[X.id]=new un(1,1,{generateMipmaps:!0,type:Lt?Bn:dn,minFilter:Ri,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:re.workingColorSpace})}let wt=E.state.transmissionRenderTarget[X.id],Pt=X.viewport||it;wt.setSize(Pt.z*R.transmissionResolutionScale,Pt.w*R.transmissionResolutionScale);let Et=R.getRenderTarget(),It=R.getActiveCubeFace(),Ft=R.getActiveMipmapLevel();R.setRenderTarget(wt),R.getClearColor(j),at=R.getClearAlpha(),at<1&&R.setClearColor(16777215,.5),R.clear(),Yt&&$t.render($);let Qt=R.toneMapping;R.toneMapping=Un;let ie=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),E.setupLightsView(X),ct===!0&&Bt.setGlobalState(R.clippingPlanes,X),ho(T,$,X),et.updateMultisampleRenderTarget(wt),et.updateRenderTargetMipmap(wt),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let ue=0,Ue=z.length;ue<Ue;ue++){let Ae=z[ue],{object:Me,geometry:Qe,material:Rt,group:rn}=Ae;if(Rt.side===yn&&Me.layers.test(X.layers)){let oe=Rt.side;Rt.side=$e,Rt.needsUpdate=!0,zh(Me,$,X,Qe,Rt,rn),Rt.side=oe,Rt.needsUpdate=!0,Lt=!0}}Lt===!0&&(et.updateMultisampleRenderTarget(wt),et.updateRenderTargetMipmap(wt))}R.setRenderTarget(Et,It,Ft),R.setClearColor(j,at),ie!==void 0&&(X.viewport=ie),R.toneMapping=Qt}function ho(T,z,$){let X=z.isScene===!0?z.overrideMaterial:null;for(let q=0,wt=T.length;q<wt;q++){let Pt=T[q],{object:Et,geometry:It,group:Ft}=Pt,Qt=Pt.material;Qt.allowOverride===!0&&X!==null&&(Qt=X),Et.layers.test($.layers)&&zh(Et,z,$,It,Qt,Ft)}}function zh(T,z,$,X,q,wt){L!==null&&q.isNodeMaterial&&L.setObject(T,q),T.onBeforeRender(R,z,$,X,q,wt),T.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),q.onBeforeRender(R,z,$,X,T,wt),q.transparent===!0&&q.side===yn&&q.forceSinglePass===!1?(q.side=$e,q.needsUpdate=!0,R.renderBufferDirect($,z,X,q,T,wt),q.side=Ti,q.needsUpdate=!0,R.renderBufferDirect($,z,X,q,T,wt),q.side=yn):R.renderBufferDirect($,z,X,q,T,wt),T.onAfterRender(R,z,$,X,q,wt)}function uo(T,z,$){z.isScene!==!0&&(z=Vt);let X=Z.get(T),q=E.state.lights,wt=E.state.shadowsArray,Pt=q.state.version,Et=xt.getParameters(T,q.state,wt,z,$,E.state.lightProbeGridArray),It=xt.getProgramCacheKey(Et),Ft=X.programs;X.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?z.environment:null,X.fog=z.fog;let Qt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;X.envMap=pt.get(T.envMap||X.environment,Qt),X.envMapRotation=X.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,Ft===void 0&&(T.addEventListener("dispose",Gn),Ft=new Map,X.programs=Ft);let ie=Ft.get(It);if(ie!==void 0){if(X.currentProgram===ie&&X.lightsStateVersion===Pt)return Hh(T,Et),ie}else Et.uniforms=xt.getUniforms(T),L!==null&&T.isNodeMaterial&&L.build(T,$,Et),T.onBeforeCompile(Et,R),ie=xt.acquireProgram(Et,It),Ft.set(It,ie),X.uniforms=Et.uniforms;let Lt=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Lt.clippingPlanes=Bt.uniform),Hh(T,Et),X.needsLights=Xf(T),X.lightsStateVersion=Pt,X.needsLights&&(Lt.ambientLightColor.value=q.state.ambient,Lt.lightProbe.value=q.state.probe,Lt.sunLights.value=q.state.sun,Lt.sunLightShadows.value=q.state.sunShadow,Lt.directionalLights.value=q.state.directional,Lt.directionalLightShadows.value=q.state.directionalShadow,Lt.spotLights.value=q.state.spot,Lt.spotLightShadows.value=q.state.spotShadow,Lt.rectAreaLights.value=q.state.rectArea,Lt.ltc_1.value=q.state.rectAreaLTC1,Lt.ltc_2.value=q.state.rectAreaLTC2,Lt.pointLights.value=q.state.point,Lt.pointLightShadows.value=q.state.pointShadow,Lt.hemisphereLights.value=q.state.hemi,Lt.sunShadowMatrix.value=q.state.sunShadowMatrix,Lt.sunShadowCascade.value=q.state.sunShadowCascade,Lt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Lt.spotLightMatrix.value=q.state.spotLightMatrix,Lt.spotLightMap.value=q.state.spotLightMap,Lt.pointShadowMatrix.value=q.state.pointShadowMatrix),X.lightProbeGrid=E.state.lightProbeGridArray.length>0,X.currentProgram=ie,X.uniformsList=null,ie}function Vh(T){if(T.uniformsList===null){let z=T.currentProgram.getUniforms();T.uniformsList=zs.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function Hh(T,z){let $=Z.get(T);$.outputColorSpace=z.outputColorSpace,$.batching=z.batching,$.batchingColor=z.batchingColor,$.instancing=z.instancing,$.instancingColor=z.instancingColor,$.instancingMorph=z.instancingMorph,$.skinning=z.skinning,$.morphTargets=z.morphTargets,$.morphNormals=z.morphNormals,$.morphColors=z.morphColors,$.morphTargetsCount=z.morphTargetsCount,$.numClippingPlanes=z.numClippingPlanes,$.numIntersection=z.numClipIntersection,$.vertexAlphas=z.vertexAlphas,$.vertexTangents=z.vertexTangents,$.toneMapping=z.toneMapping}function Gf(T,z){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;_.setFromMatrixPosition(z.matrixWorld);for(let $=0,X=T.length;$<X;$++){let q=T[$];if(q.texture!==null&&q.boundingBox.containsPoint(_))return q}return null}function kf(T,z,$,X,q){z.isScene!==!0&&(z=Vt),et.resetTextureUnits();let wt=z.fog,Pt=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?z.environment:null,Et=Y===null?R.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:re.workingColorSpace,It=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Ft=pt.get(X.envMap||Pt,It),Qt=X.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ie=!!$.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Lt=!!$.morphAttributes.position,ue=!!$.morphAttributes.normal,Ue=!!$.morphAttributes.color,Ae=Un;X.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ae=R.toneMapping);let Me=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Qe=Me!==void 0?Me.length:0,Rt=Z.get(X),rn=E.state.lights;if(ct===!0&&(ht===!0||T!==tt)){let Ee=T===tt&&X.id===J;Bt.setState(X,T,Ee)}let oe=!1;X.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==rn.state.version||Rt.outputColorSpace!==Et||q.isBatchedMesh&&Rt.batching===!1||!q.isBatchedMesh&&Rt.batching===!0||q.isBatchedMesh&&Rt.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Rt.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Rt.instancing===!1||!q.isInstancedMesh&&Rt.instancing===!0||q.isSkinnedMesh&&Rt.skinning===!1||!q.isSkinnedMesh&&Rt.skinning===!0||q.isInstancedMesh&&Rt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Rt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Rt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Rt.instancingMorph===!1&&q.morphTexture!==null||Rt.envMap!==Ft||X.fog===!0&&Rt.fog!==wt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==Bt.numPlanes||Rt.numIntersection!==Bt.numIntersection)||Rt.vertexAlphas!==Qt||Rt.vertexTangents!==ie||Rt.morphTargets!==Lt||Rt.morphNormals!==ue||Rt.morphColors!==Ue||Rt.toneMapping!==Ae||Rt.morphTargetsCount!==Qe||!!Rt.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,Rt.__version=X.version);let Mn=Rt.currentProgram;oe===!0&&(Mn=uo(X,z,q),L&&X.isNodeMaterial&&L.onUpdateProgram(X,Mn,Rt));let kn=!1,ai=!1,ts=!1,ye=Mn.getUniforms(),Ne=Rt.uniforms;if(v.useProgram(Mn.program)&&(kn=!0,ai=!0,ts=!0),X.id!==J&&(J=X.id,ai=!0),Rt.needsLights){let Ee=Gf(E.state.lightProbeGridArray,q);Rt.lightProbeGrid!==Ee&&(Rt.lightProbeGrid=Ee,ai=!0)}if(kn||tt!==T){v.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ye.setValue(F,"projectionMatrix",T.projectionMatrix),ye.setValue(F,"viewMatrix",T.matrixWorldInverse);let ci=ye.map.cameraPosition;ci!==void 0&&ci.setValue(F,_t.setFromMatrixPosition(T.matrixWorld)),P.logarithmicDepthBuffer&&ye.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ye.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),tt!==T&&(tt=T,ai=!0,ts=!0)}if(Rt.needsLights&&(rn.state.sunShadowMap.length>0&&ye.setValue(F,"sunShadowMap",rn.state.sunShadowMap,et),rn.state.directionalShadowMap.length>0&&ye.setValue(F,"directionalShadowMap",rn.state.directionalShadowMap,et),rn.state.spotShadowMap.length>0&&ye.setValue(F,"spotShadowMap",rn.state.spotShadowMap,et),rn.state.pointShadowMap.length>0&&ye.setValue(F,"pointShadowMap",rn.state.pointShadowMap,et)),q.isSkinnedMesh){ye.setOptional(F,q,"bindMatrix"),ye.setOptional(F,q,"bindMatrixInverse");let Ee=q.skeleton;Ee&&(Ee.boneTexture===null&&Ee.computeBoneTexture(),ye.setValue(F,"boneTexture",Ee.boneTexture,et))}q.isBatchedMesh&&(ye.setOptional(F,q,"batchingTexture"),ye.setValue(F,"batchingTexture",q._matricesTexture,et),ye.setOptional(F,q,"batchingIdTexture"),ye.setValue(F,"batchingIdTexture",q._indirectTexture,et),ye.setOptional(F,q,"batchingColorTexture"),q._colorsTexture!==null&&ye.setValue(F,"batchingColorTexture",q._colorsTexture,et));let li=$.morphAttributes;if((li.position!==void 0||li.normal!==void 0||li.color!==void 0)&&V.update(q,$,Mn),(ai||Rt.receiveShadow!==q.receiveShadow)&&(Rt.receiveShadow=q.receiveShadow,ye.setValue(F,"receiveShadow",q.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&z.environment!==null&&(Ne.envMapIntensity.value=z.environmentIntensity),Ne.dfgLUT!==void 0&&(Ne.dfgLUT.value=cy()),ai){if(ye.setValue(F,"toneMappingExposure",R.toneMappingExposure),Rt.needsLights&&Wf(Ne,ts),wt&&X.fog===!0&&Ot.refreshFogUniforms(Ne,wt),Ot.refreshMaterialUniforms(Ne,X,Q,K,E.state.transmissionRenderTarget[T.id]),Rt.needsLights&&Rt.lightProbeGrid){let Ee=Rt.lightProbeGrid;Ne.probesSH.value=Ee.texture,Ne.probesMin.value.copy(Ee.boundingBox.min),Ne.probesMax.value.copy(Ee.boundingBox.max),Ne.probesResolution.value.copy(Ee.resolution)}zs.upload(F,Vh(Rt),Ne,et)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(zs.upload(F,Vh(Rt),Ne,et),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ye.setValue(F,"center",q.center),ye.setValue(F,"modelViewMatrix",q.modelViewMatrix),ye.setValue(F,"normalMatrix",q.normalMatrix),ye.setValue(F,"modelMatrix",q.matrixWorld),X.uniformsGroups!==void 0){let Ee=X.uniformsGroups;for(let ci=0,es=Ee.length;ci<es;ci++){let kh=Ee[ci];lt.update(kh,Mn),lt.bind(kh,Mn)}}return Mn}function Wf(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.sunLights.needsUpdate=z,T.sunLightShadows.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function Xf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(T,z,$){let X=Z.get(T);X.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Z.get(T.texture).__webglTexture=z,Z.get(T.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:$,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,z){let $=Z.get(T);$.__webglFramebuffer=z,$.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,$=0){Y=T,k=z,W=$;let X=null,q=!1,wt=!1;if(T){let Et=Z.get(T);if(Et.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(F.FRAMEBUFFER,Et.__webglFramebuffer),it.copy(T.viewport),O.copy(T.scissor),G=T.scissorTest,v.viewport(it),v.scissor(O),v.setScissorTest(G),J=-1;return}else if(Et.__webglFramebuffer===void 0)et.setupRenderTarget(T);else if(Et.__hasExternalTextures)et.rebindTextures(T,Z.get(T.texture).__webglTexture,Z.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Qt=T.depthTexture;if(Et.__boundDepthTexture!==Qt){if(Qt!==null&&Z.has(Qt)&&(T.width!==Qt.image.width||T.height!==Qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");et.setupDepthRenderbuffer(T)}}let It=T.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(wt=!0);let Ft=Z.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ft[z])?X=Ft[z][$]:X=Ft[z],q=!0):T.samples>0&&et.useMultisampledRTT(T)===!1?X=Z.get(T).__webglMultisampledFramebuffer:Array.isArray(Ft)?X=Ft[$]:X=Ft,it.copy(T.viewport),O.copy(T.scissor),G=T.scissorTest}else it.copy(Tt).multiplyScalar(Q).floor(),O.copy(Ht).multiplyScalar(Q).floor(),G=_e;if($!==0&&(X=U),v.bindFramebuffer(F.FRAMEBUFFER,X)&&v.drawBuffers(T,X),v.viewport(it),v.scissor(O),v.setScissorTest(G),q){let Et=Z.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+z,Et.__webglTexture,$)}else if(wt){let Et=z;for(let It=0;It<T.textures.length;It++){let Ft=Z.get(T.textures[It]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+It,Ft.__webglTexture,$,Et)}}else if(T!==null&&$!==0){let Et=Z.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Et.__webglTexture,$)}J=-1};function Gh(T){let z=Z.get(T);return(z.__readFormat!==T.format||z.__readType!==T.type)&&(z.__readFormat=T.format,z.__readType=T.type,z.__formatReadable=P.textureFormatReadable(T.format),z.__typeReadable=P.textureTypeReadable(T.type)),z}this.readRenderTargetPixels=function(T,z,$,X,q,wt,Pt,Et=0){if(!(T&&T.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=Z.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pt!==void 0&&(It=It[Pt]),It){v.bindFramebuffer(F.FRAMEBUFFER,It);try{let Ft=T.textures[Et],Qt=Ft.format,ie=Ft.type;T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Et);let Lt=Gh(Ft);if(Lt.__formatReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Lt.__typeReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-X&&$>=0&&$<=T.height-q&&F.readPixels(z,$,X,q,bt.convert(Qt),bt.convert(ie),wt)}finally{let Ft=Y!==null?Z.get(Y).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(T,z,$,X,q,wt,Pt,Et=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=Z.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pt!==void 0&&(It=It[Pt]),It)if(z>=0&&z<=T.width-X&&$>=0&&$<=T.height-q){v.bindFramebuffer(F.FRAMEBUFFER,It);let Ft=T.textures[Et],Qt=Ft.format,ie=Ft.type;T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Et);let Lt=Gh(Ft);if(Lt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Lt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ue=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ue),F.bufferData(F.PIXEL_PACK_BUFFER,wt.byteLength,F.STREAM_READ),F.readPixels(z,$,X,q,bt.convert(Qt),bt.convert(ie),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Ue=Y!==null?Z.get(Y).__webglFramebuffer:null;v.bindFramebuffer(F.FRAMEBUFFER,Ue);let Ae=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await ed(F,Ae,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ue),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,wt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(ue),F.deleteSync(Ae),wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,z=null,$=0){let X=Math.pow(2,-$),q=Math.floor(T.image.width*X),wt=Math.floor(T.image.height*X),Pt=z!==null?z.x:0,Et=z!==null?z.y:0;et.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,$,0,0,Pt,Et,q,wt),v.unbindTexture()},this.copyTextureToTexture=function(T,z,$=null,X=null,q=0,wt=0){let Pt,Et,It,Ft,Qt,ie,Lt,ue,Ue,Ae=T.isCompressedTexture?T.mipmaps[wt]:T.image;if($!==null)Pt=$.max.x-$.min.x,Et=$.max.y-$.min.y,It=$.isBox3?$.max.z-$.min.z:1,Ft=$.min.x,Qt=$.min.y,ie=$.isBox3?$.min.z:0;else{let Ne=Math.pow(2,-q);Pt=Math.floor(Ae.width*Ne),Et=Math.floor(Ae.height*Ne),T.isDataArrayTexture?It=Ae.depth:T.isData3DTexture?It=Math.floor(Ae.depth*Ne):It=1,Ft=0,Qt=0,ie=0}X!==null?(Lt=X.x,ue=X.y,Ue=X.z):(Lt=0,ue=0,Ue=0);let Me=bt.convert(z.format),Qe=bt.convert(z.type),Rt;z.isData3DTexture?(et.setTexture3D(z,0),Rt=F.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(et.setTexture2DArray(z,0),Rt=F.TEXTURE_2D_ARRAY):(et.setTexture2D(z,0),Rt=F.TEXTURE_2D),v.activeTexture(F.TEXTURE0),v.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,z.flipY),v.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),v.pixelStorei(F.UNPACK_ALIGNMENT,z.unpackAlignment);let rn=v.getParameter(F.UNPACK_ROW_LENGTH),oe=v.getParameter(F.UNPACK_IMAGE_HEIGHT),Mn=v.getParameter(F.UNPACK_SKIP_PIXELS),kn=v.getParameter(F.UNPACK_SKIP_ROWS),ai=v.getParameter(F.UNPACK_SKIP_IMAGES);v.pixelStorei(F.UNPACK_ROW_LENGTH,Ae.width),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ae.height),v.pixelStorei(F.UNPACK_SKIP_PIXELS,Ft),v.pixelStorei(F.UNPACK_SKIP_ROWS,Qt),v.pixelStorei(F.UNPACK_SKIP_IMAGES,ie);let ts=T.isDataArrayTexture||T.isData3DTexture,ye=z.isDataArrayTexture||z.isData3DTexture;if(T.isDepthTexture){let Ne=Z.get(T),li=Z.get(z),Ee=Z.get(Ne.__renderTarget),ci=Z.get(li.__renderTarget);v.bindFramebuffer(F.READ_FRAMEBUFFER,Ee.__webglFramebuffer),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,ci.__webglFramebuffer);for(let es=0;es<It;es++)ts&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Z.get(T).__webglTexture,q,ie+es),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Z.get(z).__webglTexture,wt,Ue+es)),F.blitFramebuffer(Ft,Qt,Pt,Et,Lt,ue,Pt,Et,F.DEPTH_BUFFER_BIT,F.NEAREST);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(q!==0||T.isRenderTargetTexture||Z.has(T)){let Ne=Z.get(T),li=Z.get(z);v.bindFramebuffer(F.READ_FRAMEBUFFER,D),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,B);for(let Ee=0;Ee<It;Ee++)ts?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ne.__webglTexture,q,ie+Ee):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ne.__webglTexture,q),ye?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,li.__webglTexture,wt,Ue+Ee):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,li.__webglTexture,wt),q!==0?F.blitFramebuffer(Ft,Qt,Pt,Et,Lt,ue,Pt,Et,F.COLOR_BUFFER_BIT,F.NEAREST):ye?F.copyTexSubImage3D(Rt,wt,Lt,ue,Ue+Ee,Ft,Qt,Pt,Et):F.copyTexSubImage2D(Rt,wt,Lt,ue,Ft,Qt,Pt,Et);v.bindFramebuffer(F.READ_FRAMEBUFFER,null),v.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ye?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(Rt,wt,Lt,ue,Ue,Pt,Et,It,Me,Qe,Ae.data):z.isCompressedArrayTexture?F.compressedTexSubImage3D(Rt,wt,Lt,ue,Ue,Pt,Et,It,Me,Ae.data):F.texSubImage3D(Rt,wt,Lt,ue,Ue,Pt,Et,It,Me,Qe,Ae):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,wt,Lt,ue,Pt,Et,Me,Qe,Ae.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,wt,Lt,ue,Ae.width,Ae.height,Me,Ae.data):F.texSubImage2D(F.TEXTURE_2D,wt,Lt,ue,Pt,Et,Me,Qe,Ae);v.pixelStorei(F.UNPACK_ROW_LENGTH,rn),v.pixelStorei(F.UNPACK_IMAGE_HEIGHT,oe),v.pixelStorei(F.UNPACK_SKIP_PIXELS,Mn),v.pixelStorei(F.UNPACK_SKIP_ROWS,kn),v.pixelStorei(F.UNPACK_SKIP_IMAGES,ai),wt===0&&z.generateMipmaps&&F.generateMipmap(Rt),v.unbindTexture()},this.initRenderTarget=function(T){Z.get(T).__webglFramebuffer===void 0&&et.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?et.setTextureCube(T,0):T.isData3DTexture?et.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?et.setTexture2DArray(T,0):et.setTexture2D(T,0),v.unbindTexture()},this.resetState=function(){k=0,W=0,Y=null,v.reset(),At.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}};var zd={type:"change"},uh={type:"start"},Hd={type:"end"},gl=new Wi,Vd=new gn,hy=Math.cos(70*Bc.DEG2RAD),Ge=new N,fn=2*Math.PI,xe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},hh=1e-6,_l=class extends Hr{constructor(t,e=null){super(t,e),this.state=xe.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ei.ROTATE,MIDDLE:Ei.DOLLY,RIGHT:Ei.PAN},this.touches={ONE:wi.ROTATE,TWO:wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Oe,this._lastTargetPosition=new N,this._quat=new Oe().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ls,this._sphericalDelta=new Ls,this._scale=1,this._panOffset=new N,this._rotateStart=new ut,this._rotateEnd=new ut,this._rotateDelta=new ut,this._panStart=new ut,this._panEnd=new ut,this._panDelta=new ut,this._dollyStart=new ut,this._dollyEnd=new ut,this._dollyDelta=new ut,this._dollyDirection=new N,this._mouse=new ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=dy.bind(this),this._onPointerDown=uy.bind(this),this._onPointerUp=fy.bind(this),this._onContextMenu=vy.bind(this),this._onMouseWheel=gy.bind(this),this._onKeyDown=_y.bind(this),this._onTouchStart=xy.bind(this),this._onTouchMove=yy.bind(this),this._onMouseDown=py.bind(this),this._onMouseMove=my.bind(this),this._interceptControlDown=by.bind(this),this._interceptControlUp=My.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=xe.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zd),this.update(),this.state=xe.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Ge.copy(e).sub(this.target),Ge.applyQuaternion(this._quat),this._spherical.setFromVector3(Ge),this.autoRotate&&this.state===xe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=fn:n>Math.PI&&(n-=fn),s<-Math.PI?s+=fn:s>Math.PI&&(s-=fn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ge.setFromSpherical(this._spherical),Ge.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ge),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ge.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ge.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(gl.origin.copy(this.object.position),gl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(gl.direction))<hy?this.object.lookAt(this.target):(Vd.setFromNormalAndCoplanarPoint(this.object.up,this.target),gl.intersectPlane(Vd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>hh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>hh||this._lastTargetPosition.distanceToSquared(this.target)>hh?(this.dispatchEvent(zd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?fn/60*this.autoRotateSpeed*t:fn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ge.setFromMatrixColumn(e,0),Ge.multiplyScalar(-t),this._panOffset.add(Ge)}_panUp(t,e){this.screenSpacePanning===!0?Ge.setFromMatrixColumn(e,1):(Ge.setFromMatrixColumn(e,0),Ge.crossVectors(this.object.up,Ge)),Ge.multiplyScalar(t),this._panOffset.add(Ge)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ge.copy(s).sub(this.target);let r=Ge.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/e.clientHeight),this._rotateUp(fn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/e.clientHeight),this._rotateUp(fn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ut,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function uy(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function dy(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function fy(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Hd),this.state=xe.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function py(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ei.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=xe.DOLLY;break;case Ei.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xe.ROTATE}break;case Ei.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xe.PAN}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(uh)}function my(i){switch(this.state){case xe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case xe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case xe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function gy(i){this.enabled===!1||this.enableZoom===!1||this.state!==xe.NONE||(i.preventDefault(),this.dispatchEvent(uh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Hd))}function _y(i){this.enabled!==!1&&this._handleKeyDown(i)}function xy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case wi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=xe.TOUCH_ROTATE;break;case wi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=xe.TOUCH_PAN;break;default:this.state=xe.NONE}break;case 2:switch(this.touches.TWO){case wi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=xe.TOUCH_DOLLY_PAN;break;case wi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=xe.TOUCH_DOLLY_ROTATE;break;default:this.state=xe.NONE}break;default:this.state=xe.NONE}this.state!==xe.NONE&&this.dispatchEvent(uh)}function yy(i){switch(this._trackPointer(i),this.state){case xe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case xe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case xe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case xe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=xe.NONE}}function vy(i){this.enabled!==!1&&i.preventDefault()}function by(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function My(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Gs=(i,t,e)=>Math.min(e,Math.max(t,i)),Ii=(i,t,e)=>i+(t-i)*e,Vn=(i,t,e)=>{let n=Gs((e-i)/(t-i),0,1);return n*n*(3-2*n)};function oi(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Hs=class{constructor(t){this.r=oi(t)}next(){return this.r()}range(t,e){return t+(e-t)*this.r()}int(t,e){return Math.floor(this.range(t,e+1))}pick(t){return t[Math.floor(this.r()*t.length)%t.length]}chance(t){return this.r()<t}};function xl(i,t){let e=Math.imul(i,374761393)^Math.imul(t,668265263);return e=Math.imul(e^e>>>13,1274126177),((e^e>>>16)>>>0)/4294967295}function ln(i,t){let e=Math.floor(i),n=Math.floor(t),s=i-e,r=t-n,o=s*s*(3-2*s),a=r*r*(3-2*r),l=xl(e,n),c=xl(e+1,n),h=xl(e,n+1),p=xl(e+1,n+1);return l+(c-l)*o+(h-l)*a+(l-c-h+p)*o*a}function yl(i,t,e=4){let n=0,s=.5,r=1;for(let o=0;o<e;o++)n+=s*ln(i*r,t*r),r*=2,s*=.5;return n}function Gd(i,t,e=3){let n=0,s=.55,r=1;for(let o=0;o<e;o++)n+=s*(1-Math.abs(ln(i*r,t*r)*2-1)),r*=2.1,s*=.5;return n}var vn=100,ae={x:-2,z:-9,y:3.2,hx:10.4,hz:8.4},sn={lz:-3.6,w:10,d:6.4,floor:2.2,plinth:.4},jt={x:20,z:-17,r:11,h:10},Xt={x:17,z:12.5,rx:7,rz:5.2,y:-.55},ke={x:-21,z:9.5},Ye={x:-30,z:-3.5},Ut={x:-6,z:22,w:16,d:8.5,rot:.06},Hn={x:-25,z:19,r:5.5},cn={x:10,z:25,r:7},ks={x:-28,z:-16,r:9},Ws={x:-8,z:-30,r:8},Be={x:16.2,z:-13.6},kd=ae.y-.7,dh=-34,Wd=[[19.2,-9],[19.8,-4.5],[18.6,.5],[17.6,7.4]],Xd=[[23.2,12.8],[28,13.6],[33,14.2],[41,15]],Sy=[[ae.x,3.2],[ae.x+.4,6.5],[-4.5,9.6],[-9.5,11.4],[-15,11.2],[-19.5,10]],Ey=[[-3.2,7.4],[-2.8,11.5],[-4.2,16],[-5.6,18.2]],wy=[[-1.4,5.6],[4,6.6],[9.5,5.6],[13.5,1.8],[16.2,-1.4]],Ty=[[-22.5,7.5],[-26,3.5],[-29,-1.2]],Ay=[[-1.2,8],[4,14],[8,19.5],[11.5,23]],Ry=[[16.2,-1.4],[15.4,-6],[15.6,-11.2]],Cy=[Sy,Ey,wy,Ty,Ay,Ry];function fh(i,t=60){return new vi(i.map(([n,s])=>new N(n,0,s)),!1,"catmullrom",.5).getPoints(t).map(n=>[n.x,n.z])}var ph=Cy.map(i=>fh(i,70));function Py(i,t,e){let n=1/0;for(let s=0;s<i.length-1;s++){let[r,o]=i[s],[a,l]=i[s+1],c=a-r,h=l-o,p=c*c+h*h||1,f=Math.max(0,Math.min(1,((t-r)*c+(e-o)*h)/p)),u=r+c*f,x=o+h*f,b=Math.hypot(t-u,e-x);b<n&&(n=b)}return n}function Xs(i,t){let e=1/0;for(let n of ph)e=Math.min(e,Py(n,i,t));return e}function $n(i){return(38+(yl(Math.cos(i)*1.5+7.3,Math.sin(i)*1.5+3.1,3)-.44)*7)*(1+.05*Math.cos(2*i-.4))}function no(i,t){let e=i*Math.PI/180,n=$n(e)-t;return[Math.cos(e)*n,Math.sin(e)*n]}function Iy(i,t,e,n,s,r){let o=Math.abs(i-e)-s,a=Math.abs(t-n)-r;return Math.hypot(Math.max(o,0),Math.max(a,0))+Math.min(Math.max(o,a),0)}var ji=(i,t)=>Iy(i,t,ae.x,ae.z,ae.hx,ae.hz),io=(i,t)=>Math.hypot((i-Xt.x)/Xt.rx,(t-Xt.z)/Xt.rz);function Yd(i,t){let e=Math.hypot(i,t),n=$n(Math.atan2(t,i)),s=(yl(i*.055+13,t*.055+5,3)-.44)*3.4;s=Math.max(s,-.12);let r=s+.8*(1-Vn(0,n,e)),o=Math.hypot(i-Ye.x,t-Ye.z);r+=3*(1-Vn(0,7.5,o));let a=1-Vn(4.2,15,ji(i,t));r=Ii(r,ae.y,a);let l=Math.hypot(i-jt.x,t-jt.z),c=Gs(1-l/jt.r,0,1);if(c>0){let h=Gd(i*.16+40,t*.16+9,3);r+=Math.pow(c,1.2)*(jt.h*.72+jt.h*.55*h*c)}return r-=1.2*Vn(n-5,n,e),r}function Ly(i,t,e){let n=ji(i,t),s=Vn(.6,1.4,n)*(1-Vn(2.7,3.5,n));e-=1.2*s;let r=1-Vn(.5,1.1,io(i,t));return e-=2.4*Math.pow(r,1.1),e}function Zd(i,t,e,n,s){let r=fh(i,64),o=[],a=t??1/0;return r.forEach(([l,c],h)=>{let p=h/(r.length-1),f=Math.min(a,Yd(l,c)-.32);s&&(f=Math.min(f,Ii(f,Xt.y,Vn(.7,1,p)))),a=f,o.push({x:l,z:c,y:f,hw:Ii(e,n,p)})}),o}var bl=Zd(Wd,null,.7,.95,!0),$i=Zd(Xd,Xt.y,1.3,1.7,!1),mh=[...bl,...$i];function Dy(i,t,e){let n=1/0,s=-1;for(let c=0;c<mh.length;c++){let h=mh[c],p=h.x-i,f=h.z-t,u=p*p+f*f;u<n&&(n=u,s=c)}let r=mh[s],o=Math.sqrt(n),a=1-Vn(r.hw*.9,r.hw*2.8,o);if(a<=0)return e;let l=r.y-.4;return e+(Math.min(e,l)-e)*a}function Jt(i,t){return Dy(i,t,Ly(i,t,Yd(i,t)))}var qs=.3;function Ny(i,t,e=new N){let n=Jt(i+qs,t)-Jt(i-qs,t),s=Jt(i,t+qs)-Jt(i,t-qs);return e.set(-n/(2*qs),1,-s/(2*qs)).normalize()}function Ml(i,t,e=0){return Math.hypot(i,t)<$n(Math.atan2(t,i))-e}var gh=["#d8b786","#c9a078","#b6937f","#9d8d9b","#8691b2"].map(i=>new Ct(i)),Uy=new Ct("#9dba72"),Fy=new Ct("#e3c79a");function Oy(i,t){let e=Gs(i,0,.9999)*(gh.length-1),n=Math.floor(e);return t.copy(gh[n]).lerp(gh[n+1],e-n)}function Kd(i,t,e){let n=Math.cos(i),s=Math.sin(i),r=$n(i),o=Math.sin(Math.PI*t),a=ln(n*2.1+t*3.3+10,s*2.1+t*2.7+5),l=ln(n*3.3-t*4+31,s*3.3+t*3.1+17),c=ln(n*5.2+7,s*5.2-t*9+3),h=r*(1-Math.pow(t,1.55))*(1+.14*o*(a-.5)*2),p=Math.min(7,Math.pow(Math.max(0,l-.42),2)*38)*o,f=Ii(e,dh,Math.pow(t,.72))-p*(.4+.6*t)+(c-.5)*1.6*o;return{x:n*h,y:f,z:s*h,n1:a,n3:c}}function By(i,t){let e=$n(i),n=Jt(Math.cos(i)*e,Math.sin(i)*e),s=Kd(i,t,n);return{x:s.x,y:s.y,z:s.z,nx:Math.cos(i),nz:Math.sin(i)}}function Jd(i){let o=new Float32Array(182160),a=new Float32Array(60720*3),l=new Float32Array(60720*2),c=new Float32Array(240),h=new Ct,p=new Ct,f=0;for(let w=0;w<=180;w++){let M=w/180;for(let _=0;_<240;_++){let S=_/240*Math.PI*2,E=$n(S),C=M*E,y=Math.cos(S)*C,A=Math.sin(S)*C,R=Jt(y,A);w===180&&(c[_]=R),o.set([y,R,A],f*3),l[f*2]=(y+vn/2)/vn,l[f*2+1]=1-(A+vn/2)/vn;let I=Vn(E-4.8,E-.2,C);a[f*3]=Ii(1,.9,I),a[f*3+1]=Ii(1,.72,I),a[f*3+2]=Ii(1,.52,I),f++}}for(let w=1;w<=72;w++){let M=w/72;for(let _=0;_<240;_++){let S=_/240*Math.PI*2,E=Math.cos(S),C=Math.sin(S),y=c[_],A=Kd(S,M,y),{n1:R,n3:I,y:L}=A;o.set([A.x,A.y,A.z],f*3),l[f*2]=.988,l[f*2+1]=.012;let U=Gs((y-L)/(y-dh),0,1);Oy(U,h);let D=.5+.5*Math.sin(L*1.5+I*5+R*3);if(h.lerp(p.set("#f1dcb4"),D*.22*(1-U*.5)),h.multiplyScalar(.92+R*.16),M<.12){let B=(1-M/.12)*(.45+.55*ln(E*9+3,C*9+1));h.lerp(Uy,Gs(B,0,1)*.85)}M<.03&&h.lerp(Fy,.25),a[f*3]=h.r,a[f*3+1]=h.g,a[f*3+2]=h.b,f++}}let u=[];for(let w=0;w<252;w++)for(let M=0;M<240;M++){let _=w*240+M,S=w*240+(M+1)%240,E=(w+1)*240+M,C=(w+1)*240+(M+1)%240;u.push(_,S,E,S,C,E)}let x=new Ce;x.setAttribute("position",new ve(o,3)),x.setAttribute("color",new ve(a,3)),x.setAttribute("uv",new ve(l,2)),x.setIndex(u),x.computeVertexNormals();let b=x.getAttribute("normal"),g=new N;for(let w=0;w<180;w++)for(let M=0;M<240;M++){let _=w*240+M;Ny(o[_*3],o[_*3+2],g),b.setXYZ(_,g.x,g.y,g.z)}x.computeBoundingSphere();let m=new le(x,i);return m.castShadow=!0,m.receiveShadow=!0,m}function vl(i,t){let e=i.getAttribute("position").count,n=new Float32Array(e);for(let s=0;s<e;s++)n[s]=Array.isArray(t)?t[s]:t;i.setAttribute("edge",new ve(n,1))}function qd(i,t,e){let n=i.length,s=new Float32Array(n*3*3),r=new Float32Array(n*3*2),o=[];for(let c=0;c<n;c++){let h=i[Math.max(0,c-1)],p=i[Math.min(n-1,c+1)],f=p.x-h.x,u=p.z-h.z,x=Math.hypot(f,u)||1;f/=x,u/=x;let b=i[c],g=b.hw*t,m=-u,w=f,M=b.y+e;s.set([b.x-m*g,M,b.z-w*g,b.x,M,b.z,b.x+m*g,M,b.z+w*g],c*9);for(let _=0;_<3;_++)r[(c*3+_)*2]=_/2,r[(c*3+_)*2+1]=c/(n-1);o.push(0,1,0)}let a=[];for(let c=0;c<n-1;c++)for(let h=0;h<2;h++){let p=c*3+h,f=c*3+h+1,u=(c+1)*3+h,x=(c+1)*3+h+1;a.push(p,u,f,f,u,x)}let l=new Ce;return l.setAttribute("position",new ve(s,3)),l.setAttribute("uv",new ve(r,2)),vl(l,o),l.setIndex(a),l}function $d(i,t){let e=new se,n=new yi(1,72);vl(n,1);let s=new le(n,i);s.rotation.x=-Math.PI/2,s.scale.set(Xt.rx*1.4,Xt.rz*1.4,1),s.position.set(Xt.x,Xt.y,Xt.z),e.add(s);let r=new Yn((ae.hx+4.2)*2,(ae.hz+4.2)*2);vl(r,1);let o=new le(r,i);o.rotation.x=-Math.PI/2,o.position.set(ae.x,kd,ae.z),e.add(o),e.add(new le(qd(bl,1.7,.02),i));let a=$i.length;for(let M=0;M<$i.length;M++){let _=$i[M];if(Math.hypot(_.x,_.z)>$n(Math.atan2(_.z,_.x))-.4){a=Math.max(2,M);break}}let l=$i.slice(0,a);e.add(new le(qd(l,1.7,.02),i));let c=l[l.length-1],h=l[l.length-2],p=c.x-h.x,f=c.z-h.z,u=Math.hypot(p,f)||1;p/=u,f/=u;let x=c.hw*1.7,b={x:c.x+p*.2,y:c.y+.02,z:c.z+f*.2,dx:p,dz:f,hw:x},g=30,m=(M,_)=>{let S=new Yn(M,g,1,16);S.translate(0,-g/2,0),vl(S,1);let E=new le(S,t);return E.position.set(b.x,b.y,b.z),E.rotation.y=_,E},w=Math.atan2(p,f);return e.add(m(x*2,w),m(x*1.2,w+Math.PI/2)),{group:e,waterfall:b}}function jd(){let i=new se,t=new Tn({color:"#a98462"}),e=46;for(let n=0;n<e;n++){let s=n/e*Math.PI*2+ln(n*3.1,2)*.5,r=.04+ln(n*1.7,9)*.34,o=By(s,r),a=o.x-o.nx*.12,l=o.y+.1,c=o.z-o.nz*.12,h=3+ln(n*5.3,1)*7,p=[0,.33,.66,1].map(b=>new N(a+Math.sin(b*3+n)*.5*b+o.nx*.6*b,l-h*b,c+Math.cos(b*2.4+n)*.5*b+o.nz*.6*b)),f=new vi(p),u=new Dr(f,8,.09+ln(n,4)*.08,5,!1),x=new le(u,t);i.add(x)}return i}var Ys=2048;function Li(i,t){let e=parseInt(i.slice(1),16);return`rgba(${e>>16&255},${e>>8&255},${e&255},${t})`}function Qd(i=8){let t=document.createElement("canvas");t.width=t.height=Ys;let e=t.getContext("2d"),n=Ys/vn,s=g=>(g+vn/2)*n,r=g=>(g+vn/2)*n,o=new Hs(11),a=(g,m,w,M,_)=>{let S=e.createRadialGradient(s(g),r(m),0,s(g),r(m),w*n);S.addColorStop(0,Li(M,_)),S.addColorStop(1,Li(M,0)),e.fillStyle=S,e.beginPath(),e.arc(s(g),r(m),w*n,0,Math.PI*2),e.fill()},l=(g,m,w,M)=>{e.fillStyle=M,e.beginPath(),e.arc(s(g),r(m),Math.max(1,w*n),0,Math.PI*2),e.fill()},c=(g,m,w)=>{e.strokeStyle=w,e.lineWidth=m*n,e.lineCap="round",e.lineJoin="round",e.beginPath(),g.forEach(([M,_],S)=>S===0?e.moveTo(s(M),r(_)):e.lineTo(s(M),r(_))),e.stroke()},h=(g,m,w,M,_,S)=>{e.save(),e.translate(s(g),r(m)),e.rotate(_),e.scale(n,n),S(),e.restore()};e.fillStyle="#b9d291",e.fillRect(0,0,Ys,Ys);let p=["#a6c97f","#c8dd9b","#b0cf8a","#9cc27d","#d6e3a2","#c1d98f"];for(let g=0;g<420;g++){let m=o.range(0,Math.PI*2),w=Math.sqrt(o.next())*42;a(Math.cos(m)*w,Math.sin(m)*w,o.range(2.5,7.5),o.pick(p),.5)}for(let g of[ks,Ws]){for(let m=0;m<26;m++){let w=o.range(0,Math.PI*2),M=Math.sqrt(o.next())*g.r*1.1;a(g.x+Math.cos(w)*M,g.z+Math.sin(w)*M,o.range(2,5),"#86ac74",.65)}for(let m=0;m<90;m++){let w=o.range(0,Math.PI*2),M=Math.sqrt(o.next())*g.r;l(g.x+Math.cos(w)*M,g.z+Math.sin(w)*M,o.range(.08,.2),o.pick(["#c5b07e","#d2bd8a","#a7a070"]))}}{let g=e.createRadialGradient(s(jt.x),r(jt.z),0,s(jt.x),r(jt.z),jt.r*1.05*n);g.addColorStop(0,"#f5f2f8"),g.addColorStop(.2,"#ece7ee"),g.addColorStop(.34,"#cfc6c6"),g.addColorStop(.55,"#b7a999"),g.addColorStop(.78,"#b9b78e"),g.addColorStop(1,Li("#b9b78e",0)),e.fillStyle=g,e.beginPath(),e.arc(s(jt.x),r(jt.z),jt.r*1.05*n,0,Math.PI*2),e.fill();for(let m=0;m<520;m++){let w=o.range(0,Math.PI*2),M=Math.sqrt(o.next())*jt.r*.85,S=M/(jt.r*.85)<.28?o.pick(["#fbf9fc","#e5e0ea","#d9d4e0"]):o.pick(["#a99b8b","#c2b6a6","#8f8578","#b4a79a"]);l(jt.x+Math.cos(w)*M,jt.z+Math.sin(w)*M,o.range(.12,.42),S)}}e.save(),e.translate(s(Xt.x),r(Xt.z)),e.scale(Xt.rx*1.16*n,Xt.rz*1.16*n);{let g=e.createRadialGradient(0,0,.4,0,0,1);g.addColorStop(0,"#efdcaa"),g.addColorStop(.78,"#efdcaa"),g.addColorStop(1,Li("#efdcaa",0)),e.fillStyle=g,e.beginPath(),e.arc(0,0,1,0,Math.PI*2),e.fill()}e.restore();for(let g of[bl,$i]){let m=g.map(w=>[w.x,w.z]);c(m,4.6,Li("#e9d6a4",.5)),c(m,3,Li("#e9d6a4",.7))}{let g=[{c:"#e7c973",row:"#d1ac55"},{c:"#a1c97c",row:"#86b568"},{c:"#cba97b",row:"#b38e63"},{c:"#c9aedb",row:"#b08fc4"}];h(Ut.x,Ut.z,Ut.w,Ut.d,Ut.rot,()=>{let m=Ut.w/g.length;g.forEach((w,M)=>{let _=-Ut.w/2+M*m;e.fillStyle=w.c,e.fillRect(_+.12,-Ut.d/2,m-.24,Ut.d),e.fillStyle=w.row;for(let S=_+.45;S<_+m-.3;S+=.62)e.fillRect(S,-Ut.d/2+.2,.22,Ut.d-.4);e.fillStyle=Li("#8d7249",.45),e.fillRect(_+m-.18,-Ut.d/2,.12,Ut.d)})})}for(let g=0;g<18;g++){let m=o.range(0,Math.PI*2),w=Math.sqrt(o.next())*Hn.r;a(Hn.x+Math.cos(m)*w,Hn.z+Math.sin(m)*w,o.range(1.5,3),"#cfe3a0",.6)}for(let g of ph){c(g,2.9,"#cfba8f"),c(g,2.1,"#ead9b0");for(let m=0;m<g.length;m++)for(let w=0;w<5;w++){let[M,_]=g[m];l(M+o.range(-1,1),_+o.range(-1,1),o.range(.04,.1),o.pick(["#d5c29a","#c8b48a","#f3e6c4"]))}}a(ke.x,ke.z,4.4,"#dccaa0",1);for(let g=0;g<160;g++){let m=o.range(0,Math.PI*2),w=Math.sqrt(o.next())*3.4;l(ke.x+Math.cos(m)*w,ke.z+Math.sin(m)*w,o.range(.1,.26),o.pick(["#e7d8b0","#cdb98f","#d9c79c"]))}h(ae.x,ae.z,20,16,0,()=>{e.fillStyle="#dcd1bc",e.fillRect(-9.6,-7.6,19.2,15.2);for(let m=-9.6;m<9.6;m+=.62)for(let w=-7.6;w<7.6;w+=.62){let M=ln(m*3.1,w*2.7);e.fillStyle=Li(M>.5?"#ffffff":"#8c7f6a",.14+M*.12),e.fillRect(m+.03,w+.03,.56,.56)}e.fillStyle="#cbbfa7",e.fillRect(-1.2,-1,2.4,9);let g=[[-6.6,3.2,4.2,3.4],[3.2,4.6,3.6,2.4]];for(let[m,w,M,_]of g){e.fillStyle="#9fc67a",e.fillRect(m-M/2,w-_/2,M,_),e.strokeStyle="#b9a98a",e.lineWidth=.14,e.strokeRect(m-M/2,w-_/2,M,_);for(let S=0;S<70;S++)e.fillStyle=o.pick(["#e9a3b0","#f2d06a","#fbf6ea","#b9a3d9"]),e.beginPath(),e.arc(m+o.range(-M/2+.2,M/2-.2),w+o.range(-_/2+.2,_/2-.2),o.range(.06,.13),0,Math.PI*2),e.fill()}});let f=["#e9a3b0","#f2d06a","#fbf6ea","#b9a3d9","#f0b58f"],u=(g,m)=>Math.hypot(g,m)<$n(Math.atan2(m,g))-2.5&&io(g,m)>1.15&&ji(g,m)>4.6&&Xs(g,m)>1.6&&Math.hypot(g-ke.x,m-ke.z)>4.6&&Math.hypot(g-jt.x,m-jt.z)>jt.r*.6,x=0;for(let g=0;g<22e3&&x<4200;g++){let m=o.range(0,Math.PI*2),w=Math.sqrt(o.next())*39,M=Math.cos(m)*w,_=Math.sin(m)*w;u(M,_)&&(M>Ut.x-Ut.w/2-1&&M<Ut.x+Ut.w/2+1&&_>Ut.z-Ut.d/2-1&&_<Ut.z+Ut.d/2+1||(l(M,_,o.range(.07,.15),o.pick(f)),x++))}for(let g=0;g<1100;g++){let m=o.range(0,Math.PI*2),w=Math.sqrt(o.next())*cn.r,M=cn.x+Math.cos(m)*w,_=cn.z+Math.sin(m)*w;u(M,_)&&l(M,_,o.range(.07,.16),o.pick(f))}for(let g=0;g<7e3;g++){let m=o.range(-vn/2,vn/2),w=o.range(-vn/2,vn/2);e.save(),e.translate(s(m),r(w)),e.rotate(o.range(0,Math.PI)),e.fillStyle=o.chance(.5)?"rgba(255,255,255,0.05)":"rgba(80,90,40,0.04)",e.fillRect(0,0,o.range(.4,1.2)*n,o.range(.06,.16)*n),e.restore()}e.fillStyle="#ffffff",e.fillRect(Ys-48,Ys-48,48,48);let b=new vr(t);return b.colorSpace=Ze,b.anisotropy=i,b.wrapS=b.wrapT=En,b.needsUpdate=!0,b}function zy(){let t=new Uint8Array(64),e=(s,r,o)=>{let a=Math.min(1,Math.max(0,(o-s)/(r-s)));return a*a*(3-2*a)};for(let s=0;s<64;s++){let r=(s+.5)/64,o=.6+.4*(.34*e(.28,.46,r)+.4*e(.52,.7,r)+.26*e(.78,.93,r));t[s]=Math.round(o*255)}let n=new Ss(t,64,1,qr);return n.minFilter=n.magFilter=ze,n.generateMipmaps=!1,n.needsUpdate=!0,n}var _h=`
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
             mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm3(vec2 p){ return vnoise(p) * 0.5 + vnoise(p * 2.03) * 0.25 + vnoise(p * 4.1) * 0.125; }
`;function Vy(){return new qe({transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uShallow:{value:new Ct("#a9e3d6")},uDeep:{value:new Ct("#62b9c6")},uLight:{value:new Ct(1,1,1)},uAlpha:{value:.88}},vertexShader:`
      attribute float edge;
      varying vec3 vWorld; varying float vEdge;
      void main(){
        vec4 w = modelMatrix * vec4(position, 1.0);
        vWorld = w.xyz; vEdge = edge;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,fragmentShader:`
      uniform float uTime; uniform vec3 uShallow; uniform vec3 uDeep; uniform vec3 uLight; uniform float uAlpha;
      varying vec3 vWorld; varying float vEdge;
      ${_h}
      void main(){
        vec2 p = vWorld.xz;
        float w1 = vnoise(p * 0.8 + vec2(uTime * 0.13, uTime * 0.07));
        float w2 = vnoise(p * 2.2 - vec2(uTime * 0.11, -uTime * 0.09));
        float rip = smoothstep(0.58, 0.66, w1 * 0.55 + w2 * 0.45);
        vec3 col = mix(uDeep, uShallow, 0.3 + 0.55 * w1);
        col = mix(col, vec3(1.0, 0.98, 0.92), rip * 0.4);
        float a = uAlpha * smoothstep(0.0, 0.5, vEdge);
        gl_FragColor = vec4(col * uLight, a);
      }`})}function Hy(){return new qe({transparent:!0,depthWrite:!1,side:yn,uniforms:{uTime:{value:0},uLight:{value:new Ct(1,1,1)}},vertexShader:`
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      uniform float uTime; uniform vec3 uLight; varying vec2 vUv;
      ${_h}
      void main(){
        float v = vUv.y;
        float s1 = vnoise(vec2(vUv.x * 9.0, v * 5.0 + uTime * 2.6));
        float s2 = vnoise(vec2(vUv.x * 17.0 + 3.0, v * 9.0 + uTime * 3.4));
        float s = smoothstep(0.38, 0.82, s1 * 0.6 + s2 * 0.4);
        vec3 col = mix(vec3(0.62, 0.86, 0.9), vec3(1.0), s);
        float side = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
        float fade = smoothstep(0.0, 0.55, v);
        float a = (0.5 + 0.42 * s) * side * fade;
        gl_FragColor = vec4(col * uLight, a);
      }`})}function Gy(){return new qe({side:$e,depthWrite:!1,uniforms:{uTop:{value:new Ct},uMid:{value:new Ct},uBot:{value:new Ct},uSunCol:{value:new Ct},uSunDir:{value:new N(.5,.6,.4)},uSunSize:{value:.9992},uTime:{value:0}},vertexShader:`
      varying vec3 vDir;
      void main(){
        vDir = normalize(position);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
      }`,fragmentShader:`
      uniform vec3 uTop; uniform vec3 uMid; uniform vec3 uBot; uniform vec3 uSunCol; uniform vec3 uSunDir;
      uniform float uSunSize; uniform float uTime;
      varying vec3 vDir;
      ${_h}
      void main(){
        vec3 d = normalize(vDir);
        float y = d.y;
        vec3 col = y > 0.0
          ? mix(uMid, uTop, pow(clamp(y, 0.0, 1.0), 0.6))
          : mix(uMid, uBot, pow(clamp(-y, 0.0, 1.0), 0.55));
        vec2 q = d.xz / (abs(d.y) + 0.55);
        float wash = fbm3(q * 2.4 + vec2(uTime * 0.004, 0.0));
        col *= 0.95 + 0.1 * wash;
        float sd = dot(d, normalize(uSunDir));
        float disc = smoothstep(uSunSize, uSunSize + 0.0012, sd);
        float halo = pow(max(sd, 0.0), 26.0) * 0.5 + pow(max(sd, 0.0), 5.0) * 0.16;
        col += uSunCol * (disc * 1.2 + halo);
        gl_FragColor = vec4(col, 1.0);
      }`})}function ky(){return new qe({transparent:!0,depthWrite:!1,blending:kr,uniforms:{uOpacity:{value:0},uTime:{value:0},uPx:{value:1}},vertexShader:`
      attribute float aSize; attribute float aPhase;
      uniform float uTime; uniform float uPx;
      varying float vTw;
      void main(){
        vTw = 0.75 + 0.25 * sin(uTime * 1.6 + aPhase * 6.2831);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
        gl_PointSize = aSize * uPx * vTw;
      }`,fragmentShader:`
      uniform float uOpacity; varying float vTw;
      void main(){
        vec2 p = gl_PointCoord - 0.5;
        float d = length(p);
        float glow = exp(-d * 9.0);
        float cross = max(0.0, 1.0 - abs(p.x) * 16.0) * max(0.0, 1.0 - abs(p.y) * 2.2)
                    + max(0.0, 1.0 - abs(p.y) * 16.0) * max(0.0, 1.0 - abs(p.x) * 2.2);
        float a = (glow * 0.85 + cross * 0.85) * uOpacity * vTw;
        gl_FragColor = vec4(1.0, 0.93, 0.72, a);
      }`})}function tf(i){let t=zy(),e=new Tn({vertexColors:!0,gradientMap:t}),n=new Tn({vertexColors:!0,gradientMap:t}),s=new Tn({vertexColors:!0,gradientMap:t}),r=new Tn({vertexColors:!0,gradientMap:t,map:i}),o=new qn({vertexColors:!0}),a=new qn({vertexColors:!0}),l=new Tn({color:"#ffffff",gradientMap:t}),c=Vy(),h=Hy(),p=Gy(),f=ky(),u=[];return{gradientMap:t,toon:e,roof:n,front:s,island:r,glow:o,windowGlow:a,cloud:l,water:c,fall:h,sky:p,stars:f,cloth:b=>{let g=new Tn({color:b,gradientMap:t,side:yn});return u.push(g),g},dispose(){t.dispose();for(let b of[e,n,s,r,o,a,l,c,h,p,f,...u])b.dispose()}}}function nf(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Ce,c=0;for(let h=0;h<i.length;++h){let p=i[h],f=0;if(e!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let u in p.attributes){if(!n.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+u+'" attribute exists among all geometries, or in none of them.'),null;r[u]===void 0&&(r[u]=[]),r[u].push(p.attributes[u]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let u in p.morphAttributes){if(!s.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[u]===void 0&&(o[u]=[]),o[u].push(p.morphAttributes[u])}if(t){let u;if(e)u=p.index.count;else if(p.attributes.position!==void 0)u=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,u,h),c+=u}}if(e){let h=0,p=[];for(let f=0;f<i.length;++f){let u=i[f].index;for(let x=0;x<u.count;++x)p.push(u.getX(x)+h);h+=i[f].attributes.position.count}l.setIndex(p)}for(let h in r){let p=ef(r[h]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,p)}for(let h in o){let p=o[h][0].length;if(p!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<p;++f){let u=[];for(let b=0;b<o[h].length;++b)u.push(o[h][b][f]);let x=ef(u);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(x)}}}return l}function ef(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new ve(o,e,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let p=l/e;for(let f=0,u=h.count;f<u;f++)for(let x=0;x<e;x++){let b=h.getComponent(f,x);a.setComponent(f+p,x,b)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var Di=[0,0,0],sf=new N(0,1,0),Sl=new Ct,rf=new wn,of=new Oe,Wy=new N,Xy=new N,xh=new fe,El=class i{constructor(t=.05,e,n){this.jitter=t;this.geos=e??[],this.base=n??null}at(t,e,n,s=0,r=1){let o=new fe().compose(new N(t,e,n),new Oe().setFromAxisAngle(sf,s),new N(r,r,r));return new i(this.jitter,this.geos,this.base?this.base.clone().multiply(o):o)}add(t,e,n=Di,s=Di,r=1,o=this.jitter,a=!1){let l=a?t:t.clone();if(l.index){let g=l.toNonIndexed();l.dispose(),l=g}l.getAttribute("uv")&&l.deleteAttribute("uv");let c=typeof r=="number"?[r,r,r]:r;rf.set(s[0],s[1],s[2]),of.setFromEuler(rf),xh.compose(Wy.set(n[0],n[1],n[2]),of,Xy.set(c[0],c[1],c[2])),this.base&&xh.premultiply(this.base),l.applyMatrix4(xh),Sl.set(e);let h=Sl.r,p=Sl.g,f=Sl.b,u=l.getAttribute("position"),x=u.count,b=new Float32Array(x*3);for(let g=0;g<x;g++){let m=u.getX(g),w=u.getY(g),M=u.getZ(g),_=o===0?1:1+(ln(m*.85+M*.55,w*.7+M*.4)-.5)*2*o;b[g*3]=h*_,b[g*3+1]=p*(1+(_-1)*.85),b[g*3+2]=f*(1+(_-1)*1.1)}l.setAttribute("color",new ve(b,3)),this.geos.push(l)}box(t,e,n,s,r,o=Di,a){this.add(new xi(t,e,n),r,s,o,1,a,!0)}cyl(t,e,n,s,r,o=10,a=Di,l=1,c){this.add(new ws(t,e,n,o),r,s,a,l,c,!0)}cone(t,e,n,s,r=10,o=Di,a=1,l){this.add(new Ts(t,e,r),s,n,o,a,l,!0)}sph(t,e,n,s=1,r=10,o){this.add(new Nn(t,r,Math.max(5,Math.round(r*.7))),n,e,Di,s,o,!0)}tor(t,e,n,s,r=Di,o=14,a){this.add(new Lr(t,e,6,o),s,n,r,1,a,!0)}rod(t,e,n,s,r=6){let o=new N(e[0]-t[0],e[1]-t[1],e[2]-t[2]),a=o.length();if(a<1e-5)return;let l=new Oe().setFromUnitVectors(sf,o.normalize()),c=new wn().setFromQuaternion(l);this.cyl(n,n,a,[(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2],s,r,[c.x,c.y,c.z],1,0)}beam(t,e,n,s,r){let o=new N(e[0]-t[0],e[1]-t[1],e[2]-t[2]),a=o.length(),l=new Oe().setFromUnitVectors(new N(0,0,1),o.normalize()),c=new wn().setFromQuaternion(l);this.box(n,s,a,[(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2],r,[c.x,c.y,c.z])}gable(t,e,n,s,r,o=0){let a=new Rs;a.moveTo(-t/2,0),a.lineTo(t/2,0),a.lineTo(0,n),a.closePath();let l=new Ir(a,{depth:e,bevelEnabled:!1});l.translate(0,0,-e/2),this.add(l,r,s,[0,o,0],1,void 0,!0)}hip(t,e,n,s,r){let o=new Ts(t/Math.SQRT2,n,4);o.rotateY(Math.PI/4),this.add(o,r,s,Di,[1,1,e/t],void 0,!0)}geometry(){return this.geos.length?nf(this.geos,!1):null}build(t,e=!0,n=!0){let s=this.geometry();if(!s)return null;s.computeBoundingSphere();let r=new le(s,t);return r.castShadow=e,r.receiveShadow=n,r}},be=class i{constructor(t=new El(.05),e=new El(0)){this.s=t;this.g=e}at(t,e,n,s=0,r=1){return new i(this.s.at(t,e,n,s,r),this.g.at(t,e,n,s,r))}};var d={stone:"#eadfca",stoneD:"#d6c8ae",stoneL:"#f6edda",stoneBlue:"#c7cdd6",wood:"#b98d64",woodD:"#8e6b4d",woodL:"#d6b184",roofBlue:"#7ea3b8",roofBlueD:"#6a8ea6",roofRed:"#d98f74",roofRose:"#e3a897",gold:"#ecc766",goldD:"#d3a63f",red:"#d9776a",redD:"#b9574f",teal:"#6fb3b0",tealD:"#4f9293",mint:"#a8d5b8",pink:"#efb7c2",lilac:"#b9a3d9",cream:"#f7eed9",white:"#fbf7ee",ink:"#3b4660",iron:"#6f7686",ironL:"#a0a7b5",steel:"#bcc4d0",brass:"#d9b25a",glass:"#ffe3a1",shadow:"#4a4a66",skin:"#f7d6b5",skinD:"#ebbf9a",hairGold:"#f2c94c",hairBrown:"#8c6244",hairDark:"#4b3a3a",hairGray:"#e4e0da",leaf:"#8fbf7e",leafD:"#6fa46f",leafL:"#b6d98f",pine:"#6f9f86",pineD:"#58866f",blossom:"#f1b7c6",sand:"#efdcaa",dirt:"#cdb98f",rock:"#b9ac9c",rockD:"#9d9183",snow:"#f5f2f8",water:"#8fd0cf"},af=["#c96f6f","#d9a85a","#6f9bb5","#8bb58a","#9a7bb5","#e8d9b5","#d98f74","#5f8f9e"];var me=Math.PI;function Ni(i,t,e,n=.52,s=d.woodL,r=d.woodD){i.s.box(t,.07,e,[0,n-.035,0],s),i.s.box(t-.14,.07,e-.14,[0,n-.1,0],r);for(let o of[-1,1])for(let a of[-1,1])i.s.box(.07,n-.07,.07,[o*(t/2-.07),(n-.07)/2,a*(e/2-.07)],r)}function yh(i,t){i.s.box(t,.06,.26,[0,.27,0],d.wood);for(let e of[-1,1])i.s.box(.06,.25,.22,[e*(t/2-.12),.125,0],d.woodD)}function so(i,t=d.red){i.s.box(.42,.06,.4,[0,.3,0],d.wood),i.s.box(.36,.05,.34,[0,.35,0],t);for(let e of[-1,1])for(let n of[-1,1])i.s.box(.05,.3,.05,[e*.18,.15,n*.17],d.woodD);i.s.box(.42,.5,.05,[0,.58,-.18],d.wood),i.s.box(.34,.3,.04,[0,.6,-.155],t)}function lf(i,t=d.teal){i.s.box(.7,.3,.62,[0,.2,0],d.woodD),i.s.box(.58,.14,.5,[0,.4,.03],t),i.s.box(.7,.66,.14,[0,.62,-.26],t);for(let e of[-1,1])i.s.box(.1,.3,.55,[e*.34,.45,0],t)}function cf(i,t=d.red,e=d.gold){i.s.box(.66,.34,.58,[0,.17,0],e),i.s.box(.56,.1,.5,[0,.39,.02],t),i.s.box(.72,1.35,.12,[0,.82,-.28],e),i.s.box(.54,1,.05,[0,.9,-.215],t),i.s.cone(.18,.3,[0,1.65,-.28],e,4,[0,me/4,0]);for(let n of[-1,1])i.s.box(.1,.36,.5,[n*.37,.5,.02],e),i.s.sph(.06,[n*.37,.72,.22],e),i.s.sph(.05,[n*.34,1.52,-.28],e),i.g.sph(.03,[n*.34,1.52,-.22],"#ff9bb0");i.g.sph(.045,[0,1.46,-.21],"#9fe6ff")}function vh(i,t=d.mint,e=d.pink){i.s.box(1.5,.28,2.1,[0,.14,0],d.woodD),i.s.box(1.4,.18,2,[0,.37,0],d.cream),i.s.box(1.42,.12,1.3,[0,.46,.34],t),i.s.box(1.44,.04,.3,[0,.53,-.28],d.white);for(let n of[-1,1])i.s.box(.55,.13,.34,[n*.36,.52,-.8],d.white);i.s.box(1.5,.95,.1,[0,.62,-1.05],d.woodD),i.s.box(1.5,.45,.1,[0,.37,1.05],d.woodD);for(let n of[-1,1])for(let s of[-1,1])i.s.cyl(.04,.04,1.85,[n*.73,.92,s*1.02],d.woodD,8);i.s.box(1.62,.06,2.24,[0,1.86,0],e);for(let n of[-1,1])i.s.box(.04,.9,.5,[n*.76,1.38,-.8],e),i.s.box(.04,.9,.5,[n*.76,1.38,.8],e)}function hf(i,t,e,n=1){let s=new Hs(n),r=Math.max(2,Math.round(e/.42)),o=e/r;i.s.box(t,e,.05,[0,e/2,-.12],d.woodD);for(let a of[-1,1])i.s.box(.06,e,.3,[a*(t/2-.03),e/2,0],d.wood);for(let a=0;a<=r;a++)i.s.box(t,.05,.3,[0,a*o,0],d.wood);for(let a=0;a<r;a++){let l=-t/2+.1;for(;l<t/2-.12;){let c=s.range(.045,.1),h=s.range(o*.55,o*.88);if(s.chance(.07)){l+=c*2;continue}i.s.box(c,h,.2,[l+c/2,a*o+.025+h/2,-.01],s.pick(af),[0,0,s.chance(.05)?.25:0]),l+=c+.005}}}function Zs(i,t=.27,e=.55){i.s.cyl(t*.88,t*.88,e,[0,e/2,0],d.wood,12),i.s.cyl(t,t,e*.55,[0,e/2,0],d.woodL,12);for(let n of[.22,.78])i.s.cyl(t*.97,t*.97,.04,[0,e*n,0],d.iron,12);i.s.cyl(t*.85,t*.85,.03,[0,e+.01,0],d.woodL,12)}function uf(i,t=.45,e=d.wood){i.s.box(t,t,t,[0,t/2,0],e),i.s.box(t+.02,.05,t+.02,[0,t*.2,0],d.woodD),i.s.box(t+.02,.05,t+.02,[0,t*.8,0],d.woodD)}function ro(i,t=d.cream){i.s.sph(.25,[0,.22,0],t,[1,1.1,.85]),i.s.sph(.1,[0,.46,0],t),i.s.tor(.07,.02,[0,.4,0],d.woodD,[me/2,0,0],8)}function Ks(i,t=.18){i.s.cyl(.03,.03,t,[0,t/2,0],d.cream,8),i.s.cyl(.055,.055,.02,[0,.01,0],d.brass,8),i.g.sph(.032,[0,t+.05,0],"#ffd27a",[1,1.6,1],6)}function oo(i){i.s.box(.1,.05,.14,[0,0,-.04],d.iron),i.s.cyl(.035,.03,.4,[0,.12,.04],d.woodD,6,[.25,0,0]),i.s.cyl(.07,.04,.1,[0,.33,.1],d.iron,8),i.g.cone(.07,.24,[0,.47,.1],"#ffb347",6),i.g.cone(.045,.16,[0,.45,.1],"#ffe08a",6)}function df(i){i.s.box(1.7,1.4,.55,[0,.7,0],d.stone),i.s.box(.92,.8,.02,[0,.46,.28],"#3d3338"),i.s.box(1.9,.1,.7,[0,1.35,.05],d.stoneL),i.s.box(.9,1.1,.45,[0,1.95,-.05],d.stone),i.s.cyl(.05,.05,.62,[0,.12,.18],d.woodD,6,[0,0,me/2]),i.s.cyl(.05,.05,.55,[.05,.19,.12],d.wood,6,[0,.4,me/2]),i.g.cone(.17,.55,[0,.46,.2],"#ffb347",6),i.g.cone(.11,.42,[.14,.4,.2],"#ffd980",6),i.g.cone(.11,.36,[-.14,.38,.2],"#ff9d5c",6),i.g.cone(.07,.28,[.02,.4,.22],"#fff0b3",6);for(let t of[-1,1])i.s.box(.08,.9,.08,[t*.52,.45,.3],d.stoneL)}function ao(i){i.s.tor(.55,.03,[0,0,0],d.iron,[me/2,0,0],20);for(let t=0;t<6;t++){let e=t/6*me*2,n=Math.cos(e)*.55,s=Math.sin(e)*.55;i.s.cyl(.025,.025,.14,[n,.08,s],d.cream,6),i.g.sph(.03,[n,.2,s],"#ffd27a",[1,1.6,1],6),i.s.rod([n,0,s],[0,.75,0],.008,d.iron,4)}i.s.sph(.06,[0,.76,0],d.brass),i.s.rod([0,.76,0],[0,1.1,0],.012,d.iron,4)}function Ui(i,t,e,n,s=d.gold){i.s.rod([-t/2-.06,0,0],[t/2+.06,0,0],.025,d.woodD,6),i.s.box(t,e,.03,[0,-e/2-.03,0],n),i.s.box(t*.72,t*.72,.03,[0,-e-.03+t*.05,0],n,[0,0,me/4]),i.s.box(t*.22,t*.22,.036,[0,-e*.5,.003],s,[0,0,me/4]),i.s.box(t*.1,t*.4,.036,[0,-e*.5,.003],s),i.s.box(t*.4,t*.1,.036,[0,-e*.5,.003],s)}function ff(i,t,e,n,s=d.gold){i.s.box(t+.14,e+.14,.03,[0,0,0],s),i.s.box(t,e,.04,[0,0,.005],n),i.s.box(t*.5,t*.5,.045,[0,0,.008],s,[0,0,me/4]),i.s.box(t*.34,t*.34,.05,[0,0,.01],n,[0,0,me/4]),i.g.sph(.05,[0,0,.05],"#fff1b8")}function bh(i,t,e,n){i.s.cyl(t,t,.03,[0,.015,0],e,28,[0,0,0],1,.02),i.s.cyl(t*.72,t*.72,.035,[0,.018,0],n,28,[0,0,0],1,.02),i.s.cyl(t*.36,t*.36,.04,[0,.02,0],e,28,[0,0,0],1,.02)}function pf(i){i.s.sph(.34,[0,.5,0],d.iron,[1,.85,1],12),i.s.tor(.31,.04,[0,.7,0],d.ironL,[me/2,0,0],16),i.s.cyl(.29,.29,.02,[0,.69,0],"#e8a84e",14);for(let t=0;t<3;t++){let e=t/3*me*2;i.s.cyl(.04,.03,.22,[Math.cos(e)*.22,.11,Math.sin(e)*.22],d.iron,6)}}function mf(i){i.s.box(1.6,.72,.85,[0,.36,0],d.stoneD),i.s.box(1.62,.06,.88,[0,.75,0],d.iron),i.s.box(.55,.32,.02,[.3,.32,.43],"#3d3338"),i.g.box(.44,.2,.02,[.3,.27,.44],"#ffb347"),i.s.box(.55,1.6,.55,[-.45,1.55,-.12],d.stoneD)}function wl(i){i.s.box(1.4,.06,.28,[0,.12,0],d.woodD),i.s.box(1.4,.06,.28,[0,.9,-.04],d.woodD);for(let t of[-1,1])i.s.box(.07,1,.07,[t*.68,.5,0],d.woodD);for(let t=0;t<4;t++){let e=-.5+t*.33;t%2===0?(i.s.rod([e,.1,.02],[e,1.55,.02],.016,d.wood,5),i.s.cone(.05,.2,[e,1.64,.02],d.steel,4)):(i.s.box(.05,1,.012,[e,.7,.02],d.steel),i.s.box(.26,.04,.04,[e,1.2,.02],d.brass),i.s.cyl(.02,.02,.2,[e,1.32,.02],d.woodD,5))}i.s.rod([.58,.1,.05],[.58,1,.05],.014,d.wood,5),i.s.box(.22,.2,.03,[.58,1.06,.05],d.steel)}function Tl(i,t,e){i.s.cyl(.3,.3,.05,[0,0,0],t,18,[me/2,0,0]),i.s.box(.12,.58,.06,[0,0,.005],e),i.s.box(.58,.12,.06,[0,0,.005],e),i.s.sph(.07,[0,0,.05],d.gold)}function gf(i){i.s.cyl(.25,.28,.05,[0,.025,0],d.woodD,10),i.s.cyl(.03,.03,.7,[0,.4,0],d.woodD,6);for(let t of[-1,1])i.s.cyl(.07,.06,.4,[t*.09,.28,0],d.steel,8);i.s.cyl(.21,.16,.5,[0,.82,0],d.steel,10),i.s.tor(.15,.03,[0,.62,0],d.brass,[me/2,0,0],10);for(let t of[-1,1])i.s.sph(.1,[t*.24,1,0],d.steel),i.s.cyl(.05,.045,.4,[t*.29,.78,0],d.steel,6,[0,0,t*.15]);i.s.sph(.17,[0,1.2,0],d.steel,[1,1.05,1]),i.s.box(.2,.04,.04,[0,1.2,.16],d.shadow),i.s.cone(.06,.25,[0,1.46,-.04],d.red,6,[-.3,0,0])}function Mh(i){i.s.cyl(.05,.06,1.1,[0,.55,0],d.woodD,6),i.s.box(.7,.07,.07,[0,.85,0],d.woodD),i.s.sph(.15,[0,1.2,0],"#e7d8b0",[1,1.05,1]),i.s.cyl(.2,.17,.5,[0,.8,0],"#d3b98d",8),i.s.cyl(.2,.2,.05,[0,.04,0],d.woodD,8),i.s.cone(.1,.14,[0,1.4,0],d.red,6)}function _f(i,t=d.cream){i.s.box(.2,.025,.28,[-.1,.03,0],t,[0,0,.12]),i.s.box(.2,.025,.28,[.1,.03,0],t,[0,0,-.12]),i.s.box(.46,.02,.3,[0,.008,0],d.redD)}function Sh(i){i.s.cyl(.18,.22,.05,[0,.025,0],d.woodD,10),i.s.cyl(.03,.03,.5,[0,.3,0],d.woodD,6),i.s.sph(.3,[0,.86,0],"#8fc0d6",1,16);for(let[t,e,n,s]of[[.1,.95,.24,.1],[-.16,.8,.22,.12],[.2,.75,.16,.08],[0,1.12,.1,.07]])i.s.sph(s,[t,e,n],"#9ccf8a",[1,.8,.5],6);i.s.tor(.36,.018,[0,.86,0],d.brass,[.2,0,.3],24)}function xf(i){for(let t of[-1,1])i.s.rod([t*.22,0,.45],[t*.22,2,0],.025,d.wood,5);for(let t=1;t<8;t++){let e=t/8;i.s.rod([-.22,e*2,.45*(1-e)],[.22,e*2,.45*(1-e)],.018,d.woodD,5)}}function Eh(i){let t=[0,1,0];for(let e=0;e<3;e++){let n=e/3*me*2+.5;i.s.rod(t,[Math.cos(n)*.45,0,Math.sin(n)*.45],.022,d.woodD,5)}i.s.sph(.07,t,d.brass),i.s.cyl(.075,.1,1.5,[0,1.45,-.2],d.brass,12,[-.85,0,0]),i.s.cyl(.11,.11,.1,[0,1.78,-.52],d.goldD,12,[-.85,0,0]),i.s.cyl(.04,.04,.15,[0,1.12,.35],d.iron,6,[-.85,0,0])}function yf(i){i.s.cyl(.14,.2,.06,[0,.03,0],d.woodD,10),i.s.cyl(.025,.025,.32,[0,.2,0],d.brass,6),i.s.sph(.08,[0,.58,0],"#8fc0d6"),i.s.tor(.28,.014,[0,.58,0],d.brass,[0,0,0],24),i.s.tor(.28,.014,[0,.58,0],d.brass,[me/2,0,0],24),i.s.tor(.28,.014,[0,.58,0],d.goldD,[.6,.5,.9],24)}function wh(i){for(let t of[-1,1])i.s.box(.1,1.4,.1,[t*.42,.7,0],d.woodD);i.s.box(1.1,.12,.14,[0,1.42,0],d.woodD),i.s.cyl(.1,.3,.42,[0,1.08,0],d.brass,14),i.s.tor(.3,.035,[0,.87,0],d.goldD,[me/2,0,0],16),i.s.sph(.07,[0,.8,0],d.iron),i.s.rod([.1,1.2,.08],[.18,.2,.3],.012,d.cream,4)}function vf(i){i.s.box(.95,1.7,.5,[0,.85,0],d.woodD),i.s.box(.4,1.5,.03,[-.22,.85,.26],d.wood),i.s.box(.4,1.5,.03,[.22,.85,.26],d.wood),i.s.sph(.03,[-.05,.85,.29],d.brass),i.s.sph(.03,[.05,.85,.29],d.brass),i.s.box(1.05,.08,.58,[0,1.74,0],d.wood)}function Th(i,t=d.woodD){i.s.box(.8,.36,.45,[0,.18,0],t),i.s.cyl(.225,.225,.8,[0,.36,0],t,12,[0,0,me/2],[1,.7,1]),i.s.box(.82,.07,.47,[0,.2,0],d.iron),i.s.box(.08,.14,.05,[0,.36,.24],d.brass)}function bf(i){i.s.box(.45,.5,.4,[0,.25,0],d.wood),i.s.box(.38,.12,.02,[0,.35,.21],d.woodD);let t=i.at(0,.5,0);Ks(t)}function Mf(i){Ni(i,.9,.45,.55,d.woodL,d.woodD),i.s.cyl(.3,.3,.04,[0,1.15,-.2],d.brass,16,[me/2,0,0]),i.g.cyl(.26,.26,.02,[0,1.15,-.18],"#d7efff",16,[me/2,0,0]),i.s.rod([0,.55,-.2],[0,.86,-.2],.02,d.brass,5),i.s.cyl(.08,.08,.1,[.25,.6,0],d.pink,8)}function Ah(i,t=1){i.s.cyl(.15*t,.11*t,.22*t,[0,.11*t,0],d.roofRed,8);for(let[e,n,s,r]of[[0,.42,0,.2],[.12,.34,.06,.14],[-.1,.36,-.06,.15]])i.s.sph(r*t,[e*t,n*t,s*t],d.leaf,1,7)}function Sf(i,t=d.white){i.s.cyl(.1,.07,.02,[0,.01,0],t,10)}function Rh(i){i.s.cyl(.03,.03,.08,[0,.04,0],d.goldD,6),i.s.cyl(.05,.03,.07,[0,.11,0],d.gold,8)}function lo(i){i.s.sph(.11,[0,.06,0],"#e2b878",[1.4,.7,.85],8)}function Al(i,t=d.red){i.s.sph(.05,[0,.05,0],t,1,8)}function Ef(i){i.s.cyl(.09,.09,.07,[0,.035,0],"#f2d36b",8)}function Js(i,t,e,n=i.g){n.box(t,e,.03,[0,0,.005],d.glass,[0,0,0],0),n.add(new yi(t/2,14,0,me),d.glass,[0,e/2,.006],[0,0,0],1,0,!0);let s=.06;i.s.box(s,e+.04,.05,[-t/2-s/2+.01,0,.02],d.woodD),i.s.box(s,e+.04,.05,[t/2+s/2-.01,0,.02],d.woodD),i.s.box(t,s,.05,[0,-e/2+.01,.02],d.woodD),i.s.box(s*.7,e+t/2,.045,[0,t/4,.02],d.woodD),i.s.box(t,s*.7,.045,[0,e*.1,.02],d.woodD),i.s.tor(t/2+.03,.03,[0,e/2,.02],d.stoneD,[0,0,0],14),i.s.box(t+.26,.07,.16,[0,-e/2-.04,.07],d.stoneL)}function Ch(i,t,e){i.s.box(t,e,.07,[0,e/2,0],d.woodD),i.s.add(new yi(t/2,14,0,me),d.woodD,[0,e,.036],[0,0,0],1,.05,!0);for(let n=-2;n<=2;n++)i.s.box(.02,e,.02,[n*(t/5),e/2,.045],d.wood);i.s.box(t,.06,.03,[0,e*.3,.05],d.iron),i.s.box(t,.06,.03,[0,e*.75,.05],d.iron),i.s.sph(.045,[t*.3,e*.5,.07],d.brass),i.s.tor(t/2+.05,.05,[0,e,.02],d.stoneD,[0,0,0],14),i.s.box(.1,e,.12,[-t/2-.05,e/2,.03],d.stoneD),i.s.box(.1,e,.12,[t/2+.05,e/2,.03],d.stoneD)}function wf(i){i.s.cyl(.04,.04,.07,[0,.035,0],d.shadow,6),i.s.rod([0,.07,0],[.08,.3,.02],.007,d.white,4)}function Rl(i){i.s.cyl(.03,.03,.3,[0,.03,0],d.cream,6,[0,.3,me/2]),i.s.cyl(.03,.03,.26,[.02,.07,.05],"#efe2c0",6,[0,-.2,me/2]),i.s.box(.3,.01,.22,[0,.005,.14],d.cream,[0,.1,0])}function Tf(i){i.s.box(.3,.4,.3,[0,.2,0],d.woodD),i.s.box(.55,.14,.2,[0,.47,0],d.iron),i.s.cone(.1,.24,[.37,.47,0],d.iron,4,[0,0,-me/2]),i.s.box(.3,.06,.24,[0,.4,0],d.iron)}function Af(i){i.s.box(1.1,.7,.8,[0,.35,0],d.stoneD),i.s.box(.8,.12,.55,[0,.74,.04],"#3d3338"),i.g.box(.7,.05,.46,[0,.78,.04],"#ff9d5c"),i.g.cone(.1,.22,[.1,.9,.04],"#ffb347",6),i.g.cone(.07,.18,[-.15,.88,0],"#ffd980",6),i.s.box(.6,1.9,.45,[0,1.65,-.15],d.stoneD),i.s.box(.7,.1,.55,[0,2.65,-.15],d.stone),i.s.cone(.25,.36,[.7,.4,.1],d.wood,4,[0,me/4,-me/2],[1,1,.6])}function Ph(i){i.s.cyl(.62,.66,.7,[0,.35,0],d.stoneD,14),i.s.tor(.63,.06,[0,.7,0],d.stoneL,[me/2,0,0],14),i.s.cyl(.52,.52,.02,[0,.62,0],"#6fb3c4",14);for(let t of[-1,1])i.s.box(.08,1.4,.08,[t*.62,1.1,0],d.woodD);i.s.cyl(.05,.05,1.3,[0,1.7,0],d.wood,6,[0,0,me/2]),i.s.gable(1.6,1.3,.55,[0,1.8,0],d.roofBlue,me/2),i.s.cyl(.09,.09,.14,[.12,1.12,0],d.woodD,8),i.s.rod([.12,1.65,0],[.12,1.12,0],.01,d.cream,4)}function Rf(i){i.s.cyl(1.2,1.3,.34,[0,.17,0],d.stoneL,20),i.s.cyl(1.04,1.04,.02,[0,.3,0],"#8ad1d4",20),i.s.cyl(.2,.3,.9,[0,.65,0],d.stone,12),i.s.cyl(.62,.3,.14,[0,1.05,0],d.stoneL,16),i.s.cyl(.52,.52,.02,[0,1.11,0],"#8ad1d4",16),i.s.cyl(.07,.1,.4,[0,1.3,0],d.stone,8),i.s.sph(.1,[0,1.52,0],"#bfeaee",[1,1.3,1],8)}function Cf(i){i.s.cyl(.38,.44,.14,[0,.07,0],d.stoneL,14),i.s.cyl(.05,.06,.34,[0,.31,0],"#6fa46f",6);for(let[t,e,n]of[[0,.52,0],[.05,.46,.04],[-.04,.48,-.03]])i.s.sph(.07,[t,e,n],"#e0555f",1,8);i.s.cone(.1,.05,[.12,.28,0],d.leaf,4,[0,0,-1.2],[1,.4,1]),i.s.cone(.1,.05,[-.12,.24,0],d.leaf,4,[0,0,1.2],[1,.4,1])}function Pf(i){let t=new Nn(.4,20,14,0,Math.PI*2,0,Math.PI/2),e=new le(t,i);return e.position.y=.14,e.scale.set(1,1.25,1),e}var Pe=Math.PI,bn=i=>i*sn.floor+.14,ge=(i,t,e)=>[ae.x+i,ae.y+sn.plinth+t,ae.z+sn.lz+e],we=(i,t,e)=>[ae.x+i,ae.y+t,ae.z+e];function co(i,t,e){let n=i.s.build(t.toon);n&&e.add(n);let s=i.g.build(t.glow,!1,!1);s&&e.add(s)}function Yy(i,t,e,n=0,s=.9,r=.52){let o=new Yn(s,r,8,1);o.translate(s/2,0,0);let a=o.getAttribute("position"),l=Float32Array.from(a.array);e.push(h=>{for(let p=0;p<a.count;p++)a.setZ(p,Math.sin(l[p*3]*6-h*3.2+n)*.08*(l[p*3]/s));a.needsUpdate=!0});let c=new le(o,i.cloth(t));return c.castShadow=!0,c}function If(i,t){let e=new se;e.position.set(ae.x,ae.y,ae.z);let n=[],s=new be,{hx:r,hz:o}=ae,a=.9,l=(O,G,j,at)=>{let mt=(O+G)/2;s.s.box(G-O,at,a,[mt,at/2,j],d.stone),s.s.box(G-O,.35,a+.2,[mt,.17,j],d.stoneD),s.s.box(G-O,.2,a+.18,[mt,at-.1,j],d.stoneL);let K=Math.max(1,Math.round((G-O)/.74));for(let Q=0;Q<K;Q++)s.s.box(.4,.36,a*.9,[O+(Q+.5)/K*(G-O),at+.18,j],d.stoneL)},c=(O,G,j,at)=>{let mt=(O+G)/2;s.s.box(a,at,G-O,[j,at/2,mt],d.stone),s.s.box(a+.2,.35,G-O,[j,.17,mt],d.stoneD),s.s.box(a+.18,.2,G-O,[j,at-.1,mt],d.stoneL);let K=Math.max(1,Math.round((G-O)/.74));for(let Q=0;Q<K;Q++)s.s.box(a*.9,.36,.4,[j,at+.18,O+(Q+.5)/K*(G-O)],d.stoneL)};l(-r,r,-o,3.5),c(-o,o,-r,3),c(-o,o,r,3),l(-r,-3.4,o,2.5),l(3.4,r,o,2.5);let h=(O,G,j,at,mt)=>{s.s.rod([O,G,j],[O,G+1.3,j],.035,d.woodD),s.s.sph(.06,[O,G+1.32,j],d.gold,1,6);let K=Yy(i,at,n,mt);K.position.set(O+.02,G+1.05,j),e.add(K)},p=(O,G,j,at,mt,K,Q)=>{s.s.cyl(j*1.12,j*1.2,.5,[O,.25,G],d.stoneD,16),s.s.cyl(j,j*1.08,at,[O,at/2+.25,G],d.stone,16),s.s.cyl(j*1.2,j*1,.36,[O,at+.43,G],d.stoneL,16);let ft=j*2.4;s.s.cone(j*1.38,ft,[O,at+.6+ft/2,G],mt,16),s.s.sph(.13,[O,at+.6+ft+.05,G],d.gold,1,8);for(let Dt of[at*.42,at*.78])for(let Tt=0;Tt<6;Tt++){let Ht=Tt/6*Pe*2+Dt;s.g.box(.17,.52,.07,[O+Math.sin(Ht)*j*1.02,Dt,G+Math.cos(Ht)*j*1.02],"#ffd98a",[0,Ht,0],0)}h(O,at+.6+ft+.1,G,K,Q)},f=(O,G,j,at,mt,K,Q=0)=>{s.s.box(j+.3,.45,j+.3,[O,.22,G],d.stoneD),s.s.box(j,at,j,[O,at/2+.2,G],d.stone),s.s.box(j+.4,.3,j+.4,[O,at+.35,G],d.stoneL);let ft=j*1.15+.4;s.s.hip(j+.8,j+.8,ft,[O,at+.5+ft/2,G],mt);for(let Dt=0;Dt<2;Dt++)s.g.box(.2,.55,.07,[O+(Dt?.38:-.38),at*.62,G+j/2+.02],"#ffd98a",[0,0,0],0),s.g.box(.07,.55,.2,[O+(Dt?j/2+.02:-j/2-.02),at*.62,G],"#ffd98a",[0,0,0],0);K&&h(O,at+.5+ft,G,K,Q)};p(-r,-o,1.75,7.2,d.roofBlue,d.red,0),p(r,-o,1.75,6.3,d.roofRed,d.teal,1.3),p(-r,o,1.5,4.9,d.roofRose,d.gold,2.1),p(r,o,1.5,5.3,d.roofBlue,d.lilac,3.4),f(-r,.5,1.5,3.8,d.roofBlueD),f(r,.5,1.5,3.8,d.roofBlueD),f(-2.3,o,2.2,4.6,d.roofRed,d.red,.7),f(2.3,o,2.2,4.6,d.roofRed,d.gold,1.9),s.s.box(2.6,1.7,1.3,[0,3.45,o],d.stone),s.s.box(2.9,.22,1.5,[0,4.4,o],d.stoneL);for(let O=0;O<4;O++)s.s.box(.4,.36,1.2,[-1.05+O*.7,4.7,o],d.stoneL);s.s.box(2.6,.2,1.4,[0,2.55,o],d.gold),Tl(s.at(0,3.45,o+.68),d.red,d.cream);for(let O=-3;O<=3;O++)s.s.rod([O*.32,1.1,o+.1],[O*.32,2.45,o+.1],.03,d.iron);for(let O of[1.3,1.8,2.3])s.s.rod([-1.1,O,o+.1],[1.1,O,o+.1],.03,d.iron);s.s.box(2.4,.12,3.3,[0,-.06,o+2.2],d.woodL);for(let O=0;O<8;O++)s.s.box(2.4,.02,.05,[0,.01,o+.9+O*.4],d.woodD,[0,0,0],0);for(let O of[-1,1]){s.s.rod([O*1.1,2.4,o+.6],[O*1.1,0,o+3.7],.025,d.iron),s.s.rod([O*1.2,.5,o+1],[O*1.2,.5,o+3.7],.035,d.woodD);for(let G=0;G<4;G++)s.s.cyl(.05,.05,.5,[O*1.2,.25,o+1.1+G*.85],d.woodD,6);s.s.box(.6,.9,.6,[O*1.4,.2,o+4],d.stoneD)}let u=s.at(0,sn.plinth,sn.lz),x=sn.w,b=sn.d,g=sn.floor,m=x/2,w=b/2,M=-w+.35,_=w-.08;s.s.box(x+.8,sn.plinth+.02,b+.8,[0,sn.plinth/2,sn.lz],d.stoneD);let S=(O,G,j,at,mt)=>u.s.box(j-G,.14,mt-at,[(G+j)/2,O*g+.07,(at+mt)/2],O===0?d.stoneL:d.woodL);S(0,-m+.3,m-.3,M,_),S(1,-m+.3,3.9,M,_),S(1,3.9,m-.3,M,-.5),S(2,-3.9,m-.3,M,_),S(2,-m+.3,-3.9,M,-.5),u.s.box(x-.6,.2,b-.2,[0,3*g+.1,0],d.woodD);let E=3*g+.3;u.s.box(x,E,.35,[0,E/2,-w+.175],d.stone);for(let O of[-1,1])u.s.box(.35,E,b,[O*(m-.175),E/2,0],d.stone),u.s.box(.55,E+.1,.55,[O*(m-.2),E/2,w-.25],d.stoneL);for(let O=1;O<=3;O++)u.s.box(x+.3,.22,.3,[0,O*g+.02,w+.02],d.stoneL);for(let O=1;O<=2;O++){let G=bn(O);u.s.box(x-.9,.07,.1,[0,G+.55,w-.1],d.woodD);for(let j=-m+.8;j<m-.6;j+=.45)u.s.cyl(.035,.035,.5,[j,G+.28,w-.1],d.woodL,6,[0,0,0],1,0)}for(let O=-m+.8;O<m-.6;O+=.45)u.s.cyl(.03,.03,.4,[O,.34,w+.18],d.stoneL,6,[0,0,0],1,0);let C=(O,G,j,at,mt)=>{let Q=O*g+.14;for(let ft=0;ft<10;ft++){let Dt=(ft+1)*(g-0)/10;u.s.box(j-G,Dt,Math.abs(mt-at)/10,[(G+j)/2,Q+Dt/2,at+(mt-at)*(ft+.5)/10],d.stoneD,[0,0,0],.03)}u.s.rod([G-.03,Q+.9,at],[G-.03,Q+g+.9,mt],.03,d.woodD)};C(0,4,4.8,3,-.3),C(1,-4.8,-4,3,-.3);let y=(O,G)=>{let j=O*g+.14,at=g-.14,mt=M;u.s.box(.22,at,-.55-mt,[G,j+at/2,(mt-.55)/2],d.stone),u.s.box(.22,at,_-.55,[G,j+at/2,(_+.55)/2],d.stone),u.s.box(.22,at-1.55,1.1,[G,j+1.55+(at-1.55)/2,0],d.stone),u.s.box(.3,.1,1.2,[G,j+1.55,0],d.gold,[0,0,0],0)};y(0,-1.8),y(1,1.8),y(2,-1.8);let A=[-1.2,1.4];for(let O=0;O<3;O++){let G=bn(O);for(let j of O===0?[-2.9,1]:O===1?[.5,3]:[-2.8,.8])Js(u.at(0,0,0).at(j,G+.9+sn.plinth,M+sn.lz+.01),.7,1.1);for(let j of A)Js(u.at(-m+.36,G+.9,j,Pe/2),.7,1.1),Js(u.at(m-.36,G+.9,j,-Pe/2),.7,1.1)}let R=bn(0);mf(u.at(-4.3,R,-2.45)),pf(u.at(-3,R,-2.45)),Ni(u.at(-3.3,R,.3),1.6,.8),lo(u.at(-3.6,R+.52,.3)),Al(u.at(-3,R+.52,.45)),Ef(u.at(-3.3,R+.52,.1)),Zs(u.at(-4.55,R,1.2)),Zs(u.at(-4.5,R,1.85),.25,.5),ro(u.at(-4.35,R,2.5)),ro(u.at(-3.7,R,2.6,.6)),uf(u.at(-2.4,R,2.4)),oo(u.at(-1.65,R+1.3,1.6,Pe/2)),oo(u.at(-1.95,R+1.3,-2,-Pe/2)),u.s.box(2.3,.22,1.7,[3.2,R+.11,-1.95],d.stoneD),cf(u.at(3.2,R+.22,-2.3)),u.s.box(1,.02,4.3,[3.2,R+.01,.9],d.red,[0,0,0],0),u.s.box(1.1,.02,.1,[3.2,R+.02,3],d.gold,[0,0,0],0),Ni(u.at(.7,R,.8),2.8,.9);for(let[O,G,j]of[[-.3,.8,.3],[.6,.65,0],[1.6,.9,-.2]])Sf(u.at(O,R+.52,G,j));Rh(u.at(1.2,R+.52,.8)),Rh(u.at(-.6,R+.52,.95)),lo(u.at(.2,R+.52,1)),Al(u.at(1.9,R+.52,.7));for(let O of[-.4,.8,1.9])so(u.at(O,R,1.55,Pe),d.teal),so(u.at(O,R,.05,0),d.red);df(u.at(-.6,R,-2.62)),ff(u.at(1.4,R+1.3,-2.82),.8,1.4,d.teal),Ui(u.at(2.2,R+1.45,-2.82),.5,1.2,d.red),Ui(u.at(4.2,R+1.45,-2.82),.5,1.2,d.red),ao(u.at(1.6,R+2,.6)),bh(u.at(-.3,R+.01,-.9),.7,d.lilac,d.cream);let I=bn(1);for(let[O,G]of[[-4,1],[-2.6,2],[-1.2,3]])hf(u.at(O,I,-2.68),1.25,1.95,G);Ni(u.at(-3.3,I,.4),1.3,.8),Sh(u.at(-3.7,I+.52,.4)),_f(u.at(-3,I+.52,.45)),wf(u.at(-2.7,I+.52,.3)),Rl(u.at(-3.3,I+.52,.65)),so(u.at(-3.3,I,1.2,Pe),d.lilac),lf(u.at(-.7,I,1,.4),d.teal),xf(u.at(.8,I,-2.7)),Ah(u.at(-4.5,I,2.4),1.1),ao(u.at(-2.2,I+2,.6)),Ni(u.at(3.4,I,.3),1.5,1),Rl(u.at(3.2,I+.52,.2)),Ks(u.at(3.8,I+.52,.4));for(let[O,G,j]of[[2.7,.3,Pe/2],[4.1,.3,-Pe/2],[3.4,1.1,Pe]])so(u.at(O,I,G,j),d.red);wl(u.at(4.4,I,-2.5)),gf(u.at(2.6,I,-2.45)),Tl(u.at(3.4,I+1.55,-2.82),d.red,d.cream),Tl(u.at(3,I+1.2,-2.82),d.teal,d.cream),Th(u.at(4.35,I,1.9,-Pe/2)),oo(u.at(1.7,I+1.3,1.6,-Pe/2));let L=bn(2);vh(u.at(-3.7,L,-1.9,0),d.mint,d.pink),bf(u.at(-2.4,L,-2.5)),Ks(u.at(-2.4,L+.5,-2.5)),u.s.cyl(.3,.38,.7,[-3.2,L+.35,1.4],d.stoneL,12),Cf(u.at(-3.2,L+.7,1.4));let U=Pf(t);U.position.set(...ge(-3.2,L+.7,1.4)),U.position.x-=ae.x,U.position.y-=ae.y,U.position.z-=ae.z,e.add(U),Eh(u.at(-4.4,L,1.9,.9)),Sh(u.at(-2.3,L,1.9)),Ui(u.at(-4.55,L+1.4,-.9,Pe/2),.5,1.1,d.lilac),vh(u.at(3.5,L,-2,0),d.pink,d.red),vf(u.at(0,L,-2.55)),Mf(u.at(1.5,L,-2.65)),Th(u.at(4.35,L,1.8,-Pe/2)),bh(u.at(2,L+.01,.7),1,d.pink,d.cream),ao(u.at(2,L+2,.8)),Ah(u.at(-.9,L,2.4),1);let D=3*g+.2;u.s.box(3.5,.16,b-.2,[-3.25,3*g+.28,0],d.woodL),u.s.box(3.5,1.9,.3,[-3.25,D+.95,-w+.15],d.stone),u.s.box(.3,1.9,b-.2,[-m+.15,D+.95,0],d.stone);for(let[O,G]of[[-1.5,w-.3],[-m+.3,w-.3],[-1.5,-w+.3]])u.s.cyl(.15,.17,2.1,[O,D+1,G],d.stoneL,8);u.s.hip(4.4,4.4+2,2.2,[-3.25,D+1.9+1.1,0],d.roofBlue),u.s.sph(.15,[-3.25,D+4.15,0],d.gold,1,8),Eh(u.at(-3,D+.08,1.3,.2)),yf(u.at(-4.2,D+.08,-1.6)),wh(u.at(-3.25,D+1.7,0)),Ni(u.at(-2.3,D+.08,-1.7),.8,.6),Rl(u.at(-2.3,D+.6,-1.7)),ao(u.at(-3.2,D+1.9,0));let B=m-1.7+.5;u.s.gable(b+1,B+.6,2.3,[(1.7+m+.3)/2-.1,3*g+.3,0],d.roofBlue,Pe/2),u.s.box(B+.5,.1,.18,[(1.7+m+.3)/2-.1,3*g+2.62,0],d.roofBlueD),u.s.box(.4,1.3,.4,[3.9,3*g+2.4,-1],d.stoneD),u.s.box(.55,.14,.55,[3.9,3*g+3.1,-1],d.stoneL);for(let O of[.2,3])u.s.box(.8,.7,.7,[O+.6,3*g+1,w+.3],d.stone,[0,0,0],.03);Ui(u.at(0,3*g-.5,w+.25),.7,1.4,d.red),Ui(u.at(-4,3*g-.5,w+.25),.7,1.4,d.teal);let Y=s.at(-7.4,0,3.2);Y.s.box(3.6,.15,4.8,[0,.07,0],d.stoneL),Y.s.box(.3,3,4.8,[-1.65,1.5,0],d.stone),Y.s.box(3.6,3,.3,[0,1.5,-2.25],d.stone),Y.s.box(3.6,3,.3,[0,1.5,2.25],d.stone);for(let O of[-2.1,2.1])Y.s.cyl(.17,.2,3.2,[1.7,1.6,O],d.stoneL,8);Y.s.gable(5.4,4,1.9,[0,3,0],d.roofRose,0);let J=[d.red,d.teal,d.gold,d.lilac,d.pink,d.mint];Y.s.box(1.3,1.8,.1,[-1.48,1.7,0],d.woodD,[0,0,0],0);for(let O=0;O<3;O++)for(let G=0;G<4;G++)Y.g.box(.35,.38,.08,[-1.42,1.1+G*.42,-.45+O*.45],J[(O*4+G)%J.length],[0,0,0],0);Y.s.box(.7,.8,1.7,[-1.2,.55,0],d.stoneL),Y.s.box(.74,.06,1.74,[-1.2,.97,0],d.cream),Y.s.box(.06,.5,.06,[-1.2,1.25,0],d.gold),Y.s.box(.3,.06,.06,[-1.2,1.35,0],d.gold),Ks(Y.at(-1.2,1,-.6)),Ks(Y.at(-1.2,1,.6));for(let O of[-.2,.7])for(let G of[-.9,.9])yh(Y.at(O,.15,G,Pe/2),1.2);Y.s.box(.9,.02,3,[.3,.16,0],d.red,[0,0,0],0),Y.s.box(1.1,1.8,1.1,[.6,3+1.2,0],d.stone),Y.s.hip(1.5,1.5,1.4,[.6,3+2.1+.7+.3,0],d.roofBlue),wh(Y.at(.6,5.3,0));for(let[O,G]of[[.6,.57],[.6,-.57]])Y.g.box(.35,.8,.05,[O,5,G],"#ffd98a",[0,0,0],0);let tt=s.at(7.9,0,3);tt.s.box(2.6,.12,4,[0,.06,0],d.dirt),tt.s.box(.25,2.4,4,[1.2,1.2,0],d.woodD),tt.s.box(2.6,2.4,.2,[0,1.2,-2],d.wood),tt.s.box(2.6,.9,.12,[0,.45,2],d.wood),tt.s.box(3,.14,4.4,[0,2.5,0],d.roofRed,[0,0,.12]);for(let O of[-1.9,1.9])tt.s.cyl(.08,.08,2.4,[-1.25,1.2,O],d.woodD,6);for(let[O,G]of[[.6,-1.4],[.8,1.2],[.2,0]])tt.s.box(.7,.4,.5,[O,.3,G],d.sand,[0,.3,0]);tt.s.box(.5,.25,1.1,[-.9,.22,.8],d.woodD),Zs(tt.at(-1,0,-1.4),.22,.45);let it=s.at(7.7,0,-4.6);it.s.box(3.2,.1,3.4,[0,.05,0],d.stoneD),it.s.box(3.4,.14,3.7,[0,2.45,0],d.roofRed,[0,0,-.1]);for(let[O,G]of[[-1.5,1.6],[-1.5,-1.6],[1.5,1.6]])it.s.cyl(.09,.09,2.4,[O,1.2,G],d.woodD,6);Af(it.at(1.2,.1,-1.1)),Tf(it.at(-.2,.1,.1)),Zs(it.at(-1.2,.1,-1.2),.25,.5),wl(it.at(-1.3,.1,1.2,Pe/2));for(let[O,G,j]of[[-3.8,6,d.red],[-6,6.3,d.teal]]){let at=s.at(O,0,G,.15);Ni(at.at(0,0,0),1.6,.7,.6);for(let mt of[-.85,.85])at.s.cyl(.05,.05,1.6,[mt,.8,-.3],d.woodD,6);for(let mt=0;mt<8;mt++)at.s.box(.22,.04,1.1,[-.77+mt*.22,1.55-0,-.1],mt%2?d.cream:j,[.5,0,0],0);for(let mt=0;mt<6;mt++)Al(at.at(-.6+mt*.24,.6,0+mt%2*.12),mt%2?d.red:d.gold)}Mh(s.at(4,0,6,.3)),Mh(s.at(5.6,0,5.4,-.2)),wl(s.at(6.8,0,6.6,-.4)),s.s.cyl(.55,.55,.12,[3,.6,7.4],d.sand,14,[Pe/2,0,0]),s.s.tor(.4,.05,[3,.6,7.33],d.red,[0,0,0],16),s.s.tor(.22,.05,[3,.6,7.32],d.cream,[0,0,0],14),s.s.rod([3,0,7.42],[3,.6,7.42],.04,d.woodD),Rf(s.at(0,0,4.4)),Ph(s.at(-3.2,0,2.4));for(let O of[-4.4,-2.8,2.6,4.2]){s.s.box(1.2,.2,.5,[O,.1,.55],d.stoneD);for(let G=0;G<6;G++){let j=[d.pink,d.gold,d.lilac,d.red,d.cream,d.blossom][(G+Math.round(O*3))%6];s.s.cyl(.02,.02,.28,[O-.5+G*.2,.32,.55],d.leafD,4,[0,0,0],1,0),s.s.sph(.07,[O-.5+G*.2,.5,.55],j,1,6)}}for(let[O,G]of[[-8.6,6.9],[8.6,7],[-1,-.9]])G<0||(s.s.cyl(.14,.2,1.3,[O,.65,G],d.woodD,7),s.s.sph(.9,[O,1.9,G],d.leaf,1,9),s.s.sph(.65,[O+.5,1.6,G+.2],d.leafL,1,8),s.s.sph(.6,[O-.45,1.7,G-.2],d.leafD,1,8));for(let[O,G]of[[-1.8,7],[1.8,7],[-5.2,.8],[5.2,.8]])s.s.cyl(.05,.07,1.5,[O,.75,G],d.iron,6),s.s.box(.26,.3,.26,[O,1.65,G],d.iron),s.g.box(.18,.22,.18,[O,1.65,G],"#ffd98a",[0,0,0],0),s.s.cone(.22,.2,[O,1.9,G],d.iron,4);for(let[O,G,j]of[[-r+.8,-2,Pe/2],[r-.8,-2,-Pe/2],[-6,-o+.8,0],[6,-o+.8,0]])oo(s.at(O,1.4,G,j));return Ui(s.at(-6.3,2.2,-o+.5),.6,1.3,d.red),Ui(s.at(6.3,2.2,-o+.5),.6,1.3,d.teal),co(s,i,e),{group:e,anims:n}}function Zy(i,t,e,n,s,r,o,a,l,c=0){let h=Jt(t,e),p=i.at(t,h,e,n);p.s.box(s+.25,.8,r+.25,[0,-.1,0],d.stoneD),p.s.box(s,o,r,[0,o/2+.3,0],a);for(let x of[-1,1])for(let b of[-1,1])p.s.box(.13,o,.13,[x*s/2,o/2+.3,b*r/2],d.woodD,[0,0,0],.02);p.s.box(s+.02,.1,r+.02,[0,o*.55+.3,0],d.woodD,[0,0,0],.02),p.s.beam([-s/2,.3,r/2+.01],[-s*.1,o*.55+.3,r/2+.01],.08,.06,d.woodD),p.s.beam([s/2,.3,r/2+.01],[s*.1,o*.55+.3,r/2+.01],.08,.06,d.woodD);let f=Math.max(.9,r*.62);p.s.gable(r+.7,s+.7,f,[0,o+.3,0],l,Pe/2),p.s.box(s+.8,.08,.14,[0,o+.3+f,0],d.woodD),p.s.box(.34,1,.34,[s/4,o+f*.8,-r/4],d.stoneD),p.s.box(.46,.1,.46,[s/4,o+f*.8+.55,-r/4],d.stoneL),Ch(p.at(s*.18,.3,r/2+.03),.5,.85),Js(p.at(-s*.25,o*.4+.45,r/2+.03),.38,.5),Js(p.at(s/2+.03,o*.4+.45,0,Pe/2),.38,.5),c===1&&(p.s.rod([s/2+.05,o*.7,r/2+.2],[s/2+.7,o*.7,r/2+.2],.03,d.iron),p.s.box(.5,.35,.05,[s/2+.55,o*.55,r/2+.2],d.wood),Zs(p.at(-s/2-.3,.3,r/2+.2),.2,.4)),c===2&&(p.s.box(s*.7,.05,.6,[0,.35,r/2+.4],d.woodL),lo(p.at(-.2,.62,r/2+.4)),lo(p.at(.25,.62,r/2+.4))),((x,b,g)=>{for(let m=0;m<=g/.45;m++)p.s.box(.06,.4,.06,[x+m*.45,.2,b],d.woodL,[0,0,0],0);p.s.box(g,.05,.04,[x+g/2,.3,b],d.woodL,[0,0,0],0)})(-s/2-.4,r/2+1.1,s+.8)}function Lf(i){let t=new se,e=[],n=new be,{x:s,z:r}=ke,o=[[-4.6,-2.4,.5,2,1.6,1.3,"#f3e3cc",d.roofRed,0],[-.6,-4.6,.1,2.2,1.7,1.4,"#e7efe0",d.roofBlue,2],[4,-2.2,-.5,1.8,1.5,1.2,"#f6dfd2",d.roofRose,0],[-5,2.9,.9,2.2,1.7,1.3,"#eadfca",d.roofBlue,0],[4.9,2.9,-.9,2,1.6,1.3,"#f3e3cc",d.roofRed,0],[.4,5.2,3.1,3,2,1.8,"#f0dcc2",d.roofBlueD,1]];for(let _ of o)Zy(n,s+_[0],r+_[1],_[2],_[3],_[4],_[5],_[6],_[7],_[8]);Ph(n.at(s,Jt(s,r),r));for(let[_,S,E]of[[-2.2,2.4,.4],[2.4,2,-.3]])yh(n.at(s+_,Jt(s+_,r+S),r+S,E),1.2);for(let[_,S]of[[-2,-1.2],[2,-1],[-.6,3]]){let E=Jt(s+_,r+S);n.s.cyl(.05,.07,1.5,[s+_,E+.75,r+S],d.iron,6),n.s.box(.26,.3,.26,[s+_,E+1.65,r+S],d.iron),n.g.box(.18,.22,.18,[s+_,E+1.65,r+S],"#ffd98a",[0,0,0],0)}let a=Jt(Ye.x,Ye.z),l=n.at(Ye.x,a,Ye.z,.2);l.s.cyl(1.2,1.8,5.2,[0,2.6,0],"#f1e7d4",14),l.s.cyl(1.9,2,.4,[0,.2,0],d.stoneD,14),l.s.cone(1.5,1.6,[0,6,0],d.roofRed,14),l.s.sph(.15,[0,6.9,0],d.gold,1,8),Ch(l.at(0,.3,1.78),.7,1.1);for(let[_,S]of[[2.6,1.55],[4,1.35]])l.g.box(.32,.5,.06,[0,_,S+.02],"#ffd98a",[0,0,0],0);l.s.cyl(.18,.18,.9,[0,5,1.5],d.woodD,8,[Pe/2,0,0]),ro(l.at(1.6,0,1.7)),ro(l.at(2,0,1.2,.7)),co(n,i,t);let c=new be;for(let _=0;_<4;_++){let S=_*Pe/2,E=Math.sin(S),C=Math.cos(S);c.s.beam([0,0,0],[E*3.6,C*3.6,0],.12,.12,d.woodD);for(let y=1;y<=5;y++){let A=.8+y*.55;c.s.box(.55,.05,.06,[E*A+C*.28,C*A-E*.28,.04],d.woodL,[0,0,-S],0)}c.s.box(.55,2.6,.04,[E*2.3-C*.32,C*2.3+E*.32,.03],d.cream,[0,0,-S],0)}c.s.sph(.24,[0,0,.1],d.gold,1,8);let h=c.s.build(i.toon);if(h){let _=new se,S=new N(0,5,1.62).applyAxisAngle(new N(0,1,0),.2);_.position.set(Ye.x+S.x,a+S.y,Ye.z+S.z),_.rotation.y=.2,_.add(h),t.add(_),e.push(E=>{h.rotation.z=-E*.55})}let p=new be,f=Ut.x+Ut.w/2+3.4,u=Ut.z,x=Jt(f,u),b=p.at(f,x,u,-.35);b.s.box(4.2,2.2,3.2,[0,1.2,0],"#d98f74"),b.s.box(4.3,.12,3.3,[0,.12,0],d.stoneD),b.s.gable(3.8,4.8,1.6,[0,2.3,0],d.roofBlueD,Pe/2),b.s.box(1.2,1.7,.08,[0,1,1.62],d.cream),b.s.beam([-.6,.2,1.64],[.6,1.85,1.64],.1,.05,d.red),b.s.beam([.6,.2,1.64],[-.6,1.85,1.64],.1,.05,d.red),b.g.box(.4,.4,.06,[0,3,1.62],"#ffd98a",[0,0,0],0);let g=oi(21);for(let _=0;_<16;_++){let S=Ut.z-Ut.d/2+.5+_/15*(Ut.d-1);for(let E=0;E<30;E++){let C=Ut.x-Ut.w/2+.6+E/29*(Ut.w-1.2)+(g()-.5)*.14,y=Jt(C,S),A=.8+g()*.45;p.s.cyl(.012,.018,.55*A,[C,y+.27*A,S],d.leafL,4,[0,0,0],1,.04),p.s.cone(.05,.26*A,[C,y+.62*A,S],d.gold,5,[0,0,(g()-.5)*.25],1,.06)}}let m=Ut.x+2,w=Ut.z-.5,M=Jt(m,w);p.s.cyl(.05,.05,1.7,[m,M+.85,w],d.woodD,6),p.s.beam([m-.7,M+1.3,w],[m+.7,M+1.3,w],.08,.08,d.woodD),p.s.box(.4,.55,.22,[m,M+1.1,w],d.teal),p.s.sph(.2,[m,M+1.62,w],d.sand,1,8),p.s.cone(.34,.1,[m,M+1.78,w],d.sand,12),p.s.cyl(.17,.17,.3,[m,M+1.9,w],d.wood,10);for(let[_,S]of[[Ut.x+Ut.w/2+.8,Ut.z+3.4],[Ut.x-Ut.w/2-1.2,Ut.z-2.2]]){let E=Jt(_,S);p.s.cyl(.7,.8,.9,[_,E+.45,S],d.sand,10),p.s.cone(.82,.8,[_,E+1.3,S],d.gold,10)}for(let _=0;_<=30;_++){let S=Ut.x-Ut.w/2-.4+_/30*(Ut.w+.8);p.s.box(.06,.45,.06,[S,Jt(S,Ut.z+Ut.d/2+.5)+.22,Ut.z+Ut.d/2+.5],d.woodL,[0,0,0],0)}return co(p,i,t),{group:t,anims:e}}var hn=Math.PI,Cl=(i,t,e=2.4)=>Ml(i,t,e)&&Jt(i,t)>.05&&io(i,t)>1.3&&ji(i,t)>3.4,Ih=(i,t)=>Cl(i,t)&&Xs(i,t)>1.3&&Math.hypot(i-ke.x,t-ke.z)>8.5&&Math.hypot(i-Ye.x,t-Ye.z)>5&&Math.hypot(i-Be.x,t-Be.z)>4&&!(Math.abs(i-Ut.x)<Ut.w/2+4.5&&Math.abs(t-Ut.z)<Ut.d/2+3.5);function Lh(i,t,e,n,s){i.s.cyl(.08*s,.13*s,.8*s,[t,e+.4*s,n],d.woodD,6);for(let r=0;r<4;r++)i.s.cone((.95-r*.2)*s,1.15*s,[t,e+(1+r*.62)*s,n],r%2?d.pine:d.pineD,8);i.s.cone(.22*s,.5*s,[t,e+3.45*s,n],d.pine,6)}function Df(i,t,e,n,s,r=0){i.s.cyl(.1*s,.17*s,1.3*s,[t,e+.65*s,n],d.woodD,7);let o=[d.leaf,d.leafL,d.leafD];i.s.sph(.95*s,[t,e+1.9*s,n],o[r%3],1,9),i.s.sph(.65*s,[t+.55*s,e+1.55*s,n+.2*s],o[(1+r)%3],1,8),i.s.sph(.7*s,[t-.5*s,e+1.65*s,n-.2*s],o[(2+r)%3],1,8),i.s.sph(.55*s,[t+.1*s,e+2.5*s,n-.1*s],o[(1+r)%3],1,8)}function Ky(i,t,e,n,s,r){if(i.s.cyl(.1*s,.16*s,1.1*s,[t,e+.55*s,n],d.woodD,7),i.s.sph(.9*s,[t,e+1.7*s,n],d.blossom,1,9),i.s.sph(.6*s,[t+.6*s,e+1.45*s,n+.1*s],d.pink,1,8),i.s.sph(.6*s,[t-.55*s,e+1.5*s,n-.1*s],"#f6cdd6",1,8),i.s.sph(.5*s,[t,e+2.3*s,n],d.pink,1,8),r)for(let o=0;o<4;o++)i.s.sph(.07,[t+Math.sin(o*2)*.8*s,e+.9*s,n+Math.cos(o*2)*.8*s],d.red,1,6)}function Jy(i,t,e,n,s,r){let o=[d.rock,d.rockD,"#c4b8a8"][Math.floor(r()*3)];i.s.sph(.6*s,[t,e+.2*s,n],o,[1.1,.7,.95],7),i.s.sph(.35*s,[t+.5*s,e+.1*s,n+.2*s],d.rockD,[1,.7,1],6)}function Nf(i){let t=new se,e=[],n=new be,s=oi(2024),r=(M,_,S,E,C)=>{let y=[],A=0;for(;y.length<E&&A++<E*30;){let R=s()*hn*2,I=Math.sqrt(s())*S,L=M+Math.cos(R)*I,U=_+Math.sin(R)*I;if(!Ih(L,U)||y.some(([k,W])=>Math.hypot(k-L,W-U)<1.7))continue;y.push([L,U]);let D=Jt(L,U),B=.8+s()*.7;s()<C?Lh(n,L,D,U,B):Df(n,L,D,U,B,Math.floor(s()*3))}};r(ks.x,ks.z,ks.r,56,.55),r(Ws.x,Ws.z,Ws.r,46,.3);for(let M=0;M<9;M++){let _=M/9*hn*2,S=M===0?0:Hn.r*(.55+M%2*.35),E=Hn.x+Math.cos(_)*S,C=Hn.z+Math.sin(_)*S;Cl(E,C,2.5)&&Xs(E,C)>1&&Ky(n,E,Jt(E,C),C,.9+s()*.25,M%2===0)}for(let M=0;M<26;M++){let _=s()*hn*2,S=12+s()*26,E=Math.cos(_)*S,C=Math.sin(_)*S;Ih(E,C)&&(s()<.5?Df(n,E,Jt(E,C),C,.8+s()*.5,Math.floor(s()*3)):Lh(n,E,Jt(E,C),C,.7+s()*.5))}for(let M=0;M<22;M++){let _=s()*hn*2,S=jt.r*(.45+s()*.75),E=jt.x+Math.cos(_)*S,C=jt.z+Math.sin(_)*S;!Cl(E,C,2.5)||Math.hypot(E-Be.x,C-Be.z)<3.5||Lh(n,E,Jt(E,C)-.1,C,.55+s()*.5)}for(let M=0;M<26;M++){let _=s()*hn*2,S=Math.sqrt(s())*jt.r*.8,E=jt.x+Math.cos(_)*S,C=jt.z+Math.sin(_)*S,y=Jt(E,C);y>jt.h*.62&&n.s.sph(.5+s()*.7,[E,y+.02,C],d.snow,[1,.28,1],8,.02)}for(let M=0;M<24;M++){let _=s()*hn*2,S=8+s()*30,E=Math.cos(_)*S,C=Math.sin(_)*S;!Cl(E,C,1.8)||Xs(E,C)<1||Jy(n,E,Jt(E,C)-.05,C,.5+s()*.7,s)}let o=Math.atan2(Be.x-jt.x,Be.z-jt.z),a=n.at(Be.x,Jt(Be.x,Be.z)-.15,Be.z,o);a.s.tor(1.25,.42,[0,.95,0],d.rock,[0,0,0],14),a.s.cyl(1.2,1.2,.08,[0,.95,-.1],"#2f3452",18,[hn/2,0,0],1,0);for(let[M,_,S,E]of[[-1.5,.3,.3,.9],[1.5,.3,.3,.8],[-1,1.9,0,.7],[1,1.9,0,.7]])a.s.sph(.55*E,[M,_,S],d.rockD,[1,.8,1],7);a.s.cyl(.04,.05,1.2,[1.9,.6,1.2],d.iron,6),a.s.box(.22,.26,.22,[1.9,1.3,1.2],d.iron),a.g.box(.15,.18,.15,[1.9,1.3,1.2],"#ffd98a",[0,0,0],0);let l=Be.x+Math.sin(o+.8)*4.2,c=Be.z+Math.cos(o+.8)*4.2,h=Jt(l,c);n.s.cyl(.05,.06,1.1,[l,h+.55,c],d.woodD,6),n.s.box(.7,.28,.06,[l,h+1,c],d.woodL,[0,o+.8,.08]),n.s.box(.6,.24,.06,[l,h+.7,c],d.woodL,[0,o+1.2,-.08]);let p=Xt.x-Xt.rx-.6;for(let M=0;M<9;M++)n.s.box(.34,.07,1,[p+M*.38,Xt.y+.38,Xt.z-1.2],d.woodL,[0,0,0],.04);for(let M=0;M<4;M++)for(let _ of[-1,1])n.s.cyl(.06,.06,1,[p+.3+M*1,Xt.y-.1,Xt.z-1.2+_*.45],d.woodD,6);let f=n.at(Xt.x-1.6,Xt.y+.05,Xt.z+.4,.9);f.s.box(.75,.24,1.6,[0,.12,0],d.wood),f.s.cone(.38,.55,[0,.12,1.02],d.wood,4,[hn/2,hn/4,0],[1,1,.6]),f.s.cone(.38,.55,[0,.12,-1.02],d.wood,4,[-hn/2,hn/4,0],[1,1,.6]),f.s.box(.7,.05,.3,[0,.3,-.3],d.woodL),f.s.box(.76,.06,1.62,[0,.25,0],d.roofRed,[0,0,0],0);for(let M=0;M<16;M++){let _=M/16*hn*2+s()*.3,S=Xt.x+Math.cos(_)*Xt.rx*1.02,E=Xt.z+Math.sin(_)*Xt.rz*1.02;if(!Ml(S,E,2)||ji(S,E)<3)continue;let C=Math.max(Jt(S,E),Xt.y);for(let y=0;y<5;y++){let A=S+(s()-.5)*.5,R=E+(s()-.5)*.5,I=.8+s()*.7;n.s.cyl(.012,.018,I,[A,C+I/2,R],d.leafL,4,[0,0,(s()-.5)*.2],1,0),y%2===0&&n.s.cyl(.035,.035,.2,[A,C+I+.05,R],d.woodD,5,[0,0,0],1,0)}}for(let M=0;M<10;M++){let _=s()*hn*2,S=Math.sqrt(s())*.75,E=Xt.x+Math.cos(_)*Xt.rx*S,C=Xt.z+Math.sin(_)*Xt.rz*S;n.s.cyl(.26,.26,.02,[E,Xt.y+.03,C],d.leafD,9,[0,0,0],1,.03),M%2===0&&n.s.sph(.08,[E+.05,Xt.y+.1,C],d.pink,[1,.7,1],6,0)}for(let M=0;M<190;M++){let _=s()*hn*2,S=Math.sqrt(s())*cn.r,E=cn.x+Math.cos(_)*S,C=cn.z+Math.sin(_)*S;if(!Ml(E,C,2.2)||Jt(E,C)<.05)continue;let y=Jt(E,C),A=[d.pink,d.gold,d.white,d.lilac,d.red][M%5];n.s.cyl(.012,.012,.3,[E,y+.15,C],d.leafD,4,[0,0,0],1,0),n.s.sph(.06,[E,y+.32,C],A,[1,.7,1],6)}let u=cn.x+2.8,x=cn.z-1.2,b=Jt(u,x),g=n.at(u,b,x,.4);g.s.box(1.7,.03,1.3,[0,.03,0],d.red,[0,0,0],0);for(let M=0;M<4;M++)for(let _=0;_<3;_++)(M+_)%2===0&&g.s.box(.42,.035,.43,[(M-1.5)*.42,.05,(_-1)*.43],d.cream,[0,0,0],0);g.s.cyl(.18,.15,.14,[.2,.12,0],d.woodL,8),g.s.sph(.06,[-.3,.1,.2],d.red,1,6);let m=0,w=0;for(;m<420&&w++<4e3;){let M=s()*hn*2,_=Math.sqrt(s())*40,S=Math.cos(M)*_,E=Math.sin(M)*_;if(!Ih(S,E)||Jt(S,E)>jt.h*.55+2)continue;let C=Jt(S,E),y=[d.leaf,d.leafL,d.leafD][m%3];for(let A=0;A<3;A++)n.s.cone(.05,.3+s()*.15,[S+(A-1)*.06,C+.15,E+(s()-.5)*.06],y,4,[(s()-.5)*.4,0,(s()-.5)*.4],1,.05);if(m%3===0){let A=[d.pink,d.gold,d.white,d.lilac][m%4];n.s.cyl(.01,.01,.22,[S+.12,C+.11,E],d.leafD,4,[0,0,0],1,0),n.s.sph(.05,[S+.12,C+.24,E],A,[1,.7,1],6)}m++}return co(n,i,t),{group:t,anims:e}}var Qi=Math.PI;function Uf(i){let t=new se,e=[],n=oi(7);for(let y=0;y<16;y++){let A=new be,R=4+Math.floor(n()*3),I=3+n()*4;for(let W=0;W<R;W++)A.s.sph(I*(.5+n()*.45),[(W-R/2)*I*.75,n()*I*.3,(n()-.5)*I*.6],"#ffffff",[1.2,.7,1],9,0);let L=A.s.build(i.cloud,!1,!1);if(!L)continue;let U=new se,D=n()*Qi*2,B=62+n()*70;L.position.set(Math.cos(D)*B,-10+n()*48,Math.sin(D)*B),L.rotation.y=-D,U.add(L),t.add(U);let k=(.004+n()*.006)*(y%2?1:-1);e.push(W=>{U.rotation.y=W*k})}let s=(y,A,R,I,L)=>{let U=new be;U.s.cone(I,I*1.6,[0,-I*.8,0],d.rock,9,[Qi,0,0],1,.08),U.s.cone(I*.5,I*1.3,[I*.2,-I*1.4,0],d.rockD,7,[Qi,0,0],1,.08),U.s.cyl(I*1.02,I,.5,[0,.1,0],d.leaf,14,[0,0,0],1,.05),L===0?(U.s.cyl(.1,.16,1.4,[0,1,0],d.woodD,7),U.s.sph(1.1,[0,2.2,0],d.blossom,1,9),U.s.sph(.7,[.7,1.8,.2],d.pink,1,8),U.s.rod([.5,1.8,0],[.5,.5,0],.015,d.cream),U.s.box(.4,.06,.2,[.5,.5,0],d.woodL)):L===1?(U.s.box(1.6,1.2,1.3,[0,.9,0],"#f3e3cc"),U.s.gable(1.8,2,.9,[0,1.5,0],d.roofRed,Qi/2),U.g.box(.3,.35,.05,[.4,1,.67],"#ffd98a",[0,0,0],0),U.s.cyl(.05,.05,1,[I*.5,.6,I*.3],d.iron,6),U.g.sph(.14,[I*.5,1.2,I*.3],"#ffd98a",1,6,0)):(U.s.cyl(.9,1.1,2.6,[0,1.5,0],d.stoneL,10),U.s.cone(1.3,1.5,[0,3.5,0],d.roofBlue,10),U.g.box(.25,.5,.06,[0,1.9,1],"#ffd98a",[0,0,0],0));let D=U.s.build(i.toon),B=U.g.build(i.glow,!1,!1),k=new se;D&&k.add(D),B&&k.add(B),k.position.set(y,A,R),t.add(k);let W=n()*6;e.push(Y=>{k.position.y=A+Math.sin(Y*.5+W)*.5,k.rotation.y=Math.sin(Y*.1+W)*.2})};s(-70,18,34,4.6,0),s(82,8,-34,5.4,1),s(74,26,40,3.4,2),s(-82,4,-42,4,0);let r=5,o=new be;o.s.sph(r,[0,0,0],d.leaf,1,18,.06);let a=(y,A)=>{let R=new Oe().setFromUnitVectors(new N(0,1,0),new N(...y).normalize()),I=new fe().makeRotationFromQuaternion(R),L=new be;A(L.at(0,r-.1,0));for(let U of L.s.geos)U.applyMatrix4(I),o.s.geos.push(U);for(let U of L.g.geos)U.applyMatrix4(I),o.g.geos.push(U)};a([0,1,0],y=>{y.s.cone(1.1,1.3,[0,.6,0],d.rockD,8),y.s.cone(.4,.2,[0,1.25,0],"#e8734f",8)}),a([.9,.5,.2],y=>{y.s.cyl(.35,.55,1.8,[0,.9,0],d.woodL,8),y.s.sph(.9,[0,2.1,0],d.leafD,[1.3,.7,1.3],9)}),a([-.7,.6,.5],y=>{y.s.cyl(.25,.4,1.2,[0,.6,0],d.woodL,8),y.s.sph(.65,[0,1.4,0],d.leaf,[1.3,.7,1.3],9)}),a([.2,.6,-.9],y=>{y.s.cone(.22,.6,[0,.3,0],d.leaf,6),y.s.cone(.18,.5,[.2,.25,.1],d.leafL,6,[0,0,-.5])}),a([-.5,.2,.9],y=>{y.s.cyl(.04,.05,.9,[0,.45,0],d.iron,6),y.g.sph(.14,[0,1,0],"#ffd98a",1,6,0)});let l=new se,c=o.s.build(i.toon),h=o.g.build(i.glow,!1,!1);c&&l.add(c),h&&l.add(h),l.position.set(-48,34,-52),t.add(l),e.push(y=>{l.rotation.y=y*.08,l.position.y=34+Math.sin(y*.4)*.7});let p=new be,f=[d.red,d.cream,d.teal,d.gold,d.pink,d.cream];for(let y=0;y<6;y++)p.s.add(new Nn(2.2,10,9,y*Qi*2/6,Qi*2/6),f[y],[0,0,0],[0,0,0],[1,1.15,1],.03,!0);p.s.box(.9,.55,.9,[0,-3.6,0],d.woodL);for(let[y,A]of[[-1,-1],[1,-1],[-1,1],[1,1]])p.s.rod([y*.4,-3.35,A*.4],[y*1.3,-1.7,A*1.3],.02,d.woodD);p.g.sph(.13,[0,-2.9,0],"#ffb347",1,6,0);let u=new se,x=p.s.build(i.toon),b=p.g.build(i.glow,!1,!1);x&&u.add(x),b&&u.add(b),t.add(u),e.push(y=>{let A=y*.025+1.2;u.position.set(Math.cos(A)*78,26+Math.sin(y*.5)*.8,Math.sin(A)*78),u.rotation.y=-A});let g=new Ce;g.setAttribute("position",new ve(new Float32Array([0,0,0,.55,.05,.12,.2,0,-.22]),3)),g.computeVertexNormals();let m=i.cloth("#fffaf0");for(let y=0;y<9;y++){let A=new se,R=new le(g,m),I=new le(g,m);I.scale.x=-1,A.add(R,I),A.scale.setScalar(1.4),t.add(A);let L=52+y%3*9,U=6+y%4*4,D=.05+y%3*.012,B=y*.7;e.push(k=>{let W=k*D+B;A.position.set(Math.cos(W)*L,U+Math.sin(k*.9+B)*1.2,Math.sin(W)*L),A.rotation.y=-W;let Y=Math.sin(k*8+B*3)*.6;R.rotation.z=Y,I.rotation.z=-Y})}let w=700,M=new Float32Array(w*3),_=new Float32Array(w),S=new Float32Array(w);for(let y=0;y<w;y++){let A=n()*2-1,R=n()*Qi*2,I=Math.sqrt(1-A*A),L=Math.abs(A)*.9+.08,U=Math.sqrt(I*I+L*L);M[y*3]=Math.cos(R)*I/U*800,M[y*3+1]=L/U*800,M[y*3+2]=Math.sin(R)*I/U*800,_[y]=8+n()*n()*26,S[y]=n()}let E=new Ce;E.setAttribute("position",new ve(M,3)),E.setAttribute("aSize",new ve(_,1)),E.setAttribute("aPhase",new ve(S,1));let C=new xr(E,i.stars);return C.frustumCulled=!1,C.renderOrder=-1,t.add(C),{group:t,anims:e,stars:C}}var Te=Math.PI;function $y(i,t){switch(t){case"sword":i.box(.035,.55,.012,[.27,.62,.1],d.steel,[0,0,0],0),i.box(.16,.035,.04,[.27,.34,.1],d.gold,[0,0,0],0);break;case"spear":i.rod([.27,0,.08],[.27,1.45,.08],.018,d.woodD),i.cone(.045,.22,[.27,1.55,.08],d.steel,6);break;case"staff":i.rod([.27,0,.08],[.27,1.3,.08],.022,d.woodD),i.sph(.06,[.27,1.34,.08],d.glass,1,8);break;case"ladle":i.rod([.25,.4,.12],[.3,.75,.3],.015,d.woodD),i.sph(.05,[.3,.76,.31],d.iron,1,6);break;case"book":i.box(.16,.03,.2,[.12,.55,.17],d.red,[.4,0,0],0);break;case"hammer":i.rod([.25,.4,.1],[.33,.82,.2],.02,d.woodD),i.box(.14,.09,.09,[.33,.86,.2],d.iron,[0,0,0],0);break;case"rod":i.rod([.22,.5,.15],[.75,1.15,.9],.012,d.woodD),i.rod([.75,1.15,.9],[.8,0,1.05],.004,d.cream);break;case"basket":i.cyl(.11,.08,.1,[.28,.4,.1],d.woodL,8),i.sph(.05,[.26,.47,.1],d.red,1,6),i.sph(.05,[.31,.47,.12],d.gold,1,6);break;case"lute":i.sph(.11,[.1,.5,.2],d.wood,[1,1.25,.6],8),i.rod([.1,.55,.2],[.23,.92,.2],.018,d.woodD);break;case"sack":i.sph(.16,[0,.6,-.2],d.cream,[1,1.2,.9],8);break;case"apple":i.sph(.04,[.26,.44,.12],d.red,1,6);break;case"wheat":i.rod([.25,.3,.1],[.3,.95,.1],.012,d.leafL),i.cone(.04,.2,[.3,1.02,.1],d.gold,5);break;case"plate":i.cyl(.1,.1,.02,[.22,.55,.22],d.white,10),i.sph(.04,[.22,.6,.22],d.red,1,6);break}}function jy(i,t){let e=new be,n=e.s,s=t.skin??d.skin,r=t.bottom??d.ink,o=t.hair??d.hairBrown,a=t.top;if(t.robe)n.cyl(.15,.27,.52,[0,.27,0],t.top,12),n.cyl(.275,.275,.04,[0,.03,0],t.trim??d.gold,12,[0,0,0],1,0);else if(t.sit)for(let u of[-1,1])n.rod([u*.07,.46,0],[u*.07,.46,.3],.05,r),n.rod([u*.07,.46,.3],[u*.07,.04,.33],.045,r),n.box(.11,.06,.17,[u*.07,.03,.38],d.woodD);else for(let u of[-1,1])n.cyl(.05,.045,.4,[u*.07,.22,0],r,7),n.box(.11,.06,.17,[u*.07,.03,.03],d.woodD);n.cyl(.13,.17,.44,[0,.64,0],t.top,10),n.cyl(.172,.172,.04,[0,.45,0],t.trim??d.woodD,10,[0,0,0],1,0),n.cyl(.04,.045,.06,[0,.88,0],s,6),n.sph(.15,[0,1,0],s,1,12);for(let u of[-1,1])n.sph(.02,[u*.058,1.01,.138],d.ink,1,6,0),n.sph(.026,[u*.095,.96,.122],"#f2a3a0",[1,.6,.3],6,0);n.sph(.016,[0,.975,.147],d.skinD,1,6,0);let l=t.hairStyle??"short";if((l==="short"||l==="bun"||l==="long")&&n.sph(.158,[0,1.04,-.02],o,[1,.82,1.03],10),l==="long"&&n.sph(.16,[0,.9,-.07],o,[1,1.45,.85],8),l==="bun"&&n.sph(.07,[0,1.2,-.06],o,1,8),l==="spiky"){n.sph(.154,[0,1.04,-.02],o,[1,.78,1.03],10);for(let u=0;u<9;u++){let x=u/9*Te*2,b=Math.sin(x),g=Math.cos(x);n.cone(.05,.17,[b*.1,1.15,g*.1-.02],o,5,[g*.7,0,-b*.7])}n.cone(.055,.2,[0,1.2,0],o,5)}t.beard&&n.cone(.11,.26,[0,.84,.09],t.beard,7,[Te+.15,0,0]);let c=t.hatColor??d.red;switch(t.hat){case"crown":n.cyl(.14,.15,.09,[0,1.17,0],d.gold,10);for(let u=0;u<5;u++)n.cone(.035,.08,[Math.sin(u/5*Te*2)*.13,1.25,Math.cos(u/5*Te*2)*.13],d.gold,4);n.sph(.03,[0,1.17,.15],d.red,1,6);break;case"helmet":n.sph(.17,[0,1.03,0],d.steel,[1,.95,1],10),n.box(.2,.04,.06,[0,.99,.15],d.ironL,[0,0,0],0),n.cone(.05,.3,[0,1.3,-.04],c,6,[-.3,0,0]);break;case"cook":n.cyl(.14,.14,.12,[0,1.17,0],d.white,10),n.sph(.17,[0,1.3,0],d.white,[1,.8,1],10);break;case"straw":n.cone(.33,.13,[0,1.13,0],d.sand,14),n.cyl(.13,.15,.1,[0,1.19,0],d.sand,10),n.cyl(.152,.152,.03,[0,1.15,0],c,10,[0,0,0],1,0);break;case"cap":n.sph(.16,[0,1.1,0],c,[1,.55,1.05],10),n.box(.18,.02,.1,[0,1.07,.15],c,[.1,0,0],0);break;case"hood":n.sph(.19,[0,1,-.03],t.top,[1,1.05,1],10);break;case"pointed":n.cone(.17,.5,[0,1.33,0],c,10,[.1,0,0]),n.cyl(.23,.23,.03,[0,1.11,0],c,12,[0,0,0],1,0),n.sph(.035,[.03,1.4,.1],d.gold,1,6,0);break}t.scarf&&(n.tor(.1,.04,[0,.85,0],t.scarf,[Te/2,0,0],10,0),n.rod([.08,.82,.1],[.2,.5,-.24],.034,t.scarf),n.rod([.2,.5,-.24],[.26,.2,-.45],.03,t.scarf)),t.cape&&n.box(.36,.56,.04,[0,.62,-.17],t.cape,[.12,0,0]),t.apron&&n.box(.26,.38,.03,[0,.52,.16],t.apron,[0,0,0],0),n.cyl(.04,.036,.34,[-.19,.64,0],a,7,[0,0,.2]),n.sph(.04,[-.235,.46,0],s,1,6),t.wave||(n.cyl(.04,.036,.34,[.19,.64,0],a,7,[0,0,-.2]),n.sph(.04,[.235,.46,0],s,1,6)),t.hold&&$y(n,t.hold);let h=new se,p=e.s.build(i.toon);p&&h.add(p);let f=null;if(t.wave){let u=new be;u.s.cyl(.04,.036,.34,[0,-.15,0],a,7),u.s.sph(.045,[0,-.33,0],s,1,6);let x=u.s.build(i.toon);f=new se,f.position.set(.17,.8,0),x&&f.add(x),h.add(f)}return h.scale.setScalar(t.scale??1),{group:h,arm:f}}function Qy(i){let e=new be().s;e.sph(.22,[0,.3,0],d.white,[1.15,.9,1.35],9);for(let[l,c,h]of[[.14,.42,.1],[-.14,.42,0],[.1,.4,-.2],[-.1,.44,.2],[0,.5,-.05]])e.sph(.12,[l,c,h],d.cream,1,7);for(let[l,c]of[[-.1,.16],[.1,.16],[-.1,-.16],[.1,-.16]])e.cyl(.02,.02,.18,[l,.09,c],d.ink,5,[0,0,0],1,0);let n=new be;n.s.sph(.1,[0,0,0],"#4a4a5c",[.9,1,1.1],8,0),n.s.sph(.03,[-.05,.03,.08],d.white,1,5,0),n.s.sph(.03,[.05,.03,.08],d.white,1,5,0),n.s.sph(.012,[-.05,.03,.1],d.ink,1,4,0),n.s.sph(.012,[.05,.03,.1],d.ink,1,4,0),n.s.sph(.05,[-.11,.02,0],"#4a4a5c",[1,.5,.6],5,0),n.s.sph(.05,[.11,.02,0],"#4a4a5c",[1,.5,.6],5,0);let s=new se,r=e.build(i.toon);r&&s.add(r);let o=n.s.build(i.toon),a=new se;return a.position.set(0,.36,.28),o&&a.add(o),s.add(a),{group:s,head:a}}function tv(i){let e=new be().s,n="#e59b5b";e.sph(.16,[0,.22,0],n,[.8,.8,1.5],9),e.sph(.1,[0,.33,.22],n,1,9),e.cone(.05,.14,[-.06,.45,.2],n,4),e.cone(.05,.14,[.06,.45,.2],n,4),e.cone(.05,.12,[0,.31,.33],d.cream,5,[Te/2,0,0]),e.sph(.02,[0,.31,.38],d.ink,1,5,0),e.sph(.014,[-.04,.36,.3],d.ink,1,5,0),e.sph(.014,[.04,.36,.3],d.ink,1,5,0),e.sph(.09,[0,.14,.2],d.cream,[.8,1,.5],7);for(let[c,h]of[[-.06,.12],[.06,.12],[-.06,-.12],[.06,-.12]])e.cyl(.025,.02,.16,[c,.08,h],"#8a5a3c",5,[0,0,0],1,0);let s=new be;s.s.sph(.1,[0,0,-.14],n,[.8,.8,1.9],8),s.s.sph(.07,[0,0,-.34],d.white,[.9,.9,1.2],7);let r=new se,o=e.build(i.toon);o&&r.add(o);let a=s.s.build(i.toon),l=new se;return l.position.set(0,.24,-.2),a&&l.add(a),r.add(l),r.scale.setScalar(1.35),{group:r,tail:l}}function ev(i){let e=new be().s,n="#c9b49c";e.sph(.1,[0,.12,0],n,[.9,.9,1.4],8),e.sph(.075,[0,.21,.13],n,1,8),e.cone(.03,.06,[-.04,.28,.13],n,4),e.cone(.03,.06,[.04,.28,.13],n,4),e.sph(.01,[-.03,.22,.2],d.ink,1,4,0),e.sph(.01,[.03,.22,.2],d.ink,1,4,0),e.rod([0,.14,-.14],[0,.32,-.2],.016,n);let s=new se,r=e.build(i.toon);return r&&s.add(r),s.scale.setScalar(1.3),s}function nv(i){let e=new be().s,n="#d9b48c";e.sph(.3,[0,.8,0],n,[.9,.9,1.7],10),e.rod([0,.95,.38],[0,1.4,.62],.14,n,8),e.sph(.14,[0,1.46,.72],n,[.9,.95,1.5],8),e.sph(.03,[-.08,1.52,.78],d.ink,1,5,0),e.sph(.03,[.08,1.52,.78],d.ink,1,5,0),e.cone(.035,.1,[-.06,1.62,.6],n,4),e.cone(.035,.1,[.06,1.62,.6],n,4),e.box(.07,.4,.4,[0,1.35,.55],d.woodD,[.4,0,0]),e.rod([0,.95,-.45],[0,.45,-.62],.05,d.woodD,6);for(let[o,a]of[[-.14,.38],[.14,.38],[-.14,-.38],[.14,-.38]])e.cyl(.055,.04,.62,[o,.34,a],n,6,[0,0,0],1,0),e.cyl(.05,.05,.06,[o,.03,a],d.woodD,6,[0,0,0],1,0);e.box(.5,.06,.5,[0,1.1,-.02],d.red);let s=new se,r=e.build(i.toon);return r&&s.add(r),s.scale.setScalar(.85),s}function iv(i){let e=new be().s,n="#9fd3b5",s=d.cream;e.sph(.7,[0,.62,0],n,[1.1,.9,1.3],12),e.sph(.5,[0,.45,.2],s,[1,.75,.9],10),e.sph(.42,[.2,.8,.9],n,[1,.95,1.1],10),e.sph(.07,[.02,.95,1.22],d.ink,1,6,0),e.sph(.07,[.38,.95,1.22],d.ink,1,6,0),e.sph(.1,[-.02,.76,1.23],"#f2a3a0",[1,.6,.4],6,0),e.cone(.1,.34,[0,1.26,.85],d.gold,5,[.2,0,.2]),e.cone(.1,.34,[.42,1.26,.85],d.gold,5,[.2,0,-.2]);for(let h=0;h<5;h++)e.cone(.09,.2,[0,1.1-h*.09,-.1-h*.2],d.gold,4,[-.4,0,0]);for(let h=0;h<7;h++)e.sph(.34-h*.04,[.4*Math.sin(h*.5)+.6,.3,-.6-h*.28],n,1,8);e.cone(.1,.28,[-.55,.4,.3],d.gold,4,[0,0,1.3]);let r=new be;r.s.box(.04,.5,.5,[0,.3,0],d.pink,[0,0,0],0),r.s.cone(.4,.8,[0,.3,0],d.pink,3,[0,0,0],[.12,1,1.2],0);let o=new se,a=e.build(i.toon);a&&o.add(a);let l=r.s.build(i.toon),c=[];for(let h of[-1,1]){let p=new se;if(p.position.set(h*.55,.95,-.1),l){let f=l.clone();p.add(f)}o.add(p),c.push(p)}return o.scale.setScalar(.62),{group:o,wings:c,body:a}}function sv(i){let t=new be;t.s.sph(.1,[0,.06,0],d.white,[.9,.7,1.3],8),t.s.sph(.06,[0,.16,.1],d.white,1,8),t.s.cone(.025,.06,[0,.15,.17],"#f2a65a",5,[Te/2,0,0]);let e=new se,n=t.s.build(i.toon);return n&&e.add(n),e.scale.setScalar(1.4),e}function rv(i,t){let e=new be;e.s.sph(.08,[0,.1,0],t,[.9,1,1.2],8),e.s.sph(.045,[0,.2,.07],t,1,8),e.s.cone(.015,.04,[0,.19,.12],"#f2a65a",4,[Te/2,0,0]),e.s.cone(.02,.04,[0,.26,.07],d.red,4),e.s.cone(.04,.1,[0,.14,-.1],t,4,[-1.1,0,0]);let n=new se,s=e.s.build(i.toon);return s&&n.add(s),n.scale.setScalar(1.3),n}function Ff(i){let t=new se,e=[],n=oi(99),s=(L,U,D={})=>{let{group:B,arm:k}=jy(i,{...L,wave:D.mode==="wave"});B.position.set(...U),B.rotation.y=D.ry??0,t.add(B);let W=n()*6;if(D.mode==="walk"&&D.to){let Y=new N(...U),J=new N(...D.to),tt=Y.distanceTo(J),it=D.speed??.35;e.push(O=>{let G=(O*it/tt+W)%2,j=G>1?2-G:G,at=G<=1,mt=Y.x+(J.x-Y.x)*j,K=Y.z+(J.z-Y.z)*j,Q=D.ground?Jt(mt,K):Y.y+(J.y-Y.y)*j;B.position.set(mt,Q+Math.abs(Math.sin(O*6+W))*.03,K),B.rotation.y=Math.atan2(J.x-Y.x,J.z-Y.z)+(at?0:Te),B.rotation.z=Math.sin(O*6+W)*.03})}else e.push(Y=>{B.position.y=U[1]+Math.sin(Y*1.8+W)*.01,B.rotation.z=Math.sin(Y*1.1+W)*.015,k&&(k.rotation.z=2.55+Math.sin(Y*6+W)*.35)}),k&&(k.rotation.z=2.55);return B},r=(L,U)=>[L,Jt(L,U),U],o=bn(0),a=bn(1),l=bn(2),c=3*sn.floor+.36;s({top:d.red,bottom:d.redD,hat:"crown",hair:d.hairGray,beard:d.hairGray,cape:d.white,trim:d.gold,sit:!0,scale:1.05},ge(3.2,o+.22+.04,-2.2),{ry:0}),s({top:d.pink,robe:!0,trim:d.gold,hat:"crown",hairStyle:"long",hair:d.hairGold,scale:.98},ge(4.2,o+.22,-1.7),{ry:-.3}),s({top:d.teal,hat:"cap",hatColor:d.red,hold:"lute",hair:d.hairDark},ge(2.3,o,2.2),{ry:-.5}),s({top:d.white,bottom:d.ink,apron:d.cream,hat:"cook",hold:"ladle",hair:d.hairBrown},ge(-3,o,-1.75),{ry:Te}),s({top:d.white,bottom:d.ink,apron:d.cream,hat:"cook",hairStyle:"bald",beard:d.hairBrown,scale:1.08},ge(-3.3,o,1),{ry:Te}),s({top:d.mint,robe:!0,apron:d.white,hat:"cap",hatColor:d.white,hairStyle:"bun",hold:"plate",hair:d.hairBrown},ge(-.8,o,2.4),{mode:"walk",to:ge(2.2,o,2.4),speed:.3}),s({top:d.lilac,robe:!0,hat:"pointed",hatColor:d.lilac,beard:d.hairGray,hair:d.hairGray,sit:!0},ge(-3.3,a,1.2),{ry:Te}),s({top:d.teal,robe:!0,hairStyle:"bun",hold:"book",hair:d.hairBrown,scale:.95},ge(-1.2,a,1.6),{ry:.6}),s({top:d.steel,bottom:d.ironL,hat:"helmet",hatColor:d.red,sit:!0,cape:d.red},ge(2.7,a,.3),{ry:Te/2}),s({top:d.steel,bottom:d.ironL,hat:"helmet",hatColor:d.teal,sit:!0,cape:d.teal},ge(4.1,a,.3),{ry:-Te/2}),s({top:d.pink,robe:!0,trim:d.gold,hat:"crown",hairStyle:"long",hair:d.hairGold,hold:"book",scale:.9},ge(1.5,l,-1.8),{ry:Te}),s({top:d.mint,bottom:d.tealD,hair:d.hairBrown,hold:"book",scale:.78,hat:"cap",hatColor:d.lilac},ge(-3.2,l,2.2),{ry:.3}),s({top:d.lilac,robe:!0,hat:"pointed",hatColor:d.tealD,beard:d.hairGray,hair:d.hairGray,hold:"staff"},ge(-2.4,c,.7),{ry:.5});let h=ae.hz,p=ae.hx;for(let L of[-1,1])s({top:d.steel,bottom:d.ironL,hat:"helmet",hatColor:L<0?d.red:d.teal,hold:"spear",cape:d.red},we(L*1.6,0,h-1),{ry:.1*L});s({top:d.steel,bottom:d.ironL,hat:"helmet",hold:"spear"},we(-p,3,-4),{mode:"walk",to:we(-p,3,4.5),speed:.25}),s({top:d.steel,bottom:d.ironL,hat:"helmet",hatColor:d.gold,hold:"sword"},we(-6,3.5,-h),{mode:"walk",to:we(6,3.5,-h),speed:.3}),s({top:d.steel,bottom:d.ironL,hat:"helmet",hatColor:d.teal,hold:"spear"},we(p,3,4),{mode:"walk",to:we(p,3,-4),speed:.22}),s({top:d.woodD,bottom:d.ink,apron:d.ink,hairStyle:"bald",beard:d.hairDark,hold:"hammer",scale:1.1},we(7.3,.1,-3.7),{ry:Te}),s({top:d.mint,bottom:d.woodD,hat:"cap",hatColor:d.gold,hold:"apple",scale:.82},we(6.3,0,3.6),{ry:Te/2}),s({top:d.white,robe:!0,trim:d.gold,hat:"cap",hatColor:d.white,hairStyle:"bald",beard:d.hairGray},we(-8,.15,3.2),{ry:-Te/2}),s({top:d.mint,robe:!0,hairStyle:"bun",hair:d.hairGray,sit:!0,scale:.95},we(-6.7,.15,2.3),{ry:-Te/2}),s({top:d.roofRose,robe:!0,hairStyle:"long",hair:d.hairBrown,sit:!0,scale:.9},we(-6.7,.15,4.1),{ry:-Te/2}),s({top:d.redD,bottom:d.ink,apron:d.cream,hat:"cap",hatColor:d.red,hair:d.hairDark},we(-3.8,0,5.2),{ry:.15}),s({top:d.teal,bottom:d.ink,hairStyle:"long",hair:d.hairGold,hold:"basket",scale:.95},we(-3.2,0,7),{ry:Te+.2}),s({top:d.gold,robe:!0,apron:d.cream,hat:"cap",hatColor:d.white,hairStyle:"bun",hair:d.hairBrown},we(-6,0,5.5),{ry:.15}),s({top:d.steel,bottom:d.ironL,hat:"helmet",hatColor:d.red,hold:"sword",cape:d.red},we(4.2,0,4.9),{ry:.3}),s({top:d.lilac,bottom:d.ink,hair:d.hairGold,hold:"sword",scale:.75,hat:"cap",hatColor:d.teal},we(5.4,0,4.4),{ry:-.2}),s({top:d.roofRose,robe:!0,hairStyle:"long",hair:d.hairBrown,scale:.7},we(-1.6,0,3.3),{mode:"wave",ry:.4}),s({top:d.mint,bottom:d.tealD,hair:d.hairBrown,scale:.7,hat:"cap",hatColor:d.gold},we(1.6,0,3),{mode:"walk",to:we(1.6,0,5.8),speed:.4});let f=nv(i);f.position.set(...we(8,.1,3.6)),f.rotation.y=-Te/2,t.add(f);let u=ev(i);u.position.set(...we(.9,.34,4.4)),t.add(u);let x=no(70,3.8),b=s({top:d.leaf,bottom:d.leafD,hair:d.hairGold,hairStyle:"spiky",scarf:d.gold,cape:d.leaf,scale:1.25},r(x[0],x[1]),{mode:"wave",ry:.25});b.position.y+=0;let g=no(76,3.6),m=tv(i);m.group.position.set(g[0],Jt(g[0],g[1]),g[1]),m.group.rotation.y=-.9,t.add(m.group),e.push(L=>{m.tail.rotation.y=Math.sin(L*2.4)*.5});let{x:w,z:M}=ke;s({top:d.cream,bottom:d.ink,apron:d.white,hat:"cap",hatColor:d.white,hair:d.hairBrown,hold:"plate"},r(w-1.8,M-2.9),{ry:Te-.4}),s({top:d.woodL,bottom:d.woodD,hat:"straw",hairStyle:"bald",beard:d.hairGray,hold:"staff",sit:!0,scale:.95},[w-2.2,Jt(w-2.2,M+2.4),M+2.4],{ry:.4}),s({top:d.red,robe:!0,hairStyle:"bun",hair:d.hairDark,hold:"basket"},r(w-3.2,M+.8),{mode:"walk",to:r(w+3.2,M+.4),speed:.3,ground:!0}),s({top:d.teal,bottom:d.ink,hat:"cap",hatColor:d.gold,hair:d.hairBrown,hold:"sack"},r(w+3.4,M+1.6),{mode:"walk",to:r(w-2,M+1.8),speed:.28,ground:!0}),s({top:d.pink,robe:!0,hairStyle:"long",hair:d.hairGold,scale:.68},r(w+1.3,M+.9),{mode:"wave",ry:-.3}),s({top:d.mint,bottom:d.tealD,hair:d.hairDark,scale:.68},r(w+.3,M+1.2),{ry:.5}),s({top:d.woodL,bottom:d.woodD,hat:"cap",hatColor:d.woodD,hold:"sack",hair:d.hairBrown,scale:1.05},r(Ye.x+2.4,Ye.z+2.4),{mode:"walk",to:r(Ye.x+5,Ye.z+4),speed:.25,ground:!0}),s({top:d.teal,bottom:d.woodD,hat:"straw",hatColor:d.red,hold:"wheat",hair:d.hairBrown},r(Ut.x-6,Ut.z+1.5),{mode:"walk",to:r(Ut.x+5,Ut.z+1.5),speed:.22,ground:!0}),s({top:d.roofRose,robe:!0,hat:"straw",hatColor:d.pink,hold:"basket",hairStyle:"long",hair:d.hairBrown},r(Hn.x+2,Hn.z+1.8),{ry:-2.2});for(let L=0;L<4;L++){let U=rv(i,L%2?d.white:d.sand),D=Ut.x+Ut.w/2+1+L%2*.7,B=Ut.z+2.8+Math.floor(L/2)*.8;U.position.set(D,Jt(D,B),B),U.rotation.y=L*1.7,t.add(U),e.push(k=>{U.rotation.x=Math.max(0,Math.sin(k*3+L*2))*.5})}s({top:d.mint,bottom:d.woodD,hat:"straw",hatColor:d.teal,hold:"staff",hairStyle:"long",hair:d.hairBrown},r(cn.x-1.5,cn.z-.5),{ry:.8});for(let L=0;L<7;L++){let U=Qy(i),D=cn.x+(n()-.5)*8,B=cn.z+(n()-.5)*6,k=.5+n()*1.2,W=.1+n()*.1,Y=n()*6;U.group.scale.setScalar(.85+n()*.3),t.add(U.group),e.push(J=>{let tt=J*W+Y,it=D+Math.cos(tt)*k,O=B+Math.sin(tt)*k;U.group.position.set(it,Jt(it,O),O),U.group.rotation.y=-tt+Te,U.head.rotation.x=.35+Math.sin(J*1.2+Y)*.3})}let _=Xt.x-1.6,S=Xt.z+.4;s({top:d.roofBlue,bottom:d.woodD,hat:"straw",hold:"rod",hair:d.hairBrown,sit:!0,scale:.9},[_,Xt.y+.22,S],{ry:.9});for(let L=0;L<3;L++){let U=sv(i);t.add(U);let D=1.4+L*.7;e.push(B=>{let k=B*(.12+L*.03)+L*2;U.position.set(Xt.x+1.8+Math.cos(k)*D,Xt.y+.04+Math.sin(B*2+L)*.01,Xt.z-.6+Math.sin(k)*D*.6),U.rotation.y=-k+Te})}let E=Math.atan2(Be.x-jt.x,Be.z-jt.z),C=Be.x+Math.sin(E)*2.6,y=Be.z+Math.cos(E)*2.6,A=iv(i);A.group.position.set(C,Jt(C,y)+.05,y),A.group.rotation.y=E+.5,t.add(A.group),e.push(L=>{let U=.62*(1+Math.sin(L*1.4)*.025);A.group.scale.setScalar(U),A.wings[0].rotation.z=-.35+Math.sin(L*1.4)*.05,A.wings[1].rotation.z=.35-Math.sin(L*1.4)*.05});let R=Be.x+Math.sin(E+.9)*5,I=Be.z+Math.cos(E+.9)*5;return s({top:d.red,bottom:d.ink,hat:"hood",hold:"staff",cape:d.redD,hair:d.hairDark},r(R,I),{ry:E+.9+Te+.4}),{group:t,anims:e}}var $s=no(70,3.8),Of=Jt($s[0],$s[1]),je=[bn(0),bn(1),bn(2),3*2.2+.36],js=[{id:"overview",label:"\u5168\u666F",hint:"\u6D6E\u7A7A\u5C9B\u5168\u8C8C",pos:[10,42,106],target:[0,-3,-6]},{id:"prince",label:"\u5C0F\u738B\u5B50",hint:"\u5C9B\u6CBF\u7684\u5C0F\u738B\u5B50\u4E0E\u72D0\u72F8",pos:[$s[0]+2.4,Of+2.3,$s[1]+6.4],target:[$s[0]+.2,Of+1,$s[1]]},{id:"castle",label:"\u57CE\u5821",hint:"\u57CE\u5899\u3001\u5854\u697C\u4E0E\u540A\u6865",pos:[-2,14,30],target:[-2,6,-9]},{id:"courtyard",label:"\u5EAD\u9662",hint:"\u793C\u62DC\u5802\u3001\u9A6C\u53A9\u3001\u94C1\u5320\u94FA",pos:[...we(0,6.5,12.5)],target:[...we(0,1.2,2.5)]},{id:"interior",label:"\u4E3B\u5821\u5256\u9762",hint:"\u56DB\u5C42\u5BA4\u5185\u5168\u666F",pos:[...ge(-6.5,5.5,15.6)],target:[...ge(.5,3,0)]},{id:"hall",label:"\u738B\u5EA7\u5927\u5385",hint:"\u56FD\u738B\u3001\u738B\u540E\u4E0E\u5BB4\u4F1A",pos:[...ge(1.4,je[0]+1.9,7.6)],target:[...ge(1.6,je[0]+1,-1)]},{id:"kitchen",label:"\u53A8\u623F",hint:"\u7089\u7076\u4E0E\u5927\u9505",pos:[...ge(-2,je[0]+2.8,6.8)],target:[...ge(-3.4,je[0]+.7,-1)]},{id:"library",label:"\u56FE\u4E66\u9986",hint:"\u4E66\u67B6\u4E0E\u5730\u7403\u4EEA",pos:[...ge(-2.6,je[1]+1.8,6.4)],target:[...ge(-2.6,je[1]+1,-1.2)]},{id:"bedroom",label:"\u73AB\u7470\u623F",hint:"\u73BB\u7483\u7F69\u4E0B\u7684\u73AB\u7470",pos:[...ge(-3.1,je[2]+1.5,5.4)],target:[...ge(-3.2,je[2]+.9,1.4)]},{id:"observatory",label:"\u5929\u6587\u53F0",hint:"\u671B\u8FDC\u955C\u4E0E\u661F\u8C61\u4EEA",pos:[...ge(-3.2,je[3]+1.8,6.4)],target:[...ge(-3.2,je[3]+1,0)]},{id:"village",label:"\u6751\u5E84",hint:"\u6C11\u5C45\u3001\u6C34\u4E95\u4E0E\u9762\u5305\u644A",pos:[ke.x+5,8.5,ke.z+18],target:[ke.x,1.4,ke.z]},{id:"farm",label:"\u519C\u7530\u98CE\u8F66",hint:"\u9EA6\u7530\u3001\u8C37\u4ED3\u4E0E\u98CE\u8F66",pos:[-14,11,41],target:[-14,1.2,14]},{id:"lake",label:"\u6E56\u6CCA",hint:"\u6808\u6865\u3001\u5C0F\u8239\u4E0E\u7761\u83B2",pos:[Xt.x-5,8.5,Xt.z+17],target:[Xt.x,0,Xt.z]},{id:"mountain",label:"\u5C71\u4E0E\u6D1E\u7A74",hint:"\u96EA\u5CF0\u3001\u7011\u5E03\u4E0E\u5C0F\u9F99",pos:[jt.x+8,14,jt.z+29],target:[jt.x-3,4.5,jt.z+3]},{id:"under",label:"\u5C9B\u5E95",hint:"\u60AC\u5782\u7684\u5CA9\u58C1\u4E0E\u6839\u987B",pos:[26,-14,62],target:[0,-16,0]}],Le={day:{top:"#7aa6d6",mid:"#c3e1ea",bot:"#fbe8d0",sunCol:"#fff3cf",sunDir:[.45,.62,.55],hemiSky:"#d6e9f5",hemiGround:"#f3dcbc",hemiI:1.25,sunLight:"#fff0d6",sunI:2.4,fog:"#d8eaf0",fogD:.0024,stars:0,rooms:.3,waterLight:"#ffffff"},dusk:{top:"#7d84c3",mid:"#f0b9b2",bot:"#ffdcae",sunCol:"#ffd29c",sunDir:[-.75,.2,.62],hemiSky:"#c8b6da",hemiGround:"#f2c6a2",hemiI:1,sunLight:"#ffb98a",sunI:2,fog:"#e9c5ba",fogD:.0028,stars:.28,rooms:1,waterLight:"#ffd9c2"},night:{top:"#101a40",mid:"#28427f",bot:"#6e72ad",sunCol:"#dce6ff",sunDir:[.4,.55,-.35],hemiSky:"#5568a8",hemiGround:"#2f3560",hemiI:.8,sunLight:"#a5b8ff",sunI:.9,fog:"#2b3c70",fogD:.003,stars:1,rooms:1.9,waterLight:"#7f90c8"}},ov=()=>new Promise(i=>requestAnimationFrame(()=>i())),av=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;async function Bf(i,t,e){let n={};try{return await lv(i,n,t,e)}catch(s){throw n.renderer?.dispose(),n.renderer?.domElement.remove(),s}}async function lv(i,t,e,n){let s=async(j,at)=>{if(e?.(j,at),await ov(),n?.())throw new Error("cancelled")};await s(.02,"\u51C6\u5907\u753B\u5E03");let r=new fl({antialias:!0,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.outputColorSpace=Ze,r.shadowMap.enabled=!0,r.shadowMap.type=va,r.domElement.style.cssText="display:block;width:100%;height:100%;touch-action:none;outline:none",i.appendChild(r.domElement),t.renderer=r;let o=new mr,a=new pr(Le.day.fog,Le.day.fogD);o.fog=a;let l=new Ke(42,1,.3,2600);l.position.set(...js[0].pos);let c=new _l(l,r.domElement);c.target.set(...js[0].target),c.enableDamping=!0,c.dampingFactor=.07,c.minDistance=1.5,c.maxDistance=260,c.zoomToCursor=!0,c.autoRotateSpeed=.45,c.update();let h=new Ur(Le.day.hemiSky,Le.day.hemiGround,Le.day.hemiI);o.add(h);let p=new zr(Le.day.sunLight,Le.day.sunI);p.castShadow=!0,p.shadow.mapSize.set(2048,2048);let f=p.shadow.camera;f.left=-58,f.right=58,f.top=58,f.bottom=-58,f.near=10,f.far=260,p.shadow.bias=-5e-4,p.shadow.normalBias=.05,o.add(p,p.target);let u=[];for(let[j,at,mt,K]of[[1.6,je[0]+1.5,.6,"#ffc98a"],[-3.3,je[0]+1.5,.4,"#ffb877"],[-2.4,je[1]+1.5,.6,"#ffd39a"],[3.4,je[1]+1.5,.4,"#ffc98a"],[-3.2,je[2]+1.5,.8,"#ffc0c8"],[2.2,je[2]+1.5,.8,"#ffd39a"],[-3.2,je[3]+1.4,.2,"#bcd2ff"]]){let Q=new Br(K,0,7.5,1.6);Q.position.set(...ge(j,at,mt)),o.add(Q),u.push(Q)}await s(.1,"\u7ED8\u5236\u6C34\u5F69\u5730\u9762");let x=Qd(r.capabilities.getMaxAnisotropy()),b=tf(x),g=new qn({color:"#dff6ff",transparent:!0,opacity:.3,depthWrite:!1}),m=new le(new Nn(1e3,32,16),b.sky);m.frustumCulled=!1,m.renderOrder=-2,o.add(m),await s(.2,"\u9686\u8D77\u6D6E\u7A7A\u5C9B\u4E0E\u6CB3\u6D41");let w=Jd(b.island);w.castShadow=!0,w.receiveShadow=!0,o.add(w);let M=$d(b.water,b.fall);o.add(M.group),o.add(jd()),await s(.38,"\u5792\u780C\u57CE\u5821\u4E0E\u5185\u90E8\u623F\u95F4");let _=If(b,g);o.add(_.group),await s(.55,"\u642D\u5EFA\u6751\u5E84\u3001\u98CE\u8F66\u4E0E\u519C\u573A");let S=Lf(b);o.add(S.group),await s(.68,"\u79CD\u4E0B\u68EE\u6797\u3001\u82B1\u8349\u4E0E\u5C71\u5CE6");let E=Nf(b);o.add(E.group),await s(.8,"\u8BF7\u51FA\u56FD\u738B\u3001\u9A91\u58EB\u4E0E\u6751\u6C11");let C=Ff(b);o.add(C.group),await s(.92,"\u94FA\u5F00\u5929\u7A7A\u4E0E\u4E91");let y=Uf(b);o.add(y.group);let A=[..._.anims,...S.anims,...E.anims,...C.anims,...y.anims],R={top:new Ct(Le.day.top),mid:new Ct(Le.day.mid),bot:new Ct(Le.day.bot),sunCol:new Ct(Le.day.sunCol),sunDir:new N(...Le.day.sunDir).normalize(),hemiSky:new Ct(Le.day.hemiSky),hemiGround:new Ct(Le.day.hemiGround),hemiI:Le.day.hemiI,sunLight:new Ct(Le.day.sunLight),sunI:Le.day.sunI,fog:new Ct(Le.day.fog),fogD:Le.day.fogD,stars:Le.day.stars,rooms:Le.day.rooms,waterLight:new Ct(Le.day.waterLight)},I=Le.day,L=new Ct,U=new N,D=j=>{R.top.lerp(L.set(I.top),j),R.mid.lerp(L.set(I.mid),j),R.bot.lerp(L.set(I.bot),j),R.sunCol.lerp(L.set(I.sunCol),j),R.sunDir.lerp(U.set(...I.sunDir).normalize(),j).normalize(),R.hemiSky.lerp(L.set(I.hemiSky),j),R.hemiGround.lerp(L.set(I.hemiGround),j),R.sunLight.lerp(L.set(I.sunLight),j),R.fog.lerp(L.set(I.fog),j),R.waterLight.lerp(L.set(I.waterLight),j),R.hemiI+=(I.hemiI-R.hemiI)*j,R.sunI+=(I.sunI-R.sunI)*j,R.fogD+=(I.fogD-R.fogD)*j,R.stars+=(I.stars-R.stars)*j,R.rooms+=(I.rooms-R.rooms)*j},B=()=>{let j=b.sky.uniforms;j.uTop.value.copy(R.top),j.uMid.value.copy(R.mid),j.uBot.value.copy(R.bot),j.uSunCol.value.copy(R.sunCol),j.uSunDir.value.copy(R.sunDir),h.color.copy(R.hemiSky),h.groundColor.copy(R.hemiGround),h.intensity=R.hemiI,p.color.copy(R.sunLight),p.intensity=R.sunI,p.position.copy(R.sunDir).multiplyScalar(110),a.color.copy(R.fog),a.density=R.fogD,b.stars.uniforms.uOpacity.value=R.stars,b.water.uniforms.uLight.value.copy(R.waterLight),b.fall.uniforms.uLight.value.copy(R.waterLight);for(let at of u)at.intensity=R.rooms*5};D(1),B();let k=()=>{let j=Math.max(1,i.clientWidth),at=Math.max(1,i.clientHeight);r.setSize(j,at,!1),l.aspect=j/at,l.fov=j/at<.8?56:42,l.updateProjectionMatrix(),b.stars.uniforms.uPx.value=r.getPixelRatio()};k();let W=new ResizeObserver(k);W.observe(i);let Y=null,J=()=>{Y=null};r.domElement.addEventListener("pointerdown",J),r.domElement.addEventListener("wheel",J,{passive:!0});let tt=new Vr,it=0,O=!1,G=()=>{if(O)return;it=requestAnimationFrame(G);let j=Math.min(tt.getDelta(),.1),at=tt.elapsedTime;D(1-Math.exp(-j*2.4)),B(),b.water.uniforms.uTime.value=at,b.fall.uniforms.uTime.value=at,b.sky.uniforms.uTime.value=at,b.stars.uniforms.uTime.value=at;for(let mt of A)mt(at);if(Y){let mt=Math.min(1,(performance.now()-Y.t0)/Y.dur),K=av(mt);l.position.lerpVectors(Y.p0,Y.p1,K),c.target.lerpVectors(Y.t0v,Y.t1v,K),mt>=1&&(Y=null)}c.update(),m.position.copy(l.position),r.render(o,l)};return await s(1,"\u5B8C\u6210"),G(),{views:js,flyTo(j){let at=js.find(mt=>mt.id===j);at&&(c.autoRotate=!1,Y={t0:performance.now(),dur:1800,p0:l.position.clone(),p1:new N(...at.pos),t0v:c.target.clone(),t1v:new N(...at.target)})},setMood(j){I=Le[j]},setAutoRotate(j){c.autoRotate=j},dispose(){O=!0,cancelAnimationFrame(it),W.disconnect(),r.domElement.removeEventListener("pointerdown",J),r.domElement.removeEventListener("wheel",J),c.dispose(),o.traverse(j=>{let at=j;at.geometry&&at.geometry.dispose()}),g.dispose(),b.dispose(),r.dispose(),r.domElement.remove()}}}var cv=document.getElementById("app"),Dh=document.getElementById("status"),hv=document.getElementById("hint"),uv=document.getElementById("views"),dv=document.getElementById("moods"),Pl=document.getElementById("rotate");Bf(cv,(i,t)=>{Dh.textContent=`${t}\u2026 ${Math.round(i*100)}%`}).then(i=>{Dh.remove();let t=[];for(let s of js){let r=document.createElement("button");r.textContent=s.label,r.addEventListener("click",()=>{t.forEach(o=>o.classList.remove("on")),r.classList.add("on"),hv.textContent=s.hint,Pl.classList.remove("on"),i.setAutoRotate(!1),i.flyTo(s.id)}),uv.appendChild(r),t.push(r)}t[0].classList.add("on");let e=[["day","\u767D\u663C"],["dusk","\u9EC4\u660F"],["night","\u661F\u591C"]],n=[];for(let[s,r]of e){let o=document.createElement("button");o.textContent=r,s==="day"&&o.classList.add("on"),o.addEventListener("click",()=>{n.forEach(a=>a.classList.remove("on")),o.classList.add("on"),i.setMood(s)}),dv.appendChild(o),n.push(o)}Pl.addEventListener("click",()=>{let s=!Pl.classList.contains("on");Pl.classList.toggle("on",s),i.setAutoRotate(s)}),document.body.classList.add("ready")}).catch(i=>{Dh.textContent=`\u52A0\u8F7D\u5931\u8D25\uFF1A${i instanceof Error?i.message:String(i)}\u3002\u8BF7\u4F7F\u7528\u652F\u6301 WebGL \u7684\u6D4F\u89C8\u5668\u3002`});})();
