<script lang="ts">
	export let style: string = ""
	export let cssVar: string = "primary"
    export let fancyColor: string = "var(--accent)"
    export let fancy: boolean = false
    export let bold: boolean = false
    export let disabled: boolean = false
</script>

<button 
	on:click
    {disabled}
	class="button"
	style={`
        background-color: var(--${cssVar}); 
        color: var(--${cssVar}-text); 
        --fancy-color: ${fancyColor};
        ${style}`
    }
    class:fancy
    class:bold
>
	<slot />
</button>

<style lang="scss">

    .button{
        padding: 0.6rem 1rem;
        border: none;
        width: fit-content;
        height: fit-content;
        border-radius: 0.4rem;
        cursor: pointer;
        transition: all 0.2s;
    }
    .button:hover:not(:disabled){
        filter: brightness(1.1);
    }
    .fancy:hover:not(:disabled){
        transform: translate(-0.1rem, -0.1rem);
        box-shadow: 0.2rem 0.2rem 0 var(--fancy-color);
    }
    .bold{
        font-weight: bold;
    }
    .button:disabled{
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>
