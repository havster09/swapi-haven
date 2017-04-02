import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as PropTypes from "react/lib/ReactPropTypes";
import * as peopleActions from '../../actions/peopleActions';
import * as ratingsActions from '../../actions/ratingsActions';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import PeopleDisplay from './PeopleDisplay';
import {store} from '../../index';



class PeoplePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {searchFilter: ''};
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleGetPlanet = this.handleGetPlanet.bind(this);
    this.handleOnRateChange = this.handleOnRateChange.bind(this);
  }

  componentDidMount() {
    store.dispatch(peopleActions.loadPeople());
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
    this.props.ratingsActions.votePeopleRatings(rate, event);
  }

  render() {
    let peopleSortedSearched = this.props.people.slice();
    const displayPeople = peopleSortedSearched.filter(person => person.name.toLowerCase().includes(this.state.searchFilter.toLowerCase()))
      .sort((a, b) => {
      const ratings = this.props.ratings;
      let aRating = ratings.find((rating)=>rating.name === a.name);
      if(!aRating) {
        aRating = {value:1};
      }
      let bRating = ratings.find((rating)=>rating.name === b.name);
        if(!bRating) {
          bRating = {value:1};
        }
        if (aRating.value<bRating.value) {
          return 1;
        }
        else {
          return -1;
        }
      })
      .map((person) => <PeopleDisplay key={person.url.split('http://swapi.co/api/people/').pop().replace('/', '')} person={person} getPlanet={this.handleGetPlanet} onRateChange={this.handleOnRateChange} ratings={this.props.ratings}/>);
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
  ratings: PropTypes.array.isRequired,
  peopleActions: PropTypes.object.isRequired,
  ratingsActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    people: state.people,
    planets: state.planets,
    ratings:state.ratings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    peopleActions: bindActionCreators(peopleActions, dispatch),
    ratingsActions: bindActionCreators(ratingsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);
