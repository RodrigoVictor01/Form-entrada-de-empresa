import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Formulario.css';



const Formulario = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [option, setOption] = useState('');
    const [activity, setActivity] = useState('');
    const [modules, setModules] = useState('');
    const [clausulas, setClausulas] = useState('');
    const [date, setDate] = useState('');
    const [dueDate, setDueDate] = useState('');


    const navigate = useNavigate();

    const infos = {
        razaoSocial: name.toUpperCase(),
        cnpj: cnpj,
        contato: email,
        opcao: option,
        atividades: activity.toUpperCase(),
        modulos: modules,
        contrato: clausulas.toUpperCase(),
        dataEntrada: date,
        dataVencimento: dueDate
    };

    const stringObjeto = JSON.stringify(infos);


    const maskCnpj = e => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        setCnpj(inputValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'));
    }

    const maskDate = e => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, '');
        setDate(inputValue.replace(/^(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'));
    }

    const validaInputs = infos => {

        const day = Number(infos.dataEntrada.slice(0, 2));
        const month = Number(infos.dataEntrada.slice(3, 5));
        const year = Number(infos.dataEntrada.slice(6, 10));
        const anoValido = 2025;

        if (infos.razaoSocial === '') {
            alert('Preencha a razão social da empresa')
            return
        } else {
            infos.razaoSocial = name.toUpperCase();
        }

        if (infos.cnpj.length < 18) {
            alert('Preencha o CNPJ completo');
            return;
        } else {
            infos.cnpj = cnpj;
        }

        if (infos.dataEntrada === '' || infos.dataEntrada.length < 10) {
            alert('Preencha a data completa');
            return;
        }

        if ((day <= 0 || day > 31) || (month <= 0 || month > 12) || (year <= 0 || year > anoValido)) {
            alert('Data inválida')
            return;
        }

        return true
    }


    const sendInfos = e => {
        e.preventDefault();

        const infos = {
            razaoSocial: name.toUpperCase(),
            cnpj: cnpj,
            contato: email,
            opcao: option,
            atividades: activity.toUpperCase(),
            modulos: modules,
            contrato: clausulas.toUpperCase(),
            dataEntrada: date,
            dataVencimento: dueDate
        };


        if (validaInputs(infos)) {
            navigate('/checkinfos', { state: { objeto: stringObjeto } });

            fetch("https://formsubmit.co/ajax/8e94b13b860d36e80ed9379794e34454", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Empresa: infos.razaoSocial,
                    CNPJ: infos.cnpj,
                    Email: infos.contato,
                    Enquadramento: infos.opcao,
                    Atividades: infos.atividades,
                    Módulos: infos.modulos,
                    Cláusulas: infos.contrato,
                    Entrada: infos.dataEntrada,
                    Vencimento: infos.dueDate

                })
            })
                .then(response => response.json())
                .catch(error => console.log(error))

        }

        return infos;
    }

    return (
        <form >
            <div className="title"><h1>Formulário de entrada</h1></div>

            <div className="container">

                <div className="inputArea">

                    <div>
                        <label>Razão Social</label>
                        <input name="razaoSocial" className="razaoSocial" type="text" value={name} onChange={e => setName(e.target.value)}
                            placeholder="Digite aqui a razão social da empresa" />
                        <input type="hidden" name="_subject" value="New submission!" />
                    </div>

                    <div >
                        <label>CNPJ</label>
                        <input name="cnpj" type="text" maxLength={18} value={cnpj} onChange={maskCnpj}
                            placeholder="00.000.000/0000-00" />
                    </div>
                </div>


                <div className="inputArea">
                    <div>
                        <label>Email</label>
                        <input name="e-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="exemplo@seuemail.com" />
                    </div>

                    <div>
                        <label>Enquadramento</label>
                        <select value={option} onChange={e => setOption(e.target.value)}>
                            <option value=""></option>
                            <option value="MEI">MEI</option>
                            <option value="SIMPLES NACIONAL">Simples Nacional</option>
                            <option value="LUCRO PRESUMIDO">Lucro Presumido</option>
                            <option value="LUCRO REAL">Lucro Real</option>

                        </select>
                    </div>
                </div>

                <div className="inputArea">
                    <div>
                        <label>Atividades da empresa</label>
                        <select name="atividades" type="text" value={activity} onChange={e => setActivity(e.target.value)}>
                            <option value=""></option>
                            <option value="COMERCIO E SERVIÇO">Comércio e Serviço</option>
                            <option value="COMERCIO">Apenas Comércio</option>
                            <option value="SERVIÇO">Apenas Serviço</option>
                        </select>
                    </div>

                    <div>
                        <label>Módulos</label>
                        <select name="modulos" type="text" value={modules} onChange={e => setModules(e.target.value)}>
                            <option value=""></option>
                            <option value="CONTABIL, FISCAL E PESSOAL">Contábil, Fiscal e Pessoal</option>
                            <option value="FISCAL E PESSOAL">Fiscal e Pessoal</option>
                            <option value="FISCAL">Apenas Fiscal</option>
                            <option value="PESSOAL">Apenas Pessoal</option>
                        </select>
                    </div>
                </div>


                <div className="inputArea">
                    <div>
                        <label>Data de entrada</label>
                        <input name="data-entrada" type="text" value={date} maxLength={10} onChange={maskDate}
                            placeholder="dd/mm/aaaa" />
                    </div>

                    <div >
                        <label>Data de vencimento</label>
                        <select name="data-vencimento" type="text" value={dueDate} onChange={e => setDueDate(e.target.value)}>
                            <option value=""></option>
                            <option value="DIA 05">Dia 5 de cada mês</option>
                            <option value="DIA 10">Dia 10 de cada mês</option>
                            <option value="DIA 15">Dia 15 de cada mês</option>
                            <option value="DIA 20">Dia 20 de cada mês</option>
                        </select>
                    </div>
                </div>


                <label className="clausulas">Cláusulas</label>
                <textarea name="message" value={clausulas} onChange={e => setClausulas(e.target.value)}
                    placeholder="Digite aqui as cláusulas contratuais e seus respectivos valores" />

                <button type="submit" onClick={sendInfos}>Enviar para setor comercial</button>

            </div>
        </form >
    )

}

export default Formulario;