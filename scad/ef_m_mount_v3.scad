/*
*
* Canon EF-M lens-side mount
*
* Remix of Canon EF-M lens mount by Peter K. Johnson (PPK):
* https://www.thingiverse.com/thing:703383
*
* Added optional thickness parameter (default is 0) to add depth to the large
*     circle.
* Added grip texture option to outer edge
*
* Created EF-M pinhole module which builds a variable focal length 
* EF-M pinhole lens with a slot to accept a pinhole.
*
* brett stevens 2021.
*/

/*
// constants from Fotasy adapter mount

outer_diam_1 = 54;
outer_diam_2 = 46.8;
outer_diam_3 = 42.88;

inner_diam = 41.28;

// constants from Canon mount

outer_diam_1 = 58.0;
outer_diam_2 = 47.0;
outer_diam_3 = 43.0;

*/

outer_diam_1 = 58.0;
outer_diam_2 = 47.0;
outer_diam_3 = 43.0;

pin_hole_width = 2.2;

// Partial rotate extrude from: http://www.thingiverse.com/thing:34027
module pie_slice(radius, angle, step) {
	for(theta = [0:step:angle-step]) {
		rotate([0,0,0])
		linear_extrude(height=radius*2, center=true)
		polygon( 
			points = [
				[0,0],
				[radius*cos(theta+step), radius*sin(theta+step)],
				[radius*cos(theta), radius*sin(theta)]
			]
		);
	}
}
module partial_rotate_extrude(angle, radius, convex) {
	intersection () {
		rotate_extrude(convexity=convex) translate([radius,0,0]) children(0);
		pie_slice(radius*2, angle, angle/5);
	}
}


// Canon EF-M lens mount

module ef_m_bayonet_section(angle) {
	partial_rotate_extrude(angle, outer_diam_3/2-0.1, 10)
		polygon([[0,-2.2],[0,0],[1.6,0],[1.6,-1.6]]);
}
module ef_m_mount( thickness = 0, grip = false) {
	$fa = 0.01;
    $fn = 200;
	union() {
		difference() {
            if (grip)
            difference() {    
			    translate([0, 0, -thickness])
				    cylinder(h=2+thickness, d=outer_diam_1);
                {
                    for(i = [0:100-1])
                    {
                        rotate([0,0,i*360/100])
                        translate([outer_diam_1/2,0,-1.75-thickness])
                        cylinder(thickness+0.5+2,r=0.5);
                    } 
                 }
             }
            else
			translate([0, 0, -thickness])
				cylinder(h=2+thickness, d=outer_diam_1);
            
			rotate(a=[0, 0, -22])
				translate([49/2, -pin_hole_width/2, 1.1])
					cube([4, pin_hole_width, 1.1]);
			rotate(a=[0, 0, -83])
				translate([outer_diam_1/2-2.5, 0, 1.5])
					cube([1.5, 1.5, 0.6]);
		}
		translate([0, 0, 2])
			cylinder(h=1.6, d=outer_diam_2);
		difference() {
			translate([0, 0, 0])
				cylinder(h=7.6, d=outer_diam_3);
			translate([0, 0, 7.6])
				rotate(a=[0, 0, 40])
					partial_rotate_extrude(140, 34.5/2, 10)
						polygon([[0,-1],[0,0.1],[2.5,0.1],[2.5,-1]]);
		}
		translate([0, 0, 7.6]) {
			partial_rotate_extrude(3, outer_diam_3/2-.1, 10)
				polygon([[0,-4],[0,0],[1.4,0],[1.4,-4]]);
			ef_m_bayonet_section(58);
			rotate(a=[0, 0, 131])
				ef_m_bayonet_section(51);
			rotate(a=[0, 0, 243])
				ef_m_bayonet_section(51);
		}
	}
}

// Example with typical EF-M hole, but that part can be modified as needed for
// whatever final assembly is being made.  There's a subtle alignment dot built
// into the base mount (on the camera side), but if a more visible one is desired
// on a larger assembly it should be at -83 degrees relative to the mount.
//difference() {
//	ef_m_mount();
//	translate([0,0,-1]) cylinder(h=10, d=32);
//}
$fn = 200;
overlap = 0.1;



