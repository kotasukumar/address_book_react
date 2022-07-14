import { Router, Routes, Route } from "react-router-dom";
import Form from './Components/Address-Book-Form/AddressBookForm';
import Home from './Components/Address-Book-Home/AddressBookHome';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header/>

          <Routes>
            <Route path="/home" element={ <Home/>} />
            <Route path="/form" element={ <Form/>} />
            <Route exact path="/AddressBookForm/:id" element={ <Form/>} />
          </Routes>
       
    </div>
  );
}

export default App;
