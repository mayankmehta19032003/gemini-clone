import { createContext, useState } from "react"
import run from "../config/gemini";

export const context = createContext();


const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");



    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true);
        setRecentPrompt(input);
        const respone = await run(input)
        setResultData(respone)
        setLoading(false)
        setInput("")
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        input,
        setInput,
        showResult,
        loading,
        resultData
    }


    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider;