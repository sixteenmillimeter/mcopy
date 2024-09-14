include <./common/common.scad>;

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
BoltD = 2.55;
AlignmentD = 2;

Standard16OffsetY = 0.75;

Super16X = 12.4;
Super16Y = 7.5;

module perf_void (pos = [0, 0, 0]) {
    translate(pos) cube([2.5, 1.99, 10], center = true);
}

module perfs_void () {
    perf_void([PerfSpacingX / 2, PerfSpacingY / 2 + Standard16OffsetY, 0]);
    perf_void([-PerfSpacingX / 2, PerfSpacingY / 2 + Standard16OffsetY, 0]);
    perf_void([PerfSpacingX / 2, -PerfSpacingY / 2 + Standard16OffsetY, 0]);
    perf_void([-PerfSpacingX / 2, -PerfSpacingY / 2 + Standard16OffsetY, 0]);
}

module front_plate_void (pos = [0, 0, 0]) {
    translate(pos) {
        //large void
        cube([FrontPlateVoidX + 1.5, FrontPlateVoidY, PlateZ + 1], center = true);
        //film Clearance
        film_clearance_void([0, 0, -1 ]);
        //perfs
        perfs_void();
    }
}

module front_plate () {
    difference () {
        union () {
            rounded_cube([PlateX, PlateY, PlateZ], d = 2, $fn = 25, center = true);
            //front plate spacer
            translate([-(PlateX / 2) + (FrontPlateSpacerX / 2), 0, (-PlateZ / 2) - (FrontPlateSpacerZ / 2)]) cube([FrontPlateSpacerX, PlateY, FrontPlateSpacerZ], center = true);
        }
        front_plate_void([(PlateX / 2) - (FrontPlateVoidX / 2) - 2.41, 0, -0.2]);
        film_entry_bevel([0, (PlateY / 2) + 0.25, -1.5]);
        film_entry_bevel([0, (-PlateY / 2) - 0.25, -1.5]);
        //corners
        translate([(-PlateX / 2), (PlateY / 2) - 0.8, 0]) rotate([0, 0, 35]) cube([7.1 * 2, 7.1, PlateZ + 2], center = true);
        translate([(-PlateX / 2), (-PlateY / 2) + 0.8, 0]) rotate([0, 0, -35]) cube([7.1 * 2, 7.1, PlateZ + 2], center = true);
        //bolts
        translate([(-PlateX / 2) + PlateBoltX, PlateBoltSpacingY / 2, 0]) cylinder(r = R(BoltD), h = 10, center = true , $fn = 30);
        translate([(-PlateX / 2) + PlateBoltX, -PlateBoltSpacingY / 2, 0]) cylinder(r = R(BoltD), h = 10, center = true , $fn = 30);
        //alignment rod voids
        translate([(-PlateX / 2) + AlignmentX, AlignmentSpacingY / 2, 0]) cylinder(r = R(AlignmentD + 0.25), h = 10, center = true , $fn = 30);
        translate([(-PlateX / 2) + AlignmentX, -AlignmentSpacingY / 2, 0]) cylinder(r = R(AlignmentD + 0.25), h = 10, center = true , $fn = 30);
        //gate bolt void
        translate([-6, 0, 0]) cylinder(r = R(BoltD), h = 20, center = true, $fn = 40);
        translate([-6, 0, 10]) cylinder(r = R(4.5), h = 20, center = true, $fn = 40);
    }
}

module text_void (string = "example", pos = [0, 0, 0], rot = [0, 0, 0], letter_size = 5, letter_height = 2) {
    translate(pos) rotate(rot) linear_extrude(height = letter_height) {
        text(string, size = letter_size, font = "Liberation Sans", halign = "center", valign = "center", $fn = 16);
    }    
}

module gate_mask_text (format = "") {
    if (format == "standard16") {
        text_void("16mm", pos= [11.5, 0, -3], rot = [90, 0, 90], letter_size = 4);
    } else if (format == "super16") {
        text_void("super16", pos= [11.5, 0, -4], rot = [90, 0, 90], letter_size = 4);
    }
}

module gate_mask_slide (pos = [0, 0, 0], pad = 0.0, format = "") {
    Z = -1;
    GuideAdjust = -1.5;
    FormatBevelY = format == "super16" ? 5 : 5.5;

    translate(pos) {
        difference () {
            union () {
                translate([0, 0, Z]) cube([20, FrontPlateVoidY + pad, PlateZ + 2], center = true);
                translate([-8, 0, Z]) cube([20, 8 + pad, PlateZ + 2], center = true);
                intersection () {
                            translate([0, 0, Z]) cube([20, 100, PlateZ + 2], center = true);
                    union () {
                        translate([0, FrontPlateVoidY / 2 + GuideAdjust, Z]) rotate([45, 0, 0]) cube([20, PlateZ + 2 + pad, PlateZ + 2 + pad], center = true);
                        translate([0, -FrontPlateVoidY / 2 - GuideAdjust, Z]) rotate([45, 0, 0]) cube([20, PlateZ + 2 + pad, PlateZ + 2 + pad], center = true);
                    }
                }
                if (format != "") {
                    translate([(20 / 2) + 0.1, 0, -3.5]) rotate([0, 90, 0]) rounded_cube([PlateZ + 2 + 5, FrontPlateVoidY + 8, 2], d = 2, $fn = 20, center = true);
                }
            }
            // difference
            if (format != "") {
                //alignment
                translate([-14.5, 0, 0]) {
                    cylinder(r = R(BoltD), h = 20, center = true, $fn = 40);
                    translate([0, 0, -3.5]) scale([2.5/3,2.5/3,1]) m3_nut();
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
                    translate([0, 0, -4.5]) trap_cube(height = 5, top_x = BackPlateVoidX, top_y = BackPlateVoidY, bottom_x = BackPlateVoidX + 5, bottom_y = BackPlateVoidY + 5, wall_thickness = 50);
                }
            } else if (format == "super16") {
                translate([(-BackPlateVoidX / 2) + (Super16X / 2), 0, 0]) {
                    cube([Super16X, Super16Y, 10], center = true);
                    translate([0, 0, -4.5]) trap_cube(height = 5, top_x = Super16X, top_y = Super16Y, bottom_x = Super16X + 5, bottom_y = Super16Y + 5, wall_thickness = 50);
                    }
                
            }
        }
        //translate([0, 0, -5])  trap_cube(height = 5, top_x = BackPlateVoidX, top_y = BackPlateVoidY, bottom_x = BackPlateVoidX + 5, bottom_y = BackPlateVoidY + 5, wall_thickness = 50);
    }

}



module gate_mask_slide_standard16 (pos = [0, 0, 0]) {
    gate_mask_slide(pos, pad = 0.0, format = "standard16");
}

module gate_mask_slide_super16 (pos = [0, 0, 0]) {
    gate_mask_slide(pos, pad = 0.0, format = "super16");
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

module back_plate_void (pos = [0, 0, 0]) {
    translate(pos) {
        //large void
        translate([(PlateX / 2) - (20 / 2) - (FrontPlateVoidX / 2) , 0, 0]) {
            cube([20, FrontPlateVoidY + 0.2, 10], center = true);
            gate_mask_slide( pad = 0.2);
        }
        //film clearance 
        film_clearance_void([0, 0, 1 + 0.2]);
        //perfs
        perfs_void();
    }
}

module back_plate () {
    RodZ = 4;
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
    }
    
    //alignment rods
    translate([(-PlateX / 2) + AlignmentX, AlignmentSpacingY / 2, RodZ / 2]) cylinder(r = R(AlignmentD), h = RodZ, center = true , $fn = 30);
    translate([(-PlateX / 2) + AlignmentX, -AlignmentSpacingY / 2, RodZ / 2]) cylinder(r = R(AlignmentD), h = RodZ, center = true , $fn = 30);
}

module debug () {
    front_plate();
    translate([0, 0, -8]) back_plate();
    //gate_mask_slide_standard16([(PlateX / 2) - (FrontPlateVoidX / 2) - 1.9 + 20, 0, -8]);
    //gate_mask_slide_super16([(PlateX / 2) - (FrontPlateVoidX / 2) - 2.41, 0, -3]);
    //front_plate_void([(PlateX / 2) - (FrontPlateVoidX / 2) - 2.41, 0, 0]);
    film_clearance_void([0, 0, 15]);
    translate([8, 0, -1.5]) cube([16, 50, 0.1], center = true);
    
}

PART="front_plate";

if (PART == "front_plate") {
    rotate([0, 180, 0]) front_plate();
} else if (PART == "back_plate") {
    back_plate();
} else if (PART == "gate_mask_slide") {
    rotate([0, 90, 0]) gate_mask_slide();
} else if (PART == "gate_mask_slide_standard16") {
    rotate([0, 90, 0]) gate_mask_slide_standard16();
} else if (PART == "gate_mask_slide_super16") {
    rotate([0, 90, 0]) gate_mask_slide_super16();
    
} else {
    debug();
}