angular.module('ionicView.controllers', [])

.controller('categoryController', function($scope,DataService,$state,$ionicModal,$ionicActionSheet) {

	//Initializing varibales
	$scope.$state = $state;
	$scope.notes = DataService.getAllNotes();
	$scope.categories = Object.keys($scope.notes); 
	$scope.selectedCategory = "Choose a category";
	
	$scope.memNote = {};
	$scope.memNote['title'] = ""; 
	$scope.memNote['description'] = ""; 
	$scope.memNote['attachments'] = [];  
	
	$scope.showNote = {};
	
	$scope.searchCateg={};
	$scope.searchCateg['category'] = "" ;
	
	$scope.searchCategHome={};
	$scope.searchCategHome['category'] = "";
	
	$scope.searchCategHomeCat = {};
	$scope.searchCategHomeCat['category'] ="";
	
	$scope.attachment = {};
	$scope.attachment['type'] = "camera"; 
	
	//initialize the note 
	$scope.initNewNote = function(){
		
		$scope.memNote = {};
	}
	
	
	//submit the note
	$scope.submitNote = function(){
		
		if($scope.memNote.title === undefined || $scope.memNote.title === ""){
			
			$scope.modal1.show();
		}
		else if($scope.selectedCategory === "Choose a category"){
			
			$scope.modal2.show();
		}
		else{
			
			$scope.modal3.show();
		}
	}
	
	
	//create note in the memory
	$scope.createNote = function(){
		
		$scope.modal3.hide();
		$scope.memNote['date'] = new Date(); 
		var tmpnotes = DataService.addNewNote($scope.selectedCategory,$scope.memNote);
		if(tmpnotes === "ERROR"){
			// error modal
		}
		else{
			
			$scope.notes = tmpnotes;
			$scope.categories = Object.keys($scope.notes); 
			console.log(JSON.stringify($scope.notes,null,4));
		}
		$state.go('app.home');
	}
	
	//calls when user clicks cancel button
	$scope.cancelNote = function(){
		
		$scope.memNote['title'] = ""; 
		$scope.memNote['description'] = ""; 
		$scope.memNote['attachments'] = [];
		$scope.selectedCategory = "Choose a category";
		$state.go('app.home');
		
	}
	
	//calls when user clicks new note button
	$scope.clearNote = function(){
		
		$scope.memNote['title'] = ""; 
		$scope.memNote['description'] = ""; 
		$scope.memNote['attachments'] = [];
		$scope.selectedCategory = "Choose a category";
	}
	
	//setting category on click of choose category screen
	$scope.setCategory = function(categ){
	
		$scope.selectedCategory = categ;
		$state.go('app.new-node');
	}
	
	
	//adding new category in choose category screen
	$scope.addNewCategory = function(){
		
		if($scope.searchCateg.category === undefined || $scope.searchCateg.category ===""){
			
			$scope.modal5.show();
		}
		else if($scope.notes[$scope.searchCateg.category] !== undefined){
			
			$scope.modal6.show();
		}
		else{
			
			$scope.modal4.show();
		}
	}
	
	
	//calls when we want to create new category
	$scope.createCategory = function(){
		
		$scope.modal4.hide();
		if($scope.searchCateg.category !== undefined || $scope.searchCateg.category !=="" 
			|| $scope.notes[$scope.searchCateg.category] === undefined){
			
			var tmpnotes = DataService.addNewCategory($scope.searchCateg.category);
			if(tmpnotes === "ERROR"){
				// error modal
			}
			else{
				$scope.notes = tmpnotes;
				$scope.categories = Object.keys($scope.notes); 
			}
		}
		$scope.searchCateg.category = "";
	}
	
	//Calls when you click category from home
	$scope.toHomeCategory = function(category){
		
		$scope.showNote['category'] = category;
		$scope.HomeCategory = $scope.notes[category];
		$scope.searchCategHome['category'] = "" ;
		$state.go('app.home-category');
	}
	
	
	//Calls when you click note from home-category 
	$scope.toCategoryNote = function(note){
		
		$scope.showNote['title'] = note.title;
		$scope.showNote['description'] = note.description;
		$scope.showNote['attachments'] = note.attachments;
		$scope.searchCategHomeCat['category'] ="";
		$state.go('app.home-category-note');
	}
	
	
	//Remove category - for modal
	$scope.removeCategory = function(categ){
		
		$scope.categoryToDelete = categ;
		$scope.modal7.show();
	}
	
	
	//delete category from storage
	$scope.deleteCategory = function(){
		
		$scope.modal7.hide();
		var tmpnotes = DataService.removeCategory($scope.categoryToDelete);
		if(tmpnotes === "ERROR"){
			// error modal
		}
		else{
			$scope.notes = tmpnotes;
			$scope.categories = Object.keys($scope.notes); 
		}
	}
	
	
	//Remove Note - for modal(not)
	$scope.removeNote = function(note){
		
		$scope.noteToDelete = note;
		$scope.modal8.show();
	}
	
	
	//delete note from storage
	$scope.deleteNote = function(){
		
		$scope.modal8.hide();
		var tmpnotes = DataService.removeNote($scope.showNote['category'],$scope.noteToDelete['title'],$scope.noteToDelete['date']);
		if(tmpnotes === "ERROR"){
			// error modal
		}
		else{
			$scope.notes = tmpnotes;
			$scope.categories = Object.keys($scope.notes); 
			$scope.HomeCategory = $scope.notes[$scope.showNote['category']];
		}
	}
	
	
	//Choose attachment type
	$scope.openAttachment = function(){
		
		$scope.modal9.hide();
		console.log("attachment.type "+$scope.attachment.type);
	}
	
	
	//***********************
	//  Modal controls 
	//***********************
	
	//model for "No title" while submitting the note
	$ionicModal.fromTemplateUrl('templates/noTitleModal.html', {
		scope: $scope,
		animation: 'fade-in'
	  }).then(function(modal) {
		  
	    $scope.modal1 = modal;
	}); 
	
	
	//model for "No category" while submitting the note
	$ionicModal.fromTemplateUrl('templates/noCategoryModal.html', {
		scope: $scope,
		animation: 'fade-in'
	  }).then(function(modal) {
		  
	    $scope.modal2 = modal;
	}); 
	
	
	//model for confirmation of new note creation
	$ionicModal.fromTemplateUrl('templates/createConfirmationModal.html', {
		scope: $scope,
		animation: 'fade-in'
	  }).then(function(modal) {
		  
	    $scope.modal3 = modal;
	}); 
	
	

	//model for confirmation of new category creation
	$ionicModal.fromTemplateUrl('templates/addCategoryModal.html', {
		scope: $scope,
		animation: 'fade-in'
	  }).then(function(modal) {
		  
	    $scope.modal4 = modal;
	}); 
	
	
	//model for error of new category creation - no input
	$ionicModal.fromTemplateUrl('templates/emptyInput.html', {
		scope: $scope,
		animation: 'fade-in'
	  }).then(function(modal) {
		  
	    $scope.modal5 = modal;
	}); 
	
	
	//model for error of new category creation - existing input
	$ionicModal.fromTemplateUrl('templates/existingInput.html', {
		scope: $scope,
		animation: 'fade-in'
	  }).then(function(modal) {
		  
	    $scope.modal6 = modal;
	}); 
	
	//model for remove a category
	$ionicModal.fromTemplateUrl('templates/removeCategoryConfirmation.html', {
		scope: $scope,
		animation: 'fade-in'
	  }).then(function(modal) {
		  
	    $scope.modal7 = modal;
	}); 
	
	//model for remove a note
	$ionicModal.fromTemplateUrl('templates/removeNoteConfirmation.html', {
		scope: $scope,
		animation: 'fade-in'
	  }).then(function(modal) {
		  
	    $scope.modal8 = modal;
	}); 
	
	
	//model for attachment chooser
	$ionicModal.fromTemplateUrl('templates/attachmentChooser.html', {
		scope: $scope,
		animation: 'fade-in'
	  }).then(function(modal) {
		  
	    $scope.modal9 = modal;
	});
	
});