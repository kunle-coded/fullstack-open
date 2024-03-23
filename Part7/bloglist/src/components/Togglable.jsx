import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

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
      <div className={isVisible ? 'hide' : ''}>
        <Button variant="contained" sx={{ my: 2 }} onClick={toggleVisibility}>
          {butonLabel}
        </Button>
      </div>
      <div className={isVisible ? '' : 'hide'}>
        {children}
        <Button
          variant="outlined"
          sx={{ my: 1 }}
          onClick={() => setIsVisible(false)}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  butonLabel: PropTypes.string.isRequired,
};

export default Togglable;
