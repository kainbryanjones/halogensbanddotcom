import React, { useRef, useEffect } from "react";

export function useOutsideKeypressAlerter(ref, onSpacebarPress, onArrowKeyPress) {
    useEffect(() => {
        // Bind the event listener
        document.body.onkeydown = (e) => {
            if (e.defaultPrevented) {
                return;
            }
            if (ref.current && !ref.current.contains(e.target)) {
                switch (e.key) {
                    case " ":
                    case "Space":
                        e.preventDefault();
                        break;
                    case "Left":
                    case "ArrowLeft":
                        e.preventDefault();
                        break;
                    case "Right":
                    case "ArrowRight":
                        e.preventDefault();
                        break;
                    case "Down":
                    case "ArrowDown":
                        e.preventDefault();
                        break;
                    case "Up":
                    case "ArrowUp":
                        e.preventDefault();
                        break;
                }
            }
        }

        document.body.onkeyup = (e) => {
            if (e.defaultPrevented) {
                return;
            }
            if (ref.current && !ref.current.contains(e.target)) {
                switch (e.key) {
                    case " ":
                    case "Space":
                        e.preventDefault();
                        onSpacebarPress();
                        break;
                    case "Left":
                    case "ArrowLeft":
                        e.preventDefault();
                        onArrowKeyPress("l");
                        break;
                    case "Right":
                    case "ArrowRight":
                        e.preventDefault();
                        onArrowKeyPress("r");
                        break;
                    case "Down":
                    case "ArrowDown":
                        e.preventDefault();
                        onArrowKeyPress("d");
                        break;
                    case "Up":
                    case "ArrowUp":
                        e.preventDefault();
                        onArrowKeyPress("u");
                        break;
                }
            }
        }

        return () => {
            // Unbind the event listener on clean up
            document.body.onkeyup = null;
        };

    }, [ref])
};