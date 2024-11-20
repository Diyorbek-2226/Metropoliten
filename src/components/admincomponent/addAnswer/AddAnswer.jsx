import React, { useState } from 'react';
import axios from 'axios';

export default function AddAnswer({ quizId, numAnswers }) {
  const [answers, setAnswers] = useState(
    Array.from({ length: numAnswers }, () => ({
      title: '',
      is_correct: false,
      description: '',
      structure: 1,
      question: quizId,
    }))
  );

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAnswers = [...answers];
    updatedAnswers[index][name] = name === 'is_correct' ? value === 'true' : value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const promises = answers.map((answer) =>
        axios.post('http://67.205.170.103:8001/api/v1/quiz/answer/create/', answer)
      );
      await Promise.all(promises);
      alert('Answers created successfully!');
    } catch (error) {
      console.error('Error creating answers:', error);
      alert('Failed to create answers. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Answers</h2>
      <form onSubmit={handleSubmit}>
        {answers.map((answer, index) => (
          <div key={index}>
            <input
              type="text"
              name="title"
              placeholder={`Answer ${index + 1} Title`}
              value={answer.title}
              onChange={(e) => handleChange(index, e)}
              required
            />
            <select
              name="is_correct"
              value={answer.is_correct}
              onChange={(e) => handleChange(index, e)}
            >
              <option value={false}>False</option>
              <option value={true}>True</option>
            </select>
            <textarea
              name="description"
              placeholder="Answer Description"
              value={answer.description}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        ))}
        <button type="submit">Add Answers</button>
      </form>
    </div>
  );
}
