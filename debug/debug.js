//var deviceId = "98071FFAZ002JS";
//var deviceId = "127.0.0.1:62025";
var deviceId = "29161FDH200FZ0";
// var deviceId = "emulator-5554";
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
  if(name == undefined){
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

function saveCropImage(l, t, r, b) {
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

function testCard() {
  loadAllImage();
  releaseAllImage();
}

console.log("load debug api finish");
