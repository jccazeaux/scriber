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
	var possibleAttributes = ["alt", "diabled", "href", "src", "title", "value", "name", "id", "class"];

	/**
	 * Element object, represents a DOM element
	 */
	function Element(_type) {
		this.parent = null;
		var type = _type;
		var elements = [];
		var attrs = [];
		var that = this;

		/**
		 * Add an attribute
		 * @param {String} name - attribute name
		 * @param {String} value - attribute value
	 	 * @return {Object} this, for fluent coding
		 */
		this.attr = function(name, value) {
			attrs[name] = value;
			return this;
		};

		/**
		 * Add an child element
		 * @param {String} type - element type
	 	 * @return {Object} this, for fluent coding
		 */
		this.element = function(type) {
			var elem = new Element(type);
			elem.parent = this;
			elements.push(elem);
			return elem;
		};

		// This adds shortcut for every tag element
		for (var j =0 ; j < possibleTags.length ; j++) {
			this[possibleTags[j]] = specificElement(possibleTags[j]);
		}
		/**
		 * Closure function for the shortcut functions
		 * @param {String} type
		 * @return {Function}
		 */
		function specificElement(type) {
			return function() {
				return that.element(type);
			};
		}

		// This adds shortcut for every attributs element
		for (j =0 ; j < possibleAttributes.length ; j++) {
			this[possibleAttributes[j]] = specificAttribute(possibleAttributes[j]);
		}
		/**
		 * Closure function for the shortcut functions
		 * @param {String} type
		 * @return {Function}
		 */
		function specificAttribute(name) {
			return function(value) {
				return that.attr(name, value);
			};
		}

		/**
		 * Ends the current Element. So we return the parent
	 	 * @return {Object} this, for fluent coding
		 */
		this.end = function() {
			return this.parent;
		};

		/**
		 * Converts to HTML Element
		 * @return {DOMElement} ELement created
		 */
		this.toHTMLElement = function() {
			var elem = document.createElement(type);
			for (var attrName in attrs) {
				elem.setAttribute(attrName, attrs[attrName]);
			}
			var currentElem = null;
			for (var i = 0 ; i < elements.length ; i++) {
				currentElem = elements[i];
				if (typeof currentElem === "string") {
					elem.appendChild(document.createTextNode(currentElem));
				}
				else {
					elem.appendChild(elements[i].toHTMLElement());
				}
			}
			return elem;
		};

		/**
		 * Adds a text node
		 * @param {String} content
	 	 * @return {Object} this, for fluent coding
		 */
		this.text = function(content) {
			elements.push(content);
			return this;
		};

		/**
		 * Returns as String
		 * @return {String}
		 */
		this.toString = function() {
			return this.toHTMLElement().outerHTML;
		};

	}

	var exports = {};

	/**
	 * Create the root element
	 * @param {String} type - element type
	 * @return {Object} this, for fluent coding
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
	 * @param {String} type
	 * @return {Function}
	 */
	function specificElement(type) {
		return function() {
			return exports.element(type);
		};
	}

	return exports;
});

