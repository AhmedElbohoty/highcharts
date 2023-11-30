/**
 * @license Highcharts Gantt JS v@product.version@ (@product.date@)
 * @module highcharts/modules/pathfinder
 * @requires highcharts
 *
 * Pathfinder
 *
 * (c) 2016-2021 Øystein Moseng
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import Pathfinder from '../../Gantt/Pathfinder.js';
import ArrowSymbols from '../../Extensions/ArrowSymbols.js';
const G: AnyRecord = Highcharts;
ArrowSymbols.compose(G.SVGRenderer);
if (!G.Pathfinder) {
    G.Pathfinder = Pathfinder;
    Pathfinder.compose(G.Chart, G.Point);
}
export default Highcharts;
