import * as crawl from "./services/crawl";
import * as assert from 'assert';


const input = 'https://blog.boot.dev/path/'
const actual = crawl.normalizeURL(input);

assert.strictEqual(actual, 'blog.boot.dev/path');
