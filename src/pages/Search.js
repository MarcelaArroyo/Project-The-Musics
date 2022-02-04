import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { artistName } = this.state;
    const minCharacters = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <section className="section-search">
          <form className="form-search">
            <input
              data-testid="search-artist-input"
              name="artistName"
              type="text"
              value={ artistName }
              onChange={ this.handleChange }
              placeholder="Nome do Artista"
            />
            <button
              className="button-search"
              data-testid="search-artist-button"
              type="submit"
              disabled={ artistName.length < minCharacters ? 'disabled' : '' }
              onClick=""
            >
              Pesquisar
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default Search;
