import animateScrollTo from 'animated-scroll-to';
import throttle from 'lodash/throttle';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
import { render } from 'react-dom';
import RSVP from './components/rsvp/container';

import '../style/styles.scss';

const body = document.body;

const toggleClass = (elem, className, shouldAdd) => {
    let fn;

    if (isUndefined(shouldAdd)) {
        fn = elem.classList.contains(className) ? 'remove' : 'add';
    } else {
        fn = shouldAdd ? 'add' : 'remove';
    }

    return elem.classList[fn](className);
};

const withSelector = (selector, fn, opts = {}) => {
    const el = document[opts.multi ? 'querySelectorAll' : 'querySelector'](selector);
    return el && (opts.multi ? el.forEach(x => fn(x)) : fn(el));
};

const onMainNavClick = (e) => {
    const el = e.target;
    if (el.getAttribute('data-external')) { return; }
    e.preventDefault();
    const sectionId = el.href.split('#')[1];
    const section = document.getElementById(sectionId);
    const offset = section.getBoundingClientRect();
    body.classList.remove('showMenu');
    return animateScrollTo(offset.top + (document.body.scrollTop - 40));
};

window.addEventListener('scroll', throttle(() => toggleClass(body, 'scrolled', (body.scrollTop >= 125)), 250));
withSelector('.mainNav-item', el => el.addEventListener('click', onMainNavClick), { multi: true });
withSelector('.js-menu-toggle', el => el.addEventListener('click', () => toggleClass(body, 'showMenu')));
withSelector('.js-rsvp', el => render(<RSVP />, el));
