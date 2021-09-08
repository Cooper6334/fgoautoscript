function getGetFriendPoint(id) {
  return getCommandItem(
    id,
    "友抽",
    "<label>請移到友抽頁面後再執行腳本</label>"
  );
}
function getGetBox(id) {
  return getCommandItem(
    id,
    "抽箱",
    "<li><label>連續抽箱請開啟自動重置&nbsp;&nbsp;</label>" +
      "<li><label>快速模式&nbsp;&nbsp;</label>" +
      '<select id = "getBoxFast' +
      id +
      '">' +
      '<option value = "0">關閉</option>' +
      '<option value = "1" selected>開啟</option></select></li>' +
      "<label>開啟此功能較耗電</label><br><br>" +
      "<li><label>自動重置&nbsp;&nbsp;</label>" +
      '<select id = "getBoxReset' +
      id +
      '">' +
      '<option value = "0" selected>否</option>' +
      '<option value = "1">是</option></select></li>' +
      "<label>注意 自動重置開啟時，中獎後會點擊重置按鈕，想抽乾前十箱請小心</label>"
  );
}
function getSpaceUltItem(id) {
  return getCommandItem(
    id,
    "設定技能改變寶具顏色",
    "<li><label>寶具顏色&nbsp;&nbsp;</label>" +
      '<select id = "spaceUltColor' +
      id +
      '">' +
      '<option value = "2" selected>綠</option>' +
      '<option value = "1">藍</option>' +
      '<option value = "0">紅</option></select></li>' +
      "<label>執行此指令後，使用改變寶具顏色的技能會選擇指定的顏色</label>"
  );
}
function getUseSkillItem(id) {
  return getCommandItem(
    id,
    "使用技能",
    "<li><label>從者&nbsp;&nbsp;</label>" +
      '<select id = "useSkillServant' +
      id +
      '">' +
      '<option value = "0" selected>從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select></li>' +
      "<li><label>技能&nbsp;&nbsp;</label>" +
      '<select id = "useSkill' +
      id +
      '">' +
      '<option value = "0" selected>技能1</option>' +
      '<option value = "1">技能2</option>' +
      '<option value = "2">技能3</option></select></li>' +
      "<li><label>指定對象&nbsp;&nbsp;</label>" +
      '<select id = "useSkillTarget' +
      id +
      '">' +
      '<option value = "-1"selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select></li>'
  );
}
function getStartAttackItem(id) {
  return getCommandItem(id, "開始選卡");
}
function getUseUltItem(id) {
  return getCommandItem(
    id,
    "使用寶具",
    "<li><label>寶具&nbsp;&nbsp;</label>" +
      '<select id = "useUlt' +
      id +
      '">' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select></li>'
  );
}
function getSelectCardItem(id) {
  return getCommandItem(
    id,
    "選擇卡片",
    "<li><label>卡片&nbsp;&nbsp;</label>" +
      '<select id = "selectCard' +
      id +
      '">' +
      '<option value = "0">卡片1</option>' +
      '<option value = "1">卡片2</option>' +
      '<option value = "2">卡片3</option>' +
      '<option value = "3">卡片4</option>' +
      '<option value = "4">卡片5</option></select></li>'
  );
}
function getClothItem(id) {
  return getCommandItem(
    id,
    "使用衣服技能",
    "<li><label>技能&nbsp;&nbsp;</label>" +
      '<select id = "clothSkill' +
      id +
      '">' +
      '<option value = "0" selected>技能1</option>' +
      '<option value = "1">技能2</option>' +
      '<option value = "2">技能3</option></select>' +
      "<li><label>指定對象&nbsp;&nbsp;</label>" +
      '<select id = "clothSkillTarget' +
      id +
      '">' +
      '<option value = "-1"selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select>' +
      "<li><label>換人對象&nbsp;&nbsp;</label>" +
      '<select id = "clothSkillChange' +
      id +
      '">' +
      '<option value = "-1"selected>無</option>' +
      '<option value = "3">從者4</option>' +
      '<option value = "4">從者5</option>' +
      '<option value = "5">從者6</option></select></li>'
  );
}
function getAutoItem(id) {
  return getCommandItem(
    id,
    "自動戰鬥",
    "<label>直到&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "autoFightUntil' +
      id +
      '">' +
      '<option value = "3" selected>關卡結束</option>' +
      '<option value = "1">第一波結束</option>' +
      '<option value = "2">第二波結束</option>' +
      '<option value = "0">只跑一回合</option></select><br>' +
      "<label>優先選擇卡片顏色&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "autoFightColor' +
      id +
      '">' +
      '<option value = "0" selected>紅 Break</option>' +
      '<option value = "1">藍 Arts</option>' +
      '<option value = "2">綠 Quick</option></select><br>' +
      "<label>同色串&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "autoFightSameColor' +
      id +
      '">' +
      '<option value = "0">完全無視</option>' +
      '<option value = "1" selected>基本權重</option>' +
      '<option value = "2">同色優先</option></select><br>' +
      // '<label>辨識寶具顏色&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
      // '<select id = "ultColor'+id+'">'+
      // '<option value = "0">啟用</option>'+
      // '<option value = "1" selected>關閉</option></select><br>'+

      "<label>弱點&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "autoFightWeak' +
      id +
      '">' +
      '<option value = "0">完全無視</option>' +
      '<option value = "1" selected>基本權重</option>' +
      '<option value = "2">弱點優先</option></select><br>' +
      "<label>後備角色上場&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "autoFightDie' +
      id +
      '">' +
      '<option value = "0" selected>停止腳本</option>' +
      '<option value = "1">使用技能</option>' +
      '<option value = "2">不使用技能</option></select><br>' +
      "<li><label>從者一設定&nbsp;&nbsp;&nbsp;</label><br>&nbsp;&nbsp;&nbsp;&nbsp;" +
      "<label>寶具&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant0ult' +
      id +
      '">' +
      '<option value = "-1">不使用</option>' +
      '<option value = "0" selected>自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>技能一&nbsp;&nbsp;</label>" +
      '<select id = "servant0skill0' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>對象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant0skill0target' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>技能二&nbsp;&nbsp;</label>" +
      '<select id = "servant0skill1' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>對象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant0skill1target' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>技能三&nbsp;&nbsp;</label>" +
      '<select id = "servant0skill2' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>對象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant0skill2target' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select></li><br>' +
      "<li><label>從者二設定&nbsp;&nbsp;&nbsp;</label><br>&nbsp;&nbsp;&nbsp;&nbsp;" +
      "<label>寶具&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant1ult' +
      id +
      '">' +
      '<option value = "-1">不使用</option>' +
      '<option value = "0" selected>自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>技能一&nbsp;&nbsp;</label>" +
      '<select id = "servant1skill0' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>對象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant1skill0target' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>技能二&nbsp;&nbsp;</label>" +
      '<select id = "servant1skill1' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>對象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant1skill1target' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>技能三&nbsp;&nbsp;</label>" +
      '<select id = "servant1skill2' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>對象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant1skill2target' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select></li><br>' +
      "<li><label>從者三設定&nbsp;&nbsp;&nbsp;</label><br>&nbsp;&nbsp;&nbsp;&nbsp;" +
      "<label>寶具&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant2ult' +
      id +
      '">' +
      '<option value = "-1">不使用</option>' +
      '<option value = "0" selected>自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>技能一&nbsp;&nbsp;</label>" +
      '<select id = "servant2skill0' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>對象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant2skill0target' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>技能二&nbsp;&nbsp;</label>" +
      '<select id = "servant2skill1' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>對象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant2skill1target' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>技能三&nbsp;&nbsp;</label>" +
      '<select id = "servant2skill2' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">自動使用</option>' +
      '<option value = "1">第二波開始使用</option>' +
      '<option value = "2">第三波開始使用</option></select><br>&nbsp;&nbsp;&nbsp;&nbsp;' +
      "<label>對象&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "servant2skill2target' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">從者1</option>' +
      '<option value = "1">從者2</option>' +
      '<option value = "2">從者3</option></select></li><br>'
  );
}
function getSelectEnemy(id) {
  return getCommandItem(
    id,
    "選擇敵人",
    "<li><label>敵人&nbsp;&nbsp;</label>" +
      '<select id = "selectEnemy' +
      id +
      '">' +
      '<option value = "0">敵人1</option>' +
      '<option value = "1">敵人2</option>' +
      '<option value = "2">敵人3</option></select></li>'
  );
}
function getFinishItem(id) {
  return getCommandItem(id, "結束關卡");
}
function getSelectStage(id) {
  return getCommandItem(
    id,
    "選擇關卡",
    "<label>開啟畫面上方的任務</label><br>" +
      "<li><label>自動吃果&nbsp;&nbsp;</label>" +
      '<select id = "autoApple' +
      id +
      '">' +
      '<option value = "-1" selected>無</option>' +
      '<option value = "0">銅蘋果</option>' +
      '<option value = "1">銀蘋果</option>' +
      '<option value = "2">金蘋果</option>' +
      '<option value = "4">自然回體</option>' +
      '<option value = "3">聖晶石</option></select></li>'
  );
}
function getSelectFriend(id) {
  return getCommandItem(
    id,
    "選擇好友",
    "<label>辨識準確度持續改進中</label><br>" +
      "<li><label>搜尋職階&nbsp;&nbsp;</label><br>" +
      '<input type="checkbox" id = "selectFriend0' +
      id +
      '">全&nbsp' +
      '<input type="checkbox" id = "selectFriend1' +
      id +
      '">劍&nbsp' +
      '<input type="checkbox" id = "selectFriend2' +
      id +
      '">弓&nbsp' +
      '<input type="checkbox" id = "selectFriend3' +
      id +
      '">槍&nbsp' +
      '<input type="checkbox" id = "selectFriend4' +
      id +
      '">騎&nbsp<br>' +
      '<input type="checkbox" id = "selectFriend5' +
      id +
      '" checked>術&nbsp' +
      '<input type="checkbox" id = "selectFriend6' +
      id +
      '">殺&nbsp' +
      '<input type="checkbox" id = "selectFriend7' +
      id +
      '">狂&nbsp' +
      '<input type="checkbox" id = "selectFriend8' +
      id +
      '">特&nbsp' +
      '<input type="checkbox" id = "selectFriend9' +
      id +
      '">混<br>' +
      "<li><label>指定從者&nbsp;&nbsp;</label>" +
      '<select id = "selectFriendServant' +
      id +
      '">' +
      '<option value = "-1" selected>無</option></select>&nbsp;&nbsp;' +
      '<img id = "selectFriendServantImg' +
      id +
      '" height = "40" width = "60"></li>' +
      "<li><label>指定禮裝&nbsp;&nbsp;</label>" +
      '<select id = "selectFriendItem' +
      id +
      '">' +
      '<option value = "-1" selected>無</option></select>&nbsp;&nbsp;' +
      '<img id = "selectFriendItemImg' +
      id +
      '" height = "20" width = "60"></li>' +
      "<li><label>指定突滿&nbsp;&nbsp;</label>" +
      '<select id = "selectFriendItemFull' +
      id +
      '">' +
      '<option value = "0">不限制</option>' +
      '<option value = "1" selected>突滿</option></select></li>' +
      "<li><label>限定好友&nbsp;&nbsp;</label>" +
      '<select id = "selectFriendOnlyFriend' +
      id +
      '">' +
      '<option value = "0" selected>不限制</option>' +
      '<option value = "1">僅限好友</option></select></li>' +
      "<li><label>下拉次數&nbsp;&nbsp;</label>" +
      '<select id = "selectFriendScrollCnt' +
      id +
      '">' +
      '<option value = "-1" selected>到最後</option>' +
      '<option value = "0">不下拉</option>' +
      '<option value = "1">一次</option>' +
      '<option value = "2">兩次</option>' +
      '<option value = "3">三次</option></select></li>'
  );
}
function getSelectTeam(id) {
  return getCommandItem(
    id,
    "選擇隊伍",
    "<li><label>隊伍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>" +
      '<select id = "selectTeam' +
      id +
      '">' +
      '<option value = "0" selected>隊伍1</option>' +
      '<option value = "1">隊伍2</option>' +
      '<option value = "2">隊伍3</option>' +
      '<option value = "3">隊伍4</option>' +
      '<option value = "4">隊伍5</option>' +
      '<option value = "5">隊伍6</option>' +
      '<option value = "6">隊伍7</option>' +
      '<option value = "7">隊伍8</option>' +
      '<option value = "8">隊伍9</option>' +
      '<option value = "9">隊伍10</option></select></li>'
  );
}
function getStartQuest(id) {
  return getCommandItem(
    id,
    "進入關卡",
    "<li><label>使用活動道具&nbsp;&nbsp;</label>" +
      '<select id = "useItem' +
      id +
      '">' +
      '<option value = "-1" selected>不使用</option>' +
      '<option value = "0">一</option>' +
      '<option value = "1">二</option>' +
      '<option value = "2">三</option>' +
      '<option value = "3">四</option>' +
      '<option value = "4">五</option>' +
      '<option value = "5">六</option></select></li>'
  );
}
