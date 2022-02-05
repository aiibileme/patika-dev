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
    inputs = [[1, 2], [3, 4], [5, 6, 7]]
    outputs = []
    for i in inputs:
        value = sorted(i, reverse=True)
        outputs.append(value)

    return sorted(outputs, reverse=True)


print sortedList()
