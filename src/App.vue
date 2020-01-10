<template>
  <div id="app">
    <!-- navbar -->
    <div class="navbar">
      Groups:
      <a
        class="navbar-item"
        v-for="item in iconGroup"
        :key="item.group"
        :href="`#${item.name}`"
        >{{ item.name }}</a
      >
    </div>

    <div v-for="item in iconGroup" :key="item.group">
      <h2>
        <a :name="item.name" :href="`#${item.name}`">{{ item.name }}</a>
      </h2>
      <ul>
        <li class="copy-btn" v-for="icon in item.icons" :key="icon">
          <svg-icon class="icon" :name="icon"></svg-icon>
          <input type="text" readonly :value="icon" />
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div v-if="copyState" class="copied-msg">"{{ copyText }}" Copied!</div>
    </transition>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";

import iconGroup from "@/icons";

export default {
  name: "app",
  data() {
    return {
      copyText: "",
      copyStateTimeout: 0,
      copyState: false,
      iconGroup
    };
  },
  methods: {
    copySuccess(e) {
      this.copyText = e.text;
      if (this.copyStateTimeout) {
        clearTimeout(this.copyStateTimeout);
      }
      this.copyState = true;
      this.copyStateTimeout = setTimeout(() => (this.copyState = false), 3000);
    }
  },
  mounted() {
    new ClipboardJS(".copy-btn", {
      target: function(trigger) {
        return trigger.querySelector("input");
      }
    }).on("success", this.copySuccess);
  }
};
</script>

<style lang="scss" scoped>
#app {
  $color-white: #f2f6fc;
  $space-base: 8px;
  $space-medium: $space-base * 2;
  $space-large: $space-base * 3;

  padding: $space-base;

  .navbar {
    background-color: $color-white;
    position: sticky;
    top: 0;
    padding: $space-base;
    .navbar-item {
      margin-right: $space-base;
    }
  }

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  li {
    width: 80px;
    padding: $space-base 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 4px;

    .icon {
      font-size: $space-large;
      width: $space-large;
      height: $space-large;
    }

    input {
      font-size: 12px;
      text-align: center;
      width: 90%;
      margin-top: $space-base;
    }

    &:hover {
      background-color: $color-white;
    }
  }

  .copied-msg {
    white-space: nowrap;
    padding: $space-base $space-medium;
    font-size: $space-medium;
    position: fixed;
    top: $space-medium;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 4px;
    background-color: black;
    color: white;
    text-align: center;
  }
}
</style>
