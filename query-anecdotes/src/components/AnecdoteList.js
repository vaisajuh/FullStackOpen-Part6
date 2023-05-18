import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteList = () => {
    const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        ))
        dispatch({type:'VOTE', payload: updatedAnecdote.content})
        helper()
    }
    })

    const helper = () => {
        setTimeout(() => {
            dispatch({ type:'CLEAR' })
        }, 5000)
    }

    const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    const result = useQuery(
    'anecdotes', getAnecdotes,
    {
        retry:false
    })

    let anecdotes = result.data

    if ( result.isLoading ) {
        return <div>loading data...</div>
    }
    else if ( result.status === 'error') {
        return <div>anecdote service not available due to problems in server</div>
    }
    return (
    <div>    
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
        )}
    </div>
    )
}

export default AnecdoteList
