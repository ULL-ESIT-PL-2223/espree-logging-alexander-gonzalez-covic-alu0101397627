import { transpile } from "../src/logging-espree.js";
import assert from 'assert';
import * as fs from "fs/promises";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import Tst from './test-description.mjs';

const Test = Tst.map(t => ({
  input: __dirname + '/data/' + t.input,
  output: __dirname + '/data/' + t.output,
  correctLogged: __dirname + '/data/' + t.correctLogged,
  correctOut: __dirname + '/data/' + t.correctOut,
})
)

function removeSpaces(s) {
  return s.replace(/\s/g, '');
}

for (let i = 0; i < Test.length; i++) {
  it(`transpile(${Tst[i].input}, ${Tst[i].output})`, async () => {
    await transpile(Test[i].input, Test[i].output);
    // Check code
    const outputTranspile = await fs.readFile(Test[i].output, 'utf-8');
    const outputExpected = await fs.readFile(Test[i].correctLogged, 'utf-8');
    assert.strictEqual(
      removeSpaces(outputTranspile),
      removeSpaces(outputExpected)
    );

    // Check evaluation
    const outputCorrect = await fs.readFile(Test[i].correctOut, 'utf-8');
    let outputEvaluation = '';
    console.log = (...s) => { outputEvaluation += s.join('') };
    eval(outputTranspile);
    assert.equal(removeSpaces(outputEvaluation), removeSpaces(outputCorrect));
  });
}


