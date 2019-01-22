/**
 * bitmex-candle-to-record
 * Map a BitMEX Candle to a talib Record
 */

import ow from 'ow'
import moment from 'moment'
import Record from 'timeseries-record'
import BitmexCandle from 'bitmex-candle'

/**
 * Transform a Candle as returned from the BitMEX exchange API into a
 * Record used by talib.
 *
 * `sessionLength` is required to convert the timestamp from
 * end-of-session to beginning-of-session.
 * Available values are those accepted by the BitMEX `/trade/bucketed`
 * API endpoint (at time of writing [`1m`,`5m`,`1h`,`1d`]).
 */
function bitmexCandleToRecord(candle: BitmexCandle, sessionLength: string): Record {

    ow(sessionLength, ow.string.not.empty)
    ow(sessionLength, ow.string.matches(/^(1[mhd]|5m)$/))

    const timeQuantity = parseInt(sessionLength)
    const timeUnit = sessionLength.endsWith('m') ? 'minutes'
        : sessionLength.endsWith('h') ? 'hour'
        : 'day'

    return {
        Time: moment(candle.timestamp).subtract(timeQuantity, timeUnit).toDate().getTime(),
        Open: candle.open,
        High: candle.high,
        Low: candle.low,
        Close: candle.close,
        Volume: candle.volume
    }
}

export default bitmexCandleToRecord
