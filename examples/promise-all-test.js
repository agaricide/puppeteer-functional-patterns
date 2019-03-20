const { performance } = require('perf_hooks');

// This example illustrates the performance benefits of 'promise.all'
// in I/O bound contexts.

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const control = async () => {
    const startTime = performance.now();
    await sleep(3000);
    await sleep(3000);
    await sleep(3000);
    const endTime = performance.now();
    console.log(`control time slept: ${endTime - startTime}`);
}

const test = async () => {
    const startTime = performance.now();
    await Promise.all([
        sleep(3000),
        sleep(3000),
        sleep(3000)
    ]);
    const endTime = performance.now();
    console.log(`test time slept: ${endTime - startTime}`);
}

control();  // control time slept: 9007.138753999956
test();     // test time slept: 3003.4027610002086