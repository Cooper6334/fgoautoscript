
var iconName = ["crop_1140_650_100_50","crop_530_30_200_60","crop_1040_0_220_60","crop_560_100_160_60","team","crop_400_50_400_50",
"crop_1168_175_60_60","crop_1168_282_60_60","crop_1220_0_60_60","crop_1100_630_70_50","crop_60_150_240_50"];
var iconPosition = [[1140,650,100,50],[530,30,200,60],[1040,0,220,60],[560,100,160,60],[1040,0,220,60],[400,50,400,50],
[1168,175,60,60],[1168,282,60,60],[1220,0,60,60],[1100,630,70,50],[60,150,240,50]];
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
	return false;
}

function isBattleSkillFailedDialog(){
	return false;
}

function isBattleSkillDetailDialog(){
	return false;
}

function isBattleSkillTargetDialog(){
	return false;
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
	
}

function checkAllPage(){
	var name = ["main","apple","friend","refresh","team","item","battle","bond","isItemOrServantFullDialog"];
	var result = [];
	result[0] = isMainPage();
	result[1] = isUseAppleDialog();
	result[2] = isSelectFriendPage();
	result[3] = isSelectFriendRefreshDialog();
	result[4] = isSelectTeamPage();
	result[5] = isUseItemDialog();
	result[6] = isBattleMainPage();
	result[7] = isFinishBondPage();
	result[8] = isItemOrServantFullDialog();
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