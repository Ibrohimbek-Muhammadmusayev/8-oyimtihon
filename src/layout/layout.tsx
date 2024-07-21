import { Outlet } from "react-router-dom";

import Navbar from "../companents/navbar";
import Footer from "../companents/footer";

export default function Layout() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.replace("/login");
    } else {
        return (
            <div className="flex h-[100vh] flex-col justify-between">
                <div className="">
                    <header className="w-full">
                        <Navbar/>
                    </header>
                    <main className="w-full">
                        <div className="max-w-[1440px] px-[10px] mx-auto">
                            <Outlet/>
                        </div>
                    </main>
                </div>
                <footer className="w-full">
                    <Footer/>
                </footer>
            </div>
        )
    }
}