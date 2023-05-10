import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './style.css';
import PopUp from "./pupup";

const center = {
  lat: 40.750568,
  lng: -73.9957077
}
var globalMap;
var globalMaps;

const options = [
  {
    label: "#101",
    value: "orderid2",
  },
  {
    label: "#102",
    value: "orderid3",
  },
  {
    label: "#103",
    value: "orderid1",
  },
];

const orderData = {
  orderid1: [
    {
      orderid: 'orderid1',
      origin: 'Chicago, IL',
      destination: 'Los Angeles, CA',
      latlngOrigin: { lat: 41.8339042, lng: -88.0121617 },
      latlngDest: { lat: 34.0523566, lng: -118.313726 },
      waypointsMarker: [{
        latlng: { lat: 37.0843435, lng: -94.5833219 },
      }],
      waypoints: [
        {
          location: 'Joplin, MO',
          stopover: true
        }],
      color: 'green'
    },
    {
      orderid: 'orderid1',
      origin: 'minneopolis, MO',
      destination: 'Los Angeles, CA',
      latlngOrigin: { lat: 44.9706756, lng: -93.3315183 },
      latlngDest: { lat: 34.0523566, lng: -118.313726 },
      waypointsMarker: [{
        latlng: { lat: 40.3988355, lng: -94.3326543 }
      }],
      waypoints: [
        {
          location: 'Denver, MO',
          stopover: true
        }],
      color: 'blue'
    },
    {
      orderid: 'orderid1',
      origin: 'cincinnati',
      destination: 'Los Angeles, CA',
      latlngOrigin: { lat: 39.1365225, lng: -84.6804892 },
      latlngDest: { lat: 34.0523566, lng: -118.313726 },
      waypointsMarker: [{
        latlng: { lat: 32.8209296, lng: -97.0117561 }
      }],
      waypoints: [
        {
          location: 'dallas, USA',
          stopover: true
        }],
      color: 'red'
    }
  ],
  orderid2: [
    {
      orderid: 'orderid2',
      origin: 'Chicago, Illinois, USA',
      destination: 'Los Angeles, CA',
      latlngOrigin: { lat: 41.8339042, lng: -88.0121617 },
      latlngDest: { lat: 34.0523566, lng: -118.313726 },
      waypointsMarker: [{
        latlng: { lat: 40.3988355, lng: -94.3326543 }
      }],
      waypoints: [
        {
          location: 'Denver, MO, USA',
          stopover: true
        }],
      color: 'green'
    }],
  orderid3: [
    {
      orderid: 'orderid3',
      origin: 'Los Angeles, CA',
      destination: 'Austin, TX, USA',
      latlngOrigin: { lat: 34.0523566, lng: -118.313726 },
      latlngDest: { lat: 30.3080553, lng: -98.0336063 },
      waypointsMarker: [{
        latlng: { lat: 40.3988355, lng: -94.3326543 }
      }],
      waypoints: [
        {
          location: 'Denver, MO, USA',
          stopover: false
        }],
      color: 'green'
    },
    {
      orderid: 'orderid3',
      origin: 'Los Angeles, CA',
      destination: 'Austin, TX, USA',
      latlngOrigin: { lat: 34.0523566, lng: -118.313726 },
      latlngDest: { lat: 30.3080553, lng: -98.0336063 },
      waypointsMarker: [{
        latlng: { lat: 30.5259689, lng: -97.8962447 }
      }],
      waypoints: [
        {
          location: 'Durango Hills, Leander, TX, USA',
          stopover: false
        }],
      color: 'blue'
    }
  ],
}

const Marker = ({ text, toggle }) => {
  const [seen, setSeen] = useState(false)

  const handleToggle = () => {
    toggle(!seen)
    setSeen(!seen)
  }

  return (
    <div onClick={handleToggle}>
      <img src={require('./location-point.png').default} style={{ marginTop: -15 }} width={"24"} height={"24"} />
    </div>
  )
}

class SimpleMap extends Component {
  static defaultProps = {
    center: center,
    zoom: 28
  };

  constructor(props) {
    super(props);
    this.state = {
      seen: false,
      orderId: "orderid2",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  togglePop = (value) => {
    this.setState({
      seen: value
    });
  };

  handleChange(e) {
    console.log("Fruit Selected!!");
    this.apiIsLoaded(globalMap, globalMaps, e.target.value)
    this.setState({ orderId: e.target.value });
  }

  apiIsLoaded(map, maps, orderId) {
    let orderDetils = orderData[orderId].filter(order => order.orderid === orderId)
    var directionsService = new google.maps.DirectionsService();
    orderDetils.forEach(orderDetils => this.createDirectionsRenderer(directionsService, map, maps, orderId, orderDetils))
  }

  createDirectionsRenderer(directionsService, map, maps, orderId, orderDetils) {

    var directionsRenderer = new google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: orderDetils.color || 'red'
      },
      // markerOptions: { icon: require('./location-point.png').default } # COULD BE USE LATER
    });
    directionsRenderer.setMap(null);
    directionsRenderer.setMap(map);

    const waypoints = orderDetils.waypoints.map(waypoint => ({
      location: waypoint.location,
      stopover: true
    }))

    directionsService.route({
      origin: orderDetils.origin,
      destination: orderDetils.destination,
      waypoints: orderDetils.waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    },
      (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching direction ${result}`)
        }
      }
    );
  }

  render() {
    const renderMarkers = []
    orderData[this.state.orderId].forEach((item, i) => {
      renderMarkers.push(<Marker
        key={renderMarkers.length + 1}
        lat={item.latlngOrigin.lat}
        lng={item.latlngOrigin.lng}
        text="My Marker"
        toggle={this.togglePop} />);


      renderMarkers.push(<Marker
        key={renderMarkers.length + 1}
        lat={item.latlngDest.lat}
        lng={item.latlngDest.lng}
        text="My Marker"
        toggle={this.togglePop} />);

      item.waypointsMarker.forEach(((wpMarker, wpi) => {
        renderMarkers.push(<Marker
          key={renderMarkers.length + 2}
          lat={wpMarker.latlng.lat}
          lng={wpMarker.latlng.lng}
          text="My Marker"
          toggle={this.togglePop} />)
      }))
    })

    return (
      <div>
        <div className="tabs">
          <ul>
            <li className="today">Today's List <span>4</span></li>
            <li className="on-time">Shipment on Time <span>4</span></li>
            <li className="delayed">Shipments Delayed <span>3</span></li>
          </ul>

          <select className="icon" value={this.state.orderId} onChange={this.handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div style={{ height: '80vh', width: '100%' }}>
          {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
          {/* ----------ORDER ID 1------ */}
          {this.state.orderId === 'orderid1' && <GoogleMapReact
            bootstrapURLKeys={{ key: this.props.mapkey }}
            defaultCenter={center}
            defaultZoom={13}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              globalMap = map;
              globalMaps = maps;
              this.apiIsLoaded(map, maps, this.state.orderId)
            }}
          >
            {renderMarkers}
          </GoogleMapReact>}
          {/* ----------ORDER ID 2------ */}
          {this.state.orderId === 'orderid2' && <GoogleMapReact
            bootstrapURLKeys={{ key: this.props.mapkey }}
            defaultCenter={center}
            defaultZoom={13}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              globalMap = map;
              globalMaps = maps;
              this.apiIsLoaded(map, maps, this.state.orderId)
            }}
          >
            {renderMarkers}
          </GoogleMapReact>}
          {/* ----------ORDER ID 3------ */}
          {this.state.orderId === 'orderid3' && <GoogleMapReact
            bootstrapURLKeys={{ key: this.props.mapkey }}
            defaultCenter={center}
            defaultZoom={13}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              globalMap = map;
              globalMaps = maps;
              this.apiIsLoaded(map, maps, this.state.orderId)
            }}
          >
            {renderMarkers}
          </GoogleMapReact>}
        </div>
      </div>
    );
  }
}

export default SimpleMap;