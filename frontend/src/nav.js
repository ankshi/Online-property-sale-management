import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Nav = () => {
    const authowner = localStorage.getItem("owner");
    const authcus = localStorage.getItem("customer");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            {authowner ?
                <div></div>
                :
                <div>
                {authcus ?
                    <div>
                        <ul className="home">
                            <li className="home"><Link to="/" className="link">Home</Link></li>
                            <li className="home"><Link to="/cid" className="link">CustomerInfo</Link></li>
                            <li className="home"><Link to="/savedprop" className="link">SavedProperties</Link></li>
                            <li className="home"><Link onClick={logout} to="/" className="link">Logout</Link></li>
                        </ul>
                    </div>
                    :
                    <div className="login">
                          <ul className="home">
                            <li className="home"><Link to="/" className="link">Home</Link></li>
                            <li className="home"><Link to="/ownerlogin/" className="link">Login as owner</Link></li>
                            <li className="home"><Link to="/customerlogin/" className="link">I'm a customer</Link></li>
                        </ul>
                    </div>
                }
                </div>
            }
        </div>
    );
};




export default Nav;
