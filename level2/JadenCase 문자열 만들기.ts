// https://school.programmers.co.kr/learn/courses/30/lessons/12951
/*
공백 유지, Pascal Case로 변경
공백문자로 쪼갠 뒤 첫 문자열만 대문자로 변경
*/
function solution(s: string) {
  return s
    .split(' ')
    .map((v) => (v.length ? v[0].toUpperCase() + v.slice(1).toLowerCase() : ''))
    .join(' ')
}

export {}
