import {
  Graphics, Utils, WebAudio, Input, TouchInput, JsonEx, Bitmap, TilingSprite
} from '../core';
import {
  Game_Temp, Game_System, Game_Screen,
  Game_Timer, Game_Message, Game_Switches,
  Game_Variables, Game_SelfSwitches,
  Game_Actors, Game_Party, Game_Troop, Game_Map, Game_Player
} from '../objects';
//-----------------------------------------------------------------------------
// PluginManager
//
// The static class that manages the plugins.

export default function PluginManager() {
    throw new Error('This is a static class');
}

window.PluginManager = PluginManager;
window.PluginManager = PluginManager;

PluginManager._path         = 'js/plugins/';
PluginManager._scripts      = [];
PluginManager._errorUrls    = [];
PluginManager._parameters   = {};

PluginManager.setup = function(plugins) {
    plugins.forEach(function(plugin) {
        if (plugin.status && !this._scripts.contains(plugin.name)) {
            this.setParameters(plugin.name, plugin.parameters);
            this.loadScript(plugin.name + '.js');
            this._scripts.push(plugin.name);
        }
    }, this);
};

PluginManager.checkErrors = function() {
    var url = this._errorUrls.shift();
    if (url) {
        throw new Error('Failed to load: ' + url);
    }
};

PluginManager.parameters = function(name) {
    return this._parameters[name.toLowerCase()] || {};
};

PluginManager.setParameters = function(name, parameters) {
    this._parameters[name.toLowerCase()] = parameters;
};

PluginManager.loadScript = function(name) {
    var url = this._path + name;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = false;
    script.onerror = this.onError.bind(this);
    script._url = url;
    document.body.appendChild(script);
};

PluginManager.onError = function(e) {
    this._errorUrls.push(e.target._url);
};