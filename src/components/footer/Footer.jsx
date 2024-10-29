import Footer1 from "../../assets/footer1.png";
import "./footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_box flex justify-between">
        <div className="box1">
          <img src={Footer1} alt="" />
        </div>
        <div className="container mx-auto w-4/5 grid place-content-center text-white">
          <div className="footer_title  text-center pt-4 pb-4">
            <h1 className="text-4xl mt-2 mb-2">MARKAZ HAQIDA</h1>
            <span>
              <h2 className="mt-2 mb-2 text-xl">Manzil: Toshkent shahar,</h2>
              <h2 className="mt-2 mb-2  text-xl "> Shirin-ariq 49-uy</h2>
              <h2 className="mt-2 mb-2  text-xl">Tel: +998(91)283-77-01</h2>
            </span>
            <p className="mt-4 mb-4  w-[480px] ">
              Malaka oshirish, Kadrlar malakasini oshirish va ularni qayta
              tayyorlash (OʻzRda) — uzluksiz taʼlim tizimi turlaridan biri, xalq
              xoʻjaligining barcha sohasida ishlovchi mutaxassislar va rahbar
              xodimlarning kasbiy bilim va koʻnikmalarini yangilash hamda
              chuqurlashtirish jarayoni. Kadrlarning raqobatbardoshlik sifatlari
              hamda bilim va koʻnikmalarining zamon talablariga javob bera
              oladigan darajada boʻlishini taʼminlaydi. Malaka oshirish va qayta
              tayyorlash har bir xodimning oʻz mutaxassisligi boʻyicha soʻnggi
              fan yutuklari, yangiliklari bilan tanishish, ularni oʻzlashtirish,
              yangi amaliy ish usullari, ilgʻor ish tajribalarini oʻrganishdan
              iborat ilmiy nazariy hamda amaliy tayyorgarlik jarayoni
              hisoblanadi. 
            </p>
          </div>
        </div>
        <div className="box3">
          <img src={Footer1} alt="" />
        </div>
      </div>
    </footer>
  );
}
