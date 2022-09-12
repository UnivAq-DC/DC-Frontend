import Color from "color";
import cloneDeep from "lodash.clonedeep";
import { writable } from "svelte/store";
type ThemeProp = {
    css: string
    value: string
    text: string
}
type SerializedTheme = {
    meta: {
        name: string
    },
    vars: {
        primary: ThemeProp
        secondary: ThemeProp
        accent: ThemeProp
        background: ThemeProp
    }
}
type ThemeVars = keyof SerializedTheme["vars"]
export const BASE_THEME: SerializedTheme = {
    meta: {
        name: "base"
    },
    vars: {
        primary: createThemeProp("primary", "#ff3e00"),
        secondary: createThemeProp("secondary", "#03dac6"),
        accent: createThemeProp("accent", "#03dac6"),
        background: createThemeProp("background", "#121212")
    }
}
function createThemeProp(name: string, value: string) {
    return {
        css: name,
        value,
        text: Color(value).isDark() ? "white" : "black"
    }
}
class Theme {
    private state: SerializedTheme
    constructor(theme?: SerializedTheme) {
        this.state = cloneDeep(theme ?? BASE_THEME)
    }
    get(name: ThemeVars) {
        return Color(this.state.vars[name].value)
    }
    toArray() {
        return Object.values(this.state.vars)
    }
}

function createThemeStore() {
    const { subscribe, set, update } = writable<Theme>(new Theme());


    function setTheme(theme: SerializedTheme) {
        set(new Theme(theme))
    }
    return {
        subscribe,
        set,
        update,
        setTheme
    }
}




export const theme = createThemeStore()