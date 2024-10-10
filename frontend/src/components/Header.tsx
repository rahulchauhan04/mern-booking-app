import { Link } from "react-router-dom"

const Header = () => {
     return (
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-6 shadow-lg">
               <div className="container mx-auto flex justify-between items-center">
                    <span className="text-3xl text-white font-bold tracking-tight">
                         <Link to={"/"}>BookHolidays.com</Link>
                    </span>
                    <span className="text-white font-bold tracking-tight flex gap-4">
                         <Link
                              to={"/sign-in"}
                              className="cursor-pointer bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                         >
                              Sign In
                         </Link>
                    </span>
               </div>
          </div>
     )
}

export default Header;