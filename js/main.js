
console.log(artists);

function displayPhotographers() { 
	return document.getElementById("main").innerHTML =
		artists.map(artist => {
			return (
				'<section class="main__photographer">' + 
					'<div class="main__photographer__photo">' + artist.name + '</div>' + 
					'<div class="main__photographer__description">' + artist.name + '</div>' + 
					'<div class="main__photographer__tags">' + artist.name + '</div>' + 
				'</section>'
			)
		});
}

displayPhotographers();


