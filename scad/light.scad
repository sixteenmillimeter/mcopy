include <./common.scad>;

/*
    CynKen 1Pcs Optical Glass RGB Dispersion Prism X-CUBE for Physics Teach Decoration Art
    Specifications:
    Material: K9 Cristal
    Size: 2cm x 2cm x 1.7cm/0.8'' x 0.8''
*/

module prism () {
    cube([20, 20, 17], center = true);
}

module adafruit_pixie () {
    $fn = 60;
    W = 0.8 * 25.4;
    L = 0.78 * 25.4;
    //L = 15;
    Z = 1.5;
    difference () {
        union () {
            rounded_cube([W, 15, Z], d = 3, center = true);
            rounded_cube([9, L, Z], d = 3, center = true);
            translate([W/2, 0, 0]) cylinder(r = 2, h = Z, center = true);
            translate([-W/2, 0, 0]) cylinder(r = 2, h = Z, center = true);
        }
        translate([W/2, 0, 0]) cylinder(r = 1, h = 10, center = true);
        translate([-W/2, 0, 0]) cylinder(r = 1, h = 10, center = true);
    }
    translate([0, 0, Z/2 + 1]) cylinder(r = 8/2, h=2, center = true);
    translate([0, 0, Z/2 + 1 + 1]) sphere(r = 2.5, center = true);
}

module pixie_mount () {
    $fn = 60;
    W = 0.8 * 25.4;
    L = 0.78 * 25.4;
    Z = 12;
    
    INNER_D = 1.9;

    FAN_W = 50;

    LENS_OFFSET = -5;

    if (DEBUG) {
        translate([0, LENS_OFFSET, 0]) rotate([90, 0, 0]) adafruit_pixie();
    }
    
    //pins for mounting pixie
    translate ([0, -0.5, 0]) rotate([90, 0, 0]) {
        translate([W/2, 0, -2]) cylinder(r = INNER_D / 2, h = Z + 1, center = true);
        translate([-W/2, 0, -2]) cylinder(r = INNER_D / 2, h = Z + 1, center = true);
        
        translate([W/2, 0, -(Z / 2) + 2]) cylinder(r = 2.2, h = Z, center = true);
        translate([-W/2, 0, -(Z / 2) + 2]) cylinder(r = 2.2, h = Z, center = true);
        
        translate([W/2, 0, -Z + (Z / 4)]) cylinder(r = 4, h = Z/2, center = true);
        translate([-W/2, 0, -Z + (Z / 4)]) cylinder(r = 4, h = Z/2, center = true);
        
        translate([W/2, 0, -1]) {
            difference () {
                translate([0, 0, -1]) cylinder(r = 4, h = Z, center = true);
                cylinder(r = 2.2, h = 20, center = true);
                translate([-5, 0, 11]) cube([10, 10, 20], center = true);
            }
        }
        translate([-W/2, 0, -1]) {
            difference () {
                translate([0, 0, -1]) cylinder(r = 4, h = Z, center = true);
                cylinder(r = 2.2, h = 20, center = true);
                translate([5, 0, 11]) cube([10, 10, 20], center = true);
            }
        }
    }
    
    //outer shell surrounding pixie
    translate ([0, -1 + LENS_OFFSET, -6]) {
        
        difference () {
            translate([0, 0, 6]) rounded_cube([W + 20, 40, 32], d = 6, center = true);
            translate([0, 0, 6]) rounded_cube([(W + 16) - 4, 36 - 4, 32 + 1], d = 4, center = true);
            //inner tab for centering
            translate([0, 0, 6]) cube([W + 16, 10, 32 - 10], center = true);
            //cylinder void for bolt
            translate([0, 3, 6]) rotate([0, 90, 0]) cylinder(r = 1, h = 40 + 1, center = true, $fn = 60);
            //cut in half
            translate([0, -50, 0]) cube([100, 100, 100], center = true);
            
            //wires
            translate([0, 0, -3]) cube([10, 40, 5], center = true);
            translate([-5, 0, -5.5]) cube([2, 40, 10], center = true);
        }
    }
}

module diffuser_mount () {
    $fn = 100;
    W = 0.8 * 25.4;
    translate ([0, 0, -6]) {
        difference () {
            translate([0, 0, 6]) rounded_cube([W + 20, 40, 32], d = 6, center = true);
            translate([0, 0, 6]) rounded_cube([(W + 16) - 4, 36 - 4, 32 + 1], d = 4, center = true);
            //circular void
            translate([0, -8, 8]) rotate([90, 0, 0]) cylinder(r = 10, h = 5, center = true);
            //cylinder void for bolt
            translate([0, 3, 6]) rotate([0, 90, 0]) cylinder(r = 1, h = 40 + 1, center = true, $fn = 60);
            //cut in half
            translate([0, 50, 0]) {
                difference () {
                    cube([100, 100, 100], center = true);
                    translate([0, -50, 6]) cube([W + 16, 10, 32 - 10], center = true);
                }
            }
            
            translate ([0, -18, 6]) rotate([90, 90, 0]) cylinder(r = 30 / 2, h = 20, center = true);
            //void for attachment
            translate([20, -8.5, 6]) cube([8, 8, 8], center = true);
        }
    }
    translate ([0, -15.5, 0]) rotate([90, 90, 0]) {
        difference () {
            cylinder(r = 30 / 2, h = 9, center = true);
            cylinder(r = 28 / 2, h = 9 + 1, center = true);
        }
    }    
}

module diffuser_spacer () {
    $fn = 100;
    LEN = 10;
    difference () {
        cylinder(r = 27.9 / 2, h = LEN, center = true);
        cylinder(r = 24 / 2, h = LEN + 1, center = true);
        translate([0, 0, (LEN / 2) - (2/2) ]) cylinder(r = 26 / 2, h = 2, center = true);
    }
    
}

module diffuser_insert () { 
    $fn = 100;
   cylinder(r = 26 / 2, h = 2, center = true);
}

module light_body () {
    FAN_W = 50;
    FAN_Z = 10;
    $fn = 60;
    translate([-8, 8, 0]) difference() {
        rounded_cube([FAN_W + 8, FAN_W + 8, FAN_Z], d = 6, center = true);
        rounded_cube([FAN_W + 1, FAN_W + 1, FAN_Z + 1], d = 4, center = true);
    }
    //trapezoid connector to the fan
    translate ([0, 0, (FAN_Z / 2) + (30 / 2) + 15]) {
        difference () {
            hull () {
                rounded_cube([40, 40, 0.1], d = 6, center = true);
                translate([-8, 8, -30]) rounded_cube([FAN_W + 8, FAN_W + 8, 0.1], d = 6, center = true); 
            }
            translate([0, 0, 0.1]) hull () {
                rounded_cube([32, 32, 0.1], d = 4, center = true);
                translate([-8, 8, -30.2]) 
                    //cylinder(r = (FAN_W - 8) / 2, h = 30.2, center = true);
                rounded_cube([FAN_W - 8, FAN_W - 8, 0.1], d = 20, center = true);
            }
        }
    }
    translate([0, 0, 34]) difference () {
            rounded_cube([36+4, 36+4, 10], d = 6, center = true);
            rounded_cube([36, 36, 10 + 1], d = 6, center = true);
        translate([0, -15, 51 - 34]) rotate([90, 0, 0]) cylinder(r = 30 / 2, h = 20, h = 20, center = true);
    }
    
}

module light_vent_top () {
       $fn = 60;
    W = 0.8 * 25.4;
    L = 0.78 * 25.4;
    Z = 12;
   translate([0, 0, -1.5]) difference () {
        rounded_cube([W + 20 + 6, 40 + 6, 13], d = 6, center = true);
        rounded_cube([W + 20, 40, 13 + 1], d = 6, center = true);
       translate([0, -15, -20 + 1.5]) rotate([90, 0, 0]) cylinder(r = 31 / 2, h = 30, center = true);
    }
    translate([0, 0, 1]) difference() {
        rounded_cube([W + 20 + 1, 40 + 1, 8], d = 6, center = true);
        for (i = [0:5]) {
            translate([i * 6, 0, 0]) rotate([0, -40, 0]) cube([4, 36 + 3, 12], center = true);
            translate([(i + 1) * -6, 0, 0]) rotate([0, -40, 0]) cube([4, 36 + 3, 12], center = true);
        }
        //translate([50, 0, 0]) cube([100, 100, 100], center = true);
    }
    
}

module fan () {
    $fn = 60;
    FAN_W = 50;
    FAN_Z = 10;
    SCREW_D = 4;
    SCREW_INNER = 6;
    difference () {
        rounded_cube([FAN_W, FAN_W, FAN_Z], d = 4, center = true);
        translate([(FAN_W - SCREW_INNER)/2, (FAN_W - SCREW_INNER)/2, 0]) cylinder(r = SCREW_D/2, h = FAN_Z + 1, center = true);
        translate([-(FAN_W - SCREW_INNER)/2, (FAN_W - SCREW_INNER)/2, 0]) cylinder(r = SCREW_D/2, h = FAN_Z + 1, center = true);
        translate([-(FAN_W - SCREW_INNER)/2, -(FAN_W - SCREW_INNER)/2, 0]) cylinder(r = SCREW_D/2, h = FAN_Z + 1, center = true);
        translate([(FAN_W - SCREW_INNER)/2, -(FAN_W - SCREW_INNER)/2, 0]) cylinder(r = SCREW_D/2, h = FAN_Z + 1, center = true);
        cylinder(r = (FAN_W - SCREW_INNER) /2, h = FAN_Z + 1, center = true);
    }
}

module flashlight_mount () {
        $fn = 100;
        FLASHLIGHT_D = 25.3;
        ROD_D = 12.6;
        difference () {
            rotate([0, 90, 0]) cylinder(r = FLASHLIGHT_D / 2 + 3, h = ROD_D, center = true);
            rotate([0, 90, 0]) cylinder(r = FLASHLIGHT_D / 2, h = ROD_D + .1, center = true);
        }
        
        translate([0, -35, 0]) rotate([90, 0, 0]) {
            difference () {
                cylinder(r = ROD_D / 2, h = 43, center = true);
                translate([-10, 0, 24.5]) cube([15, 15, 15], center = true);
            }
        }
        translate([0, -46.4, 0]) {
            difference() {
                    rotate ([90, 90, 0]) cylinder(r = (ROD_D / 2) + 2, h = 3, center = true);
                    translate([50 + (ROD_D / 2), 0, 0]) cube([100, 100, 100], center = true);
                    translate([-50 - (ROD_D / 2), 0, 0]) cube([100, 100, 100], center = true);
            }
        }
}

module flashlight_mount_cap (DEBUG = false) {
    $fn = 120;
    ROD_D = 12.6;
    translate([0, 0, 0]) rotate([90, 0, 0]) {
        difference () {
            union () {
                translate([0, 0, 0]) cylinder(r = 9, h = 7, center = true);
                translate([-6, 0, 0]) cube([12, 18, 7], center = true);
                translate([-10.75, 0, -3]) cube([2.5, 18, 11], center = true);
            }
            difference () {
                translate([0, 0, -(7 - 4.5) / 2 - .1]) cylinder(r = ROD_D / 2, h = 4.5, center = true);
                translate([-10, 0, 0]) cube([15, 15, 15], center = true);
            }
            if (DEBUG) {
                translate([0, 50, 0]) cube([100, 100, 100], center = true);
            }
        }
    }
}

module impromptu_mount () {
    $fn = 100;
    ROD_D = 12.6;
    
    translate([0, -35, 0]) rotate([90, 0, 0]) {
        difference () {
            union() {
                cylinder(r = ROD_D / 2, h = 43, center = true);
                translate([0, 0, -5]) cylinder(r = (ROD_D / 2) + 2, h = 30, center = true);
            }
            //notch for cap
            translate([-10, 0, 24.5]) cube([15, 15, 15], center = true);
            translate([0, 0, -22.25]) cube([45, 45, 15], center = true);
        }
        translate([0, 0, -17]) cube([8, 8, 5], center = true);
    }
    translate([0, -46.4, 0]) {
        difference() {
                rotate ([90, 90, 0]) cylinder(r = (ROD_D / 2) + 2, h = 3, center = true);
                translate([50 + (ROD_D / 2), 0, 0]) cube([100, 100, 100], center = true);
                translate([-50 - (ROD_D / 2), 0, 0]) cube([100, 100, 100], center = true);
        }
    }
}

module fresnel_laser(outer = 13, h = 3, spacing = 0.2) {
    $fn = 120;
    count = ceil(outer / spacing);
    for(i = [0 : count]) {
        if (i % 2 != 0) {
            difference() {
                cylinder(r = outer - (spacing * i), h = h);
                cylinder(r = outer - (spacing * (i + 1)), h = h + 1);
            }
        }
    }
}

module fresnel_laser_outer (outer = 13, h = 3) {
    $fn = 120;
    cylinder(r = outer, h = h);
}