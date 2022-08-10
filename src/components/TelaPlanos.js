import styled from "styled-components";
import { useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

function TelaPlanosItens({image, price, id}){
    return(
        <Link to={`/subscriptions/${id}`}>
            <PlanosCards>
                <img src={image} alt="Foto do plano selecionado"/>
                <p>{price}</p>
            </PlanosCards>
        </Link>
    );
}

export default function TelaPlanos(){
    const {token, planos, setPlanos} = useContext(UserContext);

    useEffect(() => {

        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships`

        const config = {
            headers: {
              "Authorization": `Bearer ${token}`,
            }
        }

        const promise = axios.get(URL, config);
        promise.then((res) => {
            const {data} = res;
            console.log(data);
            setPlanos([...data]);
        });

    }, []);


    return(
    <Conteiner>
        <span>Escolha seu Plano</span>
        {planos.map((item) => (<TelaPlanosItens key={item.id} id={item.id} image={item.image} price={item.price}/>))}
    </Conteiner>
    );
}

const Conteiner = styled.div`
    width: 375px;
    height: 667px;
    background: #0E0E13;

    span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
        margin: 29px 56px 24px 56px;
    }
`;

const PlanosCards = styled.div`
    width: 290px;
    height: 180px;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    display: flex;
    align-items: center;
    margin: 24px 42px 10px 43px; 

    img{
        width: 139.38px;
        height: 95.13px;
        margin: 42px 21.62px 42.87px 16px;
    }

    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
        text-decoration: none;
    }
`;
