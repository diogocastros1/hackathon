import React from "react"
import Main from "../templates/Main"

export default props =>
    <Main icon="home" title="Início"
        subtitle="Consumo geral dos Apps">
        <div className='display-4'>Bem vindo!</div>
        <hr />
        <p>Apresentação do consumo de cada aplicativo de modo geral.</p>
    </Main>