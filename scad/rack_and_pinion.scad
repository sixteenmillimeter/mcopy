//This is a modification of " Public Domain Parametric Involute Spur Gear (and involute helical gear and involute rack)
// by Leemon Baird, 2011, Leemon@Leemon.com
//http://www.thingiverse.com/thing:5505  "

//Modifications by racatack June 2016:
// v1.0, 6/24/16:
//  -Incorporated 'module InvoluteGear_rack()' from the 11/11/15 comment by quisam2342 in thing:5505 to fix noted problems in rack generation at various tooth sizes
//  -Added a section for an optional 'backboard' that can be used to stiffen an otherwise skinny rack
//  -Added sections for optional Stop Blocks at either or both ends of a rack
//  -Removed extra gears from the example since I only need one pinion. See thing:5505 example section to gain more insight into gear generation.
//v1.1, 6/28/16:
//  -Added sections to optionally create mounting flanges on the bottom/backside of the rack. Flanges can be at either or both ends, or longitudinal.

//TO GENERATE A CUSTOM RACK AND PINION ENTER INPUTS AT LINES 345-377


//////////////////////////////////////////////////////////////////////////////////////////////
// Public Domain Parametric Involute Spur Gear (and involute helical gear and involute rack)
// version 1.1
// by Leemon Baird, 2011, Leemon@Leemon.com
//http://www.thingiverse.com/thing:5505
//
// This file is public domain.  Use it for any purpose, including commercial
// applications.  Attribution would be nice, but is not required.  There is
// no warranty of any kind, including its correctness, usefulness, or safety.
// 
// This is parameterized involute spur (or helical) gear.  It is much simpler and less powerful than
// others on Thingiverse.  But it is public domain.  I implemented it from scratch from the 
// descriptions and equations on Wikipedia and the web, using Mathematica for calculations and testing,
// and I now release it into the public domain.
//
//		http://en.wikipedia.org/wiki/Involute_gear
//		http://en.wikipedia.org/wiki/Gear
//		http://en.wikipedia.org/wiki/List_of_gear_nomenclature
//		http://gtrebaol.free.fr/doc/catia/spur_gear.html
//		http://www.cs.cmu.edu/~rapidproto/mechanisms/chpt7.html
//
// The module gear() gives an involute spur gear, with reasonable defaults for all the parameters.
// Normally, you should just choose the first 4 parameters, and let the rest be default values.
// The module gear() gives a gear in the XY plane, centered on the origin, with one tooth centered on
// the positive Y axis.  The various functions below it take the same parameters, and return various
// measurements for the gear.  The most important is pitch_radius, which tells how far apart to space
// gears that are meshing, and adendum_radius, which gives the size of the region filled by the gear.
// A gear has a "pitch circle", which is an invisible circle that cuts through the middle of each
// tooth (though not the exact center). In order for two gears to mesh, their pitch circles should 
// just touch.  So the distance between their centers should be pitch_radius() for one, plus pitch_radius() 
// for the other, which gives the radii of their pitch circles.
//
// In order for two gears to mesh, they must have the same mm_per_tooth and pressure_angle parameters.  
// mm_per_tooth gives the number of millimeters of arc around the pitch circle covered by one tooth and one
// space between teeth.  The pitch angle controls how flat or bulged the sides of the teeth are.  Common
// values include 14.5 degrees and 20 degrees, and occasionally 25.  Though I've seen 28 recommended for
// plastic gears. Larger numbers bulge out more, giving stronger teeth, so 28 degrees is the default here.
//
// The ratio of number_of_teeth for two meshing gears gives how many times one will make a full 
// revolution when the the other makes one full revolution.  If the two numbers are coprime (i.e. 
// are not both divisible by the same number greater than 1), then every tooth on one gear
// will meet every tooth on the other, for more even wear.  So coprime numbers of teeth are good.
//
// The module rack() gives a rack, which is a bar with teeth.  A rack can mesh with any
// gear that has the same mm_per_tooth and pressure_angle.
//
// Some terminology: 
// The outline of a gear is a smooth circle (the "pitch circle") which has mountains and valleys
// added so it is toothed.  So there is an inner circle (the "root circle") that touches the 
// base of all the teeth, an outer circle that touches the tips of all the teeth,
// and the invisible pitch circle in between them.  There is also a "base circle", which can be smaller than
// all three of the others, which controls the shape of the teeth.  The side of each tooth lies on the path 
// that the end of a string would follow if it were wrapped tightly around the base circle, then slowly unwound.  
// That shape is an "involute", which gives this type of gear its name.
//
//////////////////////////////////////////////////////////////////////////////////////////////

//An involute spur gear, with reasonable defaults for all the parameters.
//Normally, you should just choose the first 4 parameters, and let the rest be default values.
//Meshing gears must match in mm_per_tooth, pressure_angle, and twist,
//and be separated by the sum of their pitch radii, which can be found with pitch_radius().
module gear (
	mm_per_tooth    = 3,    //this is the "circular pitch", the circumference of the pitch circle divided by the number of teeth
	number_of_teeth = 11,   //total number of teeth around the entire perimeter
	thickness       = 6,    //thickness of gear in mm
	hole_diameter   = 3,    //diameter of the hole in the center, in mm
	twist           = 0,    //teeth rotate this many degrees from bottom of gear to top.  360 makes the gear a screw with each thread going around once
	teeth_to_hide   = 0,    //number of teeth to delete to make this only a fraction of a circle
	pressure_angle  = 28,   //Controls how straight or bulged the tooth sides are. In degrees.
	clearance       = 0.0,  //gap between top of a tooth on one gear and bottom of valley on a meshing gear (in millimeters)
	backlash        = 0.0   //gap between two meshing teeth, in the direction along the circumference of the pitch circle
) {
	assign(pi = 3.1415926)
	assign(p  = mm_per_tooth * number_of_teeth / pi / 2)  //radius of pitch circle
	assign(c  = p + mm_per_tooth / pi - clearance)        //radius of outer circle
	assign(b  = p*cos(pressure_angle))                    //radius of base circle
	assign(r  = p-(c-p)-clearance)                        //radius of root circle
	assign(t  = mm_per_tooth/2-backlash/2)                //tooth thickness at pitch circle
	assign(k  = -iang(b, p) - t/2/p/pi*180) {             //angle to where involute meets base circle on each side of tooth
		difference() {
			for (i = [0:number_of_teeth-teeth_to_hide-1] )
				rotate([0,0,i*360/number_of_teeth])
					linear_extrude(height = thickness, center = true, convexity = 10, twist = twist)
						polygon(
							points=[
								[0, -hole_diameter/10],
								polar(r, -181/number_of_teeth),
								polar(r, r<b ? k : -180/number_of_teeth),
								q7(0/5,r,b,c,k, 1),q7(1/5,r,b,c,k, 1),q7(2/5,r,b,c,k, 1),q7(3/5,r,b,c,k, 1),q7(4/5,r,b,c,k, 1),q7(5/5,r,b,c,k, 1),
								q7(5/5,r,b,c,k,-1),q7(4/5,r,b,c,k,-1),q7(3/5,r,b,c,k,-1),q7(2/5,r,b,c,k,-1),q7(1/5,r,b,c,k,-1),q7(0/5,r,b,c,k,-1),
								polar(r, r<b ? -k : 180/number_of_teeth),
								polar(r, 181/number_of_teeth)
							],
 							paths=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]]
						);
			cylinder(h=2*thickness+1, r=hole_diameter/2, center=true, $fn=20);
		}
	}
};	
//these 4 functions are used by gear
function polar(r,theta)   = r*[sin(theta), cos(theta)];                            //convert polar to cartesian coordinates
function iang(r1,r2)      = sqrt((r2/r1)*(r2/r1) - 1)/3.1415926*180 - acos(r1/r2); //unwind a string this many degrees to go from radius r1 to radius r2
function q7(f,r,b,r2,t,s) = q6(b,s,t,(1-f)*max(b,r)+f*r2);                         //radius a fraction f up the curved side of the tooth 
function q6(b,s,t,d)      = polar(d,s*(iang(b,d)+t));                              //point at radius d on the involute curve

//a rack, which is a straight line with teeth (the same as a segment from a giant gear with a huge number of teeth).
//The "pitch circle" is a line along the X axis.
//module rack (
//	mm_per_tooth    = 3,    //this is the "circular pitch", the circumference of the pitch circle divided by the number //of teeth
//	number_of_teeth = 11,   //total number of teeth along the rack
//	thickness       = 6,    //thickness of rack in mm (affects each tooth)
//	height          = 120,   //height of rack in mm, from tooth top to far side of rack.
//	pressure_angle  = 28,   //Controls how straight or bulged the tooth sides are. In degrees.
//	backlash        = 0.0   //gap between two meshing teeth, in the direction along the circumference of the pitch circle
//) {
//	assign(pi = 3.1415926)
//	assign(a = mm_per_tooth / pi) //addendum
//	assign(t = a*cos(pressure_angle)-1)         //tooth side is tilted so top/bottom corners move this amount
//		for (i = [0:number_of_teeth-1] )
//			translate([i*mm_per_tooth,0,0])
//				linear_extrude(height = thickness, center = true, convexity = 10)
//					polygon(
//						points=[
//							[-mm_per_tooth * 3/4,                 a-height],
//							[-mm_per_tooth * 3/4 - backlash,     -a],
//							[-mm_per_tooth * 1/4 + backlash - t, -a],
//							[-mm_per_tooth * 1/4 + backlash + t,  a],
//							[ mm_per_tooth * 1/4 - backlash - t,  a],
//							[ mm_per_tooth * 1/4 - backlash + t, -a],
//							[ mm_per_tooth * 3/4 + backlash,     -a],
//							[ mm_per_tooth * 3/4,                 a-height],
//						],
//						paths=[[0,1,2,3,4,5,6,7]]
//					);
//};	


  //rac note - This section generates the rack body and teeth. It is from the 11/11/15 comment by quisam2342 in thing:5505 to fix noted problems with rack generation, and replaces the original 'module rack()'
////////////////////////////////////////////////////////////////////////////////////////////////
// The module InvoluteGear_rack() gives a involute gear rack, which is a bar with teeth.
// A rack can mesh with any gear that has the same mm_per_tooth and pressure_angle.
// The "pitch circle" is a line along the X axis.
//
// mm_per_tooth     this is the "circular pitch", the circumference of the pitch circle
//                  divided by the number of teeth
//
// number_of_teeth  total number of teeth along the rack
//
// thickness        thickness of rack in mm
//
// height           height of rack in mm, from tooth top to far side of rack
//
// pressure_angle   controls how straight or bulged the tooth sides are, in degrees
//
// clearance        gap between top of a tooth on one gear and bottom of valley
//                  on a meshing gear, in millimeters
//
// backlash         gap between two meshing teeth, in the direction along the circumference
//                  of the pitch circle
////////////////////////////////////////////////////////////////////////////////////////////////



module InvoluteGear_rack (

   //Default numbers in this section get overridden by numbers in 'example rack and pinion' section, so set your values there.
   
    mm_per_tooth    = 3, //all meshing gears need the same mm_per_tooth 
    number_of_teeth = 11,
    thickness       = 6,
    height          = 4,
    
  //rac - Added variables for backboard, stop blocks and mounting flanges: 
 //set your values in the 'example rack and pinion' section, as defaults given here will be overridden by that section 
    backboard_thickness = 2.0,
    backboard_height = 1.0,
    side_flange_thickness = 0,
    side_flange_height = 0,
    flange_offset = 0, 
    stop_height = backboard_height,
    left_stop_enable = 1, 
    right_stop_enable = 1,
    flange_height = 0,
    left_flange_enable = 1, 
    right_flange_enable = 1,
    
//These defaults are not redefined in the example section:
    pressure_angle  = 28,  //all meshing gears need the same pressure_angle
    clearance       = 0.0,
    backlash        = 0.0

)

{
    // addendum - tooth height above pitch line
    assign(addendum =        module_value(mm_per_tooth) - clearance)

    // dedendum - tooth height below pitch line
    assign(dedendum = 1.25 * module_value(mm_per_tooth)            ) 


    for (i = [0:number_of_teeth-1] )
        translate([(i+0.5)*mm_per_tooth,height-addendum,0])
            linear_extrude(height = thickness, center = true, convexity = 10)  //'height' parameter here is not the same as 'height' parameter of module. Here it effectively is the width or thickness as the rack is extruded from one side-face to the other.
                polygon(
                    points=[
                        [-1/2 * mm_per_tooth,                                              addendum-height],
                        [-1/2 * mm_per_tooth,                                             -dedendum],
                        [-1/4 * mm_per_tooth + backlash - dedendum * tan(pressure_angle), -dedendum],
                        [-1/4 * mm_per_tooth + backlash + addendum * tan(pressure_angle),  addendum],
                        [ 1/4 * mm_per_tooth - backlash - addendum * tan(pressure_angle),  addendum],
                        [ 1/4 * mm_per_tooth - backlash + dedendum * tan(pressure_angle), -dedendum],
                        [ 1/2 * mm_per_tooth,                                             -dedendum],
                        [ 1/2 * mm_per_tooth,                                              addendum-height],
                    ],
                    paths=[[0,1,2,3,4,5,6,7]]
                );

   //rac -added - This section optionally creates a 'stop block' at the left end of the rack
            translate([(-0.11)*mm_per_tooth,0,0.5*(-thickness)])  
            linear_extrude(height = left_stop_enable*thickness, center = false, convexity = 10)
                polygon(
                    points=[
                        [-1/2 * mm_per_tooth,height+stop_height],   //stop_height extends stop block above teeth, change the number to change the extension amount
                        [-1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,height+stop_height],   //stop_height extends stop block above teeth, change the number to change the extension amount
                    ],
                    paths=[[0,1,2,3]]
                );


    //rac -added - This section optionally creates a 'stop block' at the right end of the rack
            translate([(0.11+number_of_teeth)*mm_per_tooth,0,0.5*(-thickness)])  
            linear_extrude(height = right_stop_enable*thickness, center = false, convexity = 10)
                polygon(
                    points=[
                        [-1/2 * mm_per_tooth,height+stop_height],   //stop_height extends stop block above teeth
                        [-1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,height+stop_height],   //stop_height extends stop block above teeth
                    ],
                    paths=[[0,1,2,3]]
                );


    //rac -added - This section optionally creates a flange at the left rear of the rack
            translate([(-0.11)*mm_per_tooth,0,0.5*(-thickness)])   
            linear_extrude(height = left_flange_enable*thickness, center = false, convexity = 10)
                polygon(
                    points=[
                        [-1/2 * mm_per_tooth,-flange_height],   //flange_height extends flange beyond rack bottom
                        [-1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,-flange_height],   //flange_height extends flange beyond rack bottom
                    ],
                    paths=[[0,1,2,3]]
                );



    //rac -added - This section optionally creates a flange at the right rear of the rack
            translate([(0.11+number_of_teeth)*mm_per_tooth,0,0.5*(-thickness)])  
            linear_extrude(height = right_flange_enable*thickness, center = false, convexity = 10)
                polygon(
                    points=[
                        [-1/2 * mm_per_tooth,-flange_height],   //flange_height extends flange beyond rack bottom
                        [-1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,-flange_height],   //flange_height extends flange beyond rack bottom
                    ],
                    paths=[[0,1,2,3]]
                );



    //rac -added - This section optionally creates a 'Backboard' on one side of the rack. Can be used to add stiffness for a 'thin' rack (i.e. a rack with low height and/or thickness numbers) or if a large negative height is used it can extend under the rack as a mounting flange.
    for (i = [0:number_of_teeth-1] )
        translate([(i+0.5)*mm_per_tooth,0,0.5*(-thickness+backboard_thickness)])    
        //0.5*(-thickness+backboard_thickness) starts the backboard at one side of the rack and extrudes it inward
            linear_extrude(height = backboard_thickness, center = true, convexity = 10)
                polygon(
                    points=[
                        [-1/2 * mm_per_tooth,height+backboard_height],   //backboard_height extends backboard above teeth
                        [-1/2 * mm_per_tooth,0],

                        [ 1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,height+backboard_height],   //backboard_height extends backboard above teeth
                    ],
                    paths=[[0,1,2,3]]
                );


    //rac -added - This section optionally creates a Rear Side-Flange on along one side of the rack. Can be used to add stiffness for a 'thin' rack (i.e. a rack with low height and/or thickness numbers) or it can be used as a mounting flange.
    for (i = [0:number_of_teeth-1] )
        translate([(i+0.5)*mm_per_tooth,0,0.5*(-thickness+side_flange_thickness)+flange_offset])    
        //0.5*(-side_flange_thickness) starts the backboard at one side of the rack and extrudes it inward. flange_offset moves the flange toward the other side of the rack
            linear_extrude(height = side_flange_thickness, center = true, convexity = 10)
                polygon(
                    points=[
                        [-1/2 * mm_per_tooth,-side_flange_height],   //side_flange_height extends side_flange beyond rack bottom
                        [-1/2 * mm_per_tooth,0],

                        [ 1/2 * mm_per_tooth,0],
                        [ 1/2 * mm_per_tooth,-side_flange_height],   //side_flange_height extends backboard beyond rack bottom
                    ],
                    paths=[[0,1,2,3]]
                );

}


//These 5 functions let the user find the derived dimensions of the gear.
//A gear fits within a circle of radius outer_radius, and two gears should have
//their centers separated by the sum of their pictch_radius.
function circular_pitch  (mm_per_tooth=3) = mm_per_tooth;                     //tooth density expressed as "circular pitch" in millimeters
function diametral_pitch (mm_per_tooth=3) = 3.1415926 / mm_per_tooth;         //tooth density expressed as "diametral pitch" in teeth per millimeter
function module_value    (mm_per_tooth=3) = mm_per_tooth / 3.1415926;                //tooth density expressed as "module" or "modulus" in millimeters
function pitch_radius    (mm_per_tooth=3,number_of_teeth=11) = mm_per_tooth * number_of_teeth / 3.1415926 / 2;
function outer_radius    (mm_per_tooth=3,number_of_teeth=11,clearance=0.1)    //The gear fits entirely within a cylinder of this radius.
	= mm_per_tooth*(1+number_of_teeth/2)/3.1415926  - clearance;              

