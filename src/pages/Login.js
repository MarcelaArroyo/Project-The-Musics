import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      // Primeiro Código Requisito 2:
      // disabled: 'disabled',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    // Primeiro Código Requisito 2:
    // () => {
    //   this.setState({
    //     disabled: this.validationDisabledButton(),
    //   });
    // });
  }

  // Primeiro Código Requisito 2:
  // validationDisabledButton = () => {
  //   const { name } = this.state;
  //   if (name.length < minCharacters) {
  //     return 'disabled';
  //   }
  //   return '';
  // }

  handleClick = () => {

  }

  render() {
    const { name } = this.state;
    const minCharacters = 3;

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
