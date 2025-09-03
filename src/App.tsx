import Sidebar from './components/Sidebar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
      </div>
    </BrowserRouter>
  );
}

export default App;
