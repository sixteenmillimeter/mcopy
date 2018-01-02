include <./bellows.scad>;
include <./connectors.scad>;
include <./light.scad>;
include <./motor.scad>;

module bellows_plate () {
	translate([0, 0, 3]) bellows_camera_board();
	translate([0, 55, 12.5]) color("red") camera_mount();
}

module connectors_plate () {
	translate([20, 0, 12]) rotate([180, 0, 0]) male_jk103();
	translate([20, 20, 20]) male_jk103_back();
	translate([0, 0, 12])  female_jk103();
}

module light_plate () {
        //adafruit_pixie();
        rotate([-90, 0, 0]) pixie_mount();
}

module motor_plate () {}

//bellows.scad

//bellows_camera_board();
//camera_mount();
//bellows_plate();


//connectors.scad

//rotate([180, 0, 0]) male_jk103();
//male_jk103_back();
//female_jk103();
//connectors_plate();

//light.scad
//adafruit_pixie();
//pixie_mount();
light_vent_top();
//light_plate();

//motor.scad

//motor_plate();