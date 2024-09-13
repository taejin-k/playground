import React, { useEffect, useRef, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function Home() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 37.5665,
    lng: 126.9779,
  });

  const handleSelect = async (value: string) => {
    setAddress(value);

    const results = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(results[0]!);
    setCoordinates({ lat, lng });
  };

  useEffect(() => {
    const { naver } = window as any;

    if (!naver || !mapElement.current) return;

    if (!mapRef.current) {
      // 지도 생성
      mapRef.current = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(coordinates.lat, coordinates.lng),
        zoom: 15,
      });

      // 마커 생성
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(coordinates.lat, coordinates.lng),
        map: mapRef.current,
      });
    } else {
      // 지도 중심 이동
      const newCenter = new naver.maps.LatLng(coordinates.lat, coordinates.lng);
      mapRef.current.setCenter(newCenter);

      // 마커 위치 이동
      markerRef.current!.setPosition(newCenter);
    }
  }, [coordinates.lat, coordinates.lng]);

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions: { country: ["kr"] } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input {...getInputProps({ placeholder: "주소를 입력하세요" })} />
            <div>
              {suggestions.map((suggestion) => (
                <div
                  {...getSuggestionItemProps(suggestion)}
                  key={suggestion.placeId}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <div
        ref={mapElement}
        style={{
          width: "100%",
          height: "400px",
        }}
      />
    </>
  );
}
