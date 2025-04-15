import normalizeURL from "./services/crawl";
import * as assert from 'assert';


const input = 'https://blog.boot.dev/path/'
const actual = normalizeURL(input);

assert.strictEqual(actual, 'blog.boot.dev/path');
