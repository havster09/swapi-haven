import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {CardHeader,CardTitle} from 'material-ui/Card';
import * as PropTypes from "react/lib/ReactPropTypes";

const PeopleDetail = ({peopleDetail}) => {
    return (
    <div>
      <CardHeader title="Details"/>
      <CardTitle title={peopleDetail.name} subtitle={peopleDetail.gender} />

      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Hair Color</TableHeaderColumn>
            <TableHeaderColumn>Birth Year</TableHeaderColumn>
            <TableHeaderColumn>Height</TableHeaderColumn>
            <TableHeaderColumn>Mass</TableHeaderColumn>
            <TableHeaderColumn>Skin Color</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn>{peopleDetail.hair_color}</TableRowColumn>
            <TableRowColumn>{peopleDetail.birth_year}</TableRowColumn>
            <TableRowColumn>{peopleDetail.height}</TableRowColumn>
            <TableRowColumn>{peopleDetail.mass}</TableRowColumn>
            <TableRowColumn>{peopleDetail.skin_color}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    );
};

PeopleDetail.propTypes = {
  peopleDetail: PropTypes.object.isRequired
};


export default PeopleDetail;
