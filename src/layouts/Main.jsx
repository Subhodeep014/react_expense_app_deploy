import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import wave from "../assets/wave.svg"

const Main = ()=>{
    return(
        <div className="layout">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <img src={wave} alt="" />
        </div>
    )
}
export default Main;