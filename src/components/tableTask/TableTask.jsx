import BackButton from "../BackButton/BackButton";

function TableTask() {  
    const data = [  
      {  
        fan: "Управление инновациями и проектами",  
        guruh: "202-19",  
        mashgulot: "Laboratoriya",  
        topshiriq: 4,  
      },  
      {  
        fan: "Анализ и проектирование алгоритмов",  
        guruh: "202-19",  
        mashgulot: "Ma'ruza",  
        topshiriq: 1,  
      },  
      {  
        fan: "Анализ и проектирование алгоритмов",  
        guruh: "202-19",  
        mashgulot: "Ma'ruza",  
        topshiriq: 1,  
      },  
      {  
        fan: "Анализ и проектирование алгоритмов",  
        guruh: "202-19",  
        mashgulot: "Laboratoriya",  
        topshiriq: 2,  
      },  
      {  
        fan: "Управление инновациями и проектами",  
        guruh: "202-19",  
        mashgulot: "Laboratoriya",  
        topshiriq: 1,  
      },  
    ];  
  
    return (  
      <div className="flex flex-col items-center mt-10">  
       <BackButton  title={"Fan topshiriqlari"}/>
        <BackButton to={'/metro'} title={' Bosh sahifaga qaytish  '}/>
        <div className="overflow-x-auto w-full">  
          <table className="min-w-full bg-white border border-gray-200">  
            <thead>  
              <tr>  
                <th className="py-2 px-4 border-b font-semibold text-gray-600">Fanlar</th>  
                <th className="py-2 px-4 border-b font-semibold text-gray-600">Guruh</th>  
                <th className="py-2 px-4 border-b font-semibold text-gray-600">Mashg‘ulotlar</th>  
                <th className="py-2 px-4 border-b font-semibold text-gray-600">Topshiriqlar</th>  
              </tr>  
            </thead>  
            <tbody>  
              {data.map((item, index) => (  
                <tr key={index} className="text-center">  
                  <td className="py-2 px-4 border-b">{item.fan}</td>  
                  <td className="py-2 px-4 border-b">{item.guruh}</td>  
                  <td className="py-2 px-4 border-b">{item.mashgulot}</td>  
                  <td className="py-2 px-4 border-b">  
                    <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded">  
                      {item.topshiriq}  
                    </button>  
                  </td>  
                </tr>  
              ))}  
            </tbody>  
          </table>  
        </div>  
      </div>  
    );  
  }  
  
  export default TableTask;