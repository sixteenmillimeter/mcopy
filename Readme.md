# mcopy

An open platform for controlling small-gauge film optical printers (16mm, Super8, 8mm).

-------
1. <a href="#intro">Introduction</a>
2. <a href="#download"></a>
2. <a href="#software">Software</a>
3. <a href="#firmware">Firmware</a>
3. <a href="#hardware">Hardware</a>
4. <a href="#why">Why?</a>

-------

## Introduction <a name="intro"></a>

The `mcopy` project is comprised of software and hardware for optical printers, built with re-purposed broken projectors.

## Downloads


#### Components

* Sequencer desktop app
* Scripting language, called mscript, for complex sequences
* Arduino firmware for projectors, cameras, lights and existing printers
* 3D models of parts

## Software <a name="software"></a>

The mcopy desktop app is an Electron-based project which can be built for Linux, Windows and Mac.

## Firmware <a name="firmware"></a>

This project contains Arduino formware for controlling: 

* projector
* camera (see [intval2](https://github.com/sixteenmillimeter/intval2.git) for more info)
* light
* projector + camera
* projector + light
* camera + light
* projector + camera + light

Using a simple interface, this modular platform can be used to control custom-built and modified legacy optical printers. 


## Hardware <a name="hardware"></a>

All hardware for this project is available as plaintext OpenSCAD files and 3D print-able .STL files. The hardware component of this project is aimed at modifying broken Bell & Howell projectors into USB serial-controlled projectors to be used in optical printing.


## Why? <a name="why"></a>

I'm interested in expanding the viability and access of the 16mm film format and to repurpose thre rising tide of discarded film technology.

