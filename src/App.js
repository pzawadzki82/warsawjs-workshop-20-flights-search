import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchView from './search/SearchView'
import {FlightsView} from './flights/FlightsView'
import {AirportService} from './shared/services/AirportService'

class App extends Component {

    state = {
        searchVisible: true,
        airportsPending: true,
        airports: [],
        flights: [],
    };

    onSearchClick(flights) {
        this.setState({
            searchVisible: false,
            flights
        })
    }

    onBackClick = () => {
        this.setState({
            searchVisible: true
        });
    }

    constructor(props) {
        super(props)
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    componentDidMount() {
        AirportService.getAirportSources().then(airports => {
            this.setState({
                airportsPending: false,
                airports    //shortcut
            })
        })
    }

    render() {
        const {searchVisible, airports, airportsPending, flights} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to flights-search</h1>
                </header>

                {searchVisible && <SearchView
                    onSearchClick={this.onSearchClick}
                    airports={airports}
                    pending={airportsPending}
                />}
                {!searchVisible && <FlightsView onBackClick={this.onBackClick} flights={flights} />}
            </div>
        );
    }
}

export default App;
