include <arduino.scad>;
include <common/common.scad>;

CaseX = 121;
CaseY = 172;
CaseZ = 56;

CaseInnerX = 112;
CaseInnerY = 162;
CaseInnerZ = 52;

CaseMountsX = 91.5;
CaseMountsY = 132;

CaseMountsH = 5;
CaseMountR = 9;

CaseSplitZ = 41;

RelayMountsX = 33.12;
RelayMountsY = 44;

CapacitorSize = [30.5, 37.2, 20];
ResistorSize = [16.25, 49.8, 15.5];

ArduinoPosition = [36, 78, 2];
RelayPosition = [25, -25, 1];
ResistorPosition = [-37, 18, 0];
CapacitorPosition = [-35, -40, 0];

ReinforcementBoltSpacingX = 65;

/**
 * DEBUG MODULES
 **/

module case_mount_debug (pos = [0, 0, 0]) {
	$fn = 30;
	translate([pos[0], pos[1], pos[2] - 0.1]) difference () {
		cylinder(r = R(7), h = CaseMountsH, center = true);
		cylinder(r = R(3.25), h = CaseMountsH + 1, center = true);
	}
}

module case_mounts_debug () {
	X = CaseMountsX/2;
	Y = CaseMountsY/2;
	Z = -(CaseInnerZ/2)+(CaseMountsH/2);
	case_mount_debug([X,   Y, Z]);
	case_mount_debug([X,  -Y, Z]);
	case_mount_debug([-X,  Y, Z]);
	case_mount_debug([-X, -Y, Z]);
}

module case_debug () {
	difference () {
		cube([CaseX, CaseY, CaseZ], center = true);
		cube([CaseInnerX, CaseInnerY, CaseInnerZ], center = true);
		translate([0, 0, CaseSplitZ]) cube([CaseX + 1, CaseY + 1, CaseZ], center = true);
		translate([0, 150, 0]) cube([CaseX + 1, CaseY, CaseZ + 1], center = true);
	}
	case_mounts_debug();
}

module relay_module_post_void (pos = [0, 0, 0], D, Z) {
	translate(pos) cylinder(r = R(D), h = Z + 1, center = true);
}

module relay_module_debug (pos = [0, 0, 0], rot = [0, 0, 0]) {
	X = 39;
	Y = 50;
	Z = 1.25;
	D = 3;
	RelayOffsetX = (15/2) + (1.75/2);
	RelayOffsetY = -(Y/2) + (18.6/2) + 12.3;
	TerminalOffsetY = -(Y/2) + (8/2) + 3.7;
	$fn = 20;
	
	translate(pos) rotate(rot) {
		difference () {
			rounded_cube([X, Y, Z], d = 5, center = true);
			relay_module_post_void([RelayMountsX/2, RelayMountsY/2, 0], D, Z);
			relay_module_post_void([RelayMountsX/2, -RelayMountsY/2, 0], D, Z);
			relay_module_post_void([-RelayMountsX/2, RelayMountsY/2, 0], D, Z);
			relay_module_post_void([-RelayMountsX/2, -RelayMountsY/2, 0], D, Z);
		}
		//relays
		translate([RelayOffsetX, RelayOffsetY, 15/2]) cube([15, 18.6, 15], center = true);
		translate([-RelayOffsetX, RelayOffsetY, 15/2]) cube([15, 18.6, 15], center = true);
		//terminals
		translate([0, TerminalOffsetY, 10.14/2]) cube([30.6, 8, 10.14], center = true);
	}
}

module resistor_foot_debug (pos = [0, 0, 0]) {
	$fn = 20;
	translate(pos) difference () {
		cube([6, 8.75, 2], center = true);
		cylinder(r = R(3.5), h = 2 + 1, center = true);
	}
}

module resistor_debug (pos = [0, 0, 0]) {
	X = ResistorSize[0];
	Y = ResistorSize[1];
	Z = ResistorSize[2];
	translate (pos) {
		cube([X, Y, Z], center = true);
		resistor_foot_debug([-(X/2)-(6/2), (Y/2)-(8.75/2), -(Z/2)+(2/2)]);
		resistor_foot_debug([(X/2)+(6/2), -(Y/2)+(8.75/2), -(Z/2)+(2/2)]);
		translate([0, (Y/2)+(11.5/2), 0]) rotate([90, 0, 0]) cylinder(r = R(2), h = 11.5, center = true);
		translate([0, -(Y/2)-(11.5/2), 0]) rotate([90, 0, 0]) cylinder(r = R(2), h = 11.5, center = true);
	}
}

module capacitor_debug (pos = [0, 0, 0]) {
	translate(pos) {
		cube(CapacitorSize, center = true);
		//tab
		translate([(CapacitorSize[0]/2) + (14/2) - 5, 0, -(CapacitorSize[2]/2) + (0.85/2)]) difference() {
			rounded_cube([14+10, 10, .85], d = 10, center = true, $fn = 30);
			translate([4, 0, 0]) cube([6.87, 4.75, 0.85 + 1], center = true);
		}
	}
}

/**
 * CASE MODULES
 **/

 module m3_bolt (pos = [0, 0, 0], h = 10, pad = 0) {
    translate(pos) cylinder(r = R(3.25 + pad), h = h, center = true, $fn = 30);
}

module arduino_bolts_voids (pos = [0, 0, 0], rot = [0, 0, 0], h = 10, pad = 0) {
	translate(pos) rotate(rot) {
		m3_bolt([-2.5, -15.25, 0], h, pad);
		m3_bolt([-50.75, -14, 0], h, pad);
		m3_bolt([-45.7, -66, 0], h, pad);
		m3_bolt([-17.75, -66, 0], h, pad);
	}
}

 module arduino_mount_reinforcement () {
 	X = 57.25;
 	Y = 71;
 	Z = 5;
 	pos = [-(X/2)+1.5, -(Y/2)+1.5, -2];
 	translate(pos) difference () {
 		cube([X, Y, Z], center =  true);
 		cube([X-10, Y-13, Z+1], center =  true);
 	}
 }

module case_mount (pos = [0, 0, 0]) {
	$fn = 30;
	translate(pos) difference () {
		cylinder(r = R(CaseMountR), h = CaseMountsH, center = true);
		cylinder(r = R(3.5), h = CaseMountsH + 1, center = true);
	}
}

module case_mounts (pos = [0, 0, 0]) {
	X = CaseMountsX/2;
	Y = CaseMountsY/2;
	Z = 0;
	XBrace = CaseMountsX - (CaseMountR/2);
	YBrace = CaseMountsY - (CaseMountR/2);
	DiagBrace = sqrt(pow(XBrace, 2) + pow(YBrace, 2));
	DiagAngle = 57;
	translate(pos) {
		case_mount([X,   Y, Z]);
		case_mount([X,  -Y, Z]);
		case_mount([-X,  Y, Z]);
		case_mount([-X, -Y, Z]);
	}
	//sides
	translate([0, Y, 0]) cube([XBrace, 6, 5], center = true);
	translate([0, -Y, 0]) cube([XBrace, 6, 5], center = true);
	translate([X, 0, 0]) cube([6, YBrace, 5], center = true);
	translate([-X, 0, 0]) cube([6, YBrace, 5], center = true);
	//diagonal
	rotate([0, 0, DiagAngle]) cube([DiagBrace, 6, 5], center = true);
	rotate([0, 0, -DiagAngle]) cube([DiagBrace, 6, 5], center = true);
}

module relay_module_post (pos = [0, 0, 0]) {
	$fn = 30;
	translate(pos) {
		cylinder(r = R(5), h = 4, center = true);
		translate([0, 0, (4/2) + (2.9/2)]) cylinder(r = R(2.75), h = 3, center = true);
	}
}

module relay_mount (pos = [0, 0, 0]) {
	$fn = 30;
	X = RelayMountsX/2;
	Y = RelayMountsY/2;
	PostZ = 3;
	translate(pos) {
		translate([0, 0, -1]) difference () {
			rounded_cube([RelayMountsX + 5, RelayMountsY + 5, 5], d = 5, center = true);
			rounded_cube([RelayMountsX - 5, RelayMountsY - 5, 5 + 1], d = 4, center = true);
		}
		relay_module_post([X,   Y, PostZ]);
		relay_module_post([X,  -Y, PostZ]);
		relay_module_post([-X,  Y, PostZ]);
		relay_module_post([-X, -Y, PostZ]);
	}
}

module resistor_foot_mount (pos = [0, 0, 0]) {
	$fn = 30;
	translate(pos) {
		cube([6, 8.75, 5], center = true);
		translate([0, 0, (5/2) + (2/2)]) cylinder(r = R(6), h = 2, center = true);
		translate([0, 0, (5/2) + (5/2)]) cylinder(r = R(3), h = 5, center = true);
	}
}

module resistor_mount (pos = [0, 0, 0]) {
	X = ResistorSize[0];
	Y = ResistorSize[1];
	Z = ResistorSize[2];
	translate (pos) {
		difference () {
			cube([X, Y, 5], center = true);
			cube([X - 10, Y - 10, 5 + 1], center = true);
		}
		resistor_foot_mount([-(X/2)-(6/2), (Y/2)-(8.75/2), 0]);
		resistor_foot_mount([(X/2)+(6/2), -(Y/2)+(8.75/2), 0]);
	}
}

module capacitor_mount (pos = [0, 0, 0]) {
	translate(pos) {
		difference () {
			cube([CapacitorSize[0], CapacitorSize[1], 5], center = true);
			cube([CapacitorSize[0] - 10, CapacitorSize[1] - 10, 5 + 1], center = true);
		}
		translate([(CapacitorSize[0]/2) + (14/2) - 5, 0, 0]){
			cube([14+10, 10, 5], center = true);
			translate([4, 0, 3]) cube([4.5, 4.5, 5], center = true);
		}
	}
}

module electronics_attachment_bolt_reinforcement (pos = [0, 0, 0]) {
	translate(pos) translate([-28, -4, -2]) {
		translate([ReinforcementBoltSpacingX / 2, -4, 0]) {
			cylinder(r = R(12), h = 5, center = true, $fn = 30);
		}
		translate([-ReinforcementBoltSpacingX / 2, -4, 0]) {
			cylinder(r = R(12), h = 5, center = true, $fn = 30);
		}
	}
}

module electronics_attachment_bolt_voids (pos = [0, 0, 0]) {
	translate(pos) translate([-28, -4, 0]) {
		translate([ReinforcementBoltSpacingX / 2, -4, 0]) {
			cylinder(r = R(3.25), h = 20 + 1, center = true, $fn = 30);
			translate([0, 0, -4]) m3_nut();
			translate([6, 0, 0]) cylinder(r = R(3.25), h = 20 + 1, center = true, $fn = 30);
			
		}
		translate([-ReinforcementBoltSpacingX / 2, -4, 0]) {
			cylinder(r = R(3.25), h = 20 + 1, center = true, $fn = 30);
			translate([0, 0, -4]) m3_nut();
		}
	}
}

//BOM: 4, M3 hex cap bolt 8mm,N/A,Attach Arduino Uno
module electronics_mount () {
	difference () {
		union() {
			case_mounts([0, 0, 0]);
			translate(ArduinoPosition) {
				rotate([0, 0, 180]) bumper();
				arduino_mount_reinforcement();
			}
			relay_mount(RelayPosition);
			resistor_mount(ResistorPosition);
			capacitor_mount(CapacitorPosition);
			electronics_attachment_bolt_reinforcement(ArduinoPosition);
		}
		arduino_bolts_voids(ArduinoPosition);
		electronics_attachment_bolt_voids(ArduinoPosition);
	}
	//translate([35.1, 76.8, 4.5]) rotate([0, 0, 180]) arduino();
}

module electronics_attachment () {
	difference () {
		cube([70, 16, 19.75], center = true);
		translate([1/2, 0, -15.5]) cube([58, 20 + 1, 20], center = true);
		translate([5.5, 0, -11.5]) cube([48, 20 + 1, 20], center = true);
		translate([11.75, 00, -4.5]) cube([13, 20 + 1, 20], center = true);
		translate([-18, 00, -5]) cube([10, 20 + 1, 20], center = true);
		translate([ReinforcementBoltSpacingX / 2, 0, 0]) {
			cylinder(r = R(3.25), h = 20 + 1, center = true, $fn = 30);
			translate([0, 0, 10]) cylinder(r = R(6.5), h = 20 , center = true, $fn = 30);
		}
		translate([-ReinforcementBoltSpacingX / 2, 0, 0]) {
			cylinder(r = R(3.25), h = 20 + 1, center = true, $fn = 30);
			translate([0, 0, 10]) cylinder(r = R(6.5), h = 20 , center = true, $fn = 30);
		}
		arduino_bolts_voids([28, 6.5, 0], h = 20, pad = 5);

	}
}

module usb_protector () {
    H = 3;
    difference () {
        rounded_cube([IN, IN, H], d = 5, center = true, $fn = 40);
        cube([12, 12, H + 1], center = true);
    }
}

module debug () {
	case_debug();
	translate([0, 0, -CaseInnerZ/2+(CaseMountsH)]) electronics_mount();
	relay_module_debug([RelayPosition[0], RelayPosition[1], RelayPosition[2]-15]);
	resistor_debug([ResistorPosition[0], ResistorPosition[1], ResistorPosition[2] -8]);
	capacitor_debug([CapacitorPosition[0], CapacitorPosition[1], CapacitorPosition[2] - 8]);
	translate(ArduinoPosition) translate([-27.5, -8, -10]) electronics_attachment();
}

PART="electronics_mount";

if (PART == "electronics_mount") {
	electronics_mount();
} else if (PART == "electronics_attachment") {
	electronics_attachment();
} else if (PART == "case_mounts") {
	case_mounts();
} else if (PART == "usb_protector") {
    usb_protector();
} else {
	debug();
}