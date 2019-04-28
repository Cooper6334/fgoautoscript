
var iconName = ["crop_1140_650_100_50","crop_530_30_200_60","friendPage","crop_560_100_160_60","teamPage","crop_400_50_400_50",
"crop_1168_175_60_60","crop_1168_282_60_60","crop_1220_0_60_60","crop_1100_630_70_50","crop_60_150_240_50",
"crop_560_70_150_40","crop_570_170_140_30","crop_1080_130_40_40","addFriend"];
var iconPosition = [[1140,650,100,50],[530,30,200,60],[740,100,150,50],[560,100,160,60],[1135,650,115,50],[400,50,400,50],
[1168,175,60,60],[1168,282,60,60],[1220,0,60,60],[1100,630,70,50],[60,150,240,50],
[560,70,150,40],[570,170,140,30],[1080,130,40,40],[60,70,100,55]];
//select stage
function isMainPage(){
	return checkIconInScreen(0);
}

function isItemOrServantFullDialog(){
	return false;
}


function isUseAppleDialog(){
	return checkIconInScreen(1);
}

//select friend
function isSelectFriendPage(){
	return checkIconInScreen(2);
}

function isSelectFriendRefreshDialog(){
	return checkIconInScreen(3);
}

//select team
function isSelectTeamPage(){
	return checkIconInScreen(4);
}

function isUseItemDialog(){
	return checkIconInScreen(5);
}

//battle
function isBattleMainPage(){
	var r =  checkIconListInScreen([6,7,8,9],true);
	if(!r){
		return false;
	}
	sleep(500);
	return checkIconListInScreen([6,7,8,9],true);
}

function isBattleCardPage(){
	return false;
}

function isBattleServantDialog(){
	return checkIconInScreen(11);
}

function isBattleSkillFailedDialog(){
	return false;
}

function isBattleSkillDetailDialog(){
	return checkIconInScreen(12);
}

function isBattleSkillTargetDialog(){
	return checkIconInScreen(13);
}

function isBattleUltFailedDialog(){
	return false;
}

function isBattleStageFailedDialog(){
	return false;
}

//finish
function isFinishBondPage(){
	var r = checkIconListInScreen([10],false);
	if(!r){
		return false;
	}
	sleep(500);
	return checkIconListInScreen([10],false);
}

function isAddFriendPage(){
	return checkIconListInScreen([14],false);	
}

function checkAllPage(){
	var name = ["main","itemFull","apple","friend","refresh","team","item","battleMain","battleCard","battleServant","skillFailed","skillDetail","skillTarget","ultFailed","stageFailed","bond"];
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