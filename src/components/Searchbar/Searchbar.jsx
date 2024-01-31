import React from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      return alert('Enter data for search');
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.search_button}>
          <span>
            <FiSearch size={24} stroke="#3f51b5" />
          </span>
        </button>

        <input
          className={css.search_input}
          type="text"
          name="imageName"
          value={imageName}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};
