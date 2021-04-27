
class ManagerMain {
	constructor() {
		this.main = document.getElementById("main");
		this.data = artists;
		// artists vient de MediaFactory.js
		// this.portrait = document.getElementById("portrait");
		// this.togglePortrait = document.getElementById("toggleportrait");
		// this.art = document.getElementById("art");
		// this.toggleArt = document.getElementById("toggleart");
		// this.fashion = document.getElementById("fashion");
		// this.architecture = document.getElementById("architecture");
		// this.travel = document.getElementById("travel");
		// this.sport = document.getElementById("sport");
		// this.animals = document.getElementById("animals");
		// this.events = document.getElementById("events");
		this.tags = ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];
		this.taggedArtists = [];
	}
	displayPhotographersInMainPage() {
		console.log("data : " + this.data);
		return this.main.innerHTML =
			this.data.map(artist => {
				sessionStorage.setItem("photographer" + artist.id + "", JSON.stringify(artist));

				function displayTags() {
					return artist.tags.map(tag => {
						return '<div class="main__photographer__container__tags">#' + tag + '</div>';
					})
				}
				return (
					'<a href="./pages/photographer.html?id=' + artist.id + '">' +
						'<section class="main__photographer">' +
							'<div class="main__photographer__photo flex">' + 
								'<img src="./images/photos/' + artist.name + '/' + artist.portrait + '" />' + 
							'</div>' + 
							'<div class="main__photographer__description">' + 
								'<div class="main__photographer__description__name"><p>' + artist.name + '</p></div>' +
								'<div class="main__photographer__description__city"><p>' + artist.city + ", " + artist.country + '</p></div>' +
								'<div class="main__photographer__description__tagline"><p>' + artist.tagline + '</p></div>' +
								'<div class="main__photographer__description__price"><p>' + artist.price + "€/jour" + '</p></div>' +
								'<div class="main__photographer__container flex">' + displayTags() + '</div>' + 
							'</div>' + 
						'</section>' + 
					'</a>'
				)
			});
	}
	listenTags() {

		for(const tag of this.tags) {

			let docGetElement = document.getElementById(tag);
			let docGetElementToggle = document.getElementById("toggle" + tag + "");

			docGetElement.addEventListener("click", () => {
				docGetElement.style.display = "none";
				docGetElementToggle.style.display = "block";
				for(const artist of this.data) {
					for(const tagged of artist.tags) {
						if(tag === tagged) {
							this.taggedArtists.push(artist);
							this.displayArtistsByTags();
						}
					}
				}
			});
			
			docGetElementToggle.addEventListener("click", () => {
				docGetElement.style.display = "block";
				docGetElementToggle.style.display = "none";
				for(const artist of this.data) {
					for(const tagged of artist.tags) {
						if(tag === tagged) {
							this.removeArtistsByTags(artist);
						}
					}	
				}
			})
		}

		// this.portrait.addEventListener("click", () => {
		// 	this.portrait.style.display = "none";
		// 	this.togglePortrait.style.display = "block";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.portrait.id === tag) {
		// 				this.taggedArtists.push(artist);
		// 				this.displayArtistsByTags();
		// 			}
		// 		}
		// 	}
		// });
		// this.togglePortrait.addEventListener("click", () => {
		// 	this.portrait.style.display = "block";
		// 	this.togglePortrait.style.display = "none";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.portrait.id === tag) {
		// 				this.removeArtistsByTags(artist);
		// 			}
		// 		}
		// 	}
		// })
		// this.art.addEventListener("click", () => {
		// 	this.art.style.display = "none";
		// 	this.toggleArt.style.display = "block";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.art.id === tag) {
		// 				this.taggedArtists.push(artist);
		// 				this.displayArtistsByTags();
		// 			}
		// 		}
		// 	}
		// });
		// this.toggleArt.addEventListener("click", () => {
		// 	this.art.style.display = "block";
		// 	this.toggleArt.style.display = "none";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.art.id === tag) {
		// 				this.removeArtistsByTags(artist);
		// 			}
		// 		}
		// 	}
		// })
		// this.fashion.addEventListener("click", () => {
		// 	this.fashion.style.borderColor = "rgba(144,255,50,1)";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.fashion.id === tag) {
		// 				this.displayArtistsByTags(artist);
		// 			}
		// 			if(this.toggleFashion) {
		// 				this.removeArtistsByTags(artist);
		// 			}
		// 		}
		// 	}
		// });
		// this.architecture.addEventListener("click", () => {
		// 	this.architecture.style.borderColor = "rgba(255,200,28,1)";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.architecture.id === tag) {
		// 				this.displayArtistsByTags(artist);
		// 			}
		// 		}
		// 	}
		// });
		// this.travel.addEventListener("click", () => {
		// 	this.travel.style.borderColor = "rgba(0,28,255,1)";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.travel.id === tag) {
		// 				this.displayArtistsByTags(artist);
		// 			}
		// 		}
		// 	}
		// });
		// this.sport.addEventListener("click", () => {
		// 	this.sport.style.borderColor = "rgba(255,0,255,1)";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.sport.id === tag) {
		// 				this.displayArtistsByTags(artist);
		// 			}
		// 		}
		// 	}
		// });
		// this.animals.addEventListener("click", () => {
		// 	this.animals.style.borderColor = "rgba(0,255,255,1)";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.animals.id === tag) {
		// 				this.displayArtistsByTags(artist);
		// 			}
		// 		}
		// 	}
		// });
		// this.events.addEventListener("click", () => {
		// 	this.events.style.borderColor = "rgba(144,28,28,1)";
		// 	for(const artist of this.data) {
		// 		for(const tag of artist.tags) {
		// 			if(this.events.id === tag) {
		// 				this.displayArtistsByTags(artist);
		// 			}
		// 		}
		// 	}
		// });
	}
	removeArtistsByTags(artist) {
		let index = this.taggedArtists.indexOf(artist);
		this.taggedArtists.splice(index, 1);
		console.log(this.taggedArtists);
		this.displayArtistsByTags();
		if(this.taggedArtists.length == 0) {
			this.displayPhotographersInMainPage();
		}
	}
	displayArtistsByTags() {
		const filteredArrayTaggedArtists = this.taggedArtists.filter((artist , position) => {
			return this.taggedArtists.indexOf(artist) == position;	
		})
		return this.main.innerHTML = 
			filteredArrayTaggedArtists.map(artist => {
				return (
					'<a href="./pages/photographer.html?id=' + artist.id + '">' +
						'<section class="main__photographer">' + 
							'<div class="main__photographer__photo flex">' + 
								'<img src="./images/photos/' + artist.name + '/' + artist.portrait + '" />' + 
							'</div>' + 
							'<div class="main__photographer__description">' + 
								'<div class="main__photographer__description__name"><p>' + artist.name + '</p></div>' +
								'<div class="main__photographer__description__city"><p>' + artist.city + ", " + artist.country + '</p></div>' +
								'<div class="main__photographer__description__tagline"><p>' + artist.tagline + '</p></div>' +
								'<div class="main__photographer__description__price"><p>' + artist.price + "€/jour" + '</p></div>' +
								'<div class="main__photographer__description__tags">' + artist.tags + '</div>' + 
							'</div>' + 
						'</section>' + 
					'</a>'
				)
			})
	}
}

const managerMain = new ManagerMain();
setTimeout(() => managerMain.displayPhotographersInMainPage(), 100);
setTimeout(() => managerMain.listenTags(), 100);




















