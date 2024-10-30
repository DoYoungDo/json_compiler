type TokenType = "brace" | "colon" | "comma" | "number" | "string" | "null";
type Token = {
    type: TokenType,
    value: string
}

enum NodeType{
    Program = "Program",
    NumberLiteral = "NumberLiteral",
    StringLiteral = "StringLiteral",
    NullKeyword = "NullKeyword",
    Object = "Object",
    Array = "Array",
    ObjectPair = "ObjectPair",
    OperatorColon = "OperatorColon",
    OperatorComma = "OperatorComma"
}

interface Node {
    type: NodeType
}

interface AST extends Node {
    type: NodeType.Program
    body: Node[]
}

interface ObjectNode extends Node{
    type: NodeType.Object,
    elements: ObjectPairNode[]
}

interface ObjectPairNode extends Node{
    type: NodeType.ObjectPair,
    key:StringLiteralNode,
    value: Node
}

interface ArrayNode extends Node{
    type: NodeType.Array,
    elements: Node[]
}

interface NumberLiteralNode extends Node{
    type: NodeType.NumberLiteral,
    value: number
}

interface StringLiteralNode extends Node{
    type: NodeType.StringLiteral,
    value:string
}

interface NullKeywordNode extends Node {
    type: NodeType.NullKeyword,
    value: "null"
}

interface OperatorColonNode extends Node {
    type: NodeType.OperatorColon,
}

interface OperatorCommaNode extends Node {
    type: NodeType.OperatorComma,
}

interface Visitor {
    enter(node: Node, parent: Node): void;
    exit(node: Node, parent: Node): void;
}

/**
 * 词法分析和标记器。
 * 此阶段会将输入的文本解析成一个词法单元(token)序列
 */
function tokenizer(input: string): Token[] {
    let current = 0;
    let tokens: Token[] = [];

    while(current < input.length){
        let char = input[current];
        
        if (char === '{' || char === '}' || char === '[' || char === ']') {
            tokens.push({
                type: "brace",
                value: char
            });

            current++;
            continue;
        }

        if (/\s/.test(char)) {
            current++;
            continue;
        }

        if(char === '\n' || char === "\r"){
            current++;
            continue;
        }

        if(char === '"'){
            let value = "";
            char = input[++current];
            while(char !== '"' && current < input.length){
                value += char;
                char = input[++current];
            }

            // char
            tokens.push({
                type: "string",
                value
            })

            ++current;
            continue;
        }

        if (char === ':') {
            tokens.push({
                type: "colon",
                value: char
            })

            ++current;
            continue;
        }

        if (char === ',') {
            tokens.push({
                type: "comma",
                value: char
            })

            ++current;
            continue;
        }

        const LETTERS = /[a-z]/;
        if (LETTERS.test(char)) {
            let value = "";

            while (LETTERS.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }

            if (value !== "null") {
                throw new Error("unknown identifer:" + value);
            }

            tokens.push({
                type: "null",
                value: "null"
            })

            continue;
        }

        const NUMBERS = /[0-9]/;
        if(NUMBERS.test(char)){
            let value = "";

            while ((NUMBERS.test(char) || /\./.test(char)) && current < input.length) {
                value += char;
                char = input[++current];
            }

            if(!/^\d+.?\d+$/.test(value)){
                throw new Error("invalid number:" + value);
            }

            tokens.push({
                type: "number",
                value
            })

            continue;
        }

        throw new TypeError('I dont know what this character is: ' + char);
    }

    return tokens;
}

/**
 * 解析器
 * 此阶段会遍历词法单元(token)序列，生成语法树(AST)
 */
function parser(tokens: Token[]): AST {
    // input = input.trim();

    let current = 0;

    if (!(function check(): boolean {
        let token = tokens[current];
        if(!token){
            return false;
        }
        if (token.type !== "brace" || (token.type === "brace" && (token.value !== '{' && token.value !== '['))) {
            return false;
        }
        return true
    })()) {
        throw new Error("must start with '{' or '[' :");
    };


    function walk(): Node {
        let token = tokens[current];

        if(token.type === "number"){
            current++;
            return {
                type: NodeType.NumberLiteral,
                value: Number.parseFloat(token.value)
            } as NumberLiteralNode
        }

        if(token.type === "string"){
            current++;
            return {
                type: NodeType.StringLiteral,
                value: token.value
            } as StringLiteralNode
        }

        if(token.type === "null"){
            current++;
            return {
                type: NodeType.NullKeyword,
                value: "null"
            } as NullKeywordNode
        }

        if (token.type === "brace" && token.value === "[") {
            token = tokens[++current];

            let node = {
                type:NodeType.Array,
                elements: [] as Node[]
            } as ArrayNode

            while (current < tokens.length && (token.type !== "brace" || (token.type === "brace" && token.value !== "]"))) {
                let eleNode = walk();
                if(eleNode.type === NodeType.OperatorColon){
                    throw new TypeError("unexpected comma");
                }

                let commaToken = tokens[current];
                if(commaToken.type !== "comma"){
                    if(commaToken.type !== "brace" && commaToken.value !== "]"){
                        throw new TypeError("unexpected token:" + commaToken.value);
                    }
                }
                else{
                    walk();
                    let nextToken = tokens[current];
                    if(nextToken.type === "brace" && nextToken.value === "]"){
                        throw new TypeError("superfluous comma...");
                    }
                }

                node.elements.push(eleNode);
                token = tokens[current];
            }

            current++;
            return node;
       }

        if (token.type === "brace" && token.value === "{") {
            token = tokens[++current];

            let node = {
                type: NodeType.Object,
                elements: [] as ObjectPairNode[]
            } as ObjectNode

            while (current < tokens.length && (token.type !== "brace" || (token.type === "brace" && token.value !== "}"))) {
                let keyNode = walk();
                if (keyNode.type !== NodeType.StringLiteral) {
                    throw new TypeError("key must be string");
                }

                let colonNode = walk();
                if (colonNode.type !== NodeType.OperatorColon) {
                    throw new TypeError("expected colon, but get:" + tokens[--current].value);
                }

                let valueNode = walk();

                let commaToken = tokens[current];
                if(commaToken.type !== "comma"){
                    if(commaToken.type !== "brace" && commaToken.value !== "}"){
                        throw new TypeError("unexpected token:" + commaToken.value);
                    }
                }
                else{
                    walk();
                    let nextToken = tokens[current];
                    if(nextToken.type === "brace" && nextToken.value === "}"){
                        throw new TypeError("superfluous comma...");
                    }
                }

                let pairNode = {
                    type: NodeType.ObjectPair,
                    key: keyNode,
                    value: valueNode
                } as ObjectPairNode

                node.elements.push(pairNode);

                token = tokens[current];
            }

            current++;
            return node;
        }

        if (token.type === "colon") {
            current++;
            return {
                type: NodeType.OperatorColon
            } as OperatorColonNode
        }

        if (token.type === "comma") {
            current++;
            return {
                type:NodeType.OperatorComma
            } as OperatorCommaNode
        }

        throw new TypeError(token.type);
    }


    let ast: AST = {
        type: NodeType.Program,
        body: [] as Node[]
    } as AST

    while(current < tokens.length){
        ast.body.push(walk());
    }

    return ast;
}

/**
 * 定义一个方法，使用给定的语法树，和结点访问器
 * 遍历语法树
 */
function traverser(node: Node, visitorManager: Map<NodeType, Visitor>): void {
    function traverserArray(array: Node[], parent: Node): void {
        array.forEach(ele => traverserNode(ele, parent))
    }

    function traverserNode(node: Node, parent: Node): void {
        const visitor = visitorManager.get(node.type);

        if (visitor) {
            visitor.enter(node, parent)
        }

        switch (node.type) {
            case NodeType.Program:
                traverserArray((node as AST).body, node);
                break;
            case NodeType.Object:
                traverserArray((node as ObjectNode).elements, node);
                break;
            case NodeType.Array:
                traverserArray((node as ArrayNode).elements, node);
                break;
            case NodeType.ObjectPair:
                traverserNode((node as ObjectPairNode).value, node);
                break;
            default:
                break;
        }

        if(visitor){
            visitor.exit(node, parent);
        }

    }

    traverserNode(node, {} as Node);
}

/**
 * 转换器
 * 此阶段为各节点定义各自的访问器，遍历给定的语法树，生成最终的结果
 */
function transformer(ast: AST): any {
    let result: any = undefined;

    const visitorManager: Map<NodeType, Visitor> = new Map
    visitorManager.set(NodeType.Program,new class implements Visitor{
        private eleCount: number = 0;
        enter(node: Node, parent: Node): void {
            // console.log(node.type);
            if(this.eleCount !== 0){
                return;
            }
            this.eleCount++;

            (node as any).__addElement = (ele:any)=>{
                result = ele;
            }
        }
        exit(node: Node, parent: Node): void {
            (node as any).__addElement = undefined;
        }
    })
    visitorManager.set(NodeType.Object, new class implements Visitor {
        enter(node: Node, parent: Node): void {
            // console.log(node.type);

            let obj: any = {};

            (node as any).__addElement = (name: string, ele: any) => {
                obj[name] = ele;
            }
            (parent as any).__addElement(obj);
        }
        exit(node: Node, parent: Node): void {
            (node as any).__addElement = undefined;
        }
    })
    visitorManager.set(NodeType.Array, new class implements Visitor {
        enter(node: Node, parent: Node): void {
            // console.log(node.type);
            let arr: any[] = [];
            (node as any).__addElement = (ele:any)=>{
                arr.push(ele);
            }
            (parent as any).__addElement(arr);
        }
        exit(node: Node, parent: Node): void {
            (node as any).__addElement = undefined;
        }
    })
    visitorManager.set(NodeType.NullKeyword, new class implements Visitor {
        enter(node: Node, parent: Node): void {
            // console.log(node.type);
            (parent as any).__addElement(null);
        }
        exit(node: Node, parent: Node): void {}
    })
    visitorManager.set(NodeType.NumberLiteral, new class implements Visitor {
        enter(node: Node, parent: Node): void {
            // console.log(node.type);
            (parent as any).__addElement((node as NumberLiteralNode).value);
        }
        exit(node: Node, parent: Node): void {
            (node as any).__addElement = undefined;
        }
    })
    visitorManager.set(NodeType.StringLiteral, new class implements Visitor {
        enter(node: Node, parent: Node): void {
            // console.log(node.type);
            (parent as any).__addElement((node as StringLiteralNode).value);
        }
        exit(node: Node, parent: Node): void {}
    })
    visitorManager.set(NodeType.ObjectPair, new class implements Visitor {
        enter(node: Node, parent: Node): void {
            // console.log(node.type);
            (node as any).__addElement = (ele: any) => {
                const pairNode = node as ObjectPairNode;
                (parent as any).__addElement(pairNode.key.value, ele);
            }
        }
        exit(node: Node, parent: Node): void {
            (node as any).__addElement = undefined;
        }
    })

    // visitorManager.set(NodeType.OperatorColon, new class implements Visitor {
    //     enter(node: Node, parent: Node): void {
    //         console.log(node.type);
    //     }
    //     exit(node: Node, parent: Node): void {}
    // })
    // visitorManager.set(NodeType.OperatorComma, new class implements Visitor {
    //     enter(node: Node, parent: Node): void {
    //         console.log(node.type);
    //     }
    //     exit(node: Node, parent: Node): void {}
    // })

    traverser(ast, visitorManager);

    return result;
}

/**
 * 将所有的上述所有结点进行串连
 */
function parse(input: string): any {
    console.log("-----------")
    console.log("输入：")
    console.log(input);
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    const result = transformer(ast);
    console.log("输出：")
    console.log(JSON.stringify(result, null, "  "));
}

(function main(){
    const stdJson = `{
"null": null,
"int": 123,
"float": 12.3,
"str": "123",
"arr": [123, 12.3,"123"],
"obj": {"key":"value"}
}`
    const stdJsonArr = `[
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
]`
    const errJson = `{
    "er":"error",
    "er1"""
}`
    const errJson1 = `{
    "er":"error",
    "er1":123,
    "123":["a",]
}`

    const errJson2 = `{
    "er":"error",
    "er1"123,
    "123":["a"]
}`

    const errJson3 = `{
    "er":"error",
    "er1:123,
    "123":["a"]
}`

    const errJson4 = `{
    "er":"error",
    "er1":123
    "123":["a",]
}`
    const simpleJson = `{
"key": "value"
}`
    parse(stdJson);
    parse(stdJsonArr);
  
    try {
        parse(errJson);
    } catch (error) {
        console.log(error)
    }

    try {
        parse(errJson1);
    } catch (error) {
        console.log(error)
    }

    try {
        parse(errJson2);
    } catch (error) {
        console.log(error)
    }

    try {
        parse(errJson3);
    } catch (error) {
        console.log(error)
    }

    try {
        parse(errJson4);
    } catch (error) {
        console.log(error)
    }

    parse(simpleJson);
})();