
all: clean bundle

clean:
	rm -rf build

bundle:
	mkdir build
	cp -a public_html/* build
	rm -rf build/lib/dojo/.git
	rm -rf build/lib/dojox/.git
	cd build && zip -qyr webapp.zip *
