// https://programmers.co.kr/learn/courses/30/lessons/42885
// 한번에 최대 2명. 사람들 무게, 제한 무게가 주어질 때 몇개의 9명보트가 필한가

// 전략
/**
 * 1. 비교하기 쉽도록 사람들을 무개별 내림차순으로 정렬한다.
 * 2. 가장 무거운 사람부터 순회하며 해당 사람의 무게를 제외한 제한 무게보다 가벼운 사람들을 추린다.
 * 3. 보다 가벼운 사람들이 없을 경우 혼자 나간다.
 * 4. 있을 경우 그중에서 가장 무거운 사람을 태우고 같이 나간다.
 * 5. 혼자 나가든 같이 나가든 1회의 구출이다.
 */

// 효율성 추가
/**
 * 1. 이미 오름차순으로 정렬된 첫번째 요소와 두번째 요소의 합이 리미트를 넘어간다면 존재하는 모든 요소의 수만큼이 앞으로 필요한 보트 수 이다.
 */

/**
 * @type {(people: number[]  limit: number)}
 */
function solution(people, limit) {
  let answer = 0
  let sortedPeople = people.sort((a, b) => a - b)

  while (sortedPeople.length) {
    if (sortedPeople.length > 1) {
      let [first, second] = [sortedPeople[0], sortedPeople[1]]
      if (first + second > limit) {
        return sortedPeople.length + answer
      }
    }
    answer += 1
    // let person = sortedPeople[sortedPeople.length - 1]
    // sortedPeople = sortedPeople.slice(0, -1)
    let person = sortedPeople.pop()
    let newLimit = limit - person

    if (sortedPeople[0] <= newLimit) {
      // sortedPeople = sortedPeople.slice(1)
      sortedPeople.shift()
    }
  }

  return answer
}
