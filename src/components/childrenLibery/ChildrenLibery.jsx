import BackButton from '../BackButton/BackButton';
import '../person/person.css';
import { useState, useEffect } from 'react';

const ChildrenLibery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Ma'lumotlarni olish uchun fetch so'rovini amalga oshiramiz
    fetch('http://67.205.170.103:8001/api/v1/main/library/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Xato yuz berdi');
        }
        return response.json();
      })
      .then((data) => {
        setData(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Qidiruv bo'yicha filterlangan natijalar
  const filteredLibrary = data.filter((el) =>
    el.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Yuklanmoqda...</div>;
  if (error) return <div>Xato yuz berdi: {error.message}</div>;

  return (
    <div className="person flex flex-col items-center py-8 h-[200vh] bg-gray-100 min-h-screen">
     

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-center mb-6">O‘quv qo‘llanmalar</h2>
        <hr className="border-blue-500 mb-6" />
        <div className="flex justify-between w-full max-w-4xl mb-8 mt-8 px-4">
        {/* Qidiruv inputi */}
        <input
          type="text"
          placeholder="Qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full max-w-xs"
        />
         <div>
  <BackButton to={'/student'} title={`Bosh sahifaga ${"o'tish"}`} />
</div>
      </div>
     


        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredLibrary.map((el, index) => (
            <div
              key={index}
              className="flex flex-col items-center border-2 border-blue-300 p-4 rounded-lg"
            >
              <img
                src={el.image || 'path-to-default-image.jpg'}
                alt={el.name}
                className="mb-4 w-full h-32 object-cover"
              />
              <h3 className="text-center text-sm md:text-base font-medium mb-2">{el.name}</h3>
              <a 
                href={el.file} 
                target="_blank" 
                download 
                className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded text-center cursor-pointer w-full text-sm md:text-base"
                rel="noopener noreferrer"
              >
                Yuklab olish
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChildrenLibery;
