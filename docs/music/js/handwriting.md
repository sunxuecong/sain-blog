# JavaScript手写代码汇总

## 1. 手写 Object.create

思路：将传入的对象作为原型

```js
function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
```

## 2. 手写 instanceof 方法

instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

实现步骤：

1. 首先获取类型的原型
2. 然后获得对象的原型
3. 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 `null`，因为原型链最终为 `null`

具体实现：

```js
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left), // 获取对象的原型
    prototype = right.prototype; // 获取构造函数的 prototype 对象

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;

    proto = Object.getPrototypeOf(proto);
  }
}
```

## 3. 手写 new 操作符

在调用 `new` 的过程中会发生以上四件事情：

（1）首先创建了一个新的空对象

（2）设置原型，将对象的原型设置为函数的 prototype 对象。

（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）

（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag =
    result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
objectFactory(构造函数, 初始化参数);
```

## 4. 手写 Promise

```js
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  // 保存初始化状态
  var self = this;

  // 初始化状态
  this.state = PENDING;

  // 用于保存 resolve 或者 rejected 传入的值
  this.value = null;

  // 用于保存 resolve 的回调函数
  this.resolvedCallbacks = [];

  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = [];

  // 状态转变为 resolved 方法
  function resolve(value) {
    // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }

    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变，
      if (self.state === PENDING) {
        // 修改状态
        self.state = RESOLVED;

        // 设置传入的值
        self.value = value;

        // 执行回调函数
        self.resolvedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    }, 0);
  }

  // 状态转变为 rejected 方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED;

        // 设置传入的值
        self.value = value;

        // 执行回调函数
        self.rejectedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    }, 0);
  }

  // 将两个方法传入函数执行
  try {
    fn(resolve, reject);
  } catch (e) {
    // 遇到错误时，捕获错误，执行 reject 函数
    reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (value) {
          return value;
        };

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (error) {
          throw error;
        };

  // 如果是等待状态，则将函数加入对应列表中
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }

  // 如果状态已经凝固，则直接执行对应状态的函数

  if (this.state === RESOLVED) {
    onResolved(this.value);
  }

  if (this.state === REJECTED) {
    onRejected(this.value);
  }
};
```

## 5. 手写 Promise.then

`then` 方法返回一个新的 `promise` 实例，为了在 `promise` 状态发生变化时（`resolve` / `reject` 被调用时）再执行 `then` 里的函数，我们使用一个 `callbacks` 数组先把传给then的函数暂存起来，等状态改变时再调用。

**那么，怎么保证后一个 `then` 里的方法在前一个 `then`（可能是异步）结束之后再执行呢？**

我们可以将传给 `then` 的函数和新 `promise` 的 `resolve` 一起 `push` 到前一个 `promise` 的 `callbacks` 数组中，达到承前启后的效果：

- 承前：当前一个 `promise` 完成后，调用其 `resolve` 变更状态，在这个 `resolve` 里会依次调用 `callbacks` 里的回调，这样就执行了 `then` 里的方法了
- 启后：上一步中，当 `then` 里的方法执行完成后，返回一个结果，如果这个结果是个简单的值，就直接调用新 `promise` 的 `resolve`，让其状态变更，这又会依次调用新 `promise` 的 `callbacks` 数组里的方法，循环往复。。如果返回的结果是个 `promise`，则需要等它完成之后再触发新 `promise` 的 `resolve`，所以可以在其结果的 `then` 里调用新 `promise` 的 `resolve`

```js
then(onFulfilled, onReject){
    // 保存前一个promise的this
    const self = this;
    return new MyPromise((resolve, reject) => {
      // 封装前一个promise成功时执行的函数
      let fulfilled = () => {
        try{
          const result = onFulfilled(self.value); // 承前
          return result instanceof MyPromise? result.then(resolve, reject) : resolve(result); //启后
        }catch(err){
          reject(err)
        }
      }
      // 封装前一个promise失败时执行的函数
      let rejected = () => {
        try{
          const result = onReject(self.reason);
          return result instanceof MyPromise? result.then(resolve, reject) : reject(result);
        }catch(err){
          reject(err)
        }
      }
      switch(self.status){
        case PENDING:
          self.onFulfilledCallbacks.push(fulfilled);
          self.onRejectedCallbacks.push(rejected);
          break;
        case FULFILLED:
          fulfilled();
          break;
        case REJECT:
          rejected();
          break;
      }
    })
   }

```




## 6. 手写 Promise.all

**1) 核心思路**

1. 接收一个 Promise 实例的数组或具有 Iterator 接口的对象作为参数
2. 这个方法返回一个新的 promise 对象，
3. 遍历传入的参数，用Promise.resolve()将参数"包一层"，使其变成一个promise对象
4. 参数所有回调成功才是成功，返回值数组与参数顺序一致
5. 参数数组其中一个失败，则触发失败状态，第一个触发失败的 Promise 错误信息作为 Promise.all 的错误信息。

**2）实现代码**

一般来说，Promise.all 用来处理多个并发请求，也是为了页面数据构造的方便，将一个页面所用到的在不同接口的数据一起请求过来，不过，如果其中一个接口失败了，多个请求也就失败了，页面可能啥也出不来，这就看当前页面的耦合程度了

```js
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`argument must be a array`);
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedResult = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          resolvedCounter++;
          resolvedResult[i] = value;
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedResult);
          }
        },
        (error) => {
          return reject(error);
        },
      );
    }
  });
}
// test
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
promiseAll([p3, p1, p2]).then((res) => {
  console.log(res); // [3, 1, 2]
});
```

## 7. 手写 Promise.race

该方法的参数是 Promise 实例数组, 然后其 then 注册的回调方法是数组中的某一个 Promise 的状态变为 fulfilled 的时候就执行. 因为 Promise 的状态**只能改变一次**, 那么我们只需要把 Promise.race 中产生的 Promise 对象的 resolve 方法, 注入到数组中的每一个 Promise 实例中的回调函数中即可.

```js
Promise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject);
    }
  });
};
```



## 8. 手写防抖函数

  函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

  ```js
  // 函数防抖的实现
  function debounce(fn, wait) {
    let timer = null;

    return function () {
      let context = this,
        args = arguments;

      // 如果此时存在定时器的话，则取消之前的定时器重新记时
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      // 设置定时器，使事件间隔指定事件后执行
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    };
  }
  ```



## 9. 手写节流函数

  函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

  ```js
  // 函数节流的实现;
  function throttle(fn, delay) {
    let curTime = Date.now();

    return function () {
      let context = this,
        args = arguments,
        nowTime = Date.now();

      // 如果两次时间间隔超过了指定时间，则执行函数。
      if (nowTime - curTime >= delay) {
        curTime = Date.now();
        return fn.apply(context, args);
      }
    };
  }
  ```



## 10. 手写类型判断函数

  ```js
  function getType(value) {
    // 判断数据是 null 的情况
    if (value === null) {
      return value + "";
    }
    // 判断数据是引用类型的情况
    if (typeof value === "object") {
      let valueClass = Object.prototype.toString.call(value),
        type = valueClass.split(" ")[1].split("");
      type.pop();
      return type.join("").toLowerCase();
    } else {
      // 判断数据是基本数据类型的情况和函数的情况
      return typeof value;
    }
  }
  ```



## 11. 手写 call 函数

  call 函数的实现步骤：

  1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
  2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
  3. 处理传入的参数，截取第一个参数后的所有参数。
  4. 将函数作为上下文对象的一个属性。
  5. 使用上下文对象来调用这个方法，并保存返回结果。
  6. 删除刚才新增的属性。
  7. 返回结果。

```js
// call函数实现
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1),
    result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
```


## 12. 手写 apply 函数

apply 函数的实现步骤：

1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。

2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。

3. 将函数作为上下文对象的一个属性。

4. 判断参数值是否传入

5. 使用上下文对象来调用这个方法，并保存返回结果。

6. 删除刚才新增的属性

7. 返回结果

   ```js
   // apply 函数实现
   Function.prototype.myApply = function (context) {
     // 判断调用对象是否为函数
     if (typeof this !== "function") {
       throw new TypeError("Error");
     }
     let result = null;
     // 判断 context 是否存在，如果未传入则为 window
     context = context || window;
     // 将函数设为对象的方法
     context.fn = this;
     // 调用方法
     if (arguments[1]) {
       result = context.fn(...arguments[1]);
     } else {
       result = context.fn();
     }
     // 将属性删除
     delete context.fn;
     return result;
   };
   ```

   

   ## 13. 手写 bind 函数

   bind 函数的实现步骤：

   1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。

   2. 保存当前函数的引用，获取其余传入参数值。

   3. 创建一个函数返回

   4. 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。
   
      ```js
      // bind 函数实现
      Function.prototype.myBind = function (context) {
        // 判断调用对象是否为函数
        if (typeof this !== "function") {
          throw new TypeError("Error");
        }
        // 获取参数
        var args = [...arguments].slice(1),
          fn = this;
        return function Fn() {
          // 根据调用方式，传入不同绑定值
          return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments),
          );
        };
      };
      ```

      

      ## 14. 函数柯里化的实现
   
      函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
      
      ```js
      function curry(fn, args) {
        // 获取函数需要的参数长度
        let length = fn.length;
      
        args = args || [];
      
        return function () {
          let subArgs = args.slice(0);
      
          // 拼接得到现有的所有参数
          for (let i = 0; i < arguments.length; i++) {
            subArgs.push(arguments[i]);
          }
      
          // 判断参数的长度是否已经满足函数所需参数的长度
          if (subArgs.length >= length) {
            // 如果满足，执行函数
            return fn.apply(this, subArgs);
          } else {
            // 如果不满足，递归返回科里化的函数，等待参数的传入
            return curry.call(this, fn, subArgs);
          }
        };
      }
      
      // es6 实现
      function curry(fn, ...args) {
        return fn.length <= args.length
          ? fn(...args)
          : curry.bind(null, fn, ...args);
      }
      ```

      

      

      

      ## 15. 实现AJAX请求

      AJAX是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

      创建AJAX请求的步骤：
   
      - **创建一个 XMLHttpRequest 对象。**
      
      - 在这个对象上**使用 open 方法创建一个 HTTP 请求**，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
      
      - 在发起请求前，可以为这个对象**添加一些信息和监听函数**。比如说可以通过 setRequestHeader 方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。
      
      - 当对象的属性和监听函数设置完成后，最后调**用 send 方法来向服务器发起请求**，可以传入参数作为发送的数据体。
      
        ```js
        const SERVER_URL = "/server";
        let xhr = new XMLHttpRequest();
        // 创建 Http 请求
        xhr.open("GET", SERVER_URL, true);
        // 设置状态监听函数
        xhr.onreadystatechange = function () {
          if (this.readyState !== 4) return;
          // 当请求成功时
          if (this.status === 200) {
            handle(this.response);
          } else {
            console.error(this.statusText);
          }
        };
        // 设置请求失败时的监听函数
        xhr.onerror = function () {
          console.error(this.statusText);
        };
        // 设置请求头信息
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
        // 发送 Http 请求
        xhr.send(null);
        ```
      
        
      
        ## 16. 使用Promise封装AJAX请求
        
        ```js
        // promise 封装实现：
        function getJSON(url) {
          // 创建一个 promise 对象
          let promise = new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            // 新建一个 http 请求
            xhr.open("GET", url, true);
            // 设置状态的监听函数
            xhr.onreadystatechange = function () {
              if (this.readyState !== 4) return;
              // 当请求成功或失败时，改变 promise 的状态
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error(this.statusText));
              }
            };
            // 设置错误监听函数
            xhr.onerror = function () {
              reject(new Error(this.statusText));
            };
            // 设置响应的数据类型
            xhr.responseType = "json";
            // 设置请求头信息
            xhr.setRequestHeader("Accept", "application/json");
            // 发送 http 请求
            xhr.send(null);
          });
          return promise;
        }
        ```

## 18. 实现深拷贝

- **浅拷贝**：浅拷贝指的是将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用 Object.assign 和展开运算符来实现。

- **深拷贝**：深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用 JSON 的两个函数来实现，但是由于 JSON 的对象格式比 js 的对象格式更加严格，所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败。

  #### （1）JSON.stringify()

- `JSON.parse(JSON.stringify(obj))`是目前比较常用的深拷贝方法之一，它的原理就是利用`JSON.stringify` 将`js`对象序列化（JSON字符串），再使用`JSON.parse`来反序列化(还原)`js`对象。

- 这个方法可以简单粗暴的实现深拷贝，但是还存在问题，拷贝的对象中如果有函数，undefined，symbol，当使用过`JSON.stringify()`进行处理之后，都会消失

  ```js
  let obj1 = {
    a: 0,
    b: {
      c: 0,
    },
  };
  let obj2 = JSON.parse(JSON.stringify(obj1));
  obj1.a = 1;
  obj1.b.c = 1;
  console.log(obj1); // {a: 1, b: {c: 1}}
  console.log(obj2); // {a: 0, b: {c: 0}}
  ```

  #### （2）函数库lodash的\_.cloneDeep方法

  该函数库也有提供\_.cloneDeep用来做 Deep Copy

  ```js
  var _ = require("lodash");
  var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3],
  };
  var obj2 = _.cloneDeep(obj1);
  console.log(obj1.b.f === obj2.b.f); // false
  ```

  #### （3）手写实现深拷贝函数

  ```js
  // 深拷贝的实现
  function deepCopy(object) {
    if (!object || typeof object !== "object") return;
  
    let newObject = Array.isArray(object) ? [] : {};
  
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        newObject[key] =
          typeof object[key] === "object"
            ? deepCopy(object[key])
            : object[key];
      }
    }
  
    return newObject;
  }
  ```

  ### 持续更新中。。。













