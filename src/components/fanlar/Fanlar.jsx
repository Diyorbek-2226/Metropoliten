import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, BookOpen } from 'lucide-react';
import useFetchData from '../../hook/useFetch/UseFetch';


export default function Fanlar() {
  const { data, loading, error } = useFetchData('main/course/');
  const [currentIndex, setCurrentIndex] = useState(0);

  const subjects = data?.results || [];

  useEffect(() => {
    setCurrentIndex(0);
  }, [subjects]);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(subjects.length / 4));
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(subjects.length / 4)) % Math.ceil(subjects.length / 4));
  };

  const displayedCards = subjects.slice(currentIndex * 4, currentIndex * 4 + 4);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div></div>;
  if (error) return <div className="text-center py-10 text-red-500 font-semibold">Error loading subjects. Please try again later.</div>;

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary">Fanlar</h1>
      
      <div className="relative">
        <button 
          onClick={prevCard} 
          className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-300 z-10 shadow-lg"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6">
          {displayedCards.map((subject) => (
            <div 
              key={subject.id} 
              className="bg-white rounded-xl shadow-xl p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 snap-start transform transition duration-500 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">{subject.name}</h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  <span className="font-medium">Study Period:</span> {subject.study_period}
                </p>
                <p className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <span className="font-medium">Lesson Day:</span> {subject.lesson_day}
                </p>
                <p className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  <span className="font-medium">Group:</span> {subject.group.name}
                </p>
              </div>
              <button className="mt-6 w-full text-white bg-primary hover:bg-primary-dark rounded-lg py-3 transition duration-300 flex items-center justify-center">
                <BookOpen className="w-5 h-5 mr-2" />
                {subject.training}
              </button>
            </div>
          ))}
        </div>
        <button 
          onClick={nextCard} 
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-300 z-10 shadow-lg"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}