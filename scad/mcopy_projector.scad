include <./common/common.scad>;

PART = "debug";

module debug () {
	cube();
}

module projector () {
	
}

module key () {
	
}

if (PART == "projector") {
	
} else {
	debug();
}