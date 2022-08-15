import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import PacoteItens from "./PacoteItens";

export default function TelaPlano() {
  const [click, setClick] = useState(false);
  const [digitos, setDigitos] = useState();
  const [seguranca, setSeguranca] = useState();
  const [validade, setValidade] = useState();
  const {nomeImpresso ,setNomeImpresso, plano, setPlano} = useContext(UserContext);
  const navigate = useNavigate();
  const { ID_DO_PLANO } = useParams();
  const numeroIdSerializado = localStorage.getItem("numeroId");
  const numeroId = JSON.parse(numeroIdSerializado);
  const getToken = JSON.parse(localStorage.getItem("infoToken"));

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${ID_DO_PLANO}`;

    const config = {
      headers: {
        "Authorization": `Bearer ${getToken}`
      }
    };

    const promise = axios.get(URL, config);

    promise.then((res) => {
      const {data} = res;
      setPlano(data);
    });
  }, []);

  function EnviarDadosCompras(e){
    e.preventDefault();
    
    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;

    const body = {
      membershipId: numeroId,
      cardName: nomeImpresso,
      cardNumber: digitos,
      securityNumber: seguranca,
      expirationDate: validade
    };

    localStorage.setItem("infoNome", JSON.stringify(nomeImpresso));

    const config = {
      headers: {
        "Authorization": `Bearer ${getToken}`
      }
    };

    const promise = axios.post(URL, body, config);
    promise.then((res) =>{
      const {data} = res;
      localStorage.setItem("compraInfo", JSON.stringify({
        membershipId: numeroId,
        cardName: nomeImpresso,
        cardNumber: digitos,
        securityNumber: seguranca,
        expirationDate: validade
      }));
      localStorage.setItem("planoApiInfo", JSON.stringify(data));
      navigate("/home");
    });
    promise.catch((err) => {
      alert("Falha ao enviar dados da assinatura.");
    });
  }

  return (
    <>
      <Conteiner>
        <Link to="/subscriptions">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </Link>
        <img src={plano?.image} alt="Imagem do plano escolhido" />
        <Titulo>{plano?.name}</Titulo>
        <Beneficios>
          <div>
            <ion-icon name="clipboard-outline"></ion-icon>
            <p>Benefícios:</p>
          </div>
          <Pacote>
            {plano?.perks.map((item, index) => (
              <PacoteItens
                key={item.id}
                id={item.id}
                title={item.title}
                index={index}
                member={item.membershipId}
              />
            ))}
          </Pacote>
        </Beneficios>
        <Preco>
          <div>
            <ion-icon name="cash-outline"></ion-icon>
            <p>Preco:</p>
          </div>
          <span>R$ {plano?.price} cobrados mensalmente</span>
        </Preco>
        <Formulario>
          <input
            type="text"
            placeholder="Nome impresso no cartão"
            value={nomeImpresso}
            onChange={(e) => setNomeImpresso(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Digitos do cartão"
            value={digitos}
            onChange={(e) => setDigitos(e.target.value)}
            required
          />
          <div>
            <input
              id="first"
              type="text"
              placeholder="Código de segurança"
              value={seguranca}
              onChange={(e) => setSeguranca(e.target.value)}
              required
            />
            <input
              id="second"
              type="text"
              placeholder="Validade"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
              required
            />
          </div>
          <button onClick={() => setClick(true)}>ASSINAR</button>
        </Formulario>
        {click === true ? (
          <Modal>
            <div>
              <ion-icon
                name="close-outline"
                onClick={() => setClick(false)}
              ></ion-icon>
            </div>
            <Quadro>
              <p>
                Tem certeza que deseja
                <br /> assinar o plano
                <br /> {plano?.name} (R$ {plano?.price})?
              </p>
              <Confirmar>
                <Nao onClick={() => setClick(false)}>Não</Nao>
                <Sim onClick={EnviarDadosCompras}>SIM</Sim>
              </Confirmar>
            </Quadro>
          </Modal>
        ) : (
          <div></div>
        )}
      </Conteiner>
    </>
  );
}

const Conteiner = styled.div`
  width: 375px;
  height: auto;
  background: #0e0e13;
  box-sizing: border-box;
  position: relative;

  ion-icon {
    margin-top: 24.35px;
    margin-left: 22px;
    margin-bottom: 35.35px;
    font-size: 28px;
    color: #ffffff;
  }

  img {
    margin-left: 100px;
    margin-right: 129.62px;
    margin-bottom: 11.87px;
  }
`;

const Formulario = styled.div`
  div {
    display: flex;
  }
  input {
    height: 52px;
    width: 299px;
    border-radius: 8px;
    background: #ffffff;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #7e7e7e;
    margin: 0 36px 8px 40px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  div input {
    height: 52px;
    width: 145px;
    border-radius: 8px;
  }

  button {
    width: 299px;
    height: 52px;
    background: #ff4791;
    border-radius: 8px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
    margin-bottom: 34px;
    margin-right: 36px;
    margin-left: 40px;
  }

  #first {
    margin-right: 7px;
  }
  #second {
    margin: 0 56px 0 0;
  }
`;

const Modal = styled.div`
  width: 375px;
  height: 667px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;

  div ion-icon {
    margin-left: 327px;
    margin-bottom: 300px;
    color: #ffffff;
    font-size: 40px;
  }
`;

const Quadro = styled.div`
  width: 248px;
  height: 210px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;

  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #000000;
  }
`;

const Confirmar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 47px;
`;

const Nao = styled.div`
  width: 95px;
  height: 52px;
  background: #cecece;
  border-radius: 8px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  margin-left: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Sim = styled.div`
  width: 95px;
  height: 52px;
  background: #ff4791;
  border-radius: 8px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  margin-right: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Titulo = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
  color: #ffffff;
  margin-left: 100px;
  margin-right: 100.62px;
  margin-bottom: 22px;
`;

const Beneficios = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 230px;
  }

  div p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-bottom: 12px;
    margin-top: 10px;
  }

  ion-icon {
    font-size: 24px;
    color: #ff4791;
    margin-bottom: 12px;
    margin-top: 10px;
  }
`;

const Pacote = styled.div`
  display: flex;
  flex-direction: column;
  width: 299px;
  height: auto;

  h3 {
    margin-right: 100px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
  h4 {
    margin-right: 65px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
`;

const Preco = styled.div`
  margin-bottom: 30px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 260px;
  }

  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-bottom: 4px;
    margin-top: 4px;
  }

  ion-icon {
    color: #ff4791;
    font-size: 24px;
    margin-right: 3px;
    margin-bottom: 4px;
    margin-top: 4px;
  }

  span {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
    margin-left: 40px;
  }
`;
