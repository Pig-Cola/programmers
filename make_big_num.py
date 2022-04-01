# 숫자로만 구성된 문자열 중에서 n개 제거한 수증 가장 큰 수
# (문자열 길이 - 제거할 수)개 선택하는 조합(단, 1회 선택만 함) 필요

def solution(number: str, k: int):
    return max(mapList(lambda x: str(x), combination(number, len(number) - k)))


def combination(number, k: int):
    if k == 1:
        return [*number]
    temp = []
    result = [list(map(lambda x: number[i] + x, combination(number[i+1:], k - 1)))
     for i in range(0, len(number))]
    for i in result:
        temp.extend(i)
    return temp


def mapList(func, _list):
    return list(map(func, _list))
