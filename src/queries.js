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
  const [isFetching, setIsFetching] = useState(false)
  const isNoRemainding = remainding === 0

  const draw = useCallback(() => {
    if (!deckId) return
    setIsFetching(true)
    drawCard(deckId).then(data => {
      setCurrentCards([...currentCards, ...data.cards])
      setRemainding(data.remaining)
    })
    .finally(() => setIsFetching(false))
  }, [deckId, currentCards])

  const shuffle = useCallback(() => {
    setIsFetching(true)
    shuffledeck(deckId).then(data => {
      setRemainding(data.remaining)
      setCurrentCards([])

    })
    .finally(() => setIsFetching(false))
  }, [deckId])

  useEffect(() => {
    setIsFetching(true)
    fetchNewdeck().then(deck => { 
      setdeckId(deck.deck_id)
      setRemainding(deck.remaining)
    }).finally(() => setIsFetching(false))
  },[])

  return {remainding, draw, shuffle, isNoRemainding, currentCards, isFetching}
}