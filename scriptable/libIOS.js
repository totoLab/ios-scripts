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

const extractPathFromArgs = (arg) => {
    path = JSON.parse(JSON.stringify(arg.fileURLs[0]));    
    return path;
}

const readContentFrom = (path) => {  
    return FileManager.local().readString(path);
}

module.exports = {showOnIOS, showAndCopyOnIOS, antiBasename, basename, extractPathFromArgs, readContentFrom};