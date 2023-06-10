// https://school.programmers.co.kr/learn/courses/30/lessons/87390

/*

정수 n, left, right가 주어집니다. 다음 과정을 거쳐서 1차원 배열을 만들고자 합니다.

n행 n열 크기의 비어있는 2차원 배열을 만듭니다.
i = 1, 2, 3, ..., n에 대해서, 다음 과정을 반복합니다.
1행 1열부터 i행 i열까지의 영역 내의 모든 빈 칸을 숫자 i로 채웁니다.
1행, 2행, ..., n행을 잘라내어 모두 이어붙인 새로운 1차원 배열을 만듭니다.
새로운 1차원 배열을 arr이라 할 때, arr[left], arr[left+1], ..., arr[right]만 남기고 나머지는 지웁니다.
정수 n, left, right가 매개변수로 주어집니다. 주어진 과정대로 만들어진 1차원 배열을 return 하도록 solution 함수를 완성해주세요.

*/

function solution( n: number, left: number, right: number ) {
  // flat하게 위 조건에 맞도록 구성
    let tempArray = ( Array( n ).fill( true ) as true[] ).flatMap( ( _v, row ) =>
    ( Array( n ).fill( true ) as true[] ).map( ( v, col ) => {
      let target = row + 1
      let current = col + 1
      return target < current ? current : target
    } ),
  )
  return tempArray.slice( left, right + 1 )
}

export {}
