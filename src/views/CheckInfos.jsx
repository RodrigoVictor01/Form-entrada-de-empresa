import React from 'react';
import Header from '../components/Header';
import { Link, useLocation } from 'react-router-dom';
import './CheckInfos.css'

const CheckInfos = () => {
    const location = useLocation();
    const objetoRecebido = JSON.parse(location.state.objeto);

    return (
        <div>
            <Header />
            <div className="App">
                <div className="title"><h1>Informações enviadas</h1></div>
                <div className="container">

                    <h1><span>Empresa:</span> {objetoRecebido.razaoSocial}</h1>
                    <h2><span>CNPJ:</span> {objetoRecebido.cnpj}</h2>
                    <h2><span>Email</span>{objetoRecebido.email}</h2>
                    <h2><span>Enquadramento:</span> {objetoRecebido.opcao}</h2>
                    <h2><span>Atividades da empresa:</span> {objetoRecebido.atividades}</h2>
                    <h2><span>Módulos:</span> {objetoRecebido.modulos}</h2>
                    <h2><span>Data de entrada:</span> {objetoRecebido.dataEntrada}</h2>
                    <h2><span>Vencimento dos honorários:</span> {objetoRecebido.dataVencimento}</h2>
                    <h2><span>Cláusula(s):</span> {objetoRecebido.contrato}</h2>


                    <Link to='/'>Novo cadastro</Link>
                </div>

            </div>
        </div>
    );

}

export default CheckInfos;
