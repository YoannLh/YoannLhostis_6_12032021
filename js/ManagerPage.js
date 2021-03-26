const arrayMedia = [];

class ManagerPage {
	constructor() {
		this.mainInPage = document.getElementById("mainInPage");
		this.containerMedia = document.getElementById("container-media");
		this.id;
		this.photographer;
		this.media = [];
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
	displayTags() {
		return this.photographer.tags.map(tag => {
			return '<div class="mainInPage__photographer__tags">' + "#" + tag + '</div>';
		})
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
					'<div class="flex">' + this.displayTags() + '</div>' + 
				'</div>' + 
			'</section>'
	}	
	displayMedia() {
		return this.containerMedia.innerHTML =
			arrayMedia.map(media => {
				// Factory
				return (
					'<img src="../images/photos/' + this.photographer.name + '/' + media.image + '" />' +
					'<div class="infoPhotos flex">' + 
						'<div>' + media.image + '</div>' + 
						'<div class="priceAndLikes flex">' +
							'<div>' + media.price + '€</div>' + 
							'<div id="containerHearth' + media.id + '">' + media.likes + '<i class="fas fa-heart" id="hearth' + media.id + '"></i></div>' + 
						'</div>' +
					'</div>'
				)
			});
	}
	clickOnHearth() {
		arrayMedia.map(media => {
			document.getElementById("containerHearth" + media.id + "").addEventListener("click", () => {
				console.log("clicked on " + media.id);
				document.getElementById("containerHearth" + media.id + "").innerHTML =  
					'<div id="containerHearth' + media.id + '">' + 
						(media.likes + 1) + 
						'<i class="fas fa-heart" id="hearth' + media.id + '"></i>' +
					'</div>';
					console.log(media.likes++);
			})
		})
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
setTimeout(() => managerPage.clickOnHearth(), 300);
managerPage.clickOnButtons();
managerPage.listeningInputs();
setTimeout(() => managerPage.displayMedia(), 100);











