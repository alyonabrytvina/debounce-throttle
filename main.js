const input = document.querySelector('input');
const defaultText = document.querySelector('#default');
const debounceText = document.querySelector('#debounce');
const throttleText = document.querySelector('#throttle');

// input.addEventListener('input', (e) => {
//     console.log(defaultText, 'defaultText');
//     defaultText.textContent = e.target.value;
//     updateDebounceTime(e.target.value);
//     updateThrottleTime(e.target.value);
// });


function debounce(cb, delay = 1000) {
    let timeout;

    return (...arguments) => {
        console.log(arguments);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...arguments);
        }, delay);
    };
}

const updateDebounceTime = debounce((value) => {
    // debounceText.textContent = value;
    incrementCount(debounceText);

});

const updateThrottleTime = throttle((value) => {
    // throttleText.textContent = value;
    incrementCount(throttleText);
});

function throttle(cb, delay = 1000) {
    let shouldWait = false;
    let waitingArgs = null;

    const timeoutFC = () => {
        if (waitingArgs === null) {
            shouldWait = false;
        } else {
            cb(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFC, delay);
        }
    };

    return (...arguments) => {
        if (shouldWait) {
            waitingArgs = arguments;
            return;
        }

        cb(...arguments);
        shouldWait = true;

        setTimeout(timeoutFC, delay);
    };
}

document.addEventListener('mousemove', (e) => {
    updateThrottleTime();
    updateDebounceTime();
    defaultText.textContent = parseInt(defaultText.innerText || 0) + 1;
});


function incrementCount(element) {
    element.textContent = parseInt(element.innerText || 0) + 1;
}
