	var buttonGrid = document.getElementById("buttonGrid"),
	    buttons = buttonGrid.children,
	    pattern = [],
	    state = "trainingPatttern1",
	    buttonsMode = true,
		max = 9;
	buttonGrid.onclick = togglePattern;

	function storePattern() {
	  if (window.localStorage) {
	    if (state == "trainingPatttern1") {
	      localStorage.testPattern1 = pattern;
	      console.log("pattern1 set to : " + localStorage.testPattern1);
	      document.getElementById("notification").innerHTML = "Draw pattern again to confirm:";
	      state = "trainingPatttern2";
	      addControls();
	    } else if (state == "trainingPatttern2") {
	      localStorage.testPattern2 = pattern;
	      console.log("pattern2 set to : " + localStorage.testPattern2);
	      document.getElementById("notification").innerHTML = "Pattern2 saved successfully.";
	      state = "test";
	      matchAndSetPattern();
	    } else if (state == "test") {
	      localStorage.testPattern = pattern;
	      validatePattern();
	    }
	  }
	  resetGrid();
	}

	function addControls() {
	  var controlBox = document.getElementById("controls");
	  if (state == "trainingPatttern1") {
	    controlBox.innerHTML = "";
	    var element = document.createElement("input");
	    element.setAttribute("type", "button");
	    element.setAttribute("value", "Retry");
	    element.setAttribute("id", "cancelBtn");
	    element.setAttribute("onclick", "cancelTraining()");
	    controlBox.appendChild(element);

	    element = document.createElement("input");
	    element.setAttribute("type", "button");
	    element.setAttribute("value", "Continue");
	    element.setAttribute("id", "continueBtn");
	    element.setAttribute("onclick", "storePattern()");
	    element.setAttribute("disabled", "true");
	    controlBox.appendChild(element);
	  } else if (state == "trainingPatttern2") {
	    controlBox.innerHTML = "";
	    var element = document.createElement("input");
	    element.setAttribute("type", "button");
	    element.setAttribute("value", "Cancel");
	    element.setAttribute("id", "cancelBtn");
	    element.setAttribute("onclick", "cancelTraining()");
	    controlBox.appendChild(element);

	    element = document.createElement("input");
	    element.setAttribute("type", "button");
	    element.setAttribute("value", "Confirm");
	    element.setAttribute("id", "continueBtn");
	    element.setAttribute("onclick", "storePattern()");
	    element.setAttribute("disabled", "true");
	    controlBox.appendChild(element);

	  } else if (state == "test") {
	    controlBox.innerHTML = "";
	    var element = document.createElement("input");
	    element.setAttribute("type", "button");
	    element.setAttribute("value", "Reset Pattern");
	    element.setAttribute("id", "cancelBtn");
	    element.setAttribute("onclick", "cancelTraining()");
	    controlBox.appendChild(element);

	  }
	}

	function cancelTraining() {
	  state = "trainingPatttern1";
	  document.getElementById("controls").innerHTML = "";
	  document.getElementById("notification").innerHTML = "Draw an unlock pattern.";
	  resetGrid();
	}

	function validPattern() {
	  if (state == "test") {
	    storePattern();
	    validatePattern();
	    return;
	  }
	  document.getElementById("continueBtn").removeAttribute("disabled");
	}

	function validatePattern() {
	  if (state == "test" && window.localStorage) {
	    if (localStorage.finalPattern == localStorage.testPattern) {
	      console.log("Correctamundo : " + localStorage.testPattern);
	      document.getElementById("notification").innerHTML = "Correct pattern.";
	    } else {
	      console.log("Wrong pattern");
	      document.getElementById("notification").innerHTML = "Wrong pattern.";
	    }
	  }
	}

	function matchAndSetPattern() {
	  if (state == "test" && window.localStorage) {
	    if (localStorage.testPattern1 == localStorage.testPattern2) {
	      localStorage.finalPattern = localStorage.testPattern2;
	      console.log("pattern set to : " + localStorage.finalPattern);
	      document.getElementById("notification").innerHTML = "Lock Pattern saved successfully.";
	      addControls();
	    } else {
	      console.log("Patterns dont match");
	      document.getElementById("notification").innerHTML = "Patterns donot match.";
	      state = "trainingPatttern2";
	    }
	  }
	}

	function resetGrid() {
	  pattern = [];
	  for (var i = 0; i < buttons.length; i++) {
	    buttons[i].onmouseover = null;
	    buttons[i].classList.remove("selected");
	  }
	  buttonsMode = true;
	}

	function togglePattern(e) {
	  document.getElementById("notification").innerHTML = "Click again when finished.";

	  if (buttonsMode == false) {
	    if (pattern.length > 3) {
	      document.getElementById("notification").innerHTML = "Pattern recorded!";
	      validPattern();
	    } else {
	      console.log("pattern too short ");
	      document.getElementById("notification").innerHTML = "Password Length must be atleast 4. Try again:";
	      setTimeout(resetGrid, 800);
	    }
	    for (var i = 0; i < buttons.length; i++) {
	      buttons[i].onmouseover = null;
	    }
	    return;
	  }

	  addControls();
	  for (var i = 0; i < buttons.length; i++) {
	    buttons[i].onmouseover = addToPattern;
	  }

	  var event = e || window.event
	  var target = 'target' in event ? event.target : event.srcElement;
	  target.classList.add("selected");
	  if (pattern.indexOf(target.id) == -1 && target.id != "") {
	    pattern.push(target.id);
	  }
	  buttonsMode = false;
	}

	function addToPattern(e) {
	  var event = e || window.event
	  var target = 'target' in event ? event.target : event.srcElement;
	  if (pattern.indexOf(target.id) == -1 && target.id != "") {
	    pattern.push(target.id);
	  }
	  target.classList.add("selected")
	  console.log("pattern " + pattern);
	}
	
	function loadLock(max){
		var i =0,html=[];
		while(i<max){
			html.push('<div class="button" id="'+ i +'"><div class="dot"></div></div>');
			i++;
		}
		document.getElementById('buttonGrid').innerHTML = html.join('');
	}
	
	loadLock(max);
