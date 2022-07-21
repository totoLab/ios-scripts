from datetime import datetime
from collections import OrderedDict
import matplotlib.pylab as plt
import re
import sys

# configuration stuff
def valid_config(config):
    minimum_config_options = ["storage", "fields"]
    missing_options = []
    for option in minimum_config_options:
        if option not in config.keys():
            missing_options.append(option)

    if len(missing_options) > 0: 
        raise RuntimeError(f"Configuration is missing some fields: {missing_options}")
    return True

def extract_config(config_file):
    ret = {}
    with open(config_file, "r") as f:
        current_config = None
        for line in f.readlines():
            line = line.strip()
            
            match = re.search("\[([[a-z]|[A-Z])+\]", line)
            if match is not None:
                start, end = match.span()
                current_config = line[start+1:end-1].strip()
            else:
                if current_config is not None:
                    if current_config not in ret:
                        ret[current_config] = {}
                    if "=" in line:
                        option, value = tuple([x.strip() for x in line.split("=")])
                        ret[current_config].update({option: value}) 
                else:
                    raise RuntimeError("Configuration file is not valid.")

    if valid_config(ret):   
        return ret

def check_chosen_device(available_devices):
    args = sys.argv
    if len(args) < 2:
        if len(available_devices) > 1:
            raise RuntimeError("No option was given as argument to the command. Retry.")
        else:
            choice = list(available_devices.keys())[0]
    else:
        choice = args[1].strip()
        if choice not in available_devices:
            raise RuntimeError(f"{choice} is not an available device, if you have the logs, specify in the config file how to reach them.")

    return choice

# graphics
def graph_info_field(d, field):
    lists = sorted(d.items()) # sorted by key, return a list of tuples
    
    keys, values = zip(*lists) # unpack a list of pairs into two tuples
    
    x = ()
    for key in keys:
        vertical_key = ""
        for char in key:
            vertical_key += char + "\n"

        x += vertical_key,

    fig, ax = plt.subplots()
    fig.set_tight_layout(True)

    y = ()
    for value in values:
        y += int(value[field]),

    plt.title(field)
    plt.plot(x, y)
    plt.show()


# dictionary stuff
def dict_prettify(dictionary):
    for x in dictionary:
        print(x)
        for y in dictionary[x]:
            print(y + ': ' + dictionary[x][y])

def order_dict(d):
    return OrderedDict(
    sorted(d.items(), key = lambda x:datetime.strptime(x[0], '%Y-%m-%d')) )
