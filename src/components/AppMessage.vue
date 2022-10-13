<template>
  <div
    :class="[msgType[type]]"
    class="app-message rounded-xl py-6 px-4 space-x-4 inline-flex z-50 items-start shadow-lg"
  >
    <div v-html="msgIcon[icon]"></div>
    <div class="grow text-white font-medium">
      <slot
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quae nam
        tempora vitae maxime impedit rerum! Repudiandae, adipisci sed
        praesentium optio animi voluptatum aut labore, odio laudantium
        architecto ea reiciendis.</slot
      >
    </div>
    <close-icon-20
      @click="close"
      color="#ffffff"
      aria-label="Close"
      role="button"
      class="mt-[3px] shrink-0 cursor-pointer"
    />
  </div>
</template>

<script setup>
import CloseIcon20 from "@/components/UI/Icons/CloseIcon_20.vue";

import { useAppMessage } from "@/stores/appMessage";

const appMessageStore = useAppMessage();

defineProps({
  icon: {
    type: String,
    default: "info",
  },
  type: {
    type: String,
    default: "info",
  },
});
const msgIcon = {
  info: '<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="24" width="24"><path d="M11 17H13V11H11ZM12 9Q12.425 9 12.713 8.712Q13 8.425 13 8Q13 7.575 12.713 7.287Q12.425 7 12 7Q11.575 7 11.288 7.287Q11 7.575 11 8Q11 8.425 11.288 8.712Q11.575 9 12 9ZM12 22Q9.925 22 8.1 21.212Q6.275 20.425 4.925 19.075Q3.575 17.725 2.788 15.9Q2 14.075 2 12Q2 9.925 2.788 8.1Q3.575 6.275 4.925 4.925Q6.275 3.575 8.1 2.787Q9.925 2 12 2Q14.075 2 15.9 2.787Q17.725 3.575 19.075 4.925Q20.425 6.275 21.212 8.1Q22 9.925 22 12Q22 14.075 21.212 15.9Q20.425 17.725 19.075 19.075Q17.725 20.425 15.9 21.212Q14.075 22 12 22ZM12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12ZM12 20Q15.325 20 17.663 17.663Q20 15.325 20 12Q20 8.675 17.663 6.337Q15.325 4 12 4Q8.675 4 6.338 6.337Q4 8.675 4 12Q4 15.325 6.338 17.663Q8.675 20 12 20Z"/></svg>',
  error:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="24" width="24"><path d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17Zm-1-4h2V7h-2Zm1 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>',
  warning:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="24" width="24"><path d="M1 21 12 2l11 19Zm10-6h2v-5h-2Zm1 3q.425 0 .713-.288Q13 17.425 13 17t-.287-.712Q12.425 16 12 16t-.712.288Q11 16.575 11 17t.288.712Q11.575 18 12 18Z"/></svg>',
  success:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" height="24" width="24"><path d="m10.6 16.6 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>',
  none: "",
};

const msgType = {
  info: "bg-gray-700",
  error: "bg-red-500",
  warning: "bg-orange-400",
  success: "bg-green-500",
};

// const msgIcon = {
//     'info': '<svg xmlns="http://www.w3.org/2000/svg" fill="#111827" height="24" width="24"><path d="M11 17H13V11H11ZM12 9Q12.425 9 12.713 8.712Q13 8.425 13 8Q13 7.575 12.713 7.287Q12.425 7 12 7Q11.575 7 11.288 7.287Q11 7.575 11 8Q11 8.425 11.288 8.712Q11.575 9 12 9ZM12 22Q9.925 22 8.1 21.212Q6.275 20.425 4.925 19.075Q3.575 17.725 2.788 15.9Q2 14.075 2 12Q2 9.925 2.788 8.1Q3.575 6.275 4.925 4.925Q6.275 3.575 8.1 2.787Q9.925 2 12 2Q14.075 2 15.9 2.787Q17.725 3.575 19.075 4.925Q20.425 6.275 21.212 8.1Q22 9.925 22 12Q22 14.075 21.212 15.9Q20.425 17.725 19.075 19.075Q17.725 20.425 15.9 21.212Q14.075 22 12 22ZM12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12Q12 12 12 12ZM12 20Q15.325 20 17.663 17.663Q20 15.325 20 12Q20 8.675 17.663 6.337Q15.325 4 12 4Q8.675 4 6.338 6.337Q4 8.675 4 12Q4 15.325 6.338 17.663Q8.675 20 12 20Z"/></svg>',
//     'error': '<svg xmlns="http://www.w3.org/2000/svg" fill="#dc2626" height="24" width="24"><path d="M12 17q.425 0 .713-.288Q13 16.425 13 16t-.287-.713Q12.425 15 12 15t-.712.287Q11 15.575 11 16t.288.712Q11.575 17 12 17Zm-1-4h2V7h-2Zm1 9q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>',
//     'warning': '<svg xmlns="http://www.w3.org/2000/svg" fill="#f59e0b" height="24" width="24"><path d="M1 21 12 2l11 19Zm10-6h2v-5h-2Zm1 3q.425 0 .713-.288Q13 17.425 13 17t-.287-.712Q12.425 16 12 16t-.712.288Q11 16.575 11 17t.288.712Q11.575 18 12 18Z"/></svg>',
//     'success': '<svg xmlns="http://www.w3.org/2000/svg" fill="#16a34a" height="24" width="24"><path d="m10.6 16.6 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"/></svg>',
//     'none': ''
// }

// const msgType = {
//     'info': 'bg-gray-300',
//     'error': 'bg-red-300',
//     'warning': 'bg-orange-200',
//     'success': 'bg-green-300'
// }

function close() {
  appMessageStore.close();
}
</script>
