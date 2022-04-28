import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import AddStockForm from '../components/AddStockForm'
import Holdings from '../components/Holdings'
import Loading from '../components/Loading'
import {getPortfolio, reset} from '../features/portfolio/portfolioSlice'

function Portfolio() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {holdings, isLoading, isError, message} = useSelector((state)=>state.portfolio)
  
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

          <div className='row my-4'>
            <div className='col-12 bg1 rounded-corners p-5'>
              <div className='table-responsive-sm'>
                <table className='table white-font'>
                  <thead>
                    <tr className='bg-dark'>
                      <th scope="col">Symbol</th>
                      <th scope="col">Shares</th>
                      <th scope="col">Bought At</th>
                      <th scope="col">MarketPrice</th>
                      <th scope="col">Total Investment</th>
                      <th scope="col">Gain/Loss</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {holdings.length > 0 ? (
                      <>
                        {holdings.map((holding) => (
                          <Holdings key={holding._id} holding={holding} />
                        ))}
                        </>
                    ) : (
                    <tr>
                      <th colSpan={6}>
                        <h3>You need to add your holdings using the form above</h3>
                      </th>
                    </tr>
                    )}

                  </tbody>
                </table>                
              </div>              
            </div>          
          </div>          
        </div>
      </div>      
    </div>
  )
}

export default Portfolio