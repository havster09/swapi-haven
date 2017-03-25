import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {CardHeader,CardTitle} from 'material-ui/Card';
import * as PropTypes from "react/lib/ReactPropTypes";

const PeopleDetail = ({entity}) => {
    return (
    <div>
      <CardHeader title="Details"/>
      <CardTitle title={entity.name} subtitle={entity.gender} />

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
            <TableRowColumn>{entity.hair_color}</TableRowColumn>
            <TableRowColumn>{entity.birth_year}</TableRowColumn>
            <TableRowColumn>{entity.height}</TableRowColumn>
            <TableRowColumn>{entity.mass}</TableRowColumn>
            <TableRowColumn>{entity.skin_color}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    );
};

PeopleDetail.propTypes = {
    entity: PropTypes.object.isRequired
};


export default PeopleDetail;
