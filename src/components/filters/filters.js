export const mfoFilters = [
  {
    name: "special_offers",
    type: "checkbox",
    title: "Спецпредложения",
    items: [
      "0% первый займ",
      "увеличенный лимит постоянным клиентам"
    ]
  },
  {
    name: "summ_value",
    type: "range",
    title: "Сколько нужно?",
    start: 100,
    end: 200000,
    step: 100,
    label: "(Руб.)"
  },
  {
    name: "term_value",
    type: "range",
    title: "На какой срок?",
    start: 1,
    end: 500,
    step: 1,
    label: "(Дней)"
  },
  {
    name: "category_mfo",
    type: "checkbox",
    title: "Категории",
    items: [
      "С плохой кред. историей",
      "Онлайн",
      "Быстрые",
      "С мгновенным одобрением",
      "Срочные",
      "Экспресс",
      "Круглосуточно",
      "Наличными",
      "Моментальные",
      "По паспорту",
      "До зарплаты",
      "Долгосрочные",
      "Без отказа",
      "Без поручителей",
      "Для студентов",
      "Для пенсионеров",
      "Без процентов",
      "С 18 лет",
      "Безработным",
      "Без паспорта",
      "Без кредит. истории"
    ]
  },
  {
    name: "income_proof",
    type: "radio",
    title: "Подтверждение дохода",
    items: [
      "Да",
      "Нет"
    ]
  },
  {
    name: "credit_history",
    type: "radio",
    title: "Кредитная история",
    items: [
      "Любая",
      "Хорошая"
    ]
  },
  {
    name: "mob_app",
    type: "radio",
    title: "Мобильное приложение",
    items: [
      "Да",
      "Нет"
    ]
  }
]

export const cardsFilters = [
  {
    name: "payment_system",
    type: "checkbox",
    title: "Платежная система",
    items: [
      "MasterCard",
      "Visa",
      "Мир"
    ]
  },
  {
    name: "limit_value",
    type: "range",
    title: "Кредитный лимит",
    start: 100,
    end: 1000000,
    step: 100,
    label: "(Руб.)"
  },
  {
    name: "rate_value",
    type: "range",
    title: "Процентная ставка",
    start: 1,
    end: 100,
    step: 1,
    label: "(Проценты)"
  },
  {
    name: "category_cards",
    type: "checkbox",
    title: "Категории",
    items: [
      "Альфа-Банк",
      "Тинькофф",
      "Самые лучшие кредитные карты",
      "Самые выгодные",
      "В день обращения",
      "Без процентов",
      "Срочно",
      "Без отказа",
      "Без справок",
      "На дом без визита в банк",
      "Без годового обслуживания",
      "Без подтверждения дохода",
      "Без кредитной истории",
      "Для пенсионеров",
      "Для студентов",
      "Безработным",
      "С беспроцентным периодом",
      "С кэшбэком",
      "Моментальные",
      "Для снятия наличных",
      "Виртуальные",
      "Apple Pay",
      "Samsung Pay",
      "За 5 минут",
      "За 15 минут",
      "За 30 минут",
      "Visa",
      "MasterCard",
      "МИР"
    ]
  },
  {
    name: "Cashback",
    type: "radio",
    title: "cashback",
    items: [
      "Да",
      "Нет"
    ]
  },
  {
    name: "card_delivery",
    type: "radio",
    title: "Доставка карты",
    items: [
      "На дом",
      "В отделение"
    ]
  },
  {
    name: "income_proof",
    type: "radio",
    title: "Подтверждение дохода",
    items: [
      "Да",
      "Нет"
    ]
  },
  {
    name: "chip_availability",
    type: "radio",
    title: "Наличие чипа",
    items: [
      "Да",
      "Нет"
    ]
  },
  {
    name: "secure_3d",
    type: "radio",
    title: "3D Secure",
    items: [
      "Да",
      "Нет"
    ]
  },
  {
    name: "mob_app",
    type: "radio",
    title: "Мобильное приложение",
    items: [
      "Да",
      "Нет"
    ]
  }
]
