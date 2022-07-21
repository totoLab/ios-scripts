# graphics
def graph_info_field(d, field):
    lists = sorted(d.items()) # sorted by key, return a list of tuples
    
    x, values = zip(*lists) # unpack a list of pairs into two tuples
    
    y = ()
    for value in values:
        y += int(value[field]),

    plt.gcf().autofmt_xdate() # date autoformatting

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
