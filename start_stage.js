//-----------------------------------------------------select stage
function selectStage(useApple){
    if(!isScriptRunning){
        return;
    }
    console.log("-選擇關卡-");
    if(!isMainPage()){
        console.log("不在主畫面-選擇關卡失敗");
        isScriptRunning = false;
        return;
    }
    tapScale(800,160);
    var status = -1;
    while(true){
        if(isItemOrServantFullDialog()){
            status = 0;
        }else if(isUseAppleDialog()){
            status = 1;
        }else if(isSelectFriendPage()){
            status = 2;
        }
        if(status>=0){
            break;
        }
    }
    if(status == 2){
        return;
    }
    if(status == 0){
        console.log("倉庫已滿-選擇關卡失敗");
        isScriptRunning = false;
        return;
    }
    if(status == 1){
        switch(useApple){
            case -1:
            console.log("AP不足-選擇關卡失敗");
            isScriptRunning = false;
            return;
            case 2://gold
            tapScale(600,300);
            console.log("使用金蘋果");
            sendNormalMessage(runningScriptName,"使用金蘋果");
            break;
            case 1://silver
            tapScale(600,450);
            console.log("使用銀蘋果");
            sendNormalMessage(runningScriptName,"使用銀蘋果");
            break;
            case 0://bronze
            tapScale(600,560);
            console.log("使用銅蘋果");
            sendNormalMessage(runningScriptName,"使用銅蘋果");
            break;
            case 3:
            tapScale(600,150);
            console.log("使用聖晶石");
            sendNormalMessage(runningScriptName,"使用聖晶石");
            break;
            case 4:
            var counter = 0;
            while(isScriptRunning){
                sleep(1000);
                tapScale(640,620);
                console.log("等待一分鐘回復體力");
                if(counter == 0){
                    sendNormalMessage(runningScriptName,"等待回復體力");
                }
                counter = (counter + 1) % 5;
                if(selectStageAutoRestore()){
                    break;
                }
            }
            break;
        }
    }
}

function selectStageAutoRestore(){
    for(var i = 0;i<55;i++){
        sleep(1000);
        if(!isScriptRunning){
            break;
        }
    }
    //select stage again
    tapScale(800,160);
    while(true){
        sleep(1000);
        if(isUseAppleDialog()){
            return false;
        }else if(isSelectFriendPage()){
            return true;
        }
    }
}

//-----------------------------------------------------friend list

function selectFriend(filter,servant,item,star){
    if(!isScriptRunning){
        return;
    }
    console.log("-選擇好友-");
    if(!isSelectFriendPage()){
        console.log("不在選擇好友頁面-選擇好友失敗");
        isScriptRunning = false;
        return;
    }
}

function checkStar(screenShot,position){
}

function reloadFriend(){
    while(true){
        if(!isScriptRunning){
            return;
        }
        tapScale(1650,235,100);
        sleep(1000);
        var screenShot = getScreenshot();
        if(checkImage(screenShot,selectFriendImage2,1600,1080,150,80)){
            tapScale(1700,1135,100);
            releaseImage(screenShot);
            waitLoading();
            return;
        }else{
            tapScale(1250,1135,100);
            sleep(5000);
        }
        releaseImage(screenShot);
    }
}

function scrollFriendList(){
}

//-----------------------------------------------------team menu
function selectTeam(team){
    if(!isScriptRunning){
        return;
    }
    if(team < 0 || team >= 10){
        return;
    }
    while(true){
        var screenShot = getScreenshot();
        if(checkImage(screenShot,selectTeamImage,2270,1300,230,100)){
            releaseImage(screenShot);
            break;
        }
        releaseImage(screenShot);
    }
    var x = 1050 + 50*team;
    var x2 = 1050 + 50*((team+1)%10);
    tapScale(x2,100,100);
    sleep(1000);
    tapScale(x,100,100);
    sleep(2000);
}

function startQuest(useItem){
    if(!isScriptRunning){
        return;
    }
    while(true){
        var screenShot = getScreenshot();
        if(checkImage(screenShot,selectTeamImage,2270,1300,230,100)){
            releaseImage(screenShot);
            break;
        }
        releaseImage(screenShot);
    }
    tapScale(2300,1335,100);
    sleep(1500);

    //check use item
    var screenShot2 = getScreenshot();
    if(checkImage(screenShot2,useItemImage,800,160,950,60)){
        if(useItem == undefined || useItem == -1){
            tapScale(1640,1300,100);
            releaseImage(screenShot2);
            return;
        }else{
            var itemPositionY = [400,700,1000];
            var y;
            if(useItem > 2){
                y = 1000;
                for(var i = 0; i < useItem - 2; i++){
                    swipeScale(800,1000,800,600,20);
                    sleep(1000);
                }
            }else{
                y = itemPositionY[useItem];
            }
            tapScale(1300,y,100);
            sleep(1000);
            tapScale(1655,1110,100);
        }
        releaseImage(screenShot2);
        sleep(5000);        
        var screenShot3 = getScreenshot();
        if(checkImage(screenShot3,useItemImage,800,160,950,60)){
            isScriptRunning = false;
            sendUrgentMessage(runningScriptName,"No enough item");
            console.log("Use item failed");
        }
        releaseImage(screenShot3);
    }else{
        releaseImage(screenShot2);
    }
}

function finishQuest(){
}

loadApiCnt++;
console.log("Load start stage api finish");