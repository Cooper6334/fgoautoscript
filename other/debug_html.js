var JavaScriptInterface = {
	showMenu(){
        console.log("show menu");
    },
    runScriptCallback (name,callback){
        if(name==`initHTML("TW");`){
            initHTML(`"";"";"";"";debug version`);
        }
    }
}

console.log("load html debug");