load("src/main/kotlin/com/hraps/iotgenerator/generate/logic/esprima.js");

function parseJs(code){
  return JSON.stringify(esprima.parseScript(code, {range: true}));
}
