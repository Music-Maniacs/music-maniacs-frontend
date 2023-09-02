import { LatLngTuple, LeafletMouseEvent, Map } from 'leaflet';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { MMButton } from '../../MMButton/MMButton';

type Props = {
  latitude?: number;
  longitude?: number;
  setLatLng?: (latitude?: number, longitude?: number) => void;
  hasClickEvent?: boolean;
  width?: string;
};

const defaultCenter: LatLngTuple = [-32.89707479647684, -68.85324328925705];

export const LeafletMap = ({ latitude, longitude, setLatLng, hasClickEvent = true, width = '100%' }: Props) => {
  const [markerPosition, setMarkerPosition] = React.useState<LatLngTuple | undefined>(undefined);

  function isValideLatitude(lat: any) {
    return isFinite(lat) && Math.abs(lat) <= 90;
  }

  function isValidLongitude(lng: any) {
    return isFinite(lng) && Math.abs(lng) <= 180;
  }

  const mapRef = useCallback(
    (map: Map) => {
      if (map && latitude && longitude && isValideLatitude(latitude) && isValidLongitude(longitude)) {
        setMarkerPosition([latitude, longitude]);
        map.flyTo([latitude, longitude]);
      }
    },
    [latitude, longitude]
  );

  useEffect(() => {
    if (markerPosition && setLatLng) {
      setLatLng(markerPosition[0], markerPosition[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerPosition]);

  const handleDeleteMarker = () => {
    setLatLng && setLatLng();
    setMarkerPosition(undefined);
  };

  return (
    <MapContainer
      ref={mapRef}
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '273px', width: width }}
    >
      {hasClickEvent && <MapEvents setMarkerPosition={setMarkerPosition} />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerPosition && (
        <>
          {hasClickEvent && (
            <div className="leaflet-top leaflet-right">
              <div className="leaflet-control leaflet-bar">
                <MMButton type="button" onClick={handleDeleteMarker}>
                  Borrar Marcador
                </MMButton>
              </div>
            </div>
          )}
          <Marker position={markerPosition}></Marker>
        </>
      )}
    </MapContainer>
  );
};

type MapEventsProps = {
  setMarkerPosition: Dispatch<SetStateAction<LatLngTuple | undefined>>;
};

const MapEvents = ({ setMarkerPosition }: MapEventsProps) => {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    }
  });
  return null;
};
