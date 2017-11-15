import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import * as babel from 'babel-core';
import plugin from '../src';

describe('babel-plugin-transform-es3-getter-to-property-assignment', () => {
  it('should be property assignment', () => {
    const actual = fs.readFileSync('./test/fixtures/actual.js', 'utf8');
    const expected = fs.readFileSync('./test/fixtures/expected.js', 'utf8');

    const { code } = babel.transform(actual, { plugins: [plugin] });

    expect(code).to.equal(expected);
  })
})


