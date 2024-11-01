import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../person/person.css'

const Library = () => {
  const categories = [
    { title: 'Badiiy adabiyotlar', button: 'Kitoblar' },
    { title: 'Xorijiy adabiyotlar', button: 'Kitoblar' },
    { title: 'Darsliklar', button: 'Kitoblar' },
    { title: 'O‘quv qo‘llanmalar', button: 'Kitoblar' },
    { title: '', button: 'Kitoblar' },
  ];
  const navigate=useNavigate()
  const onSubmitPages=(e)=>{
    e.preventDefault();
    navigate('/metro')
  }
const onchangePages=(e)=>{
  e.preventDefault();
  navigate('/metro/liberary/liberys')
}

  return (
    <div className=" person flex flex-col items-center py-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between w-full max-w-4xl mb-4 px-4">
        <button type='submit' onClick={onchangePages} className="text-gray-600">{"O'quv qo'lanmalar"}</button>
        <button type='submit' onClick={onSubmitPages} className="text-gray-600">Bosh sahifaga qaytish</button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Metropoliten elektron kutubxonasi
        </h2>
        <hr className="border-blue-500 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center border-2 border-blue-300 p-4 rounded-lg"
            >
              <img
                src="https://via.placeholder.com/100" // kitob rasmi uchun placeholder rasm
                alt="Kitoblar"
                className="mb-4"
              />
              <h3 className="text-center font-medium mb-2">{category.title}</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                {category.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;