/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react"
import "./Card.css";
import { useMemo } from "react";
import { useEffect } from "react";

/**
 * @typedef {Object} Card 
 * @property {string} code 
 * @property {string} value
 * @property {string} suit
 * @property {string} image
 * 
 * @typedef {Object} CardProps
 * @property {Card} card
 * 
 * @param {CardProps} props
 */
export default function Card({card, layer = 1}) {
  
  const [imageReady, setImageReady] = useState(false)
  const randomAngle = useMemo(() => Math.random()*360+'deg', [])
  // useEffect(() => {
  //   setTimeout(() => setImageReady(true), 3000)
  // })

  return <div className={`card ${imageReady ? 'ready' : ''}`} style={{'--angle': randomAngle, '--layer': layer * -10 +'px'}}>
    <img className="back" src={'https://deckofcardsapi.com/static/img/back.png'}/>
    <img className="front" src={card.image} onLoad={() => setImageReady(true)}/>
  </div>
}