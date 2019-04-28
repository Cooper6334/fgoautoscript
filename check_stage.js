
var iconName = ["main","apple","friendPage","friendRefresh","teamPage","teamItem",
"battleMain1","battleMain2","battleMain3","finish1","finish2",
"battleServant","battleSkill","battleTarget","addFriend","ultFailed",
"stageFailed","skillFailed","itemDetail"];
var iconPosition = [[1140,650,100,50],[530,30,200,60],[740,100,150,50],[560,100,160,60],[1135,650,115,50],[400,50,400,50],
[1168,175,60,60],[1168,282,60,60],[1100,630,70,50],[60,150,240,50],[700,320,280,40],
[560,70,150,40],[570,170,140,30],[1080,130,40,40],[60,70,100,55],[600,425,82,40],
[500,100,275,50],[580,535,120,40],[550,110,70,50]];
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
	return checkIconListInScreen([6,7,8],true);
}

function isBattleCardPage(){
	// no idea to check
	return false;
}

function isBattleServantDialog(){
	return checkIconInScreen(11);
}

function isBattleSkillFailedDialog(){
	return checkIconInScreen(17);
}

function isBattleSkillDetailDialog(){
	return checkIconInScreen(12);
}

function isBattleSkillTargetDialog(){
	return checkIconInScreen(13);
}

function isBattleUltFailedDialog(){
	return checkIconInScreen(15);
}

function isBattleStageFailedDialog(){
	return checkIconInScreen(16);
}

//finish
function isFinishBondPage(){
	return checkIconListInScreen([9,10],false);
}

function isAddFriendPage(){
	return checkIconInScreen(14);
}

function isItemPage(){
	return checkIconInScreen(18);	
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