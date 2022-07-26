// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: wrench;
const showOnIOS = (text) => {
    alert = new Alert();
    alert.message = text;
    alert.present();
}

const showAndCopyOnIOS = async (title, text) => {
    let alert = new Alert();
    alert.addAction("Copy");
    alert.addCancelAction("Cancel");
    alert.title = title;
    alert.message = text;
    let idx = await alert.presentSheet();
    if (idx == 0) {
        Pasteboard.copy(text);
    }
}


const antiBasename = (path) => {
    return path.substring(0, path.lastIndexOf("/"))
}

const basename = (path) => {  
    return path.substring(path.lastIndexOf("/") + 1);
}

const removeComments = (string) => {
	let jsCommentsRegex = /[^\S\r\n]*\/\/(.*)/gm;
	return string.replace(jsCommentsRegex, "");
}

const extractPathFromArgs = (arg) => {
    path = JSON.parse(JSON.stringify(arg.fileURLs[0]));    
    return path;
}

const readContentFrom = (path, src) => {
  	let fm;
    if (src == "local") {
    	fm = FileManager.local();
    } else if (src == "icloud") {
    	fm = FileManager.iCloud();
    } else {
    	return new Error("File Manager type has not been specified correctly.");
    }
    
    if (fm.fileExists(path)) {
    	return fm.readString(path);
  	} else {
  		return new Error("File doesn't exists");
  	}
}

const readJsonFrom = (path, src) => {
    return JSON.parse(readContentFrom(path, src));
}

const cleanAndreadJsonFrom = (path, src) => {
	let content = readContentFrom(path, src);
	let cleanContent = removeComments(content);
	return JSON.parse(cleanContent);
}

module.exports = {showOnIOS, showAndCopyOnIOS, menuIOS, antiBasename, basename, removeComments, extractPathFromArgs, readContentFrom, readJsonFrom, cleanAndreadJsonFrom};