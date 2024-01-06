/*
	Amphenol CPC 9pin Connectors
*/

include <./common/common.scad>;

FN = 120;

PlugD = 16.15 - 0.6;
PlugH = 11.65;
PlugGuideD = 17 - 0.6;
PlugPinD1 = 1.9;
PlugPinD2 = 2.9;
PlugPinD3 = 3.9;

PlugGuideRetraction = 1.25;

PinSpacing = 3.85;

SocketD = 16.15;
SocketGuideD = 17.5;
SocketOuterD = 20;
SocketH = 10.5;
SocketPinD = 3.1;

CollarD = 22;

GuideAngles = [0,   100, 140, 215, 260];
GuideWidths = [3.2, 1.5, 1.5, 1.5, 1.5];

DEBUG = false;

function arc_angle (D, W) = W / ((PI/180) * (D/2));

module guide (Diameter, Height, Angle, Width) {
	A = arc_angle(Diameter, Width);
	echo(A);
	if (!DEBUG) {
		rotate([0, 0, Angle]) difference () {
			cylinder(r = R(Diameter), h = Height, center = true, $fn = FN);
			rotate([0, 0, -A/2]) translate([Diameter / 2, 0, 0])  cube([Diameter, Diameter * 2, Height + 1], center = true);
			rotate([0, 0, A/2]) translate([-Diameter / 2, 0, 0])  cube([Diameter, Diameter * 2, Height + 1], center = true);
		}
	}
}

//
module plug_pin (X = 0, Y = 0, H = 10) {
	translate([X, Y, 0]) rotate([180, 0, 0]) {
		cylinder(r = R(PlugPinD3), h = H, center = true, $fn = 40);
		translate([0, 0, -(H / 2) - (3.1 / 2)]) cylinder(r = R(PlugPinD2), h = 3.11, center = true, $fn = 40);
		translate([0, 0, -(H / 2) - 3.1 - (0.7 / 2)]) cylinder(r1 = R(PlugPinD1), r2 = R(PlugPinD2), h = 0.72, center = true, $fn = 40);
		translate([0, 0, -(H / 2) - 3.1 - 0.7 - (8 / 2)]) cylinder(r = R(PlugPinD1), h = 8.01, center = true, $fn = 40);
	}
}

module socket_pin (X = 0, Y = 0, H = 10) {
	translate([X, Y, 0]) {
		cylinder(r = R(SocketPinD), h = H, center = true, $fn = 40);
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

module socket_pin_voids (PinH) {
	socket_pin(0, 0, PinH);                     //5
	socket_pin(PinSpacing, 0, PinH);            //4
	socket_pin(-PinSpacing, 0, PinH);           //6
	socket_pin(0, PinSpacing, PinH);            //2
	socket_pin(0, -PinSpacing, PinH);           //8
	socket_pin(PinSpacing, PinSpacing, PinH);   //1
	socket_pin(-PinSpacing, PinSpacing, PinH);  //3
	socket_pin(-PinSpacing, -PinSpacing, PinH); //9
	socket_pin(PinSpacing, -PinSpacing, PinH);  //7
}

module cpc_9pin_plug () {
	$fn = FN;
	PinH = PlugH + 1;
	difference () {
		union () {
			cylinder(r = R(PlugD), h = PlugH, center = true);
			//translate([0, 0, -(PlugH/2)+(2/2)]) cylinder(r = R(PlugD + 2), h = 2, center = true);
			translate([0, 0, -PlugGuideRetraction/2]) {
				for (i = [0 : len(GuideAngles) - 1]) {
					guide(PlugGuideD, PlugH - PlugGuideRetraction, GuideAngles[i], GuideWidths[i]);
				}
			}
		}
		translate([0, 0, -7]) cylinder(r = R(PlugD) - 0.5, h = PlugH, center = true);
		translate([0, 0, -5]) plug_pin_voids(PinH);
	}
}

module cpc_9pin_plug_insert () {
	$fn = FN;
	BaseH = 3;
    PinH = PlugH + 10;
	translate([0, 0, -5.75]) difference () {
		union () {
			cylinder(r = R(PlugD - 0.3), h = 6, center = true);
			translate([0, 0, -1]) cylinder(r = R(PlugD + 2.5), h = 2, center = true);
			color("green") translate([0, 0, -7]) cylinder(r = R(PlugD + 1.2), h = 10, center = true);
		}
		cylinder(r = R(PlugD - 2.6), h = 30, center = true);
        translate([0, 0, -6]) plug_pin_voids(PinH);
	}
}

module cpc_9pin_plug_collar () {
	$fn = FN;
	H = 10;
    OuterD = 23;
    CenterD = 17;
    InnerD = 21;
    LipD = 19;
	difference () {
		union () {
			cylinder(r = R(OuterD), h = H, center = true);
		}
		cylinder(r = R(CenterD), h = H + 1, center = true);
		cylinder(r = R(InnerD), h = H - 4, center = true);
		translate([0, 0, H / 2]) cylinder(r = R(LipD), h = H, center = true);
        //bevel
        translate([0, 0, 3.49]) cylinder(r1 = R(InnerD), r2 = R(LipD), h = 1, center = true);
        difference () {
            translate([0, 0, 3.49]) cylinder(r = R(InnerD), h = 4, center = true);
            translate([0, 0, 4]) cube([OuterD + 1, 3.9, 15], center = true);
        }
	}
}

module cpc_9pin_plug_back () {
	//
}

module flange_guide_void (pos = [0, 0, 0], Z = 8) {
	OD = 24;
	ID = 19;
	if (!DEBUG) {
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
}

module cpc_9pin_socket () {
	$fn = FN;
    BaseH = 3;
	
	BoltVoid = 26;
	BackingH = 8;
	BackingD = 17;

	PinH = SocketH + BaseH + BackingH + 10;

	difference () {
        union () {
            cylinder(r = R(SocketOuterD), h = SocketH + BaseH, center = true);
            translate([0, 0, -((SocketH + BaseH) / 2) + (BaseH / 2)]) rounded_cube([34, 34, BaseH], d = 6, center = true, $fn = 40);
        	translate([0, 0, - (BaseH / 2) - BackingH]) cylinder(r = R(BackingD), h = BackingH, center = true);
        }
		translate([0, 0, BaseH]) {
			cylinder(r = R(SocketD), h = SocketH + BaseH, center = true);
			for (i = [0 : len(GuideAngles) - 1]) {
				guide(SocketGuideD + 0.1, SocketH + BaseH, GuideAngles[i], GuideWidths[i] + 0.5);
			}
		}

		socket_pin_voids(PinH);
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
	//cpc_9pin_plug();
	difference () {
		union () {
			//color("green") translate([0, 0, 2.1]) rotate([180, 0, 0]) cpc_9pin_socket();
			cpc_9pin_plug_insert();
			translate([0, 0, -5]) cpc_9pin_plug_collar();
		}
		translate([25, 0, 0]) cube([50, 50, 100], center = true);
	}
}

PART="9pin_plug_insert";

if (PART == "9pin_plug") {
	cpc_9pin_plug();
} else if (PART == "9pin_plug_insert") {
	cpc_9pin_plug_insert();
} else if (PART == "9pin_plug_collar") {
	cpc_9pin_plug_collar();
} else if (PART == "9pin_socket") {
	cpc_9pin_socket();
} else {
	debug();
}

/*
 else if (PART == "9pin_plug_back") {
	cpc_9pin_plug_back();
}
*/