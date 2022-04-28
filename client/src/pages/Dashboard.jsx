import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Loading from '../components/Loading'
import {getPortfolio, reset} from '../features/portfolio/portfolioSlice'
import { FaChartLine, FaArrowUp, FaArrowDown, FaCoins} from 'react-icons/fa'

import DashboardTotals from '../components/DashboardTotals'
import DashboardAssets from '../components/DashboardAssets'
import DashboardPie from '../components/DashboardPie'

function Dashboard() {
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
        {/*	left pane*/}
        <div className='col-md-7 col-sm-12'>
          {holdings.length > 0 ? (
            <>
              <DashboardTotals holdings={holdings}/>
              <div className='row p-md-4 my-4'>
                <div className=' col-12 bg1 rounded-corners'>
                  <div className='row'>
                    <div className='col-12 p-3 mx-md-2 p-bottom-0'>
                      <p className='title py-0 my-1'>assets</p>
                    </div>
                  </div>
                  {holdings.map((holding) => (
                    <DashboardAssets key={holding._id} holding={holding}/>
                  ))}
                </div>
              </div>
            </>            
          ) : (
              <div className='row p-md-4 my-4'>
                <div className=' col-12 bg1 rounded-corners'>
                  <div className='row'>
                    <div className='col-12'>
                      <h4>No Valid data, go to portfolio page and add your holdings</h4>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>

        {/* Right pane */}
        <div className='col-md-5 col-sm-12'>
          <div className='row p-md-4'>
            <div className='col-12 bg1 rounded-corners'>
              <div className='row'>
                <div className='col-12 p-3 mx-md-2'>
                  <DashboardPie holdings={holdings}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Dashboard