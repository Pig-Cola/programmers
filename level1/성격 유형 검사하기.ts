// https://school.programmers.co.kr/learn/courses/30/lessons/118666
/*

1. R, T
2. C, F
3. J, M
4. A. N

설문 : [비동의, 동의]


1: 매우 비동의(3), ~ 3: 약간 비동의(1), 4: 모르겠음(0), 5: 약간 동의(1), ~ 7: 매우 동의(3)

*/

type kakaoMBTI = 'R' | 'T' | 'C' | 'F' | 'J' | 'M' | 'A' | 'N'
type kakaoType = { [x in kakaoMBTI]?: number }[]

type survType = 'RT' | 'TR' | 'FC' | 'CF' | 'MJ' | 'JM' | 'AN' | 'NA'

function solution( survey: survType[], choices: number[] ) {
  const kakao = [
    { R: 0, T: 0 },
    { C: 0, F: 0 },
    { J: 0, M: 0 },
    { A: 0, N: 0 },
  ] as kakaoType

  choices.forEach( ( choice, idx ) => {
    const currentKakao = survey[idx][choice < 4 ? 0 : 1] as kakaoMBTI
    const amount = getAmountFromChoice( choice )

    kakao[getIdxFromKakao( currentKakao )][currentKakao] += amount
  } )

  let result = ''
  kakao.forEach( ( v ) => {
    const [pair0, pair1] = Object.entries( v ) as [string, number][]
    if ( pair0[1] > pair1[1] ) {
      result += pair0[0]
    } else if ( pair0[1] < pair1[1] ) {
      result += pair1[0]
    } else {
      result += [pair0[0], pair1[0]].sort()[0]
    }
  } )
  return result
}

function getAmountFromChoice( choice: number ) {
  return Math.max( choice - 4, 4 - choice )
}
function getIdxFromKakao( surveyTarget: kakaoMBTI ) {
  const idxMap = { R: 0, T: 0, C: 1, F: 1, J: 2, M: 2, A: 3, N: 3 }
  return idxMap[surveyTarget]
}

export default solution
