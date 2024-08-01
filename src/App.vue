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

      Download SVG?
      <label>
        <input
          @change="onDownloadChange"
          :checked="isDownload"
          name="download"
          type="radio"
          value="yes"
        />
        yes
      </label>
      <label>
        <input
          @change="onDownloadChange"
          :checked="!isDownload"
          name="download"
          type="radio"
          value="no"
        />
        no
      </label>
    </div>

    <div v-for="item in iconGroup" :key="item.group">
      <h2>
        <a :name="item.name" :href="`#${item.name}`">{{ item.name }}</a>
      </h2>
      <ul @click.capture="onDownloadSVG" class="icon-list">
        <li
          class="copy-btn"
          v-for="icon in item.icons"
          :key="icon"
          :data-icon="icon"
        >
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
import ClipboardJS from 'clipboard';

import iconGroup from '@/icons';
import { closest, createSVG, downloadSVG } from '@/utils';

export default {
  name: 'app',
  data() {
    return {
      isDownload: +localStorage.getItem('IS_DOWNLOAD') || 0,
      copyText: '',
      copyStateTimeout: 0,
      copyState: false,
      iconGroup,
    };
  },
  methods: {
    onDownloadSVG(e) {
      if (this.isDownload) {
        const elem = closest(e.target, 'copy-btn', 'icon-list');
        if (elem) {
          downloadSVG(createSVG(elem.querySelector('svg')), elem.dataset.icon);
        }
      }
    },
    onDownloadChange(e) {
      this.isDownload = (e.target.value === 'yes') === e.target.checked ? 1 : 0;
      localStorage.setItem('IS_DOWNLOAD', this.isDownload + '');
    },
    copySuccess(e) {
      this.copyText = e.text;
      if (this.copyStateTimeout) {
        clearTimeout(this.copyStateTimeout);
      }
      this.copyState = true;
      this.copyStateTimeout = setTimeout(() => (this.copyState = false), 3000);
    },
  },
  mounted() {
    new ClipboardJS('.copy-btn', {
      target: function (trigger) {
        return trigger.querySelector('input');
      },
    }).on('success', this.copySuccess);
  },
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
