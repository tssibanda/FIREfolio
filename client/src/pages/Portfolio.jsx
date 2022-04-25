import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import AddStockForm from '../components/AddStockForm'
import Loading from '../components/Loading'
import {getPortfolio, reset} from '../features/portfolio/portfolioSlice'

function Portfolio() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {portfolio, isLoading, isError, message} = useSelector((state)=>state.portfolio)

  useEffect(() =>{
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getPortfolio())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  
  if(isLoading){
    return (
      <div className='container'>
      <div className='row'>
        <div className='col-md-4 col-sm-12 m-auto'>
          <Loading />
        </div>
      </div>
      
    </div>
    )
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-10 col-sm-12 m-auto'>
          <AddStockForm />
        </div>
      </div>
      
    </div>
  )
}

export default Portfolio