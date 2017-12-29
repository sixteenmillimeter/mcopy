include <./common.scad>;

ROD_D = 25.4 * 0.75;
THREAD_D = 12;

ROD_SPACING = 150;
THREAD_SPACING = 60;

module carriage_rod () {
	cylinder(r = ROD_D / 2, h = 25.4 * 18, center = true, $fn = 120);
}

module carriage_threaded () {
	cylinder(r = THREAD_D / 2, h = 25.4 * 12, center = true, $fn = 120);
}

module carriage_nut () {
	rotate([0, 0, 360 / 6]) cylinder(r = 10.8, h = 12, center = true, $fn = 6);
	//color("red") cube([18.5, 18.5, 11], center = true);
}

module carriage_end () {
	difference () {
		union () {
			rotate([0, 90, 0]) rounded_cube([30, 185, 50], d = 20, center = true);
			translate([0, 0, -5]) cube([50, 185, 20], center = true);
		}
		//rods
		translate([0, ROD_SPACING / 2, 0]) rotate([0, 90, 0]) carriage_rod();
		translate([0, -ROD_SPACING / 2, 0]) rotate([0, 90, 0]) carriage_rod();
		//threaded rods
		translate([0, THREAD_SPACING / 2, 0]) rotate([0, 90, 0]) cylinder(r = (THREAD_D + 1) / 2, h = 25.4 * 12, center = true, $fn = 120);
		translate([0, -THREAD_SPACING / 2, 0]) rotate([0, 90, 0]) cylinder(r = (THREAD_D + 1) / 2, h = 25.4 * 12, center = true, $fn = 120);
	}
	//feet
	translate([10, (185 / 2) - (80 / 2), - 40]) {
		difference () {
			cube([70, 80, 60], center = true);
			translate([-67, 0, 0]) rotate([0, -10, 0]) color("red") cube([70, 80 + 1, 160], center = true);
			translate([55, 0, 0]) rotate([0, -8, 0]) color("red") cube([70, 80 + 1, 160], center = true);
			translate([0, -55, 0]) rotate([25, 0, 0]) color("red") cube([70, 80 + 1, 160], center = true);
		}
		translate([0, (185 / 2) - 40, -28]) {
			difference () {
				//rounded_cube([40, 30, 4], d = 10, center = true, $fn = 60);
				//cylinder(r = 5, h = 5, center = true, $fn = 60);
			}
		}
	}
	translate([10, -(185 / 2) + (80 / 2), - 40]) {
		difference () {
			cube([70, 80, 60], center = true);
			translate([-67, 0, 0]) rotate([0, -10, 0]) color("red") cube([70, 80 + 1, 160], center = true);
			translate([55, 0, 0]) rotate([0, -8, 0]) color("red") cube([70, 80 + 1, 160], center = true);
			translate([0, 55, 0]) rotate([-25, 0, 0]) color("red") cube([70, 80 + 1, 160], center = true);
		}
		translate([0, -(185 / 2) + 40, -28]) {
			difference () {
				//rounded_cube([40, 30, 4], d = 10, center = true, $fn = 60);
				//cylinder(r = 5, h = 5, center = true, $fn = 60);
			}
		}
	}
}

module carriage_sled () {}

module carriage_sled_b () {
	difference () {
		rotate([0, 90, 0]) rounded_cube([30, 185, 40], d = 20, center = true);
		//rod
		translate([0, ROD_SPACING / 2, 0]) rotate([0, 90, 0]) cylinder(r = (ROD_D + 1) / 2, h = 25.4 * 18, center = true, $fn = 120);
		translate([0, -ROD_SPACING / 2, 0]) rotate([0, 90, 0]) cylinder(r = (ROD_D + 1) / 2, h = 25.4 * 18, center = true, $fn = 120);
		//threading
		translate([0, THREAD_SPACING / 2, 0]) rotate([0, 90, 0]) cylinder(r = (THREAD_D + 1) / 2, h = 25.4 * 18, center = true, $fn = 120);
		translate([0, -THREAD_SPACING / 2, 0]) rotate([0, 90, 0]) cylinder(r = (THREAD_D + 1) / 2, h = 25.4 * 18, center = true, $fn = 120);
		//nuts
		translate([15, THREAD_SPACING / 2, 0]) rotate([0, 90, 0]) carriage_nut();
	translate([-15, THREAD_SPACING / 2, 0]) rotate([0, 90, 0]) carriage_nut();
	}

}

module carriage_handle () {
	translate([0, 0, ((25.4 / 2) / 2) + ((25.4 / 3) / 2)]) cylinder(r = 25, h = 25.4 / 3, center = true, $fn = 200);
	difference () {
		cylinder(r = 18 / 2, h = 25.4 / 2, center = true, $fn = 60);
		cylinder(r = 12 / 2, h = (25.4 / 2) + 1, center = true, $fn = 60);
	}
	translate([20, 0, 20 - 4]) cylinder(r2 = 4, r1 = 3, h = 8, center = true, $fn = 100);
	translate([20, 0, 20]) sphere(r = 4, center = true, $fn = 100);
}


module carriage_assembled () {
	color("blue") translate([0, ROD_SPACING / 2, 0]) rotate([0, 90, 0]) carriage_rod();
	color("blue") translate([0, -ROD_SPACING / 2, 0]) rotate([0, 90, 0]) carriage_rod();

	color("green") translate([3.5 * 25.4, THREAD_SPACING / 2, 0]) rotate([0, 90, 0]) carriage_threaded();
	color("green") translate([3.5 * 25.4, -THREAD_SPACING / 2, 0]) rotate([0, 90, 0]) carriage_threaded();

	translate([9 * 25.4 - 26, 0, 0 ]) carriage_end();
	//carriage_sled_b();
	translate([9 * 25.4 + 7, THREAD_SPACING / 2, 0 ]) rotate([0, 90, 0]) carriage_handle();
	translate([9 * 25.4 + 7, -THREAD_SPACING / 2, 0 ]) rotate([0, 90, 0]) carriage_handle();
}


carriage_assembled();


difference () {
	//carriage_sled_b();
	//translate([0, -85, 0]) cube([200, 200, 200], center = true);
	//translate([100, 0, 0]) cube([200, 200, 200], center = true);

	//translate([0, 145, 0]) cube([200, 200, 200], center = true);
}