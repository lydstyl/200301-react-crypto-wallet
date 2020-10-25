import React, { useState, useEffect } from 'react'

export const TotalInEur = ({ totalUsd }) => {
  const [total, setTotal] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(`https://api.exchangeratesapi.io/latest`)
        const datas = await response.json()

        const totalEur = totalUsd / datas.rates.USD
        setTotal(totalEur.toFixed(0))
      } catch (error) {
        console.log('setEurPrice error', error)
      }
    })()
  }, [totalUsd])

  return <h3>Soit {total} €</h3>
}
