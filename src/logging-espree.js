import * as escodegen from 'escodegen';
import * as espree from 'espree';
import * as estraverse from 'estraverse';
import * as fs from 'fs/promises';

/**
 * @description - Transforms the code of a file, adding a console.log when we
 *    enter a function, writing it into a file if the outputFile
 *    parameter is specified, otherwise writing in the console.
 * @param {String} inputFile - The path of the file to be transformed 
 * @param {String} outputFile - The path of the file where the transformed code will be saved
 * @returns {void} - Nothing
 */
export async function transpile(inputFile, outputFile) {
  const INPUT_CODE = await fs.readFile(inputFile, 'utf-8');
  console.log(`Input:\n${INPUT_CODE}`);
  const OUTPUT_CODE = addLogging(INPUT_CODE);
  if (outputFile) {
    await fs.writeFile(outputFile, OUTPUT_CODE, 'utf-8');
    console.log(`\nOutput in file '${outputFile}'`);
  } else {
    console.log(`\nOutput:\n${OUTPUT_CODE}`);
  }  
}

/**
 * @description - Transforms the code of a file, adding a console.log when we
 *   enter a function of types FunctionDeclaration, FunctionExpression or
 *  ArrowFunctionExpression.
 * @param {String} code - The code to be transformed
 * @returns {String} - The transformed code
 */
export function addLogging(code) {
  const ast = espree.parse(code, {ecmaVersion: 6, loc: true});
  estraverse.traverse(ast, {
    enter: (node, parent) => {
      if (node.type === 'FunctionDeclaration' ||
          node.type === 'FunctionExpression' ||
          node.type === 'ArrowFunctionExpression') {
        addBeforeCode(node);
      }
    }
  });
  return escodegen.generate(ast);
}

/**
 * @description - Adds a console.log if we enter into a function,
 *    arrow function or anonymous function, specifying the name of the function,
 *    the parameters and the line number.
 * @param {Node} node - The node were we are currently
 * @returns {void} - Nothing
 */
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
