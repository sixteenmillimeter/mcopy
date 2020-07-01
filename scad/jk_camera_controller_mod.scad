

module rounded_cube (c, d) {
    r = d / 2;
    scaled = [c[0] - d, c[1] - d, c[2] - d];
    minkowski() {
        sphere(r = r);
        cube(scaled, center = true);
    }
}

module case () {
    $fn = 100;
    
    X = 75+1;
    Y = 65+1;
    Z = 35+1;
    
    MOUNT_X = 44.5;
    MOUNT_Y = 33.5;
    
    MOUNT_Z1 = 4.5;
    MOUNT_Z2 = 3;
    
    MOUNT_D1 = 5;
    MOUNT_D2 = 2.5;
    
    MOUNT_OFFSET_X = 11;
    MOUNT_OFFSET_Y = 2;
    MOUNT_OFFSET_Z = 13.5;
    
    PLUG_D1 = 15.75;
    PLUG_D2 = 20;
    PLUG_Z = -2;
    PLUG_OFFSET_X = -23;
    
    M5 = 5.75;
    
    difference () {
        rounded_cube([X, Y, Z], d = 8);
        //inner void
        rounded_cube([X - 7, Y - 7, Z - 7], d = 5);
        //top
        translate([0, 0, -Z + 4]) cube([X + 1, Y + 1, Z], center = true);
        //
        translate([PLUG_OFFSET_X, 0, 10]) cylinder(r = PLUG_D1 / 2, h = 20, center = true);
        translate([PLUG_OFFSET_X, 0, 5 - PLUG_Z]) cylinder(r = PLUG_D2 / 2, h = 20, center = true);
        
        //m5
        translate([PLUG_OFFSET_X + 6, 20, 10]) cylinder(r = M5 / 2, h = 50, center = true);
        translate([PLUG_OFFSET_X + 6, -20, 10]) cylinder(r = M5 / 2, h = 50, center = true);
    }
    translate([MOUNT_OFFSET_X, MOUNT_OFFSET_Y, 0]) rotate([0, 0, 90]) {
        translate ([(MOUNT_X / 2), MOUNT_Y / 2, MOUNT_OFFSET_Z]) {
            cylinder(r = MOUNT_D1 / 2, h = MOUNT_Z1, center = true);
            translate([0, 0, -(MOUNT_Z1 / 2) - (MOUNT_Z2 / 2)]) cylinder(r = MOUNT_D2 / 2, h = MOUNT_Z2, center = true);
        }
        translate ([-(MOUNT_X / 2), MOUNT_Y / 2, MOUNT_OFFSET_Z]) {
            cylinder(r = MOUNT_D1 / 2, h = MOUNT_Z1, center = true);
            translate([0, 0, -(MOUNT_Z1 / 2) - (MOUNT_Z2 / 2)]) cylinder(r = MOUNT_D2 / 2, h = MOUNT_Z2, center = true);
        }
        translate ([(MOUNT_X / 2), -MOUNT_Y / 2, MOUNT_OFFSET_Z]) {
            cylinder(r = MOUNT_D1 / 2, h = MOUNT_Z1, center = true);
            translate([0, 0, -(MOUNT_Z1 / 2) - (MOUNT_Z2 / 2)]) cylinder(r = MOUNT_D2 / 2, h = MOUNT_Z2, center = true);
        }
        translate ([-(MOUNT_X / 2), -MOUNT_Y / 2, MOUNT_OFFSET_Z]) {
            cylinder(r = MOUNT_D1 / 2, h = MOUNT_Z1, center = true);
            translate([0, 0, -(MOUNT_Z1 / 2) - (MOUNT_Z2 / 2)]) cylinder(r = MOUNT_D2 / 2, h = MOUNT_Z2, center = true);
        }
    }
    //m5
    translate([PLUG_OFFSET_X + 6, 20, 2]) difference () {
        union () {
            cylinder(r = 9 / 2, h = Z - 5, center = true);
            translate([0, 0, Z / 2 - 6]) cylinder(r = 12 / 2, h = 6, center = true);
        }
        cylinder(r = M5 / 2, h = 50, center = true);
    }
    translate([PLUG_OFFSET_X + 6, -20, 2]) difference () {
        union () {
            cylinder(r = 9 / 2, h = Z - 5, center = true);
            translate([0, 0, Z / 2 - 6]) cylinder(r = 12 / 2, h = 6, center = true);
        }
        cylinder(r = M5 / 2, h = 50, center = true);
    }
    translate([-(X / 2) + 4, Y / 5 , (Z / 2) - 5]) {
            rotate([90, 0, 0]) cylinder(r = 3, h = 10, center = true);
    }
    translate([-(X / 2) + 4, -Y / 5 , (Z / 2) - 4]) {
            rotate([90, 0, 0]) cylinder(r = 3, h = 10, center = true);
    }
    /*translate ([(X / 2) + 5, 0, -9.5]) difference () {
        rounded_cube([15, 15, 5], d = 2);
        translate([0, 0, -4]) cube([15, 15, 5], center = true);
        translate([2, 0, 0]) cylinder(r = M5 / 2, h = 10, center = true);
    }
    translate ([-(X / 2) - 5, 0, -9.5]) difference () {
        rounded_cube([15, 15, 5], d = 2);
        translate([0, 0, -4]) cube([15, 15, 5], center = true);
        translate([-2, 0, 0]) cylinder(r = M5 / 2, h = 10, center = true);
    }*/
}

//intersection () {
difference () {
    case();
    //translate([-23, 0, 0]) cube([100, 100, 100], center = true); 
}
//    translate([-14, 0, 12]) cube([10, 40, 10], center = true);
//}

