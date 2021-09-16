isDebug = true;

var JavaScriptInterface = {
  showMenu() {
    console.log("show menu");
  },
  runScriptCallback(name, callback) {
    console.log("JS runScriptCallback", name, callback);
    if (name == `initHTML("TW");` || name == `initHTML("JP");`) {
      initHTML(
        `default,default2;csaber,cskadi;kitune,qp;debug/test/;debug version`
      );
    } else if (name.startsWith(`readScript`)) {
      var scriptName = name.split(`"`)[1];
      console.log(scriptName);
      fetch("debug/test/script/" + scriptName + ".js")
        .then((response) => response.text())
        .then((text) => resetScript(text));
    }
  },
  runScript(name) {
    console.log("JS runscript", name);
  },
};
console.log("load html debug");
