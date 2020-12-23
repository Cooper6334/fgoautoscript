
var iconName = ["main","apple","friendPage","friendRefresh","teamPage","teamItem",
"battleMain1","battleMain2","battleMain3","finish1","finish2",
"battleServant","battleSkill","battleTarget","addFriend","ultFailed",
"stageFailed","skillFailed","itemDetail","friendPointMain","friendPointFree",
"friendPointTen","friendPointNew","friendPointReload","friendPointItemFull","friendPointServantFull",
"selectStageItemFull","selectStageServantFull","finishDrop","finish3","addFriend2",
"friendRefresh2","friendEnd","friendEnd2","friendEnd3","friendEnd4",
"friendEmpty","finishNext","friendPointContinue","stageRestart","spaceColor",
"swim1","emiyaColor","battleServant2","stageRestartEvent"];
//TODO: update image for friend end
var	iconPosition = [[1140,650,100,50],[530,45,200,50],[740,100,150,50],[560,100,160,60],[1135,650,115,50],[400,50,400,50],
		[1168,175,60,60],[1168,282,60,60],[1115,640,70,50],[60,150,240,50],[1000,90,230,120],
		[560,70,150,40],[570,170,140,30],[1080,130,40,40],[60,70,100,55],[600,425,82,40],
		[500,100,275,50],[580,535,120,40],[0,0,70,80],[450,375,450,72],[525,525,225,50],
		[750,525,160,50],[1015,650,150,50],[700,650,125,42],[325,150,600,125],[325,150,600,125],
		[325,150,600,125],[325,150,600,125],[150,70,170,40],[700,350,280,40],[60,70,100,55],
		[560,100,160,60],[1220,685,40,30],[1220,685,40,30],[100,600,400,100],[100,600,400,100],
		[450,420,350,40],[1050,660,120,40],[700,650,125,42],[760,540,160,50],[460,160,360,60],
		[203,30,100,12],[460,160,360,60],[500,40,140,30],[560,540,160,50]];

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
		iconPosition[0][0] = realScreenSize[0] - 224;
		iconPosition[4][0] = realScreenSize[0] - 203;
		iconPosition[4][1] = realScreenSize[1] - 100;
		iconPosition[6][0] = realScreenSize[0] - 177;
		iconPosition[7][0] = realScreenSize[0] - 177;
		iconPosition[8][0] = realScreenSize[0] - 250;
		iconPosition[32][0] = realScreenSize[0] - 130;
		iconPosition[33][0] = realScreenSize[0] - 130;
		iconPosition[34][0] = realScreenSize[0] - 130;
		iconPosition[35][0] = realScreenSize[0] - 130;
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

function saveCropIcon(id){
    var path = getStoragePath();
    var x = iconPosition[id][0];
    var y = iconPosition[id][1];
    var width = iconPosition[id][2];
    var height = iconPosition[id][3];
    var filepath = path+"/cropImage/"+iconName[id]+".png";
    var screenshot = getScreenshotResize();
    var crop = cropImage(screenshot,x,y,width,height);
    saveImage(crop,filepath);
    releaseImage(screenshot);
    releaseImage(crop);
    console.log("save crop at "+filepath);
}

//select stage
function isMainPage(){
	return checkIconInScreen(0);
}

function isStageRestart(){
	//TODO:TW
	return checkIconInScreen(39);
}

function isStageRestartEvent(){
	//TODO: need check
	return checkIconInScreen(44);
}

function isItemOrServantFullDialog(){
	//TODO: need check
	//TODO:TW
	return checkIconListInScreen([26,27],false);
}

function isUseAppleDialog(){
	return checkIconInScreen(1,0.75);
}

//select friend
function isSelectFriendPage(){
	//Align left
	return checkIconInScreen(2);
}

function isSelectFriendRefreshDialog(){
	return checkIconListInScreen([3,31],false);
}

function isSelectFriendEnd(){
	//TODO: need check
	return checkIconListInScreen([32,33,34,35],false);
}

function isSelectFriendEmpty(){
	//TODO:TW
	//TODO: need check
	return checkIconInScreen(36);
}

//select team
function isSelectTeamPage(){
	//TODO: need check
	return checkIconInScreen(4);
}

function isUseItemDialog(){
	//TODO: need check
	return checkIconInScreen(5,0.75);
}

//battle
function isBattleMainPage(){
	if(checkIconListInScreen([6,7,8],true,0.8)){
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
		return checkIconListInScreen([11,43],true);
	}else{
		return checkIconInScreen(11);
	}
}

function isBattleSkillFailedDialog(){
	//TODO: need check
	return checkIconInScreen(17);
}

function isBattleSkillDetailDialog(){
	return checkIconInScreen(12);
}

function isBattleSkillTargetDialog(){
	return checkIconInScreen(13);
}

function isBattleSkillSpaceDialog(){
	if(server == "TW"){
		return false;
	}
	return checkIconInScreen(40,0.75);
}

function isBattleSkillEmiyaDialog(){
	if(server == "TW"){
		return false;
	}
	return checkIconInScreen(42,0.75);
}

function isBattleUltFailedDialog(){
	//TODO: need check
	//TODO:TW
	return checkIconInScreen(15);
}

function isBattleStageFailedDialog(){
	//TODO: need check
	return checkIconInScreen(16);
}

//finish
function isFinishBondPage(){
	if(isFinishNext()){
		sleep(3000);
		if(isFinishNext()){
			return true;			
		}
	}
	tapScale(230,5);
	return false;
}

function isFinishDropDialoge(){
	//TODO: need check
	//TODO:TW
	return checkIconInScreen(28);
}

function isFinishNext(){
	return checkIconInScreen(37);
}

function isAddFriendPage(){
	return checkIconListInScreen([14,30],false,0.8);
}

function isItemPage(){
	//TODO: need check
	//TODO:TW
	return checkIconInScreen(18);
}

function isFriendPointMainPage(){
	return checkIconInScreen(19);
}

function isFriendPointFree(){
	return checkIconInScreen(20);
}

function isFriendPointTen(){
	return checkIconInScreen(21);
}

function isFriendPointReload(){
	//TODO: need check
	return checkIconInScreen(23);
}

function isFriendPointNew(){
	//TODO: need check
	return checkIconInScreen(22);
}

function isFriendPointFull(){
	//TODO: need check
	return checkIconListInScreen([24,25],false);
}

function isFriendPointContinue(){
	//TODO: need check	
	if(server == "TW"){
		return false;
	}
	return checkIconInScreen(38);	
}

function isPresentBoxFull(){
	//TODO: need check
	return checkIconInScreen(26);
}

function isSwimEvent(){
	return false;
	//return checkIconInScreen(41);
}

function checkAllPage(){
	var name = ["main","itemFull","apple","friend","refresh","team","item","battleMain","battleCard","battleServant","skillFailed","skillDetail","skillTarget","ultFailed","stageFailed","bond","addFriend","item"];
	var result = [];
	result[0] = isMainPage();
	result[1] = isItemOrServantFullDialog();
	result[2] = isUseAppleDialog();
	result[3] = isSelectFriendPage();
	result[4] = isSelectFriendRefreshDialog();
	result[5] = isSelectTeamPage();
	result[6] = isUseItemDialog();
	result[7] = isBattleMainPage();
	result[8] = isBattleCardPage();
	result[9] = isBattleServantDialog();
	result[10] = isBattleSkillFailedDialog();
	result[11] = isBattleSkillDetailDialog();
	result[12] = isBattleSkillTargetDialog();
	result[13] = isBattleUltFailedDialog();
	result[14] = isBattleStageFailedDialog();
	result[15] = isFinishBondPage();
	result[16] = isAddFriendPage();
	result[17] = isItemPage();
	var inPage = false;
    for(var i = 0;i<result.length;i++){
    	if(result[i]){
    		inPage = true;
    		console.log("is in page "+name[i]);
    	}
    }
    if(!inPage){
    	console.log("not in any page");
    }
}

loadApiCnt++;
console.log("Load check stage api finish");