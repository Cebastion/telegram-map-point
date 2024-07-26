const CheckPointDistance = (userLocation, points, setVisiblePoints) => {
  const R = 6371000; // Радиус Земли в метрах
  const radius = 500 // Радиус пользователя в метрах
  const VisiblePoints = [];

  points.forEach(point => {
    const dLat = ((point.latitude - userLocation.latitude) * Math.PI) / 180;
    const dLon = ((userLocation.longitude - point.longitude) * Math.PI) / 180;

    const a =
    0.5 - Math.cos(dLat) / 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * (1 - Math.cos(dLon)) / 2;

    const distance = R * 2 * Math.asin(Math.sqrt(a));

    if(distance <= radius) {
      setVisiblePoints(VisiblePoints.push(point))
    }

    if(distance > radius) {
      setVisiblePoints(VisiblePoints.filter(point => point.id !== point.id))
    }
  })

}

export default CheckPointDistance