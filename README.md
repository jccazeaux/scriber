![Travis CI](https://travis-ci.org/jccazeaux/scriber.svg?branch=master)

# scriber
A tiny framework to write easily HTML code in javascript

# Installation

* Download the [latest release](https://github.com/jccazeaux/scriber/releases/download/v0.1.0/scriber.min.js).
* Clone the repo: `git clone https://github.com/jccazeaux/scriber.git`.
* Install with npm: `npm install scriber-js`.


# Syntax
```Javascript
scriber
	.div()
		.id("myId")
		.class("my-css-class")
		.input()
			.value("my value")
		.end()
		.element("span")
		.class("red")
		.end()
	.end()
	.toString

```

Produces

```html
<div id="myId" class="my-css-class"><input value="my value"><span style="red"></span></div>
```

# api
## scriber.&lt;tagName&gt;() or scriber.Element(&lt;tagName&gt;)
Creates the root element. You can use generic "element" function with will take the tagName as parameter, or a shortcut function wich name will be the tagName.

This function will return an "Element" object to work on the new created element

## Element.&lt;tagName&gt;() or Element.element(&lt;tagName&gt;)
Creates a child element with same rules.

This function returns the created element. To close this element, use the end function.

## Element.end()
Ends the current element. Returns the parent element.

## Element.<attributeName>(&lt;String&gt; value) or Element.attr(&lt;String&gt; name, &lt;String&gt; value)
Creates an attribute on the element. You can use either a shortcut function or generic element() function

## Element.text(&lt;String&gt; value)
Adds a text node. No need to end a text node as it does not accept children.

## Element.toString()
Return the element as a String

## Element.toHTMLElement()
Return the element as HTMLElement object

# Shortcut methods
## For tags
Scriber supports shortcuts for the following tags
```Javascript
["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body",
"br","button","canvas","caption","center","cite","code","col","colgroup","datalist","dd","del","details","dfn","dialog","dir","div",
"dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1",- "h6","head","header","hr",
"html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta",
"meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby",
"s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody",
"td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"]
```
## For attributes
Scriber supports shortcuts for the following attributes. The style attribute has no shortcut because the style method already handles the style tag. If you really want to add a style attribute (instead of class), use the generic attr("style") method.
```Javascript
["alt", "diabled", "href", "src", "title", "value", "name", "id", "class"]
``
