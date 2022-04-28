// https://programmers.co.kr/learn/courses/30/lessons/92342
// 양궁대회
// 라이언이 불리한 룰
// 어피치를 이기기 위해 어디를 어떻게 쏴야하나

/**
 * 쐈을 때의 가치 = 내가 얻게 될 점수 / 쏜 화살 개수
 * 쏘지 않았을 때의 가치 = -어피치가 얻게 될 점수
 */

/**
 * @param { number } n
 * @param { [number,number,number,number,number,number,number,number,number,number,number] } info
 */

function solution(n, info) {
  /**@type {{shot: number[]  value: number}[]} */
  let queue = [{ shot: [], value: 0 }]

  /**@type {{shot: number[]  value: number}[]} */
  let results = []

  while (queue.length) {
    let choice = queue.shift()
    let arrowCnt = n - choice.shot.reduce((a, v) => a + v, 0)
    if (choice.shot.length === info.length) {
      results.push(choice)
      continue
    }

    let point = 10 - choice.shot.length
    let cnt = info[choice.shot.length]

    let consumeCnt = cnt ? cnt + 1 : 1

    let { shot, value } = choice

    if (info.length > shot.length + 1) {
      if (arrowCnt >= consumeCnt) {
        queue.push({ shot: [...shot, consumeCnt], value: value + point })
      }
      queue.push({ shot: [...shot, 0], value: value + (cnt ? -point : 0) })
    } else {
      queue.push({ shot: [...shot, arrowCnt], value: value + (cnt ? (arrowCnt >= consumeCnt ? point : -point) : point) })
    }
  }
  let maxValue = maxBy(results, (v) => v.value).value

  if (maxValue < 1) {
    return [-1]
  }

  /**@type {{shot: number[]  value: number}[]} */
  let filteredResultByMaxValue = results.filter((v) => v.value === maxValue)
  if (filteredResultByMaxValue.length === 1) {
    return filteredResultByMaxValue[0].shot
  } else {
    /**@type {[(v)=>number]} */
    let orderList = Array(info.length)
      .fill(true)
      .map((v, i) => [(v) => v.shot[v.shot.length - i - 1], 'desc'])

    return orderByMany(filteredResultByMaxValue, ...orderList)[0].shot
  }
}

/**
 * @template T
 * @param {T[]} arr
 * @param {string | (v: T, i: number, o: arr) => number} fn
 *
 * array 요소들의 fn함수 반환값 중 가장 큰 값을 반환하는 원본 요소를 돌려주는 함수.
 * 가장 큰 값이 여러 값이라면 최초로 등장하는 요소를 돌려준다.
 */
function maxBy(arr, fn) {
  let max = arr
    .map((v, i, o) => {
      value = fn(v, i, o)
      return { origin: v, value }
    })
    .reduce(
      (a, v) => {
        if (v.value > a.value) {
          return { origin: v.origin, value: v.value }
        }
        return a
      },
      { origin: undefined, value: -Infinity }
    )
  return max.origin
}

/**
 * 우선순위 별 정렬
 *
 * @template T
 * @param {T[]} arr
 * @param {[(v: T) => number, ('asc' | 'desc')][]} orderList
 */
function orderByMany(arr, ...orderList) {
  let orderArr = arr

  for (let i = orderList.length - 1; i > -1; i--) {
    let [identify, orderType = 'asc'] = orderList[i]
    orderArr = orderArr.sort((a, b) => {
      let temp_a = identify(a)
      let temp_b = identify(b)

      if (orderType === 'desc') {
        return temp_b - temp_a
      }

      return temp_a - temp_b
    })
  }

  return orderArr
}
