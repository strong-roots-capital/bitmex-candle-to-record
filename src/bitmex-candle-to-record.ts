/**
 * bitmex-candle-to-record
 * Map a BitMEX Candle to a talib Record
 */

import ow from 'ow'
import moment from 'moment'
import Record from 'timeseries-record'
import BitmexCandle from 'bitmex-candle'
import BinSize from '@strong-roots-capital/bitmex-bin-size'

/**
 * Transform a Candle as returned from the BitMEX exchange API into a
 * Record used by talib.
 *
 * @remarks
 * `sessionLength` is required to convert the timestamp from
 * end-of-session to beginning-of-session.
 *
 * @param candle - Candle to convert into Record
 * @param binSize - Timeframe of candle under conversion
 * @return `Candle` as Record
 */
function bitmexCandleToRecord(candle: BitmexCandle, binSize: BinSize): Record {

    ow(binSize, ow.string.not.empty)
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
    const timeQuantity = parseInt(binSize)
    const timeUnit = binSize.endsWith('m') ? 'minutes'
        : binSize.endsWith('h') ? 'hour'
        : 'day'
    const start = moment.utc(candle.timestamp).subtract(timeQuantity, timeUnit)
    return start.valueOf()
}

export default bitmexCandleToRecord
