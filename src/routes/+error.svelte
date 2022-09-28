<script>
import AnimatedPage from "$lib/components/AnimatedPage.svelte";
import Button from "$lib/components/Button.svelte";

</script>

<title>
    404
</title>
<AnimatedPage cropped>
    <div class="column" style="align-items: center; justify-content:center; height: 100%">
        <h1 style="font-size: 4rem;">404</h1>
        <h2 style="margin: 1rem;">Pagina non trovata</h2>
        <a href="/">
            <Button>
                Torna indietro
            </Button>
        </a>
    </div>


</AnimatedPage>