"use strict";function __extends(t,e){function n(){this.constructor=t}extendStatics(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}Object.defineProperty(exports,"__esModule",{value:!0});var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},Util=function(){function t(){}return t.uniqueId=function(e){void 0===e&&(e=null);var n=++t._idCounter;return null!=e?String(e+n):n},t.deletePropertyFromObject=function(e,n){var r=n instanceof Array?n:[n];return Object.keys(e).forEach(function(n){var o=e[n];!0===r.includes(n)?delete e[n]:o instanceof Array?o.forEach(function(e){return t.deletePropertyFromObject(e,r)}):o instanceof Object&&t.deletePropertyFromObject(o,r)}),e},t.clone=function(e){if(null==e||"object"!=typeof e)return e;if(e instanceof Date){var n=new Date;return n.setTime(e.getTime()),n}if(e instanceof Array){for(var r=[],o=e.length,i=0;i<o;i++)r[i]=t.clone(e[i]);return r}if(e instanceof Object){var s={};for(var a in e)e.hasOwnProperty(a)&&(s[a]=t.clone(e[a]));return s}throw new Error("[Util] Unable to clone type "+typeof e+".")},t._idCounter=0,t}(),BaseObject=function(){function t(){this.sjsId=null,this.sjsId=Util.uniqueId()}return t.prototype.destroy=function(){for(var t in this)this.hasOwnProperty(t)&&"sjsId"!==t&&(this[t]=null)},t}(),BaseModel=function(t){function e(e){void 0===e&&(e={});var n=t.call(this)||this;return n.sjsOptions={expand:!1},n.sjsOptions.expand=!0===e.expand,n}return __extends(e,t),e.prototype.update=function(t){var e=this;return void 0===t&&(t={}),Object.keys(this).forEach(function(n){if("sjsId"!==n){var r=e[n],o=t[n],i=void 0!==o?o:r;e._updatePropertyWithDataPassedIn(n,i)}}),this},e.prototype.toJSON=function(){var t=Util.clone(this);return Util.deletePropertyFromObject(t,["sjsId","sjsOptions"])},e.prototype.toJSONString=function(){return JSON.stringify(this.toJSON())},e.prototype.fromJSON=function(t){var e=JSON.parse(t);return this.update(e),this},e.prototype.clone=function(){return new this.constructor(this)},e.prototype._updatePropertyWithDataPassedIn=function(t,e){var n=this;if(this[t]instanceof Array==!0&&e instanceof Array==!0){var r="function"==typeof this[t][0]&&!0===this[t][0].IS_BASE_MODEL,o="function"==typeof e[0]&&!0===e[0].IS_BASE_MODEL;if(!1===r)this[t]=e.map(function(t){return n._updateData(null,t)});else if(!0===r&&!1===o){var i=this[t][0];this[t]=e.map(function(t){return n._updateData(i,t)})}else this[t]=[]}else this[t]=this._updateData(this[t],e)},e.prototype._updateData=function(t,n){var r=null;return!1===this.sjsOptions.expand&&"function"==typeof n&&!0===n.IS_BASE_MODEL?null:("function"==typeof t&&!0===t.IS_BASE_MODEL&&n?r=new t(n,this.sjsOptions):t instanceof e==!0?(t.update(n),r=t):r=n,r)},e.IS_BASE_MODEL=!0,e}(BaseObject);exports.BaseModel=BaseModel,exports.Util=Util;
//# sourceMappingURL=index.js.map