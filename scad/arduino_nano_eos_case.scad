include <./nano.scad>;
include <./common/common.scad>;

afficher_nano = "x";

CaseX = 64;
CaseY = 85;
CaseZ = 35;
CaseD = 8;

CaseSplitZ = 30;

RelayModuleX = 28;
RelayModuleY = 40;
RelayModuleZ = 1.6;

RelayModulePosition = [12, -5, -9];

ArduinoNanoPosition = [-17, 17, -(CaseZ/2) + 8];

AudioJackPosition = [15, CaseY/2, 0];

ButtonPosition = [-15, -CaseY/2, 0];

LEDPosition = [15, -CaseY/2, 0];

BoltY = 25;
BoltX = 0;

module arduino_nano_mount (pos = [0, 0, 0]) {
    X = 18.2;
    Y = 43.9;
    Z = 10.5;
    BOARD_Z = 1.5;
    translate(pos) difference () {
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

module usb_mini_void (pos = [0, 0, 0]) {
    translate(pos) {
        translate([0, 25, 2]) {
            cube([8, 10, 5], center = true);
            translate([0, 5, 0]) cube([12, 10, 8], center = true);
        }
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

module audio_jack_void (pos = [0, 0, 0]) {
    $fn = 60;
    translate(pos) rotate([90, 0, 0]) {
        cylinder(r = R(7.7), h = 8, center = true);
        translate([0, 0, -3]) cylinder(r = R(10), h = 8, center = true);
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

module case_bottom () {
	difference () {
		union () {
			case_shell();
			bolt_plug([BoltX, BoltY, -(CaseZ/2)+4]);
		}
		translate([0, 0, CaseSplitZ]) cube([CaseX + 1, CaseY + 1, CaseZ],center = true);
		//bolt
		translate([BoltX, BoltY, -(CaseZ/2)+(3.5/2)-0.01]) cylinder(r = R(5.6), h = 3.5, center = true, $fn = 30);
		bolt_void([BoltX, BoltY, -(CaseZ/2)], 20);
        //usb mini
        usb_mini_void(ArduinoNanoPosition);
        audio_jack_void (AudioJackPosition);
        button_void(ButtonPosition);
        LED_void(LEDPosition);
	}

    arduino_nano_mount(ArduinoNanoPosition);
    relay_module_mount(RelayModulePosition);
}

module case_top () {
	$fn = 50;
	difference () {
		case_shell();
		translate([0, 0, CaseSplitZ-CaseZ]) cube([CaseX + 1, CaseY + 1, CaseZ],center = true);
        bolt_void([BoltX, BoltY, 0], CaseZ - 6 + 1);
		translate([2.5, -28, 17]) rotate([0, 0, 90]) scale([0.5, 0.5, 1]) linear_extrude(4) {
			text("Canon Rebel T3i", font = "Liberation Sans:style=Bold Italic");
		}
	}
	translate([0, 0, 12]) difference () {
		rounded_cube([CaseX - 6.1, CaseY - 6.1, 4], d = 6, center = true);
		rounded_cube([CaseX - 8, CaseY - 8, 4 + 1], d = 5, center = true);
	}
    difference () {
		translate([BoltX, BoltY, 1]) cube([10, 10, CaseZ - 6 - 1], center = true);
		bolt_void([BoltX, BoltY, -4], CaseZ - 6 + 1, -.4);
		bolt_plug([BoltX, BoltY, -(CaseZ/2)+4], 0.2);
	}
}

module relay_module_mount (pos = [0, 0, 0]) {
    Z = 7;
    translate(pos) translate([0, 0, -(Z/2) + (RelayModuleZ/2)]) rotate([0, 0, 180]) {
        difference() {
            cube([RelayModuleX + 6, RelayModuleY + 4, Z], center = true);
            translate([0, -2, 0]) cube([RelayModuleX - 4, RelayModuleY - 8, Z + 1], center = true);
            cube([14.75, RelayModuleY - 3, Z + 1], center = true);
            translate([0, 0, (Z/2) - (RelayModuleZ/2)]) cube([RelayModuleX+ 0.2, RelayModuleY + 0.2, RelayModuleZ + 0.1], center = true);
        }
        translate([(RelayModuleX/2) - 3.5, (RelayModuleY/2) - 3.5, Z/2]) cylinder(r = R(2.6), h = RelayModuleZ + 1, center = true, $fn = 40);
       translate([-(RelayModuleX/2) + 3.5, (RelayModuleY/2) - 3.5, Z/2]) cylinder(r = R(2.6), h = RelayModuleZ + 1, center = true, $fn = 40);
    }
}

module debug_relay_module (pos = [0, 0, 0]) {
    translate(pos) rotate([0, 0, 180]) {
        difference () {
            union () {
                cube([RelayModuleX, RelayModuleY, RelayModuleZ], center = true);
                //relay
                translate([0, 0, (15.5/2) + (RelayModuleZ/2)]) cube([15.25, 18.8, 15.5], center = true);
                //terminal
                translate([0, -(RelayModuleY/2) + (7.75/2), (10/2) + (RelayModuleZ/2)]) cube([15.6, 7.75, 10], center = true);
            }
            translate([(RelayModuleX/2) - 3.5, (RelayModuleY/2) - 3.5, 0]) cylinder(r = R(2.9), h = RelayModuleZ + 1, center = true, $fn = 40);
            translate([-(RelayModuleX/2) + 3.5, (RelayModuleY/2) - 3.5, 0]) cylinder(r = R(2.9), h = RelayModuleZ + 1, center = true, $fn = 40);
        }
    }
}

module debug () {
    case_top();
    difference () {
        case_bottom();
        
        translate([(CaseX/2), 0, 0]) cube([CaseX, CaseY + 1, CaseZ + 1], center = true);
    }
    translate([0, 0, 4]) translate(ArduinoNanoPosition) rotate([0, 0, 90]) nano_328_v1();
    debug_relay_module(RelayModulePosition);
}

PART = "case_bottom";

if (PART == "case_bottom") {
    case_bottom();
} else if (PART == "case_top") {
    case_top();
} else {
	debug();
}