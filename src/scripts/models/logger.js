
function Logger(enabled = true, logHistory, logHistroyCapacity = 10000, logHistoryRolls = true, logHistoryEnabled = true ) {
    this.enabled = enabled
    this.logHistory = logHistory && logHistory instanceof Array ? logHistory : []
    this.logHistoryCapacity = logHistroyCapacity
    this.logHistroyRolls = logHistoryRolls
    this.logHistoryEnabled = logHistoryEnabled
}

Logger.prototype._log = function(message, level) {
    if (message) {
        let levels = this.getLevels();
        switch(level) {
            case levels.generic:
                this._logGeneric(message)
                break
            case levels.info:
                this._logInfo(message)
                break
            case levels.warn:
                this._logWarn(message)
                break
            case levels.error:
                this._logError(message)
                break
            case levels.trace:
                this._logTrace(message)
                break
            default:
                console.error(`Unsupported log level: ${level}`)
                break
        }
    }
}

Logger.prototype._addToHistroy = function(log) {
    if (this.logHistroyEnabled) {
        if (this.logHistory.length >= this.logHistoryCapacity) {
            if (this.logHistroyRolls) {
                this.logHistory.shift()
                this.logHistory.push(log)
            }
        } else this.logHistory.push(log)
    }
}
Logger.prototype._logGeneric = function(message) {
    console.log(message)
}

Logger.prototype._logInfo = function(message) {
    console.info(message)
}

Logger.prototype._logError = function(message) {
    console.error(message)
}

Logger.prototype._logWarn = function(message) {
    console.warn(message)
}

Logger.prototype._logTrace = function(message) {
    console.trace(message)
}

Logger.prototype.log = function(message, level) {
    if (this.enabled) {
        this._log(message, level)
    }
};

Logger.prototype.logGeneric = function(message) {
    if (this.enabled) {
        this._logGeneric(message)
    }
};

Logger.prototype.logInfo = function(message) {
    if (this.enabled) {
        this._logInfo(message)
    }
};

Logger.prototype.logWarn = function(message) {
    if (this.enabled) {
        this._logWarn(message)
    }
};

Logger.prototype.logError = function(message) {
    if (this.enabled) {
        this._logError(message)
    }
};

Logger.prototype.logTrace = function(message) {
    if (this.enabled) {
        this._logTrace(message)
    }
};


Logger.prototype.forceLog = function(message, level) {
    this._log(message, level)
}

Logger.prototype.getLevels = function() {
    return {
        generic : 'generic',
        info : 'info',
        warn : 'warn',
        error : 'error',
        trace : 'trace'
    }
}


