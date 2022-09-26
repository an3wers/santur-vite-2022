<template>
    <button :type="type" :class="[typeMap[btnType], sizeMap[btnSize]]" class="inline-flex items-center text-center justify-center rounded-md disabled:opacity-70">
        <slot></slot>
    </button>
</template>

<script>
export default {

    props: {
        btnType: {
            type: String,
            default: 'primary'
        },
        btnSize: {
            type: String,
            default: 'md'
        },
        type: {
            type: String,
            default: 'button'
        }
    },

    setup() {

        const typeMap = {
            'primary': 'bg-primary border border-transparent hover:bg-primary-hover focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20 text-white',
            'secondary': 'bg-blue-100 border border-transparent hover:bg-blue-200 focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20 text-gray-800',
            'outline': 'bg-transparent border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20',
            'link': 'bg-transparent border border-transparent hover:text-primary-hover focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20 hover:no-underline text-primary underline',
            'light': 'bg-transparent border border-transparent hover:bg-blue-100 focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20'
        }

        const sizeMap = {
            'md': 'py-2 text-base px-3 leading-5',
            'lg': 'py-2.5 text-lg px-4',
            'xs': 'py-1 text-sm px-2'            
        }

        return {
            typeMap,
            sizeMap
        }
        
    },
}
</script>