/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *  - Pawel Lysy
 *  - Karol Kolodziej
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type GUIElement from './Layout/GUIElement';
import type Board from './Board';

/* *
 *
 *  Namespace
 *
 * */

/**
 * Global Dashboards namespace in classic `<scripts>`-based implementations.
 *
 * @namespace Dashboards
 */
namespace Globals {

    /* *
     *
     *  Declarations
     *
     * */

    /**
     * Any type for objects with mixed property types.
     *
     * **Note:** This is not type safe and should be used only for property
     *           loops.
     */
    export type AnyRecord = Record<string, any>;

    /**
     * Abstract class type to wrap expected instance T.
     */
    export interface Class<T = unknown> extends Function {
        new(...args: Array<unknown>): T;
    }

    /**
     * Utility type to mark recursively all properties and sub-properties
     * optional.
     */
    export type DeepPartial<T> = {
        [K in keyof T]?: (T[K]|DeepPartial<T[K]>);
    };

    /**
     * Event callback as used by Highcharts.
     */
    export interface EventCallback<T> {
        (
            this: T,
            eventArguments: (Record<string, unknown>|Event)
        ): (boolean|void);
    }

    /* *
     *
     *  Constants
     *
     * */

    /**
     * Prefix of a GUIElement HTML class name.
     */
    export const classNamePrefix = 'highcharts-dashboards-';

    /** @internal */
    export const classNames = {
        layout: classNamePrefix + 'layout',
        cell: classNamePrefix + 'cell',
        cellHover: classNamePrefix + 'cell-state-hover',
        cellActive: classNamePrefix + 'cell-state-active',
        cellLoading: classNamePrefix + 'cell-state-loading',
        row: classNamePrefix + 'row',
        layoutsWrapper: classNamePrefix + 'layouts-wrapper',
        boardContainer: classNamePrefix + 'wrapper'
    };

    /** @internal */
    export const guiElementType: Record<string, GUIElement.GUIElementType> = {
        row: 'row',
        cell: 'cell',
        layout: 'layout'
    };

    /**
     * Contains all Board instances of this window.
     */
    export const boards: Array<Board|undefined> = [];

    /**
     * Reference to the window used by Dashboards.
     */
    export const win = window;

}

/* *
 *
 *  Default Export
 *
 * */

export default Globals;
