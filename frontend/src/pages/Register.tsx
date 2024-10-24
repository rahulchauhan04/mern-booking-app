import { useForm } from "react-hook-form";

type RegisterFormData = {
     firstName: string;
     lastName: string;
     email: string;
     password: string;
     confirmPassword: string;
}

const Register = () => {

     const { register, watch } = useForm<RegisterFormData>();

     return (
          <form className="flex flex-col gap-5">
               <h2 className="text-3xl font-bold">Create an Account</h2>
               <div className="flex flex-col md:flex-row gap-5">
                    <label className="text-gray-700 text-sm font-bold flex-1">
                         First Name
                         <input
                              className="border w-full rounded py-1 px-2 font-normal"
                              {...register("firstName", { required: "This field is required" })} />
                    </label>
                    <label className="text-gray-700 text-sm font-bold flex-1">
                         Last Name
                         <input
                              className="border w-full rounded py-1 px-2 font-normal"
                              {...register("lastName", { required: "This field is required" })} />
                    </label>
               </div>
               <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input
                         type="email"
                         className="border w-full rounded py-1 px-2 font-normal"
                         {...register("email", { required: "This field is required" })} />
               </label>
               <label className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input
                         type="password"
                         className="border w-full rounded py-1 px-2 font-normal"
                         {...register("password", {
                              required: "This field is required",
                              minLength: {
                                   value: 6,
                                   message: "Password must be at least 6 characters"
                              },
                         })} />
               </label>
               <label className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input
                         type="password"
                         className="border w-full rounded py-1 px-2 font-normal"
                         {...register("confirmPassword", {
                              validate: (val) => {
                                   if (!val) {
                                        return "This field is required"
                                   } else if (watch("password") !== val) {
                                        return "Your Passwords do not match";
                                   }
                              }
                         })} />
               </label>
          </form>
     );
};

export default Register;
