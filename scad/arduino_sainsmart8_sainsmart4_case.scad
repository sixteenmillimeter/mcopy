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

projection () difference () {
	$fn = 60;
	Box2D([150, 150, 46], center = true);
	
	//sainsmart 8
	translate([10, 43, 0]) {
		translate([0, 0, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([0, 121.5, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([52, 121.5, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([52, 0, 0]) cylinder(r = 3 / 2, h = 10, center = true);
	}
	//sainsmart 4
	translate([-65, 112, 0]) {
		translate([0, 0, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([0, 52, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([62, 52, 0]) cylinder(r = 3 / 2, h = 10, center = true);
		translate([62, 0, 0]) cylinder(r = 3 / 2, h = 10, center = true);
	}
	//arduino
	translate([-40, 64, 0]) arduino();
	translate([-50, 46 / 2 - 9, 0]) cube([18, 18, 20], center = true);
	translate([-19, 46 / 2 - 9 - 3 ,0]) cylinder(r = 10 / 2, h= 30, center = true);
	translate([-19, 46 / 2 - 9 - 3 + 5 ,0]) cube([10, 10, 30], center = true);
	
	//wires
	
	translate([120, 46 / 2 - 12, 0]) cylinder(r = 5 / 2, h= 30, center = true);
	translate([120, 46 / 2 - 12 + 7, 0]) cube([5, 14, 30], center = true);
	
	translate([150, 46 / 2 - 12, 0]) cylinder(r = 5 / 2, h= 30, center = true);
	translate([150, 46 / 2 - 12 + 7, 0]) cube([5, 14, 30], center = true);
	
	translate([180, 46 / 2 - 12, 0]) cylinder(r = 5 / 2, h= 30, center = true);
	translate([180, 46 / 2 - 12 + 7, 0]) cube([5, 14, 30], center = true);
	
	//wires
	
	translate([120 + 150, 46 / 2 - 12, 0]) cylinder(r = 5 / 2, h= 30, center = true);
	translate([120 + 150, 46 / 2 - 12 + 7, 0]) cube([5, 14, 30], center = true);
	
	translate([150 + 150, 46 / 2 - 12, 0]) cylinder(r = 5 / 2, h= 30, center = true);
	translate([150 + 150, 46 / 2 - 12 + 7, 0]) cube([5, 14, 30], center = true);
	
	translate([180 + 150, 46 / 2 - 12, 0]) cylinder(r = 5 / 2, h= 30, center = true);
	translate([180 + 150, 46 / 2 - 12 + 7, 0]) cube([5, 14, 30], center = true);
}
