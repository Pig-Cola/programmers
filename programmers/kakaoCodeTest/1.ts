/*

대충 생각나는 내용
---
오늘 날짜가 today, 약관 정보와 유효기간이 terms, 약관 동의 날짜와 종류가 privacies에 담겨있다.
단 모든 달에는 28일 까지만 있다고 가정함.

형태는 아래와 같다.

1. today
  `.` 으로 구분된 연,월,일 문자열
  ex) '2022.04.02'

2. terms
  띄어쓰기로 구분된 약관 종류와 유효기간 (개월)이 배열로 주어짐
  ex) ['A 6', 'B 3']

3. privacies
  띄어쓰기로 구분된 동의 날짜와 약관 종류
  ex) ['2021.08.23 A', '2022.01.12']

---
각 동의의 번호를 N번째(index번호 + 1) 라고 할 때, 현재 날짜 기준으로 파기해야 할 번호의 배열들을 오름차순으로 return

*/

function solution(today: string, terms: string[], privacies: string[]) {
  let toDay = new Date(today)
  let termsExpMap = Object.fromEntries(
    terms.map((v) => {
      let [term, expM] = v.split(' ')
      return [term, Number(expM)]
    })
  )

  let result: number[] = []
  privacies.forEach((v, i) => {
    let [agreeDate, term] = v.split(' ')
    let targetDate = new Date(agreeDate)
    targetDate.setMonth(targetDate.getMonth() + termsExpMap[term])

    if (!(targetDate < toDay)) result.push(i + 1)
  })

  return result
}

export {}
