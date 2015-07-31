
all: clean bundle

clean:
	rm -rf build

bundle:
	mkdir build
	cp -a public_html/* build
	rm -rf build/lib/dojo/.git
	rm -rf build/lib/dojox/.git
	zip -qyr build/webapp.zip build/*
