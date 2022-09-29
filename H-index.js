// n편중 h번 이상 인용된 논문이 h편 이상일때
// 나머지 논문이 h번 이하로 인용되는 최대값을 H-index라고 함.

// 분석
/**
 * 1. 비교 분석을 위해 형을 유지할 필요가 없다.
 * 2. 각 데이텨 형태의 특징을 고려해 디자인 한다.
 */

// 전략
/**
 * 1. 인용 횟수가 0에서 부터 최대값까지 각 인용횟수 이상인 논문의 개수를 담는 오브젝트를 생성한다.
 * 2. 그중 키값의 넘버 형태보다 큰 수를 갖는 최대 키값을 구한다.
 */

/**@type {(citations:number[])} */
function solution(citations) {
  const max = Math.max(...citations)
  let paperCitationCount = Object.fromEntries(Object.entries(Array(max + 1).fill(0)))
  for (let i of citations) {
    for (let j = 0; j <= i; j++) {
      paperCitationCount[j] += 1
    }
  }
  return Math.max(
    ...Object.entries(paperCitationCount)
      .filter(([key, v]) => v >= key)
      .map(([key, v]) => key),
  )
}
