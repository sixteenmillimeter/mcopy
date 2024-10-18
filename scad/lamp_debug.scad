use <./common/common.scad>;

LensD = 42;
LensT = 2.25;
LensSphere = 74.5;

NeopixelD = 23.5;
NeopixelSpacing = 19.1;
NeopixelBoltD = 2;
NeopixelT = 1.7;

BaseY = -50;

module lens (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        cylinder(r = R(LensD), h = LensT, center = true, $fn = 120);
        difference () {
            translate([0, 0, (-LensSphere / 2) + 6.5]) sphere(r = R(LensSphere), $fn = 240);
            translate([0, 0, -50]) cube([100, 100, 100], center = true);
        }
    }
}

module neopixel_seven (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Z = 1.7;
    translate(pos) rotate(rot) {
        difference () {
            cylinder(r = R(NeopixelD), h = NeopixelT, center = true, $fn = 50);
            translate([NeopixelSpacing / 2, 0, 0]) cylinder(r = R(NeopixelBoltD), h = 10, center = true, $fn = 20);
            translate([-NeopixelSpacing / 2, 0, 0]) cylinder(r = R(NeopixelBoltD), h = 10, center = true, $fn = 20);
        }
        translate([0, 0, Z]) cube([4.8, 4.8, 1.7], center = true);
        translate([0, 7.2, Z]) cube([4.8, 4.8, 1.7], center = true);
        translate([0, -7.2, Z]) cube([4.8, 4.8, 1.7], center = true);
        rotate([0, 0, 60]) translate([0, 7.2, Z]) cube([4.8, 4.8, 1.7], center = true);
        rotate([0, 0, -60]) translate([0, -7.2, Z]) cube([4.8, 4.8, 1.7], center = true);
        rotate([0, 0, -60]) translate([0, 7.2, Z]) cube([4.8, 4.8, 1.7], center = true);
        rotate([0, 0, 60]) translate([0, -7.2, Z]) cube([4.8, 4.8, 1.7], center = true);
    }
}

module lens_mount (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cylinder(r = R(48), h = 5, center = true, $fn = 120);
                translate([0, -30, 0]) cube([25, 40, 5], center = true);
                translate([0, BaseY, 0]) cube([25, 5, 15], center = true);
            }
            translate([0, 50, 0]) cube([100, 100, 100], center = true);
            cylinder(r = R(40), h = 5 + 1, center = true, $fn = 120);
            cylinder(r = R(42.25), h = 2.5, center = true, $fn = 120);
            translate([25.5 / 2, -50, -1.7 / 2]) rotate([0, 45, 0]) cube([1, 20, 1], center = true);
            translate([-25.5 / 2, -50, -1.7 / 2]) rotate([0, 45, 0]) cube([1, 20, 1], center = true);
        }
    }
}

module neopixel_seven_mount (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cylinder(r = R(26), h = 5, center = true, $fn = 120);
                translate([0, -25, 0]) cube([25, 50, 5], center = true);
                translate([0, BaseY, -3]) cube([25, 5, 15], center = true);
            }
            cylinder(r = R(23.7), h = 2, center = true, $fn = 120);
            cylinder(r = R(15), h = 5 + 1, center = true, $fn = 120);
            translate([0, 0, 5 / 2]) cylinder(r = R(21.5), h = 5, center = true, $fn = 120);
            translate([0, 23.7 / 2, 0]) cube([23.7, 23.7, 2], center = true);
            translate([0, 53, 0]) cube([100, 100, 100], center = true);
            //bolts
            translate([NeopixelSpacing / 2, 0, 0]) cylinder(r = R(NeopixelBoltD), h = 10, center = true, $fn = 20);
            translate([-NeopixelSpacing / 2, 0, 0]) cylinder(r = R(NeopixelBoltD), h = 10, center = true, $fn = 20);
            //caps
            translate([NeopixelSpacing / 2, 0, 10 / 2]) cylinder(r = R(4), h = 10, center = true, $fn = 20);
            translate([-NeopixelSpacing / 2, 0, 10 / 2]) cylinder(r = R(4), h = 10, center = true, $fn = 20);
            //marks
            translate([25.5 / 2, -50, 0]) rotate([0, 45, 0]) cube([1, 20, 1], center = true);
            translate([-25.5 / 2, -50, 0]) rotate([0, 45, 0]) cube([1, 20, 1], center = true);
        }
    }
}

//lens([0, 0, 20]);
lens_mount([0, 0, 0]);

//neopixel_seven();
//neopixel_seven_mount();