/**
 * Write your challenge solution here
 */

const clockEl = document.querySelector(".clock");
const digitalClockEl = document.querySelector(".digital-clock");
const dateEl = document.querySelector(".date");
/// functions
const initNumbers = () => {
  //init numbers
  for (let i = 1; i <= 12; i++) {
    const timeNumberEl = document.createElement("div");
    timeNumberEl.classList.add("number");
    const span = document.createElement("span");
    span.textContent = `${i}`;
    timeNumberEl.appendChild(span);

    // 360/12 = 30deg
    timeNumberEl.style.setProperty("--rotation", `${30 * i}deg`);
    clockEl.appendChild(timeNumberEl);
  }
};

const updateTimer = () => {
  setInterval(() => {
    const currentTime = new Date();
    const hrs = currentTime.getHours();
    const min = currentTime.getMinutes();
    const sec = currentTime.getSeconds();
    let formatedHrs = String(hrs % 12 === 0 ? 12 : hrs % 12).padStart(2, "0");

    //Date
    const formatedDate = currentTime.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    // adding AM PM
    /* hrs >= 12
      ? (formatedHrs = formatedHrs + " PM")
      : (formatedHrs = formatedHrs + " AM"); */

    digitalClockEl.textContent = `${formatedHrs}:${min}:${sec}`;
    dateEl.textContent = formatedDate;
  }, 1000);
};

initNumbers();
updateTimer();
