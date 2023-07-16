/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 407:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UNKNOWN = void 0;
exports.UNKNOWN = "CONST-UNKNOWN";


/***/ }),

/***/ 138:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class DpParser {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    parse(value) {
        return value;
    }
}
exports["default"] = DpParser;


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

/***/ 367:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.From = void 0;
const const_1 = __webpack_require__(407);
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
        if (this.remoteValue === value)
            return false;
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
            console.log('');
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
exports.HaveNotSupport = exports.PDS = exports.PDO = exports.Queue = void 0;
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
    return __awaiter(this, void 0, void 0, function* () {
        return null;
    });
}
exports.PDO = PDO;
function PDS(command, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        return null;
    });
}
exports.PDS = PDS;
function HaveNotSupport(...args) {
    return null;
}
exports.HaveNotSupport = HaveNotSupport;


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
const property_1 = __webpack_require__(367);
const normal_parser_1 = __webpack_require__(989);
const dp_parser_1 = __webpack_require__(138);
const utils_1 = __webpack_require__(89);
let DSM = {};
const humanBodySensor0 = DeviceManager.createHumanBodySensor('HumanMotionSensor_0');
const light1 = DeviceManager.createLight('Lamp(Home)_1');
const homeHumidifier2 = DeviceManager.createHomeHumidifier('HouseholdHumidifier_2');
const doorAndWindowSensor3 = DeviceManager.createDoorAndWindowSensor('DoorAndWindowSensor_3');
init().then(r => {
    console.log('Init Success.');
    main().then(r => {
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
        DSM.humanBodySensor0 = {
            existStatus: new property_1.default('humanBodySensor0', 'existStatus'),
        };
        DSM.light1 = {
            switch: new property_1.default('light1', 'switch'),
        };
        DSM.homeHumidifier2 = {
            settledHumidity: new property_1.default('homeHumidifier2', 'settledHumidity'),
        };
        DSM.doorAndWindowSensor3 = {
            status: new property_1.default('doorAndWindowSensor3', 'status'),
        };
        DSM.light1.switch.update = v => light1.setSwitch(normal_parser_1.default.to(v));
        DSM.homeHumidifier2.settledHumidity.update = v => homeHumidifier2.setHumidity(normal_parser_1.default.to(v));
        DSM.humanBodySensor0.existStatus.setRemoteValue((yield humanBodySensor0.getExistStatus()).value);
        DSM.light1.switch.setRemoteValue((yield light1.getSwitch()).value);
        DSM.homeHumidifier2.settledHumidity.setRemoteValue((yield homeHumidifier2.getSettledHumidity()).value);
        DSM.doorAndWindowSensor3.status.setRemoteValue((yield doorAndWindowSensor3.getStatus()).value);
        humanBodySensor0.subscribe(data => {
            data.existStatus = normal_parser_1.default.from(data.existStatus);
            DSM.humanBodySensor0.existStatus.setRemoteValue(data.existStatus);
        });
        light1.subscribe(data => {
            data.switch = normal_parser_1.default.from(data.switch);
            DSM.light1.switch.setRemoteValue(data.switch);
        });
        homeHumidifier2.subscribe(data => {
            data.settledHumidity = normal_parser_1.default.from(data.settledHumidity);
            DSM.homeHumidifier2.settledHumidity.setRemoteValue(data.settledHumidity);
        });
        doorAndWindowSensor3.subscribe(data => {
            data.status = normal_parser_1.default.from(data.status);
            DSM.doorAndWindowSensor3.status.setRemoteValue(data.status);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        DSM.humanBodySensor0.existStatus.addListener(value => {
            value = new dp_parser_1.default(DSM.humanBodySensor0.existStatus, DSM.light1.switch).parse(value);
            DSM.light1.switch.setLocalValue(value, property_1.From.Local);
        });
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if (DSM.humanBodySensor0.existStatus.getLocalValue()) {
                (0, utils_1.HaveNotSupport)();
            }
        }), 0);
        DSM.humanBodySensor0.existStatus.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            if (DSM.humanBodySensor0.existStatus.getLocalValue()) {
                (0, utils_1.HaveNotSupport)();
                (0, utils_1.HaveNotSupport)();
            }
        }));
        DSM.humanBodySensor0.existStatus.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            if (v) {
                DSM.light1.switch.setRemoteValue(true);
            }
        }));
        DSM.humanBodySensor0.existStatus.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            if (v) {
                if (DSM.humanBodySensor0.existStatus.getLocalValue() > 10.0) {
                }
            }
        }));
        DSM.humanBodySensor0.existStatus.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            if (v > 10.0) {
                if (DSM.humanBodySensor0.existStatus.getLocalValue() == 'Hello') {
                }
            }
        }));
        DSM.humanBodySensor0.existStatus.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            if (v == 'Hello') {
                DSM.homeHumidifier2.settledHumidity.setRemoteValue(DSM.doorAndWindowSensor3.status.getLocalValue());
            }
        }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7OztVQzlHQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2NvcmUvY29uc3QudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvcmUvcGFyc2VyL2RwLXBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9wYXJzZXIvbm9ybWFsLXBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9wcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVU5LTk9XTiA9IHZvaWQgMDtcbmV4cG9ydHMuVU5LTk9XTiA9IFwiQ09OU1QtVU5LTk9XTlwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBEcFBhcnNlciB7XG4gICAgY29uc3RydWN0b3IoZnJvbSwgdG8pIHtcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICAgICAgdGhpcy50byA9IHRvO1xuICAgIH1cbiAgICBwYXJzZSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRHBQYXJzZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE5vcm1hbFBhcnNlciB7XG4gICAgc3RhdGljIGZyb20oZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAnT0NDVVBJRUQnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICdOT19NQU4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgc3RhdGljIHRvKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTm9ybWFsUGFyc2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkZyb20gPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4vY29uc3RcIik7XG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3IoZGV2aWNlLCBrZXksIHVwZGF0ZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZUFsbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB9XG4gICAgc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uTG9jYWwpIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxWYWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbCh2YWx1ZSkpO1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVtb3RlVmFsdWUodmFsdWUsIEZyb20uTG9jYWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRSZW1vdGVWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uRGV2aWNlKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVZhbHVlID09PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5yZW1vdGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoZnJvbSA9PT0gRnJvbS5Mb2NhbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSByZW1vdGU6ICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9ID1gLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSAmJiB0aGlzLnVwZGF0ZSh2YWx1ZSkudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9IHN1Y2Nlc3M6YCwgcik7XG4gICAgICAgICAgICB9LCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVcGRhdGUgJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gZXJyb3I6YCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZyb20gPT09IEZyb20uRGV2aWNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZSBkYXRhOiAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSA9YCwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFZhbHVlKHZhbHVlLCBGcm9tLlJlbW90ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGdldExvY2FsVmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsVmFsdWU7XG4gICAgfVxuICAgIGdldFJlbW90ZVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGVWYWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcm9wZXJ0eTtcbnZhciBGcm9tO1xuKGZ1bmN0aW9uIChGcm9tKSB7XG4gICAgRnJvbVtGcm9tW1wiTG9jYWxcIl0gPSAwXSA9IFwiTG9jYWxcIjtcbiAgICBGcm9tW0Zyb21bXCJSZW1vdGVcIl0gPSAxXSA9IFwiUmVtb3RlXCI7XG4gICAgRnJvbVtGcm9tW1wiUGFnZVwiXSA9IDJdID0gXCJQYWdlXCI7XG4gICAgRnJvbVtGcm9tW1wiRGV2aWNlXCJdID0gM10gPSBcIkRldmljZVwiO1xufSkoRnJvbSB8fCAoZXhwb3J0cy5Gcm9tID0gRnJvbSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5IYXZlTm90U3VwcG9ydCA9IGV4cG9ydHMuUERTID0gZXhwb3J0cy5QRE8gPSBleHBvcnRzLlF1ZXVlID0gdm9pZCAwO1xuY2xhc3MgUXVldWUge1xuICAgIHN0YXRpYyBkZWxheSh0aW1lKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlF1ZXVlID0gUXVldWU7XG5mdW5jdGlvbiBQRE8oY29tbWFuZCwgLi4uYXJncykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZXhwb3J0cy5QRE8gPSBQRE87XG5mdW5jdGlvbiBQRFMoY29tbWFuZCwgLi4uYXJncykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xufVxuZXhwb3J0cy5QRFMgPSBQRFM7XG5mdW5jdGlvbiBIYXZlTm90U3VwcG9ydCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnRzLkhhdmVOb3RTdXBwb3J0ID0gSGF2ZU5vdFN1cHBvcnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuL2NvcmUvcHJvcGVydHlcIik7XG5jb25zdCBub3JtYWxfcGFyc2VyXzEgPSByZXF1aXJlKFwiLi9jb3JlL3BhcnNlci9ub3JtYWwtcGFyc2VyXCIpO1xuY29uc3QgZHBfcGFyc2VyXzEgPSByZXF1aXJlKFwiLi9jb3JlL3BhcnNlci9kcC1wYXJzZXJcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vY29yZS91dGlsc1wiKTtcbmxldCBEU00gPSB7fTtcbmNvbnN0IGh1bWFuQm9keVNlbnNvcjAgPSBEZXZpY2VNYW5hZ2VyLmNyZWF0ZUh1bWFuQm9keVNlbnNvcignSHVtYW5Nb3Rpb25TZW5zb3JfMCcpO1xuY29uc3QgbGlnaHQxID0gRGV2aWNlTWFuYWdlci5jcmVhdGVMaWdodCgnTGFtcChIb21lKV8xJyk7XG5jb25zdCBob21lSHVtaWRpZmllcjIgPSBEZXZpY2VNYW5hZ2VyLmNyZWF0ZUhvbWVIdW1pZGlmaWVyKCdIb3VzZWhvbGRIdW1pZGlmaWVyXzInKTtcbmNvbnN0IGRvb3JBbmRXaW5kb3dTZW5zb3IzID0gRGV2aWNlTWFuYWdlci5jcmVhdGVEb29yQW5kV2luZG93U2Vuc29yKCdEb29yQW5kV2luZG93U2Vuc29yXzMnKTtcbmluaXQoKS50aGVuKHIgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdJbml0IFN1Y2Nlc3MuJyk7XG4gICAgbWFpbigpLnRoZW4ociA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSdW5uaW5nLi4uJyk7XG4gICAgfSwgZSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ01haW4gRmFpbGVkLicpO1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH0pO1xufSwgZSA9PiB7XG4gICAgY29uc29sZS5lcnJvcignSW5pdCBGYWlsZWQuJyk7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbn0pO1xuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBEU00uaHVtYW5Cb2R5U2Vuc29yMCA9IHtcbiAgICAgICAgICAgIGV4aXN0U3RhdHVzOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KCdodW1hbkJvZHlTZW5zb3IwJywgJ2V4aXN0U3RhdHVzJyksXG4gICAgICAgIH07XG4gICAgICAgIERTTS5saWdodDEgPSB7XG4gICAgICAgICAgICBzd2l0Y2g6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2xpZ2h0MScsICdzd2l0Y2gnKSxcbiAgICAgICAgfTtcbiAgICAgICAgRFNNLmhvbWVIdW1pZGlmaWVyMiA9IHtcbiAgICAgICAgICAgIHNldHRsZWRIdW1pZGl0eTogbmV3IHByb3BlcnR5XzEuZGVmYXVsdCgnaG9tZUh1bWlkaWZpZXIyJywgJ3NldHRsZWRIdW1pZGl0eScpLFxuICAgICAgICB9O1xuICAgICAgICBEU00uZG9vckFuZFdpbmRvd1NlbnNvcjMgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2Rvb3JBbmRXaW5kb3dTZW5zb3IzJywgJ3N0YXR1cycpLFxuICAgICAgICB9O1xuICAgICAgICBEU00ubGlnaHQxLnN3aXRjaC51cGRhdGUgPSB2ID0+IGxpZ2h0MS5zZXRTd2l0Y2gobm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQudG8odikpO1xuICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIyLnNldHRsZWRIdW1pZGl0eS51cGRhdGUgPSB2ID0+IGhvbWVIdW1pZGlmaWVyMi5zZXRIdW1pZGl0eShub3JtYWxfcGFyc2VyXzEuZGVmYXVsdC50byh2KSk7XG4gICAgICAgIERTTS5odW1hbkJvZHlTZW5zb3IwLmV4aXN0U3RhdHVzLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBodW1hbkJvZHlTZW5zb3IwLmdldEV4aXN0U3RhdHVzKCkpLnZhbHVlKTtcbiAgICAgICAgRFNNLmxpZ2h0MS5zd2l0Y2guc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGxpZ2h0MS5nZXRTd2l0Y2goKSkudmFsdWUpO1xuICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIyLnNldHRsZWRIdW1pZGl0eS5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgaG9tZUh1bWlkaWZpZXIyLmdldFNldHRsZWRIdW1pZGl0eSgpKS52YWx1ZSk7XG4gICAgICAgIERTTS5kb29yQW5kV2luZG93U2Vuc29yMy5zdGF0dXMuc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGRvb3JBbmRXaW5kb3dTZW5zb3IzLmdldFN0YXR1cygpKS52YWx1ZSk7XG4gICAgICAgIGh1bWFuQm9keVNlbnNvcjAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5leGlzdFN0YXR1cyA9IG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LmZyb20oZGF0YS5leGlzdFN0YXR1cyk7XG4gICAgICAgICAgICBEU00uaHVtYW5Cb2R5U2Vuc29yMC5leGlzdFN0YXR1cy5zZXRSZW1vdGVWYWx1ZShkYXRhLmV4aXN0U3RhdHVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxpZ2h0MS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLnN3aXRjaCA9IG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LmZyb20oZGF0YS5zd2l0Y2gpO1xuICAgICAgICAgICAgRFNNLmxpZ2h0MS5zd2l0Y2guc2V0UmVtb3RlVmFsdWUoZGF0YS5zd2l0Y2gpO1xuICAgICAgICB9KTtcbiAgICAgICAgaG9tZUh1bWlkaWZpZXIyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuc2V0dGxlZEh1bWlkaXR5ID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLnNldHRsZWRIdW1pZGl0eSk7XG4gICAgICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIyLnNldHRsZWRIdW1pZGl0eS5zZXRSZW1vdGVWYWx1ZShkYXRhLnNldHRsZWRIdW1pZGl0eSk7XG4gICAgICAgIH0pO1xuICAgICAgICBkb29yQW5kV2luZG93U2Vuc29yMy5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLnN0YXR1cyA9IG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LmZyb20oZGF0YS5zdGF0dXMpO1xuICAgICAgICAgICAgRFNNLmRvb3JBbmRXaW5kb3dTZW5zb3IzLnN0YXR1cy5zZXRSZW1vdGVWYWx1ZShkYXRhLnN0YXR1cyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBEU00uaHVtYW5Cb2R5U2Vuc29yMC5leGlzdFN0YXR1cy5hZGRMaXN0ZW5lcih2YWx1ZSA9PiB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBkcF9wYXJzZXJfMS5kZWZhdWx0KERTTS5odW1hbkJvZHlTZW5zb3IwLmV4aXN0U3RhdHVzLCBEU00ubGlnaHQxLnN3aXRjaCkucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgRFNNLmxpZ2h0MS5zd2l0Y2guc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLkxvY2FsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKERTTS5odW1hbkJvZHlTZW5zb3IwLmV4aXN0U3RhdHVzLmdldExvY2FsVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICgwLCB1dGlsc18xLkhhdmVOb3RTdXBwb3J0KSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgMCk7XG4gICAgICAgIERTTS5odW1hbkJvZHlTZW5zb3IwLmV4aXN0U3RhdHVzLmFkZExpc3RlbmVyKCh2KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAoRFNNLmh1bWFuQm9keVNlbnNvcjAuZXhpc3RTdGF0dXMuZ2V0TG9jYWxWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgKDAsIHV0aWxzXzEuSGF2ZU5vdFN1cHBvcnQpKCk7XG4gICAgICAgICAgICAgICAgKDAsIHV0aWxzXzEuSGF2ZU5vdFN1cHBvcnQpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgRFNNLmh1bWFuQm9keVNlbnNvcjAuZXhpc3RTdGF0dXMuYWRkTGlzdGVuZXIoKHYpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgRFNNLmxpZ2h0MS5zd2l0Y2guc2V0UmVtb3RlVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgRFNNLmh1bWFuQm9keVNlbnNvcjAuZXhpc3RTdGF0dXMuYWRkTGlzdGVuZXIoKHYpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgaWYgKERTTS5odW1hbkJvZHlTZW5zb3IwLmV4aXN0U3RhdHVzLmdldExvY2FsVmFsdWUoKSA+IDEwLjApIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgRFNNLmh1bWFuQm9keVNlbnNvcjAuZXhpc3RTdGF0dXMuYWRkTGlzdGVuZXIoKHYpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICh2ID4gMTAuMCkge1xuICAgICAgICAgICAgICAgIGlmIChEU00uaHVtYW5Cb2R5U2Vuc29yMC5leGlzdFN0YXR1cy5nZXRMb2NhbFZhbHVlKCkgPT0gJ0hlbGxvJykge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBEU00uaHVtYW5Cb2R5U2Vuc29yMC5leGlzdFN0YXR1cy5hZGRMaXN0ZW5lcigodikgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHYgPT0gJ0hlbGxvJykge1xuICAgICAgICAgICAgICAgIERTTS5ob21lSHVtaWRpZmllcjIuc2V0dGxlZEh1bWlkaXR5LnNldFJlbW90ZVZhbHVlKERTTS5kb29yQW5kV2luZG93U2Vuc29yMy5zdGF0dXMuZ2V0TG9jYWxWYWx1ZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NDQpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9