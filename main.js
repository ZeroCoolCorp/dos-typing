jQuery(document).ready(function($) {
(function(){
	//Jquery selectors
	let startBtn = $('.startBtn');
	let input = $('.input');
	let lines = $('.line');
	let allText = [];
	let score = 0;
	let result = $('.display-result');


	//Event listeners
	startBtn.on('click', startGame);








	//Functions
	function startGame() {
		$(this).hide();
		input.focus();
		//setup
		let speed = 1;
		let txtLenght = 3;
		let typingWords = words.filter(word => word.length == txtLenght);
		let lvl = 6;

		let sppedup = setInterval(function () {
			lvl++;
			speed++;
			txtLenght++;
		typingWords = words.filter(word => word.length == txtLenght);

		}, 20000);

		input.on('keyup', check);

		function check() {
			let inputVal = $(this).val();
			let self = $(this);
				if (allText.includes(inputVal)) {
					let index = allText.indexOf(inputVal)
					allText.splice(index, 1)
					$('span').filter(function () {
						return $(this).text() == inputVal;
					}).css('background', 'blue').fadeOut(100, function() {
						$(this).remove();
					})
					self.val("");
					score++;
					result.html(score)
				}
			}


		//Insert spans
		function insertSpans(){
		for (var i = 0; i < lines.length; i++) {
			let rand = Math.floor(Math.random()* 20);
			if (rand <= lvl) {
				let text = chooseText();
				allText.push(text);
				$(lines[i]).append(`<span>${text}</span>`);
			}
		}
		setTimeout(insertSpans, 7000);
	}
		insertSpans();
		function chooseText(){
		let rand = Math.floor(Math.random()* typingWords.length);
		let saved = typingWords[rand];
		typingWords.splice(rand, 1);

		return saved;
	}
	//animate
	let moveAll = setInterval(function () {
		let allspans = $('span');

		allspans.css({
			left: '+='+speed 
			
		});
		//testing

		$.each(allspans, (index, el)=>{
			let position = $(el).position().left;
			if (position > 850) {

				clearInterval(moveAll);
				setTimeout(function () {
					window.location.assign('index.html');
				}, 5000)
			}else if(position > 700 && position < 710){
				$(el).addClass('danger');
			}
		});
	}, 100);


	}

	





























})();	
});