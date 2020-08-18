
// THREAD
// 1/4" 20 (coarse)

module hex (diag = 10, h = 1) {
    cylinder(r = diag / 2, h = h, center = true, $fn = 6);
}

module jk_projector_knob_positive () {
    $fn = 120;
    count = 3;
    cylinder(r = 16 / 2, h = 22, center = true);
    for (i = [0 : count - 1]) {
        rotate([0, 0, i * (360 / count) ])    translate([0, 8+3, -3]) difference () {
            cube([9, 16, 16], center = true);
            translate([0, 8, 6]) rotate([-45, 0, 0]) cube([9 + 1, 16*2, 16], center = true);
          translate([8, 0, 0]) rotate([0, 0, 10]) cube([9, 20, 16+ 1], center = true);
          translate([-8, 0, 0]) rotate([0, 0, -10]) cube([9, 20, 16+ 1], center = true);
        }
        
    }
}
//20-12
module jk_projector_knob () {
    difference () {
        jk_projector_knob_positive();
        translate([0, 0, -(22 - 12)]) rotate([0, 0, 30]) hex(13.5, 22);
         cylinder(r = 6.3 / 2, h = 22 + 1, center = true, $fn = 50);
    }
}

//hex(13 - .5, 11-4.5);

jk_projector_knob();