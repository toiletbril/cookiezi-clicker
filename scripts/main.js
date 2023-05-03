'use strict';const e=document.getElementById("amount"),h=document.getElementById("pps_shop_items"),l=document.getElementById("general_shop_items"),m=document.getElementById("tap_power"),n=document.getElementById("pps"),p=document.getElementById("upgrade_count"),q=document.getElementById("change_keys"),u=document.getElementById("keys"),x=document.getElementById("bpm");y("All elements are not null",!!e&&!!h&&!!l&&!!m&&!!p&&!!q&&!!u&&!!x);function y(a,b){if(!b)throw Error("Assertion failed: "+a);}
function z(a,b){var c=A.i.u;return`Tap ${0>=c?"?":a.toUpperCase()}/${1>=c?"?":b.toUpperCase()} to gain pp.`}function B(a,b){return a.toFixed(b).replace(/\B(?=(\d{3})+(?!\d))/g,",")}
function C(a,b,c,d){const g=document.createElement("li"),f=document.createElement("button"),k=document.createElement("div"),G=document.createElement("div"),v=document.createElement("div"),r=document.createElement("div"),t=document.createElement("p"),w=document.createElement("p"),O=document.createTextNode(a.name),P=document.createTextNode(B(a.j,0)+"pp");b=document.createTextNode(b);const Q=document.createTextNode(a.o);f.onclick=d;a=c+a.id;g.setAttribute("id","list_"+a);f.setAttribute("id","button_"+
a);w.setAttribute("id","p_stat_"+a);t.setAttribute("id","p_"+a);r.setAttribute("id","desc_div_"+a);v.setAttribute("id","cost_div_"+a);k.setAttribute("id","div_"+a);t.setAttribute("class","description");v.appendChild(P);G.appendChild(O);f.appendChild(G);f.appendChild(v);w.appendChild(b);t.appendChild(Q);r.appendChild(w);r.appendChild(t);"pps_item"==c&&(c=document.createElement("p"),c.setAttribute("id","p_producing_"+a),r.appendChild(c));k.appendChild(f);k.appendChild(r);g.appendChild(k);return g}
function D(a){alert(`${"To be fair, you have to have a very high IQ to understand technical mapping. The SV changes are extremely subtle, and without a solid grasp of music theory most of the quality will go over a typical player's head. There's also Monstrata's triangular outlook, which is deftly woven into his mapping - his personal philosophy draws heavily from Pishifat literature, for instance. The fans understand this stuff; they have the intellectual capacity to truly appreciate the Depths of these patterns, to realize that they're not just high quality- they say something deep about MAPPING. As a consequence people who dislike technical maps truly ARE idiots- of course they wouldn't appreciate, for instance, the quality in Sotarks' existencial catchphrase \"this needs more overdone jumps,\" which itself is a Cryptic reference to Monstrata's map quaver. I'm smirking right now just imagining one of those addlepated simpletons scratching their heads in confusion as Natsu's genius unfolds itself on their computer screens. What fools... how I pity them. \ud83d\ude02 And yes by the way, I DO have a Monstrata slider butterfly tattoo. And no, you cannot see it. It's for the ladies' eyes only- And even they have to demonstrate that they're within 5 PP points of my own (preferably lower) beforehand."}\n\nYou completed the game in ${Math.floor(((new Date).getTime()-a)/
1E3/60)} minutes.\nThanks for playing.`)}let E=0,F=0;function H(a){const b=Array(a.g.length).fill(1);for(const d in a.m){var c=parseInt(d,10);if(!1!==a.i[c]&&(c=a.m[c],"multiplier"===c.action.type))for(const g in c.action.v)b[c.action.v[g]]*=c.action.value}return b}function I(a){const b=H(a);y("multipliers is valid length",b.length===a.g.length);return a.h.map((c,d)=>c*a.g[d].s*b[d]).reduce((c,d)=>c+d)}
class J{constructor(){this.g=[{id:F++,name:"Keyboard button",o:"A button on an old keyboard.",j:80,s:.4},{id:F++,name:"Trackball",o:"A pointing device.",j:540,s:2.6,l:[{type:"has_pps_upgrade",item:0,amount:4}]},{id:F++,name:"Drill",o:"Drill, usually fitted with a driving tool attachment,                    now fitted with a keyboard.",j:2770,s:8,l:[{type:"has_pps_upgrade",item:1,amount:6}]},{id:F++,name:"Vaxei",o:"The following README will serve to document all of Vaxei's skins.",j:19E3,s:42,l:[{type:"has_pps_upgrade",
item:2,amount:6}]},{id:F++,name:"Cookiezi",o:"Shigetora, better known online as chocomint and formerly as Cookiezi,                    is a famous South Korean osu!standard player.",j:85E3,s:132,l:[{type:"has_pps_upgrade",item:3,amount:6}]},{id:F++,name:"Aetrna",o:"The.",j:396E3,s:1100,l:[{type:"has_pps_upgrade",item:4,amount:12}]}];this.m=[{id:E++,name:"Bateron switch",o:"You order some switches.",stat:"Keyboard buttons are twice more effective.",j:340,action:{type:"multiplier",v:[0],value:2},l:[{type:"has_pps_upgrade",
item:0,amount:5}]},{id:E++,name:"Spicy ramen",o:"You start to sweat.",stat:"+0.6 pp/tap",j:620,action:{type:"tap_power",value:.6}},{id:E++,name:"Mousepad",o:"Finally, less mouse drift.",stat:"+1.2 pp/tap",j:1800,action:{type:"tap_power",value:1.2},l:[{type:"has_upgrade",item:0}]},{id:E++,name:"Vacom toilet",o:"10 Reasons Why You Might Want a High-Tech Super Toilet.",stat:"+3.2 pp/tap",j:5600,action:{type:"tap_power",value:3.2},l:[{type:"has_upgrade",item:2}]},{id:E++,name:"Ultra lube",o:"You lube you keyboard.",
stat:"Keyboard buttons are twice more effective.",j:8040,action:{type:"multiplier",v:[0],value:2},l:[{type:"has_pps_upgrade",item:0,amount:12}]},{id:E++,name:"Power outlet",o:"The consequences of industrial revolution.",stat:"Trackball and drill become twice as effective.",j:15640,action:{type:"multiplier",v:[1,2],value:2},l:[{type:"has_pps_upgrade",item:1,amount:4},{type:"has_pps_upgrade",item:2,amount:2}]},{id:E++,name:"Mooting",o:"You finally receive your Mooting keyboard.",stat:"Click power is doubled.",
j:23200,action:{type:"tap_power_multiplier",value:2},l:[{type:"has_upgrade",item:5}]},{id:E++,name:"Sugar",o:"The generic name for sweet-tasting, soluble carbohydrates,                    many of which are used in food.",stat:"Vaxei becomes twice as effective.",j:164900,action:{type:"multiplier",v:[3],value:2},l:[{type:"has_pps_upgrade",item:3,amount:10}]},{id:E++,name:"Cookiezi comeback",o:"Chocomint's Made of Fire HDDT 98.54 full combo.                    Without a doubt, one of the most impressive plays ever set in osu! history,                    but one that takes some experience to appreciate fully.",
stat:"Cookiezi becomes twice as effective.",j:279E3,action:{type:"multiplier",v:[4],value:2},l:[{type:"has_pps_upgrade",item:4,amount:3}]},{id:E++,name:"Rank #1",o:"Hopefully this game has given you some osu! of all time.",stat:"...",j:169E4,action:{type:"game_end",action:D},l:[{type:"has_upgrade",item:8,amount:2}]}];this.h=Array(this.g.length).fill(0);this.i=Array(this.m.length).fill(!1)}}
function K(a){var b=L;return function(){if(b.m<a.j)alert('Not enough pp to buy "'+a.name+'" :(');else{b.m-=a.j;var c=b.g;c.h[a.id]+=1;c.g[a.id].j=Math.floor(1.15*c.g[a.id].j);M(b);N(b);b.B=I(b.g)}}}
function R(a){var b=L;return function(){if(b.m<a.j)alert('Not enough pp to buy "'+a.name+'" :(');else{b.m-=a.j;var c=b.g;document.getElementById("button_item"+a.id).disabled=!0;c.i[a.id]=!0;"game_end"===a.action.type&&a.action.action(b.J);M(b);N(b);c=b.g;let g=1,f=1;for(const k in c.i){var d=parseInt(k,10);if(!1!==c.i[d])switch(d=c.m[d],d?.action.type){case "tap_power":g+=d.action.value;break;case "tap_power_multiplier":f*=d.action.value}}b.G=g*f;b.B=I(b.g)}}}
function S(a,b){for(const c in b.l){const d=b.l[parseInt(c,10)];switch(d.type){case "has_pps":if(a.B<d.value)return!1;break;case "has_pps_upgrade":y("has_pps_upgrade value is not out of range",d.item<a.g.h.length);if(a.g.h[d.item]<(d.amount||1))return!1;break;case "has_current_pp":if(a.m<d.value)return!1;break;case "has_upgrade":y("has_upgrade value is not out of range",d.item<a.g.i.length);if(!a.g.i[d.item])return!1;break;case "total_pp":if(a.total<d.value)return!1}}return!0}
function M(a){for(const c in a.g.i){var b=parseInt(c,10);const d=a.g.m[b];a.g.i[b]&&(document.getElementById("button_item"+d.id).disabled=!0);b=document.getElementById("list_item"+d.id);d.l&&b.hidden?S(a,d)&&(b.hidden=!1):b.hidden=!1}}
function N(a){const b=H(a.g);for(const g in a.g.h){const f=a.g.g[parseInt(g,10)];var c=document.getElementById("cost_div_pps_item"+f.id);const k=document.getElementById("p_stat_pps_item"+f.id);var d=a.g.h[f.id];c.textContent=`${B(f.j,0)}${"pp"}`;k.textContent=`+${B(f.s*b[f.id],1)} ${"pp"}/s`;0<d&&(c=document.getElementById("p_producing_pps_item"+f.id),d=`You have ${d}, producing ${B(f.s*d*b[f.id],1)} ${"pp"}/s`,c.textContent=d);d=document.getElementById("list_pps_item"+f.id);f.l&&d.hidden?S(a,f)&&
(d.hidden=!1):d.hidden=!1}}function T(a){var b=A;a.D||(a.D=!0,b.h.A+=1,U(b,b.G),b.h.F=!0,clearInterval(b.h.I),b.h.I=setTimeout(()=>{b.h.F=!1},2E3))}function U(a,b){a.total+=b;a.m+=b}function V(a){const b=44*a.h.A/a.h.C;x.textContent=0<b?Math.floor(60*b/4)+" BPM":":3c";e.textContent=B(Math.floor(a.m),0)+"pp";n.textContent="pp/s: "+B(a.B,1);m.textContent="pp/tap: "+a.G;p.textContent="Items bought: "+a.g.h.reduce((c,d)=>c+d,0)}
class W{constructor(){this.H=0;this.h={I:0,F:!1,A:0,C:40};this.total=this.m=0;this.G=1;this.B=0;this.J=(new Date).getTime();this.g=new J;this.i={keys:[{key:"z",D:!1},{key:"x",D:!1}],u:-1};y("settings.keys is of KEY_COUNT size",2===this.i.keys.length)}}const A=new W;var L=A;for(const a in L.g.g){const b=L.g.g[parseInt(a,10)],c=C(b,`+${b.s} ${"pp"}/s`,"pps_item",K(b));b.l&&(c.hidden=!0);h.appendChild(c)}
for(const a in L.g.m){const b=L.g.m[parseInt(a,10)],c=C(b,b.stat,"item",R(b));b.l&&(c.hidden=!0);l.appendChild(c)}setInterval(()=>{var a=A;U(a,a.B/40);a.h.F?a.h.C+=1:40!=a.h.C?(a.h.A=Math.floor(a.h.A/a.h.C*44),a.h.C=40):0<a.h.A&&--a.h.A;V(a)},25);
document.addEventListener("keydown",a=>{const b=A.i.keys[0],c=A.i.keys[1];if(0<=A.i.u)A.i.keys[A.i.u].key=a.key,A.i.u+=1,u.textContent=z(b.key,c.key),2<=A.i.u&&(A.i.u=-1,q.disabled=!1,q.textContent="Change keys...");else switch(a.key.toLowerCase()){case b.key:T(b);break;case c.key:T(c)}});document.addEventListener("keyup",a=>{const b=A.i.keys[0],c=A.i.keys[1];switch(a.key.toLowerCase()){case b.key:b.D=!1;break;case c.key:c.D=!1}});
q.onclick=()=>{const a=A.i.keys[0],b=A.i.keys[1];A.i.u=0;q.disabled=!0;u.textContent=z(a.key,b.key);q.textContent="Press a new key..."};window.onfocus=()=>{const a=(new Date).getTime()-A.H;1E3<a&&U(A,a/1E3*A.B)};window.onblur=()=>{A.H=(new Date).getTime()};
