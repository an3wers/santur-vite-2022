export const useConfig = () => {
  return {
    API_BASE_URL: "https://isantur.ru/",
    PHONE_SITE: "+7 (343) 270-04-04",
    EMAIL_SITE: "santur@santur.ru",
    WHATSAPP_SITE: "79321217497",
  };
};

export const useMainMenu = () => {
  return [
    {
      name: "О компании",
      url: "#",
      child: [
        {
          name: "О Сантехкомплект-Урал",
          url: "#",
        },
        {
          name: "Менеджмент компании",
          url: "#",
        },
        {
          name: "Информация для поставщиков",
          url: "#",
        },
        {
          name: "Новости компании",
          url: "#",
        },
        {
          name: "Объекты комплектации",
          url: "#",
        },
        {
          name: "Вакансии",
          url: "#",
        },
      ],
    },
    {
      name: "Услуги",
      url: "#",
      child: [
        {
          name: "Доставка",
          url: "#",
        },
        {
          name: "Проектирование и производство",
          url: "#",
        },
        {
          name: "Сервис и ремонт котлов",
          url: "#",
        },
      ],
    },
    {
      name: "Клиентам",
      url: "#",
      child: [
        {
          name: "Дилерские сертификаты",
          url: "#",
        },
        {
          name: "Сотрудничество",
          url: "#",
        },
        {
          name: "Отзывы о компании",
          url: "#",
        },
        {
          name: "Прием рекламаций",
          url: "#",
        },
      ],
    },
    {
      name: "Ресурсы",
      url: "#",
      child: [
        {
          name: "Мастер-Сантехник",
          url: "#",
        },
        {
          name: "Инженерный форум",
          url: "#",
        },
        {
          name: "Пожарное оборудование",
          url: "#",
        },
        {
          name: "Собственное производство",
          url: "#",
        },
        {
          name: "Наружные сети",
          url: "#",
        },
      ],
    },
    {
      name: "Контакты",
      url: "#",
    },
  ];
};