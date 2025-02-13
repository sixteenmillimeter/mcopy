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


ARM_LENGTH = 130;
ARM_WIDTH = 15;
ARM_HEIGHT = 7;
ARM_CUTOFF = 101.25;

ARM_REINFORCEMENT_OFFSET_X = 20;
ARM_REINFORCEMENT_Y = 5;
ARM_REINFORCEMENT_Z = 4.1;

ARMS_ANGLE = 40;

AX = 105;
AY = 26.85 - 2;
AZ = 6.1;
    
BX = 105;
BY = 34.4;
BZ = 5;

BOLTSX = 77;

M5 = 5;

FILTER_X = 55.4;
FILTER_Y = 6.5;
FILTER_VOID_X = FILTER_X - 9 + ((4.5 - 2.34) * 2);

ROLLER_SPACING = 95;

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



module m5_nut (pos = [0, 0, 0]) {
    translate(pos) hex(9.4, 4);
}

module block_bolt_voids (pos = [0, 0, 0]) {
    translate(pos) {
        translate([BOLTSX / 2, 0, 0]) {
            cylinder(r = 4.95 / 2, h = BZ + 1, center = true, $fn = 50);
            m5_nut([0, 0, 3]);
        }
        translate([-BOLTSX / 2, 0, 0]) {
            cylinder(r = 4.95 / 2, h = BZ + 1, center = true, $fn = 50);
            m5_nut([0, 0, 3]);
        }
    }
}

module block () {
    cube([AX, AY, AZ], center = true);
    translate([0, -(AY - BY) / 2, (AZ / 2) + (BZ / 2)]) {
        difference () {
            union () {
                cube([BX, BY, BZ], center = true);
                translate([BOLTSX / 2, (BY / 2) - 3.5, 0]) {
                    cylinder(r= R(13), h = BZ, center = true, $fn = 60);
                }
                translate([-BOLTSX / 2, (BY / 2) - 3.5, 0]) {
                    cylinder(r= R(13), h = BZ, center = true, $fn = 60);
                }
            }
            //void for motor parts
            translate([0, BY - 5.44, 0]) cube([53.2, BY, BZ + 1], center = true);
            //bolts
            block_bolt_voids([0, (BY / 2) - 3.5, 0]); 
        }
    }
}

module original_takeup () {
    block();
}

module projector_mount (pos = [0, 0, 0], rot = [0, 0, 0]) {
    //intersection () {}
    $fn = 60;
    translate(pos) rotate(rot) {
        intersection () {
            rotate([0, 180, 0]) minimal_mount();
            translate([-10, 0, 0]) rounded_cube([50, 30, 20], d = 12, center = true);
        }
    }
    //translate([-8.5, 0, 12])  rotate([0, 0, 180]) geared_motor();
    //translate([0, 0, -34]) rotate([180, 0, 0]) daylight_spool_insert();
}

module projector_arm (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cube([ARM_LENGTH, ARM_WIDTH, ARM_HEIGHT], center = true);
                translate([(ARM_CUTOFF/2) - 2.1, 0, 0]) scale([2, 1, 1]) rotate([0, 0, 45]) cube([30, 30, ARM_HEIGHT], center = true);
            }
            translate([ARM_CUTOFF, 0, 0]) cube([ARM_LENGTH, 52, ARM_HEIGHT + 1], center = true);
        }
        translate([-ARM_REINFORCEMENT_OFFSET_X / 2, 0, -ARM_REINFORCEMENT_Z / 2]) difference() {
            cube([ARM_LENGTH - ARM_REINFORCEMENT_OFFSET_X, ARM_REINFORCEMENT_Y, ARM_HEIGHT + ARM_REINFORCEMENT_Z], center = true);
            translate([0, 0, -ARM_HEIGHT - ARM_REINFORCEMENT_Z + 2]) rotate([0, -5, 0]) cube([ARM_LENGTH - ARM_REINFORCEMENT_OFFSET_X + 20, ARM_REINFORCEMENT_Y + 1, ARM_HEIGHT + ARM_REINFORCEMENT_Z], center = true);
        }
    }
}

module filter_holder (pos = [0, 0, 0]) {
    translate(pos) difference () {
        cube([FILTER_X, 13.25, 50.5], center = true);
        //center void
        cube([42.4, 13.25 + 1, 50.5 + 1], center = true);
        translate([0, (13.25/2) - (3.25/2) - 1, 0]) cube([FILTER_VOID_X, 3.25, 50.5 + 1], center = true);
        translate([0, (13.25/2) - (3.25/2) - 1 - 3.25 - 1, 0]) cube([FILTER_VOID_X, 3.25, 50.5 + 1], center = true);
    }
}

module filter_reinforcement (pos = [0, 0, 0]) {
    Z = 19.5 + 7.83-5.75;
    X = AX;
    translate(pos) difference () {
        cube([X, 15.5, Z], center = true);
        cube([FILTER_X - 0.1, 15.5 + 1, Z + 1], center = true);
        translate([X - 19.5, -9, 0]) cube([X, 15.5, Z + 1], center = true);
        translate([-X + 19.5, -9, 0]) cube([X, 15.5, Z + 1], center = true);
    }
}

module roller_bolts () {
    translate([ROLLER_SPACING/2, 2, 0]) {
        cylinder(r = R(4.25), h = 80, center = true, $fn = 40);
        translate([0, 0, 7]) rotate([0, 0, 30]) m4_nut();
    }
    translate([-ROLLER_SPACING/2, 2, 0]) {
        cylinder(r = R(4.25), h = 80, center = true, $fn = 40);
        translate([0, 0, 7]) rotate([0, 0, 30]) m4_nut();
    }
}

module jk_takeup () {
    difference () {
        union () {
            block();
            filter_holder([0, 0, -27.5]);
            filter_reinforcement([0, -1.1, -16+(5.75/2)]);
        }
        roller_bolts();
    }
    translate([0, 0, 1.8]) {
        translate([-30, 0, 0]) rotate([0, 0, ARMS_ANGLE]) {
            projector_arm([-ARM_LENGTH/2, 0, 2.75], [0, 0, 180]);
            projector_mount([-ARM_LENGTH, 0, 5.5], [0, 0, 180]);
        }
        translate([30, 0, 0]) rotate([0, 0, -ARMS_ANGLE]) {
            projector_arm([ARM_LENGTH/2, 0, 2.75]);
            projector_mount([ARM_LENGTH, 0, 5.5]);
        }
    }
}

module jk_takeup_halves (HALF = "A") {
    difference () {
        jk_takeup();
        translate([0, 7, 0]) cylinder(r = R(M5), h = 40, center = true, $fn = 60);
        translate([0, -7, 0]) cylinder(r = R(M5), h = 40, center = true, $fn = 60);
        if (HALF == "A") {
            translate([(ARM_LENGTH) + 10, 0, 0]) cube([ARM_LENGTH * 2, ARM_LENGTH * 2, ARM_LENGTH], center = true);
            translate([0, 0, 10 + 2]) cube([20, BY + 1, 20], center = true);
        } else if (HALF == "B") {
            translate([-(ARM_LENGTH) - 10, 0, 0]) cube([ARM_LENGTH * 2, ARM_LENGTH * 2, ARM_LENGTH], center = true);
            translate([0, 0, -10 + 2]) cube([20, BY + 1, 20], center = true);
        }
    }

}

module idle_roller () {
    D1 = 16;
    D3 = 90;
    FN = 60;
    difference () {
        union() {
            difference () {
                cylinder(r = R(D1), h = 20.2, center = true, $fn = FN);
                cylinder(r = R(D1)+1, h = 17, center = true, $fn = FN);
            }
            translate([0, 0, 0]) {
                difference() {
                    cylinder(r = R(14), h = 17.1, center = true, $fn = FN);
                    for (i = [0 : FN - 1]) {
                        rotate([0, 0, (360 / FN) * i ]) {
                            translate([(D3/2)+6.1, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(D3), h = 2, center = true, $fn = 200);
                        }
                    }
                }
            }
        }
        cylinder(r = R(4.25), h = 20.2 + 1, center = true, $fn = 30);
        translate([0, 0, (20.2 / 2) - (5 / 2)]) cylinder(r = R(10), h = 5.1, center = true, $fn = FN);
    }
    
}

module idle_roller_cap () {
    difference () {
        cylinder(r = R(10-0.3), h = 5, center = true, $fn = 60);
        cylinder(r = R(4.25), h = 20.2 + 1, center = true, $fn = 30);
        translate([0, 0, 1.01]) m4_nut();
    }
    
}

//translate([0, 0, 40]) color("red") original_takeup();

PART = "jk_takeup";

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
} else if (PART == "jk_takeup") {
    jk_takeup();
} else if (PART == "jk_takeup_half_a") {
    jk_takeup_halves("A");
} else if (PART == "jk_takeup_half_b") {
    jk_takeup_halves("B");
} else if (PART == "idle_roller") {
    idle_roller();
} else {
    debug_assembled();
}



