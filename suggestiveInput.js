/********* Suggestive javascript input box **********************/
/********* Written by Michael Joy for free open source use ******/


var suggestionBoxVisible = new Array();
var activeSuggestion = new Array();
var suggestionOptions = new Array();
var suggestions = new Array();
var suggestionRequired = new Array();
var suggestionAdditionalLinks = new Array();
var suggestionCount = 0;

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


with (document) {
	
	//Write the style for the suggestion box and input
	writeln('<style>');
	writeln('.suggestions{background-color: white;border: 1px solid #A2BFF0; border-top: 0px; width:198px; visibility: hidden; position: absolute;}');
	writeln('.suggestionContainer{padding:10px;}');
	writeln('ul.suggestionList{margin: 1px; padding: 0px; list-style: none;background-color: white;}');
	writeln('ul.suggestionList li{background-color: #fff; text-align: left;}');
	writeln('ul.suggestionList li a{ display: block; text-decoration: none;font-size: 11px; color: #999; border: none; background-color: white;}');
	writeln('ul.suggestionList li:hover{background: #D5E2FF; text-decoration: none;}');
	writeln('input.suggestiveInput{color: grey;width: 200px;border: 1px solid grey;background: url(\'images/searchIcon.png\') no-repeat;background-position: right center;background-repeat: no-repeat;margin:0px;}');
	writeln('input.suggestiveInput:focus{outline-width: 0;}');
	writeln('a.javaLink{cursor: pointer;}');
	writeln('</style>');
	
}


function suggestiveInput(inputName, options, required, functionLinks ){
	
	suggestionCount++;
	var inputId = "suggestiveInput"+suggestionCount;
	
	if(required==null)required = 0;
	
	if(functionLinks!=null){
		
		suggestionAdditionalLinks[inputId] = functionLinks;
	}
	
	
	suggestionRequired[inputId] = required;
	activeSuggestion[inputId] = 0;
	suggestionBoxVisible[inputId]=0;
	suggestionOptions[inputId] = options;
	//suggestions[inputId] = new Array();
	
	//Print input box and suggestion container
	document.write("<div class=\"suggestionContainer\">");
	document.write("<input spellcheck=\"false\" autocomplete=\"off\" class=\"suggestiveInput\" id=\""+inputId+"\" type=\"text\" >");
	document.write("<input type=\"hidden\" id=\""+inputId+"InputValue\" name=\""+inputName+"\">");
	document.write("<div class=\"suggestions\" id=\""+inputId+"Suggestions\">");
	document.write("<ul class=\"suggestionList\" id=\""+inputId+"SuggestionList\">");
	document.write("<ul></div></div>");
	
	
		
}


$(document).ready(function(){
	
	$(".suggestiveInput").keyup(function(event){
		//alert( this.id );
		//Get the key pressed
		var nbr = (window.event)?event.keyCode:event.which;
  		var mykeycode= nbr;
  		 
		if (mykeycode == 40 || mykeycode == 38)
        {
        	
        	//Remove the red and bold from last selection
        	if( activeSuggestion[this.id] != 0){
        		
        		$("#"+this.id+"Suggestion"+activeSuggestion[this.id]).css('color', '#999');
        		$("#"+this.id+"Suggestion"+activeSuggestion[this.id]).css('font-weight', 'normal');
        		
        	}
        	
        	//Change the active selection depending on whether up or down key is pressed
        	if (mykeycode == 40 && (activeSuggestion[this.id]) < Object.size(suggestions[this.id])){
	        	activeSuggestion[this.id]++;
        	}else if(mykeycode == 38 && activeSuggestion[this.id] > 0){
        		activeSuggestion[this.id]--;
        	}
        	
        	
        	//Set selection to red and bold
        	$("#"+this.id+"Suggestion"+activeSuggestion[this.id]).css('color', 'red');
        	$("#"+this.id+"Suggestion"+activeSuggestion[this.id]).css('font-weight', 'bold');

        	//Edit the hidden field
        	editField(suggestions[this.id][activeSuggestion[this.id]], this.id);
       
        }else if (mykeycode == 39){
        			
        			
        }else if (mykeycode == 13){
        	//tab pressed
        	
        	
        }else{
        	//Some other character was pressed so begin searching..
        	//Reset active suggestion
        	activeSuggestion[this.id]=0;
			
			if ($("#"+this.id).val() != ""){
				
				//Loop through options and see if any matches..
				suggestions[this.id] = new Array();
				
				var suggestionList = "";
				var i = 1;
				for (var optionValue in suggestionOptions[this.id]) {
					//alert(Object.size(suggestions[this.id]));
					if (suggestionOptions[this.id].hasOwnProperty(optionValue)) { 
						
						var option = suggestionOptions[this.id][optionValue].toLowerCase();
						
						//Search string
						var searchString = $("#"+this.id).val().toLowerCase();
						
						var index = option.search(searchString);
					
						if(index!=-1){
							//match found..
							suggestions[this.id][i] = optionValue;
							
							var listItem = suggestionOptions[this.id][optionValue].substring(0,(index))+"<b><font color=\"black\">"+suggestionOptions[this.id][optionValue].substring((index),(index+searchString.length))+"</font></b>"+suggestionOptions[this.id][optionValue].substring((index+searchString.length),(option.length));
							
							suggestionList+="<li><a class=\"javaLink\" id=\""+this.id+"Suggestion"+i+"\" onClick=\"editField('"+optionValue+"','"+this.id+"')\">"+listItem+"</a>";
							i++;
							
						}
					}
				}
				
				for (var linkName in suggestionAdditionalLinks[this.id]) {
					if (suggestionAdditionalLinks[this.id].hasOwnProperty(linkName)) { 
						// or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
						alert("prop: " + linkName + " value: " + suggestionAdditionalLinks[this.id][linkName])
						suggestionList+="<li><a class=\"javaLink\" onClick=\""+suggestionAdditionalLinks[this.id][linkName]+"\">"+linkName+"</a>";
					}
				}
				
				$("#"+this.id+"SuggestionList").html(suggestionList);
				
				//show suggestions...
				showSuggestionBox(this.id);
				
			}else{
				
				//nothing in text field.. hide
				hideSuggestionBox(this.id);
			}
		}
	})
			
			
	
	$(".suggestiveInput").blur(function(event){
		
		//If this field is required, and there is only one suggestion, auto fill it..
		
		if( suggestionRequired[this.id] == 1 && Object.size(suggestions[this.id]) == 1){
			
			editField( suggestions[this.id][1], this.id );
		}else{
			
			//alert("required: "+suggestionRequired[this.id]+" length: "+suggestions[this.id].length+" Value: "+suggestions[this.id]);
		}
		
		
		hideSuggestionBox([this.id]);
	
	})
	
	
	function showSuggestionBox(inputId){
	
		if(suggestionBoxVisible[inputId]==0){
			//we need to show it..
			
			$("#"+inputId+"Suggestions").fadeIn('slow', function(){
				$("#"+inputId+"Suggestions").css('visibility', 'visible');
				$("#"+inputId+"Suggestions").hide();
				$("#"+inputId+"Suggestions").fadeIn('slow');
			});
					
			suggestionBoxVisible[inputId]=1;
		}
	}
	
	function hideSuggestionBox(inputId){
		
		if(suggestionBoxVisible[inputId]==1){
			//we need to hide it..
			
			$("#"+inputId+"Suggestions").fadeOut('fast', function(){
				$("#"+inputId+"Suggestions").css('visibility', 'hidden');
			});
			
			suggestionBoxVisible[inputId]=0;
		}
	}
	
	
})

function editField(item, inputId){
	
	$("#"+inputId).val(suggestionOptions[inputId][item]);
	
	//We want to set our hidden field to the id of this new item..
	$("#"+inputId+"InputValue").val(item);
	
	
	blur();
}