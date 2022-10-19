import { defineStore } from "pinia";
import { getMenus as getMenusApi, setIp, getRolesByRoleId } from "@/apis";
import { flatten } from "@/utils";
const modules = import.meta.glob("../views/**.vue");
const handleMenusByUser = (permission, menus) => {
  const permissionArray = permission.split(",").map(Number);
  const allMenus = flatten(menus);
  const userMenus = allMenus.filter((item) =>
    permissionArray.includes(item.id)
  );
  // 所有父类Id
  const allParentIds = Array.from(
    new Set(userMenus.map((item) => item.parent_id))
  );
  // 所有父类数据
  const allParentData = allMenus.filter((item) =>
    allParentIds.includes(item.id)
  );
  return allParentData.map((item) => {
    item.children = [];
    userMenus.forEach((m) => {
      if (m.parent_id == item.id) {
        item.children.push(m);
      }
    });
    return item;
  });
};
export const userStore = defineStore("user", {
  state: () => {
    return {
      menus: [],
      collapsed: false,
      user: JSON.parse(localStorage.getItem("user")) || null,
      tabs: [
        {
          path: "",
          name: "home",
          meta: {
            pathname: "首页",
          },
        },
      ],
      activeKey: "home",
    };
  },
  actions: {
    bindUser(user) {
      this.user = user;
    },
    clearMenus() {
      this.menus = [];
    },
    getIP(callback) {
      const recode = {};
      let RTCPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      // 如果不存在则使用一个iframe绕过
      if (!RTCPeerConnection) {
        // 因为这里用到了iframe，所以在调用这个方法的script上必须有一个iframe标签
        // <iframe id="iframe" sandbox="allow-same-origin"></iframe>
        const win = iframe.contentWindow;
        RTCPeerConnection =
          win.RTCPeerConnection ||
          win.mozRTCPeerConnection ||
          win.webkitRTCPeerConnection;
      }

      // 创建实例，生成连接
      const pc = new RTCPeerConnection();

      // 匹配字符串中符合ip地址的字段
      function handleCandidate(candidate) {
        const ip_regexp =
          /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/;
        const ip_isMatch = candidate.match(ip_regexp)?.[1];
        if (!recode[ip_isMatch]) {
          callback(ip_isMatch);
          recode[ip_isMatch] = true;
        }
      }

      // 监听icecandidate事件
      pc.onicecandidate = (ice) => {
        if (ice.candidate) {
          handleCandidate(ice.candidate.candidate);
        }
      };
      // 建立一个伪数据的通道
      pc.createDataChannel("");
      pc.createOffer(
        (res) => {
          pc.setLocalDescription(res);
        },
        () => {}
      );

      // 延迟，让一切都能完成
      setTimeout(() => {
        const lines = pc.localDescription.sdp.split("\n");
        lines.forEach((item) => {
          if (item.indexOf("a=candidate:") === 0) {
            handleCandidate(item);
          }
        });
      }, 2000);
    },
    async getMenus() {
      try {
        const allMenu = await getMenusApi();
        const userMenus = await getRolesByRoleId({
          roleId: this.user.roleId,
        });
        this.menus = handleMenusByUser(
          userMenus.data[0].permission,
          allMenu.data.records
        );
        const routeObj = {
          path: "/home",
          name: "home",
          component: () => import("@/views/HomeCom.vue?chunkName=home"),
          children: [],
        };
        const flat = this.menus.reduce((prev, cur) => {
          return prev.concat(cur.children);
        }, []);
        flat
          .filter((item) => item.path)
          .forEach((item) => {
            routeObj.children.push({
              path: item.path,
              name: item.code,
              component: modules[`../views/${item.filepath}.vue`],
              meta: {
                pathname: item.name,
              },
            });
          });
        return routeObj;
      } catch (error) {
        console.log(error);
      }
    },
    async setIp(params) {
      await setIp(params);
    },
    setTabPanel(path) {
      const index = this.tabs.findIndex((item) => item.name == path.name);
      this.activeKey = path.name;
      if (index < 0) {
        this.tabs.push(path);
      }
    },
    clearPanel(path) {
      const index = this.tabs.findIndex((item) => item.name == path.name);
      this.tabs.splice(index, 1);
    },
  },
});
