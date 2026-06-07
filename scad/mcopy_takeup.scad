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

MCOPY_TAKEUP_X = 130;
MCOPY_TAKEUP_Y = -85;

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

module mcopy_takeup_plate () {
    Z = 2.5;
    Angle = 142.45;
    Rounding = 77;
    CouplingD = 46;
    BarrelZ = 20;

    difference () {
        union () {
            translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) cylinder(r = R(Rounding), h = 11.1, center = true, $fn = 120);
            translate([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) cylinder(r = R(Rounding), h = 11.1, center = true, $fn = 120);
            translate([0, MCOPY_TAKEUP_Y, Z]) cube([MCOPY_TAKEUP_X * 2, Rounding, 11.1], center = true);

            translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) {
                rotate([0, 0, Angle]) translate([MCOPY_TAKEUP_X / 2, 0, 0]) cube([MCOPY_TAKEUP_X, Rounding, 11.1], center = true);
            }

            translate([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) {
                rotate([0, 0, -Angle]) translate([-MCOPY_TAKEUP_X / 2, 0, 0]) cube([MCOPY_TAKEUP_X, Rounding, 11.1], center = true);
            }

            translate([0, -50, Z]) cube([AX, 100, 11.1], center = true);

            translate([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, -9]) difference() {
                cylinder(r = R(60), h = BarrelZ, center = true, $fn = 120);
                cylinder(r = R(CouplingD), h = BarrelZ + 1, center = true, $fn = 120);
            }
            translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, -9]) difference() {
                cylinder(r = R(60), h = BarrelZ, center = true, $fn = 120);
                cylinder(r = R(CouplingD), h = BarrelZ + 1, center = true, $fn = 120);
            }
        }
        translate([0, 62.4, Z]) cube([AX * 2, 100, 11.1 + 1], center = true);

        translate([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) {
            cylinder(r = R(CouplingD), h = 11.1 + 1, center = true, $fn = 120);
            translate([-9, 0, 5]) cube([40, 30, 5], center = true);
            translate([-23.75, 8.8, -2]) cylinder(r = R(6.2), h = 40, center = true, $fn = 40);
            translate([-23.75, -8.8, -2]) cylinder(r = R(6.2), h = 40, center = true, $fn = 40);
        }
        translate([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, Z]) {
            cylinder(r = R(CouplingD), h = 11.1 + 1, center = true, $fn = 120);
            translate([9, 0, 5]) cube([40, 30, 5], center = true);
            translate([23.75, 8.8, -2]) cylinder(r = R(6.2), h = 40, center = true, $fn = 40);
            translate([23.75, -8.8, -2]) cylinder(r = R(6.2), h = 40, center = true, $fn = 40);
        }

        //bearings voids
        mcopy_takeup_bearings([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, -13.1], [0, 0, 180], CouplingD) bearing_void(width = BarrelZ, outerPad = 0.6, innerPad = -0.3);
        mcopy_takeup_bearings([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, -13.1], [0, 0, 0], CouplingD) bearing_void(width = BarrelZ, outerPad = 0.6, innerPad = -0.3);
    
        //m3 bolt bearing voids
        mcopy_takeup_bearings([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, 5], [0, 0, 180], CouplingD) m3_bolt_void();
        mcopy_takeup_bearings([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, 5], [0, 0, 0], CouplingD) m3_bolt_void();
    }


    //motor mount plates
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

    //bearings mounts
    mcopy_takeup_bearings([MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, -8], [0, 0, 180], CouplingD) mcopy_bearing_mount();
    mcopy_takeup_bearings([-MCOPY_TAKEUP_X, MCOPY_TAKEUP_Y, -8], [0, 0, 0], CouplingD) mcopy_bearing_mount();
}

module mcopy_takeup () {
    difference () {
        union () {
            block();
            filter_holder([0, 0, -27.5]);
            filter_reinforcement([0, -1.1, -16 + (5.75 / 2)]);
            mcopy_takeup_plate();
        }
        roller_bolts();
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

//translate([0, 0, 40]) color("red") original_takeup();

PART = "mcopy_takeup_feed";

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
} else if (PART == "mcopy_takeup") {
    rotate([180, 0, 0]) mcopy_takeup();
} else if (PART == "mcopy_takeup_takeup") {
    rotate([180, 0, 0]) mcopy_takeup_half(Side = "takeup") mcopy_takeup();
} else if (PART == "mcopy_takeup_feed") {
    rotate([180, 0, 0]) mcopy_takeup_half(Side = "feed") mcopy_takeup();
} else {
    debug_assembled();
}



