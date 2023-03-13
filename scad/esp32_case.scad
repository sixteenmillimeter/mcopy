include <./arduino.scad>;
include <./common/common.scad>;

DEBUG = false;
PART = "case_bottomx";

CaseX = 40;
CaseY = 75;
CaseZ = 30;
CaseD = 8;

CaseSplitZ = 25;

ESP32Position = [0, -7, -5];
ESP32Size = [25.85, 53.8, 1.5];

module pin_debug (pos = [0, 0, 0]) {
	translate(pos) cube([.6, .6, 6.26], center = true); 
}

module esp32_pins_debug (pos = [0, 0, 0]) {
	PinSpacing = 2.5;
	translate(pos) {
		cube([2.5, 48, 2.5], center = true);
		translate([0, -45/2, 0]) for (i = [0 : 18]) {
			pin_debug([0, i * PinSpacing, -3]);
		}
	}
}

module esp32_debug () {
    X = ESP32Size[0];
    Y = ESP32Size[1];
    Z = ESP32Size[2];
    cube([X, Y, Z], center = true);
    //micro usb
    translate([0, (Y/2)-(5.65/2), (Z/2)+(3/2)]) cube([7.5, 5.65, 3], center = true);
    //pins
    esp32_pins_debug([(X/2)-(2.5/2), 0, -(2.5/2)-(Z/2)]);
    esp32_pins_debug([-(X/2)+(2.5/2), 0, -(2.5/2)-(Z/2)]);
    //esp32 chip
    translate([0, -(Y/2)+(17.9/2)+5.4, (Z/2)+(3/2)]) cube([15.9, 17.9, 3], center = true);
    //antenna
    translate([0, -(Y/2)+(25.5/2)-0.85, (Z/2)+(.8/2)]) cube([17.8, 25.5, .8], center = true);
}

module debug () {
	//translate(ESP32Position) rotate([180, 0, 0]) esp32_debug();
	difference () {
		case_bottom();
		//translate([CaseX / 2, 0, 0]) cube([CaseX, CaseY + 1, CaseZ + 1], center = true);
	}
}

/**
 * 
 **/

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

module esp32_mount (pos = [0, 0, 0]) {
	X = ESP32Size[0];
	Y = ESP32Size[1];
	Z = 2;
	translate([pos[0], pos[1], pos[2]-5]) difference () {
		cube([X+3, Y+3, 10], center = true);
		translate([0, 0, (10/2)-(2/2)+0.01]) cube([X, Y, Z], center = true);
		translate([0, 0, 0]) cube([X-1, Y-1, 10], center = true);
		//micro usb
		translate([0, -(Y/2), 2.7]) cube([9, 7, 5], center = true);
		//antenna
		translate([0, (Y/2), 3]) cube([20, 25.5, 5], center = true);
	}
}

module case_bottom () {
	difference () {
		case_shell();
		translate([0, 0, CaseSplitZ]) cube([CaseX + 1, CaseY + 1, CaseZ],center = true);
		//micro usb
		translate([0, -(CaseY/2), -7.8]) cube([9, 7, 4], center = true);
		translate([0, -(CaseY/2)-3, -7.8]) cube([12, 10, 7.7], center = true);
	}
	esp32_mount(ESP32Position);
}

module case_top () {
	difference () {
		case_shell();
		translate([0, 0, CaseSplitZ-CaseZ]) cube([CaseX + 1, CaseY + 1, CaseZ],center = true);
	}
}

if (PART == "case_bottom") {
	case_bottom();
} else if (PART == "case_top") {
	case_top();
} else {
	debug();
}