// https://school.programmers.co.kr/learn/courses/30/lessons/12909
/*
올바른 괄호 여부를 boolean으로 돌려주는 함수
ex)
  ()() // true
  ((())()) // true
  ((())()))  // false
  )()( // false
*/

/*
올바른 괄호 규칙
1. 열리는 괄호와 닫히는 괄호의 수가 같다. (열리면 닫힌다)
2. 열리는 괄호로 시작해서 닫히는 괄호로 끝난다. (먼저 열려야 닫힌다.)
3. 1번에 대해 판단하는 중 중첩구조가 음수가 된다면 올바르지 않은 괄호이다.
*/

function solution( s: string ) {
  const [firstWord, lastWord] = [s[0], s[s.length - 1]]

  if ( firstWord !== '(' ) return false
  if ( lastWord !== ')' ) return false

  let count = 0
  for ( let i = 0; i < s.length; i++ ) {
    if ( count < 0 ) return false
    const target = s[i]
    if ( target === '(' ) count += 1
    else count -= 1
  }
  return !count
}

export {}
