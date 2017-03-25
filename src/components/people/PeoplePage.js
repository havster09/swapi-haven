import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as PropTypes from "react/lib/ReactPropTypes";
import Rating from 'react-rating';
import * as peopleActions from '../../actions/peopleActions';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';


class PeoplePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {searchFilter: '', ratings: []};
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onRateChange = this.onRateChange.bind(this);
    this.getPlanet = this.getPlanet.bind(this);
  }

  onSearchChange(event) {
    this.setState({searchFilter: event.target.value});
  }

  getPlanet(person) {
    const planetItem = this.props.planets.find((planet) => planet.url === person.homeworld);
    if (planetItem) {
      return planetItem.name;
    }
    else {
      return '';
    }
  }

  onRateChange(rate, event) {
    const ratedPersonName = event.target.closest('tr').attributes['data-sw-row'].value;
    const filteredRatings = this.state.ratings.filter((rating) => rating.name !== ratedPersonName);
    const existingRating = this.state.ratings.find((rating) => rating.name === ratedPersonName);
    if (existingRating) {
      this.setState({
        ratings: [
          ...filteredRatings, {name: ratedPersonName, value: parseInt(rate)}
        ]
      });
    }
    else {
      this.setState({
        ratings: [
          ...this.state.ratings, {name: ratedPersonName, value: parseInt(rate)}
        ]
      });
    }
  }

  render() {
    let peopleCopy = [...this.props.people];
    peopleCopy.forEach((person) => {
      const ratingItem = this.state.ratings.find((rating) => rating.name === person.name);
      if (ratingItem) {
        person.rating = ratingItem.value;
      }
      else {
        person.rating = 1;
      }
    });
    peopleCopy.sort((a, b) => {
      if (a.rating < b.rating) {
        return 1;
      }
      else {
        return -1;
      }
    });


    const displayPeople = peopleCopy.filter(person => person.name.includes(this.state.searchFilter))
      .map((person) => {
        const personId = person.url.split('http://swapi.co/api/people/').pop().replace('/', '');
        return (
          <TableRow key={person.name} data-sw-row={person.name}>
            <TableRowColumn>{person.name}</TableRowColumn>
            <TableRowColumn>{person.birth_year}</TableRowColumn>
            <TableRowColumn>{person.gender}</TableRowColumn>
            <TableRowColumn>{this.getPlanet(person)}</TableRowColumn>
            <TableRowColumn><Rating stop={5} onClick={this.onRateChange} initialRate={person.rating}/></TableRowColumn>
            <TableRowColumn><RaisedButton label={`View`}
                                          containerElement={<Link to={`/people/${personId}`}/>}/></TableRowColumn>
          </TableRow>);
      });
    return (
      <Card>
        <CardTitle title="People" subtitle="from a galaxy far, far away"/>
        <CardText>
          <TextField
            type="text"
            name="Search"
            hintText="Search name"
            value={this.state.searchFilter}
            onChange={this.onSearchChange}/>
        </CardText>

        <Table selectable={false}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Birth Year</TableHeaderColumn>
              <TableHeaderColumn>Gender</TableHeaderColumn>
              <TableHeaderColumn>Planet</TableHeaderColumn>
              <TableHeaderColumn>Votes</TableHeaderColumn>
              <TableHeaderColumn>Detail</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {displayPeople}
          </TableBody>
        </Table>
      </Card>
    );
  }
}

PeoplePage.propTypes = {
  searchFilter: PropTypes.string,
  people: PropTypes.array.isRequired,
  planets: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    people: state.people,
    planets: state.planets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(peopleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);
