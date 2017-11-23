const fs = require('fs');

const postcss = require('postcss');
const cssvariables = require('postcss-css-variables');
const _ = require('lodash');

const STYLES = {
  primaryColor: '#123123',
  Button: {
    primary: {
      backgroundColor: '#ff'
    },
  },
}
function customEval(code) {
  try {
    const style = (path) => {
      const result = _.get(STYLES, path);
      if (typeof result === 'undefined') {
        throw new Error(`styles.${path} could not be found.`);
      }
      return result;
    };

    let __result;
    eval(`__result = (${code});`);
    return String(__result);
  } catch (err) {
    console.error('error in eval', err);
    throw err;
  }
}

let mycss = fs.readFileSync('./dist/style.css', 'utf8');
mycss = mycss
  .replace(/\/\*__((.|\n)*?)__\*\//g, (_, content) => customEval(content))
  .replace(/__((.|\n)*?)__/g, (_, content) => customEval(content))

// const output = postcss([
// 		cssvariables(#<{(|options|)}>#)
// 	])
// 	.process(mycss)
// 	.css;

console.log(mycss);
