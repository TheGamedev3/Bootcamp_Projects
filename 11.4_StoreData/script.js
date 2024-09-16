
// Aaron Binay
// 9/16/2024


document.addEventListener("DOMContentLoaded", function ()
{
	const noteContainer = document.getElementById("note-container");
	const newNoteButton = document.getElementById("new-note-button");
	const colorForm = document.getElementById("color-form");
	const colorInput = document.getElementById("color-input");

	window.addEventListener("keydown", function (event)
	{
		/* Ignores key presses made for color and note content inputs. */
		if(event.target.id === "color-input" || event.target.type === "textarea"){
			return;
		}

		/* Adds a new note when the "n" key is pressed. */
		if(event.key === "n" || event.key === "N"){
			new Note();
		}

		if(event.key === "r" || event.key === "R"){
			console.log("CLEARED ALL");
			this.localStorage.clear();
		}
	});

	// TODO: Load the note color from the local storage.
	// Defining a getter and setter on the global object (window in browsers)
	Object.defineProperty(window, 'noteColor', {
		nC: null,
		get: function(){return this.nC},
		set: function(value){
			this.nC = value;
			localStorage.setItem("noteColor",value);
		}
	});
	noteColor = localStorage.getItem("noteColor");
	if(noteColor === null || noteColor === undefined){noteColor = "white";}

	
 	// Stores the selected note color from the form.
	// TODO: Load the note ID counter from the local storage.
	Object.defineProperty(window, 'noteIdCounter', {
		nC2: null,
		get: function(){return this.nC2},
		set: function(value){
			this.nC2 = value;
			localStorage.setItem("noteIdCounter",value);
		}
	});
	noteIdCounter = localStorage.getItem("noteIdCounter");
	if(noteIdCounter === null || noteIdCounter === undefined){noteIdCounter = 0;}

	var allNotes = [];

	class Note{
		configure(){
			const id = this.id;
			const content = `Note ${id}`;

			const note = document.createElement("textarea");
			note.setAttribute("data-note-id", id.toString()); // Stores the note ID to its data attribute.
			note.value = content; // Sets the note ID as value.
			note.className = "note"; // Sets a CSS class.
			note.style.backgroundColor = noteColor; // Sets the note's background color using the last selected note color.
			noteContainer.appendChild(note); // Appends it to the note container element as its child.

			allNotes.push(this);

			return note;
		}
		constructor(struct = null){
			if(struct === null){
				this.id = noteIdCounter;
				this.note = this.configure();
				noteIdCounter++; updateData();
				return;
			}
			this.id = struct.id;
			this.note = this.configure();
			this.note.value = struct.value;
		}
		serial(){
			return {
				id: this.id,
				value: this.note.value
			};
		}
		remove(){
			this.note.remove();
			allNotes.splice(allNotes.findIndex(f => f===this),1);
			updateData();
		}
	}
	function updateData(){
		const saveData = JSON.stringify(
			allNotes.map(n => n.serial())
		);
		// console.log(saveData);
		localStorage.setItem("notesData", saveData);
	}

	// TODO: Load the notes from the local storage.
	(function(){
		const loaded = localStorage.getItem("notesData");
		if(loaded === undefined || loaded === null || loaded === ""){
			// started for the first time

			return;
		}
		JSON.parse(loaded).forEach(note => {
			new Note(note);
		});
	})()

	function getNote(eve, callable){
		if(!eve.target.classList.contains("note")){return;}
		const instance = allNotes.find(n => n.note === eve.target);
		if(instance === null || instance === undefined){return;}
		callable(instance);
	}

	colorForm.addEventListener("submit", function (event){
		event.preventDefault(); // Prevents the default event.

		const newColor = colorInput.value.trim();  // Removes whitespaces.
		if(newColor === ""){return;}

		const notes = document.querySelectorAll(".note");
		for(const note of notes){
			note.style.backgroundColor = newColor;
		}

		colorInput.value = ""; // Clears the color input field after from submission.

		noteColor = newColor; // Updates the stored note color with the new selection.

		// TODO: Update the note color in the local storage.
	});

	newNoteButton.addEventListener("click", function (){
		new Note();
	});

	document.addEventListener("dblclick", function (event){
		// TODO: Delete the note from the saved notes in the local storage.
		getNote(event, (note)=>{
			note.remove();
		});
	});

	noteContainer.addEventListener("blur", function (event){
		// TODO: Update the note from the saved notes in the local storage.
		getNote(event, (note)=>{
			updateData();
		});
		
	}, true);

});