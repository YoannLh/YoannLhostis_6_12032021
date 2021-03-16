
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
		this.data;
	}
	askJsonAndCreatePhotographers() {
		const request = new XMLHttpRequest();
  		request.onreadystatechange = function() {
  			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                this.data = JSON.parse(this.response);
                console.log("data : " + this.data);
				for(const photographer of this.data.photographers) {
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
		}
		request.open("GET", "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeDataFR.json");
        request.send();
	}
};

const photographersFactory = new PhotographerFactory();
photographersFactory.askJsonAndCreatePhotographers();
