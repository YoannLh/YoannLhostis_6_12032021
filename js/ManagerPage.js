console.log(pages);

class ManagerPage {
	constructor() {
		this.mainInPage = document.getElementById("mainInPage");
		this.dataPage = pages; 
	}
	displayPhotographerInMainPage() {
		let fileName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1).split(".html");
		console.log(decodeURI(fileName[0]));
		for(const page of this.dataPage) { 
			if(decodeURI(fileName[0]) === page.namePage) { 
				return this.mainInPage.innerHTML =
					'<section class="mainInPage__photographer">' + 
						'<div class="mainInPage__photographer__photo flex">' + 
							'<img src="../images/photos/' + page.namePage + '/' + page.portraitPage + '" />' + 
						'</div>' + 
						'<div class="mainInPage__photographer__description">' + 
							'<div class="mainInPage__photographer__description__name"><p>' + page.namePage + '</p></div>' +
							'<div class="mainInPage__photographer__description__city"><p>' + page.cityPage + ", " + page.countryPage + '</p></div>' +
							'<div class="mainInPage__photographer__description__tagline"><p>' + page.taglinePage + '</p></div>' +
							'<div class="mainInPage__photographer__tags">' + page.tagsPage + '</div>' + 
						'</div>' + 
					'</section>' 
			}
		}		
	}
}

const managerPage = new ManagerPage();
setTimeout(() => managerPage.displayPhotographerInMainPage(), 100);