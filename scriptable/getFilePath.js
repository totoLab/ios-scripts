// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: folder-open;
// share-sheet-inputs: file-url;
let lib = importModule('libIOS');

let path = lib.extractPathFromArgs(args);
let dir = lib.antiBasename(path);
lib.showAndCopyOnIOS("Parent directory", dir);