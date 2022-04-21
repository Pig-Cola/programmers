// https://programmers.co.kr/learn/courses/30/lessons/76502
// 문자열의 길이만큼 왼쪽으로 n회 회전하며 나타나는 모든 문자열에 대해 올바른 괄호 문자열이 총 몇번 출현하는지 확인하는 solution

// 전략
/**
 * 1. 1회 회전하는 함수를 제작한다.
 * 2. 문자열이 올바른 괄호 문자열인지 판단하는 함수를 제작한다.
 * 3. 문자의 길이만큼 반복하며 문자열을 회전시키고 각 회전마다 올바른 괄호 문자열인지 확인한다.
 * 4. 올바른 괄호 문자열의 출현 횟수를 돌려준다.
 */

// 방법
/**
 * 1회 회전
 *
 * 1. 문자열과 position을 주면 position위치에서 나뉜 두 문자열을 배열로 담아 돌려주는 함수를 구성한다.
 * 2. position인자에 1을 넣어준 뒤 돌려나온 값의 위치를 서로 변경하여 더하면 왼쪽방향으로 1회 회전된 문자열이 된다.
 */

/**
 * 올바른 괄호 문자열 check
 *
 * 1. 문자열을 순회하며 각 문자열에 맞는 action을 취한다.
 * 1-1. action : 열리는 괄호라면 종류에 상관없이 stack에 추가한다.
 * 1-2. action : 닫히는 괄호라면 stack에서 값을 빼온 뒤 해당 괄호의 열리는 괄호와 동일한지 비교한다.
 *
 * 2. 한번이라도 action에서 false가 나오면 (닫히는 괄호가 나왔을때 stack의 맨 위가 해당 괄호의 열리는 괄호가 아니었던 경우) 올바른 괄호 문자열이 아니다.
 * 3. 모든 요소를 순회 한 후 stack이 비어있는지 확인한다.
 * 4. 비어있다면 올바른 괄호 문자열이며, 아니라면 올바르지 않은 괄호 문자열이다.
 */

function solution(s) {
  var answer = 0
  for (let i = 0; i < s.length; i++) {
    s = rotateOnce(s)

    if (perfact(s)) {
      answer += 1
    }
  }
  return answer
}

function partition(s, position) {
  return [s.slice(0, position), s.slice(position)]
}

function rotateOnce(s) {
  let p = partition(s, 1)
  return p[1] + p[0]
}

function perfact(s) {
  /**@type {string[]} */
  let stack = []
  for (let i of s) {
    if (!action(i)) {
      return false
    }
  }
  return !stack.length

  // action
  // action
  // action

  function action(c) {
    if ([...'({['].includes(c)) {
      stack.push(c)
    } else {
      let target = stack.pop()
      if (!target) {
        return false
      }

      switch (c) {
        case ')': {
          if (target !== '(') {
            return false
          }
          break
        }
        case '}': {
          if (target !== '{') {
            return false
          }
          break
        }
        case ']': {
          if (target !== '[') {
            return false
          }
          break
        }
      }
    }

    return true
  }
}
