
class TitleCleaner {
	constructor(dirtyTitle, dirtyTags) {
		this.dirtyTitle = dirtyTitle;
		this.dirtyTags = dirtyTags;
		this.regex1;
		this.regex2;
		this.regex3;
		this.regex4;
	}
	// appellée dans ManagerPage (l.138) avant de trier les titres par ordre alphaB
	titleToUpperCase() {
		let allLetters = this.dirtyTitle.split("");
		this.dirtyTitle = this.dirtyTitle.replace(/[a-z]?[A-Z]?/, allLetters[0].toUpperCase());
		this.getTags(); 
	}
	getTags() {
		if(this.dirtyTags[0] == "portait") {
			this.dirtyTags[0] = "portrait";
		}
		if(this.dirtyTags[0] == "events") {
			this.dirtyTags[0] = "event";
		}
		let allLetters = this.dirtyTags[0].split("");
		let newTag = this.dirtyTags[0].replace(/[a-z]/, allLetters[0].toUpperCase());
		this.regex1 = new RegExp(newTag);
		this.getDotJPG();
	}
	getDotJPG() {
		this.regex2 = new RegExp(/\.jpg/);
		this.getDotMP4();
	}
	getDotMP4() {
		this.regex3 = new RegExp(/\.mp4/);
		this.getNumbers();
	}
	getNumbers() {
		this.regex4 = new RegExp(/587740985637/);
	}
	//appelée dans MediaFactory.js (l.19)
	returnCleanedTitle() {
		let noTag = this.dirtyTitle.split(this.regex1);
		let noJPG = noTag[1].split(this.regex2);
		let noMP4 = noJPG[0].split(this.regex3);
		console.log(noMP4);
		let noNumbers = noMP4[0].split(this.regex4);
		console.log(noNumbers);
		let noUnderscore = noNumbers[0].replace(/_/gi, " ");
		console.log(noUnderscore);
		let noComma = noUnderscore.replace(/-/gi, " ");
		console.log(noComma);
		let addSpacesBetweenWords = noComma.split(/(?=[A-Z])/).join(" ");
		console.log(addSpacesBetweenWords);
		let noSpaces = addSpacesBetweenWords.replace(/ /, "");
		console.log(noSpaces);
		let finalTitle = noSpaces;
		console.log(finalTitle);
		return finalTitle;
	}
}






















