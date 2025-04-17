import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Message.module.css";
import { urlAddresses } from "../assets/urlAdresses";

const AskForName = (props) => {
  const { element, looks, close } = styles;
  const { game } = props;
  const [show, setShow] = useState(false);
  const [playername, setPlayername] = useState(
    game === null ? "" : game.player.name_player
  );
  const [errors, setErrors] = useState([]);
  const [msg, setMsg] = useState(null);
  const url = `${urlAddresses.askForName}/${props.game.player.id_player}`;

  const display = useCallback(() => {
    setShow(true);
  }, [setShow]);

  useEffect(() => {
    setTimeout(display, 3550);
    return () => {
      clearTimeout(display, 3550);
    };
  }, [display]);

  async function handleSubmit(event) {
    event.preventDefault();
    const putdata = {
      name: `${playername}`,
    };
    fetch(url, {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
      body: JSON.stringify(putdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.errors) {
          setErrors(data.errors);
        }
        if (data.player) {
          setErrors([]);
          if (data.message) {
            setMsg(data.message);
            setTimeout(closePopUp, 3000);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function keepAnonimous() {
    props.setDontAskAgain(true);
    props.setIsInTop(false);
    closePopUp();
  }

  function closePopUp() {
    setShow(false);
  }

  return (
    <>
      {!show ? null : (
        <>
          <div className={`${element} ${looks}`} role="askname">
            <p>Congratulations, you are in the Top Ten</p>
            <ErrorMessage errors={errors} />
            {!msg ? null : <p style={{color:'blue'}}>{msg}</p>}
            <form
              id="ask_for_name"
              action={url}
              method="PUT"
              autoComplete="off"
              noValidate
            >
              <label htmlFor="playername"> ADD YOUR NAME</label>
              <input
                id="playername"
                name="name"
                title="max 20 characters"
                value={playername}
                onChange={(event) => setPlayername(event.target.value)}
                style={{ height: "30px" }}
                required
              />
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <button
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                  className={close}
                >
                  Submit
                </button>

                <button
                  onClick={() => {
                    keepAnonimous();
                  }}
                  className={close}
                >
                  Keep Anonimous
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

function ErrorMessage(props) {
  return (
    <div>
      {props.errors === undefined
        ? null
        : props.errors.map((e) => {
            return (
              <p key={e.msg} style={{ color: "red" }}>
                {e.msg}
              </p>
            );
          })}
    </div>
  );
}

export default AskForName;
