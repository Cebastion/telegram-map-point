import { useEffect, useState, useRef } from 'react'
import { GetUserLocation } from '../../utils/GetUserLocation.util'
import { InitMap } from '../../utils/InitMap.until'
import { GetData } from '../../API/GetData'
import { CheckPointDistance } from '../../utils/CheckPointDistance.until'
import style from './Map.module.scss'
import PopUp from '../PopUp/PopUp'

const Map = () => {
  const [popUp, setPopUp] = useState(false)
  const [userLocation, setUserLocation] = useState(null);
  const [visiblePoints, setVisiblePoints] = useState([]);
  const [activePoint, setActivePoint] = useState(null);
  const [points, setPoints] = useState([]);
  const mapRef = useRef(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    GetData(setPoints)
    GetUserLocation(setUserLocation)

    if(userLocation && !mapInitialized.current) {
      InitMap(mapInitialized, mapRef, userLocation)
    }

    if(userLocation && points) {
      CheckPointDistance(userLocation, points, visiblePoints, setVisiblePoints, mapRef, setPopUp, setActivePoint)
    }
  }, [userLocation, points, mapInitialized.current, visiblePoints])


  return (
    <>
      <div ref={mapRef} className={style.map}></div>
      {popUp && <PopUp activePoint={activePoint} SetPopUp={setPopUp} setActivePoint={setActivePoint}/>}
    </>
  )
}

export default Map