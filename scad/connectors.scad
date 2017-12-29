include <./common.scad>;

//PINS
PIN_A = [-(18 / 2) + (1 / 2) + 4.5, 2 + (3.5 / 2)];
PIN_B = [(18 / 2) - (3.5 / 2) - 3 - 1.5,  2 + (3.5 / 2)];
PIN_C = [(18 / 2) - (3.5 / 2) - 3 - 1.5, - 2 - (3.5 / 2)];
PIN_D = [-(18 / 2) + (1 / 2) + 4.5, - 2 - (3.5 / 2)];

module pin (ROTATE = false, PAD = 0, HEIGHT = 10) {
    if (ROTATE == false) {
        cube([1 + PAD, 3.5 + PAD, HEIGHT], center = true);
    } else {
        rotate([0, 0, 90]) cube([1 + PAD, 3.5 + PAD, HEIGHT], center = true);
    }
}

module pins (PAD = 0, HEIGHT = 10) {
    Z = 24 / 2 + 10 / 2;
    translate([PIN_A[0], PIN_A[1], Z]) pin(false, PAD, HEIGHT);
    translate([PIN_D[0], PIN_D[1], Z]) pin(false, PAD, HEIGHT);

    translate([PIN_B[0], PIN_B[1], Z]) pin(true, PAD, HEIGHT);
    translate([PIN_C[0], PIN_C[1], Z]) pin(true, PAD, HEIGHT);
}

module body () {
    rounded_cube([17, 18, 24], d = 2, center = true, $fn = 60);
}

module male_jk103_neg () {
    union (){
        difference() {
            color("red") cube([20, 20, 24], center = true);
            rounded_cube([17 - 5, 18 - 5, 24 + 2], d = 2, center = true, $fn = 60);
            //alignment notch
            translate([-6, 0 , 10]) cube([6, 3, 4], center = true);
        }
        translate([0, 0, -12]) cube([20, 20, 24], center = true);
        //access
      translate([3.5, 6.2, 0]) cube([6, 6, 6], center = true);  
    
    translate([3.5, -6.2, 0]) cube([6, 6, 6], center = true);
    translate([-6.5, 5, 0]) cube([6, 6, 6], center = true);  
    translate([-6.5, -5, 0]) cube([6, 6, 6], center = true); 
    }  
}

module male_jk103 () {
    difference () {
        body();
        translate([0, 0, -10]) pins(0, 20);
        translate([0, 0, -3]) male_jk103_neg();
        //bolt
        translate([15, 0, 5]) rotate([0,90,0]) cylinder(r = 1, h = 20, center = true, $fn = 40);
    }
    
}

module male_jk103_back (){
    difference() {
        union () {
            body();
            translate([0, 0, -15]) cylinder(r = 5, h = 10, center = true, $fn = 300);
        }
        male_jk103();
        translate([0, 0, 3]) rounded_cube([17 - 5, 18 - 5, 24], d = 2, center = true, $fn = 60);
        cylinder(r = 3, h = 24 * 2, center = true, $fn = 300);
        //bolt
        translate([15, 0, 5]) rotate([0,90,0]) cylinder(r = 1, h = 20, center = true, $fn = 40);
    }
    
}

module pin_inserts () {
    color("red") pins(0, 24);
}

module female_jk103 () {
    difference () {
        body();
        translate([0, 0, 25]) rotate([0, 180, 0]) pins(0.5, 20);
    }
}

//translate([20, 0, 0]) male_jk103();
translate([40, 0, 0]) male_jk103_back();
//translate([20, 0, -7]) pin_inserts();
//female_jk103();