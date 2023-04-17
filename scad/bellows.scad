include <common/common.scad>;

LIBRARY=false;

BellowsBoard = 60;
MagnetPositionX = 40;
MagnetPositionY = 40;

module cmount_male (len = 4) {
	InnerD = 23;
	OuterD = 24.7;
	SocketInnerD = 25.4;
	SocketOuterD = 28.6;
	translate ([0, 0, len / 2 ]) {
		difference () {
			union () {
				cylinder(r = R(OuterD), h = len, center = true);
			}
			cylinder(r = R(InnerD), h = len + 1, center = true);
		}

		difference () {
			translate([0, 0, -(len / 2) - 1]) cylinder(r = R(SocketOuterD), h = 2, center = true);
			translate([0, 0, -(len / 2) - 1]) cylinder(r1 = R(SocketInnerD), r2 = R(InnerD), h = 3, center = true);
		}	
	}
}

module bellows_camera_board (magnets = false) {
    H = 6;
    InnerD = 39;
    difference () {
        if (magnets) {
            bellows_board_magnetic_body(H);
        } else {
            cube([BellowsBoard, BellowsBoard, H], center = true);
        }
        //center
        cylinder(r = R(InnerD), h = H + 1, center = true, $fn = 360);
        //center bevels
        translate([0, 0, 2.25]) cylinder(r1 = R(InnerD - 2), r2 = R(InnerD + 2), h = 1.5, center = true, $fn = 360);
        translate([0, 0, -2.25]) cylinder(r1 = R(InnerD + 2), r2 = R(InnerD - 2), h = 1.5, center = true, $fn = 360);
        //corners
        for (i = [0 : 3]) {
            rotate([0, 0, i * (360 / 4) + 45 ]) translate([43.5, 0, 0]) cube([11, 11, H + 1], center = true);
        }
        //bolt
        translate([0, 30, 0]) rotate([90, 0, 0]) cylinder(r = R(4), h = 30, center = true, $fn = 30);
    }
}

module bellows_lens_board (magnets = false) {
    H = 6;
    ProtrusionD = 37.25;
    ProtrusionH = 7;
    InnerD = 34.5;
    difference () {
        union () {
            if (magnets) {
                bellows_board_magnetic_body(H);
            } else {
                cube([BellowsBoard, BellowsBoard, H], center = true);
            }
            translate([0, 0, (H/2) + (ProtrusionH/2)]) cylinder(r = R(ProtrusionD), h = ProtrusionH, center = true, $fn = 360);
        }
        //center
        cylinder(r = R(InnerD), h = H + ProtrusionH + 10, center = true, $fn = 360);
        
        //corners
        for (i = [0 : 3]) {
            rotate([0, 0, i * (360 / 4) + 45 ]) translate([43.5, 0, 0]) cube([11, 11, H + 1], center = true);
        }
    }
}

module camera_mount () {
    $fn = 360;
    cmount_male(5);
    translate([0, 0, -4]) {
        difference() {
            cylinder(r = R(42), h = 4, center = true);
            cylinder(r = R(26), h = 4 + 1, center = true);
        }
    }
    translate([0, 0, -4 - 5]) {
        difference() {
            cylinder(r = R(37.9), h = 7, center = true);
            cylinder(r = R(30), h = 7 + 1, center = true);
        }
    }
}

module magnet_void (pos = [0, 0, 0], H = 2.6) {
    D = 6 + .25;
    translate(pos) cylinder(r = R(D), h = H, center = true, $fn = 60);
}

module bellows_board_magnetic_body (H = 6) {
    X = MagnetPositionX / 2;
    Y = MagnetPositionY / 2;
    Z = .5;
    difference () {
        cube([BellowsBoard, BellowsBoard, H], center = true);
        magnet_void([X, Y, Z], H);
        magnet_void([-X, Y, Z], H);
        magnet_void([X, -Y, Z], H);
        magnet_void([-X, -Y, Z], H);
    }
}

module bellows_board_magnetic(H = 3) {
    InnerD = 45;
    difference () {
        bellows_board_magnetic_body(H);
        //center
        cylinder(r = R(InnerD), h = H + 1, center = true, $fn = 360);
        
        //corners
        for (i = [0 : 3]) {
            rotate([0, 0, i * (360 / 4) + 45 ]) translate([43.5, 0, 0]) cube([11, 11, H + 1], center = true);
        }
    }
}

PART = "bellows_camera_board_magnetic";

if (!LIBRARY && PART == "bellows_camera_board") {
    bellows_camera_board();
} else if (!LIBRARY && PART == "bellows_camera_board_magnetic") {
    bellows_camera_board(magnets = true);
} else if (!LIBRARY && PART == "camera_mount") {
    camera_mount();
} else if (!LIBRARY && PART == "bellows_lens_board") {
    bellows_lens_board();
} else if (!LIBRARY && PART == "bellows_lens_board_magnetic") {
    bellows_lens_board(magnets = true);
} else if (!LIBRARY && PART == "bellows_board_magnetic") {
    bellows_board_magnetic();
}