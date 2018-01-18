include <./bellows.scad>;
include <./connectors.scad>;
include <./light.scad>;
include <./motor.scad>;


//translate([0, 2.5, 0]) rotate([90, 0, 0]) color("red") adafruit_pixie();
//translate([0, 6, 0]) color("blue") pixie_mount();
//translate([0, 0, -50]) color("red") fan(35);
//color("green") diffuser_mount();
//translate([0, 0, -51.2]) light_body35();
//translate([0, 0, 20]) light_vent_top();
//translate ([0, -20, 0]) rotate([90, 90, 0]) color("red") diffuser_insert();
//translate ([0, -20, 0]) rotate([90, 90, 0]) color("red") diffuser_spacer();
//rotate([0, 0, 90]) flashlight_mount();
translate([0, -8.5, 0]) rotate([0, 0, 90]) impromptu_mount();
//translate([30, -8.5, 0]) rotate([90, 0, 90]) flashlight_mount_cap();

//light_fresnel();