/**
 * Created by acouette on 02/06/17.
 */

//json
const data = require('./data');
console.log(data);

//default in directory => index.js
const directory = require('./directory');
console.log(directory.foo);

//node core module
const assert = require('assert');

//npm dependency - npm install --save lodash, talk about ^ ~
const _ = require('lodash');

