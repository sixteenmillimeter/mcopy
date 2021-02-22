PANEL_X = 72;
PANEL_Y = 147;
PANEL_Z = 3;

CONNECTOR_D = 15.75; //?
CONNECTOR_D2 = 18.1;
CONNECTOR_D3 = 29;
CONNECTOR_Z = 4;
CONNECTOR_OFFSET_Y = 40;

//max spacing of holes = 140
//min spacing = 131

SPACING_MIN = 131;
SPACING_MAX = 140;
SPACING = SPACING_MIN + ((SPACING_MAX - SPACING_MIN) / 2);
SCREW_D = (SPACING_MAX - SPACING_MIN) / 2;

RELAY_X = 44.4;
RELAY_Y = 33.1;

RELAY_D1 = 5;
RELAY_D2 = 2.6;

RELAY_H1 = 2;
RELAY_H2 = 2;

RELAY_OFFSET_Y = -30;

module relay_post () {
    $fn = 60;
    union () {
        cylinder(r = RELAY_D1 / 2, h = RELAY_H1 + (PANEL_Z / 2), center = true);
        translate([0, 0, (RELAY_H1 / 2) + (RELAY_H2 / 2) + (PANEL_Z / 4)]) cylinder(r = RELAY_D2 / 2, h = RELAY_H2, center = true);
   }
}

module oxberry_control_panel () {
    $fn = 60;
    difference () {
        union () {
            cube([PANEL_X, PANEL_Y, PANEL_Z], center = true);
            //relay_mount
            translate ([0, RELAY_OFFSET_Y, (PANEL_Z / 2) + (RELAY_H1 / 2)]) {
                translate([RELAY_X / 2, RELAY_Y / 2, 0]) relay_post();
                translate([-RELAY_X / 2, RELAY_Y / 2, 0]) relay_post();
                translate([RELAY_X / 2, -RELAY_Y / 2, 0]) relay_post();
                translate([-RELAY_X / 2, -RELAY_Y / 2, 0]) relay_post();
            }
            //reinforcement for connector
            translate([0, CONNECTOR_OFFSET_Y, PANEL_Z / 2]) difference () {
                cylinder(r = CONNECTOR_D3 / 2, h = CONNECTOR_Z, center = true, $fn = 100);
                cylinder(r = CONNECTOR_D2 / 2, h = CONNECTOR_Z + 1, center = true, $fn = 100);
            }
        }
        //voids for screws
        translate([0, SPACING / 2, 0]) cylinder(r = SCREW_D / 2, h = PANEL_Z + 1, center = true);
        translate([0, -SPACING / 2, 0]) cylinder(r = SCREW_D / 2, h = PANEL_Z + 1, center = true);
        //void for connector
        translate([0, CONNECTOR_OFFSET_Y, 0]) cylinder(r = CONNECTOR_D / 2, h = PANEL_Z + 1, center = true, $fn = 100);
    }
}

module oxberry_control_panel_a () {
    difference () {
        oxberry_control_panel();
        translate([0, PANEL_Y / 2, 0]) cube([PANEL_X + 1, PANEL_Y, 20], center = true);
        cube([PANEL_X / 3, 10, 40], center = true);
    }    
}
module oxberry_control_panel_b () {
    difference () {
        oxberry_control_panel();
        oxberry_control_panel_a();
    }
    translate([0, 0, PANEL_Z]) cube([PANEL_X - 10, 15, PANEL_Z], center = true);    
}

oxberry_control_panel();
//oxberry_control_panel_a();
//oxberry_control_panel_b();
