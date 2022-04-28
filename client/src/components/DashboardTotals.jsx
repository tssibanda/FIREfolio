import {FaArrowUp, FaArrowDown, FaCoins, FaMoneyBillAlt} from 'react-icons/fa'
function DashboardTotals({holdings}) {
    const totalBalance = (holdings) =>{
        let total = 0
        let i
        for(i=0;i<holdings.length;i++){
          total = total + (holdings[i]['regularMarketPrice'] * holdings[i]['no_shares'])
        }
        return total.toFixed(2)
    }

    const totalInvestment = (holdings) =>{
        let total = 0
        let i
        for(i=0;i<holdings.length;i++){
            total = total + (holdings[i]['price_bought_at'] * holdings[i]['no_shares'])
        }
        return total.toFixed(2)
    }

    const growth = (holdings) => {
        return ((( totalBalance(holdings) - totalInvestment(holdings) ) / totalInvestment(holdings))*100).toFixed(2)
    }

  return (
    // {/* <!-- total Balance, investing, gain loss --> */}
    <div className='row p-md-4'>
        <div className=' col-12 bg1 rounded-corners'>
            <div className='row'>
                <div className='col-6'>
                <div className='row'>
                    <div className='col-12 p-3 mx-md-2'>
                        <p className='title py-0 my-1'>total balance</p>
                        {growth(holdings) > 0 ? (
                            <p className='balance py-0 gain'>${totalBalance(holdings)}</p>
                        ) : (
                            <p className='balance py-0 loss'>${totalBalance(holdings)}</p>
                        ) }
                        
                    </div>
                    <div className='col-12 p-3 mx-md-2'>
                    <div className='row'>
                        <div className='col-5'>
                            <p className='my-0 title2'><FaMoneyBillAlt className='gain'/> investing</p>
                            <p className='my-2 money-stat'>${totalInvestment(holdings)}</p>
                        </div>
                        <div className='vr g-0'></div>
                        <div className='col-6'>
                            <p className='my-0 title2 mx-md-3 mx-sm-1'><FaArrowUp className='gain'/><FaCoins className=''/><FaArrowDown className='loss'/> Gain/Loss</p>
                            <p className='my-2 mx-md-3 money-stat' >
                                {totalBalance(holdings)-totalInvestment(holdings) < 0 ? (
                                    <>-${((totalBalance(holdings)-totalInvestment(holdings)).toFixed(2)) * -1}</>
                                    
                                ) : (
                                    <>+${(totalBalance(holdings)-totalInvestment(holdings)).toFixed(2)}</>
                                    
                                )}
                                
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className='vr m-3 p-0'></div>
                <div className='col-4 position-relative'>
                <div className='row'>
                    <div className='col-12 p-3 mx-md-2 p-bottom-0'>
                      <p className='title py-0 my-1'>Account Progress</p>
                    </div>
                  </div>
                {growth(holdings) > 0 ? (
                    <p className='p1-growth vertical-center'>+{growth(holdings)}%</p>
                ) : (
                    <p className='p1-loss vertical-center'>{growth(holdings)}%</p>
                )}
                
                </div>						
            </div>				
        </div>
    </div>
  )
}

export default DashboardTotals