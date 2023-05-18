import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from '../requests'

const AnecdoteList = () => {
    const queryClient = useQueryClient()
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        ))
    }
    })

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
        <h3>Anecdote app</h3>
    
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
