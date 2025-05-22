import "./App.css";
import { Route, Routes } from "react-router";
import LoginPage from "./Page/LoginPage";
import SignupPage from "./Page/SignupPage";
import Dashboard from "./Page/Dashboard";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignupPage />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </div>
    </>
  );
}
export default App;
