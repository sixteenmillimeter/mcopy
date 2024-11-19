
use <./common/common.scad>;
use <./bolex.scad>;

RAIL_SPACING = 160;
RAIL_H = 70;
RAIL_LEN = 400;
RAIL_D = 25.4;

X = 134;
Y = 105.5;
Z = 19;
    
VX = 106.7;
VY = 76;
    
A1 = 61;
A2 = 60.2;
    
B1 = 80.8;
B2 = 80.3;
    
C1 = 91.7;
C2 = 90.6;
    
OFFSETX = 0;

CameraSledBolexZ = 33;
CameraSledBolexX = 100;
CameraSledBolexY = 105;

CameraSledBolexPlateX = 60;
CameraSledBolexPlateY = 90;
CameraSledBolexPlateZ = 15;

CameraBoltX = (A1 + A2) / 2; //75;
CameraBoltY = (C1 + C2) / 2;

module cy (D, H, FN = $fn, X = 0, Y = 0, Z = 0) {
    rotate([X, Y, Z]) cylinder(r = R(D), h = H, center = true, $fn = FN);
}

module m5_nut (H = 5, DIAG = 9.1) {
    hex(diag = DIAG, h = H);
}

module enlarged_m5_bolt_void (pos = [0, 0, 0], rot = [0, 0, 0], BoltH = 20, CapH = 20) {
    $fn = 50;
    translate(pos) rotate(rot) {
        translate([0, 0, (CapH / 2) - 0.1]) cy(10, CapH);
        translate([0, 0, -(BoltH / 2) + 0.1]) cy(6, BoltH);
    }
}

module camera_sled_bolex_plate_blank (pos = [0, 0, 0], rot = [0, 0, 0], PadX = 0, PadY = 0, PadZ = 0) {
    X = CameraSledBolexPlateX + PadX;
    Y = CameraSledBolexPlateY + PadY;
    Z = CameraSledBolexPlateZ + PadZ;
    BevelZ = 5;
    translate(pos) rotate(rot) {
        difference () {
           cube([X, Y, Z], center = true);
           translate([X - BevelZ, 0, Z - BevelZ]) cube([X, Y + 1, Z], center = true);
           translate([-X + BevelZ, 0, Z - BevelZ]) cube([X, Y + 1, Z], center = true);
           translate([-(X / 2) - 7.83, 0, -3.45]) rotate([0, 20, 0]) cube([20, Y + 1, 20], center = true);
           translate([(X / 2) + 7.83, 0, -3.45]) rotate([0, -20, 0]) cube([20, Y + 1, 20], center = true);
        }
    }
}

module rail (H = 100) {
    cylinder(r = R(RAIL_D), h = H, center = true, $fn = 60);
}

module rails () {
    translate([RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) rail(RAIL_LEN);
    translate([-RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) rail(RAIL_LEN);
}

module end () {
    L = 50;
    T = 20;
    translate ([0, -L / 2, 0]) {
        difference () {
            union () {
                translate([RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) {
                    cylinder(r = R(35), h = L, center = true, $fn = 60);
                }
                translate([-RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) {
                    cylinder(r = R(35), h = L, center = true, $fn = 60);
                }
                translate([0, 0, RAIL_H + (35 / 2) - (T / 2)]) cube([RAIL_SPACING, L, T], center = true);
                translate([RAIL_SPACING/2 - (5 / 2), 5, RAIL_H / 2]) cube([40, 40, RAIL_H], center = true);
                translate([-RAIL_SPACING/2 + (5 / 2), 5, RAIL_H / 2]) cube([40, 40, RAIL_H], center = true);
            }
            translate([RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) {
                rail(L + 1);
            }
            translate([-RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) {
                rail(L + 1);
            }
        }
    }
}

module jk_camera_sled () {
    difference () {
        cube([X, Y, Z], center = true);
        cube([VX, VY, Z + 1], center = true);
        translate([OFFSETX, 0, 0]) {
            translate([A1 / 2, C1 / 2, 0]) cylinder(r = R(5), h = Z * 2, center = true, $fn = 30);
            translate([-A1 / 2, C2 / 2, 0]) cylinder(r = R(5), h = Z * 2, center = true, $fn = 30);
            translate([A2 / 2, -C1 / 2, 0]) cylinder(r = R(5), h = Z * 2, center = true, $fn = 30);
            translate([-A2 / 2, -C2 / 2, 0]) cylinder(r = R(5), h = Z * 2, center = true, $fn = 30);
            translate([B1 / 2, C1 / 2, 0]) cylinder(r = R(5), h = Z * 2, center = true, $fn = 30);
            translate([-B1 / 2, C2 / 2, 0]) cylinder(r = R(5), h = Z * 2, center = true, $fn = 30);
            translate([B2 / 2, -C1 / 2, 0]) cylinder(r = R(5), h = Z * 2, center = true, $fn = 30);
            translate([-B2 / 2, -C2 / 2, 0]) cylinder(r = R(5), h = Z * 2, center = true, $fn = 30);
        }
    }
}

module jk_camera_sled_bolex (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Z = CameraSledBolexZ;
    X = CameraSledBolexX;
    Y = CameraSledBolexY;
    PlateY = 20;
    translate(pos) rotate(rot) {
        difference () {

            rounded_cube([X, Y, Z], d = 10, center = true, $fn = 40);
            translate([0, 0, -20]) rounded_cube([CameraBoltX - 10, CameraBoltY - 10, Z], d = 10, center = true, $fn = 40);
            
            enlarged_m5_bolt_void([CameraBoltX / 2, CameraBoltY / 2, -10], BoltH = Z * 2, CapH = Z);
            enlarged_m5_bolt_void([-CameraBoltX / 2, CameraBoltY / 2, -10], BoltH = Z * 2, CapH = Z);
            enlarged_m5_bolt_void([CameraBoltX / 2, -CameraBoltY / 2, -10], BoltH = Z * 2, CapH = Z);
            enlarged_m5_bolt_void([-CameraBoltX / 2, -CameraBoltY / 2, -10], BoltH = Z * 2, CapH = Z);

            //film plane
            translate([X / 2, CameraBoltY / 2, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, Z + 1], center = true);
            translate([-X / 2, CameraBoltY / 2, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, Z + 1], center = true);

            //center
            translate([0, 0, Z / 2]) rotate([90, 0, 0]) rotate([0, 0, 45]) cube([1/2, 1/2, Y + 1], center = true);

            
            //void for plate
            camera_sled_bolex_plate_blank([0, -(PlateY / 2), (CameraSledBolexZ / 2) - (CameraSledBolexPlateZ / 2)], PadX = 0.4, PadY = PlateY, PadZ = 0.1);
            
            translate([-33, -22, 10]) rotate([0, 90, 0]) m5_nut();
            translate([-33, -22, 20]) cube([5, 7.9, 20], center = true);
            
            //m5 bolt
            translate([-25, -22, 10]) cy(5.1, 25, 40, Y = 90);
            translate([-25 - 27, -22, 10]) cy(9, 30, 40, Y = 90);
        }

    }
}

module jk_camera_sled_nut () {
    D = 13;
    Ridges = 40;
    RidgeD = 1;
    difference () {
        union () {
            difference () {
                cylinder(r = R(D), h = 5, center = true, $fn = 50);
                translate([0, 0, 2]) m5_nut(5);
                cylinder(r = R(5.1), h = 5 + 1, center = true, $fn = 40);

            }
            for (i = [0 : Ridges - 1]) {
                rotate([0, 0, i * (360 / Ridges)]) translate([D / 2, 0, 0]) cylinder(r = R(RidgeD), h = 5, center = true, $fn = 20);
            }
        }
        translate([0, 0, -2]) difference () {
            cylinder(r = R(D + 2), h = 2, center = true, $fn = 50);
            cylinder(r1 = R(D) - 1, r2 = R(D) + 1, h = 2.01, center = true, $fn = 50);
        }
        translate([0, 0, 2]) difference () {
            cylinder(r = R(D + 2), h = 2, center = true, $fn = 50);
            cylinder(r1 = R(D) + 1, r2 = R(D) - 1, h = 2.01, center = true, $fn = 50);
        }
    }
}

module debug () {
    color("blue") rails(); 
    translate([0, RAIL_LEN / 2, 0]) end();
    translate([0, -RAIL_LEN / 2, 0]) rotate([0, 0, 180]) end();

    translate([0, 0, 79.4]) jk_camera_sled();
    jk_camera_sled_bolex([0, 0, 105]);
    //debug_bolex([0, 0, 90 + 33]);

    translate([0, -150, 160]) cube([10, 10, 145], center = true);

    translate([A1 / 2, C1 / 2, 90]) cylinder(r = R(5), h = 80, center = true, $fn = 30);
    translate([-A1 / 2, C2 / 2, 90]) cylinder(r = R(5), h = 80, center = true, $fn = 30);
    translate([A2 / 2, -C1 / 2, 90]) cylinder(r = R(5), h = 80, center = true, $fn = 30);
    translate([-A2 / 2, -C2 / 2, 90]) cylinder(r = R(5), h = 80, center = true, $fn = 30);
}

PART = "jk_camera_sled_nut";

if (PART == "jk_camera_sled_bolex") {
    jk_camera_sled_bolex();
} else if (PART == "jk_camera_sled_nut") {
    jk_camera_sled_nut();
} else {
    debug();
}