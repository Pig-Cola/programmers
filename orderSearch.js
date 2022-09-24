// https://programmers.co.kr/learn/courses/30/lessons/72412

// /**@type {(info: string[]  query: string[]) => number[]} */
// function solution(info, query) {
//   var answer = []
//   let infoGroup = groupByAndAllDeep(info.map((v) => v.split(' ')))
//   let queryGroup = query.map((v) => {
//     let result = v.split(' and ')
//     let last = result.pop()
//     result.push(...last.split(' '))

//     return result
//   })

//   for (let querys of queryGroup) {
//     let temp = infoGroup
//     for (let i = 0; i < querys.length - 1; i++) {
//       let search = querys[i] === '-' ? 'all' : querys[i]
//       temp = temp[search]
//       if (!temp) {
//         answer.push(0)
//         continue
//       }
//     }
//     answer.push(temp.filter((v) => Number(v[v.length - 1]) >= Number(querys[querys.length - 1])).length)
//   }

//   return answer
// }

// /**
//  * @template T
//  * @type {(iter: T[][]  key: (v: T[]  i?: number | string  o?: iter) => string | string)
//  * => {[x: string]: T[][]}
//  * }
//  */
// function groupBy(iter, key) {
//   let result = {}
//   if (!iter.length) {
//     return result
//   }

//   for (let i = 0; i < iter.length; i++) {
//     let target = iter[i]

//     if (typeof key === 'function') {
//       result[key(target)] = result[key(target)] || []
//       result[key(target)].push(target)
//     } else if (typeof key === 'string' || typeof key === 'number') {
//       result[target[key]] = result[target[key]] || []
//       result[target[key]].push(target)
//     }
//   }

//   return result
// }

// /**
//  * @template T
//  * @typedef { {[x: string]: T[][]} & {all : T[][]} } rt
//  *
//  * @type { (iter: T[][]) => rt<T> }
//  */
// function groupByAndAllDeep(iter) {
//   let result = groupAndAll(iter, 0)
//   let queue = [[result, 1]]
//   let max = iter[0].length - 1

//   while (true) {
//     let [temp, cnt] = queue.shift()

//     if (cnt >= max) {
//       break
//     }
//     for (let i in temp) {
//       temp[i] = groupAndAll(temp[i], cnt)
//       queue.push([temp[i], cnt + 1])
//     }
//   }

//   return result
// }

// /**
//  * @type {(iter: T[][]  key: (v: T[]  i?: number | string  o?: iter) => string | string)
//  * => {[x: string]: T[][]} & {all : iter}
//  * }
//  */
// function groupAndAll(iter, key) {
//   let result = groupBy(iter, key)
//   result.all = iter
//   return result
// }

// function map(iter, fn) {
//   if (typeof iter !== 'object') {
//     return iter
//   }

//   if (Array.isArray(iter)) {
//     return iter.map(fn)
//   } else {
//     let temp = {}
//     for (let i in iter) {
//       temp[i] = fn(iter[i], i, iter)
//     }
//     return temp
//   }
// }

/**@type {(info: string[]  query: string[]) => number[]} */
function solution(info, query) {
  let answer = []
  let infoList = info.map((v) => v.split(' '))
  let queryList = query.map((v) => {
    let result = v.split(' and ')
    let last = result.pop()
    result.push(...last.split(' '))

    return result
  })
  for (let querys of queryList) {
    let result = infoList
    for (let i = 0; i < querys.length - 1; i++) {
      let search = querys[i]
      result = result.filter((v) => {
        if (search === '-') {
          return true
        }
        return v[i] === search
      })
    }
    answer.push(result.filter((v) => Number(v[v.length - 1]) >= Number(querys[querys.length - 1])).length)
  }

  return answer
}
