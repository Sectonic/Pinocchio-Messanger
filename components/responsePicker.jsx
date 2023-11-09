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
                    style={{textTransform: 'none', justifyContent: 'flex-start'}} 
                    key={i} 
                    className={` mt-[5px] 2xl:mt-[10px] w-full flex max-2xl:btn-sm btn ${currentResponseIndex === i ? 'btn-primary' : 'btn-ghost'}`} 
                    onClick={() => setMessage(i)}
                >
                    {response.messageTitle}
                </div>
            ))}
        </>
    )
}