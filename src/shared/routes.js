import Home from './Home'
import Grid from './Grid'
import { fetchPopularRepos } from './api'

export default [
    {
        path: '/',
        exact: true,
        component: Home
    }, 
    {
        path: '/popular/:id',
        component: Grid,
        fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
    }
]