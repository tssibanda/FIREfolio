
function DashboardAssets({holding}) {
    const percValueChange = (holding) => {
        return ((((holding.regularMarketPrice - holding.price_bought_at))/holding.price_bought_at)*100).toFixed(2)
    }
    const totalValue = (holding) => {
        return (holding.regularMarketPrice * holding.no_shares).toFixed(2)
    }
  return (
    // <!-- Assets -->
            <div className='row m-4'>
                <div className='col-md-12 mx-md-0'>
                    <div className='row'>
                        <div className='col-8'>
                            <p className='p-0 m-0 dashboard-asset-symbol'>{holding.symbol}</p>
                            <p className='p-0 dashboard-asset-name'>{holding.longName}</p>
                        </div>
                        <div className='col-auto'>
                            {percValueChange(holding) > -0.1 ? (
                                <p className='p-0 m-0 p-gain'>+{percValueChange(holding)}%</p>
                            ) : (
                                <p className='p-0 m-0 n-loss'>{percValueChange(holding)}%</p>
                            )}                            
                            <p className='p-0'>${totalValue(holding)}</p>
                        </div>
                        <div className='border-bottom'></div>
                    </div>
                </div>
            </div>           
  )
}

export default DashboardAssets