
function displayPhotographers() { 
	return document.getElementById("main").innerHTML =
		artists.map(artist => {
			return (
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
				'</section>'
			)
		});
}

setTimeout(() => displayPhotographers(), 100);


