import { animated, useSpring } from "react-spring";

const HomePage: React.FC = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  return <animated.h1 style={fade}>Welcome to the Home Page!</animated.h1>;
};

export default HomePage;
