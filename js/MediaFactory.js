
class MediaFactory {
	constructor(name, type, date, id, likes, price, tags, image) {
		this.name = name;
		this.type = type;
		this.date = date;
		this.id = id;
		this.likes = likes;
		this.price = price;
		this.tags = tags;
		this.media = image;
		this.cleanedTitle;
	}
	cleanTitles() {
		// this.cleanedTitle;
	}
	makeMiniatureIfVideoIfNotReturnImage() {
		if(this.type == "video") {
			return '<video src="../images/photos/' + this.name + '/' + this.media + '" controls>' + this.media + '</video>';
			// probleme mp4 ?
		} else {
			return '<img src="../images/photos/' + this.name + '/' + this.media + '" />';
		}
	}
	displayNewMedia() {
		return (
			'<div class="container-media__photo">' +
				this.makeMiniatureIfVideoIfNotReturnImage() +
				'<div class="infoPhotos flex">' + 
					'<div>' + this.media + '</div>' + 
					'<div class="priceAndLikes flex">' +
						'<div>' + this.price + '€</div>' + 
						'<div id="containerHearth' + this.id + '">' + this.likes + '<i class="fas fa-heart" id="hearth' + this.id + '"></i></div>' + 
					'</div>' +
				'</div>' +
			'</div>'
		)
	}
}

















