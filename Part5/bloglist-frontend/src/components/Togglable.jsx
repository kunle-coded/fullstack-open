import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ children, butonLabel }, refs) => {
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div className={isVisible ? "hide" : ""}>
        <button onClick={toggleVisibility}>{butonLabel}</button>
      </div>
      <div className={isVisible ? "" : "hide"}>
        {children}
        <button onClick={() => setIsVisible(false)}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  butonLabel: PropTypes.string.isRequired,
};

export default Togglable;
