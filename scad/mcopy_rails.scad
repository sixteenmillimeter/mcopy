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

RailSpacing = 140; //100
RailVoid = 20.4;
ThreadedRodSpacing = 50;
RailEndX = RailSpacing + 72;
TNutVoid = 17;
BoltSpacingX = RailSpacing - 30;

module rail_debug (H = 175) {
    color("lime") linear_extrude(height=H) {
        2020_profile();
    }
}

module m3_bolt_void (pos = [0, 0, 0], BoltH = 20, CapH = 3) {
	D = 3.25;
    CapD = 6;
	translate(pos) {
        translate([0, 0, CapH / 2]) cylinder(r = R(CapD), h = CapH, center = true, $fn = 40);
		translate([0, 0, -BoltH / 2]) cylinder(r = R(D), h = BoltH + 0.01, center = true, $fn = 40);
	}
}

module bolt_voids_2020 (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate (rot) {
        translate([0, -25, 0]) rotate([90, 0, 0]) m3_bolt_void(CapH = 6);
        translate([0, 25, 0]) rotate([-90, 0, 0]) m3_bolt_void(CapH = 20);
        translate([-25, 0, 0]) rotate([0, -90, 0]) m3_bolt_void(CapH = 6, BoltH = 20);
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
            bolt_voids_2020([-RailSpacing / 2, 0, -15 + 5 + 7 ]);
            bolt_voids_2020([RailSpacing / 2, 0, -15 + 5 + 7], [0, 180, 0]);
            
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
        cylinder(r = R(27), h = 11, center = true, $fn = 120);
        translate([0, -27 / 2, 0]) cube([27, 27, 11 ], center = true, $fn = 60);
        
        cylinder(r = R(8.3), h = 16, center = true, $fn = 80);
        translate([0, -50, 0]) cube([8.3, 100, 16 ], center = true, $fn = 60);
        cylinder(r = R(5.2), h = 40, center = true, $fn = 60);
        translate([0, 0, 27]) cylinder(r = R(9), h = 30, center = true, $fn = 60);
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

module side_lens_sled_bearing_plate (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Y = 40;
    translate(pos) rotate(rot) {
        difference () {
           cube([25, Y, 15.9], center = true);
           //sides
           translate([-9, 24, 0]) cube([25, Y, 15.9 + 1], center = true);
           translate([-9, -24 , 0]) cube([25, Y, 15.9 + 1], center = true);
           //inner
           translate([-1, 0, 0]) cylinder(r = R(27), h = 11, center = true, $fn = 120);
           translate([-10, 0, 0]) cube([25, Y, 11], center = true);
           translate([-14, 0, 0])cube([25, Y, 15.9 + 1], center = true);
           translate([-2, 0, 0]) cylinder(r = R(8), h = 15.9 + 1, center = true, $fn = 60);
           
           //m5
           translate([0, 16, 0]) rotate([0, 90, 0]) cylinder(r = R(5.2), h = 40, center = true, $fn = 40);
           translate([0, -16, 0]) rotate([0, 90, 0]) cylinder(r = R(5.2), h = 40, center = true, $fn = 40);
           
        }    
    }
}

module lens_sled_m3_bolt_voids (pos = [0, 0, 0], rot = [0, 0, 0]) {
    D = 16;
    translate(pos) rotate(rot) {
        translate([0, 0, D]) m3_bolt_void(CapH = 10);
        translate([0, 0, -D]) rotate([0, 180, 0]) m3_bolt_void(CapH = 10);
        translate([D, 0, 0]) rotate([0, 90, 0]) m3_bolt_void(CapH = 10);
        translate([-D, 0, 0]) rotate([0, -90, 0]) m3_bolt_void(CapH = 10);
    }
}

module lens_sled_m5_bolt_nut_voids (pos = [0, 0, 0], rot = [0, 0, 0], Angle = 360/12) {
    translate(pos) rotate(rot) {
        cylinder(r = R(5.2), h = 40, center = true, $fn = 40);
        translate([0, 0, -3.5]) rotate([0, 0, Angle]) hex(9.2, 5);
    }
}

module extrusion_block (pos = [0, 0, 0], rot = [0, 0, 0], Y = 40, Z = 30, End = false) {
    translate(pos) rotate(rot) {
        difference () {
            cube([Y, Z,  Y], center = true);
            cube([RailVoid, Z + 1, RailVoid], center = true);
        }
        if (End) {
            end_2020([0, 0, 0], [90, 0, 0]);
        }
    }
}

module lens_sled (pos = [0, 0, 0], rot = [90, 0, 0]) {
    Y = 40;
    LensDriveX = -ThreadedRodSpacing / 2;
    LensFrameSpacingX = (RailEndX / 2) - (Y / 2);
    LensFrameM3VoidsZ = (60 / 2) + (40 / 2) - 12.5 + 5 + 6;
    
    translate(pos) rotate(rot) {
        difference () {
            union () {
                sled(rot = [0, 0, 0], Length = Y);
                extrusion_block([LensFrameSpacingX, (60 / 2) + (40 / 2) - 5, 0]);
                extrusion_block([-LensFrameSpacingX, (60 / 2) + (40 / 2) - 5, 0]);
                translate([LensFrameSpacingX - 35 - 25, 48, 0]) cube([10, 21, 40], center = true);
            }
            T_nut_void ([LensDriveX, 0, (Y / 2) - (TNutVoid / 2) + 0.01], [180, 0, 0]);
            T_nut_void ([LensDriveX, 0, -(Y / 2) + (TNutVoid / 2) - 0.01]);
            //camera drive passthrough
            translate([-LensDriveX, 0, 0]) cylinder(r = R(ThreadDiameter + 1), h = Y + 1, center = true, $fn = 60);
            //
            top_sled_bearing_void([RailSpacing / 2, 21.5, 0], [0, 90, 0]);
            top_sled_bearing_void([-RailSpacing / 2, 21.5, 0], [0, -90, 0]);
            
            side_sled_bearing_void([(RailSpacing / 2) + 21.5, 0, 0], [90, -90, 0]);
            side_sled_bearing_void([-(RailSpacing / 2) - 21.5, 0, 0], [-90, -90, 0]);
            
            //
            lens_sled_m3_bolt_voids([(RailEndX / 2) - (Y / 2), LensFrameM3VoidsZ, 0]);
            lens_sled_m3_bolt_voids([(-RailEndX / 2) + (Y / 2), LensFrameM3VoidsZ, 0]);
            
            //m5 bolt + nut
            lens_sled_m5_bolt_nut_voids([(RailEndX / 2) - (40 / 2), 0, 16], [0, 90, 0]);
            lens_sled_m5_bolt_nut_voids([(RailEndX / 2) - (40 / 2), 0, -16], [0, 90, 0]);
            lens_sled_m5_bolt_nut_voids([(-RailEndX / 2) + (40 / 2), 0, 16], [0, -90, 0]);
            lens_sled_m5_bolt_nut_voids([(-RailEndX / 2) + (40 / 2), 0, -16], [0, -90, 0]);
            
            //motor void
            translate([LensFrameSpacingX - 35, 50 + 37.5, 0]) cube([42.25, 100, 42.25], center = true);
            //threaded rod void
            translate([LensFrameSpacingX - 35, 50 + 37.5 - 10, 0]) rotate([90, 0, 0]) cylinder(r = R(9), h = 100, center = true, $fn = 60);
            
            //motor bolts
            lens_sled_m5_bolt_nut_voids([LensFrameSpacingX - 35 - 27, 50, 12], [0, -90, 0], Angle = 0);
            lens_sled_m5_bolt_nut_voids([LensFrameSpacingX - 35 - 27, 50, -12], [0, -90, 0], Angle = 0);
            
            //linear bolts
            translate([-LensFrameSpacingX + 35, 50 + 37.5 - 10, 0]) rotate([90, 0, 0]) cylinder(r = R(8.6), h = 100, center = true, $fn = 60);
        }
        //rail ends for snug fit
        
        difference () {
            end_2020([LensFrameSpacingX, LensFrameM3VoidsZ - (6 / 2) - 5.1, 0], [90, 0, 0]);
            translate([LensFrameSpacingX, LensFrameM3VoidsZ - (6 / 2) - 5.1, 13]) rotate([0, 45, 0]) cube([20, 20, 20], center = true);
        }
        
        difference () {
            end_2020([-LensFrameSpacingX, LensFrameM3VoidsZ - (6 / 2) - 5.1, 0], [90, 0, 0]);
            translate([-LensFrameSpacingX, LensFrameM3VoidsZ - (6 / 2) - 5.1, 13]) rotate([0, 45, 0]) cube([20, 20, 20], center = true);
        }
        //debug
        //translate([-ThreadedRodSpacing / 2, 0, -(Y / 2) + 8.4]) T_nut();
        //translate([-ThreadedRodSpacing / 2, 0, (Y / 2) - 7.5]) rotate([180, 0, 0]) T_nut();
        //translate([LensFrameSpacingX - 35, 40, 0]) rotate([-90, 0, 0]) NEMA17(H = 20);
    }
}

module end_2020 (pos = [0, 0, 0], rot = [0, 0, 0], Z = 5) {
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cube([24, 5, Z], center = true);
                cube([5, 24, Z], center = true);
                cube([16.6, 11, Z], center = true);
                cube([11, 16.5, Z], center = true);
            }
            cube([8, 8, Z + 1], center = true);
            rotate([0, 0, 45]) cube([2, 40, Z + 1], center = true);
            rotate([0, 0, -45]) cube([2, 40, Z + 1], center = true);
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

module debug () {
    //translate([50 , -90 - 10, 22]) rotate([0, 90, 0]) bearing_void();
    //rail_end();
    //camera_sled([0, -90, 0]);
    //difference () {
        //lens_sled([0, -90, 0]);
        //translate([ 50 + (RailSpacing / 2), -90 - 50, 0]) cube([100, 100, 100], center = true);
        //translate([ -50 - (RailSpacing / 2), -90, 0]) cube([100, 100, 100], center = true);
    //}
    
    //color("green") translate([RailSpacing / 2, -90 + 15, 20]) rotate([0, 0, 0]) linear_extrude(height=100) 2020_profile();
    //difference () {
    //intersection() {
        //lens_sled([0, -90, 0]);
        //translate([-30, -90 + 30 - 1, 10]) cube([90, 60, 45], center = true);
        //translate([150, -90, 50]) cube([200, 100, 100], center = true); 
    //}

    /*translate([RailSpacing / 2, -90, 21.5]) rotate([0, 90, 0]) {
        bearing_roller();
        bearing_roller_inner();
    }
    
    translate([(RailSpacing / 2) + 21.5, -90, 0]) rotate([0, 0, 0]) {
        bearing_roller();
        bearing_roller_inner();
    }
    
    color("blue") side_lens_sled_bearing_plate([(RailSpacing / 2) + 23.5, -90, 0]);
    */
    
    //bearing_roller();

    //debug
    //translate([-RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) rail_debug(175);
    //color("green") translate([RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) linear_extrude(height=175) 2020_profile();

    //translate([ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0])  color("blue") NEMA17();
    //translate([-ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0])  color("blue") NEMA17();
}


PART = "lens_sledx";

if (PART == "rail_end") {
    rail_end();
} else if (PART == "rail_end_idle") {
    rail_end(Motors = false, Projector = true);
} else if (PART == "lens_sled") {
    rotate([-90, 0, 0]) lens_sled();
} else if (PART == "bearing_roller") {
    bearing_roller();
} else if (PART == "bearing_roller_inner") {
    rotate([180, 0, 0]) bearing_roller_inner();
} else if (PART == "side_lens_sled_bearing_plate") {
    rotate([0, 90, 0]) side_lens_sled_bearing_plate();
} else {
    debug();
}