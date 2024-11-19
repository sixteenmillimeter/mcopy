use <./common/common.scad>;

BolexFilmPlaneZ = 108.7;
BolexFilmPlaneX = 0;
BolexFilmPlaneY = 0;

module debug_bolex_film_plane (pos = [0, 0, 0], rot = [0, 0, 0]) {
	translate(pos) rotate(rot) {
		color("red") cube([16, 0.1, 10], center = true);
	}
}

module debug_bolex_base_plate (pos = [0, 0, 0], rot = [0, 0, 0]) {
	translate(pos) rotate(rot) {
		color("green") cube([56, 78, 0.1], center = true);
	}
}

module debug_bolex (pos = [0, 0, 0], rot = [0, 0, 0]) {
	translate(pos) rotate(rot) {
		debug_bolex_film_plane([BolexFilmPlaneX, BolexFilmPlaneY, BolexFilmPlaneZ]);
		debug_bolex_base_plate();
	}
}