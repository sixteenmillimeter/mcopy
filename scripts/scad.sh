#!/bin/bash

openscadPart () {
	openscad -o "./stl/${3}" -D"PART=\"${2}\"" "./scad/${1}"
	if [ -f "./scad/common/c14n_stl.py" ]; then
		python3 ./scad/common/c14n_stl.py "./stl/${3}"
	fi
}

# arri s parts

#openscadPart "arri_s.scad" "drive_coupling_DC_connector" 	"arri_s_drive_coupling_DC_connector.stl"
#openscadPart "arri_s.scad" "drive_coupling_DC" 				"arri_s_drive_coupling_DC.stl"
#openscadPart "arri_s.scad" "animation_motor_DC_cap" 		"arri_s_animation_motor_DC_cap.stl"
#openscadPart "arri_s.scad" "animation_motor_DC" 			"arri_s_animation_motor_DC.stl"
#openscadPart "arri_s.scad" "animation_motor" 				"arri_s_animation_motor.stl"
#openscadPart "arri_s.scad" "animation_motor_cap" 			"arri_s_animation_motor_cap.stl"
#openscadPart "arri_s.scad" "drive_coupling" 				"arri_s_drive_coupling.stl"
#openscadPart "arri_s.scad" "bellows_camera_board_adapter" 	"arri_s_bellows_camera_board_adapter.stl"
#openscadPart "arri_s.scad" "bellows_camera_board" 			"arri_s_bellows_camera_board.stl"

openscadPart "arri_s_mount.scad" "mount" "arri_s_mount.stl"

# mcopy mono 99 projector controller

openscadPart "projector_controller.scad" "electronics_mount" "mcopy_mono99_electronics_mount.stl"