<script lang="ts">
import cloneDeep from "lodash.clonedeep"
import { BASE_THEME, theme } from "$stores/theme"

</script>

<div>
    <h1 style='background-color: var(--accent)'>
       Welcome to 4Lizzi
    </h1>
    <button
        on:click={() => {
            const n = cloneDeep(BASE_THEME)
            n.vars.accent.value = 'red'
            theme.setTheme(n);
        }}
    >
        Theme test
    </button>
</div>

<style lang='scss'>
    :global(body, html){
        width: 100%;
        height: 100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    div{
        h1{
            animation: woohoo infinite 1s alternate;
            transform-origin: right;
            font-weight: bold;
            font-family: Arial;
        }
    }

    @keyframes woohoo{
        0%{
            color: red;
            transform: rotate(0) translateX(0);
        }
        50%{
            color: yellow;
            transform: rotate(180deg) translateX(100px) skew(50deg);
        }
        100%{
            color: blue;
            transform: rotate(0deg) translateX(50px);
        }
    }
</style>