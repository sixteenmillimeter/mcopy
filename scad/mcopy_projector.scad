include <./common/common.scad>;
include <./common/motors.scad>;
include <./common/2020_tslot.scad>;
include <./rack_and_pinion.scad>;

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
KeyWidth = 2.5; //2.25;

StepperMountZ = 20;
StepperMountInnerD = 30;

GateBoltX = (-PanelX / 2) + 54;
GateBoltY = 105 / 2;

NubVoidD = 5.5;
NubVoidX = 7.5;
NubX = (-PanelX / 2) + 66;

LEDD = 5.0;
LEDPin = 0.6;
LEDPinSpacing = 2.54;
LEDH = 8.6;

ServoX = 55;
ServoY = 7 + 2;
ServoZ = 20;
ServoBoltD = 3.5;
ServoSpaceZ = 9.5;
ServoSpaceX = 48;
ServoVoidX = 40.5;

module bearing_void (pos = [0, 0, 0], width= 8) {
	fuzz = 0.3;
	translate (pos) {
		difference () {
			cylinder(r = R(BearingOuterDiameter) + fuzz, h = width, center = true, $fn = 90);
		}
	}
}

module bearing_debug (pos = [0, 0, 0]) {
	$fn = 60;
	translate(pos) difference() {
		cylinder(r = R(21.5), h = 7, center = true);
		cylinder(r = R(8), h = 7, center = true);
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

module bolt_and_cap_void (pos = [0, 0, 0], rot = [0, 0, 0], cap = 10, bolt = 10, pad = 0) {
	translate(pos) rotate(rot) {
		cylinder(r = R(6.25) + pad, h = cap, center = true, $fn = 30);
		translate([0, 0, -(cap / 2) - (bolt / 2) + 0.1]) cylinder(r = R(3.5) + pad, h = bolt, center = true, $fn = 30);
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
	LightVoidD = 3;
    EmitterZ = 39.5;
    ReceiverZ = 65;
	translate(pos) rotate(rot) {
		rotate([0, -90, 0]) {
			cylinder(r = R(LightVoidD), h = 80, center = true, $fn = 40);
            /*
			if (flip) {
				translate([0, 0, -EmitterZ]) cylinder(r = R(LEDVoidD), h = 80, center = true, $fn = 40);
				translate([0, 0, ReceiverZ]) cylinder(r = R(LEDVoidD), h = 80, center = true, $fn = 40);
			} else {
				translate([0, 0, EmitterZ]) cylinder(r = R(LEDVoidD), h = 80, center = true, $fn = 40);
				translate([0, 0, -ReceiverZ]) cylinder(r = R(LEDVoidD), h = 80, center = true, $fn = 40);
			}
            */
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

module LED_housing (pos = [0, 0, 0], rot = [0, 0, 0], OffsetZ = 0, Void = true) {
    $fn = 90;
    D = LEDD + 0.2;
    H = LEDH;
    Opening = 3;
    //LED_housing([0, -17.25, -4.5], [90, -90, 134], Void = true);
    translate(pos) rotate(rot) {
        translate([0, 0, OffsetZ]) {
            difference () {
                union() {
                    cube([D + 3, D + 3, 10], center = true);
                    translate([0, 0, -4]) cube([D + 3, D + 3, 10], center = true);
                    translate([0, 5, -6]) cube([D + 3, 15, 6], center = true);
                }
                translate([0, 14, -9]) rotate([45, 0, 0]) cube([20, 15, 10], center = true);
                if (Void) {
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
                translate([0, -12.5, 12.25]) rotate([0, 90, 0]) cylinder(r = R(StepperMountInnerD + 1), h = 50 + 1, center = true, $fn = 120);
            }
        }
    }
}

module LED_enclosure (pos = [0, 0, 0], rot = [0, 0, 0]) {
	translate(pos) rotate(rot) {
		difference () {
			translate([9, -9, 0]) cube([50, 50, 20], center = true);
			translate([0, 0, 3]) difference () {
				cube([63, 63, 20 + 1], center = true);
				translate([-77, 0, 0]) rotate([0, 0, 45]) cube([63, 163, 20 + 1 + 1], center = true);
				translate([0, 77, 0]) rotate([0, 0, 45]) cube([63, 163, 20 + 1 + 1], center = true);
				translate([48, -48, 0]) rotate([0, 0, 45]) cube([63, 63, 20 + 1 + 1], center = true);
			}
			translate([50, -50, 0]) rotate([0, 0, 45]) cube([63, 63, 20 + 1 + 1], center = true);
			translate([44, -44, 0]) rotate([0, 45, 45]) cube([6, 63, 6], center = true);
			scale([1.01, 1.01, 1]) stepper_mount_block_positive(H = 20 + 1);
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

module nub_rails (pos = [0, 0, 0]) {
    translate(pos) {
        translate([0, 6, 0]) cube([30, 3, 5], center = true);
        translate([0, -6, 0]) cube([30, 3, 5], center = true);
    }
}

module stepper_mount_block_positive (pos = [0, 0, 0], H) {
    translate(pos) difference() {
        cube([NEMA17OuterWidth, NEMA17OuterWidth, H], center = true);
    	//corners
        for (i = [0 : 3]) {
            rotate([0, 0, (i * 90) + 45]) translate([29.7, 0, 0]) cube([5.5, 5.5, H + 1], center = true);
        }
    }
}

module stepper_mount_block (pos = [0, 0, 0], rot = [0, 0, 0]) {
	BoltX = NEMA17BoltSpacing / 2;
	BoltY = NEMA17BoltSpacing / 2;
    BoltCapZ = 11;
	H = 30;

	translate(pos) rotate(rot) {
		difference () {
			union () {
				stepper_mount_block_positive([0, 0, -5], H);
                //top
				//LED_prop([0, -19, -4.5 + 7.5], [0, 0, 45], flip = false);
                //bottom
				//LED_prop([0, -19, -4.5 + 11.5], [0, 0, 45], H = 9, flip = false);
			}

			translate([0, 0, -5]) cylinder(r = R(StepperMountInnerD), h = H + 1, center = true, $fn = 120);
			
            LED_housing([0, -17.25, -4.5], [90, -90, 134], Void = false);
            LED_housing([0, -17.25, -4.5], [-90, 90, 134], OffsetZ = -24.25, Void = false);
              
            
            bolt_void([BoltX, BoltY, -5], H);
			bolt_void([-BoltX, BoltY, -5], H);
			bolt_void([BoltX, -BoltY, -5], H);
			bolt_void([-BoltX, -BoltY, -5], H);

			bolt_and_cap_void([BoltX, BoltY, BoltCapZ], cap = H, bolt = H);
			bolt_and_cap_void([-BoltX, BoltY, BoltCapZ], cap = H, bolt = H);
			bolt_and_cap_void([BoltX, -BoltY, BoltCapZ], cap = H, bolt = H);
			bolt_and_cap_void([-BoltX, -BoltY, BoltCapZ], cap = H, bolt =H);
			//top
			LED_void([0, -17.25, -4.5], [0, 0, 45]);
            //bottom
			//LED_void([0, -17.25, 2.5], [0, 0, 45], true);
		}
	}
}

module stepper_mount (pos = [0, 0, 0]) {
	//NEMA17BoltSpacing = 31;
	translate(pos) {
		stepper_mount_block([0, KeyDistance / 2, 0], [0, 0, 90]);
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

module circular_void (pos = [0, 0, 0], rot = [0, 0, 0], D = 25, H = 5.01) {
    Fin = 2;
    translate(pos) rotate([rot[0], rot[1], rot[2] + (3 * (360 / 8)) ]) {
		difference () {
			cylinder(r = R(D + 10), h = H, center = true);
            //difference () {
                cylinder(r = R(D), h = H + 1, center = true, $fn = 120);
                for (i = [0: 6]) {
                    rotate([0, 0, i * (360 / 8)]) translate([15 / 2, 0, 0]) cube([15, Fin, H + 1 + 1], center = true);
                }
            //}
		}
	}
}

module gate_bolt_and_nut_void (pos = [0, 0, 0], Bolt = "m5") {
	translate(pos) {
		cylinder(r = R(5.2), h = PanelZ + 1, center = true, $fn = 40);
        if (Bolt == "m5") {
        	translate([0, 0, -1.5]) hex(9.2, 4.5);
    	} else if (Bolt == "#10-24") {
    		translate([0, 0, -1.5]) hex(10.6, 3.5);
    	}
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

module gate_key (pos = [0, 0, 0], rot = [0, 0, 0], KeyRot = 0) {
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
			//octagon_void([0, 0, 3.5], D = 23.5);
            //circular_void([0, 0, 3.5], D = 22);
			/*translate([0, 0, OctoVoidZ]) {
				for (i = [0 : 7]) {
					rotate([0, 0, i * (360 / 8)]) {
						translate([OctoVoidX, 0, 0]) rotate([0, 45, 0]) cube([2, 35, 2], center = true);
						//translate([OctoVoidX, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(2), h = 35, center = true, $fn = 30);
					}
				}
			}*/
            
			//registration flat
			translate([0, 25, -3.5 - (Extension / 2)]) cube([29, 29, 20 + Extension + 1], center = true);
			//key
			rotate ([0, 0, 45 + KeyRot]) {
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
	}
}

echo("panel");
echo("BOM: ", "(8) M3x20mm");
echo("BOM: ", "(5) M3x15mm");
echo("BOM: ", "(1) M3 nut");
echo("BOM: ", "(2) #10-24 nut");
module panel (pos = [0, 0, 0], rot = [0, 0, 0], Mounts = "2020", Bolts = "#10-24") {
	RegistrationBoltsX = -52;
    RegistrationBoltsY = 15;
    MountBoltsX = (-PanelX / 2) + 10;
	translate(pos) rotate(rot) {
		difference () {
			union () {
				cube([PanelX, PanelY, PanelZ], center = true);
				translate([0, KeyDistance / 2, -(10 / 2) + (PanelZ / 2)]) cylinder(r = R(31), h = 10, center = true, $fn = 90);
				translate([0, -KeyDistance / 2, -(10 / 2) + (PanelZ / 2)]) cylinder(r = R(31), h = 10, center = true, $fn = 90);;
			}
            if (Mounts == "JK") {
                //front bolts
                front_bolt_void([FrameBoltX, FrameBoltY, 0]);
                front_bolt_void([FrameBoltX, -FrameBoltY, 0]);
            } else if (Mounts == "2020") {
                bolt_and_cap_void([MountBoltsX, 0, 4.5]);
                bolt_and_cap_void([MountBoltsX, (PanelY / 2) - 10, 4.5]);
                bolt_and_cap_void([MountBoltsX, (-PanelY / 2) + 10, 4.5]);
            
                bolt_and_cap_void([RegistrationBoltsX, RegistrationBoltsY, -1.15], [0, -90, 0], pad = -0.3);
        		bolt_and_cap_void([RegistrationBoltsX, -RegistrationBoltsY, -1.15], [0, -90, 0], pad = -0.3);
            }
            //registration line
            translate([-50, 0, 3]) rotate([45, 0, 0]) cube([20, 1, 1], center = true);

			//key + bearing voids
			bearing_void([0, KeyDistance / 2, (PanelZ / 2) - (8 / 2) - 2], 8.01);
			bearing_void([0, -KeyDistance / 2, (PanelZ / 2) - (8 / 2) - 2], 8.01);

			key_void([0, KeyDistance / 2, 0]);
			key_void([0, -KeyDistance / 2, 0]);

			panel_cap_voids([0, 0, -1]);

			//
			gate_bolt_and_nut_void([GateBoltX, GateBoltY, 0], Bolt = "#10-24");
			gate_bolt_and_nut_void([GateBoltX, -GateBoltY, 0], Bolt = "#10-24");

			//
			nub_void([NubX, 0, 0]);
		}
        
        nub_rails([28.25, 0, -5]);
        servo_mount([33, 9, -45], [0, 90, 0]);
        
        difference () {
            stepper_mount([0, 0, -(StepperMountZ / 2) - (PanelZ / 2)]);
            translate([GateBoltX, GateBoltY, -20]) hex(10.6, 50);
            translate([GateBoltX, -GateBoltY, -20]) hex(10.6, 50);
        }
        //color("red") cube([30, 8.8, 10], center = true);
	}
}

echo("orbital_mount");
echo("BOM: ", "(2) M3x12mm");
echo("BOM: ", "(2) M3x7mm");
echo("BOM: ", "(2) T-Slot Nut");
echo("BOM: ", "(1) 2020 Extrusion x ", PanelY, "mm");
module orbital_mount (pos = [0, 0, 0], rot = [0, 0, 0]) {
    OuterD = 136;
    InnerD = 126;
    VoidD = 96;
    BottomZ = 5;
    TopZ = 6;
    Notch = 0.5;
    Notches = 60;

    ExtrusionBoltsX = 53;
    ExtrusionBoltsY = 25;

    RegistrationBoltsX = 41;
    RegistrationBoltsY = 15;
    $fn = 300;
    translate(pos) rotate(rot) {
		difference () {
            cylinder(r = R(OuterD), h = BottomZ + TopZ, center = true);
            difference () {
            	cylinder(r = R(VoidD), h = BottomZ + TopZ + 1, center = true);
        		translate([105, 0, 0]) cube([OuterD, OuterD, BottomZ + TopZ + 1 + 1], center = true);
        	}
            translate([0, 0, BottomZ - (TopZ / 2) + 0.51]) difference () {
                cylinder(r = R(OuterD) + 1, h = TopZ, center = true);
                cylinder(r = R(InnerD), h = TopZ + 1, center = true);
            }
            for (i = [0 : Notches - 1]) {
                rotate([0, 0, i * (360 / Notches)]) translate([OuterD / 2, 0, 0]) rotate([0, 0, 45]) cube([Notch, Notch, BottomZ + TopZ + 1], center = true); 
            }
            for (i = [0 : 3]) {
                rotate([0, 0, i * (360 / 4)]) translate([OuterD / 2, 0, 0]) rotate([0, 0, 45]) cube([1, 1, BottomZ + TopZ + 1], center = true); 
            }
            bolt_and_cap_void([ExtrusionBoltsX, ExtrusionBoltsY, -4], [180, 0, 0]);
            bolt_and_cap_void([ExtrusionBoltsX, -ExtrusionBoltsY, -4], [180, 0, 0]);
            bolt_and_cap_void([RegistrationBoltsX, RegistrationBoltsY, -4], [180, 0, 0]);
        	bolt_and_cap_void([RegistrationBoltsX, -RegistrationBoltsY, -4], [180, 0, 0]);
        	//registration line
        	translate([37, 0, 0]) rotate([0, 0, 45]) cube([1, 1, 20], center = true);
        }

    }
}

module servo_mount_bolt_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate (pos) rotate (rot) {
        cylinder(r = ServoBoltD / 2, h = ServoY + 1, center = true, $fn = 60);
    }
}

module servo_mount_bolts_void () {
	X = ServoSpaceX / 2;
	Z = ServoSpaceZ / 2;
	translate([ X, 0,  Z]) rotate([90, 90, 0]) cylinder(r = R(ServoBoltD), h = ServoY + 1, center = true, $fn = 60);
    translate([-X, 0,  Z]) rotate([90, 90, 0]) cylinder(r = R(ServoBoltD), h = ServoY + 1, center = true, $fn = 60);
    translate([ X, 0, -Z]) rotate([90, 90, 0]) cylinder(r = R(ServoBoltD), h = ServoY + 1, center = true, $fn = 60);
    translate([-X, 0, -Z]) rotate([90, 90, 0]) cylinder(r = R(ServoBoltD), h = ServoY + 1, center = true, $fn = 60);

    translate([-X, -6, -Z]) rotate([90, 90, 0]) cylinder(r = R(6), h = 10, center = true, $fn = 60);
    translate([-X, -6,  Z]) rotate([90, 90, 0]) cylinder(r = R(6), h = 10, center = true, $fn = 60);
}

module servo_mount_void () {
    cube([ServoVoidX, ServoY, ServoZ + 1], center = true);
    translate([0, ServoY - 1, 0]) cube([ServoX + 1, ServoY, 1], center = true);
    servo_mount_bolts_void();
}

//MG995
module servo_mount (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate (pos) rotate (rot) {
        difference () {
            union () {
                translate([1.5, 0, 0]) rotate([90, 0, 0]) {
                	rounded_cube([ServoX + 3, ServoZ+10, ServoY ], d = 4, center = true, $fn = 40);
                }
                difference () {
                    translate([-34, 0, 0]) cube([17, ServoY, ServoZ + 10 ], center = true, $fn = 40);
                    translate([-19, 0, 0]) cube([17, ServoY + 1, 20 ], center = true, $fn = 40);
                }
            }
            servo_mount_void();
            
            //angled void for motor
            translate([25.5, 6.5, -15]) rotate([45, 0, 0]) cube([ServoX+20, 10, 10], center = true);

            //cut off end
            translate([0, 0, 15.4]) cube([ServoX+30, 10, 10], center = true);
            //cut off top
            translate([30, 0, 0]) cube([20, 10, 40], center = true);
            bolt_and_cap_void([-35, 0, 20], [0, 0, 0], bolt = 15);
            translate([-35, 0, 6]) m3_nut(2.5);
        	translate([-35, 5, 6]) cube([6.75, 10, 2.5], center = true);
        	//panel bolt void
        	translate([-40, 4.5, -17]) rotate([0, 90, 0]) cylinder(r = R(7), h = 25, center = true);
        }

    }
    //debug
    //translate([(55 / 2)-17.5, 0, 0]) sphere(r = 6 / 2, $fn = 60);
}

module servo_mount_cover (pos = [0, 0, 0], rot = [0, 0, 0]) {
	translate (pos) rotate (rot) {
        difference () {
            union () {
                translate([1.5, 0, -1.5]) rotate([90, 0, 0]) rounded_cube([ServoX + 3, ServoZ + 10 + 3, ServoY ], d = 4, center = true, $fn = 40);
                difference () {
                    translate([-34, 0, 0]) cube([17, ServoY, ServoZ + 10 ], center = true, $fn = 40);
                    translate([-19, 0, 0]) cube([17, ServoY + 1, 20 ], center = true, $fn = 40);
                }
                difference () {
                	translate([1.5, -3, -1.5]) rotate([90, 0, 0]) rounded_cube([ServoX + 3, ServoZ + 10 + 3, ServoY ], d = 4, center = true, $fn = 40);
                	translate([-13.25, -3, 0]) cube([ServoX + 3 + 1, ServoY + 1, ServoZ + 10 + 7], center = true);
                	translate([0, -3, 5]) cube([ServoX + 3 + 5, ServoY + 1, ServoZ + 10], center = true);
                }
            }
            servo_mount_void();
            servo_mount();
            translate([-22.25 - 4, 0, -15.4]) cube([ServoX+30, 10, 10], center = true);
        	
        	bolt_and_cap_void([-35, 0, 20], [0, 0, 0]);
        	translate([-35, 0, 0]) cube([20, 20, 20], center = true);
        	translate([-51, 0, 10]) cube([20, 20, 20], center = true);
        }
	}
}

module servo_gear (pos = [0, 0, 0], rot = [0, 0, 0]) {
	InsertD = 20.4;
	InsertZ = 5;
	BoltSpacing = 14;
	translate(pos) rotate(rot) {
		difference () {
			union () {
				translate([0, -32, -4.4]) rad_und_zahnstange(modul, laenge_stange, zahnzahl_ritzel, hoehe_stange, bohrung_ritzel, breite, eingriffswinkel, schraegungswinkel, zusammen_gebaut, optimiert);
				cylinder(r = R(28), h = 8.8, center = true, $fn = 50);
			}
			translate([0, 0, (8.8 / 2) - InsertZ - (2.5/2) + 0.02]) cylinder(r = R(9.2), h = 2.5, center = true);
			cylinder(r = R(5.9), h = 40, center = true);
			bolt_and_cap_void([0, BoltSpacing / 2, 10], pad = -0.3);
			bolt_and_cap_void([0, -BoltSpacing / 2, 10], pad = -0.3);
			bolt_and_cap_void([BoltSpacing / 2, 0, 10], pad = -0.3);
			bolt_and_cap_void([-BoltSpacing / 2, 0, 10], pad = -0.3);
			translate([0, 0, (8.8 / 2) - (InsertZ / 2) + 0.01]) cylinder(r = R(InsertD), h = InsertZ, center = true);
		}
		//cylinder(r = R(1), h = 20, center = true);
	}
}

module nub_rack (pos = [0, 0, 0], rot = [0, 0, 0]) {
	H = 9.25 + 2.4;
	Len = 50;
	translate(pos) rotate(rot) {
		difference () {
			union () {
				translate([21.5, 4, -8.8 / 2]) zahnstange_und_rad(modul, laenge_stange, zahnzahl_ritzel, hoehe_stange, bohrung_ritzel, breite, eingriffswinkel, schraegungswinkel, zusammen_gebaut, optimiert);
				translate([Len / 2, -H / 2, 0]) cube([Len, H, 8.8], center = true);
				translate([(Len / 2) - 1.5, -H - (11 / 2) + 0.1, 0]) {
					rotate([90, 0, 0]) cylinder(r = R(4.75), h = 11, center = true, $fn = 60);
				}
			}
			//slot for bolt
			//translate([Len / 2, 2, 8.8 - 1.5]) cube([Len + 1, H, 8.8], center = true);
		}
	}
}

module debug () {
	//panel();
	//NEMA17([0, KeyDistance / 2, -50]);
	//NEMA17([0, -KeyDistance / 2, -50]);
	//gate_key([0, KeyDistance / 2, -14], [0, 0, -90 + 45], KeyRot=90);
	//gate_key([0, -KeyDistance / 2, -14], [0, 0, 180 + 45 ]);
    /*translate([0, -KeyDistance / 2, 0]) {
        color("blue") LED_housing([0, -17.25, -4.5 - 13], [90, -90, 134], Void = true);
        color("green") LED_housing([0, -17.25, -4.5 - 13], [-90, 90, 134], OffsetZ = -24.25, Void = true);
    	LED_enclosure([0, 0, -15]);
    }*/
    /*translate([0, KeyDistance / 2, 0]) {
        color("blue") LED_housing([0, -17.25, -4.5 - 13], [90, -90, 134], Void = true);
        color("green") LED_housing([0, -17.25, -4.5 - 13], [-90, 90, 134], OffsetZ = -24.25, Void = true);
    }*/
	
    difference () {
		union () {
	        intersection () {
	            panel();
                //one mount
	            //translate([0, -50, 0]) cube([60, 100, 150], center = true);
                //servo mount
                //translate([35, 5, 0]) cube([60, 25, 150], center = true);
	        	//bolt sizing
	        	translate([GateBoltX, GateBoltY, 0]) cube([20, 20, 20], center = true);
	        }
	    }
		//translate([50, 0, 0]) rotate([0, 0, 45]) cube([100, 250, 150], center = true);
    	//translate([0, 0, -82.5 - 10]) cube([100, 250, 150], center = true);
	}
    //color("red") translate([(-PanelX / 2) + 10, 0, (-PanelZ / 2) -10]) rotate([90, 0, 0]) 2020_tslot(PanelY);
    //orbital_mount([(-PanelX / 2) - 4.5, 0, 40], [0, 90, 0]);
    //servo_mount_cover([33, 8+10, -45], [0, 90, 0]);
    //color([0.5,0.5,0,0.8]) servo_gear([33, 0, -32.5 + 7.75 - 10], [90, 0, 0]);
    //nub_rack([-6, 0, -15], [-90, 0, 0]);
}

PART = "orbital_mount";

if (PART == "gate_key") {
	gate_key(KeyRot = 0);
} else if (PART == "panel") {
	rotate([180, 0, 0]) panel();
} else if (PART == "servo_mount_cover"){
	servo_mount_cover([0, 0, 0], [0, 90, 0]);
} else if (PART == "servo_gear") {
	servo_gear();
} else if (PART == "led_housing"){
    LED_housing();
} else if (PART == "led_enclosure"){
    LED_enclosure();
} else if (PART == "orbital_mount") {
    orbital_mount();
} else if (PART == "nub_rack") {
	nub_rack();
} else {
    debug();
}
