
// THREAD
// 

module jk_projector_knob () {
    $fn = 120;
    count = 3;
    cylinder(r = 15 / 2, h = 22, center = true);
    for (i = [0 : count - 1]) {
        rotate([0, 0, i * (360 / count) ])    translate([0, 8, -3]) difference () {
            cube([9, 16, 16], center = true);
            translate([0, 8, 6]) rotate([-45, 0, 0]) cube([9 + 1, 20, 16], center = true);
          translate([8, 0, 0]) rotate([0, 0, 15]) cube([9, 20, 16+ 1], center = true);
          translate([-8, 0, 0]) rotate([0, 0, -15]) cube([9, 20, 16+ 1], center = true);
        }
        
    }
}

jk_projector_knob();