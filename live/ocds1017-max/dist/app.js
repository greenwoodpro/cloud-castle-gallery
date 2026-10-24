(()=>{var Yi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},qi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Md=0,ph=1,Ed=2;var Su=1,Tl=2,Zn=3,mi=0,$e=1,Yt=2,di=0,ys=1,an=2,mh=3,gh=4,Sd=5,Ui=100,bd=101,wd=102,Td=103,Ad=104,Rd=200,Cd=201,Pd=202,Id=203,nc=204,ic=205,Dd=206,Ld=207,Ud=208,Nd=209,Od=210,Fd=211,Bd=212,Hd=213,zd=214,sc=0,rc=1,oc=2,Ss=3,ac=4,cc=5,lc=6,hc=7,bu=0,kd=1,Gd=2,fi=0,Vd=1,Wd=2,Xd=3,Al=4,Yd=5,qd=6,Zd=7;var wu=300,bs=301,ws=302,uc=303,dc=304,Zo=306,Bi=1e3,Oi=1001,fc=1002,We=1003,Kd=1004;var Ar=1005;var Tn=1006,Ma=1007;var Fi=1008;var Jn=1009,Tu=1010,Au=1011,or=1012,Rl=1013,Hi=1014,On=1015,mr=1016,Cl=1017,Pl=1018,Ts=1020,Ru=35902,Cu=1021,Pu=1022,Rn=1023,Iu=1024,Du=1025,vs=1026,As=1027,gr=1028,Il=1029,Lu=1030,Dl=1031;var Ll=1033,so=33776,ro=33777,oo=33778,ao=33779,pc=35840,mc=35841,gc=35842,_c=35843,xc=36196,yc=37492,vc=37496,Mc=37808,Ec=37809,Sc=37810,bc=37811,wc=37812,Tc=37813,Ac=37814,Rc=37815,Cc=37816,Pc=37817,Ic=37818,Dc=37819,Lc=37820,Uc=37821,co=36492,Nc=36494,Oc=36495,Uu=36283,Fc=36284,Bc=36285,Hc=36286;var ho=2300,zc=2301,Ea=2302,_h=2400,xh=2401,yh=2402;var Jd=3200,$d=3201;var Ul=0,jd=1,hi="",on="srgb",xi="srgb-linear",Nl="display-p3",Ko="display-p3-linear",uo="linear",Me="srgb",fo="rec709",po="p3";var ji=7680;var vh=519,Qd=512,tf=513,ef=514,Nu=515,nf=516,sf=517,rf=518,of=519,kc=35044;var Mh="300 es",Kn=2e3,mo=2001,$n=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Eh=1234567,er=Math.PI/180,ar=180/Math.PI;function Fn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ze[i&255]+Ze[i>>8&255]+Ze[i>>16&255]+Ze[i>>24&255]+"-"+Ze[t&255]+Ze[t>>8&255]+"-"+Ze[t>>16&15|64]+Ze[t>>24&255]+"-"+Ze[e&63|128]+Ze[e>>8&255]+"-"+Ze[e>>16&255]+Ze[e>>24&255]+Ze[n&255]+Ze[n>>8&255]+Ze[n>>16&255]+Ze[n>>24&255]).toLowerCase()}function Ne(i,t,e){return Math.max(t,Math.min(e,i))}function Ol(i,t){return(i%t+t)%t}function af(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function cf(i,t,e){return i!==t?(e-i)/(t-i):0}function nr(i,t,e){return(1-e)*i+e*t}function lf(i,t,e,n){return nr(i,t,1-Math.exp(-e*n))}function hf(i,t=1){return t-Math.abs(Ol(i,t*2)-t)}function uf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function df(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ff(i,t){return i+Math.floor(Math.random()*(t-i+1))}function pf(i,t){return i+Math.random()*(t-i)}function mf(i){return i*(.5-Math.random())}function gf(i){i!==void 0&&(Eh=i);let t=Eh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function _f(i){return i*er}function xf(i){return i*ar}function yf(i){return(i&i-1)===0&&i!==0}function vf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Mf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ef(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function An(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function fe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ou={DEG2RAD:er,RAD2DEG:ar,generateUUID:Fn,clamp:Ne,euclideanModulo:Ol,mapLinear:af,inverseLerp:cf,lerp:nr,damp:lf,pingpong:hf,smoothstep:uf,smootherstep:df,randInt:ff,randFloat:pf,randFloatSpread:mf,seededRandom:gf,degToRad:_f,radToDeg:xf,isPowerOfTwo:yf,ceilPowerOfTwo:vf,floorPowerOfTwo:Mf,setQuaternionFromProperEuler:Ef,normalize:fe,denormalize:An},$=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Kt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],p=s[0],_=s[3],m=s[6],v=s[1],y=s[4],E=s[7],L=s[2],T=s[5],A=s[8];return r[0]=o*p+a*v+c*L,r[3]=o*_+a*y+c*T,r[6]=o*m+a*E+c*A,r[1]=l*p+h*v+u*L,r[4]=l*_+h*y+u*T,r[7]=l*m+h*E+u*A,r[2]=d*p+f*v+g*L,r[5]=d*_+f*y+g*T,r[8]=d*m+f*E+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let p=1/g;return t[0]=u*p,t[1]=(s*l-h*n)*p,t[2]=(a*n-s*o)*p,t[3]=d*p,t[4]=(h*e-s*c)*p,t[5]=(s*r-a*e)*p,t[6]=f*p,t[7]=(n*c-l*e)*p,t[8]=(o*e-n*r)*p,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Sa.makeScale(t,e)),this}rotate(t){return this.premultiply(Sa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Sa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Sa=new Kt;function Fu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function go(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Sf(){let i=go("canvas");return i.style.display="block",i}var Sh={};function lo(i){i in Sh||(Sh[i]=!0,console.warn(i))}function bf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function wf(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Tf(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var bh=new Kt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),wh=new Kt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Vs={[xi]:{transfer:uo,primaries:fo,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[on]:{transfer:Me,primaries:fo,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ko]:{transfer:uo,primaries:po,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(wh),fromReference:i=>i.applyMatrix3(bh)},[Nl]:{transfer:Me,primaries:po,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(wh),fromReference:i=>i.applyMatrix3(bh).convertLinearToSRGB()}},Af=new Set([xi,Ko]),ue={enabled:!0,_workingColorSpace:xi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Af.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=Vs[t].toReference,s=Vs[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Vs[i].primaries},getTransfer:function(i){return i===hi?uo:Vs[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Vs[t].luminanceCoefficients)}};function Ms(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ba(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Qi,Gc=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Qi===void 0&&(Qi=go("canvas")),Qi.width=t.width,Qi.height=t.height;let n=Qi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Qi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=go("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ms(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ms(e[n]/255)*255):e[n]=Ms(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Rf=0,_o=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Fn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(wa(s[o].image)):r.push(wa(s[o]))}else r=wa(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function wa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Cf=0,cn=class i extends $n{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Oi,s=Oi,r=Tn,o=Fi,a=Rn,c=Jn,l=i.DEFAULT_ANISOTROPY,h=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Fn(),this.name="",this.source=new _o(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new $(0,0),this.repeat=new $(1,1),this.center=new $(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bi:t.x=t.x-Math.floor(t.x);break;case Oi:t.x=t.x<0?0:1;break;case fc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bi:t.y=t.y-Math.floor(t.y);break;case Oi:t.y=t.y<0?0:1;break;case fc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=wu;cn.DEFAULT_ANISOTROPY=1;var me=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],p=c[2],_=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-p)<.01&&Math.abs(g-_)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+p)<.1&&Math.abs(g+_)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,E=(f+1)/2,L=(m+1)/2,T=(h+d)/4,A=(u+p)/4,U=(g+_)/4;return y>E&&y>L?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=A/n):E>L?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=T/s,r=U/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=U/r),this.set(n,s,r,e),this}let v=Math.sqrt((_-g)*(_-g)+(u-p)*(u-p)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(_-g)/v,this.y=(u-p)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Vc=class extends $n{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new cn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new _o(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},jn=class extends Vc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},xo=class extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Wc=class extends cn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],p=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=p;return}if(u!==p||c!==d||l!==f||h!==g){let _=1-a,m=c*d+l*f+h*g+u*p,v=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){let L=Math.sqrt(y),T=Math.atan2(L,m*v);_=Math.sin(_*T)/L,a=Math.sin(a*T)/L}let E=a*v;if(c=c*_+d*E,l=l*_+f*E,h=h*_+g*E,u=u*_+p*E,_===1-a){let L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Th.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Th.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ta.copy(this).projectOnVector(t),this.sub(Ta)}reflect(t){return this.sub(Ta.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ta=new C,Th=new Cn,Qn=class{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Rr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rr.copy(n.boundingBox)),Rr.applyMatrix4(t.matrixWorld),this.union(Rr)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ws),Cr.subVectors(this.max,Ws),ts.subVectors(t.a,Ws),es.subVectors(t.b,Ws),ns.subVectors(t.c,Ws),si.subVectors(es,ts),ri.subVectors(ns,es),Ai.subVectors(ts,ns);let e=[0,-si.z,si.y,0,-ri.z,ri.y,0,-Ai.z,Ai.y,si.z,0,-si.x,ri.z,0,-ri.x,Ai.z,0,-Ai.x,-si.y,si.x,0,-ri.y,ri.x,0,-Ai.y,Ai.x,0];return!Aa(e,ts,es,ns,Cr)||(e=[1,0,0,0,1,0,0,0,1],!Aa(e,ts,es,ns,Cr))?!1:(Pr.crossVectors(si,ri),e=[Pr.x,Pr.y,Pr.z],Aa(e,ts,es,ns,Cr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Vn=[new C,new C,new C,new C,new C,new C,new C,new C],En=new C,Rr=new Qn,ts=new C,es=new C,ns=new C,si=new C,ri=new C,Ai=new C,Ws=new C,Cr=new C,Pr=new C,Ri=new C;function Aa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ri.fromArray(i,r);let a=s.x*Math.abs(Ri.x)+s.y*Math.abs(Ri.y)+s.z*Math.abs(Ri.z),c=t.dot(Ri),l=e.dot(Ri),h=n.dot(Ri);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Pf=new Qn,Xs=new C,Ra=new C,gi=class{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Pf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xs.subVectors(t,this.center);let e=Xs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Xs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ra.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xs.copy(t.center).add(Ra)),this.expandByPoint(Xs.copy(t.center).sub(Ra))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Wn=new C,Ca=new C,Ir=new C,oi=new C,Pa=new C,Dr=new C,Ia=new C,Rs=class{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Wn.copy(this.origin).addScaledVector(this.direction,e),Wn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ca.copy(t).add(e).multiplyScalar(.5),Ir.copy(e).sub(t).normalize(),oi.copy(this.origin).sub(Ca);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ir),a=oi.dot(this.direction),c=-oi.dot(Ir),l=oi.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let p=1/h;u*=p,d*=p,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ca).addScaledVector(Ir,d),f}intersectSphere(t,e){Wn.subVectors(t.center,this.origin);let n=Wn.dot(this.direction),s=Wn.dot(Wn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Wn)!==null}intersectTriangle(t,e,n,s,r){Pa.subVectors(e,t),Dr.subVectors(n,t),Ia.crossVectors(Pa,Dr);let o=this.direction.dot(Ia),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;oi.subVectors(this.origin,t);let c=a*this.direction.dot(Dr.crossVectors(oi,Dr));if(c<0)return null;let l=a*this.direction.dot(Pa.cross(oi));if(l<0||c+l>o)return null;let h=-a*oi.dot(Ia);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ge=class i{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,g,p,_){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,p,_)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,p,_){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=p,m[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/is.setFromMatrixColumn(t,0).length(),r=1/is.setFromMatrixColumn(t,1).length(),o=1/is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,g=a*h,p=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-p*l,e[9]=-a*c,e[2]=p-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*h,f=c*u,g=l*h,p=l*u;e[0]=d+p*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=p+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*h,f=c*u,g=l*h,p=l*u;e[0]=d-p*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=p-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*h,f=o*u,g=a*h,p=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+p,e[1]=c*u,e[5]=p*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,f=o*l,g=a*c,p=a*l;e[0]=c*h,e[4]=p-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-p*u}else if(t.order==="XZY"){let d=o*c,f=o*l,g=a*c,p=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+p,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=p*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(If,t,Df)}lookAt(t,e,n){let s=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),ai.crossVectors(n,dn),ai.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),ai.crossVectors(n,dn)),ai.normalize(),Lr.crossVectors(dn,ai),s[0]=ai.x,s[4]=Lr.x,s[8]=dn.x,s[1]=ai.y,s[5]=Lr.y,s[9]=dn.y,s[2]=ai.z,s[6]=Lr.z,s[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],p=n[6],_=n[10],m=n[14],v=n[3],y=n[7],E=n[11],L=n[15],T=s[0],A=s[4],U=s[8],k=s[12],M=s[1],b=s[5],H=s[9],B=s[13],X=s[2],nt=s[6],V=s[10],at=s[14],K=s[3],_t=s[7],vt=s[11],Mt=s[15];return r[0]=o*T+a*M+c*X+l*K,r[4]=o*A+a*b+c*nt+l*_t,r[8]=o*U+a*H+c*V+l*vt,r[12]=o*k+a*B+c*at+l*Mt,r[1]=h*T+u*M+d*X+f*K,r[5]=h*A+u*b+d*nt+f*_t,r[9]=h*U+u*H+d*V+f*vt,r[13]=h*k+u*B+d*at+f*Mt,r[2]=g*T+p*M+_*X+m*K,r[6]=g*A+p*b+_*nt+m*_t,r[10]=g*U+p*H+_*V+m*vt,r[14]=g*k+p*B+_*at+m*Mt,r[3]=v*T+y*M+E*X+L*K,r[7]=v*A+y*b+E*nt+L*_t,r[11]=v*U+y*H+E*V+L*vt,r[15]=v*k+y*B+E*at+L*Mt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],p=t[7],_=t[11],m=t[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+p*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+_*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+m*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],p=t[13],_=t[14],m=t[15],v=u*_*l-p*d*l+p*c*f-a*_*f-u*c*m+a*d*m,y=g*d*l-h*_*l-g*c*f+o*_*f+h*c*m-o*d*m,E=h*p*l-g*u*l+g*a*f-o*p*f-h*a*m+o*u*m,L=g*u*c-h*p*c-g*a*d+o*p*d+h*a*_-o*u*_,T=e*v+n*y+s*E+r*L;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/T;return t[0]=v*A,t[1]=(p*d*r-u*_*r-p*s*f+n*_*f+u*s*m-n*d*m)*A,t[2]=(a*_*r-p*c*r+p*s*l-n*_*l-a*s*m+n*c*m)*A,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*A,t[4]=y*A,t[5]=(h*_*r-g*d*r+g*s*f-e*_*f-h*s*m+e*d*m)*A,t[6]=(g*c*r-o*_*r-g*s*l+e*_*l+o*s*m-e*c*m)*A,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*A,t[8]=E*A,t[9]=(g*u*r-h*p*r-g*n*f+e*p*f+h*n*m-e*u*m)*A,t[10]=(o*p*r-g*a*r+g*n*l-e*p*l-o*n*m+e*a*m)*A,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*A,t[12]=L*A,t[13]=(h*p*s-g*u*s+g*n*d-e*p*d-h*n*_+e*u*_)*A,t[14]=(g*a*s-o*p*s-g*n*c+e*p*c+o*n*_-e*a*_)*A,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,p=o*h,_=o*u,m=a*u,v=c*l,y=c*h,E=c*u,L=n.x,T=n.y,A=n.z;return s[0]=(1-(p+m))*L,s[1]=(f+E)*L,s[2]=(g-y)*L,s[3]=0,s[4]=(f-E)*T,s[5]=(1-(d+m))*T,s[6]=(_+v)*T,s[7]=0,s[8]=(g+y)*A,s[9]=(_-v)*A,s[10]=(1-(d+p))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=is.set(s[0],s[1],s[2]).length(),o=is.set(s[4],s[5],s[6]).length(),a=is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Sn.copy(this);let l=1/r,h=1/o,u=1/a;return Sn.elements[0]*=l,Sn.elements[1]*=l,Sn.elements[2]*=l,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=u,Sn.elements[9]*=u,Sn.elements[10]*=u,e.setFromRotationMatrix(Sn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Kn){let c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),f,g;if(a===Kn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===mo)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Kn){let c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*l,f=(n+s)*h,g,p;if(a===Kn)g=(o+r)*u,p=-2*u;else if(a===mo)g=r*u,p=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=p,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},is=new C,Sn=new ge,If=new C(0,0,0),Df=new C(1,1,1),ai=new C,Lr=new C,dn=new C,Ah=new ge,Rh=new Cn,Bn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ne(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ah.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ah,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Rh.setFromEuler(this),this.setFromQuaternion(Rh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Bn.DEFAULT_ORDER="XYZ";var yo=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Lf=0,Ch=new C,ss=new Cn,Xn=new ge,Ur=new C,Ys=new C,Uf=new C,Nf=new Cn,Ph=new C(1,0,0),Ih=new C(0,1,0),Dh=new C(0,0,1),Lh={type:"added"},Of={type:"removed"},rs={type:"childadded",child:null},Da={type:"childremoved",child:null},Te=class i extends $n{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new C,e=new Bn,n=new Cn,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ge},normalMatrix:{value:new Kt}}),this.matrix=new ge,this.matrixWorld=new ge,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.multiply(ss),this}rotateOnWorldAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.premultiply(ss),this}rotateX(t){return this.rotateOnAxis(Ph,t)}rotateY(t){return this.rotateOnAxis(Ih,t)}rotateZ(t){return this.rotateOnAxis(Dh,t)}translateOnAxis(t,e){return Ch.copy(t).applyQuaternion(this.quaternion),this.position.add(Ch.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ph,t)}translateY(t){return this.translateOnAxis(Ih,t)}translateZ(t){return this.translateOnAxis(Dh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ur.copy(t):Ur.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Ys,Ur,this.up):Xn.lookAt(Ur,Ys,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(Xn),this.quaternion.premultiply(ss.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Lh),rs.child=t,this.dispatchEvent(rs),rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Of),Da.child=t,this.dispatchEvent(Da),Da.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Lh),rs.child=t,this.dispatchEvent(rs),rs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,t,Uf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,Nf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Te.DEFAULT_UP=new C(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bn=new C,Yn=new C,La=new C,qn=new C,os=new C,as=new C,Uh=new C,Ua=new C,Na=new C,Oa=new C,Fa=new me,Ba=new me,Ha=new me,ui=class i{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),bn.subVectors(t,e),s.cross(bn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){bn.subVectors(s,e),Yn.subVectors(n,e),La.subVectors(t,e);let o=bn.dot(bn),a=bn.dot(Yn),c=bn.dot(La),l=Yn.dot(Yn),h=Yn.dot(La),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,qn.x),c.addScaledVector(o,qn.y),c.addScaledVector(a,qn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Fa.setScalar(0),Ba.setScalar(0),Ha.setScalar(0),Fa.fromBufferAttribute(t,e),Ba.fromBufferAttribute(t,n),Ha.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Fa,r.x),o.addScaledVector(Ba,r.y),o.addScaledVector(Ha,r.z),o}static isFrontFacing(t,e,n,s){return bn.subVectors(n,e),Yn.subVectors(t,e),bn.cross(Yn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return bn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),bn.cross(Yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;os.subVectors(s,n),as.subVectors(r,n),Ua.subVectors(t,n);let c=os.dot(Ua),l=as.dot(Ua);if(c<=0&&l<=0)return e.copy(n);Na.subVectors(t,s);let h=os.dot(Na),u=as.dot(Na);if(h>=0&&u<=h)return e.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(os,o);Oa.subVectors(t,r);let f=os.dot(Oa),g=as.dot(Oa);if(g>=0&&f<=g)return e.copy(r);let p=f*l-c*g;if(p<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(as,a);let _=h*g-f*u;if(_<=0&&u-h>=0&&f-g>=0)return Uh.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(Uh,a);let m=1/(_+p+d);return o=p*m,a=d*m,e.copy(n).addScaledVector(os,o).addScaledVector(as,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function za(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Pt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=on){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ue.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ue.workingColorSpace){return this.r=t,this.g=e,this.b=n,ue.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ue.workingColorSpace){if(t=Ol(t,1),e=Ne(e,0,1),n=Ne(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=za(o,r,t+1/3),this.g=za(o,r,t),this.b=za(o,r,t-1/3)}return ue.toWorkingColorSpace(this,s),this}setStyle(t,e=on){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=on){let n=Bu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ms(t.r),this.g=Ms(t.g),this.b=Ms(t.b),this}copyLinearToSRGB(t){return this.r=ba(t.r),this.g=ba(t.g),this.b=ba(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=on){return ue.fromWorkingColorSpace(Ke.copy(this),t),Math.round(Ne(Ke.r*255,0,255))*65536+Math.round(Ne(Ke.g*255,0,255))*256+Math.round(Ne(Ke.b*255,0,255))}getHexString(t=on){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ue.workingColorSpace){ue.fromWorkingColorSpace(Ke.copy(this),e);let n=Ke.r,s=Ke.g,r=Ke.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ue.workingColorSpace){return ue.fromWorkingColorSpace(Ke.copy(this),e),t.r=Ke.r,t.g=Ke.g,t.b=Ke.b,t}getStyle(t=on){ue.fromWorkingColorSpace(Ke.copy(this),t);let e=Ke.r,n=Ke.g,s=Ke.b;return t!==on?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ci),this.setHSL(ci.h+t,ci.s+e,ci.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ci),t.getHSL(Nr);let n=nr(ci.h,Nr.h,e),s=nr(ci.s,Nr.s,e),r=nr(ci.l,Nr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ke=new Pt;Pt.NAMES=Bu;var Ff=0,Hn=class extends $n{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Fn(),this.name="",this.type="Material",this.blending=ys,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nc,this.blendDst=ic,this.blendEquation=Ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(n.blending=this.blending),this.side!==mi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==nc&&(n.blendSrc=this.blendSrc),this.blendDst!==ic&&(n.blendDst=this.blendDst),this.blendEquation!==Ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ss&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},$t=class extends Hn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=bu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ue=new C,Or=new $,Oe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=kc,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Or.fromBufferAttribute(this,e),Or.applyMatrix3(t),this.setXY(e,Or.x,Or.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=An(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=An(e,this.array)),e}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=An(e,this.array)),e}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=An(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=An(e,this.array)),e}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),s=fe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),s=fe(s,this.array),r=fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==kc&&(t.usage=this.usage),t}};var vo=class extends Oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Mo=class extends Oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ft=class extends Oe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Bf=0,gn=new ge,ka=new Te,cs=new C,fn=new Qn,qs=new Qn,ze=new C,ae=class i extends $n{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Fu(t)?Mo:vo)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return ka.lookAt(t),ka.updateMatrix(),this.applyMatrix4(ka.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ft(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(ze.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(ze),ze.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(ze)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){let n=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];qs.setFromBufferAttribute(a),this.morphTargetsRelative?(ze.addVectors(fn.min,qs.min),fn.expandByPoint(ze),ze.addVectors(fn.max,qs.max),fn.expandByPoint(ze)):(fn.expandByPoint(qs.min),fn.expandByPoint(qs.max))}fn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ze.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ze));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)ze.fromBufferAttribute(a,l),c&&(cs.fromBufferAttribute(t,l),ze.add(cs)),s=Math.max(s,n.distanceToSquared(ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oe(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let U=0;U<n.count;U++)a[U]=new C,c[U]=new C;let l=new C,h=new C,u=new C,d=new $,f=new $,g=new $,p=new C,_=new C;function m(U,k,M){l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,k),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,U),f.fromBufferAttribute(r,k),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let b=1/(f.x*g.y-g.x*f.y);isFinite(b)&&(p.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(b),_.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(b),a[U].add(p),a[k].add(p),a[M].add(p),c[U].add(_),c[k].add(_),c[M].add(_))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let U=0,k=v.length;U<k;++U){let M=v[U],b=M.start,H=M.count;for(let B=b,X=b+H;B<X;B+=3)m(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let y=new C,E=new C,L=new C,T=new C;function A(U){L.fromBufferAttribute(s,U),T.copy(L);let k=a[U];y.copy(k),y.sub(L.multiplyScalar(L.dot(k))).normalize(),E.crossVectors(T,k);let b=E.dot(c[U])<0?-1:1;o.setXYZW(U,y.x,y.y,y.z,b)}for(let U=0,k=v.length;U<k;++U){let M=v[U],b=M.start,H=M.count;for(let B=b,X=b+H;B<X;B+=3)A(t.getX(B+0)),A(t.getX(B+1)),A(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new C,r=new C,o=new C,a=new C,c=new C,l=new C,h=new C,u=new C;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),p=t.getX(d+1),_=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,p),o.fromBufferAttribute(e,_),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(p,c.x,c.y,c.z),n.setXYZ(_,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ze.fromBufferAttribute(t,e),ze.normalize(),t.setXYZ(e,ze.x,ze.y,ze.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let p=0,_=c.length;p<_;p++){a.isInterleavedBufferAttribute?f=c[p]*a.data.stride+a.offset:f=c[p]*h;for(let m=0;m<h;m++)d[g++]=l[f++]}return new Oe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Nh=new ge,Ci=new Rs,Fr=new gi,Oh=new C,Br=new C,Hr=new C,zr=new C,Ga=new C,kr=new C,Fh=new C,Gr=new C,J=class extends Te{constructor(t=new ae,e=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){kr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Ga.fromBufferAttribute(u,t),o?kr.addScaledVector(Ga,h):kr.addScaledVector(Ga.sub(e),h))}e.add(kr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(r),Ci.copy(t.ray).recast(t.near),!(Fr.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(Fr,Oh)===null||Ci.origin.distanceToSquared(Oh)>(t.far-t.near)**2))&&(Nh.copy(r).invert(),Ci.copy(t.ray).applyMatrix4(Nh),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ci)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,p=d.length;g<p;g++){let _=d[g],m=o[_.materialIndex],v=Math.max(_.start,f.start),y=Math.min(a.count,Math.min(_.start+_.count,f.start+f.count));for(let E=v,L=y;E<L;E+=3){let T=a.getX(E),A=a.getX(E+1),U=a.getX(E+2);s=Vr(this,m,t,n,l,h,u,T,A,U),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),p=Math.min(a.count,f.start+f.count);for(let _=g,m=p;_<m;_+=3){let v=a.getX(_),y=a.getX(_+1),E=a.getX(_+2);s=Vr(this,o,t,n,l,h,u,v,y,E),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,p=d.length;g<p;g++){let _=d[g],m=o[_.materialIndex],v=Math.max(_.start,f.start),y=Math.min(c.count,Math.min(_.start+_.count,f.start+f.count));for(let E=v,L=y;E<L;E+=3){let T=E,A=E+1,U=E+2;s=Vr(this,m,t,n,l,h,u,T,A,U),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),p=Math.min(c.count,f.start+f.count);for(let _=g,m=p;_<m;_+=3){let v=_,y=_+1,E=_+2;s=Vr(this,o,t,n,l,h,u,v,y,E),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}}};function Hf(i,t,e,n,s,r,o,a){let c;if(t.side===$e?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===mi,a),c===null)return null;Gr.copy(a),Gr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Gr);return l<e.near||l>e.far?null:{distance:l,point:Gr.clone(),object:i}}function Vr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Br),i.getVertexPosition(c,Hr),i.getVertexPosition(l,zr);let h=Hf(i,t,e,n,Br,Hr,zr,Fh);if(h){let u=new C;ui.getBarycoord(Fh,Br,Hr,zr,u),s&&(h.uv=ui.getInterpolatedAttribute(s,a,c,l,u,new $)),r&&(h.uv1=ui.getInterpolatedAttribute(r,a,c,l,u,new $)),o&&(h.normal=ui.getInterpolatedAttribute(o,a,c,l,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new C,materialIndex:0};ui.getNormal(Br,Hr,zr,d.normal),h.face=d,h.barycoord=u}return h}var zi=class i extends ae{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ft(l,3)),this.setAttribute("normal",new Ft(h,3)),this.setAttribute("uv",new Ft(u,2));function g(p,_,m,v,y,E,L,T,A,U,k){let M=E/A,b=L/U,H=E/2,B=L/2,X=T/2,nt=A+1,V=U+1,at=0,K=0,_t=new C;for(let vt=0;vt<V;vt++){let Mt=vt*b-B;for(let Qt=0;Qt<nt;Qt++){let re=Qt*M-H;_t[p]=re*v,_t[_]=Mt*y,_t[m]=X,l.push(_t.x,_t.y,_t.z),_t[p]=0,_t[_]=0,_t[m]=T>0?1:-1,h.push(_t.x,_t.y,_t.z),u.push(Qt/A),u.push(1-vt/U),at+=1}}for(let vt=0;vt<U;vt++)for(let Mt=0;Mt<A;Mt++){let Qt=d+Mt+nt*vt,re=d+Mt+nt*(vt+1),Q=d+(Mt+1)+nt*(vt+1),ct=d+(Mt+1)+nt*vt;c.push(Qt,re,ct),c.push(re,Q,ct),K+=6}a.addGroup(f,K,k),f+=K,d+=at}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Cs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function tn(i){let t={};for(let e=0;e<i.length;e++){let n=Cs(i[e]);for(let s in n)t[s]=n[s]}return t}function zf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Hu(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ue.workingColorSpace}var kf={clone:Cs,merge:tn},Gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,en=class extends Hn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gf,this.fragmentShader=Vf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Cs(t.uniforms),this.uniformsGroups=zf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Eo=class extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ge,this.projectionMatrix=new ge,this.projectionMatrixInverse=new ge,this.coordinateSystem=Kn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},li=new C,Bh=new $,Hh=new $,Je=class extends Eo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(er*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(li.x,li.y).multiplyScalar(-t/li.z),li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(li.x,li.y).multiplyScalar(-t/li.z)}getViewSize(t,e){return this.getViewBounds(t,Bh,Hh),e.subVectors(Hh,Bh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(er*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ls=-90,hs=1,Xc=class extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Je(ls,hs,t,e);s.layers=this.layers,this.add(s);let r=new Je(ls,hs,t,e);r.layers=this.layers,this.add(r);let o=new Je(ls,hs,t,e);o.layers=this.layers,this.add(o);let a=new Je(ls,hs,t,e);a.layers=this.layers,this.add(a);let c=new Je(ls,hs,t,e);c.layers=this.layers,this.add(c);let l=new Je(ls,hs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Kn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===mo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=p,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},So=class extends cn{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:bs,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Yc=class extends jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new So(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new zi(5,5,5),r=new en({name:"CubemapFromEquirect",uniforms:Cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:di});r.uniforms.tEquirect.value=e;let o=new J(s,r),a=e.minFilter;return e.minFilter===Fi&&(e.minFilter=Tn),new Xc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Va=new C,Wf=new C,Xf=new Kt,wn=class{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Va.subVectors(n,e).cross(Wf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Va),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Xf.getNormalMatrix(t),s=this.coplanarPoint(Va).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Pi=new gi,Wr=new C,cr=class{constructor(t=new wn,e=new wn,n=new wn,s=new wn,r=new wn,o=new wn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Kn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],p=s[10],_=s[11],m=s[12],v=s[13],y=s[14],E=s[15];if(n[0].setComponents(c-r,d-l,_-f,E-m).normalize(),n[1].setComponents(c+r,d+l,_+f,E+m).normalize(),n[2].setComponents(c+o,d+h,_+g,E+v).normalize(),n[3].setComponents(c-o,d-h,_-g,E-v).normalize(),n[4].setComponents(c-a,d-u,_-p,E-y).normalize(),e===Kn)n[5].setComponents(c+a,d+u,_+p,E+y).normalize();else if(e===mo)n[5].setComponents(a,u,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(t){return Pi.center.set(0,0,0),Pi.radius=.7071067811865476,Pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Wr.x=s.normal.x>0?t.max.x:t.min.x,Wr.y=s.normal.y>0?t.max.y:t.min.y,Wr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function zu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Yf(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],p=u[f];p.start<=g.start+g.count+1?g.count=Math.max(g.count,p.start+p.count-g.start):(++d,u[d]=p)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let p=u[f];i.bufferSubData(l,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Ae=class i extends ae{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],p=[],_=[];for(let m=0;m<h;m++){let v=m*d-o;for(let y=0;y<l;y++){let E=y*u-r;g.push(E,-v,0),p.push(0,0,1),_.push(y/a),_.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<a;v++){let y=v+l*m,E=v+l*(m+1),L=v+1+l*(m+1),T=v+1+l*m;f.push(y,E,T),f.push(E,L,T)}this.setIndex(f),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(p,3)),this.setAttribute("uv",new Ft(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zf=`#ifdef USE_ALPHAHASH
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
#endif`,Kf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$f=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qf=`#ifdef USE_AOMAP
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
#endif`,tp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ep=`#ifdef USE_BATCHING
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
#endif`,np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ip=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,op=`#ifdef USE_IRIDESCENCE
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
#endif`,ap=`#ifdef USE_BUMPMAP
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
#endif`,cp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,gp=`#define PI 3.141592653589793
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
} // validated`,_p=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xp=`vec3 transformedNormal = objectNormal;
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
#endif`,yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sp="gl_FragColor = linearToOutputTexel( gl_FragColor );",bp=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wp=`#ifdef USE_ENVMAP
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
#endif`,Tp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ap=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Pp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Up=`#ifdef USE_GRADIENTMAP
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
}`,Np=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bp=`uniform bool receiveShadow;
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
#endif`,Hp=`#ifdef USE_ENVMAP
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
#endif`,zp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wp=`PhysicalMaterial material;
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
#endif`,Xp=`struct PhysicalMaterial {
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
}`,Yp=`
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
#endif`,qp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$p=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,t0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,e0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,n0=`#if defined( USE_POINTS_UV )
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
#endif`,i0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,s0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,r0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,o0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,a0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c0=`#ifdef USE_MORPHTARGETS
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
#endif`,l0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,h0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,u0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,d0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,f0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,m0=`#ifdef USE_NORMALMAP
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
#endif`,g0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,x0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,y0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,v0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,M0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,E0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,S0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,b0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,w0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,T0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,A0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,R0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
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
#endif`,C0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,P0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,I0=`float getShadowMask() {
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
}`,D0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,L0=`#ifdef USE_SKINNING
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
#endif`,U0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,N0=`#ifdef USE_SKINNING
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
#endif`,O0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,F0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,B0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,H0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,z0=`#ifdef USE_TRANSMISSION
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
#endif`,k0=`#ifdef USE_TRANSMISSION
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
#endif`,G0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,W0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,X0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Y0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,q0=`uniform sampler2D t2D;
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
}`,Z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,J0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j0=`#include <common>
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
}`,Q0=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,tm=`#define DISTANCE
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
}`,em=`#define DISTANCE
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`uniform float scale;
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
}`,rm=`uniform vec3 diffuse;
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
}`,om=`#include <common>
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
}`,am=`uniform vec3 diffuse;
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
}`,cm=`#define LAMBERT
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
}`,lm=`#define LAMBERT
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
}`,hm=`#define MATCAP
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
}`,um=`#define MATCAP
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
}`,dm=`#define NORMAL
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
}`,fm=`#define NORMAL
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
}`,pm=`#define PHONG
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
}`,mm=`#define PHONG
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
}`,gm=`#define STANDARD
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
}`,_m=`#define STANDARD
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
}`,xm=`#define TOON
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
}`,ym=`#define TOON
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
}`,vm=`uniform float size;
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
}`,Mm=`uniform vec3 diffuse;
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
}`,Em=`#include <common>
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
}`,Sm=`uniform vec3 color;
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
}`,bm=`uniform float rotation;
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
}`,wm=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:qf,alphahash_pars_fragment:Zf,alphamap_fragment:Kf,alphamap_pars_fragment:Jf,alphatest_fragment:$f,alphatest_pars_fragment:jf,aomap_fragment:Qf,aomap_pars_fragment:tp,batching_pars_vertex:ep,batching_vertex:np,begin_vertex:ip,beginnormal_vertex:sp,bsdfs:rp,iridescence_fragment:op,bumpmap_pars_fragment:ap,clipping_planes_fragment:cp,clipping_planes_pars_fragment:lp,clipping_planes_pars_vertex:hp,clipping_planes_vertex:up,color_fragment:dp,color_pars_fragment:fp,color_pars_vertex:pp,color_vertex:mp,common:gp,cube_uv_reflection_fragment:_p,defaultnormal_vertex:xp,displacementmap_pars_vertex:yp,displacementmap_vertex:vp,emissivemap_fragment:Mp,emissivemap_pars_fragment:Ep,colorspace_fragment:Sp,colorspace_pars_fragment:bp,envmap_fragment:wp,envmap_common_pars_fragment:Tp,envmap_pars_fragment:Ap,envmap_pars_vertex:Rp,envmap_physical_pars_fragment:Hp,envmap_vertex:Cp,fog_vertex:Pp,fog_pars_vertex:Ip,fog_fragment:Dp,fog_pars_fragment:Lp,gradientmap_pars_fragment:Up,lightmap_pars_fragment:Np,lights_lambert_fragment:Op,lights_lambert_pars_fragment:Fp,lights_pars_begin:Bp,lights_toon_fragment:zp,lights_toon_pars_fragment:kp,lights_phong_fragment:Gp,lights_phong_pars_fragment:Vp,lights_physical_fragment:Wp,lights_physical_pars_fragment:Xp,lights_fragment_begin:Yp,lights_fragment_maps:qp,lights_fragment_end:Zp,logdepthbuf_fragment:Kp,logdepthbuf_pars_fragment:Jp,logdepthbuf_pars_vertex:$p,logdepthbuf_vertex:jp,map_fragment:Qp,map_pars_fragment:t0,map_particle_fragment:e0,map_particle_pars_fragment:n0,metalnessmap_fragment:i0,metalnessmap_pars_fragment:s0,morphinstance_vertex:r0,morphcolor_vertex:o0,morphnormal_vertex:a0,morphtarget_pars_vertex:c0,morphtarget_vertex:l0,normal_fragment_begin:h0,normal_fragment_maps:u0,normal_pars_fragment:d0,normal_pars_vertex:f0,normal_vertex:p0,normalmap_pars_fragment:m0,clearcoat_normal_fragment_begin:g0,clearcoat_normal_fragment_maps:_0,clearcoat_pars_fragment:x0,iridescence_pars_fragment:y0,opaque_fragment:v0,packing:M0,premultiplied_alpha_fragment:E0,project_vertex:S0,dithering_fragment:b0,dithering_pars_fragment:w0,roughnessmap_fragment:T0,roughnessmap_pars_fragment:A0,shadowmap_pars_fragment:R0,shadowmap_pars_vertex:C0,shadowmap_vertex:P0,shadowmask_pars_fragment:I0,skinbase_vertex:D0,skinning_pars_vertex:L0,skinning_vertex:U0,skinnormal_vertex:N0,specularmap_fragment:O0,specularmap_pars_fragment:F0,tonemapping_fragment:B0,tonemapping_pars_fragment:H0,transmission_fragment:z0,transmission_pars_fragment:k0,uv_pars_fragment:G0,uv_pars_vertex:V0,uv_vertex:W0,worldpos_vertex:X0,background_vert:Y0,background_frag:q0,backgroundCube_vert:Z0,backgroundCube_frag:K0,cube_vert:J0,cube_frag:$0,depth_vert:j0,depth_frag:Q0,distanceRGBA_vert:tm,distanceRGBA_frag:em,equirect_vert:nm,equirect_frag:im,linedashed_vert:sm,linedashed_frag:rm,meshbasic_vert:om,meshbasic_frag:am,meshlambert_vert:cm,meshlambert_frag:lm,meshmatcap_vert:hm,meshmatcap_frag:um,meshnormal_vert:dm,meshnormal_frag:fm,meshphong_vert:pm,meshphong_frag:mm,meshphysical_vert:gm,meshphysical_frag:_m,meshtoon_vert:xm,meshtoon_frag:ym,points_vert:vm,points_frag:Mm,shadow_vert:Em,shadow_frag:Sm,sprite_vert:bm,sprite_frag:wm},mt={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new $(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new $(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Nn={basic:{uniforms:tn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:tn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:tn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:tn([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:tn([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:tn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:tn([mt.points,mt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:tn([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:tn([mt.common,mt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:tn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:tn([mt.sprite,mt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:tn([mt.common,mt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:tn([mt.lights,mt.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Nn.physical={uniforms:tn([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new $(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new $},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new $},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};var Xr={r:0,b:0,g:0},Ii=new Bn,Tm=new ge;function Am(i,t,e,n,s,r,o){let a=new Pt(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?e:t).get(y)),y}function p(v){let y=!1,E=g(v);E===null?m(a,c):E&&E.isColor&&(m(E,1),y=!0);let L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(v,y){let E=g(y);E&&(E.isCubeTexture||E.mapping===Zo)?(h===void 0&&(h=new J(new zi(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:Cs(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ii.copy(y.backgroundRotation),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Tm.makeRotationFromEuler(Ii)),h.material.toneMapped=ue.getTransfer(E.colorSpace)!==Me,(u!==E||d!==E.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new J(new Ae(2,2),new en({name:"BackgroundMaterial",uniforms:Cs(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ue.getTransfer(E.colorSpace)!==Me,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,y){v.getRGB(Xr,Hu(i)),n.buffers.color.setClear(Xr.r,Xr.g,Xr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,m(a,c)},render:p,addToRenderList:_}}function Rm(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(M,b,H,B,X){let nt=!1,V=u(B,H,b);r!==V&&(r=V,l(r.object)),nt=f(M,B,H,X),nt&&g(M,B,H,X),X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),(nt||o)&&(o=!1,E(M,b,H,B),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,b,H){let B=H.wireframe===!0,X=n[M.id];X===void 0&&(X={},n[M.id]=X);let nt=X[b.id];nt===void 0&&(nt={},X[b.id]=nt);let V=nt[B];return V===void 0&&(V=d(c()),nt[B]=V),V}function d(M){let b=[],H=[],B=[];for(let X=0;X<e;X++)b[X]=0,H[X]=0,B[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:H,attributeDivisors:B,object:M,attributes:{},index:null}}function f(M,b,H,B){let X=r.attributes,nt=b.attributes,V=0,at=H.getAttributes();for(let K in at)if(at[K].location>=0){let vt=X[K],Mt=nt[K];if(Mt===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(Mt=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(Mt=M.instanceColor)),vt===void 0||vt.attribute!==Mt||Mt&&vt.data!==Mt.data)return!0;V++}return r.attributesNum!==V||r.index!==B}function g(M,b,H,B){let X={},nt=b.attributes,V=0,at=H.getAttributes();for(let K in at)if(at[K].location>=0){let vt=nt[K];vt===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(vt=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(vt=M.instanceColor));let Mt={};Mt.attribute=vt,vt&&vt.data&&(Mt.data=vt.data),X[K]=Mt,V++}r.attributes=X,r.attributesNum=V,r.index=B}function p(){let M=r.newAttributes;for(let b=0,H=M.length;b<H;b++)M[b]=0}function _(M){m(M,0)}function m(M,b){let H=r.newAttributes,B=r.enabledAttributes,X=r.attributeDivisors;H[M]=1,B[M]===0&&(i.enableVertexAttribArray(M),B[M]=1),X[M]!==b&&(i.vertexAttribDivisor(M,b),X[M]=b)}function v(){let M=r.newAttributes,b=r.enabledAttributes;for(let H=0,B=b.length;H<B;H++)b[H]!==M[H]&&(i.disableVertexAttribArray(H),b[H]=0)}function y(M,b,H,B,X,nt,V){V===!0?i.vertexAttribIPointer(M,b,H,X,nt):i.vertexAttribPointer(M,b,H,B,X,nt)}function E(M,b,H,B){p();let X=B.attributes,nt=H.getAttributes(),V=b.defaultAttributeValues;for(let at in nt){let K=nt[at];if(K.location>=0){let _t=X[at];if(_t===void 0&&(at==="instanceMatrix"&&M.instanceMatrix&&(_t=M.instanceMatrix),at==="instanceColor"&&M.instanceColor&&(_t=M.instanceColor)),_t!==void 0){let vt=_t.normalized,Mt=_t.itemSize,Qt=t.get(_t);if(Qt===void 0)continue;let re=Qt.buffer,Q=Qt.type,ct=Qt.bytesPerElement,At=Q===i.INT||Q===i.UNSIGNED_INT||_t.gpuType===Rl;if(_t.isInterleavedBufferAttribute){let gt=_t.data,Ht=gt.stride,Bt=_t.offset;if(gt.isInstancedInterleavedBuffer){for(let Xt=0;Xt<K.locationSize;Xt++)m(K.location+Xt,gt.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let Xt=0;Xt<K.locationSize;Xt++)_(K.location+Xt);i.bindBuffer(i.ARRAY_BUFFER,re);for(let Xt=0;Xt<K.locationSize;Xt++)y(K.location+Xt,Mt/K.locationSize,Q,vt,Ht*ct,(Bt+Mt/K.locationSize*Xt)*ct,At)}else{if(_t.isInstancedBufferAttribute){for(let gt=0;gt<K.locationSize;gt++)m(K.location+gt,_t.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let gt=0;gt<K.locationSize;gt++)_(K.location+gt);i.bindBuffer(i.ARRAY_BUFFER,re);for(let gt=0;gt<K.locationSize;gt++)y(K.location+gt,Mt/K.locationSize,Q,vt,Mt*ct,Mt/K.locationSize*gt*ct,At)}}else if(V!==void 0){let vt=V[at];if(vt!==void 0)switch(vt.length){case 2:i.vertexAttrib2fv(K.location,vt);break;case 3:i.vertexAttrib3fv(K.location,vt);break;case 4:i.vertexAttrib4fv(K.location,vt);break;default:i.vertexAttrib1fv(K.location,vt)}}}}v()}function L(){U();for(let M in n){let b=n[M];for(let H in b){let B=b[H];for(let X in B)h(B[X].object),delete B[X];delete b[H]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let b=n[M.id];for(let H in b){let B=b[H];for(let X in B)h(B[X].object),delete B[X];delete b[H]}delete n[M.id]}function A(M){for(let b in n){let H=n[b];if(H[M.id]===void 0)continue;let B=H[M.id];for(let X in B)h(B[X].object),delete B[X];delete H[M.id]}}function U(){k(),o=!0,r!==s&&(r=s,l(r.object))}function k(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:k,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:p,enableAttribute:_,disableUnusedAttributes:v}}function Cm(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let p=0;p<u;p++)g+=h[p];for(let p=0;p<d.length;p++)e.update(g,n,d[p])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Pm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Rn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let U=A===mr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Jn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==On&&!U)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(d===!0){let A=t.get("EXT_clip_control");A.clipControlEXT(A.LOWER_LEFT_EXT,A.ZERO_TO_ONE_EXT)}let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:p,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:E,vertexTextures:L,maxSamples:T}}function Im(i){let t=this,e=null,n=0,s=!1,r=!1,o=new wn,a=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,p=u.clipIntersection,_=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!_)r?h(null):l();else{let v=r?0:n,y=v*4,E=m.clippingState||null;c.value=E,E=h(g,d,y,f);for(let L=0;L!==y;++L)E[L]=e[L];m.clippingState=E,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){let p=u!==null?u.length:0,_=null;if(p!==0){if(_=c.value,g!==!0||_===null){let m=f+p*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(_===null||_.length<m)&&(_=new Float32Array(m));for(let y=0,E=f;y!==p;++y,E+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(_,E),_[E+3]=o.constant}c.value=_,c.needsUpdate=!0}return t.numPlanes=p,t.numIntersection=0,_}}function Dm(i){let t=new WeakMap;function e(o,a){return a===uc?o.mapping=bs:a===dc&&(o.mapping=ws),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===uc||a===dc)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Yc(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var bo=class extends Eo{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},_s=4,zh=[.125,.215,.35,.446,.526,.582],Ni=20,Wa=new bo,kh=new Pt,Xa=null,Ya=0,qa=0,Za=!1,Li=(1+Math.sqrt(5))/2,us=1/Li,Gh=[new C(-Li,us,0),new C(Li,us,0),new C(-us,0,Li),new C(us,0,Li),new C(0,Li,-us),new C(0,Li,us),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],wo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Xa=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Xa,Ya,qa),this._renderer.xr.enabled=Za,t.scissorTest=!1,Yr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===bs||t.mapping===ws?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Xa=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:mr,format:Rn,colorSpace:xi,depthBuffer:!1},s=Vh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vh(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Lm(r)),this._blurMaterial=Um(r,t,e)}return s}_compileMaterial(t){let e=new J(this._lodPlanes[0],t);this._renderer.compile(e,Wa)}_sceneToCubeUV(t,e,n,s){let a=new Je(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(kh),h.toneMapping=fi,h.autoClear=!1;let f=new $t({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),g=new J(new zi,f),p=!1,_=t.background;_?_.isColor&&(f.color.copy(_),t.background=null,p=!0):(f.color.copy(kh),p=!0);for(let m=0;m<6;m++){let v=m%3;v===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):v===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));let y=this._cubeSize;Yr(s,v*y,m>2?y:0,y,y),h.setRenderTarget(s),p&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=_}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===bs||t.mapping===ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wh());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new J(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Yr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Wa)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Gh[(s-r-1)%Gh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new J(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ni-1),p=r/g,_=isFinite(r)?1+Math.floor(h*p):Ni;_>Ni&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Ni}`);let m=[],v=0;for(let A=0;A<Ni;++A){let U=A/p,k=Math.exp(-U*U/2);m.push(k),A===0?v+=k:A<_&&(v+=2*k)}for(let A=0;A<m.length;A++)m[A]=m[A]/v;d.envMap.value=t.texture,d.samples.value=_,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let E=this._sizeLods[s],L=3*E*(s>y-_s?s-y+_s:0),T=4*(this._cubeSize-E);Yr(e,L,T,3*E,2*E),c.setRenderTarget(e),c.render(u,Wa)}};function Lm(i){let t=[],e=[],n=[],s=i,r=i-_s+1+zh.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-_s?c=zh[o-i+_s-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,p=3,_=2,m=1,v=new Float32Array(p*g*f),y=new Float32Array(_*g*f),E=new Float32Array(m*g*f);for(let T=0;T<f;T++){let A=T%3*2/3-1,U=T>2?0:-1,k=[A,U,0,A+2/3,U,0,A+2/3,U+1,0,A,U,0,A+2/3,U+1,0,A,U+1,0];v.set(k,p*g*T),y.set(d,_*g*T);let M=[T,T,T,T,T,T];E.set(M,m*g*T)}let L=new ae;L.setAttribute("position",new Oe(v,p)),L.setAttribute("uv",new Oe(y,_)),L.setAttribute("faceIndex",new Oe(E,m)),t.push(L),s>_s&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Vh(i,t,e){let n=new jn(i,t,e);return n.texture.mapping=Zo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Um(i,t,e){let n=new Float32Array(Ni),s=new C(0,1,0);return new en({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fl(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function Wh(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fl(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function Xh(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function Fl(){return`

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
	`}function Nm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===uc||c===dc,h=c===bs||c===ws;if(l||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new wo(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new wo(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Om(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&lo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Fm(i,t,e,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let p=d.morphAttributes[g];for(let _=0,m=p.length;_<m;_++)t.remove(p[_])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)t.update(d[g],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let p=f[g];for(let _=0,m=p.length;_<m;_++)t.update(p[_],i.ARRAY_BUFFER)}}function l(u){let d=[],f=u.index,g=u.attributes.position,p=0;if(f!==null){let v=f.array;p=f.version;for(let y=0,E=v.length;y<E;y+=3){let L=v[y+0],T=v[y+1],A=v[y+2];d.push(L,T,T,A,A,L)}}else if(g!==void 0){let v=g.array;p=g.version;for(let y=0,E=v.length/3-1;y<E;y+=3){let L=y+0,T=y+1,A=y+2;d.push(L,T,T,A,A,L)}}else return;let _=new(Fu(d)?Mo:vo)(d,1);_.version=p;let m=r.get(u);m&&t.remove(m),r.set(u,_)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Bm(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let _=0;for(let m=0;m<g;m++)_+=f[m];e.update(_,n,1)}function u(d,f,g,p){if(g===0)return;let _=t.get("WEBGL_multi_draw");if(_===null)for(let m=0;m<d.length;m++)l(d[m]/o,f[m],p[m]);else{_.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,p,0,g);let m=0;for(let v=0;v<g;v++)m+=f[v];for(let v=0;v<p.length;v++)e.update(m,n,p[v])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Hm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function zm(i,t,e){let n=new WeakMap,s=new me;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let k=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",k)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),p===!0&&(y=3);let E=a.attributes.position.count*y,L=1;E>t.maxTextureSize&&(L=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);let T=new Float32Array(E*L*4*u),A=new xo(T,E,L,u);A.type=On,A.needsUpdate=!0;let U=y*4;for(let M=0;M<u;M++){let b=_[M],H=m[M],B=v[M],X=E*L*4*M;for(let nt=0;nt<b.count;nt++){let V=nt*U;f===!0&&(s.fromBufferAttribute(b,nt),T[X+V+0]=s.x,T[X+V+1]=s.y,T[X+V+2]=s.z,T[X+V+3]=0),g===!0&&(s.fromBufferAttribute(H,nt),T[X+V+4]=s.x,T[X+V+5]=s.y,T[X+V+6]=s.z,T[X+V+7]=0),p===!0&&(s.fromBufferAttribute(B,nt),T[X+V+8]=s.x,T[X+V+9]=s.y,T[X+V+10]=s.z,T[X+V+11]=B.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new $(E,L)},n.set(a,d),a.addEventListener("dispose",k)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let p=0;p<l.length;p++)f+=l[p];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function km(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var To=class extends cn{constructor(t,e,n,s,r,o,a,c,l,h=vs){if(h!==vs&&h!==As)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===vs&&(n=Hi),n===void 0&&h===As&&(n=Ts),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:We,this.minFilter=c!==void 0?c:We,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ku=new cn,Yh=new To(1,1),Gu=new xo,Vu=new Wc,Wu=new So,qh=[],Zh=[],Kh=new Float32Array(16),Jh=new Float32Array(9),$h=new Float32Array(4);function Ns(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=qh[s];if(r===void 0&&(r=new Float32Array(s),qh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Jo(i,t){let e=Zh[t];e===void 0&&(e=new Int32Array(t),Zh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Gm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Vm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2fv(this.addr,t),Be(e,t)}}function Wm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;i.uniform3fv(this.addr,t),Be(e,t)}}function Xm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4fv(this.addr,t),Be(e,t)}}function Ym(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,n))return;$h.set(n),i.uniformMatrix2fv(this.addr,!1,$h),Be(e,n)}}function qm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,n))return;Jh.set(n),i.uniformMatrix3fv(this.addr,!1,Jh),Be(e,n)}}function Zm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,n))return;Kh.set(n),i.uniformMatrix4fv(this.addr,!1,Kh),Be(e,n)}}function Km(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Jm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2iv(this.addr,t),Be(e,t)}}function $m(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3iv(this.addr,t),Be(e,t)}}function jm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4iv(this.addr,t),Be(e,t)}}function Qm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function tg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2uiv(this.addr,t),Be(e,t)}}function eg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3uiv(this.addr,t),Be(e,t)}}function ng(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4uiv(this.addr,t),Be(e,t)}}function ig(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Yh.compareFunction=Nu,r=Yh):r=ku,e.setTexture2D(t||r,s)}function sg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Vu,s)}function rg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Wu,s)}function og(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Gu,s)}function ag(i){switch(i){case 5126:return Gm;case 35664:return Vm;case 35665:return Wm;case 35666:return Xm;case 35674:return Ym;case 35675:return qm;case 35676:return Zm;case 5124:case 35670:return Km;case 35667:case 35671:return Jm;case 35668:case 35672:return $m;case 35669:case 35673:return jm;case 5125:return Qm;case 36294:return tg;case 36295:return eg;case 36296:return ng;case 35678:case 36198:case 36298:case 36306:case 35682:return ig;case 35679:case 36299:case 36307:return sg;case 35680:case 36300:case 36308:case 36293:return rg;case 36289:case 36303:case 36311:case 36292:return og}}function cg(i,t){i.uniform1fv(this.addr,t)}function lg(i,t){let e=Ns(t,this.size,2);i.uniform2fv(this.addr,e)}function hg(i,t){let e=Ns(t,this.size,3);i.uniform3fv(this.addr,e)}function ug(i,t){let e=Ns(t,this.size,4);i.uniform4fv(this.addr,e)}function dg(i,t){let e=Ns(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function fg(i,t){let e=Ns(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function pg(i,t){let e=Ns(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function mg(i,t){i.uniform1iv(this.addr,t)}function gg(i,t){i.uniform2iv(this.addr,t)}function _g(i,t){i.uniform3iv(this.addr,t)}function xg(i,t){i.uniform4iv(this.addr,t)}function yg(i,t){i.uniform1uiv(this.addr,t)}function vg(i,t){i.uniform2uiv(this.addr,t)}function Mg(i,t){i.uniform3uiv(this.addr,t)}function Eg(i,t){i.uniform4uiv(this.addr,t)}function Sg(i,t,e){let n=this.cache,s=t.length,r=Jo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||ku,r[o])}function bg(i,t,e){let n=this.cache,s=t.length,r=Jo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Vu,r[o])}function wg(i,t,e){let n=this.cache,s=t.length,r=Jo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Wu,r[o])}function Tg(i,t,e){let n=this.cache,s=t.length,r=Jo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Gu,r[o])}function Ag(i){switch(i){case 5126:return cg;case 35664:return lg;case 35665:return hg;case 35666:return ug;case 35674:return dg;case 35675:return fg;case 35676:return pg;case 5124:case 35670:return mg;case 35667:case 35671:return gg;case 35668:case 35672:return _g;case 35669:case 35673:return xg;case 5125:return yg;case 36294:return vg;case 36295:return Mg;case 36296:return Eg;case 35678:case 36198:case 36298:case 36306:case 35682:return Sg;case 35679:case 36299:case 36307:return bg;case 35680:case 36300:case 36308:case 36293:return wg;case 36289:case 36303:case 36311:case 36292:return Tg}}var qc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ag(e.type)}},Zc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ag(e.type)}},Kc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Ka=/(\w+)(\])?(\[|\.)?/g;function jh(i,t){i.seq.push(t),i.map[t.id]=t}function Rg(i,t,e){let n=i.name,s=n.length;for(Ka.lastIndex=0;;){let r=Ka.exec(n),o=Ka.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){jh(e,l===void 0?new qc(a,i,t):new Zc(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Kc(a),jh(e,u)),e=u}}}var Es=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Rg(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Qh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Cg=37297,Pg=0;function Ig(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Dg(i){let t=ue.getPrimaries(ue.workingColorSpace),e=ue.getPrimaries(i),n;switch(t===e?n="":t===po&&e===fo?n="LinearDisplayP3ToLinearSRGB":t===fo&&e===po&&(n="LinearSRGBToLinearDisplayP3"),i){case xi:case Ko:return[n,"LinearTransferOETF"];case on:case Nl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function tu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Ig(i.getShaderSource(t),o)}else return s}function Lg(i,t){let e=Dg(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Ug(i,t){let e;switch(t){case Vd:e="Linear";break;case Wd:e="Reinhard";break;case Xd:e="Cineon";break;case Al:e="ACESFilmic";break;case qd:e="AgX";break;case Zd:e="Neutral";break;case Yd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var qr=new C;function Ng(){ue.getLuminanceCoefficients(qr);let i=qr.x.toFixed(4),t=qr.y.toFixed(4),e=qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Og(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tr).join(`
`)}function Fg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Bg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function tr(i){return i!==""}function eu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jc(i){return i.replace(Hg,kg)}var zg=new Map;function kg(i,t){let e=Zt[t];if(e===void 0){let n=zg.get(t);if(n!==void 0)e=Zt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Jc(e)}var Gg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function iu(i){return i.replace(Gg,Vg)}function Vg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function su(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Wg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Su?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Tl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Zn&&(t="SHADOWMAP_TYPE_VSM"),t}function Xg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case bs:case ws:t="ENVMAP_TYPE_CUBE";break;case Zo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Yg(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===ws&&(t="ENVMAP_MODE_REFRACTION"),t}function qg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case bu:t="ENVMAP_BLENDING_MULTIPLY";break;case kd:t="ENVMAP_BLENDING_MIX";break;case Gd:t="ENVMAP_BLENDING_ADD";break}return t}function Zg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Kg(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Wg(e),l=Xg(e),h=Yg(e),u=qg(e),d=Zg(e),f=Og(e),g=Fg(r),p=s.createProgram(),_,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(tr).join(`
`),_.length>0&&(_+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(tr).join(`
`),m.length>0&&(m+=`
`)):(_=[su(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),m=[su(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==fi?"#define TONE_MAPPING":"",e.toneMapping!==fi?Zt.tonemapping_pars_fragment:"",e.toneMapping!==fi?Ug("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,Lg("linearToOutputTexel",e.outputColorSpace),Ng(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(tr).join(`
`)),o=Jc(o),o=eu(o,e),o=nu(o,e),a=Jc(a),a=eu(a,e),a=nu(a,e),o=iu(o),a=iu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,_=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,m=["#define varying in",e.glslVersion===Mh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Mh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let y=v+_+o,E=v+m+a,L=Qh(s,s.VERTEX_SHADER,y),T=Qh(s,s.FRAGMENT_SHADER,E);s.attachShader(p,L),s.attachShader(p,T),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function A(b){if(i.debug.checkShaderErrors){let H=s.getProgramInfoLog(p).trim(),B=s.getShaderInfoLog(L).trim(),X=s.getShaderInfoLog(T).trim(),nt=!0,V=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(nt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,L,T);else{let at=tu(s,L,"vertex"),K=tu(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+H+`
`+at+`
`+K)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(B===""||X==="")&&(V=!1);V&&(b.diagnostics={runnable:nt,programLog:H,vertexShader:{log:B,prefix:_},fragmentShader:{log:X,prefix:m}})}s.deleteShader(L),s.deleteShader(T),U=new Es(s,p),k=Bg(s,p)}let U;this.getUniforms=function(){return U===void 0&&A(this),U};let k;this.getAttributes=function(){return k===void 0&&A(this),k};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(p,Cg)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Pg++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=L,this.fragmentShader=T,this}var Jg=0,$c=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new jc(t),e.set(t,n)),n}},jc=class{constructor(t){this.id=Jg++,this.code=t,this.usedTimes=0}};function $g(i,t,e,n,s,r,o){let a=new yo,c=new $c,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.reverseDepthBuffer,f=s.vertexTextures,g=s.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function m(M,b,H,B,X){let nt=B.fog,V=X.geometry,at=M.isMeshStandardMaterial?B.environment:null,K=(M.isMeshStandardMaterial?e:t).get(M.envMap||at),_t=K&&K.mapping===Zo?K.image.height:null,vt=p[M.type];M.precision!==null&&(g=s.getMaxPrecision(M.precision),g!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",g,"instead."));let Mt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Qt=Mt!==void 0?Mt.length:0,re=0;V.morphAttributes.position!==void 0&&(re=1),V.morphAttributes.normal!==void 0&&(re=2),V.morphAttributes.color!==void 0&&(re=3);let Q,ct,At,gt;if(vt){let rn=Nn[vt];Q=rn.vertexShader,ct=rn.fragmentShader}else Q=M.vertexShader,ct=M.fragmentShader,c.update(M),At=c.getVertexShaderID(M),gt=c.getFragmentShaderID(M);let Ht=i.getRenderTarget(),Bt=X.isInstancedMesh===!0,Xt=X.isBatchedMesh===!0,Jt=!!M.map,it=!!M.matcap,I=!!K,dt=!!M.aoMap,ut=!!M.lightMap,ot=!!M.bumpMap,ft=!!M.normalMap,Nt=!!M.displacementMap,Et=!!M.emissiveMap,R=!!M.metalnessMap,S=!!M.roughnessMap,z=M.anisotropy>0,tt=M.clearcoat>0,st=M.dispersion>0,et=M.iridescence>0,It=M.sheen>0,pt=M.transmission>0,wt=z&&!!M.anisotropyMap,ee=tt&&!!M.clearcoatMap,lt=tt&&!!M.clearcoatNormalMap,Tt=tt&&!!M.clearcoatRoughnessMap,Vt=et&&!!M.iridescenceMap,Wt=et&&!!M.iridescenceThicknessMap,Rt=It&&!!M.sheenColorMap,ne=It&&!!M.sheenRoughnessMap,qt=!!M.specularMap,xe=!!M.specularColorMap,N=!!M.specularIntensityMap,St=pt&&!!M.transmissionMap,q=pt&&!!M.thicknessMap,rt=!!M.gradientMap,xt=!!M.alphaMap,bt=M.alphaTest>0,se=!!M.alphaHash,Le=!!M.extensions,sn=fi;M.toneMapped&&(Ht===null||Ht.isXRRenderTarget===!0)&&(sn=i.toneMapping);let oe={shaderID:vt,shaderType:M.type,shaderName:M.name,vertexShader:Q,fragmentShader:ct,defines:M.defines,customVertexShaderID:At,customFragmentShaderID:gt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:g,batching:Xt,batchingColor:Xt&&X._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&X.instanceColor!==null,instancingMorph:Bt&&X.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Ht===null?i.outputColorSpace:Ht.isXRRenderTarget===!0?Ht.texture.colorSpace:xi,alphaToCoverage:!!M.alphaToCoverage,map:Jt,matcap:it,envMap:I,envMapMode:I&&K.mapping,envMapCubeUVHeight:_t,aoMap:dt,lightMap:ut,bumpMap:ot,normalMap:ft,displacementMap:f&&Nt,emissiveMap:Et,normalMapObjectSpace:ft&&M.normalMapType===jd,normalMapTangentSpace:ft&&M.normalMapType===Ul,metalnessMap:R,roughnessMap:S,anisotropy:z,anisotropyMap:wt,clearcoat:tt,clearcoatMap:ee,clearcoatNormalMap:lt,clearcoatRoughnessMap:Tt,dispersion:st,iridescence:et,iridescenceMap:Vt,iridescenceThicknessMap:Wt,sheen:It,sheenColorMap:Rt,sheenRoughnessMap:ne,specularMap:qt,specularColorMap:xe,specularIntensityMap:N,transmission:pt,transmissionMap:St,thicknessMap:q,gradientMap:rt,opaque:M.transparent===!1&&M.blending===ys&&M.alphaToCoverage===!1,alphaMap:xt,alphaTest:bt,alphaHash:se,combine:M.combine,mapUv:Jt&&_(M.map.channel),aoMapUv:dt&&_(M.aoMap.channel),lightMapUv:ut&&_(M.lightMap.channel),bumpMapUv:ot&&_(M.bumpMap.channel),normalMapUv:ft&&_(M.normalMap.channel),displacementMapUv:Nt&&_(M.displacementMap.channel),emissiveMapUv:Et&&_(M.emissiveMap.channel),metalnessMapUv:R&&_(M.metalnessMap.channel),roughnessMapUv:S&&_(M.roughnessMap.channel),anisotropyMapUv:wt&&_(M.anisotropyMap.channel),clearcoatMapUv:ee&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:lt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Vt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Wt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:ne&&_(M.sheenRoughnessMap.channel),specularMapUv:qt&&_(M.specularMap.channel),specularColorMapUv:xe&&_(M.specularColorMap.channel),specularIntensityMapUv:N&&_(M.specularIntensityMap.channel),transmissionMapUv:St&&_(M.transmissionMap.channel),thicknessMapUv:q&&_(M.thicknessMap.channel),alphaMapUv:xt&&_(M.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(ft||z),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!V.attributes.uv&&(Jt||xt),fog:!!nt,useFog:M.fog===!0,fogExp2:!!nt&&nt.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:d,skinning:X.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Qt,morphTextureStride:re,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&H.length>0,shadowMapType:i.shadowMap.type,toneMapping:sn,decodeVideoTexture:Jt&&M.map.isVideoTexture===!0&&ue.getTransfer(M.map.colorSpace)===Me,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Yt,flipSided:M.side===$e,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Le&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&M.extensions.multiDraw===!0||Xt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return oe.vertexUv1s=l.has(1),oe.vertexUv2s=l.has(2),oe.vertexUv3s=l.has(3),l.clear(),oe}function v(M){let b=[];if(M.shaderID?b.push(M.shaderID):(b.push(M.customVertexShaderID),b.push(M.customFragmentShaderID)),M.defines!==void 0)for(let H in M.defines)b.push(H),b.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(y(b,M),E(b,M),b.push(i.outputColorSpace)),b.push(M.customProgramCacheKey),b.join()}function y(M,b){M.push(b.precision),M.push(b.outputColorSpace),M.push(b.envMapMode),M.push(b.envMapCubeUVHeight),M.push(b.mapUv),M.push(b.alphaMapUv),M.push(b.lightMapUv),M.push(b.aoMapUv),M.push(b.bumpMapUv),M.push(b.normalMapUv),M.push(b.displacementMapUv),M.push(b.emissiveMapUv),M.push(b.metalnessMapUv),M.push(b.roughnessMapUv),M.push(b.anisotropyMapUv),M.push(b.clearcoatMapUv),M.push(b.clearcoatNormalMapUv),M.push(b.clearcoatRoughnessMapUv),M.push(b.iridescenceMapUv),M.push(b.iridescenceThicknessMapUv),M.push(b.sheenColorMapUv),M.push(b.sheenRoughnessMapUv),M.push(b.specularMapUv),M.push(b.specularColorMapUv),M.push(b.specularIntensityMapUv),M.push(b.transmissionMapUv),M.push(b.thicknessMapUv),M.push(b.combine),M.push(b.fogExp2),M.push(b.sizeAttenuation),M.push(b.morphTargetsCount),M.push(b.morphAttributeCount),M.push(b.numDirLights),M.push(b.numPointLights),M.push(b.numSpotLights),M.push(b.numSpotLightMaps),M.push(b.numHemiLights),M.push(b.numRectAreaLights),M.push(b.numDirLightShadows),M.push(b.numPointLightShadows),M.push(b.numSpotLightShadows),M.push(b.numSpotLightShadowsWithMaps),M.push(b.numLightProbes),M.push(b.shadowMapType),M.push(b.toneMapping),M.push(b.numClippingPlanes),M.push(b.numClipIntersection),M.push(b.depthPacking)}function E(M,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.alphaToCoverage&&a.enable(20),M.push(a.mask)}function L(M){let b=p[M.type],H;if(b){let B=Nn[b];H=kf.clone(B.uniforms)}else H=M.uniforms;return H}function T(M,b){let H;for(let B=0,X=h.length;B<X;B++){let nt=h[B];if(nt.cacheKey===b){H=nt,++H.usedTimes;break}}return H===void 0&&(H=new Kg(i,b,M,r),h.push(H)),H}function A(M){if(--M.usedTimes===0){let b=h.indexOf(M);h[b]=h[h.length-1],h.pop(),M.destroy()}}function U(M){c.remove(M)}function k(){c.dispose()}return{getParameters:m,getProgramCacheKey:v,getUniforms:L,acquireProgram:T,releaseProgram:A,releaseShaderCache:U,programs:h,dispose:k}}function jg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Qg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ru(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ou(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,p,_){let m=i[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:p,group:_},i[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=p,m.group=_),t++,m}function a(u,d,f,g,p,_){let m=o(u,d,f,g,p,_);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):e.push(m)}function c(u,d,f,g,p,_){let m=o(u,d,f,g,p,_);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function l(u,d){e.length>1&&e.sort(u||Qg),n.length>1&&n.sort(d||ru),s.length>1&&s.sort(d||ru)}function h(){for(let u=t,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function t_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new ou,i.set(n,[o])):s>=r.length?(o=new ou,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function e_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new Pt};break;case"SpotLight":e={position:new C,direction:new C,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function n_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var i_=0;function s_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function r_(i){let t=new e_,e=n_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);let s=new C,r=new ge,o=new ge;function a(l){let h=0,u=0,d=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,g=0,p=0,_=0,m=0,v=0,y=0,E=0,L=0,T=0,A=0;l.sort(s_);for(let k=0,M=l.length;k<M;k++){let b=l[k],H=b.color,B=b.intensity,X=b.distance,nt=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)h+=H.r*B,u+=H.g*B,d+=H.b*B;else if(b.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(b.sh.coefficients[V],B);A++}else if(b.isDirectionalLight){let V=t.get(b);if(V.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){let at=b.shadow,K=e.get(b);K.shadowIntensity=at.intensity,K.shadowBias=at.bias,K.shadowNormalBias=at.normalBias,K.shadowRadius=at.radius,K.shadowMapSize=at.mapSize,n.directionalShadow[f]=K,n.directionalShadowMap[f]=nt,n.directionalShadowMatrix[f]=b.shadow.matrix,v++}n.directional[f]=V,f++}else if(b.isSpotLight){let V=t.get(b);V.position.setFromMatrixPosition(b.matrixWorld),V.color.copy(H).multiplyScalar(B),V.distance=X,V.coneCos=Math.cos(b.angle),V.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),V.decay=b.decay,n.spot[p]=V;let at=b.shadow;if(b.map&&(n.spotLightMap[L]=b.map,L++,at.updateMatrices(b),b.castShadow&&T++),n.spotLightMatrix[p]=at.matrix,b.castShadow){let K=e.get(b);K.shadowIntensity=at.intensity,K.shadowBias=at.bias,K.shadowNormalBias=at.normalBias,K.shadowRadius=at.radius,K.shadowMapSize=at.mapSize,n.spotShadow[p]=K,n.spotShadowMap[p]=nt,E++}p++}else if(b.isRectAreaLight){let V=t.get(b);V.color.copy(H).multiplyScalar(B),V.halfWidth.set(b.width*.5,0,0),V.halfHeight.set(0,b.height*.5,0),n.rectArea[_]=V,_++}else if(b.isPointLight){let V=t.get(b);if(V.color.copy(b.color).multiplyScalar(b.intensity),V.distance=b.distance,V.decay=b.decay,b.castShadow){let at=b.shadow,K=e.get(b);K.shadowIntensity=at.intensity,K.shadowBias=at.bias,K.shadowNormalBias=at.normalBias,K.shadowRadius=at.radius,K.shadowMapSize=at.mapSize,K.shadowCameraNear=at.camera.near,K.shadowCameraFar=at.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=nt,n.pointShadowMatrix[g]=b.shadow.matrix,y++}n.point[g]=V,g++}else if(b.isHemisphereLight){let V=t.get(b);V.skyColor.copy(b.color).multiplyScalar(B),V.groundColor.copy(b.groundColor).multiplyScalar(B),n.hemi[m]=V,m++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let U=n.hash;(U.directionalLength!==f||U.pointLength!==g||U.spotLength!==p||U.rectAreaLength!==_||U.hemiLength!==m||U.numDirectionalShadows!==v||U.numPointShadows!==y||U.numSpotShadows!==E||U.numSpotMaps!==L||U.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=p,n.rectArea.length=_,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=E+L-T,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,U.directionalLength=f,U.pointLength=g,U.spotLength=p,U.rectAreaLength=_,U.hemiLength=m,U.numDirectionalShadows=v,U.numPointShadows=y,U.numSpotShadows=E,U.numSpotMaps=L,U.numLightProbes=A,n.version=i_++)}function c(l,h){let u=0,d=0,f=0,g=0,p=0,_=h.matrixWorldInverse;for(let m=0,v=l.length;m<v;m++){let y=l[m];if(y.isDirectionalLight){let E=n.directional[u];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(_),u++}else if(y.isSpotLight){let E=n.spot[f];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(_),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(_),f++}else if(y.isRectAreaLight){let E=n.rectArea[g];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(_),o.identity(),r.copy(y.matrixWorld),r.premultiply(_),o.extractRotation(r),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let E=n.point[d];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(_),d++}else if(y.isHemisphereLight){let E=n.hemi[p];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(_),p++}}}return{setup:a,setupView:c,state:n}}function au(i){let t=new r_(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function o_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new au(i),t.set(s,[a])):r>=o.length?(a=new au(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Qc=class extends Hn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},tl=class extends Hn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},a_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c_=`uniform sampler2D shadow_pass;
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
}`;function l_(i,t,e){let n=new cr,s=new $,r=new $,o=new me,a=new Qc({depthPacking:$d}),c=new tl,l={},h=e.maxTextureSize,u={[mi]:$e,[$e]:mi,[Yt]:Yt},d=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $},radius:{value:4}},vertexShader:a_,fragmentShader:c_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new ae;g.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let p=new J(g,d),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Su;let m=this.type;this.render=function(T,A,U){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||T.length===0)return;let k=i.getRenderTarget(),M=i.getActiveCubeFace(),b=i.getActiveMipmapLevel(),H=i.state;H.setBlending(di),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let B=m!==Zn&&this.type===Zn,X=m===Zn&&this.type!==Zn;for(let nt=0,V=T.length;nt<V;nt++){let at=T[nt],K=at.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",at,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);let _t=K.getFrameExtents();if(s.multiply(_t),r.copy(K.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/_t.x),s.x=r.x*_t.x,K.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/_t.y),s.y=r.y*_t.y,K.mapSize.y=r.y)),K.map===null||B===!0||X===!0){let Mt=this.type!==Zn?{minFilter:We,magFilter:We}:{};K.map!==null&&K.map.dispose(),K.map=new jn(s.x,s.y,Mt),K.map.texture.name=at.name+".shadowMap",K.camera.updateProjectionMatrix()}i.setRenderTarget(K.map),i.clear();let vt=K.getViewportCount();for(let Mt=0;Mt<vt;Mt++){let Qt=K.getViewport(Mt);o.set(r.x*Qt.x,r.y*Qt.y,r.x*Qt.z,r.y*Qt.w),H.viewport(o),K.updateMatrices(at,Mt),n=K.getFrustum(),E(A,U,K.camera,at,this.type)}K.isPointLightShadow!==!0&&this.type===Zn&&v(K,U),K.needsUpdate=!1}m=this.type,_.needsUpdate=!1,i.setRenderTarget(k,M,b)};function v(T,A){let U=t.update(p);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new jn(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,U,d,p,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,U,f,p,null)}function y(T,A,U,k){let M=null,b=U.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(b!==void 0)M=b;else if(M=U.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let H=M.uuid,B=A.uuid,X=l[H];X===void 0&&(X={},l[H]=X);let nt=X[B];nt===void 0&&(nt=M.clone(),X[B]=nt,A.addEventListener("dispose",L)),M=nt}if(M.visible=A.visible,M.wireframe=A.wireframe,k===Zn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let H=i.properties.get(M);H.light=U}return M}function E(T,A,U,k,M){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Zn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,T.matrixWorld);let B=t.update(T),X=T.material;if(Array.isArray(X)){let nt=B.groups;for(let V=0,at=nt.length;V<at;V++){let K=nt[V],_t=X[K.materialIndex];if(_t&&_t.visible){let vt=y(T,_t,k,M);T.onBeforeShadow(i,T,A,U,B,vt,K),i.renderBufferDirect(U,null,B,vt,T,K),T.onAfterShadow(i,T,A,U,B,vt,K)}}}else if(X.visible){let nt=y(T,X,k,M);T.onBeforeShadow(i,T,A,U,B,nt,null),i.renderBufferDirect(U,null,B,nt,T,null),T.onAfterShadow(i,T,A,U,B,nt,null)}}let H=T.children;for(let B=0,X=H.length;B<X;B++)E(H[B],A,U,k,M)}function L(T){T.target.removeEventListener("dispose",L);for(let U in l){let k=l[U],M=T.target.uuid;M in k&&(k[M].dispose(),delete k[M])}}}var h_={[sc]:rc,[oc]:lc,[ac]:hc,[Ss]:cc,[rc]:sc,[lc]:oc,[hc]:ac,[cc]:Ss};function u_(i){function t(){let N=!1,St=new me,q=null,rt=new me(0,0,0,0);return{setMask:function(xt){q!==xt&&!N&&(i.colorMask(xt,xt,xt,xt),q=xt)},setLocked:function(xt){N=xt},setClear:function(xt,bt,se,Le,sn){sn===!0&&(xt*=Le,bt*=Le,se*=Le),St.set(xt,bt,se,Le),rt.equals(St)===!1&&(i.clearColor(xt,bt,se,Le),rt.copy(St))},reset:function(){N=!1,q=null,rt.set(-1,0,0,0)}}}function e(){let N=!1,St=!1,q=null,rt=null,xt=null;return{setReversed:function(bt){St=bt},setTest:function(bt){bt?At(i.DEPTH_TEST):gt(i.DEPTH_TEST)},setMask:function(bt){q!==bt&&!N&&(i.depthMask(bt),q=bt)},setFunc:function(bt){if(St&&(bt=h_[bt]),rt!==bt){switch(bt){case sc:i.depthFunc(i.NEVER);break;case rc:i.depthFunc(i.ALWAYS);break;case oc:i.depthFunc(i.LESS);break;case Ss:i.depthFunc(i.LEQUAL);break;case ac:i.depthFunc(i.EQUAL);break;case cc:i.depthFunc(i.GEQUAL);break;case lc:i.depthFunc(i.GREATER);break;case hc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}rt=bt}},setLocked:function(bt){N=bt},setClear:function(bt){xt!==bt&&(i.clearDepth(bt),xt=bt)},reset:function(){N=!1,q=null,rt=null,xt=null}}}function n(){let N=!1,St=null,q=null,rt=null,xt=null,bt=null,se=null,Le=null,sn=null;return{setTest:function(oe){N||(oe?At(i.STENCIL_TEST):gt(i.STENCIL_TEST))},setMask:function(oe){St!==oe&&!N&&(i.stencilMask(oe),St=oe)},setFunc:function(oe,rn,Gn){(q!==oe||rt!==rn||xt!==Gn)&&(i.stencilFunc(oe,rn,Gn),q=oe,rt=rn,xt=Gn)},setOp:function(oe,rn,Gn){(bt!==oe||se!==rn||Le!==Gn)&&(i.stencilOp(oe,rn,Gn),bt=oe,se=rn,Le=Gn)},setLocked:function(oe){N=oe},setClear:function(oe){sn!==oe&&(i.clearStencil(oe),sn=oe)},reset:function(){N=!1,St=null,q=null,rt=null,xt=null,bt=null,se=null,Le=null,sn=null}}}let s=new t,r=new e,o=new n,a=new WeakMap,c=new WeakMap,l={},h={},u=new WeakMap,d=[],f=null,g=!1,p=null,_=null,m=null,v=null,y=null,E=null,L=null,T=new Pt(0,0,0),A=0,U=!1,k=null,M=null,b=null,H=null,B=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),nt=!1,V=0,at=i.getParameter(i.VERSION);at.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(at)[1]),nt=V>=1):at.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(at)[1]),nt=V>=2);let K=null,_t={},vt=i.getParameter(i.SCISSOR_BOX),Mt=i.getParameter(i.VIEWPORT),Qt=new me().fromArray(vt),re=new me().fromArray(Mt);function Q(N,St,q,rt){let xt=new Uint8Array(4),bt=i.createTexture();i.bindTexture(N,bt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let se=0;se<q;se++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(St,0,i.RGBA,1,1,rt,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(St+se,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return bt}let ct={};ct[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),ct[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ct[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ct[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),At(i.DEPTH_TEST),r.setFunc(Ss),ut(!1),ot(ph),At(i.CULL_FACE),I(di);function At(N){l[N]!==!0&&(i.enable(N),l[N]=!0)}function gt(N){l[N]!==!1&&(i.disable(N),l[N]=!1)}function Ht(N,St){return h[N]!==St?(i.bindFramebuffer(N,St),h[N]=St,N===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=St),N===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=St),!0):!1}function Bt(N,St){let q=d,rt=!1;if(N){q=u.get(St),q===void 0&&(q=[],u.set(St,q));let xt=N.textures;if(q.length!==xt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let bt=0,se=xt.length;bt<se;bt++)q[bt]=i.COLOR_ATTACHMENT0+bt;q.length=xt.length,rt=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,rt=!0);rt&&i.drawBuffers(q)}function Xt(N){return f!==N?(i.useProgram(N),f=N,!0):!1}let Jt={[Ui]:i.FUNC_ADD,[bd]:i.FUNC_SUBTRACT,[wd]:i.FUNC_REVERSE_SUBTRACT};Jt[Td]=i.MIN,Jt[Ad]=i.MAX;let it={[Rd]:i.ZERO,[Cd]:i.ONE,[Pd]:i.SRC_COLOR,[nc]:i.SRC_ALPHA,[Od]:i.SRC_ALPHA_SATURATE,[Ud]:i.DST_COLOR,[Dd]:i.DST_ALPHA,[Id]:i.ONE_MINUS_SRC_COLOR,[ic]:i.ONE_MINUS_SRC_ALPHA,[Nd]:i.ONE_MINUS_DST_COLOR,[Ld]:i.ONE_MINUS_DST_ALPHA,[Fd]:i.CONSTANT_COLOR,[Bd]:i.ONE_MINUS_CONSTANT_COLOR,[Hd]:i.CONSTANT_ALPHA,[zd]:i.ONE_MINUS_CONSTANT_ALPHA};function I(N,St,q,rt,xt,bt,se,Le,sn,oe){if(N===di){g===!0&&(gt(i.BLEND),g=!1);return}if(g===!1&&(At(i.BLEND),g=!0),N!==Sd){if(N!==p||oe!==U){if((_!==Ui||y!==Ui)&&(i.blendEquation(i.FUNC_ADD),_=Ui,y=Ui),oe)switch(N){case ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case an:i.blendFunc(i.ONE,i.ONE);break;case mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case an:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}m=null,v=null,E=null,L=null,T.set(0,0,0),A=0,p=N,U=oe}return}xt=xt||St,bt=bt||q,se=se||rt,(St!==_||xt!==y)&&(i.blendEquationSeparate(Jt[St],Jt[xt]),_=St,y=xt),(q!==m||rt!==v||bt!==E||se!==L)&&(i.blendFuncSeparate(it[q],it[rt],it[bt],it[se]),m=q,v=rt,E=bt,L=se),(Le.equals(T)===!1||sn!==A)&&(i.blendColor(Le.r,Le.g,Le.b,sn),T.copy(Le),A=sn),p=N,U=!1}function dt(N,St){N.side===Yt?gt(i.CULL_FACE):At(i.CULL_FACE);let q=N.side===$e;St&&(q=!q),ut(q),N.blending===ys&&N.transparent===!1?I(di):I(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),s.setMask(N.colorWrite);let rt=N.stencilWrite;o.setTest(rt),rt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Nt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?At(i.SAMPLE_ALPHA_TO_COVERAGE):gt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ut(N){k!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),k=N)}function ot(N){N!==Md?(At(i.CULL_FACE),N!==M&&(N===ph?i.cullFace(i.BACK):N===Ed?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):gt(i.CULL_FACE),M=N}function ft(N){N!==b&&(nt&&i.lineWidth(N),b=N)}function Nt(N,St,q){N?(At(i.POLYGON_OFFSET_FILL),(H!==St||B!==q)&&(i.polygonOffset(St,q),H=St,B=q)):gt(i.POLYGON_OFFSET_FILL)}function Et(N){N?At(i.SCISSOR_TEST):gt(i.SCISSOR_TEST)}function R(N){N===void 0&&(N=i.TEXTURE0+X-1),K!==N&&(i.activeTexture(N),K=N)}function S(N,St,q){q===void 0&&(K===null?q=i.TEXTURE0+X-1:q=K);let rt=_t[q];rt===void 0&&(rt={type:void 0,texture:void 0},_t[q]=rt),(rt.type!==N||rt.texture!==St)&&(K!==q&&(i.activeTexture(q),K=q),i.bindTexture(N,St||ct[N]),rt.type=N,rt.texture=St)}function z(){let N=_t[K];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function tt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function It(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function wt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function lt(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Vt(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Wt(N){Qt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Qt.copy(N))}function Rt(N){re.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),re.copy(N))}function ne(N,St){let q=c.get(St);q===void 0&&(q=new WeakMap,c.set(St,q));let rt=q.get(N);rt===void 0&&(rt=i.getUniformBlockIndex(St,N.name),q.set(N,rt))}function qt(N,St){let rt=c.get(St).get(N);a.get(St)!==rt&&(i.uniformBlockBinding(St,rt,N.__bindingPointIndex),a.set(St,rt))}function xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},K=null,_t={},h={},u=new WeakMap,d=[],f=null,g=!1,p=null,_=null,m=null,v=null,y=null,E=null,L=null,T=new Pt(0,0,0),A=0,U=!1,k=null,M=null,b=null,H=null,B=null,Qt.set(0,0,i.canvas.width,i.canvas.height),re.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:At,disable:gt,bindFramebuffer:Ht,drawBuffers:Bt,useProgram:Xt,setBlending:I,setMaterial:dt,setFlipSided:ut,setCullFace:ot,setLineWidth:ft,setPolygonOffset:Nt,setScissorTest:Et,activeTexture:R,bindTexture:S,unbindTexture:z,compressedTexImage2D:tt,compressedTexImage3D:st,texImage2D:Tt,texImage3D:Vt,updateUBOMapping:ne,uniformBlockBinding:qt,texStorage2D:ee,texStorage3D:lt,texSubImage2D:et,texSubImage3D:It,compressedTexSubImage2D:pt,compressedTexSubImage3D:wt,scissor:Wt,viewport:Rt,reset:xe}}function cu(i,t,e,n){let s=d_(n);switch(e){case Cu:return i*t;case Iu:return i*t;case Du:return i*t*2;case gr:return i*t/s.components*s.byteLength;case Il:return i*t/s.components*s.byteLength;case Lu:return i*t*2/s.components*s.byteLength;case Dl:return i*t*2/s.components*s.byteLength;case Pu:return i*t*3/s.components*s.byteLength;case Rn:return i*t*4/s.components*s.byteLength;case Ll:return i*t*4/s.components*s.byteLength;case so:case ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case oo:case ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mc:case _c:return Math.max(i,16)*Math.max(t,8)/4;case pc:case gc:return Math.max(i,8)*Math.max(t,8)/2;case xc:case yc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Mc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ec:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Sc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case bc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case wc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Tc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ac:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Rc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Cc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Pc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ic:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Dc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Lc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Uc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case co:case Nc:case Oc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Uu:case Fc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Bc:case Hc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function d_(i){switch(i){case Jn:case Tu:return{byteLength:1,components:1};case or:case Au:case mr:return{byteLength:2,components:1};case Cl:case Pl:return{byteLength:2,components:4};case Hi:case Rl:case On:return{byteLength:4,components:1};case Ru:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function f_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return f?new OffscreenCanvas(R,S):go("canvas")}function p(R,S,z){let tt=1,st=Et(R);if((st.width>z||st.height>z)&&(tt=z/Math.max(st.width,st.height)),tt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let et=Math.floor(tt*st.width),It=Math.floor(tt*st.height);u===void 0&&(u=g(et,It));let pt=S?g(et,It):u;return pt.width=et,pt.height=It,pt.getContext("2d").drawImage(R,0,0,et,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+et+"x"+It+")."),pt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),R;return R}function _(R){return R.generateMipmaps&&R.minFilter!==We&&R.minFilter!==Tn}function m(R){i.generateMipmap(R)}function v(R,S,z,tt,st=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let et=S;if(S===i.RED&&(z===i.FLOAT&&(et=i.R32F),z===i.HALF_FLOAT&&(et=i.R16F),z===i.UNSIGNED_BYTE&&(et=i.R8)),S===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(et=i.R8UI),z===i.UNSIGNED_SHORT&&(et=i.R16UI),z===i.UNSIGNED_INT&&(et=i.R32UI),z===i.BYTE&&(et=i.R8I),z===i.SHORT&&(et=i.R16I),z===i.INT&&(et=i.R32I)),S===i.RG&&(z===i.FLOAT&&(et=i.RG32F),z===i.HALF_FLOAT&&(et=i.RG16F),z===i.UNSIGNED_BYTE&&(et=i.RG8)),S===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(et=i.RG8UI),z===i.UNSIGNED_SHORT&&(et=i.RG16UI),z===i.UNSIGNED_INT&&(et=i.RG32UI),z===i.BYTE&&(et=i.RG8I),z===i.SHORT&&(et=i.RG16I),z===i.INT&&(et=i.RG32I)),S===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(et=i.RGB8UI),z===i.UNSIGNED_SHORT&&(et=i.RGB16UI),z===i.UNSIGNED_INT&&(et=i.RGB32UI),z===i.BYTE&&(et=i.RGB8I),z===i.SHORT&&(et=i.RGB16I),z===i.INT&&(et=i.RGB32I)),S===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(et=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(et=i.RGBA16UI),z===i.UNSIGNED_INT&&(et=i.RGBA32UI),z===i.BYTE&&(et=i.RGBA8I),z===i.SHORT&&(et=i.RGBA16I),z===i.INT&&(et=i.RGBA32I)),S===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(et=i.RGB9_E5),S===i.RGBA){let It=st?uo:ue.getTransfer(tt);z===i.FLOAT&&(et=i.RGBA32F),z===i.HALF_FLOAT&&(et=i.RGBA16F),z===i.UNSIGNED_BYTE&&(et=It===Me?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(et=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(et=i.RGB5_A1)}return(et===i.R16F||et===i.R32F||et===i.RG16F||et===i.RG32F||et===i.RGBA16F||et===i.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function y(R,S){let z;return R?S===null||S===Hi||S===Ts?z=i.DEPTH24_STENCIL8:S===On?z=i.DEPTH32F_STENCIL8:S===or&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Hi||S===Ts?z=i.DEPTH_COMPONENT24:S===On?z=i.DEPTH_COMPONENT32F:S===or&&(z=i.DEPTH_COMPONENT16),z}function E(R,S){return _(R)===!0||R.isFramebufferTexture&&R.minFilter!==We&&R.minFilter!==Tn?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function L(R){let S=R.target;S.removeEventListener("dispose",L),A(S),S.isVideoTexture&&h.delete(S)}function T(R){let S=R.target;S.removeEventListener("dispose",T),k(S)}function A(R){let S=n.get(R);if(S.__webglInit===void 0)return;let z=R.source,tt=d.get(z);if(tt){let st=tt[S.__cacheKey];st.usedTimes--,st.usedTimes===0&&U(R),Object.keys(tt).length===0&&d.delete(z)}n.remove(R)}function U(R){let S=n.get(R);i.deleteTexture(S.__webglTexture);let z=R.source,tt=d.get(z);delete tt[S.__cacheKey],o.memory.textures--}function k(R){let S=n.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(S.__webglFramebuffer[tt]))for(let st=0;st<S.__webglFramebuffer[tt].length;st++)i.deleteFramebuffer(S.__webglFramebuffer[tt][st]);else i.deleteFramebuffer(S.__webglFramebuffer[tt]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[tt])}else{if(Array.isArray(S.__webglFramebuffer))for(let tt=0;tt<S.__webglFramebuffer.length;tt++)i.deleteFramebuffer(S.__webglFramebuffer[tt]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let tt=0;tt<S.__webglColorRenderbuffer.length;tt++)S.__webglColorRenderbuffer[tt]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[tt]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let z=R.textures;for(let tt=0,st=z.length;tt<st;tt++){let et=n.get(z[tt]);et.__webglTexture&&(i.deleteTexture(et.__webglTexture),o.memory.textures--),n.remove(z[tt])}n.remove(R)}let M=0;function b(){M=0}function H(){let R=M;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),M+=1,R}function B(R){let S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function X(R,S){let z=n.get(R);if(R.isVideoTexture&&ft(R),R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){let tt=R.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{re(z,R,S);return}}e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+S)}function nt(R,S){let z=n.get(R);if(R.version>0&&z.__version!==R.version){re(z,R,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+S)}function V(R,S){let z=n.get(R);if(R.version>0&&z.__version!==R.version){re(z,R,S);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+S)}function at(R,S){let z=n.get(R);if(R.version>0&&z.__version!==R.version){Q(z,R,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+S)}let K={[Bi]:i.REPEAT,[Oi]:i.CLAMP_TO_EDGE,[fc]:i.MIRRORED_REPEAT},_t={[We]:i.NEAREST,[Kd]:i.NEAREST_MIPMAP_NEAREST,[Ar]:i.NEAREST_MIPMAP_LINEAR,[Tn]:i.LINEAR,[Ma]:i.LINEAR_MIPMAP_NEAREST,[Fi]:i.LINEAR_MIPMAP_LINEAR},vt={[Qd]:i.NEVER,[of]:i.ALWAYS,[tf]:i.LESS,[Nu]:i.LEQUAL,[ef]:i.EQUAL,[rf]:i.GEQUAL,[nf]:i.GREATER,[sf]:i.NOTEQUAL};function Mt(R,S){if(S.type===On&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Tn||S.magFilter===Ma||S.magFilter===Ar||S.magFilter===Fi||S.minFilter===Tn||S.minFilter===Ma||S.minFilter===Ar||S.minFilter===Fi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,K[S.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,K[S.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,K[S.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,_t[S.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,_t[S.minFilter]),S.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,vt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===We||S.minFilter!==Ar&&S.minFilter!==Fi||S.type===On&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Qt(R,S){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",L));let tt=S.source,st=d.get(tt);st===void 0&&(st={},d.set(tt,st));let et=B(S);if(et!==R.__cacheKey){st[et]===void 0&&(st[et]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),st[et].usedTimes++;let It=st[R.__cacheKey];It!==void 0&&(st[R.__cacheKey].usedTimes--,It.usedTimes===0&&U(S)),R.__cacheKey=et,R.__webglTexture=st[et].texture}return z}function re(R,S,z){let tt=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(tt=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(tt=i.TEXTURE_3D);let st=Qt(R,S),et=S.source;e.bindTexture(tt,R.__webglTexture,i.TEXTURE0+z);let It=n.get(et);if(et.version!==It.__version||st===!0){e.activeTexture(i.TEXTURE0+z);let pt=ue.getPrimaries(ue.workingColorSpace),wt=S.colorSpace===hi?null:ue.getPrimaries(S.colorSpace),ee=S.colorSpace===hi||pt===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let lt=p(S.image,!1,s.maxTextureSize);lt=Nt(S,lt);let Tt=r.convert(S.format,S.colorSpace),Vt=r.convert(S.type),Wt=v(S.internalFormat,Tt,Vt,S.colorSpace,S.isVideoTexture);Mt(tt,S);let Rt,ne=S.mipmaps,qt=S.isVideoTexture!==!0,xe=It.__version===void 0||st===!0,N=et.dataReady,St=E(S,lt);if(S.isDepthTexture)Wt=y(S.format===As,S.type),xe&&(qt?e.texStorage2D(i.TEXTURE_2D,1,Wt,lt.width,lt.height):e.texImage2D(i.TEXTURE_2D,0,Wt,lt.width,lt.height,0,Tt,Vt,null));else if(S.isDataTexture)if(ne.length>0){qt&&xe&&e.texStorage2D(i.TEXTURE_2D,St,Wt,ne[0].width,ne[0].height);for(let q=0,rt=ne.length;q<rt;q++)Rt=ne[q],qt?N&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Rt.width,Rt.height,Tt,Vt,Rt.data):e.texImage2D(i.TEXTURE_2D,q,Wt,Rt.width,Rt.height,0,Tt,Vt,Rt.data);S.generateMipmaps=!1}else qt?(xe&&e.texStorage2D(i.TEXTURE_2D,St,Wt,lt.width,lt.height),N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt.width,lt.height,Tt,Vt,lt.data)):e.texImage2D(i.TEXTURE_2D,0,Wt,lt.width,lt.height,0,Tt,Vt,lt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){qt&&xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Wt,ne[0].width,ne[0].height,lt.depth);for(let q=0,rt=ne.length;q<rt;q++)if(Rt=ne[q],S.format!==Rn)if(Tt!==null)if(qt){if(N)if(S.layerUpdates.size>0){let xt=cu(Rt.width,Rt.height,S.format,S.type);for(let bt of S.layerUpdates){let se=Rt.data.subarray(bt*xt/Rt.data.BYTES_PER_ELEMENT,(bt+1)*xt/Rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,bt,Rt.width,Rt.height,1,Tt,se,0,0)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Rt.width,Rt.height,lt.depth,Tt,Rt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Wt,Rt.width,Rt.height,lt.depth,0,Rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,Rt.width,Rt.height,lt.depth,Tt,Vt,Rt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Wt,Rt.width,Rt.height,lt.depth,0,Tt,Vt,Rt.data)}else{qt&&xe&&e.texStorage2D(i.TEXTURE_2D,St,Wt,ne[0].width,ne[0].height);for(let q=0,rt=ne.length;q<rt;q++)Rt=ne[q],S.format!==Rn?Tt!==null?qt?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,Rt.width,Rt.height,Tt,Rt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Wt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?N&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Rt.width,Rt.height,Tt,Vt,Rt.data):e.texImage2D(i.TEXTURE_2D,q,Wt,Rt.width,Rt.height,0,Tt,Vt,Rt.data)}else if(S.isDataArrayTexture)if(qt){if(xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Wt,lt.width,lt.height,lt.depth),N)if(S.layerUpdates.size>0){let q=cu(lt.width,lt.height,S.format,S.type);for(let rt of S.layerUpdates){let xt=lt.data.subarray(rt*q/lt.data.BYTES_PER_ELEMENT,(rt+1)*q/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,rt,lt.width,lt.height,1,Tt,Vt,xt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,Tt,Vt,lt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Wt,lt.width,lt.height,lt.depth,0,Tt,Vt,lt.data);else if(S.isData3DTexture)qt?(xe&&e.texStorage3D(i.TEXTURE_3D,St,Wt,lt.width,lt.height,lt.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,Tt,Vt,lt.data)):e.texImage3D(i.TEXTURE_3D,0,Wt,lt.width,lt.height,lt.depth,0,Tt,Vt,lt.data);else if(S.isFramebufferTexture){if(xe)if(qt)e.texStorage2D(i.TEXTURE_2D,St,Wt,lt.width,lt.height);else{let q=lt.width,rt=lt.height;for(let xt=0;xt<St;xt++)e.texImage2D(i.TEXTURE_2D,xt,Wt,q,rt,0,Tt,Vt,null),q>>=1,rt>>=1}}else if(ne.length>0){if(qt&&xe){let q=Et(ne[0]);e.texStorage2D(i.TEXTURE_2D,St,Wt,q.width,q.height)}for(let q=0,rt=ne.length;q<rt;q++)Rt=ne[q],qt?N&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Tt,Vt,Rt):e.texImage2D(i.TEXTURE_2D,q,Wt,Tt,Vt,Rt);S.generateMipmaps=!1}else if(qt){if(xe){let q=Et(lt);e.texStorage2D(i.TEXTURE_2D,St,Wt,q.width,q.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Tt,Vt,lt)}else e.texImage2D(i.TEXTURE_2D,0,Wt,Tt,Vt,lt);_(S)&&m(tt),It.__version=et.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function Q(R,S,z){if(S.image.length!==6)return;let tt=Qt(R,S),st=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+z);let et=n.get(st);if(st.version!==et.__version||tt===!0){e.activeTexture(i.TEXTURE0+z);let It=ue.getPrimaries(ue.workingColorSpace),pt=S.colorSpace===hi?null:ue.getPrimaries(S.colorSpace),wt=S.colorSpace===hi||It===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);let ee=S.isCompressedTexture||S.image[0].isCompressedTexture,lt=S.image[0]&&S.image[0].isDataTexture,Tt=[];for(let rt=0;rt<6;rt++)!ee&&!lt?Tt[rt]=p(S.image[rt],!0,s.maxCubemapSize):Tt[rt]=lt?S.image[rt].image:S.image[rt],Tt[rt]=Nt(S,Tt[rt]);let Vt=Tt[0],Wt=r.convert(S.format,S.colorSpace),Rt=r.convert(S.type),ne=v(S.internalFormat,Wt,Rt,S.colorSpace),qt=S.isVideoTexture!==!0,xe=et.__version===void 0||tt===!0,N=st.dataReady,St=E(S,Vt);Mt(i.TEXTURE_CUBE_MAP,S);let q;if(ee){qt&&xe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ne,Vt.width,Vt.height);for(let rt=0;rt<6;rt++){q=Tt[rt].mipmaps;for(let xt=0;xt<q.length;xt++){let bt=q[xt];S.format!==Rn?Wt!==null?qt?N&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt,0,0,bt.width,bt.height,Wt,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt,ne,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt,0,0,bt.width,bt.height,Wt,Rt,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt,ne,bt.width,bt.height,0,Wt,Rt,bt.data)}}}else{if(q=S.mipmaps,qt&&xe){q.length>0&&St++;let rt=Et(Tt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ne,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(lt){qt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Tt[rt].width,Tt[rt].height,Wt,Rt,Tt[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,ne,Tt[rt].width,Tt[rt].height,0,Wt,Rt,Tt[rt].data);for(let xt=0;xt<q.length;xt++){let se=q[xt].image[rt].image;qt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt+1,0,0,se.width,se.height,Wt,Rt,se.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt+1,ne,se.width,se.height,0,Wt,Rt,se.data)}}else{qt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Wt,Rt,Tt[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,ne,Wt,Rt,Tt[rt]);for(let xt=0;xt<q.length;xt++){let bt=q[xt];qt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt+1,0,0,Wt,Rt,bt.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt+1,ne,Wt,Rt,bt.image[rt])}}}_(S)&&m(i.TEXTURE_CUBE_MAP),et.__version=st.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function ct(R,S,z,tt,st,et){let It=r.convert(z.format,z.colorSpace),pt=r.convert(z.type),wt=v(z.internalFormat,It,pt,z.colorSpace);if(!n.get(S).__hasExternalTextures){let lt=Math.max(1,S.width>>et),Tt=Math.max(1,S.height>>et);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,et,wt,lt,Tt,S.depth,0,It,pt,null):e.texImage2D(st,et,wt,lt,Tt,0,It,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),ot(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,st,n.get(z).__webglTexture,0,ut(S)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,tt,st,n.get(z).__webglTexture,et),e.bindFramebuffer(i.FRAMEBUFFER,null)}function At(R,S,z){if(i.bindRenderbuffer(i.RENDERBUFFER,R),S.depthBuffer){let tt=S.depthTexture,st=tt&&tt.isDepthTexture?tt.type:null,et=y(S.stencilBuffer,st),It=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=ut(S);ot(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,et,S.width,S.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,et,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,et,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,It,i.RENDERBUFFER,R)}else{let tt=S.textures;for(let st=0;st<tt.length;st++){let et=tt[st],It=r.convert(et.format,et.colorSpace),pt=r.convert(et.type),wt=v(et.internalFormat,It,pt,et.colorSpace),ee=ut(S);z&&ot(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,wt,S.width,S.height):ot(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,wt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,wt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function gt(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),X(S.depthTexture,0);let tt=n.get(S.depthTexture).__webglTexture,st=ut(S);if(S.depthTexture.format===vs)ot(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(S.depthTexture.format===As)ot(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Ht(R){let S=n.get(R),z=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){let tt=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),tt){let st=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,tt.removeEventListener("dispose",st)};tt.addEventListener("dispose",st),S.__depthDisposeCallback=st}S.__boundDepthTexture=tt}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");gt(S.__webglFramebuffer,R)}else if(z){S.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[tt]),S.__webglDepthbuffer[tt]===void 0)S.__webglDepthbuffer[tt]=i.createRenderbuffer(),At(S.__webglDepthbuffer[tt],R,!1);else{let st=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=S.__webglDepthbuffer[tt];i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,et)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),At(S.__webglDepthbuffer,R,!1);else{let tt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,st)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Bt(R,S,z){let tt=n.get(R);S!==void 0&&ct(tt.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ht(R)}function Xt(R){let S=R.texture,z=n.get(R),tt=n.get(S);R.addEventListener("dispose",T);let st=R.textures,et=R.isWebGLCubeRenderTarget===!0,It=st.length>1;if(It||(tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture()),tt.__version=S.version,o.memory.textures++),et){z.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[pt]=[];for(let wt=0;wt<S.mipmaps.length;wt++)z.__webglFramebuffer[pt][wt]=i.createFramebuffer()}else z.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let pt=0;pt<S.mipmaps.length;pt++)z.__webglFramebuffer[pt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(It)for(let pt=0,wt=st.length;pt<wt;pt++){let ee=n.get(st[pt]);ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&ot(R)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let pt=0;pt<st.length;pt++){let wt=st[pt];z.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[pt]);let ee=r.convert(wt.format,wt.colorSpace),lt=r.convert(wt.type),Tt=v(wt.internalFormat,ee,lt,wt.colorSpace,R.isXRRenderTarget===!0),Vt=ut(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt,Tt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,z.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),At(z.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture),Mt(i.TEXTURE_CUBE_MAP,S);for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0)for(let wt=0;wt<S.mipmaps.length;wt++)ct(z.__webglFramebuffer[pt][wt],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,wt);else ct(z.__webglFramebuffer[pt],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);_(S)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let pt=0,wt=st.length;pt<wt;pt++){let ee=st[pt],lt=n.get(ee);e.bindTexture(i.TEXTURE_2D,lt.__webglTexture),Mt(i.TEXTURE_2D,ee),ct(z.__webglFramebuffer,R,ee,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),_(ee)&&m(i.TEXTURE_2D)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(pt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,tt.__webglTexture),Mt(pt,S),S.mipmaps&&S.mipmaps.length>0)for(let wt=0;wt<S.mipmaps.length;wt++)ct(z.__webglFramebuffer[wt],R,S,i.COLOR_ATTACHMENT0,pt,wt);else ct(z.__webglFramebuffer,R,S,i.COLOR_ATTACHMENT0,pt,0);_(S)&&m(pt),e.unbindTexture()}R.depthBuffer&&Ht(R)}function Jt(R){let S=R.textures;for(let z=0,tt=S.length;z<tt;z++){let st=S[z];if(_(st)){let et=R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,It=n.get(st).__webglTexture;e.bindTexture(et,It),m(et),e.unbindTexture()}}}let it=[],I=[];function dt(R){if(R.samples>0){if(ot(R)===!1){let S=R.textures,z=R.width,tt=R.height,st=i.COLOR_BUFFER_BIT,et=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,It=n.get(R),pt=S.length>1;if(pt)for(let wt=0;wt<S.length;wt++)e.bindFramebuffer(i.FRAMEBUFFER,It.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,It.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let wt=0;wt<S.length;wt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,It.__webglColorRenderbuffer[wt]);let ee=n.get(S[wt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ee,0)}i.blitFramebuffer(0,0,z,tt,0,0,z,tt,st,i.NEAREST),c===!0&&(it.length=0,I.length=0,it.push(i.COLOR_ATTACHMENT0+wt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(it.push(et),I.push(et),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,I)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,it))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let wt=0;wt<S.length;wt++){e.bindFramebuffer(i.FRAMEBUFFER,It.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.RENDERBUFFER,It.__webglColorRenderbuffer[wt]);let ee=n.get(S[wt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,It.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+wt,i.TEXTURE_2D,ee,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){let S=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function ut(R){return Math.min(s.maxSamples,R.samples)}function ot(R){let S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ft(R){let S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function Nt(R,S){let z=R.colorSpace,tt=R.format,st=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||z!==xi&&z!==hi&&(ue.getTransfer(z)===Me?(tt!==Rn||st!==Jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function Et(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=b,this.setTexture2D=X,this.setTexture2DArray=nt,this.setTexture3D=V,this.setTextureCube=at,this.rebindTextures=Bt,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=Jt,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=ot}function p_(i,t){function e(n,s=hi){let r,o=ue.getTransfer(s);if(n===Jn)return i.UNSIGNED_BYTE;if(n===Cl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Pl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ru)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Tu)return i.BYTE;if(n===Au)return i.SHORT;if(n===or)return i.UNSIGNED_SHORT;if(n===Rl)return i.INT;if(n===Hi)return i.UNSIGNED_INT;if(n===On)return i.FLOAT;if(n===mr)return i.HALF_FLOAT;if(n===Cu)return i.ALPHA;if(n===Pu)return i.RGB;if(n===Rn)return i.RGBA;if(n===Iu)return i.LUMINANCE;if(n===Du)return i.LUMINANCE_ALPHA;if(n===vs)return i.DEPTH_COMPONENT;if(n===As)return i.DEPTH_STENCIL;if(n===gr)return i.RED;if(n===Il)return i.RED_INTEGER;if(n===Lu)return i.RG;if(n===Dl)return i.RG_INTEGER;if(n===Ll)return i.RGBA_INTEGER;if(n===so||n===ro||n===oo||n===ao)if(o===Me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===so)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===so)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ao)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pc||n===mc||n===gc||n===_c)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_c)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xc||n===yc||n===vc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xc||n===yc)return o===Me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Mc||n===Ec||n===Sc||n===bc||n===wc||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===Ic||n===Dc||n===Lc||n===Uc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Mc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ec)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===bc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===wc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Tc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ac)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Cc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ic)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Lc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Uc)return o===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===co||n===Nc||n===Oc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===co)return o===Me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Nc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Oc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Uu||n===Fc||n===Bc||n===Hc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===co)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Fc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ts?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var el=class extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},j=class extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}},m_={type:"move"},ir=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new j,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new j,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new j,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let p of t.hand.values()){let _=e.getJointPose(p,n),m=this._getHandJoint(l,p);_!==null&&(m.matrix.fromArray(_.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=_.radius),m.visible=_!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(m_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new j;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},g_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,__=`
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

}`,nl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new cn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new en({vertexShader:g_,fragmentShader:__,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new J(new Ae(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},il=class extends $n{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,p=new nl,_=e.getContextAttributes(),m=null,v=null,y=[],E=[],L=new $,T=null,A=new Je;A.layers.enable(1),A.viewport=new me;let U=new Je;U.layers.enable(2),U.viewport=new me;let k=[A,U],M=new el;M.layers.enable(1),M.layers.enable(2);let b=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ct=y[Q];return ct===void 0&&(ct=new ir,y[Q]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(Q){let ct=y[Q];return ct===void 0&&(ct=new ir,y[Q]=ct),ct.getGripSpace()},this.getHand=function(Q){let ct=y[Q];return ct===void 0&&(ct=new ir,y[Q]=ct),ct.getHandSpace()};function B(Q){let ct=E.indexOf(Q.inputSource);if(ct===-1)return;let At=y[ct];At!==void 0&&(At.update(Q.inputSource,Q.frame,l||o),At.dispatchEvent({type:Q.type,data:Q.inputSource}))}function X(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",nt);for(let Q=0;Q<y.length;Q++){let ct=E[Q];ct!==null&&(E[Q]=null,y[Q].disconnect(ct))}b=null,H=null,p.reset(),t.setRenderTarget(m),f=null,d=null,u=null,s=null,v=null,re.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",X),s.addEventListener("inputsourceschange",nt),_.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){let ct={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,ct),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new jn(f.framebufferWidth,f.framebufferHeight,{format:Rn,type:Jn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let ct=null,At=null,gt=null;_.depth&&(gt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=_.stencil?As:vs,At=_.stencil?Ts:Hi);let Ht={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Ht),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new jn(d.textureWidth,d.textureHeight,{format:Rn,type:Jn,depthTexture:new To(d.textureWidth,d.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),re.setContext(s),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function nt(Q){for(let ct=0;ct<Q.removed.length;ct++){let At=Q.removed[ct],gt=E.indexOf(At);gt>=0&&(E[gt]=null,y[gt].disconnect(At))}for(let ct=0;ct<Q.added.length;ct++){let At=Q.added[ct],gt=E.indexOf(At);if(gt===-1){for(let Bt=0;Bt<y.length;Bt++)if(Bt>=E.length){E.push(At),gt=Bt;break}else if(E[Bt]===null){E[Bt]=At,gt=Bt;break}if(gt===-1)break}let Ht=y[gt];Ht&&Ht.connect(At)}}let V=new C,at=new C;function K(Q,ct,At){V.setFromMatrixPosition(ct.matrixWorld),at.setFromMatrixPosition(At.matrixWorld);let gt=V.distanceTo(at),Ht=ct.projectionMatrix.elements,Bt=At.projectionMatrix.elements,Xt=Ht[14]/(Ht[10]-1),Jt=Ht[14]/(Ht[10]+1),it=(Ht[9]+1)/Ht[5],I=(Ht[9]-1)/Ht[5],dt=(Ht[8]-1)/Ht[0],ut=(Bt[8]+1)/Bt[0],ot=Xt*dt,ft=Xt*ut,Nt=gt/(-dt+ut),Et=Nt*-dt;if(ct.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Et),Q.translateZ(Nt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ht[10]===-1)Q.projectionMatrix.copy(ct.projectionMatrix),Q.projectionMatrixInverse.copy(ct.projectionMatrixInverse);else{let R=Xt+Nt,S=Jt+Nt,z=ot-Et,tt=ft+(gt-Et),st=it*Jt/S*R,et=I*Jt/S*R;Q.projectionMatrix.makePerspective(z,tt,st,et,R,S),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function _t(Q,ct){ct===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ct.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let ct=Q.near,At=Q.far;p.texture!==null&&(p.depthNear>0&&(ct=p.depthNear),p.depthFar>0&&(At=p.depthFar)),M.near=U.near=A.near=ct,M.far=U.far=A.far=At,(b!==M.near||H!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),b=M.near,H=M.far);let gt=Q.parent,Ht=M.cameras;_t(M,gt);for(let Bt=0;Bt<Ht.length;Bt++)_t(Ht[Bt],gt);Ht.length===2?K(M,A,U):M.projectionMatrix.copy(A.projectionMatrix),vt(Q,M,gt)};function vt(Q,ct,At){At===null?Q.matrix.copy(ct.matrixWorld):(Q.matrix.copy(At.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ct.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ct.projectionMatrix),Q.projectionMatrixInverse.copy(ct.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ar*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Q){c=Q,d!==null&&(d.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(M)};let Mt=null;function Qt(Q,ct){if(h=ct.getViewerPose(l||o),g=ct,h!==null){let At=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let gt=!1;At.length!==M.cameras.length&&(M.cameras.length=0,gt=!0);for(let Bt=0;Bt<At.length;Bt++){let Xt=At[Bt],Jt=null;if(f!==null)Jt=f.getViewport(Xt);else{let I=u.getViewSubImage(d,Xt);Jt=I.viewport,Bt===0&&(t.setRenderTargetTextures(v,I.colorTexture,d.ignoreDepthValues?void 0:I.depthStencilTexture),t.setRenderTarget(v))}let it=k[Bt];it===void 0&&(it=new Je,it.layers.enable(Bt),it.viewport=new me,k[Bt]=it),it.matrix.fromArray(Xt.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(Xt.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),Bt===0&&(M.matrix.copy(it.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),gt===!0&&M.cameras.push(it)}let Ht=s.enabledFeatures;if(Ht&&Ht.includes("depth-sensing")){let Bt=u.getDepthInformation(At[0]);Bt&&Bt.isValid&&Bt.texture&&p.init(t,Bt,s.renderState)}}for(let At=0;At<y.length;At++){let gt=E[At],Ht=y[At];gt!==null&&Ht!==void 0&&Ht.update(gt,ct,l||o)}Mt&&Mt(Q,ct),ct.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ct}),g=null}let re=new zu;re.setAnimationLoop(Qt),this.setAnimationLoop=function(Q){Mt=Q},this.dispose=function(){}}},Di=new Bn,x_=new ge;function y_(i,t){function e(_,m){_.matrixAutoUpdate===!0&&_.updateMatrix(),m.value.copy(_.matrix)}function n(_,m){m.color.getRGB(_.fogColor.value,Hu(i)),m.isFog?(_.fogNear.value=m.near,_.fogFar.value=m.far):m.isFogExp2&&(_.fogDensity.value=m.density)}function s(_,m,v,y,E){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(_,m):m.isMeshToonMaterial?(r(_,m),u(_,m)):m.isMeshPhongMaterial?(r(_,m),h(_,m)):m.isMeshStandardMaterial?(r(_,m),d(_,m),m.isMeshPhysicalMaterial&&f(_,m,E)):m.isMeshMatcapMaterial?(r(_,m),g(_,m)):m.isMeshDepthMaterial?r(_,m):m.isMeshDistanceMaterial?(r(_,m),p(_,m)):m.isMeshNormalMaterial?r(_,m):m.isLineBasicMaterial?(o(_,m),m.isLineDashedMaterial&&a(_,m)):m.isPointsMaterial?c(_,m,v,y):m.isSpriteMaterial?l(_,m):m.isShadowMaterial?(_.color.value.copy(m.color),_.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(_,m){_.opacity.value=m.opacity,m.color&&_.diffuse.value.copy(m.color),m.emissive&&_.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(_.map.value=m.map,e(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,e(m.alphaMap,_.alphaMapTransform)),m.bumpMap&&(_.bumpMap.value=m.bumpMap,e(m.bumpMap,_.bumpMapTransform),_.bumpScale.value=m.bumpScale,m.side===$e&&(_.bumpScale.value*=-1)),m.normalMap&&(_.normalMap.value=m.normalMap,e(m.normalMap,_.normalMapTransform),_.normalScale.value.copy(m.normalScale),m.side===$e&&_.normalScale.value.negate()),m.displacementMap&&(_.displacementMap.value=m.displacementMap,e(m.displacementMap,_.displacementMapTransform),_.displacementScale.value=m.displacementScale,_.displacementBias.value=m.displacementBias),m.emissiveMap&&(_.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,_.emissiveMapTransform)),m.specularMap&&(_.specularMap.value=m.specularMap,e(m.specularMap,_.specularMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest);let v=t.get(m),y=v.envMap,E=v.envMapRotation;y&&(_.envMap.value=y,Di.copy(E),Di.x*=-1,Di.y*=-1,Di.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),_.envMapRotation.value.setFromMatrix4(x_.makeRotationFromEuler(Di)),_.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=m.reflectivity,_.ior.value=m.ior,_.refractionRatio.value=m.refractionRatio),m.lightMap&&(_.lightMap.value=m.lightMap,_.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,_.lightMapTransform)),m.aoMap&&(_.aoMap.value=m.aoMap,_.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,_.aoMapTransform))}function o(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,m.map&&(_.map.value=m.map,e(m.map,_.mapTransform))}function a(_,m){_.dashSize.value=m.dashSize,_.totalSize.value=m.dashSize+m.gapSize,_.scale.value=m.scale}function c(_,m,v,y){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.size.value=m.size*v,_.scale.value=y*.5,m.map&&(_.map.value=m.map,e(m.map,_.uvTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,e(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function l(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.rotation.value=m.rotation,m.map&&(_.map.value=m.map,e(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,e(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function h(_,m){_.specular.value.copy(m.specular),_.shininess.value=Math.max(m.shininess,1e-4)}function u(_,m){m.gradientMap&&(_.gradientMap.value=m.gradientMap)}function d(_,m){_.metalness.value=m.metalness,m.metalnessMap&&(_.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,_.metalnessMapTransform)),_.roughness.value=m.roughness,m.roughnessMap&&(_.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,_.roughnessMapTransform)),m.envMap&&(_.envMapIntensity.value=m.envMapIntensity)}function f(_,m,v){_.ior.value=m.ior,m.sheen>0&&(_.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),_.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(_.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,_.sheenColorMapTransform)),m.sheenRoughnessMap&&(_.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,_.sheenRoughnessMapTransform))),m.clearcoat>0&&(_.clearcoat.value=m.clearcoat,_.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(_.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,_.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(_.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$e&&_.clearcoatNormalScale.value.negate())),m.dispersion>0&&(_.dispersion.value=m.dispersion),m.iridescence>0&&(_.iridescence.value=m.iridescence,_.iridescenceIOR.value=m.iridescenceIOR,_.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(_.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,_.iridescenceMapTransform)),m.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),m.transmission>0&&(_.transmission.value=m.transmission,_.transmissionSamplerMap.value=v.texture,_.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(_.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,_.transmissionMapTransform)),_.thickness.value=m.thickness,m.thicknessMap&&(_.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=m.attenuationDistance,_.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(_.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(_.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=m.specularIntensity,_.specularColor.value.copy(m.specularColor),m.specularColorMap&&(_.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,_.specularColorMapTransform)),m.specularIntensityMap&&(_.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,_.specularIntensityMapTransform))}function g(_,m){m.matcap&&(_.matcap.value=m.matcap)}function p(_,m){let v=t.get(m).light;_.referencePosition.value.setFromMatrixPosition(v.matrixWorld),_.nearDistance.value=v.shadow.camera.near,_.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function v_(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){let E=y.program;n.uniformBlockBinding(v,E)}function l(v,y){let E=s[v.id];E===void 0&&(g(v),E=h(v),s[v.id]=E,v.addEventListener("dispose",_));let L=y.program;n.updateUBOMapping(v,L);let T=t.render.frame;r[v.id]!==T&&(d(v),r[v.id]=T)}function h(v){let y=u();v.__bindingPointIndex=y;let E=i.createBuffer(),L=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,L,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,E),E}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let y=s[v.id],E=v.uniforms,L=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,A=E.length;T<A;T++){let U=Array.isArray(E[T])?E[T]:[E[T]];for(let k=0,M=U.length;k<M;k++){let b=U[k];if(f(b,T,k,L)===!0){let H=b.__offset,B=Array.isArray(b.value)?b.value:[b.value],X=0;for(let nt=0;nt<B.length;nt++){let V=B[nt],at=p(V);typeof V=="number"||typeof V=="boolean"?(b.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,H+X,b.__data)):V.isMatrix3?(b.__data[0]=V.elements[0],b.__data[1]=V.elements[1],b.__data[2]=V.elements[2],b.__data[3]=0,b.__data[4]=V.elements[3],b.__data[5]=V.elements[4],b.__data[6]=V.elements[5],b.__data[7]=0,b.__data[8]=V.elements[6],b.__data[9]=V.elements[7],b.__data[10]=V.elements[8],b.__data[11]=0):(V.toArray(b.__data,X),X+=at.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,b.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,y,E,L){let T=v.value,A=y+"_"+E;if(L[A]===void 0)return typeof T=="number"||typeof T=="boolean"?L[A]=T:L[A]=T.clone(),!0;{let U=L[A];if(typeof T=="number"||typeof T=="boolean"){if(U!==T)return L[A]=T,!0}else if(U.equals(T)===!1)return U.copy(T),!0}return!1}function g(v){let y=v.uniforms,E=0,L=16;for(let A=0,U=y.length;A<U;A++){let k=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,b=k.length;M<b;M++){let H=k[M],B=Array.isArray(H.value)?H.value:[H.value];for(let X=0,nt=B.length;X<nt;X++){let V=B[X],at=p(V),K=E%L,_t=K%at.boundary,vt=K+_t;E+=_t,vt!==0&&L-vt<at.storage&&(E+=L-vt),H.__data=new Float32Array(at.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=E,E+=at.storage}}}let T=E%L;return T>0&&(E+=L-T),v.__size=E,v.__cache={},this}function p(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function _(v){let y=v.target;y.removeEventListener("dispose",_);let E=o.indexOf(y.__bindingPointIndex);o.splice(E,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function m(){for(let v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:m}}var Ao=class{constructor(t={}){let{canvas:e=Sf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;let f=new Uint32Array(4),g=new Int32Array(4),p=null,_=null,m=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=on,this.toneMapping=fi,this.toneMappingExposure=1;let y=this,E=!1,L=0,T=0,A=null,U=-1,k=null,M=new me,b=new me,H=null,B=new Pt(0),X=0,nt=e.width,V=e.height,at=1,K=null,_t=null,vt=new me(0,0,nt,V),Mt=new me(0,0,nt,V),Qt=!1,re=new cr,Q=!1,ct=!1,At=new ge,gt=new ge,Ht=new C,Bt=new me,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Jt=!1;function it(){return A===null?at:1}let I=n;function dt(w,O){return e.getContext(w,O)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r169"),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",bt,!1),I===null){let O="webgl2";if(I=dt(O,w),I===null)throw dt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let ut,ot,ft,Nt,Et,R,S,z,tt,st,et,It,pt,wt,ee,lt,Tt,Vt,Wt,Rt,ne,qt,xe,N;function St(){ut=new Om(I),ut.init(),qt=new p_(I,ut),ot=new Pm(I,ut,t,qt),ft=new u_(I),ot.reverseDepthBuffer&&ft.buffers.depth.setReversed(!0),Nt=new Hm(I),Et=new jg,R=new f_(I,ut,ft,Et,ot,qt,Nt),S=new Dm(y),z=new Nm(y),tt=new Yf(I),xe=new Rm(I,tt),st=new Fm(I,tt,Nt,xe),et=new km(I,st,tt,Nt),Wt=new zm(I,ot,R),lt=new Im(Et),It=new $g(y,S,z,ut,ot,xe,lt),pt=new y_(y,Et),wt=new t_,ee=new o_(ut),Vt=new Am(y,S,z,ft,et,d,c),Tt=new l_(y,et,ot),N=new v_(I,Nt,ot,ft),Rt=new Cm(I,ut,Nt),ne=new Bm(I,ut,Nt),Nt.programs=It.programs,y.capabilities=ot,y.extensions=ut,y.properties=Et,y.renderLists=wt,y.shadowMap=Tt,y.state=ft,y.info=Nt}St();let q=new il(y,I);this.xr=q,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let w=ut.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ut.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return at},this.setPixelRatio=function(w){w!==void 0&&(at=w,this.setSize(nt,V,!1))},this.getSize=function(w){return w.set(nt,V)},this.setSize=function(w,O,W=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}nt=w,V=O,e.width=Math.floor(w*at),e.height=Math.floor(O*at),W===!0&&(e.style.width=w+"px",e.style.height=O+"px"),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(nt*at,V*at).floor()},this.setDrawingBufferSize=function(w,O,W){nt=w,V=O,at=W,e.width=Math.floor(w*W),e.height=Math.floor(O*W),this.setViewport(0,0,w,O)},this.getCurrentViewport=function(w){return w.copy(M)},this.getViewport=function(w){return w.copy(vt)},this.setViewport=function(w,O,W,Y){w.isVector4?vt.set(w.x,w.y,w.z,w.w):vt.set(w,O,W,Y),ft.viewport(M.copy(vt).multiplyScalar(at).round())},this.getScissor=function(w){return w.copy(Mt)},this.setScissor=function(w,O,W,Y){w.isVector4?Mt.set(w.x,w.y,w.z,w.w):Mt.set(w,O,W,Y),ft.scissor(b.copy(Mt).multiplyScalar(at).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(w){ft.setScissorTest(Qt=w)},this.setOpaqueSort=function(w){K=w},this.setTransparentSort=function(w){_t=w},this.getClearColor=function(w){return w.copy(Vt.getClearColor())},this.setClearColor=function(){Vt.setClearColor.apply(Vt,arguments)},this.getClearAlpha=function(){return Vt.getClearAlpha()},this.setClearAlpha=function(){Vt.setClearAlpha.apply(Vt,arguments)},this.clear=function(w=!0,O=!0,W=!0){let Y=0;if(w){let F=!1;if(A!==null){let ht=A.texture.format;F=ht===Ll||ht===Dl||ht===Il}if(F){let ht=A.texture.type,yt=ht===Jn||ht===Hi||ht===or||ht===Ts||ht===Cl||ht===Pl,Ct=Vt.getClearColor(),Dt=Vt.getClearAlpha(),zt=Ct.r,Gt=Ct.g,Lt=Ct.b;yt?(f[0]=zt,f[1]=Gt,f[2]=Lt,f[3]=Dt,I.clearBufferuiv(I.COLOR,0,f)):(g[0]=zt,g[1]=Gt,g[2]=Lt,g[3]=Dt,I.clearBufferiv(I.COLOR,0,g))}else Y|=I.COLOR_BUFFER_BIT}O&&(Y|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),W&&(Y|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),wt.dispose(),ee.dispose(),Et.dispose(),S.dispose(),z.dispose(),et.dispose(),xe.dispose(),N.dispose(),It.dispose(),q.dispose(),q.removeEventListener("sessionstart",oh),q.removeEventListener("sessionend",ah),Ti.stop()};function rt(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let w=Nt.autoReset,O=Tt.enabled,W=Tt.autoUpdate,Y=Tt.needsUpdate,F=Tt.type;St(),Nt.autoReset=w,Tt.enabled=O,Tt.autoUpdate=W,Tt.needsUpdate=Y,Tt.type=F}function bt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function se(w){let O=w.target;O.removeEventListener("dispose",se),Le(O)}function Le(w){sn(w),Et.remove(w)}function sn(w){let O=Et.get(w).programs;O!==void 0&&(O.forEach(function(W){It.releaseProgram(W)}),w.isShaderMaterial&&It.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,W,Y,F,ht){O===null&&(O=Xt);let yt=F.isMesh&&F.matrixWorld.determinant()<0,Ct=_d(w,O,W,Y,F);ft.setMaterial(Y,yt);let Dt=W.index,zt=1;if(Y.wireframe===!0){if(Dt=st.getWireframeAttribute(W),Dt===void 0)return;zt=2}let Gt=W.drawRange,Lt=W.attributes.position,de=Gt.start*zt,ve=(Gt.start+Gt.count)*zt;ht!==null&&(de=Math.max(de,ht.start*zt),ve=Math.min(ve,(ht.start+ht.count)*zt)),Dt!==null?(de=Math.max(de,0),ve=Math.min(ve,Dt.count)):Lt!=null&&(de=Math.max(de,0),ve=Math.min(ve,Lt.count));let Re=ve-de;if(Re<0||Re===1/0)return;xe.setup(F,Y,Ct,W,Dt);let hn,le=Rt;if(Dt!==null&&(hn=tt.get(Dt),le=ne,le.setIndex(hn)),F.isMesh)Y.wireframe===!0?(ft.setLineWidth(Y.wireframeLinewidth*it()),le.setMode(I.LINES)):le.setMode(I.TRIANGLES);else if(F.isLine){let Ot=Y.linewidth;Ot===void 0&&(Ot=1),ft.setLineWidth(Ot*it()),F.isLineSegments?le.setMode(I.LINES):F.isLineLoop?le.setMode(I.LINE_LOOP):le.setMode(I.LINE_STRIP)}else F.isPoints?le.setMode(I.POINTS):F.isSprite&&le.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)le.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(ut.get("WEBGL_multi_draw"))le.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Ot=F._multiDrawStarts,Ve=F._multiDrawCounts,he=F._multiDrawCount,Mn=Dt?tt.get(Dt).bytesPerElement:1,$i=Et.get(Y).currentProgram.getUniforms();for(let un=0;un<he;un++)$i.setValue(I,"_gl_DrawID",un),le.render(Ot[un]/Mn,Ve[un])}else if(F.isInstancedMesh)le.renderInstances(de,Re,F.count);else if(W.isInstancedBufferGeometry){let Ot=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ve=Math.min(W.instanceCount,Ot);le.renderInstances(de,Re,Ve)}else le.render(de,Re)};function oe(w,O,W){w.transparent===!0&&w.side===Yt&&w.forceSinglePass===!1?(w.side=$e,w.needsUpdate=!0,Tr(w,O,W),w.side=mi,w.needsUpdate=!0,Tr(w,O,W),w.side=Yt):Tr(w,O,W)}this.compile=function(w,O,W=null){W===null&&(W=w),_=ee.get(W),_.init(O),v.push(_),W.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(_.pushLight(F),F.castShadow&&_.pushShadow(F))}),w!==W&&w.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(_.pushLight(F),F.castShadow&&_.pushShadow(F))}),_.setupLights();let Y=new Set;return w.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let ht=F.material;if(ht)if(Array.isArray(ht))for(let yt=0;yt<ht.length;yt++){let Ct=ht[yt];oe(Ct,W,F),Y.add(Ct)}else oe(ht,W,F),Y.add(ht)}),v.pop(),_=null,Y},this.compileAsync=function(w,O,W=null){let Y=this.compile(w,O,W);return new Promise(F=>{function ht(){if(Y.forEach(function(yt){Et.get(yt).currentProgram.isReady()&&Y.delete(yt)}),Y.size===0){F(w);return}setTimeout(ht,10)}ut.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let rn=null;function Gn(w){rn&&rn(w)}function oh(){Ti.stop()}function ah(){Ti.start()}let Ti=new zu;Ti.setAnimationLoop(Gn),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(w){rn=w,q.setAnimationLoop(w),w===null?Ti.stop():Ti.start()},q.addEventListener("sessionstart",oh),q.addEventListener("sessionend",ah),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(O),O=q.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,O,A),_=ee.get(w,v.length),_.init(O),v.push(_),gt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),re.setFromProjectionMatrix(gt),ct=this.localClippingEnabled,Q=lt.init(this.clippingPlanes,ct),p=wt.get(w,m.length),p.init(),m.push(p),q.enabled===!0&&q.isPresenting===!0){let ht=y.xr.getDepthSensingMesh();ht!==null&&_a(ht,O,-1/0,y.sortObjects)}_a(w,O,0,y.sortObjects),p.finish(),y.sortObjects===!0&&p.sort(K,_t),Jt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Jt&&Vt.addToRenderList(p,w),this.info.render.frame++,Q===!0&&lt.beginShadows();let W=_.state.shadowsArray;Tt.render(W,w,O),Q===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();let Y=p.opaque,F=p.transmissive;if(_.setupLights(),O.isArrayCamera){let ht=O.cameras;if(F.length>0)for(let yt=0,Ct=ht.length;yt<Ct;yt++){let Dt=ht[yt];lh(Y,F,w,Dt)}Jt&&Vt.render(w);for(let yt=0,Ct=ht.length;yt<Ct;yt++){let Dt=ht[yt];ch(p,w,Dt,Dt.viewport)}}else F.length>0&&lh(Y,F,w,O),Jt&&Vt.render(w),ch(p,w,O);A!==null&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),w.isScene===!0&&w.onAfterRender(y,w,O),xe.resetDefaultState(),U=-1,k=null,v.pop(),v.length>0?(_=v[v.length-1],Q===!0&&lt.setGlobalState(y.clippingPlanes,_.state.camera)):_=null,m.pop(),m.length>0?p=m[m.length-1]:p=null};function _a(w,O,W,Y){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)W=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)_.pushLight(w),w.castShadow&&_.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||re.intersectsSprite(w)){Y&&Bt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(gt);let yt=et.update(w),Ct=w.material;Ct.visible&&p.push(w,yt,Ct,W,Bt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||re.intersectsObject(w))){let yt=et.update(w),Ct=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Bt.copy(w.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Bt.copy(yt.boundingSphere.center)),Bt.applyMatrix4(w.matrixWorld).applyMatrix4(gt)),Array.isArray(Ct)){let Dt=yt.groups;for(let zt=0,Gt=Dt.length;zt<Gt;zt++){let Lt=Dt[zt],de=Ct[Lt.materialIndex];de&&de.visible&&p.push(w,yt,de,W,Bt.z,Lt)}}else Ct.visible&&p.push(w,yt,Ct,W,Bt.z,null)}}let ht=w.children;for(let yt=0,Ct=ht.length;yt<Ct;yt++)_a(ht[yt],O,W,Y)}function ch(w,O,W,Y){let F=w.opaque,ht=w.transmissive,yt=w.transparent;_.setupLightsView(W),Q===!0&&lt.setGlobalState(y.clippingPlanes,W),Y&&ft.viewport(M.copy(Y)),F.length>0&&wr(F,O,W),ht.length>0&&wr(ht,O,W),yt.length>0&&wr(yt,O,W),ft.buffers.depth.setTest(!0),ft.buffers.depth.setMask(!0),ft.buffers.color.setMask(!0),ft.setPolygonOffset(!1)}function lh(w,O,W,Y){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[Y.id]===void 0&&(_.state.transmissionRenderTarget[Y.id]=new jn(1,1,{generateMipmaps:!0,type:ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float")?mr:Jn,minFilter:Fi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ue.workingColorSpace}));let ht=_.state.transmissionRenderTarget[Y.id],yt=Y.viewport||M;ht.setSize(yt.z,yt.w);let Ct=y.getRenderTarget();y.setRenderTarget(ht),y.getClearColor(B),X=y.getClearAlpha(),X<1&&y.setClearColor(16777215,.5),y.clear(),Jt&&Vt.render(W);let Dt=y.toneMapping;y.toneMapping=fi;let zt=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),_.setupLightsView(Y),Q===!0&&lt.setGlobalState(y.clippingPlanes,Y),wr(w,W,Y),R.updateMultisampleRenderTarget(ht),R.updateRenderTargetMipmap(ht),ut.has("WEBGL_multisampled_render_to_texture")===!1){let Gt=!1;for(let Lt=0,de=O.length;Lt<de;Lt++){let ve=O[Lt],Re=ve.object,hn=ve.geometry,le=ve.material,Ot=ve.group;if(le.side===Yt&&Re.layers.test(Y.layers)){let Ve=le.side;le.side=$e,le.needsUpdate=!0,hh(Re,W,Y,hn,le,Ot),le.side=Ve,le.needsUpdate=!0,Gt=!0}}Gt===!0&&(R.updateMultisampleRenderTarget(ht),R.updateRenderTargetMipmap(ht))}y.setRenderTarget(Ct),y.setClearColor(B,X),zt!==void 0&&(Y.viewport=zt),y.toneMapping=Dt}function wr(w,O,W){let Y=O.isScene===!0?O.overrideMaterial:null;for(let F=0,ht=w.length;F<ht;F++){let yt=w[F],Ct=yt.object,Dt=yt.geometry,zt=Y===null?yt.material:Y,Gt=yt.group;Ct.layers.test(W.layers)&&hh(Ct,O,W,Dt,zt,Gt)}}function hh(w,O,W,Y,F,ht){w.onBeforeRender(y,O,W,Y,F,ht),w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(y,O,W,Y,w,ht),F.transparent===!0&&F.side===Yt&&F.forceSinglePass===!1?(F.side=$e,F.needsUpdate=!0,y.renderBufferDirect(W,O,Y,F,w,ht),F.side=mi,F.needsUpdate=!0,y.renderBufferDirect(W,O,Y,F,w,ht),F.side=Yt):y.renderBufferDirect(W,O,Y,F,w,ht),w.onAfterRender(y,O,W,Y,F,ht)}function Tr(w,O,W){O.isScene!==!0&&(O=Xt);let Y=Et.get(w),F=_.state.lights,ht=_.state.shadowsArray,yt=F.state.version,Ct=It.getParameters(w,F.state,ht,O,W),Dt=It.getProgramCacheKey(Ct),zt=Y.programs;Y.environment=w.isMeshStandardMaterial?O.environment:null,Y.fog=O.fog,Y.envMap=(w.isMeshStandardMaterial?z:S).get(w.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,zt===void 0&&(w.addEventListener("dispose",se),zt=new Map,Y.programs=zt);let Gt=zt.get(Dt);if(Gt!==void 0){if(Y.currentProgram===Gt&&Y.lightsStateVersion===yt)return dh(w,Ct),Gt}else Ct.uniforms=It.getUniforms(w),w.onBeforeCompile(Ct,y),Gt=It.acquireProgram(Ct,Dt),zt.set(Dt,Gt),Y.uniforms=Ct.uniforms;let Lt=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Lt.clippingPlanes=lt.uniform),dh(w,Ct),Y.needsLights=yd(w),Y.lightsStateVersion=yt,Y.needsLights&&(Lt.ambientLightColor.value=F.state.ambient,Lt.lightProbe.value=F.state.probe,Lt.directionalLights.value=F.state.directional,Lt.directionalLightShadows.value=F.state.directionalShadow,Lt.spotLights.value=F.state.spot,Lt.spotLightShadows.value=F.state.spotShadow,Lt.rectAreaLights.value=F.state.rectArea,Lt.ltc_1.value=F.state.rectAreaLTC1,Lt.ltc_2.value=F.state.rectAreaLTC2,Lt.pointLights.value=F.state.point,Lt.pointLightShadows.value=F.state.pointShadow,Lt.hemisphereLights.value=F.state.hemi,Lt.directionalShadowMap.value=F.state.directionalShadowMap,Lt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Lt.spotShadowMap.value=F.state.spotShadowMap,Lt.spotLightMatrix.value=F.state.spotLightMatrix,Lt.spotLightMap.value=F.state.spotLightMap,Lt.pointShadowMap.value=F.state.pointShadowMap,Lt.pointShadowMatrix.value=F.state.pointShadowMatrix),Y.currentProgram=Gt,Y.uniformsList=null,Gt}function uh(w){if(w.uniformsList===null){let O=w.currentProgram.getUniforms();w.uniformsList=Es.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function dh(w,O){let W=Et.get(w);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function _d(w,O,W,Y,F){O.isScene!==!0&&(O=Xt),R.resetTextureUnits();let ht=O.fog,yt=Y.isMeshStandardMaterial?O.environment:null,Ct=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:xi,Dt=(Y.isMeshStandardMaterial?z:S).get(Y.envMap||yt),zt=Y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Gt=!!W.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Lt=!!W.morphAttributes.position,de=!!W.morphAttributes.normal,ve=!!W.morphAttributes.color,Re=fi;Y.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Re=y.toneMapping);let hn=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,le=hn!==void 0?hn.length:0,Ot=Et.get(Y),Ve=_.state.lights;if(Q===!0&&(ct===!0||w!==k)){let mn=w===k&&Y.id===U;lt.setState(Y,w,mn)}let he=!1;Y.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==Ve.state.version||Ot.outputColorSpace!==Ct||F.isBatchedMesh&&Ot.batching===!1||!F.isBatchedMesh&&Ot.batching===!0||F.isBatchedMesh&&Ot.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ot.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ot.instancing===!1||!F.isInstancedMesh&&Ot.instancing===!0||F.isSkinnedMesh&&Ot.skinning===!1||!F.isSkinnedMesh&&Ot.skinning===!0||F.isInstancedMesh&&Ot.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ot.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ot.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ot.instancingMorph===!1&&F.morphTexture!==null||Ot.envMap!==Dt||Y.fog===!0&&Ot.fog!==ht||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==lt.numPlanes||Ot.numIntersection!==lt.numIntersection)||Ot.vertexAlphas!==zt||Ot.vertexTangents!==Gt||Ot.morphTargets!==Lt||Ot.morphNormals!==de||Ot.morphColors!==ve||Ot.toneMapping!==Re||Ot.morphTargetsCount!==le)&&(he=!0):(he=!0,Ot.__version=Y.version);let Mn=Ot.currentProgram;he===!0&&(Mn=Tr(Y,O,F));let $i=!1,un=!1,xa=!1,Pe=Mn.getUniforms(),ii=Ot.uniforms;if(ft.useProgram(Mn.program)&&($i=!0,un=!0,xa=!0),Y.id!==U&&(U=Y.id,un=!0),$i||k!==w){ot.reverseDepthBuffer?(At.copy(w.projectionMatrix),wf(At),Tf(At),Pe.setValue(I,"projectionMatrix",At)):Pe.setValue(I,"projectionMatrix",w.projectionMatrix),Pe.setValue(I,"viewMatrix",w.matrixWorldInverse);let mn=Pe.map.cameraPosition;mn!==void 0&&mn.setValue(I,Ht.setFromMatrixPosition(w.matrixWorld)),ot.logarithmicDepthBuffer&&Pe.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Pe.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),k!==w&&(k=w,un=!0,xa=!0)}if(F.isSkinnedMesh){Pe.setOptional(I,F,"bindMatrix"),Pe.setOptional(I,F,"bindMatrixInverse");let mn=F.skeleton;mn&&(mn.boneTexture===null&&mn.computeBoneTexture(),Pe.setValue(I,"boneTexture",mn.boneTexture,R))}F.isBatchedMesh&&(Pe.setOptional(I,F,"batchingTexture"),Pe.setValue(I,"batchingTexture",F._matricesTexture,R),Pe.setOptional(I,F,"batchingIdTexture"),Pe.setValue(I,"batchingIdTexture",F._indirectTexture,R),Pe.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&Pe.setValue(I,"batchingColorTexture",F._colorsTexture,R));let ya=W.morphAttributes;if((ya.position!==void 0||ya.normal!==void 0||ya.color!==void 0)&&Wt.update(F,W,Mn),(un||Ot.receiveShadow!==F.receiveShadow)&&(Ot.receiveShadow=F.receiveShadow,Pe.setValue(I,"receiveShadow",F.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(ii.envMap.value=Dt,ii.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&O.environment!==null&&(ii.envMapIntensity.value=O.environmentIntensity),un&&(Pe.setValue(I,"toneMappingExposure",y.toneMappingExposure),Ot.needsLights&&xd(ii,xa),ht&&Y.fog===!0&&pt.refreshFogUniforms(ii,ht),pt.refreshMaterialUniforms(ii,Y,at,V,_.state.transmissionRenderTarget[w.id]),Es.upload(I,uh(Ot),ii,R)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Es.upload(I,uh(Ot),ii,R),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Pe.setValue(I,"center",F.center),Pe.setValue(I,"modelViewMatrix",F.modelViewMatrix),Pe.setValue(I,"normalMatrix",F.normalMatrix),Pe.setValue(I,"modelMatrix",F.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){let mn=Y.uniformsGroups;for(let va=0,vd=mn.length;va<vd;va++){let fh=mn[va];N.update(fh,Mn),N.bind(fh,Mn)}}return Mn}function xd(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function yd(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(w,O,W){Et.get(w.texture).__webglTexture=O,Et.get(w.depthTexture).__webglTexture=W;let Y=Et.get(w);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=W===void 0,Y.__autoAllocateDepthBuffer||ut.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,O){let W=Et.get(w);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(w,O=0,W=0){A=w,L=O,T=W;let Y=!0,F=null,ht=!1,yt=!1;if(w){let Dt=Et.get(w);if(Dt.__useDefaultFramebuffer!==void 0)ft.bindFramebuffer(I.FRAMEBUFFER,null),Y=!1;else if(Dt.__webglFramebuffer===void 0)R.setupRenderTarget(w);else if(Dt.__hasExternalTextures)R.rebindTextures(w,Et.get(w.texture).__webglTexture,Et.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Lt=w.depthTexture;if(Dt.__boundDepthTexture!==Lt){if(Lt!==null&&Et.has(Lt)&&(w.width!==Lt.image.width||w.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(w)}}let zt=w.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(yt=!0);let Gt=Et.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Gt[O])?F=Gt[O][W]:F=Gt[O],ht=!0):w.samples>0&&R.useMultisampledRTT(w)===!1?F=Et.get(w).__webglMultisampledFramebuffer:Array.isArray(Gt)?F=Gt[W]:F=Gt,M.copy(w.viewport),b.copy(w.scissor),H=w.scissorTest}else M.copy(vt).multiplyScalar(at).floor(),b.copy(Mt).multiplyScalar(at).floor(),H=Qt;if(ft.bindFramebuffer(I.FRAMEBUFFER,F)&&Y&&ft.drawBuffers(w,F),ft.viewport(M),ft.scissor(b),ft.setScissorTest(H),ht){let Dt=Et.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,Dt.__webglTexture,W)}else if(yt){let Dt=Et.get(w.texture),zt=O||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Dt.__webglTexture,W||0,zt)}U=-1},this.readRenderTargetPixels=function(w,O,W,Y,F,ht,yt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Et.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&yt!==void 0&&(Ct=Ct[yt]),Ct){ft.bindFramebuffer(I.FRAMEBUFFER,Ct);try{let Dt=w.texture,zt=Dt.format,Gt=Dt.type;if(!ot.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ot.textureTypeReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-Y&&W>=0&&W<=w.height-F&&I.readPixels(O,W,Y,F,qt.convert(zt),qt.convert(Gt),ht)}finally{let Dt=A!==null?Et.get(A).__webglFramebuffer:null;ft.bindFramebuffer(I.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(w,O,W,Y,F,ht,yt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=Et.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&yt!==void 0&&(Ct=Ct[yt]),Ct){let Dt=w.texture,zt=Dt.format,Gt=Dt.type;if(!ot.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ot.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=w.width-Y&&W>=0&&W<=w.height-F){ft.bindFramebuffer(I.FRAMEBUFFER,Ct);let Lt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Lt),I.bufferData(I.PIXEL_PACK_BUFFER,ht.byteLength,I.STREAM_READ),I.readPixels(O,W,Y,F,qt.convert(zt),qt.convert(Gt),0);let de=A!==null?Et.get(A).__webglFramebuffer:null;ft.bindFramebuffer(I.FRAMEBUFFER,de);let ve=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await bf(I,ve,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Lt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ht),I.deleteBuffer(Lt),I.deleteSync(ve),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,O=null,W=0){w.isTexture!==!0&&(lo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,w=arguments[1]);let Y=Math.pow(2,-W),F=Math.floor(w.image.width*Y),ht=Math.floor(w.image.height*Y),yt=O!==null?O.x:0,Ct=O!==null?O.y:0;R.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,yt,Ct,F,ht),ft.unbindTexture()},this.copyTextureToTexture=function(w,O,W=null,Y=null,F=0){w.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,w=arguments[1],O=arguments[2],F=arguments[3]||0,W=null);let ht,yt,Ct,Dt,zt,Gt;W!==null?(ht=W.max.x-W.min.x,yt=W.max.y-W.min.y,Ct=W.min.x,Dt=W.min.y):(ht=w.image.width,yt=w.image.height,Ct=0,Dt=0),Y!==null?(zt=Y.x,Gt=Y.y):(zt=0,Gt=0);let Lt=qt.convert(O.format),de=qt.convert(O.type);R.setTexture2D(O,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);let ve=I.getParameter(I.UNPACK_ROW_LENGTH),Re=I.getParameter(I.UNPACK_IMAGE_HEIGHT),hn=I.getParameter(I.UNPACK_SKIP_PIXELS),le=I.getParameter(I.UNPACK_SKIP_ROWS),Ot=I.getParameter(I.UNPACK_SKIP_IMAGES),Ve=w.isCompressedTexture?w.mipmaps[F]:w.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,Ve.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ve.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ct),I.pixelStorei(I.UNPACK_SKIP_ROWS,Dt),w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,F,zt,Gt,ht,yt,Lt,de,Ve.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,F,zt,Gt,Ve.width,Ve.height,Lt,Ve.data):I.texSubImage2D(I.TEXTURE_2D,F,zt,Gt,ht,yt,Lt,de,Ve),I.pixelStorei(I.UNPACK_ROW_LENGTH,ve),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Re),I.pixelStorei(I.UNPACK_SKIP_PIXELS,hn),I.pixelStorei(I.UNPACK_SKIP_ROWS,le),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ot),F===0&&O.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),ft.unbindTexture()},this.copyTextureToTexture3D=function(w,O,W=null,Y=null,F=0){w.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,Y=arguments[1]||null,w=arguments[2],O=arguments[3],F=arguments[4]||0);let ht,yt,Ct,Dt,zt,Gt,Lt,de,ve,Re=w.isCompressedTexture?w.mipmaps[F]:w.image;W!==null?(ht=W.max.x-W.min.x,yt=W.max.y-W.min.y,Ct=W.max.z-W.min.z,Dt=W.min.x,zt=W.min.y,Gt=W.min.z):(ht=Re.width,yt=Re.height,Ct=Re.depth,Dt=0,zt=0,Gt=0),Y!==null?(Lt=Y.x,de=Y.y,ve=Y.z):(Lt=0,de=0,ve=0);let hn=qt.convert(O.format),le=qt.convert(O.type),Ot;if(O.isData3DTexture)R.setTexture3D(O,0),Ot=I.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)R.setTexture2DArray(O,0),Ot=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);let Ve=I.getParameter(I.UNPACK_ROW_LENGTH),he=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Mn=I.getParameter(I.UNPACK_SKIP_PIXELS),$i=I.getParameter(I.UNPACK_SKIP_ROWS),un=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Re.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Re.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Dt),I.pixelStorei(I.UNPACK_SKIP_ROWS,zt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Gt),w.isDataTexture||w.isData3DTexture?I.texSubImage3D(Ot,F,Lt,de,ve,ht,yt,Ct,hn,le,Re.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(Ot,F,Lt,de,ve,ht,yt,Ct,hn,Re.data):I.texSubImage3D(Ot,F,Lt,de,ve,ht,yt,Ct,hn,le,Re),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ve),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,he),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Mn),I.pixelStorei(I.UNPACK_SKIP_ROWS,$i),I.pixelStorei(I.UNPACK_SKIP_IMAGES,un),F===0&&O.generateMipmaps&&I.generateMipmap(Ot),ft.unbindTexture()},this.initRenderTarget=function(w){Et.get(w).__webglFramebuffer===void 0&&R.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),ft.unbindTexture()},this.resetState=function(){L=0,T=0,A=null,ft.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Nl?"display-p3":"srgb",e.unpackColorSpace=ue.workingColorSpace===Ko?"display-p3":"srgb"}},Ro=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Pt(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Co=class extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},sl=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=kc,this.updateRanges=[],this.version=0,this.uuid=Fn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Qe=new C,Po=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyMatrix4(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyNormalMatrix(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.transformDirection(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=An(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=An(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=An(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=An(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=An(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),s=fe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),s=fe(s,this.array),r=fe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Pn=class extends Hn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ds,Zs=new C,fs=new C,ps=new C,ms=new $,Ks=new $,Xu=new ge,Zr=new C,Js=new C,Kr=new C,lu=new $,Ja=new $,hu=new $,zn=class extends Te{constructor(t=new Pn){if(super(),this.isSprite=!0,this.type="Sprite",ds===void 0){ds=new ae;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new sl(e,5);ds.setIndex([0,1,2,0,2,3]),ds.setAttribute("position",new Po(n,3,0,!1)),ds.setAttribute("uv",new Po(n,2,3,!1))}this.geometry=ds,this.material=t,this.center=new $(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fs.setFromMatrixScale(this.matrixWorld),Xu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ps.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fs.multiplyScalar(-ps.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Jr(Zr.set(-.5,-.5,0),ps,o,fs,s,r),Jr(Js.set(.5,-.5,0),ps,o,fs,s,r),Jr(Kr.set(.5,.5,0),ps,o,fs,s,r),lu.set(0,0),Ja.set(1,0),hu.set(1,1);let a=t.ray.intersectTriangle(Zr,Js,Kr,!1,Zs);if(a===null&&(Jr(Js.set(-.5,.5,0),ps,o,fs,s,r),Ja.set(0,1),a=t.ray.intersectTriangle(Zr,Kr,Js,!1,Zs),a===null))return;let c=t.ray.origin.distanceTo(Zs);c<t.near||c>t.far||e.push({distance:c,point:Zs.clone(),uv:ui.getInterpolation(Zs,Zr,Js,Kr,lu,Ja,hu,new $),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Jr(i,t,e,n,s,r){ms.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ks.x=r*ms.x-s*ms.y,Ks.y=s*ms.x+r*ms.y):Ks.copy(ms),i.copy(t),i.x+=Ks.x,i.y+=Ks.y,i.applyMatrix4(Xu)}var lr=class extends cn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=We,h=We,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Io=class extends Oe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},gs=new ge,uu=new ge,$r=[],du=new Qn,M_=new ge,$s=new J,js=new gi,ki=class extends J{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Io(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,M_)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Qn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,gs),du.copy(t.boundingBox).applyMatrix4(gs),this.boundingBox.union(du)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new gi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,gs),js.copy(t.boundingSphere).applyMatrix4(gs),this.boundingSphere.union(js)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if($s.geometry=this.geometry,$s.material=this.material,$s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),js.copy(this.boundingSphere),js.applyMatrix4(n),t.ray.intersectsSphere(js)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,gs),uu.multiplyMatrices(n,gs),$s.matrixWorld=uu,$s.raycast(t,$r);for(let o=0,a=$r.length;o<a;o++){let c=$r[o];c.instanceId=r,c.object=this,e.push(c)}$r.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Io(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new lr(new Float32Array(s*this.count),s,this.count,gr,On));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var ti=class extends Hn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},fu=new ge,rl=new Rs,jr=new gi,Qr=new C,_i=class extends Te{constructor(t=new ae,e=new ti){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(s),jr.radius+=r,t.ray.intersectsSphere(jr)===!1)return;fu.copy(s).invert(),rl.copy(t.ray).applyMatrix4(fu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,p=f;g<p;g++){let _=l.getX(g);Qr.fromBufferAttribute(u,_),pu(Qr,_,c,s,t,e,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,p=f;g<p;g++)Qr.fromBufferAttribute(u,g),pu(Qr,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function pu(i,t,e,n,s,r,o){let a=rl.distanceSqToPoint(i);if(a<e){let c=new C;rl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Do=class extends cn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},_n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new $:new C);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new C,s=[],r=[],o=[],a=new C,c=new ge;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new C)}r[0]=new C,o[0]=new C;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Ne(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ne(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},hr=class extends _n{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new $){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ol=class extends hr{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Bl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var to=new C,$a=new Bl,ja=new Bl,Qa=new Bl,ke=class extends _n{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(to.subVectors(s[0],s[1]).add(s[0]),l=to);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(to.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=to),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f);p<1e-4&&(p=1),g<1e-4&&(g=p),_<1e-4&&(_=p),$a.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,p,_),ja.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,p,_),Qa.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,p,_)}else this.curveType==="catmullrom"&&($a.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),ja.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Qa.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set($a.calc(c),ja.calc(c),Qa.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function mu(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function E_(i,t){let e=1-i;return e*e*t}function S_(i,t){return 2*(1-i)*i*t}function b_(i,t){return i*i*t}function sr(i,t,e,n){return E_(i,t)+S_(i,e)+b_(i,n)}function w_(i,t){let e=1-i;return e*e*e*t}function T_(i,t){let e=1-i;return 3*e*e*i*t}function A_(i,t){return 3*(1-i)*i*i*t}function R_(i,t){return i*i*i*t}function rr(i,t,e,n,s){return w_(i,t)+T_(i,e)+A_(i,n)+R_(i,s)}var Lo=class extends _n{constructor(t=new $,e=new $,n=new $,s=new $){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new $){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(rr(t,s.x,r.x,o.x,a.x),rr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},al=class extends _n{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(rr(t,s.x,r.x,o.x,a.x),rr(t,s.y,r.y,o.y,a.y),rr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Uo=class extends _n{constructor(t=new $,e=new $){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new $){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new $){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},cl=class extends _n{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},No=class extends _n{constructor(t=new $,e=new $,n=new $){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new $){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(sr(t,s.x,r.x,o.x),sr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Oo=class extends _n{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(sr(t,s.x,r.x,o.x),sr(t,s.y,r.y,o.y),sr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fo=class extends _n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new $){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(mu(a,c.x,l.x,h.x,u.x),mu(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new $().fromArray(s))}return this}},Bo=Object.freeze({__proto__:null,ArcCurve:ol,CatmullRomCurve3:ke,CubicBezierCurve:Lo,CubicBezierCurve3:al,EllipseCurve:hr,LineCurve:Uo,LineCurve3:cl,QuadraticBezierCurve:No,QuadraticBezierCurve3:Oo,SplineCurve:Fo}),ll=class extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Bo[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Bo[s.type]().fromJSON(s))}return this}},Ps=class extends ll{constructor(t){super(),this.type="Path",this.currentPoint=new $,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Uo(this.currentPoint.clone(),new $(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new No(this.currentPoint.clone(),new $(t,e),new $(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Lo(this.currentPoint.clone(),new $(t,e),new $(n,s),new $(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Fo(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new hr(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Is=class i extends ae{constructor(t=[new $(0,-.5),new $(.5,0),new $(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ne(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new C,d=new $,f=new C,g=new C,p=new C,_=0,m=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:_=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-_,f.z=m*0,p.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(p.x,p.y,p.z);break;default:_=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-_,f.z=m*0,g.copy(f),f.x+=p.x,f.y+=p.y,f.z+=p.z,f.normalize(),c.push(f.x,f.y,f.z),p.copy(g)}for(let v=0;v<=e;v++){let y=n+v*h*s,E=Math.sin(y),L=Math.cos(y);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*E,u.y=t[T].y,u.z=t[T].x*L,o.push(u.x,u.y,u.z),d.x=v/e,d.y=T/(t.length-1),a.push(d.x,d.y);let A=c[3*T+0]*E,U=c[3*T+1],k=c[3*T+0]*L;l.push(A,U,k)}}for(let v=0;v<e;v++)for(let y=0;y<t.length-1;y++){let E=y+v*t.length,L=E,T=E+t.length,A=E+t.length+1,U=E+1;r.push(L,T,U),r.push(A,U,T)}this.setIndex(r),this.setAttribute("position",new Ft(o,3)),this.setAttribute("uv",new Ft(a,2)),this.setAttribute("normal",new Ft(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var Xe=class i extends ae{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new C,h=new $;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ft(o,3)),this.setAttribute("normal",new Ft(a,3)),this.setAttribute("uv",new Ft(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},In=class i extends ae{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,p=[],_=n/2,m=0;v(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Ft(u,3)),this.setAttribute("normal",new Ft(d,3)),this.setAttribute("uv",new Ft(f,2));function v(){let E=new C,L=new C,T=0,A=(e-t)/n;for(let U=0;U<=r;U++){let k=[],M=U/r,b=M*(e-t)+t;for(let H=0;H<=s;H++){let B=H/s,X=B*c+a,nt=Math.sin(X),V=Math.cos(X);L.x=b*nt,L.y=-M*n+_,L.z=b*V,u.push(L.x,L.y,L.z),E.set(nt,A,V).normalize(),d.push(E.x,E.y,E.z),f.push(B,1-M),k.push(g++)}p.push(k)}for(let U=0;U<s;U++)for(let k=0;k<r;k++){let M=p[k][U],b=p[k+1][U],H=p[k+1][U+1],B=p[k][U+1];t>0&&(h.push(M,b,B),T+=3),e>0&&(h.push(b,H,B),T+=3)}l.addGroup(m,T,0),m+=T}function y(E){let L=g,T=new $,A=new C,U=0,k=E===!0?t:e,M=E===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,_*M,0),d.push(0,M,0),f.push(.5,.5),g++;let b=g;for(let H=0;H<=s;H++){let X=H/s*c+a,nt=Math.cos(X),V=Math.sin(X);A.x=k*V,A.y=_*M,A.z=k*nt,u.push(A.x,A.y,A.z),d.push(0,M,0),T.x=nt*.5+.5,T.y=V*.5*M+.5,f.push(T.x,T.y),g++}for(let H=0;H<s;H++){let B=L+H,X=b+H;E===!0?h.push(X,X+1,B):h.push(X+1,X,B),U+=3}l.addGroup(m,U,E===!0?1:2),m+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},pn=class i extends In{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},hl=class i extends ae{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Ft(r,3)),this.setAttribute("normal",new Ft(r.slice(),3)),this.setAttribute("uv",new Ft(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let y=new C,E=new C,L=new C;for(let T=0;T<e.length;T+=3)f(e[T+0],y),f(e[T+1],E),f(e[T+2],L),c(y,E,L,v)}function c(v,y,E,L){let T=L+1,A=[];for(let U=0;U<=T;U++){A[U]=[];let k=v.clone().lerp(E,U/T),M=y.clone().lerp(E,U/T),b=T-U;for(let H=0;H<=b;H++)H===0&&U===T?A[U][H]=k:A[U][H]=k.clone().lerp(M,H/b)}for(let U=0;U<T;U++)for(let k=0;k<2*(T-U)-1;k++){let M=Math.floor(k/2);k%2===0?(d(A[U][M+1]),d(A[U+1][M]),d(A[U][M])):(d(A[U][M+1]),d(A[U+1][M+1]),d(A[U+1][M]))}}function l(v){let y=new C;for(let E=0;E<r.length;E+=3)y.x=r[E+0],y.y=r[E+1],y.z=r[E+2],y.normalize().multiplyScalar(v),r[E+0]=y.x,r[E+1]=y.y,r[E+2]=y.z}function h(){let v=new C;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];let E=_(v)/2/Math.PI+.5,L=m(v)/Math.PI+.5;o.push(E,1-L)}g(),u()}function u(){for(let v=0;v<o.length;v+=6){let y=o[v+0],E=o[v+2],L=o[v+4],T=Math.max(y,E,L),A=Math.min(y,E,L);T>.9&&A<.1&&(y<.2&&(o[v+0]+=1),E<.2&&(o[v+2]+=1),L<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,y){let E=v*3;y.x=t[E+0],y.y=t[E+1],y.z=t[E+2]}function g(){let v=new C,y=new C,E=new C,L=new C,T=new $,A=new $,U=new $;for(let k=0,M=0;k<r.length;k+=9,M+=6){v.set(r[k+0],r[k+1],r[k+2]),y.set(r[k+3],r[k+4],r[k+5]),E.set(r[k+6],r[k+7],r[k+8]),T.set(o[M+0],o[M+1]),A.set(o[M+2],o[M+3]),U.set(o[M+4],o[M+5]),L.copy(v).add(y).add(E).divideScalar(3);let b=_(L);p(T,M+0,v,b),p(A,M+2,y,b),p(U,M+4,E,b)}}function p(v,y,E,L){L<0&&v.x===1&&(o[y]=v.x-1),E.x===0&&E.z===0&&(o[y]=L/2/Math.PI+.5)}function _(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.details)}};var Ge=class extends Ps{constructor(t){super(t),this.uuid=Fn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Ps().fromJSON(s))}return this}},C_={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Yu(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=U_(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return ur(r,o,e,a,c,f,0),o}};function Yu(i,t,e,n,s){let r,o;if(s===X_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=gu(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=gu(r,i[r],i[r+1],o);return o&&$o(o,o.next)&&(fr(o),o=o.next),o}function Gi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&($o(e,e.next)||we(e.prev,e,e.next)===0)){if(fr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ur(i,t,e,n,s,r,o){if(!i)return;!o&&r&&H_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?I_(i,n,s,r):P_(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),fr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=D_(Gi(i),t,e),ur(i,t,e,n,s,r,2)):o===2&&L_(i,t,e,n,s,r):ur(Gi(i),t,e,n,s,r,1);break}}}function P_(i){let t=i.prev,e=i,n=i.next;if(we(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&xs(s,a,r,c,o,l,g.x,g.y)&&we(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function I_(i,t,e,n){let s=i.prev,r=i,o=i.next;if(we(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,p=a>c?a>l?a:l:c>l?c:l,_=h>u?h>d?h:d:u>d?u:d,m=ul(f,g,t,e,n),v=ul(p,_,t,e,n),y=i.prevZ,E=i.nextZ;for(;y&&y.z>=m&&E&&E.z<=v;){if(y.x>=f&&y.x<=p&&y.y>=g&&y.y<=_&&y!==s&&y!==o&&xs(a,h,c,u,l,d,y.x,y.y)&&we(y.prev,y,y.next)>=0||(y=y.prevZ,E.x>=f&&E.x<=p&&E.y>=g&&E.y<=_&&E!==s&&E!==o&&xs(a,h,c,u,l,d,E.x,E.y)&&we(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=p&&y.y>=g&&y.y<=_&&y!==s&&y!==o&&xs(a,h,c,u,l,d,y.x,y.y)&&we(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;E&&E.z<=v;){if(E.x>=f&&E.x<=p&&E.y>=g&&E.y<=_&&E!==s&&E!==o&&xs(a,h,c,u,l,d,E.x,E.y)&&we(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function D_(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!$o(s,r)&&qu(s,n,n.next,r)&&dr(s,r)&&dr(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),fr(n),fr(n.next),n=i=r),n=n.next}while(n!==i);return Gi(n)}function L_(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&G_(o,a)){let c=Zu(o,a);o=Gi(o,o.next),c=Gi(c,c.next),ur(o,t,e,n,s,r,0),ur(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function U_(i,t,e,n){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Yu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(k_(l));for(s.sort(N_),r=0;r<s.length;r++)e=O_(s[r],e);return e}function N_(i,t){return i.x-t.x}function O_(i,t){let e=F_(i,t);if(!e)return t;let n=Zu(e,i);return Gi(n,n.next),Gi(e,e.next)}function F_(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&xs(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),dr(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&B_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function B_(i,t){return we(i.prev,i,t.prev)<0&&we(t.next,i,i.next)<0}function H_(i,t,e,n){let s=i;do s.z===0&&(s.z=ul(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,z_(s)}function z_(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function ul(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function k_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function xs(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function G_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!V_(i,t)&&(dr(i,t)&&dr(t,i)&&W_(i,t)&&(we(i.prev,i,t.prev)||we(i,t.prev,t))||$o(i,t)&&we(i.prev,i,i.next)>0&&we(t.prev,t,t.next)>0)}function we(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function $o(i,t){return i.x===t.x&&i.y===t.y}function qu(i,t,e,n){let s=no(we(i,t,e)),r=no(we(i,t,n)),o=no(we(e,n,i)),a=no(we(e,n,t));return!!(s!==r&&o!==a||s===0&&eo(i,e,t)||r===0&&eo(i,n,t)||o===0&&eo(e,i,n)||a===0&&eo(e,t,n))}function eo(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function no(i){return i>0?1:i<0?-1:0}function V_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&qu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function dr(i,t){return we(i.prev,i,i.next)<0?we(i,t,i.next)>=0&&we(i,i.prev,t)>=0:we(i,t,i.prev)<0||we(i,i.next,t)<0}function W_(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Zu(i,t){let e=new dl(i.i,i.x,i.y),n=new dl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function gu(i,t,e,n){let s=new dl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function fr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function dl(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function X_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var pi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];_u(t),xu(n,t);let o=t.length;e.forEach(_u);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,xu(n,e[c]);let a=C_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function _u(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function xu(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Ho=class i extends ae{constructor(t=new Ge([new $(.5,.5),new $(-.5,.5),new $(-.5,-.5),new $(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new Ft(s,3)),this.setAttribute("uv",new Ft(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,p=e.bevelOffset!==void 0?e.bevelOffset:0,_=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:Y_,y,E=!1,L,T,A,U;m&&(y=m.getSpacedPoints(h),E=!0,d=!1,L=m.computeFrenetFrames(h,!1),T=new C,A=new C,U=new C),d||(_=0,f=0,g=0,p=0);let k=a.extractPoints(l),M=k.shape,b=k.holes;if(!pi.isClockWise(M)){M=M.reverse();for(let it=0,I=b.length;it<I;it++){let dt=b[it];pi.isClockWise(dt)&&(b[it]=dt.reverse())}}let B=pi.triangulateShape(M,b),X=M;for(let it=0,I=b.length;it<I;it++){let dt=b[it];M=M.concat(dt)}function nt(it,I,dt){return I||console.error("THREE.ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(I,dt)}let V=M.length,at=B.length;function K(it,I,dt){let ut,ot,ft,Nt=it.x-I.x,Et=it.y-I.y,R=dt.x-it.x,S=dt.y-it.y,z=Nt*Nt+Et*Et,tt=Nt*S-Et*R;if(Math.abs(tt)>Number.EPSILON){let st=Math.sqrt(z),et=Math.sqrt(R*R+S*S),It=I.x-Et/st,pt=I.y+Nt/st,wt=dt.x-S/et,ee=dt.y+R/et,lt=((wt-It)*S-(ee-pt)*R)/(Nt*S-Et*R);ut=It+Nt*lt-it.x,ot=pt+Et*lt-it.y;let Tt=ut*ut+ot*ot;if(Tt<=2)return new $(ut,ot);ft=Math.sqrt(Tt/2)}else{let st=!1;Nt>Number.EPSILON?R>Number.EPSILON&&(st=!0):Nt<-Number.EPSILON?R<-Number.EPSILON&&(st=!0):Math.sign(Et)===Math.sign(S)&&(st=!0),st?(ut=-Et,ot=Nt,ft=Math.sqrt(z)):(ut=Nt,ot=Et,ft=Math.sqrt(z/2))}return new $(ut/ft,ot/ft)}let _t=[];for(let it=0,I=X.length,dt=I-1,ut=it+1;it<I;it++,dt++,ut++)dt===I&&(dt=0),ut===I&&(ut=0),_t[it]=K(X[it],X[dt],X[ut]);let vt=[],Mt,Qt=_t.concat();for(let it=0,I=b.length;it<I;it++){let dt=b[it];Mt=[];for(let ut=0,ot=dt.length,ft=ot-1,Nt=ut+1;ut<ot;ut++,ft++,Nt++)ft===ot&&(ft=0),Nt===ot&&(Nt=0),Mt[ut]=K(dt[ut],dt[ft],dt[Nt]);vt.push(Mt),Qt=Qt.concat(Mt)}for(let it=0;it<_;it++){let I=it/_,dt=f*Math.cos(I*Math.PI/2),ut=g*Math.sin(I*Math.PI/2)+p;for(let ot=0,ft=X.length;ot<ft;ot++){let Nt=nt(X[ot],_t[ot],ut);gt(Nt.x,Nt.y,-dt)}for(let ot=0,ft=b.length;ot<ft;ot++){let Nt=b[ot];Mt=vt[ot];for(let Et=0,R=Nt.length;Et<R;Et++){let S=nt(Nt[Et],Mt[Et],ut);gt(S.x,S.y,-dt)}}}let re=g+p;for(let it=0;it<V;it++){let I=d?nt(M[it],Qt[it],re):M[it];E?(A.copy(L.normals[0]).multiplyScalar(I.x),T.copy(L.binormals[0]).multiplyScalar(I.y),U.copy(y[0]).add(A).add(T),gt(U.x,U.y,U.z)):gt(I.x,I.y,0)}for(let it=1;it<=h;it++)for(let I=0;I<V;I++){let dt=d?nt(M[I],Qt[I],re):M[I];E?(A.copy(L.normals[it]).multiplyScalar(dt.x),T.copy(L.binormals[it]).multiplyScalar(dt.y),U.copy(y[it]).add(A).add(T),gt(U.x,U.y,U.z)):gt(dt.x,dt.y,u/h*it)}for(let it=_-1;it>=0;it--){let I=it/_,dt=f*Math.cos(I*Math.PI/2),ut=g*Math.sin(I*Math.PI/2)+p;for(let ot=0,ft=X.length;ot<ft;ot++){let Nt=nt(X[ot],_t[ot],ut);gt(Nt.x,Nt.y,u+dt)}for(let ot=0,ft=b.length;ot<ft;ot++){let Nt=b[ot];Mt=vt[ot];for(let Et=0,R=Nt.length;Et<R;Et++){let S=nt(Nt[Et],Mt[Et],ut);E?gt(S.x,S.y+y[h-1].y,y[h-1].x+dt):gt(S.x,S.y,u+dt)}}}Q(),ct();function Q(){let it=s.length/3;if(d){let I=0,dt=V*I;for(let ut=0;ut<at;ut++){let ot=B[ut];Ht(ot[2]+dt,ot[1]+dt,ot[0]+dt)}I=h+_*2,dt=V*I;for(let ut=0;ut<at;ut++){let ot=B[ut];Ht(ot[0]+dt,ot[1]+dt,ot[2]+dt)}}else{for(let I=0;I<at;I++){let dt=B[I];Ht(dt[2],dt[1],dt[0])}for(let I=0;I<at;I++){let dt=B[I];Ht(dt[0]+V*h,dt[1]+V*h,dt[2]+V*h)}}n.addGroup(it,s.length/3-it,0)}function ct(){let it=s.length/3,I=0;At(X,I),I+=X.length;for(let dt=0,ut=b.length;dt<ut;dt++){let ot=b[dt];At(ot,I),I+=ot.length}n.addGroup(it,s.length/3-it,1)}function At(it,I){let dt=it.length;for(;--dt>=0;){let ut=dt,ot=dt-1;ot<0&&(ot=it.length-1);for(let ft=0,Nt=h+_*2;ft<Nt;ft++){let Et=V*ft,R=V*(ft+1),S=I+ut+Et,z=I+ot+Et,tt=I+ot+R,st=I+ut+R;Bt(S,z,tt,st)}}}function gt(it,I,dt){c.push(it),c.push(I),c.push(dt)}function Ht(it,I,dt){Xt(it),Xt(I),Xt(dt);let ut=s.length/3,ot=v.generateTopUV(n,s,ut-3,ut-2,ut-1);Jt(ot[0]),Jt(ot[1]),Jt(ot[2])}function Bt(it,I,dt,ut){Xt(it),Xt(I),Xt(ut),Xt(I),Xt(dt),Xt(ut);let ot=s.length/3,ft=v.generateSideWallUV(n,s,ot-6,ot-3,ot-2,ot-1);Jt(ft[0]),Jt(ft[1]),Jt(ft[3]),Jt(ft[1]),Jt(ft[2]),Jt(ft[3])}function Xt(it){s.push(c[it*3+0]),s.push(c[it*3+1]),s.push(c[it*3+2])}function Jt(it){r.push(it.x),r.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return q_(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Bo[s.type]().fromJSON(s)),new i(n,t.options)}},Y_={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new $(r,o),new $(a,c),new $(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],p=t[r*3],_=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new $(o,1-c),new $(l,1-u),new $(d,1-g),new $(p,1-m)]:[new $(a,1-c),new $(h,1-u),new $(f,1-g),new $(_,1-m)]}};function q_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var zo=class i extends hl{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Dn=class i extends ae{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,d=(e-t)/s,f=new C,g=new $;for(let p=0;p<=s;p++){for(let _=0;_<=n;_++){let m=r+_/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let p=0;p<s;p++){let _=p*(n+1);for(let m=0;m<n;m++){let v=m+_,y=v,E=v+n+1,L=v+n+2,T=v+1;a.push(y,E,T),a.push(E,L,T)}}this.setIndex(a),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(l,3)),this.setAttribute("uv",new Ft(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},be=class i extends ae{constructor(t=new Ge([new $(0,.5),new $(-.5,-.5),new $(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Ft(s,3)),this.setAttribute("normal",new Ft(r,3)),this.setAttribute("uv",new Ft(o,2));function l(h){let u=s.length/3,d=h.extractPoints(e),f=d.shape,g=d.holes;pi.isClockWise(f)===!1&&(f=f.reverse());for(let _=0,m=g.length;_<m;_++){let v=g[_];pi.isClockWise(v)===!0&&(g[_]=v.reverse())}let p=pi.triangulateShape(f,g);for(let _=0,m=g.length;_<m;_++){let v=g[_];f=f.concat(v)}for(let _=0,m=f.length;_<m;_++){let v=f[_];s.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let _=0,m=p.length;_<m;_++){let v=p[_],y=v[0]+u,E=v[1]+u,L=v[2]+u;n.push(y,E,L),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return Z_(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function Z_(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var Ye=class i extends ae{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new C,d=new C,f=[],g=[],p=[],_=[];for(let m=0;m<=n;m++){let v=[],y=m/n,E=0;m===0&&o===0?E=.5/e:m===n&&c===Math.PI&&(E=-.5/e);for(let L=0;L<=e;L++){let T=L/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),p.push(d.x,d.y,d.z),_.push(T+E,1-y),v.push(l++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<e;v++){let y=h[m][v+1],E=h[m][v],L=h[m+1][v],T=h[m+1][v+1];(m!==0||o>0)&&f.push(y,E,T),(m!==n-1||c<Math.PI)&&f.push(E,L,T)}this.setIndex(f),this.setAttribute("position",new Ft(g,3)),this.setAttribute("normal",new Ft(p,3)),this.setAttribute("uv",new Ft(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ee=class i extends ae{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let p=g/s*r,_=f/n*Math.PI*2;u.x=(t+e*Math.cos(_))*Math.cos(p),u.y=(t+e*Math.cos(_))*Math.sin(p),u.z=e*Math.sin(_),a.push(u.x,u.y,u.z),h.x=t*Math.cos(p),h.y=t*Math.sin(p),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let p=(s+1)*f+g-1,_=(s+1)*(f-1)+g-1,m=(s+1)*(f-1)+g,v=(s+1)*f+g;o.push(p,_,v),o.push(_,m,v)}this.setIndex(o),this.setAttribute("position",new Ft(a,3)),this.setAttribute("normal",new Ft(c,3)),this.setAttribute("uv",new Ft(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var xn=class i extends ae{constructor(t=new Oo(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new C,c=new C,l=new $,h=new C,u=[],d=[],f=[],g=[];p(),this.setIndex(g),this.setAttribute("position",new Ft(u,3)),this.setAttribute("normal",new Ft(d,3)),this.setAttribute("uv",new Ft(f,2));function p(){for(let y=0;y<e;y++)_(y);_(r===!1?e:0),v(),m()}function _(y){h=t.getPointAt(y/e,h);let E=o.normals[y],L=o.binormals[y];for(let T=0;T<=s;T++){let A=T/s*Math.PI*2,U=Math.sin(A),k=-Math.cos(A);c.x=k*E.x+U*L.x,c.y=k*E.y+U*L.y,c.z=k*E.z+U*L.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function m(){for(let y=1;y<=e;y++)for(let E=1;E<=s;E++){let L=(s+1)*(y-1)+(E-1),T=(s+1)*y+(E-1),A=(s+1)*y+E,U=(s+1)*(y-1)+E;g.push(L,T,U),g.push(T,A,U)}}function v(){for(let y=0;y<=e;y++)for(let E=0;E<=s;E++)l.x=y/e,l.y=E/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Bo[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var fl=class extends Hn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ul,this.normalScale=new $(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Vi=class extends fl{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new $(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ne(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var ie=class extends Hn{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Pt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ul,this.normalScale=new $(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};function io(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function K_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ds=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},pl=class extends Ds{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:_h,endingEnd:_h}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case xh:r=t,a=2*e-n;break;case yh:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case xh:o=t,c=2*n-e;break;case yh:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),p=g*g,_=p*g,m=-d*_+2*d*p-d*g,v=(1+d)*_+(-1.5-2*d)*p+(-.5+d)*g+1,y=(-1-f)*_+(1.5+f)*p+.5*g,E=f*_-f*p;for(let L=0;L!==a;++L)r[L]=m*o[h+L]+v*o[l+L]+y*o[c+L]+E*o[u+L];return r}},ml=class extends Ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},gl=class extends Ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ln=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=io(e,this.TimeBufferType),this.values=io(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:io(t.times,Array),values:io(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new gl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ml(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new pl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ho:e=this.InterpolantFactoryMethodDiscrete;break;case zc:e=this.InterpolantFactoryMethodLinear;break;case Ea:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ho;case this.InterpolantFactoryMethodLinear:return zc;case this.InterpolantFactoryMethodSmooth:return Ea}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&K_(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ea,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let p=e[u+g];if(p!==e[d+g]||p!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Ln.prototype.TimeBufferType=Float32Array;Ln.prototype.ValueBufferType=Float32Array;Ln.prototype.DefaultInterpolation=zc;var Wi=class extends Ln{constructor(t,e,n){super(t,e,n)}};Wi.prototype.ValueTypeName="bool";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=ho;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var _l=class extends Ln{};_l.prototype.ValueTypeName="color";var xl=class extends Ln{};xl.prototype.ValueTypeName="number";var yl=class extends Ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Cn.slerpFlat(r,0,o,l-a,o,l,c);return r}},ko=class extends Ln{InterpolantFactoryMethodLinear(t){return new yl(this.times,this.values,this.getValueSize(),t)}};ko.prototype.ValueTypeName="quaternion";ko.prototype.InterpolantFactoryMethodSmooth=void 0;var Xi=class extends Ln{constructor(t,e,n){super(t,e,n)}};Xi.prototype.ValueTypeName="string";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=ho;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var vl=class extends Ln{};vl.prototype.ValueTypeName="vector";var Ml=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},J_=new Ml,El=class{constructor(t){this.manager=t!==void 0?t:J_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};El.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ls=class extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Go=class extends Ls{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},tc=new ge,yu=new C,vu=new C,Vo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $(512,512),this.map=null,this.mapPass=null,this.matrix=new ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cr,this._frameExtents=new $(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;yu.setFromMatrixPosition(t.matrixWorld),e.position.copy(yu),vu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vu),e.updateMatrixWorld(),tc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(tc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Mu=new ge,Qs=new C,ec=new C,Sl=class extends Vo{constructor(){super(new Je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new $(4,2),this._viewportCount=6,this._viewports=[new me(2,1,1,1),new me(0,1,1,1),new me(3,1,1,1),new me(1,1,1,1),new me(3,0,1,1),new me(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Qs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Qs),ec.copy(n.position),ec.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ec),n.updateMatrixWorld(),s.makeTranslation(-Qs.x,-Qs.y,-Qs.z),Mu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mu)}},Wo=class extends Ls{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Sl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},bl=class extends Vo{constructor(){super(new bo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Us=class extends Ls{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new bl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Xo=class extends Ls{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Yo=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Eu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Eu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Eu(){return performance.now()}var Hl="\\[\\]\\.:\\/",$_=new RegExp("["+Hl+"]","g"),zl="[^"+Hl+"]",j_="[^"+Hl.replace("\\.","")+"]",Q_=/((?:WC+[\/:])*)/.source.replace("WC",zl),tx=/(WCOD+)?/.source.replace("WCOD",j_),ex=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zl),nx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zl),ix=new RegExp("^"+Q_+tx+ex+nx+"$"),sx=["material","materials","bones","map"],wl=class{constructor(t,e,n){let s=n||Se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Se=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($_,"")}static parseTrackName(t){let e=ix.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);sx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Se.Composite=wl;Se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Se.prototype.GetterByBindingType=[Se.prototype._getValue_direct,Se.prototype._getValue_array,Se.prototype._getValue_arrayElement,Se.prototype._getValue_toArray];Se.prototype.SetterByBindingTypeAndVersioning=[[Se.prototype._setValue_direct,Se.prototype._setValue_direct_setNeedsUpdate,Se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_array,Se.prototype._setValue_array_setNeedsUpdate,Se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_arrayElement,Se.prototype._setValue_arrayElement_setNeedsUpdate,Se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_fromArray,Se.prototype._setValue_fromArray_setNeedsUpdate,Se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Iy=new Float32Array(1);var pr=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var qo=class extends $n{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"169"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="169");var Ku={type:"change"},Gl={type:"start"},$u={type:"end"},jo=new Rs,Ju=new wn,rx=Math.cos(70*Ou.DEG2RAD),He=new C,ln=2*Math.PI,_e={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},kl=1e-6,Qo=class extends qo{constructor(t,e=null){super(t,e),this.state=_e.NONE,this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Yi.ROTATE,MIDDLE:Yi.DOLLY,RIGHT:Yi.PAN},this.touches={ONE:qi.ROTATE,TWO:qi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new Cn,this._lastTargetPosition=new C,this._quat=new Cn().setFromUnitVectors(t.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new pr,this._sphericalDelta=new pr,this._scale=1,this._panOffset=new C,this._rotateStart=new $,this._rotateEnd=new $,this._rotateDelta=new $,this._panStart=new $,this._panEnd=new $,this._panDelta=new $,this._dollyStart=new $,this._dollyEnd=new $,this._dollyDelta=new $,this._dollyDirection=new C,this._mouse=new $,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ax.bind(this),this._onPointerDown=ox.bind(this),this._onPointerUp=cx.bind(this),this._onContextMenu=mx.bind(this),this._onMouseWheel=ux.bind(this),this._onKeyDown=dx.bind(this),this._onTouchStart=fx.bind(this),this._onTouchMove=px.bind(this),this._onMouseDown=lx.bind(this),this._onMouseMove=hx.bind(this),this._interceptControlDown=gx.bind(this),this._interceptControlUp=_x.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ku),this.update(),this.state=_e.NONE}update(t=null){let e=this.object.position;He.copy(e).sub(this.target),He.applyQuaternion(this._quat),this._spherical.setFromVector3(He),this.autoRotate&&this.state===_e.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ln:n>Math.PI&&(n-=ln),s<-Math.PI?s+=ln:s>Math.PI&&(s-=ln),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(He.setFromSpherical(this._spherical),He.applyQuaternion(this._quatInverse),e.copy(this.target).add(He),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=He.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new C(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new C(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=He.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(jo.origin.copy(this.object.position),jo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(jo.direction))<rx?this.object.lookAt(this.target):(Ju.setFromNormalAndCoplanarPoint(this.object.up,this.target),jo.intersectPlane(Ju,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>kl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>kl||this._lastTargetPosition.distanceToSquared(this.target)>kl?(this.dispatchEvent(Ku),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?ln/60*this.autoRotateSpeed*t:ln/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){He.setFromMatrixColumn(e,0),He.multiplyScalar(-t),this._panOffset.add(He)}_panUp(t,e){this.screenSpacePanning===!0?He.setFromMatrixColumn(e,1):(He.setFromMatrixColumn(e,0),He.crossVectors(this.object.up,He)),He.multiplyScalar(t),this._panOffset.add(He)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;He.copy(s).sub(this.target);let r=He.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-ln*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/e.clientHeight),this._rotateUp(ln*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new $,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function ox(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function ax(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function cx(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent($u),this.state=_e.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function lx(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Yi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=_e.DOLLY;break;case Yi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=_e.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=_e.ROTATE}break;case Yi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=_e.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=_e.PAN}break;default:this.state=_e.NONE}this.state!==_e.NONE&&this.dispatchEvent(Gl)}function hx(i){switch(this.state){case _e.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case _e.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case _e.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ux(i){this.enabled===!1||this.enableZoom===!1||this.state!==_e.NONE||(i.preventDefault(),this.dispatchEvent(Gl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent($u))}function dx(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function fx(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case qi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=_e.TOUCH_ROTATE;break;case qi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=_e.TOUCH_PAN;break;default:this.state=_e.NONE}break;case 2:switch(this.touches.TWO){case qi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=_e.TOUCH_DOLLY_PAN;break;case qi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=_e.TOUCH_DOLLY_ROTATE;break;default:this.state=_e.NONE}break;default:this.state=_e.NONE}this.state!==_e.NONE&&this.dispatchEvent(Gl)}function px(i){switch(this._trackPointer(i),this.state){case _e.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case _e.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case _e.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case _e.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=_e.NONE}}function mx(i){this.enabled!==!1&&i.preventDefault()}function gx(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function _x(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var x={grass:9748863,grassLight:12442778,grassDeep:7776372,grassShade:6853995,soil:11045743,stone:15521977,stoneLight:16313556,stoneDim:14007712,stoneDark:11967357,rock:[13872525,12358263,14664354,11108971,13149314],roof:9086916,roofDeep:7507883,roofRose:13999263,gold:15321471,goldDeep:13082969,wood:10120016,woodLight:12554864,woodDark:7162425,cream:16774111,paper:16775402,white:16776178,water:9423835,waterDeep:6991039,leaf:8828543,leafLight:11194259,leafDeep:6525552,leafBlue:9417636,pink:15972023,rose:14978966,red:12871019,lavender:12957149,butter:16048036,brown:9136725,dark:4932158,iron:5921374,skin:16177344,skinWarm:15714734,hairBlond:15913080,hairBrown:8215366,hairDark:4864565},Ce={platform:{x:-2,y:3,z:-5.5,r:8.9},garden:{x:6.8,z:9.5},pond:{x:-9.2,z:7.9},stairsBottom:{x:-2,z:7.3}},Os=20261021;function Qu(){Os|=0,Os=Os+1831565813|0;let i=Math.imul(Os^Os>>>15,1|Os);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}function P(i=0,t=1){return i+Qu()*(t-i)}function na(i){return i[Math.floor(Qu()*i.length)]}function yi(i,t){let e=Math.sin(i*127.1+t*311.7)*43758.5453;return e-Math.floor(e)}function _r(i,t,e){let n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}var ql=(i,t,e)=>Math.min(e,Math.max(t,i)),Zl=(i,t,e)=>i+(t-i)*e,td=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,Yl=[];function te(i){Yl.push(i)}function ed(i,t){for(let e=0;e<Yl.length;e++)Yl[e](i,t)}var Vl=null;function ce(){if(!Vl){let i=new Uint8Array([124,158,192,222,243,255]),t=new lr(i,i.length,1,gr);t.minFilter=We,t.magFilter=We,t.generateMipmaps=!1,t.unpackAlignment=1,t.needsUpdate=!0,Vl=t}return Vl}var Wl=new Map;function Ut(i,t=null){if(!t||Object.keys(t).length===0){let e=typeof i=="number"?i:String(i);return Wl.has(e)||Wl.set(e,new ie({color:i,gradientMap:ce()})),Wl.get(e)}return new ie({color:i,gradientMap:ce(),...t})}var Xl=new Map;function Fs(i,t=null){return!t||Object.keys(t).length===0?(Xl.has(i)||Xl.set(i,new $t({color:i})),Xl.get(i)):new $t({color:i,...t})}function vi(i,t){return i&&i.isMaterial?i:Ut(i,t)}var Bs={box:new zi(1,1,1),sphere:new Ye(1,20,14),sphereLow:new Ye(1,10,8),icosa:new zo(1,1)};function D(i,t,e,n,s,r=0,o=0,a=0,c={}){let l=new J(Bs.box,vi(s,c.matOpts));return l.position.set(r,o,a),l.scale.set(t,e,n),c.rot&&l.rotation.set(c.rot[0]||0,c.rot[1]||0,c.rot[2]||0),l.castShadow=c.cast!==!1,l.receiveShadow=c.receive!==!1,c.name&&(l.name=c.name),i.add(l),l}function G(i,t,e,n=0,s=0,r=0,o={}){let a=new J(o.low?Bs.sphereLow:Bs.sphere,vi(e,o.matOpts));return a.position.set(n,s,r),Array.isArray(o.scale)?a.scale.set(t*o.scale[0],t*o.scale[1],t*o.scale[2]):a.scale.setScalar(t*(o.scale||1)),o.rot&&a.rotation.set(o.rot[0]||0,o.rot[1]||0,o.rot[2]||0),a.castShadow=o.cast!==!1,a.receiveShadow=o.receive!==!1,i.add(a),a}function Zi(i,t,e,n=0,s=0,r=0,o={}){let a=new J(Bs.icosa,vi(e,o.matOpts));return a.position.set(n,s,r),a.scale.setScalar(t),o.scale&&a.scale.set(t*o.scale[0],t*o.scale[1],t*o.scale[2]),o.rot&&a.rotation.set(o.rot[0]||0,o.rot[1]||0,o.rot[2]||0),a.castShadow=o.cast!==!1,a.receiveShadow=o.receive!==!1,i.add(a),a}var ju=new Map;function kt(i,t,e,n,s=0,r=0,o=0,a={}){let c=a.segments||16,l=c+":"+(a.open?1:0),h=ju.get(l);h||(h=new pn(1,1,c,1,!!a.open),ju.set(l,h));let u=new J(h,vi(n,a.matOpts));return u.position.set(s,r,o),u.scale.set(t,e,t),a.rot&&u.rotation.set(a.rot[0]||0,a.rot[1]||0,a.rot[2]||0),u.castShadow=a.cast!==!1,u.receiveShadow=a.receive!==!1,i.add(u),u}function Z(i,t,e,n,s,r=0,o=0,a=0,c={}){let l=new In(t,e,n,c.segments||16,1,!!c.open),h=new J(l,vi(s,c.matOpts));return h.position.set(r,o,a),c.rot&&h.rotation.set(c.rot[0]||0,c.rot[1]||0,c.rot[2]||0),c.scale&&h.scale.set(c.scale[0],c.scale[1],c.scale[2]),h.castShadow=c.cast!==!1,h.receiveShadow=c.receive!==!1,i.add(h),h}function Mi(i,t,e,n=0,s=0,r=0,o={}){let a=new Xe(t,o.segments||40),c=new J(a,vi(e,o.matOpts));return c.rotation.x=-Math.PI/2,o.rot&&c.rotation.set(o.rot[0],o.rot[1],o.rot[2]),c.position.set(n,s,r),c.castShadow=o.cast!==!1,c.receiveShadow=o.receive!==!1,i.add(c),c}function ia(i,t,e,n=[0,0,0],s={}){let r=new J(t,e);return r.position.set(n[0],n[1],n[2]),s.rot&&r.rotation.set(s.rot[0]||0,s.rot[1]||0,s.rot[2]||0),s.scale&&r.scale.set(s.scale[0],s.scale[1],s.scale[2]),r.castShadow=s.cast!==!1,r.receiveShadow=s.receive!==!1,i.add(r),r}function ni(i,t,e){let n=document.createElement("canvas");n.width=i,n.height=t;let s=n.getContext("2d");e(s,i,t);let r=new Do(n);return r.colorSpace=on,r.anisotropy=8,r}var ta=null;function Hs(){return ta||(ta=ni(256,256,(i,t,e)=>{let n=i.createRadialGradient(t/2,e/2,0,t/2,e/2,t/2);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.18,"rgba(255,255,250,0.85)"),n.addColorStop(.45,"rgba(255,240,210,0.32)"),n.addColorStop(1,"rgba(255,230,190,0)"),i.fillStyle=n,i.fillRect(0,0,t,e)}),ta)}var ea=null;function nd(){return ea||(ea=ni(512,512,(i,t,e)=>{i.clearRect(0,0,t,e);let n=26;for(let r=0;r<n;r++){let o=t*(.18+.64*P()),a=e*(.32+.36*P()),c=t*(.06+.16*P()),l=i.createRadialGradient(o,a,0,o,a,c);l.addColorStop(0,"rgba(255,252,246,0.5)"),l.addColorStop(.55,"rgba(255,246,238,0.28)"),l.addColorStop(1,"rgba(255,240,232,0)"),i.fillStyle=l,i.beginPath(),i.arc(o,a,c,0,Math.PI*2),i.fill()}i.globalCompositeOperation="source-atop";let s=i.createLinearGradient(0,e*.4,0,e*.8);s.addColorStop(0,"rgba(255,250,245,0.05)"),s.addColorStop(1,"rgba(240,205,205,0.22)"),i.fillStyle=s,i.fillRect(0,0,t,e)}),ea)}function Ie(i,t,e,n,s,r,o=.75){let a=new Pn({map:Hs(),color:t,transparent:!0,opacity:o,blending:an,depthWrite:!1,toneMapped:!1}),c=new zn(a);return c.scale.set(e,e,1),c.position.set(n,s,r),i.add(c),c}function xr(){let i=ni(512,512,(t,e,n)=>{t.fillStyle="#cbb79d",t.fillRect(0,0,e,n);let s=["#e3d2ba","#d9c6ab","#ccb79c","#eadac3","#d3bda2","#dfcab0"],r=-20,o=0;for(;r<n+30;){let a=36+P()*18,c=o%2===0?-28:-4;for(;c<e+30;){let l=44+P()*58,h=c+l/2+P(-3,3),u=r+a/2+P(-3,3),d=l/2-3,f=a/2-3;t.beginPath();let g=9;for(let p=0;p<=g;p++){let _=p/g*Math.PI*2,m=.86+.14*Math.sin(p*2.3+h*.1)+P(-.03,.03),v=h+Math.cos(_)*d*m,y=u+Math.sin(_)*f*m;p===0?t.moveTo(v,y):t.lineTo(v,y)}t.closePath(),t.fillStyle=na(s),t.fill(),t.strokeStyle="rgba(126,104,82,0.24)",t.lineWidth=2.2,t.stroke(),t.strokeStyle="rgba(255,250,240,0.2)",t.lineWidth=1.6,t.beginPath(),t.ellipse(h-d*.12,u-f*.2,d*.62,f*.42,-.1,Math.PI*.9,Math.PI*1.9),t.stroke(),c+=l+7+P()*5}r+=a+7,o++}for(let a=0;a<900;a++)t.fillStyle=P()>.5?"rgba(255,255,255,0.05)":"rgba(90,70,50,0.045)",t.fillRect(P()*e,P()*n,2,2)});return i.wrapS=i.wrapT=Bi,i.repeat.set(5,5),i}function Ei(i="blue"){let t=i==="blue",e=t?"#7d9dbe":"#cf9097",n=t?"#5c7d9f":"#b1717c";return ni(256,512,(s,r,o)=>{let a=s.createLinearGradient(0,0,0,o);a.addColorStop(0,e),a.addColorStop(.55,n),a.addColorStop(1,e),s.fillStyle=a,s.fillRect(0,0,r,o);for(let c=0;c<40;c++)s.fillStyle="rgba(255,255,255,0.03)",s.fillRect(P()*r,0,1+P()*3,o);s.strokeStyle="#e9c97f",s.lineWidth=9,s.strokeRect(12,12,r-24,o-24),s.strokeStyle="rgba(120,80,50,0.35)",s.lineWidth=2,s.strokeRect(24,24,r-48,o-48),s.save(),s.translate(r/2,o*.42),s.fillStyle="#f5dc9d",s.beginPath();for(let c=0;c<10;c++){let l=-Math.PI/2+c*Math.PI/5,h=c%2===0?52:22;s.lineTo(Math.cos(l)*h,Math.sin(l)*h)}s.closePath(),s.fill(),s.restore(),s.strokeStyle="#f0d595",s.lineWidth=3,s.beginPath(),s.arc(r/2,o*.42,72,0,Math.PI*2),s.stroke(),s.fillStyle="rgba(250,237,205,0.9)",s.font="italic 24px Georgia, serif",s.textAlign="center",s.fillText("petit",r/2,o*.76),s.fillText("royaume",r/2,o*.83);for(let c=0;c<13;c++){s.beginPath();let l=36+c*15;s.moveTo(l,o-28),s.lineTo(l,o-10),s.lineTo(l+5,o-18),s.lineTo(l+10,o-10),s.lineTo(l+10,o-28),s.fillStyle="#e9c97f",s.fill()}})}function Kl(i=0){let t=i===0?"#c7b49c":"#b8a9bf";return ni(384,512,(e,n,s)=>{e.fillStyle=t,e.fillRect(0,0,n,s);let r=e.createLinearGradient(0,0,0,s);r.addColorStop(0,"rgba(255,248,235,0.25)"),r.addColorStop(1,"rgba(70,50,40,0.22)"),e.fillStyle=r,e.fillRect(0,0,n,s),e.strokeStyle="#e2c687",e.lineWidth=16,e.strokeRect(10,10,n-20,s-20),e.strokeStyle="rgba(110,80,60,0.45)",e.lineWidth=3,e.strokeRect(28,28,n-56,s-56);for(let a=0;a<30;a++){let c=34+a*11;if(c>n-30)break;e.fillStyle=a%2?"#e2c687":"#d7a5a3",e.beginPath(),e.arc(c,20,3,0,Math.PI*2),e.fill()}let o=e.createLinearGradient(0,60,0,s-120);o.addColorStop(0,"#8fa9c4"),o.addColorStop(.6,"#d8c7b8"),o.addColorStop(1,"#c3b291"),e.fillStyle=o,e.fillRect(36,36,n-72,s-72),e.fillStyle="#f6e6ae",e.beginPath(),e.arc(n*.72,s*.24,34,0,Math.PI*2),e.fill();for(let a=0;a<18;a++)e.fillStyle="rgba(255,248,220,0.8)",e.beginPath(),e.arc(48+P()*(n-96),50+P()*s*.4,P(1,2.5),0,Math.PI*2),e.fill();e.fillStyle="#9cae8d",e.beginPath(),e.moveTo(36,s-150),e.quadraticCurveTo(n*.28,s-250,n*.5,s-140),e.quadraticCurveTo(n*.75,s-235,n-36,s-155),e.lineTo(n-36,s-36),e.lineTo(36,s-36),e.closePath(),e.fill(),e.fillStyle="#7f957c",e.beginPath(),e.moveTo(36,s-110),e.quadraticCurveTo(n*.4,s-175,n-36,s-120),e.lineTo(n-36,s-36),e.lineTo(36,s-36),e.closePath(),e.fill(),e.fillStyle="#f0e3cd",e.fillRect(n*.34,s-208,26,72),e.fillRect(n*.58,s-230,22,94),e.fillRect(n*.44,s-178,62,48),e.beginPath(),e.moveTo(n*.32,s-210),e.lineTo(n*.39,s-238),e.lineTo(n*.46,s-210),e.closePath(),e.fill(),e.beginPath(),e.moveTo(n*.56,s-232),e.lineTo(n*.615,s-262),e.lineTo(n*.67,s-232),e.closePath(),e.fill(),e.fillStyle="#c96f78";for(let a=0;a<9;a++){let c=56+a*34,l=s-74-a%3*16;e.beginPath(),e.arc(c,l,8,0,Math.PI*2),e.fill(),e.strokeStyle="#71896c",e.lineWidth=2,e.beginPath(),e.moveTo(c,l+8),e.lineTo(c,l+26),e.stroke()}e.strokeStyle="rgba(90,70,50,0.35)",e.lineWidth=2;for(let a=0;a<12;a++)e.beginPath(),e.moveTo(36,36+a*36),e.lineTo(n-36,36+a*36+8),e.stroke()})}function Jl(i="rose"){let t=i==="rose"?"#b96c72":"#6f7fa1",e=i==="rose"?"#e9c9aa":"#dcd2b8";return ni(512,512,(n,s,r)=>{n.fillStyle=t,n.fillRect(0,0,s,r),n.strokeStyle=e,n.lineWidth=18,n.strokeRect(18,18,s-36,r-36),n.strokeStyle="rgba(255,240,210,0.55)",n.lineWidth=5,n.strokeRect(46,46,s-92,r-92),n.strokeStyle="rgba(255,240,210,0.35)",n.lineWidth=3;for(let o=0;o<8;o++){let a=o/8*Math.PI*2,c=s/2+Math.cos(a)*150,l=r/2+Math.sin(a)*150;n.beginPath();for(let h=0;h<8;h++){let u=h/8*Math.PI*2,d=h%2?12:30;n.lineTo(c+Math.cos(u)*d,l+Math.sin(u)*d)}n.closePath(),n.stroke()}n.fillStyle="rgba(255,240,210,0.5)",n.beginPath();for(let o=0;o<16;o++){let a=-Math.PI/2+o*Math.PI/8,c=o%2?40:92;n.lineTo(s/2+Math.cos(a)*c,r/2+Math.sin(a)*c)}n.closePath(),n.fill(),n.fillStyle=t,n.beginPath(),n.arc(s/2,r/2,28,0,Math.PI*2),n.fill();for(let o=0;o<500;o++)n.fillStyle=P()>.5?"rgba(255,250,240,0.04)":"rgba(60,40,40,0.05)",n.fillRect(P()*s,P()*r,2,2)})}function id(){return ni(384,384,(i,t,e)=>{i.fillStyle="#3f4247",i.beginPath(),i.arc(t/2,e/2,t/2-4,0,Math.PI*2),i.fill();let n=["#d9808c","#88a9cf","#e8c878","#9bbf9c","#b79bc9","#7fb6c5"],s=t/2,r=e/2;for(let o=0;o<2;o++){let a=o===0?28:104,c=o===0?102:174,l=o===0?8:16;for(let h=0;h<l;h++){let u=h/l*Math.PI*2,d=(h+1)/l*Math.PI*2;i.beginPath(),i.arc(s,r,c,u,d),i.arc(s,r,a,d,u,!0),i.closePath(),i.fillStyle=n[(h+o*2)%n.length],i.fill(),i.strokeStyle="#2f3238",i.lineWidth=7,i.stroke()}}i.fillStyle="#e7c979",i.beginPath(),i.arc(s,r,26,0,Math.PI*2),i.fill(),i.strokeStyle="#3b3d42",i.lineWidth=8;for(let o=0;o<8;o++){let a=o/8*Math.PI*2;i.beginPath(),i.moveTo(s+Math.cos(a)*26,r+Math.sin(a)*26),i.lineTo(s+Math.cos(a)*174,r+Math.sin(a)*174),i.stroke()}i.beginPath(),i.arc(s,r,174,0,Math.PI*2),i.strokeStyle="#e7c979",i.lineWidth=12,i.stroke(),i.beginPath(),i.arc(s,r,190,0,Math.PI*2),i.strokeStyle="#5b544b",i.lineWidth=12,i.stroke()})}function yr(i,t,e){let n=new Ge,s=i/2;return n.moveTo(-s,0),n.lineTo(s,0),n.lineTo(s,t-e),n.absarc(0,t-e,s,0,Math.PI,!1),n.lineTo(-s,0),n}function yn(i,t,e,n,s=0,r={}){let o=new j;o.position.set(n[0],n[1],n[2]),o.rotation.y=s,i.add(o);let a=new J(new be(yr(t,e,t/2),12),new $t({color:r.color||16767393,transparent:!0,opacity:r.opacity??.95,side:Yt,toneMapped:!1}));a.position.z=.012,o.add(a);let c=r.frame||x.stoneDim,l=t*.11;D(o,t+l*2,l,.06,c,0,e-t/2,.03),D(o,l,e-t/2,.08,c,-t/2-l/2,(e-t/2)/2,.03),D(o,l,e-t/2,.08,c,t/2+l/2,(e-t/2)/2,.03);let h=new J(new Ee(t/2+l/2,l*.55,6,20,Math.PI),vi(c));return h.position.set(0,e-t/2,.05),h.castShadow=!0,o.add(h),r.bars!==!1&&(D(o,t*.055,e*.92,.04,r.barColor||x.woodDark,0,e*.46,.045),D(o,t*.92,t*.045,.04,r.barColor||x.woodDark,0,e*.42,.045)),D(o,t+l*2.4,l*.7,.16,c,0,-l*.2,.04),r.glow!==!1&&Ie(o,r.glowColor||16763258,t*3.2,0,e/2,.1,.28),o}function Si(i,t,e,n,s,r=0,o={}){let a=new Ae(e,n,5,10);a.translate(0,-n/2,0);let c=new $t({map:t,side:Yt,transparent:!0,toneMapped:!0,color:o.tint||16777215}),l=new J(a,c);l.position.set(s[0],s[1],s[2]),l.rotation.y=r,l.castShadow=!0,i.add(l);let h=a.attributes.position.array.slice(),u=P(0,Math.PI*2),d=o.amp??.07;return te(f=>{let g=a.attributes.position.array;for(let p=0;p<g.length;p+=3){let _=h[p+1];g[p+2]=Math.sin(f*1.7+u+_*3)*d*Math.min(1,-_/n+.15)+Math.sin(f*2.6+u*2+_*5)*d*.25}a.attributes.position.needsUpdate=!0,a.computeVertexNormals()}),l}function sa(i,t,e,n=0){let s=Z(i,.022,.03,1,x.woodDark,e[0],e[1]-.5,e[2],{segments:6}),r=G(i,.06,x.gold,e[0],e[1]+.02,e[2],{low:!0}),o=new ae;o.setAttribute("position",new Ft([0,0,0,.62,-.09,0,0,-.34,0],3)),o.computeVertexNormals();let a=new J(o,new $t({color:t,side:Yt,toneMapped:!0}));a.position.set(e[0]+.01,e[1]-.06,e[2]),a.rotation.y=n,a.castShadow=!0,i.add(a);let c=P(0,6);return te(l=>{a.rotation.y=n+Math.sin(l*2.1+c)*.22,a.scale.x=.92+Math.sin(l*3.3+c)*.08}),s}function Ki(i={}){let{skin:t=x.skin,hair:e=x.hairBrown,outfit:n=x.leaf,accent:s=x.gold,height:r=1,skirt:o=!1,cape:a=null,crown:c=!1,hat:l=null,beard:h=!1,seated:u=!1,hairStyle:d="short",basket:f=!1}=i,g=new j,p=r,_=i.pants||6116171,m=4866104;!o&&!u?(Z(g,.055*p,.065*p,.4*p,_,-.09*p,(u?.3:.2)*p,0,{segments:8}),Z(g,.055*p,.065*p,.4*p,_,.09*p,(u?.3:.2)*p,0,{segments:8}),D(g,.14*p,.06*p,.2*p,m,-.09*p,(u?.1:.03)*p,.03*p),D(g,.14*p,.06*p,.2*p,m,.09*p,(u?.1:.03)*p,.03*p)):(kt(g,.29*p,.78*p,n,0,.39*p,0,{segments:18}),Z(g,.07*p,.09*p,.06*p,m,-.09*p,.03*p,.04*p,{segments:8}),Z(g,.07*p,.09*p,.06*p,m,.09*p,.03*p,.04*p,{segments:8}));let v=.72*p;u&&(v=.88*p);let y=Z(g,.15*p,.21*p,.5*p,n,0,v,0,{segments:12});o&&(y.position.y=.88*p,y.scale.set(.9,.55,.9)),u&&(D(g,.11*p,.11*p,.42*p,_,-.09*p,.48*p,.18*p),D(g,.11*p,.11*p,.42*p,_,.09*p,.48*p,.18*p),Z(g,.055*p,.06*p,.36*p,_,-.09*p,.3*p,.36*p,{segments:8}),Z(g,.055*p,.06*p,.36*p,_,.09*p,.3*p,.36*p,{segments:8}),D(g,.14*p,.06*p,.2*p,m,-.09*p,.12*p,.42*p),D(g,.14*p,.06*p,.2*p,m,.09*p,.12*p,.42*p));let E=v+.2*p,L=[.05*p,.06*p,.44*p],T=new j;T.position.set(-.2*p,E,0),T.rotation.z=.18,T.rotation.x=u?-.5:.08;let A=Z(T,L[0],L[1],L[2],n,0,-L[2]/2,0,{segments:8});G(T,.05*p,t,0,-L[2]-.01*p,0,{low:!0}),g.add(T);let U=new j;U.position.set(.2*p,E,0),U.rotation.z=-.18,U.rotation.x=u?-.5:-.08,Z(U,L[0],L[1],L[2],n,0,-L[2]/2,0,{segments:8}),G(U,.05*p,t,0,-L[2]-.01*p,0,{low:!0}),g.add(U);let k=v+.42*p;G(g,.155*p,t,0,k,.01*p,{scale:[1,1.05,1]}),Z(g,.055*p,.06*p,.08*p,t,0,k-.15*p,0,{segments:8});let M=Fs(3814192);for(let H of[-1,1]){let B=new J(Bs.sphereLow,M);B.scale.setScalar(.016*p),B.position.set(H*.055*p,k+.015*p,.148*p),g.add(B)}let b=Fs(15378848,{transparent:!0,opacity:.55});for(let H of[-1,1]){let B=new J(Bs.sphereLow,b);B.scale.set(.028*p,.018*p,.012*p),B.position.set(H*.085*p,k-.045*p,.13*p),g.add(B)}if(d==="halo"){let H=Ut(e);G(g,.17*p,e,0,k+.07*p,0,{scale:[1.02,.72,1.02],matOpts:{}});let B=[[-.11,.1,.08],[0,.16,.02],[.11,.1,.07],[-.15,.02,.02],[.15,.02,.03],[0,.06,-.12]];for(let[X,nt,V]of B)G(g,.065*p,e,X*p,k+nt*p,V*p,{low:!0})}else d==="bun"?(G(g,.17*p,e,0,k+.05*p,-.02*p,{scale:[1.02,.9,1]}),G(g,.1*p,e,0,k+.21*p,-.08*p,{low:!0})):d==="long"?(G(g,.17*p,e,0,k+.05*p,-.03*p,{scale:[1.05,1,1.02]}),D(g,.16*p,.36*p,.1*p,e,0,k-.15*p,-.1*p)):d==="bald"?G(g,.168*p,t,0,k+.02*p,0,{scale:[1,.9,1]}):G(g,.165*p,e,0,k+.04*p,-.015*p,{scale:[1.03,.88,1.02]});if(l==="wizard")Z(g,.24*p,.2*p,.04*p,x.wood,0,k+.14*p,0,{segments:16}),kt(g,.15*p,.42*p,x.wood,0,k+.35*p,0,{segments:16});else if(l==="feather"){Z(g,.22*p,.24*p,.035*p,i.hatColor||x.woodDark,0,k+.14*p,0,{segments:16}),kt(g,.13*p,.2*p,i.hatColor||x.woodDark,0,k+.23*p,0,{segments:16});let H=D(g,.025*p,.28*p,.08*p,x.cream,.18*p,k+.25*p,0);H.rotation.z=-.4}if(c){let H=Ut(x.gold),B=new J(new In(.14*p,.12*p,.1*p,12,1,!0),H);B.position.set(0,k+.16*p,0),B.castShadow=!0,g.add(B);for(let X=0;X<5;X++){let nt=X/5*Math.PI*2;kt(g,.035*p,.12*p,x.gold,Math.cos(nt)*.12*p,k+.26*p,Math.sin(nt)*.12*p,{segments:5})}G(g,.035*p,x.rose,0,k+.255*p,.12*p,{low:!0})}if(h&&kt(g,.11*p,.3*p,x.white,0,k-.2*p,.09*p,{segments:10,rot:[Math.PI,0,0]}),a){let H=new Ae(.5*p,.75*p,4,6);H.translate(0,-.375*p,0);let B=new J(H,new ie({color:a,side:Yt,gradientMap:ce()}));B.position.set(0,E+.1*p,-.15*p),B.rotation.x=.12,B.castShadow=!0,g.add(B)}if(f){let H=Z(g,.13*p,.1*p,.16*p,x.woodLight,.25*p,.62*p,.14*p,{segments:12});for(let B=0;B<3;B++)G(g,.05*p,x.woodLight,(.2+B*.05)*p,.72*p,.14*p,{low:!0,scale:[1,.6,1]})}if(i.tool==="spear"){let H=Z(g,.018*p,.018*p,1.85*p,x.wood,.28*p,.95*p,.06*p,{segments:6});kt(g,.045*p,.18*p,x.stoneLight,.28*p,1.98*p,.06*p,{segments:8})}if(i.tool==="lute"){let H=G(g,.16*p,x.woodLight,.2*p,.72*p,.18*p,{scale:[.8,1.1,.3],low:!0});D(g,.035*p,.36*p,.05*p,x.woodDark,.2*p,1*p,.18*p),D(g,.14*p,.02*p,.02*p,x.gold,.2*p,1.14*p,.18*p),T.rotation.x=-.9,T.rotation.z=.45,U.rotation.x=-.75,U.rotation.z=-.5}return g}function ra(i=1,t=.45,e=5){let n=new Ge;for(let s=0;s<e*2;s++){let r=s%2===0?i:t,o=-Math.PI/2+s*Math.PI/e,a=Math.cos(o)*r,c=Math.sin(o)*r;s===0?n.moveTo(a,c):n.lineTo(a,c)}return n.closePath(),n}function Ji(i,t,e,n,s,r,o=0,a={}){let c=new be(ra(t,t*.45,5)),l=new $t({color:e,side:Yt,transparent:a.opacity!==void 0,opacity:a.opacity??1,toneMapped:!1}),h=new J(c,l);return h.position.set(n,s,r),h.rotation.y=o,h.rotation.z=a.rotZ||0,i.add(h),h}function bi(i,t,e,n,s,r=3025706){let o=new j;o.position.set(n[0],n[1],n[2]),o.rotation.y=s,i.add(o);let a=new J(new be(yr(t,e,t/2),12),new $t({color:r,side:Yt}));a.position.z=.01,o.add(a);let c=new J(new Ee(t/2,t*.08,6,18,Math.PI),vi(x.stoneDim));return c.position.set(0,e-t/2,.02),o.add(c),o}var aa=new C(.52,.46,.72).normalize();function xx(){let i=new Ye(420,48,32),t=new en({side:$e,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new Pt(8368598)},uHorizon:{value:new Pt(16767154)},uWarm:{value:new Pt(15773599)},uSunColor:{value:new Pt(16773320)},uSunDir:{value:aa.clone()}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec3 vDir;
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uWarm;
      uniform vec3 uSunColor;
      uniform vec3 uSunDir;
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      void main() {
        vec3 dir = normalize(vDir);
        float h = dir.y;
        vec3 col = mix(uHorizon, uTop, smoothstep(-0.02, 0.34, h));
        float band = exp(-max(h, 0.0) * 7.5);
        col = mix(col, uWarm, band * 0.5);
        float mu = max(dot(dir, uSunDir), 0.0);
        col = mix(col, uSunColor, pow(mu, 5.0) * 0.3);
        col += uSunColor * pow(mu, 280.0) * 0.9;
        float n = noise(dir.xz * 2.4 + dir.y * 3.2);
        float n2 = noise(dir.xz * 6.0 - dir.y * 2.0);
        col += (n - 0.5) * 0.03 + (n2 - 0.5) * 0.012;
        if (h < 0.0) {
          col = mix(col, vec3(0.93, 0.84, 0.83), smoothstep(0.0, -0.4, h) * 0.55);
        }
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `}),e=new J(i,t);return e.frustumCulled=!1,e}function yx(){let i=new j,t=new zn(new Pn({map:Hs(),color:16772288,transparent:!0,opacity:.9,blending:an,depthWrite:!1,fog:!1,toneMapped:!1}));t.scale.setScalar(150),i.add(t);let e=new zn(new Pn({map:Hs(),color:16774877,transparent:!0,opacity:1,blending:an,depthWrite:!1,fog:!1,toneMapped:!1}));return e.scale.setScalar(52),i.add(e),i}function oa(i,t,e,n=16774636){let s=new Pn({map:i,color:n,transparent:!0,opacity:e,depthWrite:!1,fog:!0,toneMapped:!0}),r=new zn(s);return r.scale.set(t,t*.55,1),r}function zs(i,t,e,n,s){let r=new j;r.position.set(i,t,e),r.scale.setScalar(n),Zi(r,3.2,14006946,0,-1,0,{scale:[1,.7,1],rot:[.2,.6,.1]});let o=new J(new Ye(1,14,7,0,Math.PI*2,0,Math.PI/2),Ut(11127190));return o.scale.set(3.2,.55,3),o.position.y=.5,r.add(o),s&&(Z(r,.24,.34,2.4,15258811,.3,1.8,0,{segments:8}),kt(r,.42,.8,x.roof,.3,3.35,0,{segments:8}),Z(r,.22,.3,1.5,15258811,-.9,1.35,.2,{segments:8}),kt(r,.36,.6,x.roofRose,-.9,2.35,.2,{segments:8}),D(r,1.6,.6,.5,14995638,-.3,1,.7),kt(r,.1,.5,x.leafDeep,1.5,1.1,-.4,{segments:5}),G(r,.42,x.leaf,1.5,1.25,-.4,{scale:[1,.85,1]})),r}function sd(i){let t=xx();i.add(t);let e=yx();e.position.copy(aa).multiplyScalar(280),i.add(e);let n=nd(),s=new j;i.add(s);for(let c=0;c<26;c++){let l=P(0,Math.PI*2),h=P(95,220),u=oa(n,P(38,95),P(.18,.45));u.position.set(Math.cos(l)*h,P(-4,58),Math.sin(l)*h),s.add(u)}for(let c=0;c<16;c++){let l=P(0,Math.PI*2),h=P(48,105),u=oa(n,P(24,58),P(.26,.5),16775407);u.position.set(Math.cos(l)*h,P(8,42),Math.sin(l)*h),u.material.rotation=P(-.18,.18),s.add(u)}let r=[];for(let c=0;c<36;c++){let l=P(0,Math.PI*2),h=P(14,85),u=oa(n,P(22,46),P(.24,.52),16774892);u.position.set(Math.cos(l)*h,P(-21,-10),Math.sin(l)*h),u.material.rotation=P(-.3,.3),s.add(u),r.push({sprite:u,speed:P(.15,.4),phase:P(0,6.28)})}for(let c=0;c<5;c++){let l=P(0,Math.PI*2),h=P(24,30),u=oa(n,P(10,17),P(.18,.3),16775150);u.position.set(Math.cos(l)*h,P(-8,-3),Math.sin(l)*h),s.add(u)}let o=new j;i.add(o),o.add(zs(-62,10,-86,1.35,!0)),o.add(zs(78,21,-104,1.6,!0)),o.add(zs(-105,12,-130,2.6,!0)),o.add(zs(135,-26,-160,3.8,!1)),o.add(zs(62,34,-185,2,!0)),o.add(zs(-160,-34,40,2.4,!1));let a=new j;return i.add(a),te(c=>{s.rotation.y=c*.003;for(let l of r)l.sprite.position.y+=Math.sin(c*l.speed+l.phase)*.002}),{sky:t,sun:e,clouds:s}}function jt(i,t){let e=.62;e+=.42*Math.sin(i*.31+.8)*Math.cos(t*.26-.4),e+=.22*Math.sin((i+t)*.48+2.1),e+=1.05*Math.exp(-(((i-6.8)**2+(t-9.4)**2)/(2*3.6**2))),e+=.5*Math.exp(-(((i+10.5)**2+(t+1.5)**2)/(2*4.6**2))),e+=.3*Math.exp(-(((i-10)**2+(t-3.2)**2)/(2*3.2**2))),e+=.24*Math.exp(-(((i-1.5)**2+(t-12.2)**2)/(2*2.4**2)));let n=Math.hypot(i+9.2,t-7.9),s=_r(4.5,2.2,n);e=Zl(e,.5,s*.92);let r=Math.hypot(i,t)/18.4;return e=Zl(e,.2,_r(.84,1,r)),e}function rd(i){return 1+.05*Math.sin(i*3+.4)+.028*Math.sin(i*7+1.7)+.015*Math.sin(i*13+3.1)+.008*Math.sin(i*23+.7)}var ks=null;function vx(){return ks||(ks=ni(512,512,(i,t,e)=>{i.fillStyle="#fffdf4",i.fillRect(0,0,t,e);for(let n=0;n<70;n++){let s=P(0,t),r=P(0,e),o=P(18,90),a=i.createRadialGradient(s,r,0,s,r,o);a.addColorStop(0,n%3===0?"rgba(137,162,115,0.20)":"rgba(218,226,190,0.28)"),a.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=a,i.beginPath(),i.arc(s,r,o,0,Math.PI*2),i.fill()}for(let n=0;n<800;n++){let s=P(0,t),r=P(0,e);i.strokeStyle=n%3===0?"rgba(116,142,95,0.17)":"rgba(242,246,218,0.24)",i.lineWidth=P(.7,1.8),i.beginPath(),i.moveTo(s,r),i.lineTo(s+P(-3,3),r+P(-7,-2)),i.stroke()}for(let n=0;n<60;n++)i.fillStyle="rgba(255,255,255,0.15)",i.fillRect(P(0,t),P(0,e),2,2)}),ks.wrapS=ks.wrapT=Bi,ks)}function Mx(){let t=[[17.98,.05],[18.1,-.3],[17.8,-.95],[17.1,-1.9],[16,-3.1],[14.5,-4.6],[12.7,-6.2],[10.9,-7.9],[9,-9.5],[7,-11],[5.1,-12.3],[3.2,-13.3],[1.3,-13.9],[.1,-14.15]].map(([h,u])=>new $(h,u)),e=new Is(t,96),n=e.attributes.position,s=[],r=x.rock.map(h=>new Pt(h)),o=new Pt(9416316);for(let h=0;h<n.count;h++){let u=n.getX(h),d=n.getZ(h),f=n.getY(h),g=Math.atan2(d,u),p=rd(g)*(1+.018*Math.sin(g*17+1.2)+.01*Math.sin(g*31+.3));n.setX(h,u*p),n.setZ(h,d*p),n.setY(h,f+.2*Math.sin(g*5+f*.42)*_r(-1,-4,f));let _=Math.floor(-f/1.55+Math.sin(g*2)*.35+yi(g*3,f)*.3),m=r[(_%r.length+r.length)%r.length].clone();m.offsetHSL(0,0,(yi(u*1.7,d*1.3+f)-.5)*.085),f>-1.1&&yi(u,d)>.55&&m.lerp(o,.35),s.push(m.r,m.g,m.b)}e.setAttribute("color",new Ft(s,3));let a=e.toNonIndexed();a.computeVertexNormals();let c=new ie({vertexColors:!0,gradientMap:ce()}),l=new J(a,c);return l.castShadow=!0,l.receiveShadow=!0,l}function Ex(){let e=[{r:0,off:0},{r:.06,off:0},{r:.13,off:0},{r:.21,off:0},{r:.3,off:0},{r:.4,off:0},{r:.5,off:0},{r:.6,off:0},{r:.7,off:0},{r:.79,off:0},{r:.87,off:0},{r:.93,off:0},{r:.975,off:0},{r:1,off:-.18},{r:1.016,off:-.55},{r:1.022,off:-1.5}],n=[],s=[],r=[],o=[],a=new Pt(x.grass),c=new Pt(x.grassLight),l=new Pt(x.grassDeep),h=new Pt(9731683),u=new Pt(7313524);for(let p=0;p<e.length;p++){let _=e[p];for(let m=0;m<144;m++){let v=m/144*Math.PI*2,y=rd(v)*(1+.006*Math.sin(v*29+1.1)),E=18.45*_.r*y,L=Math.cos(v)*E,T=Math.sin(v)*E,A=jt(L,T)+_.off;p===13&&(A=jt(L,T)-.18),p===14&&(A=-.6),p===15&&(A=-1.5),n.push(L,A,T),r.push(L*.105+.5,T*.105+.5);let U;if(p<12){U=a.clone();let k=.5+.5*Math.sin(L*.33+2.1)*Math.cos(T*.29-.8);U.lerp(c,ql(k*.55+yi(L,T)*.22,0,.75)),U.lerp(l,ql(yi(L*1.3+4,T*1.1)*.4,0,.38)),yi(L*.27+7.1,T*.23+3.4)>.9&&U.lerp(h,.16);let M=Math.hypot(L+9.2,T-7.9);U.lerp(u,_r(4.5,2.4,M)*.35),Math.hypot(L+2,T+5.5)<10.5&&U.lerp(l,.16)}else p<13?U=a.clone().lerp(c,.18):p===13?U=u.clone().lerp(l,.4):U=h.clone().lerp(u,p===14?.6:.15);U.offsetHSL(0,0,(yi(L*.7,T*.9)-.5)*.035),s.push(U.r,U.g,U.b)}}for(let p=0;p<e.length-1;p++)for(let _=0;_<144;_++){let m=p*144+_,v=p*144+(_+1)%144,y=(p+1)*144+_,E=(p+1)*144+(_+1)%144;o.push(m,v,y,v,E,y)}let d=new ae;d.setAttribute("position",new Ft(n,3)),d.setAttribute("color",new Ft(s,3)),d.setAttribute("uv",new Ft(r,2)),d.setIndex(o),d.computeVertexNormals();let f=new ie({vertexColors:!0,gradientMap:ce(),map:vx()}),g=new J(d,f);return g.receiveShadow=!0,g.castShadow=!0,g}function ca(i,t,e,n,s,r=x.leafDeep){let o=[],a=P(-.6,.6);for(let u=0;u<=6;u++){let d=u/6;o.push(new C(t+Math.sin(d*3+a)*.25,e-d*s,n+Math.cos(d*2.5+a)*.2))}let c=new ke(o),l=new xn(c,12,.035,4,!1),h=new J(l,Ut(r));h.castShadow=!0,i.add(h);for(let u=1;u<7;u++){let d=c.getPoint(u/8),f=ia(i,new Ye(.12,5,4),Ut(x.leaf),[d.x+P(-.1,.1),d.y,d.z+P(-.1,.1)],{scale:[1,.35,.55],rot:[P(0,1),P(0,3),P(0,1)],cast:!1})}}function Sx(i,t,e,n){Z(i,.015,.015,1.8,x.iron,t,e-.9,n,{segments:5});let s=new j;s.position.set(t,e-1.95,n),i.add(s),Z(s,.16,.2,.1,x.iron,0,.12,0,{segments:4}),kt(s,.22,.18,x.iron,0,-.1,0,{segments:4,rot:[Math.PI,0,0]});let r=new $t({color:16766869,toneMapped:!1}),o=new J(new Ye(.1,8,6),r);s.add(o),Ie(s,16763271,1.4,0,0,0,.5),te(a=>{s.rotation.z=Math.sin(a*.6+t)*.08,s.rotation.x=Math.cos(a*.45+n)*.06})}function bx(i){let t=new j,e=Zi(t,i,na(x.rock),0,-i*.35,0,{scale:[1,.72,.9],rot:[P(0,1),P(0,3),P(0,1)],low:!1}),n=new J(new Ye(1,16,8,0,Math.PI*2,0,Math.PI/2),Ut(x.grass));return n.scale.set(i*.92,i*.22,i*.82),n.position.y=i*.18,n.castShadow=!0,n.receiveShadow=!0,t.add(n),t}function od(i){let t=Mx();i.add(t);let e=Ex();i.add(e);for(let o=0;o<7;o++){let a=P(0,Math.PI*2),c=P(2,12),l=P(.4,1.2),h=Math.cos(a)*(18.2+P(-.6,.4)),u=Math.sin(a)*(18.2+P(-.6,.4)),d=Zi(i,l,na(x.rock),h,P(-3.2,-1.2),u,{scale:[1.3,.8,1],rot:[P(0,2),P(0,3),P(0,2)]})}ca(i,7.5,-1.4,-13.2,5.2),ca(i,-11.2,-2.1,7.6,4.1,x.leafBlue),ca(i,-5,-1.8,-14.5,5.8),ca(i,13.6,-2.8,-5.1,3.8,x.leafDeep),Sx(i,10.2,-1.2,8.2);let n=[{a:2.4,r:27,y:4.8,s:2.1,decor:"tree"},{a:-.9,r:24,y:-5.4,s:1.3,decor:"lantern"},{a:1.25,r:30,y:-1.2,s:1.6,decor:"chair"},{a:3.6,r:23,y:8.2,s:.9,decor:"none"}],s=new j;i.add(s);for(let o of n){let a=bx(o.s);a.position.set(Math.cos(o.a)*o.r,o.y,Math.sin(o.a)*o.r),s.add(a),o.decor==="tree"?(Z(a,.05,.08,.8,x.wood,.15,o.s*.36,.1,{segments:6}),G(a,.55,x.leaf,.15,o.s*.36+.8,.1,{scale:[1.1,.85,1.05]}),G(a,.38,x.leafLight,.55,o.s*.36+.6,.25,{low:!0})):o.decor==="lantern"?(D(a,.22,.3,.22,x.iron,0,o.s*.3+.2,0),Ie(a,16763005,1.5,0,o.s*.3+.2,.15,.55)):o.decor==="chair"&&(D(a,.34,.05,.3,x.woodLight,0,o.s*.28+.4,0,{rot:[0,.5,0]}),D(a,.34,.45,.05,x.woodLight,0,o.s*.28+.62,-.13,{rot:[0,.5,0]}),D(a,.05,.4,.28,x.woodLight,-.15,o.s*.28+.2,0,{rot:[0,.5,0]}),D(a,.05,.4,.28,x.woodLight,.15,o.s*.28+.2,0,{rot:[0,.5,0]}));let c=P(0,6.28),l=a.position.y,h=P(-.02,.02);te(u=>{a.position.y=l+Math.sin(u*.35+c)*.35,a.rotation.y=c+u*h})}let r=new j;i.add(r);for(let o=0;o<5;o++){let a=P(0,Math.PI*2),c=P(1,3.5),l=Math.cos(a)*c,h=Math.sin(a)*c;if(h<4&&l>-5)continue;let u=new J(new pn(.24,1.1,5),Ut(x.leafDeep));u.position.set(l,jt(l,h)+.25,h),u.rotation.z=P(-.15,.15),r.add(u)}return{rock:t,grass:e}}function wx(i){let t=new j;t.position.set(Ce.platform.x,Ce.platform.y,Ce.platform.z),i.add(t);let e=[[8.95,0],[8.9,-.35],[8.75,-.8],[8.55,-1.35],[8.25,-2],[7.8,-2.7],[7.2,-3.4],[6.6,-3.9],[6.1,-4.2]],n=new Is(e.map(([f,g])=>new $(f,g)),88),s=n.attributes.position,r=[new Pt(x.stoneDim),new Pt(x.stoneDark),new Pt(13480854)],o=[];for(let f=0;f<s.count;f++){let g=s.getX(f),p=s.getZ(f),_=s.getY(f),m=Math.atan2(p,g),v=1+.012*Math.sin(m*5+1.2)+.007*Math.sin(m*11+.3);s.setX(f,g*v),s.setZ(f,p*v);let y=r[Math.abs(Math.floor(-_/.9+Math.sin(m*3)))%r.length].clone();y.offsetHSL(0,0,Math.sin(m*7+_)*.5*.02),o.push(y.r,y.g,y.b)}n.setAttribute("color",new Ft(o,3));let a=n.toNonIndexed();a.computeVertexNormals();let c=new ie({vertexColors:!0,gradientMap:ce()}),l=new J(a,c);l.castShadow=!0,l.receiveShadow=!0,t.add(l);let h=xr(),u=Mi(t,8.92,16777215,0,.04,0,{matOpts:{map:h,color:16777215},receive:!0,cast:!1}),d=new J(new Dn(8.86,9.05,80),Ut(x.stoneLight));d.rotation.x=-Math.PI/2,d.position.y=.06,d.receiveShadow=!0,t.add(d),Z(t,9.02,8.96,.24,x.stone,0,-.07,0,{segments:80,open:!0});for(let f=0;f<14;f++){let g=P(0,Math.PI*2),p=P(5.6,8.5),_=Math.cos(g)*p,m=Math.sin(g)*p;ia(t,new Xe(P(.4,1.2),12),Ut(x.grassDeep,{transparent:!0,opacity:.55}),[_,.055,m],{rot:[-Math.PI/2,0,P(0,6)],cast:!1,receive:!1}).scale.set(1,P(.4,.9),1)}return Tx(t),Ax(t),t}function $l(i,t,e,n,s=1){let r=new j;r.position.set(t,n,e),i.add(r),Z(r,.07*s,.1*s,1.45*s,x.iron,0,.72*s,0,{segments:6}),D(r,.42*s,.06*s,.42*s,x.iron,0,1.43*s,0);let o=new j;o.position.y=1.6*s,r.add(o),D(o,.3*s,.38*s,.3*s,16769186,0,0,0,{matOpts:{transparent:!0,opacity:.85,toneMapped:!1},cast:!1}),D(o,.34*s,.04*s,.34*s,x.iron,0,.21*s,0),D(o,.34*s,.04*s,.34*s,x.iron,0,-.21*s,0);for(let a of[-1,1])D(o,.035*s,.4*s,.035*s,x.iron,a*.15*s,0,.15*s),D(o,.035*s,.4*s,.035*s,x.iron,a*.15*s,0,-.15*s);return Ie(o,16761722,2.1*s,0,0,0,.55),r}function Tx(i){for(let f=0;f<13;f++){let g=-.02-(f+1)*.18,p=8.85+f*.36+.36/2,_=g+4.4;D(i,3,_,.36+.025,f%2?x.stoneDim:x.stone,0,g-_/2,p),D(i,3+.06,.035,.36+.07,x.stoneLight,0,g+.018,p,{cast:!1})}let o=Math.atan2(.18,.36);for(let f of[-1,1]){let g=D(i,.34,.82,5.6,x.stone,f*1.68,-1.24,11.1,{rot:[o,0,0]});D(i,.46,.12,5.7,x.stoneLight,f*1.68,-.78,11.1,{rot:[o,0,0]})}let a=8.85+13*.36,c=new j;c.position.set(0,0,0),i.add(c);let l=Ce.platform.x,h=Ce.platform.z+a,u=jt(l+1.95,h+.4)-Ce.platform.y;$l(i,1.95,a+.45,u,1),$l(i,-1.95,a+.45,u,1);let d=D(i,3.6,.28,.9,x.stoneDim,0,jt(l,h+.5)-Ce.platform.y+.02,a+.35);D(i,3.9,.32,.32,x.stoneLight,0,jt(l,h+.5)-Ce.platform.y+.21,a+.78)}function Ax(i){let e=x.stoneLight,n=[];for(let r=-1.36;r<=1.361;r+=.108)Math.abs(r)<.205||n.push(r);for(let r of n){let o=Math.sin(r)*8.34,a=Math.cos(r)*8.34;D(i,.19,.72,.19,e,o,.46,a,{rot:[0,-r,0]}),G(i,.115,x.stone,o,.86,a,{low:!0})}let s=[];for(let r=0;r<n.length-1;r++)n[r+1]-n[r]>.15||s.push([n[r],n[r+1]]);for(let[r,o]of s){let a=(r+o)/2,c=Math.sin(r)*8.34,l=Math.cos(r)*8.34,h=Math.sin(o)*8.34,u=Math.cos(o)*8.34,d=Math.hypot(h-c,u-l),f=Math.sin(a)*8.34,g=Math.cos(a)*8.34;D(i,.16,.09,d,x.stone,f,.8,g,{rot:[0,Math.atan2(h-c,u-l),0]}),D(i,.1,.06,d*.94,x.stoneDim,f,.28,g,{rot:[0,Math.atan2(h-c,u-l),0]})}for(let r of[-1.4,1.4]){let o=Math.sin(r)*8.45,a=Math.cos(r)*8.45;D(i,.52,1.05,.52,x.stone,o,.55,a,{rot:[0,-r,0]}),D(i,.66,.12,.66,x.stoneLight,o,1.09,a,{rot:[0,-r,0]}),G(i,.2,x.stoneLight,o,1.26,a)}for(let r of[-1,1]){let o=r*2.35,a=8.09;Z(i,.34,.26,.5,x.stoneDim,o,.29,a,{segments:10}),D(i,.7,.08,.7,x.stoneLight,o,.54,a);let c=G(i,.42,x.leafDeep,o,1,a,{scale:[1,1.15,1]});G(i,.22,x.leafLight,o+.2,1.18,a+.15,{low:!0});for(let l=0;l<5;l++)G(i,.035,l%2?x.rose:x.butter,o+P(-.3,.3),1.05+P(0,.3),a+P(-.3,.3),{low:!0})}}function vr(i,t,e,n,s,r={}){let o=n-t,a=s-e,c=Math.hypot(o,a),l=(t+n)/2,h=(e+s)/2,u=new j;u.position.set(l,0,h),u.rotation.y=-Math.atan2(a,o),i.add(u);let d=r.height??3;D(u,c,d,.58,x.stone,0,d/2,0),D(u,c,.85,.74,x.stoneDim,0,.43,0),D(u,c+.04,.16,.72,x.stoneLight,0,d-.1,0),D(u,c,.14,.66,x.stoneDim,0,1.7,.01);let f=Math.max(2,Math.floor(c/.92)),g=c/f;for(let p=0;p<f;p++){let _=-c/2+g*(p+.5);D(u,g*.52,.52,.6,p%2?x.stone:x.stoneLight,_,d+.26,0),D(u,g*.6,.08,.7,x.stoneDim,_,d+.54,0)}for(let p=0;p<5&&!(c<4);p++){let _=-c/2+(p+.5)*(c/5);p%2===0&&Rx(u,_,1.72,.34,x.stoneDim,p%4===0?x.roof:x.roofRose).scale.setScalar(.9)}return u}function Rx(i,t,e,n,s,r){let o=new Ge;o.moveTo(-.28,.32),o.lineTo(.28,.32),o.lineTo(.28,.02),o.quadraticCurveTo(.28,-.3,0,-.44),o.quadraticCurveTo(-.28,-.3,-.28,.02),o.closePath();let a=new j;a.position.set(t,e,n),i.add(a);let c=new J(new be(o),Ut(s));c.position.z=.005,a.add(c);let l=new J(new be(o),Ut(r));l.scale.setScalar(.84),l.position.z=.02,a.add(l),G(a,.06,x.gold,0,.03,.05,{low:!0});for(let h=0;h<5;h++){let u=h/5*Math.PI*2;G(a,.022,x.gold,Math.cos(u)*.14,.03+Math.sin(u)*.14,.045,{low:!0})}return a}function Gs(i,t,e,n,s,r,o,a={}){let c=new j;c.position.set(t,0,e),i.add(c),Z(c,n*1.22,n*1.36,.55,x.stoneDim,0,.275,0,{segments:18}),Z(c,n,n*1.03,s,x.stone,0,.5+s/2,0,{segments:18});for(let f=0;f<5;f++)Z(c,n*1.015,n*1.015,.06,x.stoneDim,0,1.1+f*(s/5.5),0,{segments:18,open:!0,cast:!1});Z(c,n*1.14,n*1.1,.18,x.stoneLight,0,s+.5,0,{segments:18});let l=10;for(let f=0;f<l;f++){let g=f/l*Math.PI*2;D(c,.16,.36,.28,x.stoneDim,Math.cos(g)*n*1.12,s+.35,Math.sin(g)*n*1.12,{rot:[0,-g,0]})}let h=s+.58;kt(c,n*1.36,r,o,0,h+r/2,0,{segments:14}),Z(c,n*1.18,n*1.18,.08,x.stoneDim,0,h+.04,0,{segments:18});let u=h+r+.05;G(c,.11,x.gold,0,u,0),Z(c,.02,.02,.55,x.goldDeep,0,u+.28,0,{segments:5}),sa(c,a.pennantColor??(o===x.roofRose?x.roof:x.roofRose),[0,u+.78,0],P(0,6));let d=a.winY??[s*.45+.5,s*.74+.5];for(let f=0;f<2;f++){let g=(a.winAngle??0)+f*1.35,p=Math.sin(g)*n*.995,_=Math.cos(g)*n*.995;yn(c,.32,.68,[p,d[f%d.length],_],g,{color:16764814,frame:x.stoneDim,bars:!0})}for(let f=0;f<3;f++){let g=(a.winAngle??0)+.7+f*1.7;D(c,.07,.34,.06,3945776,Math.sin(g)*n*1.006,s*.33,Math.cos(g)*n*1.006,{rot:[0,g,0]})}return a.door&&bi(c,.7,1.4,[Math.sin(a.door)*n*.995,.5,Math.cos(a.door)*n*.995],a.door,3550760),c}function Cx(i){let t=new j;t.position.set(0,0,4.4),i.add(t);let e=new Ge;e.moveTo(-2.1,0),e.lineTo(2.1,0),e.lineTo(2.1,4.3),e.lineTo(-2.1,4.3),e.closePath();let n=new Ps;n.moveTo(-.92,0),n.lineTo(-.92,1.6),n.absarc(0,1.6,.92,Math.PI,0,!0),n.lineTo(.92,0),n.closePath(),e.holes.push(n);let s=new Ho(e,{depth:1.15,bevelEnabled:!1,curveSegments:16});s.translate(0,0,-.575);let r=new J(s,Ut(x.stone));r.castShadow=!0,r.receiveShadow=!0,t.add(r),D(t,4.5,.2,1.3,x.stoneLight,0,4.28,0);for(let u=0;u<5;u++){let d=-1.8+u*.9;D(t,.5,.55,.8,u%2?x.stoneLight:x.stone,d,4.62,0),D(t,.58,.08,.86,x.stoneDim,d,4.93,0)}for(let u=0;u<6;u++){let d=-1.85+u*.74;D(t,.18,.26,1.5,x.stoneDim,d,4.05,.02);let f=kt(t,.09,.25,x.stoneDark,d,3.85,.72,{segments:4,rot:[Math.PI,0,0]})}D(t,1.9,.18,1.5,x.stoneLight,0,.09,0);let o=new j;o.position.set(0,0,.1),t.add(o);for(let u=0;u<5;u++){let d=-.7+u*.35;D(o,.055,2.1,.06,x.iron,d,2.35,.52),kt(o,.045,.14,x.iron,d,1.25,.52,{segments:4,rot:[Math.PI,0,0]})}for(let u=0;u<2;u++)D(o,1.55,.06,.06,x.iron,0,1.85+u*.6,.52);let a=Ut(x.woodDark),c=D(t,.86,2,.1,a,-.43,1.05,-.2,{cast:!0});c.rotation.y=-.75;let l=D(t,.86,2,.1,a,.43,1.05,-.2,{cast:!0});l.rotation.y=.75;for(let u of[-1,1])for(let d=0;d<3;d++)G(t,.035,x.iron,u*.72,.55+d*.55,-.02,{low:!0});let h=Si(t,Ei("blue"),.5,1.25,[0,4.15,.95],0,{amp:.035});for(let u of[-1,1]){$l(t,u*1.35,.95,0,.8);let d=new j;d.position.set(u*1.1,2.15,.62),t.add(d),D(d,.06,.55,.06,x.iron,0,0,0),D(d,.16,.24,.16,16765324,0,.32,0,{matOpts:{toneMapped:!1},cast:!1}),Ie(d,16758890,1.1,0,.32,.08,.5)}return Ji(t,.16,15321471,0,3.62,.64,0,{}),t}function Px(i){let t=new j;t.position.set(0,0,-1.4),i.add(t);let e=2.7,n=2.3,s=7.5,r=.45;D(t,e*2+r,.34,n*2+r,x.stoneDim,0,-.03,0),D(t,r,s,n*2,x.stone,-e+r/2,s/2,0),D(t,r,s,n*2,x.stone,e-r/2,s/2,0),D(t,e*2-r*2,s,r,x.stone,0,s/2,-n+r/2),D(t,e*2-r*2,.55,r,x.stone,0,.275,n-r/2),D(t,e*2+.16,.34,n*2+.16,x.stoneLight,0,4.16,0),D(t,e*2+.32,.18,n*2+.32,x.stone,0,3.94,0),D(t,e*2+.24,.3,.24,x.woodDark,0,4.02,n+.06);for(let m=0;m<6;m++){let v=-2.2+m*.88,y=D(t,.16,.34,.3,x.stoneDim,v,3.83,n+.02);kt(t,.1,.28,x.stoneDim,v,3.6,n+.12,{segments:4,rot:[Math.PI,0,0]})}D(t,e*2+.04,.18,n*2+.04,x.stoneLight,0,s-.09,0),D(t,e*2+.2,.2,n*2+.2,x.stoneDim,0,s-.28,0);for(let m=0;m<4;m++){let v=.7+m*1.72;for(let y of[-1,1])D(t,.28,.34,.62,m%2?x.stoneLight:x.stoneDim,y*(e+.03),v,n-.28,{rot:[0,0,0]})}let o=new ie({color:x.stoneDim,gradientMap:ce()});for(let m of[-1,1])D(t,.02,s-.5,.03,x.stoneDim,m*(e-r-.01),(s-.5)/2+.2,.9,{cast:!1});let a=3.35,c=s+.04,l=kt(t,4.25,a,x.roof,0,c+a/2,0,{segments:4,rot:[0,Math.PI/4,0]});l.scale.z=4.25*.92;let h=kt(t,4.26,.05,x.roofDeep,0,c+.05,0,{segments:4,rot:[0,Math.PI/4,0]});h.scale.z=4.26*.92;for(let m=0;m<4;m++){let v=Math.PI/4+m*Math.PI/2,y=D(t,.06,3.4,.06,x.roofDeep,Math.sin(v)*2.1,c+1.62,Math.cos(v)*2.1,{rot:[0,-v,0],cast:!1});y.rotation.z=-.17}let u=c+a;G(t,.14,x.gold,0,u+.05,0),Z(t,.02,.02,.9,x.goldDeep,0,u+.5,0,{segments:5}),sa(t,x.roofRose,[0,u+1,0],0);let d=new j;d.position.set(-3.02,0,.82),t.add(d),D(d,.88,10.6,.9,x.stone,0,5.3,0),D(d,1.03,.18,1.05,x.stoneLight,0,10.58,0),D(d,.7,.25,.7,x.stoneDark,0,10.78,0);let f=new j;f.position.set(2.95,0,1.85),t.add(f),Z(f,1,1.06,9,x.stone,0,4.55,0,{segments:16}),Z(f,1.16,1.1,.2,x.stoneLight,0,9,0,{segments:16});for(let m=0;m<8;m++){let v=m/8*Math.PI*2;D(f,.14,.3,.22,x.stoneDim,Math.cos(v)*1.08,8.86,Math.sin(v)*1.08,{rot:[0,-v,0]})}kt(f,1.3,2.25,x.roofRose,0,11.12,0,{segments:12}),G(f,.09,x.gold,0,12.3,0),sa(f,x.roof,[0,13,0],1.2);for(let m=0;m<3;m++){let v=.2+m*1.6;yn(f,.26,.54,[Math.sin(v)*1,1.8+m*2.15,Math.cos(v)*1],v,{color:16766107,frame:x.stoneDim})}bi(f,.66,1.35,[.35,.25,.92],.25,3813159);let g=new j;g.position.set(0,8.18,1.34),t.add(g),D(g,1.12,1.35,.85,x.stone,0,.1,0),yn(g,.42,.8,[0,.28,.44],0,{color:16766356,frame:x.stoneDim,bars:!0}),D(g,1.4,.1,1.1,x.roofDeep,0,.9,0,{rot:[.42,0,0]}),D(g,1.4,.1,1.1,x.roofDeep,0,.9,.04,{rot:[-.42,0,0]}),kt(g,.78,.7,x.roofDeep,0,1.26,.02,{segments:4});for(let m of[-1,1]){let v=m*(e+.012);yn(t,.55,1.4,[v,1.4,-.55],m*Math.PI/2,{color:16765850,frame:x.stoneDim,bars:!0}),yn(t,.5,1.2,[v,5.1,-.7],m*Math.PI/2,{color:16767396,frame:x.stoneDim,bars:!0}),yn(t,.4,.9,[v,5.2,.8],m*Math.PI/2,{color:16767396,frame:x.stoneDim,bars:!0})}yn(t,.6,1.5,[0,5.3,-n-.012],Math.PI,{color:16765850,frame:x.stoneDim,bars:!0}),bi(t,.72,1.5,[2.45,.2,1.9],-Math.PI/2,3812902);let p=Ei("blue"),_=Ei("rose");Si(t,p,.72,1.55,[-2.735,6.85,.85],-Math.PI/2,{amp:.055}),Si(t,_,.72,1.55,[2.735,6.85,.85],Math.PI/2,{amp:.055}),D(t,.06,.06,.95,x.woodDark,-2.76,6.87,.85),D(t,.06,.06,.95,x.woodDark,2.76,6.87,.85);for(let m=0;m<16;m++){let v=1+m*.4,y=-e-.04,E=-1.7+Math.sin(m*.9)*.65;G(t,P(.08,.17),m%3?x.leaf:x.leafLight,y-Math.sin(m*1.3)*.12,v,E,{low:!0,scale:[.5,.45,.28],cast:!1})}for(let m=0;m<8;m++)G(t,.13,m%2?x.pink:x.butter,-2.9+m*.8,.45,2.5,{low:!0,scale:[1,.7,1]});for(let m=0;m<5;m++){let v=-2.2+m*1.1;D(t,.65,.22,.28,x.woodDark,v,.38,2.44);for(let y=0;y<3;y++)G(t,.06,y%2?x.rose:x.butter,v-.2+y*.2,.56,2.5,{low:!0})}return t}function Ix(i){let t=new j;t.position.set(4.05,0,-2.35),i.add(t);let e=1.95,n=3.15;D(t,e+.35,.35,n+.4,x.stoneDim,0,.175,0),D(t,e,2.6,n,x.stone,0,1.65,0),D(t,e+.15,.14,n+.15,x.stoneLight,0,2.88,0);let s=1.05,r=Math.hypot(e/2+.24,s)+.15,o=Math.atan2(s,e/2+.24);for(let g of[-1,1]){let p=D(t,r,.14,n+.45,x.roof,g*(e/4+.06),3.42,0,{rot:[0,0,-g*o]})}D(t,.16,.16,n+.5,x.roofDeep,0,3.98,0);let a=new Ge;a.moveTo(-e/2,0),a.lineTo(e/2,0),a.lineTo(0,s),a.closePath();let c=new J(new be(a),Ut(x.stone));c.position.set(0,2.86,n/2+.005),c.castShadow=!0,t.add(c);let l=new J(new be(a),Ut(x.stone));l.position.set(0,2.86,-n/2-.005),l.rotation.y=Math.PI,l.castShadow=!0,t.add(l),bi(t,.66,1.35,[0,.35,n/2+.03],0,4930092);let h=new J(new be(yr(.56,1.15,.28),8),new $t({color:16764815,transparent:!0,opacity:.55,toneMapped:!1}));h.position.set(0,.44,n/2+.04),t.add(h),Ie(t,16762500,2.2,0,.9,n/2+.12,.4);let u=new J(new Xe(.42,32),new $t({map:id(),toneMapped:!0}));u.position.set(0,2.22,n/2+.03),t.add(u);let d=new J(new Ee(.45,.055,6,24),Ut(x.stoneDim));d.position.set(0,2.22,n/2+.05),t.add(d),Ie(t,16758671,1.5,0,2.22,n/2+.16,.28);for(let g of[-1,1]){for(let p of[-.95,.35]){let _=new J(new be(yr(.32,.95,.16),10),new $t({color:g>0?12179673:15778229,transparent:!0,opacity:.82,toneMapped:!1,side:Yt}));_.rotation.y=g*Math.PI/2,_.position.set(g*(e/2+.01),1.55,p),t.add(_),D(t,.04,.03,.95,x.iron,g*(e/2+.03),1.55,p,{rot:[0,g*Math.PI/2,0],cast:!1})}for(let p of[-1.15,0,1.15]){D(t,.39,2.2,.28,x.stoneLight,g*(e/2+.14),1.2,p);let _=D(t,.26,.55,.3,x.stoneLight,g*(e/2+.14),2.2,p,{rot:[0,0,g*.5]})}}D(t,.34,.9,.38,x.stoneLight,0,3.85,n/2-.12),D(t,.24,.55,.24,x.woodDark,0,4.37,n/2-.12),kt(t,.19,.23,x.gold,0,4.53,n/2-.12,{segments:8}),D(t,.06,.6,.06,x.goldDeep,0,4.76,n/2-.12),D(t,.36,.06,.06,x.goldDeep,0,4.86,n/2-.12),bi(t,.26,.6,[0,4,n/2+.08],0,4011052);let f=G(t,.1,x.goldDeep,0,4.25,n/2+.02,{scale:[1,1.2,1]});for(let g=0;g<5;g++)G(t,.025,x.white,Dx(-1,1)*.3,.44,n/2+.34,{low:!0});for(let g=0;g<6;g++){let p=g%2?x.lavender:x.white;G(t,.045,p,(g%3-1)*.35+.4,.46,n/2+.4+Math.floor(g/3)*.25,{low:!0}),Z(t,.012,.012,.25,x.leafDeep,(g%3-1)*.35+.4,.32,n/2+.4+Math.floor(g/3)*.25,{segments:4,cast:!1})}return t}function Dx(i,t){return P()>.5?i:t}function ad(i){let t=new j;t.position.set(Ce.platform.x,Ce.platform.y,Ce.platform.z),i.add(t),wx(i);let e=[];vr(t,-5.5,-4.4,5.5,-4.4),vr(t,-5.5,-4.4,-5.5,4.4),vr(t,5.5,4.4,5.5,-4.4),e.push(vr(t,-5.5,4.4,-2.05,4.4)),e.push(vr(t,2.05,4.4,5.5,4.4)),Gs(t,-5.5,-4.4,1.25,4.1,2.5,x.roof,{winAngle:-2.4,door:.9}),Gs(t,5.5,-4.4,1.25,4.1,2.5,x.roofRose,{winAngle:2.4}),Gs(t,-5.5,4.4,1.25,4.3,2.6,x.roofRose,{winAngle:-.6}),Gs(t,5.5,4.4,1.25,4.3,2.6,x.roof,{winAngle:.6}),e.push(Cx(t)),e.push(Gs(t,-2.02,4.4,1.16,5.1,2.35,x.roof,{winAngle:-.5,pennantColor:x.roofRose})),e.push(Gs(t,2.02,4.4,1.16,5.1,2.35,x.roofRose,{winAngle:.5,pennantColor:x.roof}));let n=Px(t),s=Ix(t);for(let o of[-1,1])e.push(Si(t,Ei(o<0?"blue":"rose"),.62,1.5,[o*3.45,3.35,5.28],0,{amp:.05})),e.push(D(t,.72,.05,.05,x.woodDark,o*3.45,3.36,5.3));for(let o of[-1,1]){let a=new j;a.position.set(o*6.85,0,1.1),t.add(a),Z(a,.25,.32,.55,x.stoneDim,0,.27,0,{segments:10}),Z(a,.06,.09,1.05,x.wood,0,1,0,{segments:6}),G(a,.72,x.leaf,0,1.72,0,{scale:[1,.86,1]}),G(a,.45,x.leafLight,.35,1.95,.2,{low:!0}),G(a,.3,x.leafDeep,-.4,1.55,-.25,{low:!0});for(let c=0;c<4;c++)G(a,.07,x.butter,P(-.55,.55),P(1.4,2),P(-.45,.55),{low:!0})}let r=new Te;return r.position.set(-3.02,11,.82),n.add(r),{castle:t,keep:n,chapel:s,platform:i,smokeOrigin:r,frontShell:e}}var De=.16,cd=4.33,ua=-1.84,Ql=-2.25,la=2.25,ha=2.28;function Mr(i,t,e,n,s=1,r={}){let o=new j;o.position.set(t,e,n),i.add(o),Z(o,.05*s,.09*s,.07*s,x.goldDeep,0,.035*s,0,{segments:10}),Z(o,.04*s,.05*s,.05*s,x.gold,0,.09*s,0,{segments:10}),Z(o,.022*s,.028*s,.3*s,16774364,0,.26*s,0,{segments:8,cast:!1});let a=new $t({color:16764794,transparent:!0,opacity:.95,toneMapped:!1}),c=new J(new Ye(.032*s,8,6),a);c.scale.set(1,1.9,1),c.position.y=.44*s,o.add(c);let l=Ie(o,16760938,.45*s,0,.44*s,0,.22),h=P(0,6.28);return te(u=>{let d=.85+Math.sin(u*9+h)*.12+Math.sin(u*23+h*2)*.05;c.scale.set(.9+(d-.85)*.6,1.7*d,.9),a.opacity=.75+.2*d,l.material.opacity=.12+.08*d}),o}function jl(i,t,e,n,s=1){let r=new j;r.position.set(t,e,n),i.add(r);let o=new $t({color:16751946,transparent:!0,opacity:.82,toneMapped:!1,blending:an,depthWrite:!1}),a=new $t({color:16769956,transparent:!0,opacity:.9,toneMapped:!1,blending:an,depthWrite:!1}),c=new J(new pn(.2*s,.75*s,8),o);c.position.y=.25*s,r.add(c);let l=new J(new pn(.11*s,.48*s,7),a);l.position.y=.22*s,r.add(l);let h=Ie(r,16752472,1.5*s,0,.3*s,0,.3),u=P(0,6.28);return te(d=>{let f=.85+Math.sin(d*8+u)*.15+Math.sin(d*19+u)*.06;c.scale.set(.9+f*.1,f,.9+f*.1),l.scale.set(.95,.9+f*.16,.95),h.material.opacity=.2+f*.08,r.rotation.z=Math.sin(d*2.2+u)*.08}),r}function ld(i,t,e,n,s,r=0){let o=new j;o.position.set(s[0],s[1],s[2]),o.rotation.y=r,i.add(o);let a=new ie({map:t,gradientMap:ce(),side:Yt}),c=new J(new Ae(e,n),a);c.castShadow=!0,o.add(c),Z(o,.035,.035,e+.25,x.woodDark,0,n/2+.06,0,{segments:6,rot:[0,0,Math.PI/2]});for(let l of[-1,1])G(o,.06,x.gold,l*(e/2+.13),n/2+.06,0,{low:!0});return o}function th(i,t,e,n,s){let r=new Wo(t,e,n,2);return r.position.set(s[0],s[1],s[2]),i.add(r),r}function Lx(i,t){let n=new j;n.position.set(Ql+.28,0,.82),i.add(n),D(n,.72,3.3,1.85,x.stone,0,1.65,0),D(n,.42,.9,1.65,3878955,.17,.61,0),D(n,.22,1.7,.3,x.stoneLight,.28,.9,-.84),D(n,.22,1.7,.3,x.stoneLight,.28,.9,.84),D(n,.36,.28,2.05,x.stoneLight,.23,1.78,0),D(n,.5,.15,2.2,x.stoneDim,.2,1.96,0),D(n,.3,.1,1.8,x.stoneDark,.2,.2,0);let s=Ut(x.woodDark);for(let a=0;a<3;a++){let c=Z(n,.07,.08,.85,s,.32,.27+a*.02,-.3+a*.3,{segments:6,rot:[Math.PI/2,0,.25]})}jl(n,.38,.27,.05,1.05),jl(n,.38,.27,-.35,.7),jl(n,.38,.27,.38,.65);let r=th(n,16752990,3.2,7,[.7,1.1,0]);t.push(r);let o=[[-.6,"candle"],[0,"ship"],[.68,"vase"]];for(let[a,c]of o){if(c==="candle"&&Mr(n,.3,2.05,a,.8),c==="ship"){D(n,.25,.05,.32,x.wood,.32,2.08,a),Z(n,.015,.02,.42,x.woodDark,.32,2.3,a,{segments:5});let l=new J(new Ae(.22,.28),new $t({color:16774884,side:Yt}));l.position.set(.32,2.3,a+.06),n.add(l)}if(c==="vase"){Z(n,.06,.09,.2,x.lavender,.32,2.13,a,{segments:8});for(let l=0;l<3;l++)G(n,.04,x.rose,.32+P(-.08,.08),2.3+P(0,.1),a+P(-.08,.08),{low:!0})}}return D(n,.2,.12,.5,x.stoneLight,.32,.09,0),n}function Ux(i){let t=new j;t.position.set(-.1,De,-.1),i.add(t);let e=.78;D(t,3.4,.12,1,x.woodDark,0,e,0),D(t,3.5,.025,1.08,16775142,0,e+.07,0),D(t,3.54,.02,.05,x.gold,0,e+.08,.51,{cast:!1}),D(t,3.54,.02,.05,x.gold,0,e+.08,-.51,{cast:!1});for(let a of[-1,1])for(let c of[-1,1])D(t,.14,e,.14,x.woodDark,a*1.5,e/2,c*.38);for(let a of[-1,1]){D(t,3.1,.09,.3,x.wood,0,.48,a*.82);for(let c of[-1.25,0,1.25])D(t,.1,.48,.22,x.woodDark,c,.24,a*.82)}let n=e+.1;for(let a of[-1.15,.35]){let c=new j;c.position.set(a,n,-.12),t.add(c),Z(c,.08,.12,.04,x.goldDeep,0,.02,0,{segments:10}),Z(c,.025,.035,.24,x.gold,0,.16,0,{segments:8});for(let l of[0,2.1,4.2])Mr(c,Math.cos(l)*.15,.28,Math.sin(l)*.15,.7)}let s=[[-.55,.3],[.72,.3],[-.38,-.32],[.88,-.3]];for(let[a,c]of s){Z(t,.18,.16,.025,16181197,a,n+.02,c,{segments:16});let l=G(t,.075,P()>.5?14394476:15184037,a,n+.08,c,{scale:[1.25,.55,1],low:!0});Z(t,.025,.035,.15,x.gold,a+.26,n+.08,c-.08,{segments:8});let h=Z(t,.03,.024,.06,10111572,a+.26,n+.13,c-.08,{segments:8})}Z(t,.26,.22,.09,x.woodLight,0,n+.05,.05,{segments:14});for(let a=0;a<5;a++)G(t,.075,[14264157,13208145,14727277][a%3],P(-.14,.14),n+.13,.05+P(-.12,.12),{low:!0,scale:[1,.7,1]});let r=D(t,.4,.04,.3,8030878,1.1,n+.04,.18);r.rotation.y=.3,D(t,.36,.02,.27,16775143,1.1,n+.065,.18,{rot:[0,.3,0]});let o=new J(new Ae(.65,.45),new $t({color:15390383,side:Yt}));o.rotation.x=-Math.PI/2,o.rotation.z=-.2,o.position.set(-.15,n+.033,.13),t.add(o);for(let a=0;a<7;a++){let c=new $(P(-.28,.28),P(-.17,.17));D(t,.02,.002,.02,9136725,c.x,n+.035,.13+c.y,{cast:!1})}return t}function Nx(i){let t=new j;t.position.set(.15,0,-1.18),i.add(t),D(t,2.7,.16,1.15,x.stoneDim,0,De+.08,0),D(t,2.35,.16,.9,x.stoneLight,0,De+.24,-.09),D(t,2,.16,.68,x.stoneDim,0,De+.4,-.2);let e=De+.48,n=e+.48;D(t,1.15,.45,1,x.woodDark,0,e+.225,-.15),D(t,1.1,.1,.92,10248036,0,n+.03,.02),D(t,1.1,1.65,.16,x.woodDark,0,e+1.12,-.66),D(t,.94,1.25,.09,11890290,0,e+1.13,-.56);for(let r=0;r<18;r++)G(t,.06,x.gold,-.45+r%6*.18,e+1.7-Math.floor(r/6)*.1,-.51,{low:!0,scale:[1,1,.3]});for(let r of[-1,1]){D(t,.14,.5,.75,x.woodDark,r*.55,n+.25,.06),G(t,.09,x.gold,r*.55,n+.55,.4,{low:!0});let o=Z(t,.035,.045,2.1,x.woodDark,r*.72,e+1.05,-.62,{segments:6});G(t,.08,x.gold,r*.72,e+2.1,-.72,{low:!0})}D(t,1.55,.09,.4,x.woodDark,0,e+2.1,-.62);let s=new J(new Ae(1.35,1,8,4),new ie({color:11825270,side:Yt,gradientMap:ce()}));return s.position.set(0,e+1.65,-.55),t.add(s),D(t,1.5,.04,.06,x.gold,0,e+2.14,-.62,{cast:!1}),t}function Ox(i,t){let e=new j;e.position.set(0,3.9,-.15),i.add(e);let n=new j;e.add(n),Z(n,.012,.012,.5,x.iron,0,-.25,0,{segments:5});let s=new J(new Ee(.62,.028,6,28),Ut(x.iron));s.rotation.x=Math.PI/2,s.position.y=-.62,n.add(s);let r=new J(new Ee(.36,.018,5,22),Ut(x.iron));r.rotation.x=Math.PI/2,r.position.y=-.52,n.add(r);for(let a=0;a<6;a++){let c=a/6*Math.PI*2,l=Math.cos(c)*.62,h=Math.sin(c)*.62;Z(n,.015,.015,.22,x.iron,l,-.5,h,{segments:5}),Mr(n,l,-.64,h,.62),Z(n,.015,.015,.3,x.iron,Math.cos(c)*.49,-.48,Math.sin(c)*.49,{segments:5,rot:[Math.sin(c)*.7,0,Math.cos(c)*.7]})}Ie(n,16762749,2.1,0,-.55,0,.16);let o=th(n,16760445,2.2,6.5,[0,-.6,0]);return t.push(o),te(a=>{n.rotation.z=Math.sin(a*.55)*.025,n.rotation.x=Math.cos(a*.42)*.02,o.intensity=2+Math.sin(a*7.3)*.25+Math.sin(a*13.1)*.12}),e}function Fx(i){let t=new j;t.position.set(-1.85,De,-1.5),t.rotation.y=.4,i.add(t),D(t,.5,.1,.35,x.woodDark,0,.05,0);let e=new ke([new C(0,.1,0),new C(-.05,.75,.05),new C(.05,1.3,.03),new C(.45,1.5,0),new C(.55,1.2,-.02)]),n=new J(new xn(e,24,.03,5,!1),Ut(x.goldDeep));n.castShadow=!0,t.add(n);for(let s=0;s<7;s++){let r=.07+s*.06;Z(t,.0035,.0035,1.15-s*.025,16774103,r,.72+s*.02,.02,{segments:3,cast:!1})}return t}function Bx(i,t){let e=new j;e.position.y=cd,i.add(e);let n=new J(new Xe(1.65,36),new ie({map:Jl("blue"),gradientMap:ce()}));n.rotation.x=-Math.PI/2,n.rotation.z=.3,n.scale.set(1.15,.8,1),n.position.set(-.3,.012,.55),n.receiveShadow=!0,e.add(n);let s=new j;s.position.set(-1.25,0,-.65),e.add(s),D(s,1.7,.32,2.2,x.woodDark,0,.26,0),D(s,1.55,.25,2,16773598,0,.48,0),D(s,1.6,.1,1.55,11958914,0,.62,.22),D(s,1.58,.07,.5,15321515,0,.66,-.65);for(let T of[-1,1])D(s,.6,.16,.34,x.cream,T*.4,.68,-.85,{rot:[.1,0,0]});for(let T of[-1,1])for(let A of[-1,1])Z(s,.045,.06,2.05,x.woodDark,T*.8,1.03,A*1.02,{segments:6}),G(s,.075,x.gold,T*.8,2.07,A*1.02,{low:!0});D(s,1.75,.1,2.25,x.woodDark,0,2.03,0),D(s,1.5,.08,2,x.rose,0,2.11,0);for(let T of[-1,1]){let A=new J(new Ae(.5,1.5,5,6),new ie({color:15186099,side:Yt,transparent:!0,opacity:.82,gradientMap:ce()}));A.position.set(T*.82,1.32,.95),A.rotation.y=T*.25,s.add(A)}D(s,1.68,.22,.05,12157575,0,1.88,1.06),D(s,1.72,.035,.06,x.gold,0,1.75,1.07,{cast:!1});for(let T=0;T<7;T++)G(s,.045,x.gold,-.72+T*.24,1.73,1.09,{low:!0,scale:[1,1.4,.5]});let r=new j;r.position.set(-1.25,0,.75),e.add(r),D(r,.5,.55,.45,x.wood,0,.26,0),D(r,.54,.05,.49,x.woodLight,0,.54,0),Mr(r,0,.57,0,.75);let o=D(r,.2,.03,.28,8943500,.12,.58,.05),a=Z(r,.025,.035,.12,14084324,-.12,.61,.03,{segments:8,cast:!1}),c=new j;c.position.set(1.55,0,-1.52),c.rotation.y=-.45,e.add(c),D(c,1.1,.07,.65,x.wood,0,.74,0);for(let T of[-1,1])D(c,.07,.7,.55,x.woodDark,T*.47,.36,0);D(c,.35,.04,.25,10134706,.1,.8,0);let l=D(c,.36,.005,.27,16775144,.08,.83,.02,{rot:[0,.15,0]});Z(c,.008,.008,.3,x.woodDark,.2,.98,.05,{segments:4,rot:[0,0,-.4]}),G(c,.025,x.cream,.26,1.1,.05,{low:!0}),Mr(c,-.3,.78,.08,.8);let h=new j;h.position.set(1.25,0,-.65),h.rotation.y=-.35,e.add(h),D(h,.5,.08,.5,x.wood,0,.45,0),D(h,.5,.7,.08,x.woodDark,0,.82,-.24);for(let T of[-1,1])for(let A of[-1,1])D(h,.05,.44,.05,x.woodDark,T*.2,.22,A*.2);let u=new j;u.position.set(2.18,0,-.7),u.rotation.y=-Math.PI/2,e.add(u),D(u,1.4,2.1,.34,x.woodDark,0,1.05,0);for(let T=0;T<4;T++){D(u,1.25,.04,.28,x.wood,0,.4+T*.48,.02);let A=-.56;for(;A<.55;){let U=P(.05,.12),k=P(.22,.36),M=[9281438,11898250,12626556,9210021,10990988,12886171];D(u,U,k,.2,M[Math.floor(P(0,M.length))],A+U/2,.42+T*.48+k/2,.04),A+=U+.015}}let d=new j;d.position.set(1.45,0,.82),e.add(d),Z(d,.06,.09,.5,x.woodDark,0,.25,0,{segments:8}),G(d,.24,10467003,0,.63,0,{low:!0});let f=new J(new Ee(.29,.01,4,24),Ut(x.goldDeep));f.rotation.x=.5,f.position.y=.63,d.add(f);let g=new j;g.position.set(-1.55,0,1.2),g.rotation.y=-.3,e.add(g);for(let T=0;T<3;T++){let A=T/3*Math.PI*2;Z(g,.02,.025,.9,x.woodDark,Math.cos(A)*.2,.4,Math.sin(A)*.2,{segments:5,rot:[Math.sin(A)*.25,0,-Math.cos(A)*.25]})}let p=new j;p.position.y=.9,p.rotation.x=-.55,p.rotation.y=.3,g.add(p),Z(p,.07,.1,.9,x.goldDeep,0,0,0,{segments:10,rot:[Math.PI/2,0,0]}),Z(p,.09,.07,.25,x.gold,0,0,.52,{segments:10,rot:[Math.PI/2,0,0]});let _=new J(new Xe(.085,16),new $t({color:12575464,transparent:!0,opacity:.6}));_.position.z=.65,p.add(_);let m=D(e,.8,.5,.5,x.wood,.7,.25,1.75);D(e,.84,.06,.54,x.woodDark,.7,.52,1.75),D(e,.86,.08,.1,x.goldDeep,.7,.38,1.72);for(let T of[-1,1]){let A=ha-.02;D(e,.05,.9,.05,x.woodDark,T*2.14,.45,A),G(e,.06,x.gold,T*2.14,.94,A,{low:!0})}D(e,4.28,.05,.05,x.woodDark,0,.87,ha-.02),D(e,4.28,.04,.04,x.woodDark,0,.46,ha-.02);for(let T=-4;T<=4;T++)D(e,.035,.45,.035,x.woodDark,T*.5,.66,ha-.02);let v=new j;v.position.set(-1,2.75,.4),e.add(v),Z(v,.012,.012,.7,x.iron,0,.35,0,{segments:4});let y=[x.butter,x.rose,x.water];for(let T=0;T<6;T++){let A=T/6*Math.PI*2,U=Math.cos(A)*.55,k=Math.sin(A)*.55;Z(v,.004,.004,.5,x.iron,U,.05,k,{segments:3,cast:!1});let M=Ji(v,.09,y[T%3],U,-.18,k,0,{});M.rotation.y=A,M.castShadow=!0}te(T=>{v.rotation.y=T*.12,v.rotation.z=Math.sin(T*.4)*.05}),yn(i,.5,1.25,[.55,cd+1.3,ua-.008],0,{color:16768944,frame:x.stoneDim,bars:!0});let E=th(e,16764824,1.2,5,[.5,2.2,.4]);t.push(E);let L=Hx();return L.position.set(-1.25,.72,-.4),L.rotation.y=.7,e.add(L),e}function Hx(){let i=new j,t=G(i,.22,10195851,0,.13,0,{scale:[1.3,.65,.9]}),e=G(i,.13,10195851,.22,.18,.08,{low:!0});kt(i,.05,.1,9077370,.2,.28,.06,{segments:4}),kt(i,.05,.1,9077370,.29,.28,.1,{segments:4});let n=new J(new Ee(.22,.035,5,16,Math.PI*1.3),Ut(10195851));return n.rotation.x=-Math.PI/2,n.rotation.z=-.4,n.position.set(-.2,.06,-.02),i.add(n),i}function hd(i){let t=[],e=new J(new Ae(4.44,4.08),new ie({map:xr(),gradientMap:ce(),color:16773599}));e.material.map=xr(),e.material.map.repeat.set(2,1.8),e.material.needsUpdate=!0,e.rotation.x=-Math.PI/2,e.position.set(0,De+.012,.2),e.receiveShadow=!0,i.add(e);let n=new J(new Xe(2.2,40),new ie({map:Jl("rose"),gradientMap:ce()}));n.rotation.x=-Math.PI/2,n.scale.set(1.05,.72,1),n.position.set(-.15,De+.022,-.15),n.receiveShadow=!0,i.add(n);let s=Ut(15259325);D(i,.16,1.4,4.2,x.wood,Ql+.12,De+.7,.1,{cast:!1}),D(i,.16,1.4,4.2,x.wood,la-.12,De+.7,.1,{cast:!1}),D(i,4.7,1.4,.16,x.wood,0,De+.7,ua+.12,{cast:!1});for(let v of[-1,1]){D(i,.2,.2,4.15,x.woodDark,v*2.37,De+1.42,.18,{cast:!1});for(let y=0;y<5;y++)D(i,.06,1.15,.06,x.woodDark,v*2.36,De+.76,-1.7+y*.85,{cast:!1})}for(let v of[-1.1,.1,1.3])D(i,4.62,.16,.2,x.woodDark,0,3.91,v,{cast:!1});D(i,4.62,.16,.23,x.woodDark,0,3.91,2.05,{cast:!1}),yn(i,.5,1.25,[Ql+.02,1.1,-.55],Math.PI/2,{color:16766619,frame:x.stoneDim,bars:!0,glow:!1}),yn(i,.55,1.35,[la-.02,1.1,-.55],-Math.PI/2,{color:16766619,frame:x.stoneDim,bars:!0,glow:!1});let r=bi(i,.7,1.5,[la-.02,De,1.5],-Math.PI/2,4863784),o=new J(new Ae(.35,1.05),new $t({color:16766363,transparent:!0,opacity:.32,toneMapped:!1}));o.rotation.y=-Math.PI/2,o.position.set(la-.04,De+.7,1.5),i.add(o),Lx(i,t),Ux(i),Nx(i),Ox(i,t),Fx(i),ld(i,Kl(0),1.15,1.85,[-1.45,2.45,ua+.01],0),ld(i,Kl(1),1.2,1.9,[1.55,2.4,ua+.01],0);let a=new j;a.position.set(2.1,De,.9),a.rotation.y=-.25,i.add(a),D(a,.45,.08,.45,x.woodDark,0,.04,0),Z(a,.045,.055,.7,x.woodDark,0,.4,0,{segments:6}),Z(a,.18,.24,.55,11911626,0,.95,0,{segments:12}),G(a,.075,11911626,-.24,1.16,0,{low:!0}),G(a,.075,11911626,.24,1.16,0,{low:!0});let c=G(a,.17,11911626,0,1.4,0,{scale:[1,1.1,1]});D(a,.24,.05,.18,3881271,0,1.38,.1),kt(a,.045,.2,x.roofRose,0,1.6,0,{segments:6});let l=Ji(a,.13,x.gold,0,1.02,.24,0,{}),h=Z(a,.015,.015,1.75,x.wood,.36,.95,.08,{segments:5});kt(a,.04,.2,x.stoneLight,.36,1.92,.08,{segments:6});let u=new j;u.position.set(1.9,De,-1.58),i.add(u),D(u,.9,1,.5,x.wood,0,.5,0),D(u,.95,.06,.56,x.woodLight,0,1.02,0);for(let v=0;v<2;v++)D(u,.35,.7,.03,x.woodDark,-.22+v*.44,.5,.26),G(u,.035,x.gold,-.22+v*.44,.5,.29,{low:!0});Z(u,.09,.07,.25,x.lavender,-.3,1.17,0,{segments:8});for(let v=0;v<4;v++)G(u,.04,x.lavender,-.3+P(-.08,.08),1.3+P(0,.1),P(-.08,.08),{low:!0});D(u,.3,.04,.22,9136725,.25,1.07,.05);let d=D(i,.36,.08,.36,x.wood,-.4,De+.38,1.3);for(let v of[-1,1])for(let y of[-1,1])D(i,.045,.38,.045,x.woodDark,-.4+v*.13,De+.19,1.3+y*.13);let f=new j;f.position.set(-2.05,De,1.9),i.add(f),Z(f,.18,.13,.3,12160887,0,.15,0,{segments:10});for(let v=0;v<5;v++){let y=G(f,.16,v%2?x.leaf:x.leafLight,P(-.1,.1),.38+P(0,.25),P(-.1,.1),{scale:[.5,1.1,.35],rot:[P(-.5,.5),P(0,2),P(-.4,.4)]})}let g=new j;g.position.set(-1.75,De,1.55),g.rotation.y=.9,i.add(g),G(g,.28,13215619,0,.2,0,{scale:[1.35,.65,.85]}),G(g,.15,13215619,-.34,.29,.05,{low:!0}),G(g,.08,13215619,-.48,.22,.05,{low:!0,scale:[1.4,.7,.8]});for(let v of[-1,1])kt(g,.05,.12,9136725,-.32,.36,.13+v*.1,{segments:4});let p=new J(new Ee(.18,.04,5,12,Math.PI),Ut(13215619));p.rotation.x=-Math.PI/2,p.position.set(.3,.15,.05),g.add(p);let _=G(g,.035,3879211,-.57,.25,.05,{low:!0});Bx(i,t);let m=new J(new Ae(5.2,4.4),new ie({color:7824212,gradientMap:ce()}));return m.rotation.x=Math.PI/2,m.position.set(0,7.35,.05),i.add(m),{lights:t}}function eh(i,t,e,n,s=1){let r=new j;r.position.set(t,e,n),i.add(r),Z(r,.07*s,.1*s,1.45*s,x.iron,0,.72*s,0,{segments:6}),D(r,.42*s,.06*s,.42*s,x.iron,0,1.43*s,0);let o=new j;o.position.y=1.6*s,r.add(o),D(o,.3*s,.38*s,.3*s,16769186,0,0,0,{matOpts:{transparent:!0,opacity:.85,toneMapped:!1},cast:!1}),D(o,.34*s,.04*s,.34*s,x.iron,0,.21*s,0),D(o,.34*s,.04*s,.34*s,x.iron,0,-.21*s,0);for(let a of[-1,1])D(o,.035*s,.4*s,.035*s,x.iron,a*.15*s,0,.15*s),D(o,.035*s,.4*s,.035*s,x.iron,a*.15*s,0,-.15*s);return Ie(o,16761722,2.2*s,0,0,0,.5),r}function nh(i,t,e){let n=new Vi({color:8964051,transparent:!0,opacity:.8,roughness:.12,metalness:0,clearcoat:1,clearcoatRoughness:.18}),s=new J(new Xe(t,32),n);return s.rotation.x=-Math.PI/2,s.position.y=e,s.receiveShadow=!0,i.add(s),s}function zx(i){let t=new j;t.position.set(1.35,.05,2.45),i.add(t),Z(t,1.02,1.08,.3,x.stoneDim,0,.15,0,{segments:8});let e=new J(new Ee(.98,.14,6,28),Ut(x.stoneLight));e.rotation.x=Math.PI/2,e.position.y=.32,e.castShadow=!0,t.add(e),nh(t,.9,.36),Z(t,.18,.28,.8,x.stone,0,.72,0,{segments:10}),Z(t,.48,.36,.14,x.stoneLight,0,1.13,0,{segments:12}),Z(t,.95,.86,.045,x.stoneDim,0,1.03,0,{segments:24}),Z(t,.13,.16,.4,x.stone,0,1.38,0,{segments:8}),Z(t,.28,.2,.1,x.stoneLight,0,1.62,0,{segments:12}),nh(t,.24,1.68),G(t,.11,x.gold,0,1.79,0),kt(t,.045,.26,x.stoneLight,0,1.9,0,{segments:6});for(let d=0;d<8;d++){let f=d/8*Math.PI*2,g=P(0,3);for(let p=0;p<2;p++){let _=P(.4,.82),m=f+P(-.2,.2);Mi(t,P(.045,.08),p?x.cream:x.rose,Math.cos(m)*_,.375,Math.sin(m)*_,{segments:6,cast:!1,receive:!1})}}let n=new j;t.add(n);let s=44,r=[],o=new Float32Array(s*3);for(let d=0;d<s;d++)r.push({a:P(0,Math.PI*2),off:P(0,1),speed:P(.5,.9)});let a=new ae;a.setAttribute("position",new Oe(o,3));let c=new ti({color:14678523,size:.045,transparent:!0,opacity:.8,depthWrite:!1,sizeAttenuation:!0,toneMapped:!1}),l=new _i(a,c);n.add(l);let h=[],u=[];for(let d=0;d<3;d++){let f=new $t({color:14284279,transparent:!0,opacity:.25,side:Yt,depthWrite:!1}),g=new J(new Dn(.94,.98,32),f);g.rotation.x=-Math.PI/2,g.position.y=.375,t.add(g),u.push(g),h.push(f)}return te(d=>{let f=a.attributes.position.array;for(let g=0;g<s;g++){let p=r[g],_=(d*p.speed+p.off)%1,m=p.a+_*.35,v=.12+_*.72;f[g*3]=Math.cos(m)*v,f[g*3+1]=1.63+Math.sin(_*Math.PI)*.28-_*1.24,f[g*3+2]=Math.sin(m)*v}a.attributes.position.needsUpdate=!0;for(let g=0;g<3;g++){let p=(d*.24+g/3)%1;u[g].scale.setScalar(.35+p*.9),h[g].opacity=(1-p)*.2}}),Ie(t,13169396,2.2,0,1,0,.22),t}function kx(i){let t=new j;t.position.set(-3.55,0,2.65),i.add(t);let e=new J(new In(.62,.68,.8,14,1,!0),new ie({color:x.stoneDim,gradientMap:ce(),side:Yt}));e.position.y=.4,e.castShadow=!0,e.receiveShadow=!0,t.add(e);let n=new J(new Ee(.61,.09,6,20),Ut(x.stoneLight));n.rotation.x=Math.PI/2,n.position.y=.8,t.add(n),Mi(t,.56,3561310,0,.58,0,{cast:!1});for(let r of[-1,1])D(t,.1,1.7,.1,x.woodDark,r*.65,1.35,0);D(t,1.6,.1,.12,x.woodDark,0,2.17,0);let s=kt(t,1.15,.65,x.roofRose,0,2.5,0,{segments:4,rot:[0,Math.PI/4,0]});return s.scale.z=.5,Z(t,.06,.06,.95,x.wood,0,1.72,0,{segments:6,rot:[0,0,Math.PI/2]}),Z(t,.012,.012,.9,x.wood,.15,1.3,0,{segments:4,cast:!1}),Z(t,.13,.1,.2,x.woodLight,.15,.9,0,{segments:8}),Z(t,.045,.045,.22,x.iron,.65,1.85,.08,{segments:6,rot:[Math.PI/2,0,0]}),D(t,.35,.05,.05,x.iron,.8,1.85,.08),t}function Gx(i){let t=new j;i.add(t);let e=new C(2.3,2.6,1),n=new C(5.25,2.6,2.8),s=new C((e.x+n.x)/2,2.35,(e.z+n.z)/2),r=new ke([e,s,n]),o=new J(new xn(r,16,.012,4,!1),Ut(14142905));t.add(o);let a=[{t:.24,w:.55,h:.7,color:16049874,rot:.1},{t:.45,w:.42,h:.55,color:12177118,rot:-.05},{t:.66,w:.6,h:.62,color:15783891,rot:.08}];for(let c of a){let l=r.getPoint(c.t),h=new Ae(c.w,c.h,4,6);h.translate(0,-c.h/2,0);let u=new ie({color:c.color,gradientMap:ce(),side:Yt}),d=new J(h,u);d.position.copy(l),d.rotation.y=.6+c.rot,d.castShadow=!0,t.add(d);let f=h.attributes.position.array.slice(),g=P(0,6);te(p=>{let _=h.attributes.position.array;for(let m=0;m<_.length;m+=3){let v=f[m+1];_[m+2]=Math.sin(p*1.8+g+v*4)*.035*Math.min(1,-v/c.h+.2)}h.attributes.position.needsUpdate=!0});for(let p of[-1,1])D(t,.015,.05,.015,x.woodDark,l.x+p*c.w*.3,l.y+.025,l.z,{cast:!1})}}function Vx(i){let t=new j;i.add(t);let e=Z(t,.34,.34,.55,x.woodLight,-4.55,.28,.35,{segments:12});for(let a of[-.18,.18]){let c=new J(new Ee(.34,.03,5,16),Ut(x.iron));c.rotation.x=Math.PI/2,c.position.set(-4.55,.28+a,.35),t.add(c)}let n=Z(t,.28,.28,.45,x.wood,-4.1,.23,-.25,{segments:12});for(let a of[-.14,.14]){let c=new J(new Ee(.28,.025,5,14),Ut(x.iron));c.rotation.x=Math.PI/2,c.position.set(-4.1,.23+a,-.25),t.add(c)}let s=D(t,.7,.7,.7,x.woodLight,4.2,.35,1.2);for(let a of[-1,1])D(t,.75,.08,.06,x.woodDark,4.2,.35+a*.28,1.56),D(t,.06,.08,.75,x.woodDark,4.2+a*.32,.35,1.2);D(t,.55,.55,.55,x.wood,4.35,.28,.5);let r=G(t,.32,14272424,4,.32,2,{scale:[1,.8,.8]});G(t,.25,13943458,4.35,.26,2.15,{scale:[1,.8,.8]});for(let[a,c]of[[-4.7,1.4],[-4.1,1.5],[4.9,2.9]])G(t,.14,12034428,a,.16,c,{scale:[1.2,.8,1],low:!0});eh(t,-2.5,.05,3.35,1),eh(t,3.55,.05,3.35,1),eh(t,4.85,.05,-.9,.9),D(t,1.7,.1,.42,x.wood,-4.35,.5,-2.1),D(t,.4,.5,.36,x.stoneDim,-5.05,.25,-2.1),D(t,.4,.5,.36,x.stoneDim,-3.65,.25,-2.1);let o=Si(t,Ei("rose"),.52,1.2,[5.18,2.6,3.1],-Math.PI/2,{amp:.04});D(t,.04,.04,.55,x.woodDark,5.18,2.61,3.1);for(let a=0;a<3;a++){let c=3.4+a*.62;G(t,.13,a%2?x.leaf:x.leafLight,c,.16,3.55,{low:!0}),G(t,.05,x.rose,c+.05,.26,3.6,{low:!0})}return t}function Wx(i){let t=new j;i.add(t);let e=.02,n=Mi(t,2.55,x.stoneDim,0,e+.005,5.7,{segments:40,cast:!1}),s=new J(new Dn(2.32,2.48,48),Ut(x.stoneLight));s.rotation.x=-Math.PI/2,s.position.set(0,e+.02,5.7),t.add(s);let r=new J(new Dn(1.42,1.48,48),Ut(x.stoneLight));r.rotation.x=-Math.PI/2,r.position.set(0,e+.02,5.7),t.add(r);let o=Ji(t,.9,14666151,0,e+.025,5.7,0,{rotZ:0});o.rotation.x=-Math.PI/2,o.rotation.z=.2;for(let d of[-1,1]){let f=new j;f.position.set(d*3,0,7.28),t.add(f),Z(f,.045,.06,4.8,x.woodDark,0,2.4,0,{segments:6}),G(f,.09,x.gold,0,4.84,0);let g=Si(f,Ei(d<0?"blue":"rose"),.62,1.5,[0,4.72,.02],.5,{amp:.04})}let a=new j;a.position.set(3.55,0,6.15),a.rotation.y=-.25,t.add(a),D(a,1.7,.09,.78,x.woodLight,0,.86,0);for(let d of[-1,1])for(let f of[-1,1])D(a,.08,.86,.08,x.woodDark,d*.76,.43,f*.31),Z(a,.04,.05,1.75,x.woodDark,d*.76,1.72,f*.31,{segments:5});for(let d=0;d<5;d++){let f=D(a,.34,.04,1,d%2?x.cream:x.roofRose,-.68+d*.34,2.58,0,{rot:[.13,0,0]})}for(let d of[-1,1])D(a,.02,.55,1,x.cream,d*.86,2.26,0,{rot:[.13,0,0],cast:!1});for(let d=0;d<3;d++){D(a,.46,.3,.36,x.woodLight,-.5+d*.52,1.05,-.02);for(let f=0;f<4;f++){let g=[x.rose,x.butter,x.lavender,x.cream];G(a,.06,g[(d+f)%4],-.5+d*.52+P(-.12,.12),1.25,P(-.08,.08),{low:!0}),Z(a,.01,.01,.22,x.leafDeep,-.5+d*.52,1.13,0,{segments:3,cast:!1})}}Z(a,.11,.13,.25,x.stoneDark,.68,.98,.18,{segments:8});let c=[x.rose,x.butter,x.lavender];for(let d=0;d<6;d++)G(a,.055,c[d%3],.68+P(-.1,.1),1.18,.18+P(-.1,.1),{low:!0});let l=Z(a,.03,.04,1.1,x.wood,.9,2.05,.42,{segments:5}),h=new j;h.position.set(-4.85,0,6.35),h.rotation.y=Math.PI/2,t.add(h),D(h,1.55,.12,.5,x.wood,0,.55,0),D(h,1.55,.55,.1,x.wood,0,.85,-.2,{rot:[-.12,0,0]});for(let d of[-1,1])D(h,.12,.55,.45,x.woodDark,d*.65,.27,0),D(h,.08,.6,.4,x.stoneDim,d*.65,.85,-.22);for(let d of[-1,1]){let f=new j;f.position.set(d*3.55,0,8.25),t.add(f),Z(f,.44,.33,.55,x.stone,0,.275,0,{segments:12}),D(f,.9,.1,.9,x.stoneLight,0,.56,0),G(f,.48,x.leafDeep,0,1.02,0,{scale:[1,1.1,1]}),G(f,.3,x.leaf,.18,1.28,.1,{low:!0}),G(f,.22,x.leafLight,-.25,1.17,-.15,{low:!0});for(let g=0;g<4;g++)G(f,.04,x.rose,P(-.35,.35),P(1.05,1.3),P(-.35,.35),{low:!0})}let u=new j;u.position.set(-6.5,0,4.65),u.rotation.y=.8,t.add(u),D(u,1.1,.18,.65,x.woodLight,0,.55,0);for(let d of[-1,1]){D(u,.06,.35,.65,x.wood,d*.52,.78,0);let f=new J(new Ee(.36,.055,6,16),Ut(x.woodDark));f.position.set(d*.62,.38,.12),f.rotation.y=Math.PI/2,f.castShadow=!0,u.add(f);for(let g=0;g<4;g++){let p=g/4*Math.PI;D(u,.02,.02,.65,x.wood,d*.62,.38,.12,{rot:[p,0,0],cast:!1})}}D(u,.06,.06,1.1,x.wood,.42,.62,.82,{rot:[-.25,0,0]}),D(u,.22,.52,.42,x.woodLight,-.22,.86,.08),D(u,.22,.52,.42,x.wood,.28,.86,-.1);for(let d=0;d<5;d++){let f=-1.1+d*.55,g=D(t,.5,.34,.32,x.wood,f,.47,8.6);for(let p=0;p<3;p++)G(t,.05,[x.rose,x.butter,x.lavender][p],f-.15+p*.15,.66,8.6+P(-.06,.06),{low:!0})}return t}function Xx(i){let n=jt(-8.7,3)+.02,s=new j;s.position.set(-8.7,n,3),s.rotation.y=.72,i.add(s),D(s,3,.18,2.1,x.stoneDim,0,.09,0),D(s,3,2.1,.18,x.wood,0,1.05,-1);for(let a of[-1,1])D(s,.18,2.2,2.1,x.wood,a*1.48,1.1,0);for(let a of[-1,1])for(let c of[-1,1])D(s,.16,2.3,.16,x.woodDark,a*1.42,1.15,c*.92);D(s,2.9,.18,.18,x.woodDark,0,2.2,.98);let r=.6;for(let a of[-1,1])D(s,1.8,.12,2.5,x.stoneLight,a*.7,2.58,0,{rot:[0,0,-a*r]});for(let a=0;a<6;a++)D(s,.24,.08,2.45,a%2?x.butter:14204295,-1.35+a*.55,2.35,.02,{rot:[0,0,0]});D(s,.2,.2,2.5,x.woodDark,0,2.95,0),D(s,.5,.5,.8,x.woodLight,-.55,.45,.35),D(s,.5,.45,.8,x.wood,.25,.42,.2);for(let a=0;a<8;a++)D(s,.6,.04,.08,x.butter,P(-1.2,1.2),.18,P(-.7,.85),{rot:[P(-.2,.2),P(0,3),0],cast:!1});let o=D(s,.85,.28,.34,x.woodDark,.95,.28,.3);nh(s,.3,.36).position.set(.95,.36,.3);for(let a=0;a<7;a++){let c=-2.4+a*.7;D(s,.09,.9,.09,x.wood,c,.45,1.55),D(s,.09,.9,.09,x.wood,c,.7,.85),a<6&&(D(s,.7,.08,.07,x.woodLight,c+.35,.62,1.55),D(s,.7,.07,.06,x.woodLight,c+.35,.9,.85))}return s}function ud(i,t){return zx(i),kx(i),Gx(i),Vx(i),Wx(i),Xx(t),{}}function pa(i,t,e=.012){te(n=>{i.rotation.z=Math.sin(n*.5+t)*e,i.rotation.x=Math.cos(n*.37+t*1.7)*e*.6})}function Yx(i,t,e=1,n=!1){let s=new j,r=jt(i,t);s.position.set(i,r,t),Z(s,.1*e,.17*e,1.45*e,x.wood,0,.72*e,0,{segments:7});let o=Z(s,.05*e,.08*e,.8*e,x.wood,.25*e,1.35*e,.08,{segments:5,rot:[0,0,-.5]}),a=[[0,2.05,0,1,x.leaf],[.62,1.82,.18,.66,x.leafLight],[-.55,1.94,.15,.62,x.leafDeep],[.08,2.3,-.4,.58,x.leafLight],[-.25,1.65,.5,.48,x.leaf]];for(let[c,l,h,u,d]of a)G(s,u*e,d,c*e,l*e,h*e,{low:!0,scale:[1.1,.9,1]});if(n)for(let c=0;c<7;c++){let l=P(0,6.28),h=P(.4,1);G(s,.06*e,x.rose,Math.cos(l)*h*e,(1.75+P(0,.5))*e,Math.sin(l)*h*e,{low:!0})}for(let c=0;c<4;c++)G(s,.16*e,c%2?x.leafLight:x.leafDeep,P(-.7,.7)*e,.22*e,P(-.7,.7)*e,{low:!0,scale:[1,.5,1]});return pa(s,P(0,6),.009),s}function qx(i,t,e=1){let n=new j;n.position.set(i,jt(i,t),t),Z(n,.08*e,.14*e,1.2*e,x.woodDark,0,.6*e,0,{segments:6});let s=[[1.15,1.7,1.55,x.leafDeep],[.9,1.4,2.55,x.leaf],[.62,1.1,3.45,x.leafLight]];for(let[r,o,a,c]of s)kt(n,r*e,o*e,c,0,a*e,0,{segments:9});return pa(n,P(0,6),.007),n}function Zx(i,t,e=1){let n=new j;return n.position.set(i,jt(i,t),t),Z(n,.06*e,.12*e,1.3*e,x.woodDark,0,.65*e,0,{segments:6}),G(n,.62*e,x.leafDeep,0,2.55*e,0,{scale:[.72,2,.72]}),G(n,.42*e,x.leaf,.12*e,3.1*e,0,{low:!0,scale:[.8,1.4,.8]}),pa(n,P(0,6),.006),n}function Kx(i,t,e=1){let n=new j;n.position.set(i,jt(i,t),t),Z(n,.06*e,.11*e,1.7*e,15919833,0,.85*e,0,{segments:7});for(let s=0;s<7;s++)D(n,.05*e,.025*e,.12*e,5918792,.08*e,(.3+s*.2)*e,0,{cast:!1});return G(n,.75*e,x.leafLight,0,2.1*e,0,{scale:[1,.85,1]}),G(n,.5*e,x.leaf,.45*e,2.25*e,.2*e,{low:!0}),G(n,.42*e,x.leaf,-.4*e,1.9*e,-.2*e,{low:!0}),pa(n,P(0,6),.01),n}function Jx(i){let t=[[-10.8,-1.4,"round",1.16,!1],[-12.8,.5,"pine",1.1,!1],[-11.5,-3.6,"birch",1,!1],[-13.8,3,"cypress",1.05,!1],[-9.3,-5.7,"pine",.9,!1],[-12.6,-6.2,"round",.92,!1],[-7.9,4.6,"birch",.82,!1],[-6,-12,"pine",1.2,!1],[1.8,-13.4,"cypress",1,!1],[8.5,-12.3,"round",1.15,!1],[-14.6,-1.8,"pine",.92,!1],[10.4,-5.2,"round",.85,!0],[12.4,-2.8,"round",.8,!0],[13.3,1,"birch",.9,!1],[11.7,5.6,"round",.9,!1],[15.8,6.5,"round",1.15,!1],[3,15.8,"cypress",.85,!1],[2,10.5,"birch",.82,!1],[14.2,-8.2,"pine",1,!1],[2.5,13.4,"round",.75,!1],[-4.7,12.2,"round",.9,!1]];for(let[e,n,s,r,o]of t){let a;s==="round"?a=Yx(e,n,r,o):s==="pine"?a=qx(e,n,r):s==="cypress"?a=Zx(e,n,r):a=Kx(e,n,r),i.add(a)}}function $x(i){let t=[[-15.6,1.8,.55],[-7.8,6.4,.35],[-6.4,-8.6,.6],[3.6,12.7,.45],[11.5,8.7,.5],[15.2,-3.5,.7],[-1.8,10.8,.3],[8.9,-8.8,.45],[-14.2,6.3,.4],[5.9,-9.7,.35]];for(let[e,n,s]of t){let r=jt(e,n),o=Zi(i,s,P()>.5?x.rock[1]:x.rock[3],e,r+s*.25,n,{scale:[1.3,.7,1],rot:[P(0,2),P(0,4),P(0,2)]});P()>.4&&G(i,s*.75,x.leafDeep,e+P(-.3,.3),r+s*.55,n+P(-.3,.3),{low:!0,scale:[1,.4,1]})}}function fa(i,t,e,n,s=1,r=x.rose){let o=new j;o.position.set(t,e,n),i.add(o);let a=[r,15703457,13203072];for(let c=0;c<3;c++){let l=5+c*2;for(let h=0;h<l;h++){let u=h/l*Math.PI*2+c*.4,d=(.06+c*.035)*s,f=G(o,(.06-c*.01)*s,a[c%3],Math.cos(u)*d,c*.025*s,Math.sin(u)*d,{low:!0,scale:[1,.55,1.5],rot:[0,-u,.2]})}}return G(o,.05*s,12082280,0,.09*s,0,{low:!0,scale:[1,.8,1]}),o}function da(i,t,e=1,n){let s=new j;s.position.set(i,jt(i,t),t),n.add(s);let r=Ut(x.leafDeep);for(let o=0;o<5;o++){let a=P(0,6.28),c=P(.3,.8),l=Z(s,.012*e,.02*e,P(.5,1)*e,r,0,.3*e,0,{segments:4,rot:[c*Math.cos(a),0,c*Math.sin(a)]}),h=P(.45,.9)*e,u=Math.sin(a)*.25*e,d=Math.cos(a)*.25*e;fa(s,u,h,d,e*P(.8,1.1));for(let f=0;f<2;f++)G(s,.07*e,f?x.leaf:x.leafDeep,u*.7+P(-.1,.1),h*.5+f*.1,d*.7,{low:!0,scale:[.8,.25,1.4],rot:[P(-.5,.5),P(0,3),0]})}return s}function jx(i){let t=Ce.garden.x,e=Ce.garden.z,n=jt(t,e),s=new j;s.position.set(t,n,e),i.add(s);let r=Mi(s,2.15,13615012,0,.015,0,{segments:40,cast:!1}),o=new J(new Dn(2.02,2.28,48),Ut(x.stoneLight));o.rotation.x=-Math.PI/2,o.position.y=.03,o.receiveShadow=!0,s.add(o);for(let y=0;y<26;y++){let E=P(0,Math.PI*2),L=P(2.15,2.4);G(s,P(.06,.12),x.stoneLight,Math.cos(E)*L,.04,Math.sin(E)*L,{low:!0,scale:[1,.4,1]})}let a=Z(s,.45,.55,.52,x.stone,0,.28,0,{segments:12});Z(s,.58,.6,.08,x.stoneLight,0,.56,0,{segments:12}),Z(s,.36,.42,.12,x.stoneDim,0,.64,0,{segments:12});let c=da(0,0,1,s);c.position.y=.64,c.scale.setScalar(.95);let l=Z(c,.02,.03,.55,x.leafDeep,0,.28,0,{segments:5});for(let y=0;y<4;y++)G(c,.1,y%2?x.leaf:x.leafDeep,Math.cos(y*1.7)*.16,.25+y*.1,Math.sin(y*1.7)*.16,{low:!0,scale:[.9,.28,1.2],rot:[0,y*2,.4]});let h=fa(c,0,.76,0,1.8,x.rose);Ie(c,16757421,1.3,0,.78,0,.28);let u=new J(new Ye(.6,24,16,0,Math.PI*2,0,Math.PI*.72),new Vi({color:15332863,transparent:!0,opacity:.18,roughness:.06,metalness:0,clearcoat:1,side:Yt,depthWrite:!1}));u.position.y=1.25,u.castShadow=!1,s.add(u),G(s,.065,x.stoneLight,0,1.79,0,{low:!0});let d=new J(new Ee(.585,.035,6,28),Ut(x.gold));d.rotation.x=Math.PI/2,d.position.y=.87,s.add(d);for(let y=0;y<4;y++){let E=y/4*Math.PI*2+.5;da(Math.cos(E)*1.55,Math.sin(E)*1.55,.7,s)}da(1.3,.2,.55,s),da(-1.15,-.4,.6,s);let f=new j;f.position.set(1.8,0,1.85),f.rotation.y=-2.25,s.add(f),D(f,1.5,.1,.42,x.wood,0,.5,0),D(f,1.5,.55,.08,x.wood,0,.78,-.18,{rot:[-.12,0,0]});for(let y of[-1,1])D(f,.1,.5,.38,x.stoneDim,y*.6,.25,0);let g=new j;g.position.set(-.7,.06,1.4),g.rotation.y=.8,s.add(g),Z(g,.16,.18,.3,10467509,0,.16,0,{segments:10}),Z(g,.03,.045,.42,10467509,.27,.23,0,{segments:6,rot:[0,0,-.9]});let p=new J(new Ee(.13,.02,5,14,Math.PI),Ut(10467509));p.position.set(-.06,.32,0),p.rotation.z=.2,g.add(p);let _=new j;_.position.set(-2.55,0,-.2),_.rotation.y=.9,s.add(_);for(let y of[-1,1]){Z(_,.06,.09,2.2,x.wood,y*1.05,1.1,0,{segments:6});for(let E=0;E<3;E++)G(_,.18,E%2?x.leaf:x.leafLight,y*1.05+P(-.1,.1),.9+E*.35,P(-.1,.1),{low:!0}),E===1&&fa(_,y*1.05,1.2,.12,.7)}let m=new J(new Ee(1.05,.05,6,28,Math.PI),Ut(x.wood));m.position.y=2.2,_.add(m);for(let y=0;y<9;y++){let E=Math.PI+y/8*Math.PI;G(_,.13,y%3?x.leaf:x.leafLight,Math.cos(E)*1.05,2.2+Math.sin(E)*1.05,P(-.08,.08),{low:!0}),y%3===0&&fa(_,Math.cos(E)*1.05,2.2+Math.sin(E)*1.05+.05,.15,.65)}for(let y=0;y<12;y++){let E=P(0,6.28),L=P(2.6,3.6),T=Math.cos(E)*L,A=Math.sin(E)*L;Math.hypot(T-2.55,A+.2)<1.4||G(s,P(.05,.09),[x.rose,x.butter,x.white,x.lavender][y%4],T,.32,A,{low:!0})}let v=[];for(let y=0;y<9;y++){let E=Ie(s,16769960,P(.18,.32),P(-2.8,2.8),P(.8,2.2),P(-2.8,2.8),.55);v.push({sprite:E,phase:P(0,6),baseX:E.position.x,baseZ:E.position.z,baseY:E.position.y})}return te(y=>{for(let E of v)E.sprite.position.x=E.baseX+Math.sin(y*.5+E.phase)*.4,E.sprite.position.z=E.baseZ+Math.cos(y*.4+E.phase)*.4,E.sprite.position.y=E.baseY+Math.sin(y*.7+E.phase*2)*.2,E.sprite.material.opacity=.22+.3*(.5+.5*Math.sin(y*2+E.phase))}),s}function ih(i,t,e=.03,n=80,s=8){let r=new ke(i,!1,"catmullrom",.25),o=[],a=[],c=[];for(let h=0;h<=n;h++){let u=h/n,d=r.getPoint(u),f=r.getTangent(u),g=-f.z,p=f.x,_=Math.hypot(g,p)||1;for(let m of[-1,1]){let v=d.x+g/_*(t/2)*m,y=d.z+p/_*(t/2)*m,E=jt(v,y)+e;o.push(v,E,y),a.push(m*.5+.5,u*s)}if(h<n){let m=h*2;c.push(m,m+1,m+2,m+1,m+3,m+2)}}let l=new ae;return l.setAttribute("position",new Ft(o,3)),l.setAttribute("uv",new Ft(a,2)),l.setIndex(c),l.computeVertexNormals(),l}function Qx(i){let t=[new C(-2,0,8.22),new C(-.3,0,8.9),new C(2.6,0,9.2),new C(4.2,0,9.4)],e=new J(ih(t,1.35,.035,70,1),new ie({color:14206116,gradientMap:ce()}));e.receiveShadow=!0,i.add(e);let n=[new C(-2,0,8.22),new C(-3.8,0,8.5),new C(-5.4,0,9),new C(-6.4,0,8.7)],s=new J(ih(n,.72,.035,40,1),new ie({color:13942687,gradientMap:ce()}));s.receiveShadow=!0,i.add(s);let r=new ke(t),o=new In(1,1,1,7);for(let c=0;c<30;c++){let l=(c+.5)/30,h=r.getPoint(l),u=h.x+P(-.45,.45),d=h.z+P(-.35,.35),f=jt(u,d)+.045,g=P(.28,.5),p=new J(o,Ut(c%3===0?x.stoneLight:x.stoneDim));p.scale.set(g,.045,g*P(.7,1.1)),p.position.set(u,f,d),p.rotation.y=P(0,6),p.receiveShadow=!0,i.add(p)}let a=new ke(n);for(let c=0;c<12;c++){let l=a.getPoint((c+.5)/12),h=l.x+P(-.25,.25),u=l.z+P(-.25,.25),d=new J(o,Ut(x.stoneDim));d.scale.set(P(.24,.36),.04,P(.22,.34)),d.position.set(h,jt(h,u)+.045,u),d.rotation.y=P(0,6),d.receiveShadow=!0,i.add(d)}}function ty(){let i=[],t=[];for(let s=0;s<5;s++){let r=s/5*Math.PI*2,o=Math.cos(r),a=Math.sin(r),c=-Math.sin(r),l=Math.cos(r),h=i.length/3;i.push(0,.015,0,o*.055+c*.05,.035,a*.055+l*.05,o*.14,.05,a*.14,o*.055-c*.05,.035,a*.055-l*.05),t.push(h,h+1,h+2,h,h+2,h+3)}let n=new ae;return n.setAttribute("position",new Ft(i,3)),n.setIndex(t),n.computeVertexNormals(),n}function ey(i){let t=[15906487,16244904,13351394,16774889,15242396,15780275],e=new Te,n=[{x:6.8,z:9.5,r:3.8,n:120,yOff:.05},{x:10.5,z:2,r:4.2,n:80,yOff:.05},{x:-7,z:10.8,r:2.8,n:45,yOff:.05},{x:-11,z:-1,r:4,n:45,yOff:.05},{x:2,z:11.8,r:3.2,n:55,yOff:.05},{x:-3.5,z:-11.5,r:3,n:30,yOff:.05}],s=[];for(let m of n){let v=0;for(;s.length<(m.base??0)+m.n&&v<m.n*8;){v++;let y=P(0,Math.PI*2),E=Math.sqrt(P())*m.r,L=m.x+Math.cos(y)*E,T=m.z+Math.sin(y)*E,A=Math.hypot(L,T),U=Math.hypot(L+2,T+5.5);A>16.8||U<9.8||Math.hypot(L+9.2,T-7.9)<3.6||Math.hypot(L-6.8,T-9.5)<.7||s.push({x:L,z:T,color:t[Math.floor(P(0,t.length))]})}}let r=new In(.011,.015,.32,4),o=ty(),a=new ki(r,Ut(x.leafDeep),s.length);a.castShadow=!1,a.receiveShadow=!0;let c=new ki(o,new ie({color:16777215,gradientMap:ce(),side:Yt}),s.length);c.castShadow=!1,c.receiveShadow=!0;let l=new ki(new Ye(.026,5,3),Ut(15778394),s.length);l.castShadow=!1,l.receiveShadow=!1;let h=new Pt;for(let m=0;m<s.length;m++){let v=s[m],y=jt(v.x,v.z),E=P(.8,1.25);e.position.set(v.x,y+.16*E,v.z),e.rotation.set(P(-.12,.12),P(0,6),P(-.12,.12)),e.scale.set(1,E,1),e.updateMatrix(),a.setMatrixAt(m,e.matrix),e.position.set(v.x,y+.32*E,v.z),e.scale.setScalar(P(.75,1.25)),e.rotation.set(0,P(0,6),0),e.updateMatrix(),c.setMatrixAt(m,e.matrix),c.setColorAt(m,h.setHex(v.color)),e.position.y+=.045,e.scale.setScalar(.75),e.updateMatrix(),l.setMatrixAt(m,e.matrix)}i.add(a),i.add(c),i.add(l),c.instanceColor&&(c.instanceColor.needsUpdate=!0);let u=new pn(.055,.34,4),d=new ie({color:16777215,gradientMap:ce()}),f=650,g=new ki(u,d,f);g.castShadow=!1,g.receiveShadow=!1;let p=0,_=0;for(;p<f&&_<5e3;){_++;let m=P(0,Math.PI*2),v=Math.sqrt(P())*17.4,y=Math.cos(m)*v,E=Math.sin(m)*v;if(Math.hypot(y+2,E+5.5)<9||Math.hypot(y+9.2,E-7.9)<3.4)continue;let L=jt(y,E);e.position.set(y,L+.14,E),e.rotation.set(P(-.1,.1),P(0,6),P(-.1,.1)),e.scale.set(P(.7,1.4),P(.6,1.3),P(.7,1.4)),e.updateMatrix(),g.setMatrixAt(p,e.matrix),g.setColorAt(p,h.setHex([10209169,8894854,11785371,8367750][p%4])),p++}g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0),i.add(g)}function ny(i){let t=[[-11.5,1.4,1],[-10.4,.5,.7],[-12.9,2.2,.85],[-9.2,-3.9,.65],[11.2,-8,.7],[12,-7.4,.55],[4.2,12.4,.6]];for(let[e,n,s]of t){let r=jt(e,n);Z(i,.035*s,.05*s,.18*s,15984595,e,r+.09*s,n,{segments:6});let o=G(i,.16*s,13135986,e,r+.2*s,n,{scale:[1,.5,1],low:!0});for(let a=0;a<3;a++){let c=P(0,6.28);G(i,.022*s,16774113,e+Math.cos(c)*.09*s,r+.25*s,n+Math.sin(c)*.09*s,{low:!0})}}}function iy(i){let t=Ce.pond.x,e=Ce.pond.z,n=jt(t,e),s=new j;s.position.set(t,n,e),i.add(s);let r=new J(new Xe(1,40),Ut(9141352));r.rotation.x=-Math.PI/2,r.scale.set(3.25,2.5,1),r.position.y=.015,r.receiveShadow=!0,s.add(r);let o=new J(new Xe(1,48),new Vi({color:9227226,transparent:!0,opacity:.82,roughness:.08,metalness:.02,clearcoat:1,clearcoatRoughness:.1}));o.rotation.x=-Math.PI/2,o.scale.set(3.05,2.35,1),o.position.y=.11,o.receiveShadow=!0,s.add(o);for(let c=0;c<30;c++){let l=P(0,Math.PI*2),h=3.08+P(-.12,.3),u=2.38+P(-.1,.28),d=Math.cos(l)*h,f=Math.sin(l)*u,g=P(.09,.24);G(s,g,P()>.4?x.stoneDim:x.rock[1],d,.05,f,{low:!0,scale:[1.2,.55,1]})}let a=[];for(let c=0;c<3;c++){let l=new $t({color:14678266,transparent:!0,opacity:.2,depthWrite:!1,side:Yt}),h=new J(new Dn(.96,1,40),l);h.rotation.x=-Math.PI/2,h.position.y=.125,h.scale.set(3.05,2.35,1),s.add(h),a.push({mesh:h,mat:l,phase:c/3})}te(c=>{for(let l of a){let h=(c*.1+l.phase)%1;l.mesh.scale.set(3.05*(.35+h*.65),2.35*(.35+h*.65),1),l.mat.opacity=(1-h)*.18}});for(let c=0;c<7;c++){let l=P(0,Math.PI*2),h=P(.4,.82),u=new J(new Xe(P(.18,.32),12,0,Math.PI*1.85),Ut(c%2?x.leaf:x.leafLight));u.rotation.x=-Math.PI/2,u.rotation.z=P(0,6),u.position.set(Math.cos(l)*h*2.4,.125,Math.sin(l)*h*1.8),s.add(u),c<3&&G(s,.08,x.rose,u.position.x+P(-.08,.08),.2,u.position.z+P(-.08,.08),{low:!0,scale:[1,.7,1]})}for(let c of[.3,1,1.8,4,4.8,5.6]){let h=Math.cos(c)*3.2,u=Math.sin(c)*3.2,d=P(.65,1.15);Z(s,.016,.02,d,x.leafDeep,h,.1+d/2,u,{segments:4,rot:[P(-.1,.1),0,P(-.1,.1)]}),Z(s,.035,.035,.18,9071695,h,.12+d,u,{segments:5});for(let f=0;f<2;f++){let g=D(s,.02,.4,.06,x.leaf,h+.04,.25+f*.18,u,{rot:[0,P(0,3),.4],cast:!1})}}for(let c=0;c<8;c++){let l=P(0,6.28);G(s,P(.06,.1),c%2?x.butter:x.white,Math.cos(l)*P(3.3,3.7),.3,Math.sin(l)*P(2.6,3),{low:!0})}return s}function sy(i){let t=[new C(-11.6,0,8.7),new C(-12.6,0,9),new C(-13.7,0,9.2),new C(-14.7,0,9.35),new C(-15.4,0,9.4)],e=ih(t,1.05,.055,50,6),n=new en({transparent:!0,depthWrite:!1,side:Yt,uniforms:{uTime:{value:0}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        float n = sin(vUv.y * 9.0 - uTime * 1.8 + sin(vUv.x * 12.0) * 1.2) * 0.5 + 0.5;
        float sparkle = smoothstep(0.8, 0.98, sin(vUv.y * 32.0 - uTime * 4.0 + vUv.x * 20.0) * 0.5 + 0.5);
        float edge = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
        vec3 col = mix(vec3(0.44, 0.71, 0.77), vec3(0.8, 0.93, 0.94), n * 0.7 + sparkle * 0.4);
        gl_FragColor = vec4(col, (0.6 + n * 0.25) * edge);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `}),s=new J(e,n);i.add(s),te(_=>{n.uniforms.uTime.value=_});for(let _=0;_<22;_++){let m=(_+.5)/22,v=new ke(t).getPoint(m),y=_%2?1:-1,E=v.x+y*P(.6,.9),L=v.z+P(-.2,.2);G(i,P(.06,.16),_%3?x.stoneDim:x.stoneLight,E,jt(E,L)+.05,L,{low:!0,scale:[1.3,.5,1]})}let r=new C(-15.55,.5,9.42),o=new C(r.x,0,r.z).normalize(),a=Math.atan2(o.x,o.z),c=new j;c.position.copy(r),c.rotation.y=a,i.add(c);for(let _=0;_<4;_++){let m=P(-1.2,1.2);G(c,P(.18,.36),_%2?x.rock[2]:x.rock[0],m,P(-.1,.1),P(-.35,.15),{low:!0,scale:[1.4,.7,1]})}let l=new Ae(1.9,12,10,30);l.translate(0,-6,0);let h=l.attributes.position;for(let _=0;_<h.count;_++){let m=h.getY(_),v=Math.min(1,-m/12);h.setX(_,h.getX(_)*(1+v*.35)+Math.sin(v*8)*.1),h.setZ(_,Math.sin(v*Math.PI)*.45+Math.sin(v*5+.4)*.08)}l.computeVertexNormals();let u=new en({transparent:!0,depthWrite:!1,side:Yt,uniforms:{uTime:{value:0}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec2 vUv;
      uniform float uTime;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
      }
      void main() {
        vec2 p = vUv;
        float flow = p.y * 8.0 + uTime * 1.4;
        float n = noise(vec2(p.x * 7.0, flow));
        float n2 = noise(vec2(p.x * 24.0, flow * 2.3));
        float streak = smoothstep(0.35, 0.8, n);
        float foam = smoothstep(0.62, 1.0, n2) * 0.5;
        float edge = smoothstep(0.0, 0.12, p.x) * smoothstep(1.0, 0.88, p.x);
        float fade = smoothstep(0.0, 0.05, p.y) * (1.0 - smoothstep(0.86, 1.0, p.y) * 0.5);
        vec3 col = mix(vec3(0.65, 0.82, 0.87), vec3(1.0, 0.99, 0.96), streak * 0.7 + foam * 0.4);
        gl_FragColor = vec4(col, (0.4 + streak * 0.35 + foam * 0.2) * edge * fade);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `}),d=new J(l,u);c.add(d),te(_=>{u.uniforms.uTime.value=_});let f=Ie(c,15137791,3.2,0,-.1,.35,.35),g=[[-.6,-7.2,.6,5],[.7,-9,.9,6.5],[0,-10.5,.3,7.5],[-1.2,-5.2,.7,4.2]],p=[];for(let[_,m,v,y]of g){let E=Ie(c,15202555,y,_,m,v,.25);p.push({sprite:E,base:E.position.clone(),phase:P(0,6)})}te(_=>{f.material.opacity=.25+Math.sin(_*2.2)*.05;for(let m of p)m.sprite.position.y=m.base.y+Math.sin(_*.5+m.phase)*.4,m.sprite.material.opacity=.14+.1*(.5+.5*Math.sin(_*.7+m.phase))});for(let _=0;_<5;_++){let m=P(.25,.6);G(i,m,_%2?x.rock[1]:x.stoneDim,-16.2+P(-.6,.6),P(-2.1,-.3),10.1+P(-.5,.5),{low:!0,scale:[1.4,.8,1]})}return{source:r,fall:d}}function ry(i){let t=new j,e=jt(10.8,4.4);t.position.set(10.8,e,4.4),t.rotation.y=-.25,i.add(t);for(let d=0;d<5;d++){let f=-2+d*1;D(t,.1,.95,.1,x.wood,f,.47,0),D(t,.1,.95,.1,x.wood,f,.47,.8),d<4&&(D(t,1,.08,.06,x.woodLight,f+.5,.62,0),D(t,1,.07,.05,x.woodLight,f+.5,.85,0),D(t,1,.08,.06,x.woodLight,f+.5,.62,.8))}let n=new j,s=12.1,r=4.1;n.position.set(s,jt(s,r),r),i.add(n),Z(n,.6,.7,.75,x.butter,0,.37,0,{segments:10}),kt(n,.7,.4,14467460,0,.9,0,{segments:10});for(let d=0;d<12;d++)D(n,.25,.02,.03,13940854,P(-.6,.6),P(.2,.7),P(-.6,.6),{rot:[P(0,2),P(0,3),P(0,2)],cast:!1});let o=new j,a=-12,c=-5.6;o.position.set(a,jt(a,c),c),o.rotation.y=.5,i.add(o);let l=Z(o,.24,.28,2.4,x.wood,0,.25,0,{segments:8,rot:[0,0,Math.PI/2]}),h=Z(o,.275,.275,.04,13215879,1.21,.25,0,{segments:8,rot:[0,0,Math.PI/2]}),u=Z(o,.235,.235,.04,13215879,-1.21,.25,0,{segments:8,rot:[0,0,Math.PI/2]});for(let d=0;d<3;d++)G(o,.16,d%2?x.leafDeep:x.leaf,-.7+d*.7,.46,P(-.1,.1),{low:!0,scale:[1.6,.25,.8]})}function oy(i){let e=new Float32Array(120),n=[];for(let a=0;a<40;a++){let c=P(0,Math.PI*2),l=P(3,9),h=-10,u=5,d=h+Math.cos(c)*l,f=u+Math.sin(c)*l;e[a*3]=d,e[a*3+1]=jt(d,f)+P(.4,2),e[a*3+2]=f,n.push({phase:P(0,6),rx:P(.2,1.2),rz:P(.2,1.2),baseY:e[a*3+1]})}let s=new ae;s.setAttribute("position",new Oe(e,3));let r=new ti({color:16771245,size:.09,transparent:!0,opacity:.75,depthWrite:!1,blending:an,toneMapped:!1}),o=new _i(s,r);i.add(o),te(a=>{let c=s.attributes.position.array;for(let l=0;l<40;l++){let h=n[l];c[l*3]+=Math.sin(a*.3+h.phase)*.002*h.rx,c[l*3+1]=h.baseY+Math.sin(a*.5+h.phase)*.3,c[l*3+2]+=Math.cos(a*.25+h.phase)*.002*h.rz}s.attributes.position.needsUpdate=!0,r.opacity=.45+.3*(.5+.5*Math.sin(a*1.5))})}function dd(i){Jx(i),$x(i),Qx(i),jx(i),ey(i),ny(i),iy(i),sy(i),ry(i),oy(i)}function ay(i){let t=new Ae(.17,1,4,10);t.translate(0,-.5,0);let e=new ie({color:15115164,side:Yt,gradientMap:ce()}),n=new J(t,e);n.position.set(0,1.03,-.1),n.rotation.x=.25,n.rotation.z=.1,n.castShadow=!0,i.add(n);let s=t.attributes.position.array.slice();te(r=>{let o=t.attributes.position.array;for(let a=0;a<o.length;a+=3){let c=s[a+1],l=Math.min(1,-c);o[a+2]=Math.sin(r*2.1+c*4.5)*.16*l+.06*l,o[a]=s[a]+Math.sin(r*1.5+c*3)*.08*l}t.attributes.position.needsUpdate=!0})}function cy(i){let n=jt(7.75,8.6),s=Ki({height:.94,outfit:11124114,accent:x.gold,skin:16243652,hair:x.hairBlond,hairStyle:"halo",pants:7832943});s.position.set(7.75,n,8.6);let r=new C(Ce.garden.x,0,Ce.garden.z);s.rotation.y=Math.atan2(r.x-7.75,r.z-8.6)+.35,i.add(s),ay(s);let o=new J(new be(ra(.05,.022,5)),new $t({color:15914373,side:Yt,toneMapped:!1}));o.position.set(0,.72,.155),s.add(o);let a=new j;return a.position.set(.19,.85,0),i.add(a),s}function ly(i){let n=jt(8.55,9.55),s=new j;s.position.set(8.55,n,9.55),i.add(s);let r=14588513,o=16181204,a=5126962,c=G(s,.28,r,0,.3,0,{scale:[.85,.9,1]}),l=G(s,.24,r,-.12,.22,-.14,{scale:[.95,.9,1]}),h=G(s,.17,o,.07,.32,.2,{scale:[.8,1.05,.5]}),u=new j;u.position.set(.16,.62,.12),s.add(u),G(u,.19,r,0,0,0,{scale:[.9,.95,1]}),G(u,.08,o,.03,-.04,.17,{scale:[1.25,.8,1]}),kt(u,.09,.2,o,.15,-.02,.22,{segments:8,rot:[0,0,-Math.PI/2]}),G(u,.027,a,.25,-.01,.24,{low:!0});for(let p of[-1,1]){kt(u,.08,.22,r,p*.12,.19,-.02,{segments:5,rot:[0,0,p*.2]}),kt(u,.045,.14,o,p*.11,.2,0,{segments:5,rot:[0,0,p*.2]});let _=G(u,.025,a,p*.1,.04,.16,{low:!0})}let d=[];for(let p=0;p<=8;p++){let _=p*.5;d.push(new C(-.2-p*.06,.28+Math.sin(p*.5)*.18+p*.025,-.18-p*.09))}let f=new ke(d),g=new J(new xn(f,18,.115,6,!1),new ie({color:r,gradientMap:ce()}));g.castShadow=!0,s.add(g),G(s,.13,o,d[8].x,d[8].y,d[8].z,{low:!0});for(let p of[-1,1])for(let _ of[-.18,.15])Z(s,.035,.045,.3,a,p*.14,.13,_,{segments:5});return s.rotation.y=Math.atan2(7.75-8.55,8.6-9.55),te(p=>{u.rotation.y=Math.sin(p*.7)*.1}),s}function Er(i,t,e,n,s=1){let r=new j;r.position.set(t,jt(t,e),e),r.rotation.y=n,r.scale.setScalar(s),i.add(r);let o=new ie({color:16183520,gradientMap:ce()}),a=new ie({color:15524560,gradientMap:ce()});G(r,.3,o,0,.35,0,{scale:[1.35,.9,.85]}),G(r,.2,a,-.22,.4,.05,{low:!0}),G(r,.19,o,.22,.38,-.03,{low:!0}),G(r,.17,a,.05,.47,.15,{low:!0});let c=G(r,.12,5063227,.38,.36,.1,{scale:[.9,1,.9]});G(r,.05,5063227,.46,.33,.18,{low:!0,scale:[1,1,.8]});for(let l of[-1,1]){let h=G(r,.08,5326142,.37+P(-.01,.01),.43,.1+l*.11,{low:!0,scale:[1.4,.5,.7]}),u=G(r,.018,16050388,.44,.38,.17+l*.05,{low:!0})}for(let l of[-1,1])for(let h of[-1,1])Z(r,.035,.045,.25,5917246,l*.17,.13,h*.22,{segments:5}),D(r,.08,.04,.09,4011053,l*.17,.03,h*.22+.03);return r}function hy(i){Er(i,10.9,3.1,-1.1,1),Er(i,11.7,4,-.5,.85),Er(i,9.4,4.3,2.2,.95),Er(i,12.4,5.5,.8,.75);let t=Er(i,10.1,2,-2.4,.6)}function uy(i){let t=Ki({height:.95,outfit:8154013,accent:x.gold,skin:15780267,hair:15394011,hairStyle:"bald",crown:!0,beard:!0,seated:!0,skirt:!0,cape:7298447,pants:5917554});t.position.set(.15,.64,-1.12),i.add(t);let e=new j;e.position.set(.52,1,.2),e.rotation.z=-.25,t.add(e),Z(e,.015,.02,1.1,x.gold,0,.5,0,{segments:6}),G(e,.07,x.goldDeep,0,1.08,0,{low:!0}),G(e,.035,x.rose,0,1.18,0,{low:!0});let n=new J(new Ee(.17,.04,5,16,Math.PI),Ut(15983028));return n.position.set(0,1.02,0),n.rotation.x=-.3,t.add(n),t}function dy(i){let t=Ki({height:1,outfit:7314077,accent:15321471,skin:16243651,hair:x.hairBrown,hairStyle:"bun",crown:!0,skirt:!0,cape:8366504});t.position.set(1.5,4.33,1.55),t.rotation.y=.25,i.add(t);let e=new J(new Ae(.44,.55,5,5),new ie({color:14477791,side:Yt,transparent:!0,opacity:.85,gradientMap:ce()}));e.position.set(0,.92,.13),e.rotation.x=-.2,t.add(e);let n=D(t,.2,.035,.24,9269117,.25,.65,.15,{rot:[0,.2,-.3]});return t}function fy(i){let t=new j;t.position.set(-1.35,.02,5.5),t.rotation.y=.35,i.add(t);let e=12240591,n=9214630,s=x.gold;for(let f of[-1,1])Z(t,.075,.085,.62,n,f*.12,.31,0,{segments:8}),D(t,.16,.08,.25,5065288,f*.12,.04,.04);Z(t,.28,.32,.18,e,0,.63,0,{segments:10}),Z(t,.28,.25,.62,e,0,1.02,0,{segments:12}),G(t,.1,s,0,1.22,.23,{low:!0,scale:[1.2,1.2,.4]}),Z(t,.25,.25,.07,s,0,.74,0,{segments:12});for(let f of[-1,1]){G(t,.14,e,f*.31,1.25,0,{low:!0,scale:[1.1,.8,1]});let g=Z(t,.06,.07,.52,e,f*.36,.99,0,{segments:8,rot:[0,0,f*.1]});G(t,.075,s,f*.38,.72,0,{low:!0})}Z(t,.12,.14,.1,n,0,1.34,0,{segments:10});let r=G(t,.18,e,0,1.53,0,{scale:[1,1.08,1.05]});D(t,.27,.055,.1,3354670,0,1.53,.16),D(t,.05,.2,.05,3354670,0,1.45,.185),kt(t,.06,.34,x.red,0,1.82,-.03,{segments:6,rot:[.2,0,.2]});for(let f=0;f<3;f++)kt(t,.05,.22-f*.04,x.rose,.02+f*.04,1.78-f*.04,-.08-f*.04,{segments:5,rot:[.3,0,.2]});let o=new j;o.position.set(.44,.02,.06),t.add(o),Z(o,.018,.023,2.35,x.wood,0,1.2,0,{segments:5}),kt(o,.06,.25,e,0,2.47,0,{segments:8}),D(o,.1,.05,.05,s,0,2.33,0);let a=new j;a.position.set(-.42,1,.18),a.rotation.y=.25,t.add(a);let c=new Ge;c.moveTo(-.25,.32),c.lineTo(.25,.32),c.lineTo(.25,0),c.quadraticCurveTo(.25,-.28,0,-.42),c.quadraticCurveTo(-.25,-.28,-.25,0),c.closePath();let l=new J(new be(c),Ut(8297401));l.position.z=.03,a.add(l);let h=new J(new be(c),Ut(s));h.scale.setScalar(1.12),h.position.z=.02,a.add(h);let u=new J(new be(ra(.13,.055,5)),new $t({color:16048036,toneMapped:!1,side:Yt}));u.position.z=.045,a.add(u);let d=new j;return d.position.set(-.34,.2,-.1),d.rotation.z=.4,t.add(d),D(d,.04,.8,.04,e,0,.35,0),D(d,.3,.04,.06,s,0,.72,0),te(f=>{t.position.y=.02+Math.sin(f*.8)*.006}),t}function py(i){let t=Ki({height:.9,outfit:10122082,accent:x.white,skin:16045245,hair:8018500,hairStyle:"bun",skirt:!0,basket:!0});t.position.set(2.95,.02,2.85),t.rotation.y=-1.6,i.add(t);let e=new J(new be(new Ge([new $(-.16,0),new $(.16,0),new $(.19,.5),new $(0,.55),new $(-.19,.5)].map(o=>o))),Fs(16512230)),n=new Ge;n.moveTo(-.1,0),n.lineTo(.1,0),n.lineTo(.16,.52),n.lineTo(0,.58),n.lineTo(-.16,.52),n.closePath();let s=new J(new be(n),Fs(16578024));s.position.set(0,.18,.22),s.rotation.x=-.13,t.add(s);let r=G(t,.12,16643817,0,1.1,-.01,{scale:[1.25,.4,.9]});for(let o=0;o<3;o++)G(t,.045,[x.butter,x.rose,x.cream][o],-.11+o*.1,.7,.2,{low:!0});return t}function my(i){let t=Ki({height:.98,outfit:9337762,accent:x.rose,skin:15912371,hair:x.hairBrown,hairStyle:"long",hat:"feather",hatColor:7034472,tool:"lute",pants:5917790});t.position.set(-4.35,.02,5.75),t.rotation.y=1.25,i.add(t);let e=0;return t}function gy(i){let n=jt(-8.55,3)+.02,s=new j;s.position.set(-8.55,n,3),s.rotation.y=1.9,i.add(s);let r=11303767,o=14996407;G(s,.48,r,0,.92,0,{scale:[1.5,.85,.75]}),G(s,.3,r,.62,1.08,0,{scale:[1,1,.8]});let a=Z(s,.15,.22,.65,r,.78,1.38,0,{segments:9,rot:[0,0,-.55]}),c=G(s,.21,r,1.06,1.66,0,{scale:[1.25,.75,.65]});D(s,.32,.2,.2,r,1.16,1.58,0),G(s,.06,4864304,1.2,1.55,.1,{low:!0});for(let u of[-1,1])kt(s,.06,.18,r,.94,1.83,u*.1,{segments:5}),G(s,.03,3090725,1.08,1.67,u*.11,{low:!0});for(let u=0;u<6;u++)G(s,.09,o,.63+u*.05,1.22+u*.09,0,{low:!0,scale:[.7,1.3,.5]});for(let u of[-1,1])for(let d of[-1,1])Z(s,.055,.07,.78,r,u*.45,.42,d*.28,{segments:6}),D(s,.13,.07,.16,4995631,u*.45,.05,d*.28);let l=new ke([new C(-.75,1.06,0),new C(-.9,.8,.03),new C(-.92,.45,.06)]),h=new J(new xn(l,10,.07,5,!1),Ut(o));return h.castShadow=!0,s.add(h),D(s,.6,.08,.55,9395528,0,1.28,0),D(s,.52,.06,.3,6111282,0,1.33,0),te(u=>{c.rotation.y=Math.sin(u*.4)*.05,s.position.y=n+Math.sin(u*.6)*.01}),s}function _y(i){let t=[[3.45,3.2,1.2],[3.75,2.8,-.5],[-.65,3.35,2.4]];for(let[e,n,s]of t){let r=new j;r.position.set(e,.02,n),r.rotation.y=s,i.add(r),G(r,.13,16248539,0,.2,0,{scale:[1.2,.9,.9]}),G(r,.08,16248539,.12,.31,0,{low:!0}),kt(r,.03,.07,15245631,.19,.31,0,{segments:4,rot:[0,0,-Math.PI/2]});for(let a=0;a<3;a++)kt(r,.025,.07,13855333,.12+a%2*.02,.38,-.03+a*.03,{segments:4});for(let a of[-1,1])Z(r,.01,.012,.12,14196810,a*.06,.06,0,{segments:4});let o=new J(new pn(.03,.06,4),Ut(15245631));o.rotation.z=-Math.PI/2,o.position.set(.2,.31,0),r.add(o)}}function xy(i){let t=jt(Ce.pond.x,Ce.pond.z)+.12,e=new j;e.position.set(-10,t+.04,7.6),e.rotation.y=1,i.add(e);let n=16380642;G(e,.16,n,0,.12,0,{scale:[1.5,.75,.9]}),G(e,.09,n,.17,.25,0,{low:!0}),kt(e,.03,.08,14917964,.26,.24,0,{segments:4,rot:[0,0,-Math.PI/2]});for(let r of[-1,1])G(e,.015,3354668,.2,.28,r*.05,{low:!0});kt(e,.06,.16,n,-.2,.16,0,{segments:4,rot:[0,0,.9]});let s=e.clone();s.position.set(-8.3,t+.04,7),s.rotation.y=-2,i.add(s),te(r=>{e.position.y=t+.04+Math.sin(r*1.1)*.012,s.position.y=t+.04+Math.sin(r*1.3+1)*.012,e.rotation.y=1+Math.sin(r*.3)*.1})}function yy(i){let t=[{radius:12,height:12,speed:.13,phase:0,scale:1},{radius:15,height:14,speed:.1,phase:2.1,scale:1.2},{radius:17,height:11,speed:.08,phase:4.2,scale:.8},{radius:10,height:16,speed:.16,phase:1.1,scale:.9},{radius:19,height:13,speed:.07,phase:5.3,scale:1.1}],e=[];for(let n of t){let s=new j;i.add(s);let r=new j;r.scale.setScalar(n.scale),s.add(r),G(r,.11,15986404,0,0,0,{scale:[1.5,.7,.7],low:!0}),G(r,.065,15986404,.13,.03,0,{low:!0}),kt(r,.022,.07,14529383,.19,.02,0,{segments:4,rot:[0,0,-Math.PI/2]});let o=[];for(let a of[-1,1]){let c=new j;c.position.set(0,.04,a*.05),r.add(c);let l=new Ge;l.moveTo(0,0),l.quadraticCurveTo(.15,.1,.42,.02),l.quadraticCurveTo(.22,-.04,.02,-.04),l.closePath();let h=new J(new be(l),new $t({color:16183524,side:Yt,toneMapped:!1}));h.rotation.x=Math.PI/2,h.rotation.y=a>0?-Math.PI/2:Math.PI/2,c.add(h),o.push({pivot:c,side:a,mesh:h})}e.push({group:s,bird:r,wings:o,spec:n})}te(n=>{for(let s of e){let r=n*s.spec.speed+s.spec.phase;s.group.position.set(Math.cos(r)*s.spec.radius-1,s.spec.height+Math.sin(n*.4+s.spec.phase)*.6,Math.sin(r)*s.spec.radius-2),s.group.rotation.y=-r+Math.PI/2;let o=Math.sin(n*7+s.spec.phase)*.65;for(let a of s.wings)a.pivot.rotation.z=a.side*o,a.pivot.rotation.x=.1}})}function vy(i){let t=[15906487,16048036,13351394];for(let e=0;e<3;e++){let n=new j;i.add(n);let s=Z(n,.008,.008,.08,7298898,0,0,0,{segments:4}),r=[];for(let l of[-1,1]){let h=new j;h.position.set(0,.01,0),n.add(h);let u=new Ge;u.moveTo(0,0),u.bezierCurveTo(.12,.15,.24,.06,.2,-.06),u.bezierCurveTo(.15,-.16,.04,-.08,0,0);let d=new J(new be(u),new $t({color:t[e],side:Yt,toneMapped:!1}));d.rotation.x=-Math.PI/2,d.scale.x=l,h.add(d),r.push({pivot:h,sx:l})}let o=7+e*1.2,a=8.3+e*.8,c=P(0,6);te(l=>{let h=l*.5+c,u=o+Math.cos(h)*(1.2+e*.2),d=a+Math.sin(h*.8)*1,f=jt(u,d)+1.3+Math.sin(l*1.2+e)*.35;n.position.set(u,f,d),n.rotation.y=-h+Math.PI/2;for(let g of r)g.pivot.rotation.z=g.sx*(.45+Math.sin(l*14+c)*.5)})}}function My(i){let n=jt(-6.2,13.2),s=Ki({height:.72,outfit:14198655,accent:15983557,skin:16110778,hair:8018500,hairStyle:"short",pants:8359838});s.position.set(-6.2,n,13.2),s.rotation.y=.4,i.add(s);let r=new C(-6.2+2.1,n+5,13.2-1.2),o=new j;o.position.copy(r),o.rotation.z=.18,i.add(o);let a=new Ge;a.moveTo(0,.45),a.lineTo(.34,0),a.lineTo(0,-.45),a.lineTo(-.34,0),a.closePath();let c=new J(new be(a),new $t({color:15245469,side:Yt,toneMapped:!1}));o.add(c);let l=new J(new be(a),new $t({color:16774109,side:Yt,toneMapped:!1}));l.scale.setScalar(.45),l.position.z=.01,o.add(l);for(let d=0;d<3;d++){let f=D(o,.14,.04,.01,d%2?x.rose:x.butter,0,-.5-d*.18,0,{cast:!1});f.rotation.z=d%2?.4:-.4}let h=new ke([new C(-6.2+.2,n+.8,13.2+.1),new C(-6.2+.7,n+2.4,13.2-.5),r.clone().add(new C(0,-.3,0))]),u=new J(new xn(h,20,.007,3,!1),Fs(15853524));return i.add(u),te(d=>{o.position.y=r.y+Math.sin(d*.7)*.2,o.rotation.z=.18+Math.sin(d*.5)*.06,o.rotation.y=Math.sin(d*.3)*.1}),s}function fd(i,t,e){cy(i),ly(i),hy(i),uy(e),dy(e),fy(t),py(t),my(t),gy(i),_y(t),xy(i),yy(i),vy(i),My(i)}var Sr=[{id:"overview",index:"I",label:"\u6D6E\u7A7A\u5C9B\u5168\u666F",short:"\u5168\u666F",title:"\u4E91\u6D77\u4E4B\u4E0A\uFF0C\u4E00\u5EA7\u4F1A\u547C\u5438\u7684\u57CE\u5821",tags:["\u5012\u60AC\u5CA9\u5C9B","\u5341\u4E8C\u5EA7\u5854\u697C","\u4E91\u6D77\u4E0E\u8349\u5761"],text:"\u6574\u5EA7\u57CE\u5821\u6816\u5728\u4E00\u5EA7\u5012\u60AC\u7684\u5CA9\u5C9B\u4E0A\u3002\u8349\u5761\u5411\u56DB\u9762\u94FA\u5F00\uFF0C\u7802\u5CA9\u57CE\u5899\u88AB\u5915\u7167\u67D3\u6210\u871C\u8272\uFF0C\u5854\u5C16\u7684\u91D1\u7403\u63A5\u4F4F\u6700\u540E\u4E00\u7F15\u5149\u3002\u5C9B\u5E95\u5C42\u5C42\u53E0\u53E0\u7684\u5CA9\u8109\u50CF\u4E00\u672C\u88AB\u7FFB\u65E7\u7684\u4E66\uFF0C\u4E09\u5927\u7011\u5E03\u4ECE\u4E66\u9875\u95F4\u5782\u843D\uFF0C\u843D\u8FDB\u671B\u4E0D\u5230\u5E95\u7684\u4E91\u6D77\u3002\u98CE\u628A\u73AB\u7470\u9999\u3001\u5E72\u8349\u5473\u548C\u70E4\u9762\u5305\u7684\u6696\u751C\u4E00\u8D77\u5439\u4E0A\u9732\u53F0\u2014\u2014\u8FD9\u91CC\u662F\u6545\u4E8B\u5F00\u59CB\u7684\u5730\u65B9\u3002",pos:[27.5,20.5,36.5],target:[-1.5,4.7,-2],fov:42},{id:"throne",index:"II",label:"\u6A61\u6728\u738B\u5EA7\u5385",short:"\u738B\u5EA7\u5385",title:"\u70DB\u5149\u91CC\u7684\u5927\u5385\uFF0C\u56FD\u738B\u66F4\u5173\u5FC3\u5929\u6C14",tags:["\u957F\u684C\u4E0E\u70DB\u53F0","\u58C1\u7089","\u4E3B\u5821\u5256\u89C6"],cutaway:!0,text:"\u5927\u5385\u662F\u57CE\u5821\u7684\u5FC3\u810F\uFF1A\u6A61\u6728\u957F\u684C\u4ECE\u95E8\u53E3\u4E00\u76F4\u5EF6\u4F38\u5230\u58C1\u7089\u524D\uFF0C\u70DB\u6CEA\u6CBF\u7740\u94DC\u70DB\u53F0\u6DCC\u6210\u5C0F\u5C0F\u7684\u91D1\u8272\u7011\u5E03\u3002\u5317\u5899\u7684\u6302\u6BEF\u7EE3\u7740\u521D\u5347\u7684\u661F\u7403\u4E0E\u4E00\u6735\u73AB\u7470\uFF0C\u58C1\u7089\u91CC\u7684\u706B\u4E0D\u5206\u663C\u591C\u5730\u8BB2\u7740\u53E4\u8001\u7684\u6545\u4E8B\u3002\u87BA\u65CB\u77F3\u68AF\u8D34\u7740\u53F3\u5899\u76D8\u65CB\u800C\u4E0A\uFF0C\u6276\u624B\u88AB\u51E0\u767E\u5E74\u7684\u624B\u638C\u78E8\u5F97\u53D1\u4EAE\u3002\u56FD\u738B\u5750\u5728\u4E09\u7EA7\u77F3\u9636\u4E4B\u4E0A\u7684\u6A61\u6728\u738B\u5EA7\u91CC\uFF0C\u738B\u51A0\u6709\u70B9\u6B6A\uFF1B\u6BD4\u8D77\u7586\u571F\uFF0C\u4ED6\u66F4\u5173\u5FC3\u7A97\u5916\u7684\u5929\u6C14\u3002",pos:[3.4,7.4,6.4],target:[-2.2,5.5,-7.6],fov:45},{id:"bedroom",index:"III",label:"\u4E3B\u5821\u5367\u623F",short:"\u5367\u623F",title:"\u661F\u661F\u5E95\u4E0B\uFF0C\u738B\u540E\u628A\u4E91\u5199\u8FDB\u4FE1\u91CC",tags:["\u56DB\u67F1\u5E8A","\u661F\u8C61\u4EEA","\u5256\u89C6\u89C6\u89D2"],cutaway:!0,text:"\u6CBF\u7740\u7A84\u7A84\u7684\u87BA\u65CB\u77F3\u68AF\u4E0A\u5230\u4E8C\u5C42\uFF0C\u662F\u738B\u540E\u7684\u5367\u623F\uFF1A\u56DB\u67F1\u5E8A\u7684\u5E37\u5E54\u88AB\u98CE\u8F7B\u8F7B\u9F13\u8D77\uFF0C\u5E8A\u811A\u6446\u7740\u4E00\u53EA\u65E7\u76AE\u7BB1\u3002\u5199\u5B57\u53F0\u4E0A\u644A\u7740\u5199\u5230\u4E00\u534A\u7684\u4FE1\uFF0C\u7EB8\u4E0A\u53EA\u6709\u4E00\u53E5\u201C\u4ECA\u5929\u7684\u4E91\u5F88\u50CF\u4E00\u7FA4\u7F8A\u201D\u3002\u89D2\u843D\u91CC\u7684\u9EC4\u94DC\u671B\u8FDC\u955C\u5BF9\u51C6\u73AB\u7470\u56ED\uFF0C\u5E8A\u5934\u6302\u7740\u4E00\u4E32\u4F1A\u65CB\u8F6C\u7684\u5C0F\u661F\u661F\u3002\u738B\u540E\u559C\u6B22\u5728\u508D\u665A\u7AD9\u5230\u680F\u6746\u8FB9\uFF0C\u770B\u7267\u7F8A\u4EBA\u8D76\u7740\u7F8A\u7FA4\u56DE\u5BB6\uFF1B\u5979\u7684\u732B\u7761\u5728\u5E8A\u5C3E\uFF0C\u50CF\u4E00\u56E2\u6E29\u6696\u7684\u4E91\u3002",pos:[-.2,10.4,4.4],target:[-2.2,8.3,-7.2],fov:42},{id:"gate",index:"IV",label:"\u95E8\u697C\u4E0E\u57CE\u5899",short:"\u57CE\u95E8",title:"\u534A\u60AC\u7684\u95F8\u95E8\uFF0C\u548C\u4E00\u53EA\u4E0D\u8BB2\u89C4\u77E9\u7684\u9EBB\u96C0",tags:["\u540A\u6865\u4E0E\u95F8\u95E8","\u5B88\u536B\u9A91\u58EB","\u84DD\u91D1\u65D7\u5E1C"],text:"\u95E8\u697C\u662F\u57CE\u5821\u552F\u4E00\u5411\u4E16\u754C\u655E\u5F00\u7684\u7F3A\u53E3\u3002\u95F8\u95E8\u534A\u60AC\uFF0C\u77F3\u9636\u88AB\u5C81\u6708\u78E8\u51FA\u6D45\u6D45\u7684\u51F9\u69FD\uFF1B\u4E24\u5EA7\u5706\u5854\u7684\u96C9\u581E\u4E4B\u95F4\uFF0C\u5B88\u536B\u9A91\u58EB\u7684\u76D4\u7532\u64E6\u5F97\u80FD\u7167\u89C1\u4E91\uFF0C\u957F\u77DB\u4E0A\u5374\u505C\u7740\u4E00\u53EA\u4E0D\u5728\u4E4E\u89C4\u77E9\u7684\u9EBB\u96C0\u3002\u57CE\u5899\u5185\u4FA7\u6709\u4E00\u6761\u5DE1\u903B\u5C0F\u5F84\uFF0C\u5B69\u5B50\u4EEC\u628A\u5B83\u5F53\u8D5B\u8DD1\u7684\u8DD1\u9053\uFF1B\u5916\u5899\u4E0A\u8FD8\u667E\u7740\u4E00\u6761\u84DD\u8272\u5E8A\u5355\uFF0C\u98CE\u4E00\u6765\uFF0C\u5C31\u50CF\u53E6\u4E00\u9762\u65D7\u3002",pos:[15.5,10.2,16.5],target:[-1.8,5.2,.2],fov:38},{id:"chapel",index:"V",label:"\u57CE\u5821\u793C\u62DC\u5802",short:"\u793C\u62DC\u5802",title:"\u5341\u4E8C\u628A\u6728\u6905\uFF0C\u4E00\u6247\u628A\u5149\u5207\u6210\u7CD6\u7684\u7A97",tags:["\u73AB\u7470\u7A97","\u8BB8\u613F\u949F","\u957F\u660E\u70DB"],text:"\u793C\u62DC\u5802\u85CF\u5728\u4E3B\u5821\u4E1C\u4FA7\uFF0C\u5C0F\u5F97\u53EA\u80FD\u5750\u4E0B\u5341\u4E8C\u4E2A\u4EBA\u3002\u73AB\u7470\u7A97\u628A\u5149\u5207\u6210\u7CD6\u679C\u4E00\u6837\u7684\u788E\u7247\uFF0C\u843D\u5728\u77F3\u5730\u548C\u65E7\u6728\u6905\u4E0A\uFF1B\u796D\u575B\u4E0A\u70B9\u7740\u4E00\u652F\u6C38\u8FDC\u70E7\u4E0D\u5B8C\u7684\u8721\u70DB\uFF0C\u65C1\u8FB9\u653E\u7740\u4E00\u5C0F\u74F6\u4ECE\u4E91\u6D77\u8FB9\u7F18\u91C7\u6765\u7684\u9732\u6C34\u3002\u949F\u697C\u91CC\u90A3\u53E3\u949F\u53EA\u5728\u4E24\u79CD\u65F6\u5019\u54CD\uFF1A\u65E5\u843D\uFF0C\u548C\u6709\u4EBA\u8BB8\u613F\u7684\u65F6\u5019\u3002\u4ECA\u5929\u508D\u665A\uFF0C\u5B83\u5DF2\u7ECF\u8F7B\u8F7B\u54CD\u8FC7\u4E00\u6B21\u4E86\u3002",pos:[-.8,6,-2],target:[2,4.7,-7.3],fov:46},{id:"garden",index:"VI",label:"\u5C0F\u738B\u5B50\u73AB\u7470\u56ED",short:"\u73AB\u7470\u56ED",title:"\u73BB\u7483\u7F69\u4E0B\u7684\u73AB\u7470\uFF0C\u548C\u6BCF\u5929\u6765\u4E24\u6B21\u7684\u5C0F\u738B\u5B50",tags:["\u73BB\u7483\u7F69\u73AB\u7470","\u5C0F\u738B\u5B50","\u72D0\u72F8\u4E0E\u7F8A\u7FA4"],text:"\u5357\u5761\u7684\u73AB\u7470\u56ED\u7528\u767D\u77F3\u5B50\u56F4\u51FA\u4E00\u4E2A\u5C0F\u5C0F\u7684\u5706\u3002\u73BB\u7483\u7F69\u91CC\u90A3\u6735\u73AB\u7470\u6BCF\u5468\u53EA\u6D47\u4E00\u6B21\u6C34\uFF0C\u7F69\u5B50\u4E0A\u51DD\u7ED3\u7684\u6C34\u73E0\u4F1A\u628A\u6668\u5149\u6298\u6210\u4E03\u79CD\u989C\u8272\u3002\u5C0F\u738B\u5B50\u6BCF\u5929\u6765\u4E24\u6B21\uFF1A\u4E00\u6B21\u5728\u65E5\u51FA\uFF0C\u4E00\u6B21\u5728\u661F\u661F\u51FA\u73B0\u4E4B\u524D\u3002\u72D0\u72F8\u5750\u5728\u65C1\u8FB9\u7684\u77F3\u5934\u4E0A\uFF0C\u5C3E\u5DF4\u76D6\u4F4F\u722A\u5B50\uFF1B\u7F8A\u7FA4\u5728\u66F4\u8FDC\u7684\u8349\u5761\u4E0A\uFF0C\u628A\u4E91\u5F71\u5F53\u6210\u4F1A\u79FB\u52A8\u7684\u8349\u3002",pos:[12.6,4.7,15.6],target:[6.4,1.8,9.3],fov:36},{id:"waterfall",index:"VII",label:"\u4E91\u6D77\u7011\u5E03",short:"\u4E91\u7011",title:"\u6C34\u5728\u5C9B\u7F18\u5931\u53BB\u4F9D\u9760\uFF0C\u843D\u6210\u4E00\u9053\u94F6\u5E18",tags:["\u5C9B\u7F18\u7011\u5E03","\u7761\u83B2\u6C60","\u6D6E\u77F3\u4E0E\u9E3D\u5B50"],text:"\u6C60\u5858\u5728\u5C9B\u897F\u4FA7\u5B89\u9759\u5F97\u50CF\u4E00\u679A\u522B\u5728\u8349\u5730\u4E0A\u7684\u84DD\u5B9D\u77F3\u3002\u6EAA\u6C34\u7ED5\u8FC7\u82A6\u82C7\u4E0E\u7761\u83B2\uFF0C\u5728\u5C9B\u7F18\u5FFD\u7136\u5931\u53BB\u4F9D\u9760\uFF0C\u5316\u4F5C\u4E00\u9053\u94F6\u767D\u7684\u5E18\u5B50\u5760\u5165\u4E91\u6D77\u3002\u6C34\u96FE\u5347\u8D77\u6765\uFF0C\u4F1A\u5728\u508D\u665A\u53D8\u6210\u4E00\u5C0F\u6BB5\u5F69\u8679\uFF1B\u6D6E\u77F3\u7ED5\u7740\u5C0F\u5C9B\u6162\u6162\u6253\u8F6C\uFF0C\u50CF\u4E0D\u80AF\u79BB\u5F00\u7684\u542C\u4F17\u3002\u5076\u5C14\u6709\u9C7C\u8DC3\u51FA\u6C34\u9762\u2014\u2014\u636E\u8BF4\u5B83\u4EEC\u4E5F\u5728\u7EC3\u4E60\u98DE\u884C\u3002",pos:[-26.5,6.5,17.5],target:[-13.8,-2.6,7],fov:40}],pe={journal:document.getElementById("journal"),chapterIndex:document.getElementById("chapterIndex"),chapterTitle:document.getElementById("chapterTitle"),chapterTags:document.getElementById("chapterTags"),chapterText:document.getElementById("chapterText"),views:document.getElementById("views"),collapse:document.getElementById("collapse"),reopen:document.getElementById("reopen"),auto:document.getElementById("auto"),hotspots:document.getElementById("hotspots"),loader:document.getElementById("loader"),fatal:document.getElementById("fatal")},je,vn,nn,ye,sh,wi,Un,qe=null,Ey="overview",br=!0;function rh(i){if(!pe.fatal)return;pe.fatal.style.display="flex";let t=pe.fatal.querySelector(".fatal-detail");t&&(t.textContent=String(i)),pe.loader&&pe.loader.classList.add("done")}window.addEventListener("error",i=>rh(i.message||"\u672A\u77E5\u9519\u8BEF"));window.addEventListener("unhandledrejection",i=>rh(i.reason?.message||i.reason||"\u672A\u77E5\u9519\u8BEF"));function Sy(){let i=document.getElementById("app");vn=new Co,vn.fog=new Ro(15914685,.0048),nn=new Je(42,window.innerWidth/window.innerHeight,.4,900);let t=Sr[0];nn.position.set(...t.pos),je=new Ao({antialias:!0,powerPreference:"high-performance"}),je.setPixelRatio(Math.min(window.devicePixelRatio,1.75)),je.setSize(window.innerWidth,window.innerHeight),je.shadowMap.enabled=!0,je.shadowMap.type=Tl,je.toneMapping=Al,je.toneMappingExposure=1.02,je.outputColorSpace=on,i.appendChild(je.domElement),ye=new Qo(nn,je.domElement),ye.target.set(...t.target),ye.enableDamping=!0,ye.dampingFactor=.055,ye.rotateSpeed=.62,ye.zoomSpeed=.8,ye.panSpeed=.7,ye.minDistance=2.2,ye.maxDistance=105,ye.minPolarAngle=.08,ye.maxPolarAngle=Math.PI*.955;let e=new URLSearchParams(location.search).has("still");ye.autoRotate=!e,ye.autoRotateSpeed=.42,ye.update();let n=new Go(16773081,9414322,.72);vn.add(n);let s=new Xo(16774118,.1);vn.add(s);let r=new Us(16771266,1.65);r.position.copy(aa).multiplyScalar(68),r.castShadow=!0,r.shadow.mapSize.set(2048,2048),r.shadow.camera.left=-27,r.shadow.camera.right=27,r.shadow.camera.top=27,r.shadow.camera.bottom=-27,r.shadow.camera.near=5,r.shadow.camera.far=150,r.shadow.bias=-4e-4,r.shadow.normalBias=.035,r.target.position.set(-2,3,-3),vn.add(r),vn.add(r.target);let o=new Us(12901616,.3);o.position.set(-35,24,-28),vn.add(o);let a=new Us(16766126,.2);a.position.set(-10,14,40),vn.add(a),Un=new j,vn.add(Un),od(Un),wi=ad(Un),hd(wi.keep),ud(wi.castle,Un),dd(Un),fd(Un,wi.castle,wi.keep),sh=sd(vn).sky,by(wi.smokeOrigin),wy(),te(u=>{Un.position.y=Math.sin(u*.32)*.16,Un.rotation.z=Math.sin(u*.21)*.0016}),Ty(),Cy(),pd(),window.addEventListener("resize",pd),ye.addEventListener("start",()=>{qe&&(qe=null),ye.autoRotate&&(ye.autoRotate=!1,ma())}),je.domElement.addEventListener("dblclick",()=>{ga("overview",!0)}),window.__castle={scene:vn,camera:nn,renderer:je,controls:ye,selectView:ga,VIEWS:Sr};let l=new Yo,h=!0;je.setAnimationLoop(()=>{let u=Math.min(l.getDelta(),.05),d=l.elapsedTime;if(ed(d,u),qe){qe.t+=u/qe.duration;let f=Math.min(1,qe.t),g=td(f);nn.position.lerpVectors(qe.fromPos,qe.toPos,g),ye.target.lerpVectors(qe.fromTarget,qe.toTarget,g),nn.fov=qe.fromFov+(qe.toFov-qe.fromFov)*g,nn.updateProjectionMatrix(),f>=1&&(qe=null)}ye.update(),sh&&sh.position.copy(nn.position),Py(),je.render(vn,nn),h&&(h=!1,setTimeout(()=>pe.loader.classList.add("done"),260))})}function by(i){let t=Hs(),e=[];for(let n=0;n<7;n++){let s=new Pn({map:t,color:14274244,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!0}),r=new zn(s);r.scale.setScalar(.4),i.add(r),e.push({sprite:r,offset:n/7,phase:P(0,6.3)})}te(n=>{for(let s of e){let r=(n*.085+s.offset)%1;s.sprite.position.set(Math.sin(r*4.5+s.phase)*.5*r,r*3.2,Math.cos(r*3.7+s.phase)*.4*r);let o=.35+r*1.5;s.sprite.scale.set(o,o*.85,1),s.sprite.material.opacity=Math.sin(r*Math.PI)*.22,s.sprite.material.rotation=r*.8+s.phase}})}function wy(){let t=new Float32Array(390),e=[];for(let o=0;o<130;o++){let a=P(0,Math.PI*2),c=P(2,22),l=Math.cos(a)*c,h=Math.sin(a)*c,u=P(-3,16);t.set([l,u,h],o*3),e.push({baseY:u,phase:P(0,6),speed:P(.1,.3)})}let n=new ae;n.setAttribute("position",new Oe(t,3));let s=new ti({color:16773839,size:.07,transparent:!0,opacity:.55,depthWrite:!1,blending:an,toneMapped:!1}),r=new _i(n,s);Un.add(r),te(o=>{let a=n.attributes.position.array;for(let c=0;c<130;c++){let l=e[c];a[c*3+1]=l.baseY+Math.sin(o*l.speed+l.phase)*.8,a[c*3]+=Math.sin(o*l.speed*.6+l.phase)*.0015}n.attributes.position.needsUpdate=!0})}function Ty(){pe.views.innerHTML="";for(let i of Sr){let t=document.createElement("button");t.className="view-btn",t.dataset.id=i.id,t.innerHTML=`<span>${i.index}</span>${i.short}`,t.addEventListener("click",()=>ga(i.id,!0)),pe.views.appendChild(t)}pe.collapse.addEventListener("click",()=>{br=!1,pe.journal.classList.add("closed"),pe.reopen.classList.add("visible")}),pe.reopen.addEventListener("click",()=>{br=!0,pe.journal.classList.remove("closed"),pe.reopen.classList.remove("visible")}),pe.auto.addEventListener("click",()=>{qe&&(qe=null),ye.autoRotate=!ye.autoRotate,ma()}),ma(),md(Sr[0])}function ma(){pe.auto.innerHTML=`<span class="status-dot ${ye.autoRotate?"on":""}"></span>\u81EA\u52A8\u73AF\u6E38 \xB7 ${ye.autoRotate?"\u5F00":"\u5173"}`}function md(i){Ey=i.id,pe.chapterIndex.textContent=i.index,pe.chapterTitle.textContent=i.title,pe.chapterTags.innerHTML=i.tags.map(t=>`<span>${t}</span>`).join(""),pe.chapterText.textContent=i.text;for(let t of pe.views.querySelectorAll(".view-btn"))t.classList.toggle("active",t.dataset.id===i.id);pe.chapterTitle.style.animation="none",pe.chapterText.style.animation="none",pe.chapterTitle.offsetWidth,pe.chapterTitle.style.animation="",pe.chapterText.style.animation=""}function ga(i,t){let e=Sr.find(n=>n.id===i);e&&(md(e),br||(br=!0,pe.journal.classList.remove("closed"),pe.reopen.classList.remove("visible")),Ay(!!e.cutaway),t&&(qe={t:0,duration:1.85,fromPos:nn.position.clone(),fromTarget:ye.target.clone(),toPos:new C(...e.pos),toTarget:new C(...e.target),fromFov:nn.fov,toFov:e.fov},ye.autoRotate=!1,ma()))}function Ay(i){if(wi?.frontShell)for(let t of wi.frontShell)t.visible=!i}var Ry=[{id:"throne",label:"\u738B\u5EA7\u5385",pos:[-2,9.2,-4.4]},{id:"gate",label:"\u57CE\u95E8",pos:[-2,8.05,-1.1]},{id:"garden",label:"\u73AB\u7470\u56ED",pos:[6.8,3,9.5]},{id:"waterfall",label:"\u4E91\u7011",pos:[-15.6,1.1,9.4]}],gd=[];function Cy(){for(let i of Ry){let t=new Te;t.position.set(...i.pos),Un.add(t);let e=document.createElement("button");e.className="hotspot",e.innerHTML=`<span class="dot"></span>${i.label}`,e.addEventListener("click",()=>ga(i.id,!0)),pe.hotspots.appendChild(e),gd.push({...i,anchor:t,el:e})}}var kn=new C;function Py(){let i=window.innerWidth,t=window.innerHeight,e=i<=900,n=e?i:br?i-390:i-90;for(let s of gd){s.anchor.getWorldPosition(kn);let r=nn.position.distanceTo(kn);if(kn.project(nn),kn.z>1||kn.x<-1||kn.x>1||kn.y<-1||kn.y>1||r>90||e){s.el.style.opacity=0,s.el.style.pointerEvents="none";continue}let o=(kn.x*.5+.5)*i,a=(-kn.y*.5+.5)*t;if(o>n-30||a<80){s.el.style.opacity=0,s.el.style.pointerEvents="none";continue}s.el.style.left=`${o}px`,s.el.style.top=`${a}px`,s.el.style.opacity=String(.32+Math.min(.68,Math.max(0,(90-r)/45))),s.el.style.pointerEvents="auto"}}function pd(){let i=window.innerWidth,t=window.innerHeight;nn.aspect=i/t,nn.updateProjectionMatrix(),je.setSize(i,t),je.setPixelRatio(Math.min(window.devicePixelRatio,1.75))}try{Sy()}catch(i){console.error(i),rh(i?.message||i)}})();
