/********* Suggestive javascript input box **********************/
/********* Written by Michael Joy for free open source use ******/

//Holds the number of times suggestion boxes have been printed...
//var suggestiveInputCount=1;

var suggestionBoxVisible = 0;
var activeSuggestion=0;
var suggestionOptions;
var suggestions = new Array();


with (document) {
	
	//Write the style for the suggestion box and input
	writeln('<style>');
	writeln('.suggestions{background-color: white;border: 1px solid #A2BFF0; border-top: 0px; width:198px; visibility: hidden; position: absolute;}');
	writeln('ul.suggestionList{margin: 1px; padding: 0px; list-style: none;background-color: white;}');
	writeln('ul.suggestionList li{background-color: #fff; text-align: left;}');
	writeln('ul.suggestionList li a{ display: block; text-decoration: none;font-size: 11px; color: #999; border: none; background-color: white;}');
	writeln('ul.suggestionList li:hover{background: #D5E2FF; text-decoration: none;}');
	writeln('input.suggestiveInput{color: grey;width: 200px;border: 1px solid grey;background: url(\'images/searchIcon.png\') no-repeat;background-position: right center;background-repeat: no-repeat;margin:0px;}');
	writeln('input.suggestiveInput:focus{outline-width: 0;}');
	writeln('</style>');
	
}


function suggestiveInput(inputName, options){
	
	
	
	//Print input box and suggestion container
	document.write("<input spellcheck=\"false\" autocomplete=\"off\" class=\"suggestiveInput\" id=\"suggestiveInput\" type=\"text\" >");
	document.write("<input type=\"hidden\" id=\"suggestiveInputValue\" name=\""+inputName+"\">");
	document.write("<div class=\"suggestions\" id=\"suggestions\">");
	document.write("<ul class=\"suggestionList\" id=\"suggestionList\">");
	document.write("<ul></div>");
	
	suggestionOptions = options;
	
	//suggestiveInputCount++;
	
}


$(document).ready(function(){
	
	$("#suggestiveInput").keyup(function(event){
		
		//Get the key pressed
		var nbr = (window.event)?event.keyCode:event.which;
  		var mykeycode= nbr;
  		 
		if (mykeycode == 40 || mykeycode == 38)
        {
        	
        	if( activeSuggestion != 0){
        		
        		//Return old Li item to red..
        		$("#suggestion"+activeSuggestion).css('color', '#999');
        		$("#suggestion"+activeSuggestion).css('font-weight', 'normal');
        		
        	}
        	
        	if (mykeycode == 40 && (activeSuggestion+1) < suggestions.length){
	        	activeSuggestion++;
        	}else if(mykeycode == 38 && activeSuggestion > 0){
        		activeSuggestion--;
        		
        	}
        	
        	
        	
        	$("#suggestion"+activeSuggestion).css('color', 'red');
        	$("#suggestion"+activeSuggestion).css('font-weight', 'bold');
        	
        	editField(suggestions[activeSuggestion]);
        	//alert(activeSuggestion);
       
        }else if (mykeycode == 39){
        			
        			
        }else if (mykeycode == 13){
        	//tab pressed
        	
        	
        }else{
        	
        	activeSuggestion=0;
        	//lastCompany = 0;
			
			if ($("#suggestiveInput").val() != ""){
				
				//Loop through options and see if any matches..
				suggestions = new Array();
				var suggestionList = "";
				var i = 1;
				for (var optionValue in suggestionOptions) {
					if (suggestionOptions.hasOwnProperty(optionValue)) { 
						
						
						var option = suggestionOptions[optionValue].toLowerCase();
						
						//Search string
						var searchString = $("#suggestiveInput").val().toLowerCase();
						
						var index = option.search(searchString);
					
						if(index!=-1){
							//match found..
							suggestions[i] = optionValue;
							
							var listItem = suggestionOptions[optionValue].substring(0,(index))+"<b><font color=\"black\">"+suggestionOptions[optionValue].substring((index),(index+searchString.length))+"</font></b>"+suggestionOptions[optionValue].substring((index+searchString.length),(option.length));
							
							suggestionList+="<li><a id=\"suggestion"+i+"\" href=\"javascript:editField('"+optionValue+"')\">"+listItem+"</a>";
							i++;
							
						}
					}
				}
				
				$("#suggestionList").html(suggestionList);
				
				//show suggestions...
				
				showSuggestionBox();
				
			}else{
				//nothing in text field.. hide
				
				hideSuggestionBox();
			}
		}
	})
			
			
	
	$("#suggestiveInput").blur(function(event){
		
		//We want to cehck if there was one more suggestion...
		//if(suggestionIds.length==1){
			
		//	editField(items[suggestionIds[0]]);
		//	hideSuggestionBox();
		//}
		
		hideSuggestionBox();
	
	})
	
	
	function showSuggestionBox(){
	
		if(suggestionBoxVisible==0){
			//we need to show it..
			
			$("#suggestions").fadeIn('slow', function(){
				$("#suggestions").css('visibility', 'visible');
				$("#suggestions").hide();
				$("#suggestions").fadeIn('slow');
			});
					
			suggestionBoxVisible=1;
		}
	}
	
	function hideSuggestionBox(){
		
		if(suggestionBoxVisible==1){
			//we need to hide it..
			
			$("#suggestions").fadeOut('fast', function(){
				$("#suggestions").css('visibility', 'hidden');
			});
			
			suggestionBoxVisible=0;
		}
	}
	
	
})

function editField(item){
	
	//alert(item);
	$("#suggestiveInput").val(suggestionOptions[item]);
	
	//We want to set our hidden field to the id of this new item..
	$("#suggestiveInputValue").val(item);
	
	
	blur();
}