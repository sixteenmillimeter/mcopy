//Arduino Nano 328 et 168

//______________________VARIABLES___________________________________________
afficher_nano ="o"; //"o","n"
type_nano     ="t";   //1,2,3,4,"t","n"
afficher_pin  = "o";//"o","n"
rotation_360  ="f"; //"x","y","z","f","n"
mouvement_hauteur = "n";//"o","n"

longueur  = 43.10;
largeur   = 17.65;
epaisseur = 1.55;

//______________________CONDITIONS/MOUVEMENTS______________________________
if(afficher_nano =="o")
{
   if(rotation_360=="x" && mouvement_hauteur=="n")rotate([360*$t,0,0])
   {
     modele_nano();
   }
   else if(rotation_360=="y" && mouvement_hauteur=="n")rotate([0,360*$t,0])
   {
     modele_nano();
   }
   else if(rotation_360=="z"&& mouvement_hauteur=="n" )rotate([0,0,360*$t])
   {
     modele_nano();
   }
   if(rotation_360=="x" && mouvement_hauteur=="o")rotate([360*$t,0,0]) translate([0,0,-50]) translate([0,0,50.3*$t])
   {
      modele_nano();
   }
   else if(rotation_360=="y" && mouvement_hauteur=="o")rotate([0,360*$t,0]) translate([0,0,-50]) translate([0,0,50.3*$t])
   {
     modele_nano();
   }
   else if(rotation_360=="z"&& mouvement_hauteur=="o" )rotate([0,0,360*$t]) translate([0,0,-50]) translate([0,0,50.3*$t])
   {
     modele_nano();
   }
   else if(rotation_360=="n" && mouvement_hauteur=="o") translate([0,0,-50]) translate([0,0,50.3*$t])
   {
     modele_nano();
   }
    else if(rotation_360=="f")
   {
     modele_nano();
   }  
   else
   {
     
   }  
}

//______________________MODULES___________________________________________
module modele_nano()
{
    if(type_nano==1)nano_328_v1();
    if(type_nano==2)nano_328_v2(); 
    if(type_nano==3)nano_168_v1();
    if(type_nano==4)nano_168_v2(); 
    if(type_nano=="t") 
    {    
     nano_328_v1();
     translate([0,25,0]) nano_328_v2();
     translate([0,50,0]) nano_168_v1();
     translate([0,75,0]) nano_168_v2();
    }   
}

module nano_328_v1()
{
    difference()
    {
    //plaque
    color("blue") translate([0,0,epaisseur/2]) cube([longueur,largeur,epaisseur],center=true);
        for (i = [-7:7])  
          { 
            //trous à gauche         
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);  
          } 
        for (i = [-7:7])  
          {
            //trous à droite 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
          }
         for (i = [-1:1])  
          {
            //trous icsp 
            translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
          }    
          
    }
    
         for (i = [-1:1])  
          {
            difference()
            {
             //trous icsp 
             translate([-longueur/2+1.2,i*2.54,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
             translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            }
            difference()
            {
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true);
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);    
            } 
          } 
          
         for (i = [-1:1])  
          {
            difference()
            {
             //trous icsp 
             translate([-longueur/2+1.2,i*2.54,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
             translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            }
            difference()
            {
             translate([-longueur/2+1.2+2.54,i*2.54,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true);
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);    
            } 
          }
         for (i = [-7:7])  
          { 
            //trous à gauche dessous
           difference()
           {        
           color("DarkGray") translate([i*2.54,largeur/2-1.2,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }    
         for (i = [-7:7])  
          { 
            //trous à gauche dessus
           difference()
           {        
           color("DarkGray") translate([i*2.54,largeur/2-1.2,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }
         for (i = [-7:7])  
          { 
            //trous à droite dessous
           difference()
           {        
           color("DarkGray") translate([i*2.54,-largeur/2+1.2,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }
         for (i = [-7:7])  
          { 
            //trous à droite dessus
           difference()
           {        
           color("DarkGray") translate([i*2.54,-largeur/2+1.2,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }     
    
        translate([19,4.6,2.6]) cube([3.1,1.6,2],center=true);
        translate([-19+6.6,2.55,2.6]) cube([3.1,1.6,2],center=true);
        color("black") translate([-19+6.6,-2.5,2.6]) cube([3.1,6.8,2],center=true);
        color("black") translate([8.6,0,2.6]) cube([10,3.8,2],center=true);
        color("grey") translate([-2.54*2+1.60,0,-0.5]) cube([3.7,6.5,1],center=true);
        color("white") translate([-2.54*2+1.60,0,-0.85]) cube([3.7/2,6.5/2,1],center=true);
        color("black") translate([6,0,-0.34]) rotate([0,0,45]) cube([7.5,7.5,0.7],center=true);
         for (i = [-1:2])  
          {
            //trous icsp  
          color("lightblue")  translate([-12.0,i*1.94-0.96,-0.3/2]) cube([2.4,1.1,0.3],center=true);   
          }     
    
    
       //sortie USB
       difference()
       {
         color("orange") translate([16.5+1.1,0,-4.15/2]) cube([9.2,7.8,4.15],center=true);
         color("lightblue") translate([16.9+5+1.1,0,-4.15/2]) cube([9.2,7.8-1.5,3.0],center=true);  
       }
    module pin_15()
    {
        for (i = [-7:7])  
          {
        //pins à droite      
      color("lightblue")translate ([i*2.54,largeur/2-1.2, 4/3.5+2.30]) cylinder (r=0.35, h=10.95, $fn=60, center=true);  
          }         
          
        //pins à gauche 
         for (i = [-7:7])  
          {
       color("lightblue")translate ([i*2.54,-largeur/2+1.2, 4/3.5+2.30]) cylinder (r=0.35, h=10.95, $fn=60, center=true);    
          }     
         for (i = [-7:7])  
          {
        color("black")translate ([i*2.54,-largeur/2+1.2,(4/3.5)+1.51]) cube ([2.40+0.10,2.40,2.30], center=true );  
          }
          
         for (i = [-7:7])  
          {
        color("black")translate ([i*2.54,largeur/2-1.2,(4/3.5)+1.51]) cube ([2.40+0.10,2.40,2.30], center=true );   
          }
        for (i = [-1:1])  
          {
           // pins icsp
       color("lightblue")translate ([-longueur/2+1.2,i*2.54,-1.90]) cylinder (r=0.35, h=10.95, $fn=60, center=true); 
       color("lightblue")translate ([-longueur/2+1.2+2.54,i*2.54,-1.90]) cylinder (r=0.35, h=10.95, $fn=60, center=true);              
          } 
 
          for (i = [-1:1])  
          {
        color("black")translate ([-longueur/2+1.2+2.54,i*2.54,-(4/3.5)]) cube([2.40+0.10,2.40,2.30], center=true );  
        color("black")translate ([-longueur/2+1.2,i*2.54,-(4/3.5)]) cube([2.40+0.10,2.40,2.30], center=true );              
          }          
                          
          //soudure cylindrique à gauche
         for (i = [-7:7])  
          {
        color("grey")translate ([i*2.54,-largeur/2+1.2,-21.95]) translate([0,0,20]) cylinder($fa=12,$fn=60,h=1.93,r1=0.6,r2=1.1,center=false); 
          }
          //soudure cylindrique à gauche
         for (i = [-7:7])  
          {
        color("grey")translate ([i*2.54,largeur/2-1.2,-21.95]) translate([0,0,20]) cylinder($fa=12,$fn=60,h=1.93,r1=0.6,r2=1.1,center=false); 
          } 
           //soudure cylindrique icsp
         for (i = [-1:1])  
          {
        color("grey")translate([-longueur/2+1.2,i*2.54,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false); 
        color("grey")translate([-longueur/2+1.2+2.54,i*2.54,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false);
          }              
    }    
    if(afficher_pin=="o")pin_15();
}


module nano_328_v2()
{
    difference()
    {
    //plaque
    color("blue") translate([0,0,epaisseur/2]) cube([longueur,largeur,epaisseur],center=true);
        for (i = [-7:7])  
          { 
            //trous à gauche         
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);  
          } 
        for (i = [-7:7])  
          {
            //trous à droite 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
          }
         for (i = [-1:1])  
          {
            //trous icsp 
            translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
          }    
          
    }
         for (i = [-1:1])  
          {
            difference()
            {
             //trous icsp 
             translate([-longueur/2+1.2,i*2.54,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
             translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            }
            difference()
            {
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true);
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);    
            } 
          } 
          
         for (i = [-1:1])  
          {
            difference()
            {
             //trous icsp 
             translate([-longueur/2+1.2,i*2.54,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
             translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            }
            difference()
            {
             translate([-longueur/2+1.2+2.54,i*2.54,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true);
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);    
            } 
          }
         for (i = [-7:7])  
          { 
            //trous à gauche dessous
           difference()
           {        
           color("DarkGray") translate([i*2.54,largeur/2-1.2,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }    
         for (i = [-7:7])  
          { 
            //trous à gauche dessus
           difference()
           {        
           color("DarkGray") translate([i*2.54,largeur/2-1.2,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }
         for (i = [-7:7])  
          { 
            //trous à droite dessous
           difference()
           {        
           color("DarkGray") translate([i*2.54,-largeur/2+1.2,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }
         for (i = [-7:7])  
          { 
            //trous à droite dessus
           difference()
           {        
           color("DarkGray") translate([i*2.54,-largeur/2+1.2,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          } 
          
        translate([19,4.6,2.6]) cube([3.1,1.6,2],center=true);
        translate([-19+6.6,2.55,2.6]) cube([3.1,1.6,2],center=true);
        color("black") translate([-19+6.6,-2.5,2.6]) cube([3.1,6.8,2],center=true);
        color("black") translate([8.6,0,2.6]) cube([10,3.8,2],center=true);
        color("grey") translate([-2.54*2+1.60,0,-0.5]) cube([3.7,6.5,1],center=true);
        color("white") translate([-2.54*2+1.60,0,-0.85]) cube([3.7/2,6.5/2,1],center=true);
        color("black") translate([6,0,-0.34]) rotate([0,0,45]) cube([7.5,7.5,0.7],center=true);
         for (i = [-1:2])  
          {
            //trous icsp  
          color("lightblue")  translate([-12.0,i*1.94-0.96,-0.3/2]) cube([2.4,1.1,0.3],center=true);   
          } 
          
       //sortie USB
       difference()
       {
         color("orange") translate([16.5+1.1,0,-4.15/2]) cube([9.2,7.8,4.15],center=true);
         color("lightblue") translate([16.9+5+1.1,0,-4.15/2]) cube([9.2,7.8-1.5,3.0],center=true);  
       }
    module pin_15()
    {
        for (i = [-7:7])  
          {
        //pins à droite      
      color("lightblue")translate ([i*2.54,largeur/2-1.2,-1.90]) cylinder (r=0.35, h=10.95, $fn=60, center=true);  
          }         
        //pins à gauche 
         for (i = [-7:7])  
          {
       color("lightblue")translate ([i*2.54,-largeur/2+1.2,-1.90]) cylinder (r=0.35, h=10.95, $fn=60, center=true);    
          }     
         for (i = [-7:7])  
          {
        color("black")translate ([i*2.54,-largeur/2+1.2,-(4/3.5)]) cube ([2.40+0.10,2.40,2.30], center=true );  
          }
          
         for (i = [-7:7])  
          {
        color("black")translate ([i*2.54,largeur/2-1.2,-(4/3.5)]) cube ([2.40+0.10,2.40,2.30], center=true );   
          }
        for (i = [-1:1])  
          {
           // pins icsp
       color("lightblue")translate ([-longueur/2+1.2,i*2.54,-1.90]) cylinder (r=0.35, h=10.95, $fn=60, center=true); 
       color("lightblue")translate ([-longueur/2+1.2+2.54,i*2.54,-1.90]) cylinder (r=0.35, h=10.95, $fn=60, center=true);              
          } 
 
          for (i = [-1:1])  
          {
        color("black")translate ([-longueur/2+1.2+2.54,i*2.54,-(4/3.5)]) cube([2.40+0.10,2.40,2.30], center=true);  
        color("black")translate ([-longueur/2+1.2,i*2.54,-(4/3.5)]) cube([2.40+0.10,2.40,2.30], center=true);              
          }          
                           
          //soudure cylindrique à gauche
         for (i = [-7:7])  
          {
        color("grey")translate ([i*2.54,-largeur/2+1.2,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false); 
          }
          //soudure cylindrique à gauche
         for (i = [-7:7])  
          {
        color("grey")translate ([i*2.54,largeur/2-1.2,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false); 
          } 
           //soudure cylindrique icsp
         for (i = [-1:1])  
          {
        color("grey")translate([-longueur/2+1.2,i*2.54,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false); 
        color("grey")translate([-longueur/2+1.2+2.54,i*2.54,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false);
          }              
    }
       
    if(afficher_pin=="o")pin_15();
}


module nano_168_v1()
{
    difference()
    {
    //plaque
    color("blue") translate([0,0,epaisseur/2]) cube([longueur,largeur,epaisseur],center=true);
        for (i = [-7:7])  
          { 
            //trous à gauche         
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);  
          } 
        for (i = [-7:7])  
          {
            //trous à droite 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
          }
         for (i = [-1:1])  
          {
            //trous icsp 
            translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
          }    
          
    }
         for (i = [-1:1])  
          {
            difference()
            {
             //trous icsp 
             translate([-longueur/2+1.2,i*2.54,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
             translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            }
            difference()
            {
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true);
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);    
            } 
          } 
          
         for (i = [-1:1])  
          {
            difference()
            {
             //trous icsp 
             translate([-longueur/2+1.2,i*2.54,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
             translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            }
            difference()
            {
             translate([-longueur/2+1.2+2.54,i*2.54,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true);
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);    
            } 
          }
    
         for (i = [-7:7])  
          { 
            //trous à gauche dessous
           difference()
           {        
           color("DarkGray") translate([i*2.54,largeur/2-1.2,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }    
         for (i = [-7:7])  
          { 
            //trous à gauche dessus
           difference()
           {        
           color("DarkGray") translate([i*2.54,largeur/2-1.2,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }
         for (i = [-7:7])  
          { 
            //trous à droite dessous
           difference()
           {        
           color("DarkGray") translate([i*2.54,-largeur/2+1.2,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }
         for (i = [-7:7])  
          { 
            //trous à droite dessus
           difference()
           {        
           color("DarkGray") translate([i*2.54,-largeur/2+1.2,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          } 
          
        color("black") translate([-19+4.8,0,-0.25]) cube([4.6,2.35,1.25],center=true);
        color("black") translate([3.9,0,-1.0]) cube([3.8,10,2],center=true);
        color("grey") translate([-2.54*4+0.2,0,-0.5]) cube([3.20,4.00,1],center=true);
        color("black")translate ([-2.54*4+0.2,0, -0.85]) cylinder (r=0.80, h=1.25, $fn=60, center=true); 
        color("black") translate([-3.1,0,-0.34]) rotate([0,0,45]) cube([5.5,5.5,0.7],center=true);
         for (i = [-1:0])  
          {
            //trous icsp  
          color("lightblue") translate([-13.1,i*1.30+4.30,-0.3/2]) cube([2.4,1.0,0.3],center=true);   
          }
         for (i = [-1:0])  
          {
            //trous icsp  
          color("lightblue") translate([-9.6,i*1.30+5.60,-0.3/2]) cube([2.4,1.0,0.3],center=true);   
          }
          
       //sortie USB
       difference()
       {
         color("orange") translate([16.5+1.1,0,-4.15/2]) cube([9.2,7.8,4.15],center=true);
         color("lightblue") translate([16.9+5+1.1,0,-4.15/2]) cube([9.2,7.8-1.5,3.0],center=true);  
       }
    module pin_15()
    {
        for (i = [-7:7])  
          {
        //pins à droite      
      color("lightblue") translate([i*2.54,largeur/2-1.2, 4/3.5+2.30]) cylinder (r=0.35,h=10.95,$fn=60,center=true);  
          }         
          
        //pins à gauche 
         for (i = [-7:7])  
          {
       color("lightblue") translate([i*2.54,-largeur/2+1.2, 4/3.5+2.30]) cylinder (r=0.35,h=10.95,$fn=60,center=true);    
          }     
         for (i = [-7:7])  
          {
        color("black") translate([i*2.54,-largeur/2+1.2,(4/3.5)+1.51]) cube ([2.40+0.10,2.40,2.30],center=true);  
          }
          
         for (i = [-7:7])  
          {
        color("black") translate([i*2.54,largeur/2-1.2,(4/3.5)+1.51]) cube ([2.40+0.10,2.40,2.30],center=true);   
          }
        for (i = [-1:1])  
          {
           // pins icsp
       color("lightblue") translate([-longueur/2+1.2,i*2.54,-1.90]) cylinder (r=0.35,h=10.95,$fn=60,center=true); 
       color("lightblue") translate([-longueur/2+1.2+2.54,i*2.54,-1.90]) cylinder (r=0.35,h=10.95,$fn=60,center=true);              
          } 
 
          for (i = [-1:1])  
          {
        color("black") translate([-longueur/2+1.2+2.54,i*2.54,-(4/3.5)]) cube([2.40+0.10,2.40,2.30],center=true);  
        color("black") translate([-longueur/2+1.2,i*2.54,-(4/3.5)]) cube([2.40+0.10,2.40,2.30],center=true);              
          }          
                                    
          //soudure cylindrique à gauche
         for (i = [-7:7])  
          {
        color("grey") translate([i*2.54,-largeur/2+1.2,-21.95]) translate([0,0,20]) cylinder($fa=12,$fn=60,h=1.93,r1=0.6,r2=1.1,center=false); 
          }
          //soudure cylindrique à gauche
         for (i = [-7:7])  
          {
        color("grey") translate([i*2.54,largeur/2-1.2,-21.95]) translate([0,0,20]) cylinder($fa=12,$fn=60,h=1.93,r1=0.6,r2=1.1,center=false); 
          } 
           //soudure cylindrique icsp
         for (i = [-1:1])  
          {
        color("grey")translate([-longueur/2+1.2,i*2.54,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false); 
        color("grey")translate([-longueur/2+1.2+2.54,i*2.54,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false);
          }                   
    }
       
    if(afficher_pin=="o")pin_15();
}


module nano_168_v2()
{
    difference()
    {
    //plaque
    color("blue") translate([0,0,epaisseur/2]) cube([longueur,largeur,epaisseur],center=true);
        for (i = [-7:7])  
          { 
            //trous à gauche         
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);  
          } 
        for (i = [-7:7])  
          {
            //trous à droite 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
          }
         for (i = [-1:1])  
          {
            //trous icsp 
            translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
          }    
          
    }
         for (i = [-1:1])  
          {
            difference()
            {
             //trous icsp 
             translate([-longueur/2+1.2,i*2.54,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
             translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            }
            difference()
            {
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true);
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);    
            } 
          } 
          
         for (i = [-1:1])  
          {
            difference()
            {
             //trous icsp 
             translate([-longueur/2+1.2,i*2.54,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
             translate([-longueur/2+1.2,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
            }
            difference()
            {
             translate([-longueur/2+1.2+2.54,i*2.54,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true);
             translate([-longueur/2+1.2+2.54,i*2.54,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);    
            } 
          }
    
         for (i = [-7:7])  
          { 
            //trous à gauche dessous
           difference()
           {        
           color("DarkGray") translate([i*2.54,largeur/2-1.2,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }    
         for (i = [-7:7])  
          { 
            //trous à gauche dessus
           difference()
           {        
           color("DarkGray") translate([i*2.54,largeur/2-1.2,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,largeur/2-1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }
         for (i = [-7:7])  
          { 
            //trous à droite dessous
           difference()
           {        
           color("DarkGray") translate([i*2.54,-largeur/2+1.2,epaisseur-0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          }
         for (i = [-7:7])  
          { 
            //trous à droite dessus
           difference()
           {        
           color("DarkGray") translate([i*2.54,-largeur/2+1.2,0.0499]) cylinder(r=0.45+0.1,h=0.1,$fn=60,center=true); 
            translate([i*2.54,-largeur/2+1.2,epaisseur/2]) cylinder(r=0.45,h=4,$fn=60,center=true);   
           } 
          } 
          
        color("black") translate([-19+4.8,0,-0.25]) cube([4.6,2.35,1.25],center=true);
        color("black") translate([3.9,0,-1.0]) cube([3.8,10,2],center=true);
        color("grey") translate([-2.54*4+0.2,0,-0.5]) cube([3.20,4.00,1],center=true);
        color("black")translate ([-2.54*4+0.2,0, -0.85]) cylinder (r=0.80, h=1.25, $fn=60, center=true); 
        color("black") translate([-3.1,0,-0.34]) rotate([0,0,45]) cube([5.5,5.5,0.7],center=true);
         for (i = [-1:0])  
          {
            //trous icsp  
          color("lightblue")  translate([-13.1,i*1.30+4.30,-0.3/2]) cube([2.4,1.0,0.3],center=true);   
          }
         for (i = [-1:0])  
          {
            //trous icsp  
          color("lightblue")  translate([-9.6,i*1.30+5.60,-0.3/2]) cube([2.4,1.0,0.3],center=true);   
          }
          
       //sortie USB
       difference()
       {
         color("orange") translate([16.5+1.1,0,-4.15/2]) cube([9.2,7.8,4.15],center=true);
         color("lightblue") translate([16.9+5+1.1,0,-4.15/2]) cube([9.2,7.8-1.5,3.0],center=true);  
       }
    module pin_15()
    {
        for (i = [-7:7])  
          {
        //pins à droite      
      color("lightblue") translate([i*2.54,largeur/2-1.2,-1.90]) cylinder(r=0.35, h=10.95, $fn=60,center=true);  
          }         
        //pins à gauche 
         for (i = [-7:7])  
          {
       color("lightblue") translate([i*2.54,-largeur/2+1.2,-1.90]) cylinder(r=0.35, h=10.95, $fn=60,center=true);    
          }     
         for (i = [-7:7])  
          {
        color("black") translate([i*2.54,-largeur/2+1.2,-(4/3.5)]) cube([2.40+0.10,2.40,2.30],center=true);  
          }
          
         for (i = [-7:7])  
          {
        color("black") translate([i*2.54,largeur/2-1.2,-(4/3.5)]) cube([2.40+0.10,2.40,2.30],center=true);   
          }
        for (i = [-1:1])  
          {
           // pins icsp
       color("lightblue") translate([-longueur/2+1.2,i*2.54,-1.90]) cylinder (r=0.35, h=10.95, $fn=60, center=true); 
       color("lightblue") translate([-longueur/2+1.2+2.54,i*2.54,-1.90]) cylinder (r=0.35, h=10.95, $fn=60,center=true);              
          } 
 
          for (i = [-1:1])  
          {
        color("black") translate([-longueur/2+1.2+2.54,i*2.54,-(4/3.5)]) cube([2.40+0.10,2.40,2.30], center=true );  
        color("black") translate([-longueur/2+1.2,i*2.54,-(4/3.5)]) cube([2.40+0.10,2.40,2.30], center=true );              
          }          
                           
          //soudure cylindrique à gauche
         for (i = [-7:7])  
          {
        color("grey") translate([i*2.54,-largeur/2+1.2,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false); 
          }
          //soudure cylindrique à gauche
         for (i = [-7:7])  
          {
        color("grey") translate([i*2.54,largeur/2-1.2,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false); 
          } 
           //soudure cylindrique icsp
         for (i = [-1:1])  
          {
        color("grey") translate([-longueur/2+1.2,i*2.54,1.55]) cylinder($fa=12, $fn=60,h=1.93,r1=1.1,r2=0.6,center=false); 
        color("grey") translate([-longueur/2+1.2+2.54,i*2.54,1.55]) cylinder($fa=12,$fn=60,h=1.93,r1=1.1,r2=0.6,center=false);
          }             
    }       
    if(afficher_pin=="o")pin_15();
}


