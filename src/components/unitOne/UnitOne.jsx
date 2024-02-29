import React, { useState, useEffect } from 'react';
import './unitOne.css'

const UnitOne = () => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [textToSpeak, setTextToSpeak] = useState('');

    useEffect(() => {
        const fetchVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            const englishVoices = availableVoices.filter(voice => voice.lang.startsWith('en'));
            setVoices(englishVoices);
            setSelectedVoice(englishVoices[0]);
        };

        window.speechSynthesis.onvoiceschanged = fetchVoices;
        fetchVoices();

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const speak = () => {
        if (!textToSpeak || !selectedVoice) return;
        const message = new SpeechSynthesisUtterance(textToSpeak);
        message.voice = selectedVoice;
        window.speechSynthesis.speak(message);
    };

    return (
        <div className="unit-one">
            <h2>Unit One: "Write word or sentence"</h2>
            <select className="voice-select" value={selectedVoice ? selectedVoice.name : ''} onChange={e => setSelectedVoice(voices.find(voice => voice.name === e.target.value))}>
                {voices.map((voice, index) => (
                    <option key={index} value={voice.name}>
                        {voice.name}
                    </option>
                ))}
            </select>
            <input className="text-input" type="text" value={textToSpeak} onChange={e => setTextToSpeak(e.target.value)} placeholder="Enter text to speak" />
            <button className="speak-button" onClick={speak}>Speak</button>
        </div>
    );
};

export default UnitOne;
