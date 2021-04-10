
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
		console.log(this.tags);
		this.cleanedTitle = this.media.split(/^(Travel_)+(\w+)+(\.jpg)+$/);
		console.log("splitted : " + this.cleanedTitle);
		return this.cleanedTitle[2];
	}
	makeMiniatureIfVideoIfNotReturnImage() {
		if(this.type == "vidéo") {
			return '<video src="../images/photos/' + this.name + '/' + this.media + '" type="video/mp4">' + this.media + '</video>';
		}
		if(this.type == "image") {
			return '<img src="../images/photos/' + this.name + '/' + this.media + '" />';
		}
	}
	displayNewMedia() {
		return (
			'<div class="container-media__photo">' +
				this.makeMiniatureIfVideoIfNotReturnImage() +
				'<div class="infoPhotos flex">' + 
					'<div>' + this.cleanTitles() + '</div>' + 
					'<div class="priceAndLikes flex">' +
						'<div>' + this.price + '€</div>' + 
						'<div id="containerHearth' + this.id + '">' + this.likes + '<i class="fas fa-heart" id="hearth' + this.id + '"></i></div>' + 
					'</div>' +
				'</div>' +
			'</div>'
		)
	}
}

















