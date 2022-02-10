import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoritesSongs: [],
      checked: false,
    };
  }

  componentDidMount() {
    this.requestFavorites();
  }

  requestFavorites = async () => {
    this.setState({ loading: true });
    const songs = await getFavoriteSongs();
    this.setState({ loading: false, favoritesSongs: songs });
  }

  handleClick = async () => {
    const { track } = this.props;
    this.setState({ loading: true });
    await addSong(track);
    this.setState({ loading: false, checked: true });
  }

  render() {
    const { loading, favoritesSongs, checked } = this.state;
    const { track: { trackName, previewUrl, trackId } } = this.props;
    return (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {loading ? <Loading /> : (
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              id="favorite"
              data-testid={ `checkbox-music-${trackId}` }
              onClick={ this.handleClick }
              value={ trackId }
              checked={
                !checked
                  ? favoritesSongs.some((song) => song.trackId === trackId)
                  : true
              }
            />
          </label>
        )}
      </section>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
