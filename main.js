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