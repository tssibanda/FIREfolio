import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addHolding} from '../features/portfolio/portfolioSlice'

function AddStockForm() {

  const [formData, setFormData] = useState({
    symbol: '',
    date_bought: '',
    price_bought_at: '',
    no_shares:'',
    notes:'',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {symbol, date_bought, price_bought_at, no_shares, notes} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    dispatch(addHolding(formData))
    setFormData({
      symbol: '',
      date_bought: '',
      price_bought_at: '',
      no_shares:'',
      notes:'',
    })
    navigate('/portfolio')
  }

  
  return (
    <div className='row'>
      <div className='col-12 bg1 rounded-corners p-5'>
        <p className='reg-heading alig'>Portfolio</p>
				<p className='reg-msg'>Welcome to firefolio, your one stop Portfolio Manager</p>
        <form className='form' onSubmit={onSubmit}>
						<div className='row'>
							<div className='form-group col-md-3'>
								<label htmlFor='symbol'>Symbol</label>
								<input type='text' className='form-control mb-2 mr-sm-2' id='symbol' name='symbol' placeholder='e.g. AAPL' onChange={onChange} value={symbol}/>
							</div>
							 <div className='form-group col-md-3'>
								<label htmlFor='date_bought'>purchase date</label>
								<input type='date' className='form-control' id='date_bought' name='date_bought' onChange={onChange} value={date_bought}/>
							 </div>
							 <div className='form-group col-md-3'>
								<label htmlFor='price_bought_at'>Cost/Share</label>
								<input type='number' className='form-control' id='price_bought_at' name='price_bought_at' step='any' placeholder='0.00' onChange={onChange} value={price_bought_at}/>
							 </div>
							<div className='form-group col-md-3'>
								<label htmlFor='no_shares'>no_shares</label>
								<input type='number' className='form-control' id='no_shares' name='no_shares' step='any' placeholder='0.0'onChange={onChange} value={no_shares}/>
							</div>
							<div className='form-group col-md-12'>
								<label htmlFor='notes'>Notes</label>
								<textarea type='text' className='form-control' id='notes' name='notes' onChange={onChange} value={notes}></textarea>
							</div>
							<div className='form-group col-md-3 my-4'>
								<label htmlFor='submit'> </label>
								<button type='submit' className='btn btn-primary form-control'>Add Stock</button>
							</div>
						</div>					  
					</form>
      </div>
    </div>
  )
}

export default AddStockForm