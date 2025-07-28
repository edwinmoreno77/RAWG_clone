import { Background } from "../components/ui/Background";
import { Navbar } from "../components/ui/Navbar";
import { childrenPropType } from "../constants/propTypes";

export const AmbientLayout = ({ children }) => {
  return (
    <Background>
      <Navbar />
      {children}
    </Background>
  );
};

AmbientLayout.propTypes = {
  children: childrenPropType.isRequired,
};
