"use client";

import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/** Riyadh — Saudi Arabia */
const SA_CENTER: [number, number] = [24.7136, 46.6753];

const SA_BOUNDS: L.LatLngBoundsExpression = [
  [16.0, 34.0],
  [33.0, 56.0],
];

function MapClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export interface SaudiMapPickerProps {
  lat: number | null;
  lng: number | null;
  onPositionChange: (lat: number, lng: number) => void;
}

export default function SaudiMapPicker({ lat, lng, onPositionChange }: SaudiMapPickerProps) {
  useEffect(() => {
    // Default Leaflet icon paths break under bundlers — use CDN assets
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  const hasPin = lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng);

  return (
    <MapContainer
      center={hasPin ? [lat!, lng!] : SA_CENTER}
      zoom={hasPin ? 14 : 11}
      className="z-0 h-64 w-full overflow-hidden rounded-xl border border-foreground/10"
      scrollWheelZoom
      maxBounds={SA_BOUNDS}
      maxBoundsViscosity={0.65}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onPick={onPositionChange} />
      {hasPin ? (
        <Marker
          position={[lat!, lng!]}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const p = e.target.getLatLng();
              onPositionChange(p.lat, p.lng);
            },
          }}
        />
      ) : null}
    </MapContainer>
  );
}
