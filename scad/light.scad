include <./common.scad>;

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
    Z = 6;
    
    INNER_D = 1.9;

    FAN_W = 50;

    LENS_OFFSET = -5;

    if (DEBUG) {
        translate([0, LENS_OFFSET, 0]) rotate([90, 0, 0]) adafruit_pixie();
    }
    
    //pins for mounting pixie
    translate ([0, LENS_OFFSET + .5, 0]) rotate([90, 0, 0]) {
        translate([W/2, 0, 0]) cylinder(r = INNER_D / 2, h = Z + 1, center = true);
        translate([-W/2, 0, 0]) cylinder(r = INNER_D / 2, h = Z + 1, center = true);
        
        translate([W/2, 0, -(Z / 2)]) cylinder(r = 2, h = Z, center = true);
        translate([-W/2, 0, -(Z / 2)]) cylinder(r = 2, h = Z, center = true);
        
        translate([W/2, 0, -Z + (Z / 4)]) cylinder(r = 4, h = Z/2, center = true);
        translate([-W/2, 0, -Z + (Z / 4)]) cylinder(r = 4, h = Z/2, center = true);
        
        translate([W/2, 0, -1]) {
            difference () {
                cylinder(r = 4, h = Z, center = true);
                cylinder(r = 2.2, h = 10, center = true);
                translate([-5, 0, 0]) cube([10, 10, 10], center = true);
            }
        }
        translate([-W/2, 0, -1]) {
            difference () {
                cylinder(r = 4, h = Z, center = true);
                cylinder(r = 2.2, h = 10, center = true);
                translate([5, 0, 0]) cube([10, 10, 10], center = true);
            }
        }
    }
    
    //outer shell surrounding pixie
    translate ([0, -1 + LENS_OFFSET, -6]) {
        difference () {
            rounded_cube([W + 16, 19, W], d = 4, center = true);
            rounded_cube([(W + 16) - 4, 19 - 4, W + 1], d = 4, center = true);

            translate([0, -8, 8]) rotate([90, 0, 0]) cylinder(r = 10, h = 5, center = true);//circular void
            translate([0, -50, 0]) cube([100, 100, 100], center = true); //half
            
            //wires
            translate([0, 0, -5]) cube([10, 20, 5], center = true);
        }
    }
    
    //trapezoid connector to the fan
    /*translate ([0, -1, -46]) {
        difference () {
            hull () {
                translate([0, 0, 30]) 
                    translate([0, LENS_OFFSET, 0]) rounded_cube([W + 10, 15, 0.1], d = 4, center = true);
                    rounded_cube([FAN_W, FAN_W, 0.1], d = 4, center = true); 
            
            }
            hull () {
                translate([0, 0, 30]) 
                    translate([0, LENS_OFFSET, 0]) rounded_cube([W + 10 - 2, 15 - 2, 0.1], d = 4, center = true);
                    rounded_cube([FAN_W - 2, FAN_W - 2, 0.1], d = 4, center = true); 
            
            }
        }
    }

    //fan lid
    translate ([0, -1, -48.5]) {
        difference () {
            rounded_cube([FAN_W, FAN_W, 5], d = 4, center = true); 
            rounded_cube([FAN_W - 2, FAN_W - 2, 5 + 1], d = 4, center = true); 
        }
    }*/
}

module diffuser_mount (DEBUG = false) {

    translate ([-30, 0, 0]) {
        if (DEBUG){
            rotate([0, 90, 0]) diffuser();
        }
    }
}

module diffuser () {
    W = 20;
    THICKNESS = 4;
    cube([W, W, THICKNESS], center = true);
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