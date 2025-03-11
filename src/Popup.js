import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import bengaliLayout from "simple-keyboard-layouts/build/layouts/bengali";

const Popup = () => {
    const [input, setInput] = useState("");
    const [translatedMessage, setTranslatedMessage] = useState("");
    const [keyboardLayout, setKeyboardLayout] = useState("default");

    const handleInputChange = (event) => setInput(event.target.value);

    const onKeyPress = (button) => {
        if (button === "{bksp}") {
            setInput(input.slice(0, -1));
        } else {
            setInput(input + button);
        }
    };

    const translateMessage = async () => {
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=bn&tl=en&dt=t&q=${encodeURI(input)}`
        );
        const data = await response.json();
        setTranslatedMessage(data[0][0][0]);
    };

    return (
        <div>
            <h3>Google Chat Translator</h3>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type in Bengali..."
            />
            <button onClick={translateMessage}>Translate to English</button>
            <div>
                <strong>Translated Message:</strong> {translatedMessage}
            </div>
            <Keyboard
                layoutName={keyboardLayout}
                layout={bengaliLayout.layout}
                onKeyPress={onKeyPress}
                onChange={setInput}
            />
        </div>
    );
};

export default Popup;
