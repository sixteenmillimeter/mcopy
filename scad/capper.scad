include <common.scad>;

// Using a Tower Pro SG-5010 servo

// https://www.thingiverse.com/thing:83806 - Lego mount (has dimensions of servo body)
// https://www.thingiverse.com/thing:5241574 - Robot arm (just cool)

LensVoidDiameter = 40; //mm
LensZ = 80;
LensY = 20;

CapOffsetX = -50;
CapOffsetY = -11;
CapLengthX = 50;
CapWidthZ = 4;

BoltSpacingX = 10;
BoltSpacingY = 49;
BoltD = 5;

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
                translate([50, 0, -6]) cube([100, LensVoidDiameter + 30, 8], center=true);
                cylinder(r=R(LensVoidDiameter), h=LensY+1, center=true);
                translate([50, 0, -6]) {
                    cube([20, 40.25, 10], center = true);
                    translate([BoltSpacingX/2, BoltSpacingY/2, 0])cylinder(r=R(BoltD), h=20, center=true);
                    translate([-BoltSpacingX/2, BoltSpacingY/2, 0])cylinder(r=R(BoltD), h=20, center=true);
                    translate([BoltSpacingX/2, -BoltSpacingY/2, 0])cylinder(r=R(BoltD), h=20, center=true);
                    translate([-BoltSpacingX/2, -BoltSpacingY/2, 0])cylinder(r=R(BoltD), h=20, center=true);
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
                translate([35,(LensVoidDiameter/4)+1,0]) {
                    difference () {
                        cube([CapLengthX,R(LensVoidDiameter),CapWidthZ], center=true);
                        translate([R(CapLengthX)-(R(LensVoidDiameter)/2), 0, 0]) difference() {
                                cube([R(LensVoidDiameter),R(LensVoidDiameter), CapWidthZ+1], center=true);
                                cylinder(r=R(LensVoidDiameter)/2, h=CapWidthZ+1+1, center=true);
                                translate([-R(LensVoidDiameter)/2, 0, 0]) cube([R(LensVoidDiameter),R(LensVoidDiameter), CapWidthZ+1], center=true);
                        }
                    }
                }
            }
            translate([0, 0, -4]) cylinder(r=5,h=4,center=true);
        }
        translate([0, 0, -4]) cylinder(r1=R(5.5), r2=R(5.4),h=4.01,center=true);
        cylinder(r=R(5.4),h=10,center=true);
    }
}
module Debug () {
    Mount();
    translate([-CapOffsetX,-CapOffsetY,0]) rotate([0,0,-60]) Cap();
}

Render="Debug";

if (Render=="Debug") {
    Debug();
} else if (Render=="Cap") {
    Cap();
} else if (Render=="Mount") {
    Mount();    
}