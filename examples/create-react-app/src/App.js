import { css } from 'css-out-js';
import './dist.css';

const Title = () => {
  /**
   * css takes styles and returns a className
   *
   * if you use the babel plugin
   * 1. it extracts the styles into a css file and
   * 2. replaces the function call with className string
   * 3. removes the runtime import for system-css
   *
   */
  return <h1 className={css({ fontSize: '2em' })}>Hello!</h1>;
};

const LearnMore = (props) => {
  // if there are dynamic styles
  const className = css({ color: props.color });

  return (
    <a className={className} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
      Learn React
    </a>
  );
};

const FONT_FAMILY = 'sans-serif';

function Home() {
  const className = css({
    color: 'tomato',
    fontFamily: FONT_FAMILY
  });

  return (
    <div className={className}>
      <Title />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <LearnMore color="teal" />
    </div>
  );
}

export default Home;
