import test from 'ava'

import D from 'od'
import Candle from 'bitmex-candle'
import Record from 'timeseries-record'

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

    test('should convert fresh candles from the bitmex api to records', t => {
        const record: Record = bitmexCandleToRecord(candles[0], '1d')
        t.deepEqual(
            new Date(record.Time),
            D.subtract('day', 1, D.of(candles[0].timestamp))
        )
        t.is(candles[0].open, record.Open)
        t.is(candles[0].high, record.High)
        t.is(candles[0].low, record.Low)
        t.is(candles[0].close, record.Close)
    })

    test('should subtract the session-length from timestamp (1m)', t => {
        const record: Record = bitmexCandleToRecord(candles[0], '1m')
        t.deepEqual(
            new Date(record.Time),
            D.subtract('minute', 1, D.of(candles[0].timestamp))
        )
    })

    test('should subtract the session-length from timestamp (5m)', t => {
        const record: Record = bitmexCandleToRecord(candles[0], '5m')
        t.deepEqual(
            new Date(record.Time),
            D.subtract('minute', 5, D.of(candles[0].timestamp))
        )
    })

    test('should subtract the session-length from timestamp (1h)', t => {
        const record: Record = bitmexCandleToRecord(candles[0], '1h')
        t.deepEqual(
            new Date(record.Time),
            D.subtract('hour', 1, D.of(candles[0].timestamp))
        )
    })

    test('should subtract the session-length from timestamp (1d)', t => {
        const record: Record = bitmexCandleToRecord(candles[0], '1d')
        t.deepEqual(
            new Date(record.Time),
            D.subtract('day', 1, D.of(candles[0].timestamp))
        )
    })
}).catch((error: Error) => {
    test('test should be able to query candles from bitmex', () => {
        throw error
    })
})
