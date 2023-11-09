export default function ResponsePicker ({ setResponse, currentResponseIndex, currentConversation, disableChat}) {

    const setMessage = (index) => {
        if (!disableChat) {
            setResponse(index);
        }
    }

    return (
        <>
            {currentConversation?.possibleConversations?.map((response, i) => (
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