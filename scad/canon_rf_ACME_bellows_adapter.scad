include <../common/common.scad>;

PlateHeight = 101;
PlateWidth = 65.5;
PlateDepth = 6.3;

BoltD = 4.64;

BoltY = 88.5;
BoltVoidD = 4.75;

CenterVoidD = 44.2;

module bolt_slot (pos = [0, 0, 0]) {
	Length = 1;
	$fn = 80;
	translate (pos) {
		cube([BoltD, Length, PlateDepth + 1], center = true);
		translate([0, Length / 2, 0]) cylinder(r = BoltD / 2, h = PlateDepth + 1, center = true);
		translate([0, -Length / 2, 0]) cylinder(r = BoltD / 2, h = PlateDepth + 1, center = true);
	}
}

module bellows_mount_plate () {
	$fn = 60;
	difference () {
		cube([PlateWidth, PlateHeight, PlateDepth], center = true);
		cylinder(r = R(CenterVoidD), h = PlateDepth + 1, center = true, $fn = 120);
		translate([0, BoltY / 2, 0]) cylinder(r = BoltVoidD / 2, h = PlateDepth + 1, center = true);
		translate([0, -BoltY / 2, 0]) cylinder(r = BoltVoidD / 2, h = PlateDepth + 1, center = true);
		translate([-(PlateWidth / 2) + 5, (PlateHeight / 2) + 5.5, 0]) rotate([0, 0, 30]) cube([28.5, 28.5, PlateDepth + 1], center = true);
		translate([(PlateWidth / 2) - 5, (PlateHeight / 2) + 5.5, 0]) rotate([0, 0, -30]) cube([28.5, 28.5, PlateDepth + 1], center = true);
		translate([-(PlateWidth / 2) + 5, -(PlateHeight / 2) - 5.5, 0]) rotate([0, 0, -30]) cube([28.5, 28.5, PlateDepth + 1], center = true);
		translate([(PlateWidth / 2) - 5, -(PlateHeight / 2) - 5.5, 0]) rotate([0, 0, 30]) cube([28.5, 28.5, PlateDepth + 1], center = true);
	}
}

module camera_mount_plate () {
	$fn = 60;
	difference () {
		cube([PlateWidth, PlateHeight, PlateDepth], center = true);
		cylinder(r = R(CenterVoidD), h = PlateDepth + 1, center = true, $fn = 120);
		bolt_slot([0, BoltY / 2, 0]);
		bolt_slot([0, -BoltY / 2, 0]);
		translate([-(PlateWidth / 2) + 5, (PlateHeight / 2) + 5.5, 0]) rotate([0, 0, 30]) cube([28.5, 28.5, PlateDepth + 1], center = true);
		translate([(PlateWidth / 2) - 5, (PlateHeight / 2) + 5.5, 0]) rotate([0, 0, -30]) cube([28.5, 28.5, PlateDepth + 1], center = true);
		translate([-(PlateWidth / 2) + 5, -(PlateHeight / 2) - 5.5, 0]) rotate([0, 0, -30]) cube([28.5, 28.5, PlateDepth + 1], center = true);
		translate([(PlateWidth / 2) - 5, -(PlateHeight / 2) - 5.5, 0]) rotate([0, 0, 30]) cube([28.5, 28.5, PlateDepth + 1], center = true);
	}
}

// Canon EOS-RF Body Cap by fabioramondo
// https://www.thingiverse.com/thing:5600514
module canon_rf_body_cap () {
	difference () {
		intersection () {
			rotate([0, 0, -15]) translate([2.6, -6.5, 2]) {
				color("red") import("../stl/Canon-EOS-RF-body-cap.stl");
			}
			cylinder(r = R(64), h = 40, center = true, $fn = 120);
		}
		cylinder(r = CenterVoidD / 2, h = 20, center = true, $fn = 120);
	}
	difference () {
		translate([0, 0, 9 / 2]) cylinder(r = R(64), h = 9, center = true, $fn = 120);
		translate([0, 0, 9 / 2]) cylinder(r = R(CenterVoidD), h = 9 + 1, center = true, $fn = 120);
	}

	//translate([0, 37, 8/2]) cube([5, 5, 8], center = true);
}

module canon_rf_ACME_bellows_adapter () {
	canon_rf_body_cap();
}

PART = "canon_rf_ACME_mount_plate";

if (PART == "canon_rf_ACME_bellows_adapter") {
	canon_rf_ACME_bellows_adapter();
} else if (PART == "canon_rf_ACME_mount_plate") {
	camera_mount_plate();
}
//translate([0, 0, -10]) bellows_mount_plate();
