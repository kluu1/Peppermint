import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { renderComponent, compose } from 'recompose';
import PieChart from '../PieChart';
import LineChart from '../LineChart';
import getTopPerformingStores from '../../actions/getTopPerformingStores';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  card: {
    width: '100%',
    height: 500,
  },
});

const lineOptions = {
  options: {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        endingShape: 'arrow',
      },
    },
    stroke: {
      width: [4, 0, 0],
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8,
      },
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: 100,
    },
  },
};
const lineSeries = [
  {
    name: 'Goal',
    type: 'column',
    data: [23, 12, 54, 61, 32, 56, 81, 19],
  },
  {
    name: 'Actual',
    type: 'column',
    data: [25, 13, 55, 58, 30, 54, 89, 24],
  },
];

function GridMiddle(props) {
  const { classes } = this.props;

  const pieData = {
    series: [],
    labels: [],
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} md={5}>
          <Card className={classes.card}>
            <CardHeader
              title="Sales Distrubtion By Store"
              subheader="Last 6 Months"
            />
            <CardContent>
              <PieChart className={classes.center} pieData={pieData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card className={classes.card}>
            <CardHeader title="Company Sales Goal" subheader="Last 6 Months" />
            <CardContent>
              <LineChart
                lineOptions={lineOptions.options}
                lineSeries={lineSeries}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

GridMiddle.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

GridMiddle.defaultProps = {
  classes: {},
};

const mapStateToProps = state => ({
  topPerformingStores: state.companyData.topPerformingStores,
});

export default compose(
  withStyles(styles, {
    name: 'GridMiddle',
  }),
  connect(mapStateToProps),
)(GridMiddle);
