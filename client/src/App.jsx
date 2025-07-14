import { Routes, Route } from "react-router-dom";

import Forms from "./Components/Forms";
import RoomPage from "./Pages/RoomPage";


function App() {
  
  return (
    <div className="flex justify-center ml-5">
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/:roomId" element={<RoomPage />} ></Route>
      </Routes>

    </div>
  );
}

export default App;
