import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TelaHome() {
  const navigate = useNavigate();

  const planoApiInfo = JSON.parse(localStorage.getItem("planoApiInfo"));
  const infoNome = JSON.parse(localStorage.getItem("infoNome"));
  const getToken = JSON.parse(localStorage.getItem("infoToken"));
  const dadosPost = JSON.parse(localStorage.getItem("compraInfo"));
  localStorage.getItem("user");
  localStorage.getItem("numeroId");

  function DeletarPlano(e) {
    e.preventDefault();

    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;

    const config = {
      headers: {
        "Authorization": `Bearer ${getToken}`
      }
    };

    const promise = axios.delete(URL, config);
    promise.then((res) => {
      localStorage.removeItem("numeroId");
      localStorage.removeItem("user");
      localStorage.removeItem("planoApiInfo");
      navigate("/subscriptions");
    });
  }

  function MudarPlano(e) {
    e.preventDefault();

    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`;

    const body = dadosPost;

    const config = {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    };

    const promise = axios.post(URL, body, config);
    promise.then((res) => {
      navigate("/subscriptions");
    });
  }

  function ListarBeneficios({ title, link }) {
    return (
      <>
        <Beneficios>
          <a href={`${link}`}>{title}</a>
        </Beneficios>
      </>
    );
  }

  // const handleLogout = () => {
  //     localStorage.clear();
  //     navigate("/");
  //   };

  return (
    <Conteiner>
      <Topo>
        <img src={planoApiInfo?.membership.image} alt="Imagem do Logo" />
        <ion-icon name="person-circle-outline"></ion-icon>
      </Topo>
      <Nome>Olá, {infoNome}</Nome>
      <Listar>
        {planoApiInfo?.membership.perks.map((item) => (
          <ListarBeneficios
            key={item.id}
            id={item.id}
            member={item.membershipId}
            title={item.title}
            link={item.link}
          />
        ))}
      </Listar>
      <Botoes>
        <Trocar onClick={MudarPlano}>Mudar plano</Trocar>
        <Cancelar onClick={DeletarPlano}>Cancelar plano</Cancelar>
      </Botoes>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </Conteiner>
  );
}

const Conteiner = styled.div`
  width: 375px;
  height: 667px;
  background: #0e0e13;
  position: relative;
`;

const Topo = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12.2px;

  img {
    height: 50px;
    width: 74px;
    margin-top: 32px;
    margin-left: 38px;
  }

  ion-icon {
    font-size: 34px;
    color: #ffffff;
    margin-top: 22px;
    margin-right: 22px;
  }
`;

const Nome = styled.div`
  width: 190px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #ffffff;
  margin-left: 130px;
  margin-right: 90px;
  margin-bottom: 53px;
`;

const Listar = styled.div`
  width: 100%;
  height: auto;
`;

const Beneficios = styled.div`
  width: 299px;
  height: 52px;
  background: #ff4791;
  border-radius: 8px;
  margin: 0 38px 8px 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;

  a {
    text-decoration: none;
    color: #ffffff;
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
  background: #ff4791;
  border-radius: 8px;
  margin-left: 37px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
`;

const Cancelar = styled.div`
  width: 299px;
  height: 52px;
  background: #ff4747;
  border-radius: 8px;
  margin-left: 37px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
`;
