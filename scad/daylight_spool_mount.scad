SQUARE_INNER = 7.8;
time = 0;

module reel_holder (top = true, base = true) {
	$fn = 60;
	difference(){
		translate([0, 0, -1.5]) cube([SQUARE_INNER, SQUARE_INNER, 21.5], center= true);
		for (i = [0:4]) {
			rotate([0, 0, (i * 90)]){
				translate([(SQUARE_INNER / 2) + .4, (SQUARE_INNER / 2) + .4, 18.5 / 2]) rotate([0, -15, 45]) cube([2.5, SQUARE_INNER, SQUARE_INNER], center = true);
			}
		}		
	}
	difference () {
		union() {
			translate([0, 0, (18.5 / 2) + (3.5 / 2)]) cylinder(r = SQUARE_INNER / 2, h = 3.5, center = true);
			translate([0, 0, (18.5 / 2) + (7.5 / 2)]) sphere(SQUARE_INNER / 2);
		}
		translate ([0, 0, (18.5 / 2) + 7.5]) cube([10, 10, 2], center = true);
	}
	if (base) {
	    difference () {
	        translate([0, 0, -(18.5/ 2) - (3 / 2) - 3]) cylinder(r = 16 /2, h = 3, center = true);
	        //translate([0, 0, -14.3]) cube([4, 4, 2], center = true); //notch
	        difference() {
	            translate([0, 0, -14.3]) cylinder(r = 8 / 2, h = 2, center = true);
	            translate([0, 6, -14.3]) cube([8, 8, 2], center = true);
	        }
	    }
	}
}

//rotate([0, 0, time]) reel_holder();