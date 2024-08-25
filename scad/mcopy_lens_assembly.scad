//
// JK lens assembly
//
include <./common/common.scad>;
include <./bellows.scad>;
include <./knurledFinishLib_v2.scad>;
use <2020_profile.scad>;
use <./mcopy_rails.scad>;


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

ZOffset = 120;
XOffset = 38;
XWidth = 50;
FrontOffset = 0;
BackOffset = 15;

LinearMotionX = 22;
LinearMotionY = 20;
LinearMotionZ = 14;

XPosition = 0;
ZPosition = 0;

RailSpacingX = 60;
RailEndX = RailSpacingX + 72;
LensFrameSpacingX = (RailEndX / 2) - (40 / 2);

JKBoltSpacing = 78.5;

echo(LensFrameSpacingX, "mm");

module rail_debug (H = 175) {
    color("lime") linear_extrude(height=H) {
        2020_profile();
    }
}

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

module m4Bolt (bolt = 10) {
	cylinder(r = R(4.25), h = bolt, center = true, $fn = 40);
}

module m3BoltNut (bolt = 20, nut = 3.5) {
    m3Bolt(bolt);

    translate([0, 0, nut]) color("red") {
        cylinder(r = 8 / 2, h = 2.5, center = true, $fn = 6);
        translate([-4, 0, 0]) cube([8, 6.9, 2.5], center = true);
    }
}

module m4BoltNut (bolt = 10, nut = 3.5) {
    m4Bolt(bolt);

    translate([0, 0, nut]) color("red") {
        m4_nut();
        translate([-10, 0, 0]) cube([20, 6.9, 3.5], center = true);
    }
}

module lensAssembyBellowBoardLinearBearingMount (X = 0) {
	difference () {
		translate([X, XOffset, FrontOffset]) rotate([0, 90, 0]) cylinder(r = R(25), h = 24, center = true, $fn = 80);
		rotate([-90, 0, 0]) {
			translate([X, -FrontOffset, XOffset]) rotate([0, 90, 0]) linearBearing(0.25);
		}
        translate([X, XOffset, -10.5]) cube([24 + 1,30, 15], center = true);
		rotate([-90, 0, 0]) translate([X, -FrontOffset, XOffset]) rotate([0, 90, 0]) linearMotionRod(RodLength);	
	}
}

module lensAssemblyBellowsBoard (magnets = false) {
	//bottom
	difference () {
        union () {
            rotate([0, 0, 90]) bellows_camera_board(magnets = magnets);
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
	lensAssembyBellowBoardLinearBearingMount(12);
	lensAssembyBellowBoardLinearBearingMount(-12);
}

module topLinearAttachmentBlock () {
    cube([LinearMotionX, LinearMotionY + 2, LinearMotionZ], center = true);
}

module lensAssemblyThreadedZ () {
	Z = 90;
	difference () {
		union () {
			//main cylinder
			rounded_cube([22, 22, Z], d = 8, $fn = 30, center = true);
			//top linear motion rod attachment block
			translate([0, -BackOffset, (Z/2) - (LinearMotionZ/2)]) topLinearAttachmentBlock();
			//bottom threaded rod block
			translate([0, -BackOffset, -XOffset]) rotate([0, 90, 0]) cylinder(r = R(22), h = 22, center = true, $fn = 80);
		}
		//------
		//threaded rod void
		threadedRod(Z + 20, 0.5);
		//board nut void
		translate([0, -10, 0]) rotate([0, 90, 0]) cylinder(r = R(12), h = 30, center = true, $fn = 40);
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
		translate([0, -(LinearMotionY/2) - 9, (Z/2) - (LinearMotionZ/2)]) cube([LinearMotionX + 1, LinearMotionY, 2], center = true);
		//rod
		translate([0, -BackOffset, (Z/2) - (LinearMotionZ/2)]) rotate([0, 90, 0]) cylinder(r = R(LinearMotionDiameter)+.2, h = LinearMotionX + 1, center = true, $fn = 60);
		//m4 bolt top
		translate([0, -BackOffset - 8 + 2, (Z/2) - (LinearMotionZ/2)]) m4Bolt(LinearMotionZ + 1);
		//m4 nut top
		translate([0, -BackOffset - 8 + 2, (Z/2) - (LinearMotionZ/2) - 6]) m4_nut();
		//------
		//bottom threaded rod void
		translate([0, -BackOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(22 + 1, 0.5);
		//flatten bottom
		translate([0, -BackOffset, -(Z / 2) - 11]) cube([23, 22, 22], center = true);
	}
}

module lensAssemblyLinearZ () {
	Z = 90;
    
	difference () {
		union () {
			//main cylinder
			rounded_cube([22, 22, Z], d = 8, $fn = 30, center = true);
			//top
			translate([0, -BackOffset, (Z / 2) - (LinearMotionZ/2)]) topLinearAttachmentBlock();
			//bottom
			translate([0, -BackOffset, -XOffset]) rotate([0, 90, 0]) cylinder(r = R(22), h = 22, center = true, $fn = 80);
		}
		//x linear motion rod void
		translate([9, -BackOffset, (Z / 2) - (LinearMotionZ/2)]) rotate([0, 90, 0]) linearMotionRod(50, 0.3);
		//z linear motion rod
        linearMotionRod(250, 0.6);
        //top gap to close
		translate([0, -(LinearMotionY/2) - 9, (Z/2) - (LinearMotionZ/2)]) cube([LinearMotionX + 1, LinearMotionY, 2], center = true);
        //m4 bolt top
		translate([0, -BackOffset - 8 + 2, (Z/2) - (LinearMotionZ/2)]) m4Bolt(LinearMotionZ + 1);
		//m4 nut top
		translate([0, -BackOffset - 8 + 2, (Z/2) - (LinearMotionZ/2) - 6]) m4_nut();
		//flatten bottom
		translate([0, -BackOffset, -(Z / 2) - 11]) cube([23, 22, 22], center = true);
		//z linear bearing
		translate([0, 0, -(Z / 2) + (LinearBearingHeight / 2) - 2 ]) {
            linearBearing(0.25, 0.3);
        }
        
        //z linear bearing
		translate([0, 0, (Z / 2) - (LinearBearingHeight / 2) + 2]) {
            linearBearing(0.25, 0.3);
        }
		//x threaded rod
		translate([0, -BackOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(50, 0.5);
	}
}

module m5_nut_bolt () {
    cylinder(r = R(4.95), h = 30, center = true, $fn = 30);
    translate([0, 0, 20/2]) rotate([0, 0, 30]) m5_nut();
}

module lensAssemblyBaseZ () {
    H = 22 + 12 + 12;
    TOP_X = 74;
    BOTTOM_X = 88;
    Z_OFFSET = (12/2)+(22/2);
    RAILS = 160;
    RAIL_D = 30; //with clearance
    BOTTOM_CORNER_ADJUST_X = 4;
	translate([0, 0, Z_OFFSET]) difference () {
		translate([0, 6, -(24 / 2)]) cube([150, 45 + 12, H], center = true);
		translate([ZOffset/2, 0, 5]) linearMotionRod(22 + 1, 0.2);
        translate([-ZOffset/2, 0, 0]) threadedRod(50, 0.5);
        translate([ZOffset/2+10, 0, 3]) rotate([0, 90, 0]) m4BoltNut(20, -1);
        //shelf void
        translate([0, 12, -17]) cube([160 + 1, 45 + 0.1, 12], center = true);
        //top corner voids
        translate([(150 / 2) + (TOP_X / 2), 6 + (45 + 12) - 20, -(24 / 2) + 12]) cube([150, 45 + 12, H], center = true);
        translate([-(150 / 2) - (TOP_X / 2), 6 + (45 + 12) - 20, -(24 / 2) + 12]) cube([150, 45 + 12, H], center = true);
        //bottom corner voids
        translate([(150 / 2) + (BOTTOM_X / 2), 6, -(24 / 2) - 22 - 12]) cube([150, 45 + 12 + 1, H], center = true);
        translate([-(150 / 2) - (BOTTOM_X / 2), 6, -(24 / 2) - 22 - 12]) cube([150, 45 + 12 + 1, H], center = true);
        //additional corner off right side
        translate([-(150 / 2) - (BOTTOM_X / 2) + BOTTOM_CORNER_ADJUST_X, 6, -(24 / 2) - 22 - 12]) cube([150, 45 + 12 + 1, H], center = true);
        
        //bottom bolts
        translate([25, 25, -18 - Z_OFFSET]) m5_nut_bolt();
        translate([-25, 25, -18 - Z_OFFSET]) m5_nut_bolt();
        translate([25, -5, -18 - Z_OFFSET]) m5_nut_bolt();
        translate([-25, -5, -18 - Z_OFFSET]) m5_nut_bolt();
        
        //top bolts
        translate([25, 25, 17.5 - Z_OFFSET]) {
            rotate([180, 0, 0]) m5_nut_bolt();
            translate([0, 0, 10]) rotate([0, 0, 30]) cylinder(r = R(20), h = 20, center = true, $fn = 6);
        }
        translate([-25, 25, 17.5 - Z_OFFSET]) {
            rotate([180, 0, 0]) m5_nut_bolt();
            translate([0, 0, 10]) rotate([0, 0, 30]) cylinder(r = R(20), h = 20, center = true, $fn = 6);
        }
        translate([25, -5, 17.5 - Z_OFFSET]) {
            rotate([180, 0, 0]) m5_nut_bolt();
            translate([0, 0, 10]) rotate([0, 0, 30]) cylinder(r = R(20), h = 20, center = true, $fn = 6);
        }
        translate([-25, -5, 17.5 - Z_OFFSET]) {
            rotate([180, 0, 0]) m5_nut_bolt();
            translate([0, 0, 10]) rotate([0, 0, 30]) cylinder(r = R(20), h = 20, center = true, $fn = 6);
        }
        
        //rails void
            translate([RAILS / 2, 0, -Z_OFFSET -6.5-5.75]) rotate([90, 0, 0]) cylinder(r = R(RAIL_D), h = 100, center = true, $fn = 80);
            translate([-RAILS / 2, 0, -Z_OFFSET -6.5-5.75]) rotate([90, 0, 0]) cylinder(r = R(RAIL_D), h = 100, center = true, $fn = 80);
	}
    
    //debug

    //translate([0, 12, 0]) color("green") cube([160, 45, 12], center = true);
    //translate([RAILS / 2, 0, -6.5-5.75]) rotate([90, 0, 0]) cylinder(r = R(RAIL_D), h = 100, center = true, $fn = 80);
    //translate([-RAILS / 2, 0, -6.5-5.75]) rotate([90, 0, 0]) cylinder(r = R(RAIL_D), h = 100, center = true, $fn = 80);
}

module lensAssemblyTopZ () {
	difference () {
		rounded_cube([150, 22, 15], d = 8, $fn = 30, center = true);
		translate([ZOffset/2, 0, 0]) linearMotionRod(22 + 1, 0.2);
        translate([-ZOffset/2, 0, 0]) threadedRod(50, 0.5);
        translate([ZOffset/2+10, 0, 0]) rotate([0, 90, 0]) m4BoltNut(20, -1);
	}
}

module lensAssemblyThreadedCollar (H = 8, pad = 0) {
    difference () {
        union () {
            cylinder(r = R(26), h = H, center = true, $fn = 80);
        }
        threadedRod(H*2, 0.1 + pad);
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

module jkLensDebug () {
    PostsSpacingX = 130;

    BoltSpacingX = 78.5;
    BoltD = 4.25;

    difference () {
        translate([-45, 0, 0]) cube([22.9, 20.2, 8], center = true);
        translate([-BoltSpacingX / 2, 0, 0]) cylinder( r = BoltD / 2, h = 20, center = true, $fn = 30);
    }

    difference () {
        translate([53, 0, 0]) union () {
            cube([41.25, 20.2, 8], center = true);
            translate([(41.25 / 2) - (8 / 2), 0, 12]) cube([8, 20.2, 18], center = true);
        }
        translate([BoltSpacingX / 2, 0, 0]) cylinder( r = BoltD / 2, h = 20, center = true, $fn = 30);
    }

    translate([-14, 0, 0]) { 
        translate([PostsSpacingX / 2, 0, 20]) cube([20.2, 20.2, 20], center = true);
        translate([-PostsSpacingX / 2, 0, 20]) cube([20.2, 20.2, 20], center = true);
    }
}

module debug () {
    XSpacing = 130;
	translate([0, 0, ZPosition]) {
	    translate([-XSpacing/2, BackOffset, 0]) lensAssemblyThreadedZ();
	    translate([XSpacing/2, BackOffset, 0]) lensAssemblyLinearZ();

	    translate([XSpacing/2, BackOffset, (90 / 2) - (LinearBearingHeight / 2) + 2]) color("green") linearBearing();
	    translate([XSpacing/2, BackOffset, -(90 / 2) + (LinearBearingHeight / 2) - 2]) color("green") linearBearing();

	    translate([-XSpacing/2, BackOffset, 40]) rotate([180, 0, 0]) TNut();
	    translate([-XSpacing/2, BackOffset, -40]) TNut();

	    //X axis
	    translate([0, -FrontOffset, -XOffset]) rotate([0, 90, 0]) threadedRod(RodLength);
        //translate([-(ZOffset/2) - 24, -FrontOffset, -XOffset]) rotate([0, 90, 0]) lensAssemblyThreadedKnob();
        translate([-(XSpacing/2) + 16, -FrontOffset, -XOffset]) rotate([0, 90, 0]) lensAssemblyThreadedCollar();
	    translate([0, -FrontOffset, XOffset]) rotate([0, 90, 0])  linearMotionRod(RodLength);

	   	translate([XPosition, 0, 0]) {
	    	rotate([90, 0, 0]) lensAssemblyBellowsBoard();
	    	translate([12, 0, 38]) rotate([0, 90, 0]) color("green") linearBearing();
	    	translate([-12, 0, 38]) rotate([0, 90, 0]) color("green") linearBearing();
	    	translate([-22.5, 0, -XOffset]) rotate([0, 90, 0]) TNut();
	    	translate([22.5, 0, -XOffset]) rotate([0, -90, 0]) TNut();
	    }
	}
	
	//Z axis
	translate([-XSpacing/2, BackOffset, 0])  threadedRod(RodLength + 20);
    //translate([-ZOffset/2, BackOffset, -((RodLength + 20)/2)-8])  lensAssemblyThreadedKnob();
    translate([-XSpacing/2, BackOffset, -((RodLength + 20)/2)+31])  lensAssemblyThreadedCollar();
	translate([XSpacing/2, BackOffset, 0]) linearMotionRod(RodLength);
    
    //translate([0, BackOffset, -70]) lensAssemblyBaseZ();
    
    translate([0, 130, 0]) rotate([90, 0, 0]) bellows_camera_board();
    translate([0, 130/2, 0]) color("blue") {
        difference () {
            cube([70, 130 - 10, 70], center = true);
            cube([40, 130 + 1, 40], center = true);
        }
    }
    
    translate([LensFrameSpacingX + 20, 45, -100]) rail_debug(200);
    translate([-LensFrameSpacingX - 20, 45, -100]) rail_debug(200);
    translate([-50, 45, 90]) rotate([0, 90, 0]) rail_debug(100);
    
    //from mcopy_rails
    lens_frame_top_gantry([0, 45, 90], [0, 0, 180]);
}

PART = "lens_assembly_bellows_board_magneticx";

if (PART == "lens_assembly_camera_bellows_board") {
    bellows_camera_board();
} else if (PART == "lens_assembly_camera_bellows_board_magnetic") {
    bellows_camera_board(magnets = true);
} else if (PART == "lens_assembly_bellows_board") {
    lensAssemblyBellowsBoard();
} else if (PART == "lens_assembly_bellows_board_magnetic") {
    lensAssemblyBellowsBoard(magnets = true);
} else if (PART == "lens_assembly_threaded_z") {
    lensAssemblyThreadedZ();
} else if (PART == "lens_assembly_linear_z") {
    lensAssemblyLinearZ();
} else if (PART == "lens_assembly_base_z") {
	lensAssemblyBaseZ();
} else if (PART == "lens_assembly_top_z") {
    lensAssemblyTopZ();
} else if (PART == "lens_assembly_threaded_knob") {
    lensAssemblyThreadedKnob();
} else if (PART == "lens_assembly_threaded_collar") {
    lensAssemblyThreadedCollar(6, 0.2);
} else {
    debug();
}
