
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

generateList();

filterInput.addEventListener('keyup', filterNames);

function generateList(){   
    let names =''; 

    if (localStorage.getItem('contacts') !== null) {
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }  

    for (x in contacts) {
        if (contacts[x].length > 0){
            names += '<li class="collection-header">' +
            '<h5>' + x + '</h5>' +
            '</li>';

            var sorted = contacts[x].sort();

            sorted.forEach((e) => {
                let n = `'${e}'`;

                names += '<li class="collection-item">' +
                '<a href="#">' + e + '</a>' +
                '<a href="#" onclick="removeContact(' + n + ')"> X </a>' +
                '</li>';
            });                   
        }   
    }
    document.getElementById('names').innerHTML = names;
}

function filterNames() {

    let filterValue = document.getElementById('filterInput').value;  

    let ul = document.getElementById('names');

    let li = ul.querySelectorAll('li.collection-item');

    let regex = new RegExp('^' + filterValue, 'i');

    for (i=0; i < li.length; i++) {

        let a = li[i].getElementsByTagName('a')[0];

        if(a.innerHTML.match(regex)) {
            li[i].style.display= '';
        } else {
            li[i].style.display = 'none';
        }

    }

    let liArr = [];

    li.forEach((e) => {
        liArr.push(e.style);
    });

    let displayArr = [];

    liArr.forEach((e) => {
        displayArr.push(e.display);
    });

    if(displayArr.every((item) => {return item === 'none'})) {
        document.getElementById('addContact').style.display = 'initial';
    } else {
        document.getElementById('addContact').style.display = 'none';
    }
}

function addContact() {

    let filterInput = document.getElementById('filterInput').value;  

     if (document.getElementById('addContact').style.display === 'none') {
         return false;
     } else {

    let contactVal = filterInput.charAt(0).toUpperCase() + filterInput.substr(1);

    contacts[contactVal[0]].push(contactVal);

    localStorage.setItem('contacts', JSON.stringify(contacts));

    document.getElementById('contactForm').reset();

    generateList();
    }
}

function removeContact(name) {
    let names = contacts[name.charAt(0)];

    let nameRemoved = names;

    let toRemove = names.indexOf(name);

    nameRemoved.splice(toRemove, 1);

    contacts[name.charAt(0)] = nameRemoved; 
    
    localStorage.setItem('contacts', JSON.stringify(contacts));

    generateList();

    filterInput.blur();
    
}