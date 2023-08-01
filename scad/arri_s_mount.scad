include <./common.scad>;

PART="mount";

Z = 100 - 14.5;

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

module wing_nuts (nutZ = 0) {
    translate([mountBoltsX/2, mountBoltsY/2, nutZ]) rotate([0, 0, 5]) cube([3.5, 22, 11], center = true);
    translate([-mountBoltsX/2, mountBoltsY/2, nutZ]) rotate([0, 0, 5]) cube([3.5, 22, 11], center = true);
    translate([mountBoltsX/2, -mountBoltsY/2, nutZ]) rotate([0, 0, 5]) cube([3.5, 22, 11], center = true);
    translate([-mountBoltsX/2, -mountBoltsY/2, nutZ]) rotate([0, 0, 5]) cube([3.5, 22, 11], center = true);
}

module mount () {
    difference () {
        rounded_cube([mountBoltsX + 20, baseY, Z], d = 20, center =true, $fn = 60);
        //center void
        translate([0, 0, -camBoltZ]) cube([mountBoltsX - 20, innerBaseY, Z], center =true);
        //side void
        translate([0, 0, -camBoltZ]) cube([baseX + 1, innerBaseY - 40, Z], center =true);
        bolts(boltD + .4, Z + 1);
        //inset
        translate([0, 0, (Z / 2) - (Z / 2) + 15]) bolts(20, Z);
        camera_bolt(35);
        wing_nuts(-(Z / 2) + 20.5);
    }
}

module center_fitting () {
    SMALL_D = 4.5;
    SMALL_Z = 9;
    LARGE_D = 9.4;
    translate([10.7, 0, 0]) cylinder(r = R(SMALL_D), h = SMALL_Z, center = true, $fn = 40);
    difference () {
        //cube
        translate([(SMALL_D/2) + (LARGE_D / 2), 0, -(SMALL_Z/2)-(camBoltZ/2)]) cube([camBoltD + SMALL_D, camBoltD - 0.3, camBoltZ], center = true);
        cylinder(r = R(LARGE_D), h = 60, center = true, $fn = 60);
        translate([10.7 - 1, 0, 0]) difference () {
            translate([(camBoltD + 1) / 2, 0, 0]) cube([camBoltD + 1, camBoltD + 1, 60], center = true);
            cylinder(r = R(camBoltD), h = 60, center = true, $fn = 60);
        }
    }
}

//base();
//translate([0, 0, (baseZ/2) + (Z/2) + 5]) mount();
//translate([0, 0, (baseZ/2) + Z + 9]) 
//center_fitting();
if (PART == "mount") {
    mount();
}