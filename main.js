const bodies = ["star","planet","satellite","blackhole"]

function bodyConfiguration(input){

    const chosenBody = input.value;

    bodies.forEach(bodyID => {const element = document.getElementById(bodyID);
    if(bodyID === chosenBody){
        element.classList.add("active")
        element.classList.remove("unactive")
    }
    else{
        element.classList.remove("active")
        element.classList.add("unactive")
    }});
}

function values(){
  planetmass = Number(document.getElementById('planet__mass').value);
  starmass = Number(document.getElementById('star__mass').value);
  blackholemass = Number(document.getElementById('blackhole__mass').value);
  timespeed = Number(document.getElementById('time__speed').value);

  document.getElementById('planet__value').innerText = planetmass + " CU";
  document.getElementById('star__value').innerText = starmass + " CU";
  document.getElementById('blackhole__value').innerText = blackholemass + " CU";
  document.getElementById('time__value').innerText = timespeed + "x";

}