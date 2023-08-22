
PREFIX=mcopy

OPENSCAD=openscad
OPENSCAD_OPTIONS=-D VERBOSE=false
PYTHON=python
ORDERING_SCRIPT=common/c14n_stl.py
ECHO=echo

STL=../stl
MCOPY_RAILS=mcopy_rails.scad
MCOPY_RAILS_PARTS=$(shell bash parts.sh $MCOPY_RAILS)

all:	directories models

directories:
	mkdir -p $(STL)

models: directories $(MCOPY_RAILS)

$(MCOPY_RAILS) : $(STL)/mcopy_rails_%.stl 
	$(OPENSCAD) $(OPENSCAD_OPTIONS) -o $(STL)/mcopy_rails_$@.stl -D PART=\"$(subst $(PREFIX)_,,$(subst .stl,,$(@F)))\" $<
	$(PYTHON) $(ORDERING_SCRIPT) $(STL)/mcopy_rails_$@.stl $<