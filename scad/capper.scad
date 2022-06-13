include <common.scad>;

// Using a Tower Pro SG-5010 servo

// https://www.thingiverse.com/thing:83806 - Lego mount (has dimensions of servo body)
// https://www.thingiverse.com/thing:5241574 - Robot arm (just cool)

currentAngle=-60;

LensVoidDiameter = 40; //mm
LensZ = 80;
LensY = 30;

CapOffsetX = -50;
CapOffsetY = -11;
CapLengthX = 50;
CapWidthZ = 4;

BoltSpacingX = 10;
BoltSpacingY = 49;
BoltD = 3.5;

RailSlotsX = 20;
RailSlotsD = 6;

MountBoltSpacingY=40;

OptoEndstopAdjustZ=0.25;

module BoltVoid () {
    cylinder(r=R(BoltD), h=20, center=true);
    translate([0, 0, 4]) m3_nut(5);
}

module Mount () {
	$fn = 200;
	difference(){
        union(){
            translate([0, 0, 5]) difference(){
                cylinder(r=R(LensVoidDiameter)+15, h=LensY, center=true);
                cylinder(r=R(LensVoidDiameter)+5, h=LensY+1, center=true);
            }
            translate([0,0,-(LensY/4)-(5/4)]) difference(){
                cylinder(r=R(LensVoidDiameter)+5, h=R(LensY)-R(5)-10, center=true);
                cylinder(r=R(LensVoidDiameter), h=LensY+1, center=true);
            }
            difference () {
                union() {
                    translate([50, 0, -6]) cube([100, LensVoidDiameter + 30, 8], center=true);
                    translate([0, 0, -6]) cylinder(r=R(LensVoidDiameter)+12, h=8, center=true);
                }
                cylinder(r=R(LensVoidDiameter), h=LensY+1, center=true);
                //servo
                translate([50, 0, -6]) {
                    cube([20, 40.25, 10], center = true);
                    translate([BoltSpacingX/2, BoltSpacingY/2, 0]) BoltVoid();
                    translate([-BoltSpacingX/2, BoltSpacingY/2, 0]) BoltVoid();
                    translate([BoltSpacingX/2, -BoltSpacingY/2, 0]) BoltVoid();
                    translate([-BoltSpacingX/2, -BoltSpacingY/2, 0]) BoltVoid();
                }
                translate([50, 0, -6-3.01]) cube([2, 56, 2], center=true);
            }
        }
		translate([0,R(LensVoidDiameter),1+7.5]) cube([LensVoidDiameter*2, LensVoidDiameter, 7], center=true);
        //
        translate([80, R(MountBoltSpacingY), 0]) RailSlots();
        translate([80, -R(MountBoltSpacingY), 0]) RailSlots();
        //endstop
        translate([0, -34, 25-2-2]) {
            cube([14, 20, 50], center=true);
            translate([0, 11, -12.5]) cylinder(r=R(22), h=4, center=true);
        }
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
        translate([0, 0, -4]) cylinder(r1=R(5.85), r2=R(5.5), h=4.01,center=true, $fn=20);
        cylinder(r=R(2.5), h=10,center=true);
        translate([0, 0, 2.5]) cylinder(r=R(7.5), h=5,center=true);
    }
    translate([CapOffsetX,CapOffsetY - R(LensVoidDiameter) - 4, 1.25]) cylinder(r=R(15), h=1.5, center=true);
}

module MountFront () {
    $fn=60;
    difference () {
        Mount();    
        translate([0, -50, 50-2]) cube([100, 100, 100], center=true);
        translate([0, 0, 50-2+7]) cube([100, 100, 100], center=true);
        translate([0,-30,-2]) cylinder(r=R(4), h=3, center=true);
        rotate([0,0,40]) translate([0,-30,-2]) cylinder(r=R(4), h=3, center=true);
        rotate([0,0,-40])translate([0,-30,-2]) cylinder(r=R(4), h=3, center=true);
        rotate([0,0,80]) translate([0,-30,-2]) cylinder(r=R(4), h=3, center=true);
        rotate([0,0,-80])translate([0,-30,-2]) cylinder(r=R(4), h=3, center=true);
        translate([90, 0, -11]) rotate([45,0,0]) cube([70, 4.3, 4.3], center=true);
    }   
}

module MountBack () {
    $fn=60;
    difference () {
        Mount();
        translate([0, 0, -50-1.999]) cube([400, 100, 100], center=true);
        translate([0, 50, -50+2+7]) cube([100, 100, 100], center=true);
    }
    //translate([0,-30,-2]) cylinder(r=R(3.9), h=3, center=true);
    rotate([0,0,40]) translate([0,-30,-2]) cylinder(r=R(3.9), h=3, center=true);
    rotate([0,0,-40])translate([0,-30,-2]) cylinder(r=R(3.9), h=3, center=true);
    rotate([0,0,80]) translate([0,-30,-2]) cylinder(r=R(3.9), h=3, center=true);
    rotate([0,0,-80])translate([0,-30,-2]) cylinder(r=R(3.9), h=3, center=true);
}

module RailSlots () {
    translate([R(RailSlotsX), 0, 0]) cylinder(r=R(RailSlotsD), h=40, center=true);
    translate([-R(RailSlotsX), 0, 0]) cylinder(r=R(RailSlotsD), h=40, center=true);
    cube([RailSlotsX, RailSlotsD, 40], center=true);
}

module RailMount () {
    //
    X=110;
    RailD=15;
    RailSpacingY=80;
    $fn=60;
    difference () {
        translate([X, 0, -14]) difference () {
            cube([100, LensVoidDiameter + 30.6, 8], center=true);
            //
            translate([-40, R(MountBoltSpacingY), 0]) cylinder(r=R(6),h=40,center=true);
            translate([-40, -R(MountBoltSpacingY), 0]) cylinder(r=R(6),h=40,center=true);
        }
        
    }
    translate([X, 0, -11]) rotate([45,0,0]) cube([100, 4, 4], center=true);
    translate([X + R(100), 0, -14]) cube([8, LensVoidDiameter + 30.6, 28], center=true);
    translate([X + R(100) + 5 ,R(RailSpacingY),-14]) difference() {
        translate([-2.5, -2.5, 0]) cylinder(r=R(RailD + 5), h=28, center=true);
        cylinder(r=R(RailD), h=28+1, center=true);
    }
}

module OptoEndstopMount () {
        translate([-5,9.5,20]) {
            difference() {
                cube([14-0.3, 14, 24], center=true);
                translate([0, R(LensVoidDiameter)+15+4, 0]) cylinder(r=R(LensVoidDiameter)+15, h=LensY, center=true, $fn=200);
                translate([0,-8.3,0]) cube([7.25, 8, 24+1], center=true);
                translate([0,-5,-9+OptoEndstopAdjustZ]) rotate([90, 0, 0]) cylinder(r=R(2.9),h=10,center=true, $fn=40);
                translate([0,-5,10+OptoEndstopAdjustZ]) rotate([90, 0, 0]) cylinder(r=R(2.9),h=10,center=true, $fn=40);
                translate([0,1,1+OptoEndstopAdjustZ]) cube([8,14,11.5],center=true);
                translate([0,6,.75+OptoEndstopAdjustZ]) cylinder(r=R(22), h=4, center=true);
            }
            
        }
}

module Debug () {
    Mount();
    translate([-CapOffsetX,-CapOffsetY,6.11 + 1.9]) rotate([0,0,currentAngle]) Cap();
    //color("green") RailMount();
    translate([5, -38, -11.8+OptoEndstopAdjustZ]) rotate([0, -90, 0]) opto_endstop();
    translate([5, -38, -11.8]) OptoEndstopMount();
}

Render="OptoEndstopMount";

if (Render=="Debug") {
    Debug();
} else if (Render=="Cap") {
    Cap();
} else if (Render=="MountFront") {
    MountFront();    
} else if (Render=="MountBack") {
    MountBack();
} else if (Render=="RailMount") {
    RailMount();
} else if (Render=="OptoEndstopMount") {
    rotate([-90,0,0]) OptoEndstopMount();    
}