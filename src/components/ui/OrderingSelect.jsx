import { useGameStore } from "../../store/gameStore";

export const OrderingSelect = () => {
  const { setOrdering, filters } = useGameStore();
  const { ordering } = filters;

  const handleOrderingChange = (event) => {
    const selectedOrdering = event.target.value;
    setOrdering(selectedOrdering);
  };

  return (
    <div className="group">
      <select
        className="text-white px-6 py-1 cursor-pointer rounded-xl bg-stone-800 group-hover:bg-stone-600 transition-colors duration-300"
        value={ordering}
        onChange={handleOrderingChange}
      >
        {/*Relevancia (orden por defecto de RAWG) */}
        <option className="text-xs" value="-added">
          Relevance
        </option>
        {/*Fecha de añadido (orden inverso) */}
        <option className="text-xs" value="-added">
          {" "}
          Date added
        </option>
        {/* Nombre (orden alfabetico A-Z) */}
        <option className="text-xs" value="name">
          Name
        </option>
        {/*Fecha de lanzamiento (más recientes primero)*/}
        <option className="text-xs" value="-released">
          Release date
        </option>
        {/* Rating (juegos mejor valorados primero) */}
        <option className="text-xs" value="-rating">
          Rating
        </option>
        {/* Metacritic (juegos mejor valorados primero) */}
        <option className="text-xs" value="-metacritic">
          Metacritic
        </option>
      </select>
    </div>
  );
};
