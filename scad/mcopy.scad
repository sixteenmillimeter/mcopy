//include <./bellows.scad>;
//include <./connectors.scad>;
//include <./light.scad>;
//include <./motor.scad>;

//use <./mcopy_rails.scad>;
//use <./mcopy_projector.scad>;
//use <./mcopy_lens_assembly.scad>;



module assembled_mcopy_gate (pos = [0, 0, 0], rot = [0, 0, 0]) {
	translate(pos) rotate(rot) {
		include <./mcopy_gate.scad>;
	}
}

assembled_mcopy_gate(rot = [90, 90, 0]);