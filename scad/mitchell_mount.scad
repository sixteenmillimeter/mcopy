use <./common/common.scad>;

IN = 25.4;

RailsSpacing = 160;
RailsD = 22.25;

CarriageX = 134;
CarriageY = 106.22;
CarriageZ = 20;

BoltsX = 70.8;
BoltsY = 92.25;
BoltD = 6;
BoltsOffsetX = 41.3;

MitchellY = (8 + (13/16)) * IN;

module debug_bolt (pos = [0, 0, 0]) {
	translate(pos) cylinder(r = R(BoltD), h = CarriageZ + 1, center = true, $fn = 40);
}

module debug_rails (Length = 200) {
	translate([RailsSpacing / 2, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(RailsD), h = Length, center = true, $fn = 60);
	translate([-RailsSpacing / 2, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(RailsD), h = Length, center = true, $fn = 60);
}

module debug_jk_carriage (pos = [0, 0, 0]) {
	translate(pos) difference () {
		cube([CarriageX, CarriageY, CarriageZ], center = true); 
		cube([107, 76, CarriageZ + 1], center = true);
		//bolts
		translate([(-BoltsX / 2) + BoltsOffsetX, 0, 0]) {
			debug_bolt([BoltsX / 2, BoltsY / 2, 0]);
			debug_bolt([BoltsX / 2, -BoltsY / 2, 0]) cylinder(r = R(BoltD), h = CarriageZ + 1, center = true, $fn = 40);
			debug_bolt([-BoltsX / 2, BoltsY / 2, 0]) cylinder(r = R(BoltD), h = CarriageZ + 1, center = true, $fn = 40);
			debug_bolt([-BoltsX / 2, -BoltsY / 2, 0]) cylinder(r = R(BoltD), h = CarriageZ + 1, center = true, $fn = 40);
		}
	}
}

module debug_mitchell (pos = [0, 0, 0]) {
	translate(pos) {
		difference () {
			union () {
				echo("Mitchell Y", (8 + (13/16)) * IN);
				cube([148.7, MitchellY, 10], center = true);
			}
			translate([0, (MitchellY / 2) - 94.5, 0]) cylinder(r = (9.6), h = 10 + 1, center = true, $fn = 30);
		}
		translate([-57.25, MitchellY / 2, (112.7 - (10)) / 2]) cube([1, 1, 112.7], center = true);
		translate([-57.25, (MitchellY / 2) - (10 / 2), 112.7 - (10 / 2)]) cube([16, 10, 7.49], center = true);
	}
}

color("green") debug_rails();
color("blue") debug_jk_carriage([0, 0, (RailsD / 2) + (CarriageZ / 2)]);
color("red") debug_mitchell([57.25, (-MitchellY / 2) + (CarriageY / 2) + 45, (RailsD / 2) + CarriageZ + (10 / 2)]);