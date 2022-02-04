import React from 'react';
import { getUser } from '../services/userAPI';
import Loagind from './Loading';

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
        <h1>TrybeTunes</h1>
        <p data-testid="header-user-name">
          {loading ? <Loagind /> : userName}
        </p>
      </header>
    );
  }
}

export default Header;
