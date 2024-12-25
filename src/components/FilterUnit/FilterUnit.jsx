const FilterUnit = ({ title, filterOptions, onFilter }) => (
  <div className="filter-unit">
    <h4>{title}</h4>
    {filterOptions.map((option) => (
      <button key={option} onClick={() => onFilter(option)}>
        {option}
      </button>
    ))}
  </div>
);

export default FilterUnit;
