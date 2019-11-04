import React from 'react'
import useGet from './useGet'
import usePost from './usePost'
import useDelete from './useDelete'

const url = 'https://devreact-mymoney.firebaseio.com/movimentacoes.json'

function App() {
  const data = useGet(url)
  const [postData, post] = usePost(url)
  const [deleteData, remove] = useDelete()

  const saveNew = () => {
    post({ valor: 20, descricao: 'Olá' })
  }

  const doRemove = () => {
    remove('https://devreact-mymoney.firebaseio.com/movimentacoes/-LsomEaH90EVd1Djw0_F.json')
  }

  return (
    <div>
      <h1>My Money</h1>
      <div>
        {data.loading && <p>Loading...</p>}
        {JSON.stringify(data.data)}
        <button onClick={saveNew}>Salvar</button>
        <button onClick={doRemove}>Delete</button>
        {JSON.stringify(deleteData)}
      </div>
    </div>
  )
}

export default App
