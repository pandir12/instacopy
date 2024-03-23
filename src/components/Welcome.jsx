import React, { useState, useRef, useEffect } from "react";
import { saveinDb } from "../services/save";
import { removeinDB } from "../services/remove";
const currenturl = window.location.href;

export default function Welcome() {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [copied, setCopied] = useState(false);
    const textAreaRef = useRef(null);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            removeinDB(room);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const createRoom = () => {
        let roomName = name + new Date().valueOf();
        setRoom(roomName.replace(/\s+/g, ''));
    }

    const saveText = (data) => {
        // Save text with newline characters preserved as \n
        saveinDb(room, data);
    }

    const handleTextAreaChange = (event) => {
        const textarea = textAreaRef.current;
        textarea.style.height = ""; // Reset the height to auto
        textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
    };

    const handleKeyPress = (event) => {
        // If Enter key is pressed
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior (line break)
            const textarea = textAreaRef.current;
            const cursorPosition = textarea.selectionStart; // Get cursor position
            const currentValue = textarea.value;

            // Insert newline character at cursor position
            const newValue =
                currentValue.substring(0, cursorPosition) +
                "\n" +
                currentValue.substring(cursorPosition);

            // Update textarea value and cursor position
            textarea.value = newValue;
            textarea.selectionStart = cursorPosition + 1; // Set cursor position after inserted newline character
            textarea.selectionEnd = cursorPosition + 1;
            textarea.dispatchEvent(new Event('input')); // Trigger input event
        }
    };

    const handleRoomClick = () => {
        navigator.clipboard.writeText( currenturl + "see/" + room); // Copy room number to clipboard
        setCopied(true); // Set copied state to true
        setTimeout(() => setCopied(false), 2000); // Hide copied message after 2 seconds
    };

    return (
        <div className="container py-5">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card p-5 ">
                    {
                        room ? (
                            <>
                                <h1 className="card-title   text-white fw-bold" onClick={handleRoomClick} style={{ backgroundColor: "darkgray" }} data-bs-toggle="tooltip" data-bs-placement="bottom" title="Click to copy text">
                                    {currenturl + "see/" + room}
                                </h1>
                                <p className="text-muted text-info fw-bold">Click on the room URL above to copy it. Share this URL with someone else to see simultaneous text typing in real-time.</p>
                            </>
                        ) : ""
                    }
                    {copied && <p className="fw-bold text-success">Copied</p>}
                    {!room ? (
                        <div>
                            <h2 className="text-muted mb-3">To start collaborating, please create a room</h2>
                            <form className="aligen-items-center " onSubmit={createRoom}>
                                <div className="row" >
                                    <div className="col-md-12">
                                        <input type="text" className="form-control mb-2" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div className="col-md-12 ">
                                        <button className="btn btn-primary">Create Room</button>
                                    </div>
                                </div>
                            </form>
                            <p className="text-muted mt-3 fw-bold  ">Creating a room allows you to collaborate with others in real-time. Simply enter your name above and click "Create Room" to generate a unique room URL. Share this URL with your collaborators, and they'll be able to join the room to see      your shared content.</p>
                        </div>
                    ) : null}

                    <br />
                    {room ? (
                        <div className="row">
                            <div className="col-12">
                                <div className="form-floating">
                                    <textarea
                                        className="form-control my-textarea"
                                        placeholder="Enter your message"
                                        id="floatingTextarea2"
                                        style={{ overflowY: "scroll", width: "100%", resize: "none" }}
                                        onChange={(e) => { handleTextAreaChange(e); saveText(e.target.value) }}
                                        onKeyPress={handleKeyPress} // Add key press event listener
                                        ref={textAreaRef}
                                    ></textarea>
                                    <label htmlFor="floatingTextarea2">Start typing..</label>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
