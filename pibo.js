// https://programmers.co.kr/learn/courses/30/lessons/12945
// 피보나치 수열의 n번째 항을 1234567로 나눈 나머지

// /**@param {number} n */
// function solution(n) {
//   let div = 1234567
//   let pibo = makePibo()
//   return pibo(n) % div
// }

// function makePibo() {
//   let piboMap = { 0: 0, 1: 1, 2: 1 }

//   /**@param {number} n */
//   const pibo = (n) => {
//     if (!(n in piboMap)) {
//       piboMap[n] = pibo(n - 1) + pibo(n - 2)
//     }
//     return piboMap[n]
//   }

//   return pibo
// }

// /**@param {number} n */
// function solution(n) {
//   let div = 1234567
//   let pibo = makePibo()
//   return pibo(n) % div
// }

// function makePibo() {
//   let piboMap = { 0: 0, 1: 1, 2: 1 }

//   /**@param {number} n */
//   const pibo = (n) => {
//     if (!(n in piboMap)) {
//       piboMap[n] = pibo(n - 1) + pibo(n - 2)
//     }
//     return piboMap[n]
//   }

//   return pibo
// }

// // 수학적 방식으로 구하기
// /**
//  * [일반항 도출]
//  *
//  */

// /**@param {number} n */
// function solution(n) {
//   return Math.round(((1 + 5 ** 0.5) ** n - (1 - 5 ** 0.5) ** n) / (2 ** n * 5 ** 0.5))
// }
