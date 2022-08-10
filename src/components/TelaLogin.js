import styled from "styled-components";
import IMG from "../assets/Driven_white 1.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default function TelaLogin(){
const {token, setToken} = useContext(UserContext);
const navigate = useNavigate();

const [email, setEmail] = useState();
const [senha, setSenha] = useState();

function Logar(e){
    e.preventDefault();

    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/auth/login`;

    const body = {
        email: email,
        password: senha
    };

    const promise = axios.post(URL, body);
    promise.then((res) => {
        const {data} = res;
        setToken(data.token);
        console.log(data);
        console.log(data.token);
        navigate("/subscriptions");
    });
    promise.catch((err) => {
        alert("Falha ao fazer Login.");
    });
}

    return(
    <Conteiner>
        <img src={IMG} alt="Logo do Driven Plus"/>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
        <button onClick={Logar}>ENTRAR</button>
        <Link to="/sign-up">
        <div>Não possuí uma conta? Cadastre-se</div>
        </Link>
    </Conteiner>
    );
}

const Conteiner = styled.div`
    width: 375px;
    height: 667px;
    background: #0E0E13;

    img{
        margin: 144px  38px 94px 38px;
    }

    input{
        height: 52px;
        width: 299px;
        background: #FFFFFF;
        border-radius: 8px;
        margin: 0 38px 24px 38px;
    }

    button{
        width: 298px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
        margin: 0 30px 24px 41.5px; 
    }

    div{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: underline;
        color: #FFFFFF;
        margin: 0 75px 0 74px;
    }
`;

