// https://programmers.co.kr/learn/courses/30/lessons/42842
// 카펫 모양을 보았다.
// 각 색상별 격자의 수를 기억했지만 전체 크기를 모른다.
// [가로, 세로] 형태의 정보를 돌려줘라.

// 전략
/**
 * 1. 중앙의 노란색 격자의 모양과 전체 모양의 상관관계를 파악한다. (shape)
 * 2. 중앙의 노란색 격자의 수가 만들 수 있는 모양의 경우의 수를 파악한다.
 * 3. 해당 경우의 수들 중 전체 모양이 두 색상을 더한 수가 만들수 있는 모양인지 확인한다.
 * 4. 만족하는 모양을 돌려준다.
 */

// 방법
/**
 * [노란색 격자의 모양(shape)과 전체 모양(shape)의 상관관계]
 *
 * - 노란색 격자의 모양이 [[n, m]] 의 행렬일 때
 *   전체 모양은 행렬의 합 [[n, m]] + [[2, 2]] 이다.
 *
 *
 * [노란색 격자가 만들 수 있는 모든 모양]
 *
 * - 가로가 세로보다 길거나 같아야 하며, 정수형만 가능하다.
 * - 격자의 수 = n + m 일 때, n >= m 이 성립하는 모든 [n, m] 이다.
 *
 *
 * - 전체 모양의 가로 * 세로 는 두 격자의 수를 더한 값과 같다.
 */

/**
 * @param { number } brown
 * @param { number } yellow
 */
function solution( brown, yellow ) {
  let totalCnt = brown + yellow
  let ifYellowShape = ifShape( yellow )
  let ifTotalShape = ifYellowShape.map( ( [hor, ver] ) => [hor + 2, ver + 2] )
  return ifTotalShape.filter( ( [hor, ver] ) => hor * ver === totalCnt )[0]
}

/**@param { number } num */
function ifShape( num ) {
  /**@type {[number, number][]} */
  let shape = []
  for ( let i = num; i > 0; i-- ) {
    let temp = num / i
    if ( Number.isInteger( temp ) ) {
      shape.push( [i, temp] )
    }
  }
  return shape.filter( ( [hor, ver] ) => hor >= ver )
}
