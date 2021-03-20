PANEL_Z = 3;

RELAY_X = 44.4;
RELAY_Y = 33.1;

RELAY_D1 = 5;
RELAY_D2 = 2.6;

RELAY_H1 = 2;
RELAY_H2 = 2;

RELAY_OFFSET_Y = 25 / 2;

WALL = 4;

X = 65;
Y = 80;
Z = 35;

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

module relay_post () {
    $fn = 60;
    union () {
        cylinder(r = RELAY_D1 / 2, h = RELAY_H1 + (PANEL_Z / 2), center = true);
        translate([0, 0, (RELAY_H1 / 2) + (RELAY_H2 / 2) + (PANEL_Z / 4)]) cylinder(r = RELAY_D2 / 2, h = RELAY_H2, center = true);
   }
}

module nano () {
    cube([43.5, 18, 2], center = true);
}

module nano_mount () {
    h = 5;
    difference () {
        cube([50, 23, h], center = true);
        cube([41, 15, h + 1], center = true);
        translate([0, 0, (h / 2) - (2 / 2) + 0.01 ]) nano();
    }
}

module box_blank () {
    D = 10;
    intersection () {
        rounded_cube([X, Y, Z], d = D, center = true, $fn = 60);
        rotate([0, 90, 0]) rounded_cube([Z, Y, X], d = D, center = true, $fn = 60);
        rotate([90, 0, 0]) rounded_cube([X, Z, Y], d = D, center = true, $fn = 60);
    }
}

module clip () {
    w = 6;
    cube([3, w, 8], center = true);
    translate([1.5, 0, -2]) rotate([90, 0, 0]) cylinder(r = 4 / 2, h = w, center = true, $fn = 20);
}

module clips (x_pad = 0) {
    Y_OFFSET = 15;
    X_OFFSET = WALL + 2.5 + x_pad;
    translate([(X / 2) - X_OFFSET, (Y / 2) - Y_OFFSET, 0]) clip();
    translate([(X / 2) - X_OFFSET, -(Y / 2) + Y_OFFSET, 0]) clip();
    translate([-(X / 2) + X_OFFSET, (Y / 2) - Y_OFFSET, 0]) rotate([0, 0, 180]) clip();
    translate([-(X / 2) + X_OFFSET, -(Y / 2) + Y_OFFSET, 0]) rotate([0, 0, 180]) clip();
}


module case () {
    translate([0, 0, (30 / 2) - (WALL / 2) + 0.1]) difference () {
        translate([0, 0, 5]) box_blank();
        translate([0, 0, 35]) cube([X + 1, Y + 1, Z], center = true);
        translate([0, 0, WALL]) rounded_cube([65 - (WALL * 2), 80 - (WALL * 2), 30], d = 10 - (WALL / 2), center = true, $fn = 60);
        translate([-6.75 - 10, -22, (-30 / 2) + WALL + 7]) cube([50, 9, 5], center = true); 
        translate([-10, 30, -1]) rotate([90, 0, 0]) cylinder(r = 5 /2, h = 40, center = true, $fn = 50);
        translate([0, 0, 15.5]) clips(-0.25);
    }
    
    translate([-6.75, -22, 4.9]) difference() {
        nano_mount(); 
        translate([-10, 0, 3]) cube([50, 9, 5], center = true);
    }
    translate ([0, RELAY_OFFSET_Y, (PANEL_Z / 2) + (RELAY_H1 / 2)]) {
        translate([RELAY_X / 2, RELAY_Y / 2, 0]) relay_post();
        translate([-RELAY_X / 2, RELAY_Y / 2, 0]) relay_post();
        translate([RELAY_X / 2, -RELAY_Y / 2, 0]) relay_post();
        translate([-RELAY_X / 2, -RELAY_Y / 2, 0]) relay_post();
    }
    //color("blue") cube([50, 50, 20], center = true);   
}
module cover () {
    translate([0, 0, (30 / 2) - (WALL / 2) + 0.1]) {
        difference () {
            translate([0, 0, 5]) box_blank();
            translate([0, 0, 0]) cube([X + 1, Y + 1, Z], center = true);
        }
        translate([0, 0, 15.5]) clips();
    }
}

case();
cover();