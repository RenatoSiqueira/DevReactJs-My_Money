import React, { Fragment } from 'react'

const AdicionarMes = () => {
    return (
        <Fragment>
            <h2>Selecionar Mês</h2>
            <select name="" id="">
                <option value="2019">2019</option>
                <option value="2020">2020</option>
            </select>

            <select name="" id="">
                <option value="01">01</option>
                <option value="02">02</option>
            </select>
            <button>Adicionar Mês</button>
        </Fragment>
    )
}

export default AdicionarMes