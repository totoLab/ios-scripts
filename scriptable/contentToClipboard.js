// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: copy; share-sheet-inputs: file-url;
let lib = importModule('libIOS');

path = lib.extractPathFromArgs(args);
content = FileManager.local().readString(path);
Pasteboard.copy(content);
lib.showOnIOS("Copied successfully");