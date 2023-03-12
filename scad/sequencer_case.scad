include <./arduino.scad>;
include <./common/common.scad>;

DEBUG = false;

casePostZ = -1.5;
casePostPosition1 = [36, -31, casePostZ];
casePostPosition2 = [-36, 31, casePostZ];

module rounded_cube (c, d) {
    r = d / 2;
    scaled = [c[0] - d, c[1] - d, c[2] - d];
    minkowski() {
        sphere(r = r);
        cube(scaled, center = true);
    }
}

module cable_void (pos = [0, 0, 0], rot = [90, 0, 0], H = 10 + 1) {
    translate(pos) rotate(rot) cylinder(r = R(5), h = H, center = true);
}

module cable_plug_void (pos = [0, 0, 0]) {
    translate(pos) difference () {
        rotate([90, 0, 0]) cylinder(r = R(9), h = 5, center = true);
        cable_void();
    }
}

module arduino_uno_standoffs (pos) {
    difference () {
        translate(pos) rotate([0, 0, 90]) standoffs(UNO, mountType=PIN);
        translate([0, 0, -29]) cube([85, 75, 30], center = true);
    }
}


module case_shell (pos = [0,0,0]) {
    translate(pos) difference () {
        rounded_cube([85, 75, 30], 8);
        rounded_cube([85 - 6, 75 - 6, 30 - 6], 6);
    }
}

module case_post (pos = [0, 0, 0], H = 23) {
    translate(pos) difference () {
        cylinder(r = R(7), h = H, center = true);
        translate([0, 0, 15]) cylinder(r = 2 / 2, h = 23, center = true);
    }
}

module case_bottom (pos = [0, 0, 0], board = "uno", cables = 2) {
    $fn = 60;
    plugPosition1 = [20, -37, 0];
    plugPosition2 = [-20, -37, 0];
    translate(pos) {
        difference () {
            case_shell();
            translate([0, 0, 25]) cube([85, 75, 30], center = true);

            if (board == "uno") {
                translate([40, -6.5, 4]) cube([15, 13, 20], center = true);
            }
            if (cables > 0) cable_void(plugPosition1);
            if (cables > 1) cable_void(plugPosition2);
        }
        
        if (cables > 0) cable_plug_void(plugPosition1);
        if (cables > 1) cable_plug_void(plugPosition2);
        
        if (board == "uno") {
            arduino_uno_standoffs([36, -22, -17]);
        } else if (board == "nano") {

        }
        /*
        //foot
        translate([0, 42, -(30 / 2) + (5 / 2) - 1.5]) difference () {
            rounded_cube([20, 20, 10], 4);
            translate([0, 0, -6]) cube([20, 20, 10], center = true);
            translate([0, -17, 6]) cube([20, 20, 10], center = true);
            translate([0, 3, 0]) cylinder(r = 4 / 2, h = 10, center = true);
        }
        
        //foot
        translate([0, -42, -(30 / 2) + (5 / 2) - 1.5]) difference () {
            rounded_cube([20, 20, 10], 4);
            translate([0, 0, -6]) cube([20, 20, 10], center = true);
            translate([0, 17, 6]) cube([20, 20, 10], center = true);
            translate([0, -3, 0]) cylinder(r = 4 / 2, h = 10, center = true);
        }*/
        
        case_post(casePostPosition1);
        case_post(casePostPosition2);
    }
}

module case_top (pos = [0,0,0], board = "uno") {
    $fn = 60;
    translate(pos) difference () {
        rounded_cube([85, 75, 30], 8);
        //case_shell([0, 0, 3]);
        translate([0, 0, 17]) cube([85, 75, 30], center = true);
        translate([0, 0, -17]) cube([85, 75, 30], center = true);
        translate([36, -31, 0]) {
            cylinder(r = 2 / 2, h = 23, center = true);
            translate([0, 0, 23 / 2]) cylinder(r = 4 / 2, h = 23, center = true);
        }
        translate([-36, 31, 0]) {
            cylinder(r = 2 / 2, h = 23, center = true);
            translate([0, 0, 23 / 2]) cylinder(r = 4 / 2, h = 23, center = true);
        }
    }
}

PART="bottom_nano";

if (PART == "bottom_uno") {
    case_bottom(board = "uno");
    if (DEBUG) {
        translate([36, -22, -7]) rotate([0, 0, 90]) arduino();
        //translate([0, 0, 20]) case_top();
    }
}else if (PART == "bottom_nano") {
    case_bottom(board = "nano", cables = 1);
    //case_top([0, 0, 20]);
} else if (PART == "top") {
    case_top();
} else if (PART == "top_nano") {
    case_top_nano(board = "nano");
}