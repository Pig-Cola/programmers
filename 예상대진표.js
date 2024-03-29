// n명의 참가자 중 A와 B의 대진표 위치가 각각 왼쪽으로 부터 a번째, b번째 일 때,
// A와 B는 몇번 째 라운드에서 조우하게 되나? (단, A와 B가 서로 만나기 전까지는 항상 이기는 것으로 가정한다.)
// ※규칙: 1~2에서 이긴 사람은 1번, 5~6에서 이긴사람은 3번으로 이동 후 다음 라운드 토너먼트가 진행된다.

// 전략
/**
 * 1. n명에 대해 진행되는 이 토너먼트가 의미 있나? (n명을 알 필요가 있나? -> 없을 것으로 보여진다.)
 * 2. 직접 라운드를 진행하며 계산하는 것 보다, 수식 계산이 훨씬 빠르고 용이할 것이다.
 * 3. 왼쪽으로 부터 m번 째 위치한 사람이 승리하면 다음 라운드에는 왼쪽으로 부터 몇번 째 위치하게 될지 수식으로 구할 수 있어야 한다.
 * 4. 만약 위 수식 도출이 불가능 하다면, 직접 라운드를 진행하며 계산한다.
 * 5. 최종적으로 a의 위치와 b의 위치 차이가 1이라면 서로 대진하게 된다. ex) 1번과 2번, 7번과 8번
 *
 * ----- 추가 -----
 *
 * 6. a와 b의 위치 차이가 1이라도 동일 교전 선상이 아닐 경우가 존재한다. ex) 4번과 5번, 2번과 3번
 * 7. 같은 교전선상인지 확인할 수 있어야 한다.
 */

// 분석
/**
 * 1. 토너먼트에서 왼쪽에서 부터 m번째 위치한 사람이 승리했을 때 다음 라운드의 왼쪽에서 부터 위치 구하기.
 *
 * 1과 2는 누가 승리하더라도 다음 라운드에서는 1, 3과 4는 2, 5와6이 3 ...
 * m이 짝수 일 경우 m / 2 가 해당 위치자리임이 성립한다.
 * m이 홀수 일 경우 (m / 2) + 1 에 대한 몫이 위치자리가 된다. --> (m+1)/2의 몫이 위치자리임이 확인되었다.
 *
 *
 *
 * 2. 같은 교전선상인지 확인하는 방법
 *
 * 1과 2 모두 각자가 이길 경우 다음 라운드 위치는 1에 해당한다.
 * 두 수에 대한 다음 라운드 위치가 같다면 두 수는 같은 교전선상에 있다고 할 수 있다.
 */

function solution( n, a, b ) {
  var answer = 1 // 시작하자마자 만나도 1라운드에 만난거다.
  ;[a, b] = [a, b].map( ( v ) => goNextRound( v ) )

  while ( Math.abs( a - b ) !== 0 ) {
    // 두 수 차이가 0이면 이 전라운드에서 만난것이다.
    answer += 1
    ;[a, b] = [a, b].map( ( v ) => goNextRound( v ) )
  }

  return answer
}

function goNextRound( num ) {
  return ~~( ( num + 1 ) / 2 )
}
