
function Logger(enabled = true) {
    this.enabled = true;

    this.log = (log) => {
        log(log);
    }
}

function log(log) {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(time + '--- ' + log);
}