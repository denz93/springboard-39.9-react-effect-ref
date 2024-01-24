import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
/**
 * @typedef {Object} Card 
 * @property {string} code 
 * @property {string} value
 * @property {string} suit
 * @property {string} image
 */
/**
 * @typedef {Object} deckResponse
 * @property {string} deck_id
 * @property {number} remaining
 * 
 * @returns {Promise<deckResponse>}
 */
async function fetchNewdeck() {
  const res = await fetch('https://deckofcardsapi.com/api/deck/new/')
  const data = await res.json()
  return data
}

/**
 * @typedef {Object} DrawCardResponse
 * @property {string} remainding
 * @property {Card[]} cards
 * @param {string} deckId 
 * @param {number} count 
 * @returns {Promise<DrawCardResponse>}
 */
async function drawCard(deckId, count=1) {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
  const data = await res.json()
  return data
}

/**
 * 
 * @param {string} deckId 
 * @returns {Promise<deckResponse>}
 */
async function shuffledeck(deckId) {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
  const data = await res.json()
  return data
}

export function useDeck() {
  const [deckId, setdeckId] = useState(null)
  const [currentCards, setCurrentCards] = useState([])
  const [remainding, setRemainding] = useState(0)
  const isDone = remainding === 0

  const draw = useCallback(() => {
    if (!deckId) return

    drawCard(deckId).then(data => {
      setCurrentCards([...currentCards, ...data.cards])
      setRemainding(data.remaining)
    })
  }, [deckId, currentCards])

  const shuffle = useCallback(() => {
    shuffledeck(deckId).then(data => {
      setRemainding(data.remaining)
      setCurrentCards([])

    })
  }, [deckId])

  useEffect(() => {
    fetchNewdeck().then(deck => { 
      setdeckId(deck.deck_id)
      setRemainding(deck.remaining)
    })
  },[])

  return {remainding, draw, shuffle, isDone, currentCards}
}