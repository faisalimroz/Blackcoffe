
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routes';

function App() {
  return (
    <div className="App max-w-[1440] mx-auto">
       <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
