/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const TypewriterEffect = ({ texts, speed }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(speed);

  useEffect(() => {
    const text = texts[currentTextIndex];

    const typing = () => {
      setCurrentText(text.substring(0, currentText.length + 1));
      setTypeSpeed(speed);
    };

    const deleting = () => {
      setCurrentText(text.substring(0, currentText.length - 1));
      setTypeSpeed(speed / 2);
    };

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText === text) {
          // El texto se ha mostrado completamente, activamos el borrado
          setIsDeleting(true);
        } else {
          // Todavía hay letras por mostrar
          typing();
        }
      } else {
        if (currentText === "") {
          // Se ha borrado completamente el texto, pasamos al siguiente
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        } else {
          // Todavía hay letras por borrar
          deleting();
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, speed, typeSpeed]);

  return <div>{currentText}</div>;
};

export default TypewriterEffect;
