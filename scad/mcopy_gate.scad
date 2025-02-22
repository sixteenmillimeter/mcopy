use <./common/common.scad>;
use <./sprocketed_roller/scad/sprocketed_roller.scad>;
use <./filmless.scad>;
use <./bolex.scad>;
use <./arri_s.scad>;

PlateZ = 1.3 + 1;
PlateX = 35.1;
PlateY = 30.1;

FrontPlateVoidX = 14.2;
FrontPlateVoidY = 12.9;

BackPlateVoidX = 10.77;
BackPlateVoidY = 8.71;

FrontPlateClearanceX = 10.5;

FrontPlateSpacerX = 17;
FrontPlateSpacerZ = 0.5;

PerfSpacingX = 12.1;
PerfSpacingY = 22.75;

AlignmentX = 13.2;
AlignmentSpacingY = 22.7; 

PlateBoltSpacingY = 14;
PlateBoltX = 2.58;
BoltD = 2.75;
AlignmentD = 2;

Standard16OffsetY = 0.75;

Super16X = 12.4;
Super16Y = 7.5;

BodyZ = 50.66;
BodyY = 116.1;
BodyX = 18.44;

FrontBodyVoid = 12;

KeySpacingY = 57.2;
KeyZ = -13.25;

BearingOuterDiameter = 21.6;
BearingInnerDiameter = 8.05;

IdleRollerSpacingAY = 66;
IdleRollerSpacingBY = 102;

IdleRollerAZ = 31;
IdleRollerBZ = 44.2;

FrontPlatePostSpacingX = 87.75;

//DEBUG VARIABLES
FilmZ = -3.5;

GateBoltX = 21.2;
GateBoltSpacingY = 105;

SlideRailBoltSpacingY = 26;
SlideRailBoltSpacingZ = 24;

module m5_nut_bolt (pos = [0, 0, 0], rot = [0, 0, 0], bolt = 20, nut = 4, nutOffset = 0) {
    translate(pos) rotate(rot) {
        cylinder(r = R(5.25), h = bolt, center = true, $fn = 40);
        translate([0, 0, nutOffset]) cylinder(r = R(9), h = nut, center = true, $fn = 6);
        translate([-10, 0, nutOffset]) cube([20, 7.75, nut], center = true);
    }
}

module m2_5_nut (H, pad = 0) {
    scale([(2.6 + pad) / 3, (2.6 + pad) / 3, 1]) m3_nut(H);
}

module m2_5_nut_bolt (pos = [0, 0, 0], rot = [0, 0, 0], nut = 5, bolt = 30, pad = 0) {
    translate(pos) rotate(rot) {
        m2_5_nut(nut, pad);
        cylinder(r = R(2.75), h = bolt, center = true, $fn = 30);
    }
}

module m2_5_bolt_void (pos = [0, 0, 0], rot = [0, 0, 0], bolt = 20, cap = 6, pad = 0) {
    translate(pos) rotate(rot) {
        translate([0, 0, cap / 2]) cylinder(r = R(4.75), h = cap, center = true, $fn = 40);
        translate([0, 0, -(bolt / 2) + 0.1]) cylinder(r = R(2.75 + pad), h = bolt, center = true, $fn = 30);
    }
}

module bearing_void (pos = [0, 0, 0], rot = [0, 0, 0], width= 8) {
    fuzz = 0.3;
    translate (pos) rotate(rot) {
        difference () {
            cylinder(r = R(BearingOuterDiameter) + fuzz, h = width, center = true, $fn = 90);
        }
    }
}

module bearing_debug (pos = [0, 0, 0], rot = [0, 0, 0]) {
    $fn = 60;
    translate(pos) rotate(rot) difference() {
        color("green") cylinder(r = R(21.5), h = 7, center = true);
        cylinder(r = R(8), h = 7 + 1, center = true);
    }
}

module perf_void (pos = [0, 0, 0], Pad = 0) {
    translate(pos) {
        cube([2.5 + Pad, 1.99 + Pad, 10], center = true);
    }
}

module perfs_void (Pad = 0) {
    perf_void([PerfSpacingX / 2, (PerfSpacingY / 2) + Standard16OffsetY, 0], Pad);
    perf_void([-PerfSpacingX / 2, (PerfSpacingY / 2) + Standard16OffsetY, 0], Pad);
    perf_void([PerfSpacingX / 2, -(PerfSpacingY / 2) + Standard16OffsetY, 0], Pad);
    perf_void([-PerfSpacingX / 2, -(PerfSpacingY / 2) + Standard16OffsetY, 0], Pad);
}

module front_plate_void (pos = [0, 0, 0]) {
    translate(pos) {
        //large void
        cube([FrontPlateVoidX + 1.5, FrontPlateVoidY, PlateZ * 4], center = true);
        //film Clearance
        film_clearance_void([0, 0, -1]);
        //perfs
        perfs_void(Pad = 0.25);
    }
}

//BOM: 1, M2.5 hex nut, ISO 4032, Join the front_plate to the back_plate
module front_plate () {
    ExtraPlateZ = 1 / 2;
    difference () {
        union () {
            translate([0, 0, (ExtraPlateZ / 2) + 0.25]) rounded_cube([PlateX, PlateY, PlateZ + 1], d = 2, $fn = 25, center = true);
            //front plate spacer
            translate([-(PlateX / 2) + (FrontPlateSpacerX / 2), 0, (-PlateZ / 2) - (FrontPlateSpacerZ / 2)]) cube([FrontPlateSpacerX, PlateY, FrontPlateSpacerZ], center = true);
        }
        front_plate_void([(PlateX / 2) - (FrontPlateVoidX / 2) - 2.41, 0, -0.2]);
        film_entry_bevel([0, (PlateY / 2) + 0.25, -1.5]);
        film_entry_bevel([0, (-PlateY / 2) - 0.25, -1.5]);
        film_entry_side_bevel([(PlateX / 2) + 0.75, 0, -1.4]);
        //corners
        translate([(-PlateX / 2), (PlateY / 2) - 0.8, 0]) rotate([0, 0, 35]) cube([7.1 * 2, 7.1, PlateZ + ExtraPlateZ + 2.01], center = true);
        translate([(-PlateX / 2), (-PlateY / 2) + 0.8, 0]) rotate([0, 0, -35]) cube([7.1 * 2, 7.1, PlateZ + ExtraPlateZ + 2.01], center = true);
        //bolts
        translate([(-PlateX / 2) + PlateBoltX, PlateBoltSpacingY / 2, 0]) {
            cylinder(r = R(BoltD), h = 10, center = true , $fn = 30);
            translate([0, 0, 2]) cylinder(r = R(4.5), h = 3, center = true, $fn = 40);
        }
        translate([(-PlateX / 2) + PlateBoltX, -PlateBoltSpacingY / 2, 0]) {
            cylinder(r = R(BoltD), h = 10, center = true , $fn = 30);
            translate([0, 0, 2]) cylinder(r = R(4.5), h = 3, center = true, $fn = 40);
        }
        //alignment rod voids
        translate([(-PlateX / 2) + AlignmentX, AlignmentSpacingY / 2, 0]) {
            cylinder(r = R(AlignmentD + 0.45), h = 10, center = true , $fn = 30);
            translate([0, 0, 2.2]) cylinder(r1 = R(AlignmentD + 0.45), r2 = R(AlignmentD + 0.45) + 0.5, h = 1 , center = true , $fn = 30);
        }
        translate([(-PlateX / 2) + AlignmentX, -AlignmentSpacingY / 2, 0]) {
            cylinder(r = R(AlignmentD + 0.45), h = 10, center = true , $fn = 30);
            translate([0, 0, 2.2]) cylinder(r1 = R(AlignmentD + 0.45), r2 = R(AlignmentD + 0.45) + 0.5, h = 1 , center = true , $fn = 30);
        }
        //gate bolt and nut void
        translate([-6, 0, 0]) cylinder(r = R(BoltD), h = 20, center = true, $fn = 40);
        translate([-6, 0, 10.5]) m2_5_nut(20);

        //gate_slide_alignment_nut_bolt([-14, 0, -1.3]);
    }
}

module gate_mask_text_void (string = "example", pos = [0, 0, 0], rot = [0, 0, 0], letter_size = 3, letter_height = 2) {
    translate(pos) rotate(rot) linear_extrude(height = letter_height) {
        text(string, size = letter_size, font = "Liberation Sans:style=Bold", halign = "center", valign = "center", $fn = 16);
    }    
}

module gate_mask_text (format = "") {
    Z = -3;
    if (format == "standard16") {
        gate_mask_text_void("16mm", pos = [11, 0, Z], rot = [90, 0, 90]);
    } else if (format == "super16") {
        gate_mask_text_void("super16", pos = [11, 0, Z], rot = [90, 0, 90]);
    }
}

module gate_mask_slide (pos = [0, 0, 0], pad = 0.0, format = "") {
    Z = -1;
    GuideAdjust = -1.5;
    FormatBevelY = format == "super16" ? 4.5 : 5;
    PadZ = format == "" ? 0.3 : 0;
    FrontMaskZ = 0.375;

    translate(pos) {
        difference () {
            union () {
                translate([0, 0, Z]) cube([20, FrontPlateVoidY + pad, PlateZ + 2], center = true);
                translate([-8, 0, Z]) cube([20, 8 + pad, PlateZ + 2 + PadZ], center = true);
                intersection () {
                    translate([0, 0, Z]) cube([20, 100, PlateZ + 2], center = true);
                    union () {
                        translate([0, FrontPlateVoidY / 2 + GuideAdjust, Z]) rotate([45, 0, 0]) cube([20, PlateZ + 2 + pad, PlateZ + 2 + pad], center = true);
                        translate([0, -FrontPlateVoidY / 2 - GuideAdjust, Z]) rotate([45, 0, 0]) cube([20, PlateZ + 2 + pad, PlateZ + 2 + pad], center = true);
                    }
                }
                if (format != "") {
                    //tab
                    translate([(20 / 2) + 0.1, 0, -3.5]) difference () {
                        translate([0, 0, 1]) rotate([0, 90, 0]) rounded_cube([PlateZ + 4, FrontPlateVoidY + 8, 2], d = 2, $fn = 20, center = true);
                        film_entry_side_bevel([1.5, 0, 4.5]);
                    }
                }
            }
            // difference
            if (format != "") {
                translate([0, 0, ((PlateZ + 2) / 2) - Z - FrontMaskZ]) cube([100, 100, PlateZ + 2], center = true); 
                //alignment
                translate([-14.5, 0, 0]) {
                    cylinder(r = R(BoltD), h = 20, center = true, $fn = 40);
                    translate([0, 0, -4]) cylinder(r = R(4.5), h = 3, center = true, $fn = 40);
                }
                gate_mask_text(format);
                difference () {
                    film_clearance_void([0, 0, 1 + 0.2]);
                    if (format == "standard16" || format == "super16") {
                        difference () {
                            cube([BackPlateVoidX + 10, BackPlateVoidY + 6, 10], center = true);
                            translate([0, BackPlateVoidY / 2 + FormatBevelY, 4.5]) rotate([-20, 0, 0]) cube([FrontPlateClearanceX + 3, 10, 10], center = true);
                            translate([0, -BackPlateVoidY / 2 - FormatBevelY, 4.5]) rotate([20, 0, 0]) cube([FrontPlateClearanceX + 3, 10, 10], center = true);
                        }
                    }
                }
            }
            
            if (format == "standard16") {
                translate([0, 0, 0]) {
                    cube([BackPlateVoidX, BackPlateVoidY, 10], center = true);
                    translate([0, 0, -4.75]) trap_cube(height = 4, top_x = BackPlateVoidX, top_y = BackPlateVoidY, bottom_x = BackPlateVoidX + 4, bottom_y = BackPlateVoidY + 4, wall_thickness = 50);
                }
            } else if (format == "super16") {
                translate([(-BackPlateVoidX / 2) + (Super16X / 2), 0, 0]) {
                    cube([Super16X, Super16Y, 10], center = true);
                    translate([0, 0, -4.75]) trap_cube(height = 4, top_x = Super16X, top_y = Super16Y, bottom_x = Super16X + 4, bottom_y = Super16Y + 4, wall_thickness = 50);
                }           
            }
        }
    }
}

module gate_mask_slide_standard16 (pos = [0, 0, 0]) {
    gate_mask_slide(pos, pad = -0.3, format = "standard16");
}

module gate_mask_slide_super16 (pos = [0, 0, 0]) {
    gate_mask_slide(pos, pad = -0.3, format = "super16");
}

module film_clearance_void (pos = [0, 0, 0]) {
    Z = -0.5;
    $fn = 30;
    translate(pos) {
        difference () {
            union () {
                //film clearance 
                cube([FrontPlateClearanceX, PlateY + 1, PlateZ], center = true);
                //bevels
                intersection () {
                    union () {
                        translate([FrontPlateClearanceX / 2, 0, 0]) rotate([0, 45, 0]) cube([2, PlateY + 1, 2], center = true);
                        translate([-FrontPlateClearanceX / 2, 0, 0]) rotate([0, 45, 0]) cube([2, PlateY + 1, 2], center = true);
                    }
                    cube([FrontPlateClearanceX + 40, PlateY + 1, PlateZ], center = true);
                }
            }
            translate([(FrontPlateClearanceX / 2) + 1.2, 0, 1]) rotate([90, 0, 0]) cylinder(r = R(2), h = PlateY + 2, center = true);
            translate([(-FrontPlateClearanceX / 2) - 1.2, 0, 1]) rotate([90, 0, 0]) cylinder(r = R(2), h = PlateY + 2, center = true);
            translate([(FrontPlateClearanceX / 2) + 1.2, 0, -1]) rotate([90, 0, 0]) cylinder(r = R(2), h = PlateY + 2, center = true);
            translate([(-FrontPlateClearanceX / 2) - 1.2, 0, -1]) rotate([90, 0, 0]) cylinder(r = R(2), h = PlateY + 2, center = true);
        }
    }
}

module film_entry_bevel (pos = [0, 0, 0]) {
    $fn = 50;
    D = 4;
    Offset = 2.2;
    translate(pos) difference() {
        cube([40, 5, 5], center = true);
        translate([0, Offset, Offset]) rotate([0, 90, 0]) cylinder(r = R(D), h = 40 + 1, center = true);
        translate([0, -Offset, Offset]) rotate([0, 90, 0]) cylinder(r = R(D), h = 40 + 1, center = true);
        translate([0, Offset, -Offset]) rotate([0, 90, 0]) cylinder(r = R(D), h = 40 + 1, center = true);
        translate([0, -Offset, -Offset]) rotate([0, 90, 0]) cylinder(r = R(D), h = 40 + 1, center = true); 
    }
}

module film_entry_side_bevel (pos = [0, 0, 0]) {
    $fn = 50;
    D = 4;
    Offset = 2.2;
    translate(pos) difference() {
        cube([5, 40, 5], center = true);
        translate([-Offset, 0, Offset]) rotate([90, 0, 0]) cylinder(r = R(D), h = 40 + 1, center = true);
        translate([-Offset, 0, -Offset]) rotate([90, 0, 0]) cylinder(r = R(D), h = 40 + 1, center = true);
    }
}

module back_plate_void (pos = [0, 0, 0]) {
    translate(pos) {
        //large void
        translate([(PlateX / 2) - (20 / 2) - (FrontPlateVoidX / 2) , 0, 0]) {
            cube([20, FrontPlateVoidY + 0.2, 10], center = true);
            gate_mask_slide( pad = 0.3);
        }
        //film clearance 
        film_clearance_void([0, 0, 1 + 0.2]);
        //perfs
        perfs_void();
    }
}

module gate_slide_alignment_nut_bolt (pos = [0, 0, 0], rot = [90, 0, 90]) {
    translate(pos) rotate(rot) {
        rotate([0, 0, 30])  m2_5_nut(2.5);
        translate([0, 0, -15 / 2]) cylinder(r = R(2.75), h = 20, center = true, $fn = 30);
    }}

//BOM: 1, M2.5 hex cap bolt 10mm, N/A, Join the front_plate to the back_plate
module back_plate () {
    RodZ = 5;
    ExtraPlateZ = 1;
    difference () {
        union () {
            rounded_cube([PlateX, PlateY, PlateZ], d = 2, $fn = 25, center = true);
            translate([0, 0, -(PlateZ / 2) - (ExtraPlateZ / 2)]) rounded_cube([PlateX, PlateY, 2], d = 2, $fn = 25, center = true);
        }
        back_plate_void([(PlateX / 2) - (FrontPlateVoidX / 2) - 2.41, 0, 0]);
        //corners
        translate([(-PlateX / 2), (PlateY / 2) - 0.8, 0]) rotate([0, 0, 35]) cube([7.1 * 2, 7.1, 10], center = true);
        translate([(-PlateX / 2), (-PlateY / 2) + 0.8, 0]) rotate([0, 0, -35]) cube([7.1 * 2, 7.1, 10], center = true);
        //bolts
        translate([(-PlateX / 2) + PlateBoltX, PlateBoltSpacingY / 2, 0]) cylinder(r = R(BoltD), h = 10, center = true , $fn = 30);
        translate([(-PlateX / 2) + PlateBoltX, -PlateBoltSpacingY / 2, 0]) cylinder(r = R(BoltD), h = 10, center = true , $fn = 30);
        
        film_entry_bevel([0, (PlateY / 2) + 0.25, 1.5]);
        film_entry_bevel([0, (-PlateY / 2) - 0.25, 1.5]);
        film_entry_side_bevel([(PlateX / 2) + 0.25, 0, 1.4]);
        //gate_slide_alignment_nut_bolt([-14, 0, 1.5]);

    }
    
    //alignment rods
    translate([(-PlateX / 2) + AlignmentX, AlignmentSpacingY / 2, RodZ / 2]) cylinder(r = R(AlignmentD), h = RodZ, center = true , $fn = 30);
    translate([(-PlateX / 2) + AlignmentX, -AlignmentSpacingY / 2, RodZ / 2]) cylinder(r = R(AlignmentD), h = RodZ, center = true , $fn = 30);


}

module sprocketed_roller_text (pos = [0, 0, 0], rot = [0, 0, 0], font_size = 3, radius = 6, chars = "", h = 1) {
    PI = 3.14159;
    circumference = 2 * PI * radius;
    chars_len = len(chars);
    step_angle = 30;
    echo("Chars", step_angle);
    translate(pos) rotate(rot) {
        for (i = [0 : chars_len - 1]) {
            rotate(-i * step_angle) {
                translate([0, radius + font_size / 2, 0]) rotate([180, 0, 0]) {
                    linear_extrude(height = h) {
                        text(chars[i], font = "Liberation Sans:style=Bold", size = font_size, valign = "center", halign = "center");
                    }
                }
            }
        }
    }
}

module sprocketed_roller_16mm (pos = [0, 0, 0], rot = [0, 0, 0], side = "TAKEUP") {
    $fn = 160;
    TaperD = 19.05;
    TaperH = 5;
    AdjustRollers = 0.25;
    //θ = (arc length / radius) * (360° / 2π)
    AdjustRollersAngle = (AdjustRollers / (TaperD / 2)) * (360 / (2 * PI));
    echo("Adjust Rollers Angle", AdjustRollersAngle);
    FeedSprocketAngle = -16 + AdjustRollersAngle;
    TakeupSprocketAngle = 7 + AdjustRollersAngle;
    RotateSprocketZ = side == "TAKEUP" ? TakeupSprocketAngle : FeedSprocketAngle;
    translate(pos) rotate(rot) {
        difference() {
            union () {
                rotate([0, 0, RotateSprocketZ]) sprocketed_roller(bevel = true);
                translate([0, 0, 3.85]) cylinder(r1 = R(TaperD), r2 = R(TaperD - TaperH), h = TaperH, center = true);
                //touches bearing
                translate([0, 0, 0.3]) cylinder(r = R(11), h = 9.5, center = true, $fn = 60);
                translate([0, 0, -10]) cylinder(r = R(8), h = 17, center = true, $fn = 60);
                translate([0, 0, -21.15]) cylinder(r = R(6), h = 10, center = true);
            }
            //registration mark
            translate([-20, 0, 16.15]) rotate([45, 0, 0]) cube([40, 1, 1], center = true);
            translate([0, 0, 15.9]) cylinder(r = R(2.5), h = 1, center = true, $fn = 30);
            //pressure relief hole
            //cylinder(r = R(2), h = 50, center = true, $fn = 30);
            //void for key
            translate([0, 0, -21.15 - 5]) cube([7.95 + 1, 2.37, 10], center = true);
            translate([(-15 / 2) - (6 / 2) + 0.2, 0, -31]) cube([15, 15, 40], center = true);
            //m2.5 bolt
            translate([0, 0, -15.85]) rotate([0, 90, 0]) cylinder(r = R(2.75), h = 30, center = true, $fn = 30);
            //
            sprocketed_roller_text([0, 0, -1], chars = side);
        }
        
    }
}

//BOM: 2, M2.5 hex cap bolt 16mm, ISO 4762, Attaches the nut to the sprocketed roller
//BOM: 2, M2.5 hex nut, ISO 4032, Attaches the bolt to the nut
module sprocketed_roller_nut_16mm (pos = [0, 0, 0], rot = [0, 0, 0]) {
    $fn = 80;
    NutOuterD = 18;
    translate(pos) rotate(rot) {
        difference() {
            union () {
                translate([0, 0, -5]) cylinder(r = R(11), h = 7, center = true);
                translate([0, 0, -6.5]) cylinder(r = R(NutOuterD), h = 8, center = true);
            }
            translate([0, 0, 11.6]) difference () {
                union () {
                    cylinder(r = R(8.7), h = 40, center = true);
                    translate([0, 0, -12.6 - 7.5]) cylinder(r = R(6.5), h = 8, center = true);
                }
                translate([-(15 / 2) - (6 / 2), 0, -5]) cube([15, 15, 40], center = true);
            }
            translate([0, 0, -5.85]) rotate([0, 90, 0]) {
                cylinder(r = R(2.75), h = 30, center = true, $fn = 30);
                translate([0, 0, -21]) cylinder(r = R(4.75), h = 30, center = true, $fn = 30);
                translate([0, 0, 22]) m2_5_nut(30);
            }
            //taper
            translate([0, 0, -10]) cylinder(r1 = R(8), r2 = R(5.5), h = 2, center = true);
        }
    }
}

//BOM: 2, M5 hex cap bolt 20mm, N/A, Attach gate to projector
//BOM: 2, M5 hex nut, N/A, Attach front_block to gate
//BOM: 6, M2.5 hex cap bolt 16mm, N/A, Attach idle_roller to gate
//BOM: 2, M2.5 hex cap bolt 25mm, N/A, Attach filter_holder to gate
//BOM: 4, M2.5 hex cap bolt 10mm, N/A, Attach slide_rail to gate
//BOM: 12, M2.5 hex nut, ISO 4032, Attach idle_roller and filter_holder and slide_rail to gate
//BOM: 2, M3 hex nut, N/A, Attach slide_catch to gate
//BOM: 2, 608-RS Ball Bearing, 608-RS, Center sprocketed_roller in gate voids and allow for smooth rotation
module body (pos = [0, 0, 0], gauge = "16mm") {
    SlideRailsOffsetZ = -5;
    translate(pos) {
        difference() {
            union () {
                cube([BodyX, BodyY, BodyZ], center = true);
            }

            //bearings for keys
            bearing_void([-2, KeySpacingY / 2, (BodyZ / 2) + KeyZ], [0, 90, 0], width = BodyX);
            bearing_void([-2, -KeySpacingY / 2, (BodyZ / 2) + KeyZ], [0, 90, 0], width = BodyX);

            translate([0, KeySpacingY / 2, (BodyZ / 2) + KeyZ]) rotate([0, 90, 0]) cylinder(r = R(12.5), h = BodyX + 1, center = true, $fn = 60);
            translate([0, -KeySpacingY / 2, (BodyZ / 2) + KeyZ]) rotate([0, 90, 0]) cylinder(r = R(12.5), h = BodyX + 1, center = true, $fn = 60);
        
            //front block
            translate([0, 0, (BodyZ / 2) - (FrontBodyVoid / 2) + 0.1]) cube([BodyX + 1, PlateY + 2, FrontBodyVoid], center = true);
        
            //side light channel
            //translate([BodyX - 1.25, 0, 0]) cube([BodyX, PlateY + 2, BodyZ + 1], center = true);
        
            //slide channel
            translate([-BodyX + 7.5, 0, 0]) cube([BodyX, PlateY + 2, BodyZ + 1], center = true);

            //slide rails bolts
            m2_5_nut_bolt([6, SlideRailBoltSpacingY / 2, (SlideRailBoltSpacingZ / 2) + SlideRailsOffsetZ ], [0, 90, 0], nut = 10, pad = 0.1);
            m2_5_nut_bolt([6, -SlideRailBoltSpacingY / 2, (SlideRailBoltSpacingZ / 2) + SlideRailsOffsetZ], [0, 90, 0], nut = 10, pad = 0.1);
            m2_5_nut_bolt([6, SlideRailBoltSpacingY / 2, (-SlideRailBoltSpacingZ / 2) + SlideRailsOffsetZ], [0, 90, 0], nut = 10, pad = 0.1);
            m2_5_nut_bolt([6, -SlideRailBoltSpacingY / 2, (-SlideRailBoltSpacingZ / 2) + SlideRailsOffsetZ], [0, 90, 0], nut = 10, pad = 0.1);
        
            //filter holder bolts
            m2_5_nut_bolt([0, SlideRailBoltSpacingY / 2, -5], [0, 90, 0], nut = 12, pad = 0.1);
            m2_5_nut_bolt([0, -SlideRailBoltSpacingY / 2, -5], [0, 90, 0], nut = 12, pad = 0.1);

            //idle rollers
            m2_5_nut_bolt([-2, IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerAZ], [0, 90, 0], nut = BodyX, bolt = BodyX + 40, pad = 0.1);
            m2_5_nut_bolt([-2, -IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerAZ], [0, 90, 0], nut = BodyX, bolt = BodyX + 40, pad = 0.1);
            m2_5_nut_bolt([-2, IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerBZ], [0, 90, 0], nut = BodyX, bolt = BodyX + 40, pad = 0.1);
            m2_5_nut_bolt([-2, -IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerBZ], [0, 90, 0], nut = BodyX, bolt = BodyX + 40, pad = 0.1);
            m2_5_nut_bolt([-2, IdleRollerSpacingBY / 2, (BodyZ / 2) - IdleRollerBZ], [0, 90, 0], nut = BodyX, bolt = BodyX + 40, pad = 0.1);
            m2_5_nut_bolt([-2, -IdleRollerSpacingBY / 2, (BodyZ / 2) - IdleRollerBZ], [0, 90, 0], nut = BodyX, bolt = BodyX + 40, pad = 0.1);
        
            //mounting bolts
            translate([0, GateBoltSpacingY / 2, (BodyZ / 2) - GateBoltX]) rotate([0, 90, 0]) cylinder(r = R(7), h = 40, center = true, $fn = 40);
            translate([0, -GateBoltSpacingY / 2, (BodyZ / 2) - GateBoltX]) rotate([0, 90, 0]) cylinder(r = R(7), h = 40, center = true, $fn = 40);
        
            //front plate post voids
            translate([0, FrontPlatePostSpacingX / 2, BodyZ / 2]) cylinder(r = R(8), h = 12, center = true, $fn = 80);
            translate([0, -FrontPlatePostSpacingX / 2, BodyZ / 2]) cylinder(r = R(8), h = 12, center = true, $fn = 80);
            
            //spring void
            translate([4, 0, 2.5]) cylinder(r = R(6.5), h = BodyZ, center = true, $fn = 60);
        
            //void for hex key
            translate([-4.2, KeySpacingY / 2, BodyZ / 2]) cylinder(r = R(5), h = 20, center = true, $fn = 40);
            translate([-4.2, -KeySpacingY / 2, BodyZ / 2]) cylinder(r = R(5), h = 20, center = true, $fn = 40);
            
            //voids for slide catch
            slide_catch_nut_void([-3, 24, -(BodyZ / 2) - 5]);
            slide_catch_nut_void([-3, 42, -(BodyZ / 2) - 5 ]);
            
            //voids for m5 nut
            m5_nut_bolt([0, FrontPlatePostSpacingX / 2, 22], [0, 0, 0], bolt = 30, nutOffset = -6);
            m5_nut_bolt([0, -FrontPlatePostSpacingX / 2, 22], [0, 0, 0], bolt = 30, nutOffset = -6);

        }

    }
}

module idle_roller_16mm (pos = [0, 0, 0], rot = [0, 0, 0]) {
    $fn = 80;
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cylinder(r = R(11), h = 18, center = true);
            }

            translate([0, 0, 18 - 2]) cylinder(r = R(8.25), h = 18, center = true);
            
            cylinder(r = R(6.3), h = 40, center = true);

            for (i = [0 : $fn]) {
                rotate([0, 0, i * (360 / $fn)]) translate([10, 0, 0]) rotate([90, 0, 0]) scale([1, 2, 1]) cylinder(r = R(12), h = 10, center = true, $fn = 50);
            }
        }
    }
}

//1x m2.5 bolt - 25mm
module idle_roller_post_16mm (pos = [0, 0, 0], rot = [0, 0, 0]) {
    $fn = 80;
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cylinder(r = R(5.7), h = 19, center = true);
                translate([0, 0, (19 / 2) - (2 / 2)]) cylinder(r = R(7.7), h = 2, center = true);
            }
            cylinder(r = R(2.75), h = 40, center = true);
            translate([0, 0, (19 / 2) - (3 / 2) + 0.01]) cylinder(r = R(4.75), h = 3, center = true);
        }
    }
}

module slide_rail_bolt_slot (pos = [0, 0, 0], rot = [0, 0, 0], BoltSlotY, BoltSlotOffsetY) {
    translate(pos) rotate(rot) {
        cylinder(r = R(2.75), h = 10, center = true, $fn = 40);
        translate([0, BoltSlotOffsetY, 0]) cylinder(r = R(2.75), h = 10, center = true, $fn = 40);
        translate([0, BoltSlotOffsetY / 2, 0]) cube([2.75, BoltSlotY, 10], center = true);

        translate([0, 0, -5]) cylinder(r = R(5), h = 10, center = true, $fn = 40);
        translate([0, BoltSlotOffsetY, -5]) cylinder(r = R(5), h = 10, center = true, $fn = 40);
        translate([0, BoltSlotOffsetY / 2, -5]) cube([5, BoltSlotY, 10], center = true);
    }
}

module slide_rail (pos = [0, 0, 0], side = "A") {
    OffsetY = side == "A" ? 1.5 : -1.5;
    OffsetZ = 2;
    SlideY = side == "A" ? -6 : 6;
    SlideDiffY = side == "A" ? 8.5 : -8.5;
    BoltSlotY = 1.5;
    BoltSlotOffsetY = side == "A" ? BoltSlotY : -BoltSlotY;
    BoltsOffsetY = side == "A" ? -1 / 2 : 1 / 2;
    NutVoidY = side == "A" ? -4.5 : 4.5;
    translate(pos) {
        difference() {
            cube([7, 9, BodyZ - 16], center = true);
            translate([0 , SlideDiffY, 0]) cube([7 + 1, 9, BodyZ - 16 + 1], center = true);
            translate([1.25, SlideY, 0]) cube([2.4, 10, BodyZ - 12 + 1], center = true);
            translate([0, OffsetY, OffsetZ]) {
                slide_rail_bolt_slot([0, BoltsOffsetY, SlideRailBoltSpacingZ / 2], [0, 90, 0], BoltSlotY, BoltSlotOffsetY);
                slide_rail_bolt_slot([0, BoltsOffsetY, -SlideRailBoltSpacingZ / 2], [0, 90, 0], BoltSlotY, BoltSlotOffsetY);
            }
            translate([0, NutVoidY, ((BodyZ - 16) / 2) - (3 / 2) + 0.01]) cube([7 + 1, 7 , 3], center = true);
        }
    }
}

module slide (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Extra = 5;
    translate(pos) rotate(rot) {
        difference() {
            union () {
                translate([0, 0, -Extra / 2])cube([6.5, 13, BodyZ + Extra], center = true);
                translate([1.25, 0, -Extra / 2]) cube([1.7, 20, BodyZ + Extra], center = true);
                translate([0, 0, (BodyZ / 2) - 2.5]) cube([6.5, 20.5, 10], center = true);
            }
            translate([1, 0, (BodyZ / 2) - 1.1]) cube([6.5, 20.5 + 1, 8], center = true);
            //bolts
            translate([1/2, PlateBoltSpacingY / 2, (BodyZ / 2) - 3]) {
                cylinder(r = R(BoltD), h = 10, center = true , $fn = 30);
                translate([0, 0, -6]) m2_5_nut(3);
                translate([0, 2, -6]) m2_5_nut(3);
            }
            translate([1/2, -PlateBoltSpacingY / 2, (BodyZ / 2) - 3]) {
                cylinder(r = R(BoltD), h = 10, center = true , $fn = 30);
                translate([0, 0, -6]) m2_5_nut(3);
                translate([0, -2, -6]) m2_5_nut(3);
            }
            //hole for notch
            translate([0, 0, 23 - 26.7]) rotate([0, 90, 0]) {
                cylinder(r = R(6), h = 20, center = true, $fn = 80);
                translate([0, 0, -3]) cylinder(r2 = R(6), r1 = R(8), h = 2, center = true, $fn = 80);
            }
            //notch for catch
            translate([0, 10, -21]) rotate([45, 0, 0]) cube([10, 4.9, 4.9], center = true);
        
            //gate_slide_alignment_nut_bolt([0, 0, (BodyZ / 2) - 0.9]);
        }
    }
}

module slide_catch_nut_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        union () {
            cylinder(r = R(3.25), h = 30, center = true, $fn = 30);
            translate([0, 0, 10]) m3_nut(3);
            translate([-10, 0, 10]) cube([20, 5.7, 3], center = true); 
        }
    }
}

module slide_catch_slot_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    D  = 4;
    Length = 5;
    translate(pos) rotate(rot) {
        translate([0, Length / 2, 0]) cylinder(r = R(D), h = 5, center = true, $fn = 40);
        cube([D, Length, 5], center = true);
        translate([0, -Length / 2, 0]) cylinder(r = R(D), h = 5, center = true, $fn = 40);
    }
}

module slide_catch (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Length = 54;
    Thickness = 2.5;
    SlideCatchVoidsOffset = 6;
    SlideCatchVoidsDistance = 18;
    translate(pos) rotate(rot) {
        difference () {
            cube([8, Length, Thickness], center = true);
            translate([0, -(Length / 2)  - 0.25, -1]) rotate([45, 0, 0]) cube([8 + 1, 3, 10], center = true);
            translate([0, -(Length / 2)  - 0.9, -1]) cube([8 + 1, 3, 10], center = true);
            slide_catch_slot_void([0, SlideCatchVoidsOffset, 0]);
            slide_catch_slot_void([0, SlideCatchVoidsOffset - SlideCatchVoidsDistance, 0]);
        }
        translate([0, Length / 2, (5 / 2) - (Thickness / 2)]) cube([8, Thickness, 5], center = true);
    }
}

module front_block_post (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cylinder(r = R(7.5), h = 5, center = true, $fn = 80);
                translate([0, 0, -5 / 2]) sphere(r = R(7.5), $fn = 80);
            }
            translate([0, 0, -9.5]) cube([10, 10, 10], center = true);
        }
    }
}

module front_block_bolt_and_nut_void (pos = [0, 0, 0], rot = [0, 0, 0]) {
    translate(pos) rotate(rot) {
        rotate([0, 0, 30]) m2_5_nut(2.25);
        translate([0, 15, 0]) cube([4.95, 30, 2.25], center = true);
        cylinder(r = R(2.75), h = 10, center = true, $fn = 40);
    }
}

module front_block_film_path (pos = [0, 0, 0], rot = [0, 0, 0]) {
    Nut = 4;
    Width = 16.75;
    CircularOffsetY = -7;
    CircularOffsetZ = -11;
    translate(pos) rotate(rot) {
        difference () {
            cube([Width, 13, 17.5], center = true);
            translate([0, CircularOffsetY, CircularOffsetZ]) rotate([0, 90, 0]) cylinder(r = R(20), h = Width + 1, center = true, $fn = 120);
            translate([0, CircularOffsetY, CircularOffsetZ]) rotate([0, 90, 0]) cylinder(r = R(23.5), h = 14.75, center = true, $fn = 120);
        
            translate([10 / 2, 0, 5]) rotate([90, 0, 0]) {
                cylinder(r = R(2.75), h = 20, center = true, $fn = 40);
                translate([0, 0, (-13 / 2) + (Nut / 2) - 0.01]) cylinder(r = R(4.75), h = Nut, center = true, $fn = 30);
            }
            translate([-10 / 2, 0, 5]) rotate([90, 0, 0]) {
                cylinder(r = R(2.75), h = 20, center = true, $fn = 40);
                translate([0, 0, (-13 / 2) + (Nut / 2) - 0.01]) cylinder(r = R(4.75), h = Nut, center = true, $fn = 30);
            }
        }
    }
}

//BOM: 2, M5 hex cap bolt 25mm, N/A, Attach the front_block to the body
//BOM: 4, M2.5 hex nut, N/A, Attach the film path blocks
module front_block (pos = [0, 0, 0], rot = [0, 0, 0]) {
    FrontBlockFilmPathOffset = 12.625;
    translate(pos) rotate(rot) {
        difference () {
            union () {
                cube([BodyX, BodyY, 6.5], center = true);
                translate([(BodyX / 2) + ((48 - BodyX) / 2) - 0.01, 0, 0]) cube([48 - BodyX, 58.5, 6.5], center = true);
                front_block_post([0, FrontPlatePostSpacingX / 2, -(20 / 2) + 6]);
                front_block_post([0, -FrontPlatePostSpacingX / 2, -(20 / 2) + 6]);
            }
            translate([(BodyX / 2) + ((48 - BodyX) / 2) - 5.5, 0, 0]) cylinder(r = R(19), h = 6.5 + 1, center = true, $fn = 100);

            front_block_bolt_and_nut_void([FrontBlockFilmPathOffset, 24.5, -0.5], [-90, 0, 0]);
            front_block_bolt_and_nut_void([FrontBlockFilmPathOffset + 10, 24.5, -0.5], [-90, 0, 0]);

            front_block_bolt_and_nut_void([FrontBlockFilmPathOffset, -24.5, -0.5], [-90, 0, 0]);
            front_block_bolt_and_nut_void([FrontBlockFilmPathOffset + 10, -24.5, -0.5], [-90, 0, 0]);
            
            //m5 bolts
            translate([0, FrontPlatePostSpacingX / 2, 0]) cylinder(r = R(5.25), h = 40, center = true, $fn = 40);
            translate([0, -FrontPlatePostSpacingX / 2, 0]) cylinder(r = R(5.25), h = 40, center = true, $fn = 40);
            
            //countersink bolts
            translate([4.25, 0, -10 / 2]) cylinder(r = R(6), h = 10, center = true, $fn = 40);
            translate([-5, PlateBoltSpacingY / 2, -10 / 2]) cylinder(r = R(6), h = 10, center = true, $fn = 40);
            translate([-5, 0, -10 / 2]) cube([6, PlateBoltSpacingY, 10], center = true);
            translate([-5, -PlateBoltSpacingY / 2, -10 / 2]) cylinder(r = R(6), h = 10, center = true, $fn = 40);
        
            //for pegs
            translate([12.25, 0, -1.75]) {
                translate([3.5, 0, 0]) rounded_cube([33.6, 31.6, 4], d = 3, center = true, $fn = 30);
                translate([-5, 12, -2]) {
                    cylinder(r = R(2.75), h = 20, center = true, $fn = 40);
                    translate([0, 0, 7]) m2_5_nut(4);
                }
                translate([-5, -12, -2]) {
                    cylinder(r = R(2.75), h = 20, center = true, $fn = 40);
                    translate([0, 0, 7]) m2_5_nut(4);
                }
            }
        }
    }
}

module front_block_peg (pos = [0, 0, 0], rot = [0, 0, 0], h = 10) {
    BaseX = 1.4;
    translate(pos) rotate(rot) {
        translate([0, 0,  h / 4]) cube([1.8, 1.4, h / 2], center = true);
        difference () {
            cube([1.8, 1.4, h], center = true);
            translate([1.3, 0, -h / 2]) rotate([0, 10, 0]) cube([2, 1.75 + 1, h], center = true);
            translate([-1.3, 0, -h / 2]) rotate([0, -10, 0]) cube([2, 1.75 + 1, h], center = true);
            translate([0, -1.05, -h / 2]) rotate([10, 0, 0]) cube([2 + 1, 1.75, h], center = true);
            translate([0, 1.05, -h / 2]) rotate([-10, 0, 0]) cube([2 + 1, 1.75, h], center = true);
            translate([0, 0, -3.5]) difference() {
                cube([2, 2, 5], center = true);
                translate([0, 0, 5 / 2]) rotate([0, 90, 0]) cylinder(r = R(1.3), h = 2 + 1, center = true, $fn = 30);
            }
        }
    }
}

//BOM: 2, M2.5 hex cap bolt 10mm, N/A, Fasctens front_block_pegs to front_block
module front_block_pegs (pos = [0, 0, 0], rot = [0, 0, 0]) {
    PegSpacingY = 24.2;
    BoltSpacingY = 24;
    translate(pos) rotate(rot) {
        difference () {
            translate([5.5, 0, 0]) rounded_cube([33, 31, 3], d = 3, center = true, $fn = 30);
            translate([-6, 0, 0]) cylinder(r = R(8), h = 3 + 1, center = true, $fn = 40);
            translate([9, 0, 0]) rounded_cube([15, 12, 3 + 1], d = 3, center = true, $fn = 30);

            translate([-3, BoltSpacingY / 2, 0]) cylinder(r = R(2.75), h = 10, center = true, $fn = 40);
            translate([-3, -BoltSpacingY / 2, 0]) cylinder(r = R(2.75), h = 10, center = true, $fn = 40);

            translate([-3, BoltSpacingY / 2, -4.5]) cylinder(r = R(5), h = 10, center = true, $fn = 40);
            translate([-3, -BoltSpacingY / 2, -4.5]) cylinder(r = R(5), h = 10, center = true, $fn = 40);
        }
        front_block_peg([1.75, (PerfSpacingY / 2) + Standard16OffsetY, -6 / 2], h = 7);
        front_block_peg([1.75, (-PerfSpacingY / 2) + Standard16OffsetY, -6 / 2], h = 7);

        front_block_peg([1.75 + PerfSpacingX, (PerfSpacingY / 2) + Standard16OffsetY, -4.75 / 2], h = 7);
        front_block_peg([1.75 + PerfSpacingX, (-PerfSpacingY / 2) + Standard16OffsetY, -4.75 / 2], h = 7);
        
    }
}

module filter_block (pos = [0, 0, 0], rot = [0, 0, 0], side = "A") {
    BoltOffsetZ =  -1.25;
    translate(pos) rotate(rot) {
        difference () {
            cube([24, 33, 25.4], center = true);
            cube([24 + 1, 18, 25.4 + 1], center = true);
            translate([0, 0, 7]) cube([24 + 1, 26, 3.25], center = true);
            translate([0, 0, -10]) cube([24 + 1, 26, 3.25], center = true);
            
            translate([0, 0, 3.5]) cube([24 + 1, 26, 1.5], center = true);
            translate([0, 0, -6.5]) cube([24 + 1, 26, 1.5], center = true);
            //
            m2_5_bolt_void([8, 13.1, BoltOffsetZ], [0, 90, 0], bolt = 24);
            m2_5_bolt_void([8, -13.1, BoltOffsetZ], [0, 90, 0], bolt = 24);
            
            m2_5_bolt_void([-21, 13.1, BoltOffsetZ + (SlideRailBoltSpacingZ / 2)], [0, -90, 0], bolt = 26, pad = 0.2);
            m2_5_bolt_void([-21, -13.1, BoltOffsetZ + (SlideRailBoltSpacingZ / 2)], [0, -90, 0], bolt = 26, pad = 0.2);
            
            if (side == "A") {
                translate([0, 50, 0]) cube([100, 100, 100], center = true); 
            } else if (side == "B") {
                translate([0, -50, 0]) cube([100, 100, 100], center = true);
            }
        }
    }
}

module debug_film (pos = [0, 0, 0]) {
    color("blue") translate(pos) {
        difference () {
            16mm_film(18, true, true);
            translate([0, -7.49 / 2, 0]) cube([10.26, 7.49, 1], center = true);
        }
    }
}

module debug () {
    FilmRestingDistanceZ = -3.5;
    FilmRetractionDistanceZ = -7.2;
    difference () {
        union () {
            FilmZ = FilmRestingDistanceZ; //retraction distance
            translate([(-BodyX / 2) - 1, 0, -BodyZ / 2]) body(gauge = "16mm");
            
            //debug_film([8, 4.6, FilmZ]);
            
            translate([0, 0, FilmZ + 1.4]) front_plate();
            translate([0, 0, FilmZ - 1.4]) back_plate();
            gate_mask_slide_standard16([(PlateX / 2) - (FrontPlateVoidX / 2) - 1.9, 0, FilmZ - .9]);
            //gate_mask_slide_super16([(PlateX / 2) - (FrontPlateVoidX / 2) - 1.9, 0, FilmZ - .9]);
            //front_plate_void([(PlateX / 2) - (FrontPlateVoidX / 2) - 2.41, 0, 0]);
            //film_clearance_void([0, 0, 15]);
            
            sprocketed_roller_16mm([1.5, KeySpacingY / 2, KeyZ], [0, 90, 0], side = "TAKEUP");
            sprocketed_roller_16mm([1.5, -KeySpacingY / 2, KeyZ], [0, 90, 0], side = "FEED");

            //bearing_debug([-6.8, KeySpacingY / 2, KeyZ], [0, 90, 0]);
            //bearing_debug([-6.8, -KeySpacingY / 2, KeyZ], [0, 90, 0]);

            color("blue") sprocketed_roller_nut_16mm([-8.5, -KeySpacingY / 2, KeyZ], [0, 90, 0]);
            
        
            idle_roller_16mm([9, IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerAZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_16mm([9, -IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerAZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_16mm([9, IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerBZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_16mm([9, -IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerBZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_16mm([9, IdleRollerSpacingBY / 2, (BodyZ / 2) - IdleRollerBZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_16mm([9, -IdleRollerSpacingBY / 2, (BodyZ / 2) - IdleRollerBZ - (BodyZ / 2)], [0, 90, 0]);
            
            idle_roller_post_16mm([9, IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerAZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_post_16mm([9, -IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerAZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_post_16mm([9, IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerBZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_post_16mm([9, -IdleRollerSpacingAY / 2, (BodyZ / 2) - IdleRollerBZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_post_16mm([9, IdleRollerSpacingBY / 2, (BodyZ / 2) - IdleRollerBZ - (BodyZ / 2)], [0, 90, 0]);
            idle_roller_post_16mm([9, -IdleRollerSpacingBY / 2, (BodyZ / 2) - IdleRollerBZ - (BodyZ / 2)], [0, 90, 0]);
            
            //slide_rail([-BodyX + (7 / 2) - 0.6, 11.5, (-BodyZ / 2) - 7], "A");
            slide_rail([-BodyX + (7 / 2) - 0.6, -11.5, (-BodyZ / 2) - 7], "B");
        
            slide([-BodyX + (7 / 2) - 0.4, 0, FilmZ + (-BodyZ / 2) + 1]);
            
            slide_catch([-13, 36, -51.5]);
            translate([0, 0, 20]) {
                front_block([(-BodyX / 2) - 1, 0, (6.5 / 2)]);
                front_block_pegs([0, 0, 2]);
                front_block_film_path([(16.75 / 2) - 1, (58.5 / 2) + (13 / 2), -2.25]);
                front_block_film_path([(16.75 / 2) - 1, (-58.5 / 2) - (13 / 2), -2.25], [0, 0, 180]);
            }

            filter_block([11, 0, -29], side = "A");
            filter_block([11, 0, -29], side = "B");
        }
        //translate([-60, 0, 0]) cube([100, 100, 100], center = true);
    }
}

PART="sprocketed_roller_takeup_16mmx";

if (PART == "front_plate") {
    //1
    rotate([0, 180, 0]) front_plate();
} else if (PART == "back_plate") {
    //1
    back_plate();
} else if (PART == "mask_slide_standard16") {
    //1
    rotate([180, 0, 0]) gate_mask_slide_standard16();
} else if (PART == "mask_slide_super16") {
    //1
    rotate([180, 0, 0]) gate_mask_slide_super16();
} else if (PART == "sprocketed_roller_takeup_16mm") {
    //1
    rotate([180, 0, 0]) sprocketed_roller_16mm(side = "TAKEUP");
} else if (PART == "sprocketed_roller_feed_16mm") {
    //1
    rotate([180, 0, 0]) sprocketed_roller_16mm(side = "FEED");
} else if (PART == "sprocketed_roller_nut_16mm") {
    //2
    sprocketed_roller_nut_16mm();
} else if (PART == "idle_roller_16mm") {
    //6
    idle_roller_16mm();
} else if (PART == "idle_roller_post_16mm") {
    //6
    idle_roller_post_16mm();
} else if (PART == "slide") {
    //1
    slide();
} else if (PART == "slide_catch") {
    //1
    slide_catch();
} else if (PART == "slide_rail_a") {
    //1
    slide_rail(side = "A");
} else if (PART == "slide_rail_b"){
    //1
    slide_rail(side = "B");
} else if (PART == "filter_block_a") {
    //1
    filter_block(side = "A");
} else if (PART == "filter_block_b"){
    //1
    filter_block(side = "B");
} else if (PART == "body_16mm") {
    //1
    rotate([0, 90, 0]) body(gauge = "16mm");
} else if (PART == "front_block_16mm") {
    //1
    rotate([180, 0, 0]) front_block();
} else if (PART == "front_block_film_path") {
    //2
    front_block_film_path(rot = [0, 90, 0]);
} else if (PART == "front_block_pegs") {
    //1
    front_block_pegs(rot = [180, 0, 0]);
} else {
    debug();
}