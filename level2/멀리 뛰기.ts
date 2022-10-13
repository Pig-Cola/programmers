// https://school.programmers.co.kr/learn/courses/30/lessons/12914
/*

효진이는 멀리 뛰기를 연습하고 있습니다. 효진이는 한번에 1칸, 또는 2칸을 뛸 수 있습니다. 칸이 총 4개 있을 때, 효진이는

(1칸, 1칸, 1칸, 1칸)
(1칸, 2칸, 1칸)
(1칸, 1칸, 2칸)
(2칸, 1칸, 1칸)
(2칸, 2칸)

의 5가지 방법으로 맨 끝 칸에 도달할 수 있습니다.
멀리뛰기에 사용될 칸의 수 n이 주어질 때, 효진이가 끝에 도달하는 방법이 몇 가지인지 알아내, 여기에 1234567를 나눈 나머지를 리턴하는 함수, solution을 완성하세요.
예를 들어 4가 입력된다면, 5를 return하면 됩니다.

*/
/*

f(1) = 1
f(2) = 2
f(3) = 3
f(4) = 5
f(5) = 8
f(6) = 13
...

피보나치 수열 함수를 
f'(x)라고 할 때
f(x) = f'(x + 1) 라고 보여진다.

*/

function solution( n: number ) {
  let answer = BigInt( 0 )
  let pibo = makePibo()
  let divNum = BigInt( 1234567 )

  calc()

  return Number( answer )

  function calc() {
    // 단계별로 구할 m번째 항
    let m: number = n
    // 오류가 나지 않는 첫 사이클 수
    let targetM: number = 0

    while ( true ) {
      try {
        // 이전 사이클에서
        if ( !targetM ) {
          // 오류가 났었다면
          // 절반의 크기로 재시도
          m = Math.round( m / 2 )
        } else {
          // 오류가 나지 않았다면
          // 첫 사이클 수를 더한만큼으로 재시도
          m += targetM
          if ( m >= n ) m = n
        }
        pibo( m )
      } catch ( err ) {
        continue
      }
      // 오류가 나지 않는 첫 사이클 값 기록
      if ( !targetM ) targetM = m
      // memosize된 값이 n보다 크거나 같다면 종료
      if ( m >= n ) break
    }
    // solution 요청 값
    answer = pibo( n + 1 ) % divNum
  }
}

function makePibo() {
  const piboMap: { [x: number]: bigint } = { 0: BigInt( 0 ), 1: BigInt( 1 ) }

  const pibo = ( n: number ) => {
    if ( !( n in piboMap ) ) {
      piboMap[n] = pibo( n - 2 ) + pibo( n - 1 )
    }
    return piboMap[n]
  }

  return pibo
}

export {}
