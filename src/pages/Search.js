import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistNameInput: '',
      loading: false,
      button: false,
      albums: [''],
      artistName: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { artistNameInput } = this.state;
    this.setState({
      loading: true,
      artistName: artistNameInput,
    });
    const requestAlbums = await searchAlbumsAPI(`${artistNameInput}`);
    this.setState({
      loading: false,
      button: true,
      artistNameInput: '',
      albums: [...requestAlbums],
    });
  };

  render() {
    const { artistNameInput, loading, albums, button, artistName } = this.state;
    const minCharacters = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <section className="section-search">
          <form className="form-search">
            {loading ? (
              <Loading />
            ) : (
              <div>
                <input
                  data-testid="search-artist-input"
                  name="artistNameInput"
                  type="text"
                  value={ artistNameInput }
                  onChange={ this.handleChange }
                  placeholder="Nome do Artista"
                />
                <button
                  className="button-search"
                  data-testid="search-artist-button"
                  type="submit"
                  disabled={
                    artistNameInput.length < minCharacters ? 'disabled' : ''
                  }
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>
              </div>
            )}
          </form>
          {button ? (
            <h4>
              Resultado de álbuns de:
              {` ${artistName}`}
            </h4>)
            : null}
          {albums.length > 0 ? (
            <ul className="list-albums">
              {albums.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <p>{album.collectionName}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum álbum foi encontrado</p>
          )}
        </section>
      </div>
    );
  }
}

export default Search;
