export default {
  installed: false,
  install(Vue: any) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$modal = {
      // создаем новый экземпляр Vue
      // который будет выступать в роли паттерна EventBus
      EventBus: new Vue(),

      show(name: string, settings: any) {
        // сообщаем, что наступило событие shown
        // вместе с событием передаем параметры из аргументов функции
        this.EventBus.$emit('shown', { name, ...settings });
      },

      hide() {
        // сообщаем, что наступило событие hide
        this.EventBus.$emit('hide');
      },

    };
  },
};
