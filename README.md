```shell
$ tsc index.ts

$ node index.js

{
"null": null,
"int": 123,
"float": 12.3,
"str": "123",
"arr": [123, 12.3,"123"],
"obj": {"key":"value"}
}
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
{
    "er":"error",
    "er1"""
}
TypeError: expected colon, but get:
    at walk (/Users/doyoung/MyProject/json_compiler/index.js:183:27)
    at parser (/Users/doyoung/MyProject/json_compiler/index.js:229:23)
    at parse (/Users/doyoung/MyProject/json_compiler/index.js:384:15)
    at main (/Users/doyoung/MyProject/json_compiler/index.js:401:9)
    at Object.<anonymous> (/Users/doyoung/MyProject/json_compiler/index.js:431:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
{
    "er":"error",
    "er1":123,
    "123":["a",]
}
TypeError: superfluous comma...
    at walk (/Users/doyoung/MyProject/json_compiler/index.js:161:31)
    at walk (/Users/doyoung/MyProject/json_compiler/index.js:185:33)
    at parser (/Users/doyoung/MyProject/json_compiler/index.js:229:23)
    at parse (/Users/doyoung/MyProject/json_compiler/index.js:384:15)
    at main (/Users/doyoung/MyProject/json_compiler/index.js:407:9)
    at Object.<anonymous> (/Users/doyoung/MyProject/json_compiler/index.js:431:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
{
    "er":"error",
    "er1"123,
    "123":["a"]
}
TypeError: expected colon, but get:123
    at walk (/Users/doyoung/MyProject/json_compiler/index.js:183:27)
    at parser (/Users/doyoung/MyProject/json_compiler/index.js:229:23)
    at parse (/Users/doyoung/MyProject/json_compiler/index.js:384:15)
    at main (/Users/doyoung/MyProject/json_compiler/index.js:413:9)
    at Object.<anonymous> (/Users/doyoung/MyProject/json_compiler/index.js:431:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
{
    "er":"error",
    "er1:123,
    "123":["a"]
}
Error: unknown identifer:a
    at tokenizer (/Users/doyoung/MyProject/json_compiler/index.js:73:23)
    at parse (/Users/doyoung/MyProject/json_compiler/index.js:382:18)
    at main (/Users/doyoung/MyProject/json_compiler/index.js:419:9)
    at Object.<anonymous> (/Users/doyoung/MyProject/json_compiler/index.js:431:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
    at node:internal/main/run_main_module:28:49
{
    "er":"error",
    "er1":123
    "123":["a",]
}
TypeError: unexpected token:123
    at walk (/Users/doyoung/MyProject/json_compiler/index.js:189:31)
    at parser (/Users/doyoung/MyProject/json_compiler/index.js:229:23)
    at parse (/Users/doyoung/MyProject/json_compiler/index.js:384:15)
    at main (/Users/doyoung/MyProject/json_compiler/index.js:425:9)
    at Object.<anonymous> (/Users/doyoung/MyProject/json_compiler/index.js:431:3)
    at Module._compile (node:internal/modules/cjs/loader:1356:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1414:10)
    at Module.load (node:internal/modules/cjs/loader:1197:32)
    at Module._load (node:internal/modules/cjs/loader:1013:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
{
"key": "value"
}
{
  "key": "value"
}
```