---
title: crud中的快速增删改操作
---

:::tip
不需要再写新增或者编辑的窗口，直接调用 curd 上的方法
:::

```html
<avue-crud
  ...
  :option="option"
  @row-save="rowSave"
  @row-update="rowUpdate"
  @row-del="rowDel"
></avue-crud>
```

```js

/*
option: {
	addBtn: true, //新增按钮
	editBtn: true, //编辑按钮
	delBtn: true //删除按钮
}
*/
  // 新增窗口的保存
  rowSave(row, done, loading) {
  	api(param)
		.then(res => {
			const { code } = res.data
			if (Number(code) === 200) {
				done()
				this.onload()
				this.$message.success('操作成功')
			}
		})
  		.finally(() => {
  			loading()
  		})
  },
  // 编辑窗口的保存
  rowUpdate(row, index, loading, done) {
	  api(param).then(res => {
		  if(Number(code) === 200) {
			loading()
			this.onload()
  			this.$message.success('操作成功')
		  }
	  })
  },
  // 删除行操作
  rowDel(row, index) {
  	api(param).then((res) => {
		if(Number(code) === 200) {
			this.onload()
			this.$message.success('操作成功')
		}
  	})
  }

```
