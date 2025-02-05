import React, { useState, useEffect, useRef } from 'react';
import { SkipForward, Mic, MicOff } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface VerseInputProps {
  onSubmit: (answer: string | null) => void;
  disabled?: boolean;
  attemptsLeft?: number;
}

export const VerseInput: React.FC<VerseInputProps> = ({ 
  onSubmit, 
  disabled,
  attemptsLeft
}) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);


  const lastTranscript = useRef<string>(''); // Track the last transcribed word

  useEffect(() => {
    // Check if the browser supports SpeechRecognition
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current!.continuous = true; // Keep listening
      recognitionRef.current!.interimResults = true; // Show results as you speak
      recognitionRef.current!.lang = 'en-GB'; // Language setting

      recognitionRef.current!.onresult = (event: SpeechRecognitionEvent) => {
        let newTranscript = '';

        // Loop through the results and get the most recent words
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            // If the result is final, use it
            newTranscript += result;
          }
        }

        // Check if a delete or backspace command is spoken
        if (newTranscript.toLowerCase().includes('delete') || newTranscript.toLowerCase().includes('backspace')) {
          setInput((prevInput) => prevInput.trim().split(' ').slice(0, -1).join(' ')); // Remove the last word
        } else if (newTranscript !== lastTranscript.current) {
          setInput((prevInput) => prevInput + ' ' + newTranscript); // Append the unique transcribed text
          lastTranscript.current = newTranscript; // Update the last word tracked
        }
      };

      recognitionRef.current!.onerror = (event: { error: any; }) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current!.onend = () => {
        if (isRecording && recognitionRef.current) {
          recognitionRef.current.start(); // Auto-restart if still recording
        }
      };
    } else {
      console.warn('SpeechRecognition is not supported in this browser.');
    }
  }, [isRecording]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || attemptsLeft === 0) return;
    onSubmit(input);
    setInput('');
  };

  const handleSkip = () => {
    onSubmit(null);
    setInput('');
  };

  const handleVoiceRecording = () => {
    if (recognitionRef.current) {
      if (isRecording) {
        recognitionRef.current.stop(); // Stop recording
      } else {
        recognitionRef.current.abort(); // Reset recognition if it was previously stopped
        recognitionRef.current.start(); // Start fresh
      }
    }
    setIsRecording((prev) => !prev);
  };

  const isDisabled = disabled || attemptsLeft === 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isDisabled}
          placeholder={isDisabled ? 'No more attempts remaining' : 'Type or speak the verse...'}
          className={`w-full p-4 border-2 rounded-lg form-input focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none h-32 ${
            isDisabled ? 'bg-gray-100 border-gray-200' : ''
          }`}
        />
        {attemptsLeft !== undefined && attemptsLeft > 0 && (
          <p className="mt-2 text-sm text-theme-secondary">
            {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'} remaining
          </p>
        )}
      </div>
      <div className="flex space-x-4 items-center">
        <Button 
          type="submit" 
          disabled={isDisabled || !input.trim()}
          className="flex-1"
        >
          Submit Answer
        </Button>

        {/* Voice Recording Icon */}
        <div
          onClick={handleVoiceRecording}
          className={`p-3 rounded-md cursor-pointer transition ${
            isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
        >
          {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />} {/* Use MicOff when not recording */}
        </div>

        <Button 
          type="button"
          variant="outline"
          onClick={handleSkip}
          disabled={disabled}
          className="flex items-center"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip
        </Button>
      </div>
    </form>
  );
};
