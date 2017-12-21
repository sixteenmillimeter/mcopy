

module bellows_camera_board () {
    H = 6;
    difference () {
        cube([60, 60, H], center = true);
        //center
        cylinder(r = 38 / 2, h = H + 1, center = true, $fn = 360);
        //center bevels
        translate([0, 0, 2.25]) cylinder(r1 = 36 / 2, r2 = 40 / 2, h = 1.5, center = true, $fn = 360);
        translate([0, 0, -2.25]) cylinder(r1 = 40 / 2, r2 = 36 / 2, h = 1.5, center = true, $fn = 360);
        //corners
        for (i = [0 : 3]) {
            rotate([0, 0, i * (360 / 4) + 45 ]) translate([43.5, 0, 0]) cube([11, 11, H + 1], center = true);
        }
    }

}

bellows_camera_board();