export class FlightModel {
    id;
    price;
    inboundPath;
    outboundPath;

    static fromBackendData(data){
        return Object.assign(new FlightModel(), data)
    }

    toString(){
        return `(${this.id}) $ ${this.price} > ${this.inboundPath} ${this.outboundPath}`;
    }
}