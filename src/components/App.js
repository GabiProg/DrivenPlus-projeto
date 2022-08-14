import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import TelaCadastro from "../components/TelaCadastro";
import TelaLogin from "../components/TelaLogin";
import TelaPlanos from "../components/TelaPlanos";
import TelaPlano from "../components/TelaPlano";
import TelaHome from "../components/TelaHome";
import "../assets/Reset.css";

export default function App(){
    const [token, setToken] = useState();
    const [nomeImpresso, setNomeImpresso] = useState();
    const [plano, setPlano] = useState();
    const [dados, setDados] = useState();
    
    return(
    <>
    <UserContext.Provider value={{token, setToken, nomeImpresso, setNomeImpresso,
    plano, setPlano, dados, setDados}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaLogin/>}/>
                <Route path="/sign-up" element={<TelaCadastro/>}/>
                <Route path="/subscriptions" element={<TelaPlanos/>}/>
                <Route path="/subscriptions/:ID_DO_PLANO" element={<TelaPlano/>}/>
                <Route path="/home" element={<TelaHome/>}/>
            </Routes>
        </BrowserRouter>
    </UserContext.Provider>
    </>
    );
}