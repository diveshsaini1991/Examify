import React, { useEffect, useState } from 'react';
import { Download, Award, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/results', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        
        const data = await response.json();
        setResults(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchResults();
  }, []);

  const downloadCertificate = async (resultId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/results/certificate/${resultId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Failed to download certificate');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${resultId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-600">Loading your results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-red-100 p-6 rounded-lg flex items-center text-red-700">
          <AlertCircle className="h-6 w-6 mr-2" />
          <p>Error loading results: {error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Award className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Your Exam Results</h1>
        </div>

        {results.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">You haven't taken any exams yet.</p>
            <button 
              onClick={() => window.history.back()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              Back to Exams
            </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {results.map(result => (
              <li key={result._id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{result.exam.title}</h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Completed on {new Date(result.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {result.passed ? 
                        <CheckCircle className="h-6 w-6 text-green-500 mr-2" /> : 
                        <XCircle className="h-6 w-6 text-red-500 mr-2" />
                      }
                      <span className={`font-bold ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
                        {result.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">Score</span>
                      <span className={`font-bold text-lg ${getScoreColor((result.score/result.exam.questions.length)*100)}`}>
                        {(result.score/result.exam.questions.length)*100}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          result.passed ? 'bg-green-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${(result.score/result.exam.questions.length)*100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {result.passed && (
                    <div className="mt-6">
                      <button 
                        onClick={() => downloadCertificate(result._id)} 
                        className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        Download Certificate
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Results;