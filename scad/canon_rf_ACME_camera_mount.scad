include <./common/common.scad>;

FrontToBolt = 26.65;
FrontToFilmPlane = 15.85;

BaseBoltD = 6.75;
BaseRegistrationPinD = 6.5;

ChannelX = 15.5;
ChannelZ = 2.3;

PlatformX = 90.6 + 15.5 + 80.5;
PlatformY = 105 + 73; 

MountX = 55;
MountY = 40;
MountZ = 70;
ExtensionY = 100;

PlatformCenterX = (PlatformX / 2) - (80.5 + 7.75);

CameraBoltD = 6.8;

module bolt_slot (pos = [0, 0, 0], D = 10, H = 10, Length = 1) {
	$fn = 80;
	translate (pos) {
		cube([D, Length, H + 1], center = true);
		translate([0, Length / 2, 0]) cylinder(r = R(D), h = H + 1, center = true);
		translate([0, -Length / 2, 0]) cylinder(r = R(D), h = H + 1, center = true);
	}
}

module debug_camera() {
	X = 122;
	Y = 34.75;
	Z = 74;
	difference () {
		cube([X, Y, Z], center = true);
		translate([0, -(Y / 2) + FrontToBolt, 0]) cylinder(r = R(5), h = Z + 1, center = true, $fn = 30);
		translate([0, -Y + FrontToFilmPlane, 39.75]) cube([X - 20, Y, Z], center = true); 
	}
}

module debug_platform () {
	H = 20;
	$fn = 60;
	translate([0, 0, -H / 2]) {
		difference () {
			cube([PlatformX, PlatformY, H], center = true);
			translate([PlatformCenterX, 0, (H / 2) - (ChannelZ / 2) + 0.01]) cube([ChannelX, PlatformY + 1, ChannelZ], center = true);
			translate([PlatformCenterX, -(PlatformY / 2) + 84, 7 / 2]) cylinder(r = R(BaseBoltD), h = H + 1, center = true);
			translate([PlatformCenterX, -(PlatformY / 2) + 20.25, 7 / 2]) cylinder(r = R(BaseBoltD), h = H + 1, center = true);
		}
		translate([PlatformCenterX, -(PlatformY / 2) + (16 / 2), 2 / 2]) cube([ChannelX, 16, H + 2], center = true);
		translate([PlatformCenterX, -(PlatformY / 2) + 32.9, 7 / 2]) cylinder(r = R(BaseRegistrationPinD), h = H + 7, center = true);
	}
}

module canon_rf_ACME_camera_mount () {
	$fn = 80;
	difference () {
		union () {
			cube([MountX, MountY, MountZ], center = true);
			translate([0, -(MountY / 2) + (ExtensionY / 2), -(MountZ / 2) + (10 / 2)]) cube([MountY + 1, ExtensionY, 10], center = true);
			translate([0, -(MountY / 2) + (ExtensionY / 2), -(MountZ / 2) - (ChannelZ / 2)]) cube([ChannelX, ExtensionY, ChannelZ], center = true);
		}
		cube([MountX - 20, MountY + 1, MountZ - 20], center = true);
		translate([0, -(MountY / 2) + (17 / 2), -MountZ / 2]) cube([ChannelX + 0.1, 17.01, 6], center = true);

		//front bolt
		translate([0, 0, -MountZ / 2]) cylinder(r = R(11), h = 30, center = true);

		bolt_slot([0, 13, -MountZ / 2], D = BaseRegistrationPinD, H = 30, Length = 2);
		translate([0, -(MountY / 2) + 84, -MountZ / 2]) cylinder(r = R(7), h = 30, center = true);
		translate([0, -(MountY / 2) + 84, -(MountZ / 2) + 22.5]) cylinder(r = R(10), h = 30, center = true);
		//camera bolt
		translate([0, -2, MountZ / 2]) cylinder(r = R(CameraBoltD), h = 30, center = true);
	}
	
}

module debug () {
	translate([PlatformCenterX, -69, MountZ / 2]) difference() {
		canon_rf_ACME_camera_mount();
		translate([50, 0, 0]) cube([100, 200, 100], center = true);
	}

	translate([PlatformCenterX, -60, (110/2)]) cube([1, 63.5, 110], center = true);
	translate([PlatformCenterX, -80, 105]) debug_camera();
	//color("red") debug_platform();
}

rotate([90, 0, 0]) canon_rf_ACME_camera_mount();
