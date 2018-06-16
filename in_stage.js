//-----------------------------------------------------in quest
function startAttack(){ 
    if(!isScriptRunning){
        return;
    }
    waitUntilPlayerCanMove();
    tapScale(2250,1115,100);
    sleep(5000);
}
function checkPlayerCanMove(){
    var screenShot = getScreenshot();
    var x = [2150,2320,2320];
    var y = [1285,370,600];
    var w = [220,120,120];
    var h = [65,80,80];
    for(var i = 0;i<3;i++){
        if(!checkImage(screenShot,selectStartImage[i],x[i],y[i],w[i],h[i])){
            releaseImage(screenShot);
            return false;
        }
    }
    releaseImage(screenShot);
    return true;
}



function waitUntilPlayerCanMove(){
    while(true){
        if(!isScriptRunning){
            return;
        }
        sleep(3000);
        console.log("waitUntilPlayerCanMove");
        if(checkPlayerCanMove()){
            return;
        }
    }
}

function waitUntilPlayerCanMoveOrFinish(){
    while(true){
        if(!isScriptRunning){
            return;
        }
        sleep(5000);
        console.log("waitUntilPlayerCanMoveOrFinish");
        if(checkPlayerCanMove()){
            return;
        }
        if(isQuestFinish()){
            return;            
        }
    }
}

function selectCard(card){
    if(!isScriptRunning){
        return;
    }
    console.log("selectCard "+card);
    if(card == 0){
        tapScale(250,1035,100);
    }else if(card == 1){
        tapScale(800,1035,100);
    }else if(card == 2){
        tapScale(1250,1035,100);
    }else if(card == 3){
        tapScale(1800,1035,100);
    }else if(card == 4){
        tapScale(2350,1035,100);
    }
    sleep(500);
}

function useUlt(player){
    if(!isScriptRunning){
        return;
    }
    console.log("useUlt "+player);
    if(player == 0){
        tapScale(800,435,100);
    }else if(player == 1){
        tapScale(1250,435,100);
    }else if(player == 2){
        tapScale(1800,435,100);
    }
    sleep(500);
}

function useSkill(player,skill,target,checkUsed){
    if(!isScriptRunning){
        return;
    }
    console.log("useSkill "+player+","+skill+","+target);
    if(target == undefined || target < 0){
        target = 0;
    }
    waitUntilPlayerCanMove();
    if(checkUsed == undefined || checkUsed == true){
        var skillUsedPosition = [62,251,436,696,884,1071,1335,1523,1710];
        var screenShot = getScreenshot();
        if(checkImage(screenShot,skillUsedImage,skillUsedPosition[player*3+skill],1200,37,33)){
            console.log("skill already used");
            releaseImage(screenShot);
            return;
        }
        releaseImage(screenShot);
    }
    if(player == 0){
        if(skill == 0){
            tapScale(100,1135,100);
        }else if(skill == 1){
            tapScale(300,1135,100);
        }else if(skill == 2){
            tapScale(500,1135,100);
        }
    }
    else if(player == 1){
        if(skill == 0){
            tapScale(750,1135,100);
        }else if(skill == 1){
            tapScale(950,1135,100);
        }else if(skill == 2){
            tapScale(1150,1135,100);         
        }
    }
    else if(player == 2){
        if(skill == 0){
            tapScale(1400,1135,100);
        }else if(skill == 1){
            tapScale(1600,1135,100);
        }else if(skill == 2){
            tapScale(1800,1135,100);
        }
    }
    sleep(500);    
    if(!isScriptRunning){
        return;
    }
    var screenShot2 = getScreenshot();
    if(checkImage(screenShot2,skillNullImage,2085,142,69,67)){
        tapScale(2100,170,100);
        releaseImage(screenShot2);
        return;
    }
    if(checkImage(screenShot2,skillCheckImage,1070,325,420,85)){
        tapScale(1700,850,100);
        sleep(500);
        var screenShot3 = getScreenshot();
        if(checkImage(screenShot3,skillCheckImage,1070,325,420,85)){
            tapScale(800,850,100);
        }else {
            selectSkillTarget(target);
        }
        releaseImage(screenShot3);
    }else {
        selectSkillTarget(target);
    }
    releaseImage(screenShot2);
    sleep(1000);
}

function selectSkillTarget(player){
    if(!isScriptRunning){
        return;
    }
    if(player == 0){
        tapScale(650,850,100);
        //will also cancel used skill
    }else if(player == 1){
        tapScale(1250,935,100);
    }else if(player == 2){
        tapScale(1850,935,100);
    }
}

function useClothesSkill(skill,target1,target2){
    if(!isScriptRunning){
        return;
    }
    waitUntilPlayerCanMove();
    console.log("useClothesSkill "+skill);
    tapScale(2400,635,100);
    sleep(1000);
    if(skill == 0){
        tapScale(1800,635,100);
    }else if(skill == 1){
        tapScale(1975,635,100);
    }else if(skill == 2){
        tapScale(2150,635,100);
    }
    sleep(1000);
    if(target1 != undefined && (target2 == undefined || target2 == -1)){
        selectSkillTarget(target1);
    }else if(target1!=undefined && target2 !=undefined){
        changePlayer(target1,target2);
    }
}

function selectEnemy(enemy){
    if(!isScriptRunning){
        return;
    }
    switch(enemy){
        case 0:
        tapScale(1160,85,100);
        break;
        case 1:
        tapScale(680,85,100);
        break;
        case 2:
        tapScale(230,85,100);
        break;
    }
    
}

function changePlayer(target1,target2){
    if(!isScriptRunning){
        return;
    }
    console.log("useClothesSkill "+target1 +","+target2);
    if(target1 == 0 || target2 == 0){
        tapScale(275,735,100);
        sleep(300);
    }
    if(target1 == 1 || target2 == 1){
        tapScale(675,735,100);
        sleep(300);
    }
    if(target1 == 2 || target2 == 2){
        tapScale(1075,735,100);
        sleep(300);
    }
    if(target1 == 3 || target2 == 3){
        tapScale(1475,735,100);
        sleep(300);
    }
    if(target1 == 4 || target2 == 4){
        tapScale(1875,735,100);
        sleep(300);
    }
    if(target1 == 5 || target2 == 5){
        tapScale(2275,735,100);
        sleep(300);
    }
    tapScale(1300,1260,100);
}

function getCurrentStage(){
    var width = 50* screenScale[0];
    var height = 50* screenScale[1];
    var screenShot = getScreenshot();
    var crop = cropImage(screenShot,1720 * screenScale[0] + screenOffset[0],25 * screenScale[1] + screenOffset[1],width,height);
    var score = [];
    for(var i=0;i<3;i++){
        var scaleImage = resizeImage(currentStageImage[i],width,height);
        score[i] = getIdentityScore(crop,scaleImage);
        releaseImage(scaleImage);
    }
    releaseImage(crop);
    releaseImage(screenShot);
    var result;
    if(score[0]>=score[1] && score[0]>=score[2]){
        result = 0;
    }else     if(score[1]>=score[0] && score[1]>score[2]){
        result = 1;
    }else{
        result = 2;
    }
    return result;
}

function isQuestFinish(){
    var positionX = [793,141,990,1294,222,215,1792];
    var positionY = [1294,317,165,362,142,137,1191];
    var positionW = [120,649,230,373,545,2141,221];
    var positionH = [77,113,285,89,77,233,60];
    var screenShot = getScreenshot();
    for(var j=0;j<7;j++){
        if(checkImage(screenShot,finishStageImage[j],positionX[j],positionY[j],positionW[j],positionH[j])){
            releaseImage(screenShot);
            return true;
        }
    }
    releaseImage(screenShot);
    return false;
}


console.log("Load in stage api finish");