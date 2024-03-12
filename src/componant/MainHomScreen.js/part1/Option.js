import React from 'react'
import item from "../../../images/background.png"

export default function Option() {
  return (
    <div>
      <div>
            <img src={item} style={{ width: "64px", height: "64px" }}></img>
            <div>
              <select className="border-0">
                <option>All Products:</option>
                <option>camera</option>
                <option>airpods</option>
                <option>smartphone</option>
              </select>
            </div>
      </div>
        
    </div>
  )
}
