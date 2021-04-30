
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

    const gameDataHandler = new GameDataHandler();
    function GameDataHandler() {
      this.gameData = null;
    }

   
    GameDataHandler.prototype.loadSettings = function() {
        let item = this.gameData;
       
        if (item && item.data && item.data.settings) {
            let settingsObj = item.data.settings
            return settingsObj;
        }
        this.saveSettings(defaultSettingsJsonObject);
        return defaultSettingsJsonObject;
    };

    GameDataHandler.prototype.saveSettings = function(settings) {
        if (settings) {
            this.gameData.data.settings = settings;
            this.saveGameData(this.gameData);
        }
    }

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
                return JSON.parse(item)
            } else this.saveGameData(defaultGameDataJsonObject);
        } else this.saveGameData(defaultGameDataJsonObject);
        return null;
    };

    GameDataHandler.prototype.saveGameData = function(data) {
        
        if (data != null) {
            var localStorage = window.localStorage;
            if (typeof localStorage !== 'undefined' && localStorage != null) {
                localStorage.setItem('snake-game-data'.concat('-' + storageID), JSON.stringify(data));
                this.gameData = data;
            }
            
        }
    };

    GameDataHandler.prototype.getGameData = function() {
        
        return this.gameData;
    }

    GameDataHandler.prototype.defaultGameDataJson = defaultGameDataJsonObject;

    //util
    function hasDeepKey(object, keys) {
        if (object != null && keys != null) {
            var offset = object;
            if (keys.length > 0) {
                var flag = false;
                for (var key in keys) {
                    if (!key || !offset  || !offset.hasOwnProperty(key)) {
                        flag = true;
                        break;
                    }
                    offset = offset.key;
                }
                return !flag && offset != null
            }
        }
        return false;
    }
    if (global) {
        global.gameDataHandler = gameDataHandler;
    }
})(this);