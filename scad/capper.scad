include <common.scad>;

// Using a Tower Pro SG-5010 servo

// https://www.thingiverse.com/thing:83806 - Lego mount (has dimensions of servo body)
// https://www.thingiverse.com/thing:5241574 - Robot arm (just cool)

currentAngle=0;

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

OptoEndstopAdjustZ=2-9;

module OptoEndstop () {
    $fn=30;
    Y=5;
    Z2=3.64-1.75;
    difference () {
        union() {
            cube([11.15, 28.25, 1.75], center=true);
            translate([0,14,0]) cylinder(r=R(6), h=1.75, center=true);
            translate([0,-14,0]) cylinder(r=R(6), h=1.75, center=true);
        }
        translate([0,14,0]) cylinder(r=R(2.85), h=1.75+1, center=true);
        translate([0,-14,0]) cylinder(r=R(2.85), h=1.75+1, center=true);
    }
    translate([-R(6.1)+1.2, R(28.25)-R(Y+4.15+4.15)-3.65, 0]) {
        translate([0,R(Y)+R(4.15),-R(1.75)-R(10.15)]) cube([6.1, 4.15, 10.15], center=true);
        translate([0,-R(Y)-R(4.15),-R(1.75)-R(10.15)]) cube([6.1, 4.15, 10.15], center=true);
    }
    translate([3,4, -R(1.75)-R(.75)]) cube([3.6, 15.7, .75], center=true);
}

module BoltVoid () {
    cylinder(r=R(BoltD), h=20, center=true);
    translate([0, 0, 4]) m3_nut(5);
}

module Mount () {
	$fn = 200;
	difference(){
        union(){
            //outer cylinder
            translate([0, 0, 5]) difference(){
                cylinder(r=R(LensVoidDiameter)+15, h=LensY, center=true);
                cylinder(r=R(LensVoidDiameter)+5, h=LensY+1, center=true);
                translate([0, 0, 10.01]) cylinder(r1=R(LensVoidDiameter), r2=R(LensVoidDiameter)+10, h=10, center=true);
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
		translate([0,R(LensVoidDiameter),1+4.5]) cube([LensVoidDiameter*2, LensVoidDiameter, 7], center=true);
        //
        translate([80, R(MountBoltSpacingY), 0]) RailSlots();
        translate([80, -R(MountBoltSpacingY), 0]) RailSlots();
        
        translate([0, 0, -4]) cylinder(r2=R(LensVoidDiameter)-5, r1=R(LensVoidDiameter)+5, h=LensY/2, center=true);
        //endstop
        /*translate([0, -34, 25-2-2-10]) {
            difference () {
                cube([14, 20, 50], center=true);
                translate([0, R(LensVoidDiameter)+10+4.01, 0]) cylinder(r=R(LensVoidDiameter)+5, h=LensY + 29, center=true, $fn=200);
            }
            translate([0, 11, -14+9]) cylinder(r=R(22), h=4, center=true);
        }*/
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
        translate([0, 0, 2.5]) cylinder(r=R(6.5), h=5,center=true);
    }
    
    //removed, unneeded
    //translate([CapOffsetX,CapOffsetY - R(LensVoidDiameter) - 4, 1.25]) cylinder(r=R(15), h=1.5, center=true);
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
            translate([0, 0, 1-7.25]) cube([14-0.3-0.3, 14, 32+4], center=true);
            //lens void
            translate([0, R(LensVoidDiameter)+5+4, 0]) cylinder(r=R(LensVoidDiameter)+5, h=LensY + 29, center=true, $fn=200);
            //connector void
            translate([0,-8.3, -14.5]) cube([9, 8, 5], center=true);
            //bolts
            translate([2,-5,-13.25+OptoEndstopAdjustZ]) rotate([90, 0, 0]) cylinder(r=R(2.9),h=20,center=true, $fn=40);
            translate([2,-5,15+OptoEndstopAdjustZ]) rotate([90, 0, 0]) cylinder(r=R(2.9),h=20,center=true, $fn=40);
            //main void
            translate([-0.5,1,-3]) cube([8,20,15],center=true);
            //pathway void
            translate([0,6,-2]) cylinder(r=R(22), h=6, center=true);
            //smd voids
            translate([5, -6.5, -3]) cube([3.6, 1, 18], center=true);
            }
        }
}

module Debug () {
    Mount();
    translate([-CapOffsetX,-CapOffsetY,5.71]) rotate([0,0,currentAngle]) Cap();
    //color("green") RailMount();
    //translate([5, -38, -11.8+OptoEndstopAdjustZ]) rotate([0, -90, 0]) opto_endstop();
    //color("green") translate([5, -38, -11.8]) OptoEndstopMount();
    //translate([1.5, -38 + 2 -10, -11.8 + 11 + 2 +.75]) rotate([90, 0, 0])OptoEndstop();
}

module Base () {
    cube([1, 1, 1], center = true);
}

Render="Base";

if (Render=="Debug") {
    Debug();
} else if (Render=="Cap") {
    Cap();
} else if (Render=="MountFront") {
    MountFront();    
} else if (Render=="MountBack") {
    rotate([180, 0, 0]) MountBack();
} else if (Render=="RailMount") {
    RailMount();
} else if (Render=="OptoEndstopMount") {
    echo("Deprecated");
    //rotate([-90,0,0]) OptoEndstopMount();    
} else if (Render=="Base") {
    Base();
}