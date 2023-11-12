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

IN = 25.4;

RailSpacing = 110; //100
RailVoid = 20.4;
ThreadedRodSpacing = 50;
RailEndX = RailSpacing + 72;
TNutVoid = 17;
BoltSpacingX = RailSpacing - 30;

LensFrameSpacingX = 100;
LensRodsOffsetZ = -15;

ProjectorFrameSpacingX = (5 * IN) - 20;

OrbitalPlateD = 136;

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
        translate([0, 0, CapH / 2]) cylinder(r = R(CapD), h = CapH, center = true, $fn = 40);
		translate([0, 0, -BoltH / 2]) cylinder(r = R(D), h = BoltH + 0.01, center = true, $fn = 40);
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

module T_nut_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        cylinder(r = R(TNutDiameter2 + 0.1), h = TNutVoid + .01, center = true, $fn = 60);
        translate([0, 0, -(TNutVoid / 2) + (6 / 2)]) cylinder(r = R(TNutDiameter1 + 0.1), h = 6.01, center = true, $fn = 60);
        translate([8, 0, 0]) cylinder(r = R(3), h = 10, center = true, $fn = 30);
        translate([-8, 0, 0]) cylinder(r = R(3), h = 10, center = true, $fn = 30);
        translate([0, 8, 0]) cylinder(r = R(3), h = 10, center = true, $fn = 30);
        translate([0, -8, 0]) cylinder(r = R(3), h = 10, center = true, $fn = 30);
    }
}

module bearing_void (pos = [0, 0, 0], Width = 8, Hole = true, Fuzz = 0.1) {
    $fn = 80;
	innerD = 8.05;
	outerD = 22.1 - .4;
	
	color("blue") translate (pos) difference () {
		cylinder(r = R(outerD) + Fuzz, h = Width, center = true);
		if (Hole) cylinder(r = R(innerD) - Fuzz, h = Width + 1, center = true);
	}
}

module mounting_bolt_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        cylinder(r = R(10), h = 150, center = true, $fn = 40);
        translate([0, 0, 0]) cylinder(r = R(20), h = 8, center = true, $fn = 60);
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
            translate([-RailSpacing / 2, 0, 5]) cube([RailVoid, RailVoid, 40], center = true);
            translate([RailSpacing / 2, 0, 5]) cube([RailVoid, RailVoid, 40], center = true);
            
            //rails bolts
            bolt_voids_2020([-RailSpacing / 2, 0, -15 + 5 + 7 ], Projector = Projector);
            bolt_voids_2020([RailSpacing / 2, 0, -15 + 5 + 7], [0, 180, 0], Projector = Projector);
            
            if (Motors) {
                //camera drive motor
                translate([ThreadedRodSpacing / 2, 0, 0]) {
                    cylinder(r = R(NEMA17PadD + 0.5), h = 60, center = true, $fn = 100);
                    bolt_voids_motor([0, 0, 16 - 21]);
                }
                
                //lens drive motor
                translate([-ThreadedRodSpacing / 2, 0, 0]) {
                    cylinder(r = R(NEMA17PadD + 0.5), h = 60, center = true, $fn = 100);
                    bolt_voids_motor([0, 0, 16 - 21]);
                }
            } else {
                translate([ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(LinearBearingOuterDiameter + 0.4), h = 60, center = true, $fn = 100);
                translate([-ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(LinearBearingOuterDiameter + 0.4), h = 60, center = true, $fn = 100);
            }
            
            //linear motion rod
            translate([0, 0, 5]) cylinder(r = R(ThreadDiameter), h = 40, center = true, $fn = 50);
            
            //mounting bolts
            mounting_bolt_void([BoltSpacingX / 2, -41, 40], [90, 0, 0]);
            mounting_bolt_void([-BoltSpacingX / 2, -41, 40], [90, 0, 0]);
        }
        end_2020([-RailSpacing / 2, 0, -15 + 2.4]);
        end_2020([RailSpacing / 2, 0, -15 + 2.4]);
    }
    if (Projector) {
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

echo("sled");
echo("BOM: ", "(2) T8 Nut");
echo("BOM: ", "(1 or 2) Linear bearing");
echo("BOM: ", "(4 or 8) Radial bearings ()");
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
        cylinder(r = R(LinearMotionDiameter + 1), h = Z + 1, center = true, $fn = 60);
        
        //linear motion rod bearing voids
        translate([0, 0, (Length / 2) - (LinearBearingHeight / 2) + 0.01]) cylinder(r = R(LinearBearingOuterDiameter + 0.2), h = LinearBearingHeight, center = true, $fn = 100);
        translate([0, 0, -(Length / 2) + (LinearBearingHeight / 2) - 0.01]) cylinder(r = R(LinearBearingOuterDiameter + 0.2), h = LinearBearingHeight, center = true, $fn = 100);
        
        //threaded rod voids
        translate([ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(ThreadDiameter + 2), h = Z + 1, center = true, $fn = 60);
        translate([-ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(ThreadDiameter + 2), h = Z + 1, center = true, $fn = 60);
        
    }
}

module camera_sled (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) sled(Length = 110);
}

module top_sled_bearing_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        //bearing void
        cylinder(r = R(27), h = 11, center = true, $fn = 120);
        translate([0, -27 / 2, 0]) cube([27, 27, 11 ], center = true, $fn = 60);
        
        cylinder(r = R(8.3), h = 16, center = true, $fn = 80);
        translate([0, -50, 0]) cube([8.3, 100, 16 ], center = true, $fn = 60);
        cylinder(r = R(5.2), h = 40, center = true, $fn = 60);
        translate([0, 0, 27 + 15]) cylinder(r = R(9), h = 60, center = true, $fn = 60);
    }
}

module side_sled_bearing_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        cylinder(r = R(27), h = 11, center = true, $fn = 120);
        translate([0, -27 / 2, 0]) cube([27, 27, 11 ], center = true, $fn = 60);
        translate([0, 1, 0]) {
            cylinder(r = R(8.3), h = 16, center = true, $fn = 80);
            translate([0, -50, 0]) cube([8.3, 100, 16 ], center = true, $fn = 60);
        }
        translate([0, -18, 0]) cube([50, 27, 16.2], center = true, $fn = 60);
        /*translate([0, -35 / 2, 0]) rotate([90, 0, 0]) {
            cylinder(r = R(5.2), h = 40, center = true, $fn = 60);
            translate([0, 0, 27]) cylinder(r = R(9), h = 30, center = true, $fn = 60);
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

module lens_sled_m5_bolt_nut_voids (pos = [0, 0, 0], rot = [0, 0, 0], Angle = 360/12) {
    translate(pos) rotate(rot) {
        cylinder(r = R(5.2), h = 40, center = true, $fn = 40);
        translate([0, 0, -3.5]) rotate([0, 0, Angle]) hex(9.2, 5);
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
    LensDriveX = -ThreadedRodSpacing / 2;
    
    LensFrameBlockY = (60 / 2) + (40 / 2) - 5;
    LensFrameM3VoidsZ = (60 / 2) + (40 / 2) - 12.5 + 5 + 6;
    LensFrameOffsetZ = 20;

    BearingsSpacing = 28;
    BearingM5Spacing = 62;

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
            T_nut_void ([LensDriveX, 0, (Y / 2) - (TNutVoid / 2) + 0.01], [180, 0, 0]);
            T_nut_void ([LensDriveX, 0, -(Y / 2) + (TNutVoid / 2) - 0.01]);
            
            //camera drive threaded rod passthrough
            translate([-LensDriveX, 0, 0]) cylinder(r = R(ThreadDiameter + 1), h = Y + 1, center = true, $fn = 60);
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
            
            lens_sled_m5_bolt_nut_voids([(RailEndX / 2) - (40 / 2), 0, BearingM5Spacing / 2], [0, 90, 0]);
            lens_sled_m5_bolt_nut_voids([(RailEndX / 2) - (40 / 2), 0, -BearingM5Spacing / 2], [0, 90, 0]);
            lens_sled_m5_bolt_nut_voids([(-RailEndX / 2) + (40 / 2), 0, BearingM5Spacing / 2], [0, -90, 0]);
            lens_sled_m5_bolt_nut_voids([(-RailEndX / 2) + (40 / 2), 0, -BearingM5Spacing / 2], [0, -90, 0]);
            

            //motor void
            translate([LensFrameSpacingX - 35, 50 + 37.5, LensRodsOffsetZ]) cube([42.25, 100, 42.25], center = true);
            //threaded rod void
            translate([LensFrameSpacingX - 35, 50 + 37.5 - 10, LensRodsOffsetZ]) rotate([90, 0, 0]) cylinder(r = R(9), h = 100, center = true, $fn = 60);
            
            //motor bolts
            lens_sled_m5_bolt_nut_voids([LensFrameSpacingX - 35 - 27, 47, 12 + LensRodsOffsetZ], [0, -90, 0], Angle = 0);
            lens_sled_m5_bolt_nut_voids([LensFrameSpacingX - 35 - 27, 47, -12 + LensRodsOffsetZ], [0, -90, 0], Angle = 0);
            
            //linear bolts
            translate([-LensFrameSpacingX + 35, 50 + 37.5 - 10, LensRodsOffsetZ]) rotate([90, 0, 0]) cylinder(r = R(8.6), h = 100, center = true, $fn = 60);
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

module side_lens_sled_bearing_plate (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Y = 70;
    BearingSpacing = 28;
    BoltSpacing = 62;
    translate(pos) rotate(rot) {
        difference () {
            cube([25, Y, 15.9], center = true);

            //sides
            translate([-9, 52, 0]) cube([25, Y, 15.9 + 1], center = true);
            translate([-9, -52, 0]) cube([25, Y, 15.9 + 1], center = true);
            translate([-9, 0, 0]) cube([25, 22, 15.9 + 1], center = true);
            //inner
            translate([-1, BearingSpacing / 2, 0]) cylinder(r = R(27), h = 11, center = true, $fn = 120);
            translate([-1, -BearingSpacing / 2, 0]) cylinder(r = R(27), h = 11, center = true, $fn = 120);

            translate([-10, 0, 0]) cube([25, Y, 11], center = true);
            translate([-14, 0, 0])cube([25, Y, 15.9 + 1], center = true);
            translate([-2, BearingSpacing / 2, 0]) cylinder(r = R(8), h = 15.9 + 1, center = true, $fn = 60);
            translate([-2, -BearingSpacing / 2, 0]) cylinder(r = R(8), h = 15.9 + 1, center = true, $fn = 60);

            //m5 bolt voids
            translate([0, BoltSpacing / 2, 0]) rotate([0, 90, 0]) cylinder(r = R(5.2), h = 40, center = true, $fn = 40);
            translate([0, -BoltSpacing / 2, 0]) rotate([0, 90, 0]) cylinder(r = R(5.2), h = 40, center = true, $fn = 40);
        }
    }
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
            cylinder(r = R(D2), h = 10, center = true, $fn = 100);
            cylinder(r = R(D1), h = A, center = true, $fn = 100);
            translate([0, 0, (A / 2) + (1 / 2)]) cylinder(r1 = R(D1), r2 = R(D2), h = 1, center = true, $fn = 100);
            translate([0, 0, -(A / 2) - (1 / 2)]) cylinder(r2 = R(D1), r1 = R(D2), h = 1, center = true, $fn = 100);
        }
        translate([0, 0, 1]) bearing_void(Hole = false, Fuzz = 0.3, Width = 9.01);
        cylinder(r = R(19.5), h = 10 + 1, center = true, $fn = 100);
    }
}

module bearing_roller_inner (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) difference () {
        union () {
            cylinder(r = R(7.8), h = 15, center = true, $fn = 60);
            translate([0, 0, 4.5]) cylinder(r = R(11), h = 1, center = true, $fn = 80);
        }
        cylinder(r = R(5.25), h = 20 + 1, center = true, $fn = 60);
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
                translate([LensFrameSpacingX - 35, -LensRodsOffsetZ + 20, -3]) cylinder(r = R(22), h = 25, center = true, $fn = 120);
                
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
                cylinder(r = R(ThreadDiameter + 1), h = 40, center = true, $fn = 60);
            }

            translate([-LensFrameSpacingX + 35, -LensRodsOffsetZ + 20, -5]) {
                cylinder(r = R(ThreadDiameter + 0.1), h = 40, center = true, $fn = 60);
            }

            //center bolt
            m3_bolt_void([0, 0, 12.75]);
            translate([0, 0, 6.35]) cube([7, 7, 8], center = true); 
            
            //linear rod m4 bolt void
            translate([-73, 35, -3]) {
                translate([0, 0, -10]) cube([3.1, 8.25, 20], center = true);
                rotate([90, 0, 90]) {
                    m4_nut();
                    cylinder(r = R(4), h = 15, center = true, $fn = 30);
                }
            }
        }
    }
}

module projector_orbital_brace (pos = [0, 0, 0], rot = [0, 0, 0]) {
    X = 5 * IN;
    Y = 150;
    Z = 9;
    PlateD = OrbitalPlateD;
    InnerD = 63.5;
    M5SpacingX = 70;
    M5SpacingY = 123;
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
        translate([0, 0, -6.5]) cylinder(r = R(PlateD), h = Z, center = true, $fn = 300);
        //center
        cylinder(r = R(InnerD), h = Z + 1, center = true, $fn = 120);
        //marks
        translate([(X / 2) + 0.1, 0, 0]) rotate([0, 0, 45]) cube([1, 1, Z + 1], center = true);
        translate([-(X / 2) - 0.1, 0, 0]) rotate([0, 0, 45]) cube([1, 1, Z + 1], center = true);
        
        //two voids
        translate([VoidX, VoidY, 0 ]) cylinder(r = R(VoidD), h = Z + 1, center = true, $fn = 40);
        translate([VoidX, -VoidY, 0 ]) cylinder(r = R(VoidD), h = Z + 1, center = true, $fn = 40);

        //face plate m3 bolt
        m3_bolt_void([ProjectorFrameSpacingX / 2, (Y / 2) - M3BoltY, 1], [180, 0, 0], BoltH = 8, CapH = 10);
        m3_bolt_void([-ProjectorFrameSpacingX / 2, (Y / 2) - M3BoltY, 1], [180, 0, 0], BoltH = 8, CapH = 10);
        m3_bolt_void([ProjectorFrameSpacingX / 2, -(Y / 2) + M3BoltY, 1], [180, 0, 0], BoltH = 8, CapH = 10);
        m3_bolt_void([-ProjectorFrameSpacingX / 2, -(Y / 2) + M3BoltY, 1], [180, 0, 0], BoltH = 8, CapH = 10);
    
        //m3 bolt top brace

        //attachment m5 bolts
        translate([M5SpacingX / 2, M5SpacingY / 2, 0]) cylinder(r = R(5.3), h = Z + 1, center = true, $fn = 40);
        translate([-M5SpacingX / 2, M5SpacingY / 2, 0]) cylinder(r = R(5.3), h = Z + 1, center = true, $fn = 40);
        translate([M5SpacingX / 2, -M5SpacingY / 2, 0]) cylinder(r = R(5.3), h = Z + 1, center = true, $fn = 40);
        translate([-M5SpacingX / 2, -M5SpacingY / 2, 0]) cylinder(r = R(5.3), h = Z + 1, center = true, $fn = 40);
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
            cylinder(r = R(OuterD), h = H, center = true, $fn = 600);
            cylinder(r = R(InnerVoidD), h = H + 1, center = true, $fn = 600);
            translate([0, 0, BaseZ]) cylinder(r = R(PlateD), h = H, center = true, $fn = 600);
            translate([0, 0, BaseZ + 2.75]) cylinder(r = R(CuspD), h = H, center = true, $fn = 600);
            translate([0, 0, 3.01]) cylinder(r1 = R(PlateD), r2 = R(CuspD), h = 0.5, center = true, $fn = 600);
            //slice
            rotate([0, 0, PositionAngle + (Angle / 2)]) translate([0, OuterD / 2, 0]) cube([OuterD + 1, OuterD, H + 1], center = true);
            rotate([0, 0, PositionAngle - (Angle / 2)]) translate([0, -OuterD / 2, 0]) cube([OuterD + 1, OuterD, H + 1], center = true);
            //
            rotate([0, 0, PositionAngle]) translate([BoltX / 2, 0, 0]) cylinder(r = R(5), h = H * 5, center = true, $fn = 40);
            rotate([0, 0, PositionAngle]) translate([BoltX / 2, 0, -6.5 + 3.5]) m5_nut();
        }
    }
}

module debug () {
    //translate([50 , -90 - 10, 22]) rotate([0, 90, 0]) bearing_void();
    //rail_end(Projector = true);
    //color("green") translate([(ProjectorFrameSpacingX / 2), 0, 50]) rotate([0, 0, 0]) linear_extrude(height=240) 2020_profile();
    //color("green") translate([-(ProjectorFrameSpacingX / 2), 0, 50]) rotate([0, 0, 0]) linear_extrude(height=240) 2020_profile();
    //color("green") translate([-((ProjectorFrameSpacingX - 20) / 2), 0, 280]) rotate([0, 90, 0]) linear_extrude(height=ProjectorFrameSpacingX-20) 2020_profile();
    //projector_orbital_brace([0, 14.5, 180], [90, 0, 0]);
    //translate([0, 0, 110]) cube([10, 10, 150], center = true); 
    //corner_bracket([30, 0, 260], [0, 180, 90]);
    //corner_outer_bracket([55, 0, 290], [0, 180, 0]);
    //camera_sled([0, -90, 0]);
    //difference () {
        //lens_sled([0, -90, 0]);
        //translate([ 50 + (RailSpacing / 2), -90 - 50, 0]) cube([100, 100, 100], center = true);
        //translate([ -50 - (RailSpacing / 2), -90, 0]) cube([100, 100, 100], center = true);
    //}
    
    //color("green") translate([(LensFrameSpacingX / 2) + 15, -20, 50]) rotate([0, 0, 0]) linear_extrude(height=200) 2020_profile();
    //color("green") translate([-(LensFrameSpacingX / 2) - 15, -20, 50]) rotate([0, 0, 0]) linear_extrude(height=200) 2020_profile();
    //color("green") translate([-(LensFrameSpacingX + 30 + 20) / 2, -20, 260]) rotate([0, 90, 0]) linear_extrude(height = LensFrameSpacingX + 30 + 20) 2020_profile();
    
    //color("blue") translate([LensFrameSpacingX - 35, -LensRodsOffsetZ, 140]) cylinder(r = R(9), h = 300, center = true, $fn = 60);
    //color("blue") translate([-LensFrameSpacingX + 35, -LensRodsOffsetZ, 140]) cylinder(r = R(9), h = 300, center = true, $fn = 60);

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
    //color("blue") side_lens_sled_bearing_plate([(RailSpacing / 2) + 23.5 + 20, 0, 0]);
    
    //lens_frame_top_gantry([0, -20, 260]);
    
    //bearing_roller();

    //debug
    //translate([-RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) rail_debug(175);
    //color("green") translate([RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) linear_extrude(height=175) 2020_profile();

    //translate([ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0])  color("blue") NEMA17();
    //translate([-ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0])  color("blue") NEMA17();

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
    projector_orbital_brace();
    projector_orbital_brace_corner([0, 0, -8]);
}


PART = "projector_orbital_brace";

if (PART == "rail_end") {
    rail_end(Projector = true);
} else if (PART == "rail_end_idle") {
    rail_end(Motors = false, Projector = false);
} else if (PART == "lens_sled") {
    rotate([90, 0, 0]) lens_sled();
} else if (PART == "bearing_roller") {
    bearing_roller();
} else if (PART == "bearing_roller_inner") {
    rotate([180, 0, 0]) bearing_roller_inner();
} else if (PART == "side_lens_sled_bearing_plate") {
    rotate([0, 90, 0]) side_lens_sled_bearing_plate();
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
} else {
    debug();
}