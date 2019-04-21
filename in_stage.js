//-----------------------------------------------------in quest
var cardPositionX = [125,400,625,900,1175];
var cardPositionY = 517;
var ultPositionX = [400,625,900];
var ultPositionY = 125;
var skillPositionX = [50,150,250,375,475,475,700,800,900];
var skillPositionY = 567;
var skillTargetX = [325,625,925];
var skillTargetY = 425;
var clothSkillX = [900,987,1075];
var clothSkillY = 317;
var enemyPositionX = [580,340,115];
var enemyPositionY = 42;
var currentStagePosition = [860,12,25,25];
//----------------------------------------------Battle main page
function startAttack(){ 
    if(!isScriptRunning){
        return;
    }
    if(!waitUntilPlayerCanMove()){
        return;
    }
    tapScale(1125,558);
    sleep(5000);
}

function useSkill(player,skill,target){
    if(!waitUntilPlayerCanMove()){
        return;
    }
    console.log("useSkill servent "+(player+1)+", skill "+(skill+1)+", target "+(target+1));
    if(target == undefined || target < 0){
        target = 0;
    }
    if(!waitUntilPlayerCanMove()){
        return;
    }
    tapScale(skillPositionX[player*3+skill],skillPositionY);
    sleep(1000);
    if(!isScriptRunning){
        return;
    }
    if(isBattleServantDialog()){
        //skill null
        tapScale(1050,85);
        return;
    }
    else if(isBattleSkillFailedDialog()){
        //skill can not use
        tapScale(640,555);
        releaseImage(screenShot2);
        return;
    }
    else if(isBattleSkillDetailDialog()){
        //need confirm or in cd
        tapScale(850,425);
        sleep(500);
        if(isBattleSkillDetailDialog()){
            //in cd
            tapScale(400,425);
        }else {
            selectSkillTarget(target);
        }
    }else {
        selectSkillTarget(target);        
    }
}

function selectSkillTarget(player){
    if(!isScriptRunning){
        return;
    }
    for(var checkTarget = 0;checkTarget<3;checkTarget++){
        sleep(1000);
        if(!isBattleSkillTargetDialog()){
            return;
        }
        switch(checkTarget){
            case 0:
                console.log("Select skill target "+(player+1));
                tapScale(skillTargetX[player],skillTargetY);
                break;
            case 1:
                console.log("Two servant left, select again");
                var offset = 150;
                if(player == 2){
                    offset = -150;
                }
                tapScale(skillTargetX[player]+offset,skillTargetY);
                break;
            case 2:
                console.log("Only one servant left");
                tapScale(skillTargetX[1],skillTargetY);
                break;
        }
    }
}

function useClothesSkill(skill,target1,target2){
    if(!waitUntilPlayerCanMove()){
        return;
    }
    console.log("useClothesSkill "+(skill+1));
    tapScale(1200,317);
    sleep(1000);
    tapScale(clothSkillX[skill],clothSkillY);
    sleep(1000);
    if(isBattleSkillDetailDialog()){
        tapScale(850,425);
        sleep(500);
        if(isBattleSkillDetailDialog()){
            //in cd
            tapScale(400,425);
            sleep(1000);
            tapScale(1200,317);
        }        
    }
    if(target1 != undefined && (target2 == undefined || target2 == -1)){
        selectSkillTarget(target1);
    }else if(target1!=undefined && target2 !=undefined){
        changePlayer(target1,target2);
    }
    sleep(1000);    
    if(isBattleServantDialog()){
        //skill null
        tapScale(1050,85);
        return;
    }
}

function selectEnemy(enemy){
    if(!waitUntilPlayerCanMove()){
        return;
    }
    waitUntilPlayerCanMove();
    tapScale(enemyPositionX[enemy],enemyPositionY);
}

function changePlayer(target1,target2){
    if(!isScriptRunning){
        return;
    }
    console.log("useClothesSkill "+(target1+1) +","+(target2+1));
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
    var screenshot = getScreenshotResize();
    var crop = cropImage(screenshot,currentStagePosition[0],currentStagePosition[1],currentStagePosition[2],currentStagePosition[3]);
    var score = [];
    for(var i=0;i<3;i++){
        var imagePath = imagePath+"/stage"+i+".png";
        var stageImage = openImage(imagePath);
        score[i] = getIdentityScore(crop,stageImage);
        releaseImage(stageImage);
    }
    releaseImage(crop);
    releaseImage(screenshot);
    var result;
    if(score[0]>=score[1] && score[0]>=score[2]){
        result = 0;
    }else if(score[1]>=score[0] && score[1]>score[2]){
        result = 1;
    }else{
        result = 2;
    }
    return result;
}

//-------------------------------------------------------Battle card apge
function selectCard(card){
    if(!isScriptRunning){
        return;
    }
    tapScale(cardPositionX[card],cardPositionY);
    sleep(500);
}

function useUlt(player){
    if(!isScriptRunning){
        return;
    }
    console.log("use servent "+(player+1)+" ult");
    tapScale(ultPositionX[player],ultPositionY);
    sleep(1000);
    if(isBattleUltFailedDialog()){
        tapScale(640,440);
        sleep(500);
    }
}

//---------------------------------------------Battle next
function waitUntilPlayerCanMove(){
    //double check
    while(true){
        if(!isScriptRunning){
            return false;
        }
        if(isBattleMainPage()){
            sleep(1000);
            if(isBattleMainPage()){
                return true;
            }
        }
        sleep(1000);
    }
}

function waitUntilPlayerCanMoveOrFinish(){
    //double check
    while(true){
        if(!isScriptRunning){
            return false;
        }
        if(isBattleMainPage()){
            sleep(1000);
            if(isBattleMainPage()){
                return true;
            }
        }
        if(isFinishBondPage()){
            sleep(1000);
            if(isFinishBondPage()){
                return false;
            }
        }
        if(isBattleStageFailedDialog()){
            sleep(1000);
            if(isBattleStageFailedDialog()){
                return false;
            }
        }
        sleep(1000);
    }
}

function finishQuest(){
    while(true){
        if(!isScriptRunning){
            return;
        }
        if(isMainPage()){
            return;
        }
        if(isAddFriendPage()){

        }else{
            tapScale();
            sleep(500);
            tapScale();
        }
    }
}

loadApiCnt++;
console.log("Load in stage api finish");