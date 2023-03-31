//Title: Canon EF Mount Body Cap
//Modified By: Robert Macgregor
//Date: March 29, 2014
//Original Author: Alex English - ProtoParadigm
//Original Date: 8-8-2011
//License: GPL2


//$fs = .1;
$fn = 50;
module EFmount() {
	//$fa = 1;
	union() {
		translate([0,0,-1])
		cylinder(h = 5.8, r = 66.5/2);  //outer grip
		translate([0, 0, 6])
			cylinder(h = 5, r = 50.5/2);
		translate([0, 0, 4])
			cylinder(h = 3, r = 54/2);   //lip
		//translate([0, 0, 12.5])       //inner mounting hole
			//cylinder(h = 3.2, r1 = 39.7/2, r2 = 39.5/2);
		translate([0, 0, 7])
			threads();
		rotate([0, 0, -33])
			translate([-67/2, 0, 1.9])
				cube(size=[1, 2, 5.8], center = true); //alignment mark
		
	}
}

module threads() {
	difference() {
		cylinder(h = 4, r = 53.2/2);  //thread outer
		cylinder(h = 4, r = 50.4/2);  //thread cylinder
		cylinder(h = 2.6, r = 54/2);  //gap lip to thread
		for(i = [ [0, 0, 0], [180, 0, -70], [0, 0, -120], [180, 0, -180], [0, 0, -230], [180, 0, -300] ])
		{
			rotate(i)	
				translate([-35, 0, -5])
					cube(size=[40, 18, 10]);
		}
	}
	intersection() {
		difference() {
			cylinder(h = 4, r = 54/2);
			cylinder(h = 4, r = 50.4/2);
		}
		translate([-54/2+.4, 0, 0])
			cube(size=[4, 1.9, 4], center = false);  //thread stopper
	}	
}

difference() {
	EFmount();
	translate([0, 0, 1.4])
		cylinder(h = 10, r = 41.5/2);
	for(k = [44.639 : 8.639 : 385]) {
		rotate([0, 0, -k])
		translate([-68/2, 0, -1.1])
		cylinder(h = 6, r = 2);
	}
	//cylinder(h = 17, r = 33/2);
}