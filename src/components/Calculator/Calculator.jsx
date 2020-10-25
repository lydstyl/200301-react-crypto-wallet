import React, { useState, useEffect } from 'react'

import './Calculator.scss'

const getSum = arr => {
  if (!arr) {
    arr = []
    localStorage.setItem('accounts', JSON.stringify(arr))
  }

  if (!arr.length) {
    return 0
  }

  const reducer = (accumulator = 0, currentValue) => {
    return accumulator + currentValue.val
  }

  let sum = arr.reduce(reducer, 0)

  sum = sum.toFixed(5)

  const DECIMALS = 5

  const coef = Math.pow(10, DECIMALS) // 100000 if DECIMALS = 5

  sum = Math.floor(sum * coef)

  sum = sum / coef

  return sum.toFixed(DECIMALS)
}

const getLocalAccounts = () => {
  const accounts = localStorage.getItem('accounts')

  return JSON.parse(accounts)
}

const setLocalAccounts = accounts => {
  localStorage.setItem('accounts', JSON.stringify(accounts))
}

export const Calculator = () => {
  const [accountName, setAccountName] = useState('')
  const [accounts, setAccounts] = useState(getLocalAccounts() || [])

  const [total, setTotal] = useState(accounts ? 0 : getSum(accounts))

  const addAccount = _ => {
    const newAccounts = [
      ...accounts,
      { id: Date.now(), name: accountName, val: 0 },
    ].sort((a, b) => a.name - b.name)

    setLocalAccounts(newAccounts)
    setAccounts(newAccounts)

    setAccountName('')
  }

  const removeAccount = id => {
    const newAccounts = accounts.filter(a => a.id !== id)

    setLocalAccounts(newAccounts)
    setAccounts(newAccounts)
  }

  const handleChangeAccount = (account, evt) => {
    const newAccounts = [...accounts]

    const index = newAccounts.findIndex(a => a.id === account.id)

    newAccounts[index].val = +evt.target.value

    setLocalAccounts(newAccounts)
    setAccounts(newAccounts)
  }

  useEffect(() => {
    setTotal(getSum(accounts))
  }, [accounts])

  return (
    <>
      <h2>Calculette de BTC, total : {total}</h2>

      <div className='calculator'>
        <div className='add-account'>
          <input
            value={accountName}
            onChange={evt => setAccountName(evt.target.value)}
            type='text'
            name='name'
            placeholder='nom du compte'
          />

          <button onClick={addAccount}>+</button>
        </div>

        <div className='accounts'>
          {accounts.length ? (
            accounts.map(a => (
              <div className='account' key={a.id}>
                <label>{a.name}</label>

                <input
                  onChange={evt => handleChangeAccount(a, evt)}
                  type='number'
                  name={a.name}
                  value={a.val}
                />

                <button onClick={() => removeAccount(a.id)}>X</button>
              </div>
            ))
          ) : (
            <p>Il n'y a pas de compte.</p>
          )}
        </div>
      </div>
    </>
  )
}
