  async function getPokemonData() {
    try{ 

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); 

      if(response.ok) {
        const data = await response.json();
        
        const pokemonSprite = data.sprites.front_default;
        const pokemonTypes = data.types[0].type.name;
        const pokemonNameData = data.name; 
        const pokemonHeightData = data.height;
        const pokemonWeightData = data.weight;
        const pokemonItemsData = data.held_items[Math.floor(Math.random() * data.held_items.length)]?.item.name; 
        const pokemonAbilitiesData = data.abilities[Math.floor(Math.random() * data.abilities.length)].ability.name; 
        
  


        const imageElement = document.getElementById("pokemonSprite");
        const pokemonId = document.getElementById("pokemonId");
        const pokemonNameElement = document.getElementById("pokemonNameElement");
        const pokemonTypeElement = document.getElementById("pokemonType");
        const pokemonHeight = document.getElementById("pokemonHeight");
        const pokemonWeight = document.getElementById("pokemonWeight");
        const pokemonItems = document.getElementById("pokemonItems");
        const pokemonAbilities = document.getElementById("pokemonAbilities");
        const genderShow = document.getElementById("gender-icon");

        imageElement.src = pokemonSprite;
        imageElement.style.display = "block";
        pokemonId.textContent =  `#${data.id}`;
        pokemonNameElement.textContent = pokemonNameData.charAt(0).toUpperCase() + pokemonNameData.slice(1);
        pokemonTypeElement.textContent = pokemonTypes;
        pokemonHeight.textContent = `${pokemonHeightData / 10} m`; 
        pokemonWeight.textContent = `${pokemonWeightData / 10} kg`;
        pokemonItems.textContent = pokemonItemsData;
        pokemonAbilities.textContent = pokemonAbilitiesData; 
        genderShow.style.display = "block";       

        console.log(data);
      }

     

    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
  
}

