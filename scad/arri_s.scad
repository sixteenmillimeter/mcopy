// Arri-S Animation Motor

include <./common.scad>;
include <./takeup.scad>;

BarrelDiameter = 45;
BarrelLength = 52;

SeatDiameter = 20;
SeatLength = 5.8;

CapLength = 19;
CapDiameter = 40;
CapThickness = 3;

CapCatchDiameter = 38;
CapCatchLength = 2;
CapCatchOffset = 15;

CapRimDiameter = 46.5;
CapRimThickness = 3;

NotchDiameter = 2;
NotchOffset = 3;

DriveLength = 7;
DriveDiameter1 = 11;
DriveDiameter2 = 9;

ShaftLength = 2.75;
ShaftDiameter = 5;

PART = "none";

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
        cube([CapDiameter - CapThickness - 12, CapDiameter - CapThickness - 12, CapRimThickness + 1], center = true);
        }
    }
}

module animationMotorBodyPositive () {
    difference () {
        motorBarrel();
        //hollow out
        translate([0, 0, 4]) cylinder(r = R(BarrelDiameter) - 5, h = BarrelLength, center = true, $fn = 200);
        //cut
        translate([0, 0, 20]) cube([100, 100, BarrelLength], center = true);
        cylinder(r = R(23), h = BarrelLength + 1, center = true, $fn = 100);
        translate([0, (BarrelDiameter / 2) - 2, -10]) cube([8, 8, 16], center = true);
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
    cylinder(r = R(6), h = 40, center = true, $fn = 40);
    cylinder(r = R(3.25), h = 50, center = true, $fn = 40);
}

module animationMotorBody () {
    boltZOffset = -6;
    difference () {
        animationMotorBodyPositive();
        translate([31/2, 31/2, boltZOffset]) boltSlot();
        translate([31/2, -31/2, boltZOffset]) boltSlot();
        translate([-31/2, 31/2, boltZOffset]) boltSlot();
        translate([-31/2, -31/2, -6]) boltSlot();
    }
}

module animationMotorDCBodyPositive () {
    difference () {
        motorBarrel();
        //hollow out
        translate([0, 0, 4]) cylinder(r = R(BarrelDiameter) - 5, h = BarrelLength, center = true, $fn = 200);
        //cut
        translate([0, 0, 20]) cube([100, 100, BarrelLength], center = true);
        cylinder(r = R(23), h = BarrelLength + 1, center = true, $fn = 100);
        //window
        translate([0, (BarrelDiameter / 2) - 2, -10]) cube([8, 8, 30], center = true);
    }

    //rim
    translate([0, 0, -(BarrelLength / 2) - (8 / 2)]) {
        difference () {
            cylinder(r = R(BarrelDiameter) + 2, h = 8, center = true, $fn = 200);
            cylinder(r = R(23), h = 8 + 1, center = true, $fn = 100);
        }
    }
    
    //geared motor mount
    translate([0, 0, -34 - 4]) {
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
    cylinder(r = R(6), h = 40, center = true, $fn = 40);
}

module animationMotorDCBody () {
    boltZOffset = -15.01;
    difference () {
        animationMotorDCBodyPositive();
        translate ([0, -8, 0]) {
            translate([MOTOR_MOUNT_Y/2, MOTOR_MOUNT_X/2, boltZOffset]) boltSlotDC();
            translate([MOTOR_MOUNT_Y/2, -MOTOR_MOUNT_X/2, boltZOffset]) boltSlotDC();
            translate([-MOTOR_MOUNT_Y/2, MOTOR_MOUNT_X/2, boltZOffset]) boltSlotDC();
            translate([-MOTOR_MOUNT_Y/2, -MOTOR_MOUNT_X/2, boltZOffset]) boltSlotDC();
        }
        //microswitch
        translate([-22, -8.75-1.25, -34 + (4/2)-.5]) {
        cube([16, 28, 9.5 + 4], center = true);
        //microswitch lever
        translate([10, 8, 2]) cube([16, 15, 5.5], center = true);
       }
    }
    //color("red") translate([0, -8.75, -45-4]) rotate([180, 0, -90]) geared_motor();
    color("blue") translate([-22, -10, -30.5]) microswitch();
}

//translate([0, 50, 0]) color("red") motorOriginal();
//bodyCapBellowsAdapter();
//animationMotorBody();
//translate([0, 0, -49.5]) color("green") NEMA17();
//bodyCap();
animationMotorDCBody();