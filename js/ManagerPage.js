
let arrayMedia = [];

class ManagerPage {
	constructor() {
		this.mainInPage = document.getElementById("mainInPage");
		this.sortBy = document.getElementById("sortBy");
		this.sortByPopularity = document.getElementById("sortByPopularity");
		this.sortByDate = document.getElementById("sortByDate");
		this.sortByTitle = document.getElementById("sortByTitle");
		this.sortByArray = [];
		this.containerMedia = document.getElementById("container-media");
		this.id;
		this.photographer;
		this.totalLikes = document.getElementById("totalLikes");
		this.price = document.getElementById("price");
		this.media = [];
		this.button = document.getElementById("button");
		this.modal = document.getElementById("modal");
		this.headerModalPhotographer = document.getElementById("headerModal__photographer");
		this.firstname = document.getElementById("firstname");
		this.lastname = document.getElementById("lastname");
		this.email = document.getElementById("email");
		this.message = document.getElementById("message");
		this.closeModal = document.getElementById("closeModal");
		this.modalLightBox = document.getElementById("modalLightBox");
		this.closeModalLightBox = document.getElementById("closeModalLightBox");
		this.modalLightBoxLeft = document.getElementById("modalLightBoxLeft");
		this.modalLightBoxContainerImg = document.getElementById("modalLightBox-containerImg");
		this.modalLightBoxRight = document.getElementById("modalLightBoxRight");
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
			console.log("tag : " + this.photographer.tags);
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
	listeningSortBy() {
		this.sortByPopularity.addEventListener("click", () => {
			console.log("popularity");
			this.sortByPopularity.style.zIndex = "4";
			this.sortByDate.style.zIndex = "3";
			this.sortByTitle.style.zIndex = "3";
			this.sortByPopularity.style.fontWeight = "bold";
			this.sortByDate.style.fontWeight = "normal";
			this.sortByTitle.style.fontWeight = "normal";
			// trie et renvoie arrayMedia par likes décroissants
			arrayMedia.sort((a, b) => {
 				return b.likes - a.likes;
			})
			this.displayMedia();
		})
		this.sortByDate.addEventListener("click", () => {
			console.log("date");	
			this.sortByPopularity.style.zIndex = "3";
			this.sortByDate.style.zIndex = "4";
			this.sortByTitle.style.zIndex = "3";
			this.sortByDate.style.fontWeight = "bold";
			this.sortByPopularity.style.fontWeight = "normal";
			this.sortByTitle.style.fontWeight = "normal";
			// trie et renvoie arrayMedia par dates croissantes
			arrayMedia.sort((a, b) => {
 				return a.date.replace(/-/gi, "") - b.date.replace(/-/gi, "");
			})
			this.displayMedia();

		})
		this.sortByTitle.addEventListener("click", () => {
			console.log("title");
			this.sortByPopularity.style.zIndex = "3";
			this.sortByDate.style.zIndex = "3";
			this.sortByTitle.style.zIndex = "4";
			this.sortByTitle.style.fontWeight = "bold";
			this.sortByPopularity.style.fontWeight = "normal";
			this.sortByDate.style.fontWeight = "normal";
			// trie et renvoie arrayMedia par ordre alphabétique des titres
			arrayMedia.sort((a, b) => {
 				return a.image - b.image;
			})
			console.log(arrayMedia);
			this.displayMedia();
		})
	}
	displayMedia() {
		// A factoriser
		setTimeout(() => this.searchMediaForLightBox(), 100);
		return this.containerMedia.innerHTML =
			arrayMedia.map(media => {
				if(media.image) {
					const newMedia = new MediaFactory(this.photographer.name, "image", media.date, media.id, media.likes, media.price, media.tags, media.image);
					return newMedia.displayNewMedia();
				}
				if(media.video) {
					const newMedia = new MediaFactory(this.photographer.name, "vidéo", media.date, media.id, media.likes, media.price, media.tags, media.video);
					return newMedia.displayNewMedia();
				}
			});
	}
	searchMediaForLightBox() {
		for(const media of arrayMedia) {
			if(media.image) {
				document.getElementById(media.id).addEventListener("click", () => {
					// Ces id ont été créés dans makeMiniatureIfVideoIfNotReturnImage() de MediaFactory (<img id=this.id...)	
					this.displayModalLightBox(this.photographer.name, media.image, arrayMedia.indexOf(media));
				})
			}
			if(media.video) {
				document.getElementById(media.id).addEventListener("click", () => {
					// Ces id ont été créés dans makeMiniatureIfVideoIfNotReturnImage() de MediaFactory (<img id=this.id...)	
					this.displayModalLightBox(this.photographer.name, media.video, arrayMedia.indexOf(media));
				})
			}	
		}
	}
	displayModalLightBox(name, image, index) {
		let length = arrayMedia.length - 1;
		let newIndex = index;
		this.modalLightBox.style.display = "flex";
		this.modalLightBoxContainerImg.innerHTML = '<img src="../images/photos/' + name + '/' + image + '" />';
		// clic fleche gauche
		this.modalLightBoxLeft.addEventListener("click", () => {
			newIndex--;
			if(newIndex === -1) {
				newIndex = length;
			}
			arrayMedia.map(media => {
				this.modalLightBoxContainerImg.innerHTML = '<img src="../images/photos/' + name + '/' + arrayMedia[newIndex].image + '" />';
			})
		})
		// clic fleche droite
		this.modalLightBoxRight.addEventListener("click", () => {
			newIndex++;
			if(newIndex === length + 1) {
				newIndex = index;
			}
			arrayMedia.map(media => {
				this.modalLightBoxContainerImg.innerHTML = '<img src="../images/photos/' + name + '/' + arrayMedia[newIndex].image + '" />';
			})
		})
		this.closeModalLightBox.addEventListener("click", () => {
			this.modalLightBox.style.display = "none";
		})
	}
	clickOnHearth() {
		let totalLikes = 0;
		arrayMedia.map(media => {
			totalLikes += media.likes;
			//this.totalLikes.innerHTML = totalLikes;
			document.getElementById("containerHearth" + media.id + "").addEventListener("click", () => {
				document.getElementById("containerHearth" + media.id + "").innerHTML =  
					'<div id="containerHearth' + media.id + '">' + 
						(media.likes + 1) + 
						'<i class="fas fa-heart" id="hearth' + media.id + '"></i>' +
					'</div>';
					media.likes++;
					this.totalLikes.innerHTML = '' + (totalLikes + 1) + ' ' + '<i class="fas fa-heart"></i>';
					totalLikes++;
				})
			this.totalLikes.innerHTML = totalLikes + ' ' + '<i class="fas fa-heart"></i>';
		})
	}displayPrice() {
		this.price.innerHTML = '' + this.photographer.price + '€ / jour';
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
managerPage.listeningSortBy();
setTimeout(() => managerPage.clickOnHearth(), 300);
managerPage.displayPrice();
managerPage.clickOnButtons();
managerPage.listeningInputs();
setTimeout(() => managerPage.displayMedia(), 100);














