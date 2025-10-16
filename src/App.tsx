import { useState } from 'react';
import { add } from './stringCalculator';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    try {
      setError('');
      const sum = add(input);
      setResult(sum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError('');
    setResult(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', color: '#333' }}>
      <img
        src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        width={600}
        height={400}
        alt='Calculator with colorful number buttons and mathematical symbols'
        style={{ display: 'block', maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
      />

      <h1 style={{ fontSize: '32px', marginBottom: '10px', color: '#333' }}>String Calculator</h1>

      <p style={{ fontSize: '18px', marginBottom: '20px', color: '#555' }}>
        Enter numbers below to calculate their sum
      </p>

      <label 
        htmlFor='numbers-input' 
        style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px', color: '#333' }}
      >
        Numbers to calculate
      </label>
      <textarea
        id='numbers-input'
        style={{ 
          margin: '0', 
          color: '#333',
          padding: '10px',
          width: '100%',
          maxWidth: '600px',
          minHeight: '100px',
          border: '2px solid #333',
          borderRadius: '4px',
          fontSize: '16px',
          fontFamily: 'inherit',
          boxSizing: 'border-box'
        }}
        placeholder='Enter numbers (e.g., 1,2,3 or use custom delimiters)'
        value={input}
        onChange={handleInputChange}
        aria-describedby='input-help'
      />
      <p id='input-help' style={{ fontSize: '14px', color: '#555', marginTop: '8px', marginBottom: '15px' }}>
        You can use commas, newlines, or custom delimiters (e.g., //;\n1;2)
      </p>

      <button
        onClick={handleCalculate}
        style={{
          padding: '12px 24px',
          backgroundColor: '#008cba',
          color: '#fff',
          border: '2px solid #006a8e',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginTop: '10px',
          transition: 'background-color 0.2s ease'
        }}
        aria-label='Calculate the sum of entered numbers'
      >
        Calculate
      </button>

      {result !== null && (
        <div 
          role='status' 
          aria-live='polite'
          style={{ 
            color: '#006400', 
            fontSize: '20px', 
            fontWeight: 'bold', 
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#d4edda',
            border: '2px solid #006400',
            borderRadius: '4px'
          }}
        >
          <strong>Result:</strong> {result}
        </div>
      )}

      {error && (
        <div 
          role='alert' 
          aria-live='assertive'
          style={{ 
            color: '#d8000c', 
            backgroundColor: '#ffd2d2', 
            padding: '15px', 
            marginTop: '20px',
            border: '2px solid #d8000c',
            borderRadius: '4px'
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default App;
