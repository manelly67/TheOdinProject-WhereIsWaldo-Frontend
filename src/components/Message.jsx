import { useCallback, useEffect } from "react";
import styles from "../styles/Message.module.css";

const Message = (props) => {
  const { element, looks, close } = styles;
  const { messageObj, setMessageObj } = props;
  const { round_answer, message, score } = messageObj;
  const scoreText = score ? formatScore(score) : null;

  const deleteAfter = useCallback(() => {
    setMessageObj(null);
  }, [setMessageObj]);

  useEffect(() => {
    setTimeout(deleteAfter, 3500);

    return () => {
      clearTimeout(deleteAfter, 3500);
    };
  }, [deleteAfter]);

  function formatScore(score) {
    const { days, hours, minutes, seconds } = score;
    let d = days ? `${days} days` : "";
    let h = hours ? `${hours} hours` : "";
    let m = minutes ? `${minutes} minutes` : "";
    let s = seconds ? `${seconds} seconds` : "";
    return `${d} ${h} ${m} ${s}`;
  }

  return (
    <>
      <div className={`${element} ${looks}`} role="message">
        {round_answer ? <h3>{round_answer.toUpperCase()}</h3> : null}

        {message ? <p>{message.toUpperCase()}</p> : null}

        {scoreText ? <p>{scoreText}</p> : null}

        <button
          onClick={(event) => {
            event.stopPropagation();
            setMessageObj(null);
          }}
          className={close}
        >
          close
        </button>
      </div>
    </>
  );
};

export default Message;
