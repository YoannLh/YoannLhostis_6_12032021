const artists = [];

class PhotographerFactory {
	constructor(city, country, id, name, portrait, price, tagline, tags) {
		this.city = city;
		this.country = country;
		this.id = id;
		this.name = name;
		this.portrait = portrait;
		this.price = price;
		this.tagline = tagline;
		this.tags = tags; 
	}
	askJsonAndCreatePhotographers() {
		for(const photographer of data.photographers) {
			// ou ? let id = 0;
			let city = photographer.city;
			let country = photographer.country;
			let id = photographer.id;
			//ou ? id++; Plus lisible que les ids proposés de base
			let name = photographer.name;
			let portrait = photographer.portrait;
			let price = photographer.price;
			let tagline = photographer.tagline;
			const tags = photographer.tags;
			const artist = new PhotographerFactory(city, country, id, name, portrait, price, tagline, tags);
			artists.push(artist);
		}
	}
};

const photographersFactory = new PhotographerFactory();
photographersFactory.askJsonAndCreatePhotographers();
