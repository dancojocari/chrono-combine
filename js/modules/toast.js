export function init() {
    const redToast = document.querySelector('.toast.red');
    const greenToast = document.querySelector('.toast.green');
    
    redToast.style.marginLeft = `${-1 * redToast.scrollWidth/2}px`;
    redToast.style.marginBottom = `${-1 * redToast.scrollHeight/2}px`;
    greenToast.style.marginLeft = `${-1 * greenToast.scrollWidth/2}px`;
    greenToast.style.marginBottom = `${-1 * greenToast.scrollHeight/2}px`;
}

export function show(selector, time) {
    const toastElement = document.querySelector(selector);
    toastElement.classList.toggle('show');
    setTimeout(() => {
        toastElement.classList.toggle('show');
    }, time);
}