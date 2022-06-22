// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: wrench;
module.exports.showOnIOS = (text) => {
    alert = new Alert();
    alert.message = text;
    alert.present();
}

module.exports.showAndCopyOnIOS = async (title, text) => {
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


module.exports.antiBasename = (path) => {
  return path.substring(0, path.lastIndexOf("/"))
}

module.exports.extractPathFromArgs = (arg) => {
    path = JSON.parse(JSON.stringify(arg.fileURLs[0]));    
    return path;
}