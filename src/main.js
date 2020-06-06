function main() {
	if ($(window).scrollTop() <= 20) {
		$('.title').css('top', '2vh')
		move_up_main()
		document.getElementById('shift_up').style.top = '-0.5vh'
	} else {
		$('.title').css('top', '0vh')
	}
	$('#hello').fadeIn(3000);
	$('.navigation').fadeIn(2500);

	$(window).on('scroll', scroll)
	
}


$('.navigation').hide();
$('#hello').hide();
$('.feature').hide();
$(document).ready(main);


var open_id = 'none'
function open_close(id) {
// opens and closes the creations from the grid
	console.log('new id :' + id)
	console.log('previously open: ' + open_id);
	if (open_id === 'none') { // this means that you are going from nothing open to something now open
		open_id = id
		$(id).slideToggle(3000);
	} else if (open_id !== id && $(open_id).css('display') !== 'none') {
		// this means that something is already open and it's not the one that you're trying to open
		// $(open_id).slideToggle(1000) //close the open id
		$(open_id).hide()
		open_id = id
		$(id).slideToggle(3000);
	} else if (open_id === id) {
		$(open_id).hide()
		open_id = 'none'
	}
	if (open_id === 'none') {
		scroll_anchor('creations')
		//setTimeout(scroll_anchor, 2000, 'creations')
	} else {
		scroll_anchor(open_id.substring(1))
		//setTimeout(scroll_anchor, 2000, open_id.substring(1))
	}
	//console.log('now open: ' + open_id);  // DO NOT TOUCH! ALL GOOD!
}


// function make_animate_header_func (selector) {
// 		// takes in a string which has a given header type. 
// 		// ex: make_animate_header_func('h3')
// 		function all_elems_of_selector () {
// 			// given a selector from its parent function, returns an array of all the elements
// 			// that are within the selector (ex: all of the inner text in a h3s) as string classes without #s.
// 			var result = []
// 			$(selector).each(function () {
// 				var string = $(this).html(); // find the inner HTML of the element
// 				string = string.replace(/\s+/g, '-').toLowerCase(); // change spaces to - and all lowercase
// 				result.push(string)
// 			})
// 			return result
// 		}
// 		function animate_header (section_class) {
// 			return $('.' + section_class).find(selector).css(color, 'red')
// 		}
// 		return animate_header('creations')
// 	}



function make_active_page_func() {
// returns a function, active_page, which takes in a distance from the top (using scrollTop)
// to find which page is active and change the lit up page in the navigation bar. 
	var home_coordinates = calculate_top('home')
	var creations_coordinates = calculate_top('creations')
	var contact_coordinates = calculate_top('contact')
	
	var mylist = [home_coordinates, creations_coordinates, contact_coordinates]
	console.log(mylist)

	function active_page (coord) {
	 // finds which page is active and changes the css for navigation. 

		console.log('coordinates: ' + coord, 'open page: ' + open_page)
		
		// initialize coordinates
		if (open_id !== 'none') {
			contact_coordinates = calculate_top('contact')
			creations_coordinates = calculate_top(open_id.substring(1));
			console.log('new contact coordinates ' + contact_coordinates)
		} else {
			creations_coordinates = calculate_top('creations');
		}
		

		// remove the active class from whatever was previously open
		 if (open_page) {
		 	$(open_page).removeClass('active')
		 }

		 // assign newly opened page
		 if (coord < creations_coordinates) {
		 	open_page = '#nav-home'
		 } else if (coord >= creations_coordinates && coord < contact_coordinates) {
		 	open_page = '#nav-creations'
		 } else if (coord >= contact_coordinates) {
		 	open_page = '#nav-contact'
		 	// console.log('contact')
		 } else {
		 	alert('error with active_page function!')
		 }
		 $(open_page).addClass('active');
		 // console.log('new open page ' + open_page);
		 return open_page
		}

	return active_page
}


var open_page = null
var f_active_page = make_active_page_func() // returns active_page, which takes in (coord)
var open_page = f_active_page($(window).scrollTop())



function calculate_top(id) {
// calculates the distance from the top of the screen using scrollTop
	var html = document.documentElement;
	var body = document.body;

	var from = Math.round(body.scrollTop || html.scrollTop);
	var anchor = document.getElementById(id) // this is the internal anchor
	if (anchor) { // if the anchor exists
		var top = 0
		var modified_anchor = anchor
		while (modified_anchor.offsetParent) {
			top += modified_anchor.offsetTop
			modified_anchor = modified_anchor.offsetParent
		}
		//console.log('top ' + top)
		
		//console.log('screen ' + screen.height / 12)
		var s = screen.height / 12

		// if ($('.header-container').attr('id') === 'normal') {
		// 	var extra = $('#normal').css('max-height')
		// } else if ($('.header-container').attr('id') === 'shrink') {
		// 	var extra = $('#shrink').css('max-height')
		// } else {
		// 	alert('there is an issue with the scroll_anchor function!')
		// 	var extra = '0px'
		// }
		var extra = 0

		if (id !== 'home') {
			extra = $('#shrink').css('max-height')
		}

		// extra = Number(extra.substring(0, extra.length - 2))
		
		//console.log('extra ' + extra)
		top -= s

		return top
		//
		}
}



function scroll_anchor(id) {
// when called, scrolls to the id. 

	var top = calculate_top(id);

	var bottom = calculate_top('bottom')
	var difference = Math.abs(bottom - top)


	if (id === 'contact' && difference < $(window).height()) {
		top = bottom - $(window).height()
		//console.log('contact ' + top)
	}


	window.scrollTo(0, top);

	return top
}


function move_up_main() {
// when called, animates the header on the navigation bar to slide up
	var up = 2;
	var opacity = 0;
	var count = 0;
	function helper () {
		if (up > -0.5) {
			up = up - 0.03;
			count ++
			if (count < 30) {
				opacity += 0.001
			} else if (count >= 30 && opacity < 1) {
				opacity *=1.1
			}
			//console.log(count)
			document.getElementById('shift_up').style.opacity = opacity;
			document.getElementById('shift_up').style.top = up + 'vh'
			setTimeout(helper, 10);
		}
	}
	helper();		// DO NOT TOUCH! ALL GOOD!
}


function scroll() {
// shrinks the navigation bar on scroll
	f_active_page($(window).scrollTop())
	
	$('.title').css('position', 'relative')
	if ($(window).scrollTop() <= 5) { // this returns the number of pixels away from the top. if scrollTop is 0 (a falsy value) it will go into else case
		// this case means that the user has started scrolling at the top of the screen
		//alert('shrinking');
		$('.header-container').attr('id', 'normal')
		$('.title').css('top', '0vh')
	} else {
		$('.header-container').attr('id', 'shrink')
	}
	// if window scrolltop == anchor then remove active class from wherever it's currently active and change it to the current page 			// DO NOT TOUCH! ALL GOOD!
}


function send() {
	var info = [$('#name'), $('#email'), $('.message')];
	var open_message = null;
	console.log(info.every(function(x) {return (x.val())}))
	if (info.every(function(x) {return (x.val())})) {
		$('#thank-you').show();
		open_message = '#thank-you'
	} else {
		var missing = info.filter(function(i){return !(i.val())}); // returns the objects that have nothing in the field
		missing = missing.map(function(i){return i.attr('id')});
		var text = "";
		missing.forEach(function(id, index){
			var last = missing.length - 1;
			if (index !== last) {
				text += id + ', '
			} else {
				text += id
			}
		});
		console.log(text)
		document.getElementById('error').innerHTML = 'You are missing information! Please fill out the following field(s): <b>' + text + '</b>.';
		$('#error').show();
		open_message = '#error';
	}
	setTimeout(function() {$(open_message).hide()}, 8000)
}

document.getElementById("mail").addEventListener("click", send)

