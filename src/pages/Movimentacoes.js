import React, { useState } from 'react'
import Rest from '../utils/rest'

const baseURL = 'https://devreact-mymoney.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

const Movimentacoes = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const dataMeses = useGet(`meses/${match.params.data}`)
    const [dataPatch, patch] = usePatch()
    const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
    const [removeData, remover] = useDelete()
    //const [removeData, remover] = usePatch()
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')

    const onChangeDescricao = evt => {
        setDescricao(evt.target.value)
    }

    const onChangeValor = evt => {
        setValor(evt.target.value)
    }

    const sleep = time => new Promise(resolve => setTimeout(resolve, time))

    const salvarMovimentacao = async () => {
        if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
            salvar({
                descricao,
                valor: parseFloat(valor)
            })
            setDescricao('')
            setValor(0)
            data.refetch()
            await sleep(5000)
            dataMeses.refetch()
        }
    }

    const removerMovimentacao = async (id) => {
        await remover(`movimentacoes/${match.params.data}/${id}`)
        data.refetch()
        await sleep(5000)
        dataMeses.refetch()
    }

    const alterarPrevisaoEntrada = (evt) => {
        patch(`meses/${match.params.data}`, {
            previsao_entrada: evt.target.value
        })
    }

    const alterarPrevisaoSaida = (evt) => {
        patch(`meses/${match.params.data}`, {
            previsao_saida: evt.target.value
        })
    }

    return (
        <div className="container">
            <h1>Movimentacoes</h1>
            {
                !dataMeses.loading && dataMeses.data &&
                <div>
                    <span>
                        Previsão Entrada: {dataMeses.data.previsao_entrada}
                        <input type="text" onBlur={alterarPrevisaoEntrada} />
                        / Previsão Saida: {dataMeses.data.previsao_saida}
                    </span>
                    <input type="text" onBlur={alterarPrevisaoSaida} />
                    Entrada: {dataMeses.data.entradas} / Saidas: {dataMeses.data.saidas}
                </div>

            }
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.data &&
                        Object
                            .keys(data.data)
                            .map(mov => {
                                return (
                                    <tr key={mov}>
                                        <td>{data.data[mov].descricao}</td>
                                        <td className="text-rigth">{data.data[mov].valor}</td>
                                        <td><button className="btn btn-danger" onClick={() => removerMovimentacao(mov)}>Remover</button></td>
                                    </tr>
                                )
                            })
                    }
                    <tr>
                        <td><input type="text" value={descricao} onChange={onChangeDescricao} /></td>
                        <td><input type="text" value={valor} onChange={onChangeValor} /></td>
                        <td>
                            <button className="btn btn-success" onClick={salvarMovimentacao}>+</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Movimentacoes