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
const logic_property_1 = __webpack_require__(898);
const normal_parser_1 = __webpack_require__(989);
const utils_1 = __webpack_require__(89);
let DSM = {};
exports.inited = false;
const humanBodySensor0 = DeviceManager.createHumanBodySensor('HumanMotionSensor_0');
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
        DSM.humanBodySensor0 = {
            existStatus: new property_1.default('humanBodySensor0', 'existStatus'),
        };
        DSM.light1 = {
            switch: new property_1.default('light1', 'switch'),
        };
        DSM.logic1 = {
            B1: new logic_property_1.default('logic1', 'B1'),
        };
        DSM.light1.switch.update = v => light1.setSwitch(normal_parser_1.default.to(v));
        DSM.humanBodySensor0.existStatus.setRemoteValue((yield humanBodySensor0.getExistStatus()).value);
        DSM.light1.switch.setRemoteValue((yield light1.getSwitch()).value);
        humanBodySensor0.subscribe(data => {
            data.existStatus = normal_parser_1.default.from(data.existStatus);
            DSM.humanBodySensor0.existStatus.setRemoteValue(data.existStatus);
        });
        light1.subscribe(data => {
            data.switch = normal_parser_1.default.from(data.switch);
            DSM.light1.switch.setRemoteValue(data.switch);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        DSM.humanBodySensor0.existStatus.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            (0, utils_1.mlog)(' ├ @EVENT CHANGE humanBodySensor0.existStatus changed-to', v);
            (0, utils_1.mlog)(' ├ @EQUIP-PDO SET_VALUE logic1.B1 set to number');
            DSM.logic1.B1.setValue((0, utils_1.mlog)(' ├ @EQUIP-PDS VALUE humanBodySensor0.existStatus to number')
                || DSM.humanBodySensor0.existStatus.getLocalValue());
        }));
        DSM.logic1.B1.addListener((v) => __awaiter(this, void 0, void 0, function* () {
            (0, utils_1.mlog)(' ├ @EVENT CHANGE logic1.B1 changed-to', v);
            (0, utils_1.mlog)(' ├ @EQUIP-PDO SET_VALUE light1.switch set to number');
            DSM.light1.switch.setLocalValue((0, utils_1.mlog)(' ├ @EQUIP-PDS VALUE logic1.B1 to number')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxjQUFjO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOzs7Ozs7O1VDekVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9jb25zdC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9sb2dpYy1wcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9wYXJzZXIvbm9ybWFsLXBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9wcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVU5LTk9XTiA9IHZvaWQgMDtcbmV4cG9ydHMuVU5LTk9XTiA9IFwiQ09OU1QtVU5LTk9XTlwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBMb2dpY1Byb3BlcnR5IHtcbiAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9naWMgdmFsdWUgbm90IGNoYW5nZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlIGxvZ2ljIHN0YXRlOiAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSA9YCwgdmFsdWUpO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbCh2YWx1ZSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihkZXZpY2UsIGtleSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZUFsbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBMb2dpY1Byb3BlcnR5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBOb3JtYWxQYXJzZXIge1xuICAgIHN0YXRpYyBmcm9tKGRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGRhdGEudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEudG9Mb3dlckNhc2UoKSA9PT0gJ2ZhbHNlJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gJ09DQ1VQSUVEJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAnTk9fTUFOJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHN0YXRpYyB0byhkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE5vcm1hbFBhcnNlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Gcm9tID0gdm9pZCAwO1xuY29uc3QgY29uc3RfMSA9IHJlcXVpcmUoXCIuL2NvbnN0XCIpO1xuY29uc3QgaW5kZXhfMSA9IHJlcXVpcmUoXCIuLi9pbmRleFwiKTtcbmNsYXNzIFByb3BlcnR5IHtcbiAgICBjb25zdHJ1Y3RvcihkZXZpY2UsIGtleSwgdXBkYXRlID0gbnVsbCkge1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSBjb25zdF8xLlVOS05PV047XG4gICAgICAgIHRoaXMucmVtb3RlVmFsdWUgPSBjb25zdF8xLlVOS05PV047XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlQWxsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgIH1cbiAgICBzZXRMb2NhbFZhbHVlKHZhbHVlLCBmcm9tID0gRnJvbS5Mb2NhbCkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbFZhbHVlID09PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHZhbHVlKSk7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRSZW1vdGVWYWx1ZSh2YWx1ZSwgRnJvbS5Mb2NhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFJlbW90ZVZhbHVlKHZhbHVlLCBmcm9tID0gRnJvbS5EZXZpY2UpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbW90ZSB2YWx1ZSBub3QgbmVlZCB0byBjaGFuZ2UgYWdhaW5cIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoZnJvbSA9PT0gRnJvbS5Mb2NhbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSByZW1vdGU6ICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9ID1gLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSAmJiB0aGlzLnVwZGF0ZSh2YWx1ZSkudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9IHN1Y2Nlc3M6YCwgcik7XG4gICAgICAgICAgICB9LCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVcGRhdGUgJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gZXJyb3I6YCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZyb20gPT09IEZyb20uRGV2aWNlKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXhfMS5pbml0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZSBkYXRhOiAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSA9YCwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFZhbHVlKHZhbHVlLCBGcm9tLlJlbW90ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGdldExvY2FsVmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsVmFsdWU7XG4gICAgfVxuICAgIGdldFJlbW90ZVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGVWYWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcm9wZXJ0eTtcbnZhciBGcm9tO1xuKGZ1bmN0aW9uIChGcm9tKSB7XG4gICAgRnJvbVtGcm9tW1wiTG9jYWxcIl0gPSAwXSA9IFwiTG9jYWxcIjtcbiAgICBGcm9tW0Zyb21bXCJSZW1vdGVcIl0gPSAxXSA9IFwiUmVtb3RlXCI7XG4gICAgRnJvbVtGcm9tW1wiUGFnZVwiXSA9IDJdID0gXCJQYWdlXCI7XG4gICAgRnJvbVtGcm9tW1wiRGV2aWNlXCJdID0gM10gPSBcIkRldmljZVwiO1xufSkoRnJvbSB8fCAoZXhwb3J0cy5Gcm9tID0gRnJvbSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tbG9nID0gZXhwb3J0cy5IYXZlTm90U3VwcG9ydCA9IGV4cG9ydHMuUERTID0gZXhwb3J0cy5QRE8gPSBleHBvcnRzLlF1ZXVlID0gdm9pZCAwO1xuY2xhc3MgUXVldWUge1xuICAgIHN0YXRpYyBkZWxheSh0aW1lKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlF1ZXVlID0gUXVldWU7XG5mdW5jdGlvbiBQRE8oY29tbWFuZCwgLi4uYXJncykge1xuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0cy5QRE8gPSBQRE87XG5mdW5jdGlvbiBQRFMoY29tbWFuZCwgLi4uYXJncykge1xuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0cy5QRFMgPSBQRFM7XG5mdW5jdGlvbiBIYXZlTm90U3VwcG9ydCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnRzLkhhdmVOb3RTdXBwb3J0ID0gSGF2ZU5vdFN1cHBvcnQ7XG5mdW5jdGlvbiBtbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyguLi5hcmdzKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnRzLm1sb2cgPSBtbG9nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdGVkID0gdm9pZCAwO1xuY29uc3QgcHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuL2NvcmUvcHJvcGVydHlcIik7XG5jb25zdCBsb2dpY19wcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4vY29yZS9sb2dpYy1wcm9wZXJ0eVwiKTtcbmNvbnN0IG5vcm1hbF9wYXJzZXJfMSA9IHJlcXVpcmUoXCIuL2NvcmUvcGFyc2VyL25vcm1hbC1wYXJzZXJcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vY29yZS91dGlsc1wiKTtcbmxldCBEU00gPSB7fTtcbmV4cG9ydHMuaW5pdGVkID0gZmFsc2U7XG5jb25zdCBodW1hbkJvZHlTZW5zb3IwID0gRGV2aWNlTWFuYWdlci5jcmVhdGVIdW1hbkJvZHlTZW5zb3IoJ0h1bWFuTW90aW9uU2Vuc29yXzAnKTtcbmNvbnN0IGxpZ2h0MSA9IERldmljZU1hbmFnZXIuY3JlYXRlTGlnaHQoJ0xhbXAoSG9tZSlfMScpO1xuaW5pdCgpLnRoZW4ociA9PiB7XG4gICAgY29uc29sZS5sb2coJ0luaXQgU3VjY2Vzcy4nKTtcbiAgICBleHBvcnRzLmluaXRlZCA9IHRydWU7XG4gICAgbWFpbigpLnRoZW4ociA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1J1bm5pbmcuLi4nKTtcbiAgICB9LCBlID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTWFpbiBGYWlsZWQuJyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfSk7XG59LCBlID0+IHtcbiAgICBjb25zb2xlLmVycm9yKCdJbml0IEZhaWxlZC4nKTtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xufSk7XG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIERTTS5odW1hbkJvZHlTZW5zb3IwID0ge1xuICAgICAgICAgICAgZXhpc3RTdGF0dXM6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2h1bWFuQm9keVNlbnNvcjAnLCAnZXhpc3RTdGF0dXMnKSxcbiAgICAgICAgfTtcbiAgICAgICAgRFNNLmxpZ2h0MSA9IHtcbiAgICAgICAgICAgIHN3aXRjaDogbmV3IHByb3BlcnR5XzEuZGVmYXVsdCgnbGlnaHQxJywgJ3N3aXRjaCcpLFxuICAgICAgICB9O1xuICAgICAgICBEU00ubG9naWMxID0ge1xuICAgICAgICAgICAgQjE6IG5ldyBsb2dpY19wcm9wZXJ0eV8xLmRlZmF1bHQoJ2xvZ2ljMScsICdCMScpLFxuICAgICAgICB9O1xuICAgICAgICBEU00ubGlnaHQxLnN3aXRjaC51cGRhdGUgPSB2ID0+IGxpZ2h0MS5zZXRTd2l0Y2gobm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQudG8odikpO1xuICAgICAgICBEU00uaHVtYW5Cb2R5U2Vuc29yMC5leGlzdFN0YXR1cy5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgaHVtYW5Cb2R5U2Vuc29yMC5nZXRFeGlzdFN0YXR1cygpKS52YWx1ZSk7XG4gICAgICAgIERTTS5saWdodDEuc3dpdGNoLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBsaWdodDEuZ2V0U3dpdGNoKCkpLnZhbHVlKTtcbiAgICAgICAgaHVtYW5Cb2R5U2Vuc29yMC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLmV4aXN0U3RhdHVzID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLmV4aXN0U3RhdHVzKTtcbiAgICAgICAgICAgIERTTS5odW1hbkJvZHlTZW5zb3IwLmV4aXN0U3RhdHVzLnNldFJlbW90ZVZhbHVlKGRhdGEuZXhpc3RTdGF0dXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGlnaHQxLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuc3dpdGNoID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLnN3aXRjaCk7XG4gICAgICAgICAgICBEU00ubGlnaHQxLnN3aXRjaC5zZXRSZW1vdGVWYWx1ZShkYXRhLnN3aXRjaCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBEU00uaHVtYW5Cb2R5U2Vuc29yMC5leGlzdFN0YXR1cy5hZGRMaXN0ZW5lcigodikgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgKDAsIHV0aWxzXzEubWxvZykoJyDilJwgQEVWRU5UIENIQU5HRSBodW1hbkJvZHlTZW5zb3IwLmV4aXN0U3RhdHVzIGNoYW5nZWQtdG8nLCB2KTtcbiAgICAgICAgICAgICgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBFUVVJUC1QRE8gU0VUX1ZBTFVFIGxvZ2ljMS5CMSBzZXQgdG8gbnVtYmVyJyk7XG4gICAgICAgICAgICBEU00ubG9naWMxLkIxLnNldFZhbHVlKCgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBFUVVJUC1QRFMgVkFMVUUgaHVtYW5Cb2R5U2Vuc29yMC5leGlzdFN0YXR1cyB0byBudW1iZXInKVxuICAgICAgICAgICAgICAgIHx8IERTTS5odW1hbkJvZHlTZW5zb3IwLmV4aXN0U3RhdHVzLmdldExvY2FsVmFsdWUoKSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgRFNNLmxvZ2ljMS5CMS5hZGRMaXN0ZW5lcigodikgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgKDAsIHV0aWxzXzEubWxvZykoJyDilJwgQEVWRU5UIENIQU5HRSBsb2dpYzEuQjEgY2hhbmdlZC10bycsIHYpO1xuICAgICAgICAgICAgKDAsIHV0aWxzXzEubWxvZykoJyDilJwgQEVRVUlQLVBETyBTRVRfVkFMVUUgbGlnaHQxLnN3aXRjaCBzZXQgdG8gbnVtYmVyJyk7XG4gICAgICAgICAgICBEU00ubGlnaHQxLnN3aXRjaC5zZXRMb2NhbFZhbHVlKCgwLCB1dGlsc18xLm1sb2cpKCcg4pScIEBFUVVJUC1QRFMgVkFMVUUgbG9naWMxLkIxIHRvIG51bWJlcicpXG4gICAgICAgICAgICAgICAgfHwgRFNNLmxvZ2ljMS5CMS5nZXRWYWx1ZSgpKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NDQpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9