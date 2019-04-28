//servant
var initServant = [];
var servantExist = [];
var servantInited;
var servantPositionX = [100,415,735];
var servantPositionY = 400;

//skill
var skillUsedImage;

//card
var cardImage = [];

var servantAliveMessage;
var cardList = [];
var cardStatus = []; // -1:null 0:disable 1:weak 2:resist
var cardWidth = 150;
var cardHeight = 65;

var updateCardListX = [63,319,574,832,1092];
var updateCardListY = 535;
var updateCardListOffsetWeakX = 115;
var updateCardListOffsetWeakY = [-155,-170];
var weakW = 50;
var weakH = 15;

var offsetDisableX = [55,130];
var offsetDisableY = -45;
var disableW = 30;
var disableH = 30;

//ult
var initUlt = [];
var ultList = [];
var ultCheckX = [682,1146,1612];
var ultCheckY = 285;
var ultWidth = 280;
var ultHeight = 300;
var ultLightnessOffset = 140;
var allServentDieFlag = false;


function autoAttack(until,mainColor,sameColor,weak,die,p0ult,p0s0,p0t0,p0s1,p0t1,p0s2,p0t2,p1ult,p1s0,p1t0,p1s1,p1t1,p1s2,p1t2,p2ult,p2s0,p2t0,p2s1,p2t1,p2s2,p2t2,ultColor){
    var ult = [];
    ult[0] = p0ult;
    ult[1] = p1ult;
    ult[2] = p2ult;
    var ps0 = [];
    ps0[0] = p0s0;
    ps0[1] = p0s1;
    ps0[2] = p0s2;
    var ps1 = [];
    ps1[0] = p1s0;
    ps1[1] = p1s1;
    ps1[2] = p1s2;
    var ps2 = [];
    ps2[0] = p2s0;
    ps2[1] = p2s1;
    ps2[2] = p2s2;

    var pt0 = [];
    pt0[0] = p0t0;
    pt0[1] = p0t1;
    pt0[2] = p0t2;
    var pt1 = [];
    pt1[0] = p1t0;
    pt1[1] = p1t1;
    pt1[2] = p1t2;
    var pt2 = [];
    pt2[0] = p2t0;
    pt2[1] = p2t1;
    pt2[2] = p2t2;

    var p0 = [];
    p0[0] = ps0;
    p0[1] = pt0;
    var p1 = [];
    p1[0] = ps1;
    p1[1] = pt1;
    var p2 = [];
    p2[0] = ps2;
    p2[1] = pt2;

    var skill = [];
    skill[0] = p0;
    skill[1] = p1;
    skill[2] = p2;

    servantInited = false;
    servantAliveMessage = [true,true,true];
    var lastStage = -1;

    cardImage[0] = openImage(imagePath+"/CardListB.png");
    cardImage[1] = openImage(imagePath+"/CardListN.png");
    cardImage[2] = openImage(imagePath+"/CardListQ.png");
    cardImage[3] = openImage(imagePath+"/CardWeak.png");
    cardImage[4] = openImage(imagePath+"/CardResist.png");
    cardImage[5] = openImage(imagePath+"/CardDisable1.png");
    cardImage[6] = openImage(imagePath+"/CardDisable2.png");
    skillUsedImage = openImage(imagePath+"/SkillUsed.png");
    while(true){
        if(!isScriptRunning){
            break;
        }
        if(!waitUntilPlayerCanMoveOrFinish()){
            console.log("關卡完成，自動戰鬥結束");
            break;
        }
        var currentStage = getCurrentStage();
        if(until!=0 && until <= currentStage){
            console.log("進入第"+(currentStage+1)+"波，自動戰鬥結束");
            break;
        }
        if(lastStage < currentStage){
            lastStage = currentStage;
            console.log("進入第"+(currentStage+1)+"波");
            if(getUserPlan() == 2){
                sendNormalMessage(runningScriptName,"Wave "+(lastStage + 1));
            }
        }
        attackAI(mainColor,sameColor,weak,die,ult,skill,currentStage);
        if(until == 0){
            console.log("一回合完成，自動戰鬥結束");
            break;
        }
        sleep(5000);
    }
    if(servantInited){
        for(var i=0;i<3;i++){
            releaseImage(initServant[i]);
        }
    }
    for(var i=0;i<5;i++){
        releaseImage(cardImage[i]);
    }
}

function attackAI(mainColor,sameColor,weak,die,ult,skill,currentStage){
    console.log("AutoAttack start new turn");
    var screenShot = getScreenshot();
    var servantAlive = [true,true,true];
    if(!servantInited){
        servantInited = true;
        initServant = getCurrentServant(screenShot);
        for(var i=0;i<3;i++){
            servantAlive[i] = true;
        }
    }else{
        var currentServant = getCurrentServant(screenShot);
        for(var i=0;i<3;i++){
            if(getIdentityScore(initServant[i],currentServant[i])>0.85){
                servantAlive[i] = true;
            }else{
                console.log("從者 "+(i+1)+" 退場");
                servantAlive[i] = false;
                if(servantAliveMessage[i]){
                    servantAliveMessage[i] = false;
                    sendNormalMessage(runningScriptName,"servant "+(i+1)+" die");
                }
            }
        }
        if(!(servantAlive[0] || servantAlive[1] || servantAlive[2])){
            /*
            var path = getStoragePath();
            var currentdate = new Date();
            var time = currentdate.getTime();
            saveImage(screenShot,path+"/AllDieBug_"+time+".png");
            for(var j=0;j<3;j++){ 
                saveImage(currentServant[j],path+"/AllDieBug_current"+j+"_"+time+".png");                
                saveImage(initServant[j],path+"/AllDieBug_init"+j+"_"+time+".png");
            }*/
            console.log("All servant die bug?");
            if(!allServentDieFlag){
                allServentDieFlag = true;
                releaseImage(screenShot);
                return;
            }
        }
        for(var i = 0;i<3;i++){            
            releaseImage(currentServant[i]);
        }
    }
    allServentDieFlag = false;
    for(var i=0;i<3;i++){
        if(initUlt[i] != undefined){
            releaseImage(initUlt[i]);
        }        
        initUlt[i] = cropImage(screenShot, ultCheckX[i]* screenScale[0] + screenOffset[0], ultCheckY * screenScale[1] + screenOffset[1], ultWidth * screenScale[0], ultHeight* screenScale[1]);
    }
    var skillUsed = [];
    var m = 'skill_used:';
    for(var i=0;i<9;i++){
        skillUsed[i] = checkImage(screenShot,skillUsedImage,skillPositionX[i],skillPositionY,skillPositionW,skillPositionH);
        m+=(skillUsed[i]+1)+",";
    }
    updateServantExist(screenShot);
    releaseImage(screenShot);
    console.log(m);
    for(var i =0;i<3;i++){
        for(var j=2;j>=0;j--){
            if(!isScriptRunning){
                break;
            }
            if(!servantAlive[i]){
                switch(die){
                    case 0:
                        isScriptRunning = false;
                        console.log("Servant die break AutoAttack");
                    return;
                    case 1:
                        if(!skillUsed[i*3+j] && servantExist[i]){
                            useSkill(i,j,skill[i][1][j],false); 
                        }
                    break;
                    case 2:
                    break;
                }
            }
            else if(skill[i][0][j] >= 0 && currentStage >= skill[i][0][j] && !skillUsed[i*3+j]){
                useSkill(i,j,skill[i][1][j],false);
            }
        }
    }
    console.log("skill use finish");
    startAttack();
    console.log("startAttack finish");
    updateCardList();
    console.log("updateCardList finish");
    // updateUltList();
    // console.log("updateUltList finish");

    var cardScore = [0,0,0,0,0];
    var sameColorCnt=[0,0,0];
    var sameColorScore = 1.5;
    var mainColorScore = 0.3;
    if(sameColor == 0){
        sameColorScore = 0;
    }else if(sameColor == 2){
        sameColorScore = 5.5;
    }
    var weakScore = 1;
    if(weak == 0){
        weakScore = 0;
    }else if(weak == 2){
        weakScore = 5;
    }
    for(var i =0;i<5;i++){
        sameColorCnt[cardList[i]]++;
    }
    if((usedColor[0]>0 && usedColor[1] > 0)||(usedColor[0]>0 && usedColor[2] > 0)||(usedColor[1]>0 && usedColor[2] > 0)){
        sameColorCnt = [0,0,0];
    }else if(usedColor[0]>0){
        sameColorCnt[1] = 0;
        sameColorCnt[2] = 0;
    }else if(usedColor[1]>0){
        sameColorCnt[0] = 0;
        sameColorCnt[2] = 0;        
    }else if(usedColor[2]>0){
        sameColorCnt[0] = 0;
        sameColorCnt[1] = 0;        
    }
    for(var i=0;i<5;i++){
        if(sameColorCnt[cardList[i]] >= 3){
            cardScore[i] += sameColorScore;
        }
        switch(cardStatus[i]){
            case 0:
                cardScore[i] -= 100;
            break;
            case 1:
                cardScore[i] += weakScore;
            break;
            case 2:
                cardScore[i] -= weakScore;
            break;
        }
        if(cardList[i] == mainColor){
            cardScore[i] += mainColorScore;
        }
    }
    console.log("Card:"+cardList);
    console.log("Status:"+cardStatus);
    for(var i =0;i<3;i++){
        if(ult[i] >= 0 && currentStage >= ult[i]){
            useUlt(i);
        }
    }
    var m = "Select card ";
    while(true){
        if(!isScriptRunning){
            break;
        }
        var max = -10000;
        var id = -1;
        for(var i =0;i<5;i++){
            if(cardScore[i] > max){
                id = i;
                max = cardScore[i];
            }
        }
        if(id >= 0){
            m=m+(id+1)+" ";
            selectCard(id);
            cardScore[id] = -15000;
        }else{
            console.log(m);
            return;
        }
    }
}

function updateUltList(){
    ultList= [-1,-1,-1];
    return;
}

function updateCardList(){
    var cardImageScore = [];
    var screenshot = getScreenshotResize();
    //get card color
    for(var i=0;i<5;i++){
        var cropCard = cropImage(screenshot,updateCardListX[i],updateCardListY,cardWidth,cardHeight);
        for(var k=0;k<3;k++){
            var find = findImage(cropCard,cardImage[k]);
            if(cardImageScore[i] == undefined || find.score > cardImageScore[i]){
                cardImageScore[i] = find.score;
                cardList[i] = k;
            }
        }
        releaseImage(cropCard);
    }
    //get card status
    for(var i=0;i<5;i++){
        cardStatus[i] = -1;
        var cropDisable = [];
        var cropWeak = [];
        for(var j=0;j<2;j++){
            cropDisable[j] = cropImage(screenshot,
                (updateCardListX[i] + offsetDisableX[j])- 1,
                updateCardListY + offsetDisableY,
                disableW+2,
                disableH+15);
            cropWeak[j] = cropImage(screenshot,
                (updateCardListX[i] + updateCardListOffsetWeakX)- 1,
                updateCardListY + updateCardListOffsetWeakY[j],
                weakW+5,
                weakH+15);
            if(i==0){
                saveImage(cropDisable[j],imagePath+"/disable"+j+".png");
            }
        }
        if(findImage(cropDisable[0],cardImage[5]).score>=0.85 && findImage(cropDisable[1],cardImage[6]).score>=0.85) {
            cardStatus[i] = 0;
        }else if(findImage(cropWeak[0],cardImage[3]).score>=0.85){
            cardStatus[i] = 1;
        }else if(findImage(cropWeak[1],cardImage[4]).score>=0.85){
            cardStatus[i] = 2;
        }
        for(var j=0;j<2;j++){
            releaseImage(cropDisable[j]);
            releaseImage(cropWeak[j]);
        }
    }
    releaseImage(screenshot);
    if(isDebug){
        console.log("Color:"+cardList);
        console.log("Status:"+cardStatus);
    }
}

function updateServantExist(screenShot){
    var servantExistX = [222,858,1495];
    var servantExistY = 1342;
    var servantExistWidth = 50;
    var servantExistHeight = 24;

    servantExist = [true,true,true];

    for(var i = 0;i<3;i++){
        if(!checkImage(screenShot, servantExistImage, servantExistX[i], servantExistY, servantExistWidth, servantExistHeight)){
            servantExist[i] = false;
        }
    }
}

function getCurrentServant(screenShot){
    var servant = [];
    for(var i=0;i<3;i++){
        servant[i] = cropImage(screenShot,x[i]* screenScale[0] + screenOffset[0],y* screenScale[1] + screenOffset[1],300* screenScale[0],200* screenScale[1]);
    }
    return servant;
}

loadApiCnt++;
console.log("Load auto attack api finish");