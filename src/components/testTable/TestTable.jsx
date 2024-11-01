import BackButton from '../BackButton/BackButton';
import '../person/person.css';

function TestTable() {
  return (
    <div className="person p-4 bg-blue-50 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between w-full max-w-3xl mb-4 space-y-2 sm:space-y-0 sm:items-center">
        <BackButton to={'/metro/testtable/quiz'} title={"Yakuniy test"}/>
       <BackButton title={"Bosh sahifaga qaytish"} to={'/metro'}/>
      </div>

      {/* Responsive Table */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-auto border-collapse hidden sm:table">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-2 text-left text-gray-700 font-medium">Test nomi</th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium">Boshlanish sanasi</th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium">Tugash sanasi</th>
              <th className="px-4 py-2 text-left text-gray-700 font-medium">To'plangan bal</th>
              <th className="px-4 py-2 text-right text-gray-700 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 text-gray-700">Yakuniy test</td>
              <td className="px-4 py-2 text-gray-700">02.05.2024</td>
              <td className="px-4 py-2 text-gray-700">02.05.2024</td>
              <td className="px-4 py-2 text-gray-700">__/40</td>
              <td className="px-4 py-2 text-right text-gray-700">⋮</td>
            </tr>
          </tbody>
        </table>

        {/* Responsive Cards for Small Screens */}
        <div className="sm:hidden">
          <div className="border rounded-lg p-4 mb-2 bg-blue-50">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Test nomi:</span>
              <span className="text-gray-700">Yakuniy test</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Boshlanish sanasi:</span>
              <span className="text-gray-700">02.05.2024</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Tugash sanasi:</span>
              <span className="text-gray-700">02.05.2024</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">To'plangan bal:</span>
              <span className="text-gray-700">__/40</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestTable;
