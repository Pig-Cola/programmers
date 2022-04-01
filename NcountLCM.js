// 1. 두 수의 최소공배수가 아닌, n개의 수에 대한 최소 공배수를 구해야 한다.
// 2. n개의 수에 대한 최소공배수는 각 두수에 대한 최소공배수끼리의 최소 공배수와 같을 것이다.
// 3. 즉 먼저 두수에 대한 최소공배수를 구할 수 있어야 한다.

// 최소 공배수 구하기.
// 1. 수학적인 방법으로 m 과 n 두 수에 대한 최대 공약수를 A, 최소 공배수를 B라고 할때, m * n = A * B 라는 식이 성립니다.
// 2. 위 식에 의해 최소공배수 B는 (m * n) / A 가 된다.

/**@type {(arr:number[])=>number} */
function solution(arr) {
  let totalLCM = arr[0]
  for (let i = 1; i < arr.length; i++) {
    totalLCM = lcm(totalLCM, arr[i])
  }
  return totalLCM
}

// // 두 수에 대한 최대 공약수 : 재귀(recursion)
// function gcf(num1, num2) {
//   if (num2 === 0) {
//     return num1
//   }
//   return gcf(num2, num1 % num2)
// }

// 두 수에 대한 최대 공약수 : 재귀(recursion) 사용 안함. (반복이 깊어져도 CallStack을 초과하지 않음)
function gcf(num1, num2) {
  while (num2 > 0) {
    let temp = num1
    num1 = num2
    num2 = temp % num2
  }
  return num1
}

// 두 수에 대한 최소 공배수
function lcm(num1, num2) {
  return (num1 * num2) / gcf(num1, num2)
}
