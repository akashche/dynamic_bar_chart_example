# Copyright 2015, akashche at redhat.com
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

all: clean bundle

clean:
	rm -rf build

bundle:
	mkdir build
	cp -a public_html/* build
	rm -rf build/lib/dojo/.git
	rm -rf build/lib/dojox/.git
	cd build && zip -qyr webapp.zip *
