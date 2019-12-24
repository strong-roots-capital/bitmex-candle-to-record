import test, { ExecutionContext } from 'ava'

import D from 'od'
import Candle from 'bitmex-candle'
import Record from 'timeseries-record'

import { BitmexAPI } from 'bitmex-node'
const bitmex = new BitmexAPI()

/**
 * Library under test
 */

import bitmexCandleToRecord from '../src/bitmex-candle-to-record'


const shouldAlignDaylightSavingsChangesWithMidnight = async (
    t: ExecutionContext,
    isoString: string
) => {

    let candles: Candle[] = []
    try {
        candles = await bitmex.Trade.getBucketed({
            binSize: '1d',
            partial: false,
            symbol: 'XBTUSD',
            count: 1,
            startTime: isoString
        })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

    const records: Record[] = candles.map(c => bitmexCandleToRecord(c, '1d'))
    const record = records[0]

    t.is(
        D.of(record.Time).toISOString(),
        D.startOf('day', D.of(record.Time)).toISOString()
    )
}
shouldAlignDaylightSavingsChangesWithMidnight.title = (
    _ = '',
    isoString: string
) => `should align daily candle from DST-toggle on ${isoString} with midnight`

const daylightSavingsToggles = [
    "2017-03-12T01:00:00.000Z",
    "2017-11-05T00:00:00.000Z",
    "2018-03-11T01:00:00.000Z"
]
daylightSavingsToggles.forEach(isoString => {
    test(
        shouldAlignDaylightSavingsChangesWithMidnight,
        D.add('day', 1, D.startOf('day', D.of(isoString))).toISOString()
    )
})

//  LocalWords:  shouldAlignDaylightSavingsChangesWithMidnight
