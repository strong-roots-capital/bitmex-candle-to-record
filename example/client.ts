import bitmexCandleToRecord from '../src/bitmex-candle-to-record'
import Record from 'timeseries-record'

import { BitmexAPI } from 'bitmex-node'
const bitmex = new BitmexAPI()

async function main() {
    const quotes  = await bitmex.Trade.getBucketed({
        binSize: '1d',
        partial: false,
        symbol: 'XBTUSD',
        reverse: true
    })
    const records: Record[] = quotes.map((quote) => bitmexCandleToRecord(quote, '1d'))
    console.log(quotes.reverse())
}

main()
