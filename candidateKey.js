// 주어진 정보들을 가지고 고유한 값으로 활용될 수 있는 튜플을 후보키라고 할때 가능한 후보키의 수를 구하여라
// https://programmers.co.kr/learn/courses/30/lessons/42890

// 전략
/**
 * 1. 이차원 배열중 깊이 1에 해당하는 요소를 data 깊이 2에 해당하는 요소를 field라고 가정한다.
 * 2. 각 data들에 대해 고유한 후보키로 사용될 수 있는 tuple(필드 또는 필드의 조합)의 수를 구한다.
 */

/**@type {(relation: string[][]) => number} */
function solution( relation ) {
  let answer = 0
  let maxFieldLen = relation[0].length
  let uniqueMap = {}
  let candidateKeyMap = new CandidateKey()

  for ( let i = 0; i < relation[0].length; i++ ) {
    for ( let j = 0; j < relation.length; j++ ) {
      candidateKeyMap.push( relation[j][i], i )
    }
  }

  uniqueMap = { ...candidateKeyMap.makeUniqueMap() }

  for ( let i = 0; i < maxFieldLen; i++ ) {}

  return answer
}

/**@type {(num: number  arr: (number|string)[])=>string[]} */
function pickNum( num, arr ) {
  if ( num === 1 ) {
    return [...arr].map( ( v ) => String( v ) )
  }

  let pick = []
  for ( let i = 0; i < arr.length; i++ ) {
    let target = arr[i]
    pick.push( ...pickNum( num - 1, arr.slice( i + 1 ) ).map( ( v ) => `${target}${v}` ) )
  }

  return pick
}

/**@type {(pickNum: string[]) => string[]} */
function uniqueAndOrder( pickNum ) {
  return [...new Set( pickNum.map( ( v ) => [...v].sort( ( a, b ) => a - b ).join( '' ) ) )]
}

class CandidateKey {
  /**@type {(value:any, ...keys:(number|string)[])=>void} */
  push( value, ...keys ) {
    let key = keys.join( '' )
    this[key] = this[key] ?? []
    this[key].push( value )
  }

  clear() {
    for ( let i in this ) {
      delete this[i]
    }
  }

  makeUniqueMap() {
    /**@type {{[x:string]: true}} */
    let uniqueMap = {}
    for ( let i in this ) {
      let unique = [...new Set( this[i] )]
      if ( unique.length === this[i].length ) {
        uniqueMap[i] = true
      }
    }

    return uniqueMap
  }
}
