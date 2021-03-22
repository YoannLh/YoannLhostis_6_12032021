const arrayMedia = [];

class ManagerPage {
	constructor() {
		this.mainInPage = document.getElementById("mainInPage");
		this.containerMedia = document.getElementById("container-media");
		this.id;
		this.photographer;
		this.media = [];
		this.containerHearth = document.getElementById("containerHearth");
		this.button = document.getElementById("button");
		this.modal = document.getElementById("modal");
		this.headerModalPhotographer = document.getElementById("headerModal__photographer");
		this.firstname = document.getElementById("firstname");
		this.lastname = document.getElementById("lastname");
		this.email = document.getElementById("email");
		this.message = document.getElementById("message");
		this.closeModal = document.getElementById("closeModal");
	}
	getIdThenPhotographer() {
		let params = new URLSearchParams(document.location.search.substring(1));
		this.id = params.get("id");
		this.photographer = JSON.parse(sessionStorage.getItem("photographer" + this.id + ""));
		console.log(this.photographer);
	}
	askJsonForPhotosAndVideos() {
		let id = this.id;
		const request = new XMLHttpRequest();
  		request.onreadystatechange = function() {
  			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                this.data = JSON.parse(this.response);
                console.log(id);
				for(const media of this.data.media) {
					if(id == media.photographerId) {
						arrayMedia.push(media);
					}
				}
				console.log(arrayMedia);
			}
		}
		request.open("GET", "../data/data.json");
        request.send();
	}
	displayPhotographer() {
		return this.mainInPage.innerHTML =
			'<section class="mainInPage__photographer">' + 
				'<div class="mainInPage__photographer__photo flex">' + 
					'<img src="../images/photos/' + this.photographer.name + '/' + this.photographer.portrait + '" />' + 
				'</div>' + 
				'<div class="mainInPage__photographer__description">' + 
					'<div class="mainInPage__photographer__description__name"><p>' + this.photographer.name + '</p></div>' +
					'<div class="mainInPage__photographer__description__city"><p>' + this.photographer.city + ", " + this.photographer.country + '</p></div>' +
					'<div class="mainInPage__photographer__description__tagline"><p>' + this.photographer.tagline + '</p></div>' +
					'<div class="mainInPage__photographer__tags">' + this.photographer.tags + '</div>' + 
				'</div>' + 
			'</section>'
	}	
	displayMedia() {
		return this.containerMedia.innerHTML =
			arrayMedia.map(media => {
				return (
					'<img src="../images/photos/' + this.photographer.name + '/' + media.image + '" />' +
					'<div class="infoPhotos flex">' + 
						'<div>' + media.image + '</div>' + 
						'<div class="priceAndLikes flex">' +
							'<div>' + media.price + '€</div>' + 
							'<div id="containerHearth">' + media.likes + '<i class="heart fas fa-heart"></i></div>' + 
						'</div>' +
					'</div>'
				)
			});
	}
	clickOnHearth() {
		// this.containerHearth.addEventListener("click", () => {
		// 	console.log("hearth clicked");
		// })
	}
	clickOnButtons() {
		this.button.addEventListener("click", () => {
			this.modal.style.display = "block";
			this.headerModalPhotographer.innerHTML = this.photographer.name;
		})
		this.closeModal.addEventListener("click", () => {
			this.modal.style.display = "none";
		})
	}
	listeningInputs() {
		this.firstname.addEventListener("input", () => {
			console.log(event.target.value)
		});
		this.lastname.addEventListener("input", () => {
			console.log(event.target.value)
		});
		this.email.addEventListener("input", () => {
			console.log(event.target.value)
		});
		this.message.addEventListener("input", () => {
			console.log(event.target.value)
		});
	}
}

const managerPage = new ManagerPage();
managerPage.getIdThenPhotographer();
managerPage.askJsonForPhotosAndVideos();
managerPage.displayPhotographer();
setTimeout(() => managerPage.clickOnHearth(), 1000);
managerPage.clickOnButtons();
managerPage.listeningInputs();
setTimeout(() => managerPage.displayMedia(), 100);











