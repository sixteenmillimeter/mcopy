include <./common/common.scad>;
include <./daylight_spool_mount.scad>;

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

module motor_mounts () {
    Z = 1.5;
    D = 7.5 + 0.3;
    
    translate([MOTOR_MOUNT_X / 2, MOTOR_MOUNT_Y / 2, 0]) motor_mount_pad(D, Z);
    translate([-MOTOR_MOUNT_X / 2, MOTOR_MOUNT_Y / 2, 0]) motor_mount_pad(D, Z);
    translate([MOTOR_MOUNT_X / 2, -MOTOR_MOUNT_Y / 2, 0]) motor_mount_pad(D, Z);
    translate([-MOTOR_MOUNT_X / 2, -MOTOR_MOUNT_Y / 2, 0]) motor_mount_pad(D, Z);
}

module motor_mount_pad (D, Z) {
    difference () {
        cylinder(r = R(D), h = Z, center = true, $fn = 40);
        //bolt void
        cylinder(r = R(2.5), h = Z + 1, center = true, $fn = 40);
    }
}

module magnetic_coupling (MAGNETS = 4, MAGNET_D = 8.1, MAGNET_H = 2.5) {
    H = 3;
    OFFSET = 12;
    difference () {
        union () {
            cylinder(r = R(COUPLING_D), h = MAGNET_H + H, center = true, $fn = 100);
            translate([0, 0, -6]) cylinder(r = R(12.5), h = 10, center = true, $fn = 60);
            translate([0, 0, -5]) cylinder(r = R(20), h = 5, center = true, $fn = 60);
        }
        //motor shaft void
        scale([1.1, 1.1, 2]) motor_shaft();
        //magnet voids
        for (i = [0 : MAGNETS - 1]) {
            rotate([0, 0, i * (360 / MAGNETS)]) {
                translate([0, OFFSET, H - MAGNET_H + 1.01]) {
                    cylinder(r = R(MAGNET_D), h = MAGNET_H, center = true, $fn = 50);
                }
            }
        }
        //m3 nut
        translate([6, 0, -9]) { 
            cube([2.75, 5.75, 10], center = true);
            translate([0, 0, 5]) rotate([0, 90, 0]) {
                cylinder(r = R(6.75), h = 2.75, center = true, $fn = 6);
                translate([0, 0, 4]) cylinder(r = R(3.25), h = 20, center = true, $fn = 30);
                translate([0, 0, 13.5]) cylinder(r = R(6), h = 20, center = true, $fn = 30);
            }
        }   
    }
}

module slip_coupling (MAGNET_H = 2.5) {
    H = 16;
    difference () {
        translate([0, 0, 2]) cylinder(r = R(45), h = H, center = true, $fn = 100);
        translate([0, 0, 2 -(H / 2) + (MAGNET_H + 3) / 2]) cylinder(r = R(COUPLING_D + 0.7), h = MAGNET_H + 3.01, center = true, $fn = 160);
        translate([0, 0, 2 -(H / 2) + (MAGNET_H + 3) + (WASHER_H / 2)]) cylinder(r = R(WASHER_D), h = WASHER_H, center = true, $fn = 160);
        translate([0, 0, 2 + (H / 2) - (5 / 2)]) cube([25, 10, 5.01], center = true);
        translate([0, 0, 2 + (H / 2) - (5 / 2)]) cube([10, 25, 5.01], center = true);
        //corners with voids for M3
        translate([-8.75, -8.75, 2 + (H / 2) - (5 / 2)]) {
            translate([0, 0, 1]) cube([(25 - 10) / 2, (25 - 10) / 2, 5.01], center = true);
            cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
            translate([0, 0, -4.25]) hex(6, 2.75);
        }
        translate([8.75, 8.75, 2 + (H / 2) - (5 / 2)]) {
            translate([0, 0, 1]) cube([(25 - 10) / 2, (25 - 10) / 2, 5.01], center = true);
            cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
            translate([0, 0, -4.25]) hex(6, 2.75);
        }
    }
}

module daylight_spool_insert () {
    translate([0, 0, 14]) reel_holder(true, false);
    union () {
        cube([25 - .4, 10 - .4, 5], center = true);
        cube([10 - .4, 25 - .4, 5], center = true);
        translate([-8.75, -8.75, 0]) difference () {
            translate([.2, .2, 1/2]) cube([(25 - 10) / 2, (25 - 10) / 2, 4], center = true);
            cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
            translate([0, 0, 2]) cylinder(r = R(5.75), h = 3.5, center = true, $fn = 40);
        }
        translate([8.75, 8.75, 0]) difference () {
            translate([ -.2, -.2, 1/2]) cube([(25 - 10) / 2, (25 - 10) / 2, 4], center = true);
            cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
            translate([0, 0, 2]) cylinder(r = R(5.75), h = 3.5, center = true, $fn = 40);
        }
    }
}

module motor_mount_void (D, Z) {
    cylinder(r = R(D), h = Z, center = true, $fn = 40);
    //bolt void
    translate([0, 0, 5]) cylinder(r = R(3.25), h = Z + 10, center = true, $fn = 40);
    translate([0, 0, 4.75]) cylinder(r = R(6), h = 3.5, center = true, $fn = 40);
}

module mount_plate_void () {
    cylinder(r = R(4.25), h = 20, center = true, $fn = 40);  
    translate([0, 0, 0.5]) cylinder(r = R(8), h = 3, center = true, $fn = 40);  
}

module mount_plate () {
    Z = 1.5;
    D = 7.5 + 1.5;
    
    X = 60;
    Y = 60;
    
    MOUNT_X = 42;
    MOUNT_Y = 42;
    
    CORNER = 3;
    X_CORNER = (X / 2) - (CORNER / 2);
    Y_CORNER = (Y / 2) - (CORNER / 2);
    
    //center
    //color("red") cylinder(r = 15 / 2, h = 20, center = true, $fn = 60);
    
    difference () {
        translate([0, 0, 3.26 - .5]) cube([X, Y, 7], center = true);
        
        //motor void (centered)
        translate([7, 0, 0]) {
            translate([-(46 / 2) + 15 + 1, 0, 0]) cylinder(r = R(15), h = 20, center = true, $fn = 60);
            translate([(MOTOR_MOUNT_X / 2)+1, (MOTOR_MOUNT_Y / 2), 0]) motor_mount_void(D, Z);
            translate([-(MOTOR_MOUNT_X / 2)+1, (MOTOR_MOUNT_Y / 2), 0]) motor_mount_void(D, Z);
            translate([(MOTOR_MOUNT_X / 2)+1, -(MOTOR_MOUNT_Y / 2), 0]) motor_mount_void(D, Z);
            translate([-(MOTOR_MOUNT_X / 2)+1, -(MOTOR_MOUNT_Y / 2), 0]) motor_mount_void(D, Z);
            
            translate([-8 + 12.5 + 1, 0, 0]) cube([7.5, 17, Z], center = true);
        }
        
        translate([MOUNT_X / 2,  MOUNT_Y / 2, 0]) mount_plate_void();
        translate([-MOUNT_X / 2, MOUNT_Y / 2, 0]) mount_plate_void();
        translate([MOUNT_X / 2, -MOUNT_Y / 2, 0]) mount_plate_void();
        translate([-MOUNT_X / 2,-MOUNT_Y / 2, 0]) mount_plate_void();
        
        
        translate([X_CORNER, Y_CORNER, 3.26 - .5]) cube([CORNER, CORNER, 8], center = true);
        translate([-X_CORNER, Y_CORNER, 3.26 - .5]) cube([CORNER, CORNER, 8], center = true);
        translate([X_CORNER, -Y_CORNER, 3.26 - .5]) cube([CORNER, CORNER, 8], center = true);
        translate([-X_CORNER, -Y_CORNER, 3.26 - .5]) cube([CORNER, CORNER, 8], center = true);
    }
    translate([X_CORNER - (CORNER / 2), Y_CORNER - (CORNER / 2), 3.26 - .5]) cylinder(r = CORNER, h = 7, center = true, $fn = 40);
    translate([-X_CORNER + (CORNER / 2), Y_CORNER - (CORNER / 2), 3.26 - .5]) cylinder(r = CORNER, h = 7, center = true, $fn = 40);
    translate([X_CORNER - (CORNER / 2), -Y_CORNER + (CORNER / 2), 3.26 - .5]) cylinder(r = CORNER, h = 7, center = true, $fn = 40);
    translate([-X_CORNER + (CORNER / 2), -Y_CORNER + (CORNER / 2), 3.26 - .5]) cylinder(r = CORNER, h = 7, center = true, $fn = 40);
}

//centered, minimal geometry needed to add
//58x52
module minimal_mount () {
    difference () {
        mount_plate();
        translate([50 + 29, 0, 0]) cube([100, 100, 100], center = true);
        translate([-50 - 29, 0, 0]) cube([100, 100, 100], center = true);
        translate([0, 50 + 26, 0]) cube([100, 100, 100], center = true);
        translate([0, -50 - 26, 0]) cube([100, 100, 100], center = true);
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

PART = "mount_plate";

if (PART == "slip_coupling") {
    slip_coupling();
} else if (PART == "magnetic_coupling") {
    magnetic_coupling();
} else if (PART == "mount_plate") {
    //42x42 M4 mounting holes
    mount_plate(); 
} else if (PART == "daylight_spool_insert") {
    daylight_spool_insert();
} else if (PART == "minimal_mount") {
    minimal_mount();
} else if (PART == "debug") {
    debug_assembled();
}
