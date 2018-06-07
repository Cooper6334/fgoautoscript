var isDebug = false;

var noApImage;
var stageFullImage;
var stageFullImage2;
var finishStageImage = [];
var currentStageImage = [];
var cardListImage = [];
var cardDisableImage = [];
var cardWeakImage = [];
var skillCheckImage;
var skillUsedImage;
var skillNullImage;
var friendPointCheckImage;
var friendPointFreeImage;
var friendPointTenImage;
var friendPointReloadImage;
var friendPointFullImage;
var friendPointFullImage2;
var starImage;

var selectStartImage = [];
var selectBackImage;

var skillColor = [];
var resetFriendCnt;
var isImageInit = false;
var isScriptRunning = false;

var defaultScreenSize = [2560,1440];
var screenScale = [];
var screenOffset = [];

function startScript(loopTime,script){
    loadImage();
    initScreenSize();
    isScriptRunning = true;
    for(var loop = 0;loop<loopTime;loop++){
        if(!isScriptRunning){
            return;
        }
        runScript(script);
    }
    releaseAllImage();
    isScriptRunning = false;
    console.log("script finish");
}

function stopScript(){
    isScriptRunning = false;
    console.log("User press stop");
}

function initIDE(){
    isImageInit = false;
    isDebug = true;
    isScriptRunning = true;
    loadImage();
    initScreenSize();
}

function loadImage(){
    if(isImageInit){
        return;
    }
    var path = getStoragePath();

    noApImage = openImage(path+"/scripts/com.cooper.FGO/image/NoAP.png");

    stageFullImage = openImage(path+"/scripts/com.cooper.FGO/image/StageFull.png");
    stageFullImage2 = openImage(path+"/scripts/com.cooper.FGO/image/StageFull2.png");

    for(var i=0;i<8;i++){
        finishStageImage[i] = openImage(path+"/scripts/com.cooper.FGO/image/FinishStage"+i+".png");
    }

    for(var i=0;i<3;i++){
        currentStageImage[i] = openImage(path+"/scripts/com.cooper.FGO/image/CurrentStage"+i+".png");
    }

    cardListImage[0] = openImage(path+"/scripts/com.cooper.FGO/image/CardListB.png");
    cardListImage[1] = openImage(path+"/scripts/com.cooper.FGO/image/CardListN.png");
    cardListImage[2] = openImage(path+"/scripts/com.cooper.FGO/image/CardListQ.png");

    cardDisableImage[0] =  openImage(path+"/scripts/com.cooper.FGO/image/CardDisable1.png");
    cardDisableImage[1] =  openImage(path+"/scripts/com.cooper.FGO/image/CardDisable2.png");

    cardWeakImage[0] =  openImage(path+"/scripts/com.cooper.FGO/image/CardWeak.png");
    cardWeakImage[1] =  openImage(path+"/scripts/com.cooper.FGO/image/CardResist.png");

    skillCheckImage = openImage(path+"/scripts/com.cooper.FGO/image/SkillCheck.png");
    skillUsedImage = openImage(path+"/scripts/com.cooper.FGO/image/SkillUsed.png");
    skillNullImage = openImage(path+"/scripts/com.cooper.FGO/image/SkillNull.png");

    friendPointCheckImage = openImage(path+"/scripts/com.cooper.FGO/image/FriendPointCheck.png");
    friendPointTenImage = openImage(path+"/scripts/com.cooper.FGO/image/FriendPointTen.png");
    friendPointFreeImage = openImage(path+"/scripts/com.cooper.FGO/image/FriendPointFree.png");
    friendPointReloadImage = openImage(path+"/scripts/com.cooper.FGO/image/FriendPointReload.png");
    friendPointFullImage = openImage(path+"/scripts/com.cooper.FGO/image/FriendPointFull.png");
    friendPointFullImage2 = openImage(path+"/scripts/com.cooper.FGO/image/FriendPointFull2.png");

    selectStartImage[0] = openImage(path+"/scripts/com.cooper.FGO/image/SelectStart.png");
    selectStartImage[1] = openImage(path+"/scripts/com.cooper.FGO/image/SelectStart2.png");
    selectStartImage[2] = openImage(path+"/scripts/com.cooper.FGO/image/SelectStart3.png");
    selectBackImage = openImage(path+"/scripts/com.cooper.FGO/image/SelectBack.png");
    
    starImage = openImage(path+"/scripts/com.cooper.FGO/image/Star.png");
    isImageInit = true;
}

function releaseAllImage(){
    isImageInit = false;

    releaseImage(noApImage);

    releaseImage(stageFullImage);
    releaseImage(stageFullImage2);

    for(var i=0;i<7;i++){
        releaseImage(finishStageImage[i]);
    }

    for(var i=0;i<3;i++){
        releaseImage(currentStageImage[i]);        
        releaseImage(cardListImage[i]);
        releaseImage(selectStartImage[i]);
    }
    
    releaseImage(friendPointCheckImage);
    releaseImage(friendPointTenImage);
    releaseImage(friendPointFreeImage);
    releaseImage(friendPointReloadImage);
    releaseImage(friendPointFullImage);
    releaseImage(friendPointFullImage2);

    releaseImage(skillCheckImage);
    releaseImage(skillUsedImage);
    releaseImage(skillNullImage);

    releaseImage(selectBackImage);

    releaseImage(starImage);
}

function initScreenSize(){
    var size = getScreenSize();
    screenOffset[0] = 0;
    screenOffset[1] = 0;
    var w = size.width;
    var h = size.height;
    if(w < h){
        //swap
        var tmp = h;
        h = w;
        w = tmp;
    }
    if(w * 9 < h * 16){
        h = w * 9 / 16;
        offset[1] = (size.height - h) / 2;
    }else if(w * 9 > h * 16){
        w = h * 16 / 9;
        offset[0] = (size.width - w) / 2;
    }
    screenScale[0] = w / defaultScreenSize[0];
    screenScale[1] = h / defaultScreenSize[1];
}

function saveScript(scriptName,scriptContent){
    var path = getStoragePath();
    writeFile(path+"/FGO/script/"+scriptName+".js",scriptContent);
    console.log("save file "+scriptName+" finish");
    return scriptName;
}

function deleteScript(scriptName){
    var path = getStoragePath();
    execute('rm '+path+"/FGO/script/"+scriptName+".js");
    return scriptName;
}

function readScript(scriptName){
    var path = getStoragePath();
    return readFile(path+"/FGO/script/"+scriptName+".js");
}
//-----------------------------------------------------generial

function checkPixel(x,y,r,g,b){
    var size = getScreenSize();
    if(size.width < size.height){
        return false;
    }
    var w = size.width;
    var h = size.height;
    x = x * screenScale[0] + screenOffset[0];
    y = y * screenScale[1] + screenOffset[1];
    var screenShot = getScreenshot();
    var color = getImageColor(screenShot,x,y);
    releaseImage(screenShot);
    if(isSameColor(color.r,color.g,color.b,r,g,b)){
        return true;
    }
    return false;
}

function checkImage(imageBig,imageSmall,x,y,width,height,threshold){
    var size = getScreenSize();
    if(size.width < size.height){
        return false;
    }
    if(threshold == undefined){
        threshold = 0.85;
    }
    x = x * screenScale[0] + screenOffset[0];
    y = y * screenScale[1] + screenOffset[1];
    width = width * screenScale[0];
    height = height * screenScale[1];
    var resizeSmall = resizeImage(imageSmall,width,height);
    var crop = cropImage(imageBig,x,y,width,height);
    var score = getIdentityScore(crop,resizeSmall);
    releaseImage(crop);
    releaseImage(resizeSmall);
    if(isDebug){
        console.log("check image score "+score);
    }
    if(score > threshold){
        return true;
    }else{
        return false;
    }
}

function getImageLightness(img,sparse){
    if(sparse == undefined){
        sparse = 1;
    }
    var size = getImageSize(img);
    var tmp = clone(img);
    var l = 0;
    var cnt = 0;
    for(var i=0;i<size.width;i+=sparse){
        for(var j=0;j<size.height;j+=sparse){
            cnt++;
            l += getImageColor(tmp,i,j).g;
        }
    }
    l = l / cnt;
    releaseImage(tmp);
    return l;
}

function tapScale(x,y,wait){
    if(!isScriptRunning){
        return;
    }
    var size = getScreenSize();
    if(size.width < size.height){
        return;
    }
    x = x * screenScale[0] + screenOffset[0];
    y = y * screenScale[1] + screenOffset[1];
    tap(x,y,wait);
}

function swipeScale(x,y,endX,endY,step){
    var size = getScreenSize();
    if(size.width < size.height){
        return;
    }
    x = x * screenScale[0] + screenOffset[0];
    y = y * screenScale[1] + screenOffset[1];
    endX = endX * screenScale[0] + screenOffset[0];
    endY = endY * screenScale[1] + screenOffset[1];


    xStep = (endX - x) / step;
    yStep = (endY - y) / step;

    tapDown(x, y, 40);
    for (i = 0; i < step; i ++) {
        moveTo(x + i * xStep, y + i * yStep, 4)
    }
    moveTo(endX,endY,4);
    sleep(1000);
    tapUp(endX, endY)
}

function waitLoading(){
    while(true){
        if(!isScriptRunning){
            return;
        }
        sleep(3000);
        if(!checkPixel(2400,1342,255,255,255)){
            return;
        }
    }
}

function isSameColor(r1,g1,b1,r2,g2,b2){
    if(b1==undefined){
        var c1 = r1;
        var c2 = g1;
        r1=c1.r;
        g1=c1.g;
        b1=c1.b;
        r2=c2.r;
        g2=c2.g;
        b2=c2.b;
    }
    //console.log(r1+","+g1+","+b1);
    //console.log(r2+","+g2+","+b2);
    var diff = 0;
    diff += Math.abs(r1-r2);
    diff += Math.abs(g1-g2);
    diff += Math.abs(b1-b2);
    if(isDebug){
        console.log("check pixel diff "+diff);
    }
    if(diff<20){
        return true;
    }
    return false;
}

/*
function cropFriendImage(friendCnt){
    var screenShot = getScreenshot();
    var crop1 = cropImage(screenShot,100,460,260,195);
    var crop2 = cropImage(screenShot,100,655,260,65);
    var crop3 = cropImage(screenShot,360,1100,50,50);
    saveImage(crop1,storagePath+"head"+friendCnt+".png");
    saveImage(crop2,storagePath+"item"+friendCnt+".png");
    saveImage(crop3,storagePath+"star"+friendCnt+".png");
    releaseImage(screenShot);
    releaseImage(crop1);
    releaseImage(crop2);
    releaseImage(crop3);  
}
*/
function saveScreenShotImage(){
    var currentdate = new Date();
    var filepath = storagePath+"screenshot"+currentdate.getTime()+".png";
    var screenShot = getScreenshot();
    saveImage(screenShot,filepath);
    releaseImage(screenShot);
    console.log("save screenshot at "+filepath);
}

function saveCropImage(l,t,r,b){
    var width = r-l;
    var height = b-t;
    var x = l;
    var y = t;
    var currentdate = new Date();
    var filepath = storagePath+"crop"+currentdate.getTime()+"_"+x+"_"+y+"_"+width+"_"+height+".png";
    var screenShot = getScreenshot();
    var crop = cropImage(screenShot,x,y,width,height);
    saveImage(crop,filepath);
    releaseImage(screenShot);
    releaseImage(crop);
    console.log("save crop at "+filepath);
}

function saveFriendServantImage(cnt){
    sleep(1000);
    var screenShot = getScreenshot();
    var crop;
    if(cnt==1){
        crop = cropImage(screenShot,100 * screenScale[0] + screenOffset[0],460* screenScale[1] + screenOffset[1],310* screenScale[0],195* screenScale[1]);
    }else{
        crop = cropImage(screenShot,100 * screenScale[0] + screenOffset[0],860* screenScale[1] + screenOffset[1],310* screenScale[0],195* screenScale[1]);
    }
    resizeImage(crop,260,195);
    var currentdate = new Date();
    var time = currentdate.getTime();
    var filePath = getStoragePath()+"/tmp_servant_"+time+".png";
    console.log(filePath);
    saveImage(crop,filePath);
    releaseImage(crop);
    releaseImage(screenShot);
    return time;
}
function saveFriendItemImage(cnt){
    sleep(1000);
    var screenShot = getScreenshot();
    var crop;
    if(cnt==1){
        crop = cropImage(screenShot,100 * screenScale[0] + screenOffset[0],655* screenScale[1] + screenOffset[1],310* screenScale[0],90* screenScale[1]);
    }else{
        crop = cropImage(screenShot,100 * screenScale[0] + screenOffset[0],1055* screenScale[1] + screenOffset[1],310* screenScale[0],90* screenScale[1]);
    }
    resizeImage(crop,260,65);
    var currentdate = new Date();
    var time = currentdate.getTime();
    var filePath = getStoragePath()+"/tmp_item_"+time+".png";
    saveImage(crop,filePath);
    releaseImage(crop);
    releaseImage(screenShot);
    return time;
}

function confirmSaveFriendServantImage(imageName,time){
    var path = getStoragePath();
    if(imageName == undefined){
        execute('rm '+path+"/tmp_servant_"+time+".png ");
    }else{
        execute('mv '+path+"/tmp_servant_"+time+".png " +path+'/FGO/friend_servant/'+imageName+'.png');
    }
}

function confirmSaveFriendItemImage(imageName,time){
    var path = getStoragePath();
    if(imageName == undefined){
        execute('rm '+path+"/tmp_item_"+time+".png ");
    }else{
        execute('mv '+path+"/tmp_item_"+time+".png " +path+'/FGO/friend_item/'+imageName+'.png');
    }
}

console.log("Load basic api finish");