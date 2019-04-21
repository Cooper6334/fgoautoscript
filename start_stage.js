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
var friendServantPosition = [[51,230,155,96],[51,430,155,96]];
var friendItemPosition =  [[51,328,155,30],[51,528,155,30]];
var friendStarPosition =  [[190,360,5,5],[190,560,5,5]];
var selectFriendPosition = [90,158,225,292,362,430,497,565,632];
//selectFriend(1,"s1","i1",true,false);
function selectFriend(filter,servant,item,star,isFriend){
    if(!isScriptRunning){
        return;
    }
    if(isFriend == undefined){
        isFriend = true;
    }
    console.log("-選擇好友-");
    if(!isSelectFriendPage()){
        console.log("不在選擇好友頁面-選擇好友失敗");
        isScriptRunning = false;
        return;
    }
    var servantImage;
    if(servant.length > 0){
        var servantImagePath = itemPath+"friend_servant/"+servant+".png";
        servantImage = openImage(servantImagePath);
        if(isDebug){
            console.log("check servant image "+servantImagePath);
        }
    }
    var itemImage;
    if(item.length > 0){
        var servantItemPath = itemPath+"friend_item/"+item+".png";
        itemImage = openImage(servantItemPath);
        if(isDebug){
            console.log("check item image "+servantItemPath);
        }
    }
    while(true){
        var t = 1;
        for(var i = 0;i < selectFriendPosition.length;i++){//loop for filter
            if(!isScriptRunning){
                return;
            }
            if(filter == 0){
                i = 9;
            }else if((filter & t) == 0){
                t*=2;
                continue;
            }else{
                t *= 2;
                tapScale(selectFriendPosition[i],125);
                sleep(1000);
            }

            for(var j = 0;j<3;j++){
                var screenshot = getScreenshotResize();
                var friend1 = true;
                var friend2 = true;
                if(servantImage!=undefined){
                    friend1 = checkFriendServant(screenshot,servantImage,0);
                    friend2 = checkFriendServant(screenshot,servantImage,1);
                }
                var item1 = true;
                var item2 = true;                
                if(itemImage!=undefined){
                    item1 = checkFriendItem(screenshot,itemImage,0,star);
                    item2 = checkFriendItem(screenshot,itemImage,1,star);
                }
                var found = false;
                if(friend1 && item1){
                    tapScale(450,267);
                    found = true;
                }else if(friend2 &&item2){                    
                    tapScale(450,467);
                    found = true;
                }
                if(isDebug){
                    var star1 = checkStar(screenshot,0);
                    var star2 = checkStar(screenshot,1);
                    console.log("=====================================");
                    console.log("loop "+j)
                    console.log("friend1 "+friend1+" "+item1+" "+star1);
                    console.log("friend2 "+friend2+" "+item2+" "+star2);
                    console.log("=====================================");
                }
                releaseImage(screenshot);
                if(found){                    
                    if(servantImage!=undefined){
                        releaseImage(servantImage);
                    }
                    if(itemImage!=undefined){
                        releaseImage(itemImage);
                    }
                    return;
                }
                if(j < 2){
                    scrollFriendList();
                    sleep(2000);
                }
            }
        }
        reloadFriend();
    }
}

function checkFriendServant(screenshot,servantImage,position){
    if(isDebug){
        console.log("checkFriendServant " +position);
    }
    return checkImage(screenshot,servantImage,friendServantPosition[position][0],friendServantPosition[position][1],friendServantPosition[position][2],friendServantPosition[position][3]);
}

function checkFriendItem(screenshot,itemImage,position,star){
    if(isDebug){
        console.log("checkFriendItem " +position);
    }
    if(!checkImageAndColor(screenshot,itemImage,friendItemPosition[position][0],friendItemPosition[position][1],friendItemPosition[position][2],friendItemPosition[position][3])){
        return false;
    }
    if(star){
        if(!checkStar(screenshot,position)){
            return false;
        }
    }
    return true;
}

function checkStar(screenShot,position){
    if(isDebug){
        console.log("checkStar " +position);
    }
    var isG = 0;
    var notG = 0;
    for(var i=0;i<friendStarPosition[position][2];i++){
        for(var j=0;j<friendStarPosition[position][3];j++){
            var color = getImageColor(screenShot,friendStarPosition[position][0]+i,friendStarPosition[position][1]+j);
            if(color.g>color.r && color.g > color.b){
                isG++;
            }else{
                notG++;
            }
        }
    }
    if(isG > notG * 3){
        return true;
    }
    return false;
}

function reloadFriend(){
    while(true){
        if(!isScriptRunning){
            return;
        }
        tapScale(825,117);
        sleep(1000);
        if(isSelectFriendRefreshDialog()){
            tapScale(850,567);
            sleep(1000);
            if(isSelectFriendRefreshDialog()){
                tapScale(625,567);
                sleep(5000);
            }else{
                return;
            }
        }
    }
}

function scrollFriendList(){
    swipeScale(400,500,400,100,300);
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