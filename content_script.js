//content script
var clickedElement;
var parents = new Array();
var pureHtml;
document.addEventListener("mousedown", function(event){

  clickedElement = event.target;
}, true);



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	


debugger;

let clickEvent = new Event('click');
document.getElementsByClassName("encounters-action--like")[0].dispatchEvent(event);

// .click();


	let selectedText = clickedElement.textContent;

	let price = selectedText.split('').filter(f=>f ==='.' || f===',' || !isNaN(f));

	console.log(clickedElement,price.join("").trim());

	parents = new Array();
    getParentClasses3(clickedElement);

	let req = {
    	url:window.location.href,
    	jquerySelect:parents.reverse().join(","),
    	title:document.title

    }


//  var API_URL= "http://localhost:5002"
 var API_URL= "https://kml-price-tracker.herokuapp.com";
 // var API_URL="http://34.71.124.82:5002";
 // fetch('http://localhost:5002/insert', {
 fetch(API_URL+'/insert', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
      			'Content-Type': 'application/json'
            },
            body:  JSON.stringify(req)
        })
            .then(response => { response.status === 200 ? alert("Added Successfully!") : alert("Price not detected! Please check again.")})
            .catch(error => console.log('Error:', error));
    

  }
);


function getParentClasses(element){
	let tagName = element.tagName;
	let className = element.className.trim().split(" ").filter(f=>f).join(".");

	if(element.parentElement){
		// parents.push(tagName+(className ? '.'+className : ''));
		parents.push(tagName);
		getParentClasses(element.parentElement);
	}else{
		// parents.push(tagName);
		return;
	}
}


function getParentClasses2(element){
	let tagName = element.tagName;
	
	if(tagName.toLowerCase() === 'body' ){
		return;
	}

	if(element.parentElement){
		let index=Array.prototype.indexOf.call(element.parentElement.children,element);

		parents.push(index);
		getParentClasses2(element.parentElement);
	}else{
		// parents.push(tagName);
		return;
	}

}


function getParentClasses3(element){
	let tagName = element.tagName;
	
	if(tagName.toLowerCase() === 'body' ){
		return;
	}

	if(element.parentElement){

		let arrays = [...element.parentElement.children];

		let  sameChilds = arrays.filter((f)=>f.tagName === element.tagName);


		let index=Array.prototype.indexOf.call(sameChilds,element);



		parents.push(index+"-"+element.tagName);
		getParentClasses3(element.parentElement);
	}else{
		// parents.push(tagName);
		return;
	}

}