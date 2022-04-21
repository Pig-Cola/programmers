// https://programmers.co.kr/learn/courses/30/lessons/12978
// N: 마을개수, road: 길 ([마을 a, 마을 b, 거리]), K: 음식 배달이 가능한 시간
// 1번 마을에 있는 음식점이 배달할 수 있는 마을의 수를 return

// 전략
/**
 * 1. 해당 문제는 자료구조중 가중치가 있는 그래프의 탐색을 나타낸 것 처럼 보여진다.
 * 2. 다만 그 구조를 알지 못하기에 트리 형태로 풀수 있는지 검토해봐야 겠다.
 * 3. 시작은 1번 마을이다.
 */

// 방법
/**
 * 1.
 */

/**@type {(N: number  road: [number, number, number][]  K: number) => number} */
function solution(N, road, K) {
  K += 1
  let graph = new MakeGraph(road)
  console.log(graph)
  return Object.keys(graph.searchVisitableInTime(K)).length
}

class MakeGraph {
  /**
   * @typedef {{value: number  next: {value: node, time: number}[]}} node
   * @type {{[x:number]: node}}
   */
  #nodeMap = {}
  /** @type {(road: [number, number, number][])=>void} */
  constructor(road) {
    for (let i of road) {
      let from = this.__findOrMakeNode(i[0])
      let to = this.__findOrMakeNode(i[1])
      this.__addLine(from, to, i[2])
    }
    this.start = this.#nodeMap[1]
  }

  __findOrMakeNode(num) {
    let temp = this.#nodeMap[num]
    if (temp) {
      return temp
    }

    temp = { value: num, next: [] }
    this.#nodeMap[num] = temp
    return temp
  }

  /**@type {(from: node  to: node  time: number)=>void} */
  __addLine(from, to, time) {
    let existed = from.next.filter((v) => v.value === to.value)
    if (existed.length && existed[0].time <= time) {
      return
    }

    from.next.push({ value: to, time })
    to.next.push({ value: from, time })
  }

  /**@type {(K: number) => number} */
  searchVisitableInTime(K) {
    /**@type {{[x:number]: boolean}} */
    let visited = {}
    /**@type {[node, number][]} */
    let queue = [[this.start, 1]]

    while (queue.length) {
      let [temp, totalTime] = queue.shift()
      visited[temp.value] = totalTime

      for (let i of temp.next) {
        if (visited[i.value.value] && visited[i.value.value] <= i.time + totalTime) {
          continue
        }

        let time = i.time + totalTime
        if (time <= K) {
          queue.push([i.value, time])
        }
      }
    }
    return visited
  }
}
