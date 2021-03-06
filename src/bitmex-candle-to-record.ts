/**
 * bitmex-candle-to-record
 * Map a BitMEX Candle to a talib TimeseriesRecord
 */

import D from 'od'
import ow from 'ow'
import TimeseriesRecord from 'timeseries-record'
import BitmexCandle from 'bitmex-candle'
import BinSize from '@strong-roots-capital/bitmex-bin-size'

/**
 * Transform a Candle as returned from the BitMEX exchange API into a
 * TimeseriesRecord used by talib.
 *
 * @remarks
 * `sessionLength` is required to convert the timestamp from
 * end-of-session to beginning-of-session.
 *
 * @param candle - Candle to convert into TimeseriesRecord
 * @param binSize - Timeframe of candle under conversion
 * @return `Candle` as TimeseriesRecord
 */
function bitmexCandleToRecord(
    candle: BitmexCandle,
    binSize: BinSize
): TimeseriesRecord {

    ow(binSize, ow.string.matches(/^(1[mhd]|5m)$/))

    return {
        Time: startOfCandle(candle, binSize),
        Open: candle.open,
        High: candle.high,
        Low: candle.low,
        Close: candle.close,
        Volume: candle.volume
    }
}

function startOfCandle(candle: BitmexCandle, binSize: BinSize): number {
    const timeUnit = binSize.endsWith('m') ? 'minute'
        : binSize.endsWith('h') ? 'hour'
        : 'day'
    const timeQuantity = parseInt(binSize)
    const start = D.subtract(timeUnit, timeQuantity, D.of(candle.timestamp))
    return start.getTime()
}

export default bitmexCandleToRecord
