import { useDeck } from "./queries"
import Card from "./Card"
import "./Desk.css"



export default function Desk () {
  const {
    draw,
    shuffle,
    currentCards,
  } = useDeck()
  return <div className="desk">
    <div className="actions">
      <button onClick={() => draw() }>Draw</button>
      <button onClick={() => shuffle()}>Shuffle</button>
    </div>

    <div className="pile">
      {currentCards.length === 0 && <div style={{fontStyle: 'italic'}}>Deck is empty</div>}
      {currentCards.map((card, idx) => <Card key={card.code} card={card} layer={idx} />)}
    </div>
  </div>
}