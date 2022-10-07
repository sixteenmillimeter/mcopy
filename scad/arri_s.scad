// Arri-S Animation Motor

include <../common.scad>;

BarrelDiameter = 40;
BarrelLength = 75;

SeatDiameter = 20;
SeatLength = 3;

CapLength = 30;
CapDiameter = 30;
CapThickness = 3;

CapCatchDiameter = 28;
CapCatchLength = 2;
CapCatchOffset = 24;

CapRimDiameter = 37;
CapRimThickness = 3;

NotchDiameter = 2;
NotchOffset = 3;

DriveLength = 8;
DriveDiameter1 = 14;
DriveDiameter2 = 12;

module motorBarrel () {
    $fn = 200;
    cylinder(r = BarrelDiameter / 2, r2 = (BarrelDiameter - 1) / 2, h = BarrelLength, center = true);
}

module motorSeat () {
    $fn = 120;
    cylinder(r = SeatDiameter / 2, h = SeatLength, center = true);
}

module motor () {
    motorBarrel();
    translate([0, 0, (BarrelLength / 2) + (SeatLength / 2)]) motorSeat();
    //notch
    $fn = 50;
    translate([BarrelDiameter / 2, 0, -(BarrelLength / 2) + NotchOffset]) {
        rotate([0, 90, 0]) {
            cylinder(r = NotchDiameter / 2, h = 1, center = true);
            translate([0, 0, NotchDiameter / 4]) sphere(r = NotchDiameter / 2);
        }
    }
}

module capBellowsAdapter () {
    $fn = 200;
    difference () {
        cylinder(r = CapDiameter / 2, h = CapLength, center = true);
        cylinder(r = (CapDiameter - CapThickness) / 2, h = CapLength + 1, center = true);
        //catch
        translate([0, 0, (CapLength / 2) - CapCatchOffset]) difference () {
            cylinder(r = (CapDiameter + 1) / 2, h = CapCatchLength, center = true);
            cylinder(r = CapCatchDiameter / 2, h = CapCatchLength + 1, center = true);
        }
    }
    translate([0, 0, (CapLength / 2) + (CapRimThickness / 2)]) {
        difference () {
            cylinder(r = CapRimDiameter / 2, h = CapRimThickness, center = true);
            cube([CapDiameter - CapThickness - 8, CapDiameter - CapThickness - 8, CapRimThickness + 1], center = true);
        }
    }
}

motor();
//capBellowsAdapter();
