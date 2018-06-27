
var defaultScreenSize = [2560,1440];
var screenScale = [];
var screenOffset = [];

var ultCheckX = [682,1146,1612];
var ultCheckY = 285;
var ultWidth = 280;
var ultHeight = 300;
var ultLightnessOffset = 140;


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
        screenOffset[1] = (size.height - h) / 2;
    }else if(w * 9 > h * 16){
        w = h * 16 / 9;
        screenOffset[0] = (size.width - w) / 2;
    }
    screenScale[0] = w / defaultScreenSize[0];
    screenScale[1] = h / defaultScreenSize[1];
}


function getInitUlt(){
    var screenShot = getScreenshot();
    for(var i=0;i<3;i++){
        if(initUlt[i] != undefined){
            releaseImage(initUlt[i]);
        }        
        initUlt[i] = cropImage(screenShot, ultCheckX[i]* screenScale[0] + screenOffset[0], ultCheckY * screenScale[1] + screenOffset[1], ultWidth * screenScale[0], ultHeight* screenScale[1]);
    }
    releaseImage(screenShot);
}

function updateUltList(){
    var edgeX = [696,1159,1622];
    var edgeY = [270,570];
    var ultUpdateFailed = true;
    var errorCnt = 0;
    while(ultUpdateFailed){
        ultUpdateFailed = false;
        var screenShot = getScreenshot();
        for(var i=0;i<3;i++){
            var card = cropImage(screenShot, ultCheckX[i]* screenScale[0] + screenOffset[0], ultCheckY * screenScale[1] + screenOffset[1], ultWidth * screenScale[0], ultHeight* screenScale[1]);
            var lightCard = cropImage(screenShot, ultCheckX[i]* screenScale[0] + screenOffset[0], (ultCheckY +ultLightnessOffset)* screenScale[1] + screenOffset[1], ultWidth * screenScale[0], (ultHeight-ultLightnessOffset)* screenScale[1]);
            var score1 = getImageLightness(lightCard,5);
            var score2 = getIdentityScore(card,initUlt[i]);
            var isUlt = false;
            if(score1 < 80){
              isUlt = false;
            }else if(score2 > 0.75){
              isUlt = false;
            }else if(score1 > 140 || score2 < 0.6){
                isUlt = true;
            }else{
                if(errorCnt < 10){
                    //recheck
                    errorCnt++;
                    ultUpdateFailed = true;
                    releaseImage(card);
                    sleep(100);
                    break;
                }else{
                    if(score1 < 120 && score2 < 0.7){
                        isUlt = true;
                    }else{
                        isUlt = false;
                    }
                }
            }
            if(isUlt){
                var r=0,g=0,b=0;
                for(var ey=edgeY[0];ey<edgeY[1];ey++){
                    var color = getImageColor(screenShot,edgeX[i]* screenScale[0] + screenOffset[0],ey* screenScale[1] + screenOffset[1]);
                    if(color.r > (color.g + color.b)){
                        r++;
                    }
                    if(color.g > (color.r + color.b)){
                        g++;
                    }
                    if(color.b > (color.r + color.g)){
                        b++;
                    }
                }
                if(r >= g && r >= b){
                    ultList[i] = 0;
                }
                else if(b >= r && b >= g){
                    ultList[i] = 1;
                }
                else if(g >= r && g >= b){
                    ultList[i] = 2;
                }
            }else{
                ultList[i] = -1;
            }
            releaseImage(card);
        }
        releaseImage(screenShot);
    }
}

console.log("Start test");
initScreenSize();
var e = 0;
var test = [0,-1,-1];
//var flag = true;
var flag = false;

if(flag){
    var initUlt = [];
    getInitUlt();
}else{
  for(var t = 0;t < 100; t ++){
      console.log(t);
      updateUltList();
      for(var j = 0;j<3;j++){
          if(ultList[j] != test[j]){
              e++;
              console.log("Error "+ultList);
          }
      }
  }
  console.log("Error:"+e);
}
