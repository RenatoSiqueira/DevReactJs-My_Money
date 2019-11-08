import React from 'react'
import { useMesApi } from '../../api'


const InfoMes = ({ data }) => {
    const { infoMes, alterarMes } = useMesApi(data)

    const alterarPrevisaoEntrada = (evt) => {
        alterarMes({ previsao_entrada: evt.target.value })
    }

    const alterarPrevisaoSaida = (evt) => {
        alterarMes({ previsao_saida: evt.target.value })
    }

    if (infoMes.loadin) {
        return <p>Carregando dados do mês...</p>
    }
    if (infoMes.data) {
        return (
            <div>
                <span>
                    Previsão Entrada: {infoMes.data.previsao_entrada}
                    <input type="text" onBlur={alterarPrevisaoEntrada} />
                    / Previsão Saida: {infoMes.data.previsao_saida}
                </span><br />
                <input type="text" onBlur={alterarPrevisaoSaida} />
                Entrada: {infoMes.data.entradas} / Saidas: {infoMes.data.saidas}
            </div>
        )
    }
    return null
}

export default InfoMes