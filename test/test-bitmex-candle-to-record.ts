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


bitmex.Trade.getBucketed({
    binSize: '1d',
    partial: false,
    symbol: 'XBTUSD',
    reverse: true,
    count: 5
}).then((candles: Candle[]) => {

    test('should convert fresh candles from the bitmex api to records', async t => {
        const record: Record = bitmexCandleToRecord(candles[0], '1d')
        t.deepEqual(moment(candles[0].timestamp).subtract(1, 'day').toDate(), new Date(record.Time))
        t.is(candles[0].open, record.Open)
        t.is(candles[0].high, record.High)
        t.is(candles[0].low, record.Low)
        t.is(candles[0].close, record.Close)
    })

    test('should throw ArgumentError when given an empty session', t => {
        const error = t.throws(() => {
            bitmexCandleToRecord(candles[0], '')
        }, Error)
        t.is(error.name, 'ArgumentError')
    })

    test('should throw ArgumentError when given an invalid session', t => {
        const testStrings = ['5h', '4h', '5d', '1W', '1M', 'B5', '!!']
        testStrings.forEach(str => {
            const error = t.throws(() => {
                bitmexCandleToRecord(candles[0], str)
            }, Error)
            t.is(error.name, 'ArgumentError')
        })
    })

    test('should subtract the session-length from timestamp (1m)', t => {
        const record: Record = bitmexCandleToRecord(candles[0], '1m')
        t.deepEqual(moment(candles[0].timestamp).subtract(1, 'minute').toDate(), new Date(record.Time))
    })

    test('should subtract the session-length from timestamp (5m)', t => {
        const record: Record = bitmexCandleToRecord(candles[0], '5m')
        t.deepEqual(moment(candles[0].timestamp).subtract(5, 'minute').toDate(), new Date(record.Time))
    })

    test('should subtract the session-length from timestamp (1h)', t => {
        const record: Record = bitmexCandleToRecord(candles[0], '1h')
        t.deepEqual(moment(candles[0].timestamp).subtract(1, 'hour').toDate(), new Date(record.Time))
    })

    test('should subtract the session-length from timestamp (1d)', t => {
        const record: Record = bitmexCandleToRecord(candles[0], '1d')
        t.deepEqual(moment(candles[0].timestamp).subtract(1, 'day').toDate(), new Date(record.Time))
    })
}).catch((error: Error) => {
    test('test should be able to query candles from bitmex', t => {
        t.fail()
    })
})
