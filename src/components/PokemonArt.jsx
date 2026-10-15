import bulbasaur from '../assets/pokemon/bulbasaur.png';
import charmander from '../assets/pokemon/charmander.png';
import eevee from '../assets/pokemon/eevee.png';
import gengar from '../assets/pokemon/gengar.png';
import jigglypuff from '../assets/pokemon/jigglypuff.png';
import mimikyu from '../assets/pokemon/mimikyu.png';
import pikachu from '../assets/pokemon/pikachu.png';
import snorlax from '../assets/pokemon/snorlax.png';
import squirtle from '../assets/pokemon/squirtle.png';

const artwork = { bulbasaur, charmander, eevee, gengar, jigglypuff, mimikyu, pikachu, snorlax, squirtle };

export function PokemonArt({ pokemon = 'pikachu', alt = '', className = '' }) {
  const image = artwork[pokemon] || artwork.pikachu;
  return <span className={`pokemon-art ${className}`} aria-hidden={alt ? undefined : true}>
    <img src={image} alt={alt} loading="lazy" />
  </span>;
}

