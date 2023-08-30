include <./common/common.scad>;
include <./common/motors.scad>;

PanelX = 89;
PanelY = 125;
PanelZ = 6;

BearingOuterDiameter = 21.6;
BearingInnerDiameter = 8.05;

FrameBoltX = (-PanelX / 2) + 8.6;
FrameBoltY = 92.8 / 2;
FrameBoltD = 9;

KeyDistance = 57.4 - .2;
KeyVoidD = BearingInnerDiameter + 0.3;
KeyVoidD2 = 14.2;
KeyWidth = 2.25;

StepperMountZ = 20;

GateBoltX = (-PanelX / 2) + 54;
GateBoltY = 105 / 2;

NubVoidD = 5.5;
NubVoidX = 3.5;
NubX = (-PanelX / 2) + 66;

LEDD = 5.0;
LEDPin = 0.6;
LEDPinSpacing = 2.54;
LEDH = 8.6;

module bearing_void (pos = [0, 0, 0], width= 8) {
	fuzz = 0.3;
	translate (pos) {
		difference () {
			cylinder(r = R(BearingOuterDiameter) + fuzz, h = width, center = true, $fn = 90);
		}
	}
}

module key_void (pos = [0, 0, 0]) {
	translate(pos) {
		cylinder(r = R(KeyVoidD), h = 6 + 1, center = true, $fn = 50);
		translate([0, 0, -1.5]) cylinder(r = R(KeyVoidD2), h = 6, center = true, $fn = 50);
	}
}

module front_bolt_void (pos = [0, 0, 0]) {
	translate(pos) {
		cylinder(r = R(FrameBoltD), h = PanelZ + 1, center = true, $fn = 50);
	}
}

module bolt_void (pos = [0, 0, 0], H = StepperMountZ + 1) {
	translate(pos) {
		cylinder(r = R(3.5), h = H, center = true, $fn = 30);
	}
}

module cap_void (pos = [0, 0, 0], cap = 20) {
	translate(pos) {
		cylinder(r = R(6.25), h = cap, center = true, $fn = 30);
	}
}

module bolt_and_cap_void (pos = [0, 0, 0], cap = 10, bolt = 10) {
	translate(pos) {
		cylinder(r = R(6.25), h = cap, center = true, $fn = 30);
		translate([0, 0, -(cap / 2) - (bolt / 2)]) cylinder(r = R(3.5), h = bolt, center = true, $fn = 30);
	}
}

module panel_cap_group_voids (pos = [0, 0, 0]) {
	BoltX = NEMA17BoltSpacing / 2;
	BoltY = NEMA17BoltSpacing / 2;
	translate(pos) {
		cap_void([BoltX, BoltY, 0]);
		cap_void([-BoltX, BoltY, 0]);
		cap_void([BoltX, -BoltY, 0]);
		cap_void([-BoltX, -BoltY, 0]);
	}
}

module panel_cap_voids (pos = [0, 0, 0]) {
	translate(pos) {
		panel_cap_group_voids([0, KeyDistance / 2, 0]);
		panel_cap_group_voids([0, -KeyDistance / 2, 0]);
	}
}

module LED_void (pos = [0, 0, 0], rot = [0, 0, 0], flip = false) {
	LEDVoidD = 5;
	LightVoidD = 2.5;
	translate(pos) rotate(rot) {
		rotate([0, 90, 0]) {
			cylinder(r = R(LightVoidD), h = 80, center = true, $fn = 40);
			if (flip) {
				translate([0, 0, -37.5]) cylinder(r = R(LEDVoidD), h = 80, center = true, $fn = 40);
				translate([0, 0, 65]) cylinder(r = R(LEDVoidD), h = 80, center = true, $fn = 40);
			} else {
				translate([0, 0, 37.5]) cylinder(r = R(LEDVoidD), h = 80, center = true, $fn = 40);
				translate([0, 0, -65]) cylinder(r = R(LEDVoidD), h = 80, center = true, $fn = 40);
			}
		}
	}
}

module LED_prop (pos = [0, 0, 0], rot = [0, 0, 0], H = 15, flip = false) {
	translate(pos) rotate(rot) {
		if (flip) {
			translate([-13, 0, 0]) cube([40, 7, H], center = true);
		} else {
			translate([13, 0, 0]) cube([40, 7, H], center = true);
		}
	}
}

module LED (pos = [0, 0, 0], rot = [0, 0, 0]) {
    $fn = 90;
    D = LEDD;
    H = LEDH;
    translate(pos) rotate(rot) {
        cylinder(r = (D / 2), h = H - (D / 2), center = true);
        translate([0, 0, (H / 2) - (D / 4)]) sphere(r = D / 2);
        translate([0, 0, -(H / 2) + (D / 4) + (1 / 2)]) difference () {
            cylinder(r = (6 / 2), h = 1, center = true);
            translate([5.5, 0, 0]) cube([6, 6, 1 + 1], center = true);
        }
        translate([-LEDPinSpacing / 2, 0, -(29.5 / 2) - (H / 2) + 2]) cube([LEDPin, LEDPin, 29.5], center = true);
        translate([LEDPinSpacing / 2, 0, -(27 / 2) - (H / 2) + 2]) cube([LEDPin, LEDPin, 27], center = true);
    }
}

module LED_housing (pos = [0, 0, 0], rot = [0, 0, 0]) {
    $fn = 90;
    D = LEDD + 0.2;
    H = LEDH;
    Opening = 3;
    translate(pos) rotate(rot) {
        difference () {
            union() {
                cube([D + 3, D + 3, 10], center = true);
                translate([0, 0, -4]) cube([D + 3, D + 3, 10], center = true);
                translate([0, 5, -6]) cube([D + 3, 15, 6], center = true);
            }
            translate([0, 0, -(10 / 2) + (H / 2) - 1.301]) union () {
                cylinder(r = (D / 2), h = H - (D / 2), center = true);
                translate([0, 0, (H / 2) - (D / 4)]) sphere(r = D / 2);
            }
            cylinder(r = (Opening / 2), h = 10 + 1, center = true);
            translate([0, 0, -7]) cylinder(r = (6.02 / 2), h = 4.01, center = true);
            translate([0, 7.5, -8]) difference () {
                cube([6.02, 15, 3], center = true);
                cube([1.5, 15 + 1, 3 + 1], center = true);
            }
        }
    }
}

module nub_void (pos = [0, 0, 0]) {
	translate(pos) {
		translate([NubVoidX / 2, 0, 0]) cylinder(r = R(NubVoidD), h = PanelZ + 1, center = true, $fn = 50);
		translate([-NubVoidX / 2, 0, 0]) cylinder(r = R(NubVoidD), h = PanelZ + 1, center = true, $fn = 50);
		cube([NubVoidX, NubVoidD, PanelZ + 1], center = true);
	}
}

module stepper_mount_block (pos = [0, 0, 0]) {
	BoltX = NEMA17BoltSpacing / 2;
	BoltY = NEMA17BoltSpacing / 2;
	H = 30;
	InnerD = 30;

	translate(pos) {
		difference () {
			union () {
				translate([0, 0, -5]) cube([NEMA17OuterWidth, NEMA17OuterWidth, H], center = true);
				LED_prop([0, 19, -4.5 + 7.5], [0, 0, 45], flip = true);
				LED_prop([0, -19, -4.5 + 10.5], [0, 0, 45], H = 9, flip = false);
			}
			//corners
			for (i = [0 : 3]) {
				translate([0, 0, -5]) rotate([0, 0, (i * 90) + 45]) translate([29.7, 0, 0]) cube([5.5, 5.5, H + 1], center = true);
			}
			translate([0, 0, -5])cylinder(r = R(InnerD), h = H + 1, center = true, $fn = 120);
			bolt_void([BoltX, BoltY, -5], H);
			bolt_void([-BoltX, BoltY, -5], H);
			bolt_void([BoltX, -BoltY, -5], H);
			bolt_void([-BoltX, -BoltY, -5], H);

			bolt_and_cap_void([BoltX, BoltY, 10], H, H);
			bolt_and_cap_void([-BoltX, BoltY, 10], H, H);
			bolt_and_cap_void([BoltX, -BoltY, 10], H, H);
			bolt_and_cap_void([-BoltX, -BoltY, 10], H, H);
			//
			LED_void([0, 17.25, -4.5], [0, 0, 45]);
			LED_void([0, -17.25, 1.5], [0, 0, 45], true);
		}
	}
}

module stepper_mount (pos = [0, 0, 0]) {
	//NEMA17BoltSpacing = 31;
	translate(pos) {
		stepper_mount_block([0, KeyDistance / 2, 0]);
		stepper_mount_block([0, -KeyDistance / 2, 0]);
	}
}

module octagon(size, height) {
	intersection() {
		cube([size, size, height], true);
		rotate([0,0,45]) {
			cube([size, size, height], true);
		}
	}
}

module octagon_void (pos = [0, 0, 0], D = 25, H = 5.01) {
	translate(pos) {
		difference () {
			cylinder(r = R(D + 10), h = H, center = true);
			octagon(D, H + 1);
		}
	}
}

module gate_bolt_and_nut_void (pos = [0, 0, 0]) {
	translate(pos) {
		cylinder(r = R(5), h = PanelZ + 1, center = true, $fn = 40);
	}
}

module gate_key_set_screw_void (pos = [0, 0, 0]) {
	translate(pos) {
		rotate([90, 0, 0]) rotate([0, 0, 30]) m3_nut(2.5);
		translate([0, 0, -10]) cube([5.7, 2.5, 20], center = true);
		rotate([90, 0, 0]) cylinder(r = R(3.25), h = 10, center = true, $fn = 30); 
		translate([0, 7.5, 0])rotate([90, 0, 0]) cylinder(r = R(6), h = 10, center = true, $fn = 30); 
	}
}

module gate_key (pos = [0, 0, 0], rot = [0, 0, 0]) {
	Extension = 8.75;
	KeyZ =  (13 / 2) + (10 / 2) + 6;
	OctoVoidX = 12;
	OctoVoidZ = 2.0;
	translate(pos) rotate(rot) {
		difference () {
			union () {
				translate([0, 0, -Extension / 2]) cylinder(r = R(29), h = 12 + Extension, center = true, $fn = 120);
				translate([0, 0, 1]) cylinder(r = R(11), h = 12, center = true, $fn = 60);
				translate([0, 0, (13 / 2) + (10 / 2)]) {
                    cylinder(r = R(BearingInnerDiameter - 0.3), h = 10, center = true, $fn = 60);
                }
			}
			translate([0, 0, -3]) scale([1.07, 1.07, 1]) {
                NEMA17_motor_shaft([0, 0, -5]);
            }
			//octagon_void([0, 0, 3.5]);
			translate([0, 0, OctoVoidZ]) {
				for (i = [0 : 7]) {
					rotate([0, 0, i * (360 / 8)]) {
						translate([OctoVoidX, 0, 0]) rotate([0, 45, 0]) cube([2, 35, 2], center = true);
						//translate([OctoVoidX, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(2), h = 35, center = true, $fn = 30);
					}
				}
			}
			//normalization flat
			translate([0, 27, -3.5 - (Extension / 2)]) cube([29, 29, 10 + Extension + 1], center = true);
			//key
			rotate ([0, 0, 45]) {
				translate([0,  (10 / 2) + (KeyWidth / 2), KeyZ]) cube([10, 10, 10], center = true);
				translate([0, -(10 / 2) - (KeyWidth / 2), KeyZ]) cube([10, 10, 10], center = true);
			}
			translate([0, 0, KeyZ]) difference () {
				cylinder(r = R(BearingInnerDiameter + 1), h = 10, center = true, $fn = 60);
				cylinder(r = R(BearingInnerDiameter - 1), h = 10, center = true, $fn = 60);
			}
			gate_key_set_screw_void([0, 6, -2.5]);
			gate_key_set_screw_void([0, 6, -10]);
		}
		/*translate([0, 0, 3]) {
			for (i = [0 : 7]) {
				rotate([0, 0, i * (360 / 8)]) {
					translate([OctoVoidX, 0, 0]) rotate([0, 45, 0]) cube([2, 35, 2], center = true);
					//translate([OctoVoidX, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(2), h = 35, center = true, $fn = 30);
				}
			}
		}*/
	}
}

module panel (pos = [0, 0, 0], rot = [0, 0, 0]) {
	translate(pos) rotate(rot) {
		difference () {
			union () {
				cube([PanelX, PanelY, PanelZ], center = true);
				translate([0, KeyDistance / 2, -(10 / 2) + (PanelZ / 2)]) cylinder(r = R(31), h = 10, center = true, $fn = 90);
				translate([0, -KeyDistance / 2, -(10 / 2) + (PanelZ / 2)]) cylinder(r = R(31), h = 10, center = true, $fn = 90);;
			}
			//front bolts
			front_bolt_void([FrameBoltX, FrameBoltY, 0]);
			front_bolt_void([FrameBoltX, -FrameBoltY, 0]);
			//key + bearing voids
			bearing_void([0, KeyDistance / 2, (PanelZ / 2) - (8 / 2) - 2], 8.01);
			bearing_void([0, -KeyDistance / 2, (PanelZ / 2) - (8 / 2) - 2], 8.01);

			key_void([0, KeyDistance / 2, 0]);
			key_void([0, -KeyDistance / 2, 0]);

			panel_cap_voids([0, 0, -1]);

			//
			gate_bolt_and_nut_void([GateBoltX, GateBoltY, 0]);
			gate_bolt_and_nut_void([GateBoltX, -GateBoltY, 0]);

			//
			nub_void([NubX, 0, 0]);
		}
		stepper_mount([0, 0, -(StepperMountZ / 2) - (PanelZ / 2)]);
	}
}

module projector () {
	
}

module debug () {
	//panel();
	//NEMA17([0, KeyDistance / 2, -50]);
	NEMA17([0, -KeyDistance / 2, -50]);
	//gate_key([0, KeyDistance / 2, -14], [0, 0, 45]);
	//gate_key([0, -KeyDistance / 2, -14], [0, 0, 45]);
	
    difference () {
		union () {
	        intersection () {
	            panel();
	            translate([0, -50, 0]) cube([60, 100, 150], center = true);
	        }
	        gate_key([0, -KeyDistance / 2, -13.5], [0, 0, 0]);
	    }
		translate([50, 0, 0]) rotate([0, 0, 45]) cube([100, 250, 150], center = true);
	}
    
}

PART = "gate_key";

if (PART == "gate_key") {
	gate_key();
} else if (PART == "panel") {
	rotate([180, 0, 0]) panel();
} else {
    debug();
}
