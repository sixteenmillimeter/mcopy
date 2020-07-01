include <./arduino.scad>;

module rounded_cube (c, d) {
    r = d / 2;
    scaled = [c[0] - d, c[1] - d, c[2] - d];
    minkowski() {
        sphere(r = r);
        cube(scaled, center = true);
    }
}


module case_bottom () {
    $fn = 60;
    difference () {
        rounded_cube([85, 75, 30], 8);
        rounded_cube([85 - 6, 75 - 6, 30 - 6], 6);
        translate([0, 0, 25]) cube([85, 75, 30], center = true);
        translate([40, -6.5, 4]) cube([15, 13, 20], center = true);
     
        translate([20, -37, 0]) rotate([90, 0, 0]) cylinder(r = 5 / 2, h = 10 + 1, center = true);
        translate([-20, -37, 0]) rotate([90, 0, 0]) cylinder(r = 5 / 2, h = 10 + 1, center = true);
        //translate([0, 20, 0]) cube([100, 100, 100], center = true);
    }
    
    translate([20, -37, 0]) rotate([90, 0, 0]) difference () {
        cylinder(r = 9 / 2, h = 5, center = true);
        cylinder(r = 5 / 2, h = 10 + 1, center = true);
    }

    translate([-20, -37, 0]) rotate([90, 0, 0]) difference () {
        cylinder(r = 9 / 2, h = 5, center = true);
        cylinder(r = 5 / 2, h = 10 + 1, center = true);
    }
    
    difference () {
        translate([36, -22, -17]) rotate([0, 0, 90]) standoffs(UNO, mountType=PIN);
        translate([0, 0, -29]) cube([85, 75, 30], center = true);
    }
    
    translate([0, 42, -(30 / 2) + (5 / 2) - 1.5]) difference () {
        rounded_cube([20, 20, 10], 4);
        translate([0, 0, -6]) cube([20, 20, 10], center = true);
        translate([0, -17, 6]) cube([20, 20, 10], center = true);
        translate([0, 3, 0]) cylinder(r = 4 / 2, h = 10, center = true);
    }
    
    translate([0, -42, -(30 / 2) + (5 / 2) - 1.5]) difference () {
        rounded_cube([20, 20, 10], 4);
        translate([0, 0, -6]) cube([20, 20, 10], center = true);
        translate([0, 17, 6]) cube([20, 20, 10], center = true);
        translate([0, -3, 0]) cylinder(r = 4 / 2, h = 10, center = true);
    }
    translate([36, -31, -1.5]) difference () {
        cylinder(r = 7 / 2, h = 23, center = true);
        translate([0, 0, 15]) cylinder(r = 2 / 2, h = 23, center = true);
    }
    translate([-36, 31, -1.5]) difference () {
        cylinder(r = 7 / 2, h = 23, center = true);
        translate([0, 0, 15]) cylinder(r = 2 / 2, h = 23, center = true);
    }
}

module case_top () {
    $fn = 60;
    difference () {
        rounded_cube([85, 75, 30], 8);
        translate([0, 0, 17]) cube([85, 75, 30], center = true);
        translate([0, 0, -17]) cube([85, 75, 30], center = true);
        translate([36, -31, 0]) {
            cylinder(r = 2 / 2, h = 23, center = true);
            translate([0, 0, 23 / 2]) cylinder(r = 4 / 2, h = 23, center = true);
        }
        translate([-36, 31, 0]) {
            cylinder(r = 2 / 2, h = 23, center = true);
            translate([0, 0, 23 / 2]) cylinder(r = 4 / 2, h = 23, center = true);
        }
    }
}

PART="bottom";

if (PART == "bottom") {
    case_bottom();
    //translate([36, -22, -7]) rotate([0, 0, 90]) arduino();
    //translate([0, 0, 20]) case_top();
} else if (PART == "top") {
    case_top();
}