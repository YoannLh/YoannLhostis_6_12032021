
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
	cleanTags() {
		if(this.tags[0] == "portait") {
			this.tags[0] = "portrait";
		}
		if(this.tags[0] == "events") {
			this.tags[0] = "event";
		}
	}
	cleanTitles() {
		this.cleanTags();
		console.log("this.tags : " + this.tags);
		let firstLetter = this.tags[0].split("");
		console.log("firstletter : " + firstLetter);
		let newMaj = this.tags[0].replace(/[a-z]/, firstLetter[0].toUpperCase());
		console.log("newMaj : " + newMaj);
		const regex1 = new RegExp(newMaj + '_');
		console.log("regex1 : " + regex1);
		const regex2 = new RegExp(/\.jpg/); // rajouter .mp4
		console.log("regex2 : " + regex2)
		this.cleanedTitle = this.media.split(regex1);
		const clean = this.cleanedTitle[1].split(regex2);
		console.log("splitted : " + clean[0]);
		return clean[0];
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

















