// LZW(Lempel–Ziv–Welch) 압축을 구현
// LZW 압축은 1983년 발표된 알고리즘으로, 이미지 파일 포맷인 GIF 등 다양한 응용에서 사용었음.
// 자세한 문제 설명은 프로그래머스(https://programmers.co.kr/learn/courses/30/lessons/17684)에서 확인

// 압축 규격에 따라 압축 한 뒤 색인된 번호를 모아 배열로 return하라.

// 전략
/**
 * 1. 색인을 위한 딕셔너리를 둔다.
 * 2. 들어온 값에 대하여 최대로 연속적인 색인된 값을 추출한 뒤, 처리되지 않은 문자열이 있을경우 추가로 색인한다.
 * 3. 문자열의 마지막까지 위 단락을 반복
 */

/**@type {(msg:string) => number[]} */
function solution(msg) {
  let answer = []
  let zipWord = Object.fromEntries(
    Array(90 - 65 + 1)
      .fill('')
      .map((v, i) => String.fromCharCode(i + 65))
      .map((v, i) => [v, i + 1])
  )
  let zipCount = 27

  for (let i = 0; i < msg.length; i++) {
    for (let j = i; j < msg.length; j++) {
      let word = msg.slice(i, j + 1)
      if (word in zipWord) {
        if (j === msg.length - 1) {
          answer.push(zipWord[word])
          return answer
        }
        continue
      } else {
        zipWord[word] = zipCount++
        answer.push(zipWord[word.slice(0, -1)])
        i = j - 1
        break
      }
    }
  }

  return answer
}

