use <./common/common.scad>;
include <./takeup/takeup.scad>;

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

MCOPY_TAKEUP_X = 130;
MCOPY_TAKEUP_Y = -85;

MOTOR_ANGLE = 37.5;

BearingOuterDiameter = 21.6;
BearingInnerDiameter = 8.05;

module bearing_void (pos = [0, 0, 0], rot = [0, 0, 0], width = 8, inner = false, outerPad = 0.3, innerPad = 0) {
    translate (pos) rotate(rot) {
        difference () {
            cylinder(r = R(BearingOuterDiameter) + outerPad, h = width, center = true, $fn = 90);
            if (inner) {
                cylinder(r = R(BearingInnerDiameter) + innerPad, h = width + 1, center = true, $fn = 90);
            }
        }
    }
}

module motor_shaft () {
    difference () {
        cylinder(r = R(MOTOR_SHAFT_D), h = MOTOR_SHAFT_H, center = true, $fn = 60);
        translate([MOTOR_SHAFT_D - MOTOR_SHAFT_HOBBLE, 0, 0]) cube([MOTOR_SHAFT_D, MOTOR_SHAFT_D, MOTOR_SHAFT_H + 1], center = true);
    }
}

module m5_nut (pos = [0, 0, 0], H = 4) {
    translate(pos) hex(9.4, H);
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
        translate([0, 0, 7]) rotate([0, 0, 0]) m4_nut(50);
    }
    translate([-ROLLER_SPACING/2, 2, 0]) {
        cylinder(r = R(4.25), h = 80, center = true, $fn = 40);
        translate([0, 0, 7]) rotate([0, 0, 0]) m4_nut(50);
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

module mcopy_bearing_mount () {
    difference () {
        union () {
            cylinder(r = R(BearingInnerDiameter - 0.3), h = 10, center = true, $fn = 60);
            translate([0, 0, 10 / 2]) cylinder(r = R(9.65), h = 2, center = true, $fn = 60);
        }
        cylinder(r = R(3.25), h = 20, center = true, $fn = 60);
    }
}

module mcopy_takeup_bearings (pos = [0, 0, 0], rot = [0, 0, 0], CouplingD = 46) {
    translate(pos) rotate(rot) {
        rotate([0, 0, -40]) translate([0, (CouplingD + BearingOuterDiameter - 0.3) / 2, 0]) children();
        rotate([0, 0, -140]) translate([0, (CouplingD + BearingOuterDiameter - 0.3) / 2, 0]) children();
        rotate([0, 0, 95]) translate([0, (CouplingD + BearingOuterDiameter - 0.3) / 2, 0]) children();
    }
}

module m3_bolt_void (pos = [0, 0, 0], Bolt = 20, Cap = 10) {
    translate (pos) {
        translate([0, 0, -Bolt / 2]) cylinder(r = R(3.25), h = Bolt, center = true, $fn = 40);
        translate([0, 0, (Cap / 2) - 0.1]) cylinder(r = R(6.5), h = Cap, center = true, $fn = 40);
    }
}

module motor_plate_bolts_voids (pos = [0, 0, 0], rot = [0, 0, 0], H = 40, Nuts = false) {
    BOLTS = 42 / 2;
    BOLT_H = 6;
    translate(pos) rotate(rot) {
        translate([BOLTS, BOLTS, 0]) {
            cylinder(r = R(5.25), h = H, center = true, $fn = 40);
            if (Nuts) {
                translate([0, 0, -H / 2]) m5_nut(H = BOLT_H);
            }
        }
        translate([BOLTS, -BOLTS, 0]) {
            cylinder(r = R(5.25), h = H, center = true, $fn = 40);
            if (Nuts) {
                translate([0, 0, -H / 2]) m5_nut(H = BOLT_H);
            }
        }
        translate([-BOLTS, BOLTS, 0]) {
            cylinder(r = R(5.25), h = H, center = true, $fn = 40);
            if (Nuts) {
                translate([0, 0, -H / 2]) m5_nut(H = BOLT_H);
            }
        }
        translate([-BOLTS, -BOLTS, 0]) {
            cylinder(r = R(5.25), h = H, center = true, $fn = 40);
            if (Nuts) {
                translate([0, 0, -H / 2]) m5_nut(H = BOLT_H);
            }
        }
    } 
}

module mcopy_takeup_plate () {
    Z = 2.5;
    Angle = 142.45;
    Rounding = 77;
    CouplingD = 46;
    BarrelZ = 20;
    H = 11.1;
    BOLTS = 42 / 2;
    MOTOR_ANGLE = 37.5;

    difference () {
        union () {
            translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) cylinder(r = R(Rounding), h = H, center = true, $fn = 120);
            translate([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) cylinder(r = R(Rounding), h = H, center = true, $fn = 120);
            //translate([0, MCOPY_TAKEUP_Y, Z]) cube([MCOPY_TAKEUP_X * 2, Rounding, 11.1], center = true);

            translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) {
                rotate([0, 0, Angle]) translate([MCOPY_TAKEUP_X / 2, 0, 0]) cube([MCOPY_TAKEUP_X, Rounding, H], center = true);
            }

            translate([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) {
                rotate([0, 0, -Angle]) translate([-MCOPY_TAKEUP_X / 2, 0, 0]) cube([MCOPY_TAKEUP_X, Rounding, H], center = true);
            }

            translate([0, -35, Z]) cube([AX, 75, H], center = true);
        }
        translate([0, 62.4, Z]) cube([AX * 2, 100, H + 1], center = true);

        translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y,  Z + 1]) {
            cylinder(r = R(22), h = H, center = true, $fn = 60);
            cylinder(r = R(14), h = H + 10, center = true, $fn = 40);
            motor_plate_bolts_voids([0, 0, 16], [0, 0, MOTOR_ANGLE], 40, true);
        }
        
        translate([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z + 1]) {
            cylinder(r = R(22), h = H, center = true, $fn = 60);
            cylinder(r = R(14), h = H + 10, center = true, $fn = 40); 
            motor_plate_bolts_voids([0, 0, 16], [0, 0, MOTOR_ANGLE], 40, true);
        }
    }

    //motor mount plates
    /*
    translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) intersection () {
        union () {
            cylinder(r = R(CouplingD) + 2, h = 11.1, center = true, $fn = 120);
            translate([-10, 0, 2.1]) cube([41, 31, 7], center = true);
        }
        translate([0, 0, 7.315 - Z]) rotate([180, 0, 180]) minimal_mount();
    }
    translate([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) intersection () {
        union () {
            cylinder(r = R(CouplingD) + 2, h = 11.1, center = true, $fn = 120);
            translate([10, 0, 2.1]) cube([41, 31, 7], center = true);
        }
        translate([0, 0, 7.315 - Z]) rotate([180, 0, 0]) minimal_mount();
    }
    */
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

module spindle_passthrough (pos = [0, 0, 0], rot = [0, 0, 0]) {
    H  = 44;
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cylinder(r = R(7.75), h = H, center = true, $fn = 40);
                translate([0, 0, 6.7]) cylinder(r = R(12), h = 2, center = true, $fn = 80);
                translate([(7.75 / 2) + (3.75 / 2), 0, -3.3]) cube([4.75, 3.75, 18], center = true);
            }
            cylinder(r = R(4.25), h = H + 1, center = true, $fn = 40);
            translate([0, 7.75 - 3 - 0.2,  H - 2]) cube([7.75, 7.75, H], center = true);
        }
    }
}

module spindle_coupling (pos = [0, 0, 0], rot = [0, 0, 0]) {
    H = 40;
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cylinder(r = R(40), h = 8, center = true, $fn = 120);
                translate([0, 0, -2]) cylinder(r = R(12), h = 8, center = true, $fn = 60);
            }
            cylinder(r = R(4.25), h = 8 + 1, center = true, $fn = 40);
            translate([0, 0, 6.5 - 3]) color("red") m4_nut(5);
            //void for passthrough
            translate([0, 0, -21]) color("blue") difference () {
                cylinder(r = R(7.75 + 0.3), h = H, center = true, $fn = 40);
                translate([0, 7.75 - 3 - 0.2,  H - 2]) cube([7.75, 7.75, H], center = true);
            }
            //half
            //translate([50 / 2, 0, 0]) cube([50, 50, 50], center = true);
        }
    }
}

module mcopy_takeup_motor_plate () {
    intersection () {
        mount_plate();
        cylinder(r = R(70), h = 10, center = true, $fn = 120);
    }
}

module mcopy_takeup_motor_standoff (pos = [0, 0, 0], rot = [0, 0, 0]) {
    H = 28;
    BOLTS = 42 / 2;
    translate(pos) rotate(rot) {
        difference () {
            cylinder(r = R(77), h = H, center = true, $fn = 120);
            cylinder(r = R(50), h = H, center = true, $fn = 120);
            translate([0, 0, (H / 2) - (8 / 2) + 0.1]) intersection () {
                cylinder(r = R(70.3), h = 10, center = true, $fn = 120);
                cube([60.3, 60.3, 8], center = true);
            }
            //bolts
            motor_plate_bolts_voids([0, 0, 0], [0, 0, 0], H + 1);
        }
        
    }
}

module L298N_mount_post (pos = [], H = 3) {
    translate(pos) {
        difference() {
            cylinder(r = R(5), h = H, center = true, $fn = 40);
            cylinder(r = R(3.5), h = H + 1, center = true, $fn = 30);
        }
    } 
}

module L298N_mount (pos = [0, 0, 0], rot = [0, 0, 0]) {
    H = 3;
    DISTANCE = 36.5 / 2;
    translate(pos) rotate(rot) {
        L298N_mount_post([DISTANCE, DISTANCE, 0], H);
        L298N_mount_post([DISTANCE, -DISTANCE, 0], H);
        L298N_mount_post([-DISTANCE, DISTANCE, 0], H);
        L298N_mount_post([-DISTANCE, -DISTANCE, 0], H);
    }
}

module L298N_bolt_void (pos = [0, 0, 0], H = 15) {
    translate(pos) {
        cylinder(r = R(3.5), h = H, center = true, $fn = 30);
        translate([0, 0, -H / 2]) cylinder(r = R(6.5), h = 5, center = true, $fn = 30);
    } 
}

module L298N_bolts_voids (pos = [0, 0, 0], rot = [0, 0, 0]) {
    H = 3;
    DISTANCE = 36.5 / 2;
    translate(pos) rotate(rot) {
        L298N_bolt_void([DISTANCE, DISTANCE, 0], 15);
        L298N_bolt_void([DISTANCE, -DISTANCE, 0], 15);
        L298N_bolt_void([-DISTANCE, DISTANCE, 0], 15);
        L298N_bolt_void([-DISTANCE, -DISTANCE, 0], 15);
    }
}
    
module mcopy_takeup_half (Side = "takeup") {
    Width = 30;
    difference () {
        children();
        translate ([-Width / 2, 0, 3]) {
            if (Side == "takeup") {
                translate([250, 0, 250]) cube([500, 500, 500], center = true);
                translate([250 + Width, 0, -249.9]) cube([500, 500, 500], center = true);
            } else if (Side == "feed") {
                translate([-250 + Width, 0, -250]) cube([500, 500, 500], center = true);
                translate([-250, 0, 249.9]) cube([500, 500, 500], center = true);
            }
        }
        for (i = [0 : 5]) {
            OffsetX = i == 0 || i == 5 ? 0 : i % 2 == 0 ? -5 : 5;
            translate([0, -i * 22, 6]) {
                translate([OffsetX, 0, i % 2 == 0 ? 0 : -7]) rotate ([i % 2 == 0 ? 0 : 180, 0, 0]) {
                    m3_bolt_void();
                    translate([0, 0, -9]) m3_nut(5);
                }
            }
        }
    }
}

module mcopy_takeup () {
    difference () {
        union () {
            block();
            //filter_holder([0, 0, -27.5]);
            //filter_reinforcement([0, -1.1, -16 + (5.75 / 2)]);
            mcopy_takeup_plate();
            L298N_mount([0, -30, 9]);
        }
        roller_bolts();
        L298N_bolts_voids([0, -30, 6.5]);
    }
}

module debug_assembled () {
    mcopy_takeup();
    translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, 47]) rotate([180, 0, 180 - MOTOR_ANGLE]) {
        //translate([(46 / 2) - 14.5, 0, 0]) rotate([180, 0, 0]) geared_motor();
        
        //translate([0, 0, 26]) rotate([0, 0, 180]) magnetic_coupling();
        //translate([0, 0, 65]) cylinder(r = R(2*25.4), h = 20, center = true);
    }
    //color("green") translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, 47 - 11]) rotate([180, 0, 180 - MOTOR_ANGLE]) mcopy_takeup_motor_plate ();
    color("red") spindle_passthrough([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, -10]);
    spindle_coupling([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, 13]);
    mcopy_takeup_motor_standoff([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, 22.1], [0, 0, 180 - MOTOR_ANGLE]);
    
    translate([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, 50]) rotate([180, 0, MOTOR_ANGLE]) {
        translate([(46 / 2) - 14.5, 0, 0]) rotate([180, 0, 0]) geared_motor();
        color("green") translate([0, 0, 11]) mcopy_takeup_motor_plate();
        
        translate([0, 0, 26]) rotate([0, 0, 180]) magnetic_coupling();
    }
    
    color("red") spindle_passthrough([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, -10]);
    spindle_coupling([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, 13]);
    /*
    translate([(46 / 2) - 14.5, 0, 0]) rotate([180, 0, 0]) geared_motor();
    color("green") translate([0, 0, 11]) mount_plate();
    color("blue") translate([0, 0, 23]) rotate([0, 0, -90]) 
    difference () {
        translate([0, 0, 26.5]) slip_coupling();
        translate([-50, 0, 0]) cube([100, 100, 150], center = true);
    }
    color("red") translate([0, 0, 34]) daylight_spool_insert();
    */
}


//translate([0, 0, 40]) color("red") original_takeup();

PART = "mcopy_takeupx";

if (PART == "spindle_coupling") {
    spindle_coupling();
} else if (PART == "spindle_passthrough") {
    rotate([180, 0, 0]) spindle_passthrough();
} else if (PART == "magnetic_coupling") {
    magnetic_coupling();
} else if (PART == "mount_plate") {
    //42x42 M4 mounting holes
    mcopy_takeup_motor_plate(); 
} else if (PART == "motor_standoff") {
    mcopy_takeup_motor_standoff();
} else if (PART == "jk_takeup") {
    jk_takeup();
} else if (PART == "jk_takeup_half_a") {
    jk_takeup_halves("A");
} else if (PART == "jk_takeup_half_b") {
    jk_takeup_halves("B");
} else if (PART == "idle_roller") {
    idle_roller();
} else if (PART == "mcopy_takeup") {
    rotate([180, 0, 0]) mcopy_takeup();
} else if (PART == "mcopy_takeup_takeup") {
    rotate([180, 0, 0]) mcopy_takeup_half(Side = "takeup") mcopy_takeup();
} else if (PART == "mcopy_takeup_feed") {
    rotate([180, 0, 0]) mcopy_takeup_half(Side = "feed") mcopy_takeup();
} else {
    debug_assembled();
}



