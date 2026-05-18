import {useState, useEffect} from 'react'
import partApi from '../services/partApi'




function Parts (){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        status: '',
    })
    const [parts, setParts] = useState([])
    
    useEffect(() => {
        const fetchParts = async () => {
            try {
                setLoading(true)
                const res = await partApi.getParts({name: search, ...filters})
                setParts(res?.data?.parts)
            } catch (err) {
                setError(err?.response?.message || 'Failed to fetch parts')
           } finally {
            setLoading(false)
           }
        }
        fetchParts()
    }, [search, filters])

    return (
        <div className='parts-page'>
            <div className='parts-sidebar'>
                <h3>Filters</h3>
            </div>
        </div>
    )
}

export default Parts

