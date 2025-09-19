import { Bell, Menu, Search } from "lucide-react";


export default function HeaderLayout() {
    return (
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 p-6">
        <div className="flex items-center justify-between">
          <button
           
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-sm"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 lg:flex-none text-center lg:text-right">
            <h2 className="text-3xl font-black text-gray-900 bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text t">
       پنل مدیریت   
            </h2>
            <p className="text-gray-500 mt-1 font-medium">مدیریت فروشگاه پوشینو</p>
          </div>

          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <button className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105">
              <Search className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

    )
}