const GenerateColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const AddPoint = (mapRef, point, setPopUp, setActivePoint, VisiblePoints) => {
  const ymaps = window.ymaps;

  if (!mapRef.current.mapInstance) return;

  if(VisiblePoints.find(p => p.coordinates.latitude === point.coordinates.latitude && p.coordinates.longitude === point.coordinates.longitude)) return

  const marker = new ymaps.Placemark(
    [point.coordinates.latitude, point.coordinates.longitude],
    {
      //balloonContent: point.description || 'Маркер',
    },
    {
      preset: 'islands#circleDotIcon',
      iconColor: GenerateColor(),
    }
  );

  marker.events.add('click', () => {
    setPopUp(true)
    setActivePoint(point)
  });

  mapRef.current.mapInstance.geoObjects.add(marker);
  mapRef.current.markers = mapRef.current.markers || [];
  mapRef.current.markers.push(marker);
}

export { AddPoint }
