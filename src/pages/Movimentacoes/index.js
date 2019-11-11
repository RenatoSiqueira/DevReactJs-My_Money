import React from 'react'
import { Redirect } from 'react-router-dom'
import { useMovimentacaoApi } from '../../api'

import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'

const Movimentacoes = ({ match }) => {
    const { movimentacoes, salvarNovaMovimentacao, removerMovimentacao } = useMovimentacaoApi(match.params.data)
    const sleep = time => new Promise(resolve => setTimeout(resolve, time))
    const salvarMovimentacao = async (dados) => {
        await salvarNovaMovimentacao(dados)
        movimentacoes.refetch()
        await sleep(5000)
        //infoMes.refetch()
    }

    const removerMovimentacaoClick = async (id) => {
        await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`)
        movimentacoes.refetch()
        await sleep(5000)
        //infoMes.refetch()
    }

    if (movimentacoes.error === 'Permission denied') {
        return <Redirect to='/login' />
    }

    return (
        <div className="container">
            <h1>Movimentacoes</h1>
            <InfoMes data={match.params.data} />

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
                        movimentacoes.data &&
                        Object
                            .keys(movimentacoes.data)
                            .map(mov => {
                                return (
                                    <tr key={mov}>
                                        <td>{movimentacoes.data[mov].descricao}</td>
                                        <td className="text-rigth">{movimentacoes.data[mov].valor}</td>
                                        <td><button className="btn btn-danger" onClick={() => removerMovimentacaoClick(mov)}>Remover</button></td>
                                    </tr>
                                )
                            })
                    }
                    <AdicionarMovimentacao salvarNovaMovimentacao={salvarMovimentacao} />
                </tbody>
            </table>
        </div>
    )
}

export default Movimentacoes