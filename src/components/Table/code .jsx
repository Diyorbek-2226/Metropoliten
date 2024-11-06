const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedule = async () => {
    try {
      const response = await fetch('http://67.205.170.103:8001/api/v1/main/schedule/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("Fetched data:", data.results); // Verify the structure of data
      setSchedule(data.results || []); // Assuming data has a 'results' key
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);