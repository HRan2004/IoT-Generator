/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 844:
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
let DSM = {};
const humanBodySensor0 = DeviceManager.createHumanBodySensor('HumanMotionSensor_0');
const light1 = DeviceManager.createLight('Lamp(Home)_1');
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
        DSM.humanBodySensor0 = {};
        DSM.light1 = {};
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[844](0, __webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFhO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7VUVuQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9pbmRleC50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmxldCBEU00gPSB7fTtcbmNvbnN0IGh1bWFuQm9keVNlbnNvcjAgPSBEZXZpY2VNYW5hZ2VyLmNyZWF0ZUh1bWFuQm9keVNlbnNvcignSHVtYW5Nb3Rpb25TZW5zb3JfMCcpO1xuY29uc3QgbGlnaHQxID0gRGV2aWNlTWFuYWdlci5jcmVhdGVMaWdodCgnTGFtcChIb21lKV8xJyk7XG5pbml0KCkudGhlbihyID0+IHtcbiAgICBjb25zb2xlLmxvZygnSW5pdCBTdWNjZXNzLicpO1xuICAgIG1haW4oKS50aGVuKHIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnUnVubmluZy4uLicpO1xuICAgIH0sIGUgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdNYWluIEZhaWxlZC4nKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9KTtcbn0sIGUgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0luaXQgRmFpbGVkLicpO1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG59KTtcbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgRFNNLmh1bWFuQm9keVNlbnNvcjAgPSB7fTtcbiAgICAgICAgRFNNLmxpZ2h0MSA9IHt9O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIH0pO1xufVxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bODQ0XSgwLCBfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==