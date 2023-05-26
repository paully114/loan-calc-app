import React, { useState } from 'react';
import './LoanCalculator.css';

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [numMonths, setNumMonths] = useState(12);
  const [interestRate] = useState(3.5);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleNumMonthsChange = (e) => {
    setNumMonths(parseInt(e.target.value));
  };

  const calculateMonthlyInstallment = () => {
    const parsedLoanAmount = parseFloat(loanAmount);
    if (isNaN(parsedLoanAmount)) {
      setMonthlyInstallment(0);
    } else {
      const monthlyInterestRate = interestRate / 100 / 12;
      const denominator = 1 - Math.pow(1 + monthlyInterestRate, -numMonths);
      const calculatedMonthlyInstallment =
        parsedLoanAmount * monthlyInterestRate / denominator;
      setMonthlyInstallment(calculatedMonthlyInstallment);
    }
  };

  return (
    <div className="loan-calculator">
      <h2 className="calculator-heading">Loan Calculator</h2>
      <div className="input-container">
        <label htmlFor="loanAmount" className="input-label">Loan Amount (₱):</label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          onChange={handleLoanAmountChange}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="numMonths" className="input-label">Loan Duration (months):</label>
        <select
          id="numMonths"
          value={numMonths}
          onChange={handleNumMonthsChange}
          className="input-field"
        >
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={12}>12</option>
        </select>
      </div>
      <button onClick={calculateMonthlyInstallment} className="calculate-button">Calculate</button>
      <h3 className="interest-rate">Interest Rate: {interestRate}%</h3>
      <h3 className="installment-heading">Monthly Installment:</h3>
      <p className="installment-amount">₱{monthlyInstallment.toFixed(2)}</p>
    </div>
  );
}

export default LoanCalculator;
