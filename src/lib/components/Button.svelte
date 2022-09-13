<script lang="ts">
	export let style: string = ""
	export let cssVar: string = "primary"
    export let fancy: boolean = false

</script>

<button 
	on:click
	class="button"
	style={`background-color: var(--${cssVar}); color: var(--${cssVar}-text); ${style}`}
    class:fancy
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
    .button:hover{
        filter: brightness(1.1);
    }
    .fancy:hover{
        transform: translate(-0.1rem, -0.1rem);
        box-shadow: 0.2rem 0.2rem 0 var(--accent);
    }
</style>
