const request = 'https://jsonplaceholder.typicode.com/users'

const xhr = new XMLHttpRequest()

xhr.open('GET', request)
xhr.responseType = 'json';

xhr.onload = () => {
	//скрываем лоадер, показываем контейнер
	document.getElementById("loading").style.display="none";
	document.getElementById("container").style.display="flex";


	let header = document.getElementById('header-block');

	//создание массива и перенос в него данных из JSON
	let array = [];
	for (var i = 0; i < xhr.response.length; i++) {		
		array.push(xhr.response[i]);	
	}
	console.log(array);


	// обновление данных в модальном окне
	let modalData = (event) => {
		console.log(event.target.innerHTML);		
		for (var i = 0; i < array.length; i++) {
			if (array[i].id == event.target.innerHTML || array[i].name == event.target.innerHTML
			|| array[i].username == event.target.innerHTML || array[i].email == event.target.innerHTML
			|| array[i].website == event.target.innerHTML) {				
				document.getElementById("username-number").innerHTML = array[i].id;
				document.getElementById("username-modal").innerHTML = array[i].name;
				document.getElementById("street").innerHTML = array[i].address.street;
				document.getElementById("suite").innerHTML = array[i].address.suite;
				document.getElementById("city").innerHTML = array[i].address.city;
				document.getElementById("zipcode").innerHTML = array[i].address.zipcode;
				document.getElementById("geo-lat").innerHTML = array[i].address.geo.lat;
				document.getElementById("geo-lng").innerHTML = array[i].address.geo.lng;
				document.getElementById("phone").innerHTML = array[i].phone;
				document.getElementById("company-name").innerHTML = array[i].company.name;
				document.getElementById("company-phrase").innerHTML = array[i].company.catchPhrase;
				document.getElementById("company-bs").innerHTML = array[i].company.bs;
			}
		}
		return;		
	}
	let updateModal = () => {
		for (var i = 0; i < document.getElementsByClassName('row').length; i++) {			
			document.getElementsByClassName('row')[i].addEventListener("click", modalData);		
		}		
	}


	//отрисовка таблицы
	let addNewRow = (number, name, username, email, Website) => {
		//console.log(number, name, username, email, Website);
		return `<div class="row" onclick="openModal()">
			<div class="number section">${number}</div>
			<div class="name section">${name}</div>
			<div class="username section">${username}</div>
			<div class="email section">${email}</div>
			<div class="Website section">${Website}</div>
		</div>`;
	}	
	for (var i =  0; i < array.length; i++) {
		document.getElementById('container').innerHTML += addNewRow(array[i].id, array[i].name, array[i].username, array[i].email, array[i].website);		
	}
	updateModal();	


	// Сортировка
	let headerName="id";
	tableSort = c => {
		let arrayIndex = c.previousElementSibling.innerHTML.toLowerCase();		
		//console.log(arrayIndex);
		if (headerName == arrayIndex ) {
			array.reverse();				
		} else {
			array.sort((a,b) => {

				let nameA=a[arrayIndex];			
				let nameB=b[arrayIndex];

				if (nameA<nameB){
					return -1
				}
				if (nameA>nameB){
					return 1
				}
				return 0
			});
		}			
		
		headerName = c.previousElementSibling.innerHTML.toLowerCase();
		document.getElementById('container').innerHTML = "";
		document.getElementById('container').appendChild(header);		
		
		for (var i =  0; i < array.length; i++) {
			document.getElementById('container').innerHTML += addNewRow(array[i].id, array[i].name, array[i].username, array[i].email, array[i].website);		
		}
		updateModal();
	}
	

	openModal = () => {
		updateModal();
		document.getElementById('openModal').style.display = 'block';
	}

	closeModal = () => {
		document.getElementById('openModal').style.display = 'none';
	}		
		
}


xhr.send();

