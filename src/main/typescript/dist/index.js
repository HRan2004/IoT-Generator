/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
!function() {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
let deviceManager;
let DSM = {};
let light0;
let doorWindowSensor1;
window.methods = {
    onloadSdk(deviceArr) {
        deviceManager = new DeviceManager(deviceArr);
        light0 = deviceManager.getLight('Lamp(Home)_01');
        doorWindowSensor1 = deviceManager.getDoorWindowSensor('DoorAndWindowSensor_1');
    }
};

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFhO0FBQ2IsNkJBQTZDLEVBQUUsYUFBYSxDQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5sZXQgZGV2aWNlTWFuYWdlcjtcbmxldCBEU00gPSB7fTtcbmxldCBsaWdodDA7XG5sZXQgZG9vcldpbmRvd1NlbnNvcjE7XG53aW5kb3cubWV0aG9kcyA9IHtcbiAgICBvbmxvYWRTZGsoZGV2aWNlQXJyKSB7XG4gICAgICAgIGRldmljZU1hbmFnZXIgPSBuZXcgRGV2aWNlTWFuYWdlcihkZXZpY2VBcnIpO1xuICAgICAgICBsaWdodDAgPSBkZXZpY2VNYW5hZ2VyLmdldExpZ2h0KCdMYW1wKEhvbWUpXzAxJyk7XG4gICAgICAgIGRvb3JXaW5kb3dTZW5zb3IxID0gZGV2aWNlTWFuYWdlci5nZXREb29yV2luZG93U2Vuc29yKCdEb29yQW5kV2luZG93U2Vuc29yXzEnKTtcbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9