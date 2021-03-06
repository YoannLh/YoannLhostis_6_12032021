
class MediaFactory {
	constructor(name, type, date, id, likes, price, tags, image, alt) {
		this.name = name;
		this.type = type;
		this.date = date;
		this.id = id;
		this.likes = likes;
		this.price = price;
		this.tags = tags;
		this.media = image;
		this.titleUpperCaseDone;
		this.cleanedTitle;
		this.alt = alt;
	}
	cleanTitles() {
		const titleCleaner = new TitleCleaner(this.media, this.tags);
		titleCleaner.titleToUpperCase();
		return titleCleaner.returnCleanedTitle();
	}
	makeMiniatureIfVideoIfNotReturnImage() {
		if(this.type == "vidéo") {
			return '<a href="#" id="' + this.id + '"><video id="' + this.id + '" src="../images/photos/' + this.name + '/' + this.media + '" type="video/mp4" alt=' + this.alt + '>' + this.media + '</video></a>';
		}
		if(this.type == "image") {
			return '<a href="#" id="' + this.id + '"><img id="' + this.id + '" src="../images/photos/' + this.name + '/' + this.media + '" alt=' + this.alt + ' /></a>';
		}
	}
	displayNewMedia() {
		return (
			'<div id="container-media__photo">' +
				this.makeMiniatureIfVideoIfNotReturnImage() +
				'<div class="infoPhotos flex">' + 
					'<div>' + this.cleanTitles() + '</div>' + 
					'<div class="priceAndLikes flex">' +
						'<div>' + this.price + '€</div>' + 
						'<button id="containerHearth' + this.id + '">' + this.likes + '<i class="fas fa-heart" id="hearth' + this.id + '"></i></button>' + 
					'</div>' +
				'</div>' +
			'</div>'
		)
	}
}




















