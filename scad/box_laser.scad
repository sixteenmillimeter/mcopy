echo("Added library: box_laser");
echo("Usage: Box2D();");
echo("Box2D (CUBE = [100, 200, 50], MATERIAL = 3, SIDE_TABS = 1, BOTTOM = true, BOTTOM_TABS = 3, TOP = true, TOP_TABS = 4, PADDING = 4, PROJECTION = false)");

module Box2D (CUBE = [100, 200, 50], MATERIAL = 3, SIDE_TABS = 1, BOTTOM = true, BOTTOM_TABS = 3, TOP = true, TOP_TABS = 4, PADDING = 4, PROJECTION = false) {
    X = CUBE[0]; //WIDTH
    Y = CUBE[1]; //LENGTH
    Z = CUBE[2]; //HEIGHT
    
    echo("MATERIAL", MATERIAL);
    echo("X", X);
    echo("Y", Y);
    echo("Z", Z);
    echo("SIDE_TABS", SIDE_TABS);
    echo("BOTTOM", BOTTOM);
    echo("BOTTOM_TABS", BOTTOM_TABS);
    echo("TOP", TOP);
    echo("TOP_TABS", TOP_TABS);
    echo("PADDING", PADDING);
    
    module Side (x, y) {
        difference () {
            cube([x, y, MATERIAL], center = true);
           
            translate([(x / 2) - (MATERIAL/2) + 0.1, 0, 0 ]) {
                rotate([0, 0, 90]) {
                    Tabs(y, SIDE_TABS, false);
                }
            }
            
            translate([-(x / 2) + (MATERIAL/2) - 0.1, 0, 0 ]) {
                rotate([0, 0, 90]) {
                    Tabs(y, SIDE_TABS, true);
                }
            }
            
            //Bottom
            if (BOTTOM && BOTTOM_TABS != 0) {
                translate([0, (y / 2) - (MATERIAL/2) + 0.1, 0 ]) {
                    Tabs(x, BOTTOM_TABS, true);
                }   
            } else if (BOTTOM && BOTTOM_TABS == 0) {
                translate([0, (y / 2) - (MATERIAL/2) + 0.1, 0 ]) {
                   cube([X, MATERIAL, MATERIAL], center = true); 
                }  
            }
            //Top
            if (TOP && TOP_TABS != 0) {
                translate([0, -(y / 2) + (MATERIAL/2) - 0.1, 0 ]) {
                    Tabs(x, TOP_TABS, true);
                }   
            } else if (TOP && TOP_TABS == 0) {
                translate([0, -(y / 2) + (MATERIAL/2) - 0.1, 0 ]) {
                   cube([X, MATERIAL, MATERIAL], center = true); 
                }  
            }
        }
    }

    module Bottom () {
        difference () {
            cube([X, Y, MATERIAL], center = true);
            if (BOTTOM_TABS != 0) {
                translate([(X / 2) - (MATERIAL / 2) + 0.1, 0, 0 ]) {
                    rotate([0, 0, 90]) {
                        Tabs(Y, BOTTOM_TABS, false);
                    }
                }
                translate([-(X / 2) + (MATERIAL / 2) - 0.1, 0, 0 ]) {
                    rotate([0, 0, 90]) {
                        Tabs(Y, BOTTOM_TABS, false);
                    }
                }
                translate([0, (Y / 2) - (MATERIAL / 2) + 0.1, 0 ]) {
                    Tabs(X, BOTTOM_TABS, false);
                }
                translate([0, (-Y / 2) + (MATERIAL / 2) - 0.1, 0 ]) {
                    Tabs(X, BOTTOM_TABS, false);
                }
            }
        }
    }

    module Top () {
        difference () {
            cube([X, Y, MATERIAL], center = true);
            if (TOP_TABS != 0) {
                translate([(X / 2) - (MATERIAL / 2) + 0.1, 0, 0 ]) {
                    rotate([0, 0, 90]) {
                        Tabs(Y, TOP_TABS, false);
                    }
                }
                translate([-(X / 2) + (MATERIAL / 2) - 0.1, 0, 0 ]) {
                    rotate([0, 0, 90]) {
                        Tabs(Y, TOP_TABS, false);
                    }
                }
                translate([0, (Y / 2) - (MATERIAL / 2) + 0.1, 0 ]) {
                    Tabs(X, TOP_TABS, false);
                }
                translate([0, (-Y / 2) + (MATERIAL / 2) - 0.1, 0 ]) {
                    Tabs(X, TOP_TABS, false);
                }   
            }
        }
    }

    module Inner () {
       cube([X - (MATERIAL * 2), Y - (MATERIAL * 2), MATERIAL], center = true); 
    }

    module Tabs (side, number, positive) {
        size = side / (number * 2);
        if (positive) {
            Tab_build (side, size, number);
        } else {
            difference () {
                cube([side, MATERIAL, MATERIAL], center = true);
                 Tab_build(side, size, number);
            }
        }
    }

    module Tab_build (side, size, number) {
        for (i = [0 : number]) {
            x = (size * (i * 2)) - side/2;
            translate([x, 0, 0]) {
                cube([size, MATERIAL, MATERIAL], center = true);
            }
        }    
    }
    //SIDES X
    if (PROJECTION) {
        projection(cut = true) {
            Side(X, Z, 2);
            translate([X + PADDING, 0, 0]) Side(X, Z, 2);
            //SIDES Y
            translate([(X * 1.5) + (Y / 2) + (PADDING * 2), 0, 0]) Side(Y, Z, 2);
            translate([(X * 1.5) + (Y /2) + (PADDING * 2), Z + PADDING, 0]) Side(Y, Z, 2);
            
            if (BOTTOM) {
                translate([0, (Y / 2) + (Z / 2) + PADDING, 0]) Bottom();
                if (BOTTOM_TABS == 0) {
                    translate([0, (Y / 2) + (Z / 2) + PADDING, 0]) Inner();
                }
            }
            if (TOP) {
                translate([X + PADDING, (Y / 2) + (Z / 2) + PADDING, 0]) Top();
                if (TOP_TABS == 0) {
                    translate([X + PADDING, (Y / 2) + (Z / 2) + PADDING, 0]) Inner();
                }
            }
        }
    } else {
        Side(X, Z, 2);
        translate([X + PADDING, 0, 0]) Side(X, Z, 2);
        //SIDES Y
        translate([(X * 1.5) + (Y / 2) + (PADDING * 2), 0, 0]) Side(Y, Z, 2);
        translate([(X * 1.5) + (Y /2) + (PADDING * 2), Z + PADDING, 0]) Side(Y, Z, 2);
        
        if (BOTTOM) {
            translate([0, (Y / 2) + (Z / 2) + PADDING, 0]) Bottom();
            if (BOTTOM_TABS == 0) {
                translate([0, (Y / 2) + (Z / 2) + PADDING, 0]) Inner();
            }
        }
        if (TOP) {
            translate([X + PADDING, (Y / 2) + (Z / 2) + PADDING, 0]) Top();
            if (TOP_TABS == 0) {
                translate([X + PADDING, (Y / 2) + (Z / 2) + PADDING, 0]) Inner();
            }
        }
    }
}