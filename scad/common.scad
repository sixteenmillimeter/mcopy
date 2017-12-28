
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