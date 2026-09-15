//import classnames libary as cs
import cx from "classnames";

import { twMerge } from "tailwind-merge";

const Button = (props) => {
  //always children here in components
  const {
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    rounded,
    outline,
    ...otherProps
  } = props;

  /* only one color varient at a time
  !! coerces a boolean value to true or false
  Number to coerce a boolean to 0 or 1 */

  const count =
    Number(!!primary) +
    Number(!!secondary) +
    Number(!!success) +
    Number(!!danger) +
    Number(!!warning);

  if (count > 1) {
    console.warn(
      "You silly goose! Only one of primary, secondary, success, warning, danger can be TRUE!",
    );
  }

  const baseClasses = "flex items-center px-8 py-3 border";

  const classes = twMerge(
    cx(otherProps.classname, baseClasses, {
      //color varients, only one can be true at a time
      "bg-blue-500 border-blue-500 text-white": primary,
      " bg-gray-900 border-gray-900 text-white": secondary,
      " bg-green-500 border-green-500 text-white": success,
      " bg-yellow-400 border-yellow-500 text-white": warning,
      " bg-red-600 border-red-600 text-white": danger,
      //modifiers can be combined with color variants
      "rounded-full": rounded,
      "big-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-orange-400": outline && warning,
      "text-red-600": outline && danger,
    }),
  );

  // let classes = "px-8 py-3 border";

  // if (primary)
  //   classes += "bg-blue-500 border-blue-500 text-white";

  // if (secondary)
  //   classes += " bg-blue-500 border-gray-500 text-white";

  // if (success)
  //   classes += " bg-blue-500 border-green-500 text-white";

  // if (danger)
  //   classes += " bg-blue-500 border-red-500 text-white";

  // if (warning)
  //   classes += " bg-blue-500 border-yellow-500 text-white";

  return (
    <button {...otherProps} className={classes}>
      {children}
    </button>
  );
};

export default Button;
