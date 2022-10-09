import { defineStore } from "pinia";
import { getMenuByUserId, setIp } from "@/apis";
const modules = import.meta.glob("../views/**.vue");

export const userStore = defineStore("user", {
  state: () => {
    return {
      isAuthenticated: localStorage.getItem("isAuthenticated") || false,
      menus: [],
    };
  },
  actions: {
    bindUser(isAuthenticated) {
      this.isAuthenticated = isAuthenticated;
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
        const res = await getMenuByUserId({
          id: 1,
        });
        this.menus = res.data;
        const routeObj = {
          path: "/home",
          name: "home",
          component: () => import("@/views/HomeCom.vue"),
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
  },
});
