import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import readData from "../services/read";

export default function See() {
    let { id } = useParams();
    const [roomno, setRoomno] = useState(id);
    const [data, setData] = useState("");
    const [copied, setCopied] = useState(false);
    const [copiedtext, setCopiedtext] = useState("Copy Text");
    const [copiedclass, setCopieclass] = useState("bg-secondary p-1 text-white");

    const getData = async () => {
        const rawData = await readData(roomno);
        if(rawData){
                   const formattedData = rawData.replace(/\n/g, "<br/>");
        setData(formattedData);
        }
 
    }

    useEffect(() => {
        getData();
        // Refresh data every 500 milliseconds
        const interval = setInterval(getData, 500);
        return () => clearInterval(interval);
    }, [roomno]); // Include roomno as a dependency to re-fetch data when roomno changes

    const copyText = () => {
        const textToCopy = document.getElementById('textToCopy').innerText;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopiedtext("Copied");
                setCopieclass("bg-success p-2 text-white");
                setTimeout(() => {
                    setCopiedtext("Copy text");
                    setCopieclass("bg-secondary p-2 text-white");
                }, 2000);
            })
            .catch((error) => {
                console.error('Error copying text: ', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <div className="card p-5 mt-5" style={{ width: "500px" }}>
                    <h1 className="card-title bg-primary text-white fw-bold">{roomno}</h1>
                    {data ? (
                        <>
                            <label className={copiedclass} data-toggle="tooltip" data-placement="top" title="Click to copy below text" onClick={copyText}>{copiedtext}</label>
                            <div style={{textAlign:"start"}} id="textToCopy" className="card card-body card-text mt-5 ">
                                <div dangerouslySetInnerHTML={{ __html: data }}></div>
                            </div>
                        </>
                    ) : (
                        <h2>The text will appear here as you start typing in the room creation area.</h2>
                    )}
                </div>
            </div>
        </div>
    );
}
