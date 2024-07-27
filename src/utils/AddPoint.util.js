const GenerateColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const AddPoint = (mapRef, point, setPopUp, setActivePoint) => {
  const ymaps = window.ymaps;

  if (!mapRef.current.mapInstance) return;

  const marker = new ymaps.Placemark(
    [point.coordinates.latitude, point.coordinates.longitude],
    {
      // Данные маркера
      pointData: point,
      balloonContent: point.description || 'Маркер',
    },
    {
      preset: 'islands#circleDotIcon',
      iconColor: GenerateColor(),
    }
  );

  marker.events.add('click', () => {
    setPopUp(true);
    setActivePoint(point);
  });

  mapRef.current.mapInstance.geoObjects.add(marker);
  mapRef.current.markers = mapRef.current.markers || [];
  mapRef.current.markers.push(marker);
}

const TogglePointVisibility = (mapRef, point, visible) => {
  const marker = mapRef.current.markers.find(marker => {
    const markerPoint = marker.properties.get('pointData');
    return markerPoint.coordinates.latitude === point.coordinates.latitude && markerPoint.coordinates.longitude === point.coordinates.longitude;
  });

  if (marker) {
    if (visible) {
      mapRef.current.mapInstance.geoObjects.add(marker);
    } else {
      mapRef.current.mapInstance.geoObjects.remove(marker);
    }
  }
}

export { AddPoint, TogglePointVisibility }
