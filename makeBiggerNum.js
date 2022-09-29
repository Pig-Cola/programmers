// https://programmers.co.kr/learn/courses/30/lessons/42883?language=javascript
// 문제.
// 0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.
// 예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.

// 전략
/**
 * 1. 첫번째 요소부터 순회하며 다음 요소의 숫자상태의 값이 더 크다면 해당 요소를 제거한다.
 * 2. 제거를 수행한 뒤 다시 첫번째 요소부터 반복한다. (k의 수만큼)
 */

// 방법
/**
 * 1. 제거방법 = 문자열의 slice를 통해 제거
 * 2. 전략의 내용에 맞게 제거함.
 * 3. 만약 모든 요소가 다음요소에 대해 숫자상태의 값이 우위에 있다면 뒤에서부터 k개 제거
 */

// /**
//  * @param { string } number
//  * @param { number } k
//  */
// function solution(number, k) {
//   while (k) {
//     for (let i = 0; i < number.length; i++) {
//       let curr = number[i]
//       let next = number[i + 1]

//       if (typeof next === 'undefined') {
//         number = number.slice(0, -k)
//         k = 0
//         break
//       }

//       let [numCurr, numNext] = [curr, next].map((v) => Number(v))

//       if (numCurr < numNext) {
//         number = number.slice(0, i) + number.slice(i + 1)
//         k -= 1
//         break
//       }
//     }
//   }
//   return number
// }

/**
 * @param { string } number
 * @param { number } k
 */
function solution( number, k ) {
  let numbers = [...number].map( ( v ) => Number( v ) )
  while ( k ) {
    for ( let i = 0; i < numbers.length; i++ ) {
      let curr = numbers[i]
      let next = numbers[i + 1]

      if ( typeof next === 'undefined' ) {
        numbers.splice( -k, k )
        k = 0
        break
      }

      if ( curr < next ) {
        numbers.splice( i, 1 )
        k -= 1
        break
      }
    }
  }
  return numbers.join( '' )
}
