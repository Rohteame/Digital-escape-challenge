// =====================
// GAME GUARD
// =====================

function checkGameAccess() {
	const started = sessionStorage.getItem("gameStarted");

	if (!started) {
		window.location.href = "/"; // landing page
	}
}

// =====================
// PREVENT BACK
// =====================

function preventBack() {
	window.history.pushState(null, "", window.location.href);

	window.addEventListener("popstate", function () {
		const leave = confirm(
			"⚠️ Warning!\n\nIf you leave the Digital Escape Challenge, your progress will be lost.\n\nOK = Restart\nCancel = Continue",
		);

		if (leave) {
			// sessionStorage.clear();
			window.location.href = "/";
		} else {
			// stay on page
			window.history.pushState(null, "", window.location.href);
		}
		// window.location.href = "/";
	});
}

// =====================
// TIMER
// =====================

function startTimer(minutes) {
	const endTime = Date.now() + minutes * 60 * 1000;
	sessionStorage.setItem("endTime", endTime);
}

function getTimeLeft() {
	const endTime = Number(sessionStorage.getItem("endTime"));

	if (!endTime) return null;

	return endTime - Date.now();
}

function runTimer() {
	const timerEl = document.getElementById("timer");

	if (!timerEl) return;

	let savedTime = sessionStorage.getItem("endTime");

	// ✅ if timer not started yet, show default 15:00
	if (!savedTime) {
		timerEl.textContent = "15:00";
		return;
	}

	const interval = setInterval(() => {
		const timeLeft = getTimeLeft();

		if (!timeLeft || timeLeft <= 0) {
			clearInterval(interval);
			timerEl.textContent = "00:00";
			alert("Time up!");
			window.location.href = "/background";
		}

		const minutes = Math.floor(timeLeft / 60000);
		const seconds = Math.floor((timeLeft % 60000) / 1000);

		timerEl.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	}, 1000);
}

function beginGame() {
	startTimer(15);
	sessionStorage.setItem("gameStarted", "true");
	window.location.href = "/room1";
}

if (
	document.body.id === "room1" ||
	document.body.id === "room2" ||
	document.body.id === "room3" ||
	document.body.id === "success-page"
) {
	checkGameAccess();
	runTimer();
	preventBack();
}

// END TIMER

function restartGame() {
	const confirmRestart = confirm(
		"Are you sure you want to restart?\n\nYour progress will be lost.",
	);

	if (confirmRestart) {
		// sessionStorage.clear();
		window.location.href = "/background";
	}
}

const messageModal = document.getElementById("message-modal");

if (messageModal) {
	messageModal.addEventListener("show.bs.modal", (event) => {
		// Button that triggered the modal
		const button = event.relatedTarget;
		// Extract info from data-bs-* attributes
		const heading = button.getAttribute("data-bs-header");
		const title = button.getAttribute("data-bs-title");
		const body = button.getAttribute("data-bs-body");
		const modalbutton = button.getAttribute("data-bs-button");
		const isCorect = button.getAttribute("data-bs-correct");
		// If necessary, you could initiate an AJAX request here
		// and then do the updating in a callback.
		//
		// Update the modal's content.
		const modalheader = messageModal.querySelector(".modal-heading");
		const modalTitle = messageModal.querySelector(".modal-title");
		const modalBody = messageModal.querySelector(".modal-body");
		const try_again = messageModal.querySelector(".try-again-btn");
		const proceed_btn = messageModal.querySelector(".proceed-btn");
		const modal_closebtn = messageModal.querySelector(".btn-close");

		modalheader.innerHTML = heading;
		modalTitle.innerHTML = title;
		modalBody.innerHTML = body;
		try_again.innerHTML = modalbutton;
		proceed_btn.innerHTML = modalbutton;

		if (isCorect == "true") {
			proceed_btn.classList.remove("hide");
			try_again.classList.add("hide");
			modal_closebtn.classList.add("hide");
		}
		console.log(heading);
		// console.log(isCorect);
	});
}

// room3;
const checkboxes = document.querySelectorAll(".room3-option");
const button = document.querySelector(".secondary-btn");
const room3 = document.getElementById("room3");

const correct = ["desktop", "documents", "pictures"];

if (checkboxes) {
	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", () => {
			const selected = [];

			document.querySelectorAll(".room3-option:checked").forEach((cb) => {
				selected.push(cb.value);
			});

			const wrongSelected = selected.some((value) => !correct.includes(value));

			if (wrongSelected) {
				room3.style.backgroundColor = "red";
				room3.classList.add("red");
				setTimeout(() => {
					room3.classList.remove("red");
				}, 300);

				checkboxes.forEach((cb) => (cb.checked = false));
				button.classList.add("disabled");

				return;
			}

			if (selected.length === 3 && correct.every((v) => selected.includes(v))) {
				button.classList.remove("disabled");
			} else {
				button.classList.add("disabled");
			}
		});
	});
}
