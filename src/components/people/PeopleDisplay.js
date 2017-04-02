import React from 'react';
import * as PropTypes from "react/lib/ReactPropTypes";
import {Link} from 'react-router';
import Rating from 'react-rating';
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table';

const PeopleDisplay = ({person,getPlanet,onRateChange,ratings}) => {
  const personId = person.url.split('http://swapi.co/api/people/').pop().replace('/', '');
  let personRating = ratings.find((rating)=>rating.name === person.name);
  if(!personRating) {
    personRating = {value:1};
  }
    return (
      <TableRow key={person.name} data-sw-row={person.name}>
        <TableRowColumn>{person.name}</TableRowColumn>
        <TableRowColumn>{person.birth_year}</TableRowColumn>
        <TableRowColumn>{person.gender}</TableRowColumn>
        <TableRowColumn>{getPlanet(person)}</TableRowColumn>
        <TableRowColumn><Rating stop={5} onClick={onRateChange} initialRate={personRating.value}/></TableRowColumn>
        <TableRowColumn><RaisedButton label={`View`}
                                      containerElement={<Link to={`/people/${personId}`}/>}/></TableRowColumn>
      </TableRow>
    );
};

PeopleDisplay.propTypes = {
  person: PropTypes.object.isRequired,
  ratings: PropTypes.array.isRequired,
  getPlanet: PropTypes.func.isRequired,
  onRateChange: PropTypes.func.isRequired
};

export default PeopleDisplay;
