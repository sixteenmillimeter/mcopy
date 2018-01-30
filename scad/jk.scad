/*
	JK modules

	Directional switch connector =
	Philmore
	Mobile Connector
	Panel Mount 3 Pin Male/Female
	No. 61-623
	.625" Diameter

*/



module jk_male_connector_mount () {
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

rotate([180, 0, 0]) jk_male_connector_mount();