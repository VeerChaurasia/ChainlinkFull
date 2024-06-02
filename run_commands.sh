#!/bin/bash

# Command 1: Calculate the witness using snarkjs
snarkjs wtns calculate VerifyEmail.circom input.json witness.wtns


# Command 2: Generate the witness using node
node generate_witness.js VerifyEmail.wasm input.json witness.wtns



# Command 3: Generate call data using snarkjs
snarkjs generatecall > output.txt

