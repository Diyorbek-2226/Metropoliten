import { useState } from 'react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } bg-blue-900 text-white flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden md:w-64`}
      >
        <div className="flex flex-col h-full p-4 space-y-4">
          <h2 className="text-lg font-bold mb-6">Menu</h2>
          <nav>
            <ul className="space-y-4">
              <li><a href="#" className="block hover:text-blue-300">Fan topshiriqlari</a></li>
              <li><a href="#" className="block hover:text-blue-300">Yakunlash</a></li>
              <li><a href="#" className="block hover:text-blue-300">Natijalar</a></li>
              <li><a href="#" className="block hover:text-blue-300">Darslar</a></li>
              <li><a href="#" className="block hover:text-blue-300">Qatnashuv</a></li>
              <li><a href="#" className="block hover:text-blue-300">Test savollari</a></li>
              <li><a href="#" className="block hover:text-blue-300">Tugallangan</a></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-md">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 p-2 focus:outline-none md:hidden"
            >
              <span className="material-icons">
                {isSidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>
            <img
              src="https://via.placeholder.com/30"
              alt="User Icon"
              className="rounded-full h-8 w-8 mr-2"
            />
            <h1 className="text-xl font-semibold">Fan topshiriqlari</h1>
          </div>
        </header>
        <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p>This is the main content area.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
