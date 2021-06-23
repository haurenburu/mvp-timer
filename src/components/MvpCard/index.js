import React, { useEffect, useState } from "react";
import { TD } from "./styles";

const MvpCard = (props) => {
  const [respawn, setRespawn] = useState("");
  const [time, setTime] = useState("");
  const [sound] = useState(
    new Audio("http://mirror.irowiki.org/ragnarok/effects/Blessing.wav")
  );
  useEffect(() => {
    let countdown = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        if (time !== "") {
          new Notification(`${props.mvpName} Nasceu!`);
          sound.play();
        }
        clearInterval(countdown);
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [time, sound, props.mvpName]);
  useEffect(() => {
    if (!("Notification" in window)) {
    } else {
      Notification.requestPermission();
    }
  }, []);

  let timeFormater = (t) => {
    let timestamp = t;
    let h = Math.floor(timestamp / 60 / 60);
    let m = Math.floor(timestamp / 60) - h * 60;
    let s = timestamp % 60;
    return `
      ${h < 10 ? "0" + h : h}:
      ${m < 10 ? "0" + m : m}:
      ${s < 10 ? "0" + s : s}`;
  };
  let timeConverter = () => {
    let t = respawn.split(":");
    return Number(t[0] * 60 * 60) + Number(t[1] * 60) + Number(t[2]);
  };
  let timeMask = (t) => {
    return t
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1:$2")
      .replace(/(\d{2})(\d)/, "$1:$2")
      .replace(/(\d{2})\d+?$/, "$1");
  };

  return (
    <tr>
      <TD>
        <span>{props.mvpName} </span>
      </TD>
      <TD>
        <input
          value={timeMask(respawn)}
          onChange={(e) => {
            setRespawn(e.target.value);
          }}
        />
      </TD>
      <TD>
        <span>{timeFormater(time)} </span>
        <button onClick={() => setTime(timeConverter(respawn))}>ADD</button>
      </TD>
    </tr>
  );
};

export default MvpCard;
