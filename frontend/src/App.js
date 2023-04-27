import './App.css';
import Nav from './nav.js';
import Ownerlogin from './ownerlogin.js';
import Ownerhome from './ownerhome.js';
import Customerlogin from './customerlogin.js';
import Searchfilter from './searchfilter.js';
import Csignup from './csignup.js';
import Osignup from './osignup.js';
import Oinfo from './oinfo.js';
import Oprop from './oprop.js';
import Osprop from './osprop.js';
import Obookreq from './obookreq.js';
import Addprop from './addproperties.js';
import Cinfo from './cinfo.js';
import Sprop from './csavedprop.js';
import Privatecomponento from './privatecomponento.js';
import Privatecomponentc from './privatecomponentc.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
        return (
        <div className="App">
                <BrowserRouter>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Searchfilter />}></Route>
                        <Route path="/ownerlogin/" element={<Ownerlogin />}></Route>
                        <Route path="/customerlogin/" element={<Customerlogin />}></Route>
                        <Route path="/csignup/" element={<Csignup />}></Route>
                        <Route path="/osignup/" element={<Osignup />}></Route>
                        <Route element={<Privatecomponento />}>
                            <Route path="/ownerhome/" element={<Ownerhome />} >
                                <Route path="info" element={<Oinfo />}></Route>
                                <Route path="prop" element={<Oprop />}></Route>
                                <Route path="sprop" element={<Osprop />}></Route>
                                <Route path="addprop" element={<Addprop />}></Route>
                                <Route path="lbookreq" element={<Obookreq />}></Route>
                            </Route>
                        </Route>
                        <Route element={<Privatecomponentc />}>
                            <Route path="/cid" element={<Cinfo />}></Route>
                            <Route path="/savedprop" element={<Sprop />}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        );
}

export default App;
