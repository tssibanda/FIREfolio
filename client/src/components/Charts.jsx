import { useState } from 'react'
import {Line} from 'react-chartjs-2'

function Charts({holding}) {
    const labels = holding.dates
    const yaxis = holding.closes

      
    const [userDataRed, setUserDataRed] =useState({
        labels,
        datasets: [
          {
            label: holding.symbol,
            data: yaxis,
            borderColor: 'rgb(231, 96, 111)',
            backgroundColor: 'rgb(231, 96, 111, 0.5)',
            tension: 0.1,
            pointRadius: 0,
            fill: true,
          }
        ],
    })
    const [userDataGreen, setUserDataGreen] =useState({
        labels,
        datasets: [
          {
            label: holding.symbol,
            data: yaxis,
            borderColor: 'rgb(59, 226, 144)',
            backgroundColor: 'rgb(59, 226, 144, 0.5)',
            tension: 0.1,
            pointRadius: 0,
            fill: true,
          }
        ],
    })
  return (
    <div>
        {holding.regularMarketPrice > holding.price_bought_at? (
            <><Line data={userDataGreen} /></>
        ) : (
            <><Line data={userDataRed} /></>
        )}
         
    </div>
  )
}

export default Charts