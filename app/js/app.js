/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;

return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){
return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});

try {
    $ = jQuery = module.exports;
    // If you want module.exports to be empty, uncomment:
    // module.exports = {};
} catch(e) {}
/*!
 * jQuery contextMenu v2.1.1 - Plugin for simple contextMenu handling
 *
 * Version: v2.1.1
 *
 * Authors: Björn Brala (SWIS.nl), Rodney Rehm, Addy Osmani (patches for FF)
 * Web: http://swisnl.github.io/jQuery-contextMenu/
 *
 * Copyright (c) 2011-2016 SWIS BV and contributors
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 * Date: 2016-04-08T15:05:16.920Z
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";function t(e){for(var t,n=e.split(/\s+/),a=[],o=0;t=n[o];o++)t=t.charAt(0).toUpperCase(),a.push(t);return a}function n(t){return t.id&&e('label[for="'+t.id+'"]').val()||t.name}function a(t,o,s){return s||(s=0),o.each(function(){var o,i,c=e(this),r=this,l=this.nodeName.toLowerCase();switch("label"===l&&c.find("input, textarea, select").length&&(o=c.text(),c=c.children().first(),r=c.get(0),l=r.nodeName.toLowerCase()),l){case"menu":i={name:c.attr("label"),items:{}},s=a(i.items,c.children(),s);break;case"a":case"button":i={name:c.text(),disabled:!!c.attr("disabled"),callback:function(){return function(){c.click()}}()};break;case"menuitem":case"command":switch(c.attr("type")){case void 0:case"command":case"menuitem":i={name:c.attr("label"),disabled:!!c.attr("disabled"),icon:c.attr("icon"),callback:function(){return function(){c.click()}}()};break;case"checkbox":i={type:"checkbox",disabled:!!c.attr("disabled"),name:c.attr("label"),selected:!!c.attr("checked")};break;case"radio":i={type:"radio",disabled:!!c.attr("disabled"),name:c.attr("label"),radio:c.attr("radiogroup"),value:c.attr("id"),selected:!!c.attr("checked")};break;default:i=void 0}break;case"hr":i="-------";break;case"input":switch(c.attr("type")){case"text":i={type:"text",name:o||n(r),disabled:!!c.attr("disabled"),value:c.val()};break;case"checkbox":i={type:"checkbox",name:o||n(r),disabled:!!c.attr("disabled"),selected:!!c.attr("checked")};break;case"radio":i={type:"radio",name:o||n(r),disabled:!!c.attr("disabled"),radio:!!c.attr("name"),value:c.val(),selected:!!c.attr("checked")};break;default:i=void 0}break;case"select":i={type:"select",name:o||n(r),disabled:!!c.attr("disabled"),selected:c.val(),options:{}},c.children().each(function(){i.options[this.value]=e(this).text()});break;case"textarea":i={type:"textarea",name:o||n(r),disabled:!!c.attr("disabled"),value:c.val()};break;case"label":break;default:i={type:"html",html:c.clone(!0)}}i&&(s++,t["key"+s]=i)}),s}e.support.htmlMenuitem="HTMLMenuItemElement"in window,e.support.htmlCommand="HTMLCommandElement"in window,e.support.eventSelectstart="onselectstart"in document.documentElement,e.ui&&e.widget||(e.cleanData=function(t){return function(n){var a,o,s;for(s=0;null!=n[s];s++){o=n[s];try{a=e._data(o,"events"),a&&a.remove&&e(o).triggerHandler("remove")}catch(i){}}t(n)}}(e.cleanData));var o=null,s=!1,i=e(window),c=0,r={},l={},u={},d={selector:null,appendTo:null,trigger:"right",autoHide:!1,delay:200,reposition:!0,classNames:{hover:"context-menu-hover",disabled:"context-menu-disabled",visible:"context-menu-visible",notSelectable:"context-menu-not-selectable",icon:"context-menu-icon",iconEdit:"context-menu-icon-edit",iconCut:"context-menu-icon-cut",iconCopy:"context-menu-icon-copy",iconPaste:"context-menu-icon-paste",iconDelete:"context-menu-icon-delete",iconAdd:"context-menu-icon-add",iconQuit:"context-menu-icon-quit"},determinePosition:function(t){if(e.ui&&e.ui.position)t.css("display","block").position({my:"center top",at:"center bottom",of:this,offset:"0 5",collision:"fit"}).css("display","none");else{var n=this.offset();n.top+=this.outerHeight(),n.left+=this.outerWidth()/2-t.outerWidth()/2,t.css(n)}},position:function(e,t,n){var a;if(!t&&!n)return void e.determinePosition.call(this,e.$menu);a="maintain"===t&&"maintain"===n?e.$menu.position():{top:n,left:t};var o=i.scrollTop()+i.height(),s=i.scrollLeft()+i.width(),c=e.$menu.outerHeight(),r=e.$menu.outerWidth();a.top+c>o&&(a.top-=c),a.top<0&&(a.top=0),a.left+r>s&&(a.left-=r),a.left<0&&(a.left=0),e.$menu.css(a)},positionSubmenu:function(t){if(e.ui&&e.ui.position)t.css("display","block").position({my:"left top",at:"right top",of:this,collision:"flipfit fit"}).css("display","");else{var n={top:0,left:this.outerWidth()};t.css(n)}},zIndex:1,animation:{duration:50,show:"slideDown",hide:"slideUp"},events:{show:e.noop,hide:e.noop},callback:null,items:{}},m={timer:null,pageX:null,pageY:null},p=function(e){for(var t=0,n=e;;)if(t=Math.max(t,parseInt(n.css("z-index"),10)||0),n=n.parent(),!n||!n.length||"html body".indexOf(n.prop("nodeName").toLowerCase())>-1)break;return t},f={abortevent:function(e){e.preventDefault(),e.stopImmediatePropagation()},contextmenu:function(t){var n=e(this);if("right"===t.data.trigger&&(t.preventDefault(),t.stopImmediatePropagation()),!("right"!==t.data.trigger&&"demand"!==t.data.trigger&&t.originalEvent||!(void 0===t.mouseButton||!t.data||"left"===t.data.trigger&&0===t.mouseButton||"right"===t.data.trigger&&2===t.mouseButton)||n.hasClass("context-menu-active")||n.hasClass("context-menu-disabled"))){if(o=n,t.data.build){var a=t.data.build(o,t);if(a===!1)return;if(t.data=e.extend(!0,{},d,t.data,a||{}),!t.data.items||e.isEmptyObject(t.data.items))throw window.console&&(console.error||console.log).call(console,"No items specified to show in contextMenu"),new Error("No Items specified");t.data.$trigger=o,h.create(t.data)}var s=!1;for(var i in t.data.items)if(t.data.items.hasOwnProperty(i)){var c;c=e.isFunction(t.data.items[i].visible)?t.data.items[i].visible.call(e(t.currentTarget),i,t.data):"undefined"!=typeof i.visible?t.data.items[i].visible===!0:!0,c&&(s=!0)}if(s){var r=e(null===t.data.appendTo?"body":t.data.appendTo),l=t.target||t.srcElement||t.originalTarget;void 0!==t.offsetX&&void 0!==t.offsetY?h.show.call(n,t.data,e(l).offset().left-r.offset().left+t.offsetX,e(l).offset().top-r.offset().top+t.offsetY):h.show.call(n,t.data,t.pageX,t.pageY)}}},click:function(t){t.preventDefault(),t.stopImmediatePropagation(),e(this).trigger(e.Event("contextmenu",{data:t.data,pageX:t.pageX,pageY:t.pageY}))},mousedown:function(t){var n=e(this);o&&o.length&&!o.is(n)&&o.data("contextMenu").$menu.trigger("contextmenu:hide"),2===t.button&&(o=n.data("contextMenuActive",!0))},mouseup:function(t){var n=e(this);n.data("contextMenuActive")&&o&&o.length&&o.is(n)&&!n.hasClass("context-menu-disabled")&&(t.preventDefault(),t.stopImmediatePropagation(),o=n,n.trigger(e.Event("contextmenu",{data:t.data,pageX:t.pageX,pageY:t.pageY}))),n.removeData("contextMenuActive")},mouseenter:function(t){var n=e(this),a=e(t.relatedTarget),s=e(document);a.is(".context-menu-list")||a.closest(".context-menu-list").length||o&&o.length||(m.pageX=t.pageX,m.pageY=t.pageY,m.data=t.data,s.on("mousemove.contextMenuShow",f.mousemove),m.timer=setTimeout(function(){m.timer=null,s.off("mousemove.contextMenuShow"),o=n,n.trigger(e.Event("contextmenu",{data:m.data,pageX:m.pageX,pageY:m.pageY}))},t.data.delay))},mousemove:function(e){m.pageX=e.pageX,m.pageY=e.pageY},mouseleave:function(t){var n=e(t.relatedTarget);if(!n.is(".context-menu-list")&&!n.closest(".context-menu-list").length){try{clearTimeout(m.timer)}catch(t){}m.timer=null}},layerClick:function(t){var n,a,o=e(this),s=o.data("contextMenuRoot"),c=t.button,r=t.pageX,l=t.pageY;t.preventDefault(),t.stopImmediatePropagation(),setTimeout(function(){var o,u="left"===s.trigger&&0===c||"right"===s.trigger&&2===c;if(document.elementFromPoint&&s.$layer&&(s.$layer.hide(),n=document.elementFromPoint(r-i.scrollLeft(),l-i.scrollTop()),s.$layer.show()),s.reposition&&u)if(document.elementFromPoint){if(s.$trigger.is(n)||s.$trigger.has(n).length)return void s.position.call(s.$trigger,s,r,l)}else if(a=s.$trigger.offset(),o=e(window),a.top+=o.scrollTop(),a.top<=t.pageY&&(a.left+=o.scrollLeft(),a.left<=t.pageX&&(a.bottom=a.top+s.$trigger.outerHeight(),a.bottom>=t.pageY&&(a.right=a.left+s.$trigger.outerWidth(),a.right>=t.pageX))))return void s.position.call(s.$trigger,s,r,l);n&&u&&s.$trigger.one("contextmenu:hidden",function(){e(n).contextMenu({x:r,y:l,button:c})}),s.$menu.trigger("contextmenu:hide")},50)},keyStop:function(e,t){t.isInput||e.preventDefault(),e.stopPropagation()},key:function(e){var t={};o&&(t=o.data("contextMenu")||{}),void 0===t.zIndex&&(t.zIndex=0);var n=0,a=function(e){""!==e.style.zIndex?n=e.style.zIndex:null!==e.offsetParent&&void 0!==e.offsetParent?a(e.offsetParent):null!==e.parentElement&&void 0!==e.parentElement&&a(e.parentElement)};if(a(e.target),!(n>t.zIndex)){switch(e.keyCode){case 9:case 38:if(f.keyStop(e,t),t.isInput){if(9===e.keyCode&&e.shiftKey)return e.preventDefault(),t.$selected&&t.$selected.find("input, textarea, select").blur(),void t.$menu.trigger("prevcommand");if(38===e.keyCode&&"checkbox"===t.$selected.find("input, textarea, select").prop("type"))return void e.preventDefault()}else if(9!==e.keyCode||e.shiftKey)return void t.$menu.trigger("prevcommand");break;case 40:if(f.keyStop(e,t),!t.isInput)return void t.$menu.trigger("nextcommand");if(9===e.keyCode)return e.preventDefault(),t.$selected&&t.$selected.find("input, textarea, select").blur(),void t.$menu.trigger("nextcommand");if(40===e.keyCode&&"checkbox"===t.$selected.find("input, textarea, select").prop("type"))return void e.preventDefault();break;case 37:if(f.keyStop(e,t),t.isInput||!t.$selected||!t.$selected.length)break;if(!t.$selected.parent().hasClass("context-menu-root")){var s=t.$selected.parent().parent();return t.$selected.trigger("contextmenu:blur"),void(t.$selected=s)}break;case 39:if(f.keyStop(e,t),t.isInput||!t.$selected||!t.$selected.length)break;var i=t.$selected.data("contextMenu")||{};if(i.$menu&&t.$selected.hasClass("context-menu-submenu"))return t.$selected=null,i.$selected=null,void i.$menu.trigger("nextcommand");break;case 35:case 36:return t.$selected&&t.$selected.find("input, textarea, select").length?void 0:((t.$selected&&t.$selected.parent()||t.$menu).children(":not(."+t.classNames.disabled+", ."+t.classNames.notSelectable+")")[36===e.keyCode?"first":"last"]().trigger("contextmenu:focus"),void e.preventDefault());case 13:if(f.keyStop(e,t),t.isInput){if(t.$selected&&!t.$selected.is("textarea, select"))return void e.preventDefault();break}return void("undefined"!=typeof t.$selected&&null!==t.$selected&&t.$selected.trigger("mouseup"));case 32:case 33:case 34:return void f.keyStop(e,t);case 27:return f.keyStop(e,t),void t.$menu.trigger("contextmenu:hide");default:var c=String.fromCharCode(e.keyCode).toUpperCase();if(t.accesskeys&&t.accesskeys[c])return void t.accesskeys[c].$node.trigger(t.accesskeys[c].$menu?"contextmenu:focus":"mouseup")}e.stopPropagation(),"undefined"!=typeof t.$selected&&null!==t.$selected&&t.$selected.trigger(e)}},prevItem:function(t){t.stopPropagation();var n=e(this).data("contextMenu")||{},a=e(this).data("contextMenuRoot")||{};if(n.$selected){var o=n.$selected;n=n.$selected.parent().data("contextMenu")||{},n.$selected=o}for(var s=n.$menu.children(),i=n.$selected&&n.$selected.prev().length?n.$selected.prev():s.last(),c=i;i.hasClass(a.classNames.disabled)||i.hasClass(a.classNames.notSelectable)||i.is(":hidden");)if(i=i.prev().length?i.prev():s.last(),i.is(c))return;n.$selected&&f.itemMouseleave.call(n.$selected.get(0),t),f.itemMouseenter.call(i.get(0),t);var r=i.find("input, textarea, select");r.length&&r.focus()},nextItem:function(t){t.stopPropagation();var n=e(this).data("contextMenu")||{},a=e(this).data("contextMenuRoot")||{};if(n.$selected){var o=n.$selected;n=n.$selected.parent().data("contextMenu")||{},n.$selected=o}for(var s=n.$menu.children(),i=n.$selected&&n.$selected.next().length?n.$selected.next():s.first(),c=i;i.hasClass(a.classNames.disabled)||i.hasClass(a.classNames.notSelectable)||i.is(":hidden");)if(i=i.next().length?i.next():s.first(),i.is(c))return;n.$selected&&f.itemMouseleave.call(n.$selected.get(0),t),f.itemMouseenter.call(i.get(0),t);var r=i.find("input, textarea, select");r.length&&r.focus()},focusInput:function(){var t=e(this).closest(".context-menu-item"),n=t.data(),a=n.contextMenu,o=n.contextMenuRoot;o.$selected=a.$selected=t,o.isInput=a.isInput=!0},blurInput:function(){var t=e(this).closest(".context-menu-item"),n=t.data(),a=n.contextMenu,o=n.contextMenuRoot;o.isInput=a.isInput=!1},menuMouseenter:function(){var t=e(this).data().contextMenuRoot;t.hovering=!0},menuMouseleave:function(t){var n=e(this).data().contextMenuRoot;n.$layer&&n.$layer.is(t.relatedTarget)&&(n.hovering=!1)},itemMouseenter:function(t){var n=e(this),a=n.data(),o=a.contextMenu,s=a.contextMenuRoot;return s.hovering=!0,t&&s.$layer&&s.$layer.is(t.relatedTarget)&&(t.preventDefault(),t.stopImmediatePropagation()),(o.$menu?o:s).$menu.children("."+s.classNames.hover).trigger("contextmenu:blur").children(".hover").trigger("contextmenu:blur"),n.hasClass(s.classNames.disabled)||n.hasClass(s.classNames.notSelectable)?void(o.$selected=null):void n.trigger("contextmenu:focus")},itemMouseleave:function(t){var n=e(this),a=n.data(),o=a.contextMenu,s=a.contextMenuRoot;return s!==o&&s.$layer&&s.$layer.is(t.relatedTarget)?("undefined"!=typeof s.$selected&&null!==s.$selected&&s.$selected.trigger("contextmenu:blur"),t.preventDefault(),t.stopImmediatePropagation(),void(s.$selected=o.$selected=o.$node)):void n.trigger("contextmenu:blur")},itemClick:function(t){var n,a=e(this),o=a.data(),s=o.contextMenu,i=o.contextMenuRoot,c=o.contextMenuKey;if(s.items[c]&&!a.is("."+i.classNames.disabled+", .context-menu-submenu, .context-menu-separator, ."+i.classNames.notSelectable)){if(t.preventDefault(),t.stopImmediatePropagation(),e.isFunction(i.callbacks[c])&&Object.prototype.hasOwnProperty.call(i.callbacks,c))n=i.callbacks[c];else{if(!e.isFunction(i.callback))return;n=i.callback}n.call(i.$trigger,c,i)!==!1?i.$menu.trigger("contextmenu:hide"):i.$menu.parent().length&&h.update.call(i.$trigger,i)}},inputClick:function(e){e.stopImmediatePropagation()},hideMenu:function(t,n){var a=e(this).data("contextMenuRoot");h.hide.call(a.$trigger,a,n&&n.force)},focusItem:function(t){t.stopPropagation();var n=e(this),a=n.data(),o=a.contextMenu,s=a.contextMenuRoot;n.addClass([s.classNames.hover,s.classNames.visible].join(" ")).parent().find(".context-menu-item").not(n).removeClass(s.classNames.visible).filter("."+s.classNames.hover).trigger("contextmenu:blur"),o.$selected=s.$selected=n,o.$node&&s.positionSubmenu.call(o.$node,o.$menu)},blurItem:function(t){t.stopPropagation();var n=e(this),a=n.data(),o=a.contextMenu,s=a.contextMenuRoot;o.autoHide&&n.removeClass(s.classNames.visible),n.removeClass(s.classNames.hover),o.$selected=null}},h={show:function(t,n,a){var s=e(this),i={};if(e("#context-menu-layer").trigger("mousedown"),t.$trigger=s,t.events.show.call(s,t)===!1)return void(o=null);if(h.update.call(s,t),t.position.call(s,t,n,a),t.zIndex){var c=t.zIndex;"function"==typeof t.zIndex&&(c=t.zIndex.call(s,t)),i.zIndex=p(s)+c}h.layer.call(t.$menu,t,i.zIndex),t.$menu.find("ul").css("zIndex",i.zIndex+1),t.$menu.css(i)[t.animation.show](t.animation.duration,function(){s.trigger("contextmenu:visible")}),s.data("contextMenu",t).addClass("context-menu-active"),e(document).off("keydown.contextMenu").on("keydown.contextMenu",f.key),t.autoHide&&e(document).on("mousemove.contextMenuAutoHide",function(e){var n=s.offset();n.right=n.left+s.outerWidth(),n.bottom=n.top+s.outerHeight(),!t.$layer||t.hovering||e.pageX>=n.left&&e.pageX<=n.right&&e.pageY>=n.top&&e.pageY<=n.bottom||setTimeout(function(){t.hovering||t.$menu.trigger("contextmenu:hide")},50)})},hide:function(t,n){var a=e(this);if(t||(t=a.data("contextMenu")||{}),n||!t.events||t.events.hide.call(a,t)!==!1){if(a.removeData("contextMenu").removeClass("context-menu-active"),t.$layer){setTimeout(function(e){return function(){e.remove()}}(t.$layer),10);try{delete t.$layer}catch(s){t.$layer=null}}o=null,t.$menu.find("."+t.classNames.hover).trigger("contextmenu:blur"),t.$selected=null,t.$menu.find("."+t.classNames.visible).removeClass(t.classNames.visible),e(document).off(".contextMenuAutoHide").off("keydown.contextMenu"),t.$menu&&t.$menu[t.animation.hide](t.animation.duration,function(){t.build&&(t.$menu.remove(),e.each(t,function(e){switch(e){case"ns":case"selector":case"build":case"trigger":return!0;default:t[e]=void 0;try{delete t[e]}catch(n){}return!0}})),setTimeout(function(){a.trigger("contextmenu:hidden")},10)})}},create:function(n,a){function o(t){var n=e("<span></span>");return t._accesskey?(t._beforeAccesskey&&n.append(document.createTextNode(t._beforeAccesskey)),e("<span></span>").addClass("context-menu-accesskey").text(t._accesskey).appendTo(n),t._afterAccesskey&&n.append(document.createTextNode(t._afterAccesskey))):n.text(t.name),n}void 0===a&&(a=n),n.$menu=e('<ul class="context-menu-list"></ul>').addClass(n.className||"").data({contextMenu:n,contextMenuRoot:a}),e.each(["callbacks","commands","inputs"],function(e,t){n[t]={},a[t]||(a[t]={})}),a.accesskeys||(a.accesskeys={}),e.each(n.items,function(s,i){var c=e('<li class="context-menu-item"></li>').addClass(i.className||""),r=null,l=null;if(c.on("click",e.noop),"string"==typeof i&&(i={type:"cm_seperator"}),i.$node=c.data({contextMenu:n,contextMenuRoot:a,contextMenuKey:s}),"undefined"!=typeof i.accesskey)for(var d,m=t(i.accesskey),p=0;d=m[p];p++)if(!a.accesskeys[d]){a.accesskeys[d]=i;var x=i.name.match(new RegExp("^(.*?)("+d+")(.*)$","i"));x&&(i._beforeAccesskey=x[1],i._accesskey=x[2],i._afterAccesskey=x[3]);break}if(i.type&&u[i.type])u[i.type].call(c,i,n,a),e.each([n,a],function(t,n){n.commands[s]=i,e.isFunction(i.callback)&&(n.callbacks[s]=i.callback)});else{switch("cm_seperator"===i.type?c.addClass("context-menu-separator "+a.classNames.notSelectable):"html"===i.type?c.addClass("context-menu-html "+a.classNames.notSelectable):i.type?(r=e("<label></label>").appendTo(c),o(i).appendTo(r),c.addClass("context-menu-input"),n.hasTypes=!0,e.each([n,a],function(e,t){t.commands[s]=i,t.inputs[s]=i})):i.items&&(i.type="sub"),i.type){case"cm_seperator":break;case"text":l=e('<input type="text" value="1" name="" value="">').attr("name","context-menu-input-"+s).val(i.value||"").appendTo(r);break;case"textarea":l=e('<textarea name=""></textarea>').attr("name","context-menu-input-"+s).val(i.value||"").appendTo(r),i.height&&l.height(i.height);break;case"checkbox":l=e('<input type="checkbox" value="1" name="" value="">').attr("name","context-menu-input-"+s).val(i.value||"").prop("checked",!!i.selected).prependTo(r);break;case"radio":l=e('<input type="radio" value="1" name="" value="">').attr("name","context-menu-input-"+i.radio).val(i.value||"").prop("checked",!!i.selected).prependTo(r);break;case"select":l=e('<select name="">').attr("name","context-menu-input-"+s).appendTo(r),i.options&&(e.each(i.options,function(t,n){e("<option></option>").val(t).text(n).appendTo(l)}),l.val(i.selected));break;case"sub":o(i).appendTo(c),i.appendTo=i.$node,h.create(i,a),c.data("contextMenu",i).addClass("context-menu-submenu"),i.callback=null;break;case"html":e(i.html).appendTo(c);break;default:e.each([n,a],function(t,n){n.commands[s]=i,e.isFunction(i.callback)&&(n.callbacks[s]=i.callback)}),o(i).appendTo(c)}i.type&&"sub"!==i.type&&"html"!==i.type&&"cm_seperator"!==i.type&&(l.on("focus",f.focusInput).on("blur",f.blurInput),i.events&&l.on(i.events,n)),i.icon&&(e.isFunction(i.icon)?i._icon=i.icon.call(this,this,c,s,i):i._icon=a.classNames.icon+" "+a.classNames.icon+"-"+i.icon,c.addClass(i._icon))}i.$input=l,i.$label=r,c.appendTo(n.$menu),!n.hasTypes&&e.support.eventSelectstart&&c.on("selectstart.disableTextSelect",f.abortevent)}),n.$node||n.$menu.css("display","none").addClass("context-menu-root"),n.$menu.appendTo(n.appendTo||document.body)},resize:function(t,n){t.css({position:"absolute",display:"block"}),t.data("width",Math.ceil(t.outerWidth())),t.css({position:"static",minWidth:"0px",maxWidth:"100000px"}),t.find("> li > ul").each(function(){h.resize(e(this),!0)}),n||t.find("ul").addBack().css({position:"",display:"",minWidth:"",maxWidth:""}).outerWidth(function(){return e(this).data("width")})},update:function(t,n){var a=this;void 0===n&&(n=t,h.resize(t.$menu)),t.$menu.children().each(function(){var o,s=e(this),i=s.data("contextMenuKey"),c=t.items[i],r=e.isFunction(c.disabled)&&c.disabled.call(a,i,n)||c.disabled===!0;if(o=e.isFunction(c.visible)?c.visible.call(a,i,n):"undefined"!=typeof c.visible?c.visible===!0:!0,s[o?"show":"hide"](),s[r?"addClass":"removeClass"](n.classNames.disabled),e.isFunction(c.icon)&&(s.removeClass(c._icon),c._icon=c.icon.call(this,a,s,i,c),s.addClass(c._icon)),c.type)switch(s.find("input, select, textarea").prop("disabled",r),c.type){case"text":case"textarea":c.$input.val(c.value||"");break;case"checkbox":case"radio":c.$input.val(c.value||"").prop("checked",!!c.selected);break;case"select":c.$input.val(c.selected||"")}c.$menu&&h.update.call(a,c,n)})},layer:function(t,n){var a=t.$layer=e('<div id="context-menu-layer" style="position:fixed; z-index:'+n+'; top:0; left:0; opacity: 0; filter: alpha(opacity=0); background-color: #000;"></div>').css({height:i.height(),width:i.width(),display:"block"}).data("contextMenuRoot",t).insertBefore(this).on("contextmenu",f.abortevent).on("mousedown",f.layerClick);return void 0===document.body.style.maxWidth&&a.css({position:"absolute",height:e(document).height()}),a}};e.fn.contextMenu=function(t){var n=this,a=t;if(this.length>0)if(void 0===t)this.first().trigger("contextmenu");else if(void 0!==t.x&&void 0!==t.y)this.first().trigger(e.Event("contextmenu",{pageX:t.x,pageY:t.y,mouseButton:t.button}));else if("hide"===t){var o=this.first().data("contextMenu")?this.first().data("contextMenu").$menu:null;o&&o.trigger("contextmenu:hide")}else"destroy"===t?e.contextMenu("destroy",{context:this}):e.isPlainObject(t)?(t.context=this,e.contextMenu("create",t)):t?this.removeClass("context-menu-disabled"):t||this.addClass("context-menu-disabled");else e.each(l,function(){this.selector===n.selector&&(a.data=this,e.extend(a.data,{trigger:"demand"}))}),f.contextmenu.call(a.target,a);return this},e.contextMenu=function(t,n){"string"!=typeof t&&(n=t,t="create"),"string"==typeof n?n={selector:n}:void 0===n&&(n={});var a=e.extend(!0,{},d,n||{}),o=e(document),i=o,u=!1;switch(a.context&&a.context.length?(i=e(a.context).first(),a.context=i.get(0),u=a.context!==document):a.context=document,t){case"create":if(!a.selector)throw new Error("No selector specified");if(a.selector.match(/.context-menu-(list|item|input)($|\s)/))throw new Error('Cannot bind to selector "'+a.selector+'" as it contains a reserved className');if(!a.build&&(!a.items||e.isEmptyObject(a.items)))throw new Error("No Items specified");switch(c++,a.ns=".contextMenu"+c,u||(r[a.selector]=a.ns),l[a.ns]=a,a.trigger||(a.trigger="right"),s||(o.on({"contextmenu:hide.contextMenu":f.hideMenu,"prevcommand.contextMenu":f.prevItem,"nextcommand.contextMenu":f.nextItem,"contextmenu.contextMenu":f.abortevent,"mouseenter.contextMenu":f.menuMouseenter,"mouseleave.contextMenu":f.menuMouseleave},".context-menu-list").on("mouseup.contextMenu",".context-menu-input",f.inputClick).on({"mouseup.contextMenu":f.itemClick,"contextmenu:focus.contextMenu":f.focusItem,"contextmenu:blur.contextMenu":f.blurItem,"contextmenu.contextMenu":f.abortevent,"mouseenter.contextMenu":f.itemMouseenter,"mouseleave.contextMenu":f.itemMouseleave},".context-menu-item"),s=!0),i.on("contextmenu"+a.ns,a.selector,a,f.contextmenu),u&&i.on("remove"+a.ns,function(){e(this).contextMenu("destroy")}),a.trigger){case"hover":i.on("mouseenter"+a.ns,a.selector,a,f.mouseenter).on("mouseleave"+a.ns,a.selector,a,f.mouseleave);break;case"left":i.on("click"+a.ns,a.selector,a,f.click)}a.build||h.create(a);break;case"destroy":var m;if(u){var p=a.context;e.each(l,function(t,n){if(n.context!==p)return!0;m=e(".context-menu-list").filter(":visible"),m.length&&m.data().contextMenuRoot.$trigger.is(e(n.context).find(n.selector))&&m.trigger("contextmenu:hide",{force:!0});try{l[n.ns].$menu&&l[n.ns].$menu.remove(),delete l[n.ns]}catch(a){l[n.ns]=null}return e(n.context).off(n.ns),!0})}else if(a.selector){if(r[a.selector]){m=e(".context-menu-list").filter(":visible"),m.length&&m.data().contextMenuRoot.$trigger.is(a.selector)&&m.trigger("contextmenu:hide",{force:!0});try{l[r[a.selector]].$menu&&l[r[a.selector]].$menu.remove(),delete l[r[a.selector]]}catch(x){l[r[a.selector]]=null}o.off(r[a.selector])}}else o.off(".contextMenu .contextMenuAutoHide"),e.each(l,function(t,n){e(n.context).off(n.ns)}),r={},l={},c=0,s=!1,e("#context-menu-layer, .context-menu-list").remove();break;case"html5":(!e.support.htmlCommand&&!e.support.htmlMenuitem||"boolean"==typeof n&&n)&&e('menu[type="context"]').each(function(){this.id&&e.contextMenu({selector:"[contextmenu="+this.id+"]",items:e.contextMenu.fromMenu(this)})}).css("display","none");break;default:throw new Error('Unknown operation "'+t+'"')}return this},e.contextMenu.setInputValues=function(t,n){void 0===n&&(n={}),e.each(t.inputs,function(e,t){switch(t.type){case"text":case"textarea":t.value=n[e]||"";break;case"checkbox":t.selected=!!n[e];break;case"radio":t.selected=(n[t.radio]||"")===t.value;break;case"select":t.selected=n[e]||""}})},e.contextMenu.getInputValues=function(t,n){return void 0===n&&(n={}),e.each(t.inputs,function(e,t){switch(t.type){case"text":case"textarea":case"select":n[e]=t.$input.val();break;case"checkbox":n[e]=t.$input.prop("checked");break;case"radio":t.$input.prop("checked")&&(n[t.radio]=t.value)}}),n},e.contextMenu.fromMenu=function(t){var n=e(t),o={};return a(o,n.children()),o},e.contextMenu.defaults=d,e.contextMenu.types=u,e.contextMenu.handle=f,e.contextMenu.op=h,e.contextMenu.menus=l});
//# sourceMappingURL=jquery.contextMenu.min.js.map

/* w2ui 1.4.3 (c) http://w2ui.com, vitmalina@gmail.com */
var w2ui=w2ui||{},w2obj=w2obj||{},w2utils=function(){function a(a){var b=/^[-+]?[0-9]+$/;return b.test(a)}function b(a){return"string"==typeof a&&(a=a.replace(w2utils.settings.decimalSymbol,".")),("number"==typeof a||"string"==typeof a&&""!==a)&&!isNaN(Number(a))}function c(a){var b=w2utils.settings,c=new RegExp("^"+(b.currencyPrefix?"\\"+b.currencyPrefix+"?":"")+"[-+]?[0-9]*[\\"+w2utils.settings.decimalSymbol+"]?[0-9]+"+(b.currencySuffix?"\\"+b.currencySuffix+"?":"")+"$","i");return"string"==typeof a&&(a=a.replace(new RegExp(b.groupSymbol,"g"),"")),"object"==typeof a||""===a?!1:c.test(a)}function d(a){var b=/^[a-fA-F0-9]+$/;return b.test(a)}function e(a){var b=/^[a-zA-Z0-9_-]+$/;return b.test(a)}function f(a){var b=/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;return b.test(a)}function g(b,c,d){if(!b)return!1;var e,f,g,h="Invalid Date";if(null==c&&(c=w2utils.settings.date_format),"function"==typeof b.getUTCFullYear&&"function"==typeof b.getUTCMonth&&"function"==typeof b.getUTCDate)g=b.getUTCFullYear(),e=b.getUTCMonth(),f=b.getUTCDate();else if("function"==typeof b.getFullYear&&"function"==typeof b.getMonth&&"function"==typeof b.getDate)g=b.getFullYear(),e=b.getMonth(),f=b.getDate();else{if(b=String(b),RegExp("mon","ig").test(c)){c=c.replace(/month/gi,"m").replace(/mon/gi,"m").replace(/dd/gi,"d").replace(/[, ]/gi,"/").replace(/\/\//g,"/").toLowerCase(),b=b.replace(/[, ]/gi,"/").replace(/\/\//g,"/").toLowerCase();for(var i=0,j=w2utils.settings.fullmonths.length;j>i;i++){var k=w2utils.settings.fullmonths[i];b=b.replace(RegExp(k,"ig"),parseInt(i)+1).replace(RegExp(k.substr(0,3),"ig"),parseInt(i)+1)}}var l=b.replace(/-/g,"/").replace(/\./g,"/").toLowerCase().split("/"),m=c.replace(/-/g,"/").replace(/\./g,"/").toLowerCase();"mm/dd/yyyy"===m&&(e=l[0],f=l[1],g=l[2]),"m/d/yyyy"===m&&(e=l[0],f=l[1],g=l[2]),"dd/mm/yyyy"===m&&(e=l[1],f=l[0],g=l[2]),"d/m/yyyy"===m&&(e=l[1],f=l[0],g=l[2]),"yyyy/dd/mm"===m&&(e=l[2],f=l[1],g=l[0]),"yyyy/d/m"===m&&(e=l[2],f=l[1],g=l[0]),"yyyy/mm/dd"===m&&(e=l[1],f=l[2],g=l[0]),"yyyy/m/d"===m&&(e=l[1],f=l[2],g=l[0]),"mm/dd/yy"===m&&(e=l[0],f=l[1],g=l[2]),"m/d/yy"===m&&(e=l[0],f=l[1],g=parseInt(l[2])+1900),"dd/mm/yy"===m&&(e=l[1],f=l[0],g=parseInt(l[2])+1900),"d/m/yy"===m&&(e=l[1],f=l[0],g=parseInt(l[2])+1900),"yy/dd/mm"===m&&(e=l[2],f=l[1],g=parseInt(l[0])+1900),"yy/d/m"===m&&(e=l[2],f=l[1],g=parseInt(l[0])+1900),"yy/mm/dd"===m&&(e=l[1],f=l[2],g=parseInt(l[0])+1900),"yy/m/d"===m&&(e=l[1],f=l[2],g=parseInt(l[0])+1900)}return a(g)&&a(e)&&a(f)?(g=+g,e=+e,f=+f,h=new Date(g,e-1,f),null==e?!1:"Invalid Date"==String(h)?!1:h.getMonth()+1!==e||h.getDate()!==f||h.getFullYear()!==g?!1:d===!0?h:!0):!1}function h(a,b){if(null==a)return!1;var c,d;a=String(a),a=a.toUpperCase(),d=a.indexOf("PM")>=0;var e=d||a.indexOf("AM")>=0;c=e?12:24,a=a.replace("AM","").replace("PM",""),a=$.trim(a);var f=a.split(":"),g=parseInt(f[0]||0),h=parseInt(f[1]||0);return e&&1===f.length||2===f.length?""===f[0]||0>g||g>c||!this.isInt(f[0])||f[0].length>2?!1:2===f.length&&(""===f[1]||0>h||h>59||!this.isInt(f[1])||2!==f[1].length)?!1:e||c!==g||0===h?e&&1===f.length&&0===g?!1:b===!0?(d&&(g+=12),{hours:g,minutes:h}):!0:!1:!1}function i(a){if(""===a||null==a)return"";var b=new Date(a);if(w2utils.isInt(a)&&(b=new Date(Number(a))),"Invalid Date"==String(b))return"";var c=new Date,d=(c.getTime()-b.getTime())/1e3,e="",f="";return 0>d?(e='<span style="color: #aaa">future</span>',f=""):60>d?(e=Math.floor(d),f="sec",0>d&&(e=0,f="sec")):3600>d?(e=Math.floor(d/60),f="min"):86400>d?(e=Math.floor(d/60/60),f="hour"):2592e3>d?(e=Math.floor(d/24/60/60),f="day"):31557600>d?(e=Math.floor(d/365.25/24/60/60*10)/10,f="month"):d>=31557600&&(e=Math.floor(d/365.25/24/60/60*10)/10,f="year"),e+" "+f+(e>1?"s":"")}function j(a){if(""===a||null==a)return"";var b=new Date(a);if(w2utils.isInt(a)&&(b=new Date(Number(a))),"Invalid Date"==String(b))return"";var c=w2utils.settings.shortmonths,d=new Date,e=new Date;e.setTime(e.getTime()-864e5);var f=c[b.getMonth()]+" "+b.getDate()+", "+b.getFullYear(),g=c[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear(),h=c[e.getMonth()]+" "+e.getDate()+", "+e.getFullYear(),i=b.getHours()-(b.getHours()>12?12:0)+":"+(b.getMinutes()<10?"0":"")+b.getMinutes()+" "+(b.getHours()>=12?"pm":"am"),j=b.getHours()-(b.getHours()>12?12:0)+":"+(b.getMinutes()<10?"0":"")+b.getMinutes()+":"+(b.getSeconds()<10?"0":"")+b.getSeconds()+" "+(b.getHours()>=12?"pm":"am"),k=f;return f===g&&(k=i),f===h&&(k=w2utils.lang("Yesterday")),'<span title="'+f+" "+j+'">'+k+"</span>"}function k(a){if(!w2utils.isFloat(a)||""===a)return"";if(a=parseFloat(a),0===a)return 0;var b=["Bt","KB","MB","GB","TB"],c=parseInt(Math.floor(Math.log(a)/Math.log(1024)));return(Math.floor(a/Math.pow(1024,c)*10)/10).toFixed(0===c?0:1)+" "+b[c]}function l(a,b,c){var d="";return null==b&&(b=w2utils.settings.groupSymbol||","),null==c&&(c=w2utils.settings.decimalSymbol||"."),(w2utils.isFloat(a)||w2utils.isInt(a)||w2utils.isMoney(a))&&(E=String(a).split("."),d=String(E[0]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+b),null!=E[1]&&(d+=w2utils.settings.decimalSymbol+E[1])),d}function m(a,b){w2utils.settings.shortmonths,w2utils.settings.fullmonths;if(b||(b=this.settings.date_format),""===a||null==a||"object"==typeof a&&!a.getMonth)return"";var c=new Date(a);if(w2utils.isInt(a)&&(c=new Date(Number(a))),"Invalid Date"==String(c))return"";var d=c.getFullYear(),e=c.getMonth(),f=c.getDate();return b.toLowerCase().replace("month",w2utils.settings.fullmonths[e]).replace("mon",w2utils.settings.shortmonths[e]).replace(/yyyy/g,d).replace(/yyy/g,d).replace(/yy/g,d>2e3?100+parseInt(String(d).substr(2)):String(d).substr(2)).replace(/(^|[^a-z$])y/g,"$1"+d).replace(/mm/g,(10>e+1?"0":"")+(e+1)).replace(/dd/g,(10>f?"0":"")+f).replace(/th/g,1==f?"st":"th").replace(/th/g,2==f?"nd":"th").replace(/th/g,3==f?"rd":"th").replace(/(^|[^a-z$])m/g,"$1"+(e+1)).replace(/(^|[^a-z$])d/g,"$1"+f)}function n(a,b){w2utils.settings.shortmonths,w2utils.settings.fullmonths;if(b||(b=this.settings.time_format),""===a||null==a||"object"==typeof a&&!a.getMonth)return"";var c=new Date(a);if(w2utils.isInt(a)&&(c=new Date(Number(a))),w2utils.isTime(a)){var d=w2utils.isTime(a,!0);c=new Date,c.setHours(d.hours),c.setMinutes(d.minutes)}if("Invalid Date"==String(c))return"";var e="am",f=c.getHours(),g=c.getHours(),h=c.getMinutes(),i=c.getSeconds();return 10>h&&(h="0"+h),10>i&&(i="0"+i),(-1!==b.indexOf("am")||-1!==b.indexOf("pm"))&&(f>=12&&(e="pm"),f>12&&(f-=12)),b.toLowerCase().replace("am",e).replace("pm",e).replace("hhh",10>f?"0"+f:f).replace("hh24",10>g?"0"+g:g).replace("h24",g).replace("hh",f).replace("mm",h).replace("mi",h).replace("ss",i).replace(/(^|[^a-z$])h/g,"$1"+f).replace(/(^|[^a-z$])m/g,"$1"+h).replace(/(^|[^a-z$])s/g,"$1"+i)}function o(a,b){var c;return""===a||null==a||"object"==typeof a&&!a.getMonth?"":(c="string"!=typeof b?[this.settings.date_format,this.settings.time_format]:b.split("|"),this.formatDate(a,c[0])+" "+this.formatTime(a,c[1]))}function p(a){if(null===a)return a;switch(typeof a){case"number":break;case"string":a=$.trim(String(a).replace(/(<([^>]+)>)/gi,""));break;case"object":for(var b in a)a[b]=this.stripTags(a[b])}return a}function q(a){if(null===a)return a;switch(typeof a){case"number":break;case"string":a=String(a).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;");break;case"object":for(var b in a)a[b]=this.encodeTags(a[b])}return a}function r(a){return""===a||null==a?"":String(a).replace(/([;&,\.\+\*\~'`:"\!\^#$%@\[\]\(\)=<>\|\/? {}\\])/g,"\\$1")}function s(a){function b(a){for(var a=String(a).replace(/\r\n/g,"\n"),b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}var c,d,e,f,g,h,i,j="",k=0,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";for(a=b(a);k<a.length;)c=a.charCodeAt(k++),d=a.charCodeAt(k++),e=a.charCodeAt(k++),f=c>>2,g=(3&c)<<4|d>>4,h=(15&d)<<2|e>>6,i=63&e,isNaN(d)?h=i=64:isNaN(e)&&(i=64),j=j+l.charAt(f)+l.charAt(g)+l.charAt(h)+l.charAt(i);return j}function t(a){function b(a){for(var b,c,d="",e=0,f=0;e<a.length;)f=a.charCodeAt(e),128>f?(d+=String.fromCharCode(f),e++):f>191&&224>f?(b=a.charCodeAt(e+1),d+=String.fromCharCode((31&f)<<6|63&b),e+=2):(b=a.charCodeAt(e+1),c=a.charCodeAt(e+2),d+=String.fromCharCode((15&f)<<12|(63&b)<<6|63&c),e+=3);return d}var c,d,e,f,g,h,i,j="",k=0,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");k<a.length;)f=l.indexOf(a.charAt(k++)),g=l.indexOf(a.charAt(k++)),h=l.indexOf(a.charAt(k++)),i=l.indexOf(a.charAt(k++)),c=f<<2|g>>4,d=(15&g)<<4|h>>2,e=(3&h)<<6|i,j+=String.fromCharCode(c),64!==h&&(j+=String.fromCharCode(d)),64!==i&&(j+=String.fromCharCode(e));return j=b(j)}function u(a,b,c,d){function e(a,b,c){var d=!!window.webkitURL;return d||"undefined"==typeof c||(b=c),";"+a+": "+b+"; -webkit-"+a+": "+b+"; -moz-"+a+": "+b+"; -ms-"+a+": "+b+"; -o-"+a+": "+b+";"}var f=$(a).width(),g=$(a).height(),h=.5;if(!a||!b)return void console.log("ERROR: Cannot do transition when one of the divs is null");switch(a.parentNode.style.cssText+=e("perspective","700px")+"; overflow: hidden;",a.style.cssText+="; position: absolute; z-index: 1019; "+e("backface-visibility","hidden"),b.style.cssText+="; position: absolute; z-index: 1020; "+e("backface-visibility","hidden"),c){case"slide-left":a.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),b.style.cssText+="overflow: hidden; "+e("transform","translate3d("+f+"px, 0, 0)","translate("+f+"px, 0)"),$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+";"+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),a.style.cssText+=e("transition",h+"s")+";"+e("transform","translate3d(-"+f+"px, 0, 0)","translate(-"+f+"px, 0)")},1);break;case"slide-right":a.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),b.style.cssText+="overflow: hidden; "+e("transform","translate3d(-"+f+"px, 0, 0)","translate(-"+f+"px, 0)"),$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; "+e("transform","translate3d(0px, 0, 0)","translate(0px, 0)"),a.style.cssText+=e("transition",h+"s")+"; "+e("transform","translate3d("+f+"px, 0, 0)","translate("+f+"px, 0)")},1);break;case"slide-down":a.style.cssText+="overflow: hidden; z-index: 1; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),b.style.cssText+="overflow: hidden; z-index: 0; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),a.style.cssText+=e("transition",h+"s")+"; "+e("transform","translate3d(0, "+g+"px, 0)","translate(0, "+g+"px)")},1);break;case"slide-up":a.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),b.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, "+g+"px, 0)","translate(0, "+g+"px)"),$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),a.style.cssText+=e("transition",h+"s")+"; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)")},1);break;case"flip-left":a.style.cssText+="overflow: hidden; "+e("transform","rotateY(0deg)"),b.style.cssText+="overflow: hidden; "+e("transform","rotateY(-180deg)"),$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; "+e("transform","rotateY(0deg)"),a.style.cssText+=e("transition",h+"s")+"; "+e("transform","rotateY(180deg)")},1);break;case"flip-right":a.style.cssText+="overflow: hidden; "+e("transform","rotateY(0deg)"),b.style.cssText+="overflow: hidden; "+e("transform","rotateY(180deg)"),$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; "+e("transform","rotateY(0deg)"),a.style.cssText+=e("transition",h+"s")+"; "+e("transform","rotateY(-180deg)")},1);break;case"flip-down":a.style.cssText+="overflow: hidden; "+e("transform","rotateX(0deg)"),b.style.cssText+="overflow: hidden; "+e("transform","rotateX(180deg)"),$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; "+e("transform","rotateX(0deg)"),a.style.cssText+=e("transition",h+"s")+"; "+e("transform","rotateX(-180deg)")},1);break;case"flip-up":a.style.cssText+="overflow: hidden; "+e("transform","rotateX(0deg)"),b.style.cssText+="overflow: hidden; "+e("transform","rotateX(-180deg)"),$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; "+e("transform","rotateX(0deg)"),a.style.cssText+=e("transition",h+"s")+"; "+e("transform","rotateX(180deg)")},1);break;case"pop-in":a.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),b.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)")+"; "+e("transform","scale(.8)")+"; opacity: 0;",$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; "+e("transform","scale(1)")+"; opacity: 1;",a.style.cssText+=e("transition",h+"s")+";"},1);break;case"pop-out":a.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)")+"; "+e("transform","scale(1)")+"; opacity: 1;",b.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)")+"; opacity: 0;",$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; opacity: 1;",a.style.cssText+=e("transition",h+"s")+"; "+e("transform","scale(1.7)")+"; opacity: 0;"},1);break;default:a.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)"),b.style.cssText+="overflow: hidden; "+e("transform","translate3d(0, 0, 0)","translate(0, 0)")+"; opacity: 0;",$(b).show(),window.setTimeout(function(){b.style.cssText+=e("transition",h+"s")+"; opacity: 1;",a.style.cssText+=e("transition",h+"s")},1)}setTimeout(function(){"slide-down"===c&&($(a).css("z-index","1019"),$(b).css("z-index","1020")),b&&$(b).css({opacity:"1","-webkit-transition":"","-moz-transition":"","-ms-transition":"","-o-transition":"","-webkit-transform":"","-moz-transform":"","-ms-transform":"","-o-transform":"","-webkit-backface-visibility":"","-moz-backface-visibility":"","-ms-backface-visibility":"","-o-backface-visibility":""}),a&&($(a).css({opacity:"1","-webkit-transition":"","-moz-transition":"","-ms-transition":"","-o-transition":"","-webkit-transform":"","-moz-transform":"","-ms-transform":"","-o-transform":"","-webkit-backface-visibility":"","-moz-backface-visibility":"","-ms-backface-visibility":"","-o-backface-visibility":""}),a.parentNode&&$(a.parentNode).css({"-webkit-perspective":"","-moz-perspective":"","-ms-perspective":"","-o-perspective":""})),"function"==typeof d&&d()},1e3*h)}function v(a,b,c){var d={};"object"==typeof b?d=b:(d.msg=b,d.spinner=c),d.msg||0===d.msg||(d.msg=""),w2utils.unlock(a),$(a).prepend('<div class="w2ui-lock"></div><div class="w2ui-lock-msg"></div>');var e=$(a).find(".w2ui-lock"),f=$(a).find(".w2ui-lock-msg");d.msg||f.css({"background-color":"transparent",border:"0px"}),d.spinner===!0&&(d.msg='<div class="w2ui-spinner" '+(d.msg?"":'style="width: 35px; height: 35px"')+"></div>"+d.msg),null!=d.opacity&&e.css("opacity",d.opacity),"function"==typeof e.fadeIn?(e.fadeIn(200),f.html(d.msg).fadeIn(200)):(e.show(),f.html(d.msg).show(0)),$().w2tag()}function w(a){$(a).find(".w2ui-lock").remove(),$(a).find(".w2ui-lock-msg").remove()}function x(a,b){var c=$(a),d={left:parseInt(c.css("border-left-width"))||0,right:parseInt(c.css("border-right-width"))||0,top:parseInt(c.css("border-top-width"))||0,bottom:parseInt(c.css("border-bottom-width"))||0},e={left:parseInt(c.css("margin-left"))||0,right:parseInt(c.css("margin-right"))||0,top:parseInt(c.css("margin-top"))||0,bottom:parseInt(c.css("margin-bottom"))||0},f={left:parseInt(c.css("padding-left"))||0,right:parseInt(c.css("padding-right"))||0,top:parseInt(c.css("padding-top"))||0,bottom:parseInt(c.css("padding-bottom"))||0};switch(b){case"top":return d.top+e.top+f.top;case"bottom":return d.bottom+e.bottom+f.bottom;case"left":return d.left+e.left+f.left;case"right":return d.right+e.right+f.right;case"width":return d.left+d.right+e.left+e.right+f.left+f.right+parseInt(c.width());case"height":return d.top+d.bottom+e.top+e.bottom+f.top+f.bottom+parseInt(c.height());case"+width":return d.left+d.right+e.left+e.right+f.left+f.right;case"+height":return d.top+d.bottom+e.top+e.bottom+f.top+f.bottom}return 0}function y(a){var b=this.settings.phrases[a];return null==b?a:b}function z(a){a||(a="en-us"),5===a.length&&(a="locale/"+a+".json"),$.ajax({url:a,type:"GET",dataType:"JSON",async:!1,cache:!1,success:function(a){w2utils.settings=$.extend(!0,w2utils.settings,a);var b=w2obj.grid.prototype;for(var c in b.buttons)b.buttons[c].caption=w2utils.lang(b.buttons[c].caption),b.buttons[c].hint=w2utils.lang(b.buttons[c].hint);b.msgDelete=w2utils.lang(b.msgDelete),b.msgNotJSON=w2utils.lang(b.msgNotJSON),b.msgRefresh=w2utils.lang(b.msgRefresh)},error:function(){console.log("ERROR: Cannot load locale "+a)}})}function A(){if(E.scrollBarSize)return E.scrollBarSize;var a='<div id="_scrollbar_width" style="position: absolute; top: -300px; width: 100px; height: 100px; overflow-y: scroll;">    <div style="height: 120px">1</div></div>';return $("body").append(a),E.scrollBarSize=100-$("#_scrollbar_width > div").width(),$("#_scrollbar_width").remove(),String(navigator.userAgent).indexOf("MSIE")>=0&&(E.scrollBarSize=E.scrollBarSize/2),E.scrollBarSize}function B(a,b){return a&&"undefined"!=typeof a.name?"undefined"!=typeof w2ui[a.name]?(console.log('ERROR: The parameter "name" is not unique. There are other objects already created with the same name (obj: '+a.name+")."),!1):w2utils.isAlphaNumeric(a.name)?!0:(console.log('ERROR: The parameter "name" has to be alpha-numeric (a-z, 0-9, dash and underscore). '),!1):(console.log('ERROR: The parameter "name" is required but not supplied in $().'+b+"()."),!1)}function C(a,b,c,d){$.isArray(b)||(b=[b]);for(var e=0;e<b.length;e++)if(b[e].id===a)return console.log('ERROR: The parameter "id='+a+'" is not unique within the current '+c+". (obj: "+d+")"),!1;return!0}function D(a){var b=[],c=a.replace(/\/\(/g,"(?:/").replace(/\+/g,"__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g,function(a,c,d,e,f,g){return b.push({name:e,optional:!!g}),c=c||"",""+(g?"":c)+"(?:"+(g?c:"")+(d||"")+(f||d&&"([^/.]+?)"||"([^/]+?)")+")"+(g||"")}).replace(/([\/.])/g,"\\$1").replace(/__plus__/g,"(.+)").replace(/\*/g,"(.*)");return{path:new RegExp("^"+c+"$","i"),keys:b}}var E={},F={version:"1.4.3",settings:{locale:"en-us",date_format:"m/d/yyyy",date_display:"Mon d, yyyy",time_format:"hh:mi pm",currencyPrefix:"$",currencySuffix:"",currencyPrecision:2,groupSymbol:",",decimalSymbol:".",shortmonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],fullmonths:["January","February","March","April","May","June","July","August","September","October","November","December"],shortdays:["M","T","W","T","F","S","S"],fulldays:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],dataType:"HTTP",phrases:{}},isInt:a,isFloat:b,isMoney:c,isHex:d,isAlphaNumeric:e,isEmail:f,isDate:g,isTime:h,age:i,date:j,size:k,formatNumber:l,formatDate:m,formatTime:n,formatDateTime:o,stripTags:p,encodeTags:q,escapeId:r,base64encode:s,base64decode:t,transition:u,lock:v,unlock:w,lang:y,locale:z,getSize:x,scrollBarSize:A,checkName:B,checkUniqueId:C,parseRoute:D,isIOS:-1!=navigator.userAgent.toLowerCase().indexOf("iphone")||-1!=navigator.userAgent.toLowerCase().indexOf("ipod")||-1!=navigator.userAgent.toLowerCase().indexOf("ipad")?!0:!1,isIE:-1!=navigator.userAgent.toLowerCase().indexOf("msie")||-1!=navigator.userAgent.toLowerCase().indexOf("trident")?!0:!1};return F}();w2utils.event={on:function(a,b){return $.isPlainObject(a)||(a={type:a}),a=$.extend({type:null,execute:"before",target:null,onComplete:null},a),a.type?b?($.isArray(this.handlers)||(this.handlers=[]),void this.handlers.push({event:a,handler:b})):void console.log("ERROR: You must specify event handler function when calling .on() method of "+this.name):void console.log("ERROR: You must specify event type when calling .on() method of "+this.name)},off:function(a,b){if($.isPlainObject(a)||(a={type:a}),a=$.extend({},{type:null,execute:"before",target:null,onComplete:null},a),!a.type)return void console.log("ERROR: You must specify event type when calling .off() method of "+this.name);b||(b=null);for(var c=[],d=0,e=this.handlers.length;e>d;d++){var f=this.handlers[d];(f.event.type!==a.type&&"*"!==a.type||f.event.target!==a.target&&null!==a.target||f.handler!==b&&null!==b)&&c.push(f)}this.handlers=c},trigger:function(a){var a=$.extend({type:null,phase:"before",target:null},a,{isStopped:!1,isCancelled:!1,preventDefault:function(){this.isCancelled=!0},stopPropagation:function(){this.isStopped=!0}});"before"===a.phase&&(a.onComplete=null);var b,c,d;null==a.target&&(a.target=null),$.isArray(this.handlers)||(this.handlers=[]);for(var e=this.handlers.length-1;e>=0;e--){var f=this.handlers[e];if(!(f.event.type!==a.type&&"*"!==f.event.type||f.event.target!==a.target&&null!==f.event.target||f.event.execute!==a.phase&&"*"!==f.event.execute&&"*"!==f.event.phase)&&(a=$.extend({},f.event,a),b=[],d=RegExp(/\((.*?)\)/).exec(f.handler),d&&(b=d[1].split(/\s*,\s*/)),2===b.length?f.handler.call(this,a.target,a):f.handler.call(this,a),a.isStopped===!0||a.stop===!0))return a}var g="on"+a.type.substr(0,1).toUpperCase()+a.type.substr(1);return"before"===a.phase&&"function"==typeof this[g]&&(c=this[g],b=[],d=RegExp(/\((.*?)\)/).exec(c),d&&(b=d[1].split(/\s*,\s*/)),2===b.length?c.call(this,a.target,a):c.call(this,a),a.isStopped===!0||a.stop===!0)?a:null!=a.object&&"before"===a.phase&&"function"==typeof a.object[g]&&(c=a.object[g],b=[],d=RegExp(/\((.*?)\)/).exec(c),d&&(b=d[1].split(/\s*,\s*/)),2===b.length?c.call(this,a.target,a):c.call(this,a),a.isStopped===!0||a.stop===!0)?a:("after"===a.phase&&"function"==typeof a.onComplete&&a.onComplete.call(this,a),a)}},w2utils.keyboard=function(a){function b(){$(document).on("keydown",c),$(document).on("mousedown",d)}function c(a){var b=a.target.tagName;-1===$.inArray(b,["INPUT","SELECT","TEXTAREA"])&&"true"!==$(a.target).prop("contenteditable")&&g&&w2ui[g]&&"function"==typeof w2ui[g].keydown&&w2ui[g].keydown.call(w2ui[g],a)}function d(a){var b=(a.target.tagName,$(a.target).parents(".w2ui-reset"));if(b.length>0){var c=b.attr("name");w2ui[c]&&w2ui[c].keyboard&&(g=c)}}function e(a){return"undefined"!=typeof a&&(g=a),g}function f(){g=null}var g=null;return a.active=e,a.clear=f,b(),a}({}),function(){$.fn.w2render=function(a){$(this).length>0&&("string"==typeof a&&w2ui[a]&&w2ui[a].render($(this)[0]),"object"==typeof a&&a.render($(this)[0]))},$.fn.w2destroy=function(a){!a&&this.length>0&&(a=this.attr("name")),"string"==typeof a&&w2ui[a]&&w2ui[a].destroy(),"object"==typeof a&&a.destroy()},$.fn.w2marker=function(a){return $(this).each(""===a||null==a?function(a,b){b.innerHTML=b.innerHTML.replace(/\<span class=\"w2ui\-marker\"\>(.*)\<\/span\>/gi,"$1")}:function(b,c){function d(a){return'<span class="w2ui-marker">'+a+"</span>"}"string"==typeof a&&(a=[a]),c.innerHTML=c.innerHTML.replace(/\<span class=\"w2ui\-marker\"\>(.*)\<\/span\>/gi,"$1");for(var e in a){var f=a[e];"string"!=typeof f&&(f=String(f)),f=f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&").replace(/&/g,"&amp;").replace(/</g,"&gt;").replace(/>/g,"&lt;");var g=new RegExp(f+"(?!([^<]+)?>)","gi");c.innerHTML=c.innerHTML.replace(g,d)}})},$.fn.w2tag=function(a,b){return $.isPlainObject(b)||(b={}),$.isPlainObject(b.css)||(b.css={}),"undefined"==typeof b["class"]&&(b["class"]=""),0===$(this).length?void $(".w2ui-tag").each(function(a,b){var c=$(b).data("options");null==c&&(c={}),$($(b).data("taged-el")).removeClass(c["class"]),clearInterval($(b).data("timer")),$(b).remove()}):$(this).each(function(c,d){function e(){$tag=$("#w2ui-tag-"+g),$tag.length<=0||(clearInterval($tag.data("timer")),$tag.remove(),$(d).off("keypress",e).removeClass(b["class"]),$(d).length>0&&($(d)[0].style.cssText=i),"function"==typeof b.onHide&&b.onHide())}var f=d.id,g=w2utils.escapeId(d.id);if(""===a||null==a)$("#w2ui-tag-"+g).css("opacity",0),setTimeout(function(){clearInterval($("#w2ui-tag-"+g).data("timer")),$("#w2ui-tag-"+g).remove()},300);else{clearInterval($("#w2ui-tag-"+g).data("timer")),$("#w2ui-tag-"+g).remove(),$("body").append('<div id="w2ui-tag-'+f+'" class="w2ui-tag '+($(d).parents(".w2ui-popup").length>0?"w2ui-tag-popup":"")+'" style=""></div>');var h=setInterval(function(){return 0===$(d).length||0===$(d).offset().left&&0===$(d).offset().top?(clearInterval($("#w2ui-tag-"+g).data("timer")),void e()):void($("#w2ui-tag-"+g).data("position")!==$(d).offset().left+d.offsetWidth+"x"+$(d).offset().top&&$("#w2ui-tag-"+g).css({"-webkit-transition":".2s","-moz-transition":".2s","-ms-transition":".2s","-o-transition":".2s",left:$(d).offset().left+d.offsetWidth+"px",top:$(d).offset().top+"px"}).data("position",$(d).offset().left+d.offsetWidth+"x"+$(d).offset().top))},100);setTimeout(function(){$(d).offset()&&($("#w2ui-tag-"+g).css({opacity:"1",left:$(d).offset().left+d.offsetWidth+"px",top:$(d).offset().top+"px"}).html('<div style="margin-top: -2px 0px 0px -2px; white-space: nowrap;"> <div class="w2ui-tag-body">'+a+"</div> </div>").data("text",a).data("taged-el",d).data("options",b).data("position",$(d).offset().left+d.offsetWidth+"x"+$(d).offset().top).data("timer",h),$(d).off("keypress",e).on("keypress",e).off("change",e).on("change",e).css(b.css).addClass(b["class"]),"function"==typeof b.onShow&&b.onShow())},1);var i="";$(d).length>0&&(i=$(d)[0].style.cssText)}})},$.fn.w2overlay=function(a,b){function c(){var a=$("#w2ui-overlay"+g);if(a.data("element")===f[0]&&0!==a.length){var b=$(f).offset().left+"x"+$(f).offset().top;a.data("position")!==b?d():setTimeout(c,250)}}function d(){var a=$("#w2ui-overlay"+g);if(a.data("keepOpen")===!0)return void a.removeData("keepOpen");var c;"function"==typeof b.onHide&&(c=b.onHide()),c!==!1&&(a.remove(),$(document).off("click",d),clearInterval(a.data("timer")))}function e(){var a=$("#w2ui-overlay"+g),c=a.find(" > div");if(a.length>0){c.height("auto").width("auto");var d=!1,h=!1,i=c.height(),j=c.width();switch(b.width&&b.width<j&&(j=b.width),30>j&&(j=30),b.tmp.contentHeight&&(i=b.tmp.contentHeight,c.height(i),setTimeout(function(){c.height()>c.find("div.menu > table").height()&&c.find("div.menu").css("overflow-y","hidden")},1),setTimeout(function(){c.find("div.menu").css("overflow-y","auto")},10)),b.tmp.contentWidth&&(j=b.tmp.contentWidth,c.width(j),setTimeout(function(){c.width()>c.find("div.menu > table").width()&&c.find("div.menu").css("overflow-x","hidden")},1),setTimeout(function(){c.find("div.menu").css("overflow-y","auto")},10)),b.align){case"both":b.left=17,0===b.width&&(b.width=w2utils.getSize($(f),"width"));break;case"left":b.left=17;break;case"right":b.tipLeft=j-45,b.left=w2utils.getSize($(f),"width")-j+10}var k=(j-17)/2,l=b.left,m=b.width,n=b.tipLeft;m=30!==j||m?b.width?b.width:"auto":30,25>k&&(l=25-k,n=Math.floor(k)),a.css({top:f.offset().top+w2utils.getSize(f,"height")+b.top+7+"px",left:(f.offset().left>25?f.offset().left:25)+l+"px","min-width":m,"min-height":b.height?b.height:"auto"});var o=window.innerHeight+$(document).scrollTop()-c.offset().top-7,p=window.innerWidth+$(document).scrollLeft()-c.offset().left-7;o>-50&&210>o||b.openAbove===!0?(o=c.offset().top-$(document).scrollTop()-7,b.maxHeight&&o>b.maxHeight&&(o=b.maxHeight),i>o&&(h=!0,c.height(o).width(j).css({"overflow-y":"auto"}),i=o),a.css("top",$(f).offset().top-i-24+b.top+"px"),a.find(">style").html("#w2ui-overlay"+g+":before { display: none; margin-left: "+parseInt(n)+"px; }#w2ui-overlay"+g+":after { display: block; margin-left: "+parseInt(n)+"px; }")):(b.maxHeight&&o>b.maxHeight&&(o=b.maxHeight),i>o&&(h=!0,c.height(o).width(j).css({"overflow-y":"auto"})),a.find(">style").html("#w2ui-overlay"+g+":before { display: block; margin-left: "+parseInt(n)+"px; }#w2ui-overlay"+g+":after { display: none; margin-left: "+parseInt(n)+"px; }")),j=c.width(),p=window.innerWidth+$(document).scrollLeft()-c.offset().left-7,b.maxWidth&&p>b.maxWidth&&(p=b.maxWidth),j>p&&"both"!==b.align&&(b.align="right",setTimeout(function(){e()},1)),h&&d&&c.width(j+w2utils.scrollBarSize()+2)}}var f=this,g="",h={name:null,html:"",align:"none",left:0,top:0,tipLeft:30,width:0,height:0,maxWidth:null,maxHeight:null,style:"","class":"",onShow:null,onHide:null,openAbove:!1,tmp:{}};1==arguments.length&&(b="object"==typeof a?a:{html:a}),2==arguments.length&&(b.html=a),$.isPlainObject(b)||(b={}),b=$.extend({},h,b),b.name&&(g="-"+b.name);var i;if(0===this.length||""===b.html||null==b.html)return $("#w2ui-overlay"+g).length>0?(i=$("#w2ui-overlay"+g)[0].hide,"function"==typeof i&&i()):$("#w2ui-overlay"+g).remove(),$(this);$("#w2ui-overlay"+g).length>0&&(i=$("#w2ui-overlay"+g)[0].hide,$(document).off("click",i),"function"==typeof i&&i()),$("body").append('<div id="w2ui-overlay'+g+'" style="display: none"        class="w2ui-reset w2ui-overlay '+($(this).parents(".w2ui-popup, .w2ui-overlay-popup").length>0?"w2ui-overlay-popup":"")+'">    <style></style>    <div style="'+b.style+'" class="'+b["class"]+'"></div></div>');var j=$("#w2ui-overlay"+g),k=j.find(" > div");k.html(b.html);var l=k.css("background-color");return null!=l&&"rgba(0, 0, 0, 0)"!==l&&"transparent"!==l&&j.css("background-color",l),j.data("element",f.length>0?f[0]:null).data("options",b).data("position",$(f).offset().left+"x"+$(f).offset().top).fadeIn("fast").on("mousedown",function(a){$("#w2ui-overlay"+g).data("keepOpen",!0),-1===["INPUT","TEXTAREA","SELECT"].indexOf(a.target.tagName)&&a.preventDefault()}),j[0].hide=d,j[0].resize=e,e(),setTimeout(function(){e(),$(document).off("click",d).on("click",d),"function"==typeof b.onShow&&b.onShow()},10),c(),$(this)},$.fn.w2menu=function(a,b){function c(){setTimeout(function(){$("#w2ui-overlay"+h+" tr.w2ui-selected").removeClass("w2ui-selected");var a=$("#w2ui-overlay"+h+" tr[index="+b.index+"]"),c=$("#w2ui-overlay"+h+" div.menu").scrollTop();if(a.addClass("w2ui-selected"),b.tmp&&(b.tmp.contentHeight=$("#w2ui-overlay"+h+" table").height()+(b.search?50:10)),b.tmp&&(b.tmp.contentWidth=$("#w2ui-overlay"+h+" table").width()),$("#w2ui-overlay"+h).length>0&&$("#w2ui-overlay"+h)[0].resize(),a.length>0){var d=a[0].offsetTop-5,e=$("#w2ui-overlay"+h+" div.menu"),f=e.height();$("#w2ui-overlay"+h+" div.menu").scrollTop(c),(c>d||d+a.height()>c+f)&&$("#w2ui-overlay"+h+" div.menu").animate({scrollTop:d-(f-2*a.height())/2},200,"linear")}},1)}function d(a){var d=this.value,e=a.keyCode,f=!1;switch(e){case 13:$("#w2ui-overlay"+h).remove(),$.fn.w2menuHandler(a,b.index);break;case 9:case 27:$("#w2ui-overlay"+h).remove(),$.fn.w2menuHandler(a,-1);break;case 38:for(b.index=w2utils.isInt(b.index)?parseInt(b.index):0,b.index--;b.index>0&&b.items[b.index].hidden;)b.index--;if(0===b.index&&b.items[b.index].hidden)for(;b.items[b.index]&&b.items[b.index].hidden;)b.index++;b.index<0&&(b.index=0),f=!0;break;case 40:for(b.index=w2utils.isInt(b.index)?parseInt(b.index):0,b.index++;b.index<b.items.length-1&&b.items[b.index].hidden;)b.index++;if(b.index===b.items.length-1&&b.items[b.index].hidden)for(;b.items[b.index]&&b.items[b.index].hidden;)b.index--;b.index>=b.items.length&&(b.index=b.items.length-1),f=!0}if(!f){var i=0;for(var j in b.items){var k=b.items[j],l="",m="";-1!==["is","begins with"].indexOf(b.match)&&(l="^"),-1!==["is","ends with"].indexOf(b.match)&&(m="$");try{var n=new RegExp(l+d+m,"i");k.hidden=n.test(k.text)||"..."===k.text?!1:!0}catch(o){}"enum"===g.type&&-1!==$.inArray(k.id,ids)&&(k.hidden=!0),k.hidden!==!0&&i++}for(b.index=0;b.index<b.items.length-1&&b.items[b.index].hidden;)b.index++;
0>=i&&(b.index=-1)}$(g).w2menu("refresh",b),c()}function e(){if(b.spinner)return'<table class="w2ui-drop-menu"><tr><td style="padding: 5px 10px 10px 10px; text-align: center">    <div class="w2ui-spinner" style="width: 18px; height: 18px; position: relative; top: 5px;"></div>     <div style="display: inline-block; padding: 3px; color: #999;">'+w2utils.lang("Loading...")+"</div></td></tr></table>";for(var a=0,c='<table cellspacing="0" cellpadding="0" class="w2ui-drop-menu">',d=null,e=null,f=0;f<b.items.length;f++){var g=b.items[f];if("string"==typeof g?g={id:g,text:g}:(null!=g.text&&null==g.id&&(g.id=g.text),null==g.text&&null!=g.id&&(g.text=g.id),null!=g.caption&&(g.text=g.caption),d=g.img,e=g.icon,null==d&&(d=null),null==e&&(e=null)),g.hidden!==!0){var i="",j=g.text;if("function"==typeof b.render&&(j=b.render(g,b)),d&&(i='<td class="menu-icon"><div class="w2ui-tb-image w2ui-icon '+d+'"></div></td>'),e&&(i='<td class="menu-icon" align="center"><span class="w2ui-icon '+e+'"></span></td>'),"undefined"==typeof j||""===j||/^-+$/.test(j))c+='<tr><td colspan="2" style="padding: 6px; pointer-events: none"><div style="border-top: 1px solid silver;"></div></td></tr>';else{var k=a%2===0?"w2ui-item-even":"w2ui-item-odd";b.altRows!==!0&&(k="");var l=1;""==i&&l++,null==g.count&&l++,c+='<tr index="'+f+'" style="'+(g.style?g.style:"")+'"         class="'+k+" "+(b.index===f?"w2ui-selected":"")+" "+(g.disabled===!0?"w2ui-disabled":"")+"\"        onmousedown=\"$(this).parent().find('tr').removeClass('w2ui-selected'); $(this).addClass('w2ui-selected');\"        onclick=\"event.stopPropagation();                if ("+(g.disabled===!0?"true":"false")+") return;               $('#w2ui-overlay"+h+"').remove();                $.fn.w2menuHandler(event, '"+f+"');\">"+i+'   <td class="menu-text" colspan="'+l+'">'+j+'</td>   <td class="menu-count">'+(null!=g.count?"<span>"+g.count+"</span>":"")+"</td></tr>",a++}}b.items[f]=g}return 0===a&&(c+='<tr><td style="padding: 13px; color: #999; text-align: center">'+b.msgNoItems+"</div></td></tr>"),c+="</table>"}var f={index:null,items:[],render:null,msgNoItems:"No items",onSelect:null,tmp:{}},g=this,h="";if("refresh"!==a){1===arguments.length?b=a:b.items=a,"object"!=typeof b&&(b={}),b=$.extend({},f,b),$.fn.w2menuOptions=b,b.name&&(h="-"+b.name),"function"==typeof b.select&&"function"!=typeof b.onSelect&&(b.onSelect=b.select),"function"==typeof b.onRender&&"function"!=typeof b.render&&(b.render=b.onRender),$.fn.w2menuHandler=function(a,c){"function"==typeof b.onSelect&&setTimeout(function(){b.onSelect({index:c,item:b.items[c],originalEvent:a})},10)};var i="";if(b.search){i+='<div style="position: absolute; top: 0px; height: 40px; left: 0px; right: 0px; border-bottom: 1px solid silver; background-color: #ECECEC; padding: 8px 5px;">    <div class="w2ui-icon icon-search" style="position: absolute; margin-top: 4px; margin-left: 6px; width: 11px; background-position: left !important;"></div>    <input id="menu-search" type="text" style="width: 100%; outline: none; padding-left: 20px;" onclick="event.stopPropagation();"></div>',b.style+=";background-color: #ECECEC",b.index=0;for(var j in b.items)b.items[j].hidden=!1}i+='<div class="menu" style="position: absolute; top: '+(b.search?40:0)+'px; bottom: 0px; width: 100%; overflow: auto;">'+e()+"</div>";var k=$(this).w2overlay(i,b);return setTimeout(function(){if($("#w2ui-overlay"+h+" #menu-search").on("keyup",d).on("keydown",function(a){9===a.keyCode&&(a.stopPropagation(),a.preventDefault())}),b.search){if(-1!=["text","password"].indexOf($(g)[0].type)||"texarea"==$(g)[0].tagName)return;$("#w2ui-overlay"+h+" #menu-search").focus()}},200),c(),k}if($("#w2ui-overlay"+h).length>0){b=$.extend($.fn.w2menuOptions,b);var l=$("#w2ui-overlay"+h+" div.menu").scrollTop();$("#w2ui-overlay"+h+" div.menu").html(e()),$("#w2ui-overlay"+h+" div.menu").scrollTop(l),c()}else $(this).w2menu(b)}}(),function(){var w2grid=function(a){this.name=null,this.box=null,this.header="",this.url="",this.routeData={},this.columns=[],this.columnGroups=[],this.records=[],this.summary=[],this.searches=[],this.searchData=[],this.sortData=[],this.postData={},this.toolbar={},this.show={header:!1,toolbar:!1,footer:!1,columnHeaders:!0,lineNumbers:!1,expandColumn:!1,selectColumn:!1,emptyRecords:!0,toolbarReload:!0,toolbarColumns:!0,toolbarSearch:!0,toolbarAdd:!1,toolbarEdit:!1,toolbarDelete:!1,toolbarSave:!1,selectionBorder:!0,recordTitles:!0,skipRecords:!0},this.autoLoad=!0,this.fixedBody=!0,this.recordHeight=24,this.keyboard=!0,this.selectType="row",this.multiSearch=!0,this.multiSelect=!0,this.multiSort=!0,this.reorderColumns=!1,this.reorderRows=!1,this.markSearch=!0,this.total=0,this.limit=100,this.offset=0,this.style="",this.ranges=[],this.menu=[],this.method=null,this.recid=null,this.parser=null,this.onAdd=null,this.onEdit=null,this.onRequest=null,this.onLoad=null,this.onDelete=null,this.onDeleted=null,this.onSubmit=null,this.onSave=null,this.onSelect=null,this.onUnselect=null,this.onClick=null,this.onDblClick=null,this.onContextMenu=null,this.onMenuClick=null,this.onColumnClick=null,this.onColumnResize=null,this.onSort=null,this.onSearch=null,this.onChange=null,this.onRestore=null,this.onExpand=null,this.onCollapse=null,this.onError=null,this.onKeydown=null,this.onToolbar=null,this.onColumnOnOff=null,this.onCopy=null,this.onPaste=null,this.onSelectionExtend=null,this.onEditField=null,this.onRender=null,this.onRefresh=null,this.onReload=null,this.onResize=null,this.onDestroy=null,this.onStateSave=null,this.onStateRestore=null,this.last={field:"all",caption:w2utils.lang("All Fields"),logic:"OR",search:"",searchIds:[],selection:{indexes:[],columns:{}},multi:!1,scrollTop:0,scrollLeft:0,sortData:null,sortCount:0,xhr:null,range_start:null,range_end:null,sel_ind:null,sel_col:null,sel_type:null,edit_col:null},$.extend(!0,this,w2obj.grid,a)};$.fn.w2grid=function(a){if("object"==typeof a||!a){if(!w2utils.checkName(a,"w2grid"))return;var b=a.columns,c=a.columnGroups,d=a.records,e=a.searches,f=a.searchData,g=a.sortData,h=a.postData,i=a.toolbar,j=new w2grid(a);$.extend(j,{postData:{},records:[],columns:[],searches:[],toolbar:{},sortData:[],searchData:[],handlers:[]}),null!=j.onExpand&&(j.show.expandColumn=!0),$.extend(!0,j.toolbar,i);for(var k in b)j.columns[k]=$.extend(!0,{},b[k]);for(var k in c)j.columnGroups[k]=$.extend(!0,{},c[k]);for(var k in e)j.searches[k]=$.extend(!0,{},e[k]);for(var k in f)j.searchData[k]=$.extend(!0,{},f[k]);for(var k in g)j.sortData[k]=$.extend(!0,{},g[k]);j.postData=$.extend(!0,{},h);for(var l in d){if(null==d[l].recid||"undefined"==typeof d[l].recid)return void console.log("ERROR: Cannot add records without recid. (obj: "+j.name+")");j.records[l]=$.extend(!0,{},d[l])}for(var m in j.columns){var n=j.columns[m];if("undefined"!=typeof n.searchable&&null==j.getSearch(n.field)){var o=n.searchable,p="";n.searchable===!0&&(o="text",p='size="20"'),j.addSearch({field:n.field,caption:n.caption,type:o,attr:p})}}return j.initToolbar(),0!==$(this).length&&j.render($(this)[0]),w2ui[j.name]=j,j}if(w2ui[$(this).attr("name")]){var q=w2ui[$(this).attr("name")];return q[a].apply(q,Array.prototype.slice.call(arguments,1)),this}console.log("ERROR: Method "+a+" does not exist on jQuery.w2grid")},w2grid.prototype={msgDelete:w2utils.lang("Are you sure you want to delete selected records?"),msgNotJSON:w2utils.lang("Returned data is not in valid JSON format."),msgAJAXerror:w2utils.lang("AJAX error. See console for more details."),msgRefresh:w2utils.lang("Refreshing..."),buttons:{reload:{type:"button",id:"w2ui-reload",icon:"w2ui-icon-reload",hint:w2utils.lang("Reload data in the list")},columns:{type:"drop",id:"w2ui-column-on-off",icon:"w2ui-icon-columns",hint:w2utils.lang("Show/hide columns"),arrow:!1,html:""},search:{type:"html",id:"w2ui-search",html:'<div class="w2ui-icon icon-search-down w2ui-search-down" title="Select Search Field" onclick="var obj = w2ui[$(this).parents(\'div.w2ui-grid\').attr(\'name\')]; obj.searchShowFields();"></div>'},"search-go":{type:"check",id:"w2ui-search-advanced",caption:w2utils.lang("Search..."),hint:w2utils.lang("Open Search Fields")},add:{type:"button",id:"w2ui-add",caption:w2utils.lang("Add New"),hint:w2utils.lang("Add new record"),icon:"w2ui-icon-plus"},edit:{type:"button",id:"w2ui-edit",caption:w2utils.lang("Edit"),hint:w2utils.lang("Edit selected record"),icon:"w2ui-icon-pencil",disabled:!0},"delete":{type:"button",id:"w2ui-delete",caption:w2utils.lang("Delete"),hint:w2utils.lang("Delete selected records"),icon:"w2ui-icon-cross",disabled:!0},save:{type:"button",id:"w2ui-save",caption:w2utils.lang("Save"),hint:w2utils.lang("Save changed records"),icon:"w2ui-icon-check"}},add:function(a){$.isArray(a)||(a=[a]);var b=0;for(var c in a)this.recid&&"undefined"==typeof a[c].recid&&(a[c].recid=a[c][this.recid]),null!=a[c].recid&&"undefined"!=typeof a[c].recid?(this.records.push(a[c]),b++):console.log("ERROR: Cannot add record without recid. (obj: "+this.name+")");var d="object"!=typeof this.url?this.url:this.url.get;return d||(this.total=this.records.length,this.localSort(),this.localSearch()),this.refresh(),b},find:function(a,b){("undefined"==typeof a||null==a)&&(a={});var c=[],d=!1;for(var e in a)-1!=String(e).indexOf(".")&&(d=!0);for(var f=0;f<this.records.length;f++){var g=!0;for(var e in a){var h=this.records[f][e];d&&-1!=String(e).indexOf(".")&&(h=this.parseField(this.records[f],e)),a[e]!=h&&(g=!1)}g&&b!==!0&&c.push(this.records[f].recid),g&&b===!0&&c.push(f)}return c},set:function(a,b,c){if("object"==typeof a&&(c=b,b=a,a=null),null==a){for(var d in this.records)$.extend(!0,this.records[d],b);c!==!0&&this.refresh()}else{var e=this.get(a,!0);if(null==e)return!1;var f=this.records[e]&&this.records[e].recid==a?!1:!0;f?$.extend(!0,this.summary[e],b):$.extend(!0,this.records[e],b),c!==!0&&this.refreshRow(a)}return!0},get:function(a,b){for(var c=0;c<this.records.length;c++)if(this.records[c].recid==a)return b===!0?c:this.records[c];for(var c=0;c<this.summary.length;c++)if(this.summary[c].recid==a)return b===!0?c:this.summary[c];return null},remove:function(){for(var a=0,b=0;b<arguments.length;b++)for(var c=this.records.length-1;c>=0;c--)this.records[c].recid==arguments[b]&&(this.records.splice(c,1),a++);var d="object"!=typeof this.url?this.url:this.url.get;return d||(this.localSort(),this.localSearch()),this.refresh(),a},addColumn:function(a,b){var c=0;1==arguments.length?(b=a,a=this.columns.length):("string"==typeof a&&(a=this.getColumn(a,!0)),null===a&&(a=this.columns.length)),$.isArray(b)||(b=[b]);for(var d in b)this.columns.splice(a,0,b[d]),a++,c++;return this.refresh(),c},removeColumn:function(){for(var a=0,b=0;b<arguments.length;b++)for(var c=this.columns.length-1;c>=0;c--)this.columns[c].field==arguments[b]&&(this.columns.splice(c,1),a++);return this.refresh(),a},getColumn:function(a,b){for(var c=0;c<this.columns.length;c++)if(this.columns[c].field==a)return b===!0?c:this.columns[c];return null},toggleColumn:function(){for(var a=0,b=0;b<arguments.length;b++)for(var c=this.columns.length-1;c>=0;c--){var d=this.columns[c];d.field==arguments[b]&&(d.hidden=!d.hidden,a++)}return this.refresh(),a},showColumn:function(){for(var a=0,b=0;b<arguments.length;b++)for(var c=this.columns.length-1;c>=0;c--){var d=this.columns[c];d.gridMinWidth&&delete d.gridMinWidth,d.field==arguments[b]&&d.hidden!==!1&&(d.hidden=!1,a++)}return this.refresh(),a},hideColumn:function(){for(var a=0,b=0;b<arguments.length;b++)for(var c=this.columns.length-1;c>=0;c--){var d=this.columns[c];d.field==arguments[b]&&d.hidden!==!0&&(d.hidden=!0,a++)}return this.refresh(),a},addSearch:function(a,b){var c=0;1==arguments.length?(b=a,a=this.searches.length):("string"==typeof a&&(a=this.getSearch(a,!0)),null===a&&(a=this.searches.length)),$.isArray(b)||(b=[b]);for(var d in b)this.searches.splice(a,0,b[d]),a++,c++;return this.searchClose(),c},removeSearch:function(){for(var a=0,b=0;b<arguments.length;b++)for(var c=this.searches.length-1;c>=0;c--)this.searches[c].field==arguments[b]&&(this.searches.splice(c,1),a++);return this.searchClose(),a},getSearch:function(a,b){for(var c=0;c<this.searches.length;c++)if(this.searches[c].field==a)return b===!0?c:this.searches[c];return null},toggleSearch:function(){for(var a=0,b=0;b<arguments.length;b++)for(var c=this.searches.length-1;c>=0;c--)this.searches[c].field==arguments[b]&&(this.searches[c].hidden=!this.searches[c].hidden,a++);return this.searchClose(),a},showSearch:function(){for(var a=0,b=0;b<arguments.length;b++)for(var c=this.searches.length-1;c>=0;c--)this.searches[c].field==arguments[b]&&this.searches[c].hidden!==!1&&(this.searches[c].hidden=!1,a++);return this.searchClose(),a},hideSearch:function(){for(var a=0,b=0;b<arguments.length;b++)for(var c=this.searches.length-1;c>=0;c--)this.searches[c].field==arguments[b]&&this.searches[c].hidden!==!0&&(this.searches[c].hidden=!0,a++);return this.searchClose(),a},getSearchData:function(a){for(var b in this.searchData)if(this.searchData[b].field==a)return this.searchData[b];return null},localSort:function(a){var b="object"!=typeof this.url?this.url:this.url.get;if(b)return void console.log("ERROR: grid.localSort can only be used on local data source, grid.url should be empty.");if(!$.isEmptyObject(this.sortData)){var c=(new Date).getTime(),d=this;d.prepareData();for(var e in this.sortData){var f=this.getColumn(this.sortData[e].field);if(!f)return;"string"==typeof f.render&&(-1!=["date","age"].indexOf(f.render.split(":")[0])&&(this.sortData[e].field_=f.field+"_"),-1!=["time"].indexOf(f.render.split(":")[0])&&(this.sortData[e].field_=f.field+"_"))}return this.records.sort(function(a,b){var c=0;for(var e in d.sortData){var f=d.sortData[e].field;d.sortData[e].field_&&(f=d.sortData[e].field_);var g=a[f],h=b[f];if(-1!=String(f).indexOf(".")&&(g=d.parseField(a,f),h=d.parseField(b,f)),"string"==typeof g&&(g=$.trim(g.toLowerCase())),"string"==typeof h&&(h=$.trim(h.toLowerCase())),g>h&&(c="asc"==d.sortData[e].direction?1:-1),h>g&&(c="asc"==d.sortData[e].direction?-1:1),"object"!=typeof g&&"object"==typeof h&&(c=-1),"object"!=typeof h&&"object"==typeof g&&(c=1),null==g&&null!=h&&(c=1),null!=g&&null==h&&(c=-1),0!=c)break}return c}),c=(new Date).getTime()-c,a!==!0&&setTimeout(function(){d.status(w2utils.lang("Sorting took")+" "+c/1e3+" "+w2utils.lang("sec"))},10),c}},localSearch:function(a){var b="object"!=typeof this.url?this.url:this.url.get;if(b)return void console.log("ERROR: grid.localSearch can only be used on local data source, grid.url should be empty.");var c=(new Date).getTime(),d=this;if(this.total=this.records.length,this.last.searchIds=[],this.prepareData(),this.searchData.length>0&&!b){this.total=0;for(var e in this.records){var f=this.records[e],g=0;for(var h in this.searchData){var i=this.searchData[h],j=this.getSearch(i.field);if(null!=i){null==j&&(j={field:i.field,type:i.type});var k=String(d.parseField(f,j.field)).toLowerCase();if("undefined"!=typeof i.value)if($.isArray(i.value))var l=i.value[0],m=i.value[1];else var l=String(i.value).toLowerCase();switch(i.operator){case"is":if(f[j.field]==i.value&&g++,"date"==j.type){var k=w2utils.formatDate(f[j.field+"_"],"yyyy-mm-dd"),l=w2utils.formatDate(l,"yyyy-mm-dd");k==l&&g++}if("time"==j.type){var k=w2utils.formatTime(f[j.field+"_"],"h24:mi"),l=w2utils.formatTime(l,"h24:mi");k==l&&g++}break;case"between":if(-1!=["int","float","money","currency","percent"].indexOf(j.type)&&parseFloat(f[j.field])>=parseFloat(l)&&parseFloat(f[j.field])<=parseFloat(m)&&g++,"date"==j.type){var k=f[j.field+"_"],l=w2utils.isDate(l,w2utils.settings.date_format,!0),m=w2utils.isDate(m,w2utils.settings.date_format,!0);null!=m&&(m=new Date(m.getTime()+864e5)),k>=l&&m>k&&g++}if("time"==j.type){var k=f[j.field+"_"],l=w2utils.isTime(l,!0),m=w2utils.isTime(m,!0);l=(new Date).setHours(l.hours,l.minutes,l.seconds?l.seconds:0,0),m=(new Date).setHours(m.hours,m.minutes,m.seconds?m.seconds:0,0),k>=l&&m>k&&g++}break;case"in":var n=i.value;i.svalue&&(n=i.svalue),-1!==n.indexOf(k)&&g++;break;case"not in":var n=i.value;i.svalue&&(n=i.svalue),-1==n.indexOf(k)&&g++;break;case"begins":case"begins with":0==k.indexOf(l)&&g++;break;case"contains":k.indexOf(l)>=0&&g++;break;case"ends":case"ends with":k.indexOf(l)>=0&&k.indexOf(l)==k.length-l.length&&g++}}}("OR"==this.last.logic&&0!=g||"AND"==this.last.logic&&g==this.searchData.length)&&this.last.searchIds.push(parseInt(e))}this.total=this.last.searchIds.length}return c=(new Date).getTime()-c,a!==!0&&setTimeout(function(){d.status(w2utils.lang("Search took")+" "+c/1e3+" "+w2utils.lang("sec"))},10),c},getRangeData:function(a,b){var c=this.get(a[0].recid,!0),d=this.get(a[1].recid,!0),e=a[0].column,f=a[1].column,g=[];if(e==f)for(var h=c;d>=h;h++){var i=this.records[h],j=i[this.columns[e].field]||null;g.push(b!==!0?j:{data:j,column:e,index:h,record:i})}else if(c==d)for(var i=this.records[c],k=e;f>=k;k++){var j=i[this.columns[k].field]||null;g.push(b!==!0?j:{data:j,column:k,index:c,record:i})}else for(var h=c;d>=h;h++){var i=this.records[h];g.push([]);for(var k=e;f>=k;k++){var j=i[this.columns[k].field];g[g.length-1].push(b!==!0?j:{data:j,column:k,index:h,record:i})}}return g},addRange:function(a){var b=0;if("row"==this.selectType)return b;$.isArray(a)||(a=[a]);for(var c in a){if("object"!=typeof a[c]&&(a[c]={name:"selection"}),"selection"==a[c].name){if(this.show.selectionBorder===!1)continue;var d=this.getSelection();if(0==d.length){this.removeRange(a[c].name);continue}{var e=d[0],f=d[d.length-1];$("#grid_"+this.name+"_rec_"+e.recid+" td[col="+e.column+"]"),$("#grid_"+this.name+"_rec_"+f.recid+" td[col="+f.column+"]")}}else{var e=a[c].range[0],f=a[c].range[1];$("#grid_"+this.name+"_rec_"+e.recid+" td[col="+e.column+"]"),$("#grid_"+this.name+"_rec_"+f.recid+" td[col="+f.column+"]")}if(e){var g={name:a[c].name,range:[{recid:e.recid,column:e.column},{recid:f.recid,column:f.column}],style:a[c].style||""},h=!1;for(var i in this.ranges)if(this.ranges[i].name==a[c].name){h=c;break}h!==!1?this.ranges[h]=g:this.ranges.push(g),b++}}return this.refreshRanges(),b},removeRange:function(){for(var a=0,b=0;b<arguments.length;b++){var c=arguments[b];$("#grid_"+this.name+"_"+c).remove();for(var d=this.ranges.length-1;d>=0;d--)this.ranges[d].name==c&&(this.ranges.splice(d,1),a++)}return a},refreshRanges:function(){function a(a){var e=d.getSelection();d.last.move={type:"expand",x:a.screenX,y:a.screenY,divX:0,divY:0,recid:e[0].recid,column:e[0].column,originalRange:[{recid:e[0].recid,column:e[0].column},{recid:e[e.length-1].recid,column:e[e.length-1].column}],newRange:[{recid:e[0].recid,column:e[0].column},{recid:e[e.length-1].recid,column:e[e.length-1].column}]},$(document).off("mousemove",b).on("mousemove",b),$(document).off("mouseup",c).on("mouseup",c)}function b(a){var b=d.last.move;if(b&&"expand"==b.type){b.divX=a.screenX-b.x,b.divY=a.screenY-b.y;var c,e,f=a.originalEvent.target;if("TD"!=f.tagName&&(f=$(f).parents("td")[0]),"undefined"!=typeof $(f).attr("col")&&(e=parseInt($(f).attr("col"))),f=$(f).parents("tr")[0],c=$(f).attr("recid"),b.newRange[1].recid!=c||b.newRange[1].column!=e){var g=$.extend({},b.newRange);return b.newRange=[{recid:b.recid,column:b.column},{recid:c,column:e}],m=d.trigger($.extend(m,{originalRange:b.originalRange,newRange:b.newRange})),m.isCancelled===!0?(b.newRange=g,void(m.newRange=g)):(d.removeRange("grid-selection-expand"),void d.addRange({name:"grid-selection-expand",range:m.newRange,style:"background-color: rgba(100,100,100,0.1); border: 2px dotted rgba(100,100,100,0.5);"}))}}}function c(){d.removeRange("grid-selection-expand"),delete d.last.move,$(document).off("mousemove",b),$(document).off("mouseup",c),d.trigger($.extend(m,{phase:"after"}))}var d=this,e=(new Date).getTime(),f=$("#grid_"+this.name+"_records");for(var g in this.ranges){var h=this.ranges[g],i=h.range[0],j=h.range[1],k=$("#grid_"+this.name+"_rec_"+i.recid+" td[col="+i.column+"]"),l=$("#grid_"+this.name+"_rec_"+j.recid+" td[col="+j.column+"]");0==$("#grid_"+this.name+"_"+h.name).length?f.append('<div id="grid_'+this.name+"_"+h.name+'" class="w2ui-selection" style="'+h.style+'">'+("selection"==h.name?'<div id="grid_'+this.name+'_resizer" class="w2ui-selection-resizer"></div>':"")+"</div>"):$("#grid_"+this.name+"_"+h.name).attr("style",h.style),k.length>0&&l.length>0&&$("#grid_"+this.name+"_"+h.name).css({left:k.position().left-1+f.scrollLeft()+"px",top:k.position().top-1+f.scrollTop()+"px",width:l.position().left-k.position().left+l.width()+3+"px",height:l.position().top-k.position().top+l.height()+3+"px"})}$(this.box).find("#grid_"+this.name+"_resizer").off("mousedown").on("mousedown",a);var m={phase:"before",type:"selectionExtend",target:d.name,originalRange:null,newRange:null};return(new Date).getTime()-e},select:function(){var a=0,b=this.last.selection;this.multiSelect||this.selectNone();for(var c=0;c<arguments.length;c++){var d="object"==typeof arguments[c]?arguments[c].recid:arguments[c],e=this.get(d);if(null!=e){var f=this.get(d,!0),g=$("#grid_"+this.name+"_rec_"+w2utils.escapeId(d));if("row"==this.selectType){if(b.indexes.indexOf(f)>=0)continue;var h=this.trigger({phase:"before",type:"select",target:this.name,recid:d,index:f});if(h.isCancelled===!0)continue;b.indexes.push(f),b.indexes.sort(function(a,b){return a-b}),g.addClass("w2ui-selected").data("selected","yes"),g.find(".w2ui-grid-select-check").prop("checked",!0),a++}else{var i=arguments[c].column;if(!w2utils.isInt(i)){var j=[];for(var k in this.columns)this.columns[k].hidden||j.push({recid:d,column:parseInt(k)});return this.multiSelect||(j=j.splice(0,1)),this.select.apply(this,j)}var l=b.columns[f]||[];if($.isArray(l)&&-1!=l.indexOf(i))continue;var h=this.trigger({phase:"before",type:"select",target:this.name,recid:d,index:f,column:i});if(h.isCancelled===!0)continue;-1==b.indexes.indexOf(f)&&(b.indexes.push(f),b.indexes.sort(function(a,b){return a-b})),l.push(i),l.sort(function(a,b){return a-b}),g.find(" > td[col="+i+"]").addClass("w2ui-selected"),a++,g.data("selected","yes"),g.find(".w2ui-grid-select-check").prop("checked",!0),b.columns[f]=l}this.trigger($.extend(h,{phase:"after"}))}}return b.indexes.length==this.records.length||0!==this.searchData.length&&b.indexes.length==this.last.searchIds.length?$("#grid_"+this.name+"_check_all").prop("checked",!0):$("#grid_"+this.name+"_check_all").prop("checked",!1),this.status(),this.addRange("selection"),a},unselect:function(){for(var a=0,b=this.last.selection,c=0;c<arguments.length;c++){var d="object"==typeof arguments[c]?arguments[c].recid:arguments[c],e=this.get(d);if(null!=e){var f=this.get(e.recid,!0),g=$("#grid_"+this.name+"_rec_"+w2utils.escapeId(d));if("row"==this.selectType){if(-1==b.indexes.indexOf(f))continue;var h=this.trigger({phase:"before",type:"unselect",target:this.name,recid:d,index:f});if(h.isCancelled===!0)continue;b.indexes.splice(b.indexes.indexOf(f),1),g.removeClass("w2ui-selected").removeData("selected"),0!=g.length&&(g[0].style.cssText="height: "+this.recordHeight+"px; "+g.attr("custom_style")),g.find(".w2ui-grid-select-check").prop("checked",!1),a++}else{var i=arguments[c].column;if(!w2utils.isInt(i)){var j=[];for(var k in this.columns)this.columns[k].hidden||j.push({recid:d,column:parseInt(k)});return this.unselect.apply(this,j)}var l=b.columns[f];if(!$.isArray(l)||-1==l.indexOf(i))continue;var h=this.trigger({phase:"before",type:"unselect",target:this.name,recid:d,column:i});if(h.isCancelled===!0)continue;l.splice(l.indexOf(i),1),$("#grid_"+this.name+"_rec_"+w2utils.escapeId(d)+" > td[col="+i+"]").removeClass("w2ui-selected"),a++,0==l.length&&(delete b.columns[f],b.indexes.splice(b.indexes.indexOf(f),1),g.removeData("selected"),g.find(".w2ui-grid-select-check").prop("checked",!1))}this.trigger($.extend(h,{phase:"after"}))}}return b.indexes.length==this.records.length||0!==this.searchData.length&&b.indexes.length==this.last.searchIds.length?$("#grid_"+this.name+"_check_all").prop("checked",!0):$("#grid_"+this.name+"_check_all").prop("checked",!1),this.status(),this.addRange("selection"),a},selectAll:function(){if(this.multiSelect!==!1){var a=this.trigger({phase:"before",type:"select",target:this.name,all:!0});if(a.isCancelled!==!0){var b="object"!=typeof this.url?this.url:this.url.get,c=this.last.selection,d=[];for(var e in this.columns)d.push(parseInt(e));if(c.indexes=[],b||0===this.searchData.length){var f=this.records.length;0==this.searchData.length||this.url||(f=this.last.searchIds.length);for(var g=0;f>g;g++)c.indexes.push(g),"row"!=this.selectType&&(c.columns[g]=d.slice())}else for(var g=0;g<this.last.searchIds.length;g++)c.indexes.push(this.last.searchIds[g]),"row"!=this.selectType&&(c.columns[this.last.searchIds[g]]=d.slice());this.refresh();var c=this.getSelection();1==c.length?this.toolbar.enable("w2ui-edit"):this.toolbar.disable("w2ui-edit"),c.length>=1?this.toolbar.enable("w2ui-delete"):this.toolbar.disable("w2ui-delete"),this.addRange("selection"),this.trigger($.extend(a,{phase:"after"}))}}},selectNone:function(){var a=this.trigger({phase:"before",type:"unselect",target:this.name,all:!0});if(a.isCancelled!==!0){var b=this.last.selection;for(var c in b.indexes){var d=b.indexes[c],e=this.records[d],f=e?e.recid:null,g=$("#grid_"+this.name+"_rec_"+w2utils.escapeId(f));if(g.removeClass("w2ui-selected").removeData("selected"),g.find(".w2ui-grid-select-check").prop("checked",!1),"row"!=this.selectType){var h=b.columns[d];for(var i in h)g.find(" > td[col="+h[i]+"]").removeClass("w2ui-selected")}}b.indexes=[],b.columns={},this.toolbar.disable("w2ui-edit","w2ui-delete"),this.removeRange("selection"),$("#grid_"+this.name+"_check_all").prop("checked",!1),this.trigger($.extend(a,{phase:"after"}))}},getSelection:function(a){var b=[],c=this.last.selection;if("row"==this.selectType){for(var d in c.indexes)this.records[c.indexes[d]]&&b.push(a===!0?c.indexes[d]:this.records[c.indexes[d]].recid);return b}for(var d in c.indexes){var e=c.columns[c.indexes[d]];if(this.records[c.indexes[d]])for(var f in e)b.push({recid:this.records[c.indexes[d]].recid,index:parseInt(c.indexes[d]),column:e[f]})}return b},search:function(a,b){var c="object"!=typeof this.url?this.url:this.url.get,d=[],e=this.last.multi,f=this.last.logic,g=this.last.field,h=this.last.search;if(0==arguments.length){h="";for(var i in this.searches){var j=this.searches[i],k=$("#grid_"+this.name+"_operator_"+i).val(),l=$("#grid_"+this.name+"_field_"+i),m=$("#grid_"+this.name+"_field2_"+i),n=l.val(),o=m.val(),p=null;if(-1!=["int","float","money","currency","percent"].indexOf(j.type)){var q=l.data("w2field"),r=m.data("w2field");q&&(n=q.clean(n)),r&&(o=r.clean(o))}if(-1!=["list","enum"].indexOf(j.type))if(n=l.data("selected")||{},$.isArray(n)){p=[];for(var s in n)p.push(w2utils.isFloat(n[s].id)?parseFloat(n[s].id):String(n[s].id).toLowerCase()),delete n[s].hidden}else n=n.id||"";if(""!=n&&null!=n||"undefined"!=typeof o&&""!=o){var t={field:j.field,type:j.type,operator:k};"between"==k?$.extend(t,{value:[n,o]}):"in"==k&&"string"==typeof n?$.extend(t,{value:n.split(",")}):"not in"==k&&"string"==typeof n?$.extend(t,{value:n.split(",")}):$.extend(t,{value:n}),p&&$.extend(t,{svalue:p});try{"date"==j.type&&"between"==k&&(t.value[0]=n,t.value[1]=o),"date"==j.type&&"is"==k&&(t.value=n)}catch(u){}d.push(t)}}d.length>0&&!c?(e=!0,f="AND"):(e=!0,f="AND")}if("string"==typeof a&&(g=a,h=b,e=!1,f="OR","undefined"!=typeof b))if("all"==a.toLowerCase())if(this.searches.length>0)for(var i in this.searches){var j=this.searches[i];if("text"==j.type||"alphanumeric"==j.type&&w2utils.isAlphaNumeric(b)||"int"==j.type&&w2utils.isInt(b)||"float"==j.type&&w2utils.isFloat(b)||"percent"==j.type&&w2utils.isFloat(b)||"hex"==j.type&&w2utils.isHex(b)||"currency"==j.type&&w2utils.isMoney(b)||"money"==j.type&&w2utils.isMoney(b)||"date"==j.type&&w2utils.isDate(b)){var t={field:j.field,type:j.type,operator:"text"==j.type?"contains":"is",value:b};d.push(t)}if(-1!=["int","float","money","currency","percent"].indexOf(j.type)&&-1!=String(b).indexOf("-")){var v=String(b).split("-"),t={field:j.field,type:j.type,operator:"between",value:[v[0],v[1]]};d.push(t)}}else for(var w in this.columns){var t={field:this.columns[w].field,type:"text",operator:"contains",value:b};d.push(t)}else{var x=$("#grid_"+this.name+"_search_all"),j=this.getSearch(a);if(null==j&&(j={field:a,type:"text"}),j.field==a&&(this.last.caption=j.caption),"list"==j.type){var t=x.data("selected");t&&!$.isEmptyObject(t)&&(b=t.id)}if(""!=b){var y="contains",z=b;if(-1!=["date","time","list"].indexOf(j.type)&&(y="is"),"int"==j.type&&""!=b){if(y="is",-1!=String(b).indexOf("-")){var t=b.split("-");2==t.length&&(y="between",z=[parseInt(t[0]),parseInt(t[1])])}if(-1!=String(b).indexOf(",")){var t=b.split(",");y="in",z=[];for(var v in t)z.push(t[v])}}var t={field:j.field,type:j.type,operator:y,value:z};d.push(t)}}if($.isArray(a)){var A="AND";"string"==typeof b&&(A=b.toUpperCase(),"OR"!=A&&"AND"!=A&&(A="AND")),h="",e=!0,f=A;for(var B in a){var C=a[B],j=this.getSearch(C.field);null==j&&(j={type:"text",operator:"contains"}),d.push($.extend(!0,{},j,C))}}var D=this.trigger({phase:"before",type:"search",target:this.name,searchData:d,searchField:a?a:"multi",searchValue:b?b:"multi"});D.isCancelled!==!0&&(this.searchData=D.searchData,this.last.field=g,this.last.search=h,this.last.multi=e,this.last.logic=f,this.last.scrollTop=0,this.last.scrollLeft=0,this.last.selection.indexes=[],this.last.selection.columns={},this.searchClose(),this.set({expanded:!1},!0),c?(this.last.xhr_offset=0,this.reload()):(this.localSearch(),this.refresh()),this.trigger($.extend(D,{phase:"after"})))},searchOpen:function(){if(this.box&&0!=this.searches.length){var a=this;$("#tb_"+this.name+"_toolbar_item_w2ui-search-advanced").w2overlay(this.getSearchesHTML(),{name:"searches-"+this.name,left:-10,"class":"w2ui-grid-searches",onShow:function(){"OR"==a.last.logic&&(a.searchData=[]),a.initSearches(),$("#w2ui-overlay-searches-"+this.name+" .w2ui-grid-searches").data("grid-name",a.name);var b=$("#w2ui-overlay-searches-"+this.name+" .w2ui-grid-searches *[rel=search]");b.length>0&&b[0].focus()}})}},searchClose:function(){this.box&&0!=this.searches.length&&(this.toolbar&&this.toolbar.uncheck("w2ui-search-advanced"),$("#w2ui-overlay-searches-"+this.name+" .w2ui-grid-searches").length>0&&$().w2overlay("",{name:"searches-"+this.name}))},searchShowFields:function(){for(var a=$("#grid_"+this.name+"_search_all"),b='<div class="w2ui-select-field"><table>',c=-1;c<this.searches.length;c++){var d=this.searches[c];if(-1==c){if(!this.multiSearch)continue;d={field:"all",caption:w2utils.lang("All Fields")}}else if(this.searches[c].hidden===!0)continue;b+="<tr "+(w2utils.isIOS?"onTouchStart":"onClick")+"=\"w2ui['"+this.name+"'].initAllField('"+d.field+'\')">    <td><input type="radio" tabIndex="-1" '+(d.field==this.last.field?"checked":"")+"></td>    <td>"+d.caption+"</td></tr>"}b+="</table></div>",setTimeout(function(){$(a).w2overlay(b,{left:-10})},1)},initAllField:function(a,b){var c=$("#grid_"+this.name+"_search_all"),d=this.getSearch(a);if("all"==a)d={field:"all",caption:w2utils.lang("All Fields")},c.w2field("clear"),c.change().focus();else{var e=d.type;-1!=["enum","select"].indexOf(e)&&(e="list"),c.w2field(e,$.extend({},d.options,{suffix:"",autoFormat:!1,selected:b})),-1!=["list","enum"].indexOf(d.type)&&(this.last.search="",this.last.item="",c.val("")),setTimeout(function(){c.focus()},1)}""!=this.last.search?this.search(d.field,this.last.search):(this.last.field=d.field,this.last.caption=d.caption),c.attr("placeholder",d.caption),$().w2overlay()},searchReset:function(a){var b=this.trigger({phase:"before",type:"search",target:this.name,searchData:[]});b.isCancelled!==!0&&(this.searchData=[],this.last.search="",this.last.logic="OR",this.last.multi=!1,this.last.xhr_offset=0,this.last.scrollTop=0,this.last.scrollLeft=0,this.last.selection.indexes=[],this.last.selection.columns={},this.searchClose(),$("#grid_"+this.name+"_search_all").val(""),a||this.reload(),this.trigger($.extend(b,{phase:"after"})))},clear:function(a){this.records=[],this.summary=[],this.last.scrollTop=0,this.last.scrollLeft=0,this.last.selection.indexes=[],this.last.selection.columns={},this.last.range_start=null,this.last.range_end=null,this.last.xhr_offset=0,a||this.refresh()
},reset:function(a){this.offset=0,this.total=0,this.last.scrollTop=0,this.last.scrollLeft=0,this.last.selection.indexes=[],this.last.selection.columns={},this.last.range_start=null,this.last.range_end=null,this.last.xhr_offset=0,this.searchReset(a),null!=this.last.sortData&&(this.sortData=this.last.sortData),this.set({expanded:!1},!0),a||this.refresh()},skip:function(a){var b="object"!=typeof this.url?this.url:this.url.get;b?(this.offset=parseInt(a),this.offset>this.total&&(this.offset=this.total-this.limit),(this.offset<0||!w2utils.isInt(this.offset))&&(this.offset=0),this.records=[],this.last.xhr_offset=0,this.last.pull_more=!0,this.last.scrollTop=0,this.last.scrollLeft=0,$("#grid_"+this.name+"_records").prop("scrollTop",0),this.reload()):console.log("ERROR: grid.skip() can only be called when you have remote data source.")},load:function(a,b){return"undefined"==typeof a?void console.log('ERROR: You need to provide url argument when calling .load() method of "'+this.name+'" object.'):void this.request("get-records",{},a,b)},reload:function(a){var b="object"!=typeof this.url?this.url:this.url.get;b?(this.clear(!0),this.request("get-records",{},null,a)):(this.last.scrollTop=0,this.last.scrollLeft=0,this.last.range_start=null,this.last.range_end=null,this.localSearch(),this.refresh(),"function"==typeof a&&a({status:"success"}))},request:function(a,b,c,d){if("undefined"==typeof b&&(b={}),("undefined"==typeof c||""==c||null==c)&&(c=this.url),""!=c&&null!=c){var e={};if(w2utils.isInt(this.offset)||(this.offset=0),w2utils.isInt(this.last.xhr_offset)||(this.last.xhr_offset=0),e.cmd=a,e.selected=this.getSelection(),e.limit=this.limit,e.offset=parseInt(this.offset)+this.last.xhr_offset,e.search=this.searchData,e.searchLogic=this.last.logic,e.sort=this.sortData,0==this.searchData.length&&(delete e.search,delete e.searchLogic),0==this.sortData.length&&delete e.sort,$.extend(e,this.postData),$.extend(e,b),"get-records"==a){var f=this.trigger({phase:"before",type:"request",target:this.name,url:c,postData:e});if(f.isCancelled===!0)return void("function"==typeof d&&d({status:"error",message:"Request aborted."}))}else var f={url:c,postData:e};var g=this;if(0==this.last.xhr_offset)this.lock(this.msgRefresh,!0);else{var h=$("#grid_"+this.name+"_rec_more");this.autoLoad===!0?h.show().find("td").html('<div><div style="width: 20px; height: 20px;" class="w2ui-spinner"></div></div>'):h.find("td").html("<div>"+w2utils.lang("Load")+" "+g.limit+" "+w2utils.lang("More")+"...</div>")}if(this.last.xhr)try{this.last.xhr.abort()}catch(i){}var c="object"!=typeof f.url?f.url:f.url.get;if("save-records"==e.cmd&&"object"==typeof f.url&&(c=f.url.save),"delete-records"==e.cmd&&"object"==typeof f.url&&(c=f.url.remove),!$.isEmptyObject(g.routeData)){var j=w2utils.parseRoute(c);if(j.keys.length>0)for(var k=0;k<j.keys.length;k++)null!=g.routeData[j.keys[k].name]&&(c=c.replace(new RegExp(":"+j.keys[k].name,"g"),g.routeData[j.keys[k].name]))}var l={type:"POST",url:c,data:f.postData,dataType:"text"};"HTTP"==w2utils.settings.dataType&&(l.data="object"==typeof l.data?String($.param(l.data,!1)).replace(/%5B/g,"[").replace(/%5D/g,"]"):l.data),"RESTFULL"==w2utils.settings.dataType&&(l.type="GET","save-records"==e.cmd&&(l.type="PUT"),"delete-records"==e.cmd&&(l.type="DELETE"),l.data="object"==typeof l.data?String($.param(l.data,!1)).replace(/%5B/g,"[").replace(/%5D/g,"]"):l.data),"JSON"==w2utils.settings.dataType&&(l.type="POST",l.data=JSON.stringify(l.data),l.contentType="application/json"),this.method&&(l.type=this.method),this.last.xhr_cmd=e.cmd,this.last.xhr_start=(new Date).getTime(),this.last.xhr=$.ajax(l).done(function(b,c){g.requestComplete(c,a,d)}).fail(function(b,c,e){var f={status:c,error:e,rawResponseText:b.responseText},h=g.trigger({phase:"before",type:"error",error:f,xhr:b});if(h.isCancelled!==!0){if("abort"!=c){var i;try{i=$.parseJSON(b.responseText)}catch(j){}console.log("ERROR: Server communication failed.","\n   EXPECTED:",{status:"success",total:5,records:[{recid:1,field:"value"}]},"\n         OR:",{status:"error",message:"error message"},"\n   RECEIVED:","object"==typeof i?i:b.responseText),g.requestComplete("error",a,d)}g.trigger($.extend(h,{phase:"after"}))}}),"get-records"==a&&this.trigger($.extend(f,{phase:"after"}))}},requestComplete:function(status,cmd,callBack){var obj=this;this.unlock(),setTimeout(function(){obj.status(w2utils.lang("Server Response")+" "+((new Date).getTime()-obj.last.xhr_start)/1e3+" "+w2utils.lang("sec"))},10),this.last.pull_more=!1,this.last.pull_refresh=!0;var event_name="load";"save-records"==this.last.xhr_cmd&&(event_name="save"),"delete-records"==this.last.xhr_cmd&&(event_name="deleted");var eventData=this.trigger({phase:"before",target:this.name,type:event_name,xhr:this.last.xhr,status:status});if(eventData.isCancelled===!0)return void("function"==typeof callBack&&callBack({status:"error",message:"Request aborted."}));var data,responseText=this.last.xhr.responseText;if("error"!=status){if("undefined"!=typeof responseText&&""!=responseText){if("object"==typeof responseText)data=responseText;else if("function"==typeof obj.parser)data=obj.parser(responseText),"object"!=typeof data&&console.log("ERROR: Your parser did not return proper object");else try{eval("data = "+responseText)}catch(e){}if(obj.recid)for(var r in data.records)data.records[r].recid=data.records[r][obj.recid];if("undefined"==typeof data&&(data={status:"error",message:this.msgNotJSON,responseText:responseText}),"error"==data.status)obj.error(data.message);else{if("get-records"==cmd)if(0==this.last.xhr_offset)this.records=[],this.summary=[],delete data.status,$.extend(!0,this,data);else{var records=data.records;delete data.records,delete data.status,$.extend(!0,this,data);for(var r in records)this.records.push(records[r])}if("delete-records"==cmd)return void this.reset()}}}else data={status:"error",message:this.msgAJAXerror,responseText:responseText},obj.error(this.msgAJAXerror);var url="object"!=typeof this.url?this.url:this.url.get;url||(this.localSort(),this.localSearch()),this.total=parseInt(this.total),this.trigger($.extend(eventData,{phase:"after"})),0==this.last.xhr_offset?this.refresh():this.scroll(),"function"==typeof callBack&&callBack(data)},error:function(a){var b=this.trigger({target:this.name,type:"error",message:a,xhr:this.last.xhr});return b.isCancelled===!0?void("function"==typeof callBack&&callBack({status:"error",message:"Request aborted."})):(w2alert(a,"Error"),void this.trigger($.extend(b,{phase:"after"})))},getChanges:function(){var a=[];for(var b in this.records){var c=this.records[b];"undefined"!=typeof c.changes&&a.push($.extend(!0,{recid:c.recid},c.changes))}return a},mergeChanges:function(){var changes=this.getChanges();for(var c in changes){var record=this.get(changes[c].recid);for(var s in changes[c])if("recid"!=s){try{eval("record."+s+" = changes[c][s]")}catch(e){}delete record.changes}}this.refresh()},save:function(){var a=this,b=this.getChanges(),c=this.trigger({phase:"before",target:this.name,type:"submit",changes:b});if(c.isCancelled!==!0){var d="object"!=typeof this.url?this.url:this.url.save;d?this.request("save-records",{changes:c.changes},null,function(b){"error"!==b.status&&a.mergeChanges(),a.trigger($.extend(c,{phase:"after"}))}):(this.mergeChanges(),this.trigger($.extend(c,{phase:"after"})))}},editField:function(a,b,c,d){var e=this,f=e.get(a,!0),g=e.records[f],h=e.columns[b],i=h?h.editable:null;if(g&&h&&i&&g.editable!==!1){if(-1!=["enum","file"].indexOf(i.type))return void console.log('ERROR: input types "enum" and "file" are not supported in inline editing.');var j=e.trigger({phase:"before",type:"editField",target:e.name,recid:a,column:b,value:c,index:f,originalEvent:d});if(j.isCancelled!==!0&&(c=j.value,this.selectNone(),this.select({recid:a,column:b}),this.last.edit_col=b,-1==["checkbox","check"].indexOf(i.type))){var k=$("#grid_"+e.name+"_rec_"+w2utils.escapeId(a)),l=k.find("[col="+b+"] > div");"undefined"==typeof i.inTag&&(i.inTag=""),"undefined"==typeof i.outTag&&(i.outTag=""),"undefined"==typeof i.style&&(i.style=""),"undefined"==typeof i.items&&(i.items=[]);var m=w2utils.stripTags(g.changes&&"undefined"!=typeof g.changes[h.field]?g.changes[h.field]:g[h.field]);(null==m||"undefined"==typeof m)&&(m=""),"undefined"!=typeof c&&null!=c&&(m=c);var n="undefined"!=typeof h.style?h.style+";":"";if("string"==typeof h.render&&-1!=["number","int","float","money","percent"].indexOf(h.render.split(":")[0])&&(n+="text-align: right;"),i.items.length>0&&!$.isPlainObject(i.items[0])&&(i.items=w2obj.field.prototype.normMenu(i.items)),"select"==i.type){var o="";for(var p in i.items)o+='<option value="'+i.items[p].id+'" '+(i.items[p].id==m?"selected":"")+">"+i.items[p].text+"</option>";l.addClass("w2ui-editable").html('<select id="grid_'+e.name+"_edit_"+a+"_"+b+'" column="'+b+'"     style="width: 100%; '+n+i.style+'" field="'+h.field+'" recid="'+a+'"     '+i.inTag+">"+o+"</select>"+i.outTag),l.find("select").focus().on("change",function(){delete e.last.move}).on("blur",function(a){e.editChange.call(e,this,f,b,a)})}else{l.addClass("w2ui-editable").html('<input id="grid_'+e.name+"_edit_"+a+"_"+b+'"     type="text" style="font-family: inherit; font-size: inherit; outline: none; '+n+i.style+'" field="'+h.field+'" recid="'+a+'"     column="'+b+'" '+i.inTag+">"+i.outTag),null==c&&l.find("input").val("object"!=m?m:"");var q=l.find("input").get(0);$(q).w2field(i.type,$.extend(i,{selected:m})),setTimeout(function(){var a=q;"list"==i.type&&(a=$($(q).data("w2field").helpers.focus).find("input"),"object"!=typeof m&&""!=m&&a.val(m).css({opacity:1}).prev().css({opacity:1})),$(a).on("blur",function(a){e.editChange.call(e,q,f,b,a)})},10),null!=c&&$(q).val("object"!=m?m:"")}setTimeout(function(){l.find("input, select").on("click",function(a){a.stopPropagation()}).on("keydown",function(c){var d=!1;switch(c.keyCode){case 9:d=!0;var i=a,j=c.shiftKey?e.prevCell(b,!0):e.nextCell(b,!0);if(null==j){var k=c.shiftKey?e.prevRow(f):e.nextRow(f);if(null!=k&&k!=f){i=e.records[k].recid;for(var l in e.columns){var k=e.columns[l].editable;if("undefined"!=typeof k&&-1==["checkbox","check"].indexOf(k.type)&&(j=parseInt(l),!c.shiftKey))break}}}i===!1&&(i=a),null==j&&(j=b),this.blur(),setTimeout(function(){"row"!=e.selectType?(e.selectNone(),e.select({recid:i,column:j})):e.editField(i,j,null,c)},1);break;case 13:this.blur();var m=c.shiftKey?e.prevRow(f):e.nextRow(f);null!=m&&m!=f&&setTimeout(function(){"row"!=e.selectType?(e.selectNone(),e.select({recid:e.records[m].recid,column:b})):e.editField(e.records[m].recid,b,null,c)},100);break;case 38:if(!c.shiftKey)break;d=!0;var m=e.prevRow(f);m!=f&&(this.blur(),setTimeout(function(){"row"!=e.selectType?(e.selectNone(),e.select({recid:e.records[m].recid,column:b})):e.editField(e.records[m].recid,b,null,c)},1));break;case 40:if(!c.shiftKey)break;d=!0;var m=e.nextRow(f);null!=m&&m!=f&&(this.blur(),setTimeout(function(){"row"!=e.selectType?(e.selectNone(),e.select({recid:e.records[m].recid,column:b})):e.editField(e.records[m].recid,b,null,c)},1));break;case 27:var n=e.parseField(g,h.field);g.changes&&"undefined"!=typeof g.changes[h.field]&&(n=g.changes[h.field]),this.value="undefined"!=typeof n?n:"",this.blur(),setTimeout(function(){e.select({recid:a,column:b})},1)}d&&c.preventDefault&&c.preventDefault()});var d=l.find("input").focus();null!=c?d[0].setSelectionRange(d.val().length,d.val().length):d.select()},1),e.trigger($.extend(j,{phase:"after"}))}}},editChange:function(a,b,c){var d=0>b;b=0>b?-b-1:b;var e=d?this.summary:this.records,f=e[b],g=$("#grid_"+this.name+"_rec_"+w2utils.escapeId(f.recid)),h=this.columns[c],i=a.value,j=this.parseField(f,h.field),k=$(a).data("w2field");k&&(i=k.clean(i),"list"==k.type&&""!=i&&(i=$(a).data("selected"))),"checkbox"==a.type&&(f.editable===!1&&(a.checked=!a.checked),i=a.checked);for(var l={phase:"before",type:"change",target:this.name,input_id:a.id,recid:f.recid,index:b,column:c,value_new:i,value_previous:f.changes&&f.changes.hasOwnProperty(h.field)?f.changes[h.field]:j,value_original:j};;){if(i=l.value_new,"object"!=typeof i&&String(j)!=String(i)||"object"==typeof i&&("object"!=typeof j||i.id!=j.id)){if(l=this.trigger($.extend(l,{type:"change",phase:"before"})),l.isCancelled!==!0){if(i!==l.value_new)continue;f.changes=f.changes||{},f.changes[h.field]=l.value_new,this.trigger($.extend(l,{phase:"after"}))}}else if(l=this.trigger($.extend(l,{type:"restore",phase:"before"})),l.isCancelled!==!0){if(i!==l.value_new)continue;f.changes&&delete f.changes[h.field],$.isEmptyObject(f.changes)&&delete f.changes,this.trigger($.extend(l,{phase:"after"}))}break}var m=this.getCellHTML(b,c,d);d||(f.changes&&"undefined"!=typeof f.changes[h.field]?$(g).find("[col="+c+"]").addClass("w2ui-changed").html(m):$(g).find("[col="+c+"]").removeClass("w2ui-changed").html(m))},"delete":function(a){var b=this,c=this.trigger({phase:"before",target:this.name,type:"delete",force:a});if(c.isCancelled!==!0){a=c.force;var d=this.getSelection();if(0!=d.length){if(""!=this.msgDelete&&!a)return void w2confirm({title:w2utils.lang("Delete Confirmation"),msg:b.msgDelete,btn_yes:{"class":"btn-red"},callBack:function(a){"Yes"==a&&w2ui[b.name]["delete"](!0)}});var e="object"!=typeof this.url?this.url:this.url.remove;if(e)this.request("delete-records");else if(this.selectNone(),"object"!=typeof d[0])this.remove.apply(this,d);else{for(var f in d){var g=this.columns[d[f].column].field,h=this.get(d[f].recid,!0);null!=h&&"recid"!=g&&(this.records[h][g]="",this.records[h].changes&&delete this.records[h].changes[g])}this.refresh()}this.trigger($.extend(c,{phase:"after"}))}}},click:function(a,b){var c=(new Date).getTime(),d=null;if(!(1==this.last.cancelClick||b&&b.altKey)){if("object"==typeof a&&(d=a.column,a=a.recid),"undefined"==typeof b&&(b={}),c-parseInt(this.last.click_time)<350&&this.last.click_recid==a&&"click"==b.type)return void this.dblClick(a,b);if(this.last.click_time=c,this.last.click_recid=a,null==d&&b.target){var e=b.target;"TD"!=e.tagName&&(e=$(e).parents("td")[0]),"undefined"!=typeof $(e).attr("col")&&(d=parseInt($(e).attr("col")))}var f=this.trigger({phase:"before",target:this.name,type:"click",recid:a,column:d,originalEvent:b});if(f.isCancelled!==!0){var g=$("#grid_"+this.name+"_rec_"+w2utils.escapeId(a)).parents("tr");if(g.length>0&&-1!=String(g.attr("id")).indexOf("expanded_row")){var h=g.parents(".w2ui-grid").attr("name");w2ui[h].selectNone(),g.parents(".w2ui-grid").find(".w2ui-expanded-row .w2ui-grid").each(function(a,b){var c=$(b).attr("name");w2ui[c]&&w2ui[c].selectNone()})}$(this.box).find(".w2ui-expanded-row .w2ui-grid").each(function(a,b){var c=$(b).attr("name");w2ui[c]&&w2ui[c].selectNone()});var i=this,j=this.getSelection();$("#grid_"+this.name+"_check_all").prop("checked",!1);var k=this.get(a,!0),l=(this.records[k],[]);if(i.last.sel_ind=k,i.last.sel_col=d,i.last.sel_recid=a,i.last.sel_type="click",b.shiftKey&&j.length>0&&i.multiSelect){if(j[0].recid){var m=this.get(j[0].recid,!0),n=this.get(a,!0);if(d>j[0].column)var o=j[0].column,p=d;else var o=d,p=j[0].column;for(var q=o;p>=q;q++)l.push(q)}else var m=this.get(j[0],!0),n=this.get(a,!0);var r=[];if(m>n){var e=m;m=n,n=e}for(var s="object"!=typeof this.url?this.url:this.url.get,t=m;n>=t;t++)if(!(this.searchData.length>0)||s||-1!=$.inArray(t,this.last.searchIds))if("row"==this.selectType)r.push(this.records[t].recid);else for(var u in l)r.push({recid:this.records[t].recid,column:l[u]});this.select.apply(this,r)}else{var v=this.last.selection,w=-1!=v.indexes.indexOf(k)?!0:!1;(b.ctrlKey||b.shiftKey||b.metaKey)&&this.multiSelect||this.showSelectColumn?("row"!=this.selectType&&-1==$.inArray(d,v.columns[k])&&(w=!1),w===!0?this.unselect({recid:a,column:d}):this.select({recid:a,column:d})):("row"!=this.selectType&&-1==$.inArray(d,v.columns[k])&&(w=!1),j.length>300?this.selectNone():this.unselect.apply(this,j),w===!0?this.unselect({recid:a,column:d}):this.select({recid:a,column:d}))}this.status(),i.initResize(),this.trigger($.extend(f,{phase:"after"}))}}},columnClick:function(a,b){var c=this.trigger({phase:"before",type:"columnClick",target:this.name,field:a,originalEvent:b});if(c.isCancelled!==!0){var d=this.getColumn(a);d&&d.sortable&&this.sort(a,null,b&&(b.ctrlKey||b.metaKey)?!0:!1),this.trigger($.extend(c,{phase:"after"}))}},keydown:function(a){function b(){$("#_tmp_copy_data").remove(),$(document).off("keyup",b)}function c(){var a=Math.floor((h[0].scrollTop+h.height()/2.1)/e.recordHeight);e.records[a]||(a=0),e.select({recid:e.records[a].recid,column:0})}function d(){if("click"!=e.last.sel_type)return!1;if("row"!=e.selectType){if(e.last.sel_type="key",i.length>1){for(var a in i)if(i[a].recid==e.last.sel_recid&&i[a].column==e.last.sel_col){i.splice(a,1);break}return e.unselect.apply(e,i),!0}return!1}return e.last.sel_type="key",i.length>1?(i.splice(i.indexOf(e.records[e.last.sel_ind].recid),1),e.unselect.apply(e,i),!0):!1}var e=this;if(e.keyboard===!0){var f=e.trigger({phase:"before",type:"keydown",target:e.name,originalEvent:a});if(f.isCancelled!==!0){var g=!1,h=$("#grid_"+e.name+"_records"),i=e.getSelection();0==i.length&&(g=!0);var j=i[0]||null,k=[],l=i[i.length-1];if("object"==typeof j&&null!=j){j=i[0].recid,k=[];for(var m=0;;){if(!i[m]||i[m].recid!=j)break;k.push(i[m].column),m++}l=i[i.length-1].recid}var n=e.get(j,!0),o=e.get(l,!0),p=e.get(j),q=$("#grid_"+e.name+"_rec_"+(null!==n?w2utils.escapeId(e.records[n].recid):"none")),r=!1,s=a.keyCode,t=a.shiftKey;switch(9==s&&(s=a.shiftKey?37:39,t=!1,r=!0),s){case 8:case 46:this.show.toolbarDelete&&e["delete"](),r=!0,a.stopPropagation();break;case 27:e.selectNone(),i.length>0&&"object"==typeof i[0]&&e.select({recid:i[0].recid,column:i[0].column}),r=!0;break;case 65:if(!a.metaKey&&!a.ctrlKey)break;e.selectAll(),r=!0;break;case 70:if(!a.metaKey&&!a.ctrlKey)break;$("#grid_"+e.name+"_search_all").focus(),r=!0;break;case 13:if("row"==this.selectType&&e.show.expandColumn===!0){if(q.length<=0)break;e.toggle(j,a),r=!0}else{for(var u in this.columns)if(this.columns[u].editable){k.push(parseInt(u));break}"row"==this.selectType&&this.last.edit_col&&(k=[this.last.edit_col]),k.length>0&&(e.editField(j,k[0],null,a),r=!0)}break;case 37:if(g)break;var v=$("#grid_"+this.name+"_rec_"+w2utils.escapeId(e.records[n].recid)).parents("tr");if(v.length>0&&-1!=String(v.attr("id")).indexOf("expanded_row")){var j=v.prev().attr("recid"),w=v.parents(".w2ui-grid").attr("name");e.selectNone(),w2utils.keyboard.active(w),w2ui[w].set(j,{expanded:!1}),w2ui[w].collapse(j),w2ui[w].click(j),r=!0;break}if("row"==this.selectType){if(q.length<=0||p.expanded!==!0)break;e.set(j,{expanded:!1},!0),e.collapse(j,a)}else{var x=e.prevCell(k[0]);if(null!=x)if(t&&e.multiSelect){if(d())return;var y=[],z=[],A=[];if(0==k.indexOf(this.last.sel_col)&&k.length>1)for(var B in i)-1==y.indexOf(i[B].recid)&&y.push(i[B].recid),A.push({recid:i[B].recid,column:k[k.length-1]});else for(var B in i)-1==y.indexOf(i[B].recid)&&y.push(i[B].recid),z.push({recid:i[B].recid,column:x});e.unselect.apply(e,A),e.select.apply(e,z)}else a.shiftKey=!1,e.click({recid:j,column:x},a);else if(!t)for(var C=1;C<i.length;C++)e.unselect(i[C])}r=!0;break;case 39:if(g)break;if("row"==this.selectType){if(q.length<=0||p.expanded===!0||e.show.expandColumn!==!0)break;e.expand(j,a)}else{var D=e.nextCell(k[k.length-1]);if(null!==D)if(t&&39==s&&e.multiSelect){if(d())return;var y=[],z=[],A=[];if(k.indexOf(this.last.sel_col)==k.length-1&&k.length>1)for(var B in i)-1==y.indexOf(i[B].recid)&&y.push(i[B].recid),A.push({recid:i[B].recid,column:k[0]});else for(var B in i)-1==y.indexOf(i[B].recid)&&y.push(i[B].recid),z.push({recid:i[B].recid,column:D});e.unselect.apply(e,A),e.select.apply(e,z)}else e.click({recid:j,column:D},a);else if(!t)for(var C=0;C<i.length-1;C++)e.unselect(i[C])}r=!0;break;case 38:if(g&&c(),q.length<=0)break;var x=e.prevRow(n);if(null!=x){if(e.records[x].expanded){var E=$("#grid_"+e.name+"_rec_"+w2utils.escapeId(e.records[x].recid)+"_expanded_row").find(".w2ui-grid");if(E.length>0&&w2ui[E.attr("name")]){e.selectNone();var w=E.attr("name"),F=w2ui[w].records;w2utils.keyboard.active(w),w2ui[w].click(F[F.length-1].recid),r=!0;break}}if(t&&e.multiSelect){if(d())return;if("row"==e.selectType)e.last.sel_ind>x&&e.last.sel_ind!=o?e.unselect(e.records[o].recid):e.select(e.records[x].recid);else if(e.last.sel_ind>x&&e.last.sel_ind!=o){x=o;var y=[];for(var u in k)y.push({recid:e.records[x].recid,column:k[u]});e.unselect.apply(e,y)}else{var y=[];for(var u in k)y.push({recid:e.records[x].recid,column:k[u]});e.select.apply(e,y)}}else i.length>300?this.selectNone():this.unselect.apply(this,i),e.click({recid:e.records[x].recid,column:k[0]},a);e.scrollIntoView(x),a.preventDefault&&a.preventDefault()}else{if(!t)for(var C=1;C<i.length;C++)e.unselect(i[C]);var v=$("#grid_"+e.name+"_rec_"+w2utils.escapeId(e.records[n].recid)).parents("tr");if(v.length>0&&-1!=String(v.attr("id")).indexOf("expanded_row")){var j=v.prev().attr("recid"),w=v.parents(".w2ui-grid").attr("name");e.selectNone(),w2utils.keyboard.active(w),w2ui[w].click(j),r=!0;break}}break;case 40:if(g&&c(),q.length<=0)break;if(e.records[o].expanded){var E=$("#grid_"+this.name+"_rec_"+w2utils.escapeId(e.records[o].recid)+"_expanded_row").find(".w2ui-grid");if(E.length>0&&w2ui[E.attr("name")]){e.selectNone();var w=E.attr("name"),F=w2ui[w].records;w2utils.keyboard.active(w),w2ui[w].click(F[0].recid),r=!0;break}}var D=e.nextRow(o);if(null!=D){if(t&&e.multiSelect){if(d())return;if("row"==e.selectType)this.last.sel_ind<D&&this.last.sel_ind!=n?e.unselect(e.records[n].recid):e.select(e.records[D].recid);else if(this.last.sel_ind<D&&this.last.sel_ind!=n){D=n;var y=[];for(var u in k)y.push({recid:e.records[D].recid,column:k[u]});e.unselect.apply(e,y)}else{var y=[];for(var u in k)y.push({recid:e.records[D].recid,column:k[u]});e.select.apply(e,y)}}else i.length>300?this.selectNone():this.unselect.apply(this,i),e.click({recid:e.records[D].recid,column:k[0]},a);e.scrollIntoView(D),r=!0}else{if(!t)for(var C=0;C<i.length-1;C++)e.unselect(i[C]);var v=$("#grid_"+this.name+"_rec_"+w2utils.escapeId(e.records[o].recid)).parents("tr");if(v.length>0&&-1!=String(v.attr("id")).indexOf("expanded_row")){var j=v.next().attr("recid"),w=v.parents(".w2ui-grid").attr("name");e.selectNone(),w2utils.keyboard.active(w),w2ui[w].click(j),r=!0;break}}break;case 17:case 91:if(g)break;var G=e.copy();$("body").append('<textarea id="_tmp_copy_data"    onpaste="var obj = this; setTimeout(function () { w2ui[\''+e.name+"'].paste(obj.value); }, 1);\"    onkeydown=\"w2ui['"+e.name+'\'].keydown(event)"   style="position: absolute; top: -100px; height: 1px; width: 1px">'+G+"</textarea>"),$("#_tmp_copy_data").focus().select(),$(document).on("keyup",b);break;case 88:if(g)break;(a.ctrlKey||a.metaKey)&&setTimeout(function(){e["delete"](!0)},100)}for(var y=[187,189,32],B=48;90>=B;B++)y.push(B);if(-1!=y.indexOf(s)&&!a.ctrlKey&&!a.metaKey&&!r){0==k.length&&k.push(0);var y=String.fromCharCode(s);187==s&&(y="="),189==s&&(y="-"),t||(y=y.toLowerCase()),e.editField(j,k[0],y,a),r=!0}r&&a.preventDefault&&a.preventDefault(),e.trigger($.extend(f,{phase:"after"}))}}},scrollIntoView:function(a){var b=this.records.length;if(0==this.searchData.length||this.url||(b=this.last.searchIds.length),"undefined"==typeof a){var c=this.getSelection();if(0==c.length)return;a=this.get(c[0],!0)}var d=$("#grid_"+this.name+"_records");if(0!=b){var e=this.last.searchIds.length;if(!(d.height()>this.recordHeight*(e>0?e:b))){e>0&&(a=this.last.searchIds.indexOf(a));var f=Math.floor(d[0].scrollTop/this.recordHeight),g=f+Math.floor(d.height()/this.recordHeight);a==f&&d.animate({scrollTop:d.scrollTop()-d.height()/1.3},250,"linear"),a==g&&d.animate({scrollTop:d.scrollTop()+d.height()/1.3},250,"linear"),(f>a||a>g)&&d.animate({scrollTop:(a-1)*this.recordHeight})}}},dblClick:function(a,b){var c=null;if("object"==typeof a&&(c=a.column,a=a.recid),"undefined"==typeof b&&(b={}),null==c&&b.target){var d=b.target;"TD"!=d.tagName&&(d=$(d).parents("td")[0]),c=parseInt($(d).attr("col"))}var e=this.trigger({phase:"before",target:this.name,type:"dblClick",recid:a,column:c,originalEvent:b});if(e.isCancelled!==!0){this.selectNone();var f=this.columns[c];f&&$.isPlainObject(f.editable)?this.editField(a,c,null,b):this.select({recid:a,column:c}),this.trigger($.extend(e,{phase:"after"}))}},contextMenu:function(a,b){var c=this;"text"!=c.last.userSelect&&("undefined"==typeof b&&(b={offsetX:0,offsetY:0,target:$("#grid_"+c.name+"_rec_"+a)[0]}),"undefined"==typeof b.offsetX&&(b.offsetX=b.layerX-b.target.offsetLeft,b.offsetY=b.layerY-b.target.offsetTop),w2utils.isFloat(a)&&(a=parseFloat(a)),-1==this.getSelection().indexOf(a)&&c.click(a),setTimeout(function(){var d=c.trigger({phase:"before",type:"contextMenu",target:c.name,originalEvent:b,recid:a});d.isCancelled!==!0&&(c.menu.length>0&&$(c.box).find(b.target).w2menu(c.menu,{left:b.offsetX,onSelect:function(b){c.menuClick(a,parseInt(b.index),b.originalEvent)}}),c.trigger($.extend(d,{phase:"after"})))},150),b.preventDefault&&b.preventDefault())},menuClick:function(a,b,c){var d=this,e=d.trigger({phase:"before",type:"menuClick",target:d.name,originalEvent:c,recid:a,menuIndex:b,menuItem:d.menu[b]});e.isCancelled!==!0&&d.trigger($.extend(e,{phase:"after"}))},toggle:function(a){var b=this.get(a);return b.expanded===!0?this.collapse(a):this.expand(a)},expand:function(a){function b(){var b=$("#grid_"+d.name+"_rec_"+e+"_expanded"),c=$("#grid_"+d.name+"_rec_"+e+"_expanded_row .w2ui-expanded1 > div");b.height()<5||(b.css("opacity",1),c.show().css("opacity",1),$("#grid_"+d.name+"_cell_"+d.get(a,!0)+"_expand div").html("-"))}var c=this.get(a),d=this,e=w2utils.escapeId(a);if($("#grid_"+this.name+"_rec_"+e+"_expanded_row").length>0)return!1;if("none"==c.expanded)return!1;var f=1+(this.show.selectColumn?1:0),g="";$("#grid_"+this.name+"_rec_"+e).after('<tr id="grid_'+this.name+"_rec_"+a+'_expanded_row" class="w2ui-expanded-row '+g+'">'+(this.show.lineNumbers?'<td class="w2ui-col-number"></td>':"")+'    <td class="w2ui-grid-data w2ui-expanded1" colspan="'+f+'"><div style="display: none"></div></td>    <td colspan="100" class="w2ui-expanded2">        <div id="grid_'+this.name+"_rec_"+a+'_expanded" style="opacity: 0"></div>    </td></tr>');var h=this.trigger({phase:"before",type:"expand",target:this.name,recid:a,box_id:"grid_"+this.name+"_rec_"+a+"_expanded",ready:b});return h.isCancelled===!0?void $("#grid_"+this.name+"_rec_"+e+"_expanded_row").remove():($("#grid_"+this.name+"_rec_"+e).attr("expanded","yes").addClass("w2ui-expanded"),$("#grid_"+this.name+"_rec_"+e+"_expanded_row").show(),$("#grid_"+this.name+"_cell_"+this.get(a,!0)+"_expand div").html('<div class="w2ui-spinner" style="width: 16px; height: 16px; margin: -2px 2px;"></div>'),c.expanded=!0,setTimeout(b,300),this.trigger($.extend(h,{phase:"after"})),this.resizeRecords(),!0)},collapse:function(a){var b=this.get(a),c=this,d=w2utils.escapeId(a);if(0==$("#grid_"+this.name+"_rec_"+d+"_expanded_row").length)return!1;var e=this.trigger({phase:"before",type:"collapse",target:this.name,recid:a,box_id:"grid_"+this.name+"_rec_"+d+"_expanded"});return e.isCancelled!==!0?($("#grid_"+this.name+"_rec_"+d).removeAttr("expanded").removeClass("w2ui-expanded"),$("#grid_"+this.name+"_rec_"+d+"_expanded").css("opacity",0),$("#grid_"+this.name+"_cell_"+this.get(a,!0)+"_expand div").html("+"),setTimeout(function(){$("#grid_"+c.name+"_rec_"+d+"_expanded").height("0px"),setTimeout(function(){$("#grid_"+c.name+"_rec_"+d+"_expanded_row").remove(),delete b.expanded,c.trigger($.extend(e,{phase:"after"})),c.resizeRecords()},300)},200),!0):void 0},sort:function(a,b,c){var d=this.trigger({phase:"before",type:"sort",target:this.name,field:a,direction:b,multiField:c});if(d.isCancelled!==!0){if("undefined"!=typeof a){var e=this.sortData.length;for(var f in this.sortData)if(this.sortData[f].field==a){e=f;break}if("undefined"==typeof b||null==b)if("undefined"==typeof this.sortData[e])b="asc";else switch(String(this.sortData[e].direction)){case"asc":b="desc";break;case"desc":b="asc";break;default:b="asc"}this.multiSort===!1&&(this.sortData=[],e=0),1!=c&&(this.sortData=[],e=0),"undefined"==typeof this.sortData[e]&&(this.sortData[e]={}),this.sortData[e].field=a,this.sortData[e].direction=b}else this.sortData=[];this.selectNone();var g="object"!=typeof this.url?this.url:this.url.get;g?(this.trigger($.extend(d,{phase:"after"})),this.last.xhr_offset=0,this.reload()):(this.localSort(),this.searchData.length>0&&this.localSearch(!0),this.trigger($.extend(d,{phase:"after"})),this.refresh())}},copy:function(){var a=this.getSelection();if(0==a.length)return"";var b="";if("object"==typeof a[0]){var c=a[0].column,d=a[0].column,e=[];for(var f in a)a[f].column<c&&(c=a[f].column),a[f].column>d&&(d=a[f].column),-1==e.indexOf(a[f].index)&&e.push(a[f].index);e.sort();for(var g in e){for(var h=e[g],i=c;d>=i;i++){var j=this.columns[i];j.hidden!==!0&&(b+=w2utils.stripTags(this.getCellHTML(h,i))+"	")}b=b.substr(0,b.length-1),b+="\n"}}else{for(var i in this.columns){var j=this.columns[i];j.hidden!==!0&&(b+='"'+w2utils.stripTags(j.caption?j.caption:j.field)+'"	')}b=b.substr(0,b.length-1),b+="\n";for(var f in a){var h=this.get(a[f],!0);for(var i in this.columns){var j=this.columns[i];j.hidden!==!0&&(b+='"'+w2utils.stripTags(this.getCellHTML(h,i))+'"	')}b=b.substr(0,b.length-1),b+="\n"}}b=b.substr(0,b.length-1);var k=this.trigger({phase:"before",type:"copy",target:this.name,text:b});return k.isCancelled===!0?"":(b=k.text,this.trigger($.extend(k,{phase:"after"})),b)},paste:function(a){var b=this.getSelection(),c=this.get(b[0].recid,!0),d=b[0].column,e=this.trigger({phase:"before",type:"paste",target:this.name,text:a,index:c,column:d});if(e.isCancelled!==!0){if(a=e.text,"row"==this.selectType||0==b.length)return console.log("ERROR: You can paste only if grid.selectType = 'cell' and when at least one cell selected."),void this.trigger($.extend(e,{phase:"after"}));var f=[],a=a.split("\n");for(var g in a){var h=a[g].split("	"),i=0,j=this.records[c],k=[];for(var l in h)if(this.columns[d+i]){var m=this.columns[d+i].field;j.changes=j.changes||{},j.changes[m]=h[l],k.push(d+i),i++}for(var n in k)f.push({recid:j.recid,column:k[n]});c++}this.selectNone(),this.select.apply(this,f),this.refresh(),this.trigger($.extend(e,{phase:"after"}))}},resize:function(){var a=this,b=(new Date).getTime();if(this.box&&$(this.box).attr("name")==this.name){$(this.box).find("> div").css("width",$(this.box).width()).css("height",$(this.box).height());var c=this.trigger({phase:"before",type:"resize",target:this.name});if(c.isCancelled!==!0)return a.resizeBoxes(),a.resizeRecords(),this.trigger($.extend(c,{phase:"after"})),(new Date).getTime()-b}},refreshCell:function(a,b){var c=this.get(a,!0),d=this.records[c]&&this.records[c].recid==a?!1:!0,e=this.getColumn(b,!0),f=d?this.summary[c]:this.records[c],g=this.columns[e],h=$("#grid_"+this.name+"_rec_"+a+" [col="+e+"]");h.html(this.getCellHTML(c,e,d)),f.changes&&"undefined"!=typeof f.changes[g.field]?h.addClass("w2ui-changed"):h.removeClass("w2ui-changed")},refreshRow:function(a){var b=$("#grid_"+this.name+"_rec_"+w2utils.escapeId(a));if(0!=b.length){var c=this.get(a,!0),d=b.attr("line"),e=this.records[c]&&this.records[c].recid==a?!1:!0,f="object"!=typeof this.url?this.url:this.url.get;if(this.searchData.length>0&&!f)for(var g in this.last.searchIds)this.last.searchIds[g]==c&&(c=g);$(b).replaceWith(this.getRecordHTML(c,d,e)),e&&this.resize()}},refresh:function(){var a=this,b=(new Date).getTime(),c="object"!=typeof this.url?this.url:this.url.get;if(this.total<=0&&!c&&0==this.searchData.length&&(this.total=this.records.length),this.toolbar.disable("w2ui-edit","w2ui-delete"),this.box){var d=this.trigger({phase:"before",target:this.name,type:"refresh"});if(d.isCancelled!==!0){if(this.show.header?$("#grid_"+this.name+"_header").html(this.header+"&nbsp;").show():$("#grid_"+this.name+"_header").hide(),this.show.toolbar){if(this.toolbar&&this.toolbar.get("w2ui-column-on-off")&&this.toolbar.get("w2ui-column-on-off").checked);else if($("#grid_"+this.name+"_toolbar").show(),"object"==typeof this.toolbar){var e=this.toolbar.items;
for(var f in e)"w2ui-search"!=e[f].id&&"break"!=e[f].type&&this.toolbar.refresh(e[f].id)}}else $("#grid_"+this.name+"_toolbar").hide();this.searchClose();var g=$("#grid_"+a.name+"_search_all");!this.multiSearch&&"all"==this.last.field&&this.searches.length>0&&(this.last.field=this.searches[0].field,this.last.caption=this.searches[0].caption);for(var h in this.searches)this.searches[h].field==this.last.field&&(this.last.caption=this.searches[h].caption);if(this.last.multi?g.attr("placeholder","["+w2utils.lang("Multiple Fields")+"]"):g.attr("placeholder",this.last.caption),g.val()!=this.last.search){var i=this.last.search,e=g.data("w2field");e&&(i=e.format(i)),g.val(i)}var e=this.find({summary:!0},!0);if(e.length>0){for(var f in e)this.summary.push(this.records[e[f]]);for(var f=e.length-1;f>=0;f--)this.records.splice(e[f],1);this.total=this.total-e.length}var j=a.find({expanded:!0},!0);for(var k in j)a.records[j[k]].expanded=!1;var l="";l+='<div id="grid_'+this.name+'_records" class="w2ui-grid-records"    onscroll="var obj = w2ui[\''+this.name+"'];         obj.last.scrollTop = this.scrollTop;         obj.last.scrollLeft = this.scrollLeft;         $('#grid_"+this.name+"_columns')[0].scrollLeft = this.scrollLeft;        $('#grid_"+this.name+"_summary')[0].scrollLeft = this.scrollLeft;        obj.scroll(event);\">"+this.getRecordsHTML()+'</div><div id="grid_'+this.name+'_columns" class="w2ui-grid-columns">    <table>'+this.getColumnsHTML()+"</table></div>",$("#grid_"+this.name+"_body").html(l),this.summary.length>0?$("#grid_"+this.name+"_summary").html(this.getSummaryHTML()).show():$("#grid_"+this.name+"_summary").hide(),this.show.footer?$("#grid_"+this.name+"_footer").html(this.getFooterHTML()).show():$("#grid_"+this.name+"_footer").hide(),this.searchData.length>0?$("#grid_"+this.name+"_searchClear").show():$("#grid_"+this.name+"_searchClear").hide();var m=this.last.selection;return m.indexes.length==this.records.length||0!==this.searchData.length&&m.indexes.length==this.last.searchIds.length?$("#grid_"+this.name+"_check_all").prop("checked",!0):$("#grid_"+this.name+"_check_all").prop("checked",!1),this.status(),setTimeout(function(){var b=$.trim($("#grid_"+a.name+"_search_all").val());""!=b&&$(a.box).find(".w2ui-grid-data > div").w2marker(b)},50),this.trigger($.extend(d,{phase:"after"})),a.resize(),a.addRange("selection"),setTimeout(function(){a.resize(),a.scroll()},1),a.reorderColumns&&!a.last.columnDrag?a.last.columnDrag=a.initColumnDrag():!a.reorderColumns&&a.last.columnDrag&&a.last.columnDrag.remove(),(new Date).getTime()-b}}},render:function(a){function b(a){if(1==a.which&&("text"==e.last.userSelect&&(delete e.last.userSelect,$(e.box).find(".w2ui-grid-body").css("user-select","none").css("-webkit-user-select","none").css("-moz-user-select","none").css("-ms-user-select","none"),$(this.box).on("selectstart",function(){return!1})),!($(a.target).parents().hasClass("w2ui-head")||$(a.target).hasClass("w2ui-head")||e.last.move&&"expand"==e.last.move.type))){if(a.altKey)$(e.box).off("selectstart"),$(e.box).find(".w2ui-grid-body").css("user-select","text").css("-webkit-user-select","text").css("-moz-user-select","text").css("-ms-user-select","text"),e.selectNone(),e.last.move={type:"text-select"},e.last.userSelect="text";else{if(!e.multiSelect)return;e.last.move={x:a.screenX,y:a.screenY,divX:0,divY:0,recid:$(a.target).parents("tr").attr("recid"),column:"TD"==a.target.tagName?$(a.target).attr("col"):$(a.target).parents("td").attr("col"),type:"select",ghost:!1,start:!0}}$(document).on("mousemove",c),$(document).on("mouseup",d)}}function c(a){var b=e.last.move;if(b&&"select"==b.type&&(b.divX=a.screenX-b.x,b.divY=a.screenY-b.y,!(Math.abs(b.divX)<=1&&Math.abs(b.divY)<=1))){if(e.last.cancelClick=!0,1==e.reorderRows){if(!b.ghost){var c=$("#grid_"+e.name+"_rec_"+b.recid),d=c.parents("table").find("tr:first-child").clone();b.offsetY=a.offsetY,b.from=b.recid,b.pos=c.position(),b.ghost=$(c).clone(!0),b.ghost.removeAttr("id"),c.find("td:first-child").replaceWith('<td colspan="1000" style="height: '+e.recordHeight+'px; background-color: #ddd"></td>');var f=$(e.box).find(".w2ui-grid-records");f.append('<table id="grid_'+e.name+'_ghost" style="position: absolute; z-index: 999999; opacity: 0.8; border-bottom: 2px dashed #aaa; border-top: 2px dashed #aaa; pointer-events: none;"></table>'),$("#grid_"+e.name+"_ghost").append(d).append(b.ghost)}var g=$(a.target).parents("tr").attr("recid");if(g!=b.from){var h=$("#grid_"+e.name+"_rec_"+b.recid),i=$("#grid_"+e.name+"_rec_"+g);a.screenY-b.lastY<0?h.after(i):i.after(h),b.lastY=a.screenY,b.to=g}var j=$("#grid_"+e.name+"_ghost"),f=$(e.box).find(".w2ui-grid-records");return void j.css({top:b.pos.top+b.divY+f.scrollTop(),left:b.pos.left})}b.start&&b.recid&&(e.selectNone(),b.start=!1);var k=[],g="TR"==a.target.tagName?$(a.target).attr("recid"):$(a.target).parents("tr").attr("recid");if("undefined"!=typeof g){var l=e.get(b.recid,!0);if(null!==l){var m=e.get(g,!0);if(null!==m){var n=parseInt(b.column),o=parseInt("TD"==a.target.tagName?$(a.target).attr("col"):$(a.target).parents("td").attr("col"));if(l>m){var d=l;l=m,m=d}var d="ind1:"+l+",ind2;"+m+",col1:"+n+",col2:"+o;if(b.range!=d){b.range=d;for(var p=l;m>=p;p++)if(!(e.last.searchIds.length>0&&-1==e.last.searchIds.indexOf(p)))if("row"!=e.selectType){if(n>o){var d=n;n=o,o=d}for(var d=[],q=n;o>=q;q++)e.columns[q].hidden||k.push({recid:e.records[p].recid,column:parseInt(q)})}else k.push(e.records[p].recid);if("row"!=e.selectType){var r=e.getSelection(),d=[];for(var s in k){var t=!1;for(var u in r)k[s].recid==r[u].recid&&k[s].column==r[u].column&&(t=!0);t||d.push({recid:k[s].recid,column:k[s].column})}e.select.apply(e,d);var d=[];for(var u in r){var t=!1;for(var s in k)k[s].recid==r[u].recid&&k[s].column==r[u].column&&(t=!0);t||d.push({recid:r[u].recid,column:r[u].column})}e.unselect.apply(e,d)}else if(e.multiSelect){var r=e.getSelection();for(var s in k)-1==r.indexOf(k[s])&&e.select(k[s]);for(var u in r)-1==k.indexOf(r[u])&&e.unselect(r[u])}}}}}}}function d(a){var b=e.last.move;if(setTimeout(function(){delete e.last.cancelClick},1),!$(a.target).parents().hasClass(".w2ui-head")&&!$(a.target).hasClass(".w2ui-head")){if(b&&"select"==b.type&&1==e.reorderRows){var f=e.get(b.from,!0),g=e.records[f];e.records.splice(f,1);var h=e.get(b.to,!0);f>h?e.records.splice(h,0,g):e.records.splice(h+1,0,g),$("#grid_"+e.name+"_ghost").remove(),e.refresh()}delete e.last.move,$(document).off("mousemove",c),$(document).off("mouseup",d)}}var e=this,f=(new Date).getTime();if("undefined"!=typeof a&&null!=a&&($(this.box).find("#grid_"+this.name+"_body").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-grid").html(""),this.box=a),this.box){null==this.last.sortData&&(this.last.sortData=this.sortData);var g=this.trigger({phase:"before",target:this.name,type:"render",box:a});if(g.isCancelled!==!0){if($(this.box).attr("name",this.name).addClass("w2ui-reset w2ui-grid").html('<div>    <div id="grid_'+this.name+'_header" class="w2ui-grid-header"></div>    <div id="grid_'+this.name+'_toolbar" class="w2ui-grid-toolbar"></div>    <div id="grid_'+this.name+'_body" class="w2ui-grid-body"></div>    <div id="grid_'+this.name+'_summary" class="w2ui-grid-body w2ui-grid-summary"></div>    <div id="grid_'+this.name+'_footer" class="w2ui-grid-footer"></div></div>'),"row"!=this.selectType&&$(this.box).addClass("w2ui-ss"),$(this.box).length>0&&($(this.box)[0].style.cssText+=this.style),this.initToolbar(),null!=this.toolbar&&this.toolbar.render($("#grid_"+this.name+"_toolbar")[0]),this.last.field&&"all"!=this.last.field){var h=this.searchData;this.initAllField(this.last.field,1==h.length?h[0].value:null)}return $("#grid_"+this.name+"_footer").html(this.getFooterHTML()),this.last.state||(this.last.state=this.stateSave(!0)),this.stateRestore(),this.url&&this.refresh(),this.reload(),$(this.box).on("mousedown",b),$(this.box).on("selectstart",function(){return!1}),this.trigger($.extend(g,{phase:"after"})),0==$(".w2ui-layout").length&&(this.tmp_resize=function(){w2ui[e.name].resize()},$(window).off("resize",this.tmp_resize).on("resize",this.tmp_resize)),(new Date).getTime()-f}}},destroy:function(){var a=this.trigger({phase:"before",target:this.name,type:"destroy"});a.isCancelled!==!0&&($(window).off("resize",this.tmp_resize),"object"==typeof this.toolbar&&this.toolbar.destroy&&this.toolbar.destroy(),$(this.box).find("#grid_"+this.name+"_body").length>0&&$(this.box).removeAttr("name").off("selectstart").removeClass("w2ui-reset w2ui-grid").html(""),delete w2ui[this.name],this.trigger($.extend(a,{phase:"after"})))},initColumnOnOff:function(){if(this.show.toolbarColumns){var a=this,b='<div class="w2ui-col-on-off"><table><tr><td style="width: 30px">    <input id="grid_'+this.name+'_column_ln_check" type="checkbox" tabIndex="-1" '+(a.show.lineNumbers?"checked":"")+"        onclick=\"w2ui['"+a.name+"'].columnOnOff(this, event, 'line-numbers');\"></td><td onclick=\"w2ui['"+a.name+"'].columnOnOff(this, event, 'line-numbers'); $('#w2ui-overlay')[0].hide();\">    <label for=\"grid_"+this.name+'_column_ln_check">'+w2utils.lang("Line #")+"</label></td></tr>";for(var c in this.columns){var d=this.columns[c],e=this.columns[c].caption;d.hideable!==!1&&(!e&&this.columns[c].hint&&(e=this.columns[c].hint),e||(e="- column "+(parseInt(c)+1)+" -"),b+='<tr><td style="width: 30px">    <input id="grid_'+this.name+"_column_"+c+'_check" type="checkbox" tabIndex="-1" '+(d.hidden?"":"checked")+"        onclick=\"w2ui['"+a.name+"'].columnOnOff(this, event, '"+d.field+'\');"></td><td>    <label for="grid_'+this.name+"_column_"+c+'_check">'+e+"</label></td></tr>")}b+='<tr><td colspan="2"><div style="border-top: 1px solid #ddd;"></div></td></tr>';var f="object"!=typeof this.url?this.url:this.url.get;f&&a.show.skipRecords&&(b+='<tr><td colspan="2" style="padding: 0px">    <div style="cursor: pointer; padding: 2px 8px; cursor: default">'+w2utils.lang("Skip")+'        <input type="text" style="width: 45px" value="'+this.offset+'"             onkeypress="if (event.keyCode == 13) {                w2ui[\''+a.name+"'].skip(this.value);                $('#w2ui-overlay')[0].hide();             }\"> "+w2utils.lang("Records")+"    </div></td></tr>"),b+='<tr><td colspan="2" onclick="w2ui[\''+a.name+"'].stateSave(); $('#w2ui-overlay')[0].hide();\">    <div style=\"cursor: pointer; padding: 4px 8px; cursor: default\">"+w2utils.lang("Save Grid State")+'</div></td></tr><tr><td colspan="2" onclick="w2ui[\''+a.name+"'].stateReset(); $('#w2ui-overlay')[0].hide();\">    <div style=\"cursor: pointer; padding: 4px 8px; cursor: default\">"+w2utils.lang("Restore Default State")+"</div></td></tr>",b+="</table></div>",this.toolbar.get("w2ui-column-on-off").html=b}},initColumnDrag:function(){function a(){i.pressed=!1,clearTimeout(i.timeout)}function b(a){i.timeout&&clearTimeout(i.timeout);var b=this;i.pressed=!0,i.timeout=setTimeout(function(){if(i.pressed){var e,f,g,j,k,l=["w2ui-col-number","w2ui-col-expand","w2ui-col-select"],m=["w2ui-head-last"],n=l.concat(m),o=".w2ui-col-number, .w2ui-col-expand, .w2ui-col-select",p=".w2ui-head.w2ui-col-number, .w2ui-head.w2ui-col-expand, .w2ui-head.w2ui-col-select";if($(a.originalEvent.target).parents().hasClass("w2ui-head")){for(var q=0,r=n.length;r>q;q++)if($(a.originalEvent.target).parents().hasClass(n[q]))return;if(i.numberPreColumnsPresent=$(h.box).find(p).length,i.columnHead=j=$(a.originalEvent.target).parents(".w2ui-head"),k=parseInt(j.attr("col"),10),e=h.trigger({type:"columnDragStart",phase:"before",originalEvent:a,origColumnNumber:k,target:j[0]}),e.isCancelled===!0)return!1;f=i.columns=$(h.box).find(".w2ui-head:not(.w2ui-head-last)"),$(document).on("mouseup",d),$(document).on("mousemove",c),i.originalPos=parseInt($(a.originalEvent.target).parent(".w2ui-head").attr("col"),10),i.ghost=$(b).clone(!0),$(i.ghost).find('[col]:not([col="'+i.originalPos+'"]), .w2ui-toolbar, .w2ui-grid-header').remove(),$(i.ghost).find(o).remove(),$(i.ghost).find(".w2ui-grid-body").css({top:0}),g=$(i.ghost).find('[col="'+i.originalPos+'"]'),$(document.body).append(i.ghost),$(i.ghost).css({width:0,height:0,margin:0,position:"fixed",zIndex:999999,opacity:0}).addClass(".w2ui-grid-ghost").animate({width:g.width(),height:$(h.box).find(".w2ui-grid-body:first").height(),left:a.pageX,top:a.pageY,opacity:.8},0),i.offsets=[];for(var q=0,r=f.length;r>q;q++)i.offsets.push($(f[q]).offset().left);h.trigger($.extend(e,{phase:"after"}))}}},150)}function c(a){if(i.pressed){var b=a.originalEvent.pageX,c=a.originalEvent.pageY,d=i.offsets,h=$(".w2ui-head:not(.w2ui-head-last)").width();i.targetInt=Math.max(i.numberPreColumnsPresent,f(b,d,h)),e(i.targetInt),g(b,c)}}function d(a){i.pressed=!1;var b,e,f,g,j,k=$(".w2ui-grid-ghost");return b=h.trigger({type:"columnDragEnd",phase:"before",originalEvent:a,target:i.columnHead[0]}),b.isCancelled===!0?!1:(f=h.columns[i.originalPos],g=h.columns,j=$(i.columns[Math.min(i.lastInt,i.columns.length-1)]),e=i.lastInt<i.columns.length?parseInt(j.attr("col")):g.length,e!==i.originalPos+1&&e!==i.originalPos&&j&&j.length?($(i.ghost).animate({top:$(h.box).offset().top,left:j.offset().left,width:0,height:0,opacity:.2},300,function(){$(this).remove(),k.remove()}),g.splice(e,0,$.extend({},f)),g.splice(g.indexOf(f),1)):($(i.ghost).remove(),k.remove()),$(document).off("mouseup",d),$(document).off("mousemove",c),i.marker&&i.marker.remove(),i={},h.refresh(),void h.trigger($.extend(b,{phase:"after",targetColumnNumber:e-1})))}function e(a){i.marker||i.markerLeft||(i.marker=$('<div class="col-intersection-marker"><div class="top-marker"></div><div class="bottom-marker"></div></div>'),i.markerLeft=$('<div class="col-intersection-marker"><div class="top-marker"></div><div class="bottom-marker"></div></div>')),i.lastInt&&i.lastInt===a||(i.lastInt=a,i.marker.remove(),i.markerLeft.remove(),$(".w2ui-head").removeClass("w2ui-col-intersection"),a>=i.columns.length?($(i.columns[i.columns.length-1]).children("div:last").append(i.marker.addClass("right").removeClass("left")),$(i.columns[i.columns.length-1]).addClass("w2ui-col-intersection")):a<=i.numberPreColumnsPresent?($(i.columns[i.numberPreColumnsPresent]).prepend(i.marker.addClass("left").removeClass("right")).css({position:"relative"}),$(i.columns[i.numberPreColumnsPresent]).prev().addClass("w2ui-col-intersection")):($(i.columns[a]).children("div:last").prepend(i.marker.addClass("left").removeClass("right")),$(i.columns[a]).prev().children("div:last").append(i.markerLeft.addClass("right").removeClass("left")).css({position:"relative"}),$(i.columns[a-1]).addClass("w2ui-col-intersection")))}function f(a,b,c){if(a<=b[0])return 0;if(a>=b[b.length-1]+c)return b.length;for(var d=0,e=b.length;e>d;d++){var f=b[d],g=b[d+1]||b[d]+c,h=(g-b[d])/2+b[d];if(a>f&&h>=a)return d;if(a>h&&g>=a)return d+1}return intersection}function g(a,b){$(i.ghost).css({left:a-10,top:b-10})}if(this.columnGroups&&this.columnGroups.length)throw"Draggable columns are not currently supported with column groups.";var h=this,i={};return i.lastInt=null,i.pressed=!1,i.timeout=null,i.columnHead=null,$(h.box).on("mousedown",b),$(h.box).on("mouseup",a),{remove:function(){$(h.box).off("mousedown",b),$(h.box).off("mouseup",a),$(h.box).find(".w2ui-head").removeAttr("draggable"),h.last.columnDrag=!1}}},columnOnOff:function(a,b,c){var d=this.trigger({phase:"before",target:this.name,type:"columnOnOff",checkbox:a,field:c,originalEvent:b});if(d.isCancelled!==!0){var e=this;for(var f in this.records)this.records[f].expanded===!0&&(this.records[f].expanded=!1);var g=!0;if("line-numbers"==c)this.show.lineNumbers=!this.show.lineNumbers,this.refresh();else{var h=this.getColumn(c);h.hidden?($(a).prop("checked",!0),this.showColumn(h.field)):($(a).prop("checked",!1),this.hideColumn(h.field)),g=!1}g&&setTimeout(function(){$().w2overlay("",{name:"searches-"+this.name}),e.toolbar.uncheck("column-on-off")},100),this.trigger($.extend(d,{phase:"after"}))}},initToolbar:function(){if("undefined"==typeof this.toolbar.render){var a=this.toolbar.items;if(this.toolbar.items=[],this.toolbar=$().w2toolbar($.extend(!0,{},this.toolbar,{name:this.name+"_toolbar",owner:this})),this.show.toolbarReload&&this.toolbar.items.push($.extend(!0,{},this.buttons.reload)),this.show.toolbarColumns&&this.toolbar.items.push($.extend(!0,{},this.buttons.columns)),(this.show.toolbarReload||this.show.toolbarColumn)&&this.toolbar.items.push({type:"break",id:"w2ui-break0"}),this.show.toolbarSearch){var b='<div class="w2ui-toolbar-search"><table cellpadding="0" cellspacing="0"><tr>    <td>'+this.buttons.search.html+'</td>    <td>        <input id="grid_'+this.name+'_search_all" class="w2ui-search-all"             placeholder="'+this.last.caption+'" value="'+this.last.search+"\"            onkeydown=\"if (event.keyCode == 13 && w2utils.isIE) this.onchange();\"            onchange=\"                var val = this.value;                 var fld = $(this).data('w2field');                 var dat = $(this).data('selected');                 if (fld) val = fld.clean(val);                if (dat != null && $.isPlainObject(dat)) val = dat.id;                w2ui['"+this.name+"'].search(w2ui['"+this.name+'\'].last.field, val);             ">    </td>    <td>        <div title="'+w2utils.lang("Clear Search")+'" class="w2ui-search-clear" id="grid_'+this.name+'_searchClear"               onclick="var obj = w2ui[\''+this.name+"']; obj.searchReset();\"         >&nbsp;&nbsp;</div>    </td></tr></table></div>";this.toolbar.items.push({type:"html",id:"w2ui-search",html:b}),this.multiSearch&&this.searches.length>0&&this.toolbar.items.push($.extend(!0,{},this.buttons["search-go"]))}this.show.toolbarSearch&&(this.show.toolbarAdd||this.show.toolbarEdit||this.show.toolbarDelete||this.show.toolbarSave)&&this.toolbar.items.push({type:"break",id:"w2ui-break1"}),this.show.toolbarAdd&&this.toolbar.items.push($.extend(!0,{},this.buttons.add)),this.show.toolbarEdit&&this.toolbar.items.push($.extend(!0,{},this.buttons.edit)),this.show.toolbarDelete&&this.toolbar.items.push($.extend(!0,{},this.buttons["delete"])),this.show.toolbarSave&&((this.show.toolbarAdd||this.show.toolbarDelete||this.show.toolbarEdit)&&this.toolbar.items.push({type:"break",id:"w2ui-break2"}),this.toolbar.items.push($.extend(!0,{},this.buttons.save)));for(var c in a)this.toolbar.items.push(a[c]);var d=this;this.toolbar.on("click",function(a){function b(){$("#w2ui-overlay-searches-"+d.name).data("keepOpen")!==!0&&(g.uncheck(e),$(document).off("click","body",b))}var c=d.trigger({phase:"before",type:"toolbar",target:a.target,originalEvent:a});if(c.isCancelled!==!0){var e=a.target;switch(e){case"w2ui-reload":var f=d.trigger({phase:"before",type:"reload",target:d.name});if(f.isCancelled===!0)return!1;d.reload(),d.trigger($.extend(f,{phase:"after"}));break;case"w2ui-column-on-off":d.initColumnOnOff(),d.initResize(),d.resize();break;case"w2ui-search-advanced":var g=this,h=this.get(e);h.checked?(d.searchClose(),setTimeout(function(){g.uncheck(e)},1)):(d.searchOpen(),a.originalEvent.stopPropagation(),$(document).on("click","body",b));break;case"w2ui-add":var c=d.trigger({phase:"before",target:d.name,type:"add",recid:null});d.trigger($.extend(c,{phase:"after"}));break;case"w2ui-edit":var i=d.getSelection(),j=null;1==i.length&&(j=i[0]);var c=d.trigger({phase:"before",target:d.name,type:"edit",recid:j});d.trigger($.extend(c,{phase:"after"}));break;case"w2ui-delete":d["delete"]();break;case"w2ui-save":d.save()}d.trigger($.extend(c,{phase:"after"}))}})}},initResize:function(){var a=this;$(this.box).find(".w2ui-resizer").off("click").on("click",function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0,a.preventDefault&&a.preventDefault()}).off("mousedown").on("mousedown",function(b){b||(b=window.event),window.addEventListener||window.document.attachEvent("onselectstart",function(){return!1}),a.resizing=!0,a.last.tmp={x:b.screenX,y:b.screenY,gx:b.screenX,gy:b.screenY,col:parseInt($(this).attr("name"))},b.stopPropagation?b.stopPropagation():b.cancelBubble=!0,b.preventDefault&&b.preventDefault();for(var c in a.columns)a.columns[c].hidden||("undefined"==typeof a.columns[c].sizeOriginal&&(a.columns[c].sizeOriginal=a.columns[c].size),a.columns[c].size=a.columns[c].sizeCalculated);var d={phase:"before",type:"columnResize",target:a.name,column:a.last.tmp.col,field:a.columns[a.last.tmp.col].field};d=a.trigger($.extend(d,{resizeBy:0,originalEvent:b}));var e=function(b){if(1==a.resizing){if(b||(b=window.event),d=a.trigger($.extend(d,{resizeBy:b.screenX-a.last.tmp.gx,originalEvent:b})),d.isCancelled===!0)return void(d.isCancelled=!1);a.last.tmp.x=b.screenX-a.last.tmp.x,a.last.tmp.y=b.screenY-a.last.tmp.y,a.columns[a.last.tmp.col].size=parseInt(a.columns[a.last.tmp.col].size)+a.last.tmp.x+"px",a.resizeRecords(),a.last.tmp.x=b.screenX,a.last.tmp.y=b.screenY}},f=function(b){delete a.resizing,$(document).off("mousemove","body"),$(document).off("mouseup","body"),a.resizeRecords(),a.trigger($.extend(d,{phase:"after",originalEvent:b}))};$(document).on("mousemove","body",e),$(document).on("mouseup","body",f)}).each(function(a,b){var c=$(b).parent();$(b).css({height:"25px","margin-left":c.width()-3+"px"})})},resizeBoxes:function(){{var a=($(this.box).find("> div"),$("#grid_"+this.name+"_header")),b=$("#grid_"+this.name+"_toolbar"),c=$("#grid_"+this.name+"_summary"),d=$("#grid_"+this.name+"_footer"),e=$("#grid_"+this.name+"_body");$("#grid_"+this.name+"_columns"),$("#grid_"+this.name+"_records")}this.show.header&&a.css({top:"0px",left:"0px",right:"0px"}),this.show.toolbar&&b.css({top:0+(this.show.header?w2utils.getSize(a,"height"):0)+"px",left:"0px",right:"0px"}),this.show.footer&&d.css({bottom:"0px",left:"0px",right:"0px"}),this.summary.length>0&&c.css({bottom:0+(this.show.footer?w2utils.getSize(d,"height"):0)+"px",left:"0px",right:"0px"}),e.css({top:0+(this.show.header?w2utils.getSize(a,"height"):0)+(this.show.toolbar?w2utils.getSize(b,"height"):0)+"px",bottom:0+(this.show.footer?w2utils.getSize(d,"height"):0)+(this.summary.length>0?w2utils.getSize(c,"height"):0)+"px",left:"0px",right:"0px"})},resizeRecords:function(){var a=this;$(this.box).find(".w2ui-empty-record").remove();var b=$(this.box),c=$(this.box).find("> div"),d=$("#grid_"+this.name+"_header"),e=$("#grid_"+this.name+"_toolbar"),f=$("#grid_"+this.name+"_summary"),g=$("#grid_"+this.name+"_footer"),h=$("#grid_"+this.name+"_body"),i=$("#grid_"+this.name+"_columns"),j=$("#grid_"+this.name+"_records");if(this.fixedBody){var k=c.height()-(this.show.header?w2utils.getSize(d,"height"):0)-(this.show.toolbar?w2utils.getSize(e,"height"):0)-("none"!=f.css("display")?w2utils.getSize(f,"height"):0)-(this.show.footer?w2utils.getSize(g,"height"):0);h.css("height",k)}else{var k=w2utils.getSize(i,"height")+w2utils.getSize($("#grid_"+a.name+"_records table"),"height");a.height=k+w2utils.getSize(c,"+height")+(a.show.header?w2utils.getSize(d,"height"):0)+(a.show.toolbar?w2utils.getSize(e,"height"):0)+("none"!=f.css("display")?w2utils.getSize(f,"height"):0)+(a.show.footer?w2utils.getSize(g,"height"):0),c.css("height",a.height),h.css("height",k),b.css("height",w2utils.getSize(c,"height")+w2utils.getSize(b,"+height"))}var l=this.records.length;0==this.searchData.length||this.url||(l=this.last.searchIds.length);var m=!1,n=!1;if(h.width()<$(j).find(">table").width()&&(m=!0),h.height()-i.height()<$(j).find(">table").height()+(m?w2utils.scrollBarSize():0)&&(n=!0),this.fixedBody||(n=!1),m||n?(i.find("> table > tbody > tr:nth-child(1) td.w2ui-head-last").css("width",w2utils.scrollBarSize()).show(),j.css({top:(this.columnGroups.length>0&&this.show.columns?1:0)+w2utils.getSize(i,"height")+"px","-webkit-overflow-scrolling":"touch","overflow-x":m?"auto":"hidden","overflow-y":n?"auto":"hidden"})):(i.find("> table > tbody > tr:nth-child(1) td.w2ui-head-last").hide(),j.css({top:(this.columnGroups.length>0&&this.show.columns?1:0)+w2utils.getSize(i,"height")+"px",overflow:"hidden"}),j.length>0&&(this.last.scrollTop=0,this.last.scrollLeft=0)),this.show.emptyRecords&&!n){var o=Math.floor(j.height()/this.recordHeight)+1;if(this.fixedBody)for(var p=l;o>=p;p++){var q="";q+='<tr class="'+(p%2?"w2ui-even":"w2ui-odd")+' w2ui-empty-record" style="height: '+this.recordHeight+'px">',this.show.lineNumbers&&(q+='<td class="w2ui-col-number"></td>'),this.show.selectColumn&&(q+='<td class="w2ui-grid-data w2ui-col-select"></td>'),this.show.expandColumn&&(q+='<td class="w2ui-grid-data w2ui-col-expand"></td>');for(var r=0;this.columns.length>0;){var s=this.columns[r];if(s.hidden){if(r++,"undefined"==typeof this.columns[r])break}else if(q+='<td class="w2ui-grid-data" '+("undefined"!=typeof s.attr?s.attr:"")+' col="'+r+'"></td>',r++,"undefined"==typeof this.columns[r])break}q+='<td class="w2ui-grid-data-last"></td>',q+="</tr>",$("#grid_"+this.name+"_records > table").append(q)}}if(h.length>0){for(var t=parseInt(h.width())-(n?w2utils.scrollBarSize():0)-(this.show.lineNumbers?34:0)-(this.show.selectColumn?26:0)-(this.show.expandColumn?26:0),u=t,v=0,w=!1,x=0;x<this.columns.length;x++){var s=this.columns[x];s.gridMinWidth>0&&(s.gridMinWidth>u&&s.hidden!==!0&&(s.hidden=!0,w=!0),s.gridMinWidth<u&&s.hidden===!0&&(s.hidden=!1,w=!0))}if(w===!0)return void this.refresh();for(var x=0;x<this.columns.length;x++){var s=this.columns[x];s.hidden||("px"==String(s.size).substr(String(s.size).length-2).toLowerCase()?(t-=parseFloat(s.size),this.columns[x].sizeCalculated=s.size,this.columns[x].sizeType="px"):(v+=parseFloat(s.size),this.columns[x].sizeType="%",delete s.sizeCorrected))}if(100!=v&&v>0)for(var x=0;x<this.columns.length;x++){var s=this.columns[x];s.hidden||"%"==s.sizeType&&(s.sizeCorrected=Math.round(100*parseFloat(s.size)*100/v)/100+"%")}for(var x=0;x<this.columns.length;x++){var s=this.columns[x];s.hidden||"%"==s.sizeType&&(this.columns[x].sizeCalculated="undefined"!=typeof this.columns[x].sizeCorrected?Math.floor(t*parseFloat(s.sizeCorrected)/100)-1+"px":Math.floor(t*parseFloat(s.size)/100)-1+"px")}}for(var y=0,x=0;x<this.columns.length;x++){var s=this.columns[x];s.hidden||("undefined"==typeof s.min&&(s.min=20),parseInt(s.sizeCalculated)<parseInt(s.min)&&(s.sizeCalculated=s.min+"px"),parseInt(s.sizeCalculated)>parseInt(s.max)&&(s.sizeCalculated=s.max+"px"),y+=parseInt(s.sizeCalculated))}var z=parseInt(u)-parseInt(y);if(z>0&&v>0)for(var x=0;;){var s=this.columns[x];if("undefined"!=typeof s)if(s.hidden||"px"==s.sizeType)x++;else{if(s.sizeCalculated=parseInt(s.sizeCalculated)+1+"px",z--,0==z)break;x++}else x=0}else z>0&&i.find("> table > tbody > tr:nth-child(1) td.w2ui-head-last").css("width",w2utils.scrollBarSize()).show();i.find("> table > tbody > tr:nth-child(1) td").each(function(b,c){var d=$(c).attr("col");"undefined"!=typeof d&&a.columns[d]&&$(c).css("width",a.columns[d].sizeCalculated),$(c).hasClass("w2ui-head-last")&&$(c).css("width",w2utils.scrollBarSize()+(z>0&&0==v?z:0)+"px")}),3==i.find("> table > tbody > tr").length&&i.find("> table > tbody > tr:nth-child(1) td").html("").css({height:"0px",border:"0px",padding:"0px",margin:"0px"}),j.find("> table > tbody > tr:nth-child(1) td").each(function(b,c){var d=$(c).attr("col");"undefined"!=typeof d&&a.columns[d]&&$(c).css("width",a.columns[d].sizeCalculated),$(c).hasClass("w2ui-grid-data-last")&&$(c).css("width",(z>0&&0==v?z:0)+"px")}),f.find("> table > tbody > tr:nth-child(1) td").each(function(b,c){var d=$(c).attr("col");"undefined"!=typeof d&&a.columns[d]&&$(c).css("width",a.columns[d].sizeCalculated),$(c).hasClass("w2ui-grid-data-last")&&$(c).css("width",w2utils.scrollBarSize()+(z>0&&0==v?z:0)+"px")}),this.initResize(),this.refreshRanges(),(this.last.scrollTop||this.last.scrollLeft)&&j.length>0&&(i.prop("scrollLeft",this.last.scrollLeft),j.prop("scrollTop",this.last.scrollTop),j.prop("scrollLeft",this.last.scrollLeft))},getSearchesHTML:function(){for(var a='<table cellspacing="0">',b=!1,c=0;c<this.searches.length;c++){var d=this.searches[c];if(d.type=String(d.type).toLowerCase(),!d.hidden){var e="";if(0==b&&(e='<button class="btn close-btn" onclick="obj = w2ui[\''+this.name+"']; if (obj) { obj.searchClose(); }\">X</button",b=!0),"undefined"==typeof d.inTag&&(d.inTag=""),"undefined"==typeof d.outTag&&(d.outTag=""),"undefined"==typeof d.type&&(d.type="text"),-1!=["text","alphanumeric","combo"].indexOf(d.type))var f='<select id="grid_'+this.name+"_operator_"+c+'" onclick="event.stopPropagation();">    <option value="is">'+w2utils.lang("is")+'</option>    <option value="begins">'+w2utils.lang("begins")+'</option>    <option value="contains">'+w2utils.lang("contains")+'</option>    <option value="ends">'+w2utils.lang("ends")+"</option></select>";if(-1!=["int","float","money","currency","percent","date","time"].indexOf(d.type))var f='<select id="grid_'+this.name+"_operator_"+c+'"         onchange="w2ui[\''+this.name+"'].initOperator(this, "+c+');" onclick="event.stopPropagation();">    <option value="is">'+w2utils.lang("is")+"</option>"+(-1!=["int"].indexOf(d.type)?'<option value="in">'+w2utils.lang("in")+"</option>":"")+(-1!=["int"].indexOf(d.type)?'<option value="not in">'+w2utils.lang("not in")+"</option>":"")+'<option value="between">'+w2utils.lang("between")+"</option></select>";if(-1!=["select","list","hex"].indexOf(d.type))var f='<select id="grid_'+this.name+"_operator_"+c+'" onclick="event.stopPropagation();">    <option value="is">'+w2utils.lang("is")+"</option></select>";if(-1!=["enum"].indexOf(d.type))var f='<select id="grid_'+this.name+"_operator_"+c+'" onclick="event.stopPropagation();">    <option value="in">'+w2utils.lang("in")+'</option>    <option value="not in">'+w2utils.lang("not in")+"</option></select>";switch(a+='<tr>    <td class="close-btn">'+e+'</td>    <td class="caption">'+d.caption+'</td>    <td class="operator">'+f+'</td>    <td class="value">',d.type){case"text":case"alphanumeric":case"hex":case"list":case"combo":case"enum":a+='<input rel="search" type="text" style="width: 300px;" id="grid_'+this.name+"_field_"+c+'" name="'+d.field+'" '+d.inTag+">";break;case"int":case"float":case"money":case"currency":case"percent":case"date":case"time":a+='<input rel="search" type="text" size="12" id="grid_'+this.name+"_field_"+c+'" name="'+d.field+'" '+d.inTag+'><span id="grid_'+this.name+"_range_"+c+'" style="display: none">&nbsp;-&nbsp;&nbsp;<input rel="search" type="text" style="width: 90px" id="grid_'+this.name+"_field2_"+c+'" name="'+d.field+'" '+d.inTag+"></span>";break;case"select":a+='<select rel="search" id="grid_'+this.name+"_field_"+c+'" name="'+d.field+'" '+d.inTag+'  onclick="event.stopPropagation();"></select>'}a+=d.outTag+"    </td></tr>"}}return a+='<tr>    <td colspan="4" class="actions">        <div>        <button class="btn" onclick="obj = w2ui[\''+this.name+"']; if (obj) { obj.searchReset(); }\">"+w2utils.lang("Reset")+'</button>        <button class="btn btn-blue" onclick="obj = w2ui[\''+this.name+"']; if (obj) { obj.search(); }\">"+w2utils.lang("Search")+"</button>        </div>    </td></tr></table>"},initOperator:function(a,b){var c=this,d=c.searches[b],e=$("#grid_"+c.name+"_range_"+b),f=$("#grid_"+c.name+"_field_"+b),g=f.parent().find("span input");f.w2field("in"==$(a).val()||"not in"==$(a).val()?"clear":d.type),"between"==$(a).val()?(e.show(),g.w2field(d.type)):e.hide()},initSearches:function(){var a=this;for(var b in this.searches){var c=this.searches[b],d=this.getSearchData(c.field);switch(c.type=String(c.type).toLowerCase(),"object"!=typeof c.options&&(c.options={}),c.type){case"text":case"alphanumeric":$("#grid_"+this.name+"_operator_"+b).val("begins"),-1!=["alphanumeric","hex"].indexOf(c.type)&&$("#grid_"+this.name+"_field_"+b).w2field(c.type,c.options);break;case"int":case"float":case"money":case"currency":case"percent":case"date":case"time":if(d&&"int"==d.type&&-1!=["in","not in"].indexOf(d.operator))break;$("#grid_"+this.name+"_field_"+b).w2field(c.type,c.options),$("#grid_"+this.name+"_field2_"+b).w2field(c.type,c.options),setTimeout(function(){$("#grid_"+a.name+"_field_"+b).keydown(),$("#grid_"+a.name+"_field2_"+b).keydown()},1);break;
case"hex":break;case"list":case"combo":case"enum":var e=c.options;"list"==c.type&&(e.selected={}),"enum"==c.type&&(e.selected=[]),d&&(e.selected=d.value),$("#grid_"+this.name+"_field_"+b).w2field(c.type,e),"combo"==c.type&&$("#grid_"+this.name+"_operator_"+b).val("begins");break;case"select":var e='<option value="">--</option>';for(var f in c.options.items){var g=c.options.items[f];if($.isPlainObject(c.options.items[f])){var h=g.id,i=g.text;"undefined"==typeof h&&"undefined"!=typeof g.value&&(h=g.value),"undefined"==typeof i&&"undefined"!=typeof g.caption&&(i=g.caption),null==h&&(h=""),e+='<option value="'+h+'">'+i+"</option>"}else e+='<option value="'+g+'">'+g+"</option>"}$("#grid_"+this.name+"_field_"+b).html(e)}null!=d&&("int"==d.type&&-1!=["in","not in"].indexOf(d.operator)&&$("#grid_"+this.name+"_field_"+b).w2field("clear").val(d.value),$("#grid_"+this.name+"_operator_"+b).val(d.operator).trigger("change"),$.isArray(d.value)?-1!=["in","not in"].indexOf(d.operator)?$("#grid_"+this.name+"_field_"+b).val(d.value).trigger("change"):($("#grid_"+this.name+"_field_"+b).val(d.value[0]).trigger("change"),$("#grid_"+this.name+"_field2_"+b).val(d.value[1]).trigger("change")):"udefined"!=typeof d.value&&$("#grid_"+this.name+"_field_"+b).val(d.value).trigger("change"))}$("#w2ui-overlay-searches-"+this.name+" .w2ui-grid-searches *[rel=search]").on("keypress",function(b){13==b.keyCode&&(a.search(),$().w2overlay())})},getColumnsHTML:function(){function a(){var a="<tr>";""!=c.columnGroups[c.columnGroups.length-1].caption&&c.columnGroups.push({caption:""}),c.show.lineNumbers&&(a+='<td class="w2ui-head w2ui-col-number">    <div>&nbsp;</div></td>'),c.show.selectColumn&&(a+='<td class="w2ui-head w2ui-col-select">    <div>&nbsp;</div></td>'),c.show.expandColumn&&(a+='<td class="w2ui-head w2ui-col-expand">    <div>&nbsp;</div></td>');for(var b=0,d=0;d<c.columnGroups.length;d++){var e=c.columnGroups[d],f=c.columns[b];if(("undefined"==typeof e.span||e.span!=parseInt(e.span))&&(e.span=1),"undefined"!=typeof e.colspan&&(e.span=e.colspan),e.master===!0){var g="";for(var h in c.sortData)c.sortData[h].field==f.field&&(RegExp("asc","i").test(c.sortData[h].direction)&&(g="w2ui-sort-up"),RegExp("desc","i").test(c.sortData[h].direction)&&(g="w2ui-sort-down"));var i="";f.resizable!==!1&&(i='<div class="w2ui-resizer" name="'+b+'"></div>'),a+='<td class="w2ui-head '+g+'" col="'+b+'" rowspan="2" colspan="'+(e.span+(d==c.columnGroups.length-1?1:0))+'"     onclick="w2ui[\''+c.name+"'].columnClick('"+f.field+"', event);\">"+i+'    <div class="w2ui-col-group w2ui-col-header '+(g?"w2ui-col-sorted":"")+'">        <div class="'+g+'"></div>'+(f.caption?f.caption:"&nbsp;")+"    </div></td>"}else a+='<td class="w2ui-head" col="'+b+'"         colspan="'+(e.span+(d==c.columnGroups.length-1?1:0))+'">    <div class="w2ui-col-group">'+(e.caption?e.caption:"&nbsp;")+"    </div></td>";b+=e.span}return a+="</tr>"}function b(a){var b="<tr>",d=!c.reorderColumns||c.columnGroups&&c.columnGroups.length?"":" w2ui-reorder-cols-head ";c.show.lineNumbers&&(b+='<td class="w2ui-head w2ui-col-number" onclick="w2ui[\''+c.name+"'].columnClick('line-number', event);\">    <div>#</div></td>"),c.show.selectColumn&&(b+='<td class="w2ui-head w2ui-col-select"         onclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">    <div>        <input type="checkbox" id="grid_'+c.name+'_check_all" tabIndex="-1"            style="'+(0==c.multiSelect?"display: none;":"")+'"            onclick="if (this.checked) w2ui[\''+c.name+"'].selectAll();                      else w2ui['"+c.name+"'].selectNone();                      if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;\">    </div></td>"),c.show.expandColumn&&(b+='<td class="w2ui-head w2ui-col-expand">    <div>&nbsp;</div></td>');for(var e=0,f=0,g=0;g<c.columns.length;g++){var h=c.columns[g],i={};if(g==f&&(f+="undefined"!=typeof c.columnGroups[e]?parseInt(c.columnGroups[e].span):0,e++),"undefined"!=typeof c.columnGroups[e-1])var i=c.columnGroups[e-1];if(!h.hidden){var j="";for(var k in c.sortData)c.sortData[k].field==h.field&&(RegExp("asc","i").test(c.sortData[k].direction)&&(j="w2ui-sort-up"),RegExp("desc","i").test(c.sortData[k].direction)&&(j="w2ui-sort-down"));if(i.master!==!0||a){var l="";h.resizable!==!1&&(l='<div class="w2ui-resizer" name="'+g+'"></div>'),b+='<td col="'+g+'" class="w2ui-head '+j+d+'"     onclick="w2ui[\''+c.name+"'].columnClick('"+h.field+"', event);\">"+l+'    <div class="w2ui-col-header '+(j?"w2ui-col-sorted":"")+'">        <div class="'+j+'"></div>'+(h.caption?h.caption:"&nbsp;")+"    </div></td>"}}}return b+='<td class="w2ui-head w2ui-head-last"><div>&nbsp;</div></td>',b+="</tr>"}var c=this,d="";return this.show.columnHeaders&&(d=this.columnGroups.length>0?b(!0)+a()+b(!1):b(!0)),d},getRecordsHTML:function(){var a=this.records.length;0==this.searchData.length||this.url||(a=this.last.searchIds.length),this.show_extra=a>300?30:300;var b=$("#grid_"+this.name+"_records"),c=Math.floor(b.height()/this.recordHeight)+this.show_extra+1;(!this.fixedBody||c>a)&&(c=a);var d="<table>"+this.getRecordHTML(-1,0);d+='<tr id="grid_'+this.name+'_rec_top" line="top" style="height: 0px">    <td colspan="200"></td></tr>';for(var e=0;c>e;e++)d+=this.getRecordHTML(e,e+1);return d+='<tr id="grid_'+this.name+'_rec_bottom" line="bottom" style="height: '+(a-c)*this.recordHeight+'px">    <td colspan="200"></td></tr><tr id="grid_'+this.name+'_rec_more" style="display: none">    <td colspan="200" class="w2ui-load-more"></td></tr></table>',this.last.range_start=0,this.last.range_end=c,d},getSummaryHTML:function(){if(0!=this.summary.length){for(var a="<table>",b=0;b<this.summary.length;b++)a+=this.getRecordHTML(b,b+1,!0);return a+="</table>"}},scroll:function(){function a(){b.markSearch!==!1&&(clearTimeout(b.last.marker_timer),b.last.marker_timer=setTimeout(function(){var a=[];for(var c in b.searchData){var d=b.searchData[c];-1==$.inArray(d.value,a)&&a.push(d.value)}a.length>0&&$(b.box).find(".w2ui-grid-data > div").w2marker(a)},50))}var b=((new Date).getTime(),this),c=$("#grid_"+this.name+"_records"),d=this.records.length;if(0==this.searchData.length||this.url||(d=this.last.searchIds.length),0!=d&&0!=c.length&&0!=c.height()){if(this.show_extra=d>300?30:300,c.height()<d*this.recordHeight&&"hidden"==c.css("overflow-y"))return void(this.total>0&&this.refresh());var e=Math.round(c[0].scrollTop/this.recordHeight+1),f=e+(Math.round(c.height()/this.recordHeight)-1);e>d&&(e=d),f>d&&(f=d);var g="object"!=typeof this.url?this.url:this.url.get;if($("#grid_"+this.name+"_footer .w2ui-footer-right").html(w2utils.formatNumber(this.offset+e)+"-"+w2utils.formatNumber(this.offset+f)+" "+w2utils.lang("of")+" "+w2utils.formatNumber(this.total)+(g?" ("+w2utils.lang("buffered")+" "+w2utils.formatNumber(d)+(this.offset>0?", skip "+w2utils.formatNumber(this.offset):"")+")":"")),g||this.fixedBody&&!(this.total<=300)){var h=Math.floor(c[0].scrollTop/this.recordHeight)-this.show_extra,i=h+Math.floor(c.height()/this.recordHeight)+2*this.show_extra+1;1>h&&(h=1),i>this.total&&(i=this.total);var j=c.find("#grid_"+this.name+"_rec_top"),k=c.find("#grid_"+this.name+"_rec_bottom");-1!=String(j.next().prop("id")).indexOf("_expanded_row")&&j.next().remove(),this.total>i&&-1!=String(k.prev().prop("id")).indexOf("_expanded_row")&&k.prev().remove();var l=parseInt(j.next().attr("line")),m=parseInt(k.prev().attr("line"));if(h>l||1==l||this.last.pull_refresh){if(i<=m+this.show_extra-2&&i!=this.total)return;for(this.last.pull_refresh=!1;;){var n=c.find("#grid_"+this.name+"_rec_top").next();if("bottom"==n.attr("line"))break;if(!(parseInt(n.attr("line"))<h))break;n.remove()}var n=c.find("#grid_"+this.name+"_rec_bottom").prev(),o=n.attr("line");"top"==o&&(o=h);for(var p=parseInt(o)+1;i>=p;p++)this.records[p-1]&&(this.records[p-1].expanded===!0&&(this.records[p-1].expanded=!1),k.before(this.getRecordHTML(p-1,p)));a(),setTimeout(function(){b.refreshRanges()},0)}else{if(h>=l-this.show_extra+2&&h>1)return;for(;;){var n=c.find("#grid_"+this.name+"_rec_bottom").prev();if("top"==n.attr("line"))break;if(!(parseInt(n.attr("line"))>i))break;n.remove()}var n=c.find("#grid_"+this.name+"_rec_top").next(),o=n.attr("line");"bottom"==o&&(o=i);for(var p=parseInt(o)-1;p>=h;p--)this.records[p-1]&&(this.records[p-1].expanded===!0&&(this.records[p-1].expanded=!1),j.after(this.getRecordHTML(p-1,p)));a(),setTimeout(function(){b.refreshRanges()},0)}var q=(h-1)*b.recordHeight,r=(d-i)*b.recordHeight;0>r&&(r=0),j.css("height",q+"px"),k.css("height",r+"px"),b.last.range_start=h,b.last.range_end=i;var s=Math.floor(c[0].scrollTop/this.recordHeight),t=s+Math.floor(c.height()/this.recordHeight);if(t+10>d&&this.last.pull_more!==!0&&d<this.total-this.offset)if(this.autoLoad===!0)this.last.pull_more=!0,this.last.xhr_offset+=this.limit,this.request("get-records");else{var u=$("#grid_"+this.name+"_rec_more");"none"==u.css("display")&&u.show().on("click",function(){b.last.pull_more=!0,b.last.xhr_offset+=b.limit,b.request("get-records"),$(this).find("td").html('<div><div style="width: 20px; height: 20px;" class="w2ui-spinner"></div></div>')}),-1==u.find("td").text().indexOf("Load")&&u.find("td").html("<div>"+w2utils.lang("Load")+" "+b.limit+" "+w2utils.lang("More")+"...</div>")}d>=this.total-this.offset&&$("#grid_"+this.name+"_rec_more").hide()}}},getRecordHTML:function(a,b,c){var d,e="",f=this.last.selection;if(-1==a){e+='<tr line="0">',this.show.lineNumbers&&(e+='<td class="w2ui-col-number" style="height: 0px;"></td>'),this.show.selectColumn&&(e+='<td class="w2ui-col-select" style="height: 0px;"></td>'),this.show.expandColumn&&(e+='<td class="w2ui-col-expand" style="height: 0px;"></td>');for(var g in this.columns)this.columns[g].hidden||(e+='<td class="w2ui-grid-data" col="'+g+'" style="height: 0px;"></td>');return e+='<td class="w2ui-grid-data-last" style="height: 0px;"></td>',e+="</tr>"}var h="object"!=typeof this.url?this.url:this.url.get;if(c!==!0)if(this.searchData.length>0&&!h){if(a>=this.last.searchIds.length)return"";a=this.last.searchIds[a],d=this.records[a]}else{if(a>=this.records.length)return"";d=this.records[a]}else{if(a>=this.summary.length)return"";d=this.summary[a]}if(!d)return"";var i=(w2utils.escapeId(d.recid),!1);if(-1!=f.indexes.indexOf(a)&&(i=!0),e+='<tr id="grid_'+this.name+"_rec_"+d.recid+'" recid="'+d.recid+'" line="'+b+'"  class="'+(b%2==0?"w2ui-even":"w2ui-odd")+(i&&"row"==this.selectType?" w2ui-selected":"")+(d.editable===!1?" w2ui-no-edit":"")+(d.expanded===!0?" w2ui-expanded":"")+'" '+(c!==!0?w2utils.isIOS?"    onclick  = \"w2ui['"+this.name+"'].dblClick('"+d.recid+"', event);\"":"    onclick  = \"w2ui['"+this.name+"'].click('"+d.recid+"', event);\"    oncontextmenu = \"w2ui['"+this.name+"'].contextMenu('"+d.recid+"', event);\"":"")+' style="height: '+this.recordHeight+"px; "+(i||"string"!=typeof d.style?"":d.style)+'" '+("string"==typeof d.style?'custom_style="'+d.style+'"':"")+">",this.show.lineNumbers&&(e+='<td id="grid_'+this.name+"_cell_"+a+"_number"+(c?"_s":"")+'" class="w2ui-col-number">'+(c!==!0?"<div>"+b+"</div>":"")+"</td>"),this.show.selectColumn&&(e+='<td id="grid_'+this.name+"_cell_"+a+"_select"+(c?"_s":"")+'" class="w2ui-grid-data w2ui-col-select"         onclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">'+(c!==!0?'    <div>        <input class="w2ui-grid-select-check" type="checkbox" tabIndex="-1"            '+(i?'checked="checked"':"")+"            onclick=\"var obj = w2ui['"+this.name+"'];                 if (!obj.multiSelect) { obj.selectNone(); }                if (this.checked) obj.select('"+d.recid+"'); else obj.unselect('"+d.recid+"');                 if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;\">    </div>":"")+"</td>"),this.show.expandColumn){var j="";j=d.expanded===!0?"-":"+","none"==d.expanded&&(j=""),"spinner"==d.expanded&&(j='<div class="w2ui-spinner" style="width: 16px; margin: -2px 2px;"></div>'),e+='<td id="grid_'+this.name+"_cell_"+a+"_expand"+(c?"_s":"")+'" class="w2ui-grid-data w2ui-col-expand">'+(c!==!0?'    <div ondblclick="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;"             onclick="w2ui[\''+this.name+"'].toggle('"+d.recid+"', event);                 if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;\">        "+j+" </div>":"")+"</td>"}for(var k=0;;){var l=this.columns[k];if(l.hidden){if(k++,"undefined"==typeof this.columns[k])break}else{var m=!c&&d.changes&&"undefined"!=typeof d.changes[l.field],n=this.getCellHTML(a,k,c),o="";if("string"==typeof l.render){var p=l.render.toLowerCase().split(":");-1!=["number","int","float","money","currency","percent"].indexOf(p[0])&&(o+="text-align: right;")}"object"==typeof d.style&&"string"==typeof d.style[k]&&(o+=d.style[k]+";");var q=!1;if(i&&-1!=$.inArray(k,f.columns[a])&&(q=!0),e+='<td class="w2ui-grid-data'+(q?" w2ui-selected":"")+(m?" w2ui-changed":"")+'" col="'+k+'"     style="'+o+("undefined"!=typeof l.style?l.style:"")+'" '+("undefined"!=typeof l.attr?l.attr:"")+">"+n+"</td>",k++,"undefined"==typeof this.columns[k])break}}return e+='<td class="w2ui-grid-data-last"></td>',e+="</tr>"},getCellHTML:function(a,b,c){var d=this.columns[b],e=c!==!0?this.records[a]:this.summary[a],f=this.getCellValue(a,b,c),g=d.editable;if(null!=d.render){if("function"==typeof d.render&&(f=$.trim(d.render.call(this,e,a,b)),(f.length<4||"<div"!=f.substr(0,4).toLowerCase())&&(f="<div>"+f+"</div>")),"object"==typeof d.render&&(f="<div>"+(d.render[f]||"")+"</div>"),"string"==typeof d.render){var h=d.render.toLowerCase().split(":"),i="",j="";-1!=["number","int","float","money","currency","percent"].indexOf(h[0])&&("undefined"!=typeof h[1]&&w2utils.isInt(h[1])||(h[1]=0),h[1]>20&&(h[1]=20),h[1]<0&&(h[1]=0),-1!=["money","currency"].indexOf(h[0])&&(h[1]=w2utils.settings.currencyPrecision,i=w2utils.settings.currencyPrefix,j=w2utils.settings.currencySuffix),"percent"==h[0]&&(j="%","0"!==h[1]&&(h[1]=1)),"int"==h[0]&&(h[1]=0),f="<div>"+(""!==f?i+w2utils.formatNumber(Number(f).toFixed(h[1]))+j:"")+"</div>"),"time"==h[0]&&(("undefined"==typeof h[1]||""==h[1])&&(h[1]=w2utils.settings.time_format),f="<div>"+i+w2utils.formatTime(f,"h12"==h[1]?"hh:mi pm":"h24:min")+j+"</div>"),"date"==h[0]&&(("undefined"==typeof h[1]||""==h[1])&&(h[1]=w2utils.settings.date_display),f="<div>"+i+w2utils.formatDate(f,h[1])+j+"</div>"),"age"==h[0]&&(f="<div>"+i+w2utils.age(f)+j+"</div>"),"toggle"==h[0]&&(f="<div>"+i+(f?"Yes":"")+j+"</div>")}}else{var k="";if(g&&-1!=["checkbox","check"].indexOf(g.type)){var l=c?-(a+1):a;k="text-align: center",f='<input type="checkbox" '+(f?"checked":"")+" onclick=\"    var obj = w2ui['"+this.name+"'];     obj.editChange.call(obj, this, "+l+", "+b+', event); ">'}if(this.show.recordTitles){var m=String(f).replace(/"/g,"''");"undefined"!=typeof d.title&&("function"==typeof d.title&&(m=d.title.call(this,e,a,b)),"string"==typeof d.title&&(m=d.title));var f='<div title="'+w2utils.stripTags(m)+'" style="'+k+'">'+f+"</div>"}else var f='<div style="'+k+'">'+f+"</div>"}return(null==f||"undefined"==typeof f)&&(f=""),f},getCellValue:function(a,b,c){var d=this.columns[b],e=c!==!0?this.records[a]:this.summary[a],f=this.parseField(e,d.field);return e.changes&&"undefined"!=typeof e.changes[d.field]&&(f=e.changes[d.field]),(null==f||"undefined"==typeof f)&&(f=""),f},getFooterHTML:function(){return'<div>    <div class="w2ui-footer-left"></div>    <div class="w2ui-footer-right"></div>    <div class="w2ui-footer-center"></div></div>'},status:function(a){if("undefined"!=typeof a)$("#grid_"+this.name+"_footer").find(".w2ui-footer-left").html(a);else{var b="",c=this.getSelection();if(c.length>0){b=String(c.length).replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,")+" "+w2utils.lang("selected");var d=c[0];"object"==typeof d&&(d=d.recid+", "+w2utils.lang("Column")+": "+d.column),1==c.length&&(b=w2utils.lang("Record ID")+": "+d+" ")}$("#grid_"+this.name+"_footer .w2ui-footer-left").html(b),1==c.length?this.toolbar.enable("w2ui-edit"):this.toolbar.disable("w2ui-edit"),c.length>=1?this.toolbar.enable("w2ui-delete"):this.toolbar.disable("w2ui-delete")}},lock:function(){var a=$(this.box).find("> div:first-child"),b=Array.prototype.slice.call(arguments,0);b.unshift(a),setTimeout(function(){w2utils.lock.apply(window,b)},10)},unlock:function(){var a=this.box;setTimeout(function(){w2utils.unlock(a)},25)},stateSave:function(a){if(!localStorage)return null;var b={columns:[],show:$.extend({},this.show),last:{search:this.last.search,multi:this.last.multi,logic:this.last.logic,caption:this.last.caption,field:this.last.field,scrollTop:this.last.scrollTop,scrollLeft:this.last.scrollLeft},sortData:[],searchData:[]};for(var c in this.columns){var d=this.columns[c];b.columns.push({field:d.field,hidden:d.hidden,size:d.size,sizeCalculated:d.sizeCalculated,sizeOriginal:d.sizeOriginal,sizeType:d.sizeType})}for(var c in this.sortData)b.sortData.push($.extend({},this.sortData[c]));for(var c in this.searchData)b.searchData.push($.extend({},this.searchData[c]));if(a!==!0){var e=this.trigger({phase:"before",type:"stateSave",target:this.name,state:b});if(e.isCancelled===!0)return void("function"==typeof callBack&&callBack({status:"error",message:"Request aborted."}));try{var f=$.parseJSON(localStorage.w2ui||"{}");f||(f={}),f.states||(f.states={}),f.states[this.name]=b,localStorage.w2ui=JSON.stringify(f)}catch(g){return delete localStorage.w2ui,null}this.trigger($.extend(e,{phase:"after"}))}return b},stateRestore:function(a){var b=this;if(!a)try{if(!localStorage)return!1;var c=$.parseJSON(localStorage.w2ui||"{}");c||(c={}),c.states||(c.states={}),a=c.states[this.name]}catch(d){return delete localStorage.w2ui,null}var e=this.trigger({phase:"before",type:"stateRestore",target:this.name,state:a});if(e.isCancelled===!0)return void("function"==typeof callBack&&callBack({status:"error",message:"Request aborted."}));if($.isPlainObject(a)){$.extend(this.show,a.show),$.extend(this.last,a.last);var f=this.last.scrollTop,g=this.last.scrollLeft;for(var h in a.columns){var c=a.columns[h],i=this.getColumn(c.field);i&&$.extend(i,c)}this.sortData.splice(0,this.sortData.length);for(var h in a.sortData)this.sortData.push(a.sortData[h]);this.searchData.splice(0,this.searchData.length);for(var h in a.searchData)this.searchData.push(a.searchData[h]);setTimeout(function(){b.sortData.length>0&&b.localSort(),b.searchData.length>0&&b.localSearch(),b.last.scrollTop=f,b.last.scrollLeft=g,b.refresh()},1)}return this.trigger($.extend(e,{phase:"after"})),!0},stateReset:function(){if(this.stateRestore(this.last.state),localStorage)try{var a=$.parseJSON(localStorage.w2ui||"{}");a.states&&a.states[this.name]&&delete a.states[this.name],localStorage.w2ui=JSON.stringify(a)}catch(b){return delete localStorage.w2ui,null}},parseField:function(a,b){var c="";try{c=a;var d=String(b).split(".");for(var e in d)c=c[d[e]]}catch(f){c=""}return c},prepareData:function(){for(var a in this.records){var b=this.records[a];for(var c in this.columns){var d=this.columns[c];if(null!=b[d.field]&&"string"==typeof d.render){if(-1!=["number","int","float","money","currency","percent"].indexOf(d.render.split(":")[0])&&"number"!=typeof b[d.field]&&(b[d.field]=parseFloat(b[d.field])),-1!=["date","age"].indexOf(d.render.split(":")[0])&&!b[d.field+"_"]){var e=b[d.field];w2utils.isInt(e)&&(e=parseInt(e)),b[d.field+"_"]=new Date(e)}if(-1!=["time"].indexOf(d.render))if(w2utils.isTime(b[d.field])){var f=w2utils.isTime(b[d.field],!0),e=new Date;e.setHours(f.hours,f.minutes,f.seconds?f.seconds:0,0),b[d.field+"_"]||(b[d.field+"_"]=e)}else{var f=b[d.field];w2utils.isInt(f)&&(f=parseInt(f));var f=null!=f?new Date(f):new Date,e=new Date;e.setHours(f.getHours(),f.getMinutes(),f.getSeconds(),0),b[d.field+"_"]||(b[d.field+"_"]=e)}}}}},nextCell:function(a,b){var c=a+1;if(this.columns.length==c)return null;if(b===!0){var d=this.columns[c].editable;if(this.columns[c].hidden||"undefined"==typeof d||d&&-1!=["checkbox","check"].indexOf(d.type))return this.nextCell(c,b)}return c},prevCell:function(a,b){var c=a-1;if(0>c)return null;if(b===!0){var d=this.columns[c].editable;if(this.columns[c].hidden||"undefined"==typeof d||d&&-1!=["checkbox","check"].indexOf(d.type))return this.prevCell(c,b)}return c},nextRow:function(a){if(a+1<this.records.length&&0==this.last.searchIds.length||this.last.searchIds.length>0&&a<this.last.searchIds[this.last.searchIds.length-1]){if(a++,this.last.searchIds.length>0)for(;;){if(-1!=$.inArray(a,this.last.searchIds)||a>this.records.length)break;a++}return a}return null},prevRow:function(a){if(a>0&&0==this.last.searchIds.length||this.last.searchIds.length>0&&a>this.last.searchIds[0]){if(a--,this.last.searchIds.length>0)for(;;){if(-1!=$.inArray(a,this.last.searchIds)||0>a)break;a--}return a}return null}},$.extend(w2grid.prototype,w2utils.event),w2obj.grid=w2grid}(),function(){var a=function(a){this.box=null,this.name=null,this.panels=[],this.tmp={},this.padding=1,this.resizer=4,this.style="",this.onShow=null,this.onHide=null,this.onResizing=null,this.onResizerClick=null,this.onRender=null,this.onRefresh=null,this.onResize=null,this.onDestroy=null,$.extend(!0,this,w2obj.layout,a)},b=["top","left","main","preview","right","bottom"];$.fn.w2layout=function(c){function d(a,b,c){var d=a.get(b);return null!==d&&"undefined"==typeof c&&(c=d.tabs),null===d||null===c?!1:($.isArray(c)&&(c={tabs:c}),$().w2destroy(a.name+"_"+b+"_tabs"),d.tabs=$().w2tabs($.extend({},c,{owner:a,name:a.name+"_"+b+"_tabs"})),d.show.tabs=!0,!0)}function e(a,b,c){var d=a.get(b);return null!==d&&"undefined"==typeof c&&(c=d.toolbar),null===d||null===c?!1:($.isArray(c)&&(c={items:c}),$().w2destroy(a.name+"_"+b+"_toolbar"),d.toolbar=$().w2toolbar($.extend({},c,{owner:a,name:a.name+"_"+b+"_toolbar"})),d.show.toolbar=!0,!0)}if("object"==typeof c||!c){if(!w2utils.checkName(c,"w2layout"))return;var f=c.panels||[],g=new a(c);$.extend(g,{handlers:[],panels:[]});for(var h=0,i=f.length;i>h;h++)g.panels[h]=$.extend(!0,{},a.prototype.panel,f[h]),($.isPlainObject(g.panels[h].tabs)||$.isArray(g.panels[h].tabs))&&d(g,f[h].type),($.isPlainObject(g.panels[h].toolbar)||$.isArray(g.panels[h].toolbar))&&e(g,f[h].type);for(var j in b)j=b[j],null===g.get(j)&&g.panels.push($.extend(!0,{},a.prototype.panel,{type:j,hidden:"main"!==j,size:50}));return $(this).length>0&&g.render($(this)[0]),w2ui[g.name]=g,g}if(w2ui[$(this).attr("name")]){var k=w2ui[$(this).attr("name")];return k[c].apply(k,Array.prototype.slice.call(arguments,1)),this}console.log("ERROR: Method "+c+" does not exist on jQuery.w2layout")},a.prototype={panel:{type:null,title:"",size:100,minSize:20,maxSize:!1,hidden:!1,resizable:!1,overflow:"auto",style:"",content:"",tabs:null,toolbar:null,width:null,height:null,show:{toolbar:!1,tabs:!1},onRefresh:null,onShow:null,onHide:null},html:function(a,b,c){return this.content(a,b,c)},content:function(a,b,c){var d=this,e=this.get(a);if("css"==a)return $("#layout_"+d.name+"_panel_css").html("<style>"+b+"</style>"),!0;if(null===e)return!1;if("undefined"==typeof b||null===b)return e.content;if(b instanceof jQuery)return console.log("ERROR: You can not pass jQuery object to w2layout.content() method"),!1;var f="#layout_"+this.name+"_panel_"+e.type,g=$(f+"> .w2ui-panel-content"),h=0;if(g.length>0&&($(f).scrollTop(0),h=$(g).position().top),""===e.content)e.content=b,this.refresh(a);else{if(e.content=b,!e.hidden&&null!==c&&""!==c&&"undefined"!=typeof c){var i=$(f+"> .w2ui-panel-content");i.after('<div class="w2ui-panel-content new-panel" style="'+i[0].style.cssText+'"></div>');var j=$(f+"> .w2ui-panel-content.new-panel");i.css("top",h),j.css("top",h),"object"==typeof b?(b.box=j[0],b.render()):j.html(b),w2utils.transition(i[0],j[0],c,function(){i.remove(),j.removeClass("new-panel"),j.css("overflow",e.overflow),d.resize(),-1!=window.navigator.userAgent.indexOf("MSIE")&&setTimeout(function(){d.resize()},100)})}this.refresh(a)}return d.resize(),-1!=window.navigator.userAgent.indexOf("MSIE")&&setTimeout(function(){d.resize()},100),!0},load:function(a,b,c,d){var e=this;return"css"==a?($.get(b,function(b,c,f){e.content(a,f.responseText),d&&d()}),!0):null!==this.get(a)?($.get(b,function(b,f,g){e.content(a,g.responseText,c),d&&d(),e.resize(),-1!=window.navigator.userAgent.indexOf("MSIE")&&setTimeout(function(){e.resize()},100)}),!0):!1},sizeTo:function(a,b){var c=this,d=c.get(a);return null===d?!1:($(c.box).find(" > div > .w2ui-panel").css({"-webkit-transition":".2s","-moz-transition":".2s","-ms-transition":".2s","-o-transition":".2s"}),setTimeout(function(){c.set(a,{size:b})},1),setTimeout(function(){$(c.box).find(" > div > .w2ui-panel").css({"-webkit-transition":"0s","-moz-transition":"0s","-ms-transition":"0s","-o-transition":"0s"}),c.resize()},500),!0)},show:function(a,b){var c=this,d=this.trigger({phase:"before",type:"show",target:a,object:this.get(a),immediate:b});if(d.isCancelled!==!0){var e=c.get(a);return null===e?!1:(e.hidden=!1,b===!0?($("#layout_"+c.name+"_panel_"+a).css({opacity:"1"}),e.resizable&&$("#layout_"+c.name+"_resizer_"+a).show(),c.trigger($.extend(d,{phase:"after"})),c.resize()):(e.resizable&&$("#layout_"+c.name+"_resizer_"+a).show(),$("#layout_"+c.name+"_panel_"+a).css({opacity:"0"}),$(c.box).find(" > div > .w2ui-panel").css({"-webkit-transition":".2s","-moz-transition":".2s","-ms-transition":".2s","-o-transition":".2s"}),setTimeout(function(){c.resize()},1),setTimeout(function(){$("#layout_"+c.name+"_panel_"+a).css({opacity:"1"})},250),setTimeout(function(){$(c.box).find(" > div > .w2ui-panel").css({"-webkit-transition":"0s","-moz-transition":"0s","-ms-transition":"0s","-o-transition":"0s"}),c.trigger($.extend(d,{phase:"after"})),c.resize()},500)),!0)}},hide:function(a,b){var c=this,d=this.trigger({phase:"before",type:"hide",target:a,object:this.get(a),immediate:b});if(d.isCancelled!==!0){var e=c.get(a);return null===e?!1:(e.hidden=!0,b===!0?($("#layout_"+c.name+"_panel_"+a).css({opacity:"0"}),$("#layout_"+c.name+"_resizer_"+a).hide(),c.trigger($.extend(d,{phase:"after"})),c.resize()):($("#layout_"+c.name+"_resizer_"+a).hide(),$(c.box).find(" > div > .w2ui-panel").css({"-webkit-transition":".2s","-moz-transition":".2s","-ms-transition":".2s","-o-transition":".2s"}),$("#layout_"+c.name+"_panel_"+a).css({opacity:"0"}),setTimeout(function(){c.resize()},1),setTimeout(function(){$(c.box).find(" > div > .w2ui-panel").css({"-webkit-transition":"0s","-moz-transition":"0s","-ms-transition":"0s","-o-transition":"0s"}),c.trigger($.extend(d,{phase:"after"})),c.resize()},500)),!0)}},toggle:function(a,b){var c=this.get(a);return null===c?!1:c.hidden?this.show(a,b):this.hide(a,b)},set:function(a,b){var c=this.get(a,!0);return null===c?!1:($.extend(this.panels[c],b),"undefined"!=typeof b.content&&this.refresh(a),this.resize(),!0)},get:function(a,b){for(var c in this.panels)if(this.panels[c].type==a)return b===!0?c:this.panels[c];return null},el:function(a){var b=$("#layout_"+this.name+"_panel_"+a+"> .w2ui-panel-content");return 1!=b.length?null:b[0]},hideToolbar:function(a){var b=this.get(a);b&&(b.show.toolbar=!1,$("#layout_"+this.name+"_panel_"+a+"> .w2ui-panel-toolbar").hide(),this.resize())},showToolbar:function(a){var b=this.get(a);b&&(b.show.toolbar=!0,$("#layout_"+this.name+"_panel_"+a+"> .w2ui-panel-toolbar").show(),this.resize())},toggleToolbar:function(a){var b=this.get(a);b&&(b.show.toolbar?this.hideToolbar(a):this.showToolbar(a))},hideTabs:function(a){var b=this.get(a);b&&(b.show.tabs=!1,$("#layout_"+this.name+"_panel_"+a+"> .w2ui-panel-tabs").hide(),this.resize())},showTabs:function(a){var b=this.get(a);b&&(b.show.tabs=!0,$("#layout_"+this.name+"_panel_"+a+"> .w2ui-panel-tabs").show(),this.resize())},toggleTabs:function(a){var b=this.get(a);b&&(b.show.tabs?this.hideTabs(a):this.showTabs(a))},render:function(a){function c(){g.tmp.events={resize:function(){w2ui[g.name].resize()},resizeStart:d,mouseMove:f,mouseUp:e},$(window).on("resize",g.tmp.events.resize)}function d(a,c){if(g.box){c||(c=window.event),window.addEventListener||window.document.attachEvent("onselectstart",function(){return!1}),$(document).off("mousemove",g.tmp.events.mouseMove).on("mousemove",g.tmp.events.mouseMove),$(document).off("mouseup",g.tmp.events.mouseUp).on("mouseup",g.tmp.events.mouseUp),g.tmp.resize={type:a,x:c.screenX,y:c.screenY,diff_x:0,diff_y:0,value:0};for(var d in b)d=b[d],g.lock(d,{opacity:0});("left"==a||"right"==a)&&(g.tmp.resize.value=parseInt($("#layout_"+g.name+"_resizer_"+a)[0].style.left)),("top"==a||"preview"==a||"bottom"==a)&&(g.tmp.resize.value=parseInt($("#layout_"+g.name+"_resizer_"+a)[0].style.top))}}function e(a){if(g.box&&(a||(a=window.event),window.addEventListener||window.document.attachEvent("onselectstart",function(){return!1}),$(document).off("mousemove",g.tmp.events.mouseMove),$(document).off("mouseup",g.tmp.events.mouseUp),"undefined"!=typeof g.tmp.resize)){for(var c in b)g.unlock(b[c]);if(0!==g.tmp.diff_x||0!==g.tmp.resize.diff_y){var d,e,f=g.get("top"),h=g.get("bottom"),i=g.get(g.tmp.resize.type),j=parseInt($(g.box).height()),k=parseInt($(g.box).width()),l=String(i.size);switch(g.tmp.resize.type){case"top":d=parseInt(i.sizeCalculated)+g.tmp.resize.diff_y,e=0;break;case"bottom":d=parseInt(i.sizeCalculated)-g.tmp.resize.diff_y,e=0;break;case"preview":d=parseInt(i.sizeCalculated)-g.tmp.resize.diff_y,e=(f&&!f.hidden?f.sizeCalculated:0)+(h&&!h.hidden?h.sizeCalculated:0);break;case"left":d=parseInt(i.sizeCalculated)+g.tmp.resize.diff_x,e=0;break;case"right":d=parseInt(i.sizeCalculated)-g.tmp.resize.diff_x,e=0}i.size="%"==l.substr(l.length-1)?Math.floor(100*d/("left"==i.type||"right"==i.type?k:j-e)*100)/100+"%":d,g.resize()}$("#layout_"+g.name+"_resizer_"+g.tmp.resize.type).removeClass("active"),delete g.tmp.resize}}function f(a){if(g.box&&(a||(a=window.event),"undefined"!=typeof g.tmp.resize)){var b=g.get(g.tmp.resize.type),c=g.tmp.resize,d=g.trigger({phase:"before",type:"resizing",target:g.name,object:b,originalEvent:a,panel:c?c.type:"all",diff_x:c?c.diff_x:0,diff_y:c?c.diff_y:0});if(d.isCancelled!==!0){var e=$("#layout_"+g.name+"_resizer_"+c.type),f=a.screenX-c.x,h=a.screenY-c.y,i=g.get("main");switch(e.hasClass("active")||e.addClass("active"),c.type){case"left":b.minSize-f>b.width&&(f=b.minSize-b.width),b.maxSize&&b.width+f>b.maxSize&&(f=b.maxSize-b.width),i.minSize+f>i.width&&(f=i.width-i.minSize);break;case"right":b.minSize+f>b.width&&(f=b.width-b.minSize),b.maxSize&&b.width-f>b.maxSize&&(f=b.width-b.maxSize),i.minSize-f>i.width&&(f=i.minSize-i.width);break;case"top":b.minSize-h>b.height&&(h=b.minSize-b.height),b.maxSize&&b.height+h>b.maxSize&&(h=b.maxSize-b.height),i.minSize+h>i.height&&(h=i.height-i.minSize);break;case"preview":case"bottom":b.minSize+h>b.height&&(h=b.height-b.minSize),b.maxSize&&b.height-h>b.maxSize&&(h=b.height-b.maxSize),i.minSize-h>i.height&&(h=i.minSize-i.height)}switch(c.diff_x=f,c.diff_y=h,c.type){case"top":case"preview":case"bottom":c.diff_x=0,e.length>0&&(e[0].style.top=c.value+c.diff_y+"px");break;case"left":case"right":c.diff_y=0,e.length>0&&(e[0].style.left=c.value+c.diff_x+"px")}g.trigger($.extend(d,{phase:"after"}))}}}var g=this,h=(new Date).getTime(),i=g.trigger({phase:"before",type:"render",target:g.name,box:a});if(i.isCancelled!==!0){if("undefined"!=typeof a&&null!==a&&($(g.box).find("#layout_"+g.name+"_panel_main").length>0&&$(g.box).removeAttr("name").removeClass("w2ui-layout").html(""),g.box=a),!g.box)return!1;$(g.box).attr("name",g.name).addClass("w2ui-layout").html("<div></div>"),$(g.box).length>0&&($(g.box)[0].style.cssText+=g.style);for(var j in b){j=b[j];var k=(g.get(j),'<div id="layout_'+g.name+"_panel_"+j+'" class="w2ui-panel">    <div class="w2ui-panel-title"></div>    <div class="w2ui-panel-tabs"></div>    <div class="w2ui-panel-toolbar"></div>    <div class="w2ui-panel-content"></div></div><div id="layout_'+g.name+"_resizer_"+j+'" class="w2ui-resizer"></div>');$(g.box).find(" > div").append(k)}return $(g.box).find(" > div").append('<div id="layout_'+g.name+'_panel_css" style="position: absolute; top: 10000px;"></div'),g.refresh(),g.trigger($.extend(i,{phase:"after"})),setTimeout(function(){c(),g.resize()
},0),(new Date).getTime()-h}},refresh:function(a){var b=this;"undefined"==typeof a&&(a=null);var c=(new Date).getTime(),d=b.trigger({phase:"before",type:"refresh",target:"undefined"!=typeof a?a:b.name,object:b.get(a)});if(d.isCancelled!==!0){if("string"==typeof a){var e=b.get(a);if(null===e)return;var f="#layout_"+b.name+"_panel_"+e.type,g="#layout_"+b.name+"_resizer_"+e.type;$(f).css({display:e.hidden?"none":"block"}),e.resizable?$(g).show():$(g).hide(),"object"==typeof e.content&&"function"==typeof e.content.render?(e.content.box=$(f+"> .w2ui-panel-content")[0],setTimeout(function(){$(f+"> .w2ui-panel-content").length>0&&($(f+"> .w2ui-panel-content").removeClass().removeAttr("name").off("selectstart").addClass("w2ui-panel-content").css("overflow",e.overflow)[0].style.cssText+=";"+e.style),e.content.render()},1)):$(f+"> .w2ui-panel-content").length>0&&($(f+"> .w2ui-panel-content").removeClass().removeAttr("name").off("selectstart").addClass("w2ui-panel-content").html(e.content).css("overflow",e.overflow)[0].style.cssText+=";"+e.style);var h=$(b.box).find(f+"> .w2ui-panel-tabs");e.show.tabs?0===h.find("[name="+e.tabs.name+"]").length&&null!==e.tabs?h.w2render(e.tabs):e.tabs.refresh():h.html("").removeClass("w2ui-tabs").hide(),h=$(b.box).find(f+"> .w2ui-panel-toolbar"),e.show.toolbar?0===h.find("[name="+e.toolbar.name+"]").length&&null!==e.toolbar?h.w2render(e.toolbar):e.toolbar.refresh():h.html("").removeClass("w2ui-toolbar").hide(),h=$(b.box).find(f+"> .w2ui-panel-title"),e.title?h.html(e.title).show():h.html("").hide()}else{if(0==$("#layout_"+b.name+"_panel_main").length)return void b.render();b.resize();for(var i in this.panels)b.refresh(this.panels[i].type)}return b.trigger($.extend(d,{phase:"after"})),(new Date).getTime()-c}},resize:function(){if(!this.box)return!1;var a=(new Date).getTime(),c=this.tmp.resize,d=this.trigger({phase:"before",type:"resize",target:this.name,panel:c?c.type:"all",diff_x:c?c.diff_x:0,diff_y:c?c.diff_y:0});if(d.isCancelled!==!0){this.padding<0&&(this.padding=0);var e=parseInt($(this.box).width()),f=parseInt($(this.box).height());$(this.box).find(" > div").css({width:e+"px",height:f+"px"});var g,h,i,j,k,l=this,m=this.get("main"),n=this.get("preview"),o=this.get("left"),p=this.get("right"),q=this.get("top"),r=this.get("bottom"),s=null!==n&&n.hidden!==!0?!0:!1,t=null!==o&&o.hidden!==!0?!0:!1,u=null!==p&&p.hidden!==!0?!0:!1,v=null!==q&&q.hidden!==!0?!0:!1,w=null!==r&&r.hidden!==!0?!0:!1;for(var x in b)if(x=b[x],"main"!==x){var c=this.get(x);if(c){var y=String(c.size||0);if("%"==y.substr(y.length-1)){var z=f;"preview"==c.type&&(z=z-(q&&!q.hidden?q.sizeCalculated:0)-(r&&!r.hidden?r.sizeCalculated:0)),c.sizeCalculated=parseInt(("left"==c.type||"right"==c.type?e:z)*parseFloat(c.size)/100)}else c.sizeCalculated=parseInt(c.size);c.sizeCalculated=Math.max(c.sizeCalculated,parseInt(c.minSize))}}null!==q&&q.hidden!==!0?(g=0,h=0,i=e,j=q.sizeCalculated,$("#layout_"+this.name+"_panel_top").css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px"}).show(),q.width=i,q.height=j,q.resizable&&(h=q.sizeCalculated-(0===this.padding?this.resizer:0),j=this.resizer>this.padding?this.resizer:this.padding,$("#layout_"+this.name+"_resizer_top").show().css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px",cursor:"ns-resize"}).off("mousedown").on("mousedown",function(a){var b=l.trigger({phase:"before",type:"resizerClick",target:"top",originalEvent:a});if(b.isCancelled!==!0)return w2ui[l.name].tmp.events.resizeStart("top",a),l.trigger($.extend(b,{phase:"after"})),!1}))):$("#layout_"+this.name+"_panel_top").hide(),null!==o&&o.hidden!==!0?(g=0,h=0+(v?q.sizeCalculated+this.padding:0),i=o.sizeCalculated,j=f-(v?q.sizeCalculated+this.padding:0)-(w?r.sizeCalculated+this.padding:0),k=$("#layout_"+this.name+"_panel_left"),-1!=window.navigator.userAgent.indexOf("MSIE")&&k.length>0&&k[0].clientHeight<k[0].scrollHeight&&(i+=17),k.css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px"}).show(),o.width=i,o.height=j,o.resizable&&(g=o.sizeCalculated-(0===this.padding?this.resizer:0),i=this.resizer>this.padding?this.resizer:this.padding,$("#layout_"+this.name+"_resizer_left").show().css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px",cursor:"ew-resize"}).off("mousedown").on("mousedown",function(a){var b=l.trigger({phase:"before",type:"resizerClick",target:"left",originalEvent:a});if(b.isCancelled!==!0)return w2ui[l.name].tmp.events.resizeStart("left",a),l.trigger($.extend(b,{phase:"after"})),!1}))):($("#layout_"+this.name+"_panel_left").hide(),$("#layout_"+this.name+"_resizer_left").hide()),null!==p&&p.hidden!==!0?(g=e-p.sizeCalculated,h=0+(v?q.sizeCalculated+this.padding:0),i=p.sizeCalculated,j=f-(v?q.sizeCalculated+this.padding:0)-(w?r.sizeCalculated+this.padding:0),$("#layout_"+this.name+"_panel_right").css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px"}).show(),p.width=i,p.height=j,p.resizable&&(g-=this.padding,i=this.resizer>this.padding?this.resizer:this.padding,$("#layout_"+this.name+"_resizer_right").show().css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px",cursor:"ew-resize"}).off("mousedown").on("mousedown",function(a){var b=l.trigger({phase:"before",type:"resizerClick",target:"right",originalEvent:a});if(b.isCancelled!==!0)return w2ui[l.name].tmp.events.resizeStart("right",a),l.trigger($.extend(b,{phase:"after"})),!1}))):$("#layout_"+this.name+"_panel_right").hide(),null!==r&&r.hidden!==!0?(g=0,h=f-r.sizeCalculated,i=e,j=r.sizeCalculated,$("#layout_"+this.name+"_panel_bottom").css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px"}).show(),r.width=i,r.height=j,r.resizable&&(h-=0===this.padding?0:this.padding,j=this.resizer>this.padding?this.resizer:this.padding,$("#layout_"+this.name+"_resizer_bottom").show().css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px",cursor:"ns-resize"}).off("mousedown").on("mousedown",function(a){var b=l.trigger({phase:"before",type:"resizerClick",target:"bottom",originalEvent:a});if(b.isCancelled!==!0)return w2ui[l.name].tmp.events.resizeStart("bottom",a),l.trigger($.extend(b,{phase:"after"})),!1}))):$("#layout_"+this.name+"_panel_bottom").hide(),g=0+(t?o.sizeCalculated+this.padding:0),h=0+(v?q.sizeCalculated+this.padding:0),i=e-(t?o.sizeCalculated+this.padding:0)-(u?p.sizeCalculated+this.padding:0),j=f-(v?q.sizeCalculated+this.padding:0)-(w?r.sizeCalculated+this.padding:0)-(s?n.sizeCalculated+this.padding:0),k=$("#layout_"+this.name+"_panel_main"),-1!=window.navigator.userAgent.indexOf("MSIE")&&k.length>0&&k[0].clientHeight<k[0].scrollHeight&&(i+=17),k.css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px"}),m.width=i,m.height=j,null!==n&&n.hidden!==!0?(g=0+(t?o.sizeCalculated+this.padding:0),h=f-(w?r.sizeCalculated+this.padding:0)-n.sizeCalculated,i=e-(t?o.sizeCalculated+this.padding:0)-(u?p.sizeCalculated+this.padding:0),j=n.sizeCalculated,k=$("#layout_"+this.name+"_panel_preview"),-1!=window.navigator.userAgent.indexOf("MSIE")&&k.length>0&&k[0].clientHeight<k[0].scrollHeight&&(i+=17),k.css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px"}).show(),n.width=i,n.height=j,n.resizable&&(h-=0===this.padding?0:this.padding,j=this.resizer>this.padding?this.resizer:this.padding,$("#layout_"+this.name+"_resizer_preview").show().css({display:"block",left:g+"px",top:h+"px",width:i+"px",height:j+"px",cursor:"ns-resize"}).off("mousedown").on("mousedown",function(a){var b=l.trigger({phase:"before",type:"resizerClick",target:"preview",originalEvent:a});if(b.isCancelled!==!0)return w2ui[l.name].tmp.events.resizeStart("preview",a),l.trigger($.extend(b,{phase:"after"})),!1}))):$("#layout_"+this.name+"_panel_preview").hide();for(var A in b){A=b[A];var B=this.get(A),C="#layout_"+this.name+"_panel_"+A+" > .w2ui-panel-",D=0;B&&(B.title&&(D+=w2utils.getSize($(C+"title").css({top:D+"px",display:"block"}),"height")),B.show.tabs&&(null!==B.tabs&&w2ui[this.name+"_"+A+"_tabs"]&&w2ui[this.name+"_"+A+"_tabs"].resize(),D+=w2utils.getSize($(C+"tabs").css({top:D+"px",display:"block"}),"height")),B.show.toolbar&&(null!==B.toolbar&&w2ui[this.name+"_"+A+"_toolbar"]&&w2ui[this.name+"_"+A+"_toolbar"].resize(),D+=w2utils.getSize($(C+"toolbar").css({top:D+"px",display:"block"}),"height"))),$(C+"content").css({display:"block"}).css({top:D+"px"})}return clearTimeout(this._resize_timer),this._resize_timer=setTimeout(function(){for(var a in w2ui)if("function"==typeof w2ui[a].resize){"undefined"==w2ui[a].panels&&w2ui[a].resize();var b=$(w2ui[a].box).parents(".w2ui-layout");b.length>0&&b.attr("name")==l.name&&w2ui[a].resize()}},100),this.trigger($.extend(d,{phase:"after"})),(new Date).getTime()-a}},destroy:function(){var a=this.trigger({phase:"before",type:"destroy",target:this.name});if(a.isCancelled!==!0)return"undefined"==typeof w2ui[this.name]?!1:($(this.box).find("#layout_"+this.name+"_panel_main").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-layout").html(""),delete w2ui[this.name],this.trigger($.extend(a,{phase:"after"})),this.tmp.events&&this.tmp.events.resize&&$(window).off("resize",this.tmp.events.resize),!0)},lock:function(a){if(-1==b.indexOf(a))return void console.log("ERROR: First parameter needs to be the a valid panel name.");var c=Array.prototype.slice.call(arguments,0);c[0]="#layout_"+this.name+"_panel_"+a,w2utils.lock.apply(window,c)},unlock:function(a){if(-1==b.indexOf(a))return void console.log("ERROR: First parameter needs to be the a valid panel name.");var c="#layout_"+this.name+"_panel_"+a;w2utils.unlock(c)}},$.extend(a.prototype,w2utils.event),w2obj.layout=a}();var w2popup={};!function(){$.fn.w2popup=function(a,b){"undefined"==typeof a&&(b={},a="open"),$.isPlainObject(a)&&(b=a,a="open"),a=a.toLowerCase(),"load"===a&&"string"==typeof b&&(b=$.extend({url:b},arguments.length>2?arguments[2]:{})),"open"===a&&null!=b.url&&(a="load"),b=b||{};var c={};return $(this).length>0&&($(this).find("div[rel=title], div[rel=body], div[rel=buttons]").length>0?($(this).find("div[rel=title]").length>0&&(c.title=$(this).find("div[rel=title]").html()),$(this).find("div[rel=body]").length>0&&(c.body=$(this).find("div[rel=body]").html(),c.style=$(this).find("div[rel=body]")[0].style.cssText),$(this).find("div[rel=buttons]").length>0&&(c.buttons=$(this).find("div[rel=buttons]").html())):(c.title="&nbsp;",c.body=$(this).html()),0!=parseInt($(this).css("width"))&&(c.width=parseInt($(this).css("width"))),0!=parseInt($(this).css("height"))&&(c.height=parseInt($(this).css("height")))),w2popup[a]($.extend({},c,b))},w2popup={defaults:{title:"",body:"",buttons:"",style:"",color:"#000",opacity:.4,speed:.3,modal:!1,maximized:!1,keyboard:!0,width:500,height:300,showClose:!0,showMax:!1,transition:null},status:"closed",handlers:[],onOpen:null,onClose:null,onMax:null,onMin:null,onToggle:null,onKeydown:null,open:function(a){function b(a){return a||(a=window.event),window.addEventListener||window.document.attachEvent("onselectstart",function(){return!1}),w2popup.status="moving",q.resizing=!0,q.x=a.screenX,q.y=a.screenY,q.pos_x=$("#w2ui-popup").position().left,q.pos_y=$("#w2ui-popup").position().top,w2popup.lock({opacity:0}),$(document).on("mousemove",q.mvMove),$(document).on("mouseup",q.mvStop),a.stopPropagation?a.stopPropagation():a.cancelBubble=!0,a.preventDefault?void a.preventDefault():!1}function c(a){1==q.resizing&&(a||(a=window.event),q.div_x=a.screenX-q.x,q.div_y=a.screenY-q.y,$("#w2ui-popup").css({"-webkit-transition":"none","-webkit-transform":"translate3d("+q.div_x+"px, "+q.div_y+"px, 0px)","-moz-transition":"none","-moz-transform":"translate("+q.div_x+"px, "+q.div_y+"px)","-ms-transition":"none","-ms-transform":"translate("+q.div_x+"px, "+q.div_y+"px)","-o-transition":"none","-o-transform":"translate("+q.div_x+"px, "+q.div_y+"px)"}))}function d(a){1==q.resizing&&(a||(a=window.event),w2popup.status="open",q.div_x=a.screenX-q.x,q.div_y=a.screenY-q.y,$("#w2ui-popup").css({left:q.pos_x+q.div_x+"px",top:q.pos_y+q.div_y+"px","-webkit-transition":"none","-webkit-transform":"translate3d(0px, 0px, 0px)","-moz-transition":"none","-moz-transform":"translate(0px, 0px)","-ms-transition":"none","-ms-transform":"translate(0px, 0px)","-o-transition":"none","-o-transform":"translate(0px, 0px)"}),q.resizing=!1,$(document).off("mousemove",q.mvMove),$(document).off("mouseup",q.mvStop),w2popup.unlock())}var e=this;if("closing"==w2popup.status)return void setTimeout(function(){e.open.call(e,a)},100);var f=$("#w2ui-popup").data("options"),a=$.extend({},this.defaults,f,{title:"",body:"",buttons:""},a,{maximized:!1});if(setTimeout(function(){$("#w2ui-popup").data("options",a)},100),0==$("#w2ui-popup").length&&(w2popup.handlers=[],w2popup.onMax=null,w2popup.onMin=null,w2popup.onToggle=null,w2popup.onOpen=null,w2popup.onClose=null,w2popup.onKeydown=null),a.onOpen&&(w2popup.onOpen=a.onOpen),a.onClose&&(w2popup.onClose=a.onClose),a.onMax&&(w2popup.onMax=a.onMax),a.onMin&&(w2popup.onMin=a.onMin),a.onToggle&&(w2popup.onToggle=a.onToggle),a.onKeydown&&(w2popup.onKeydown=a.onKeydown),void 0==window.innerHeight){var g=document.documentElement.offsetWidth,h=document.documentElement.offsetHeight;"IE7"===w2utils.engine&&(g+=21,h+=4)}else var g=window.innerWidth,h=window.innerHeight;parseInt(g)-10<parseInt(a.width)&&(a.width=parseInt(g)-10),parseInt(h)-10<parseInt(a.height)&&(a.height=parseInt(h)-10);var i=parseInt((parseInt(h)-parseInt(a.height))/2*.6),j=parseInt((parseInt(g)-parseInt(a.width))/2);if(0==$("#w2ui-popup").length){var k=this.trigger({phase:"before",type:"open",target:"popup",options:a,present:!1});if(k.isCancelled===!0)return;w2popup.status="opening",w2popup.lockScreen(a);var l="";a.showClose&&(l+='<div class="w2ui-msg-button w2ui-msg-close" onmousedown="event.stopPropagation()" onclick="w2popup.close()">Close</div>'),a.showMax&&(l+='<div class="w2ui-msg-button w2ui-msg-max" onmousedown="event.stopPropagation()" onclick="w2popup.toggle()">Max</div>');var m='<div id="w2ui-popup" class="w2ui-popup" style="opacity: 0; left: '+j+"px; top: "+i+"px;     width: "+parseInt(a.width)+"px; height: "+parseInt(a.height)+'px;     -webkit-transform: scale(0.8); -moz-transform: scale(0.8); -ms-transform: scale(0.8); -o-transform: scale(0.8); ">   <div class="w2ui-msg-title" style="'+(""==a.title?"display: none":"")+'">'+l+a.title+'</div>   <div class="w2ui-box1" style="'+(""==a.title?"top: 0px !important;":"")+(""==a.buttons?"bottom: 0px !important;":"")+'">       <div class="w2ui-msg-body'+(""!=!a.title?" w2ui-msg-no-title":"")+(""!=!a.buttons?" w2ui-msg-no-buttons":"")+'" style="'+a.style+'">'+a.body+'</div>   </div>   <div class="w2ui-box2" style="'+(""==a.title?"top: 0px !important;":"")+(""==a.buttons?"bottom: 0px !important;":"")+'">       <div class="w2ui-msg-body'+(""!=!a.title?" w2ui-msg-no-title":"")+(""!=!a.buttons?" w2ui-msg-no-buttons":"")+'" style="'+a.style+'"></div>       </div>   <div class="w2ui-msg-buttons" style="'+(""==a.buttons?"display: none":"")+'">'+a.buttons+"</div></div>";$("body").append(m),setTimeout(function(){$("#w2ui-popup .w2ui-box2").hide(),$("#w2ui-popup").css({"-webkit-transition":a.speed+"s opacity, "+a.speed+"s -webkit-transform","-webkit-transform":"scale(1)","-moz-transition":a.speed+"s opacity, "+a.speed+"s -moz-transform","-moz-transform":"scale(1)","-ms-transition":a.speed+"s opacity, "+a.speed+"s -ms-transform","-ms-transform":"scale(1)","-o-transition":a.speed+"s opacity, "+a.speed+"s -o-transform","-o-transform":"scale(1)",opacity:"1"})},1),setTimeout(function(){$("#w2ui-popup").css({"-webkit-transform":"","-moz-transform":"","-ms-transform":"","-o-transform":""}),w2popup.status="open",setTimeout(function(){e.trigger($.extend(k,{phase:"after"}))},100)},1e3*a.speed)}else{var k=this.trigger({phase:"before",type:"open",target:"popup",options:a,present:!0});if(k.isCancelled===!0)return;w2popup.status="opening",("undefined"==typeof f||f.width!=a.width||f.height!=a.height)&&w2popup.resize(a.width,a.height),"undefined"!=typeof f&&(a.prevSize=a.width+":"+a.height,a.maximized=f.maximized);var n=$("#w2ui-popup .w2ui-box2 > .w2ui-msg-body").html(a.body);n.length>0&&(n[0].style.cssText=a.style),""!=a.buttons?($("#w2ui-popup .w2ui-msg-buttons").show().html(a.buttons),$("#w2ui-popup .w2ui-msg-body").removeClass("w2ui-msg-no-buttons"),$("#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2").css("bottom","")):($("#w2ui-popup .w2ui-msg-buttons").hide().html(""),$("#w2ui-popup .w2ui-msg-body").addClass("w2ui-msg-no-buttons"),$("#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2").css("bottom","0px")),""!=a.title?($("#w2ui-popup .w2ui-msg-title").show().html((a.showClose?'<div class="w2ui-msg-button w2ui-msg-close" onmousedown="event.stopPropagation()" onclick="w2popup.close()">Close</div>':"")+(a.showMax?'<div class="w2ui-msg-button w2ui-msg-max" onmousedown="event.stopPropagation()" onclick="w2popup.toggle()">Max</div>':"")+a.title),$("#w2ui-popup .w2ui-msg-body").removeClass("w2ui-msg-no-title"),$("#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2").css("top","")):($("#w2ui-popup .w2ui-msg-title").hide().html(""),$("#w2ui-popup .w2ui-msg-body").addClass("w2ui-msg-no-title"),$("#w2ui-popup .w2ui-box1, #w2ui-popup .w2ui-box2").css("top","0px"));var o=$("#w2ui-popup .w2ui-box1")[0],p=$("#w2ui-popup .w2ui-box2")[0];w2utils.transition(o,p,a.transition),p.className="w2ui-box1",o.className="w2ui-box2",$(p).addClass("w2ui-current-box"),$("#w2ui-popup").data("prev-size",null),setTimeout(function(){w2popup.status="open",e.trigger($.extend(k,{phase:"after"}))},100)}a._last_w2ui_name=w2utils.keyboard.active(),w2utils.keyboard.active(null),a.keyboard&&$(document).on("keydown",this.keydown);var q={resizing:!1,mvMove:c,mvStop:d};return $("#w2ui-popup .w2ui-msg-title").on("mousedown",function(a){b(a)}),this},keydown:function(a){var b=$("#w2ui-popup").data("options");if(b&&b.keyboard){var c=w2popup.trigger({phase:"before",type:"keydown",target:"popup",options:b,originalEvent:a});if(c.isCancelled!==!0){switch(a.keyCode){case 27:a.preventDefault(),$("#w2ui-popup .w2ui-popup-message").length>0?w2popup.message():w2popup.close()}w2popup.trigger($.extend(c,{phase:"after"}))}}},close:function(a){var b=this,a=$.extend({},$("#w2ui-popup").data("options"),a);if(0!=$("#w2ui-popup").length){var c=this.trigger({phase:"before",type:"close",target:"popup",options:a});c.isCancelled!==!0&&(w2popup.status="closing",$("#w2ui-popup").css({"-webkit-transition":a.speed+"s opacity, "+a.speed+"s -webkit-transform","-webkit-transform":"scale(0.9)","-moz-transition":a.speed+"s opacity, "+a.speed+"s -moz-transform","-moz-transform":"scale(0.9)","-ms-transition":a.speed+"s opacity, "+a.speed+"s -ms-transform","-ms-transform":"scale(0.9)","-o-transition":a.speed+"s opacity, "+a.speed+"s -o-transform","-o-transform":"scale(0.9)",opacity:"0"}),w2popup.unlockScreen(a),setTimeout(function(){$("#w2ui-popup").remove(),w2popup.status="closed",b.trigger($.extend(c,{phase:"after"}))},1e3*a.speed),w2utils.keyboard.active(a._last_w2ui_name),a.keyboard&&$(document).off("keydown",this.keydown))}},toggle:function(){var a=this,b=$("#w2ui-popup").data("options"),c=this.trigger({phase:"before",type:"toggle",target:"popup",options:b});c.isCancelled!==!0&&(b.maximized===!0?w2popup.min():w2popup.max(),setTimeout(function(){a.trigger($.extend(c,{phase:"after"}))},1e3*b.speed+50))},max:function(){var a=this,b=$("#w2ui-popup").data("options");if(b.maximized!==!0){var c=this.trigger({phase:"before",type:"max",target:"popup",options:b});c.isCancelled!==!0&&(w2popup.status="resizing",b.prevSize=$("#w2ui-popup").css("width")+":"+$("#w2ui-popup").css("height"),w2popup.resize(1e4,1e4,function(){w2popup.status="open",b.maximized=!0,a.trigger($.extend(c,{phase:"after"}))}))}},min:function(){var a=this,b=$("#w2ui-popup").data("options");if(b.maximized===!0){var c=b.prevSize.split(":"),d=this.trigger({phase:"before",type:"min",target:"popup",options:b});d.isCancelled!==!0&&(w2popup.status="resizing",w2popup.resize(c[0],c[1],function(){w2popup.status="open",b.maximized=!1,b.prevSize=null,a.trigger($.extend(d,{phase:"after"}))}))}},get:function(){return $("#w2ui-popup").data("options")},set:function(a){w2popup.open(a)},clear:function(){$("#w2ui-popup .w2ui-msg-title").html(""),$("#w2ui-popup .w2ui-msg-body").html(""),$("#w2ui-popup .w2ui-msg-buttons").html("")},reset:function(){w2popup.open(w2popup.defaults)},load:function(a){function b(b,c){if(delete a.url,$("body").append('<div id="w2ui-tmp" style="display: none">'+b+"</div>"),"undefined"!=typeof c&&$("#w2ui-tmp #"+c).length>0?$("#w2ui-tmp #"+c).w2popup(a):$("#w2ui-tmp > div").w2popup(a),$("#w2ui-tmp > style").length>0){var d=$("<div>").append($("#w2ui-tmp > style").clone()).html();0==$("#w2ui-popup #div-style").length&&$("#w2ui-popup").append('<div id="div-style" style="position: absolute; left: -100; width: 1px"></div>'),$("#w2ui-popup #div-style").html(d)}$("#w2ui-tmp").remove()}if(w2popup.status="loading","undefined"==String(a.url))return void console.log("ERROR: The url parameter is empty.");var c=String(a.url).split("#"),d=c[0],e=c[1];"undefined"==String(a)&&(a={});var f=$("#w2ui-popup").data(d);"undefined"!=typeof f&&null!=f?b(f,e):$.get(d,function(a,c,f){b(f.responseText,e),$("#w2ui-popup").data(d,f.responseText)})},message:function(a){$().w2tag(),a||(a={width:200,height:100}),parseInt(a.width)<10&&(a.width=10),parseInt(a.height)<10&&(a.height=10),"undefined"==typeof a.hideOnClick&&(a.hideOnClick=!1);var b=$("#w2ui-popup").data("options")||{};("undefined"==typeof a.width||a.width>b.width-10)&&(a.width=b.width-10),("undefined"==typeof a.height||a.height>b.height-40)&&(a.height=b.height-40);var c=$("#w2ui-popup .w2ui-msg-title"),d=parseInt($("#w2ui-popup").width()),e=$("#w2ui-popup .w2ui-popup-message").length;if(""==$.trim(a.html)){$("#w2ui-popup #w2ui-message"+(e-1)).css("z-Index",250);var a=$("#w2ui-popup #w2ui-message"+(e-1)).data("options")||{};$("#w2ui-popup #w2ui-message"+(e-1)).remove(),"function"==typeof a.onClose&&a.onClose(),1==e?w2popup.unlock():$("#w2ui-popup #w2ui-message"+(e-2)).show()}else{$("#w2ui-popup .w2ui-popup-message").hide(),$("#w2ui-popup .w2ui-box1").before('<div id="w2ui-message'+e+'" class="w2ui-popup-message" style="display: none; '+(0==c.length?"top: 0px;":"top: "+w2utils.getSize(c,"height")+"px;")+("undefined"!=typeof a.width?"width: "+a.width+"px; left: "+(d-a.width)/2+"px;":"left: 10px; right: 10px;")+("undefined"!=typeof a.height?"height: "+a.height+"px;":"bottom: 6px;")+'-webkit-transition: .3s; -moz-transition: .3s; -ms-transition: .3s; -o-transition: .3s;"'+(a.hideOnClick===!0?'onclick="w2popup.message();"':"")+"></div>"),$("#w2ui-popup #w2ui-message"+e).data("options",a);var f=$("#w2ui-popup #w2ui-message"+e).css("display");$("#w2ui-popup #w2ui-message"+e).css({"-webkit-transform":"none"==f?"translateY(-"+a.height+"px)":"translateY(0px)","-moz-transform":"none"==f?"translateY(-"+a.height+"px)":"translateY(0px)","-ms-transform":"none"==f?"translateY(-"+a.height+"px)":"translateY(0px)","-o-transform":"none"==f?"translateY(-"+a.height+"px)":"translateY(0px)"}),"none"==f&&($("#w2ui-popup #w2ui-message"+e).show().html(a.html),setTimeout(function(){$("#w2ui-popup #w2ui-message"+e).css({"-webkit-transform":"none"==f?"translateY(0px)":"translateY(-"+a.height+"px)","-moz-transform":"none"==f?"translateY(0px)":"translateY(-"+a.height+"px)","-ms-transform":"none"==f?"translateY(0px)":"translateY(-"+a.height+"px)","-o-transform":"none"==f?"translateY(0px)":"translateY(-"+a.height+"px)"})},1),setTimeout(function(){$("#w2ui-popup #w2ui-message"+e).css({"-webkit-transition":"0s","-moz-transition":"0s","-ms-transition":"0s","-o-transition":"0s","z-Index":1500}),0==e&&w2popup.lock(),"function"==typeof a.onOpen&&a.onOpen()},300))}},lock:function(){var a=Array.prototype.slice.call(arguments,0);a.unshift($("#w2ui-popup")),w2utils.lock.apply(window,a)},unlock:function(){w2utils.unlock($("#w2ui-popup"))},lockScreen:function(a){return $("#w2ui-lock").length>0?!1:("undefined"==typeof a&&(a=$("#w2ui-popup").data("options")),"undefined"==typeof a&&(a={}),a=$.extend({},w2popup.defaults,a),$("body").append('<div id="w2ui-lock"     onmousewheel="if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true; if (event.preventDefault) event.preventDefault(); else return false;"    style="position: '+("IE5"==w2utils.engine?"absolute":"fixed")+"; z-Index: 1199; left: 0px; top: 0px;            padding: 0px; margin: 0px; background-color: "+a.color+'; width: 100%; height: 100%; opacity: 0;"></div>'),setTimeout(function(){$("#w2ui-lock").css({"-webkit-transition":a.speed+"s opacity","-moz-transition":a.speed+"s opacity","-ms-transition":a.speed+"s opacity","-o-transition":a.speed+"s opacity",opacity:a.opacity})},1),1==a.modal?($("#w2ui-lock").on("mousedown",function(){$("#w2ui-lock").css({"-webkit-transition":".1s","-moz-transition":".1s","-ms-transition":".1s","-o-transition":".1s",opacity:"0.6"})}),$("#w2ui-lock").on("mouseup",function(){setTimeout(function(){$("#w2ui-lock").css({"-webkit-transition":".1s","-moz-transition":".1s","-ms-transition":".1s","-o-transition":".1s",opacity:a.opacity})},100)})):$("#w2ui-lock").on("mouseup",function(){w2popup.close()}),!0)},unlockScreen:function(a){return 0==$("#w2ui-lock").length?!1:("undefined"==typeof a&&(a=$("#w2ui-popup").data("options")),"undefined"==typeof a&&(a={}),a=$.extend({},w2popup.defaults,a),$("#w2ui-lock").css({"-webkit-transition":a.speed+"s opacity","-moz-transition":a.speed+"s opacity","-ms-transition":a.speed+"s opacity","-o-transition":a.speed+"s opacity",opacity:0}),setTimeout(function(){$("#w2ui-lock").remove()},1e3*a.speed),!0)},resize:function(a,b,c){var d=$("#w2ui-popup").data("options");parseInt($(window).width())-10<parseInt(a)&&(a=parseInt($(window).width())-10),parseInt($(window).height())-10<parseInt(b)&&(b=parseInt($(window).height())-10);var e=(parseInt($(window).height())-parseInt(b))/2*.8,f=(parseInt($(window).width())-parseInt(a))/2;$("#w2ui-popup").css({"-webkit-transition":d.speed+"s width, "+d.speed+"s height, "+d.speed+"s left, "+d.speed+"s top","-moz-transition":d.speed+"s width, "+d.speed+"s height, "+d.speed+"s left, "+d.speed+"s top","-ms-transition":d.speed+"s width, "+d.speed+"s height, "+d.speed+"s left, "+d.speed+"s top","-o-transition":d.speed+"s width, "+d.speed+"s height, "+d.speed+"s left, "+d.speed+"s top",top:e,left:f,width:a,height:b}),setTimeout(function(){d.width=a,d.height=b,"function"==typeof c&&c()},1e3*d.speed+50)}},$.extend(w2popup,w2utils.event)}();var w2alert=function(a,b,c){null==b&&(b=w2utils.lang("Notification")),$("#w2ui-popup").length>0&&"closing"!=w2popup.status?w2popup.message({width:400,height:170,html:'<div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 45px; overflow: auto">        <div class="w2ui-centered" style="font-size: 13px;">'+a+'</div></div><div style="position: absolute; bottom: 7px; left: 0px; right: 0px; text-align: center; padding: 5px">        <button onclick="w2popup.message();" class="w2ui-popup-btn btn">'+w2utils.lang("Ok")+"</button></div>",onClose:function(){"function"==typeof c&&c()}}):w2popup.open({width:450,height:220,showMax:!1,showClose:!1,title:b,body:'<div class="w2ui-centered" style="font-size: 13px;">'+a+"</div>",buttons:'<button onclick="w2popup.close();" class="w2ui-popup-btn btn">'+w2utils.lang("Ok")+"</button>",onClose:function(){"function"==typeof c&&c()}})},w2confirm=function(a,b,c){var d={},e={msg:"",title:w2utils.lang("Confirmation"),width:$("#w2ui-popup").length>0?400:450,height:$("#w2ui-popup").length>0?170:220,yes_text:"Yes",yes_class:"",yes_style:"",yes_callBack:null,no_text:"No",no_class:"",no_style:"",no_callBack:null,callBack:null};return 1==arguments.length&&"object"==typeof a?$.extend(d,e,a):"function"==typeof b?$.extend(d,e,{msg:a,callBack:b}):$.extend(d,e,{msg:a,title:b,callBack:c}),$("#w2ui-popup").length>0&&"closing"!=w2popup.status?(d.width>w2popup.get().width&&(d.width=w2popup.get().width),d.height>w2popup.get().height-50&&(d.height=w2popup.get().height-50),w2popup.message({width:d.width,height:d.height,html:'<div style="position: absolute; top: 0px; left: 0px; right: 0px; bottom: 40px; overflow: auto">        <div class="w2ui-centered" style="font-size: 13px;">'+d.msg+'</div></div><div style="position: absolute; bottom: 7px; left: 0px; right: 0px; text-align: center; padding: 5px">        <button id="Yes" class="w2ui-popup-btn btn '+d.yes_class+'" style="'+d.yes_style+'">'+w2utils.lang(d.yes_text)+'</button>        <button id="No" class="w2ui-popup-btn btn '+d.no_class+'" style="'+d.no_style+'">'+w2utils.lang(d.no_text)+"</button></div>",onOpen:function(){$("#w2ui-popup .w2ui-popup-message .btn").on("click",function(a){w2popup.message(),"function"==typeof d.callBack&&d.callBack(a.target.id),"Yes"==a.target.id&&"function"==typeof d.yes_callBack&&d.yes_callBack(),"No"==a.target.id&&"function"==typeof d.no_callBack&&d.no_callBack()})},onKeydown:function(a){switch(a.originalEvent.keyCode){case 13:"function"==typeof d.callBack&&d.callBack("Yes"),"function"==typeof d.yes_callBack&&d.yes_callBack(),w2popup.message();break;case 27:"function"==typeof d.callBack&&d.callBack("No"),"function"==typeof d.no_callBack&&d.no_callBack(),w2popup.message()}}})):(w2utils.isInt(d.height)||(d.height=d.height+50),w2popup.open({width:d.width,height:d.height,title:d.title,modal:!0,showClose:!1,body:'<div class="w2ui-centered" style="font-size: 13px;">'+d.msg+"</div>",buttons:'<button id="Yes" class="w2ui-popup-btn btn '+d.yes_class+'" style="'+d.yes_style+'">'+w2utils.lang(d.yes_text)+'</button><button id="No" class="w2ui-popup-btn btn '+d.no_class+'" style="'+d.no_style+'">'+w2utils.lang(d.no_text)+"</button>",onOpen:function(a){a.onComplete=function(){$("#w2ui-popup .w2ui-popup-btn").on("click",function(a){w2popup.close(),"function"==typeof d.callBack&&d.callBack(a.target.id),"Yes"==a.target.id&&"function"==typeof d.yes_callBack&&d.yes_callBack(),"No"==a.target.id&&"function"==typeof d.no_callBack&&d.no_callBack()})}},onKeydown:function(a){switch(a.originalEvent.keyCode){case 13:"function"==typeof d.callBack&&d.callBack("Yes"),"function"==typeof d.yes_callBack&&d.yes_callBack(),w2popup.close();break;case 27:"function"==typeof d.callBack&&d.callBack("No"),"function"==typeof d.no_callBack&&d.no_callBack(),w2popup.close()}}})),{yes:function(a){return d.yes_callBack=a,this},no:function(a){return d.no_callBack=a,this}}};!function(){var a=function(a){this.box=null,this.name=null,this.active=null,this.tabs=[],this.routeData={},this.right="",this.style="",this.onClick=null,this.onClose=null,this.onRender=null,this.onRefresh=null,this.onResize=null,this.onDestroy=null,$.extend(this,{handlers:[]}),$.extend(!0,this,w2obj.tabs,a)};$.fn.w2tabs=function(b){if("object"!=typeof b&&b){if(w2ui[$(this).attr("name")]){var c=w2ui[$(this).attr("name")];return c[b].apply(c,Array.prototype.slice.call(arguments,1)),this}return void console.log("ERROR: Method "+b+" does not exist on jQuery.w2tabs")}if(w2utils.checkName(b,"w2tabs")){for(var d=b.tabs||[],e=new a(b),f=0;f<d.length;f++)e.tabs[f]=$.extend({},a.prototype.tab,d[f]);return 0!==$(this).length&&e.render($(this)[0]),w2ui[e.name]=e,e}},a.prototype={tab:{id:null,text:"",route:null,hidden:!1,disabled:!1,closable:!1,hint:"",onClick:null,onRefresh:null,onClose:null},add:function(a){return this.insert(null,a)},insert:function(b,c){$.isArray(c)||(c=[c]);for(var d=0;d<c.length;d++){if("undefined"==typeof c[d].id)return void console.log('ERROR: The parameter "id" is required but not supplied. (obj: '+this.name+")");if(!w2utils.checkUniqueId(c[d].id,this.tabs,"tabs",this.name))return;var e=$.extend({},a.prototype.tab,c[d]);if(null===b||"undefined"==typeof b)this.tabs.push(e);else{var f=this.get(b,!0);this.tabs=this.tabs.slice(0,f).concat([e],this.tabs.slice(f))}this.refresh(c[d].id)}},remove:function(){for(var a=0,b=0;b<arguments.length;b++){var c=this.get(arguments[b]);if(!c)return!1;a++,this.tabs.splice(this.get(c.id,!0),1),$(this.box).find("#tabs_"+this.name+"_tab_"+w2utils.escapeId(c.id)).remove()
}return a},select:function(a){return this.active==a||null===this.get(a)?!1:(this.active=a,this.refresh(),!0)},set:function(a,b){var c=this.get(a,!0);return null===c?!1:($.extend(this.tabs[c],b),this.refresh(a),!0)},get:function(a,b){if(0===arguments.length){for(var c=[],d=0;d<this.tabs.length;d++)null!=this.tabs[d].id&&c.push(this.tabs[d].id);return c}for(var e=0;e<this.tabs.length;e++)if(this.tabs[e].id==a)return b===!0?e:this.tabs[e];return null},show:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&e.hidden!==!1&&(b++,e.hidden=!1,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},hide:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&e.hidden!==!0&&(b++,e.hidden=!0,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},enable:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&e.disabled!==!1&&(b++,e.disabled=!1,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},disable:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&e.disabled!==!0&&(b++,e.disabled=!0,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},refresh:function(a){var b=(new Date).getTime(),c=this.trigger({phase:"before",type:"refresh",target:"undefined"!=typeof a?a:this.name,object:this.get(a)});if(c.isCancelled!==!0){if("undefined"==typeof a)for(var d=0;d<this.tabs.length;d++)this.refresh(this.tabs[d].id);else{var e=this.get(a);if(null===e)return!1;"undefined"!=typeof e.caption&&(e.text=e.caption);var f=$(this.box).find("#tabs_"+this.name+"_tab_"+w2utils.escapeId(e.id)),g=(e.closable?'<div class="w2ui-tab-close" onclick="w2ui[\''+this.name+"'].animateClose('"+e.id+"', event);\"></div>":"")+'    <div class="w2ui-tab'+(this.active===e.id?" active":"")+(e.closable?" closable":"")+'"         title="'+("undefined"!=typeof e.hint?e.hint:"")+'"        onclick="w2ui[\''+this.name+"'].click('"+e.id+"', event);\">"+e.text+"</div>";if(0===f.length){var h="";e.hidden&&(h+="display: none;"),e.disabled&&(h+="opacity: 0.2; -moz-opacity: 0.2; -webkit-opacity: 0.2; -o-opacity: 0.2; filter:alpha(opacity=20);");var i='<td id="tabs_'+this.name+"_tab_"+e.id+'" style="'+h+'" valign="middle">'+g+"</td>";this.get(a,!0)!==this.tabs.length-1&&$(this.box).find("#tabs_"+this.name+"_tab_"+w2utils.escapeId(this.tabs[parseInt(this.get(a,!0))+1].id)).length>0?$(this.box).find("#tabs_"+this.name+"_tab_"+w2utils.escapeId(this.tabs[parseInt(this.get(a,!0))+1].id)).before(i):$(this.box).find("#tabs_"+this.name+"_right").before(i)}else f.html(g),e.hidden?f.css("display","none"):f.css("display",""),f.css(e.disabled?{opacity:"0.2","-moz-opacity":"0.2","-webkit-opacity":"0.2","-o-opacity":"0.2",filter:"alpha(opacity=20)"}:{opacity:"1","-moz-opacity":"1","-webkit-opacity":"1","-o-opacity":"1",filter:"alpha(opacity=100)"})}return $("#tabs_"+this.name+"_right").html(this.right),this.trigger($.extend(c,{phase:"after"})),(new Date).getTime()-b}},render:function(a){var b=(new Date).getTime(),c=this.trigger({phase:"before",type:"render",target:this.name,box:a});if(c.isCancelled!==!0){if("undefined"!=typeof a&&null!==a&&($(this.box).find("> table #tabs_"+this.name+"_right").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-tabs").html(""),this.box=a),!this.box)return!1;var d='<table cellspacing="0" cellpadding="1" width="100%">    <tr><td width="100%" id="tabs_'+this.name+'_right" align="right">'+this.right+"</td></tr></table>";return $(this.box).attr("name",this.name).addClass("w2ui-reset w2ui-tabs").html(d),$(this.box).length>0&&($(this.box)[0].style.cssText+=this.style),this.trigger($.extend(c,{phase:"after"})),this.refresh(),(new Date).getTime()-b}},resize:function(){var a=(new Date).getTime(),b=this.trigger({phase:"before",type:"resize",target:this.name});return b.isCancelled!==!0?(this.trigger($.extend(b,{phase:"after"})),(new Date).getTime()-a):void 0},destroy:function(){var a=this.trigger({phase:"before",type:"destroy",target:this.name});a.isCancelled!==!0&&($(this.box).find("> table #tabs_"+this.name+"_right").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-tabs").html(""),delete w2ui[this.name],this.trigger($.extend(a,{phase:"after"})))},click:function(a,b){var c=this.get(a);if(null===c||c.disabled)return!1;var d=this.trigger({phase:"before",type:"click",target:a,tab:c,object:c,originalEvent:b});if(d.isCancelled!==!0){if($(this.box).find("#tabs_"+this.name+"_tab_"+w2utils.escapeId(this.active)+" .w2ui-tab").removeClass("active"),this.active=c.id,c.route){var e=String("/"+c.route).replace(/\/{2,}/g,"/"),f=w2utils.parseRoute(e);if(f.keys.length>0)for(var g=0;g<f.keys.length;g++)null!=this.routeData[f.keys[g].name]&&(e=e.replace(new RegExp(":"+f.keys[g].name,"g"),this.routeData[f.keys[g].name]));setTimeout(function(){window.location.hash=e},1)}this.trigger($.extend(d,{phase:"after"})),this.refresh(a)}},animateClose:function(a,b){var c=this.get(a);if(null===c||c.disabled)return!1;var d=this.trigger({phase:"before",type:"close",target:a,object:this.get(a),originalEvent:b});if(d.isCancelled!==!0){var e=this;$(this.box).find("#tabs_"+this.name+"_tab_"+w2utils.escapeId(c.id)).css({"-webkit-transition":".2s","-moz-transition":"2s","-ms-transition":".2s","-o-transition":".2s",opacity:"0"}),setTimeout(function(){var a=$(e.box).find("#tabs_"+e.name+"_tab_"+w2utils.escapeId(c.id)).width();$(e.box).find("#tabs_"+e.name+"_tab_"+w2utils.escapeId(c.id)).html('<div style="width: '+a+'px; -webkit-transition: .2s; -moz-transition: .2s; -ms-transition: .2s; -o-transition: .2s"></div>'),setTimeout(function(){$(e.box).find("#tabs_"+e.name+"_tab_"+w2utils.escapeId(c.id)).find(":first-child").css({width:"0px"})},50)},200),setTimeout(function(){e.remove(a)},450),this.trigger($.extend(d,{phase:"after"})),this.refresh()}},animateInsert:function(a,b){if(null!==this.get(a)&&$.isPlainObject(b)&&w2utils.checkUniqueId(b.id,this.tabs,"tabs",this.name)){var c=$(this.box).find("#tabs_"+this.name+"_tab_"+w2utils.escapeId(b.id));if(0===c.length){"undefined"!=typeof b.caption&&(b.text=b.caption);var d='<div id="_tmp_tabs" class="w2ui-reset w2ui-tabs" style="position: absolute; top: -1000px;"><table cellspacing="0" cellpadding="1" width="100%"><tr><td id="_tmp_simple_tab" style="" valign="middle">'+(b.closable?'<div class="w2ui-tab-close"></div>':"")+'    <div class="w2ui-tab '+(this.active===b.id?"active":"")+'">'+b.text+"</div></td></tr></table></div>";$("body").append(d);var e='<div style="width: 1px; -webkit-transition: 0.2s; -moz-transition: 0.2s; -ms-transition: 0.2s; -o-transition: 0.2s;">&nbsp;</div>',f="";b.hidden&&(f+="display: none;"),b.disabled&&(f+="opacity: 0.2; -moz-opacity: 0.2; -webkit-opacity: 0.2; -o-opacity: 0.2; filter:alpha(opacity=20);");var g='<td id="tabs_'+this.name+"_tab_"+b.id+'" style="'+f+'" valign="middle">'+e+"</td>";this.get(a,!0)!==this.tabs.length&&$(this.box).find("#tabs_"+this.name+"_tab_"+w2utils.escapeId(this.tabs[parseInt(this.get(a,!0))].id)).length>0?$(this.box).find("#tabs_"+this.name+"_tab_"+w2utils.escapeId(this.tabs[parseInt(this.get(a,!0))].id)).before(g):$(this.box).find("#tabs_"+this.name+"_right").before(g);var h=this;setTimeout(function(){var a=$("#_tmp_simple_tab").width();$("#_tmp_tabs").remove(),$("#tabs_"+h.name+"_tab_"+w2utils.escapeId(b.id)+" > div").css("width",a+"px")},1),setTimeout(function(){h.insert(a,b)},200)}}}},$.extend(a.prototype,w2utils.event),w2obj.tabs=a}(),function(){var a=function(a){this.box=null,this.name=null,this.routeData={},this.items=[],this.right="",this.onClick=null,this.onRender=null,this.onRefresh=null,this.onResize=null,this.onDestroy=null,$.extend(!0,this,w2obj.toolbar,a)};$.fn.w2toolbar=function(b){if("object"==typeof b||!b){if(!w2utils.checkName(b,"w2toolbar"))return;var c=b.items||[],d=new a(b);$.extend(d,{items:[],handlers:[]});for(var e=0;e<c.length;e++)d.items[e]=$.extend({},a.prototype.item,c[e]);return 0!==$(this).length&&d.render($(this)[0]),w2ui[d.name]=d,d}if(w2ui[$(this).attr("name")]){var f=w2ui[$(this).attr("name")];return f[b].apply(f,Array.prototype.slice.call(arguments,1)),this}console.log("ERROR: Method "+b+" does not exist on jQuery.w2toolbar")},a.prototype={item:{id:null,type:"button",text:"",route:null,html:"",img:null,icon:null,count:null,hidden:!1,disabled:!1,checked:!1,arrow:!0,hint:"",group:null,items:null,overlay:{},onClick:null},add:function(a){this.insert(null,a)},insert:function(b,c){$.isArray(c)||(c=[c]);for(var d=0;d<c.length;d++){if("undefined"==typeof c[d].type)return void console.log('ERROR: The parameter "type" is required but not supplied in w2toolbar.add() method.');if(-1===$.inArray(String(c[d].type),["button","check","radio","drop","menu","break","html","spacer"]))return void console.log('ERROR: The parameter "type" should be one of the following [button, check, radio, drop, menu, break, html, spacer] in w2toolbar.add() method.');if("undefined"==typeof c[d].id)return void console.log('ERROR: The parameter "id" is required but not supplied in w2toolbar.add() method.');if(!w2utils.checkUniqueId(c[d].id,this.items,"toolbar items",this.name))return;var e=$.extend({},a.prototype.item,c[d]);if(null==b)this.items.push(e);else{var f=this.get(b,!0);this.items=this.items.slice(0,f).concat([e],this.items.slice(f))}this.refresh(e.id)}},remove:function(){for(var a=0,b=0;b<arguments.length;b++){var c=this.get(arguments[b]);if(c){a++,$(this.box).find("#tb_"+this.name+"_item_"+w2utils.escapeId(c.id)).remove();var d=this.get(c.id,!0);d&&this.items.splice(d,1)}}return a},set:function(a,b){var c=this.get(a,!0);return null===c?!1:($.extend(this.items[c],b),this.refresh(a),!0)},get:function(a,b){if(0===arguments.length){for(var c=[],d=0;d<this.items.length;d++)null!==this.items[d].id&&c.push(this.items[d].id);return c}for(var e=0;e<this.items.length;e++)if(this.items[e].id===a)return b===!0?e:this.items[e];return null},show:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&(b++,e.hidden=!1,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},hide:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&(b++,e.hidden=!0,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},enable:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&(b++,e.disabled=!1,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},disable:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&(b++,e.disabled=!0,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},check:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&(b++,e.checked=!0,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},uncheck:function(){for(var a=this,b=0,c=[],d=0;d<arguments.length;d++){var e=this.get(arguments[d]);e&&(b++,e.checked=!1,c.push(e.id))}return setTimeout(function(){for(var b in c)a.refresh(c[b])},15),b},render:function(a){var b=(new Date).getTime(),c=this.trigger({phase:"before",type:"render",target:this.name,box:a});if(c.isCancelled!==!0&&(null!=a&&($(this.box).find("> table #tb_"+this.name+"_right").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-toolbar").html(""),this.box=a),this.box)){for(var d='<table cellspacing="0" cellpadding="0" width="100%"><tr>',e=0;e<this.items.length;e++){var f=this.items[e];null==f.id&&(f.id="item_"+e),null!==f&&(d+="spacer"===f.type?'<td width="100%" id="tb_'+this.name+"_item_"+f.id+'" align="right"></td>':'<td id="tb_'+this.name+"_item_"+f.id+'" style="'+(f.hidden?"display: none":"")+'"     class="'+(f.disabled?"disabled":"")+'" valign="middle">'+this.getItemHTML(f)+"</td>")}return d+='<td width="100%" id="tb_'+this.name+'_right" align="right">'+this.right+"</td>",d+="</tr></table>",$(this.box).attr("name",this.name).addClass("w2ui-reset w2ui-toolbar").html(d),$(this.box).length>0&&($(this.box)[0].style.cssText+=this.style),this.trigger($.extend(c,{phase:"after"})),(new Date).getTime()-b}},refresh:function(a){var b=(new Date).getTime(),c=this.trigger({phase:"before",type:"refresh",target:"undefined"!=typeof a?a:this.name,item:this.get(a)});if(c.isCancelled!==!0){if(null==a)for(var d=0;d<this.items.length;d++){var e=this.items[d];null==e.id&&(e.id="item_"+d),this.refresh(e.id)}var f=this.get(a);if(null===f)return!1;var g=$(this.box).find("#tb_"+this.name+"_item_"+w2utils.escapeId(f.id)),h=this.getItemHTML(f);return 0===g.length?(h="spacer"===f.type?'<td width="100%" id="tb_'+this.name+"_item_"+f.id+'" align="right"></td>':'<td id="tb_'+this.name+"_item_"+f.id+'" style="'+(f.hidden?"display: none":"")+'"     class="'+(f.disabled?"disabled":"")+'" valign="middle">'+h+"</td>",this.get(a,!0)===this.items.length-1?$(this.box).find("#tb_"+this.name+"_right").before(h):$(this.box).find("#tb_"+this.name+"_item_"+w2utils.escapeId(this.items[parseInt(this.get(a,!0))+1].id)).before(h)):(g.html(h),f.hidden?g.css("display","none"):g.css("display",""),f.disabled?g.addClass("disabled"):g.removeClass("disabled")),this.trigger($.extend(c,{phase:"after"})),(new Date).getTime()-b}},resize:function(){var a=(new Date).getTime(),b=this.trigger({phase:"before",type:"resize",target:this.name});return b.isCancelled!==!0?(this.trigger($.extend(b,{phase:"after"})),(new Date).getTime()-a):void 0},destroy:function(){var a=this.trigger({phase:"before",type:"destroy",target:this.name});a.isCancelled!==!0&&($(this.box).find("> table #tb_"+this.name+"_right").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-toolbar").html(""),$(this.box).html(""),delete w2ui[this.name],this.trigger($.extend(a,{phase:"after"})))},getItemHTML:function(a){var b="";switch("undefined"!=typeof a.caption&&(a.text=a.caption),"undefined"==typeof a.hint&&(a.hint=""),"undefined"==typeof a.text&&(a.text=""),a.type){case"menu":case"button":case"check":case"radio":case"drop":var c="<td>&nbsp;</td>";a.img&&(c='<td><div class="w2ui-tb-image w2ui-icon '+a.img+'"></div></td>'),a.icon&&(c='<td><div class="w2ui-tb-image"><span class="'+a.icon+'"></span></div></td>'),b+='<table cellpadding="0" cellspacing="0" title="'+a.hint+'" class="w2ui-button '+(a.checked?"checked":"")+'"        onclick     = "var el=w2ui[\''+this.name+"']; if (el) el.click('"+a.id+'\', event);"        onmouseover = "'+(a.disabled?"":"$(this).addClass('over');")+'"       onmouseout  = "'+(a.disabled?"":"$(this).removeClass('over').removeClass('down');")+'"       onmousedown = "'+(a.disabled?"":"$(this).addClass('down');")+'"       onmouseup   = "'+(a.disabled?"":"$(this).removeClass('down');")+'"><tr><td>  <table cellpadding="1" cellspacing="0">  <tr>'+c+(""!==a.text?'<td class="w2ui-tb-caption" nowrap>'+a.text+"</td>":"")+(null!=a.count?'<td class="w2ui-tb-count" nowrap><span>'+a.count+"</span></td>":"")+("drop"!==a.type&&"menu"!==a.type||a.arrow===!1?"":'<td class="w2ui-tb-down" nowrap><div></div></td>')+"  </tr></table></td></tr></table>";break;case"break":b+='<table cellpadding="0" cellspacing="0"><tr>    <td><div class="w2ui-break">&nbsp;</div></td></tr></table>';break;case"html":b+='<table cellpadding="0" cellspacing="0"><tr>    <td nowrap>'+a.html+"</td></tr></table>"}var d="";return"function"==typeof a.onRender&&(d=a.onRender.call(this,a.id,b)),"function"==typeof this.onRender&&(d=this.onRender(a.id,b)),""!==d&&null!=d&&(b=d),b},menuClick:function(a){var b=this;if(a.item&&!a.item.disabled){var c=this.trigger({phase:"before",type:"click",target:a.item.id+":"+a.subItem.id,item:a.item,subItem:a.subItem,originalEvent:a.originalEvent});if(c.isCancelled===!0)return;var d=a.subItem;if(d.route){var e=String("/"+d.route).replace(/\/{2,}/g,"/"),f=w2utils.parseRoute(e);if(f.keys.length>0)for(var g=0;g<f.keys.length;g++)null!=b.routeData[f.keys[g].name]&&(e=e.replace(new RegExp(":"+f.keys[g].name,"g"),this.routeData[f.keys[g].name]));setTimeout(function(){window.location.hash=e},1)}this.trigger($.extend(c,{phase:"after"}))}},click:function(a,b){var c=this,d=this.get(a);if(d&&!d.disabled){var e=this.trigger({phase:"before",type:"click",target:"undefined"!=typeof a?a:this.name,item:d,object:d,originalEvent:b});if(e.isCancelled===!0)return;var f=$("#tb_"+this.name+"_item_"+w2utils.escapeId(d.id)+" table.w2ui-button");if(f.removeClass("down"),"radio"===d.type){for(var g=0;g<this.items.length;g++){var h=this.items[g];null!=h&&h.id!==d.id&&"radio"===h.type&&h.group===d.group&&h.checked&&(h.checked=!1,this.refresh(h.id))}d.checked=!0,f.addClass("checked")}if(("drop"===d.type||"menu"===d.type)&&(d.checked?d.checked=!1:setTimeout(function(){function a(){$(document).off("click",a),d.checked=!1,f.removeClass("checked")}var b=$("#tb_"+c.name+"_item_"+w2utils.escapeId(d.id));$.isPlainObject(d.overlay)||(d.overlay={});var e=(b.width()-50)/2;e>19&&(e=19),"drop"===d.type&&b.w2overlay(d.html,$.extend({left:e,top:3},d.overlay)),"menu"===d.type&&b.w2menu(d.items,$.extend({left:e,top:3},d.overlay,{select:function(b){c.menuClick({item:d,subItem:b.item,originalEvent:b.originalEvent}),a()}})),$(document).on("click",a)},1)),("check"===d.type||"drop"===d.type||"menu"===d.type)&&(d.checked=!d.checked,d.checked?f.addClass("checked"):f.removeClass("checked")),d.route){var i=String("/"+d.route).replace(/\/{2,}/g,"/"),j=w2utils.parseRoute(i);if(j.keys.length>0)for(var k=0;k<j.keys.length;k++)i=i.replace(new RegExp(":"+j.keys[k].name,"g"),this.routeData[j.keys[k].name]);setTimeout(function(){window.location.hash=i},1)}this.trigger($.extend(e,{phase:"after"}))}}},$.extend(a.prototype,w2utils.event),w2obj.toolbar=a}(),function(){var a=function(a){this.name=null,this.box=null,this.sidebar=null,this.parent=null,this.nodes=[],this.menu=[],this.routeData={},this.selected=null,this.img=null,this.icon=null,this.style="",this.topHTML="",this.bottomHTML="",this.keyboard=!0,this.onClick=null,this.onDblClick=null,this.onContextMenu=null,this.onMenuClick=null,this.onExpand=null,this.onCollapse=null,this.onKeydown=null,this.onRender=null,this.onRefresh=null,this.onResize=null,this.onDestroy=null,$.extend(!0,this,w2obj.sidebar,a)};$.fn.w2sidebar=function(b){if("object"==typeof b||!b){if(!w2utils.checkName(b,"w2sidebar"))return;var c=b.nodes,d=new a(b);return $.extend(d,{handlers:[],nodes:[]}),"undefined"!=typeof c&&d.add(d,c),0!==$(this).length&&d.render($(this)[0]),d.sidebar=d,w2ui[d.name]=d,d}if(w2ui[$(this).attr("name")]){var e=w2ui[$(this).attr("name")];return e[b].apply(e,Array.prototype.slice.call(arguments,1)),this}console.log("ERROR: Method "+b+" does not exist on jQuery.w2sidebar")},a.prototype={node:{id:null,text:"",count:null,img:null,icon:null,nodes:[],style:"",route:null,selected:!1,expanded:!1,hidden:!1,disabled:!1,group:!1,groupShowHide:!0,plus:!1,onClick:null,onDblClick:null,onContextMenu:null,onExpand:null,onCollapse:null,parent:null,sidebar:null},add:function(a,b){return 1==arguments.length&&(b=arguments[0],a=this),"string"==typeof a&&(a=this.get(a)),this.insert(a,null,b)},insert:function(b,c,d){var e,f,g,h,i;if(2==arguments.length){if(d=arguments[1],c=arguments[0],f=this.get(c),null===f)return $.isArray(d)||(d=[d]),e=null!=d[0].caption?d[0].caption:d[0].text,console.log('ERROR: Cannot insert node "'+e+'" because cannot find node "'+c+'" to insert before.'),null;b=this.get(c).parent}"string"==typeof b&&(b=this.get(b)),$.isArray(d)||(d=[d]);for(var j in d)if(h=d[j],null!=typeof h.id)if(null===this.get(this,h.id)){if(g=$.extend({},a.prototype.node,h),g.sidebar=this,g.parent=b,i=g.nodes||[],g.nodes=[],null===c)b.nodes.push(g);else{if(f=this.get(b,c,!0),null===f)return e=null!=h.caption?h.caption:h.text,console.log('ERROR: Cannot insert node "'+e+'" because cannot find node "'+c+'" to insert before.'),null;b.nodes.splice(f,0,g)}i.length>0&&this.insert(g,null,i)}else e=null!=h.caption?h.caption:h.text,console.log("ERROR: Cannot insert node with id="+h.id+" (text: "+e+") because another node with the same id already exists.");else e=null!=h.caption?h.caption:h.text,console.log('ERROR: Cannot insert node "'+e+'" because it has no id.');return this.refresh(b.id),g},remove:function(){for(var a,b=0,c=0;c<arguments.length;c++)if(a=this.get(arguments[c]),null!==a){null!==this.selected&&this.selected===a.id&&(this.selected=null);var d=this.get(a.parent,arguments[c],!0);null!==d&&(a.parent.nodes[d].selected&&a.sidebar.unselect(a.id),a.parent.nodes.splice(d,1),b++)}return b>0&&1==arguments.length?this.refresh(a.parent.id):this.refresh(),b},set:function(a,b,c){if(2==arguments.length&&(c=b,b=a,a=this),"string"==typeof a&&(a=this.get(a)),null==a.nodes)return null;for(var d=0;d<a.nodes.length;d++){if(a.nodes[d].id===b){var e=c.nodes;return $.extend(a.nodes[d],c,{nodes:[]}),null!=e&&this.add(a.nodes[d],e),this.refresh(b),!0}var f=this.set(a.nodes[d],b,c);if(f)return!0}return!1},get:function(a,b,c){if(0===arguments.length){for(var d=[],e=this.find({}),f=0;f<e.length;f++)null!=e[f].id&&d.push(e[f].id);return d}if((1==arguments.length||2==arguments.length&&b===!0)&&(c=b,b=a,a=this),"string"==typeof a&&(a=this.get(a)),null==a.nodes)return null;for(var g=0;g<a.nodes.length;g++){if(a.nodes[g].id==b)return c===!0?g:a.nodes[g];var h=this.get(a.nodes[g],b,c);if(h||0===h)return h}return null},find:function(a,b,c){if(1==arguments.length&&(b=a,a=this),c||(c=[]),"string"==typeof a&&(a=this.get(a)),null==a.nodes)return c;for(var d=0;d<a.nodes.length;d++){var e=!0;for(var f in b)a.nodes[d][f]!=b[f]&&(e=!1);e&&c.push(a.nodes[d]),a.nodes[d].nodes.length>0&&(c=this.find(a.nodes[d],b,c))}return c},hide:function(){for(var a=0,b=0;b<arguments.length;b++){var c=this.get(arguments[b]);null!==c&&(c.hidden=!0,a++)}return 1==arguments.length?this.refresh(arguments[0]):this.refresh(),a},show:function(){for(var a=0,b=0;b<arguments.length;b++){var c=this.get(arguments[b]);null!==c&&(c.hidden=!1,a++)}return 1==arguments.length?this.refresh(arguments[0]):this.refresh(),a},disable:function(){for(var a=0,b=0;b<arguments.length;b++){var c=this.get(arguments[b]);null!==c&&(c.disabled=!0,c.selected&&this.unselect(c.id),a++)}return 1==arguments.length?this.refresh(arguments[0]):this.refresh(),a},enable:function(){for(var a=0,b=0;b<arguments.length;b++){var c=this.get(arguments[b]);null!==c&&(c.disabled=!1,a++)}return 1==arguments.length?this.refresh(arguments[0]):this.refresh(),a},select:function(a){var b=this.get(a);return b?this.selected==a&&b.selected?!1:(this.unselect(this.selected),$(this.box).find("#node_"+w2utils.escapeId(a)).addClass("w2ui-selected").find(".w2ui-icon").addClass("w2ui-icon-selected"),b.selected=!0,this.selected=a,!0):!1},unselect:function(a){var b=this.get(a);return b?(b.selected=!1,$(this.box).find("#node_"+w2utils.escapeId(a)).removeClass("w2ui-selected").find(".w2ui-icon").removeClass("w2ui-icon-selected"),this.selected==a&&(this.selected=null),!0):!1},toggle:function(a){var b=this.get(a);return null===b?!1:b.plus?(this.set(a,{plus:!1}),this.expand(a),void this.refresh(a)):0===b.nodes.length?!1:this.get(a).expanded?this.collapse(a):this.expand(a)},collapse:function(a){var b=this,c=this.get(a),d=this.trigger({phase:"before",type:"collapse",target:a,object:c});return d.isCancelled!==!0?($(this.box).find("#node_"+w2utils.escapeId(a)+"_sub").slideUp(200),$(this.box).find("#node_"+w2utils.escapeId(a)+" .w2ui-node-dots:first-child").html('<div class="w2ui-expand">+</div>'),c.expanded=!1,this.trigger($.extend(d,{phase:"after"})),setTimeout(function(){b.refresh(a)},200),!0):void 0},collapseAll:function(a){if("undefined"==typeof a&&(a=this),"string"==typeof a&&(a=this.get(a)),null==a.nodes)return!1;for(var b=0;b<a.nodes.length;b++)a.nodes[b].expanded===!0&&(a.nodes[b].expanded=!1),a.nodes[b].nodes&&a.nodes[b].nodes.length>0&&this.collapseAll(a.nodes[b]);return this.refresh(a.id),!0},expand:function(a){var b=this,c=this.get(a),d=this.trigger({phase:"before",type:"expand",target:a,object:c});return d.isCancelled!==!0?($(this.box).find("#node_"+w2utils.escapeId(a)+"_sub").slideDown(200),$(this.box).find("#node_"+w2utils.escapeId(a)+" .w2ui-node-dots:first-child").html('<div class="w2ui-expand">-</div>'),c.expanded=!0,this.trigger($.extend(d,{phase:"after"})),setTimeout(function(){b.refresh(a)},200),!0):void 0},expandAll:function(a){if("undefined"==typeof a&&(a=this),"string"==typeof a&&(a=this.get(a)),null==a.nodes)return!1;for(var b=0;b<a.nodes.length;b++)a.nodes[b].expanded===!1&&(a.nodes[b].expanded=!0),a.nodes[b].nodes&&a.nodes[b].nodes.length>0&&this.collapseAll(a.nodes[b]);this.refresh(a.id)},expandParents:function(a){var b=this.get(a);return null===b?!1:(b.parent&&(b.parent.expanded=!0,this.expandParents(b.parent.id)),this.refresh(a),!0)},click:function(a,b){var c=this,d=this.get(a);if(null!==d&&!d.disabled&&!d.group){$(c.box).find(".w2ui-node.w2ui-selected").each(function(a,b){var d=$(b).attr("id").replace("node_",""),e=c.get(d);null!=e&&(e.selected=!1),$(b).removeClass("w2ui-selected").find(".w2ui-icon").removeClass("w2ui-icon-selected")});var e=$(c.box).find("#node_"+w2utils.escapeId(a)),f=$(c.box).find("#node_"+w2utils.escapeId(c.selected));e.addClass("w2ui-selected").find(".w2ui-icon").addClass("w2ui-icon-selected"),setTimeout(function(){var g=c.trigger({phase:"before",type:"click",target:a,originalEvent:b,node:d,object:d});if(g.isCancelled===!0)return e.removeClass("w2ui-selected").find(".w2ui-icon").removeClass("w2ui-icon-selected"),void f.addClass("w2ui-selected").find(".w2ui-icon").addClass("w2ui-icon-selected");if(null!==f&&(f.selected=!1),c.get(a).selected=!0,c.selected=a,d.route){var h=String("/"+d.route).replace(/\/{2,}/g,"/"),i=w2utils.parseRoute(h);if(i.keys.length>0)for(var j=0;j<i.keys.length;j++)null!=c.routeData[i.keys[j].name]&&(h=h.replace(new RegExp(":"+i.keys[j].name,"g"),c.routeData[i.keys[j].name]));setTimeout(function(){window.location.hash=h},1)}c.trigger($.extend(g,{phase:"after"}))},1)}},keydown:function(a){function b(a,b){null===a||a.hidden||a.disabled||a.group||(g.click(a.id,b),setTimeout(function(){g.scrollIntoView()},50))}function c(a,b){for(a=b(a);null!==a&&(a.hidden||a.disabled)&&!a.group;)a=b(a);return a}function d(a,b){if(null===a)return null;var c=a.parent,e=g.get(a.id,!0),f=null;if(a.expanded&&a.nodes.length>0&&b!==!0){var h=a.nodes[0];f=h.hidden||h.disabled||h.group?d(h):h}else f=c&&e+1<c.nodes.length?c.nodes[e+1]:d(c,!0);return null!==f&&(f.hidden||f.disabled||f.group)&&(f=d(f)),f}function e(a){if(null===a)return null;var b=a.parent,c=g.get(a.id,!0),d=c>0?f(b.nodes[c-1]):b;return null!==d&&(d.hidden||d.disabled||d.group)&&(d=e(d)),d}function f(a){if(a.expanded&&a.nodes.length>0){var b=a.nodes[a.nodes.length-1];return b.hidden||b.disabled||b.group?e(b):f(b)}return a}var g=this,h=g.get(g.selected);if(h&&g.keyboard===!0){var i=g.trigger({phase:"before",type:"keydown",target:g.name,originalEvent:a});i.isCancelled!==!0&&((13==a.keyCode||32==a.keyCode)&&h.nodes.length>0&&g.toggle(g.selected),37==a.keyCode&&(h.nodes.length>0&&h.expanded?g.collapse(g.selected):(b(h.parent),h.parent.group||g.collapse(h.parent.id))),39==a.keyCode&&(h.nodes.length>0||h.plus)&&!h.expanded&&g.expand(g.selected),38==a.keyCode&&b(c(h,e)),40==a.keyCode&&b(c(h,d)),-1!=$.inArray(a.keyCode,[13,32,37,38,39,40])&&(a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation()),g.trigger($.extend(i,{phase:"after"})))}},scrollIntoView:function(a){"undefined"==typeof a&&(a=this.selected);var b=this.get(a);if(null!==b){var c=$(this.box).find(".w2ui-sidebar-div"),d=$(this.box).find("#node_"+w2utils.escapeId(a)),e=d.offset().top-c.offset().top;e+d.height()>c.height()&&c.animate({scrollTop:c.scrollTop()+c.height()/1.3},250,"linear"),0>=e&&c.animate({scrollTop:c.scrollTop()-c.height()/1.3},250,"linear")}},dblClick:function(a,b){var c=this.get(a),d=this.trigger({phase:"before",type:"dblClick",target:a,originalEvent:b,object:c});d.isCancelled!==!0&&(this.toggle(a),this.trigger($.extend(d,{phase:"after"})))},contextMenu:function(a,b){var c=this,d=c.get(a);a!=c.selected&&c.click(a),setTimeout(function(){var e=c.trigger({phase:"before",type:"contextMenu",target:a,originalEvent:b,object:d});e.isCancelled!==!0&&(d.group||d.disabled||(c.menu.length>0&&$(c.box).find("#node_"+w2utils.escapeId(a)).w2menu(c.menu,{left:(b?b.offsetX||b.pageX:50)-25,onSelect:function(b){c.menuClick(a,parseInt(b.index),b.originalEvent)}}),c.trigger($.extend(e,{phase:"after"}))))},150)},menuClick:function(a,b,c){var d=this,e=d.trigger({phase:"before",type:"menuClick",target:a,originalEvent:c,menuIndex:b,menuItem:d.menu[b]});e.isCancelled!==!0&&d.trigger($.extend(e,{phase:"after"}))},render:function(a){var b=(new Date).getTime(),c=this.trigger({phase:"before",type:"render",target:this.name,box:a});return c.isCancelled!==!0&&("undefined"!=typeof a&&null!==a&&($(this.box).find("> div > div.w2ui-sidebar-div").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-sidebar").html(""),this.box=a),this.box)?($(this.box).attr("name",this.name).addClass("w2ui-reset w2ui-sidebar").html('<div><div class="w2ui-sidebar-top"></div><div class="w2ui-sidebar-div"></div><div class="w2ui-sidebar-bottom"></div></div>'),$(this.box).find("> div").css({width:$(this.box).width()+"px",height:$(this.box).height()+"px"}),$(this.box).length>0&&($(this.box)[0].style.cssText+=this.style),""!==this.topHTML&&($(this.box).find(".w2ui-sidebar-top").html(this.topHTML),$(this.box).find(".w2ui-sidebar-div").css("top",$(this.box).find(".w2ui-sidebar-top").height()+"px")),""!==this.bottomHTML&&($(this.box).find(".w2ui-sidebar-bottom").html(this.bottomHTML),$(this.box).find(".w2ui-sidebar-div").css("bottom",$(this.box).find(".w2ui-sidebar-bottom").height()+"px")),this.trigger($.extend(c,{phase:"after"})),this.refresh(),(new Date).getTime()-b):void 0},refresh:function(a){function b(a){var b="",c=a.img;null===c&&(c=this.img);var d=a.icon;null===d&&(d=this.icon);for(var e=a.parent,f=0;e&&null!==e.parent;)e.group&&f--,e=e.parent,f++;return"undefined"!=typeof a.caption&&(a.text=a.caption),a.group?b='<div class="w2ui-node-group"  id="node_'+a.id+'"        onclick="w2ui[\''+h.name+"'].toggle('"+a.id+"')\"        onmouseout=\"$(this).find('span:nth-child(1)').css('color', 'transparent')\"         onmouseover=\"$(this).find('span:nth-child(1)').css('color', 'inherit')\">"+(a.groupShowHide?"<span>"+w2utils.lang(!a.hidden&&a.expanded?"Hide":"Show")+"</span>":"<span></span>")+"    <span>"+a.text+'</span></div><div class="w2ui-node-sub" id="node_'+a.id+'_sub" style="'+a.style+";"+(!a.hidden&&a.expanded?"":"display: none;")+'"></div>':(a.selected&&!a.disabled&&(h.selected=a.id),e="",c&&(e='<div class="w2ui-node-image w2ui-icon '+c+(a.selected&&!a.disabled?" w2ui-icon-selected":"")+'"></div>'),d&&(e='<div class="w2ui-node-image"><span class="'+d+'"></span></div>'),b='<div class="w2ui-node '+(a.selected?"w2ui-selected":"")+" "+(a.disabled?"w2ui-disabled":"")+'" id="node_'+a.id+'" style="'+(a.hidden?"display: none;":"")+'"    ondblclick="w2ui[\''+h.name+"'].dblClick('"+a.id+"', event);\"    oncontextmenu=\"w2ui['"+h.name+"'].contextMenu('"+a.id+"', event);         if (event.preventDefault) event.preventDefault();\"    onClick=\"w2ui['"+h.name+"'].click('"+a.id+'\', event); "><table cellpadding="0" cellspacing="0" style="margin-left:'+18*f+"px; padding-right:"+18*f+'px"><tr><td class="w2ui-node-dots" nowrap onclick="w2ui[\''+h.name+"'].toggle('"+a.id+'\');         if (event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;">    <div class="w2ui-expand">'+(a.nodes.length>0?a.expanded?"-":"+":a.plus?"+":"")+'</div></td><td class="w2ui-node-data" nowrap>'+e+(a.count||0===a.count?'<div class="w2ui-node-count">'+a.count+"</div>":"")+'<div class="w2ui-node-caption">'+a.text+'</div></td></tr></table></div><div class="w2ui-node-sub" id="node_'+a.id+'_sub" style="'+a.style+";"+(!a.hidden&&a.expanded?"":"display: none;")+'"></div>'),b
}var c=(new Date).getTime(),d=this.trigger({phase:"before",type:"refresh",target:"undefined"!=typeof a?a:this.name});if(d.isCancelled!==!0){""!==this.topHTML&&($(this.box).find(".w2ui-sidebar-top").html(this.topHTML),$(this.box).find(".w2ui-sidebar-div").css("top",$(this.box).find(".w2ui-sidebar-top").height()+"px")),""!==this.bottomHTML&&($(this.box).find(".w2ui-sidebar-bottom").html(this.bottomHTML),$(this.box).find(".w2ui-sidebar-div").css("bottom",$(this.box).find(".w2ui-sidebar-bottom").height()+"px")),$(this.box).find("> div").css({width:$(this.box).width()+"px",height:$(this.box).height()+"px"});var e,f,g,h=this;if("undefined"==typeof a)e=this,g=".w2ui-sidebar-div";else{if(e=this.get(a),null===e)return;g="#node_"+w2utils.escapeId(e.id)+"_sub"}var i;if(e!==this){var j="#node_"+w2utils.escapeId(e.id);i=b(e),$(this.box).find(j).before('<div id="sidebar_'+this.name+'_tmp"></div>'),$(this.box).find(j).remove(),$(this.box).find(g).remove(),$("#sidebar_"+this.name+"_tmp").before(i),$("#sidebar_"+this.name+"_tmp").remove()}$(this.box).find(g).html("");for(var k=0;k<e.nodes.length;k++)f=e.nodes[k],i=b(f),$(this.box).find(g).append(i),0!==f.nodes.length&&this.refresh(f.id);return this.trigger($.extend(d,{phase:"after"})),(new Date).getTime()-c}},resize:function(){var a=(new Date).getTime(),b=this.trigger({phase:"before",type:"resize",target:this.name});return b.isCancelled!==!0?($(this.box).css("overflow","hidden"),$(this.box).find("> div").css({width:$(this.box).width()+"px",height:$(this.box).height()+"px"}),this.trigger($.extend(b,{phase:"after"})),(new Date).getTime()-a):void 0},destroy:function(){var a=this.trigger({phase:"before",type:"destroy",target:this.name});a.isCancelled!==!0&&($(this.box).find("> div > div.w2ui-sidebar-div").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-sidebar").html(""),delete w2ui[this.name],this.trigger($.extend(a,{phase:"after"})))},lock:function(){var a=$(this.box).find("> div:first-child"),b=Array.prototype.slice.call(arguments,0);b.unshift(a),w2utils.lock.apply(window,b)},unlock:function(){w2utils.unlock(this.box)}},$.extend(a.prototype,w2utils.event),w2obj.sidebar=a}(),function(a){var b=function(b){this.el=null,this.helpers={},this.type=b.type||"text",this.options=a.extend(!0,{},b),this.onSearch=b.onSearch||null,this.onRequest=b.onRequest||null,this.onLoad=b.onLoad||null,this.onError=b.onError||null,this.onClick=b.onClick||null,this.onAdd=b.onAdd||null,this.onNew=b.onNew||null,this.onRemove=b.onRemove||null,this.onMouseOver=b.onMouseOver||null,this.onMouseOut=b.onMouseOut||null,this.onIconClick=b.onIconClick||null,this.tmp={},delete this.options.type,delete this.options.onSearch,delete this.options.onRequest,delete this.options.onLoad,delete this.options.onError,delete this.options.onClick,delete this.options.onMouseOver,delete this.options.onMouseOut,delete this.options.onIconClick,a.extend(!0,this,w2obj.field)};a.fn.w2field=function(c,d){if(0!=this.length){if(0==arguments.length){var e=a(this).data("w2field");return e}return"string"==typeof c&&"object"==typeof d&&(c=a.extend(!0,{},d,{type:c})),"string"==typeof c&&"undefined"==typeof d&&(c={type:c}),c.type=String(c.type).toLowerCase(),this.each(function(d,e){var f=a(e).data("w2field");if("undefined"==typeof f){var f=new b(c);return a.extend(f,{handlers:[]}),e&&(f.el=a(e)[0]),f.init(),a(e).data("w2field",f),f}if(f.clear(),"clear"!=c.type){var f=new b(c);return a.extend(f,{handlers:[]}),e&&(f.el=a(e)[0]),f.init(),a(e).data("w2field",f),f}})}var f=b.prototype;return f[c]?f[c].apply(f,Array.prototype.slice.call(arguments,1)):void 0},b.prototype={custom:{},pallete:[["000000","444444","666666","999999","CCCCCC","EEEEEE","F3F3F3","FFFFFF"],["FF011B","FF9838","FFFD59","01FD55","00FFFE","0424F3","9B24F4","FF21F5"],["F4CCCC","FCE5CD","FFF2CC","D9EAD3","D0E0E3","CFE2F3","D9D1E9","EAD1DC"],["EA9899","F9CB9C","FEE599","B6D7A8","A2C4C9","9FC5E8","B4A7D6","D5A6BD"],["E06666","F6B26B","FED966","93C47D","76A5AF","6FA8DC","8E7CC3","C27BA0"],["CC0814","E69138","F1C232","6AA84F","45818E","3D85C6","674EA7","A54D79"],["99050C","B45F17","BF901F","37761D","124F5C","0A5394","351C75","741B47"],["660205","783F0B","7F6011","274E12","0C343D","063762","20124D","4C1030"]],addType:function(a,b){return a=String(a).toLowerCase(),this.custom[a]=b,!0},removeType:function(a){return a=String(a).toLowerCase(),this.custom[a]?(delete this.custom[a],!0):!1},init:function(){var b,c=this,d=this.options;if("function"==typeof this.custom[this.type])return void this.custom[this.type].call(this,d);if(-1==["INPUT","TEXTAREA"].indexOf(this.el.tagName))return void console.log("ERROR: w2field could only be applied to INPUT or TEXTAREA.",this.el);switch(this.type){case"text":case"int":case"float":case"money":case"currency":case"percent":case"alphanumeric":case"hex":b={min:null,max:null,step:1,placeholder:"",autoFormat:!0,currencyPrefix:w2utils.settings.currencyPrefix,currencySuffix:w2utils.settings.currencySuffix,currencyPrecision:w2utils.settings.currencyPrecision,decimalSymbol:w2utils.settings.decimalSymbol,groupSymbol:w2utils.settings.groupSymbol,arrows:!1,keyboard:!0,precision:null,silent:!0,prefix:"",suffix:""},this.options=a.extend(!0,{},b,d),d=this.options,d.numberRE=new RegExp("["+d.groupSymbol+"]","g"),d.moneyRE=new RegExp("["+d.currencyPrefix+d.currencySuffix+d.groupSymbol+"]","g"),d.percentRE=new RegExp("["+d.groupSymbol+"%]","g"),-1!=["text","alphanumeric","hex"].indexOf(this.type)&&(d.arrows=!1,d.keyboard=!1),this.addPrefix(),this.addSuffix(),a(this.el).attr("placeholder")&&""==d.placeholder&&(d.placeholder=a(this.el).attr("placeholder")),a(this.el).attr("placeholder",d.placeholder);break;case"color":b={prefix:"#",suffix:'<div style="width: '+(parseInt(a(this.el).css("font-size"))||12)+'px">&nbsp;</div>',placeholder:"",arrows:!1,keyboard:!1},a.extend(d,b),this.addPrefix(),this.addSuffix(),a(this.el).attr("maxlength",6),""!=a(this.el).val()&&setTimeout(function(){a(c.el).change()},1),a(this.el).attr("placeholder")&&""==d.placeholder&&(d.placeholder=a(this.el).attr("placeholder")),a(this.el).attr("placeholder",d.placeholder);break;case"date":b={format:w2utils.settings.date_format,placeholder:"",keyboard:!0,silent:!0,start:"",end:"",blocked:{},colored:{}},this.options=a.extend(!0,{},b,d),d=this.options,a(this.el).attr("placeholder")&&""==d.placeholder&&(d.placeholder=a(this.el).attr("placeholder")),a(this.el).attr("placeholder",d.placeholder?d.placeholder:d.format);break;case"time":b={format:w2utils.settings.time_format,placeholder:"",keyboard:!0,silent:!0,start:"",end:""},this.options=a.extend(!0,{},b,d),d=this.options,a(this.el).attr("placeholder")&&""==d.placeholder&&(d.placeholder=a(this.el).attr("placeholder")),a(this.el).attr("placeholder",d.placeholder?d.placeholder:"h12"==d.format?"hh:mi pm":"hh:mi");break;case"datetime":break;case"list":case"combo":if(b={items:[],selected:{},placeholder:"",url:null,postData:{},minLength:1,cacheMax:250,maxDropHeight:350,match:"begins",silent:!0,icon:null,iconStyle:"",onSearch:null,onRequest:null,onLoad:null,onError:null,onIconClick:null,renderDrop:null,prefix:"",suffix:"",openOnFocus:!1,markSearch:!1},d.items=this.normMenu(d.items),"list"==this.type&&(b.openOnFocus=!0,b.suffix='<div class="arrow-down" style="margin-top: '+(parseInt(a(this.el).height())-6)/2+'px;"></div>',a(this.el).addClass("w2ui-select"),!a.isPlainObject(d.selected)))for(var e in d.items){var f=d.items[e];if(f&&f.id==d.selected){d.selected=a.extend(!0,{},f);break}}d=a.extend({},b,d,{align:"both",altRows:!0}),this.options=d,a.isPlainObject(d.selected)||(d.selected={}),a(this.el).data("selected",d.selected),d.url&&this.request(0),"list"==this.type&&this.addFocus(),this.addPrefix(),this.addSuffix(),setTimeout(function(){c.refresh()},10),a(this.el).attr("placeholder")&&""==d.placeholder&&(d.placeholder=a(this.el).attr("placeholder")),a(this.el).attr("placeholder",d.placeholder).attr("autocomplete","off"),"undefined"!=typeof d.selected.text&&a(this.el).val(d.selected.text);break;case"enum":b={items:[],selected:[],placeholder:"",max:0,url:null,postData:{},minLength:1,cacheMax:250,maxWidth:250,maxHeight:350,maxDropHeight:350,match:"contains",silent:!0,openOnFocus:!1,markSearch:!0,renderDrop:null,renderItem:null,style:"",onSearch:null,onRequest:null,onLoad:null,onError:null,onClick:null,onAdd:null,onNew:null,onRemove:null,onMouseOver:null,onMouseOut:null},d=a.extend({},b,d,{align:"both",suffix:"",altRows:!0}),d.items=this.normMenu(d.items),d.selected=this.normMenu(d.selected),this.options=d,a.isArray(d.selected)||(d.selected=[]),a(this.el).data("selected",d.selected),d.url&&this.request(0),this.addSuffix(),this.addMulti();break;case"file":b={selected:[],placeholder:w2utils.lang("Attach files by dragging and dropping or Click to Select"),max:0,maxSize:0,maxFileSize:0,maxWidth:250,maxHeight:350,maxDropHeight:350,silent:!0,renderItem:null,style:"",onClick:null,onAdd:null,onRemove:null,onMouseOver:null,onMouseOut:null},d=a.extend({},b,d,{align:"both",altRows:!0}),this.options=d,a.isArray(d.selected)||(d.selected=[]),a(this.el).data("selected",d.selected),a(this.el).attr("placeholder")&&(d.placeholder=a(this.el).attr("placeholder")),this.addMulti()}this.tmp={onChange:function(a){c.change.call(c,a)},onClick:function(a){c.click.call(c,a)},onFocus:function(a){c.focus.call(c,a)},onBlur:function(a){c.blur.call(c,a)},onKeydown:function(a){c.keyDown.call(c,a)},onKeyup:function(a){c.keyUp.call(c,a)},onKeypress:function(a){c.keyPress.call(c,a)}},a(this.el).addClass("w2field").data("w2field",this).on("change",this.tmp.onChange).on("click",this.tmp.onClick).on("focus",this.tmp.onFocus).on("blur",this.tmp.onBlur).on("keydown",this.tmp.onKeydown).on("keyup",this.tmp.onKeyup).on("keypress",this.tmp.onKeypress).css({"box-sizing":"border-box","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","-ms-box-sizing":"border-box","-o-box-sizing":"border-box"}),this.change(a.Event("change"))},clear:function(){var b=this.options;-1!=["money","currency"].indexOf(this.type)&&a(this.el).val(a(this.el).val().replace(b.moneyRE,"")),"percent"==this.type&&a(this.el).val(a(this.el).val().replace(/%/g,"")),"color"==this.type&&a(this.el).removeAttr("maxlength"),"list"==this.type&&a(this.el).removeClass("w2ui-select"),-1!=["date","time"].indexOf(this.type)&&a(this.el).attr("placeholder")==b.format&&a(this.el).attr("placeholder",""),this.type="clear";var c=a(this.el).data("tmp");if(this.tmp){"undefined"!=typeof c&&(c&&c["old-padding-left"]&&a(this.el).css("padding-left",c["old-padding-left"]),c&&c["old-padding-right"]&&a(this.el).css("padding-right",c["old-padding-right"])),a(this.el).val(this.clean(a(this.el).val())).removeClass("w2field").removeData().off("change",this.tmp.onChange).off("click",this.tmp.onClick).off("focus",this.tmp.onFocus).off("blur",this.tmp.onBlur).off("keydown",this.tmp.onKeydown).off("keyup",this.tmp.onKeyup).off("keypress",this.tmp.onKeypress);for(var d in this.helpers)a(this.helpers[d]).remove();this.helpers={}}},refresh:function(){var b=this,c=this.options,d=a(this.el).data("selected"),e=(new Date).getTime();if(-1!=["list"].indexOf(this.type)&&(a(b.el).parent().css("white-space","nowrap"),b.helpers.prefix&&b.helpers.prefix.hide(),setTimeout(function(){if(b.helpers.focus){!a.isEmptyObject(d)&&c.icon?(c.prefix='<span class="w2ui-icon '+c.icon+'"style="cursor: pointer; font-size: 14px; display: inline-block; margin-top: -1px; color: #7F98AD;'+c.iconStyle+'"></span>',b.addPrefix()):(c.prefix="",b.addPrefix());var e=b.helpers.focus.find("input");""==a(e).val()?(a(e).css("opacity",0).prev().css("opacity",0),a(b.el).val(d&&null!=d.text?d.text:""),a(b.el).attr("placeholder",c.placeholder||"")):(a(e).css("opacity",1).prev().css("opacity",1),a(b.el).val(""),a(b.el).removeAttr("placeholder"),setTimeout(function(){b.helpers.prefix&&b.helpers.prefix.hide();var d="position: absolute; opacity: 0; margin: 4px 0px 0px 2px; background-position: left !important;";c.icon?(a(e).css("margin-left","17px"),a(b.helpers.focus).find(".icon-search").attr("style",d+"width: 11px !important; opacity: 1")):(a(e).css("margin-left","0px"),a(b.helpers.focus).find(".icon-search").attr("style",d+"width: 0px !important; opacity: 0"))},1)),a(b.el).prop("readonly")||a(b.el).prop("disabled")?setTimeout(function(){a(b.helpers.prefix).css("opacity","0.6"),a(b.helpers.suffix).css("opacity","0.6")},1):setTimeout(function(){a(b.helpers.prefix).css("opacity","1"),a(b.helpers.suffix).css("opacity","1")},1)}},1)),-1!=["enum","file"].indexOf(this.type)){var f="";for(var g in d){var h=d[g],i="";i="function"==typeof c.renderItem?c.renderItem(h,g,'<div class="w2ui-list-remove" title="'+w2utils.lang("Remove")+'" index="'+g+'">&nbsp;&nbsp;</div>'):'<div class="w2ui-list-remove" title="'+w2utils.lang("Remove")+'" index="'+g+'">&nbsp;&nbsp;</div>'+("enum"==b.type?h.text:h.name+'<span class="file-size"> - '+w2utils.size(h.size)+"</span>"),f+='<li index="'+g+'" style="max-width: '+parseInt(c.maxWidth)+"px; "+(h.style?h.style:"")+'">'+i+"</li>"}var j=b.helpers.multi,k=j.find("ul");if(j.attr("style",j.attr("style")+";"+c.style),a(b.el).prop("readonly")||a(b.el).prop("disabled")?(j.addClass("w2ui-readonly"),j.css("pointer-events","none").find("li").css("opacity","0.6"),a(b.helpers.multi).find("input").prop("readonly",!0)):(j.removeClass("w2ui-readonly"),j.css("pointer-events","auto").find("li").css("opacity","1"),a(b.helpers.multi).find("input").prop("readonly",!1)),j.find(".w2ui-enum-placeholder").remove(),k.find("li").not("li.nomouse").remove(),""!=f)k.prepend(f);else if("undefined"!=typeof c.placeholder){var l="padding-top: "+a(this.el).css("padding-top")+";padding-left: "+a(this.el).css("padding-left")+"; box-sizing: "+a(this.el).css("box-sizing")+"; line-height: "+a(this.el).css("line-height")+"; font-size: "+a(this.el).css("font-size")+"; font-family: "+a(this.el).css("font-family")+"; ";j.prepend('<div class="w2ui-enum-placeholder" style="'+l+'">'+c.placeholder+"</div>")}j.find("li").data("mouse","out").on("click",function(c){var e=d[a(c.target).attr("index")];if(!a(c.target).hasClass("nomouse")){c.stopPropagation();var f=b.trigger({phase:"before",type:"click",target:b.el,originalEvent:c.originalEvent,item:e});if(f.isCancelled!==!0){if(a(c.target).hasClass("w2ui-list-remove")){if(a(b.el).attr("readonly")||a(b.el).attr("disabled"))return;var f=b.trigger({phase:"before",type:"remove",target:b.el,originalEvent:c.originalEvent,item:e});if(f.isCancelled===!0)return;a().w2overlay(),d.splice(a(c.target).attr("index"),1),a(b.el).trigger("change"),a(c.target).parent().fadeOut("fast"),setTimeout(function(){b.refresh(),b.trigger(a.extend(f,{phase:"after"}))},300)}if("file"==b.type&&!a(c.target).hasClass("w2ui-list-remove")){var g="";/image/i.test(e.type)&&(g='<div style="padding: 3px;">    <img src="'+(e.content?"data:"+e.type+";base64,"+e.content:"")+'" style="max-width: 300px;"         onload="var w = $(this).width(); var h = $(this).height();             if (w < 300 & h < 300) return;             if (w >= h && w > 300) $(this).width(300);            if (w < h && h > 300) $(this).height(300);"        onerror="this.style.display = \'none\'"    ></div>');var h='style="padding: 3px; text-align: right; color: #777;"',i='style="padding: 3px"';g+='<div style="padding: 8px;">    <table cellpadding="2">    <tr><td '+h+">"+w2utils.lang("Name")+":</td><td "+i+">"+e.name+"</td></tr>    <tr><td "+h+">"+w2utils.lang("Size")+":</td><td "+i+">"+w2utils.size(e.size)+"</td></tr>    <tr><td "+h+">"+w2utils.lang("Type")+":</td><td "+i+'>        <span style="width: 200px; display: block-inline; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">'+e.type+"</span>    </td></tr>    <tr><td "+h+">"+w2utils.lang("Modified")+":</td><td "+i+">"+w2utils.date(e.modified)+"</td></tr>    </table></div>",a(c.target).w2overlay(g)}b.trigger(a.extend(f,{phase:"after"}))}}}).on("mouseover",function(c){var e=c.target;if("LI"!=e.tagName&&(e=e.parentNode),!a(e).hasClass("nomouse")){if("out"==a(e).data("mouse")){var f=d[a(e).attr("index")],g=b.trigger({phase:"before",type:"mouseOver",target:b.el,originalEvent:c.originalEvent,item:f});if(g.isCancelled===!0)return;b.trigger(a.extend(g,{phase:"after"}))}a(e).data("mouse","over")}}).on("mouseout",function(c){var e=c.target;"LI"!=e.tagName&&(e=e.parentNode),a(e).hasClass("nomouse")||(a(e).data("mouse","leaving"),setTimeout(function(){if("leaving"==a(e).data("mouse")){a(e).data("mouse","out");var f=d[a(e).attr("index")],g=b.trigger({phase:"before",type:"f",target:b.el,originalEvent:c.originalEvent,item:f});if(g.isCancelled===!0)return;b.trigger(a.extend(g,{phase:"after"}))}},0))}),a(this.el).height("auto");var m=a(j).find("> div").height()+2*w2utils.getSize(j,"+height");26>m&&(m=26),m>c.maxHeight&&(m=c.maxHeight),j.length>0&&(j[0].scrollTop=1e3);var n=w2utils.getSize(a(this.el),"height")-2;n>m&&(m=n),a(j).css({height:m+"px",overflow:m==c.maxHeight?"auto":"hidden"}),m<c.maxHeight&&a(j).prop("scrollTop",0),a(this.el).css({height:m+2+"px"})}return(new Date).getTime()-e},reset:function(){var a=this.type;this.clear(),this.type=a,this.init()},clean:function(b){var c=this.options;return b=String(b).trim(),-1!=["int","float","money","currency","percent"].indexOf(this.type)&&("string"==typeof b&&(b=b.replace(c.decimalSymbol,".")),c.autoFormat&&-1!=["money","currency"].indexOf(this.type)&&(b=String(b).replace(c.moneyRE,"")),c.autoFormat&&"percent"==this.type&&(b=String(b).replace(c.percentRE,"")),c.autoFormat&&-1!=["int","float"].indexOf(this.type)&&(b=String(b).replace(c.numberRE,"")),parseFloat(b)==b&&(null!==c.min&&b<c.min&&(b=c.min,a(this.el).val(c.min)),null!==c.max&&b>c.max&&(b=c.max,a(this.el).val(c.max))),b=""!==b&&w2utils.isFloat(b)?Number(b):""),b},format:function(a){var b=this.options;if(b.autoFormat&&""!=a)switch(this.type){case"money":case"currency":a=w2utils.formatNumber(Number(a).toFixed(b.currencyPrecision),b.groupSymbol),""!=a&&(a=b.currencyPrefix+a+b.currencySuffix);break;case"percent":a=w2utils.formatNumber(b.precision?Number(a).toFixed(b.precision):a,b.groupSymbol),""!=a&&(a+="%");break;case"float":a=w2utils.formatNumber(b.precision?Number(a).toFixed(b.precision):a,b.groupSymbol);break;case"int":a=w2utils.formatNumber(a,b.groupSymbol)}return a},change:function(b){var c=this,d=c.options;if(-1!=["int","float","money","currency","percent"].indexOf(this.type)){var e=a(this.el).val(),f=this.format(this.clean(a(this.el).val()));if(""!=e&&e!=f)return a(this.el).val(f).change(),b.stopPropagation(),b.preventDefault(),!1}if("color"==this.type){var g="#"+a(this.el).val();6!=a(this.el).val().length&&3!=a(this.el).val().length&&(g=""),a(this.el).next().find("div").css("background-color",g),a(c.el).is(":focus")&&this.updateOverlay()}if(-1!=["list","enum","file"].indexOf(this.type)&&(c.refresh(),setTimeout(function(){c.refresh()},5)),-1!=["date","time"].indexOf(this.type)){var h=parseInt(c.el.value);w2utils.isInt(c.el.value)&&h>3e3&&("time"==this.type&&a(c.el).val(w2utils.formatTime(new Date(h),d.format)).change(),"date"==this.type&&a(c.el).val(w2utils.formatDate(new Date(h),d.format)).change())}},click:function(b){b.stopPropagation(),-1!=["list","combo","enum"].indexOf(this.type)&&(a(this.el).is(":focus")||this.focus(b)),-1!=["date","time","color"].indexOf(this.type)&&this.updateOverlay()},focus:function(){{var b=this;this.options}if(-1!==["color","date","time"].indexOf(b.type)){if(a(b.el).attr("readonly")||a(b.el).attr("disabled"))return;a("#w2ui-overlay").length>0&&a("#w2ui-overlay")[0].hide(),setTimeout(function(){b.updateOverlay()},150)}if(-1!=["list","combo","enum"].indexOf(b.type)){if(a(b.el).attr("readonly")||a(b.el).attr("disabled"))return;a("#w2ui-overlay").length>0&&a("#w2ui-overlay")[0].hide(),setTimeout(function(){return"list"==b.type&&a(b.el).is(":focus")?void a(b.helpers.focus).find("input").focus():(b.search(),void setTimeout(function(){b.updateOverlay()},1))},1)}"file"==b.type&&a(b.helpers.multi).css({outline:"auto 5px #7DB4F3","outline-offset":"-2px"})},blur:function(){var b=this,c=b.options,d=a(b.el).val().trim();-1!=["color","date","time","list","combo","enum"].indexOf(b.type)&&a("#w2ui-overlay").length>0&&a("#w2ui-overlay")[0].hide(),-1!=["int","float","money","currency","percent"].indexOf(b.type)&&(""===d||b.checkType(d)||(a(b.el).val("").change(),c.silent===!1&&(a(b.el).w2tag("Not a valid number"),setTimeout(function(){a(b.el).w2tag("")},3e3)))),-1!=["date","time"].indexOf(b.type)&&(""===d||b.inRange(b.el.value)?("date"!=b.type||""===d||w2utils.isDate(b.el.value,c.format)||(a(b.el).val("").removeData("selected").change(),c.silent===!1&&(a(b.el).w2tag("Not a valid date"),setTimeout(function(){a(b.el).w2tag("")},3e3))),"time"!=b.type||""===d||w2utils.isTime(b.el.value)||(a(b.el).val("").removeData("selected").change(),c.silent===!1&&(a(b.el).w2tag("Not a valid time"),setTimeout(function(){a(b.el).w2tag("")},3e3)))):(a(b.el).val("").removeData("selected").change(),c.silent===!1&&(a(b.el).w2tag("Not in range"),setTimeout(function(){a(b.el).w2tag("")},3e3)))),"enum"==b.type&&a(b.helpers.multi).find("input").val("").width(20),"file"==b.type&&a(b.helpers.multi).css({outline:"none"})},keyPress:function(a){{var b=this;b.options}if(-1!=["int","float","money","currency","percent","hex","color","alphanumeric"].indexOf(b.type)){if(a.metaKey||a.ctrlKey||a.altKey||a.charCode!=a.keyCode&&a.keyCode>0)return;var c=String.fromCharCode(a.charCode);if(!b.checkType(c,!0)&&13!=a.keyCode)return a.preventDefault(),a.stopPropagation?a.stopPropagation():a.cancelBubble=!0,!1}-1!=["date","time"].indexOf(b.type)&&setTimeout(function(){b.updateOverlay()},1)},keyDown:function(b,c){var d=this,e=d.options,f=b.keyCode||c&&c.keyCode;if(-1!=["int","float","money","currency","percent"].indexOf(d.type)){if(!e.keyboard||a(d.el).attr("readonly"))return;var g=!1,h=parseFloat(a(d.el).val().replace(e.moneyRE,""))||0,i=e.step;switch((b.ctrlKey||b.metaKey)&&(i=10),f){case 38:if(b.shiftKey)break;a(d.el).val(h+i<=e.max||null===e.max?Number((h+i).toFixed(12)):e.max).change(),g=!0;break;case 40:if(b.shiftKey)break;a(d.el).val(h-i>=e.min||null===e.min?Number((h-i).toFixed(12)):e.min).change(),g=!0}g&&(b.preventDefault(),setTimeout(function(){d.el.setSelectionRange(d.el.value.length,d.el.value.length)},0))}if("date"==d.type){if(!e.keyboard||a(d.el).attr("readonly"))return;var g=!1,j=864e5,i=1;(b.ctrlKey||b.metaKey)&&(i=10);var k=w2utils.isDate(a(d.el).val(),e.format,!0);switch(k||(k=new Date,j=0),f){case 38:if(b.shiftKey)break;var l=w2utils.formatDate(k.getTime()+j,e.format);10==i&&(l=w2utils.formatDate(new Date(k.getFullYear(),k.getMonth()+1,k.getDate()),e.format)),a(d.el).val(l).change(),g=!0;break;case 40:if(b.shiftKey)break;var l=w2utils.formatDate(k.getTime()-j,e.format);10==i&&(l=w2utils.formatDate(new Date(k.getFullYear(),k.getMonth()-1,k.getDate()),e.format)),a(d.el).val(l).change(),g=!0}g&&(b.preventDefault(),setTimeout(function(){d.el.setSelectionRange(d.el.value.length,d.el.value.length),d.updateOverlay()},0))}if("time"==d.type){if(!e.keyboard||a(d.el).attr("readonly"))return;var g=!1,i=b.ctrlKey||b.metaKey?60:1,h=a(d.el).val(),m=d.toMin(h)||d.toMin((new Date).getHours()+":"+((new Date).getMinutes()-1));switch(f){case 38:if(b.shiftKey)break;m+=i,g=!0;break;case 40:if(b.shiftKey)break;m-=i,g=!0}g&&(a(d.el).val(d.fromMin(m)).change(),b.preventDefault(),setTimeout(function(){d.el.setSelectionRange(d.el.value.length,d.el.value.length)},0))}if("color"==d.type){if(a(d.el).attr("readonly"))return;if(86==b.keyCode&&(b.ctrlKey||b.metaKey)&&(a(d.el).prop("maxlength",7),setTimeout(function(){var b=a(d).val();"#"==b.substr(0,1)&&(b=b.substr(1)),w2utils.isHex(b)||(b=""),a(d).val(b).prop("maxlength",6).change()},20)),(b.ctrlKey||b.metaKey)&&!b.shiftKey){if("undefined"==typeof d.tmp.cind1)d.tmp.cind1=-1,d.tmp.cind2=-1;else{switch(f){case 38:d.tmp.cind1--;break;case 40:d.tmp.cind1++;break;case 39:d.tmp.cind2++;break;case 37:d.tmp.cind2--}d.tmp.cind1<0&&(d.tmp.cind1=0),d.tmp.cind1>this.pallete.length-1&&(d.tmp.cind1=this.pallete.length-1),d.tmp.cind2<0&&(d.tmp.cind2=0),d.tmp.cind2>this.pallete[0].length-1&&(d.tmp.cind2=this.pallete[0].length-1)}-1!=[37,38,39,40].indexOf(f)&&(a(d.el).val(this.pallete[d.tmp.cind1][d.tmp.cind2]).change(),b.preventDefault())}}if(-1!=["list","combo","enum"].indexOf(d.type)){if(a(d.el).attr("readonly"))return;var g=!1,n=a(d.el).data("selected"),o=a(d.helpers.focus).find("input");switch("list"==d.type&&-1==[37,38,39,40].indexOf(f)&&d.refresh(),f){case 27:"list"==d.type&&(""!=a(o).val()&&a(o).val(""),b.stopPropagation());break;case 37:case 39:break;case 13:if(0==a("#w2ui-overlay").length)break;var p=e.items[e.index],q=a(d.helpers.multi).find("input");if("enum"==d.type)if(null!=p){var r=d.trigger({phase:"before",type:"add",target:d.el,originalEvent:b.originalEvent,item:p});if(r.isCancelled===!0)return;p=r.item,n.length>=e.max&&e.max>0&&n.pop(),delete p.hidden,delete d.tmp.force_open,n.push(p),a(d.el).change(),q.val("").width(20),d.refresh(),d.trigger(a.extend(r,{phase:"after"}))}else{p={id:q.val(),text:q.val()};var r=d.trigger({phase:"before",type:"new",target:d.el,originalEvent:b.originalEvent,item:p});if(r.isCancelled===!0)return;p=r.item,"function"==typeof d.onNew&&(n.length>=e.max&&e.max>0&&n.pop(),delete d.tmp.force_open,n.push(p),a(d.el).change(),q.val("").width(20),d.refresh()),d.trigger(a.extend(r,{phase:"after"}))}else p&&a(d.el).data("selected",p).val(p.text).change(),""==a(d.el).val()&&a(d.el).data("selected")&&a(d.el).removeData("selected").val("").change(),"list"==d.type&&(o.val(""),d.refresh()),d.tmp.force_hide=!0;break;case 8:case 46:if("enum"==d.type&&8==f&&""==a(d.helpers.multi).find("input").val()&&n.length>0){var p=n[n.length-1],r=d.trigger({phase:"before",type:"remove",target:d.el,originalEvent:b.originalEvent,item:p});if(r.isCancelled===!0)return;n.pop(),a(d.el).trigger("change"),d.refresh(),d.trigger(a.extend(r,{phase:"after"}))}"list"==d.type&&""==a(o).val()&&(a(d.el).data("selected",{}).change(),d.refresh());break;case 38:for(e.index=w2utils.isInt(e.index)?parseInt(e.index):0,e.index--;e.index>0&&e.items[e.index].hidden;)e.index--;if(0==e.index&&e.items[e.index].hidden)for(;e.items[e.index]&&e.items[e.index].hidden;)e.index++;g=!0;break;case 40:for(e.index=w2utils.isInt(e.index)?parseInt(e.index):-1,e.index++;e.index<e.items.length-1&&e.items[e.index].hidden;)e.index++;if(e.index==e.items.length-1&&e.items[e.index].hidden)for(;e.items[e.index]&&e.items[e.index].hidden;)e.index--;var s=d.el;-1!=["enum"].indexOf(d.type)&&(s=d.helpers.multi.find("input")),""==a(s).val()&&0==a("#w2ui-overlay").length?d.tmp.force_open=!0:g=!0}if(g)return e.index<0&&(e.index=0),e.index>=e.items.length&&(e.index=e.items.length-1),d.updateOverlay(),b.preventDefault(),void setTimeout(function(){if("enum"==d.type){var a=d.helpers.multi.find("input").get(0);a.setSelectionRange(a.value.length,a.value.length)}else if("list"==d.type){var a=d.helpers.focus.find("input").get(0);a.setSelectionRange(a.value.length,a.value.length)}else d.el.setSelectionRange(d.el.value.length,d.el.value.length)},0);if("enum"==d.type){var s=d.helpers.multi.find("input"),t=s.val();s.width(8*(t.length+2)+"px")}-1==[16,17,18,20,37,39,91].indexOf(f)&&setTimeout(function(){d.tmp.force_hide||d.request(),d.search()},1)}},keyUp:function(b){"color"==this.type&&86==b.keyCode&&(b.ctrlKey||b.metaKey)&&a(this).prop("maxlength",6)},clearCache:function(){var a=this.options;a.items=[],this.tmp.xhr_loading=!1,this.tmp.xhr_search="",this.tmp.xhr_total=-1,this.search()},request:function(b){var c=this,d=this.options,e=a(c.el).val()||"";if(d.url){if("enum"==c.type){var f=a(c.helpers.multi).find("input");e=0==f.length?"":f.val()}if("list"==c.type){var f=a(c.helpers.focus).find("input");e=0==f.length?"":f.val()}if(0!=d.minLength&&e.length<d.minLength)return d.items=[],void this.updateOverlay();"undefined"==typeof b&&(b=350),"undefined"==typeof c.tmp.xhr_search&&(c.tmp.xhr_search=""),"undefined"==typeof c.tmp.xhr_total&&(c.tmp.xhr_total=-1),d.url&&1!=a(c.el).prop("readonly")&&(0===d.items.length&&0!==c.tmp.xhr_total||c.tmp.xhr_total==d.cacheMax&&e.length>c.tmp.xhr_search.length||e.length>=c.tmp.xhr_search.length&&e.substr(0,c.tmp.xhr_search.length)!=c.tmp.xhr_search||e.length<c.tmp.xhr_search.length)&&(c.tmp.xhr_loading=!0,c.search(),clearTimeout(c.tmp.timeout),c.tmp.timeout=setTimeout(function(){var b=d.url,f={search:e,max:d.cacheMax};a.extend(f,d.postData);var g=c.trigger({phase:"before",type:"request",target:c.el,url:b,postData:f});if(g.isCancelled!==!0){b=g.url,f=g.postData,c.tmp.xhr&&c.tmp.xhr.abort();var h={type:"GET",url:b,data:f,dataType:"JSON"};"JSON"==w2utils.settings.dataType&&(h.type="POST",h.data=JSON.stringify(h.data),h.contentType="application/json"),c.tmp.xhr=a.ajax(h).done(function(b,g,h){var i=c.trigger({phase:"before",type:"load",target:c.el,search:f.search,data:b,xhr:h});if(i.isCancelled!==!0){if(b=i.data,"string"==typeof b&&(b=JSON.parse(b)),"success"!=b.status)return void console.log("ERROR: server did not return proper structure. It should return",{status:"success",items:[{id:1,text:"item"}]});b.items.length>d.cacheMax&&b.items.splice(d.cacheMax,1e5),c.tmp.xhr_loading=!1,c.tmp.xhr_search=e,c.tmp.xhr_total=b.items.length,d.items=c.normMenu(b.items),c.tmp.emptySet=""==e&&0==b.items.length?!0:!1,c.search(),c.trigger(a.extend(i,{phase:"after"}))}}).fail(function(b,d,f){var g={status:d,error:f,rawResponseText:b.responseText},h=c.trigger({phase:"before",type:"error",target:c.el,search:e,error:g,xhr:b});if(h.isCancelled!==!0){if("abort"!=d){var i;try{i=a.parseJSON(b.responseText)}catch(j){}console.log("ERROR: Server communication failed.","\n   EXPECTED:",{status:"success",items:[{id:1,text:"item"}]},"\n         OR:",{status:"error",message:"error message"},"\n   RECEIVED:","object"==typeof i?i:b.responseText)}c.clearCache(),c.trigger(a.extend(h,{phase:"after"}))}}),c.trigger(a.extend(g,{phase:"after"}))}},b))}},search:function(){var b=this,c=this.options,d=a(b.el).val(),e=b.el,f=[],g=a(b.el).data("selected");if("enum"==b.type){e=a(b.helpers.multi).find("input"),d=e.val();for(var h in g)g[h]&&f.push(g[h].id)}if("list"==b.type){e=a(b.helpers.focus).find("input"),d=e.val();for(var h in g)g[h]&&f.push(g[h].id)}var i=b.trigger({phase:"before",type:"search",target:e,search:d});if(i.isCancelled!==!0){if(b.tmp.xhr_loading!==!0){var j=0;for(var k in c.items){var l=c.items[k],m="",n="";-1!=["is","begins"].indexOf(c.match)&&(m="^"),-1!=["is","ends"].indexOf(c.match)&&(n="$");try{var o=new RegExp(m+d+n,"i");l.hidden=o.test(l.text)||"..."==l.text?!1:!0}catch(p){}"enum"==b.type&&-1!=a.inArray(l.id,f)&&(l.hidden=!0),l.hidden!==!0&&j++}if("combo"!=b.type)for(c.index=0;c.items[c.index]&&c.items[c.index].hidden;)c.index++;else c.index=-1;0>=j&&(c.index=-1),c.spinner=!1,b.updateOverlay(),setTimeout(function(){var b=a("#w2ui-overlay").html()||"";c.markSearch&&-1!=b.indexOf("$.fn.w2menuHandler")&&a("#w2ui-overlay").w2marker(d)},1)}else c.items.splice(0,c.cacheMax),c.spinner=!0,b.updateOverlay();b.trigger(a.extend(i,{phase:"after"}))}},updateOverlay:function(){var b=this,c=this.options;if("color"==this.type){if(a(b.el).attr("readonly"))return;0==a("#w2ui-overlay").length?a(b.el).w2overlay(b.getColorHTML()):a("#w2ui-overlay").html(b.getColorHTML()),a("#w2ui-overlay .color").on("mousedown",function(c){var d=a(c.originalEvent.target).attr("name"),e=a(c.originalEvent.target).attr("index").split(":");b.tmp.cind1=e[0],b.tmp.cind2=e[1],a(b.el).val(d).change(),a(this).html("&#149;")}).on("mouseup",function(){setTimeout(function(){a("#w2ui-overlay").length>0&&a("#w2ui-overlay").removeData("keepOpen")[0].hide()},10)})}if("date"==this.type){if(a(b.el).attr("readonly"))return;0==a("#w2ui-overlay").length&&a(b.el).w2overlay('<div class="w2ui-reset w2ui-calendar" onclick="event.stopPropagation();"></div>',{css:{"background-color":"#f5f5f5"}});var d,e,f=w2utils.isDate(a(b.el).val(),b.options.format,!0);f&&(d=f.getMonth()+1,e=f.getFullYear()),function k(c,d){a("#w2ui-overlay > div > div").html(b.getMonthHTML(c,d)),a("#w2ui-overlay .w2ui-calendar-title").on("mousedown",function(){if(a(this).next().hasClass("w2ui-calendar-jump"))a(this).next().remove();
else{var c,d;a(this).after('<div class="w2ui-calendar-jump" style=""></div>'),a(this).next().hide().html(b.getYearHTML()).fadeIn(200),setTimeout(function(){a("#w2ui-overlay .w2ui-calendar-jump").find(".w2ui-jump-month, .w2ui-jump-year").on("click",function(){a(this).hasClass("w2ui-jump-month")&&(a(this).parent().find(".w2ui-jump-month").removeClass("selected"),a(this).addClass("selected"),d=a(this).attr("name")),a(this).hasClass("w2ui-jump-year")&&(a(this).parent().find(".w2ui-jump-year").removeClass("selected"),a(this).addClass("selected"),c=a(this).attr("name")),null!=c&&null!=d&&(a("#w2ui-overlay .w2ui-calendar-jump").fadeOut(100),setTimeout(function(){k(parseInt(d)+1,c)},100))}),a("#w2ui-overlay .w2ui-calendar-jump >:last-child").prop("scrollTop",2e3)},1)}}),a("#w2ui-overlay .w2ui-date").on("mousedown",function(){var c=a(this).attr("date");a(b.el).val(c).change(),a(this).css({"background-color":"#B6D5FB","border-color":"#aaa"})}).on("mouseup",function(){setTimeout(function(){a("#w2ui-overlay").length>0&&a("#w2ui-overlay").removeData("keepOpen")[0].hide()},10)}),a("#w2ui-overlay .previous").on("mousedown",function(){var a=b.options.current.split("/");a[0]=parseInt(a[0])-1,k(a[0],a[1])}),a("#w2ui-overlay .next").on("mousedown",function(){var a=b.options.current.split("/");a[0]=parseInt(a[0])+1,k(a[0],a[1])})}(d,e)}if("time"==this.type){if(a(b.el).attr("readonly"))return;0==a("#w2ui-overlay").length&&a(b.el).w2overlay('<div class="w2ui-reset w2ui-calendar-time" onclick="event.stopPropagation();"></div>',{css:{"background-color":"#fff"}});var g="h24"==this.options.format?!0:!1;a("#w2ui-overlay > div").html(b.getHourHTML()),a("#w2ui-overlay .w2ui-time").on("mousedown",function(){a(this).css({"background-color":"#B6D5FB","border-color":"#aaa"});var c=a(this).attr("hour");a(b.el).val((c>12&&!g?c-12:c)+":00"+(g?"":12>c?" am":" pm")).change()}).on("mouseup",function(){var c=a(this).attr("hour");a("#w2ui-overlay").length>0&&a("#w2ui-overlay")[0].hide(),a(b.el).w2overlay('<div class="w2ui-reset w2ui-calendar-time"></div>',{css:{"background-color":"#fff"}}),a("#w2ui-overlay > div").html(b.getMinHTML(c)),a("#w2ui-overlay .w2ui-time").on("mousedown",function(){a(this).css({"background-color":"#B6D5FB","border-color":"#aaa"});var d=a(this).attr("min");a(b.el).val((c>12&&!g?c-12:c)+":"+(10>d?0:"")+d+(g?"":12>c?" am":" pm")).change()}).on("mouseup",function(){setTimeout(function(){a("#w2ui-overlay").length>0&&a("#w2ui-overlay").removeData("keepOpen")[0].hide()},10)})})}if(-1!=["list","combo","enum"].indexOf(this.type)){var h=this.el,i=this.el;if("enum"==this.type&&(h=a(this.helpers.multi),i=a(h).find("input")),"list"==this.type&&(i=a(this.helpers.focus).find("input")),a(i).is(":focus")){if(c.openOnFocus===!1&&""==a(i).val()&&b.tmp.force_open!==!0)return void a().w2overlay();if(b.tmp.force_hide)return a().w2overlay(),void setTimeout(function(){delete b.tmp.force_hide},1);""!=a(i).val()&&delete b.tmp.force_open,0==a("#w2ui-overlay").length&&(c.index=0);var j=w2utils.lang("No matches");null!=c.url&&a(i).val().length<c.minLength&&b.tmp.emptySet!==!0&&(j=c.minLength+" "+w2utils.lang("letters or more...")),null!=c.url&&""==a(i).val()&&b.tmp.emptySet!==!0&&(j=w2utils.lang("Type to search....")),a(h).w2menu("refresh",a.extend(!0,{},c,{search:!1,render:c.renderDrop,maxHeight:c.maxDropHeight,msgNoItems:j,onSelect:function(d){if("enum"==b.type){var e=a(b.el).data("selected");if(d.item){var f=b.trigger({phase:"before",type:"add",target:b.el,originalEvent:d.originalEvent,item:d.item});if(f.isCancelled===!0)return;e.length>=c.max&&c.max>0&&e.pop(),delete d.item.hidden,e.push(d.item),a(b.el).data("selected",e).change(),a(b.helpers.multi).find("input").val("").width(20),b.refresh(),a("#w2ui-overlay").length>0&&a("#w2ui-overlay")[0].hide(),b.trigger(a.extend(f,{phase:"after"}))}}else a(b.el).data("selected",d.item).val(d.item.text).change(),b.helpers.focus&&b.helpers.focus.find("input").val("")}}))}}},inRange:function(b){var c=!1;if("date"==this.type){var d=w2utils.isDate(b,this.options.format,!0);if(d){if(this.options.start||this.options.end){var e="string"==typeof this.options.start?this.options.start:a(this.options.start).val(),f="string"==typeof this.options.end?this.options.end:a(this.options.end).val(),g=w2utils.isDate(e,this.options.format,!0),h=w2utils.isDate(f,this.options.format,!0),i=new Date(d);g||(g=i),h||(h=i),i>=g&&h>=i&&(c=!0)}else c=!0;this.options.blocked&&-1!=a.inArray(b,this.options.blocked)&&(c=!1)}}if("time"==this.type)if(this.options.start||this.options.end){var j=this.toMin(b),k=this.toMin(this.options.start),l=this.toMin(this.options.end);k||(k=j),l||(l=j),j>=k&&l>=j&&(c=!0)}else c=!0;return c},checkType:function(a,b){var c=this;switch(c.type){case"int":return b&&-1!=["-",c.options.groupSymbol].indexOf(a)?!0:w2utils.isInt(a.replace(c.options.numberRE,""));case"percent":a=a.replace(/%/g,"");case"float":return b&&-1!=["-",w2utils.settings.decimalSymbol,c.options.groupSymbol].indexOf(a)?!0:w2utils.isFloat(a.replace(c.options.numberRE,""));case"money":case"currency":return b&&-1!=["-",c.options.decimalSymbol,c.options.groupSymbol,c.options.currencyPrefix,c.options.currencySuffix].indexOf(a)?!0:w2utils.isFloat(a.replace(c.options.moneyRE,""));case"hex":case"color":return w2utils.isHex(a);case"alphanumeric":return w2utils.isAlphaNumeric(a)}return!0},addPrefix:function(){var b=this;setTimeout(function(){if("clear"!==b.type){var c,d=a(b.el).data("tmp")||{};d["old-padding-left"]&&a(b.el).css("padding-left",d["old-padding-left"]),d["old-padding-left"]=a(b.el).css("padding-left"),a(b.el).data("tmp",d),b.helpers.prefix&&a(b.helpers.prefix).remove(),""!==b.options.prefix&&(a(b.el).before('<div class="w2ui-field-helper">'+b.options.prefix+"</div>"),c=a(b.el).prev(),c.css({color:a(b.el).css("color"),"font-family":a(b.el).css("font-family"),"font-size":a(b.el).css("font-size"),"padding-top":a(b.el).css("padding-top"),"padding-bottom":a(b.el).css("padding-bottom"),"padding-left":a(b.el).css("padding-left"),"padding-right":0,"margin-top":parseInt(a(b.el).css("margin-top"),10)+2+"px","margin-bottom":parseInt(a(b.el).css("margin-bottom"),10)+1+"px","margin-left":a(b.el).css("margin-left"),"margin-right":0}).on("click",function(){if(b.options.icon&&"function"==typeof b.onIconClick){var c=b.trigger({phase:"before",type:"iconClick",target:b.el,el:a(this).find("span.w2ui-icon")[0]});if(c.isCancelled===!0)return;b.trigger(a.extend(c,{phase:"after"}))}else"list"==b.type?a(b.helpers.focus).find("input").focus():a(b.el).focus()}),a(b.el).css("padding-left",c.width()+parseInt(a(b.el).css("padding-left"),10)+"px"),b.helpers.prefix=c)}},1)},addSuffix:function(){var b,c,d=this;setTimeout(function(){if("clear"!==d.type){var e=a(d.el).data("tmp")||{};if(e["old-padding-right"]&&a(d.el).css("padding-right",e["old-padding-right"]),e["old-padding-right"]=a(d.el).css("padding-right"),a(d.el).data("tmp",e),c=parseInt(a(d.el).css("padding-right"),10),d.options.arrows){d.helpers.arrows&&a(d.helpers.arrows).remove(),a(d.el).after('<div class="w2ui-field-helper" style="border: 1px solid transparent">&nbsp;    <div class="w2ui-field-up" type="up">        <div class="arrow-up" type="up"></div>    </div>    <div class="w2ui-field-down" type="down">        <div class="arrow-down" type="down"></div>    </div></div>');{w2utils.getSize(d.el,"height")}b=a(d.el).next(),b.css({color:a(d.el).css("color"),"font-family":a(d.el).css("font-family"),"font-size":a(d.el).css("font-size"),height:a(d.el).height()+parseInt(a(d.el).css("padding-top"),10)+parseInt(a(d.el).css("padding-bottom"),10)+"px",padding:0,"margin-top":parseInt(a(d.el).css("margin-top"),10)+1+"px","margin-bottom":0,"border-left":"1px solid silver"}).css("margin-left","-"+(b.width()+parseInt(a(d.el).css("margin-right"),10)+12)+"px").on("mousedown",function(b){function c(){clearTimeout(a("body").data("_field_update_timer")),a("body").off("mouseup",c)}function e(c){a(d.el).focus(),d.keyDown(a.Event("keydown"),{keyCode:"up"==a(b.target).attr("type")?38:40}),c!==!1&&a("body").data("_field_update_timer",setTimeout(e,60))}a("body").on("mouseup",c),a("body").data("_field_update_timer",setTimeout(e,700)),e(!1)}),c+=b.width()+12,a(d.el).css("padding-right",c+"px"),d.helpers.arrows=b}""!==d.options.suffix&&(d.helpers.suffix&&a(d.helpers.suffix).remove(),a(d.el).after('<div class="w2ui-field-helper">'+d.options.suffix+"</div>"),b=a(d.el).next(),b.css({color:a(d.el).css("color"),"font-family":a(d.el).css("font-family"),"font-size":a(d.el).css("font-size"),"padding-top":a(d.el).css("padding-top"),"padding-bottom":a(d.el).css("padding-bottom"),"padding-left":"3px","padding-right":a(d.el).css("padding-right"),"margin-top":parseInt(a(d.el).css("margin-top"),10)+2+"px","margin-bottom":parseInt(a(d.el).css("margin-bottom"),10)+1+"px"}).on("click",function(){"list"==d.type?a(d.helpers.focus).find("input").focus():a(d.el).focus()}),b.css("margin-left","-"+(w2utils.getSize(b,"width")+parseInt(a(d.el).css("margin-right"),10)+2)+"px"),c+=b.width()+3,a(d.el).css("padding-right",c+"px"),d.helpers.suffix=b)}},1)},addFocus:function(){var b=this,c=(this.options,0);a(b.helpers.focus).remove();var d=a(b.el).attr("tabIndex");d&&-1!=d&&(b.el._tabIndex=d),b.el._tabIndex&&(d=b.el._tabIndex);var e='<div class="w2ui-field-helper">    <div class="w2ui-icon icon-search"></div>    <input type="text" autocomplete="off" tabindex="'+d+'"><div>';a(b.el).attr("tabindex",-1).before(e);var f=a(b.el).prev();b.helpers.focus=f,f.css({width:a(b.el).width(),"margin-top":a(b.el).css("margin-top"),"margin-left":parseInt(a(b.el).css("margin-left"))+parseInt(a(b.el).css("padding-left"))+"px","margin-bottom":a(b.el).css("margin-bottom"),"margin-right":a(b.el).css("margin-right")}).find("input").css({cursor:"default",width:"100%",outline:"none",opacity:1,margin:0,border:"1px solid transparent",padding:a(b.el).css("padding-top"),"padding-left":0,"margin-left":c>0?c+6:0,"background-color":"transparent"}),f.find("input").on("click",function(c){0==a("#w2ui-overlay").length&&b.focus(c),c.stopPropagation()}).on("focus",function(c){a(b.el).css({outline:"auto 5px #7DB4F3","outline-offset":"-2px"}),a(this).val(""),a(b.el).triggerHandler("focus"),c.stopPropagation?c.stopPropagation():c.cancelBubble=!0}).on("blur",function(c){a(b.el).css("outline","none"),a(this).val(""),b.refresh(),a(b.el).triggerHandler("blur"),c.stopPropagation?c.stopPropagation():c.cancelBubble=!0}).on("keyup",function(a){b.keyUp(a)}).on("keydown",function(a){b.keyDown(a)}).on("keypress",function(a){b.keyPress(a)}),f.on("click",function(){a(this).find("input").focus()}),b.refresh()},addMulti:function(){{var b=this;this.options}a(b.helpers.multi).remove();var c="",d="margin-top     : 0px; margin-bottom  : 0px; margin-left    : "+a(b.el).css("margin-left")+"; margin-right   : "+a(b.el).css("margin-right")+"; width          : "+(w2utils.getSize(b.el,"width")-parseInt(a(b.el).css("margin-left"),10)-parseInt(a(b.el).css("margin-right"),10))+"px;";"enum"==b.type&&(c='<div class="w2ui-field-helper w2ui-list" style="'+d+'; box-sizing: border-box">    <div style="padding: 0px; margin: 0px; margin-right: 20px; display: inline-block">    <ul>        <li style="padding-left: 0px; padding-right: 0px" class="nomouse">            <input type="text" style="width: 20px" autocomplete="off" '+(a(b.el).attr("readonly")?"readonly":"")+">        </li>"),"file"==b.type&&(c='<div class="w2ui-field-helper w2ui-list" style="'+d+'; box-sizing: border-box">    <div style="padding: 0px; margin: 0px; margin-right: 20px; display: inline-block">    <ul><li style="padding-left: 0px; padding-right: 0px" class="nomouse"></li></ul>    <input class="file-input" type="file" name="attachment" multiple style="display: none" tabindex="-1">'),a(b.el).before(c).css({"background-color":"transparent","border-color":"transparent"});var e=a(b.el).prev();b.helpers.multi=e,"enum"==b.type&&(a(b.el).attr("tabindex",-1),e.find("input").on("click",function(c){0==a("#w2ui-overlay").length&&b.focus(c),a(b.el).triggerHandler("click")}).on("focus",function(c){a(e).css({outline:"auto 5px #7DB4F3","outline-offset":"-2px"}),a(b.el).triggerHandler("focus"),c.stopPropagation?c.stopPropagation():c.cancelBubble=!0}).on("blur",function(c){a(e).css("outline","none"),a(b.el).triggerHandler("blur"),c.stopPropagation?c.stopPropagation():c.cancelBubble=!0}).on("keyup",function(a){b.keyUp(a)}).on("keydown",function(a){b.keyDown(a)}).on("keypress",function(a){e.find(".w2ui-enum-placeholder").remove(),b.keyPress(a)}),e.on("click",function(){a(this).find("input").focus()})),"file"==b.type&&(a(b.el).css("outline","none"),e.on("click",function(c){a(b.el).focus(),a(b.el).attr("readonly")||(b.blur(c),e.find("input").click())}).on("dragenter",function(){a(b.el).attr("readonly")||a(e).addClass("w2ui-file-dragover")}).on("dragleave",function(c){if(!a(b.el).attr("readonly")){var d=a(c.target).parents(".w2ui-field-helper");0==d.length&&a(e).removeClass("w2ui-file-dragover")}}).on("drop",function(c){if(!a(b.el).attr("readonly")){a(e).removeClass("w2ui-file-dragover");for(var d=c.originalEvent.dataTransfer.files,f=0,g=d.length;g>f;f++)b.addFile.call(b,d[f]);c.preventDefault(),c.stopPropagation()}}).on("dragover",function(a){a.preventDefault(),a.stopPropagation()}),e.find("input").on("click",function(a){a.stopPropagation()}).on("change",function(){if("undefined"!=typeof this.files)for(var a=0,c=this.files.length;c>a;a++)b.addFile.call(b,this.files[a])})),b.refresh()},addFile:function(b){var c,d=this,e=this.options,f=a(d.el).data("selected"),g={name:b.name,type:b.type,modified:b.lastModifiedDate,size:b.size,content:null},h=0,i=0;for(var j in f){if(f[j].name==b.name&&f[j].size==b.size)return;h+=f[j].size,i++}var k=d.trigger({phase:"before",type:"add",target:d.el,file:g,total:i,totalSize:h});if(k.isCancelled!==!0){if(0!==e.maxFileSize&&g.size>e.maxFileSize)return c="Maximum file size is "+w2utils.size(e.maxFileSize),e.silent===!1&&a(d.el).w2tag(c),void console.log("ERROR: "+c);if(0!==e.maxSize&&h+g.size>e.maxSize)return c="Maximum total size is "+w2utils.size(e.maxSize),e.silent===!1&&a(d.el).w2tag(c),void console.log("ERROR: "+c);if(0!==e.max&&i>=e.max)return c="Maximum number of files is "+e.max,e.silent===!1&&a(d.el).w2tag(c),void console.log("ERROR: "+c);if(f.push(g),"undefined"!=typeof FileReader){var l=new FileReader;l.onload=function(){return function(b){var c=b.target.result,e=c.indexOf(",");g.content=c.substr(e+1),d.refresh(),a(d.el).trigger("change"),d.trigger(a.extend(k,{phase:"after"}))}}(),l.readAsDataURL(b)}else d.refresh(),a(d.el).trigger("change")}},normMenu:function(b){if(a.isArray(b)){for(var c=0;c<b.length;c++)"string"==typeof b[c]?b[c]={id:b[c],text:b[c]}:("undefined"!=typeof b[c].text&&"undefined"==typeof b[c].id&&(b[c].id=b[c].text),"undefined"==typeof b[c].text&&"undefined"!=typeof b[c].id&&(b[c].text=b[c].id),"undefined"!=typeof b[c].caption&&(b[c].text=b[c].caption));return b}if("object"==typeof b){var d=[];for(var c in b)d.push({id:c,text:b[c]});return d}},getColorHTML:function(){for(var b='<div class="w2ui-color"><table cellspacing="5">',c=0;8>c;c++){b+="<tr>";for(var d=0;8>d;d++)b+='<td>    <div class="color" style="background-color: #'+this.pallete[c][d]+';" name="'+this.pallete[c][d]+'" index="'+c+":"+d+'">        '+(a(this.el).val()==this.pallete[c][d]?"&#149;":"&nbsp;")+"    </div></td>";b+="</tr>",2>c&&(b+='<tr><td style="height: 8px" colspan="8"></td></tr>')}return b+="</table></div>"},getMonthHTML:function(a,b){var c=new Date,d=w2utils.settings.fullmonths,e=(w2utils.settings.fulldays,["31","28","31","30","31","30","31","31","30","31","30","31"]),f=c.getFullYear()+"/"+(Number(c.getMonth())+1)+"/"+c.getDate();b=w2utils.isInt(b)?parseInt(b):c.getFullYear(),a=w2utils.isInt(a)?parseInt(a):c.getMonth()+1,a>12&&(a-=12,b++),(1>a||0===a)&&(a+=12,b--),e[1]=b/4==Math.floor(b/4)?"29":"28",this.options.current=a+"/"+b,c=new Date(b,a-1,1);for(var g=c.getDay(),h=w2utils.settings.shortdays,i="",j=0,k=h.length;k>j;j++)i+="<td>"+h[j]+"</td>";for(var l='<div class="w2ui-calendar-title title">    <div class="w2ui-calendar-previous previous"> <div></div> </div>    <div class="w2ui-calendar-next next"> <div></div> </div> '+d[a-1]+", "+b+'</div><table class="w2ui-calendar-days" cellspacing="0">    <tr class="w2ui-day-title">'+i+"</tr>    <tr>",m=1,n=1;43>n;n++){if(0===g&&1==n){for(var o=0;6>o;o++)l+='<td class="w2ui-day-empty">&nbsp;</td>';n+=6}else if(g>n||m>e[a-1]){l+='<td class="w2ui-day-empty">&nbsp;</td>',n%7===0&&(l+="</tr><tr>");continue}var p=b+"/"+a+"/"+m,q="";n%7==6&&(q=" w2ui-saturday"),n%7===0&&(q=" w2ui-sunday"),p==f&&(q+=" w2ui-today");var r=m,s="",t="",u=w2utils.formatDate(p,this.options.format);this.options.colored&&void 0!==this.options.colored[u]&&(tmp=this.options.colored[u].split(":"),t="background-color: "+tmp[0]+";",s="color: "+tmp[1]+";"),l+='<td class="'+(this.inRange(u)?"w2ui-date ":"w2ui-blocked")+q+'" style="'+s+t+'" date="'+u+'">'+r+"</td>",(n%7===0||0===g&&1==n)&&(l+="</tr><tr>"),m++}return l+="</tr></table>"},getYearHTML:function(){var a=w2utils.settings.shortmonths,b="",c="";for(var d in a)b+='<div class="w2ui-jump-month" name="'+d+'">'+a[d]+"</div>";for(var e=1950;2020>=e;e++)c+='<div class="w2ui-jump-year" name="'+e+'">'+e+"</div>";return"<div>"+b+"</div><div>"+c+"</div>"},getHourHTML:function(){for(var a=[],b="h24"==this.options.format?!0:!1,c=0;24>c;c++){var d=(c>=12&&!b?c-12:c)+":00"+(b?"":12>c?" am":" pm");12!=c||b||(d="12:00 pm"),a[Math.floor(c/8)]||(a[Math.floor(c/8)]="");var e=this.fromMin(this.toMin(d)),f=this.fromMin(this.toMin(d)+59);a[Math.floor(c/8)]+='<div class="'+(this.inRange(e)||this.inRange(f)?"w2ui-time ":"w2ui-blocked")+'" hour="'+c+'">'+d+"</div>"}var g='<div class="w2ui-calendar-time"><table><tr>    <td>'+a[0]+"</td>    <td>"+a[1]+"</td>    <td>"+a[2]+"</td></tr></table></div>";return g},getMinHTML:function(a){"undefined"==typeof a&&(a=0);for(var b="h24"==this.options.format?!0:!1,c=[],d=0;60>d;d+=5){var e=(a>12&&!b?a-12:a)+":"+(10>d?0:"")+d+" "+(b?"":12>a?"am":"pm"),f=20>d?0:40>d?1:2;c[f]||(c[f]=""),c[f]+='<div class="'+(this.inRange(e)?"w2ui-time ":"w2ui-blocked")+'" min="'+d+'">'+e+"</div>"}var g='<div class="w2ui-calendar-time"><table><tr>    <td>'+c[0]+"</td>    <td>"+c[1]+"</td>    <td>"+c[2]+"</td></tr></table></div>";return g},toMin:function(a){if("string"!=typeof a)return null;var b=a.split(":");return 2!=b.length?null:(b[0]=parseInt(b[0]),b[1]=parseInt(b[1]),-1!=a.indexOf("pm")&&12!=b[0]&&(b[0]+=12),60*b[0]+b[1])},fromMin:function(a){var b="";a>=1440&&(a%=1440),0>a&&(a=1440+a);var c=Math.floor(a/60),d=(10>a%60?"0":"")+a%60;return b=-1!=this.options.format.indexOf("h24")?c+":"+d:(12>=c?c:c-12)+":"+d+" "+(c>=12?"pm":"am")}},a.extend(b.prototype,w2utils.event),w2obj.field=b}(jQuery),function(){var w2form=function(a){this.name=null,this.header="",this.box=null,this.url="",this.routeData={},this.formURL="",this.formHTML="",this.page=0,this.recid=0,this.fields=[],this.actions={},this.record={},this.original={},this.postData={},this.toolbar={},this.tabs={},this.style="",this.focus=0,this.msgNotJSON=w2utils.lang("Return data is not in JSON format."),this.msgAJAXerror=w2utils.lang("AJAX error. See console for more details."),this.msgRefresh=w2utils.lang("Refreshing..."),this.msgSaving=w2utils.lang("Saving..."),this.onRequest=null,this.onLoad=null,this.onValidate=null,this.onSubmit=null,this.onSave=null,this.onChange=null,this.onRender=null,this.onRefresh=null,this.onResize=null,this.onDestroy=null,this.onAction=null,this.onToolbar=null,this.onError=null,this.isGenerated=!1,this.last={xhr:null},$.extend(!0,this,w2obj.form,a)};$.fn.w2form=function(a){if("object"==typeof a||!a){var b=this;if(!w2utils.checkName(a,"w2form"))return;var c=a.record,d=a.original,e=a.fields,f=a.toolbar,g=a.tabs,h=new w2form(a);if($.extend(h,{record:{},original:{},fields:[],tabs:{},toolbar:{},handlers:[]}),$.isArray(g)){$.extend(!0,h.tabs,{tabs:[]});for(var i in g){var j=g[i];h.tabs.tabs.push("object"==typeof j?j:{id:j,caption:j})}}else $.extend(!0,h.tabs,g);$.extend(!0,h.toolbar,f);for(var k in e){var l=$.extend(!0,{},e[k]);"undefined"==typeof l.name&&"undefined"!=typeof l.field&&(l.name=l.field),"undefined"==typeof l.field&&"undefined"!=typeof l.name&&(l.field=l.name),h.fields[k]=l}for(var k in c)h.record[k]=$.isPlainObject(c[k])?$.extend(!0,{},c[k]):c[k];for(var k in d)h.original[k]=$.isPlainObject(d[k])?$.extend(!0,{},d[k]):d[k];return b.length>0&&(h.box=b[0]),""!=h.formURL?$.get(h.formURL,function(a){h.formHTML=a,h.isGenerated=!0,(0!=$(h.box).length||0!=a.length)&&($(h.box).html(a),h.render(h.box))}):""!=h.formHTML||(h.formHTML=0!=$(this).length&&""!=$.trim($(this).html())?$(this).html():h.generateHTML()),w2ui[h.name]=h,""==h.formURL&&(-1==String(h.formHTML).indexOf("w2ui-page")&&(h.formHTML='<div class="w2ui-page page-0">'+h.formHTML+"</div>"),$(h.box).html(h.formHTML),h.isGenerated=!0,h.render(h.box)),h}if(w2ui[$(this).attr("name")]){var b=w2ui[$(this).attr("name")];return b[a].apply(b,Array.prototype.slice.call(arguments,1)),this}console.log("ERROR: Method "+a+" does not exist on jQuery.w2form")},w2form.prototype={get:function(a,b){if(0===arguments.length){var c=[];for(var d in this.fields)null!=this.fields[d].name&&c.push(this.fields[d].name);return c}for(var e in this.fields)if(this.fields[e].name==a)return b===!0?e:this.fields[e];return null},set:function(a,b){for(var c in this.fields)if(this.fields[c].name==a)return $.extend(this.fields[c],b),this.refresh(),!0;return!1},reload:function(a){var b="object"!=typeof this.url?this.url:this.url.get;b&&0!=this.recid?this.request(a):"function"==typeof a&&a()},clear:function(){this.recid=0,this.record={},$().w2tag(),this.refresh()},error:function(a){var b=this.trigger({target:this.name,type:"error",message:a,xhr:this.last.xhr});return b.isCancelled===!0?void("function"==typeof callBack&&callBack()):(setTimeout(function(){w2alert(a,"Error")},1),void this.trigger($.extend(b,{phase:"after"})))},validate:function(a){"undefined"==typeof a&&(a=!0),$().w2tag();var b=[];for(var c in this.fields){var d=this.fields[c];switch(null==this.record[d.name]&&(this.record[d.name]=""),d.type){case"int":this.record[d.name]&&!w2utils.isInt(this.record[d.name])&&b.push({field:d,error:w2utils.lang("Not an integer")});break;case"float":this.record[d.name]&&!w2utils.isFloat(this.record[d.name])&&b.push({field:d,error:w2utils.lang("Not a float")});break;case"money":this.record[d.name]&&!w2utils.isMoney(this.record[d.name])&&b.push({field:d,error:w2utils.lang("Not in money format")});break;case"color":case"hex":this.record[d.name]&&!w2utils.isHex(this.record[d.name])&&b.push({field:d,error:w2utils.lang("Not a hex number")});break;case"email":this.record[d.name]&&!w2utils.isEmail(this.record[d.name])&&b.push({field:d,error:w2utils.lang("Not a valid email")});break;case"checkbox":this.record[d.name]=1==this.record[d.name]?1:0;break;case"date":d.options.format||(d.options.format=w2utils.settings.date_format),this.record[d.name]&&!w2utils.isDate(this.record[d.name],d.options.format)&&b.push({field:d,error:w2utils.lang("Not a valid date")+": "+d.options.format});break;case"list":case"combo":break;case"enum":}var e=this.record[d.name];d.required&&(""===e||$.isArray(e)&&0==e.length||$.isPlainObject(e)&&$.isEmptyObject(e))&&b.push({field:d,error:w2utils.lang("Required field")}),d.equalto&&this.record[d.name]!=this.record[d.equalto]&&b.push({field:d,error:w2utils.lang("Field should be equal to ")+d.equalto})}var f=this.trigger({phase:"before",target:this.name,type:"validate",errors:b});if(f.isCancelled!==!0){if(a)for(var g in f.errors){var h=f.errors[g];"radio"==h.field.type?$($(h.field.el).parents("div")[0]).w2tag(h.error,{"class":"w2ui-error"}):-1!=["enum","file"].indexOf(h.field.type)?!function(a){setTimeout(function(){var b=$(a.field.el).data("w2field").helpers.multi;$(a.field.el).w2tag(a.error),$(b).addClass("w2ui-error")},1)}(h):$(h.field.el).w2tag(h.error,{"class":"w2ui-error"}),this.goto(b[0].field.page)}return this.trigger($.extend(f,{phase:"after"})),b}},getChanges:function(){var a=function(b,c,d){for(var e in b)"object"==typeof b[e]?(d[e]=a(b[e],c[e]||{},{}),(!d[e]||$.isEmptyObject(d[e]))&&delete d[e]):b[e]!=c[e]&&(d[e]=b[e]);return d};return a(this.record,this.original,{})},request:function(postData,callBack){var obj=this;if("function"==typeof postData&&(callBack=postData,postData=null),("undefined"==typeof postData||null==postData)&&(postData={}),this.url&&("object"!=typeof this.url||this.url.get)){(null==this.recid||"undefined"==typeof this.recid)&&(this.recid=0);var params={};params.cmd="get-record",params.recid=this.recid,$.extend(params,this.postData),$.extend(params,postData);var eventData=this.trigger({phase:"before",type:"request",target:this.name,url:this.url,postData:params});if(eventData.isCancelled===!0)return void("function"==typeof callBack&&callBack({status:"error",message:"Request aborted."}));this.record={},this.original={},this.lock(this.msgRefresh);var url=eventData.url;if("object"==typeof eventData.url&&eventData.url.get&&(url=eventData.url.get),this.last.xhr)try{this.last.xhr.abort()}catch(e){}if(!$.isEmptyObject(obj.routeData)){var info=w2utils.parseRoute(url);if(info.keys.length>0)for(var k=0;k<info.keys.length;k++)null!=obj.routeData[info.keys[k].name]&&(url=url.replace(new RegExp(":"+info.keys[k].name,"g"),obj.routeData[info.keys[k].name]))}var ajaxOptions={type:"POST",url:url,data:eventData.postData,dataType:"text"};"HTTP"==w2utils.settings.dataType&&(ajaxOptions.data=String($.param(ajaxOptions.data,!1)).replace(/%5B/g,"[").replace(/%5D/g,"]")),"RESTFULL"==w2utils.settings.dataType&&(ajaxOptions.type="GET",ajaxOptions.data=String($.param(ajaxOptions.data,!1)).replace(/%5B/g,"[").replace(/%5D/g,"]")),"JSON"==w2utils.settings.dataType&&(ajaxOptions.type="POST",ajaxOptions.data=JSON.stringify(ajaxOptions.data),ajaxOptions.contentType="application/json"),this.last.xhr=$.ajax(ajaxOptions).done(function(data,status,xhr){obj.unlock();var eventData=obj.trigger({phase:"before",target:obj.name,type:"load",xhr:xhr});if(eventData.isCancelled===!0)return void("function"==typeof callBack&&callBack({status:"error",message:"Request aborted."}));var data,responseText=obj.last.xhr.responseText;if("error"!=status){if("undefined"!=typeof responseText&&""!=responseText){if("object"==typeof responseText)data=responseText;else try{eval("data = "+responseText)}catch(e){}"undefined"==typeof data&&(data={status:"error",message:obj.msgNotJSON,responseText:responseText}),"error"==data.status?obj.error(data.message):(obj.record=$.extend({},data.record),obj.original=$.extend({},data.record))}}else obj.error("AJAX Error "+xhr.status+": "+xhr.statusText),data={status:"error",message:obj.msgAJAXerror,responseText:responseText};obj.trigger($.extend(eventData,{phase:"after"})),obj.refresh(),"function"==typeof callBack&&callBack(data)}).fail(function(a,b,c){var d={status:b,error:c,rawResponseText:a.responseText},e=obj.trigger({phase:"before",type:"error",error:d,xhr:a});if(e.isCancelled!==!0){if("abort"!=b){var f;try{f=$.parseJSON(a.responseText)}catch(g){}console.log("ERROR: Server communication failed.","\n   EXPECTED:",{status:"success",items:[{id:1,text:"item"}]},"\n         OR:",{status:"error",message:"error message"},"\n   RECEIVED:","object"==typeof f?f:a.responseText)}obj.trigger($.extend(e,{phase:"after"}))}}),this.trigger($.extend(eventData,{phase:"after"}))}},submit:function(a,b){return this.save(a,b)},save:function(postData,callBack){var obj=this;$(this.box).find(":focus").change(),"function"==typeof postData&&(callBack=postData,postData=null);var errors=obj.validate(!0);if(0===errors.length){if(("undefined"==typeof postData||null==postData)&&(postData={}),!obj.url||"object"==typeof obj.url&&!obj.url.save)return void console.log("ERROR: Form cannot be saved because no url is defined.");obj.lock(obj.msgSaving+' <span id="'+obj.name+'_progress"></span>'),setTimeout(function(){var params={};params.cmd="save-record",params.recid=obj.recid,$.extend(params,obj.postData),$.extend(params,postData),params.record=$.extend(!0,{},obj.record);var eventData=obj.trigger({phase:"before",type:"submit",target:obj.name,url:obj.url,postData:params});if(eventData.isCancelled!==!0){var url=eventData.url;if("object"==typeof eventData.url&&eventData.url.save&&(url=eventData.url.save),obj.last.xhr)try{obj.last.xhr.abort()}catch(e){}if(!$.isEmptyObject(obj.routeData)){var info=w2utils.parseRoute(url);if(info.keys.length>0)for(var k=0;k<info.keys.length;k++)null!=obj.routeData[info.keys[k].name]&&(url=url.replace(new RegExp(":"+info.keys[k].name,"g"),obj.routeData[info.keys[k].name]))}var ajaxOptions={type:"POST",url:url,data:eventData.postData,dataType:"text",xhr:function(){var a=new window.XMLHttpRequest;return a.upload.addEventListener("progress",function(a){if(a.lengthComputable){var b=Math.round(a.loaded/a.total*100);$("#"+obj.name+"_progress").text(""+b+"%")}},!1),a}};"HTTP"==w2utils.settings.dataType&&(ajaxOptions.data=String($.param(ajaxOptions.data,!1)).replace(/%5B/g,"[").replace(/%5D/g,"]")),"RESTFULL"==w2utils.settings.dataType&&(0!=obj.recid&&(ajaxOptions.type="PUT"),ajaxOptions.data=String($.param(ajaxOptions.data,!1)).replace(/%5B/g,"[").replace(/%5D/g,"]")),"JSON"==w2utils.settings.dataType&&(ajaxOptions.type="POST",ajaxOptions.data=JSON.stringify(ajaxOptions.data),ajaxOptions.contentType="application/json"),obj.last.xhr=$.ajax(ajaxOptions).done(function(data,status,xhr){obj.unlock();var eventData=obj.trigger({phase:"before",target:obj.name,type:"save",xhr:xhr,status:status});if(eventData.isCancelled!==!0){var data,responseText=xhr.responseText;if("error"!=status){if("undefined"!=typeof responseText&&""!=responseText){if("object"==typeof responseText)data=responseText;else try{eval("data = "+responseText)}catch(e){}"undefined"==typeof data&&(data={status:"error",message:obj.msgNotJSON,responseText:responseText}),"error"==data.status?obj.error(data.message):obj.original=$.extend({},obj.record)}}else obj.error("AJAX Error "+xhr.status+": "+xhr.statusText),data={status:"error",message:obj.msgAJAXerror,responseText:responseText};obj.trigger($.extend(eventData,{phase:"after"})),obj.refresh(),"success"==data.status&&"function"==typeof callBack&&callBack(data)}}).fail(function(a,b,c){var d={status:b,error:c,rawResponseText:a.responseText},e=obj.trigger({phase:"before",type:"error",error:d,xhr:a});e.isCancelled!==!0&&(console.log("ERROR: server communication failed. The server should return",{status:"success"},"OR",{status:"error",message:"error message"},", instead the AJAX request produced this: ",d),obj.trigger($.extend(e,{phase:"after"})))}),obj.trigger($.extend(eventData,{phase:"after"}))}},50)}},lock:function(){var a=$(this.box).find("> div:first-child"),b=Array.prototype.slice.call(arguments,0);b.unshift(a),w2utils.lock.apply(window,b)},unlock:function(){var a=this;setTimeout(function(){w2utils.unlock(a.box)},25)},"goto":function(a){"undefined"!=typeof a&&(this.page=a),$(this.box).data("auto-size")===!0&&$(this.box).height(0),this.refresh()},generateHTML:function(){var a,b=[],c="";for(var d in this.fields){var e="",f=this.fields[d];"undefined"==typeof f.html&&(f.html={}),f.html=$.extend(!0,{caption:"",span:6,attr:"",text:"",page:0},f.html),"undefined"==typeof a&&(a=f.html.page),""==f.html.caption&&(f.html.caption=f.name);var g='<input name="'+f.name+'" type="text" '+f.html.attr+"/>";("pass"===f.type||"password"===f.type)&&(g='<input name="'+f.name+'" type = "password" '+f.html.attr+"/>"),"checkbox"==f.type&&(g='<input name="'+f.name+'" type="checkbox" '+f.html.attr+"/>"),"textarea"==f.type&&(g='<textarea name="'+f.name+'" '+f.html.attr+"></textarea>"),"toggle"==f.type&&(g='<input name="'+f.name+'" type="checkbox" '+f.html.attr+' class="w2ui-toggle"/><div><div></div></div>'),f.html.group&&(""!=c&&(e+="\n   </div>"),e+='\n   <div class="w2ui-group-title">'+f.html.group+'</div>\n   <div class="w2ui-group">',c=f.html.group),f.html.page!=a&&""!=c&&(b[b.length-1]+="\n   </div>",c=""),e+='\n      <div class="w2ui-field '+("undefined"!=typeof f.html.span?"w2ui-span"+f.html.span:"")+'">\n         <label>'+w2utils.lang(f.html.caption)+"</label>\n         <div>"+g+w2utils.lang(f.html.text)+"</div>\n      </div>","undefined"==typeof b[f.html.page]&&(b[f.html.page]=""),b[f.html.page]+=e,a=f.html.page
}if(""!=c&&(b[b.length-1]+="\n   </div>"),this.tabs.tabs)for(var h=0;h<this.tabs.tabs.length;h++)"undefined"==typeof b[h]&&(b[h]="");for(var i in b)b[i]='<div class="w2ui-page page-'+i+'">'+b[i]+"\n</div>";var j="";if(!$.isEmptyObject(this.actions)){var k="";j+='\n<div class="w2ui-buttons">';for(var l in this.actions)k=-1!=["save","update","create"].indexOf(l.toLowerCase())?"btn-green":"",j+='\n    <button name="'+l+'" class="btn '+k+'">'+w2utils.lang(l)+"</button>";j+="\n</div>"}return b.join("")+j},action:function(a,b){var c=this.trigger({phase:"before",target:a,type:"action",originalEvent:b});c.isCancelled!==!0&&("function"==typeof this.actions[a]&&this.actions[a].call(this,b),this.trigger($.extend(c,{phase:"after"})))},resize:function(){function a(){d.width($(b.box).width()).height($(b.box).height()),f.css("top",""!=b.header?w2utils.getSize(e,"height"):0),g.css("top",(""!=b.header?w2utils.getSize(e,"height"):0)+("object"==typeof b.toolbar&&$.isArray(b.toolbar.items)&&b.toolbar.items.length>0?w2utils.getSize(f,"height"):0)),h.css("top",(""!=b.header?w2utils.getSize(e,"height"):0)+("object"==typeof b.toolbar&&$.isArray(b.toolbar.items)&&b.toolbar.items.length>0?w2utils.getSize(f,"height")+5:0)+("object"==typeof b.tabs&&$.isArray(b.tabs.tabs)&&b.tabs.tabs.length>0?w2utils.getSize(g,"height")+5:0)),h.css("bottom",k.length>0?w2utils.getSize(k,"height"):0)}var b=this,c=this.trigger({phase:"before",target:this.name,type:"resize"});if(c.isCancelled!==!0){var d=$(this.box).find("> div"),e=$(this.box).find("> div .w2ui-form-header"),f=$(this.box).find("> div .w2ui-form-toolbar"),g=$(this.box).find("> div .w2ui-form-tabs"),h=$(this.box).find("> div .w2ui-page"),i=$(this.box).find("> div .w2ui-page.page-"+this.page),j=$(this.box).find("> div .w2ui-page.page-"+this.page+" > div"),k=$(this.box).find("> div .w2ui-buttons");a(),(0==parseInt($(this.box).height())||$(this.box).data("auto-size")===!0)&&($(this.box).height((e.length>0?w2utils.getSize(e,"height"):0)+("object"==typeof this.tabs&&$.isArray(this.tabs.tabs)&&this.tabs.tabs.length>0?w2utils.getSize(g,"height"):0)+("object"==typeof this.toolbar&&$.isArray(this.toolbar.items)&&this.toolbar.items.length>0?w2utils.getSize(f,"height"):0)+(h.length>0?w2utils.getSize(j,"height")+w2utils.getSize(i,"+height")+12:0)+(k.length>0?w2utils.getSize(k,"height"):0)),$(this.box).data("auto-size",!0)),a(),b.trigger($.extend(c,{phase:"after"}))}},refresh:function(){var a=(new Date).getTime(),b=this;if(this.box&&this.isGenerated&&"undefined"!=typeof $(this.box).html()){$(this.box).find("input, textarea, select").each(function(a,c){var d=$(c).attr("undefined"!=typeof $(c).attr("name")?"name":"id"),e=b.get(d);if(e){var f=$(c).parents(".w2ui-page");if(f.length>0)for(var g=0;100>g;g++)if(f.hasClass("page-"+g)){e.page=g;break}}});var c=this.trigger({phase:"before",target:this.name,type:"refresh",page:this.page});if(c.isCancelled!==!0){$(this.box).find(".w2ui-page").hide(),$(this.box).find(".w2ui-page.page-"+this.page).show(),$(this.box).find(".w2ui-form-header").html(this.header),"object"==typeof this.tabs&&$.isArray(this.tabs.tabs)&&this.tabs.tabs.length>0?($("#form_"+this.name+"_tabs").show(),this.tabs.active=this.tabs.tabs[this.page].id,this.tabs.refresh()):$("#form_"+this.name+"_tabs").hide(),"object"==typeof this.toolbar&&$.isArray(this.toolbar.items)&&this.toolbar.items.length>0?($("#form_"+this.name+"_toolbar").show(),this.toolbar.refresh()):$("#form_"+this.name+"_toolbar").hide();for(var d in this.fields){var e=this.fields[d];"undefined"==typeof e.name&&"undefined"!=typeof e.field&&(e.name=e.field),"undefined"==typeof e.field&&"undefined"!=typeof e.name&&(e.field=e.name),e.$el=$(this.box).find('[name="'+String(e.name).replace(/\\/g,"\\\\")+'"]'),e.el=e.$el[0],"undefined"==typeof e.el&&console.log('ERROR: Cannot associate field "'+e.name+'" with html control. Make sure html control exists with the same name.'),e.el&&(e.el.id=e.name);var f=$(e).data("w2field");f&&f.clear(),$(e.$el).off("change").on("change",function(){var a=this.value,c=b.record[this.name]?b.record[this.name]:"",d=b.get(this.name);if(-1!=["list","enum","file"].indexOf(d.type)&&$(this).data("selected")){var e=$(this).data("selected"),f=b.record[this.name];if($.isArray(e)){a=[];for(var g in e)a[g]=$.extend(!0,{},e[g])}if($.isPlainObject(e)&&(a=$.extend(!0,{},e)),$.isArray(f)){c=[];for(var g in f)c[g]=$.extend(!0,{},f[g])}$.isPlainObject(f)&&(c=$.extend(!0,{},f))}if(-1!=["toggle","checkbox"].indexOf(d.type)&&(a=$(this).prop("checked")?!0:!1),-1!=["int","float","percent","money","currency"].indexOf(d.type)&&(a=$(this).data("w2field").clean(a)),a!==c){var h=b.trigger({phase:"before",target:this.name,type:"change",value_new:a,value_previous:c});if(h.isCancelled===!0)return void $(this).val(b.record[this.name]);var i=this.value;if("select"==this.type&&(i=this.value),"checkbox"==this.type&&(i=this.checked?!0:!1),"radio"==this.type&&d.$el.each(function(a,b){b.checked&&(i=b.value)}),-1!=["int","float","percent","money","currency","list","combo","enum","file","toggle"].indexOf(d.type)&&(i=a),-1!=["enum","file"].indexOf(d.type)&&i.length>0){var j=$(d.el).data("w2field").helpers.multi;$(j).removeClass("w2ui-error")}b.record[this.name]=i,b.trigger($.extend(h,{phase:"after"}))}}),e.required?$(e.el).parent().parent().addClass("w2ui-required"):$(e.el).parent().parent().removeClass("w2ui-required")}$(this.box).find("button, input[type=button]").each(function(a,c){$(c).off("click").on("click",function(a){var c=this.value;this.id&&(c=this.id),this.name&&(c=this.name),b.action(c,a)})});for(var d in this.fields){var e=this.fields[d],g="undefined"!=typeof this.record[e.name]?this.record[e.name]:"";if(e.el)switch(e.type=String(e.type).toLowerCase(),e.options||(e.options={}),e.type){case"text":case"textarea":case"email":case"pass":case"password":e.el.value=g;break;case"int":case"float":case"money":case"currency":case"percent":case"hex":case"alphanumeric":case"color":case"date":case"time":e.el.value=g,$(e.el).w2field($.extend({},e.options,{type:e.type}));break;case"toggle":w2utils.isFloat(g)&&(g=parseFloat(g)),$(e.el).prop("checked",g?!0:!1),this.record[e.name]=g?1:0;break;case"list":case"combo":if("list"==e.type){var h=$.isPlainObject(g)?g.id:g,i=e.options.items;$.isArray(i)&&i.length>0&&!$.isPlainObject(i[0])&&(e.options.items=w2obj.field.prototype.normMenu(i));for(var j in e.options.items){var k=e.options.items[j];if(k.id==h){g=$.extend(!0,{},k),b.record[e.name]=g;break}}}else e.el.value="combo"!=e.type||$.isPlainObject(g)?$.isPlainObject(g)&&"undefined"!=typeof g.text?g.text:"":g;$.isPlainObject(g)||(g={}),$(e.el).w2field($.extend({},e.options,{type:e.type,selected:g}));break;case"enum":case"file":$.isArray(g)||(g=[]),$(e.el).w2field($.extend({},e.options,{type:e.type,selected:g}));break;case"select":var i=e.options.items;if("undefined"!=typeof i&&i.length>0){i=w2obj.field.prototype.normMenu(i),$(e.el).html("");for(var l in i)$(e.el).append('<option value="'+i[l].id+'">'+i[l].text+"</option")}$(e.el).val(g);break;case"radio":$(e.$el).prop("checked",!1).each(function(a,b){$(b).val()==g&&$(b).prop("checked",!0)});break;case"checkbox":$(e.el).prop("checked",g?!0:!1);break;default:$(e.el).w2field($.extend({},e.options,{type:e.type}))}}for(var f=$(this.box).find(".w2ui-page"),j=0;j<f.length;j++)$(f[j]).find("> *").length>1&&$(f[j]).wrapInner("<div></div>");return this.trigger($.extend(c,{phase:"after"})),this.resize(),(new Date).getTime()-a}}},render:function(a){function b(){var a=$(d.box).find("input, select, textarea");a.length>d.focus&&a[d.focus].focus()}var c=(new Date).getTime(),d=this;if("object"==typeof a&&($(this.box).find("#form_"+this.name+"_tabs").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-form").html(""),this.box=a),this.isGenerated&&this.box){var e=this.trigger({phase:"before",target:this.name,type:"render",box:"undefined"!=typeof a?a:this.box});if(e.isCancelled!==!0){$.isEmptyObject(this.original)&&!$.isEmptyObject(this.record)&&(this.original=$.extend(!0,{},this.record));var f="<div>"+(""!=this.header?'<div class="w2ui-form-header">'+this.header+"</div>":"")+'    <div id="form_'+this.name+'_toolbar" class="w2ui-form-toolbar"></div>    <div id="form_'+this.name+'_tabs" class="w2ui-form-tabs"></div>'+this.formHTML+"</div>";$(this.box).attr("name",this.name).addClass("w2ui-reset w2ui-form").html(f),$(this.box).length>0&&($(this.box)[0].style.cssText+=this.style),"function"!=typeof this.toolbar.render&&(this.toolbar=$().w2toolbar($.extend({},this.toolbar,{name:this.name+"_toolbar",owner:this})),this.toolbar.on("click",function(a){var b=d.trigger({phase:"before",type:"toolbar",target:a.target,originalEvent:a});b.isCancelled!==!0&&d.trigger($.extend(b,{phase:"after"}))})),"object"==typeof this.toolbar&&"function"==typeof this.toolbar.render&&this.toolbar.render($("#form_"+this.name+"_toolbar")[0]),"function"!=typeof this.tabs.render&&(this.tabs=$().w2tabs($.extend({},this.tabs,{name:this.name+"_tabs",owner:this})),this.tabs.on("click",function(a){d.goto(this.get(a.target,!0))})),"object"==typeof this.tabs&&"function"==typeof this.tabs.render&&this.tabs.render($("#form_"+this.name+"_tabs")[0]),this.trigger($.extend(e,{phase:"after"})),this.resize();var g="object"!=typeof this.url?this.url:this.url.get;return g&&0!=this.recid?this.request():this.refresh(),0==$(".w2ui-layout").length&&(this.tmp_resize=function(){w2ui[d.name].resize()},$(window).off("resize","body").on("resize","body",this.tmp_resize)),setTimeout(function(){d.resize(),d.refresh()},150),this.focus>=0&&setTimeout(b,500),(new Date).getTime()-c}}},destroy:function(){var a=this.trigger({phase:"before",target:this.name,type:"destroy"});a.isCancelled!==!0&&("object"==typeof this.toolbar&&this.toolbar.destroy&&this.toolbar.destroy(),"object"==typeof this.tabs&&this.tabs.destroy&&this.tabs.destroy(),$(this.box).find("#form_"+this.name+"_tabs").length>0&&$(this.box).removeAttr("name").removeClass("w2ui-reset w2ui-form").html(""),delete w2ui[this.name],this.trigger($.extend(a,{phase:"after"})),$(window).off("resize","body"))}},$.extend(w2form.prototype,w2utils.event),w2obj.form=w2form}();
//! moment.js
//! version : 2.12.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Zc.apply(null,arguments)}function b(a){Zc=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ia(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!(isNaN(a._d.getTime())||!(b.overflow<0)||b.empty||b.invalidMonth||b.invalidWeekday||b.nullInput||b.invalidFormat||b.userInvalidated),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),$c.length>0)for(c in $c)d=$c[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),_c===!1&&(_c=!0,a.updateOffset(this),_c=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function u(a,b){var c=!0;return g(function(){return c&&(t(a+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),c=!1),b.apply(this,arguments)},b)}function v(a,b){ad[a]||(t(b),ad[a]=!0)}function w(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function x(a){return"[object Object]"===Object.prototype.toString.call(a)}function y(a){var b,c;for(c in a)b=a[c],w(b)?this[c]=b:this["_"+c]=b;this._config=a,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function z(a,b){var c,d=g({},a);for(c in b)f(b,c)&&(x(a[c])&&x(b[c])?(d[c]={},g(d[c],a[c]),g(d[c],b[c])):null!=b[c]?d[c]=b[c]:delete d[c]);return d}function A(a){null!=a&&this.set(a)}function B(a){return a?a.toLowerCase().replace("_","-"):a}function C(a){for(var b,c,d,e,f=0;f<a.length;){for(e=B(a[f]).split("-"),b=e.length,c=B(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=D(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function D(a){var b=null;if(!cd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=bd._abbr,require("./locale/"+a),E(b)}catch(c){}return cd[a]}function E(a,b){var c;return a&&(c=m(b)?H(a):F(a,b),c&&(bd=c)),bd._abbr}function F(a,b){return null!==b?(b.abbr=a,null!=cd[a]?(v("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"),b=z(cd[a]._config,b)):null!=b.parentLocale&&(null!=cd[b.parentLocale]?b=z(cd[b.parentLocale]._config,b):v("parentLocaleUndefined","specified parentLocale is not defined yet")),cd[a]=new A(b),E(a),cd[a]):(delete cd[a],null)}function G(a,b){if(null!=b){var c;null!=cd[a]&&(b=z(cd[a]._config,b)),c=new A(b),c.parentLocale=cd[a],cd[a]=c,E(a)}else null!=cd[a]&&(null!=cd[a].parentLocale?cd[a]=cd[a].parentLocale:null!=cd[a]&&delete cd[a]);return cd[a]}function H(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return bd;if(!c(a)){if(b=D(a))return b;a=[a]}return C(a)}function I(){return Object.keys(cd)}function J(a,b){var c=a.toLowerCase();dd[c]=dd[c+"s"]=dd[b]=a}function K(a){return"string"==typeof a?dd[a]||dd[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)f(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(b,c){return function(d){return null!=d?(O(this,b,d),a.updateOffset(this,c),this):N(this,b)}}function N(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function O(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function P(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=K(a),w(this[a]))return this[a](b);return this}function Q(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function R(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(hd[a]=e),b&&(hd[b[0]]=function(){return Q(e.apply(this,arguments),b[1],b[2])}),c&&(hd[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function S(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function T(a){var b,c,d=a.match(ed);for(b=0,c=d.length;c>b;b++)hd[d[b]]?d[b]=hd[d[b]]:d[b]=S(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function U(a,b){return a.isValid()?(b=V(b,a.localeData()),gd[b]=gd[b]||T(b),gd[b](a)):a.localeData().invalidDate()}function V(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(fd.lastIndex=0;d>=0&&fd.test(a);)a=a.replace(fd,c),fd.lastIndex=0,d-=1;return a}function W(a,b,c){zd[a]=w(b)?b:function(a,d){return a&&c?c:b}}function X(a,b){return f(zd,a)?zd[a](b._strict,b._locale):new RegExp(Y(a))}function Y(a){return Z(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function Z(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function $(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)Ad[a[c]]=d}function _(a,b){$(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function aa(a,b,c){null!=b&&f(Ad,a)&&Ad[a](b,c._a,c,a)}function ba(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function ca(a,b){return c(this._months)?this._months[a.month()]:this._months[Kd.test(b)?"format":"standalone"][a.month()]}function da(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Kd.test(b)?"format":"standalone"][a.month()]}function ea(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function fa(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=r(b);else if(b=a.localeData().monthsParse(b),"number"!=typeof b)return a;return c=Math.min(a.date(),ba(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ga(b){return null!=b?(fa(this,b),a.updateOffset(this,!0),this):N(this,"Month")}function ha(){return ba(this.year(),this.month())}function ia(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ka.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ja(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ka.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function ka(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=Z(d[b]),e[b]=Z(e[b]),f[b]=Z(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")$","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")$","i")}function la(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[Cd]<0||c[Cd]>11?Cd:c[Dd]<1||c[Dd]>ba(c[Bd],c[Cd])?Dd:c[Ed]<0||c[Ed]>24||24===c[Ed]&&(0!==c[Fd]||0!==c[Gd]||0!==c[Hd])?Ed:c[Fd]<0||c[Fd]>59?Fd:c[Gd]<0||c[Gd]>59?Gd:c[Hd]<0||c[Hd]>999?Hd:-1,j(a)._overflowDayOfYear&&(Bd>b||b>Dd)&&(b=Dd),j(a)._overflowWeeks&&-1===b&&(b=Id),j(a)._overflowWeekday&&-1===b&&(b=Jd),j(a).overflow=b),a}function ma(a){var b,c,d,e,f,g,h=a._i,i=Pd.exec(h)||Qd.exec(h);if(i){for(j(a).iso=!0,b=0,c=Sd.length;c>b;b++)if(Sd[b][1].exec(i[1])){e=Sd[b][0],d=Sd[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Td.length;c>b;b++)if(Td[b][1].exec(i[3])){f=(i[2]||" ")+Td[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Rd.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),Ba(a)}else a._isValid=!1}function na(b){var c=Ud.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(ma(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function oa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function pa(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function qa(a){return ra(a)?366:365}function ra(a){return a%4===0&&a%100!==0||a%400===0}function sa(){return ra(this.year())}function ta(a,b,c){var d=7+b-c,e=(7+pa(a,0,d).getUTCDay()-b)%7;return-e+d-1}function ua(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ta(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=qa(f)+j):j>qa(a)?(f=a+1,g=j-qa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function va(a,b,c){var d,e,f=ta(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+wa(e,b,c)):g>wa(a.year(),b,c)?(d=g-wa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function wa(a,b,c){var d=ta(a,b,c),e=ta(a+1,b,c);return(qa(a)-d+e)/7}function xa(a,b,c){return null!=a?a:null!=b?b:c}function ya(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function za(a){var b,c,d,e,f=[];if(!a._d){for(d=ya(a),a._w&&null==a._a[Dd]&&null==a._a[Cd]&&Aa(a),a._dayOfYear&&(e=xa(a._a[Bd],d[Bd]),a._dayOfYear>qa(e)&&(j(a)._overflowDayOfYear=!0),c=pa(e,0,a._dayOfYear),a._a[Cd]=c.getUTCMonth(),a._a[Dd]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[Ed]&&0===a._a[Fd]&&0===a._a[Gd]&&0===a._a[Hd]&&(a._nextDay=!0,a._a[Ed]=0),a._d=(a._useUTC?pa:oa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Ed]=24)}}function Aa(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=xa(b.GG,a._a[Bd],va(Ja(),1,4).year),d=xa(b.W,1),e=xa(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=xa(b.gg,a._a[Bd],va(Ja(),f,g).year),d=xa(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>wa(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=ua(c,d,e,f,g),a._a[Bd]=h.year,a._dayOfYear=h.dayOfYear)}function Ba(b){if(b._f===a.ISO_8601)return void ma(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=V(b._f,b._locale).match(ed)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(X(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),hd[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),aa(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[Ed]<=12&&b._a[Ed]>0&&(j(b).bigHour=void 0),b._a[Ed]=Ca(b._locale,b._a[Ed],b._meridiem),za(b),la(b)}function Ca(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function Da(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],Ba(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Ea(a){if(!a._d){var b=L(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),za(a)}}function Fa(a){var b=new o(la(Ga(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ga(a){var b=a._i,e=a._f;return a._locale=a._locale||H(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(la(b)):(c(e)?Da(a):e?Ba(a):d(b)?a._d=b:Ha(a),k(a)||(a._d=null),a))}function Ha(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(+f):"string"==typeof f?na(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),za(b)):"object"==typeof f?Ea(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ia(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Fa(f)}function Ja(a,b,c,d){return Ia(a,b,c,d,!1)}function Ka(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ja();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function La(){var a=[].slice.call(arguments,0);return Ka("isBefore",a)}function Ma(){var a=[].slice.call(arguments,0);return Ka("isAfter",a)}function Na(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=H(),this._bubble()}function Oa(a){return a instanceof Na}function Pa(a,b){R(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+Q(~~(a/60),2)+b+Q(~~a%60,2)})}function Qa(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(Zd)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Ra(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?+b:+Ja(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Ja(b).local()}function Sa(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ta(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=Qa(wd,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Sa(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?ib(this,cb(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Sa(this):null!=b?this:NaN}function Ua(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Va(a){return this.utcOffset(0,a)}function Wa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Sa(this),"m")),this}function Xa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Qa(vd,this._i)),this}function Ya(a){return this.isValid()?(a=a?Ja(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function Za(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function $a(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ga(a),a._a){var b=a._isUTC?h(a._a):Ja(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function _a(){return this.isValid()?!this._isUTC:!1}function ab(){return this.isValid()?this._isUTC:!1}function bb(){return this.isValid()?this._isUTC&&0===this._offset:!1}function cb(a,b){var c,d,e,g=a,h=null;return Oa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=$d.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[Dd])*c,h:r(h[Ed])*c,m:r(h[Fd])*c,s:r(h[Gd])*c,ms:r(h[Hd])*c}):(h=_d.exec(a))?(c="-"===h[1]?-1:1,g={y:db(h[2],c),M:db(h[3],c),w:db(h[4],c),d:db(h[5],c),h:db(h[6],c),m:db(h[7],c),s:db(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=fb(Ja(g.from),Ja(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Na(g),Oa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function db(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function eb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function fb(a,b){var c;return a.isValid()&&b.isValid()?(b=Ra(b,a),a.isBefore(b)?c=eb(a,b):(c=eb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function gb(a){return 0>a?-1*Math.round(-1*a):Math.round(a)}function hb(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(v(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=cb(c,d),ib(this,e,a),this}}function ib(b,c,d,e){var f=c._milliseconds,g=gb(c._days),h=gb(c._months);b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&O(b,"Date",N(b,"Date")+g*d),h&&fa(b,N(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function jb(a,b){var c=a||Ja(),d=Ra(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(w(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ja(c)))}function kb(){return new o(this)}function lb(a,b){var c=p(a)?a:Ja(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?+this>+c:+c<+this.clone().startOf(b)):!1}function mb(a,b){var c=p(a)?a:Ja(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?+c>+this:+this.clone().endOf(b)<+c):!1}function nb(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function ob(a,b){var c,d=p(a)?a:Ja(a);return this.isValid()&&d.isValid()?(b=K(b||"millisecond"),"millisecond"===b?+this===+d:(c=+d,+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))):!1}function pb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function qb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function rb(a,b,c){var d,e,f,g;return this.isValid()?(d=Ra(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=sb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function sb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function tb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ub(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?w(Date.prototype.toISOString)?this.toDate().toISOString():U(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):U(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function vb(b){var c=U(this,b||a.defaultFormat);return this.localeData().postformat(c)}function wb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ja(a).isValid())?cb({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function xb(a){return this.from(Ja(),a)}function yb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ja(a).isValid())?cb({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function zb(a){return this.to(Ja(),a)}function Ab(a){var b;return void 0===a?this._locale._abbr:(b=H(a),null!=b&&(this._locale=b),this)}function Bb(){return this._locale}function Cb(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function Db(a){return a=K(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function Eb(){return+this._d-6e4*(this._offset||0)}function Fb(){return Math.floor(+this/1e3)}function Gb(){return this._offset?new Date(+this):this._d}function Hb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Ib(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Jb(){return this.isValid()?this.toISOString():null}function Kb(){return k(this)}function Lb(){return g({},j(this))}function Mb(){return j(this).overflow}function Nb(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Ob(a,b){R(0,[a,a.length],0,b)}function Pb(a){return Tb.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Qb(a){return Tb.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Rb(){return wa(this.year(),1,4)}function Sb(){var a=this.localeData()._week;return wa(this.year(),a.dow,a.doy)}function Tb(a,b,c,d,e){var f;return null==a?va(this,d,e).year:(f=wa(a,d,e),b>f&&(b=f),Ub.call(this,a,b,c,d,e))}function Ub(a,b,c,d,e){var f=ua(a,b,c,d,e),g=pa(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Vb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Wb(a){return va(a,this._week.dow,this._week.doy).week}function Xb(){return this._week.dow}function Yb(){return this._week.doy}function Zb(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function $b(a){var b=va(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function _b(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function ac(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function bc(a){return this._weekdaysShort[a.day()]}function cc(a){return this._weekdaysMin[a.day()]}function dc(a,b,c){var d,e,f;for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=Ja([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function ec(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=_b(a,this.localeData()),this.add(a-b,"d")):b}function fc(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function gc(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function hc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function ic(){return this.hours()%12||12}function jc(a,b){R(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function kc(a,b){return b._meridiemParse}function lc(a){return"p"===(a+"").toLowerCase().charAt(0)}function mc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function nc(a,b){b[Hd]=r(1e3*("0."+a))}function oc(){return this._isUTC?"UTC":""}function pc(){return this._isUTC?"Coordinated Universal Time":""}function qc(a){return Ja(1e3*a)}function rc(){return Ja.apply(null,arguments).parseZone()}function sc(a,b,c){var d=this._calendar[a];return w(d)?d.call(b,c):d}function tc(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function uc(){return this._invalidDate}function vc(a){return this._ordinal.replace("%d",a)}function wc(a){return a}function xc(a,b,c,d){var e=this._relativeTime[c];return w(e)?e(a,b,c,d):e.replace(/%d/i,a)}function yc(a,b){var c=this._relativeTime[a>0?"future":"past"];return w(c)?c(b):c.replace(/%s/i,b)}function zc(a,b,c,d){var e=H(),f=h().set(d,b);return e[c](f,a)}function Ac(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return zc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=zc(a,f,c,e);return g}function Bc(a,b){return Ac(a,b,"months",12,"month")}function Cc(a,b){return Ac(a,b,"monthsShort",12,"month")}function Dc(a,b){return Ac(a,b,"weekdays",7,"day")}function Ec(a,b){return Ac(a,b,"weekdaysShort",7,"day")}function Fc(a,b){return Ac(a,b,"weekdaysMin",7,"day")}function Gc(){var a=this._data;return this._milliseconds=xe(this._milliseconds),this._days=xe(this._days),this._months=xe(this._months),a.milliseconds=xe(a.milliseconds),a.seconds=xe(a.seconds),a.minutes=xe(a.minutes),a.hours=xe(a.hours),a.months=xe(a.months),a.years=xe(a.years),this}function Hc(a,b,c,d){var e=cb(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Ic(a,b){return Hc(this,a,b,1)}function Jc(a,b){return Hc(this,a,b,-1)}function Kc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Lc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Kc(Nc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Mc(g)),h+=e,g-=Kc(Nc(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Mc(a){return 4800*a/146097}function Nc(a){return 146097*a/4800}function Oc(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Mc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Nc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Pc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Qc(a){return function(){return this.as(a)}}function Rc(a){return a=K(a),this[a+"s"]()}function Sc(a){return function(){return this._data[a]}}function Tc(){return q(this.days()/7)}function Uc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Vc(a,b,c){var d=cb(a).abs(),e=Ne(d.as("s")),f=Ne(d.as("m")),g=Ne(d.as("h")),h=Ne(d.as("d")),i=Ne(d.as("M")),j=Ne(d.as("y")),k=e<Oe.s&&["s",e]||1>=f&&["m"]||f<Oe.m&&["mm",f]||1>=g&&["h"]||g<Oe.h&&["hh",g]||1>=h&&["d"]||h<Oe.d&&["dd",h]||1>=i&&["M"]||i<Oe.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,Uc.apply(null,k)}function Wc(a,b){return void 0===Oe[a]?!1:void 0===b?Oe[a]:(Oe[a]=b,!0)}function Xc(a){var b=this.localeData(),c=Vc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Yc(){var a,b,c,d=Pe(this._milliseconds)/1e3,e=Pe(this._days),f=Pe(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var Zc,$c=a.momentProperties=[],_c=!1,ad={};a.suppressDeprecationWarnings=!1;var bd,cd={},dd={},ed=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,fd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,gd={},hd={},id=/\d/,jd=/\d\d/,kd=/\d{3}/,ld=/\d{4}/,md=/[+-]?\d{6}/,nd=/\d\d?/,od=/\d\d\d\d?/,pd=/\d\d\d\d\d\d?/,qd=/\d{1,3}/,rd=/\d{1,4}/,sd=/[+-]?\d{1,6}/,td=/\d+/,ud=/[+-]?\d+/,vd=/Z|[+-]\d\d:?\d\d/gi,wd=/Z|[+-]\d\d(?::?\d\d)?/gi,xd=/[+-]?\d+(\.\d{1,3})?/,yd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,zd={},Ad={},Bd=0,Cd=1,Dd=2,Ed=3,Fd=4,Gd=5,Hd=6,Id=7,Jd=8;R("M",["MM",2],"Mo",function(){return this.month()+1}),R("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),R("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),W("M",nd),W("MM",nd,jd),W("MMM",function(a,b){return b.monthsShortRegex(a)}),W("MMMM",function(a,b){return b.monthsRegex(a)}),$(["M","MM"],function(a,b){b[Cd]=r(a)-1}),$(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[Cd]=e:j(c).invalidMonth=a});var Kd=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Ld="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Md="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Nd=yd,Od=yd,Pd=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Qd=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Rd=/Z|[+-]\d\d(?::?\d\d)?/,Sd=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Td=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ud=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=u("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),R("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),R(0,["YY",2],0,function(){return this.year()%100}),R(0,["YYYY",4],0,"year"),R(0,["YYYYY",5],0,"year"),R(0,["YYYYYY",6,!0],0,"year"),J("year","y"),W("Y",ud),W("YY",nd,jd),W("YYYY",rd,ld),W("YYYYY",sd,md),W("YYYYYY",sd,md),$(["YYYYY","YYYYYY"],Bd),$("YYYY",function(b,c){c[Bd]=2===b.length?a.parseTwoDigitYear(b):r(b);
}),$("YY",function(b,c){c[Bd]=a.parseTwoDigitYear(b)}),$("Y",function(a,b){b[Bd]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var Vd=M("FullYear",!1);a.ISO_8601=function(){};var Wd=u("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ja.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),Xd=u("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ja.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),Yd=function(){return Date.now?Date.now():+new Date};Pa("Z",":"),Pa("ZZ",""),W("Z",wd),W("ZZ",wd),$(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Qa(wd,a)});var Zd=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var $d=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,_d=/^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;cb.fn=Na.prototype;var ae=hb(1,"add"),be=hb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var ce=u("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});R(0,["gg",2],0,function(){return this.weekYear()%100}),R(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ob("gggg","weekYear"),Ob("ggggg","weekYear"),Ob("GGGG","isoWeekYear"),Ob("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),W("G",ud),W("g",ud),W("GG",nd,jd),W("gg",nd,jd),W("GGGG",rd,ld),W("gggg",rd,ld),W("GGGGG",sd,md),W("ggggg",sd,md),_(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),_(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),R("Q",0,"Qo","quarter"),J("quarter","Q"),W("Q",id),$("Q",function(a,b){b[Cd]=3*(r(a)-1)}),R("w",["ww",2],"wo","week"),R("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),W("w",nd),W("ww",nd,jd),W("W",nd),W("WW",nd,jd),_(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var de={dow:0,doy:6};R("D",["DD",2],"Do","date"),J("date","D"),W("D",nd),W("DD",nd,jd),W("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),$(["D","DD"],Dd),$("Do",function(a,b){b[Dd]=r(a.match(nd)[0],10)});var ee=M("Date",!0);R("d",0,"do","day"),R("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),R("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),R("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),R("e",0,0,"weekday"),R("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),W("d",nd),W("e",nd),W("E",nd),W("dd",yd),W("ddd",yd),W("dddd",yd),_(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),_(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var fe="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),ge="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),he="Su_Mo_Tu_We_Th_Fr_Sa".split("_");R("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),W("DDD",qd),W("DDDD",kd),$(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),R("H",["HH",2],0,"hour"),R("h",["hh",2],0,ic),R("hmm",0,0,function(){return""+ic.apply(this)+Q(this.minutes(),2)}),R("hmmss",0,0,function(){return""+ic.apply(this)+Q(this.minutes(),2)+Q(this.seconds(),2)}),R("Hmm",0,0,function(){return""+this.hours()+Q(this.minutes(),2)}),R("Hmmss",0,0,function(){return""+this.hours()+Q(this.minutes(),2)+Q(this.seconds(),2)}),jc("a",!0),jc("A",!1),J("hour","h"),W("a",kc),W("A",kc),W("H",nd),W("h",nd),W("HH",nd,jd),W("hh",nd,jd),W("hmm",od),W("hmmss",pd),W("Hmm",od),W("Hmmss",pd),$(["H","HH"],Ed),$(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),$(["h","hh"],function(a,b,c){b[Ed]=r(a),j(c).bigHour=!0}),$("hmm",function(a,b,c){var d=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d)),j(c).bigHour=!0}),$("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d,2)),b[Gd]=r(a.substr(e)),j(c).bigHour=!0}),$("Hmm",function(a,b,c){var d=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d))}),$("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d,2)),b[Gd]=r(a.substr(e))});var ie=/[ap]\.?m?\.?/i,je=M("Hours",!0);R("m",["mm",2],0,"minute"),J("minute","m"),W("m",nd),W("mm",nd,jd),$(["m","mm"],Fd);var ke=M("Minutes",!1);R("s",["ss",2],0,"second"),J("second","s"),W("s",nd),W("ss",nd,jd),$(["s","ss"],Gd);var le=M("Seconds",!1);R("S",0,0,function(){return~~(this.millisecond()/100)}),R(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),R(0,["SSS",3],0,"millisecond"),R(0,["SSSS",4],0,function(){return 10*this.millisecond()}),R(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),R(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),R(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),R(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),R(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),W("S",qd,id),W("SS",qd,jd),W("SSS",qd,kd);var me;for(me="SSSS";me.length<=9;me+="S")W(me,td);for(me="S";me.length<=9;me+="S")$(me,nc);var ne=M("Milliseconds",!1);R("z",0,0,"zoneAbbr"),R("zz",0,0,"zoneName");var oe=o.prototype;oe.add=ae,oe.calendar=jb,oe.clone=kb,oe.diff=rb,oe.endOf=Db,oe.format=vb,oe.from=wb,oe.fromNow=xb,oe.to=yb,oe.toNow=zb,oe.get=P,oe.invalidAt=Mb,oe.isAfter=lb,oe.isBefore=mb,oe.isBetween=nb,oe.isSame=ob,oe.isSameOrAfter=pb,oe.isSameOrBefore=qb,oe.isValid=Kb,oe.lang=ce,oe.locale=Ab,oe.localeData=Bb,oe.max=Xd,oe.min=Wd,oe.parsingFlags=Lb,oe.set=P,oe.startOf=Cb,oe.subtract=be,oe.toArray=Hb,oe.toObject=Ib,oe.toDate=Gb,oe.toISOString=ub,oe.toJSON=Jb,oe.toString=tb,oe.unix=Fb,oe.valueOf=Eb,oe.creationData=Nb,oe.year=Vd,oe.isLeapYear=sa,oe.weekYear=Pb,oe.isoWeekYear=Qb,oe.quarter=oe.quarters=Vb,oe.month=ga,oe.daysInMonth=ha,oe.week=oe.weeks=Zb,oe.isoWeek=oe.isoWeeks=$b,oe.weeksInYear=Sb,oe.isoWeeksInYear=Rb,oe.date=ee,oe.day=oe.days=ec,oe.weekday=fc,oe.isoWeekday=gc,oe.dayOfYear=hc,oe.hour=oe.hours=je,oe.minute=oe.minutes=ke,oe.second=oe.seconds=le,oe.millisecond=oe.milliseconds=ne,oe.utcOffset=Ta,oe.utc=Va,oe.local=Wa,oe.parseZone=Xa,oe.hasAlignedHourOffset=Ya,oe.isDST=Za,oe.isDSTShifted=$a,oe.isLocal=_a,oe.isUtcOffset=ab,oe.isUtc=bb,oe.isUTC=bb,oe.zoneAbbr=oc,oe.zoneName=pc,oe.dates=u("dates accessor is deprecated. Use date instead.",ee),oe.months=u("months accessor is deprecated. Use month instead",ga),oe.years=u("years accessor is deprecated. Use year instead",Vd),oe.zone=u("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Ua);var pe=oe,qe={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},re={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},se="Invalid date",te="%d",ue=/\d{1,2}/,ve={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},we=A.prototype;we._calendar=qe,we.calendar=sc,we._longDateFormat=re,we.longDateFormat=tc,we._invalidDate=se,we.invalidDate=uc,we._ordinal=te,we.ordinal=vc,we._ordinalParse=ue,we.preparse=wc,we.postformat=wc,we._relativeTime=ve,we.relativeTime=xc,we.pastFuture=yc,we.set=y,we.months=ca,we._months=Ld,we.monthsShort=da,we._monthsShort=Md,we.monthsParse=ea,we._monthsRegex=Od,we.monthsRegex=ja,we._monthsShortRegex=Nd,we.monthsShortRegex=ia,we.week=Wb,we._week=de,we.firstDayOfYear=Yb,we.firstDayOfWeek=Xb,we.weekdays=ac,we._weekdays=fe,we.weekdaysMin=cc,we._weekdaysMin=he,we.weekdaysShort=bc,we._weekdaysShort=ge,we.weekdaysParse=dc,we.isPM=lc,we._meridiemParse=ie,we.meridiem=mc,E("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=u("moment.lang is deprecated. Use moment.locale instead.",E),a.langData=u("moment.langData is deprecated. Use moment.localeData instead.",H);var xe=Math.abs,ye=Qc("ms"),ze=Qc("s"),Ae=Qc("m"),Be=Qc("h"),Ce=Qc("d"),De=Qc("w"),Ee=Qc("M"),Fe=Qc("y"),Ge=Sc("milliseconds"),He=Sc("seconds"),Ie=Sc("minutes"),Je=Sc("hours"),Ke=Sc("days"),Le=Sc("months"),Me=Sc("years"),Ne=Math.round,Oe={s:45,m:45,h:22,d:26,M:11},Pe=Math.abs,Qe=Na.prototype;Qe.abs=Gc,Qe.add=Ic,Qe.subtract=Jc,Qe.as=Oc,Qe.asMilliseconds=ye,Qe.asSeconds=ze,Qe.asMinutes=Ae,Qe.asHours=Be,Qe.asDays=Ce,Qe.asWeeks=De,Qe.asMonths=Ee,Qe.asYears=Fe,Qe.valueOf=Pc,Qe._bubble=Lc,Qe.get=Rc,Qe.milliseconds=Ge,Qe.seconds=He,Qe.minutes=Ie,Qe.hours=Je,Qe.days=Ke,Qe.weeks=Tc,Qe.months=Le,Qe.years=Me,Qe.humanize=Xc,Qe.toISOString=Yc,Qe.toString=Yc,Qe.toJSON=Yc,Qe.locale=Ab,Qe.localeData=Bb,Qe.toIsoString=u("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Yc),Qe.lang=ce,R("X",0,0,"unix"),R("x",0,0,"valueOf"),W("x",ud),W("X",xd),$("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),$("x",function(a,b,c){c._d=new Date(r(a))}),a.version="2.12.0",b(Ja),a.fn=pe,a.min=La,a.max=Ma,a.now=Yd,a.utc=h,a.unix=qc,a.months=Bc,a.isDate=d,a.locale=E,a.invalid=l,a.duration=cb,a.isMoment=p,a.weekdays=Dc,a.parseZone=rc,a.localeData=H,a.isDuration=Oa,a.monthsShort=Cc,a.weekdaysMin=Fc,a.defineLocale=F,a.updateLocale=G,a.locales=I,a.weekdaysShort=Ec,a.normalizeUnits=K,a.relativeTimeThreshold=Wc,a.prototype=pe;var Re=a;return Re});
;(function(window, undefined){
	"use strict"

	var _valueRanges = {
			rgb:   {r: [0, 255], g: [0, 255], b: [0, 255]},
			hsv:   {h: [0, 360], s: [0, 100], v: [0, 100]},
			hsl:   {h: [0, 360], s: [0, 100], l: [0, 100]},
			cmy:   {c: [0, 100], m: [0, 100], y: [0, 100]},
			cmyk:  {c: [0, 100], m: [0, 100], y: [0, 100], k: [0, 100]},
			Lab:   {L: [0, 100], a: [-128, 127], b: [-128, 127]},
			XYZ:   {X: [0, 100], Y: [0, 100], Z: [0, 100]},
			alpha: {alpha: [0, 1]},
			HEX:   {HEX: [0, 16777215]} // maybe we don't need this
		},

		_instance = {},
		_colors = {},

		// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html for more
		XYZMatrix = { // Observer = 2° (CIE 1931), Illuminant = D65 
			X: [ 0.4124564,  0.3575761,  0.1804375],
			Y: [ 0.2126729,  0.7151522,  0.0721750],
			Z: [ 0.0193339,  0.1191920,  0.9503041],
			R: [ 3.2404542, -1.5371385, -0.4985314],
			G: [-0.9692660,  1.8760108,  0.0415560],
			B: [ 0.0556434, -0.2040259,  1.0572252]
		},
		grey = {r: 0.298954, g: 0.586434, b: 0.114612}, // CIE-XYZ 1931
		luminance = {r: 0.2126, g: 0.7152, b: 0.0722}, // W3C 2.0

		_math = Math,
		_parseint = parseInt,

		Colors = window.Colors = function(options) {
			this.colors = {RND: {}};
			this.options = {
				color: 'rgba(204, 82, 37, 0.8)', // init value(s)...
				XYZMatrix: XYZMatrix,
				// XYZReference: {},
				grey: grey,
				luminance: luminance,
				valueRanges: _valueRanges
				// customBG: '#808080'
				// convertCallback: undefined,
				// allMixDetails: false
			};
			initInstance(this, options || {});
		},
		initInstance = function(THIS, options) {
			var matrix,
				importColor,
				_options = THIS.options,
				customBG;

			focusInstance(THIS);
			for (var option in options) {
				if (options[option] !== undefined) _options[option] = options[option];
			}
			matrix = _options.XYZMatrix;
			if (!options.XYZReference) _options.XYZReference = {
				X: matrix.X[0] + matrix.X[1] + matrix.X[2],
				Y: matrix.Y[0] + matrix.Y[1] + matrix.Y[2],
				Z: matrix.Z[0] + matrix.Z[1] + matrix.Z[2]
			};
			customBG = _options.customBG;
			_options.customBG = (typeof customBG === 'string') ? ColorConverter.txt2color(customBG).rgb : customBG;
			_colors = setColor(THIS.colors, _options.color, undefined, true); // THIS.colors = _colors = 
		},
		focusInstance = function(THIS) {
			if (_instance !== THIS) {
				_instance = THIS;
				_colors = THIS.colors;
			}
		};

	Colors.prototype.setColor = function(newCol, type, alpha) {
		focusInstance(this);
		if (newCol) {
			return setColor(this.colors, newCol, type, undefined, alpha);
		} else {
			if (alpha !== undefined) {
				this.colors.alpha = limitValue(alpha, 0, 1);
			}
			return convertColors(type);
		}
	};

	Colors.prototype.getColor = function(type) {
		var result = this.colors, n = 0;

		if (type) {
			type = type.split('.');
			while (result[type[n]]) {
				result = result[type[n++]];
			}
			if (type.length !== n) {
				result = undefined;
			}
		}
		return result;
	};

	Colors.prototype.setCustomBackground = function(col) { // wild gues,... check again...
		focusInstance(this); // needed???
		this.options.customBG = (typeof col === 'string') ? ColorConverter.txt2color(col).rgb : col;
		// return setColor(this.colors, this.options.customBG, 'rgb', true); // !!!!RGB
		return setColor(this.colors, undefined, 'rgb'); // just recalculate existing
	};

	Colors.prototype.saveAsBackground = function() { // alpha
		focusInstance(this); // needed???
		// return setColor(this.colors, this.colors.RND.rgb, 'rgb', true);
		return setColor(this.colors, undefined, 'rgb', true);
	};

	Colors.prototype.convertColor = function(color, type) {
		var convert = ColorConverter,
			ranges = _valueRanges,
			types = type.split('2'),
			fromType = types[0],	
			toType = types[1],
			test = /(?:RG|HS|CM|LA)/,
			normalizeFrom = test.test(fromType),
			normalizeTo = test.test(toType),
			exceptions = {LAB: 'Lab'},
			normalize = function(color, type, reverse) {
				var result = {},
					Lab = type === 'Lab' ? 1 : 0;

				for (var n in color) { // faster (but bigger) way: if/else outside 2 for loops
					result[n] = reverse ?
						_math.round(color[n] * (Lab || ranges[type][n][1])) :
						color[n] / (Lab || ranges[type][n][1]);
				}
				
				return result;
			};

		fromType = ranges[fromType] ? fromType : exceptions[fromType] || fromType.toLowerCase();
		toType = ranges[toType] ? toType : exceptions[toType] || toType.toLowerCase();

		if (normalizeFrom && type !== 'RGB2HEX') { // from ABC to abc
			color = normalize(color, fromType);
		}
		color = fromType === toType ? color : ( // same type; returns same/normalized version
			convert[fromType + '2' + toType] ? convert[fromType + '2' + toType](color, true) : // existing converter
			toType === 'HEX' ? convert.RGB2HEX(type === 'RGB2HEX' ? color : normalize(fromType === 'rgb' ? color : 
				convert[fromType + '2rgb'](color, true), 'rgb', true)) :
 			convert['rgb2' + toType](convert[fromType + '2rgb'](color, true), true) // not in ColorConverter
		);
		if (normalizeTo) { // from abc to ABC
			color = normalize(color, toType, true);
		}

		return color;
	};

	// ------------------------------------------------------ //
	// ---------- Color calculation related stuff  ---------- //
	// -------------------------------------------------------//

	function setColor(colors, color, type, save, alpha) { // color only full range
		if (typeof color === 'string') {
			var color = ColorConverter.txt2color(color); // new object
			type = color.type;
			_colors[type] = color[type];
			alpha = alpha !== undefined ? alpha : color.alpha;
		} else if (color) {
			for (var n in color) {
				colors[type][n] = limitValue(color[n] / _valueRanges[type][n][1], 0 , 1);
			}
		}
		if (alpha !== undefined) {
			colors.alpha = limitValue(+alpha, 0, 1);
		}
		return convertColors(type, save ? colors : undefined);
	}

	function saveAsBackground(RGB, rgb, alpha) {
		var grey = _instance.options.grey,
			color = {};

		color.RGB = {r: RGB.r, g: RGB.g, b: RGB.b};
		color.rgb = {r: rgb.r, g: rgb.g, b: rgb.b};
		color.alpha = alpha;
		// color.RGBLuminance = getLuminance(RGB);
		color.equivalentGrey = _math.round(grey.r * RGB.r + grey.g * RGB.g + grey.b * RGB.b);

		color.rgbaMixBlack = mixColors(rgb, {r: 0, g: 0, b: 0}, alpha, 1);
		color.rgbaMixWhite = mixColors(rgb, {r: 1, g: 1, b: 1}, alpha, 1);
		color.rgbaMixBlack.luminance = getLuminance(color.rgbaMixBlack, true);
		color.rgbaMixWhite.luminance = getLuminance(color.rgbaMixWhite, true);

		if (_instance.options.customBG) {
			color.rgbaMixCustom = mixColors(rgb, _instance.options.customBG, alpha, 1);
			color.rgbaMixCustom.luminance = getLuminance(color.rgbaMixCustom, true);
			_instance.options.customBG.luminance = getLuminance(_instance.options.customBG, true);
		}

		return color;
	}

	function convertColors(type, colorObj) {
		// console.time('convertColors');
		var _Math = _math,
			colors = colorObj || _colors,
			convert = ColorConverter,
			options = _instance.options,
			ranges = _valueRanges,
			RND = colors.RND,
			// type = colorType, // || _mode.type,
			modes, mode = '', from = '', // value = '',
			exceptions = {hsl: 'hsv', cmyk: 'cmy', rgb: type},
			RGB = RND.rgb, SAVE, SMART;

		if (type !== 'alpha') {
			for (var typ in ranges) {
				if (!ranges[typ][typ]) { // no alpha|HEX
					if (type !== typ && typ !== 'XYZ') {
						from = exceptions[typ] || 'rgb';
						colors[typ] = convert[from + '2' + typ](colors[from]);
					}

					if (!RND[typ]) RND[typ] = {};
					modes = colors[typ];
					for(mode in modes) {
						RND[typ][mode] = _Math.round(modes[mode] * (typ === 'Lab' ? 1 : ranges[typ][mode][1]));
					}
				}
			}
			if (type !== 'Lab') {
				delete colors._rgb;
			}

			RGB = RND.rgb;
			colors.HEX = convert.RGB2HEX(RGB);
			colors.equivalentGrey =
				options.grey.r * colors.rgb.r +
				options.grey.g * colors.rgb.g +
				options.grey.b * colors.rgb.b;
			colors.webSave = SAVE = getClosestWebColor(RGB, 51);
			// colors.webSave.HEX = convert.RGB2HEX(colors.webSave);
			colors.webSmart = SMART = getClosestWebColor(RGB, 17);
			// colors.webSmart.HEX = convert.RGB2HEX(colors.webSmart);
			colors.saveColor =
				RGB.r === SAVE.r && RGB.g === SAVE.g && RGB.b === SAVE.b  ? 'web save' :
				RGB.r === SMART.r && RGB.g === SMART.g && RGB.b === SMART.b  ? 'web smart' : '';
			colors.hueRGB = convert.hue2RGB(colors.hsv.h);

			if (colorObj) {
				colors.background = saveAsBackground(RGB, colors.rgb, colors.alpha);
			}
		} // else RGB = RND.rgb;

		var rgb = colors.rgb, // for better minification...
			alpha = colors.alpha,
			luminance = 'luminance',
			background = colors.background,
			rgbaMixBlack, rgbaMixWhite, rgbaMixCustom, 
			rgbaMixBG, rgbaMixBGMixBlack, rgbaMixBGMixWhite, rgbaMixBGMixCustom,
			_mixColors = mixColors,
			_getLuminance = getLuminance,
			_getWCAG2Ratio = getWCAG2Ratio,
			_getHueDelta = getHueDelta;

		rgbaMixBlack = _mixColors(rgb, {r: 0, g: 0, b: 0}, alpha, 1);
		rgbaMixBlack[luminance] = _getLuminance(rgbaMixBlack, true);
		colors.rgbaMixBlack = rgbaMixBlack;

		rgbaMixWhite = _mixColors(rgb, {r: 1, g: 1, b: 1}, alpha, 1);
		rgbaMixWhite[luminance] = _getLuminance(rgbaMixWhite, true);
		colors.rgbaMixWhite = rgbaMixWhite;

		if (options.allMixDetails) {
			rgbaMixBlack.WCAG2Ratio = _getWCAG2Ratio(rgbaMixBlack[luminance], 0);
			rgbaMixWhite.WCAG2Ratio = _getWCAG2Ratio(rgbaMixWhite[luminance], 1);

			if (options.customBG) {
				rgbaMixCustom = _mixColors(rgb, options.customBG, alpha, 1);
				rgbaMixCustom[luminance] = _getLuminance(rgbaMixCustom, true);
				rgbaMixCustom.WCAG2Ratio = _getWCAG2Ratio(rgbaMixCustom[luminance], options.customBG[luminance]);
				colors.rgbaMixCustom = rgbaMixCustom;
			}

			rgbaMixBG = _mixColors(rgb, background.rgb, alpha, background.alpha);
			rgbaMixBG[luminance] = _getLuminance(rgbaMixBG, true); // ?? do we need this?
			colors.rgbaMixBG = rgbaMixBG;

			rgbaMixBGMixBlack = _mixColors(rgb, background.rgbaMixBlack, alpha, 1);
			rgbaMixBGMixBlack[luminance] = _getLuminance(rgbaMixBGMixBlack, true);
			rgbaMixBGMixBlack.WCAG2Ratio = _getWCAG2Ratio(rgbaMixBGMixBlack[luminance],
				background.rgbaMixBlack[luminance]);
			/* ------ */
			rgbaMixBGMixBlack.luminanceDelta = _Math.abs(
				rgbaMixBGMixBlack[luminance] - background.rgbaMixBlack[luminance]);
			rgbaMixBGMixBlack.hueDelta = _getHueDelta(background.rgbaMixBlack, rgbaMixBGMixBlack, true);
			/* ------ */
			colors.rgbaMixBGMixBlack = rgbaMixBGMixBlack;

			rgbaMixBGMixWhite = _mixColors(rgb, background.rgbaMixWhite, alpha, 1);
			rgbaMixBGMixWhite[luminance] = _getLuminance(rgbaMixBGMixWhite, true);
			rgbaMixBGMixWhite.WCAG2Ratio = _getWCAG2Ratio(rgbaMixBGMixWhite[luminance],
				background.rgbaMixWhite[luminance]);
			/* ------ */
			rgbaMixBGMixWhite.luminanceDelta = _Math.abs(
				rgbaMixBGMixWhite[luminance] - background.rgbaMixWhite[luminance]);
			rgbaMixBGMixWhite.hueDelta = _getHueDelta(background.rgbaMixWhite, rgbaMixBGMixWhite, true);
			/* ------ */
			colors.rgbaMixBGMixWhite = rgbaMixBGMixWhite;
		}

		if (options.customBG) {
			rgbaMixBGMixCustom = _mixColors(rgb, background.rgbaMixCustom, alpha, 1);
			rgbaMixBGMixCustom[luminance] = _getLuminance(rgbaMixBGMixCustom, true);
			rgbaMixBGMixCustom.WCAG2Ratio = _getWCAG2Ratio(rgbaMixBGMixCustom[luminance],
				background.rgbaMixCustom[luminance]);
			colors.rgbaMixBGMixCustom = rgbaMixBGMixCustom;
			/* ------ */
			rgbaMixBGMixCustom.luminanceDelta = _Math.abs(
				rgbaMixBGMixCustom[luminance] - background.rgbaMixCustom[luminance]);
			rgbaMixBGMixCustom.hueDelta = _getHueDelta(background.rgbaMixCustom, rgbaMixBGMixCustom, true);
			/* ------ */
		}

		colors.RGBLuminance = _getLuminance(RGB);
		colors.HUELuminance = _getLuminance(colors.hueRGB);

		// renderVars.readyToRender = true;
		if (options.convertCallback) {
			options.convertCallback(colors, type); //, convert); //, _mode);
		}

		// console.timeEnd('convertColors')
		// if (colorObj)
		return colors;
	}


	// ------------------------------------------------------ //
	// ------------------ color conversion ------------------ //
	// -------------------------------------------------------//

	var ColorConverter = {
		txt2color: function(txt) {
			var color = {},
				parts = txt.replace(/(?:#|\)|%)/g, '').split('('),
				values = (parts[1] || '').split(/,\s*/),
				type = parts[1] ? parts[0].substr(0, 3) : 'rgb',
				m = '';

			color.type = type;
			color[type] = {};
			if (parts[1]) {
				for (var n = 3; n--; ) {
					m = type[n] || type.charAt(n); // IE7
					color[type][m] = +values[n] / _valueRanges[type][m][1];
				}
			} else {
				color.rgb = ColorConverter.HEX2rgb(parts[0]);
			}
			// color.color = color[type];
			color.alpha = values[3] ? +values[3] : 1;

			return color;
		},

		RGB2HEX: function(RGB) {
			return (
				(RGB.r < 16 ? '0' : '') + RGB.r.toString(16) +
				(RGB.g < 16 ? '0' : '') + RGB.g.toString(16) +
				(RGB.b < 16 ? '0' : '') + RGB.b.toString(16)
			).toUpperCase();
		},

		HEX2rgb: function(HEX) {
			var _parseInt = _parseint;

			HEX = HEX.split(''); // IE7
			return {
				r: _parseInt(HEX[0] + HEX[HEX[3] ? 1 : 0], 16) / 255,
				g: _parseInt(HEX[HEX[3] ? 2 : 1] + (HEX[3] || HEX[1]), 16) / 255,
				b: _parseInt((HEX[4] || HEX[2]) + (HEX[5] || HEX[2]), 16) / 255
			};
		},

		hue2RGB: function(hue) {
			var _Math = _math,
				h = hue * 6,
				mod = ~~h % 6, // Math.floor(h) -> faster in most browsers
				i = h === 6 ? 0 : (h - mod);

			return {
				r: _Math.round([1, 1 - i, 0, 0, i, 1][mod] * 255),
				g: _Math.round([i, 1, 1, 1 - i, 0, 0][mod] * 255),
				b: _Math.round([0, 0, i, 1, 1, 1 - i][mod] * 255)
			};
		},

		// ------------------------ HSV ------------------------ //

		rgb2hsv: function(rgb) { // faster
			var _Math = _math,
				r = rgb.r,
				g = rgb.g,
				b = rgb.b,
				k = 0, chroma, min, s;

			if (g < b) {
				g = b + (b = g, 0);
				k = -1;
			}
			min = b;
			if (r < g) {
				r = g + (g = r, 0);
				k = -2 / 6 - k;
				min = _Math.min(g, b); // g < b ? g : b; ???
			}
			chroma = r - min;
			s = r ? (chroma / r) : 0;
			return {
				h: s < 1e-15 ? ((_colors && _colors.hsl && _colors.hsl.h) || 0) :
					chroma ? _Math.abs(k + (g - b) / (6 * chroma)) : 0,
				s: r ? (chroma / r) : ((_colors && _colors.hsv && _colors.hsv.s) || 0), // ??_colors.hsv.s || 0
				v: r
			};
		},

		hsv2rgb: function(hsv) {
			var h = hsv.h * 6,
				s = hsv.s,
				v = hsv.v,
				i = ~~h, // Math.floor(h) -> faster in most browsers
				f = h - i,
				p = v * (1 - s),
				q = v * (1 - f * s),
				t = v * (1 - (1 - f) * s),
				mod = i % 6;

			return {
				r: [v, q, p, p, t, v][mod],
				g: [t, v, v, q, p, p][mod],
				b: [p, p, t, v, v, q][mod]
			};
		},

		// ------------------------ HSL ------------------------ //

		hsv2hsl: function(hsv) {
			var l = (2 - hsv.s) * hsv.v,
				s = hsv.s * hsv.v;

			s = !hsv.s ? 0 : l < 1 ? (l ? s / l : 0) : s / (2 - l);

			return {
				h: hsv.h,
				s: !hsv.v && !s ? ((_colors && _colors.hsl && _colors.hsl.s) || 0) : s, // ???
				l: l / 2
			};
		},

		rgb2hsl: function(rgb, dependent) { // not used in Color
			var hsv = ColorConverter.rgb2hsv(rgb);

			return ColorConverter.hsv2hsl(dependent ? hsv : (_colors.hsv = hsv));
		},

		hsl2rgb: function(hsl) {
			var h = hsl.h * 6,
				s = hsl.s,
				l = hsl.l,
				v = l < 0.5 ? l * (1 + s) : (l + s) - (s * l),
				m = l + l - v,
				sv = v ? ((v - m) / v) : 0,
				sextant = ~~h, // Math.floor(h) -> faster in most browsers
				fract = h - sextant,
				vsf = v * sv * fract,
				t = m + vsf,
				q = v - vsf,
				mod = sextant % 6;

			return {
				r: [v, q, m, m, t, v][mod],
				g: [t, v, v, q, m, m][mod],
				b: [m, m, t, v, v, q][mod]
			};
		},

		// ------------------------ CMYK ------------------------ //
		// Quote from Wikipedia:
		// "Since RGB and CMYK spaces are both device-dependent spaces, there is no 
		// simple or general conversion formula that converts between them.  
		// Conversions are generally done through color management systems, using 
		// color profiles that describe the spaces being converted. Nevertheless, the 
		// conversions cannot be exact, since these spaces have very different gamuts."
		// Translation: the following are just simple RGB to CMY(K) and visa versa conversion functions.

		rgb2cmy: function(rgb) {
			return {
				c: 1 - rgb.r,
				m: 1 - rgb.g,
				y: 1 - rgb.b
			};
		},

		cmy2cmyk: function(cmy) {
			var _Math = _math,
				k = _Math.min(_Math.min(cmy.c, cmy.m), cmy.y),
				t = 1 - k || 1e-20;

			return { // regular
				c: (cmy.c - k) / t,
				m: (cmy.m - k) / t,
				y: (cmy.y - k) / t,
				k: k
			};
		},

		cmyk2cmy: function(cmyk) {
			var k = cmyk.k;

			return { // regular
				c: cmyk.c * (1 - k) + k,
				m: cmyk.m * (1 - k) + k,
				y: cmyk.y * (1 - k) + k
			};
		},

		cmy2rgb: function(cmy) {
			return {
				r: 1 - cmy.c,
				g: 1 - cmy.m,
				b: 1 - cmy.y
			};
		},

		rgb2cmyk: function(rgb, dependent) {
			var cmy = ColorConverter.rgb2cmy(rgb); // doppelt??

			return ColorConverter.cmy2cmyk(dependent ? cmy : (_colors.cmy = cmy));
		},

		cmyk2rgb: function(cmyk, dependent) {
			var cmy = ColorConverter.cmyk2cmy(cmyk); // doppelt??

			return ColorConverter.cmy2rgb(dependent ? cmy : (_colors.cmy = cmy));
		},

		// ------------------------ LAB ------------------------ //

		XYZ2rgb: function(XYZ, skip) {
			var _Math = _math,
				M = _instance.options.XYZMatrix,
				X = XYZ.X,
				Y = XYZ.Y,
				Z = XYZ.Z,
				r = X * M.R[0] + Y * M.R[1] + Z * M.R[2],
				g = X * M.G[0] + Y * M.G[1] + Z * M.G[2],
				b = X * M.B[0] + Y * M.B[1] + Z * M.B[2],
				N = 1 / 2.4;

			M = 0.0031308;

			r = (r > M ? 1.055 * _Math.pow(r, N) - 0.055 : 12.92 * r);
			g = (g > M ? 1.055 * _Math.pow(g, N) - 0.055 : 12.92 * g);
			b = (b > M ? 1.055 * _Math.pow(b, N) - 0.055 : 12.92 * b);

			if (!skip) { // out of gammut
				_colors._rgb = {r: r, g: g, b: b};
			}

			return {
				r: limitValue(r, 0, 1),
				g: limitValue(g, 0, 1),
				b: limitValue(b, 0, 1)
			};
		},

		rgb2XYZ: function(rgb) {
			var _Math = _math,
				M = _instance.options.XYZMatrix,
				r = rgb.r,
				g = rgb.g,
				b = rgb.b,
				N = 0.04045;

			r = (r > N ? _Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92);
			g = (g > N ? _Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92);
			b = (b > N ? _Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92);

			return {
				X: r * M.X[0] + g * M.X[1] + b * M.X[2],
				Y: r * M.Y[0] + g * M.Y[1] + b * M.Y[2],
				Z: r * M.Z[0] + g * M.Z[1] + b * M.Z[2]
			};
		},

		XYZ2Lab: function(XYZ) {
			var _Math = _math,
				R = _instance.options.XYZReference,
				X = XYZ.X / R.X,
				Y = XYZ.Y / R.Y,
				Z = XYZ.Z / R.Z,
				N = 16 / 116, M = 1 / 3, K = 0.008856, L = 7.787037;

			X = X > K ? _Math.pow(X, M) : (L * X) + N;
			Y = Y > K ? _Math.pow(Y, M) : (L * Y) + N;
			Z = Z > K ? _Math.pow(Z, M) : (L * Z) + N;

			return {
				L: (116 * Y) - 16,
				a: 500 * (X - Y),
				b: 200 * (Y - Z)
			};
		},

		Lab2XYZ: function(Lab) {
			var _Math = _math,
				R = _instance.options.XYZReference,
				Y = (Lab.L + 16) / 116,
				X = Lab.a / 500 + Y,
				Z = Y - Lab.b / 200,
				X3 = _Math.pow(X, 3),
				Y3 = _Math.pow(Y, 3),
				Z3 = _Math.pow(Z, 3),
				N = 16 / 116, K = 0.008856, L = 7.787037;

			return {
				X: (X3 > K ? X3 : (X - N) / L) * R.X,
				Y: (Y3 > K ? Y3 : (Y - N) / L) * R.Y,
				Z: (Z3 > K ? Z3 : (Z - N) / L) * R.Z
			};
		},

		rgb2Lab: function(rgb, dependent) {
			var XYZ = ColorConverter.rgb2XYZ(rgb);

			return ColorConverter.XYZ2Lab(dependent ? XYZ : (_colors.XYZ = XYZ));
		},

		Lab2rgb: function(Lab, dependent) {
			var XYZ = ColorConverter.Lab2XYZ(Lab);

			return ColorConverter.XYZ2rgb(dependent ? XYZ : (_colors.XYZ = XYZ), dependent);
		}
	};

	// ------------------------------------------------------ //
	// ------------------ helper functions ------------------ //
	// -------------------------------------------------------//

	function getClosestWebColor(RGB, val) {
		var out = {},
			tmp = 0,
			half = val / 2;

		for (var n in RGB) {
			tmp = RGB[n] % val; // 51 = 'web save', 17 = 'web smart'
			out[n] = RGB[n] + (tmp > half ? val - tmp : -tmp);
		}
		return out;
	}

	function getHueDelta(rgb1, rgb2, nominal) {
		var _Math = _math;

		return (_Math.max(rgb1.r - rgb2.r, rgb2.r - rgb1.r) +
				_Math.max(rgb1.g - rgb2.g, rgb2.g - rgb1.g) +
				_Math.max(rgb1.b - rgb2.b, rgb2.b - rgb1.b)) * (nominal ? 255 : 1) / 765;
	}

	function getLuminance(rgb, normalized) {
		var div = normalized ? 1 : 255,
			RGB = [rgb.r / div, rgb.g / div, rgb.b / div],
			luminance = _instance.options.luminance;

		for (var i = RGB.length; i--; ) {
			RGB[i] = RGB[i] <= 0.03928 ? RGB[i] / 12.92 : _math.pow(((RGB[i] + 0.055) / 1.055), 2.4);
		}
		return ((luminance.r * RGB[0]) + (luminance.g * RGB[1]) + (luminance.b * RGB[2]));
	}

	function mixColors(topColor, bottomColor, topAlpha, bottomAlpha) {
		var newColor = {},
			alphaTop = (topAlpha !== undefined ? topAlpha : 1),
			alphaBottom = (bottomAlpha !== undefined ? bottomAlpha : 1),
			alpha = alphaTop + alphaBottom * (1 - alphaTop); // 1 - (1 - alphaTop) * (1 - alphaBottom);

		for(var n in topColor) {
			newColor[n] = (topColor[n] * alphaTop + bottomColor[n] * alphaBottom * (1 - alphaTop)) / alpha;
		}
		newColor.a = alpha;
		return newColor;
	}

	function getWCAG2Ratio(lum1, lum2) {
		var ratio = 1;

		if (lum1 >= lum2) {
			ratio = (lum1 + 0.05) / (lum2 + 0.05);
		} else {
			ratio = (lum2 + 0.05) / (lum1 + 0.05);
		}
		return _math.round(ratio * 100) / 100;
	}

	function limitValue(value, min, max) {
		// return Math.max(min, Math.min(max, value)); // faster??
		return (value > max ? max : value < min ? min : value);
	}
})(window);
;(function(window, undefined){
	"use strict"

	// see colorPicker.html for the following encrypted variables... will only be used in buildView()
	var _html = ('^§app alpha-bg-w">^§slds">^§sldl-1">$^§sldl-2">$^§sldl-3">$^§curm">$^§sldr-1">$^§sldr-2">$^§sldr-4">$^§curl">$^§curr">$$^§opacity">|^§opacity-slider">$$$^§memo">^§raster">$^§raster-bg">$|$|$|$|$|$|$|$|$^§memo-store">$^§memo-cursor">$$^§panel">^§hsv">^hsl-mode §ß">$^hsv-h-ß §ß">H$^hsv-h-~ §~">-^§nsarrow">$$^hsl-h-@ §@">H$^hsv-s-ß §ß">S$^hsv-s-~ §~">-$^hsl-s-@ §@">S$^hsv-v-ß §ß">B$^hsv-v-~ §~">-$^hsl-l-@ §@">L$$^§hsl §hide">^hsv-mode §ß">$^hsl-h-ß §ß">H$^hsl-h-~ §~">-$^hsv-h-@ §@">H$^hsl-s-ß §ß">S$^hsl-s-~ §~">-$^hsv-s-@ §@">S$^hsl-l-ß §ß">L$^hsl-l-~ §~">-$^hsv-v-@ §@">B$$^§rgb">^rgb-r-ß §ß">R$^rgb-r-~ §~">-$^rgb-r-@ §ß">&nbsp;$^rgb-g-ß §ß">G$^rgb-g-~ §~">-$^rgb-g-@ §ß">&nbsp;$^rgb-b-ß §ß">B$^rgb-b-~ §~">-$^rgb-b-@ §ß">&nbsp;$$^§cmyk">^Lab-mode §ß">$^cmyk-c-ß §@">C$^cmyk-c-~ §~">-$^Lab-L-@ §@">L$^cmyk-m-ß §@">M$^cmyk-m-~ §~">-$^Lab-a-@ §@">a$^cmyk-y-ß §@">Y$^cmyk-y-~ §~">-$^Lab-b-@ §@">b$^cmyk-k-ß §@">K$^cmyk-k-~ §~">-$^Lab-x-@ §ß">&nbsp;$$^§Lab §hide">^cmyk-mode §ß">$^Lab-L-ß §@">L$^Lab-L-~ §~">-$^cmyk-c-@ §@">C$^Lab-a-ß §@">a$^Lab-a-~ §~">-$^cmyk-m-@ §@">M$^Lab-b-ß §@">b$^Lab-b-~ §~">-$^cmyk-y-@ §@">Y$^Lab-x-ß §@">&nbsp;$^Lab-x-~ §~">-$^cmyk-k-@ §@">K$$^§alpha">^alpha-ß §ß">A$^alpha-~ §~">-$^alpha-@ §ß">W$$^§HEX">^HEX-ß §ß">#$^HEX-~ §~">-$^HEX-@ §ß">M$$^§ctrl">^§raster">$^§cont">$^§cold">$^§col1">|&nbsp;$$^§col2">|&nbsp;$$^§bres">RESET$^§bsav">SAVE$$$^§exit">$^§resize">$^§resizer">|$$$').
			replace(/\^/g, '<div class="').replace(/\$/g, '</div>').replace(/~/g, 'disp').replace(/ß/g, 'butt').replace(/@/g, 'labl').replace(/\|/g, '<div>'),
		_cssFunc = ('är^1,äg^1,äb^1,öh^1,öh?1,öh?2,ös?1,öv?1,üh^1,üh?1,üh?2,üs?1,ül?1,.no-rgb-r är?2,.no-rgb-r är?3,.no-rgb-r är?4,.no-rgb-g äg?2,.no-rgb-g äg?3,.no-rgb-g äg?4,.no-rgb-b äb?2,.no-rgb-b äb?3,.no-rgb-b äb?4{visibility:hidden}är^2,är^3,äg^2,äg^3,äb^2,äb^3{@-image:url(_patches.png)}.§slds div{@-image:url(_vertical.png)}öh^2,ös^1,öv^1,üh^2,üs^1,ül^1{@-image:url(_horizontal.png)}ös?4,öv^3,üs?4,ül^3{@:#000}üs?3,ül^4{@:#fff}är?1{@-color:#f00}äg?1{@-color:#0f0}äb?1{@-color:#00f}är^2{@|-1664px 0}är^3{@|-896px 0}är?1,äg?1,äb?1,öh^3,ös^2,öv?2Ü-2432Öär?2Ü-2944Öär?3Ü-4480Öär?4Ü-3202Öäg^2Äöh^2{@|-640px 0}äg^3{@|-384px 0}äg?2Ü-4736Öäg?3Ü-3968Öäg?4Ü-3712Öäb^2{@|-1152px 0}äb^3{@|-1408px 0}äb?2Ü-3456Öäb?3Ü-4224Öäb?4Ü-2688Ööh^2Äär^3Ääb?4Ü0}öh?4,üh?4Ü-1664Öös^1,öv^1,üs^1,ül^1Ääg^3{@|-256px 0}ös^3,öv?4,üs^3,ül?4Ü-2176Öös?2,öv^2Ü-1920Öüh^2{@|-768px 0}üh^3,üs^2,ül?2Ü-5184Öüs?2,ül^2Ü-5824Ö.S är^2{@|-128px -128Ö.S är?1Ääg?1Ääb?1Äöh^3Äös^2Äöv?2Ü-1408Ö.S är?2Ääb^3Ü-128Ö.S är?3Ü-896Ö.S är?4Ü-256Ö.S äg^2{@|-256px -128Ö.S äg?2Ü-1024Ö.S äg?3Ü-640Ö.S äg?4Ü-512Ö.S äb^2{@|-128px 0}.S äb?2Ü-384Ö.S äb?3Ü-768Ö.S öh?4Äüh?4Ü-1536Ö.S ös^1Äöv^1Äüs^1Äül^1{@|-512px 0}.S ös^3Äöv?4Äüs^3Äül?4Ü-1280Ö.S ös?2Äöv^2Ü-1152Ö.S üh^2{@|-1024px 0}.S üh^3Äüs^2Äül?2Ü-5440Ö.S üs?2Äül^2Ü-5696Ö.XXS ös^2,.XXS öv?2Ü-5120Ö.XXS ös^3,.XXS öv?4,.XXS üs^3,.XXS ül^3,.XXS ül?4Ü-5056Ö.XXS ös?2,.XXS öv^2Ü-4992Ö.XXS üs^2,.XXS ül?2Ü-5568Ö.XXS üs?2,.XXS ül^2Ü-5632Ö').
			replace(/Ü/g, '{@|0 ').replace(/Ö/g, 'px}').replace(/Ä/g, ',.S ').replace(/\|/g, '-position:').replace(/@/g, 'background').replace(/ü/g, '.hsl-').replace(/ö/g, '.hsv-').replace(/ä/g, '.rgb-').replace(/~/g, ' .no-rgb-}').replace(/\?/g, ' .§sldr-').replace(/\^/g, ' .§sldl-'),
		_cssMain = ('∑{@#bbb;font-family:monospace, "Courier New", Courier, mono;font-size:12¥line-ä15¥font-weight:bold;cursor:default;~412¥ä323¥?top-left-radius:7¥?top-Ü-radius:7¥?bottom-Ü-radius:7¥?bottom-left-radius:7¥ö@#444}.S{~266¥ä177px}.XS{~158¥ä173px}.XXS{ä105¥~154px}.no-alpha{ä308px}.no-alpha .§opacity,.no-alpha .§alpha{display:none}.S.no-alpha{ä162px}.XS.no-alpha{ä158px}.XXS.no-alpha{ä90px}∑,∑ div{border:none;padding:0¥float:none;margin:0¥outline:none;box-sizing:content-box}∑ div{|absolute}^s .§curm,«§disp,«§nsarrow,∑ .§exit,∑ ø-cursor,∑ .§resize{öimage:url(_icons.png)}∑ .do-drag div{cursor:none}∑ .§opacity,ø .§raster-bg,∑ .§raster{öimage:url(_bgs.png)}∑ ^s{~287¥ä256¥top:10¥left:10¥overflow:hidden;cursor:crosshair}.S ^s{~143¥ä128¥left:9¥top:9px}.XS ^s{left:7¥top:7px}.XXS ^s{left:5¥top:5px}^s div{~256¥ä256¥left:0px}.S ^l-1,.S ^l-2,.S ^l-3,.S ^l-4{~128¥ä128px}.XXS ^s,.XXS ^s ^l-1,.XXS ^s ^l-2,.XXS ^s ^l-3,.XXS ^s ^l-4{ä64px}^s ^r-1,^s ^r-2,^s ^r-3,^s ^r-4{~31¥left:256¥cursor:default}.S ^r-1,.S ^r-2,.S ^r-3,.S ^r-4{~15¥ä128¥left:128px}^s .§curm{margin:-5¥~11¥ä11¥ö|-36px -30px}.light .§curm{ö|-7px -30px}^s .§curl,^s .§curr{~0¥ä0¥margin:-3px -4¥border:4px solid;cursor:default;left:auto;öimage:none}^s .§curl,∑ ^s .§curl-dark,.hue-dark div.§curl{Ü:27¥?@† † † #fff}.light .§curl,∑ ^s .§curl-light,.hue-light .§curl{?@† † † #000}.S ^s .§curl,.S ^s .§curr{?~3px}.S ^s .§curl-light,.S ^s .§curl{Ü:13px}^s .§curr,∑ ^s .§curr-dark{Ü:4¥?@† #fff † †}.light .§curr,∑ ^s .§curr-light{?@† #000 † †}∑ .§opacity{bottom:44¥left:10¥ä10¥~287¥ö|0 -87px}.S .§opacity{bottom:27¥left:9¥~143¥ö|0 -100px}.XS .§opacity{left:7¥bottom:25px}.XXS .§opacity{left:5¥bottom:23px}.§opacity div{~100%;ä16¥margin-top:-3¥overflow:hidden}.§opacity .§opacity-slider{margin:0 -4¥~0¥ä8¥?~4¥?style:solid;?@#eee †}∑ ø{bottom:10¥left:10¥~288¥ä31¥ö@#fff}.S ø{ä15¥~144¥left:9¥bottom:9px}.XS ø{left:7¥bottom:7px}.XXS ø{left:5¥bottom:5px}ø div{|relative;float:left;~31¥ä31¥margin-Ü:1px}.S ø div{~15¥ä15px}∑ .§raster,ø .§raster-bg,.S ø .§raster,.S ø .§raster-bg{|absolute;top:0¥Ü:0¥bottom:0¥left:0¥~100%}.S ø .§raster-bg{ö|0 -31px}∑ .§raster{opacity:0.2;ö|0 -49px}.alpha-bg-b ø{ö@#333}.alpha-bg-b .§raster{opacity:1}ø ø-cursor{|absolute;Ü:0¥ö|-26px -87px}∑ .light ø-cursor{ö|3px -87px}.S ø-cursor{ö|-34px -95px}.S .light ø-cursor{ö|-5px -95px}∑ .§panel{|absolute;top:10¥Ü:10¥bottom:10¥~94¥?~1¥?style:solid;?@#222 #555 #555 #222;overflow:hidden;ö@#333}.S .§panel{top:9¥Ü:9¥bottom:9px}.XS .§panel{display:none}.§panel div{|relative}«§hsv,«§hsl,«§rgb,«§cmyk,«§Lab,«§alpha,.no-alpha «§HEX,«§HEX{~86¥margin:-1px 0px 1px 4¥padding:1px 0px 3¥?top-~1¥?top-style:solid;?top-@#444;?bottom-~1¥?bottom-style:solid;?bottom-@#222;float:Ö«§hsv,«§hsl{padding-top:2px}.S .§hsv,.S .§hsl{padding-top:1px}«§HEX{?bottom-style:none;?top-~0¥margin-top:-4¥padding-top:0px}.no-alpha «§HEX{?bottom-style:none}«§alpha{?bottom-style:none}.S .rgb-r .§hsv,.S .rgb-g .§hsv,.S .rgb-b .§hsv,.S .rgb-r .§hsl,.S .rgb-g .§hsl,.S .rgb-b .§hsl,.S .hsv-h .§rgb,.S .hsv-s .§rgb,.S .hsv-v .§rgb,.S .hsl-h .§rgb,.S .hsl-s .§rgb,.S .hsl-l .§rgb,.S .§cmyk,.S .§Lab{display:none}«§butt,«§labl{float:left;~14¥ä14¥margin-top:2¥text-align:center;border:1px solid}«§butt{?@#555 #222 #222 #555}«§butt:active{ö@#444}«§labl{?@†}«Lab-mode,«cmyk-mode,«hsv-mode,«hsl-mode{|absolute;Ü:0¥top:1¥ä50px}«hsv-mode,«hsl-mode{top:2px}«cmyk-mode{ä68px}.hsl-h .hsl-h-labl,.hsl-s .hsl-s-labl,.hsl-l .hsl-l-labl,.hsv-h .hsv-h-labl,.hsv-s .hsv-s-labl,.hsv-v .hsv-v-labl{@#f90}«cmyk-mode,«hsv-mode,.rgb-r .rgb-r-butt,.rgb-g .rgb-g-butt,.rgb-b .rgb-b-butt,.hsv-h .hsv-h-butt,.hsv-s .hsv-s-butt,.hsv-v .hsv-v-butt,.hsl-h .hsl-h-butt,.hsl-s .hsl-s-butt,.hsl-l .hsl-l-butt,«rgb-r-labl,«rgb-g-labl,«rgb-b-labl,«alpha-butt,«HEX-butt,«Lab-x-labl{?@#222 #555 #555 #222;ö@#444}.no-rgb-r .rgb-r-labl,.no-rgb-g .rgb-g-labl,.no-rgb-b .rgb-b-labl,.mute-alpha .alpha-butt,.no-HEX .HEX-butt,.cmy-only .Lab-x-labl{?@#555 #222 #222 #555;ö@#333}.Lab-x-disp,.cmy-only .cmyk-k-disp,.cmy-only .cmyk-k-butt{visibility:hidden}«HEX-disp{öimage:none}«§disp{float:left;~48¥ä14¥margin:2px 2px 0¥cursor:text;text-align:left;text-indent:3¥?~1¥?style:solid;?@#222 #555 #555 #222}∑ .§nsarrow{|absolute;top:0¥left:-13¥~8¥ä16¥display:none;ö|-87px -23px}∑ .start-change .§nsarrow{display:block}∑ .do-change .§nsarrow{display:block;ö|-87px -36px}.do-change .§disp{cursor:default}«§hide{display:none}«§cont,«§cold{|absolute;top:-5¥left:0¥ä3¥border:1px solid #333}«§cold{z-index:1;ö@#c00}«§cont{margin-Ü:-1¥z-index:2}«contrast .§cont{z-index:1;ö@#ccc}«orange .§cold{ö@#f90}«green .§cold{ö@#4d0}«§ctrl{|absolute;bottom:0¥left:0¥~100%;ö@#fff}.alpha-bg-b .§ctrl,«§bres,«§bsav{ö@#333}«§col1,«§col2,«§bres,«§bsav{?~1¥?style:solid;?@#555 #222 #222 #555;float:left;~45¥line-ä28¥text-align:center;top:0px}.§panel div div{ä100%}.S .§ctrl div{line-ä25px}.S «§bres,.S «§bsav{line-ä26px}∑ .§exit,∑ .§resize{Ü:3¥top:3¥~15¥ä15¥ö|0 -52px}∑ .§resize{top:auto;bottom:3¥cursor:nwse-resize;ö|-15px -52px}.S .§exit{ö|1px -52px}.XS .§resize,.XS .§exit{~10¥ä10¥Ü:0¥öimage:none}.XS .§exit{top:0px}.XS .§resize{bottom:0px}∑ .§resizer,∑ .§resizer div{|absolute;border:1px solid #888;top:-1¥Ü:-1¥bottom:-1¥left:-1¥z-index:2;display:none;cursor:nwse-resize}∑ .§resizer div{border:1px dashed #333;opacity:0.3;display:block;ö@#bbb}').
			replace(/Ü/g, 'right').replace(/Ö/g, 'left}').replace(/∑/g, '.§app').replace(/«/g, '.§panel .').replace(/¥/g, 'px;').replace(/\|/g, 'position:').replace(/@/g, 'color:').replace(/ö/g, 'background-').replace(/ä/g, 'height:').replace(/ø/g, '.§memo').replace(/†/g, 'transparent').replace(/\~/g, 'width:').replace(/\?/g, 'border-').replace(/\^/g, '.§sld'),
		_horizontalPng = 'iVBORw0KGgoAAAANSUhEUgAABIAAAAABCAYAAACmC9U0AAABT0lEQVR4Xu2S3Y6CMBCFhyqIsjGBO1/B9/F5DC/pK3DHhVkUgc7Zqus2DVlGU/cnQZKTjznttNPJBABA149HyRf1iN//4mIBCg0jV4In+j9xJiuihly1V/Z9X88v//kNeDXVvyO/lK+IPR76B019+1Riab3H1zkmeqerKnL+Bzwxx6PAgZxaSQU8vB62T28pxcQeRQ2sHw6GxCOWHvP78zwHAARBABOfdYtd30rwxXOEPDF+dj2+91r6vV/id3k+/brrXmaGUkqKhX3i+ffSt16HQ/dorTGZTHrs7ev7Tl7XdZhOpzc651nfsm1bRFF0YRiGaJoGs9nsQuN/xafTCXEco65rzOdzHI9HJEmCqqqwXC6x3++RZRnKssRqtUJRFFiv19jtdthutyAi5Hl+Jo9VZg7+7f3yXuvZf5c3KaXYzByb+WIzO5ymKW82G/0BNcFhO/tOuuMAAAAASUVORK5CYII=',
		_verticalPng = 'iVBORw0KGgoAAAANSUhEUgAAAAEAABfACAYAAABn2KvYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABHtJREFUeNrtnN9SqzAQxpOF1to6zuiVvoI+j6/gva/lA/kKeqUzjtX+QTi7SzSYBg49xdIzfL34+e1usoQQklCnmLwoCjImNwDQA2xRGMqNAYB+gPEH9IdCgIUA6Aem0P1fLoMQAPYNHYDoCKAv8OMHFgKgX2AjDPQDXn4t1l+gt/1fId//yWgE/hUJ+mAn8EyY5wCwXxhrbaHzn8E9iPlv79DdHxXTqciZ4KROnXRVZMF/6U2OPhcEavtAbZH1SM7wRDD7VoHZItCiyEQf4t6+MW9UOxaZybmdCGKqNrB9Eb5SfMg3wTyiagMtigTmWofiSDCOYNTSNz6sLDIoaCU9GWDd0tdhoMMsRm+r8U/EfB0GfjmLXiqzimDd0tdhoLMsI7la45+I+ToM/HIW0kfGVQTrlr7tA91kaUr//fxrKo8jUFB7VAn6AKpHJf+EKwAAAIYD/f7F7/8MVgMo7P+gBqDKr57Lf72V8x8AAMDgYIuvH4EAAAAMDQX6AACAQcI9GGMjDADA4MA/P2KlP8IEAAAYFCz6AACAgaLA8y8AAIN+CMYXoQAADA7u/UPYCAMAMDjI7z9S+SdwDFQX2C9Gh9GMEOWriz8/Pw1lWQZsi/L3R4czzP678Ve+P8f9nCv/C7hwLq99ah8NfKrU15zPB5pVcwtiJt9qGy0IfEE+jQa+Fn0VtI/fkxUPqBlEfRENeF+tqUpbGpi1iu8epwJzvV5XA4GpWC6XGz7F+/u766EgwJ+ckiTJKU3TnI6OjnI6OzvLZf6zMggt3dzckPhIoiTlSGpQ+eEsVegdz0fbCCi4fRs+Po+4yWdeDXiT+6pBSTeHple1pkz3FZ+avpyavoiPxgLN0B7yprY08PlyQTTm0+PWmkH7ynedNKraar4F/lRj1WpTtYh+ozL/cY2sAvZl0gcbZm0gSLBLvkxGoaogiy/HDXemQk2t5pUm8OAhH8/HH6e0mkJ9q9XKKQXfb07xfZnJbZrRxcVFVt6/t7e3Kc1ms5RGo1Eq5VIZuyl9fHw4k/M5xYeoKj64A7eqCt1ZeqWFVSl8NV9OTV3fmvP5qE9VmzSoEcsXpArK1UHen/hZbgL53BZSdyEXalGau/hU8TEW0u3VcoFPy3EDFrTgT+njydeZ0+l0UV7fu7u7iVzziQQmUm4iqRw4n/NxMxw4s/Mp1NSALxf4NEtQ10cjMDwSl+b+/j6hp6enVGb+jUvrn05iKobm6PboOt8vPISY5Pr6OqGXlxe3fOokoGtAbMUJZmqvYmaLQDP+sdrecOjtO/SXeH69P8Imutm5urqy9PDwYOny8tLS4+OjpfPzc0vPz8+WTk9PLb2+vlpZbCzN53NLx8fHVtYZS5PJxMoEZWWqsjKULY3HYytTi1Pex5OMldXKRVXxuLcy/20onmms3BBOxcr5qCrZtsrd45SPel8sGlOxGoGy0neynQ6VL9fsa1YtWlCrtj9G83G7PjdVush5n5q1iJWLZW6u21a1bUvbVnVzlru0pe3RdmlV1/23fZtbZv4Dx+7FBypx77kAAAAASUVORK5CYII=',
		_patchesPng = ('iVBORw0KGgo^NSUhEUgAAB4^EACAI#DdoPxz#L0UlEQVR4Xu3cQWrDQBREwR7FF8/BPR3wXktnQL+KvxfypuEhvLJXcp06d/bXd71OPt+trIw95zr33Z1bk1/fudEv79wa++7OfayZ59wrO2PBzklcGQmAZggAAOBYgAYBmpWRAGg^BGgRofAENgAAN#I0CBA6w8AG^ECABgEa/QH§AI0CNDoDwAY^QIAGAVp/AM§AjQI0OgPAAY^QoEGARn8Aw§CNAjQ+gMABg#BCgQYCmGQmABgAAEKBBgEZ/AM§AjQI0PoDAAY^QoEGARn8AM^IAADQI0+gMABg#BCgQYDWHwAw^gAANAjT6A4AB^BGgQoNEfAD^C#0CtP4AgAE^EaBCgaUYCoAE#RoEKDRHwAw^gAANArT+AIAB^BGgQoNEfAAw^gQIMAjf4AgAE^EaBCg9QcAD^CBAgwCN/gBg§EaBGj0BwAM^IECDAK0/AG§ARoEaJqRAGg^BGgRo9AcAD^CBAgwCtPwBg§EaBGj0BwAD^CNAgQKM/AG§ARoEaP0BAAM^I0CBAoz8AG^ECABgEa/QEAAw^jQIEDrDwAY^QIAGAZpmJACaBw^RoEKD1BwAM^IECDAK0/AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo/QEAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQOsPABg#BAgAYBGv0BAANwCwAAGB6gYeckmpEAa^AEaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBmmYkABoAAECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgKYZCYAG#QoEGARn8Aw§CNAjQ+gMABg#BCgQYBGfwAw^gAANAjT6AwAG^EKBBgNYfAD^C#0CNPoDgAE^EaBCg0R8AM^IAADQK0/gCAAQ^RoEKBpRgKgAQAABGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRomsMAM^IAADQK0/gCAAQ^RoEKDRHwAw^gAANO7fQHwAw^gAANArT+AIAB^BGgQoNEfAGg^BGgRo9AcAD^CBAgwCtPwBg§EaBGj0BwAD^RIB+Ntg5iea5AD^DAIwI0CND6AwAG^EKBBgEZ/AKAB#EaBCg0R8AM^IAADQK0/gCAAQ^RoEKDRHwAM^IECDAI3+AIAB^BGgQoPUHAAw^gQIMAjf4AY§BGgRo9AcAD^CBAgwCtPwBg§EaBGiakQBo^ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQKM/ABg#BAgAYBGv0BAAM^I0CBA6w8AG^ECABgGaZiQAGgAAQIAGARr9AQAD^CNAgQOsPABg#BAgAYBGv0Bw§CNAjQ6A8AG^ECABgFafwD§AI0CNDoDwAG^EKBBgEZ/AM§AjQI0PoDAAY^QoEGApjkMAAM^I0CBA6w8AG^ECABgEa/QEAAw^jQsIP+AIAB^BGgQoPUHAAw^gQIMAjf4AgAE#Bea/fK+3P5/3PJOvh8t1cO4nflmQAQoAEAAF9Aw/7JHfQHAAw^gQIMArT8AY§BGvwHNPoDAA0AACBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAAw^jQIECjPwBg§EaBGj9AQAD^CNAgQNOMBEAD#I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBGv0Bw§CNAjQ6A8AG^ECABgFafwD§AI0CNA0IwHQ^AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgEZ/AD^C#0CNPoDAAY^QoEGA1h8AM^IAADQI0DQAG^EKBBgEZ/AM§AjQI0PoDAAY^QoEGA1h8AM^IAADQI0+gMABg#BCgQYDWHwAw^gAANArT+AIAB^BGgQoNEfAD^C#0CtP4AgAE^EaBCg9QcAD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAK0/AG§ARoEaPQHAAw^gQIMArT8AY§BGgRo/QEAAw^jQIECjPwBgACDhFgC#07t9AfAD^C#0CtP4AgAE^EaBCg0R8Aa^AEaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIECjPwAY^QIAGARr9AQAD^CNAgQOsPABg#BAgAYBmmYkABoAAECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQ6A8ABg#BCgQYBGfwD§AI0CND6AwAG^EKBBgKYZCYAG#QoEGARn8Aw§CNAjQ+gMABg#BCgQYBGfwAw^gAANAjT6AwAG^EKBBgNYfAD^C#0CNPoDgAE^EaBCg0R8AM^IAADQK0/gCAAQ^RoEKBpRgKgAQAABGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AG§ARoEaPQHAAw^gQIMArT8AY§BGgRommEAM^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAI3+AIAB^ARoEaPQHAAw^gQIMArT8AY§BGgRo9AcAGgAAQICGCNBfRfNcABg#BgeICGnVvoDwAY^QIAGAVp/AM§AjQI0OgPADQAAIAADQI0+gMABg#BCgQYDWHwAw^gAANAjT6A4AB^BGgQoNEfAD^C#0CtP4AgAE^EaBCg0R8AD^CBAgwCN/gCAAQ^RoEKD1BwAM^IECDAE0zEgAN#gQIMAjf4AgAE^EaBCg9QcAD^CBAgwCN/gBg§EaBGj0BwAM^IECDAK0/AG§ARoEaPQHAAM^I0CBAoz8AY§BGgRo/QEAAw^jQIEDTjARAAwAACNAgQKM/AG§ARoEaP0BAAM^I0CBAoz8AG^ECABgEa/QEAAw^jQIEDrDwAY^QIAGARr9Ac§AjQI0OgPABg#BAgAYBWn8Aw§CNAjQNIcBY§BGgRo/QEAAw^jQIECjPwBg§EadtAfAD^C#0CtP4AgAE^EaBCgAQABGgAA+AO2TAbHupOgH^ABJRU5ErkJggg==').
			replace(/§/g, 'AAAAAA').replace(/\^/g, 'AAAA').replace(/#/g, 'AAA'),
		_iconsPng = 'iVBORw0KGgoAAAANSUhEUgAAAGEAAABDCAMAAAC7vJusAAAAkFBMVEUAAAAvLy9ERERubm7///8AAAD///9EREREREREREREREQAAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8AAAD///8cHBwkJCQnJycoKCgpKSkqKiouLi4vLy8/Pz9AQEBCQkJDQ0NdXV1ubm58fHykpKRERERVVVUzMzPx7Ab+AAAAHXRSTlMAAAAAAAQEBQ4QGR4eIyMtLUVFVVVqapKSnJy7u9JKTggAAAFUSURBVHja7dXbUoMwEAbgSICqLYeW88F6KIogqe//dpoYZ0W4AXbv8g9TwkxmvtndZMrEwlw/F8YIRjCCEYxgBCOsFmzqGMEI28J5zzmt0Pc9rdDL0NYgMxIYC5KiKpKAzZphWtZlGm4SjlnkOV6UHeeEUx77rh/npw1dCrI9k9lnwUwF+UG9D3m4ftJJxH4SJdPtaawXcbr+tBaeFrxiur309cIv19+4ytGCU0031a5euPVigLYGqjlAqM4ShOQ+QAYQUO80AMMAAkUGGfMfR9Ul+kmvPq2QGxXKOQBAKdjUgk0t2NiCGEVP+rHT3/iCUMBT90YrPMsKsIWP3x/VolaonJEETchHCS8AYAmaUICQQwaAQnjoXgHAES7jLkEFaHO4bdq/k25HAIpgWY34FwAE5xjCffM+D2DV8B0gRsAZT7hr5gE8wdrJcU+CJqhcqQD7Cx5L7Ph4WnrKAAAAAElFTkSuQmCC',
		_bgsPng = 'iVBORw0KGgoAAAANSUhEUgAAASAAAABvCAYAAABM+h2NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABORJREFUeNrs3VtTW1UYBuCEcxAI4YydWqTWdqr1V7T/2QsvvPDCCy9qjxZbamsrhZIQUHsCEtfafpmJe8qFjpUxfZ4Zuvt2feydJvAOARZUut1u5bRerl692nV913f99/f6QxWAU6KAAAUEKCAABQQoIAAFBCggAAUEKCAABQQoIAAFBCggAAUEKCAABQQoIEABASggQAEBKCBAAQEoIEABASggQAEBKCBAAQEoIGBQC+jatWvd07zxrv9+Xx8fAQEoIEABASggQAEBKCBAAQEoIEABAQoIQAEBCghAAQEKCEABAQOk2u36kS6AAgLetwJKL29toFRM1be+QrVq3rx58//KvM8BAadGAQEKCFBAAAoIGHwnfhneZ+/Nmzf/LufzrI+AAE/BAAUEoIAABQTwztgLZt68eXvBAE/BABQQoIAAFBAweOwFM2/evL1ggKdgAAoIUEAACggYPPaCmTdv3l4wwFMwAAUEKCAABQQMHnvBzJs3by8Y4CkYgAICFBCAAgIGz4lfBQNQQMDgFlCtVisaaHV1tThubW1VInciD0U+ysdnz54N5+PKysphOnRTHsvHlN9EHo/1l5FrkV9Enoz8W87b29tTOS8vLx9EnoncjlyPvBe5EbkZeT4fU96NvBDr2znv7Ows57y0tLQVeSXy08gf5mNfPhPrjyOfrVarlcXFxZ9yfv78+bl8TPlh5LU8n/KDyOuxfj/y+VjfyHl3d/dCKv28fi/yp/m4sLDwQ+SLke9GvhT5Tinfjnw5f4/F/Pz8rZybzeZn+ZjyzVK+EfnzUr4S+Xopf9/L+fxzc3M5d1qt1hf531Mu5k/IxzGf85VYL+fefHH+RqNRrO/t7RW3L+UbkS9Hvhk5/386Kd/qW8/5duRLMV/OdyJfzNebnZ0t7t92u53v/07K9yJfiLwROT9+ef7HyOux/iDyWuSHkT+K+eLtZX9//2xer9frjyOfyY9/Wn8S86v59qT1p7Ge315zLt4RU16K19+O9YXIu5HnYn435hux3opcj9yOPB3z+5E/iPXf43y1yMX778HBQS3f3pTz+28l5bHIr2N+LN3+zszMzGHkoh/S+mHMF98XlNaP8zHd/0W/pMe943NAwKlSQIACAhQQgAICFBCAAgIUEIACAhQQgAIC/n9GqtXqYbfbHa38+RtSu32llPdqdNL6aOSj+LfxyMVekLTem39Ryr/mPDQ0NBznzXtROikPRW6W8k7k3m9rzXthOsPDw73bUuylGRkZ6cR63nvTSfko8oPIr+Pnz96P/DLW816ezujoaN6DdtyX9+P8eS9QZ2xs7Hxf7qa8Xlr/JO6Ljcjrcf6cj1P+OO+N6V1/fHz8XLz+/Tjfubh+sZcorZ+N9Ycxfybyo8ircf6fc56YmFiJ1/8l8mLk7cjzkfP92U15Ns63G+u9nPcKdWq12lQ8Xu3Ixd6f9Pd8P3UmJycnUszzL2N9LM7/anNzs9V7Q2q32395w/q7ubdH6L/KrVbrpPxlKX9Vyl+X8jel/G0pf5f/aDabvXy9tH6ztH63lDdKebOUH5Xyk1LeKuWd/ry2tlap9P125Onp6Zf9eWpq6lW3b8f6zMzM6/71er3+ppSP+u/XNN/pz41Go+sjIMBTMEABASggQAEBKCBAAQEoIEABASggQAEB/CN/CDAAw78uW9AVDw4AAAAASUVORK5CYII=';

		window.ColorPicker = {
			_html: _html,
			_cssFunc: _cssFunc,
			_cssMain: _cssMain,
			_horizontalPng: _horizontalPng,
			_verticalPng: _verticalPng,
			_patchesPng: _patchesPng,
			_iconsPng: _iconsPng,
			_bgsPng: _bgsPng
		}
})(window);
;(function(window, undefined){
	"use strict"

	var _data = window.ColorPicker, // will be deleted in buildView() and holds:
		// window.ColorPicker = { // comes from colorPicker.data.js and will be overwritten.
		// 	_html: ..., // holds the HTML markup of colorPicker
		// 	_cssFunc: ..., // CSS for all the sliders
		// 	_cssMain: ..., // CSS of the GUI
		// 	_horizontalPng: ..., // horizontal background images for sliders
		// 	_verticalPng: ..., // vertical background images for sliders
		// 	_patchesPng: ..., // background images for square sliders in RGB mode
		// 	_iconsPng: ..., // some icon sprite images
		// 	_bgsPng: ..., // some more icon sprite images
		// }
		_devMode = !_data, // if no _data we assume that colorPicker.data.js is missing (for development)
		_isIE = document.createStyleSheet !== undefined && document.getElementById || !!window.MSInputMethodContext,
		_doesOpacity = typeof document.body.style.opacity !== 'undefined',
		// _isIE8 = _isIE && document.querySelectorAll,

		_valueRanges = {}, // will be assigned in initInstance() by Colors instance
		// _valueRanges = {
		// 	rgb:   {r: [0, 255], g: [0, 255], b: [0, 255]},
		// 	hsv:   {h: [0, 360], s: [0, 100], v: [0, 100]},
		// 	hsl:   {h: [0, 360], s: [0, 100], l: [0, 100]},
		// 	cmyk:  {c: [0, 100], m: [0, 100], y: [0, 100], k: [0, 100]},
		// 	cmy:   {c: [0, 100], m: [0, 100], y: [0, 100]},
		// 	XYZ:   {X: [0, 100], Y: [0, 100], Z: [0, 100]},
		// 	Lab:   {L: [0, 100], a: [-128, 127], b: [-128, 127]},
		// 	alpha: {alpha: [0, 1]},
		// 	HEX:   {HEX: [0, 16777215]}
		// },
		_bgTypes = {w: 'White', b: 'Black', c: 'Custom'},

		_mouseMoveAction, // current mouseMove handler assigned on mouseDown
		_action = '', // needed for action callback; needed due to minification of javaScript
		_mainTarget, // target on mouseDown, might be parent element though...
		_valueType, // check this variable; gets missused/polutet over time
		_delayState = 1, // mouseMove offset (y-axis) in display elements // same here...
		_startCoords = {},
		_targetOrigin = {},
		_renderTimer, // animationFrame/interval variable
		_newData = true,
		// _txt = {
		// 	selection: document.selection || window.getSelection(),
		// 	range: (document.createRange ? document.createRange() : document.body.createTextRange())
		// },

		_renderVars = {}, // used only in renderAll and convertColors
		_cashedVars = {}, // reset in initSliders

		_colorPicker,
		_previousInstance, // only used for recycling purposes in buildView()
		_colorInstance = {},
		_colors = {},
		_options = {},
		_nodes = {},

		_math = Math,

		animationFrame = 'AnimationFrame', // we also need this later
		requestAnimationFrame = 'request' + animationFrame,
		cancelAnimationFrame = 'cancel' + animationFrame,
		vendors = ['ms', 'moz', 'webkit', 'o'],
		
		ColorPicker = function(options) { // as tiny as possible...
			this.options = {
				color: 'rgba(204, 82, 37, 0.8)',
				mode: 'rgb-b',
				fps: 60, // 1000 / 60 = ~16.7ms
				delayOffset: 8,
				CSSPrefix: 'cp-',
				allMixDetails: true,
				alphaBG: 'w',
				imagePath: ''
				// devPicker: false // uses existing HTML for development...
				// noAlpha: true,
				// customBG: '#808080'
				// size: 0,
				// cmyOnly: false,
				// initStyle: 'display: none',

				// memoryColors: "'rgba(82,80,151,1)','rgba(100,200,10,0.5)','rgba(100,0,0,1)','rgba(0,0,0,1)'"
				// memoryColors: [{r: 100, g: 200, b: 10, a: 0.5}] //  

				// opacityPositionRelative: undefined,
				// customCSS: undefined,
				// appendTo: document.body,
				// noRangeBackground: false,
				// textRight: false, ?????
				// noHexButton: false,
				// noResize: false,

				// noRGBr: false,
				// noRGBg: false,
				// noRGBb: false,

				// ------ CSSStrength: 'div.',
				// XYZMatrix: XYZMatrix,
				// XYZReference: {},
				// grey: grey,
				// luminance: luminance,

				// renderCallback: undefined,
				// actionCallback: undefined,
				// convertCallback: undefined,
			};
			initInstance(this, options || {});
		};

	window.ColorPicker = ColorPicker; // export differently
	ColorPicker.addEvent = addEvent;
	ColorPicker.removeEvent = removeEvent;
	ColorPicker.getOrigin = getOrigin;
	ColorPicker.limitValue = limitValue;
	ColorPicker.changeClass = changeClass;

	// ------------------------------------------------------ //

	ColorPicker.prototype.setColor = function(newCol, type, alpha, forceRender) {
		focusInstance(this);
		_valueType = true; // right cursor...
		// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers
		preRenderAll(_colorInstance.setColor.apply(_colorInstance, arguments));
		if (forceRender) {
			this.startRender(true);
		}
	};

	ColorPicker.prototype.saveAsBackground = function() {
		focusInstance(this);
		return saveAsBackground(true);
	};

	ColorPicker.prototype.setCustomBackground = function(col) {
		focusInstance(this); // needed???
		return _colorInstance.setCustomBackground(col);
	};

	ColorPicker.prototype.startRender = function(oneTime) {
		focusInstance(this);
		if (oneTime) {
			_mouseMoveAction = false; // prevents window[requestAnimationFrame] in renderAll()
			renderAll();
			this.stopRender();
		} else {
			_mouseMoveAction = 1;
			_renderTimer = window[requestAnimationFrame](renderAll);
		}
	};

	ColorPicker.prototype.stopRender = function() {
		focusInstance(this); // check again
		window[cancelAnimationFrame](_renderTimer);
		if (_valueType) {
			// renderAll();
			_mouseMoveAction = 1;
			stopChange(undefined, 'external');
			// _valueType = undefined;
		}
	};

	ColorPicker.prototype.setMode = function(mode) { // check again ... right cursor
		focusInstance(this);
		setMode(mode);
		initSliders();
		renderAll();
	};

	ColorPicker.prototype.destroyAll = function() { // check this again...
		var html = this.nodes.colorPicker,
			destroyReferences = function(nodes) {
			for (var n in nodes) {
				if (nodes[n] && nodes[n].toString() === '[object Object]' || nodes[n] instanceof Array) {
					destroyReferences(nodes[n]);
				}
				nodes[n] = null;
				delete nodes[n];
			}
		};

		this.stopRender();
		installEventListeners(this, true);
		destroyReferences(this);
		html.parentNode.removeChild(html);
		html = null;
	};

	ColorPicker.prototype.renderMemory = function(memory) {
		var memos = this.nodes.memos,
			tmp = [];

		if (typeof memory === 'string') { // revisit!!!
			memory = memory.replace(/^'|'$/g, '').replace(/\s*/, '').split('\',\'');
		}
		for (var n = memos.length; n--; ) { // check again how to handle alpha...
			if (memory && typeof memory[n] === 'string') {
				tmp = memory[n].replace('rgba(', '').replace(')', '').split(',');
				memory[n] = {r: tmp[0], g: tmp[1], b: tmp[2], a: tmp[3]}
			}
			memos[n].style.cssText = 'background-color: ' + (memory && memory[n] !== undefined ?
				color2string(memory[n]) + ';' + getOpacityCSS(memory[n]['a'] || 1) : 'rgb(0,0,0);');
		}
	};

	// ------------------------------------------------------ //

	function initInstance(THIS, options) {
		var exporter, // do something here..
			mode = '',
			CSSPrefix = '',
			optionButtons;

		for (var option in options) { // deep copy ??
			THIS.options[option] = options[option];
		}
		_colorInstance = new Colors(THIS.options);
		// We transfer the responsibility to the instance of Color (to save space and memory)
		delete THIS.options;
		_options = _colorInstance.options;
		_options.scale = 1;
		CSSPrefix = _options.CSSPrefix;

		THIS.color = _colorInstance; // check this again...
		_valueRanges = _options.valueRanges;
		THIS.nodes = _nodes = getInstanceNodes(buildView(THIS), THIS); // ha, ha,... make this different
		setMode(_options.mode);
		focusInstance(THIS);
		saveAsBackground();

		mode = ' ' + _options.mode.type + '-' + _options.mode.z;
		_nodes.slds.className += mode;
		_nodes.panel.className += mode;
		//_nodes.colorPicker.className += ' cmy-' + _options.cmyOnly;

		if (_options.noHexButton) {
			changeClass(_nodes.HEX_butt, CSSPrefix + 'butt', CSSPrefix + 'labl');
		}

		if (_options.size !== undefined) {
			resizeApp(undefined, _options.size);
		}

		optionButtons = {
			alphaBG: _nodes.alpha_labl,
			cmyOnly: _nodes.HEX_labl // test... take out
		};
		for (var n in optionButtons) {
			if (_options[n] !== undefined) {
				buttonActions({target: optionButtons[n], data: _options[n]});
			}
		}
		if (_options.noAlpha) {
			_nodes.colorPicker.className += ' no-alpha'; // IE6 ??? maybe for IE6 on document.body
		}

		THIS.renderMemory(_options.memoryColors);

		installEventListeners(THIS);
		
		_mouseMoveAction = true;
		stopChange(undefined, 'init');

		if (_previousInstance) {
			focusInstance(_previousInstance);
			renderAll();
		}
	}

	function focusInstance(THIS) {
		_newData = true;
		if (_colorPicker !== THIS) {
			_colorPicker = THIS;
			_colors = THIS.color.colors;
			_options = THIS.color.options;
			_nodes = THIS.nodes;
			_colorInstance = THIS.color;

			_cashedVars = {};
			preRenderAll(_colors);
		}
	}

	function getUISizes() {
		var sizes = ['L', 'S', 'XS', 'XXS'];
		_options.sizes = {};
		_nodes.testNode.style.cssText = 'position:absolute;left:-1000px;top:-1000px;';
		document.body.appendChild(_nodes.testNode);
		for (var n = sizes.length; n--; ) {
			_nodes.testNode.className = _options.CSSPrefix + 'app ' + sizes[n];
			_options.sizes[sizes[n]] = [_nodes.testNode.offsetWidth, _nodes.testNode.offsetHeight];
		}
		if (_nodes.testNode.removeNode) { // old IEs
			_nodes.testNode.removeNode(true);
		} else {
			document.body.removeChild(_nodes.testNode);
		}
	}

	function buildView(THIS) {
		var app = document.createElement('div'),
			prefix = _options.CSSPrefix,
			urlData = 'data:image/png;base64,',
			addStyleSheet = function(cssText, id) {
				var style = document.createElement('style');

				style.setAttribute('type', 'text/css');
				if (id) {
					style.setAttribute('id', id);
				}
				if (!style.styleSheet) {
					style.appendChild(document.createTextNode(cssText));
				}
				document.getElementsByTagName('head')[0].appendChild(style);
				if (style.styleSheet) { // IE compatible
					document.styleSheets[document.styleSheets.length-1].cssText = cssText;
				}
			},
			processCSS = function(doesBAS64){
				// CSS - system
				_data._cssFunc = _data._cssFunc.
					replace(/§/g, prefix).
					replace('_patches.png', doesBAS64 ? urlData + _data._patchesPng : _options.imagePath + '_patches.png').
					replace('_vertical.png', doesBAS64 ? urlData + _data._verticalPng : _options.imagePath + '_vertical.png').
					replace('_horizontal.png', doesBAS64 ? urlData + _data._horizontalPng :
						_options.imagePath + '_horizontal.png');
				addStyleSheet(_data._cssFunc, 'colorPickerCSS');
				// CSS - main
				if (!_options.customCSS) {
					_data._cssMain = _data._cssMain.
						replace(/§/g, prefix).
						replace('_bgs.png', doesBAS64 ? urlData + _data._bgsPng : _options.imagePath + '_bgs.png').
						replace('_icons.png', doesBAS64 ? urlData + _data._iconsPng : _options.imagePath + '_icons.png').
						// replace('"Courier New",', !_isIE ? '' : '"Courier New",').
						replace(/opacity:(\d*\.*(\d+))/g, function($1, $2){
							return !_doesOpacity ? '-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=' +
							_math.round(+$2 * 100) + ')";filter: alpha(opacity=' + _math.round(+$2 * 100) + ')' :
							'-moz-opacity: ' + $2 + '; -khtml-opacity: ' + $2 + '; opacity: ' + $2;
						});
					// style.appendChild(document.createTextNode(_data._cssFunc));
					addStyleSheet(_data._cssMain);
				}
				// for (var n in _data) { // almost 25k of memory ;o)
				// 	_data[n] = null;
				// }
			},
			test = document.createElement('img');

		// development mode
		if (_devMode) {
			return THIS.color.options.devPicker;
		}

		// CSS
		if (!document.getElementById('colorPickerCSS')) { // only once needed
			test.onload = test.onerror = function(){
				if (_data._cssFunc) {
					processCSS(this.width === 1 && this.height === 1);
				}
			};
			test.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		}

		// HTML
		if (_previousInstance = _colorPicker) {
			// we need to be careful with recycling HTML as slider calssNames might have been changed...
			initSliders();
		}
		// app.innerHTML = _colorPicker ? _colorPicker.nodes.colorPicker.outerHTML : _data._html.replace(/§/g, prefix);
		// faster ... FF8.0 (2011) though (but IE4)
		// outerHTML ... FF11 (2013)
		app.insertAdjacentHTML('afterbegin',
			_colorPicker ? _colorPicker.nodes.colorPicker.outerHTML ||
				new XMLSerializer().serializeToString(_colorPicker.nodes.colorPicker) : // FF before F11
				_data._html.replace(/§/g, prefix));
			// _colorPicker ? _colorPicker.nodes.colorPicker.parentNode.innerHTML : _data._html.replace(/§/g, prefix));
		// _data._html = null;

		app = app.children[0];
		app.style.cssText = _options.initStyle || ''; // for initial hiding...
		// get a better addClass for this....
		// app.className = app.className.split(' ')[0]; // cleanup for multy instances

		return (_options.appendTo || document.body).appendChild(app);
	}

	function getInstanceNodes(colorPicker, THIS) { // check nodes again... are they all needed?
		var all = colorPicker.getElementsByTagName('*'),
			nodes = {colorPicker: colorPicker}, // length ?? // rename nodes.colorPicker
			node,
			className,
			memoCounter = 0,
			regexp = new RegExp(_options.CSSPrefix);

		// nodes.displayStyles = {}; // not needed ... or change to CSS
		nodes.styles = {};
		// nodes.styles.displays = {};

		nodes.textNodes = {};
		nodes.memos = [];
		nodes.testNode = document.createElement('div');

		for (var n = 0, m = all.length; n < m; n++) {
			node = all[n];
			if ((className = node.className) && regexp.test(className)) {
				className = className.split(' ')[0].replace(_options.CSSPrefix, '').replace(/-/g, '_');
				if (/_disp/.test(className)) {
					className = className.replace('_disp', '');
					// nodes.styles.displays[className] = node.style;
					nodes.styles[className] = node.style;
					nodes.textNodes[className] = node.firstChild;
					node.contentEditable = true; // does this slow down rendering??
				} else {
					if (!(/(?:hs|cmyk|Lab).*?(?:butt|labl)/.test(className))) {
						nodes[className] = node;
					}
					if (/(?:cur|sld[^s]|opacity|cont|col)/.test(className)) {
						nodes.styles[className] = /(?:col\d)/.test(className) ? node.children[0].style : node.style;
					}
				}
			} else if (/memo/.test(node.parentNode.className)) {
				nodes.memos.push(node);
			}
		}

		// Chrome bug: focuses contenteditable on mouse over while dragging
		nodes.panelCover = nodes.panel.appendChild(document.createElement('div'));

		return nodes;
	}

	// ------------------------------------------------------ //
	// ---- Add event listners to colorPicker and window ---- //
	// -------------------------------------------------------//

	function installEventListeners(THIS, off) {
		var onOffEvent = off ? removeEvent : addEvent;

		onOffEvent(_nodes.colorPicker, 'mousedown', function(e) {
			var event = e || window.event,
				page = getPageXY(event),
				target = event.target || event.srcElement,
				className = target.className;
			
			focusInstance(THIS);
			_mainTarget = target;
			stopChange(undefined, 'resetEventListener');
			_action = ''; // needed due to minification of javaScript

			if (target === _nodes.sldl_3 || target === _nodes.curm) {
				_mainTarget = _nodes.sldl_3;
				_mouseMoveAction = changeXYValue;
				_action = 'changeXYValue';
				changeClass(_nodes.slds, 'do-drag');
			} else if (/sldr/.test(className) || target === _nodes.curl || target === _nodes.curr) {
				_mainTarget = _nodes.sldr_4;
				_mouseMoveAction = changeZValue;
				_action = 'changeZValue';
			} else if (target === _nodes.opacity.children[0] || target === _nodes.opacity_slider) {
				_mainTarget = _nodes.opacity;
				_mouseMoveAction = changeOpacityValue;
				_action = 'changeOpacityValue';
			} else if (/-disp/.test(className) && !/HEX-/.test(className)) {
				_mouseMoveAction = changeInputValue;
				_action = 'changeInputValue';
				(target.nextSibling.nodeType === 3 ? target.nextSibling.nextSibling : target.nextSibling).
					appendChild(_nodes.nsarrow); // nextSibling for better text selection
				_valueType = className.split('-disp')[0].split('-');
				_valueType = {type: _valueType[0], z: _valueType[1] || ''};
				changeClass(_nodes.panel, 'start-change');
				_delayState = 0;
			} else if (target === _nodes.resize && !_options.noResize) {
				if (!_options.sizes) {
					getUISizes();
				}
				_mainTarget = _nodes.resizer;
				_mouseMoveAction = resizeApp;
				_action = 'resizeApp';
			} else {
				_mouseMoveAction = undefined;
			}

			if (_mouseMoveAction) {
				_startCoords = {pageX: page.X, pageY: page.Y};
				_mainTarget.style.display = 'block'; // for resizer...
				_targetOrigin = getOrigin(_mainTarget);
				_targetOrigin.width = _nodes.opacity.offsetWidth; // ???????
				_targetOrigin.childWidth = _nodes.opacity_slider.offsetWidth; // ???????
				_mainTarget.style.display = ''; // ??? for resizer...
				_mouseMoveAction(event);
				addEvent(_isIE ? document.body : window, 'mousemove', _mouseMoveAction);
				_renderTimer = window[requestAnimationFrame](renderAll);
			} else {
				// console.log(className)
				// console.log(THIS.nodes[className.split(' ')[0].replace('cp-', '').replace('-', '_')])
				// resize, button states, etc...
			}

			// if (_mouseMoveAction !== changeInputValue) preventDefault(event);
			if (!/-disp/.test(className)) {
				return preventDefault(event);
				// document.activeElement.blur();
			}
		});

		onOffEvent(_nodes.colorPicker, 'click', function(e) {
			focusInstance(THIS);
			buttonActions(e);
		});

		onOffEvent(_nodes.colorPicker, 'dblclick', buttonActions);

		onOffEvent(_nodes.colorPicker, 'keydown', function(e) {
			focusInstance(THIS);
			keyControl(e);
		});

		// keydown is before keypress and focuses already
		onOffEvent(_nodes.colorPicker, 'keypress', keyControl);
		// onOffEvent(_nodes.colorPicker, 'keyup', keyControl);

		onOffEvent(_nodes.colorPicker, 'paste', function(e) {
			e.target.firstChild.data = e.clipboardData.getData('Text');
			return preventDefault(e);
		});
	}

	addEvent(_isIE ? document.body : window, 'mouseup', stopChange);

	// ------------------------------------------------------ //
	// --------- Event listner's callback functions  -------- //
	// -------------------------------------------------------//

	function stopChange(e, action) {
		var mouseMoveAction = _mouseMoveAction;

		if (_mouseMoveAction) { // why??? please test again...
			// if (document.selection && _mouseMoveAction !== changeInputValue) {
			// 	//ie -> prevent showing the accelerator menu
			// 	document.selection.empty();
			// }
			window[cancelAnimationFrame](_renderTimer);
			removeEvent(_isIE ? document.body : window, 'mousemove', _mouseMoveAction);
			if (_delayState) { // hapens on inputs
				_valueType = {type: 'alpha'};
				renderAll();
			}
			// this is dirty... has to do with M|W|! button
			if (typeof _mouseMoveAction === 'function' || typeof _mouseMoveAction === 'number') {
				delete _options.webUnsave;
			}

			_delayState = 1;
			_mouseMoveAction = undefined;

			changeClass(_nodes.slds, 'do-drag', '');
			changeClass(_nodes.panel, '(?:start-change|do-change)', '');

			_nodes.resizer.style.cssText = '';
			_nodes.panelCover.style.cssText = '';

			_nodes.memo_store.style.cssText = 'background-color: ' +
				color2string(_colors.RND.rgb) + '; ' + getOpacityCSS(_colors.alpha);
			_nodes.memo.className = _nodes.memo.className.replace(/\s+(?:dark|light)/, '') +
				// (/dark/.test(_nodes.colorPicker.className) ? ' dark' : ' light');
				(_colors['rgbaMix' + _bgTypes[_options.alphaBG]].luminance < 0.22 ? ' dark' : ' light');
				// (_colors.rgbaMixCustom.luminance < 0.22 ? ' dark' : ' light')

			_valueType = undefined;

			resetCursors();

			if (_options.actionCallback) {
				_options.actionCallback(e, _action || mouseMoveAction.name || action || 'external');
			}
		}
	}

	function changeXYValue(e) {
		var event = e || window.event,
			scale = _options.scale,
			page = getPageXY(event),
			x = (page.X - _targetOrigin.left) * (scale === 4 ? 2 : scale),
			y = (page.Y - _targetOrigin.top) * scale,
			mode = _options.mode;

		_colors[mode.type][mode.x] = limitValue(x / 255, 0, 1);
		_colors[mode.type][mode.y] = 1 - limitValue(y / 255,  0, 1);
		convertColors();
		return preventDefault(event);
	}

	function changeZValue(e) { // make this part of changeXYValue
		var event = e || window.event,
			page = getPageXY(event),
			z = (page.Y - _targetOrigin.top) * _options.scale,
			mode = _options.mode;

		_colors[mode.type][mode.z] = 1 - limitValue(z / 255,  0, 1);
		convertColors();
		return preventDefault(event);
	}

	function changeOpacityValue(e) {
		var event = e || window.event,
			page = getPageXY(event);

		_newData = true;
		_colors.alpha = limitValue(_math.round(
			(page.X - _targetOrigin.left) / _targetOrigin.width * 100), 0, 100
		) / 100;
		convertColors('alpha');
		return preventDefault(event);
	}

	function changeInputValue(e) {
		var event = e || window.event,
			page = getPageXY(event),
			delta = _startCoords.pageY - page.Y,
			delayOffset = _options.delayOffset,
			type = _valueType.type,
			isAlpha = type === 'alpha',
			ranges;

		if (_delayState || _math.abs(delta) >= delayOffset) {
			if (!_delayState) {
				_delayState = (delta > 0 ? -delayOffset : delayOffset) +
					(+_mainTarget.firstChild.data) * (isAlpha ? 100 : 1);
				_startCoords.pageY += _delayState;
				delta += _delayState;
				_delayState = 1;
				changeClass(_nodes.panel, 'start-change', 'do-change');
				_nodes.panelCover.style.cssText = 'position:absolute;left:0;top:0;right:0;bottom:0';
				// window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				document.activeElement.blur();
				_renderTimer = window[requestAnimationFrame](renderAll);
			}

			if (type === 'cmyk' && _options.cmyOnly) {
				type = 'cmy';
			}

			if (isAlpha) {
				_newData = true;
				_colors.alpha = limitValue(delta / 100, 0, 1);
			} else {
				ranges = _valueRanges[type][_valueType.z];
				_colors[type][_valueType.z] = type === 'Lab' ? limitValue(delta, ranges[0], ranges[1]) :
					limitValue(delta / ranges[1], 0, 1);
			}
			convertColors(isAlpha ? 'alpha' : type);
			// event.returnValue is deprecated. Please use the standard event.preventDefault() instead.
			// event.returnValue = false; // see: pauseEvent(event);
			return preventDefault(event);
		}
	}

	function keyControl(e) { // this is quite big for what it does...
		var event = e || window.event,
			keyCode =  event.which || event.keyCode,
			key = String.fromCharCode(keyCode),
			elm = document.activeElement,

			cln = elm.className.replace(_options.CSSPrefix, '').split('-'),
			type = cln[0],
			mode = cln[1],

			isAlpha = type === 'alpha',
			isHex = type === 'HEX',
			arrowKey = {k40: -1, k38: 1, k34: -10, k33: 10}['k' + keyCode] / (isAlpha ? 100 : 1),
			validKeys = {'HEX': /[0-9a-fA-F]/, 'Lab': /[\-0-9]/, 'alpha': /[\.0-9]/}[type] || /[0-9]/,
			valueRange = _valueRanges[type][type] || _valueRanges[type][mode], // let op!

			textNode = elm.firstChild, // chnge on TAB key
			rangeData = caret(elm),
			origValue = textNode.data, // do not change
			value,
			val = origValue === '0' && !isHex ? [] : origValue.split(''); // gefixt

		if (/^(?:27|13)$/.test(keyCode)) { // ENTER || ESC
			preventDefault(event);
			elm.blur();
		} else if (event.type === 'keydown') { // functional keys
			if (arrowKey) { // arrow/page keys
				value = limitValue(_math.round((+origValue + arrowKey) * 1e+6) / 1e+6, valueRange[0], valueRange[1]);
			} else if (/^(?:8|46)$/.test(keyCode)) { // DELETE / BACKSPACE
				if (!rangeData.range) {
					rangeData.range++;
					rangeData.start -= keyCode === 8 ? 1 : 0;
				}
				val.splice(rangeData.start, rangeData.range);
				value = val.join('') || '0'; // never loose elm.firstChild
			}

			if (value !== undefined) { // prevent keypress
				preventDefault(event, true);
			}
		} else if (event.type === 'keypress') {
			if (!/^(?:37|39|8|46|9)$/.test(keyCode)) { // left, right,DEL, BACK, TAB for FF
				preventDefault(event, true);
			}
			if (validKeys.test(key)) { // regular input
				val.splice(rangeData.start, rangeData.range, key);
				value = val.join('');
			}
			rangeData.start++;
		}

		if (keyCode === 13 && isHex) {
			if (textNode.data.length % 3 === 0 || textNode.data === '0') { // textNode.data.length && 
				return _colorPicker.setColor(textNode.data === '0' ? '000' : textNode.data, 'rgb', _colors.alpha, true);
			} else {
				preventDefault(event, true);
				return elm.focus();
			}
		}

		if (isHex && value !== undefined) {
			value = /^0+/.test(value) ? value : parseInt(''+value, 16) || 0;
		}

		if (value !== undefined && value !== '' && +value >= valueRange[0] && +value <= valueRange[1]) {
			if (isHex) {
				value = value.toString(16).toUpperCase() || '0';
			}
			if (isAlpha) {
				_colors[type] = +value;
			} else if (!isHex) {
				_colors[type][mode] = +value / (type === 'Lab' ? 1 : valueRange[1]);
			}
			convertColors(isAlpha ? 'alpha' : type);

			preRenderAll(_colors);
			_mouseMoveAction = true;
			stopChange(e, event.type);

			textNode.data = value; // if 
			caret(elm, _math.min(elm.firstChild.data.length, rangeData.start < 0 ? 0 : rangeData.start));
		}
	}

	function buttonActions(e) {
		var event = e || window.event,
			target = event.target || event.srcElement,
			targetClass = target.className,
			parent = target.parentNode,
			options = _options,
			RGB = _colors.RND.rgb,
			customBG, alphaBG,
			mode = _options.mode,
			newMode = '',
			prefix = options.CSSPrefix,
			isModeButton = /(?:hs|rgb)/.test(parent.className) && /^[HSBLRG]$/.test(
				target.firstChild ? target.firstChild.data : ''
			),
			isDblClick = /dblc/.test(event.type),
			buttonAction = ''; // think this over again....

		if (isDblClick && !isModeButton) {
			return;
		} else if (targetClass.indexOf('-labl ' + prefix + 'labl') !== -1) { // HSB -> HSL; CMYK -> Lab buttons
			changeClass(_nodes[targetClass.split('-')[0]], prefix + 'hide', '');
			changeClass(_nodes[parent.className.split('-')[1]], prefix + 'hide');
		} else if (targetClass.indexOf(prefix + 'butt') !== -1) { // BUTTONS
			if (isModeButton) { // set render modes
				if (isDblClick && _options.scale === 2) {
					newMode = /hs/.test(mode.type) ? 'rgb' : /hide/.test(_nodes.hsl.className) ? 'hsv' : 'hsl';
					newMode = newMode + '-' + newMode[mode.type.indexOf(mode.z)];
				}
				_colorPicker.setMode(newMode ? newMode : targetClass.replace('-butt', '').split(' ')[0]);
				buttonAction = 'modeChange';
			} else if (/^[rgb]/.test(targetClass)) { // no vertical slider rendering in RGB mode
				newMode = targetClass.split('-')[1];
				changeClass(_nodes.colorPicker, 'no-rgb-' + newMode,
					(options['noRGB' + newMode] = !options['noRGB' + newMode]) ? undefined : '');
				buttonAction = 'noRGB' + newMode;
				// preRenderAll();
			} else if (target === _nodes.alpha_labl) { // alpha button right (background of raster)
				customBG = options.customBG;
				alphaBG = options.alphaBG;
				changeClass(_nodes.colorPicker, 'alpha-bg-' + alphaBG, 'alpha-bg-' +
					(alphaBG = options.alphaBG = e.data || (alphaBG === 'w' ? (customBG ? 'c' : 'b') :
					alphaBG === 'c' ? 'b' : 'w')));
				target.firstChild.data = alphaBG.toUpperCase();
				_nodes.ctrl.style.backgroundColor = _nodes.memo.style.backgroundColor =
					alphaBG !== 'c' ? '' : 'rgb(' + _math.round(customBG.r * 255) + ', ' +
					_math.round(customBG.g * 255) + ', ' +
					_math.round(customBG.b * 255) + ')';
				_nodes.raster.style.cssText = _nodes.raster_bg.previousSibling.style.cssText =
					alphaBG !== 'c' ? '' : getOpacityCSS(customBG.luminance < 0.22 ? 0.5 : 0.4);
				buttonAction = 'alphaBackground';
			} else if (target === _nodes.alpha_butt) { // alpha button left (disable alpha rendering)
				changeClass(_nodes.colorPicker, 'mute-alpha', (options.muteAlpha = !options.muteAlpha) ? undefined : '');
				buttonAction = 'alphaState';
			} else if (target === _nodes.HEX_butt) { // make it on/off
				changeClass(_nodes.colorPicker, 'no-HEX', (options.HEXState = !options.HEXState) ? undefined : '');
				buttonAction = 'HEXState';
			} else if (target === _nodes.HEX_labl) { // web save state change
				var isWebSave = _colors.saveColor === 'web save';

				if (_colors.saveColor !== 'web smart' && !isWebSave) {
					options.webUnsave = copyColor(RGB);
					_colorPicker.setColor(_colors.webSmart, 'rgb');
				} else if (!isWebSave) {
					if (!options.webUnsave) {
						options.webUnsave = copyColor(RGB);
					}
					_colorPicker.setColor(_colors.webSave, 'rgb');
				} else {
					_colorPicker.setColor(options.webUnsave, 'rgb');
				}
				buttonAction = 'webColorState';
			} else if (/Lab-x-labl/.test(targetClass)) { //target === _nodes.cmyk_type) {
				// switch between CMYK and CMY
				changeClass(_nodes.colorPicker, 'cmy-only', (options.cmyOnly = !options.cmyOnly) ? undefined : '');
				buttonAction = 'cmykState';
			}
		} else if (target === _nodes.bsav) { // SAVE
			saveAsBackground();
			buttonAction = 'saveAsBackground';
		} else if (target === _nodes.bres) { // RESET
			var tmpColor = copyColor(RGB),
				tmpAlpha = _colors.alpha;

			// a bit heavy but... doesn't matter here
			// newCol, type, alpha, forceRender
			_colorPicker.setColor(options.color);
			saveAsBackground();
			_colorPicker.setColor(tmpColor, 'rgb', tmpAlpha);
			buttonAction = 'resetColor';
		} else if (parent === _nodes.col1) { // COLOR left
			// _colors.hsv.h = (_colors.hsv.h + 0.5) % 1; // not acurate
			_colors.hsv.h -= (_colors.hsv.h > 0.5 ? 0.5 : -0.5);
			convertColors('hsv');
			buttonAction = 'shiftColor';

		} else if (parent === _nodes.col2) { // COLOR right
			_colorPicker.setColor(target.style.backgroundColor, 'rgb', _colors.background.alpha);
			buttonAction = 'setSavedColor';
		} else if (parent === _nodes.memo) { // MEMORIES // revisit...
			var resetBlink = function() {
					if (_nodes.memos.blinker) _nodes.memos.blinker.style.cssText = _nodes.memos.cssText;
				},
				doBlink = function(elm) {
					_nodes.memos.blinker = elm;
					elm.style.cssText = 'background-color:' + (_colors.RGBLuminance > 0.22 ? '#333' : '#DDD');
					window.setTimeout(resetBlink, 200);
				};

			if (target === _nodes.memo_cursor) { // save color in memo
				resetBlink();
				_nodes.memos.blinker = undefined;
				_nodes.testNode.style.cssText = _nodes.memo_store.style.cssText;
				_nodes.memos.cssText = _nodes.testNode.style.cssText; // ...how browser sees css
				for (var n = _nodes.memos.length - 1; n--; ) { // check if color already exists
					if (_nodes.memos.cssText === _nodes.memos[n].style.cssText) {
						doBlink(_nodes.memos[n]); // sets _nodes.memos.blinker
						break;
					}
				}
				if (!_nodes.memos.blinker) { // right shift colors
					for (var n = _nodes.memos.length - 1; n--; ) {
						_nodes.memos[n + 1].style.cssText = _nodes.memos[n].style.cssText;
					}
					_nodes.memos[0].style.cssText = _nodes.memo_store.style.cssText;
				}
				buttonAction = 'toMemery';
			} else { // reset color from memo
				resetBlink();
				_colorPicker.setColor(target.style.backgroundColor, 'rgb', target.style.opacity || 1);
				_nodes.memos.cssText = target.style.cssText;
				doBlink(target);
				// this is dirty... has to do with M|W|! button
				_mouseMoveAction = 1;
				buttonAction = 'fromMemory';
			}

		}
		// think this over again, does this need to be like this??
		if (buttonAction) {
			preRenderAll(_colors);
			_mouseMoveAction = _mouseMoveAction || true; // !!!! search for: // this is dirty...
			stopChange(e, buttonAction);
		}
	}

	function resizeApp(e, size) {
		var event = e || window.event,
			page = event ? getPageXY(event) : {},
			isSize = size !== undefined,
			x = isSize ? size : page.X - _targetOrigin.left + 8,
			y = isSize ? size : page.Y - _targetOrigin.top + 8,
			values = [' S XS XXS', ' S XS', ' S', ''],
			sizes = _options.sizes, // from getUISizes();
			currentSize = isSize ? size :
				y < sizes.XXS[1] + 25 ? 0 :
				x < sizes.XS[0] + 25 ? 1 :
				x < sizes.S[0] + 25 || y < sizes.S[1] + 25 ? 2 : 3,
			value = values[currentSize],
			isXXS = false,
			mode,
			tmp = '';

		if (_cashedVars.resizer !== value) {
			isXXS = /XX/.test(value);
			mode = _options.mode;

			if (isXXS && (!/hs/.test(mode.type) || mode.z === 'h')) {
				tmp = mode.type + '-' + mode.z;
				_colorPicker.setMode(/hs/.test(mode.type) ? mode.type + '-s': 'hsv-s');
				_options.mode.original = tmp;
			} else if (mode.original) {
				// setMode(mode) creates a new object so mode.original gets deleted automatically
				_colorPicker.setMode(mode.original);
			}

			_nodes.colorPicker.className = _nodes.colorPicker.className.replace(/\s+(?:S|XS|XXS)/g, '') + value;
			_options.scale = isXXS ? 4 : /S/.test(value) ? 2 : 1;
			_options.currentSize = currentSize;

			_cashedVars.resizer = value;

			// fix this... from this point on inside if() ... convertColors();
			_newData = true;
			renderAll();
			resetCursors();
		}

		_nodes.resizer.style.cssText = 'display: block;' +
			'width: '  + (x > 10 ? x : 10) + 'px;' +
			'height: ' + (y > 10 ? y : 10) + 'px;';
	}

	// ------------------------------------------------------ //
	// --- Colors calculation and rendering related stuff  --- //
	// -------------------------------------------------------//

	function setMode(mode) {
		var ModeMatrix = {
			rgb_r : {x: 'b', y: 'g'},
			rgb_g : {x: 'b', y: 'r'},
			rgb_b : {x: 'r', y: 'g'},

			hsv_h : {x: 's', y: 'v'},
			hsv_s : {x: 'h', y: 'v'},
			hsv_v : {x: 'h', y: 's'},

			hsl_h : {x: 's', y: 'l'},
			hsl_s : {x: 'h', y: 'l'},
			hsl_l : {x: 'h', y: 's'}
		},
		key = mode.replace('-', '_'),
		regex = '\\b(?:rg|hs)\\w\\-\\w\\b'; // \\b\\w{3}\\-\\w\\b';

		// changeClass(_nodes.colorPicker, '(?:.*?)$', mode);
		// changeClass(_nodes.colorPicker, '\\b\\w{3}\\-\\w\\b', mode);
		// changeClass(_nodes.slds, '\\b\\w{3}\\-\\w\\b', mode);
		changeClass(_nodes.panel, regex, mode);
		changeClass(_nodes.slds, regex, mode);

		mode = mode.split('-');
		return _options.mode = {
			type: mode[0],
			x: ModeMatrix[key].x,
			y: ModeMatrix[key].y,
			z: mode[1]
		};
	}

	function initSliders() { // function name...
		var regex = /\s+(?:hue-)*(?:dark|light)/g,
			className = 'className'; // minification

		_nodes.curl[className] = _nodes.curl[className].replace(regex, ''); // .....
		_nodes.curr[className] = _nodes.curr[className].replace(regex, ''); // .....
		_nodes.slds[className] = _nodes.slds[className].replace(regex, '');
		// var sldrs = ['sldr_2', 'sldr_4', 'sldl_3'];
		// for (var n = sldrs.length; n--; ) {
		// 	_nodes[sldrs[n]][className] = _options.CSSPrefix + sldrs[n].replace('_', '-');
		// }
		_nodes.sldr_2[className] = _options.CSSPrefix + 'sldr-2';
		_nodes.sldr_4[className] = _options.CSSPrefix + 'sldr-4';
		_nodes.sldl_3[className] = _options.CSSPrefix + 'sldl-3';

		for (var style in _nodes.styles) {
			if (!style.indexOf('sld')) _nodes.styles[style].cssText = '';
		}
		_cashedVars = {};
	}

	function resetCursors() {
		// _renderVars.isNoRGB = undefined;
		_nodes.styles.curr.cssText = _nodes.styles.curl.cssText; // only coordinates
		_nodes.curl.className = _options.CSSPrefix + 'curl' + (
			_renderVars.noRGBZ ? ' ' + _options.CSSPrefix + 'curl-' +_renderVars.noRGBZ: '');
		_nodes.curr.className = _options.CSSPrefix + 'curr ' + _options.CSSPrefix + 'curr-' +
			(_options.mode.z === 'h' ? _renderVars.HUEContrast : _renderVars.noRGBZ ?
				_renderVars.noRGBZ : _renderVars.RGBLuminance);
	}

	function convertColors(type) {
		preRenderAll(_colorInstance.setColor(undefined, type || _options.mode.type));
		_newData = true;
	}

	function saveAsBackground(refresh) {
		_colorInstance.saveAsBackground();
		_nodes.styles.col2.cssText = 'background-color: ' + color2string(_colors.background.RGB) + ';' +
			getOpacityCSS(_colors.background.alpha);
		
		if (refresh) {
			preRenderAll(_colors);
			// renderAll();
		}
		return (_colors);
	}

	function preRenderAll(colors) {
		var _Math = _math,
			renderVars = _renderVars,
			bgType = _bgTypes[_options.alphaBG];

		renderVars.hueDelta = _Math.round(colors['rgbaMixBGMix' + bgType].hueDelta * 100);
		// renderVars.RGBLuminanceDelta = _Math.round(colors.RGBLuminanceDelta * 100);
		renderVars.luminanceDelta = _Math.round(colors['rgbaMixBGMix' + bgType].luminanceDelta * 100);
		renderVars.RGBLuminance = colors.RGBLuminance > 0.22 ? 'light' : 'dark';
		renderVars.HUEContrast = colors.HUELuminance > 0.22 ? 'light' : 'dark';
		// renderVars.contrast = renderVars.RGBLuminanceDelta > renderVars.hueDelta ? 'contrast' : '';
		renderVars.contrast = renderVars.luminanceDelta > renderVars.hueDelta ? 'contrast' : '';
		renderVars.readabiltiy =
			colors['rgbaMixBGMix' + bgType].WCAG2Ratio >= 7 ? 'green' :
			colors['rgbaMixBGMix' + bgType].WCAG2Ratio >= 4.5 ? 'orange': '';
		renderVars.noRGBZ = _options['no' + _options.mode.type.toUpperCase() + _options.mode.z] ?
			(_options.mode.z === 'g' && colors.rgb.g < 0.59 || _options.mode.z === 'b' || _options.mode.z === 'r' ?
			'dark' : 'light') : undefined;
	}

	function renderAll() { // maybe render alpha seperately...
		if (_mouseMoveAction) {
			// _renderTimer = window[requestAnimationFrame](renderAll);
			if (!_newData) return (_renderTimer = window[requestAnimationFrame](renderAll));
			_newData = false;
		}
		// console.time('renderAll');
		var options = _options,
			mode = options.mode,
			scale = options.scale,
			prefix = options.CSSPrefix,
			colors = _colors,
			nodes = _nodes,
			CSS = nodes.styles,
			textNodes = nodes.textNodes,
			valueRanges = _valueRanges,
			valueType = _valueType,
			renderVars = _renderVars,
			cashedVars = _cashedVars,

			_Math = _math,
			_getOpacityCSS = getOpacityCSS,
			_color2string = color2string,

			a = 0,
			b = 0,
			x  = colors[mode.type][mode.x],
			X = _Math.round(x * 255 / (scale === 4 ? 2 : scale)),
			y_ = colors[mode.type][mode.y],
			y = 1 - y_,
			Y = _Math.round(y * 255 / scale),
			z  = 1 - colors[mode.type][mode.z],
			Z = _Math.round(z * 255 / scale),
			coords = (1 === 1) ? [x, y_] : [0, 0], // (1 === 2) button label up

			isRGB = mode.type === 'rgb',
			isHue = mode.z === 'h',
			isHSL = mode.type === 'hsl',
			isHSL_S = isHSL && mode.z === 's',
			moveXY = _mouseMoveAction === changeXYValue,
			moveZ  = _mouseMoveAction === changeZValue,
			display, tmp, value, slider;

		if (isRGB) {
			if (coords[0] >= coords[1]) b = 1; else a = 1;
			if (cashedVars.sliderSwap !== a) {
				nodes.sldr_2.className = options.CSSPrefix + 'sldr-' + (3 - a);
				cashedVars.sliderSwap = a;
			}
		}
		if ((isRGB && !moveZ) || (isHue && !moveXY) || (!isHue && !moveZ)) {
			CSS[isHue ? 'sldl_2' : 'sldr_2'][isRGB ? 'cssText' : 'backgroundColor'] =
				isRGB ? _getOpacityCSS((coords[a] - coords[b]) / (1 - (coords[b]) || 0)) : _color2string(colors.hueRGB);
		}
		if (!isHue) {
			if (!moveZ)  CSS.sldr_4.cssText = _getOpacityCSS(isRGB ? coords[b] : isHSL_S ? _Math.abs(1 - y * 2) : y);
			if (!moveXY) CSS.sldl_3.cssText = _getOpacityCSS(isHSL && mode.z === 'l' ? _Math.abs(1 - z * 2) : z);
			if (isHSL) { // switch slider class name for black/white color half way through in HSL(S|L) mode(s)
				slider = isHSL_S ? 'sldr_4' : 'sldl_3';
				tmp = isHSL_S ? 'r-' : 'l-';
				value = isHSL_S ? (y > 0.5 ? 4 : 3) : (z > 0.5 ? 3 : 4);

				if (cashedVars[slider] !== value) {
					nodes[slider].className = options.CSSPrefix + 'sld' + tmp + value;
					cashedVars[slider] = value;
				}
			}
		}

		if (!moveZ) CSS.curm.cssText = 'left: ' + X + 'px; top: ' + Y + 'px;';
		if (!moveXY) CSS.curl.top = Z + 'px';
		if (valueType) CSS.curr.top = Z + 'px'; // && valueType.type !== mode.type
		if ((valueType && valueType.type === 'alpha') || _mainTarget === nodes.opacity) {
			CSS.opacity_slider.left = options.opacityPositionRelative ? (colors.alpha * (
				(_targetOrigin.width || nodes.opacity.offsetWidth) -
				(_targetOrigin.childWidth || nodes.opacity_slider.offsetWidth))) + 'px' :
				(colors.alpha * 100) + '%';
		}

		CSS.col1.cssText = 'background-color: ' + _color2string(colors.RND.rgb) + '; ' +
			(options.muteAlpha ? '' : _getOpacityCSS(colors.alpha));
		CSS.opacity.backgroundColor = _color2string(colors.RND.rgb);
		CSS.cold.width = renderVars.hueDelta + '%';
		CSS.cont.width = renderVars.luminanceDelta + '%';

		for (display in textNodes) {
			tmp = display.split('_');
			if (options.cmyOnly) {
				tmp[0] = tmp[0].replace('k', '');
			}
			value = tmp[1] ? colors.RND[tmp[0]][tmp[1]] : colors.RND[tmp[0]] || colors[tmp[0]];
			if (cashedVars[display] !== value) {
				cashedVars[display] = value;
				textNodes[display].data = value > 359.5 && display !== 'HEX' ? 0 : value;

				if (display !== 'HEX' && !options.noRangeBackground) {
					value = colors[tmp[0]][tmp[1]] !== undefined ? colors[tmp[0]][tmp[1]] : colors[tmp[0]];
					if (tmp[0] === 'Lab') {
						value = (value - valueRanges[tmp[0]][tmp[1]][0]) /
							(valueRanges[tmp[0]][tmp[1]][1] - valueRanges[tmp[0]][tmp[1]][0]);
					}
					CSS[display].backgroundPosition = _Math.round((1 - value) * 100) + '% 0%';
				}
			}
		}
		// Lab out of gammut
		tmp = colors._rgb ? [
			colors._rgb.r !== colors.rgb.r,
			colors._rgb.g !== colors.rgb.g,
			colors._rgb.b !== colors.rgb.b
		] : [];
		if (tmp.join('') !== cashedVars.outOfGammut) {
			nodes.rgb_r_labl.firstChild.data = tmp[0] ? '!' : ' ';
			nodes.rgb_g_labl.firstChild.data = tmp[1] ? '!' : ' ';
			nodes.rgb_b_labl.firstChild.data = tmp[2] ? '!' : ' ';
			cashedVars.outOfGammut = tmp.join('');
		}
		if (renderVars.noRGBZ) {
			if (cashedVars.noRGBZ !== renderVars.noRGBZ) {
				nodes.curl.className = prefix + 'curl ' + prefix + 'curl-' + renderVars.noRGBZ;
					
				if (!moveZ) {
					nodes.curr.className = prefix + 'curr ' + prefix + 'curr-' + renderVars.noRGBZ;
				}
				cashedVars.noRGBZ = renderVars.noRGBZ;
			}
		}
		if (cashedVars.HUEContrast !== renderVars.HUEContrast && mode.z === 'h') {
			nodes.slds.className = nodes.slds.className.replace(/\s+hue-(?:dark|light)/, '') +
				' hue-' + renderVars.HUEContrast;
			if (!moveZ) {
				nodes.curr.className = prefix + 'curr ' + prefix + 'curr-' + renderVars.HUEContrast;
			}
			cashedVars.HUEContrast = renderVars.HUEContrast;
		} else if (cashedVars.RGBLuminance !== renderVars.RGBLuminance) { // test for no else
			nodes.colorPicker.className = nodes.colorPicker.className.replace(/\s+(?:dark|light)/, '') +
				' ' + renderVars.RGBLuminance;
			if (!moveZ && mode.z !== 'h' && !renderVars.noRGBZ) {
				nodes.curr.className = prefix + 'curr ' + prefix + 'curr-' + renderVars.RGBLuminance;
			}
			cashedVars.RGBLuminance = renderVars.RGBLuminance;
		}

		if (cashedVars.contrast !== renderVars.contrast || cashedVars.readabiltiy !== renderVars.readabiltiy) {
			nodes.ctrl.className = nodes.ctrl.className.replace(' contrast', '').replace(/\s*(?:orange|green)/, '') +
				(renderVars.contrast ? ' ' + renderVars.contrast : '') +
				(renderVars.readabiltiy ? ' ' + renderVars.readabiltiy : '');
			cashedVars.contrast = renderVars.contrast;
			cashedVars.readabiltiy = renderVars.readabiltiy;
		}

		if (cashedVars.saveColor !== colors.saveColor) {
			nodes.HEX_labl.firstChild.data = !colors.saveColor ? '!' : colors.saveColor === 'web save' ? 'W' : 'M';
			cashedVars.saveColor = colors.saveColor;
		}

		if (options.renderCallback) {
			options.renderCallback(colors, mode); // maybe more parameters
		}

		if (_mouseMoveAction) {
			_renderTimer = window[requestAnimationFrame](renderAll);
		}

		// console.timeEnd('renderAll')
	}


	// ------------------------------------------------------ //
	// ------------------ helper functions ------------------ //
	// -------------------------------------------------------//

	function copyColor(color) {
		var newColor = {};

		for (var n in color) {
			newColor[n] = color[n];
		}
		return newColor;
	}

	// function color2string(color, type) {
	// 	var out = [],
	// 		n = 0;

	// 	type = type || 'rgb';
	// 	while (type.charAt(n)) { // IE7 // V8 type[n] || 
	// 		out.push(color[type.charAt(n)]);
	// 		n++;
	// 	}
	// 	return type + '(' + out.join(', ') + ')';
	// }

	function color2string(color, type) { // ~2 x faster on V8
		var out = '',
			t = (type || 'rgb').split(''),
			n = t.length;

		for ( ; n--; ) {
			out = ', ' + color[t[n]] + out;
		}
		return (type || 'rgb') + '(' + out.substr(2) + ')';
	}


	function limitValue(value, min, max) {
		// return Math.max(min, Math.min(max, value)); // faster??
		return (value > max ? max : value < min ? min : value);
	}

	function getOpacityCSS(value) {
		if (value === undefined) value = 1;

		if (_doesOpacity) {
			return 'opacity: ' + (_math.round(value * 10000000000) / 10000000000) + ';'; // value.toFixed(16) = 99% slower
			// some speed test:
			// return ['opacity: ', (Math.round(value * 1e+10) / 1e+10), ';'].join('');
		} else {
			return 'filter: alpha(opacity=' + _math.round(value * 100) + ');';
		}
	}

	function preventDefault(e, skip) {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		if (!skip) window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
		return false;
	}

	function changeClass(elm, cln, newCln) {
		return  !elm ? false : elm.className = (newCln !== undefined ?
			elm.className.replace(new RegExp('\\s+?' + cln, 'g'), newCln ? ' ' + newCln : '') :
			elm.className + ' ' + cln);
	}

	function getOrigin(elm) {
		var box = (elm.getBoundingClientRect) ? elm.getBoundingClientRect() : {top: 0, left: 0},
			doc = elm && elm.ownerDocument,
			body = doc.body,
			win = doc.defaultView || doc.parentWindow || window,
			docElem = doc.documentElement || body.parentNode,
			clientTop  = docElem.clientTop  || body.clientTop  || 0, // border on html or body or both
			clientLeft =  docElem.clientLeft || body.clientLeft || 0;

		return {
			left: box.left + (win.pageXOffset || docElem.scrollLeft) - clientLeft,
			top:  box.top  + (win.pageYOffset || docElem.scrollTop)  - clientTop
		};
	}

	function getPageXY(e) {
		var doc = window.document;

		return {
			X: e.pageX || e.clientX + doc.body.scrollLeft + doc.documentElement.scrollLeft,
			Y: e.pageY || e.clientY + doc.body.scrollTop + doc.documentElement.scrollTop
		};
	}

	function addEvent(obj, type, func) {
		addEvent.cache = addEvent.cache || {
			_get: function(obj, type, func, checkOnly) {
				var cache = addEvent.cache[type] || [];

				for (var n = cache.length; n--; ) {
					if (obj === cache[n].obj && '' + func === '' + cache[n].func) {
						func = cache[n].func;
						if (!checkOnly) {
							cache[n] = cache[n].obj = cache[n].func = null;
							cache.splice(n, 1);
						}
						return func;
					}
				}
			},
			_set: function(obj, type, func) {
				var cache = addEvent.cache[type] = addEvent.cache[type] || [];
				
				if (addEvent.cache._get(obj, type, func, true)) {
					return true;
				} else {
					cache.push({
						func: func,
						obj: obj
					});
				}
			}
		};

		if (!func.name && addEvent.cache._set(obj, type, func) || typeof func !== 'function') {
			return;
		}

		if (obj.addEventListener) obj.addEventListener(type, func, false);
		else obj.attachEvent('on' + type, func);
	}

	function removeEvent(obj, type, func) {
		if (typeof func !== 'function') return;
		if (!func.name) {
			func = addEvent.cache._get(obj, type, func) || func;
		}

		if (obj.removeEventListener) obj.removeEventListener(type, func, false);
		else obj.detachEvent('on' + type, func);
	}

	function caret(target, pos) { // only for contenteditable
		var out = {};

		if (pos === undefined) { // get
			if (window.getSelection) { // HTML5
				target.focus();
				var range1 = window.getSelection().getRangeAt(0),
					range2 = range1.cloneRange();
				range2.selectNodeContents(target);
				range2.setEnd(range1.endContainer, range1.endOffset);
				out = {
					end: range2.toString().length,
					range: range1.toString().length
				};
			} else { // IE < 9
				target.focus();
				var range1 = document.selection.createRange(),
					range2 = document.body.createTextRange();
				range2.moveToElementText(target);
				range2.setEndPoint('EndToEnd', range1);
				out = {
					end: range2.text.length,
					range: range1.text.length
				};
			}
			out.start = out.end - out.range;
			return out;
		}
		// set
		if (pos == -1) pos = target['text']().length;
		
		if (window.getSelection) { // HTML5
			target.focus();
			window.getSelection().collapse(target.firstChild, pos);
		} else { // IE < 9
			var range = document.body.createTextRange();
			range.moveToElementText(target);
			range.moveStart('character', pos);
			range.collapse(true);
			range.select();
		}
		return pos;
	}

	// ------------- requestAnimationFrame shim ------------- //
	// ---------- quite optimized for minification ---------- //

	for(var n = vendors.length; n-- && !window[requestAnimationFrame]; ) {
		window[requestAnimationFrame] = window[vendors[n] + 'Request' + animationFrame];
		window[cancelAnimationFrame]  = window[vendors[n] + 'Cancel'  + animationFrame] ||
			window[vendors[n] + 'CancelRequest' + animationFrame];
	}

	window[requestAnimationFrame] = window[requestAnimationFrame] || function(callback) {
		// this is good enough... and better than setTimeout
			return window.setTimeout(callback, 1000 / _options.fps);
		// return _renderTimer ? _renderTimer : window.setInterval(callback, 1000 / _options.fps);
	};

	window[cancelAnimationFrame] = window[cancelAnimationFrame] || function(id) {
		// console.log('OFF-', id + '-' + _renderTimer)
		window.clearTimeout(id);
		return _renderTimer = null;
	};

})(window);
(function (window) {
	window.jsColorPicker = function(selectors, config) {
		var renderCallback = function(colors, mode) {
				var options = this,
					input = options.input,
					patch = options.patch,
					RGB = colors.RND.rgb,
					HSL = colors.RND.hsl,
					AHEX = options.isIE8 ? (colors.alpha < 0.16 ? '0' : '') +
						(Math.round(colors.alpha * 100)).toString(16).toUpperCase() + colors.HEX : '',
					RGBInnerText = RGB.r + ', ' + RGB.g + ', ' + RGB.b,
					RGBAText = 'rgba(' + RGBInnerText + ', ' + colors.alpha + ')',
					isAlpha = colors.alpha !== 1 && !options.isIE8,
					colorMode = input.getAttribute('data-colorMode');

				patch.style.cssText =
					'color:' + (colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd') + ';' + // Black...???
					'background-color:' + RGBAText + ';' +
					'filter:' + (options.isIE8 ? 'progid:DXImageTransform.Microsoft.gradient(' + // IE<9
						'startColorstr=#' + AHEX + ',' + 'endColorstr=#' + AHEX + ')' : '');

				input.value = (colorMode === 'HEX' && !isAlpha ? '#' + (options.isIE8 ? AHEX : colors.HEX) :
					colorMode === 'rgb' || (colorMode === 'HEX' && isAlpha) ?
					(!isAlpha ? 'rgb(' + RGBInnerText + ')' : RGBAText) :
					('hsl' + (isAlpha ? 'a(' : '(') + HSL.h + ', ' + HSL.s + '%, ' + HSL.l + '%' +
						(isAlpha ? ', ' + colors.alpha : '') + ')')
				);

				if (options.displayCallback) {
					options.displayCallback(colors, mode, options);
				}
			},
			extractValue = function(elm) {
				return elm.value || elm.getAttribute('value') || elm.style.backgroundColor || '#FFFFFF';
			},
			actionCallback = function(event, action) {
				var options = this,
					colorPicker = colorPickers.current;

				if (action === 'toMemory') {
					var memos = colorPicker.nodes.memos,
						backgroundColor = '',
						opacity = 0,
						cookieTXT = [];

					for (var n = 0, m = memos.length; n < m; n++) {
						backgroundColor = memos[n].style.backgroundColor;
						opacity = memos[n].style.opacity;
						opacity = Math.round((opacity === '' ? 1 : opacity) * 100) / 100;
						cookieTXT.push(backgroundColor.
							replace(/, /g, ',').
							replace('rgb(', 'rgba(').
							replace(')', ',' + opacity + ')')
						);
					}
					cookieTXT = '\'' + cookieTXT.join('\',\'') + '\'';
					ColorPicker.docCookies('colorPickerMemos' + (options.noAlpha ? 'NoAlpha' : ''), cookieTXT);
				} else if (action === 'resizeApp') {
					ColorPicker.docCookies('colorPickerSize', colorPicker.color.options.currentSize);
				} else if (action === 'modeChange') {
					var mode = colorPicker.color.options.mode;

					ColorPicker.docCookies('colorPickerMode', mode.type + '-' + mode.z);
				}
			},
			createInstance = function(elm, config) {
				var initConfig = {
						klass: window.ColorPicker,
						input: elm,
						patch: elm,
						isIE8: !!document.all && !document.addEventListener, // Opera???
						// *** animationSpeed: 200,
						// *** draggable: true,
						margin: {left: -1, top: 2},
						customBG: '#FFFFFF',
						// displayCallback: displayCallback,
						/* --- regular colorPicker options from this point --- */
						color: extractValue(elm),
						initStyle: 'display: block',
						mode: ColorPicker.docCookies('colorPickerMode') || 'hsv-h',
						// memoryColors: (function(colors, config) {
						// 	return config.noAlpha ?
						// 		colors.replace(/\,\d*\.*\d*\)/g, ',1)') : colors;
						// })($.docCookies('colorPickerMemos'), config || {}),
						memoryColors: ColorPicker.docCookies('colorPickerMemos' +
							((config || {}).noAlpha ? 'NoAlpha' : '')),
						size: ColorPicker.docCookies('colorPickerSize') || 1,
						renderCallback: renderCallback,
						actionCallback: actionCallback
					};

				for (var n in config) {
					initConfig[n] = config[n]; 
				}
				return new initConfig.klass(initConfig);
			},
			doEventListeners = function(elm, multiple, off) {
				var onOff = off ? 'removeEventListener' : 'addEventListener',
					focusListener = function(e) {
						var input = this,
							position = window.ColorPicker.getOrigin(input),
							index = multiple ? Array.prototype.indexOf.call(elms, this) : 0,
							colorPicker = colorPickers[index] ||
								(colorPickers[index] = createInstance(this, config)),
							options = colorPicker.color.options,
							colorPickerUI = colorPicker.nodes.colorPicker;

						options.color = extractValue(elm); // brings color to default on reset
						colorPickerUI.style.cssText = 
							'position: absolute;' +
							'left:' + (position.left + options.margin.left) + 'px;' +
							'top:' + (position.top + +input.offsetHeight + options.margin.top) + 'px;';

						if (!multiple) {
							options.input = elm;
							options.patch = elm; // check again???
							colorPicker.setColor(extractValue(elm), undefined, undefined, true);
							colorPicker.saveAsBackground();
						}
						colorPickers.current = colorPickers[index];
						(options.appendTo || document.body).appendChild(colorPickerUI);
						setTimeout(function() { // compensating late style on onload in colorPicker
							colorPickerUI.style.display = 'block';
						}, 0);
					},
					mousDownListener = function(e) {
						var colorPicker = colorPickers.current,
							colorPickerUI = (colorPicker ? colorPicker.nodes.colorPicker : undefined),
							animationSpeed = colorPicker ? colorPicker.color.options.animationSpeed : 0,
							isColorPicker = colorPicker && (function(elm) {
								while (elm) {
									if ((elm.className || '').indexOf('cp-app') !== -1) return elm;
									elm = elm.parentNode;
								}
								return false;
							})(e.target),
							inputIndex = Array.prototype.indexOf.call(elms, e.target);

						if (isColorPicker && Array.prototype.indexOf.call(colorPickers, isColorPicker)) {
							if (e.target === colorPicker.nodes.exit) {
								//colorPickerUI.style.display = 'none';
								//document.activeElement.blur();
							} else {
								// ...
							}
						} else if (inputIndex !== -1) {
							// ...
						} else if (colorPickerUI) {
							//colorPickerUI.style.display = 'none';
						}
					};

				elm[onOff]('focus', focusListener);

				if (!colorPickers.evt || off) {
					colorPickers.evt = true; // prevent new eventListener for window

					window[onOff]('mousedown', mousDownListener);
				}
			},
			// this is a way to prevent data binding on HTMLElements
			colorPickers = window.jsColorPicker.colorPickers || [],
			elms = document.querySelectorAll(selectors),
			testColors = new window.Colors({customBG: config.customBG, allMixDetails: true});

		window.jsColorPicker.colorPickers = colorPickers;

		for (var n = 0, m = elms.length; n < m; n++) {
			var elm = elms[n];

			if (config === 'destroy') {
				doEventListeners(elm, (config && config.multipleInstances), true);
				if (colorPickers[n]) {
					colorPickers[n].destroyAll();
				}
			} else {
				var color = extractValue(elm);
				var value = color.split('(');

				testColors.setColor(color);
				if (config && config.init) {
					config.init(elm, testColors.colors);
				}
				elm.setAttribute('data-colorMode', value[1] ? value[0].substr(0, 3) : 'HEX');
				doEventListeners(elm, (config && config.multipleInstances), false);
				if (config && config.readOnly) {
					elm.readOnly = true;
				}
			}
		};

		return window.jsColorPicker.colorPickers;
	};

	window.ColorPicker.docCookies = function(key, val, options) {
		var encode = encodeURIComponent, decode = decodeURIComponent,
			cookies, n, tmp, cache = {},
			days;

		if (val === undefined) { // all about reading cookies
			cookies = document.cookie.split(/;\s*/) || [];
			for (n = cookies.length; n--; ) {
				tmp = cookies[n].split('=');
				if (tmp[0]) cache[decode(tmp.shift())] = decode(tmp.join('=')); // there might be '='s in the value...
			}

			if (!key) return cache; // return Json for easy access to all cookies
			else return cache[key]; // easy access to cookies from here
		} else { // write/delete cookie
			options = options || {};

			if (val === '' || options.expires < 0) { // prepare deleteing the cookie
				options.expires = -1;
				// options.path = options.domain = options.secure = undefined; // to make shure the cookie gets deleted...
			}

			if (options.expires !== undefined) { // prepare date if any
				days = new Date();
				days.setDate(days.getDate() + options.expires);
			}

			document.cookie = encode(key) + '=' + encode(val) +
				(days            ? '; expires=' + days.toUTCString() : '') +
				(options.path    ? '; path='    + options.path       : '') +
				(options.domain  ? '; domain='  + options.domain     : '') +
				(options.secure  ? '; secure'                        : '');
		}
	};
})(this);
/*
chroma.js - JavaScript library for color conversions

Copyright (c) 2011-2015, Gregor Aisch
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. The name Gregor Aisch may not be used to endorse or promote products
   derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la,ma,na,oa,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za=[].slice;ua=function(){var a,b,c,d,e;for(a={},e="Boolean Number String Function Array Date RegExp Undefined Null".split(" "),d=0,b=e.length;b>d;d++)c=e[d],a["[object "+c+"]"]=c.toLowerCase();return function(b){var c;return c=Object.prototype.toString.call(b),a[c]||"object"}}(),S=function(a,b,c){return null==b&&(b=0),null==c&&(c=1),b>a&&(a=b),a>c&&(a=c),a},va=function(a){return a.length>=3?[].slice.call(a):a[0]},t=function(a){var b;for(b in a)3>b?(a[b]<0&&(a[b]=0),a[b]>255&&(a[b]=255)):3===b&&(a[b]<0&&(a[b]=0),a[b]>1&&(a[b]=1));return a},d=Math.PI,pa=Math.round,w=Math.cos,B=Math.floor,_=Math.pow,T=Math.log,ra=Math.sin,sa=Math.sqrt,m=Math.atan2,W=Math.max,l=Math.abs,g=2*d,e=d/3,b=d/180,f=180/d,s=function(){return arguments[0]instanceof a?arguments[0]:function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,arguments,function(){})},k=[],"undefined"!=typeof module&&null!==module&&null!=module.exports&&(module.exports=s),"function"==typeof define&&define.amd?define([],function(){return s}):(oa="undefined"!=typeof exports&&null!==exports?exports:this,oa.chroma=s),s.version="1.1.1",j={},h=[],i=!1,a=function(){function a(){var a,b,c,d,e,f,g,k,l;for(f=this,b=[],k=0,d=arguments.length;d>k;k++)a=arguments[k],null!=a&&b.push(a);if(g=b[b.length-1],null!=j[g])f._rgb=t(j[g](va(b.slice(0,-1))));else{for(i||(h=h.sort(function(a,b){return b.p-a.p}),i=!0),l=0,e=h.length;e>l&&(c=h[l],!(g=c.test.apply(c,b)));l++);g&&(f._rgb=t(j[g].apply(j,b)))}null==f._rgb&&console.warn("unknown format: "+b),null==f._rgb&&(f._rgb=[0,0,0]),3===f._rgb.length&&f._rgb.push(1)}return a.prototype.alpha=function(a){return arguments.length?(this._rgb[3]=a,this):this._rgb[3]},a.prototype.toString=function(){return this.name()},a}(),s._input=j,s.brewer=q={OrRd:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"],PuBu:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"],BuPu:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"],Oranges:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"],BuGn:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"],YlOrBr:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"],YlGn:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"],Reds:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],RdPu:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"],Greens:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],YlGnBu:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],Purples:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"],GnBu:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"],Greys:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"],YlOrRd:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"],PuRd:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"],Blues:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],PuBuGn:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"],Spectral:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],RdYlGn:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],RdBu:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],PiYG:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],PRGn:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],RdYlBu:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],BrBG:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],RdGy:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],PuOr:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],Set2:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"],Accent:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],Set1:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"],Set3:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"],Dark2:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"],Paired:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"],Pastel2:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"],Pastel1:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]},wa={indigo:"#4b0082",gold:"#ffd700",hotpink:"#ff69b4",firebrick:"#b22222",indianred:"#cd5c5c",yellow:"#ffff00",mistyrose:"#ffe4e1",darkolivegreen:"#556b2f",olive:"#808000",darkseagreen:"#8fbc8f",pink:"#ffc0cb",tomato:"#ff6347",lightcoral:"#f08080",orangered:"#ff4500",navajowhite:"#ffdead",lime:"#00ff00",palegreen:"#98fb98",darkslategrey:"#2f4f4f",greenyellow:"#adff2f",burlywood:"#deb887",seashell:"#fff5ee",mediumspringgreen:"#00fa9a",fuchsia:"#ff00ff",papayawhip:"#ffefd5",blanchedalmond:"#ffebcd",chartreuse:"#7fff00",dimgray:"#696969",black:"#000000",peachpuff:"#ffdab9",springgreen:"#00ff7f",aquamarine:"#7fffd4",white:"#ffffff",orange:"#ffa500",lightsalmon:"#ffa07a",darkslategray:"#2f4f4f",brown:"#a52a2a",ivory:"#fffff0",dodgerblue:"#1e90ff",peru:"#cd853f",lawngreen:"#7cfc00",chocolate:"#d2691e",crimson:"#dc143c",forestgreen:"#228b22",darkgrey:"#a9a9a9",lightseagreen:"#20b2aa",cyan:"#00ffff",mintcream:"#f5fffa",silver:"#c0c0c0",antiquewhite:"#faebd7",mediumorchid:"#ba55d3",skyblue:"#87ceeb",gray:"#808080",darkturquoise:"#00ced1",goldenrod:"#daa520",darkgreen:"#006400",floralwhite:"#fffaf0",darkviolet:"#9400d3",darkgray:"#a9a9a9",moccasin:"#ffe4b5",saddlebrown:"#8b4513",grey:"#808080",darkslateblue:"#483d8b",lightskyblue:"#87cefa",lightpink:"#ffb6c1",mediumvioletred:"#c71585",slategrey:"#708090",red:"#ff0000",deeppink:"#ff1493",limegreen:"#32cd32",darkmagenta:"#8b008b",palegoldenrod:"#eee8aa",plum:"#dda0dd",turquoise:"#40e0d0",lightgrey:"#d3d3d3",lightgoldenrodyellow:"#fafad2",darkgoldenrod:"#b8860b",lavender:"#e6e6fa",maroon:"#800000",yellowgreen:"#9acd32",sandybrown:"#f4a460",thistle:"#d8bfd8",violet:"#ee82ee",navy:"#000080",magenta:"#ff00ff",dimgrey:"#696969",tan:"#d2b48c",rosybrown:"#bc8f8f",olivedrab:"#6b8e23",blue:"#0000ff",lightblue:"#add8e6",ghostwhite:"#f8f8ff",honeydew:"#f0fff0",cornflowerblue:"#6495ed",slateblue:"#6a5acd",linen:"#faf0e6",darkblue:"#00008b",powderblue:"#b0e0e6",seagreen:"#2e8b57",darkkhaki:"#bdb76b",snow:"#fffafa",sienna:"#a0522d",mediumblue:"#0000cd",royalblue:"#4169e1",lightcyan:"#e0ffff",green:"#008000",mediumpurple:"#9370db",midnightblue:"#191970",cornsilk:"#fff8dc",paleturquoise:"#afeeee",bisque:"#ffe4c4",slategray:"#708090",darkcyan:"#008b8b",khaki:"#f0e68c",wheat:"#f5deb3",teal:"#008080",darkorchid:"#9932cc",deepskyblue:"#00bfff",salmon:"#fa8072",darkred:"#8b0000",steelblue:"#4682b4",palevioletred:"#db7093",lightslategray:"#778899",aliceblue:"#f0f8ff",lightslategrey:"#778899",lightgreen:"#90ee90",orchid:"#da70d6",gainsboro:"#dcdcdc",mediumseagreen:"#3cb371",lightgray:"#d3d3d3",mediumturquoise:"#48d1cc",lemonchiffon:"#fffacd",cadetblue:"#5f9ea0",lightyellow:"#ffffe0",lavenderblush:"#fff0f5",coral:"#ff7f50",purple:"#800080",aqua:"#00ffff",whitesmoke:"#f5f5f5",mediumslateblue:"#7b68ee",darkorange:"#ff8c00",mediumaquamarine:"#66cdaa",darksalmon:"#e9967a",beige:"#f5f5dc",blueviolet:"#8a2be2",azure:"#f0ffff",lightsteelblue:"#b0c4de",oldlace:"#fdf5e6",rebeccapurple:"#663399"},s.colors=v=wa,N=function(){var a,b,d,e,f,g,h,i,j;return b=va(arguments),f=b[0],a=b[1],d=b[2],i=(f+16)/116,h=isNaN(a)?i:i+a/500,j=isNaN(d)?i:i-d/200,i=c.Yn*O(i),h=c.Xn*O(h),j=c.Zn*O(j),g=ya(3.2404542*h-1.5371385*i-.4985314*j),e=ya(-.969266*h+1.8760108*i+.041556*j),d=ya(.0556434*h-.2040259*i+1.0572252*j),g=S(g,0,255),e=S(e,0,255),d=S(d,0,255),[g,e,d,b.length>3?b[3]:1]},ya=function(a){return pa(255*(.00304>=a?12.92*a:1.055*_(a,1/2.4)-.055))},O=function(a){return a>c.t1?a*a*a:c.t2*(a-c.t0)},c={Kn:18,Xn:.95047,Yn:1,Zn:1.08883,t0:.137931034,t1:.206896552,t2:.12841855,t3:.008856452},ga=function(){var a,b,c,d,e,f,g,h;return d=va(arguments),c=d[0],b=d[1],a=d[2],e=la(c,b,a),f=e[0],g=e[1],h=e[2],[116*g-16,500*(f-g),200*(g-h)]},ma=function(a){return(a/=255)<=.04045?a/12.92:_((a+.055)/1.055,2.4)},xa=function(a){return a>c.t3?_(a,1/3):a/c.t2+c.t0},la=function(){var a,b,d,e,f,g,h;return e=va(arguments),d=e[0],b=e[1],a=e[2],d=ma(d),b=ma(b),a=ma(a),f=xa((.4124564*d+.3575761*b+.1804375*a)/c.Xn),g=xa((.2126729*d+.7151522*b+.072175*a)/c.Yn),h=xa((.0193339*d+.119192*b+.9503041*a)/c.Zn),[f,g,h]},s.lab=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["lab"]),function(){})},j.lab=N,a.prototype.lab=function(){return ga(this._rgb)},n=function(a){var b,c,d,e,f,g,h,i,j,k,l;return a=function(){var b,c,d;for(d=[],c=0,b=a.length;b>c;c++)e=a[c],d.push(s(e));return d}(),2===a.length?(j=function(){var b,c,d;for(d=[],c=0,b=a.length;b>c;c++)e=a[c],d.push(e.lab());return d}(),f=j[0],g=j[1],b=function(a){var b,c;return c=function(){var c,d;for(d=[],b=c=0;2>=c;b=++c)d.push(f[b]+a*(g[b]-f[b]));return d}(),s.lab.apply(s,c)}):3===a.length?(k=function(){var b,c,d;for(d=[],c=0,b=a.length;b>c;c++)e=a[c],d.push(e.lab());return d}(),f=k[0],g=k[1],h=k[2],b=function(a){var b,c;return c=function(){var c,d;for(d=[],b=c=0;2>=c;b=++c)d.push((1-a)*(1-a)*f[b]+2*(1-a)*a*g[b]+a*a*h[b]);return d}(),s.lab.apply(s,c)}):4===a.length?(l=function(){var b,c,d;for(d=[],c=0,b=a.length;b>c;c++)e=a[c],d.push(e.lab());return d}(),f=l[0],g=l[1],h=l[2],i=l[3],b=function(a){var b,c;return c=function(){var c,d;for(d=[],b=c=0;2>=c;b=++c)d.push((1-a)*(1-a)*(1-a)*f[b]+3*(1-a)*(1-a)*a*g[b]+3*(1-a)*a*a*h[b]+a*a*a*i[b]);return d}(),s.lab.apply(s,c)}):5===a.length&&(c=n(a.slice(0,3)),d=n(a.slice(2,5)),b=function(a){return.5>a?c(2*a):d(2*(a-.5))}),b},s.bezier=function(a){var b;return b=n(a),b.scale=function(){return s.scale(b)},b},s.cubehelix=function(a,b,c,d,e){var f,h,i;return null==a&&(a=300),null==b&&(b=-1.5),null==c&&(c=1),null==d&&(d=1),null==e&&(e=[0,1]),h=e[1]-e[0],f=0,i=function(i){var j,k,l,m,n,o,p,q,r;return j=g*((a+120)/360+b*i),p=_(e[0]+h*i,d),o=0!==f?c[0]+i*f:c,k=o*p*(1-p)/2,m=w(j),r=ra(j),q=p+k*(-.14861*m+1.78277*r),n=p+k*(-.29227*m-.90649*r),l=p+1.97294*k*m,s(t([255*q,255*n,255*l]))},i.start=function(b){return null==b?a:(a=b,i)},i.rotations=function(a){return null==a?b:(b=a,i)},i.gamma=function(a){return null==a?d:(d=a,i)},i.hue=function(a){return null==a?c:(c=a,"array"===ua(c)?(f=c[1]-c[0],0===f&&(c=c[1])):f=0,i)},i.lightness=function(a){return null==a?e:(e=a,"array"===ua(e)?(h=e[1]-e[0],0===h&&(e=e[1])):h=0,i)},i.scale=function(){return s.scale(i)},i.hue(c),i},s.random=function(){var b,c,d,e;for(c="0123456789abcdef",b="#",d=e=0;6>e;d=++e)b+=c.charAt(B(16*Math.random()));return new a(b)},j.rgb=function(){var a,b,c,d;b=va(arguments),c=[];for(a in b)d=b[a],c.push(d);return c},s.rgb=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["rgb"]),function(){})},a.prototype.rgb=function(){return this._rgb.slice(0,3)},a.prototype.rgba=function(){return this._rgb},h.push({p:15,test:function(a){var b;return b=va(arguments),"array"===ua(b)&&3===b.length?"rgb":4===b.length&&"number"===ua(b[3])&&b[3]>=0&&b[3]<=1?"rgb":void 0}}),C=function(a){var b,c,d,e,f,g;if(a.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))return(4===a.length||7===a.length)&&(a=a.substr(1)),3===a.length&&(a=a.split(""),a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),g=parseInt(a,16),e=g>>16,d=g>>8&255,c=255&g,[e,d,c,1];if(a.match(/^#?([A-Fa-f0-9]{8})$/))return 9===a.length&&(a=a.substr(1)),g=parseInt(a,16),e=g>>24&255,d=g>>16&255,c=g>>8&255,b=pa((255&g)/255*100)/100,[e,d,c,b];if(null!=j.css&&(f=j.css(a)))return f;throw"unknown color: "+a},ca=function(a,b){var c,d,e,f,g,h,i;return null==b&&(b="rgb"),g=a[0],e=a[1],d=a[2],c=a[3],i=g<<16|e<<8|d,h="000000"+i.toString(16),h=h.substr(h.length-6),f="0"+pa(255*c).toString(16),f=f.substr(f.length-2),"#"+function(){switch(b.toLowerCase()){case"rgba":return h+f;case"argb":return f+h;default:return h}}()},j.hex=function(a){return C(a)},s.hex=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["hex"]),function(){})},a.prototype.hex=function(a){return null==a&&(a="rgb"),ca(this._rgb,a)},h.push({p:10,test:function(a){return 1===arguments.length&&"string"===ua(a)?"hex":void 0}}),F=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n;if(a=va(arguments),e=a[0],k=a[1],g=a[2],0===k)i=d=b=255*g;else{for(n=[0,0,0],c=[0,0,0],m=.5>g?g*(1+k):g+k-g*k,l=2*g-m,e/=360,n[0]=e+1/3,n[1]=e,n[2]=e-1/3,f=h=0;2>=h;f=++h)n[f]<0&&(n[f]+=1),n[f]>1&&(n[f]-=1),6*n[f]<1?c[f]=l+6*(m-l)*n[f]:2*n[f]<1?c[f]=m:3*n[f]<2?c[f]=l+(m-l)*(2/3-n[f])*6:c[f]=l;j=[pa(255*c[0]),pa(255*c[1]),pa(255*c[2])],i=j[0],d=j[1],b=j[2]}return a.length>3?[i,d,b,a[3]]:[i,d,b]},ea=function(a,b,c){var d,e,f,g,h;return void 0!==a&&a.length>=3&&(g=a,a=g[0],b=g[1],c=g[2]),a/=255,b/=255,c/=255,f=Math.min(a,b,c),W=Math.max(a,b,c),e=(W+f)/2,W===f?(h=0,d=Number.NaN):h=.5>e?(W-f)/(W+f):(W-f)/(2-W-f),a===W?d=(b-c)/(W-f):b===W?d=2+(c-a)/(W-f):c===W&&(d=4+(a-b)/(W-f)),d*=60,0>d&&(d+=360),[d,h,e]},s.hsl=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["hsl"]),function(){})},j.hsl=F,a.prototype.hsl=function(){return ea(this._rgb)},G=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;if(a=va(arguments),e=a[0],p=a[1],r=a[2],r*=255,0===p)i=d=b=r;else switch(360===e&&(e=0),e>360&&(e-=360),0>e&&(e+=360),e/=60,f=B(e),c=e-f,g=r*(1-p),h=r*(1-p*c),q=r*(1-p*(1-c)),f){case 0:j=[r,q,g],i=j[0],d=j[1],b=j[2];break;case 1:k=[h,r,g],i=k[0],d=k[1],b=k[2];break;case 2:l=[g,r,q],i=l[0],d=l[1],b=l[2];break;case 3:m=[g,h,r],i=m[0],d=m[1],b=m[2];break;case 4:n=[q,g,r],i=n[0],d=n[1],b=n[2];break;case 5:o=[r,g,h],i=o[0],d=o[1],b=o[2]}return i=pa(i),d=pa(d),b=pa(b),[i,d,b,a.length>3?a[3]:1]},fa=function(){var a,b,c,d,e,f,g,h,i;return g=va(arguments),f=g[0],c=g[1],a=g[2],e=Math.min(f,c,a),W=Math.max(f,c,a),b=W-e,i=W/255,0===W?(d=Number.NaN,h=0):(h=b/W,f===W&&(d=(c-a)/b),c===W&&(d=2+(a-f)/b),a===W&&(d=4+(f-c)/b),d*=60,0>d&&(d+=360)),[d,h,i]},s.hsv=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["hsv"]),function(){})},j.hsv=G,a.prototype.hsv=function(){return fa(this._rgb)},Z=function(a){var b,c,d;return"number"===ua(a)&&a>=0&&16777215>=a?(d=a>>16,c=a>>8&255,b=255&a,[d,c,b,1]):(console.warn("unknown num color: "+a),[0,0,0,1])},ja=function(){var a,b,c,d;return d=va(arguments),c=d[0],b=d[1],a=d[2],(c<<16)+(b<<8)+a},s.num=function(b){return new a(b,"num")},a.prototype.num=function(a){return null==a&&(a="rgb"),ja(this._rgb,a)},j.num=Z,h.push({p:10,test:function(a){return 1===arguments.length&&"number"===ua(a)&&a>=0&&16777215>=a?"num":void 0}}),x=function(a){var b,c,d,e,f,g,h,i;if(a=a.toLowerCase(),null!=s.colors&&s.colors[a])return C(s.colors[a]);if(f=a.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)){for(h=f.slice(1,4),e=g=0;2>=g;e=++g)h[e]=+h[e];h[3]=1}else if(f=a.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/))for(h=f.slice(1,5),e=i=0;3>=i;e=++i)h[e]=+h[e];else if(f=a.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)){for(h=f.slice(1,4),e=b=0;2>=b;e=++b)h[e]=pa(2.55*h[e]);h[3]=1}else if(f=a.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)){for(h=f.slice(1,5),e=c=0;2>=c;e=++c)h[e]=pa(2.55*h[e]);h[3]=+h[3]}else(f=a.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/))?(d=f.slice(1,4),d[1]*=.01,d[2]*=.01,h=F(d),h[3]=1):(f=a.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/))&&(d=f.slice(1,4),d[1]*=.01,d[2]*=.01,h=F(d),h[3]=+f[4]);return h},ba=function(a){var b;return b=a[3]<1?"rgba":"rgb","rgb"===b?b+"("+a.slice(0,3).map(pa).join(",")+")":"rgba"===b?b+"("+a.slice(0,3).map(pa).join(",")+","+a[3]+")":void 0},na=function(a){return pa(100*a)/100},E=function(a,b){var c;return c=1>b?"hsla":"hsl",a[0]=na(a[0]||0),a[1]=na(100*a[1])+"%",a[2]=na(100*a[2])+"%","hsla"===c&&(a[3]=b),c+"("+a.join(",")+")"},j.css=function(a){return x(a)},s.css=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["css"]),function(){})},a.prototype.css=function(a){return null==a&&(a="rgb"),"rgb"===a.slice(0,3)?ba(this._rgb):"hsl"===a.slice(0,3)?E(this.hsl(),this.alpha()):void 0},j.named=function(a){return C(wa[a])},h.push({p:20,test:function(a){return 1===arguments.length&&null!=wa[a]?"named":void 0}}),a.prototype.name=function(a){var b,c;arguments.length&&(wa[a]&&(this._rgb=C(wa[a])),this._rgb[3]=1),b=this.hex();for(c in wa)if(b===wa[c])return c;return b},P=function(){var a,c,d,e;return e=va(arguments),d=e[0],a=e[1],c=e[2],c*=b,[d,w(c)*a,ra(c)*a]},Q=function(){var a,b,c,d,e,f,g,h,i,j,k;return c=va(arguments),h=c[0],e=c[1],g=c[2],j=P(h,e,g),a=j[0],b=j[1],d=j[2],k=N(a,b,d),i=k[0],f=k[1],d=k[2],[S(i,0,255),S(f,0,255),S(d,0,255),c.length>3?c[3]:1]},M=function(){var a,b,c,d,e,g;return g=va(arguments),e=g[0],a=g[1],b=g[2],c=sa(a*a+b*b),d=(m(b,a)*f+360)%360,0===pa(1e4*c)&&(d=Number.NaN),[e,c,d]},ha=function(){var a,b,c,d,e,f,g;return f=va(arguments),e=f[0],c=f[1],b=f[2],g=ga(e,c,b),d=g[0],a=g[1],b=g[2],M(d,a,b)},s.lch=function(){var b;return b=va(arguments),new a(b,"lch")},s.hcl=function(){var b;return b=va(arguments),new a(b,"hcl")},j.lch=Q,j.hcl=function(){var a,b,c,d;return d=va(arguments),b=d[0],a=d[1],c=d[2],Q([c,a,b])},a.prototype.lch=function(){return ha(this._rgb)},a.prototype.hcl=function(){return ha(this._rgb).reverse()},aa=function(a){var b,c,d,e,f,g,h,i,j;return null==a&&(a="rgb"),i=va(arguments),h=i[0],e=i[1],b=i[2],h/=255,e/=255,b/=255,f=1-Math.max(h,Math.max(e,b)),d=1>f?1/(1-f):0,c=(1-h-f)*d,g=(1-e-f)*d,j=(1-b-f)*d,[c,g,j,f]},u=function(){var a,b,c,d,e,f,g,h,i;return b=va(arguments),d=b[0],g=b[1],i=b[2],f=b[3],a=b.length>4?b[4]:1,1===f?[0,0,0,a]:(h=d>=1?0:pa(255*(1-d)*(1-f)),e=g>=1?0:pa(255*(1-g)*(1-f)),c=i>=1?0:pa(255*(1-i)*(1-f)),[h,e,c,a])},j.cmyk=function(){return u(va(arguments))},s.cmyk=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["cmyk"]),function(){})},a.prototype.cmyk=function(){return aa(this._rgb)},j.gl=function(){var a,b,c,d,e;for(d=function(){var a,c;a=va(arguments),c=[];for(b in a)e=a[b],c.push(e);return c}.apply(this,arguments),a=c=0;2>=c;a=++c)d[a]*=255;return d},s.gl=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["gl"]),function(){})},a.prototype.gl=function(){var a;return a=this._rgb,[a[0]/255,a[1]/255,a[2]/255,a[3]]},ia=function(a,b,c){var d;return d=va(arguments),a=d[0],b=d[1],c=d[2],a=U(a),b=U(b),c=U(c),.2126*a+.7152*b+.0722*c},U=function(a){return a/=255,.03928>=a?a/12.92:_((a+.055)/1.055,2.4)},k=[],H=function(a,b,c,d){var e,f,g,h;for(null==c&&(c=.5),null==d&&(d="rgb"),"object"!==ua(a)&&(a=s(a)),"object"!==ua(b)&&(b=s(b)),g=0,f=k.length;f>g;g++)if(e=k[g],d===e[0]){h=e[1](a,b,c,d);break}if(null==h)throw"color mode "+d+" is not supported";return h.alpha(a.alpha()+c*(b.alpha()-a.alpha())),h},s.interpolate=H,a.prototype.interpolate=function(a,b,c){return H(this,a,b,c)},s.mix=H,a.prototype.mix=a.prototype.interpolate,L=function(b,c,d,e){var f,g;return f=b._rgb,g=c._rgb,new a(f[0]+d*(g[0]-f[0]),f[1]+d*(g[1]-f[1]),f[2]+d*(g[2]-f[2]),e)},k.push(["rgb",L]),a.prototype.luminance=function(a,b){var c,d,e,f;return null==b&&(b="rgb"),arguments.length?(0===a?this._rgb=[0,0,0,this._rgb[3]]:1===a?this._rgb=[255,255,255,this._rgb[3]]:(d=1e-7,e=20,f=function(c,g){var h,i;return i=c.interpolate(g,.5,b),h=i.luminance(),Math.abs(a-h)<d||!e--?i:h>a?f(c,i):f(i,g)},c=ia(this._rgb),this._rgb=(c>a?f(s("black"),this):f(this,s("white"))).rgba()),this):ia(this._rgb)},ta=function(a){var b,c,d,e;return e=a/100,66>e?(d=255,c=-155.25485562709179-.44596950469579133*(c=e-2)+104.49216199393888*T(c),b=20>e?0:-254.76935184120902+.8274096064007395*(b=e-10)+115.67994401066147*T(b)):(d=351.97690566805693+.114206453784165*(d=e-55)-40.25366309332127*T(d),c=325.4494125711974+.07943456536662342*(c=e-50)-28.0852963507957*T(c),b=255),t([d,c,b])},ka=function(){var a,b,c,d,e,f,g,h,i;for(g=va(arguments),f=g[0],c=g[1],a=g[2],e=1e3,d=4e4,b=.4;d-e>b;)i=.5*(d+e),h=ta(i),h[2]/h[0]>=a/f?d=i:e=i;return pa(i)},s.temperature=s.kelvin=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["temperature"]),function(){})},j.temperature=j.kelvin=j.K=ta,a.prototype.temperature=function(){return ka(this._rgb)},a.prototype.kelvin=a.prototype.temperature,s.contrast=function(b,c){var d,e,f,g;return("string"===(f=ua(b))||"number"===f)&&(b=new a(b)),("string"===(g=ua(c))||"number"===g)&&(c=new a(c)),d=b.luminance(),e=c.luminance(),d>e?(d+.05)/(e+.05):(e+.05)/(d+.05)},a.prototype.get=function(a){var b,c,d,e,f,g;return d=this,f=a.split("."),e=f[0],b=f[1],g=d[e](),b?(c=e.indexOf(b),c>-1?g[c]:console.warn("unknown channel "+b+" in mode "+e)):g},a.prototype.set=function(a,b){var c,d,e,f,g,h;if(e=this,g=a.split("."),f=g[0],c=g[1],c)if(h=e[f](),d=f.indexOf(c),d>-1)if("string"===ua(b))switch(b.charAt(0)){case"+":h[d]+=+b;break;case"-":h[d]+=+b;break;case"*":h[d]*=+b.substr(1);break;case"/":h[d]/=+b.substr(1);break;default:h[d]=+b}else h[d]=b;else console.warn("unknown channel "+c+" in mode "+f);else h=b;return e._rgb=s(h,f).alpha(e.alpha())._rgb,e},a.prototype.darken=function(a){var b,d;return null==a&&(a=1),d=this,b=d.lab(),b[0]-=c.Kn*a,s.lab(b).alpha(d.alpha())},a.prototype.brighten=function(a){return null==a&&(a=1),this.darken(-a)},a.prototype.darker=a.prototype.darken,a.prototype.brighter=a.prototype.brighten,a.prototype.saturate=function(a){var b,d;return null==a&&(a=1),d=this,b=d.lch(),b[1]+=a*c.Kn,b[1]<0&&(b[1]=0),s.lch(b).alpha(d.alpha())},a.prototype.desaturate=function(a){return null==a&&(a=1),this.saturate(-a)},a.prototype.premultiply=function(){var a,b;return b=this.rgb(),a=this.alpha(),s(b[0]*a,b[1]*a,b[2]*a,a)},o=function(a,b,c){if(!o[c])throw"unknown blend mode "+c;return o[c](a,b)},p=function(a){return function(b,c){var d,e;return d=s(c).rgb(),e=s(b).rgb(),s(a(d,e),"rgb")}},A=function(a){return function(b,c){var d,e,f;for(f=[],d=e=0;3>=e;d=++e)f[d]=a(b[d],c[d]);return f}},Y=function(a,b){return a},X=function(a,b){return a*b/255},y=function(a,b){return a>b?b:a},R=function(a,b){return a>b?a:b},qa=function(a,b){return 255*(1-(1-a/255)*(1-b/255))},$=function(a,b){return 128>b?2*a*b/255:255*(1-2*(1-a/255)*(1-b/255))},r=function(a,b){return 255*(1-(1-b/255)/(a/255))},z=function(a,b){return 255===a?255:(a=255*(b/255)/(1-a/255),a>255?255:a)},o.normal=p(A(Y)),o.multiply=p(A(X)),o.screen=p(A(qa)),o.overlay=p(A($)),o.darken=p(A(y)),o.lighten=p(A(R)),o.dodge=p(A(z)),o.burn=p(A(r)),s.blend=o,s.analyze=function(a){var b,c,d,e;for(d={min:Number.MAX_VALUE,max:-1*Number.MAX_VALUE,sum:0,values:[],count:0},c=0,b=a.length;b>c;c++)e=a[c],null==e||isNaN(e)||(d.values.push(e),d.sum+=e,e<d.min&&(d.min=e),e>d.max&&(d.max=e),d.count+=1);return d.domain=[d.min,d.max],d.limits=function(a,b){return s.limits(d,a,b)},d},s.scale=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,t,u,v,w,x;return k="rgb",l=s("#ccc"),p=0,h=!1,g=[0,1],o=[],n=[0,0],c=!1,e=[],m=!1,j=0,i=1,f=!1,d={},w=function(a){var b,c,d,f,g,h,i;if(null==a&&(a=["#fff","#000"]),null!=a&&"string"===ua(a)&&null!=(null!=(f=s.brewer)?f[a]:void 0)&&(a=s.brewer[a]),"array"===ua(a)){for(a=a.slice(0),b=d=0,g=a.length-1;g>=0?g>=d:d>=g;b=g>=0?++d:--d)c=a[b],"string"===ua(c)&&(a[b]=s(c));for(o.length=0,b=i=0,h=a.length-1;h>=0?h>=i:i>=h;b=h>=0?++i:--i)o.push(b/(a.length-1))}return v(),e=a},t=function(a){var b,d;if(null!=c){for(d=c.length-1,b=0;d>b&&a>=c[b];)b++;return b-1}return 0},x=function(a){return a},q=function(a){var b,d,e,f,g;return g=a,c.length>2&&(f=c.length-1,b=t(a),e=c[0]+(c[1]-c[0])*(0+.5*p),d=c[f-1]+(c[f]-c[f-1])*(1-.5*p),g=j+(c[b]+.5*(c[b+1]-c[b])-e)/(d-e)*(i-j)),g},u=function(a,b){var f,g,h,m,p,q,r,u;if(null==b&&(b=!1),isNaN(a))return l;if(b?u=a:c&&c.length>2?(f=t(a),u=f/(c.length-2),u=n[0]+u*(1-n[0]-n[1])):i!==j?(u=(a-j)/(i-j),u=n[0]+u*(1-n[0]-n[1]),u=Math.min(1,Math.max(0,u))):u=1,b||(u=x(u)),m=Math.floor(1e4*u),d[m])g=d[m];else{if("array"===ua(e))for(h=p=0,r=o.length-1;r>=0?r>=p:p>=r;h=r>=0?++p:--p){if(q=o[h],q>=u){g=e[h];break}if(u>=q&&h===o.length-1){g=e[h];break}if(u>q&&u<o[h+1]){u=(u-q)/(o[h+1]-q),g=s.interpolate(e[h],e[h+1],u,k);break}}else"function"===ua(e)&&(g=e(u));d[m]=g}return g},v=function(){return d={}},w(a),r=function(a){var b;return b=s(u(a)),m&&b[m]?b[m]():b},r.classes=function(a){var b;return null!=a?("array"===ua(a)?(c=a,g=[a[0],a[a.length-1]]):(b=s.analyze(g),c=0===a?[b.min,b.max]:s.limits(b,"e",a)),r):c},r.domain=function(a){var b,c,d,f,h,k,l;if(!arguments.length)return g;if(j=a[0],i=a[a.length-1],o=[],d=e.length,a.length===d&&j!==i)for(h=0,f=a.length;f>h;h++)c=a[h],o.push((c-j)/(i-j));else for(b=l=0,k=d-1;k>=0?k>=l:l>=k;b=k>=0?++l:--l)o.push(b/(d-1));return g=[j,i],r},r.mode=function(a){return arguments.length?(k=a,v(),r):k},r.range=function(a,b){return w(a,b),r},r.out=function(a){return m=a,r},r.spread=function(a){return arguments.length?(p=a,r):p},r.correctLightness=function(a){return null==a&&(a=!0),f=a,v(),x=f?function(a){var b,c,d,e,f,g,h,i,j;for(b=u(0,!0).lab()[0],c=u(1,!0).lab()[0],h=b>c,d=u(a,!0).lab()[0],f=b+(c-b)*a,e=d-f,i=0,j=1,g=20;Math.abs(e)>.01&&g-->0;)!function(){return h&&(e*=-1),0>e?(i=a,a+=.5*(j-a)):(j=a,a+=.5*(i-a)),d=u(a,!0).lab()[0],e=d-f}();return a}:function(a){return a},r},r.padding=function(a){return null!=a?("number"===ua(a)&&(a=[a,a]),n=a,r):n},r.colors=function(){var b,d,e,f,h,i,j,k,l;if(f=0,h="hex",1===arguments.length&&("string"===ua(arguments[0])?h=arguments[0]:f=arguments[0]),2===arguments.length&&(f=arguments[0],h=arguments[1]),f)return d=g[0],b=g[1]-d,function(){j=[];for(var a=0;f>=0?f>a:a>f;f>=0?a++:a--)j.push(a);return j}.apply(this).map(function(a){return r(d+a/(f-1)*b)[h]()});if(a=[],k=[],c&&c.length>2)for(e=l=1,i=c.length;i>=1?i>l:l>i;e=i>=1?++l:--l)k.push(.5*(c[e-1]+c[e]));else k=g;return k.map(function(a){return r(a)[h]()})},r},null==s.scales&&(s.scales={}),s.scales.cool=function(){return s.scale([s.hsl(180,1,.9),s.hsl(250,.7,.4)])},s.scales.hot=function(){return s.scale(["#000","#f00","#ff0","#fff"],[0,.25,.75,1]).mode("rgb")},s.analyze=function(a,b,c){var d,e,f,g,h,i,j;if(h={min:Number.MAX_VALUE,max:-1*Number.MAX_VALUE,sum:0,values:[],count:0},null==c&&(c=function(){return!0}),d=function(a){null==a||isNaN(a)||(h.values.push(a),h.sum+=a,a<h.min&&(h.min=a),a>h.max&&(h.max=a),h.count+=1)},j=function(a,e){return c(a,e)?d(null!=b&&"function"===ua(b)?b(a):null!=b&&"string"===ua(b)||"number"===ua(b)?a[b]:a):void 0},"array"===ua(a))for(g=0,f=a.length;f>g;g++)i=a[g],j(i);else for(e in a)i=a[e],j(i,e);return h.domain=[h.min,h.max],h.limits=function(a,b){return s.limits(h,a,b)},h},s.limits=function(a,b,c){var d,e,f,g,h,i,j,k,m,n,o,p,q,r,t,u,v,w,x,y,z,A,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,U,V,X,Y,Z,$,aa,ba,ca,da,ea,fa,ga,ha,ia,ja;if(null==b&&(b="equal"),null==c&&(c=7),"array"===ua(a)&&(a=s.analyze(a)),E=a.min,W=a.max,fa=a.sum,ia=a.values.sort(function(a,b){return a-b}),C=[],"c"===b.substr(0,1)&&(C.push(E),C.push(W)),"e"===b.substr(0,1)){for(C.push(E),y=K=1,O=c-1;O>=1?O>=K:K>=O;y=O>=1?++K:--K)C.push(E+y/c*(W-E));C.push(W)}else if("l"===b.substr(0,1)){if(0>=E)throw"Logarithmic scales are only possible for values > 0";for(F=Math.LOG10E*T(E),D=Math.LOG10E*T(W),C.push(E),y=ja=1,P=c-1;P>=1?P>=ja:ja>=P;y=P>=1?++ja:--ja)C.push(_(10,F+y/c*(D-F)));C.push(W)}else if("q"===b.substr(0,1)){for(C.push(E),y=d=1,X=c-1;X>=1?X>=d:d>=X;y=X>=1?++d:--d)L=ia.length*y/c,M=B(L),M===L?C.push(ia[M]):(N=L-M,C.push(ia[M]*N+ia[M+1]*(1-N)));C.push(W)}else if("k"===b.substr(0,1)){for(H=ia.length,r=new Array(H),w=new Array(c),ea=!0,I=0,u=null,u=[],u.push(E),y=e=1,Y=c-1;Y>=1?Y>=e:e>=Y;y=Y>=1?++e:--e)u.push(E+y/c*(W-E));for(u.push(W);ea;){for(z=f=0,Z=c-1;Z>=0?Z>=f:f>=Z;z=Z>=0?++f:--f)w[z]=0;for(y=g=0,$=H-1;$>=0?$>=g:g>=$;y=$>=0?++g:--g){for(ha=ia[y],G=Number.MAX_VALUE,z=h=0,aa=c-1;aa>=0?aa>=h:h>=aa;z=aa>=0?++h:--h)x=l(u[z]-ha),G>x&&(G=x,t=z);w[t]++,r[y]=t}for(J=new Array(c),z=i=0,ba=c-1;ba>=0?ba>=i:i>=ba;z=ba>=0?++i:--i)J[z]=null;for(y=j=0,ca=H-1;ca>=0?ca>=j:j>=ca;y=ca>=0?++j:--j)v=r[y],null===J[v]?J[v]=ia[y]:J[v]+=ia[y];for(z=k=0,da=c-1;da>=0?da>=k:k>=da;z=da>=0?++k:--k)J[z]*=1/w[z];for(ea=!1,z=m=0,Q=c-1;Q>=0?Q>=m:m>=Q;z=Q>=0?++m:--m)if(J[z]!==u[y]){ea=!0;break}u=J,I++,I>200&&(ea=!1)}for(A={},z=n=0,R=c-1;R>=0?R>=n:n>=R;z=R>=0?++n:--n)A[z]=[];for(y=o=0,S=H-1;S>=0?S>=o:o>=S;y=S>=0?++o:--o)v=r[y],A[v].push(ia[y]);for(ga=[],z=p=0,U=c-1;U>=0?U>=p:p>=U;z=U>=0?++p:--p)ga.push(A[z][0]),ga.push(A[z][A[z].length-1]);for(ga=ga.sort(function(a,b){return a-b}),C.push(ga[0]),y=q=1,V=ga.length-1;V>=q;y=q+=2)isNaN(ga[y])||C.push(ga[y])}return C},D=function(a,b,c){var d,f,h,i;return d=va(arguments),a=d[0],b=d[1],c=d[2],a/=360,1/3>a?(f=(1-b)/3,i=(1+b*w(g*a)/w(e-g*a))/3,h=1-(f+i)):2/3>a?(a-=1/3,i=(1-b)/3,h=(1+b*w(g*a)/w(e-g*a))/3,f=1-(i+h)):(a-=2/3,h=(1-b)/3,f=(1+b*w(g*a)/w(e-g*a))/3,i=1-(h+f)),i=S(c*i*3),h=S(c*h*3),f=S(c*f*3),[255*i,255*h,255*f,d.length>3?d[3]:1]},da=function(){var a,b,c,d,e,f,h,i;return h=va(arguments),f=h[0],b=h[1],a=h[2],g=2*Math.PI,f/=255,b/=255,a/=255,e=Math.min(f,b,a),d=(f+b+a)/3,i=1-e/d,0===i?c=0:(c=(f-b+(f-a))/2,c/=Math.sqrt((f-b)*(f-b)+(f-a)*(b-a)),c=Math.acos(c),a>b&&(c=g-c),c/=g),[360*c,i,d]},s.hsi=function(){return function(a,b,c){c.prototype=a.prototype;var d=new c,e=a.apply(d,b);return Object(e)===e?e:d}(a,za.call(arguments).concat(["hsi"]),function(){})},j.hsi=D,a.prototype.hsi=function(){return da(this._rgb)},I=function(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q;return"hsl"===d?(p=a.hsl(),q=b.hsl()):"hsv"===d?(p=a.hsv(),q=b.hsv()):"hsi"===d?(p=a.hsi(),q=b.hsi()):("lch"===d||"hcl"===d)&&(d="hcl",p=a.hcl(),q=b.hcl()),"h"===d.substr(0,1)&&(g=p[0],n=p[1],j=p[2],h=q[0],o=q[1],k=q[2]),isNaN(g)||isNaN(h)?isNaN(g)?isNaN(h)?f=Number.NaN:(f=h,1!==j&&0!==j||"hsv"===d||(m=o)):(f=g,1!==k&&0!==k||"hsv"===d||(m=n)):(e=h>g&&h-g>180?h-(g+360):g>h&&g-h>180?h+360-g:h-g,f=g+c*e),null==m&&(m=n+c*(o-n)),i=j+c*(k-j),l=s[d](f,m,i)},k=k.concat(function(){var a,b,c,d;for(c=["hsv","hsl","hsi","hcl","lch"],d=[],b=0,a=c.length;a>b;b++)V=c[b],d.push([V,I]);return d}()),K=function(a,b,c,d){var e,f;return e=a.num(),f=b.num(),s.num(e+(f-e)*c,"num")},k.push(["num",K]),J=function(b,c,d,e){var f,g,h;return g=b.lab(),h=c.lab(),f=new a(g[0]+d*(h[0]-g[0]),g[1]+d*(h[1]-g[1]),g[2]+d*(h[2]-g[2]),e);
},k.push(["lab",J])}).call(this);
var remote = require('remote'),
	dialog = require('electron').remote.dialog,
	fs = require('fs'),
	uuid = require('node-uuid'),
	moment = require('moment'),
	humanizeDuration = require('humanize-duration')
	ipcRenderer = require('electron').ipcRenderer,
	mcopy = {},
	light = {},
	proj = {},
	cam = {},
	nav = {},
	seq = {},
	cmd = {},
	gui = {},
	log = {};
//console.log(ipcRenderer.sendSync('light', { 'fuck' : true }) );

mcopy.cfg = JSON.parse(fs.readFileSync('./data/cfg.json'), 'utf8');

/******
	State shared by ALL interfaces
*******/
mcopy.state = {
	version : '2.0.0', //use for file compatibility check
	camera : {
		pos : 0,
		direction: true
	}, 
	projector : {
		pos : 0,
		direction: true
	},
	sequence : {
		size : 24,
		arr : ['CF', 'PF'],
		light : ['255,255,255', ''],
		cmd : {
			camera: mcopy.cfg.arduino.cmd.camera,
			projector: mcopy.cfg.arduino.cmd.projector,
			cam_direction: mcopy.cfg.arduino.cmd.cam_direction,
			cam_direction: mcopy.cfg.arduino.cmd.proj_direction
		},
		pads: {
			cam_forward: 'CF',
			proj_forward : 'PF',
			black_forward : 'BF',

			cam_backward: 'CB',
			proj_backward : 'PB',
			black_backward : 'BB',

			light_set : 'L'
		}
	}
};

log.time = 'MM/DD/YY-HH:mm:ss';
log.count = 0;
log.init = function () {
	'use strict';
	$('#log').w2grid({ 
	    name   : 'log', 
	    columns: [                
	        { field: 'time', caption: 'Time', size: '22%' },
	        { field: 'action', caption: 'Action', size: '58%' },
	        { field: 'service', caption: 'Service', size: '20%' },
	        { field: 'status', caption: 'Status', size: '10%' },
	    ],
	    records: []
	});
	//{ recid: 1, time: moment().format(log.time), action: 'Started app', service: 'MAIN', status: true }
	log.info('Started app', 'MAIN', true);
	log.listen();
};
log.listen = function () {
	'use strict';
	ipcRenderer.on('log', function (event, arg) {
		log.display(arg.action, arg.service, arg.status, arg.time);
		return event.returnValue = true;
	});
};
log.display = function (action, service, status, time) {
	'use strict';
	var obj = {
		recid : log.count++,
		time : time,
		action : action,
		service : service,
		status : status
	}
	if (typeof time === 'undefined') {
		obj.time = moment().format(log.time);
	}
	w2ui['log'].add(obj);
	if (nav.active === 'controls') {
		w2ui['log'].scrollIntoView(log.count - 1);
		w2ui['log'].selectNone();
		w2ui['log'].select(log.count - 1);
	}
	
	return obj;
};
log.report = function (obj) {
	'use strict';
	ipcRenderer.sendSync('log', obj);
};
log.info = function (action, service, status, time) {
	'use strict';
	var obj = log.display(action, service, status, time);
	log.report(obj);
	console.log(obj);
};

/******
	Sequence Object
*******/
seq.i = 0;
mcopy.loop = 1;
mcopy.loopCount = 0;
seq.time = 0;
seq.stopState = false;
seq.run = function () {
	var c = mcopy.state.sequence.arr[seq.i],
		timeEnd = 0,
		rgb,
	action = function () {
		setTimeout(function () {
			seq.i++;
			seq.run();
		}, mcopy.cfg.arduino.sequenceDelay);
	}
	if (seq.stop()) {
		$('.row input').removeClass('h');
		console.log('Sequence stepped');
		return false;
	}
	if (seq.i <= mcopy.state.sequence.arr.length && c !== undefined) {
		log.info('Step ' + seq.i + ' command ' + c, 'SEQUENCE', true);
		//gui action
		$('.row input').removeClass('h');
		$('.row input[x=' + seq.i + ']').addClass('h');
		$('#numbers div[x=' + seq.i + ']').addClass('h');
		if (c === 'CF'){
			rgb = mcopy.state.sequence.light[seq.i].split(',');
			cmd.cam_forward(rgb, action);
		} else if (c === 'CB') {
			rgb = mcopy.state.sequence.light[seq.i].split(',');
			cmd.cam_backward(rgb, action);
		} else if (c === 'PF') {
			cmd.proj_forward(action);
		} else if (c === 'PB') {
			cmd.proj_backward(action);
		} else if (c === 'BF') {
			cmd.black_forward(action);
		} else if (c === 'BB') {
			cmd.black_backward(action);
		}
	} else {
		mcopy.loopCount++;
		if (mcopy.loopCount < mcopy.loop) {
			log.info('Loop ' + mcopy.loopCount + ' completed', 'SEQUENCE', true);
			$('.row input').removeClass('h');
			seq.i = 0;
			seq.run();
		} else {
			timeEnd = +new Date();
			timeEnd = timeEnd - seq.time;
			if (timeEnd < 2000) {
				log.info('Sequence completed in ' + timeEnd + 'ms', 'SEQUENCE', true);
			} else {
				log.info('Sequence completed in ' + humanizeDuration(timeEnd), 'SEQUENCE', true);
			}
			//clear gui
			$('.row input').removeClass('h');
			$('#numbers div').removeClass('h');
			seq.stats();
		}
	}
};
seq.stop = function (state) {
	if (typeof state === 'undefined') {
		return seq.stopState;
	} else {
		seq.stopState = state;
	}
};
seq.init = function (start) {
	if (typeof start === 'undefined') {
		start = 0;
		mcopy.loopCount = 0;
		seq.time = +new Date();
	}
	seq.stop(false);
	seq.i = start;
	seq.run();
};
seq.stats = function () {
	var ms = 0,
		c = '',
		cam_total = 0,
		proj_total = 0,
		real_total = mcopy.state.sequence.arr.filter(function (elem) {
			if (elem === undefined) {
				return false;
			}
			return true;
		});

	//timing
	for (var i = 0; i < mcopy.state.sequence.arr.length; i++) {
		c = mcopy.state.sequence.arr[i];
		if (c === 'CF' || c === 'CB'){
			ms += mcopy.cfg.arduino.cam.time;
			ms += mcopy.cfg.arduino.cam.delay;
			ms += mcopy.cfg.arduino.serialDelay;
		}
		if (c === 'PF' || c === 'PB'){
			ms += mcopy.cfg.arduino.proj.time;
			ms += mcopy.cfg.arduino.proj.delay;
			ms += mcopy.cfg.arduino.serialDelay;
		}
		if (c === 'BF' || c === 'BB'){
			ms += mcopy.cfg.arduino.black.before;
			ms += mcopy.cfg.arduino.black.after;
			ms += mcopy.cfg.arduino.cam.time;
			ms += mcopy.cfg.arduino.cam.delay;
			ms += mcopy.cfg.arduino.serialDelay;
		}
		ms += mcopy.cfg.arduino.sequenceDelay;

		if (c === 'CF' || c === 'BF') {
			cam_total++;
		}
		if (c === 'CB' || c === 'BB') {
			cam_total--;
		}
		if (c === 'PF') {
			proj_total++;
		}
		if (c === 'PB') {
			proj_total--;
		}
	}

	//timing
	ms = ms * mcopy.loop;
	if (ms < 2000) {
		$('#seq_stats .timing span').text(ms + 'ms');
	} else {
		$('#seq_stats .timing span').text(humanizeDuration(ms));
	}

	//ending frames
	cam_total = cam_total * mcopy.loop;
	proj_total = proj_total * mcopy.loop;

	$('#seq_stats .cam_end span').text(gui.fmtZero(mcopy.state.camera.pos + cam_total, 6));
	$('#seq_stats .proj_end span').text(gui.fmtZero(mcopy.state.projector.pos + proj_total, 6));

	//count
	$('#seq_stats .seq_count span').text(real_total.length * mcopy.loop);
	return ms;
};
seq.clear = function () {
	mcopy.state.sequence.size = 24;
	mcopy.state.sequence.arr = [];
};


//mcopy.gui.updateState();

cmd.proj_forward = function (callback) {
	'use strict';
	var res = function (ms) {
		gui.updateState();
		if (callback) { callback(ms); }
	};
	if (!mcopy.state.projector.direction) {
		proj.set(true, function (ms) {
			setTimeout(function () {
				proj.move(res);
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			proj.move(res);
		}, mcopy.cfg.arduino.serialDelay);
	}
};
cmd.proj_backward = function (callback) {
	'use strict';
	var res = function (ms) {
		gui.updateState();
		if (callback) { callback(ms); }
	};
	if (mcopy.state.projector.direction) {
		proj.set(false, function (ms) {
			setTimeout(function () {
				proj.move(res);
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			proj.move(res);
		}, mcopy.cfg.arduino.serialDelay);
	}
};
cmd.cam_forward = function (rgb, callback) {
	'use strict';
	var res = function (ms) {
		gui.updateState();
		light.set([0, 0, 0], function () {
			if (callback) { callback(ms); }
		});	
	};
	if (!mcopy.state.camera.direction) {
		cam.set(true, function () {
			setTimeout(function () {
				light.set(rgb, function () {
					cam.move(res);
				});
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			light.set(rgb, function () {
				cam.move(res);
			});
		}, mcopy.cfg.arduino.serialDelay);
	}
};
cmd.black_forward = function (callback) {
	'use strict';
	var off = [0, 0, 0];
	cmd.cam_forward(off, callback);
};
cmd.cam_backward = function (rgb, callback) {
	'use strict';
	var res = function (ms) {
		gui.updateState();
		light.set([0, 0, 0], function () {
			if (callback) { callback(ms); }
		});	
	};
	if (mcopy.state.camera.direction) {
		cam.set(false, function () {
			setTimeout(function () {
				light.set(rgb, function () {
					cam.move(res);
				});
			}, mcopy.cfg.arduino.serialDelay);
		});
	} else {
		setTimeout(function () {
			light.set(rgb, function () {
				cam.move(res);
			});
		}, mcopy.cfg.arduino.serialDelay);
	}
};
cmd.black_backward = function (callback) {
	'use strict';
	var off = [0, 0, 0];
	cmd.cam_backward(off, callback);
};

proj.queue = {};
proj.lock = false;
proj.init = function () {
	'use strict';
	proj.listen();
};
proj.set = function (dir, callback) {
	'use strict';
	var obj;
	if (proj.lock) {
		return false;
	}
	obj = {
		dir : dir,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('proj', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock = true;
};
proj.move = function (callback) {
	'use strict';
	var obj;
	if (proj.lock) {
		return false;
	}
	obj = {
		frame : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('proj', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	proj.queue[obj.id] = obj;
	proj.lock = true;
};
proj.end = function (c, id, ms) {
	'use strict';
	if (c === mcopy.cfg.arduino.cmd.proj_forward) {
		mcopy.state.projector.direction = true;
	} else if (c === mcopy.cfg.arduino.cmd.proj_backward) {
		mcopy.state.projector.direction = false;
	} else if (c === mcopy.cfg.arduino.cmd.projector) {
		if (mcopy.state.projector.direction) {
			mcopy.state.projector.pos += 1;
		} else {
			mcopy.state.projector.pos -= 1;
		}
	}
	if (typeof proj.queue[id] !== 'undefined') {
		if (typeof proj.queue[id].callback !== 'undefined') {
			proj.queue[id].callback(ms);
		}
		delete proj.queue[id];
		proj.lock = false;
	}
};
proj.listen = function () {
	'use strict';
	ipcRenderer.on('proj', function (event, arg) {
		proj.end(arg.cmd, arg.id, arg.ms);		
		return event.returnValue = true;
	});
};

cam.queue = {};
cam.lock = false;
cam.init = function () {
	'use strict';
	cam.listen();
};
cam.set = function (dir, callback) {
	'use strict';
	var obj;
	if (cam.lock) {
		return false;
	}
	obj = {
		dir : dir,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('cam', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	cam.queue[obj.id] = obj;
	cam.lock = true;
};
cam.move = function (callback) {
	'use strict';
	var obj;
	if (cam.lock) {
		return false;
	}
	obj = {
		frame : true,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('cam', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	cam.queue[obj.id] = obj;
	cam.lock = true;
};
cam.end = function (c, id, ms) {
	'use strict';
	if (c === mcopy.cfg.arduino.cmd.cam_forward) {
		mcopy.state.camera.direction = true;
	} else if (c === mcopy.cfg.arduino.cmd.cam_backward) {
		mcopy.state.camera.direction = false;
	} else if (c === mcopy.cfg.arduino.cmd.camera) {
		if (mcopy.state.camera.direction) {
			mcopy.state.camera.pos += 1;
		} else {
			mcopy.state.camera.pos -= 1;
		}
	}
	if (typeof cam.queue[id] !== 'undefined') {
		if (typeof cam.queue[id].callback !== 'undefined') {
			cam.queue[id].callback(ms);
		}
		delete cam.queue[id];
		cam.lock = false;
	}
};
cam.listen = function () {
	'use strict';
	ipcRenderer.on('cam', function (event, arg) {
		cam.end(arg.cmd, arg.id, arg.ms);		
		return event.returnValue = true;
	});
};

//LIGHT
light.preview_state = false; //light is on/off for preview viewing
light.color = [255, 255, 255]; //default color
light.current = [0, 0, 0]; //last sent
light.icon = {};
light.swatches = [
	{
		rgb : [0, 0, 0],
		name : 'off'
	},
	{
		rgb : [255, 255, 255],
		name : 'white (LED)'
	},
	{
		rgb : chroma.kelvin(2500).rgb(),
		name : '2500 kelvin'
	},
	{
		rgb : chroma.kelvin(5600).rgb(),
		name : '5600 kelvin'
	},
	{
		rgb : chroma.kelvin(6500).rgb(),
		name : '6500 kelvin'
	},
	{
		rgb : light.color,
		set : true,
		default : true
	}
];
light.queue = {};
light.lock = false;
light.init = function () {
	'use strict';

	//create dynamic style for displaying light across screens
	light.icon = document.createElement('style');
	light.icon.innerHTML = 'span.mcopy-light{background-color: #000;}';
	document.body.appendChild(light.icon);

	light.colorPickers();
	light.swatch.init();
	light.listen();

	light.display(light.current);

	$('#preview').on('change', function () {
		light.preview_state = $(this).prop('checked');
		if (light.preview_state) {
			light.display(light.color);
			light.set(light.color);
		} else {
			light.display([0,0,0]);
			light.set([0,0,0]);
		}
	});
};
light.colorPickers = function () {
	'use strict';
	$('#colors-tabs').w2tabs({
		name: 'colors',
		active: 'kelvin',
		tabs: [
			{ id: 'kelvin', caption: 'Kelvin'},
			{ id: 'cmy', caption: 'CMY'},
			{ id: 'rgb', caption: 'RGB' }
		],
		onClick: function (event) {
			$('.colors-page').hide();
			$('#' + event.target + '-page').show();
			if (event.target === 'rgb') {
				light.rgb.page();
			}
		}
	});
	light.rgb.init();
	light.kelvin.init();
};
light.set = function (rgb, callback) { //rgb = [0,0,0]
	'use strict';
	var obj;

	if (light.lock) {
		//potential for logging overlapping commands
		return false;
	}

	obj = {
		rgb : rgb,
		id : uuid.v4()
	};
	ipcRenderer.sendSync('light', obj);

	if (typeof callback !== 'undefined') {
		obj.callback = callback;
	}
	light.queue[obj.id] = obj;
	light.current = rgb;
	light.lock = true;
};
light.end = function (id) {
	'use strict';
	if (typeof light.queue[id] !== 'undefined') {
		if (typeof light.queue[id].callback !== 'undefined') {
			light.queue[id].callback();
		}
		delete light.queue[id];
		light.lock = false;
	}
}
light.listen = function () {
	'use strict';
	ipcRenderer.on('light', function (event, arg) {
		light.end(arg.id);
		return event.returnValue = true;
	});
};
light.preview = function (rgb, name) { 
	'use strict';
	var rgbStr;
	rgb = light.rgb.floor(rgb);
	rgbStr = 'rgb(' + rgb.join(',') + ')';
	light.color = rgb;
	if (typeof name === 'undefined') {
		name = rgbStr;
	}
	$('#light-swatches .swatch.set').css('background', rgbStr)
		.attr('color', rgb.join(','))
		.prop('title', name);

	if (light.preview_state) {
		light.display(rgb);
		light.set(rgb);
	}
};
light.display = function (rgb) { //display light active state
	'use strict';
	var str,
		i;
	rgb = light.rgb.floor(rgb);
	for (i = 0; i < 3; i++) {
		$('#light-status form input').eq(i).val(rgb[i]);
	}
	str = 'rgb(' + rgb.join(',') + ')';
	$('#color').css('background-color', str);
	light.icon = document.styleSheets[document.styleSheets.length - 1];
	light.icon.deleteRule(0);
	light.icon.insertRule('span.mcopy-light{background-color: ' + str + ';}', 0)
};

//KELVIN GUI
light.kelvin = {};
light.kelvin.steps = 348;
light.kelvin.min = light.kelvin.steps * 4;
light.kelvin.max = 20000;
light.kelvin.moving = false;
light.kelvin.init = function () {
	'use strict';
	$('#kelvin').on('change', light.kelvin.change);
	$('#kelvin').on('keypup', function (e) {
		var code = e.keyCode || e.which;
		if (code === 13) {
			light.kelvin.change();
		}
	});
	$('#kelvin-slider').on('mousemove', function (event) {
		if (light.kelvin.moving) {
			light.kelvin.click(this, event);
		}
	});
	$('#kelvin-slider').on('mousedown', function (event) {
		light.kelvin.moving = true;
		light.kelvin.click(this, event);
	});
	$(document).on('mouseup', function () {
		light.kelvin.moving = false;
	});
	light.kelvin.scale();
	light.kelvin.set(5600); //default value
};
light.kelvin.change = function () {
	'use strict';
	var val = $('#kelvin').val(),
		rgb = chroma.kelvin(val).rgb();
	light.kelvin.pos(val);
	light.preview(rgb, val + ' kelvin');
};
light.kelvin.scale = function () {
	'use strict';
	var i,
		min = light.kelvin.min,
		max = light.kelvin.max,
		steps = light.kelvin.steps,
		rgb,
		elem,
		elemStr = '<span style="background: rgb(XXXX);"></span>'
	for (i = 0; i < steps; i++) {
		rgb = chroma.kelvin((i * ((max - min) / steps)) + min).rgb();
		rgb = light.rgb.floor(rgb).join(',');
		elem = $(elemStr.replace('XXXX', rgb));
		$('#kelvin-scale').append(elem);
	}
};
light.kelvin.pos = function (kelvin) {
	'use strict';
	var min = light.kelvin.min,
		max = light.kelvin.max,
		steps = light.kelvin.steps,
		start = -1,
		pos = Math.round((kelvin - min) / ( (max - min) / steps)) + start;
	if (pos < start) {
		pos = start;
	}
	if (pos > steps) {
		pos = steps;
	}
	$('#kelvin-pos').css('left', pos + 'px');
};
light.kelvin.set = function (kelvin) {
	'use strict';
	$('#kelvin').val(kelvin);
	light.kelvin.change();
};
light.kelvin.click = function (t, e) {
	'use strict';
	var parentOffset = $(t).parent().offset(),
   		relX = e.pageX - parentOffset.left - 31, //?
   		min = light.kelvin.min,
   		max = light.kelvin.max,
   		steps = light.kelvin.steps,
   		kelvin = Math.round((relX * ((max - min) / steps)) + min);
   	light.kelvin.set(kelvin);

};

//CMY GUI
light.cmy = {};
light.cmy.init = function () {
	'use strict';

};

//RGB GUI
light.rgb = {};
light.rgb.elem;
light.rgb.lock = true;
light.rgb.init = function () {
	'use strict';
	light.rgb.elem = jsColorPicker('#rgb', {
		customBG: '#222',
		readOnly: true,
		size: 3,
		appendTo : document.getElementById('rgb-page'),
		// patch: false,
		init: function(elm, colors) { // colors is a different instance (not connected to colorPicker)
			elm.style.backgroundColor = elm.value;
			elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
		},
		convertCallback: light.rgb.change
	});
};
light.rgb.page = function () {
	'use strict';
	if (light.rgb.lock) {
		$('#rgb').focus();
		light.rgb.lock = false;
	}
	light.rgb.set(light.color);
};
light.rgb.change = function (colors, type) {
	'use strict';
	var a = colors.RND.rgb,
		rgb = [a.r, a.g, a.b];
	if (!light.rgb.lock) {
		light.preview(rgb);
	}
};
light.rgb.floor = function (rgb) {
	'use strict';
	return [
		Math.floor(rgb[0]),
		Math.floor(rgb[1]),
		Math.floor(rgb[2])
	];
};
light.rgb.set = function (rgb) {
	'use strict';
	var hex = chroma.rgb(rgb).hex();
	light.rgb.elem.current.startRender();
	light.rgb.elem.current.setColor(hex);
	light.rgb.elem.current.stopRender();
};

//SWATCH GUI
light.swatch = {};
light.swatch.init = function () {
	'use strict';
	var number = 12,
		add,
		elem,
		rgb,
		i,
		x;
	for (i = 0; i < light.swatches.length; i++) {
		light.swatches[i].rgb = light.rgb.floor(light.swatches[i].rgb);
		rgb = 'rgb(' + light.swatches[i].rgb.join(',') + ')';
		elem = $('<div class="swatch"></div>');
		elem.css('background', rgb);
		elem.attr('color', light.swatches[i].rgb.join(','));
		if (typeof light.swatches[i].name !== 'undefined') {
			elem.prop('title', light.swatches[i].name);
		} else {
			elem.prop('title', rgb);
		}
		if (light.swatches[i].default) {
			elem.addClass('default');
		}
		if (light.swatches[i].set) {
			elem.addClass('set');
		}
		$('#new-swatch').before(elem);
	}
	$('#new-swatch').on('click', light.swatch.add);
	$(document.body).on('click', '#light-swatches .swatch', function () {
		var rgb = $(this).attr('color');
		if (typeof color !== 'undefined') {
			rgb = rgb.split(',');
			$('#light-swatches .swatch').removeClass('default set');
			$(this).addClass('default set');
			if (w2ui['colors'].active === 'rgb') {
				light.rgb.set(light.color);
			}
			light.preview(rgb);
		}
	});
	$(document.body).on('dblclick', '.swatch', function () {
		
	});
};
light.swatch.add = function () {
	'use strict';
	var swatch = $('<div class="swatch default set"></div>');
	$('#light-swatches .swatch').removeClass('default set');
	$('#new-swatch').before(swatch);
	light.preview(light.color);
};

//GUI
gui.fmtZero = function (val, len) {
	var raw = val,
		str = val + '',
		output = ''
	if (raw < 0) {
		output = '-' + Array(len - (str.length - 1)).join('0') + str.replace('-', '');
	} else {
		if (str.length < len) {
			output = Array(len - str.length).join('0') + str;
		} else if (str.length >= len) {
			str = parseInt(str) + '';
			output = Array(len - str.length).join('0') + str;
		}
	}
	return output;
};
gui.counterFormat = function (t, normal, prevent) {
	var raw = t.value;
	t.value = gui.fmtZero(raw, 6);
	if (typeof normal !== 'undefined' && parseInt(raw) !== normal) {
		$(t).addClass('changed');
	} else {
		$(t).removeClass('changed');
	}
	if (typeof prevent === 'undefined') { prevent = false; }
	if (!prevent) {
		gui.shootGoto(t);
	}
};
gui.shootGoto = function (t) {
	var elem = $(t),
		id = elem.attr('id').split('_'),
		val = 0,
		comp = 0,
		other = {};
	if (id[1] === 'cam') {
		comp = mcopy.state.camera.pos;
	} else if (id[1] === 'proj') {
		comp = mcopy.state.projector.pos;
	}
	if (id[0] === 'shoot') {
		other = $('#goto_' + id[1]);
		val = parseInt(elem.val()) + comp;
		other.val(val);
		gui.counterFormat(other[0], comp, true);
		//other.trigger('change');
	} else if (id[0] === 'goto'){
		other = $('#shoot_' + id[1]);
		val = parseInt(elem.val()) - comp;
		other.val(val);
		gui.counterFormat(other[0], undefined, true);
	} else {
		//ALLOW TO EXECUTE WITH NO RESULTS
		//console.log('You screwed up the markup.');
	}
};
gui.updateCam = function (t) {
	var val = t.value,
		change;
	if (parseInt(val) === mcopy.state.camera.pos) { return false; }
	change = confirm('Are you sure you want to set camera counter to ' + val + '?');
	if (change) {
		mcopy.state.camera.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = mcopy.state.camera.pos;
		gui.counterFormat(t);
	}
};
gui.updateProj = function (t) {
	var val = t.value,
		change;
	if (parseInt(val) === mcopy.state.projector.pos) { return false; }
	change = confirm('Are you sure you want to set projector counter to ' + val + '?');
	if (change) {
		mcopy.state.projector.pos = parseInt(val);
		gui.updateState();
	} else {
		t.value = mcopy.state.projector.pos;
		gui.counterFormat(t);
	}
};
gui.updateState = function () {
	var cpos = mcopy.state.camera.pos,
		ppos = mcopy.state.projector.pos;

	$('#seq_cam_count').val(cpos).change();
	$('#seq_proj_count').val(ppos).change();
};
gui.info = function (title, message) {
	'use strict';
	var config = {
		type : 'info',
		buttons : ['Ok'],
		title: title,
		message : message
	};
	dialog.showMessageBox(config);
	/*
	type String - Can be "none", "info", "error", "question" or "warning". On Windows, "question" displays the same icon as "info", unless you set an icon using the "icon" option.
	buttons Array - Array of texts for buttons.
	defaultId Integer - Index of the button in the buttons array which will be selected by default when the message box opens.
	title String - Title of the message box, some platforms will not show it.
	message String - Content of the message box.
	detail String - Extra information of the message.
	icon NativeImage
	cancelId Integer - The value will be returned when user cancels the dialog instead of clicking the buttons of the dialog. By default it is the index of the buttons that have "cancel" or "no" as label, or 0 if there is no such buttons. On OS X and Windows the index of "Cancel" button will always be used as cancelId, not matter whether it is already specified.
	noLink Boolean - On Windows Electron will try to figure out which one of the buttons are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set noLink to true.
	*/
};
gui.confirm = function () {};
gui.warn = function (title, message) {
	'use strict';
	var config = {
		type : 'warning',
		buttons : ['Ok'],
		title: title,
		message : message
	};
	dialog.showMessageBox(config);
};
gui.error = function () {};

/******
	Sequencer grid
*******/
gui.grid = {};
gui.grid.swatchesElem = {};
gui.grid.init = function () {
	'use strict';
	gui.grid.refresh();
	seq.stats();
	gui.grid.events();
};

gui.grid.state = function (i) {
	'use strict';
	var elem = $('input[x=' + i + ']'),
		lightElem = $('.L' + '[x=' + i + ']');
	if (typeof mcopy.state.sequence.arr[i] !== 'undefined') {
		elem.prop('checked', false);
		$('.' + mcopy.state.sequence.arr[i] + '[x=' + i + ']').prop('checked', true);
		if (mcopy.state.sequence.arr[i] === 'CF'
			|| mcopy.state.sequence.arr[i] === 'CB') {
			lightElem.css('background', 'rgb(' + mcopy.state.sequence.light[i] + ')')
				.addClass('a')
				.prop('title', 'rgb(' + mcopy.state.sequence.light[i] + ')');

		} else {
			lightElem.css('background', 'transparent')
				.removeClass('a')
				.prop('title', '');
		}
	} else {
		lightElem.css('background', 'transparent')
			.removeClass('a')
			.prop('title', '');
	}
};
gui.grid.refresh = function () {
	'use strict';
	var cmds = ['cam_forward', 'proj_forward', 'cam_backward', 'proj_backward', 'light_set', 'numbers'],
		check = '<input type="checkbox" x="xxxx" />',
		div = '<div x="xxxx"></div>',
		elem,
		width = 970 - 34 + ((940 / 24) * Math.abs(24 - mcopy.state.sequence.size));
	$('#sequence').width(width + 'px');
	for (var i = 0; i < cmds.length; i++) {
		$('#' + cmds[i]).empty();
		for (var x = 0; x < mcopy.state.sequence.size; x++) {
			if (i === cmds.length - 1) {
				elem = div.replace('xxxx', x);
				$('#' + cmds[i]).append($(elem).text(x));
			} else if (i === cmds.length - 2) {
				elem = div.replace('xxxx', x);
				$('#' + cmds[i]).append($(elem).addClass(mcopy.state.sequence.pads[cmds[i]]));
			} else {
				elem = check.replace('xxxx', x);
				$('#' + cmds[i]).append($(elem).addClass(mcopy.state.sequence.pads[cmds[i]]));
			}
			gui.grid.state(x);
		}
	}
};
gui.grid.click = function (t) {
	'use strict';
	var i = parseInt($(t).attr('x')),
		c;
	if ($(t).prop('checked')) {
		c = $(t).attr('class').replace('.', '');
		mcopy.state.sequence.arr[i] = c;
		if (c === 'CF'
			|| c === 'CB') {
			mcopy.state.sequence.light[i] = light.color.join(',');
		} else {
			mcopy.state.sequence.light[i] = '';
		}
	} else {
		mcopy.state.sequence.arr[i] = undefined;
		delete mcopy.state.sequence.arr[i];
	}
	gui.grid.state(i);
	seq.stats();
};
gui.grid.clear = function () {
	'use strict';
	var doit = confirm('Are you sure you want to clear this sequence?');
	if (doit) {
		seq.clear();
		gui.grid.refresh();
		seq.stats();
		console.log('Sequencer cleared');
	}
};
gui.grid.loopChange = function (t) {
	'use strict';
	var count = parseInt(t.value);
	mcopy.loop = count;
	seq.stats();
};
gui.grid.plus_24 = function () {
	'use strict';
	mcopy.state.sequence.size += 24;
	gui.grid.refresh();
	console.log('Sequencer expanded to ' + mcopy.state.sequence.size + ' steps');
};
gui.grid.setLight = function (x, rgb) {
	'use strict';
	mcopy.state.sequence.light[x] = rgb.join(',');
	gui.grid.state(x);
};
gui.grid.blackout = function (t) {
	var elem = $(t),
		i = elem.attr('x');
	if (typeof mcopy.state.sequence.light[i] === 'undefined') {
		return false;
	}
	if (mcopy.state.sequence.light[i] === '0,0,0') {
		gui.grid.setLight(i, light.color);
	} else {
		gui.grid.setLight(i, [0, 0, 0]);
	}	
};
gui.grid.changeAll = function (rgb) {
	'use strict';
	var i;
	for (i = 0; i < mcopy.state.sequence.arr.length; i++) {
		if (mcopy.state.sequence.arr[i] === 'CF'
			|| mcopy.state.sequence.arr[i] === 'CB') {
			gui.grid.setLight(i, rgb);
		}
	}
};
gui.grid.swatches = function (x) {
	'use strict';
	var current = mcopy.state.sequence.light[x];
	gui.grid.swatchesElem = w2popup.open({
		title   : 'Select Color',
		body    : $('#light-swatches').html(),
		buttons : '<button id="sequencer-ok" class="btn btn-default">Ok</button> <button id="sequencer-changeall" class="btn btn-warning">Change All</button> <button id="sequencer-cancel" class="btn btn-default">Cancel</button>',
		onClose : function () {
		}
	});
	$('.w2ui-msg-body .swatch').removeClass('default set');
	$('.w2ui-msg-body .swatch[color="' + current + '"').eq(0).addClass('default set');

	$('#sequencer-cancel').on('click', function () {
		gui.grid.swatchesElem.close();
	});
	$('#sequencer-changeall').on('click', function () {
		var doit = confirm('You sure you want to change all light settings?'),
			elem = $('.w2ui-msg-body .default'),
			rgb;
		if (doit && elem.length > 0) {
			rgb = elem.attr('color').split(',');
			gui.grid.changeAll(rgb);
			gui.grid.swatchesElem.close();
		} else if (doit && elem.length === 0) {
			gui.warn('Select Color', 'Please select a color to proceed.');
		}
	});
	$('#sequencer-ok').on('click', function () {
		var elem =  $('.w2ui-msg-body .default'),
			rgb;
		if (elem.length > 0) {
			rgb = elem.attr('color').split(',');
			gui.grid.setLight(x, rgb);
			light.color = rgb;
			gui.grid.swatchesElem.close();
		} else {
			gui.warn('Select Color', 'Please select a color to proceed.');
		}
	});
};
gui.grid.scrollTo = function (i) {
	'use strict';
	var w = 35 + 3; //width of pad + margin
	$('#seq_scroll').scrollLeft(i * w);
};
gui.grid.events = function () {
	'use strict';
	$(document.body).on('click', '#sequencer input[type=checkbox]', function () {
		gui.grid.click(this);
	});
	//$(document.body).on('click', '.L', function () {
		//alert('click');
		//console.log('please dont happen');
	//});
	$(document.body).on('dblclick', '.L', function () {
		gui.grid.blackout(this);
	});
	$(document.body).on('contextmenu', '.L', function (e) {
		var x = e.target.attributes.x.value;
		setTimeout(function () {
			gui.grid.swatches(x);
		}, 300);
		e.preventDefault();
		return false;
	});
	$('#seq_scroll').on('scroll', function () {
		var i = Math.ceil($('#seq_scroll').scrollLeft() / (35 + 3));
		$('#seq_scroll_state').val(gui.fmtZero(i, 6));
	});
	$('#seq_scroll_state').on('change', function () {
		var i = parseInt($(this).val());
		$(this).val(gui.fmtZero(i, 6));
		gui.grid.scrollTo(i);
	});
	$(document.body).on('click', '.w2ui-msg-body .swatch', function () {
		var color = $(this).attr('color'),
			title = $(this).attr('title');
		if (typeof color !== 'undefined') {
			color = color.split(',');
			$('.w2ui-msg-body .swatch').removeClass('default set');
			$('#light-swatches .swatch').removeClass('default set');
			$(this).addClass('default set');
			$('#light-swatches .swatch[title="' + title + '"]').eq(0).addClass('default set');
			light.color = color;
		}
	});
};

//NAV GUI
nav.active = 'sequencer';
nav.init = function () {
	'use strict';
	$('#toolbar').w2toolbar({
		name: 'toolbar',
		items: [
			{ type: 'radio',  id: 'sequencer',  group: '1', caption: 'Sequencer', icon: 'fa fa-th', checked: true },
			{ type: 'radio',  id: 'script',  group: '1', caption: 'Script', icon: 'fa fa-code' },
			{ type: 'radio',  id: 'controls',  group: '1', caption: 'Controls', icon: 'fa fa-tasks' },
			{ type: 'radio',  id: 'light',  group: '1', caption: 'Light', icon: 'mcopy-light' },
			{ type: 'spacer' },
			{ type: 'button',  id: 'settings',  group: '1', caption: 'Settings', icon: 'fa fa-cogs' }
		],
		onClick : function (event) {
			nav.change(event.target);
		}
	});
};
nav.change = function (id) {
	'use strict';
	nav.active = id;
	$('.screen').hide();
	$('#' + id).show();
	if (id === 'controls') {
		w2ui['log'].resize();
		w2ui['log'].scrollIntoView(log.count - 1);
		w2ui['log'].selectNone();
		w2ui['log'].select(log.count - 1);
	} else if (id === 'light') {
		if (w2ui['colors'].active === 'rgb') {
			light.rgb.set(light.color);
		}
	}
};

var init = function () {
	'use strict';
	nav.init();
	gui.grid.init();
	log.init();	
	light.init();
	proj.init();
	cam.init();
};