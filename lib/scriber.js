(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['scriber'], function () {
      return (root.returnExportsGlobal = factory(b));
    });
  } else {
    // Global Variables
    root.scriber = factory();
  }
})(this, function () {
	var possibleTags = ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1",- "h6","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"];
	var possibleAttributes = ["alt", "diabled", "href", "src", "style", "title", "value", "name", "id", "class"];

	/**
	 * Element object, represents a DOM element
	 */
	function Element(type) {
		this.parent = null;
		this.type = type;
		this.elements = [];
		this.attrs = [];
		var that = this;

		/**
		 * Add an attribute
		 * @param {String} name - attribute name
		 * @param {String} value - attribute value
		 */
		this.attr = function(name, value) {
			this.attrs[name] = value;
			return this;
		};

		/**
		 * Add an child element
		 * @param {String} type - element type
		 */
		this.element = function(type) {
			var elem = new Element(type);
			elem.parent = this;
			this.elements.push(elem);
			return elem;
		};

		// This adds shortcut for every tag element
		for (var j =0 ; j < possibleTags.length ; j++) {
			this[possibleTags[j]] = specificElement(possibleTags[j]);
		}
		/**
		 * Closure function for the shortcut functions
		 */
		function specificElement(type) {
			return function() {
				return that.element(type);
			}
		}

		// This adds shortcut for every attributs element
		for (j =0 ; j < possibleAttributes.length ; j++) {
			this[possibleAttributes[j]] = specificAttribute(possibleAttributes[j]);
		}
		/**
		 * Closure function for the shortcut functions
		 */
		function specificAttribute(name) {
			return function(value) {
				return that.attr(name, value);
			};
		}

		/**
		 * Ends the current Element. So we return the parent
		 */
		this.end = function() {
			return this.parent;
		};

		this.toHTMLElement = function() {
			var elem = document.createElement(this.type);
			for (attrName in this.attrs) {
				elem.setAttribute(attrName, this.attrs[attrName]);
			}
			for (var i = 00 ; i < this.elements.length ; i++) {
				elem.appendChild(this.elements[i].toHTMLElement());
			}
			return elem;
		};

		/**
		 * Returns as String
		 * @return String
		 */
		this.toString = function() {
			return this.toHTMLElement().outerHTML;
		}

	}

	var exports = {};

	/**
	 * Create the root element
	 * @param {String} type - element type
	 */
	exports.element = function(type) {
		var root = new Element(type);
		root.parent = root;
		return root;
	};

	// This adds shortcut for every tag element
	for (var j =0 ; j < possibleTags.length ; j++) {
		exports[possibleTags[j]] = specificElement(possibleTags[j]);
	}
	/**
	 * Closure function for the shortcut functions
	 */
	function specificElement(type) {
		return function() {
			return exports.element(type);
		}
	}

	return exports;
});

