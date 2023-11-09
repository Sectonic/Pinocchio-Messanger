export default function ResponsePicker ({ setResponse, currentResponseIndex, currentConversation, disableChat, setCurrentInputSelection }) {

    const setMessage = (index) => {
        if (!disableChat) {
            setResponse(index);
            setCurrentInputSelection(currentConversation.possibleConversations[index].cricket.join('\n'));
        }
    }

    return (
        <>
            {currentConversation.possibleConversations.map((response, i) => (
                <div 
                    style={{marginTop: 10, textTransform: 'none', justifyContent: 'flex-start'}} 
                    key={i} 
                    className={`w-full flex btn ${currentResponseIndex === i ? 'btn-primary' : 'btn-ghost'}`} 
                    onClick={() => setMessage(i)}
                >
                    {response.messageTitle}
                </div>
            ))}
        </>
    )
}