<script lang="ts">
  import { PortfolioData } from "$lib/PortfolioData";
    import Slide from "$lib/components/Slide.svelte";
</script>

<Slide class="bg-blue-400">
    <div class="w-full h-full flex justify-center items-center">
        <div class="flex gap-4">
            <img src="/avatar.png" class="rounded-full">
            <div  class="flex flex-col justify-center gap-2">
                <div class="text-4xl">
                    {PortfolioData.user.name} {PortfolioData.user.firstSurname} {PortfolioData.user.secondSurname}
                </div>
                {#if PortfolioData.user.slogan}
                    <div class="text-4xl">
                        {PortfolioData.user.slogan}
                    </div>
                {/if}
                <div class="text-xl">
                    {PortfolioData.user.email} - {PortfolioData.user.phone}
                </div>
            </div>
        </div>
    </div>
</Slide>