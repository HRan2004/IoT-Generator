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
let DSM = {};
const light0 = DeviceManager.createLight('Lamp(Home)_0');
const homeHumidifier2 = DeviceManager.createHomeHumidifier('HouseholdHumidifier_2');
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
        DSM.light0 = {
            switch: new property_1.default('light0', 'switch'),
        };
        DSM.homeHumidifier2 = {
            switch: new property_1.default('homeHumidifier2', 'switch'),
        };
        DSM.light0.switch.update = v => light0.setSwitch(normal_parser_1.default.to(v));
        DSM.homeHumidifier2.switch.update = v => homeHumidifier2.setSwitch(normal_parser_1.default.to(v));
        DSM.light0.switch.setRemoteValue((yield light0.getSwitch()).value);
        DSM.homeHumidifier2.switch.setRemoteValue((yield homeHumidifier2.getSwitch()).value);
        light0.subscribe(data => {
            data.switch = normal_parser_1.default.from(data.switch);
            DSM.light0.switch.setRemoteValue(data.switch);
        });
        homeHumidifier2.subscribe(data => {
            data.switch = normal_parser_1.default.from(data.switch);
            DSM.homeHumidifier2.switch.setRemoteValue(data.switch);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        DSM.light0.switch.addListener(value => {
            value = new dp_parser_1.default(DSM.light0.switch, DSM.homeHumidifier2.switch).parse(value);
            DSM.homeHumidifier2.switch.setLocalValue(value, property_1.From.Local);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZixlQUFlOzs7Ozs7OztBQ0hGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7QUNWRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7QUNwQkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsWUFBWTtBQUNaLGdCQUFnQixtQkFBTyxDQUFDLEdBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFlBQVksR0FBRyxVQUFVO0FBQ25FO0FBQ0Esc0NBQXNDLFlBQVksR0FBRyxVQUFVO0FBQy9ELGFBQWE7QUFDYix3Q0FBd0MsWUFBWSxHQUFHLFVBQVU7QUFDakU7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFlBQVksR0FBRyxVQUFVO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsV0FBVyxZQUFZLFlBQVk7Ozs7Ozs7O0FDNUR2QjtBQUNiO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CLG1CQUFPLENBQUMsR0FBaUI7QUFDNUMsd0JBQXdCLG1CQUFPLENBQUMsR0FBNkI7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsR0FBeUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOzs7Ozs7O1VDMURBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9jb25zdC50cyIsIndlYnBhY2s6Ly8vLi9hcHAvY29yZS9wYXJzZXIvZHAtcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3BhcnNlci9ub3JtYWwtcGFyc2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9jb3JlL3Byb3BlcnR5LnRzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5VTktOT1dOID0gdm9pZCAwO1xuZXhwb3J0cy5VTktOT1dOID0gXCJDT05TVC1VTktOT1dOXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIERwUGFyc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihmcm9tLCB0bykge1xuICAgICAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgICAgICB0aGlzLnRvID0gdG87XG4gICAgfVxuICAgIHBhcnNlKHZhbHVlKSB7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRHBQYXJzZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE5vcm1hbFBhcnNlciB7XG4gICAgc3RhdGljIGZyb20oZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBpZiAoZGF0YS50b0xvd2VyQ2FzZSgpID09PSAnZmFsc2UnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSAnT0NDVVBJRUQnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09ICdOT19NQU4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgc3RhdGljIHRvKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTm9ybWFsUGFyc2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkZyb20gPSB2b2lkIDA7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4vY29uc3RcIik7XG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3IoZGV2aWNlLCBrZXksIHVwZGF0ZSA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5sb2NhbFZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLnJlbW90ZVZhbHVlID0gY29uc3RfMS5VTktOT1dOO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lcik7XG4gICAgfVxuICAgIHJlbW92ZUFsbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB9XG4gICAgc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uTG9jYWwpIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxWYWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMubG9jYWxWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbCh2YWx1ZSkpO1xuICAgICAgICBpZiAodGhpcy5yZW1vdGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVtb3RlVmFsdWUodmFsdWUsIEZyb20uTG9jYWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRSZW1vdGVWYWx1ZSh2YWx1ZSwgZnJvbSA9IEZyb20uRGV2aWNlKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW90ZVZhbHVlID09PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5yZW1vdGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoZnJvbSA9PT0gRnJvbS5Mb2NhbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSByZW1vdGU6ICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9ID1gLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSAmJiB0aGlzLnVwZGF0ZSh2YWx1ZSkudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlICR7dGhpcy5kZXZpY2V9LiR7dGhpcy5rZXl9IHN1Y2Nlc3M6YCwgcik7XG4gICAgICAgICAgICB9LCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVcGRhdGUgJHt0aGlzLmRldmljZX0uJHt0aGlzLmtleX0gZXJyb3I6YCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZyb20gPT09IEZyb20uRGV2aWNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZSBkYXRhOiAke3RoaXMuZGV2aWNlfS4ke3RoaXMua2V5fSA9YCwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFZhbHVlKHZhbHVlLCBGcm9tLlJlbW90ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUHJvcGVydHk7XG52YXIgRnJvbTtcbihmdW5jdGlvbiAoRnJvbSkge1xuICAgIEZyb21bRnJvbVtcIkxvY2FsXCJdID0gMF0gPSBcIkxvY2FsXCI7XG4gICAgRnJvbVtGcm9tW1wiUmVtb3RlXCJdID0gMV0gPSBcIlJlbW90ZVwiO1xuICAgIEZyb21bRnJvbVtcIlBhZ2VcIl0gPSAyXSA9IFwiUGFnZVwiO1xuICAgIEZyb21bRnJvbVtcIkRldmljZVwiXSA9IDNdID0gXCJEZXZpY2VcIjtcbn0pKEZyb20gfHwgKGV4cG9ydHMuRnJvbSA9IEZyb20gPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9jb3JlL3Byb3BlcnR5XCIpO1xuY29uc3Qgbm9ybWFsX3BhcnNlcl8xID0gcmVxdWlyZShcIi4vY29yZS9wYXJzZXIvbm9ybWFsLXBhcnNlclwiKTtcbmNvbnN0IGRwX3BhcnNlcl8xID0gcmVxdWlyZShcIi4vY29yZS9wYXJzZXIvZHAtcGFyc2VyXCIpO1xubGV0IERTTSA9IHt9O1xuY29uc3QgbGlnaHQwID0gRGV2aWNlTWFuYWdlci5jcmVhdGVMaWdodCgnTGFtcChIb21lKV8wJyk7XG5jb25zdCBob21lSHVtaWRpZmllcjIgPSBEZXZpY2VNYW5hZ2VyLmNyZWF0ZUhvbWVIdW1pZGlmaWVyKCdIb3VzZWhvbGRIdW1pZGlmaWVyXzInKTtcbmluaXQoKS50aGVuKHIgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdJbml0IFN1Y2Nlc3MuJyk7XG4gICAgbWFpbigpLnRoZW4ociA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSdW5uaW5nLi4uJyk7XG4gICAgfSwgZSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ01haW4gRmFpbGVkLicpO1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH0pO1xufSwgZSA9PiB7XG4gICAgY29uc29sZS5lcnJvcignSW5pdCBGYWlsZWQuJyk7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbn0pO1xuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBEU00ubGlnaHQwID0ge1xuICAgICAgICAgICAgc3dpdGNoOiBuZXcgcHJvcGVydHlfMS5kZWZhdWx0KCdsaWdodDAnLCAnc3dpdGNoJyksXG4gICAgICAgIH07XG4gICAgICAgIERTTS5ob21lSHVtaWRpZmllcjIgPSB7XG4gICAgICAgICAgICBzd2l0Y2g6IG5ldyBwcm9wZXJ0eV8xLmRlZmF1bHQoJ2hvbWVIdW1pZGlmaWVyMicsICdzd2l0Y2gnKSxcbiAgICAgICAgfTtcbiAgICAgICAgRFNNLmxpZ2h0MC5zd2l0Y2gudXBkYXRlID0gdiA9PiBsaWdodDAuc2V0U3dpdGNoKG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LnRvKHYpKTtcbiAgICAgICAgRFNNLmhvbWVIdW1pZGlmaWVyMi5zd2l0Y2gudXBkYXRlID0gdiA9PiBob21lSHVtaWRpZmllcjIuc2V0U3dpdGNoKG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LnRvKHYpKTtcbiAgICAgICAgRFNNLmxpZ2h0MC5zd2l0Y2guc2V0UmVtb3RlVmFsdWUoKHlpZWxkIGxpZ2h0MC5nZXRTd2l0Y2goKSkudmFsdWUpO1xuICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIyLnN3aXRjaC5zZXRSZW1vdGVWYWx1ZSgoeWllbGQgaG9tZUh1bWlkaWZpZXIyLmdldFN3aXRjaCgpKS52YWx1ZSk7XG4gICAgICAgIGxpZ2h0MC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBkYXRhLnN3aXRjaCA9IG5vcm1hbF9wYXJzZXJfMS5kZWZhdWx0LmZyb20oZGF0YS5zd2l0Y2gpO1xuICAgICAgICAgICAgRFNNLmxpZ2h0MC5zd2l0Y2guc2V0UmVtb3RlVmFsdWUoZGF0YS5zd2l0Y2gpO1xuICAgICAgICB9KTtcbiAgICAgICAgaG9tZUh1bWlkaWZpZXIyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIGRhdGEuc3dpdGNoID0gbm9ybWFsX3BhcnNlcl8xLmRlZmF1bHQuZnJvbShkYXRhLnN3aXRjaCk7XG4gICAgICAgICAgICBEU00uaG9tZUh1bWlkaWZpZXIyLnN3aXRjaC5zZXRSZW1vdGVWYWx1ZShkYXRhLnN3aXRjaCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBEU00ubGlnaHQwLnN3aXRjaC5hZGRMaXN0ZW5lcih2YWx1ZSA9PiB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBkcF9wYXJzZXJfMS5kZWZhdWx0KERTTS5saWdodDAuc3dpdGNoLCBEU00uaG9tZUh1bWlkaWZpZXIyLnN3aXRjaCkucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgRFNNLmhvbWVIdW1pZGlmaWVyMi5zd2l0Y2guc2V0TG9jYWxWYWx1ZSh2YWx1ZSwgcHJvcGVydHlfMS5Gcm9tLkxvY2FsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg0NCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=