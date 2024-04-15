include <./common/common.scad>;

module debug_camera() {
	X = 122;
	Y = 34.75;
	Z = 74;
	cube([X, Y, Z], center = true);
	cylinder(r = R(5), h = Z + 1, center = true, $fn = 30);
}

module canon_rf_ACME_camera_mount () {

}

canon_rf_ACME_camera_mount();
debug_camera();