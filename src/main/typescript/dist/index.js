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
let doorWindowSensor0;
let light1;
window.methods = {
    onloadSdk(deviceArr) {
        deviceManager = new DeviceManager(deviceArr);
        doorWindowSensor0 = deviceManager.getDoorWindowSensor('DoorAndWindowSensor_0');
        light1 = deviceManager.getLight('Lamp(Home)_1');
        DSM.doorWindowSensor0 = {
            status: new property_1.default('doorWindowSensor0', 'status'),
        };
        DSM.light1 = {
            onOff: new property_1.default('light1', 'onOff'),
        };
        console.log('Device sdks loaded.\n');
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
        DSM.light1.onOff.update = v => light1.setOnOff(parser_1.default.parseToRemote(v));
        DSM.doorWindowSensor0.status.setRemoteValue((yield doorWindowSensor0.getStatus()).value);
        DSM.light1.onOff.setRemoteValue((yield light1.getOnOff()).value);
        doorWindowSensor0.onReceive(data => {
            data.status = parser_1.default.parseFromRemote(data.status);
            DSM.doorWindowSensor0.status.setRemoteValue(data.status);
        });
        light1.onReceive(data => {
            data.onOff = parser_1.default.parseFromRemote(data.onOff);
            DSM.light1.onOff.setRemoteValue(data.onOff);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        DSM.doorWindowSensor0.status.addListener(value => {
            DSM.light1.onOff.setLocalValue(value, property_1.From.Local);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixlQUFlOzs7Ozs7OztBQ0hGO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsbUJBQU8sQ0FBQyxHQUFZO0FBQ3ZDLGlCQUFpQixtQkFBTyxDQUFDLEdBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7Ozs7Ozs7O0FDcEVhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7OztBQ3BCRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1osZ0JBQWdCLG1CQUFPLENBQUMsR0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsWUFBWSxHQUFHLFVBQVU7QUFDbkU7QUFDQSxzQ0FBc0MsWUFBWSxHQUFHLFVBQVU7QUFDL0QsYUFBYTtBQUNiLHdDQUF3QyxZQUFZLEdBQUcsVUFBVTtBQUNqRTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsWUFBWSxHQUFHLFVBQVU7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxXQUFXLFlBQVksWUFBWTs7Ozs7OztVQzVEcEM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9jb25zdC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3BhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVU5LTk9XTiA9IHZvaWQgMDtcbmV4cG9ydHMuVU5LTk9XTiA9IFwiQ09OU1QtVU5LTk9XTlwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9wcm9wZXJ0eVwiKTtcbmNvbnN0IHBhcnNlcl8xID0gcmVxdWlyZShcIi4vcGFyc2VyXCIpO1xubGV0IGRldmljZU1hbmFnZXI7XG5sZXQgRFNNID0ge307XG5sZXQgZG9vcldpbmRvd1NlbnNvcjA7XG5sZXQgbGlnaHQxO1xud2luZG93Lm1ldGhvZHMgPSB7XG4gICAgb25sb2FkU2RrKGRldmljZUFycikge1xuICAgICAgICBkZXZpY2VNYW5hZ2VyID0gbmV3IERldmljZU1hbmFnZXIoZGV2aWNlQXJyKTtcbiAgICAgICAgZG9vcldpbmRvd1NlbnNvcjAgPSBkZXZpY2VNYW5hZ2VyLmdldERvb3JXaW5kb3dTZW5zb3IoJ0Rvb3JBbmRXaW5kb3dTZW5zb3JfMCcpO1xuICAgICAgICBsaWdodDEgPSBkZXZpY2VNYW5hZ2VyLmdldExpZ2h0KCdMYW1wKEhvbWUpXzEnKTtcbiAgICAgICAgRFNNLmRvb3JXaW5kb3dTZW5zb3IwID0ge1xuICAgICAgICAgICAgc3RhdHVzOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KCdkb29yV2luZG93U2Vuc29yMCcsICdzdGF0dXMnKSxcbiAgICAgICAgfTtcbiAgICAgICAgRFNNLmxpZ2h0MSA9IHtcbiAgICAgICAgICAgIG9uT2ZmOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KCdsaWdodDEnLCAnb25PZmYnKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBzZGtzIGxvYWRlZC5cXG4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGluaXQoKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0IFN1Y2Nlc3MuJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbigpLnRoZW4ociA9PiB7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSdW4gRXJyb3IuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luaXQgRXJyb3IuJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIERTTS5saWdodDEub25PZmYudXBkYXRlID0gdiA9PiBsaWdodDEuc2V0T25PZmYocGFyc2VyXzEuZGVmYXVsdC5wYXJzZVRvUmVtb3RlKHYpKTtcbiAgICAgICAgRFNNLmRvb3JXaW5kb3dTZW5zb3IwLnN0YXR1cy5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgZG9vcldpbmRvd1NlbnNvcjAuZ2V0U3RhdHVzKCkpLnZhbHVlKTtcbiAgICAgICAgRFNNLmxpZ2h0MS5vbk9mZi5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgbGlnaHQxLmdldE9uT2ZmKCkpLnZhbHVlKTtcbiAgICAgICAgZG9vcldpbmRvd1NlbnNvcjAub25SZWNlaXZlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5zdGF0dXMgPSBwYXJzZXJfMS5kZWZhdWx0LnBhcnNlRnJvbVJlbW90ZShkYXRhLnN0YXR1cyk7XG4gICAgICAgICAgICBEU00uZG9vcldpbmRvd1NlbnNvcjAuc3RhdHVzLnNldFJlbW90ZVZhbHVlKGRhdGEuc3RhdHVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxpZ2h0MS5vblJlY2VpdmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLm9uT2ZmID0gcGFyc2VyXzEuZGVmYXVsdC5wYXJzZUZyb21SZW1vdGUoZGF0YS5vbk9mZik7XG4gICAgICAgICAgICBEU00ubGlnaHQxLm9uT2ZmLnNldFJlbW90ZVZhbHVlKGRhdGEub25PZmYpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgRFNNLmRvb3JXaW5kb3dTZW5zb3IwLnN0YXR1cy5hZGRMaXN0ZW5lcih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBEU00ubGlnaHQxLm9uT2ZmLnNldExvY2FsVmFsdWUodmFsdWUsIHByb3BlcnR5XzEuRnJvbS5Mb2NhbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBQYXJzZXIge1xuICAgIHN0YXRpYyBwYXJzZUZyb21SZW1vdGUoZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAnT0NDVVBJRUQnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICdOT19NQU4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgc3RhdGljIHBhcnNlVG9SZW1vdGUoZGF0YSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQYXJzZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRnJvbSA9IHZvaWQgMDtcbmNvbnN0IGNvbnN0XzEgPSByZXF1aXJlKFwiLi9jb25zdFwiKTtcbmNsYXNzIFByb3BlcnR5IHtcbiAgICBjb25zdHJ1Y3RvcihkZXZpY2UsIGtleSwgdXBkYXRlID0gbnVsbCkge1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSBjb25zdF8xLlVOS05PV047XG4gICAgICAgIHRoaXMucmVtb3RlVmFsdWUgPSBjb25zdF8xLlVOS05PV047XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XG4gICAgfVxuICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlQWxsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgIH1cbiAgICBzZXRMb2NhbFZhbHVlKHZhbHVlLCBmcm9tID0gRnJvbS5Mb2NhbCkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbFZhbHVlID09PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHZhbHVlKSk7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRSZW1vdGVWYWx1ZSh2YWx1ZSwgRnJvbS5Mb2NhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHNldFJlbW90ZVZhbHVlKHZhbHVlLCBmcm9tID0gRnJvbS5EZXZpY2UpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlVmFsdWUgPT09IHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmIChmcm9tID09PSBGcm9tLkxvY2FsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlIHJlbW90ZTogJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gPWAsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlICYmIHRoaXMudXBkYXRlKHZhbHVlKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGUgJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gc3VjY2VzczpgLCByKTtcbiAgICAgICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVwZGF0ZSAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSBlcnJvcjpgKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZnJvbSA9PT0gRnJvbS5EZXZpY2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlIGRhdGE6ICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9ID1gLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldExvY2FsVmFsdWUodmFsdWUsIEZyb20uUmVtb3RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcm9wZXJ0eTtcbnZhciBGcm9tO1xuKGZ1bmN0aW9uIChGcm9tKSB7XG4gICAgRnJvbVtGcm9tW1wiTG9jYWxcIl0gPSAwXSA9IFwiTG9jYWxcIjtcbiAgICBGcm9tW0Zyb21bXCJSZW1vdGVcIl0gPSAxXSA9IFwiUmVtb3RlXCI7XG4gICAgRnJvbVtGcm9tW1wiUGFnZVwiXSA9IDJdID0gXCJQYWdlXCI7XG4gICAgRnJvbVtGcm9tW1wiRGV2aWNlXCJdID0gM10gPSBcIkRldmljZVwiO1xufSkoRnJvbSB8fCAoZXhwb3J0cy5Gcm9tID0gRnJvbSA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg0NCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=