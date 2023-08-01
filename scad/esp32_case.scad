include <./arduino.scad>;
include <./common/common.scad>;

DEBUG = false;
PART = "case_top";

CaseX = 70;
CaseY = 85;
CaseZ = 35;
CaseD = 8;

CaseSplitZ = 30;

ESP32Position = [15, -7-5, -5];
ArduinoNanoPosition = [-17, -17, -(CaseZ/2) + 8];
ESP32Size = [25.85, 53.8, 1.5];
ButtonPosition = [9, CaseY/2, 0];
LEDPosition1 = [-3, CaseY/2, 0];
LEDPosition2 = [-11, CaseY/2, 0];

BoltY = 25;

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
		union () {
			case_bottom();
			translate([0, 0, 1]) rotate([0, 0, 0]) color("red") case_top();
		}
		translate([-CaseX / 2, 0, 0]) cube([CaseX, CaseY + 1, 100], center = true);
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

module arduino_nano_mount (pos = [0, 0, 0]) {
    X = 18.2;
    Y = 43.9;
    Z = 10.5;
    BOARD_Z = 1.5;
    translate(pos) rotate([0, 0, 180]) difference () {
        //outer
        cube([X + 6, Y + 6, Z], center = true);
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

module esp32_mount (pos = [0, 0, 0]) {
	X = ESP32Size[0];
	Y = ESP32Size[1];
	Z = 2;
	translate([pos[0], pos[1], pos[2]-5]) difference () {
		cube([X+4, Y+4, 10], center = true);
		translate([0, 0, (10/2)-(2/2)+0.01]) cube([X, Y, Z], center = true);
		translate([0, 0, 0]) cube([X-1, Y-1, 10], center = true);
		//micro usb
		translate([0, -(Y/2), 2.7]) cube([9, 7, 5], center = true);
		//antenna
		translate([0, (Y/2), 3]) cube([20, 25.5, 5], center = true);
	}
}

module button_void (pos = [0, 0, 0]) {
	D = 6.9;
	translate(pos) rotate([90, 0, 0]) cylinder(r = R(D), h = 10, center = true, $fn = 60);
}

module LED_void (pos = [0, 0, 0]) {
	D = 5.1;
	translate(pos) rotate([90, 0, 0]) cylinder(r = R(D), h = 10, center = true, $fn = 60);
}

module bolt_void (pos = [0, 0, 0], Z = 20, pad = 0) {
	translate(pos) cylinder(r = R(3.25 + pad), h = Z, center = true, $fn = 30);
}

module bolt_plug (pos = [0, 0, 0], pad = 0) {
	translate(pos) cylinder(r = R(8 + pad), h = 3.5, center = true, $fn = 60);
}

module usb_mini_void (pos = [0, 0, 0]) {
    translate(pos) {
        translate([0, -25, 2]) {
            cube([8, 10, 5], center = true);
            translate([0, -5, 0]) cube([12, 10, 8], center = true);
        }
    }
}

module case_bottom () {
	difference () {
		union () {
			case_shell();
			bolt_plug([0, BoltY, -(CaseZ/2)+4]);
		}
		translate([0, 0, CaseSplitZ]) cube([CaseX + 1, CaseY + 1, CaseZ],center = true);
		//micro usb
		translate([15, -(CaseY/2), -7.8]) cube([9, 7, 4], center = true);
		translate([15, -(CaseY/2)-3, -7.8]) cube([12, 10, 7.7], center = true);
        //mini USB
        usb_mini_void(ArduinoNanoPosition);
		//button
		button_void(ButtonPosition);
		//LEDS
		LED_void(LEDPosition1);
		LED_void(LEDPosition2);
		//bolt
		translate([0, BoltY, -(CaseZ/2)+(3.5/2)-0.01]) cylinder(r = R(5.6), h = 3.5, center = true, $fn = 30);
		bolt_void([0, BoltY, -(CaseZ/2)], 20);
        
	}
	esp32_mount(ESP32Position);
    arduino_nano_mount(ArduinoNanoPosition);
}

module case_top () {
	$fn = 50;
	difference () {
		case_shell();
		translate([0, 0, CaseSplitZ-CaseZ]) cube([CaseX + 1, CaseY + 1, CaseZ],center = true);
		bolt_void([0, BoltY, 0], CaseZ - 6 + 1);
		translate([2.5, -28, 17]) rotate([0, 0, 90]) scale([0.5, 0.5, 1]) linear_extrude(4) {
			text("Canon EOS M50", font = "Liberation Sans:style=Bold Italic");
		}
	}
	translate([0, 0, 12]) difference () {
		rounded_cube([CaseX - 6.1, CaseY - 6.1, 4], d = 6, center = true);
		rounded_cube([CaseX - 8, CaseY - 8, 4 + 1], d = 5, center = true);
	}
	difference () {
		translate([0, BoltY, 1]) cube([10, 10, CaseZ - 6 - 1], center = true);
		bolt_void([0, BoltY, -4], CaseZ - 6 + 1, -.4);
		bolt_plug([0, BoltY, -(CaseZ/2)+4], 0.2);
	}

}

if (PART == "case_bottom") {
	case_bottom();
} else if (PART == "case_top") {
	case_top();
} else {
	debug();
}