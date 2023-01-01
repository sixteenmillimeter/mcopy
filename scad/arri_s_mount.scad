include <./common.scad>;

Z = 100;

baseX = 134.5;
baseY = 105.4;
baseZ = 20;

innerBaseX = 106.22;
innerBaseY = 75.88;

mountBoltsX = 71;
mountBoltsY = 90.66;

boltD = 5;
camBoltD = 10;
camBoltZ = 12;

module base () {
    
    difference () {
        cube([baseX, baseY, baseZ], center =true);
        cube([innerBaseX, innerBaseY, baseZ + 1], center =true);
        //bolts
        bolts(boltD, baseZ + 1);
    }
}

module bolts (boltD = 5, boltZ = 12) {
    $fn = 60;
    translate([mountBoltsX/2, mountBoltsY/2, 0]) cylinder(r = R(boltD), h = boltZ, center = true);
    translate([-mountBoltsX/2, mountBoltsY/2, 0]) cylinder(r = R(boltD), h = boltZ, center = true);
    translate([mountBoltsX/2, -mountBoltsY/2, 0]) cylinder(r = R(boltD), h = boltZ, center = true);
    translate([-mountBoltsX/2, -mountBoltsY/2, 0]) cylinder(r = R(boltD), h = boltZ, center = true);
}

module camera_bolt (width = 20) {
    $fn = 60;
    translate([width/2, 0, 0]) cylinder(r = R(camBoltD), h = Z + 1);
    translate([-width/2, 0, 0]) cylinder(r = R(camBoltD), h = Z + 1);
    cube([width, camBoltD, Z + 1], center = true);
}

module mount () {
    difference () {
        rounded_cube([mountBoltsX + 20, baseY, Z], d = 20, center =true, $fn = 60);
        //center void
        translate([0, 0, -camBoltZ]) cube([mountBoltsX - 20, innerBaseY, Z], center =true);
        translate([0, 0, -camBoltZ]) cube([baseX + 1, innerBaseY - 40, Z], center =true);
        bolts(boltD, Z + 1);
        //
        translate([0, 0, (Z / 2) - (Z / 2) + 15]) bolts(20, Z);
        camera_bolt();
    }
}

//base();
translate([0, 0, (baseZ/2) + (Z/2) + 5]) mount();