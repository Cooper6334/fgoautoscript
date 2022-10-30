var blackEdge = [0,0,0,0]; //l 52,t 0,r 2176,b 1035
var friendStrict = 0;//0 normal 1 strict
var servantDirection = 0;//0 l->r 1 r->l
var skillDirection = 0;//0 l->r 1 r->l

function loadPreference(){
    var preference = undefined;
    try {
      preference = readFile(itemPath + "preference.js");
    } catch (e) {
      console.log("no preference file, create");
      writeFile(itemPath + "preference.js", "0,0,0,0,0,0,0");
    }
    if (preference == undefined || preference.length == 0) {
      preference = "0,0,0,0,0,0,0";
    }
    var split = preference.split(",");
    for(var i=0;i<7;i++){
        if(split[i]==undefined){
            split[i] = 0;
        }
    }
    for(var i=0;i<4;i++){
        blackEdge[i] = split[i];
    }
    friendStrict = split[4];
    servantDirection = split[5];
    skillDirection = split[6];

}

function saveBlackEdge(be) {
    blackEdge = be;
    return writeFile(itemPath + "preference.js", getPreferenceString());
}

function savePreference(pref){
    friendStrict = pref[0];
    servantDirection = pref[1];
    skillDirection = pref[2];
    return writeFile(itemPath + "preference.js", getPreferenceString());
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