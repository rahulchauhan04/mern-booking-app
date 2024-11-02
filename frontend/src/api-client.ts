import { RegisterFormData } from "./pages/Register";

// Base URL for the API, retrieved from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// Registers a new user with the provided form data.

export const register = async (formData: RegisterFormData) => {
     // Sending a POST request to the register endpoint with the form data
     const response = await fetch(`${API_BASE_URL}/api/users/register`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
     });

     // Parsing the response body as JSON
     const responseBody = await response.json();

     // If the response is not ok, throw an error with the message from the response
     if (!response.ok) {
          throw new Error(responseBody.message);
     }
}