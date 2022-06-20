---
title: 对原有项目代码优化
date: 2022-06-17
categories:
  - other
tags:
  - optimize
---

## 使用数组遍历

原代码

```js
data.sumSurplusPrincipal = priceFilterD(data.sumSurplusPrincipal);
data.sumPayedAmount = priceFilterD(data.sumPayedAmount); //总已还金额
data.interestAmount = priceFilterD(data.interestAmount);
data.runAmount = priceFilterD(data.runAmount);
data.sumSurplusLoan = priceFilterD(data.sumSurplusLoan);
data.loanApply = priceFilterD(data.loanApply);
data.realLoan = priceFilterD(data.realLoan);
data.payedPrincipal = priceFilterD(data.payedPrincipal);
data.resInterest = priceFilterD(data.resInterest);
data.resInterestPenalty = priceFilterD(data.resInterestPenalty);
data.overduePrincipal = priceFilterD(data.overduePrincipal);
data.overdueManagementFee = priceFilterD(data.overdueManagementFee);
data.overdueCommissionFee = priceFilterD(data.overdueCommissionFee);
data.overdueFalsify = priceFilterD(data.overdueFalsify);
data.overdueLate = priceFilterD(data.overdueLate);
data.payHistory = priceFilterD(data.payHistory);
data.payedIssueLoan = priceFilterD(data.payedIssueLoan);
data.claimAmount = priceFilterD(data.claimAmount);
data.overdueTotalAmount = priceFilterD(data.overdueTotalAmount);
if (this.userInfo.idNoDes == 1) {
  data.idNo = idNoHandle(data.idNo);
}

if (this.userInfo.mobileDes == 1) {
  data.phone = phoneHandle(data.phone);
}
```

修改为：

```js
let needFilter = [
  "sumSurplusPrincipal",
  "sumPayedAmount",
  "interestAmount",
  "runAmount",
  "sumSurplusLoan",
  "loanApply",
  "realLoan",
  "payedPrincipal",
  "resInterest",
  "resInterestPenalty",
  "overduePrincipal",
  "overdueManagementFee",
  "overdueCommissionFee",
  "overdueFalsify",
  "overdueFalsify",
  "overdueLate",
  "payHistory",
  "payedIssueLoan",
  "claimAmount",
  "overdueTotalAmount",
  this.userInfo.idNoDes == 1 ? "idNo" : "",
  this.userInfo.mobileDes == 1 ? "phone" : "",
];
needFilter
  .filter((v) => v)
  .forEach((v) => {
    data[v] = priceFilterD(data[v]);
  });
```
