function rollDice(){
    const number_Dice = document.getElementById("numberOfDice").value;
    const result_Dice = document.getElementById("result");
    const result_Dice_images = document.getElementById("dice_image");
    const values = [];
    const images = [];



    for(let i = 0; i < number_Dice; i++){
        const value = Math.floor(Math.random()*6) + 1;
        values.push(value);
        images.push(`<img src="images/${value}.png">`);
    }

    result_Dice.textContent = `Dice: ${values.join(', ')}`;
    result_Dice_images.innerHTML = images.join('');


}