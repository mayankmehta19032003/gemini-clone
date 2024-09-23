import { createContext, useState } from "react"
import run from "../config/gemini";

export const context = createContext();


const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index,nextWord)=>{
      setTimeout(function(){
        setResultData(prev => prev + nextWord);
      },75*index)
    }


    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true);
        setRecentPrompt(input);
        const respone = await run(input)
        let responseArray = respone.split("**");
        let newResponse ="";
        for(let i = 0; i< responseArray.length;i++){
            if( i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br/>")
        let newResponseArray = newResponse2.split(" ");

        for(let i =0;i< newResponseArray.length;i++){

            const nextWord = newResponseArray[i];
            delayPara(i,nextWord + " ");
        }

        setLoading(false)
        setInput("")
    }

    const contextValue = {
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