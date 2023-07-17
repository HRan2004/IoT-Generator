/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 407:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UNKNOWN = void 0;
exports.UNKNOWN = "CONST-UNKNOWN";


/***/ }),

/***/ 898:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class LogicProperty {
    setValue(value) {
        if (this.value === value) {
            console.log("Logic value not changed");
            return false;
        }
        this.value = value;
        console.log(`Update logic state: ${this.device}.${this.key} =`, value);
        this.listeners.forEach(l => l(value));
        return true;
    }
    getValue() {
        return this.value;
    }
    constructor(device, key) {
        this.value = null;
        this.listeners = [];
        this.device = device;
        this.key = key;
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
}
exports["default"] = LogicProperty;


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
const logic_property_1 = __webpack_require__(898);
const normal_parser_1 = __webpack_require__(989);
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
            colorTemperature: new property_1.default('light0', 'colorTemperature'),
        };
        DSM.light1 = {
            colorTemperature: new property_1.default('light1', 'colorTemperature'),
        };
        DSM.logic0 = {
            B1: new logic_property_1.default('logic0', 'B1'),
        };
        DSM.logic1 = {
            B1: new logic_property_1.default('logic1', 'B1'),
        };
        DSM.light0.colorTemperature.update = v => light0.setColorTemperature(normal_parser_1.default.to(v));
        DSM.light1.colorTemperature.update = v => light1.setColorTemperature(normal_parser_1.default.to(v));
        DSM.light0.colorTemperature.setRemoteValue((yield light0.getColorTemperature()).value);
        DSM.light1.colorTemperature.setRemoteValue((yield light1.getColorTemperature()).value);
        light0.subscribe(data => {
            data.colorTemperature = normal_parser_1.default.from(data.colorTemperature);
            DSM.light0.colorTemperature.setRemoteValue(data.colorTemperature);
        });
        light1.subscribe(data => {
            data.colorTemperature = normal_parser_1.default.from(data.colorTemperature);
            DSM.light1.colorTemperature.setRemoteValue(data.colorTemperature);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        DSM.light0.colorTemperature.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            (0, utils_1.mlog)(' ├ @EVENT CHANGE light0.colorTemperature changed-to', v);
            (0, utils_1.mlog)(' ├ @EQUIP-PDO SET_VALUE logic0.B1 set as number');
            DSM.logic0.B1.setValue((0, utils_1.mlog)(' ├ @EQUIP-PDS VALUE light0.colorTemperature as number')
                || DSM.light0.colorTemperature.getLocalValue());
        }));
        DSM.logic0.B1.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            (0, utils_1.mlog)(' ├ @EVENT CHANGE logic0.B1 changed-to', v);
            (0, utils_1.mlog)(' ├ @EQUIP-PDO SET_VALUE logic1.B1 set as number');
            DSM.logic1.B1.setValue((0, utils_1.mlog)(' ├ @EQUIP-PDS VALUE logic0.B1 as number')
                || DSM.logic0.B1.getValue());
        }));
        DSM.logic1.B1.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            (0, utils_1.mlog)(' ├ @EVENT CHANGE logic1.B1 changed-to', v);
            (0, utils_1.mlog)(' ├ @EQUIP-PDO SET_VALUE light1.colorTemperature set as number');
            DSM.light1.colorTemperature.setLocalValue((0, utils_1.mlog)(' ├ @EQUIP-PDS VALUE logic1.B1 as number')
                || DSM.logic1.B1.getValue());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7Ozs7Ozs7VUNuRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9jb3JlL2NvbnN0LnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL2xvZ2ljLXByb3BlcnR5LnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3BhcnNlci9ub3JtYWwtcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3Byb3BlcnR5LnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3V0aWxzLnRzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5VTktOT1dOID0gdm9pZCAwO1xuZXhwb3J0cy5VTktOT1dOID0gXCJDT05TVC1VTktOT1dOXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIExvZ2ljUHJvcGVydHkge1xuICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dpYyB2YWx1ZSBub3QgY2hhbmdlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGUgbG9naWMgc3RhdGU6ICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9ID1gLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHZhbHVlKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGRldmljZSwga2V5KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlQWxsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IExvZ2ljUHJvcGVydHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE5vcm1hbFBhcnNlciB7XG4gICAgc3RhdGljIGZyb20oZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAnT0NDVVBJRUQnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICdOT19NQU4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgc3RhdGljIHRvKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTm9ybWFsUGFyc2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkZyb20gPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4vY29uc3RcIik7XG5jb25zdCBpbmRleF8xID0gcmVxdWlyZShcIi4uL2luZGV4XCIpO1xuY2xhc3MgUHJvcGVydHkge1xuICAgIGNvbnN0cnVjdG9yKGRldmljZSwga2V5LCB1cGRhdGUgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IGNvbnN0XzEuVU5LTk9XTjtcbiAgICAgICAgdGhpcy5yZW1vdGVWYWx1ZSA9IGNvbnN0XzEuVU5LTk9XTjtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcbiAgICB9XG4gICAgYWRkTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgfVxuICAgIHNldExvY2FsVmFsdWUodmFsdWUsIGZyb20gPSBGcm9tLkxvY2FsKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsVmFsdWUgPT09IHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChsID0+IGwodmFsdWUpKTtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlbW90ZVZhbHVlKHZhbHVlLCBGcm9tLkxvY2FsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc2V0UmVtb3RlVmFsdWUodmFsdWUsIGZyb20gPSBGcm9tLkRldmljZSkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmIChmcm9tID09PSBGcm9tLkxvY2FsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlIHJlbW90ZTogJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gPWAsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlICYmIHRoaXMudXBkYXRlKHZhbHVlKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGUgJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gc3VjY2VzczpgLCByKTtcbiAgICAgICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVwZGF0ZSAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSBlcnJvcjpgKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZnJvbSA9PT0gRnJvbS5EZXZpY2UpIHtcbiAgICAgICAgICAgIGlmIChpbmRleF8xLmluaXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlIGRhdGE6ICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9ID1gLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldExvY2FsVmFsdWUodmFsdWUsIEZyb20uUmVtb3RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0TG9jYWxWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxWYWx1ZTtcbiAgICB9XG4gICAgZ2V0UmVtb3RlVmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW90ZVZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByb3BlcnR5O1xudmFyIEZyb207XG4oZnVuY3Rpb24gKEZyb20pIHtcbiAgICBGcm9tW0Zyb21bXCJMb2NhbFwiXSA9IDBdID0gXCJMb2NhbFwiO1xuICAgIEZyb21bRnJvbVtcIlJlbW90ZVwiXSA9IDFdID0gXCJSZW1vdGVcIjtcbiAgICBGcm9tW0Zyb21bXCJQYWdlXCJdID0gMl0gPSBcIlBhZ2VcIjtcbiAgICBGcm9tW0Zyb21bXCJEZXZpY2VcIl0gPSAzXSA9IFwiRGV2aWNlXCI7XG59KShGcm9tIHx8IChleHBvcnRzLkZyb20gPSBGcm9tID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1sb2cgPSBleHBvcnRzLkhhdmVOb3RTdXBwb3J0ID0gZXhwb3J0cy5QRFMgPSBleHBvcnRzLlBETyA9IGV4cG9ydHMuUXVldWUgPSB2b2lkIDA7XG5jbGFzcyBRdWV1ZSB7XG4gICAgc3RhdGljIGRlbGF5KHRpbWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuUXVldWUgPSBRdWV1ZTtcbmZ1bmN0aW9uIFBETyhjb21tYW5kLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnRzLlBETyA9IFBETztcbmZ1bmN0aW9uIFBEUyhjb21tYW5kLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnRzLlBEUyA9IFBEUztcbmZ1bmN0aW9uIEhhdmVOb3RTdXBwb3J0KC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydHMuSGF2ZU5vdFN1cHBvcnQgPSBIYXZlTm90U3VwcG9ydDtcbmZ1bmN0aW9uIG1sb2coLi4uYXJncykge1xuICAgIGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydHMubWxvZyA9IG1sb2c7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0ZWQgPSB2b2lkIDA7XG5jb25zdCBwcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4vY29yZS9wcm9wZXJ0eVwiKTtcbmNvbnN0IGxvZ2ljX3Byb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9jb3JlL2xvZ2ljLXByb3BlcnR5XCIpO1xuY29uc3Qgbm9ybWFsX3BhcnNlcl8xID0gcmVxdWlyZShcIi4vY29yZS9wYXJzZXIvbm9ybWFsLXBhcnNlclwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi9jb3JlL3V0aWxzXCIpO1xubGV0IERTTSA9IHt9O1xuZXhwb3J0cy5pbml0ZWQgPSBmYWxzZTtcbmNvbnN0IGxpZ2h0MCA9IERldmljZU1hbmFnZXIuY3JlYXRlTGlnaHQoJ0xhbXAoSG9tZSlfMCcpO1xuY29uc3QgbGlnaHQxID0gRGV2aWNlTWFuYWdlci5jcmVhdGVMaWdodCgnTGFtcChIb21lKV8xJyk7XG5pbml0KCkudGhlbihyID0+IHtcbiAgICBjb25zb2xlLmxvZygnSW5pdCBTdWNjZXNzLicpO1xuICAgIGV4cG9ydHMuaW5pdGVkID0gdHJ1ZTtcbiAgICBtYWluKCkudGhlbihyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJycpO1xuICAgICAgICBjb25zb2xlLmxvZygnUnVubmluZy4uLicpO1xuICAgIH0sIGUgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdNYWluIEZhaWxlZC4nKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9KTtcbn0sIGUgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0luaXQgRmFpbGVkLicpO1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG59KTtcbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgRFNNLmxpZ2h0MCA9IHtcbiAgICAgICAgICAgIGNvbG9yVGVtcGVyYXR1cmU6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2xpZ2h0MCcsICdjb2xvclRlbXBlcmF0dXJlJyksXG4gICAgICAgIH07XG4gICAgICAgIERTTS5saWdodDEgPSB7XG4gICAgICAgICAgICBjb2xvclRlbXBlcmF0dXJlOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KCdsaWdodDEnLCAnY29sb3JUZW1wZXJhdHVyZScpLFxuICAgICAgICB9O1xuICAgICAgICBEU00ubG9naWMwID0ge1xuICAgICAgICAgICAgQjE6IG5ldyBsb2dpY19wcm9wZXJ0eV8xLmRlZmF1bHQoJ2xvZ2ljMCcsICdCMScpLFxuICAgICAgICB9O1xuICAgICAgICBEU00ubG9naWMxID0ge1xuICAgICAgICAgICAgQjE6IG5ldyBsb2dpY19wcm9wZXJ0eV8xLmRlZmF1bHQoJ2xvZ2ljMScsICdCMScpLFxuICAgICAgICB9O1xuICAgICAgICBEU00ubGlnaHQwLmNvbG9yVGVtcGVyYXR1cmUudXBkYXRlID0gdiA9PiBsaWdodDAuc2V0Q29sb3JUZW1wZXJhdHVyZShub3JtYWxfcGFyc2VyXzEuZGVmYXVsdC50byh2KSk7XG4gICAgICAgIERTTS5saWdodDEuY29sb3JUZW1wZXJhdHVyZS51cGRhdGUgPSB2ID0+IGxpZ2h0MS5zZXRDb2xvclRlbXBlcmF0dXJlKG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LnRvKHYpKTtcbiAgICAgICAgRFNNLmxpZ2h0MC5jb2xvclRlbXBlcmF0dXJlLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBsaWdodDAuZ2V0Q29sb3JUZW1wZXJhdHVyZSgpKS52YWx1ZSk7XG4gICAgICAgIERTTS5saWdodDEuY29sb3JUZW1wZXJhdHVyZS5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgbGlnaHQxLmdldENvbG9yVGVtcGVyYXR1cmUoKSkudmFsdWUpO1xuICAgICAgICBsaWdodDAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5jb2xvclRlbXBlcmF0dXJlID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLmNvbG9yVGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgRFNNLmxpZ2h0MC5jb2xvclRlbXBlcmF0dXJlLnNldFJlbW90ZVZhbHVlKGRhdGEuY29sb3JUZW1wZXJhdHVyZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsaWdodDEuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5jb2xvclRlbXBlcmF0dXJlID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLmNvbG9yVGVtcGVyYXR1cmUpO1xuICAgICAgICAgICAgRFNNLmxpZ2h0MS5jb2xvclRlbXBlcmF0dXJlLnNldFJlbW90ZVZhbHVlKGRhdGEuY29sb3JUZW1wZXJhdHVyZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBEU00ubGlnaHQwLmNvbG9yVGVtcGVyYXR1cmUuYWRkTGlzdGVuZXIoKHYpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBFVkVOVCBDSEFOR0UgbGlnaHQwLmNvbG9yVGVtcGVyYXR1cmUgY2hhbmdlZC10bycsIHYpO1xuICAgICAgICAgICAgKDAsIHV0aWxzXzEubWxvZykoJyDilJwgQEVRVUlQLVBETyBTRVRfVkFMVUUgbG9naWMwLkIxIHNldCBhcyBudW1iZXInKTtcbiAgICAgICAgICAgIERTTS5sb2dpYzAuQjEuc2V0VmFsdWUoKDAsIHV0aWxzXzEubWxvZykoJyDilJwgQEVRVUlQLVBEUyBWQUxVRSBsaWdodDAuY29sb3JUZW1wZXJhdHVyZSBhcyBudW1iZXInKVxuICAgICAgICAgICAgICAgIHx8IERTTS5saWdodDAuY29sb3JUZW1wZXJhdHVyZS5nZXRMb2NhbFZhbHVlKCkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIERTTS5sb2dpYzAuQjEuYWRkTGlzdGVuZXIoKHYpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBFVkVOVCBDSEFOR0UgbG9naWMwLkIxIGNoYW5nZWQtdG8nLCB2KTtcbiAgICAgICAgICAgICgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBFUVVJUC1QRE8gU0VUX1ZBTFVFIGxvZ2ljMS5CMSBzZXQgYXMgbnVtYmVyJyk7XG4gICAgICAgICAgICBEU00ubG9naWMxLkIxLnNldFZhbHVlKCgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBFUVVJUC1QRFMgVkFMVUUgbG9naWMwLkIxIGFzIG51bWJlcicpXG4gICAgICAgICAgICAgICAgfHwgRFNNLmxvZ2ljMC5CMS5nZXRWYWx1ZSgpKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBEU00ubG9naWMxLkIxLmFkZExpc3RlbmVyKCh2KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAoMCwgdXRpbHNfMS5tbG9nKSgnIOKUnCBARVZFTlQgQ0hBTkdFIGxvZ2ljMS5CMSBjaGFuZ2VkLXRvJywgdik7XG4gICAgICAgICAgICAoMCwgdXRpbHNfMS5tbG9nKSgnIOKUnCBARVFVSVAtUERPIFNFVF9WQUxVRSBsaWdodDEuY29sb3JUZW1wZXJhdHVyZSBzZXQgYXMgbnVtYmVyJyk7XG4gICAgICAgICAgICBEU00ubGlnaHQxLmNvbG9yVGVtcGVyYXR1cmUuc2V0TG9jYWxWYWx1ZSgoMCwgdXRpbHNfMS5tbG9nKSgnIOKUnCBARVFVSVAtUERTIFZBTFVFIGxvZ2ljMS5CMSBhcyBudW1iZXInKVxuICAgICAgICAgICAgICAgIHx8IERTTS5sb2dpYzEuQjEuZ2V0VmFsdWUoKSk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oODQ0KTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==