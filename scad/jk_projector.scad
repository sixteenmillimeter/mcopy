
module gear () {
    //GEAR PINION
    OD = 7;
    ID = 5;
    H = 7;
    TEETH = 12;
    TOOTH_W = .9;
     //center
    cylinder(r = ID / 2, h = 7, center = true, $fn = 60);
    for (i = [0 : TEETH - 1]) {
        rotate([0, 0, i * (360 / TEETH)])  translate([0, 2.9, 0]) cube([TOOTH_W, 1.1, H], center = true);
    }
}

module notched_shaft (H = 10) {
    D = 5;
    difference () {
        cylinder(r = D / 2, h = H, center = true, $fn = 50);
        translate([4.25, 0, 0]) cube([D, D, H + 1], center = true);
    }
}

module notched_roller () {
    D = 37.75;
    D2 = 34.5;
    H = 3.5;
    H2 = 14.5;
    difference () {
        union () {
            difference () {
                cylinder(r = D / 2, h = H, $fn = 180, center = true);
                translate([D / 2, 0, 0]) scale([1, 2, 1]) rotate([0, 0, 45]) cube([2, 2, H + 1], center = true);
            }
            translate([0, 0, -(H / 2) - (H2 / 2)]) cylinder(r = D2 / 2, h = H2, $fn = 180, center = true);
        }
                for (i = [0 : 2]) {
            rotate([0, 0, i * (360 / 3)]) translate([D / 4, 0, 0]) cylinder(r = 6 / 2, h = H2 * 4, $fn = 80, center = true);
        }
        translate([0, 0, -H - (H2 / 2) - 1]) rotate([0, 0, 60]) notched_shaft();
    }
    
}

PART = "gear";

if (PART == "gear") {
    translate([0, 0, 5]) gear();
    notched_roller();
    
}