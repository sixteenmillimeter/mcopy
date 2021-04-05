module lamp_housing_dial () {
    SHAFT_D = 6.5;
    H = 11;
    NOTCH = 1;
    COUNT = 10;
    difference () {
        cylinder(r = 20 / 2, h = H + 4, center = true, $fn = 70);
        translate([0, 0, 2.01]) difference () {
            cylinder(r = SHAFT_D / 2, h = H, center = true, $fn = 70);
            translate([SHAFT_D - NOTCH, 0, 0]) cube([SHAFT_D, SHAFT_D, H + 1], center = true);
        }
    }
    rotate([0, 0, -125]) translate([20, 0, 1.25]) {
        difference () {
            cube([10, 7, 3], center = true);
            translate([0, 7, 0]) rotate([0, 0, -30]) cube([20, 7, 3 + 1], center = true);
            translate([0, -7, 0]) rotate([0, 0, 30]) cube([20, 7, 3 + 1], center = true);
        }
    }
    translate([0, 0, -(H / 2)]) cylinder(r = 30 / 2, h = 4, center = true, $fn = 300);
    for (i = [0 : COUNT-1]) {
        rotate([0, 0, i * (360 / COUNT)]) translate([15, 0, -2.5]) {
            sphere(r = 10 / 2, $fn = 80);
            translate([0, 0, 2.75]) cylinder(r = 10 / 2, h = 5, center = true, $fn = 80);
        }
    }
    translate([0, 0, -0.25]) difference () {
        cylinder(r = 25 / 2, h = 6, center = true, $fn = 200);
        cylinder(r = (SHAFT_D + 2) / 2, h = 6 + 1, center = true);
    }
}

lamp_housing_dial();