include <./Canon_EF_body_cap.scad>;
include <./common/common.scad>;

difference () {
	union () {
		EFmount();
		translate([0, 0, -3]) cylinder(r = 38 / 2, h = 10, center = true, $fn = 360);
	}
	//guide
	translate([0, 0, -3]) rotate([0, 0, 8.75]) translate([0, -26, 0]) cylinder(r = R(3), h = 4, center= true);
	//center void
	cylinder(r = 32 / 2, h = 30, center = true, $fn = 360);
}