angular.module('ionicView.services', [])
//notme
.factory('DataService', function($window) {
	
	var data = {};
	//$window.localStorage.clear();
	//Initializing the local storage
	console.log("Initializing the local storage...");
	if($window.localStorage['notes'] === undefined){
		
		console.log("Inside the local storage...");
		var notes = {};
		notes['Vodafone Bill'] = [];
		notes['Rent Reciept'] = [];
		notes['Shopping warranty cards'] = [];
		notes['Car parking locations'] = [];
		notes['Friends Home'] = [];
		notes['Etc'] = [];

		$window.localStorage['notes'] = JSON.stringify(notes);
		
	}
	
	//function to get all the categories
	data.getAllNotes = function(){
		
		var notes = JSON.parse($window.localStorage['notes'] || '{}');
		
		return notes;
	}
	
	//function to add a new category
	data.addNewCategory = function(category){
		
		console.log("addNewCategory loading....");
		var notes = JSON.parse($window.localStorage['notes'] || '{}');
		notes[category] = [];
		try{
			$window.localStorage['notes'] = JSON.stringify(notes);
		}
		catch(err){
			return "ERROR";
		}
		return notes;
	}
	
	//function to add a new note
	data.addNewNote = function(category,note){
		
		var notes = JSON.parse($window.localStorage['notes'] || '{}');
		console.log("inside addNewNote "+JSON.stringify(notes,null,4));
		if(notes[category] === undefined){
			
			console.log("notes[category] undefined "+category);
			notes[category] = [];
		}
		notes[category].push(note);
		try{
			
			$window.localStorage['notes'] = JSON.stringify(notes);
		}
		catch(err){
			
			return "ERROR";
		}
		
		return notes;
	}
	
	//function to remove category
	data.removeCategory = function(category){
		
		var notes = JSON.parse($window.localStorage['notes'] || '{}');
		delete notes[category];
		try{
			$window.localStorage['notes'] = JSON.stringify(notes);
		}
		catch(err){
			return "ERROR";
		}
		return notes;
	}
	
	//function to remove a new note
	data.removeNote = function(category,title,date){
		
		var notes = JSON.parse($window.localStorage['notes'] || '{}');
		
		for(var index in notes[category]){
			
			if((notes[category][index].title).toLowerCase() === title.toLowerCase() && notes[category][index].date === date){
				
				notes[category].splice(index,1);
				break;
			}
		}
		try{
			$window.localStorage['notes'] = JSON.stringify(notes);
		}
		catch(err){
			return "ERROR";
		}
		return notes;
	}
	
	return data;
})