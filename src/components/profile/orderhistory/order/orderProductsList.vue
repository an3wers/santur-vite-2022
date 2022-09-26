<template>
    <div>
        <div v-if="!data.length">

            <table class="w-full text-sm text-left">
                <thead class="text-xs tracking-tight text-gray-900 uppercase bg-slate-100">
                    <tr class="border-b border-gray-300">
                        <th scope="col" class="py-3 px-3 min-w-[250px]">Наименование</th>
                        <th scope="col" class="py-3 px-3 min-w-[112px] w-28">Количество</th>
                        <th scope="col" class="py-3 px-3 min-w-[112px] w-28">Резерв</th>
                        <th scope="col" class="py-3 px-3 min-w-[112px] w-28">Отгружено</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in 2" :key="index">
                       <tr class="border-b border-gray-300 bg-slate-100">
                        <td scope="col" colspan="4" class="py-3 px-3 uppercase font-bold">Заказ bЗАО87938475 от 19.02.2021</td>
                    </tr>
                    <tr class="bg-white border-b border-gray-300 hover:bg-slate-100">
                        <td scope="col" class="py-3 px-3 min-w-[250px]">
                            <div>b019093458</div>
                            <div>Втулка ПЭ100 SDR11 под фланец Дн63 литой</div>
                        </td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                    </tr>
                    <tr class="bg-white border-b border-gray-300 hover:bg-slate-100">
                        <td scope="col" class="py-3 px-3 min-w-[250px]">
                            <div>b019093458</div>
                            <div>Втулка ПЭ100 SDR11 под фланец Дн63 литой</div>
                        </td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                    </tr>
                    <tr class="bg-white border-b border-gray-300 hover:bg-slate-100">
                        <td scope="col" class="py-3 px-3 min-w-[250px]">
                            <div>b019093458</div>
                            <div>Втулка ПЭ100 SDR11 под фланец Дн63 литой</div>
                        </td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                    </tr>
                    <tr class="bg-white border-b border-gray-300 hover:bg-slate-100">
                        <td scope="col" class="py-3 px-3 min-w-[250px]">
                            <div>b019093458</div>
                            <div>Втулка ПЭ100 SDR11 под фланец Дн63 литой</div>
                        </td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                        <td scope="col" class="py-3 px-3 min-w-[112px] w-28">90 000</td>
                    </tr> 
                    </template>
                    

                </tbody>
            </table>

        </div>
        <div v-else>
            <p>Товаров готовых к отгрузке нет.</p>
        </div>
    </div>
</template>

<script setup>

    defineProps({
        data: {
            type: Array,
            default: [],
        }
    })

</script>