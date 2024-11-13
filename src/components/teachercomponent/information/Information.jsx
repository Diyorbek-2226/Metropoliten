import './information.css'
import useFetchData from '../../../hook/useFetch/UseFetch'
import BackButton from '../../BackButton/BackButton';

export default function Information() {
    const userId = localStorage.getItem('id');
    const { data: user, error, loading } = useFetchData(`main/teacher/${userId}`);

    return (
        <header className="teacher p-4 sm:p-6 h-[140vh]">  
            <div className="container mx-auto max-w-xl">  
                <div className="flex items-center justify-between mb-4">  
                    <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">Shaxsiy Ma'lumotlar</h2>  
                    <BackButton title={"Bosh sahifa"} to={'/teacher'} />  
                </div>  

                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">  
                    {loading ? (  
                        <p className="text-center text-gray-600">Yuklanmoqda...</p>  
                    ) : error ? (  
                        <p className="text-center text-red-600">Xatolik: {error.message}</p>  
                    ) : user ? (  
                        <>  
                            <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">  
                                <div className="space-y-3 w-full">
                                    <img src={user.avatar} alt="User Avatar" className="rounded-full w-10 h-10 sm:w-28 sm:h-28 object-cover border-2 border-blue-300 shadow-md" />  
                                    <InfoRow title="F. I. SH" value={user.fullname || 'Ma\'lumot yo\'q'} />  
                                    <InfoRow title="Tug'ilgan kun" value={user.birthday || 'Ma\'lumot yo\'q'} />  
                                    <InfoRow title="Jinsi" value={user.gender || 'Ma\'lumot yo\'q'} />  
                                    <InfoRow title="Manzil" value={user.adress || 'Ma\'lumot yo\'q'} /> 
                                    <InfoRow title="Mutaxassislik" value={user.expertise || 'Ma\'lumot yo\'q'} />
                                    <InfoRow title="Tug'ilgan joy" value={user.place_of_birth || 'Ma\'lumot yo\'q'} />
                                    <InfoRow title="Ish joyi" value={user.work_place || 'Ma\'lumot yo\'q'} />
                                    <InfoRow title="Passport" value={user.user?.passport || 'Ma\'lumot yo\'q'} />
                                    <InfoRow title="JSHSHR" value={user.user?.jshshr || 'Ma\'lumot yo\'q'} />
                                    {user.group && (
                                        <>
                                            <InfoRow title="Guruh Nomi" value={user.group.name || 'Ma\'lumot yo\'q'} />
                                            <InfoRow title="Guruh O'qish Davri" value={user.group.study_period || 'Ma\'lumot yo\'q'} />
                                            <InfoRow title="Mashg'ulot Soati" value={user.group.training_hour || 'Ma\'lumot yo\'q'} />
                                        </>
                                    )}
                                </div>
                            </div> 
                        </>  
                    ) : (  
                        <p className="text-center text-gray-600">Ma'lumot topilmadi.</p>  
                    )}  
                </div>  
            </div>  
        </header>  
    )
}

const InfoRow = ({ title, value }) => (  
    <div className="flex justify-between bg-gray-50 p-2 rounded-md shadow-sm text-sm sm:text-base">  
        <span className="font-medium text-gray-600">{title}:</span>  
        <span className="text-gray-800">{value}</span>  
    </div>  
);  
