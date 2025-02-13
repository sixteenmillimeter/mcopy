/**
 * Optical Printer Rails
 * 
 * Camera Drive = +X
 * Lens Drive = -X
 **/

use <2020_profile.scad>
//include <jk_rails.scad>
include <./common/common.scad>
include <./common/motors.scad>
include <./common/rods.scad>
use <./capper.scad>
use <./bolex.scad>;
use <./arri_s.scad>;

IN = 25.4;

RailSpacing = 110; //100
RailVoid = 20.4;
ThreadedRodSpacing = 50;
LensDriveX = -ThreadedRodSpacing / 2;
CameraDriveX = ThreadedRodSpacing / 2;

CameraBearingsSpacing = 60;
CameraBearingM5Spacing = 98;

CameraBoltX = 75;
CameraBoltY = 80;

CameraSledBolexZ = 33;
CameraSledBolexX = 120;
CameraSledBolexY = 110;

CameraSledBolexOffsetX = 13.5;
CameraSledBolexBoltOffsetY = -33;
CameraSledBolexBoltSpacingY = 52;

CameraSledBolexPlateX = 60;
CameraSledBolexPlateY = 90;
CameraSledBolexPlateZ = 15;

CameraSledBolexPlateOffsetY = 0;

CameraSledArriSZ = 33 + 52;
CameraSledArriSX = 100;
CameraSledArriSY = 110;

CameraSledArriSPlateX = 60;
CameraSledArriSPlateY = 90;
CameraSledArriSPlateZ = 15;

LensBearingsSpacing = 28;
LensBearingM5Spacing = 62;

RailEndX = RailSpacing + 72;
TNutVoid = 17;
BoltSpacingX = RailSpacing - 30;

LensFrameSpacingX = 100;
LensRodsOffsetZ = -15;

ProjectorFrameSpacingX = (5 * IN) - 20;

OrbitalPlateD = 137;

module cy (D, H, FN = $fn, X = 0, Y = 0, Z = 0) {
    rotate([X, Y, Z]) cylinder(r = R(D), h = H, center = true, $fn = FN);
}

module m5_nut (H = 5, DIAG = 9.1) {
    hex(diag = DIAG, h = H);
}

module rail_debug (H = 175) {
    color("lime") linear_extrude(height=H) {
        2020_profile();
    }
}

module m3_bolt_void (pos = [0, 0, 0], rot = [0, 0, 0], BoltH = 20, CapH = 3) {
	D = 3.25;
    CapD = 6;
	translate(pos) rotate(rot) {
        translate([0, 0, CapH / 2]) cy(CapD, CapH, 40);
		translate([0, 0, -BoltH / 2]) cy(D, BoltH + 0.01, 40);
	}
}

module bolt_voids_2020 (pos = [0, 0, 0], rot = [0, 0, 0], Projector = false) {
    translate(pos) rotate (rot) {
        translate([0, -25, 0]) rotate([90, 0, 0]) m3_bolt_void(CapH = 36);
        if (Projector == false) {
            translate([0, 25, 0]) rotate([-90, 0, 0]) m3_bolt_void(CapH = 36);
        }
        translate([-25, 0, 0]) rotate([0, -90, 0]) m3_bolt_void(CapH = 36);
    }
}

module bolt_voids_motor (pos = [0, 0, 0]) {
    Corner = NEMA17BoltSpacing / 2;
    translate(pos) {
        translate([Corner, Corner, 0]) m3_bolt_void(CapH = 30, BoltH = 40);
        translate([Corner, -Corner, 0]) m3_bolt_void(CapH = 30, BoltH = 40);
        translate([-Corner, Corner, 0]) m3_bolt_void(CapH = 30, BoltH = 40);
        translate([-Corner, -Corner, 0]) m3_bolt_void(CapH = 30, BoltH = 40);
    }
}

module bolt_nut_voids_motor (pos = [0, 0, 0]) {
    Corner = NEMA17BoltSpacing / 2;
    translate(pos) {
        translate([Corner, Corner, 0]) {
            m3_bolt_void(CapH = 30, BoltH = 40);
            translate([0, 0, -20]) m3_nut();
        }
        translate([Corner, -Corner, 0]) {
            m3_bolt_void(CapH = 30, BoltH = 40);
            translate([0, 0, -20]) m3_nut();
        }
        translate([-Corner, Corner, 0]) {
            m3_bolt_void(CapH = 30, BoltH = 40);
            translate([0, 0, -20]) m3_nut();
        }
        translate([-Corner, -Corner, 0]) {
            m3_bolt_void(CapH = 30, BoltH = 40);
            translate([0, 0, -20]) m3_nut();
        }
    }
}

module T_nut_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        cy(TNutDiameter2 + 0.1, TNutVoid + .01, 60);
        translate([0, 0, -(TNutVoid / 2) + (6 / 2)]) cy(TNutDiameter1 + 0.1, 6.01, 60);
        translate([8, 0, 0]) cy(3, 10, 30);
        translate([-8, 0, 0]) cy(3, 10, 30);
        translate([0, 8, 0]) cy(3, 10, 30);
        translate([0, -8, 0]) cy(3, 10, 30);
    }
}

module bearing_void (pos = [0, 0, 0], Width = 8, Hole = true, Fuzz = 0.1) {
    $fn = 80;
	innerD = 8.05;
	outerD = 22.1 - .4;
	
	color("blue") translate (pos) difference () {
		cy(outerD + (Fuzz*2), Width, $fn);
		if (Hole) cy(innerD - (Fuzz*2), Width + 1, $fn);
	}
}

module mounting_bolt_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        cy(10, 150, 40);
        translate([0, 0, 0]) cy(20, 8, 60);
    }
}

module rail_end (pos = [0, 0, 0], rot = [90, 0, 0], Motors = true, Projector = false) {
    Z = 95;
    RailVoid = 20.4;
    translate(pos) rotate(rot) {
        difference () {
            difference () {
                translate([0, -10, 20]) rounded_cube([RailEndX, Z, 80], d = 10, center = true, $fn = 50);
                translate([0, 10, 50]) rotate([0, 90, 0]) rounded_cube([60, Z, RailEndX + 1], d = 10, center = true, $fn = 50);
            }
            
            //rails
            if (Projector) {
                translate([-RailSpacing / 2, 0, 0]) cube([RailVoid, RailVoid, 80], center = true);
                translate([RailSpacing / 2, 0, 0]) cube([RailVoid, RailVoid, 80], center = true);
            } else {
                translate([-RailSpacing / 2, 0, 5]) cube([RailVoid, RailVoid, 40], center = true);
                translate([RailSpacing / 2, 0, 5]) cube([RailVoid, RailVoid, 40], center = true);
            }
            
            //rails bolts
            bolt_voids_2020([-RailSpacing / 2, 0, -15 + 5 + 7 ], Projector = Projector);
            bolt_voids_2020([RailSpacing / 2, 0, -15 + 5 + 7], [0, 180, 0], Projector = Projector);
            
            if (Motors) {
                //camera drive motor
                translate([ThreadedRodSpacing / 2, 0, 0]) {
                    cy(NEMA17PadD + 0.5, 60, 100);
                    bolt_voids_motor([0, 0, 16 - 21]);
                }
                
                //lens drive motor
                translate([-ThreadedRodSpacing / 2, 0, 0]) {
                    cy(NEMA17PadD + 0.5, 60, 100);
                    bolt_voids_motor([0, 0, 16 - 21]);
                }
            } else {
                translate([ThreadedRodSpacing / 2, 0, 0]) cy(LinearBearingOuterDiameter + 0.4, 60, 100);
                translate([-ThreadedRodSpacing / 2, 0, 0]) cy(LinearBearingOuterDiameter + 0.4, 60, 100);
            }
            
            //linear motion rod
            translate([0, 0, 5]) cy(ThreadDiameter, 40, 50);
            
            //mounting bolts
            mounting_bolt_void([BoltSpacingX / 2, -41, 40], [90, 0, 0]);
            mounting_bolt_void([-BoltSpacingX / 2, -41, 40], [90, 0, 0]);
        }
        if (Projector) {
            end_2020([-RailSpacing / 2, 0, -15 + 2.4]);
            end_2020([RailSpacing / 2, 0, -15 + 2.4]);
            
            end_2020([-RailSpacing / 2, 0, -17.5]);
            end_2020([RailSpacing / 2, 0, -17.5]);
        } else {
            end_2020([-RailSpacing / 2, 0, -15 + 2.4]);
            end_2020([RailSpacing / 2, 0, -15 + 2.4]);
        }
    }
    if (Projector) {
        translate(pos) rotate([rot[0] - 90, rot[1], rot[2]]) {
            difference () {
                union () {
                    extrusion_block([ProjectorFrameSpacingX / 2, 0, 52], [90, 0, 0], End = true);
                    extrusion_block([-ProjectorFrameSpacingX / 2, 0, 52], [90, 0, 0], End = true);
                }
                //bolts for upright linear extrusions
                lens_sled_m3_bolt_voids([ProjectorFrameSpacingX / 2, 0, 55], [90, 0, 0]);
                lens_sled_m3_bolt_voids([-ProjectorFrameSpacingX / 2, 0, 55], [90, 0, 0]);
            }
        }
    }
}


//BOM: 2, T8 Nut, Tr8x2, For drive screw
//BOM: 2, Linear bearing, N/A, For center rails
//BOM: 8, 608-RS Ball Bearing, 608-RS, To smooth sled moving along rails
module sled (pos = [0, 0, 0], rot = [90, 0, 0], Length = 60) {

    X = RailEndX;
    Y = 60;
    Z = Length;

    translate(pos) rotate(rot) difference () {
        translate([0, 7.5, 0]) rounded_cube([X, Y, Z], d = 10, center = true, $fn = 50);
        //extrusion rails
        translate([-RailSpacing / 2, 0, 0]) cube([21, 22, Z + 1], center = true);
        translate([RailSpacing / 2, 0, 0]) cube([21, 22, Z + 1], center = true);
        
        //void for top bearing rollers
        translate([-RailSpacing / 2, -20, 0]) cube([13, 22, Z + 1], center = true);
        translate([RailSpacing / 2, -20, 0]) cube([13, 22, Z + 1], center = true);
        
        //linear motion rod void
        cy(LinearMotionDiameter + 1, Z + 1, 60);
        
        //linear motion rod bearing voids
        translate([0, 0, (Length / 2) - (LinearBearingHeight / 2) + 0.01]) cy(LinearBearingOuterDiameter + 0.2, LinearBearingHeight, 100);
        translate([0, 0, -(Length / 2) + (LinearBearingHeight / 2) - 0.01]) cy(LinearBearingOuterDiameter + 0.2, LinearBearingHeight, 100);
        
        //threaded rod voids
        translate([ThreadedRodSpacing / 2, 0, 0]) cy(ThreadDiameter + 2, Z + 1, 60);
        translate([-ThreadedRodSpacing / 2, 0, 0]) cy(ThreadDiameter + 2, Z + 1, 60);
        
    }
}

module top_sled_bearing_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        //bearing void
        cy(27, 11, 120);
        translate([0, -27 / 2, 0]) cube([27, 27, 11 ], center = true, $fn = 60);
        
        cy(8.3, 16, 80);
        translate([0, -50, 0]) cube([8.3, 100, 16 ], center = true, $fn = 60);
        cy(5.2, 40, 60);
        translate([0, 0, 27 + 15]) cy(9, 60, 60);
    }
}

module side_sled_bearing_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        cy(27, 11, 120);
        translate([0, -27 / 2, 0]) cube([27, 27, 11 ], center = true, $fn = 60);
        translate([0, 1, 0]) {
            cy(8.3, 16, 80);
            translate([0, -50, 0]) cube([8.3, 100, 16 ], center = true, $fn = 60);
        }
        translate([0, -18, 0]) cube([70, 27, 16.2], center = true, $fn = 60);
        /*translate([0, -35 / 2, 0]) rotate([90, 0, 0]) {
            cy(5.2, 40, 60);
            translate([0, 0, 27]) cy(9, 30, 60);
        }*/
    }
}

module lens_sled_m3_bolt_voids (pos = [0, 0, 0], rot = [0, 0, 0]) {
    D = 16;
    translate(pos) rotate(rot) {
        translate([0, 0, D]) m3_bolt_void(CapH = 10);
        translate([0, 0, -D]) rotate([0, 180, 0]) m3_bolt_void(CapH = 30);
        translate([D, 0, 0]) rotate([0, 90, 0]) m3_bolt_void(CapH = 30);
        translate([-D, 0, 0]) rotate([0, -90, 0]) m3_bolt_void(CapH = 30);
    }
}

module sled_m5_bolt_nut_void (pos = [0, 0, 0], rot = [0, 0, 0], Angle = 360/12, BoltH = 40, HexH = 5) {
    translate(pos) rotate(rot) {
        cy(5.2, BoltH, 40);
        translate([0, 0, -3.5]) rotate([0, 0, Angle]) hex(9.2, HexH);
    }
}

module camera_sled_m5_bolt_nut_void (pos = [0, 0, 0], rot = [0, 0, 0], Angle = 360/12, BoltH = 40, HexH = 5) {
    translate(pos) rotate(rot) {
        translate([0, 0, -(BoltH / 2) + 0.1]) cy(5.2, BoltH, 40);
        translate([0, 0, (HexH / 2) - 0.1]) rotate([0, 0, Angle]) hex(9.2, HexH);
    }
}

module m5_bolt_void (pos = [0, 0, 0], rot = [0, 0, 0], BoltH = 20, CapH = 20) {
    $fn = 50;
    translate(pos) rotate(rot) {
        translate([0, 0, (CapH / 2) - 0.1]) cy(9, CapH);
        translate([0, 0, -(BoltH / 2) + 0.1]) cy(5.1, BoltH);
    }
}

module extrusion_block (pos = [0, 0, 0], rot = [0, 0, 0], X = 40, Y = 40, Z = 30, End = false) {
    translate(pos) rotate(rot) {
        difference () {
            rotate([90, 0, 0]) rounded_cube([X, Y, Z], d = 5, center = true, $fn = 30);
            cube([RailVoid, Z + 1, RailVoid], center = true);
        }
        if (End) {
            end_2020([0, -(Z / 2) + (5 / 2), 0], [90, 0, 0]);
        }
    }
}

module lens_sled (pos = [0, 0, 0], rot = [90, 0, 0]) {
    Y = 70;
    
    LensFrameBlockY = (60 / 2) + (40 / 2) - 5;
    LensFrameM3VoidsZ = (60 / 2) + (40 / 2) - 12.5 + 5 + 6;
    LensFrameOffsetZ = 20;

    BearingsSpacing = LensBearingsSpacing;
    BearingM5Spacing = LensBearingM5Spacing;

    translate(pos) rotate(rot) {
        difference () {
            union () {
                sled(rot = [0, 0, 0], Length = Y);
                extrusion_block([LensFrameSpacingX - 35, LensFrameBlockY, LensFrameOffsetZ], Y = 30);
                extrusion_block([-LensFrameSpacingX + 35, LensFrameBlockY, LensFrameOffsetZ], Y = 30);
                translate([LensFrameSpacingX - 35 - 25 + 21, 48 - 5, -17.5 + 5]) cube([60, 24, 44], center = true);
                translate([LensFrameSpacingX - 35 - 25 + 21, 48 - 5, -17.5 + 30.5]) difference() {
                    cube([60, 24, 44], center = true);
                    cube([30, 24 + 1, 34], center = true);
                }
            }

            //camera drive threaded rod passthrough
            T_nut_void ([LensDriveX, 0, (Y / 2) - (TNutVoid / 2) + 0.01], [180, 0, 0]);
            T_nut_void ([LensDriveX, 0, -(Y / 2) + (TNutVoid / 2) - 0.01]);
            translate([CameraDriveX, 0, 0]) cy(ThreadDiameter + 1, Y + 1, 60);
            
            //
            top_sled_bearing_void([RailSpacing / 2, 21.5, BearingsSpacing / 2], [0, 90, 0]);
            top_sled_bearing_void([-RailSpacing / 2, 21.5, BearingsSpacing / 2], [0, -90, 0]);
            top_sled_bearing_void([RailSpacing / 2, 21.5, -BearingsSpacing / 2], [0, 90, 0]);
            top_sled_bearing_void([-RailSpacing / 2, 21.5, -BearingsSpacing / 2], [0, -90, 0]);
            
            side_sled_bearing_void([(RailSpacing / 2) + 21.5, 0, BearingsSpacing / 2], [90, -90, 0]);
            side_sled_bearing_void([-(RailSpacing / 2) - 21.5, 0, BearingsSpacing / 2], [-90, -90, 0]);
            side_sled_bearing_void([(RailSpacing / 2) + 21.5, 0, -BearingsSpacing / 2], [90, -90, 0]);
            side_sled_bearing_void([-(RailSpacing / 2) - 21.5, 0, -BearingsSpacing / 2], [-90, -90, 0]);
            
            //bolts for upright linear extrusions
            lens_sled_m3_bolt_voids([LensFrameSpacingX - 35, LensFrameM3VoidsZ, LensFrameOffsetZ]);
            lens_sled_m3_bolt_voids([-LensFrameSpacingX + 35 , LensFrameM3VoidsZ, LensFrameOffsetZ]);

            //m5 bolt + nut for side radial bearing pressure plate
            
            sled_m5_bolt_nut_void([(RailEndX / 2) - (40 / 2), 0, BearingM5Spacing / 2], [0, 90, 0]);
            sled_m5_bolt_nut_void([(RailEndX / 2) - (40 / 2), 0, -BearingM5Spacing / 2], [0, 90, 0]);
            sled_m5_bolt_nut_void([(-RailEndX / 2) + (40 / 2), 0, BearingM5Spacing / 2], [0, -90, 0]);
            sled_m5_bolt_nut_void([(-RailEndX / 2) + (40 / 2), 0, -BearingM5Spacing / 2], [0, -90, 0]);
            

            //motor void
            translate([LensFrameSpacingX - 35, 50 + 37.5, LensRodsOffsetZ]) cube([42.25, 100, 42.25], center = true);
            //threaded rod void
            translate([LensFrameSpacingX - 35, 50 + 37.5 - 10, LensRodsOffsetZ]) rotate([90, 0, 0]) cy(9, 100, 60);
            
            //motor bolts
            sled_m5_bolt_nut_void([LensFrameSpacingX - 35 - 27, 47, 12 + LensRodsOffsetZ], [0, -90, 0], Angle = 0);
            sled_m5_bolt_nut_void([LensFrameSpacingX - 35 - 27, 47, -12 + LensRodsOffsetZ], [0, -90, 0], Angle = 0);
            
            //linear bolts
            translate([-LensFrameSpacingX + 35, 50 + 37.5 - 10, LensRodsOffsetZ]) rotate([90, 0, 0]) cy(8.6, 100, 60);
        }
        //rail ends for snug fit
        
        difference () {
            end_2020([LensFrameSpacingX - 35, LensFrameM3VoidsZ - (6 / 2) - 5.1, LensFrameOffsetZ], [90, 0, 0]);
            translate([LensFrameSpacingX - 35, LensFrameM3VoidsZ - (6 / 2) - 5.1, LensFrameOffsetZ - 13]) rotate([0, 45, 0]) cube([20, 20, 20], center = true);
        }
        
        difference () {
            end_2020([-LensFrameSpacingX + 35, LensFrameM3VoidsZ - (6 / 2) - 5.1, LensFrameOffsetZ], [90, 0, 0]);
            translate([-LensFrameSpacingX + 35, LensFrameM3VoidsZ - (6 / 2) - 5.1, LensFrameOffsetZ - 13]) rotate([0, 45, 0]) cube([20, 20, 20], center = true);
        }
        //debug
        //translate([-ThreadedRodSpacing / 2, 0, -(Y / 2) + 8.4]) T_nut();
        //translate([-ThreadedRodSpacing / 2, 0, (Y / 2) - 7.5]) rotate([180, 0, 0]) T_nut();
        //translate([LensFrameSpacingX - 35, 40, 0]) rotate([-90, 0, 0]) NEMA17(H = 20);
    }
}

module sled_side_bearing_plate (pos = [0, 0, 0], rot = [0, 0, 0], X = 25, Y = 70, Z = 15.9, BearingsSpacing = 1, BoltsSpacing = 1, CenterBolt = false) {
    translate(pos) rotate(rot) {
        difference () {
            cube([X, Y, Z], center = true);

            //sides
            translate([-9, (BearingsSpacing / 2) + (6 / 2) + (Y / 2), 0]) cube([X, Y, Z + 1], center = true);
            translate([-9, -(BearingsSpacing / 2) - (6 / 2) - (Y / 2), 0]) cube([X, Y, Z + 1], center = true);
            translate([-9, 0, 0]) cube([X, BearingsSpacing - 6, Z + 1], center = true);
            //inner
            translate([-1, BearingsSpacing / 2, 0]) cy(27, 11, 120);
            translate([-1, -BearingsSpacing / 2, 0]) cy(27, 11, 120);

            translate([-10, 0, 0]) cube([X, Y, 11], center = true);
            translate([-14, 0, 0]) cube([X, Y, Z + 1], center = true);
            translate([-2, BearingsSpacing / 2, 0]) cy(8, Z + 1, 60);
            translate([-2, -BearingsSpacing / 2, 0]) cy(8, Z + 1, 60);

            //m5 bolt voids
            translate([0, BoltsSpacing / 2, 0]) cy(5.2, 40, 40, Y = 90);
            if (CenterBolt) {
                cy(5.2, 40, 40, Y = 90);
            }
            translate([0, -BoltsSpacing / 2, 0]) cy(5.2, 40, 40, Y = 90);
        }
    }
}

module lens_sled_side_bearing_plate (pos = [0, 0, 0], rot = [0, 0, 0]) {
    X = 25;
    Y = 70;
    Z = 15.9;
    sled_side_bearing_plate(pos, rot, X, Y, Z, LensBearingsSpacing, LensBearingM5Spacing);
}

module bolt_slot (pos = [0, 0, 0], D1, D2, Len, H) {
    translate([Len / 2, 0, (H / 2) - 0.1]) cy(D1, H, 40);
    translate([Len / 2, 0, -(H / 2) + 0.1]) cy(D2, H, 60);
    translate([-Len / 2, 0, (H / 2) - 0.1]) cy(D1, H, 40);
    translate([-Len / 2, 0, -(H / 2) + 0.1]) cy(D2, H, 60);
    translate([0, 0, (H / 2) - 0.1]) cube([Len, D1, H], center = true);
    translate([0, 0, -(H / 2) + 0.1]) cube([Len, D2, H], center = true);
}

module camera_sled_bolt_slot (pos = [0, 0, 0], rot = [90, 0, 0], Bolt = "1/4", Len = 40, H = 33) {
    AD1 = 6.25;
    AD2 = 16;
    BD1 = 9.75;
    BD2 = 20;
 
    translate(pos) rotate(rot) rotate([-90, 0, 0]) {
        if (Bolt == "1/4") {
            bolt_slot(D1 = AD1, D2 = AD2, Len = Len, H = H);
        } else if (Bolt == "3/8") {
            bolt_slot(D1 = BD1, D2 = BD2, Len = Len, H = H);
        }
    }
}

module camera_sled (pos = [0, 0, 0], rot = [90, 0, 0]) {
    Y = 110;

    BearingsSpacing = CameraBearingsSpacing;
    BearingM5Spacing = CameraBearingM5Spacing;

    BoltX = CameraBoltX;
    BoltY = CameraBoltY;
    BoltZ = 28;

    translate(pos) rotate(rot) {
        difference () {
            sled(rot = [0, 0, 0], Length = Y);
            T_nut_void ([CameraDriveX, 0, (Y / 2) - (TNutVoid / 2) + 0.01], [180, 0, 0]);
            T_nut_void ([CameraDriveX, 0, -(Y / 2) + (TNutVoid / 2) - 0.01]);
            translate([LensDriveX, 0, 0]) cy(ThreadDiameter + 1, Y + 1, 60);
        
            //linear bearing voids
            top_sled_bearing_void([RailSpacing / 2, 21.5, BearingsSpacing / 2], [0, 90, 0]);
            top_sled_bearing_void([-RailSpacing / 2, 21.5, BearingsSpacing / 2], [0, -90, 0]);
            top_sled_bearing_void([RailSpacing / 2, 21.5, -BearingsSpacing / 2], [0, 90, 0]);
            top_sled_bearing_void([-RailSpacing / 2, 21.5, -BearingsSpacing / 2], [0, -90, 0]);
            
            side_sled_bearing_void([(RailSpacing / 2) + 21.5, 0, BearingsSpacing / 2], [90, -90, 0]);
            side_sled_bearing_void([-(RailSpacing / 2) - 21.5, 0, BearingsSpacing / 2], [-90, -90, 0]);
            side_sled_bearing_void([(RailSpacing / 2) + 21.5, 0, -BearingsSpacing / 2], [90, -90, 0]);
            side_sled_bearing_void([-(RailSpacing / 2) - 21.5, 0, -BearingsSpacing / 2], [-90, -90, 0]);
        
            //bolts for attaching side pressure plate
            sled_m5_bolt_nut_void([(RailEndX / 2) - (40 / 2), 0, BearingM5Spacing / 2], [0, 90, 0]);
            sled_m5_bolt_nut_void([(RailEndX / 2) - (40 / 2), 0, 0], [0, 90, 0]);
            sled_m5_bolt_nut_void([(RailEndX / 2) - (40 / 2), 0, -BearingM5Spacing / 2], [0, 90, 0]);
            
            sled_m5_bolt_nut_void([(-RailEndX / 2) + (40 / 2), 0, BearingM5Spacing / 2], [0, -90, 0]);
            sled_m5_bolt_nut_void([(-RailEndX / 2) + (40 / 2), 0, 0], [0, -90, 0]);
            sled_m5_bolt_nut_void([(-RailEndX / 2) + (40 / 2), 0, -BearingM5Spacing / 2], [0, -90, 0]);
        
            //bolts to mount top pieces
            camera_sled_m5_bolt_nut_void([BoltX / 2, BoltZ, BoltY / 2], [90, 0, 0], BoltH = 25, HexH = 100);
            camera_sled_m5_bolt_nut_void([-BoltX / 2, BoltZ, BoltY / 2], [90, 0, 0], BoltH = 25, HexH = 100);
            camera_sled_m5_bolt_nut_void([BoltX / 2, BoltZ, -BoltY / 2], [90, 0, 0], BoltH = 25, HexH = 100);
            camera_sled_m5_bolt_nut_void([-BoltX / 2, BoltZ, -BoltY / 2], [90, 0, 0], BoltH = 25, HexH = 100);
        }
    }
}

module camera_sled_side_bearing_plate (pos = [0, 0, 0], rot = [0, 0, 0]) {
    X = 25;
    Y = 110;
    Z = 15.9;
    sled_side_bearing_plate(pos, rot, X, Y, Z, CameraBearingsSpacing, CameraBearingM5Spacing, CenterBolt = true);
/*
    BearingsSpacing = CameraBearingsSpacing; //60
    BoltsSpacing = CameraBearingM5Spacing; //98
    
    translate(pos) rotate(rot) {
        difference () {
            cube([25, Y, 15.9], center = true);

            //sides
            //translate([-9, 52, 0]) cube([25, Y, 15.9 + 1], center = true);
            //translate([-9, -52, 0]) cube([25, Y, 15.9 + 1], center = true);
            translate([-9, 0, 0]) cube([25, 22, 15.9 + 1], center = true);
            //inner
            translate([-1, BearingsSpacing / 2, 0]) cy(27, 11, 120);
            translate([-1, -BearingsSpacing / 2, 0]) cy(27, 11, 120);

            //
            translate([-10, 0, 0]) cube([25, Y, 11], center = true);
            translate([-14, 0, 0]) cube([25, Y, 15.9 + 1], center = true);
            translate([-2, BearingsSpacing / 2, 0]) cy(8, 15.9 + 1, 60);
            translate([-2, -BearingsSpacing / 2, 0]) cy(8, 15.9 + 1, 60);

            //m5 bolt voids
            translate([0, BoltsSpacing / 2, 0]) cy(5.2, 40, 40, Y = 90);
            translate([0, 0, 0]) cy(5.2, 40, 40, Y = 90);
            translate([0, -BoltsSpacing / 2, 0]) cy(5.2, 40, 40, Y = 90);
        }
    }*/
}

module camera_sled_bolex (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Z = CameraSledBolexZ;
    X = CameraSledBolexX;
    Y = CameraSledBolexY;
    PlateY = 20;

    translate(pos) rotate(rot) {
        difference () {
            translate([CameraSledBolexOffsetX, 0, 0]) rounded_cube([X, Y, Z], d = 10, center = true, $fn = 40);
            translate([0, 0, -20]) rounded_cube([CameraBoltX - 10, CameraBoltY - 10, Z], d = 10, center = true, $fn = 40);
            
            m5_bolt_void([CameraBoltX / 2, CameraBoltY / 2, -10], BoltH = Z * 2, CapH = Z);
            m5_bolt_void([-CameraBoltX / 2, CameraBoltY / 2, -10], BoltH = Z * 2, CapH = Z);
            m5_bolt_void([CameraBoltX / 2, -CameraBoltY / 2, -10], BoltH = Z * 2, CapH = Z);
            m5_bolt_void([-CameraBoltX / 2, -CameraBoltY / 2, -10], BoltH = Z * 2, CapH = Z);

            //film plane
            translate([X / 2, CameraBoltY / 2, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, Z + 1], center = true);
            translate([-X / 2, CameraBoltY / 2, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, Z + 1], center = true);

            //center
            translate([0, 0, Z / 2]) rotate([90, 0, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, Y + 1], center = true);

            
            //void for plate
            camera_sled_bolex_plate_blank([CameraSledBolexOffsetX, -(PlateY / 2), (CameraSledBolexZ / 2) - (CameraSledBolexPlateZ / 2)], PadX = 0.4, PadY = PlateY, PadZ = 0.1);

            //m5 bolt sides
            translate([-25 + CameraSledBolexOffsetX, CameraSledBolexBoltOffsetY, (CameraSledBolexZ / 2) - (CameraSledBolexPlateZ / 2) + 1]) {
                cy(5.1, 25, 40, Y = 90);
                translate([-27 , 0, 0]) cy(9, 30, 40, Y = 90);
                translate([-9, 0, 0]) rotate([0, 90, 0]) m5_nut();
                translate([-9, 0, 11]) cube([5, 7.9, 20], center = true);
            }
            translate([-25 + CameraSledBolexOffsetX, CameraSledBolexBoltOffsetY + CameraSledBolexBoltSpacingY, (CameraSledBolexZ / 2) - (CameraSledBolexPlateZ / 2) + 1]) {
                cy(5.1, 25, 40, Y = 90);
                translate([-27 , 0, 0]) cy(9, 30, 40, Y = 90);
                translate([-9, 0, 0]) rotate([0, 90, 0]) m5_nut();
                translate([-9, 0, 11]) cube([5, 7.9, 20], center = true);
            }
            translate([25 + CameraSledBolexOffsetX, CameraSledBolexBoltOffsetY, (CameraSledBolexZ / 2) - (CameraSledBolexPlateZ / 2) + 1]) {
                cy(5.1, 25, 40, Y = 90);
                translate([27 , 0, 0]) cy(9, 30, 40, Y = 90);
                translate([9, 0, 0]) rotate([0, 90, 0]) m5_nut();
                translate([9, 0, 11]) cube([5, 7.9, 20], center = true);
            }
            translate([25 + CameraSledBolexOffsetX, CameraSledBolexBoltOffsetY + CameraSledBolexBoltSpacingY, (CameraSledBolexZ / 2) - (CameraSledBolexPlateZ / 2) + 1]) {
                cy(5.1, 25, 40, Y = 90);
                translate([27 , 0, 0]) cy(9, 30, 40, Y = 90);
                translate([9, 0, 0]) rotate([0, 90, 0]) m5_nut();
                translate([9, 0, 11]) cube([5, 7.9, 20], center = true);
            }
        }
    }
}

module camera_sled_arris (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Z = CameraSledArriSZ;
    X = CameraSledArriSX;
    Y = CameraSledArriSY;
    PlateY = 20;
    translate(pos) rotate(rot) {

        difference () {

            rounded_cube([X, Y, Z], d = 10, center = true, $fn = 40);

            //center void
            translate([0, 0, -20]) rounded_cube([CameraBoltX - 20, CameraBoltY - 20, Z], d = 10, center = true, $fn = 40);
            translate([0, 0, -20]) rotate([0, 90, 0]) rounded_cube([Z, CameraBoltY - 20, X + 1], d = 10, center = true, $fn = 40);
            translate([0, 0, -20]) rotate([90, 0, 0]) rounded_cube([CameraBoltX - 20, Z, Y + 1], d = 10, center = true, $fn = 40);
            
            m5_bolt_void([CameraBoltX / 2, CameraBoltY / 2, -30], BoltH = Z * 2, CapH = Z);
            m5_bolt_void([-CameraBoltX / 2, CameraBoltY / 2, -30], BoltH = Z * 2, CapH = Z);
            m5_bolt_void([CameraBoltX / 2, -CameraBoltY / 2, -30], BoltH = Z * 2, CapH = Z);
            m5_bolt_void([-CameraBoltX / 2, -CameraBoltY / 2, -30], BoltH = Z * 2, CapH = Z);

            //film plane lines
            translate([X / 2, CameraBoltY / 2, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, Z + 1], center = true);
            translate([-X / 2, CameraBoltY / 2, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, Z + 1], center = true);

            //center line
            translate([0, 0, Z / 2]) rotate([90, 0, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, Y + 1], center = true);

            //void for plate
            camera_sled_bolex_plate_blank([0, -(PlateY / 2), (CameraSledArriSZ / 2) - (CameraSledArriSPlateZ / 2)], PadX = 0.4, PadY = PlateY, PadZ = 0.1);
            
            translate([-33, -22, (CameraSledArriSZ / 2) - (CameraSledArriSPlateZ / 2) + 1]) rotate([0, 90, 0]) m5_nut();
            translate([-33, -22, (CameraSledArriSZ / 2) - (CameraSledArriSPlateZ / 2) + 11]) cube([5, 7.9, 20], center = true);
            
            //m5 bolt
            translate([-25, -22, (CameraSledArriSZ / 2) - (CameraSledArriSPlateZ / 2) + 1]) cy(5.1, 25, 40, Y = 90);
            translate([-25 - 27, -22, (CameraSledArriSZ / 2) - (CameraSledArriSPlateZ / 2) + 1]) cy(9, 30, 40, Y = 90);
        }

    }
}

module camera_sled_bolex_plate_blank (pos = [0, 0, 0], rot = [0, 0, 0], PadX = 0, PadY = 0, PadZ = 0) {
    X = CameraSledBolexPlateX + PadX;
    Y = CameraSledBolexPlateY + PadY;
    Z = CameraSledBolexPlateZ + PadZ;
    BevelZ = 5;
    translate(pos) rotate(rot) {
        difference () {
           cube([X, Y, Z], center = true);
           translate([X - BevelZ, 0, Z - BevelZ]) cube([X, Y + 1, Z], center = true);
           translate([-X + BevelZ, 0, Z - BevelZ]) cube([X, Y + 1, Z], center = true);
           translate([-(X / 2) - 7.83, 0, -3.45]) rotate([0, 20, 0]) cube([20, Y + 1, 20], center = true);
           translate([(X / 2) + 7.83, 0, -3.45]) rotate([0, -20, 0]) cube([20, Y + 1, 20], center = true);
        }
    }
}

module camera_sled_bolex_plate (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Z = CameraSledBolexZ;
    X = CameraSledBolexX;
    Y = CameraSledBolexY;
    CameraBoltLen = 18;
    CameraBolts = ["3/8", "1/4", "3/8"];
    CameraBoltsY = [ -5.2, -27.35, -55.8 ];
    CameraBoltsX = [0, 0, 6.8 ];
    
    translate(pos) rotate(rot) {
        difference () {
            camera_sled_bolex_plate_blank([0, 0, (Z / 2) - (CameraSledBolexPlateZ / 2)]);
            //camera mounting bolts
            translate([0, (Y / 2) - ((Y - CameraBoltY) / 2) - (9.6 - 5.2), -33 - 10]) {
                for (i = [0 : 2]) {
                    camera_sled_bolt_slot([CameraBoltsX[i], CameraBoltsY[i], 50], Bolt = CameraBolts[i], Len = CameraBoltLen);
                }
            }
            //m5 nut drop in
            translate([-20, CameraSledBolexBoltOffsetY, 10]) {
                rotate([0, 90, 0]) m5_nut();
                translate([0, 0, 10]) cube([5, 7.9, 20], center = true);
                translate([-7, 0, 0]) cy(5.1, 25, 40, Y = 90);
            }
            translate([-20, CameraSledBolexBoltOffsetY + CameraSledBolexBoltSpacingY, 10]) {
                rotate([0, 90, 0]) m5_nut();
                translate([0, 0, 10]) cube([5, 7.9, 20], center = true);
                translate([-7, 0, 0]) cy(5.1, 25, 40, Y = 90);
            }

            translate([20, CameraSledBolexBoltOffsetY, 10]) {
                rotate([0, 90, 0]) m5_nut();
                translate([0, 0, 10]) cube([5, 7.9, 20], center = true);
                translate([7, 0, 0]) cy(5.1, 25, 40, Y = 90);
            }
            translate([20, CameraSledBolexBoltOffsetY + CameraSledBolexBoltSpacingY, 10]) {
                rotate([0, 90, 0]) m5_nut();
                translate([0, 0, 10]) cube([5, 7.9, 20], center = true);
                translate([7, 0, 0]) cy(5.1, 25, 40, Y = 90);
            }

            //lines
            camera_bolex_plate_lines_y(Z / 2);
            camera_bolex_plate_lines_y((Z / 2) - CameraSledBolexPlateZ);
            translate([0, CameraSledBolexPlateY / 2, 0]) rotate([90, 0, 0]) camera_bolex_plate_lines_y(0);
            translate([0, -CameraSledBolexPlateY / 2, 0]) rotate([90, 0, 0]) camera_bolex_plate_lines_y(0);
        }
        
    }
}

module camera_sled_arris_plate (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Z = CameraSledBolexZ;
    X = CameraSledBolexX;
    Y = CameraSledBolexY;

    CameraBoltLen = 20;
    CameraBolts = ["3/8"];
    CameraBoltsY = [-27.35];
    CameraBoltsX = [0];
    
    translate(pos) rotate(rot) {
        difference () {
            camera_sled_bolex_plate_blank([0, 0, (Z / 2) - (CameraSledBolexPlateZ / 2)]);
            //camera mounting bolts
            translate([0, (Y / 2) - ((Y - CameraBoltY) / 2) - (9.6 - 5.2), -33 - 10]) {
                for (i = [0 : 0]) {
                    camera_sled_bolt_slot([CameraBoltsX[i], CameraBoltsY[i], 50], Bolt = CameraBolts[i], Len = CameraBoltLen);
                }
            }
            //m5 nut drop in
            translate([-18, -22, 10]) rotate([0, 90, 0]) m5_nut();
            translate([-18, -22, 20]) cube([5, 7.9, 20], center = true);
            translate([-25, -22, 10]) cy(5.1, 25, 40, Y = 90);

            //lines
            camera_bolex_plate_lines_y(Z / 2);
            camera_bolex_plate_lines_y((Z / 2) - CameraSledBolexPlateZ);
            translate([0, CameraSledBolexPlateY / 2, 0]) rotate([90, 0, 0]) camera_bolex_plate_lines_y(0);
            translate([0, -CameraSledBolexPlateY / 2, 0]) rotate([90, 0, 0]) camera_bolex_plate_lines_y(0);
        }
        
    }
}

module camera_bolex_plate_lines_y (Z) {
    camera_bolex_plate_line_y(Z = Z);
    for (i = [1 : 4]) {
        Size = i % 2 == 0 ? 3/4 : 1/2;
        camera_bolex_plate_line_y(X = i * 5, Z = Z, Size = Size);
        camera_bolex_plate_line_y(X = -i * 5, Z = Z, Size = Size);
    }
}

module camera_bolex_plate_line_y (X = 0, Z = 0, Size = 1) {
    translate([X, 0, Z]) rotate([0, 45, 0]) cube([Size, CameraSledBolexY + 1, Size], center = true);
}

module end_2020 (pos = [0, 0, 0], rot = [0, 0, 0], Z = 5) {
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cube([24, 5, Z], center = true);
                cube([5, 24, Z], center = true);
                cube([16.3, 10.7, Z], center = true);
                cube([10.7, 16.3, Z], center = true);
            }
            cube([8.4, 8.4, Z + 1], center = true);
            rotate([0, 0, 45]) cube([2.4, 40, Z + 1], center = true);
            rotate([0, 0, -45]) cube([2.4, 40, Z + 1], center = true);
        }
    }
}

module bearing_roller (pos = [0, 0, 0], rot = [0, 0, 0]) {
    A = 5.75;
    D1 = 25.4;
    D2 = 24;
    translate(pos) rotate(rot) difference () {
        union () {
            cy(D2, 10, 100);
            cy(D1, A, 100);
            translate([0, 0, (A / 2) + (1 / 2)]) cylinder(r1 = R(D1), r2 = R(D2), h = 1, center = true, $fn = 100);
            translate([0, 0, -(A / 2) - (1 / 2)]) cylinder(r2 = R(D1), r1 = R(D2), h = 1, center = true, $fn = 100);
        }
        translate([0, 0, 1]) bearing_void(Hole = false, Fuzz = 0.3, Width = 9.01);
        cy(19.5, 10 + 1, 100);
    }
}

module bearing_roller_inner (pos = [0, 0, 0], rot = [0, 0, 0], Solid = false) {
    translate(pos) rotate(rot) difference () {
        union () {
            cy(7.8, 15, 60);
            translate([0, 0, 4.5]) cy(11, 1, 80);
        }
        if (!Solid) {
            cy(5.25, 20 + 1, 60);
        }
    }
}

module corner_bracket (pos = [0, 0, 0], rot = [0, 0, 0]) {
    W = 19;
    L = 25;
    T = 3;
    BoltDepth = 0.5;
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cube([W, L, L], center = true);
                translate([0, -0.5, -0.5]) cube([5.5, L + 1, L + 1], center = true);
            }
            translate([0, T, T]) cube([W - T - T, L, L], center = true);
            translate([0, L / 3, L / 3]) rotate([45, 0, 0]) cube([W + 1, L, L], center = true);
            translate([0, T, L - 4.15]) cube([W + 1, L, L], center = true);
            translate([0, L - 4.15, T]) cube([W + 1, L, L], center = true);
            m3_bolt_void([0, 5, -9.5 - BoltDepth]);
            translate([0, 5, -14.5]) cube([6.5, 6.5, 4], center = true);
            m3_bolt_void([0, -9.5 - BoltDepth, 5], [-90, 0, 0]);
            translate([0, -14.5, 5]) cube([6.5, 4, 6.5], center = true);
        }
    }
}

module corner_outer_bracket (pos = [0, 0, 0], rot = [0, 0, 0], Rotate = false, Side = "right") {
    T = 3;
    W = 20.3;
    H = 40 + T;
    BoltDepth = 0.5;
    translate(pos) rotate(rot) {
        difference () {
            union () {
                intersection () {
                    end_2020();
                    cube([W, W, 10], center = true);
                }
                translate([10 - 0.2, 0, -T]) cube([40.4, W, T], center = true);
                if (Rotate) {
                    translate([20, 0, -T + 1]) cube([5.5, W, T], center = true);
                } else {
                    translate([20, 0, -T + 1]) cube([20, 5.5, T], center = true);
                }
                translate([-(W / 2) - (T / 2) - 0.2, 0, (H / 2) - 4.5]) cube([T, W, H], center = true);
                translate([-(W / 2) - (T / 2) - 0.2 + 1, 0, (H / 2) - 4.5]) cube([T, 5.5, H], center = true);
                //
                if (!Rotate || Side == "right") {
                    translate([8.35, (W / 2) + (T / 2), (40 / 2) - T])difference () {
                        cube([H + 0.4, T, H], center = true);
                        translate([0, 0, 33.5]) rotate([0, 45, 0]) cube([H * 3, T + 1, H], center = true);
                    }
                }
                if (!Rotate || Side == "left") {
                    translate([8.35, -(W / 2) - (T / 2) , (40 / 2) - T])difference () {
                        cube([H + 0.4, T, H], center = true);
                        translate([0, 0, 33.5]) rotate([0, 45, 0]) cube([H * 3, T + 1, H], center = true);
                    }
                }
            }
            //horizontal
            m3_bolt_void([20, 0, -4.5 + BoltDepth], [180, 0, 0]);
            translate([20, 0, 0.5]) cube([6.5, 6.5, 4], center = true); 
            //vertical
            m3_bolt_void([-13.5 + BoltDepth, 0, 10 + (T / 2)], [0, -90, 0]);
            translate([-8, 0, 10 + (T / 2)]) cube([4, 6.5, 6.5], center = true);
            m3_bolt_void([-13.5 + BoltDepth, 0, 30 + (T / 2)], [0, -90, 0]);
            translate([-8, 0, 30 + (T / 2)]) cube([4, 6.5, 6.5], center = true); 
        }
    }
}

module lens_frame_top_gantry (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        difference() {
            union () {
                corner_outer_bracket([(LensFrameSpacingX / 2) + 14.65, 0, 8.85], [180, 0, 180],  Rotate = false);
                corner_outer_bracket([(-LensFrameSpacingX / 2) - 14.65, 0, 8.85], [180, 0, 0],  Rotate = false);
                
                translate([0, 0, 11.85]) cube([71, 26.3, 3], center = true);
                translate([0, 0, 11.85-1]) cube([71, 5.5, 3], center = true);

                translate([0, -11.65, 11.85 - 10]) cube([120, 3, 20], center = true);
                translate([0, 11.65, 11.85 - 5]) cube([120, 3, 10], center = true);
                
                //threaded rod
                translate([53, 31, 8.35]) difference() {
                    cube([50, 40, 10], center = true);
                    translate([-20, 20, 0]) rotate([0, 0, 45]) cube([70, 40, 10 + 1], center = true); 
                }
                translate([LensFrameSpacingX - 35, -LensRodsOffsetZ + 20, -3]) cy(22, 25, 120);
                
                //linear rod
                translate([-53, 31, 8.35]) difference() {
                    cube([50, 40, 10], center = true);
                    translate([20, 20, 0]) rotate([0, 0, -45]) cube([70, 40, 10 + 1], center = true);
                }
                translate([-LensFrameSpacingX + 35 - 2, -LensRodsOffsetZ + 20, -3]) cube([22, 19, 15], center = true);
            }

            translate([LensFrameSpacingX - 35, -LensRodsOffsetZ + 20, -5]) {
                linear_bearing(padD = 0.2);
                translate([0, 0, 2]) linear_bearing(padD = 0.2);
                cy(ThreadDiameter + 1, 40, 60);
            }

            translate([-LensFrameSpacingX + 35, -LensRodsOffsetZ + 20, -5]) {
                cy(ThreadDiameter + 0.1, 40, 60);
            }

            //center bolt
            m3_bolt_void([0, 0, 12.75]);
            translate([0, 0, 6.35]) cube([7, 7, 8], center = true); 
            
            //linear rod m4 bolt void
            translate([-73, 35, -3]) {
                translate([0, 0, -10]) cube([3.1, 8.25, 20], center = true);
                rotate([90, 0, 90]) {
                    m4_nut();
                    cy(4, 15, 30);
                }
            }
        }
    }
}

module projector_orbital_brace (pos = [0, 0, 0], rot = [0, 0, 0]) {
    X = 5 * IN;
    Y = 160;
    Z = 9;
    PlateD = OrbitalPlateD;
    InnerD = 63.5;
    M5SpacingX = 70 - 18; // - 12
    M5SpacingY = 123 + 8.5;// + 6
    M3BoltY = 20;
    Corner = 20;
    VoidD = 11.25;
    VoidX = -25.5;
    VoidY = 40.25;
    translate(pos) rotate(rot) difference() {
        cube([X, Y, Z], center = true);
        //corners
        translate([X / 2, Y / 2, 0]) rotate([0, 0, 45]) cube([Corner, Corner, Z + 1], center = true);
        translate([-X / 2, Y / 2, 0]) rotate([0, 0, 45]) cube([Corner, Corner, Z + 1], center = true);
        //plate
        translate([0, 0, -6.5]) cy(PlateD, Z, 300);
        //center
        cy(InnerD, Z + 1, 120);
        //marks
        translate([(X / 2) + 0.1, 0, 0]) rotate([0, 0, 45]) cube([1, 1, Z + 1], center = true);
        translate([-(X / 2) - 0.1, 0, 0]) rotate([0, 0, 45]) cube([1, 1, Z + 1], center = true);
        
        //two voids
        translate([VoidX, VoidY, 0 ]) cy(VoidD, Z + 1, 40);
        translate([VoidX, -VoidY, 0 ]) cy(VoidD, Z + 1, 40);

        //face plate m3 bolt
        m3_bolt_void([ProjectorFrameSpacingX / 2, (Y / 2) - M3BoltY, 1], [180, 0, 0], BoltH = 8, CapH = 10);
        m3_bolt_void([-ProjectorFrameSpacingX / 2, (Y / 2) - M3BoltY, 1], [180, 0, 0], BoltH = 8, CapH = 10);
        m3_bolt_void([ProjectorFrameSpacingX / 2, -(Y / 2) + M3BoltY, 1], [180, 0, 0], BoltH = 8, CapH = 10);
        m3_bolt_void([-ProjectorFrameSpacingX / 2, -(Y / 2) + M3BoltY, 1], [180, 0, 0], BoltH = 8, CapH = 10);
    
        //m3 bolt top brace

        //attachment m5 bolts
        translate([M5SpacingX / 2, M5SpacingY / 2, 0]) cy(5.3, Z + 1, 40);
        translate([-M5SpacingX / 2, M5SpacingY / 2, 0]) cy(5.3, Z + 1, 40);
        translate([M5SpacingX / 2, -M5SpacingY / 2, 0]) cy(5.3, Z + 1, 40);
        translate([-M5SpacingX / 2, -M5SpacingY / 2, 0]) cy(5.3, Z + 1, 40);
    }
}

module projector_orbital_brace_corner (pos = [0, 0, 0], rot = [0, 0, 0]) {
    PlateD = OrbitalPlateD;
    H = 8;
    BaseZ = 3 + 1.5;
    OuterD = PlateD + (16 * 2);
    InnerVoidD = PlateD - (4.62 * 2);
    CuspD = OuterD - (2.9 * 2);
    PositionAngle = 58;
    Angle = 30;
    BoltX = 149.1 - 7.6;
    OffsetX = -((CuspD + PlateD) / 2) / 2;

    translate(pos) rotate(rot) translate([OffsetX, 0, 0]) {
        difference() {
            cy(OuterD, H, 600);
            cy(InnerVoidD, H + 1, 600);
            translate([0, 0, BaseZ]) cy(PlateD, H, 600);
            translate([0, 0, BaseZ + 2.75]) cy(CuspD, H, 600);
            translate([0, 0, 3.01]) cylinder(r1 = R(PlateD), r2 = R(CuspD), h = 0.5, center = true, $fn = 600);
            //slice
            rotate([0, 0, PositionAngle + (Angle / 2)]) translate([0, OuterD / 2, 0]) cube([OuterD + 1, OuterD, H + 1], center = true);
            rotate([0, 0, PositionAngle - (Angle / 2)]) translate([0, -OuterD / 2, 0]) cube([OuterD + 1, OuterD, H + 1], center = true);
            //
            rotate([0, 0, PositionAngle]) translate([BoltX / 2, 0, 0]) cy(5, H * 5, 40);
            rotate([0, 0, PositionAngle]) translate([BoltX / 2, 0, -6.5 + 3.5]) m5_nut();
        }
    }
}

module rail_end_idle_roller_plug (pos = [0, 0, 0], rot = [0, 0, 0]) {
    H = 13.8;
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cy(15, H, 80);
                translate([0, 0, -(H / 2) + (1.5 / 2)]) cy(20, 1.5, 80);
            }
            cy(10, H + 1, 80);
        }
    }
}

module rail_end_idle_motor_plug (pos = [0, 0, 0], rot = [0, 0, 0]) {
    H = 45;
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cy(NEMA17PadD, H, 100);
                translate([0, 0, -(H / 2) + (5 / 2)]) rounded_cube([43, 43, 5], d = 8, center = true, $fn = 40);
            }
            cy(10, H + 1, 80);
            bolt_nut_voids_motor([0, 0, -2]);
            translate([0, 0, 10.6]) linear_bearing(padD = 0.2);
        }
    }
}

module dial () {
    D = 47.75;
    H = 10;
    Mark = 5;
    Marks = 40;
    difference () {
        cy(D, H, 200);
        for (i = [0 : Marks]) {
            rotate([0, 0, i * (360 / Marks)]) {
                Size = i % 10 == 0 ? Mark * 2 : Mark;
                translate([(D / 2) - (Size / 2), 0, H / 2]) rotate([45, 0, 0]) cube([Size, 1/2, 1/2], center = true);
                translate([(D / 2), 0, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, H + 1], center = true);
            }
        }
        rotate([0, 0, 45]) translate([0, (D / 2) - 6, -(H / 2) + 1.5]) {
            m4_nut();
            translate([0, 0, 10]) cy(4, 20, 40);
             
        }
        rotate([0, 0, 45]) translate([0, (D / 2) - 6, H / 2]) {
            cy(8, 1, 60);
        }
    }
    
    translate([0, 0, -8]) difference () {
        cy(8 + 10, 10, 60);
        cy(8, 10 + 1, 60);
        translate([6, 0, -2]) {
            rotate([0, 90, 0]) m3_nut(2.75);
            rotate([0, 90, 0]) cy(3, 8, 40);
            translate([0, 0, -5]) cube([2.75, 5.72, 10], center = true);
        }
        rotate([0, 0, 90]) translate([6, 0, -2]) {
            rotate([0, 90, 0]) m3_nut(2.75);
            rotate([0, 90, 0]) cy(3, 8, 40);
            translate([0, 0, -5]) cube([2.75, 5.72, 10], center = true);
        }
    }
}

module dial_handle () {
    EndD = 13;
    difference () {
        union () {
            sphere(r = R(EndD), $fn = 60);
            translate([0, 0, -15 / 2]) cylinder(r1 = R(7.75), r2 = R(EndD), h = 15, center = true, $fn = 60);
        }
        cy(4.25, 50, 40);
        translate([0, 0, (15 / 2) - 3.5]) cy(9.5, 5, 40);
    }
}

module debug () {
    //translate([50 , -90 - 10, 22]) rotate([0, 90, 0]) bearing_void();
    rail_end([0, 20, 0], Projector = true);
    color("green") translate([(ProjectorFrameSpacingX / 2), 0, 37.25]) rotate([0, 0, 0]) linear_extrude(height=255) 2020_profile();
    color("green") translate([-(ProjectorFrameSpacingX / 2), 0, 37.35]) rotate([0, 0, 0]) linear_extrude(height=255) 2020_profile();
    echo("cross", ProjectorFrameSpacingX-20, "mm");
    color("green") translate([-((ProjectorFrameSpacingX - 20) / 2), 0, 282.25]) rotate([0, 90, 0]) linear_extrude(height=ProjectorFrameSpacingX-20) 2020_profile();
    
    projector_orbital_brace([0, 14.5, 180], [90, 0, 0]);
    translate ([0, 14.5, 180]) rotate([90, 0, 0]) {
        projector_orbital_brace_corner([0, -105, -8], [0, 0, -90]);
    
        //translate([35-9, -62-3.5, 0]) cyl(5, 30, 60);
    }

    translate([0, 0, 110]) cube([10, 10, 150], center = true); 
    
    corner_bracket([30, 0, 260], [0, 180, 90]);
    corner_outer_bracket([55, 10, 290], [0, 180, 0]);

    corner_bracket([-30, 0, 260], [180, 0, 90]);
    corner_outer_bracket([-55, 0, 290], [180, 0, 0]);

    difference () {
        //lens_sled([0, -90, 0]);
        camera_sled([0, -90, 0]);
        //translate([ 50 + (RailSpacing / 2), -90 - 50, 0]) cube([100, 100, 100], center = true);
        //translate([ -50 - (RailSpacing / 2), -90, 0]) cube([100, 100, 100], center = true);
    }

    camera_sled_bolex([0, -90, 54]);
    //camera_sled_arris([0, -90, 54 + 26]);
    color("red") camera_sled_bolex_plate([13.5, -91, 55]);

    debug_bolex([13.5, -90, 70.75]);
    //debug_arris([0, -91, 70.75 + 51.75]);
    
    //color("green") translate([(LensFrameSpacingX / 2) + 15, -20, 50]) rotate([0, 0, 0]) linear_extrude(height=200) 2020_profile();
    //color("green") translate([-(LensFrameSpacingX / 2) - 15, -20, 50]) rotate([0, 0, 0]) linear_extrude(height=200) 2020_profile();
    //color("green") translate([-(LensFrameSpacingX + 30 + 20) / 2, -20, 260]) rotate([0, 90, 0]) linear_extrude(height = LensFrameSpacingX + 30 + 20) 2020_profile();
    
    //color("blue") translate([LensFrameSpacingX - 35, -LensRodsOffsetZ, 140]) cy(9, 300, 60);
    //color("blue") translate([-LensFrameSpacingX + 35, -LensRodsOffsetZ, 140]) cy(9, 300, 60);

    //difference () {
    //intersection() {
        //lens_sled([0, 0, 0]);
        //cube([132, 1, 100], center = true);
        //translate([-30, -90 + 30 - 1, 10]) cube([90, 60, 45], center = true);
        //translate([150, -90, 50]) cube([200, 100, 100], center = true); 
        //translate([65, 20, 40]) cube([70, 50, 50], center = true);
    //}

    /*translate([RailSpacing / 2, -90, 21.5]) rotate([0, 90, 0]) {
        bearing_roller();
        bearing_roller_inner();
    }
    
    translate([(RailSpacing / 2) + 21.5, -90, 0]) rotate([0, 0, 0]) {
        bearing_roller();
        bearing_roller_inner();
    }
    */
    //color("blue") lens_sled_side_bearing_plate([(RailSpacing / 2) + 23.5 + 20, 0, 0]);
    
    //lens_frame_top_gantry([0, -20, 260]);
    
    //bearing_roller();

    //debug
    //translate([-RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) rail_debug(175);
    //color("green") translate([RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) linear_extrude(height=175) 2020_profile();

    //translate([ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0]) color("blue") NEMA17();
    //translate([-ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0]) color("blue") NEMA17();

    //translate([50 - 10, 0, 0]) rail_debug(100);
    //translate([-50 + 10, 0, 0]) rail_debug(100);
    //translate([-50, 0, 110]) rotate([0, 90, 0]) rail_debug(100);
    /*difference () {
        union () {
            corner_bracket();
            m3_bolt_void([0, -9.4, 5],  [-90, 0, 0], BoltH=8);
        }
        translate([0, 0, 10]) cube([50, 30, 10], center = true);
    }*/
    //projector_orbital_brace();
    //projector_orbital_brace_corner([0, 0, -8]);
}

module rail_sizing (L = 1000) {
    SpacingY = L - 30;
    RailL = L;
    difference () {
        rail_end([0, SpacingY / 2, 0], Motors = false, Projector = false);
        translate([0, SpacingY / 2, 25]) cube([200, 200, 50], center = true);
    }
    difference () {
        rail_end([0, -SpacingY / 2, 0], [90, 0, 180], Projector = true);
        translate([0, -SpacingY / 2, 25]) cube([200, 200, 50], center = true);
    }
    translate([55, RailL / 2, 0]) rotate([90, 0, 0]) linear_extrude(height=RailL) 2020_profile();
    color("green") cy(ThreadDiameter, L, 60, X = 90);
    
    //lens_sled();
    //camera_sled();
    //camera_sled_bolex([0, 0, 60]);
    
    translate([25, -35+17, 0]) color("green") cy(ThreadDiameter, L, 60, X = 90);
    color("red") camera_sled_side_bearing_plate([120, 0, 0]);
    color("blue") lens_sled_side_bearing_plate([120, 0, 30]);
}

module debug2 () {
    //camera_sled_bolex();
    //color("red") camera_sled_bolex_plate();
    dial();
    rotate([0, 0, 45]) translate([0, 17.75, 20]) dial_handle();
    color("green") rotate([0, 0, 45]) translate([0, 17.75, 11]) cy(4, 25, 40);
}


PART = "camera_sled_bolex_plate";

if (PART == "rail_end") {
    rail_end(Projector = true);
} else if (PART == "rail_end_idle") {
    rail_end(Motors = false, Projector = false);
} else if (PART == "lens_sled") {
    rotate([90, 0, 0]) lens_sled();
} else if (PART == "camera_sled") {
    rotate([90, 0, 0]) camera_sled();
} else if (PART == "camera_sled_bolex") {
    camera_sled_bolex();
} else if (PART == "camera_sled_bolex_plate") {
    camera_sled_bolex_plate(rot = [180, 0, 0]);
} else if (PART == "camera_sled_arris_plate") {
    camera_sled_arris_plate(rot = [180, 0, 0]);
} else if (PART == "camera_sled_arris") {
    camera_sled_arris();
} else if (PART == "bearing_roller") {
    bearing_roller();
} else if (PART == "bearing_roller_inner") {
    rotate([180, 0, 0]) bearing_roller_inner();
} else if (PART == "bearing_roller_inner_solid") {
    rotate([180, 0, 0]) bearing_roller_inner(Solid = true);
} else if (PART == "lens_sled_side_bearing_plate") {
    rotate([0, 90, 0]) lens_sled_side_bearing_plate();
} else if (PART == "camera_sled_side_bearing_plate") {
    rotate([0, 90, 0]) camera_sled_side_bearing_plate();
} else if (PART == "corner_bracket") {
    corner_bracket(rot = [0, 90, 0]);
} else if (PART == "corner_outer_bracket") {
    corner_outer_bracket();
} else if (PART == "corner_outer_bracket_rotated") {
    corner_outer_bracket(Rotate = true);
} else if (PART == "lens_frame_top_gantry") {
    lens_frame_top_gantry(rot = [180, 0, 0]);
} else if (PART == "projector_orbital_brace") {
    projector_orbital_brace(rot = [180, 0, 0]);
} else if (PART == "projector_orbital_brace_corner") {
    projector_orbital_brace_corner();
} else if (PART == "rail_end_idle_roller_plug") {
    rail_end_idle_roller_plug();
} else if (PART == "rail_end_idle_motor_plug") {
    rail_end_idle_motor_plug();
} else if (PART == "dial") {
    dial();
} else if (PART == "dial_handle") {
    dial_handle();
} else {
    debug();
    //rail_sizing();
    //debug2();
}