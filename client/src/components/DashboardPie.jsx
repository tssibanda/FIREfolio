import {Pie} from '@visx/shape'
import { Group } from "@visx/group"
import { Text } from "@visx/text"
import { useState } from 'react'
import { FaAngleDoubleUp, FaAngleDoubleDown, FaStop } from "react-icons/fa"
import { icons } from 'react-icons/lib'
import { ScaleSVG } from '@visx/responsive'
import {LegendOrdinal} from '@visx/legend'


function DashboardPie({holdings}) {
    const upArrow = () => {
        return <FaAngleDoubleUp />
    }
    const totalValue = (shares, marketValue) => {
        return shares * marketValue
    }
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
    const legend = (stocks) => {
        return(
            <>
                <div className='row'>
                    <div className='col-3'><p><FaStop/>  </p></div>
                </div>
            </>
        )
    }
    let stocks = []
    const colors = [
        '#35dc8a', // blue
        '#fa5c5b', // orange
        '#edae3c', // green
        '#5689ff', // yellow
        '#09d1e8', // purple
        '#CF0685',
        '#FD7F88',
        '#8CB82F',
        '#B5206E',
        '#FEDE7A',
        '#0B5852'
      ]

    for(let i = 0; i< holdings.length; i++){
        stocks.push({
            symbol:holdings[i].symbol, 
            value:totalValue(holdings[i].no_shares, holdings[i].regularMarketPrice),
            no_shares: holdings[i].no_shares,
            color: colors[i],
        })
    }

    const [active, setActive] = useState(null)
    const sq = 300;
    const half = sq/2
    
  return (
        <>
            <p className='title py-0 my-1'>portfolio diversity</p>
            <div className='row m-4'>
                <div className='col-md-12 mx-md-0'>
                    <ScaleSVG width={sq} height={sq}>
                        <Group top={half} left={half}>
                            <Pie 
                                data={stocks} 
                                pieValue={(data) => data.value * data.no_shares} 
                                outerRadius={half} 
                                innerRadius={half-25} 
                                padAngle={0.01}
                            >
                                {pie => {
                                    return pie.arcs.map(arc => {
                                        return (
                                        <g key={arc.data.symbol} onMouseEnter={() => setActive(arc.data)} onMouseLeave={()=> setActive(null)}>
                                            <path d={pie.path(arc)} fill={arc.data.color}></path>
                                        </g>
                                        )
                                    })
                                }}
                            </Pie>
                            {growth(holdings) > 0 ? (
                                <>
                                    <Text textAnchor='middle' fill='#3be290' className='p1-growth' dy={-20}>🡅</Text>
                                    <Text textAnchor='middle' fill='#3be290' className='p1-growth' dy={20}>{`+${growth(holdings)}`}%</Text>
                                    <Text textAnchor='middle' fill='#3be290' className='' dy={50}>{`${holdings.length} Assets`}</Text>                            
                                </>                       
                            ) : (
                                <>
                                    <Text textAnchor='middle' fill='#e7606f' className='p1-loss' dy={-20}>🡇</Text>
                                    <Text textAnchor='middle' fill='#e7606f' className='p1-loss' dy={20}>{`${growth(holdings)}`}%</Text>
                                    <Text textAnchor='middle' fill='#e7606f' className='' dy={50}>{`${holdings.length} Assets`}</Text>                            
                                </>
                            )}                    
                        </Group>
                    </ScaleSVG>
                </div>
            </div>

            <div className='row'> 
                <div className='col-sm-12  m-auto'>
                    {stocks.map(stock =>(
                        <div className='row'>
                            <div className='col-6'><p className='dashboard-asset-symbol'><FaStop color={stock.color}/>  {stock.symbol}</p></div>
                            <div className='col'><p className='dashboard-asset-symbol'>${(stock.value).toFixed(2)}</p></div>
                        </div>
                    ))}
                </div>            
            </div>
            
        </>
                        

  )
}

export default DashboardPie