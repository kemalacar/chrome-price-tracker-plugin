

$(function() {



	// var rotate= function(){

	// 	$(".sync").animate(
	//     { deg: 360 },
	//     {
	//       duration: 8000,
	//       step: function(now) {
	//         $(this).css({ transform: 'rotate(' + now + 'deg)' });
	//       }
	//     });
	// };
	

	// var timer = setInterval(rotate, 1000);



	// var API_URL = "http://localhost:5002";
	// var API_URL="https://kml-price-tracker.herokuapp.com";
	var API_URL="http://34.71.124.82:5002";

	var $tbody = $("#tbody");
	

	$("body").on("click",".delete-item", function(){
		let tr =$(this).closest("tr");
 		let id=tr.data("id");
		

		$.ajax({
			    type: "POST",
			    url:  API_URL+"/delete",
			    data: JSON.stringify({ id }),
			    contentType: "application/json; charset=utf-8",
			    dataType: "json",
			    success: function(data){tr.remove();},
			    failure: function(errMsg) {
			        alert(errMsg);
			    }
			});

});

	$("#loadProducts").click(function(){

	$(this).attr("animation");



	$tbody.html("");

	$.get( API_URL+"/test", function( data ) {
	  		
	  		

	  		if(data && data.length > 0){
	  			let index=1;
	  			data.forEach(item=>{

	  				let change=0;
	  				let last=item.items[0]; 
	  				let first = item.items[0]; 
	  				if(item.items.length > 1){
	  					last = item.items.slice(-1)[0] ;	
	  				}

			  		$tbody.append(`<tr data-id="${item._id}">
							      <th scope="row">${index++}</th>
							      <td><a href="${item.url}" target="_blank" >${item.title}</a></td>
							      <td>${first.price} - ${last.price}</td>
							      <td>${first.date}</td>
							      <td>${item.items.length}</td>
							      <td><img class="delete-item" src="/images/trash.png"/> </td>
							    </tr>`);

	  			});

	  		}



	  
	});

	});

	


});