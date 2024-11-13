import useFetchData from "../../../hook/useFetch/UseFetch";
import BackButton from "../../BackButton/BackButton";


const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const TeacherList = () => {  
  const { data, error, loading } = useFetchData('main/teacher-list/');

  const teacherList = data?.results || [];  

  if (loading) {  
    return <Spinner />;  // Display spinner while loading
  }  

  if (error) {  
    return <div>Error: {error.message}</div>;  
  }  

  // Sort the teacher list by fullname
  const sortedTeachers = [...teacherList].sort((a, b) => a.fullname.localeCompare(b.fullname));  

  return (  
    <div className="container mx-auto p-4">  
      <BackButton to={'/student'} title={`Bosh sahifaga ${"o'tish"} `}/> 
      
      <div className="overflow-x-auto"> {/* Allows scrolling horizontally on small screens */}
        <table className="min-w-full bg-white border border-gray-200">  
          <thead>  
            <tr className="bg-gray-100">  
              <th className="py-2 px-4 border-b text-left">To'liq Ism</th>  
              <th className="py-2 px-4 border-b text-left">Tug'ilgan sana</th>  
              <th className="py-2 px-4 border-b text-left">Manzil</th>  
              <th className="py-2 px-4 border-b text-left">Ish joyi</th>  
              <th className="py-2 px-4 border-b text-left">Sohasi</th>  
            </tr>  
          </thead>  
          <tbody>  
            {sortedTeachers.map((item) => (  
              <tr key={item.id}>  
                <td className="py-2 px-4 border-b">{item.fullname}</td>  
                <td className="py-2 px-4 border-b">
                  {item.birthday ? new Date(item.birthday).toLocaleDateString() : 'N/A'}
                </td>  
                <td className="py-2 px-4 border-b">{item.adress || 'N/A'}</td>  
                <td className="py-2 px-4 border-b">{item.work_place || 'N/A'}</td>  
                <td className="py-2 px-4 border-b">{item.expertise || 'N/A'}</td>
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>
    </div>  
  );  
};  

export default TeacherList;
