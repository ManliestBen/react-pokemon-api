import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import { getAllPokemon } from './services/pokemon-api';
import PokemonPage from './pages/PokemonPage/PokemonPage';

class App extends Component {
  state = {
    pokemon: []
  };

  getPokemon = (idx) => {
    return this.state.pokemon[idx];
  }

  async componentDidMount() {
    const pokemon = await getAllPokemon();
    console.log(pokemon.results);
    this.setState({ pokemon: pokemon.results });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">Pokemon Index</header>
        <Switch>
        <Route exact path='/' render={() => 
            <section>
              {this.state.pokemon.map((pokemon, idx) => 
                <Link
                  to={`/pokemon/${idx}`}
                  key={pokemon.name}
                >
                  {pokemon.name}
                </Link>
              )}
            </section>
          }/>
          <Route path='/pokemon/:idx' render={(props) => 
            <PokemonPage
              {...props}
              getPokemon={this.getPokemon}
            />
          }/>
          </Switch>
      </div>
    )
  }
}

export default App;
