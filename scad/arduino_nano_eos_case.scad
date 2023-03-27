include <./arduino.scad>;
include <./common/common.scad>;

CaseX = 40;
CaseY = 85;
CaseZ = 35;
CaseD = 8;

CaseSplitZ = 30;

module arduino_nano_mount (pos = [0, 0, 0]) {
    X = 18.2;
    Y = 43.9;
    Z = 10.5;
    BOARD_Z = 1.5;
    translate(pos) difference () {
        //outer
        cube([X + 4, Y + 4, Z], center = true);
        //inner void minus corners
        difference () {
            cube([X - 1, Y - 1, Z + 1], center = true);
            translate([(X / 2) - 1, (Y / 2) - 1, -BOARD_Z]) cylinder(r = (2 / 2), h = Z + 1, center = true, $fn = 20);
            translate([(-X / 2) + 1, (Y / 2) - 1, -BOARD_Z]) cylinder(r = (2 / 2), h = Z + 1, center = true, $fn = 20);
            translate([(X / 2) - 1, (-Y / 2) + 1, -BOARD_Z]) cylinder(r = (2 / 2), h = Z + 1, center = true, $fn = 20);
            translate([(-X / 2) + 1, (-Y / 2) + 1, -BOARD_Z]) cylinder(r = (2 / 2), h = Z + 1, center = true, $fn = 20);
        }
        //board void
        translate([0, 0, (Z / 2) - (BOARD_Z / 2)]) cube([X, Y, BOARD_Z], center = true);
        //usb void
        translate([0, Y / 2, (Z / 2) - (6 / 2) + 0.01]) cube([8, 10, 6], center = true);
    }
}

module case_shell (pos = [0,0,0]) {
	$fn = 50;
    translate(pos) difference () {
    	intersection () {
        	rounded_cube([CaseX, CaseY, CaseZ], d = CaseD, center = true);
        	translate([0, 0, -CaseD/2]) rotate([90, 0, 0]) rounded_cube([CaseX, CaseZ + CaseD, CaseY], d = CaseD, center = true);
        	translate([0, 0, -CaseD/2]) rotate([0, 90, 0]) rounded_cube([CaseZ + CaseD, CaseY, CaseX], d = CaseD, center = true);
    	}
        rounded_cube([CaseX - 6, CaseY - 6, CaseZ - 6], d = 6, center = true);
    }
}

module case_bottom () {
	difference () {
		union () {
			case_shell();
			//bolt_plug([0, BoltY, -(CaseZ/2)+4]);
		}
		translate([0, 0, CaseSplitZ]) cube([CaseX + 1, CaseY + 1, CaseZ],center = true);
		//bolt
		//translate([0, BoltY, -(CaseZ/2)+(3.5/2)-0.01]) cylinder(r = R(5.6), h = 3.5, center = true, $fn = 30);
		//bolt_void([0, BoltY, -(CaseZ/2)], 20);
	}
	
	esp32_mount(ESP32Position);
}

module case_top () {
	$fn = 50;
	difference () {
		case_shell();
		translate([0, 0, CaseSplitZ-CaseZ]) cube([CaseX + 1, CaseY + 1, CaseZ],center = true);
		translate([2.5, -28, 17]) rotate([0, 0, 90]) scale([0.5, 0.5, 1]) linear_extrude(4) {
			text("Canon Rebel T3i", font = "Liberation Sans:style=Bold Italic");
		}
	}
	translate([0, 0, 12]) difference () {
		rounded_cube([CaseX - 6.1, CaseY - 6.1, 4], d = 6, center = true);
		rounded_cube([CaseX - 8, CaseY - 8, 4 + 1], d = 5, center = true);
	}
}

module debug () {
	case_bottom();
}

if (PART == "case_bottom") {

} else {
	debug();
}