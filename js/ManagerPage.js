
let arrayMedia = [];

const newData = [];

class ManagerPage {
	constructor() {
		this.body = document.getElementById("body");
		this.bodyFilter = document.getElementById("bodyFilter");
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
		this.formModal = document.getElementById("formModal");
		this.headerModalPhotographer = document.getElementById("headerModal__photographer");
		this.firstname = document.getElementById("firstname");
		this.lastname = document.getElementById("lastname");
		this.email = document.getElementById("email");
		this.message = document.getElementById("message");
		this.buttonFormModal = document.getElementById("buttonFormModal");
		this.closeModal = document.getElementById("closeModal");
		this.modalLightBox = document.getElementById("modalLightBox");
		this.closeModalLightBox = document.getElementById("closeModalLightBox");
		this.modalLightBoxLeft = document.getElementById("modalLightBoxLeft");
		this.modalLightBoxContainerImg = document.getElementById("modalLightBox-containerImg");
		this.modalLightBoxRight = document.getElementById("modalLightBoxRight");
		this.ariaVisibility = false;
	}
	getIdThenPhotographer() {
		let params = new URLSearchParams(document.location.search.substring(1));
		this.id = params.get("id");
		this.photographer = JSON.parse(sessionStorage.getItem("photographer" + this.id + ""));
	}
	askJsonForPhotosAndVideos() {
		let id = this.id;
		const request = new XMLHttpRequest();
  		request.onreadystatechange = function() {
  			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                this.data = JSON.parse(this.response);
				for(const media of this.data.media) {
					for(const alt of alts) {
						if(media.id == alt.id) {
							if(media.image) {
								newData.push(
									{
										"date": media.date,
										"id": media.id,
										"image": media.image,
										"alt": alt.alt,
										"likes": media.likes,
										"photographerId": media.id,
										"price": media.price,
										"tags": media.tags
									}
								)
							}
							if(media.video) {
								newData.push(
									{
										"date": media.date,
										"id": media.id,
										"video": media.video,
										"alt": alt.alt,
										"likes": media.likes,
										"photographerId": media.id,
										"price": media.price,
										"tags": media.tags
									}
								)
							}
						}
					}
					if(id == media.photographerId) {
						arrayMedia.push(media);
					}
				}
			}
		}
		request.open("GET", "../data/dataWithAlts.json");
        request.send();
	}
	displayTags() {
		return this.photographer.tags.map(tag => {
			return '<div class="mainInPage__photographer__tags">' + "#" + tag + '</div>';
		}).join('');
	}
	displayPhotographer() {
		return this.mainInPage.innerHTML =
			'<section class="mainInPage__photographer">' + 
				'<div class="mainInPage__photographer__photo flex">' + 
					'<img src="../images/portraits/' + this.photographer.portrait + '" alt="portait_of_'+ this.photographer + '"/>' + 
				'</div>' + 
				'<div class="mainInPage__photographer__description">' + 
					'<div class="mainInPage__photographer__description__name"><h1>' + this.photographer.name + '</h1></div>' +
					'<div class="mainInPage__photographer__description__city"><p>' + this.photographer.city + ", " + this.photographer.country + '</p></div>' +
					'<div class="mainInPage__photographer__description__tagline"><p>' + this.photographer.tagline + '</p></div>' +
					'<div class="flex">' + this.displayTags() + '</div>' + 
				'</div>' + 
			'</section>'
	}
	listeningSortBy() {
		this.sortByPopularity.addEventListener("click", () => {
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
			this.sortByPopularity.style.zIndex = "3";
			this.sortByDate.style.zIndex = "3";
			this.sortByTitle.style.zIndex = "4";
			this.sortByTitle.style.fontWeight = "bold";
			this.sortByPopularity.style.fontWeight = "normal";
			this.sortByDate.style.fontWeight = "normal";
			// trie et renvoie arrayMedia par ordre alphabétique des titres
			const titles = [];
			for(const media of arrayMedia) {
				if(media.image) {
					const titleCleaner = new TitleCleaner(media.image, media.tags);
					titleCleaner.titleToUpperCase();
					const obj = {date: media.date, id: media.id, likes: media.likes, price: media.price, tags: media.tags, image: titleCleaner.returnCleanedTitle()};
					titles.push(obj);
				}
				if(media.video) {
					const titleCleaner = new TitleCleaner(media.video, media.tags);
					titleCleaner.titleToUpperCase();
					const obj = {date: media.date, id: media.id, likes: media.likes, price: media.price, tags: media.tags, video: titleCleaner.returnCleanedTitle()};
					titles.push(obj);
				}
			}
			function compare(a, b) { 
  				if(a.image < b.image || a.image < b.video || a.video < b.image || a.video < b.video) {
    				return -1;
  				}
  				if(a.image  > b.image || a.image > b.video || a.video > b.image || a.video > b.video) {
    				return 1;
  				}
  				return 0;
			}
			titles.sort(compare);
			for(const media of arrayMedia) {
				for(const title of titles) {
					if(media.id == title.id) {
						title.image = media.image;	
						title.video = media.video;
					}
				}
			}
			arrayMedia = titles;
			setTimeout(() => this.displayMedia(), 100);
		})
	}
	displayMedia() {
		setTimeout(() => this.searchMediaForLightBox(), 100);
		setTimeout(() => this.clickOnHearth(), 100);
		return this.containerMedia.innerHTML =
			arrayMedia.map(media => {
				if(media.image) {
					const newMedia = new MediaFactory(this.photographer.name, "image", media.date, media.id, media.likes, media.price, media.tags, media.image, media.alt);
					return newMedia.displayNewMedia();
				}
				if(media.video) {
					const newMedia = new MediaFactory(this.photographer.name, "vidéo", media.date, media.id, media.likes, media.price, media.tags, media.video, media.alt);
					return newMedia.displayNewMedia();
				}
			}).join("");
	}
	searchMediaForLightBox() {
		for(const media of arrayMedia) {
			let type;
			let visibility;
			if(media.image) {
				document.getElementById(media.id).addEventListener("click", () => {
					// Ces id viennent de makeMiniatureIfVideoIfNotReturnImage() de MediaFactory (<img id=this.id...)	
					this.displayModalLightBox(this.photographer.name, media.image, media.tags, arrayMedia.indexOf(media), type="image");
				})
			}
			if(media.video) {
				document.getElementById(media.id).addEventListener("click", () => {
					// Ces id viennent de makeMiniatureIfVideoIfNotReturnImage() de MediaFactory (<video id=this.id...)	
					this.displayModalLightBox(this.photographer.name, media.video, media.tags, arrayMedia.indexOf(media), type="video");
				})
			}	
		}
	}
	displayModalLightBox(name, image, tags, index, type) {
		const titleCleaner = new TitleCleaner(image, tags);
		titleCleaner.titleToUpperCase();
		let length = arrayMedia.length - 1;
		let newIndex = index;
		this.body.ariaHidden = "false";
		this.modalLightBox.ariaHidden = "true";
		this.modalLightBox.style.display = "flex";
		let visibility = false;
		let displayImgOrVideo = () => {
			if(arrayMedia[newIndex].image) {
				const titleCleaner = new TitleCleaner(arrayMedia[newIndex].image, arrayMedia[newIndex].tags);
			titleCleaner.titleToUpperCase();
			visibility = true;
			this.modalLightBoxContainerImg.innerHTML = 
				'<div style="position: relative; display: flex; margin: auto; height: 100%; aria-hidden="' + visibility + '">' +
					'<img src="../images/photos/' + name + '/' + arrayMedia[newIndex].image + '" />' +
					'<p style="position: absolute; margin: 0; bottom: 1%; left: 0;">' + titleCleaner.returnCleanedTitle() + '</p>' + 
				'</div>';
			} else {
				visibility = false;
			}
			if(arrayMedia[newIndex].video) {
				const titleCleaner = new TitleCleaner(arrayMedia[newIndex].video, arrayMedia[newIndex].tags);
			titleCleaner.titleToUpperCase();
			visibility = true;
			this.modalLightBoxContainerImg.innerHTML = 
				'<div style="position: relative; display: flex; margin: auto; height: 100%; aria-hidden="' + visibility + '">' +
					'<video src="../images/photos/' + name + '/' + arrayMedia[newIndex].video + '" controls></video>' +
					'<p style="position: absolute; margin: 0; bottom: 1%; left: 0;">' + titleCleaner.returnCleanedTitle() + '</p>' + 
				'</div>';
			} else {
				visibility = false;
			}
		}
		displayImgOrVideo();
		let goPhotoLeft = () => {
			newIndex--;
			if(newIndex === - 1) {
				newIndex = length;
			}
			displayImgOrVideo();	
		}
		let goPhotoRight = () => {
			newIndex++;
			if(newIndex === length + 1) {
				newIndex = 0;
			}
			displayImgOrVideo();
		}
		// clic fleche gauche lightbox
		this.modalLightBoxLeft.addEventListener("click", () => {
			goPhotoLeft();
		})
		// clic fleche gauche clavier
		document.addEventListener("keydown", () => { 
			let nameKey = event.key;
			if (nameKey == "ArrowLeft") {
				goPhotoLeft();
			}
		})
		// clic fleche droite lightbox
		this.modalLightBoxRight.addEventListener("click", () => {
			goPhotoRight();
		})
		// clic fleche droite clavier
		document.addEventListener("keydown", () => { 
			let nameKey = event.key;
			if (nameKey == "ArrowRight") {
				goPhotoRight();
			}
		})
		let closeLightBox = () => {
			this.modalLightBox.style.display = "none";
			this.modalLightBox.ariaHidden = "false";
			this.body.ariaHidden = "true";
		}
		this.closeModalLightBox.addEventListener("click", () => {
			closeLightBox();
		})
		document.addEventListener("keydown", () => { 
			let nameKey = event.key;
			if (nameKey === "Escape") {
				closeLightBox();
			}
		})
	}
	clickOnHearth() {
		let totalLikes = 0;
		arrayMedia.map(media => {
			totalLikes += media.likes;
			document.getElementById("containerHearth" + media.id + "").addEventListener("click", () => {
				document.getElementById("containerHearth" + media.id + "").innerHTML =  
					'<div id="containerHearth' + media.id + '">' + 
						(media.likes + 1) + 
						'<i class="fas fa-heart" id="hearth' + media.id + '" aria-label="likes"></i>' +
					'</div>';
					media.likes++;
					this.totalLikes.innerHTML = '' + (totalLikes + 1) + ' ' + '<i class="fas fa-heart" aria-label="likes"></i>';
					totalLikes++;
				})
			this.totalLikes.innerHTML = totalLikes + ' ' + '<i class="fas fa-heart" aria-label="likes"></i>';
		})
	}
	displayPrice() {
		this.price.innerHTML = '' + this.photographer.price + '€ / jour';
	}
	clickOnButtonToOpenModal() {
		this.button.addEventListener("click", () => {
			this.bodyFilter.style.display = "block";
			this.body.ariaHidden = "false";
			this.modal.style.display = "block";
			this.modal.ariaHidden = "true";
			this.modal.style.zIndex = "7";
			this.headerModalPhotographer.innerHTML = this.photographer.name;
		})
		let closeModal = () => {
			this.modal.style.display = "none";
			this.modal.ariaHidden = "false";
			this.body.ariaHidden = "true";
			this.bodyFilter.style.display = "none";
		}
		this.closeModal.addEventListener("click", () => {
			closeModal();
		})
		document.addEventListener("keydown", () => { 
			let nameKey = event.key;
			if (nameKey === "Escape") {
				closeModal();
			}
		})
	}
	listeningInputs() {
		this.firstname.addEventListener("input", () => {
			console.log(event.target.value)
		})
		this.lastname.addEventListener("input", () => {
			console.log(event.target.value)
		})
		this.email.addEventListener("input", () => {
			console.log(event.target.value)
		})
		this.message.addEventListener("input", () => {
			console.log(event.target.value)
		})
		this.buttonFormModal.addEventListener("click", (e) => {
			e.preventDefault();
			console.log("firstname : " + this.firstname.value + " " +
						"lastname : " + this.lastname.value + " " +
						"email : " + this.email.value + " " +
						"message : " + this.message.value)
		})
		this.formModal.onsubmit = function(e) {
			e.preventDefault();
		}
	}
}

const managerPage = new ManagerPage();
managerPage.getIdThenPhotographer();
managerPage.askJsonForPhotosAndVideos();
managerPage.displayPhotographer();
managerPage.listeningSortBy();
managerPage.displayPrice();
managerPage.clickOnButtonToOpenModal();
managerPage.listeningInputs();
setTimeout(() => managerPage.displayMedia(), 100);

















