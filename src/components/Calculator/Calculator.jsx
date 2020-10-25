import React, { useState } from 'react'

import './Calculator.scss'

const getSum = arr => {
  if (!arr.length) {
    return 0
  }

  const reducer = (accumulator = 0, currentValue) => {
    return accumulator + currentValue.val
  }

  const sum = arr.reduce(reducer, 0)

  return sum
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
  const [accounts, setAccounts] = useState(getLocalAccounts || [])

  const [total, setTotal] = useState(getSum(accounts))

  const addAccount = _ => {
    const newAccounts = [
      ...accounts,
      { id: Date.now(), name: accountName, val: 0 },
    ].sort((a, b) => a.name - b.name)

    setAccounts(newAccounts)
    setLocalAccounts(newAccounts)

    const newTotal = getSum(newAccounts)

    setTotal(newTotal)

    setAccountName('')
  }

  const removeAccount = id => {
    const newAccounts = accounts.filter(a => a.id !== id)

    setAccounts(newAccounts)
    setLocalAccounts(newAccounts)

    setTotal(getSum(newAccounts))
  }

  const handleChangeAccount = (account, evt) => {
    const newAccounts = [...accounts]

    const index = newAccounts.findIndex(a => a.id === account.id)

    newAccounts[index].val = +evt.target.value

    setAccounts(newAccounts)
    setLocalAccounts(newAccounts)

    setTotal(getSum(newAccounts).toFixed(3))
  }

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
