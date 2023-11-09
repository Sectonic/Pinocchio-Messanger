import Pinocchio from '/pinocchio.webp';
import Cricket from '/cricket.webp';

export default function TextingMessages({ allTexts }) {
    return (
        <>
            {allTexts.map((text, i) => {
                if (text.name === 'Gap') {
                    return (
                        <div key={i} className="mt-2 py-2 font-semibold text-sm opacity-80 text-center">{text.time}</div>
                    )
                } else {
                    return (
                        <div className='mt-2' key={i}>
                            {text.messages?.map((message, j) => (
                            <div key={j} className={`chat ${i % 2 === 0 ? 'chat-start' : 'chat-end'} ${text.messages?.length - 1 === j ? '' : (i % 2 === 0 ? 'ml-10' : 'mr-10')}`}>
                                {j === 0 && (
                                <div className="chat-header">
                                    {text.name}
                                    <time className="text-xs opacity-50 ml-1">{text.time}</time>
                                </div>
                                )}
                                {text.messages?.length - 1 === j && (
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                    <img style={{ width: 35, height: 35, borderRadius: 9999, objectFit: 'cover' }} src={text.name === 'Pinocchio' ? Pinocchio : Cricket} />
                                    </div>
                                </div>
                                )}
                                <div className="chat-bubble chat-bubble-primary">{message}</div>
                                {text.name === 'Sebastian Cricket' && allTexts[i + 1]?.time && text.messages?.length - 1 === j && (
                                <div className="chat-footer opacity-50">
                                    Seen at {allTexts[i + 1]?.time}
                                </div>
                                )}
                            </div>
                            ))}
                        </div>
                    )
                }
            })}
        </>
    )
}