import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as peopleActions from '../../actions/peopleActions';
import * as PropTypes from "react/lib/ReactPropTypes";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card,CardActions} from 'material-ui/Card';
import PeopleDetail from "./PeopleDetail";
import {Quotes} from "./Quotes";


class PeopleDetailContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      comment:'',
      errors: {},
      person: Object.assign({}, this.props.person)
    };
    this.goBack = this.goBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.yodaQuote = this.yodaQuote.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.person.name !== nextProps.person.name) {
      this.setState({person: Object.assign({}, nextProps.person)});
    }
  }

  handleChange(event) {
    this.setState({comment:event.target.value});
  }

  goBack() {
    this.context.router.push('/people');
  }

  yodaQuote() {
    toastr.success(`${Quotes[Math.floor(Math.random()*(Quotes.length))]}`);
    if(this.state.comment) {
      toastr.info(`${this.state.comment}`);
      this.setState({comment:''});
    }
  }


  render() {
    return (
      <Card>
        <PeopleDetail entity={this.state.person}/>

        <TextField
          hintText=""
          floatingLabelText="Talk to Yoda"
          value={this.state.comment}
          onChange={this.handleChange}
          multiLine
          rows={3}
        />

        <CardActions>
          <RaisedButton primary label="Send Comment to Yoda" onTouchTap={this.yodaQuote}/>
          <RaisedButton label="Go Back" onTouchTap={this.goBack}/>
        </CardActions>
      </Card>
    );
  }
}

PeopleDetailContainer.propTypes = {
  person: PropTypes.object,
  actions: PropTypes.object.isRequired
};

PeopleDetailContainer.contextTypes = {
  router: PropTypes.object
};

function getPersonById(people, personId) {
  const personMatch = people.find(person => {
    const idFromUrl = person.url.split('http://swapi.co/api/people/').pop().replace('/','');
    return idFromUrl === personId;
  });
  if (personMatch) {
    return personMatch;
  }
  return null;
}

function mapStateToProps(state, ownProps) {
  const personId = ownProps.params.id;
  let person = {name: null};
  if (personId && state.people.length > 0) {
    person = getPersonById(state.people, personId);
  }
  return {
    person: person
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(peopleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleDetailContainer);
