// TODO (in class): build this up together.
import cx from "classnames";
//twmerge resolves conflicting tailwind classes --  the last one wins.
//Without it, an outline button keeps the 'text-white' form its
// colour varient and you get white text on a white background.
import { twMerge } from "tailwind-merge";

// NOTE ON PROP_TYPES
//Every tutorial you find will validate props with the 'prop-types' library:
//import PropTypes from 'prop-types'
//Button.propTypes = {primary: PropTypes.bool, ...}
//React 19 no longer calls propTypes on function components.
// The checks are silently ignored -- all of the ceremony, none of the safety.
//So: check by hand, like the `count` guard below, or use TypeScript,
//which is where the industry landed and which we get to later.

const Button = (props) => {
  // const {children} = props
  // return <button className="px-8 py-3 border">{children}</button>
  // const { children, primary, success, danger } = props;
  const {
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    rounded,
    outline,
    small,
    large,
    ...otherProps
  } = props;

  //the obvious way. Watch how badly this scales
  // let classes = "px-8 py-3 border";
  // if (primary) classes += " bg-blue-500 border-blue-500 text-white";
  // if (success) classes += " bg-green-500 border-green-500 text-white";
  // if (danger) classes += " bg-red-500 border-red-500 text-white";

  // For each key/value pair:apply the key if the value is truthy.
  // const classes = cx("px-8 py-3 border", {
  //   "bg-blue-500 border-blue-500 text-white": primary,
  //   "bg-gray-900 border-gray-900 text-white": secondary,
  //   "bg-green-500 border-green-500 text-white": success,
  //   "bg-orange-400 border-orange-400 text-white": warning,
  //   "bg-red-600 border-red-600 text-white": danger,
  //   //modifiers -- combine with any colour
  //   "rounded-full": rounded,
  //   "bg-white": outline,
  //   "text-blue-500": outline && primary,
  //   "text-gray-900": outline && secondary,
  //   "text-green-500": outline && success,
  //   "text-orange-400": outline && warning,
  //   "text-red-600": outline && danger,
  // });

  //Only one colour varient should ever be true at a time.
  // /!! coerces to a boolean, Number turns that into 0 or 1.

  const count =
    Number(!!primary) +
    Number(!!secondary) +
    Number(!!success) +
    Number(!!warning) +
    Number(!!danger);

  if (count > 1) {
    console.warn(
      "You Silly Goose! Only one of primary, secondary, success, warning, and danger can be TRUE!",
    );
  }

  const baseClass = "flex items-center px-8 py-3 border";
  //classmates ignores undefined and null --
  // which is why putting the caller's className
  // first is safe even when they don't pass one.

  const classes = twMerge(
    // cx(baseClass, {
    cx(otherProps.className, baseClass, {
      // colour varients -- pick one
      "bg-blue-500 border-blue-500 text-white": primary,
      "bg-gray-900 border-gray-900 text-white": secondary,
      "bg-green-500 border-green-500 text-white": success,
      "bg-orange-400 border-orange-400 text-white": warning,
      "bg-red-600 border-red-600 text-white": danger,
      //additional style props
      "rounded-full": rounded,
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-orange-400": outline && warning,
      "text-red-600": outline && danger,
      //size
      "px-3 py-2 text-sm font-medium ": small,
      "px-8 py-5 text-lg font-large": large,
    }),
  );
  //Removed
  // return <button className={classes}>{children}</button>;
  //otherProps collects everything we did NOT destructure above --
  // onClick, onMouseOver, type, disabled -- and forwards it to the
  // real <button>
  return (
    <button {...otherProps} className={classes}>
      {children}
    </button>
  );
};

export default Button;
