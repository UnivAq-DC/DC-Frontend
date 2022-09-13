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
        backgroundFlip: ThemeProp
        layer: ThemeProp
        secondary: ThemeProp
        accent: ThemeProp
        background: ThemeProp
        accent2: ThemeProp
        accent3: ThemeProp
    }
}
type ThemeVars = keyof SerializedTheme["vars"]
export const BASE_THEME: SerializedTheme = {
    meta: {
        name: "base"
    },
    vars: {
        background: createThemeProp("background", "#0F151B"),
        backgroundFlip: createThemeProp("background-flip", "#ddd5c5"),
        primary: createThemeProp("primary", "#19232d"),
        secondary: createThemeProp("secondary", "#B33A3A"),
        layer: createThemeProp("layer", "#1E2A35"),
        accent: createThemeProp("accent", "#88d333"),
        accent2: createThemeProp("accent-2", "#B33A3A"),
        accent3: createThemeProp("accent-3", "#1B998B"),
    }
}
function createThemeProp(name: string, value: string) {
    return {
        css: name,
        value,
        text: Color(value).isDark() ? "#edeae5" : "#151414"
    }
}
class Theme {
    private state: SerializedTheme
    constructor(theme?: SerializedTheme) {
        this.state = cloneDeep(BASE_THEME)
        if (!theme) return
        this.state.meta = { ...this.state.meta, ...theme.meta }
        //sanitized input
        Object.entries(theme.vars).forEach(([key, value]) => {
            const propName = key as ThemeVars
            if (!this.state.vars[propName]) return
            const color = Color(value.value)
            this.state.vars[propName] = {
                ...this.state.vars[propName],
                value: color.hex(),
                text: color.isDark() ? "white" : "black"
            }
        })
    }
    get(name: ThemeVars) {
        return Color(this.state.vars[name].value)
    }
    layer(name: ThemeVars, amount: number) {
        const color = this.get(name)
        if(color.isDark()){
            return color.lighten(amount)
        }else{
            return color.darken(amount)
        }
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