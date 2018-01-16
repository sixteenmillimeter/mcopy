$fn=200;
module lens_cap_back () {
    difference() {
        cylinder(r = 36 / 2, h = 9, center = true);
        translate([0, 0, 2]) cylinder(r = 33 / 2, h = 9, center = true);
    }
}

lens_cap_back();