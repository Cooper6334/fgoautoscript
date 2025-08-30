//var deviceId = "98071FFAZ002JS";
//var deviceId = "127.0.0.1:62025";
// var deviceId = "29161FDH200FZ0";
var deviceId = "192.168.11.5:5555";
// var deviceId = "emulator-5554";


function initDebug(s) {
  if (s == null || s == undefined) {
    s = "JP";
  }
  server = s;
  setBlackEdgeByHtmlValue([0, 0, 0, 0]);
  setOtherPreference([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  initScreenSize();
}

function saveMyImage(name, image) {
  var path = getStoragePath();
  var filepath = path + "/" + name + ".png";
  saveImage(image, filepath);
  console.log("adb -s " + deviceId + " pull " + filepath);
}

function selectCardsV2Debug(cardOrder, ult, currentStage) {
  console.log("DEBUG selectCardsV2: 開始選卡，順序=" + cardOrder + ",寶具=" + ult + ",波數=" + currentStage);
  
  // 先執行 updateCardList() 來獲取卡片資訊
  updateCardList();
  var cardListText = "";
  for (var i = 0; i < cardList.length; i++) {
    cardListText += colorName[cardList[i]]+" ";
  }
  console.log("DEBUG selectCardsV2: Card:" + cardListText);
  console.log("DEBUG selectCardsV2: Status:" + cardStatus);
  
  var ultIndex = 0;
  var cardSelected = [false, false, false, false, false];
  for (var i = 0; i < cardOrder.length; i++) {
    console.log("DEBUG selectCardsV2: 處理" + i + ":" + cardOrder.charAt(i));
    var selectCardIndex = -1;
    var selectUlt = false;
    switch (cardOrder.charAt(i)) {
      case 'B':
        cardColor = 0;
        console.log("DEBUG selectCardsV2: 設定卡片顏色為B(紅色)");
        break;
      case 'A':
        cardColor = 1;
        console.log("DEBUG selectCardsV2: 設定卡片顏色為A(藍色)");
        break;
      case 'Q':
        cardColor = 2;
        console.log("DEBUG selectCardsV2: 設定卡片顏色為Q(綠色)");
        break;
      case 'N':
        selectUlt = true;
        while (ultIndex < 3) {
          if (ult[ultIndex] >= 0 && currentStage >= ult[ultIndex]) {
            console.log("DEBUG selectCardsV2: 選擇寶具，從者" + (ultIndex + 1));
            console.log("DEBUG: useUlt(" + ultIndex + ")");
            ultIndex++;
            break;
          }
          ultIndex++;
        }
        break;
    }
    if (selectUlt) {
      continue;
    }

    //選卡
    for (var j = 0; j < 5; j++) {
      if (!cardSelected[j] && cardList[j] == cardColor) {
        if (selectCardIndex == -1) {
          selectCardIndex = j;
        } else {
          if (cardStatus[selectCardIndex] < cardStatus[j]) {
            selectCardIndex = j;
          }
        }
      }
    }
    if (selectCardIndex != -1) {
      console.log("DEBUG selectCardsV2: 選擇卡片" + colorName[cardColor] + "，卡片位置" + (selectCardIndex + 1));
      console.log("DEBUG: selectCard(" + selectCardIndex + ")");
      cardSelected[selectCardIndex] = true;
    } else if (!selectUlt) {
      for (var j = 0; j < 5; j++) {
        if (!cardSelected[j]) {
          console.log("DEBUG selectCardsV2: 找不到符合條件的卡片，任選一張");
          console.log("DEBUG: selectCard(" + j + ")");
          cardSelected[j] = true;
          break;
        }
      }
    }
  }

  //補足沒選到的卡
  for (var i = ultIndex; i < 3; i++) {
    if (ult[ultIndex] >= 0 && currentStage >= ult[ultIndex]) {
      console.log("DEBUG selectCardsV2: 補足寶具，從者" + (i + 1));
      console.log("DEBUG: useUlt(" + i + ")");
      break;
    }
  }
  for (var i = 0; i < 5; i++) {
    if (!cardSelected[i]) {
      console.log("DEBUG selectCardsV2: 補足卡片，位置" + (i + 1));
      console.log("DEBUG: selectCard(" + i + ")");
    }
  }

  console.log("DEBUG selectCardsV2: 選卡完成");
}

function saveCropIcon(name) {
  var margin = 0;
  if (iconMargin[name] != true) {
    margin = defaultMarginX;
  }
  var x = icon[name][0] + margin;
  var y = icon[name][1];
  var width = icon[name][2];
  var height = icon[name][3];
  var filepath = getStoragePath() + "/cropImage/" + name + ".png";
  var screenshot = getScreenshotResize();
  var crop = cropImage(screenshot, x, y, width, height);
  saveImage(crop, filepath);
  releaseImage(screenshot);
  releaseImage(crop);
  console.log("adb -s " + deviceId + " pull " + filepath);
}

function saveScreenShotImage(name) {
  if (name == undefined) {
    var currentdate = new Date();
    name = "screenshot" + currentdate.getTime();
  }
  var path = getStoragePath();
  var filepath = path + "/" + name + ".png";
  var screenShot = getScreenshot();
  saveImage(screenShot, filepath);
  releaseImage(screenShot);
  console.log("adb -s " + deviceId + " pull " + filepath);
}

function saveCropImageByBounds(l, t, r, b) {
  var path = getStoragePath();
  var width = r - l;
  var height = b - t;
  var x = l;
  var y = t;
  var currentdate = new Date();
  var filepath = path + "/crop" + "_" + x + "_" + y + "_" + width + "_" + height + ".png";
  var screenShot = getScreenshot();
  var crop = cropImage(screenShot, x, y, width, height);
  saveImage(crop, filepath);
  releaseImage(screenShot);
  releaseImage(crop);
  console.log("adb -s " + deviceId + " pull " + filepath);
  console.log('icon[""] = [' + l + ", " + t + ", " + width + ", " + height + "];");
}

function saveCropImage(x, y, width, height) {
  saveCropImageByBounds(x, y, x + width, y + height);
}


//filter: 職階篩選 (位元遮罩，0=全部，1=劍，2=弓，4=槍，8=騎，16=術，32=殺，64=狂，128=特，256=混)
//servant: 指定從者名稱 (字串，空字串表示無指定)
//item: 指定禮裝名稱 (字串，空字串表示無指定)
//star: 禮裝滿突 (0=不限制，1=滿突)
//checkIsFriend: 限定好友 (0=不限制，1=僅限好友)
//scrollTimes: 下拉次數 (-1=到最後，0=不下拉，1-3=指定次數，-2=直到出現非好友，-3=直到出現非冠位從者)
//grandServantOnly: 僅限冠位從者 (0=不限定，1=限定)
//grandKitsunaItem: 冠位從者絆禮裝 (-1=不限定禮裝，0=絆禮裝不限效果，1=絆禮裝通常效果，2=絆禮裝限定效果(50np))
//grandRewardItem: 冠位從者報酬禮裝名稱 (字串，空字串表示無指定)

function testSkillDialogs() {
  console.log("=== 測試技能對話框檢測函數 ===");
  console.log("當前螢幕狀態檢測結果：");
  
  var dialogResults = [
    {name: "isBattleSkillRabbitDialog", func: isBattleSkillRabbitDialog},
    {name: "isBattleSkillKishinamiDialog", func: isBattleSkillKishinamiDialog},
    {name: "isBattleKklDialog", func: isBattleKklDialog},
    {name: "isBattleSkillEmiyaDialog", func: isBattleSkillEmiyaDialog},
    {name: "isBattleSkillDubaiDialog", func: isBattleSkillDubaiDialog},
    {name: "isBattleSkillTargetDialog", func: isBattleSkillTargetDialog},
    {name: "isBattleSkillSpaceDialog", func: isBattleSkillSpaceDialog}
  ];
  
  for (var i = 0; i < dialogResults.length; i++) {
    var result = false;
    try {
      result = dialogResults[i].func();
    } catch (e) {
      console.log(dialogResults[i].name + ": ERROR - " + e);
      continue;
    }
    console.log(dialogResults[i].name + ": " + (result ? "TRUE" : "FALSE"));
  }
  
  console.log("=== 測試完成 ===");
}

function testFriendFunctions(debugFriendAlgorithm, loop, defaultScreenshot) {
  console.log("開始測試 friend.js 函數功能");
  if (loop == undefined) {
    loop = false;
  }
  if (debugFriendAlgorithm == undefined) {
    debugFriendAlgorithm = 0;
  }
  console.log("使用演算法: " + (debugFriendAlgorithm == 1 ? "圖片比對" : "傳統像素檢測"));
  setFriendMargin();
  initScreenSize();
  while (isScriptRunning) {
    var screenshot = null;
    if (defaultScreenshot != null && defaultScreenshot != undefined) {
      console.log("使用提供的螢幕截圖進行測試");
      screenshot = defaultScreenshot;
      loop = false;
    } else {
      console.log("使用即時螢幕截圖進行測試");
      screenshot = getScreenshotResize();
    }
    if (screenshot == null) {
      console.log("無法取得螢幕截圖，測試終止");
      return;
    }

    // console.log("=== 測試 getFriendLine ===");
    var friendLinePosition;
    if (debugFriendAlgorithm == 1) {
      friendLinePosition = getFriendLineByIcon(screenshot);
    } else {
      friendLinePosition = getFriendLineByPixel(screenshot);
    }
    console.log("找到好友行數：" + friendLinePosition.length);

    for (var i = 0; i < friendLinePosition.length; i++) {
      var lineY = friendLinePosition[i];
      console.log("=== 測試 好友" + (i + 1) + " " + lineY + " ===");
      var friendLog = "";

      // console.log("=== 測試 checkIsGrandServant ===");
      var grandServantImage = [];
      grandServantImage[0] = openImage(imagePath + "grandServant.png");
      grandServantImage[1] = openImage(imagePath + "grandServant2.png");
      if (grandServantImage[0] != null && grandServantImage[1] != null) {
        var isGrand = checkIsGrandServant(screenshot, grandServantImage, lineY);
        // console.log("是否為冠位從者：" + isGrand);

        if (isGrand) {
          // console.log("=== 測試 checkGrandKitsunaItem ===");
          friendLog += "冠位從者 ";
          var detectedKitsunaType = -1;
          for (var kitsuna = 0; kitsuna <= 2; kitsuna++) {
            var kitsunaResult = checkGrandKitsunaItem(screenshot, kitsuna, lineY);
            if (kitsunaResult) {
              detectedKitsunaType = kitsuna;
            }
          }

          var hasStarGrand1 = checkItemStar(screenshot, friendX + friendGrandItemXOffset, lineY + friendGrandItemYOffset[0]);
          // console.log("冠位從者普通禮裝滿突：" + (hasStarGrand1 ? "1 (滿突)" : "0 (非滿突)"));
          friendLog += ("通常禮裝：" + (hasStarGrand1 ? "滿突" : "非滿突") + " ")


          if (detectedKitsunaType >= 0) {
            var kitsunaTypeName = "";
            if (detectedKitsunaType == 0) kitsunaTypeName = "無";
            else if (detectedKitsunaType == 1) kitsunaTypeName = "通常";
            else if (detectedKitsunaType == 2) kitsunaTypeName = "NP";
            // console.log("冠位從者絆禮裝類型：" + detectedKitsunaType + " (" + kitsunaTypeName + ")");
            friendLog += "絆禮裝：" + kitsunaTypeName + " ";
          } else {
            console.log("冠位從者絆禮裝類型：未檢測到已知類型");
          }

          var hasStarGrand2 = checkItemStar(screenshot, friendX + friendGrandItemXOffset, lineY + friendGrandItemYOffset[1]);
          // console.log("冠位從者報酬禮裝滿突：" + (hasStarGrand2 ? "1 (滿突)" : "0 (非滿突)"));
          friendLog += ("報酬禮裝：" + (hasStarGrand2 ? "滿突" : "非滿突") + " ")
        } else {
          friendLog += "一般從者，";
          var hasStarNormal = checkItemStar(screenshot, friendX, lineY + friendItemYOffset);
          // console.log("指定禮裝滿突 (0=不限制，1=滿突)：" + (hasStarNormal ? "1 (滿突)" : "0 (非滿突)"));
          // console.log("=== 測試禮裝滿突檢測 ===");
          friendLog += ("禮裝：" + (hasStarNormal ? "滿突" : "非滿突") + " ");

        }

        releaseImage(grandServantImage[0]);
        releaseImage(grandServantImage[1]);
      } else {
        console.log("無法載入冠位從者圖片");
      }

      // console.log("=== 測試 checkFriendIsFriend ===");
      var isFriend = checkFriendIsFriend(screenshot, lineY);
      // console.log("限定好友檢查 (0=不限制，1=僅限好友)：" + (isFriend ? "1 (是好友)" : "0 (非好友)"));
      friendLog += ((isFriend ? "" : "非") + "好友");
      console.log(friendLog);

      // console.log("=== 測試座標計算 ===");
      // console.log("好友基準X座標：" + friendX);
      // console.log("指定從者位置：" + (friendX) + "," + (lineY + friendServantYOffset));
      // console.log("指定禮裝位置：" + (friendX) + "," + (lineY + friendItemYOffset));
      // console.log("僅限冠位從者圖標位置：" + (friendX + friendGrandIcon[0]) + "," + (lineY + friendGrandIcon[1]));
      // console.log("冠位從者絆禮裝檢查位置：" + (friendX + friendGrandKitsunaItemOffset[0]) + "," + (lineY + friendGrandKitsunaItemOffset[1]));
      // console.log("冠位從者報酬禮裝位置1：" + (friendX + friendGrandItemXOffset) + "," + (lineY + friendGrandItemYOffset[0]));
      // console.log("冠位從者報酬禮裝位置2：" + (friendX + friendGrandItemXOffset) + "," + (lineY + friendGrandItemYOffset[1]));

    }

    releaseImage(screenshot);
    sleep(10000);
    if (loop) {
      scrollFriendList();
    } else {
      break;
    }
    if (isSelectFriendEnd()) {
      console.log("已經移到畫面底部，結束測試");
      break;
    }
  }
  console.log("friend.js 函數測試完成");
}

// 定義 captureType 枚舉
var CAPTURE_TYPE = {
  SERVANT: 0,
  ITEM: 1
};

function compareCaptureMethod(positionIndex, captureType) {
  console.log("開始比較三種截圖方法，positionIndex=" + positionIndex + ", captureType=" + captureType);

  if (captureType != CAPTURE_TYPE.SERVANT && captureType != CAPTURE_TYPE.ITEM) {
    console.log("錯誤：captureType 必須是 CAPTURE_TYPE.SERVANT (0) 或 CAPTURE_TYPE.ITEM (1)");
    return;
  }

  var methodNames = ["絕對位置", "傳統像素定位", "圖片比對定位"];
  var captureTypeName = captureType == CAPTURE_TYPE.SERVANT ? "servant" : "item";
  var blackEdge = [0, 0, 0, 0];
  var timeStamps = [];
  var crops = [];

  // 使用三種方法截圖
  for (var captureMethod = 0; captureMethod < 3; captureMethod++) {
    console.log("=== 使用 " + methodNames[captureMethod] + " 截圖 ===");

    var timeStamp;
    if (captureType == CAPTURE_TYPE.SERVANT) {
      timeStamp = saveFriendServantImage(positionIndex, blackEdge, captureMethod);
    } else {
      timeStamp = saveFriendItemImage(positionIndex, blackEdge, captureMethod);
    }

    if (timeStamp == null) {
      console.log(methodNames[captureMethod] + " 截圖失敗");
      continue;
    }

    timeStamps[captureMethod] = timeStamp;

    // 讀取截圖檔案
    var filePath = itemPath + "tmp_" + captureTypeName + "_" + timeStamp + ".png";
    console.log("讀取截圖檔案: " + filePath);
    crops[captureMethod] = openImage(filePath);

    if (crops[captureMethod] == null) {
      console.log("無法讀取截圖檔案: " + filePath);
    } else {
      console.log(methodNames[captureMethod] + " 截圖成功");
    }
  }

  // 比較截圖相似度
  console.log("=== 開始比較截圖相似度 ===");

  for (var i = 0; i < crops.length; i++) {
    for (var j = i + 1; j < crops.length; j++) {
      if (crops[i] && crops[j]) {
        var result = findImage(crops[i], crops[j]);
        console.log(methodNames[i] + " vs " + methodNames[j] + " 相似度: " + result.score);
      }
    }
  }

  // 釋放資源
  for (var i = 0; i < crops.length; i++) {
    if (crops[i]) {
      releaseImage(crops[i]);
    }
  }

  // 清除臨時檔案
  for (var i = 0; i < timeStamps.length; i++) {
    if (timeStamps[i]) {
      var filePath = itemPath + "tmp_" + captureTypeName + "_" + timeStamps[i] + ".png";
      execute("rm " + filePath);
      console.log("已刪除臨時檔案: " + filePath);
    }
  }

  console.log("截圖比較完成");
}

function copyScriptToStorage() {
  var scriptName = ["劍冠位", "槍冠位", "雙殺狐", "雙殺狐換人", "月姬雙殺狐", "雙術傻換人"];
  var scriptContent = [
    'additionalFriendServant("麻雀2");selectStage(-1);selectFriend(0,"麻雀1","",1,0,2);startQuest(-1,0);useSkill(0,0,1);useSkill(0,1,2);switchServant(0,3);autoAttack(3,0,1,1,0,0,0,2,0,0,0,2,0,0,2,0,2,0,2,0,0,2,0,2,0,2,false,0,-1,-1,-1,-1,-1);finishQuest();',
    'additionalFriendServant("槍師匠3");additionalFriendServant("槍師匠2");selectStage(-1);selectFriend(0,"槍師匠1","黑杯",1,0,-3,1,2,"");startQuest(-1,0);useSkill(0,0,1);useSkill(0,1,2);switchServant(0,3);autoAttack(3,0,1,1,0,0,0,2,0,0,-1,2,0,0,2,-1,2,0,2,0,-1,2,0,2,0,2,false,0,-1,-1,-1,-1,-1);finishQuest();',
    'additionalFriendServant("殺狐2");additionalFriendServant("殺狐3");selectStage(2);selectFriend(64,"殺狐1","",1,0,-1);startQuest(-1,0);autoAttack(1,0,1,1,0,0,0,-1,0,-1,-1,-1,-1,-1,0,0,0,0,0,-1,-1,0,0,0,0,0,false,-1,-1,-1,-1,-1,-1);useSkill(2,0,0);useSkill(1,0,0);autoAttack(3,0,1,1,3,0,0,-1,0,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,false,-1,-1,2,0,-1,-1);finishQuest();',
    'additionalFriendServant("殺狐2");additionalFriendServant("殺狐3");selectStage(2);selectFriend(64,"殺狐1","",1,0,-1);startQuest(-1,0);autoAttack(1,0,1,1,0,0,0,-1,0,-1,0,-1,-1,-1,0,-1,0,0,0,-1,-1,0,-1,0,0,0,false,-1,-1,-1,-1,-1,-1);useSkill(2,0,0);useSkill(0,2,-1);switchServant(2,3);autoAttack(3,0,1,1,3,0,2,-1,2,-1,2,-1,-1,0,0,-1,-1,-1,-1,-1,0,-1,2,0,2,0,false,2,-1,-1,-1,-1,-1);',
    'additionalFriendServant("殺狐2");additionalFriendServant("殺狐3");selectStage(2);selectFriend(64,"殺狐1","",1,0,-1,0,0,"");startQuest(-1,0);autoAttack(0,0,1,1,0,0,0,-1,0,-1,-1,-1,-1,-1,0,0,0,0,0,-1,-1,0,0,0,0,0,false,-1,-1,-1,-1,-1,-1);useSkill(1,0,0);useSkill(2,0,0);autoAttack(0,0,1,1,3,0,0,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,0,false,-1,-1,-1,-1,-1,-1);autoAttack(3,0,1,1,3,0,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,false,0,-1,-1,-1,-1,-1);finishQuest();',
    'additionalFriendServant("csaber");additionalFriendServant("術傻4");selectStage(2);selectFriend(32,"術傻2","",1,0,-1);startQuest(-1,0);useSkill(2,0,-1);useSkill(2,2,1);switchServant(2,3);autoAttack(3,0,1,1,3,0,0,-1,-1,-1,2,-1,1,2,1,2,1,1,-1,-1,0,-1,2,0,1,1,false,2,-1,-1,-1,-1,-1);finishQuest();'
  ];
  for (var i = 0; i < scriptName.length; i++) {
    writeFile("/sdcard/Download/Robotmon/FGOV3/script/" + scriptName[i] + ".js", scriptContent[i]);
  }
}
console.log("load debug api finish");
