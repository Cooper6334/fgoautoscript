var defaultScreenSize = [1280,720];
var blackEdge = [0,0,0,0];//l 52,t 0,r 2176,b 1035
var screenScale = [];
var blueEdge = [];
var realScreenSize = [];
var resolution = 16/9;

function initScreenSize(){
    getBlackEdge();
    var size = getScreenSize();
    blueEdge[0] = 0;
    blueEdge[1] = 0;
    //var w = size.width;
    //var h = size.height;
    var w = blackEdge[2] - blackEdge[0] + 1;
    var h = blackEdge[3] - blackEdge[1] + 1;
    resolution = w/h;
    setMargin();
    if(w < h){
        //swap
        var tmp = h;
        h = w;
        w = tmp;
    }
    var wo = w;
    var ho = h;
    if(resolution < 16/9){
        h = wo * 9 / 16;
        blueEdge[1] = (ho - h) / 2;
    }else if(resolution > 21/9){
        w = ho * 21 / 9;
        blueEdge[0] = (wo - w) / 2;
    }
    //screenScale[0] = w / defaultScreenSize[0];
    screenScale[1] = h / defaultScreenSize[1];
    screenScale[0] = screenScale[1];
    realScreenSize[0] = w;
    realScreenSize[1] = h;
}

function getBlackEdge(){
    var screenshot = getScreenshot();
    var imageSize = getImageSize(screenshot);
    var w = imageSize.width;
    var h = imageSize.height;
    for(var i = 0;i<w;i++){
        var color = getImageColor(screenshot,i,h/4);
        if(color.r != 0 || color.g != 0 || color.b != 0){
            blackEdge[0] = i;
            break;
        }
    }
    for(var i = 0;i<h;i++){
        var color = getImageColor(screenshot,w/4,i);
        if(color.r != 0 || color.g != 0 || color.b != 0){
            blackEdge[1] = i;
            break;
        }
    }
    for(var i =w-1;i>=0;i--){
        var color = getImageColor(screenshot,i,h/4);
        if(color.r != 0 || color.g != 0 || color.b != 0){
            blackEdge[2] = i;
            break;
        }
    }
    for(var i = h-1;i>=0;i--){
        var color = getImageColor(screenshot,w/4,i);
        if(color.r != 0 || color.g != 0 || color.b != 0){
            blackEdge[3] = i;
            break;
        }
    }
    console.log("取得黑邊 "+blackEdge);
    releaseImage(screenshot);
}
/*
function getScreenshotResizeFull(){
    var size = getScreenSize();
    if(size.width < size.height){
        if(!orientationLog){
            orientationLog = true;
            console.log("螢幕方向錯誤");
        }
        return null;
    }
    if(orientationLog){        
        console.log("螢幕方向回復");
        orientationLog = false;
    }
    var screenshot = getScreenshot();
    var cutScreenshot = cropImage(screenshot,blackEdge[0],blackEdge[1], blackEdge[2] - blackEdge[0] + 1, blackEdge[3] - blackEdge[1] + 1);
    var resizeScreenshot = resizeImage(cutScreenshot,size.width / screenScale[1],defaultScreenSize[1]);
    releaseImage(cutScreenshot);
    releaseImage(screenshot);
    return resizeScreenshot;
}
//function test
function checkIconInScreenMargin(iconId,threshold,marginVertical,marginHorizontal){
    if(!isScriptRunning){
        return false;
    }
    if(iconName[iconId] == ""){
       console.log("checkIconInScreenMargin no icon");
        return false;
    }
    var screenshot = getScreenshotResizeFull();
    if(screenshot == null){
        return false;
    }
    if(threshold == undefined){
        threshold = 0.85;
    }

    var iconPath = imagePath+iconName[iconId]+".png";
    if(isDebug){
       console.log("checkIconInScreenMargin open icon "+iconPath);
    }
    var iconImage = openImage(iconPath);

    var w = blackEdge[2] - blackEdge[0] + 1;
    var h = blackEdge[3] - blackEdge[1] + 1;
    var x = iconPosition[iconId][0];
    if(marginVertical != 0){
        x = marginVertical > 0 ? marginVertical : w/screenScale[1] + marginVertical;
    }
    var y = iconPosition[iconId][1];
    if(marginHorizontal != 0){
        y = marginHorizontal > 0 ? marginHorizontal : h/screenScale[1] + marginHorizontal;
    }
    
    var result = checkImage(screenshot,iconImage,x,y,iconPosition[iconId][2],iconPosition[iconId][3],threshold);
    releaseImage(screenshot);
    releaseImage(iconImage);
    if(isDebug){
       console.log("checkIconInScreenMargin result "+result);
    }
    return result;
}
*/

loadApiCnt++;
console.log("Load screen api finish");