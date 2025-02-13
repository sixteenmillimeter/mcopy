include <./common/common.scad>;
IN = 25.4;
/**
 * Parametric measurement bar to attach to rails
 **/ 

module measurement_bar (X = 20 * IN, Y = 16.4, Z = 3, BOLT = 4, BOLT_OFFSET = (3/8) * IN, PROJ_ZERO = 43) {
	$fn = 50;
	difference () {
		rounded_cube([X, Y, Z], d = 5,  center = true);
		translate([(X / 2) - BOLT_OFFSET, 0, 0]) cylinder(r = BOLT/2, h = Z + 1, center = true);
		translate([-(X / 2) + BOLT_OFFSET, 0, 0]) cylinder(r = BOLT/2, h = Z + 1, center = true);
		translate([(X / 2) - PROJ_ZERO, -(Y / 2) + (5 / 2), 0]) cube([0.2, 5, Z + 1], center = true);
	}
}

projection() {
	difference () {
		measurement_bar();
		translate([-11 * IN, 0, 0]) cube([20 * IN, 16.5, 4], center = true);
		translate([11 * IN, 0, 0]) cube([20 * IN, 16.5, 4], center = true);
	}
}