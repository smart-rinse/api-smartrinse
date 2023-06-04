export function generateTransactionNumber() {
    const prefix = 'T-', randomNumber = Math.floor(Math.random() * 1000)
    return prefix + randomNumber
  }
  
