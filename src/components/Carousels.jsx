import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Carousels = () => {
  const { store, actions } = useContext(Context);
  const { pageData } = store;

  useEffect(() => {
    actions.getPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  if (!pageData || pageData.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <Carousel responsive={responsive} autoPlaySpeed={2000}>
      {pageData?.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.background_image} alt={item.name} width={1200} />
          </div>
        );
      })}
    </Carousel>
  );
};
