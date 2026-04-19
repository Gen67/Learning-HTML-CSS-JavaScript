const getInfo = document.querySelector('.login-layout'); 
const inputs =  document.querySelectorAll("input"); 



 let accountInfo = {
                            firstName:" ",
                            secondName:" ",
                            email: " ",
                            checkEmail:" ",
                            phone: " ", 
                            address: " ",
                            city:" ",
                            postCode: " ",
                            country: " ",
                            survey:" "};




inputs.forEach(inputs =>{
    inputs.addEventListener('input', function(event){
        accountInfo[event.target.id] = event.target.value; 
    }); 
});



getInfo.addEventListener("submit", event =>{
     event.preventDefault();
    createAccount();    

    
              setTimeout(() => {
    const url = "../HTML/main.html";
    const tab = window.open(url, "_self");
    }, 3000); 
  
    



}); 



  function createAccount(){ 

        let  {firstName, secondName, email, checkEmail,phone,address,city,postCode,country,survey} = accountInfo;
        let accountCreateSuccessfully = false;

            if(firstName === " " || secondName === " "){
                alert("Fill the Form");
                return false;
            } else{ 
                console.log(`First Name: ${firstName}`);
                console.log(`Second Name: ${secondName}`);
            }
            
            
            if(email.includes('@') && email.includes('.')){
                console.log(`Email: ${email}`);
            } else{ 
                alert("Note a Valid Email");
                return false;
            }

            if(email.value === checkEmail.value){
                console.log(`Email Confirm`);
            } else{ 
                alert("Email not The same");         
                return false;   
            }

            if(phone === " " || address === " " || city === " " || postCode === " " || country === " "){
                alert("Please Complete the Form"); 
                return false;
            } else { 
                console.log(`Phone No: ${phone}`); 
                console.log(`Address: ${address}`); 
                console.log(`City: ${city}`); 
                console.log(`Post Code: ${postCode}`); 
                console.log(`Country: ${country}`); 
            }

                 accountCreateSuccessfully= true;
                 console.log("Account created successfully!");

            
        return accountInfo;
    }



