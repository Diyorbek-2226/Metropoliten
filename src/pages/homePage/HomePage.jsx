import {MenuBar} from '../../components/menubar/index'
import "./homePage.css";
import darsxona from "../../assets/darsxona.png";
import Footer from "../../components/footer/Footer";
import Fanlar from "../../components/fanlar/Fanlar";


const HomePage = () => {
  return (
    <>
      {/* Header */}
      <header className="fixed bg-white w-full shadow-md z-10">
        <div className="Home container mx-auto px-4 sm:px-6 lg:px-8">
          <MenuBar/>
        </div>
      </header>

      {/* Main Section */}
      <main className="main bg-custom-gray pt-20 md:pt-24 lg:pt-28">
        <div className="Main min-h-[500px] container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white text-center sm:text-left w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Metropoliten kadrlarini tayyorlash ilmiy innovatsion markazi
            </h1>
          </div>
        </div>
      </main>

      {/* Information Section */}
      <section className="sections bg-custom-gray py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section_title flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Left Side */}
            <div className="section_left w-full lg:w-1/2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-2 mb-4">
                TRANSPORT SOHASIDA KADRLARNI QAYTA TAYYORLASH VA ULARNING MALAKASINI OSHIRISH HAMDA
                ILMIY VA INNOVATSION FAOLIYAT TIZIMINI TASHKIL ETISH CHORA-TADBIRLARI TO'G'RISIDA
              </h1>
              <h2 className="text-sm sm:text-base md:text-lg mt-2 mb-4 leading-relaxed">
                Mamlakatimizda transport va yo'l xo'jaligi sohasida xodimlarni tayyorlash,
                qayta tayyorlash, ularning malakasini oshirish tizimini tubdan isloh qilish
                maqsadida ilg'or xorijiy tajribani qo'llagan holda o'quv jarayoniga yangi ta'lim
                uslublarini, zamonaviy axborot texnologiyalarini keng joriy etish borasida
                tizimli ishlar amalga oshirilmoqda.
              </h2>
              <h2 className="text-sm sm:text-base md:text-lg mt-2 mb-4 leading-relaxed">
                Shu bilan birga, bugungi kunda transport sohasida ta'lim oluvchilarga keng imkoniyatlar
                va qulay sharoitlar yaratish, soha kadrlarining bilim va ko'nikmalarini oshirish,
                shuningdek, kadrlarni qayta tayyorlash hamda ularning malakasini oshirish jarayonlarini
                ishlab chiqarish bilan uzviy bog'liq holda amalga oshirish talab etilmoqda.
              </h2>
            </div>
            
            {/* Right Side */}
            <div className="section_right w-full lg:w-1/2 mt-4 lg:mt-0">
              <img className="w-full h-auto rounded-lg shadow-md" src={darsxona} alt="Darsxona" />
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

export default HomePage;