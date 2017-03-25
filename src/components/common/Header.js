import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import * as PropTypes from "react/lib/ReactPropTypes";

const Header = ({loading})=> {
  return (
    <nav>
      {loading && <LinearProgress mode="indeterminate" />}
    </nav>
  );
};

Header.propTypes = {
  loading:PropTypes.bool.isRequired
};

export default Header;
