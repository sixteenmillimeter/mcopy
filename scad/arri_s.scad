// Arri-S Animation Motor

include <./common.scad>;
include <./takeup.scad>;
include <./bellows.scad>;

BarrelDiameter = 45;
BarrelLength = 52;

SeatDiameter = 20;
SeatLength = 5.8;

CapLength = 19;
CapDiameter = 40;
CapThickness = 3;

CapCatchDiameter = 38;
CapCatchLength = 2;
CapCatchOffset = 15 + 1;

CapRimDiameter = 46.5;
CapRimThickness = 3;

NotchDiameter = 2;
NotchOffset = 3;

DriveLength = 7;
DriveDiameter1 = 11;
DriveDiameter2 = 9;

ShaftLength = 2.75;
ShaftDiameter = 5;

MicroswitchCompression = 8.7 - 6.9; //min

BearingDiameter = 22.5;
BearingInnerDiameter = 11.5;

capM3OffsetZ = 11.5;


module motorBarrel () {
    $fn = 200;
    cylinder(r = R(BarrelDiameter), h = BarrelLength, center = true);
}

module motorSeat () {
    $fn = 120;
    cylinder(r = R(SeatDiameter), h = SeatLength, center = true);
}

module motorShaft () {
    cylinder(r = R(ShaftDiameter), h = ShaftLength, center = true);
}

module motorDrive () {
    cylinder(r = R(DriveDiameter1), h = DriveLength, center = true);
}

module motorOriginal () {
    motorBarrel();
    translate([0, 0, (BarrelLength / 2) + (SeatLength / 2)]) motorSeat();
    //notch
    $fn = 50;
    translate([BarrelDiameter / 2, 0, -(BarrelLength / 2) + NotchOffset]) {
        rotate([0, 90, 0]) {
            cylinder(r = R(NotchDiameter), h = 1, center = true);
            translate([0, 0, NotchDiameter / 4]) sphere(r = R(NotchDiameter));
        }
    }
    translate([0, 0, (BarrelLength / 2) + (SeatLength) + (ShaftLength / 2)]) motorShaft();
    translate([0, 0, (BarrelLength / 2) + (SeatLength) + (ShaftLength) + (DriveLength / 2)]) motorDrive();
}

module bodyCap () {
    $fn = 200;
    difference () {
        cylinder(r = R(CapDiameter), h = CapLength, center = true);
        cylinder(r = R(CapDiameter - CapThickness), h = CapLength + 1, center = true);
        //catch
        translate([0, 0, (CapLength / 2) - CapCatchOffset]) difference () {
            cylinder(r = R(CapDiameter + 1), h = CapCatchLength, center = true);
            cylinder(r = R(CapCatchDiameter), h = CapCatchLength + 1, center = true);
        }
    }
    translate([0, 0, (CapLength / 2) + (CapRimThickness / 2)]) {
        difference () {
            cylinder(r = R(CapRimDiameter), h = CapRimThickness, center = true);
        }
    }
}

module bodyCapBellowsAdapter () {
    $fn = 200;
    difference () {
        bodyCap();
        translate([0, 0, (CapLength / 2) + (CapRimThickness / 2)]) {
            cube([CapDiameter - CapThickness - 16, CapDiameter - CapThickness - 16, CapRimThickness + 1], center = true);
        }
    }
    translate([0, 0, 16]) {
        difference() {
            cylinder(r = 37.9 / 2, h = 7, center = true);
            cylinder(r = 30 / 2, h = 7 + 1, center = true);
        }
    }
}

/**
 ** Stepper Motor Design
 **/
 
module animationMotorBodyPositive () {
    difference () {
        motorBarrel();
        //hollow out
        translate([0, 0, 4]) cylinder(r = R(BarrelDiameter) - 5, h = BarrelLength, center = true, $fn = 200);
        //cut
        translate([0, 0, 40]) cube([100, 100, BarrelLength], center = true);
        cylinder(r = R(23), h = BarrelLength + 1, center = true, $fn = 100);
        //window
        translate([0, (BarrelDiameter / 2) - 2, -5]) cube([8, 20, 42], center = true);
    }

    //rim
    translate([0, 0, -(BarrelLength / 2) - (3 / 2)]) {
        difference () {
            cylinder(r = R(BarrelDiameter) + 2, h = 3, center = true, $fn = 200);
            cylinder(r = R(23), h = 3 + 1, center = true, $fn = 100);
        }
    }
    //motor pad
    translate([0, 0, -(BarrelLength / 2) - (3) - (4 / 2)]) {
        difference () {
            union () {
                cube([42, 42, 4], center = true);
                cylinder(r = R(BarrelDiameter) + 2, h = 4, center = true, $fn = 200);
            }
            cylinder(r = R(23), h = 4 + 1, center = true, $fn = 100);
            for (i = [0 : 3]) {
                rotate([0, 0, (i * 90) + 45]) translate([29.7, 0, 0]) cube([5.5, 5.5, 4 + 1], center = true);
            }
        }
    }

    //notch
    $fn = 50;
    rotate([0, 0, 35]) {
        translate([BarrelDiameter / 2, 0, -(BarrelLength / 2) + NotchOffset]) {
            rotate([0, 90, 0]) {
                cylinder(r = R(NotchDiameter), h = 1, center = true);
                translate([0, 0, NotchDiameter / 4]) sphere(r = R(NotchDiameter));
            }
        }
    }
}

module boltSlot () {
    cylinder(r = R(6), h = 46.5, center = true, $fn = 40);
    cylinder(r = R(3.25), h = 55, center = true, $fn = 40);
}

module animationMotorBody () {
    boltZOffset = -6;
    difference () {
        animationMotorBodyPositive();
        //m3 bolts (vertical)
        translate([31/2, 31/2, boltZOffset]) boltSlot();
        translate([31/2, -31/2, boltZOffset]) boltSlot();
        translate([-31/2, 31/2, boltZOffset]) boltSlot();
        translate([-31/2, -31/2, -6]) boltSlot();
        //cap m3s
        rotate([0, 0, -60]) translate([14.5, 0, capM3OffsetZ]) {
            rotate([0, 90, 0]) {
                cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
                translate([0, 0, 6.5]) cylinder(r = R(6), h = 3, center = true, $fn = 40);
            }
        }
        rotate([0, 0, 120]) translate([14.5, 0, capM3OffsetZ])  {
            rotate([0, 90, 0]) {
                cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
                translate([0, 0, 6.5]) cylinder(r = R(6), h = 3, center = true, $fn = 40);
            }
        }
    }
}

module animationMotorCapPositive () {
    difference() {
        cylinder(r = R(BarrelDiameter), h = 10, center = true, $fn = 200);
        translate([0, 0, -(10 /2) + (7.5/2) - 0.1]) cylinder(r = R(BearingDiameter), h = 7.5, center = true, $fn = 80);
        cylinder(r = R(13), h = 10 + 1, center = true, $fn = 80);
    }
    translate([0, 0, -(10/2)-(5/2)]) difference() {
        cylinder(r = R(BarrelDiameter) - 5.3, h = 5, center = true, $fn = 200);
        cylinder(r = R(BarrelDiameter) - 7.5, h = 5 + 1, center = true, $fn = 200);
    }
    translate([0, 0, -(10/2)-(5/2)]) difference() {
        union() {
            rotate([0, 0, -60]) translate([13, 0, 0]) cube([6, 8, 5], center = true);
            rotate([0, 0, 120]) translate([13, 0, 0]) cube([6, 8, 5], center = true);
        }
        cylinder(r = R(BearingDiameter)+1, h = 5 + 1, center = true, $fn = 200);
    }
    translate([0, 0, -(10/2)-(5/2)]) intersection() {
        cylinder(r = R(BarrelDiameter), h = 5, center = true, $fn = 200);
        translate([0, (BarrelDiameter / 2) - 2, 0]) cube([8-0.3, 8, 30], center = true);
    }

}

module animationMotorCap () {
    difference() {
        animationMotorCapPositive();
        rotate([0, 0, -60]) translate([14.5, 0, -(10/2)-(5/2)]) {
            cube([2.5, 5.7, 6], center = true);
            rotate([0, 90, 0]) cylinder(r = R(3.25), h = 10, center = true, $fn = 40);
        }
        rotate([0, 0, 120]) translate([14.5, 0, -(10/2)-(5/2)])  {
            cube([2.5, 5.7, 6], center = true);
            rotate([0, 90, 0]) cylinder(r = R(3.25), h = 10, center = true, $fn = 40);
        }
        //m3 set screw
        rotate([0, 0, 180]) translate([14.5, 0, 0]) {
            translate([2, 0, -6]) cube([2.5, 5.7, 20], center = true);
            rotate([0, 90, 0]) {
                cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
                translate([0, 0, 6.5]) cylinder(r = R(6), h = 3, center = true, $fn = 40);
            }
        }
    }
}

module driveCoupling () {
    D = 15.5;
    H = 41-3;
    Divot = 2.75;
    difference() {
        union() {
            cylinder(r = R(D), h = H, center = true, $fn = 80);
            translate([0, 0, 2]) cylinder(r = R(BearingInnerDiameter), h = H, center = true, $fn = 80);
        }
        translate([0, 0, -(H/2)+6.5]) rotate([0, 0, 90]) scale([1.05, 1.05, 1]) NEMA17_motor_shaft();
        //bottom M3
        translate([-4.5, 0, -(H/2) + 4.9]) cube([2.5, 5.7, 12], center = true);
        translate([-10, 0, -(H/2) + 9 - 3]) rotate([90, 0, 90]) cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
        //top M3
        translate([-4.5, 0, (H/2)-4.9+2]) cube([2.5, 5.7, 10], center = true);
        translate([-10, 0, (H/2)-9+5]) rotate([90, 0, 90]) cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
        translate([0, 0, (H/2)-3]) difference() {
            cylinder(r = R(7.8), h = 10.2, center = true, $fn = 100);
            translate([-7.8+2, 0, 0]) cube([7.8, 7.8, 10+1], center = true);
        }
    }
}

/**
 ** DC Motor Design
 **/

module animationMotorDCBodyPositive () {
    rimH = 10 + 3.5;
    difference () {
        motorBarrel();
        //hollow out
        translate([0, 0, 4]) cylinder(r = R(BarrelDiameter) - 5, h = BarrelLength, center = true, $fn = 200);
        //cut
        translate([0, 0, 40]) cube([100, 100, BarrelLength], center = true);
        cylinder(r = R(23), h = BarrelLength + 1, center = true, $fn = 100);
        //window
        translate([0, (BarrelDiameter / 2) - 2, -10+5+30]) cube([8, 8, 40], center = true);
    }

    //rim
    translate([0, 0, -(BarrelLength / 2) - (rimH / 2)]) {
        difference () {
            cylinder(r = R(BarrelDiameter) + 2, h = rimH, center = true, $fn = 200);
            cylinder(r = R(23), h = rimH + 1, center = true, $fn = 100);
        }
    }
    
    //geared motor mount
    translate([0, 0, -34 - 4 - 3 - 3.5]) {
        intersection () {
            rotate([0, 0, -90]) minimal_mount();
            union () {
                cylinder(r = R(BarrelDiameter) + 2, h = 10, center = true, $fn = 200);
                translate([0, -30, 0]) cube([33, 60, 10], center = true);
            }
        }
    }
    
    //notch
    $fn = 50;
    rotate([0, 0, 35]) {
        translate([BarrelDiameter / 2, 0, -(BarrelLength / 2) + NotchOffset]) {
            rotate([0, 90, 0]) {
                cylinder(r = R(NotchDiameter), h = 1, center = true);
                translate([0, 0, NotchDiameter / 4]) sphere(r = R(NotchDiameter));
            }
        }
    }
}

module boltSlotDC () {
    cylinder(r = R(6), h = 52, center = true, $fn = 40);
}

module animationMotorDCBody () {
    boltZOffset = -15.01;
    padZ = 5.4;
    difference () {
        union () {
            animationMotorDCBodyPositive();
            translate([-22, -8.75-1.25, -34 + (4/2)-.5 - 5.04-1.5]) cube([16.1+1, 28.1+1, padZ], center = true);
        }
        cylinder(r = R(18), h = 160, center = true, $fn = 100);
        translate ([0, -8, 0]) {
            translate([MOTOR_MOUNT_Y/2, MOTOR_MOUNT_X/2, boltZOffset]) boltSlotDC();
            translate([MOTOR_MOUNT_Y/2, -MOTOR_MOUNT_X/2, boltZOffset]) boltSlotDC();
            translate([-MOTOR_MOUNT_Y/2, MOTOR_MOUNT_X/2, boltZOffset]) boltSlotDC();
            translate([-MOTOR_MOUNT_Y/2, -MOTOR_MOUNT_X/2, boltZOffset]) boltSlotDC();
        }
        //microswitch
        translate([-22, -8.75-1.25, -34 + (4/2)-.5 - 2]) {
            cube([16 + 1.1, 28 + 1.1, 8], center = true);
            translate([0, 0, 30]) cube([16, 28, 60], center = true);
            translate([6, 7, 28]) cube([26, 15, 60], center = true);
            //microswitch lever
            translate([10, 8-3, 2-1]) cube([16, 15+6, 8], center = true);
        }
        //cap m3s
        rotate([0, 0, -60]) translate([14.5, 0, capM3OffsetZ]) {
            rotate([0, 90, 0]) {
                cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
                translate([0, 0, 6.5]) cylinder(r = R(6), h = 3, center = true, $fn = 40);
            }
        }
        rotate([0, 0, 120]) translate([14.5, 0, capM3OffsetZ])  {
            rotate([0, 90, 0]) {
                cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
                translate([0, 0, 6.5]) cylinder(r = R(6), h = 3, center = true, $fn = 40);
            }
        }
        //microswitch m3s
        translate([-22, -8.75-1.25, -34 + (4/2)-.5 - 5.04-1.5]) {
            translate([-(16 / 2) + 3, (28 / 2) - 3, 0]) {
                cylinder(r = R(3.5), h = padZ + 1, center = true, $fn = 40);
                translate([0, 0, -5.9]) cylinder(r = R(6), h = padZ + 1, center = true, $fn = 40);
            }
            translate([(16 / 2) - 3, -(28 / 2) + 3, 0]) {
                cylinder(r = R(3.5), h = padZ + 1, center = true, $fn = 40);
                translate([0, 0, -5.9]) cylinder(r = R(6), h = padZ + 1, center = true, $fn = 40);
            }
        }
    }
}

module animationMotorDCCapPositive () {
    difference() {
        cylinder(r = R(BarrelDiameter), h = 10, center = true, $fn = 200);
        translate([0, 0, -(10 /2) + (7.5/2) - 0.1]) cylinder(r = R(BearingDiameter), h = 7.5, center = true, $fn = 80);
        cylinder(r = R(13), h = 10 + 1, center = true, $fn = 80);
    }
    translate([0, 0, -(10/2)-(5/2)]) difference() {
        cylinder(r = R(BarrelDiameter) - 5.3, h = 5, center = true, $fn = 200);
        cylinder(r = R(BarrelDiameter) - 7.5, h = 5 + 1, center = true, $fn = 200);
    }
    translate([0, 0, -(10/2)-(5/2)]) difference() {
        union() {
            rotate([0, 0, -60]) translate([13, 0, 0]) cube([6, 8, 5], center = true);
            rotate([0, 0, 120]) translate([13, 0, 0]) cube([6, 8, 5], center = true);
        }
        cylinder(r = R(BearingDiameter)+1, h = 5 + 1, center = true, $fn = 200);
    }
    translate([0, 0, -(10/2)-(5/2)]) intersection() {
        cylinder(r = R(BarrelDiameter), h = 5, center = true, $fn = 200);
        translate([0, (BarrelDiameter / 2) - 2, 0]) cube([8-0.3, 8, 30], center = true);
    }
    translate([0, 0, -(10/2)-(5/2)]) intersection() {
        cylinder(r = R(BarrelDiameter), h = 5, center = true, $fn = 200);
        translate([-22, -8.75-1.25, 0]) cube([16-0.3, 28-0.3, 20], center = true);
    }
}

module animationMotorDCCap () {
    difference() {
        animationMotorDCCapPositive();
        rotate([0, 0, -60]) translate([14.5, 0, -(10/2)-(5/2)]) {
            cube([2.5, 5.7, 6], center = true);
            rotate([0, 90, 0]) cylinder(r = R(3.25), h = 10, center = true, $fn = 40);
        }
        rotate([0, 0, 120]) translate([14.5, 0, -(10/2)-(5/2)])  {
            cube([2.5, 5.7, 6], center = true);
            rotate([0, 90, 0]) cylinder(r = R(3.25), h = 10, center = true, $fn = 40);
        }
        //m3 set screw
        rotate([0, 0, 180]) translate([14.5, 0, 0]) {
            translate([2, 0, -6]) cube([2.5, 5.7, 20], center = true);
            rotate([0, 90, 0]) {
                cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
                translate([0, 0, 6.5]) cylinder(r = R(6), h = 3, center = true, $fn = 40);
            }
        }
    }
}

module driveCouplingDC () {
    D = 15.5;
    H = 49;
    Divot = 2.75;
    difference() {
        union() {
            cylinder(r = R(D), h = H, center = true, $fn = 80);
            translate([0, 0, 2]) cylinder(r = R(BearingInnerDiameter), h = H, center = true, $fn = 80);
        }
        translate([0, 0, -(H/2)+5]) rotate([0, 0, 180]) scale([1.05, 1.05, 1]) motor_shaft();
        //bottom M3
        translate([-4.5, 0, -(H/2) + 4.9]) cube([2.5, 5.7, 12], center = true);
        translate([-10, 0, -(H/2) + 9 - 3]) rotate([90, 0, 90]) cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
        //top M3
        translate([-4.5, 0, (H/2)-4.9+2]) cube([2.5, 5.7, 10], center = true);
        translate([-10, 0, (H/2)-9+5]) rotate([90, 0, 90]) cylinder(r = R(3.25), h = 20, center = true, $fn = 40);
        translate([0, 0, (H/2)-3]) difference() {
            cylinder(r = R(7.8), h = 10.2, center = true, $fn = 100);
            translate([-7.8+2, 0, 0]) cube([7.8, 7.8, 10+1], center = true);
        }
        //divot for switch
        translate([0, -D + Divot, 0]) cylinder(r = R(D), h = H, center = true, $fn = 80);
        translate([0, -D + (3 * (Divot / 4)), 0]) cube([D, D, H + 1], center = true);
        difference () {
            translate([0, -D + 4, 0]) cube([D, D, H], center = true);
            translate([0, -D + 4, 0]) cube([8, D+1, H + 1], center = true);
            translate([4.25, -(D / 2) + 4.6, 0]) cylinder(r = R(D/3), h = H + 1, center = true, $fn = 60);
            translate([-4.25, -(D / 2) + 4.6, 0]) cylinder(r = R(D/3), h = H + 1, center = true, $fn = 60);
        }
    }

}

module driveCouplingDCConnector () {
    H = 17;
    H2 = 20;
    H3 = 4;
    D1 = 9;
    RIDGES=5;
    SHAFT_D = 7.8;
    translate([0, 0, 0]) difference() {
        cylinder(r = R(SHAFT_D), h = H, center = true, $fn = 100);
        translate([-SHAFT_D+2, 0, 0]) cube([SHAFT_D, SHAFT_D, H+1], center = true);
        translate([-2, 0, -5]) rotate([90, 30, 90]) m3_nut();
    }
    translate([0, 0, (H/2)+(H2/2)]) cylinder(r = R(D1), h = H2, center = true, $fn = 80);
    translate([0, 0, (H/2)+(H3/2)]) cylinder(r1 = R(BearingInnerDiameter), r2 = R(D1), h = H3, center = true, $fn = 80);
    difference() {
        union(){
            for (i = [0 : RIDGES-1]) {
                rotate([0, 0, i*(360/RIDGES)]) translate([0, 0, (H/2)+H2-3]) rotate([90, 0, 0]) cylinder(r = R(DriveDiameter1), h = 1, center = true, $fn = 80);
            }
        }
        translate([0, 0, (H/2)+H2+(20/2)]) cube([20, 20, 20], center = true);
    }
}


LIBRARY = true;
PART = "bellows_camera_board_adapter";

if (PART == "drive_coupling_DC_connector") {
    driveCouplingDCConnector();
} else if (PART == "drive_coupling_DC") {
    driveCouplingDC();
} else if (PART == "animation_motor_DC_cap") {
    rotate([180, 0, 0]) animationMotorDCCap();
} else if (PART == "animation_motor_DC") {
    animationMotorDCBody();
} else if (PART == "animation_motor") {
    animationMotorBody();
} else if (PART == "animation_motor_cap") {
    rotate([180, 0, 0]) animationMotorCap();
} else if (PART == "drive_coupling") {
    driveCoupling();
} else if (PART == "bellows_camera_board_adapter") {
    bodyCapBellowsAdapter();
} else if (PART == "bellows_camera_board") {
    bellows_camera_board();
}