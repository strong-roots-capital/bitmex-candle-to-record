import test from 'ava'

import Record from 'timeseries-record'

import { BitmexAPI } from 'bitmex-node'
const bitmex = new BitmexAPI()

/**
 * Library under test
 */

import bitmexCandleToRecord from '../src/bitmex-candle-to-record'

test('should convert fresh candles from the bitmex api to records', async t => {
    try {
        const quotes = await bitmex.Trade.getBucketed({
            binSize: '1d',
            partial: false,
            symbol: 'XBTUSD',
            reverse: true
        })
        const record: Record = bitmexCandleToRecord(quotes[0])
        t.is(new Date(quotes[0].timestamp).getTime(), record.Time)
        t.is(quotes[0].open, record.Open)
        t.is(quotes[0].high, record.High)
        t.is(quotes[0].low, record.Low)
        t.is(quotes[0].close, record.Close)
    } catch (error) {
        t.fail()
    }
})
