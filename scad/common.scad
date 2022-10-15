
echo("common.scad - rounded_cube()");
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

echo("common.scad - trap_cube()");
module trap_cube(height = 19, top_x = 30, top_y = 34, bottom_x = 45, bottom_y = 65, wall_thickness = 2) {
	difference(){
		hull(){
			translate([0,0,height])
				cube([top_x, top_y, 0.1], center=true);
				cube([bottom_x, bottom_y, 0.1], center=true);
			}

		hull(){
			translate([0,0,height])
				cube([top_x - wall_thickness, top_y - wall_thickness, 0.1], center=true);
				cube([bottom_x - wall_thickness, bottom_y - wall_thickness, 0.1], center=true);
		}
	}
}

echo("common.scad - R()");
function R (diameter) = diameter / 2.0;

echo("common.scad - m3_nut");
module m3_nut (H = 5) {
    cylinder(r=R(6.6), h=H, center=true, $fn=6);
}

module opto_endstop(){
 difference(){
  union(){
  // base PCB
   color("green") cube([33.0,1.6,10.5]);
  // add the switch module
   translate([8.4,1.6,10.5/2-6.4/2]) optoswitch();
   // connector
   translate([0.2,-7,0]) color("white") cube([5.8,7,10.5]);
   // led
   translate([3.5,1.6,10.5/2-1.5/2]) color("red") cube([2,0.7,1.5]);
  }
   translate([8.4,0,10.5/2-6.4/2]) {
   for ( hole = [2.75,24.5-2.75] ){
    rotate([90,0,0]) translate([hole,6.4/2,-4]) cylinder(r=1.5, h=4.5,$fn=40);
   }
  }
 }
}

// switch module
module optoswitch() {
    difference(){
        union (){
            color("gray") cube([24.5,3.5,6.4]);
            color("gray")translate([6.63,0,0]) cube([4.45,11.3,6.3]);
            color("gray")translate([13.63,0,0]) cube([4.45,11.3,6.3]);
        }
       for ( hole = [2.75,24.5-2.75] ){
           rotate([90,0,0]) translate([hole,6.4/2,-4]) cylinder(r=1.5, h=4.5,$fn=40);
       }	
     }
 }
 
 module hex (diag = 10, h = 1) {
    cylinder(r = diag / 2, h = h, center = true, $fn = 6);
}

//NEMA17 Stepper
module NEMA17 ( H = 33 ) { //alt = 47.5
    difference () {
        cube([42, 42, H], center = true);
        for (i = [0 : 3]) {
            rotate([0, 0, (i * 90) + 45]) translate([29.7, 0, 0]) cube([5.5, 5.5, H + 1], center = true);
        }
        translate([31/2, 31/2, (H/2)-1.9]) cylinder(r = R(3), h = 4, center = true, $fn=30);
        translate([-31/2, 31/2, (H/2)-1.9]) cylinder(r = R(3), h = 4, center = true, $fn=30);
        translate([31/2, -31/2, (H/2)-1.9]) cylinder(r = R(3), h = 4, center = true, $fn=30);
        translate([-31/2, -31/2, (H/2)-1.9]) cylinder(r = R(3), h = 4, center = true, $fn=30);
    }
    //pad
    translate([0, 0, (H/2) + (1.9/2)]) {
        cylinder(r = R(22), h = 1.9, center = true, $fn = 100);
    }
    //shaft
    translate([0, 0, (H/2) + (22.75/2)]) {
        difference () {
            cylinder(r = R(5), h = 22.75, center = true, $fn = 30);
            translate([0, 4.5, 4.7]) cube([5, 5, 22.75], center = true);
        }
        
    } 
}