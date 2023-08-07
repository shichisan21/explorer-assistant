import { animated, useTransition } from "react-spring";
import { useState, useEffect } from "react";

const HomePage: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "scale(0.5)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.5)" },
    delay: 200,
  });

  useEffect(() => {
    const words = "Welcome to the Home Page!".split(" ");
    const timer = setInterval(() => {
      if (words.length > 0) {
        setItems((oldItems) => [...oldItems, words.shift()!]);
      }
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        fontFamily: "Helvetica",
      }}
    >
      {transitions((style, item) => (
        <animated.h1 style={{ ...style, fontSize: "2em", color: "#FFF" }}>
          {item}
        </animated.h1>
      ))}
    </div>
  );
};

export default HomePage;
