import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loagind from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      button: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name: `${name}` });
    this.setState({
      loading: false,
      button: true,
    });
  }

  render() {
    const { name, loading, button } = this.state;
    const minCharacters = 3;
    if (loading) {
      return (<Loagind />);
    } if (button) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form>
          Nome:
          <input
            data-testid="login-name-input"
            name="name"
            type="text"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ name.length < minCharacters ? 'disabled' : '' }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
