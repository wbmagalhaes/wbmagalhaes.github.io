var mapWidth, mapHeight;

var tiles = [];
var tileSize = 20;

var rooms = [];
var roomsNum = 25;

var mainRooms = [];
var corridors = [];

function setup() {
	createCanvas(800, 600).parent("canvas-holder");

	rectMode(CENTER);

	mapWidth = floor(width / tileSize);
	mapHeight = floor(height / tileSize);

	for (var j = 0; j < mapHeight; j++)
		for (var i = 0; i < mapWidth; i++)
			tiles.push(new Tile(i, j));

	var emptyTiles = getEmptyTiles();
	while (emptyTiles.length > 0) {
		rooms.push.apply(rooms, createRooms(roomsNum, emptyTiles));
		emptyTiles = getEmptyTiles();
	}

	for (var i = 0; i < rooms.length; i++) {
		if (rooms[i].area > 1)
			rooms[i].color = color(255, 0, 0);
	}

	rooms.sort((a, b) => {
		var area_a = a.w * a.h;
		var area_b = b.w * b.h;
		return area_b - area_a;
	});

	var coords = [];
	for (var i = 0; i < roomsNum; i++) {
		var room = rooms[i];
		room.color = color(0, 0, 255);
		coords.push(createVector(room.x, room.y));
		mainRooms.push(room);
	}
	rooms.splice(0, roomsNum);

	corridors = spanningTree(coords);
}

function getTile(x, y) {
	if (x < 0 || x >= mapWidth)
		return null;
	if (y < 0 || y >= mapHeight)
		return null;

	var t = x + y * mapWidth;
	if (t < 0 || t >= tiles.length)
		return null;

	return tiles[t];
}

function createRooms(n, empty) {
	var newRooms = [];

	for (var i = 0; i < n; i++) {
		if (empty.length <= 0)
			break;

		var t = floor(random(empty.length));
		var tile = empty[t];

		newRooms.push(new Room(tile.x, tile.y));
		tile.empty = false;

		empty.splice(t, 1);
	}

	for (var i = 0; i < 4; i++)
		newRooms.forEach(room => {
			room.expand();
		});

	return newRooms;
}

function getEmptyTiles() {
	var result = [];
	tiles.forEach(tile => {
		if (tile.empty)
			result.push(tile);
	});

	return result;
}

function spanningTree(unreached) {
	var reached = [];

	reached.push(unreached[0]);
	unreached.splice(0, 1);

	var pairs = [];

	while (unreached.length > 0) {
		var min = width * height;
		var reachedId = -1;
		var unreachedId = -1;

		for (var i = 0; i < reached.length; i++) {
			var reachedPoint = reached[i];
			for (var j = 0; j < unreached.length; j++) {
				var unreachedPoint = unreached[j];

				var d = dist(reachedPoint.x, reachedPoint.y, unreachedPoint.x, unreachedPoint.y);
				if (d < min) {
					min = d;
					reachedId = i;
					unreachedId = j;
				}
			}
		}

		pairs.push([reached[reachedId], unreached[unreachedId]]);

		reached.push(unreached[unreachedId]);
		unreached.splice(unreachedId, 1);
	}

	return pairs;
}

function draw() {
	background(23);
	translate(tileSize / 2, tileSize / 2);

	tiles.forEach(tile => {
		tile.show();
	});

	rooms.forEach(room => {
		room.show();
	});

	strokeWeight(2);
	stroke(0);
	mainRooms.forEach(room => {
		room.show();
	});

	strokeWeight(2);
	stroke(255, 0, 255);
	corridors.forEach(corridor => {
		var p0 = corridor[0];
		var p1 = corridor[1];
		line(p0.x * tileSize, p0.y * tileSize, p1.x * tileSize, p1.y * tileSize)
	});
}