/* *
 *
 *  Base popup.
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import AST from '../Core/Renderer/HTML/AST.js';
import U from '../Core/Utilities.js';
const {
    addEvent,
    createElement
} = U;

/* *
 *
 *  Class
 *
 * */

abstract class BasePopup {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor(
        parentDiv: HTMLElement,
        iconsURL: string
    ) {
        this.iconsURL = iconsURL;

        this.container = this.createPopupContainer(parentDiv);

        this.closeButton = this.addCloseButton();
    }

    /* *
     *
     *  Properties
     *
     * */

    public container: HTMLElement;
    public closeButton: HTMLElement;
    public formType?: string;
    public iconsURL: string;

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Create popup div container.
     *
     * @param {HTMLElement} parentDiv
     * Parent div to attach popup.
     *
     * @param  {string} className
     * Class name of the popup.
     *
     * @return {HTMLElement}
     * Popup div.
     */
    private createPopupContainer(
        parentDiv: HTMLElement,
        className: string = 'highcharts-popup highcharts-no-tooltip'
    ): HTMLElement {
        return createElement(
            'div',
            { className },
            void 0,
            parentDiv
        );
    }

    /**
     * Create HTML element and attach click event to close popup.
     *
     * @return {HTMLElement}
     * Close button.
     */
    private addCloseButton(): HTMLElement {
        const popup = this,
            iconsURL = this.iconsURL;

        // Create close popup button.
        const closeButton = createElement(
            'div',
            {
                className: 'highcharts-popup-close'
            },
            void 0,
            this.container
        );

        closeButton.style['background-image' as any] = 'url(' +
                (
                    iconsURL.match(/png|svg|jpeg|jpg|gif/ig) ?
                        iconsURL : iconsURL + 'close.svg'
                ) + ')';

        ['click', 'touchstart'].forEach((eventName: string): void => {
            addEvent(
                closeButton,
                eventName,
                popup.closeButtonEvents.bind(popup)
            );
        });

        return closeButton;
    }

    /**
     * Close button events.
     * @return {void}
     */
    public closeButtonEvents(): void {
        this.closePopup();
    }

    /**
     * Reset content of the current popup and show.
     */
    public showPopup(): void {
        const popupDiv = this.container,
            toolbarClass = 'highcharts-annotation-toolbar',
            popupCloseButton = this.closeButton;

        this.formType = void 0;

        // Reset content.
        popupDiv.innerHTML = AST.emptyHTML;

        // Reset toolbar styles if exists.
        if (popupDiv.className.indexOf(toolbarClass) >= 0) {
            popupDiv.classList.remove(toolbarClass);

            // reset toolbar inline styles
            popupDiv.removeAttribute('style');
        }

        // Add close button.
        popupDiv.appendChild(popupCloseButton);
        popupDiv.style.display = 'block';
        popupDiv.style.height = '';
    }

    /**
     * Hide popup.
     */
    public closePopup(): void {
        this.container.style.display = 'none';
    }
}

/* *
 *
 *  Class Prototype
 *
 * */

interface BasePopup {
}

/* *
 *
 *  Default Export
 *
 * */

export default BasePopup;
