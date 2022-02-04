import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loagind from './Loading';
import '../index.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.saveName();
  }

  saveName = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      userName: user.name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div className="menu">
          <h1 className="title-header">TrybeTunes</h1>
          <h3 data-testid="header-user-name" className="user-name">
            {loading ? <Loagind /> : userName}
          </h3>
        </div>
        <nav className="nav-header">
          <Link className="link-header" data-testid="link-to-search" to="/search">
            Pesquisa
          </Link>
          <Link className="link-header" data-testid="link-to-favorites" to="/favorites">
            Favoritos
          </Link>
          <Link className="link-header" data-testid="link-to-profile" to="/profile">
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
