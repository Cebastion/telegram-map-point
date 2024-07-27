import { AddPoint, TogglePointVisibility } from './AddPoint.util'
import { RemovePoints } from './RemovePoint.util'

const CheckPointDistance = (userLocation, points, setVisiblePoints, mapRef, setPopUp, setActivePoint) => {
  const R = 6371000; // Радиус Земли в метрах
  const radius = 500; // Радиус пользователя в метрах (500 метров)
  const visiblePoints = [];

  if (mapRef.current.placemark) {
    mapRef.current.placemark.geometry.setCoordinates([userLocation.latitude, userLocation.longitude]);
    mapRef.current.mapInstance.setCenter([userLocation.latitude, userLocation.longitude]);
  }

  points.forEach(point => {
    const dLat = ((point.coordinates.latitude - userLocation.latitude) * Math.PI) / 180;
    const dLon = ((userLocation.longitude - point.coordinates.longitude) * Math.PI) / 180;

    const a =
      0.5 - Math.cos(dLat) / 2 + Math.cos((point.coordinates.latitude * Math.PI) / 180) * Math.cos((userLocation.latitude * Math.PI) / 180) * (1 - Math.cos(dLon)) / 2;

    const distance = R * 2 * Math.asin(Math.sqrt(a));

    if (distance <= radius) {
      if (!visiblePoints.find(p => p.coordinates.latitude === point.coordinates.latitude && p.coordinates.longitude === point.coordinates.longitude)) {
        visiblePoints.push(point);
      }
    }
  });

  setVisiblePoints(visiblePoints);

  // Удаляем точки, которые больше не видимы, если они существуют
  if (mapRef.current.markers) {
    mapRef.current.markers.forEach(marker => {
      const markerPoint = marker.properties.get('pointData');
      if (!visiblePoints.find(p => p.coordinates.latitude === markerPoint.coordinates.latitude && p.coordinates.longitude === markerPoint.coordinates.longitude)) {
        mapRef.current.mapInstance.geoObjects.remove(marker);
      }
    });
  }

  visiblePoints.forEach(point => {
    if (!mapRef.current.markers || !mapRef.current.markers.find(marker => {
      const markerPoint = marker.properties.get('pointData');
      return markerPoint.coordinates.latitude === point.coordinates.latitude && markerPoint.coordinates.longitude === point.coordinates.longitude;
    })) {
      AddPoint(mapRef, point, setPopUp, setActivePoint);
    } else {
      TogglePointVisibility(mapRef, point, true);
    }
  });
}

export { CheckPointDistance }