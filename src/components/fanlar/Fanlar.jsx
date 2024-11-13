import  { useState, useEffect } from 'react';  
import useFetchData from '../../hook/useFetch/UseFetch';   
import picture1 from '../../assets/temiryol.png';   
import picture2 from '../../assets/metro.png';   
import picture3 from '../../assets/kabina.png';   

export default function Fanlar() {  
  const { data, loading, error } = useFetchData('main/course/');  
  const subjects = data?.results || []; 
  console.log(subjects);
   
  
  // State for filtered subjects and current index  
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);  
  const [currentIndex, setCurrentIndex] = useState(0);  

  useEffect(() => {  
    setFilteredSubjects(subjects);  // Directly set filtered subjects to all subjects  
  }, [subjects]);  

  const nextCard = () => {  
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(filteredSubjects.length / 4));  
  };  

  const prevCard = () => {  
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(filteredSubjects.length / 4)) % Math.ceil(filteredSubjects.length / 4));  
  };  

  const displayedCards = filteredSubjects.slice(currentIndex * 4, currentIndex * 4 + 4);  

  return (  
    <div className="container mx-auto w-4/5 mt-12 mb-12">  
      <h1 className="text-3xl font-bold text-center mb-8">Fanlar</h1>  
      
      <div className="relative flex items-center justify-center">  
        <button onClick={prevCard} className="absolute left-0 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-300">  
          ❮  
        </button>  
        <div className="flex gap-4 overflow-hidden w-full px-12">  
          {displayedCards.map((subject, index) => (  
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 w-64 flex-shrink-0">  
              <img   
                src={index === 0 ? picture1 : index === 1 ? picture2 : picture3} // Use the images based on the index  
                alt={subject.name}  
                className="w-full h-32 object-cover rounded-t-lg" // Adjust image size  
              />  
              <h3 className="mt-4 text-gray-800 font-semibold text-lg">{subject.name}</h3>  
              <p>Study Period: {subject.study_period}</p>  
              <p>Lesson Day: {subject.lesson_day}</p>   
              <p>Group: {subject.group.name}</p>  
              <button className="mt-4 w-full text-white bg-green-500 hover:bg-green-600 rounded-lg py-2 transition duration-300">  
                {subject.training}  
              </button>  
            </div>  
          ))}  
        </div>  
        <button onClick={nextCard} className="absolute right-0 p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-300">  
          ❯  
        </button>  
      </div>  
      {loading && <p>Loading...</p>}  
      {error && <p>Error loading subjects!</p>}  
    </div>  
  );  
}