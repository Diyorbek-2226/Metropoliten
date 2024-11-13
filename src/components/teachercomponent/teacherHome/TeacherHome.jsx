
import '../../../pages/homePage/homePage.css'
import darsxona from "../../../assets/darsxona.png"
import Footer from "../../footer/Footer"
import Fanlar from "../../fanlar/Fanlar"
import { TeacherMenu } from "../teacherMenu/TeacherMenu";

 const TeacherHome = () => {
  return (
    <>
      {/* Header */}
      <header className="fixed bg-white w-full shadow-md">
        <div className="Home container mx-auto px-4 sm:px-6 lg:px-8">
        <TeacherMenu/>
        </div>
      </header>

      {/* Main Section */}
      <main className="main bg-custom-gray pt-20">
        <div className="Main h-[500px] container mx-auto px-4 sm:px-6 lg:px-8 grid items-center">
          <div className="text-white text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
              Metropoliten kadrlarini tayyorlash ilmiy innovatsion
            </h1>
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
              markazi
            </h1>
          </div>
        </div>
      </main>

      {/* Information Section */}
      <section className="sections bg-custom-gray py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section_title flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-4 sm:space-y-0">
            {/* Left Side */}
            <div className="section_left w-full sm:w-1/2">
              <h1 className="text-xl sm:text-2xl font-semibold mt-2 mb-4">
                TRANSPORT SOHASIDA KADRLARNI QAYTA TAYYORLASH VA ULARNING MALAKASINI OSHIRISH HAMDA
                ILMIY VA INNOVATSION FAOLIYAT TIZIMINI TASHKIL ETISH CHORA-TADBIRLARI TO‘G‘RISIDA
              </h1>
              <h2 className="text-sm sm:text-base mt-2 mb-4 leading-relaxed">
                Mamlakatimizda transport va yo‘l xo‘jaligi sohasida xodimlarni tayyorlash,
                qayta tayyorlash, ularning malakasini oshirish tizimini tubdan isloh qilish
                maqsadida ilg‘or xorijiy tajribani qo‘llagan holda o‘quv jarayoniga yangi ta’lim
                uslublarini, zamonaviy axborot texnologiyalarini keng joriy etish borasida
                tizimli ishlar amalga oshirilmoqda.
              </h2>
              <h2 className="text-sm sm:text-base mt-2 mb-4 leading-relaxed">
                Shu bilan birga, bugungi kunda transport sohasida ta’lim oluvchilarga keng imkoniyatlar
                va qulay sharoitlar yaratish, soha kadrlarining bilim va ko‘nikmalarini oshirish,
                shuningdek, kadrlarni qayta tayyorlash hamda ularning malakasini oshirish jarayonlarini
                ishlab chiqarish bilan uzviy bog‘liq holda amalga oshirish talab etilmoqda.
              </h2>
            </div>
            
            {/* Right Side */}
            <div className="section_right w-full sm:w-1/2 mt-4 sm:mt-0">
              <img className="w-full h-auto" src={darsxona} alt="Darsxona" />
            </div>
          </div>
        </div>
      </section>

      {/* Fanlar and Footer Sections */}
      <Fanlar />
      <Footer />
    </>
  );
};

export default TeacherHome;