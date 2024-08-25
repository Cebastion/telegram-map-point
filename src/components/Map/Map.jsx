import { useEffect, useState, useRef } from 'react'
import { GetUserLocation } from '../../utils/GetUserLocation.util'
import { InitMap } from '../../utils/InitMap.until'
import { GetData } from '../../API/GetData'
import { CheckPointDistance } from '../../utils/CheckPointDistance.until'
import style from './Map.module.scss'
import PopUp from '../PopUp/PopUp'
import { UpdateUserLocation } from '../../utils/UpdateUserLocation.util'

const Map = () => {
	const [TargetUser, setTargetUser] = useState(true)
	const [popUp, setPopUp] = useState(false)
	const [userLocation, setUserLocation] = useState(null)
	const [visiblePoints, setVisiblePoints] = useState([])
	const [activePoint, setActivePoint] = useState(null)
	const [points, setPoints] = useState([])
	const mapRef = useRef(null)
	const mapInitialized = useRef(false)

	useEffect(() => {
		GetData(setPoints)
	}, [])

	useEffect(() => {
		GetUserLocation(setUserLocation)

		if (userLocation && !mapInitialized.current) {
			InitMap(mapInitialized, mapRef, userLocation, setTargetUser, TargetUser)
			mapRef.current.markers = []
		}
	}, [userLocation])

	useEffect(() => {
		if (userLocation && points) {
			CheckPointDistance(
				userLocation,
				points,
				setVisiblePoints,
				mapRef,
				setPopUp,
				setActivePoint
			)
		}
	}, [userLocation, points])

	useEffect(() => {
		if (userLocation && mapInitialized.current && TargetUser) {
			navigator.geolocation.watchPosition(
				position => {
					const { latitude, longitude } = position.coords
					UpdateUserLocation(mapRef, { latitude, longitude })
				},
				error => {
					console.error('Error watching user location:', error)
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 0,
				}
			)
		}
	}, [userLocation, points, visiblePoints, mapInitialized.current])

	return (
		<>
			<div ref={mapRef} className={style.map}></div>
			{popUp && (
				<PopUp
					activePoint={activePoint}
					SetPopUp={setPopUp}
					setActivePoint={setActivePoint}
				/>
			)}
		</>
	)
}

export default Map
