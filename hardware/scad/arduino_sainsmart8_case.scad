include <./box_laser.scad>;

module arduino () {
	X = 53.5;
    Y = 68.75;
    Z = 22.5;
    //cube([X, Y, Z], center = true);
    translate ([-27, -39, 0]) {
		 translate([  2.54, 15.24 , 0]) cylinder(r = 3.5 / 2, h = 100, center = true);
		 translate([  17.78, 66.04 , 0]) cylinder(r = 3.5 / 2, h = 100, center = true);
		 translate([  45.72, 66.04 ,0]) cylinder(r = 3.5 / 2, h = 100, center = true);
		 translate([  50.8, 13.97  ,0]) cylinder(r = 3.5 / 2, h = 100, center = true);

  	     //cylinder(r = 3.5 / 2, h = 100, center = true);
    }
}

difference () {
	$fn = 60;
	Box2D([150, 150, 46], center = true);
	translate([10, 43, 0]) {
		translate([0, 0, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([0, 121.5, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([52, 121.5, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([52, 0, 0]) cylinder(r = 3 / 2, h = 10, center = true);
	}
	
	translate([-65, 112, 0]) {
		translate([0, 0, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([0, 52, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([62, 52, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([62, 0, 0]) cylinder(r = 3 / 2, h = 10, center = true);
	}
	translate([-40, 64, 0]) arduino();
	translate([-50, 46 / 2 - 9 ,0]) cube([18, 13, 20], center = true);
	translate([-20, 46 / 2 - 9 ,0]) cylinder(r = 10 / 2, h= 30, center = true);
}

