use <./common/common.scad>;
use <./takeup/takeup.scad>;

COUPLING_D = 37;

WASHER_D = 35.7; //1 + 1/3 diameter?
WASHER_H = 2.4;

MOTOR_SHAFT_D = 6;
MOTOR_SHAFT_H = 16;
MOTOR_SHAFT_HOBBLE = 1;

MOTOR_MOUNT_X = 32.5;
MOTOR_MOUNT_Y = 17.5;

module hex (diag = 10, h = 1) {
    cylinder(r = diag / 2, h = h, center = true, $fn = 6);
}

module motor_shaft () {
    difference () {
        cylinder(r = R(MOTOR_SHAFT_D), h = MOTOR_SHAFT_H, center = true, $fn = 60);
        translate([MOTOR_SHAFT_D - MOTOR_SHAFT_HOBBLE, 0, 0]) cube([MOTOR_SHAFT_D, MOTOR_SHAFT_D, MOTOR_SHAFT_H + 1], center = true);
    }
}

module debug_assembled () {
    translate([(46 / 2) - 14.5, 0, 0]) rotate([180, 0, 0]) geared_motor();
    color("green") translate([0, 0, 11]) mount_plate();
    color("blue") translate([0, 0, 23]) rotate([0, 0, -90]) //magnetic_coupling();
    difference () {
        translate([0, 0, 26.5]) slip_coupling();
        translate([-50, 0, 0]) cube([100, 100, 150], center = true);
    }
    color("red") translate([0, 0, 34]) daylight_spool_insert();
}

PART = "minimal_mountx";

if (PART == "slip_coupling") {
    slip_coupling();
} else if (PART == "magnetic_coupling") {
    magnetic_coupling();
} else if (PART == "mount_plate") {
    //42x42 M4 mounting holes
    mount_plate(); 
} else if (PART == "daylight_spool_insert") {
    daylight_spool_insert();
} else if (PART == "daylight_spool_insert_reinforced") {
    daylight_spool_insert_reinforced();
} else if (PART == "daylight_spool_insert_reinforced_nut") {
    daylight_spool_insert_reinforced_nut();
} else if (PART == "minimal_mount") {
    minimal_mount();
} else {
    debug_assembled();
}
