function addGetFriendPoint(commandId) {
  insertNewCommand(getGetFriendPoint(commandId));
}
function addGetBox(commandId, content) {
  insertNewCommand(getGetBox(commandId));

  $("#getBoxReset" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "80px",
  });
  $("#getBoxFast" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "80px",
  });

  if (content == undefined) {
    return;
  }
  var scriptValue = content.split(",");
  $("#getBoxReset" + commandId)
    .val(scriptValue[0])
    .trigger("change");
  $("#getBoxFast" + commandId)
    .val(scriptValue[1])
    .trigger("change");
}

function addSelectStage(commandId, content) {
  insertNewCommand(getSelectStage(commandId));

  $("#autoApple" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  $("#autoApple" + commandId)
    .val(content)
    .trigger("change");
}

function addSelectFriend(commandId, content) {
  insertNewCommand(getSelectFriend(commandId));

  for (var i = 0; i < friendServantList.length; i++) {
    $("#selectFriendServant" + commandId).append(
      '<option value = "' + i + '">' + friendServantList[i] + "</option>"
    );
  }
  $("#selectFriendServant" + commandId).change(function () {
    if ($(this).val() != -1) {
      var path = servantImgPath + $(this).select2("data")[0].text + ".png";
      $("#selectFriendServantImg" + commandId).attr("src", path);
    } else {
      $("#selectFriendServantImg" + commandId)
        .removeAttr("src")
        .replaceWith($("#selectFriendServantImg" + commandId).clone());
    }
  });
  $("#selectFriendServant" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "160px",
  });
  for (var i = 0; i < friendItemList.length; i++) {
    $("#selectFriendItem" + commandId).append(
      '<option value = "' + i + '">' + friendItemList[i] + "</option>"
    );
  }
  $("#selectFriendItem" + commandId).change(function () {
    if ($(this).val() != -1) {
      var path = itemImgPath + $(this).select2("data")[0].text + ".png";
      $("#selectFriendItemImg" + commandId).attr("src", path);
    } else {
      $("#selectFriendItemImg" + commandId)
        .removeAttr("src")
        .replaceWith($("#selectFriendItemImg" + commandId).clone());
    }
  });
  $("#selectFriendItem" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "160px",
  });
  $("#selectFriendItemFull" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "160px",
  });
  $("#selectFriendOnlyFriend" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "160px",
  });
  $("#selectFriendScrollCnt" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "160px",
  });

  if (content == undefined) {
    return;
  }
  var scriptValue = content.split(",");
  var t = 1;
  for (var i = 0; i < 10; i++) {
    if (scriptValue[0] & t) {
      $("#selectFriend" + i + "" + commandId).prop("checked", true);
    } else {
      $("#selectFriend" + i + "" + commandId).prop("checked", false);
    }
    t *= 2;
  }
  for (var i = 0; i < friendServantList.length; i++) {
    if (
      new String(friendServantList[i]).valueOf() ==
      new String(scriptValue[1]).valueOf()
    ) {
      $("#selectFriendServant" + commandId)
        .val(i)
        .trigger("change");
      break;
    }
  }
  for (var i = 0; i < friendItemList.length; i++) {
    if (friendItemList[i] == scriptValue[2]) {
      $("#selectFriendItem" + commandId)
        .val(i)
        .trigger("change");
      break;
    }
  }
  $("#selectFriendItemFull" + commandId)
    .val(scriptValue[3])
    .trigger("change");

  if (scriptValue.length > 4) {
    $("#selectFriendOnlyFriend" + commandId)
      .val(scriptValue[4])
      .trigger("change");
  }
  if (scriptValue.length > 5) {
    $("#selectFriendScrollCnt" + commandId)
      .val(scriptValue[5])
      .trigger("change");
  }
}

function addSelectTeam(commandId, content) {
  insertNewCommand(getSelectTeam(commandId));

  $("#selectTeam" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  $("#selectTeam" + commandId)
    .val(content)
    .trigger("change");
}

function addStartQuest(commandId, content) {
  insertNewCommand(getStartQuest(commandId));

  $("#useItem" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  $("#useItem" + commandId)
    .val(content)
    .trigger("change");
}

function addAuto(commandId, content) {
  insertNewCommand(getAutoItem(commandId));

  $("#autoFightUntil" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "resolve",
    width: "160px",
  });
  $("#autoFightColor" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "160px",
  });
  $("#autoFightSameColor" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "160px",
  });
  $("#autoFightWeak" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "160px",
  });
  $("#autoFightDie" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "160px",
  });
  for (var i = 0; i < 3; i++) {
    $("#servant" + i + "ult" + commandId).select2({
      minimumResultsForSearch: -1,
      width: "160px",
    });
    for (var j = 0; j < 3; j++) {
      $("#servant" + i + "skill" + j + commandId).select2({
        minimumResultsForSearch: -1,
        width: "160px",
      });
      $("#servant" + i + "skill" + j + "target" + commandId).select2({
        minimumResultsForSearch: -1,
        width: "80px",
      });
    }
  }

  if (content == undefined) {
    return;
  }
  var scriptValue = content.split(",");
  $("#autoFightUntil" + commandId)
    .val(scriptValue[0])
    .trigger("change");
  $("#autoFightColor" + commandId)
    .val(scriptValue[1])
    .trigger("change");
  $("#autoFightSameColor" + commandId)
    .val(scriptValue[2])
    .trigger("change");
  $("#autoFightWeak" + commandId)
    .val(scriptValue[3])
    .trigger("change");
  $("#autoFightDie" + commandId)
    .val(scriptValue[4])
    .trigger("change");
  for (var i = 0; i < 3; i++) {
    $("#servant" + i + "ult" + commandId)
      .val(scriptValue[5 + 7 * i])
      .trigger("change");
    for (var j = 0; j < 3; j++) {
      $("#servant" + i + "skill" + j + commandId)
        .val(scriptValue[5 + 7 * i + 1 + j * 2])
        .trigger("change");
      $("#servant" + i + "skill" + j + "target" + commandId)
        .val(scriptValue[5 + 7 * i + 1 + j * 2 + 1])
        .trigger("change");
    }
  }
}

function addSkill(commandId, content) {
  insertNewCommand(getUseSkillItem(commandId));

  $("#useSkillServant" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });
  $("#useSkill" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });
  $("#useSkillTarget" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  var scriptValue = content.split(",");
  $("#useSkillServant" + commandId)
    .val(scriptValue[0])
    .trigger("change");
  $("#useSkill" + commandId)
    .val(scriptValue[1])
    .trigger("change");
  $("#useSkillTarget" + commandId)
    .val(scriptValue[2])
    .trigger("change");
}

function addCloth(commandId, content) {
  insertNewCommand(getClothItem(commandId));

  $("#clothSkill" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });
  $("#clothSkillTarget" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  var scriptValue = content.split(",");
  $("#clothSkill" + commandId)
    .val(scriptValue[0])
    .trigger("change");
  $("#clothSkillTarget" + commandId)
    .val(scriptValue[1])
    .trigger("change");
}

function addSwitchServant(commandId, content) {
  insertNewCommand(getSwitchServantItem(commandId));

  $("#switchServantFront" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });
  $("#switchServantBack" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  var scriptValue = content.split(",");
  $("#switchServantFront" + commandId)
    .val(scriptValue[0])
    .trigger("change");
  $("#switchServantBack" + commandId)
    .val(scriptValue[1])
    .trigger("change");
}

function addSelectEnemy(commandId, content) {
  insertNewCommand(getSelectEnemy(commandId));

  $("#selectEnemy" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  $("#selectEnemy" + commandId)
    .val(content)
    .trigger("change");
}

function addStartAttack(commandId) {
  insertNewCommand(getStartAttackItem(commandId));
}

function addUseUlt(commandId, content) {
  insertNewCommand(getUseUltItem(commandId));

  $("#useUlt" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  $("#useUlt" + commandId)
    .val(content)
    .trigger("change");
}

function addSelectCard(commandId, content) {
  insertNewCommand(getSelectCardItem(commandId));

  $("#selectCard" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  $("#selectCard" + commandId)
    .val(content)
    .trigger("change");
}

function addFinish(commandId) {
  insertNewCommand(getFinishItem(commandId));
}

function addSpaceUlt(commandId, content) {
  insertNewCommand(getSpaceUltItem(commandId));

  $("#spaceUltColor" + commandId).select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });

  if (content == undefined) {
    return;
  }
  $("#spaceUltColor" + commandId)
    .val(content)
    .trigger("change");
}
