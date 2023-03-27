/*
	Amphenol CPC 9pin Connectors
*/

include <./common/common.scad>;

PART="cpc_9pin_socket";

FN = 120;

PlugD = 15.75;
PlugH = 11.65;
PlugGuideD = 17;
PlugPinD = 3.1;

PlugGuideRetraction = 1.25;

PinSpacing = 3.85;

SocketD = PlugD + 0.4;
SocketGuideD = PlugGuideD + 0.5;

SocketOuterD = 20;
SocketH = 10.5;

CollarD = 22;

GuideAngles = [0,   100, 140, 215, 260];
GuideWidths = [3.2, 1.5, 1.5, 1.5, 1.5];

function arc_angle (D, W) = W / ((PI/180) * (D/2));

module guide (Diameter, Height, Angle, Width) {
	A = arc_angle(Diameter, Width);
	echo(A);
	rotate([0, 0, Angle]) difference () {
		cylinder(r = R(Diameter), h = Height, center = true, $fn = FN);
		rotate([0, 0, -A/2]) translate([Diameter / 2, 0, 0])  cube([Diameter, Diameter * 2, Height + 1], center = true);
		rotate([0, 0, A/2]) translate([-Diameter / 2, 0, 0])  cube([Diameter, Diameter * 2, Height + 1], center = true);
	}
}

module plug_pin (X, Y, H) {
	translate([X, Y, 0]) {
		cylinder(r = R(PlugPinD), h = H, center = true, $fn = 40);
	}
}

module m3_bolt_void (pos = [0, 0, 0], H = 1) {
	D = 3.25;
	translate(pos) {
		cylinder(r = R(D), h = H, center = true, $fn = 40);
	}
}

module plug_pin_voids (PinH) {
	plug_pin(0, 0, PinH);                     //5
	plug_pin(PinSpacing, 0, PinH);            //4
	plug_pin(-PinSpacing, 0, PinH);           //6
	plug_pin(0, PinSpacing, PinH);            //2
	plug_pin(0, -PinSpacing, PinH);           //8
	plug_pin(PinSpacing, PinSpacing, PinH);   //1
	plug_pin(-PinSpacing, PinSpacing, PinH);  //3
	plug_pin(-PinSpacing, -PinSpacing, PinH); //9
	plug_pin(PinSpacing, -PinSpacing, PinH);  //7
}

module cpc_9pin_plug () {
	$fn = FN;
	PinH = PlugH + 1;
	difference () {
		union () {
			cylinder(r = R(PlugD), h = PlugH, center = true);
			translate([0, 0, -(PlugH/2)+(2/2)]) cylinder(r = R(PlugD + 2), h = 2, center = true);
			translate([0, 0, -PlugGuideRetraction/2]) {
				for (i = [0 : len(GuideAngles) - 1]) {
					guide(PlugGuideD, PlugH - PlugGuideRetraction, GuideAngles[i], GuideWidths[i]);
				}
			}
		}
		plug_pin_voids(PinH);
	}

}

module cpc_9pin_plug_collar () {
	$fn = FN;
	H = 25;

	difference () {
		union () {
			cylinder(r = R(CollarD), h = H, center = true);
		}
		cylinder(r = R(SocketD), h = H, center = true);
	}
}

module cpc_9pin_plug_back () {
	//
}

module flange_guide_void (pos = [0, 0, 0], Z = 8) {
	OD = 24;
	ID = 19;
	translate(pos) {
		intersection () {
			difference () {
				cylinder(r = R(OD), h = Z, center = true);
				cylinder(r = R(ID), h = Z + 1, center = true);
			}
			union () {
				translate([0, 0, 1]) cube([5, 25, Z], center = true);
				translate([0, 0, -3]) rotate([7, 0, 0]) translate([(OD/2)-(5/2), OD/4, 0]) cube([OD, OD/2, 3], center = true);
				translate([0, 0, -3]) rotate([-7, 0, 0]) translate([-(OD/2)+(5/2), -OD/4, 0]) cube([OD, OD/2, 3], center = true);
			}
		}
	}
}

module cpc_9pin_socket () {
	$fn = FN;
    BaseH = 3;
	PinH = SocketH + BaseH + 1;
	BoltVoid = 32;
	difference () {
        union () {
            cylinder(r = R(SocketOuterD), h = SocketH + BaseH, center = true);
            translate([0, 0, -((SocketH + BaseH) / 2) + (BaseH / 2)]) rounded_cube([40, 40, BaseH], d = 6, center = true, $fn = 30);
        }
		translate([0, 0, BaseH]) {
			cylinder(r = R(SocketD), h = SocketH + BaseH, center = true);
			for (i = [0 : len(GuideAngles) - 1]) {
				guide(SocketGuideD + 0.1, SocketH + BaseH, GuideAngles[i], GuideWidths[i] + 0.5);
			}
		}

		plug_pin_voids(PinH);
		translate([0, 0, 3]) rotate([0,0, 37]) flange_guide_void([0, 0, (PlugH / 2) - (8 / 2) + 0.01], 8);
		translate([0, 0, -((SocketH + BaseH) / 2) + (BaseH / 2)]) {
			m3_bolt_void([BoltVoid/2,   BoltVoid/2, 0], BaseH + 1);
			m3_bolt_void([BoltVoid/2,  -BoltVoid/2, 0], BaseH + 1);
			m3_bolt_void([-BoltVoid/2,  BoltVoid/2, 0], BaseH + 1);
			m3_bolt_void([-BoltVoid/2, -BoltVoid/2, 0], BaseH + 1);
		}
	}
	
}

module debug () {
	difference () {
		union () {
			cpc_9pin_plug();
			translate([0, 0, 13]) cpc_9pin_socket();
		}
		translate([25, 0, 0]) cube([50, 50, 100], center = true);
	}
}

if (PART == "cpc_9pin_plug") {
	cpc_9pin_plug();
} else if (PART == "cpc_9pin_plug_collar") {
	cpc_9pin_plug_collar();
} else if (PART == "cpc_9pin_plug_back") {
	cpc_9pin_plug_back();
} else if (PART == "cpc_9pin_socket") {
	cpc_9pin_socket();
} else {
	debug();
}