const ResetMapPoints = (visiblePoints) => {
  const ymaps = window.ymaps;

  ymaps.ready(() => {
    if (mapInitialized.current || !userLocation) return;

    visiblePoints.forEach(point => {
      const placemark = new ymaps.Placemark(
        [point.latitude, point.longitude],
        {
          balloonContent: 'Вы здесь',
        },
        {
          preset: 'islands#icon',
          iconColor: '#0095b6',
        }
      );

      map.geoObjects.add(placemark);
    })
  })
}

export default ResetMapPoints