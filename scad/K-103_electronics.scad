include <arduino.scad>;
include <common/common.scad>;

COVER_X = 90;
COVER_Y = 113.4;
COVER_Z = 3;

CASE_X = 86;
CASE_Y = 109;
CASE_Z1 = 38;
CASE_Z2 = 71.5;

CAPACITOR_X = 37;
CAPACITOR_Y = 16;
CAPACITOR_Z = 40;

CAPACITOR_OFFSET_Y = 6;
CAPACITOR_D = 4;

ResistorSize = [16.25, 51 - 1.75, 15.5];
RelayMountsX = 33.12;
RelayMountsY = 44;
RelayMountsY2 = 52;

COVER_X = 90;
COVER_Y = 113.4;
COVER_BOLTS_X = 80.25;
COVER_BOLTS_Y = 93.6;
COVER_BOLTS_D = 4;

 module m3_bolt (pos = [0, 0, 0], h = 10, pad = 0) {
    translate(pos) cylinder(r = R(3.25 + pad), h = h, center = true, $fn = 30);
}

module arduino_bolts_voids (pos = [0, 0, 0], rot = [0, 0, 0], h = 10, pad = 0) {
	translate(pos) rotate(rot) {
		m3_bolt([-2.5, -15.25, 0], h, pad);
		m3_bolt([-50.75, -14, 0], h, pad);
		m3_bolt([-45.7, -66.75, 0], h, pad);
		m3_bolt([-17.75, -66.75, 0], h, pad);
	}
}

module cover () {
    H = 3;
    difference () {
        rounded_cube([COVER_X, COVER_Y, H], d = 4, center = true, $fn = 30);
        translate([0, (9.15-3.65) / 2, 0]) {
            translate([COVER_BOLTS_X / 2, COVER_BOLTS_Y / 2, 0]) cylinder(r = R(COVER_BOLTS_D), h = H + 1, center = true, $fn = 30);
            translate([-COVER_BOLTS_X / 2, COVER_BOLTS_Y / 2, 0]) cylinder(r = R(COVER_BOLTS_D), h = H + 1, center = true, $fn = 30);
            translate([COVER_BOLTS_X / 2, -COVER_BOLTS_Y / 2, 0]) cylinder(r = R(COVER_BOLTS_D), h = H + 1, center = true, $fn = 30);
            translate([-COVER_BOLTS_X / 2, -COVER_BOLTS_Y / 2, 0]) cylinder(r = R(COVER_BOLTS_D), h = H + 1, center = true, $fn = 30);
        }
    }
}

module debug_capacitor (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        cube([CAPACITOR_X, CAPACITOR_Y, CAPACITOR_Z], center = true);
        translate([0, (CAPACITOR_Y / 2) + (10.75 / 2), (-CAPACITOR_Z / 2) + (4.3 / 2)]) difference () {
            cube([15.25, 10.75, 4.3], center = true);
            cylinder(r = R(CAPACITOR_D), h = 10, center = true, $fn = 30);
        }
    }
}

module debug_case_shape () {
    difference () {
        cube([CASE_X, CASE_Y, CASE_Z2], center  =true);
        translate([0, 0, ((CASE_Z1 + CASE_Z2) / 2) + 1.5]) rotate([17, 0, 0]) cube([CASE_X + 1, CASE_Y * 2, CASE_Z2], center  =true);
    }
}

module debug_case () {
    difference () {
        debug_case_shape();
        translate([0, 0, 1]) scale([0.99, 0.99, 1.0]) debug_case_shape();
        translate([-(CASE_X / 2) + (19 / 2) + 17, -CASE_Y / 2, -26.25 + 8.75]) {
            cube([19, 10, 19], center = true);
            translate([25 / 2, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(3.5), h = 10, center = true, $fn = 30);
            translate([-25 / 2, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(3.5), h = 10, center = true, $fn = 30);
        }
    }
}

module relay_module_post (pos = [0, 0, 0]) {
	$fn = 30;
	translate(pos) difference() {
		cylinder(r = R(5), h = 4, center = true);
		translate([0, 0, 0]) cylinder(r = R(3), h = 4 + 1, center = true);
	}
}

module relay_mount (pos = [0, 0, 0]) {
	$fn = 30;
	X = RelayMountsX/2;
	Y = RelayMountsY2/2;
	PostZ = 3;
	translate([0, -4, 0]) translate(pos) {
		translate([0, 0, -1]) difference () {
			rounded_cube([RelayMountsX + 5, RelayMountsY2 + 5, 5], d = 5, center = true);
			rounded_cube([RelayMountsX - 5, RelayMountsY2 - 5, 5 + 1], d = 4, center = true);
            translate([X,   Y, PostZ]) cylinder(r = R(3), h = 15, center = true, $fn = 40);
            translate([X,  -Y, PostZ]) cylinder(r = R(3), h = 15, center = true, $fn = 40);
            translate([-X,  Y, PostZ]) cylinder(r = R(3), h = 15, center = true, $fn = 40);
            translate([-X, -Y, PostZ]) cylinder(r = R(3), h = 15, center = true, $fn = 40);
		}
		relay_module_post([X,   Y, PostZ]);
		relay_module_post([X,  -Y, PostZ]);
		relay_module_post([-X,  Y, PostZ]);
		relay_module_post([-X, -Y, PostZ]);
	}
}

module relay_shelf (pos = [0, 0, 0]) {
    translate(pos) {
        difference () {
            translate([0, 0, -2]) rotate([0, 0, 90]) relay_mount();
            translate([37, -22.5, -1.5]) cube([20, 30, 20], center = true);
        }
        
        translate([0, 0, -3.5]) cube([20, 30, 4], center = true);
        translate([0, 34 / 2, -33 / 2]) cube([20, 4, 32], center = true);
        translate([0, -20 / 2, -35 / 2]) cube([20, 4, 30], center = true);
    }
}

module resistor_foot_mount (pos = [0, 0, 0]) {
	$fn = 30;
	translate(pos) {
        difference () {
            union () {
                cube([6, 8.75, 5], center = true);
                translate([0, 0, (5/2) + (2/2)]) cylinder(r = R(6), h = 2, center = true);
            }
            translate([0, 0, (5/2) + (5/2)]) cylinder(r = R(3), h = 20, center = true);
        }
	}
}

module resistor_mount (pos = [0, 0, 0], rot = [0, 0, 0]) {
	X = ResistorSize[0];
	Y = ResistorSize[1];
	Z = ResistorSize[2];
	translate (pos) rotate(rot) {
		difference () {
			cube([X, Y, 5], center = true);
			cube([X - 10, Y - 10, 5 + 1], center = true);
		}
		resistor_foot_mount([-(X/2)-(6/2), (Y/2)-(8.75/2), 0]);
		resistor_foot_mount([(X/2)+(6/2), -(Y/2)+(8.75/2), 0]);
        //echo("RESISTOR", 2 *((Y/2)-(8.75/2)));
	}
}

module arduino_mount (pos = [0, 0, 0]) {
    translate(pos) {
        difference () {
            union () {
                scale([1, 1.01, 1]) bumper();
                translate([0, 0, -2]) scale([1, 1.01, 1]) bumper();
            }
            rotate([0, 0, 180]) arduino_bolts_voids();
        }
        translate([27, 35, -4]) difference () {
            translate([-0.25, -0.5, 0]) cube([56.25, 72, 5.5], center = true, $fn = 30);
            translate([0, 15, 0]) rotate([0, 0, 45]) cube([20, 20, 5.5 + 1], center = true);
            translate([0, -18, 0]) rotate([0, 0, 45]) cube([20, 20, 5.5 + 1], center = true);
            translate([-15, -2, 0]) rotate([0, 0, 45]) cube([12, 12, 5.5 + 1], center = true);
            translate([15, -2, 0]) rotate([0, 0, 45]) cube([12, 12, 5.5 + 1], center = true);
        }
    }
    
}

module capacitor_resistor_mount () {
    resistor_mount([-5, 39, -33.25], [0, 0, 90]);
    translate([32, 18, -33.75]) difference () {
        cube([20, 70, 4], center = true);
        translate([3.75, -54, 0]) cube([20, 70, 4 + 1], center = true);
    }
    translate([28, 42, -33.75]) cube([20, 22, 4], center = true);
    translate([30, 14, -33.75 + 15]) difference () {
        cube([10, 30, 34], center = true);
        translate([-2, 5.5, 32 / 2]) cylinder(r = R(3), h = 10, center = true, $fn = 30);
    }
    relay_module_post([28,   19.5, -2]);
    
}

module debug () {
    //color([1.0, 0, 0, 0.5]) debug_case();

    relay_shelf([-2, 36, -3]);
    //color([0, 0, 1.0, 0.5]) debug_capacitor([34, -20, -16], [0, 0, 90]);
    //arduino_mount([-34, -51, -29]);
    //capacitor_resistor_mount();
}

PART = "cover";

if (PART == "cover") {
    cover();
} else {
    debug();
}


