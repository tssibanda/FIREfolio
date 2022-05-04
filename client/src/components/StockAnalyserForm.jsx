import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPrediction, reset} from '../features/prediction/predSlice'

function StockAnalyserForm() {

    const [formData, setFormData] = useState({
        symbol: ''
    })

    const dispatch = useDispatch()
    const {predictions, isLoading, isError, message} = useSelector((state)=>state.predictions)
    const {symbol} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
      }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(getPrediction(formData))
        // setFormData({
        //     symbol: ''
        // })
    }

  return (
      <>
      {
          predictions.prev_close > 0 ? (
              <>
            <div className='row '>
                <form className='form' onSubmit={onSubmit}>
                    <p className='title py-0 my-1'>Stock Analyser</p>
                    <div className='form-group col-md-10'>
                        <label htmlFor='symbol'>Symbol</label>
                        <input type='text' className='form-control mb-2 mr-sm-2' id='symbol' name='symbol' placeholder='e.g. AAPL' onChange={onChange} value={symbol}/>
                        <button type="submit" className="btn btn-primary mb-2">Analyse</button>
                    </div>
                </form>
            </div>
            <div className='row'>
                <div className='col-md-10'>
                    <p className='dashboard-asset-symbol center'> Tomorrows Predicted Price: ${predictions.prediction.toFixed(2)}</p>

                    { predictions.prediction > predictions.prev_close ? (
                        <h1 className='p-gain center'>Its a Buy 🡅</h1>
                    ) : (
                        <h1 className='p-loss center'>Its a Sell 🡇</h1>
                    )}
                </div>
            </div>
            </>
          ) : (
            <div className='row '>
                <form className='form' onSubmit={onSubmit}>
                    <p className='title py-0 my-1'>Stock Analyser</p>
                    <div className='form-group col-md-10'>
                        <label htmlFor='symbol'>Symbol</label>
                        <input type='text' className='form-control mb-2 mr-sm-2' id='symbol' name='symbol' placeholder='e.g. AAPL' onChange={onChange} value={symbol}/>
                        <button type="submit" className="btn btn-primary mb-2">Analyse</button>
                    </div>
                </form>
            </div>
          )
      }
      </>
      
    
  )
}

export default StockAnalyserForm