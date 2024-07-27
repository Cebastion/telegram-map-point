const UpdateUserLocation = (mapRef, newLocation) => {
  if (mapRef.current.placemark) {
    mapRef.current.placemark.geometry.setCoordinates([newLocation.latitude, newLocation.longitude])
    mapRef.current.mapInstance.setCenter([newLocation.latitude, newLocation.longitude])
  }
}

export { UpdateUserLocation }
