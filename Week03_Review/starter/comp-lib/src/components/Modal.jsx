import { useEffect } from "react";
// Named import. The old `import ReactDOM from 'react-dom'` still works but
// the named one is what the React 19 docs use.
import { createPortal } from "react-dom";
import cx from "classnames";

const Modal = (props) => {
  // const { onClose } = props;
  // const { title, children, onClose, actionBar } = props;
  const { title, children, onClose, actionBar, crazy } = props;
  //Stop the page behind the modal from scrolling while it is open,
  //and undo that when the modal closes.
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  //`fixed` not `absolut`: absolute positions against the nearest positioned
  //ancestor, which breaks the moment somebody puts the modal inside a
  //`relative` container or scrolls the page.
  const overlayClass = crazy
    ? "fixed inset-0 bg-tel-300 opacity-50"
    : "fixed inset-0 bg-gray-300 opacity-50";

  const windowClass = cx("fixed inset-0 p-10 bg-white", {
    "rounded-lg": crazy,
  });

  // createPortal(whatToRender, whereToPutIt) -- the modal's html ends up in
  // #portal at the bottom of index.html, no matter where <Modal /> lives
  // in our component tree.
  return createPortal(
    <>
      {/* <div className="absolute inset-0 bg-gray-300 opacity-50"></div>
      <div className="absolute inset-40 p-10 bg-white">I'm a modal!</div> */}
      {/* <div className="fixed inset-0 bg-gray-300 opacity-50"></div> */}
      {/* <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-50"
      ></div> */}
      {/* <div className="fixed inset-40 p-10 bg-white">I'm a modal!</div> */}
      <div onClick={onClose} className={overlayClass}></div>
      <div className={windowClass}>
        {/* <div className="fixed inset-40 p-10 bg-white"> */}
        <div className="flex flex-col justify-between h-full">
          {title && <h2 className="text-2x1">{title}</h2>}
          {children}
          <div className="flex flex-row justify-end">{actionBar}</div>
        </div>
      </div>
    </>,
    document.getElementById("portal"),
  );
};

export default Modal;
