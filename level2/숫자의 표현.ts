// https://school.programmers.co.kr/learn/courses/30/lessons/12924
/*
Finn은 요즘 수학공부에 빠져 있습니다.
수학 공부를 하던 Finn은 자연수 n을 연속한 자연수들로 표현 하는 방법이 여러개라는 사실을 알게 되었습니다.
예를들어 15는 다음과 같이 4가지로 표현 할 수 있습니다.

1 + 2 + 3 + 4 + 5 = 15
4 + 5 + 6 = 15
7 + 8 = 15
15 = 15

자연수 n이 매개변수로 주어질 때, 연속된 자연수들로 n을 표현하는 방법의 수를 return하는 solution를 완성해주세요.
*/
/*
1. 모든 자연수 n은 자기 자신이 1번 연속하는 형태의 자연수 표현이 가능하다.
2. 모든 홀수 n은 2개의 자연수 연속으로 표현하는 방법이 존재한다. (ex: (n / 2)(몫) + ((n / 2)(몫) + 1))
2. 모든 짝수 n은 2개의 자연수 연속으로 표현하는 방법이 존재하지 않는다.
4. 연속된 수는 항상 자연수 n을 표현할 개수 m개로 나눈 몫을 포함한다. -> n을 m으로 나눈 몫 주변만 확인하면 된다.
*/
function solution( n: number ) {
  let count = 1
  if ( n === 1 ) return count
  if ( n % 2 ) count += 1

  for ( let m = 3;  minSum( m ) <= n; m++ ) {
    const center = Math.floor( n / m )
    const len = 2 * m - 1
    let target = Math.floor( len / 2 )
    const preset = Array( len )
      .fill( true )
      .map( ( v, i ) => center + i - target )

    let myPick = preset.slice( target, target + m )
    let nonvisitable = {} as { [x: typeof target]: boolean }

    while ( true ) {
      if ( nonvisitable[target] ) break
      nonvisitable[target] = true
      if ( myPick[0] < 1 ) break

      const sum = arrSum( myPick )
      if ( sum === n ) {
        count += 1
        break
      }

      if ( sum < n ) {
        target += 1
      } else {
        target -= 1
      }

      if ( target < 0 ) break
      if ( target + m > len ) break
      myPick = preset.slice( target, target + m )
    }
  }

  return count
}

function arrSum( arr: number[] ) {
  let calc = 0
  arr.forEach( ( v ) => ( calc += v ) )
  return calc
}

function minSum( n: number ) {
  return ( n * ( n + 1 ) ) / 2
}

export {}
