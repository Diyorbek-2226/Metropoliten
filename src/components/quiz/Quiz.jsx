import BackButton from '../BackButton/BackButton';
import '../person/person.css';

function Quiz() {
  return (
    <div className="person p-4 bg-blue-50 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between w-full max-w-3xl mb-4 items-center space-y-2 sm:space-y-0">
        <BackButton to={'/metro/testtable/'} title={"Ortga qaytish"} />
        <BackButton to={'/metro'} title={"Bosh sahifaga O'tish"} />
        <div className="text-gray-600 font-semibold sm:ml-auto">00:00:00</div>
      </div>

      {/* Quiz Container */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden p-4 h-[500px] overflow-y-auto">
        {/* Example Question Block */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-6">
            <p className="font-medium text-gray-800 mb-2">
              {index + 1}. Bolalarda silni aniqlashning asosiy usullari
            </p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name={`question-${index}`} className="mr-2" />
                <span className="text-gray-700">yoppeasiya tuberkulindinogmetika</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name={`question-${index}`} className="mr-2" />
                <span className="text-gray-700">xaf guruhini silga tekshirish</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name={`question-${index}`} className="mr-2" />
                <span className="text-gray-700">röntgen orqali tekshirish</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name={`question-${index}`} className="mr-2" />
                <span className="text-gray-700">flyuorografiya</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Finish Button */}
      <div className="w-full max-w-3xl mt-4">
        <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Testni yakunlash
        </button>
      </div>
    </div>
  );
}

export default Quiz;
