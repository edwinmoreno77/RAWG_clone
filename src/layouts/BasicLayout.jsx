import { Navbar } from "../components/ui/Navbar";
import { childrenPropType } from "../constants/propTypes";

export const BasicLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-stone-950">
      <Navbar />
      {children}
    </div>
  );
};

BasicLayout.propTypes = {
  children: childrenPropType.isRequired,
};
