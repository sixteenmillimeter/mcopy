include <./common.scad>;
include <./knurledFinishLib_v2.scad>
include <./arduino.scad>


DISTANCE_TO_BELT_START = 25;
FAN_SIDE_Z = 45;
FAN_MOUNT_D = (102 / 2) + 50;

MOTOR_120_D = 25.2;

module motor_edge_mount () {
    $fn = 200;
    
	OUTER_D = 46;
	OUTER_DIVOT = .5;
    OUTER_DIVOT_W = 3;
	OUTER_W = 7;
    
    difference () {
        cylinder(r = OUTER_D / 2, h = OUTER_W, center = true);
        
        //DIVOT
        difference () {
            cylinder(r = OUTER_D / 2 + OUTER_DIVOT, h = OUTER_DIVOT_W, center = true);
            cylinder(r = OUTER_D / 2 - OUTER_DIVOT, h = OUTER_W, center = true);
        }
        
        //BEARING
        bearing(0, 0, 0, hole = false);
    }
}


/*module motor_set_screw_120 () {
    cube([10.19, 2.95, 2.95], center = true);
    translate([(10.19 / 2) - (2.56 / 2), 0, 0]) cube([2.56, 5.8, 5.8], center = true);    
}*/

module motor_set_screw_120 () {
    $fn = 60;
    cylinder(r = 2.95 / 2, h = 10.19, center= true);
    translate([0, 0, (10.19 / 2) - (2.56 / 2)]) cylinder(r = 5.8 / 2, h = 2.56, center = true);
    //translate([(10.19 / 2) - (2.56 / 2), 0, 0]) cube([2.56, 5.8, 5.8], center = true);    
}

module motor_120 () {
    D = MOTOR_120_D;
    Z = 53.5;
    screw_d = 3.2; 
    screw_distance = 17;
    hole_d = 7;
    hole_h = 2.5;
    rod_len = 10;
    
    cylinder(r = D/2, h = Z, center = true);
    translate([0, 0, Z/2 + (hole_h / 2) + (rod_len / 2)]) hobbled_rod_120( h = rod_len);
    translate([0, 0, Z/2 + (hole_h / 2) ]) cylinder(r = hole_d / 2, h  = 2.5, center = true);
}

module hobbled_rod_120 (h = 10) {
    d = 4.00;
    diff = 3.33;
    difference () {
        cylinder(r = d/2, h = h, center = true, $fn = 60);
        translate([d/2 + ((d/2) - (d - diff)), 0, 0]) cube([d, d, h + 1], center = true);
    }
}

module bearing (x, y, z, width= 8, hole = true) {
    $fn = 160;
	innerD = 8.1;
	outerD = 22.05;
	fuzz = 0.1;
	translate ([x, y, z]) {
		difference () {
			cylinder(r = outerD / 2 + fuzz, h = width, center = true);
			if (hole) {
				cylinder(r = innerD / 2 - fuzz, h = width, center = true);
			}
		}
	}
}

module ridged_cylinder (r = 1, h = 1, center = true, ridges, ridge_w, ridge_h) {
    //$fn = 200;
    difference () {
        cylinder(r = r, h = h, center = center);
        for (i = [0: ridges]) {
            rotate([0, 0, (360 / ridges) * i]) translate([0, r  - (ridge_h / 2), 0]) cube([ridge_w, ridge_h, h], center = true);
        }
    }
}

module belt_driver () {
    $fn = 160;
    
    BIG_D = 18.5;
    SMALL_D = 13;
    LEN = 27;
    SMALL_LEN = 9;
    BIG_LEN = 15;
    
    cylinder(r = SMALL_D / 2, h = LEN, center = true);
    translate([0, 0, (LEN / 2) - (BIG_LEN / 2)]) {
        //cylinder(r = BIG_D / 2, h = BIG_LEN, center = true);
        //ridged_cylinder(r = BIG_D / 2, h = BIG_LEN, center = true, ridges = 40, ridge_w = .2, ridge_h = .2);
        translate([0, 0, -7.5]) knurled_cyl(BIG_LEN, BIG_D, 1, 1.5, .5, 0, 0);
    }
    translate([0, 0, -3]) {
        cylinder(r1 = SMALL_D / 2, r2 = BIG_D / 2, h = LEN - BIG_LEN - SMALL_LEN, center =  true);
    }
}

module motor_mount (){
    $fn = 200;
    
    DISTANCE = 102;
    INNER_D = MOTOR_120_D;
    SEAT_D = INNER_D + 6;
    SEAT_LEN = 20;
    
    translate([DISTANCE / 2, 0, 0]) rotate([0, 90, 0]) {
        motor_edge_mount();
        difference () {
            translate([0, 0, -4.5]) cylinder(r = 46/2, h = 2, center = true);
            translate([0, 0, -4.5]) cylinder(r = 8, h = 4, center = true);
        }
    }
    translate([-DISTANCE / 2, 0, 0]) rotate([0, 90, 0]) {
        //motor_edge_mount();
    }
    
    rotate([0, 90, 0]) {
        difference() {
            cylinder(r = 46 / 2, h = DISTANCE - 6, center = true);
            cylinder(r = INNER_D / 2, h = DISTANCE, center = true);
            translate([0, 0, 23]) motor_seat_120();
            
            translate([-100 + 6, 0, 0]) cube([200, 200, 200], center = true); //TOP
            translate([0, 0, -100 + 13]) cube([200, 200, 200], center = true); //HALF
        }
    }
   // rotate([0, 90, 0]) translate([0, 0, 23]) motor_seat_120(0);
    //rotate([0, 90, 0]) translate([0, 0, 4]) motor_120();
}

module motor_seat_120 (FUZZ = 0.1) {
    $fn = 200;
    
    INNER_D = MOTOR_120_D;
    OUTER_D = MOTOR_120_D + 6 + FUZZ;
    SEAT_LEN = 20;
    FIN_LEN = (46 - MOTOR_120_D) / 2 + .5;
    screw_d = 3.2; 
    screw_distance = 17;
    hole_d = 7;
    hole_h = 2.5;
    bolt_end = 5.4;
    
    difference () {
        cylinder(r = OUTER_D / 2, h = SEAT_LEN, center = true);
        translate([0, 0, -2.5]) cylinder(r = INNER_D / 2, h = SEAT_LEN, center = true);
        translate([-100 - 6, 0, 0]) cube([200, 200, 200], center = true);
        cylinder(r = hole_d / 2, h = SEAT_LEN * 2, center = true);
        translate([0, 0, 0]) {
            translate([0, screw_distance/2, 0]) cylinder(r=screw_d/2, h=SEAT_LEN * 2, center = true);
            translate([0, -screw_distance/2, 0]) cylinder(r=screw_d/2, h=SEAT_LEN * 2, center = true);
            
            //bolt ends
            translate([0, screw_distance/2, SEAT_LEN / 2]) cylinder(r=bolt_end/2, h=2, center = true);
            translate([0, -screw_distance/2, SEAT_LEN / 2]) cylinder(r=bolt_end/2, h=2, center = true);
        }
    }
    
    if (FUZZ != 0) {
        translate([19, 0, 5]) rotate([90, 90, 0]) M5_bolt(25);
        translate([19, 0, -5]) rotate([90, 90, 0]) M5_bolt(25);
    }
    difference () {
        translate([(INNER_D / 2) + (FIN_LEN / 2), 0, 0]) cube([FIN_LEN, 2 + FUZZ, SEAT_LEN], center= true);
        if (FUZZ == 0) {
            translate([19, 0, 5]) rotate([90, 90, 0]) M5_bolt();
            translate([19, 0, -5]) rotate([90, 90, 0]) M5_bolt();
        }
    }
}

module M5_bolt ( extra = 0) {
    LEN = 25;
    D = 4.91;
    cylinder(r = D/2, h = LEN + extra, center = true);
}

module rod () {
    $fn = 160;
    
    WIDTH = 67;
    BEARING_D = 8.05;
    SMALL_D = 13;
    SMALL_WIDTH = 38.5;
    FUZZ = 0.1;
    HOBBLED_LEN = 10;
    
    translate([0, 0, -6]) {
        difference () {
            cylinder(r = BEARING_D / 2 - FUZZ, h = WIDTH, center = true); //bearing passthrough
            translate([0, 0, -(WIDTH / 2) + (HOBBLED_LEN / 2) - .01]) hobbled_rod_120(h = HOBBLED_LEN);
            translate([0, 0, -(WIDTH / 2) + (HOBBLED_LEN / 2)]) rotate([0, 90, 0]) translate([0, 0, 6.425]) motor_set_screw_120();
        }
    }
    translate([0, 0, 0]) cylinder(r = SMALL_D / 2, h = SMALL_WIDTH, center = true); //full thickness rod
    translate([0, 0, -2]) belt_driver();
}

module rod_end () {
    $fn = 160;
    
    OUTER_D = 23;
    BEARING_D = 8.05 - 0.1;
    H = 8;
    
    difference () {
        cylinder(r = OUTER_D /2, h = H, center = true);
        cylinder(r = BEARING_D/2, h = H + 1, center = true);
        translate([6.425, 0, 0]) rotate([0, 90, 0]) motor_set_screw_120();
    }
}

module fan_mount_replacement () {
    $fn = 100;
    
    BOLT_D = 4;
    BOLT_TOP = 14;
    BOLT_TOP_Z = 3;
    X = 74;
    Y = 87;
    Z = 8;
    
    WIDTH = 19;
    
    BOLT_SPACE_X = 63;
    BOLT_SPACE_Y = 76;
    
    BOLT_TOP_POS = (Z / 2) - (BOLT_TOP_Z / 2) + 0.01;
    
    difference () {
        rounded_cube([X, Y, Z], 8,  center = true); //main plate
        rounded_cube([X - (WIDTH * 2), Y - (WIDTH * 2), Z  + 1], 6,  center = true); //inner void
        //bolt holes
        translate([BOLT_SPACE_X / 2, BOLT_SPACE_Y / 2, 0]) cylinder(r = BOLT_D / 2, h = Z + 1, center = true);
        translate([-BOLT_SPACE_X / 2, BOLT_SPACE_Y / 2, 0]) cylinder(r = BOLT_D / 2, h = Z + 1, center = true);
        translate([-BOLT_SPACE_X / 2, -BOLT_SPACE_Y / 2, 0]) cylinder(r = BOLT_D / 2, h = Z + 1, center = true);
        translate([BOLT_SPACE_X / 2, -BOLT_SPACE_Y / 2, 0]) cylinder(r = BOLT_D / 2, h = Z + 1, center = true);
        
        //BOLT TOP
        translate([BOLT_SPACE_X / 2, BOLT_SPACE_Y / 2, BOLT_TOP_POS]) cylinder(r = BOLT_TOP / 2, h = BOLT_TOP_Z, center = true);
        translate([-BOLT_SPACE_X / 2, BOLT_SPACE_Y / 2, BOLT_TOP_POS]) cylinder(r = BOLT_TOP / 2, h = BOLT_TOP_Z, center = true);
        translate([-BOLT_SPACE_X / 2, -BOLT_SPACE_Y / 2, BOLT_TOP_POS]) cylinder(r = BOLT_TOP / 2, h = BOLT_TOP_Z, center = true);
        translate([BOLT_SPACE_X / 2, -BOLT_SPACE_Y / 2, BOLT_TOP_POS]) cylinder(r = BOLT_TOP / 2, h = BOLT_TOP_Z, center = true);
    }  
}

module fan_bearing_mount () {
    $fn = 160;
    OUTER_D = 45;
    OUTER_W = 12;
    difference () {
        union() {
            cylinder(r = OUTER_D / 2, h = OUTER_W, center = true); //cylindrical base
            translate([FAN_SIDE_Z / 2, 0, 0]) cube([FAN_SIDE_Z, OUTER_D, OUTER_W], center = true); //straight base
        }
        bearing(0, 0, -2.01, hole = false);
        cylinder(r = 8, h= 20, center = true);
    } 
}

module fan_mount() {
    translate ([0, 0, 4]) rotate([0, 0, 90]) fan_mount_replacement();
    translate ([-19, 0, FAN_SIDE_Z]) rotate([0, 90, 0]) fan_bearing_mount();
}

module partition () {
    $fn = 60;
    W = 4.3;
    difference () {
        cube([100, W, 100], center = true);
        
        translate([0, 0, -20]) cube([25, W + 1, 32], center = true);
        translate([-22, 0, -38.5]) cube([57, W + 1, 6], center = true);
        translate([-25, 0, -1]) cube([25, W + 1, 43 + 32 + 6], center = true);
        translate([-50, 0, -1]) cube([25, W + 1, 43 + 32 + 6 + 35], center = true);
        
        translate([-3 , 0, 6])rotate([90, 0, 0]) cylinder(r = 12.6 / 2, h = W + 1, center = true);
        
        translate([-32 , 0, 43])rotate([90, 0, 0]) cylinder(r = 1.5, h = W + 1, center = true);
        translate([-32 + 16 , 0, 43])rotate([90, 0, 0]) cylinder(r = 1.5, h = W + 1, center = true);
    }
}

module wheel () {
    $fn = 120;
    BIG_D = 44.25;
    SMALL_D = 41.11;
    LEN = 20;
    cylinder(r = BIG_D/2, h = 8, center = true);
    translate([0, 0, 8 - 2]) cylinder(r2 = SMALL_D/2, r1 = BIG_D/2, h = 4, center = true);
    translate([0, 0, 8 + 2 + 2]) cylinder(r = SMALL_D/2, h = 8, center = true);
}

module l289N_mount () {
    $fn = 60;
	DISTANCE = 36.5;
	H = 4;
    THICKNESS = 3;
	module stand () {
		cylinder(r1 = 4, r2 = 3, h = H, center = true);
		translate([0, 0, 1.5]) cylinder(r = 1, h = H + 3, center = true);
	}
	translate([0, 0, 0]) stand();
	translate([DISTANCE, 0, 0]) stand();
	translate([DISTANCE, DISTANCE, 0]) stand();
	translate([0, DISTANCE, 0]) stand();
    difference () {
        translate([DISTANCE/2, DISTANCE/2, -3]) rounded_cube([DISTANCE + 8, DISTANCE + 8, THICKNESS], 8, center = true); //base
        translate([DISTANCE/2, DISTANCE/2, -3]) rounded_cube([DISTANCE - 5, DISTANCE - 5, THICKNESS], 10, center = true); //base
    }
    
    translate([20, 25, -3]) base_mount_1();
}

module endstop () {
    $fn = 20;
    cube([33, 10, 1.5], center = true);
    translate([-4, 0, (3 / 2) + (1.5 / 2)]) rounded_cube([24, 6, 3], d = 2,center = true);
    translate([-4 + 4, 0, (8 / 2) + 3 + (1.5 / 2)]) cube([4.25, 6, 8], center = true);
    translate([-4 - 4, 0, (8 / 2) + 3 + (1.5 / 2)]) cube([4.25, 6, 8], center = true);
    translate([13.75, 0, -5.5]) cube([5.5, 10, 9.5], center = true);
}

module endstop_mount () {
    STEM_W = 14;
    difference () {
        cube([20, 12, 15], center = true); //base
        translate([0, 0, -4]) cube([21, 4.4, 15], center = true);
        rotate([90, 90, 0]) translate([2, 0, -4]) cylinder(r = 1, h = 5, center = true, $fn = 20);
    }
    
    rotate([55, 0, 0]) translate([0, 0, 21.5]) {
        difference () {
            translate([3, 0, 0]) cube([STEM_W, 6, 38], center = true);
            translate([3, 1, -21]) rotate([-60, 0, 0]) cube([STEM_W + 1, 6, 6], center = true);
        }
        difference () {
            translate([-10, 0, 12]) cube([30, 6, 14], center = true);
            translate([-19, 0, 12]) cube([5.5 + .1, 10 + .1 , 9.5 + .1], center = true);
        }
    }
}

module microswitch (position = [0, 0, 0], rotation = [0, 0, 0]) {
	translate(position) {
		rotate(rotation) {
			cube([16, 28, 10.5], center = true);
			translate([10, 8, 0]) rotate([0, 0, -7]) cube([1, 28, 4], center = true); //arm
			translate([8 + 7, 14 + 8, 0]) cylinder(r = 2.5, h = 4, center = true); //wheel
			translate([0, -19, 0]) cube([7, 11, 10.5], center = true);
		}
	}
}

module microswitch_mount () {
    translate ([4.5, 0, 0]) {
        difference () {
            cube([24, 12, 15], center = true); //base
            translate([0, 0, -4]) cube([25, 4.4, 15], center = true);
            rotate([90, 90, 0]) translate([2, 0, -4]) cylinder(r = 1.5, h = 5, center = true, $fn = 20);
        }
    }
    rotate ([35, 0, 0]) {
            translate([0, -9, 15]) {
                difference () {
                    translate([-1, 0, 0]) cube([13, 20, 20], center = true);
                    translate([-1, -8, -13]) rotate([-35, 0, 0]) cube([13, 20, 20], center = true); 
                    translate([-1, 8, 21]) rotate([-35, 0, 0]) cube([13, 20, 20], center = true);
                    translate([-1, 0, 15.5]) rotate([90, 0, 90]) microswitch();
                }
                
            }
    }
}

module microswitch_bump () {
    $fn = 240;
    BIG_D = 44.25;
    W = 7;
    difference () {
        scale([.8, 1.2, 1]) cylinder(r = BIG_D / 2, h = W, center = true);
        cylinder(r = BIG_D / 2, h = W + 1, center = true);
        translate([0, 25, 0]) cube([50, 50, 50], center = true);   
    }
    difference () {
        cylinder(r = (BIG_D / 2) + 1, h = W, center = true);
        cylinder(r = BIG_D / 2, h = W + 1, center = true); 
    } 
}

//To attach electronics to projector base 
//L298N
module base_mount_1 () {
    $fn = 120;
    BOLT_W = 63.5;
    BOLT_D = 5;
    difference () {
        rounded_cube([79, 15, 3], d = 4, center = true);
        translate([BOLT_W / 2, 0, 0]) cylinder(r = BOLT_D/2, h = 4, center = true);
        translate([-BOLT_W / 2, 0, 0]) cylinder(r = BOLT_D/2, h = 4, center = true);
    }
}

//arduino
module base_mount_2 () {
    $fn = 120;
    BOLT_W = 75;
    BOLT_D = 4;
    difference () {
        rounded_cube([85, 12, 3], d = 4, center = true);
        translate([BOLT_W / 2, 0, 0]) cylinder(r = BOLT_D/2, h = 4, center = true);
        translate([-BOLT_W / 2, 0, 0]) cylinder(r = BOLT_D/2, h = 4, center = true);
    }
}

//using uno and duemilanov
module arduino_mount () {
    $fn = 120;
    
    translate([25, 10, 0]) base_mount_2();
    translate([25, 10 + 32, 0]) {
        difference () {
            base_mount_2();
            translate([10, 0, 0]) cube([65, 12, 3], center = true);
        }
    }
    standoffs(UNO);
    translate ([27, 40, 0]) {
        difference () {
            rounded_cube([57, 60, 3], d = 4, center = true);
            rounded_cube([42, 44, 4], d = 4, center = true);
        }
    }
}

//To hold up a lever which allows motor to control all aspects of the
//geared aparatus - Unique to the B&H projector used in project
module b_and_h_singleton () {
    x = 9;
    y = 7.5;
    cube([x, y, 10], center = true);
    translate([ 0, 0, -5.5]) cube([x + 2, y + 2, 1], center = true);
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
                translate([0, 0, 0]) cylinder(r = 11, h = 7, center = true);
                translate([-6, 0, 0]) cube([12, 22, 7], center = true);
                translate([-11.5, 0, -3]) cube([4, 22, 13], center = true);
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

module bolex_stand () {
    //rough measurements
    //BOLEX, bottom to mid frame 114
    //165 from table to center projector frame
    ADJ = 6; // adjustment
    H = 51 + ADJ; //165 - 114;
    QR_H = H - 22 - (ADJ / 2);
    difference () {
        translate([0, -3.5, QR_H]) cube([70, 88, H], center = true);
        difference () {
            translate(plate_center) cube([50, 90, 11], center = true);
            sides_flat();
            sides_angled();
        }
        //translate([0, 0, 40]) cube([35, 150, 30], center = true);
    }
}

PART="rod";

if (PART == "rod") {
    rod();
}
