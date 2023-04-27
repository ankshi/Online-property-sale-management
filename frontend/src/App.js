import './App.css';
import Nav from './nav.js';
import Ownerlogin from './ownerlogin.js';
import Ownerhome from './ownerhome.js';
import Customerlogin from './customerlogin.js';
import Chome from './chome.js';
import Csignup from './csignup.js';
import Osignup from './osignup.js';
import Bookreq from './cbookreq.js';
import Oinfo from './oinfo.js';
import Oprop from './oprop.js';
import Obookreq from './obookreq.js';
import Addprop from './addproperties.js';
import Cinfo from './cinfo.js';
import Sprop from './csavedprop.js';
import Cdeals from './cdeals.js';
import Searchfilter from "./searchfilter.js";
import Privatecomponento from './privatecomponento.js';
import Privatecomponentc from './privatecomponentc.js';
import Pcloginowner from './loginpcowner.js';
import Pclogincus from './loginpccus.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
        return (
        <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Nav />}></Route>
                        <Route element={<Pcloginowner />}>
                            <Route path="/ologin/" element={<Ownerlogin />}></Route>
                            <Route path="/osignup/" element={<Osignup />}></Route>
                        </Route>
                        <Route element={<Pclogincus />}>
                            <Route path="/clogin/" element={<Customerlogin />}></Route>
                            <Route path="/csignup/" element={<Csignup />}></Route>
                        </Route>
                        <Route element={<Privatecomponento />}>
                            <Route path="/ohome/" element={<Ownerhome />}>
                                <Route path="oinfo" element={<Oinfo />}></Route>
                                <Route path="deals" element={<Oprop />}></Route>
                                <Route path="addprop" element={<Addprop />}></Route>
                                <Route path="bookreq" element={<Obookreq />}></Route>
                            </Route>
                        </Route>
                        <Route element={<Privatecomponentc />}>
                            <Route path="/chome" element={<Chome />}>
                                <Route path="sfoptions" element={<Searchfilter /> }></Route>
                                <Route path="cinfo" element={<Cinfo />}></Route>
                                <Route path="deals" element={<Cdeals />}></Route>
                                <Route path="savedprop" element={<Sprop />}></Route>
                                <Route path="bookedprop" element={<Bookreq />}></Route>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        );
}

export default App;
