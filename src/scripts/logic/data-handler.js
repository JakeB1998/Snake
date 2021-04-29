
(function(global) {
    const storageID = 'fjdlksjfiuejfennjods';
    const defaultSettingsJsonObject = {
        music : false,
        sfx : false,
    }
 
    const defaultGameDataJsonObject = {
        data : {
            settings : defaultSettingsJsonObject
        }
    }

    Object.setPrototypeOf(SettingsHandler.prototype, GameDataHandler.prototype);
    const gameDataHandler = new GameDataHandler();
    const settingsHandler = new SettingsHandler();

    function GameDataHandler() {
      this.gameData = null;
      
    }

    function SettingsHandler() {
        this.saveSettings = function(data) {
            if (data != null) {
                if (typeof data !== 'object') data = this.serializeJSON(data);
                if (hasDeepKey(data,['data', 'settings'])) {
                    data.data.settings = data;
                    this.saveGameData(data);
                }
            }
        };
    }
    
    //settings data handler prototype methods
    SettingsHandler.prototype.serializeJSON = function(data) {
            if (data) {
                var json = {};
                json.data = data;
                return json;
            }
            return null;
    };
        
    SettingsHandler.prototype.loadSettings = function() {
        let item = this.loadGameData();
        if (item && item.data && item.settings) {
            return JSON.parse(item.data.settings); 
        }
        this.saveSettings(defaultSettingsJsonObject);
        return defaultSettingsJsonObject;
    };

    SettingsHandler.prototype.defaultSettingsJson = defaultSettingsJsonObject;

    //Game data handler prototype methids
    GameDataHandler.prototype.serializeJSON = function(data) {
            if (data) {
                var json = {};
                json.data = data;
                return json;
            }
            return null;
    };
        
    GameDataHandler.prototype.loadGameData = function() {
        var localStorage = window.localStorage;
        if (typeof localStorage !== 'undefined' && localStorage != null) {
            let item = localStorage.getItem('snake-game-data'.concat('-' + storageID));
            if (item) {
                this.gameData = JSON.parse(item);
                console.log(this.gameData)
                return JSON.parse(item);
            }
        }
        this.saveGameData(defaultGameDataJsonObject);
        return defaultGameDataJsonObject;
    };

    GameDataHandler.prototype.saveGameData = function(data) {
        if (data != null) {
            if (typeof data !== 'object') data = this.serializeJSON(data);
            var localStorage = window.localStorage;
            if (typeof localStorage !== 'undefined' && localStorage != null) {
                localStorage.setItem('snake-game-data'.concat('-' + storageID), JSON.stringify(data));
            }
        }
    };

    GameDataHandler.prototype.getGameData = function() {
        return this.gameData;
    }

    GameDataHandler.prototype.defaultGameDataJson = defaultGameDataJsonObject;

    //util
    function hasDeepKey(object, keys) {
        if (object && keys && typeof keys === 'array') {
            var offset = object;
            keys.forEach((e) => {
                if (!offset[e]) {
                    return false;
                }
                offset = offset[e];
            });
        }
        return false;
    }
    if (global) {
        global.gameDataHandler = gameDataHandler;
        global.settingsHandler = settingsHandler;
    }
})(this);