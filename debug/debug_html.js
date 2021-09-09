var JavaScriptInterface = {
  showMenu() {
    console.log("show menu");
  },
  runScriptCallback(name, callback) {
    if (name == `initHTML("TW");`) {
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
};
console.log("load html debug");
