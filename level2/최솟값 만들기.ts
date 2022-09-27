type NumArray = number[]

/*

각 배열에서 가장 큰 수와 가장 자큰 수를 빼서 곱해야 결과적으로 작은 값이 나옴
정렬 후 순차적 곱셈 누계
단, 각각 오름차순과 내림차순으로 정렬한다.

*/

function solution(A: NumArray, B: NumArray) {
  ;[A, B] = [[...A], [...B]]
  let totalAmount = 0
  A.sort((a, b) => a - b)
  B.sort((a, b) => b - a)
  A.forEach((v, i) => {
    totalAmount += A[i] * B[i]
  })
  return totalAmount
}

export {}
