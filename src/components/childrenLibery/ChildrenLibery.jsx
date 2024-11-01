
import { useNavigate } from 'react-router-dom';
import '../person/person.css'

const ChildrenLibery = () => {
  const guides = Array(10).fill({
    title: 'Metropoliten vagonlarning elektr jihozlari',
    button: 'Yuklab olish',
  });
const navigate=useNavigate()
const handlchange=()=>{
    navigate('/metro/liberary')
}
const handlPage=()=>{
    navigate('/metro')
}
  return (
    <div className="person flex flex-col items-center py-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between w-full max-w-4xl mb-4 px-4">
        <button onClick={handlchange} className="text-gray-600">Metropoliten elektron kutubxonasi</button>
        <button onClick={handlPage} className="text-gray-600">Bosh sahifaga qaytish</button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-center mb-6">O‘quv qo‘llanmalar</h2>
        <hr className="border-blue-500 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="flex flex-col items-center border-2 border-blue-300 p-4 rounded-lg"
            >
              <img
                src="https://via.placeholder.com/100" // qo'llanma rasmi uchun placeholder rasm
                alt="Qo'llanma"
                className="mb-4"
              />
              <h3 className="text-center font-medium text-sm mb-2">{guide.title}</h3>
              <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm">
                {guide.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default  ChildrenLibery;
