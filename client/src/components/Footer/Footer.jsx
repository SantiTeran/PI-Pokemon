
import React from "react";
import style from "./Footer.module.css";
import { AiFillHeart } from "react-icons/ai";
import { BiCodeAlt } from "react-icons/bi";
import { DiReact } from "react-icons/di";

function Footer() {
  return (
    <div>
      <div className={style.footer}>
        <p>
          <BiCodeAlt />
          &ensp;with&ensp;
          <AiFillHeart /> by{" "}
          <a href="https://github.com/SantiTeran" target="_blank">
            Santiago Teran
          </a>{" "}
          using <DiReact />
        </p>
      </div>
    </div>
  );
}

export default Footer;