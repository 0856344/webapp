<template>
    <div class="">
    <div id="slidecontainer" class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth lg:gap-0 lg:contents">
        <slot></slot>
    </div>
</div>
</template>

<style>
#slidecontainer::-webkit-scrollbar { width: 0 !important }

#slidecontainer { overflow: -moz-scrollbars-none; }

#slidecontainer { -ms-overflow-style: none; }
</style>
