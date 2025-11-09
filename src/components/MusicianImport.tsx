import React, { useState } from 'react';
import { Upload, FileText, Users, Bot, CheckCircle, AlertCircle } from 'lucide-react';
import { Musician } from '../types';
import { generateId } from '../utils/helpers';

interface MusicianImportProps {
  onImportComplete: (musicians: Musician[]) => void;
}

export const MusicianImport: React.FC<MusicianImportProps> = ({ onImportComplete }) => {
  const [importMethod, setImportMethod] = useState<'csv' | 'chatbot'>('csv');
  const [csvText, setCsvText] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'ai', message: string }>>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count: number; message: string } | null>(null);

  const parseCSV = (text: string): Musician[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('Le fichier CSV doit contenir au moins un en-tête et une ligne de données');
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const musicians: Musician[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length < headers.length) continue;

      const musician: Musician = {
        id: generateId(),
        firstName: '',
        lastName: '',
        instrument: '',
        isStudent: false,
        createdAt: new Date(),
      };

      headers.forEach((header, index) => {
        const value = values[index];
        switch (header) {
          case 'prénom':
          case 'prenom':
          case 'firstname':
          case 'first name':
            musician.firstName = value;
            break;
          case 'nom':
          case 'lastname':
          case 'last name':
            musician.lastName = value;
            break;
          case 'instrument':
            musician.instrument = value;
            break;
          case 'étudiant':
          case 'etudiant':
          case 'student':
          case 'isstudent':
            musician.isStudent = ['oui', 'yes', 'true', '1'].includes(value.toLowerCase());
            break;
          case 'email':
          case 'courriel':
            musician.email = value;
            break;
          case 'téléphone':
          case 'telephone':
          case 'phone':
            musician.phone = value;
            break;
          case 'notes':
            musician.notes = value;
            break;
          case 'micro':
          case 'needsmic':
          case 'needs mic':
            musician.needsMic = ['oui', 'yes', 'true', '1'].includes(value.toLowerCase());
            break;
          case 'di':
          case 'needsdi':
          case 'needs di':
            musician.needsDI = ['oui', 'yes', 'true', '1'].includes(value.toLowerCase());
            break;
          case 'input mic':
          case 'inputmic':
          case 'needsinputmic':
          case 'needs input mic':
            musician.needsInputMic = ['oui', 'yes', 'true', '1'].includes(value.toLowerCase());
            break;
        }
      });

      if (musician.firstName && musician.lastName && musician.instrument) {
        musicians.push(musician);
      }
    }

    return musicians;
  };

  const handleCSVImport = async () => {
    setImporting(true);
    setResult(null);

    try {
      const musicians = parseCSV(csvText);
      if (musicians.length === 0) {
        throw new Error('Aucun musicien valide trouvé dans le CSV');
      }

      onImportComplete(musicians);
      setResult({
        success: true,
        count: musicians.length,
        message: `${musicians.length} musicien(s) importé(s) avec succès!`,
      });
      setCsvText('');
    } catch (err: any) {
      setResult({
        success: false,
        count: 0,
        message: err.message || 'Erreur lors de l\'import CSV',
      });
    } finally {
      setImporting(false);
    }
  };

  const handleChatbotSubmit = async () => {
    if (!chatInput.trim()) return;

    setImporting(true);
    const userMessage = chatInput.trim();
    setChatInput('');

    // Add user message to history
    setChatHistory(prev => [...prev, { role: 'user', message: userMessage }]);

    try {
      // Simulate AI response (in real app, this would call an AI API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Parse the user input for musician information
      const musicians = parseChatbotInput(userMessage);

      if (musicians.length > 0) {
        onImportComplete(musicians);
        
        const aiMessage = `✅ J'ai créé ${musicians.length} musicien(s):\n\n${musicians.map(m => 
          `• ${m.firstName} ${m.lastName} - ${m.instrument}${m.isStudent ? ' (Étudiant)' : ''}`
        ).join('\n')}\n\nVoulez-vous ajouter d'autres musiciens?`;

        setChatHistory(prev => [...prev, { role: 'ai', message: aiMessage }]);
        setResult({
          success: true,
          count: musicians.length,
          message: `${musicians.length} musicien(s) ajouté(s)!`,
        });
      } else {
        const aiMessage = `Je n'ai pas pu identifier de musiciens dans votre message. 

Essayez un format comme:
- "Ajoute Pierre Dubois au piano"
- "Marie Martin joue du violon, c'est une étudiante"
- "Jean Tremblay - saxophone, professionnel"

Comment puis-je vous aider?`;

        setChatHistory(prev => [...prev, { role: 'ai', message: aiMessage }]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { 
        role: 'ai', 
        message: '❌ Désolé, une erreur s\'est produite. Pouvez-vous reformuler?' 
      }]);
    } finally {
      setImporting(false);
    }
  };

  const parseChatbotInput = (input: string): Musician[] => {
    const musicians: Musician[] = [];
    const lines = input.split(/[,;]|\n/).map(l => l.trim()).filter(l => l);

    // Patterns to match
    const patterns = [
      // "Prénom Nom - instrument"
      /^([A-Za-zÀ-ÿ\-]+)\s+([A-Za-zÀ-ÿ\-]+)\s*[-:]\s*(.+)$/i,
      // "Prénom Nom joue du/de la instrument"
      /^([A-Za-zÀ-ÿ\-]+)\s+([A-Za-zÀ-ÿ\-]+)\s+(?:joue|plays)\s+(?:du|de la|de l'|the)?\s*(.+)$/i,
      // "Ajoute Prénom Nom au/à la instrument"
      /^(?:ajoute|add|crée|create)\s+([A-Za-zÀ-ÿ\-]+)\s+([A-Za-zÀ-ÿ\-]+)\s+(?:au|à la|à l'|on|at the)?\s*(.+)$/i,
    ];

    for (const line of lines) {
      const cleanLine = line.replace(/^\d+[\.\)]\s*/, ''); // Remove numbering

      for (const pattern of patterns) {
        const match = cleanLine.match(pattern);
        if (match) {
          const [, firstName, lastName, instrumentPart] = match;
          const isStudent = /étudiant|student|élève/i.test(cleanLine);
          
          // Clean instrument name
          let instrument = instrumentPart
            .replace(/\(.*?\)/g, '') // Remove parentheses
            .replace(/étudiant|student|élève|professionnel|professional/gi, '')
            .trim();

          musicians.push({
            id: generateId(),
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
            lastName: lastName.toUpperCase(),
            instrument: instrument.charAt(0).toUpperCase() + instrument.slice(1).toLowerCase(),
            isStudent,
            createdAt: new Date(),
          });
          break;
        }
      }
    }

    return musicians;
  };

  const csvTemplate = `Prénom,Nom,Instrument,Étudiant,Email,Téléphone,Micro,DI,Input Mic,Notes
Pierre,Dubois,Piano,oui,pierre@email.com,555-0001,oui,non,oui,Niveau avancé
Marie,Martin,Violon,non,marie@email.com,555-0002,oui,non,non,Professeur
Jean,Tremblay,Saxophone,oui,jean@email.com,555-0003,oui,oui,non,Débutant`;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Users size={24} />
          Import de Musiciens
        </h3>
      </div>

      <div style={{ padding: '1.5rem' }}>
        {/* Method Selection */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '0.5rem',
          background: 'var(--cream)',
          borderRadius: '8px',
        }}>
          <button
            className={`btn ${importMethod === 'csv' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setImportMethod('csv')}
            style={{ flex: 1 }}
          >
            <FileText size={18} /> Import CSV
          </button>
          <button
            className={`btn ${importMethod === 'chatbot' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setImportMethod('chatbot')}
            style={{ flex: 1 }}
          >
            <Bot size={18} /> Assistant AI
          </button>
        </div>

        {/* CSV Import */}
        {importMethod === 'csv' && (
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)' }}>
              Import CSV
            </h4>

            <div style={{
              padding: '1rem',
              background: 'rgba(212, 175, 55, 0.1)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid var(--secondary)',
            }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Format CSV attendu:</strong>
              <pre style={{
                background: 'var(--white)',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.8125rem',
                border: '1px solid var(--border)',
              }}>
                {csvTemplate}
              </pre>
              <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--gray)' }}>
                <strong>Colonnes supportées:</strong> Prénom, Nom, Instrument, Étudiant, Email, Téléphone, Notes
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Collez votre CSV ici:</label>
              <textarea
                className="form-textarea"
                rows={10}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder={csvTemplate}
                style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={handleCSVImport}
              disabled={importing || !csvText.trim()}
            >
              <Upload size={18} />
              {importing ? 'Import en cours...' : 'Importer les musiciens'}
            </button>
          </div>
        )}

        {/* Chatbot Import */}
        {importMethod === 'chatbot' && (
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)' }}>
              <Bot size={20} /> Assistant AI pour Musiciens
            </h4>

            <div style={{
              padding: '1rem',
              background: 'rgba(139, 21, 56, 0.05)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid var(--primary)',
            }}>
              <strong>💬 Exemples de commandes:</strong>
              <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', fontSize: '0.875rem', lineHeight: '1.8' }}>
                <li>"Ajoute Pierre Dubois au piano"</li>
                <li>"Marie Martin joue du violon, c'est une étudiante"</li>
                <li>"Crée Jean Tremblay - saxophone, professionnel"</li>
                <li>"Liste: Sophie Lavoie - flûte, Marc Beaulieu - guitare (étudiant)"</li>
              </ul>
            </div>

            {/* Chat History */}
            <div style={{
              minHeight: '300px',
              maxHeight: '400px',
              overflowY: 'auto',
              padding: '1rem',
              background: 'var(--cream)',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: '1px solid var(--border)',
            }}>
              {chatHistory.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--gray)', padding: '2rem' }}>
                  <Bot size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p>Bonjour! Je suis votre assistant pour ajouter des musiciens.</p>
                  <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    Décrivez-moi les musiciens que vous souhaitez ajouter...
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        background: msg.role === 'user' ? 'var(--primary)' : 'var(--white)',
                        color: msg.role === 'user' ? 'white' : 'var(--dark)',
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      <strong style={{ display: 'block', marginBottom: '0.5rem' }}>
                        {msg.role === 'user' ? '👤 Vous' : '🤖 Assistant'}
                      </strong>
                      {msg.message}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatbotSubmit()}
                placeholder="Décrivez les musiciens à ajouter..."
                disabled={importing}
                style={{ flex: 1 }}
              />
              <button
                className="btn btn-primary"
                onClick={handleChatbotSubmit}
                disabled={importing || !chatInput.trim()}
              >
                Envoyer
              </button>
            </div>
          </div>
        )}

        {/* Result Message */}
        {result && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: result.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${result.success ? 'var(--success)' : 'var(--danger)'}`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            {result.success ? <CheckCircle size={20} color="var(--success)" /> : <AlertCircle size={20} color="var(--danger)" />}
            <div>
              <strong>{result.message}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
