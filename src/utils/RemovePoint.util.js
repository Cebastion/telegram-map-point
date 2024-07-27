const RemovePoint = (mapRef, point) => {
  if (!mapRef.current.mapInstance || !mapRef.current.markers) return;

  const markerIndex = mapRef.current.markers.findIndex(marker => 
    marker.geometry.getCoordinates()[0] === point.coordinates.latitude &&
    marker.geometry.getCoordinates()[1] === point.coordinates.longitude
  );

  if (markerIndex !== -1) {
    mapRef.current.mapInstance.geoObjects.remove(mapRef.current.markers[markerIndex]);
    mapRef.current.markers.splice(markerIndex, 1);
  }
}

export { RemovePoint }
