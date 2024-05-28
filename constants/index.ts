export const sidebarLinks = [
  {
    imgURL: '/assets/home.svg',
    route: '/',
    label: 'Главная',
  },
  {
    imgURL: '/assets/search.svg',
    route: '/search',
    label: 'Поиск',
  },
  {
    imgURL: '/assets/heart.svg',
    route: '/activity',
    label: 'Уведомления',
  },
  {
    imgURL: '/assets/create.svg',
    route: '/create-thread',
    label: 'Создать обсуждение',
  },
  {
    imgURL: '/assets/user.svg',
    route: '/profile',
    label: 'Профиль',
  },
  {
    imgURL: '/assets/policy.svg',
    route: '/policy',
    label: 'Политика использования',
  },
];

export const profileTabs = [
  { value: 'threads', label: 'Обсуждения', icon: '/assets/reply.svg' },
  { value: 'replies', label: 'Ответы', icon: '/assets/members.svg' },
  { value: 'tagged', label: 'Упомянут', icon: '/assets/tag.svg' },
];

export const communityTabs = [
  { value: 'threads', label: 'Обсуждения', icon: '/assets/reply.svg' },
  { value: 'members', label: 'Члены', icon: '/assets/members.svg' },
  { value: 'requests', label: 'Requests', icon: '/assets/request.svg' },
];
