import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as peopleActions from '../../actions/peopleActions';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import PeopleDisplay from './PeopleDisplay';



class PeoplePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {searchFilter: '', ratings: []};
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleGetPlanet = this.handleGetPlanet.bind(this);
    this.handleOnRateChange = this.handleOnRateChange.bind(this);
  }

  componentDidMount() {

  }

  onSearchChange(event) {
    this.setState({searchFilter: event.target.value});
  }

  handleGetPlanet(person) {
    const planetItem = this.props.planets.find((planet) => planet.url === person.homeworld);
    if (planetItem) {
      return planetItem.name;
    }
    else {
      return '';
    }
  }

  handleOnRateChange(rate, event) {
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
    let peopleSortedSearched = [...this.props.people];
    peopleSortedSearched.forEach((person) => {
      const ratingItem = this.state.ratings.find((rating) => rating.name === person.name);
      if (ratingItem) {
        person.rating = ratingItem.value;
      }
      else {
        person.rating = 1;
      }
    });
    peopleSortedSearched.sort((a, b) => {
      if (a.rating < b.rating) {
        return 1;
      }
      else {
        return -1;
      }
    });


    const displayPeople = peopleSortedSearched.filter(person => person.name.toLowerCase().includes(this.state.searchFilter.toLowerCase()))
      .map((person) => <PeopleDisplay key={person.url.split('http://swapi.co/api/people/').pop().replace('/', '')} person={person} getPlanet={this.handleGetPlanet} onRateChange={this.handleOnRateChange}/>);
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
