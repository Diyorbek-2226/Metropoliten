import './login.css';   

export default function Login() {  
  return (  
    <header className="h-screen bg-gradient-to-r from-blue-500 to-blue-700">  
      <div className="container w-full grid place-items-center h-full">  
        <form className="Form-submit rounded-[40px] text-white font-mono w-[580px] bg-opacity-80 ">  
          <div className=''>  
            <div>  
              <h6 className="font-bold text-sm mt-2 mb-2">Your logo</h6>  
              <h2 className="text-2xl font-bold mb-2 mt-2">Login</h2>  
            </div>  
            <div className="mt-4 ">  
              <label className="block mt-1 mb-1" htmlFor="username">Login</label>  
              <input className="focus:bg-slate-600 block w-full p-2 rounded" id="username" placeholder="F.I.SH" type="text" />  
            </div>  
            <div className="mt-4">  
              <label className="block mt-1 mb-1" htmlFor="password">Parol</label>  
              <input className="focus:bg-slate-600 block w-full p-2 rounded" id="password" placeholder="Password" type="password" />  
              <small className="block mt-2 mb-2">Forgot password?</small>  
            </div>  
            <div className="mt-6">  
              <button className="w-full bg-slate-500 p-2 rounded hover:bg-slate-600 transition" type="submit">  
                Kirish   
              </button>  
              <p className='mt-8 mb-2 text-center cursor-pointer'>or continue with</p>  
            </div>  
            <div className="mt-8 text-center w-full">  
              <small className="">Don't have an account yet? <a href="#" className="text-blue-300">Register for free</a></small>  
            </div>   
          </div>   
        </form>  
      </div>  
    </header>  
  );  
}