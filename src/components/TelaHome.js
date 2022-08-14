import styled from "styled-components";
import Imagem from "../assets/Group 1.png";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import {Link} from "react-router-dom";

export default function TelaHome(){
    const {nomeImpresso, plano, dados} = useContext(UserContext);
    console.log(dados);

    function ListarBeneficios({title, link}){
        return(
            <>
                <Beneficios><a href={`${link}`}>{title}</a></Beneficios>
            </>
        );
    }

    return(
    <Conteiner>
        <Topo>
            <img src={plano?.image} alt="Imagem do Logo"/>
            <ion-icon name="person-circle-outline"></ion-icon>
        </Topo>
        <Nome>Olá, {nomeImpresso}</Nome>
        <Listar>
            {plano?.perks.map((item) => <ListarBeneficios key={item.id} id={item.id} member={item.membershipId} title={item.title} link={item.link}/>)}
        </Listar>
        <Botoes>
            <Trocar>Mudar plano</Trocar>
            <Cancelar>Cancelar plano</Cancelar>
        </Botoes>
    </Conteiner>);
}

const Conteiner = styled.div`
    width: 375px;
    height: 667px;
    background: #0E0E13;
    position: relative;
`;

const Topo = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12.2px;

    img{
        height: 50px;
        width: 74px;
        margin-top: 32px;
        margin-left: 38px;
    }
    
    ion-icon{
        font-size: 34px;
        color: #FFFFFF;
        margin-top: 22px;
        margin-right: 22px;
    }
`;

const Nome = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
    margin-left: 130px;
    margin-bottom: 53px;
`;

const Listar = styled.div`
    width: 100%;
    height: auto;
`;

const Beneficios = styled.div`
    width: 299px;
    height: 52px;
    background: #FF4791;
    border-radius: 8px;
    margin: 0 38px 8px 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;

    a{
        text-decoration: none;
    }
`;

const Botoes = styled.div`
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    bottom: 0;
`;

const Trocar = styled.div`
    width: 299px;
    height: 52px;
    background: #FF4791;
    border-radius: 8px;
    margin-left: 37px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
`;

const Cancelar = styled.div`
    width: 299px;
    height: 52px;
    background: #FF4747;
    border-radius: 8px;
    margin-left: 37px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
`;