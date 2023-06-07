var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var deviceManager;
let humanSensor;
window.methods = {
    onloadSdk(deviceArr) {
        console.log('onloadSdk', 3);
        deviceManager = new DeviceManager(deviceArr);
        humanSensor = deviceManager.getHumanSensor_1('人体存在传感器');
        try {
            main();
        }
        catch (e) {
            console.error('Run Error');
            console.warn(e);
        }
    },
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const printHumanExist = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield humanSensor.getExistStatus();
                console.log(res.value);
            }
            catch (e) {
                console.warn(e);
            }
        });
        setInterval(() => {
            printHumanExist();
        }, 120 * 1000);
    });
}
