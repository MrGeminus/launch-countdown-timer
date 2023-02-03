const startCountdown = () => {
    let launchTime = new Date().getTime() + 1209600999;

    const countdownIntervals = setInterval(() => {
        var currentTime = new Date().getTime();

        const timeDifference = launchTime - currentTime;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            flip(document.querySelector("[data-time=days]"), days)
            flip(document.querySelector("[data-time=hours]"), hours)
            flip(document.querySelector("[data-time=minutes]"), minutes)
            flip(document.querySelector("[data-time=seconds]"), seconds)
        }
        else {
            clearInterval(countdownIntervals);
            startCountdown()
        }
    }, 1000)
}

const flip = (element, newValue) => {
    const topHalf = element.querySelector("[data-value=top]")
    const bottomHalf = element.querySelector("[data-value=bottom]")
    const screenReadersOnly = element.querySelector("[data-value=screen]")

    const oldValue = parseInt(topHalf.textContent)
    if (oldValue === newValue) return

    const topHalfFlip = document.createElement("span")
    topHalfFlip.classList.add("countdown__upper-value", "countdown__upper-value--flip")
    const bottomHalfFlip = document.createElement("span")
    bottomHalfFlip.classList.add("countdown__lower-value", "countdown__lower-value--flip")

    topHalf.textContent = oldValue < 10 ? "0" + oldValue : oldValue
    bottomHalf.textContent = oldValue < 10 ? "0" + oldValue : oldValue
    topHalfFlip.textContent = oldValue < 10 ? "0" + oldValue : oldValue
    bottomHalfFlip.textContent = newValue < 10 ? "0" + newValue : newValue
    if (screenReadersOnly) screenReadersOnly.textContent = newValue

    topHalfFlip.addEventListener("animationstart", () => {
        topHalf.textContent = newValue < 10 ? "0" + newValue : newValue
    })
    topHalfFlip.addEventListener("animationend", () => {
        topHalfFlip.remove()
    })
    bottomHalfFlip.addEventListener("animationend", () => {
        bottomHalf.textContent = newValue < 10 ? "0" + newValue : newValue
        bottomHalfFlip.remove()
    })
    element.append(topHalfFlip, bottomHalfFlip)
}

startCountdown();

