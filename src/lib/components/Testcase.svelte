<script lang="ts">
	import type { Testcase } from "$lib/types/Problem"
	export let testcase: Testcase
</script>



<div class="testcase">
    <div>
        Input: {testcase.input}
    </div>
    <div>
        Output: {testcase.expectedOutput}
    </div>
</div>

<style>
    .testcase{
        background-color: var(--layer);
        padding: 0.5rem 1rem;
        border-radius: 0.4rem;
        color: var(--layer-text);   
    }
</style>