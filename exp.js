/**
 * @desc:格式化路由
 * @params {aMenu:'完整路由数据', first:'本页面设置为false用作递归调用，外部调用为true}
 * @return: 返回格式好的各级路由
 */

function fn(aMenu = [], first) {
  if (aMenu.length === 0) return;
  const routerList = [];
  for (let i = 0; i < aMenu.length; i++) {
    const menuItem = aMenu[i];
    let { path, component, name, icon, children, meta } = menuItem;
    const isChild = children.length !== 0; //判断是否由子路由
    //书写单个路由
    const routesItem = {
      path,
      name,
      icon,
      meta,
      component(resolve) {
        // 判断是否为首路由
        if (first) {
          require(["../page/index"], resolve);
          return;
          // 判断是否有下级路由
        } else if (isChild && !first) {
          require(["../page/index/layout"], resolve);
          return;
        } else {
          require([`../${component}.vue`], resolve);
        }
      },
      redirect: (() => {
        if (!isChild && first && !isURL(path)) return `${path}/index`;
        return "";
      })(),
      children: !isChild
        ? // 无子路由
          []
        : // 有子路由
          (() => {
            return this.formatRoutes(children, false);
          })(),
    };
    routerList.push(routesItem);
  }
}
