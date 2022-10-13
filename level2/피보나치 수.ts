// https://school.programmers.co.kr/learn/courses/30/lessons/12945
/*
피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.

예를들어

F(2) = F(0) + F(1) = 0 + 1 = 1
F(3) = F(1) + F(2) = 1 + 1 = 2
F(4) = F(2) + F(3) = 1 + 2 = 3
F(5) = F(3) + F(4) = 2 + 3 = 5
와 같이 이어집니다.

2 이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수, solution을 완성해 주세요.

제한 사항
n은 2 이상 100,000 이하인 자연수입니다.
*/

function solution( n: number ) {
  const div = BigInt( 1234567 )
  const pibo = makePibo()
  let answer: bigint

  calc()

  // 숫자로 형변환 돌려줌
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
    answer = pibo( n ) % div
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
