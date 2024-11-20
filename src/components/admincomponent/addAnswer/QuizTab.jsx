import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QuizTab() {
  const [activeTab, setActiveTab] = useState('add-quiz');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizId, setQuizId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [question, setQuestion] = useState('');
  const [numAnswers, setNumAnswers] = useState(2);
  const [answers, setAnswers] = useState(['', '']);

  // Fetch groups and courses
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://67.205.170.103:8001/api/v1/main/group/');
        setGroups(response.data.results);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://67.205.170.103:8001/api/v1/main/course/');
        setCourses(response.data.results);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchGroups();
    fetchCourses();
  }, []);

  // Add Quiz
  const handleAddQuiz = async () => {
    if (quizTitle && selectedGroup && selectedCourse) {
      try {
        const quizData = {
          title: quizTitle,
          group: selectedGroup,
          course: selectedCourse,
          total_question_count: 0,
          duration: 0,
          required_score_to_pass: 0,
          chances: 0,
          slug: '',
          deadline: new Date().toISOString(), // Adjust as needed
          start: new Date().toISOString(),   // Adjust as needed
        };
        const response = await axios.post(
          'http://67.205.170.103:8001/api/v1/quiz/quiz/create/',
          quizData
        );
        setQuizId(response.data.id);
        alert('Quiz successfully created!');
        setActiveTab('add-question');
      } catch (error) {
        console.error('Error creating quiz:', error);
        alert('Failed to create quiz. Please try again.');
      }
    } else {
      alert('Please fill all the fields.');
    }
  };

  // Add Question
  const handleAddQuestion = async () => {
    if (question && answers.every(answer => answer.trim() !== '')) {
      try {
        const questionData = {
          title: question,
          technique: 0, // Example value
          is_active: true,
          structure: 1, // Example value
          answers: answers.map((answer, index) => ({
            title: answer,
            is_correct: index === 0, // First answer marked correct as an example
            description: '',
            structure: 1, // Example value
          })),
          quiz: quizId,
        };
        await axios.post('http://67.205.170.103:8001/api/v1/quiz/question/create/', questionData);
        alert('Question successfully added!');
        setQuestion('');
        setAnswers(Array(numAnswers).fill(''));
        setActiveTab('add-question');
      } catch (error) {
        console.error('Error adding question:', error);
        alert('Failed to add question. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 ${activeTab === 'add-quiz' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('add-quiz')}
        >
          Add Quiz
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === 'add-question' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('add-question')}
          disabled={!quizId}
        >
          Add Question
        </button>
      </div>

      {/* Add Quiz */}
      {activeTab === 'add-quiz' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Create a New Quiz</h2>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title"
            className="w-full p-2 mb-4 border rounded"
          />
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddQuiz}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Quiz
          </button>
        </div>
      )}

      {/* Add Question */}
      {activeTab === 'add-question' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Add a Question</h2>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            className="w-full p-2 mb-4 border rounded"
            rows={3}
          />
          <div className="mb-4">
            <label className="block mb-2">Number of Answers:</label>
            <input
              type="number"
              min={2}
              max={6}
              value={numAnswers}
              onChange={(e) => {
                const num = parseInt(e.target.value, 10);
                setNumAnswers(num);
                setAnswers(Array(num).fill(''));
              }}
              className="w-full p-2 border rounded"
            />
          </div>
          {answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              value={answer}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              }}
              placeholder={`Enter answer ${index + 1}`}
              className="w-full p-2 mb-4 border rounded"
            />
          ))}
          <button
            onClick={handleAddQuestion}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>
      )}
    </div>
  );
}
