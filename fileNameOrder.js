// https://programmers.co.kr/learn/courses/30/lessons/17686

// 파일 목록을 순서화 시켜 보고 싶다.
// ex) img01, img10, img11, img02, img09 와 같은 형태를
// img01, img02, img09, img10, img11 와 같게 숫자상의 순서를 고려하도록.

// 단 파일명의 문자열에는 Head/Number/Tail 로 구성되어있는데
// exfile2022ver-2.txt 에서 exfile이 head / 2022 가 number / ver-2.txt 가 tail로 취급된다.

// 파일의 정렬 순서는 head에 의한 대소문자 구분없는 오름차순 정렬 후 number의 숫자 순서상의 정렬로 정한다.
// tail은 비어있을 수도 문자나 혹은 문자후에 다시 숫자가 등장할 수도 있다.
// head와 number가 모두 동일한 위치상에 있다면 입력된 순서를 유지하도록 한다.

/**
 * @param {string[]} files
 * @returns {string[]}
 */
function solution( files ) {
  const [headReg, numReg] = [/[a-zA-Z]+/, /[0-9]+/]
  /** @type {(reg: RegExp) => (str: string) => string} */
  const getMatch = ( reg ) => ( str ) => ( str.match( reg ) || [''] )[0]
  const [getHead, getNum] = [getMatch( headReg ), getMatch( numReg )]

  files
    .map( ( v ) => ( { value: v, head: getHead( v ), num: Number( getNum( v ) ) } ) )
    .sort( ( a, b ) => a.num - b.num )
    .sort( ( a, b ) => {} )
}
