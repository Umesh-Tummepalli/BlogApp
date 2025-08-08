import React from "react";
import WriteBlog from "./components/WriteBlog";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routing";
import { ToastContainer ,Bounce } from "react-toastify";
const App = () => {
  return (
    <div className="font-['Poppins', sans-serif] w-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
};

export default App;
