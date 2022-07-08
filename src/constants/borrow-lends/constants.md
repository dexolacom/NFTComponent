#### Global object ADDRESSES_FACTORY

Contains all information on available tokens for lend/borrow.
The `symbol` and `decimal` fields are filled with asynchronous functions

#### GetDecimals
1. Gets chainId
2. Iterates over all object keys and selects the `iAddress` of each token
3. Creates a contract object based on this iAddress and gets the necessary decimal
4. Writes the received decimals to the `decimals` field of the `ADDRESSES_FACTORY` object

#### GetSymbol
1. Gets chainId
2. Iterates over all object keys and selects the `address` of each token
3. Creates a contract object based on this address and gets the necessary symbol
4. Writes the received symbol to the `symbol` field of the `ADDRESSES_FACTORY` object
