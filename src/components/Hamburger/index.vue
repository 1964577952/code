<template>
  <div style="padding: 0 15px;" @click="toggleClick">


    <svg version="1.1" id="Layer_1" 
      :class="{'is-active':isActive}"
      class="hamburger"
    
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22px" height="20px" viewBox="0 0 22 20" enable-background="new 0 0 22 20" xml:space="preserve">  <image id="image0" width="22" height="20" x="0" y="0"
    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAQAAAAjdQW7AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
RQfjAx8RIA8LAQ7hAAAAvElEQVQoz7WSsQ4BQRRFz4xdFBIhWQ0RhUqjofOJColGxVf4CpWG6Ejs
B2iICFexFNjNvsZ9zRT3ndy5M04hPRz5Ehs0l1ULz8VATXR28rTwBuuDo5MZjIn5Y64yNjUi1NJa
e5E3AdBnSZPDa7tCN5V6ZYdGOknSi1xSnNnzzBMSfhCCzMRFJxiwpMGBDgB12hk9b5PoHW0tF3wf
aprmm//3ggHQ/OojXTdiNDH/54knMqeInMoMKRisd1ZPceTcTfQkRnsAAAAldEVYdGRhdGU6Y3Jl
YXRlADIwMTktMDMtMzFUMDk6MzI6MTUrMDg6MDDLEuqxAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5
LTAzLTMxVDA5OjMyOjE1KzA4OjAwuk9SDQAAAABJRU5ErkJggg==" />
</svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
