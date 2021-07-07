var icon = [];

/*
var	margin = [];

if(server == "JP"){
	iconPosition[0]=[1140,616,100,50];
	iconPosition[5]=[360,640,180,40];
	iconPosition[11]=[250,40,140,30];
	iconPosition[37]=[1050,622,120,40];
}

function setMargin(){
	if(server != "JP"){
		return;
	}
	if(resolution > 2160 / 1080){
		iconPosition[0][0] = realScreenSize[0]/ screenScale[0] - 224;
		iconPosition[4][0] = realScreenSize[0]/ screenScale[0] - 203;
		iconPosition[4][1] = realScreenSize[1]/ screenScale[0] - 100;
		iconPosition[6][0] = realScreenSize[0]/ screenScale[0] - 177;
		iconPosition[7][0] = realScreenSize[0]/ screenScale[0] - 177;
		iconPosition[8][0] = realScreenSize[0]/ screenScale[0] - 250;
		iconPosition[32][0] = realScreenSize[0]/ screenScale[0] - 130;
		iconPosition[33][0] = realScreenSize[0]/ screenScale[0] - 130;
		iconPosition[34][0] = realScreenSize[0]/ screenScale[0] - 130;
		iconPosition[35][0] = realScreenSize[0]/ screenScale[0] - 130;
		currentStagePosition[0] = width-437;
		for(var i = 0; i < 9; i++){
			skillPositionX[i] += 37;
			skillPositionY = 567;
		}
	}else if(resolution > 1920 / 1080){
		margin[0] = [-224,0];
		margin[4] = [-225,0];
		margin[6] = [-177,0];
		margin[7] = [-177,0];
		margin[8] = [-250,0];
		margin[32] = [-130,0];
		margin[33] = [-130,0];
		margin[34] = [-130,0];
		margin[35] = [-130,0];
		currentStagePosition[0] = width-437;
	}
}

*/

function checkIconListInScreen(iconList,allPass,threshold){
    if(threshold == undefined){
        threshold = 0.85;
    }
    var screenshot = getScreenshotResize();
    if(screenshot == null){
        return false;
    }
    for(var i = 0;i<iconList.length;i++){
        var iconId = iconList[i];
        if(iconName[iconId] == undefined){
            console.log("checkIconInScreen no icon");
            return false;
        }
        var iconPath = imagePath+iconName[iconId]+".png";
        if(isDebug){
            console.log("checkIconInScreen open icon "+iconPath);
        }
        var iconImage = openImage(iconPath);
        var result = checkImage(screenshot,iconImage,iconPosition[iconId][0],iconPosition[iconId][1],iconPosition[iconId][2],iconPosition[iconId][3],threshold);
        releaseImage(iconImage);
        if(isDebug){
            console.log("checkIconInScreen result "+result);
        }
        if(result && !allPass){
            releaseImage(screenshot);
            return true;
        }
        if(!result && allPass){
            releaseImage(screenshot);
            return false;
        }
   }
   releaseImage(screenshot);
   return allPass;
}

function checkIconInScreen(iconId,threshold){
    if(!isScriptRunning){
        return false;
    }
    if(iconName[iconId] == undefined){
       console.log("checkIconInScreen no icon");
        return false;
    }
    var screenshot = getScreenshotResize();
    if(screenshot == null){
        return false;
    }
    if(threshold == undefined){
        threshold = 0.85;
    }
    var iconPath = imagePath+iconName[iconId]+".png";
    if(isDebug){
       console.log("checkIconInScreen open icon "+iconPath);
    }
    var iconImage = openImage(iconPath);
    var result = checkImage(screenshot,iconImage,iconPosition[iconId][0],iconPosition[iconId][1],iconPosition[iconId][2],iconPosition[iconId][3],threshold);
    releaseImage(screenshot);
    releaseImage(iconImage);
    if(isDebug){
       console.log("checkIconInScreen result "+result);
    }
    return result;
}


//select stage-----------------------------------------------
icon["main"] =  [1710,924,150,75];
icon["apple"] =  [795,67,300,75];

function isMainPage(){
	return checkIconInScreen("main");
}

function isStageRestart(){
	//TODO:TW
	return checkIconInScreen("stageRestart");
}
/*
function isStageRestartEvent(){
	//TODO: need check
	return checkIconInScreen(44);
}
*/

function isItemOrServantFullDialog(){
	//TODO: need check
	//TODO:TW
	//return checkIconListInScreen([26,27],false);
	return false;
}

function isUseAppleDialog(){
	return checkIconInScreen("apple",0.75);
}

//select friend-----------------------------------------------

icon["friendPage"] =  [1110,150,225,75];
icon["friendRefresh"] =  [840,150,240,90];
icon["friendEnd"] = [1852,1027,60,45];
icon["friendEnd3"] = [150,900,600,150];
icon["friendEmpty"] = [675,630,525,60];

function isSelectFriendPage(){
	//Align left
	return checkIconInScreen("friendPage");
}

function isSelectFriendRefreshDialog()
{	//TODO
	return checkIconListInScreen(["friendRefresh"],false);
}

function isSelectFriendEnd(){
	//TODO: need check
	return checkIconListInScreen(["friendEnd","friendEnd3"],false);
}

function isSelectFriendEmpty(){
	return checkIconInScreen("friendEmpty");
}

//select team-----------------------------------------------
icon["teamPage"] =  [1702,975,172,75];

function isSelectTeamPage(){
	//TODO: need check
	return checkIconInScreen("teamPage");
}

function isUseItemDialog(){
	//TODO: need check
	//return checkIconInScreen(5,0.75);
	return false;
}

//battle-----------------------------------------------
icon["battleMain1"] =  [1752,262,90,90];
icon["battleMain2"] =  [1752,423,90,90];
icon["battleMain3"] =  [1672,960,105,75];
icon["battleServant1"] =  [375,90,210,45];
icon["battleServant2"] =  [375,90,210,45];
icon["battleSkill"] =  [855,255,210,45];
icon["battleTarget"] =  [1620,195,60,60];

function isBattleMainPage(){
	if(checkIconListInScreen(["battleMain1","battleMain2","battleMain3"],true,0.8)){
		//if(server == "TW"){
			return true;
		//}
		/*
		// double check ring color
		var screenshot = getScreenshotResize();
		if(checkPixel(1075,665,163,146,121,screenshot)
			&& checkPixel(1135,690,191,175,150,screenshot)
			&& checkPixel(1200,665,163,146,121,screenshot)){
			releaseImage(screenshot);
			return true;
		}
		releaseImage(screenshot);
		*/
	}
	return false;
}

function isBattleCardPage(){
	// no idea to check
	return false;
}

function isBattleServantDialog(){
	//TODO: need check
	if(server == "JP"){
		return checkIconListInScreen(["battleServant1","battleServant2"],false);
	}else{
		return checkIconInScreen("battleServant1");
	}
}

function isBattleSkillFailedDialog(){
	//TODO: need check
	//return checkIconInScreen(17);
	return false;
}

function isBattleSkillDetailDialog(){
	return checkIconInScreen("battleSkill");
}

function isBattleSkillTargetDialog(){
	return checkIconInScreen("battleTarget");
}

function isBattleSkillSpaceDialog(){
	if(server == "TW"){
		return false;
	}
	//return checkIconInScreen(40,0.75);
	return false;
}

function isBattleSkillEmiyaDialog(){
	if(server == "TW"){
		return false;
	}
	//return checkIconInScreen(42,0.75);
	return false;
}

function isBattleUltFailedDialog(){
	//TODO: need check
	//TODO:TW
	//return checkIconInScreen(15);
	return false;
}


//finish-----------------------------------------------
icon["finishNext"] =  [1575,933,180,60];
icon["stageRestart"] =  [1140,810,240,75];
icon["stageFailed"] = [750,150,412,75];
icon["addFriend"] = [1710,135,120,37];

function isBattleStageFailedDialog(){
	//TODO: need check
	return checkIconInScreen("stageFailed");
}

function isFinishBondPage(){
	if(isFinishNext()){
		sleep(3000);
		if(isFinishNext()){
			return true;			
		}
	}
	tapScale(460,10);
	return false;
}

function isFinishNext(){
	return checkIconInScreen("finishNext");
}

function isFinishDropDialoge(){
	//TODO: need check
	//TODO:TW
	//return checkIconInScreen(28);
	return false;
}


function isAddFriendPage(){
	return checkIconInScreen("addFriend");
}

function isItemPage(){
	//TODO: need check
	//TODO:TW
	//return checkIconInScreen(18);
	return false;
}

//friendPoint-----------------------------------------------
icon["friendPointMain"] = [675,562,675,108];
icon["friendPointFree"] = [787,787,337,75];
icon["friendPointContinue"] = [1050,975,187,63];
icon["friendPointTen"] = [1125,787,240,75];
function isFriendPointMainPage(){
	return checkIconInScreen("friendPointMain");
}

function isFriendPointFree(){
	return checkIconInScreen("friendPointFree");
}

function isFriendPointTen(){
	return checkIconInScreen("friendPointTen");
}

/*
function isFriendPointReload(){
	//TODO: need check
	return checkIconInScreen("friendPointReload");
}
*/
function isFriendPointNew(){
	//TODO: need check
	//return checkIconInScreen(22);
	return false;
}

function isFriendPointFull(){
	//TODO: need check
	return checkIconListInScreen([24,25],false);
}

function isFriendPointContinue(){
	return checkIconInScreen("friendPointContinue");	
}

function isPresentBoxFull(){
	//TODO: need check
	return checkIconInScreen(26);
}

//getbox-----------------------------------------------
icon["boxNoPoint"] =  [360,630,195,82];

loadApiCnt++;
console.log("Load check stage api finish");