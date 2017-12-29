
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