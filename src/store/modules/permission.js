import { asyncRouterMap, constantRouterMap } from '@/router/index'

/**
 * 判断用户是否拥有此菜单
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  if (route.name) {
    return menus.permName == route.name;
  } else {
    return true
  }
}

function generateMenu(permissionList = []) {
  let menu = permissionList.filter(item => {
    if (item.permLevel == 1 || item.permLevel == 2) {
      return true
    }
    return false
  })
  let menus = menu.filter(item => item.pid == 0)
  menus.forEach(item => {
    menu.forEach(item2 => {
      if (item.permId == item2.pid) {
        if (item.children) {
          item.children.push(item2)
        } else {
          item.children = [item2]
        }
      }
    })
  })
  console.log(menus)
  return menus
}

function getRootRouter(accessedRouters, name) {
  let result = null;
  accessedRouters.forEach(item => {
    if (item.name == name) {
      result = item;
    }
  });
  return result;
}

function generateChildrenRouter(name, children) {
  let result = null;
  children.forEach(item => {
    if (item.name == name) {
      result = item;
    }
  });
  return result;
}

function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = []
  menus.forEach(menu => {
    let rootRouter = getRootRouter(asyncRouterMap, menu.permName)
    if (rootRouter) {
      let rootChildren = []
      if (menu.children) {
        menu.children.forEach(router => {
          if (rootRouter.children) {

            let child = generateChildrenRouter(router.permName, rootRouter.children)
            if (child) {
              rootChildren.push(child)
            }
          }
          // generateChildrenRouter(asyncRouterMap.children,menus.children)
        })
        rootRouter.children = rootChildren;
        accessedRouters.push(rootRouter);
      }
    }

  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap, //本用户所有的路由,包括了固定的路由和下面的addRouters
    addRouters: [] //本用户的角色赋予的新增的动态路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers) //将固定路由和新增路由进行合并, 成为本用户最终的全部路由信息
    }
  },
  actions: {
    GenerateRoutes({ commit }, userPermission) {
      return new Promise(resolve => {
        let menu = generateMenu(userPermission.routers)
        let accessedRouters = filterAsyncRouter(asyncRouterMap, menu)
        var fixRouter = [{ path: '*', redirect: '/404', hidden: true }]
        accessedRouters.push(...fixRouter)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}
export default permission
