import { MenuBar } from "../../components/menubar/index"
import './homePage.css'
import darsxona from '../../assets/darsxona.png'



export const HomePage = () => {
  return (<>
    <header className="fixed bg-white w-full">
    <div className="Home container mx-auto w-4/5 ">
    <MenuBar/>
    </div>
    </header>
    <main className="main bg-custom-gray">
    <div className="Main h-[500px] container mx-auto w-4/5 grid items-center">
        <div className="text-white ">
           <h1 className="text-4xl">
           Metropoliten kadrlarini tayyorlash ilmiy innovatsion</h1> 
           <h1 className="text-4xl">
           markazi
           </h1>
        </div>
    </div>
</main>
<section className="sections  bg-custom-gray">
    <div className="container mx-auto w-4/5  ">
<div className="section_title flex items-center justify-between">
    <div className="section_left w-1/2">
        <h1 className="text-2xl mt-2 mb-2">
        TRANSPORT SOHASIDA KADRLARNI QAYTA 
         TAYYORLASH VA ULARNING MALAKASINI OSHIRISH HAMDA 
          ILMIY VA INNOVATSION FAOLIYAT TIZIMINI TASHKIL ETISH CHORA-TADBIRLARI
           TO‘G‘RISIDA
        </h1>
        <h2 className="mt-2 mb-2 ">
        Mamlakatimizda transport va yo‘l xo‘jaligi sohasida
         xodimlarni tayyorlash, qayta tayyorlash, ularning malakasini oshirish
          tizimini tubdan isloh qilish maqsadida ilg‘or xorijiy tajribani qo‘llagan
           holda o‘quv jarayoniga yangi ta’lim uslublarini, zamonaviy axborot texnologiyalarini
            keng joriy etish borasida tizimli ishlar amalga oshirilmoqda.
        </h2>
        <h2 className="mt-2 mb-2">
        Shu bilan birga, bugungi kunda transport sohasida ta’lim 
         oluvchilarga keng imkoniyatlar va qulay sharoitlar yaratish,
          soha kadrlarining bilim va ko‘nikmalarini oshirish, shuningdek,
           kadrlarni qayta tayyorlash hamda ularning malakasini oshirish jarayonlarini
            ishlab chiqarish bilan uzviy bog‘liq holda amalga oshirish talab etilmoqda.
        </h2>
    </div>
    <div className="section_right">
        <img className="w-full" src={darsxona} alt="" />
    </div>
</div>
    </div>
</section>


    </> )
}
