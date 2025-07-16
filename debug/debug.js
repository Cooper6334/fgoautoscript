//var deviceId = "98071FFAZ002JS";
//var deviceId = "127.0.0.1:62025";
var deviceId = "29161FDH200FZ0";
// var deviceId = "emulator-5554";


function initDebug(s) {
  if (s == null || s == undefined) {
    s = "JP";
  }
  server = s;
  setBlackEdgeByHtmlValue([0, 0, 0, 0]);
  setOtherPreference([0, 0, 0, 0, 0, 0]);
  initScreenSize();
}

function saveMyImage(name, image) {
  var path = getStoragePath();
  var filepath = path + "/" + name + ".png";
  saveImage(image, filepath);
  console.log("adb -s " + deviceId + " pull " + filepath);
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

function testCard() {
  loadAllImage();
  releaseAllImage();
}

function testTemplate() {
  console.log("test start");
  initScreenSize();
  isScriptRunning = true;
  isDebug = true;
  //=======================================

  var screenshot = getScreenshotResize();
  var friendLinePosition = getFriendLine(screenshot);
  // console.log(checkFriendIsFriend(screenshot, friendLinePosition[0]));
  // checkGrandKitsunaItem(friendLinePosition[0], screenshot, 0);

  var x = 76 + friendGrandIcon[0];
  var y = friendLinePosition[0] + friendGrandIcon[1]
  saveCropImage(x, y, friendGrandIcon[2], friendGrandIcon[3]);
  releaseImage(screenshot);

  // saveCropIcon("teamAutoBuild");
  // console.log(icon["teamAutoBuild"]);
  // clickIcon("teamAutoBuild");
  // saveCropIcon("teamPage");

  //=======================================
  isScriptRunning = false;
  console.log("test finish");
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

function testFriendFunctions() {
  console.log("開始測試 friend.js 函數功能");
  setFriendMargin();
  initScreenSize();
  while (isScriptRunning) {
    var screenshot = getScreenshotResize();
    if (screenshot == null) {
      console.log("無法取得螢幕截圖，測試終止");
      return;
    }

    // console.log("=== 測試 getFriendLine ===");
    var friendLinePosition = getFriendLine(screenshot);
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
      friendLog += ((isFriend ? "" : "非") + "好友：");
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
    scrollFriendList();
    if (isSelectFriendEnd()) {
      console.log("已經移到畫面底部，結束測試");
      break;
    }

  }
  console.log("friend.js 函數測試完成");
}

console.log("load debug api finish");
