import { BrowserRouter } from "react-router-dom";
import "./Layout.css";
import 'react-toastify/dist/ReactToastify.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routing from "../Routing/Routing";
import Navbar from "../Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import AdminNavBar from "../Navbar/AdminNavBar/AdminNavBar";
import CompanyNavBar from "../Navbar/CompanyNavBar/CompanyNavBar";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/OurStore";
import CustomerNavBar from "../Navbar/CustomerNavBar/CustomerNavBar";

function Layout(): JSX.Element {
    
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const updateRole = () => {
            const role = authStore.getState().user?.role || null;
            setUserRole(role);
        };

        updateRole(); // Initial call to set the initial role

        const unsubscribe = authStore.subscribe(updateRole);

        return () => {
            unsubscribe();
        };
    }, []);
    
    return (
        <div className="Layout">
            <BrowserRouter>
                <header>
                    <Header />
                </header>
                <nav>
                    
                     
                   
            {userRole === "administrator" && <AdminNavBar />}
            {userRole === "company" && <CompanyNavBar />}
            {userRole === "customer" && <CustomerNavBar />}
            {(!userRole || (userRole !== "administrator" && userRole !== "company" && userRole !== "customer")) && <Navbar />}
            
                </nav>
                <main>
                    <Routing />
                </main>
                <footer>
                    <Footer />
                </footer>

                <ToastContainer />
            </BrowserRouter>
            
        </div>
    );
}

export default Layout;
