/**
 * @license Highcharts JS v@product.version@ (@product.date@)
 * @module highcharts/highcharts
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
declare global {
    interface Math {
        sign(x: number): number;
    }
    interface ObjectConstructor {
        setPrototypeOf<T>(o: T, proto: object | null): T;
    }
}
// Loads polyfills as a module to force them to load first.
import './polyfills.js';
import Highcharts from '../masters/highcharts.src.js';
import MSPointer from '../Core/MSPointer.js';
const G: AnyRecord = Highcharts;
if (MSPointer.isRequired()) {
    G.Pointer = MSPointer;
    MSPointer.compose(G.Chart);
}
// Default Export
export default G;
