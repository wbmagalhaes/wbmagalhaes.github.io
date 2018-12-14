var tileSize = 70;
var tiles = new Array(8);

var xmin, xmax, ymin, ymax;

var selectedTile = null;

var whitePieceColor, blackPieceColor;

function setup() {
  createCanvas(800, 600).parent("canvas-holder");

  whitePieceColor = color(220, 220, 220);
  blackPieceColor = color(30, 30, 30);

  var whiteNormalColor = color(220, 220, 200);
  var whiteHoveredColor = color(150, 150, 130);
  var blackNormalColor = color(60, 60, 120);
  var blackHoveredColor = color(30, 30, 90);

  var whiteTile = new TileColor(whiteNormalColor, whiteHoveredColor, blackNormalColor);
  var blackTile = new TileColor(blackNormalColor, blackHoveredColor, whiteNormalColor);

  ellipseMode(CENTER);
  rectMode(CENTER);

  for (var i = 0; i < 8; i++) {
    tiles[i] = new Array(8);
    for (var j = 0; j < 8; j++) {
      var pos = createVector(i, j);
      var col = (i + j) % 2 == 0 ? whiteTile : blackTile;
      tiles[i][j] = new Tile(pos, col);
    }
  }

  xmin = width / 2 - (4 * tileSize);
  xmax = width / 2 + (4 * tileSize);
  ymin = height / 2 - (4 * tileSize);
  ymax = height / 2 + (4 * tileSize);

  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 3; y++)
      if ((x + y) % 2 == 0)
        tileFromXY(x, y).placePiece(new Piece(0));

    for (var y = 5; y < 8; y++)
      if ((x + y) % 2 == 0)
        tileFromXY(x, y).placePiece(new Piece(1));
  }
}

function draw() {
  background(51);

  var tile = tileUnderMouse();
  if (tile != null)
    tile.hovered = true;

  translate(width / 2, height / 2);
  for (var i = 0; i < 8; i++)
    for (var j = 0; j < 8; j++)
      tiles[i][j].draw();
}

function mouseClicked() {
  var clicked = tileUnderMouse();

  if (clicked == null) { // outside board
    if (selectedTile != null) // if has something selected
      selectedTile.unselect(); // unselect old tile

    return;
  }

  if (selectedTile != null) { // if has something selected
    if (selectedTile == clicked) // is the same tile
      selectedTile.unselect(); // unselect old tile
    else                    // diferent tile
      makeMove(selectedTile, clicked); // make legal move

    return;
  }

  // if hasn't something selected
  clicked.select(); // select new tile
}

function tileUnderMouse() {
  if (mouseX < xmax && mouseX > xmin) {
    if (mouseY < ymax && mouseY > ymin) {
      var x = floor((mouseX - xmin) / tileSize);
      var y = floor((mouseY - ymin) / tileSize);
      return tiles[x][y];
    }
  }
  return null;
}

function tileFromCoord(coord) {
  var x = 'abcdefgh'.indexOf(coord.charAt(0));
  var y = int(coord.charAt(1)) - 1;

  return tileFromXY(x, y);
}

function tileFromXY(x, y) {
  var result = null;

  y = 7 - y;

  if (x >= 0 && x < 8)
    if (y >= 0 && y < 8)
      result = tiles[x][y];

  return result;
}

function makeMove(from, to) {
  if (to.placePiece(from.piece)) {
    from.piece = null;
    selectedTile.unselect();
  }
}