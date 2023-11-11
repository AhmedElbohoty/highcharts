/* *
 *
 *  (c) 2023 Torstein Honsi, Askel Eirik Johansson
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

import type Chart from '../../Core/Chart/Chart';
import type Axis from '../../Core/Axis/Axis';
import type GlobalsLike from '../../Core/GlobalsLike';
import type PointerEvent from '../../Core/PointerEvent';
import type MouseWheelZoomOptions from './MouseWheelZoomOptions';
import type DOMElementType from '../../Core/Renderer/DOMElementType';

import U from '../../Core/Utilities.js';
const {
    addEvent,
    isObject,
    pick,
    defined,
    merge
} = U;

import NBU from '../Annotations/NavigationBindingsUtilities.js';
const { getAssignedAxis } = NBU;

/* *
 *
 *  Constants
 *
 * */

const composedClasses: Array<(Function|GlobalsLike)> = [],
    defaultOptions: MouseWheelZoomOptions = {
        enabled: true,
        sensitivity: 1.1
    };

let wheelTimer: number;


/* *
 *
 *  Functions
 *
 * */

/**
 * @private
 */
const optionsToObject = (
    options?: boolean|MouseWheelZoomOptions
): MouseWheelZoomOptions => {
    if (!isObject(options)) {
        options = {
            enabled: options ?? true
        };
    }
    return merge(defaultOptions, options);
};


/**
 * @private
 */
const zoomBy = function (
    chart: Chart,
    howMuch: number,
    xAxis: Array<Axis>,
    yAxis: Array<Axis>,
    mouseX: number,
    mouseY: number,
    options: MouseWheelZoomOptions
): boolean {
    const type = pick(
        options.type,
        chart.zooming.type,
        ''
    );

    let axes: Array<Axis> = [];
    if (type === 'x') {
        axes = xAxis;
    } else if (type === 'y') {
        axes = yAxis;
    } else if (type === 'xy') {
        axes = chart.axes;
    }

    mouseX -= chart.plotLeft;
    mouseY -= chart.plotTop;

    if (defined(wheelTimer)) {
        clearTimeout(wheelTimer);
    }

    const hasZoomed = chart.transform({
        axes,
        moveX: mouseX - howMuch * mouseX,
        moveY: mouseY - howMuch * mouseY,
        zoomX: howMuch,
        zoomY: howMuch
    });

    if (hasZoomed) {

        // Some time after the last mousewheel event, run drop. In case any of
        // the affected axes had `startOnTick` or `endOnTick`, they will be
        // re-adjusted now.
        wheelTimer = setTimeout((): void => {
            chart.pointer?.drop();
        }, 400);
    }

    return hasZoomed;
};

/**
 * @private
 */
function onAfterGetContainer(this: Chart): void {
    const chart = this,
        wheelZoomOptions = optionsToObject(chart.zooming.mouseWheel);

    if (wheelZoomOptions.enabled) {
        addEvent(this.container, 'wheel', (e: PointerEvent): void => {
            e = this.pointer.normalize(e);
            const allowZoom = !chart.pointer.inClass(
                e.target as DOMElementType,
                'highcharts-no-mousewheel'
            );

            // Firefox uses e.detail, WebKit and IE uses deltaX, deltaY, deltaZ.
            if (chart.isInsidePlot(
                e.chartX - chart.plotLeft,
                e.chartY - chart.plotTop
            ) && allowZoom) {

                const wheelSensitivity = wheelZoomOptions.sensitivity || 1.1,
                    delta = e.detail || ((e.deltaY || 0) / 120),
                    xAxisCoords = getAssignedAxis(
                        this.pointer.getCoordinates(e).xAxis
                    ),
                    yAxisCoords = getAssignedAxis(
                        this.pointer.getCoordinates(e).yAxis
                    );

                const hasZoomed = zoomBy(
                    chart,
                    Math.pow(
                        wheelSensitivity,
                        delta
                    ),
                    xAxisCoords ? [xAxisCoords.axis] : chart.xAxis,
                    yAxisCoords ? [yAxisCoords.axis] : chart.yAxis,
                    e.chartX,
                    e.chartY,
                    wheelZoomOptions
                );

                // Prevent page scroll
                if (hasZoomed) {
                    e.preventDefault?.();
                }
            }


        });
    }
}


/**
 * @private
 */
function compose(
    ChartClass: typeof Chart
): void {

    if (composedClasses.indexOf(ChartClass) === -1) {
        composedClasses.push(ChartClass);

        addEvent(ChartClass, 'afterGetContainer', onAfterGetContainer);
    }
}

/* *
 *
 *  Default Export
 *
 * */

const MouseWheelZoomComposition = {
    compose
};

export default MouseWheelZoomComposition;

/* *
 *
 *  API Options
 *
 * */

/**
 * The mouse wheel zoom is a feature included in Highcharts Stock, but is also
 * available for Highcharts Core as a module. Zooming with the mouse wheel is
 * enabled by default in Highcharts Stock. In Highcharts Core it is enabled if
 * [chart.zooming.type](chart.zooming.type) is set. It can be disabled by
 * setting this option to `false`.
 *
 * @type      {boolean|object}
 * @since 11.1.0
 * @requires  modules/mouse-wheel-zoom
 * @sample    {highcharts} highcharts/mouse-wheel-zoom/enabled
 *            Enable or disable
 * @sample    {highstock} stock/mouse-wheel-zoom/enabled
 *            Enable or disable
 * @apioption chart.zooming.mouseWheel
 */

/**
 * Zooming with the mouse wheel can be disabled by setting this option to
 * `false`.
 *
 * @type      {boolean}
 * @default   true
 * @since 11.1.0
 * @requires  modules/mouse-wheel-zoom
 * @apioption chart.zooming.mouseWheel.enabled
 */

/**
 * Adjust the sensitivity of the zoom. Sensitivity of mouse wheel or trackpad
 * scrolling. `1` is no sensitivity, while with `2`, one mouse wheel delta will
 * zoom in `50%`.
 *
 * @type      {number}
 * @default   1.1
 * @since 11.1.0
 * @requires  modules/mouse-wheel-zoom
 * @sample    {highcharts} highcharts/mouse-wheel-zoom/sensitivity
 *            Change mouse wheel zoom sensitivity
 * @sample    {highstock} stock/mouse-wheel-zoom/sensitivity
 *            Change mouse wheel zoom sensitivity
 * @apioption chart.zooming.mouseWheel.sensitivity
 */

/**
 * Decides in what dimensions the user can zoom scrolling the wheel. Can be one
 * of `x`, `y` or `xy`. In Highcharts Core, if not specified here, it will
 * inherit the type from [chart.zooming.type](chart.zooming.type). In Highcharts
 * Stock, it defaults to `x`.
 *
 * Note that particularly with mouse wheel in the y direction, the zoom is
 * affected by the default [yAxis.startOnTick](#yAxis.startOnTick) and
 * [endOnTick]((#yAxis.endOnTick)) settings. In order to respect these settings,
 * the zoom level will adjust after the user has stopped zooming. To prevent
 * this, consider setting `startOnTick` and `endOnTick` to `false`.
 *
 * @type      {string}
 * @default   {highcharts} undefined
 * @default   {highstock} x
 * @validvalue ["x", "y", "xy"]
 * @since 11.1.0
 * @requires  modules/mouse-wheel-zoom
 * @apioption chart.zooming.mouseWheel.type
 */

(''); // Keeps doclets above in JS file
