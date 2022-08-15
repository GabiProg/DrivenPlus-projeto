import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TelaHome(){
    const navigate = useNavigate();
    const planoApiInfo = JSON.parse(localStorage.getItem("planoApiInfo"));
    const infoNome = JSON.parse(localStorage.getItem("infoNome"));
    const getToken = JSON.parse(localStorage.getItem("infoToken"));
    const dadosPost = JSON.parse(localStorage.getItem("compraInfo"));
    
    function DeletarPlano(e){
        e.preventDefault();

        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;

        const config = {
            headers: {
              "Authorization": `Bearer ${getToken}`
            }
          };

        const promise = axios.delete(URL, config);
        promise.then((res) => {
            console.log(res.data);
            navigate("/subscriptions");
        });  
    }

    function MudarPlano(e){
        e.preventDefault();

        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;

        const body = dadosPost;

        const config = {
            headers: {
              "Authorization": `Bearer ${getToken}`
            }
          };

        const promise = axios.post(URL, body, config);
        promise.then((res) => {
            console.log(res.data);
            navigate("/subscriptions");
        });  
    }

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
            <img src={planoApiInfo?.membership.image} alt="Imagem do Logo"/>
            <ion-icon name="person-circle-outline"></ion-icon>
        </Topo>
        <Nome>Olá, {infoNome}</Nome>
        <Listar>
            {planoApiInfo?.membership.perks.map((item) => <ListarBeneficios key={item.id} id={item.id} member={item.membershipId} title={item.title} link={item.link}/>)}
        </Listar>
        <Botoes>
            <Trocar onClick={MudarPlano}>Mudar plano</Trocar>
            <Cancelar onClick={DeletarPlano}>Cancelar plano</Cancelar>
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
        color: #FFFFFF;
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