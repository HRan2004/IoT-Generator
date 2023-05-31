var deviceManager;
let householdHumidifier;
window.methods = {
  onloadSdk(deviceArr) {
    deviceManager = new DeviceManager(deviceArr);
    householdHumidifier = deviceManager.getHouseholdHumidifier("加湿器");
      householdHumidifier.onReceive((res) => {
      console.log("加湿器->>",res);
      let flag=(res.onOff==='True')
      data.val=flag
    });
    setTimeout(() => {
      init()
      getSwitch();
    }, 0);
  },
};
window.onload=function(){
  console.log(window .JeeWeb)
  if(window.JeeWeb&&window.JeeWeb.phoneInfo&&window.JeeWeb.phoneInfo.statusBarHeight)
  document.getElementsByClassName('title-wrap')[0].style.paddingTop=window.JeeWeb.phoneInfo.statusBarHeight+'px'
 }
var data = {
  val:false
}
function init() {
  Object.defineProperty(data,'val',{
  get:function(){
    return val
  },
  set:function(newVal){
    val = newVal
    updataView()
  }
})
data.val=true
}
let loading=false
function switchDevice() {
   
  if(loading){
    console.log('loading中')
    return
  }
  loading=true
  householdHumidifier.setOnOff(!data.val?'True':'False').then(res => {
    loading=false
    console.log('setOnOff',res)
    data.val=!data.val
  }).catch((e)=>{
    loading=false
    console.log('setOnOff ERR',e)
  })
}

function getSwitch() {
  householdHumidifier.getOnOff().then(res => {
    let flag=(res.value==='True')
    data.val=flag
  }).catch((e)=>{
    console.log('getOnOff ERR',e)
  })
}
function updataView() {
  if(data.val){
    document.querySelector(`.index`).classList.remove("offline");
  }else{
    document.querySelector(`.index`).classList.add("offline");
  }
}
