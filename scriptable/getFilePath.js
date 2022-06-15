// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
function showOnIOS(text) {
    alert = new Alert();
    alert.message = text;
    alert.present();
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