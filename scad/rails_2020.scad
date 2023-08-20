use <2020_profile.scad>
//include <jk_rails.scad>
include <./common/motors.scad>
include <./common/rod.scad>

RailSpacing = 100;
ThreadedRodSpacing = 30;
RailEndX = 140;



module rounded_cube (c, d) {
    r = d / 2;
    scaled = [c[0] - d, c[1] - d, c[2] - d];
    minkowski() {
        cylinder(r = r, h = r, center = true);
        cube(scaled, center = true);
    }
}

module rail_end (pos = [0, 0, 0], rot = [90, 0, 0]) {
    translate(pos) rotate(rot) difference () {
        rounded_cube([RailEndX, 60, 40], d = 10, $fn = 50);
        //rails
        translate([-RailSpacing / 2, 0, 0]) cube([21, 21, 40 + 1], center = true);
        translate([RailSpacing / 2, 0, 0]) cube([21, 21, 40 + 1], center = true);
        //threaded rods motors
        translate([-ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(10), h = 60, center = true, $fn = 100);
        translate([ThreadedRodSpacing / 2, 0, 0]) cylinder(r = R(NEMA17PadD), h = 60, center = true, $fn = 100);
        //translate([0, 0, 0])cylinder(r = 5, h = 40 + 1, center = true);
        //translate([-10, 0, 0])cylinder(r = 5, h = 40 + 1, center = true);
    }
}
rail_end();

//translate([-35, 0, -25]) linear_extrude(height=175) 2020_profile();
translate([RailSpacing / 2, 0, 0]) rotate([90, 0, 0]) linear_extrude(height=175) 2020_profile();

translate([ThreadedRodSpacing / 2, 40, 0]) rotate([90, 0, 0])  color("blue") NEMA17();