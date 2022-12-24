//
// JK lens assembly
//
include <./common.scad>;
include <./bellows.scad>;

PART = "";

LinearBearingOuterDiameter = 15;
LinearBearingHeight = 24;
LinearBearingBoreDiameter = 8;

ThreadDiameter = 8;
LinearMotionDiameter = 8;

TNutDiameter1 = 22;
TNutDiameter2 = 10.2;
TNutInnerDiameter = 8;
TNutHeight1 = 3.5;
TNutHeight2 = 15;
TNutOffset = 1.5;

RodLength = 150;

ZOffset = 50;
XOffset = 38;
XWidth = 50;
FrontOffset = 0;
BackOffset = 10;

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
	color("red") difference () {
		union () {
			translate([0, 0, -(TNutHeight2 / 2) + (TNutHeight1 / 2) + TNutOffset]) cylinder(r = R(TNutDiameter1), h = TNutHeight1, center = true, $fn = 100);
			cylinder(r = R(TNutDiameter2), h = TNutHeight2, center = true, $fn = 80);
		}
		cylinder(r = R(TNutInnerDiameter), h = TNutHeight2 + 1, center = true, $fn = 60);
	}
}

module lensAssemblyBellowsBoard () {
	rotate([0, 0, 90]) bellows_camera_board();
	//bottom
	difference () {
		translate([0, -XOffset, FrontOffset]) rotate([0, 90, 0]) cylinder(r = R(22), h = XWidth, center = true, $fn = 80);
		rotate([-90, 0, 0]) {
			translate([-(XWidth/2) + 2.5, -FrontOffset, -XOffset]) rotate([0, 90, 0]) TNut();
			translate([(XWidth/2) - 2.5, -FrontOffset, -XOffset]) rotate([0, -90, 0]) TNut();
		}
		rotate([-90, 0, 0]) translate([0, -FrontOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(RodLength);	
	}
	//top
	difference () {
		translate([0, XOffset, FrontOffset]) rotate([0, 90, 0]) cylinder(r = R(22), h = 24, center = true, $fn = 80);
		rotate([-90, 0, 0]) {
			translate([0, -FrontOffset, XOffset]) rotate([0, 90, 0]) linearBearing();
		}
		translate([0, XOffset + 10, 0]) cube([24 + 1, 10, 3], center = true);
		rotate([-90, 0, 0]) translate([0, -FrontOffset, XOffset]) rotate([0, 90, 0]) linearMotionRod(RodLength);	
	}
}

module lensAssemblyThreadedZ () {
	Z = 90;
	LinearMotionX = 22;
	LinearMotionY = 20;
	LinearMotionZ = 14;
	difference () {
		union () {
			//main cylinder
			rounded_cube([22, 22, Z], d = 8, $fn = 30, center = true);
			//top linear motion rod attachment block
			translate([0, -(LinearMotionY/2), (Z/2) - (LinearMotionZ/2)]) cube([LinearMotionX, LinearMotionY, LinearMotionZ], center = true);
			//bottom threaded rod block
			translate([0, -BackOffset, -XOffset]) rotate([0, 90, 0]) cylinder(r = R(22), h = 22, center = true, $fn = 80);
		}
		//------
		//threaded rod void
		threadedRod(Z + 20);
		//board nut void
		translate([0, -10, 0]) rotate([0, 90, 0]) cylinder(r = R(12), h = 30, center = true, $fn = 40);
		//board void
		translate([8, -BackOffset, 0]) cube([8, 7, 52], center = true);
		//T nuts
		translate([0, 0, (Z / 2) - 4]) rotate([180, 0, 0]) TNut();
		translate([0, 0, -(Z / 2) + 4]) TNut();
		translate([0, 0, -(Z / 2) - 10]) cylinder(r = R(22), h = 20, center = true, $fn = 80);

		//------
		//top linear motion rod voids
		//
		translate([0, -(LinearMotionY/2) - 8, (Z/2) - (LinearMotionZ/2)]) cube([LinearMotionX + 1, LinearMotionY, 2], center = true);
		//
		translate([0, -(LinearMotionY/2), (Z/2) - (LinearMotionZ/2)]) rotate([0, 90, 0]) cylinder(r = R(LinearMotionDiameter)+.2, h = LinearMotionX + 1, center = true, $fn = 60);
		//m4 bolt
		translate([0, -(LinearMotionY/2) - 8 + 1, (Z/2) - (LinearMotionZ/2)]) cylinder(r = R(4.25), h = LinearMotionZ + 1, center = true, $fn = 40);
		//m4 nut
		translate([0, -(LinearMotionY/2) - 8 + 1, (Z/2) - (LinearMotionZ/2) - 6]) m4_nut();
		//------
		//bottom threaded rod void
		translate([0, -BackOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(22 + 1);
		//flatten bottom
		translate([0, -BackOffset, -(Z / 2) - 11]) cube([23, 22, 22], center = true);
	}
}

module lensAssemblyLinearZ () {
	Z = 90 + 15 + 8;
	XCorrection = 23.75;
	ZLinearBearing = 36.5;
	difference () {
		union () {
			//main cylinder
			translate([0, 0, 4]) rounded_cube([22, 22, Z], d = 8, $fn = 30, center = true);
			//
			translate([9, -BackOffset, (Z / 2) - XCorrection]) rotate([0, 90, 0]) cylinder(r = R(22), h = 40, center = true, $fn = 80);
			//
			translate([0, -BackOffset, -(Z / 2) + 13.5]) rotate([0, 90, 0]) cylinder(r = R(22), h = 22, center = true, $fn = 80);
		}
		//x linear motion rod void
		translate([9, -BackOffset, (Z / 2) - XCorrection]) rotate([0, 90, 0]) linearMotionRod(50);
		//board void
		translate([-8, -BackOffset, -5]) cube([8, 7, 52], center = true);
		//x linear bearing
		translate([18, -BackOffset, (Z / 2) - XCorrection]) rotate([0, 90, 0]) linearBearing();
		//
		translate([0, 0, (Z / 2) - 5]) linearBearing();
		//flatten bottom
		translate([0, -BackOffset, -(Z / 2) - 7]) cube([23, 22, 22], center = true);
		//x linear bearing
		translate([0, 0, -(Z / 2) + ZLinearBearing]) linearBearing();
		translate([LinearBearingOuterDiameter / 2, 0, -(Z / 2) + ZLinearBearing]) cube([LinearBearingOuterDiameter, LinearBearingOuterDiameter, LinearBearingHeight], center = true);
		//x threaded rod
		translate([0, -BackOffset, -(Z / 2) + 13.5]) rotate([0, 90, 0]) threadedRod(50);
	}

}

rotate([90, 0, 0]) lensAssemblyBellowsBoard();

translate([-ZOffset, BackOffset, 0]) lensAssemblyThreadedZ();
translate([ZOffset, BackOffset, 5]) lensAssemblyLinearZ();

//Z axis
//translate([-ZOffset, BackOffset, 0])  threadedRod(RodLength);
translate([ZOffset, BackOffset, 0]) linearMotionRod(RodLength);

//translate([40, 8, 0]) linearBearing();
//translate([-40, 8, 25]) rotate([180, 0, 0]) TNut();
//translate([-40, 8, -25]) TNut();

//translate([ZOffset, 5, 15]) color("blue") m4_nut();
//translate([ZOffset, 5, -15]) color("blue") m4_nut();

//X axis
//translate([0, -FrontOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(RodLength);
translate([0, -FrontOffset, XOffset]) rotate([0, 90, 0])  linearMotionRod(RodLength);

//translate([0, -8, 40]) rotate([0, 90, 0]) linearBearing();
//translate([-25, -8, -XOffset]) rotate([0, 90, 0]) TNut();
//translate([25, -8, -XOffset]) rotate([0, -90, 0]) TNut();

//translate([-15, -5, XOffset]) rotate([0, 90, 0]) color("blue") m4_nut();
//translate([15, -5, XOffset]) rotate([0, 90, 0]) color("blue") m4_nut();
