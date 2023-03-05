include <arduino.scad>;
include <common/common.scad>;

PART="electronics_mountx";

CaseX = 121;
CaseY = 172;
CaseZ = 56;

CaseInnerX = 112;
CaseInnerY = 162;
CaseInnerZ = 52;

CaseMountsX = 90;
CaseMountsY = 130;

CaseMountsH = 5;

CaseSplitZ = 41;


module case_mount_debug () {
	$fn = 30;
	translate([0, 0, -0.1]) difference () {
		cylinder(r = R(7), h = CaseMountsH, center = true);
		cylinder(r = R(3.25), h = CaseMountsH + 1, center = true);
	}
}

module case_mounts_debug () {
	X = CaseMountsX/2;
	Y = CaseMountsY/2;
	Z = -(CaseInnerZ/2)+(CaseMountsH/2);
	translate([X,   Y, Z]) case_mount_debug();
	translate([X,  -Y, Z]) case_mount_debug();
	translate([-X,  Y, Z]) case_mount_debug();
	translate([-X, -Y, Z]) case_mount_debug();
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

module relay_module_debug () {

}

module capacitor_debug () {

}

module resistor_debug () {
	
}

module electronics_mount () {
	translate([40, 78, 0]) rotate([0, 0, 180]) bumper();
}

module debug () {
	case_debug();
	translate([0, 0, -CaseInnerZ/2+(CaseMountsH)]) electronics_mount();
}

if (PART == "electronics_mount") {
	electronics_mount();
} else {
	debug();
}