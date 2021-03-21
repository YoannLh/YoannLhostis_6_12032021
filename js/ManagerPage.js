const arrayMedia = [];

class ManagerPage {
	constructor() {
		this.mainInPage = document.getElementById("mainInPage");
		this.containerMedia = document.getElementById("container-media");
		this.id;
		this.photographer;
		this.media = [];
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
							'<div>' + media.likes + '<3</div>' + 
						'</div>' +
					'</div>'
				)
			});
	}
}

const managerPage = new ManagerPage();
managerPage.getIdThenPhotographer();
managerPage.askJsonForPhotosAndVideos();
managerPage.displayPhotographer();
setTimeout(() => managerPage.displayMedia(), 100);











