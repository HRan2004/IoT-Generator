/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 353:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UNKNOWN = void 0;
exports.UNKNOWN = "CONST-UNKNOWN";


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
const property_1 = __webpack_require__(890);
const parser_1 = __webpack_require__(552);
let deviceManager;
let DSM = {};
let light0;
let humanSensor1;
let householdHumidifier2;
window.methods = {
    onloadSdk(deviceArr) {
        deviceManager = new DeviceManager(deviceArr);
        light0 = deviceManager.getLight('Lamp(Home)_0');
        humanSensor1 = deviceManager.getHumanSensor_1('HumanMotionSensor_1');
        householdHumidifier2 = deviceManager.getHouseholdHumidifier('HouseholdHumidifier_2');
        DSM.light0 = {
            onOff: new property_1.default("light0", "onOff", v => light0.setOnOff(parser_1.default.parseToRemote(v))),
        };
        DSM.humanSensor1 = {
            existStatus: new property_1.default("humanSensor1", "existStatus")
        };
        DSM.householdHumidifier2 = {
            onOff: new property_1.default("householdHumidifier2", "onOff", v => householdHumidifier2.setOnOff(parser_1.default.parseToRemote(v))),
        };
        console.log('Devices sdk loaded.\n');
        try {
            init().then(r => {
                console.log('Init Success.');
                try {
                    main().then(r => { });
                }
                catch (e) {
                    console.error('Run Error.');
                    console.error(e);
                }
            });
        }
        catch (e) {
            console.error('Init Error.');
            console.error(e);
        }
    },
};
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        DSM.humanSensor1.existStatus.setRemoteValue((yield humanSensor1.getExistStatus()).value, property_1.From.Remote);
        DSM.light0.onOff.setRemoteValue((yield light0.getOnOff()).value, property_1.From.Remote);
        DSM.householdHumidifier2.onOff.setRemoteValue((yield householdHumidifier2.getOnOff()).value, property_1.From.Remote);
        humanSensor1.onReceive(data => {
            data.existStatus = parser_1.default.parseFromRemote(data.existStatus);
            DSM.humanSensor1.existStatus.setRemoteValue(data.existStatus, property_1.From.Device);
        });
        light0.onReceive(data => {
            data.onOff = parser_1.default.parseFromRemote(data.onOff);
            DSM.light0.onOff.setRemoteValue(data.onOff, property_1.From.Device);
        });
        householdHumidifier2.onReceive(data => {
            data.onOff = parser_1.default.parseFromRemote(data.onOff);
            DSM.householdHumidifier2.onOff.setRemoteValue(data.onOff, property_1.From.Device);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        DSM.humanSensor1.existStatus.addListener(value => {
            DSM.light0.onOff.setLocalValue(value, property_1.From.Local);
        });
        DSM.light0.onOff.addListener(value => {
            DSM.householdHumidifier2.onOff.setLocalValue(value, property_1.From.Local);
        });
        DSM.householdHumidifier2.onOff.addListener(value => {
            DSM.light0.onOff.setLocalValue(value, property_1.From.Local);
        });
    });
}


/***/ }),

/***/ 552:
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Parser {
    static parseFromRemote(data) {
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
    static parseToRemote(data) {
        return data;
    }
}
exports["default"] = Parser;


/***/ }),

/***/ 890:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.From = void 0;
const const_1 = __webpack_require__(353);
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
    setRemoteValue(value, from = From.Local) {
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
}
exports["default"] = Property;
var From;
(function (From) {
    From[From["Local"] = 0] = "Local";
    From[From["Remote"] = 1] = "Remote";
    From[From["Page"] = 2] = "Page";
    From[From["Device"] = 3] = "Device";
})(From || (exports.From = From = {}));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixlQUFlOzs7Ozs7OztBQ0hGO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsbUJBQU8sQ0FBQyxHQUFZO0FBQ3ZDLGlCQUFpQixtQkFBTyxDQUFDLEdBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7Ozs7Ozs7O0FDbkZhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7OztBQ3BCRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1osZ0JBQWdCLG1CQUFPLENBQUMsR0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsWUFBWSxHQUFHLFVBQVU7QUFDbkU7QUFDQSxzQ0FBc0MsWUFBWSxHQUFHLFVBQVU7QUFDL0QsYUFBYTtBQUNiLHdDQUF3QyxZQUFZLEdBQUcsVUFBVTtBQUNqRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsWUFBWSxHQUFHLFVBQVU7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxXQUFXLFlBQVksWUFBWTs7Ozs7OztVQzVEcEM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9jb25zdC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3BhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVU5LTk9XTiA9IHZvaWQgMDtcbmV4cG9ydHMuVU5LTk9XTiA9IFwiQ09OU1QtVU5LTk9XTlwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9wcm9wZXJ0eVwiKTtcbmNvbnN0IHBhcnNlcl8xID0gcmVxdWlyZShcIi4vcGFyc2VyXCIpO1xubGV0IGRldmljZU1hbmFnZXI7XG5sZXQgRFNNID0ge307XG5sZXQgbGlnaHQwO1xubGV0IGh1bWFuU2Vuc29yMTtcbmxldCBob3VzZWhvbGRIdW1pZGlmaWVyMjtcbndpbmRvdy5tZXRob2RzID0ge1xuICAgIG9ubG9hZFNkayhkZXZpY2VBcnIpIHtcbiAgICAgICAgZGV2aWNlTWFuYWdlciA9IG5ldyBEZXZpY2VNYW5hZ2VyKGRldmljZUFycik7XG4gICAgICAgIGxpZ2h0MCA9IGRldmljZU1hbmFnZXIuZ2V0TGlnaHQoJ0xhbXAoSG9tZSlfMCcpO1xuICAgICAgICBodW1hblNlbnNvcjEgPSBkZXZpY2VNYW5hZ2VyLmdldEh1bWFuU2Vuc29yXzEoJ0h1bWFuTW90aW9uU2Vuc29yXzEnKTtcbiAgICAgICAgaG91c2Vob2xkSHVtaWRpZmllcjIgPSBkZXZpY2VNYW5hZ2VyLmdldEhvdXNlaG9sZEh1bWlkaWZpZXIoJ0hvdXNlaG9sZEh1bWlkaWZpZXJfMicpO1xuICAgICAgICBEU00ubGlnaHQwID0ge1xuICAgICAgICAgICAgb25PZmY6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoXCJsaWdodDBcIiwgXCJvbk9mZlwiLCB2ID0+IGxpZ2h0MC5zZXRPbk9mZihwYXJzZXJfMS5kZWZhdWx0LnBhcnNlVG9SZW1vdGUodikpKSxcbiAgICAgICAgfTtcbiAgICAgICAgRFNNLmh1bWFuU2Vuc29yMSA9IHtcbiAgICAgICAgICAgIGV4aXN0U3RhdHVzOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KFwiaHVtYW5TZW5zb3IxXCIsIFwiZXhpc3RTdGF0dXNcIilcbiAgICAgICAgfTtcbiAgICAgICAgRFNNLmhvdXNlaG9sZEh1bWlkaWZpZXIyID0ge1xuICAgICAgICAgICAgb25PZmY6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoXCJob3VzZWhvbGRIdW1pZGlmaWVyMlwiLCBcIm9uT2ZmXCIsIHYgPT4gaG91c2Vob2xkSHVtaWRpZmllcjIuc2V0T25PZmYocGFyc2VyXzEuZGVmYXVsdC5wYXJzZVRvUmVtb3RlKHYpKSksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZXZpY2VzIHNkayBsb2FkZWQuXFxuJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpbml0KCkudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5pdCBTdWNjZXNzLicpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG1haW4oKS50aGVuKHIgPT4geyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUnVuIEVycm9yLicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdJbml0IEVycm9yLicpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBEU00uaHVtYW5TZW5zb3IxLmV4aXN0U3RhdHVzLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBodW1hblNlbnNvcjEuZ2V0RXhpc3RTdGF0dXMoKSkudmFsdWUsIHByb3BlcnR5XzEuRnJvbS5SZW1vdGUpO1xuICAgICAgICBEU00ubGlnaHQwLm9uT2ZmLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBsaWdodDAuZ2V0T25PZmYoKSkudmFsdWUsIHByb3BlcnR5XzEuRnJvbS5SZW1vdGUpO1xuICAgICAgICBEU00uaG91c2Vob2xkSHVtaWRpZmllcjIub25PZmYuc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGhvdXNlaG9sZEh1bWlkaWZpZXIyLmdldE9uT2ZmKCkpLnZhbHVlLCBwcm9wZXJ0eV8xLkZyb20uUmVtb3RlKTtcbiAgICAgICAgaHVtYW5TZW5zb3IxLm9uUmVjZWl2ZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuZXhpc3RTdGF0dXMgPSBwYXJzZXJfMS5kZWZhdWx0LnBhcnNlRnJvbVJlbW90ZShkYXRhLmV4aXN0U3RhdHVzKTtcbiAgICAgICAgICAgIERTTS5odW1hblNlbnNvcjEuZXhpc3RTdGF0dXMuc2V0UmVtb3RlVmFsdWUoZGF0YS5leGlzdFN0YXR1cywgcHJvcGVydHlfMS5Gcm9tLkRldmljZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsaWdodDAub25SZWNlaXZlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5vbk9mZiA9IHBhcnNlcl8xLmRlZmF1bHQucGFyc2VGcm9tUmVtb3RlKGRhdGEub25PZmYpO1xuICAgICAgICAgICAgRFNNLmxpZ2h0MC5vbk9mZi5zZXRSZW1vdGVWYWx1ZShkYXRhLm9uT2ZmLCBwcm9wZXJ0eV8xLkZyb20uRGV2aWNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGhvdXNlaG9sZEh1bWlkaWZpZXIyLm9uUmVjZWl2ZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEub25PZmYgPSBwYXJzZXJfMS5kZWZhdWx0LnBhcnNlRnJvbVJlbW90ZShkYXRhLm9uT2ZmKTtcbiAgICAgICAgICAgIERTTS5ob3VzZWhvbGRIdW1pZGlmaWVyMi5vbk9mZi5zZXRSZW1vdGVWYWx1ZShkYXRhLm9uT2ZmLCBwcm9wZXJ0eV8xLkZyb20uRGV2aWNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIERTTS5odW1hblNlbnNvcjEuZXhpc3RTdGF0dXMuYWRkTGlzdGVuZXIodmFsdWUgPT4ge1xuICAgICAgICAgICAgRFNNLmxpZ2h0MC5vbk9mZi5zZXRMb2NhbFZhbHVlKHZhbHVlLCBwcm9wZXJ0eV8xLkZyb20uTG9jYWwpO1xuICAgICAgICB9KTtcbiAgICAgICAgRFNNLmxpZ2h0MC5vbk9mZi5hZGRMaXN0ZW5lcih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBEU00uaG91c2Vob2xkSHVtaWRpZmllcjIub25PZmYuc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLkxvY2FsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIERTTS5ob3VzZWhvbGRIdW1pZGlmaWVyMi5vbk9mZi5hZGRMaXN0ZW5lcih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBEU00ubGlnaHQwLm9uT2ZmLnNldExvY2FsVmFsdWUodmFsdWUsIHByb3BlcnR5XzEuRnJvbS5Mb2NhbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBQYXJzZXIge1xuICAgIHN0YXRpYyBwYXJzZUZyb21SZW1vdGUoZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAnT0NDVVBJRUQnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICdOT19NQU4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgc3RhdGljIHBhcnNlVG9SZW1vdGUoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQYXJzZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRnJvbSA9IHZvaWQgMDtcbmNvbnN0IGNvbnN0XzEgPSByZXF1aXJlKFwiLi9jb25zdFwiKTtcbmNsYXNzIFByb3BlcnR5IHtcbiAgICBjb25zdHJ1Y3RvcihkZXZpY2UsIGtleSwgdXBkYXRlID0gbnVsbCkge1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSBjb25zdF8xLlVOS05PV047XG4gICAgICAgIHRoaXMucmVtb3RlVmFsdWUgPSBjb25zdF8xLlVOS05PV047XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlQWxsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgIH1cbiAgICBzZXRMb2NhbFZhbHVlKHZhbHVlLCBmcm9tID0gRnJvbS5Mb2NhbCkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbFZhbHVlID09PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHZhbHVlKSk7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRSZW1vdGVWYWx1ZSh2YWx1ZSwgRnJvbS5Mb2NhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFJlbW90ZVZhbHVlKHZhbHVlLCBmcm9tID0gRnJvbS5Mb2NhbCkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVWYWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMucmVtb3RlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGZyb20gPT09IEZyb20uTG9jYWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGUgcmVtb3RlOiAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSA9YCwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUgJiYgdGhpcy51cGRhdGUodmFsdWUpLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSBzdWNjZXNzOmAsIHIpO1xuICAgICAgICAgICAgfSwgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVXBkYXRlICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9IGVycm9yOmApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmcm9tID09PSBGcm9tLkRldmljZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmUgZGF0YTogJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gPWAsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgRnJvbS5SZW1vdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByb3BlcnR5O1xudmFyIEZyb207XG4oZnVuY3Rpb24gKEZyb20pIHtcbiAgICBGcm9tW0Zyb21bXCJMb2NhbFwiXSA9IDBdID0gXCJMb2NhbFwiO1xuICAgIEZyb21bRnJvbVtcIlJlbW90ZVwiXSA9IDFdID0gXCJSZW1vdGVcIjtcbiAgICBGcm9tW0Zyb21bXCJQYWdlXCJdID0gMl0gPSBcIlBhZ2VcIjtcbiAgICBGcm9tW0Zyb21bXCJEZXZpY2VcIl0gPSAzXSA9IFwiRGV2aWNlXCI7XG59KShGcm9tIHx8IChleHBvcnRzLkZyb20gPSBGcm9tID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oODQ0KTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==