import React, { useState } from 'react'

export default function Bottom({ handleSendMessage }) {
    const [input, setInput] = useState('')
    const handleInputChange = (e) => {
        setInput(e.target.value)
    }
    const handleSendButton = () => {
        if (input) {
            handleSendMessage(input)
        }
        setInput('')
    }
    return (
        <section className="message-section">
            <form action="" className="message-form">
                <textarea spellCheck="false" id="message-input" placeholder="Start Typing ..." value={input} onChange={handleInputChange}></textarea>
                <button className="submit" type="button" onClick={handleSendButton}>
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m2.72112607 2.05149449 15.35446653 7.565969c.247703.12205658.3495596.42180601.227503.66950901-.048698.0988284-.1286747.1788051-.227503.2275031l-15.3541508 7.5658134c-.24770306.1220566-.54745246.0202-.66950904-.227503-.0533719-.1083136-.06574404-.2322825-.03483109-.3490077l1.52125123-5.7446792c.05030971-.1899839.20725125-.3328751.40110728-.3651979l6.88094892-1.1473027c.0842946-.0140491.1539978-.0697032.1874987-.1453514l.018-.0601474c.0194561-.11673645-.0453599-.22804672-.1500414-.27176154l-.0554573-.01593664-6.91980045-1.15330008c-.1939323-.03232205-.35092201-.17529727-.401185-.36537116l-1.48266862-5.60684181c-.07063055-.26695681.08852333-.54062543.35548014-.61125598.11669248-.03087411.24061464-.01849152.3488909.034862z" />
                    </svg>
                </button>
            </form>
        </section>
    )
}
