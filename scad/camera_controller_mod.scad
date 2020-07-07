PART = "";

MOUNT_DIST = 28 - .5;
MOUNT_ANGLE = 125;
MOUNT_W = 12;
MOUNT_H = 8;
MOUNT_D = 12;

mm_x = [61.5, 21.5, 6, 45.5, 18, 39];
mm_y = [-18, 21, -27.5, -27.5, 7, 39];
mm_r = [110, -15, 0, 0, 0, -70];
mm_l = [13, 9, 0, 0, 0, 8];

xArray = [-3, 57,  55,  -26]; //NO MIDDLE PIN
yArray = [38, 31, -56,  -33]; //NO MIDDLE PIN

outerD = 9;
innerD = 4.5;
height = 17;

panel_2_x = 110;
panel_2_y = 110;

one_to_one_x = 54.5;
one_to_one_y = 12;

bolt_inner = 2.55;

screw_distance = 31;

module rounded_cube (cube_arr = [1, 1, 1], d = 0, center = false) {
	off_x = 0;
	off_y = 0;
	r = d/2;
	union () {
		cube([cube_arr[0] - d, cube_arr[1], cube_arr[2]], center = center);
		cube([cube_arr[0], cube_arr[1] - d, cube_arr[2]], center = center);
		translate ([1 * (cube_arr[0] / 2) - r , 1 * (cube_arr[1] / 2)- r, 0]) cylinder(r = r, h = cube_arr[2], center = center);
		translate ([-1 * (cube_arr[0] / 2) + r, -1 * (cube_arr[1] / 2) + r, 0]) cylinder(r = r, h = cube_arr[2], center = center);
		translate ([1 * (cube_arr[0] / 2) - r, -1 * (cube_arr[1] / 2) + r, 0]) cylinder(r = r, h = cube_arr[2], center = center);
		translate ([-1 * (cube_arr[0] / 2) + r, 1 * (cube_arr[1] / 2)- r, 0]) cylinder(r = r, h = cube_arr[2], center = center);
	}
}

module geared_motor_mount_120 (DECOYS = false) {
    $fn = 160;
	base_d = 35;
	base_inner = 25.2;
	base_thickness = 3;
	hole_d = 7;
	screw_d = 3.2;
    bolt_end = 5.4;
	height = 6;
    screw_distance = 17;
    offset_h = 14;
    
	difference () {
		difference () {
			translate([0, 0, 2.5]) cylinder(r=base_d/2, h=height + 5, center = true); //outer cylinder
            translate([0, 0, base_thickness + 1.5]) cylinder(r=base_inner/2, h=height + 5, center = true); //inner cylinder
		}
		cylinder(r=hole_d/2, h=29, center = true); //center hole
		//screw holes
        translate([0, 0, 0]) {
            translate([0, screw_distance/2, 0]) cylinder(r=screw_d/2, h=29, center = true);
            translate([0, -screw_distance/2, 0]) cylinder(r=screw_d/2, h=29, center = true);
            
            //bolt ends
            translate([0, screw_distance/2, -3]) cylinder(r=bolt_end/2, h=2, center = true);
            translate([0, -screw_distance/2, -3]) cylinder(r=bolt_end/2, h=2, center = true);
        }
        
    }
    
    //mounting arms
    difference ()  {
        union () {
            translate([0, 16, 1]) cube([MOUNT_W, 35 - 12, MOUNT_H], center = true);
            translate([0, 16 + 11.5, 1]) cylinder(r = MOUNT_W / 2, h =  MOUNT_H, center = true);
        }
        translate([0, MOUNT_DIST, 0]) cylinder(r = 4.5 / 2, h = MOUNT_H * 2, center = true);
        cylinder(r=(base_inner + 1) /2, h = 30, center = true);
        translate([0, 16 + 11.5, 7]) cylinder(r = MOUNT_W / 2, h =  MOUNT_H, center = true);
    }
    translate([0, MOUNT_DIST, -(offset_h / 2) - 1]) difference () {
        cylinder(r = MOUNT_D / 2, h = offset_h, center = true);
        cylinder(r = 4.5 / 2, h = offset_h + 1, center = true);
    }
    //mount2
    rotate([0, 0, MOUNT_ANGLE]) {
        difference () {
            union () {
                translate([0, 16, 1]) cube([MOUNT_W, 35 - 12, MOUNT_H], center = true);
                translate([0, 16 + 11.5, 1]) cylinder(r = MOUNT_W / 2, h =  MOUNT_H, center = true);
            }
            translate([0, MOUNT_DIST, 0]) cylinder(r = 4.5 / 2, h = MOUNT_H * 2, center = true);
            cylinder(r=(base_inner + 1) /2, h=30, center = true);
            translate([0, 16 + 11.5, 7]) cylinder(r = MOUNT_W / 2, h =  MOUNT_H, center = true);
        }
        translate([0, MOUNT_DIST, -(offset_h / 2) - 1]) difference () {
            cylinder(r = MOUNT_D / 2, h = offset_h, center = true);
            cylinder(r = 4.5 / 2, h = offset_h + 1, center = true);
        }
    }
        //mount3
    rotate([0, 0, 360 - MOUNT_ANGLE]) {
        difference () {
            union () {
                translate([0, 16 - 8, 1]) cube([MOUNT_W, 21, MOUNT_H], center = true);
                translate([0, 16 - 9 + 11.5, 1]) cylinder(r = MOUNT_W / 2, h =  MOUNT_H, center = true);
            }
            cylinder(r=(base_inner + 1) /2, h=30, center = true);
        }
        difference () {
            translate([0, MOUNT_DIST - 9, -(offset_h / 2) - 1]) {
                cylinder(r = MOUNT_D / 2, h = offset_h, center = true);
            }
            translate([0, 0, -(offset_h / 2) - 1]) cylinder(r=base_d/2, h=offset_h + 1, center = true);
        }
    }
}

module l289N_mount () {
    $fn = 60;
	DISTANCE = 36.5;
	H = 4;
    THICKNESS = 3;
	module stand () {
		difference () {
			cylinder(r1 = 4, r2 = 3, h = H, center = true);
		}
	}
	translate([0, 0, 0]) stand();
	translate([DISTANCE, 0, 0]) stand();
	translate([DISTANCE, DISTANCE, 0]) stand();
	translate([0, DISTANCE, 0]) stand();
    difference () {
        translate([DISTANCE/2, DISTANCE/2, -3]) rounded_cube([DISTANCE + 8, DISTANCE + 8, THICKNESS], 8, center = true); //base
        translate([DISTANCE/2, DISTANCE/2, -3]) rounded_cube([DISTANCE - 5, DISTANCE - 5, THICKNESS + 1], 10, center = true); //base
     }
        translate([0, 0, 2]) cylinder(r = 1.2, h = H, center = true);
        translate([DISTANCE, 0, 2]) cylinder(r = 1.2, h = H, center = true);
        translate([DISTANCE, DISTANCE, 2]) cylinder(r = 1.2, h = H, center = true);
        translate([0, DISTANCE, 2]) cylinder(r = 1.2, h = H, center = true);
    
}



module key_adapter () {
    $fn = 60;
    ID = 3.8;
    D = 4.4;
    H = 10;
    PEG = 7.5;
    difference () {
        union () {
            cylinder(r = D / 2, h = H, center = true);
            translate([0, 3, (H / 2) - .5]) cube([D + 1, 16, 1], center = true);
            translate([0, PEG, (H / 2) - 2]) cylinder(r = 3 / 2, h = 4, center = true);
        }
        translate([0, 0, 2]) difference () {
            cylinder(r = ID / 2, h = H, center = true);
            translate([ID / 2 + 1.5, 0, 0]) cube([ID, ID, H], center = true);
        }
    }
}

module key () {
    tighten = 0.25;
	difference () {
		cylinder(r = 6.7 / 2, h = 5, center = true);
		cylinder(r = (4.76 -+ tighten) / 2, h = 5, center = true);
	}
	translate ([0, 0, -7.5]) {
		cylinder(r = 6.7 / 2, h = 10, center = true);
	}
}
module keyHole () {
	translate ([0, 0, 1.75]) {
		cube([10, 2, 3.5], center = true);
	}
}
module key_end (rotArr = [0, 0, 0], transArr = [0, 0, 0], ALT = false) {
	translate(transArr) {
		rotate (rotArr) {
			difference () {
				key();
				keyHole();
                if (ALT) {
                    translate([-2.5, 0, 1.75]) cube([5, 3, 3.5], center= true);
                }
			}
		}
	}
}

module hobbled_rod_120 (h = 10) {
    d = 4.25;
    diff = 3.53;
    difference () {
        
        cylinder(r = d/2, h = h, center = true, $fn = 60);
        translate([d/2 + ((d/2) - (d - diff)), 0, 0]) cube([d, d, h + 1], center = true);
    }
}

module motor_key_120 (half = false, DECOYS = false, sides = 1, ALT = false) {
    innerD = 7.85;
	outer_d = 25;//27.5 + 2;
	notch_d = 10;
	height = 9;
	diff = 14 + 2.5 + 2;
    $fn = 60;
	difference () {
		union () {
			translate([one_to_one_x, one_to_one_y, 14.5]) cylinder(r1 = 14 / 2, r2 = 14/2 + 4, h = 5, center = true);// padding against bearing
			translate([one_to_one_x, one_to_one_y, diff - 2]) cylinder(r=outer_d/2, h= height -2, center= true, $fn=200); //large cylinder
			translate([one_to_one_x, one_to_one_y, 6 - 2]) cylinder(r=innerD/2, h= 14, center= true);
            translate([one_to_one_x, one_to_one_y, 8 ]) cylinder(r=9/2, h= 10, center= true);
            key_end([0, 180, -35], [one_to_one_x, one_to_one_y, -3.5 - 3], ALT = ALT); // longer for laser cut board
		}
        //1 notch
		translate([one_to_one_x, one_to_one_y, diff]) {
			translate ([-outer_d/2 - 3.5, 0, 0]) cylinder(r=notch_d/2, h= height + 4, center= true); //notch
		}
        
		//slot for hobbled(?) end
        translate([one_to_one_x, one_to_one_y, 17 + 0]) {
            translate([0, 0, 2.5]) hobbled_rod_120(12);
            //translate([6.42 - .2, 0, 4.3 - 5.5]) rotate([0, 90, 0]) motor_set_screw_120_alt();
            //translate([14, 0, 4.3 - 5.5]) rotate([0, 90, 0]) cylinder(r2 = 6 / 2, r1 = 5.8 / 2, h = 6, center = true); //extension
        
        }
	}
}

module motor_set_screw_120 () {
    cube([10.19, 2.95, 2.95], center = true);
    translate([(10.19 / 2) - (2.56 / 2), 0, 0]) cube([2.56, 5.8, 5.8], center = true);    
}

module motor_set_screw_120_alt () {
    $fn = 60;
    cylinder(r = 2.95 / 2, h = 10.19, center= true);
    translate([0, 0, (10.19 / 2) - (2.56 / 2)]) cylinder(r = 5.8 / 2, h = 2.56, center = true);
}

module sizing() {
 $fn = 60;
    
 cylinder(r = 8.9 / 2, h = 8, center = true); 
  //mount1
  translate([0, 16, 2.5]) cube([8.9, 32, 3], center = true);
  translate([0, MOUNT_DIST, 0]) cylinder(r = 3.2 / 2, h = 8, center = true);
   //mount2
  rotate([0, 0, MOUNT_ANGLE]) {
    translate([0, 16, 2.5]) cube([8.9, 32, 3], center = true);
    translate([0, MOUNT_DIST, 0]) cylinder(r = 3.2 / 2, h = 8, center = true);
  }
 }
 
module nano_mount () {
   X = 17.6;
   Y = 43.3;
   Z = 5;
   difference () {
       cube([X + 6, Y + 6, Z + 3], center = true);
       //center void
       cube([X, Y, Z + 4], center = true);
       //usb
       translate([0, (Y / 2) + 1.5, Z / 2]) {
           cube([7.5, 4, 3], center = true);
       }
   }
   
   translate([(X / 2) - 1, (Y / 2) - 1, -1.5]) cube([3, 3, Z], center = true);
   translate([-(X / 2) + 1, (Y / 2) - 1, -1.5]) cube([3, 3, Z], center = true);
   translate([(X / 2) - 1, -(Y / 2) + 1, -1.5]) cube([3, 3, Z], center = true);
   translate([-(X / 2) + 1, -(Y / 2) + 1, -1.5]) cube([3, 3, Z], center = true);
}

if (PART == "") {
    nano_mount();
}
 
//sizing();
//l289N_mount();
 
//translate([-one_to_one_x, -one_to_one_y, -27]) //motor_key_120();
//geared_motor_mount_120();

difference () {
    //motor_key_120();
    //geared_motor_mount_120();
    //translate([30, 0, 0]) cube([50, 50, 50], center = true);
}
//translate([0, 26, -7]) cube([10, 10, 12], center = true);
//key_adapter();