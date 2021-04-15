
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
		this.titleUpperCaseDone;
		this.cleanedTitle;
	}
	titleToUpperCase() {
		let allLetters = this.media.split("");
		console.log("firstletter title : " + allLetters);
		this.titleUpperCaseDone = this.media.replace(/[a-z]?[A-Z]?/, allLetters[0].toUpperCase());
		console.log("newTitle : " + this.titleUpperCaseDone);
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
		this.titleToUpperCase();
		this.cleanTags();
		let allLetters = this.tags[0].split("");
		let newTag = this.tags[0].replace(/[a-z]/, allLetters[0].toUpperCase());
		const regex1 = new RegExp(newTag);
		console.log("regex1 : " + regex1);
		const regex2 = new RegExp(/^(-)+(_)+$/);
		console.log("regex2 : " + regex2);
		const regex3 = new RegExp(/\.jpg/); // rajouter .mp4
		console.log("regex3 : " + regex3);
		let newTitle = this.titleUpperCaseDone.split(regex1);
		console.log("newTitle : " + newTitle);
		const cleanFormat = newTitle[1].split(regex3);
		console.log("splitted : " + cleanFormat[0]);
		let cleanUnderscore = cleanFormat[0].replace(/(_)/gi, " ");
		let cleanTiret = cleanUnderscore.replace(/-/gi, " ");
		console.log("cleanTiret : " + cleanTiret);
		return cleanTiret;
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
			'<div id="container-media__photo">' +
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

















