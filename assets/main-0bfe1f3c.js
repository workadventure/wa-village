console.info("Roofs Script started successfully");WA.onInit().then(()=>{WA.room.onEnterLayer("floor1").subscribe(()=>{WA.room.hideLayer("roof1"),WA.room.hideLayer("walls-bg-front1"),WA.room.hideLayer("sign1")}),WA.room.onLeaveLayer("floor1").subscribe(()=>{WA.room.showLayer("roof1"),WA.room.showLayer("walls-bg-front1"),WA.room.showLayer("sign1")}),WA.room.onEnterLayer("floor2").subscribe(()=>{WA.room.hideLayer("roof2"),WA.room.hideLayer("walls-bg-front2"),WA.room.hideLayer("sign2")}),WA.room.onLeaveLayer("floor2").subscribe(()=>{WA.room.showLayer("roof2"),WA.room.showLayer("walls-bg-front2"),WA.room.showLayer("sign2")}),WA.room.onEnterLayer("rooms_floor").subscribe(()=>{WA.room.hideLayer("facade-furniture-bg"),WA.room.hideLayer("facade-furniture-fg"),WA.room.hideLayer("facade")}),WA.room.onLeaveLayer("rooms_floor").subscribe(()=>{WA.room.showLayer("facade-furniture-bg"),WA.room.showLayer("facade-furniture-fg"),WA.room.showLayer("facade")})}).catch(r=>console.error(r));class C{constructor(e){this.properties=e??[]}get(e){const t=this.properties.filter(n=>n.name===e).map(n=>n.value);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const n=this.get(e);if(n!==void 0){if(t!=="json"&&typeof n!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return n}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const n=this.get(e);if(n===void 0)throw new Error('Property "'+e+'" is missing');if(t!=="json"&&typeof n!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return n}getType(e){const t=this.properties.filter(n=>n.name===e).map(n=>n.type);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}}const I="https://unpkg.com/@workadventure/scripting-api-extra@1.4.6/dist";class ee{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new C(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function j(r){const e=r?"#"+r.join():"";WA.nav.openCoWebSite(I+"/configuration.html"+e)}async function te(r,e){const t=await WA.room.getTiledMap(),n=new Map;return $(t.layers,n,r,e),n}function $(r,e,t,n){for(const o of r)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(t&&o.name!==t||n&&!n.includes(s.name))continue;e.set(s.name,new ee(s))}}else o.type==="group"&&$(o.layers,e,t,n)}let B;async function E(){return B===void 0&&(B=re()),B}async function re(){return ne(await WA.room.getTiledMap())}function ne(r){const e=new Map;return X(r.layers,"",e),e}function X(r,e,t){for(const n of r)n.type==="group"?X(n.layers,e+n.name+"/",t):(n.name=e+n.name,t.set(n.name,n))}async function oe(){const r=await E(),e=[];for(const t of r.values())if(t.type==="objectgroup")for(const n of t.objects)(n.type==="area"||n.class==="area")&&e.push(n);return e}function se(r){let e=1/0,t=1/0,n=0,o=0;const s=r.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<r.height;a++)for(let i=0;i<r.width;i++)s[i+a*r.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),t=Math.min(t,a),n=Math.max(n,a));return{top:t,left:e,right:o+1,bottom:n+1}}function Y(r){let e=1/0,t=1/0,n=0,o=0;for(const s of r){const a=se(s);a.left<e&&(e=a.left),a.top<t&&(t=a.top),a.right>o&&(o=a.right),a.bottom>n&&(n=a.bottom)}return{top:t,left:e,right:o,bottom:n}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ae=Object.prototype.toString,W=Array.isArray||function(e){return ae.call(e)==="[object Array]"};function O(r){return typeof r=="function"}function ie(r){return W(r)?"array":typeof r}function x(r){return r.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function _(r,e){return r!=null&&typeof r=="object"&&e in r}function ue(r,e){return r!=null&&typeof r!="object"&&r.hasOwnProperty&&r.hasOwnProperty(e)}var ce=RegExp.prototype.test;function le(r,e){return ce.call(r,e)}var fe=/\S/;function pe(r){return!le(fe,r)}var ge={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function he(r){return String(r).replace(/[&<>"'`=\/]/g,function(t){return ge[t]})}var de=/\s*/,ye=/\s+/,D=/\s*=/,me=/\s*\}/,ve=/#|\^|\/|>|\{|&|=|!/;function be(r,e){if(!r)return[];var t=!1,n=[],o=[],s=[],a=!1,i=!1,u="",l=0;function f(){if(a&&!i)for(;s.length;)delete o[s.pop()];else s=[];a=!1,i=!1}var d,m,P;function S(b){if(typeof b=="string"&&(b=b.split(ye,2)),!W(b)||b.length!==2)throw new Error("Invalid tags: "+b);d=new RegExp(x(b[0])+"\\s*"),m=new RegExp("\\s*"+x(b[1])),P=new RegExp("\\s*"+x("}"+b[1]))}S(e||h.tags);for(var c=new M(r),v,g,y,L,R,w;!c.eos();){if(v=c.pos,y=c.scanUntil(d),y)for(var k=0,Q=y.length;k<Q;++k)L=y.charAt(k),pe(L)?(s.push(o.length),u+=L):(i=!0,t=!0,u+=" "),o.push(["text",L,v,v+1]),v+=1,L===`
`&&(f(),u="",l=0,t=!1);if(!c.scan(d))break;if(a=!0,g=c.scan(ve)||"name",c.scan(de),g==="="?(y=c.scanUntil(D),c.scan(D),c.scanUntil(m)):g==="{"?(y=c.scanUntil(P),c.scan(me),c.scanUntil(m),g="&"):y=c.scanUntil(m),!c.scan(m))throw new Error("Unclosed tag at "+c.pos);if(g==">"?R=[g,y,v,c.pos,u,l,t]:R=[g,y,v,c.pos],l++,o.push(R),g==="#"||g==="^")n.push(R);else if(g==="/"){if(w=n.pop(),!w)throw new Error('Unopened section "'+y+'" at '+v);if(w[1]!==y)throw new Error('Unclosed section "'+w[1]+'" at '+v)}else g==="name"||g==="{"||g==="&"?i=!0:g==="="&&S(y)}if(f(),w=n.pop(),w)throw new Error('Unclosed section "'+w[1]+'" at '+c.pos);return Ae(we(o))}function we(r){for(var e=[],t,n,o=0,s=r.length;o<s;++o)t=r[o],t&&(t[0]==="text"&&n&&n[0]==="text"?(n[1]+=t[1],n[3]=t[3]):(e.push(t),n=t));return e}function Ae(r){for(var e=[],t=e,n=[],o,s,a=0,i=r.length;a<i;++a)switch(o=r[a],o[0]){case"#":case"^":t.push(o),n.push(o),t=o[4]=[];break;case"/":s=n.pop(),s[5]=o[2],t=n.length>0?n[n.length-1][4]:e;break;default:t.push(o)}return e}function M(r){this.string=r,this.tail=r,this.pos=0}M.prototype.eos=function(){return this.tail===""};M.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n};M.prototype.scanUntil=function(e){var t=this.tail.search(e),n;switch(t){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=n.length,n};function A(r,e){this.view=r,this.cache={".":this.view},this.parent=e}A.prototype.push=function(e){return new A(e,this)};A.prototype.lookup=function(e){var t=this.cache,n;if(t.hasOwnProperty(e))n=t[e];else{for(var o=this,s,a,i,u=!1;o;){if(e.indexOf(".")>0)for(s=o.view,a=e.split("."),i=0;s!=null&&i<a.length;)i===a.length-1&&(u=_(s,a[i])||ue(s,a[i])),s=s[a[i++]];else s=o.view[e],u=_(o.view,e);if(u){n=s;break}o=o.parent}t[e]=n}return O(n)&&(n=n.call(this.view)),n};function p(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}p.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};p.prototype.parse=function(e,t){var n=this.templateCache,o=e+":"+(t||h.tags).join(":"),s=typeof n<"u",a=s?n.get(o):void 0;return a==null&&(a=be(e,t),s&&n.set(o,a)),a};p.prototype.render=function(e,t,n,o){var s=this.getConfigTags(o),a=this.parse(e,s),i=t instanceof A?t:new A(t,void 0);return this.renderTokens(a,i,n,e,o)};p.prototype.renderTokens=function(e,t,n,o,s){for(var a="",i,u,l,f=0,d=e.length;f<d;++f)l=void 0,i=e[f],u=i[0],u==="#"?l=this.renderSection(i,t,n,o,s):u==="^"?l=this.renderInverted(i,t,n,o,s):u===">"?l=this.renderPartial(i,t,n,s):u==="&"?l=this.unescapedValue(i,t):u==="name"?l=this.escapedValue(i,t,s):u==="text"&&(l=this.rawValue(i)),l!==void 0&&(a+=l);return a};p.prototype.renderSection=function(e,t,n,o,s){var a=this,i="",u=t.lookup(e[1]);function l(m){return a.render(m,t,n,s)}if(u){if(W(u))for(var f=0,d=u.length;f<d;++f)i+=this.renderTokens(e[4],t.push(u[f]),n,o,s);else if(typeof u=="object"||typeof u=="string"||typeof u=="number")i+=this.renderTokens(e[4],t.push(u),n,o,s);else if(O(u)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");u=u.call(t.view,o.slice(e[3],e[5]),l),u!=null&&(i+=u)}else i+=this.renderTokens(e[4],t,n,o,s);return i}};p.prototype.renderInverted=function(e,t,n,o,s){var a=t.lookup(e[1]);if(!a||W(a)&&a.length===0)return this.renderTokens(e[4],t,n,o,s)};p.prototype.indentPartial=function(e,t,n){for(var o=t.replace(/[^ \t]/g,""),s=e.split(`
`),a=0;a<s.length;a++)s[a].length&&(a>0||!n)&&(s[a]=o+s[a]);return s.join(`
`)};p.prototype.renderPartial=function(e,t,n,o){if(n){var s=this.getConfigTags(o),a=O(n)?n(e[1]):n[e[1]];if(a!=null){var i=e[6],u=e[5],l=e[4],f=a;u==0&&l&&(f=this.indentPartial(a,l,i));var d=this.parse(f,s);return this.renderTokens(d,t,n,f,o)}}};p.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(n!=null)return n};p.prototype.escapedValue=function(e,t,n){var o=this.getConfigEscape(n)||h.escape,s=t.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===h.escape?String(s):o(s)};p.prototype.rawValue=function(e){return e[1]};p.prototype.getConfigTags=function(e){return W(e)?e:e&&typeof e=="object"?e.tags:void 0};p.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!W(e))return e.escape};var h={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(r){T.templateCache=r},get templateCache(){return T.templateCache}},T=new p;h.clearCache=function(){return T.clearCache()};h.parse=function(e,t){return T.parse(e,t)};h.render=function(e,t,n,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+ie(e)+'" was given as the first argument for mustache#render(template, view, partials)');return T.render(e,t,n,o)};h.escape=he;h.Scanner=M;h.Context=A;h.Writer=p;class Z{constructor(e,t){this.template=e,this.state=t,this.ast=h.parse(e)}getValue(){return this.value===void 0&&(this.value=h.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const n of this.getUsedVariables().values())t.push(this.state.onVariableChange(n).subscribe(()=>{const o=h.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const n of t)n.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const n of e){const o=n[0],s=n[1],a=n[4];["name","&","#","^"].includes(o)&&t.add(s),a!==void 0&&typeof a!="string"&&this.recursiveGetUsedVariables(a,t)}}}async function We(){var r;const e=await oe();for(const t of e){const n=(r=t.properties)!==null&&r!==void 0?r:[];for(const o of n){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new Z(o.value,WA.state);if(s.isPureString())continue;const a=s.getValue();await N(t.name,o.name,a),s.onChange(async i=>{await N(t.name,o.name,i)})}}}async function Se(){var r;const e=await E();for(const[t,n]of e.entries())if(n.type!=="objectgroup"){const o=(r=n.properties)!==null&&r!==void 0?r:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const a=new Z(s.value,WA.state);if(a.isPureString())continue;const i=a.getValue();q(t,s.name,i),a.onChange(u=>{q(t,s.name,u)})}}}async function N(r,e,t){console.log(r),(await WA.room.area.get(r)).setProperty(e,t)}function q(r,e,t){WA.room.setProperty(r,e,t),e==="visible"&&(t?WA.room.showLayer(r):WA.room.hideLayer(r))}let G,V=0,U=0;function z(r){if(WA.state[r.name]){let e=r.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.showLayer(t);e=r.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.hideLayer(t)}else{let e=r.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.hideLayer(t);e=r.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.showLayer(t)}}function Le(r){const e=r.properties.getString("openSound"),t=r.properties.getNumber("soundRadius");let n=1;if(t){const o=J(r.properties.mustGetString("openLayer").split(`
`));if(o>t)return;n=1-o/t}e&&WA.sound.loadSound(e).play({volume:n})}function Ce(r){const e=r.properties.getString("closeSound"),t=r.properties.getNumber("soundRadius");let n=1;if(t){const o=J(r.properties.mustGetString("closeLayer").split(`
`));if(o>t)return;n=1-o/t}e&&WA.sound.loadSound(e).play({volume:n})}function F(r){return r.map(e=>G.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function J(r){const e=F(r),t=Y(e),n=((t.right-t.left)/2+t.left)*32,o=((t.bottom-t.top)/2+t.top)*32;return Math.sqrt(Math.pow(V-n,2)+Math.pow(U-o,2))}function Te(r){WA.state.onVariableChange(r.name).subscribe(()=>{WA.state[r.name]?Le(r):Ce(r),z(r)}),z(r)}function Ee(r,e,t,n){const o=r.name;let s,a,i=!1;const u=t.getString("tag");let l=!0;u&&!WA.player.tags.includes(u)&&(l=!1);const f=!!u;function d(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=t.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=t.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function P(c){const v=Y(F(e.properties.mustGetString("closeLayer").split(`
`)));a=WA.room.website.create({name:"doorKeypad"+c,url:n+"/keypad.html#"+encodeURIComponent(c),position:{x:v.right*32,y:v.top*32,width:32*3,height:32*4},allowApi:!0})}function S(){a&&(WA.room.website.delete(a.name),a=void 0)}WA.room.onEnterLayer(o).subscribe(()=>{if(i=!0,t.getBoolean("autoOpen")&&l){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(f&&!l||!f)&&(t.getString("code")||t.getString("codeVariable"))){P(o);return}l&&(WA.state[e.name]?d():m())}),WA.room.onLeaveLayer(o).subscribe(()=>{i=!1,t.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),S()}),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!t.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),a&&WA.state[e.name]===!0&&S(),!t.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function Me(r){const e=r.properties.mustGetString("bellSound"),t=r.properties.getNumber("soundRadius");let n=1;if(t){const o=Math.sqrt(Math.pow(r.x-V,2)+Math.pow(r.y-U,2));if(o>t)return;n=1-o/t}WA.sound.loadSound(e).play({volume:n})}function Pe(r){WA.state[r.name]===void 0&&(WA.state[r.name]=0),WA.state.onVariableChange(r.name).subscribe(()=>{WA.state[r.name]&&Me(r)})}function Re(r,e,t){let n;const o=e.getString("bellPopup");WA.room.onEnterLayer(t).subscribe(()=>{var s;o?n=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[r]=WA.state[r]+1}}]):WA.state[r]=WA.state[r]+1}),WA.room.onLeaveLayer(t).subscribe(()=>{n&&(n.close(),n=void 0)})}async function ke(r){r=r??I;const e=await te();G=await E();for(const t of e.values())t.properties.get("door")&&Te(t),t.properties.get("bell")&&Pe(t);for(const t of G.values()){const n=new C(t.properties),o=n.getString("doorVariable");if(o&&t.type==="tilelayer"){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+t.name+'"');Ee(t,a,n,r)}const s=n.getString("bellVariable");s&&Re(s,n,t.name)}WA.player.onPlayerMove(t=>{V=t.x,U=t.y})}function Be(r,e){const t=r.getString("bindVariable");if(t){const n=r.get("enterValue"),o=r.get("leaveValue"),s=r.getString("triggerMessage"),a=r.getString("tag");xe(t,e,n,o,s,a)}}function xe(r,e,t,n,o,s){s&&!WA.player.tags.includes(s)||(t!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[r]=t)}),n!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[r]=n}))}async function Ge(){const r=await E();for(const e of r.values()){const t=new C(e.properties);Be(t,e.name)}}let K;async function Ie(r){const e=await WA.room.getTiledMap();r=r??I,K=await E();const t=e.layers.find(n=>n.name==="configuration");if(t){const o=new C(t.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(r+"/configuration.html",!0)});for(const s of K.values()){const a=new C(s.properties),i=a.getString("openConfig");i&&s.type==="tilelayer"&&Oe(i.split(","),s.name,a)}}}function Oe(r,e,t){let n;const o=t.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function a(){var u;n&&n.remove(),n=WA.ui.displayActionMessage({message:(u=t.getString("openConfigTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE or touch here to configure",callback:()=>j(r)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const u=t.getString("openConfigTrigger");s&&(u&&u==="onaction"?a():j(r))}),WA.room.onLeaveLayer(e).subscribe(()=>{n&&n.remove(),i()})}function Ve(){return WA.onInit().then(()=>{ke().catch(r=>console.error(r)),Ge().catch(r=>console.error(r)),Ie().catch(r=>console.error(r)),Se().catch(r=>console.error(r)),We().catch(r=>console.error(r))}).catch(r=>console.error(r))}let H;WA.onInit().then(()=>{WA.player.state.tutorialDone||je(),WA.room.onLeaveLayer("start").subscribe(()=>{WA.ui.modal.closeModal()}),WA.ui.actionBar.addButton({id:"map-btn",type:"action",imageSrc:"https://hugoaverty.github.io/map-overview/img/map.svg",toolTip:"Map overview",callback:o=>{console.log("Button map overview triggered",o),Ue()}}),WA.room.onEnterLayer("popup/popzone_private_office").subscribe(()=>{H=WA.ui.openPopup("popupPrivateOffice","Our private office serves as a restricted zone, exclusively accessible to our team members.",[{label:"Close",className:"primary",callback:o=>{o.close()}}])}),WA.room.onLeaveLayer("popup/popzone_private_office").subscribe(()=>{H.close()});const r=new Date,e=r.getHours()+":"+r.getMinutes();console.log("CURRENT TIME IS :"),console.log(e);const t=-(new Date().getTimezoneOffset()/60)-2;console.log("CURRENT UTC - UTC+2 = "+t);const n=r.getHours()-t;console.log("CURRENT TIME - UCT DIFF = "+n),n>=9&&n<=18?console.log(">>> OPEN <<<"):console.log(">>> CLOSED <<<"),Ve().then(()=>{console.log("Scripting API Extra ready")}).catch(o=>console.error(o))}).catch(r=>console.error(r));const Ue=()=>{WA.ui.modal.closeModal(),WA.ui.modal.openModal({src:"https://hugoaverty.github.io/map-overview/",allow:"fullscreen",title:"Map Overview",allowApi:!0,position:"center"})},je=()=>{console.info("Open the tutorial"),popupTutorial=WA.ui.modal.openModal({title:"Tutorial",src:"https://workadventure.github.io/scripting-api-extra/tutorialv1.html",allow:"fullscreen; clipboard-read; clipboard-write",allowApi:!0,position:"right"})};
