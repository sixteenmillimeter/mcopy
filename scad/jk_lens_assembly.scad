//
// JK lens assembly
//
include <./common.scad>;
include <./bellows.scad>;
include <./knurledFinishLib_v2.scad>;

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

LinearMotionX = 22;
LinearMotionY = 20;
LinearMotionZ = 14;

module linearBearing (padD = 0, padH = 0) {
	difference () {
		cylinder(r = R(LinearBearingOuterDiameter + padD), h = LinearBearingHeight + padH, center = true, $fn = 100);
		cylinder(r = R(LinearBearingBoreDiameter), h = LinearBearingHeight + padH + 1, center = true, $fn = 60);
	}
}

module threadedRod (H = 40, pad = 0) {
	color("green") cylinder(r = R(ThreadDiameter + pad), h = H, center = true, $fn = 60);
}

module linearMotionRod (H = 40, pad = 0) {
	color("blue") cylinder(r = R(LinearMotionDiameter + pad), h = H, center = true, $fn = 60);
}

module TNut (padD = 0, padH = 0) {
	color("red") difference () {
		union () {
			translate([0, 0, -(TNutHeight2 / 2) + (TNutHeight1 / 2) + TNutOffset]) cylinder(r = R(TNutDiameter1 + padD), h = TNutHeight1, center = true, $fn = 100);
			cylinder(r = R(TNutDiameter2), h = TNutHeight2 + padH, center = true, $fn = 80);
		}
		cylinder(r = R(TNutInnerDiameter), h = TNutHeight2 + 1, center = true, $fn = 60);
	}
}

module m3Bolt (bolt = 20) {
    cylinder(r = 3.1 / 2, h = bolt, center = true, $fn = 40);
}

module m3BoltNut (bolt = 20, nut = 3.5) {
    m3Bolt(bolt);

    translate([0, 0, nut]) color("red") {
        cylinder(r = 8 / 2, h = 2.5, center = true, $fn = 6);
        translate([-4, 0, 0]) cube([8, 6.9, 2.5], center = true);
    }
}

module lensAssemblyBellowsBoard () {
	//bottom
	difference () {
        union () {
            rotate([0, 0, 90]) bellows_camera_board();
            translate([0, -XOffset, FrontOffset]) rotate([0, 90, 0]) cylinder(r = R(22), h = XWidth, center = true, $fn = 80);
        }
		rotate([-90, 0, 0]) {
			translate([-(XWidth/2) + 2.5, -FrontOffset, -XOffset]) rotate([0, 90, 0]) TNut(0.3, 0.3);
            //m3s
            //   -centered
            translate([-(XWidth/2) + 2.5 + 5, -FrontOffset - 8, -XOffset]) rotate([0, -90, 0])  rotate([0, 0, 90]) m3BoltNut();
            //   -top no nut
            translate([-(XWidth/2) + 2.5 + 5, -FrontOffset, -XOffset + 8]) rotate([0, -90, 0]) m3Bolt();
            //   -bottom no nut
            translate([-(XWidth/2) + 2.5 + 5, -FrontOffset, -XOffset - 8]) rotate([0, -90, 0])  m3Bolt();
			translate([(XWidth/2) - 2.5, -FrontOffset, -XOffset]) rotate([0, -90, 0]) TNut(0.3, 0.3);
            //m3s
            //    -center
            translate([(XWidth/2) - 2.5 - 5, -FrontOffset - 8, -XOffset]) rotate([0, 90, 0]) rotate([0, 0, 90]) m3BoltNut();
            //    -top no nut
            translate([(XWidth/2) - 2.5 - 5, -FrontOffset, -XOffset + 8]) rotate([0, 90, 0]) m3Bolt();
            //    -bottom no nut
            translate([(XWidth/2) - 2.5 - 5, -FrontOffset, -XOffset - 8]) rotate([0, 90, 0]) m3Bolt();
		}
		rotate([-90, 0, 0]) translate([0, -FrontOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(RodLength, 0.5);
       translate([0, -XOffset, -10.5]) cube([100,30, 15], center = true); 
	}

	//top
	difference () {
		translate([0, XOffset, FrontOffset]) rotate([0, 90, 0]) cylinder(r = R(25), h = 24, center = true, $fn = 80);
		rotate([-90, 0, 0]) {
			translate([0, -FrontOffset, XOffset]) rotate([0, 90, 0]) linearBearing(0.25);
		}
        translate([0, XOffset, -10.5]) cube([24 + 1,30, 15], center = true);
		rotate([-90, 0, 0]) translate([0, -FrontOffset, XOffset]) rotate([0, 90, 0]) linearMotionRod(RodLength);	
	}
}

module lensAssemblyThreadedZ () {
	Z = 90;
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
		threadedRod(Z + 20, 0.5);
		//board nut void
		translate([0, -10, 0]) rotate([0, 90, 0]) cylinder(r = R(12), h = 30, center = true, $fn = 40);
		//board void
		translate([8, -BackOffset, 0]) cube([8, 7, 52], center = true);
		//T nuts
        //top
		translate([0, 0, (Z / 2) - 4]) rotate([180, 0, 0]) TNut(0.3, 0.3);
        //bottom
		translate([0, 0, -(Z / 2) + 4]) TNut(0.3, 0.3);
		
        //----
        //T nut M3 bolts
        //top
        translate([0, 0, (Z / 2) - 4]) {
            translate([-8, 0, 0]) rotate([180, 0, 0]) m3BoltNut();
            translate([8, 0, 0]) rotate([0, 0, 180]) rotate([180, 0, 0]) m3BoltNut();
            translate([0, 8, 0]) rotate([0, 0, -90]) rotate([180, 0, 0]) m3BoltNut();
        }
        //bottom
        translate([0, 0, -(Z / 2) + 4]) {
            translate([-8, 0, 0]) m3BoltNut();
            translate([8, 0, 0]) rotate([0, 0, 180]) m3BoltNut();
            translate([0, 8, 0]) rotate([0, 0, -90]) m3BoltNut();
        }

		//------
		//top linear motion rod voids
		//top gap to close
		translate([0, -(LinearMotionY/2) - 8, (Z/2) - (LinearMotionZ/2)]) cube([LinearMotionX + 1, LinearMotionY, 2], center = true);
		//rod
		translate([0, -(LinearMotionY/2), (Z/2) - (LinearMotionZ/2)]) rotate([0, 90, 0]) cylinder(r = R(LinearMotionDiameter)+.2, h = LinearMotionX + 1, center = true, $fn = 60);
		//m4 bolt top
		translate([0, -(LinearMotionY/2) - 8 + 1, (Z/2) - (LinearMotionZ/2)]) cylinder(r = R(4.25), h = LinearMotionZ + 1, center = true, $fn = 40);
		//m4 nut top
		translate([0, -(LinearMotionY/2) - 8 + 1, (Z/2) - (LinearMotionZ/2) - 6]) m4_nut();
		//------
		//bottom threaded rod void
		translate([0, -BackOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(22 + 1, 0.5);
		//flatten bottom
		translate([0, -BackOffset, -(Z / 2) - 11]) cube([23, 22, 22], center = true);
	}
}

module lensAssemblyLinearZ () {
	Z = 90;
	ZLinearBearing = 31;
    
	difference () {
		union () {
			//main cylinder
			rounded_cube([22, 22, Z], d = 8, $fn = 30, center = true);
			//top
			translate([0, -BackOffset, (Z / 2) - (LinearMotionZ/2)]) cube([LinearMotionX, LinearMotionY, LinearMotionZ], center = true);
			//bottom
			translate([0, -BackOffset, -XOffset]) rotate([0, 90, 0]) cylinder(r = R(22), h = 22, center = true, $fn = 80);
		}
		//x linear motion rod void
		translate([9, -BackOffset, (Z / 2) - (LinearMotionZ/2)]) rotate([0, 90, 0]) linearMotionRod(50, 0.3);
		//board void
		translate([-8, -BackOffset, -5]) cube([8, 7, 52], center = true);
		//z threaded rod
        linearMotionRod(250, 0.3);
        //top gap to close
		translate([0, -(LinearMotionY/2) - 8, (Z/2) - (LinearMotionZ/2)]) cube([LinearMotionX + 1, LinearMotionY, 2], center = true);
        //m4 bolt top
		translate([0, -(LinearMotionY/2) - 8 + 1, (Z/2) - (LinearMotionZ/2)]) cylinder(r = R(4.25), h = LinearMotionZ + 1, center = true, $fn = 40);
		//m4 nut top
		translate([0, -(LinearMotionY/2) - 8 + 1, (Z/2) - (LinearMotionZ/2) - 6]) m4_nut();
		//flatten bottom
		translate([0, -BackOffset, -(Z / 2) - 11]) cube([23, 22, 22], center = true);
		//z linear bearing
		translate([0, 0, -(Z / 2) + ZLinearBearing]) {
            linearBearing(0.25, 0.3);
            translate([LinearBearingOuterDiameter / 2, 0, 0]) cube([LinearBearingOuterDiameter, LinearBearingOuterDiameter + 0.25, LinearBearingHeight + 0.3], center = true);
        }
        
        //z linear bearing
		translate([0, 0, -(Z / 2) + ZLinearBearing + 32]) {
            linearBearing(0.25, 0.3);
            translate([LinearBearingOuterDiameter / 2, 0, 0]) cube([LinearBearingOuterDiameter, LinearBearingOuterDiameter + 0.25, LinearBearingHeight + 0.3], center = true);
        }
		//x threaded rod
		translate([0, -BackOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(50, 0.5);
	}
}

module lensAssemblyThreadedCollar (H = 8) {
    difference () {
        union () {
            cylinder(r = R(26), h = H, center = true, $fn = 80);
        }
        threadedRod(H*2, 0.1);
        translate([8.5, 0, 0]) rotate([0, 90, 0]) m3BoltNut(10, -1);
    }
}

module lensAssemblyThreadedKnob () {
    H = 8;
    D1 = 38.7;
    difference () {
        union () {
            translate([0, 0, -H/2]) knurled_cyl(H, D1, 2, 2, .3, 0, 0);
            translate([0, 0, H]) lensAssemblyThreadedCollar(H);
        }
        translate([0, 0, H]) threadedRod(H*2, 0.1);
    }
}

module debug () {
    rotate([90, 0, 0]) lensAssemblyBellowsBoard();

    translate([-ZOffset, BackOffset, 0]) lensAssemblyThreadedZ();
    translate([ZOffset, BackOffset, 5]) lensAssemblyLinearZ();

    //Z axis
    //translate([-ZOffset, BackOffset, 0])  threadedRod(RodLength);
    //translate([ZOffset, BackOffset, 0]) linearMotionRod(RodLength);

    //translate([40, 8, 0]) linearBearing();
    //translate([-40, 8, 25]) rotate([180, 0, 0]) TNut();
    //translate([-40, 8, -25]) TNut();

    //translate([ZOffset, 5, 15]) color("blue") m4_nut();
    //translate([ZOffset, 5, -15]) color("blue") m4_nut();

    //X axis
    //translate([0, -FrontOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(RodLength);
    //translate([0, -FrontOffset, XOffset]) rotate([0, 90, 0])  linearMotionRod(RodLength);

    //translate([0, -8, 40]) rotate([0, 90, 0]) linearBearing();
    //translate([-25, -8, -XOffset]) rotate([0, 90, 0]) TNut();
    //translate([25, -8, -XOffset]) rotate([0, -90, 0]) TNut();

    //translate([-15, -5, XOffset]) rotate([0, 90, 0]) color("blue") m4_nut();
    //translate([15, -5, XOffset]) rotate([0, 90, 0]) color("blue") m4_nut();
}

PART = "lens_assembly_threaded_z";

if (PART == "lens_assembly_bellows_board") {
    lensAssemblyBellowsBoard();
} else if (PART == "lens_assembly_threaded_z") {
    lensAssemblyThreadedZ();
} else if (PART == "lens_assembly_linear_z") {
    lensAssemblyLinearZ();
} else if (PART == "lens_assembly_threaded_knob") {
    lensAssemblyThreadedKnob();
} else if (PART == "lens_assembly_threaded_collar") {
    lensAssemblyThreadedCollar(6);
} else {
    debug();
}
