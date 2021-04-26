
class ManagerMain {
	constructor() {
		this.main = document.getElementById("main");
		this.data = artists;
		// artists vient de MediaFactory.js
		this.portrait = document.getElementById("portrait");
		this.togglePortrait = false;
		this.art = document.getElementById("art");
		this.toggleArt = false;
		this.fashion = document.getElementById("fashion");
		this.architecture = document.getElementById("architecture");
		this.travel = document.getElementById("travel");
		this.sport = document.getElementById("sport");
		this.animals = document.getElementById("animals");
		this.events = document.getElementById("events");
		this.tags = ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];
		this.taggedArtists = [];
		this.tagsArray = [];
		this.artist;
		this.filteredArrayTaggedArtists;
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
		console.log("this.tags : " + this.tags);
		// for(const tag of this.tags) {
		// 	document.getElementById(tag).addEventListener("click", () => {
		// 	document.getElementById(tag).style.borderColor = "rgba(144,255,50,1)";
		// 		for(const artist of this.data) {
		// 			for(const tagByArtist of artist.tags) {
		// 				if(tag === tagByArtist) {
		// 					if(this.togglePortrait == true) {
		// 						this.removeArtistsByTags(artist);
		// 						this.togglePortrait = false;
		//  						return;
		// 					}
		// 				}
		//  				this.displayArtistsByTags(artist);
		// 			}
		// 		}
		// 	});
		// 	if(this.togglePortrait == false) {
		//  		this.togglePortrait = true;
		// 	}
		// 	console.log(this.togglePortrait);
		// }
		// ICI !
		this.portrait.addEventListener("click", () => {
			this.portrait.style.borderColor = "rgba(200,0,28,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.portrait.id === tag) { 
						this.artist = artist;
						this.displayArtistsByTags();
					}
					if(this.togglePortrait == true) {
						this.removeArtistsByTags(this.artist);
					}
				}
			}
			if(this.togglePortrait == false) {
				this.togglePortrait = true;
			}
		});
		this.art.addEventListener("click", () => {
			console.log(this.toggleArt);
			this.art.style.borderColor = "rgba(0,28,28,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.art.id === tag) {
						this.artist = artist;
						if(this.toggleArt == true) {
							this.removeArtistsByTags(this.artist);
							this.toggleArt = false;
							return;
						}
						this.displayArtistsByTags();
					}
				}
			}
			if(this.toggleArt == false) {
				this.toggleArt = true;
			}
			console.log(this.toggleArt);
		});
		this.fashion.addEventListener("click", () => {
			this.fashion.style.borderColor = "rgba(144,255,50,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.fashion.id === tag) {
						this.displayArtistsByTags(artist);
					}
				}
			}
		});
		this.architecture.addEventListener("click", () => {
			this.architecture.style.borderColor = "rgba(255,200,28,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.architecture.id === tag) {
						this.displayArtistsByTags(artist);
					}
				}
			}
		});
		this.travel.addEventListener("click", () => {
			this.travel.style.borderColor = "rgba(0,28,255,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.travel.id === tag) {
						this.displayArtistsByTags(artist);
					}
				}
			}
		});
		this.sport.addEventListener("click", () => {
			this.sport.style.borderColor = "rgba(255,0,255,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.sport.id === tag) {
						this.displayArtistsByTags(artist);
					}
				}
			}
		});
		this.animals.addEventListener("click", () => {
			this.animals.style.borderColor = "rgba(0,255,255,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.animals.id === tag) {
						this.displayArtistsByTags(artist);
					}
				}
			}
		});
		this.events.addEventListener("click", () => {
			this.events.style.borderColor = "rgba(144,28,28,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.events.id === tag) {
						this.displayArtistsByTags(artist);
					}
				}
			}
		});
	}
	removeArtistsByTags(artist) {
		let index = this.taggedArtists.indexOf(artist);
		this.taggedArtists.splice(index, 1);
		console.log(this.taggedArtists);
		this.artist = "";
		console.log(this.taggedArtists + this.taggedArtists.length);
		if(this.taggedArtists.length == 0) {
			this.displayPhotographersInMainPage();
			return;
		}
		this.displayArtistsByTags();
	}
	displayArtistsByTags() {
		if(this.artist) {
			console.log(this.artist);
			this.taggedArtists.push(this.artist);
			console.log(this.taggedArtists);
			// Supprime les doublons d'artistes
			this.filteredArrayTaggedArtists = this.taggedArtists.filter((artist , position) => {
				return this.taggedArtists.indexOf(artist) == position;	
			})
			console.log(this.filteredArrayTaggedArtists);
		}
		if(!this.artist) {
			this.filteredArrayTaggedArtists = this.taggedArtists;
		}
		console.log(this.filteredArrayTaggedArtists);
		return this.main.innerHTML = 
			this.filteredArrayTaggedArtists.map(artist => {
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




















