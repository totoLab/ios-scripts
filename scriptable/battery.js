// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: battery-half;
// share-sheet-inputs: file-url;
let lib = importModule('libIOS');
  
function computeCapacityPercent(max, current) {  
    raw = current * 100 / max;
    return raw.toFixed(2);
}

function parseInfo(content, field, resultOffSet, regexForType) {
    position = content.search(field);
    start = position + field.length;
    value = content.slice(start, start + resultOffSet);
    return value.match(regexForType).join();
}

function joinDictionaryFields(dictionary) {
    ret = "";
    for (const [key, value] of Object.entries(dictionary)) {
        ret += `${key}: ${dictionary[key]}\n`
    }
    return ret.trimEnd();
}

// starts here
fields = {  
    "ciclesCount": "com.apple.ioreport.BatteryCycleCount",  
    "actualCapacity": "com.apple.power.battery.raw_max_capacity",  
    "designCapacity": "com.apple.power.battery.design_capacity",
    "precomputedCapacityPercent": "com.apple.power.battery.MaximumCapacityPercent", 
}

types = {
    "int": /\d+/g,
}

path = lib.extractPathFromArgs(args);
content = FileManager.local().readString(path);

ciclesCount = parseInfo(content, fields["ciclesCount"], 25, types["int"]);
actualCapacity = parseInfo(content, fields["actualCapacity"], 25, types["int"]);
designCapacity = parseInfo(content, fields["designCapacity"], 25, types["int"]);
actualCapacityPercent = computeCapacityPercent(designCapacity, actualCapacity);
precomputedCapacityPercent = parseInfo(content, fields["precomputedCapacityPercent"], 25, types["int"]);

systemData = {
    "Design capacity mAh": designCapacity,
    "Actual capacity mAh": actualCapacity,
    "Actual capacity %": actualCapacityPercent,
    "Pre-calc capacity %": precomputedCapacityPercent,
    "Cicles count": ciclesCount,
}

title = "Battery stats";
finalMessage = joinDictionaryFields(systemData);
lib.showAndCopyOnIOS(title, finalMessage);