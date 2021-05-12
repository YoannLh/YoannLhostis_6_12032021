
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
	// titleToUpperCase() {
	// 	let allLetters = this.media.split("");
	// 	console.log("firstletter title : " + allLetters);
	// 	this.titleUpperCaseDone = this.media.replace(/[a-z]?[A-Z]?/, allLetters[0].toUpperCase());
	// 	console.log("newTitle : " + this.titleUpperCaseDone);
	// 	const titleCleaner = new TitleCleaner();
	// 	console.log(titleCleaner.returnCleanedTitle());
	// }
	// cleanTags() {
	// 	if(this.tags[0] == "portait") {
	// 		this.tags[0] = "portrait";
	// 	}
	// 	if(this.tags[0] == "events") {
	// 		this.tags[0] = "event";
	// 	}
	// }
	cleanTitles() {
		// this.titleToUpperCase();
		// this.cleanTags();
		// let allLetters = this.tags[0].split("");
		// let newTag = this.tags[0].replace(/[a-z]/, allLetters[0].toUpperCase());
		// const regex1 = new RegExp(newTag);
		// console.log("regex1 : " + regex1);
		// const regex2 = new RegExp(/\.jpg/);
		// console.log("regex2 : " + regex2);
		// const regex3 = new RegExp(/\.mp4/);
		// console.log("regex3 : " + regex3);
		// let newTitle = this.titleUpperCaseDone.split(regex1);
		// console.log("newTitle : " + newTitle);
		// const cleanFormatJpg = newTitle[1].split(regex2);
		// console.log("splitted : " + cleanFormatJpg[0]);
		// const cleanFormatMp4 = cleanFormatJpg[0].split(regex3);
		// let cleanUnderscore = cleanFormatMp4[0].replace(/(_)/gi, " ");
		// let cleanTiret = cleanUnderscore.replace(/-/gi, " ");
		// console.log("cleanTiret : " + cleanTiret);
		// return cleanTiret;

		const titleCleaner = new TitleCleaner(this.media, this.tags);
		titleCleaner.titleToUpperCase();
		return titleCleaner.returnCleanedTitle();
	}
	makeMiniatureIfVideoIfNotReturnImage() {
		if(this.type == "vidéo") {
			return '<video id="' + this.id + '" src="../images/photos/' + this.name + '/' + this.media + '" type="video/mp4">' + this.media + '</video>';
		}
		if(this.type == "image") {
			return '<img id="' + this.id + '" src="../images/photos/' + this.name + '/' + this.media + '" />';
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




















