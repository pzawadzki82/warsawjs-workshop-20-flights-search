import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PrimaryButton} from "../shared/components/PrimaryButton";
import SelectAirport from "../shared/components/SelectAirport";
import {FlightService} from '../shared/services/FlightService'
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core/styles/index";

class SearchView extends Component {
    state = {
        fromAirport: null,
        toAirport: null,
        flightsPending: false
    }

    onSearchPress = () => {
        this.setState({
            flightsPending: true
        }, () => {
            FlightService.fetchFlights(this.state.fromAirport, this.state.toAirport).then(flights => {
                this.setState({
                    flightsPending: false
                }, () => this.props.onSearchClick(flights))
            });
        });
    };

    _updateAirport = (key, airport) => {
        this.setState({
            [key]: airport  //[key] is a dynamic property name based on value of 'key'
        }, () => {
            console.log(this.state)
        });
    };

    render() {
        const {airports, pending, classes} = this.props;
        const {fromAirport, toAirport, flightsPending} = this.state;
        const fieldsSelected = !Boolean(fromAirport && toAirport);
        return (
            <div>
                {!pending &&
                (<div>
                    <SelectAirport onChange={(airport) => this._updateAirport(`fromAirport`, airport)}
                                   airports={airports}
                                   label={'FROM'}/>
                    < SelectAirport onChange={(airport) => this._updateAirport(`toAirport`, airport)}
                                    airports={airports} label={'TO'}/>
                </div>)}
                <br/>
                {(pending || flightsPending) && <CircularProgress />}
                <br />
                {!flightsPending && <PrimaryButton text={`Search for the flights`}
                                                   onClick={this.onSearchPress}
                                                   disabled={fieldsSelected}
                />}
            </div>
        )
    }
}


SearchView.propTypes = {
    onSearchClick: PropTypes.func.isRequired,
    airports: PropTypes.array,
    pending: PropTypes.bool
}

SearchView.defaultProps = {
    pending: false
};

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

export default withStyles(styles)(SearchView);