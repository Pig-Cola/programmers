// 1. 이중 원형 링크드 리스트를 구성
// 2. 각 알파벳 위치를 리전이라고 할때 각 리전은 이중 원형 링크드 리스트로 구성되어 있음
// 3. 각 리전을 담고있는 데이터 구조도 이중 원형 링크드 리스트를 사용.

// 경우의 수
/**
 * 1. ABZ. BZB 와 같이 정방향 역방향 상관없이 동일
 * 2. BAZ 와 같이 역방향이 짧은 경우
 * 3. ZBA 와 같이 정방향이 짧은 경우
 * 4. BAZAAAZB 와 같이 정뱡향 역방향 상관없이 이동하다가 꺽어야 빠른경우
 * 5. BZAAAAZAB 와 같이 정방향으로 이동하다가 역방향으로 꺽어야 빠른경우
 * 6. BAZAAAB 와 같이 역방향으로 이동하다가 정방향으로 꺽어야 빠른경우
 * 7. BAZAAABAA 와 같이 정방향으로 진행이 짧은경우 (특수)
 */

// 전략
/**
 * 1. 가장 짧은 경로를 구하는 방법을 구현한다.
 * 2. 가장 짧은 상하좌우 레버 경로만으로 이동하며 레버를 조작한다.
 * 3. 레버 조작 횟수를 돌려준다.
 *
 * (모든 경우의 수 만큼 조작하고 최저를 구하는 것 보다 빠르다고 생각)
 */

// 분석
/**
 * 1. A는 상하 레버를 조작하지 않는다.
 * 2. 가장 많이 연속된 A를 지나치지 않는 것이 가장 빠른 길이다.
 * 3. 단, 지나치지 않기위해 방향을 꺽었을 때 마주한 A때문에 오히려 더 길어질 때도 있다.
 * 4. 가장 많이 연속된 A를 피해가는 좌우 레버 조작횟수와 지나쳤을 때 조작횟수를 체크하여 낮은 좌우 레버 조작횟수를 취한다.
 * 5. 위에서 취한 이동 방법으로 (정, 역, 정방향 후 역, 역방향 후 정 등등) 이동하며 레버조작을 실제로 진행한다.
 * 6. 상하좌우 모든 레버조작시 answer를 증가시킨다.
 */

// 알파벳 모음
const alphabet = Array(90 - 65 + 1)
  .fill('')
  .map((v, i) => String.fromCharCode(i + 65))

/**@type {(name:string)=>number} */
function solution(name) {
  const makeName = new MakeName(name.length)
  let answer = 0
  // skip될 A의 최대 연속 반복 횟수
  let maxLen = Math.max(
    ...name
      .replace(/[^A]/g, '|')
      .split('|')
      .map((v) => v.length),
  )
  let target = name.indexOf('A'.repeat(maxLen))
  let prev = name.slice(target + maxLen)
  let curr = name.slice(0, target)
  let skip = name.slice(target, target + maxLen)
  // prev에 존재하는 연속된 A의 길의
  let prevMaxLen = Math.max(
    ...prev
      .replace(/[^A]/g, '|')
      .split('|')
      .map((v) => v.length),
  )
  // 연속된 A를 제외한 prev의 길이
  let prevTempLen = prev.indexOf('A'.repeat(prevMaxLen)) + prevMaxLen === prev.length ? prev.length - prevMaxLen : prev.length
  // skip하지 않을 경우의 길이
  let noSkipLen = curr.length + skip.length + prevTempLen
  const isNotSkip = noSkipLen <= curr.length * 2 - 2 + prev.length && noSkipLen <= prev.length * 2 - 1 + curr.length
  const isStaticDirection = isNotSkip || prev.length <= curr.length - 1 || !maxLen || !curr.length
  let currLegion = prev.length === name.length ? 0 : prev.length
  const init = isStaticDirection ? 0 : prev.length + curr.length - 1

  // 스킵을 할 경우 스킵될 부분을 가장 오른쪽으로 밀어 계산하기 용이하게 구조만 변경
  if (isNotSkip) {
    name = curr + skip + prev
    currLegion = 0
  } else {
    name = prev + curr + skip

    for (let i = 0; i < currLegion; i++) {
      makeName.goNext()
    }
  }

  // 현재 커서위치와 방향에 맞게 진행하기 위한 초기 위치의 차이가 있으면
  // 이를 동기시켜 주면서 해당 레버를 조작
  if (currLegion !== init) {
    let step = init - currLegion
    let direction = step > 0
    step = Math.abs(step)

    if (step <= name.length / 2) {
      for (let i = 0; i < step; i++) {
        direction ? makeName.goNext() : makeName.goPrev()
        answer += 1
      }
    } else {
      for (let i = 0; i < name.length - step; i++) {
        direction ? makeName.goPrev() : makeName.goNext()
        answer += 1
      }
    }
    currLegion = init
  }

  // 현재 위치와 방향에 맞는 레버 조작
  for (let i = init; i < name.length && i >= 0; i += isStaticDirection ? 1 : -1) {
    let char = name[i]
    let currChar = makeName.getOrigin(i).value
    let step = char.charCodeAt() - currChar.charCodeAt()

    if (char === currChar) {
      continue
    }

    if (i !== currLegion) {
      let legStep = i - currLegion

      for (let j = 0; j < Math.abs(legStep); j++) {
        isStaticDirection ? makeName.goNext() : makeName.goPrev()
        answer += 1
      }
      currLegion = i
    }

    if (step <= alphabet.length / 2) {
      for (let j = 0; j < step; j++) {
        makeName.curr.val.goNext()
        answer += 1
      }
    } else {
      for (let j = 0; j < alphabet.length - step; j++) {
        makeName.curr.val.goPrev()
        answer += 1
      }
    }
  }
  // 레버 조작 끝

  return answer
}

// 추상화
// 추상화
// 추상화
// 추상화
// 추상화

// 이중 연결 리스트를 구성하기 위한 최소단위인 Node 생성
// (Nodes라고 이름 지은 이유는 Node라는 브라우저 class가 존재하기 때문)
class Nodes {
  // 이중 연결이 필요하기 때문에
  // next와 prev라는 두개의 포인터가 필요하다.
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }

  get value() {
    // 만약 값이 또다른 이중 원형 연결 리스트일 경우
    // 그 이중 원형 연결 리스트에서의 값을 가져온다.
    if (this.val instanceof DublyCircularLinkedList) {
      return this.val.value
    } else {
      return this.val
    }
  }

  setNext(Nodes) {
    this.next = Nodes
  }
  setPrev(Nodes) {
    this.next = Nodes
  }
}

// 이중 원형 연결 리스트 생성
class DublyCircularLinkedList {
  constructor(template) {
    this.curr = null
    this.init(template)
  }

  // 이중 원형 연결 리스트를 생성할 때에
  // 삽입된 Array를 처리하는 함수
  _init(template) {
    if (Array.isArray(template)) {
      let temp = template.map((v) => new Nodes(v))
      temp.forEach((v, i, arr) => {
        v.next = arr[arr.length > i + 1 ? i + 1 : 0]
        v.prev = arr[(i || arr.length) - 1]
      })

      this.curr = temp[0]

      return temp
    }
  }

  // _init함수가 단 한번만 호출되게 하고
  // 이후 재 호출될 경우 그 값을 그대로 돌려주는 함수
  init = (() => {
    let once = true
    let returnValue = null

    return (template) => {
      if (!once) {
        return returnValue
      }

      returnValue = this._init(template)
      once = false
    }
  })()

  // 현재 커서가 가르키고 있는 Node의 값
  get value() {
    return this.curr.value
  }

  // 커서의 이동과 관련된 함수
  goNext() {
    this.curr = this.curr.next
    return this.value
  }
  goPrev() {
    this.curr = this.curr.prev
    return this.value
  }
}

class MakeName extends DublyCircularLinkedList {
  // this.origin에 Node가 담겨있는 원래 형태의 Array를 저장.
  constructor(length) {
    let temp = Array(length)
      .fill('')
      .map((v) => new DublyCircularLinkedList(alphabet))
    super(temp)
    this.origin = this.init()
  }

  // 모든 노드의 값을 조회. 이때 노드의 값은 이중 원형 연결 리스트 이므로
  // 해당 리스트의 커서가 가르키는 노드의 값이 된다.
  get fullName() {
    return this.origin.map((v) => v.value).join('')
  }

  // 특정한 index번호의 값 또는 Node자체를 조회할 수 있도록 하는 함수
  getOrigin(idx) {
    return this.origin[idx] || {}
  }
}

// 풀이 후 아쉬운 점
// 풀이 후 아쉬운 점
// 풀이 후 아쉬운 점

/**
 * 1. 너무 많은 시간이 소요된 점. (추상화 및 방향 선택 알고리즘)
 * 2. 직접 조작되는 레버를 구현하였기에 실제 상황에 빗대어 이해하기 쉬우나
 *    그만큼 시간복잡도와 공간복잡도는 증가하게 된다.
 * 3. 알고리즘 그자체로 접근 (그리디: 탐욕적인 알고리즘) 한다면
 *    좀더 일반화시켜 실제 동작 부분을 덜어낼 수 있을 것이다.
 */
