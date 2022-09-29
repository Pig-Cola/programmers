// https://school.programmers.co.kr/learn/courses/30/lessons/12939
/*
s는 공백으로 구분된 정수가 최소 둘 이상 있는 문자열
*/
function solution( s: string ) {
  const numbers = s.split( ' ' ).map( ( v ) => Number( v ) )
  const min = Math.min( ...numbers )
  const max = Math.max( ...numbers )
  return [min, max].join( ' ' )
}

export {}
