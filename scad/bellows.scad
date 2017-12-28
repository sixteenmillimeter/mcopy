module cmount_male(len = 4) {
	inner_d = 23;
	outer_d = 24.7;
	f_inner_d = 25.4;
	f_outer_d = 28.6;
	translate ([0, 0, len / 2 ]) {
		difference () {
			union () {
				cylinder(r = outer_d / 2, h = len, center = true);
			}
			cylinder(r = inner_d / 2, h = len + 1, center = true);
		}

		difference () {
			translate([0, 0, -(len / 2) - 1]) cylinder(r = f_outer_d / 2, h = 2, center = true);
			translate([0, 0, -(len / 2) - 1]) cylinder(r1 = f_inner_d / 2, r2 = inner_d / 2, h = 3, center = true);
		}	
	}
}

module bellows_camera_board () {
    H = 6;
    difference () {
        cube([60, 60, H], center = true);
        //center
        cylinder(r = 38 / 2, h = H + 1, center = true, $fn = 360);
        //center bevels
        translate([0, 0, 2.25]) cylinder(r1 = 36 / 2, r2 = 40 / 2, h = 1.5, center = true, $fn = 360);
        translate([0, 0, -2.25]) cylinder(r1 = 40 / 2, r2 = 36 / 2, h = 1.5, center = true, $fn = 360);
        //corners
        for (i = [0 : 3]) {
            rotate([0, 0, i * (360 / 4) + 45 ]) translate([43.5, 0, 0]) cube([11, 11, H + 1], center = true);
        }
        //bolt
        translate([0, 30, 0]) rotate([90, 0, 0]) cylinder(r = 2.2, h = 30, center = true, $fn = 30);
    }
}

module camera_mount () {
    $fn = 360;
    cmount_male(5);
    translate([0, 0, -4]) {
        difference() {
            cylinder(r = 42 / 2, h = 4, center = true);
            cylinder(r = 26 / 2, h = 4 + 1, center = true);
        }
    }
    translate([0, 0, -4 - 5]) {
        difference() {
            cylinder(r = 37.9 / 2, h = 7, center = true);
            cylinder(r = 30 / 2, h = 7 + 1, center = true);
        }
    }
}

bellows_camera_board();
//translate([0, 0, 9]) color("red") camera_mount();