#!/bin/bash

openscadPart () {
	openscad -o "./stl/${3}" -D"PART=\"${2}\"" "./scad/${1}"
	if [ -f "./scad/common/c14n_stl.py" ]; then
		python3 ./scad/common/c14n_stl.py "./stl/${3}"
		echo "Normalized ${3}"
	fi
}

# arri s parts
if [[ "${1}" == "" ]] || [[ "${1}" == "arri_s" ]]; then
	openscadPart "arri_s.scad" "drive_coupling_DC_connector" 	"arri_s_drive_coupling_DC_connector.stl"
	openscadPart "arri_s.scad" "drive_coupling_DC" 				"arri_s_drive_coupling_DC.stl"
	openscadPart "arri_s.scad" "animation_motor_DC_cap" 		"arri_s_animation_motor_DC_cap.stl"
	openscadPart "arri_s.scad" "animation_motor_DC" 			"arri_s_animation_motor_DC.stl"
	openscadPart "arri_s.scad" "animation_motor" 				"arri_s_animation_motor.stl"
	openscadPart "arri_s.scad" "animation_motor_cap" 			"arri_s_animation_motor_cap.stl"
	openscadPart "arri_s.scad" "drive_coupling" 				"arri_s_drive_coupling.stl"
	openscadPart "arri_s.scad" "bellows_camera_board_adapter" 	"arri_s_bellows_camera_board_adapter.stl"
	openscadPart "arri_s.scad" "bellows_camera_board" 			"arri_s_bellows_camera_board.stl"

	openscadPart "arri_s_mount.scad" "mount" "arri_s_mount.stl"
fi

# mcopy mono 99 projector controller
if [[ "${1}" == "" ]] || [[ "${1}" == "projector_controller" ]]; then
	openscadPart "projector_controller.scad" "electronics_mount" "mcopy_mono99_electronics_mount.stl"
fi

# cpc connector
if [[ "${1}" == "" ]] || [[ "${1}" == "cpc_connectors" ]]; then
	openscadPart "cpc_connectors.scad" "cpc_9pin_plug" 			"cpc_connector_9pin_plug.stl" 
	openscadPart "cpc_connectors.scad" "cpc_9pin_plug_collar" 	"cpc_connector_9pin_plug_collar.stl"
	openscadPart "cpc_connectors.scad" "cpc_9pin_socket"		"cpc_connector_9pin_socket.stl"
fi

if [[ "${1}" == "" ]] || [[ "${1}" == "bellows" ]]; then
	openscadPart "bellows.scad" "bellows_lens_board"            "bellows_lens_board.stl"
	openscadPart "bellows.scad" "bellows_lens_board_magnetic"   "bellows_lens_board_magnetic.stl"
	openscadPart "bellows.scad" "bellows_camera_board"          "bellows_camera_board.stl"
	openscadPart "bellows.scad" "bellows_camera_board_magnetic" "bellows_camera_board_magnetic.stl"
	openscadPart "bellows.scad" "camera_mount"                  "bellows_camera_mount.stl"
	openscadPart "bellows.scad" "bellows_board_magnetic"        "bellows_board_magnetic.stl"
fi