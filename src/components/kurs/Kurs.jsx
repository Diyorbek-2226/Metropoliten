import  { useEffect } from 'react';
import useAxios from '../../hook/useFetch/UseFetch'

const Kurs = () => {
    const { loading, error, data, fetchData } = useAxios();
    useEffect(() => {
        // "main/task/" endpointiga `limit` va `offset` parametrlari bilan so'rov jo'natish
        fetchData('main/task/', { limit: 10, offset: 0 }); // limit va offset qiymatlarini o'zgartirishingiz mumkin
      }, []);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
    
      return (
        <div>
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
  );
};

export default Kurs;
