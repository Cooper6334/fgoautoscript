var friendX = 76;
var friendServantPosition = [
  [friendX, 345, 232, 144],
  [friendX, 645, 232, 144],
];
var friendItemPosition = [
  [friendX, 492, 232, 45],
  [friendX, 792, 232, 45],
];

//0:normal item, 1:reward item
var friendGrandItemPosition = [
  [
    [friendX + 255, 346, 232, 45],
    [friendX + 255, 485, 232, 45],
  ],
  [
    [friendX + 255, 646, 232, 45],
    [friendX + 255, 785, 232, 45],
  ],
];

var classPositionX = [135, 237, 337, 438, 543, 645, 745, 847, 948, 1048];
var lineOffsetX = [600, 1200];
var pixelColor = [
  [206, 192, 128],
  [243, 212, 164],
  [189, 189, 172],
  [220, 220, 220],
];

/*
if(server =="TW"){
    pixelColor = [[206,192,128],[243,212,164]];
}
*/

var friendServantYOffset = 49;
var friendServantSize = [232, 144];

var friendItemYOffset = 197;
var friendItemSize = [232, 45];

var friendIsFriendOffsetX = 1646; // TODO check resolution

var friendGrandIcon = [50, 240, 140, 20]; // offsetx, offsety, width, height
var friendGrandItemXOffset = 255;
var friendGrandItemYOffset = [51, 190];
var friendGrandKitsunaItemOffset = [275, 140];

var friendStarXOffset = 209;
var friendStarYOffset = 244;
var friendStarSize = 7;

var reloadPosition = 1400;
var barMargin = 0;

var selectFriendList = [];

var friendThreshole = 0.9;

function setFriendMargin() {
  // if (server == "TW") {
  //   reloadPosition = 1237;
  // }
  if (resolution <= 16 / 9) {
    friendX = 76;
    friendServantPosition[0][0] = friendX;
    friendServantPosition[1][0] = friendX;
    friendItemPosition[0][0] = friendX;
    friendItemPosition[1][0] = friendX;
    lineOffsetX[0] = 600;
    lineOffsetX[1] = 1200;
    return;
  }
  var offset = defaultMarginX;
  barMargin = offset;
  if (resolution > 18 / 9) {
    offset = defaultMarginX + 32;
    barMargin = 127;
  }
  friendX = 76 + offset;
  friendServantPosition[0][0] = friendX;
  friendServantPosition[1][0] = friendX;
  friendItemPosition[0][0] = friendX;
  friendItemPosition[1][0] = friendX;
  lineOffsetX[0] = 600 + offset;
  lineOffsetX[1] = 1200 + offset;
}
//selectFriend(0,"csaber",null,0,0,0);
function selectFriend(filter, servant, item, star, checkIsFriend, scrollTimes, grandServantOnly, grandKitsunaItem, grandRewardItem) {
  var scrollUntilNoFriend = false;
  var scrollUntilNoGrand = false;
  var grandServantImage = openImage(imagePath + "grandServant.png");
  if (!isScriptRunning) {
    return;
  }
  if (selectFriendLoose) {
    friendThreshole = 0.9;
  } else {
    friendThreshole = 0.97;
  }
  if (isBattleMainPage()) {
    console.log("已進入戰鬥，選擇好友省略");
    sleep(500);
    return;
  }
  if (isSelectTeamPage()) {
    console.log("已進入隊伍選單，選擇好友省略");
    sleep(500);
    return;
  }
  if (checkIsFriend == undefined) {
    checkIsFriend = true;
  }
  if (grandServantOnly == undefined) {
    grandServantOnly = false;
  }
  if (scrollTimes == undefined) {
    scrollTimes = 3;
  } else if (scrollTimes < 0) {
    if (scrollTime == -2) {
      scrollUntilNoFriend = true;
    } else if (scrollTime == -3) {
      scrollUntilNoGrand = true;
    }
    scrollTimes = 15;
  }
  console.log("-選擇好友-");
  if (!isSelectFriendPage()) {
    console.log("不在選擇好友頁面-選擇好友失敗");
    isScriptRunning = false;
    return;
  }
  var servantImage = [];
  if (servant.length > 0) {
    additionalFriendServant(servant);
  }
  for (var i = 0; i < selectFriendList.length; i++) {
    var servantImagePath =
      itemPath + "friend_servant/" + selectFriendList[i] + ".png";
    servantImage[i] = openImage(servantImagePath);
    if (isDebug) {
      console.log("check servant image " + servantImagePath);
    }
  }

  var itemImage;
  if (item.length > 0) {
    var servantItemPath = itemPath + "friend_item/" + item + ".png";
    itemImage = openImage(servantItemPath);
    if (isDebug) {
      console.log("check item image " + servantItemPath);
    }
  }

  var grandRewardItemImage;
  if (grandRewardItem.length > 0) {
    var grandRewardItemPath =
      itemPath + "friend_item/" + grandRewardItem + ".png";
    grandRewardItemImage = openImage(grandRewardItemPath);
    if (isDebug) {
      console.log("check grand reward item image " + grandRewardItemPath);
    }
  }

  while (isScriptRunning) {
    var t = 1;
    //loop for class filter
    for (var i = 0; i < classPositionX.length; i++) {
      if (!isScriptRunning) {
        return;
      }
      if (filter == 0) {
        i = 9;
      } else if ((filter & t) == 0) {
        t *= 2;
        continue;
      } else {
        t *= 2;
        tapScale(classPositionX[i] + barMargin, 187, undefined, 0);
        sleep(1000);
      }
      if (isSelectFriendEmpty()) {
        continue;
      }
      var scrollCnt = 0;
      while (isScriptRunning) {
        var found = false;
        var screenshot = getScreenshotResize();
        var friendLinePosition = getFriendLine(screenshot);
        var haveNotFriend = false;
        var haveNotGrand = false;

        if (friendLinePosition.length == 0) {
          console.log("辨識好友座標失敗，使用固定座標");
          friendLinePosition = [295, 595];
        }
        if (isDebug) {
          console.log("好友座標 " + friendLinePosition);
        }

        //loop for line
        for (var j = 0; j < friendLinePosition.length; j++) {
          var lineY = friendLinePosition[j];
          // console.log("check line "+lineY);
          var isSameServant = false;
          var isSameItem = true;
          var isFriend = true;
          var isSameGrandKitsunaItem = true;
          var isSameGrandRewardItem = true;

          var isGrandServant = checkIsGrandServant(screenshot, lineY, grandServantImage);
          if (isGrandServant) {
            if (!checkGrandKitsunaItem(screenshot, lineY, grandKitsunaItem)) {
              isSameGrandKitsunaItem = false;
            }
            if (grandRewardItemImage != undefined) {
              isSameGrandRewardItem = checkFriendItem(screenshot, grandRewardItemImage, lineY, false, 1);
            }
          } else {
            haveNotGrand = true;
            if (grandServantOnly) {
              if (isDebug) {
                console.log("Not grand servant, ignore");
              }
              continue;
            }
          }
          if (!isSameGrandKitsunaItem) {
            if (isDebug) {
              console.log("Not same grand kitsuna item, ignore");
            }
            continue;
          }

          if (!isSameGrandRewardItem) {
            if (isDebug) {
              console.log("Not same grand reward item, ignore");
            }
            continue;
          }

          if (servantImage.length <= 0) {
            isSameServant = true;
          } else {
            for (var k = 0; k < servantImage.length; k++) {
              if (servantImage[k] != undefined) {
                if (checkFriendServant(screenshot, servantImage[k], lineY)) {
                  isSameServant = true;
                  break;
                }
              }
            }
          }
          if (!isSameServant) {
            if (isDebug) {
              console.log("Not same servant, ignore");
            }
            continue;
          }

          if (itemImage != undefined) {
            if (isGrandServant) {
            } else {
              isSameItem = checkFriendItem(screenshot, itemImage, lineY, star, -1);
            }

            if (!isSameItem) {
              if (isDebug) {
                console.log("Not same item, ignore");
              }
              continue;
            }
          }

          if (checkIsFriend) {
            isFriend = checkFriendIsFriend(screenshot, lineY);
            if (!isFriend) {
              haveNotFriend = true;
              if (isDebug) {
                console.log("Not friend, break");
              }
              break;
            }
          }
          console.log("好友" + (j + 1) + "符合條件");
          tapScale(675, lineY + 105);
          found = true;
          break;
        }
        releaseImage(screenshot);
        // end loop line

        if (found) {
          releaseImage(grandServantImage);
          for (var k = 0; k < servantImage.length; k++) {
            if (servantImage[k] != undefined) {
              releaseImage(servantImage[k]);
            }
          }
          servantImage = [];

          if (itemImage != undefined) {
            releaseImage(itemImage);
          }
          waitLoading();
          while (isScriptRunning) {
            if (isSelectTeamPage()) {
              sleep(500);
              return;
            } else if (isBattleMainPage()) {
              sleep(500);
              return;
            } else {
              tapScale(460, 5);
              sleep(1000);
            }
          }
        }
        if (isSelectFriendEnd()) {
          console.log("已到最底，刷新好友清單");
          break;
        }
        if (scrollCnt == scrollTimes) {
          console.log("已達到下拉次數，刷新好友清單");
          break;
        }
        if (scrollUntilNoFriend && haveNotFriend) {
          console.log("發現非好友，刷新好友清單");
          break;
        }
        if (scrollUntilNoGrand && haveNotGrand) {
          console.log("發現非冠位從者，刷新好友清單");
          break;
        }
        scrollCnt++;
        scrollFriendList();
        sleep(500);
      }
    }
    reloadFriend();
  }
}

function getFriendLine(screenshot) {
  // console.log("getFriendLine");
  var lineY = [];
  var lineCnt = 0;
  for (var y = 255; y < 795; y++) {
    //console.log("check "+y);
    var isLine = false;
    for (var i = 0; i < pixelColor.length; i += 2) {
      //console.log("check i "+i);
      var x = i % lineOffsetX.length;
      var screenshotColor1 = getImageColor(screenshot, lineOffsetX[x], y);
      var screenshotColor2 = getImageColor(screenshot, lineOffsetX[x + 1], y);
      var c1 = isSameColor(
        screenshotColor1.r,
        screenshotColor1.g,
        screenshotColor1.b,
        pixelColor[i][0],
        pixelColor[i][1],
        pixelColor[i][2],
        30
      );
      var c2 = isSameColor(
        screenshotColor2.r,
        screenshotColor2.g,
        screenshotColor2.b,
        pixelColor[i + 1][0],
        pixelColor[i + 1][1],
        pixelColor[i + 1][2],
        30
      );
      if (c1 || c2) {
        // console.log(c1+","+c2+":"+y);
      }
      if (c1 && c2) {
        isLine = true;
        if (isDebug) {
          console.log("isLine " + y);
        }
        break;
      }
    }
    if (isLine) {
      if (lineCnt > 0) {
        if (y - lineY[lineCnt - 1] < 100) {
          //same line or get under line
          lineCnt--;
        }
      }
      lineY[lineCnt] = y;
      lineCnt++;
    }
  }
  console.log("line y " + lineY);

  if (isDebug) {
    console.log("Line at " + lineY);
  }
  return lineY;
}

function checkFriendServant(screenshot, servantImage, lineY) {
  if (isDebug) {
    console.log("checkFriendServant " + lineY);
  }
  return checkImage(screenshot, servantImage,
    friendX, lineY + friendServantYOffset, friendServantSize[0], friendServantSize[1], friendThreshole
  );
}

function checkFriendItem(screenshot, itemImage, lineY, needStar, grandServantItem) {
  if (isDebug) {
    console.log("checkFriendItem " + lineY);
  }
  if (grandServantItem == undefined) {
    grandServantItem = -1;
  }
  var x = friendX
  var y = lineY + friendItemYOffset
  if (grandServantItem >= 0) {
    x = friendX + friendGrandItemXOffset;
    y = friendX + friendGrandItemYOffset[grandServantItem];
  }
  if (!checkImage(screenshot, itemImage, x, y, friendItemSize[0], friendItemSize[1], friendThreshole)) {
    return false;
  }
  if (needStar) {
    if (!checkItemStar(screenshot, lineY)) {
      return false;
    }
  }
  return true;
}

function checkItemStar(screenshot, lineY) {
  if (isDebug) {
    console.log("checkItemStar " + lineY);
  }
  var friendStarY = lineY + friendStarYOffset;
  var isG = 0;
  var notG = 0;
  for (var i = 0; i < friendStarSize; i++) {
    for (var j = 0; j < friendStarSize; j++) {
      var color = getImageColor(
        screenshot,
        friendX + friendStarXOffset + i,
        friendStarY + j
      );
      if (color.g > color.r && color.g > color.b) {
        isG++;
      } else {
        notG++;
      }
    }
  }
  if (isG > notG * 3) {
    return true;
  }
  return false;
}

function checkFriendIsFriend(screenshot, lineY) {
  if (isDebug) {
    console.log("checkFriendIsFriend " + lineY);
  }
  return checkPixel(friendX + friendIsFriendOffsetX, lineY + 198, 227, 255, 177, screenshot);
}

function reloadFriend() {
  while (isScriptRunning) {
    if (isSelectTeamPage()) {
      console.log("誤觸進入選擇隊伍，回到上一頁");
      tapScale(200, 70);
      sleep(2000);
    }
    tapScale(reloadPosition + barMargin, 175, undefined, 0);
    // console.log("cooper debug reloadFriend "+ (reloadPosition + barMargin)+" "+reloadPosition +" "+ barMargin);
    sleep(1000);
    if (isSelectFriendRefreshDialog()) {
      tapScale(1275, 850);
      sleep(3000);
      waitLoading();
      if (isSelectFriendRefreshDialog()) {
        tapScale(937, 850);
        sleep(1000);
      } else {
        return;
      }
    }
  }
}

function scrollFriendList() {
  swipeScale(600, 750, 600, 150, 300);
}

function saveFriendServantImage(cnt, be) {
  sleep(1000);
  setBlackEdgeByHtmlValue(be);
  initScreenSize();
  var screenShot = getScreenshotResize();
  if (screenShot == null) {
    return null;
  }
  var crop;
  if (cnt == 1) {
    crop = cropImage(
      screenShot,
      friendServantPosition[0][0],
      friendServantPosition[0][1],
      friendServantPosition[0][2],
      friendServantPosition[0][3]
    );
  } else {
    crop = cropImage(
      screenShot,
      friendServantPosition[1][0],
      friendServantPosition[1][1],
      friendServantPosition[1][2],
      friendServantPosition[1][3]
    );
  }
  var currentdate = new Date();
  var time = currentdate.getTime();
  var filePath = itemPath + "tmp_servant_" + time + ".png";
  console.log(filePath);
  saveImage(crop, filePath);
  releaseImage(crop);
  releaseImage(screenShot);
  return time;
}

function saveFriendItemImage(cnt, be) {
  sleep(1000);
  setBlackEdgeByHtmlValue(be);
  initScreenSize();
  var screenShot = getScreenshotResize();
  if (screenShot == null) {
    return null;
  }
  var crop;
  if (cnt == 1) {
    crop = cropImage(
      screenShot,
      friendItemPosition[0][0],
      friendItemPosition[0][1],
      friendItemPosition[0][2],
      friendItemPosition[0][3]
    );
  } else {
    crop = cropImage(
      screenShot,
      friendItemPosition[1][0],
      friendItemPosition[1][1],
      friendItemPosition[1][2],
      friendItemPosition[1][3]
    );
  }
  var currentdate = new Date();
  var time = currentdate.getTime();
  var filePath = itemPath + "tmp_item_" + time + ".png";
  console.log(filePath);
  saveImage(crop, filePath);
  releaseImage(crop);
  releaseImage(screenShot);
  return time;
}

function confirmSaveFriendServantImage(imageName, time) {
  if (imageName == undefined) {
    execute("rm " + itemPath + "tmp_servant_" + time + ".png ");
  } else {
    execute(
      "mv " +
      itemPath +
      "tmp_servant_" +
      time +
      ".png " +
      itemPath +
      "friend_servant/" +
      imageName +
      ".png"
    );
  }
  return imageName;
}

function confirmSaveFriendItemImage(imageName, time) {
  if (imageName == undefined) {
    execute("rm " + itemPath + "tmp_item_" + time + ".png ");
  } else {
    execute(
      "mv " +
      itemPath +
      "tmp_item_" +
      time +
      ".png " +
      itemPath +
      "friend_item/" +
      imageName +
      ".png"
    );
  }
  return imageName;
}

function deleteFriendServantImage(imageName) {
  var path = itemPath + "friend_servant/" + imageName + ".png";
  execute("rm " + path);
  return imageName;
}

function deleteFriendItemImage(imageName) {
  var path = itemPath + "friend_item/" + imageName + ".png";
  execute("rm " + path);
  return imageName;
}

function additionalFriendServant(friend) {
  selectFriendList[selectFriendList.length] = friend;
}

function checkIsGrandServant(lineY, screenshot, grandServantImage) {
  return checkImage(screenshot, grandServantImage,
    friendX + friendGrandIcon[0], lineY + friendGrandIcon[1], friendGrandIcon[2], friendGrandIcon[3], friendThreshole
  );
}

function checkGrandKitsunaItem(lineY, screenshot, kitsuna) {
  var result = -1;
  var x = friendX + friendGrandKitsunaItemOffset[0];
  var y = lineY + friendGrandKitsunaItemOffset[1];
  if (checkPixel(x, y, 101, 101, 101, screenshot)) {
    //none
    result = 0;
  } else if (checkPixel(x, y, 148, 186, 206, screenshot)) {
    //normal effect
    result = 1;
  } else if (checkPixel(x, y, 247, 128, 7, screenshot)) {
    //np effect
    result = 2;
  }
  if (isDebug) {
    var color = getImageColor(screenshot, x, y);
    console.log("checkGrandKitsunaItem check color at " + x + "," + y);
    console.log("checkGrandKitsunaItem get color " + color.r + "," + color.g + "," + color.b);
    console.log("checkGrandKitsunaItem result " + result);
  }
  return kitsuna == result;
}


loadApiCnt++;
console.log("Load friend api finish");
