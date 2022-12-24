//
// JK lens assembly
//
include <./common.scad>;
include <./bellows.scad>;

PART = "";

LinearBearingOuterDiameter = 15;
LinearBearingHeight = 24;
LinearBearingBoreDiameter = 8;

ThreadDiameter = 4; //8;
LinearMotionDiameter = 8;

TNutDiameter1 = 22;
TNutDiameter2 = 10.2;
TNutInnerDiameter = 8;
TNutHeight1 = 3.5;
TNutHeight2 = 15;
TNutOffset = 1.5;

RodLength = 100;

ZOffset = -35;
XOffset = -35;

module linearBearing () {
	difference () {
		cylinder(r = R(LinearBearingOuterDiameter), h = LinearBearingHeight, center = true, $fn = 100);
		cylinder(r = R(LinearBearingBoreDiameter), h = LinearBearingHeight + 1, center = true, $fn = 60);
	}
}

module threadedRod (H = 40) {
	color("green") cylinder(r = R(ThreadDiameter), h = H, center = true, $fn = 60);
}

module linearMotionRod (H = 40) {
	color("blue") cylinder(r = R(LinearMotionDiameter), h = H, center = true, $fn = 60);
}

module TNut () {
	difference () {
		union () {
			translate([0, 0, -(TNutHeight2 / 2) + (TNutHeight1 / 2) + TNutOffset]) cylinder(r = R(TNutDiameter1), h = TNutHeight1, center = true, $fn = 100);
			cylinder(r = R(TNutDiameter2), h = TNutHeight2, center = true, $fn = 80);
		}
		cylinder(r = R(TNutInnerDiameter), h = TNutHeight2 + 1, center = true, $fn = 60);
	}
}

module lens_assembly_bellows_board () {
	bellows_camera_board();
	difference () {
		translate([0, -32.5, 2]) cube([30, 15, 15], center = true);
		rotate([-90, 0, 0]) {
			translate([-13, -5, XOffset]) rotate([0, 90, 0]) m4_nut();
			translate([13, -5, XOffset]) rotate([0, 90, 0]) m4_nut();
		}
		rotate([-90, 0, 0]) translate([0, -5, XOffset]) rotate([0, 90, 0]) threadedRod(RodLength);	
	}
}

rotate([90, 0, 0]) lens_assembly_bellows_board();


//Z axis
translate([ZOffset, 5, 0])  threadedRod(RodLength);
//translate([40, 8, 0]) linearMotionRod(RodLength);

//translate([40, 8, 0]) linearBearing();
//translate([-40, 8, 25]) rotate([180, 0, 0]) TNut();
//translate([-40, 8, -25]) TNut();

translate([ZOffset, 5, 15]) m4_nut();
translate([ZOffset, 5, -15]) m4_nut();

//X axis
//translate([0, -5, XOffset]) rotate([0, 90, 0]) threadedRod(RodLength);
//translate([0, -8, 40]) rotate([0, 90, 0])  linearMotionRod(RodLength);

//translate([0, -8, 40]) rotate([0, 90, 0]) linearBearing();
//translate([-25, -8, -40]) rotate([0, 90, 0]) TNut();
//translate([25, -8, -40]) rotate([0, -90, 0]) TNut();

//translate([-15, -5, XOffset]) rotate([0, 90, 0]) m4_nut();
//translate([15, -5, XOffset]) rotate([0, 90, 0]) m4_nut();
