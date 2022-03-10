class Vue {
  constructor(options) {
    if (!options) return;
    this.$el = options.el;
    this.$data = options.data;

    new Observer(this.$data)

    this.proxyVm(this.$data)

    new Compiler(this.$el, this);
  }
  proxyVm(data) {
    for (let key in data) {
      Object.defineProperty(this, key, {
        get() {
          return this[key]
        }
      })
    }
  }
}

// 以v-model="user.age"为例
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;

    let fragment = this.createfragment(this.el);

    // 虚拟节点添加到页面之中
    this.el.appendChild(fragment);
    this.compile(this.el)
  }

  // 判断是否为元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }

  // 创建DOM
  createfragment(node) {
    let fragment = document.createDocumentFragment();
    let firChild;
    while ((firChild = node.firstChild)) {
      fragment.appendChild(firChild);
    }
    return fragment;
  }

  // 编译虚拟DOM
  compile(node) {
    let childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child)
        // 遍历下一级节点
        this.compile(child)
      } else {
        this.compileText(child)
        this.compile(child)
      }
    })
  }

  //编译元素节点
  compileElement(node) {
    let attributes = node.attributes;
    console.log('attributes', attributes);
    [...attributes].forEach(attr => {
      let { name, value: expr } = attr;  // name:v-model  value:user.age
      console.log(name, expr);
      if (name.startsWith('v-')) {
        let [, directive] = name.split('-')  //获得 v- 后面的指令
        CompileUtil[directive](node, expr, this.vm)  //元素节点  user.age  vm实例
      }
    })
  }

  //编译文本节点
  compileText(node) {
    // node.innerText = xxx
    let content = node.textContent;
    // 判断内容是否 {{ }} 双大括
    if (/\{\{(.+?)\}\}/.test(content)) {
      CompileUtil['text'](node, content, this.vm)
    }
  }

}


CompileUtil = {
  getVal(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current]
    }, vm.$data)
  },

  setVal(vm, expr, value) {
    console.log('setVal', vm, expr, value)
    expr.split('.').reduce((data, current, index, arr) => {
      if (index = arr.length - 1) {
        data[current]['age'] = value   //current: user  value:新的值
      }
      return data[current]
    }, vm.$data)
  },

  // 解析v-model指令
  model(node, expr, vm) {
    // node.value = xxx
    let fn = this.updater['modelUpdate']
    // 给输入添加观察者
    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal)
    })
    console.log('vm', vm);
    node.addEventListener('input', (e) => {
      let value = e.target.value
      console.log('input时候vm', vm);
      this.setVal(vm, expr, value)
    })
    let value = this.getVal(vm, expr)
    fn(node, value)
  },
  html() { },
  getContentValue(vm, expr) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1])
    })
  },
  text(node, expr, vm) {   // expr =>   {{user.name}}  {{user.age}}
    let fn = this.updater['textUpdate']
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      // 给{{}}都加上观察者
      new Watcher(vm, args[1], () => {
        fn(node, this.getContentValue(vm, expr))  // 返回
      })
      return this.getVal(vm, args[1])
    })
    fn(node, content)
  },
  updater: {
    modelUpdate(node, value) {
      node.value = value
    },
    htmlUpdate() { },
    textUpdate(node, content) {
      node.textContent = content
    },
  }
}


// 数据劫持
class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    if (data && typeof data == 'object') {
      Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]))
    }
  }
  defineReactive(obj, key, value) {
    this.observer(value)
    let dep = new Dep() // 使每个属性都具有一个发布订阅的功能
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: newValue => {
        if (newValue === value) return
        this.observer(newValue)
        value = newValue
        dep.notify()
      }
    })
  }
}

// 订阅
class Dep {
  constructor() {
    this.subs = []
  }
  // 添加watcher
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 发布更新
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

// vm.$watch(vm, 'user.age', (newVal) => { })
// 观察者
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.oldValue = this.get()
  }
  // 获取旧值
  get() {
    Dep.target = this
    let value = CompileUtil.getVal(this.vm, this.expr)
    Dep.target = null
    return value
  }
  // 数据发生变化 触发更新
  update() {
    let newVal = CompileUtil.getVal(this.vm, this.expr)
    if (newVal !== this.oldValue) {
      this.cb(newVal)
    }
  }
}

