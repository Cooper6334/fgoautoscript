//selectFriend(0,"","贗作",1);
//-----------------------------------------------------select stage
function selectStage(useApple){
    if(!isScriptRunning){
        return;
    }
    tapScale(1600,475,100);
    sleep(1000);
    var screenShot = getScreenshot();
    if(checkImage(screenShot,stageFullImage,650,300,1200,250)){
        console.log("item box full");
        releaseImage(screenShot);
        isScriptRunning = false;
        return;
    }
    else if(checkImage(screenShot,stageFullImage2,650,300,1200,250)){
        console.log("item box full");
        releaseImage(screenShot);
        isScriptRunning = false;
        return;
    }
    if(checkImage(screenShot,noApImage,900,70,750,110)){
        console.log("ap not enough");
        switch(useApple){
            case -1:
            isScriptRunning = false;
            releaseImage(screenShot);
            return;
            case 2://gold
            tapScale(750,600,100);
            break;
            case 1://silver
            tapScale(750,900,100);
            break;
            case 0://bronze
            tapScale(750,1120,100);
            break;
            case 3:
            tapScale(750,350,100);
            break;
            case 4:
                //wait for auto recover
            break;
        }
        sleep(1000);
        var screenShot2 = getScreenshot();
        if(checkImage(screenShot,screenShot2,0,0,defaultScreenSize[0],defaultScreenSize[1])){
            console.log("no apple");
            releaseImage(screenShot);
            releaseImage(screenShot2);
            return;
        }
        releaseImage(screenShot2);
        tapScale(1700,1135,100);
        sleep(2000);
    }
    releaseImage(screenShot);
}
//-----------------------------------------------------friend list

function selectFriend(filter,servant,item,star){
    console.log("select friend");
    sleep(500);
    if(!isScriptRunning){
        return;
    }
    var path = getStoragePath();
    var position = [180,315,450,585,725,860,995,1130,1265];
    var servantImage;
    if(servant.length > 0){
        servantImage = openImage(path+"/FGO/friend_servant/"+servant+".png");
    }
    var itemImage;
    if(item.length > 0){
        itemImage = openImage(path+"/FGO/friend_item/"+item+".png");
    }
    while(true){
        var screenShot2 = getScreenshot();
        if(!checkImage(screenShot2,selectFriendImage,1340,200,420,100)){
            releaseImage(screenShot2);
            sleep(3000);
            continue;
        }
        releaseImage(screenShot2);
        var t = 1;
        for(var i = 0;i < 9;i++){//loop for filter
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
                tapScale(position[i],250,100);
                sleep(1000);
            }
            for(var j = 0;j < 3;j++){ //loop for scroll
                if(!isScriptRunning){
                    return;
                }
                var screenShot = getScreenshot();
                var friend1;
                var friend2;
                if(servantImage == undefined && itemImage == undefined){
                    friend1 = true;
                    friend2 = true;
                }else{
                    var s1 = true;
                    var i1 = true;
                    var star1 = true;
                    var s2 = true;
                    var i2 = true;
                    var star2 = true;
                    if(servantImage != undefined){
                        if(!checkImage(screenShot,servantImage,100,460,310,195)){
                            s1 = false;
                        }
                        if(!checkImage(screenShot,servantImage,100,860,310,195)){
                            s2 = false;
                        }
                    }
                    if(itemImage != undefined){
                        if(!checkImage(screenShot,itemImage,100,655,310,90,0.9)){
                            i1 = false;
                        }else if(star == 1 && !checkImage(screenShot,starImage,377,713,14,14)){
                            star1 = false;
                        }
                        if(!checkImage(screenShot,itemImage,100,1055,310,90,0.9)){
                            i2 = false;
                        }else if(star == 1 && !checkImage(screenShot,starImage,377,1113,14,14)){
                            star2 = false;
                        }
                    }
                    friend1 = s1 && i1 && star1;
                    friend2 = s2 && i2 && star2;
                }            
                releaseImage(screenShot);
                if(friend1||friend2){
                    if(friend1){
                        tapScale(900,535,100);
                    }else if(friend2){
                        tapScale(900,935,100);
                    }
                    if(servantImage!=undefined){
                        releaseImage(servantImage);
                    }
                    if(itemImage!=undefined){
                        releaseImage(itemImage);
                    }
                    sleep(3000);
                    return;
                }
                if(j < 2){
                    scrollFriendList();
                }
            }
        }
        reloadFriend();
    }
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
    swipeScale(800,1000,800,201,50);
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
    sleep(100);
    tapScale(x,100,100);
    sleep(2000);
}

function startQuest(){
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
}

function finishQuest(){
    if(!isScriptRunning){
        return;
    }
    console.log("Wait for quest finish");
    sleep(500);
    var positionX = [793,141,990,1294,222,215,2080,1390,1792];
    var positionY = [1294,317,165,362,142,137,1300,550,1191];
    var positionW = [120,649,230,373,545,2141,270,510,221];
    var positionH = [77,113,285,89,77,233,100,40,60];
    for(var i=0;i<30;i++){
        if(!isScriptRunning){
            return;
        }
        var screenShot = getScreenshot();
        if(checkImage(screenShot,finishStageImage[0],positionX[0],positionY[0],positionW[0],positionH[0])){
            releaseImage(screenShot);
            console.log("Quest finish");
            return;
        }
        else{
            for(var j=1;j<8;j++){
                if(checkImage(screenShot,finishStageImage[j],positionX[j],positionY[j],positionW[j],positionH[j])){
                    tapScale(2300,1335,100);
                    break;
                }
            }
            if(checkImage(screenShot,finishStageImage[8],positionX[8],positionY[8],positionW[8],positionH[8])){
                tapScale(650,1200,100);
            }
        }
        releaseImage(screenShot);
        sleep(1500);
    }
    isScriptRunning = false;
    console.log("Wait for quest finish timeout");
}


console.log("Load start stage api finish");