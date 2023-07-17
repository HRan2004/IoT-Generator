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
const utils_1 = __webpack_require__(89);
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
        if (this.from.type === this.to.type)
            return value;
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
                batch.percent = batch.int / len;
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
                    value = this.to.options[Math.round(value)];
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
            (0, utils_1.mlog)("GParser convert:", sourceValue, "->", value, "\n", batch + "\nTalType:", this.from.toCtText(), "->", this.to.toCtText());
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
            case 'bool':
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
            console.log("Remote value not need to change again");
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
        let parser0 = new g_parser_1.default('STRING:SMALL,MIDDLE,LARGE', 'INT:0.0,100.0,1.0');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsY0FBYztBQUNkLG1CQUFtQixtQkFBTyxDQUFDLEdBQWlCO0FBQzVDLHdCQUF3QixtQkFBTyxDQUFDLEdBQTZCO0FBQzdELG1CQUFtQixtQkFBTyxDQUFDLEdBQXdCO0FBQ25ELGdCQUFnQixtQkFBTyxDQUFDLEVBQWM7QUFDdEM7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksY0FBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7OztVQ3ZGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2NvcmUvY29uc3QudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvcmUvcGFyc2VyL2ctcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3BhcnNlci9ub3JtYWwtcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3BhcnNlci90YWwtdHlwZS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9wcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVU5LTk9XTiA9IHZvaWQgMDtcbmV4cG9ydHMuVU5LTk9XTiA9IFwiQ09OU1QtVU5LTk9XTlwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRhdGFCYXRjaCA9IHZvaWQgMDtcbmNvbnN0IHRhbF90eXBlXzEgPSByZXF1aXJlKFwiLi90YWwtdHlwZVwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5jbGFzcyBHUGFyc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihmcm9tLCB0bykge1xuICAgICAgICBpZiAodHlwZW9mIGZyb20gPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBmcm9tID0gbmV3IHRhbF90eXBlXzEuZGVmYXVsdChmcm9tKTtcbiAgICAgICAgaWYgKHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHRvID0gbmV3IHRhbF90eXBlXzEuZGVmYXVsdCh0byk7XG4gICAgICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgICAgIHRoaXMudG8gPSB0bztcbiAgICB9XG4gICAgY29udmVydCh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuQU5ZIHx8IHRoaXMudG8udHlwZSA9PSB0YWxfdHlwZV8xLkRhdGFUeXBlLkFOWSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuZnJvbS50eXBlID09PSB0aGlzLnRvLnR5cGUpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGxldCBzb3VyY2VWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBsZXQgYmF0Y2ggPSBuZXcgRGF0YUJhdGNoKCk7XG4gICAgICAgIGJhdGNoLnJlYWwgPSB2YWx1ZTtcbiAgICAgICAgYmF0Y2gudHlwZSA9IHRoaXMuZnJvbS50eXBlLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh0aGlzLmZyb20uaXNOdW1iZXIoKSkge1xuICAgICAgICAgICAgYmF0Y2guaW50ID0gTWF0aC5yb3VuZCh2YWx1ZSk7XG4gICAgICAgICAgICBiYXRjaC5mbG9hdCA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgYmF0Y2guc3RyaW5nID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZyb20uaGFkUmFuZ2UoKSkge1xuICAgICAgICAgICAgICAgIGJhdGNoLmJvb2xlYW4gPSB2YWx1ZSA+PSB0aGlzLmZyb20ucmFuZ2VbMF0gKyB0aGlzLmZyb20ucmFuZ2VbMl0gLyAyO1xuICAgICAgICAgICAgICAgIGJhdGNoLnBlcmNlbnQgPSAodmFsdWUgLSB0aGlzLmZyb20ucmFuZ2VbMF0pIC8gKHRoaXMuZnJvbS5yYW5nZVsxXSAtIHRoaXMuZnJvbS5yYW5nZVswXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuQk9PTEVBTikge1xuICAgICAgICAgICAgYmF0Y2guaW50ID0gdmFsdWUgPyAxIDogMDtcbiAgICAgICAgICAgIGJhdGNoLmZsb2F0ID0gdmFsdWUgPyAxLjAgOiAwLjA7XG4gICAgICAgICAgICBiYXRjaC5zdHJpbmcgPSB2YWx1ZSA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiO1xuICAgICAgICAgICAgYmF0Y2guYm9vbGVhbiA9IHZhbHVlO1xuICAgICAgICAgICAgYmF0Y2gucGVyY2VudCA9IHZhbHVlID8gMS4wIDogMC4wO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZnJvbS50eXBlID09PSB0YWxfdHlwZV8xLkRhdGFUeXBlLlNUUklORykge1xuICAgICAgICAgICAgYmF0Y2guc3RyaW5nID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5mcm9tLmhhZE9wdGlvbnMoKSkge1xuICAgICAgICAgICAgICAgIGJhdGNoLmludCA9IHRoaXMuZnJvbS5pbmRleEluT3B0aW9ucyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYmF0Y2guZmxvYXQgPSB0aGlzLmZyb20uaW5kZXhJbk9wdGlvbnModmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLmZyb20ub3B0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgYmF0Y2guYm9vbGVhbiA9IGJhdGNoLmludCA+PSBsZW4gLyAyO1xuICAgICAgICAgICAgICAgIGJhdGNoLnBlcmNlbnQgPSBiYXRjaC5pbnQgLyBsZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBiYXRjaC5pbnQgPSBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBiYXRjaC5mbG9hdCA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGJhdGNoLmJvb2xlYW4gPSB2YWx1ZSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgICAgICAgICAgYmF0Y2gucGVyY2VudCA9IHZhbHVlID09PSBcInRydWVcIiA/IDEuMCA6IDAuMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJhdGNoLnN0cmluZyA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBiYXRjaC5mbG9hdCA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGJhdGNoLmZsb2F0KSlcbiAgICAgICAgICAgICAgICBiYXRjaC5mbG9hdCA9IDAuMDtcbiAgICAgICAgICAgIGJhdGNoLmludCA9IE1hdGgucm91bmQoYmF0Y2guZmxvYXQpO1xuICAgICAgICAgICAgYmF0Y2guYm9vbGVhbiA9IHZhbHVlID09PSBcInRydWVcIjtcbiAgICAgICAgICAgIGJhdGNoLnBlcmNlbnQgPSB2YWx1ZSA9PT0gXCJ0cnVlXCIgPyAxLjAgOiAwLjA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudG8uaXNOdW1iZXIoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudG8uaGFkUmFuZ2UoKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyb20uaXNOdW1iZXIoKSAmJiB0aGlzLmZyb20uaGFkUmFuZ2UoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMudG8ucmFuZ2VbMF0gKyBiYXRjaC5wZXJjZW50ICogKHRoaXMudG8ucmFuZ2VbMV0gLSB0aGlzLnRvLnJhbmdlWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuU1RSSU5HICYmIHRoaXMuZnJvbS5oYWRPcHRpb25zKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnRvLnJhbmdlWzBdICsgYmF0Y2gucGVyY2VudCAqIHRoaXMudG8ucmFuZ2VbMl07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy50by5vcHRpb25zW01hdGgucm91bmQodmFsdWUpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLmlzTnVtYmVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLm1pbih0aGlzLnRvLnJhbmdlWzFdLCBNYXRoLm1heCh0aGlzLnRvLnJhbmdlWzBdLCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmZyb20udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5TVFJJTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc05hTihiYXRjaC5mbG9hdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0aC5taW4odGhpcy50by5yYW5nZVsxXSwgTWF0aC5tYXgodGhpcy50by5yYW5nZVswXSwgYmF0Y2guZmxvYXQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiAwID8gdGhpcy50by5yYW5nZVsxXSA6IHRoaXMudG8ucmFuZ2VbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcm9tLmlzTnVtYmVyKCkpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5mcm9tLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuU1RSSU5HKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNOYU4oYmF0Y2guZmxvYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMudG8ucmFuZ2VbMV0sIE1hdGgubWF4KHRoaXMudG8ucmFuZ2VbMF0sIGJhdGNoLmZsb2F0KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gMCA/IHRoaXMudG8ucmFuZ2VbMV0gOiB0aGlzLnRvLnJhbmdlWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZnJvbS50eXBlID09PSB0YWxfdHlwZV8xLkRhdGFUeXBlLkJPT0xFQU4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBiYXRjaC5pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGJhdGNoLmZsb2F0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnRvLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuSU5UKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnRvLnR5cGUgPT09IHRhbF90eXBlXzEuRGF0YVR5cGUuQk9PTEVBTikge1xuICAgICAgICAgICAgdmFsdWUgPSBiYXRjaC5ib29sZWFuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudG8udHlwZSA9PT0gdGFsX3R5cGVfMS5EYXRhVHlwZS5TVFJJTkcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRvLmhhZE9wdGlvbnMoKSkge1xuICAgICAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLnRvLm9wdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy50by5vcHRpb25zW01hdGgucm91bmQoYmF0Y2gucGVyY2VudCAqIGxlbildO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBiYXRjaC5zdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNvdXJjZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgKDAsIHV0aWxzXzEubWxvZykoXCJHUGFyc2VyIGNvbnZlcnQ6XCIsIHNvdXJjZVZhbHVlLCBcIi0+XCIsIHZhbHVlLCBcIlxcblwiLCBiYXRjaCArIFwiXFxuVGFsVHlwZTpcIiwgdGhpcy5mcm9tLnRvQ3RUZXh0KCksIFwiLT5cIiwgdGhpcy50by50b0N0VGV4dCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gR1BhcnNlcjtcbmNsYXNzIERhdGFCYXRjaCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW50ID0gMDtcbiAgICAgICAgdGhpcy5mbG9hdCA9IDAuMDtcbiAgICAgICAgdGhpcy5ib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5wZXJjZW50ID0gMC4wO1xuICAgICAgICB0aGlzLnJlYWwgPSAwO1xuICAgICAgICB0aGlzLnR5cGUgPSBcImludFwiO1xuICAgICAgICB0aGlzLnVuaXQgPSBcIlwiO1xuICAgICAgICB0aGlzLnNpZ25pZmljYW5jZSA9IFwiXCI7XG4gICAgfVxufVxuZXhwb3J0cy5EYXRhQmF0Y2ggPSBEYXRhQmF0Y2g7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE5vcm1hbFBhcnNlciB7XG4gICAgc3RhdGljIGZyb20oZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAnT0NDVVBJRUQnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICdOT19NQU4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgc3RhdGljIHRvKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTm9ybWFsUGFyc2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRhdGFUeXBlID0gdm9pZCAwO1xuY2xhc3MgVGFsVHlwZSB7XG4gICAgY29uc3RydWN0b3IoY3QpIHtcbiAgICAgICAgdGhpcy50eXBlID0gRGF0YVR5cGUuQU5ZO1xuICAgICAgICB0aGlzLnJhbmdlID0gW107XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICAgICAgICBsZXQgYXJncyA9IGN0LnRyaW0oKS5zcGxpdCgnOicpO1xuICAgICAgICB0aGlzLnR5cGUgPSBEYXRhVHlwZS5tYWtlKGFyZ3NbMF0pO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgYXJnID0gYXJnc1sxXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtYmVyKCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmFuZ2UgPSBhcmcudHJpbSgpLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGVwID0gcmFuZ2UubGVuZ3RoID49IDMgPyBwYXJzZUZsb2F0KHJhbmdlWzJdKSA6IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuZ2UgPSBbcGFyc2VGbG9hdChyYW5nZVswXSksIHBhcnNlRmxvYXQocmFuZ2VbMV0pLCBzdGVwXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09IERhdGFUeXBlLlNUUklORykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGFyZy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlzTnVtYmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlID09PSBEYXRhVHlwZS5JTlQgfHwgdGhpcy50eXBlID09PSBEYXRhVHlwZS5GTE9BVDtcbiAgICB9XG4gICAgaGFkUmFuZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlWzBdICE9PSAtMSAmJiB0aGlzLnJhbmdlWzFdICE9PSAtMTtcbiAgICB9XG4gICAgaXNJblJhbmdlKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA+PSB0aGlzLnJhbmdlWzBdICYmIHZhbHVlIDw9IHRoaXMucmFuZ2VbMV07XG4gICAgfVxuICAgIGhhZE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgaW5kZXhJbk9wdGlvbnModmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcbiAgICB9XG4gICAgdG9DdFRleHQoKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gdGhpcy50eXBlLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh0aGlzLmlzTnVtYmVyKCkgJiYgdGhpcy5oYWRSYW5nZSgpKSB7XG4gICAgICAgICAgICB0ZXh0ICs9IGA6JHt0aGlzLnJhbmdlWzBdfSwke3RoaXMucmFuZ2VbMV19YDtcbiAgICAgICAgICAgIGlmICh0aGlzLnJhbmdlWzJdICE9PSAxKVxuICAgICAgICAgICAgICAgIHRleHQgKz0gYCwke3RoaXMucmFuZ2VbMl19YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09IERhdGFUeXBlLlNUUklORyAmJiB0aGlzLmhhZE9wdGlvbnMoKSkge1xuICAgICAgICAgICAgdGV4dCArPSBgOiR7dGhpcy5vcHRpb25zLmpvaW4oJywnKX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFRhbFR5cGU7XG5jbGFzcyBEYXRhVHlwZSB7XG4gICAgc3RhdGljIG1ha2UodGV4dCkge1xuICAgICAgICBzd2l0Y2ggKHRleHQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgY2FzZSAnaW50JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0YVR5cGUuSU5UO1xuICAgICAgICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVHlwZS5GTE9BVDtcbiAgICAgICAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVHlwZS5CT09MRUFOO1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0YVR5cGUuU1RSSU5HO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0YVR5cGUuT0JKRUNUO1xuICAgICAgICAgICAgY2FzZSAnYW55JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0YVR5cGUuQU5ZO1xuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGFUeXBlLk5PTkU7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRhVHlwZS5BTlk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkRhdGFUeXBlID0gRGF0YVR5cGU7XG5EYXRhVHlwZS5JTlQgPSAnSU5UJztcbkRhdGFUeXBlLkZMT0FUID0gJ0ZMT0FUJztcbkRhdGFUeXBlLkJPT0xFQU4gPSAnQk9PTEVBTic7XG5EYXRhVHlwZS5TVFJJTkcgPSAnU1RSSU5HJztcbkRhdGFUeXBlLk9CSkVDVCA9ICdPQkpFQ1QnO1xuRGF0YVR5cGUuQU5ZID0gJ0FOWSc7XG5EYXRhVHlwZS5OT05FID0gJ05PTkUnO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkZyb20gPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4vY29uc3RcIik7XG5jb25zdCBpbmRleF8xID0gcmVxdWlyZShcIi4uL2luZGV4XCIpO1xuY2xhc3MgUHJvcGVydHkge1xuICAgIGNvbnN0cnVjdG9yKGRldmljZSwga2V5LCB1cGRhdGUgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IGNvbnN0XzEuVU5LTk9XTjtcbiAgICAgICAgdGhpcy5yZW1vdGVWYWx1ZSA9IGNvbnN0XzEuVU5LTk9XTjtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcbiAgICB9XG4gICAgYWRkTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgfVxuICAgIHNldExvY2FsVmFsdWUodmFsdWUsIGZyb20gPSBGcm9tLkxvY2FsKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsVmFsdWUgPT09IHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChsID0+IGwodmFsdWUpKTtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlbW90ZVZhbHVlKHZhbHVlLCBGcm9tLkxvY2FsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc2V0UmVtb3RlVmFsdWUodmFsdWUsIGZyb20gPSBGcm9tLkRldmljZSkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVtb3RlIHZhbHVlIG5vdCBuZWVkIHRvIGNoYW5nZSBhZ2FpblwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmIChmcm9tID09PSBGcm9tLkxvY2FsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlIHJlbW90ZTogJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gPWAsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlICYmIHRoaXMudXBkYXRlKHZhbHVlKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGUgJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gc3VjY2VzczpgLCByKTtcbiAgICAgICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVwZGF0ZSAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSBlcnJvcjpgKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZnJvbSA9PT0gRnJvbS5EZXZpY2UpIHtcbiAgICAgICAgICAgIGlmIChpbmRleF8xLmluaXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlIGRhdGE6ICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9ID1gLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldExvY2FsVmFsdWUodmFsdWUsIEZyb20uUmVtb3RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0TG9jYWxWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxWYWx1ZTtcbiAgICB9XG4gICAgZ2V0UmVtb3RlVmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW90ZVZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByb3BlcnR5O1xudmFyIEZyb207XG4oZnVuY3Rpb24gKEZyb20pIHtcbiAgICBGcm9tW0Zyb21bXCJMb2NhbFwiXSA9IDBdID0gXCJMb2NhbFwiO1xuICAgIEZyb21bRnJvbVtcIlJlbW90ZVwiXSA9IDFdID0gXCJSZW1vdGVcIjtcbiAgICBGcm9tW0Zyb21bXCJQYWdlXCJdID0gMl0gPSBcIlBhZ2VcIjtcbiAgICBGcm9tW0Zyb21bXCJEZXZpY2VcIl0gPSAzXSA9IFwiRGV2aWNlXCI7XG59KShGcm9tIHx8IChleHBvcnRzLkZyb20gPSBGcm9tID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1sb2cgPSBleHBvcnRzLkhhdmVOb3RTdXBwb3J0ID0gZXhwb3J0cy5QRFMgPSBleHBvcnRzLlBETyA9IGV4cG9ydHMuUXVldWUgPSB2b2lkIDA7XG5jbGFzcyBRdWV1ZSB7XG4gICAgc3RhdGljIGRlbGF5KHRpbWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuUXVldWUgPSBRdWV1ZTtcbmZ1bmN0aW9uIFBETyhjb21tYW5kLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnRzLlBETyA9IFBETztcbmZ1bmN0aW9uIFBEUyhjb21tYW5kLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnRzLlBEUyA9IFBEUztcbmZ1bmN0aW9uIEhhdmVOb3RTdXBwb3J0KC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydHMuSGF2ZU5vdFN1cHBvcnQgPSBIYXZlTm90U3VwcG9ydDtcbmZ1bmN0aW9uIG1sb2coLi4uYXJncykge1xuICAgIGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMubWxvZyA9IG1sb2c7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0ZWQgPSB2b2lkIDA7XG5jb25zdCBwcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4vY29yZS9wcm9wZXJ0eVwiKTtcbmNvbnN0IG5vcm1hbF9wYXJzZXJfMSA9IHJlcXVpcmUoXCIuL2NvcmUvcGFyc2VyL25vcm1hbC1wYXJzZXJcIik7XG5jb25zdCBnX3BhcnNlcl8xID0gcmVxdWlyZShcIi4vY29yZS9wYXJzZXIvZy1wYXJzZXJcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vY29yZS91dGlsc1wiKTtcbmxldCBEU00gPSB7fTtcbmV4cG9ydHMuaW5pdGVkID0gZmFsc2U7XG5jb25zdCBob21lSHVtaWRpZmllcjAgPSBEZXZpY2VNYW5hZ2VyLmNyZWF0ZUhvbWVIdW1pZGlmaWVyKCdIb3VzZWhvbGRIdW1pZGlmaWVyXzAnKTtcbmNvbnN0IGxpZ2h0MSA9IERldmljZU1hbmFnZXIuY3JlYXRlTGlnaHQoJ0xhbXAoSG9tZSlfMScpO1xuY29uc3QgZG9vckFuZFdpbmRvd1NlbnNvcjIgPSBEZXZpY2VNYW5hZ2VyLmNyZWF0ZURvb3JBbmRXaW5kb3dTZW5zb3IoJ0Rvb3JBbmRXaW5kb3dTZW5zb3JfMicpO1xuaW5pdCgpLnRoZW4ociA9PiB7XG4gICAgY29uc29sZS5sb2coJ0luaXQgU3VjY2Vzcy4nKTtcbiAgICBleHBvcnRzLmluaXRlZCA9IHRydWU7XG4gICAgbWFpbigpLnRoZW4ociA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1J1bm5pbmcuLi4nKTtcbiAgICB9LCBlID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTWFpbiBGYWlsZWQuJyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfSk7XG59LCBlID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdJbml0IEZhaWxlZC4nKTtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xufSk7XG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIERTTS5ob21lSHVtaWRpZmllcjAgPSB7XG4gICAgICAgICAgICBzcHJheVZvbHVtZTogbmV3IHByb3BlcnR5XzEuZGVmYXVsdCgnaG9tZUh1bWlkaWZpZXIwJywgJ3NwcmF5Vm9sdW1lJyksXG4gICAgICAgIH07XG4gICAgICAgIERTTS5saWdodDEgPSB7XG4gICAgICAgICAgICByZWxhdGl2ZUJyaWdodG5lc3M6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2xpZ2h0MScsICdyZWxhdGl2ZUJyaWdodG5lc3MnKSxcbiAgICAgICAgICAgIGNvbG9yVGVtcGVyYXR1cmU6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2xpZ2h0MScsICdjb2xvclRlbXBlcmF0dXJlJyksXG4gICAgICAgIH07XG4gICAgICAgIERTTS5kb29yQW5kV2luZG93U2Vuc29yMiA9IHtcbiAgICAgICAgICAgIHN0YXR1czogbmV3IHByb3BlcnR5XzEuZGVmYXVsdCgnZG9vckFuZFdpbmRvd1NlbnNvcjInLCAnc3RhdHVzJyksXG4gICAgICAgIH07XG4gICAgICAgIERTTS5ob21lSHVtaWRpZmllcjAuc3ByYXlWb2x1bWUudXBkYXRlID0gdiA9PiBob21lSHVtaWRpZmllcjAuc2V0U3ByYXlWb2x1bWUobm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQudG8odikpO1xuICAgICAgICBEU00ubGlnaHQxLnJlbGF0aXZlQnJpZ2h0bmVzcy51cGRhdGUgPSB2ID0+IGxpZ2h0MS5zZXRSZWxhdGl2ZUJyaWdodG5lc3Mobm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQudG8odikpO1xuICAgICAgICBEU00ubGlnaHQxLmNvbG9yVGVtcGVyYXR1cmUudXBkYXRlID0gdiA9PiBsaWdodDEuc2V0Q29sb3JUZW1wZXJhdHVyZShub3JtYWxfcGFyc2VyXzEuZGVmYXVsdC50byh2KSk7XG4gICAgICAgIERTTS5ob21lSHVtaWRpZmllcjAuc3ByYXlWb2x1bWUuc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGhvbWVIdW1pZGlmaWVyMC5nZXRTcHJheVZvbHVtZSgpKS52YWx1ZSk7XG4gICAgICAgIERTTS5saWdodDEucmVsYXRpdmVCcmlnaHRuZXNzLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBsaWdodDEuZ2V0UmVsYXRpdmVCcmlnaHRuZXNzKCkpLnZhbHVlKTtcbiAgICAgICAgRFNNLmxpZ2h0MS5jb2xvclRlbXBlcmF0dXJlLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBsaWdodDEuZ2V0Q29sb3JUZW1wZXJhdHVyZSgpKS52YWx1ZSk7XG4gICAgICAgIERTTS5kb29yQW5kV2luZG93U2Vuc29yMi5zdGF0dXMuc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGRvb3JBbmRXaW5kb3dTZW5zb3IyLmdldFN0YXR1cygpKS52YWx1ZSk7XG4gICAgICAgIGhvbWVIdW1pZGlmaWVyMC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLnNwcmF5Vm9sdW1lID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLnNwcmF5Vm9sdW1lKTtcbiAgICAgICAgICAgIERTTS5ob21lSHVtaWRpZmllcjAuc3ByYXlWb2x1bWUuc2V0UmVtb3RlVmFsdWUoZGF0YS5zcHJheVZvbHVtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsaWdodDEuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5yZWxhdGl2ZUJyaWdodG5lc3MgPSBub3JtYWxfcGFyc2VyXzEuZGVmYXVsdC5mcm9tKGRhdGEucmVsYXRpdmVCcmlnaHRuZXNzKTtcbiAgICAgICAgICAgIERTTS5saWdodDEucmVsYXRpdmVCcmlnaHRuZXNzLnNldFJlbW90ZVZhbHVlKGRhdGEucmVsYXRpdmVCcmlnaHRuZXNzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxpZ2h0MS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLmNvbG9yVGVtcGVyYXR1cmUgPSBub3JtYWxfcGFyc2VyXzEuZGVmYXVsdC5mcm9tKGRhdGEuY29sb3JUZW1wZXJhdHVyZSk7XG4gICAgICAgICAgICBEU00ubGlnaHQxLmNvbG9yVGVtcGVyYXR1cmUuc2V0UmVtb3RlVmFsdWUoZGF0YS5jb2xvclRlbXBlcmF0dXJlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvb3JBbmRXaW5kb3dTZW5zb3IyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLnN0YXR1cyk7XG4gICAgICAgICAgICBEU00uZG9vckFuZFdpbmRvd1NlbnNvcjIuc3RhdHVzLnNldFJlbW90ZVZhbHVlKGRhdGEuc3RhdHVzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCBwYXJzZXIwID0gbmV3IGdfcGFyc2VyXzEuZGVmYXVsdCgnU1RSSU5HOlNNQUxMLE1JRERMRSxMQVJHRScsICdJTlQ6MC4wLDEwMC4wLDEuMCcpO1xuICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIwLnNwcmF5Vm9sdW1lLmFkZExpc3RlbmVyKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VyMC5jb252ZXJ0KHZhbHVlKTtcbiAgICAgICAgICAgICgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBCSU5EIGxpZ2h0MS5yZWxhdGl2ZUJyaWdodG5lc3MgY2hhbmdlZC10bycsIHZhbHVlKTtcbiAgICAgICAgICAgIERTTS5saWdodDEucmVsYXRpdmVCcmlnaHRuZXNzLnNldExvY2FsVmFsdWUodmFsdWUsIHByb3BlcnR5XzEuRnJvbS5Mb2NhbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcGFyc2VyMSA9IG5ldyBnX3BhcnNlcl8xLmRlZmF1bHQoJ0JPT0xFQU4nLCAnSU5UOjE3MDAuMCw3MDAwLjAsMS4wJyk7XG4gICAgICAgIERTTS5kb29yQW5kV2luZG93U2Vuc29yMi5zdGF0dXMuYWRkTGlzdGVuZXIodmFsdWUgPT4ge1xuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZXIxLmNvbnZlcnQodmFsdWUpO1xuICAgICAgICAgICAgKDAsIHV0aWxzXzEubWxvZykoJyDilJwgQEJJTkQgbGlnaHQxLmNvbG9yVGVtcGVyYXR1cmUgY2hhbmdlZC10bycsIHZhbHVlKTtcbiAgICAgICAgICAgIERTTS5saWdodDEuY29sb3JUZW1wZXJhdHVyZS5zZXRMb2NhbFZhbHVlKHZhbHVlLCBwcm9wZXJ0eV8xLkZyb20uTG9jYWwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oODQ0KTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==