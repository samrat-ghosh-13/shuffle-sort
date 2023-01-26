const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8");

jest.dontMock("fs");

describe("Testing", () => {
	beforeEach(() => {
		document.documentElement.innerHTML = html.toString();
	});
	afterEach(() => {
		jest.resetModules();
	});
	it("Match Snapshots", () => {
		expect(document.documentElement.innerHTML).toMatchSnapshot();
	});
	it("Shuffle Button", () => {
		expect(document.getElementsByName("Shuffle")).toBeTruthy();
	});
	it("Sort Button", () => {
		expect(document.getElementsByName("Shuffle")).toBeTruthy();
	});
});
