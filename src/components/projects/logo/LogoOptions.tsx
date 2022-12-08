export class LogoOptions {
	code: string = "rgb 255 0 0 lt 50 fd 111.65 repeat 200 [ rt 1 fd 1 ] lt 120 repeat 200 [ rt 1 fd 1 ] fd 111.65";
}

// Flor
// to petal :size repeat 2 [repeat :size [fd 2 rt 1] rt 180-:size] end to flower :n :size repeat :n [randomColor petal :size rt 360/:n] end thickness 2 flower 10 60 lt 27 thickness 1 flower 10 80

// Coração
// rgb 255 0 0 lt 50 fd 111.65 repeat 200 [ rt 1 fd 1 ] lt 120 repeat 200 [ rt 1 fd 1 ] fd 111.65

// Polígonos
// to poly :sides :size repeat :sides [fd :size rt 360/:sides] end
// to circle :size poly 360 :size end
// to square :size poly 4 :size end
