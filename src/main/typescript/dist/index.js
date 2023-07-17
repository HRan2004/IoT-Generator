/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 407:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UNKNOWN = void 0;
exports.UNKNOWN = "CONST-UNKNOWN";


/***/ }),

/***/ 603:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataBatch = void 0;
const tal_type_1 = __webpack_require__(960);
class GParser {
    constructor(from, to) {
        if (typeof from === "string")
            from = new tal_type_1.default(from);
        if (typeof to === "string")
            to = new tal_type_1.default(to);
        this.from = from;
        this.to = to;
    }
    convert(value) {
        if (this.from.type === tal_type_1.DataType.ANY || this.to.type == tal_type_1.DataType.ANY)
            return value;
        if (this.from.type === this.to.type) {
            if (!(this.from.isNumber() || this.from.hadRange() || this.to.hadRange()))
                return value;
        }
        let sourceValue = value;
        let batch = new DataBatch();
        batch.real = value;
        batch.type = this.from.type.toString();
        if (this.from.isNumber()) {
            batch.int = Math.round(value);
            batch.float = parseFloat(value);
            batch.string = value.toString();
            if (this.from.hadRange()) {
                batch.boolean = value >= this.from.range[0] + this.from.range[2] / 2;
                batch.percent = (value - this.from.range[0]) / (this.from.range[1] - this.from.range[0]);
            }
        }
        else if (this.from.type === tal_type_1.DataType.BOOLEAN) {
            batch.int = value ? 1 : 0;
            batch.float = value ? 1.0 : 0.0;
            batch.string = value ? "true" : "false";
            batch.boolean = value;
            batch.percent = value ? 1.0 : 0.0;
        }
        else if (this.from.type === tal_type_1.DataType.STRING) {
            batch.string = value;
            if (this.from.hadOptions()) {
                batch.int = this.from.indexInOptions(value);
                batch.float = this.from.indexInOptions(value);
                let len = this.from.options.length;
                batch.boolean = batch.int >= len / 2;
                batch.percent = batch.int / (len - 1);
            }
            else {
                batch.int = Math.round(value);
                batch.float = parseFloat(value);
                batch.boolean = value === "true";
                batch.percent = value === "true" ? 1.0 : 0.0;
            }
        }
        else {
            batch.string = value.toString();
            batch.float = parseFloat(value);
            if (isNaN(batch.float))
                batch.float = 0.0;
            batch.int = Math.round(batch.float);
            batch.boolean = value === "true";
            batch.percent = value === "true" ? 1.0 : 0.0;
        }
        if (this.to.isNumber()) {
            if (this.to.hadRange()) {
                if (this.from.isNumber() && this.from.hadRange()) {
                    value = this.to.range[0] + batch.percent * (this.to.range[1] - this.to.range[0]);
                }
                else if (this.from.type === tal_type_1.DataType.STRING && this.from.hadOptions()) {
                    value = this.to.range[0] + batch.percent * this.to.range[2];
                    value = this.to.range[0] + batch.percent * (this.to.range[1] - this.to.range[0]);
                }
                else if (this.from.isNumber()) {
                    value = Math.min(this.to.range[1], Math.max(this.to.range[0], value));
                }
                else if (this.from.type === tal_type_1.DataType.STRING) {
                    if (!isNaN(batch.float)) {
                        value = Math.min(this.to.range[1], Math.max(this.to.range[0], batch.float));
                    }
                    else {
                        value = value.toString().length > 0 ? this.to.range[1] : this.to.range[0];
                    }
                }
                else if (this.from.type === tal_type_1.DataType.BOOLEAN) {
                    value = value ? this.to.range[1] : this.to.range[0];
                }
            }
            else {
                if (this.from.isNumber()) {
                }
                else if (this.from.type === tal_type_1.DataType.STRING) {
                    if (!isNaN(batch.float)) {
                        value = Math.min(this.to.range[1], Math.max(this.to.range[0], batch.float));
                    }
                    else {
                        value = value.toString().length > 0 ? this.to.range[1] : this.to.range[0];
                    }
                }
                else if (this.from.type === tal_type_1.DataType.BOOLEAN) {
                    value = batch.int;
                }
                else {
                    value = batch.float;
                }
            }
            if (this.to.type === tal_type_1.DataType.INT) {
                value = Math.round(value);
            }
        }
        else if (this.to.type === tal_type_1.DataType.BOOLEAN) {
            value = batch.boolean;
        }
        else if (this.to.type === tal_type_1.DataType.STRING) {
            if (this.to.hadOptions()) {
                let len = this.to.options.length;
                value = this.to.options[Math.round(batch.percent * len)];
            }
            else {
                value = batch.string;
            }
        }
        if (sourceValue !== value) {
            console.log("GParser:", this.from.toCtText(), "->", this.to.toCtText(), "\n", { "DataBatch": batch }, "\nConvert result:", sourceValue, "->", value);
        }
        return value;
    }
}
exports["default"] = GParser;
class DataBatch {
    constructor() {
        this.int = 0;
        this.float = 0.0;
        this.boolean = false;
        this.string = "";
        this.percent = 0.0;
        this.real = 0;
        this.type = "int";
        this.unit = "";
        this.significance = "";
    }
}
exports.DataBatch = DataBatch;


/***/ }),

/***/ 989:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class NormalParser {
    static from(data) {
        if (typeof data === 'string') {
            if (data.toLowerCase() === 'true')
                return true;
            if (data.toLowerCase() === 'false')
                return false;
            if (data === 'OCCUPIED')
                return true;
            if (data === 'NO_MAN')
                return false;
        }
        return data;
    }
    static to(data) {
        return data;
    }
}
exports["default"] = NormalParser;


/***/ }),

/***/ 960:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataType = void 0;
class TalType {
    constructor(ct) {
        this.type = DataType.ANY;
        this.range = [];
        this.options = [];
        let args = ct.trim().split(':');
        this.type = DataType.make(args[0]);
        if (args.length > 1) {
            let arg = args[1];
            if (this.isNumber()) {
                let range = arg.trim().split(',');
                if (range.length >= 2) {
                    let step = range.length >= 3 ? parseFloat(range[2]) : 1;
                    this.range = [parseFloat(range[0]), parseFloat(range[1]), step];
                }
            }
            else if (this.type === DataType.STRING) {
                this.options = arg.split(',');
            }
        }
    }
    isNumber() {
        return this.type === DataType.INT || this.type === DataType.FLOAT;
    }
    hadRange() {
        return this.range[0] !== -1 && this.range[1] !== -1;
    }
    isInRange(value) {
        return value >= this.range[0] && value <= this.range[1];
    }
    hadOptions() {
        return this.options.length > 0;
    }
    indexInOptions(value) {
        return this.options.indexOf(value);
    }
    toCtText() {
        let text = this.type.toString();
        if (this.isNumber() && this.hadRange()) {
            text += `:${this.range[0]},${this.range[1]}`;
            if (this.range[2] !== 1)
                text += `,${this.range[2]}`;
        }
        else if (this.type === DataType.STRING && this.hadOptions()) {
            text += `:${this.options.join(',')}`;
        }
        return text;
    }
}
exports["default"] = TalType;
class DataType {
    static make(text) {
        switch (text.toLowerCase()) {
            case 'int':
                return DataType.INT;
            case 'float':
                return DataType.FLOAT;
            case 'boolean':
                return DataType.BOOLEAN;
            case 'string':
                return DataType.STRING;
            case 'object':
                return DataType.OBJECT;
            case 'any':
                return DataType.ANY;
            case 'none':
                return DataType.NONE;
            default:
                return DataType.ANY;
        }
    }
}
exports.DataType = DataType;
DataType.INT = 'INT';
DataType.FLOAT = 'FLOAT';
DataType.BOOLEAN = 'BOOLEAN';
DataType.STRING = 'STRING';
DataType.OBJECT = 'OBJECT';
DataType.ANY = 'ANY';
DataType.NONE = 'NONE';


/***/ }),

/***/ 367:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.From = void 0;
const const_1 = __webpack_require__(407);
const index_1 = __webpack_require__(844);
class Property {
    constructor(device, key, update = null) {
        this.localValue = const_1.UNKNOWN;
        this.remoteValue = const_1.UNKNOWN;
        this.listeners = [];
        this.device = device;
        this.key = key;
        this.update = update;
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    removeListener(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
    removeAllListeners() {
        this.listeners = [];
    }
    setLocalValue(value, from = From.Local) {
        if (this.localValue === value)
            return false;
        this.localValue = value;
        this.listeners.forEach(l => l(value));
        if (this.remoteValue !== value) {
            this.setRemoteValue(value, From.Local);
        }
        return true;
    }
    setRemoteValue(value, from = From.Device) {
        if (this.remoteValue === value) {
            return false;
        }
        this.remoteValue = value;
        if (from === From.Local) {
            console.log(`Update remote: ${this.device}.${this.key} =`, value);
            this.update && this.update(value).then(r => {
                console.log(`Update ${this.device}.${this.key} success:`, r);
            }, e => {
                console.error(`Update ${this.device}.${this.key} error:`);
                console.error(e);
            });
        }
        else if (from === From.Device) {
            if (index_1.inited) {
                console.log('');
            }
            console.log(`Receive data: ${this.device}.${this.key} =`, value);
            this.setLocalValue(value, From.Remote);
        }
        return true;
    }
    getLocalValue() {
        return this.localValue;
    }
    getRemoteValue() {
        return this.remoteValue;
    }
}
exports["default"] = Property;
var From;
(function (From) {
    From[From["Local"] = 0] = "Local";
    From[From["Remote"] = 1] = "Remote";
    From[From["Page"] = 2] = "Page";
    From[From["Device"] = 3] = "Device";
})(From || (exports.From = From = {}));


/***/ }),

/***/ 89:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mlog = exports.HaveNotSupport = exports.PDS = exports.PDO = exports.Queue = void 0;
class Queue {
    static delay(time) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, time);
            });
        });
    }
}
exports.Queue = Queue;
function PDO(command, ...args) {
    return null;
}
exports.PDO = PDO;
function PDS(command, ...args) {
    return null;
}
exports.PDS = PDS;
function HaveNotSupport(...args) {
    return null;
}
exports.HaveNotSupport = HaveNotSupport;
function mlog(...args) {
    console.log(...args);
    return false;
}
exports.mlog = mlog;


/***/ }),

/***/ 844:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inited = void 0;
const property_1 = __webpack_require__(367);
const normal_parser_1 = __webpack_require__(989);
const g_parser_1 = __webpack_require__(603);
const utils_1 = __webpack_require__(89);
let DSM = {};
exports.inited = false;
const light0 = DeviceManager.createLight('Lamp(Home)_0');
const light1 = DeviceManager.createLight('Lamp(Home)_1');
init().then(r => {
    console.log('Init Success.');
    exports.inited = true;
    main().then(r => {
        console.log('');
        console.log('Running...');
    }, e => {
        console.error('Main Failed.');
        console.error(e);
    });
}, e => {
    console.error('Init Failed.');
    console.error(e);
});
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        DSM.light0 = {
            switch: new property_1.default('light0', 'switch'),
        };
        DSM.light1 = {
            relativeBrightness: new property_1.default('light1', 'relativeBrightness'),
        };
        DSM.light0.switch.update = v => light0.setSwitch(normal_parser_1.default.to(v));
        DSM.light1.relativeBrightness.update = v => light1.setRelativeBrightness(normal_parser_1.default.to(v));
        DSM.light0.switch.setRemoteValue((yield light0.getSwitch()).value);
        DSM.light1.relativeBrightness.setRemoteValue((yield light1.getRelativeBrightness()).value);
        light0.subscribe(data => {
            data.switch = normal_parser_1.default.from(data.switch);
            DSM.light0.switch.setRemoteValue(data.switch);
        });
        light1.subscribe(data => {
            data.relativeBrightness = normal_parser_1.default.from(data.relativeBrightness);
            DSM.light1.relativeBrightness.setRemoteValue(data.relativeBrightness);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let parser0 = new g_parser_1.default('BOOLEAN', 'INT:0.0,100.0,1.0');
        DSM.light0.switch.addListener(value => {
            value = parser0.convert(value);
            (0, utils_1.mlog)(' ├ @BIND light1.relativeBrightness changed-to', value);
            DSM.light1.relativeBrightness.setLocalValue(value, property_1.From.Local);
        });
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(844);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsY0FBYztBQUNkLG1CQUFtQixtQkFBTyxDQUFDLEdBQWlCO0FBQzVDLHdCQUF3QixtQkFBTyxDQUFDLEdBQTZCO0FBQzdELG1CQUFtQixtQkFBTyxDQUFDLEdBQXdCO0FBQ25ELGdCQUFnQixtQkFBTyxDQUFDLEVBQWM7QUFDdEM7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGNBQWM7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7Ozs7Ozs7VUNqRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9jb3JlL2NvbnN0LnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3BhcnNlci9nLXBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9wYXJzZXIvbm9ybWFsLXBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9wYXJzZXIvdGFsLXR5cGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvcmUvcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvcmUvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2luZGV4LnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVOS05PV04gPSB2b2lkIDA7XG5leHBvcnRzLlVOS05PV04gPSBcIkNPTlNULVVOS05PV05cIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EYXRhQmF0Y2ggPSB2b2lkIDA7XG5jb25zdCB0YWxfdHlwZV8xID0gcmVxdWlyZShcIi4vdGFsLXR5cGVcIik7XG5jbGFzcyBHUGFyc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihmcm9tLCB0bykge1xuICAgICAgICBpZiAodHlwZW9mIGZyb20gPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBmcm9tID0gbmV3IHRhbF90eXBlXzEuZGVmYXVsdChmcm9tKTtcbiAgICAgICAgaWYgKHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHRvID0gbmV3IHRhbF90eXBlXzEuZGVmYXVsdCh0byk7XG4gICAgICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgICAgIHRoaXMudG8gPSB0bztcbiAgICB9XG4gICAgY29udmVydCh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuQU5ZIHx8IHRoaXMudG8udHlwZSA9PSB0YWxfdHlwZV8xLkRhdGFUeXBlLkFOWSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuZnJvbS50eXBlID09PSB0aGlzLnRvLnR5cGUpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMuZnJvbS5pc051bWJlcigpIHx8IHRoaXMuZnJvbS5oYWRSYW5nZSgpIHx8IHRoaXMudG8uaGFkUmFuZ2UoKSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzb3VyY2VWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBsZXQgYmF0Y2ggPSBuZXcgRGF0YUJhdGNoKCk7XG4gICAgICAgIGJhdGNoLnJlYWwgPSB2YWx1ZTtcbiAgICAgICAgYmF0Y2gudHlwZSA9IHRoaXMuZnJvbS50eXBlLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh0aGlzLmZyb20uaXNOdW1iZXIoKSkge1xuICAgICAgICAgICAgYmF0Y2guaW50ID0gTWF0aC5yb3VuZCh2YWx1ZSk7XG4gICAgICAgICAgICBiYXRjaC5mbG9hdCA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgYmF0Y2guc3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyb20uaGFkUmFuZ2UoKSkge1xuICAgICAgICAgICAgICAgIGJhdGNoLmJvb2xlYW4gPSB2YWx1ZSA+PSB0aGlzLmZyb20ucmFuZ2VbMF0gKyB0aGlzLmZyb20ucmFuZ2VbMl0gLyAyO1xuICAgICAgICAgICAgICAgIGJhdGNoLnBlcmNlbnQgPSAodmFsdWUgLSB0aGlzLmZyb20ucmFuZ2VbMF0pIC8gKHRoaXMuZnJvbS5yYW5nZVsxXSAtIHRoaXMuZnJvbS5yYW5nZVswXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuQk9PTEVBTikge1xuICAgICAgICAgICAgYmF0Y2guaW50ID0gdmFsdWUgPyAxIDogMDtcbiAgICAgICAgICAgIGJhdGNoLmZsb2F0ID0gdmFsdWUgPyAxLjAgOiAwLjA7XG4gICAgICAgICAgICBiYXRjaC5zdHJpbmcgPSB2YWx1ZSA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiO1xuICAgICAgICAgICAgYmF0Y2guYm9vbGVhbiA9IHZhbHVlO1xuICAgICAgICAgICAgYmF0Y2gucGVyY2VudCA9IHZhbHVlID8gMS4wIDogMC4wO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZnJvbS50eXBlID09PSB0YWxfdHlwZV8xLkRhdGFUeXBlLlNUUklORykge1xuICAgICAgICAgICAgYmF0Y2guc3RyaW5nID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5mcm9tLmhhZE9wdGlvbnMoKSkge1xuICAgICAgICAgICAgICAgIGJhdGNoLmludCA9IHRoaXMuZnJvbS5pbmRleEluT3B0aW9ucyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYmF0Y2guZmxvYXQgPSB0aGlzLmZyb20uaW5kZXhJbk9wdGlvbnModmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLmZyb20ub3B0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgYmF0Y2guYm9vbGVhbiA9IGJhdGNoLmludCA+PSBsZW4gLyAyO1xuICAgICAgICAgICAgICAgIGJhdGNoLnBlcmNlbnQgPSBiYXRjaC5pbnQgLyAobGVuIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBiYXRjaC5pbnQgPSBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBiYXRjaC5mbG9hdCA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJhdGNoLmJvb2xlYW4gPSB2YWx1ZSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgICAgICAgICAgYmF0Y2gucGVyY2VudCA9IHZhbHVlID09PSBcInRydWVcIiA/IDEuMCA6IDAuMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJhdGNoLnN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBiYXRjaC5mbG9hdCA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGJhdGNoLmZsb2F0KSlcbiAgICAgICAgICAgICAgICBiYXRjaC5mbG9hdCA9IDAuMDtcbiAgICAgICAgICAgIGJhdGNoLmludCA9IE1hdGgucm91bmQoYmF0Y2guZmxvYXQpO1xuICAgICAgICAgICAgYmF0Y2guYm9vbGVhbiA9IHZhbHVlID09PSBcInRydWVcIjtcbiAgICAgICAgICAgIGJhdGNoLnBlcmNlbnQgPSB2YWx1ZSA9PT0gXCJ0cnVlXCIgPyAxLjAgOiAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudG8uaXNOdW1iZXIoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudG8uaGFkUmFuZ2UoKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyb20uaXNOdW1iZXIoKSAmJiB0aGlzLmZyb20uaGFkUmFuZ2UoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMudG8ucmFuZ2VbMF0gKyBiYXRjaC5wZXJjZW50ICogKHRoaXMudG8ucmFuZ2VbMV0gLSB0aGlzLnRvLnJhbmdlWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuU1RSSU5HICYmIHRoaXMuZnJvbS5oYWRPcHRpb25zKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnRvLnJhbmdlWzBdICsgYmF0Y2gucGVyY2VudCAqIHRoaXMudG8ucmFuZ2VbMl07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy50by5yYW5nZVswXSArIGJhdGNoLnBlcmNlbnQgKiAodGhpcy50by5yYW5nZVsxXSAtIHRoaXMudG8ucmFuZ2VbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmZyb20uaXNOdW1iZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMudG8ucmFuZ2VbMV0sIE1hdGgubWF4KHRoaXMudG8ucmFuZ2VbMF0sIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZnJvbS50eXBlID09PSB0YWxfdHlwZV8xLkRhdGFUeXBlLlNUUklORykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKGJhdGNoLmZsb2F0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLm1pbih0aGlzLnRvLnJhbmdlWzFdLCBNYXRoLm1heCh0aGlzLnRvLnJhbmdlWzBdLCBiYXRjaC5mbG9hdCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IDAgPyB0aGlzLnRvLnJhbmdlWzFdIDogdGhpcy50by5yYW5nZVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmZyb20udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5CT09MRUFOKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPyB0aGlzLnRvLnJhbmdlWzFdIDogdGhpcy50by5yYW5nZVswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcm9tLmlzTnVtYmVyKCkpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuU1RSSU5HKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4oYmF0Y2guZmxvYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMudG8ucmFuZ2VbMV0sIE1hdGgubWF4KHRoaXMudG8ucmFuZ2VbMF0sIGJhdGNoLmZsb2F0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gMCA/IHRoaXMudG8ucmFuZ2VbMV0gOiB0aGlzLnRvLnJhbmdlWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZnJvbS50eXBlID09PSB0YWxfdHlwZV8xLkRhdGFUeXBlLkJPT0xFQU4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBiYXRjaC5pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGJhdGNoLmZsb2F0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnRvLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuSU5UKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnRvLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuQk9PTEVBTikge1xuICAgICAgICAgICAgdmFsdWUgPSBiYXRjaC5ib29sZWFuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudG8udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5TVFJJTkcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRvLmhhZE9wdGlvbnMoKSkge1xuICAgICAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLnRvLm9wdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy50by5vcHRpb25zW01hdGgucm91bmQoYmF0Y2gucGVyY2VudCAqIGxlbildO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBiYXRjaC5zdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNvdXJjZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHUGFyc2VyOlwiLCB0aGlzLmZyb20udG9DdFRleHQoKSwgXCItPlwiLCB0aGlzLnRvLnRvQ3RUZXh0KCksIFwiXFxuXCIsIHsgXCJEYXRhQmF0Y2hcIjogYmF0Y2ggfSwgXCJcXG5Db252ZXJ0IHJlc3VsdDpcIiwgc291cmNlVmFsdWUsIFwiLT5cIiwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBHUGFyc2VyO1xuY2xhc3MgRGF0YUJhdGNoIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbnQgPSAwO1xuICAgICAgICB0aGlzLmZsb2F0ID0gMC4wO1xuICAgICAgICB0aGlzLmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLnBlcmNlbnQgPSAwLjA7XG4gICAgICAgIHRoaXMucmVhbCA9IDA7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiaW50XCI7XG4gICAgICAgIHRoaXMudW5pdCA9IFwiXCI7XG4gICAgICAgIHRoaXMuc2lnbmlmaWNhbmNlID0gXCJcIjtcbiAgICB9XG59XG5leHBvcnRzLkRhdGFCYXRjaCA9IERhdGFCYXRjaDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgTm9ybWFsUGFyc2VyIHtcbiAgICBzdGF0aWMgZnJvbShkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChkYXRhLnRvTG93ZXJDYXNlKCkgPT09ICdmYWxzZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICdPQ0NVUElFRCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gJ05PX01BTicpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBzdGF0aWMgdG8oZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBOb3JtYWxQYXJzZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGF0YVR5cGUgPSB2b2lkIDA7XG5jbGFzcyBUYWxUeXBlIHtcbiAgICBjb25zdHJ1Y3RvcihjdCkge1xuICAgICAgICB0aGlzLnR5cGUgPSBEYXRhVHlwZS5BTlk7XG4gICAgICAgIHRoaXMucmFuZ2UgPSBbXTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW107XG4gICAgICAgIGxldCBhcmdzID0gY3QudHJpbSgpLnNwbGl0KCc6Jyk7XG4gICAgICAgIHRoaXMudHlwZSA9IERhdGFUeXBlLm1ha2UoYXJnc1swXSk7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCBhcmcgPSBhcmdzWzFdO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1iZXIoKSkge1xuICAgICAgICAgICAgICAgIGxldCByYW5nZSA9IGFyZy50cmltKCkuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2UubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0ZXAgPSByYW5nZS5sZW5ndGggPj0gMyA/IHBhcnNlRmxvYXQocmFuZ2VbMl0pIDogMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yYW5nZSA9IFtwYXJzZUZsb2F0KHJhbmdlWzBdKSwgcGFyc2VGbG9hdChyYW5nZVsxXSksIHN0ZXBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gRGF0YVR5cGUuU1RSSU5HKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gYXJnLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNOdW1iZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgPT09IERhdGFUeXBlLklOVCB8fCB0aGlzLnR5cGUgPT09IERhdGFUeXBlLkZMT0FUO1xuICAgIH1cbiAgICBoYWRSYW5nZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VbMF0gIT09IC0xICYmIHRoaXMucmFuZ2VbMV0gIT09IC0xO1xuICAgIH1cbiAgICBpc0luUmFuZ2UodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID49IHRoaXMucmFuZ2VbMF0gJiYgdmFsdWUgPD0gdGhpcy5yYW5nZVsxXTtcbiAgICB9XG4gICAgaGFkT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5sZW5ndGggPiAwO1xuICAgIH1cbiAgICBpbmRleEluT3B0aW9ucyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmluZGV4T2YodmFsdWUpO1xuICAgIH1cbiAgICB0b0N0VGV4dCgpIHtcbiAgICAgICAgbGV0IHRleHQgPSB0aGlzLnR5cGUudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHRoaXMuaXNOdW1iZXIoKSAmJiB0aGlzLmhhZFJhbmdlKCkpIHtcbiAgICAgICAgICAgIHRleHQgKz0gYDoke3RoaXMucmFuZ2VbMF19LCR7dGhpcy5yYW5nZVsxXX1gO1xuICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2VbMl0gIT09IDEpXG4gICAgICAgICAgICAgICAgdGV4dCArPSBgLCR7dGhpcy5yYW5nZVsyXX1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gRGF0YVR5cGUuU1RSSU5HICYmIHRoaXMuaGFkT3B0aW9ucygpKSB7XG4gICAgICAgICAgICB0ZXh0ICs9IGA6JHt0aGlzLm9wdGlvbnMuam9pbignLCcpfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVGFsVHlwZTtcbmNsYXNzIERhdGFUeXBlIHtcbiAgICBzdGF0aWMgbWFrZSh0ZXh0KSB7XG4gICAgICAgIHN3aXRjaCAodGV4dC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICBjYXNlICdpbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVHlwZS5JTlQ7XG4gICAgICAgICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFUeXBlLkZMT0FUO1xuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFUeXBlLkJPT0xFQU47XG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVHlwZS5TVFJJTkc7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVHlwZS5PQkpFQ1Q7XG4gICAgICAgICAgICBjYXNlICdhbnknOlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVHlwZS5BTlk7XG4gICAgICAgICAgICBjYXNlICdub25lJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0YVR5cGUuTk9ORTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFUeXBlLkFOWTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRGF0YVR5cGUgPSBEYXRhVHlwZTtcbkRhdGFUeXBlLklOVCA9ICdJTlQnO1xuRGF0YVR5cGUuRkxPQVQgPSAnRkxPQVQnO1xuRGF0YVR5cGUuQk9PTEVBTiA9ICdCT09MRUFOJztcbkRhdGFUeXBlLlNUUklORyA9ICdTVFJJTkcnO1xuRGF0YVR5cGUuT0JKRUNUID0gJ09CSkVDVCc7XG5EYXRhVHlwZS5BTlkgPSAnQU5ZJztcbkRhdGFUeXBlLk5PTkUgPSAnTk9ORSc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRnJvbSA9IHZvaWQgMDtcbmNvbnN0IGNvbnN0XzEgPSByZXF1aXJlKFwiLi9jb25zdFwiKTtcbmNvbnN0IGluZGV4XzEgPSByZXF1aXJlKFwiLi4vaW5kZXhcIik7XG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3IoZGV2aWNlLCBrZXksIHVwZGF0ZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZUFsbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB9XG4gICAgc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uTG9jYWwpIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxWYWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbCh2YWx1ZSkpO1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVtb3RlVmFsdWUodmFsdWUsIEZyb20uTG9jYWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRSZW1vdGVWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uRGV2aWNlKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3RlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGZyb20gPT09IEZyb20uTG9jYWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGUgcmVtb3RlOiAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSA9YCwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUgJiYgdGhpcy51cGRhdGUodmFsdWUpLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSBzdWNjZXNzOmAsIHIpO1xuICAgICAgICAgICAgfSwgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVXBkYXRlICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9IGVycm9yOmApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmcm9tID09PSBGcm9tLkRldmljZSkge1xuICAgICAgICAgICAgaWYgKGluZGV4XzEuaW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmUgZGF0YTogJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gPWAsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgRnJvbS5SZW1vdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBnZXRMb2NhbFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbFZhbHVlO1xuICAgIH1cbiAgICBnZXRSZW1vdGVWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlVmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUHJvcGVydHk7XG52YXIgRnJvbTtcbihmdW5jdGlvbiAoRnJvbSkge1xuICAgIEZyb21bRnJvbVtcIkxvY2FsXCJdID0gMF0gPSBcIkxvY2FsXCI7XG4gICAgRnJvbVtGcm9tW1wiUmVtb3RlXCJdID0gMV0gPSBcIlJlbW90ZVwiO1xuICAgIEZyb21bRnJvbVtcIlBhZ2VcIl0gPSAyXSA9IFwiUGFnZVwiO1xuICAgIEZyb21bRnJvbVtcIkRldmljZVwiXSA9IDNdID0gXCJEZXZpY2VcIjtcbn0pKEZyb20gfHwgKGV4cG9ydHMuRnJvbSA9IEZyb20gPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubWxvZyA9IGV4cG9ydHMuSGF2ZU5vdFN1cHBvcnQgPSBleHBvcnRzLlBEUyA9IGV4cG9ydHMuUERPID0gZXhwb3J0cy5RdWV1ZSA9IHZvaWQgMDtcbmNsYXNzIFF1ZXVlIHtcbiAgICBzdGF0aWMgZGVsYXkodGltZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5RdWV1ZSA9IFF1ZXVlO1xuZnVuY3Rpb24gUERPKGNvbW1hbmQsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydHMuUERPID0gUERPO1xuZnVuY3Rpb24gUERTKGNvbW1hbmQsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydHMuUERTID0gUERTO1xuZnVuY3Rpb24gSGF2ZU5vdFN1cHBvcnQoLi4uYXJncykge1xuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0cy5IYXZlTm90U3VwcG9ydCA9IEhhdmVOb3RTdXBwb3J0O1xuZnVuY3Rpb24gbWxvZyguLi5hcmdzKSB7XG4gICAgY29uc29sZS5sb2coLi4uYXJncyk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy5tbG9nID0gbWxvZztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXRlZCA9IHZvaWQgMDtcbmNvbnN0IHByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9jb3JlL3Byb3BlcnR5XCIpO1xuY29uc3Qgbm9ybWFsX3BhcnNlcl8xID0gcmVxdWlyZShcIi4vY29yZS9wYXJzZXIvbm9ybWFsLXBhcnNlclwiKTtcbmNvbnN0IGdfcGFyc2VyXzEgPSByZXF1aXJlKFwiLi9jb3JlL3BhcnNlci9nLXBhcnNlclwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi9jb3JlL3V0aWxzXCIpO1xubGV0IERTTSA9IHt9O1xuZXhwb3J0cy5pbml0ZWQgPSBmYWxzZTtcbmNvbnN0IGxpZ2h0MCA9IERldmljZU1hbmFnZXIuY3JlYXRlTGlnaHQoJ0xhbXAoSG9tZSlfMCcpO1xuY29uc3QgbGlnaHQxID0gRGV2aWNlTWFuYWdlci5jcmVhdGVMaWdodCgnTGFtcChIb21lKV8xJyk7XG5pbml0KCkudGhlbihyID0+IHtcbiAgICBjb25zb2xlLmxvZygnSW5pdCBTdWNjZXNzLicpO1xuICAgIGV4cG9ydHMuaW5pdGVkID0gdHJ1ZTtcbiAgICBtYWluKCkudGhlbihyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJycpO1xuICAgICAgICBjb25zb2xlLmxvZygnUnVubmluZy4uLicpO1xuICAgIH0sIGUgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdNYWluIEZhaWxlZC4nKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9KTtcbn0sIGUgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0luaXQgRmFpbGVkLicpO1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG59KTtcbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgRFNNLmxpZ2h0MCA9IHtcbiAgICAgICAgICAgIHN3aXRjaDogbmV3IHByb3BlcnR5XzEuZGVmYXVsdCgnbGlnaHQwJywgJ3N3aXRjaCcpLFxuICAgICAgICB9O1xuICAgICAgICBEU00ubGlnaHQxID0ge1xuICAgICAgICAgICAgcmVsYXRpdmVCcmlnaHRuZXNzOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KCdsaWdodDEnLCAncmVsYXRpdmVCcmlnaHRuZXNzJyksXG4gICAgICAgIH07XG4gICAgICAgIERTTS5saWdodDAuc3dpdGNoLnVwZGF0ZSA9IHYgPT4gbGlnaHQwLnNldFN3aXRjaChub3JtYWxfcGFyc2VyXzEuZGVmYXVsdC50byh2KSk7XG4gICAgICAgIERTTS5saWdodDEucmVsYXRpdmVCcmlnaHRuZXNzLnVwZGF0ZSA9IHYgPT4gbGlnaHQxLnNldFJlbGF0aXZlQnJpZ2h0bmVzcyhub3JtYWxfcGFyc2VyXzEuZGVmYXVsdC50byh2KSk7XG4gICAgICAgIERTTS5saWdodDAuc3dpdGNoLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBsaWdodDAuZ2V0U3dpdGNoKCkpLnZhbHVlKTtcbiAgICAgICAgRFNNLmxpZ2h0MS5yZWxhdGl2ZUJyaWdodG5lc3Muc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGxpZ2h0MS5nZXRSZWxhdGl2ZUJyaWdodG5lc3MoKSkudmFsdWUpO1xuICAgICAgICBsaWdodDAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5zd2l0Y2ggPSBub3JtYWxfcGFyc2VyXzEuZGVmYXVsdC5mcm9tKGRhdGEuc3dpdGNoKTtcbiAgICAgICAgICAgIERTTS5saWdodDAuc3dpdGNoLnNldFJlbW90ZVZhbHVlKGRhdGEuc3dpdGNoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxpZ2h0MS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLnJlbGF0aXZlQnJpZ2h0bmVzcyA9IG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LmZyb20oZGF0YS5yZWxhdGl2ZUJyaWdodG5lc3MpO1xuICAgICAgICAgICAgRFNNLmxpZ2h0MS5yZWxhdGl2ZUJyaWdodG5lc3Muc2V0UmVtb3RlVmFsdWUoZGF0YS5yZWxhdGl2ZUJyaWdodG5lc3MpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgbGV0IHBhcnNlcjAgPSBuZXcgZ19wYXJzZXJfMS5kZWZhdWx0KCdCT09MRUFOJywgJ0lOVDowLjAsMTAwLjAsMS4wJyk7XG4gICAgICAgIERTTS5saWdodDAuc3dpdGNoLmFkZExpc3RlbmVyKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VyMC5jb252ZXJ0KHZhbHVlKTtcbiAgICAgICAgICAgICgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBCSU5EIGxpZ2h0MS5yZWxhdGl2ZUJyaWdodG5lc3MgY2hhbmdlZC10bycsIHZhbHVlKTtcbiAgICAgICAgICAgIERTTS5saWdodDEucmVsYXRpdmVCcmlnaHRuZXNzLnNldExvY2FsVmFsdWUodmFsdWUsIHByb3BlcnR5XzEuRnJvbS5Mb2NhbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NDQpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9