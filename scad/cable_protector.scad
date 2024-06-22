use <./common/common.scad>;

module m3_bolt(pos = [0, 0, 0], rot = [0, 0, 0], cap = 10, bolt = 20) {
    $fn = 40;
    translate(pos) rotate(rot) {
        translate([0, 0, (cap / 2) - 0.1]) cylinder(r = R(6), h = cap, center = true);
        translate([0, 0, -bolt / 2]) cylinder(r = R(3.15), h = bolt, center = true);
    }
}

module tube(pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        translate([0, 0, 2.501]) cylinder(r = R(7), h = 5, center = true, $fn = 40);
    }
}
module cable_protector_body(pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        difference () {
            union () {
                minkowski() {
                    cylinder(r = R(18), h = 35, center = true, $fn = 80);
                    sphere(r = R(6), $fn = 20);
                }
                tube([0, 9, 0], [0, 90, 0]);
                tube([0, -9, 0], [0, -90, 0]);
            }
            cylinder(r = R(7), h = 50, center = true, $fn = 80);
            cylinder(r = R(16), h = 33, center = true, $fn = 80);
            m3_bolt([5, 9, 0], [0, 90, 0]);
            m3_bolt([-5, -9, 0], [0, -90, 0]);
        }
    }
}

module cable_protector (top = true) {
    difference () {
        cable_protector_body();
        if (top) {
            translate([25, 0, 0]) cube([50, 50, 50], center = true);
        } else {
            translate([-25, 0, 0]) cube([50, 50, 50], center = true);
        }
    }
}

cable_protector(top = false);