<script lang="ts">

</script>

<div class="relative w-full h-screen {$$restProps.class || ''}">
    <div class="relative z-10 w-full h-full">
        <slot name="content"></slot>
    </div>
    <div class="absolute top-0 left-0 bottom-0 right-0 z-0">
        <slot name="floating"></slot>
    </div>
</div>