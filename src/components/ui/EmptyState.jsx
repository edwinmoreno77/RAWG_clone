import {
  childrenPropType,
  classNamePropType,
  titlePropType,
} from "../../constants/propTypes";

export const EmptyState = ({
  title = "Not content",
  className = "",
  children,
}) => {
  return (
    <div className={`text-center pt-3 mt-28 ${className}`}>
      <h1 className="text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-stone-400 via-stone-50 to-stone-400 font-bold decoration-white tracking-tight">
        {title}
      </h1>
      {children}
    </div>
  );
};

EmptyState.propTypes = {
  title: titlePropType,
  className: classNamePropType,
  children: childrenPropType,
};
