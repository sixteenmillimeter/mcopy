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

RailSpacing = 100;
ThreadedRodSpacing = 50;
RailEndX = 140;
TNutVoid = 17;

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

module bolt_voids_2020 (pos = [0, 0, 0]) {
    translate(pos) {
        //translate([0, -25, 0]) rotate([90, 0, 0]) m3_bolt_void(CapH = 6);
        translate([0, 25, 0]) rotate([-90, 0, 0]) m3_bolt_void(CapH = 6);
        translate([-16, 0, 0]) rotate([0, -90, 0]) m3_bolt_void(CapH = 6, BoltH = 10);
    }
}

module bolt_voids_motor (pos = [0, 0, 0]) {
    Corner = NEMA17BoltSpacing / 2;
    translate(pos) {
        translate([Corner, Corner, 0]) m3_bolt_void(CapH = 6, BoltH = 40);
        translate([Corner, -Corner, 0]) m3_bolt_void(CapH = 6, BoltH = 40);
        translate([-Corner, Corner, 0]) m3_bolt_void(CapH = 6, BoltH = 40);
        translate([-Corner, -Corner, 0]) m3_bolt_void(CapH = 6, BoltH = 40);
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

module rail_end (pos = [0, 0, 0], rot = [90, 0, 0], Motors = true) {
    translate(pos) rotate(rot) difference () {
        difference () {
            translate([0, -10, 20]) rounded_cube([RailEndX, 80, 80], d = 10, center = true, $fn = 50);
            translate([0, 10, 50]) rotate([0, 90, 0]) rounded_cube([60, 80, RailEndX + 1], d = 10, center = true, $fn = 50);
        }
        
        //rails
        translate([-RailSpacing / 2, 0, 5]) cube([21, 21, 40], center = true);
        translate([RailSpacing / 2, 0, 5]) cube([21, 21, 40], center = true);
        
        //rails bolts
        bolt_voids_2020([-RailSpacing / 2, 0, 0]);
        rotate([0, 180, 0]) bolt_voids_2020([-RailSpacing / 2, 0, 0]);
        if (Motors) {
        
            //camera drive motor
            translate([ThreadedRodSpacing / 2, 0, 0]) {
                cylinder(r = R(NEMA17PadD + 0.5), h = 60, center = true, $fn = 100);
                bolt_voids_motor([0, 0, 16]);
            }
            
            //lens drive motor
            translate([-ThreadedRodSpacing / 2, 0, 0]) {
                cylinder(r = R(NEMA17PadD + 0.5), h = 60, center = true, $fn = 100);
                bolt_voids_motor([0, 0, 16]);
            }
        } else {
            translate([-ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(LinearBearingOuterDiameter + 0.5), h = 60, center = true, $fn = 100);
            translate([-ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(LinearBearingOuterDiameter + 0.5), h = 60, center = true, $fn = 100);
        }
        
        //linear motion rod
        translate([0, 0, 5]) cylinder(r = R(ThreadDiameter), h = 40, center = true, $fn = 50);
        
        //mounting bolts
        translate([70 / 2, 0, 40]) rotate([90, 0, 0]) cylinder(r = R(10), h = 150, center = true, $fn = 40);
        translate([-70 / 2, 0, 40]) rotate([90, 0, 0]) cylinder(r = R(10), h = 150, center = true, $fn = 40);
    }
}

module sled (pos = [0, 0, 0], rot = [90, 0, 0], Length = 50) {
    X = RailEndX;
    Y = 50;
    Z = Length;
    translate(pos) rotate(rot) difference () {
        translate([0, 10, 0]) rounded_cube([X, Y, Z], d = 10, center = true, $fn = 50);
        //extrusion rails
        translate([-RailSpacing / 2, 0, 0]) cube([21, 21, Z + 1], center = true);
        translate([RailSpacing / 2, 0, 0]) cube([21, 21, Z + 1], center = true);
        //linear motion rod void
        cylinder(r = R(LinearMotionDiameter + 1), h = Z + 1, center = true, $fn = 60);
        
        //linear motion rod bearing voids
        translate([0, 0, (Length / 2) - (LinearBearingHeight / 2) + 0.01]) cylinder(r = R(LinearBearingOuterDiameter + 0.2), h = LinearBearingHeight, center = true, $fn = 100);
        translate([0, 0, -(Length / 2) + (LinearBearingHeight / 2) - 0.01]) cylinder(r = R(LinearBearingOuterDiameter + 0.2), h = LinearBearingHeight, center = true, $fn = 100);
        
        //threaded rod voids
        translate([ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(ThreadDiameter + 1), h = Z + 1, center = true, $fn = 60);
        translate([-ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(ThreadDiameter + 1), h = Z + 1, center = true, $fn = 60);
        
    }
}

module camera_sled (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) sled(Length = 110);
}

module lens_sled (pos = [0, 0, 0], rot = [90, 0, 0]) {
    Y = 50;
    LensDriveX = -ThreadedRodSpacing / 2;
    translate(pos) rotate(rot) {
        difference () {
            sled(rot = [0, 0, 0], Length = Y);
            T_nut_void ([LensDriveX, 0, (Y / 2) - (TNutVoid / 2) + 0.01], [180, 0, 0]);
            T_nut_void ([LensDriveX, 0, -(Y / 2) + (TNutVoid / 2) - 0.01]);
            //camera drive passthrough
            translate([-LensDriveX, 0, 0]) cylinder(r = R(ThreadDiameter + 1), h = Y + 1, center = true, $fn = 60);
            //
            translate([RailSpacing / 2, 21.5, 10]) rotate([0, 90, 0]) {
                difference () {
                    cylinder(r = R(26), h = 11, center = true, $fn = 100);
                    cylinder(r = R(7.75), h = 11 + 1, center = true, $fn = 100);
                }
            }
        }
        
        //debug
        //translate([-ThreadedRodSpacing / 2, 0, -(Y / 2) + 8.4]) T_nut();
        //translate([-ThreadedRodSpacing / 2, 0, (Y / 2) - 7.5]) rotate([180, 0, 0]) T_nut();
    }
}

module bearing_roller () {
    A = 5.75;
    D1 = 25.4;
    D2 = 24;
    difference () {
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

//translate([50 , -90 - 10, 22]) rotate([0, 90, 0]) bearing_void();
//rail_end();
//camera_sled([0, -90, 0]);
//lens_sled([0, -90, 0]);
//difference () {
//intersection() {
    //lens_sled([0, -90, 0]);
    //translate([-30, -90 + 30 - 1, 10]) cube([90, 60, 45], center = true);
    //translate([150, -90, 50]) cube([200, 100, 100], center = true); 
//}

//translate([RailSpacing / 2, -90 - 10, 21.5]) rotate([0, 90, 0]) 
//bearing_roller();
//bearing_roller();

//debug
//translate([-RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) rail_debug(175);
//translate([RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) linear_extrude(height=175) 2020_profile();

//translate([ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0])  color("blue") NEMA17();
//translate([-ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0])  color("blue") NEMA17();

PART = "rail_end";

if (PART == "rail_end") {
    rail_end();
}