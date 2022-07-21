from datetime import datetime
from collections import OrderedDict
import matplotlib.pylab as plt

# configuration stuff
def extract_config(config_file):
    ret = {}
    with open(config_file, "r") as f:
        for line in f.readlines():
            if "=" in line:
                config, value = tuple([x.strip() for x in line.split("=")])

                ret[config] = value

    return ret

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
