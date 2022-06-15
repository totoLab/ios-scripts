// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: copy; share-sheet-inputs: file-url;
function showOnIOS(text) {
    alert = new Alert();
    alert.message = text;
    alert.present();
}

path = JSON.parse(JSON.stringify(args.fileURLs[0]));
content = FileManager.local().readString(path);
Pasteboard.copy(content);
showOnIOS("Copied successfully");