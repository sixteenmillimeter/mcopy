---
fontfamily: tgtermes
title: "mcopy: Modular Optical Tool Platform for Small Gauge Motion Picture Film"
documentclass: article
author:
- name: Matthew McWilliams
  affiliation: sixteenmillimeter.com
  email: hi@mmcwilliams.com
abstract: |
    The mcopy project consists of a modular, open-source platform for building optical tools for small gauge analog motion picture film formats.
    The platform can be used to assemble optical printers, digital transfer units and film recorders for digital images.
    Taking inspiration and guidance from free and open-source hardware and software projects, this approach aims to empower DIY projects that enable artists and artist-run film labs to build their own sytems and design their own practices around their own needs and abilities.
bibliography: sources.bib
csl: citation_style.csl
---

# Introduction

Dennis Couzin explains very plainly, in the opening line of _Notes on Optical Printer Technique_, that "an optical printer is a device for photographing the frames of one film so as to make another film." [@notes-couzin]
Consisting of a camera, a lens, a projector and a light the optical printer is a simple device that provides powerful manipulative analog capabilities to the film artist.
Optical printers allow filmmakers to control time, image and color frame-by-frame and without a digital intermediary.

The mcopy platform was started in 2009 as a one-off retrofit of a broken Bell & Howell projector.
Its initial goal was to create an optical printer with what was available at the time.
Using an Arduino, a toy DC motor, some tin foil and LEDs the first approach was made towards designing this system from otherwise discarded hardware.
Assembling this with a small copy stand and a crudely-controlled Bolex 16mm camera, 

# Motivations

A common scenario in the analog filmmaking world is a person or organization in possession of partial or non-working optical printer.
One solution for this, potentially, would be to meticulously replace or repair any missing or non-functional parts.
This proves to be a challenge when the companies that created those parts no longer exist and the documentation for repairing these machines was either never produced or never made public.
A remaining solution that presents itself is to "hack" these machines and retrofit them with available techniques.

Another complication to any approach to modernizing these machines is that they were produced in small batches with many changes in design between these revisions.
This makes for a very non-standard pool of components to be assembling into a single system.
The counter to that is estabishing a common interface for this platform.
Anything that can be conformed to this new standard can be assimilated and new configurations can be built that were not possible with legacy hardware sequencers.


# Design Philosophy

Tools purpose-built for working with 16mm, Super8 and Regular 8 film are no longer regularly being produced.
There are exceptions, but without a large commercial production demand, manufacturing companies that are theoretically capable of producing the gear required to work with analog film are choosing not to.
This leaves the future of the analog cinema in the hands of its practitioners to steward the continuation and advancement of the art.
By looking to other disciplines, be they arts or sciences, artists who work with film can benefit from the ways that small-scale desktop manufacturing and rapid prototyping have both preserved and augmented other practices.

The Arduino project [@arduino-about] created an explosion of capabilities that are now available to hobbyists and educators by making an open and extendable platform of programmable microcontrollers.
Amateurs are offered the ability to control physical electronic hardware with code in a way that was completely inaccessible due to cost and complexity only years prior.
The Arduino improved on the Parallax BASIC Stamp, a closed-source physical computing platform that required special software for the build toolchain, replacing it with an open-source board and an integrated development environment (IDE) for easily programming the board that could run cross-platform. [@arduino-os]
By leveraging the tools themselves--Arduino microcontrollers and software--as well as the projects' own approach to making an open, clear and accessible way to work with electronics the mcopy project can prioritize simplicity and openness over complexity and trade secrets held for profit.


What emerges from the synthesis of newly-accessible machine-computer interfaces and open manufacturing technologies is the possibility to create new tools that serve the needs filmmakers have today.
Every component can be represented by a serial device that connects to a computer and those devices can be sequenced and controlled by a common application.


By pursuing modular design, filmmakers can use the mcopy platform to create multi-purpose tools that change their functionality by changing their configuration.
Making an mcopy-controlled camera module for a film-to-film optical printer saves the time and effort of creating a second mcopy-controlled camera module for a film out digital recording system; they can be the exact same camera with only a different image source.
Similarly the system can be used to swap a film camera for a digital one; the sequencer neither cares nor needs to know whether it's controlling a Bolex or a DSLR.
It just has to operate them in the correct order without overlapping.

Two already emergent advantages over closed-source alternatives are the clear and simple plaintext protocol and the sequencer application that runs cross-platform and ties the system together.

# Serial Protocol

At the heart of the functionality of intermittant-motion film printers like an optical printer is the sequencing of discrete actions.
If the camera and projector both run at the same time, or if one is moving before the other completes an action, motion blur will be introduced to the images.
Frames of film must be resting in place for rephotographing onto film or "scanning" the image digitally in these systems.
So, as a result, the mcopy serial protocol has a simple but effective rule: all physical actions are done one-at-a-time and with request and then confirmation steps.
If the camera is triggered to capture a frame with a byte `c` then the camera device must return that byte `c` to confirm that it is complete and is not moving.

There is a library of action command bytes, an ever-growing list, but at the time of this writing represent a mostly-complete range of functionality for a variety of modular hardware components.

Devices, as of now, are expected to operate on `57600` baud and be excessible over serial by any capable serial client.

# Desktop Application

Due to the simplicity of the protocol, the mcopy desktop application existed in many forms before settling as a cross-platform Electron [@electron] app.

The earliest version was a PHP web application that would compile a sequence into a byte array and then send that over serial to the, then, single Arduino that controlled the physical hardware.
The immediate drawback here is that PHP executes per-request, meaning that the serial connection would have to be re-initalized each time there's a user-interaction or a more complicated logic that would keep a device persisted would need to be put into place.
I had neither the capability or inclination to make this work.

The next version was built in Processing [@processing]--a Java-based application that was built for creative programming--which was much more appropriate for the task but has other drawbacks.
The general-purpose graphical interfaces for Processing, things like text inputs and forms, are not ideal and were difficult to develop with and use.

# Retrofitting Existing Hardware

# New Hardware

Retrofitting existing hardware was always intended as the first step to producing new hardware modules that could eventually completely replace all legacy machine parts.
This approach is sometimes referred to as a "Ship of Theseus pattern" [@wiki-shipoftheseus] and in this application is, simply put: build machines using parts that people and organizations already have until total replacements can be designed.
The practice of retrofitting hardware, in this case, requires the kind of inspection that makes designing replacements possible: detailed measurements, documenting electrical diagrams, and review of sourced components.
Two examples of this pattern being applied and materializing new modular components are the projector and gate designs.

## The Projector

## The Gate



## References

---
refs: |
   ::: {#refs}
   :::
...