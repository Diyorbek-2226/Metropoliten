import Footer1 from "../../assets/footer1.png";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-gray-800 text-white py-6">
      <div className="footer_box flex flex-col sm:flex-row items-center sm:justify-between space-y-6 sm:space-y-0 px-4 sm:px-0">
        
        {/* Left Image */}
        <div className="box1 w-full sm:w-auto flex justify-center sm:justify-start">
          <img src={Footer1} alt="" className="w-32 sm:w-auto" />
        </div>
        
        {/* Center Text Section */}
        <div className="container mx-auto w-full sm:w-4/5 text-center sm:text-left">
          <div className="footer_title pt-4 pb-4">
            <h1 className="text-2xl sm:text-4xl mt-2 mb-4">MARKAZ HAQIDA</h1>
            <div className="text-lg sm:text-xl space-y-2">
              <h2>Manzil: Toshkent shahar, Shirin-ariq 49-uy</h2>
              <h2>Tel: +998(91)283-77-01</h2>
            </div>
            <p className="mt-4 mb-4 text-sm sm:text-base leading-relaxed max-w-md mx-auto sm:mx-0">
              Malaka oshirish, Kadrlar malakasini oshirish va ularni qayta
              tayyorlash (OʻzRda) — uzluksiz taʼlim tizimi turlaridan biri,
              xalq xoʻjaligining barcha sohasida ishlovchi mutaxassislar va
              rahbar xodimlarning kasbiy bilim va koʻnikmalarini yangilash
              hamda chuqurlashtirish jarayoni. Kadrlarning raqobatbardoshlik
              sifatlari hamda bilim va koʻnikmalarining zamon talablariga
              javob bera oladigan darajada boʻlishini taʼminlaydi. Malaka
              oshirish va qayta tayyorlash har bir xodimning oʻz mutaxassisligi
              boʻyicha soʻnggi fan yutuklari, yangiliklari bilan tanishish,
              ularni oʻzlashtirish, yangi amaliy ish usullari, ilgʻor ish
              tajribalarini oʻrganishdan iborat ilmiy nazariy hamda amaliy
              tayyorgarlik jarayoni hisoblanadi.
            </p>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="box3 w-full sm:w-auto flex justify-center sm:justify-end">
          <img src={Footer1} alt="" className="w-32 sm:w-auto" />
        </div>
      </div>
    </footer>
  );
}
