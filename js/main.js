
class Main {
	constructor() {
		this.main = document.getElementById("main");
		this.data = artists;
		this.portrait = document.getElementById("portrait");
		this.art = document.getElementById("art");
		this.fashion = document.getElementById("fashion");
		this.architecture = document.getElementById("architecture");
		this.travel = document.getElementById("travel");
		this.sport = document.getElementById("sport");
		this.animals = document.getElementById("animals");
		this.events = document.getElementById("events");
		this.tags = ["portait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];
		this.taggedArtists = [];
	}
	displayPhotographersInMainPage() { 
		return this.main.innerHTML =
			this.data.map(artist => {
				return (
					'<a href="./pages/' + artist.name + '.html">' +
						'<section class="main__photographer">' + 
							'<div class="main__photographer__photo flex">' + 
								'<img src="./images/photos/' + artist.name + '/' + artist.portrait + '" />' + 
							'</div>' + 
							'<div class="main__photographer__description">' + 
								'<div class="main__photographer__description__name"><p>' + artist.name + '</p></div>' +
								'<div class="main__photographer__description__city"><p>' + artist.city + ", " + artist.country + '</p></div>' +
								'<div class="main__photographer__description__tagline"><p>' + artist.tagline + '</p></div>' +
								'<div class="main__photographer__description__price"><p>' + artist.price + "€/jour" + '</p></div>' +
								'<div class="main__photographer__tags">' + artist.tags + '</div>' + 
							'</div>' + 
						'</section>' + 
					'</a>'
				)
			});
	}
	listenTags() {
		// for(const tag of this.tags) {
		// 	this.tag.addEventListener("click", () => {
		// 		console.Log("tag");
		// 		//this.$`{tag}`.style.borderColor = "rgba(200,0,28,1)";
		// 		for(const artist of this.data) {
		// 			for(const tag of artist.tags) {
		// 				if(this.tag.id === tag) {
		// 					this.displayArtistsByTags(artist);
		// 				}
		// 			}
		// 		}
		// 	});
		// }
		this.portrait.addEventListener("click", () => {
			this.portrait.style.borderColor = "rgba(200,0,28,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.portrait.id === tag) {
						this.displayArtistsByTags(artist);
					}
				}
			}
		});
		this.art.addEventListener("click", () => {
			this.art.style.borderColor = "rgba(0,28,28,1)";
			for(const artist of this.data) {
				for(const tag of artist.tags) {
					if(this.art.id === tag) {
						this.displayArtistsByTags(artist);
					}
				}
			}
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
	displayArtistsByTags(artist) {
		console.log(artist);
		this.taggedArtists.push(artist);
		// for(const taggedArtist of this.taggedArtists) {
		// 	if(taggedArtist != artist) {
		// 		this.taggedArtists.push(artist);
		// 	}
		// 	if(taggedArtist == artist) {
		// 		const list = this.taggedArtists;
		// 		const index = list.indexOf(taggedArtist);
		// 		list.splice(index, 1);
		// 		list.push(artist);
		// 		this.taggedArtist = list;
		// 	} 
		// }
		return this.main.innerHTML = 
			this.taggedArtists.map(artist => {
				return (
					'<a href="./pages/' + artist.name + '.html">' +
						'<section class="main__photographer">' + 
							'<div class="main__photographer__photo flex">' + 
								'<img src="./images/photos/' + artist.name + '/' + artist.portrait + '" />' + 
							'</div>' + 
							'<div class="main__photographer__description">' + 
								'<div class="main__photographer__description__name"><p>' + artist.name + '</p></div>' +
								'<div class="main__photographer__description__city"><p>' + artist.city + ", " + artist.country + '</p></div>' +
								'<div class="main__photographer__description__tagline"><p>' + artist.tagline + '</p></div>' +
								'<div class="main__photographer__description__price"><p>' + artist.price + "€/jour" + '</p></div>' +
								'<div class="main__photographer__tags">' + artist.tags + '</div>' + 
							'</div>' + 
						'</section>' + 
					'</a>'
				)
			})
	}
}

const main = new Main();
setTimeout(() => main.displayPhotographersInMainPage(), 100);
setTimeout(() => main.listenTags(), 500);




















