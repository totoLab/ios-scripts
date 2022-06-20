// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
async function showOnIOS(text) {
    let alert = new Alert();
    alert.addAction("Copy");
    alert.addCancelAction("Cancel"); 
    alert.message = text;
    let idx = await alert.presentSheet();
    if (idx == 0) {
        Pasteboard.copy(text);
    }
}

function antiBasename(path) {
  return path.substring(0, path.lastIndexOf("/"))
}

path = JSON.parse(JSON.stringify(args.fileURLs[0]));
dir = antiBasename(path);
showOnIOS(dir)

function notEnoughPermssion() {
  path = "/private/var/mobile/Library/Logs/";
  fm = FileManager.local();
  files = fm.listContents(path);
  miao = files.join("***");
  showOnIOS(String(miao));
}