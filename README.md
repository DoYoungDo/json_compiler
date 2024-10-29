本项目参考[the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js)

编译
```shell
$ tsc
```

测试
```shell
$ node index.js
```

输出
```shell
-----------
输入：
{
"null": null,
"int": 123,
"float": 12.3,
"str": "123",
"arr": [123, 12.3,"123"],
"obj": {"key":"value"}
}
输出：
{
  "null": null,
  "int": 123,
  "float": 12.3,
  "str": "123",
  "arr": [
    123,
    12.3,
    "123"
  ],
  "obj": {
    "key": "value"
  }
}
-----------
输入：
[
{
    "null": null,
    "int": 123,
    "float": 12.3,
    "str": "123",
    "arr": [123, 12.3,"123"],
    "obj": {"key":"value"}
},
123,
null,
"123",
["1","2","3"]
]
输出：
[
  {
    "null": null,
    "int": 123,
    "float": 12.3,
    "str": "123",
    "arr": [
      123,
      12.3,
      "123"
    ],
    "obj": {
      "key": "value"
    }
  },
  123,
  null,
  "123",
  [
    "1",
    "2",
    "3"
  ]
]
-----------
输入：
{
    "er":"error",
    "er1"""
}
TypeError: expected colon, but get:
    at walk (/json_compiler/index.js:184:27)
    at parser (/json_compiler/index.js:230:23)
    at parse (/json_compiler/index.js:367:17)
    at main (/json_compiler/index.js:425:9)
    at Object.<anonymous> (/json_compiler/index.js:455:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
-----------
输入：
{
    "er":"error",
    "er1":123,
    "123":["a",]
}
TypeError: superfluous comma...
    at walk (/json_compiler/index.js:162:31)
    at walk (/json_compiler/index.js:186:33)
    at parser (/json_compiler/index.js:230:23)
    at parse (/json_compiler/index.js:367:17)
    at main (/json_compiler/index.js:431:9)
    at Object.<anonymous> (/json_compiler/index.js:455:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
-----------
输入：
{
    "er":"error",
    "er1"123,
    "123":["a"]
}
TypeError: expected colon, but get:123
    at walk (/json_compiler/index.js:184:27)
    at parser (/json_compiler/index.js:230:23)
    at parse (/json_compiler/index.js:367:17)
    at main (/json_compiler/index.js:437:9)
    at Object.<anonymous> (/json_compiler/index.js:455:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
-----------
输入：
{
    "er":"error",
    "er1:123,
    "123":["a"]
}
Error: unknown identifer:a
    at tokenizer (/json_compiler/index.js:74:23)
    at parse (/json_compiler/index.js:366:20)
    at main (/json_compiler/index.js:443:9)
    at Object.<anonymous> (/json_compiler/index.js:455:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
    at node:internal/main/run_main_module:28:49
-----------
输入：
{
    "er":"error",
    "er1":123
    "123":["a",]
}
TypeError: unexpected token:123
    at walk (/json_compiler/index.js:190:31)
    at parser (/json_compiler/index.js:230:23)
    at parse (/json_compiler/index.js:367:17)
    at main (/json_compiler/index.js:449:9)
    at Object.<anonymous> (/json_compiler/index.js:455:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
-----------
输入：
{
"key": "value"
}
输出：
{
  "key": "value"
}
```