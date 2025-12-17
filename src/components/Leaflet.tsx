import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Leaflet = ({ mapAttributes }) => {
    console.log('mapattributes:: ', JSON.stringify(mapAttributes))
    const position = [51.505, -0.09]
    return (
        <MapContainer center={mapAttributes.startPosition} zoom={12} scrollWheelZoom={false} zoomControl={false}
            dragging={false}
            doubleClickZoom={false}
            attributionControl={false}>

            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='Tiles &copy; Esri'
            />
            <Marker position={mapAttributes.startPosition}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Leaflet