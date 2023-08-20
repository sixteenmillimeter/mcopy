use <2020_profile.scad>
//include <jk_rails.scad>
include <./common/common.scad>
include <./common/motors.scad>
include <./common/rods.scad>

RailSpacing = 100;
ThreadedRodSpacing = 50;
RailEndX = 140;

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
            translate([ThreadedRodSpacing / 2, 0, 0]) {
                cylinder(r = R(NEMA17PadD + 0.5), h = 60, center = true, $fn = 100);
                bolt_voids_motor([0, 0, 16]);
            }
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

rail_end();

//translate([-35, 0, -25]) linear_extrude(height=175) 2020_profile();
//translate([RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) linear_extrude(height=175) 2020_profile();

//translate([ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0])  color("blue") NEMA17();
//translate([-ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0])  color("blue") NEMA17();
