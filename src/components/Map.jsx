const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [visiblePoints, setVisiblePoints] = useState([]);
  const [points, setPoints] = useState([]);
  const mapRef = useRef(null);
  const mapInitialized = useRef(false);


  return (
    <div id='map' style={{ width: '100%', height: '100vh' }}></div>
  )
}

export default Map