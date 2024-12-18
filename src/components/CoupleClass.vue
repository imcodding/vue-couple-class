<template>
  <div class="couple-list">
    <h4>학급</h4>
    <div class="couple-list-new">
      <div class="radio-input" >
        <label>
          <input type="radio" id="value-1" name="new-type" value="1" checked/>
          <span>남</span>
        </label>
        <label>
          <input type="radio" id="value-2" name="new-type" value="2" />
          <span>여</span>
        </label>
        <span class="selection"></span>
      </div>  
      <input type="text" placeholder="이름을 입력해주세요"/>
      <button type="button" >저장</button>
    </div>
    <div class="couple-list-box">
      <div>
        <span>남</span>
        <ul>
          <li>AAA</li>
          <li>BBB</li>
          <li>CCC</li>
        </ul>
      </div>
      <div>
        <span>여</span>
        <ul>
          <li>DDD</li>
          <li>EEE</li>
          <li>FFF</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<script setup>
</script>