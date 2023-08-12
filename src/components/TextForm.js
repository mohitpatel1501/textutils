import React, { useState } from 'react';

export default function TextForm(props) {

    const [Text, setText] = useState('');

    const handleonChange = (event) => {
        setText(event.target.value);
    }

    const handleUpclick = () => {
        let newText = Text.toUpperCase();
        setText(newText);
        props.showAlert('Converted to Uppercase','success');
    }

    const handleLowclick = () => {
        let newText = Text.toLowerCase();
        setText(newText);
        props.showAlert('Converted to Lowercase','success');
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(Text);
        props.showAlert('Text Copied to clipboard','success');

    }

    const handleClearclick = () => {
        let newText = "";
        setText(newText);
        
    }

    const handleExtraspaces = () => {
        let newText = Text.split(/[ ]+/);
        setText(newText.join(" "));
    }

    const readText = () => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = Text;
        window.speechSynthesis.speak(msg);
    }

    return (
        <div className='container my-3 px-3' style={{color : props.mode === 'dark' ? 'white' : '#042743'}}>
            <div className="container my-2">
                <h2 >{props.heading}</h2>
                <div className="form-group mb-2">

                    <textarea className="form-control" value={Text} onChange={handleonChange} style={{backgroundColor : props.mode === 'dark' ? '#042743' : 'white',color : props.mode === 'dark' ? 'white' : '#042743'}} id="myBox" rows="7" placeholder='Enter Your Text Here'></textarea>
                </div>
                <div className="container d-flex justify-content-center flex-wrap">
                    <button disabled={Text.length===0} className="btn btn-primary mx-1 my-1 btn-block" onClick={handleUpclick}>UPPERCASE</button>
                    <button disabled={Text.length===0} className="btn btn-primary mx-1 my-1 btn-block" onClick={handleLowclick}>LOWERCASE</button>
                    <button disabled={Text.length===0}className="btn btn-primary mx-1 my-1 btn-block" onClick={handleCopy}>COPY TEXT</button>
                    <button disabled={Text.length===0} className="btn btn-primary mx-1 my-1 btn-block" onClick={handleClearclick}>CLEAR TEXT</button>
                    <button  disabled={Text.length===0} className="btn btn-primary mx-1 my-1 btn-block" onClick={handleExtraspaces}>REMOVE EXTRA SPACE</button>
                    <button disabled={Text.length===0} onClick={readText} className="btn btn-primary mx-1 my-1">READ ALOUD</button>
                </div>
            </div>

            <div className="container my-2">
                <h3>Text Analysis Summary</h3>
                <p>No. of words : <strong>{Text.split(/\s+/).filter((element)=>{return element.length!==0}).length}</strong></p>
                <p>No. of characters : <strong>{Text.length}</strong></p>
                <p>Reading Time (minutes) : <strong>{0.008 * Text.split(" ").filter((element)=>{return element.length!==0}).length}</strong></p>
                <h4>Preview</h4>
                <div className="container my-1 py-1 rounded" style={{border:'1px solid', borderColor:props.mode === 'dark' ? 'white' : 'lightgrey',minHeight:'70px'}}>
                <p>{Text.length>0? Text : 'Nothing To Preview'}</p>
                </div>
            </div>
        </div>
    );
}
