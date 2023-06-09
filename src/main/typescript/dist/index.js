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
            onOff: new property_1.default("light0", "onOff", light0.setOnOff),
        };
        DSM.humanSensor1 = {
            existStatus: new property_1.default("humanSensor1", "existStatus")
        };
        DSM.householdHumidifier2 = {
            onOff: new property_1.default("householdHumidifier2", "onOff", householdHumidifier2.setOnOff),
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
            DSM.humanSensor1.existStatus.setRemoteValue(data.existStatus, property_1.From.Device);
        });
        light0.onReceive(data => {
            DSM.light0.onOff.setRemoteValue(data.onOff, property_1.From.Device);
        });
        householdHumidifier2.onReceive(data => {
            console.log('flag1', data);
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
    });
}


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
            console.log(`Update remote: ${this.device}.${this.key} = ${value}`);
            this.update && this.update(value).then(r => {
                console.log(`Update ${this.device}.${this.key} result:`, r);
            });
        }
        else if (from === From.Device) {
            console.log(`Receive data: ${this.device}.${this.key} = ${value}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixlQUFlOzs7Ozs7OztBQ0hGO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsbUJBQU8sQ0FBQyxHQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOzs7Ozs7OztBQzdFYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1osZ0JBQWdCLG1CQUFPLENBQUMsR0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsWUFBWSxHQUFHLFVBQVUsSUFBSSxNQUFNO0FBQzdFO0FBQ0Esc0NBQXNDLFlBQVksR0FBRyxVQUFVO0FBQy9ELGFBQWE7QUFDYjtBQUNBO0FBQ0EseUNBQXlDLFlBQVksR0FBRyxVQUFVLElBQUksTUFBTTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFdBQVcsWUFBWSxZQUFZOzs7Ozs7O1VDeERwQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnN0LnRzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVU5LTk9XTiA9IHZvaWQgMDtcbmV4cG9ydHMuVU5LTk9XTiA9IFwiQ09OU1QtVU5LTk9XTlwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9wcm9wZXJ0eVwiKTtcbmxldCBkZXZpY2VNYW5hZ2VyO1xubGV0IERTTSA9IHt9O1xubGV0IGxpZ2h0MDtcbmxldCBodW1hblNlbnNvcjE7XG5sZXQgaG91c2Vob2xkSHVtaWRpZmllcjI7XG53aW5kb3cubWV0aG9kcyA9IHtcbiAgICBvbmxvYWRTZGsoZGV2aWNlQXJyKSB7XG4gICAgICAgIGRldmljZU1hbmFnZXIgPSBuZXcgRGV2aWNlTWFuYWdlcihkZXZpY2VBcnIpO1xuICAgICAgICBsaWdodDAgPSBkZXZpY2VNYW5hZ2VyLmdldExpZ2h0KCdMYW1wKEhvbWUpXzAnKTtcbiAgICAgICAgaHVtYW5TZW5zb3IxID0gZGV2aWNlTWFuYWdlci5nZXRIdW1hblNlbnNvcl8xKCdIdW1hbk1vdGlvblNlbnNvcl8xJyk7XG4gICAgICAgIGhvdXNlaG9sZEh1bWlkaWZpZXIyID0gZGV2aWNlTWFuYWdlci5nZXRIb3VzZWhvbGRIdW1pZGlmaWVyKCdIb3VzZWhvbGRIdW1pZGlmaWVyXzInKTtcbiAgICAgICAgRFNNLmxpZ2h0MCA9IHtcbiAgICAgICAgICAgIG9uT2ZmOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KFwibGlnaHQwXCIsIFwib25PZmZcIiwgbGlnaHQwLnNldE9uT2ZmKSxcbiAgICAgICAgfTtcbiAgICAgICAgRFNNLmh1bWFuU2Vuc29yMSA9IHtcbiAgICAgICAgICAgIGV4aXN0U3RhdHVzOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KFwiaHVtYW5TZW5zb3IxXCIsIFwiZXhpc3RTdGF0dXNcIilcbiAgICAgICAgfTtcbiAgICAgICAgRFNNLmhvdXNlaG9sZEh1bWlkaWZpZXIyID0ge1xuICAgICAgICAgICAgb25PZmY6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoXCJob3VzZWhvbGRIdW1pZGlmaWVyMlwiLCBcIm9uT2ZmXCIsIGhvdXNlaG9sZEh1bWlkaWZpZXIyLnNldE9uT2ZmKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZXMgc2RrIGxvYWRlZC5cXG4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGluaXQoKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0IFN1Y2Nlc3MuJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbigpLnRoZW4ociA9PiB7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSdW4gRXJyb3IuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luaXQgRXJyb3IuJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIERTTS5odW1hblNlbnNvcjEuZXhpc3RTdGF0dXMuc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGh1bWFuU2Vuc29yMS5nZXRFeGlzdFN0YXR1cygpKS52YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLlJlbW90ZSk7XG4gICAgICAgIERTTS5saWdodDAub25PZmYuc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGxpZ2h0MC5nZXRPbk9mZigpKS52YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLlJlbW90ZSk7XG4gICAgICAgIERTTS5ob3VzZWhvbGRIdW1pZGlmaWVyMi5vbk9mZi5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgaG91c2Vob2xkSHVtaWRpZmllcjIuZ2V0T25PZmYoKSkudmFsdWUsIHByb3BlcnR5XzEuRnJvbS5SZW1vdGUpO1xuICAgICAgICBodW1hblNlbnNvcjEub25SZWNlaXZlKGRhdGEgPT4ge1xuICAgICAgICAgICAgRFNNLmh1bWFuU2Vuc29yMS5leGlzdFN0YXR1cy5zZXRSZW1vdGVWYWx1ZShkYXRhLmV4aXN0U3RhdHVzLCBwcm9wZXJ0eV8xLkZyb20uRGV2aWNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxpZ2h0MC5vblJlY2VpdmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBEU00ubGlnaHQwLm9uT2ZmLnNldFJlbW90ZVZhbHVlKGRhdGEub25PZmYsIHByb3BlcnR5XzEuRnJvbS5EZXZpY2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgaG91c2Vob2xkSHVtaWRpZmllcjIub25SZWNlaXZlKGRhdGEgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZsYWcxJywgZGF0YSk7XG4gICAgICAgICAgICBEU00uaG91c2Vob2xkSHVtaWRpZmllcjIub25PZmYuc2V0UmVtb3RlVmFsdWUoZGF0YS5vbk9mZiwgcHJvcGVydHlfMS5Gcm9tLkRldmljZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBEU00uaHVtYW5TZW5zb3IxLmV4aXN0U3RhdHVzLmFkZExpc3RlbmVyKHZhbHVlID0+IHtcbiAgICAgICAgICAgIERTTS5saWdodDAub25PZmYuc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLkxvY2FsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIERTTS5saWdodDAub25PZmYuYWRkTGlzdGVuZXIodmFsdWUgPT4ge1xuICAgICAgICAgICAgRFNNLmhvdXNlaG9sZEh1bWlkaWZpZXIyLm9uT2ZmLnNldExvY2FsVmFsdWUodmFsdWUsIHByb3BlcnR5XzEuRnJvbS5Mb2NhbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkZyb20gPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4vY29uc3RcIik7XG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3IoZGV2aWNlLCBrZXksIHVwZGF0ZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZUFsbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB9XG4gICAgc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uTG9jYWwpIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxWYWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbCh2YWx1ZSkpO1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVtb3RlVmFsdWUodmFsdWUsIEZyb20uTG9jYWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRSZW1vdGVWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uTG9jYWwpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlVmFsdWUgPT09IHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmIChmcm9tID09PSBGcm9tLkxvY2FsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlIHJlbW90ZTogJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gPSAke3ZhbHVlfWApO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUgJiYgdGhpcy51cGRhdGUodmFsdWUpLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSByZXN1bHQ6YCwgcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmcm9tID09PSBGcm9tLkRldmljZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmUgZGF0YTogJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gPSAke3ZhbHVlfWApO1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFZhbHVlKHZhbHVlLCBGcm9tLlJlbW90ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUHJvcGVydHk7XG52YXIgRnJvbTtcbihmdW5jdGlvbiAoRnJvbSkge1xuICAgIEZyb21bRnJvbVtcIkxvY2FsXCJdID0gMF0gPSBcIkxvY2FsXCI7XG4gICAgRnJvbVtGcm9tW1wiUmVtb3RlXCJdID0gMV0gPSBcIlJlbW90ZVwiO1xuICAgIEZyb21bRnJvbVtcIlBhZ2VcIl0gPSAyXSA9IFwiUGFnZVwiO1xuICAgIEZyb21bRnJvbVtcIkRldmljZVwiXSA9IDNdID0gXCJEZXZpY2VcIjtcbn0pKEZyb20gfHwgKGV4cG9ydHMuRnJvbSA9IEZyb20gPSB7fSkpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4NDQpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9