import React from "react"

export default function Upload() {
    return (
    <div className="div--upload">
        <button className="button--upload">Choose File</button>
        <input type="text" className="chosen--file" placeholder="No file chosen" />
    </div>
    )
}