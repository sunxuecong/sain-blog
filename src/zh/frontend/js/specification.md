# 前端代码规范

## 一、文件命名规范

### 1. 常见名称形式

命名规范是编程规范中最重要的一部分，它直接影响到代码的可读性和可维护性

- `camelCase` 小驼峰式命名法（首字母小写）
- `PascalCase` 大驼峰式命名法（首字母大写）
- `snake_case` 下划线命名法
- `kebab-case` 短横线命名法
- `UPPER_CASE` 大写命名法

### 2. 项目名

全部采用短横线命名法。 🌰： `my-project-name`

### 3. 目录名

全部使用短横线命名法 。有复数结构时，要采用复数命名法。🌰：`src / mixins / hooks/ components / docs /api-dcde `

### 4. 图像文件名

采用下划线命名法， 优先选择单个单词命名，多个单词命名以**下划线**分隔。🌰：

```
logo.png
top.png
logo_police.jpg
logo_national.gif
pic_people.jpg
pic_TV.jpg
```

**注： 文件名称中禁止出现中文**

### JS、CSS、LESS、HTML、VUE  文件命名

采用短横线命名法，优先选择单个单词命名。🌰：

```js
signup.css
index.html
signup.less
render-dom.js
index.vue
```

**注：Vue组件文件使用大写驼峰式命名法。** 🌰：

```js
Dialog.vue
MyComponent.vue
TodoItem.vue
Dialog.jsx
```

## 二、代码命名规范

### 命名严谨性

- 命名应符合语义化,要**望文知义**
- 所有文件名、目录名、变量名中都`不应出现中文`
- 尽量减少缩写的情况发生, 反例：AbstractClass“缩写”命名成 AbsClass，此类随意缩写严重降低了代码的可阅读性

### JavaScript 命名规范

- 变量使用小驼峰式命名法。🌰 `const maxCount = 1996`
- 函数使用小驼峰式命名法 🌰 `function getUserInfo() {}`
- 对象 `key` 使用小驼峰式命名法。🌰 `const user = { userName: 'maomao' }`
- 路由 `path` 使用短横线命名法。🌰 `path: '/user-info'`
- 常量使用大写命名法。🌰 `const MAX_COUNT = 1996`
- `class` 类名使用大驼峰式命名法。🌰 `class User {}`

| 常用命名前缀   | 含义                        | 🌰                               |
| :------------- | :-------------------------- | :------------------------------ |
| **`can`**      | 判断是否可执行某个动作      | `canDelete()` 是否可删除        |
| **`has`**      | 判断是否含有某个值          | `hasPermission()` 是否有权限    |
| **`is`**       | 判断是否为某个值            | `isActive` 是否处于活动状态     |
| **`get`**      | 获取某个值                  | `getUserName()` 获取用户名      |
| **`set`**      | 设置某个值                  | `setUserName()` 设置用户名      |
| **`reset`**    | 重置某个值                  | `resetUserName()` 重置用户名    |
| **`clear`**    | 清除某个值                  | `clearUserName()` 清除用户名    |
| **`format`**   | 格式化某个值                | `formatDate()` 格式化日期       |
| **`validate`** | 验证某些值或条件            | `validateUserName()` 验证用户名 |
| **`create`**   | 创建操作                    | `createUser()` 创建用户对象     |
| **`delete`**   | 删除操作                    | `deleteUser()` 删除用户         |
| **`update`**   | 更新操作                    | `updateUser()` 更新用户         |
| **`render`**   | 渲染视图或 UI 元素          | `renderTable()` 渲染表格        |
| **`on`**       | 用于组件对外暴露事件        | `onSubmit()` 提交表单           |
| **`handle`**   | 用于事件处理函数的命名      | `handleClick()` 点击事件        |
| **`use`**      | `React / Vue` 自定义 `hook` | `useFetch()` 自定义请求 `hook`  |

### HTML 标签属性命名规范

- `html` 标签属性使用短横线命名法。🌰 `<div class="user-info" data-index="0"></div>`

### CSS代码 命名规范

- 类名使用短横线命名法。🌰 `.user-info`
- `ID` 使用小驼峰式命名法。🌰 `#userInfo`
- 自定义变量使用短横线命名法。🌰 `--main-color: #fff`

## 三、 JavaScript 代码规范

### 缩进

使用**2个空格**进行缩进，不推荐使用 `4` 个空格。🌰 :

```js
function hello (name) {
  console.log('hi', name)
}
```

### 分号

代码不允许使用分号，但如果代码是以 `(` 或 `[` 开头的，则需要加分号，否则会解析报错。🌰 :

```js
// good
const appleNum = 1

// good
;[1, 2, 3].forEach(// ...)
```

### 引号

除需要转义的情况外，**字符串统一使用单引号**。🌰 :

```js
let name = '李白'
```

解释：

1. 输入单引号不需要按住 shift，方便输入。
2. 实际使用中，字符串经常用来拼接 HTML。为方便 HTML 中包含双引号而不需要转义写法。

```javascript
var str = '我是一个字符串';
var html = '<div class="cls">拼接HTML可以省去双引号转义</div>';
```

##### 对于较长字符串拼接

```javascript
// 使用数组拼接字符串
let str = [
    '<ul>',
        '<li>第一项</li>',
        '<li>第二项</li>',
    '</ul>'
].join('');
```

### 语句

#####  在 `if / else / for / do / while` 语句中，即使只有一行，也不得省略块 `{...}`。

```javascript
// good
if (condition) {
    callFunc();
}

// bad
if (condition) callFunc();

if (condition)
    callFunc();

```

##### 使用解构赋值处理对象、数组的赋值🌰 :

```javascript
const obj = {
  a: '1',
  b: '2',
  c: '3'
};
// good
let {a,b,c} = obj;

// bad
let a = obj.a;
let b = obj.b;
let c = obj.c;

```

### 类型转换


##### [建议] 转换成 `string` 时，使用 `+ ''`。🌰 ：

```javascript
// good
num + '';

// bad
new String(num);
num.toString();
String(num);
```

##### [建议] 转换成 `number` 时，通常使用 `+`。🌰 ：

```javascript
// good
+str;

// bad
Number(str);
```

##### [建议] `string` 转换成 `number`，要转换的字符串结尾包含非数字并期望忽略时，使用 `parseInt`。🌰 ：

```javascript
var width = '200px';
parseInt(width, 10);
```

##### [建议] 转换成 `boolean` 时，使用 `!!`。🌰 ：

```javascript
var num = 3.14;
!!num;
```

##### [建议] `number` 去除小数点，使用 `Math.floor / Math.round / Math.ceil`，不使用 `parseInt`。🌰 ：

```javascript
// good
var num = 3.14;
Math.ceil(num);

// bad
var num = 3.14;
parseInt(num, 10);
```

### 全局变量

除极特殊功能，不可随意在 window 上挂载属性或者方法。如果定义过多的全局变量 有可能会造成全局变量污染问题。

### 函数

####  函数的长度控制在 `100` 行以内。

将过多的逻辑放在一个大函数中会使代码难以维护。一个清晰易懂的函数应该只完成单一任务。复杂的操作应拆分成多个函数，通过调用这些函数来体现流程。

特定算法等不可分割的逻辑允许例外。

🌰 ：

```javascript
function syncViewStateOnUserAction() {
    if (x.checked) {
        y.checked = true;
        z.value = '';
    }
    else {
        y.checked = false;
    }

    if (!a.value) {
        warning.innerText = 'Please enter it';
        submitButton.disabled = true;
    }
    else {
        warning.innerText = '';
        submitButton.disabled = false;
    }
}

// 直接阅读该函数会难以明确其主线逻辑，因此下方是一种更合理的表达方式：

function syncViewStateOnUserAction() {
    syncXStateToView();
    checkAAvailability();
}

function syncXStateToView() {
    if (x.checked) {
        y.checked = true;
        z.value = '';
    }
    else {
        y.checked = false;
    }
}

function checkAAvailability() {
    if (!a.value) {
        displayWarningForAMissing();
    }
    else {
        clearWarnignForA();
    }
}
```



#### 一个函数的参数控制在 `6` 个以内。

除去不定长参数以外，函数具备不同逻辑意义的参数建议控制在 6 个以内，过多参数会导致维护难度增大。🌰 ：

```js
function Tree(argument1,argument2,argument3,argument4,argument5,argument6) { // bad

}
```



#### 不要改参数，不要对参数重新赋值

随意地对 非自身控制的对象进行修改，很容易造成代码在不可预知的情况下出现问题。因此，设计良好的函数应该避免对外部传入的对象的修改。🌰 :

```js
function Tree(datasource) {
    datasource.name = '' // bad
}
```

可以通过 deepClone 等手段将自身维护的对象与外部传入的分离，保证不会相互影响。



#### 箭头函数

当你一定要用函数表达式（在回调函数里）的时候就用箭头表达式吧

```js
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

```



#### 使用闭包，要小心。

要记住的一件事情，一个闭包的指针指向包含它的范围。因此，附加一个闭包的DOM元素，可以创建一个循环引用，所以，内存会泄漏。例如，下面的代码：

```javascript
function foo(element, a, b) {
    element.onclick = function() { /* 使用 a 和 b */ };
}
```

闭包能保持元素a和b的引用即使它从未使用。因为元素还保持对闭包的一个引用，我们有一个循环引用，不会被垃圾收集清理。在这些情况下，代码的结构可以如下：

```javascript
function foo(element, a, b) {
    element.onclick = bar(a, b);
}

function bar(a, b) {
    return function() { /* 使用 a 和 b */ }
}
```

#### 不要随意保存 `this` 的引用。 使用箭头函数或者 [函数#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)。

```javascript
// bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```



## 四、 Vue 项目规范

### 为组件样式设置作用域

对于应用来说，顶级 `App` 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。

```vue
<template>
  <button class="btn btn-close">X</button>
</template>

// good
<style scoped>
.btn-close {
  background-color: red;
}
</style>

// bad
<style>
.btn-close {
  background-color: red;
}
</style>


```

### v-for 循环必须加上 key 属性，在整个 for 循环中 key 需要唯一

**在组件上必须用 `key` 搭配 `v-for`**。

```vue
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id">
      {{ todo.text }}
  </li>
</ul>
```

### 永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。（性能问题）

```vue
<!-- bad：控制台报错 -->
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id">
      {{ user.name }}
  </li>
</ul>

```

我们可以这样做：

- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表。

```vue
computed: {
  activeUsers: function () {
    return this.users.filter((user) => {
      return user.isActive
    })
  }
}
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id">
      {{ user.name }}
  </li>
</ul>
```

### 组件表达式简单化

如果你发现写了太多复杂并难以阅读的行内表达式，那么可以使用 method 或是 computed 属性来替代其功能。

```vue
<!-- good -->
<template>
  <h1>
    {{ `${year}-${month}` }}
  </h1>
</template>
<script type="text/javascript">
  export default {
    computed: {
      month() {
        return this.twoDigits((new Date()).getUTCMonth() + 1);
      },
      year() {
        return (new Date()).getUTCFullYear();
      }
    },
    methods: {
      twoDigits(num) {
        return ('0' + num).slice(-2);
      }
    },
  };
</script>

<!-- bad -->
<template>
  <h1>
    {{ `${(new Date()).getUTCFullYear()}-${('0' + ((new Date()).getUTCMonth()+1)).slice(-2)}` }}
  </h1>
</template>
```

### 验证组件的 props

验证组件 props 可以保证你的组件永远是可用的（防御性编程）。即使其他同事并未按照你预想的方法使用时也不会出错。

具体：

- 提供默认值。
- 使用 `type` 属性校验类型。
- 使用 props 之前先检查该 prop 是否存在。

```vue
<template>
  <input type="range" v-model="value" :max="max">
</template>
<script type="text/javascript">
  export default {
    props: {
      max: {
        type: Number, // 这里添加了数字类型的校验
        default() { return 10; },
      },
      value: {
        type: Number,
        default() { return 4; },
      },
    },
  };
</script>
```

### 不要将 `this` 赋值给 变量

尽量不要在项目中随意使用 `const that = this;`，这个上文中已经提到过了 ，在 vue中也是 一样的原则。

#### 为什么？

一般来说，当你使用箭头函数时，会保留 `this` 的作用域。（注：箭头函数没有它自己的 this 值，箭头函数内的 this 值继承自外围作用域。）

#### 怎么做？

```vue
<script type="text/javascript">
export default {
  data() {
    return {
      message: 'Hello, Vue!'
    };
  },
  methods: {
    // good
    fetchData() {
      axios.get('https://api.example.com/data')
        .then((response) => {
          this.message = response.data;
        })
    }
    // bad
    fetchData1() {
      let that = this;
      axios.get('https://api.example.com/data')
        .then(function (response) {
          that.message = response.data;
        })
    },

    // good
    delayedMessage() {
      setTimeout(() => {
        this.message = 'Hello after delay!';
      }, 2000);
    }
    // bad
    delayedMessage1() {
      let that = this;
      setTimeout(function() {
        that.message = 'Hello after delay!';
      }, 2000);
    },

  }
};
</script>
```



### 不要打破 vue 的单向数据流

数据 count 从父组件流向子组件，子组件不能直接修改 count，而是通过事件通知父组件，父组件接收到事件后再修改数据。

看🌰 :

```vue
<template>
  <div>
    <p>Child Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    }
  }
};
</script>
```

在这个例子中，子组件直接修改了 props，这是不推荐的做法，因为它破坏了单向数据流的原则。遵循单向数据流的原则可以使 Vue 应用的数据流动更加清晰和可预测，提高应用的维护性。

### 计算属性不能产生副作用

计算属性的设计目的在于提供一个不产生副作用的、纯粹的计算值。如果计算属性有副作用，那么每次访问它的时候可能会导致不可预测的行为。

错误示范：

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Incremented Count: {{ incrementedCount }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  computed: {
    incrementedCount() {
      // 错误：计算属性不应该修改组件的状态
      this.count += 1;
      return this.count;
    }
  }
};
</script>
```

### 其他

- 避免 this.$parent。
- 调试信息 console.log() debugger 使用完及时删除。
- 组件卸载时，一定要清除之前前添加的事件监听器。

## 五、Git 规范

### 请先看说明：

说明：由于咱们的项目开发流程比较简单，下面的git工作流咱们并不能很好的贯彻，但我还是整理了一下。

#### 												**下面的内容仅供参考，不做要求**

![img](https://woai3c.github.io/front-end-specification/assets/img/git-flow.e5218e44.png)



### 命名

分支命名以 `feature/xx-xx` `fix/xx-xx` 的格式命名，中间用短横线 `-` 连接。

### 分支管理

项目需要根据环境的不同创建对应的分支：

- master（线上环境）
- develop（开发环境）
- test（测试环境）
- feature/xxx（功能分支）
- fix/xxx（修复分支）
- 其他...

### 开发新功能

当团队成员开发新功能时，需要从 `master` 分支上拉一个 `feature/功能名称-开发姓名` 分支进行开发，例如：`feature/login-tgz`。开发完成后需要合并到 `develop` 分支进行部署测试。

### 修改 bug

当团队成员修改线上 bug 时，需要从 `master` 分支拉一个 `fix/功能名称-bug号/bug现象` 分支进行修复，例如：`fix/login-404`。 修复完成并通过测试后再合并到 `master` 分支进行部署。

以 `feature` 或 `fix` 开始的分支都属于临时分支，在通过测试并上线后需要将临时分支进行删除。避免 git 上出现太多无用的分支。

### 合并分支

在将一个分支合并到另一个分支时（例如将 `feature/*` 合并到 develop），需要查看自己的新分支中有没有多个重复提交或意义不明的 commit。如果有，则需要对它们进行合并（git rebase）。示例：

```bash
# 这两个 commit 可以合并成一个
chore: 修改按钮文字
chore: 修改按钮样式

# 合并后
chore: 修改按钮样式及文字
```

**注意**，在将分支合并到另一分支前，例如将 `feature/*` 合并到 `develop`。需要先拉取 `develop` 的最新更新，然后回到 `feature/*`，执行 `git rebase develop` 操作，再提交，最后提合并分支操作。

### 标签备份

每次代码上线时，均要对当前的线上环境分支（例如 master）进行打标签处理，用作备份。当线上环境出现问题时，可以快速回滚。标签命名有两种方式：

1. 版本号命名，适合移动端 APP 或组件库
2. 用时间+当天发布次数命名，例如 20230319-1，这种命名方式一般用于业务项目。

## Git Commit Message 规范

git 在每次提交时，都需要填写 commit message。

```bash
git commit -m 'this is a test'
```

commit message 就是对你这次的代码提交进行一个简单的说明，好的提交说明可以让人一眼就明白这次代码提交做了什么。

![img](https://img-blog.csdnimg.cn/img_convert/6ddb0c3a6a923d70d4d8a72229a2e9b6.png)

既然明白了 commit message 的重要性，那我们就更要好好的学习一下 commit message 规范。下面让我们看一下 commit message 的格式：

```md
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

commit message 分为三个部分(使用空行分割):

1. 标题行（subject）: 必填, 描述主要修改类型和内容。
2. 主题内容（body）: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等。
3. 页脚注释（footer）: 可以写注释，放 BUG 号的链接。

### type

commit 的类型：

- feat: 新功能、新特性
- fix: 修改 bug
- perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
- refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改（例如分号修改）
- test: 测试用例新增、修改
- build: 影响项目构建或依赖项修改
- revert: 恢复上一次提交
- ci: 持续集成相关文件修改
- chore: 其他修改（不在上述类型中的修改）
- release: 发布新版本

### scope

commit message 影响的功能或文件范围, 比如: route, component, utils, build...

### subject

commit message 的概述

### body

具体修改内容, 可以分为多行.

### footer

一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

### 约定式提交规范

以下内容来源于：https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/

- 每个提交都必须使用类型字段前缀，它由一个名词组成，诸如 `feat` 或 `fix` ，其后接一个可选的作用域字段，以及一个必要的冒号（英文半角）和空格。
- 当一个提交为应用或类库实现了新特性时，必须使用 `feat` 类型。
- 当一个提交为应用修复了 `bug` 时，必须使用 `fix` 类型。
- 作用域字段可以跟随在类型字段后面。作用域必须是一个描述某部分代码的名词，并用圆括号包围，例如： `fix(parser):`
- 描述字段必须紧接在类型/作用域前缀的空格之后。描述指的是对代码变更的简短总结，例如： `fix: array parsing issue when multiple spaces were contained in string.`
- 在简短描述之后，可以编写更长的提交正文，为代码变更提供额外的上下文信息。正文必须起始于描述字段结束的一个空行后。
- 在正文结束的一个空行之后，可以编写一行或多行脚注。脚注必须包含关于提交的元信息，例如：关联的合并请求、Reviewer、破坏性变更，每条元信息一行。
- 破坏性变更必须标示在正文区域最开始处，或脚注区域中某一行的开始。一个破坏性变更必须包含大写的文本 `BREAKING CHANGE`，后面紧跟冒号和空格。
- 在 `BREAKING CHANGE:` 之后必须提供描述，以描述对 API 的变更。例如： `BREAKING CHANGE: environment variables now take precedence over config files.`
- 在提交说明中，可以使用 `feat` 和 `fix` 之外的类型。
- 工具的实现必须不区分大小写地解析构成约定式提交的信息单元，只有 `BREAKING CHANGE` 必须是大写的。
- 可以在类型/作用域前缀之后，: 之前，附加 `!` 字符，以进一步提醒注意破坏性变更。当有 `!` 前缀时，正文或脚注内必须包含 `BREAKING CHANGE: description`

### 示例

##### fix（修复BUG）

每次 git commit 最好加上范围描述。

例如这次 BUG 修复影响到全局，可以加个 global。如果影响的是某个目录或某个功能，可以加上该目录的路径，或者对应的功能名称。

```js
// 示例1
fix(global):修复checkbox不能复选的问题
// 示例2 下面圆括号里的 common 为通用管理的名称
fix(common): 修复字体过小的BUG，将通用管理下所有页面的默认字体大小修改为 14px
// 示例3
fix(test): value.length -> values.length
```

##### feat（添加新功能或新页面）

```js
feat: 添加网站主页静态页面

这是一个示例，假设对任务静态页面进行了一些描述。

这里是备注，可以是放 BUG 链接或者一些重要性的东西。
```

##### chore（其他修改）

chore 的中文翻译为日常事务、例行工作。顾名思义，即不在其他 commit 类型中的修改，都可以用 chore 表示。

```js
chore: 将表格中的查看详情改为详情
```

其他类型的 commit 和上面三个示例差不多，在此不再赘述。

## 六、规范验证与代码格式化

待完善。。。





## 七、 写在最后

目前已存代码先不算，新添加的文件单个文件不允许超过**1000**行，特别复杂的功能，文件不允许超过**1500**行
