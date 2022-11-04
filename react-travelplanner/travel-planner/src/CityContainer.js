import "./CityContainer.css";

const CityContainer = () => {
  return (
    <div className="city-container">
      <div className="city-img">
        <img
          src="https://source.unsplash.com/500x400/?Helsinki"
          alt="city img"
        />
      </div>
      <div className="city-info">
        <p className="city-name">HELSINKI</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          voluptas dolor, quod earum accusamus laboriosam et.
        </p>
        <p className="rating">5/5</p>
      </div>
    </div>
  );
};

export default CityContainer;
