# POC for multi-tenant css replacements

### Files
```javascript
// in postprocess.js
const STYLES = {
  primaryColor: '#123123',
  Button: {
    primary: {
      backgroundColor: '#ff'
    },
  },
}
```

```javascript
// index.js, webpack entrypoint
require('./vars.css')
require('./style.css')
```

```css
/* vars.css */
:root {
  /* Option A: use this syntax (__<CODE>__) in value positions. */
  --primaryColor: __ style('primaryColor') __;

  /* Option B: Insert result of eval`ed code into "empty space" (as above, but with surrounding comment delimiters) */
  /*__ ["--secondaryColor:", "blue;"].join(' ') __*/
}

/* style.css */
.foo {
  background: var(--secondaryColor);
  color: var(--primaryColor);
}
```

### Run
Run `npm run build` (runs `./node_modules/.bin/webpack --config webpack.config.js`) for "static" css (`dist/style.css`):
```css
:root {
  --buttonPrimaryBackgroundColor: __ style('Button.primary.backgroundColor') __;
  --primaryColor: __ style('primaryColor') __;
  /*__ ["--secondaryColor:", "blue;"].join(' ') __*/
}
.foo {
  background: var(--secondaryColor);
  color: var(--primaryColor);
}
```

Run `node postprocess` for
```css
.foo {
  background: blue;
  color: #123123;
}

```
Or, for modern browsers, without the variable literalization <3:
```css
:root {
  --buttonPrimaryBackgroundColor: #ff;
  --primaryColor: #123123;
  --secondaryColor: blue;
}
.foo {
  background: var(--secondaryColor);
  color: var(--primaryColor);
}
```
