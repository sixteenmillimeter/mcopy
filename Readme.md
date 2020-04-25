# mcopy

An open platform for controlling small-gauge film optical printers (16mm, Super8, 8mm).

-------
1. <a href="#intro">Introduction</a>
2. <a href="#downloads">Downloads</a>
1. <a href="#usage">Usage</a>
2. <a href="#software">Software</a>
3. <a href="#firmware">Firmware</a>
3. <a href="#hardware">Hardware</a>
4. <a href="#why">Why?</a>

-------

## Introduction <a name="intro"></a>

The `mcopy` project is comprised of software and hardware for optical printers, built with re-purposed broken projectors.

#### Components

* Sequencer desktop app
* Scripting language, called `mscript`, for orchestrating complex sequences
* Arduino firmware for projectors, cameras, lights and existing printers
* 3D models of parts used for modifying projectors and printers
* Schematics for simple Arduino-based electronics
* Filmout feature for digitally transferring video and images to analog film
* Interoperability with the [intval3](https://github.com/sixteenmillimeter/intval3) intervalometer

## Downloads <a name="downloads"></a>

### Latest Installers
* [1.6.2](https://github.com/sixteenmillimeter/mcopy/releases/tag/1.6.2) for macOS and Linux (.deb)
* [1.6.1](https://github.com/sixteenmillimeter/mcopy/releases/tag/1.6.1) for macOS


### Older Versions
* [1.5.2](https://github.com/sixteenmillimeter/mcopy/releases/tag/1.5.2) for macOS
* [1.4.9](https://github.com/sixteenmillimeter/mcopy/releases/tag/1.4.9) for macOS and Linux (.deb)
* [1.2.0](https://github.com/sixteenmillimeter/mcopy/releases/tag/1.2.0) for macOS and Linux (.deb)
* [1.0.3](https://github.com/sixteenmillimeter/mcopy/releases/tag/1.0.3) for macOS and Linux (.deb)

For Windows, you can [install from source](https://github.com/sixteenmillimeter/mcopy/tree/master/app#mcopy-desktop-app) for now.

## Usage <a name="usage"></a>

The software requires your hardware to be in place before the mcopy control app is useful.

![mcopy app](docs/mcopy.png?raw=true "mcopy app")

## Software <a name="software"></a>

The mcopy desktop app is an Electron-based project which can be built for Linux, Windows and macOS.
Pre-built packages will be made available for macOS, initially, with the other two target platforms to follow.
To build the desktop app from source, see the [installation and running instructions](https://github.com/sixteenmillimeter/mcopy/tree/master/app#mcopy-desktop-app).
The desktop software also interoperates with two related projects; the Bluetooth + Wifi capable, Raspberry Pi-based [INTVAL3](https://github.com/sixteenmillimeter/intval3) and the Arduino-based [intval2](https://github.com/sixteenmillimeter/intval2).

## Firmware <a name="firmware"></a>

This project contains Arduino formware for controlling: 

* a projector
* a camera (see [intval2](https://github.com/sixteenmillimeter/intval2) for more info)
* a light
* a projector + a camera
* a projector + a light
* a camera + a light
* a camera + a projector + a light

Using a simple serial interface, this modular platform can be used to control DIY components, modified existing optical printers or a mixture of components.
The desktop app can connect to multiple serial devices, so your mcopy optical printer can be built from various designs that suit your hardware tastes/needs/available parts.


## Hardware <a name="hardware"></a>

All non-electronic hardware for this project is available as plaintext OpenSCAD files and 3D print-able .STL files. 
The hardware component of this project is aimed at modifying broken Bell & Howell projectors into USB serial-controlled projectors to be used in optical printing.
As a secondary capability, this desktop software and firmware package can be used to replace the sequencers for early-model JK optical printers, with some modification.


## Why? <a name="why"></a>

I'm interested in expanding the viability and access of the 16mm film format and to repurpose thre rising tide of discarded film technology.

