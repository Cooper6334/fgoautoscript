isDebug = true;

var JavaScriptInterface = {
  showMenu() {
    console.log("show menu");
  },
  runScriptCallback(name, callback) {
    console.log("JS runScriptCallback", name, callback);
    if (name == `initHTML("TW");` || name == `initHTML("JP");`) {
      initHTML(
        `default;csaber,cskadi;kitune,qp;basic_item/FGOV3/;debug version`
      );
    } else if (name.startsWith(`readScript`)) {
      var scriptName = name.split(`"`)[1];
      var scriptPath = "basic_item/FGOV3/script/" + scriptName + ".js";
      console.log("load script from " + scriptPath);
      fetch(scriptPath)
        .then((response) => response.text())
        .then((text) => resetScript(text));
    }
  },
  runScript(name) {
    console.log("JS runscript", name);
  },
};
console.log("load html debug");
