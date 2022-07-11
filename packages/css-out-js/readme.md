<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/css-out-js/main/packages/css-out-js/logo.png" height="80px"/>
  <br><br>
  <b>Author styles collocated in JS, pull them out into static CSS on build. No runtime dependency.</b>
  <br>
</p>

&nbsp;

### the big idea:

I like to **author styles collocated with component code**, that's how I find them maintainable.

But before shipping them to users, I'd like to pull styles out of components and ship them in **static CSS files**. No runtime dependency.

![animation showing code being pulled into dist.css](https://user-images.githubusercontent.com/1863771/178297537-edb1229b-7a4a-4ad3-99c4-f3aeac6622a5.gif)

prior art: This idea is not entirely new, there have been other similar interpretations of this idea before like [callstack/linaria](https://github.com/callstack/linaria) and [atlassian-labs/compiled](https://github.com/atlassian-labs/compiled)



&nbsp;

**input**

`App.js`

```js
import { css } from 'css-out-js';

const Title = (props) => {
  return <h1 className={css({ fontSize: '2em' })}>Hello!</h1>;
};
```

**output**

The plugin extracts the styles into a css file<br>
and replaces the function call with generated className string.<br>
If there are any dynamic styles, it creates a css variable for them.<br>
Finally, it removes the removes the import for `css-out-js`, no runtime.

`dist.css`

```diff
+.Title-1bdbzov {
+  font-size: 2em;
+}
```

`App.js`

```diff
- import { css } from 'css-out-js';

const Title = (props) => {
- return <h1 className={css({ fontSize: '2em' })}>Hello!</h1>;
+ return <h1 className="Title-1bdbzov">Hello!</h1>;
};
```

&nbsp;

works with dynamic styles as well:

**input**

`App.js`

```js
import { css } from 'css-out-js';

const Home = (props) => {
  const className = css({ color: props.color });

  return (
    <section className={className}>
      <p>Home sweet home</p>
    </section>
  );
};
```

**output**

Dynamic styles based on props are made possible by setting a css variable.

`dist.css`

```diff
+.Home-2b9glr {
+  color: var(--props-color-1trdzir);
+}
```

`App.js`

```diff
- import { css } from 'css-out-js';

const Home = (props) => {
- const className = css({ color: props.color });
+ const className = "Home-2b9glr"
+ document.documentElement.style.setProperty('--props-color-1trdzir', props.color),

  return (
    <section className={className}>
      <p>Home sweet home</p>
    </section>
  );
}
```

### setup

1. install

   ```
   npm install css-out-js --save-dev

   # or

   yarn add css-out-js --dev
   ```

2. Add plugin to babelrc, you can specify the location of your generated css file (hint: see [examples](https://github.com/siddharthkp/css-out-js/blob/main/examples) directory)

   ```js
   // .babelrc
   module.exports = {
     plugins: [['css-out-js/babel', { path: 'public/dist.css' }]]
   };
   ```

3. add css import

   this may differ based on the framework of your choice. (hint: see [examples](https://github.com/siddharthkp/css-out-js/blob/main/examples) directory)

   ```js
   // App.js
   import './dist.css';
   ```
