include <./common/common.scad>;

BaseZ = 10; //debug
BaseX = 91.4;
BaseY = 97.6;

function hypotenuese(X) = sqrt(pow(X, 2) + pow(X, 2));

module base_void (pos = [0, 0, 0]) {
	$fn = 50;
	D = 9.5;
	X = 39;
	translate(pos) {
		cube([X - D, D, BaseZ + 1], center = true);
		translate([(X / 2) - (D / 2), 0, 0]) cylinder(r = R(D), h = BaseZ + 1, center = true);
		translate([-(X / 2) + (D / 2), 0, 0]) cylinder(r = R(D), h = BaseZ + 1, center = true);
	}
}

module base_voids () {
	SPACING = 40;
	base_void([0, SPACING/2, 0]);
	base_void([0, -SPACING/2, 0]);
}

module base (pos = [0, 0, 0]) {
	translate(pos) {
		//places it at 0z
		translate([0, 0, -BaseZ/2]) difference () {
			cube([BaseX, BaseY, BaseZ], center = true);
			base_voids();
		}
	}
}

module sensor (pos = [0, 0, 0], LENGTH = 1) {
	X = 22.3;
	Y = LENGTH;
	Z = 14.9;
	translate(pos) {
		cube([X, Y, Z], center = true);
	}
}

module cage_cube (X, Y, Z) {
	difference () {
		cube([X,    Y,    Z], center = true);
		cube([X-10, Y-10, Z+1], center = true);
		cube([X-10, Y+1,  Z-10], center = true);
		cube([X+1,  Y-10, Z-10], center = true);
	}
}

module canon_rebel_t3i (pos = [0, 0, 0]) {
	X = 133.1;
	Y = 79.7;
	Z = 99.5;
	translate(pos) {
		color("azure", 0.25) {
			cage_cube(X, Y, Z);
		}
		color("green") sensor([0, 0, 0]); //160
	}
}

module canon_rebel_t3i_mount (pos = [0, 0, 0]) {
	translate (pos) {
		cylinder(r = R(30), h = 66, center = true);
		difference () {
			translate([0, 52.5/2, 66/2]) cube([30, 52.5+40, 1], center = true);
			translate([0, 52.5, 66/2]) cylinder(r = R(4), h = 1 + 1, center = true);
		}
	}
}

module canon_m_50 (pos = [0, 0, 0]) {
	X = 116;
	Y = 59;
	Z = 88;
	translate(pos) {
		color("green", 0.25) {
			cage_cube(X, Y, Z);
		}
		color("green") sensor([0, 0, 0]);
	}
}

module canon_m_50_mount () {
	X = 60;
	Y = 60;
	Z = 71.75;
	SPACING = 40;
	ACCESS = 15;
	DIAG = hypotenuese(ACCESS);
	translate([0, 0, Z/2]) {
		difference () {
			cube([X, Y, Z], center = true);
			cube([X + 1, Y-40, Z-20], center = true);
			cube([X + 1, Y-20, Z-40], center = true);

			//void around camera bolt
			translate([0, 0, (Z/2) - 20]) cylinder(r = R(30), h = 20, center = true, $fn = 100);
			//void for camera bolt
			translate([0, 0, (Z/2)]) cylinder(r = R(5), h = 20 + 1, center = true, $fn = 60);
		
			//void for base bolts
			//translate([0, SPACING/2, -(Z/2) + 10]) cylinder(r = R(9), h = 40, center = true, $fn = 60);
			//translate([0, -SPACING/2, -(Z/2) + 10]) cylinder(r = R(9), h = 40, center = true, $fn = 60);
		
			//bolt access
			//translate([0, 0, -10]) rotate([0, 45, 0]) cube([ACCESS, Y + 1, ACCESS], center = true);
			//translate([0, 0, -10 - (ACCESS/2) + (10/4)])cube([DIAG, Y + 1, 10], center = true);
		}
	}
}

//color("red") base();
//canon_rebel_t3i_mount([0, 20, 33]);
//canon_rebel_t3i([0, 20+52.5, 66 + (99.5/2)]);

//canon_m_50([0, 0, 115.75]);
canon_m_50_mount();