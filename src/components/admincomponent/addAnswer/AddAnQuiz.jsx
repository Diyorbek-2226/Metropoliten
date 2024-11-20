import React, { useState } from 'react';
import axios from 'axios';

export default function AddAnQuiz({ onQuizCreated }) {
  const [quizTitle, setQuizTitle] = useState('');

  const handleAddQuiz = async () => {
    if (quizTitle.trim() === '') {
      alert('Please provide a quiz title.');
      return;
    }

    try {
      const response = await axios.post('http://67.205.170.103:8001/api/v1/quiz/create/', {
        title: quizTitle,
      });
      alert('Quiz created successfully!');
      onQuizCreated(response.data.id); // Pass quiz ID to parent component
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create a New Quiz</h2>
      <input
        type="text"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Enter quiz title"
        required
      />
      <button onClick={handleAddQuiz}>Create Quiz</button>
    </div>
  );
}
