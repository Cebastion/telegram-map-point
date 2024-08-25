const InitMap = (mapInitialized, mapRef, userLocation, setTargetUser, TargetUser) => {
  const ymaps = window.ymaps

  ymaps.ready(() => {
    if (mapInitialized.current || !userLocation) return

    const map = new ymaps.Map(mapRef.current, {
      center: [userLocation.latitude, userLocation.longitude],
      zoom: 15,
    })

    mapInitialized.current = true

    const placemark = new ymaps.Placemark(
      [userLocation.latitude, userLocation.longitude],
      {
        balloonContent: 'Вы здесь',
      },
      {
        preset: 'islands#icon',
        iconColor: '#0095b6',
      }
    )

    map.geoObjects.add(placemark)


    if(TargetUser){
      map.setCenter([userLocation.latitude, userLocation.longitude])
    }
    
    const customButton = new ymaps.control.Button({
      data: {
        content: "Отключить привязку к своему месту положения",
        title: "Отключить привязку к своему месту положения"
      },
      options: {
        selectOnClick: true
      }
    });

    customButton.events.add('click', function () {
      setTargetUser(false)
    });

    mapRef.current.mapInstance = map
    mapRef.current.placemark = placemark
    map.controls.add(customButton, { float: 'left' });
  })
}

export { InitMap }
