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

BolexBaseZ = 38;
BolexFrameZ = 107;

module debug_bolt (pos = [0, 0, 0]) {
	translate(pos) cylinder(r = R(BoltD), h = CarriageZ + 1, center = true, $fn = 40);
}

module debug_rails (Length = 200) {
	translate([RailsSpacing / 2, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(RailsD), h = Length, center = true, $fn = 60);
	translate([-RailsSpacing / 2, 0, 0]) rotate([90, 0, 0]) cylinder(r = R(RailsD), h = Length, center = true, $fn = 60);
}

module debug_bolts (pos = [0, 0, 0]) {
    translate(pos) {
        debug_bolt([BoltsX / 2, BoltsY / 2, 0]);
		debug_bolt([BoltsX / 2, -BoltsY / 2, 0]);
		debug_bolt([-BoltsX / 2, BoltsY / 2, 0]);
		debug_bolt([-BoltsX / 2, -BoltsY / 2, 0]);
    }
}

module debug_jk_carriage (pos = [0, 0, 0]) {
	translate(pos) difference () {
		cube([CarriageX, CarriageY, CarriageZ], center = true); 
		cube([107, 76, CarriageZ + 1], center = true);
		//bolts
		debug_bolts([(-BoltsX / 2) + BoltsOffsetX, 0, 0]);
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

module debug_tester () {
    difference () {
        cube([BoltsX + 15, BoltsY + 15, 10], center = true);
        cube([BoltsX - 15, BoltsY - 15, 10 + 1], center = true);
        debug_bolts();
    }
}

module debug_bolex_base (pos = [0, 0, 0]) {
    translate(pos) {
        cube([CarriageX - 40, CarriageY, BolexBaseZ], center = true);
    }
}

module debug_bolex_frame (pos = [0, 0, 0]) {
    translate(pos) {
        cube([10, 10, BolexFrameZ], center = true);
    }
}

module carriage_bolt (pos = [0, 0, 0]) {
	translate(pos) {
        cylinder(r = R(BoltD), h = 100, center = true, $fn = 40);
        translate([0, 0, 45]) hex(11, 100);
   }
}

module mitchell_mount (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cube([200, 200, 33], center = true);
                translate([0, 0, -10]) cube([105, 74, 33], center = true);
            }
            //trim side 
            translate([-170, 0, 0]) cube([200, 200 + 1, 33 + 1], center = true);
            //center bolt
            translate([58, 0, 0]) { 
                cylinder(r = R(10), h = 33 + 1, center = true, $fn = 40);
                translate([0, 0, -10]) cylinder(r = R(22), h = 33, center = true, $fn = 80);
                translate([0, 0, -20]) cylinder(r = R(22), h = 33, center = true, $fn = 80);
            }
            //carriage bolts
            carriage_bolt([BoltsX / 2, BoltsY / 2, 0]);
            carriage_bolt([BoltsX / 2, -BoltsY / 2, 0]);
            carriage_bolt([-BoltsX / 2, BoltsY / 2, 0]);
            carriage_bolt([-BoltsX / 2, -BoltsY / 2, 0]);
            
            //bottom lock bolt
            carriage_bolt([40 / 2, 40 / 2, 0]);
            carriage_bolt([40 / 2, -40/ 2, 0]);
            carriage_bolt([-40 / 2, 40 / 2, 0]);
            carriage_bolt([-40 / 2, -40 / 2, 0]);
        }
    }
}


/*translate([0, 0, -30]) {
    color("green") debug_rails();
    color("blue") debug_jk_carriage([0, 0, (RailsD / 2) + (CarriageZ / 2)]);
    color("red") debug_mitchell([57.25 - 30 + 30, (-MitchellY / 2) + (CarriageY / 2) + 45, (RailsD / 2) + CarriageZ + (10 / 2) + 32]);
    //debug_bolex_base([0, 0, 50]);
    color("red") debug_bolex_frame([0, 100, 50 + (BolexBaseZ / 2) + (BolexFrameZ / 2)]);
}*/
mitchell_mount([0, 0, 33 / 2]);
//debug_tester();