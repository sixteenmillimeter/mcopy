include <common.scad>;

// Using a Tower Pro SG-5010 servo

// https://www.thingiverse.com/thing:83806 - Lego mount (has dimensions of servo body)
// https://www.thingiverse.com/thing:5241574 - Robot arm (just cool)

LensVoidDiameter = 40; //mm
LensZ = 80;
LensY = 20;

CapOffsetX = -50;
CapOffsetY = -11;

BoltSpacingY = 49;

module Mount () {
	$fn = 200;
	difference(){
        union(){
            difference(){
                cylinder(r=R(LensVoidDiameter)+15, h=LensY, center=true);
                cylinder(r=R(LensVoidDiameter)+5, h=LensY+1, center=true);
            }
            translate([0,0,-(LensY/4)-(5/4)]) difference(){
                cylinder(r=R(LensVoidDiameter)+5, h=R(LensY)-R(5), center=true);
                cylinder(r=R(LensVoidDiameter), h=LensY+1, center=true);
            }
            difference () {
                translate([50, 0, -6]) cube([100, LensVoidDiameter + 30, 8], center = true);
                cylinder(r=R(LensVoidDiameter), h=LensY+1, center=true);
                translate([50, 0, -6]) {
                    cube([20, 40.25, 10], center = true);
                    translate([0, BoltSpacingY/2, 0]) 
                }
            }
        }
		translate([0,R(LensVoidDiameter),0])cube([LensVoidDiameter*2, LensVoidDiameter, 5], center=true);
	}
    
}

module Cap () {
    $fn = 200;
    difference(){
        union(){
            translate([CapOffsetX,CapOffsetY,0]){
                cylinder(r=R(LensVoidDiameter) + 4, h=4, center = true);
                translate([35,(LensVoidDiameter/4)+1,0]) cube([50,R(LensVoidDiameter),4], center=true);
            }
            cylinder(r=5,h=10,center=true);
        }
        cylinder(r=2,h=10+1,center=true);
    }
}

Mount();
translate([-CapOffsetX,-CapOffsetY,0]) rotate([0,0,-60]) Cap();