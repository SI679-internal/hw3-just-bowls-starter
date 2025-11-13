import React from 'react';

export default function AddBowlForm({ newBowl, imgFileNames, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="add-bowl-form">
      <h2 className="form-title">Add New Bowl</h2>
      <div className="add-bowl-form-fields">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newBowl.name}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Image File:
          <select
            name="image"
            value={newBowl.image}
            onChange={onChange}
            required
            className="form-control"
          >
            <option value="" disabled>
              Select an image
            </option>
            {imgFileNames.map((fileName) => (
              <option key={fileName} value={fileName}>
                {fileName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Diameter:
          <input
            type="text"
            name="diameter"
            value={newBowl.diameter}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Depth:
          <input
            type="text"
            name="depth"
            value={newBowl.depth}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Material:
          <input
            type="text"
            name="material"
            value={newBowl.material}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            value={newBowl.color}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={newBowl.price}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={newBowl.stock}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
      </div>
      <button 
        type="submit"
        className="buy-button add-bowl-submit"
      >
        Add Bowl
      </button>
    </form>
  );
}
