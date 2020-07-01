use <2020_profile.scad>
//translate([-35, 0, -25]) linear_extrude(height=175) 2020_profile();
translate([35, 0, -25]) linear_extrude(height=175) 2020_profile();

module rounded_cube (c, d) {
    r = d / 2;
    scaled = [c[0] - d, c[1] - d, c[2] - d];
    minkowski() {
        cylinder(r = r, h = r, center = true);
        cube(scaled, center = true);
    }
}

$fn = 100;
difference () {
    rounded_cube([120, 60, 40], d=10);
    //rails
    translate([-35, 0, 0]) cube([21, 21, 40 + 1], center = true);
    translate([35, 0, 0]) cube([21, 21, 40 + 1], center = true);
    //threaded rods
    translate([0, 0, 0])cylinder(r = 5, h = 40 + 1, center = true);
    //translate([-10, 0, 0])cylinder(r = 5, h = 40 + 1, center = true);
    
}