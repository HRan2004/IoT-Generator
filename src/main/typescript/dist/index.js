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
let householdHumidifier2;
window.methods = {
    onloadSdk(deviceArr) {
        deviceManager = new DeviceManager(deviceArr);
        light0 = deviceManager.getLight('Lamp(Home)_0');
        householdHumidifier2 = deviceManager.getHouseholdHumidifier('HouseholdHumidifier_2');
        DSM.light0 = {
            onOff: new property_1.default('light0', 'onOff'),
        };
        DSM.householdHumidifier2 = {
            onOff: new property_1.default('householdHumidifier2', 'onOff'),
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
        DSM.light0.onOff.update = v => light0.setOnOff(parser_1.default.parseToRemote(v));
        DSM.householdHumidifier2.onOff.update = v => householdHumidifier2.setOnOff(parser_1.default.parseToRemote(v));
        DSM.light0.onOff.setRemoteValue((yield light0.getOnOff()).value);
        DSM.householdHumidifier2.onOff.setRemoteValue((yield householdHumidifier2.getOnOff()).value);
        light0.onReceive(data => {
            data.onOff = parser_1.default.parseFromRemote(data.onOff);
            DSM.light0.onOff.setRemoteValue(data.onOff);
        });
        householdHumidifier2.onReceive(data => {
            data.onOff = parser_1.default.parseFromRemote(data.onOff);
            DSM.householdHumidifier2.onOff.setRemoteValue(data.onOff);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        DSM.light0.onOff.addListener(value => {
            DSM.householdHumidifier2.onOff.setLocalValue(value, property_1.From.Local);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixlQUFlOzs7Ozs7OztBQ0hGO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsbUJBQU8sQ0FBQyxHQUFZO0FBQ3ZDLGlCQUFpQixtQkFBTyxDQUFDLEdBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7Ozs7QUNyRWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7O0FDcEJGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELFlBQVk7QUFDWixnQkFBZ0IsbUJBQU8sQ0FBQyxHQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxZQUFZLEdBQUcsVUFBVTtBQUNuRTtBQUNBLHNDQUFzQyxZQUFZLEdBQUcsVUFBVTtBQUMvRCxhQUFhO0FBQ2Isd0NBQXdDLFlBQVksR0FBRyxVQUFVO0FBQ2pFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxZQUFZLEdBQUcsVUFBVTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFdBQVcsWUFBWSxZQUFZOzs7Ozs7O1VDNURwQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnN0LnRzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9wcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5VTktOT1dOID0gdm9pZCAwO1xuZXhwb3J0cy5VTktOT1dOID0gXCJDT05TVC1VTktOT1dOXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuL3Byb3BlcnR5XCIpO1xuY29uc3QgcGFyc2VyXzEgPSByZXF1aXJlKFwiLi9wYXJzZXJcIik7XG5sZXQgZGV2aWNlTWFuYWdlcjtcbmxldCBEU00gPSB7fTtcbmxldCBsaWdodDA7XG5sZXQgaG91c2Vob2xkSHVtaWRpZmllcjI7XG53aW5kb3cubWV0aG9kcyA9IHtcbiAgICBvbmxvYWRTZGsoZGV2aWNlQXJyKSB7XG4gICAgICAgIGRldmljZU1hbmFnZXIgPSBuZXcgRGV2aWNlTWFuYWdlcihkZXZpY2VBcnIpO1xuICAgICAgICBsaWdodDAgPSBkZXZpY2VNYW5hZ2VyLmdldExpZ2h0KCdMYW1wKEhvbWUpXzAnKTtcbiAgICAgICAgaG91c2Vob2xkSHVtaWRpZmllcjIgPSBkZXZpY2VNYW5hZ2VyLmdldEhvdXNlaG9sZEh1bWlkaWZpZXIoJ0hvdXNlaG9sZEh1bWlkaWZpZXJfMicpO1xuICAgICAgICBEU00ubGlnaHQwID0ge1xuICAgICAgICAgICAgb25PZmY6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2xpZ2h0MCcsICdvbk9mZicpLFxuICAgICAgICB9O1xuICAgICAgICBEU00uaG91c2Vob2xkSHVtaWRpZmllcjIgPSB7XG4gICAgICAgICAgICBvbk9mZjogbmV3IHByb3BlcnR5XzEuZGVmYXVsdCgnaG91c2Vob2xkSHVtaWRpZmllcjInLCAnb25PZmYnKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZSBzZGtzIGxvYWRlZC5cXG4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGluaXQoKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0IFN1Y2Nlc3MuJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbigpLnRoZW4ociA9PiB7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSdW4gRXJyb3IuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luaXQgRXJyb3IuJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIERTTS5saWdodDAub25PZmYudXBkYXRlID0gdiA9PiBsaWdodDAuc2V0T25PZmYocGFyc2VyXzEuZGVmYXVsdC5wYXJzZVRvUmVtb3RlKHYpKTtcbiAgICAgICAgRFNNLmhvdXNlaG9sZEh1bWlkaWZpZXIyLm9uT2ZmLnVwZGF0ZSA9IHYgPT4gaG91c2Vob2xkSHVtaWRpZmllcjIuc2V0T25PZmYocGFyc2VyXzEuZGVmYXVsdC5wYXJzZVRvUmVtb3RlKHYpKTtcbiAgICAgICAgRFNNLmxpZ2h0MC5vbk9mZi5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgbGlnaHQwLmdldE9uT2ZmKCkpLnZhbHVlKTtcbiAgICAgICAgRFNNLmhvdXNlaG9sZEh1bWlkaWZpZXIyLm9uT2ZmLnNldFJlbW90ZVZhbHVlKCh5aWVsZCBob3VzZWhvbGRIdW1pZGlmaWVyMi5nZXRPbk9mZigpKS52YWx1ZSk7XG4gICAgICAgIGxpZ2h0MC5vblJlY2VpdmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLm9uT2ZmID0gcGFyc2VyXzEuZGVmYXVsdC5wYXJzZUZyb21SZW1vdGUoZGF0YS5vbk9mZik7XG4gICAgICAgICAgICBEU00ubGlnaHQwLm9uT2ZmLnNldFJlbW90ZVZhbHVlKGRhdGEub25PZmYpO1xuICAgICAgICB9KTtcbiAgICAgICAgaG91c2Vob2xkSHVtaWRpZmllcjIub25SZWNlaXZlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5vbk9mZiA9IHBhcnNlcl8xLmRlZmF1bHQucGFyc2VGcm9tUmVtb3RlKGRhdGEub25PZmYpO1xuICAgICAgICAgICAgRFNNLmhvdXNlaG9sZEh1bWlkaWZpZXIyLm9uT2ZmLnNldFJlbW90ZVZhbHVlKGRhdGEub25PZmYpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgRFNNLmxpZ2h0MC5vbk9mZi5hZGRMaXN0ZW5lcih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBEU00uaG91c2Vob2xkSHVtaWRpZmllcjIub25PZmYuc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLkxvY2FsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFBhcnNlciB7XG4gICAgc3RhdGljIHBhcnNlRnJvbVJlbW90ZShkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChkYXRhLnRvTG93ZXJDYXNlKCkgPT09ICdmYWxzZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICdPQ0NVUElFRCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gJ05PX01BTicpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBzdGF0aWMgcGFyc2VUb1JlbW90ZShkYXRhKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBhcnNlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Gcm9tID0gdm9pZCAwO1xuY29uc3QgY29uc3RfMSA9IHJlcXVpcmUoXCIuL2NvbnN0XCIpO1xuY2xhc3MgUHJvcGVydHkge1xuICAgIGNvbnN0cnVjdG9yKGRldmljZSwga2V5LCB1cGRhdGUgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IGNvbnN0XzEuVU5LTk9XTjtcbiAgICAgICAgdGhpcy5yZW1vdGVWYWx1ZSA9IGNvbnN0XzEuVU5LTk9XTjtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBkZXZpY2U7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcbiAgICB9XG4gICAgYWRkTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGlzdGVuZXIpO1xuICAgIH1cbiAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gICAgfVxuICAgIHNldExvY2FsVmFsdWUodmFsdWUsIGZyb20gPSBGcm9tLkxvY2FsKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2FsVmFsdWUgPT09IHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLmxvY2FsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChsID0+IGwodmFsdWUpKTtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlbW90ZVZhbHVlKHZhbHVlLCBGcm9tLkxvY2FsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc2V0UmVtb3RlVmFsdWUodmFsdWUsIGZyb20gPSBGcm9tLkRldmljZSkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVWYWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMucmVtb3RlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGZyb20gPT09IEZyb20uTG9jYWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGUgcmVtb3RlOiAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSA9YCwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUgJiYgdGhpcy51cGRhdGUodmFsdWUpLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSBzdWNjZXNzOmAsIHIpO1xuICAgICAgICAgICAgfSwgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVXBkYXRlICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9IGVycm9yOmApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmcm9tID09PSBGcm9tLkRldmljZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmUgZGF0YTogJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gPWAsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgRnJvbS5SZW1vdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFByb3BlcnR5O1xudmFyIEZyb207XG4oZnVuY3Rpb24gKEZyb20pIHtcbiAgICBGcm9tW0Zyb21bXCJMb2NhbFwiXSA9IDBdID0gXCJMb2NhbFwiO1xuICAgIEZyb21bRnJvbVtcIlJlbW90ZVwiXSA9IDFdID0gXCJSZW1vdGVcIjtcbiAgICBGcm9tW0Zyb21bXCJQYWdlXCJdID0gMl0gPSBcIlBhZ2VcIjtcbiAgICBGcm9tW0Zyb21bXCJEZXZpY2VcIl0gPSAzXSA9IFwiRGV2aWNlXCI7XG59KShGcm9tIHx8IChleHBvcnRzLkZyb20gPSBGcm9tID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oODQ0KTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==