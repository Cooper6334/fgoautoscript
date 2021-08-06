//var deviceId = "98071FFAZ002JS";
var deviceId = "127.0.0.1:62025";

function saveMyImage(name,image){
    var path = getStoragePath();
    var filepath = path+"/"+name+".png";
    saveImage(image,filepath);
    console.log("adb -s " + deviceId + " pull "+filepath);
}

function saveCropIcon(name){    
    var margin = 0;
   	if(iconMargin[name] != true){
   		margin = defaultMarginX;
   	}
    var path = getStoragePath();
    var x = icon[name][0] + margin;
    var y = icon[name][1];
    var width = icon[name][2];
    var height = icon[name][3];
    var filepath = path+"/cropImage/"+name+".png";
    var screenshot = getScreenshotResize();
    var crop = cropImage(screenshot,x,y,width,height);
    saveImage(crop,filepath);
    releaseImage(screenshot);
    releaseImage(crop);
    console.log("adb -s " + deviceId + " pull "+filepath);
}

function saveScreenShotImage(){
    var path = getStoragePath();
    var currentdate = new Date();
    var filepath = path+"/screenshot"+currentdate.getTime()+".png";
    var screenShot = getScreenshot();
    saveImage(screenShot,filepath);
    releaseImage(screenShot);
    console.log("save screenshot at "+filepath);
}

function saveCropImage(l,t,w,h){
    var path = getStoragePath();
    var width = w;
    var height = h;
    var x = l;
    var y = t;
    var currentdate = new Date();
    var filepath = path+"/crop"+"_"+x+"_"+y+"_"+width+"_"+height+".png";
    var screenShot = getScreenshot();
    var crop = cropImage(screenShot,x,y,width,height);
    saveImage(crop,filepath);
    releaseImage(screenShot);
    releaseImage(crop);
    console.log("adb -s" + deviceId + "pull "+filepath);
}


function checkAllPage(){
    var name = ["main","itemFull","apple","friend","refresh","team","item","battleMain","battleCard","battleServant","skillFailed","skillDetail","skillTarget","ultFailed","stageFailed","bond","addFriend","item"];
    var result = [];
    result[0] = isMainPage();
    result[1] = isItemOrServantFullDialog();
    result[2] = isUseAppleDialog();
    result[3] = isSelectFriendPage();
    result[4] = isSelectFriendRefreshDialog();
    result[5] = isSelectTeamPage();
    result[6] = isUseItemDialog();
    result[7] = isBattleMainPage();
    result[8] = isBattleCardPage();
    result[9] = isBattleServantDialog();
    result[10] = isBattleSkillFailedDialog();
    result[11] = isBattleSkillDetailDialog();
    result[12] = isBattleSkillTargetDialog();
    result[13] = isBattleUltFailedDialog();
    result[14] = isBattleStageFailedDialog();
    result[15] = isFinishBondPage();
    result[16] = isAddFriendPage();
    result[17] = isItemPage();
    var inPage = false;
    for(var i = 0;i<result.length;i++){
        if(result[i]){
            inPage = true;
            console.log("is in page "+name[i]);
        }
    }
    if(!inPage){
        console.log("not in any page");
    }
}

console.log("load debug api finish");