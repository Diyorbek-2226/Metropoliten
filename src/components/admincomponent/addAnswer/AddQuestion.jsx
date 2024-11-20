import React, { useState } from 'react';
import axios from 'axios';

export default function QuestionCreation({ quizId, onNumAnswersSet }) {
  const [questionData, setQuestionData] = useState({
    title: '',
    technique: 0,
    is_active: true,
    structure: 1,
    quiz: quizId,
  });
  const [numAnswers, setNumAnswers] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleNumAnswersChange = (e) => {
    setNumAnswers(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://67.205.170.103:8001/api/v1/quiz/question/create/', questionData);
      alert('Question created successfully!');
      onNumAnswersSet(numAnswers); // Pass number of answers to parent component
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Failed to create question. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Question Title"
          value={questionData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Number of Answers"
          value={numAnswers}
          onChange={handleNumAnswersChange}
          required
        />
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}
