import React from "react";
import { useState } from "react";
import Picker from "emoji-picker-react";

const EMOJI_STYLES = {
  textSize: "24px",
  border: "none",
  backgroundColor: "rgb(0,0,0,0)",
  cursor: "pointer",
  fontSize: "28px",
};

const PICKER = {
  position: "fixed",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 1000,
};

export default function SelectEmoji() {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojisOpen, setEmojisOpen] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setEmojisOpen(!emojisOpen);
  };

  const clickEmoji = () => {
    setEmojisOpen(!emojisOpen);
  };

  return (
    <div>
      <button style={EMOJI_STYLES} onClick={clickEmoji}>
        {chosenEmoji ? chosenEmoji.emoji : "Select Emoji"}
      </button>

      {emojisOpen ? (
        <>
          <div style={OVERLAY_STYLES} onClick={clickEmoji}/>
          <div style={PICKER}>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        </>
      ) : null}
    </div>
  );
}
