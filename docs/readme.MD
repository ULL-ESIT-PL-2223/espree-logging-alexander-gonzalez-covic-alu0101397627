## Functions

<dl>
<dt><a href="#transpile">transpile(inputFile, outputFile)</a> ⇒ <code>void</code></dt>
<dd><ul>
<li>Transforms the code of a file, adding a console.log when we
 enter a function, writing it into a file if the outputFile
 parameter is specified, otherwise writing in the console.</li>
</ul>
</dd>
<dt><a href="#addLogging">addLogging(code)</a> ⇒ <code>String</code></dt>
<dd><ul>
<li>Transforms the code of a file, adding a console.log when we
enter a function of types FunctionDeclaration, FunctionExpression or
 ArrowFunctionExpression.</li>
</ul>
</dd>
<dt><a href="#addBeforeCode">addBeforeCode(node)</a> ⇒ <code>void</code></dt>
<dd><ul>
<li>Adds a console.log if we enter into a function,
 arrow function or anonymous function, specifying the name of the function,
 the parameters and the line number.</li>
</ul>
</dd>
</dl>

<a name="transpile"></a>

## transpile(inputFile, outputFile) ⇒ <code>void</code>
- Transforms the code of a file, adding a console.log when we
   enter a function, writing it into a file if the outputFile
   parameter is specified, otherwise writing in the console.

**Kind**: global function  
**Returns**: <code>void</code> - - Nothing  

| Param | Type | Description |
| --- | --- | --- |
| inputFile | <code>String</code> | The path of the file to be transformed |
| outputFile | <code>String</code> | The path of the file where the transformed code will be saved |

<a name="addLogging"></a>

## addLogging(code) ⇒ <code>String</code>
- Transforms the code of a file, adding a console.log when we
  enter a function of types FunctionDeclaration, FunctionExpression or
 ArrowFunctionExpression.

**Kind**: global function  
**Returns**: <code>String</code> - - The transformed code  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> | The code to be transformed |

<a name="addBeforeCode"></a>

## addBeforeCode(node) ⇒ <code>void</code>
- Adds a console.log if we enter into a function,
   arrow function or anonymous function, specifying the name of the function,
   the parameters and the line number.

**Kind**: global function  
**Returns**: <code>void</code> - - Nothing  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Node</code> | The node were we are currently |

