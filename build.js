function encodeScript(){
    var apiList = ["basic","start_stage","in_stage","auto_attack_ai","get_box"];    
    var path = getStoragePath();
    for(var i = 0;i<apiList.length;i++){
        var s = readFile(path+"/scripts/com.cooper.FGO/une_"+apiList[i]+".js");
        console.log("encrypt "+apiList[i]+":"+s.length);
        var e = encrypt(s);
        writeFile(path+"/scripts/com.cooper.FGO/"+apiList[i]+".js",e);
        console.log("encrypt finish:"+e.length);
    }
}
encodeScript();


function loadApi(){
    console.log("start load api");
    var apiList = ["basic","start_stage","in_stage","auto_attack_ai","get_box"];    
    var path = getStoragePath();
    for(var i = 0;i<apiList.length;i++){
        var s = readFile(path+"/scripts/com.cooper.FGO/uni_"+apiList[i]+".js");
        if(s.length == 0){
            return false;
        }
        runScript(s);
    }
    console.log("load api success");
    return true;
}

function loadApi(){
    console.log("start load api");
    var apiList = ["basic","start_stage","in_stage","auto_attack_ai","get_box"];    
    var path = getStoragePath();
    for(var i = 0;i<apiList.length;i++){
        var s = readFile(path+"/scripts/com.cooper.FGO/"+apiList[i]+".js");
        if(s.length == 0){
            return false;
        }
        runEncryptedScript(s);
    }
    console.log("load api success");
    return true;
}
loadApi();
