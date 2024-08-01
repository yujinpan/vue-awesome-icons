/**
 * svg 图标组件
 * @example
 * 1. 在官网查找 icon，获取 icon 名称（例如：lock）([官网](https://fontawesome.com/icons))
 * 2. 导入图标 `import 'vue-awesome/icons/lock'`
 * 3. 使用 `<SvgIcon name="lock" />`
 */
import Vue from 'vue';
import SvgIcon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons';

// 注册组件
Vue.component('svg-icon', SvgIcon);

// 获取所有的图标
const modules = import.meta.glob('../node_modules/vue-awesome/icons/**/*.js', {
  eager: true,
});

// 存放图标的分类数据
const icons = {
  common: [],
  // else
};
let group;
Object.keys(modules).forEach((icon) => {
  icon = icon.replace(/.*vue-awesome\/icons\/(.*)\.js$/, '$1');
  group = icon.includes('/') ? icon.split('/')[0] : 'common';
  (icons[group] = icons[group] || []).push(icon);
});

export default Object.entries(icons).map((item) => ({
  name: item[0],
  icons: item[1],
}));
