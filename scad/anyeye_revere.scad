
module motor_set_screw_120 () {
    cube([10.19, 2.95, 2.95], center = true);
    translate([(10.19 / 2) - (2.56 / 2), 0, 0]) cube([2.56, 5.8, 5.8], center = true);    
}

module motor_set_screw_120_alt () {
    $fn = 60;
    cylinder(r = 2.95 / 2, h = 10.19, center= true);
    translate([0, 0, (10.19 / 2) - (2.56 / 2)]) cylinder(r = 5.8 / 2, h = 2.56, center = true);
}

module hobbled_rod_120 (h = 10) {
            d = 4.00;
        diff = 3.33;
    difference () {
        
        cylinder(r = d/2, h = h, center = true, $fn = 60);
        translate([d/2 + ((d/2) - (d - diff)), 0, 0]) cube([d, d, h + 1], center = true);
    }
}

/**
 *	Notched
 **/
module motor_key_120 (half = false, DECOYS = false, sides = 1, ALT = false) {
    innerD = 7.85;
	outer_d = 27.5 + 2;
	notch_d = 10;
	height = 7 + 5 + 4;
	diff = 14 + 2.5 + 2;
    $fn = 60;
	difference () {
		union () {
			translate([0, 0, 12.1]) cylinder(r1 = 12 / 2, r2 = 12/2 + 4, h = 5, center = true);// padding against bearing
			translate([0, 0, diff + 1]) cylinder(r=outer_d/2, h= height -2, center= true, $fn=200); //large cylinder
			translate([0, 0, 6]) cylinder(r=innerD/2, h= 10, center= true);
            //key_end([0, 180, -20], [0, 0, -3.5], ALT = ALT); // longer for laser cut board
		}
        //1 notch
		translate([0, 0, diff]) {
			translate ([-outer_d/2 - 2.5, 0, 0]) cylinder(r=notch_d/2, h= height, center= true); //notch
		}
		translate([0, 0, diff]) {
			translate ([-outer_d/2  -.5, -3.5 , 0]) rotate([0, 0, 100]) cube([15, 5, height], center = true); // smooth notch
			translate ([-outer_d/2  -.5, 3.5, 0]) rotate([0, 0, -100]) cube([15, 5, height], center = true); // smooth notch
		}
        
        if (sides == 2) {
            //2 notch
            translate([0, 0, diff]) {
                translate ([outer_d/2 + 2.5, 0, 0]) cylinder(r=notch_d/2, h= height, center= true); //notch
            }
            translate([0, 0, diff]) {
                translate ([outer_d/2  +.5, -3.5, 0]) rotate([0, 0, -100]) cube([15, 5, height], center = true); // smooth notch
                translate ([outer_d/2  +.5, 3.5, 0]) rotate([0, 0, 100]) cube([15, 5, height], center = true); // smooth notch
            }
        }
        
		//slot for hobbled(?) end
        translate([0, 0, 17 + 2]) {
             translate([0, 0, 6.5]) hobbled_rod_120(12);
            translate([6.42 - .2, 0, 4.3 - 1]) rotate([0, 90, 0]) motor_set_screw_120_alt();
            translate([14, 0, 4.3 - 1]) rotate([0, 90, 0]) cylinder(r2 = 6 / 2, r1 = 5.8 / 2, h = 6, center = true); //extension
            
        }
		if (half) {
			translate([0 - 50 , 0, -50]) cube([100, 100, 200]);
		}
	}
}

module reference_projector_shaft () {
	INNER_DIAMETER = 4.08;
	OUTER_DIAMETER = 11.08;
	H = 7.37;
	WHEEL_DIAMETER = 54;
	WHEEL_H = 3;
	$fn = 120;
	translate([0, 0, -15 + H]) difference () {
		cylinder(r = OUTER_DIAMETER / 2, h = 30, center = true);
		cylinder(r = INNER_DIAMETER / 2, h = 30 + 1, center = true);
	}
	translate([0, 0, -1.5]) cylinder(r = WHEEL_DIAMETER / 2, h = WHEEL_H, center = true); 
	translate([0, 0, 6 + 1.5]) cube([60, 60, 3], center = true);
}

reference_projector_shaft();
translate([0, 0, 60]) motor_key_120();