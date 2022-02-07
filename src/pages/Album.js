import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      albumName: '',
      tracks: [],
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    const { artistName, collectionName } = album[0];
    this.setState({
      artist: artistName,
      albumName: collectionName,
      tracks: album.slice(1),
    });
  };

  render() {
    const { artist, albumName, tracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h2 data-testid="artist-name">{artist}</h2>
          <h3 data-testid="album-name">{albumName}</h3>
          {tracks.map((track) => (
            <MusicCard
              key={ track.trackId }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
            />
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
