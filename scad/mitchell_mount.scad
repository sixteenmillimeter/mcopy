use <./common/common.scad>;

IN = 25.4;

RailsSpacing = 160;
RailsD = 22.25;

CarriageX = 134;
CarriageY = 106.22;
CarriageZ = 20;

BoltsX = 70.8;
BoltsY = 92.25;
BoltD = 5.25;
BoltsOffsetX = 41.3 + 3;

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
			translate([0, (MitchellY / 2) - 94.5, 0]) cylinder(r = R(9.6), h = 10 + 1, center = true, $fn = 30);
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

module long_cylinder (r, h, l, $fn = 60) {
    translate([-l / 2, 0, 0]) cylinder(r = r, h = h, center = true, $fn = $fn);
    cube([l, r * 2, h], center = true);
    translate([l / 2, 0, 0]) cylinder(r = r, h = h, center = true, $fn = $fn);
}

module carriage_bolt (pos = [0, 0, 0]) {
	translate(pos) {
        cylinder(r = R(BoltD), h = 100, center = true, $fn = 40);
        translate([0, 0, 45]) m5_nut(100);
   }
}

module m5_nut (h = 4) {
    hex(9.15, h);
}

module m5_bolt (pos = [0, 0, 0]) {
    translate(pos) {
        cylinder(r = R(BoltD), h = 100, center = true, $fn = 40);
        translate([0, 0, -50]) cylinder(r = R(9), h = 100, center = true, $fn = 40);
   }
}

module mitchell_mount (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cube([200, 200, 33], center = true);
                translate([20, 0, 0]) cube([200, 200, 33], center = true);
                translate([0, 0, -19]) cube([105, 74, 33], center = true);
            }
            //trim side 
            translate([-170, 0, 0]) cube([200, 200 + 1, 33 + 1], center = true);
            //center camera bolt
            translate([58 - 11, 2, 0]) { 
                long_cylinder(r = R(10), h = 33 + 1, l = 5, $fn = 40);
                translate([0, 0, -10]) long_cylinder(r = R(22), l = 5, h = 33, $fn = 80);
                translate([0, 0, -20]) long_cylinder(r = R(22), h = 33, l = 5, $fn = 80);
            }
            //remove corner
            translate([(-105 / 2) + (15 / 2) - 0.01, (74 / 2) - (15 / 2) + .01, -33]) cube([15, 15, 33], center = true);
            
            //voids for threaded rods
            translate([105 / 2, 0, -33 - 4]) rotate([90, 0, 0]) cylinder(r = R(20), h = 100, center = true, $fn = 40);
            translate([-105 / 2, 0, -33 - 4]) rotate([90, 0, 0]) cylinder(r = R(20), h = 100, center = true, $fn = 40);
            
            //carriage bolts
            translate([6 + 3, 0, 0]) {
                carriage_bolt([BoltsX / 2, BoltsY / 2, 0]);
                carriage_bolt([BoltsX / 2, -BoltsY / 2, 0]);
                carriage_bolt([-BoltsX / 2, BoltsY / 2, 0]);
                carriage_bolt([-BoltsX / 2, -BoltsY / 2, 0]);
            }
            
            //bottom lock bolts
            carriage_bolt([40 / 2, 40 / 2, -15]);
            carriage_bolt([40 / 2, -40/ 2, -15]);
            carriage_bolt([-40 / 2, 40 / 2, -15]);
            carriage_bolt([-40 / 2, -40 / 2, -15]);
            
            
            //material saver voids
            translate([0, 0, -20]) rotate([0, 0, 45]) cube([30, 30, 60], center = true);
            translate([25, 75, -10]) intersection () {
                difference () {
                    cube([150, 35, 33], center = true);
                    cube([150 + 1, 5, 33 + 1], center = true);
                }
                union () {
                    translate([-80, 0, 0]) for (i = [0 : 8]) {
                        translate([i * 40, 0, 0]) rotate([0, 0, 45]) cube([25, 25, 33], center = true);
                        translate([(i * 40) + 20, 20, 0]) rotate([0, 0, 45]) cube([25, 25, 33], center = true);  
                        translate([(i * 40) + 20, -20, 0]) rotate([0, 0, 45]) cube([25, 25, 33], center = true); 
                    }
                }
            }

            translate([25, -75, -10]) intersection () {
                difference () {
                    cube([150, 35, 33], center = true);
                    cube([150 + 1, 5, 33 + 1], center = true);
                }
                union () {
                    translate([-80, 0, 0]) for (i = [0 : 8]) {
                        translate([i * 40, 0, 0]) rotate([0, 0, 45]) cube([25, 25, 33], center = true);
                        translate([(i * 40) + 20, 20, 0]) rotate([0, 0, 45]) cube([25, 25, 33], center = true);  
                        translate([(i * 40) + 20, -20, 0]) rotate([0, 0, 45]) cube([25, 25, 33], center = true); 
                    }
                }
            }
            
            translate([95, 0, -10]) intersection () {
                difference () {
                    cube([35, 100, 33], center = true);
                    cube([5, 150 + 1, 33 + 1], center = true);
                }
                union () {
                    translate([0, -80, 0]) for (i = [0 : 8]) {
                        translate([0, i * 40, 0]) rotate([0, 0, 45]) cube([25, 25, 33], center = true);
                        translate([20, (i * 40) + 20, 0]) rotate([0, 0, 45]) cube([25, 25, 33], center = true);  
                        translate([-20, (i * 40) + 20, 0]) rotate([0, 0, 45]) cube([25, 25, 33], center = true); 
                    }
                }
            }
            translate([(-140 / 2) + 10, 130 / 2, 0]) rotate([180, 0, 0]) carriage_bolt();
            translate([(-140 / 2) + 10, -130 / 2, 0]) rotate([180, 0, 0]) carriage_bolt();
            
            translate([(-140 / 2) + 10, 180 / 2, 10]) rotate([0, 90, 0]){
                m5_nut();
                cylinder(r = R(BoltD), h = 25, center = true, $fn = 30);
                translate([-20, 0, 0]) cube([40, 8, 4], center = true);
            }
            translate([(-140 / 2) + 10, 180 / 2, -10]) rotate([0, 90, 0]){
                m5_nut();
                cylinder(r = R(BoltD), h = 25, center = true, $fn = 30);
                translate([20, 0, 0]) cube([40, 8, 4], center = true);
            }
        }
    }
}

module bottom_lock () {
    difference () {
        cube([80, 110, 8], center = true);
        
        //bottom lock bolts
        m5_bolt([40 / 2, 40 / 2, 0]);
        m5_bolt([40 / 2, -40/ 2, 0]);
        m5_bolt([-40 / 2, 40 / 2, 0]);
        m5_bolt([-40 / 2, -40 / 2, 0]);
        
        translate([6, 0, 0]) {
            translate([BoltsX / 2, BoltsY / 2, 0]) cylinder(r = R(20), h = 8 + 1, center = true, $fn = 40);
            translate([BoltsX / 2, -BoltsY / 2, 0]) cylinder(r = R(20), h = 8 + 1, center = true, $fn = 40);
            translate([-BoltsX / 2, BoltsY / 2, 0]) {
                cylinder(r = R(20), h = 8 + 1, center = true, $fn = 40);
                translate([-10, 0, 0]) cube([20, 20, 8 + 1], center = true);
            }
            translate([-BoltsX / 2, -BoltsY / 2, 0]) {
                cylinder(r = R(20), h = 8 + 1, center = true, $fn = 40);
                translate([-10, 0, 0]) cube([20, 20, 8 + 1], center = true);
            }
        }
    }
}


module debug () {
    translate([0, 0, -30]) {
        color("green") debug_rails();
        color("blue")  debug_jk_carriage([0, 0, (RailsD / 2) + (CarriageZ / 2)]);
        //color("red")   debug_mitchell([57.25 - 30 + 30, (-MitchellY / 2) + (CarriageY / 2) + 45, (RailsD / 2) + CarriageZ + (10 / 2) + 32]);
        //debug_bolex_base([0, 0, 50]);
        color("red") debug_bolex_frame([0, 100, 50 + (BolexBaseZ / 2) + (BolexFrameZ / 2)]);
        mitchell_mount([0, 0, 47]);
        color("salmon")translate([0, 0, 7])  bottom_lock();
    }
}

PART = "mount";

if (PART == "mount") {
    rotate([180, 0, 0]) mitchell_mount([0, 0, 33 / 2]);
} else if (PART == "lock") {
    rotate([180, 0, 0]) bottom_lock();
} else {
    debug();
}

//debug_tester();