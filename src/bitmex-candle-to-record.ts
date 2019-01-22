/**
 * bitmex-candle-to-record
 * Map a BitMEX Candle to a talib Record
 */

import BitmexCandle from 'bitmex-candle'
import Record from 'timeseries-record'

/**
 * Transform a Candle as returned from the BitMEX exchange API into a
 * Record used by talib.
 */
function bitmexCandleToRecord(candle: BitmexCandle): Record {
    return {
        Time: new Date(candle.timestamp).getTime(),
        Open: candle.open,
        High: candle.high,
        Low: candle.low,
        Close: candle.close,
        Volume: candle.volume
    }
}

export default bitmexCandleToRecord
