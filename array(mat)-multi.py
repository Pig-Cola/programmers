import numpy as np


def solution(arr1, arr2):
    ar1 = np.array([np.array(i) for i in arr1])
    ar2 = np.array([np.array(i) for i in arr2])

    print(ar1 * ar2)


solution([[1, 4], [3, 2], [4, 1]], [[3, 3], [3, 3]])


def mapList(func, _list):
    return list(map(func, _list))
