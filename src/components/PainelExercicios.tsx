import React, { useState, useRef, useEffect } from 'react';
import { FRASES_REPETICAO, DIALOGOS, VOCABULARIO_COMPLETO } from '../dados/exercicios-28dias';

interface ExercisePanelProps {
  pillarCode: 'E' | 'C' | 'V';
  weekIndex: number;
  onComplete?: () => void;
}

export const PainelExercicios: React.FC<ExercisePanelProps> = ({ pillarCode, weekIndex, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const levenshteinDistance = (a: string, b: string): number => {
    const lenA = a.length;
    const lenB = b.length;
    const matrix: number[][] = Array(lenB + 1).fill(null).map(() => Array(lenA + 1).fill(0));

    for (let i = 0; i <= lenA; i++) matrix[0][i] = i;
    for (let j = 0; j <= lenB; j++) matrix[j][0] = j;

    for (let j = 1; j <= lenB; j++) {
      for (let i = 1; i <= lenA; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[lenB][lenA];
  };

  const calculateScore = (expected: string, received: string): number => {
    const similarity = 1 - (levenshteinDistance(expected.toLowerCase(), received.toLowerCase()) / Math.max(expected.length, received.length));
    return Math.round(Math.max(0, Math.min(10, similarity * 10)));
  };

  const playAudio = (text: string, lang: string = 'es-MX') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setTranscript('');

      const recognitionAPI = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (recognitionAPI) {
        const recognition = new recognitionAPI();
        recognition.lang = 'es-ES';
        recognition.start();

        recognition.onresult = (event: any) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              interim += transcript;
            }
          }
          if (isMountedRef.current) {
            setTranscript(interim);
          }
        };

        recognition.onerror = () => {
          if (isMountedRef.current) {
            setIsRecording(false);
          }
        };

        setTimeout(() => {
          recognition.stop();
          if (isMountedRef.current) {
            setIsRecording(false);
          }
        }, 5000);
      }
    } catch (error) {
      console.error('Erro ao acessar microfone:', error);
    }
  };

  const handleScore = () => {
    if (pillarCode === 'E' || pillarCode === 'V') {
      const current = pillarCode === 'E' 
        ? FRASES_REPETICAO[currentIndex]
        : VOCABULARIO_COMPLETO[currentIndex];
      
      const calculatedScore = calculateScore(current.es, transcript);
      setScore(calculatedScore);
    }
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
    setScore(null);
    setTranscript('');
  };

  const getColorByScore = (s: number): string => {
    if (s < 3) return '#CE1126';
    if (s < 6) return '#E86A33';
    if (s < 8) return '#FFD700';
    return '#006847';
  };

  if (pillarCode === 'E') {
    const frases = FRASES_REPETICAO.filter(f => f.day === currentIndex + 1).slice(0, 1);
    if (!frases.length) return <div>Sem frases para este dia</div>;

    const frase = frases[0];

    return (
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Estrutura Falada - Dia {frase.day}</h3>
        <p><strong>Espanhol:</strong> {frase.es}</p>
        <p><strong>Português:</strong> {frase.pt}</p>
        
        <button onClick={() => playAudio(frase.es)}>🔊 Ouvir</button>
        <button onClick={startRecording} disabled={isRecording}>🎤 Gravar</button>
        
        {transcript && <p>Transcrição: {transcript}</p>}
        
        <button onClick={handleScore} disabled={!transcript}>Validar</button>
        
        {score !== null && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: getColorByScore(score), color: 'white', borderRadius: '4px' }}>
            Score: {score}/10
          </div>
        )}
        
        <button onClick={handleNext} style={{ marginTop: '10px' }}>Próxima →</button>
      </div>
    );
  }

  if (pillarCode === 'C') {
    const dialogo = DIALOGOS[currentIndex];
    if (!dialogo) return <div>Sem diálogos para este dia</div>;

    return (
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>{dialogo.title}</h3>
        <div>
          {dialogo.turns.map((turn, idx) => (
            <div key={idx} style={{ marginBottom: '10px', padding: '10px', backgroundColor: turn.speaker === 'app' ? '#f0f0f0' : '#e0e0ff', borderRadius: '4px' }}>
              <p><strong>{turn.speaker === 'app' ? 'App' : 'Você'}:</strong> {turn.es}</p>
              <p style={{ fontSize: '0.9em', color: '#666' }}>{turn.pt}</p>
              <button onClick={() => playAudio(turn.es)}>🔊 Ouvir</button>
            </div>
          ))}
        </div>
        <button onClick={handleNext} style={{ marginTop: '10px' }}>Próximo Diálogo →</button>
      </div>
    );
  }

  if (pillarCode === 'V') {
    const palavras = VOCABULARIO_COMPLETO.filter(v => v.day === currentIndex + 1);
    if (!palavras.length) return <div>Sem palavras para este dia</div>;

    const palavra = palavras[currentIndex % palavras.length];

    return (
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Vocabulário - Dia {palavra.day}</h3>
        <p><strong>Espanhol:</strong> {palavra.es}</p>
        <p><strong>Português:</strong> {palavra.pt}</p>
        <p><strong>Categoria:</strong> {palavra.cat}</p>
        <p><strong>Exemplo:</strong> {palavra.exemplo}</p>
        
        <button onClick={() => playAudio(palavra.es)}>🔊 Ouvir</button>
        <button onClick={startRecording} disabled={isRecording}>🎤 Gravar</button>
        
        {transcript && <p>Transcrição: {transcript}</p>}
        
        <button onClick={handleScore} disabled={!transcript}>Validar</button>
        
        {score !== null && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: getColorByScore(score), color: 'white', borderRadius: '4px' }}>
            Score: {score}/10
          </div>
        )}
        
        <button onClick={handleNext} style={{ marginTop: '10px' }}>Próxima →</button>
      </div>
    );
  }

  return null;
};
