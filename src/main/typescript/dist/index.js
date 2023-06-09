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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixlQUFlOzs7Ozs7OztBQ0hGO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsbUJBQU8sQ0FBQyxHQUFZO0FBQ3ZDLGlCQUFpQixtQkFBTyxDQUFDLEdBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOzs7Ozs7OztBQ2hGYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7QUNwQkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsWUFBWTtBQUNaLGdCQUFnQixtQkFBTyxDQUFDLEdBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFlBQVksR0FBRyxVQUFVO0FBQ25FO0FBQ0Esc0NBQXNDLFlBQVksR0FBRyxVQUFVO0FBQy9ELGFBQWE7QUFDYix3Q0FBd0MsWUFBWSxHQUFHLFVBQVU7QUFDakU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHlDQUF5QyxZQUFZLEdBQUcsVUFBVTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFdBQVcsWUFBWSxZQUFZOzs7Ozs7O1VDM0RwQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnN0LnRzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9wcm9wZXJ0eS50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5VTktOT1dOID0gdm9pZCAwO1xuZXhwb3J0cy5VTktOT1dOID0gXCJDT05TVC1VTktOT1dOXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuL3Byb3BlcnR5XCIpO1xuY29uc3QgcGFyc2VyXzEgPSByZXF1aXJlKFwiLi9wYXJzZXJcIik7XG5sZXQgZGV2aWNlTWFuYWdlcjtcbmxldCBEU00gPSB7fTtcbmxldCBsaWdodDA7XG5sZXQgaHVtYW5TZW5zb3IxO1xubGV0IGhvdXNlaG9sZEh1bWlkaWZpZXIyO1xud2luZG93Lm1ldGhvZHMgPSB7XG4gICAgb25sb2FkU2RrKGRldmljZUFycikge1xuICAgICAgICBkZXZpY2VNYW5hZ2VyID0gbmV3IERldmljZU1hbmFnZXIoZGV2aWNlQXJyKTtcbiAgICAgICAgbGlnaHQwID0gZGV2aWNlTWFuYWdlci5nZXRMaWdodCgnTGFtcChIb21lKV8wJyk7XG4gICAgICAgIGh1bWFuU2Vuc29yMSA9IGRldmljZU1hbmFnZXIuZ2V0SHVtYW5TZW5zb3JfMSgnSHVtYW5Nb3Rpb25TZW5zb3JfMScpO1xuICAgICAgICBob3VzZWhvbGRIdW1pZGlmaWVyMiA9IGRldmljZU1hbmFnZXIuZ2V0SG91c2Vob2xkSHVtaWRpZmllcignSG91c2Vob2xkSHVtaWRpZmllcl8yJyk7XG4gICAgICAgIERTTS5saWdodDAgPSB7XG4gICAgICAgICAgICBvbk9mZjogbmV3IHByb3BlcnR5XzEuZGVmYXVsdChcImxpZ2h0MFwiLCBcIm9uT2ZmXCIsIHYgPT4gbGlnaHQwLnNldE9uT2ZmKHBhcnNlcl8xLmRlZmF1bHQucGFyc2VUb1JlbW90ZSh2KSkpLFxuICAgICAgICB9O1xuICAgICAgICBEU00uaHVtYW5TZW5zb3IxID0ge1xuICAgICAgICAgICAgZXhpc3RTdGF0dXM6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoXCJodW1hblNlbnNvcjFcIiwgXCJleGlzdFN0YXR1c1wiKVxuICAgICAgICB9O1xuICAgICAgICBEU00uaG91c2Vob2xkSHVtaWRpZmllcjIgPSB7XG4gICAgICAgICAgICBvbk9mZjogbmV3IHByb3BlcnR5XzEuZGVmYXVsdChcImhvdXNlaG9sZEh1bWlkaWZpZXIyXCIsIFwib25PZmZcIiwgdiA9PiBob3VzZWhvbGRIdW1pZGlmaWVyMi5zZXRPbk9mZihwYXJzZXJfMS5kZWZhdWx0LnBhcnNlVG9SZW1vdGUodikpKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RldmljZXMgc2RrIGxvYWRlZC5cXG4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGluaXQoKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0IFN1Y2Nlc3MuJyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgbWFpbigpLnRoZW4ociA9PiB7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSdW4gRXJyb3IuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luaXQgRXJyb3IuJyk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIERTTS5odW1hblNlbnNvcjEuZXhpc3RTdGF0dXMuc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGh1bWFuU2Vuc29yMS5nZXRFeGlzdFN0YXR1cygpKS52YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLlJlbW90ZSk7XG4gICAgICAgIERTTS5saWdodDAub25PZmYuc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGxpZ2h0MC5nZXRPbk9mZigpKS52YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLlJlbW90ZSk7XG4gICAgICAgIERTTS5ob3VzZWhvbGRIdW1pZGlmaWVyMi5vbk9mZi5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgaG91c2Vob2xkSHVtaWRpZmllcjIuZ2V0T25PZmYoKSkudmFsdWUsIHByb3BlcnR5XzEuRnJvbS5SZW1vdGUpO1xuICAgICAgICBodW1hblNlbnNvcjEub25SZWNlaXZlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5leGlzdFN0YXR1cyA9IHBhcnNlcl8xLmRlZmF1bHQucGFyc2VGcm9tUmVtb3RlKGRhdGEuZXhpc3RTdGF0dXMpO1xuICAgICAgICAgICAgRFNNLmh1bWFuU2Vuc29yMS5leGlzdFN0YXR1cy5zZXRSZW1vdGVWYWx1ZShkYXRhLmV4aXN0U3RhdHVzLCBwcm9wZXJ0eV8xLkZyb20uRGV2aWNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxpZ2h0MC5vblJlY2VpdmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLm9uT2ZmID0gcGFyc2VyXzEuZGVmYXVsdC5wYXJzZUZyb21SZW1vdGUoZGF0YS5vbk9mZik7XG4gICAgICAgICAgICBEU00ubGlnaHQwLm9uT2ZmLnNldFJlbW90ZVZhbHVlKGRhdGEub25PZmYsIHByb3BlcnR5XzEuRnJvbS5EZXZpY2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgaG91c2Vob2xkSHVtaWRpZmllcjIub25SZWNlaXZlKGRhdGEgPT4ge1xuICAgICAgICAgICAgZGF0YS5vbk9mZiA9IHBhcnNlcl8xLmRlZmF1bHQucGFyc2VGcm9tUmVtb3RlKGRhdGEub25PZmYpO1xuICAgICAgICAgICAgRFNNLmhvdXNlaG9sZEh1bWlkaWZpZXIyLm9uT2ZmLnNldFJlbW90ZVZhbHVlKGRhdGEub25PZmYsIHByb3BlcnR5XzEuRnJvbS5EZXZpY2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgRFNNLmh1bWFuU2Vuc29yMS5leGlzdFN0YXR1cy5hZGRMaXN0ZW5lcih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBEU00ubGlnaHQwLm9uT2ZmLnNldExvY2FsVmFsdWUodmFsdWUsIHByb3BlcnR5XzEuRnJvbS5Mb2NhbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBEU00ubGlnaHQwLm9uT2ZmLmFkZExpc3RlbmVyKHZhbHVlID0+IHtcbiAgICAgICAgICAgIERTTS5ob3VzZWhvbGRIdW1pZGlmaWVyMi5vbk9mZi5zZXRMb2NhbFZhbHVlKHZhbHVlLCBwcm9wZXJ0eV8xLkZyb20uTG9jYWwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgUGFyc2VyIHtcbiAgICBzdGF0aWMgcGFyc2VGcm9tUmVtb3RlKGRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGRhdGEudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEudG9Mb3dlckNhc2UoKSA9PT0gJ2ZhbHNlJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gJ09DQ1VQSUVEJylcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAnTk9fTUFOJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHN0YXRpYyBwYXJzZVRvUmVtb3RlKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUGFyc2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkZyb20gPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4vY29uc3RcIik7XG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3IoZGV2aWNlLCBrZXksIHVwZGF0ZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZUFsbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB9XG4gICAgc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uTG9jYWwpIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxWYWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbCh2YWx1ZSkpO1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVtb3RlVmFsdWUodmFsdWUsIEZyb20uTG9jYWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRSZW1vdGVWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uTG9jYWwpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3RlVmFsdWUgPT09IHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmIChmcm9tID09PSBGcm9tLkxvY2FsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlIHJlbW90ZTogJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gPWAsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlICYmIHRoaXMudXBkYXRlKHZhbHVlKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGUgJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gc3VjY2VzczpgLCByKTtcbiAgICAgICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVwZGF0ZSAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSBlcnJvcjpgKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZnJvbSA9PT0gRnJvbS5EZXZpY2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlIGRhdGE6ICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9ID1gLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldExvY2FsVmFsdWUodmFsdWUsIEZyb20uUmVtb3RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQcm9wZXJ0eTtcbnZhciBGcm9tO1xuKGZ1bmN0aW9uIChGcm9tKSB7XG4gICAgRnJvbVtGcm9tW1wiTG9jYWxcIl0gPSAwXSA9IFwiTG9jYWxcIjtcbiAgICBGcm9tW0Zyb21bXCJSZW1vdGVcIl0gPSAxXSA9IFwiUmVtb3RlXCI7XG4gICAgRnJvbVtGcm9tW1wiUGFnZVwiXSA9IDJdID0gXCJQYWdlXCI7XG4gICAgRnJvbVtGcm9tW1wiRGV2aWNlXCJdID0gM10gPSBcIkRldmljZVwiO1xufSkoRnJvbSB8fCAoZXhwb3J0cy5Gcm9tID0gRnJvbSA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg0NCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=