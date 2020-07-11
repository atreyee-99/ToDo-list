const container = document.querySelector('.container'); //class=container from HTML
var inputValue = document.querySelector('.input'); //for input
const add = document.querySelector('.add'); //for add button


//initial conditions
if(window.localStorage.getItem("todos") == undefined){
     var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);


class item{
	constructor(name){
		this.createItem(name);
	}
    createItem(name){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true; //no changes/edits can be made on clicking or hovering on the text unless the edit button is pressed
    	input.value = name;
    	input.classList.add('item_input');

    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "EDIT";
    	edit.addEventListener('click', () => this.edit(input, name,edit));

    	var remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "REMOVE";
    	remove.addEventListener('click', () => this.remove(itemBox, name));
		
		//displays updated list
    	container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    edit(input, name, edit1){//third parameter is for sending instance of object(edit) so can it can be modified to 'DONE'
        if(input.disabled == true){
           input.disabled = !input.disabled;
           edit1.innerHTML = "DONE";
        }
    	else{
            input.disabled = !input.disabled;
            edit1.innerHTML = "EDIT";
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos)); //modifies edited content
        }
    }

    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

add.addEventListener('click', check); //on clicking add button the check function is called
window.addEventListener('keydown', (e) => { //enter key and add button have same functionality
	if(e.which == 13){
		check();
	}
})

function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";//setting value to null so that previous entered value is removed from input bar
	}
}


for (var v = 0 ; v < todos.length ; v++){   //creating object for every new item
    new item(todos[v]);
}


