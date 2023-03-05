include <arduino.scad>;

PART="electronics_mount";

CaseX = 100;
CaseY = 200;
CaseZ = 40;

CaseMountsX = 90;
CaseMountsY = 190;

module case_debug () {
	cube([CaseX, CaseY, CaseZ], center = true);
}

module electronics_mount () {
	bumper();
}

if (PART == "electronics_mount") {
	electronics_mount();
}