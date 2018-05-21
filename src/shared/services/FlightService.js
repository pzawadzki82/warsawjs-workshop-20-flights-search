import axios from 'axios';
import {FlightModel} from "../models/FlightModel";

export class FlightService {

    static API_URL = `http://warsawjs-flights-api.herokuapp.com`;

    static fetchFlights(fromAirport, toAirport) {
        return axios.get(`${this.API_URL}/flights/01-01-2018/31-01-2018/${fromAirport.id}/${toAirport.id}`).then(res => {
            return res.data.map(item => FlightModel.fromBackendData(item));
        })
    }

}