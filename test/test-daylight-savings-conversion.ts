import test from 'ava'

import Candle from 'bitmex-candle'
import Record from 'timeseries-record'
import moment from 'moment'

import { BitmexAPI } from 'bitmex-node'
const bitmex = new BitmexAPI()

/**
 * Library under test
 */

import bitmexCandleToRecord from '../src/bitmex-candle-to-record'


const shouldAlignDaylightSavingsChangesWithMidnight = async (t: any, isoString: string) => {

    // console.log('Pulling candle with timestamp', isoString)

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
    // console.log(records.map(r => new Date(r.Time).toISOString()))
    const record = records[0]

    // console.log('Working with record with Time', new Date(record.Time).toISOString())
    t.is(moment.utc(record.Time).startOf('day').toISOString(), new Date(record.Time).toISOString())
}
shouldAlignDaylightSavingsChangesWithMidnight.title = (_ = '', isoString: string) => `should align daily candle from DST-toggle on ${isoString} with midnight`

const daylightSavingsToggles = [
    "2017-03-12T01:00:00.000Z",
    "2017-11-05T00:00:00.000Z",
    "2018-03-11T01:00:00.000Z"
]
daylightSavingsToggles.forEach(isoString => {
    test(shouldAlignDaylightSavingsChangesWithMidnight, moment.utc(isoString).add(1, 'day').startOf('day').toISOString())
})

//  LocalWords:  shouldAlignDaylightSavingsChangesWithMidnight
