module top () {
    $fn = 120;
    ID = 11.5;
    VOID = 15;
    OD = 19;
    H = 11;
    difference () {
        cylinder(r = OD / 2, h = H, center = true);
        cylinder(r = ID / 2, h = H + 1, center = true);
        translate([0, 0, -2]) cylinder(r = VOID / 2, h = H, center = true);
    }
}

module bottom () {
    $fn = 120;
    difference () {
        cylinder(r2 = 19 / 2, r1 = 10 / 2, h = 15, center = true);
        cylinder(r2 = 14.9 / 2, r1 = 6 / 2, h = 15.1, center = true);
    }
    translate([0, 0, 6.5]) difference () {
        cylinder(r = 14.9 / 2, h = 4, center = true);
        cylinder(r = 13 / 2, h = 4 + 1, center = true);

    }
}

//top();
translate([0, 0, -19]) difference () {
    bottom();
    //translate([0, 20, 0]) cube([40, 40, 40], center = true);
}