console.info("Roofs Script started successfully");WA.onInit().then(()=>{WA.room.area.onEnter("roof_conference_area").subscribe(()=>{B()}),WA.room.area.onEnter("roof_coworking_area").subscribe(()=>{B()}),WA.room.area.onEnter("roof_office_area").subscribe(()=>{B()}),WA.room.area.onLeave("roof_conference_area").subscribe(()=>{x()}),WA.room.area.onLeave("roof_coworking_area").subscribe(()=>{x()}),WA.room.area.onLeave("roof_office_area").subscribe(()=>{x()}),WA.room.area.onEnter("roof_meeting_area").subscribe(()=>{z()}),WA.room.area.onEnter("roof_show_area").subscribe(()=>{z()}),WA.room.area.onLeave("roof_meeting_area").subscribe(()=>{N()}),WA.room.area.onLeave("roof_show_area").subscribe(()=>{N()}),WA.room.area.onEnter("silentOffice_area").subscribe(()=>{WA.room.showLayer("silentOverlay")}),WA.room.area.onLeave("silentOffice_area").subscribe(()=>{WA.room.hideLayer("silentOverlay")})}).catch(t=>console.error(t));const B=()=>{WA.room.hideLayer("roof1"),WA.room.hideLayer("sign1")},x=()=>{WA.room.showLayer("roof1"),WA.room.showLayer("sign1")},N=()=>{WA.room.showLayer("roof2"),WA.room.showLayer("sign2")},z=()=>{WA.room.hideLayer("roof2"),WA.room.hideLayer("sign2")};console.info("Door Script started successfully");WA.onInit().then(()=>{WA.room.area.onEnter("zone_office_meeting").subscribe(()=>{WA.room.hideLayer("doors/door_office_meeting_closed"),WA.room.showLayer("doors/door_office_meeting_opened")}),WA.room.area.onLeave("zone_office_meeting").subscribe(()=>{WA.room.hideLayer("doors/door_office_meeting_opened"),WA.room.showLayer("doors/door_office_meeting_closed")})});class W{constructor(e){this.properties=e??[]}get(e){const r=this.properties.filter(n=>n.name===e).map(n=>n.value);if(r.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(r.length!==0)return r[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,r){const n=this.get(e);if(n!==void 0){if(r!=="json"&&typeof n!==r)throw new Error('Expected property "'+e+'" to have type "'+r+'"');return n}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,r){const n=this.get(e);if(n===void 0)throw new Error('Property "'+e+'" is missing');if(r!=="json"&&typeof n!==r)throw new Error('Expected property "'+e+'" to have type "'+r+'"');return n}getType(e){const r=this.properties.filter(n=>n.name===e).map(n=>n.type);if(r.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(r.length!==0)return r[0]}}const G="https://unpkg.com/@workadventure/scripting-api-extra@1.4.7/dist";class ue{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new W(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function q(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(G+"/configuration.html"+e)}async function le(t,e){const r=await WA.room.getTiledMap(),n=new Map;return te(r.layers,n,t,e),n}function te(t,e,r,n){for(const o of t)if(o.type==="objectgroup"){for(const a of o.objects)if(a.type==="variable"||a.class==="variable"){if(r&&o.name!==r||n&&!n.includes(a.name))continue;e.set(a.name,new ue(a))}}else o.type==="group"&&te(o.layers,e,r,n)}let V;async function M(){return V===void 0&&(V=fe()),V}async function fe(){return pe(await WA.room.getTiledMap())}function pe(t){const e=new Map;return re(t.layers,"",e),e}function re(t,e,r){for(const n of t)n.type==="group"?re(n.layers,e+n.name+"/",r):(n.name=e+n.name,r.set(n.name,n))}async function ne(){const t=await M(),e=[];for(const r of t.values())if(r.type==="objectgroup")for(const n of r.objects)(n.type==="area"||n.class==="area")&&e.push(n);return e}function he(t){let e=1/0,r=1/0,n=0,o=0;const a=t.data;if(typeof a=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<t.height;s++)for(let i=0;i<t.width;i++)a[i+s*t.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),r=Math.min(r,s),n=Math.max(n,s));return{top:r,left:e,right:o+1,bottom:n+1}}function oe(t){let e=1/0,r=1/0,n=0,o=0;for(const a of t){const s=he(a);s.left<e&&(e=s.left),s.top<r&&(r=s.top),s.right>o&&(o=s.right),s.bottom>n&&(n=s.bottom)}return{top:r,left:e,right:o,bottom:n}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ge=Object.prototype.toString,L=Array.isArray||function(e){return ge.call(e)==="[object Array]"};function I(t){return typeof t=="function"}function de(t){return L(t)?"array":typeof t}function O(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function K(t,e){return t!=null&&typeof t=="object"&&e in t}function ye(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var me=RegExp.prototype.test;function ve(t,e){return me.call(t,e)}var be=/\S/;function Ae(t){return!ve(be,t)}var we={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function We(t){return String(t).replace(/[&<>"'`=\/]/g,function(r){return we[r]})}var Se=/\s*/,Le=/\s+/,$=/\s*=/,Ce=/\s*\}/,_e=/#|\^|\/|>|\{|&|=|!/;function Ee(t,e){if(!t)return[];var r=!1,n=[],o=[],a=[],s=!1,i=!1,c="",l=0;function p(){if(s&&!i)for(;a.length;)delete o[a.pop()];else a=[];s=!1,i=!1}var d,m,T;function C(A){if(typeof A=="string"&&(A=A.split(Le,2)),!L(A)||A.length!==2)throw new Error("Invalid tags: "+A);d=new RegExp(O(A[0])+"\\s*"),m=new RegExp("\\s*"+O(A[1])),T=new RegExp("\\s*"+O("}"+A[1]))}C(e||g.tags);for(var f=new P(t),v,u,y,_,k,w;!f.eos();){if(v=f.pos,y=f.scanUntil(d),y)for(var R=0,ce=y.length;R<ce;++R)_=y.charAt(R),Ae(_)?(a.push(o.length),c+=_):(i=!0,r=!0,c+=" "),o.push(["text",_,v,v+1]),v+=1,_===`
`&&(p(),c="",l=0,r=!1);if(!f.scan(d))break;if(s=!0,u=f.scan(_e)||"name",f.scan(Se),u==="="?(y=f.scanUntil($),f.scan($),f.scanUntil(m)):u==="{"?(y=f.scanUntil(T),f.scan(Ce),f.scanUntil(m),u="&"):y=f.scanUntil(m),!f.scan(m))throw new Error("Unclosed tag at "+f.pos);if(u==">"?k=[u,y,v,f.pos,c,l,r]:k=[u,y,v,f.pos],l++,o.push(k),u==="#"||u==="^")n.push(k);else if(u==="/"){if(w=n.pop(),!w)throw new Error('Unopened section "'+y+'" at '+v);if(w[1]!==y)throw new Error('Unclosed section "'+w[1]+'" at '+v)}else u==="name"||u==="{"||u==="&"?i=!0:u==="="&&C(y)}if(p(),w=n.pop(),w)throw new Error('Unclosed section "'+w[1]+'" at '+f.pos);return Pe(Me(o))}function Me(t){for(var e=[],r,n,o=0,a=t.length;o<a;++o)r=t[o],r&&(r[0]==="text"&&n&&n[0]==="text"?(n[1]+=r[1],n[3]=r[3]):(e.push(r),n=r));return e}function Pe(t){for(var e=[],r=e,n=[],o,a,s=0,i=t.length;s<i;++s)switch(o=t[s],o[0]){case"#":case"^":r.push(o),n.push(o),r=o[4]=[];break;case"/":a=n.pop(),a[5]=o[2],r=n.length>0?n[n.length-1][4]:e;break;default:r.push(o)}return e}function P(t){this.string=t,this.tail=t,this.pos=0}P.prototype.eos=function(){return this.tail===""};P.prototype.scan=function(e){var r=this.tail.match(e);if(!r||r.index!==0)return"";var n=r[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n};P.prototype.scanUntil=function(e){var r=this.tail.search(e),n;switch(r){case-1:n=this.tail,this.tail="";break;case 0:n="";break;default:n=this.tail.substring(0,r),this.tail=this.tail.substring(r)}return this.pos+=n.length,n};function S(t,e){this.view=t,this.cache={".":this.view},this.parent=e}S.prototype.push=function(e){return new S(e,this)};S.prototype.lookup=function(e){var r=this.cache,n;if(r.hasOwnProperty(e))n=r[e];else{for(var o=this,a,s,i,c=!1;o;){if(e.indexOf(".")>0)for(a=o.view,s=e.split("."),i=0;a!=null&&i<s.length;)i===s.length-1&&(c=K(a,s[i])||ye(a,s[i])),a=a[s[i++]];else a=o.view[e],c=K(o.view,e);if(c){n=a;break}o=o.parent}r[e]=n}return I(n)&&(n=n.call(this.view)),n};function h(){this.templateCache={_cache:{},set:function(e,r){this._cache[e]=r},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}h.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};h.prototype.parse=function(e,r){var n=this.templateCache,o=e+":"+(r||g.tags).join(":"),a=typeof n<"u",s=a?n.get(o):void 0;return s==null&&(s=Ee(e,r),a&&n.set(o,s)),s};h.prototype.render=function(e,r,n,o){var a=this.getConfigTags(o),s=this.parse(e,a),i=r instanceof S?r:new S(r,void 0);return this.renderTokens(s,i,n,e,o)};h.prototype.renderTokens=function(e,r,n,o,a){for(var s="",i,c,l,p=0,d=e.length;p<d;++p)l=void 0,i=e[p],c=i[0],c==="#"?l=this.renderSection(i,r,n,o,a):c==="^"?l=this.renderInverted(i,r,n,o,a):c===">"?l=this.renderPartial(i,r,n,a):c==="&"?l=this.unescapedValue(i,r):c==="name"?l=this.escapedValue(i,r,a):c==="text"&&(l=this.rawValue(i)),l!==void 0&&(s+=l);return s};h.prototype.renderSection=function(e,r,n,o,a){var s=this,i="",c=r.lookup(e[1]);function l(m){return s.render(m,r,n,a)}if(c){if(L(c))for(var p=0,d=c.length;p<d;++p)i+=this.renderTokens(e[4],r.push(c[p]),n,o,a);else if(typeof c=="object"||typeof c=="string"||typeof c=="number")i+=this.renderTokens(e[4],r.push(c),n,o,a);else if(I(c)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");c=c.call(r.view,o.slice(e[3],e[5]),l),c!=null&&(i+=c)}else i+=this.renderTokens(e[4],r,n,o,a);return i}};h.prototype.renderInverted=function(e,r,n,o,a){var s=r.lookup(e[1]);if(!s||L(s)&&s.length===0)return this.renderTokens(e[4],r,n,o,a)};h.prototype.indentPartial=function(e,r,n){for(var o=r.replace(/[^ \t]/g,""),a=e.split(`
`),s=0;s<a.length;s++)a[s].length&&(s>0||!n)&&(a[s]=o+a[s]);return a.join(`
`)};h.prototype.renderPartial=function(e,r,n,o){if(n){var a=this.getConfigTags(o),s=I(n)?n(e[1]):n[e[1]];if(s!=null){var i=e[6],c=e[5],l=e[4],p=s;c==0&&l&&(p=this.indentPartial(s,l,i));var d=this.parse(p,a);return this.renderTokens(d,r,n,p,o)}}};h.prototype.unescapedValue=function(e,r){var n=r.lookup(e[1]);if(n!=null)return n};h.prototype.escapedValue=function(e,r,n){var o=this.getConfigEscape(n)||g.escape,a=r.lookup(e[1]);if(a!=null)return typeof a=="number"&&o===g.escape?String(a):o(a)};h.prototype.rawValue=function(e){return e[1]};h.prototype.getConfigTags=function(e){return L(e)?e:e&&typeof e=="object"?e.tags:void 0};h.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!L(e))return e.escape};var g={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){E.templateCache=t},get templateCache(){return E.templateCache}},E=new h;g.clearCache=function(){return E.clearCache()};g.parse=function(e,r){return E.parse(e,r)};g.render=function(e,r,n,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+de(e)+'" was given as the first argument for mustache#render(template, view, partials)');return E.render(e,r,n,o)};g.escape=We;g.Scanner=P;g.Context=S;g.Writer=h;class ae{constructor(e,r){this.template=e,this.state=r,this.ast=g.parse(e)}getValue(){return this.value===void 0&&(this.value=g.render(this.template,this.state)),this.value}onChange(e){const r=[];for(const n of this.getUsedVariables().values())r.push(this.state.onVariableChange(n).subscribe(()=>{const o=g.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const n of r)n.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,r){for(const n of e){const o=n[0],a=n[1],s=n[4];["name","&","#","^"].includes(o)&&r.add(a),s!==void 0&&typeof s!="string"&&this.recursiveGetUsedVariables(s,r)}}}async function Te(){var t;const e=await ne();for(const r of e){const n=(t=r.properties)!==null&&t!==void 0?t:[];for(const o of n){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const a=new ae(o.value,WA.state);if(a.isPureString())continue;const s=a.getValue();await Y(r.name,o.name,s),a.onChange(async i=>{await Y(r.name,o.name,i)})}}}async function ke(){var t;const e=await M();for(const[r,n]of e.entries())if(n.type!=="objectgroup"){const o=(t=n.properties)!==null&&t!==void 0?t:[];for(const a of o){if(a.type==="int"||a.type==="bool"||a.type==="object"||typeof a.value!="string")continue;const s=new ae(a.value,WA.state);if(s.isPureString())continue;const i=s.getValue();H(r,a.name,i),s.onChange(c=>{H(r,a.name,c)})}}}async function Y(t,e,r){console.log(t),(await WA.room.area.get(t)).setProperty(e,r)}function H(t,e,r){WA.room.setProperty(t,e,r),e==="visible"&&(r?WA.room.showLayer(t):WA.room.hideLayer(t))}let j,D=0,U=0;function X(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const r of e.split(`
`))WA.room.showLayer(r);e=t.properties.mustGetString("closeLayer");for(const r of e.split(`
`))WA.room.hideLayer(r)}else{let e=t.properties.mustGetString("openLayer");for(const r of e.split(`
`))WA.room.hideLayer(r);e=t.properties.mustGetString("closeLayer");for(const r of e.split(`
`))WA.room.showLayer(r)}}function Re(t){const e=t.properties.getString("openSound"),r=t.properties.getNumber("soundRadius");let n=1;if(r){const o=ie(t.properties.mustGetString("openLayer").split(`
`));if(o>r)return;n=1-o/r}e&&WA.sound.loadSound(e).play({volume:n})}function Be(t){const e=t.properties.getString("closeSound"),r=t.properties.getNumber("soundRadius");let n=1;if(r){const o=ie(t.properties.mustGetString("closeLayer").split(`
`));if(o>r)return;n=1-o/r}e&&WA.sound.loadSound(e).play({volume:n})}function se(t){return t.map(e=>j.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function ie(t){const e=se(t),r=oe(e),n=((r.right-r.left)/2+r.left)*32,o=((r.bottom-r.top)/2+r.top)*32;return Math.sqrt(Math.pow(D-n,2)+Math.pow(U-o,2))}function xe(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?Re(t):Be(t),X(t)}),X(t)}function J(t,e,r,n){const o=t.name;let a,s,i=!1;const c=r.getString("tag");let l=!0;c&&!WA.player.tags.includes(c)&&(l=!1);const p=!!c;function d(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=r.getString("closeTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var u;a&&a.remove(),a=WA.ui.displayActionMessage({message:(u=r.getString("openTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function T(){let u;if(t.type==="tilelayer")u=oe(se(e.properties.mustGetString("closeLayer").split(`
`)));else{if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0)throw new Error(`Doorstep zone "${t.name}" is missing x, y, width or height`);u={top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}s=WA.room.website.create({name:"doorKeypad"+o,url:n+"/keypad.html#"+encodeURIComponent(o),position:{x:u.right*32,y:u.top*32,width:32*3,height:32*4},allowApi:!0})}function C(){s&&(WA.room.website.delete(s.name),s=void 0)}function f(){if(i=!0,r.getBoolean("autoOpen")&&l){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(p&&!l||!p)&&(r.getString("code")||r.getString("codeVariable"))){T();return}l&&(WA.state[e.name]?d():m())}function v(){i=!1,r.getBoolean("autoClose")&&(WA.state[e.name]=!1),a&&a.remove(),C()}t.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(f),WA.room.onLeaveLayer(o).subscribe(v)):(WA.room.area.onEnter(o).subscribe(f),WA.room.area.onLeave(o).subscribe(v)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!r.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),s&&WA.state[e.name]===!0&&C(),!r.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function Ve(t){const e=t.properties.mustGetString("bellSound"),r=t.properties.getNumber("soundRadius");let n=1;if(r){const o=Math.sqrt(Math.pow(t.x-D,2)+Math.pow(t.y-U,2));if(o>r)return;n=1-o/r}WA.sound.loadSound(e).play({volume:n})}function Oe(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Ve(t)})}function Q(t,e,r){let n;const o=e.getString("bellPopup");if(r.type==="tilelayer"){const a=r.name;WA.room.onEnterLayer(a).subscribe(()=>{var s;o?n=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(a).subscribe(()=>{n&&(n.close(),n=void 0)})}else{const a=r.name;WA.room.area.onEnter(a).subscribe(()=>{var s;o?n=WA.ui.openPopup(o,"",[{label:(s=e.getString("bellButtonText"))!==null&&s!==void 0?s:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.area.onLeave(a).subscribe(()=>{n&&(n.close(),n=void 0)})}}async function je(t){t=t??G;const e=await le();j=await M();for(const r of e.values())r.properties.get("door")&&xe(r),r.properties.get("bell")&&Oe(r);for(const r of j.values()){const n=new W(r.properties),o=n.getString("doorVariable");if(o&&r.type==="tilelayer"){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+r.name+'"');J(r,s,n,t)}const a=n.getString("bellVariable");a&&r.type==="tilelayer"&&Q(a,n,r)}for(const r of await ne()){const n=new W(r.properties),o=n.getString("doorVariable");if(o){const s=e.get(o);if(s===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+r.name+'"');J(r,s,n,t)}const a=n.getString("bellVariable");a&&Q(a,n,r)}WA.player.onPlayerMove(r=>{D=r.x,U=r.y})}function Ge(t,e){const r=t.getString("bindVariable");if(r){const n=t.get("enterValue"),o=t.get("leaveValue"),a=t.getString("triggerMessage"),s=t.getString("tag");Ie(r,e,n,o,a,s)}}function Ie(t,e,r,n,o,a){a&&!WA.player.tags.includes(a)||(r!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[t]=r)}),n!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=n}))}async function De(){const t=await M();for(const e of t.values()){const r=new W(e.properties);Ge(r,e.name)}}let F;async function Ue(t){const e=await WA.room.getTiledMap();t=t??G,F=await M();const r=e.layers.find(n=>n.name==="configuration");if(r){const o=new W(r.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const a of F.values()){const s=new W(a.properties),i=s.getString("openConfig");i&&a.type==="tilelayer"&&Ne(i.split(","),a.name,s)}}}function Ne(t,e,r){let n;const o=r.getString("openConfigAdminTag");let a=!0;o&&!WA.player.tags.includes(o)&&(a=!1);function s(){var c;n&&n.remove(),n=WA.ui.displayActionMessage({message:(c=r.getString("openConfigTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE or touch here to configure",callback:()=>q(t)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const c=r.getString("openConfigTrigger");a&&(c&&c==="onaction"?s():q(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{n&&n.remove(),i()})}function ze(){return WA.onInit().then(()=>{je().catch(t=>console.error(t)),De().catch(t=>console.error(t)),Ue().catch(t=>console.error(t)),ke().catch(t=>console.error(t)),Te().catch(t=>console.error(t))}).catch(t=>console.error(t))}let b,Z;(async()=>(await WA.onInit(),await WA.players.configureTracking({players:!0,movement:!1}),await WA.player.getPosition()))();WA.onInit().then(()=>{WA.player.tags.includes("admin")&&WA.player.setOutlineColor(27,42,65),WA.player.state.tutorialDone||qe(),WA.room.onLeaveLayer("start").subscribe(()=>{WA.ui.modal.closeModal()}),WA.ui.actionBar.addButton({id:"map-btn",type:"action",imageSrc:"https://hugoaverty.github.io/map-overview/img/map.svg",toolTip:"Map overview",callback:()=>{ee()}}),WA.room.area.onEnter("popupPrivateOffice_area").subscribe(()=>{b||(b=WA.ui.openPopup("popupPrivateOffice","Our private office serves as a restricted zone, exclusively accessible to our team members.",[{label:"Close",className:"primary",callback:()=>{b==null||b.close(),b=null}}]))}),WA.room.area.onLeave("popupPrivateOffice_area").subscribe(()=>{b==null||b.close(),b=null}),WA.room.area.onEnter("zone_map_overview").subscribe(()=>{Z=WA.ui.displayActionMessage({message:`Press 'SPACE' to display map overview and move to a specific zone. 
 
 You can acces to map overview directly on the bottom nav !`,callback:()=>{ee()}})}),WA.room.area.onLeave("zone_map_overview").subscribe(()=>{Z.remove(),WA.ui.modal.closeModal()}),ze().then(()=>{console.info("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(t=>console.error(t));const ee=async()=>{WA.ui.modal.closeModal();const t=await WA.player.getPosition();WA.ui.modal.openModal({src:"https://hugoaverty.github.io/map-overview/index.html?x="+t.x+"&y="+t.y,allow:"fullscreen",title:"Map Overview",allowApi:!0,position:"center"})},qe=()=>{console.info("Open the tutorial"),WA.ui.modal.openModal({title:"Tutorial",src:"https://workadventure.github.io/scripting-api-extra/tutorialv1.html",allow:"fullscreen; clipboard-read; clipboard-write",allowApi:!0,position:"right"})};
