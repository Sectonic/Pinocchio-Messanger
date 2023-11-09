import { useEffect, useRef, useState } from "react";
import ResponsePicker from "../components/responsePicker";
import TextingMessages from "../components/textingMessages";

function App() {
  const [allResponses, setAllResponses] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(0);
  const [allTexts, setAllTexts] = useState([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(null);
  const [currentInputSelection, setCurrentInputSelection] = useState('');
  const [pinocchioLoading, setPinocchioLoading] = useState(false);
  const [chatDisabled, setChatDisabled] = useState(false);
  const [chatFinished, setChatFinished] = useState(false);
  const textarea = useRef(null);
  const chatBoxEnd = useRef(null);

  const textareaHeight = (e) => {
    if (e.target.scrollHeight > 70) {
      e.target.style.height = e.target.scrollHeight + 'px';
    }
  }

  const submitResponse = () => {
    if (currentInputIndex !== null) {
      setChatDisabled(true);
      const currentResponse = allResponses[currentConversation];
      setAllTexts(prev => [...prev, {
        name: 'Sebastian Cricket',
        messages: currentResponse.possibleConversations[currentInputIndex].cricket,
        time: currentResponse.cricketTime
      }]);
      setCurrentInputSelection('');
    }
  }

  useEffect(() => {
    chatBoxEnd.current?.scrollIntoView({ behavior: 'smooth' });
    if (allTexts[allTexts.length - 1]?.name === 'Sebastian Cricket') {
      (async () => {
        const currentResponse = allResponses[currentConversation];
        await new Promise(resolve => setTimeout(resolve, 500));
        setPinocchioLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPinocchioLoading(false);
        setAllTexts(prev => [...prev, {
          name: 'Pinocchio',
          messages: currentResponse.possibleConversations[currentInputIndex].pinocchio,
          time: currentResponse.pinocchioTime
        }]);
        setCurrentInputIndex(null);
        if (allResponses[currentConversation + 1]?.startTime) {
          setCurrentConversation(prev => prev + 1);
        } else {
          await new Promise(resolve => setTimeout(resolve, 2500));
          setChatFinished(true);
        }
      })();
    }
  }, [allTexts]);

  useEffect(() => {
    if (pinocchioLoading) {
      chatBoxEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pinocchioLoading])

  useEffect(() => {
    if (currentInputIndex === null) {
      textarea.current.style.height = '50px';
      return;
    }

    if (textarea.current.scrollHeight > 50) {
      textarea.current.style.height = textarea.current.scrollHeight + 'px'
    }

  }, [currentInputIndex]);

  useEffect(() => {
    if (currentConversation !== 0) {
      (async () => {
        await new Promise(resolve => setTimeout(resolve, 2500));
        setPinocchioLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPinocchioLoading(false);
        const currentResponse = allResponses[currentConversation];
        setAllTexts(prev => [...prev, 
          {
            name: 'Gap',
            time: currentResponse.startTime
          },
          {
            name: 'Pinocchio',
            messages: currentResponse.initialMessages,
            time: currentResponse.startTime
          }
        ]);
        setChatDisabled(false);
      })();
    }
  }, [currentConversation]);

  useEffect(() => {
    (async () => {
      const request = await fetch(`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_BIN_ID}`, {
        method: 'GET',
        headers: {
          'X-Master-Key': import.meta.env.VITE_MASTER_KEY,
          'X-Access-Key': import.meta.env.VITE_ACCESS_KEY,
          'Content-Type': 'application/json',
        }
      });
      const data = await request.json();
      setAllResponses(data.record);
      await new Promise(resolve => setTimeout(resolve, 500));
      setPinocchioLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPinocchioLoading(false);
      const initialResponse = data.record[0];
      setAllTexts([{
        name: 'Pinocchio',
        messages: initialResponse.initialMessages,
        time: initialResponse.startTime
      }]);
    })();
  }, []);

  return (
    <div data-theme="winter" className="h-screen w-screen flex justify-center items-center bg-primary-content">
        <div className="mockup-browser border bg-primary w-[600px]">
            <div className="mockup-browser-toolbar">
              <div className="input pointer-events-none bg-primary-content">Pinocchio Messanger</div>
            </div>
            <div className="bg-base-100 py-2">
              <div className="p-3 mx-2 px-3 bg-base-100 h-[50vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent scrollbar-thumb-rounded-xl">
                <TextingMessages allTexts={allTexts} />
                {pinocchioLoading && (
                  <div className="chat chat-start ml-10">
                    <div className="chat-header">
                      Pinocchio is Typing
                    </div>
                    <div className="animate-pulse chat-bubble chat-bubble-primary p-2 w-[50px] flex justify-around items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-content"></div>
                      <div className="w-2 h-2 rounded-full bg-primary-content"></div>
                      <div className="w-2 h-2 rounded-full bg-primary-content"></div>
                    </div>
                  </div>
                )}
                <div ref={chatBoxEnd}></div>
              </div>
            </div>
            <div className="py-4 px-6 bg-base-200">
                <div className="flex justify-center gap-2 items-center relative">
                    <textarea 
                      className="textarea w-full pr-12 scrollbar-none h-[50px] resize-none" 
                      value={currentInputSelection} 
                      readOnly={true} 
                      ref={textarea} 
                      onKeyDown={textareaHeight}
                    />
                    <div className="absolute bottom-2 right-2 btn-square btn-sm btn btn-primary" onClick={submitResponse}>
                        <svg className="w-4 h-4 text-base-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"/>
                        </svg>
                      </div>
                </div>
                { chatFinished ? (
                  <div className="mt-4 py-3 alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>You've finished the game!</span>
                    <div>
                      <button className="btn btn-sm" type="button" onClick={() => window.location.reload()}>Restart</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-sm py-2 ml-1 font-semibold opacity-80">{allResponses ? 'Select a response' : 'Loading...'}</div>
                    <ResponsePicker
                      disableChat={chatDisabled}
                      setResponse={setCurrentInputIndex}
                      currentResponseIndex={currentInputIndex}
                      currentConversation={allResponses ? allResponses[currentConversation] : []}
                      setCurrentInputSelection={setCurrentInputSelection}
                    />
                  </>
                )}
            </div>
        </div>
    </div>
  )
}

export default App
