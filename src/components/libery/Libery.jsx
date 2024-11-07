import '../person/person.css';
import BackButton from '../BackButton/BackButton';
import useFetchData from '../../hook/useFetch/UseFetch'; // Adjust the path as needed

const Library = () => {

  const { data, loading, error } = useFetchData('main/library/');
  const library = data?.results || []; 

  return (
    <div className="person flex flex-col items-center py-8 h-[230vh] min-h-screen">
      <div className="flex justify-between w-full max-w-4xl mb-4 px-4">
        <BackButton to={'/student/liberary/liberys'} title={"O'quv qo'llanmalar"} />
        <BackButton title={'Bosh sahifa'} to={'/student'} />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 w-full max-w-4xl">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
          Metropoliten elektron kutubxonasi
        </h2>
        <hr className="border-blue-500 mb-6" />

        {loading && (
          <p className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></p>
        )}
        {error && <p>Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {library.map((el, index) => (
            <div
              key={index}
              className="flex flex-col items-center border-2 border-blue-300 p-4 rounded-lg"
            >
              <img
                src={el.image}
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

export default Library;
