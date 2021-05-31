
class ManagerMain {
	constructor() {
		this.main = document.getElementById("main");
		this.data = artists;
		this.tags = ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];
		this.taggedArtists = [];
	}
	displayPhotographersInMainPage() {
		return this.main.innerHTML =
			this.data.map(artist => {
				sessionStorage.setItem("photographer" + artist.id + "", JSON.stringify(artist));
				function displayTags() {
					return artist.tags.map(tag => {
						return '<li class="main__photographer__container__tags">#' + tag + '</li>';
					}).join('');
				}
				return (
					'<a href="./pages/photographer.html?id=' + artist.id + '">' +
						'<section class="main__photographer">' +
							'<div class="main__photographer__photo flex">' + 
								'<img src="./images/portraits/' + artist.portrait + '" alt="portrait de ' + artist.name + '"/>' + 
							'</div>' + 
							'<div class="main__photographer__description">' + 
								'<div class="main__photographer__description__name"><h2>' + artist.name + '</h2></div>' +
								'<div class="main__photographer__description__city"><p>' + artist.city + ", " + artist.country + '</p></div>' +
								'<div class="main__photographer__description__tagline"><p>' + artist.tagline + '</p></div>' +
								'<div class="main__photographer__description__price"><p>' + artist.price + "€/jour" + '</p></div>' +
								'<nav class="main__photographer__container flex" aria-label="secondary navigation">' + 
									displayTags() + 
								'</nav>' + 
							'</div>' + 
						'</section>' + 
					'</a>'
				)
			}).join('');
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
			});
		}
	}
	removeArtistsByTags(artist) {
		let index = this.taggedArtists.indexOf(artist);
		this.taggedArtists.splice(index, 1);
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
								'<img src="./images/portraits/' + artist.portrait + '" alt="portrait de ' + artist.name + '"/>' + 
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
			}).join('');
	}
}

const managerMain = new ManagerMain();
setTimeout(() => managerMain.displayPhotographersInMainPage(), 100);
setTimeout(() => managerMain.listenTags(), 100);




















