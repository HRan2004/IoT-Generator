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
const homeHumidifier0 = DeviceManager.createHomeHumidifier('HouseholdHumidifier_0');
const light1 = DeviceManager.createLight('Lamp(Home)_1');
const doorAndWindowSensor2 = DeviceManager.createDoorAndWindowSensor('DoorAndWindowSensor_2');
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
        DSM.homeHumidifier0 = {
            sprayVolume: new property_1.default('homeHumidifier0', 'sprayVolume'),
        };
        DSM.light1 = {
            relativeBrightness: new property_1.default('light1', 'relativeBrightness'),
            colorTemperature: new property_1.default('light1', 'colorTemperature'),
        };
        DSM.doorAndWindowSensor2 = {
            status: new property_1.default('doorAndWindowSensor2', 'status'),
        };
        DSM.homeHumidifier0.sprayVolume.update = v => homeHumidifier0.setSprayVolume(normal_parser_1.default.to(v));
        DSM.light1.relativeBrightness.update = v => light1.setRelativeBrightness(normal_parser_1.default.to(v));
        DSM.light1.colorTemperature.update = v => light1.setColorTemperature(normal_parser_1.default.to(v));
        DSM.homeHumidifier0.sprayVolume.setRemoteValue((yield homeHumidifier0.getSprayVolume()).value);
        DSM.light1.relativeBrightness.setRemoteValue((yield light1.getRelativeBrightness()).value);
        DSM.light1.colorTemperature.setRemoteValue((yield light1.getColorTemperature()).value);
        DSM.doorAndWindowSensor2.status.setRemoteValue((yield doorAndWindowSensor2.getStatus()).value);
        homeHumidifier0.subscribe(data => {
            data.sprayVolume = normal_parser_1.default.from(data.sprayVolume);
            DSM.homeHumidifier0.sprayVolume.setRemoteValue(data.sprayVolume);
        });
        light1.subscribe(data => {
            data.relativeBrightness = normal_parser_1.default.from(data.relativeBrightness);
            DSM.light1.relativeBrightness.setRemoteValue(data.relativeBrightness);
        });
        light1.subscribe(data => {
            data.colorTemperature = normal_parser_1.default.from(data.colorTemperature);
            DSM.light1.colorTemperature.setRemoteValue(data.colorTemperature);
        });
        doorAndWindowSensor2.subscribe(data => {
            data.status = normal_parser_1.default.from(data.status);
            DSM.doorAndWindowSensor2.status.setRemoteValue(data.status);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let parser0 = new g_parser_1.default('STRING:LOW,MIDDLE,HIGH', 'INT:0.0,100.0,1.0');
        DSM.homeHumidifier0.sprayVolume.addListener(value => {
            value = parser0.convert(value);
            (0, utils_1.mlog)(' ├ @BIND light1.relativeBrightness changed-to', value);
            DSM.light1.relativeBrightness.setLocalValue(value, property_1.From.Local);
        });
        let parser1 = new g_parser_1.default('BOOLEAN', 'INT:1700.0,7000.0,1.0');
        DSM.doorAndWindowSensor2.status.addListener(value => {
            value = parser1.convert(value);
            (0, utils_1.mlog)(' ├ @BIND light1.colorTemperature changed-to', value);
            DSM.light1.colorTemperature.setLocalValue(value, property_1.From.Local);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsY0FBYztBQUNkLG1CQUFtQixtQkFBTyxDQUFDLEdBQWlCO0FBQzVDLHdCQUF3QixtQkFBTyxDQUFDLEdBQTZCO0FBQzdELG1CQUFtQixtQkFBTyxDQUFDLEdBQXdCO0FBQ25ELGdCQUFnQixtQkFBTyxDQUFDLEVBQWM7QUFDdEM7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksY0FBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7OztVQ3ZGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2NvcmUvY29uc3QudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvcmUvcGFyc2VyL2ctcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3BhcnNlci9ub3JtYWwtcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3BhcnNlci90YWwtdHlwZS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9wcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVU5LTk9XTiA9IHZvaWQgMDtcbmV4cG9ydHMuVU5LTk9XTiA9IFwiQ09OU1QtVU5LTk9XTlwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRhdGFCYXRjaCA9IHZvaWQgMDtcbmNvbnN0IHRhbF90eXBlXzEgPSByZXF1aXJlKFwiLi90YWwtdHlwZVwiKTtcbmNsYXNzIEdQYXJzZXIge1xuICAgIGNvbnN0cnVjdG9yKGZyb20sIHRvKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGZyb20gPSBuZXcgdGFsX3R5cGVfMS5kZWZhdWx0KGZyb20pO1xuICAgICAgICBpZiAodHlwZW9mIHRvID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgdG8gPSBuZXcgdGFsX3R5cGVfMS5kZWZhdWx0KHRvKTtcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICAgICAgdGhpcy50byA9IHRvO1xuICAgIH1cbiAgICBjb252ZXJ0KHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmZyb20udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5BTlkgfHwgdGhpcy50by50eXBlID09IHRhbF90eXBlXzEuRGF0YVR5cGUuQU5ZKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRoaXMudG8udHlwZSkge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5mcm9tLmlzTnVtYmVyKCkgfHwgdGhpcy5mcm9tLmhhZFJhbmdlKCkgfHwgdGhpcy50by5oYWRSYW5nZSgpKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNvdXJjZVZhbHVlID0gdmFsdWU7XG4gICAgICAgIGxldCBiYXRjaCA9IG5ldyBEYXRhQmF0Y2goKTtcbiAgICAgICAgYmF0Y2gucmVhbCA9IHZhbHVlO1xuICAgICAgICBiYXRjaC50eXBlID0gdGhpcy5mcm9tLnR5cGUudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHRoaXMuZnJvbS5pc051bWJlcigpKSB7XG4gICAgICAgICAgICBiYXRjaC5pbnQgPSBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgICAgICAgICAgIGJhdGNoLmZsb2F0ID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgICAgICBiYXRjaC5zdHJpbmcgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZnJvbS5oYWRSYW5nZSgpKSB7XG4gICAgICAgICAgICAgICAgYmF0Y2guYm9vbGVhbiA9IHZhbHVlID49IHRoaXMuZnJvbS5yYW5nZVswXSArIHRoaXMuZnJvbS5yYW5nZVsyXSAvIDI7XG4gICAgICAgICAgICAgICAgYmF0Y2gucGVyY2VudCA9ICh2YWx1ZSAtIHRoaXMuZnJvbS5yYW5nZVswXSkgLyAodGhpcy5mcm9tLnJhbmdlWzFdIC0gdGhpcy5mcm9tLnJhbmdlWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmZyb20udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5CT09MRUFOKSB7XG4gICAgICAgICAgICBiYXRjaC5pbnQgPSB2YWx1ZSA/IDEgOiAwO1xuICAgICAgICAgICAgYmF0Y2guZmxvYXQgPSB2YWx1ZSA/IDEuMCA6IDAuMDtcbiAgICAgICAgICAgIGJhdGNoLnN0cmluZyA9IHZhbHVlID8gXCJ0cnVlXCIgOiBcImZhbHNlXCI7XG4gICAgICAgICAgICBiYXRjaC5ib29sZWFuID0gdmFsdWU7XG4gICAgICAgICAgICBiYXRjaC5wZXJjZW50ID0gdmFsdWUgPyAxLjAgOiAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuU1RSSU5HKSB7XG4gICAgICAgICAgICBiYXRjaC5zdHJpbmcgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyb20uaGFkT3B0aW9ucygpKSB7XG4gICAgICAgICAgICAgICAgYmF0Y2guaW50ID0gdGhpcy5mcm9tLmluZGV4SW5PcHRpb25zKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBiYXRjaC5mbG9hdCA9IHRoaXMuZnJvbS5pbmRleEluT3B0aW9ucyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IHRoaXMuZnJvbS5vcHRpb25zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBiYXRjaC5ib29sZWFuID0gYmF0Y2guaW50ID49IGxlbiAvIDI7XG4gICAgICAgICAgICAgICAgYmF0Y2gucGVyY2VudCA9IGJhdGNoLmludCAvIChsZW4gLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhdGNoLmludCA9IE1hdGgucm91bmQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJhdGNoLmZsb2F0ID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYmF0Y2guYm9vbGVhbiA9IHZhbHVlID09PSBcInRydWVcIjtcbiAgICAgICAgICAgICAgICBiYXRjaC5wZXJjZW50ID0gdmFsdWUgPT09IFwidHJ1ZVwiID8gMS4wIDogMC4wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYmF0Y2guc3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGJhdGNoLmZsb2F0ID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oYmF0Y2guZmxvYXQpKVxuICAgICAgICAgICAgICAgIGJhdGNoLmZsb2F0ID0gMC4wO1xuICAgICAgICAgICAgYmF0Y2guaW50ID0gTWF0aC5yb3VuZChiYXRjaC5mbG9hdCk7XG4gICAgICAgICAgICBiYXRjaC5ib29sZWFuID0gdmFsdWUgPT09IFwidHJ1ZVwiO1xuICAgICAgICAgICAgYmF0Y2gucGVyY2VudCA9IHZhbHVlID09PSBcInRydWVcIiA/IDEuMCA6IDAuMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50by5pc051bWJlcigpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50by5oYWRSYW5nZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvbS5pc051bWJlcigpICYmIHRoaXMuZnJvbS5oYWRSYW5nZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy50by5yYW5nZVswXSArIGJhdGNoLnBlcmNlbnQgKiAodGhpcy50by5yYW5nZVsxXSAtIHRoaXMudG8ucmFuZ2VbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmZyb20udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5TVFJJTkcgJiYgdGhpcy5mcm9tLmhhZE9wdGlvbnMoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMudG8ucmFuZ2VbMF0gKyBiYXRjaC5wZXJjZW50ICogdGhpcy50by5yYW5nZVsyXTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnRvLnJhbmdlWzBdICsgYmF0Y2gucGVyY2VudCAqICh0aGlzLnRvLnJhbmdlWzFdIC0gdGhpcy50by5yYW5nZVswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZnJvbS5pc051bWJlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5taW4odGhpcy50by5yYW5nZVsxXSwgTWF0aC5tYXgodGhpcy50by5yYW5nZVswXSwgdmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuU1RSSU5HKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4oYmF0Y2guZmxvYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMudG8ucmFuZ2VbMV0sIE1hdGgubWF4KHRoaXMudG8ucmFuZ2VbMF0sIGJhdGNoLmZsb2F0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gMCA/IHRoaXMudG8ucmFuZ2VbMV0gOiB0aGlzLnRvLnJhbmdlWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZnJvbS50eXBlID09PSB0YWxfdHlwZV8xLkRhdGFUeXBlLkJPT0xFQU4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA/IHRoaXMudG8ucmFuZ2VbMV0gOiB0aGlzLnRvLnJhbmdlWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyb20uaXNOdW1iZXIoKSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmZyb20udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5TVFJJTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihiYXRjaC5mbG9hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5taW4odGhpcy50by5yYW5nZVsxXSwgTWF0aC5tYXgodGhpcy50by5yYW5nZVswXSwgYmF0Y2guZmxvYXQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiAwID8gdGhpcy50by5yYW5nZVsxXSA6IHRoaXMudG8ucmFuZ2VbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuQk9PTEVBTikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGJhdGNoLmludDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYmF0Y2guZmxvYXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudG8udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5JTlQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudG8udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5CT09MRUFOKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGJhdGNoLmJvb2xlYW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50by50eXBlID09PSB0YWxfdHlwZV8xLkRhdGFUeXBlLlNUUklORykge1xuICAgICAgICAgICAgaWYgKHRoaXMudG8uaGFkT3B0aW9ucygpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxlbiA9IHRoaXMudG8ub3B0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnRvLm9wdGlvbnNbTWF0aC5yb3VuZChiYXRjaC5wZXJjZW50ICogbGVuKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGJhdGNoLnN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc291cmNlVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdQYXJzZXI6XCIsIHRoaXMuZnJvbS50b0N0VGV4dCgpLCBcIi0+XCIsIHRoaXMudG8udG9DdFRleHQoKSwgXCJcXG5cIiwgeyBcIkRhdGFCYXRjaFwiOiBiYXRjaCB9LCBcIlxcbkNvbnZlcnQgcmVzdWx0OlwiLCBzb3VyY2VWYWx1ZSwgXCItPlwiLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEdQYXJzZXI7XG5jbGFzcyBEYXRhQmF0Y2gge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmludCA9IDA7XG4gICAgICAgIHRoaXMuZmxvYXQgPSAwLjA7XG4gICAgICAgIHRoaXMuYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMucGVyY2VudCA9IDAuMDtcbiAgICAgICAgdGhpcy5yZWFsID0gMDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJpbnRcIjtcbiAgICAgICAgdGhpcy51bml0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5zaWduaWZpY2FuY2UgPSBcIlwiO1xuICAgIH1cbn1cbmV4cG9ydHMuRGF0YUJhdGNoID0gRGF0YUJhdGNoO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBOb3JtYWxQYXJzZXIge1xuICAgIHN0YXRpYyBmcm9tKGRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGRhdGEudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEudG9Mb3dlckNhc2UoKSA9PT0gJ2ZhbHNlJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gJ09DQ1VQSUVEJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAnTk9fTUFOJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHN0YXRpYyB0byhkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE5vcm1hbFBhcnNlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5EYXRhVHlwZSA9IHZvaWQgMDtcbmNsYXNzIFRhbFR5cGUge1xuICAgIGNvbnN0cnVjdG9yKGN0KSB7XG4gICAgICAgIHRoaXMudHlwZSA9IERhdGFUeXBlLkFOWTtcbiAgICAgICAgdGhpcy5yYW5nZSA9IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBbXTtcbiAgICAgICAgbGV0IGFyZ3MgPSBjdC50cmltKCkuc3BsaXQoJzonKTtcbiAgICAgICAgdGhpcy50eXBlID0gRGF0YVR5cGUubWFrZShhcmdzWzBdKTtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbGV0IGFyZyA9IGFyZ3NbMV07XG4gICAgICAgICAgICBpZiAodGhpcy5pc051bWJlcigpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gYXJnLnRyaW0oKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZS5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RlcCA9IHJhbmdlLmxlbmd0aCA+PSAzID8gcGFyc2VGbG9hdChyYW5nZVsyXSkgOiAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmdlID0gW3BhcnNlRmxvYXQocmFuZ2VbMF0pLCBwYXJzZUZsb2F0KHJhbmdlWzFdKSwgc3RlcF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSBEYXRhVHlwZS5TVFJJTkcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBhcmcuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpc051bWJlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gRGF0YVR5cGUuSU5UIHx8IHRoaXMudHlwZSA9PT0gRGF0YVR5cGUuRkxPQVQ7XG4gICAgfVxuICAgIGhhZFJhbmdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZVswXSAhPT0gLTEgJiYgdGhpcy5yYW5nZVsxXSAhPT0gLTE7XG4gICAgfVxuICAgIGlzSW5SYW5nZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPj0gdGhpcy5yYW5nZVswXSAmJiB2YWx1ZSA8PSB0aGlzLnJhbmdlWzFdO1xuICAgIH1cbiAgICBoYWRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxlbmd0aCA+IDA7XG4gICAgfVxuICAgIGluZGV4SW5PcHRpb25zKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaW5kZXhPZih2YWx1ZSk7XG4gICAgfVxuICAgIHRvQ3RUZXh0KCkge1xuICAgICAgICBsZXQgdGV4dCA9IHRoaXMudHlwZS50b1N0cmluZygpO1xuICAgICAgICBpZiAodGhpcy5pc051bWJlcigpICYmIHRoaXMuaGFkUmFuZ2UoKSkge1xuICAgICAgICAgICAgdGV4dCArPSBgOiR7dGhpcy5yYW5nZVswXX0sJHt0aGlzLnJhbmdlWzFdfWA7XG4gICAgICAgICAgICBpZiAodGhpcy5yYW5nZVsyXSAhPT0gMSlcbiAgICAgICAgICAgICAgICB0ZXh0ICs9IGAsJHt0aGlzLnJhbmdlWzJdfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSBEYXRhVHlwZS5TVFJJTkcgJiYgdGhpcy5oYWRPcHRpb25zKCkpIHtcbiAgICAgICAgICAgIHRleHQgKz0gYDoke3RoaXMub3B0aW9ucy5qb2luKCcsJyl9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBUYWxUeXBlO1xuY2xhc3MgRGF0YVR5cGUge1xuICAgIHN0YXRpYyBtYWtlKHRleHQpIHtcbiAgICAgICAgc3dpdGNoICh0ZXh0LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFUeXBlLklOVDtcbiAgICAgICAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0YVR5cGUuRkxPQVQ7XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0YVR5cGUuQk9PTEVBTjtcbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFUeXBlLlNUUklORztcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFUeXBlLk9CSkVDVDtcbiAgICAgICAgICAgIGNhc2UgJ2FueSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFUeXBlLkFOWTtcbiAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVHlwZS5OT05FO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0YVR5cGUuQU5ZO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5EYXRhVHlwZSA9IERhdGFUeXBlO1xuRGF0YVR5cGUuSU5UID0gJ0lOVCc7XG5EYXRhVHlwZS5GTE9BVCA9ICdGTE9BVCc7XG5EYXRhVHlwZS5CT09MRUFOID0gJ0JPT0xFQU4nO1xuRGF0YVR5cGUuU1RSSU5HID0gJ1NUUklORyc7XG5EYXRhVHlwZS5PQkpFQ1QgPSAnT0JKRUNUJztcbkRhdGFUeXBlLkFOWSA9ICdBTlknO1xuRGF0YVR5cGUuTk9ORSA9ICdOT05FJztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Gcm9tID0gdm9pZCAwO1xuY29uc3QgY29uc3RfMSA9IHJlcXVpcmUoXCIuL2NvbnN0XCIpO1xuY29uc3QgaW5kZXhfMSA9IHJlcXVpcmUoXCIuLi9pbmRleFwiKTtcbmNsYXNzIFByb3BlcnR5IHtcbiAgICBjb25zdHJ1Y3RvcihkZXZpY2UsIGtleSwgdXBkYXRlID0gbnVsbCkge1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSBjb25zdF8xLlVOS05PV047XG4gICAgICAgIHRoaXMucmVtb3RlVmFsdWUgPSBjb25zdF8xLlVOS05PV047XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlQWxsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgIH1cbiAgICBzZXRMb2NhbFZhbHVlKHZhbHVlLCBmcm9tID0gRnJvbS5Mb2NhbCkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbFZhbHVlID09PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHZhbHVlKSk7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRSZW1vdGVWYWx1ZSh2YWx1ZSwgRnJvbS5Mb2NhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFJlbW90ZVZhbHVlKHZhbHVlLCBmcm9tID0gRnJvbS5EZXZpY2UpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoZnJvbSA9PT0gRnJvbS5Mb2NhbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSByZW1vdGU6ICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9ID1gLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSAmJiB0aGlzLnVwZGF0ZSh2YWx1ZSkudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9IHN1Y2Nlc3M6YCwgcik7XG4gICAgICAgICAgICB9LCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVcGRhdGUgJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gZXJyb3I6YCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZyb20gPT09IEZyb20uRGV2aWNlKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXhfMS5pbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZSBkYXRhOiAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSA9YCwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFZhbHVlKHZhbHVlLCBGcm9tLlJlbW90ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGdldExvY2FsVmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsVmFsdWU7XG4gICAgfVxuICAgIGdldFJlbW90ZVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGVWYWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcm9wZXJ0eTtcbnZhciBGcm9tO1xuKGZ1bmN0aW9uIChGcm9tKSB7XG4gICAgRnJvbVtGcm9tW1wiTG9jYWxcIl0gPSAwXSA9IFwiTG9jYWxcIjtcbiAgICBGcm9tW0Zyb21bXCJSZW1vdGVcIl0gPSAxXSA9IFwiUmVtb3RlXCI7XG4gICAgRnJvbVtGcm9tW1wiUGFnZVwiXSA9IDJdID0gXCJQYWdlXCI7XG4gICAgRnJvbVtGcm9tW1wiRGV2aWNlXCJdID0gM10gPSBcIkRldmljZVwiO1xufSkoRnJvbSB8fCAoZXhwb3J0cy5Gcm9tID0gRnJvbSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tbG9nID0gZXhwb3J0cy5IYXZlTm90U3VwcG9ydCA9IGV4cG9ydHMuUERTID0gZXhwb3J0cy5QRE8gPSBleHBvcnRzLlF1ZXVlID0gdm9pZCAwO1xuY2xhc3MgUXVldWUge1xuICAgIHN0YXRpYyBkZWxheSh0aW1lKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlF1ZXVlID0gUXVldWU7XG5mdW5jdGlvbiBQRE8oY29tbWFuZCwgLi4uYXJncykge1xuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0cy5QRE8gPSBQRE87XG5mdW5jdGlvbiBQRFMoY29tbWFuZCwgLi4uYXJncykge1xuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0cy5QRFMgPSBQRFM7XG5mdW5jdGlvbiBIYXZlTm90U3VwcG9ydCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnRzLkhhdmVOb3RTdXBwb3J0ID0gSGF2ZU5vdFN1cHBvcnQ7XG5mdW5jdGlvbiBtbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyguLi5hcmdzKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnRzLm1sb2cgPSBtbG9nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGVkID0gdm9pZCAwO1xuY29uc3QgcHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuL2NvcmUvcHJvcGVydHlcIik7XG5jb25zdCBub3JtYWxfcGFyc2VyXzEgPSByZXF1aXJlKFwiLi9jb3JlL3BhcnNlci9ub3JtYWwtcGFyc2VyXCIpO1xuY29uc3QgZ19wYXJzZXJfMSA9IHJlcXVpcmUoXCIuL2NvcmUvcGFyc2VyL2ctcGFyc2VyXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2NvcmUvdXRpbHNcIik7XG5sZXQgRFNNID0ge307XG5leHBvcnRzLmluaXRlZCA9IGZhbHNlO1xuY29uc3QgaG9tZUh1bWlkaWZpZXIwID0gRGV2aWNlTWFuYWdlci5jcmVhdGVIb21lSHVtaWRpZmllcignSG91c2Vob2xkSHVtaWRpZmllcl8wJyk7XG5jb25zdCBsaWdodDEgPSBEZXZpY2VNYW5hZ2VyLmNyZWF0ZUxpZ2h0KCdMYW1wKEhvbWUpXzEnKTtcbmNvbnN0IGRvb3JBbmRXaW5kb3dTZW5zb3IyID0gRGV2aWNlTWFuYWdlci5jcmVhdGVEb29yQW5kV2luZG93U2Vuc29yKCdEb29yQW5kV2luZG93U2Vuc29yXzInKTtcbmluaXQoKS50aGVuKHIgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdJbml0IFN1Y2Nlc3MuJyk7XG4gICAgZXhwb3J0cy5pbml0ZWQgPSB0cnVlO1xuICAgIG1haW4oKS50aGVuKHIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSdW5uaW5nLi4uJyk7XG4gICAgfSwgZSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ01haW4gRmFpbGVkLicpO1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH0pO1xufSwgZSA9PiB7XG4gICAgY29uc29sZS5lcnJvcignSW5pdCBGYWlsZWQuJyk7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbn0pO1xuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIwID0ge1xuICAgICAgICAgICAgc3ByYXlWb2x1bWU6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2hvbWVIdW1pZGlmaWVyMCcsICdzcHJheVZvbHVtZScpLFxuICAgICAgICB9O1xuICAgICAgICBEU00ubGlnaHQxID0ge1xuICAgICAgICAgICAgcmVsYXRpdmVCcmlnaHRuZXNzOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KCdsaWdodDEnLCAncmVsYXRpdmVCcmlnaHRuZXNzJyksXG4gICAgICAgICAgICBjb2xvclRlbXBlcmF0dXJlOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KCdsaWdodDEnLCAnY29sb3JUZW1wZXJhdHVyZScpLFxuICAgICAgICB9O1xuICAgICAgICBEU00uZG9vckFuZFdpbmRvd1NlbnNvcjIgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2Rvb3JBbmRXaW5kb3dTZW5zb3IyJywgJ3N0YXR1cycpLFxuICAgICAgICB9O1xuICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIwLnNwcmF5Vm9sdW1lLnVwZGF0ZSA9IHYgPT4gaG9tZUh1bWlkaWZpZXIwLnNldFNwcmF5Vm9sdW1lKG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LnRvKHYpKTtcbiAgICAgICAgRFNNLmxpZ2h0MS5yZWxhdGl2ZUJyaWdodG5lc3MudXBkYXRlID0gdiA9PiBsaWdodDEuc2V0UmVsYXRpdmVCcmlnaHRuZXNzKG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LnRvKHYpKTtcbiAgICAgICAgRFNNLmxpZ2h0MS5jb2xvclRlbXBlcmF0dXJlLnVwZGF0ZSA9IHYgPT4gbGlnaHQxLnNldENvbG9yVGVtcGVyYXR1cmUobm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQudG8odikpO1xuICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIwLnNwcmF5Vm9sdW1lLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBob21lSHVtaWRpZmllcjAuZ2V0U3ByYXlWb2x1bWUoKSkudmFsdWUpO1xuICAgICAgICBEU00ubGlnaHQxLnJlbGF0aXZlQnJpZ2h0bmVzcy5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgbGlnaHQxLmdldFJlbGF0aXZlQnJpZ2h0bmVzcygpKS52YWx1ZSk7XG4gICAgICAgIERTTS5saWdodDEuY29sb3JUZW1wZXJhdHVyZS5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgbGlnaHQxLmdldENvbG9yVGVtcGVyYXR1cmUoKSkudmFsdWUpO1xuICAgICAgICBEU00uZG9vckFuZFdpbmRvd1NlbnNvcjIuc3RhdHVzLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBkb29yQW5kV2luZG93U2Vuc29yMi5nZXRTdGF0dXMoKSkudmFsdWUpO1xuICAgICAgICBob21lSHVtaWRpZmllcjAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5zcHJheVZvbHVtZSA9IG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LmZyb20oZGF0YS5zcHJheVZvbHVtZSk7XG4gICAgICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIwLnNwcmF5Vm9sdW1lLnNldFJlbW90ZVZhbHVlKGRhdGEuc3ByYXlWb2x1bWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGlnaHQxLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEucmVsYXRpdmVCcmlnaHRuZXNzID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLnJlbGF0aXZlQnJpZ2h0bmVzcyk7XG4gICAgICAgICAgICBEU00ubGlnaHQxLnJlbGF0aXZlQnJpZ2h0bmVzcy5zZXRSZW1vdGVWYWx1ZShkYXRhLnJlbGF0aXZlQnJpZ2h0bmVzcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsaWdodDEuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5jb2xvclRlbXBlcmF0dXJlID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLmNvbG9yVGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgRFNNLmxpZ2h0MS5jb2xvclRlbXBlcmF0dXJlLnNldFJlbW90ZVZhbHVlKGRhdGEuY29sb3JUZW1wZXJhdHVyZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkb29yQW5kV2luZG93U2Vuc29yMi5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLnN0YXR1cyA9IG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LmZyb20oZGF0YS5zdGF0dXMpO1xuICAgICAgICAgICAgRFNNLmRvb3JBbmRXaW5kb3dTZW5zb3IyLnN0YXR1cy5zZXRSZW1vdGVWYWx1ZShkYXRhLnN0YXR1cyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgcGFyc2VyMCA9IG5ldyBnX3BhcnNlcl8xLmRlZmF1bHQoJ1NUUklORzpMT1csTUlERExFLEhJR0gnLCAnSU5UOjAuMCwxMDAuMCwxLjAnKTtcbiAgICAgICAgRFNNLmhvbWVIdW1pZGlmaWVyMC5zcHJheVZvbHVtZS5hZGRMaXN0ZW5lcih2YWx1ZSA9PiB7XG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlcjAuY29udmVydCh2YWx1ZSk7XG4gICAgICAgICAgICAoMCwgdXRpbHNfMS5tbG9nKSgnIOKUnCBAQklORCBsaWdodDEucmVsYXRpdmVCcmlnaHRuZXNzIGNoYW5nZWQtdG8nLCB2YWx1ZSk7XG4gICAgICAgICAgICBEU00ubGlnaHQxLnJlbGF0aXZlQnJpZ2h0bmVzcy5zZXRMb2NhbFZhbHVlKHZhbHVlLCBwcm9wZXJ0eV8xLkZyb20uTG9jYWwpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHBhcnNlcjEgPSBuZXcgZ19wYXJzZXJfMS5kZWZhdWx0KCdCT09MRUFOJywgJ0lOVDoxNzAwLjAsNzAwMC4wLDEuMCcpO1xuICAgICAgICBEU00uZG9vckFuZFdpbmRvd1NlbnNvcjIuc3RhdHVzLmFkZExpc3RlbmVyKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VyMS5jb252ZXJ0KHZhbHVlKTtcbiAgICAgICAgICAgICgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBCSU5EIGxpZ2h0MS5jb2xvclRlbXBlcmF0dXJlIGNoYW5nZWQtdG8nLCB2YWx1ZSk7XG4gICAgICAgICAgICBEU00ubGlnaHQxLmNvbG9yVGVtcGVyYXR1cmUuc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLkxvY2FsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg0NCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=