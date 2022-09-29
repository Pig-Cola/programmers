// https://school.programmers.co.kr/learn/courses/30/lessons/70129
/*
x의 모든 0을 제거.
남은 길이를 N이라고 할 때, N을 2진수로 변환.

이를 1이 될때까지 반복하며,
2진법으로 변환한 횟수와 총 제거한 0의 수를 반환
[횟수, 제거 수]
*/

type Digit = `${number}`
function solution( s: Digit ) {
  let totalRepeatCnt = 0
  let totalDeleteCnt = 0
  for ( let i = true; i === true; ) {
    if ( s === '1' ) break
    const temp = [...s].filter( ( v ) => v === '1' ).join( '' )
    const deleteCnt = s.length - temp.length
    s = temp.length.toString( 2 ) as Digit
    totalDeleteCnt += deleteCnt
    totalRepeatCnt += 1
  }

  return [totalRepeatCnt, totalDeleteCnt] as const
}

export {}
