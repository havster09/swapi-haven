import React, {PropTypes} from 'react';
import Header from '../components/common/Header';
import {AppBar, Drawer, MenuItem} from 'material-ui';
import {connect} from 'react-redux';
import {Link} from "react-router";

class App extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.state = {open: false};
    this.onRequestChange = this.onRequestChange.bind(this);
  }

  onRequestChange() {
    this.setState({
      open:!this.state.open
    });
  }


  render() {
    return (
      <div>
        <AppBar onLeftIconButtonTouchTap={this.onRequestChange} title="Star Wars People"/>
        <Header loading={this.props.loading}/>
        <Drawer open={this.state.open} onRequestChange={this.onRequestChange} docked={false}>
          <MenuItem onTouchTap={this.onRequestChange} containerElement={<Link to="/"/>}>Home</MenuItem>
          <MenuItem onTouchTap={this.onRequestChange} containerElement={<Link to="people"/>}>People</MenuItem>
        </Drawer>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
