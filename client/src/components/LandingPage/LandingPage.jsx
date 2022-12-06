import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import logo from "../Images/pokemon.png";
import charizard from "../../img/home.jpg";
import linkedin from "../Images/linkedin.png";
import github from "../Images/github.png";

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.contIzq}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.contTitle}>
          <div className={styles.title}>I've been waiting for you</div>
          <div className={styles.parrafo}>
          Let's see some pokemons or create one of your dreams
          </div>
          <Link to="/home">
            <button className={styles.button}> Go go!</button>
          </Link>
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
        <img src={charizard} alt="charizard" className={styles.charizardImg} />
      </div>
    </div>
  );
}
