function getBox(newBox,fast){
    var waitTime = 100;
    var checkTime = 50;
    if(fast != 1){
        waitTime = 1000;
        checkTime = 5;
    }
    if(checkIsBoxFinish()){
        if(!isScriptRunning){
            return;
        }
        if(newBox){
            resetBox();
        }else{
            console.log("box already empty, please reset");
            return;
        }
    }  
    console.log("start getbox");
    while(isScriptRunning){
        if(checkIsBoxFinish()){
            break;
        }
        for(var t = 0;t<checkTime;t++){
            tapScale(800,955,100);
            sleep(waitTime);
        }
    }
    console.log("finish getbox");
}

function checkIsBoxFinish(){
    var screenShot = getScreenshot();
    var r = false;
    if(checkImage(screenShot,presentBoxFullImgae,950,800,650,400)){
        console.log("Present box full");
        sendUrgentMessage(runningScriptName,"Present box full");
        releaseImage(screenShot);
        isScriptRunning = false;
        return true;
    }
    if(checkImage(screenShot,checkBoxPointImage,checkBoxPointPosition[0],checkBoxPointPosition[1],checkBoxPointPosition[2],checkBoxPointPosition[3])){
        r = true;
    }
    releaseImage(screenShot);
    return r;
}

function resetBox(){
    console.log("reset box");
    tapScale(checkBoxPosition[0] + checkBoxPosition[2]/2,checkBoxPosition[1] + checkBoxPosition[3]/2,100);
    sleep(1000);
    tapScale(1700,1135,100);
    waitLoading();
    sleep(1000);
    tapScale(1250,1135,100);
    sleep(1000);
}

function getFriendPoint(){
    while(isScriptRunning){
        if(!isFriendPointMainPage()){
            console.log("請移到友抽畫面再執行");
            isScriptRunning = false;
            return;
        }
        if(isFriendPointTen()){
            tapScale(800,550);
        }else if(isFriendPointFree()){
            tapScale(625,550);
        }else{
            console.log("結束友抽");
            isScriptRunning = false;
            return;
        }
        sleep(1000);
        if(isFriendPointFull()){
            console.log("結束友抽-倉庫已滿");
            isScriptRunning = false;
            return;
        }
        tapScale(850,567);
        sleep(1000);
        while(isScriptRunning){
            sleep(2000);
            if(isFriendPointReload()){
                tapScale(750,650);
                break;
            }else if(isFriendPointNew()){
                tapScale(1090,675);
            }else if(isItemPage()){
                tapScale(45,40);
            }else {
                tapScale(750,650);
            }
        }
        sleep(2000);
    }
}

loadApiCnt++;
console.log("Load get box api finish");