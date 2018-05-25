let filterInput = document.getElementById('filterInput');

if (filterInput === '') {
    document.getElementById('addContact').style.display = 'none';
}

document.getElementById('contactForm').addEventListener('submit', function(event){
    event.preventDefault();
    addContact();
});

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

if (localStorage.getItem('contacts') !== null) {
    contacts = JSON.parse(localStorage.getItem('contacts'));
}  

generateList(contacts);

filterInput.addEventListener('keyup', filterNames);

function generateList(obj, search){   
    let names =''; 

    for (x in obj) {
        if (obj[x].length > 0){
            names += '<li class="collection-header" style="background-color: #63d7cb">' +
            '<h5>' + x + '</h5>' +
            '</li>';

            var sorted = obj[x].sort();
            if (search !== undefined) {
                
                sorted.forEach((e) => {
                    let n = `'${e}'`;
    
                    names += '<li class="collection-item">' +
                    '<a href="#"><b>' + search + '</b>' + e.substr(search.length) + '</a>' +
                    '<a href="#" style="font-size:20px" onclick="removeContact(' + n + ')"> X </a>' +
                    '</li>';
                });      
            } else {
            sorted.forEach((e) => {
                let n = `'${e}'`;

                names += '<li class="collection-item">' +
                '<a href="#">' + e + '</a>' +
                '<a href="#" style="font-size:20px" onclick="removeContact(' + n + ')"> X </a>' +
                '</li>';
            });      
        }             
        }   
    }
    document.getElementById('names').innerHTML = names;
}

function filterNames() {

    let filterValue = document.getElementById('filterInput').value;  

    let firstVal = filterValue.substr(0, 1).toUpperCase();

    let capFilVal = firstVal + filterValue.substr(1);

    let regex = new RegExp('^' + filterValue, 'i');

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
    generateList(filteredContacts, capFilVal);
    
    if(filterValue.length > 0 && Object.keys(filteredContacts).length === 0) {
        document.getElementById('addContact').style.display = 'block';
    } else {
        document.getElementById('addContact').style.display = 'none';
    }
}

function addContact() {

    let filterValue = document.getElementById('filterInput').value;  

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

function removeContact(name) {
    let names = contacts[name.charAt(0)];

    let nameRemoved = names;

    let toRemove = names.indexOf(name);

    nameRemoved.splice(toRemove, 1);

    contacts[name.charAt(0)] = nameRemoved; 
    
    localStorage.setItem('contacts', JSON.stringify(contacts));

    generateList(contacts);

    filterInput.blur();
}