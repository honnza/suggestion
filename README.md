suggestion
==========
Suggestion is a simple drop down suggestion box which can be scrolled through using the up and down arrow keys or by clicking directly an an element in the list

______
To install suggestion, include jquery.min.js and suggestiveInput.js in your html file.

It is also worth adding searchIcon.png to your images folder.

_______

To use suggestion, call the method suggestiveInput(inputName, options)

Where input name is the name of the (hidden) input field that will hold the value.

And options is an array, whose key is the value which will populate the hidden field, and whose value is the actuall suggestion item.

Example Call:

<script>

options = new Array();
options['value1'] = 'great first value';
options['value2'] = 'great second value';

suggestiveInput("tester", options)
</script>
