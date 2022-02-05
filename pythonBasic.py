defaultList = [[1, 'a', ['cat'], 2], [[[3]], 'dog'], 4, 5]
newList = []


def generateList(val):
    for i in val:
        if isinstance(i, list):
            generateList(i)
        else:
            newList.append(i)
    return newList


res = generateList(defaultList)
print(res)


def sortedList():
    a = [[1, 2], [3, 4], [5, 6, 7]]
    b = []
    for i in a:
        c = sorted(i, reverse=True)
        b.append(c)

    return sorted(b, reverse=True)


print sortedList()
