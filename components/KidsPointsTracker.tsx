import React, { useState, useEffect } from 'react';
import { Plus, Minus, Star, Trophy, Gift, Heart, Save, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const KidsPointsTracker = () => {
  const [children] = useState([
    { id: 1, name: 'Gaia', color: 'pink', bgColor: 'bg-pink-100', textColor: 'text-pink-800', borderColor: 'border-pink-300' },
    { id: 2, name: 'Mattia', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800', borderColor: 'border-blue-300' },
    { id: 3, name: 'Michele', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800', borderColor: 'border-green-300' },
    { id: 4, name: 'Pietro', color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-800', borderColor: 'border-purple-300' }
  ]);

  const [points, setPoints] = useState({
    1: 0, 2: 0, 3: 0, 4: 0
  });

  const [history, setHistory] = useState([]);
  const [selectedChild, setSelectedChild] = useState(1);
  const [pointsToAdd, setPointsToAdd] = useState('');
  const [reason, setReason] = useState('');
  
  // Database integration 
  const [saveStatus, setSaveStatus] = useState('idle'); // idle, saving, success, error
  const [lastError, setLastError] = useState('');

  // Load data from database on startup
  useEffect(() => {
    loadDataFromDatabase();
  }, []);



  const loadDataFromDatabase = async () => {
    try {
      setSaveStatus('saving');
      const response = await fetch('/api/points', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.points) setPoints(data.points);
        if (data.history) setHistory(data.history);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        throw new Error(`Errore server: ${response.status}`);
      }
    } catch (error) {
      console.error('Errore caricamento dati:', error);
      setSaveStatus('error');
      setLastError('Errore connessione database - controlla la configurazione');
      setTimeout(() => setSaveStatus('idle'), 10000);
    }
  };

  const saveToDatabase = async (newPoints, newHistory) => {
    try {
      setSaveStatus('saving');
      setLastError('');
      
      const response = await fetch('/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'save',
          points: newPoints,
          history: newHistory,
          timestamp: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        const errorText = await response.text();
        throw new Error(`Errore server: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      setSaveStatus('error');
      setLastError(`Errore salvataggio: ${error.message}`);
      console.error('Errore salvataggio:', error);
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  const addPoints = (childId, pointsValue, reason, isPositive = true) => {
    const actualPoints = isPositive ? pointsValue : -pointsValue;
    const newPoints = {
      ...points,
      [childId]: Math.max(0, points[childId] + actualPoints)
    };
    
    const child = children.find(c => c.id === childId);
    const newHistoryEntry = {
      id: Date.now(),
      childId,
      childName: child.name,
      points: actualPoints,
      reason,
      timestamp: new Date().toLocaleString('it-IT'),
      color: child.color
    };
    
    const newHistory = [newHistoryEntry, ...history];
    
    setPoints(newPoints);
    setHistory(newHistory);
    
    // Auto-save to Database
    saveToDatabase(newPoints, newHistory);
  };

  const handleSubmit = (isPositive = true) => {
    const pointsValue = parseInt(pointsToAdd);
    if (pointsValue && reason.trim()) {
      addPoints(selectedChild, pointsValue, reason.trim(), isPositive);
      setPointsToAdd('');
      setReason('');
    }
  };

  const getTopThree = () => {
    return children
      .map(child => ({ ...child, points: points[child.id] }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 3);
  };

  const getIcon = (position) => {
    switch(position) {
      case 0: return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 1: return <Star className="w-6 h-6 text-gray-400" />;
      case 2: return <Gift className="w-6 h-6 text-orange-400" />;
      default: return <Heart className="w-5 h-5" />;
    }
  };

  const getSaveStatusIcon = () => {
    switch(saveStatus) {
      case 'saving': return <Loader className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Save className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4 pb-20">
      <div className="max-w-6xl mx-auto">


        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              🌟 Scoreboard dei Punti 🌟
            </h1>
            <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
              {getSaveStatusIcon()}
              <span className="text-white text-sm">
                {saveStatus === 'saving' && 'Salvando nel database...'}
                {saveStatus === 'success' && 'Salvato nel database!'}
                {saveStatus === 'error' && 'Errore database - controlla configurazione'}
                {saveStatus === 'idle' && 'Database collegato ✅'}
              </span>
            </div>
          </div>
          <p className="text-white text-lg opacity-90">
            Traccia i punti di Gaia, Mattia, Michele e Pietro!
          </p>
          {saveStatus === 'error' && (
            <div className="mt-4 bg-red-500 bg-opacity-20 backdrop-blur rounded-2xl p-4">
              <p className="text-white text-sm mb-2">
                ⚠️ <strong>Errore Database:</strong> {lastError}
              </p>
              <button
                onClick={() => loadDataFromDatabase()}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold"
              >
                🔄 Riprova connessione
              </button>
            </div>
          )}
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            🏆 Classifica Generale 🏆
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {children.map(child => {
              const childPoints = points[child.id];
              const position = getTopThree().findIndex(t => t.id === child.id);
              return (
                <div
                  key={child.id}
                  className={`${child.bgColor} ${child.borderColor} border-2 rounded-2xl p-4 text-center transform transition-all hover:scale-105`}
                >
                  <div className="flex justify-center mb-2">
                    {position < 3 ? getIcon(position) : <Heart className={`w-6 h-6 text-${child.color}-500`} />}
                  </div>
                  <h3 className={`text-xl font-bold ${child.textColor} mb-2`}>{child.name}</h3>
                  <div className={`text-3xl font-bold ${child.textColor}`}>{childPoints}</div>
                  <div className="text-sm text-gray-600 mt-1">punti</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              ⚡ Gestisci Punti ⚡
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  👦 Seleziona bambino:
                </label>
                <select
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(parseInt(e.target.value))}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
                >
                  {children.map(child => (
                    <option key={child.id} value={child.id}>{child.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  🔢 Punti da aggiungere/sottrarre:
                </label>
                <input
                  type="number"
                  value={pointsToAdd}
                  onChange={(e) => setPointsToAdd(e.target.value)}
                  min="1"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Es: 5"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  📝 Motivazione:
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Es: Ha aiutato in cucina"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleSubmit(true)}
                  disabled={!pointsToAdd || !reason.trim() || saveStatus === 'error'}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <Plus className="w-5 h-5" />
                  Aggiungi
                </button>
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={!pointsToAdd || !reason.trim() || saveStatus === 'error'}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <Minus className="w-5 h-5" />
                  Sottrai
                </button>
              </div>
              
              {saveStatus === 'error' && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                  <p className="text-yellow-800 text-sm text-center">
                    ⚠️ <strong>Errore Database</strong> - verifica la configurazione
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* History */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              📚 Registro Attività 📚
            </h2>
            
            <div className="max-h-96 overflow-y-auto space-y-3">
              {history.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-2">📝</div>
                  <p>Nessuna attività ancora registrata!</p>
                </div>
              ) : (
                history.map(entry => (
                  <div
                    key={entry.id}
                    className={`bg-${entry.color}-50 border-l-4 border-${entry.color}-400 p-4 rounded-r-xl`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">
                          {entry.childName}
                          <span className={`ml-2 ${entry.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {entry.points > 0 ? '+' : ''}{entry.points} punti
                          </span>
                        </div>
                        <div className="text-gray-600 mt-1">{entry.reason}</div>
                        <div className="text-xs text-gray-500 mt-2">{entry.timestamp}</div>
                      </div>
                      <div className={`text-2xl ${entry.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {entry.points > 0 ? '😊' : '😔'}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-8 mb-8">
          <div className="bg-white rounded-3xl p-4 shadow-2xl inline-block">
            <p className="text-lg font-bold text-gray-800">
              🎉 Continuate così! Ogni punto conta! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsPointsTracker; 