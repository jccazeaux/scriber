describe("Constructs elements", function() {
	it("constructs a root element", function() {
		var elem = scriber.div().id("idTest").class("test-class").end().toString();
		expect(elem).toBe('<div id="idTest" class="test-class"></div>');
	});


	it("constructs child elements", function() {
		var elem = scriber.div().id("idTest").class("test-class")
			.span().class("red").end()
			.input().value("my value").end()
			.end().toString();
		expect(elem).toBe('<div id="idTest" class="test-class"><span class="red"></span><input value="my value"></div>');
	});
});