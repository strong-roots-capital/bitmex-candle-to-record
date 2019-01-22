# bitmex-candle-to-record [![Build status](https://travis-ci.org/strong-roots-capital/bitmex-candle-to-record.svg?branch=master)](https://travis-ci.org/strong-roots-capital/bitmex-candle-to-record) [![npm version](https://img.shields.io/npm/v/bitmex-candle-to-record.svg)](https://npmjs.org/package/bitmex-candle-to-record) [![codecov](https://codecov.io/gh/strong-roots-capital/bitmex-candle-to-record/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/bitmex-candle-to-record)

> Map a BitMEX Candle to a talib Record

## Install

``` shell
npm install bitmex-candle-to-record
```

## Use

``` typescript
import bitmexCandleToRecord from 'bitmex-candle-to-record'
import Record from 'timeseries-record'

import { BitmexAPI } from 'bitmex-node'
const bitmex = new BitmexAPI()

(async () => {
    const quotes = await bitmex.Trade.getBucketed({
        binSize: '1d',
        partial: false,
        symbol: 'XBTUSD',
        reverse: true
    })
    const records: Record[] = quotes.map(bitmexCandleToRecord, '1d')
}) ()
```

## Related

- [bitmex-node](https://www.npmjs.com/package/bitmex-node)
- [timeseries-record](https://github.com/strong-roots-capital/timeseries-record)
