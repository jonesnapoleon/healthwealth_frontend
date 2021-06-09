import React from "react";

const Stepper = ({ items, activeItem, setActiveItem, availableLevel }) => {
  return (
    <div>
      <div className="item-center my-4">
        {items?.map((datum, i) => (
          <span className={`item-center ${i <= activeItem ? "" : "disabled"}`}>
            {i !== 0 && <strong className="px-2 lead">➔</strong>}
            <div className={`px-2`}>
              <img src={datum?.icon} alt="" className={`px-1 `} />
            </div>
            <div>{datum.name}</div>
          </span>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Stepper;
