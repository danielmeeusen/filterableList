let filterInput = document.getElementById('filterInput');
//makes sure that if there is no text in the search box the 'addcontact' button will not appear
if (filterInput === '') {
		document.getElementById('addContact').style.display = 'none';
}
// create event listener if form is submitted
document.getElementById('contactForm').addEventListener('submit', function(event){
		event.preventDefault();
		addContact();
});

//initial object local memory will be set to if no previous object is found
let contacts = {
		A:[],
		B:[],
		C:['Charlie'],
		D:['Dennis', 'Dee'],
		E:[],
		F:['Frank'],
		G:[],
		H:[],
		I:[],
		J:[],
		K:[],
		L:[],
		M:['Mac'],
		N:[],
		O:[],
		P:[],
		Q:[],
		R:[],
		S:[],
		T:[],
		U:[],
		V:[],
		W:[],
		X:[],
		Y:[],
		Z:[]            
};

// if no object called 'contacts' is found in local storage add the contacts object above to localStorage
if (localStorage.getItem('contacts') !== null) {
		contacts = JSON.parse(localStorage.getItem('contacts'));
}  

// runs our main  function
generateList(contacts);

// add event listenier to run filterNames function on keyup
filterInput.addEventListener('keyup', filterNames);

// function sorts and iterates contacts object to translate and publish it into readable html 
// function takes to args: 'obj' is the contacts object weather it be user customized or the initial one,
// 'search' is the string entered in the search form to be bolded in results, if a string is entered
function generateList(obj, search){   
		let names =''; 
		for (x in obj) {
				if (obj[x].length > 0){
						names += '<li class="collection-header">' +
						'<h5>'+ x +'</h5>' +
						'</li></div>';
						var sorted = obj[x].sort();
					//bolded
						if (search !== undefined) {
								sorted.forEach((e) => {
										let n = `'${e}'`;
										names += `<div class="itemCont">` +
											'<li class="collection-item">' +
										'<a href="#"><b>' + search + '</b>' + e.substr(search.length) + '</a>' +
										'<a href="#" style="font-size:20px" onclick="removeContact(' + n + ')"> X </a>' +
										'</li></div>';
								});      
							//unbolded
						} else {
						sorted.forEach((e) => {
								let n = `'${e}'`;
								names += `<div class="itemCont">` +
								'<li class="collection-item">' +
								'<a href="#">' + e + '</a>' +
								'<a href="#" style="font-size:20px" onclick="removeContact(' + n + ')"> X </a>' +
								'</li></div>';
						});      
				}             
				}   
		}
	// populate html script to html file
		document.getElementById('names').innerHTML = names;
}
// function called during keyup to filter and bold names.
function filterNames() {
		let filterValue = filterInput.value;  
		let firstVal = filterValue.substr(0, 1).toUpperCase();
		let capFilVal = firstVal + filterValue.substr(1);
		let regex = new RegExp('^' + filterValue, 'i');
	// temporary object where filtered names are stored to be run through generate list function and shown
		let filteredContacts = {};
			 for (x in contacts) {
				contacts[x].forEach((e) => {
						if(e.match(regex)){
								if (!filteredContacts[x]) {
								filteredContacts[x] = [e];
								} else {
								filteredContacts[x].push(e);
								}
						}
				});
		}
	// generate list function called with temporarily stored filtered contact object and serach term
		generateList(filteredContacts, capFilVal);
	// if text is entered in to search that does not match text in contacts object, show 'addcontact' button,
	// else don't show it.
		if(filterValue.length > 0 && Object.keys(filteredContacts).length === 0) {
				document.getElementById('addContact').style.display = 'block';
		} else {
				document.getElementById('addContact').style.display = 'none';
		}
}

// function to add name to contacts list and store it in localStorage
function addContact() {
		let filterValue = filterInput.value;  
		 if (document.getElementById('addContact').style.display === 'none') {
				 return false;
		 } else {
		let contactVal = filterValue.charAt(0).toUpperCase() + filterValue.substr(1);
		contacts[contactVal[0]].push(contactVal);
		localStorage.setItem('contacts', JSON.stringify(contacts));
		document.getElementById('contactForm').reset();
		generateList(contacts);
		}
}
// function to remove name to contacts list and store it in localStorage
function removeContact(name) {
		let names = contacts[name.charAt(0)];
		let nameRemoved = names;
		let toRemove = names.indexOf(name);
		nameRemoved.splice(toRemove, 1);
		contacts[name.charAt(0)] = nameRemoved; 
		localStorage.setItem('contacts', JSON.stringify(contacts));
		generateList(contacts);
}
