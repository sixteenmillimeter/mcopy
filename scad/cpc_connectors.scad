/*
	Amphenol CPC 9pin Connectors
*/

include <./common/common.scad>;

PART="";

PlugD = 11;
SocketD = PlugD + 0.2;

module cpc_9pin_plug () {
	$fn = 200;
	D = 17;
	OD = 28;
	H = 25;

	difference () {
		union () {
			cylinder(r = OD / 2, h = H, center = true);
			//cube([12, 48, 3], center = true);
		}
		//main void
		translate([0, 0, -3]) cylinder(r = (OD / 2) - 3, h = H, center = true);
		//connector void
		cylinder(r = D / 2, h = H * 2, center = true);
	}
}

module cpc_9pin_plug_sleeve () {
	$fn = 200;
	D = 17;
	OD = 28;
	H = 25;

	difference () {
		union () {
			cylinder(r = OD / 2, h = H, center = true);
			//cube([12, 48, 3], center = true);
		}
		//main void
		translate([0, 0, -3]) cylinder(r = (OD / 2) - 3, h = H, center = true);
		//connector void
		cylinder(r = D / 2, h = H * 2, center = true);
	}
}

module cpc_9pin_socket () {
	$fn = 200;
	D = 17;
	OD = 28;
	H = 25;

	difference () {
		union () {
			cylinder(r = OD / 2, h = H, center = true);
			//cube([12, 48, 3], center = true);
		}
		//main void
		translate([0, 0, -3]) cylinder(r = (OD / 2) - 3, h = H, center = true);
		//connector void
		cylinder(r = D / 2, h = H * 2, center = true);
	}

}

if (PART == "cpc_9pin_plug") {
	cpc_9pin_plug();
} else if (PART == "cpc_9pin_plug_sleeve") {
	cpc_9pin_plug_sleeve();
} else if (PART == "cpc_9pin_socket") {
	cpc_9pin_socket();
}