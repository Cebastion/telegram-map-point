const RemovePoints = (mapRef) => {
  if (!mapRef.current.mapInstance || !mapRef.current.markers) return;

  mapRef.current.markers.forEach(marker => {
    mapRef.current.mapInstance.geoObjects.remove(marker);
  });

  mapRef.current.markers = [];
}

export { RemovePoints }
