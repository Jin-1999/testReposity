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

## 查看列表抽离为单独组件，传递相应参数即可

原代码

```html
<div class="view_table">
  <div class="view_table-panel">
    <div class="view_table-th">
      <div class="view_table-label">债权合同</div>
      <div class="view_table-label">核销金额</div>
      <div class="view_table-label">核销时间</div>
      <div class="view_table-label">操作人</div>
    </div>
    <div
      v-for="(item, i) in curRowData.trueList"
      :key="i"
      class="view_table-tr"
    >
      <div class="view_table-cell">
        <div>{{ item.contractNo }}</div>
      </div>
      <div class="view_table-cell">
        <div>{{ item.trueAmount }}</div>
      </div>
      <div class="view_table-cell">
        <div>{{ item.trueTime }}</div>
      </div>
      <div class="view_table-cell">
        <div>{{ item.trueUserName }}</div>
      </div>
    </div>
  </div>
</div>
```

修改为

```js
<viewTitleTable
  :option="cancelOption"
  :data="curRowData.trueList"
/>
```

```vue
// viewTitleTable
<script>
export default {
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => [],
    },
  },
  computed: {
    column() {
      return this.option.column || [];
    },
  },
  methods: {
    paintHtml() {
      const column = this.option.column;
      if (!column || !column.length) return;
    },
  },
  render() {
    return (
      <div class="view_table">
        <div class="view_table-panel">
          <div class="view_table-th">
            {this.column.map((item) => (
              <div class="view_table-label" key={item.prop}>
                {item.label}
              </div>
            ))}
          </div>
          {this.data.map((item) => (
            <div class="view_table-tr" key={item.id}>
              {this.column.map((cl) => (
                <div class="view_table-cell" key={cl.prop}>
                  {item[cl.prop]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
</script>
```
