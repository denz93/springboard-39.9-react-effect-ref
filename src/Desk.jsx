import { useDeck } from "./queries"
import Card from "./Card"
import "./Desk.css"
import { useEffect, useState } from "react"



export default function Desk () {
  const {
    draw,
    shuffle,
    currentCards,
    isFetching,
    isNoRemainding
  } = useDeck()
  const [isAutoDraw, setIsAutoDraw] = useState(false)

  useEffect(() => {
    if (!isAutoDraw) return
    const interval = setInterval(() => {
      if (isNoRemainding) {
        setIsAutoDraw(false)
        return alert('Error: no cards remaining!')
      }
      draw()
    }, 1000)
    return () => clearInterval(interval)
  }, [isAutoDraw, draw, isNoRemainding])

  return <div className="desk">
    <div className="actions">
      <button onClick={() => {
        if (isNoRemainding) return alert('Error: no cards remaining!')
        setIsAutoDraw(!isAutoDraw) 
        } }>{isAutoDraw ? 'Stop' : 'Auto Draw'}</button>
      <button disabled={isFetching} onClick={() => shuffle()}>Shuffle</button>
    </div>

    <div className="pile">
      {currentCards.length === 0 && <div style={{fontStyle: 'italic'}}>Deck is empty</div>}
      {currentCards.map((card, idx) => <Card key={card.code} card={card} layer={idx} />)}
    </div>
  </div>
}