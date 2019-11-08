import { useReducer, useEffect } from 'react'
import axios from 'axios'

const INITAL_STATE = {
    loading: true,
    data: {}
}

const reducer = (state, action) => {
    if (action.type === 'REQUEST') {
        return {
            ...state,
            loading: true
        }
    }
    if (action.type === 'SUCCESS') {
        return {
            ...state,
            loading: false,
            data: action.data
        }
    }
    return state
}

const init = baseURL => {
    const useGet = resource => {
        const [data, dispatch] = useReducer(reducer, INITAL_STATE)
        const carregar = async () => {
            dispatch({ type: 'REQUEST' })
            const res = await axios.get(baseURL + resource + '.json')
            dispatch({ type: 'SUCCESS', data: res.data })
        }

        useEffect(() => {
            carregar()
        }, [resource])

        return {
            ...data,
            refetch: carregar
        }
    }

    const usePost = resource => {
        const [data, dispatch] = useReducer(reducer, INITAL_STATE)

        const post = async (data) => {
            dispatch({ type: 'REQUEST' })
            const res = await axios.post(baseURL + resource + '.json', data)
            dispatch({
                type: 'SUCCESS',
                data: res.data
            })
        }

        return [data, post]
    }

    const useDelete = () => {
        const [data, dispatch] = useReducer(reducer, INITAL_STATE)

        const remove = async (resouce) => {
            dispatch({ type: 'REQUEST' })
            const res = await axios.delete(baseURL + resouce + '.json')
            dispatch({ type: 'SUCCESS' })
        }

        return [data, remove]
    }

    const usePatch = () => {
        const [data, dispatch] = useReducer(reducer, INITAL_STATE)

        const patch = async (resouce, data) => {
            dispatch({ type: 'REQUEST' })
            const res = await axios.delete(baseURL + resouce + '.json', data)
            dispatch({ type: 'SUCCESS' })
        }

        return [data, patch]
    }

    return {
        useGet,
        usePost,
        useDelete,
        usePatch
    }
}

export default init