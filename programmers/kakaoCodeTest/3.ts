/*

대충 기억나는 대로
---
카카오톡에서 이모티콘 플러스 가입률을 상승시키기 위해 이벤트를 진행하려 함.
각 이모티콘에 대해 개별적인 할인율 적용.
이 때, 적용되는 우선순위는 다음과 같음.

1. 이모티콘 플러스 가입자 수가 최대한 많아야 함
2. 이모티콘 매출이 최대로 높아야 함.

모든 소비자는 이모티콘을 구매함.
다만 자신만의 구매 규칙이 있는데, 특정 할인율을 넘어가야만 구매함.
또, 자신만의 상한선을 정해두고 그 금액을 초과할 경우
모든 이모티콘을 환불 (구매하지 않은 결과)처리하고 이모티콘 플러스에 가입함.
할인율은 10%, 20%, 30%, 40% 내에서 정해짐

---

users = [[number(ex: 30) - 최소 구매 할인율, number(ex: 10000) - 초과시 이모티콘 플러스 가입], ...]
emoticons = [number(ex: 7600) - 이모티콘별 정가, ...]

위와같은 정보가 주어졌을 때,
1, 2번 규칙을 우선순위에 맞게 했을 때 가장 높은 만족도로 달성한 값을

[가입자 수, 판매 매출] 과 같은 형태로 return

*/
/*

2번에 적용되어도 1번이 만족하지 못하면 안됨.
1번 먼저 만족한 상황에서 2번 조건을 만족하는 상황 연출 해야함.

구매자 정보를 담는 객체를 구성하여, 각 상황에 맞게 판단 하도록 함.
이모티콘별 여러 할인율이 있어, 상황별 파악을 위해 인스턴스 스스로를 복제할 수 있도록 구성해야 함.

이모티콘마다 각 할인율을 모두 적용해서 확인해야 하지만,
모든 유저의 최소 구매 할인율의 최대값과 최소값을 구하여 그것을 만족하는 범위 내에서만 할인하면 된다.

예)
[[30, 10000], [21, 6000], [18, 5000], [25, 13000]]
일 때 20~30 % 사이 만 확인.
(이유 : 최소값 이하로 할인하면 구매하지 않고, 최대값 이상으로 할인하면 누군가의 추가구매를 유도 할 수 없으면서 매출만 떨어짐)

*/

type UserDataProp = { consummerPercentage: number; maxPrice: number; totalPrice?: number }

class UserData {
  consummerPercentage: UserDataProp['consummerPercentage']
  maxPrice: UserDataProp['maxPrice']
  totalPrice: UserDataProp['totalPrice']

  constructor({ consummerPercentage, maxPrice, totalPrice = 0 }: UserDataProp) {
    this.consummerPercentage = consummerPercentage
    this.maxPrice = maxPrice
    this.totalPrice = totalPrice
  }

  get isPlusSubscribed() {
    return this.totalPrice >= this.maxPrice
  }

  clone() {
    return new UserData(this)
  }
  tryConsum(percentage: number, itemPrice: number) {
    if (this.isPlusSubscribed) return
    if (percentage < this.consummerPercentage) return
    this.totalPrice += itemPrice * ((100 - percentage) / 100)
  }
}

type UserList = [number, number][]

/*

userDataGroup = [userDataGroup, userDataGroup, userDataGroup ... ]
userDataList = [userData, userData, userData... 유저수]

*/

function solution(users: UserList, emoticons: number[]) {
  let [minPer, maxPer] = utill.getMinMaxDiscountPercentagForUserList(users)
  let discountPercentageList = Array(1 + (maxPer - minPer) / 10)
    .fill(true)
    .map((v, i) => minPer + i * 10)

  let userDataGroup = utill.makeUserDataGroupByUserList(users)
  emoticons.forEach((amount) => {
    let tempUserDataList = discountPercentageList.map((discount) => {
      let clonedUserDataGroup = utill.cloneUersDataGroup(userDataGroup)
      utill.tryConsumUserDataGroup(clonedUserDataGroup, discount, amount)
      return clonedUserDataGroup
    })
    userDataGroup = tempUserDataList.flat()
  })

  return utill.calcUserDataGroup(userDataGroup)
}

const utill = {
  getMinMaxDiscountPercentagForUserList(userList: UserList) {
    let discountPercentageList = userList.map((v) => v[0])
    let [min, max] = [Math.min(...discountPercentageList), Math.max(...discountPercentageList)]
    return [Math.ceil(min / 10) * 10, Math.ceil(max / 10) * 10] as const
  },
  makeUserDataGroupByUserList(userList: UserList) {
    return [userList.map(([consummerPercentage, maxPrice]) => new UserData({ consummerPercentage, maxPrice }))]
  },
  cloneUersDataGroup(userDataGroup: UserData[][]) {
    return userDataGroup.map((v) => v.map((vv) => vv.clone()))
  },
  tryConsumUserDataGroup(userDataGroup: UserData[][], per: number, amount: number) {
    userDataGroup.forEach((userDataList) => userDataList.forEach((userData) => userData.tryConsum(per, amount)))
  },
  calcUserDataList(userDataList: UserData[]) {
    let calcData = { plusSubcribedCnt: 0, totalPrice: 0 }
    userDataList.forEach((userData) => {
      if (userData.isPlusSubscribed) {
        calcData.plusSubcribedCnt += 1
      } else {
        calcData.totalPrice += userData.totalPrice
      }
    })
    return calcData
  },
  calcUserDataGroup(userDataGroup: UserData[][]) {
    let calcDataList = userDataGroup.map((v) => utill.calcUserDataList(v))
    let maxSubCnt = Math.max(...calcDataList.map((v) => v.plusSubcribedCnt))
    let maxTotalPrice = Math.max(...calcDataList.filter((v) => v.plusSubcribedCnt === maxSubCnt).map((v) => v.totalPrice))

    return [maxSubCnt, maxTotalPrice]
  },
}

export {}
