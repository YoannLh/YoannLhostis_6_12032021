const pages = [];

class PageFactory {
	constructor(cityPage, countryPage, idPage, namePage, portraitPage, pricePage, taglinePage, tagsPage) {
		this.dataPage;
		this.cityPage = cityPage;
		this.countryPage = countryPage;
		this.idPage = idPage;
		this.namePage = namePage;
		this.portraitPage = portraitPage;
		this.pricePage = pricePage;
		this.taglinePage = taglinePage;
		this.tagsPage = tagsPage; 
	}
	askJsonAndCreatePage() {
		const request = new XMLHttpRequest();
  		request.onreadystatechange = function() {
  			if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                this.dataPage = JSON.parse(this.response);
                console.log(this.dataPage);
				for(const photographer of this.dataPage.photographers) {
					// ou ? let id = 0;
					let cityPage = photographer.city;
					let countryPage = photographer.country;
					let idPage = photographer.id;
					//ou ? id++; Plus lisible que les ids proposés de base
					let namePage = photographer.name;
					let portraitPage = photographer.portrait;
					let pricePage = photographer.price;
					let taglinePage = photographer.tagline;
					const tagsPage = photographer.tags;
					const page = new PageFactory(cityPage, countryPage, idPage, namePage, portraitPage, pricePage, taglinePage, tagsPage);
					pages.push(page);
				}
			}
		}
		request.open("GET", "../data/data.json");
        request.send();
	}
}

const pageFactory = new PageFactory();
pageFactory.askJsonAndCreatePage();















