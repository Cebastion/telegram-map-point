import { AddPoint } from './AddPoint.util'
import { RemovePoints } from './RemovePoint.util'

const CheckPointDistance = (userLocation, points, visiblePoints, setVisiblePoints, mapRef, setPopUp, setActivePoint) => {
  const R = 6371000; // Радиус Земли в метрах
  const radius = 500; // Радиус пользователя в метрах
  const newVisiblePoints = [];

  points.forEach(point => {
    const dLat = ((point.coordinates.latitude - userLocation.latitude) * Math.PI) / 180;
    const dLon = ((userLocation.longitude - point.coordinates.longitude) * Math.PI) / 180;

    const a =
      0.5 - Math.cos(dLat) / 2 + Math.cos((point.coordinates.latitude * Math.PI) / 180) * Math.cos((userLocation.latitude * Math.PI) / 180) * (1 - Math.cos(dLon)) / 2;

    const distance = R * 2 * Math.asin(Math.sqrt(a));

    if (distance <= radius) {
      newVisiblePoints.push(point);
    }
  });

  // Remove points that are no longer visible
  visiblePoints.forEach(point => {
    if (!newVisiblePoints.includes(point)) {
      RemovePoints(mapRef, point);
    }
  });

  // Add new visible points
  newVisiblePoints.forEach(point => {
    if (!visiblePoints.includes(point)) {
      AddPoint(mapRef, point, setPopUp, setActivePoint);
    }
  });

  // Update state with new visible points
  setVisiblePoints(newVisiblePoints);
}

export { CheckPointDistance }
