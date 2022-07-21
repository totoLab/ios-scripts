# dictionary stuff
def dict_prettify(dictionary):
    for x in dictionary:
        print(x)
        for y in dictionary[x]:
            print(y + ': ' + dictionary[x][y])

def order_dict(d):
    return OrderedDict(
    sorted(d.items(), key = lambda x:datetime.strptime(x[0], '%Y-%m-%d')) )
