include<./common/common.scad>;
include<./common/2020_tslot.scad>;

RailsSpacing = 100;
ThreadedRodSpacing = 50;
Length = 400;
ThreadDiameter = 8;
LinearMotionDiameter = 8;

module linear_extrusion_rail (pos = [0, 0, 0], length = 300) {
        translate(pos) rotate([0, 90, 0]) 2020_tslot(length, core = ProfileCore);
}

module threaded_rod (pos = [0, 0, 0], H = 40, pad = 0) {
	color("green") translate(pos) rotate([0, 90, 0]) cylinder(r = R(ThreadDiameter + pad), h = H, center = true, $fn = 60);
}

module linear_motion_rod (pos = [0, 0, 0], H = 40, pad = 0) {
	color("blue") translate(pos) rotate([0, 90, 0]) cylinder(r = R(LinearMotionDiameter + pad), h = H, center = true, $fn = 60);
}

module rails () {
    linear_extrusion_rail([0, RailsSpacing / 2, 0], length = Length);
    linear_extrusion_rail([0, -RailsSpacing / 2, 0], length = Length);
    threaded_rod([0, ThreadedRodSpacing / 2, 0], H = Length);
    threaded_rod([0, -ThreadedRodSpacing / 2, 0], H = Length);
    linear_motion_rod(H = Length);
    sled();
}

module sled (pos = [0, 0, 0], length = 50) {
    X = length;
    Y = RailsSpacing + 40;
    Z = 50;
    translate(pos) difference () {
        rotate([0, 90, 0]) rounded_cube([Z, Y, X], d = 10, center = true, $fn = 50);
        translate([0, RailsSpacing / 2,0]) cube([X + 1, 22, 22], center = true);
    }
}

rails();