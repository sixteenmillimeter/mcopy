include <./common.scad>;

RAIL_SPACING = 100;
RAIL_H = 70;
RAIL_LEN = 400;
RAIL_D=25.4;

module rail (H = 100) {
    cylinder(r = R(RAIL_D), h = H, center = true, $fn = 60);
}

module rails () {
    translate([RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) rail(RAIL_LEN);
    translate([-RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) rail(RAIL_LEN);
}

module end () {
    L = 50;
    T = 20;
    translate ([0, -L / 2, 0]) {
        difference () {
            union () {
                translate([RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) {
                    cylinder(r = R(35), h = L, center = true, $fn = 60);
                }
                translate([-RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) {
                    cylinder(r = R(35), h = L, center = true, $fn = 60);
                }
                translate([0, 0, RAIL_H + (35 / 2) - (T / 2)]) cube([RAIL_SPACING, L, T], center = true);
                translate([RAIL_SPACING/2 - (5 / 2), 5, RAIL_H / 2]) cube([40, 40, RAIL_H], center = true);
                translate([-RAIL_SPACING/2 + (5 / 2), 5, RAIL_H / 2]) cube([40, 40, RAIL_H], center = true);
            }
            translate([RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) {
                rail(L + 1);
            }
            translate([-RAIL_SPACING/2, 0, RAIL_H]) rotate([90, 0, 0]) {
                rail(L + 1);
            }
        }
    }
}


color("blue") rails(); 
translate([0, RAIL_LEN / 2, 0]) end();