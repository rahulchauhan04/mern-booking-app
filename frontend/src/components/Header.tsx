import { Link } from "react-router-dom"

const Header = () => {
     return (
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-6 shadow-lg">
               <div className="container mx-auto flex justify-between items-center px-4">
                    <span className="text-3xl text-white font-bold tracking-tight">
                         <Link to={"/"}>BookHolidays.com</Link>
                    </span>
                    <span className="flex space-x-4">
                         <Link
                              to={"/sign-in"}
                              className="flex bg-white items-center text-blue-600 px-4 py-2 font-bold rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                         >
                              Sign In
                         </Link>
                    </span>
               </div>
          </div>
     )
}

export default Header;