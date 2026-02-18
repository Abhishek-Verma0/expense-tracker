import "./Filter.css";

const FiltersBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="filters-bar">
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default FiltersBar;
