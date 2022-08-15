import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function TelaCadastro() {
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  const navigate = useNavigate();

  function EnviarCadastro(e) {
    e.preventDefault();

    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up`;

    const body = {
      email: email,
      name: nome,
      cpf: cpf,
      password: senha,
    };

    const promise = axios.post(URL, body);
    promise.then((res) => {
      navigate("/");
    });
    promise.catch((err) => {
      alert("Falha ao fazer cadastro.");
    });
  }

  return (
    <Conteiner>
      <form onSubmit={EnviarCadastro}>
        <input
          type="text"
          id="first"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
        <Link to="/">
          <div>Já possuí uma conta? Entre</div>
        </Link>
      </form>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  width: 375px;
  height: 667px;
  background: #0e0e13;

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
    margin: 16px 30px 5px 30px;
    padding-left: 14px;
  }

  #first {
    margin-top: 131px;
  }

  button {
    width: 299px;
    height: 52px;
    background: #ff4791;
    border-radius: 8px;
    ont-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
    margin: 24px 30px 24px 40.5px;
  }

  div {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-decoration-line: underline;
    color: #ffffff;
    margin: 0 100px 0 101px;
  }
`;
