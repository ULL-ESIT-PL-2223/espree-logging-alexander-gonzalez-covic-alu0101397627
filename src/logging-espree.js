import * as escodegen from 'escodegen';
import * as espree from 'espree';
import * as estraverse from 'estraverse';
import * as fs from 'fs/promises';

export async function transpile(inputFile, outputFile) {
  const INPUT_CODE = await fs.readFile(inputFile, 'utf-8');
  const OUTPUT_CODE = addLogging(INPUT_CODE);
  if (outputFile) await fs.writeFile(outputFile, OUTPUT_CODE, 'utf-8');
  else console.log(OUTPUT_CODE); 
}

export function addLogging(code) {
  const ast = espree.parse(code, {ecmaVersion: 6, loc: true});
  estraverse.traverse(ast, {
    enter: (node, parent) => {
      if (node.type === 'FunctionDeclaration' ||
          node.type === 'FunctionExpression' ||
          node.type === 'ArrowFunctionExpression') {
          //console.log(node)
        addBeforeCode(node);
      }
    }
  });
  return escodegen.generate(ast);
}

function addBeforeCode(node) {
  const name = node.id ? node.id.name : `<anonymous function>`;
  const params = node.params.map(param => param.name).join('}, ${');
  const paramsInterpolated = (params.length !== 0) ?
                              `\${${params}}`:
                              '';
  const codeLine = node.loc.start.line;

  const beforeCode = `console.log(\`Entering ${name}(${paramsInterpolated}) at line ${codeLine}\`)`;
  const beforeNodes = espree.parse(beforeCode, {ecmaVersion: 6}).body;
  node.body.body = beforeNodes.concat(node.body.body);
}
