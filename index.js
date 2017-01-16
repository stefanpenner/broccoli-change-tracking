const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const broccoli = require('broccoli-builder');
const fixturify = require('fixturify');
const stew = require('broccoli-stew');

const ROOT = __dirname + '/ROOT/';

fixturify.writeSync(ROOT , {
  'a.js': `console.log('A: Hello, World!');`,
  'b.js': `console.log('B: Hello, World!');`,
  'a.css': `.a { display: none }`,
  'b.css': `.b { display: none }`,
})

const plan = new MergeTrees([
  new Funnel(ROOT, { include: ['**/*.js']}),
  new Funnel(ROOT, { include: ['**/*.css']}),
])

const pipeline = new broccoli.Builder(plan);

pipeline.build().then(function(result) {
  console.log('complete', result.directory)
}).catch(function(reason) {
  console.error(reason);
})
