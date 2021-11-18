var parser;

var xpos, ypos, angle, penDown, finished;

var actionDict = {};

var basicDict = {
	'foward': (args) => { foward(args) },
	'back': (args) => { back(args) },
	'right': (args) => { right(args) },
	'left': (args) => { left(args) },
	'penup': () => { pen(false) },
	'pendown': () => { pen(true) },
	'setThick': (args) => { setThick(args) },
	'setColor': (args) => { setColor(args) },
	'randomColor': () => { setColor([random(256), random(256), random(256)]) }
};

function setup() {
	createAction("fd", [":amt"], "foward :amt", true);
	createAction("bk", [":amt"], "back :amt", true);
	createAction("rt", [":amt"], "right :amt", true);
	createAction("lt", [":amt"], "left :amt", true);
	createAction("pu", [], "penup", true);
	createAction("pd", [], "pendown", true);
	createAction("thick", [":weight"], "setThick :weight", true);
	createAction("rgb", [":r", ":g", ":b"], "setColor :r :g :b", true);
	createAction("randomColor", [], "randomColor", true);

	createCanvas(800, 600, WEBGL).parent("canvas-holder");
	reset();

	read(document.getElementById("input-code"));
	frameRate(120);
}

function draw() {
	if (finished) return;

	if (parser == null) return;

	var cmd = parser.getNext();
	if (cmd)
		cmd.obey();
	else
		finished = true;
}

function reset() {
	finished = false;

	background(51);
	stroke(255);
	strokeWeight(1);

	xpos = 0;
	ypos = 0;
	angle = HALF_PI;
	penDown = true;
}

function sliceInput(input) {
	return input.split(/(\[\s*\d+\s+\d+\s+\d+\s*\])|\n|(\[)|(\])|(\s+)/).filter(x => (x !== undefined && x != "" && x != " "));
}

function read(input) {
	var tokens = sliceInput(input.value);
	console.table(tokens);

	if (tokens.length == 0) {
		input.classList.remove("is-invalid");
		input.classList.remove("is-valid")
		return;
	}

	parser = new LogoParser(tokens);
	var validCode = parser.parse(false);

	if (validCode != null) {
		input.classList.remove("is-invalid");
		input.classList.add("is-valid")
		reset();
	}
	else {
		input.classList.add("is-invalid")
		input.classList.remove("is-valid")
	}
}

function createAction(name, params, action, basic) {
	if (actionDict[name] && actionDict[name].basic) return;

	actionDict[name] = new Action(params, action, basic);
}

function foward(args) {
	var amt = 0;
	try {
		amt = eval(args[0]);
	}
	catch {

	}

	var dx = cos(angle) * amt;
	var dy = sin(angle) * amt;

	if (penDown)
		line(xpos, ypos, xpos + dx, ypos - dy);

	xpos += dx;
	ypos -= dy;
}

function back(args) {
	var amt = 0;
	try {
		amt = eval(args[0]);
	}
	catch {

	}

	var dx = -cos(angle) * amt;
	var dy = -sin(angle) * amt;

	if (penDown)
		line(xpos, ypos, xpos + dx, ypos - dy);

	xpos += dx;
	ypos -= dy;
}

function right(args) {
	var amt = 0;
	try {
		amt = eval(args[0]);
	}
	catch {

	}

	angle += amt * PI / 180;
}

function left(args) {
	var amt = 0;
	try {
		amt = eval(args[0]);
	}
	catch {

	}

	angle -= amt * PI / 180;
}

function pen(down) {
	penDown = down;
}

function setThick(args) {
	var weight = 1;
	try {
		weight = eval(args[0]);
	}
	catch {

	}

	strokeWeight(weight);
}

function setColor(args) {
	var r = 255;
	var g = 255;
	var b = 255;

	try {
		r = eval(args[0]);
		g = eval(args[1]);
		b = eval(args[2]);
	}
	catch {

	}

	stroke(color(r, g, b));
}