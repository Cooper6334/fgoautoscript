var blackEdge = [0,0,0,0]; //l 52,t 0,r 2176,b 1035
var friendStrict = 0;//0 normal 1 strict
var servantDirection = 0;//0 l->r 1 r->l
var skillDirection = 0;//0 l->r 1 r->l

function loadPreference() {
  var valueMissing = false;
  var preference = undefined;
  try {
    preference = readFile(itemPath + "preference.js");
  } catch (e) {
    console.log("偏好設定檔案不存在");
    valueMissing = true;
  }
  if (preference == undefined || preference.length == 0) {
    preference = "0,0,0,0,0,0,0";
    valueMissing = true;
  }
  var split = preference.split(",");
  for (var i = 0; i < 7; i++) {
    if (split[i] == undefined || split[i] == null) {
      split[i] = 0;
      valueMissing = true;
    }
  }
  for (var i = 0; i < 4; i++) {
    blackEdge[i] = split[i];
  }
  friendStrict = split[4];
  servantDirection = split[5];
  skillDirection = split[6];
  if (valueMissing) {
    console.log("偏好設定缺損，重新建立");
    writeFile(itemPath + "preference.js", "0,0,0,0,0,0,0");
  }
  return getPreferenceString();
}

function savePreference(pref){
    console.log("儲存偏好設定",pref);
    blackEdge = pref.slice(0,4);
    friendStrict = pref[4];
    servantDirection = pref[5];
    skillDirection = pref[6];
    return writeFile(itemPath + "preference.js", getPreferenceString());
}

function setOtherPreference(pref){
    friendStrict = pref[0];
    servantDirection = pref[1];
    skillDirection = pref[2];
}

function getPreferenceString(){
    var p = "";
    for(var i=0;i<4;i++){
        p+=blackEdge[i];
        p+=",";
    }
    p+=friendStrict;
    p+=",";
    p+=servantDirection;
    p+=",";
    p+=skillDirection;

    return p;
}

loadApiCnt++;
console.log("Load preference api finish");