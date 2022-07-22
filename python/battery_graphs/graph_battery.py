import os
import re
import lib

config_file = os.path.expanduser("~/.config/ios-battery-graph.conf")

def extract_date(filename):
    date_regex = "(?:19\d{2}|20[0-2][0-9]|2020)-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01])"
    substring = lib.regex_span(date_regex, filename)
    if substring is None: raise RuntimeError(f"Couldn't find a date in the filename {filename}")
    return substring

def value_of_field(content, field, offset=25):
    to_search = "<key>" + field + "</key>"
    position = content.find(to_search)
    if position == -1: raise RuntimeError(f"Can't find field {field}")
    
    start = position + len(to_search)
    field_value = content[start:start+offset].strip()
    substring = lib.regex_span("[0-9]+", field_value)
    if substring is None: raise RuntimeError(f"Couldn't find integer in field value '{field_value}'")
    return substring

def parse_content(content, fields):
    ret = {}
    for name in fields:
        field = fields[name]
        ret[name] = value_of_field(content, field)

    return ret

def extract_info(directory, fields):
    ret = {}
    for filename in os.listdir(directory):
        if filename.endswith(".ips"):
            path = directory + filename
            with open(path, "r") as f:
                content = f.read()
                date = extract_date(filename)
                info = parse_content(content, fields)
                if date not in ret:
                    ret[date] = info
                else:
                    raise RuntimeError("Why are there 2 files with the same date John?")

    return ret

def main(config_file):
    config = lib.extract_config(config_file)
    fields = config["fields"]

    storage_config = config["storage"]
    device = lib.check_chosen_device(storage_config) # raises an error if choice doesn't exist

    device_path = os.path.expanduser(storage_config[device])
    info_d = extract_info(device_path, fields)
    ordered_data = lib.order_dict(info_d)
    #lib.dict_prettify(ordered_data) # prints dictionary in yaml-like formatting
    for field in fields:
        lib.graph_info_field(ordered_data, field)

main(config_file)