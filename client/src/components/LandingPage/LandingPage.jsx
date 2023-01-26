import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import logo from "../Images/pokemon.png";
import home from "../../img/steelix.gif";
import linkedin from "../Images/linkedin.png";
import github from "../Images/github.png";
import poke from "../Images/pokeb.png"

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.contIzq}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.contTitle}>
          <div className={styles.title}>I've been waiting for you</div>
          <div className={styles.parrafo}>
          Let's see some pokemons or create one of your dreams
          <br />
          <br />
          </div>
          <Link to="/home">
          <img src={poke} alt="poke" className={styles.poke}></img>
          </Link>
          <div>
            CLICK THE POKEBALL TO GO ON!
          </div>
        </div>

        <div className={styles.links}>
          <a
            href="https://www.linkedin.com/in/santiago-teran/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img src={linkedin} alt="linkedin" className={styles.linkedin} />
          </a>

          <a href="https://github.com/SantiTeran" target="_blank" rel="noreferrer">
            {" "}
            <img src={github} alt="github" className={styles.github} />
          </a>
        </div>
      </div>

      <div className={styles.contDer}>
        <img src={home} alt="steelix" className={styles.steelixImg} />
      </div>
    </div>
  );
}
