import animateScrollTo from 'animated-scroll-to';
import throttle from 'lodash/throttle';
import isUndefined from 'lodash/isUndefined';

import '../style/styles.scss';

const body = document.body;
const navItems = document.querySelectorAll('.mainNav-item') || [];

const toggleClass = (elem, className, shouldAdd) => {
    let fn;

    if (isUndefined(shouldAdd)) {
        fn = elem.classList.contains(className) ? 'remove' : 'add';
    } else {
        fn = shouldAdd ? 'add' : 'remove';
    }

    return elem.classList[fn](className);
};

navItems.forEach(item => item.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = item.href.split('#')[1];
    const section = document.getElementById(sectionId);
    const offset = section.getBoundingClientRect();
    body.classList.remove('showMenu');
    return animateScrollTo(offset.top + (document.body.scrollTop - 40));
}));

window.addEventListener('scroll', throttle(() => toggleClass(body, 'scrolled', (body.scrollTop < 125)), 250));

const menuToggle = document.querySelector('.js-menu-toggle');
menuToggle.addEventListener('click', () => toggleClass(body, 'showMenu'));
