//var server = "JP"
var server = "TW";

var version = "";
var commandId = 0;
var scriptCnt = 0;
var friendServantList = [];
var friendItemList = [];
var storagePath;
var servantImgPath;
var itemImgPath;
var insertDirection = 0;
var listenScriptMode = true;

$(function () {
  initButton();
  setTimeout(function () {
    JavaScriptInterface.showMenu();
    JavaScriptInterface.runScriptCallback(
      'initHTML("' + server + '");',
      "initHTML"
    );
  }, 1500);
});

function initButton() {
  //set loop btn
  $("#loopTime1").click(function () {
    var t = $("#loopTime").val();
    var n = 1;
    $("#loopTime").val(n);
  });
  $("#loopTimePlus").click(function () {
    var t = $("#loopTime").val();
    var n = 0;
    if (t == "無限") {
      n = 1;
    } else {
      n = parseInt(t) + 1;
    }
    $("#loopTime").val(n);
  });
  $("#loopTimePlus5").click(function () {
    var t = $("#loopTime").val();
    var n = 0;
    if (t == "無限") {
      n = 5;
    } else {
      n = parseInt(t) + 5;
    }
    $("#loopTime").val(n);
  });
  $("#loopTimeMinus").click(function () {
    var t = $("#loopTime").val();
    var n = 0;
    if (t == "無限") {
      n = 1;
    } else {
      n = parseInt(t) - 1;
    }
    if (n <= 0) {
      n = 1;
    }
    $("#loopTime").val(n);
  });
  $("#loopTimeInfinite").click(function () {
    $("#loopTime").val("無限");
  });

  //set crop btn
  $("#getServantImage1").click(function () {
    JavaScriptInterface.hideMenu();
    JavaScriptInterface.setXY(3000, 0);
    JavaScriptInterface.runScriptCallback(
      "saveFriendServantImage(1);",
      "saveServantConfirm"
    );
  });
  $("#getServantImage2").click(function () {
    JavaScriptInterface.hideMenu();
    JavaScriptInterface.setXY(3000, 0);
    JavaScriptInterface.runScriptCallback(
      "saveFriendServantImage(2);",
      "saveServantConfirm"
    );
  });
  $("#getItemImage1").click(function () {
    JavaScriptInterface.hideMenu();
    JavaScriptInterface.setXY(3000, 0);
    JavaScriptInterface.runScriptCallback(
      "saveFriendItemImage(1);",
      "saveItemConfirm"
    );
  });
  $("#getItemImage2").click(function () {
    JavaScriptInterface.hideMenu();
    JavaScriptInterface.setXY(3000, 0);
    JavaScriptInterface.runScriptCallback(
      "saveFriendItemImage(2);",
      "saveItemConfirm"
    );
  });

  //set add default script btn
  $("#addAllFlow").click(function () {
    var currentDirection = insertDirection;
    insertDirection = 1;
    clearScript();
    commandId++;
    addSelectStage(commandId);
    commandId++;
    addSelectFriend(commandId);
    commandId++;
    addSelectTeam(commandId);
    commandId++;
    addStartQuest(commandId);
    commandId++;
    addAuto(commandId);
    commandId++;
    addFinish(commandId);
    insertDirection = currentDirection;
  });

  $("#clearScript").click(function () {
    clearScript();
  });

  //set load script btn
  $("#saveScript").click(function () {
    var currentScript = getCurrentScript();
    var scriptName = $("#scriptMode").select2("data")[0].text;
    if (scriptName != "") {
      JavaScriptInterface.runScriptCallback(
        'saveScript("' + scriptName + "\",'" + currentScript + "');",
        "saveScriptConfirm"
      );
    } else {
      bootbox.prompt({
        title: "腳本名稱",
        value: "新腳本" + (scriptCnt + 1),
        callback: function (newScriptName) {
          var scriptNameOK = true;
          if (newScriptName == null) {
            return;
          } else if (
            newScriptName.length <= 0 ||
            newScriptName.indexOf(",") >= 0 ||
            newScriptName.indexOf(".") >= 0 ||
            newScriptName.indexOf(";") >= 0 ||
            newScriptName.indexOf(" ") >= 0
          ) {
            scriptNameOK = false;
          } else {
            $("#scriptMode option").each(function () {
              if ($(this).text() == newScriptName) {
                scriptNameOK = false;
              }
            });
          }
          if (scriptNameOK) {
            JavaScriptInterface.runScriptCallback(
              'saveScript("' + newScriptName + "\",'" + currentScript + "');",
              "createScriptConfirm"
            );
          } else {
            console.log("Save script file name failed " + newScriptName);
            bootbox.alert("檔名不合法");
          }
        },
      });
    }
  });
  $("#deleteScript").click(function () {
    var scriptName = $("#scriptMode").select2("data")[0].text;
    bootbox.confirm("是否刪除 " + scriptName + " ?", function (result) {
      if (result) {
        if (scriptName == "") {
          clearScript();
        } else {
          JavaScriptInterface.runScriptCallback(
            'deleteScript("' + scriptName + '");',
            "deleteScriptConfirm"
          );
        }
      }
    });
  });
  $("#createScript").click(function () {
    bootbox.prompt({
      title: "建立新的空白腳本",
      value: "新腳本" + (scriptCnt + 1),
      callback: function (newScriptName) {
        var scriptNameOK = true;
        if (newScriptName == null) {
          return;
        } else if (
          newScriptName.length <= 0 ||
          newScriptName.indexOf(",") >= 0 ||
          newScriptName.indexOf(".") >= 0 ||
          newScriptName.indexOf(";") >= 0 ||
          newScriptName.indexOf(" ") >= 0
        ) {
          scriptNameOK = false;
        } else {
          $("#scriptMode option").each(function () {
            if ($(this).text() == newScriptName) {
              scriptNameOK = false;
            }
          });
        }
        if (scriptNameOK) {
          JavaScriptInterface.runScriptCallback(
            'saveScript("' + newScriptName + "\",'" + "');",
            "createScriptConfirm"
          );
        } else {
          console.log("Create script file name failed " + newScriptName);
          bootbox.alert("檔名不合法");
        }
      },
    });
  });
  $("#copyScript").click(function () {
    var oldScriptName = $("#scriptMode").select2("data")[0].text;
    if (oldScriptName == "") {
      return;
    }
    bootbox.prompt({
      title: "腳本名稱",
      value: oldScriptName + "_copy",
      callback: function (newScriptName) {
        var scriptNameOK = true;
        if (newScriptName == null) {
          return;
        } else if (
          newScriptName.length <= 0 ||
          newScriptName.indexOf(",") >= 0 ||
          newScriptName.indexOf(".") >= 0 ||
          newScriptName.indexOf(";") >= 0 ||
          newScriptName.indexOf(" ") >= 0
        ) {
          scriptNameOK = false;
        } else {
          $("#scriptMode option").each(function () {
            if ($(this).text() == newScriptName) {
              scriptNameOK = false;
            }
          });
        }
        if (scriptNameOK) {
          var currentScript = getCurrentScript();
          JavaScriptInterface.runScriptCallback(
            'saveScript("' + newScriptName + "\",'" + currentScript + "');",
            "copyScriptConfirm"
          );
        } else {
          console.log("Copy script file name failed " + newScriptName);
          bootbox.alert("檔名不合法");
        }
      },
    });
  });
  $("#scriptMode").change(function () {
    if (!listenScriptMode) {
      return;
    }
    var scriptName = $("#scriptMode").select2("data")[0].text;
    JavaScriptInterface.runScriptCallback(
      'readScript("' + scriptName + '");',
      "resetScript"
    );
  });

  //set control script display btn
  $("#insertDirection").click(function () {
    insertDirection = (parseInt($("#insertDirection").val()) + 1) % 2;
    $("#insertDirection").val(insertDirection).trigger("change");
    if (insertDirection == 1) {
      $("#insertDirection").text("後");
    } else {
      $("#insertDirection").text("前");
    }
  });
  $("#showAll").click(function () {
    for (var i = 0; i <= commandId; i++) {
      $("#commandvalue" + i).show();
      $("#hideItem" + i).text("隱藏");
    }
  });
  $("#hideAll").click(function () {
    for (var i = 0; i <= commandId; i++) {
      $("#commandvalue" + i).hide();
      $("#hideItem" + i).text("顯示");
    }
  });

  //command button
  $("#addGetFriendPoint").click(function () {
    clearScript();
    commandId++;
    addGetFriendPoint(commandId);
  });
  $("#addGetBox").click(function () {
    clearScript();
    commandId++;
    addGetBox(commandId);
  });
  $("#addSelectStage").click(function () {
    commandId++;
    addSelectStage(commandId);
  });
  $("#addSelectFriend").click(function () {
    commandId++;
    addSelectFriend(commandId);
  });
  $("#addSelectTeam").click(function () {
    commandId++;
    addSelectTeam(commandId);
  });
  $("#addStartQuest").click(function () {
    commandId++;
    addStartQuest(commandId);
  });
  $("#addAuto").click(function () {
    commandId++;
    addAuto(commandId);
  });
  $("#addSkill").click(function () {
    commandId++;
    addSkill(commandId);
  });
  $("#addCloth").click(function () {
    commandId++;
    addCloth(commandId);
  });
  $("#addSwitchServant").click(function () {
    commandId++;
    addSwitchServant(commandId);
  });
  $("#addSelectEnemy").click(function () {
    commandId++;
    addSelectEnemy(commandId);
  });
  $("#addStartAttack").click(function () {
    commandId++;
    addStartAttack(commandId);
  });
  $("#addUseUlt").click(function () {
    commandId++;
    addUseUlt(commandId);
  });
  $("#addSelectCard").click(function () {
    commandId++;
    addSelectCard(commandId);
  });
  $("#addFinish").click(function () {
    commandId++;
    addFinish(commandId);
  });
  $("#addSpaceUlt").click(function () {
    commandId++;
    addSpaceUlt(commandId);
  });
}

function insertNewCommand(newCmd) {
  if (insertDirection == 1) {
    $("#skill-list").append(newCmd);
  } else {
    $("#skill-list").prepend(newCmd);
  }
  initCommandButton(commandId);
}

function initCommandButton(currentId) {
  $("#removeItem" + currentId).click(function () {
    $(this).parent().parent().parent().remove();
  });
  $("#hideItem" + currentId).click(function () {
    if ($("#commandvalue" + currentId).is(":visible")) {
      $(this).text("顯示");
      $("#commandvalue" + currentId).hide();
    } else {
      $(this).text("隱藏");
      $("#commandvalue" + currentId).show();
    }
  });
  $("#moveItemUp" + currentId).click(function () {
    var item = $(this).parent().parent().parent();
    var item2 = item.prev();
    if (item2.is("div")) {
      item2.before(item);
    }
  });
  $("#moveItemDown" + currentId).click(function () {
    var item = $(this).parent().parent().parent();
    var item2 = item.next();
    if (item2.is("div")) {
      item.before(item2);
    }
  });
}

function startListenScriptSelect() {
  listenScriptMode = true;
}

function stopListenScriptSelect() {
  listenScriptMode = false;
}

function getCurrentScript() {
  var newScript = "";
  $("#skill-list")
    .children()
    .each(function () {
      var itemTitle = $(this).find("label:first").text();
      var itemId = $(this).find("label:first").attr("name");
      switch (itemTitle) {
        case "友抽":
          newScript += "getFriendPoint();";
          break;
        case "抽箱":
          newScript +=
            "getBox(" +
            $("#getBoxReset" + itemId).val() +
            "," +
            $("#getBoxFast" + itemId).val() +
            ");";
          break;
        case "選擇關卡":
          newScript += "selectStage(" + $("#autoApple" + itemId).val() + ");";
          break;
        case "選擇好友":
          var filter = 0;
          var t = 1;
          for (var i = 0; i < 10; i++) {
            if ($("#selectFriend" + i + "" + itemId).is(":checked")) {
              filter += t;
            }
            t *= 2;
          }
          var servant = "";
          if ($("#selectFriendServant" + itemId).val() != -1) {
            servant = $("#selectFriendServant" + itemId).select2("data")[0]
              .text;
          }
          var item = "";
          if ($("#selectFriendItem" + itemId).val() != -1) {
            item = $("#selectFriendItem" + itemId).select2("data")[0].text;
          }
          newScript +=
            "selectFriend(" +
            filter +
            ',"' +
            servant +
            '","' +
            item +
            '",' +
            $("#selectFriendItemFull" + itemId).val() +
            "," +
            $("#selectFriendOnlyFriend" + itemId).val() +
            "," +
            $("#selectFriendScrollCnt" + itemId).val() +
            ");";
          break;
        case "選擇隊伍":
          newScript += "selectTeam(" + $("#selectTeam" + itemId).val() + ");";
          break;
        case "進入關卡":
          newScript += "startQuest(" + $("#useItem" + itemId).val() + ");";
          break;
        case "結束關卡":
          newScript += "finishQuest();";
          break;
        case "設定技能改變寶具顏色":
          newScript +=
            "setSpaceUltColor(" + $("#spaceUltColor" + itemId).val() + ");";
          break;
        case "使用技能":
          newScript +=
            "useSkill(" +
            $("#useSkillServant" + itemId).val() +
            "," +
            $("#useSkill" + itemId).val() +
            "," +
            $("#useSkillTarget" + itemId).val() +
            ");";
          break;
        case "使用衣服技能":
          newScript +=
            "useClothesSkill(" +
            $("#clothSkill" + itemId).val() +
            "," +
            $("#clothSkillTarget" + itemId).val() +
            "," +
            $("#clothSkillChange" + itemId).val() +
            ");";
          break;
        case "選擇敵人":
          newScript += "selectEnemy(" + $("#selectEnemy" + itemId).val() + ");";
          break;
        case "開始選卡":
          newScript += "startAttack();";
          break;
        case "使用寶具":
          newScript += "useUlt(" + $("#useUlt" + itemId).val() + ");";
          break;
        case "選擇卡片":
          newScript += "selectCard(" + $("#selectCard" + itemId).val() + ");";
          break;
        case "自動戰鬥":
          newScript +=
            "autoAttack(" +
            $("#autoFightUntil" + itemId).val() +
            "," +
            $("#autoFightColor" + itemId).val() +
            "," +
            $("#autoFightSameColor" + itemId).val() +
            "," +
            $("#autoFightWeak" + itemId).val() +
            "," +
            $("#autoFightDie" + itemId).val();
          for (var i = 0; i < 3; i++) {
            newScript += "," + $("#servant" + i + "ult" + itemId).val();
            for (var j = 0; j < 3; j++) {
              newScript += "," + $("#servant" + i + "skill" + j + itemId).val();
              newScript +=
                "," + $("#servant" + i + "skill" + j + "target" + itemId).val();
            }
          }

          // newScript+=","+$("#ultColor"+itemId).val();
          newScript += ",false";
          newScript += ");";
          break;
        default:
          newScript += "/*no this function*/";
          break;
      }
    });
  return newScript;
}

function clearScript() {
  $("#skill-list").empty();
  commandId = 0;
}

function getCheckSwitchStatus(id) {
  return $(id).is(":checked");
}

//Callback------------------------------------------------------------------------------------------------------------------------
function initHTML(result) {
  if (result == undefined) {
    return;
  }
  result = result.split(";");
  if (result[4] == undefined) {
    $("#serverMessage").text("請重新開啟腳本以完成更新");
    return;
  }
  version = result[4];
  if (result[1].length > 0) {
    friendServantList = result[1].split(",");
  }
  if (result[2].length > 0) {
    friendItemList = result[2].split(",");
  }
  if (result[0] == undefined) {
    $("#scriptMode").select2({
      height: "100px",
      width: "100%",
    });
  } else {
    var scriptList = result[0].split(",");
    scriptCnt = scriptList.length;

    for (var i = 0; i < scriptList.length; i++) {
      $("#scriptMode").append(
        '<option value = "' + i + '">' + scriptList[i] + "</option>"
      );
    }
    $("#scriptMode").select2({
      height: "100px",
      minimumResultsForSearch: -1,
      placeholder: "請選擇腳本",
      width: "100%",
    });
  }
  storagePath = result[3];
  servantImgPath = storagePath + "friend_servant/";
  itemImgPath = storagePath + "friend_item/";
  if (server == "JP") {
    $("#titleBarText").text("FGO自動周回小幫手 日服 " + version + " 啟動成功");
    $("#serverMessage").remove();
  } else if (server == "TW") {
    $("#titleBarText").text("FGO自動周回小幫手 台服 " + version + " 啟動成功");
    $("#serverMessage").remove();
  }

  var gaEvent = "app" + server;
  ga("set", "page", gaEvent);
  ga("send", "pageview");
}

function scriptFinish() {
  var l = server + "_" + version;
  ga("send", {
    hitType: "event",
    eventCategory: "Script",
    eventAction: "Finish",
    eventLabel: l,
  });
  JavaScriptInterface.showMenu();
  JavaScriptInterface.showPlayButton();
}

function saveServantConfirm(time) {
  JavaScriptInterface.showMenu();
  JavaScriptInterface.clickSettingButton();
  bootbox.prompt({
    title:
      '<img src = "' +
      storagePath +
      "tmp_servant_" +
      time +
      '.png" width = "60" height = "40"><br>檔案名稱',
    value: "從者" + (friendServantList.length + 1),
    callback: function (imageName) {
      if (imageName == null) {
        return;
      }
      var imageNameOK = true;
      if (
        imageName.length <= 0 ||
        imageName.indexOf(",") >= 0 ||
        imageName.indexOf(".") >= 0 ||
        imageName.indexOf(";") >= 0 ||
        imageName.indexOf(" ") >= 0
      ) {
        imageNameOK = false;
      }
      if (imageNameOK) {
        friendServantList[friendServantList.length] = imageName;
        JavaScriptInterface.runScriptCallback(
          'confirmSaveFriendServantImage("' + imageName + '","' + time + '");',
          "saveFriendServantConfirm"
        );
      } else {
        bootbox.alert("檔名不合法");
        // remove tmp file
        JavaScriptInterface.runScript("confirmSaveFriendServantImage()");
      }
    },
  });
}

function saveItemConfirm(time) {
  JavaScriptInterface.showMenu();
  JavaScriptInterface.clickSettingButton();
  bootbox.prompt({
    title:
      '<img src = "' +
      storagePath +
      "tmp_item_" +
      time +
      '.png" width = "60" height = "20"><br>檔案名稱',
    value: "禮裝" + (friendItemList.length + 1),
    callback: function (imageName) {
      if (imageName == null) {
        return;
      }
      var imageNameOK = true;
      if (
        imageName.length <= 0 ||
        imageName.indexOf(",") >= 0 ||
        imageName.indexOf(".") >= 0 ||
        imageName.indexOf(";") >= 0 ||
        imageName.indexOf(" ") >= 0
      ) {
        imageNameOK = false;
      }
      if (imageNameOK) {
        friendItemList[friendItemList.length] = imageName;
        JavaScriptInterface.runScriptCallback(
          'confirmSaveFriendItemImage("' + imageName + '","' + time + '");',
          "saveFriendItemConfirm"
        );
      } else {
        bootbox.alert("檔名不合法");
        // remove tmp file
        JavaScriptInterface.runScript("confirmSaveFriendItemImage()");
      }
    },
  });
}

function createScriptConfirm(result) {
  if (result == null) {
    return;
  }
  bootbox.alert("建立成功");
  scriptCnt++;
  stopListenScriptSelect();
  $("#scriptMode").append(
    '<option value = "' + scriptCnt + '" selected>' + result
  );
  clearScript();
  startListenScriptSelect();
}

function saveScriptConfirm(result) {
  if (result == null) {
    return;
  }
  bootbox.alert("儲存成功");
  startListenScriptSelect();
}

function deleteScriptConfirm(result) {
  clearScript();
  $("#scriptMode option")
    .filter(function () {
      return $.trim($(this).text()) == result;
    })
    .remove();
  bootbox.alert("刪除 " + result + " 成功");
}

function copyScriptConfirm(result) {
  if (result == null) {
    return;
  }
  bootbox.alert("複製成功");
  scriptCnt++;
  stopListenScriptSelect();
  $("#scriptMode").append(
    '<option value = "' + scriptCnt + '" selected>' + result
  );
  startListenScriptSelect();
}

function saveFriendServantConfirm(result) {
  if (result == null) {
    return;
  }
  for (var i = 0; i < commandId + 1; i++) {
    if ($("#selectFriendServant" + i).length) {
      $("#selectFriendServant" + i).append(
        '<option value = "' + commandId + '">' + result + "</option>"
      );
      $("#selectFriendServant" + i).select2({
        minimumResultsForSearch: -1,
        width: "160px",
      });
    }
  }
  bootbox.alert("從者儲存成功");
}

function saveFriendItemConfirm(result) {
  if (result == null) {
    return;
  }
  bootbox.alert("禮裝儲存成功");
  for (var i = 0; i < commandId + 1; i++) {
    if ($("#selectFriendItem" + i).length) {
      $("#selectFriendItem" + i).append(
        '<option value = "' + commandId + '">' + result + "</option>"
      );
      $("#selectFriendItem" + i).select2({
        minimumResultsForSearch: -1,
        width: "160px",
      });
    }
  }
}

function resetScript(result) {
  clearScript();
  var currentDirection = insertDirection;
  insertDirection = 1;
  var scriptContentList = result.split(";");
  scriptContentList.forEach(function (content) {
    commandId++;
    if (checkstring(content, "getFriendPoint")) {
      addGetFriendPoint(commandId);
    } else if (checkstring(content, "getBox")) {
      content = content.replace("getBox(", "");
      content = content.replace(")", "");
      addGetBox(commandId, content);
      $("#skill-list").append(getGetBox(commandId));
      initCommandButton(commandId);
    } else if (checkstring(content, "selectStage")) {
      content = content.replace("selectStage(", "");
      content = content.replace(")", "");
      addSelectStage(commandId, content);
    } else if (checkstring(content, "selectFriend")) {
      content = content.replace("selectFriend(", "");
      content = content.replace(")", "");
      content = content.replace(/"/g, "");
      addSelectFriend(commandId, content);
    } else if (checkstring(content, "selectTeam")) {
      content = content.replace("selectTeam(", "");
      content = content.replace(")", "");
      addSelectTeam(commandId, content);
    } else if (checkstring(content, "startQuest")) {
      content = content.replace("startQuest(", "");
      content = content.replace(")", "");
      addStartQuest(commandId, content);
    } else if (checkstring(content, "autoAttack")) {
      content = content.replace("autoAttack(", "");
      content = content.replace(")", "");
      addAuto(commandId, content);
    } else if (checkstring(content, "useSkill")) {
      content = content.replace("useSkill(", "");
      content = content.replace(")", "");
      addSkill(commandId, content);
    } else if (checkstring(content, "useClothesSkill")) {
      content = content.replace("useClothesSkill(", "");
      content = content.replace(")", "");
      addCloth(commandId, content);
    } else if (checkstring(content, "selectEnemy")) {
      content = content.replace("selectEnemy(", "");
      content = content.replace(")", "");
      addSelectEnemy(commandId, content);
    } else if (checkstring(content, "startAttack")) {
      addStartAttack(commandId);
    } else if (checkstring(content, "useUlt")) {
      content = content.replace("useUlt(", "");
      content = content.replace(")", "");
      addUseUlt(commandId, content);
    } else if (checkstring(content, "selectCard")) {
      content = content.replace("selectCard(", "");
      content = content.replace(")", "");
      addSelectCard(commandId, content);
    } else if (checkstring(content, "finishQuest")) {
      addFinish(commandId);
    } else if (checkstring(content, "setSpaceUltColor")) {
      content = content.replace("setSpaceUltColor(", "");
      content = content.replace(")", "");
      addSpaceUlt(commandId, content);
    }
  });
  insertDirection = currentDirection;
  bootbox.alert("讀取成功");
}

function checkstring(longStr, shortStr) {
  if (longStr.substring(0, shortStr.length) == shortStr) {
    return true;
  }
  return false;
}
//Call by Android app-----------------------------------------------------------------------------------------------------
function onEvent(eventType) {
  if (eventType == "OnPlayClick") {
    var t = $("#loopTime").val();
    var loopTime = -1;
    if (t != "無限") {
      loopTime = parseInt(t);
    }
    var currentScript = getCurrentScript();
    var l = server + "_" + version;
    var scriptName = $("#scriptMode").select2("data")[0].text;

    JavaScriptInterface.runScriptCallback(
      "start(" + loopTime + ",'" + currentScript + "','" + scriptName + "');",
      "scriptFinish"
    );
    JavaScriptInterface.hideMenu();
    JavaScriptInterface.setXY(3000, 0);
    ga("send", {
      hitType: "event",
      eventCategory: "Script",
      eventAction: "Play",
      eventLabel: l,
    });
  } else if (eventType == "OnPauseClick") {
    var l = server + "_" + version;
    ga("send", {
      hitType: "event",
      eventCategory: "Script",
      eventAction: "Stop",
      eventLabel: l,
    });
    JavaScriptInterface.runScript("stop();");
  } else if (eventType == "OnReloadClick") {
  }
}
function onLog(message) {
  console.log(message);
}
