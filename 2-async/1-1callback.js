//programmation synchrone
function syncFunctionThatProvidesData() {
    return 'some sync data';
}
function syncFunctionThatUsesData(data) {
    console.log(data);
}

const data = syncFunctionThatProvidesData();
syncFunctionThatUsesData(data);

//programmation asynchrone
function asyncFunctionThatProvidesSomeData(callback) {
    setTimeout(function () {
        callback('some async data');
    }, 1000);
}

asyncFunctionThatProvidesSomeData(syncFunctionThatUsesData);

console.log('sync log');


