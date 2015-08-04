/*
 * Copyright 2015, akashche at redhat.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    "dojo/_base/declare"
], function (declare) {

    // returning singletone
    return new (declare([], {
        /**
         * Enriches first object with the properties from the second one,
         * do not handle array propereties, source:
         * http://mail.dojotoolkit.org/pipermail/dojo-interest/2012-June/067402.html
         * 
         * @param {object} dest : destination object
         * @param {object} source : source object
         * @returns {object} : dest object
         */
        mixinDeep: function (dest, source) {
            //Recursively mix the properties of two objects
            var empty = {};
            for (var name in source) {
                if (!(name in dest) || (dest[name] !== source[name] &&
                        (!(name in empty) || empty[name] !== source[name]))) {
                    try {
                        if (Object === source[name].constructor) {
                            dest[name] = this.mixinDeep(dest[name], source[name]);
                        } else {
                            dest[name] = source[name];
                        }
                    } catch (e) {
                        // Property in destination object not set. Create it and set its value.
                        dest[name] = source[name];
                    }
                }
            }
            return dest;
        },
        undefinedOrNull: function (val) {
            return "undefined" === typeof (val) || null === val;
        },
        endsWith: function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
    }));
});




